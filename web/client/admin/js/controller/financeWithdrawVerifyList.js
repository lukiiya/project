define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeWithdrawVerifyListView = require('view/financeWithdrawVerifyList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "提款审核",
			className: 'content_mgmt',
		}
		main.setMain(view, options);
		main.setContent(financeWithdrawVerifyListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getWithdrawList();
	}

	function searchSubmit() {
		pageNum = 1;
		getWithdrawList();	
	}

	function getWithdrawList() {
		var userName = trim($('#userName').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var accountType = parseInt($('#accountType').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			status: status,
			accountType: accountType,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getWithdrawList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#withdrawVerifyList").html(financeWithdrawVerifyListView.withdrawVerifyList(data));
			$("#withdrawVerifyList").find('[remark]').on('click', showRemark);
			$("#withdrawVerifyList .verifyWithdraw").on('click', verifyWithdraw);
			main.activeTr('withdrawVerifyList');
		});
	}

	function showPagination(totalCount) {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			totalCount: totalCount,
			pageCodeId: "pageCodeBox",
			pageCodeFun: pageCodeFun
		};
		ui.showPagination(options);
	}

	function pageCodeFun(e){
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getWithdrawList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}

	function verifyWithdraw() {
		var withdrawId = parseInt($(this).attr('withdrawId')) || 0;
		var status = parseInt($(this).attr('status')) || 0;
		if (isNaN(withdrawId) || withdrawId <= 0 || isNaN(status) || status <= 0) {
			return;
		}
		var text = '';
		if (status == 2) {
			text = '是否 "审核" 该提款？'
		} else if (status == 3) {
			text = '是否 "打款" 该提款？'
		} else if (status == 4) {
			text = '是否 "拒绝" 该提款？'
		}
		ui.showConfirm(text, function() {
			var options = {
				withdrawId: withdrawId,
				status: status
			}
			financeCgi.verifyWithdraw(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('操作处理成功');
				ui.closeConfirm();
				getWithdrawList();
			});
		});
	}
});