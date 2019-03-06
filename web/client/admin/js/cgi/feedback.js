/*反馈*/ 
define(function(require, exports) {

	exports.getFeedbackList = getFeedbackList;

	var common = require('module/common');

	function getFeedbackList(options, success, fail, sync) {
		var url = "?p=admin&c=feedback&m=feedbackList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

});