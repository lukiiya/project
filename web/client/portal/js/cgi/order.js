define(function(require, exports) {

	exports.getOrderList = getOrderList;
	exports.createOrder = createOrder;
	exports.createChargeOrder = createChargeOrder;
	exports.createTicketChargeOrder = createTicketChargeOrder;
	exports.createComboOrder = createComboOrder;
	exports.createTicketOrder = createTicketOrder;
	exports.getTicketOrderList = getTicketOrderList;
	exports.getTicketOrderCount = getTicketOrderCount;
	exports.getTicketOrderInfo = getTicketOrderInfo;
	exports.uploadTicket = uploadTicket;
	exports.refuseTicket = refuseTicket;
	exports.sendTicketPrize = sendTicketPrize;
	exports.getJxzpOrderInfo = getJxzpOrderInfo;
	exports.createSmlrOrder = createSmlrOrder;
	exports.createJxzpOrder = createJxzpOrder;
	exports.getOrderTicketList = getOrderTicketList;
	exports.createSelfTicketOrder = createSelfTicketOrder;
	exports.createBatchTicketOrder = createBatchTicketOrder;
	exports.createDigitalTicketOrder = createDigitalTicketOrder;
	exports.createPresentOrder = createPresentOrder;
	exports.presentOrderList = presentOrderList;
	exports.receivedOrderList = receivedOrderList;
	exports.presentOrderInfo = presentOrderInfo;
	exports.receiveOrder = receiveOrder;
	exports.createGuessOrder = createGuessOrder;
	exports.createPublish = createPublish; //分享至跟单市场
	exports.getOrderPublishList = getOrderPublishList; //获取跟单市场列表
	exports.getOrderFollowList = getOrderFollowList; //用户跟单列表  （详情页）
	
	var common = require('module/common');
	var ui = require('module/ui');

	function getOrderList(options, success, fail, sync) {
		var url = "?c=order&m=orderList";
		var data = {
			needUser: options.needUser,
			needSpread: options.needSpread,
			needPlanAccess: options.needPlanAccess,
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			planType: options.planType
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createOrder(options, success, fail, sync) {
		var url = "?c=order&m=createOrder";
		var planNo = options.planNo || "";
		var planType = options.planType || 1;
		var redirectUrl;
		if (planType == 1) {
			redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#planDetail&planNo=" + planNo));
		} else if (planType == 2) {
			redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#digitalPlanDetail&planNo=" + planNo));
		}
		var data = {
			redirectUrl: redirectUrl,
			planNo: planNo,
			spreaderUserNo: options.spreaderUserNo,
			planType: planType
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createChargeOrder(options, success, fail, sync) {
		var url = "?c=order&m=createChargeOrder";
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#my"));
		var data = {
			redirectUrl: redirectUrl,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function createTicketChargeOrder(options, success, fail, sync) {
		var url = "?c=order&m=createTicketChargeOrder";
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#my"));
		var data = {
			redirectUrl: redirectUrl,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createComboOrder(options, success, fail, sync) {
		var url = "?c=order&m=createComboOrder";
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#jxzpList"));
		var data = {
			redirectUrl: redirectUrl,
			comboNo: options.comboNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createTicketOrder(options, success, fail, sync) {
		var url = "?c=order&m=createTicketOrder";
		var planNo = options.planNo || "";
		var planType = options.planType || 1;
		var continueHash = encodeURIComponent(common.getLocationHash());
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#ticketSuccess&continueHash=" + continueHash));
		var data = {
			redirectUrl: redirectUrl,
			planNo: planNo,
			ticketMultiple: options.ticketMultiple,
			ticketPassType: options.ticketPassType,
			planType: planType
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getTicketOrderList(options, success, fail, sync) {
		var url = "?c=order&m=ticketOrderList";
		var data = {
			type: options.type,
			ticketStatus: options.ticketStatus,
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			ticketType: options.ticketType,
			ticketStatus: options.ticketStatus
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTicketOrderCount(options, success, fail, sync) {
		var url = "?c=order&m=ticketOrderCount";
		var data = {
			type: options.type,
			ticketStatus: options.ticketStatus,
			nullTicketPrizeAmount: options.nullTicketPrizeAmount
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getTicketOrderInfo(options, success, fail, sync) {
		var url = "?c=order&m=ticketOrderInfo";
		var orderNo = options.orderNo || "";
		var data = {
			type: options.type,
			orderNo: orderNo
		}
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function uploadTicket(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=order&m=uploadTicket";
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY+url;
		var channel = $.trim(common.getUrlParam('channel'));
		var source = $.trim(common.getUrlParam('source'));
		var uoAuth = $.trim(common.getUrlParam('uoAuth'));
		var uoSign = $.trim(common.getUrlParam('uoSign'));
		if (channel) {
			url += '&channel=' + channel;
		}
		if (source && uoAuth && uoSign) {
			url += '&source=' + source + '&uoAuth=' + uoAuth + '&uoSign=' + uoSign;	
		}
		var orderNo = options.orderNo || "";
		var ticketImg = options.ticketImg || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 0;
		var fd = new FormData();
		fd.append("orderNo", orderNo);
		if (ticketImg && ticketImg.length) {
			//一张图片1分钟
			loadingTime += ticketImg.length*60*1000;
			$.each(ticketImg, function(i, item) {
				fd.append("ticketImg[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						//清除缓存
						common.clearCache('c=order&m=ticketOrderInfo');
						common.clearCache('c=order&m=ticketOrderList');
						success.call(this, json);
					} else {
						fail.call(this, e);	
					}
				} else {
					fail.call(this, e);		
				}
				ui.closeLoading();
			}
		};
		// 开始上传
		xhr.open("POST", url, sync);
		xhr.send(fd);
	}

	function refuseTicket(options, success, fail, sync) {
		var url = "?c=order&m=refuseTicket";
		var data = {
			orderNo: options.orderNo
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function sendTicketPrize(options, success, fail, sync) {
		var url = "?c=order&m=sendTicketPrize";
		var data = {
			orderNo: options.orderNo,
			ticketPrizeAmount: options.ticketPrizeAmount
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getJxzpOrderInfo(options, success, fail, sync) {
		var url = "?c=order&m=jxzpOrderInfo";
		var data = {}
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function createSmlrOrder(options, success, fail, sync) {
		var url = "?c=order&m=createSmlrOrder";
		var matchId = options.matchId;
		var type = options.type;
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#hotMatchDetail&matchId="+matchId+"&type="+type+"&tab=3"));
		var data = {
			redirectUrl: redirectUrl,
			matchId: matchId
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function createJxzpOrder(options, success, fail, sync) {
		var url = "?c=order&m=createJxzpOrder";
		var matchId = options.matchId;
		var type = options.type;
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#hotMatchDetail&matchId="+matchId+"&type="+type+"&tab=4"));
		var data = {
			redirectUrl: redirectUrl,
			matchId: matchId
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getOrderTicketList(options, success, fail, sync) {
		var url="?c=order&m=orderTicketList";
		var orderNo = options.orderNo || "";
		var data = {
			orderNo: orderNo
		}
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function createSelfTicketOrder(options, success, fail, sync) {
		var url="?c=order&m=createSelfTicketOrder";
		var continueHash = encodeURIComponent(common.getLocationHash());
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#ticketSuccess&continueHash=" + continueHash));
		var data = {
			redirectUrl: redirectUrl,
			matchRecommend: options.matchRecommend,
			ticketMultiple: options.ticketMultiple,
			ticketPassType: options.ticketPassType,
			matchType: options.matchType,
			lotteryId: options.lotteryId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function createBatchTicketOrder(options, success, fail, sync) {
		var url="?c=order&m=createBatchTicketOrder";
		var continueHash = encodeURIComponent(common.getLocationHash());
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#ticketSuccess&continueHash=" + continueHash));
		var data = {
			redirectUrl: redirectUrl,
			betContent: options.betContent
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	//彩票接口
	function createDigitalTicketOrder(options, success, fail, sync) {
		var url = "?c=order&m=createDigitalTicketOrder";
		var planNo = options.planNo || "";
		var continueHash = encodeURIComponent(common.getLocationHash());
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#ticketSuccess&continueHash=" + continueHash));
		var data = {
			redirectUrl: redirectUrl,
			ticketMultiple: options.ticketMultiple,
			issue: options.issue,
			lotteryId: options.lotteryId,
			ticketAppend: options.ticketAppend,
			betContent: options.betContent,
			planNo: planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	//双色球红包
	function createPresentOrder(options, success, fail, sync) {
		var url = "?c=order&m=createPresentOrder";
		var redirectUrl = encodeURIComponent(location.href.replace(/[#\?].*/g, "#presentOrderSuccess"));
		var data = {
			redirectUrl: redirectUrl,
			tradeType: options.tradeType,
			presentNum: options.presentNum,
			presentRemark: options.presentRemark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function presentOrderList(options, success, fail, sync) {
		var url = "?c=order&m=presentOrderList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receivedOrderList(options, success, fail, sync) {
		var url = "?c=order&m=receivedOrderList";
		var data = {
			type: options.type,
			orderNo: options.orderNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function presentOrderInfo(options, success, fail, sync) {
		var url = "?c=order&m=presentOrderInfo";
		var data = {
			orderNo: options.orderNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveOrder(options, success, fail, sync) {
		var url = "?c=order&m=receiveOrder";
		var data = {
			orderNo: options.orderNo,
			noJumpLogin: options.noJumpLogin
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function createGuessOrder(options, success, fail, sync) { //世界杯猜冠军下单
		var url = "?c=order&m=createGuessOrder";
		var data = {
			ticketMultiple: options.ticketMultiple,
			lotteryId: options.lotteryId,
			matchRecommend: options.matchRecommend
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function createPublish(options, success, fail, sync) { //分享订单至跟单市场
		var url = "?c=order&m=publish";
		var data = {
			orderNo: options.orderNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getOrderPublishList(options, success, fail, sync) { //分享订单至跟单市场
		var url = "?c=order&m=orderPublishList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getOrderFollowList(options, success, fail, sync) { //分享订单至跟单市场
		var url = "?c=order&m=orderFollowList";
		var data = {
			orderNo: options.orderNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});