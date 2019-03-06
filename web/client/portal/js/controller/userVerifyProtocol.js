define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userVerifyProtocolView = require('view/userVerifyProtocol');
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
	}

	function setMain(view) {
		var options = {
			title: "协议",
			className: 'ageement',
			showHeader: true
		}
		main.setMain(view, options);
		main.setContent(userVerifyProtocolView.content({
			type: type
		}));
		
	}

	function setContent() {

	}
});