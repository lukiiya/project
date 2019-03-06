<?php
namespace dao;
class Weixin {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function updateWeixinKey($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$keyId = (int)$param['keyId'];
		$accessToken = trim($param['accessToken']);
		$accessTokenExpireTime = (int)$param['accessTokenExpireTime'];
		$jsapiTicket = trim($param['jsapiTicket']);
		$jsapiTicketExpireTime = (int)$param['jsapiTicketExpireTime'];
		if ($keyId <= 0) {
			$database->close();
			$resp->msg = 'keyId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('accessToken', $param)) {
			$field[] = 'accessToken="'.$database->escape($accessToken).'"';
		}
		if (key_exists('accessTokenExpireTime', $param)) {
			$field[] = 'accessTokenExpireTime="'.$database->escape($accessTokenExpireTime).'"';
		}
		if (key_exists('jsapiTicket', $param)) {
			$field[] = 'jsapiTicket="'.$database->escape($jsapiTicket).'"';
		}
		if (key_exists('jsapiTicketExpireTime', $param)) {
			$field[] = 'jsapiTicketExpireTime="'.$database->escape($jsapiTicketExpireTime).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_weixin_key set '.implode(',', $field).' where keyId="'.$keyId.'" limit 1';
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

	public function selectWeixinKeyById($keyId) {
		$resp = requireModule('Resp');
		$keyId = (int)$keyId;
		if ($keyId <= 0) {
			$resp->msg = 'keyId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'keyId="'.$database->escape($keyId).'"';
		$column = 'keyId,publicName,accessToken,accessTokenExpireTime,jsapiTicket,jsapiTicketExpireTime,createTime,lastTime';
		$sql = 'select '.$column.' from t_weixin_key where discard=0 and '.$field.' limit 1';
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
}