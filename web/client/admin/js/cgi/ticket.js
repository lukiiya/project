define(function(require, exports){

	exports.getTicketList = getTicketList;

	var common = require('module/common');

	function getTicketList(options, success, fail, sync) {
		var url = "?p=admin&c=ticket&m=ticketList";
		var data = {
			issue: options.issue,
			lotteryId: options.lotteryId,
			status: options.status,
			userName: options.userName,
			supplierName: options.supplierName,
			orderId: options.orderId,
			ticketId: options.ticketId,
			platformId: options.platformId,
			printNo: options.printNo,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});