/* 用户 */
define(function(require, exports){
	
	exports.adminUserLogin = adminUserLogin;
	exports.adminUserUnlogin = adminUserUnlogin;
	exports.adminUserModifyPassword = adminUserModifyPassword;
	exports.createAdminUser = createAdminUser;
	exports.modifyAdminUser = modifyAdminUser;
	exports.modifyAdminUserRoleId = modifyAdminUserRoleId;
	exports.deleteAdminUser = deleteAdminUser;
	exports.getAdminUserInfo = getAdminUserInfo;
	exports.getAdminUserList = getAdminUserList;
	exports.createAdminUserRole = createAdminUserRole;
	exports.modifyAdminUserRole = modifyAdminUserRole;
	exports.modifyAdminUserRoleRightIdAndMenuId = modifyAdminUserRoleRightIdAndMenuId;
	exports.deleteAdminUserRole = deleteAdminUserRole;
	exports.getAdminUserRoleInfo = getAdminUserRoleInfo;
	exports.getAdminUserRoleList = getAdminUserRoleList;
	exports.createAdminUserRight = createAdminUserRight;
	exports.modifyAdminUserRight = modifyAdminUserRight;
	exports.deleteAdminUserRight = deleteAdminUserRight;
	exports.getAdminUserRightInfo = getAdminUserRightInfo;
	exports.getAdminUserRightList = getAdminUserRightList;
	exports.createAdminUserMenu = createAdminUserMenu;
	exports.modifyAdminUserMenu = modifyAdminUserMenu;
	exports.deleteAdminUserMenu = deleteAdminUserMenu;
	exports.getAdminUserMenuInfo = getAdminUserMenuInfo;
	exports.getAdminUserMenuList = getAdminUserMenuList;

	var common = require('module/common');

	function adminUserLogin(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserLogin";
		var data = {
			loginName: options.loginName,
			password: options.password
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function adminUserUnlogin(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserUnlogin";
		var data = {};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function adminUserModifyPassword(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserModifyPassword";
		var data = {
			oldPassword: options.oldPassword,
			newPassword: options.newPassword
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createAdminUser(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=createAdminUser";
		var data = {
			userName: options.userName,
			loginName: options.loginName,
			password: options.password,
			admin: options.admin,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUser(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUser";
		var data = {
			userId: options.userId,
			userName: options.userName,
			loginName: options.loginName,
			password: options.password,
			admin: options.admin,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRoleId(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUserRoleId";
		var data = {
			userId: options.userId,
			roleId: options.roleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUser(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=deleteAdminUser";
		var data = {
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserInfo(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserInfo";
		var data = {
			needSelf: options.needSelf,
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserList(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserList";
		var data = {
			userName: options.userName,
			loginName: options.loginName,
			admin: options.admin,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserRole(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=createAdminUserRole";
		var data = {
			roleName: options.roleName,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRole(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUserRole";
		var data = {
			roleId: options.roleId,
			roleName: options.roleName,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRoleRightIdAndMenuId(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUserRoleRightIdAndMenuId";
		var data = {
			roleId: options.roleId,
			rightId: options.rightId,
			menuId: options.menuId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserRole(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=deleteAdminUserRole";
		var data = {
			roleId: options.roleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserRoleInfo(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserRoleInfo";
		var data = {
			roleId: options.roleId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserRoleList(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserRoleList";
		var data = {
			roleName: options.roleName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserRight(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=createAdminUserRight";
		var data = {
			rightName: options.rightName,
			rule: options.rule,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRight(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUserRight";
		var data = {
			rightId: options.rightId,
			rightName: options.rightName,
			rule: options.rule,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserRight(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=deleteAdminUserRight";
		var data = {
			rightId: options.rightId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserRightInfo(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserRightInfo";
		var data = {
			rightId: options.rightId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserRightList(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserRightList";
		var data = {
			rightName: options.rightName,
			rule: options.rule,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserMenu(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=createAdminUserMenu";
		var data = {
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserMenu(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=modifyAdminUserMenu";
		var data = {
			menuId: options.menuId,
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserMenu(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=deleteAdminUserMenu";
		var data = {
			menuId: options.menuId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserMenuInfo(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserMenuInfo";
		var data = {
			menuId: options.menuId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserMenuList(options, success, fail, sync) {
		var url = "?p=admin&c=adminUser&m=adminUserMenuList";
		var data = {
			needSelf: options.needSelf,
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});