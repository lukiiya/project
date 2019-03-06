define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeTradeListView = require('view/financeTradeList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "交易对账",
			className: 'expense_record'
		} 
		main.setMain(view, options);
		main.setContent(financeTradeListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getTradeList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getTradeList();
	}

	function exportReport() {
		var tradeType = parseInt($('#tradeType').val());
		if(isNaN(tradeType)){
			tradeType = undefined;
		}
		var tradeNo = trim($('#tradeNo').val()) || null;
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var type = parseInt($('#type').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			tradeType: tradeType,
			tradeNo: tradeNo,
			userName: userName,
			orderId: orderId,
			beginTime: beginTime,
			endTime: endTime,
			type: type,
			financeType: financeType
		};
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?p=admin&c=finance&m=tradeList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getTradeList() {
		var tradeType = parseInt($('#tradeType').val());
		if(isNaN(tradeType)){
			tradeType = undefined;
		}
		var tradeNo = trim($('#tradeNo').val()) || null;
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var type = parseInt($('#type').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			tradeType: tradeType,
			tradeNo: tradeNo,
			userName: userName,
			orderId: orderId,
			beginTime: beginTime,
			endTime: endTime,
			type: type,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		};
		financeCgi.getTradeList(options, function(ret) {
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
			$("#tradeList").html(financeTradeListView.tradeList(data));
			$("#tradeList").find('[remark]').on('click', showRemark);
			main.activeTr('tradeList');
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
		getTradeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})