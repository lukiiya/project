define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var groupCgi = require('cgi/group');
	var groupListView = require('view/groupList');
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
			title: "用户分组",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(groupListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createGroup").on('click', editGroup);
	}


	function setContent() {
		getGroupList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGroupList();	
	}

	function getGroupList() {
		var type = parseInt($('#type').val()) || null;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			type: type,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		groupCgi.getGroupList(options, function(ret) {
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
			$("#groupList").html(groupListView.groupList(data));
			$("#groupList .groupUser").on('click', groupUser);
			$("#groupList .editGroup").on('click', editGroup);
			$("#groupList .modifySort").on('click', modifySort);
			main.activeTr('groupList');
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
		getGroupList();
	}

	function groupUser() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		if (isNaN(groupId) || groupId <= 0) {
			return;
		}
		common.locationUrl('#groupUserList&groupId=' + groupId);
	}

	function editGroup() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		var title = '';
		if (!isNaN(groupId) && groupId > 0) {
			title = '修改分组';
		} else {
			title = '新增分组';
		}
		var options = {
			html: groupListView.editGroup({
				title: title,
				groupId: groupId
			})
		}
		ui.showWindow(options);
		$("#cancelEditGroup").on('click', function() {
			ui.closeWindow();
		});
		$("#sureEditGroup").on('click', editGroupSubmit);
		if (!isNaN(groupId) && groupId > 0) {
			var options = {
				groupId : groupId
			}
			groupCgi.getGroupInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var name = trim(data.name) || '';
				var publish = parseInt(data.publish) || 0;
				$('#editName').val(name);
				$('#editPublish').val(publish);
			});
		}
	}

	function editGroupSubmit() {
		var groupId = parseInt($('#editGroupId').val());
		var name = trim($('#editName').val());
		var publish = parseInt($('#editPublish').val());
		if (!name) {
			ui.showNotice('分组名不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			type: 1,
			name: name,
			publish: publish
		};
		if (!isNaN(groupId) && groupId > 0) {
			data.groupId = groupId;
			cgi = groupCgi.modifyGroup;
		} else {
			cgi = groupCgi.createGroup;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(groupId) && groupId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getGroupList();
		});
	}

	function modifySort() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		var type = parseInt($(this).attr('type')) || 0;
		if (isNaN(groupId) || groupId <= 0 || isNaN(type) || type <= 0) {
			return;
		}
		var data = {
			groupId: groupId,
			type: type
		};
		groupCgi.modifyGroupSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("排序成功");
			getGroupList();
		});
	}
});