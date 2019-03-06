<?php
namespace dao;
class Finance {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertFinance($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$cashConsumeSumAmount = (int)$param['cashConsumeSumAmount'];
		$chargeConsumeSumAmount = (int)$param['chargeConsumeSumAmount'];
		$incomeConsumeSumAmount = (int)$param['incomeConsumeSumAmount'];
		$couponConsumeSumAmount = (int)$param['couponConsumeSumAmount'];
		$consumeSumAmount = (int)$param['consumeSumAmount'];
		$recommendIncomeSumAmount = (int)$param['recommendIncomeSumAmount'];
		$spreadIncomeSumAmount = (int)$param['spreadIncomeSumAmount'];
		$prizeIncomeSumAmount = (int)$param['prizeIncomeSumAmount'];
		$divideIncomeSumAmount = (int)$param['divideIncomeSumAmount'];
		$incomeSumAmount = (int)$param['incomeSumAmount'];
		$withdrawingSumAmount = (int)$param['withdrawingSumAmount'];
		$withdrewSumAmount = (int)$param['withdrewSumAmount'];
		$withdrawSumAmount = (int)$param['withdrawSumAmount'];
		$userChargeSumAmount = (int)$param['userChargeSumAmount'];
		$platformChargeSumAmount = (int)$param['platformChargeSumAmount'];
		$chargeSumAmount = (int)$param['chargeSumAmount'];
		$chargeFreezeSumAmount = (int)$param['chargeFreezeSumAmount'];
		$incomeFreezeSumAmount = (int)$param['incomeFreezeSumAmount'];
		$chargeAmount = (int)$param['chargeAmount'];
		$incomeAmount = (int)$param['incomeAmount'];
		$field = array();
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if (key_exists('userId', $param)) {
			$field[] = 'userId="'.$database->escape($userId).'"';
		}
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';
		}
		if (key_exists('cashConsumeSumAmount', $param)) {
			$field[] = 'cashConsumeSumAmount="'.$database->escape($cashConsumeSumAmount).'"';
		}
		if (key_exists('chargeConsumeSumAmount', $param)) {
			$field[] = 'chargeConsumeSumAmount="'.$database->escape($chargeConsumeSumAmount).'"';
		}
		if (key_exists('incomeConsumeSumAmount', $param)) {
			$field[] = 'incomeConsumeSumAmount="'.$database->escape($incomeConsumeSumAmount).'"';
		}
		if (key_exists('couponConsumeSumAmount', $param)) {
			$field[] = 'couponConsumeSumAmount="'.$database->escape($couponConsumeSumAmount).'"';
		}
		if (key_exists('consumeSumAmount', $param)) {
			$field[] = 'consumeSumAmount="'.$database->escape($consumeSumAmount).'"';
		}
		if (key_exists('recommendIncomeSumAmount', $param)) {
			$field[] = 'recommendIncomeSumAmount="'.$database->escape($recommendIncomeSumAmount).'"';
		}
		if (key_exists('spreadIncomeSumAmount', $param)) {
			$field[] = 'spreadIncomeSumAmount="'.$database->escape($spreadIncomeSumAmount).'"';
		}
		if (key_exists('prizeIncomeSumAmount', $param)) {
			$field[] = 'prizeIncomeSumAmount="'.$database->escape($prizeIncomeSumAmount).'"';
		}
		if (key_exists('divideIncomeSumAmount', $param)) {
			$field[] = 'divideIncomeSumAmount="'.$database->escape($divideIncomeSumAmount).'"';
		}
		if (key_exists('incomeSumAmount', $param)) {
			$field[] = 'incomeSumAmount="'.$database->escape($incomeSumAmount).'"';
		}
		if (key_exists('withdrawingSumAmount', $param)) {
			$field[] = 'withdrawingSumAmount="'.$database->escape($withdrawingSumAmount).'"';
		}
		if (key_exists('withdrewSumAmount', $param)) {
			$field[] = 'withdrewSumAmount="'.$database->escape($withdrewSumAmount).'"';
		}
		if (key_exists('withdrawSumAmount', $param)) {
			$field[] = 'withdrawSumAmount="'.$database->escape($withdrawSumAmount).'"';
		}
		if (key_exists('userChargeSumAmount', $param)) {
			$field[] = 'userChargeSumAmount="'.$database->escape($userChargeSumAmount).'"';
		}
		if (key_exists('platformChargeSumAmount', $param)) {
			$field[] = 'platformChargeSumAmount="'.$database->escape($platformChargeSumAmount).'"';
		}
		if (key_exists('chargeSumAmount', $param)) {
			$field[] = 'chargeSumAmount="'.$database->escape($chargeSumAmount).'"';
		}
		if (key_exists('chargeFreezeSumAmount', $param)) {
			$field[] = 'chargeFreezeSumAmount="'.$database->escape($chargeFreezeSumAmount).'"';
		}
		if (key_exists('incomeFreezeSumAmount', $param)) {
			$field[] = 'incomeFreezeSumAmount="'.$database->escape($incomeFreezeSumAmount).'"';
		}
		if (key_exists('chargeAmount', $param)) {
			$field[] = 'chargeAmount="'.$database->escape($chargeAmount).'"';
		}
		if (key_exists('incomeAmount', $param)) {
			$field[] = 'incomeAmount="'.$database->escape($incomeAmount).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_finance set '.implode(',', $field);
		$result = $database->execute($sql);
		$insertId = 0;
		if (!$result || ($insertId = (int)$database->getInsertId()) <= 0) {
			$database->close();
			$resp->msg = '插入失败';
			return $resp;
		}
		$database->close();
		$resp->data = $insertId;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function updateFinance($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$financeId = (int)$param['financeId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$cashConsumeSumAmount = (int)$param['cashConsumeSumAmount'];
		$chargeConsumeSumAmount = (int)$param['chargeConsumeSumAmount'];
		$incomeConsumeSumAmount = (int)$param['incomeConsumeSumAmount'];
		$couponConsumeSumAmount = (int)$param['couponConsumeSumAmount'];
		$consumeSumAmount = (int)$param['consumeSumAmount'];
		$recommendIncomeSumAmount = (int)$param['recommendIncomeSumAmount'];
		$spreadIncomeSumAmount = (int)$param['spreadIncomeSumAmount'];
		$prizeIncomeSumAmount = (int)$param['prizeIncomeSumAmount'];
		$divideIncomeSumAmount = (int)$param['divideIncomeSumAmount'];
		$incomeSumAmount = (int)$param['incomeSumAmount'];
		$withdrawingSumAmount = (int)$param['withdrawingSumAmount'];
		$withdrewSumAmount = (int)$param['withdrewSumAmount'];
		$withdrawSumAmount = (int)$param['withdrawSumAmount'];
		$userChargeSumAmount = (int)$param['userChargeSumAmount'];
		$platformChargeSumAmount = (int)$param['platformChargeSumAmount'];
		$chargeSumAmount = (int)$param['chargeSumAmount'];
		$chargeFreezeSumAmount = (int)$param['chargeFreezeSumAmount'];
		$incomeFreezeSumAmount = (int)$param['incomeFreezeSumAmount'];
		$chargeAmount = (int)$param['chargeAmount'];
		$incomeAmount = (int)$param['incomeAmount'];
		$dataVersion = (int)$param['dataVersion'];
		if ($financeId <= 0) {
			$database->close();
			$resp->msg = 'financeId有误';
			return $resp;
		}
		if (!key_exists('dataVersion', $param)) {
			$database->close();
			$resp->msg = 'dataVersion有误';
			return $resp;
		}
		$field = array();
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';
		}
		if (key_exists('cashConsumeSumAmount', $param)) {
			$field[] = 'cashConsumeSumAmount="'.$database->escape($cashConsumeSumAmount).'"';
		}
		if (key_exists('chargeConsumeSumAmount', $param)) {
			$field[] = 'chargeConsumeSumAmount="'.$database->escape($chargeConsumeSumAmount).'"';
		}
		if (key_exists('incomeConsumeSumAmount', $param)) {
			$field[] = 'incomeConsumeSumAmount="'.$database->escape($incomeConsumeSumAmount).'"';
		}
		if (key_exists('couponConsumeSumAmount', $param)) {
			$field[] = 'couponConsumeSumAmount="'.$database->escape($couponConsumeSumAmount).'"';
		}
		if (key_exists('consumeSumAmount', $param)) {
			$field[] = 'consumeSumAmount="'.$database->escape($consumeSumAmount).'"';
		}
		if (key_exists('recommendIncomeSumAmount', $param)) {
			$field[] = 'recommendIncomeSumAmount="'.$database->escape($recommendIncomeSumAmount).'"';
		}
		if (key_exists('spreadIncomeSumAmount', $param)) {
			$field[] = 'spreadIncomeSumAmount="'.$database->escape($spreadIncomeSumAmount).'"';
		}
		if (key_exists('prizeIncomeSumAmount', $param)) {
			$field[] = 'prizeIncomeSumAmount="'.$database->escape($prizeIncomeSumAmount).'"';
		}
		if (key_exists('divideIncomeSumAmount', $param)) {
			$field[] = 'divideIncomeSumAmount="'.$database->escape($divideIncomeSumAmount).'"';
		}
		if (key_exists('incomeSumAmount', $param)) {
			$field[] = 'incomeSumAmount="'.$database->escape($incomeSumAmount).'"';
		}
		if (key_exists('withdrawingSumAmount', $param)) {
			$field[] = 'withdrawingSumAmount="'.$database->escape($withdrawingSumAmount).'"';
		}
		if (key_exists('withdrewSumAmount', $param)) {
			$field[] = 'withdrewSumAmount="'.$database->escape($withdrewSumAmount).'"';
		}
		if (key_exists('withdrawSumAmount', $param)) {
			$field[] = 'withdrawSumAmount="'.$database->escape($withdrawSumAmount).'"';
		}
		if (key_exists('userChargeSumAmount', $param)) {
			$field[] = 'userChargeSumAmount="'.$database->escape($userChargeSumAmount).'"';
		}
		if (key_exists('platformChargeSumAmount', $param)) {
			$field[] = 'platformChargeSumAmount="'.$database->escape($platformChargeSumAmount).'"';
		}
		if (key_exists('chargeSumAmount', $param)) {
			$field[] = 'chargeSumAmount="'.$database->escape($chargeSumAmount).'"';
		}
		if (key_exists('chargeFreezeSumAmount', $param)) {
			$field[] = 'chargeFreezeSumAmount="'.$database->escape($chargeFreezeSumAmount).'"';
		}
		if (key_exists('incomeFreezeSumAmount', $param)) {
			$field[] = 'incomeFreezeSumAmount="'.$database->escape($incomeFreezeSumAmount).'"';
		}
		if (key_exists('chargeAmount', $param)) {
			$field[] = 'chargeAmount="'.$database->escape($chargeAmount).'"';
		}
		if (key_exists('incomeAmount', $param)) {
			$field[] = 'incomeAmount="'.$database->escape($incomeAmount).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$field[] = 'dataVersion=dataVersion+1';
		$sql = 'update t_finance set '.implode(',', $field).' where financeId="'.$financeId.'" and dataVersion="'.$dataVersion.'" limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '更新失败';
			return $resp;
		}
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectFinanceByUserId($financeType, $userId) {
		$resp = requireModule('Resp');
		$financeType = (int)$financeType;
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'userId="'.$database->escape($userId).'" and financeType="'.$database->escape($financeType).'"';
		$column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance where discard=0 and '.$field.' limit 1';
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

    public function selectFinanceExtraByUserId($financeType, $userId) {
        $resp = requireModule('Resp');
        $financeType = (int)$financeType;
        $userId = (int)$userId;
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'userId="'.$database->escape($userId).'" and financeType="'.$database->escape($financeType).'"';
        $column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
        $sql = 'select '.$column.' from t_finance_extra where discard=0 and '.$field.' limit 1';
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

	public function selectFinance($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$financeId = (int)$param['financeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($financeId > 0) {
			$field[] = 'financeId="'.$financeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_finance where '.$field;
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
		$column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance where '.$field.' order by financeId desc '.$page;
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

	public function selectFinanceExtra($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$financeId = (int)$param['financeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($financeId > 0) {
			$field[] = 'financeId="'.$financeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_finance_extra where '.$field;
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
		$column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_extra where '.$field.' order by financeId desc '.$page;
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

	public function selectFinanceRecordById($recordId) {
		$resp = requireModule('Resp');
		$recordId = (int)$recordId;
		if ($recordId <= 0) {
			$resp->msg = 'recordId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'recordId="'.$database->escape($recordId).'"';
		$column = 'recordId,financeType,userId,nickName,realName,type,orderId,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_record where discard=0 and '.$field.' limit 1';
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

	public function selectFinanceRecord($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$recordId = (int)$param['recordId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$type = $param['type'];
		$orderId = (int)$param['orderId'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($recordId > 0) {
			$field[] = 'recordId="'.$recordId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
		}
		if ($orderId > 0) {
			$field[] = 'orderId="'.$orderId.'"';
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_record where '.$field;
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
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'recordId,financeType,userId,nickName,realName,type,orderId,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_record where '.$field.' order by recordId desc '.$page;
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

	public function selectFinanceWithdrawById($withdrawId) {
		$resp = requireModule('Resp');
		$withdrawId = (int)$withdrawId;
		if ($withdrawId <= 0) {
			$resp->msg = 'withdrawId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'withdrawId="'.$database->escape($withdrawId).'"';
		$column = 'withdrawId,financeType,userId,nickName,realName,status,amount,accountType,accountNumber,accountName,accountUserName,accountInfo,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_withdraw where discard=0 and '.$field.' limit 1';
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

	public function selectFinanceWithdraw($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$withdrawId = $param['withdrawId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$status = $param['status'];
		$accountType = (int)$param['accountType'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_array($withdrawId)) {
			$withdrawId = $this->common->filterIdArray($withdrawId);
			if (count($withdrawId) > 0) {
				$field[] = 'withdrawId in('.implode(',', $withdrawId).')';
			}
		} else if (is_numeric($withdrawId)) {
			$withdrawId = (int)$withdrawId;
			if ($withdrawId > 0) {
				$field[] = 'withdrawId="'.$database->escape($withdrawId).'"';
			}
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if (is_array($status)) {
			$status = $this->common->filterIdArray($status);
			if (count($status) > 0) {
				$field[] = 'status in('.implode(',', $status).')';
			}
		} else if (is_numeric($status)) {
			$status = (int)$status;
			if ($status > 0) {
				$field[] = 'status="'.$database->escape($status).'"';
			}
		}
		if ($accountType > 0) {
			$field[] = 'accountType="'.$accountType.'"';
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_withdraw where '.$field;
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
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'withdrawId,financeType,userId,nickName,realName,status,amount,accountType,accountNumber,accountName,accountUserName,accountInfo,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_withdraw where '.$field.' order by withdrawId desc '.$page;
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

	public function selectFinanceConsume($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$consumeId = (int)$param['consumeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$orderId = (int)$param['orderId'];
		$type = $param['type'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($consumeId > 0) {
			$field[] = 'consumeId="'.$consumeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($orderId > 0) {
			$field[] = 'orderId="'.$orderId.'"';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_consume where '.$field;
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
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'consumeId,financeType,userId,nickName,realName,orderId,type,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_consume where '.$field.' order by consumeId desc '.$page;
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

	public function selectFinanceIncome($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$incomeId = (int)$param['incomeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$orderId = $param['orderId'];
		$planId = (int)$param['planId'];
		$type = $param['type'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($incomeId > 0) {
			$field[] = 'incomeId="'.$incomeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
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
		if ($planId > 0) {
			$field[] = 'planId="'.$planId.'"';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_income where '.$field;
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
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'incomeId,financeType,userId,nickName,realName,orderId,planId,type,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_income where '.$field.' order by incomeId desc '.$page;
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

	public function selectFinanceCharge($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$chargeId = (int)$param['chargeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$orderId = (int)$param['orderId'];
		$type = $param['type'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($chargeId > 0) {
			$field[] = 'chargeId="'.$chargeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($orderId > 0) {
			$field[] = 'orderId="'.$orderId.'"';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_charge where '.$field;
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
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'chargeId,financeType,userId,nickName,realName,orderId,type,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_charge where '.$field.' order by chargeId desc '.$page;
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

	public function selectFinanceFreeze($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$freezeId = (int)$param['freezeId'];
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$orderId = (int)$param['orderId'];
		$type = $param['type'];
		$status = (int)$param['status'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($freezeId > 0) {
			$field[] = 'freezeId="'.$freezeId.'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($orderId > 0) {
			$field[] = 'orderId="'.$orderId.'"';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
		}
		if ($status > 0) {
			$field[] = 'status="'.$status.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_freeze where '.$field;
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
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'freezeId,financeType,userId,nickName,realName,orderId,type,status,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_freeze where '.$field.' order by freezeId desc '.$page;
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

	public function selectFinanceTrade($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$tradeId = (int)$param['tradeId'];
		$tradeType = (int)$param['tradeType'];
		$tradeNo = trim($param['tradeNo']);
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$orderId = (int)$param['orderId'];
		$type = $param['type'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$needNullTradeNo = (bool)$param['needNullTradeNo'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($tradeId > 0) {
			$field[] = 'tradeId="'.$tradeId.'"';
		}
		if (key_exists('tradeType', $param)) {
			$field[] = 'tradeType="'.$database->escape($tradeType).'"';
		}
		if (!empty($tradeNo)) {
			$field[] = 'tradeNo="'.$database->escape($tradeNo).'"';
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($orderId > 0) {
			$field[] = 'orderId="'.$orderId.'"';
		}
		if (is_array($type)) {
			$type = $this->common->filterIdArray($type);
			if (count($type) > 0) {
				$field[] = 'type in('.implode(',', $type).')';
			}
		} else if (is_numeric($type)) {
			$type = (int)$type;
			if ($type > 0) {
				$field[] = 'type="'.$database->escape($type).'"';
			}
		}
		if ($endTime != '') {
			$endTime = strtotime($endTime);
			$endTime = date('Y-m-d', $endTime + 3600 * 24);
		}
		if ($beginTime != '' && $endTime != '') {
			$field[] = 'tradeTime>="'.$database->escape($beginTime).'" and tradeTime<"'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$field[] = 'tradeTime>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$field[] = 'tradeTime<"'.$database->escape($endTime).'"';
		}
		if ($needNullTradeNo) {
			$field[] = 'tradeNo=""';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_trade where '.$field;
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
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'tradeId,tradeType,tradeNo,tradeTime,financeType,userId,nickName,realName,orderId,type,amount,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_trade where '.$field.' order by tradeId desc '.$page;
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

	public function selectFinanceTransfer($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$transferId = $param['transferId'];
		$financeType = (int)$param['financeType'];
		$withdrawId = $param['withdrawId'];
		$batchNo = trim($param['batchNo']);
		$transferNo = trim($param['transferNo']);
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$status = $param['status'];
		$payAccountNumber = trim($param['payAccountNumber']);
		$payAccountName = trim($param['payAccountName']);
		$accountNumber = trim($param['accountNumber']);
		$accountName = trim($param['accountName']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_array($transferId)) {
			$transferId = $this->common->filterIdArray($transferId);
			if (count($transferId) > 0) {
				$field[] = 'transferId in('.implode(',', $transferId).')';
			}
		} else if (is_numeric($transferId)) {
			$transferId = (int)$transferId;
			if ($transferId > 0) {
				$field[] = 'transferId="'.$database->escape($transferId).'"';
			}
		}
		if (key_exists('financeType', $param)) {
			$field[] = 'financeType="'.$database->escape($financeType).'"';
		}
		if (is_array($withdrawId)) {
			$withdrawId = $this->common->filterIdArray($withdrawId);
			if (count($withdrawId) > 0) {
				$field[] = 'withdrawId in('.implode(',', $withdrawId).')';
			}
		} else if (is_numeric($withdrawId)) {
			$withdrawId = (int)$withdrawId;
			if ($withdrawId > 0) {
				$field[] = 'withdrawId="'.$database->escape($withdrawId).'"';
			}
		}
		if ($batchNo != '') {
			$field[] = 'batchNo="'.$batchNo.'"';
		}
		if ($transferNo != '') {
			$field[] = 'transferNo="'.$transferNo.'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if (is_array($status)) {
			$status = $this->common->filterNumArray($status);
			if (count($status) > 0) {
				$field[] = 'status in('.implode(',', $status).')';
			}
		} else if (is_numeric($status)) {
			$status = (int)$status;
			if ($status >= 0) {
				$field[] = 'status="'.$database->escape($status).'"';
			}
		}
		if ($payAccountNumber != '') {
			$field[] = 'payAccountNumber="'.$payAccountNumber.'"';
		}
		if ($payAccountName != '') {
			$field[] = 'payAccountName="'.$payAccountName.'"';
		}
		if ($accountNumber != '') {
			$field[] = 'accountNumber="'.$accountNumber.'"';
		}
		if ($accountName != '') {
			$field[] = 'accountName="'.$accountName.'"';
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
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_finance_transfer where '.$field;
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
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'transferId,financeType,withdrawId,batchNo,transferNo,transferTime,userId,nickName,realName,status,remark,amount,payAccountNumber,payAccountName,accountNumber,accountName,createTime,lastTime';
		$sql = 'select '.$column.' from t_finance_transfer where '.$field.' order by transferId desc '.$page;
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

	public function selectFinanceIncomeByGroup($param) {
		$resp = requireModule('Resp');
		$financeType = (int)$param['financeType'];
		$userId = $this->common->filterIdArray($param['userId']);
		$orderId = $this->common->filterIdArray($param['orderId']);
		$planId = $this->common->filterIdArray($param['planId']);
		$type = (int)$param['type'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$totalCountSql = '';
		$groupSql = '';
		$type = $type > 0 ? 'and type="'.$type.'"' : '';
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		if (is_array($userId) && count($userId) > 0) {
			$userId = implode(',', $userId);
			$totalCountSql = 'select count(*) as totalCount from t_finance_income where discard=0 and financeType="'.$financeType.'" and userId in('.$userId.') '.$type.' group by userId';
			$groupSql = 'select userId,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType="'.$financeType.'" and userId in('.$userId.') '.$type.' group by userId '.$page;
		} else if (is_array($orderId) && count($orderId) > 0) {
			$orderId = implode(',', $orderId);
			$totalCountSql = 'select count(*) as totalCount from t_finance_income where discard=0 and financeType="'.$financeType.'" and orderId in('.$orderId.') '.$type.' group by orderId';
			$groupSql = 'select orderId,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType="'.$financeType.'" and orderId in('.$orderId.') '.$type.' group by orderId '.$page;
		} else if (is_array($planId) && count($planId) > 0) {
			$planId = implode(',', $planId);
			$totalCountSql = 'select count(*) as totalCount from t_finance_income where discard=0 and financeType="'.$financeType.'" and planId in('.$planId.') '.$type.' group by planId';
			$groupSql = 'select planId,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType="'.$financeType.'" and planId in('.$planId.') '.$type.' group by planId '.$page;
		}
		if (empty($totalCountSql) || empty($groupSql)) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$result = $database->execute($groupSql);
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

	public function selectFinanceConsumeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$type = $this->common->filterIdArray($param['type']);//类型, 1=现金消费, 2=充值消费, 3=收益消费
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		if ($userId <= 0 || !is_array($type) || count($type) <= 0) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$type = implode(',', $type);
		$totalCountSql = 'select count(*) as totalCount from t_finance_consume where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type';
		$groupSql = 'select type,count(*) as count,sum(amount) as amount from t_finance_consume where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type '.$page;
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$result = $database->execute($groupSql);
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

	public function selectFinanceIncomeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$type = $this->common->filterIdArray($param['type']);//类型, 1=推荐收益, 2=推广收益
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		if ($userId <= 0 || !is_array($type) || count($type) <= 0) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$type = implode(',', $type);
		$totalCountSql = 'select count(*) as totalCount from t_finance_income where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type';
		$groupSql = 'select type,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type '.$page;
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$result = $database->execute($groupSql);
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

	public function selectFinanceWithdrawByUserGroupStatus($param) {
		$resp = requireModule('Resp');
		$financeType = (int)$param['financeType'];
		$userId = (int)$param['userId'];
		$status = $this->common->filterIdArray($param['status']);//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		if ($userId <= 0 || !is_array($status) || count($status) <= 0) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$status = implode(',', $status);
		$totalCountSql = 'select count(*) as totalCount from t_finance_withdraw where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and status in('.$status.') group by status';
		$groupSql = 'select status,count(*) as count,sum(amount) as amount from t_finance_withdraw where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and status in('.$status.') group by status '.$page;
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
			$data['totalAmount'] = (int)$info["totalAmount"];
		}
		$result = $database->execute($groupSql);
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

	public function selectFinanceChargeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$userId = (int)$param['userId'];
		$financeType = (int)$param['financeType'];
		$type = $this->common->filterIdArray($param['type']);//类型, 1=用户充值, 2=平台充值
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		if ($userId <= 0 || !is_array($type) || count($type) <= 0) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$type = implode(',', $type);
		$totalCountSql = 'select count(*) as totalCount from t_finance_charge where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type';
		$groupSql = 'select type,count(*) as count,sum(amount) as amount from t_finance_charge where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and type in('.$type.') group by type '.$page;
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$result = $database->execute($groupSql);
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

	public function selectFinanceFreezeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$userId = (int)$param['userId'];
		$financeType = (int)$param['financeType'];
		$type = $this->common->filterIdArray($param['type']);//类型, 1=充值, 2=收益
		$status = (int)$param['status'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		if ($userId <= 0 || $status <= 0 || !is_array($type) || count($type) <= 0) {
			$resp->msg = '查询条件有误';
			return $resp;
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$type = implode(',', $type);
		$totalCountSql = 'select count(*) as totalCount from t_finance_freeze where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and status="'.$status.'" and type in('.$type.') group by type';
		$groupSql = 'select type,count(*) as count,sum(amount) as amount from t_finance_freeze where discard=0 and financeType="'.$financeType.'" and userId="'.$userId.'" and status="'.$status.'" and type in('.$type.') group by type '.$page;
		$database = requireModule('Database');
		$data = array("list" => array());
		if ($needCount) {
			$result = $database->execute($totalCountSql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$info = $database->get($result);
			$database->free($result);
			$data['totalCount'] = (int)$info["totalCount"];
		}
		$result = $database->execute($groupSql);
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

    public function updateFinanceSqlExtra($database, $param) {
        $resp = requireModule('Resp');
		if (empty($database)) {
			$resp->msg = 'database有误';
			return $resp;
		}
        $financeId = (int)$param['financeId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        //消费
        $cashConsumeChangeAmount = (int)$param['cashConsumeChangeAmount'];    //现金消费总额
        $chargeConsumeChangeAmount = (int)$param['chargeConsumeChangeAmount'];    //充值消费总额
        $incomeConsumeChangeAmount = (int)$param['incomeConsumeChangeAmount'];    //收益消费总额
        $couponConsumeChangeAmount = (int)$param['couponConsumeChangeAmount'];    //优惠券消费总额
        //收益
        $recommendIncomeChangeAmount = (int)$param['recommendIncomeChangeAmount'];    //推荐收益总额
        $spreadIncomeChangeAmount = (int)$param['spreadIncomeChangeAmount'];  //推广收益总额
        $prizeIncomeChangeAmount = (int)$param['prizeIncomeChangeAmount'];    //中奖收益总额
        $divideIncomeChangeAmount = (int)$param['divideIncomeChangeAmount'];  //分成收益总额
        //提款
        $withdrawingChangeAmount = (int)$param['withdrawingChangeAmount'];    //待提款总额(未审核+已审核)
        $withdrewChangeAmount = (int)$param['withdrewChangeAmount'];  //'已提款总额(已打款)
        //充值
        $userChargeChangeAmount = (int)$param['userChargeChangeAmount'];  //用户充值总额
        $platformChargeChangeAmount = (int)$param['platformChargeChangeAmount'];  //平台充值总额
        //冻结
        $chargeFreezeChangeAmount = (int)$param['chargeFreezeChangeAmount'];  //充值冻结总额
        $incomeFreezeChangeAmount = (int)$param['incomeFreezeChangeAmount'];  //收益冻结总额
        $dataVersion = (int)$param['dataVersion'];
        //消费总额(现金消费，充值消费，收入消费，优惠券消费)
        $consumeChangeAmount = (int)($cashConsumeChangeAmount + $chargeConsumeChangeAmount + $incomeConsumeChangeAmount + $couponConsumeChangeAmount);
        if ($consumeChangeAmount != 0) {
            $param['consumeChangeAmount'] = $consumeChangeAmount;
        }
        //收入总额
        $incomeChangeAmount = (int)($recommendIncomeChangeAmount + $spreadIncomeChangeAmount + $prizeIncomeChangeAmount + $divideIncomeChangeAmount);
        if ($incomeChangeAmount != 0) {
            $param['incomeChangeAmount'] = $incomeChangeAmount;
        }
        //提款总额
        $withdrawChangeAmount = (int)($withdrawingChangeAmount + $withdrewChangeAmount);
        if ($withdrawChangeAmount != 0) {
            $param['withdrawChangeAmount'] = $withdrawChangeAmount;
        }
        //充值总额
        $chargeChangeAmount = (int)($userChargeChangeAmount + $platformChargeChangeAmount);
        if ($chargeChangeAmount != 0) {
            $param['chargeChangeAmount'] = $chargeChangeAmount;
        }
        //剩余充值   $chargeFreezeChangeAmount可能为负数，为负数时，不需要减
        if ($chargeFreezeChangeAmount >= 0) {
            $chargeAmount = (int)($chargeChangeAmount-$chargeConsumeChangeAmount-$chargeFreezeChangeAmount);
        }
        if ($chargeAmount != 0) {
            $param['chargeAmount'] = $chargeAmount;
        }
        //剩余收益
        if ($incomeFreezeChangeAmount >= 0) {
            $incomeAmount = (int)($incomeChangeAmount-$withdrawChangeAmount-$incomeConsumeChangeAmount-$incomeFreezeChangeAmount);
        }
        if ($incomeAmount != 0) {
            $param['incomeAmount'] = $incomeAmount;
        }
        if ($financeId <= 0) {
            $resp->msg = 'financeId有误';
            return $resp;
        }
        if (!key_exists('dataVersion', $param)) {
            $resp->msg = 'dataVersion有误';
            return $resp;
        }
        $field = array();
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('cashConsumeChangeAmount', $param)) {
            $field[] = 'cashConsumeSumAmount=cashConsumeSumAmount+('.$database->escape($cashConsumeChangeAmount).')';
        }
        if (key_exists('chargeConsumeChangeAmount', $param)) {
            $field[] = 'chargeConsumeSumAmount=chargeConsumeSumAmount+('.$database->escape($chargeConsumeChangeAmount).')';
        }
        if (key_exists('incomeConsumeChangeAmount', $param)) {
            $field[] = 'incomeConsumeSumAmount=incomeConsumeSumAmount+('.$database->escape($incomeConsumeChangeAmount).')';
        }
        if (key_exists('couponConsumeChangeAmount', $param)) {
            $field[] = 'couponConsumeSumAmount=couponConsumeSumAmount+('.$database->escape($couponConsumeChangeAmount).')';
        }
        if (key_exists('consumeChangeAmount', $param)) {
            $field[] = 'consumeSumAmount=consumeSumAmount+('.$database->escape($consumeChangeAmount).')';
        }
        if (key_exists('recommendIncomeChangeAmount', $param)) {
            $field[] = 'recommendIncomeSumAmount=recommendIncomeSumAmount+('.$database->escape($recommendIncomeChangeAmount).')';
        }
        if (key_exists('spreadIncomeChangeAmount', $param)) {
            $field[] = 'spreadIncomeSumAmount=spreadIncomeSumAmount+('.$database->escape($spreadIncomeChangeAmount).')';
        }
        if (key_exists('prizeIncomeChangeAmount', $param)) {
            $field[] = 'prizeIncomeSumAmount=prizeIncomeSumAmount+('.$database->escape($prizeIncomeChangeAmount).')';
        }
        if (key_exists('divideIncomeChangeAmount', $param)) {
            $field[] = 'divideIncomeSumAmount=divideIncomeSumAmount+('.$database->escape($divideIncomeChangeAmount).')';
        }
        if (key_exists('incomeChangeAmount', $param)) {
            $field[] = 'incomeSumAmount=incomeSumAmount+('.$database->escape($incomeChangeAmount).')';
        }
        if (key_exists('withdrawingChangeAmount', $param)) {
            $field[] = 'withdrawingSumAmount=withdrawingSumAmount+('.$database->escape($withdrawingChangeAmount).')';
        }
        if (key_exists('withdrewChangeAmount', $param)) {
            $field[] = 'withdrewSumAmount=withdrewSumAmount+('.$database->escape($withdrewChangeAmount).')';
        }
        if (key_exists('withdrawChangeAmount', $param)) {
            $field[] = 'withdrawSumAmount=withdrawSumAmount+('.$database->escape($withdrawChangeAmount).')';
        }
        if (key_exists('userChargeChangeAmount', $param)) {
            $field[] = 'userChargeSumAmount=userChargeSumAmount+('.$database->escape($userChargeChangeAmount).')';
        }
        if (key_exists('platformChargeChangeAmount', $param)) {
            $field[] = 'platformChargeSumAmount=platformChargeSumAmount+('.$database->escape($platformChargeChangeAmount).')';
        }
        if (key_exists('chargeChangeAmount', $param)) {
            $field[] = 'chargeSumAmount=chargeSumAmount+('.$database->escape($chargeChangeAmount).')';
        }
        if (key_exists('chargeFreezeChangeAmount', $param)) {
            $field[] = 'chargeFreezeSumAmount=chargeFreezeSumAmount+('.$database->escape($chargeFreezeChangeAmount).')';
        }
        if (key_exists('incomeFreezeChangeAmount', $param)) {
            $field[] = 'incomeFreezeSumAmount=incomeFreezeSumAmount+('.$database->escape($incomeFreezeChangeAmount).')';
        }
        if (key_exists('chargeAmount', $param)) {
            $field[] = 'chargeAmount=chargeAmount+('.$database->escape($chargeAmount).')';
        }
        if (key_exists('incomeAmount', $param)) {
            $field[] = 'incomeAmount=incomeAmount+('.$database->escape($incomeAmount).')';
        }
        $field[] = 'dataVersion=dataVersion+1';
        if (count($field) == 0) {
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_finance_extra set ' . implode(',', $field) . ' where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
        if (empty($sql)) {
            $resp->msg = 'sql语句生成失败';
            return $resp;
        }
        $resp->errCode = 0;
        $resp->data = $sql;
        $resp->msg = '成功';
        return $resp;
    }
}