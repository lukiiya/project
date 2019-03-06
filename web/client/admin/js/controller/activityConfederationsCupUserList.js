define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityConfederationsCupUserListView = require('view/activityConfederationsCupUserList');
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
			title: "2017联合会杯新用户送3彩金",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityConfederationsCupUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityConfederationsCupUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityConfederationsCupUserList();
	}

	function getActivityConfederationsCupUserList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityConfederationsCupUserList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPresentAmount: totalPresentAmount,
				list: list
			}
			$("#activityConfederationsCupUserList").html(activityConfederationsCupUserListView.activityConfederationsCupUserList(data));
			main.activeTr('activityConfederationsCupUserList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityConfederationsCupUserList();
	}
});