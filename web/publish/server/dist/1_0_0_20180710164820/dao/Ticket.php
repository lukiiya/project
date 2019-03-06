<?php
namespace dao;
class Ticket {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function selectTicketById($ticketId) {
		$resp = requireModule('Resp');
		$ticketId = (int)$ticketId;
		if ($ticketId <= 0) {
			$resp->msg = 'ticketId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'ticketId="'.$database->escape($ticketId).'"';
		$column = 'ticketId,orderId,userId,nickName,realName,supplierId,supplierName,lotteryId,lotteryName,status,unit,multiple,amount,issue,passType,append,betType,betContent,matchRecommend,platformId,prizeAmount,pretaxPrizeAmount,printOdds,printConcede,printNo,printTime,createTime,lastTime';
		$sql = 'select '.$column.' from t_ticket where discard=0 and '.$field.' limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '查询失败';
			return $resp;
		}
		$data = $database->get($result);
		$database->free($result);
		$database->close();
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectTicket($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$ticketId = $param['ticketId'];
		$orderId = $param['orderId'];
		$userId = $param['userId'];
		$userName = trim($param['userName']);
		$supplierId = (int)$param['supplierId'];
		$supplierName = trim($param['supplierName']);
		$lotteryId = trim($param['lotteryId']);
		$status = $param['status'];
		$issue = trim($param['issue']);
		$passType = trim($param['passType']);
		$append = (int)$param['append'];
		$betType = trim($param['betType']);
		$platformId = trim($param['platformId']);
		$hasPlatformId = (bool)$param['hasPlatformId'];
		$printNo = trim($param['printNo']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$needSport = (bool)$param['needSport'];
		$needDigital = (bool)$param['needDigital'];
		$orderBy = (int)$param['orderBy'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$justCount = (bool)$param['justCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($ticketId)) {
			$ticketId = (int)$ticketId;
			if ($ticketId > 0) {
				$field[] = 'ticketId="'.$database->escape($ticketId).'"';
			}
		} else if (is_array($ticketId)) {
			$ticketId = $this->common->filterIdArray($ticketId);
			if (count($ticketId) > 0) {
				$ticketId = implode(',', $ticketId);
				$field[] = 'ticketId in('.$database->escape($ticketId).')';
			}
		}
		if (is_numeric($orderId)) {
			$orderId = (int)$orderId;
			if ($orderId > 0) {
				$field[] = 'orderId="'.$database->escape($orderId).'"';
			}
		} else if (is_array($orderId)) {
			$orderId = $this->common->filterIdArray($orderId);
			if (count($orderId) > 0) {
				$orderId = implode(',', $orderId);
				$field[] = 'orderId in('.$database->escape($orderId).')';
			}
		}
		if (is_numeric($userId)) {
			$userId = (int)$userId;
			if ($userId > 0) {
				$field[] = 'userId="'.$database->escape($userId).'"';
			}
		} else if (is_array($userId)) {
			$userId = $this->common->filterIdArray($userId);
			if (count($userId) > 0) {
				$userId = implode(',', $userId);
				$field[] = 'userId in('.$database->escape($userId).')';
			}
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($supplierId > 0) {
			$field[] = 'supplierId="'.$supplierId.'"';
		}
		if ($supplierName != '') {
			$field[] = 'supplierName like "%'.$database->escape($supplierName).'%"';
		}
		if (!empty($lotteryId)) {
			$field[] = '(lotteryId like "%'.$database->escape($lotteryId).'%" or lotteryName like "%'.$database->escape($lotteryId).'%")';
		}
		if (key_exists('status', $param)) {
			//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if (is_numeric($status)) {
				if ($status == -1) {
					$field[] = 'status in(2,3,4)';
				} else if ($status == -2) {
					$field[] = 'status in(0,1,5)';
				} else {
					$field[] = 'status="'.$database->escape($status).'"';
				}
			} else if (is_array($status)) {
				$status = $this->common->filterNumArray($status);
				$status = implode(',', $status);
				$field[] = 'status in('.$database->escape($status).')';
			}
		}
		if (!empty($issue)) {
			$field[] = 'issue="'.$database->escape($issue).'"';
		}
		if (!empty($passType)) {
			$field[] = 'passType="'.$passType.'"';
		}
		if (key_exists('append', $param)) {
			$field[] = 'append="'.$database->escape($append).'"';
		}
		if (!empty($betType)) {
			$field[] = 'betType="'.$betType.'"';
		}
		if (!empty($platformId)) {
			$field[] = 'platformId="'.$database->escape($platformId).'"';
		}
		if ($hasPlatformId) {
			$field[] = 'platformId!=""';
		}
		if (!empty($printNo)) {
			$field[] = 'printNo="'.$database->escape($printNo).'"';
		}
		if ($endTime != '') {
			$endTime = strtotime($endTime);
			$endTime = date('Y-m-d', $endTime + 3600 * 24);
		}
		if ($beginTime != '' && $endTime != '') {
			$field[] = 'createTime>="'.$database->escape($beginTime).'" and createTime<"'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$field[] = 'createTime>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$field[] = 'createTime<"'.$database->escape($endTime).'"';
		}
		if ($needSport) {
			$field[] = 'passType!="" and betType=""';
		}
		if ($needDigital) {
			$field[] = 'passType="" and betType!=""';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount || $justCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount,sum(prizeAmount) as totalPrizeAmount,sum(pretaxPrizeAmount) as totalPretaxPrizeAmount from t_ticket where '.$field;
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
			$data['totalAmount'] = (int)$info["totalAmount"];
			$data['totalPrizeAmount'] = (int)$info["totalPrizeAmount"];
			$data['totalPretaxPrizeAmount'] = (int)$info["totalPretaxPrizeAmount"];
		}
		$orderByField = 'order by ticketId desc';
		if ($orderBy == 1) {
			$orderByField = 'order by ticketId asc';
		}
		if (!$justCount) {
			$page = '';
			if ($pageNum > 0 && $pageSize > 0) {
				$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
			}
			$column = 'ticketId,orderId,userId,nickName,realName,supplierId,supplierName,lotteryId,lotteryName,status,unit,multiple,amount,issue,passType,append,betType,betContent,matchRecommend,platformId,prizeAmount,pretaxPrizeAmount,printOdds,printConcede,printNo,printTime,createTime,lastTime';
			$sql = 'select '.$column.' from t_ticket where '.$field.' '.$orderByField.' '.$page;
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			while($info = $database->get($result)){
				$data['list'][] = $info;
			}
			$database->free($result);
			$database->close();
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}
}