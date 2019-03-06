define(function(require, exports) {

	exports.getChargeList = getChargeList;
	exports.getWithdrawList = getWithdrawList;
	exports.getFinanceRecordList = getFinanceRecordList;

	var common = require('module/common');

	function getChargeList(options, success, fail, sync) {
		var url = "?c=finance&m=chargeList";
		var data = {
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getWithdrawList(options, success, fail, sync) {
		var url = "?c=finance&m=withdrawList";
		var data = {
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getFinanceRecordList(options, success, fail, sync) {
		var url = "?c=finance&m=financeRecordList";
		var data = {
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});