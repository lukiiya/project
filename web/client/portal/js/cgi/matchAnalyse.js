define(function(require, exports) {

	exports.getMatchOddsAnalyseList = getMatchOddsAnalyseList;
	exports.getMatchAnalyseList = getMatchAnalyseList;

	var common = require('module/common');
	var ui = require('module/ui');

	function getMatchOddsAnalyseList(options, success, fail, sync) { //赔率数据
		var url = "?c=matchAnalyse&m=matchOddsAnalyseList";
		var data = {
			matchId: options.matchId,
			type: options.type, //1=欧赔，2=亚盘，3=大小分
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getMatchAnalyseList(options, success, fail, sync) { //分析数据
		var url = "?c=matchAnalyse&m=matchAnalyseList";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});