define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityAttachPrizeListView = require('view/activityAttachPrizeList');
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
			title: "11选5加奖百万",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityAttachPrizeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityAttachPrizeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityAttachPrizeList();
	}

	function getActivityAttachPrizeList() {
		var userName = trim($('#userName').val()) || null;
		var issue = trim($('#issue').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			issue: issue,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityAttachPrizeList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAttachPrizeAmount = (ret.data && ret.data.totalAttachPrizeAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAttachPrizeAmount: totalAttachPrizeAmount,
				list: list
			}
			$("#activityAttachPrizeList").html(activityAttachPrizeListView.activityAttachPrizeList(data));
			main.activeTr('activityAttachPrizeList');
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
		getActivityAttachPrizeList();
	}
});