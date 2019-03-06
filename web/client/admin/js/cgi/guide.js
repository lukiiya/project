/*引导*/ 
define(function(require, exports) {

	exports.getGuideList = getGuideList;

	var common = require('module/common');

	function getGuideList(options, success, fail, sync) {
		var url = "?p=admin&c=guide&m=guideList";
		var data = {
			guideUserName: options.guideUserName,
			accessUserName: options.accessUserName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

});