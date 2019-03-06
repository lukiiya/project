define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jzypExplainView = require('view/jzypExplain');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "晒米竞足亚盘入门秘籍",
			className: 'jzyp_explain'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(jzypExplainView.content(data));
		if (common.isWeixinBrowser()) {
			var data = {
				title: '晒米竞足亚盘入门秘籍',
				link: location.href.replace(/[#\?].*/g, '') + '#jzypExplain',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/jzypExplain/jzyp_explain_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}
});