<?php
class QiHuJSK3 {
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
        $result = $this->httpGet('http://m.cp.360.cn/kaijiang/qkjlist?lotId=255903&page=1&r='.time());
        $result = json_decode($result, true);
        $list = $result['list'];
        if (empty($result) || empty($list)) {
            $this->common->logger->info($this->lotteryName.'数据获取有误');
            return;
        }
        $drawNumberMap = array();
        foreach ($list as $item) {
            $issue = trim($item['Issue']);
            $number = trim($item['BallNumber']);
            //转化期号格式
            if (!preg_match('/^\d{10}$/', $issue)) {
                continue;
            }
            //2017091531->170915031
            $year = substr($issue, 2, 2);
            $monthDay = substr($issue, 4, 4);
            $num = '0'.substr($issue, 8, 2);
            $issue = $year.$monthDay.$num;
            if (!preg_match('/^\d{9}$/', $issue) || !preg_match('/^([1-6])([1-6])([1-6])$/', $number, $numberArr)) {
                continue;
            }
            unset($numberArr[0]);
            if (!is_array($numberArr) || count($numberArr) != 3) {
                continue;
            }
            $drawNumberMap[$issue] = implode(',', $numberArr);
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
            $field[] = 'drawNumber1="' . $database->escape($drawNumber) . '"';
            $sql = 'update t_lottery_issue set ' . implode(',', $field) . ' where lotteryId="'.$database->escape($this->lotteryId).'" and issue="' . $database->escape($issue) . '" limit 1';
            $result = $database->execute($sql);
            if ($result) {
                $this->common->logger->info('360网'.$this->lotteryName.' '.$issue.' 期开奖成功');
            } else {
                $this->common->logger->info('360网'.$this->lotteryName.' '.$issue.' 期开奖失败');
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
