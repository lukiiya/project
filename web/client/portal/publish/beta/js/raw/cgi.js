define('cgi/activity',function(require, exports) {

	exports.getActivityInfo = getActivityInfo;
	exports.receiveHongBao = receiveHongBao;
	exports.isReceiveHongBao = isReceiveHongBao;
	exports.getChargeActivityInfo = getChargeActivityInfo;
	exports.getTurnplateActivityInfo = getTurnplateActivityInfo;
	exports.rotateTurnplate = rotateTurnplate;
	exports.getTurnplateList = getTurnplateList;
	exports.isReceiveHongBao2017ChunJie = isReceiveHongBao2017ChunJie;
	exports.receiveHongBao2017ChunJie = receiveHongBao2017ChunJie;
	exports.guessWinner = guessWinner;
	exports.guessInfo = guessInfo;
	exports.getHongBao2018ChunJieInfo = getHongBao2018ChunJieInfo;
	exports.getHongBao2018ChunJieList = getHongBao2018ChunJieList;
	exports.receiveHongBao2018ChunJie = receiveHongBao2018ChunJie;
	exports.receiveHongBaoDaily = receiveHongBaoDaily;
	exports.receiveCoupon = receiveCoupon;
	exports.getHongBaoDailyInfo = getHongBaoDailyInfo;

	var common = require('module/common');
	var ui = require('module/ui');

	function getActivityInfo(options, success, fail, sync) {
		var url = "?c=activity&m=activityInfo";
		var data = {
			activityNo: options.activityNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function receiveHongBao(options, success, fail, sync) {
		var url = "?c=activity&m=receiveHongBao";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function isReceiveHongBao(options, success, fail, sync) {
		var url = "?c=activity&m=isReceiveHongBao";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getChargeActivityInfo(options, success, fail, sync) {
		var url = "?c=activity&m=chargeActivityInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getTurnplateActivityInfo(options, success, fail, sync) {
		var url = "?c=activity&m=turnplateActivityInfo";
		var data = {
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function rotateTurnplate(options, success, fail, sync) {
		var url = "?c=activity&m=rotateTurnplate";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getTurnplateList(options, success, fail, sync) {
		var url = "?c=activity&m=turnplateList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function isReceiveHongBao2017ChunJie(options, success, fail, sync) {
		var url = "?c=activity&m=isReceiveHongBao2017ChunJie";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveHongBao2017ChunJie(options, success, fail, sync) {
		var url = "?c=activity&m=receiveHongBao2017ChunJie";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function guessWinner(options, success, fail, sync) {//联合会杯竞猜
		var url = "?c=activity&m=guessWinner";
		var data = {
			teamId: options.teamId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function guessInfo(options, success, fail, sync) {//联合会杯活动详情
		var url = "?c=activity&m=guessInfo";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getHongBao2018ChunJieInfo(options, success, fail, sync) {
		var url = "?c=activity&m=hongBao2018ChunJieInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getHongBao2018ChunJieList(options, success, fail, sync) {
		var url = "?c=activity&m=hongBao2018ChunJieList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveHongBao2018ChunJie(options, success, fail, sync) {
		var url = "?c=activity&m=receiveHongBao2018ChunJie";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveHongBaoDaily(options, success, fail, sync) {
		var url = "?c=activity&m=receiveHongBaoDaily";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveCoupon(options, success, fail, sync) {
		var url = "?c=activity&m=receiveCoupon";
		var data = {
			type: options.type
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getHongBaoDailyInfo(options, success, fail, sync) {
		var url = "?c=activity&m=hongBaoDailyInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/banner',function(require, exports) {
	
	exports.getBannerList = getBannerList;

	var common = require('module/common');

	function getBannerList(options, success, fail, sync) {
		var url = "?c=banner&m=bannerList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/channel',function(require, exports) {

	exports.getStatisticsList = getStatisticsList;
	exports.getChannelUserList = getChannelUserList;
	exports.getChannelOrderList = getChannelOrderList;
	exports.getShareLink = getShareLink;

	var common = require('module/common');
	var ui = require('module/ui');

	function getStatisticsList(options, success, fail, sync) {
		var url = "?c=channel&m=statisticsList";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getChannelUserList(options, success, fail, sync) {
		var url = "?c=channel&m=channelUserList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getChannelOrderList(options, success, fail, sync) {
		var url = "?c=channel&m=channelOrderList";
		var data = {
			userId: options.userId,
			beginTime: options.beginTime,
			endTime: options.endTime,
			ticketType: options.ticketType, //1=竞技彩 2=高频彩
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getShareLink(options, success, fail, sync) {
		var url = "?c=channel&m=getShareLink";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/combo',function(require, exports) {
	
	exports.getComboList = getComboList;

	var common = require('module/common');

	function getComboList(options, success, fail, sync) {
		var url = "?c=combo&m=comboList";
		var data = {
			comboType: options.comboType,//套餐类型, 1=极限追盘,2=晒米冷热
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/coupon',function(require, exports) {

	exports.getUserCouponList = getUserCouponList;
	exports.receiveUserCouponList = receiveUserCouponList;
	exports.isReceiveUserCoupon = isReceiveUserCoupon;
	
	var common = require('module/common');
	var ui = require('module/ui');

	
	function getUserCouponList(options, success, fail, sync) {
		var url = "?c=coupon&m=userCouponList";
		var data = {
			state: options.state,//优惠券状态 1:可用,2:待派发,3:已用/过期,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function receiveUserCouponList(options, success, fail, sync) {
		var url = "?c=coupon&m=receiveUserCouponList";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	//是否领取
	function isReceiveUserCoupon(options, success, fail, sync) { 
		var url = "?c=coupon&m=isReceiveUserCoupon";
		var data = {
			noJumpLogin: options.noJumpLogin
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});

define('cgi/finance',function(require, exports) {

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
define('cgi/floatIcon',function(require, exports) {
	
	exports.getFloatIconInfo = getFloatIconInfo;

	var common = require('module/common');

	function getFloatIconInfo(options, success, fail, sync) {
		var url = "?c=floatIcon&m=floatIconInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/focus',function(require, exports) {

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
define('cgi/guide',function(require, exports) {

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
define('cgi/jxzp',function(require, exports) {
	
	exports.getJxzpList = getJxzpList;
	exports.getJxzpStatistics = getJxzpStatistics;
	exports.getJxzpInfo = getJxzpInfo;
	exports.hasJxzpInfo = hasJxzpInfo;

	var common = require('module/common');

	function getJxzpList(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpList";
		var data = {
			type: options.type,//类型, 1=胜平负, 2=输赢盘
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getJxzpStatistics(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpStatistics";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getJxzpInfo(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpInfo";
		var data = {
			type: options.type,
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function hasJxzpInfo(options, success, fail, sync) {
		var url = "?c=jxzp&m=hasJxzpInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/lottery',function(require, exports) {

	exports.lotteryIssueInfo = lotteryIssueInfo;
	exports.lotteryIssueList = lotteryIssueList;
	exports.lotteryList = lotteryList;

	var common = require('module/common');
	
	function lotteryIssueInfo(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryIssueInfo";
		var data = {
			lotteryId: options.lotteryId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function lotteryIssueList(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryIssueList";
		var data = {
			lotteryId: options.lotteryId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function lotteryList(options, success, fail, sync) {
		var url = "?c=lottery&m=lotteryList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/match',function(require, exports) {
	
	exports.getMatchInfo = getMatchInfo;
	exports.getMatchList = getMatchList;
	exports.getHotMatchList = getHotMatchList;
	exports.getHotMatchLeagueList = getHotMatchLeagueList;
	exports.getMatchRecommend = getMatchRecommend;
	exports.getMatchLeagueList = getMatchLeagueList;
	exports.getGuessList = getGuessList;
	exports.getGuessTeamList = getGuessTeamList;
	exports.getDateList = getDateList;

	var common = require('module/common');

	function getMatchInfo(options, success, fail, sync) {
		var url = "?c=match&m=matchInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMatchList(options, success, fail, sync) {
		var url = "?c=match&m=matchList";
		var data = {
			type: options.type,
			league: options.league,
			needYaPan: options.needYaPan,
			needSingle: options.needSingle
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getHotMatchList(options, success, fail, sync) {
		var url = "?c=match&m=hotMatchList";
		var data = {
			type: options.type,//1=足球，2=篮球
			league: options.league,
			saleTime: options.saleTime,//日期
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getHotMatchLeagueList(options, success, fail, sync) {
		var url = "?c=match&m=hotMatchLeagueList";
		var data = {
			saleTime: options.saleTime, 
			type: options.type,//1=足球，2=篮球
			status: options.status,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getMatchRecommend(options, success, fail, sync) {
		var url = "?c=match&m=matchRecommend";
		var data = {
			matchRecommend: options.matchRecommend,
			needYaPan: options.needYaPan
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getMatchLeagueList(options, success, fail, sync)  {
		var url = "?c=match&m=matchLeagueList";
		var data = {
			type: options.type,//1=足球，2=篮球
			status: options.status,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			needYaPan: options.needYaPan
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getGuessList(options, success, fail, sync)  {
		var url = "?c=match&m=guessList";
		var data = {
			lotteryId: options.lotteryId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getGuessTeamList(options, success, fail, sync)  {
		var url = "?c=match&m=guessTeamList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getDateList(options, success, fail, sync)  {
		var url = "?c=match&m=dateList";
		var data = {
			type: options.type //1=足球，2=篮球
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/matchAnalyse',function(require, exports) {

	exports.getMatchOddsAnalyseList = getMatchOddsAnalyseList;
	exports.getMatchAnalyseList = getMatchAnalyseList;

	var common = require('module/common');
	var ui = require('module/ui');

	function getMatchOddsAnalyseList(options, success, fail, sync) { //赔率数据
		var url = "?c=matchAnalyse&m=matchOddsAnalyseList";
		var data = {
			matchId: options.matchId,
			type: options.type, //1=欧赔，2=亚盘，3=大小分
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getMatchAnalyseList(options, success, fail, sync) { //分析数据
		var url = "?c=matchAnalyse&m=matchAnalyseList";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/order',function(require, exports) {

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
define('cgi/plan',function(require, exports) {

	exports.createPlan = createPlan;
	exports.getPlanInfo = getPlanInfo;
	exports.getPlanList = getPlanList;
	exports.getPlanTrendList = getPlanTrendList;
	exports.getPlanPrice = getPlanPrice;
	exports.planUpCount = planUpCount;
	exports.planDownCount = planDownCount;
	exports.planShareCount = planShareCount;
	exports.createDigitalPlan = createDigitalPlan;
	exports.getDigitalPlanList = getDigitalPlanList;
	exports.getDigitalPlanInfo = getDigitalPlanInfo;

	var common = require('module/common');
	var ui = require('module/ui');

	function createPlan(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=plan&m=createPlan";
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
		var matchRecommend = options.matchRecommend || "";
		var content = options.content || "";
		var amount = options.amount || 0;
		var matchType = options.matchType || 0;
		var title = options.title || "";
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("matchRecommend", matchRecommend);
		fd.append("content", content);
		fd.append("amount", amount);
		fd.append("matchType", matchType);
		fd.append("title", title);
		if (file && file.length) {
			//一张图片1分钟
			loadingTime = file.length*60*1000;
			$.each(file, function(i, item) {
				fd.append("file[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						common.clearCache('c=plan&m=planList');//清除缓存
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

	function getPlanInfo(options, success, fail, sync) {
		var url = "?c=plan&m=planInfo";
		var data = {
			needUser: options.needUser,
			planNo: options.planNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getPlanList(options, success, fail, sync) {
		var url = "?c=plan&m=planList";
		var data = {
			matchType: options.matchType,//1=足球，2=篮球
			groupNo: options.groupNo,
			matchId: options.matchId,
			userNo: options.userNo,
			needHome: options.needHome,
			needGirl: options.needGirl,
			needSale: options.needSale,
			needSaleTicket: options.needSaleTicket,
			needUser: options.needUser,
			needAccess: options.needAccess,
			matchStatus: options.matchStatus,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			recommendType: options.recommendType,//1=单关, 2=串关
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	//方案走势
	function getPlanTrendList(options, success, fail, sync) {
		var url = "?c=plan&m=planTrendList";
		var data = {
			userNo: options.userNo,
			recommendType: options.recommendType//1=单关, 2=串关
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getPlanPrice(options, success, fail, sync) {
		var url = "?c=plan&m=planPrice";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	//方案点赞计数
	function planUpCount(options, success, fail, sync) {
		var url = "?c=plan&m=planUpCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//方案鄙视计数
	function planDownCount(options, success, fail, sync) {
		var url = "?c=plan&m=planDownCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//方案分享计数
	function planShareCount(options, success, fail, sync) {
		var url = "?c=plan&m=planShareCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}	
	
	//数字彩发推荐
	function createDigitalPlan(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=plan&m=createDigitalPlan";
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
		var content = options.content || "";
		var amount = options.amount || 0;
		var lotteryId = options.lotteryId;
		var issue = options.issue;
		var betContent = options.betContent || '';
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("content", content);
		fd.append("amount", amount);
		fd.append("lotteryId", lotteryId);
		fd.append("issue", issue);
		fd.append("betContent", betContent);
		if (file && file.length) {
			//一张图片1分钟
			loadingTime = file.length*60*1000;
			$.each(file, function(i, item) {
				fd.append("file[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						common.clearCache('c=plan&m=digitalPlanList');//清除缓存
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
	
	function getDigitalPlanList(options, success, fail, sync) {
		var url = "?c=plan&m=digitalPlanList";
		var data = {
			lotteryId: options.lotteryId,
			groupNo: options.groupNo,
			userNo: options.userNo,
			needSaleTicket: options.needSaleTicket,//是否可以跟单
			needUser: options.needUser,
			needAccess: options.needAccess,
			planStatus: options.planStatus,//1=未结束, 2=已结束
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getDigitalPlanInfo(options, success, fail, sync) {
		var url = "?c=plan&m=digitalPlanInfo";
		var data = {
			needUser: options.needUser,
			planNo: options.planNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/replay',function(require, exports) {
	
	exports.createReplay = createReplay;
	exports.getReplayInfo = getReplayInfo;
	exports.getReplayList = getReplayList;
	exports.replayUpCount = replayUpCount;
	exports.replayDownCount = replayDownCount;
	exports.replayShareCount = replayShareCount;

	var common = require('module/common');
	var ui = require('module/ui');
	
	function createReplay(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=replay&m=createReplay";
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
		var title = options.title || "";
		var content = options.content || "";
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("title", title);
		fd.append("content", content);
		if (file && file.length) {
			//一张图片1分钟
			loadingTime = file.length*60*1000;
			$.each(file, function(i, item) {
				fd.append("file[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						common.clearCache('c=replay&m=replayList');//清除缓存
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
	
	function getReplayInfo(options, success, fail, sync) {
		var url = "?c=replay&m=replayInfo";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getReplayList(options, success, fail, sync) {
		var url = "?c=replay&m=replayList";
		var data = {
			needUser: options.needUser,
			needAll: options.needAll,
			userNo: options.userNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	//复盘点赞计数
	function replayUpCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayUpCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//复盘鄙视计数
	function replayDownCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayDownCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//复盘分享计数
	function replayShareCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayShareCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/sign',function(require, exports) {

	exports.signInfo = signInfo;
	exports.createSign = createSign;

	var common = require('module/common');
	var ui = require('module/ui');

	function signInfo(options, success, fail, sync) {
		var url = "?c=sign&m=signInfo";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createSign(options, success, fail, sync) {
		var url = "?c=sign&m=createSign";
		var data = {};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/smlr',function(require, exports) {
	
	exports.getSmlrInfo = getSmlrInfo;
	exports.hasSmlrInfo = hasSmlrInfo;

	var common = require('module/common');

	function getSmlrInfo(options, success, fail, sync) {
		var url="?c=smlr&m=smlrInfo";
		var data = {
			matchId: options.matchId
		}
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function hasSmlrInfo(options, success, fail, sync) {
		var url = "?c=smlr&m=hasSmlrInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/sms',function(require, exports) {

	exports.sendSmsCode = sendSmsCode;

	var common = require('module/common');
	var ui = require('module/ui');

	function sendSmsCode(options, success, fail, sync) {
		var url = "?c=sms&m=sendSmsCode";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/station',function(require, exports) {

	exports.stationTicketStatistics = stationTicketStatistics;

	var common = require('module/common');
	var ui = require('module/ui');

	function stationTicketStatistics(options, success, fail, sync) {
		var url = "?c=station&m=stationTicketStatistics";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/user',function(require, exports) {
	
	exports.login = login;
	exports.getUserInfo = getUserInfo;
	exports.getUserList = getUserList;
	exports.getUserRankList = getUserRankList;
	exports.getGroupList = getGroupList;
	exports.withdraw = withdraw;
	exports.getUserFinanceInfo = getUserFinanceInfo;
	exports.createUserVerify = createUserVerify;
	exports.mobileToggleUser = mobileToggleUser;
	exports.bindMobile = bindMobile;
	exports.getUserArticleList = getUserArticleList;
	exports.getWinRateRankList = getWinRateRankList;
	exports.getProfitRateRankList = getProfitRateRankList;
	var common = require('module/common');
	var ui = require('module/ui');
	var weixinCgi = require('cgi/weixin');

	//登录
	function login(){
		weixinCgi.getJssdk({}, function(ret) {
			if (ret.errCode != 0) {
				UI.showNotice(ret.msg);
				return;
			}
			//防止不同用户登录同一缓存
            common.clearCache();
			var data = ret.data || {};
			var href = location.href || '';
			href = href.replace(/#\blogin\b/, '#home');
			href = encodeURIComponent(href);
			var url = location.protocol + "//" + location.host + PROXY + "?c=user&m=toggleUser&url=" + href;
			var channel = $.trim(common.getUrlParam('channel'));
			var source = $.trim(common.getUrlParam('source'));
			if (channel) {
				url += '&channel=' + channel;
			}
			if (source) {
				url += '&source=' + source;
			}
			var oauth = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect';
			oauth = oauth.replace(/\$\{appid\}/, data.appId);
			oauth = oauth.replace(/\$\{url\}/, encodeURIComponent(url));
			oauth = oauth.replace(/\$\{scope\}/, 'snsapi_userinfo');
			location.replace(oauth);
		});
	}

	function getUserInfo(options, success, fail, sync) {
		var url = "?c=user&m=userInfo";
		var data = {
			userNo: options.userNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserList(options, success, fail, sync) {
		var url = "?c=user&m=userList";
		var data = {
			groupNo: options.groupNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			mock: options.mock
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserRankList(options, success, fail, sync) {
		var url = "?c=user&m=userRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGroupList(options, success, fail, sync) {
		var url = "?c=user&m=groupList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			mock: options.mock
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function withdraw(options, success, fail, sync) {
		var url = "?c=user&m=withdraw";
		var data = {
			financeType: options.financeType,
			amount: options.amount,
			accountNumber: options.accountNumber,
			accountName: options.accountName,
			accountUserName:　options.accountUserName,
			accountInfo: options.accountInfo,
			accountType: options.accountType
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserFinanceInfo(options, success, fail, sync) {
		var url = "?c=user&m=userFinanceInfo";
		var data = {
			financeType: options.financeType
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function createUserVerify(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=user&m=createUserVerify";
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
		var type = options.type || 0;
		var realName = options.realName || "";
		var phone = options.phone || "";
		var code = options.code || "";
		var identityImg = options.identityImg || null;
		var businessImg = options.businessImg || null;
		var remark = options.remark || "";
		var address = options.address || "";
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 0;
		var fd = new FormData();
		fd.append("type", type);
		fd.append("realName", realName);
		fd.append("phone", phone);
		fd.append("code", code);
		fd.append("remark", remark);
		fd.append("address", address);
		if (identityImg && identityImg.length) {
			//一张图片1分钟
			loadingTime += identityImg.length*60*1000;
			$.each(identityImg, function(i, item) {
				fd.append("identityImg[]", item);	
			});
		}
		if (businessImg && businessImg.length) {
			//一张图片1分钟
			loadingTime += businessImg.length*60*1000;
			$.each(businessImg, function(i, item) {
				fd.append("businessImg[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						//清除缓存
						common.clearCache('c=user&m=userInfo');
						common.clearCache('c=user&m=userList');
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

	function mobileToggleUser(options, success, fail, sync) {
		var url = "?c=user&m=mobileToggleUser";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function bindMobile(options, success, fail, sync) {
		var url = "?c=user&m=bindMobile";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getUserArticleList(options, success, fail, sync) {
		var url = "?c=user&m=userArticleList";
		var data = {
			userNo: options.userNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getWinRateRankList(options, success, fail, sync) {         //胜率榜
		var url= "?c=user&m=winRateRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getProfitRateRankList(options, success, fail, sync) {       //盈利榜
		var url= "?c=user&m=profitRateRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/verificationCode',function(require, exports) {
	
	exports.getVerificationImg = getVerificationImg;

	var common = require('module/common');

	function getVerificationImg(options, success, fail, sync) {
		var url = "?c=verificationCode&m=image";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/weixin',function(require, exports) {

	exports.getJssdk = getJssdk;

	var common = require('module/common');

	function getJssdk(options, success, fail, sync) {
		var url = "?c=weixin&m=jssdk";
		var data = {
			url: window.location.href.replace(/[#].*/g, "")
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});