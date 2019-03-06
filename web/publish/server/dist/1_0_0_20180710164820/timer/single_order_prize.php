#!/usr/local/php-7.0.7/bin/php -q
<?php
//出票订单算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class OrderPrize {
    private $common;
    private $commonService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
    }

    public function setTicketStatus() {
        $param = array();
        $param['orderId'] = 20846;
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个订单参与算奖');
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $matchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || $ticketMultiple <= 0 || empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
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
            $ticketExpectPrizeAmount = 0;
            //出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖
            $tStatus = null;//等待设置的票状态
            if ($prizeStatus == 1) {
                $tStatus = 4;
                $ticketExpectPrizeAmount = $sp * $ticketMultiple * 100;
            } else if ($prizeStatus == 2) {
                $tStatus = 3;
            }
            if ($tStatus === null) {
                continue;
            }
            if (!empty($planMatchRecommend)) {
                $field = array();
                $field[] = 'ticketStatus="' . $database->escape($tStatus) . '"';
                $field[] = 'ticketExpectPrizeAmount="' . $database->escape($ticketExpectPrizeAmount) . '"';
                $field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
                $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('订单出票算奖成功');
            } else {
                $this->common->logger->info('订单出票算奖失败');
            }
        }
        $database->close();
    }

    public function setPlanPrizeStatus() {
        $param = array();
        $param['orderId'] = 12487;
        $param['orderType'] = 0;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个订单参与算奖');
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $matchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $calculatePrizeResp = $this->commonService->calculatePrize($planMatchRecommend, $matchList);
            if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                continue;
            }
            $planPrizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];
            $planMatchRecommend = trim($calculatePrizeResp->data['matchRecommend']);
            if (!empty($planMatchRecommend)) {
                $field = array();
                $field[] = 'planPrizeStatus="' . $database->escape($planPrizeStatus) . '"';
                $field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
                $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('订单方案算奖成功');
            } else {
                $this->common->logger->info('订单方案算奖失败');
            }
        }
        $database->close();
    }
}
//开始运行
$orderPrize = new OrderPrize();
$orderPrize->setTicketStatus();
//$orderPrize->setPlanPrizeStatus();