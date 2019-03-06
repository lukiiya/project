// 日期统计
define(function(require, exports){

	exports.getStatisticsDateList = getStatisticsDateList;
	exports.getStatisticsMonthList = getStatisticsMonthList;
	exports.getStatisticsUserDateList = getStatisticsUserDateList;
	exports.getStatisticsAmountList = getStatisticsAmountList;
	exports.getStatisticsCashConsumeUserList = getStatisticsCashConsumeUserList;
	exports.getExpertStatistics198 = getExpertStatistics198;

	var common = require('module/common');

	function getStatisticsDateList(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=statisticsDateList";
		var data = {
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsMonthList(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=statisticsMonthList";
		var data = {
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsUserDateList(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=statisticsUserDateList";
		var data = {
			planPrizeRateRank: options.planPrizeRateRank,
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			dateType: options.dateType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsAmountList(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=statisticsAmountList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsCashConsumeUserList(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=statisticsCashConsumeUserList";
		var data = {
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getExpertStatistics198(options, success, fail, sync) {
		var url = "?p=admin&c=statistics&m=expertStatistics198";
		var data = {
			planPrizeRateRank: options.planPrizeRateRank,
			userId: options.userId,
			beginTime: options.beginTime,
			endTime: options.endTime,
			dateType: options.dateType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});