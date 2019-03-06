define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityChargeListView = require('view/activityChargeList');
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
			title: "彩金充值送5%",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityChargeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityChargeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityChargeList();
	}

	function getActivityChargeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityChargeList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				totalPresentAmount: totalPresentAmount,
				list: list
			}
			$("#activityChargeList").html(activityChargeListView.activityChargeList(data));
			main.activeTr('activityChargeList');
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
		getActivityChargeList();
	}
});