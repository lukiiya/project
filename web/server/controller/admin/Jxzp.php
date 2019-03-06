<?php
namespace controller\admin;
use controller\Base;

class Jxzp extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $matchService;
	private $jxzpService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->matchService = requireService("Match");
		$this->jxzpService = requireService("Jxzp");
	}

	public function createJxzp() {
		$type = (int)$this->common->getParam("type", 0);
		$teamName = trim($this->common->getParam("teamName", ''));
		$matchId = (int)$this->common->getParam("matchId", 0);
		$oddsId = (int)$this->common->getParam("oddsId", 0);
		$recommend = trim($this->common->getParam("recommend", ''));
		$status = (int)$this->common->getParam("status", 0);
		$recentContinue = (int)$this->common->getParam("recentContinue", 0);
		$historyContinue = (int)$this->common->getParam("historyContinue", 0);
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($teamName)) {
			$this->resp->msg = "teamName参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($oddsId <= 0) {
			$this->resp->msg = "oddsId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($recommend)) {
			$this->resp->msg = "recommendtype参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($status <= 0) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($recentContinue <= 0) {
			$this->resp->msg = "recentContinue参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($historyContinue <= 0) {
			$this->resp->msg = "historyContinue参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectMatchByIdResp = $this->matchService->selectMatchById($matchId);
		if ($selectMatchByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchData = $selectMatchByIdResp->data;
		if (empty($matchData)) {
			$this->resp->msg = "比赛不存在";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['type'] = $type;
		$param['teamName'] = $teamName;
		$param['matchId'] = $matchId;
		$param['matchBeginTime'] = trim($matchData['beginTime']);
		$param['oddsId'] = $oddsId;
		$param['recommend'] = $recommend;
		$param['status'] = $status;
		$param['recentContinue'] = $recentContinue;
		$param['historyContinue'] = $historyContinue;
		$param['closeTime'] = date("Y-m-d H:i:s", time()+(3600*24*2));//两天结束显示
		$param['publish'] = 1;
		$insertJxzpResp = $this->jxzpService->insertJxzp($param);
		if ($insertJxzpResp->errCode != 0) {
			$this->resp->msg = "添加极限追盘失败";
			$this->jsonView->out($this->resp);
		}
		$jxzpId = (int)$insertJxzpResp->data;
		if ($jxzpId <= 0) {
			$this->resp->msg = "添加极限追盘失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = array('jxzpId' => $jxzpId);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyJxzp() {
		$jxzpId = (int)$this->common->getParam("jxzpId", 0);
		$type = (int)$this->common->getParam("type", 0);
		$teamName = trim($this->common->getParam("teamName", ''));
		$matchId = (int)$this->common->getParam("matchId", 0);
		$oddsId = (int)$this->common->getParam("oddsId", 0);
		$recommend = trim($this->common->getParam("recommend", ''));
		$status = (int)$this->common->getParam("status", 0);
		$recentContinue = (int)$this->common->getParam("recentContinue", 0);
		$historyContinue = (int)$this->common->getParam("historyContinue", 0);
		if ($jxzpId <= 0) {
			$this->resp->msg = "jxzpId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($teamName)) {
			$this->resp->msg = "teamName参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($oddsId <= 0) {
			$this->resp->msg = "oddsId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($recommend)) {
			$this->resp->msg = "recommendtype参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($status <= 0) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($recentContinue <= 0) {
			$this->resp->msg = "recentContinue参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($historyContinue <= 0) {
			$this->resp->msg = "historyContinue参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['jxzpId'] = $jxzpId;
		$param['type'] = $type;
		$param['teamName'] = $teamName;
		$param['matchId'] = $matchId;
		$param['oddsId'] = $oddsId;
		$param['recommend'] = $recommend;
		$param['status'] = $status;
		$param['recentContinue'] = $recentContinue;
		$param['historyContinue'] = $historyContinue;
		$updateJxzpResp = $this->jxzpService->updateJxzp($param);
		if ($updateJxzpResp->errCode != 0) {
			$this->resp->msg = "修改极限追盘失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function publishJxzp() {
		$jxzpId = (int)$this->common->getParam("jxzpId", 0);
		$publish = (int)$this->common->getParam("publish", 0);
		if ($jxzpId <= 0) {
			$this->resp->msg = "jxzpId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['jxzpId'] = $jxzpId;
		$param['publish'] = $publish;
		$updateJxzpResp = $this->jxzpService->updateJxzp($param);
		if ($updateJxzpResp->errCode != 0) {
			$this->resp->msg = "上下架极限追盘失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到极限追盘详情
	public function jxzpInfo() {
		$jxzpId = (int)$this->common->getParam("jxzpId", 0);
		if ($jxzpId <= 0) {
			$this->resp->msg = "jxzpId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectJxzpByIdResp = $this->jxzpService->selectJxzpById($jxzpId);
		if ($selectJxzpByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$jxzpData = $selectJxzpByIdResp->data;
		$matchId = (int)$jxzpData['matchId'];
		$oddsId = (int)$jxzpData['oddsId'];
		if ($matchId <= 0 || $oddsId <= 0) {
			$this->resp->msg = "数据异常";
			$this->jsonView->out($this->resp);
		}
		$selectMatchByIdResp = $this->matchService->selectMatchById($matchId);
		if ($selectMatchByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchData = $selectMatchByIdResp->data;
		$selectMatchOddsByIdResp = $this->matchService->selectMatchOddsById($oddsId);
		if ($selectMatchOddsByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$oddsData = $selectMatchOddsByIdResp->data;
		if (empty($matchData) || empty($oddsData)) {
			$this->resp->msg = "数据异常";
			$this->jsonView->out($this->resp);
		}
		$jxzpData['bettypeName'] = trim($oddsData['bettypeName']);
		$jxzpData['bettypeContent'] = trim($oddsData['bettypeContent']);
		$jxzpData['bettypeValue'] = trim($oddsData['bettypeValue']);
		$jxzpData['bettypeOdds'] = trim($oddsData['bettypeOdds']);
		$jxzpData['concede'] = trim($oddsData['concede']);
		$jxzpData['number'] = trim($matchData['number']);
		$jxzpData['league'] = trim($matchData['league']);
		$jxzpData['home'] = trim($matchData['home']);
		$jxzpData['away'] = trim($matchData['away']);
		$jxzpData['beginTime'] = trim($matchData['beginTime']);
		$jxzpData['endTime'] = trim($matchData['endTime']);
		$jxzpData['saleTime'] = trim($matchData['saleTime']);
		$jxzpData['result'] = trim($matchData['result']);
		$this->resp->data = $jxzpData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到极限追盘列表
	public function jxzpList() {
		$teamName = trim($this->common->getParam("teamName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$status = (int)$this->common->getParam("status", 0);
		$publish = $this->common->getParam("publish", null);
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
		$param = array();
		$param['teamName'] = $teamName;
		$param['type'] = $type;
		$param['status'] = $status;
		if ($publish != null) {
			$param['publish'] = $publish;
		}
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
		$matchIdArr = array();
		$oddsIdArr = array();
		foreach ($jxzpList as $jxzp) {
			$matchId = (int)$jxzp['matchId'];
			$oddsId = (int)$jxzp['oddsId'];
			if ($matchId > 0) {
				$matchIdArr[] = $matchId;
			}
			if ($oddsId > 0) {
				$oddsIdArr[] = $oddsId;
			}
		}
		$matchIdArr = array_unique($matchIdArr);
		$oddsIdArr = array_unique($oddsIdArr);
		if (count($matchIdArr) <= 0 || $oddsIdArr <= 0) {
			$this->resp->data = array('list' => array(), 'totalCount' => 0);
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
		//查询赔率
		$param = array();
		$param['type'] = 1;
		$param['oddsId'] = $oddsIdArr;
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
		$matchOddsMap = array();
		foreach ($matchOddsList as $odds) {
			$oddsId = (int)$odds['oddsId'];
			if ($oddsId > 0) {
				$matchOddsMap[$oddsId] = $odds;
			}
		}
		for ($i = 0, $length = count($jxzpList); $i < $length; $i++) {
			$matchId = (int)$jxzpList[$i]['matchId'];
			$oddsId = (int)$jxzpList[$i]['oddsId'];
			if ($matchId <= 0 || $oddsId <= 0 || empty($matchMap[$matchId]) || empty($matchOddsMap[$oddsId])) {
				continue;
			}
			$jxzpList[$i]['bettypeName'] = trim($matchOddsMap[$oddsId]['bettypeName']);
			$jxzpList[$i]['bettypeContent'] = trim($matchOddsMap[$oddsId]['bettypeContent']);
			$jxzpList[$i]['bettypeValue'] = trim($matchOddsMap[$oddsId]['bettypeValue']);
			$jxzpList[$i]['bettypeOdds'] = trim($matchOddsMap[$oddsId]['bettypeOdds']);
			$jxzpList[$i]['concede'] = trim($matchOddsMap[$oddsId]['concede']);
			$jxzpList[$i]['number'] = trim($matchMap[$matchId]['number']);
			$jxzpList[$i]['league'] = trim($matchMap[$matchId]['league']);
			$jxzpList[$i]['home'] = trim($matchMap[$matchId]['home']);
			$jxzpList[$i]['away'] = trim($matchMap[$matchId]['away']);
			$jxzpList[$i]['beginTime'] = trim($matchMap[$matchId]['beginTime']);
			$jxzpList[$i]['endTime'] = trim($matchMap[$matchId]['endTime']);
			$jxzpList[$i]['saleTime'] = trim($matchMap[$matchId]['saleTime']);
			$jxzpList[$i]['result'] = trim($matchMap[$matchId]['result']);
		}
		$this->resp->data = array('totalCount' => $jxzpTotalCount, 'list' => $jxzpList);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}