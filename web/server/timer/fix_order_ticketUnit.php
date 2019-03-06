#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class OrderTicketUnit {
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
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;//下单接口一次最大只能出50张票；一张订单可以多张票,因为单票最大99倍。
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $amount = (int)$order['amount'];
            $planMatchRecommend = json_decode($order['planMatchRecommend']);
            if ($orderId <= 0 || $orderType != 3 || $ticketMultiple <= 0 || $amount <= 0 || empty($planMatchRecommend)) {
                continue;
            }
            $ticketUnit = 1;
            foreach ($planMatchRecommend as &$r) {
                $recommend = $r->recommend;
                $ticketUnit *= count($recommend);
            }
            $countAmount = (int)($ticketMultiple*$ticketUnit*2*100);
            if ($countAmount == $amount) {
                $sqlArr[] = 'update t_order set ticketUnit = "'. $ticketUnit .'" where orderId="' . $orderId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('注数修复成功');
            } else {
                $this->common->logger->info('注数修复失败');
            }
        }
        $database->close();
    }
}
//开始运行
$orderTicketUnit = new OrderTicketUnit();
$orderTicketUnit->execute();