define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var nbaXsjxlView = require('view/activity/nbaXsjxl');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "NBA新赛季巡礼",
			className: 'activity_nbaQdxl'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(nbaXsjxlView.content(data));
		if (common.isWeixinBrowser()) {
			var data = {
				title: '2017-18 NBA新赛季球队巡礼',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/nbaXsjxl',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/NBA_share.jpg',
				desc: '投注NBA加奖10％'
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}
});