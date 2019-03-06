<?php
namespace controller\admin;
use controller\Base;

class Order extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $orderService;
	private $comboService;
	private $userService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->orderService = requireService("Order");
		$this->comboService = requireService("Combo");
		$this->userService = requireService("User");
	}

	//得到订单列表
	public function orderList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$orderNumeric = trim($this->common->getParam("orderNumeric", ''));
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$userId = (int)$this->common->getParam("userId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$spreaderUserName = trim($this->common->getParam("spreaderUserName", ''));
		$ticketUserName = trim($this->common->getParam("ticketUserName", ''));
		$orderId = trim($this->common->getParam("orderId", 0));
		$planId = trim($this->common->getParam("planId", 0));
		$orderType = $this->common->getParam("orderType", null);
		$status = $this->common->getParam("status", null);
		$comboType = (int)$this->common->getParam("comboType", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$ticketPrizeDivideStatus = $this->common->getParam("ticketPrizeDivideStatus", null);
		$ticketAttachPrizeStatus = $this->common->getParam("ticketAttachPrizeStatus", null);
		$ticketPrizeVerifyStatus = $this->common->getParam("ticketPrizeVerifyStatus", null);
		$issue = trim($this->common->getParam("issue", ''));
		$lotteryId = trim($this->common->getParam("lotteryId", ''));
		$source = $this->common->getParam("source", null);
		$channel = $this->common->getParam("channel", null);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketSendPrizeAmount' => 0, 'totalTicketExpectPrizeAmount' => 0, 'totalTicketPrizeAmount' => 0, 'totalTicketAttachPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if (!empty($orderNo)) {
			if ($orderNoUserId > 0 && $orderNoOrderId > 0) {
				$userId = $orderNoUserId;
				$orderId = $orderNoOrderId;
			} else {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketSendPrizeAmount' => 0, 'totalTicketExpectPrizeAmount' => 0, 'totalTicketPrizeAmount' => 0, 'totalTicketAttachPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		if (!empty($orderNumeric)) {
			$orderId = substr($orderNumeric, 6);
		}
		$param = array();
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['userId'] = $userId;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		$param['spreaderUserName'] = $spreaderUserName;
		$param['ticketUserName'] = $ticketUserName;
		$param['orderId'] = $orderId;
		$param['planId'] = $planId;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($status !== null) {
			$param['status'] = $status;
		}
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['planMatchType'] = $planMatchType;
		$param['issue'] = $issue;
		if ($lotteryId == 'JCZQ') {
			$param['planMatchType'] = 1;
		} else if ($lotteryId == 'JCLQ') {
			$param['planMatchType'] = 2;
		} else if (!empty($lotteryId)) {
			$param['lotteryId'] = $lotteryId;
		}
		if ($ticketPrizeDivideStatus !== null) {
			$param['ticketPrizeDivideStatus'] = $ticketPrizeDivideStatus;
		}
		if ($ticketAttachPrizeStatus !== null) {
			$param['ticketAttachPrizeStatus'] = $ticketAttachPrizeStatus;
		}
		if ($ticketPrizeVerifyStatus !== null) {
			$param['ticketPrizeVerifyStatus'] = $ticketPrizeVerifyStatus;
		}
		if ($source !== null) {
			$param['source'] = $source;
		}
		if ($channel !== null) {
			$param['channel'] = $channel;
		}
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$list = &$orderListData['list'];
		if (!$exportReport) {
			$list = $this->commonService->setMatchList($list, 'planMatchRecommend');
            $list = $this->commonService->setGuessList($list, 'planMatchRecommend');
			$list = $this->commonService->setResourceUrl($list, 'ticketImg');
		}
		if (!empty($orderNumeric) && $orderId > 0 && count($list) == 1) {
			$order = $list[0];
			$createTime = (int)strtotime(trim($order['createTime']));
			$userId = (int)$order['userId'];
			$orderId = (int)$order['orderId'];
			$orderType = (int)$order['orderType'];
			$status = (int)$order['status'];
			$amount = (int)$order['amount'];
			$createTimeNum = substr($orderNumeric, 0, 1);
			$userIdNum = substr($orderNumeric, 1, 1);
			$orderIdNum = substr($orderNumeric, 2, 1);
			$orderTypeNum = substr($orderNumeric, 3, 1);
			$statusNum = substr($orderNumeric, 4, 1);
			$amountNum = substr($orderNumeric, 5, 1);
			if ($createTime%9 != $createTimeNum || $userId%9 != $userIdNum || $orderId%9 != $orderIdNum || $orderType != $orderTypeNum || $status != $statusNum || $amount%9 != $amountNum) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketSendPrizeAmount' => 0, 'totalTicketExpectPrizeAmount' => 0, 'totalTicketPrizeAmount' => 0, 'totalTicketAttachPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		foreach ($list as &$info) {
			$orderId = (int)$info['orderId'];
			$orderType = (int)$info['orderType'];
			$planMatchType = (int)$info['planMatchType'];
			$createTime = trim($info['createTime']);
			if ($orderId <= 0 || ($orderType != 0 && $orderType != 3 && $orderType != 7 && $orderType != 9)) {
				continue;
			}
			if ($planMatchType == 1 || $planMatchType == 2) {
				$info['issue'] = date('Ymd', strtotime($createTime));
			}
			$userId = (int)$info['userId'];
			$info['orderNumeric'] = $this->common->getOrderNumeric($info);
			$info['orderNo'] = $this->common->encodeNo($userId, $orderId);
		}
		$this->resp->data = $orderListData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->orderTable($orderListData));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	//得到应用宝订单列表
	public function myappOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 1;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到全民夺宝订单列表
	public function qmdbOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 2;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到老徐说彩订单列表
	public function lxscOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 3;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到蜜蜂视频订单列表
	public function mfspOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 6;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到玉琳玩彩订单列表
	public function ylwcOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 5;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到桂林mj订单列表
	public function glmjOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 7;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj1OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 8;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj2OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 9;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj3OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 10;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj4OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 11;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj5OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 12;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj6OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 13;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj7OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 14;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj8OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 15;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj9OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 16;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj10OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 17;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到tvsou订单列表
	public function tvsouOrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 18;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到刘老六订单列表
	public function ll6OrderList() {
		$userName = trim($this->common->getParam("userName", ''));
		$planUserName = trim($this->common->getParam("planUserName", ''));
		$orderType = $this->common->getParam("orderType", null);
		$planPrizeStatus = $this->common->getParam("planPrizeStatus", null);
		$ticketStatus = $this->common->getParam("ticketStatus", null);
		$status = (int)$this->common->getParam("status", 0);
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);
		$comboType = (int)$this->common->getParam("comboType", 0);
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
		$comboId = array();
		if ($comboType > 0) {
			$param = array();
			$param['comboType'] = $comboType;
			$param['pageNum'] = 1;
			$param['pageSize'] = 100;
			$selectComboResp = $this->comboService->selectCombo($param);
			if ($selectComboResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$comboList = $selectComboResp->data['list'];
			if (!empty($comboList)) {
				foreach ($comboList as $combo) {
					$cId = (int)$combo['comboId'];
					if ($cId > 0) {
						$comboId[] = $cId;
					}
				}
			}
			if (count($comboId) <= 0) {
				$this->resp->data = array('list' => array(), 'totalCount' => 0, 'totalAmount' => 0, 'totalTicketPrizeAmount' => 0);
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['channel'] = 19;
		$param['userName'] = $userName;
		$param['planUserName'] = $planUserName;
		if ($orderType !== null) {
			$param['orderType'] = $orderType;
		}
		if ($planPrizeStatus !== null) {
			$param['planPrizeStatus'] = $planPrizeStatus;
		}
		if ($ticketStatus !== null) {
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['status'] = $status;
		$param['planMatchType'] = $planMatchType;
		$param['comboId'] = $comboId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$orderList = $data['list'];
		$list = array();
		foreach ($orderList as $order) {
			$info = array();
			$info['nickName'] = trim($order['nickName']);
			$info['realName'] = trim($order['realName']);
			$info['planNickName'] = trim($order['planNickName']);
			$info['planRealName'] = trim($order['planRealName']);
			$info['amount'] = (int)$order['amount'];
			$info['orderType'] = (int)$order['orderType'];
			$info['status'] = (int)$order['status'];
			$info['planPrizeStatus'] = (int)$order['planPrizeStatus'];
			$info['ticketStatus'] = (int)$order['ticketStatus'];
			$info['createTime'] = trim($order['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	private function orderTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$totalTicketPrizeAmount = (float)$data['totalTicketPrizeAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="100">下单人</th><th width="100">出票人</th><th width="100">订单状态</th><th width="130">方案编号</th><th width="80">倍数</th><th width="90">购买金额</th><th width="100">中奖金额</th><th width="90">过关方式</th><th width="110">出票状态</th><th width="130">时间</th></tr>';
		$statusMap = array('1' => '未付款', '2' => '已付款', '3' => '已退款');
		$ticketStatusMap = array('0' => '未出票', '1' => '出票失败', '2' => '已出票待开奖', '3' => '未中奖', '4' => '已中奖', '5' => '已派奖', '6' => '部分派奖');
		foreach ($list as $order) {
			$nickName = trim($order['nickName']);
			$realName = trim($order['realName']);
			$ticketNickName = trim($order['ticketNickName']);
			$ticketRealName = trim($order['ticketRealName']);
			$userName = $nickName;
			if ($realName != '') {
				$userName .= '('.$realName.')';
			}
			$tickeUserName = $ticketNickName;
			if ($ticketRealName != '') {
				$tickeUserName .= '('+$ticketRealName+')';
			}
			$ticketSupplierId = (int)$order['ticketSupplierId'];
			$ticketSupplierName = trim($order['ticketSupplierName']);
			if ($ticketSupplierId > 0) {
				$tickeUserName = $ticketSupplierName.'(电子票)';
			}
			$orderNumeric = trim($order['orderNumeric']);
			$status = (int)$order['status'];
			$ticketMultiple = (int)$order['ticketMultiple'];
			$amount = (int)($order['amount']/100);
			$ticketPrizeAmount = (float)($order['ticketPrizeAmount']/100);
			$ticketStatus = (int)$order['ticketStatus'];
			$matchList = (array)$order['matchList'];
			$matchLength = count($matchList);
			$createTime = trim($order['createTime']);
			$table .= '<tr><td>'.$userName.'</td><td>'.$tickeUserName.'</td><td>'.$statusMap[$status].'</td><td>'.$orderNumeric.'</td><td>'.$ticketMultiple.'</td><td>'.$amount.'</td><td>'.$ticketPrizeAmount.'</td><td>'.($matchLength>1?$matchLength.'串1':'单关').'</td><td>'.$ticketStatusMap[$ticketStatus].'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td>'.($totalTicketPrizeAmount/100).'</td><td></td><td></td><td></td></tr></table>';
		return $table;
	}

	//后台派奖操作
	public function sendTicketPrize() {
		$orderId = (int)$this->common->getParam("orderId", 0);
		if ($orderId <= 0) {
			$this->resp->msg = "orderId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$this->resp->msg = "查询订单异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$this->resp->msg = "订单数据异常";
			$this->jsonView->out($this->resp);
		}
		$orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款
		$ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		$ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
		$ticketSendPrizeAmount = (int)$orderData['ticketSendPrizeAmount'];
		if ($orderType != 3) {
			$this->resp->msg = "订单类型异常";
			$this->jsonView->out($this->resp);
		}
		if ($status != 2) {
			$this->resp->msg = "订单状态异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketStatus != 4) {
			$this->resp->msg = "出票状态异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketPrizeAmount <= 0) {
			$this->resp->msg = "还未设置奖金";
			$this->jsonView->out($this->resp);
		}
		if ($ticketSendPrizeAmount > 0) {
			$this->resp->msg = "订单已派过";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$orderData['userId'];
		$nickName = trim($orderData['nickName']);
		$realName = trim($orderData['realName']);
		$financeType = 1;//资金类型, 0=方案, 1=出票
		//资金明细表额外表
		$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
		if ($selectFinanceExtraByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金异常";
			$this->jsonView->out($this->resp);
		}
		$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
		if (empty($financeDataExtra)) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		if ($financeIdExtra <= 0) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
			//更新订单状态
			$updateOrderSql = 'update t_order set ticketStatus=5,ticketSendPrizeAmount="'.$ticketPrizeAmount.'" where orderId="' . $orderId . '" and orderType=3 and status=2 and ticketStatus="'.$ticketStatus.'" and ticketPrizeAmount="'.$ticketPrizeAmount.'" and ticketSendPrizeAmount="'.$ticketSendPrizeAmount.'" limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新订单异常";
				$this->jsonView->out($this->resp);
			}
			//收益流水总表插入
			$insertFinanceIncomeRecordField = array();
			$insertFinanceIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceIncomeRecordField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceIncomeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceIncomeRecordField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceIncomeRecordField[] = 'amount="' . $database->escape($ticketPrizeAmount) . '"';
			$insertFinanceIncomeRecordField[] = 'createTime=now()';
			$insertFinanceIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceIncomeRecordField);
			$insertFinanceIncomeRecordResult = $database->execute($insertFinanceIncomeRecordSql);
			$insertFinanceIncomeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceIncomeRecordResult || $insertFinanceIncomeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入流水异常";
				$this->jsonView->out($this->resp);
			}
			//收益插入
			$insertFinanceIncomeField = array();
			$insertFinanceIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceIncomeField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceIncomeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceIncomeField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceIncomeField[] = 'type=1'; //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益)
			$insertFinanceIncomeField[] = 'amount="' . $database->escape($ticketPrizeAmount) . '"';
			$insertFinanceIncomeField[] = 'createTime=now()';
			$insertFinanceIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceIncomeField);
			$insertFinanceIncomeResult = $database->execute($insertFinanceIncomeSql);
			$insertFinanceIncomeInsertId = (int)$database->getInsertId();
			if (!$insertFinanceIncomeResult || $insertFinanceIncomeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入收益异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceSqlExtraParam['prizeIncomeChangeAmount'] = $ticketPrizeAmount;//中奖收益
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			//消息推送
			$this->sendTicketPrizeMessage($orderId);
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = '派奖失败';
			$this->jsonView->out($this->resp);
		}
	}

	//后台退款操作
	public function refundTicket() {
		$orderId = (int)$this->common->getParam("orderId", 0);
		if ($orderId <= 0) {
			$this->resp->msg = "orderId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$this->resp->msg = "查询订单异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$this->resp->msg = "订单数据异常";
			$this->jsonView->out($this->resp);
		}
		$orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款
		$ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		$amount = (int)$orderData['amount'];
		if ($orderType != 3) {
			$this->resp->msg = "订单类型异常";
			$this->jsonView->out($this->resp);
		}
		if ($status != 2) {
			$this->resp->msg = "订单状态异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketStatus != 1) {
			$this->resp->msg = "出票状态异常";
			$this->jsonView->out($this->resp);
		}
		if ($amount <= 0) {
			$this->resp->msg = "订单金额异常";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$orderData['userId'];
		$nickName = trim($orderData['nickName']);
		$realName = trim($orderData['realName']);
		$financeType = 1;//资金类型, 0=方案, 1=出票
		//资金明细表额外表
		$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
		if ($selectFinanceExtraByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金异常";
			$this->jsonView->out($this->resp);
		}
		$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
		if (empty($financeDataExtra)) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		if ($financeIdExtra <= 0) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
			//更新订单状态
			$updateOrderSql = 'update t_order set status=3 where orderId="' . $orderId . '" and orderType=3 and status=2 and ticketStatus=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新订单异常";
				$this->jsonView->out($this->resp);
			}
			//充值流水插入
			$insertFinanceChargeRecordField = array();
			$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeRecordField[] = 'remark="出票失败退款"';
			$insertFinanceChargeRecordField[] = 'createTime=now()';
			$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
			$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
			$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入流水异常";
				$this->jsonView->out($this->resp);
			}
			//充值插入
			$insertFinanceChargeField = array();
			$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
			$insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeField[] = 'remark="出票失败退款"';
			$insertFinanceChargeField[] = 'createTime=now()';
			$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
			$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
			$insertFinanceChargeInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入充值异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceSqlExtraParam['userChargeChangeAmount'] = $amount;//用户充值
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			//消息推送
			$this->sendRefundTicketMessage($orderId);
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = '退款失败';
			$this->jsonView->out($this->resp);
		}
	}

	//后台派奖操作
	public function modifyTicketPrizeAmount() {
		$orderId = (int)$this->common->getParam("orderId", 0);
		$ticketPrizeAmount = (int)$this->common->getParam("ticketPrizeAmount", 0);
		if ($orderId <= 0) {
			$this->resp->msg = "orderId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($ticketPrizeAmount <= 0) {
			$this->resp->msg = "ticketPrizeAmount参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$this->resp->msg = "查询订单异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$this->resp->msg = "订单数据异常";
			$this->jsonView->out($this->resp);
		}
		$orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款
		$ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		if ($orderType != 3) {
			$this->resp->msg = "订单类型异常";
			$this->jsonView->out($this->resp);
		}
		if ($status != 2) {
			$this->resp->msg = "订单状态异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketStatus != 4 && $ticketStatus != 6) {
			$this->resp->msg = "出票状态异常";
			$this->jsonView->out($this->resp);
		}
		if ((int)$orderData['ticketPrizeAmount'] <= 0) {
			$this->resp->msg = "还未设置奖金";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		//更新订单状态
		$sql = 'update t_order set ticketPrizeAmount="' . $database->escape($ticketPrizeAmount) . '" where orderId="' . $orderId . '" and ticketPrizeAmount !=0 and orderType=3 and status=2 and ticketStatus="'.$ticketStatus.'" limit 1 ';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$this->resp->msg = "中奖金额修改失败";
			$this->jsonView->out($this->resp);
		}
		$database->close();
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	private function sendTicketPrizeMessage($orderId) {
		$resp = requireModule('Resp');
		if ($orderId <= 0) {
			$resp->msg = '参数有误';
			return $resp;
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$resp->msg = '查询订单异常';
			return $resp;
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		$orderNumeric = $this->common->getOrderNumeric($orderData);
		if (!is_numeric($orderNumeric)) {
			$resp->msg = 'orderNumeric有误';
			return $resp;
		}
		$orderType = (int)$orderData['orderType'];
		if ($orderType != 3) {
			$resp->msg = 'orderType有误';
			return $resp;
		}
		$ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		if ($ticketStatus != 5) {
			$resp->msg = 'ticketStatus有误';
			return $resp;
		}
		$orderId = (int)$orderData['orderId'];
		$userId = (int)$orderData['userId'];
		$ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
		$ticketPrizeAmount = sprintf('%.2f', $ticketPrizeAmount/100);
		$orderNo = $this->common->encodeNo($userId, $orderId);
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$user = $selectUserByIdResp->data;
		if (empty($user)) {
			$resp->msg = '查询用户不存在';
			return $resp;
		}
		$openId = trim($user['openId']);
		$subscribe = (int)$user['subscribe'];
		if (empty($openId)) {
			$resp->msg = '无效的openId';
			return $resp;
		}
		if ($subscribe != 1) {
			$resp->msg = '未关注公众号';
			return $resp;
		}
		global $curEnv;
		$url = '';
		if ($curEnv == 'dist') {
			$url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
		} else if ($curEnv == 'beta') {
			$url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
		}
		$data = array();
		$data['first'] = array('value' => '恭喜您中奖了', 'color' => '#000000');
		$data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
		$data['keyword2'] = array('value' => '已派奖'.$ticketPrizeAmount.'元', 'color' => '#000000');
		$data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
		$jssdk = requireModule('Jssdk');
		$postJson = array(
			'touser' => $openId,
			'template_id' => $templateId,
			'url' => $url,
			'data' => $data
		);
		$accessToken = $jssdk->getAccessToken();
		$url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
		$param = json_encode($postJson);
		$httpPostResp = $jssdk->httpPost($url, $param);
		$respJson = json_decode($httpPostResp);
		if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
			$this->common->logger->info('发送模版消息异常：'.$httpPostResp);
			$resp->msg = '发送模版消息异常：'.$httpPostResp;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function sendRefundTicketMessage($orderId) {
		$resp = requireModule('Resp');
		if ($orderId <= 0) {
			$resp->msg = '参数有误';
			return $resp;
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$resp->msg = '查询订单异常';
			return $resp;
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		$orderNumeric = $this->common->getOrderNumeric($orderData);
		if (!is_numeric($orderNumeric)) {
			$resp->msg = 'orderNumeric有误';
			return $resp;
		}
		$orderType = (int)$orderData['orderType'];
		if ($orderType != 3) {
			$resp->msg = 'orderType有误';
			return $resp;
		}
		$status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款
		if ($status != 3) {
			$resp->msg = 'status有误';
			return $resp;
		}
		$orderId = (int)$orderData['orderId'];
		$userId = (int)$orderData['userId'];
		$amount = (int)$orderData['amount'];
		$amount = $amount/100;
		$orderNo = $this->common->encodeNo($userId, $orderId);
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$user = $selectUserByIdResp->data;
		if (empty($user)) {
			$resp->msg = '查询用户不存在';
			return $resp;
		}
		$openId = trim($user['openId']);
		$subscribe = (int)$user['subscribe'];
		if (empty($openId)) {
			$resp->msg = '无效的openId';
			return $resp;
		}
		if ($subscribe != 1) {
			$resp->msg = '未关注公众号';
			return $resp;
		}
		global $curEnv;
		$url = '';
		if ($curEnv == 'dist') {
			$url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
		} else if ($curEnv == 'beta') {
			$url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
		}
		$data = array();
		$data['first'] = array('value' => '出票失败，已退款', 'color' => '#000000');
		$data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
		$data['keyword2'] = array('value' => '已退款'.$amount.'元', 'color' => '#000000');
		$data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
		$jssdk = requireModule('Jssdk');
		$postJson = array(
			'touser' => $openId,
			'template_id' => $templateId,
			'url' => $url,
			'data' => $data
		);
		$accessToken = $jssdk->getAccessToken();
		$url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
		$param = json_encode($postJson);
		$httpPostResp = $jssdk->httpPost($url, $param);
		$respJson = json_decode($httpPostResp);
		if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
			$this->common->logger->info('发送模版消息异常：'.$httpPostResp);
			$resp->msg = '发送模版消息异常：'.$httpPostResp;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}
}