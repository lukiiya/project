#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class WuBaiGX11X5 {
	private $common;
	private $commonService;
	private $lotteryService;
	private $lotteryId;
	private $lotteryName;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
		$this->lotteryId = "GX11X5";
		$this->lotteryName = "广西11选5";
	}

	public function setIssuePrize($date) {
		$param = array();
		$param['lotteryId'] = $this->lotteryId;
		$param['status'] = 3;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
		$selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
		if ($selectLotteryIssueResp->errCode != 0) {
			$this->common->logger->info($this->lotteryName.'期号查询异常');
			return;
		}
		$lotteryIssueList = $selectLotteryIssueResp->data['list'];
		if (!is_array($lotteryIssueList) || count($lotteryIssueList) <= 0) {
			$this->common->logger->info($this->lotteryName.'不存在未开奖的期号');
			return;
		}
		$issueArr = array();
		foreach ($lotteryIssueList as $lotteryIssue) {
			$issue = trim($lotteryIssue['issue']);
			$curTime = date('Y-m-d H:i:s');
			$endTime = trim($lotteryIssue['endTime']);
			$drawNumber = trim($lotteryIssue['drawNumber']);
			if (empty($issue) || $curTime <= $endTime || !empty($drawNumber)) {
				continue;
			}
			$issueArr[] = $issue;
		}
		if (!is_array($issueArr) || count($issueArr) <= 0) {
			$this->common->logger->info($this->lotteryName.'不存在需要开奖的期号');
			return;
		}
		if (empty($date)) {
            $date = date('Ymd');
        }
		$result = $this->httpGet('http://kaijiang.500.com/static/info/kaijiang/xml/gxsyxw/'.$date.'.xml?_A=EMPLONQK'.time());
		$xml = simplexml_load_string($result);
		if (empty($result) || empty($xml)) {
			$this->common->logger->info($this->lotteryName.'数据获取有误');
			return;
		}
		$drawNumberMap = array();
		foreach ($xml->children() as $row) {
			$period = trim($row['expect']);
			$number = trim($row['opencode']);
			if (!preg_match('/^\d{6}-\d{2}$/', $period) || !preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2}$/', $number)) {
				continue;
			}
			$period = preg_replace('/-/', '', $period);
			if (preg_match('/^\d{8}$/', $period)) {
				$drawNumberMap[$period] = $number;
			}
		}
		$database = requireModule("Database");
		foreach ($issueArr as $issue) {
			$drawNumber = $drawNumberMap[$issue];
			if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2}$/', $drawNumber)) {
				$this->common->logger->info($this->lotteryName.'开奖号码格式有误');
				continue;
			}
			$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($this->lotteryId, 'DRAW:'.$drawNumber);
			if ($verifyDigitalBetContentResp->errCode != 0) {
				$this->common->logger->info($verifyDigitalBetContentResp->msg);
				continue;
			}
			$drawNumber = $verifyDigitalBetContentResp->data;
			$drawNumber = preg_replace("/DRAW:/", "", $drawNumber);
			$field = array();
			$field[] = 'drawNumber="' . $database->escape($drawNumber) . '"';
			$sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
			$result = $database->execute($sql);
			if ($result) {
				$this->common->logger->info('500彩票网'.$this->lotteryName.' '.$issue.' 期开奖成功');
			} else {
				$this->common->logger->info('500彩票网'.$this->lotteryName.' '.$issue.' 期开奖失败');
			}
		}
		$database->close();
	}

    public function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 10);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }
}

$wuBaiGX11X5 = new WuBaiGX11X5();
$wuBaiGX11X5->setIssuePrize();

