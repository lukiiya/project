<?php
namespace dao;
class Guide {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertGuide($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$guideUserId = (int)$param['guideUserId'];
		$guideNickName = trim($param['guideNickName']);
		$guideRealName = trim($param['guideRealName']);
		$accessUserId = (int)$param['accessUserId'];
		$accessNickName = trim($param['accessNickName']);
		$accessRealName = trim($param['accessRealName']);
		$accessPage = trim($param['accessPage']);
		$accessCount = (int)$param['accessCount'];
		$field = array();
		if (key_exists('guideUserId', $param)) {
			$field[] = 'guideUserId="'.$database->escape($guideUserId).'"';
		}
		if (key_exists('guideNickName', $param)) {
			$field[] = 'guideNickName="'.$database->escape($guideNickName).'"';
		}
		if (key_exists('guideRealName', $param)) {
			$field[] = 'guideRealName="'.$database->escape($guideRealName).'"';
		}
		if (key_exists('accessUserId', $param)) {
			$field[] = 'accessUserId="'.$database->escape($accessUserId).'"';
		}
		if (key_exists('accessNickName', $param)) {
			$field[] = 'accessNickName="'.$database->escape($accessNickName).'"';
		}
		if (key_exists('accessRealName', $param)) {
			$field[] = 'accessRealName="'.$database->escape($accessRealName).'"';
		}
		if (key_exists('accessPage', $param)) {
			$field[] = 'accessPage="'.$database->escape($accessPage).'"';
		}
		if (key_exists('accessCount', $param)) {
			$field[] = 'accessCount="'.$database->escape($accessCount).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_guide set '.implode(',', $field);
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

	public function updateGuide($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$guideId = (int)$param['guideId'];
		$accessCount = (int)$param['accessCount'];
		if ($guideId <= 0) {
			$database->close();
			$resp->msg = 'guideId不能为空';
			return $resp;
		}
		$field = array();
		if ($accessCount > 0) {
			$field[] = 'accessCount="'.$database->escape($accessCount).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_guide set '.implode(',', $field).' where guideId="'.$guideId.'" limit 1';
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

	public function selectGuideById($guideId) {
		$resp = requireModule('Resp');
		$guideId = (int)$guideId;
		if ($guideId <= 0) {
			$resp->msg = 'guideId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'guideId="'.$database->escape($guideId).'"';
		$column = 'guideId,guideUserId,guideNickName,guideRealName,accessUserId,accessNickName,accessRealName,accessPage,accessCount,createTime,lastTime';
		$sql = 'select '.$column.' from t_guide where discard=0 and '.$field.' limit 1';
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

	public function selectGuide($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$guideId = (int)$param['guideId'];
		$guideUserId = (int)$param['guideUserId'];
		$guideUserName = trim($param['guideUserName']);
		$accessUserId = (int)$param['accessUserId'];
		$accessUserName = trim($param['accessUserName']);
		$accessPage = trim($param['accessPage']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($guideId > 0) {
			$field[] = 'guideId="'.$guideId.'"';
		}
		if ($guideUserId > 0) {
			$field[] = 'guideUserId="'.$guideUserId.'"';
		}
		if ($guideUserName != '') {
			$field[] = '(guideNickName like "%'.$database->escape($guideUserName).'%" or guideRealName like "%'.$database->escape($guideUserName).'%")';
		}
		if ($accessUserId > 0) {
			$field[] = 'accessUserId="'.$accessUserId.'"';
		}
		if ($accessUserName != '') {
			$field[] = '(accessNickName like "%'.$database->escape($accessUserName).'%" or accessRealName like "%'.$database->escape($accessUserName).'%")';
		}
		if (key_exists('accessPage', $param)) {
			$field[] = 'accessPage="'.$database->escape($accessPage).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_guide where '.$field;
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
		$column = 'guideId,guideUserId,guideNickName,guideRealName,accessUserId,accessNickName,accessRealName,accessPage,accessCount,createTime,lastTime';
		$sql = 'select '.$column.' from t_guide where '.$field.' order by lastTime desc '.$page;
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