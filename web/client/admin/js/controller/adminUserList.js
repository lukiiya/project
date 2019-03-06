define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserListView = require('view/adminUserList');
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
			title: "后台用户",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUser").on('click', editAdminUser);
	}


	function setContent() {
		getAdminUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserList();	
	}

	function getAdminUserList() {
		var userName = trim($("#userName").val()) || null;
		var loginName = trim($("#loginName").val()) || null;
		var admin = parseInt($('#admin').val());
		if (isNaN(admin)) {
			admin = undefined;
		}
		var options = {
			userName: userName,
			loginName: loginName,
			admin: admin,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserList(options, function(ret) {
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
			$("#adminUserList").html(adminUserListView.adminUserList(data));
			$("#adminUserList .setAdminUserRole").on('click', setAdminUserRole);
			$("#adminUserList .editAdminUser").on('click', editAdminUser);
			$("#adminUserList .deleteAdminUser").on('click', deleteAdminUser);
			main.activeTr('adminUserList');
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
		getAdminUserList();
	}

	function getAdminUserInfo(userId, callback) {
		var userId = parseInt(userId) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		callback = callback || function() {};
		var options = {
			userId : userId
		}
		adminUserCgi.getAdminUserInfo(options, callback);
	}

	function editAdminUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var title = '';
		if (!isNaN(userId) && userId > 0) {
			title = '修改用户';
		} else {
			title = '新增用户';
		}
		var options = {
			html: adminUserListView.editAdminUser({
				title: title,
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUser").on('click', ui.closeWindow);
		$("#sureEditAdminUser").on('click', editAdminUserSubmit);
		getAdminUserInfo(userId, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userName = data.userName || '';
			var loginName = data.loginName || '';
			var admin = data.admin || 0;
			var remark = data.remark || '';
			$('#editUserName').val(userName);
			$('#editLoginName').val(loginName);
			$('#editPassword').val('**********');
			$('#editAdmin').val(admin);
			$('#editRemark').val(remark);
		});
	}

	function editAdminUserSubmit() {
		var userId = parseInt($('#editUserId').val());
		var userName = trim($('#editUserName').val());
		var loginName = trim($('#editLoginName').val());
		var password = trim($('#editPassword').val());
		var admin = parseInt($('#editAdmin').val());
		var remark = trim($('#editRemark').val());
		if (!userName) {
			ui.showNotice('用户名不能为空');
			return;
		}
		if (!loginName) {
			ui.showNotice('登录名不能为空');
			return;
		}
		if (!password) {
			ui.showNotice('密码不能为空');
			return;
		}
		if (isNaN(admin)) {
			return;
		}
		var cgi = function() {};
		var data = {
			userName: userName,
			loginName: loginName,
			password: password,
			admin: admin,
			remark: remark
		};
		if (!isNaN(userId) && userId > 0) {
			data.userId = userId;
			cgi = adminUserCgi.modifyAdminUser;
		} else {
			cgi = adminUserCgi.createAdminUser;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(userId) && userId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserList();
		});
	}

	function deleteAdminUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该用户', function sure() {
			var options = {
				userId: userId
			}
			adminUserCgi.deleteAdminUser(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserList();
			});
		}, function cancel() {

		});
	}


	//分配角色
	function setAdminUserRole() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: adminUserListView.setAdminUserRole({
				userId: userId
			})
		}
		ui.showWindow(options);
		getReferAdminUserList();
		$('#referUser').val(userId);
		$('#checkAllRole').off().on('click', checkAllRole);
		$('#showRoleDetail').off().on('click', showRoleDetail);
		$("#cancelSetAdminUserRole").on('click', ui.closeWindow);
		$("#sureSetAdminUserRole").on('click', setAdminUserRoleSubmit);
		getAdminUserRoleList();
		$('#referUser').trigger('change');
	}

	function setAdminUserRoleSubmit() {
		var userId = parseInt($('#setUserId').val()) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var roleId = [];
		var roleArr = $('#adminUserRoleList .roleId');
		$.each(roleArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				roleId.push(id);	
			}
		});
		var options = {
			userId: userId,
			roleId: roleId
		}
		adminUserCgi.modifyAdminUserRoleId(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("分配成功");
			ui.closeWindow();
			getAdminUserList();
		});
	}

	function checkAllRole(e) {
		var checked = !!this.checked;
		$('#adminUserRoleList .roleId').attr('checked', checked);
	}

	function checkRole(e) {
		var checked = true;
		var roleArr = $('#adminUserRoleList .roleId');
		$.each(roleArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllRole').attr('checked', checked);
	}

	function showRoleDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserRoleList .remark').css('display', display);
	}

	function referUserChange(e) {
		var userId = parseInt($(this).val()) || 0;
		setAdminUserInfo(userId);
	}

	function getReferAdminUserList() {
		var options = {
			admin: 0,
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var userId = parseInt(item.userId) || 0;
				var userName = item.userName || '';
				if (!isNaN(userId) && userId > 0) {
					html.push('<option value="' + userId + '">' + userName + '</option>');
				}
			});
			$('#referUser').html(html.join(''));
			$('#referUser').off().on('change', referUserChange);
		}, true);
	}

	function getAdminUserRoleList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#adminUserRoleList").html(adminUserListView.adminUserRoleList(data));
			$('#adminUserRoleList .roleId').off().on('click', checkRole);
		}, true);
	}

	function setAdminUserInfo(userId) {
		var setUserId = parseInt($('#setUserId').val()) || 0;
		var userId = parseInt(userId) || 0;
		if (isNaN(setUserId) || setUserId <= 0 || isNaN(userId) || userId <= 0) {
			return;
		}
		getAdminUserInfo(userId, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userName = data.userName || '';
			var roleId = data.roleId || '';
			if (setUserId == userId) {
				$('#setTilte').html('设置“' + userName + '”角色');
			}
			$('#adminUserRoleList .roleId').attr('checked', false);
			roleId = roleId.split(',') || [];
			$.each(roleId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#roleId'+id).attr('checked', true);
				}
			});
			checkRole();
		});
	}
});