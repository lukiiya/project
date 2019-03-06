<?php
namespace dao;
class Group {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertGroup($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$type = (int)$param['type'];
		$name = trim($param['name']);
		$relateId = $param['relateId'];
		$sort = (int)$param['sort'];
		$publish = (int)$param['publish'];
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('name', $param)) {
			$field[] = 'name="'.$database->escape($name).'"';
		}
		if (key_exists('relateId', $param)) {
			$relateId = $this->common->filterIdArray($relateId);
			$field[] = 'relateId="'.$database->escape(implode(',', $relateId)).'"';
		}
		if (key_exists('sort', $param)) {
			$field[] = 'sort="'.$database->escape($sort).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_group set '.implode(',', $field);
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

	public function updateGroup($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$groupId = (int)$param['groupId'];
		$type = (int)$param['type'];
		$name = trim($param['name']);
		$relateId = $param['relateId'];
		$sort = (int)$param['sort'];
		$publish = (int)$param['publish'];
		if ($groupId <= 0) {
			$database->close();
			$resp->msg = 'groupId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('name', $param)) {
			$field[] = 'name="'.$database->escape($name).'"';
		}
		if (key_exists('relateId', $param)) {
			$relateId = $this->common->filterIdArray($relateId);
			$field[] = 'relateId="'.$database->escape(implode(',', $relateId)).'"';
		}
		if (key_exists('sort', $param)) {
			$field[] = 'sort="'.$database->escape($sort).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_group set '.implode(',', $field).' where groupId="'.$groupId.'" limit 1';
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

	public function selectGroupById($groupId) {
		$resp = requireModule('Resp');
		$groupId = (int)$groupId;
		if ($groupId <= 0) {
			$resp->msg = 'groupId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'groupId="'.$database->escape($groupId).'"';
		$column = 'groupId,type,name,relateId,sort,publish,createTime,lastTime';
		$sql = 'select '.$column.' from t_group where discard=0 and '.$field.' limit 1';
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

	public function selectGroup($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$groupId = (int)$param['groupId'];
		$type = (int)$param['type'];
		$publish = (int)$param['publish'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($groupId > 0) {
			$field[] = 'groupId="'.$groupId.'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_group where '.$field;
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
		$column = 'groupId,type,name,relateId,sort,publish,createTime,lastTime';
		$sql = 'select '.$column.' from t_group where '.$field.' order by sort desc '.$page;
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