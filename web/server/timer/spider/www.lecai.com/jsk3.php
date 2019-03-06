<?php
class LecaiJSK3 {
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
		$database = requireModule("Database");
		foreach ($issueArr as $issue) {
			$result = $this->httpGet('http://baidu.lecai.com/lottery/draw/ajax_get_detail.php?lottery_type=564&phase='.$issue);
			$result = json_decode($result, true);
			$data = $result['data'];
			if (empty($result) || empty($data)) {
				$this->common->logger->info($this->lotteryName.'数据获取有误('.$issue.')');
				continue;
			}
			//获取开奖号码
			$ball = null;
			$result = $data['result']['result'];
			if (empty($result)) {
				continue;
			}
			foreach ($result as $item) {
				$key = trim($item['key']);
				if ($key == 'ball') {
					$ball = $item['data'];
				}
			}
			$drawNumber = '';
			if (is_array($ball) && count($ball) == 3) {
				$drawNumber = implode(',', $ball);
			}
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
			$field[] = 'drawNumber1="' . $database->escape($drawNumber) . '"';
			$sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
			$result = $database->execute($sql);
			if ($result) {
				$this->common->logger->info('乐彩网'.$this->lotteryName.' '.$issue.' 期开奖成功');
			} else {
				$this->common->logger->info('乐彩网'.$this->lotteryName.' '.$issue.' 期开奖失败');
			}
		}
		$database->close();
	}

	public function setIssueAll() {
		for ($i = 1; $i <= 10; $i++) {
			$result = file_get_contents('http://touch.lecai.com/api/lottery/draw/history/JSK3/?page='.$i.'&v=10&r=0.06932707913011171');
			$result = json_decode($result, true);
			$dataList = $result['content']['data'];
			if (empty($result) || !is_array($dataList) || count($dataList) <= 0) {
				$this->common->logger->info($this->lotteryName.'数据有误');
				return;
			}
			$database = requireModule("Database");
			$sqlArr = array();
			echo count($dataList).'条';
			foreach ($dataList as $data) {
				$issue = trim($data['phase']);
				$drawTime = strtotime(trim($data['timeDraw']));
				$beginTime = $drawTime - 10*60;
				$endTime = $drawTime;
				$ball = explode(' ', trim($data['luckyNumber']));
				if (empty($issue) || $drawTime <= 0 || $beginTime <= 0 || $endTime <= 0 || count($ball) != 3) {
					$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
					return;
				}
				$drawTime = date('Y-m-d H:i:s', $drawTime);
				$beginTime = date('Y-m-d H:i:s', $beginTime);
				$endTime = date('Y-m-d H:i:s', $endTime);
				$drawNumber = implode(',', $ball);
				if (empty($drawTime) || empty($beginTime) || empty($endTime) || empty($drawNumber)) {
					$this->common->logger->info($this->lotteryName.'开奖数据有误');
					return;
				}
				$field = array();
				$rowKey = $this->lotteryId.$issue;
				$field[] = 'rowKey="'.$database->escape($rowKey).'"';
				$field[] = 'issue="' . $database->escape($issue) . '"';
				$field[] = 'lotteryId="'.$this->lotteryId.'"';
				$field[] = 'lotteryName="'.$this->lotteryName.'"';
				$field[] = 'drawNumber="' . $database->escape($drawNumber) . '"';
				$field[] = 'drawTime="' . $database->escape($drawTime) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'endTime="' . $database->escape($endTime) . '"';
				$field[] = 'createTime=now()';
				$sqlArr[] = 'replace into t_lottery_issue set ' . implode(',', $field);
			}
			$sqlArr = array_unique($sqlArr);
			if (count($sqlArr) > 0) {
				$sql = implode(';', $sqlArr);
				$result = $database->multiExecute($sql);
				$database->multiFree();
				if ($result) {
					$this->common->logger->info($i.$this->lotteryName.'期号更新成功');
				} else {
					$this->common->logger->info($i.$this->lotteryName.'期号更新失败');
					$database->close();
					return;
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
