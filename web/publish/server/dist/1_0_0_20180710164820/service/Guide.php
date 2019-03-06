<?php
namespace service;
class Guide extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Guide");
	}

	public function insertGuide($param) {
		$resp = requireModule("Resp");
		$insertGuideResp = $this->dao->insertGuide($param);
		if ($insertGuideResp->errCode != 0) {
			$resp->msg = $insertGuideResp->msg;
			return $resp;	
		}
		$resp->data = $insertGuideResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateGuide($param) {
		$resp = requireModule("Resp");
		$updateGuideResp = $this->dao->updateGuide($param);
		if ($updateGuideResp->errCode != 0) {
			$resp->msg = $updateGuideResp->msg;
			return $resp;
		}
		$resp->data = $updateGuideResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectGuideById($guideId) {
		$resp = requireModule('Resp');
		$guideId = (int)$guideId;
		if ($guideId <= 0) {
			$resp->msg = 'guideId有误';
			return $resp;
		}
		$selectGuideByIdResp = $this->dao->selectGuideById($guideId);
		if ($selectGuideByIdResp->errCode != 0) {
			$resp->msg = $selectGuideByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectGuideByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectGuide($param) {
		$resp = requireModule('Resp');
		$selectGuideResp = $this->dao->selectGuide($param);
		if ($selectGuideResp->errCode != 0) {
			$resp->msg = $selectGuideResp->msg;
			return $resp;
		}
		$resp->data = $selectGuideResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}