<?php
namespace controller\portal;
use controller\Base;

class Finance extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $financeService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->financeService = requireService("Finance");
	}

	//得到提款列表
	public function withdrawList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$financeType = $this->common->getParam("financeType", null);
		$userId = (int)$this->loginUserInfo['userId'];
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userId'] = $userId;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectFinanceWithdrawResp = $this->financeService->selectFinanceWithdraw($param);
		if ($selectFinanceWithdrawResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$withdrawData = $selectFinanceWithdrawResp->data;
		$totalCount = (int)$withdrawData['totalCount'];
		$withdrawList = $withdrawData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($withdrawList); $i < $length; $i++) {
			$financeType = (int)$withdrawList[$i]['financeType'];
			$userId = (int)$withdrawList[$i]['userId'];
			$amount = (int)$withdrawList[$i]['amount'];
			$status = (int)$withdrawList[$i]['status'];
			$remark = trim($withdrawList[$i]['remark']);
			$createTime = trim($withdrawList[$i]['createTime']);
			if ($userId <= 0 || $amount <= 0) {
				continue;
			}
			$withdrawInfo = array();
			$withdrawInfo['financeType'] = $financeType;
			$withdrawInfo['amount'] = $amount;
			$withdrawInfo['status'] = $status;
			$withdrawInfo['remark'] = $remark;
			$withdrawInfo['createTime'] = $createTime;
			$data['list'][] = $withdrawInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到充值列表
	public function chargeList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$financeType = $this->common->getParam("financeType", null);
		$userId = (int)$this->loginUserInfo['userId'];
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userId'] = $userId;
		$param['type'] = array(1,2);
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectFinanceChargeResp = $this->financeService->selectFinanceCharge($param);
		if ($selectFinanceChargeResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$chargeData = $selectFinanceChargeResp->data;
		$totalCount = (int)$chargeData['totalCount'];
		$chargeList = $chargeData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($chargeList); $i < $length; $i++) {
			$financeType = (int)$chargeList[$i]['financeType'];
			$type = (int)$chargeList[$i]['type'];
			$userId = (int)$chargeList[$i]['userId'];
			$amount = (int)$chargeList[$i]['amount'];
			$remark = trim($chargeList[$i]['remark']);
			$createTime = trim($chargeList[$i]['createTime']);
			if ($type <= 0 && $userId <= 0) {
				continue;
			}
			$chargeInfo = array();
			$chargeInfo['financeType'] = $financeType;
			$chargeInfo['type'] = $type;
			$chargeInfo['amount'] = $amount;
			$chargeInfo['remark'] = $remark;
			$chargeInfo['createTime'] = $createTime;
			$data['list'][] = $chargeInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到充值列表
	public function financeRecordList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$financeType = $this->common->getParam("financeType", null);
		$userId = (int)$this->loginUserInfo['userId'];
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userId'] = $userId;
		$param['type'] = array(1,2,3,4);//类型, 1=消费, 2=收益, 3=提款, 4=充值
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectFinanceRecordResp = $this->financeService->selectFinanceRecord($param);
		if ($selectFinanceRecordResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$financeRecordData = $selectFinanceRecordResp->data;
		$totalCount = (int)$financeRecordData['totalCount'];
		$financeRecordList = $financeRecordData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($financeRecordList); $i < $length; $i++) {
			$financeType = (int)$financeRecordList[$i]['financeType'];
			$type = (int)$financeRecordList[$i]['type'];
			$userId = (int)$financeRecordList[$i]['userId'];
			$amount = (int)$financeRecordList[$i]['amount'];
			$remark = trim($financeRecordList[$i]['remark']);
			$createTime = trim($financeRecordList[$i]['createTime']);
			if ($type <= 0 && $userId <= 0) {
				continue;
			}
			$financeInfo = array();
			$financeInfo['financeType'] = $financeType;
			$financeInfo['type'] = $type;
			$financeInfo['amount'] = $amount;
			$financeInfo['remark'] = $remark;
			$financeInfo['createTime'] = $createTime;
			$data['list'][] = $financeInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}