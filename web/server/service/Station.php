<?php
namespace service;
class Station extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Station");
	}

	public function insertStationDeposit($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = (int)$param['userId'];
		$amount = (int)$param['amount'];
		$date = trim($param['date']);
		if ($userId <= 0 || $amount <= 0 || empty($date)) {
			$resp->msg = "用户Id和金额和日期不能为空";
			return $resp;
		}
		$insertStationDepositResp = $this->dao->insertStationDeposit($param);
		if ($insertStationDepositResp->errCode != 0) {
			$resp->msg = $insertStationDepositResp->msg;
			return $resp;
		}
		$resp->data = $insertStationDepositResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function updateStationDeposit($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $depositId = (int)$param['depositId'];
        if ($depositId <= 0) {
            $resp->msg = "depositId不能为空";
            return $resp;
        }
        $updateStationDepositResp = $this->dao->updateStationDeposit($param);
        if ($updateStationDepositResp->errCode != 0) {
            $resp->msg = $updateStationDepositResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	public function deleteStationDeposit($depositId) {
		$resp = requireModule("Resp");
		$depositId = (int)$depositId;
		if ($depositId <= 0) {
			$resp->msg = "depositId不能为空";
			return $resp;
		}
		$deleteStationDepositResp = $this->dao->deleteStationDeposit($depositId);
		if ($deleteStationDepositResp->errCode != 0) {
			$resp->msg = $deleteStationDepositResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStationDepositById($depositId) {
		$resp = requireModule('Resp');
		$depositId = (int)$depositId;
		if ($depositId <= 0) {
			$resp->msg = "depositId不能为空";
			return $resp;
		}
		$selectStationDepositByIdResp = $this->dao->selectStationDepositById($depositId);
		if ($selectStationDepositByIdResp->errCode != 0) {
			$resp->msg = $selectStationDepositByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectStationDepositByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStationDeposit($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
        $selectStationDepositResp = $this->dao->selectStationDeposit($param);
		if ($selectStationDepositResp->errCode != 0) {
			$resp->msg = $selectStationDepositResp->msg;
			return $resp;
		}
		$resp->data = $selectStationDepositResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}