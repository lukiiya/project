#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../include/core.php");
include_once(__DIR__."/www.zhcw.com/ssq.php");
include_once(__DIR__."/www.500.com/ssq.php");
include_once(__DIR__."/www.okooo.com/ssq.php");
include_once(__DIR__."/www.lottery.gov.cn/dlt.php");
include_once(__DIR__."/www.500.com/dlt.php");
include_once(__DIR__."/www.okooo.com/dlt.php");
include_once(__DIR__."/www.zhcw.com/fc3d.php");
include_once(__DIR__."/www.500.com/fc3d.php");
include_once(__DIR__."/www.163.com/fc3d.php");

function syncIssuePrize($lotteryId) {
    $common = requireModule("Common");
    $lotteryService = requireService("Lottery");
    if ($lotteryId != 'SSQ' && $lotteryId != 'DLT' && $lotteryId != 'FC3D') {
        $this->common->logger->info('彩种异常查询异常');
        return;
    }
    $param = array();
    $param['lotteryId'] = $lotteryId;
    $param['status'] = 3;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
    $selectLotteryIssueResp = $lotteryService->selectLotteryIssue($param);
    if ($selectLotteryIssueResp->errCode != 0) {
        $this->common->logger->info($lotteryId.'期号查询异常');
        return;
    }
    $lotteryIssueList = $selectLotteryIssueResp->data['list'];
    if (!is_array($lotteryIssueList) || count($lotteryIssueList) <= 0) {
        $common->logger->info($lotteryId.'不存在需要同步的开奖');
        return;
    }
    $database = requireModule("Database");
    $sqlArr = array();
    foreach ($lotteryIssueList as &$info) {
        $rowKey = trim($info['rowKey']);
        $drawNumber = trim($info['drawNumber']);
        if (empty($rowKey) || !empty($drawNumber)) {
            continue;
        }
        $drawNumberMap = array();
        $drawNumber1 = trim($info['drawNumber1']);
        $drawNumber2 = trim($info['drawNumber2']);
        $drawNumber3 = trim($info['drawNumber3']);
        $drawNumberArr = array($drawNumber1, $drawNumber2, $drawNumber3);
        foreach ($drawNumberArr as $drawNumber) {
            if ($lotteryId == 'SSQ') {
                if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2},\d{2}\|\d{2}$/', $drawNumber)) {
                    $common->logger->info('双色球开奖号码格式有误');
                    continue;
                }
            } else if ($lotteryId == 'DLT') {
                if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2}\+\d{2},\d{2}$/', $drawNumber)) {
                    $common->logger->info('双色球开奖号码格式有误');
                    continue;
                }
            } else if ($lotteryId == 'FC3D') {
                if (!preg_match('/^\d,\d,\d\|\d,\d,\d$/', $drawNumber)) {
                    $common->logger->info('双色球开奖号码格式有误');
                    continue;
                }
            }
            if (!key_exists($drawNumber, $drawNumberMap)) {
                $drawNumberMap[$drawNumber] = 0;
            }
            $drawNumberMap[$drawNumber]++;
        }
        if (count($drawNumberMap) != 1 || (int)current($drawNumberMap) < 2) {
            continue;
        }
        $drawNumber = key($drawNumberMap);
        $field = array();
        $field[] = 'drawNumber="' . $database->escape($drawNumber) . '"';
        $sqlArr[] = 'update t_lottery_issue set ' . implode(',', $field) . ' where rowKey="'.$rowKey.'" and drawNumber="" limit 1';
    }
    $sqlArr = array_unique($sqlArr);
    if (count($sqlArr) > 0) {
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if ($result) {
            $common->logger->info('同步'.$lotteryId.'开奖成功');
        } else {
            $common->logger->info('同步'.$lotteryId.'开奖失败');
        }
        $orderType = 7;
        $message = requireModule('Message');
        $message->publish('orderResult', $orderType);
    }
    $database->close();
    $common->logger->info('同步'.$lotteryId.'开奖完成');
}

//中彩网双色球
$zhcwSSQ = new ZhcwSSQ();
$zhcwSSQ->setIssuePrize();
//500彩票网双色球
$wuBaiSSQ = new WuBaiSSQ();
$wuBaiSSQ->setIssuePrize();
//澳客网双色球
$okoooSSQ = new OkoooSSQ();
$okoooSSQ->setIssuePrize();
//同步开奖
syncIssuePrize('SSQ');

//体彩网大乐透
$lotteryDLT = new LotteryDLT();
$lotteryDLT->setIssuePrize();
//500彩票网大乐透
$wuBaiDLT = new WuBaiDLT();
$wuBaiDLT->setIssuePrize();
//澳客网大乐透
$okoooDLT = new OkoooDLT();
$okoooDLT->setIssuePrize();
//同步开奖
syncIssuePrize('DLT');

//中彩网福彩3D
$zhcwFC3D = new ZhcwFC3D();
$zhcwFC3D->setIssuePrize();
//500彩票网福彩3D
$wuBaiFC3D = new WuBaiFC3D();
$wuBaiFC3D->setIssuePrize();
//网易网福彩3D
$wangYiFC3D = new WangYiFC3D();
$wangYiFC3D->setIssuePrize();
//同步开奖
syncIssuePrize('FC3D');