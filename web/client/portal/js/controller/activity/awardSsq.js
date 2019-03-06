define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardSsqView = require('view/activity/awardSsq');
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
			title: "晒米场－双色球加奖",
			className: 'activity_ssqjj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(awardSsqView.content(data));
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		};
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("SSQ");
			} else if (common.isIosBrowser() && common.isIos()) {
		    	window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/SSQ"
		    	});
			} else {
				common.locationUrl("#ssq");
			}
		})
	}

	function setContent() {
		
	}
});