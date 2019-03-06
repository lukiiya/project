define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var couponCgi = require('cgi/coupon');
	var rechargeSendView = require('view/activity/rechargeSend');
	var rules = null;

	function init(view) {
		rules = common.getUrlParam("rules") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		rules = null;
		clearTimeout(receiveUserCouponList.timer);
	}

	function setMain(view) {
		var options = {
			title: rules ? "活动规则" : "充20得128元",
			className: 'activity_20send128',
			showHeader: rules ? true : false,
			isLeftIconHeader: rules ? true : false
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (rules) {
			main.setContent(rechargeSendView.activityRules(data));
		} else {
			main.setContent(rechargeSendView.activityCotent(data));
		}
		$("#rulesBtn").on('click', function() {
			common.locationUrl("#activity/rechargeSend&rules=true");
		})
		$("#getBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("chargeCJ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.activityRecharge.postMessage({
	    			financeType: 1
	    		});
			} else {
				common.locationUrl("#charge&financeType=1");
			}
		})
	}

	function setContent() {
		receiveUserCouponList();
		isReceiveUserCoupon();
	}
	
	function receiveUserCouponList() {
		clearTimeout(receiveUserCouponList.timer);
		var options = {};
		couponCgi.receiveUserCouponList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#receiveList").html(rechargeSendView.receiveList(data));
			var textScroll = function() {
				var ul = $("#receiveList");
				var li = ul.find("li");
				var length = li.length;
				if (length <= 1) {
					return;
				}
				var firstLi = li.eq(0);
				var height = firstLi.outerHeight(true);
				firstLi.animate({marginTop: -height}, 500, function() {
					firstLi.appendTo(ul).css({marginTop:0});
            		receiveUserCouponList.timer = setTimeout(textScroll, 1000);
				});
			};
			receiveUserCouponList.timer = setTimeout(textScroll, 1000);
			
		});
	}
	
	function isReceiveUserCoupon() {
		var options = {
			noJumpLogin: true
		};
		couponCgi.isReceiveUserCoupon(options, function(ret) {
			if (ret.errCode == 1) {
				return;
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data;
			if (activity) {
				$('#getBtn').removeClass('get_btn').addClass('getted_btn');
				$('#getBtn').off();
			}
		});
	}
});