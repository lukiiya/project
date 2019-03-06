<?php
class OkoooDLT {
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
            $result = $this->httpGet('http://www.okooo.com/daletou/dltkj/?LotteryNo='.$issue.'&Type=lotteryresult');
            $result = json_decode($result, true);
            $data = $result;
            if (empty($result) || empty($data)) {
                $this->common->logger->info($this->lotteryName.'数据获取有误('.$issue.')');
                continue;
            }
            $drawNumber = trim($data['LotteryResult']);
            $drawNumberArr = explode('|', $drawNumber);
            $redBall = explode(',', $drawNumberArr[0]);
            $blueBall = explode(',', $drawNumberArr[1]);
            if (count($redBall) != 5 || count($blueBall) != 2) {
                continue;
            }
            $redBallArr = array();
            $blueBallArr = array();
            foreach ($redBall as $red) {
                for ($j = 0, $len = 2 - strlen($red); $j < $len; $j++) {
                    $red = '0'.$red;
                }
                $redBallArr[] = $red;
            }
            foreach ($blueBall as $blue) {
                for ($j = 0, $len = 2 - strlen($blue); $j < $len; $j++) {
                    $blue = '0'.$blue;
                }
                $blueBallArr[] = $blue;
            }
            $drawNumber = implode(',', $redBallArr).'+'.implode(',', $blueBallArr);
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
            $levelMap = array('1' => '一等奖', '2' => '二等奖', '3' => '三等奖', '4' => '四等奖', '5' => '五等奖', '6' => '六等奖', '7' => '一等奖追加', '8' => '二等奖追加', '9' => '三等奖追加', '10' => '四等奖追加', '11' => '五等奖追加', '12' => '六等奖追加');
            $prizeList = $data['PrizeList'];
            $prize = array();
            foreach ($prizeList as $item) {
                $level = trim($item['PrizeLevel']);
                $level = trim($levelMap[$level]);
                $num = trim($item['HitNum']);
                $amount = trim($item['Prize']);
                if (empty($level)) {
                    $this->common->logger->info($this->lotteryName.'奖级有误('.$issue.')');
                    continue 2;
                }
                $prize[] = array('level' => $level, 'num' => $num, 'amount' => $amount);
            }
            $saleAmount = trim($data['Sale']);
            $poolAmount = trim($data['PoolPrize']);
            if (empty($issue) || empty($drawNumber) || !is_array($prize) || count($prize) <= 0) {
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
            $field[] = 'drawNumber3="' . $database->escape($drawNumber) . '"';
            $field[] = 'detail=if(detail,detail,"' . $database->escape($detail) . '")';
            $sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
            $result = $database->execute($sql);
            if ($result) {
                $this->common->logger->info('澳客网'.$this->lotteryName.' '.$issue.' 期开奖成功');
            } else {
                $this->common->logger->info('澳客网'.$this->lotteryName.' '.$issue.' 期开奖失败');
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
