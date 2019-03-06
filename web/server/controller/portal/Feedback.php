<?php
namespace controller\portal;
use controller\Base;

class Feedback extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $feedbackService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->feedbackService = requireService("Feedback");
	}

	//创建充值订单
	public function createFeedback() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		$content = trim($this->common->getParam("content", ''));
		if (empty($content)) {
			$this->resp->msg = "反馈内容不能为空";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['content'] = $content;
		$insertFeedbackResp = $this->feedbackService->insertFeedback($param);
		if ($insertFeedbackResp->errCode != 0) {
			$this->resp->msg = "添加反馈失败";
			$this->jsonView->out($this->resp);
		}
		$feedbackId = (int)$insertFeedbackResp->data;
		if ($feedbackId <= 0) {
			$this->resp->msg = "添加反馈失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}