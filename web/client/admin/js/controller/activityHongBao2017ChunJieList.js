define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityHongBao2017ChunJieListView = require('view/activityHongBao2017ChunJieList');
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
			title: "2017春节红包",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityHongBao2017ChunJieListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityHongBao2017ChunJieList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityHongBao2017ChunJieList();
	}

	function getActivityHongBao2017ChunJieList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityHongBao2017ChunJieList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			var totalPresentTicketAmount = (ret.data && ret.data.totalPresentTicketAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPresentAmount: totalPresentAmount,
				totalPresentTicketAmount: totalPresentTicketAmount,
				list: list
			}
			$("#activityHongBao2017ChunJieList").html(activityHongBao2017ChunJieListView.activityHongBao2017ChunJieList(data));
			main.activeTr('activityHongBao2017ChunJieList');
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
		getActivityHongBao2017ChunJieList();
	}
});