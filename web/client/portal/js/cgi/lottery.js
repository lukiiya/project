define(function(require, exports) {

	exports.lotteryIssueInfo = lotteryIssueInfo;
	exports.lotteryIssueList = lotteryIssueList;
	exports.lotteryList = lotteryList;

	var common = require('module/common');
	
	function lotteryIssueInfo(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryIssueInfo";
		var data = {
			lotteryId: options.lotteryId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function lotteryIssueList(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryIssueList";
		var data = {
			lotteryId: options.lotteryId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function lotteryList(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});