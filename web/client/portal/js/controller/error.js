define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var errorView = require('view/error');
	var url = null;

	function init(view) {
		url = decodeURIComponent(trim(common.getUrlParam("url"))) || "/";
		setMain(view);
		setContent();
	}

	function _init(view) {
		url = null;
	}

	function setMain(view) {
		var options = {
			className: 'error'
		}
		main.setMain(view, options);
		main.setContent(errorView.content());
		$("#backBtn").on('click', function(e) {
			common.locationUrl(url);
		});
	}

	function setContent() {
		
	}
});