define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var ticketCgi = require('cgi/ticket');
	var ticketListView = require('view/ticketList');
	var ticketMap = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		ticketMap = {};
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		ticketMap = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "出票列表",
			className : 'followTicket_list'
		}
		main.setMain(view, options);
		main.setContent(ticketListView.content());
		var orderId = parseInt(common.getUrlParam("orderId")) || '';
		$('#orderId').val(orderId);
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
		getTicketList();
	}

	function searchSubmit() {
		pageNum = 1;
		getTicketList();
	}

	function getTicketList() {
		var issue = trim($("#issue").val()) || null;
		var lotteryId = trim($("#lotteryId").val()) || null;
		var status = parseInt($("#status").val());
		var userName = trim($("#userName").val()) || null;
		var supplierName = trim($("#supplierName").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var ticketId = parseInt($('#ticketId').val()) || null;
		var platformId = trim($("#platformId").val()) || null;
		var printNo = trim($("#printNo").val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(status)) {
			status = undefined;
		}
		var options = {
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			supplierName: supplierName,
			orderId: orderId,
			ticketId: ticketId,
			platformId: platformId,
			printNo: printNo,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		};
		ticketCgi.getTicketList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)/100 || 0;
			var totalPrizeAmount = (ret.data && ret.data.totalPrizeAmount)/100 || 0;
			var totalPretaxPrizeAmount = (ret.data && ret.data.totalPretaxPrizeAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			ticketMap = {};
			$.each(list, function(i, ticket) {
				var ticketId = parseInt(ticket.ticketId) || 0;
				if (ticketId > 0) {
					ticketMap[ticketId] = ticket;
				}
			});
			var data = {
				list: list,
				totalAmount: totalAmount,
				totalPrizeAmount: totalPrizeAmount,
				totalPretaxPrizeAmount: totalPretaxPrizeAmount
			};
			$("#ticketList").html(ticketListView.ticketList(data));
			$("#ticketList [showFormat]").on('click', showFormat);
			$("#ticketList [printNo]").on('click', showPrintNo);
			main.activeTr('ticketList');
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
		getTicketList();
	}

	function showPrintNo(e) {
		var printNo = trim($(this).attr('printNo')) || "";
		var options = {
			html: '<p>'+ printNo +'</p>'
		}
		ui.showWindow(options);
	}

	function showFormat() {
		var ticketId = parseInt($(this).attr('ticketId')) || 0;
		var matchType = parseInt($(this).attr('matchType')) || 0;
		var ticket = ticketMap[ticketId] || {};
		if (isNaN(ticketId) || ticketId <= 0 || !ticket) {
			return;
		}
		if (matchType == 1 || matchType == 2) {
			matchList.call(this);
		} else {
			var betContent = trim(ticket.betContent) || '';
			var betContentArr = betContent.split(';');
			var options = {
				html: betContentArr.join('<br><br>')
			};
			ui.showWindow(options);
		}
	}

	function matchList() {
		var ticketId = parseInt($(this).attr('ticketId')) || 0;
		var matchType = parseInt($(this).attr('matchType')) || 0;
		var ticket = ticketMap[ticketId] || {};
		var matchList = ticket.matchList || [];
		if (isNaN(ticketId) || ticketId <= 0 || !ticket) {
			return;
		}
		var data = {
			matchType: matchType,
			matchList: matchList
		};
		var options = {
			html: ticketListView.matchList(data)
		};
		ui.showWindow(options);
	}
})