<?php
class WangYiJSK3 {
	private $common;
	private $commonService;
	private $lotteryService;
	private $lotteryId;
	private $lotteryName;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
		$this->lotteryId = "JSK3";
		$this->lotteryName = "江苏快3";
	}

	public function setIssuePrize() {
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
		$result = $this->httpGet('http://caipiao.163.com/t/awardlist.html?gameEn=oldkuai3');
		$result = json_decode($result, true);
		$list = $result['list'];
		if (empty($result) || empty($list)) {
			$this->common->logger->info($this->lotteryName.'数据获取有误');
			return;
		}
		$drawNumberMap = array();
		foreach ($list as $item) {
			$period = trim($item['period']);
			$number = trim($item['number']);
			if (!preg_match('/^\d{9}$/', $period) || !preg_match('/^[1-6] [1-6] [1-6]$/', $number)) {
				continue;
			}
			$numberArr = explode(' ', $number);
			if (!is_array($numberArr) || count($numberArr) != 3) {
				continue;
			}
			$drawNumberMap[$period] = implode(',', $numberArr);
		}
		$database = requireModule("Database");
		foreach ($issueArr as $issue) {
			$drawNumber = $drawNumberMap[$issue];
			if (!preg_match('/^[1-6],[1-6],[1-6]$/', $drawNumber)) {
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
			$field[] = 'drawNumber2="' . $database->escape($drawNumber) . '"';
			$sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
			$result = $database->execute($sql);
			if ($result) {
				$this->common->logger->info('网易网'.$this->lotteryName.' '.$issue.' 期开奖成功');
			} else {
				$this->common->logger->info('网易网'.$this->lotteryName.' '.$issue.' 期开奖失败');
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
		curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; c8650 Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/4.5 Mobile Safari/533.1s');
		$res = curl_exec($curl);
		curl_close($curl);
		return $res;
	}
}
