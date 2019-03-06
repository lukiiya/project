<?php
namespace dao;
class AdminUser {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertAdminUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userName = trim($param['userName']);
		$loginName = trim($param['loginName']);
		$password = trim($param['password']);
		$admin = (int)$param['admin'];
		$remark = trim($param['remark']);
		$roleId = $param['roleId'];
		$field = array();
		if (key_exists('userName', $param)) {
			$field[] = 'userName="'.$database->escape($userName).'"';
		}
		if (key_exists('loginName', $param)) {
			$field[] = 'loginName="'.$database->escape($loginName).'"';
		}
		if (key_exists('password', $param)) {
			$field[] = 'password="'.$database->escape($password).'"';
		}
		if (key_exists('admin', $param)) {
			$field[] = 'admin="'.$database->escape($admin).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (is_array($roleId)) {
			$roleId = implode(',', $this->common->filterIdArray($roleId));
			$field[] = 'roleId="'.$database->escape($roleId).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_admin_user set '.implode(',', $field);
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

	public function updateAdminUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$loginName = trim($param['loginName']);
		$password = trim($param['password']);
		$admin = (int)$param['admin'];
		$remark = trim($param['remark']);
		$roleId = $param['roleId'];
		if ($userId <= 0) {
			$database->close();
			$resp->msg = 'userId不能为空';
			return $resp;		
		}
		$field = array();
		if (key_exists('userName', $param)) {
			$field[] = 'userName="'.$database->escape($userName).'"';
		}
		if (key_exists('loginName', $param)) {
			$field[] = 'loginName="'.$database->escape($loginName).'"';
		}
		if (key_exists('password', $param)) {
			$field[] = 'password="'.$database->escape($password).'"';
		}
		if (key_exists('admin', $param)) {
			$field[] = 'admin="'.$database->escape($admin).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (is_array($roleId)) {
			$roleId = implode(',', $this->common->filterIdArray($roleId));
			$field[] = 'roleId="'.$database->escape($roleId).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'update t_admin_user set '.implode(',', $field).' where userId="'.$userId.'" limit 1';
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

	public function deleteAdminUser($userId) {
		$resp = requireModule('Resp');
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_admin_user set discard=1 where userId="'.$userId.'" limit 1';
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

	public function selectAdminUserById($userId) {
		$resp = requireModule('Resp');
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'userId="'.$database->escape($userId).'"';
		$column = 'userId,userName,loginName,password,admin,remark,roleId,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user where discard=0 and '.$field.' limit 1';
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

	public function selectAdminUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$loginName = trim($param['loginName']);
		$password = trim($param['password']);
		$admin = (int)$param['admin'];
		$orderBy = (int)$param['orderBy'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($userId > 0) {
			$field[] = 'userId="'.$database->escape($userId).'"';
		}
		if ($userName != '') {
			$field[] = 'userName like "%'.$database->escape($userName).'%"';
		}
		if ($loginName != '') {
			$field[] = 'loginName="'.$database->escape($loginName).'"';
		}
		if ($password != '') {
			$field[] = 'password="'.$database->escape($password).'"';
		}
		if (key_exists('admin', $param)) {
			$field[] = 'admin="'.$database->escape($admin).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_admin_user where '.$field;
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
		$orderByField = 'order by userId desc';
		if ($orderBy == 1) {
			$orderByField = 'order by userId asc';
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'userId,userName,loginName,password,admin,remark,roleId,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user where '.$field. ' '.$orderByField.' ' .$page;
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

	public function insertAdminUserRole($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$roleName = trim($param['roleName']);
		$remark = trim($param['remark']);
		$rightId = $param['rightId'];
		$menuId = $param['menuId'];
		$field = array();
		if (key_exists('roleName', $param)) {
			$field[] = 'roleName="'.$database->escape($roleName).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (is_array($rightId)) {
			$rightId = implode(',', $this->common->filterIdArray($rightId));
			$field[] = 'rightId="'.$database->escape($rightId).'"';
		}
		if (is_array($menuId)) {
			$menuId = implode(',', $this->common->filterIdArray($menuId));
			$field[] = 'menuId="'.$database->escape($menuId).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_admin_user_role set '.implode(',', $field);
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

	public function updateAdminUserRole($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$roleId = (int)$param['roleId'];
		$roleName = trim($param['roleName']);
		$remark = trim($param['remark']);
		$rightId = $param['rightId'];
		$menuId = $param['menuId'];
		if ($roleId <= 0) {
			$database->close();
			$resp->msg = 'roleId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('roleName', $param)) {
			$field[] = 'roleName="'.$database->escape($roleName).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (is_array($rightId)) {
			$rightId = implode(',', $this->common->filterIdArray($rightId));
			$field[] = 'rightId="'.$database->escape($rightId).'"';
		}
		if (is_array($menuId)) {
			$menuId = implode(',', $this->common->filterIdArray($menuId));
			$field[] = 'menuId="'.$database->escape($menuId).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_admin_user_role set '.implode(',', $field).' where roleId="'.$roleId.'" limit 1';
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

	public function deleteAdminUserRole($roleId) {
		$resp = requireModule('Resp');
		$roleId = (int)$roleId;
		if ($roleId <= 0) {
			$resp->msg = 'roleId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_admin_user_role set discard=1 where roleId="'.$roleId.'" limit 1';
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

	public function selectAdminUserRoleById($roleId) {
		$resp = requireModule('Resp');
		$roleId = (int)$roleId;
		if ($roleId <= 0) {
			$resp->msg = 'roleId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'roleId="'.$database->escape($roleId).'"';
		$column = 'roleId,roleName,remark,rightId,menuId,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_role where discard=0 and '.$field.' limit 1';
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

	public function selectAdminUserRole($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$roleId = $param['roleId'];
		$roleName = trim($param['roleName']);
		$orderBy = (int)$param['orderBy'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($roleId)) {
			$roleId = (int)$roleId;
			if ($roleId > 0) {
				$field[] = 'roleId="'.$database->escape($roleId).'"';
			}
		} else if (is_array($roleId)) {
			$roleId = $this->common->filterIdArray($roleId);
			if (count($roleId) > 0) {
				$roleId = implode(',', $roleId);
				$field[] = 'roleId in('.$database->escape($roleId).')';
			}
		}
		if ($roleName != '') {
			$field[] = 'roleName like "%'.$database->escape($roleName).'%"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_admin_user_role where '.$field;
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
		$orderByField = 'order by roleId desc';
		if ($orderBy == 1) {
			$orderByField = 'order by roleId asc';
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'roleId,roleName,remark,rightId,menuId,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_role where '.$field. ' '.$orderByField.' ' .$page;
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

	public function insertAdminUserRight($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$rightName = trim($param['rightName']);
		$rule = trim($param['rule']);
		$remark = trim($param['remark']);
		$field = array();
		if (key_exists('rightName', $param)) {
			$field[] = 'rightName="'.$database->escape($rightName).'"';
		}
		if (key_exists('rule', $param)) {
			$field[] = 'rule="'.$database->escape($rule).'"';
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
		$sql = 'insert into t_admin_user_right set '.implode(',', $field);
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

	public function updateAdminUserRight($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$rightId = (int)$param['rightId'];
		$rightName = trim($param['rightName']);
		$rule = trim($param['rule']);
		$remark = trim($param['remark']);
		if ($rightId <= 0) {
			$database->close();
			$resp->msg = 'rightId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('rightName', $param)) {
			$field[] = 'rightName="'.$database->escape($rightName).'"';
		}
		if (key_exists('rule', $param)) {
			$field[] = 'rule="'.$database->escape($rule).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_admin_user_right set '.implode(',', $field).' where rightId="'.$rightId.'" limit 1';
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

	public function deleteAdminUserRight($rightId) {
		$resp = requireModule('Resp');
		$rightId = (int)$rightId;
		if ($rightId <= 0) {
			$resp->msg = 'rightId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_admin_user_right set discard=1 where rightId="'.$rightId.'" limit 1';
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

	public function selectAdminUserRightById($rightId) {
		$resp = requireModule('Resp');
		$rightId = (int)$rightId;
		if ($rightId <= 0) {
			$resp->msg = 'rightId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'rightId="'.$database->escape($rightId).'"';
		$column = 'rightId,rightName,rule,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_right where discard=0 and '.$field.' limit 1';
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

	public function selectAdminUserRight($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$rightId = $param['rightId'];
		$rightName = trim($param['rightName']);
		$rule = trim($param['rule']);
		$orderBy = (int)$param['orderBy'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($rightId)) {
			$rightId = (int)$rightId;
			if ($rightId > 0) {
				$field[] = 'rightId="'.$database->escape($rightId).'"';
			}
		} else if (is_array($rightId)) {
			$rightId = $this->common->filterIdArray($rightId);
			if (count($rightId) > 0) {
				$rightId = implode(',', $rightId);
				$field[] = 'rightId in('.$database->escape($rightId).')';
			}
		}
		if ($rightName != '') {
			$field[] = 'rightName like "%'.$database->escape($rightName).'%"';
		}
		if ($rule != '') {
			$field[] = 'rule="'.$database->escape($rule).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_admin_user_right where '.$field;
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
		$orderByField = 'order by rightId desc';
		if ($orderBy == 1) {
			$orderByField = 'order by rightId asc';
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'rightId,rightName,rule,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_right where '.$field. ' '.$orderByField.' ' .$page;
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

	public function insertAdminUserMenu($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$menuName = trim($param['menuName']);
		$parentMenuName = trim($param['parentMenuName']);
		$path = trim($param['path']);
		$remark = trim($param['remark']);
		$field = array();
		if (key_exists('menuName', $param)) {
			$field[] = 'menuName="'.$database->escape($menuName).'"';
		}
		if (key_exists('parentMenuName', $param)) {
			$field[] = 'parentMenuName="'.$database->escape($parentMenuName).'"';
		}
		if (key_exists('path', $param)) {
			$field[] = 'path="'.$database->escape($path).'"';
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
		$sql = 'insert into t_admin_user_menu set '.implode(',', $field);
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

	public function updateAdminUserMenu($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$menuId = (int)$param['menuId'];
		$menuName = trim($param['menuName']);
		$parentMenuName = trim($param['parentMenuName']);
		$path = trim($param['path']);
		$remark = trim($param['remark']);
		if ($menuId <= 0) {
			$database->close();
			$resp->msg = 'menuId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('menuName', $param)) {
			$field[] = 'menuName="'.$database->escape($menuName).'"';
		}
		if (key_exists('parentMenuName', $param)) {
			$field[] = 'parentMenuName="'.$database->escape($parentMenuName).'"';
		}
		if (key_exists('path', $param)) {
			$field[] = 'path="'.$database->escape($path).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_admin_user_menu set '.implode(',', $field).' where menuId="'.$menuId.'" limit 1';
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

	public function deleteAdminUserMenu($menuId) {
		$resp = requireModule('Resp');
		$menuId = (int)$menuId;
		if ($menuId <= 0) {
			$resp->msg = 'menuId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_admin_user_menu set discard=1 where menuId="'.$menuId.'" limit 1';
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

	public function selectAdminUserMenuById($menuId) {
		$resp = requireModule('Resp');
		$menuId = (int)$menuId;
		if ($menuId <= 0) {
			$resp->msg = 'menuId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'menuId="'.$database->escape($menuId).'"';
		$column = 'menuId,menuName,parentMenuName,path,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_menu where discard=0 and '.$field.' limit 1';
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

	public function selectAdminUserMenu($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$menuId = $param['menuId'];
		$menuName = trim($param['menuName']);
		$parentMenuName = trim($param['parentMenuName']);
		$path = trim($param['path']);
		$orderBy = (int)$param['orderBy'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($menuId)) {
			$menuId = (int)$menuId;
			if ($menuId > 0) {
				$field[] = 'menuId="'.$database->escape($menuId).'"';
			}
		} else if (is_array($menuId)) {
			$menuId = $this->common->filterIdArray($menuId);
			if (count($menuId) > 0) {
				$menuId = implode(',', $menuId);
				$field[] = 'menuId in('.$database->escape($menuId).')';
			}
		}
		if ($menuName != '') {
			$field[] = 'menuName like "%'.$database->escape($menuName).'%"';
		}
		if ($parentMenuName != '') {
			$field[] = 'parentMenuName like "%'.$database->escape($parentMenuName).'%"';
		}
		if ($path != '') {
			$field[] = 'path="'.$database->escape($path).'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_admin_user_menu where '.$field;
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
		$orderByField = 'order by menuId desc';
		if ($orderBy == 1) {
			$orderByField = 'order by menuId asc';
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'menuId,menuName,parentMenuName,path,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_admin_user_menu where '.$field. ' '.$orderByField.' ' .$page;
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