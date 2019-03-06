<?php
class LecaiSSQ {
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
			$result = $this->httpGet('http://baidu.lecai.com/lottery/draw/ajax_get_detail.php?lottery_type=50&phase='.$issue);
			$result = json_decode($result, true);
			$data = $result['data'];
			if (empty($result) || empty($data)) {
				$this->common->logger->info($this->lotteryName.'数据获取有误('.$issue.')');
				continue;
			}
			//获取开奖号码
			$redBall = null;
			$blueBall = null;
			$result = $data['result']['result'];
			if (empty($result)) {
				continue;
			}
			foreach ($result as $item) {
				$key = trim($item['key']);
				if ($key == 'red') {
					$redBall = $item['data'];
				} else if ($key == 'blue') {
					$blueBall = $item['data'];
				}
			}
			$ball = array();
			if (is_array($redBall) && count($redBall) > 0) {
				$ball[] = implode(',', $redBall);
			}
			if (is_array($blueBall) && count($blueBall) > 0) {
				$ball[] = implode(',', $blueBall);
			}
			$drawNumber = trim(implode('|', $ball));
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
			//获取奖级
			$levelMap = array('prize1' => '一等奖', 'prize2' => '二等奖', 'prize3' => '三等奖', 'prize4' => '四等奖', 'prize5' => '五等奖', 'prize6' => '六等奖', 'prize7' => '幸运二等奖', 'prize8' => '一等奖复式加奖', 'prize9' => '六等奖复式加奖');
			$resultDetail = $data['result_detail']['resultDetail'];
			$prize = array();
			foreach ($resultDetail as $item) {
				$key = trim($item['key']);
				$level = trim($levelMap[$key]);
				$num = trim($item['bet']);
				$amount = trim($item['prize']);
				if (empty($level)) {
					$this->common->logger->info($this->lotteryName.'奖级有误('.$issue.')');
					continue 2;
				}
				$prize[] = array('level' => $level, 'num' => $num, 'amount' => $amount);
			}
			$saleAmount = trim($data['sale_amount']);
			$poolAmount = trim($data['pool_amount']);
			if (empty($issue) || count($redBall) != 6 || count($blueBall) != 1 || empty($drawNumber) || !is_array($prize) || count($prize) <= 0) {
				$this->common->logger->info($this->lotteryName.'数据有误('.$issue.')');
				continue;
			}
			$detail = array(
				'saleAmount' => $saleAmount,
				'poolAmount' => $poolAmount,
				'prizeDetail' => $prize
			);
			$detail = json_encode($detail, JSON_UNESCAPED_UNICODE);
			if (empty($detail)) {
				$this->common->logger->info($this->lotteryName.'详情有误('.$issue.')');
				continue;
			}
			$field = array();
			$field[] = 'drawNumber2="' . $database->escape($drawNumber) . '"';
			$field[] = 'detail=if(detail,detail,"' . $database->escape($detail) . '")';
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
