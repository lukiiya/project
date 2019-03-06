<?php
namespace controller\portal;
use controller\Base;

class Alipay extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $financeService;
	private $orderService;
    private $couponService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->financeService  = requireService("Finance");
		$this->orderService = requireService("Order");
        $this->couponService = requireService("Coupon");
	}

	public function payNotify() {
		$alipay = requireModule("Alipay");
        $pay = requireModule("Pay");
        $payNotifyResp = $alipay->payNotify();//验签过程
        if ($payNotifyResp->errCode != 0) {
            $this->resp->msg = $payNotifyResp->msg;
            $this->jsonView->out($this->resp);
        }
        $tradeData = $payNotifyResp->data;
        if (empty($tradeData) || !is_array($tradeData)) {
            $this->resp->msg = "tradeData有误";
            $this->jsonView->out($this->resp);
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById((int)$tradeData['orderId']);
        if ($selectOrderByIdResp->errCode != 0) {
            $this->resp->msg = "查询订单异常";
            $this->jsonView->out($this->resp);
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $this->resp->msg = "订单不存在";
            $this->jsonView->out($this->resp);
        }
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单
        $orderType = (int)$orderData['orderType'];
        //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        if ($status == 2 || $status == 3 || $status == 4) {
            echo 'success';
            exit();
        }
        if ($userId != (int)$tradeData['userId']) {
            $this->resp->msg = "订单人异常";
            $this->jsonView->out($this->resp);
        }
        $financeType = 0;//资金类型, 0=方案, 1=出票
        if ($orderType == 3 || $orderType == 4 || $orderType == 7 || $orderType == 8 || $orderType == 9) {
            $financeType = 1;
        }
        $tradeAmount = (int)$tradeData['amount'];
        if ($tradeAmount <= 0) {
            $this->resp->msg = "交易金额异常";
            $this->jsonView->out($this->resp);
        }
        $totalAmount = $tradeAmount;
        //得到订单优惠券
        $userCouponData = null;
        $userCouponId = (int)$orderData['userCouponId'];
        if ($userCouponId > 0) {
            $selectUserCouponByIdResp = $this->couponService->selectUserCouponById($userCouponId);
            if ($selectUserCouponByIdResp->errCode == 0 && $selectUserCouponByIdResp->data) {
                $userCouponData = $selectUserCouponByIdResp->data;
                $userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
                $userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
                $userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
                $userCouponAmount = (int)$userCouponData['amount'];
                if ($userCouponFinanceType == $financeType && $userCouponType > 0 && $userCouponAmount > 0 && $userCouponAmount < $amount) {
                    if ($userCouponType == 1) {
                        $totalAmount += $userCouponAmount;
                        if ($userCouponStatus == 2) {
                            if ($financeType == 1) {
                                $orderType = 4;//异常流程(支付成功 且 消费优惠券被使用)，把消费单改成充值单
                            }
                        }
                    }
                }
            }
        }

        global $curEnv;
        //只有正式环境，才去校验金额，测试环境都是1分钱(方便测试)
        if ($curEnv == 'dist' && $amount != $totalAmount) {
            $this->resp->msg = "订单金额异常";
            $this->jsonView->out($this->resp);
        }
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$this->resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			$this->jsonView->out($this->resp);
		}
		if ($status != 1) {
			$this->resp->msg = '订单状态('.$status.')异常';
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = '查询用户异常';
			$this->jsonView->out($this->resp);
		}
		$userData = $selectUserByIdResp->data;
		if (empty($userData)) {
			$this->resp->msg = '用户不存在';
			$this->jsonView->out($this->resp);
		}
		//强制更新资金明显
		$setUserFinanceResp = $this->commonService->setUserFinance($userId);
		if ($setUserFinanceResp->errCode != 0) {
			$this->resp->msg = '查询资金异常';
			$this->jsonView->out($this->resp);
		}
		//查询用户资金
		$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$this->resp->msg = '查询资金异常';
			$this->jsonView->out($this->resp);
		}
		$financeData = $selectFinanceByUserIdResp->data;
		if (empty($financeData)) {
			$this->resp->msg = '资金不存在';
			$this->jsonView->out($this->resp);
		}
		$financeId = (int)$financeData['financeId'];
		if ($financeId <= 0) {
			$this->resp->msg = '资金不存在';
			$this->jsonView->out($this->resp);
		}
        //资金明细表额外表
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $this->resp->msg = '查询资金异常';
            $this->jsonView->out($this->resp);
        }
        $financeDataExtra = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeDataExtra)) {
            $this->resp->msg = '资金不存在';
            $this->jsonView->out($this->resp);
        }
        $financeIdExtra = (int)$financeDataExtra['financeId'];
        if ($financeIdExtra <= 0) {
            $this->resp->msg = '资金不存在';
            $this->jsonView->out($this->resp);
        }
        $planUserFinanceDataExtra = null;
        $spreaderFinanceDataExtra = null;
        if ($orderType == 0) {
            $planUserId = (int)$orderData['planUserId'];
            $spreaderUserId = (int)$orderData['spreaderUserId'];
            if ($planUserId > 0) {
                //查询用户资金
                $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $planUserId);
                if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                    $this->resp->msg = '查询资金异常';
                    $this->jsonView->out($this->resp);
                }
                $planUserFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
                if (empty($planUserFinanceDataExtra)) {
                    $this->resp->msg = '资金不存在';
                    $this->jsonView->out($this->resp);
                }
            }
            if ($spreaderUserId > 0) {
                //查询用户资金
                $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $spreaderUserId);
                if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                    $this->resp->msg = '查询资金异常';
                    $this->jsonView->out($this->resp);
                }
                $spreaderFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
                if (empty($spreaderFinanceDataExtra)) {
                    $this->resp->msg = '资金不存在';
                    $this->jsonView->out($this->resp);
                }
            }
        }
		$payParam = array();
        $payParam['trade'] = $tradeData;
		$payParam['order'] = $orderData;
		$payParam['user'] = $userData;
        $payParam['userCoupon'] = $userCouponData;
		$payParam['finance'] = $financeData;
        $payParam['financeExtra'] = $financeDataExtra;
        $payParam['planUserFinanceExtra'] = $planUserFinanceDataExtra;
        $payParam['spreaderFinanceExtra'] = $spreaderFinanceDataExtra;
		$payParam['consumeType'] = 1;
		//$this->logger->info('支付信息：'.print_r($payParam, true));
		$payOrderResp = null;
		if ($orderType == 0) {
			$payOrderResp = $pay->payPlanOrder($payParam);
		} else if ($orderType == 1) {
			$payOrderResp = $pay->payChargeOrder($payParam);
		} else if ($orderType == 2) {
			$payOrderResp = $pay->payComboOrder($payParam);
		} else if ($orderType == 3) {
            $payOrderResp = $pay->payTicketOrder($payParam);
        } else if ($orderType == 4) {
            $payOrderResp = $pay->payTicketChargeOrder($payParam);
        } else if ($orderType == 5) {
            $payOrderResp = $pay->paySmlrOrder($payParam);  //晒米冷热
        } else if ($orderType == 6) {
            $payOrderResp = $pay->payJxzpOrder($payParam);  //极限追盘
        } else if ($orderType == 7) {
            $payOrderResp = $pay->payDigitalTicketOrder($payParam);//数字彩出票单
        } else if ($orderType == 8) {
            $payOrderResp = $pay->payPresentOrder($payParam);  //赠送订单
        } else if ($orderType == 9) {
            $payOrderResp = $pay->payGuessOrder($payParam);  //赠送订单
        }
		if (!empty($payOrderResp) && $payOrderResp->errCode == 0 && !empty($payOrderResp->data['orderNo'])) {
			echo 'success';
			exit();
		} else {
			$this->resp->msg = '支付失败';
			$this->jsonView->out($this->resp);
		}
	}

    public function batchPayNotify() {
        $alipay = requireModule("Alipay");
        $pay = requireModule("Pay");
        $batchPayNotifyResp = $alipay->batchPayNotify();//验签过程
        if ($batchPayNotifyResp->errCode != 0) {
            $this->resp->msg = $batchPayNotifyResp->msg;
            $this->jsonView->out($this->resp);
        }
        $tradeData = $batchPayNotifyResp->data;
        if (empty($tradeData) || !is_array($tradeData)) {
            $this->resp->msg = "tradeData有误";
            $this->jsonView->out($this->resp);
        }
        $selectOrderBatchByIdResp = $this->orderService->selectOrderBatchById((int)$tradeData['batchId']);
        if ($selectOrderBatchByIdResp->errCode != 0) {
            $this->resp->msg = "查询订单异常";
            $this->jsonView->out($this->resp);
        }
        $orderBatchData = $selectOrderBatchByIdResp->data;
        if (empty($orderBatchData)) {
            $this->resp->msg = "订单批量不存在";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$orderBatchData['userId'];
        $batchId = (int)$orderBatchData['batchId'];
        $amount = (int)$orderBatchData['amount'];
        $status = (int)$orderBatchData['status'];//批量状态, 1=未付款, 2=已付款, 3=已处理
        if ($userId != (int)$tradeData['userId']) {
            $this->resp->msg = "订单批量用户异常";
            $this->jsonView->out($this->resp);
        }
        if ($status == 2 || $status == 3) {
            echo 'success';
            exit();
        }
        global $curEnv;
        //只有正式环境，才去校验金额，测试环境都是1分钱(方便测试)
        if ($curEnv == 'dist' && $amount != (int)$tradeData['amount']) {
            $this->resp->msg = "订单批量金额异常";
            $this->jsonView->out($this->resp);
        }
        if ($userId <= 0 || $batchId <= 0 || $amount <= 0) {
            $this->resp->msg = '订单批量信息('.$userId.'|'.$batchId.'|'.$amount.')异常';
            $this->jsonView->out($this->resp);
        }
        if ($status != 1) {
            $this->resp->msg = '订单批量状态('.$status.')异常';
            $this->jsonView->out($this->resp);
        }
        $tradeType = (int)$tradeData['tradeType'];//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
        $tradeNo = trim($tradeData['tradeNo']);
        $tradeTime = trim($tradeData['tradeTime']);
        if (empty($tradeNo) || empty($tradeTime)) {
            $this->resp->msg = '通知数据异常';
            $this->jsonView->out($this->resp);
        }
        $database = requireModule('Database');
        $field = array();
        $field[] = 'tradeType="' . $database->escape($tradeType) . '"';
        $field[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
        $field[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
        $field[] = 'status=2';//批量状态, 1=未付款, 2=已付款, 3=已处理
        $sql = 'update t_order_batch set ' . implode(',', $field) . ' where batchId="'.$batchId.'" and status=1 limit 1';
        $result = $database->execute($sql);
        $affectedRows = (int)$database->getAffectedRows();
        if (!$result || $affectedRows <= 0) {
            $database->close();
            $this->resp->msg = '订单批量更新失败';
            $this->jsonView->out($this->resp);
        }
        $database->close();
        $doPayOrderBatchResp = $pay->doPayOrderBatch($batchId);
        if (!empty($doPayOrderBatchResp) && $doPayOrderBatchResp->errCode == 0) {
            echo 'success';
            exit();
        } else {
            $this->resp->msg = '支付失败';
            $this->jsonView->out($this->resp);
        }
    }

    public function transferNotify() {
        $this->logger->info('转账通知数据：'.print_r($_POST, true));
        global $externalPath;
        global $curEnv;
        require_once ($externalPath."alipayTransfer/lib/alipay_notify.class.php");
        if ($curEnv != 'dist') {
            $this->resp->msg = "环境配置有误";
            $this->jsonView->out($this->resp);
        }
        unset($_POST['c']);
        unset($_POST['m']);
        $string = $_POST;
        $alipay_config = array();
        $alipay_config['partner'] = '2088421272970682';
        $alipay_config['key'] = '30bi9uk19zpb1rfz62cpan8sbv86pxep';//安全检验码，以数字和字母组成的32位字符
        $alipay_config['sign_type'] = strtoupper('MD5');
        $alipay_config['input_charset'] = strtolower('utf-8');
        $alipay_config['cacert'] = $externalPath.'alipayTransfer/cacert.pem';//请保证cacert.pem文件在当前文件夹目录中
        $alipay_config['transport'] = 'http';//访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
        $alipayNotify = new \AlipayNotify($alipay_config);
        $verifyResult = $alipayNotify->verifyNotify();
        $this->logger->info('转账通知验签：'.($verifyResult ? '成功' : '失败'));
        if (!$verifyResult) {
            $this->resp->msg = "转账通知验签失败";
            $this->jsonView->out($this->resp);
        }
        $batchNo = trim($string['batch_no']);//批次号
        $successDetails = trim($string['success_details']);//成功信息
        $failDetails = trim($string['fail_details']);//失败信息
        if (empty($batchNo) || (empty($successDetails) && empty($failDetails))) {
            $this->resp->msg = "转账通知数据异常";
            $this->jsonView->out($this->resp);
        }
        //查询转账信息
        $param = array();
        $param['batchNo'] = $batchNo;
        $param['status'] = 0;//0=转账中, 1=转账成功, 2=转账失败
        $selectFinanceTransferResp = $this->financeService->selectFinanceTransfer($param);
        if ($selectFinanceTransferResp->errCode != 0) {
            $this->resp->msg = "转账查询异常";
            $this->jsonView->out($this->resp);
        }
        $transferList = $selectFinanceTransferResp->data['list'];
        if (!is_array($transferList) || count($transferList) <= 0) {
            $this->resp->msg = "转账数据不存在";
            $this->jsonView->out($this->resp);
        }
        /*//转账数据
        $batchNo = '201709281509271luan';
        $transferList = array(
            array('transferId' => 100000022,'userId' => 9001, 'financeType' => 1, 'withdrawId' => 100000022,'status' => 0,'amount' => 2000,),
            array('transferId' => 100000023,'userId' => 9001, 'financeType' => 1, 'withdrawId' => 100000023,'status' => 0,'amount' => 2000,),
            //array('transferId' => 100000008,'userId' => 9001, 'financeType' => 1, 'withdrawId' => 100000008,'status' => 0,'amount' => 2000,),
            //array('transferId' => 100000009,'userId' => 9001, 'financeType' => 1, 'withdrawId' => 100000009,'status' => 0,'amount' => 2000,),
        );
        //$successDetails = '100000006^15500556177@163.com^栾泉^20^S^null^201702140180422106^2017-09-28 17:30:00|100000007^15500556177@163.com^栾泉^20^S^null^201702140180422107^2017-09-28 17:30:00';
        $successDetails = '100000022^15500556177@163.com^栾泉^20^S^null^201702140180422122^2017-10-10 17:30:00|100000022';
        //$failDetails = '100000008^15500556177@163.com^栾泉^20^F^失败^201702140180422108^2017-09-28 17:30:00|100000009^15500556177@163.com^栾泉^20^F^失败^201702140180422109^2017-09-28 17:30:00';
        $failDetails = '100000023^15500556177@163.com^栾泉^20^F^失败^201702140180422123^2017-10-10 17:30:00|100000023';*/
        $transferMap = array();
        $withdrawIdArr = array();
        foreach ($transferList as $transfer) {
            $transferId = (int)$transfer['transferId'];
            $withdrawId = (int)$transfer['withdrawId'];
            $status = (int)$transfer['status'];
            $amount = (int)$transfer['amount'];
            if ($transferId > 0 && $withdrawId > 0 && $status == 0 && $amount > 0) {
                $transferMap[$transferId] = $transfer;
                $withdrawIdArr[] = $withdrawId;
            }
        }
        if (count($transferMap) <= 0 || count($withdrawIdArr) <= 0) {
            $this->resp->msg = "转账数据异常";
            $this->jsonView->out($this->resp);
        }
        //提款数据
        $param = array();
        $param['withdrawId'] = $withdrawIdArr;
        $param['status'] = 5;//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
        $selectFinanceWithdrawResp = $this->financeService->selectFinanceWithdraw($param);
        if ($selectFinanceWithdrawResp->errCode != 0) {
            $this->resp->msg = '访问异常';
            $this->jsonView->out($this->resp);
        }
        $withdrawList = $selectFinanceWithdrawResp->data['list'];
        $withdrawMap = array();
        foreach ($withdrawList as $withdraw) {
            $withdrawId = $withdraw['withdrawId'];
            $status = (int)$withdraw['status'];
            $amount = (int)$withdraw['amount'];
            if ($withdrawId > 0 && $status == 5 && $amount > 0) {
                $withdrawMap[$withdrawId] = $withdraw;
            }
        }
        if (count($withdrawMap) <= 0) {
            $this->resp->msg = "提款数据异常";
            $this->jsonView->out($this->resp);
        }
        $database = requireModule("Database");
        $successUpdateFinanceTransferSqlArr = array();
        $successUpdateFinanceWithdrawSqlArr = array();
        $successInsertFinanceWithdrawRecordSqlArr = array();
        $failUpdateFinanceTransferSqlArr = array();
        $failUpdateFinanceWithdrawSqlArr = array();
        $successDetails = explode('|', $successDetails);
        $failDetails = explode('|', $failDetails);
        /*批量付款中成功付款的信息。
        格式为：流水号^收款方账号^收款账号姓名^付款金额^成功标识(S)^成功原因(null)^支付宝内部流水号^完成时间。
        每条记录以“|”间隔。*/
        $setUserFinanceArr = array();
        foreach ($successDetails as $item) {
            $record = explode('^', $item);
            if (count($record) != 8) {
                continue;
            }
            $transferId = (int)$record[0];//流水号
            $accountNumber = trim($record[1]);//收款方账号
            $accountName = trim($record[2]);//收款账号姓名
            $amount = (int)($record[3] * 100);//付款金额
            $success = trim($record[4]);//成功标识(S)
            $remark = trim($record[5]);//成功原因(null)
            $transferNo = trim($record[6]);//支付宝内部流水号
            $transferTime = trim($record[7]);//完成时间
            $transfer = $transferMap[$transferId];
            $transferFinanceType = (int)$transfer['financeType'];
            $transferUserId = (int)$transfer['userId'];
            $transferAmount = (int)$transfer['amount'];
            $withdrawId = (int)$transfer['withdrawId'];
            $withdraw = $withdrawMap[$withdrawId];
            $withdrawFinanceType = (int)$withdraw['financeType'];
            $withdrawUserId = (int)$withdraw['userId'];
            $withdrawNickName = trim($withdraw['nickName']);
            $withdrawRealName = trim($withdraw['realName']);
            $withdrawAmount = (int)$withdraw['amount'];
            if ($transferId <= 0 || empty($accountNumber) || empty($accountName) || $amount <= 0 || $success != 'S' || empty($transferNo) || empty($transferTime) || empty($transfer) || $withdrawId <= 0 || empty($withdraw) || $transferFinanceType != $withdrawFinanceType || $transferUserId != $withdrawUserId || $amount != $transferAmount || $amount != $withdrawAmount) {
                continue;
            }
            //transfer表更新
            $updateFinanceTransferField = array();
            $updateFinanceTransferField[] = 'transferNo="' . $database->escape($transferNo) . '"';
            $updateFinanceTransferField[] = 'transferTime="' . $database->escape($transferTime) . '"';
            $updateFinanceTransferField[] = 'remark="' . $database->escape($remark) . '"';
            $updateFinanceTransferField[] = 'status=1';//0=转账中, 1=转账成功, 2=转账失败
            $successUpdateFinanceTransferSqlArr[] = 'update t_finance_transfer set ' . implode(',', $updateFinanceTransferField) . ' where status=0 and transferId="' . $transferId . '" and batchNo="' . $database->escape($batchNo) . '" limit 1';
            //withdraw表状态更新(status：1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中)
            $successUpdateFinanceWithdrawSqlArr[] = 'update t_finance_withdraw set status=3 where status=5 and withdrawId="' . $withdrawId . '" limit 1';
            //record表插入
            $insertFinanceWithdrawRecordField = array();
            $insertFinanceWithdrawRecordField[] = 'financeType="' . $database->escape($withdrawFinanceType) . '"';
            $insertFinanceWithdrawRecordField[] = 'userId="' . $database->escape($withdrawUserId) . '"';
            $insertFinanceWithdrawRecordField[] = 'nickName="' . $database->escape($withdrawNickName) . '"';
            $insertFinanceWithdrawRecordField[] = 'realName="' . $database->escape($withdrawRealName) . '"';
            $insertFinanceWithdrawRecordField[] = 'type=3';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceWithdrawRecordField[] = 'amount="' . $database->escape($amount) . '"';
            $insertFinanceWithdrawRecordField[] = 'createTime=now()';
            $successInsertFinanceWithdrawRecordSqlArr[] = 'insert into t_finance_record set ' . implode(',', $insertFinanceWithdrawRecordField);
            //t_finance表信息 更新状态为已打款 -待提款总额 +已提款总额
            $withdrawUserIdFinanceType = $withdrawUserId . '_' . $transferFinanceType;
            if (!key_exists($withdrawUserIdFinanceType, $setUserFinanceArr)) {
                $setUserFinanceArr[$withdrawUserIdFinanceType] = array();
                $setUserFinanceArr[$withdrawUserIdFinanceType]['userId'] = $withdrawUserId;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['financeType'] = $transferFinanceType;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrawingChangeAmount'] = 0;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrewChangeAmount'] = 0;
            }
            $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrawingChangeAmount'] -= $amount;    //待提款总额(未审核+已审核)
            $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrewChangeAmount'] += $amount;       //已提款总额(已打款)
        }
        /*批量付款中未成功付款的信息。
        格式为：流水号^收款方账号^收款账号姓名^付款金额^失败标识(F)^失败原因^支付宝内部流水号^完成时间。
        每条记录以“|”间隔。*/
        foreach ($failDetails as $item) {
            $record = explode('^', $item);
            if (count($record) != 8) {
                continue;
            }
            $transferId = (int)$record[0];//流水号
            $accountNumber = trim($record[1]);//收款方账号
            $accountName = trim($record[2]);//收款账号姓名
            $amount = (int)($record[3] * 100);//付款金额
            $success = trim($record[4]);//失败标识(F)
            $remark = trim($record[5]);//失败原因
            $transferNo = trim($record[6]);//支付宝内部流水号
            $transferTime = trim($record[7]);//完成时间
            $transfer = $transferMap[$transferId];
            $transferFinanceType = (int)$transfer['financeType'];
            $transferUserId = (int)$transfer['userId'];
            $transferAmount = (int)$transfer['amount'];
            $withdrawId = (int)$transfer['withdrawId'];
            $withdraw = $withdrawMap[$withdrawId];
            $withdrawFinanceType = (int)$withdraw['financeType'];
            $withdrawUserId = (int)$withdraw['userId'];
            $withdrawAmount = (int)$withdraw['amount'];
            if ($transferId <= 0 || empty($accountNumber) || empty($accountName) || $amount <= 0 || $success != 'F' || empty($transferNo) || empty($transferTime) || empty($transfer) || $withdrawId <= 0 || empty($withdraw) || $transferFinanceType != $withdrawFinanceType || $transferUserId != $withdrawUserId || $amount != $transferAmount || $amount != $withdrawAmount) {
                continue;
            }
            //transfer表更新
            $updateFinanceTransferField = array();
            $updateFinanceTransferField[] = 'transferNo="' . $database->escape($transferNo) . '"';
            $updateFinanceTransferField[] = 'transferTime="' . $database->escape($transferTime) . '"';
            $updateFinanceTransferField[] = 'remark="' . $database->escape($remark) . '"';
            $updateFinanceTransferField[] = 'status=2';//0=转账中, 1=转账成功, 2=转账失败
            $failUpdateFinanceTransferSqlArr[] = 'update t_finance_transfer set ' . implode(',', $updateFinanceTransferField) . ' where status=0 and transferId="' . $transferId . '" and batchNo="' . $database->escape($batchNo) . '" limit 1';
            //withdraw表状态更新(status：1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中)
            $failUpdateFinanceWithdrawSqlArr[] = 'update t_finance_withdraw set status=4,remark="支付宝姓名和帐号不符" where status=5 and withdrawId="' . $withdrawId . '" limit 1';
            //t_finance表信息,转账失败，更新状态为已拒绝 -待提款总额
            $withdrawUserIdFinanceType = $withdrawUserId . '_' . $transferFinanceType;
            if (!key_exists($withdrawUserIdFinanceType, $setUserFinanceArr)) {
                $setUserFinanceArr[$withdrawUserIdFinanceType] = array();
                $setUserFinanceArr[$withdrawUserIdFinanceType]['userId'] = $withdrawUserId;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['financeType'] = $transferFinanceType;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrawingChangeAmount'] = 0;
                $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrewChangeAmount'] = 0;
            }
            $setUserFinanceArr[$withdrawUserIdFinanceType]['withdrawingChangeAmount'] -= $amount;
        }
        $successUpdateFinanceTransferSqlArrLength = count($successUpdateFinanceTransferSqlArr);
        $successUpdateFinanceWithdrawSqlArrLength = count($successUpdateFinanceWithdrawSqlArr);
        $successInsertFinanceWithdrawRecordSqlArrLength = count($successInsertFinanceWithdrawRecordSqlArr);
        $failUpdateFinanceTransferSqlArrLength = count($failUpdateFinanceTransferSqlArr);
        $failUpdateFinanceWithdrawSqlArrLength = count($failUpdateFinanceWithdrawSqlArr);
        if ($successUpdateFinanceTransferSqlArrLength <= 0 && $successUpdateFinanceWithdrawSqlArrLength <= 0 && $successInsertFinanceWithdrawRecordSqlArrLength <= 0 && $failUpdateFinanceTransferSqlArrLength <= 0 && $failUpdateFinanceWithdrawSqlArrLength <= 0) {
            $this->resp->msg = '转账通知数据(success_details|fail_details)异常';
            $this->jsonView->out($this->resp);
        }
        if (($successUpdateFinanceTransferSqlArrLength > 0 || $successUpdateFinanceWithdrawSqlArrLength > 0 || $successInsertFinanceWithdrawRecordSqlArrLength > 0) && ($successUpdateFinanceTransferSqlArrLength != $successUpdateFinanceWithdrawSqlArrLength || $successUpdateFinanceTransferSqlArrLength != $successInsertFinanceWithdrawRecordSqlArrLength)) {
            $this->resp->msg = '转账通知数据(success_details)异常';
            $this->jsonView->out($this->resp);
        }
        if (($failUpdateFinanceTransferSqlArrLength > 0 || $failUpdateFinanceWithdrawSqlArrLength > 0) && $failUpdateFinanceTransferSqlArrLength != $failUpdateFinanceWithdrawSqlArrLength) {
            $this->resp->msg = '转账通知数据(fail_details)异常';
            $this->jsonView->out($this->resp);
        }
        $setUserFinanceSqlArr = array();
        foreach ($setUserFinanceArr as $item) {
            $userId = (int)$item['userId'];
            $financeType = (int)$item['financeType'];
            $withdrawingChangeAmount = (int)$item['withdrawingChangeAmount'];
            $withdrewChangeAmount = (int)$item['withdrewChangeAmount'];
            if ($userId <= 0 || $financeType < 0) { //$financeType = 0/1
                $this->resp->msg = '用户'.$userId.'资金体系异常';
                $this->jsonView->out($this->resp);
            }
            $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
            if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                $this->resp->msg = '用户'.$userId.'资金体系异常';
                $this->jsonView->out($this->resp);
            }
            $financeDataExtra = $selectFinanceExtraByUserIdResp->data;
            if (empty($financeDataExtra)) {
                $this->resp->msg = '用户'.$userId.'资金体系异常';
                $this->jsonView->out($this->resp);
            }
            $financeIdExtra = (int)$financeDataExtra['financeId'];
            $dataVersionExtra = (int)$financeDataExtra['dataVersion'];
            if ($financeIdExtra <= 0){
                $this->resp->msg = '用户'.$userId.'资金体系异常';
                $this->jsonView->out($this->resp);
            }
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['withdrawingChangeAmount'] = $withdrawingChangeAmount;   //待提款总额(未审核+已审核)减少
            $updateFinanceSqlExtraParam['withdrewChangeAmount'] = $withdrewChangeAmount; //已提款总额(已打款)增加
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $this->resp->msg = 'financeId='.$financeIdExtra.'生成sql异常';
                $this->jsonView->out($this->resp);
            }
            $setUserFinanceSqlArr[] = $updateFinanceSqlExtra;
        }
        if ($database->execute('start transaction')) {
            if ($successUpdateFinanceTransferSqlArrLength > 0) {
                //更新转账
                $sql = implode(';', $successUpdateFinanceTransferSqlArr);
                $result = $database->multiExecute($sql);
                if (!$result) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '转账更新异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                $successUpdateFinanceTransferAffectedRowsArr = $database->multiAffectedRows();
                $successUpdateFinanceTransferAffectedRowsArrLength = count($successUpdateFinanceTransferAffectedRowsArr);
                if ($successUpdateFinanceTransferAffectedRowsArrLength <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '转账更新影响行数异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                //更新提款
                $sql = implode(';', $successUpdateFinanceWithdrawSqlArr);
                $result = $database->multiExecute($sql);
                if (!$result) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '提款更新异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                $successUpdateFinanceWithdrawAffectedRowsArr = $database->multiAffectedRows();
                $successUpdateFinanceWithdrawAffectedRowsArrLength = count($successUpdateFinanceWithdrawAffectedRowsArr);
                if ($successUpdateFinanceWithdrawAffectedRowsArrLength <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '提款更新影响行数异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                //插入流水
                $sql = implode(';', $successInsertFinanceWithdrawRecordSqlArr);
                $result = $database->multiExecute($sql);
                if (!$result) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '流水插入sql执行异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                $recordIdArr = $database->multiInsertId();
                $recordIdArrLength = count($recordIdArr);
                if ($recordIdArrLength <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '流水id生成异常(success_details)';
                    $this->jsonView->out($this->resp);
                }
                if ($successUpdateFinanceTransferAffectedRowsArrLength != $successUpdateFinanceWithdrawAffectedRowsArrLength || $successUpdateFinanceTransferAffectedRowsArrLength != $recordIdArrLength) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '通知信息和sql产生不符(success_details)';
                    $this->jsonView->out($this->resp);
                }
                for ($i = 0, $length = count($successUpdateFinanceTransferAffectedRowsArr); $i < $length; $i++) {
                    $recordId = (int)$recordIdArr[$i];
                    $successUpdateFinanceTransferAffectedRows = (int)$successUpdateFinanceTransferAffectedRowsArr[$i];
                    $successUpdateFinanceWithdrawAffectedRows = (int)$successUpdateFinanceWithdrawAffectedRowsArr[$i];
                    if ($recordId <= 0 || $successUpdateFinanceTransferAffectedRows != 1 || $successUpdateFinanceWithdrawAffectedRows != 1) {
                        $database->execute('rollback');
                        $database->close();
                        $this->resp->msg = 'sql执行异常(success_details)';
                        $this->jsonView->out($this->resp);
                    }
                }
            }
            if ($failUpdateFinanceTransferSqlArrLength > 0) {
                //更新转账
                $sql = implode(';', $failUpdateFinanceTransferSqlArr);
                $result = $database->multiExecute($sql);
                if (!$result) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '转账更新异常(fail_details)';
                    $this->jsonView->out($this->resp);
                }
                $failUpdateFinanceTransferAffectedRowsArr = $database->multiAffectedRows();
                $failUpdateFinanceTransferAffectedRowsArrLength = count($failUpdateFinanceTransferAffectedRowsArr);
                if ($failUpdateFinanceTransferAffectedRowsArrLength <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '转账更新影响行数异常(fail_details)';
                    $this->jsonView->out($this->resp);
                }
                //更新提款
                $sql = implode(';', $failUpdateFinanceWithdrawSqlArr);
                $result = $database->multiExecute($sql);
                if (!$result) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '提款更新异常(fail_details)';
                    $this->jsonView->out($this->resp);
                }
                $failUpdateFinanceWithdrawAffectedRowsArr = $database->multiAffectedRows();
                $failUpdateFinanceWithdrawAffectedRowsArrLength = count($failUpdateFinanceWithdrawAffectedRowsArr);
                if ($failUpdateFinanceWithdrawAffectedRowsArrLength <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '提款更新影响行数异常(fail_details)';
                    $this->jsonView->out($this->resp);
                }
                if ($failUpdateFinanceTransferAffectedRowsArrLength != $failUpdateFinanceWithdrawAffectedRowsArrLength) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = '通知信息和sql产生不符(fail_details)';
                    $this->jsonView->out($this->resp);
                }
                for ($i = 0, $length = count($failUpdateFinanceTransferAffectedRowsArr); $i < $length; $i++) {
                    $failUpdateFinanceTransferAffectedRows = (int)$failUpdateFinanceTransferAffectedRowsArr[$i];
                    $failUpdateFinanceWithdrawAffectedRows = (int)$failUpdateFinanceWithdrawAffectedRowsArr[$i];
                    if ($failUpdateFinanceTransferAffectedRows != 1 || $failUpdateFinanceWithdrawAffectedRows != 1) {
                        $database->execute('rollback');
                        $database->close();
                        $this->resp->msg = 'sql执行异常(fail_details)';
                        $this->jsonView->out($this->resp);
                    }
                }
            }
            $setUserFinanceSqlArrLength = count($setUserFinanceSqlArr);
            if ($setUserFinanceSqlArrLength <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = '用户资金账户更新异常';
                $this->jsonView->out($this->resp);
            }
            $sql = implode(';', $setUserFinanceSqlArr);
            $result = $database->multiExecute($sql);
            if (!$result) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = '用户资金账户更新异常';
                $this->jsonView->out($this->resp);
            }
            $setUserFinanceSqlArrAffectedRowsArr = $database->multiAffectedRows();
            $setUserFinanceSqlArrAffectedRowsArrLength = count($setUserFinanceSqlArrAffectedRowsArr);
            if ($setUserFinanceSqlArrAffectedRowsArrLength <= 0 || $setUserFinanceSqlArrAffectedRowsArrLength != $setUserFinanceSqlArrLength) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = '用户资金账户更新异常';
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            echo "success";
            $this->logger->info('转账通知成功');
            exit;
        } else {
            $this->resp->msg = '转账通知失败';
            $this->jsonView->out($this->resp);
        }
    }
}