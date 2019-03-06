<?php
namespace dao;
class Resource {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertResource($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$type = (int)$param['type'];
		$fileName = trim($param['fileName']);
		$extension = trim($param['extension']);
		$url = trim($param['url']);
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('fileName', $param)) {
			$field[] = 'fileName="'.$database->escape($fileName).'"';
		}
		if (key_exists('extension', $param)) {
			$field[] = 'extension="'.$database->escape($extension).'"';
		}
		if (key_exists('url', $param)) {
			$field[] = 'url="'.$database->escape($url).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_resource set '.implode(',', $field);
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

	public function selectResourceById($resourceId) {
		$resp = requireModule('Resp');
		$resourceId = (int)$resourceId;
		if ($resourceId <= 0) {
			$resp->msg = 'resourceId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'resourceId="'.$database->escape($resourceId).'"';
		$column = 'resourceId,type,fileName,extension,url,createTime,lastTime';
		$sql = 'select '.$column.' from t_resource where discard=0 and '.$field.' limit 1';
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

	public function selectResource($param) {
		$resp = requireModule('Resp');
		$resourceId = $param['resourceId'];
		$type = (int)$param['type'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_array($resourceId)) {
			$resourceId = $this->common->filterIdArray($resourceId);
			if (count($resourceId) > 0) {
				$field[] = 'resourceId in('.implode(',', $resourceId).')';
			}
		} else if (is_numeric($resourceId)) {
			$resourceId = (int)$resourceId;
			if ($resourceId > 0) {
				$field[] = 'resourceId="'.$resourceId.'"';
			}
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		$database = requireModule('Database');
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_resource where '.$field;
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
		$column = 'resourceId,type,fileName,extension,url,createTime,lastTime';
		$sql = 'select '.$column.' from t_resource where '.$field.' '.$page;
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