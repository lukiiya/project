/*活动*/ 
define(function(require, exports) {

	exports.getActivityList = getActivityList;
	exports.getActivityHongBaoList = getActivityHongBaoList;
	exports.getActivityTurnplateList = getActivityTurnplateList;
	exports.getActivityChargeList = getActivityChargeList;
	exports.getActivityHongBao2017ChunJieList = getActivityHongBao2017ChunJieList;
	exports.getActivityConfederationsCupUserList = getActivityConfederationsCupUserList;
	exports.getActivityConfederationsCupList = getActivityConfederationsCupList;
	exports.getActivityAttachPrizeList = getActivityAttachPrizeList;

	var common = require('module/common');

	function getActivityList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityList";
		var data = {
			activityName: options.activityName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityHongBaoList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityHongBaoList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getActivityTurnplateList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityTurnplateList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			prizeName: options.prizeName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityChargeList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityChargeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityHongBao2017ChunJieList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityHongBao2017ChunJieList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityConfederationsCupUserList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityConfederationsCupUserList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityConfederationsCupList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityConfederationsCupList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityAttachPrizeList(options, success, fail, sync) {
		var url = "?p=admin&c=activity&m=activityAttachPrizeList";
		var data = {
			userName: options.userName,
			issue: options.issue,
			orderId: options.orderId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});


