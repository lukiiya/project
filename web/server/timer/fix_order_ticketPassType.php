#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class OrderTicketPassType {
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
            $matchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $matchLength = count($matchList);
            $ticketPassType = $matchLength.'x1';
            $field = array();
            $field[] = 'ticketPassType="' . $database->escape($ticketPassType) . '"';
            $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('订单过关方式修复成功');
            } else {
                $this->common->logger->info('订单过关方式修复失败');
            }
        }
        $database->close();
    }
}
//开始运行
$orderTicketPassType = new OrderTicketPassType();
$orderTicketPassType->execute();