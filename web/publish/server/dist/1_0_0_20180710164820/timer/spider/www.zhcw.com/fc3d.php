<?php
class ZhcwFC3D {
	private $common;
	private $commonService;
	private $lotteryService;
	private $lotteryId;
	private $lotteryName;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
		$this->lotteryId = "FC3D";
		$this->lotteryName = "福彩3D";
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
		$result = $this->httpGet('http://m.zhcw.com/clienth5.do?lottery=FC_3D&pageSize='.$pageSize.'&pageNo=1&transactionType=300301&src=0000100001%7C6000003060');
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
				$this->common->logger->info($this->lotteryName . '期号异常');
				continue;
			}
			$issueInfo = $issueMap[$issue];
			if (empty($issueInfo)) {
				continue;
			}
			$drawTime = strtotime(trim($issueInfo['kjdate']));
			$kjBall = explode(' ', trim($issueInfo['kjznum']));
			$sjBall = explode(' ', trim($issueInfo['sjhnums']));
			$saleAmount = trim($issueInfo['tzmoney']);
			$bonus = $issueInfo['bonus'];
			if ($issue == '20143354') {
				$saleAmount = '51029194';
				$kjBall = array(4,0,7);
				$sjBall = array(8,8,3);
				$bonus = array(
					array('zname' => '单选', 'znum' => '17596', 'money' => '1040'),
					array('zname' => '组选3', 'znum' => '0', 'money' => '320'),
					array('zname' => '组选6', 'znum' => '36721', 'money' => '160'),
				);
			}
			if (empty($issue) || $drawTime <= 0 || count($kjBall) != 3 || count($sjBall) != 3 || !is_array($bonus) || count($bonus) <= 0) {
				$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
				return;
			}
			$drawTime = date('Y-m-d H:i:s', $drawTime);
			$drawNumber = implode(',', $kjBall).'|'.implode(',', $sjBall);
			if (!preg_match('/^\d,\d,\d\|\d,\d,\d$/', $drawNumber)) {
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
			$prizeDetail = array();
			foreach ($bonus as $b) {
				$level = trim($b['zname']);
				$num = trim($b['znum']);
				$money = trim($b['money']);
				if (empty($level)) {
					$this->common->logger->info($this->lotteryName.'奖级有误');
					return;
				}
				$prizeDetail[] = array('level' => $level, 'num' => $num, 'amount' => $money);
			}
			$detail = array(
				'saleAmount' => $saleAmount,
				'prizeDetail' => $prizeDetail
			);
			$detail = json_encode($detail, JSON_UNESCAPED_UNICODE);
			if (empty($detail)) {
				$this->common->logger->info($this->lotteryName.'详情有误');
				return;
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
	
	public function setIssueAll() {
		$result = $this->httpGet('http://m.zhcw.com/clienth5.do?lottery=FC_3D&pageSize=1000&pageNo=1&transactionType=300301&src=0000100001%7C6000003060');
		$result = json_decode($result, true);
		$dataList = $result['dataList'];
		if (empty($result) || !is_array($dataList) || count($dataList) <= 0) {
			$this->common->logger->info($this->lotteryName.'数据有误');
			return;
		}
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($dataList as $data) {
			$issue = trim($data['kjIssue']);
			$drawTime = strtotime(trim($data['kjdate']));
			$kjBall = explode(' ', trim($data['kjznum']));
			$sjBall = explode(' ', trim($data['sjhnums']));
			$saleAmount = trim($data['tzmoney']);
			$bonus = $data['bonus'];
			if ($issue == '20143354') {
				$saleAmount = '51029194';
				$kjBall = array(4,0,7);
				$sjBall = array(8,8,3);
				$bonus = array(
					array('zname' => '单选', 'znum' => '17596', 'money' => '1040'),
					array('zname' => '组选3', 'znum' => '0', 'money' => '320'),
					array('zname' => '组选6', 'znum' => '36721', 'money' => '160'),
				);
			}
			if (empty($issue) || $drawTime <= 0 || count($kjBall) != 3 || count($sjBall) != 3 || !is_array($bonus) || count($bonus) <= 0) {
				$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
				continue;
			}
			$drawTime = date('Y-m-d H:i:s', $drawTime);
			$drawNumber = implode(',', $kjBall).'|'.implode(',', $sjBall);
			if (empty($drawTime) || empty($drawNumber)) {
				$this->common->logger->info($this->lotteryName.'开奖数据有误');
				return;
			}
			$prizeDetail = array();
			foreach ($bonus as $b) {
				$level = trim($b['zname']);
				$num = trim($b['znum']);
				$money = trim($b['money']);
				if (empty($level)) {
					$this->common->logger->info($this->lotteryName.'奖级有误');
					return;
				}
				$prizeDetail[] = array('level' => $level, 'num' => $num, 'amount' => $money);
			}
			$detail = array(
				'saleAmount' => $saleAmount,
				'prizeDetail' => $prizeDetail
			);
			$detail = json_encode($detail, JSON_UNESCAPED_UNICODE);
			if (empty($detail)) {
				$this->common->logger->info($this->lotteryName.'详情有误');
				return;
			}
			$field = array();
			$field[] = 'rowKey="' . $database->escape($this->lotteryId.$issue) . '"';
			$field[] = 'issue="' . $database->escape($issue) . '"';
			$field[] = 'lotteryId="'.$this->lotteryId.'"';
			$field[] = 'lotteryName="'.$this->lotteryName.'"';
			$field[] = 'drawNumber="' . $database->escape($drawNumber) . '"';
			$field[] = 'drawTime="' . $database->escape($drawTime) . '"';
			$field[] = 'detail="' . $database->escape($detail) . '"';
			$field[] = 'createTime=now()';
			$sqlArr[] = 'replace into t_lottery_issue set ' . implode(',', $field);
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$arr = array();
			for ($i = 0, $length = count($sqlArr); $i < $length; $i++) {
				$arr[] = $sqlArr[$i];
				if ($i == $length - 1 || ($i > 0 && ($i % 200) == 0)) {
					$sql = implode(';', $arr);
					$result = $database->multiExecute($sql);
					$database->multiFree();
					if ($result) {
						$this->common->logger->info($i.$this->lotteryName.'期号更新成功');
					} else {
						$this->common->logger->info($i.$this->lotteryName.'期号更新失败');
					}
					$arr = array();
				}
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
