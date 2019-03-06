define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var wdlszlzzView = require('view/activity/wdlszlzz');
	var webCalliOS = null;

	function init(view) {
		webCalliOS = parseInt(common.getUrlParam("webCalliOS")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		webCalliOS = null;
	}

	function setMain(view) {
		var options = {
			title: "晒米场－五大联赛之六宗最",
			className: 'activity_wdlszlzz'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(wdlszlzzView.content(data));
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.setShare(data);
		}
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		}
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JCZQ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JCZQ"
		    	});
			} else {
				common.locationUrl("#match&self=true&type=1");
			}
		})
		
		$("#shareBtn").on('click', function() {
			ssqhbShare()
		})
	}

	function setContent() {
		
	}
	
	function ssqhbShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			});
		} else if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_received.postMessage({
    			title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
    		});
		}
	}
});