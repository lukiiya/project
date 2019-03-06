<?php
namespace dao;
class Sms {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function replaceSmsCode($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$mobile = trim($param['mobile']);
		$code = trim($param['code']);
		$time = trim($param['time']);
		$field = array();
		if (key_exists('mobile', $param)) {
			$field[] = 'mobile="'.$database->escape($mobile).'"';
		}
		if (key_exists('code', $param)) {
			$field[] = 'code="'.$database->escape($code).'"';
		}
		if (key_exists('time', $param)) {
			$field[] = 'time="'.$database->escape($time).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'replace into t_sms_code set '.implode(',', $field);
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '替换失败';
			return $resp;
		}
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function insertSmsCodeCount($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$ip = trim($param['ip']);
		$count = (int)$param['count'];
		$time = trim($param['time']);
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
		if (key_exists('ip', $param)) {
			$field[] = 'ip="'.$database->escape($ip).'"';
		}
		if (key_exists('count', $param)) {
			$field[] = 'count="'.$database->escape($count).'"';
		}
		if (key_exists('time', $param)) {
			$field[] = 'time="'.$database->escape($time).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_sms_code_count set '.implode(',', $field);
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$resp->msg = '替换失败';
			return $resp;
		}
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function updateSmsCodeCount($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$countId = (int)$param['countId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$count = (int)$param['count'];
		$time = trim($param['time']);
		if ($countId <= 0) {
			$database->close();
			$resp->msg = 'countId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';
		}
		if (key_exists('count', $param)) {
			$field[] = 'count="'.$database->escape($count).'"';
		}
		if (key_exists('time', $param)) {
			$field[] = 'time="'.$database->escape($time).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_sms_code_count set '.implode(',', $field).' where countId="'.$countId.'" limit 1';
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

	public function selectSmsCode($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$mobile = trim($param['mobile']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = '1';//防止没参数,sql错误
		if (!empty($mobile)) {
			$field[] = 'mobile="'.$mobile.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_sms_code where '.$field;
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
        $column = 'mobile,code,time';
		$sql = 'select '.$column.' from t_sms_code where '.$field.' order by time desc '.$page;
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

	public function selectSmsCodeCount($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$ip = trim($param['ip']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = '1';//防止没参数,sql错误
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if (!empty($ip)) {
			$field[] = 'ip="'.$ip.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_sms_code_count where '.$field;
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
		$column = 'countId,userId,nickName,realName,ip,count,time,lastTime';
		$sql = 'select '.$column.' from t_sms_code_count where '.$field.' order by time desc '.$page;
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