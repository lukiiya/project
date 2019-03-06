<?php
class LotteryDLT {
	private $common;
	private $commonService;
	private $lotteryService;
	private $lotteryId;
	private $lotteryName;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
		$this->lotteryId = "DLT";
		$this->lotteryName = "大乐透";
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
			$result = $this->httpGet('http://www.lottery.gov.cn/api/lottery_kj_detail_new.jspx?_ltype=4&_term='.$issue);
			$result = json_decode($result, true);
			$data = $result[0];
			if (empty($result) || empty($data)) {
				$this->common->logger->info($this->lotteryName.'数据获取有误('.$issue.')');
				continue;
			}
			$issue = trim($data['lottery']['term']);
			$redBall = array_slice($data['codeNumber'], 0, 5);
			$blueBall = array_slice($data['codeNumber'], 5);
			$saleAmount = trim($data['lottery']['totalSales']);
			$poolAmount = trim($data['lottery']['pool']);
			$saleAmount = preg_replace('/,/', '', $saleAmount);
			$poolAmount = preg_replace('/,/', '', $poolAmount);
			$details = $data['details'];
			if (empty($issue) || !is_array($redBall) || count($redBall) != 5 || !is_array($blueBall) || count($blueBall) != 2 || !is_array($details) || count($details) <= 0) {
				$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
				continue;
			}
			$drawNumber = implode(',', $redBall).'+'.implode(',', $blueBall);
			if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2}\+\d{2},\d{2}$/', $drawNumber)) {
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
			$prizeDetail = array();
			for ($i = 0; $i < 11; $i++) {
				$detail = $details[$i];
				$level = trim($detail['level']);
				$num = preg_replace('/,/', '', trim($detail['piece']));
				$money = trim(preg_replace('/,/', '', $detail['money']));
				if (empty($level)) {
                    $this->common->logger->info($this->lotteryName.'奖级有误('.$issue.')');
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
                $this->common->logger->info($this->lotteryName.'详情有误('.$issue.')');
                continue;
			}
			$field = array();
			$field[] = 'drawNumber1="' . $database->escape($drawNumber) . '"';
			$field[] = 'detail=if(detail,detail,"' . $database->escape($detail) . '")';
			$sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
			$result = $database->execute($sql);
			if ($result) {
				$this->common->logger->info('体彩网'.$this->lotteryName.' '.$issue.' 期开奖成功');
			} else {
				$this->common->logger->info('体彩网'.$this->lotteryName.' '.$issue.' 期开奖失败');
			}
		}
		$database->close();
	}

	public function setIssueAll() {
		$result = $this->httpGet('http://m.lottery.gov.cn/api/mlottery_kj_detail.jspx?_ltype=4&_term=0&_num=10000');
		$result = json_decode($result, true);
		$dataList = $result[0]['mdata'];
		if (!is_array($result) || count($result) != 1 || !is_array($dataList) || count($dataList) <= 0) {
			$this->common->logger->info($this->lotteryName.'数据有误');
			return;
		}
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($dataList as $data) {
			$issue = trim($data['lottery']['term']);
			$drawTime = (int)($data['lottery']['openTime']['time']/1000);
			$redBall = array_slice($data['codeNumber'], 0, 5);
			$blueBall = array_slice($data['codeNumber'], 5);
			$saleAmount = trim($data['lottery']['totalSales']);
			$poolAmount = trim($data['lottery']['pool']);
			$saleAmount = preg_replace('/,/', '', $saleAmount);
			$poolAmount = preg_replace('/,/', '', $poolAmount);
			$details = $data['details'];
			if (empty($issue) || $drawTime <= 0 || count($redBall) != 5 || count($blueBall) != 2 || !is_array($details) || count($details) <= 0) {
				$this->common->logger->info($this->lotteryName.'('.$issue.')数据有误');
				return;
			}
			$drawTime = date('Y-m-d H:i:s', $drawTime);
			$drawNumber = implode(',', $redBall).'+'.implode(',', $blueBall);
			if (empty($drawTime) || !preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2}\+\d{2},\d{2}$/', $drawNumber)) {
				$this->common->logger->info($this->lotteryName.'开奖数据有误');
				return;
			}
			$prizeDetail = array();
			for ($i = 0; $i < 11; $i++) {
				$detail = $details[$i];
				$level = trim($detail['level']);
				$num = preg_replace('/,/', '', trim($detail['piece']));
				$money = trim(preg_replace('/,/', '', $detail['money']));
				if (empty($level)) {
					$this->common->logger->info($this->lotteryName.'奖级有误');
					return;
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
