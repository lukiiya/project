define(function(require, exports) {
	
	exports.getVerificationImg = getVerificationImg;

	var common = require('module/common');

	function getVerificationImg(options, success, fail, sync) {
		var url = "?c=verificationCode&m=image";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});