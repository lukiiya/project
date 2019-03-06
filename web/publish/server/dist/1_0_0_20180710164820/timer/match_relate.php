#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class MatchRelate {
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
        //十天前
        $beginTime = date('Y-m-d', time()-3600*24*10);
        $param = array();
        $param['planType'] = 1;//类型, 1=竞技彩方案, 2=数字彩方案
        $param['publish'] = 1;
        $param['beginTime'] = $beginTime;
        $param['pageNum'] = 1;
        $param['pageSize'] = 100000;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->common->logger->info('方案查询异常');
            return;
        }
        $planList = $selectPlanResp->data['list'];
        $matchMap = array();
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $planId = (int)$planList[$i]['planId'];
            $matchRecommend = json_decode($planList[$i]['matchRecommend']);
            if ($planId <= 0 || empty($matchRecommend)) {
                continue;
            }
            foreach ($matchRecommend as $mr) {
                $matchId = (int)$mr->matchId;
                if ($matchId <= 0) {
                    continue;
                }
                if (!key_exists($matchId, $matchMap)) {
                    $matchMap[$matchId] = array('planId' => array(), 'orderId' => array());
                }
                $matchMap[$matchId]['planId'][] = $planId;
            }
        }
        $this->common->logger->info('比赛关联方案查询 '.$beginTime.' 之后, 一共'.$length.' 条');
        $param = array();
        $param['orderType'] = 0;
        $param['beginTime'] = $beginTime;
        $param['status'] = 2;
        $param['pageNum'] = 1;
        $param['pageSize'] = 100000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $orderId = (int)$orderList[$i]['orderId'];
            $matchRecommend = json_decode($orderList[$i]['planMatchRecommend']);
            if ($orderId <= 0 || empty($matchRecommend)) {
                continue;
            }
            foreach ($matchRecommend as $mr) {
                $matchId = (int)$mr->matchId;
                if ($matchId <= 0) {
                    continue;
                }
                if (!key_exists($matchId, $matchMap)) {
                    $matchMap[$matchId] = array('planId' => array(), 'orderId' => array());
                }
                $matchMap[$matchId]['orderId'][] = $orderId;
            }
        }
        $this->common->logger->info('比赛关联订单查询 '.$beginTime.' 之后, 一共'.$length.' 条');
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($matchMap as $key => $value) {
            $matchId = (int)$key;
            $planId = $value['planId'];
            $orderId = $value['orderId'];
            if ($matchId <= 0 || !is_array($planId) || count($planId) <= 0 || !is_array($orderId)) {
                continue;
            }
            $field = array();
            $field[] = 'planId="' . $database->escape(implode(',', $planId)) . '"';
            $field[] = 'orderId="' . $database->escape(implode(',', $orderId)) . '"';
            $field[] = 'planCount="' . $database->escape(count($planId)) . '"';
            $field[] = 'orderCount="' . $database->escape(count($orderId)) . '"';
            $sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="' . $matchId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('比赛关联成功');
            } else {
                $this->common->logger->info('比赛关联失败');
            }
        }
        $database->close();
    }
}
//开始运行
$matchRelate = new MatchRelate();
$matchRelate->execute();