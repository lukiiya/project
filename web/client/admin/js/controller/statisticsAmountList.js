define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsAmountListView = require('view/statisticsAmountList');
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
			title : "价格统计",
			className :  'amount_statistics'
		}
		main.setMain(view, options);
		main.setContent(statisticsAmountListView.content());
		$("#searchSubmit").on('click',searchSubmit);
	}

	function setContent() {
		getStatisticsAmountList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsAmountList();
	}

	function getStatisticsAmountList() {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsAmountList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPlanCount = (ret.data && ret.data.totalPlanCount) || 0;
			var totalPlanOrderCount = (ret.data && ret.data.totalPlanOrderCount) || 0;
			var totalPlanOrderAmount = (ret.data && ret.data.totalPlanOrderAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPlanCount: totalPlanCount,
				totalPlanOrderCount: totalPlanOrderCount,
				totalPlanOrderAmount: totalPlanOrderAmount,
				list: list
			}
			$("#statisticsAmountList").html(statisticsAmountListView.statisticsAmountList(data));
			main.activeTr('statisticsAmountList');
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
		getStatisticsAmountList();
	}

})