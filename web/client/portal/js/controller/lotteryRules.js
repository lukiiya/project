define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');

	var lotteryRulesView = require('view/lotteryRules');
	var lotteryId = null;

	function init(view) {
		lotteryId = trim(common.getUrlParam("lotteryId"));
		setMain(view);
		setContent();
	}

	function _init(view) {
		lotteryId = null;
	}

	function setMain(view) {
		var titleMap = {'JSK3': '快3玩法说明','GX11X5': '乐11选5玩法说明'};
		var options = {
			title: titleMap[lotteryId],
			className: 'play_explain',
			showHeader: true,
			isLeftIconHeader: true	
		}
		main.setMain(view, options);
		if (lotteryId == 'JSK3') {
			main.setContent(lotteryRulesView.k3Rules())
		} else if (lotteryId == 'GX11X5') {
			main.setContent(lotteryRulesView.gx11x5Rules())
		}   
	}


	function setContent() {

	}
});	