<?php
namespace service;
class Statistics extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Statistics");
	}

	public function selectStatisticsDate($param) {
		$resp = requireModule('Resp');
		$selectStatisticsDateResp = $this->dao->selectStatisticsDate($param);
		if ($selectStatisticsDateResp->errCode != 0) {
			$resp->msg = $selectStatisticsDateResp->msg;
			return $resp;
		}
		$resp->data = $selectStatisticsDateResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStatisticsUserDate($param) {
		$resp = requireModule('Resp');
		$selectStatisticsUserDateResp = $this->dao->selectStatisticsUserDate($param);
		if ($selectStatisticsUserDateResp->errCode != 0) {
			$resp->msg = $selectStatisticsUserDateResp->msg;
			return $resp;
		}
		$resp->data = $selectStatisticsUserDateResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStatisticsAmount($param) {
		$resp = requireModule('Resp');
		$selectStatisticsAmountResp = $this->dao->selectStatisticsAmount($param);
		if ($selectStatisticsAmountResp->errCode != 0) {
			$resp->msg = $selectStatisticsAmountResp->msg;
			return $resp;
		}
		$resp->data = $selectStatisticsAmountResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStatisticsConsumeUser($param) {
		$resp = requireModule('Resp');
		$selectStatisticsConsumeUserResp = $this->dao->selectStatisticsConsumeUser($param);
		if ($selectStatisticsConsumeUserResp->errCode != 0) {
			$resp->msg = $selectStatisticsConsumeUserResp->msg;
			return $resp;
		}
		$resp->data = $selectStatisticsConsumeUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectStatisticsCashConsumeUser($param) {
		$resp = requireModule('Resp');
		$selectStatisticsCashConsumeUserResp = $this->dao->selectStatisticsCashConsumeUser($param);
		if ($selectStatisticsCashConsumeUserResp->errCode != 0) {
			$resp->msg = $selectStatisticsCashConsumeUserResp->msg;
			return $resp;
		}
		$resp->data = $selectStatisticsCashConsumeUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}