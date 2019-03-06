<?php
namespace controller\admin;
use controller\Base;

class Ticket extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $ticketService;
	private $orderService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->ticketService = requireService("Ticket");
		$this->orderService = requireService("Order");
	}

	//得到出票列表
	public function ticketList() {
		$issue = trim($this->common->getParam("issue", ''));
		$lotteryId = trim($this->common->getParam("lotteryId", ''));
		$status = $this->common->getParam("status", null);
		$userName = trim($this->common->getParam("userName", ''));
		$supplierName = trim($this->common->getParam("supplierName", ''));
		$orderId = (int)$this->common->getParam("orderId", 0);
		$ticketId = (int)$this->common->getParam("ticketId", 0);
		$platformId = trim($this->common->getParam("platformId", ''));
		$printNo = trim($this->common->getParam("printNo", ''));
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
		$param['issue'] = $issue;
		$param['lotteryId'] = $lotteryId;
		if ($status !== null) {
			$param['status'] = $status;
		}
		$param['userName'] = $userName;
		$param['supplierName'] = $supplierName;
		$param['orderId'] = $orderId;
		$param['ticketId'] = $ticketId;
		$param['platformId'] = $platformId;
		$param['printNo'] = $printNo;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$ticketData = $selectTicketResp->data;
		$ticketData['list'] = $this->commonService->setMatchList($ticketData['list'], 'matchRecommend');
        $ticketData['list'] = $this->commonService->setGuessList($ticketData['list'], 'matchRecommend');
		$this->resp->data = $ticketData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}