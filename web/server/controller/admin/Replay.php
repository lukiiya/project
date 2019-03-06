<?php
namespace controller\admin;
use controller\Base;

class Replay extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $replayService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->replayService = requireService("Replay");
	}

	//得到复盘列表
	public function replayList() {
		$title = trim($this->common->getParam("title", ''));
		$userName = trim($this->common->getParam("userName", ''));
		$replayId = (int)$this->common->getParam("replayId", 0);
		$publish = $this->common->getParam("publish", null);
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
		$param['title'] = $title;
		$param['userName'] = $userName;
		$param['replayId'] = $replayId;
		if ($publish !== null) {
			$param['publish'] = $publish;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectReplayResp = $this->replayService->selectReplay($param);
		if ($selectReplayResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$replayListData = $selectReplayResp->data;
		$totalCount = (int)$replayListData['totalCount'];
		$data = array('totalCount' => $totalCount, 'list' => array());
		$replayList = $replayListData['list'];
        $replayList = $this->commonService->setResourceUrl($replayList);
        $data['list'] = $replayList;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//复盘上下架
	public function publishReplay() {
		$replayId = (int)$this->common->getParam("replayId", 0);
		$publish = (int)$this->common->getParam("publish", 0);
		if ($replayId <= 0) {
			$this->resp->msg = "replayId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['replayId'] = $replayId;
		$param['publish'] = $publish;
		$updateReplayResp = $this->replayService->updateReplay($param);
		if ($updateReplayResp->errCode != 0) {
			$this->resp->msg = "上下架复盘失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteReplay() {
		$replayId = (int)$this->common->getParam("replayId", 0);
		if ($replayId <= 0) {
			$this->resp->msg = "replayId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectReplayByIdResp = $this->replayService->selectReplayById($replayId);
		if ($selectReplayByIdResp->errCode != 0) {
			$this->resp->msg = "查询复盘失败";
			$this->jsonView->out($this->resp);
		}
		$replayData = $selectReplayByIdResp->data;
		if (empty($replayData)) {
			$this->resp->msg = "该复盘已删除";
			$this->jsonView->out($this->resp);
		}
		$deleteReplayResp = $this->replayService->deleteReplay($replayId);
		if ($deleteReplayResp->errCode != 0) {
			$this->resp->msg = "删除复盘失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}