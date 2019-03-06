<?php
namespace controller\admin;
use controller\Base;

class Activity extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $activityService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->activityService = requireService("Activity");
	}

	public function activityList() {
		$activityId = (int)$this->common->getParam("activityId", 0);
		$activityName = trim($this->common->getParam("activityName", ''));
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
		$param['activityId'] = $activityId;
		$param['activityName'] = $activityName;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectActivityResp = $this->activityService->selectActivity($param);
		if ($selectActivityResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityData = $selectActivityResp->data;
		$this->resp->data = $activityData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function activityHongBaoList() {
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
		$selectActivityHongBaoResp = $this->activityService->selectActivityHongBao($param);
		if ($selectActivityHongBaoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityHongBaoData = $selectActivityHongBaoResp->data;
		$this->resp->data = $activityHongBaoData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    public function activityTurnplateList() {
        $userName = trim($this->common->getParam("userName", ''));
        $orderId = (int)$this->common->getParam("orderId", '');
        $prizeName = trim($this->common->getParam("prizeName", ''));
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
		$param['prizeName'] = $prizeName;
		$param['orderId'] = $orderId;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectActivityTurnplateResp = $this->activityService->selectActivityTurnplate($param);
        if ($selectActivityTurnplateResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityTurnplateData = $selectActivityTurnplateResp->data;
        $totalCount = (int)$activityTurnplateData['totalCount'];
        $totalAmount = (int)$activityTurnplateData['totalAmount'];
        $activityTurnplateList = $activityTurnplateData['list'];
        $data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, 'list' => array());
        foreach ($activityTurnplateList as $activityTurnplate) {
            $activityTurnplateInfo = array();
            $activityTurnplateInfo['nickName'] = trim($activityTurnplate['nickName']);
            $activityTurnplateInfo['realName'] = trim($activityTurnplate['realName']);
            $activityTurnplateInfo['orderId'] = trim($activityTurnplate['orderId']);
            $activityTurnplateInfo['code'] = trim($activityTurnplate['code']);
            $activityTurnplateInfo['prizeName'] = trim($activityTurnplate['prizeName']);
            $activityTurnplateInfo['presentAmount'] = (int)$activityTurnplate['presentAmount'];
            $activityTurnplateInfo['createTime'] = trim($activityTurnplate['createTime']);
            $data['list'][] = $activityTurnplateInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	public function activityChargeList() {
		$userName = trim($this->common->getParam("userName", ''));
		$orderId = (int)$this->common->getParam("orderId", '');
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
		$param['orderId'] = $orderId;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectActivityChargeResp = $this->activityService->selectActivityCharge($param);
		if ($selectActivityChargeResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityChargeData = $selectActivityChargeResp->data;
		$totalCount = (int)$activityChargeData['totalCount'];
		$totalAmount = (int)$activityChargeData['totalAmount'];
		$totalPresentAmount = (int)$activityChargeData['totalPresentAmount'];
		$activityChargeList = $activityChargeData['list'];
		$data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, "totalPresentAmount" => $totalPresentAmount, 'list' => array());
		foreach ($activityChargeList as $activityCharge) {
			$activityChargeInfo = array();
			$activityChargeInfo['nickName'] = trim($activityCharge['nickName']);
			$activityChargeInfo['realName'] = trim($activityCharge['realName']);
			$activityChargeInfo['orderId'] = trim($activityCharge['orderId']);
			$activityChargeInfo['amount'] = trim($activityCharge['amount']);
			$activityChargeInfo['presentAmount'] = (int)$activityCharge['presentAmount'];
			$activityChargeInfo['createTime'] = trim($activityCharge['createTime']);
			$data['list'][] = $activityChargeInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function activityHongBao2017ChunJieList() {
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
		$selectActivityHongBao2017ChunJieResp = $this->activityService->selectActivityHongBao2017ChunJie($param);
		if ($selectActivityHongBao2017ChunJieResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityHongBao2017ChunJieData = $selectActivityHongBao2017ChunJieResp->data;
		$this->resp->data = $activityHongBao2017ChunJieData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function activityConfederationsCupUserList() {
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
		$selectActivityConfederationsCupUserResp = $this->activityService->selectActivityConfederationsCupUser($param);
		if ($selectActivityConfederationsCupUserResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityConfederationsCupUserData = $selectActivityConfederationsCupUserResp->data;
		$this->resp->data = $activityConfederationsCupUserData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function activityConfederationsCupList() {
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
		$selectActivityConfederationsCupResp = $this->activityService->selectActivityConfederationsCup($param);
		if ($selectActivityConfederationsCupResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityConfederationsCupData = $selectActivityConfederationsCupResp->data;
		$this->resp->data = $activityConfederationsCupData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function activityAttachPrizeList() {
		$userName = trim($this->common->getParam("userName", ''));
		$issue = trim($this->common->getParam("issue", ''));
		$orderId = (int)$this->common->getParam("orderId", '');
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
		$param['issue'] = $issue;
		$param['orderId'] = $orderId;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectActivityAttachPrizeResp = $this->activityService->selectActivityAttachPrize($param);
		if ($selectActivityAttachPrizeResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$activityAttachPrizeData = $selectActivityAttachPrizeResp->data;
		$totalCount = (int)$activityAttachPrizeData['totalCount'];
		$totalAttachPrizeAmount = (int)$activityAttachPrizeData['totalAttachPrizeAmount'];
		$activityActivityAttachList = $activityAttachPrizeData['list'];
		$data = array("totalCount" => $totalCount, "totalAttachPrizeAmount" => $totalAttachPrizeAmount, 'list' => array());
		foreach ($activityActivityAttachList as $activityActivityAttach) {
			$activityActivityAttachInfo = array();
			$activityActivityAttachInfo['nickName'] = trim($activityActivityAttach['nickName']);
			$activityActivityAttachInfo['realName'] = trim($activityActivityAttach['realName']);
			$activityActivityAttachInfo['issue'] = trim($activityActivityAttach['issue']);
			$activityActivityAttachInfo['orderId'] = trim($activityActivityAttach['orderId']);
			$activityActivityAttachInfo['attachPrizeAmount'] = trim($activityActivityAttach['attachPrizeAmount']);
			$activityActivityAttachInfo['createTime'] = trim($activityActivityAttach['createTime']);
			$data['list'][] = $activityActivityAttachInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}