define(function(require, exports) {

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
