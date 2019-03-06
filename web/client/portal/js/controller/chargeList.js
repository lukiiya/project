define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var chargeListView = require('view/chargeList');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		pageNum = 1;
		pageSize = 20;
		common.setHistoryBack('#charge&financeType=' + financeType);
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "充值记录",
			className: 'moneyNode',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(chargeListView.content(data));
	}


	function setContent() {
		getChargeList();
	}


	function moreList() {
		pageNum++;
		getChargeList(true);		
	}
	
	function getChargeList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getChargeList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#chargeList").append(chargeListView.chargeList(data));
			} else {
				$("#chargeList").html(chargeListView.chargeList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});