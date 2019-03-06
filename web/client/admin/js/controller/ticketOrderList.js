define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var channelCgi = require('cgi/channel');
	var ticketOrderListView = require('view/ticketOrderList');
	var orderMap = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		orderMap = {};
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderMap = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "跟单列表",
			className : 'followTicket_list'
		}
		main.setMain(view, options);
		main.setContent(ticketOrderListView.content());
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
		getChannelList();
		getTicketOrderList();
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
		getTicketOrderList();
	}

	function exportReport() {
		var issue = trim($('#issue').val()) || null;
		var lotteryId = trim($('#lotteryId').val()) || null;
		var userName = trim($("#userName").val()) || null;
		var ticketUserName = trim($("#ticketUserName").val()) || null;
		var orderNumeric = trim($("#orderNumeric").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var status = parseInt($("#status").val()) || null;
		var ticketStatus = parseInt($("#ticketStatus").val());
		var ticketPrizeDivideStatus = parseInt($("#ticketPrizeDivideStatus").val());
		var ticketAttachPrizeStatus = parseInt($("#ticketAttachPrizeStatus").val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val())
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(ticketPrizeDivideStatus)) {
			ticketPrizeDivideStatus = undefined;
		}
		if (isNaN(ticketAttachPrizeStatus)) {
			ticketAttachPrizeStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			exportReport: true,
			orderType: [3,7,9],
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			ticketUserName: ticketUserName,
			orderNumeric: orderNumeric,
			orderId: orderId,
			ticketStatus: ticketStatus,
			ticketPrizeDivideStatus: ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: ticketAttachPrizeStatus,
			source: source,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime
		};
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?p=admin&c=order&m=orderList"></form>');
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

	function getTicketOrderList() {
		var issue = trim($('#issue').val()) || null;
		var lotteryId = trim($('#lotteryId').val()) || null;
		var userName = trim($("#userName").val()) || null;
		var ticketUserName = trim($("#ticketUserName").val()) || null;
		var orderNumeric = trim($("#orderNumeric").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var status = parseInt($("#status").val()) || null;
		var ticketStatus = parseInt($("#ticketStatus").val());
		var ticketPrizeDivideStatus = parseInt($("#ticketPrizeDivideStatus").val());
		var ticketAttachPrizeStatus = parseInt($("#ticketAttachPrizeStatus").val());
		var ticketPrizeVerifyStatus = parseInt($("#ticketPrizeVerifyStatus").val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val())
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(ticketPrizeDivideStatus)) {
			ticketPrizeDivideStatus = undefined;
		}
		if (isNaN(ticketAttachPrizeStatus)) {
			ticketAttachPrizeStatus = undefined;
		}
		if (isNaN(ticketPrizeVerifyStatus)) {
			ticketPrizeVerifyStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			orderType: [3,7,9],
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			ticketUserName: ticketUserName,
			orderNumeric: orderNumeric,
			orderId: orderId,
			ticketStatus: ticketStatus,
			ticketPrizeDivideStatus: ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: ticketAttachPrizeStatus,
			ticketPrizeVerifyStatus: ticketPrizeVerifyStatus,
			source: source,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		};
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)/100 || 0;
			var totalTicketSendPrizeAmount = (ret.data && ret.data.totalTicketSendPrizeAmount)/100 || 0;
			var totalTicketExpectPrizeAmount = (ret.data && ret.data.totalTicketExpectPrizeAmount)/100 || 0;
			var totalTicketPrizeAmount = (ret.data && ret.data.totalTicketPrizeAmount)/100 || 0;
			var totalTicketAttachPrizeAmount = (ret.data && ret.data.totalTicketAttachPrizeAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			orderMap = {};
			$.each(list, function(i, order) {
				var orderId = parseInt(order.orderId) || 0;
				if (orderId > 0) {
					orderMap[orderId] = order;
				}
			});
			var data = {
				Math: Math,
				list: list,
				totalAmount: totalAmount,
				totalTicketSendPrizeAmount: totalTicketSendPrizeAmount,
				totalTicketExpectPrizeAmount: totalTicketExpectPrizeAmount,
				totalTicketPrizeAmount: totalTicketPrizeAmount,
				totalTicketAttachPrizeAmount: totalTicketAttachPrizeAmount
			};
			$("#ticketOrderList").html(ticketOrderListView.ticketOrderList(data));
			$("#ticketOrderList [resourceList]").on('click', showImage);
			$("#ticketOrderList [showFormat]").on('click', showFormat);
			$("#ticketOrderList .modifyTicketPrizeAmount").on('click', modifyTicketPrizeAmount);
			$("#ticketOrderList .refundTicket").on('click', refundTicket);
			$("#ticketOrderList .sendTicketPrize").on('click', sendTicketPrize);
			main.activeTr('ticketOrderList');
		});
	}

	function showImage() {
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		var imgHtml = [];
		$.each(resourceList, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		};
		ui.showWindow(options);
	}

	function showFormat() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var order = orderMap[orderId] || {};
		var orderType = parseInt(order.orderType) || 0;
		if (isNaN(orderId) || orderId <= 0 || !order || isNaN(orderType) || orderType <= 0) {
			return;
		}
		if (orderType == 3) {
			matchList(orderId);
		} else if (orderType == 7) {
			var betContent = trim(order.betContent) || '';
			var betContentArr = betContent.split(';');
			var options = {
				html: betContentArr.join('<br><br>')
			};
			ui.showWindow(options);
		} else if (orderType == 9) {
			guessList(orderId);
		}
	}

	function matchList(orderId) {
		var orderId = parseInt(orderId) || 0;
		var order = orderMap[orderId] || {};
		var matchList = order.matchList || [];
		var planMatchType = order.planMatchType;
		if (isNaN(orderId) || orderId <= 0) {
			return;
		}
		var data = {
			matchList: matchList,
			planMatchType: planMatchType
		};
		var options = {
			html: ticketOrderListView.matchList(data)
		};
		ui.showWindow(options);
	}
	
	function guessList(orderId) {
		var orderId = parseInt(orderId) || 0;
		var order = orderMap[orderId] || {};
		var guessList = order.guessList || [];
		var planMatchType = order.planMatchType;
		if (isNaN(orderId) || orderId <= 0) {
			return;
		}
		var data = {
			guessList: guessList,
			planMatchType: planMatchType
		};
		var options = {
			html: ticketOrderListView.guessList(data)
		};
		ui.showWindow(options);
	}
	
	function refundTicket() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		var amount = parseInt($(this).attr('amount')) || 0;
		if (isNaN(orderId) || orderId <= 0 || isNaN(amount) || amount <= 0) {
			return;
		}
		ui.showConfirm('确定给 “'+userName+'” 退款 '+amount+' 元？', function sure() {
			var options = {
				orderId: orderId
			};
			orderCgi.refundTicket(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('退款成功');
				ui.closeConfirm();
				getTicketOrderList();
			});
		}, function cancel() {

		});
	}

	function sendTicketPrize() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		var ticketPrizeAmount = parseFloat($(this).attr('ticketPrizeAmount')) || 0;
		if (isNaN(orderId) || orderId <= 0 || isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
			return;
		}
		ui.showConfirm('确定给 “'+userName+'” 派奖 '+ticketPrizeAmount+' 元？', function sure() {
			var options = {
				orderId: orderId
			};
			orderCgi.sendTicketPrize(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('派奖成功');
				ui.closeConfirm();
				getTicketOrderList();
			});
		}, function cancel() {

		});
	}

	function modifyTicketPrizeAmount() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(orderId) || orderId <= 0) {
			return;
		}
		var options = {
			html: ticketOrderListView.modifyTicketPrizeAmount({
				orderId: orderId,
				userName: userName
			})
		};
		ui.showWindow(options);
		$("#cancelModifyTicketPrizeAmount").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyTicketPrizeAmount").on('click', function() {
			var orderId = parseInt($('#modifyTicketPrizeAmountOrderId').val()) || 0;
			var ticketPrizeAmount = parseFloat($('#ticketPrizeAmount').val()) || 0;
			if (isNaN(orderId) || orderId <= 0) {
				return;
			}
			if(isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
				ui.showNotice('请输入正确的中奖金额');
				return;
			}
			var options = {
				orderId: orderId,
				ticketPrizeAmount: ticketPrizeAmount*100
			}
			orderCgi.modifyTicketPrizeAmount(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('修改中奖金额成功');
				ui.closeWindow();
				getTicketOrderList();
			})
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
		getTicketOrderList();
	}

})