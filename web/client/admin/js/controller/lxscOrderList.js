define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var lxscOrderListView = require('view/lxscOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(lxscOrderListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getLxscOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLxscOrderList();
	}

	function getLxscOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getLxscOrderList(options, function(ret) {
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
			$("#lxscOrderList").html(lxscOrderListView.lxscOrderList(data));
			main.activeTr('lxscOrderList');
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
		getLxscOrderList();
	}
})