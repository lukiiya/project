<?php
namespace service;
class Order extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Order");
	}

	public function insertOrder($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = (int)$param['userId'];
		$amount = (int)$param['amount'];
		$status = (int)$param['status'];
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;	
		}
		if ($amount <= 0) {
			$resp->msg = "amount不能为空";
			return $resp;
		}
		if ($status <= 0) {
			$resp->msg = "status不能为空";
			return $resp;
		}
		$insertOrderResp = $this->dao->insertOrder($param);
		if ($insertOrderResp->errCode != 0) {
			$resp->msg = $insertOrderResp->msg;
			return $resp;	
		}
		$resp->data = $insertOrderResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateOrder($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$orderId = (int)$param['orderId'];
		if ($orderId <= 0) {
			$resp->msg = 'orderId不能为空';
			return $resp;
		}
		$updateOrderResp = $this->dao->updateOrder($param);
		if ($updateOrderResp->errCode != 0) {
			$resp->msg = $updateOrderResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrderById($orderId) {
		$resp = requireModule('Resp');
		$orderId = (int)$orderId;
		if ($orderId <= 0) {
			$resp->msg = 'orderId不能为空';
			return $resp;
		}
		$selectOrderByIdResp = $this->dao->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$resp->msg = $selectOrderByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectOrderByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrderByNo($orderNo) {
		$resp = requireModule('Resp');
		$orderNo = trim($orderNo);
		if (empty($orderNo)) {
			$resp->msg = 'orderNo有误';
			return $resp;
		}
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$resp->msg = 'orderNo参数有误';
			return $resp;
		}
		$param = array();
		$param['userId'] = $orderNoUserId;
		$param['orderId'] = $orderNoOrderId;
		$param['pageNum'] = 1;
		$param['pageSize'] = 1;
		$selectOrderResp = $this->dao->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = $selectOrderResp->msg;
			return $resp;
		}
		$list =  $selectOrderResp->data['list'];
		if (is_array($list) && count($list) > 0) {
			$resp->data = $list[0];
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrder($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectOrderResp = $this->dao->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = $selectOrderResp->msg;
			return $resp;
		}
		$resp->data = $selectOrderResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrderBatchById($batchId) {
		$resp = requireModule('Resp');
		$batchId = (int)$batchId;
		if ($batchId <= 0) {
			$resp->msg = 'batchId不能为空';
			return $resp;
		}
		$selectOrderBatchByIdResp = $this->dao->selectOrderBatchById($batchId);
		if ($selectOrderBatchByIdResp->errCode != 0) {
			$resp->msg = $selectOrderBatchByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectOrderBatchByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrderBatchByNo($orderBatchNo) {
		$resp = requireModule('Resp');
		$orderBatchNo = trim($orderBatchNo);
		if (empty($orderBatchNo)) {
			$resp->msg = 'orderBatchNo有误';
			return $resp;
		}
		$orderBatchNoArr = $this->common->decodeNo($orderBatchNo);
		$orderBatchNoUserId = (int)$orderBatchNoArr['userId'];
		$orderBatchNoBatchId = (int)$orderBatchNoArr['id'];
		if (empty($orderBatchNoArr) || $orderBatchNoUserId <= 0 || $orderBatchNoBatchId <= 0) {
			$resp->msg = 'orderNo参数有误';
			return $resp;
		}
		$param = array();
		$param['userId'] = $orderBatchNoUserId;
		$param['batchId'] = $orderBatchNoBatchId;
		$param['pageNum'] = 1;
		$param['pageSize'] = 1;
		$selectOrderBatchResp = $this->dao->selectOrderBatch($param);
		if ($selectOrderBatchResp->errCode != 0) {
			$resp->msg = $selectOrderBatchResp->msg;
			return $resp;
		}
		$list =  $selectOrderBatchResp->data['list'];
		if (is_array($list) && count($list) > 0) {
			$resp->data = $list[0];
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectOrderBatch($param) {
		$resp = requireModule('Resp');
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectOrderBatchResp = $this->dao->selectOrderBatch($param);
		if ($selectOrderBatchResp->errCode != 0) {
			$resp->msg = $selectOrderBatchResp->msg;
			return $resp;
		}
		$resp->data = $selectOrderBatchResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectMaxTicketPrizeAmount($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectMaxTicketPrizeAmountResp = $this->dao->selectMaxTicketPrizeAmount($param);
        if ($selectMaxTicketPrizeAmountResp->errCode != 0) {
            $resp->msg = $selectMaxTicketPrizeAmountResp->msg;
            return $resp;
        }
        $resp->data = $selectMaxTicketPrizeAmountResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectFollowAmount($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectFollowAmountResp = $this->dao->selectFollowAmount($param);
        if ($selectFollowAmountResp->errCode != 0) {
            $resp->msg = $selectFollowAmountResp->msg;
            return $resp;
        }
        $resp->data = $selectFollowAmountResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	public function getTicketSupplier($param) {
		$resp = requireModule('Resp');
        $getTicketSupplierResp = $this->dao->getTicketSupplier($param);
        if ($getTicketSupplierResp->errCode != 0) {
            $resp->msg = $getTicketSupplierResp->msg;
            return $resp;
        }
        $resp->data = $getTicketSupplierResp->data;
        $resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}