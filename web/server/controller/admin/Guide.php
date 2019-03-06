<?php
namespace controller\admin;
use controller\Base;

class Guide extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $guideService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->guideService = requireService("Guide");
	}

	//得到引导列表
	public function guideList() {
		$guideUserName = trim($this->common->getParam("guideUserName", ''));
		$accessUserName = trim($this->common->getParam("accessUserName", ''));
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
		$param['guideUserName'] = $guideUserName;
		$param['accessUserName'] = $accessUserName;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectGuideResp = $this->guideService->selectGuide($param);
		if ($selectGuideResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$guideData = $selectGuideResp->data;
		$this->resp->data = $guideData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}