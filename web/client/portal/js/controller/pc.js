define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var pcView = require('view/pc');

	function init(view) {
		$('body').css('overflow', 'hidden');
		setMain(view);
		setContent();
	}

	function _init(view) {
		$('body').css('overflow', 'auto');
	}

	function setMain(view) {
		view.setContent(pcView.content());
	}

	function setContent() {

	}
});