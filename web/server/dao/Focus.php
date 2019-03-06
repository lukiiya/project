<?php
namespace dao;
class Focus {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}
	
	public function insertFocus($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$nickName =	trim($param['nickName']);
		$realName = trim($param['realName']);
		$focusUserId = (int)$param['focusUserId'];
		$focusNickName = trim($param['focusNickName']);
		$focusRealName = trim($param['focusRealName']);
		$focusUserRecentPlanId = $param['focusUserRecentPlanId'];
		$status = (int)$param['status'];
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
		if (key_exists('focusUserId', $param)) {
			$field[] = 'focusUserId="'.$database->escape($focusUserId).'"';
		}
		if (key_exists('focusNickName', $param)) {
			$field[] = 'focusNickName="'.$database->escape($focusNickName).'"';
		}
		if (key_exists('focusRealName', $param)) {
			$field[] = 'focusRealName="'.$database->escape($focusRealName).'"';
		}
		if (key_exists('focusUserRecentPlanId', $param) && is_array($focusUserRecentPlanId)) {
			$field[] = 'focusUserRecentPlanId="' .$database->escape(implode(',', $this->common->filterIdArray($focusUserRecentPlanId))). '"';
		}
		if (key_exists('status', $param)) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert t_user_focus set '.implode(',', $field);
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

	public function updateFocus($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$focusId = (int)$param['focusId'];
		$status = (int)$param['status'];
		$focusUserRecentPlanId = $param['focusUserRecentPlanId'];
		if ($focusId <= 0) {
			$resp->msg = 'focusId不能为空';
			return $resp;
		}
		if (key_exists('focusUserRecentPlanId', $param) && is_array($focusUserRecentPlanId)) {
			$field[] = 'focusUserRecentPlanId="' .$database->escape(implode(',', $this->common->filterIdArray($focusUserRecentPlanId))). '"';
		}
		if (key_exists('status', $param)) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_user_focus set '.implode(',', $field).' where focusId=' .$focusId. ' limit 1';
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

	public function selectFocus($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');	
		//查询条件
		$focusId = $param['focusId'];
		$userId = $param['userId'];
		$focusUserId = $param['focusUserId'];
		$status = $param['status'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		//关注id
		if (is_numeric($focusId)) {
			$focusId = (int)$focusId;
			if ($focusId > 0) {
				$field[] = 'focusId="'.$database->escape($focusId).'"';
			}
		} else if (is_array($focusId)) {
			$focusId = $this->common->filterIdArray($focusId);
			if (count($focusId) > 0) {
				$focusId = implode(',', $focusId);
				$field[] = 'focusId in('.$database->escape($focusId).')';
			}
		}
		//用户id
		if (is_numeric($userId)) {
			$userId = (int)$userId;
			if ($userId > 0) {
				$field[] = 'userId="'.$database->escape($userId).'"';
			}
		} else if (is_array($userId)) {
			$userId = $this->common->filterIdArray($userId);
			if (count($userId) > 0) {
				$userId = implode(',', $userId);
				$field[] = 'userId in(' . $database->escape($userId) . ')';
			}
		}
		//关注用户id
		if (is_numeric($focusUserId)) {
			$focusUserId = (int)$focusUserId;
			if ($userId > 0) {
				$field[] = 'focusUserId="'.$database->escape($focusUserId).'"';
			}
		} else if (is_array($focusUserId)) {
			$focusUserId = $this->common->filterIdArray($focusUserId);
			if (count($focusUserId) > 0) {
				$focusUserId = implode(',', $focusUserId);
				$field[] = 'focusUserId in(' . $database->escape($focusUserId) . ')';
			}
		}
		if (is_numeric($status)) {
			$status = (int)$status;
			if ($status > 0) {
				$field[] = 'status="'.$database->escape($status).'"';
			}
		} else if (is_array($status)) {
			$status = $this->common->filterIdArray($status);
			if (count($status) > 0) {
				$status = implode(',', $status);
				$field[] = 'status in('.$database->escape($status).')';
			}
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_user_focus where '.$field;
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
		$orderBy = 'order by lastTime desc';
		$sql = 'select focusId,userId,nickName,realName,focusUserId,focusNickName,focusRealName,focusUserRecentPlanId,status,createTime,lastTime from t_user_focus where '.$field.' '.$orderBy.' '.$page;
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
}