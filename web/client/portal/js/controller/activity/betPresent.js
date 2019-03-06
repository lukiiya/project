define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var betPresentView = require('view/activity/betPresent');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞彩好礼",
			className: 'activity_jingcaihaoli'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(betPresentView.content(data));
		$('#rechargeCashBtn').on('click', function() {
			common.locationUrl('#charge&financeType=1');
			window.Jockey && window.Jockey.send("chargeCJ");
		});
		$('#buyjczq').on('click', function() {
			common.locationUrl('#hotMatch');
			window.Jockey && window.Jockey.send("buyFBMatch");
		});
		$('#trunplateBtn').on('click', function() {
			common.locationUrl('#activity/turnplate');
			window.Jockey && window.Jockey.send("luckDraw");
		});
		$('#rechargeRiceBtn').on('click', function() {
			common.locationUrl('#charge&financeType=0');
			window.Jockey && window.Jockey.send("chargeML");
		});
	}

	function setContent() {
		
	}
});