define(function(require, exports) {
	
	exports.getFloatIconInfo = getFloatIconInfo;

	var common = require('module/common');

	function getFloatIconInfo(options, success, fail, sync) {
		var url = "?c=floatIcon&m=floatIconInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});