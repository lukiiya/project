#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class createIssue {
    private $common;
    private $lotteryService;

    public function __construct() {
        $this->banSaleBeginDate = '2018-02-15';
        $this->banSaleEndDate = '2018-02-21';
        $this->common = requireModule("Common");
        $this->lotteryService = requireService("Lottery");
    }

    public function execute() {
        $this->createSSQIssue();
        $this->createJSK3Issue();
        $this->createDLTIssue();
        $this->createGX11X5Issue();
        $this->createFC3DIssue();
    }

    public function waitIssueList($lotteryId, $pageNum, $pageSize) {
        $resp = requireModule('Resp');
        $lotteryId = trim($lotteryId);
        $pageNum = (int)$pageNum;
        $pageSize = (int)$pageSize;
        if (empty($lotteryId) || $pageNum <= 0 || $pageSize <= 0) {
            $resp->msg = '参数异常';
            return $resp;
        }
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $param['status'] = 1;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $resp->msg = '期号查询异常';
            return $resp;
        }
        $lotteryIssueList = $selectLotteryIssueResp->data['list'];
        if (!is_array($lotteryIssueList)) {
            $resp->msg = '期号数据异常';
            return $resp;
        }
        $resp->data = $lotteryIssueList;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function lastIssue($lotteryId) {
        $resp = requireModule('Resp');
        $lotteryId = trim($lotteryId);
        if (empty($lotteryId)) {
            $resp->msg = '参数异常';
            return $resp;
        }
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $param['pageNum'] = 1;
        $param['pageSize'] = 1;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $resp->msg = '期号查询异常';
            return $resp;
        }
        $lotteryIssueList = $selectLotteryIssueResp->data['list'];
        if (!is_array($lotteryIssueList)) {
            $resp->msg = '期号数据异常';
            return $resp;
        }
        $resp->data = $lotteryIssueList[0];
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function createSSQIssue() {
        $lotteryId = 'SSQ';
        $pageNum = 1;
        $pageSize = 20;
        $waitIssueListResp = $this->waitIssueList($lotteryId, $pageNum, $pageSize);
        if ($waitIssueListResp->errCode != 0) {
            $this->common->logger->info($waitIssueListResp->msg);
            return;
        }
        $lotteryIssueList = $waitIssueListResp->data;
        $lotteryIssueLength = count($lotteryIssueList);
        $issue = null;
        $beginTime = null;
        if ($lotteryIssueLength > 0 && !empty($lotteryIssueList[0])) {
            $issue = trim($lotteryIssueList[0]['issue']);
            $beginTime = trim($lotteryIssueList[0]['beginTime']);
        } else {
            $lastIssueResp = $this->lastIssue($lotteryId);
            if ($lastIssueResp->errCode != 0) {
                $this->common->logger->info($lastIssueResp->msg);
                return;
            }
            $lotteryIssue = $lastIssueResp->data;
            $issue = trim($lotteryIssue['issue']);
            $beginTime = trim($lotteryIssue['beginTime']);
        }
        if (!preg_match('/^\d{7}$/', $issue) || !preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $beginTime)) {
            $this->common->logger->info('期号数据异常');
            return;
        }
        $beginTime = strtotime($beginTime);
        if ($beginTime <= 0) {
            $this->common->logger->info('期号开售时间异常');
            return;
        }
        $sqlArr = array();
        $database = requireModule("Database");
        for ($i = 1, $length = $pageSize-$lotteryIssueLength; $i <= $length; $i++) {
            preg_match('/^(\d{4})(\d{3})$/', $issue, $issueArr);
            $year = (int)$issueArr[1];
            $num = (int)$issueArr[2];//强制整形去掉0前缀
            if (!is_array($issueArr) || count($issueArr) != 3 || $year <= 0 || $num <= 0) {
                $this->common->logger->info('期号解析异常');
                return;
            }
            $week = date('w', $beginTime);
            if ($week == 0) {//周日
                $beginTime = $beginTime + 2*24*3600;//周二
                $endTime = $beginTime + 2*24*3600;//周四
                $drawTime = $endTime + 75*60;//21:15开奖
            } else if ($week == 2) {//周二
                $beginTime = $beginTime + 2*24*3600;//周四
                $endTime = $beginTime + 3*24*3600;//周日
                $drawTime = $endTime + 75*60;//21:15开奖
            } else if ($week == 4) {//周四
                $beginTime = $beginTime + 3*24*3600;//周日
                $endTime = $beginTime + 2*24*3600;//周二
                $drawTime = $endTime + 75*60;//21:15开奖
            }
            $drawDate = date('Y-m-d', $drawTime);
            if ($drawDate >= $this->banSaleBeginDate && $drawDate <= $this->banSaleEndDate) {
                continue;
            }
            $num++;
            $bYear = date('Y', $drawTime);
            if ($year != $bYear) {
                $num = 1;//跨年期号变1
            }
            for ($j = 0, $len = 3 - strlen($num); $j < $len; $j++) {
                $num = '0'.$num;
            }
            $issue = $bYear.$num;
            $field = array();
            $field[] = 'rowKey="SSQ' . $database->escape($issue) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'lotteryId="SSQ"';
            $field[] = 'lotteryName="双色球"';
            $field[] = 'drawTime="' . $database->escape(date('Y-m-d H:i:s', $drawTime)) . '"';
            $field[] = 'beginTime="' . $database->escape(date('Y-m-d H:i:s', $beginTime)) . '"';
            $field[] = 'endTime="' . $database->escape(date('Y-m-d H:i:s', $endTime)) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_lottery_issue set ' . implode(',', $field);
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $this->common->logger->info('双色球期号不需要生成');
            return;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $this->common->logger->info('双色球期号生成失败');
            return;
        }
        $database->close();
        $this->common->logger->info('双色球期号生成成功');
    }

    public function createJSK3Issue() {
        $lotteryId = 'JSK3';
        $pageNum = 1;
        $pageSize = 2000;
        $waitIssueListResp = $this->waitIssueList($lotteryId, $pageNum, $pageSize);
        if ($waitIssueListResp->errCode != 0) {
            $this->common->logger->info($waitIssueListResp->msg);
            return;
        }
        $lotteryIssueList = $waitIssueListResp->data;
        $lotteryIssueLength = count($lotteryIssueList);
        $issue = null;
        $beginTime = null;
        if ($lotteryIssueLength > 0 && !empty($lotteryIssueList[0])) {
            $issue = trim($lotteryIssueList[0]['issue']);
            $beginTime = trim($lotteryIssueList[0]['beginTime']);
        } else {
            $lastIssueResp = $this->lastIssue($lotteryId);
            if ($lastIssueResp->errCode != 0) {
                $this->common->logger->info($lastIssueResp->msg);
                return;
            }
            $lotteryIssue = $lastIssueResp->data;
            $issue = trim($lotteryIssue['issue']);
            $beginTime = trim($lotteryIssue['beginTime']);
        }
        if (!preg_match('/^\d{9}$/', $issue) || !preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $beginTime)) {
            $this->common->logger->info('期号数据异常');
            return;
        }
        $beginTime = strtotime($beginTime);
        if ($beginTime <= 0) {
            $this->common->logger->info('期号开售时间异常');
            return;
        }
        $sqlArr = array();
        $database = requireModule("Database");
        //170516011
        for ($i = 1, $length = $pageSize-$lotteryIssueLength; $i <= $length; $i++) {
            preg_match('/^(\d{2})(\d{2})(\d{2})(\d{3})$/', $issue, $issueArr);
            $date = (int)($issueArr[1].$issueArr[2].$issueArr[3]);
            $dateTime = strtotime('20'.$issueArr[1].'-'.$issueArr[2].'-'.$issueArr[3]. ' 00:00:00');
            $num = (int)$issueArr[4];//强制整形去掉0前缀
            if (!is_array($issueArr) || count($issueArr) != 5 || $date <= 0 || $num <= 0 || $dateTime <= 0) {
                $this->common->logger->info('期号解析异常');
                return;
            }
            //08:30:00 - 22:00:00销售
            $beginTime = $beginTime + 10*60;//开始销售时间
            $hourMinute = date('H:i', $beginTime);
            $num++;
            if ($hourMinute > '22:00') {
                $beginTime = strtotime(date('Y-m-d', $dateTime+24*3600).' 08:30:00');//跨天
                $num = 1;//期号变1
            }
            $endTime = $beginTime + 10*60;//截止销售时间
            $drawTime = $beginTime + 10*60;//开奖时间
            for ($j = 0, $len = 3 - strlen($num); $j < $len; $j++) {
                $num = '0'.$num;
            }
            $bDate = date('ymd', $drawTime);
            $issue = $bDate.$num;
            $drawDate = date('Y-m-d', $drawTime);
            if ($drawDate >= $this->banSaleBeginDate && $drawDate <= $this->banSaleEndDate) {
                continue;
            }
            $field = array();
            $field[] = 'rowKey="JSK3' . $database->escape($issue) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'lotteryId="JSK3"';
            $field[] = 'lotteryName="江苏快3"';
            $field[] = 'drawTime="' . $database->escape(date('Y-m-d H:i:s', $drawTime)) . '"';
            $field[] = 'beginTime="' . $database->escape(date('Y-m-d H:i:s', $beginTime)) . '"';
            $field[] = 'endTime="' . $database->escape(date('Y-m-d H:i:s', $endTime)) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_lottery_issue set ' . implode(',', $field);
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $this->common->logger->info('江苏快3期号不需要生成');
            return;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $this->common->logger->info('江苏快3期号生成失败');
            return;
        }
        $database->close();
        $this->common->logger->info('江苏快3期号生成成功');
    }

    //每周一、三、六  开始时间 20:00:00  截止销售时间 20:00:00  开奖时间 20:30:00
    //期号：17056
    public function createDLTIssue() {
        $lotteryId = 'DLT';
        $pageNum = 1;
        $pageSize = 20;
        $waitIssueListResp = $this->waitIssueList($lotteryId, $pageNum, $pageSize);
        if ($waitIssueListResp->errCode != 0) {
            $this->common->logger->info($waitIssueListResp->msg);
            return;
        }
        $lotteryIssueList = $waitIssueListResp->data;
        $lotteryIssueLength = count($lotteryIssueList);
        $issue = null;
        $beginTime = null;
        if ($lotteryIssueLength > 0 && !empty($lotteryIssueList[0])) {
            $issue = trim($lotteryIssueList[0]['issue']);
            $beginTime = trim($lotteryIssueList[0]['beginTime']);
        } else {
            $lastIssueResp = $this->lastIssue($lotteryId);
            if ($lastIssueResp->errCode != 0) {
                $this->common->logger->info($lastIssueResp->msg);
                return;
            }
            $lotteryIssue = $lastIssueResp->data;
            $issue = trim($lotteryIssue['issue']);
            $beginTime = trim($lotteryIssue['beginTime']);
        }
        if (!preg_match('/^\d{5}$/', $issue) || !preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $beginTime)) {
            $this->common->logger->info('期号数据异常');
            return;
        }
        $beginTime = strtotime($beginTime);
        if ($beginTime <= 0) {
            $this->common->logger->info('期号开售时间异常');
            return;
        }
        $sqlArr = array();
        $database = requireModule("Database");
        for ($i = 1, $length = $pageSize-$lotteryIssueLength; $i <= $length; $i++) {
            preg_match('/^(\d{2})(\d{3})$/', $issue, $issueArr);
            $year = (int)$issueArr[1];
            $num = (int)$issueArr[2];//强制整形去掉0前缀
            if (!is_array($issueArr) || count($issueArr) != 3 || $year <= 0 || $num <= 0) {
                $this->common->logger->info('期号解析异常');
                return;
            }
            //周一，周三，周六
            $week = date('w', $beginTime);
            if ($week == 1) {//周一
                $beginTime = $beginTime + 2*24*3600;//周三 20:00:00
                $endTime = $beginTime + 3*24*3600;//周六 20:00:00
                $drawTime = $endTime + 30*60;//20:30开奖
            } else if ($week == 3) {//周三
                $beginTime = $beginTime + 3*24*3600;//周六
                $endTime = $beginTime + 2*24*3600;//周一
                $drawTime = $endTime + 30*60;//20:30开奖
            } else if ($week == 6) {//周六
                $beginTime = $beginTime + 2*24*3600;//周一
                $endTime = $beginTime + 2*24*3600;//周三
                $drawTime = $endTime + 30*60;//20:30开奖
            }
            $drawDate = date('Y-m-d', $drawTime);
            if ($drawDate >= $this->banSaleBeginDate && $drawDate <= $this->banSaleEndDate) {
                continue;
            }
            $num++;
            $bYear = date('y', $drawTime);
            if ($year != $bYear) {
                $num = 1;//跨年期号变1
            }
            for ($j = 0, $len = 3 - strlen($num); $j < $len; $j++) {
                $num = '0'.$num;
            }
            $issue = $bYear.$num;
            $field = array();
            $field[] = 'rowKey="DLT' . $database->escape($issue) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'lotteryId="DLT"';
            $field[] = 'lotteryName="大乐透"';
            $field[] = 'beginTime="' . $database->escape(date('Y-m-d H:i:s', $beginTime)) . '"';
            $field[] = 'endTime="' . $database->escape(date('Y-m-d H:i:s', $endTime)) . '"';
            $field[] = 'drawTime="' . $database->escape(date('Y-m-d H:i:s', $drawTime)) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_lottery_issue set ' . implode(',', $field);
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $this->common->logger->info('大乐透期号不需要生成');
            return;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $this->common->logger->info('大乐透期号生成失败');
            return;
        }
        $database->close();
        $this->common->logger->info('大乐透期号生成成功');
    }

    //8:50-23:40，一共90期
    public function createGX11X5Issue() {
        $lotteryId = 'GX11X5';
        $pageNum = 1;
        $pageSize = 2000;
        $waitIssueListResp = $this->waitIssueList($lotteryId, $pageNum, $pageSize);
        if ($waitIssueListResp->errCode != 0) {
            $this->common->logger->info($waitIssueListResp->msg);
            return;
        }
        $lotteryIssueList = $waitIssueListResp->data;
        $lotteryIssueLength = count($lotteryIssueList);
        $issue = null;
        $beginTime = null;
        if ($lotteryIssueLength > 0 && !empty($lotteryIssueList[0])) {
            $issue = trim($lotteryIssueList[0]['issue']);
            $beginTime = trim($lotteryIssueList[0]['beginTime']);
        } else {
            $lastIssueResp = $this->lastIssue($lotteryId);
            if ($lastIssueResp->errCode != 0) {
                $this->common->logger->info($lastIssueResp->msg);
                return;
            }
            $lotteryIssue = $lastIssueResp->data;
            $issue = trim($lotteryIssue['issue']);
            $beginTime = trim($lotteryIssue['beginTime']);
        }
        if (!preg_match('/^\d{8}$/', $issue) || !preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $beginTime)) {
            $this->common->logger->info('期号数据异常');
            return;
        }
        $beginTime = strtotime($beginTime);
        if ($beginTime <= 0) {
            $this->common->logger->info('期号开售时间异常');
            return;
        }
        $sqlArr = array();
        $database = requireModule("Database");
        //17060840
        for ($i = 1, $length = $pageSize-$lotteryIssueLength; $i <= $length; $i++) {
            preg_match('/^(\d{2})(\d{2})(\d{2})(\d{2})$/', $issue, $issueArr);
            $date = (int)($issueArr[1].$issueArr[2].$issueArr[3]);
            $dateTime = strtotime('20'.$issueArr[1].'-'.$issueArr[2].'-'.$issueArr[3]. ' 00:00:00');
            $num = (int)$issueArr[4];
            if (!is_array($issueArr) || count($issueArr) != 5 || $date <= 0 || $num <= 0 || $dateTime <= 0) {
                $this->common->logger->info('期号解析异常');
                return;
            }
            //8:50-23:40销售
            $beginTime = $beginTime + 10*60;//开始销售时间
            $hourMinute = date('H:i', $beginTime);
            $num++;
            if ($hourMinute > '23:40') {
                $beginTime = strtotime(date('Y-m-d', $dateTime+24*3600).' 08:50:00');//跨天
                $num = 1;//期号变1
            }
            $endTime = $beginTime + 10*60;//截止销售时间
            $drawTime = $beginTime + 10*60;//开奖时间
            for ($j = 0, $len = 2 - strlen($num); $j < $len; $j++) {
                $num = '0'.$num;
            }
            $bDate = date('ymd', $drawTime);
            $issue = $bDate.$num;
            $drawDate = date('Y-m-d', $drawTime);
            if ($drawDate >= $this->banSaleBeginDate && $drawDate <= $this->banSaleEndDate) {
                continue;
            }
            $field = array();
            $field[] = 'rowKey="GX11X5' . $database->escape($issue) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'lotteryId="GX11X5"';
            $field[] = 'lotteryName="广西11选5"';
            $field[] = 'drawTime="' . $database->escape(date('Y-m-d H:i:s', $drawTime)) . '"';
            $field[] = 'beginTime="' . $database->escape(date('Y-m-d H:i:s', $beginTime)) . '"';
            $field[] = 'endTime="' . $database->escape(date('Y-m-d H:i:s', $endTime)) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_lottery_issue set ' . implode(',', $field);
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $this->common->logger->info('广西11选5期号不需要生成');
            return;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $this->common->logger->info('广西11选5期号生成失败');
            return;
        }
        $database->close();
        $this->common->logger->info('广西11选5期号生成成功');
    }

    /*
       官方开售时间：晚上8点
       官方截止时间：晚上8点
       */
    public function createFC3DIssue() {
        $lotteryId = 'FC3D';
        $pageNum = 1;
        $pageSize = 60;
        $waitIssueListResp = $this->waitIssueList($lotteryId, $pageNum, $pageSize);
        if ($waitIssueListResp->errCode != 0) {
            $this->common->logger->info($waitIssueListResp->msg);
            return;
        }
        $lotteryIssueList = $waitIssueListResp->data;
        $lotteryIssueLength = count($lotteryIssueList);
        $issue = null;
        $beginTime = null;
        if ($lotteryIssueLength > 0 && !empty($lotteryIssueList[0])) {
            $issue = trim($lotteryIssueList[0]['issue']);
            $beginTime = trim($lotteryIssueList[0]['beginTime']);
        } else {
            $lastIssueResp = $this->lastIssue($lotteryId);
            if ($lastIssueResp->errCode != 0) {
                $this->common->logger->info($lastIssueResp->msg);
                return;
            }
            $lotteryIssue = $lastIssueResp->data;
            $issue = trim($lotteryIssue['issue']);
            $beginTime = trim($lotteryIssue['beginTime']);
        }
        if (!preg_match('/^\d{7}$/', $issue) || !preg_match('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $beginTime)) {
            $this->common->logger->info('期号数据异常');
            return;
        }
        $beginTime = strtotime($beginTime);
        if ($beginTime <= 0) {
            $this->common->logger->info('期号开售时间异常');
            return;
        }
        $sqlArr = array();
        $database = requireModule("Database");
        for ($i = 1, $length = $pageSize-$lotteryIssueLength; $i <= $length; $i++) {
            preg_match('/^(\d{4})(\d{3})$/', $issue, $issueArr);
            $year = (int)$issueArr[1];
            $num = (int)$issueArr[2];//强制整形去掉0前缀
            if (!is_array($issueArr) || count($issueArr) != 3 || $year <= 0 || $num <= 0) {
                $this->common->logger->info('期号解析异常');
                return;
            }
            $beginTime = $beginTime + 1*24*3600;
            $endTime = $beginTime + 1*24*3600;
            $drawTime = $endTime + 75*60;//21:15开奖
            $drawDate = date('Y-m-d', $drawTime);
            if ($drawDate >= $this->banSaleBeginDate && $drawDate <= $this->banSaleEndDate) {
                continue;
            }
            $num++;
            $bYear = date('Y', $drawTime);
            if ($year != $bYear) {
                $num = 1;//跨年期号变1
            }
            for ($j = 0, $len = 3 - strlen($num); $j < $len; $j++) {
                $num = '0'.$num;
            }
            $issue = $bYear.$num;
            $field = array();
            $field[] = 'rowKey="FC3D' . $database->escape($issue) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'lotteryId="FC3D"';
            $field[] = 'lotteryName="福彩3D"';
            $field[] = 'drawTime="' . $database->escape(date('Y-m-d H:i:s', $drawTime)) . '"';
            $field[] = 'beginTime="' . $database->escape(date('Y-m-d H:i:s', $beginTime)) . '"';
            $field[] = 'endTime="' . $database->escape(date('Y-m-d H:i:s', $endTime)) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_lottery_issue set ' . implode(',', $field);
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $this->common->logger->info('福彩3D期号不需要生成');
            return;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $this->common->logger->info('福彩3D期号生成失败');
            return;
        }
        $database->close();
        $this->common->logger->info('福彩3D期号生成成功');
    }
}
//开始运行
$createIssue = new createIssue();
$createIssue->execute();