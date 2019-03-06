<?php
namespace service;
class Plan extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Plan");
	}

	public function insertPlan($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = (int)$param['userId'];
		$amount = (int)$param['amount'];
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;	
		}
		if ($amount < 0) {
			$resp->msg = "amount不能为负数";
			return $resp;
		}
		$insertPlanResp = $this->dao->insertPlan($param);
		if ($insertPlanResp->errCode != 0) {
			$resp->msg = $insertPlanResp->msg;
			return $resp;	
		}
		$resp->data = $insertPlanResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updatePlan($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$planId = (int)$param['planId'];
		if ($planId <= 0) {
			$resp->msg = "planId不能为空";
			return $resp;	
		}
		$updatePlanResp = $this->dao->updatePlan($param);
		if ($updatePlanResp->errCode != 0) {
			$resp->msg = $updatePlanResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function deletePlan($planId) {
		$resp = requireModule("Resp");
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = "planId不能为空";
			return $resp;
		}
		$deletePlanResp = $this->dao->deletePlan($planId);
		if ($deletePlanResp->errCode != 0) {
			$resp->msg = $deletePlanResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updatePlanUpCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$updatePlanUpCountResp = $this->dao->updatePlanUpCount($planId);
		if ($updatePlanUpCountResp->errCode != 0) {
			$resp->msg = $updatePlanUpCountResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updatePlanDownCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$updatePlanDownCountResp = $this->dao->updatePlanDownCount($planId);
		if ($updatePlanDownCountResp->errCode != 0) {
			$resp->msg = $updatePlanDownCountResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updatePlanShareCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$updatePlanShareCountResp = $this->dao->updatePlanShareCount($planId);
		if ($updatePlanShareCountResp->errCode != 0) {
			$resp->msg = $updatePlanShareCountResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	//--增加阅读量
	public function updatePlanReadCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$updatePlanReadCountResp = $this->dao->updatePlanReadCount($planId);
		if ($updatePlanReadCountResp->errCode != 0) {
			$resp->msg = $updatePlanReadCountResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectPlanById($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId有误';
			return $resp;
		}
		$selectPlanByIdResp = $this->dao->selectPlanById($planId);
		if ($selectPlanByIdResp->errCode != 0) {
			$resp->msg = $selectPlanByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectPlanByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectPlanByNo($planNo) {
		$resp = requireModule('Resp');
		$planNo = trim($planNo);
		if (empty($planNo)) {
			$resp->msg = 'planNo有误';
			return $resp;
		}
		$planNoArr = $this->common->decodeNo($planNo);
		$planNoUserId = (int)$planNoArr['userId'];
		$planNoPlanId = (int)$planNoArr['id'];
		if (empty($planNoArr) || $planNoUserId <= 0 || $planNoPlanId <= 0) {
			$resp->msg = 'planNo参数有误';
			return $resp;
		}
		$param = array();
		$param['userId'] = $planNoUserId;
		$param['planId'] = $planNoPlanId;
		$param['pageNum'] = 1;
		$param['pageSize'] = 1;
		$selectPlanResp = $this->dao->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$resp->msg = $selectPlanResp->msg;
			return $resp;
		}
		$list =  $selectPlanResp->data['list'];
		if (is_array($list) && count($list) > 0) {
			$resp->data = $list[0];
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectPlan($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectPlanResp = $this->dao->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$resp->msg = $selectPlanResp->msg;
			return $resp;
		}
		$resp->data = $selectPlanResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}