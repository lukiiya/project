define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var award2x1View = require('view/activity/award2x1');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞彩好礼",
			className: 'activity_2x1'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(award2x1View.content(data));
	}

	function setContent() {
		
	}
});