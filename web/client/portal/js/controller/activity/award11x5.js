define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var award11x5View = require('view/activity/award11x5');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "11选5加奖",
			className: 'activity_11x5jj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(award11x5View.content(data));
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("GX11X5");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/GX11X5"
		    	});
			} else {
				common.locationUrl("#gx11x5");
			}
		})
	}

	function setContent() {
		
	}
});