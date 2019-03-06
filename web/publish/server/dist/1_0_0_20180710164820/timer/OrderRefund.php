<?php
class OrderRefund {
    private $common;
    private $commonService;
    private $orderService;
    private $userService;
    private $ticketService;
    private $financeService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->userService = requireService("User");
        $this->ticketService = requireService("Ticket");
        $this->financeService = requireService("Finance");
    }

    public function refundTicket() {
        $param = array();
        $param['orderType'] = array(3,9);//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(1,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            $amount = (int)$order['amount'];
            if ($orderId <= 0 || ($orderType != 3 && $orderType != 9) || $status != 2 || ($ticketStatus != 1 && $ticketStatus != 8) || $amount <= 0) {
                continue;
            }
            $doRefundTicketResp = $this->doRefundTicket($orderId);
            if ($doRefundTicketResp->errCode != 0) {
                $this->common->logger->info('竞技彩退款失败('.$orderId.')：'.$doRefundTicketResp->msg);
            } else {
                $this->common->logger->info('竞技彩退款成功('.$orderId.')');
            }
            sleep(1);
        }
        $this->common->logger->info('竞技彩退款完成('.count($orderList).')');
    }

    //后台退款操作
    public function doRefundTicket($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $amount = (int)$orderData['amount'];
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        if ($orderType != 3 && $orderType != 9) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($ticketStatus != 1 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        $refundAmount = 0;
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needSport'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                return;
            }
            $ticketList = $selectTicketResp->data['list'];
            if (is_array($ticketList) && count($ticketList) > 0) {
                foreach ($ticketList as $ticket) {
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    if ($ts == 1 || $ts == 5) {
                        $refundAmount += $ta;
                    }
                }
            } else {
                $refundAmount = $amount;
            }
            if (($ticketStatus == 1 && $refundAmount != $amount) || ($ticketStatus == 8 && $refundAmount >= $amount)) {
                $resp->msg = "票状态和退款金额不符";
                return $resp;
            }
        } else if ($ticketStatus == 1) {
            $refundAmount = $amount;
        }
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        $setStatus = 0;
        if ($ticketStatus == 1) {
            if ($refundAmount == $amount) {
                $setStatus = 3;
            }
        } else if ($ticketStatus == 8) {
            if ($refundAmount < $amount) {
                $setStatus = 4;
            }
        }
        if ($setStatus <= 0) {
            $resp->msg = "设置的订单状态异常";
            return $resp;
        }
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $financeType = 1;//资金类型, 0=方案, 1=出票
        /*查询用户的资金账户体系*/
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status="'.$database->escape($setStatus).'" where orderId="' . $orderId . '" and orderType="'.$database->escape($orderType).'" and status=2 and ticketStatus="'.$database->escape($ticketStatus).'" limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新订单异常";
                return $resp;
            }
            //充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeRecordField[] = 'remark="出票失败退款"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入流水异常";
                return $resp;
            }
            //充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeField[] = 'remark="出票失败退款"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入充值异常";
                return $resp;
            }
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['userChargeChangeAmount'] = $refundAmount;   //退款走的是用户充值
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            //消息推送
            $this->sendRefundTicketMessage($orderId);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '退款失败';
            return $resp;
        }
    }

    private function sendRefundTicketMessage($orderId) {
        $resp = requireModule('Resp');
        if ($orderId <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        $orderNumeric = $this->common->getOrderNumeric($orderData);
        if (!is_numeric($orderNumeric)) {
            $resp->msg = 'orderNumeric有误';
            return $resp;
        }
        $orderId = (int)$orderData['orderId'];
        $userId = (int)$orderData['userId'];
        $amount = (int)$orderData['amount'];
        $orderType = (int)$orderData['orderType'];
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        if ($orderType != 3 && $orderType != 9) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
        if ($status != 3 && $status != 4) {
            $resp->msg = 'status有误';
            return $resp;
        }
        if ($ticketStatus != 1 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        $refundAmount = 0;
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needSport'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                return;
            }
            $ticketList = $selectTicketResp->data['list'];
            if (is_array($ticketList) && count($ticketList) > 0) {
                foreach ($ticketList as $ticket) {
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    if ($ts == 1 || $ts == 5) {
                        $refundAmount += $ta;
                    }
                }
            } else {
                $refundAmount = $amount;
            }
            if (($ticketStatus == 1 && $refundAmount != $amount) || ($ticketStatus == 8 && $refundAmount >= $amount)) {
                $resp->msg = "票状态和退款金额不符";
                return $resp;
            }
        } else if ($ticketStatus == 1) {
            $refundAmount = $amount;
        }
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        $msgTitle = null;
        if ($status == 3) {
            if ($refundAmount == $amount) {
                $msgTitle = '出票失败，已退款';
            }
        } else if ($status == 4) {
            if ($refundAmount < $amount) {
                $msgTitle = '部分出票失败，已退出票失败款';
            }
        }
        if (empty($msgTitle)) {
            $resp->msg = "消息标题异常";
            return $resp;
        }
        $refundAmount = $refundAmount/100;
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
        } else {
            $url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
        }
        $data = array();
        $data['first'] = array('value' => $msgTitle, 'color' => '#000000');
        $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
        $data['keyword2'] = array('value' => '已退款'.$refundAmount.'元', 'color' => '#000000');
        $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    /********************************************************************* 竞彩和数字彩分割线  **************************************************************************/

    public function digitalRefundTicket() {
        $param = array();
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(1,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            $amount = (int)$order['amount'];
            if ($orderId <= 0 || $orderType != 7 || $status != 2 || ($ticketStatus != 1 && $ticketStatus != 8) || $amount <= 0) {
                continue;
            }
            $doDigitalRefundTicketResp = $this->doDigitalRefundTicket($orderId);
            if ($doDigitalRefundTicketResp->errCode != 0) {
                $this->common->logger->info('数字彩退款失败('.$orderId.')：'.$doDigitalRefundTicketResp->msg);
            } else {
                $this->common->logger->info('数字彩退款成功('.$orderId.')');
            }
            sleep(1);
        }
        $this->common->logger->info('数字彩退款完成('.count($orderList).')');
    }

    //后台退款操作
    public function doDigitalRefundTicket($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $amount = (int)$orderData['amount'];
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        if ($orderType != 7) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($ticketStatus != 1 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        $refundAmount = 0;
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needDigital'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                return;
            }
            $ticketList = $selectTicketResp->data['list'];
            if (is_array($ticketList) && count($ticketList) > 0) {
                foreach ($ticketList as $ticket) {
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    if ($ts == 1 || $ts == 5) {
                        $refundAmount += $ta;
                    }
                }
            } else {
                $refundAmount = $amount;
            }
            if (($ticketStatus == 1 && $refundAmount != $amount) || ($ticketStatus == 8 && $refundAmount >= $amount)) {
                $resp->msg = "票状态和退款金额不符";
                return $resp;
            }
        } else if ($ticketStatus == 1) {
            $refundAmount = $amount;
        }
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        $setStatus = 0;
        if ($ticketStatus == 1) {
            if ($refundAmount == $amount) {
                $setStatus = 3;
            }
        } else if ($ticketStatus == 8) {
            if ($refundAmount < $amount) {
                $setStatus = 4;
            }
        }
        if ($setStatus <= 0) {
            $resp->msg = "设置的订单状态异常";
            return $resp;
        }
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $financeType = 1;//资金类型, 0=方案, 1=出票
        /*查询用户的资金账户体系*/
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status="'.$database->escape($setStatus).'" where orderId="' . $orderId . '" and orderType=7 and status=2 and ticketStatus="'.$database->escape($ticketStatus).'" limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新订单异常";
                return $resp;
            }
            //充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeRecordField[] = 'remark="出票失败退款"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入流水异常";
                return $resp;
            }
            //充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeField[] = 'remark="出票失败退款"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入充值异常";
                return $resp;
            }
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['userChargeChangeAmount'] = $refundAmount;
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            //消息推送
            $this->digitalSendRefundTicketMessage($orderId);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;

        } else {
            $resp->msg = '退款失败';
            return $resp;
        }
    }

    private function digitalSendRefundTicketMessage($orderId) {
        $resp = requireModule('Resp');
        if ($orderId <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        $orderNumeric = $this->common->getOrderNumeric($orderData);
        if (!is_numeric($orderNumeric)) {
            $resp->msg = 'orderNumeric有误';
            return $resp;
        }
        $orderId = (int)$orderData['orderId'];
        $userId = (int)$orderData['userId'];
        $amount = (int)$orderData['amount'];
        $orderType = (int)$orderData['orderType'];
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        if ($orderType != 7) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
        if ($status != 3 && $status != 4) {
            $resp->msg = 'status有误';
            return $resp;
        }
        if ($ticketStatus != 1 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        $refundAmount = 0;
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needDigital'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                return;
            }
            $ticketList = $selectTicketResp->data['list'];
            if (is_array($ticketList) && count($ticketList) > 0) {
                foreach ($ticketList as $ticket) {
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    if ($ts == 1 || $ts == 5) {
                        $refundAmount += $ta;
                    }
                }
            } else {
                $refundAmount = $amount;
            }
            if (($ticketStatus == 1 && $refundAmount != $amount) || ($ticketStatus == 8 && $refundAmount >= $amount)) {
                $resp->msg = "票状态和退款金额不符";
                return $resp;
            }
        } else if ($ticketStatus == 1) {
            $refundAmount = $amount;
        }
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        $msgTitle = null;
        if ($status == 3) {
            if ($refundAmount == $amount) {
                $msgTitle = '出票失败，已退款';
            }
        } else if ($status == 4) {
            if ($refundAmount < $amount) {
                $msgTitle = '部分出票失败，已退出票失败款';
            }
        }
        if (empty($msgTitle)) {
            $resp->msg = "消息标题异常";
            return $resp;
        }
        $refundAmount = $refundAmount/100;
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
        } else {
            $url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
        }
        $data = array();
        $data['first'] = array('value' => $msgTitle, 'color' => '#000000');
        $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
        $data['keyword2'] = array('value' => '已退款'.$refundAmount.'元', 'color' => '#000000');
        $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }


    //赠送彩票退款
    public function presentRefundTicket() {
        $param = array();
        $param['orderType'] = 8;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['presentStatus'] = 2;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $amount = (int)$order['amount'];
            $presentNum = (int)$order['presentNum'];
            $presentReceived = (int)$order['presentReceived'];
            $createTime = trim($order['createTime']);
            if ($orderId <= 0 || $orderType != 8 || $status != 2 || $amount <= 0 || $presentNum <= 0 || $presentReceived < 0 || $presentNum <= $presentReceived || strtotime($createTime)+24*3600*30 >= time()) {
                continue;
            }
            $doPresentRefundTicketResp = $this->doPresentRefundTicket($orderId);
            if ($doPresentRefundTicketResp->errCode != 0) {
                $this->common->logger->info('彩票红包退款失败('.$orderId.')：'.$doPresentRefundTicketResp->msg);
            } else {
                $this->common->logger->info('彩票红包退款成功('.$orderId.')');
            }
            sleep(1);
        }
        $this->common->logger->info('彩票红包退款完成('.count($orderList).')');
    }

    //后台退款操作
    public function doPresentRefundTicket($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$orderData['amount'];
        $presentNum = (int)$orderData['presentNum'];
        $presentReceived = (int)$orderData['presentReceived'];
        $createTime = trim($orderData['createTime']);
        if ($orderType != 8) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($presentNum <= 0) {
            $resp->msg = "订单赠送数量异常";
            return $resp;
        }
        if ($presentReceived < 0) {
            $resp->msg = "订单领取数量异常";
            return $resp;
        }
        if ($presentNum <= $presentReceived) {
            $resp->msg = "订单领取数量大于等于赠送数量";
            return $resp;
        }
        if (strtotime($createTime)+24*3600*30 >= time()) {
            $resp->msg = "订单退款时间异常";
            return $resp;
        }
        $setStatus = 0;
        $spanCount = (int)($presentNum - $presentReceived);
        $refundAmount = 200*$spanCount;
        if ($spanCount == $presentNum) {
            $setStatus = 3; //全部退款
        } else if ($spanCount < $presentNum) {
            $setStatus = 4; //部分退款
        }
        if ($setStatus <= 0) {
            $resp->msg = "设置的订单状态异常";
            return $resp;
        }
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $financeType = 1;//资金类型, 0=方案, 1=出票
        /*查询用户的资金账户体系*/
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status="'.$database->escape($setStatus).'" where orderId="' . $orderId . '" and orderType=8 and status=2 and presentNum > presentReceived limit 1';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新订单异常";
                return $resp;
            }
            //充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeRecordField[] = 'remark="彩票红包过期退款"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入流水异常";
                return $resp;
            }
            //充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($refundAmount) . '"';
            $insertFinanceChargeField[] = 'remark="彩票红包过期退款"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入充值异常";
                return $resp;
            }
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['userChargeChangeAmount'] = $refundAmount;   //退款用户充值
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            //消息推送
            $this->presentSendRefundTicketMessage($orderId);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '退款失败';
            return $resp;
        }
    }

    private function presentSendRefundTicketMessage($orderId) {
        $resp = requireModule('Resp');
        if ($orderId <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        $orderNumeric = $this->common->getOrderNumeric($orderData);
        if (!is_numeric($orderNumeric)) {
            $resp->msg = 'orderNumeric有误';
            return $resp;
        }
        $orderId = (int)$orderData['orderId'];
        $userId = (int)$orderData['userId'];
        $amount = (int)$orderData['amount'];
        $orderType = (int)$orderData['orderType'];
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $presentNum = (int)$orderData['presentNum'];
        $presentReceived = (int)$orderData['presentReceived'];
        $createTime = trim($orderData['createTime']);
        if ($orderType != 8) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
        if ($status != 3 && $status != 4) {
            $resp->msg = 'status有误';
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($presentNum <= 0) {
            $resp->msg = "订单赠送数量异常";
            return $resp;
        }
        if ($presentReceived < 0) {
            $resp->msg = "订单领取数量异常";
            return $resp;
        }
        if ($presentNum <= $presentReceived) {
            $resp->msg = "订单领取数量大于等于赠送数量";
            return $resp;
        }
        if (strtotime($createTime)+24*3600*30 >= time()) {
            $resp->msg = "订单退款时间异常";
            return $resp;
        }
        $spanCount = (int)($presentNum - $presentReceived);
        $refundAmount = 200*$spanCount;
        if ($refundAmount <= 0 || $refundAmount > $amount) {
            $resp->msg = "退款金额异常";
            return $resp;
        }
        if (($status == 3 && $refundAmount != $amount) || ($status == 4 && $refundAmount >= $amount)) {
            $resp->msg = "票状态和退款金额不符";
            return $resp;
        }
        $msgTitle = '彩票红包过期退款';
        $refundAmount = $refundAmount/100;
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#receivedOrder&orderNo='.$orderNo;
            $templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
        } else {
            $url = 'http://beta.shaimii.com/#receivedOrder&orderNo='.$orderNo;
            $templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
        }
        $data = array();
        $data['first'] = array('value' => $msgTitle, 'color' => '#000000');
        $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
        $data['keyword2'] = array('value' => '已退款'.$refundAmount.'元', 'color' => '#000000');
        $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}