define(function(require, exports) {
	
	exports.getMatchList = getMatchList;
	exports.modifyMatch = modifyMatch;

	var common = require('module/common');

	function getMatchList(options, success, fail, sync) {
		var url = "?p=admin&c=match&m=matchList";
		var data = {
			needSale: options.needSale,
			number: options.number,
			league: options.league,
			home: options.home,
			away: options.away,
			type: options.type,
			beginTime: options.beginTime,
			endTime: options.endTime,
			result: options.result,
			orderBy: options.orderBy,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function modifyMatch(options, success, fail, sync) {
		var url = "?p=admin&c=match&m=modifyMatch";
		var data = {
			matchId: options.matchId,
			halfResult: options.halfResult,
			result: options.result
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});