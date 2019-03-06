<?php
namespace service;
class Resource extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Resource");
	}

	public function insertResource($param) {
		$resp = requireModule("Resp");
		$insertResourceResp = $this->dao->insertResource($param);
		if ($insertResourceResp->errCode != 0) {
			$resp->msg = $insertResourceResp->msg;
			return $resp;	
		}
		$resp->data = $insertResourceResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectResourceById($resourceId) {
		$resp = requireModule('Resp');
		$resourceId = (int)$resourceId;
		if ($resourceId <= 0) {
			$resp->msg = 'resourceId有误';
			return $resp;
		}
		$selectResourceByIdResp = $this->dao->selectResourceById($resourceId);
		if ($selectResourceByIdResp->errCode != 0) {
			$resp->msg = $selectResourceByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectResourceByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectResource($param) {
		$resp = requireModule('Resp');
		$selectResourceResp = $this->dao->selectResource($param);
		if ($selectResourceResp->errCode != 0) {
			$resp->msg = $selectResourceResp->msg;
			return $resp;
		}
		$resp->data = $selectResourceResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}