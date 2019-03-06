<?php
namespace controller\portal;
use controller\Base;

class Weixin extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $jssdk;
	private $commonService;
	private $userService;
	private $financeService;
	private $orderService;
	private $couponService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->jssdk = requireModule("Jssdk");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->financeService  = requireService("Finance");
		$this->orderService = requireService("Order");
		$this->couponService = requireService("Coupon");
	}

	//不存就插入, 存在就更新
	public function jssdk() {
		$url = trim($this->common->getParam("url", ''));
		if (empty($url)) {
			$this->resp->msg = "url参数不能为空";
			$this->jsonView->out($this->resp);
		}
		$signPackage = $this->jssdk->getSignPackage($url);
		if (empty($signPackage) || empty($signPackage["appId"]) || empty($signPackage["timestamp"]) || empty($signPackage["nonceStr"]) || empty($signPackage["signature"])) {
			$this->resp->msg = "jssdk初始化异常";
			$this->jsonView->out($this->resp);
		}
		$data = array(
			"appId" => $signPackage["appId"],
			"timestamp" => $signPackage["timestamp"],
			"nonceStr" => $signPackage["nonceStr"],
			"signature" => $signPackage["signature"]
		);
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function payNotify() {
        $iapppay = requireModule("Iapppay");
		$pay = requireModule("Pay");
		$payNotifyResp = $iapppay->payNotify();//验签过程
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
		$iapppay = requireModule("Iapppay");
		$pay = requireModule("Pay");
		$batchPayNotifyResp = $iapppay->batchPayNotify();//验签过程
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
}