#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class Ticket {
    private $common;
    private $commonService;
    private $orderService;
    private $ticketService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->ticketService = requireService("Ticket");
    }

    public function execute() {
        $param = array();
        $selectTicketResp = $this->ticketService->selectTicket($param);
        if ($selectTicketResp->errCode != 0) {
            $this->common->logger->info('票查询异常');
            return;
        }
        $ticketList = $selectTicketResp->data['list'];
        $orderIdArr = array();
        foreach ($ticketList as $ticket) {
            $orderId = (int)$ticket['orderId'];
            $ticketId = (int)$ticket['ticketId'];
            if ($orderId <= 0 || $ticketId <= 0) {
                continue;
            }
            $orderIdArr[] = $orderId;
        }
        $orderIdArr = array_unique($orderIdArr);
        if (count($orderIdArr) <= 0) {
            $this->common->logger->info('票订单异常');
            return;
        }
        $param = array();
        $param['orderId'] = $orderIdArr;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        $orderMap = array();
        foreach ($orderList as $order) {
            $orderId = (int)$order['orderId'];
            if ($orderId > 0) {
                $orderMap[$orderId] = $order;
            }
        }
        if (count($orderMap) <= 0) {
            $this->common->logger->info('票订单查询异常');
            return;
        }
        $this->common->logger->info(count($ticketList).'张票需要修复');
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($ticketList); $i < $length; $i++) {
            $ticket = $ticketList[$i];
            $ticketId = (int)$ticket['ticketId'];
            $orderId = (int)$ticket['orderId'];
            $order = $orderMap[$orderId];
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $matchList = $order['matchList'];
            if (empty($ticket) || $ticketId <= 0 || $orderId <= 0 || empty($order) || $ticketSupplierId <= 0 || empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $betContent = null;
            if ($ticketSupplierId == 1) {
                $zongGuan = requireModule('ZongGuan');
                //出票格式转换
                $formatMatchListResp = $zongGuan->formatMatchList($matchList);
                if ($formatMatchListResp->errCode == 0) {
                    $formatMatchListData = $formatMatchListResp->data;
                    $betContent = trim($formatMatchListData['betContent']);
                }
            }
            if (empty($betContent)) {
                continue;
            }
            $matchLength = count($matchList);
            $passType = $matchLength.'x1';
            $field = array();
            $field[] = 'passType="' . $database->escape($passType) . '"';
            $field[] = 'betContent="' . $database->escape($betContent) . '"';
            $field[] = 'matchRecommend="' . $database->escape($planMatchRecommend) . '"';
            $sqlArr[] = 'update t_ticket set ' . implode(',', $field) . ' where ticketId="' . $ticketId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('出票修复成功');
            } else {
                $this->common->logger->info('出票修复失败');
            }
        }
        $database->close();
    }
}
//开始运行
$ticket = new Ticket();
$ticket->execute();