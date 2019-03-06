define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsUserDateListView = require('view/statisticsUserDateList');
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
			title : "用户日期列表",
			className :  'user_dateStatistics'
		}
		main.setMain(view, options);
		main.setContent(statisticsUserDateListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#reset").on('click', reset);
		$("#searchSubmit").on('click', searchSubmit);
		$("#dateType input[type='radio']").on('click', dateType);
		$('#reset').click();
	}

	function setContent() {
		getStatisticsUserDateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsUserDateList();
	}

	function reset(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#planPrizeRateRank')[0].checked = false
		$("#userName").val('');
		$("#beginTime").val('');
		$("#endTime").val('');
		$("#beginYear").val('0');
		$("#beginMonth").val('0');
		$("#endYear").val('0');
		$("#endMonth").val('0');
		$('#day').click();
	}

	function dateType() {
		var dateType = parseInt($(this).val()) || 0;
		if (dateType == 1) {
			$("#search_day").css("display", "block");
			$("#search_month").css("display", "none");
		} else if(dateType == 2) {
			$("#search_day").css("display", "none");
			$("#search_month").css("display", "block");
		}
	}

	function getStatisticsUserDateList() {
		var planPrizeRateRank = !!$('#planPrizeRateRank')[0].checked;
		var userName = trim($("#userName").val()) || null;
		var dateType = parseInt($("#dateType input:checked").val()) || 0;
		var beginTime = null;
		var endTime = null;
		if (dateType == 1) {
			beginTime = trim($('#beginTime').val()) || null;
			endTime = trim($('#endTime').val()) || null;	
		} else if (dateType == 2) {
			var beginYear = trim($('#beginYear').val()) || '';
			var beginMonth = trim($('#beginMonth').val()) || '';
			var endYear = trim($('#endYear').val()) || '';
			var endMonth = trim($('#endMonth').val()) || '';
			if (beginYear || beginMonth) {
				if (!beginYear) {
					ui.showNotice('请选择开始年份');
					return;
				}
				if (!beginMonth) {
					ui.showNotice('请选择开始月份');
					return;
				}
			}
			if (endYear || endMonth) {
				if (!endYear) {
					ui.showNotice('请选择结束年份');
					return;
				}
				if (!endMonth) {
					ui.showNotice('请选择结束月份');
					return;
				}
			}
			if (beginYear && beginMonth) {
				beginTime = beginYear+'-'+beginMonth;
			}
			if (endYear && endMonth) {
				endTime = endYear+'-'+endMonth;
			}
		}
		var options = {
			planPrizeRateRank: planPrizeRateRank,
			userName: userName,
			dateType: dateType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsUserDateList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPlanCount = (ret.data && ret.data.totalPlanCount) || 0;
			var totalPlanOrderCount = (ret.data && ret.data.totalPlanOrderCount) || 0;
			var totalPlanOrderAmount = (ret.data && ret.data.totalPlanOrderAmount) || 0;
			var totalPlanWinRate = (ret.data && ret.data.totalPlanWinRate) || 0;
			var totalPlanPrizeRate = (ret.data && ret.data.totalPlanPrizeRate) || 0;
			var totalPlanTicketOrderCount = (ret.data && ret.data.totalPlanTicketOrderCount) || 0;
			var totalPlanTicketOrderAmount = (ret.data && ret.data.totalPlanTicketOrderAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				planPrizeRateRank: planPrizeRateRank,
				totalPlanCount: totalPlanCount,
				totalPlanOrderCount: totalPlanOrderCount,
				totalPlanOrderAmount: totalPlanOrderAmount,
				totalPlanWinRate: totalPlanWinRate,
				totalPlanPrizeRate: totalPlanPrizeRate,
				totalPlanTicketOrderCount: totalPlanTicketOrderCount,
				totalPlanTicketOrderAmount: totalPlanTicketOrderAmount,
				list: list
			}
			if (planPrizeRateRank) {
				$('#thDate').hide();
			} else {
				$('#thDate').show();
			}
			$("#statisticsUserDateList").html(statisticsUserDateListView.statisticsUserDateList(data));
			main.activeTr('statisticsUserDateList');
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
		getStatisticsUserDateList();
	}

})