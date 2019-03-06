define(function(require, exports) {
	
	exports.getSmlrInfo = getSmlrInfo;
	exports.hasSmlrInfo = hasSmlrInfo;

	var common = require('module/common');

	function getSmlrInfo(options, success, fail, sync) {
		var url="?c=smlr&m=smlrInfo";
		var data = {
			matchId: options.matchId
		}
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function hasSmlrInfo(options, success, fail, sync) {
		var url = "?c=smlr&m=hasSmlrInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});