define(function(require, exports) {

	exports.createFocus = createFocus;
	exports.cancelFocus = cancelFocus;
	exports.activeFocus = activeFocus;
	exports.getFocusList = getFocusList;

	var common = require('module/common');

	function createFocus(options, success, fail, sync) {
		var url = "?c=focus&m=createFocus";
		var data = {
			userNo: options.userNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function cancelFocus(options, success, fail, sync) {
		var url = "?c=focus&m=cancelFocus";
		var data = {
			userNo: options.userNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function activeFocus(options, success, fail, sync) {
		var url = "?c=focus&m=activeFocus";
		var data = {
			userNo: options.userNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getFocusList(options, success, fail, sync) {
		var url = "?c=focus&m=focusList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

});