define(function(require, exports) {

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