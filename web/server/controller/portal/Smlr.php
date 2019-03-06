<?php
namespace controller\portal;
use controller\Base;

class Smlr extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $matchService;
	private $planService;
	private $orderService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->matchService = requireService("Match");
		$this->planService = requireService("Plan");
		$this->orderService = requireService("Order");
	}

	//晒米冷热数据
    public function smlrInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $matchId = (int)$this->common->getParam("matchId", 0);
        $userId = (int)$this->loginUserInfo['userId'];
        //该用户是否已经解锁
        $param = array();
        $param['userId'] = $userId;
        $param['matchId'] = $matchId;
        $param['orderType'] = 5;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
        $param['status'] = 2;//订单状态, 1=未付款, 2=已付款, 3=已退款
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->error != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $selectOrderList = $selectOrderResp->data['list'];
        if (count($selectOrderList) <= 0) {
            $this->resp->errCode = 2;
            $this->resp->msg = "您还未购买,请购买再查看";
            $this->jsonView->out($this->resp);
        }
        //赔率信息
        $param = array();
        $param['matchId'] = $matchId;
        $param['bettypeContent'] = 'SPF';
        $selectMatchOddsResp = $this->matchService->selectMatchOddsCache($param);
        if ($selectMatchOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $oddsInfo = $selectMatchOddsResp->data['list'][0];
        if (empty($oddsInfo)) {
            $this->resp->msg = "没有胜平负数据";
            $this->jsonView->out($this->resp);
        }
        $oddsId = (int)$oddsInfo['oddsId'];     //胜平负的oddsId
        $bettypeOdds = json_decode($oddsInfo['bettypeOdds']);
        if (empty($bettypeOdds)) {
            $bettypeOdds = new \stdClass();
            $bettypeOdds->S = 0;
            $bettypeOdds->P = 0;
            $bettypeOdds->F = 0;
        }
        //比赛信息
        $selectMatchByIdResp = $this->matchService->selectMatchByIdCache($matchId);
        if ($selectMatchByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $matchData = $selectMatchByIdResp->data;
        if (empty($matchData)) {
            $this->resp->msg = "比赛查询异常";
            $this->jsonView->out($this->resp);
        }
        $winBetRate = preg_replace("/%/", "", trim($matchData['winBetRate']));
        $drawBetRate = preg_replace("/%/", "", trim($matchData['drawBetRate']));
        $loseBetRate = preg_replace("/%/", "", trim($matchData['loseBetRate']));
        if (empty($winBetRate)) {
            $winBetRate = 0;
        }
        if (empty($drawBetRate)) {
            $drawBetRate = 0;
        }
        if (empty($loseBetRate)) {
            $loseBetRate = 0;
        }
        $winProfitRate = sprintf('%.2f', 100 - $bettypeOdds->S * $winBetRate);
        $drawProfitRate = sprintf('%.2f', 100 - $bettypeOdds->P * $drawBetRate);
        $loseProfitRate = sprintf('%.2f', 100 - $bettypeOdds->F * $loseBetRate);
        $profitRate = array(
            'win' => $winProfitRate,
            'draw' => $drawProfitRate,
            'lose' => $loseProfitRate
        );
        asort($profitRate);//从小到大排序
        $minProfitRateKey = array_keys($profitRate)[0];
        $isHot = array(
            'win' => false,
            'draw' => false,
            'lose' => false
        );
        $isHot[$minProfitRateKey] = true;
        $matchStatistics = array(
            'win' => array('odds' => $bettypeOdds->S, 'betRate' => $winBetRate, 'profitRate' => $winProfitRate, 'recommendRate' => 0, 'isHot' => $isHot['win']),
            'draw' => array('odds' => $bettypeOdds->P, 'betRate' => $drawBetRate, 'profitRate' => $drawProfitRate, 'recommendRate' => 0, 'isHot' => $isHot['draw']),
            'lose' => array('odds' => $bettypeOdds->F, 'betRate' => $loseBetRate, 'profitRate' => $loseProfitRate, 'recommendRate' => 0, 'isHot' => $isHot['lose']),
            'maxRecommendRateKey' => ''
        );
        $matchPlanId = explode(',', trim($matchData['planId']));
        if (is_array($matchPlanId) && count($matchPlanId) > 0) {
            $param['planId'] = $matchPlanId;
            $param['publish'] = 1;
            $selectPlanResp = $this->planService->selectPlan($param);
            if ($selectPlanResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $planListData = $selectPlanResp->data;
            $planList = $planListData['list'];
            $recommendCount = 0;
            $winRecommendCount = 0;
            $drawRecommendCount = 0;
            $loseRecommendCount = 0;
            foreach ($planList as $plan) {
                $matchRecommendArr = json_decode($plan['matchRecommend']);
                foreach ($matchRecommendArr  as $matchRecommend) {
                    $recommendMatchId = (int)$matchRecommend->matchId;
                    $recommendOddsId = (int)$matchRecommend->oddsId;
                    if ($matchId != $recommendMatchId || $oddsId != $recommendOddsId) {
                        continue;
                    }
                    $recommend = $matchRecommend->recommend;
                    $recommendCount += count($recommend);
                    foreach ($recommend as $value) {
                        if ($value == 'S') {
                            $winRecommendCount += 1;
                        } elseif ($value == 'P') {
                            $drawRecommendCount += 1;
                        } else if ($value == 'F') {
                            $loseRecommendCount += 1;
                        }
                    }
                }
            }
            if ($recommendCount > 0) {
                $recommendRate = array();
                $recommendRate['win'] = sprintf('%.2f', $winRecommendCount*100/$recommendCount);
                $recommendRate['draw'] = sprintf('%.2f', $drawRecommendCount*100/$recommendCount);
                $recommendRate['lose'] = sprintf('%.2f', $loseRecommendCount*100/$recommendCount);
                arsort($recommendRate);//从大到小排序
                $maxRecommendRateKey = array_keys($recommendRate)[0];
                $matchStatistics['win']['recommendRate'] = $recommendRate['win'];
                $matchStatistics['draw']['recommendRate'] = $recommendRate['draw'];
                $matchStatistics['lose']['recommendRate'] = $recommendRate['lose'];
                $matchStatistics['maxRecommendRateKey'] = $maxRecommendRateKey;
            }
        }
        $data = $matchStatistics;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function hasSmlrInfo() {
        $matchId = (int)$this->common->getParam("matchId", 0);
        if ($matchId <= 0) {
            $this->resp->msg = "matchId参数有误";
            $this->jsonView->out($this->resp);
        }
        //赔率信息
        $param = array();
        $param['matchId'] = $matchId;
        $param['bettypeContent'] = 'SPF';
        $selectMatchOddsResp = $this->matchService->selectMatchOddsCache($param);
        if ($selectMatchOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $oddsInfo = $selectMatchOddsResp->data['list'][0];
        $oddsId = (int)$oddsInfo['oddsId'];
        $bettypeOdds = json_decode($oddsInfo['bettypeOdds']);
        $this->resp->data = !empty($oddsInfo) && $oddsId > 0 && !empty($bettypeOdds);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}