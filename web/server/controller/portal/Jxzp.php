<?php
namespace controller\portal;
use controller\Base;

class Jxzp extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $matchService;
	private $jxzpService;
	private $comboService;
	private $orderService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->matchService = requireService("Match");
		$this->jxzpService = requireService("Jxzp");
		$this->comboService = requireService("Combo");
		$this->orderService = requireService("Order");
	}

	//得到极限追盘列表
	public function jxzpList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$type = (int)$this->common->getParam("type", 0);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$jxzpAccess = false;
		$comboType = 1;//套餐类型, 1=极限追盘
		$checkNeedBuyComboResp = $this->commonService->checkNeedBuyCombo($userId, $comboType);
		if ($checkNeedBuyComboResp->errCode == 3) {
			$jxzpAccess = true;
		}
		if (!$jxzpAccess) {
			$jxzpAccess = $this->common->isMock();
		}
		if (!$jxzpAccess) {
			$this->resp->errCode = 2;
			$this->resp->msg = "您还未购买极限追盘,请购买再查看";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['type'] = $type;
		$param['needOpen'] = true;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectJxzpResp = $this->jxzpService->selectJxzp($param);
		if ($selectJxzpResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$jxzpListData = $selectJxzpResp->data;
		$jxzpTotalCount = (int)$jxzpListData['totalCount'];
		$jxzpList = $jxzpListData['list'];
		foreach ($jxzpList as &$jxzp) {
			$matchId = (int)$jxzp['matchId'];
			$oddsId = (int)$jxzp['oddsId'];
			$recommend = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzp['recommend']));//玩法字母两边加上引号
			$prize = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzp['prize']));//玩法字母两边加上引号
			$bettypeResult = trim($jxzp['bettypeResult']);
			if (empty($bettypeResult)) {
				$bettypeResult = '{}';
			}
			$bettypePrize = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzp['bettypePrize']));//玩法字母两边加上引号
			if ($matchId <= 0 || $oddsId <= 0) {
				continue;
			}
			$jxzp['matchRecommend'] = '[{"matchId":'.$matchId.',"oddsId":'.$oddsId.',"recommend":['.$recommend.'],"prize":['.$prize.'],"bettypeResult":'.$bettypeResult.',"bettypePrize":['.$bettypePrize.']}]';
		}
		$jxzpList = $this->commonService->setMatchListCache($jxzpList);
		$data = array('totalCount' => $jxzpTotalCount, 'list' => array());
		for ($i = 0, $length = count($jxzpList); $i < $length; $i++) {
			$matchId = (int)$jxzpList[$i]['matchId'];
			$oddsId = (int)$jxzpList[$i]['oddsId'];
			$match = $jxzpList[$i]['matchList'][0];
			if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
				continue;
			}
			$jxzpInfo = array();
			$jxzpInfo['type'] = (int)$jxzpList[$i]['type'];
			$jxzpInfo['status'] = (int)$jxzpList[$i]['status'];
			$jxzpInfo['recentContinue'] = (int)$jxzpList[$i]['recentContinue'];
			$jxzpInfo['historyContinue'] = (int)$jxzpList[$i]['historyContinue'];
			$jxzpInfo['teamName'] = trim($jxzpList[$i]['teamName']);
			$jxzpInfo['matchBeginTime'] = trim($jxzpList[$i]['matchBeginTime']);
			$jxzpInfo['recommend'] = $match['recommend'];
			$jxzpInfo['prize'] = $match['prize'];
			$jxzpInfo['bettypeResult'] = $match['bettypeResult'];
			$jxzpInfo['bettypePrize'] = $match['bettypePrize'];
			$jxzpInfo['bettypeOdds'] = $match['bettypeOdds'];
			$jxzpInfo['concede'] = trim($match['concede']);
			$jxzpInfo['league'] = trim($match['league']);
			$jxzpInfo['home'] = trim($match['home']);
			$jxzpInfo['away'] = trim($match['away']);
			$jxzpInfo['result'] = trim($match['result']);
			$data['list'][] = $jxzpInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function jxzpStatistics() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$selectJxzpGroupPrizeStatusResp = $this->jxzpService->selectJxzpGroupPrizeStatus();
		if ($selectJxzpGroupPrizeStatusResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$list = $selectJxzpGroupPrizeStatusResp->data['list'];
		$data = array('winPercent' => 0);
		if (!empty($list)) {
			$prizeStatus = array();
			foreach ($list as $l) {
				$ps = (int)$l['prizeStatus'];
				$c = (int)$l['count'];
				$prizeStatus[$ps] = $c;
			}
			$win = (int)$prizeStatus[1];
			$lose = (int)$prizeStatus[2];
			$data['winPercent'] = sprintf('%.2f', ($win/($win+$lose))*100);
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//单场极限追盘
    public function jxzpInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $matchId = (int)$this->common->getParam("matchId", 0);
        $type = (int)$this->common->getParam("type", 0);    //1:胜平负, 2:输赢盘, 3:大小分
        $userId = (int)$this->loginUserInfo['userId'];
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		$comboType = 1;//套餐类型, 1=极限追盘
		$checkNeedBuyComboResp = $this->commonService->checkNeedBuyCombo($userId, $comboType);
		//!= 3代表，没购买过极限追盘
		if ($checkNeedBuyComboResp->errCode != 3) {
			//该用户是否已经购买
			$param = array();
			$param['userId'] = $userId;
			$param['matchId'] = $matchId;
			$param['orderType'] = 6;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
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
		}
        //极限追盘
        $param = array();
        $param['type'] = $type;
        $param['matchId'] = $matchId;
        $selectJxzpResp = $this->jxzpService->selectJxzp($param);
        if ($selectJxzpResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $jxzpData = $selectJxzpResp->data['list'][0];
        if (empty($jxzpData)) {
            $jxzpInfo = new \stdClass();
            $this->resp->data = $jxzpInfo;
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        }
		$matchId = (int)$jxzpData['matchId'];
		$oddsId = (int)$jxzpData['oddsId'];
		$recommend = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzpData['recommend']));//玩法字母两边加上引号
		$prize = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzpData['prize']));//玩法字母两边加上引号
		$bettypeResult = trim($jxzpData['bettypeResult']);
		if (empty($bettypeResult)) {
			$bettypeResult = '{}';
		}
		$bettypePrize = preg_replace("/([A-Z]+)/", '"$1"', trim($jxzpData['bettypePrize']));//玩法字母两边加上引号
		$jxzpData['matchRecommend'] = '[{"matchId":'.$matchId.',"oddsId":'.$oddsId.',"recommend":['.$recommend.'],"prize":['.$prize.'],"bettypeResult":'.$bettypeResult.',"bettypePrize":['.$bettypePrize.']}]';
		$jxzpData = $this->commonService->setMatchListCache(array($jxzpData))[0];
        $matchInfo = $jxzpData['matchList'][0];
        $jxzpInfo = array();
        $jxzpInfo['type'] = (int)$jxzpData['type'];
        $jxzpInfo['status'] = (int)$jxzpData['status'];
        $jxzpInfo['recentContinue'] = (int)$jxzpData['recentContinue'];
        $jxzpInfo['historyContinue'] = (int)$jxzpData['historyContinue'];
        $jxzpInfo['teamName'] = trim($jxzpData['teamName']);
        $jxzpInfo['matchBeginTime'] = trim($jxzpData['matchBeginTime']);
        $jxzpInfo['recommend'] = $matchInfo['recommend'];
        $jxzpInfo['prize'] = $matchInfo['prize'];
        $jxzpInfo['bettypeResult'] = $matchInfo['bettypeResult'];
        $jxzpInfo['bettypePrize'] = $matchInfo['bettypePrize'];
		$jxzpInfo['bettypeOdds'] = $matchInfo['bettypeOdds'];
		$jxzpInfo['concede'] = trim($matchInfo['concede']);
        $jxzpInfo['league'] = trim($matchInfo['league']);
        $jxzpInfo['home'] = trim($matchInfo['home']);
        $jxzpInfo['away'] = trim($matchInfo['away']);
        $jxzpInfo['result'] = trim($matchInfo['result']);
        $this->resp->data = $jxzpInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	public function hasJxzpInfo() {
		$matchId = (int)$this->common->getParam("matchId", 0);
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		//极限追盘
		$param = array();
		$param['matchId'] = $matchId;
		$selectJxzpResp = $this->jxzpService->selectJxzp($param);
		if ($selectJxzpResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$jxzpList = $selectJxzpResp->data['list'];
		$typeMap = array();
		foreach ($jxzpList as $jxzp) {
			$type = (int)$jxzp['type'];
			if ($type > 0) {
				$typeMap[$type] = true;
			}
		}
		$keys = array_keys($typeMap);
		sort($keys);
		$this->resp->data = $keys;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}