define(function(require, exports){

	exports.getOrderList = getOrderList;
	exports.getMyappOrderList = getMyappOrderList;
	exports.getQmdbOrderList = getQmdbOrderList;
	exports.getLxscOrderList = getLxscOrderList;
	exports.getMfspOrderList = getMfspOrderList;
	exports.getYlwcOrderList = getYlwcOrderList;
	exports.getGlmjOrderList = getGlmjOrderList;
	exports.getGlmj1OrderList = getGlmj1OrderList;
	exports.getGlmj2OrderList = getGlmj2OrderList;
	exports.getGlmj3OrderList = getGlmj3OrderList;
	exports.getGlmj4OrderList = getGlmj4OrderList;
	exports.getGlmj5OrderList = getGlmj5OrderList;
	exports.getGlmj6OrderList = getGlmj6OrderList;
	exports.getGlmj7OrderList = getGlmj7OrderList;
	exports.getGlmj8OrderList = getGlmj8OrderList;
	exports.getGlmj9OrderList = getGlmj9OrderList;
	exports.getGlmj10OrderList = getGlmj10OrderList;
	exports.getTvsouOrderList = getTvsouOrderList;
	exports.getLl6OrderList = getLl6OrderList;
	exports.refundTicket = refundTicket;
	exports.sendTicketPrize = sendTicketPrize;
	exports.modifyTicketPrizeAmount = modifyTicketPrizeAmount;

	var common = require('module/common');

	function getOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=orderList";
		var data = {
			userId: options.userId,
			userName: options.userName,
			planUserName: options.planUserName,
			spreaderUserName: options.spreaderUserName,
			ticketUserName: options.ticketUserName,
			orderId: options.orderId,
			orderNo: options.orderNo,
			orderNumeric: options.orderNumeric,
			planId: options.planId,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			comboType: options.comboType,
			planMatchType: options.planMatchType,
			ticketPrizeDivideStatus: options.ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: options.ticketAttachPrizeStatus,
			ticketPrizeVerifyStatus: options.ticketPrizeVerifyStatus,
			issue: options.issue,
			lotteryId: options.lotteryId,
			source: options.source,
			channel: options.channel,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMyappOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=myappOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getQmdbOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=qmdbOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLxscOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=lxscOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMfspOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=mfspOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getYlwcOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=ylwcOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmjOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmjOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj1OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj1OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj2OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj2OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj3OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj3OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj4OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj4OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj5OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj5OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj6OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj6OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}


	function getGlmj7OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj7OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}


	function getGlmj8OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj8OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj9OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj9OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj10OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=glmj10OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTvsouOrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=tvsouOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLl6OrderList(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=ll6OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function refundTicket(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=refundTicket";
		var data = {
			orderId: options.orderId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function sendTicketPrize(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=sendTicketPrize";
		var data = {
			orderId: options.orderId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyTicketPrizeAmount(options, success, fail, sync) {
		var url = "?p=admin&c=order&m=modifyTicketPrizeAmount";
		var data = {
			orderId: options.orderId,
			ticketPrizeAmount: options.ticketPrizeAmount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

});