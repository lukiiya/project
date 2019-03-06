<?php
namespace controller\portal;
use controller\Base;

class Focus extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $focusService;
	private $userService;
	private $planService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->focusService = requireService("Focus");
		$this->userService = requireService("User");
		$this->planService = requireService("Plan");
	}

	//添加关注
	public function createFocus(){
		//用户是否登入
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userNo = trim($this->common->getParam("userNo", ''));//被关注用户号码
		if (empty($userNo)) {
			$this->resp->msg = "userNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByNoResp = $this->userService->selectUserByNo($userNo);
		if ($selectUserByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$focusUserInfo = $selectUserByNoResp->data;
		if (empty($focusUserInfo)) {
			$this->resp->msg = "关注的用户不存在";
			$this->jsonView->out($this->resp);
		}
		$userInfo = $this->loginUserInfo;
		$userId = $userInfo['userId'];
		$focusUserId = $focusUserInfo['userId'];
		//自己不能关注自己
		if ($userId  == $focusUserId) {
			$this->resp->msg = "自己不能关注自己";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['focusUserId'] = $focusUserId;
		$selectFocusResp = $this->focusService->selectFocus($param);
		if ($selectFocusResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$focusList = $selectFocusResp->data['list'];
		$param = array();
		$param['status'] = 2;//1=未关注, 2=已关注
		if (is_array($focusList) && count($focusList) > 0) {
			$focusData = $focusList[0];
			$status = (int)$focusData['status'];
			if ($status == 0 || $status == 1) {
				//更新用户关注
				$param['focusId'] = $focusData['focusId'];
				$updateFocusResp = $this->focusService->updateFocus($param);
				if ($updateFocusResp->errCode != 0) {
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
			}
		} else {
			//插入用户关注表
			$param['userId'] = (int)$userInfo['userId'];
			$param['nickName'] = trim($userInfo['nickName']);
			$param['realName'] = trim($userInfo['realName']);
			$param['focusUserId'] = (int)$focusUserInfo['userId'];
			$param['focusNickName'] = trim($focusUserInfo['nickName']);
			$param['focusRealName'] = trim($focusUserInfo['realName']);
			$insertFocusResp = $this->focusService->insertFocus($param);
			if ($insertFocusResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//取消关注
	public function cancelFocus() {
		//用户是否登入
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userNo = trim($this->common->getParam("userNo", ''));//被关注用户号码
		if (empty($userNo)) {
			$this->resp->msg = "userNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByNoResp = $this->userService->selectUserByNo($userNo);
		if ($selectUserByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$focusUserInfo = $selectUserByNoResp->data;
		if (empty($focusUserInfo)) {
			$this->resp->msg = "关注的用户不存在";
			$this->jsonView->out($this->resp);
		}
		$userInfo = $this->loginUserInfo;
		$userId = (int)$userInfo['userId'];
		$focusUserId = (int)$focusUserInfo['userId'];
		$param = array();
		$param['userId'] = $userId;
		$param['focusUserId'] = $focusUserId;
		//是否关注过
		$selectFocusResp = $this->focusService->selectFocus($param);
		if ($selectFocusResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$focusData = $selectFocusResp->data['list'][0];
		if (empty($focusData) || $focusData['status'] != 2) {
			$this->resp->msg = "未关注用户";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['focusId'] = (int)$focusData['focusId'];
		$param['status'] = 1;
		$updateFocusResp = $this->focusService->updateFocus($param);
		if ($updateFocusResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//活跃关注(用在"点击红点取消")
	public function activeFocus(){
		//用户是否登入
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userNo = trim($this->common->getParam("userNo", ''));
		if (empty($userNo)) {
			$this->resp->msg = "userNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByNoResp = $this->userService->selectUserByNo($userNo);
		if ($selectUserByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$focusUserInfo = $selectUserByNoResp->data;
		if (empty($focusUserInfo)) {
			$this->resp->msg = "用户不存在";
			$this->jsonView->out($this->resp);
		}
		$userInfo = $this->loginUserInfo;
		$userId = $userInfo['userId'];
		$focusUserId = $focusUserInfo['userId'];
		//自己不能关注自己
		if ($userId  == $focusUserId) {
			$this->resp->msg = "自己不能关注自己";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $focusUserId;
		$param['publish'] = 1;
		$param['planStatus'] = 1;//方案状态：1=未结束, 2=已结束
		$param['pageNum'] = 1;
		$param['pageSize'] = 10000;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$this->resp->msg = "查询用户方案异常";
			$this->jsonView->out($this->resp);
		}
		$planList = $selectPlanResp->data['list'];
		$focusUserRecentPlanId = array();
		foreach ($planList as $plan) {
			$planId = (int)$plan['planId'];
			if ($planId >= 0) {
				$focusUserRecentPlanId[] = $planId;
			}
		}
		if (count($focusUserRecentPlanId) <= 0) {
			$this->resp->msg = "用户不存在未结束的方案";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['focusUserId'] = $focusUserId;
		$selectFocusResp = $this->focusService->selectFocus($param);
		if ($selectFocusResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$focusList = $selectFocusResp->data['list'];
		$param = array();
		$param['focusUserRecentPlanId'] = $focusUserRecentPlanId;
		if (is_array($focusList) && count($focusList) > 0) {
			$focusData = $focusList[0];
			$param['focusId'] = $focusData['focusId'];
			$updateFocusResp = $this->focusService->updateFocus($param);
			if ($updateFocusResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		} else {
			//插入用户关注表
			$param['userId'] = (int)$userInfo['userId'];
			$param['nickName'] = trim($userInfo['nickName']);
			$param['realName'] = trim($userInfo['realName']);
			$param['focusUserId'] = (int)$focusUserInfo['userId'];
			$param['focusNickName'] = trim($focusUserInfo['nickName']);
			$param['focusRealName'] = trim($focusUserInfo['realName']);
			$param['status'] = 1;//1=未关注, 2=已关注
			$insertFocusResp = $this->focusService->insertFocus($param);
			if ($insertFocusResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
	
	//我的关注列表
	public function focusList() {
		//用户是否登入
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];			//用户id
		$pageNum = (int)$this->common->getParam("pageNum", 0);	//页码数
		$pageSize = (int)$this->common->getParam("pageSize", 0);	//每页显示数
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		//获取关注的id数组
		$param = array();
		$param['userId'] = $userId;
		$param['status'] = 2;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectFocusResp = $this->focusService->selectFocusCache($param);
		$focusData = $selectFocusResp->data;
		$focusList = $focusData['list'];
		$focusList = $this->commonService->setUserPlanCountCache($focusList, 'focusUserId');
		$focusList = $this->commonService->setUserCache($focusList, 'focusUserId');
        $data = array("totalCount" => 0, 'list' => array());		//组装返回数据
		$data['totalCount'] = $focusData['totalCount'];
		foreach ($focusList as $focus){
			$focusUser = $focus['user'];
			$focusInfo = array();
			$focusInfo['userNo'] = $focusUser['userNo'];//被关注者id userId+12345678
			$focusInfo['tag'] = trim($focusUser['tag']);
			$focusInfo['nickName'] = trim($focusUser['nickName']);
			$focusInfo['realName'] = trim($focusUser['realName']);
			$focusInfo['profileImg'] = trim($focusUser['profileImg']);
			$focusInfo['personalImg'] = trim($focusUser['personalImg']);
			$focusInfo['continueWin'] = (int)$focusUser['continueWin'];
			$focusInfo['winRate'] = (int)$focusUser['winRate'];
			$focusInfo['planCount'] = (int)$focus['planCount'];
			$focusInfo['status'] = (int)$focus['status'];
			$focusInfo['userRight'] = $focusUser['userRight'];
			$data['list'][] = $focusInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}