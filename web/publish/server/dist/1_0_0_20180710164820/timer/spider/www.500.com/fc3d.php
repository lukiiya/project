<?php
class WuBaiFC3D {
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
			$result = $this->httpGet('http://kaijiang.500.com/static/info/kaijiang/xml/sd/'.$issue.'.xml?_A=PAXBKVNE'.time());
			$xml = simplexml_load_string($result);
			if (empty($result) || empty($xml)) {
				$this->common->logger->info($this->lotteryName.'数据获取有误');
				continue;
			}
            $PeriodicalNO = null;
			$Result = null;
			$TryCode = null;
			foreach ($xml->children() as $row) {
				$nodeName = trim($row->getName());
                if ($nodeName == 'PeriodicalNO') {
                    $PeriodicalNO = trim($row->__toString());
                } else if ($nodeName == 'Result') {
					$Result = trim($row->__toString());
				} else if ($nodeName == 'TryCode') {
					$TryCode = trim($row->__toString());
				}
			}
            if ($PeriodicalNO != $issue) {
                $this->common->logger->info($this->lotteryName.'期号匹配异常');
                continue;
            }
			if (!preg_match('/^\d,\d,\d$/', $Result)) {
				$this->common->logger->info($this->lotteryName.'开奖号码有误');
				continue;
			}
			if (!preg_match('/^\d,\d,\d$/', $TryCode)) {
				$this->common->logger->info($this->lotteryName.'试机号有误');
				continue;
			}

			$drawNumber = $Result.'|'.$TryCode;
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
			$field = array();
			$field[] = 'drawNumber2="' . $database->escape($drawNumber) . '"';
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
