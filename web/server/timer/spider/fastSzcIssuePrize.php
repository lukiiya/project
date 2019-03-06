#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../include/core.php");
include_once(__DIR__."/www.360.cn/jsk3.php");
include_once(__DIR__."/www.163.com/jsk3.php");
include_once(__DIR__."/www.500.com/jsk3.php");

function syncIssuePrize($lotteryId) {
    $common = requireModule("Common");
    $lotteryService = requireService("Lottery");
    if ($lotteryId != 'JSK3') {
        $common->logger->info('彩种异常查询异常');
        return;
    }
    $param = array();
    $param['lotteryId'] = $lotteryId;
    $param['status'] = 3;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
    $selectLotteryIssueResp = $lotteryService->selectLotteryIssue($param);
    if ($selectLotteryIssueResp->errCode != 0) {
        $common->logger->info($lotteryId.'期号查询异常');
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
            if ($lotteryId == 'JSK3') {
                if (!preg_match('/^[1-6],[1-6],[1-6]$/', $drawNumber)) {
                    $common->logger->info('江苏快3开奖号码格式有误');
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

//360网江苏快3
$qiHuJSK3 = new QiHuJSK3();
$qiHuJSK3->setIssuePrize();
//网易网江苏快3
$wangYiJSK3 = new WangYiJSK3();
$wangYiJSK3->setIssuePrize();
//500彩票网江苏快3
$wuBaiJSK3 = new WuBaiJSK3();
$wuBaiJSK3->setIssuePrize();

//同步开奖
syncIssuePrize('JSK3');





