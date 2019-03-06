<?php
namespace service;
class Focus extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Focus");
	}

	//插入关注信息
	public function insertFocus($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = trim($param['userId']);
		$focusUserId = trim($param['focusUserId']);
		if ($userId <= 0 || $focusUserId <= 0) {
			$resp->msg = "用户Id不能为空";
			return $resp;
		}
		$insertFocusResp = $this->dao->insertFocus($param);
		if ($insertFocusResp->errCode != 0) {
			$resp->msg = $insertFocusResp->msg;
			return $resp;
		}
		$resp->data = $insertFocusResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	//更新关注
	public function updateFocus($param) {
		$resp = requireModule("Resp");
		$focusId = trim($param['focusId']);
		if ($focusId == '') {
			$resp->msg = "关注Id不能为空";
			return $resp;
		}
		$updateFocusResp = $this->dao->updateFocus($param);
		if ($updateFocusResp->errCode != 0) {
			$resp->msg = $updateFocusResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
	
	//查询关注信息
	public function selectFocus($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectFocusResp = $this->dao->selectFocus($param);
		if ($selectFocusResp->errCode != 0) {
			$resp->msg = $selectFocusResp->msg;
			return $resp;
		}
		$resp->data = $selectFocusResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}