<?php
namespace controller\admin;
use controller\Base;

class Station extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $groupService;
	private $stationService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->groupService = requireService("Group");
		$this->stationService = requireService("Station");
	}

    public function createStationDeposit() {
        $userId = (int)$this->common->getParam("userId", 0);
        $date = trim($this->common->getParam("date", 0));
        $amount = (int)$this->common->getParam("amount", 0);
        if ($userId <= 0) {
            $this->resp->msg = "userId参数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($date)) {
            $this->resp->msg = "date参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($amount <= 0) {
            $this->resp->msg = "amount参数有误";
            $this->jsonView->out($this->resp);
        }
        //是否是出票店长
        $selectGroupByIdResp = $this->groupService->selectGroupById(8);
        if ($selectGroupByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $relateId = $selectGroupByIdResp->data['relateId'];
        $relateId = explode(',', $relateId);
        if (empty($relateId) || !in_array($userId, $relateId)) {
            $this->resp->msg = "该用户不是出票店长";
            $this->jsonView->out($this->resp);
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $this->resp->msg = "用户信息错误";
            $this->jsonView->out($this->resp);
        }
        $nickName = trim($user['nickName']);
        $realName = trim($user['realName']);
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['date'] = $date;
        $param['amount'] = $amount;
        $insertStationDepositResp = $this->stationService->insertStationDeposit($param);
        if ($insertStationDepositResp->errCode != 0) {
            $this->resp->msg = "添加店长存款错误";
            $this->jsonView->out($this->resp);
        }
        $depositId = (int)$insertStationDepositResp->data;
        if ($depositId <= 0) {
            $this->resp->msg = "添加店长存款错误";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function modifyStationDeposit() {
        $depositId = (int)$this->common->getParam("depositId", 0);
        $userId = (int)$this->common->getParam("userId", 0);
        $date = trim($this->common->getParam("date", 0));
        $amount = (int)$this->common->getParam("amount", 0);
        if ($depositId <= 0) {
            $this->resp->msg = "depositId参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($userId <= 0) {
            $this->resp->msg = "userId参数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($date)) {
            $this->resp->msg = "date参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($amount <= 0) {
            $this->resp->msg = "amount参数有误";
            $this->jsonView->out($this->resp);
        }
        //是否是出票店长
        $selectGroupByIdResp = $this->groupService->selectGroupById(8);
        if ($selectGroupByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $relateId = $selectGroupByIdResp->data['relateId'];
        $relateId = explode(',', $relateId);
        if (empty($relateId) || !in_array($userId, $relateId)) {
            $this->resp->msg = "该用户不是出票店长";
            $this->jsonView->out($this->resp);
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $this->resp->msg = "用户信息错误";
            $this->jsonView->out($this->resp);
        }
        $nickName = trim($user['nickName']);
        $realName = trim($user['realName']);
        $param = array();
        $param['depositId'] = $depositId;
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['date'] = $date;
        $param['amount'] = $amount;
        $updateStationDepositResp = $this->stationService->updateStationDeposit($param);
        if ($updateStationDepositResp->errCode != 0) {
            $this->resp->msg = "修改店长存款错误";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function deleteStationDeposit() {
        $depositId = (int)$this->common->getParam("depositId", 0);
        if ($depositId <= 0) {
            $this->resp->msg = "depositId参数有误";
            $this->jsonView->out($this->resp);
        }
        $deleteStationDepositResp = $this->stationService->deleteStationDeposit($depositId);
        if ($deleteStationDepositResp->errCode != 0) {
            $this->resp->msg = "删除站长存款失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function stationDepositInfo() {
        $depositId = (int)$this->common->getParam("depositId", 0);
        if ($depositId <= 0) {
            $this->resp->msg = "depositId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectStationDepositByIdResp = $this->stationService->selectStationDepositById($depositId);
        if ($selectStationDepositByIdResp->errCode != 0) {
            $this->resp->msg = "站长存款查询异常";
            $this->jsonView->out($this->resp);
        }
        $data = $selectStationDepositByIdResp->data;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function stationDepositList() {
        $userName = trim($this->common->getParam("userName", ''));
        $beginTime = trim($this->common->getParam("beginTime", ''));
        $endTime = trim($this->common->getParam("endTime", ''));
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
        $param['beginTime'] = $beginTime;
        $param['endTime'] = $endTime;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectStationDepositResp = $this->stationService->selectStationDeposit($param);
        if ($selectStationDepositResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $stationDepositData = $selectStationDepositResp->data;
        $this->resp->data = $stationDepositData;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}