define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardJsk3View = require('view/activity/awardJsk3');
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
			title: "快3加奖",
			className: 'activity_k3jj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(awardJsk3View.content(data));
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		}
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JSK3");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JSK3"
		    	});
			} else {
				common.locationUrl("#JSK3");
			}
		})
	}

	function setContent() {
		
	}
});