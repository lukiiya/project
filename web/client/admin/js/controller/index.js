define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var indexView = require('view/index');

	function init(view){
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		main.setMain(view, {});
	}

	function setContent() {
		main.setContent('');
	}
});