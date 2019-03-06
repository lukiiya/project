#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
ini_set('memory_limit', '256M');
include_once(__DIR__."/../include/core.php");

class CheckFinance {
    private $common;
    private $commonService;
    private $financeService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->financeService = requireService("Finance");
    }

    public function setUserFinance() {
        $param = array();
        $selectFinanceResp = $this->financeService->selectFinance($param);
        if ($selectFinanceResp->errCode != 0 || empty($selectFinanceResp->data)) {
            $this->common->logger->info('资金数据异常');
            return;
        }
        $financeList = $selectFinanceResp->data['list'];
        $this->common->logger->info('更新 '.count($financeList).' 个资金账户');
        $num = 0;
        foreach ($financeList as $finance) {
            $userId = (int)$finance['userId'];
            if ($userId > 0) {
                $this->commonService->setUserFinance($userId);
                $num++;
                echo "已更新 ".$num." 个资金账户\n";
            }
        }
        $this->common->logger->info('更新资金账户完成');
    }

    public function checkUserFinance() {
        $param = array();
        $selectFinanceResp = $this->financeService->selectFinance($param);
        if ($selectFinanceResp->errCode != 0 || empty($selectFinanceResp->data)) {
            $this->common->logger->info('资金数据异常');
            return;
        }
        $financeMap = array();
        $financeList = $selectFinanceResp->data['list'];
        foreach ($financeList as $finance) {
            $financeType = (int)$finance['financeType'];
            $userId = (int)$finance['userId'];
            if ($userId > 0) {
                $financeMap[$financeType.'-'.$userId] = $finance;
            }
        }
        //额外资金表
        $param = array();
        $selectFinanceExtraResp = $this->financeService->selectFinanceExtra($param);
        if ($selectFinanceExtraResp->errCode != 0 || empty($selectFinanceExtraResp->data)) {
            $this->common->logger->info('资金数据异常');
            return;
        }
        $financeExtraMap = array();
        $financeList = $selectFinanceExtraResp->data['list'];
        foreach ($financeList as $finance) {
            $financeType = (int)$finance['financeType'];
            $userId = (int)$finance['userId'];
            if ($userId > 0) {
                $financeExtraMap[$financeType.'-'.$userId] = $finance;
            }
        }
        foreach ($financeMap as $key => $value) {
            if (!key_exists($key, $financeExtraMap)) {
                $this->common->logger->info('不同步资金数据'.'('.$key.')');
            }
        }
        if (count($financeMap) != count($financeExtraMap)) {
            $this->common->logger->info('资金数据不同步'.'('.count($financeMap).'-'.count($financeExtraMap).')');
            return;
        }
        $errorArr = array();
        $filter = array('financeId', 'nickName', 'realName', 'dataVersion', 'createTime', 'lastTime', 'discard');
        //比较字段
        foreach ($financeMap as $financeTypeUserId => $finance) {
            $financeExtra = $financeExtraMap[$financeTypeUserId];
            if (empty($finance) || empty($financeExtra) || count($finance) != count($financeExtra)) {
                $this->common->logger->info('资金数据不同步('.$financeTypeUserId.')');
                return;
            }
            foreach ($finance as $key => $value) {
                if (in_array($key, $filter)) {
                    continue;
                }
                if (!key_exists($key, $financeExtra)) {
                    $this->common->logger->info('资金字段异常');
                    return;
                }
                $value = (int)$value;
                $valueExtra = (int)$financeExtra[$key];
                if ($value != $valueExtra) {
                    $errorArr[] = $financeTypeUserId.'-'.$key;
                    continue 2;
                }
            }
        }
        print_r($errorArr);
    }
}
//开始运行
$checkFinance = new CheckFinance();
$checkFinance->setUserFinance();
$checkFinance->checkUserFinance();

