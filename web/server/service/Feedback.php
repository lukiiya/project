<?php
namespace service;
class Feedback extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Feedback");
	}

	public function insertFeedback($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertFeedbackResp = $this->dao->insertFeedback($param);
		if ($insertFeedbackResp->errCode != 0) {
			$resp->msg = $insertFeedbackResp->msg;
			return $resp;	
		}
		$resp->data = $insertFeedbackResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFeedbackById($feedbackId) {
		$resp = requireModule('Resp');
		$feedbackId = (int)$feedbackId;
		if ($feedbackId <= 0) {
			$resp->msg = 'feedbackId有误';
			return $resp;
		}
		$selectFeedbackByIdResp = $this->dao->selectFeedbackById($feedbackId);
		if ($selectFeedbackByIdResp->errCode != 0) {
			$resp->msg = $selectFeedbackByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectFeedbackByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFeedback($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectFeedbackResp = $this->dao->selectFeedback($param);
		if ($selectFeedbackResp->errCode != 0) {
			$resp->msg = $selectFeedbackResp->msg;
			return $resp;
		}
		$resp->data = $selectFeedbackResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}