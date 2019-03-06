define(function(require, exports) {
	
	exports.getJxzpList = getJxzpList;
	exports.getJxzpStatistics = getJxzpStatistics;
	exports.getJxzpInfo = getJxzpInfo;
	exports.hasJxzpInfo = hasJxzpInfo;

	var common = require('module/common');

	function getJxzpList(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpList";
		var data = {
			type: options.type,//类型, 1=胜平负, 2=输赢盘
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getJxzpStatistics(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpStatistics";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getJxzpInfo(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpInfo";
		var data = {
			type: options.type,
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function hasJxzpInfo(options, success, fail, sync) {
		var url = "?c=jxzp&m=hasJxzpInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});