<?php
namespace dao;
class Station {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertStationDeposit($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $date = trim($param['date']);
        $amount = (int)$param['amount'];
		$field = array();
		if (key_exists('userId', $param)) {
			$field[] = 'userId="'.$database->escape($userId).'"';
		}
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';
		}
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('date', $param)) {
            $field[] = 'date="'.$database->escape($date).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_station_deposit set '.implode(',', $field);
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

    public function updateStationDeposit($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $depositId = (int)$param['depositId'];
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $date = trim($param['date']);
        $amount = (int)$param['amount'];
        if ($depositId <= 0) {
            $database->close();
            $resp->msg = 'depositId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('userId', $param)) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('date', $param)) {
            $field[] = 'date="'.$database->escape($date).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_station_deposit set '.implode(',', $field).' where depositId="'.$depositId.'" limit 1';
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

    public function deleteStationDeposit($depositId) {
        $resp = requireModule('Resp');
        $depositId = (int)$depositId;
        if ($depositId <= 0) {
            $resp->msg = 'depositId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_station_deposit set discard=1 where depositId="'.$depositId.'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '删除失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectStationDepositById($depositId) {
        $resp = requireModule('Resp');
        $depositId = (int)$depositId;
        if ($depositId <= 0) {
            $resp->msg = 'depositId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'depositId="'.$database->escape($depositId).'"';
        $column = 'depositId,userId,nickName,realName,date,amount,createTime,lastTime';
        $sql = 'select '.$column.' from t_station_deposit where discard=0 and '.$field.' limit 1';
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

    public function selectStationDeposit($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $depositId = (int)$param['depositId'];
        $userId = $param['userId'];
        $userName = trim($param['userName']);
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $justCount = (bool)$param['justCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($depositId > 0) {
            $field[] = 'depositId="'.$database->escape($depositId).'"';
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
        if ($beginTime != '' && $endTime != '') {
            $field[] = 'date>="'.$database->escape($beginTime).'" and date<="'.$database->escape($endTime).'"';
        } else if ($beginTime != '') {
            $field[] = 'date>="'.$database->escape($beginTime).'"';
        } else if ($endTime != '') {
            $field[] = 'date<="'.$database->escape($endTime).'"';
        }
        $field = implode(' and ', $field);
        $data = array();
        if ($needCount || $justCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_station_deposit where '.$field;
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
        if (!$justCount) {
            $page = '';
            if ($pageNum > 0 && $pageSize > 0) {
                $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
            }
            $sql = 'select depositId,userId,nickName,realName,date,amount,createTime,lastTime from t_station_deposit where '.$field.' order by depositId desc '.$page;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $data['list'] = array();
            while($info = $database->get($result)){
                $data['list'][] = $info;
            }
            $database->free($result);
        }
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}