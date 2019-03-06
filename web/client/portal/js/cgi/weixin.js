define(function(require, exports) {

	exports.getJssdk = getJssdk;

	var common = require('module/common');

	function getJssdk(options, success, fail, sync) {
		var url = "?c=weixin&m=jssdk";
		var data = {
			url: window.location.href.replace(/[#].*/g, "")
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});