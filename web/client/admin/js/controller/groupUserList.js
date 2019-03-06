define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var groupCgi = require('cgi/group');
	var userCgi = require('cgi/user');
	var groupUserListView = require('view/groupUserList');
	var groupId = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		groupId = parseInt(common.getUrlParam("groupId")) || 0;
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		groupId = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "分组用户列表",
			className: 'group_userList',
		}
		main.setMain(view, options);
		main.setContent(groupUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createGroupUserBtn").on('click', showCreateGroupUser);
	}

	function setContent() {
		getGroupInfo();
		getGroupUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGroupUserList();	
	}

	function getGroupUserList() {
		var userName = trim($('#userName').val()) || null;
		var userRight = parseInt($('#userRight').val()) || null;
		var options = {
			userName: userName,
			userRight: userRight,
			groupId: groupId,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		groupCgi.getGroupUserList(options, function(ret) {
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
			$("#groupUserList").html(groupUserListView.groupUserList(data));
			$("#groupUserList .deleteGroupUser").on('click', deleteGroupUser);
			$("#groupUserList .modifyGroupUserSort").on('click', modifyGroupUserSort);
			main.activeTr('groupUserList');
		})
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
		getGroupUserList();
	}
	
	function getGroupInfo() {
		var options = {
			groupId: groupId
		}
		groupCgi.getGroupInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var name = trim(data.name) || '';
			$('#title').html(name + '-用户列表');
		});
	}

	function deleteGroupUser() {
		var userId = parseInt($(this).attr("userId")) || 0;
		var nickName = trim($(this).attr("nickName")) || '';
		var realName = trim($(this).attr("realName")) || '';
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否把 "'+userName+'" 从该分组移除', function() {
			var options = {
				groupId: groupId,
				userId: userId
			}
			groupCgi.deleteGroupUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('移除成功');
				ui.closeConfirm();
				getGroupUserList();
			});
		});	
	}

	function modifyGroupUserSort() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var type = parseInt($(this).attr('type')) || 0;
		if (isNaN(userId) || userId <= 0 || isNaN(type) || type <= 0) {
			return;
		}
		var data = {
			groupId: groupId,
			userId: userId,
			type: type
		};
		groupCgi.modifyGroupUserSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("排序成功");
			getGroupUserList();
		});
	}

	function showCreateGroupUser() {
		var options = {
			html: groupUserListView.createGroupUser()
		}
		ui.showWindow(options);
		$("#cSearchSubmit").on('click', getUserList).click();
	}

	function getUserList() {
		var userName = trim($('#cUserName').val()) || null;
		var options = {
			userName: userName,
			pageNum: 1,
			pageSize: 10	
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#userList").html(groupUserListView.userList(data));
			$("#userList .createGroupUser").on('click', createGroupUser);
		});
	}

	function createGroupUser() {
		var userId = parseInt($(this).attr("userId")) || 0;
		var nickName = trim($(this).attr("nickName")) || '';
		var realName = trim($(this).attr("realName")) || '';
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否把 "'+userName+'" 新增到该分组', function() {
			var options = {
				groupId: groupId,
				userId: userId
			}
			groupCgi.createGroupUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('新增成功');
				ui.closeConfirm();
				ui.closeWindow();
				getGroupUserList();
			});
		});
		$('#confirmBox .mask').attr('style', 'z-index:9');
		$('#confirmBox .pop').attr('style', 'z-index:10');
	}
})