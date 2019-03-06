define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var receivedOrderSuccessView = require('view/receivedOrderSuccess');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		common.clearCache('ssqhbUserName');
	}

	function setMain(view) {
		var options = {
			title: "领取成功",
			className: 'ssqhb',
			showHeader: true,
			isSimpleHeader: true
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(receivedOrderSuccessView.content(data));
		$("#sendSsqHb").on('click', function() {
			common.locationUrl("#createPresentOrder");
		});
		$("#checkSsqHb").on('click', function() {
			common.locationUrl("#presentOrderList&type=2");
		});
		var ssqhbUserName = common.getCache('ssqhbUserName');
		$("#senderName").html(ssqhbUserName);
	}

	function setContent() {
		
	}
	
});