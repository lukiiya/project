define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var presentOrderSuccessView = require('view/presentOrderSuccess');
	var orderNo = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || '';
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
	}

	function setMain(view) {
		var options = {
			title: "付款成功",
			className: 'ssqhb',
			showHeader: true,
			isSupplierHeader: true,
			rightButtonText: '我的',
			rightButtonFun: function(){
				common.locationUrl("#presentOrderList")
			}
		}
		var data = {
			IMG_PATH: IMG_PATH,
			isApp: common.isApp()
		}
		main.setMain(view, options);
		main.setContent(presentOrderSuccessView.content(data));
		var presentRemark = common.getCache('ssqhbRemark') || '快来抢红包';
		$("#shareWechat").on('click', function() {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("shareWechat",{
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				});
			} else if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.ssqHbShareToFriend.postMessage({
	    			title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
	    		});
			}
		})
		$("#shareWechatMoments").on('click', function() {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("shareWechatMoments",{
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				});
			} else if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.ssqHbShareToCircle.postMessage({
	    			title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
	    		});
			}
		})
		$("#shareBtn").on('click', function() {
			if (common.isWeixinBrowser()) {
				var data = {
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				}
				ui.showShare(data);
			}
		})
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}

});