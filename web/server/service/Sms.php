<?php
namespace service;
class Sms extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Sms");
	}

	public function replaceSmsCode($param) {
		$resp = requireModule("Resp");
		$replaceSmsCodeResp = $this->dao->replaceSmsCode($param);
		if ($replaceSmsCodeResp->errCode != 0) {
			$resp->msg = $replaceSmsCodeResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function insertSmsCodeCount($param) {
		$resp = requireModule("Resp");
		$insertSmsCodeCountResp = $this->dao->insertSmsCodeCount($param);
		if ($insertSmsCodeCountResp->errCode != 0) {
			$resp->msg = $insertSmsCodeCountResp->msg;
			return $resp;
		}
		$resp->data = $insertSmsCodeCountResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateSmsCodeCount($param) {
		$resp = requireModule("Resp");
		$updateSmsCodeCountResp = $this->dao->updateSmsCodeCount($param);
		if ($updateSmsCodeCountResp->errCode != 0) {
			$resp->msg = $updateSmsCodeCountResp->msg;
			return $resp;
		}
		$resp->data = $updateSmsCodeCountResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectSmsCode($param) {
		$resp = requireModule('Resp');
		$selectSmsCodeResp = $this->dao->selectSmsCode($param);
		if ($selectSmsCodeResp->errCode != 0) {
			$resp->msg = $selectSmsCodeResp->msg;
			return $resp;
		}
		$resp->data = $selectSmsCodeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectSmsCodeCount($param) {
		$resp = requireModule('Resp');
		$selectSmsCodeCountResp = $this->dao->selectSmsCodeCount($param);
		if ($selectSmsCodeCountResp->errCode != 0) {
			$resp->msg = $selectSmsCodeCountResp->msg;
			return $resp;
		}
		$resp->data = $selectSmsCodeCountResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}