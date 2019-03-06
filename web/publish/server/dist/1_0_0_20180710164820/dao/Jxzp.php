<?php
namespace dao;
class Jxzp {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}
	
	public function insertJxzp($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$type = (int)$param['type'];
		$teamName = trim($param['teamName']);
		$matchId = (int)$param['matchId'];
		$matchBeginTime = trim($param['matchBeginTime']);
		$oddsId = (int)$param['oddsId'];
		$recommend = trim($param['recommend']);
		$closeTime = trim($param['closeTime']);
		$status = (int)$param['status'];
		$recentContinue = (int)$param['recentContinue'];
		$historyContinue = (int)$param['historyContinue'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('teamName', $param)) {
			$field[] = 'teamName="'.$database->escape($teamName).'"';
		}
		if (key_exists('matchId', $param)) {
			$field[] = 'matchId="'.$database->escape($matchId).'"';
		}
		if (key_exists('matchBeginTime', $param)) {
			$field[] = 'matchBeginTime="'.$database->escape($matchBeginTime).'"';
		}
		if (key_exists('oddsId', $param)) {
			$field[] = 'oddsId="'.$database->escape($oddsId).'"';
		}
		if (key_exists('recommend', $param)) {
			$field[] = 'recommend="'.$database->escape($recommend).'"';
		}
		if (key_exists('closeTime', $param)) {
			$field[] = 'closeTime="'.$database->escape($closeTime).'"';
		}
		if (key_exists('status', $param)) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		if (key_exists('recentContinue', $param)) {
			$field[] = 'recentContinue="'.$database->escape($recentContinue).'"';
		}
		if (key_exists('historyContinue', $param)) {
			$field[] = 'historyContinue="'.$database->escape($historyContinue).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_jxzp set '.implode(',', $field);
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

	public function updateJxzp($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$jxzpId = (int)$param['jxzpId'];
		$type = (int)$param['type'];
		$teamName = trim($param['teamName']);
		$matchId = (int)$param['matchId'];
		$oddsId = (int)$param['oddsId'];
		$recommend = trim($param['recommend']);
		$closeTime = trim($param['closeTime']);
		$status = (int)$param['status'];
		$recentContinue = (int)$param['recentContinue'];
		$historyContinue = (int)$param['historyContinue'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		if ($jxzpId <= 0) {
			$database->close();
			$resp->msg = 'jxzpId不能为空';
			return $resp;		
		}
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('teamName', $param)) {
			$field[] = 'teamName="'.$database->escape($teamName).'"';
		}
		if (key_exists('matchId', $param)) {
			$field[] = 'matchId="'.$database->escape($matchId).'"';
		}
		if (key_exists('oddsId', $param)) {
			$field[] = 'oddsId="'.$database->escape($oddsId).'"';
		}
		if (key_exists('recommend', $param)) {
			$field[] = 'recommend="'.$database->escape($recommend).'"';
		}
		if (key_exists('closeTime', $param)) {
			$field[] = 'closeTime="'.$database->escape($closeTime).'"';
		}
		if (key_exists('status', $param)) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		if (key_exists('recentContinue', $param)) {
			$field[] = 'recentContinue="'.$database->escape($recentContinue).'"';
		}
		if (key_exists('historyContinue', $param)) {
			$field[] = 'historyContinue="'.$database->escape($historyContinue).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'update t_jxzp set '.implode(',', $field).' where jxzpId="'.$jxzpId.'" limit 1';
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

	public function selectJxzpById($jxzpId) {
		$resp = requireModule('Resp');
		$jxzpId = (int)$jxzpId;
		if ($jxzpId <= 0) {
			$resp->msg = 'jxzpId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'jxzpId="'.$database->escape($jxzpId).'"';
		$column = 'jxzpId,type,teamName,matchId,matchBeginTime,oddsId,prizeStatus,recommend,prize,bettypeResult,bettypePrize,closeTime,status,recentContinue,historyContinue,publish,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_jxzp where discard=0 and '.$field.' limit 1';
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

	public function selectJxzp($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$jxzpId = (int)$param['jxzpId'];
		$type = (int)$param['type'];
		$teamName = trim($param['teamName']);
		$matchId = (int)$param['matchId'];
		$prizeStatus = $param['prizeStatus'];
		$status = (int)$param['status'];
		$publish = (int)$param['publish'];
		$needOpen = (bool)$param['needOpen'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($jxzpId > 0) {
			$field[] = 'jxzpId="'.$database->escape($jxzpId).'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if ($teamName != '') {
			$field[] = 'teamName like "%'.$database->escape($teamName).'%"';
		}
		if ($matchId > 0) {
			$field[] = 'matchId="'.$database->escape($matchId).'"';
		}
		if (is_numeric($prizeStatus)) {
			$field[] = 'prizeStatus="'.$database->escape($prizeStatus).'"';
		} else if (is_array($prizeStatus)) {
			$prizeStatus = $this->common->filterIdArray($prizeStatus);
			$prizeStatus = implode(',', $prizeStatus);
			$field[] = 'prizeStatus in('.$database->escape($prizeStatus).')';
		}
		if ($status > 0) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		if ($needOpen) {
			$field[] = 'publish=1 and closeTime > now()';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_jxzp where '.$field;
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
		$orderBy = 'order by jxzpId desc';
		if ($needOpen) {
			$orderBy = 'order by matchBeginTime asc, jxzpId';
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'jxzpId,type,teamName,matchId,matchBeginTime,oddsId,prizeStatus,recommend,prize,bettypeResult,bettypePrize,closeTime,status,recentContinue,historyContinue,publish,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_jxzp where '.$field.' '.$orderBy.' '.$page;
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

	public function selectJxzpGroupPrizeStatus() {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$groupSql = 'select prizeStatus,count(*) as count from t_jxzp where discard=0 group by prizeStatus';
		$result = $database->execute($groupSql);
		if (!$result) {
			$database->close();
			$resp->msg = '查询失败';
			return $resp;
		}
		$data = array("list" => array());
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