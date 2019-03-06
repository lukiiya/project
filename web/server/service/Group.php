<?php
namespace service;
class Group extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Group");
	}

	public function insertGroup($param) {
		$resp = requireModule("Resp");
		$insertGroupResp = $this->dao->insertGroup($param);
		if ($insertGroupResp->errCode != 0) {
			$resp->msg = $insertGroupResp->msg;
			return $resp;	
		}
		$resp->data = $insertGroupResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateGroup($param) {
		$resp = requireModule("Resp");
		$updateGroupResp = $this->dao->updateGroup($param);
		if ($updateGroupResp->errCode != 0) {
			$resp->msg = $updateGroupResp->msg;
			return $resp;
		}
		$resp->data = $updateGroupResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectGroupById($groupId) {
		$resp = requireModule('Resp');
		$groupId = (int)$groupId;
		if ($groupId <= 0) {
			$resp->msg = 'groupId有误';
			return $resp;
		}
		$selectGroupByIdResp = $this->dao->selectGroupById($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$resp->msg = $selectGroupByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectGroupByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectGroupByNo($groupNo) {
		$resp = requireModule('Resp');
		$groupNo = trim($groupNo);
		if (empty($groupNo)) {
			$resp->msg = 'groupNo有误';
			return $resp;
		}
		$groupNoArr = $this->common->decodeNo($groupNo);
		$groupNoUserId = (int)$groupNoArr['userId'];
		$groupNoId = (int)$groupNoArr['id'];
		if (empty($groupNoArr) || $groupNoUserId <= 0 || $groupNoId <= 0 || $groupNoUserId-12345678 != $groupNoId) {
			$resp->msg = 'groupNo参数有误';
			return $resp;
		}
		$selectGroupByIdResp = $this->dao->selectGroupById($groupNoId);
		if ($selectGroupByIdResp->errCode != 0) {
			$resp->msg = $selectGroupByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectGroupByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectGroup($param) {
		$resp = requireModule('Resp');
		$selectGroupResp = $this->dao->selectGroup($param);
		if ($selectGroupResp->errCode != 0) {
			$resp->msg = $selectGroupResp->msg;
			return $resp;
		}
		$resp->data = $selectGroupResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}