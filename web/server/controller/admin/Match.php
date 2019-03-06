<?php
namespace controller\admin;
use controller\Base;

class Match extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $matchService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->matchService = requireService("Match");
	}

	public function modifyMatch() {
		$matchId = (int)$this->common->getParam("matchId", 0);
		$halfResult = trim($this->common->getParam("halfResult", ''));
		$result = trim($this->common->getParam("result", ''));
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (!empty($halfResult) && $halfResult != '取消' && !preg_match("/^\d+:\d+$/", $halfResult)) {
			$this->resp->msg = "halfResult参数有误";
			$this->jsonView->out($this->resp);
		}
		if (!empty($result) && $result != '取消' && !preg_match("/^\d+:\d+$/", $result)) {
			$this->resp->msg = "result参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['matchId'] = $matchId;
		$param['halfResult'] = $halfResult;
		$param['result'] = $result;
		$updateMatchResp = $this->matchService->updateMatch($param);
		if ($updateMatchResp->errCode != 0) {
			$this->resp->msg = "修改比赛失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到订单列表
	public function matchList() {
		$needSale = (bool)$this->common->getParam("needSale", false);
		$number = trim($this->common->getParam("number", ''));
		$league = trim($this->common->getParam("league", ''));
		$home = trim($this->common->getParam("home", ''));
		$away = trim($this->common->getParam("away", ''));
		$type = (int)$this->common->getParam("type", '');
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
		$result = trim($this->common->getParam("result", ''));
		$orderBy = (int)$this->common->getParam("orderBy", 0);
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
		$data = array();
		if ($needSale) {
			$param = array();
			$param['needSale'] = true;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1000;
			$param['needCount'] = false;
			$selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
			if ($selectMatchOddsResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$matchOddsListData = $selectMatchOddsResp->data;
			$matchOddsList = $matchOddsListData['list'];
			$matchIdArr = array();
			foreach ($matchOddsList as $odds) {
				$matchId = (int)$odds['matchId'];
				if ($matchId > 0) {
					$matchIdArr[] = $matchId;
				}
			}
			$matchIdArr = array_unique($matchIdArr);
			if (count($matchIdArr) <= 0) {
				$this->resp->data = array('list' => array());
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
			//查询比赛
			$param = array();
			$param['type'] = 1;
			$param['matchId'] = $matchIdArr;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1000;
			$param['needCount'] = false;
			$selectMatchResp = $this->matchService->selectMatch($param);
			if ($selectMatchResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$matchListData = $selectMatchResp->data;
			$matchList = $matchListData['list'];
			$matchMap = array();
			foreach ($matchList as $match) {
				$matchId = (int)$match['matchId'];
				if ($matchId > 0) {
					$matchMap[$matchId] = $match;
				}
			}
			for ($i = 0, $length = count($matchOddsList); $i < $length; $i++) {
				$matchId = (int)$matchOddsList[$i]['matchId'];
				if ($matchId <= 0 || empty($matchMap[$matchId])) {
					continue;
				}
				$oddsInfo = array();
				$oddsInfo['oddsId'] = (int)$matchOddsList[$i]['oddsId'];
				$oddsInfo['bettypeName'] = trim($matchOddsList[$i]['bettypeName']);
				$oddsInfo['bettypeContent'] = trim($matchOddsList[$i]['bettypeContent']);
				$oddsInfo['bettypeValue'] = trim($matchOddsList[$i]['bettypeValue']);
				$oddsInfo['bettypeOdds'] = trim($matchOddsList[$i]['bettypeOdds']);
				$oddsInfo['concede'] = trim($matchOddsList[$i]['concede']);
				$oddsInfo['matchId'] = $matchId;
				$oddsInfo['number'] = trim($matchMap[$matchId]['number']);
				$oddsInfo['league'] = trim($matchMap[$matchId]['league']);
				$oddsInfo['home'] = trim($matchMap[$matchId]['home']);
				$oddsInfo['away'] = trim($matchMap[$matchId]['away']);
				$oddsInfo['beginTime'] = trim($matchMap[$matchId]['beginTime']);
				$oddsInfo['endTime'] = trim($matchMap[$matchId]['endTime']);
				$oddsInfo['saleTime'] = trim($matchMap[$matchId]['saleTime']);
				$oddsInfo['result'] = trim($matchMap[$matchId]['result']);
				$data['list'][] = $oddsInfo;
			}
		} else {
			//查询比赛
			$param = array();
			$param['number'] = $number;
			$param['league'] = $league;
			$param['home'] = $home;
			$param['away'] = $away;
			$param['type'] = $type;
			$param['beginTime'] = $beginTime;
			$param['endTime'] = $endTime;
			$param['result'] = $result;
			$param['orderBy'] = $orderBy;
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
			$param['needCount'] = true;
			$selectMatchResp = $this->matchService->selectMatch($param);
			if ($selectMatchResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$data = $selectMatchResp->data;
			$list = &$data['list'];
			foreach ($list as &$info) {
				$beginTime = (int)strtotime(trim($info['beginTime']));
				$result = trim($info['result']);
				$info['setResult'] = (time() - $beginTime) >= (2 * 3600);//比赛开始已经2小时
				$info['setCancel'] = (time() - $beginTime) >= (3 * 3600);//比赛开始已经3小时
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}