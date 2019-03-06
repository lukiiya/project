<?php
namespace service;
class Weixin extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Weixin");
	}

	public function updateWeixinKey($param) {
		$resp = requireModule("Resp");
		$updateWeixinKeyResp = $this->dao->updateWeixinKey($param);
		if ($updateWeixinKeyResp->errCode != 0) {
			$resp->msg = $updateWeixinKeyResp->msg;
			return $resp;
		}
		$resp->data = $updateWeixinKeyResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectWeixinKeyById($keyId) {
		$resp = requireModule('Resp');
		$keyId = (int)$keyId;
		if ($keyId <= 0) {
			$resp->msg = 'keyId有误';
			return $resp;
		}
		$selectWeixinKeyByIdResp = $this->dao->selectWeixinKeyById($keyId);
		if ($selectWeixinKeyByIdResp->errCode != 0) {
			$resp->msg = $selectWeixinKeyByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectWeixinKeyByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}