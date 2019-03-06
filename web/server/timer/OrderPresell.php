<?php
class OrderPresell {
    private $common;
    private $commonService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
    }

    /********************************************************************* 竞彩和数字彩分割线  **************************************************************************/
    
    public function digitalTicketPresell() {
        $param = array();
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = 9;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票, 9=待开售
        $param['orderBy'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个数字彩出票预售单');
        $orderList = $this->commonService->setLotteryIssue($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票, 9=待开售
            $ticketUnit = (int)$order['ticketUnit'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            $lotteryId = trim($order['lotteryId']);
            $issue = trim($order['issue']);
            $betContent = trim($order['betContent']);
            $lotteryIssue = $order['lotteryIssue'];
            $beginTime = (int)strtotime(trim($lotteryIssue['beginTime']));
            $endTime = (int)strtotime(trim($lotteryIssue['endTime']));
            if (empty($order) || $orderId <= 0 || $orderType != 7 || $status != 2 || $amount <= 0 || $ticketStatus != 9 || $ticketUnit <= 0 || $ticketMultiple <= 0 || empty($lotteryId) || empty($issue) || empty($betContent) || empty($lotteryIssue) || $beginTime <= 0 || $endTime <= 0) {
                continue;
            }
            $doDigitalTicketPresellResp = $this->doDigitalTicketPresell($orderId);
            if ($doDigitalTicketPresellResp->errCode != 0) {
                $this->common->logger->info('数字彩预售订单处理失败('.$orderId.')：'.$doDigitalTicketPresellResp->msg);
            } else {
                $this->common->logger->info('数字彩预售订单处理成功('.$orderId.')');
            }
        }
        $this->common->logger->info('数字彩预售订单处理完成('.count($orderList).')');
    }

    public function doDigitalTicketPresell($orderId) {
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
        $orderData = $this->commonService->setLotteryIssue(array($orderData))[0];
        $orderId = (int)$orderData['orderId'];
        $orderType = (int)$orderData['orderType'];
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$orderData['amount'];
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票, 9=待开售
        $ticketUnit = (int)$orderData['ticketUnit'];
        $ticketMultiple = (int)$orderData['ticketMultiple'];
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        $lotteryId = trim($orderData['lotteryId']);
        $issue = trim($orderData['issue']);
        $betContent = trim($orderData['betContent']);
        $lotteryIssue = $orderData['lotteryIssue'];
        $beginTime = (int)strtotime(trim($lotteryIssue['beginTime']));
        $endTime = (int)strtotime(trim($lotteryIssue['endTime']));
        if ($orderType != 7) {
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
        if ($ticketStatus != 9) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if (empty($lotteryId)) {
            $resp->msg = "彩种异常";
            return $resp;
        }
        if (empty($issue) || empty($lotteryIssue) || $beginTime <= 0 || $endTime <= 0) {
            $resp->msg = "期号异常";
            return $resp;
        }
        if (empty($betContent)) {
            $resp->msg = "投注格式异常";
            return $resp;
        }
        $zongGuan = requireModule('ZongGuan');
        if ($ticketSupplierId == 1) {
            $lottery = $zongGuan->lotteryMap[$lotteryId];
            $beginTimeOffset = (int)$lottery['beginTimeOffset'];
            $endTimeOffset = (int)$lottery['endTimeOffset'];
            if (!empty($lottery)) {
                $beginTime += $beginTimeOffset;
                $endTime -= $endTimeOffset;
            }
        }
        $ticketDealOrderIdArr = array();
        $curTime = time();
        $tStatus = null;//等待设置的票状态
        if ($curTime >= $endTime) {
            $tStatus = 1;
        } else if ($curTime >= $beginTime) {
            $ticketDealOrderIdArr[] = $orderId;
            $tStatus = 0;
        }
        if ($tStatus === null) {
            $resp->msg = "不符合状态设置";
            return $resp;
        }
        $database = requireModule("Database");
        $field = array();
        $field[] = 'ticketStatus="' . $database->escape($tStatus) . '"';
        $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = "sql执行失败";
            return $resp;
        }
        $database->close();
        if (count($ticketDealOrderIdArr) > 0) {
            if ($ticketSupplierId == 1) {
                $zongGuan->orderDigitalTicketDeal($ticketDealOrderIdArr);
            }
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}