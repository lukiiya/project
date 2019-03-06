define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var channelCgi = require('cgi/channel');
	var orderListView = require('view/orderList');
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
		main.setContent(orderListView.content());
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
		getChannelList();
		getOrderList();
	}

	function getChannelList() {
		var options = {
			pageNum: 1,
			pageSize: 100
		}
		channelCgi.getChannelList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="">渠道(全部)</option>');
			html.push('<option value="0">平台</option>');
			for (var i = 0, length = list.length; i < length; i++) {
				var ob = list[i] || {};
				var channel = parseInt(ob.channel) || 0;
				if (channel <= 0) {
					continue;
				}
				var nickName = ob.nickName || '';
				var realName = ob.realName || '';
				var remark = ob.remark || '';
				var userName = nickName;
				if (realName) {
					userName += '(' + realName +  ')';	
				}
				if (!userName) {
					userName = remark;
				}
				userName = userName.replace(/['"\n<>]/g, '');
				html.push('<option value="' + channel + '">' + userName + '</option>');
			}
			html.push('<option value="-1">红包充值</option>');
			html.push('<option value="-2">体彩</option>');
			html.push('<option value="-3">福彩</option>');
			$('#channel').html(html.join(''));
		});
	}

	function searchSubmit() {
		pageNum = 1;
		getOrderList();
	}

	function getOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var spreaderUserName = trim($('#spreaderUserName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var planMatchType = parseInt($('#planMatchType').val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val());
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			spreaderUserName: spreaderUserName,
			orderId: orderId,
			planId: planId,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			comboType: comboType,
			channel: channel,
			planMatchType: planMatchType,
			source: source,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getOrderList(options, function(ret) {
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
			$("#orderList").html(orderListView.orderList(data));
			$("#orderList").find('[remark]').on('click', showRemark);
			main.activeTr('orderList');
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
		getOrderList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})