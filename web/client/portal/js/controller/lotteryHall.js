define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var lotteryCgi = require('cgi/lottery');
	var userCgi = require('cgi/user');
	var main = require('module/main');
	var lotteryHallView = require('view/lotteryHall');
	var channel = null;

	function init(view) {
		channel = parseInt(common.getUrlParam("channel"));
		setMain(view);
		setContent();
	}

	function _init(view) {
		channel = null;
	}

	function setMain(view) {
		var options = {
			title: "购彩大厅",
			className: 'lotteryHall',
			showHeader: true,
			isSimpleHeader: true,
			showFooter: true
		}
		main.setMain(view, options);
	}


	function setContent() {
		lotteryList();
		if (channel == 3) {
			//不登录就唤起登录
			userCgi.getUserInfo({}, function() {}, true);
		}
	}
	
	function lotteryList() {
		var options = {};
		lotteryCgi.lotteryList(options,function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				Object: Object,
				IMG_PATH: IMG_PATH
			}
			main.setContent(lotteryHallView.content(data));
			$("#lotteryList .flex_item[lotteryId]").on('click', function() {
				var lotteryId = trim($(this).attr('lotteryId')) || '';
				var lo = lotteryId.toLowerCase();
				if (lotteryId == 'JCZQ') {
					common.locationUrl("#match&self=true&type=1")
				} else if (lotteryId == 'JCLQ'){
					common.locationUrl("#match&self=true&type=2")
				} else if (lotteryId == 'JZYP') {
					common.locationUrl("#match&self=true&type=3")
				} else if (lotteryId == 'SJBCGJ') {
					common.locationUrl("#worldCup2018")
				} else if (lotteryId == 'XYDZP') {
					common.locationUrl("#activity/turnplate")
				} else if (lotteryId == 'ZXKJ') {
					common.locationUrl("#recentAwards")
				} else {
					common.locationUrl("#" + lo);
				}
			})
		})
	}
});