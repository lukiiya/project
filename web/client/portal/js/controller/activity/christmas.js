define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var christmasView = require('view/activity/christmas');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "晒米场－英超圣诞赛程投注手册",
			className: 'activity_christmas'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(christmasView.content(data));
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}
	
	function share() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			});
		} else if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_received.postMessage({
    			title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
    		});
		}
	}
});