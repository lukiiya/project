define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var myFinanceView = require('view/myFinance');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 1;
		pageNum = 1;
		pageSize = 20;
		common.setHistoryBack('#my');
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
			title: "账户明细",
			className: 'moneyNode',
			showHeader: true,
			isFinanceHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(myFinanceView.content(data));
	}


	function setContent() {
		setType();
	}


	function moreList() {
		pageNum++;
		getFinanceRecordList(true);		
	}
	
	function getFinanceRecordList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getFinanceRecordList(options, function(ret) {
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
				$("#financeRecordList").append(myFinanceView.financeRecordList(data));
			} else {
				$("#financeRecordList").html(myFinanceView.financeRecordList(data));
			}
			$('#financeRecordList [remark]').off().on('click', function(e) {
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

	function setType() {
		var typeItem = $("#financeTab [financeType]");
		typeItem.on("click", function(e) {
			typeItem.removeClass("active");
			$(this).addClass("active");
			financeType = parseInt($(this).attr("financeType"));
			pageNum = 1;
			pageSize = 20;
			getFinanceRecordList();
		});
		//默认选中状态
		var typeIndex = -1;
		typeItem.each(function (i, item) {
			var t = parseInt($(this).attr("financeType"));
			if (t == financeType) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = typeItem.eq(typeIndex);
		item.click();
	}
});