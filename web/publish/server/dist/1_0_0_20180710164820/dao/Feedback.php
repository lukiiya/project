<?php
namespace dao;
class Feedback {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertFeedback($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$content = trim($param['content']);
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
		if (key_exists('content', $param)) {
			$field[] = 'content="'.$database->escape($content).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_feedback set '.implode(',', $field);
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

	public function selectFeedbackById($feedbackId) {
		$resp = requireModule('Resp');
		$feedbackId = (int)$feedbackId;
		if ($feedbackId <= 0) {
			$resp->msg = 'feedbackId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'feedbackId="'.$database->escape($feedbackId).'"';
		$column = 'feedbackId,userId,nickName,realName,content,createTime,lastTime';
		$sql = 'select '.$column.' from t_feedback where discard=0 and '.$field.' limit 1';
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

	public function selectFeedback($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$feedbackId = (int)$param['feedbackId'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_array($feedbackId)) {
			$feedbackId = $this->common->filterIdArray($feedbackId);
			if (count($feedbackId) > 0) {
				$field[] = 'feedbackId in('.implode(',', $feedbackId).')';
			}
		} else if (is_numeric($feedbackId)) {
			$feedbackId = (int)$feedbackId;
			if ($feedbackId > 0) {
				$field[] = 'feedbackId="'.$feedbackId.'"';
			}
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
			$sql = 'select count(*) as totalCount from t_feedback where '.$field;
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
		$orderBy = 'order by feedbackId desc';
		$column = 'feedbackId,userId,nickName,realName,content,createTime,lastTime';
		$sql = 'select '.$column.' from t_feedback where '.$field.' '.$orderBy.' '.$page;
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