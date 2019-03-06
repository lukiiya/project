#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class PlanPrize {
    private $common;
    private $commonService;
    private $planService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->planService = requireService("Plan");
    }

    public function setPrizeStatus() {
        $param = array();
        $param['planType'] = 1;
        $param['prizeStatus'] = 0;
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
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $plan = $planList[$i];
            $planId = (int)$plan['planId'];
            $planType = (int)$plan['planType'];
            $matchRecommend = trim($plan['matchRecommend']);
            $matchList = $plan['matchList'];
            if (empty($plan) || $planId <= 0 || $planType != 1 || empty($matchRecommend) || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $calculatePrizeResp = $this->commonService->calculatePrize($matchRecommend, $matchList);
            if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                continue;
            }
            $prizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];
            $costAmount = (int)$calculatePrizeResp->data['costAmount'];
            $prizeAmount = (float)$calculatePrizeResp->data['prizeAmount'];
            $matchRecommend = trim($calculatePrizeResp->data['matchRecommend']);
            if (!empty($matchRecommend)) {
                //中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
                if ($prizeStatus == 0 || $prizeStatus == 2) {
                    $prizeAmount = 0;
                }
                $field = array();
                $field[] = 'prizeStatus="' . $database->escape($prizeStatus) . '"';
                $field[] = 'costAmount="' . $database->escape($costAmount) . '"';
                $field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
                $field[] = 'matchRecommend="' . $database->escape($matchRecommend) . '"';
                $sqlArr[] = 'update t_plan set ' . implode(',', $field) . ' where planId="' . $planId . '" and planType=1 limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('竞技彩方案算奖成功');
            } else {
                $this->common->logger->info('竞技彩方案算奖失败');
            }
        }
        $database->close();
    }

    public function setDigitalPrizeStatus() {
        $param = array();
        $param['planType'] = 2;    //数字彩
        $param['prizeStatus'] = 0;  //未开奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->common->logger->info('方案查询异常');
            return;
        }
        $planList = $selectPlanResp->data['list'];
        $database = requireModule("Database");
        $sqlArr = array();
        $planList= $this->commonService->setLotteryIssue($planList);  //设置彩果
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $plan = $planList[$i];
            $planId = (int)$plan['planId'];
            $planType = (int)$plan['planType'];
            $lotteryId = trim($plan['lotteryId']);
            $issue = trim($plan['issue']);
            $betContent = trim($plan['betContent']);
            $lotteryIssue = $plan['lotteryIssue'];
            if (empty($plan) || $planId <= 0 || $planType != 2 || empty($lotteryId) ||  empty($issue) || empty($betContent) || empty($lotteryIssue)) {
                continue;
            }
            $calculatePrizeResp = $this->commonService->calculateDigitalPrize($lotteryId, $betContent, $lotteryIssue);
            if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                continue;
            }
            $prizeList = $calculatePrizeResp->data;
            $prizeStatus = 0;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
            $prizeAmount = 0;
            foreach ($prizeList as $prize) {
                $pStatus = (int)$prize['prizeStatus'];
                $pAmount = (float)$prize['prizeAmount'];
                if ($pStatus == 1) {
                    $prizeStatus = 1;
                    $prizeAmount += $pAmount;
                } else if ($pStatus == 2 && $prizeStatus == 0) {
                    $prizeStatus = 2;
                }
            }
            if ($prizeStatus == 0 || $prizeStatus == 2) {
                $prizeAmount = 0;
            }
            if ($prizeStatus != 0) {
                $field = array();
                $field[] = 'prizeStatus="' . $database->escape($prizeStatus) . '"';
                $field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
                $sqlArr[] = 'update t_plan set ' . implode(',', $field) . ' where planId="' . $planId . '" and planType=2 limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('数字彩方案算奖成功');
            } else {
                $this->common->logger->info('数字彩方案算奖失败');
            }
        }
        $database->close();
    }
}
//开始运行
$planPrize = new PlanPrize();
$planPrize->setPrizeStatus();
$planPrize->setDigitalPrizeStatus();