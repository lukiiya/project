define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var groupCgi = require('cgi/group');
	var expertListView = require('view/expertList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(expertListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGroupList();
		getExpertList();
	}

	function searchSubmit() {
		pageNum = 1;
		getExpertList();	
	}

	function getGroupList() {
		var options = {
			type: 1,
			publish: 1,
			pageNum: 1,
			pageSize: 20,
		}
		groupCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="0">全部</option>');
			$.each(list, function(i, item) {
				var groupId = parseInt(item.groupId);
				var name = trim(item.name);
				if (isNaN(groupId) || groupId <= 0 || !name) {
					return;
				}
				html.push('<option value="' + groupId + '">' + name +  '</option>');	
			});
			$('#groupId').html(html.join(''));
		});
	}


	function getExpertList() {
		var groupId = parseInt($('#groupId').val()) || 0;
		var userName = trim($('#userName').val()) || null;
		var options = {
			groupId: groupId,
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getExpertList(options, function(ret) {
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
			$("#expertList").html(expertListView.expertList(data));
			$("#expertList .loginUser").on('click', loginUser);
			main.activeTr('expertList');
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
		getExpertList();
	}

	function loginUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId: userId
		}
		userCgi.loginUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var url = location.protocol + "//" + location.host.replace(/^op/, 'www');
			url = url.replace(/[\?#].*/g, '') + '?cache=false#my';
			common.locationUrl(url, '_blank');
		});
	}
});