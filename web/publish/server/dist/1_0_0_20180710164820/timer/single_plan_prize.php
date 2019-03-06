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
        $param['planId'] = 9390;
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
            $matchRecommend = trim($plan['matchRecommend']);
            $matchList = $plan['matchList'];
            if (empty($plan) || $planId <= 0 || empty($matchRecommend) || empty($matchList) || count($matchList) <= 0) {
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
                $sqlArr[] = 'update t_plan set ' . implode(',', $field) . ' where planId="' . $planId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('方案算奖成功');
            } else {
                $this->common->logger->info('方案算奖失败');
            }
        }
        $database->close();
    }
}
//开始运行
$planPrize = new PlanPrize();
$planPrize->setPrizeStatus();