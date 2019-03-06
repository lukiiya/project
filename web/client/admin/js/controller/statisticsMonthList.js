define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsMonthListView = require('view/statisticsMonthList');
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
			title: "月份统计列表",
			className: 'statistics_month'
		} 
		main.setMain(view, options);
		main.setContent(statisticsMonthListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getStatisticsMonthList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsMonthList();
	}

	function getStatisticsMonthList() {
		var beginTime,endTime;
		var beginYear = parseInt($('#beginYear').val()) || 0;
		var beginMonth = parseInt($('#beginMonth').val()) || 0;
		var endYear = parseInt($('#endYear').val()) || 0;
		var endMonth = parseInt($('#endMonth').val()) || 0;
		if(beginYear = endYear&&beginMonth < endMonth || beginYear < endYear || beginYear==endYear==beginMonth==endMonth) {
			beginTime = toString(beginYear)+toString(beginMonth);
			endTime = toString(endYear)+toString(endMonth);
		} else {
			alert("请输入正确的日期")		
		};
		var options = {
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsMonthList(options, function(ret) {
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
			$("#statisticsMonthList").html(statisticsMonthListView.statisticsMonthList(data));
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
		getStatisticsMonthList();
	}

})