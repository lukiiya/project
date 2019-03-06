<?php
namespace service;
class Jxzp extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Jxzp");
	}

	public function insertJxzp($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertJxzpResp = $this->dao->insertJxzp($param);
		if ($insertJxzpResp->errCode != 0) {
			$resp->msg = $insertJxzpResp->msg;
			return $resp;	
		}
		$resp->data = $insertJxzpResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateJxzp($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$jxzpId = (int)$param['jxzpId'];
		if ($jxzpId <= 0) {
			$resp->msg = "jxzpId不能为空";
			return $resp;	
		}
		$updateJxzpResp = $this->dao->updateJxzp($param);
		if ($updateJxzpResp->errCode != 0) {
			$resp->msg = $updateJxzpResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectJxzpById($jxzpId) {
		$resp = requireModule('Resp');
		$jxzpId = (int)$jxzpId;
		if ($jxzpId <= 0) {
			$resp->msg = "jxzpId不能为空";
			return $resp;
		}
		$selectJxzpByIdResp = $this->dao->selectJxzpById($jxzpId);
		if ($selectJxzpByIdResp->errCode != 0) {
			$resp->msg = $selectJxzpByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectJxzpByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectJxzp($param) {
		$resp = requireModule('Resp');
		$selectJxzpResp = $this->dao->selectJxzp($param);
		if ($selectJxzpResp->errCode != 0) {
			$resp->msg = $selectJxzpResp->msg;
			return $resp;
		}
		$resp->data = $selectJxzpResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectJxzpGroupPrizeStatus() {
		$resp = requireModule('Resp');
		$selectJxzpGroupPrizeStatusResp = $this->dao->selectJxzpGroupPrizeStatus();
		if ($selectJxzpGroupPrizeStatusResp->errCode != 0) {
			$resp->msg = $selectJxzpGroupPrizeStatusResp->msg;
			return $resp;
		}
		$resp->data = $selectJxzpGroupPrizeStatusResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}