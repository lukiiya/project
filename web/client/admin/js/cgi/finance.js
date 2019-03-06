/* 用户 */
define(function(require, exports){
	
	exports.getRecordList = getRecordList;
	exports.getConsumeList = getConsumeList;
	exports.getIncomeList = getIncomeList;
	exports.getWithdrawList = getWithdrawList;
	exports.getChargeList = getChargeList;
	exports.getTradeList = getTradeList;
	exports.getTransferList = getTransferList;
	exports.verifyWithdraw = verifyWithdraw;

	var common = require('module/common');

	function getRecordList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=recordList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			channel: options.channel,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getConsumeList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=consumeList";
		var data = {
			userId: options.userId,
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getIncomeList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=incomeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			planId: options.planId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getWithdrawList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=withdrawList";
		var data = {
			userName: options.userName,
			status: options.status,
			accountType: options.accountType,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getChargeList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=chargeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTradeList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=tradeList";
		var data = {
			tradeNo: options.tradeNo,
			orderId: options.orderId,
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			tradeType: options.tradeType,
			financeType: options.financeType,
			type: options.type,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTransferList(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=transferList";
		var data = {
			withdrawId: options.withdrawId,
			userName: options.userName,
			batchNo: options.batchNo,
			transferNo: options.transferNo,
			beginTime: options.beginTime,
			endTime: options.endTime,
			status: options.status,
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function verifyWithdraw(options, success, fail, sync) {
		var url = "?p=admin&c=finance&m=verifyWithdraw";
		var data = {
			withdrawId : options.withdrawId,
			status: options.status
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});