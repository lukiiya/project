#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class OrderTicketExpectPrizeAmount {
    private $common;
    private $commonService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
    }

    public function execute() {
        $param = array();
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款
        $param['ticketStatus'] = array(4,5);//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个订单需要修复');
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $planMatchRecommend = json_decode($planMatchRecommend, true);
            $matchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || ($ticketStatus != 4 && $ticketStatus != 5) || $ticketMultiple <= 0 || empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $calculatePrizeResp = $this->commonService->calculatePrize($planMatchRecommend, $matchList);
            if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                continue;
            }
            $prizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
            $prizeAmount = (float)$calculatePrizeResp->data['prizeAmount'];//奖金基数(按1元1注计算)
            //sp = 赔率*赔率*赔率...*2(单注价钱);
            $sp = $this->common->roundSp($prizeAmount * 2, 2);//把sp,四舍六入五成双
            $planMatchRecommend = trim($calculatePrizeResp->data['matchRecommend']);
            if ($prizeStatus == 1 && !empty($planMatchRecommend)) {
                $ticketExpectPrizeAmount = $sp * $ticketMultiple * 100;
                $field = array();
                $field[] = 'ticketExpectPrizeAmount="' . $database->escape($ticketExpectPrizeAmount) . '"';
                if ($ticketStatus == 5) {
                    $field[] = 'ticketSendPrizeAmount="' . $database->escape($ticketPrizeAmount) . '"';
                }
                $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('订单预计派奖金额修复成功');
            } else {
                $this->common->logger->info('订单预计派奖金额修复失败');
            }
        }
        $database->close();
    }
}
//开始运行
$orderTicketExpectPrizeAmount = new OrderTicketExpectPrizeAmount();
$orderTicketExpectPrizeAmount->execute();