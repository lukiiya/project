define(function(require, exports) {

	exports.createGuide = createGuide;

	var common = require('module/common');
	var ui = require('module/ui');

	function createGuide(options, success, fail, sync) {
		var url = "?c=guide&m=createGuide";
		var data = {
			guideUserNo: options.guideUserNo,
			accessPage: options.accessPage
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}	
});