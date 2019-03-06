define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserMenuListView = require('view/adminUserMenuList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "后台菜单",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserMenuListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUserMenu").on('click', editAdminUserMenu);
	}


	function setContent() {
		getAdminUserMenuList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserMenuList();	
	}

	function getAdminUserMenuList() {
		var menuName = trim($("#menuName").val()) || null;
		var parentMenuName = trim($("#parentMenuName").val()) || null;
		var path = trim($("#path").val()) || null;
		var options = {
			menuName: menuName,
			parentMenuName: parentMenuName,
			path: path,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserMenuList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#adminUserMenuList").html(adminUserMenuListView.adminUserMenuList(data));
			$("#adminUserMenuList .editAdminUserMenu").on('click', editAdminUserMenu);
			$("#adminUserMenuList .deleteAdminUserMenu").on('click', deleteAdminUserMenu);
			main.activeTr('adminUserMenuList');
		});
	}

	function showPagination(totalCount) {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			totalCount: totalCount,
			pageCodeId: "pageCodeBox",
			pageCodeFun: pageCodeFun
		};
		ui.showPagination(options);
	}

	function pageCodeFun(e){
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getAdminUserMenuList();
	}

	function editAdminUserMenu() {
		var menuId = parseInt($(this).attr('menuId')) || 0;
		var title = '';
		if (!isNaN(menuId) && menuId > 0) {
			title = '修改菜单';
		} else {
			title = '新增菜单';
		}
		var options = {
			html: adminUserMenuListView.editAdminUserMenu({
				title: title,
				menuId: menuId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUserMenu").on('click', ui.closeWindow);
		$("#sureEditAdminUserMenu").on('click', editAdminUserMenuSubmit);
		if (!isNaN(menuId) && menuId > 0) {
			var options = {
				menuId : menuId
			}
			adminUserCgi.getAdminUserMenuInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var menuName = data.menuName || '';
				var parentMenuName = data.parentMenuName || '';
				var path = data.path || '';
				var remark = data.remark || '';
				$('#editMenuName').val(menuName);
				$('#editParentMenuName').val(parentMenuName);
				$('#editPath').val(path);
				$('#editRemark').val(remark);
			});
		}
	}

	function editAdminUserMenuSubmit() {
		var menuId = parseInt($('#editMenuId').val());
		var menuName = trim($('#editMenuName').val());
		var parentMenuName = trim($('#editParentMenuName').val());
		var path = trim($('#editPath').val());
		var remark = trim($('#editRemark').val());
		if (!menuName) {
			ui.showNotice('菜单名不能为空');
			return;
		}
		if (!parentMenuName) {
			ui.showNotice('父菜单名不能为空');
			return;
		}
		if (!path) {
			ui.showNotice('路径不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			menuName: menuName,
			parentMenuName: parentMenuName,
			path: path,
			remark: remark
		};
		if (!isNaN(menuId) && menuId > 0) {
			data.menuId = menuId;
			cgi = adminUserCgi.modifyAdminUserMenu;
		} else {
			cgi = adminUserCgi.createAdminUserMenu;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(menuId) && menuId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserMenuList();
		});
	}

	function deleteAdminUserMenu() {
		var menuId = parseInt($(this).attr('menuId')) || 0;
		if (isNaN(menuId) || menuId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该菜单', function sure() {
			var options = {
				menuId: menuId
			}
			adminUserCgi.deleteAdminUserMenu(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserMenuList();
			});
		}, function cancel() {

		});
	}
});