define(function(require, exports) {

	exports.signInfo = signInfo;
	exports.createSign = createSign;

	var common = require('module/common');
	var ui = require('module/ui');

	function signInfo(options, success, fail, sync) {
		var url = "?c=sign&m=signInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createSign(options, success, fail, sync) {
		var url = "?c=sign&m=createSign";
		var data = {};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});