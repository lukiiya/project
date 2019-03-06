<?php
namespace controller\admin;
use controller\Base;

class AdminUser extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $adminUserService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->adminUserService = requireService("AdminUser");
	}

	public function createAdminUser() {
		$userName = trim($this->common->getParam("userName", ''));
		$loginName = trim($this->common->getParam("loginName", ''));
		$password = trim($this->common->getParam("password", ''));
		$admin = (int)$this->common->getParam("admin", 0);
		$remark = trim($this->common->getParam("remark", ''));
		if (empty($userName)) {
			$this->resp->msg = "userName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($loginName)) {
			$this->resp->msg = "loginName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($password)) {
			$this->resp->msg = "password参数有误";
			$this->jsonView->out($this->resp);
		}
		$passwordKey = 'shaimi_admin_password_key';
		$password = md5($password.'|'.$passwordKey);
		$param = array();
		$param['userName'] = $userName;
		$param['loginName'] = $loginName;
		$param['password'] = $password;
		$param['admin'] = $admin;
		$param['remark'] = $remark;
		$insertAdminUserResp = $this->adminUserService->insertAdminUser($param);
		if ($insertAdminUserResp->errCode != 0) {
			$this->resp->msg = "新增用户失败";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$insertAdminUserResp->data;
		if ($userId <= 0) {
			$this->resp->msg = "新增用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = $userId;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUser() {
		$userId = (int)$this->common->getParam("userId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$loginName = trim($this->common->getParam("loginName", ''));
		$password = trim($this->common->getParam("password", ''));
		$admin = (int)$this->common->getParam("admin", 0);
		$remark = trim($this->common->getParam("remark", ''));
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($userName)) {
			$this->resp->msg = "userName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($loginName)) {
			$this->resp->msg = "loginName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($password)) {
			$this->resp->msg = "password参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['userName'] = $userName;
		$param['loginName'] = $loginName;
		if ($password != '**********') {
			$passwordKey = 'shaimi_admin_password_key';
			$password = md5($password.'|'.$passwordKey);
			$param['password'] = $password;
		}
		$param['admin'] = $admin;
		$param['remark'] = $remark;
		$updateAdminUserResp = $this->adminUserService->updateAdminUser($param);
		if ($updateAdminUserResp->errCode != 0) {
			$this->resp->msg = "修改用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUserRoleId() {
		$userId = (int)$this->common->getParam("userId", 0);
		$roleId = $this->common->filterIdArray($this->common->getParam("roleId", ''));
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['roleId'] = $roleId;
		$updateAdminUserResp = $this->adminUserService->updateAdminUser($param);
		if ($updateAdminUserResp->errCode != 0) {
			$this->resp->msg = "分配角色失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteAdminUser() {
		$userId = (int)$this->common->getParam("userId", 0);
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$deleteAdminUserResp = $this->adminUserService->deleteAdminUser($userId);
		if ($deleteAdminUserResp->errCode != 0) {
			$this->resp->msg = "删除用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户信息
	public function adminUserInfo() {
		$needSelf = (bool)$this->common->getParam("needSelf", false);
		$userId = (int)$this->common->getParam("userId", 0);
		$adminUser = null;
		if ($needSelf) {
			$adminUser = $this->loginUserInfo;
		}
		if (empty($adminUser) && $userId > 0) {
			$selectAdminUserByIdResp = $this->adminUserService->selectAdminUserById($userId);
			if ($selectAdminUserByIdResp->errCode == 0) {
				$adminUser = $selectAdminUserByIdResp->data;
			}
		}
		if (empty($adminUser)) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = $adminUser;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function adminUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$loginName = trim($this->common->getParam("loginName", ''));
		$admin = $this->common->getParam("admin", null);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		$param = array();
		$param['userName'] = $userName;
		$param['loginName'] = $loginName;
		if ($admin !== null) {
			$param['admin'] = $admin;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectAdminUserResp = $this->adminUserService->selectAdminUser($param);
		if ($selectAdminUserResp->errCode != 0) {
			$this->resp->msg = "用户查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function createAdminUserRole() {
		$roleName = trim($this->common->getParam("roleName", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if (empty($roleName)) {
			$this->resp->msg = "userName参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['roleName'] = $roleName;
		$param['remark'] = $remark;
		$insertAdminUserRoleResp = $this->adminUserService->insertAdminUserRole($param);
		if ($insertAdminUserRoleResp->errCode != 0) {
			$this->resp->msg = "新增角色失败";
			$this->jsonView->out($this->resp);
		}
		$roleId = (int)$insertAdminUserRoleResp->data;
		if ($roleId <= 0) {
			$this->resp->msg = "新增角色失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = $roleId;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUserRole() {
		$roleId = (int)$this->common->getParam("roleId", 0);
		$roleName = trim($this->common->getParam("roleName", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if ($roleId <= 0) {
			$this->resp->msg = "roleId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($roleName)) {
			$this->resp->msg = "roleName参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['roleId'] = $roleId;
		$param['roleName'] = $roleName;
		$param['remark'] = $remark;
		$updateAdminUserRoleResp = $this->adminUserService->updateAdminUserRole($param);
		if ($updateAdminUserRoleResp->errCode != 0) {
			$this->resp->msg = "修改角色失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUserRoleRightIdAndMenuId() {
		$roleId = (int)$this->common->getParam("roleId", 0);
		$rightId = $this->common->filterIdArray($this->common->getParam("rightId", ''));
		$menuId = $this->common->filterIdArray($this->common->getParam("menuId", ''));
		if ($roleId <= 0) {
			$this->resp->msg = "roleId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['roleId'] = $roleId;
		$param['rightId'] = $rightId;
		$param['menuId'] = $menuId;
		$updateAdminUserRoleResp = $this->adminUserService->updateAdminUserRole($param);
		if ($updateAdminUserRoleResp->errCode != 0) {
			$this->resp->msg = "分配功能失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteAdminUserRole() {
		$roleId = (int)$this->common->getParam("roleId", 0);
		if ($roleId <= 0) {
			$this->resp->msg = "roleId参数有误";
			$this->jsonView->out($this->resp);
		}
		$deleteAdminUserRoleResp = $this->adminUserService->deleteAdminUserRole($roleId);
		if ($deleteAdminUserRoleResp->errCode != 0) {
			$this->resp->msg = "删除角色失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户信息
	public function adminUserRoleInfo() {
		$roleId = (int)$this->common->getParam("roleId", 0);
		if ($roleId <= 0) {
			$this->resp->msg = "roleId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectAdminUserRoleByIdResp = $this->adminUserService->selectAdminUserRoleById($roleId);
		if ($selectAdminUserRoleByIdResp->errCode != 0) {
			$this->resp->msg = "角色查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserRoleByIdResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function adminUserRoleList() {
		$roleName = trim($this->common->getParam("roleName", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		$param = array();
		$param['roleName'] = $roleName;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectAdminUserRoleResp = $this->adminUserService->selectAdminUserRole($param);
		if ($selectAdminUserRoleResp->errCode != 0) {
			$this->resp->msg = "角色查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserRoleResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function createAdminUserRight() {
		$rightName = trim($this->common->getParam("rightName", ''));
		$rule = trim($this->common->getParam("rule", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if (empty($rightName)) {
			$this->resp->msg = "rightName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($rule)) {
			$this->resp->msg = "rule参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['rightName'] = $rightName;
		$param['rule'] = $rule;
		$param['remark'] = $remark;
		$insertAdminUserRightResp = $this->adminUserService->insertAdminUserRight($param);
		if ($insertAdminUserRightResp->errCode != 0) {
			$this->resp->msg = "新增权限失败";
			$this->jsonView->out($this->resp);
		}
		$rightId = (int)$insertAdminUserRightResp->data;
		if ($rightId <= 0) {
			$this->resp->msg = "新增权限失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = $rightId;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUserRight() {
		$rightId = (int)$this->common->getParam("rightId", 0);
		$rightName = trim($this->common->getParam("rightName", ''));
		$rule = trim($this->common->getParam("rule", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if ($rightId <= 0) {
			$this->resp->msg = "rightId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($rightName)) {
			$this->resp->msg = "rightName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($rule)) {
			$this->resp->msg = "rule参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['rightId'] = $rightId;
		$param['rightName'] = $rightName;
		$param['rule'] = $rule;
		$param['remark'] = $remark;
		$updateAdminUserRightResp = $this->adminUserService->updateAdminUserRight($param);
		if ($updateAdminUserRightResp->errCode != 0) {
			$this->resp->msg = "修改权限失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteAdminUserRight() {
		$rightId = (int)$this->common->getParam("rightId", 0);
		if ($rightId <= 0) {
			$this->resp->msg = "rightId参数有误";
			$this->jsonView->out($this->resp);
		}
		$deleteAdminUserRightResp = $this->adminUserService->deleteAdminUserRight($rightId);
		if ($deleteAdminUserRightResp->errCode != 0) {
			$this->resp->msg = "删除权限失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户信息
	public function adminUserRightInfo() {
		$rightId = (int)$this->common->getParam("rightId", 0);
		if ($rightId <= 0) {
			$this->resp->msg = "rightId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectAdminUserRightByIdResp = $this->adminUserService->selectAdminUserRightById($rightId);
		if ($selectAdminUserRightByIdResp->errCode != 0) {
			$this->resp->msg = "权限查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserRightByIdResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function adminUserRightList() {
		$rightName = trim($this->common->getParam("rightName", ''));
		$rule = trim($this->common->getParam("rule", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		$param = array();
		$param['rightName'] = $rightName;
		$param['rule'] = $rule;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectAdminUserRightResp = $this->adminUserService->selectAdminUserRight($param);
		if ($selectAdminUserRightResp->errCode != 0) {
			$this->resp->msg = "角色权限异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserRightResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function createAdminUserMenu() {
		$menuName = trim($this->common->getParam("menuName", ''));
		$parentMenuName = trim($this->common->getParam("parentMenuName", ''));
		$path = trim($this->common->getParam("path", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if (empty($menuName)) {
			$this->resp->msg = "menuName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($parentMenuName)) {
			$this->resp->msg = "parentMenuName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($path)) {
			$this->resp->msg = "path参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['menuName'] = $menuName;
		$param['parentMenuName'] = $parentMenuName;
		$param['path'] = $path;
		$param['remark'] = $remark;
		$insertAdminUserMenuResp = $this->adminUserService->insertAdminUserMenu($param);
		if ($insertAdminUserMenuResp->errCode != 0) {
			$this->resp->msg = "新增菜单失败";
			$this->jsonView->out($this->resp);
		}
		$menuId = (int)$insertAdminUserMenuResp->data;
		if ($menuId <= 0) {
			$this->resp->msg = "新增菜单失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->data = $menuId;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyAdminUserMenu() {
		$menuId = (int)$this->common->getParam("menuId", 0);
		$menuName = trim($this->common->getParam("menuName", ''));
		$parentMenuName = trim($this->common->getParam("parentMenuName", ''));
		$path = trim($this->common->getParam("path", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if ($menuId <= 0) {
			$this->resp->msg = "menuId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($menuName)) {
			$this->resp->msg = "menuName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($parentMenuName)) {
			$this->resp->msg = "parentMenuName参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($path)) {
			$this->resp->msg = "path参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['menuId'] = $menuId;
		$param['menuName'] = $menuName;
		$param['parentMenuName'] = $parentMenuName;
		$param['path'] = $path;
		$param['remark'] = $remark;
		$updateAdminUserMenuResp = $this->adminUserService->updateAdminUserMenu($param);
		if ($updateAdminUserMenuResp->errCode != 0) {
			$this->resp->msg = "修改菜单失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteAdminUserMenu() {
		$menuId = (int)$this->common->getParam("menuId", 0);
		if ($menuId <= 0) {
			$this->resp->msg = "menuId参数有误";
			$this->jsonView->out($this->resp);
		}
		$deleteAdminUserMenuResp = $this->adminUserService->deleteAdminUserMenu($menuId);
		if ($deleteAdminUserMenuResp->errCode != 0) {
			$this->resp->msg = "删除菜单失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户信息
	public function adminUserMenuInfo() {
		$menuId = (int)$this->common->getParam("menuId", 0);
		if ($menuId <= 0) {
			$this->resp->msg = "menuId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectAdminUserMenuByIdResp = $this->adminUserService->selectAdminUserMenuById($menuId);
		if ($selectAdminUserMenuByIdResp->errCode != 0) {
			$this->resp->msg = "菜单查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserMenuByIdResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function adminUserMenuList() {
		$needSelf = (bool)$this->common->getParam("needSelf", false);
		$menuName = trim($this->common->getParam("menuName", ''));
		$parentMenuName = trim($this->common->getParam("parentMenuName", ''));
		$path = trim($this->common->getParam("path", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		$adminUser = $this->loginUserInfo;
		$menuIdArr = array();
		if ($adminUser['admin'] == 0 && $needSelf) {
			$roleId = trim($adminUser['roleId']);
			$roleId = explode(',', $roleId);
			$roleId = $this->common->filterIdArray($roleId);
			if (!is_array($roleId) || count($roleId) <= 0) {
				$this->resp->msg = "角色菜单异常";
				$this->jsonView->out($this->resp);
			}
			$param = array();
			$param['roleId'] = $roleId;
			$selectAdminUserRoleResp = $this->adminUserService->selectAdminUserRole($param);
			if ($selectAdminUserRoleResp->errCode != 0) {
				$this->resp->msg = "角色菜单异常";
				$this->jsonView->out($this->resp);
			}
			$adminUserRoleList = $selectAdminUserRoleResp->data['list'];
			if (!is_array($adminUserRoleList) || count($adminUserRoleList) <= 0) {
				$this->resp->msg = "角色菜单异常";
				$this->jsonView->out($this->resp);
			}
			foreach ($adminUserRoleList as $role) {
				$menuId = $this->common->filterIdArray(explode(',', trim($role['menuId'])));
				if (is_array($menuId) && count($menuId) > 0) {
					$menuIdArr = array_merge($menuIdArr, $menuId);
				}
			}
			if (count($menuIdArr) <= 0) {
				$this->resp->msg = "角色菜单异常";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['menuId'] = $menuIdArr;
		$param['menuName'] = $menuName;
		$param['parentMenuName'] = $parentMenuName;
		$param['path'] = $path;
		if ($needSelf) {
			$param['orderBy'] = 1;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectAdminUserMenuResp = $this->adminUserService->selectAdminUserMenu($param);
		if ($selectAdminUserMenuResp->errCode != 0) {
			$this->resp->msg = "角色菜单异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserMenuResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function adminUserLogin() {
		$loginName = trim($this->common->getParam("loginName", ''));
		$password = trim($this->common->getParam("password", ''));
		if (empty($loginName)) {
			$this->resp->msg = "loginName有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($password)) {
			$this->resp->msg = "password有误";
			$this->jsonView->out($this->resp);
		}
		$passwordKey = 'shaimi_admin_password_key';
		$password = md5($password.'|'.$passwordKey);
		$param = array();
		$param['loginName'] = $loginName;
		$param['password'] = $password;
		$selectAdminUserResp = $this->adminUserService->selectAdminUser($param);
		if ($selectAdminUserResp->errCode != 0) {
			$this->resp->msg = "用户查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserResp->data;
		if (empty($data) || empty($data['list']) || count($data['list']) <= 0) {
			$this->resp->msg = "账户名或密码错误";
			$this->jsonView->out($this->resp);
		}
		$adminUser = $data['list'][0];
		$userId = $adminUser['userId'];
        $this->common->setUserAuth('admin', array(
            'userId' => $userId
        ));
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function adminUserUnlogin() {
		$this->common->unsetUserAuth('admin');
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function adminUserModifyPassword() {
		$oldPassword = trim($this->common->getParam("oldPassword", ''));
		$newPassword = trim($this->common->getParam("newPassword", ''));
		if (empty($oldPassword)) {
			$this->resp->msg = "oldPassword有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($newPassword)) {
			$this->resp->msg = "newPassword有误";
			$this->jsonView->out($this->resp);
		}
		$userId = trim($this->loginUserInfo['userId']);
		$loginName = trim($this->loginUserInfo['loginName']);
		$passwordKey = 'shaimi_admin_password_key';
		$oldPassword = md5($oldPassword.'|'.$passwordKey);
		$newPassword = md5($newPassword.'|'.$passwordKey);
		$param = array();
		$param['loginName'] = $loginName;
		$param['password'] = $oldPassword;
		$selectAdminUserResp = $this->adminUserService->selectAdminUser($param);
		if ($selectAdminUserResp->errCode != 0) {
			$this->resp->msg = "用户查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectAdminUserResp->data;
		if (empty($data) || empty($data['list']) || count($data['list']) <= 0) {
			$this->resp->msg = "旧密码错误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['password'] = $newPassword;
		$updateAdminUserResp = $this->adminUserService->updateAdminUser($param);
		if ($updateAdminUserResp->errCode != 0) {
			$this->resp->msg = "更新密码异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}