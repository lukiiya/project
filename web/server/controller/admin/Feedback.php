<?php
namespace controller\admin;
use controller\Base;

class Feedback extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $feedbackService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->feedbackService = requireService("Feedback");
	}

	//得到反馈列表
	public function feedbackList() {
		$userName = trim($this->common->getParam("userName", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$param = array();
		$param['userName'] = $userName;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectFeedbackResp = $this->feedbackService->selectFeedback($param);
		if ($selectFeedbackResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$feedbackData = $selectFeedbackResp->data;
		$this->resp->data = $feedbackData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}