<?php
namespace controller\admin;
use controller\Base;

class Plan extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $planService;
	private $orderService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->planService = requireService("Plan");
		$this->orderService = requireService("Order");
	}

	//得到方案列表
	public function planList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planId = (int)$this->common->getParam("planId", 0);
		$matchType = (int)$this->common->getParam("matchType", 0);
		$publish = $this->common->getParam("publish", null);
		$prizeStatus = $this->common->getParam("prizeStatus", null);
        $rich = $this->common->getParam("rich", null);
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
		$param['planId'] = $planId;
		$param['matchType'] = $matchType;
		if ($publish !== null) {
			$param['publish'] = $publish;
		}
		if ($prizeStatus !== null) {
			$param['prizeStatus'] = $prizeStatus;
		}
        if ($rich !== null) {
            $param['rich'] = $rich;
        }
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planListData = $selectPlanResp->data;
		$totalCount = (int)$planListData['totalCount'];
		$planList = $planListData['list'];
		$planList = $this->commonService->setMatchList($planList);
        $planList = $this->commonService->setResourceUrl($planList);
		$planListData['list'] = $planList;
		$this->resp->data = $planListData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function publishPlan() {
		$planId = (int)$this->common->getParam("planId", 0);
		$publish = (int)$this->common->getParam("publish", 0);
		if ($planId <= 0) {
			$this->resp->msg = "planId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['planId'] = $planId;
		$param['publish'] = $publish;
		$updatePlanResp = $this->planService->updatePlan($param);
		if ($updatePlanResp->errCode != 0) {
			$this->resp->msg = "上下架方案失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deletePlan() {
		$planId = (int)$this->common->getParam("planId", 0);
		if ($planId <= 0) {
			$this->resp->msg = "planId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['planId'] = $planId;
		$param['status'] = 2;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "查询订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderList = $selectOrderResp->data['list'];
		if (!empty($orderList) && is_array($orderList) && count($orderList) > 0) {
			$this->resp->msg = "该方案已经被购买,不能删除";
			$this->jsonView->out($this->resp);
		}
		$deletePlanResp = $this->planService->deletePlan($planId);
		if ($deletePlanResp->errCode != 0) {
			$this->resp->msg = "删除方案失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//方案是豪单
    public function richPlan() {
        $planId = (int)$this->common->getParam("planId", 0);
        $rich = (int)$this->common->getParam("rich", 0);
        if ($planId <= 0) {
            $this->resp->msg = "planId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['planId'] = $planId;
        $param['rich'] = $rich;
        $updatePlanResp = $this->planService->updatePlan($param);
        if ($updatePlanResp->errCode != 0) {
            $this->resp->msg = "更改豪单失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}