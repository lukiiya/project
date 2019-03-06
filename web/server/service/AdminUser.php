<?php
namespace service;
class AdminUser extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("AdminUser");
	}

	public function insertAdminUser($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertAdminUserResp = $this->dao->insertAdminUser($param);
		if ($insertAdminUserResp->errCode != 0) {
			$resp->msg = $insertAdminUserResp->msg;
			return $resp;	
		}
		$resp->data = $insertAdminUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateAdminUser($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = (int)$param['userId'];
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;	
		}
		$updateAdminUserResp = $this->dao->updateAdminUser($param);
		if ($updateAdminUserResp->errCode != 0) {
			$resp->msg = $updateAdminUserResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function deleteAdminUser($userId) {
		$resp = requireModule("Resp");
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;
		}
		$deleteAdminUserResp = $this->dao->deleteAdminUser($userId);
		if ($deleteAdminUserResp->errCode != 0) {
			$resp->msg = $deleteAdminUserResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserById($userId) {
		$resp = requireModule('Resp');
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;
		}
		$selectAdminUserByIdResp = $this->dao->selectAdminUserById($userId);
		if ($selectAdminUserByIdResp->errCode != 0) {
			$resp->msg = $selectAdminUserByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectAdminUserByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUser($param) {
		$resp = requireModule('Resp');
		$selectAdminUserResp = $this->dao->selectAdminUser($param);
		if ($selectAdminUserResp->errCode != 0) {
			$resp->msg = $selectAdminUserResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function insertAdminUserRole($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertAdminUserRoleResp = $this->dao->insertAdminUserRole($param);
		if ($insertAdminUserRoleResp->errCode != 0) {
			$resp->msg = $insertAdminUserRoleResp->msg;
			return $resp;
		}
		$resp->data = $insertAdminUserRoleResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateAdminUserRole($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$roleId = (int)$param['roleId'];
		if ($roleId <= 0) {
			$resp->msg = "roleId不能为空";
			return $resp;
		}
		$updateAdminUserRoleResp = $this->dao->updateAdminUserRole($param);
		if ($updateAdminUserRoleResp->errCode != 0) {
			$resp->msg = $updateAdminUserRoleResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function deleteAdminUserRole($roleId) {
		$resp = requireModule("Resp");
		$roleId = (int)$roleId;
		if ($roleId <= 0) {
			$resp->msg = "roleId不能为空";
			return $resp;
		}
		$deleteAdminUserRoleResp = $this->dao->deleteAdminUserRole($roleId);
		if ($deleteAdminUserRoleResp->errCode != 0) {
			$resp->msg = $deleteAdminUserRoleResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserRoleById($roleId) {
		$resp = requireModule('Resp');
		$roleId = (int)$roleId;
		if ($roleId <= 0) {
			$resp->msg = "roleId不能为空";
			return $resp;
		}
		$selectAdminUserRoleByIdResp = $this->dao->selectAdminUserRoleById($roleId);
		if ($selectAdminUserRoleByIdResp->errCode != 0) {
			$resp->msg = $selectAdminUserRoleByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserRoleByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserRole($param) {
		$resp = requireModule('Resp');
		$selectAdminUserRoleResp = $this->dao->selectAdminUserRole($param);
		if ($selectAdminUserRoleResp->errCode != 0) {
			$resp->msg = $selectAdminUserRoleResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserRoleResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function insertAdminUserRight($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertAdminUserRightResp = $this->dao->insertAdminUserRight($param);
		if ($insertAdminUserRightResp->errCode != 0) {
			$resp->msg = $insertAdminUserRightResp->msg;
			return $resp;
		}
		$resp->data = $insertAdminUserRightResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateAdminUserRight($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$rightId = (int)$param['rightId'];
		if ($rightId <= 0) {
			$resp->msg = "rightId不能为空";
			return $resp;
		}
		$updateAdminUserRightResp = $this->dao->updateAdminUserRight($param);
		if ($updateAdminUserRightResp->errCode != 0) {
			$resp->msg = $updateAdminUserRightResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function deleteAdminUserRight($rightId) {
		$resp = requireModule("Resp");
		$rightId = (int)$rightId;
		if ($rightId <= 0) {
			$resp->msg = "rightId不能为空";
			return $resp;
		}
		$deleteAdminUserRightResp = $this->dao->deleteAdminUserRight($rightId);
		if ($deleteAdminUserRightResp->errCode != 0) {
			$resp->msg = $deleteAdminUserRightResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserRightById($rightId) {
		$resp = requireModule('Resp');
		$rightId = (int)$rightId;
		if ($rightId <= 0) {
			$resp->msg = "rightId不能为空";
			return $resp;
		}
		$selectAdminUserRightByIdResp = $this->dao->selectAdminUserRightById($rightId);
		if ($selectAdminUserRightByIdResp->errCode != 0) {
			$resp->msg = $selectAdminUserRightByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserRightByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserRight($param) {
		$resp = requireModule('Resp');
		$selectAdminUserRightResp = $this->dao->selectAdminUserRight($param);
		if ($selectAdminUserRightResp->errCode != 0) {
			$resp->msg = $selectAdminUserRightResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserRightResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
	
	public function insertAdminUserMenu($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertAdminUserMenuResp = $this->dao->insertAdminUserMenu($param);
		if ($insertAdminUserMenuResp->errCode != 0) {
			$resp->msg = $insertAdminUserMenuResp->msg;
			return $resp;
		}
		$resp->data = $insertAdminUserMenuResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateAdminUserMenu($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$menuId = (int)$param['menuId'];
		if ($menuId <= 0) {
			$resp->msg = "menuId不能为空";
			return $resp;
		}
		$updateAdminUserMenuResp = $this->dao->updateAdminUserMenu($param);
		if ($updateAdminUserMenuResp->errCode != 0) {
			$resp->msg = $updateAdminUserMenuResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function deleteAdminUserMenu($menuId) {
		$resp = requireModule("Resp");
		$menuId = (int)$menuId;
		if ($menuId <= 0) {
			$resp->msg = "menuId不能为空";
			return $resp;
		}
		$deleteAdminUserMenuResp = $this->dao->deleteAdminUserMenu($menuId);
		if ($deleteAdminUserMenuResp->errCode != 0) {
			$resp->msg = $deleteAdminUserMenuResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserMenuById($menuId) {
		$resp = requireModule('Resp');
		$menuId = (int)$menuId;
		if ($menuId <= 0) {
			$resp->msg = "menuId不能为空";
			return $resp;
		}
		$selectAdminUserMenuByIdResp = $this->dao->selectAdminUserMenuById($menuId);
		if ($selectAdminUserMenuByIdResp->errCode != 0) {
			$resp->msg = $selectAdminUserMenuByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserMenuByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectAdminUserMenu($param) {
		$resp = requireModule('Resp');
		$selectAdminUserMenuResp = $this->dao->selectAdminUserMenu($param);
		if ($selectAdminUserMenuResp->errCode != 0) {
			$resp->msg = $selectAdminUserMenuResp->msg;
			return $resp;
		}
		$resp->data = $selectAdminUserMenuResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}