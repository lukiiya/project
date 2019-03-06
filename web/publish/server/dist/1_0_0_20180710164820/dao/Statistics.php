<?php
namespace dao;
class Statistics {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function selectStatisticsDate($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($beginTime != '' && $endTime != '') {
			$field[] = 'date>="'.$database->escape($beginTime).'" and date<="'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$field[] = 'date>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$field[] = 'date<="'.$database->escape($endTime).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_statistics_date where '.$field;
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'date,userCount,mobileUserCount,consumeUserCount,cashConsumeUserCount,planCount,orderCount,orderAmount,planOrderCount,planOrderAmount,chargeOrderCount,chargeOrderAmount,jxzpOrderCount,jxzpOrderAmount,consumeCount,consumeAmount,cashConsumeCount,cashConsumeAmount,chargeConsumeCount,chargeConsumeAmount,incomeConsumeCount,incomeConsumeAmount,incomeCount,incomeAmount,recommendIncomeCount,recommendIncomeAmount,spreadIncomeCount,spreadIncomeAmount,withdrawingCount,withdrawingAmount,withdrewCount,withdrewAmount,chargeCount,chargeAmount,userChargeCount,userChargeAmount,platformChargeCount,platformChargeAmount,userCountEnd,mobileUserCountEnd,consumeUserCountEnd,cashConsumeUserCountEnd,planCountEnd,orderCountEnd,orderAmountEnd,planOrderCountEnd,planOrderAmountEnd,chargeOrderCountEnd,chargeOrderAmountEnd,jxzpOrderCountEnd,jxzpOrderAmountEnd,consumeCountEnd,consumeAmountEnd,cashConsumeCountEnd,cashConsumeAmountEnd,chargeConsumeCountEnd,chargeConsumeAmountEnd,incomeConsumeCountEnd,incomeConsumeAmountEnd,incomeCountEnd,incomeAmountEnd,recommendIncomeCountEnd,recommendIncomeAmountEnd,spreadIncomeCountEnd,spreadIncomeAmountEnd,withdrawingCountEnd,withdrawingAmountEnd,withdrewCountEnd,withdrewAmountEnd,chargeCountEnd,chargeAmountEnd,userChargeCountEnd,userChargeAmountEnd,platformChargeCountEnd,platformChargeAmountEnd,createTime,lastTime';
		$sql = 'select '.$column.' from t_statistics_date where '.$field.' order by date desc '.$page;
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
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectStatisticsUserDate($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$planPrizeRateRank = (bool)$param['planPrizeRateRank'];
		$userId = $param['userId'];
		$userName = trim($param['userName']);
		$dateType = (int)$param['dateType'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
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
		if ($dateType == 1) {
			if ($beginTime != '' && $endTime != '') {
				$field[] = 'date>="'.$database->escape($beginTime).'" and date<="'.$database->escape($endTime).'"';
			} else if ($beginTime != '') {
				$field[] = 'date>="'.$database->escape($beginTime).'"';
			} else if ($endTime != '') {
				$field[] = 'date<="'.$database->escape($endTime).'"';
			}
		} else if ($dateType == 2) {
			if ($beginTime != '' && $endTime != '') {
				$field[] = 'date_format(date,"%Y-%m")>="'.$database->escape($beginTime).'" and date_format(date,"%Y-%m")<="'.$database->escape($endTime).'"';
			} else if ($beginTime != '') {
				$field[] = 'date_format(date,"%Y-%m")>="'.$database->escape($beginTime).'"';
			} else if ($endTime != '') {
				$field[] = 'date_format(date,"%Y-%m")<="'.$database->escape($endTime).'"';
			}
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = '';
			if ($planPrizeRateRank) {
				$sql = 'select sum(planCount) as planCount,sum(winPlanCount) as winPlanCount,sum(lostPlanCount) as lostPlanCount,sum(planOrderCount) as planOrderCount,sum(planOrderAmount) as planOrderAmount,sum(planPrizeAmount) as planPrizeAmount,sum(planCostAmount) as planCostAmount,sum(planTicketOrderCount) as planTicketOrderCount,sum(planTicketOrderAmount) as planTicketOrderAmount from t_statistics_user_date where '.$field.' group by userId';
			} else if ($dateType == 1) {
				$sql = 'select planCount,winPlanCount,lostPlanCount,planOrderCount,planOrderAmount,planPrizeAmount,planCostAmount,planTicketOrderCount,planTicketOrderAmount from t_statistics_user_date where '.$field;
			} else if ($dateType == 2) {
				$sql = 'select sum(planCount) as planCount,sum(winPlanCount) as winPlanCount,sum(lostPlanCount) as lostPlanCount,sum(planOrderCount) as planOrderCount,sum(planOrderAmount) as planOrderAmount,sum(planPrizeAmount) as planPrizeAmount,sum(planCostAmount) as planCostAmount,sum(planTicketOrderCount) as planTicketOrderCount,sum(planTicketOrderAmount) as planTicketOrderAmount from t_statistics_user_date where '.$field.' group by userId,date_format(date,"%Y-%m")';
			}
			if (empty($sql)) {
				$database->close();
				$resp->msg = '查询条件有误';
				return $resp;
			}
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$totalCount = 0;
			$totalPlanCount = 0;
			$totalWinPlanCount = 0;
			$totalLostPlanCount = 0;
			$totalPlanOrderCount = 0;
			$totalPlanOrderAmount = 0;
			$totalPlanPrizeAmount = 0;
			$totalPlanCostAmount = 0;
			$totalPlanTicketOrderCount = 0;
			$totalPlanTicketOrderAmount = 0;
			while($info = $database->get($result)){
				$totalCount++;
				$totalPlanCount += (int)$info['planCount'];
				$totalWinPlanCount += (int)$info['winPlanCount'];
				$totalLostPlanCount += (int)$info['lostPlanCount'];
				$totalPlanOrderCount += (int)$info['planOrderCount'];
				$totalPlanOrderAmount += (int)$info['planOrderAmount'];
				$totalPlanPrizeAmount += (float)$info['planPrizeAmount'];
				$totalPlanCostAmount += (int)$info['planCostAmount'];
				$totalPlanTicketOrderCount += (int)$info['planTicketOrderCount'];
				$totalPlanTicketOrderAmount += (int)$info['planTicketOrderAmount'];
			}
			if (($totalWinPlanCount+$totalLostPlanCount) > 0) {
				$totalPlanWinRate = $totalWinPlanCount*100/($totalWinPlanCount+$totalLostPlanCount);
			}
			if ($totalPlanCostAmount > 0) {
				$totalPlanPrizeRate = (($totalPlanPrizeAmount-$totalPlanCostAmount)*100)/$totalPlanCostAmount;
			}
			$database->free($result);
			$data['totalCount'] = $totalCount;
			$data['totalPlanCount'] = $totalPlanCount;
			$data['totalPlanOrderCount'] = $totalPlanOrderCount;
			$data['totalPlanOrderAmount'] = $totalPlanOrderAmount;
			$data['totalPlanWinRate'] = $totalPlanWinRate;
			$data['totalPlanPrizeRate'] = $totalPlanPrizeRate;
			$data['totalPlanTicketOrderCount'] = $totalPlanTicketOrderCount;
			$data['totalPlanTicketOrderAmount'] = $totalPlanTicketOrderAmount;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = '';
		$sql = '';
		if ($planPrizeRateRank) {
			$column = 'userId,nickName,realName,sum(planCount) as planCount,sum(planOrderCount) as planOrderCount,sum(planOrderAmount) as planOrderAmount,sum(winPlanCount)*100/(sum(winPlanCount)+sum(lostPlanCount)) as planWinRate,((sum(planPrizeAmount)-sum(planCostAmount))*100)/sum(planCostAmount) as planPrizeRate,sum(planTicketOrderCount) as planTicketOrderCount,sum(planTicketOrderAmount) as planTicketOrderAmount,createTime,lastTime';
			$sql = 'select '.$column.' from t_statistics_user_date where '.$field.' group by userId order by planPrizeRate desc '.$page;
		} else if ($dateType == 1) {
			$column = 'userId,nickName,realName,date,planCount,planOrderCount,planOrderAmount,winPlanCount*100/(winPlanCount+lostPlanCount) as planWinRate,((planPrizeAmount-planCostAmount)*100)/planCostAmount as planPrizeRate,planTicketOrderCount,planTicketOrderAmount,createTime,lastTime';
			$sql = 'select '.$column.' from t_statistics_user_date where '.$field.' order by date desc '.$page;
		} else if ($dateType == 2) {
			$column = 'userId,nickName,realName,date_format(date,"%Y-%m") as date,sum(planCount) as planCount,sum(planOrderCount) as planOrderCount,sum(planOrderAmount) as planOrderAmount,sum(winPlanCount)*100/(sum(winPlanCount)+sum(lostPlanCount)) as planWinRate,((sum(planPrizeAmount)-sum(planCostAmount))*100)/sum(planCostAmount) as planPrizeRate,sum(planTicketOrderCount) as planTicketOrderCount,sum(planTicketOrderAmount) as planTicketOrderAmount,createTime,lastTime';
			$sql = 'select '.$column.' from t_statistics_user_date where '.$field.' group by userId,date_format(date,"%Y-%m") order by date desc '.$page;
		}
		if (empty($column) || empty($sql)) {
			$database->close();
			$resp->msg = '查询条件有误';
			return $resp;
		}
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
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectStatisticsAmount($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$orderMap = array();
		$field = 'discard=0 and orderType=0 and status=2';
		$column = 'amount,count(*) as count';
		$sql = 'select '.$column.' from t_order where '.$field.' group by amount order by amount desc ';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '查询订单失败';
			return $resp;
		}
		while($info = $database->get($result)){
			$amount = (int)$info['amount'];
			$count = (int)$info['count'];
			$orderMap[$amount] = $count;
		}
		$database->free($result);
		$field = 'discard=0';
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select amount,count(*) as count from t_plan where '.$field.' group by amount';
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询方案失败';
				return $resp;
			}
			$totalCount = 0;
			$totalPlanCount = 0;
			$totalPlanOrderCount = 0;
			$totalPlanOrderAmount = 0;
			while($info = $database->get($result)){
				$amount = (int)$info['amount'];
				$planCount = (int)$info['count'];
				$planOrderCount = (int)$orderMap[$amount];
				$planOrderAmount = $amount * $planOrderCount;
				$totalCount++;
				$totalPlanCount += $planCount;
				$totalPlanOrderCount += $planOrderCount;
				$totalPlanOrderAmount += $planOrderAmount;
			}
			$database->free($result);
			$data['totalCount'] = $totalCount;
			$data['totalPlanCount'] = $totalPlanCount;
			$data['totalPlanOrderCount'] = $totalPlanOrderCount;
			$data['totalPlanOrderAmount'] = $totalPlanOrderAmount;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'amount,count(*) as count';
		$sql = 'select '.$column.' from t_plan where '.$field.' group by amount order by amount desc '.$page;
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '查询失败';
			return $resp;
		}
		while ($info = $database->get($result)) {
			$amount = (int)$info['amount'];
			$planCount = (int)$info['count'];
			$planOrderCount = (int)$orderMap[$amount];
			$planOrderAmount = $amount * $planOrderCount;
			$data['list'][] = array(
				'amount' => $amount,
				'planCount' => $planCount,
				'planOrderCount' => $planOrderCount,
				'planOrderAmount' => $planOrderAmount
			);
		}
		$database->free($result);
		$database->close();
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectStatisticsConsumeUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userName = trim($param['userName']);
		$financeType = (int)$param['financeType'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if (!empty($userName)) {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as count,sum(amount) as amount from t_finance_consume where '.$field.' group by userId';
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$totalCount = 0;
			$totalOrderCount = 0;
			$totalOrderAmount = 0;
			while($info = $database->get($result)){
				$totalCount++;
				$totalOrderCount += (int)$info['count'];
				$totalOrderAmount += (int)$info['amount'];
			}
			$data['totalCount'] = $totalCount;
			$data['totalOrderCount'] = $totalOrderCount;
			$data['totalOrderAmount'] = $totalOrderAmount;
			$database->free($result);
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$sql = 'select userId,nickName,realName,count(*) as count,sum(amount) as amount from t_finance_consume where '.$field.' group by userId order by amount desc '.$page;
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
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectStatisticsCashConsumeUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userName = trim($param['userName']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$financeType = (int)$param['financeType'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$field = array();
		$field[] = 'discard=0';
		if (!empty($userName)) {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($endTime != '') {
			$endTime = strtotime($endTime);
			$endTime = date('Y-m-d', $endTime + 3600 * 24);
		}
		$timeField = '';
		if ($beginTime != '' && $endTime != '') {
			$timeField = ' and createTime>="'.$database->escape($beginTime).'" and createTime<"'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$timeField = ' and createTime>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$timeField = ' and createTime<"'.$database->escape($endTime).'"';
		}
		$field = implode(' and ', $field);
		$field .= $timeField;
		//查询用户消费金额
		$sql = 'select userId,nickName,realName,count(*) as count,sum(amount) as amount from t_finance_consume where '.$field.' group by userId order by amount desc';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '查询用户消费金额失败';
			return $resp;
		}
		$userIdArr = array();
		$consumeMap = array();
		while ($info = $database->get($result)) {
			$userId = (int)$info['userId'];
			if ($userId <= 0) {
				continue;
			}
			$userIdArr[] = $userId;
			$consumeMap[$userId] = $info;
		}
		$database->free($result);
		$totalOrderCount = 0;
		$totalOrderAmount = 0;
		$userIdArr = $this->common->filterIdArray($userIdArr);
		if (count($userIdArr) > 0) {
			$field = array();
			$field[] = 'discard=0';
			$field[] = 'financeType="'.$database->escape($financeType).'"';
			$field[] = 'type=2';
			$field[] = 'userId in('.$database->escape(implode(',', $userIdArr)).')';
			$field = implode(' and ', $field);
			$field .= $timeField;
			//查询截止到当天用户平台赠送金额
			$sql = 'select userId,sum(amount) as amount from t_finance_charge where '.$field.' group by userId';
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询用户平台赠送金额失败';
				return $resp;
			}
			$performChargeMap = array();
			while ($info = $database->get($result)) {
				$userId = (int)$info['userId'];
				$amount = (int)$info['amount'];
				if ($userId <= 0) {
					continue;
				}
				$performChargeMap[$userId] = $amount;
			}
			$database->free($result);
			$database->close();
			$userArr = array();
			foreach ($consumeMap as $consume) {
				$userId = (int)$consume['userId'];
				$amount = (int)$consume['amount'];
				$performCharge = (int)$performChargeMap[$userId];
				if ($userId <= 0) {
					continue;
				}
				if ($amount > $performCharge) {
					$totalOrderCount += (int)$consume['count'];
					$totalOrderAmount += $amount;
					$userArr[] = $consume;
				}
			}
		}
		$userLength = count($userArr);
		$begin = 0;
		$end = $userLength;
		if ($pageNum > 0 && $pageSize > 0) {
			$begin = ($pageNum - 1) * $pageSize;
			$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
		}
		$userList = array();
		for ($i = $begin; $i < $end; $i++) {
			$userList[] = $userArr[$i];
		}
		$data = array(
			'totalCount' => $userLength,
			'totalOrderCount' => $totalOrderCount,
			'totalOrderAmount' => $totalOrderAmount,
			'list' => $userList
		);
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}
}