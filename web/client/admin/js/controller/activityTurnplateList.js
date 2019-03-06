define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityTurnplateListView = require('view/activityTurnplateList');
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
			title: "幸运大转盘",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityTurnplateListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityTurnplateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityTurnplateList();
	}

	function getActivityTurnplateList() {
		var userName = trim($('#userName').val()) || null;
		var prizeName = trim($('#prizeName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			prizeName: prizeName,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityTurnplateList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#activityTurnplateList").html(activityTurnplateListView.activityTurnplateList(data));
			main.activeTr('activityTurnplateList');
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
		getActivityTurnplateList();
	}
});