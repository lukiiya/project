define(function(require, exports) {
	
	exports.getBannerList = getBannerList;

	var common = require('module/common');

	function getBannerList(options, success, fail, sync) {
		var url = "?c=banner&m=bannerList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});