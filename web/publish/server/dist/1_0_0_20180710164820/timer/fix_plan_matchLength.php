#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class PlanMatchLength {
    private $common;
    private $commonService;
    private $planService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->planService = requireService("Plan");
    }

    public function execute() {
        $param = array();
        $param['matchLength'] = 0;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->common->logger->info('方案查询异常');
            return;
        }
        $planList = $selectPlanResp->data['list'];
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $plan = $planList[$i];
            $planId = (int)$plan['planId'];
            $matchRecommend = json_decode($plan['matchRecommend']);
            $matchLength = (int)count($matchRecommend);
            if ($planId > 0 && $matchLength > 0) {
                $sqlArr[] = 'update t_plan set matchLength = '. $matchLength .' where planId="' . $planId . '" limit 1';
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('方案长度修复成功');
            } else {
                $this->common->logger->info('方案长度修复失败');
            }
        }
        $database->close();
    }
}
//开始运行
$planMatchLength = new PlanMatchLength();
$planMatchLength->execute();