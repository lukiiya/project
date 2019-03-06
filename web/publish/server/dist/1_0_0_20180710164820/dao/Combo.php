<?php
namespace dao;
class Combo {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertCombo($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$comboType = (int)$param['comboType'];
		$title = trim($param['title']);
		$amount = (int)$param['amount'];
		$presentAmount = (int)$param['presentAmount'];
		$spanTime = (int)$param['spanTime'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		$field = array();
		if (key_exists('comboType', $param)) {
			$field[] = 'comboType="'.$database->escape($comboType).'"';
		}
		if (key_exists('title', $param)) {
			$field[] = 'title="'.$database->escape($title).'"';
		}
		if (key_exists('amount', $param)) {
			$field[] = 'amount="'.$database->escape($amount).'"';
		}
		if (key_exists('presentAmount', $param)) {
			$field[] = 'presentAmount="'.$database->escape($presentAmount).'"';
		}
		if (key_exists('spanTime', $param)) {
			$field[] = 'spanTime="'.$database->escape($spanTime).'"';
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
		$sql = 'insert into t_combo set '.implode(',', $field);
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

	public function updateCombo($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$comboId = (int)$param['comboId'];
		$comboType = (int)$param['comboType'];
		$title = trim($param['title']);
		$amount = (int)$param['amount'];
		$presentAmount = (int)$param['presentAmount'];
		$spanTime = (int)$param['spanTime'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		if ($comboId <= 0) {
			$database->close();
			$resp->msg = 'comboId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('comboType', $param)) {
			$field[] = 'comboType="'.$database->escape($comboType).'"';
		}
		if (key_exists('title', $param)) {
			$field[] = 'title="'.$database->escape($title).'"';
		}
		if (key_exists('amount', $param)) {
			$field[] = 'amount="'.$database->escape($amount).'"';
		}
		if (key_exists('presentAmount', $param)) {
			$field[] = 'presentAmount="'.$database->escape($presentAmount).'"';
		}
		if (key_exists('spanTime', $param)) {
			$field[] = 'spanTime="'.$database->escape($spanTime).'"';
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
		$sql = 'update t_combo set '.implode(',', $field).' where comboId="'.$comboId.'" limit 1';
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

	public function selectComboById($comboId) {
		$resp = requireModule('Resp');
		$comboId = (int)$comboId;
		if ($comboId <= 0) {
			$resp->msg = 'comboId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'comboId="'.$database->escape($comboId).'"';
		$column = 'comboId,comboType,title,amount,presentAmount,spanTime,publish,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_combo where discard=0 and '.$field.' limit 1';
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

	public function selectCombo($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$comboId = $param['comboId'];
		$comboType = (int)$param['comboType'];
		$title = trim($param['title']);
		$publish = (int)$param['publish'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($comboId)) {
			$field[] = 'comboId="'.$database->escape($comboId).'"';
		} else if (is_array($comboId)) {
			$comboId = $this->common->filterIdArray($comboId);
			$comboId = implode(',', $comboId);
			$field[] = 'comboId in('.$database->escape($comboId).')';
		}
		if ($comboType > 0) {
			$field[] = 'comboType="'.$database->escape($comboType).'"';
		}
		if ($title != '') {
			$field[] = 'title like "%'.$database->escape($title).'%"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_combo where '.$field;
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
		$column = 'comboId,comboType,title,amount,presentAmount,spanTime,publish,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_combo where '.$field.' '.$page;
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