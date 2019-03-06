<?php
namespace service;
class Combo extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Combo");
	}

	public function insertCombo($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$amount = (int)$param['amount'];
		if ($amount < 0) {
			$resp->msg = "amount不能为负数";
			return $resp;
		}
		$insertComboResp = $this->dao->insertCombo($param);
		if ($insertComboResp->errCode != 0) {
			$resp->msg = $insertComboResp->msg;
			return $resp;	
		}
		$resp->data = $insertComboResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateCombo($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$comboId = (int)$param['comboId'];
		if ($comboId <= 0) {
			$resp->msg = "comboId不能为空";
			return $resp;	
		}
		$updateComboResp = $this->dao->updateCombo($param);
		if ($updateComboResp->errCode != 0) {
			$resp->msg = $updateComboResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectComboById($comboId) {
		$resp = requireModule('Resp');
		$comboId = (int)$comboId;
		if ($comboId <= 0) {
			$resp->msg = 'comboId有误';
			return $resp;
		}
		$selectComboByIdResp = $this->dao->selectComboById($comboId);
		if ($selectComboByIdResp->errCode != 0) {
			$resp->msg = $selectComboByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectComboByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectComboByNo($comboNo) {
		$resp = requireModule('Resp');
		$comboNo = trim($comboNo);
		if (empty($comboNo)) {
			$resp->msg = 'comboNo有误';
			return $resp;
		}
		$comboNoArr = $this->common->decodeNo($comboNo);
		$comboNoUserId = (int)$comboNoArr['userId'];
		$comboNoId = (int)$comboNoArr['id'];
		if (empty($comboNoArr) || $comboNoUserId <= 0 || $comboNoId <= 0 || ($comboNoUserId-12345678) != $comboNoId) {
			$resp->msg = 'comboNo参数有误';
			return $resp;
		}
		$selectComboByIdResp = $this->dao->selectComboById($comboNoId);
		if ($selectComboByIdResp->errCode != 0) {
			$resp->msg = $selectComboByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectComboByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectCombo($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectComboResp = $this->dao->selectCombo($param);
		if ($selectComboResp->errCode != 0) {
			$resp->msg = $selectComboResp->msg;
			return $resp;
		}
		$resp->data = $selectComboResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}