define(function(require, exports) {

	exports.getStationDepositInfo = getStationDepositInfo;
	exports.getStationDepositList = getStationDepositList;
	exports.createStationDeposit = createStationDeposit;
	exports.modifyStationDeposit = modifyStationDeposit;
	exports.deleteStationDeposit = deleteStationDeposit;

	var common = require('module/common');
	var ui = require('module/ui');

	function getStationDepositInfo(options, success, fail, sync) {
		var url = "?p=admin&c=station&m=stationDepositInfo";
		var data = {
			depositId: options.depositId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStationDepositList(options, success, fail, sync) {
		var url = "?p=admin&c=station&m=stationDepositList";
		var data = {
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createStationDeposit(options, success, fail, sync) {
		var url = "?p=admin&c=station&m=createStationDeposit";
		var data = {
			userId: options.userId,
			date: options.date,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyStationDeposit(options, success, fail, sync) {
		var url = "?p=admin&c=station&m=modifyStationDeposit";
		var data = {
			depositId: options.depositId,
			userId: options.userId,
			date: options.date,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteStationDeposit(options, success, fail, sync) {
		var url = "?p=admin&c=station&m=deleteStationDeposit";
		var data = {
			depositId: options.depositId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});