<?php
class ZhcwSSQ {
	private $common;
	private $commonService;
	private $lotteryService;
	private $lotteryId;
	private $lotteryName;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
		$this->lotteryId = "SSQ";
		$this->lotteryName = "双色球";
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
		$pageSize = 10*count($lotteryIssueList);
		$result = $this->httpGet('http://m.zhcw.com/clienth5.do?lottery=FC_SSQ&pageSize='.$pageSize.'&pageNo=1&transactionType=300301&src=0000100001%7C6000003060');
		$result = json_decode($result, true);
		$dataList = $result['dataList'];
		if (empty($result) || !is_array($dataList) || count($dataList) <= 0) {
			$this->common->logger->info($this->lotteryName.'数据有误');
			return;
		}
		$issueMap = array();
		foreach ($dataList as $data) {
			$issue = trim($data['kjIssue']);
			if (!preg_match('/^\d{7}$/', $issue)) {
				continue;
			}
			$issueMap[$issue] = $data;
		}
		$database = requireModule("Database");
		foreach ($lotteryIssueList as $lotteryIssue) {
			$issue = trim($lotteryIssue['issue']);
			if (!preg_match('/^\d{7}$/', $issue)) {
				$this->common->logger->info($this->lotteryName.'期号异常');
				continue;
			}
			$issueInfo = $issueMap[$issue];
			if (empty($issueInfo)) {
				continue;
			}
			$redBall = explode(' ', trim($issueInfo['kjznum']));
			$blueBall = trim($issueInfo['kjtnum']);
			$mlist = $issueInfo['mlist'];
			$saleAmount = trim($mlist[0]['mname']);
			$poolAmount = trim($mlist[1]['mname']);
			preg_match('/[\d,]+/', $saleAmount, $saleAmountArr);
			preg_match('/[\d,]+/', $poolAmount, $poolAmountArr);
			$saleAmount = preg_replace('/,/', '', $saleAmountArr[0]);
			$poolAmount = preg_replace('/,/', '', $poolAmountArr[0]);
			$bonus = $issueInfo['bonus'];
			if (count($redBall) != 6 || empty($blueBall) || !is_array($mlist) || count($mlist) < 2 || empty($saleAmount) || !is_array($bonus) || count($bonus) <= 0) {
				$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
				continue;
			}
			$drawNumber = implode(',', $redBall).'|'.$blueBall;
			if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2},\d{2}\|\d{2}$/', $drawNumber)) {
				$this->common->logger->info($this->lotteryName.'开奖号码格式有误');
				continue;
			}
			$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($this->lotteryId, $drawNumber);
			if ($verifyDigitalBetContentResp->errCode != 0) {
				$this->common->logger->info($verifyDigitalBetContentResp->msg);
				continue;
			}
			$drawNumber = $verifyDigitalBetContentResp->data;
			$prizeDetail = array();
			foreach ($bonus as $b) {
				$level = trim($b['zname']);
				$num = trim($b['znum']);
				$money = trim($b['money']);
				if (empty($level)) {
					$this->common->logger->info($this->lotteryName.'奖级有误');
					continue 2;
				}
				$prizeDetail[] = array('level' => $level, 'num' => $num, 'amount' => $money);
			}
			$detail = array(
				'saleAmount' => $saleAmount,
				'poolAmount' => $poolAmount,
				'prizeDetail' => $prizeDetail
			);
			$detail = json_encode($detail, JSON_UNESCAPED_UNICODE);
			if (empty($detail)) {
				$this->common->logger->info($this->lotteryName.'详情有误');
				continue;
			}
			$field = array();
			$field[] = 'drawNumber1="' . $database->escape($drawNumber) . '"';
			$field[] = 'detail=if(detail,detail,"' . $database->escape($detail) . '")';
			$sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
			$result = $database->execute($sql);
			if ($result) {
				$this->common->logger->info('中彩网'.$this->lotteryName.' '.$issue.' 期开奖成功');
			} else {
				$this->common->logger->info('中彩网'.$this->lotteryName.' '.$issue.' 期开奖失败');
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
