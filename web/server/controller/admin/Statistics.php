<?php
namespace controller\admin;
use controller\Base;

class Statistics extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $statisticsService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->statisticsService = requireService("Statistics");
	}

	public function statisticsDateList() {
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectStatisticsDateResp = $this->statisticsService->selectStatisticsDate($param);
		if ($selectStatisticsDateResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$statisticsListData = $selectStatisticsDateResp->data;
		$this->resp->data = $statisticsListData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function statisticsUserDateList() {
		$planPrizeRateRank = (bool)$this->common->getParam("planPrizeRateRank", false);
		$userName = trim($this->common->getParam("userName", ''));
		$dateType = (int)$this->common->getParam("dateType", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		$param['planPrizeRateRank'] = $planPrizeRateRank;
		$param['userName'] = $userName;
		$param['dateType'] = $dateType;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectStatisticsUserDateResp = $this->statisticsService->selectStatisticsUserDate($param);
		if ($selectStatisticsUserDateResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectStatisticsUserDateResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function statisticsAmountList() {
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
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectStatisticsAmountResp = $this->statisticsService->selectStatisticsAmount($param);
		if ($selectStatisticsAmountResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectStatisticsAmountResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function statisticsCashConsumeUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
		$financeType = $this->common->getParam("financeType", null);
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
		$param['userName'] = $userName;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$selectStatisticsCashConsumeUserResp = $this->statisticsService->selectStatisticsCashConsumeUser($param);
		if ($selectStatisticsCashConsumeUserResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectStatisticsCashConsumeUserResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function expertStatistics198() {
		$planPrizeRateRank = (bool)$this->common->getParam("planPrizeRateRank", false);
		$userId = trim($this->common->getParam("userId", 0));
		$dateType = (int)$this->common->getParam("dateType", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		$userIdArr = array(105,1335);//198足球 和 Sam
		if ($userId <= 0) {
			$userId = $userIdArr;
		} else if (!in_array($userId, $userIdArr)) {
			$this->resp->msg = "无权限访问";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['planPrizeRateRank'] = $planPrizeRateRank;
		$param['userId'] = $userId;
		$param['dateType'] = $dateType;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectStatisticsUserDateResp = $this->statisticsService->selectStatisticsUserDate($param);
		if ($selectStatisticsUserDateResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectStatisticsUserDateResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}