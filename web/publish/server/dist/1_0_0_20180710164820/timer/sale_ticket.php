#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class SaleTicket {
    private $common;
    private $commonService;
    private $planService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->planService = requireService("Plan");
        $this->orderService = requireService("Order");
    }

    public function execute() {
        $this->plan();
        $this->order();
    }

    public function plan() {
        $param = array();
        $param['planType'] = 1; //类型, 1=竞技彩方案, 2=数字彩方案
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->common->logger->info('方案查询异常');
            return;
        }
        $planList = $selectPlanResp->data['list'];
        $planList = $this->commonService->setMatchList($planList);
        $database = requireModule("Database");
        $sqlArr = array();
        $this->common->logger->info('方案售票列表('.count($planList).')');
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $plan = $planList[$i];
            $planId = (int)$plan['planId'];
            $saleTicket = (int)$plan['saleTicket'];
            $matchList = $plan['matchList'];
            if (empty($plan) || $planId <= 0 || $saleTicket != 1 || empty($matchList)) {
                continue;
            }
            $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
            if ($matchListIsSaleResp->errCode != 0) {
                $sqlArr[] = 'update t_plan set saleTicket=0 where planId="'.$planId.'" and saleTicket=1 limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('方案售票设置成功('.count($sqlArr).')');
            } else {
                $this->common->logger->info('方案售票设置失败('.count($sqlArr).')');
            }
        }
        $database->close();
        $this->common->logger->info('方案售票设置完成');
    }

    public function order() {
        $param = array();
        $param['orderType'] = 3; //订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        $database = requireModule("Database");
        $sqlArr = array();
        $this->common->logger->info('订单售票列表('.count($orderList).')');
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $saleTicket = (int)$order['saleTicket'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $ticketPassType = trim($order['ticketPassType']);
            $matchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || $saleTicket != 1 || empty($planMatchRecommend) || empty($ticketPassType) || empty($matchList)) {
                continue;
            }
            $matchMap = array();
            foreach ($matchList as $match) {
                $matchId = (int)$match['matchId'];
                $oddsId = (int)$match['oddsId'];
                if ($matchId > 0 && $oddsId > 0) {
                    $matchMap[$matchId.'-'.$oddsId] = $match;
                }
            }
            $calculateTicketResp = $this->commonService->calculateTicket($planMatchRecommend, $ticketPassType);
            if ($calculateTicketResp->errCode != 0) {
                continue;
            }
            $ticketPassTypeMap = $calculateTicketResp->data;
            $ticketUnit = 0;
            foreach ($ticketPassTypeMap as $item) {
                $unit = (int)$item['ticketUnit'];
                $mr = $item['matchRecommend'];
                if ($unit <= 0 || !is_array($mr) || count($mr) <= 0) {
                    continue 2;
                }
                $ticketUnit += $unit;
                foreach ($mr as $m) {
                    $m = json_decode($m);
                    if (empty($m)) {
                        continue 3;
                    }
                    $matchList = array();
                    foreach ($m as $r) {
                        $matchId = (int)$r->matchId;
                        $oddsId = (int)$r->oddsId;
                        $match = $matchMap[$matchId.'-'.$oddsId];
                        if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
                            continue 4;
                        }
                        $matchList[] = $match;
                    }
                    $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
                    if ($matchListIsSaleResp->errCode != 0) {
                        $saleTicket = 0;
                        continue 2;
                    }
                }
            }
            if ($saleTicket === 0) {
                $sqlArr[] = 'update t_order set saleTicket=0 where orderId="'.$orderId.'" and saleTicket=1 limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('订单售票设置成功('.count($sqlArr).')');
            } else {
                $this->common->logger->info('订单售票设置失败('.count($sqlArr).')');
            }
        }
        $database->close();
        $this->common->logger->info('订单售票设置完成');
    }
}
//开始运行
$saleTicket = new SaleTicket();
$saleTicket->execute();