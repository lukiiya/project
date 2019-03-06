<?php
namespace controller\portal;
use controller\Base;

class Combo extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $comboService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->comboService = requireService("Combo");
	}

	//得到套餐信息
	public function comboInfo() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$comboNo = trim($this->common->getParam("comboNo", ''));
		if (empty($comboNo)) {
			$this->resp->msg = "comboNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectComboByNoResp = $this->comboService->selectComboByNoCache($comboNo);
		if ($selectComboByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$comboData = $selectComboByNoResp->data;
		if (empty($comboData)) {
			$this->resp->msg = "套餐不存在";
			$this->jsonView->out($this->resp);
		}
		$comboId = (int)$comboData['comboId'];
		$comboInfo = array();
		$comboInfo['comboNo'] = $this->common->encodeNo($comboId+12345678, $comboId);
		$comboInfo['comboType'] = $comboData['comboType'];
		$comboInfo['title'] = $comboData['title'];
		$comboInfo['amount'] = $comboData['amount'];
		$comboInfo['presentAmount'] = $comboData['presentAmount'];
		$comboInfo['spanTime'] = $comboData['spanTime'];
		$comboInfo['remark'] = !empty($comboData['remark']) ? $comboData['remark'] : '';
		$comboInfo['createTime'] = $comboData['createTime'];
		$comboInfo['lastTime'] = $comboData['lastTime'];
		$this->resp->data = $comboInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到套餐列表
	public function comboList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		if ($comboType > 0) {
			$param['comboType'] = $comboType;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectComboResp = $this->comboService->selectComboCache($param);
		if ($selectComboResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$comboListData = $selectComboResp->data;
		$totalCount = (int)$comboListData['totalCount'];
		$comboList = $comboListData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($comboList); $i < $length; $i++) {
			$comboData = $comboList[$i];
			$comboId = (int)$comboData['comboId'];
			$comboInfo = array();
			$comboInfo['comboNo'] = $this->common->encodeNo($comboId+12345678, $comboId);
			$comboInfo['comboType'] = $comboData['comboType'];
			$comboInfo['title'] = $comboData['title'];
			$comboInfo['amount'] = $comboData['amount'];
			$comboInfo['presentAmount'] = $comboData['presentAmount'];
			$comboInfo['spanTime'] = $comboData['spanTime'];
			$comboInfo['remark'] = !empty($comboData['remark']) ? $comboData['remark'] : '';
			$comboInfo['createTime'] = $comboData['createTime'];
			$comboInfo['lastTime'] = $comboData['lastTime'];
			$data['list'][] = $comboInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}