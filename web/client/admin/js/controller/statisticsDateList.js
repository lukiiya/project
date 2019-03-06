define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsDateListView = require('view/statisticsDateList');
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
			title: "日期统计列表",
			className: 'date_statistics'
		} 
		main.setMain(view, options);
		main.setContent(statisticsDateListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getStatisticsDateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsDateList();
	}

	function getStatisticsDateList() {
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var options = {
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsDateList(options, function(ret) {
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
			$("#statisticsDateList").html(statisticsDateListView.statisticsDateList(data));
			main.activeTr('statisticsDateList');
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
		getStatisticsDateList();
	}

})