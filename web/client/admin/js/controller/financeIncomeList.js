define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeIncomeListView = require('view/financeIncomeList');
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
			title: "收益列表",
			className: 'earnings_record'
		} 
		main.setMain(view, options);
		main.setContent(financeIncomeListView.content());
		$("#financeType").bind('change', financeTypeChange);
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
		getIncomeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getIncomeList();
	}

	function financeTypeChange(e) {
		var financeType = parseInt(this.value);
		var html = [];
		html.push('<option value="0">全部</option>');
		if (!isNaN(financeType)) {
			if (financeType == 0) {
				html.push('<option value="1">推荐收益</option>');
				html.push('<option value="2">推广收益</option>');
			} else if (financeType == 1) {
				html.push('<option value="1">中奖收益</option>');
				html.push('<option value="2">分成收益</option>');
			}
		}
		$('#type').html(html.join(''));
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			planId: planId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?p=admin&c=finance&m=incomeList"></form>');
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

	function getIncomeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			planId: planId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getIncomeList(options, function(ret) {
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
			$("#incomeList").html(financeIncomeListView.incomeList(data));
			$("#incomeList").find('[remark]').on('click', showRemark);
			main.activeTr('incomeList');
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
		getIncomeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})