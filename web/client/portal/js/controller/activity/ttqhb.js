define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var ttqhbView = require('view/activity/ttqhb');

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "天天抢红包",
			className: 'activity_ttqhb'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isWeixinBrowser()) {
			var data = {
				title: '晒米彩票每天一波红包雨',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/ttqhb',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ttqhb/ttqhb_share.jpg',
				desc: '现金、优惠券免费领'
			}
			ui.setShare(data);
		}
	}


	function setContent() {
		getHongBaoDailyInfo();
	}

	function getHongBaoDailyInfo() {
		var options = {
			
		}
		activityCgi.getHongBaoDailyInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var info = ret.data || {};
			var data = {
				info: info,
				IMG_PATH: IMG_PATH
			}
			main.setContent(ttqhbView.content(data));
			$("#startBtn").on('click', receiveHongBaoDaily);
			$("#getCouponBtn1,#getCouponBtn2,#getCouponBtn3").on('click', function() {
				var type = $(this).attr('type');
				receiveCoupon(type)
			});
		});
	}

	function receiveHongBaoDaily() {
		var options = {
			
		}
		activityCgi.receiveHongBaoDaily(options, function(ret) {
			var info = ret.data || {};
			var txt = {'title': '亲，未到开抢时间哦！','content': '每天09:00至23:59可抢','btnTxt': '我知道啦','undercondition': 0};
			var data = {
				info: info,
				txt: txt
			}
			if (ret.errCode == 2) {
				showNotStartBox(txt);
			} else if (ret.errCode == 0) {
				showSuccessBox(info)
				getHongBaoDailyInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function receiveCoupon(type) {
		var options = {
			type: type
		}
		activityCgi.receiveCoupon(options, function(ret) {
			var info = ret.data || {};
			var titleMap = {'1': '每天消费满500元才可领', '2': '每天消费满3000元才可领', '3': '每天消费满8000元才可领'}
			var txt = {};
			if (ret.errCode == 2) {
				txt = {'title': titleMap[type],'content': '','btnTxt': '知道了','undercondition': 1};
			} else if (ret.errCode == 3) {
				txt = {'title': '亲，今天您领取过','content': '每天仅能领取一个优惠券，请明天再来哦','btnTxt': '我知道了','undercondition': 0};
			}
			var data = {
				info: info,
				txt: txt
			}
			if (ret.errCode == 2 || ret.errCode == 3) {
				showNotStartBox(txt);
			} else if (ret.errCode == 0) {
				getCouponSuccessBox(info)
				getHongBaoDailyInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function showNotStartBox(txt) {
		closeNotStartBox();
		var data = {
			html: ttqhbView.notStartBox({
				txt: txt
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$("#closePopBtn").off().on("click", closeNotStartBox);
	} 

	function closeNotStartBox(){
		$("#ttqhbMask").remove();
	}

	function showSuccessBox(info) {
		closeSuccessBox();
		var isAndroid = common.isAndroid();
		var data = {
			html: ttqhbView.getSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info,
				isAndroid: isAndroid
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#my");
			}
		});
		$("#closePopBtn").off().on("click", closeSuccessBox);
	} 

	function closeSuccessBox(){
		$("#ttqhbMask").remove();
	}
	
	function getCouponSuccessBox(info) {
		closeCouponSuccessBox();
		var data = {
			html: ttqhbView.getCouponSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#my");
			}
		});
		$("#closePopBtn").off().on("click", closeCouponSuccessBox);
	} 

	function closeCouponSuccessBox(){
		$("#ttqhbMask").remove();
	}
});