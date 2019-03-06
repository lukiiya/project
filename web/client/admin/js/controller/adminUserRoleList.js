define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserRoleListView = require('view/adminUserRoleList');
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
			title: "后台角色",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserRoleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUserRole").on('click', editAdminUserRole);
	}


	function setContent() {
		getAdminUserRoleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserRoleList();	
	}

	function getAdminUserRoleList() {
		var roleName = trim($("#roleName").val()) || null;
		var options = {
			roleName: roleName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
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
			$("#adminUserRoleList").html(adminUserRoleListView.adminUserRoleList(data));
			$("#adminUserRoleList .setAdminUserRoleFun").on('click', setAdminUserRoleFun);
			$("#adminUserRoleList .editAdminUserRole").on('click', editAdminUserRole);
			$("#adminUserRoleList .deleteAdminUserRole").on('click', deleteAdminUserRole);
			main.activeTr('adminUserRoleList');
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
		getAdminUserRoleList();
	}

	function editAdminUserRole() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		var title = '';
		if (!isNaN(roleId) && roleId > 0) {
			title = '修改角色';
		} else {
			title = '新增角色';
		}
		var options = {
			html: adminUserRoleListView.editAdminUserRole({
				title: title,
				roleId: roleId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUserRole").on('click', ui.closeWindow);
		$("#sureEditAdminUserRole").on('click', editAdminUserRoleSubmit);
		if (!isNaN(roleId) && roleId > 0) {
			var options = {
				roleId : roleId
			}
			adminUserCgi.getAdminUserRoleInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var roleName = data.roleName || '';
				var remark = data.remark || '';
				$('#editRoleName').val(roleName);
				$('#editRemark').val(remark);
			});
		}
	}

	function editAdminUserRoleSubmit() {
		var roleId = parseInt($('#editRoleId').val());
		var roleName = trim($('#editRoleName').val());
		var remark = trim($('#editRemark').val());
		if (!roleName) {
			ui.showNotice('角色名不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			roleName: roleName,
			remark: remark
		};
		if (!isNaN(roleId) && roleId > 0) {
			data.roleId = roleId;
			cgi = adminUserCgi.modifyAdminUserRole;
		} else {
			cgi = adminUserCgi.createAdminUserRole;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(roleId) && roleId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserRoleList();
		});
	}

	function deleteAdminUserRole() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该角色', function sure() {
			var options = {
				roleId: roleId
			}
			adminUserCgi.deleteAdminUserRole(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserRoleList();
			});
		}, function cancel() {

		});
	}

	//分配功能
	function setAdminUserRoleFun() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		var options = {
			html: adminUserRoleListView.setAdminUserRoleFun({
				roleId: roleId
			})
		}
		ui.showWindow(options);
		getReferAdminUserRoleList();
		$('#referRole').val(roleId);
		$('#checkAllMenu').off().on('click', checkAllMenu);
		$('#checkAllRight').off().on('click', checkAllRight);
		$('#showMenuDetail').off().on('click', showMenuDetail);
		$('#showRightDetail').off().on('click', showRightDetail);
		$("#cancelSetAdminUserRoleFun").on('click', ui.closeWindow);
		$("#sureSetAdminUserRoleFun").on('click', setAdminUserRoleFunSubmit);
		getAdminUserMenuList();
		getAdminUserRightList();
		$('#referRole').trigger('change');
	}

	function setAdminUserRoleFunSubmit() {
		var roleId = parseInt($('#setRoleId').val()) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		var menuId = [];
		var menuArr = $('#adminUserMenuList .menuId');
		$.each(menuArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				menuId.push(id);	
			}
		});
		var rightId = [];
		var rightArr = $('#adminUserRightList .rightId');
		$.each(rightArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				rightId.push(id);	
			}
		});
		var options = {
			roleId: roleId,
			menuId: menuId,
			rightId: rightId
		}
		adminUserCgi.modifyAdminUserRoleRightIdAndMenuId(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("分配成功");
			ui.closeWindow();
			getAdminUserRoleList();
		});
	}

	function checkAllRight(e) {
		var checked = !!this.checked;
		$('#adminUserRightList .rightId').attr('checked', checked);
	}

	function checkRight(e) {
		var checked = true;
		var rightArr = $('#adminUserRightList .rightId');
		$.each(rightArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllRight').attr('checked', checked);
	}

	function showRightDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserRightList .remark').css('display', display);
	}

	function checkAllMenu(e) {
		var checked = !!this.checked;
		$('#adminUserMenuList .menuId').attr('checked', checked);
	}

	function checkMenu(e) {
		var toggleParentMenu = function() {
			//子菜单，联动父菜单input
			var checked = true;
			var menuArr = this.find('.menuId');
			$.each(menuArr, function(i, item) {
				var menuId = parseInt(item.value) || 0;
				if (!isNaN(menuId) && menuId > 0 && !item.checked) {
					checked = false;
					return false;
				}	
			});
			this.find('.menuId[value=0]').attr('checked', checked);
		}
		if (this.nodeType == 1) {//dom单击执行
			var menuId = parseInt(this.value) || 0;
			var menuBox = $(this).parents('.menuBox');
			if (menuId <= 0) {
				//父菜单单击
				menuBox.find('.menuId').attr('checked', !!this.checked);
			} else {
				//子菜单单击，联动父菜单input
				toggleParentMenu.call(menuBox);
			}
		} else {//直接执行函数
			var menuBox = $('#adminUserMenuList .menuBox');
			$.each(menuBox, function(i, item) {
				toggleParentMenu.call($(this));
			});
		}
		//联动全选input
		var checked = true;
		var menuArr = $('#adminUserMenuList .menuId');
		$.each(menuArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllMenu').attr('checked', checked);
	}

	function showMenuDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserMenuList .remark').css('display', display);
	}


	function referRoleChange(e) {
		var roleId = parseInt($(this).val()) || 0;
		setAdminUserRoleInfo(roleId);
	}

	function getReferAdminUserRoleList() {
		var options = {
			admin: 0,
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var roleId = parseInt(item.roleId) || 0;
				var roleName = item.roleName || '';
				if (!isNaN(roleId) && roleId > 0) {
					html.push('<option value="' + roleId + '">' + roleName + '</option>');
				}
			});
			$('#referRole').html(html.join(''));
			$('#referRole').off().on('change', referRoleChange);
		}, true);
	}

	function getAdminUserMenuList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserMenuList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var menuMap = {};
			$.each(list, function(i, item) {
				var parentMenuName = trim(item.parentMenuName) || '';
				if (!parentMenuName) {
					return;
				}
				if (!(parentMenuName in menuMap)) {
					menuMap[parentMenuName] = [];	
				}
				menuMap[parentMenuName].push(item);
			});
			var data = {
				menuMap: menuMap
			};
			$("#adminUserMenuList").html(adminUserRoleListView.adminUserMenuList(data));
			$('#adminUserMenuList .menuId').off().on('click', checkMenu);
		}, true);
	}

	function getAdminUserRightList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRightList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#adminUserRightList").html(adminUserRoleListView.adminUserRightList(data));
			$('#adminUserRightList .rightId').off().on('click', checkRight);
		}, true);
	}

	function setAdminUserRoleInfo(roleId) {
		var setRoleId = parseInt($('#setRoleId').val()) || 0;
		var roleId = parseInt(roleId) || 0;
		if (isNaN(setRoleId) || setRoleId <= 0 || isNaN(roleId) || roleId <= 0) {
			return;
		}
		var options = {
			roleId : roleId
		}
		adminUserCgi.getAdminUserRoleInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var roleName = data.roleName || '';
			var menuId = data.menuId || '';
			var rightId = data.rightId || '';
			menuId = menuId.split(',') || [];
			rightId = rightId.split(',') || [];
			if (setRoleId == roleId) {
				$('#setTilte').html('设置“' + roleName + '”功能');
			}
			//选中菜单
			$('#adminUserMenuList .menuId').attr('checked', false);
			$.each(menuId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#menuId'+id).attr('checked', true);
				}
			});
			checkMenu();
			//选中权限
			$('#adminUserRightList .rightId').attr('checked', false);
			$.each(rightId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#rightId'+id).attr('checked', true);
				}
			});
			checkRight();
		});
	}
});