define(function(require, exports) {

	exports.sendSmsCode = sendSmsCode;

	var common = require('module/common');
	var ui = require('module/ui');

	function sendSmsCode(options, success, fail, sync) {
		var url = "?c=sms&m=sendSmsCode";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});