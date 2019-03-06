<?php
namespace controller\portal;
use controller\Base;

class Guide extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $guideService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->guideService = requireService("Guide");
	}

	public function createGuide() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$accessUserId = (int)$this->loginUserInfo['userId'];
		$accessNickName = trim($this->loginUserInfo['nickName']);
		$accessRealName = trim($this->loginUserInfo['realName']);
		$guideUserNo = trim($this->common->getParam("guideUserNo", ''));
		$accessPage = trim($this->common->getParam("accessPage", ''));
		if (empty($guideUserNo)) {
			$this->resp->msg = "用户参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($accessPage)) {
			$this->resp->msg = "页面参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByNoResp = $this->userService->selectUserByNo($guideUserNo);
		if ($selectUserByNoResp->errCode != 0) {
			$this->resp->msg = "用户查询异常";
			$this->jsonView->out($this->resp);
		}
		$guideData = $selectUserByNoResp->data;
		$guideUserId = (int)$guideData['userId'];
		$guideNickName = trim($guideData['nickName']);
		$guideRealName = trim($guideData['realName']);
		$param = array();
		$param['guideUserId'] = $guideUserId;
		$param['accessUserId'] = $accessUserId;
		$param['accessPage'] = $accessPage;
		$selectGuideResp = $this->guideService->selectGuide($param);
		if ($selectGuideResp->errCode != 0) {
			$this->resp->msg = "用户查询异常";
			$this->jsonView->out($this->resp);
		}
		$guideList = $selectGuideResp->data['list'];
		if (!empty($guideList) && count($guideList) > 0) {
			$guideId = (int)$guideList[0]['guideId'];
			$accessCount = (int)$guideList[0]['accessCount'];
			$param = array();
			$param['guideId'] = $guideId;
			$param['accessCount'] = $accessCount + 1;
			$updateGuideResp = $this->guideService->updateGuide($param);
			if ($updateGuideResp->errCode != 0) {
				$this->resp->msg = "更新引导失败";
				$this->jsonView->out($this->resp);
			}
		} else {
			$param = array();
			$param['guideUserId'] = $guideUserId;
			$param['guideNickName'] = $guideNickName;
			$param['guideRealName'] = $guideRealName;
			$param['accessUserId'] = $accessUserId;
			$param['accessNickName'] = $accessNickName;
			$param['accessRealName'] = $accessRealName;
			$param['accessPage'] = $accessPage;
			$param['accessCount'] = 1;
			$insertGuideResp = $this->guideService->insertGuide($param);
			if ($insertGuideResp->errCode != 0) {
				$this->resp->msg = "添加引导失败";
				$this->jsonView->out($this->resp);
			}
			$guideId = (int)$insertGuideResp->data;
			if ($guideId <= 0) {
				$this->resp->msg = "添加引导失败";
				$this->jsonView->out($this->resp);
			}
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}