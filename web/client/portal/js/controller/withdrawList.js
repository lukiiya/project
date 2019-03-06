define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var withdrawListView = require('view/withdrawList');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		pageNum = 1;
		pageSize = 15;
		common.setHistoryBack('#withdraw&financeType=' + financeType);
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
			title: "提款记录",
			className: 'moneyNode',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(withdrawListView.content(data));
	}


	function setContent() {
		getwithdrawList();
	}


	function moreList() {
		pageNum++;
		getwithdrawList(true);		
	}
	
	function getwithdrawList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getWithdrawList(options, function(ret) {
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
				$("#withdrawList").append(withdrawListView.withdrawList(data));
			} else {
				$("#withdrawList").html(withdrawListView.withdrawList(data));
			}
			$('#withdrawList [remark]').off().on('click', function(e) {
				var remark = trim($(this).attr('remark')) || '';
				if (!remark) {
					return;
				}
				ui.showAlert(remark);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});