define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardCrazyView = require('view/activity/awardCrazy');
	var rules = null;

	function init(view) {
		rules = common.getUrlParam("rules") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		rules = null;
	}

	function setMain(view) {
		var options = {
			title: rules ? "活动规则" : "疯狂加奖",
			className: 'activity_awardCrazy',
			showHeader: !!rules,
			isLeftIconHeader: !!rules
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (rules) {
			main.setContent(awardCrazyView.activityRules(data));
		} else {
			main.setContent(awardCrazyView.activityCotent(data));
		}
		$("#rulesBtn").on('click', function() {
			common.locationUrl("#activity/awardCrazy&rules=true");
		})
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JCZQ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JCZQ"
		    	});
			} else {
				common.locationUrl('#match&self=true&type=1');
			}
		})
	}

	function setContent() {
		
	}
});