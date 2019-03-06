define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var supplierTicketOrderListView = require('view/supplierTicketOrderList');
	var type = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 16;
		setMain(view);
		setContent();
	}

	function _init(view) {
		var type = null;
		var pageNum = null;
		var pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "方案列表",
			className: 'planList',
			showHeader: true,
			isSupplierHeader: true,
			rightButtonText: '统计',
			rightButtonFun: function() {
				common.locationUrl('#supplierTicketStatistics');
			}
		}
		main.setMain(view, options);
		var data = {
			type: type
		}
		main.setContent(supplierTicketOrderListView.content(data));
		$("#typeList .ui-flex_item").on("click", function(e) {
			var type = parseInt($(this).attr("type"));
			common.locationUrl('#supplierTicketOrderList&type='+type);
		});
	}


	function setContent() {
		getSupplierTicketOrderList();
		getSupplierTicketOrderCount();
	}
	
	function getSupplierTicketOrderList(append) {
		main.unsetScrollLoad();
		//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		var ticketStatus = undefined;
		if (type == 1) {
			ticketStatus = [0];
		} else if (type == 2) {
			ticketStatus = [2,3,4,5,6];
		} else if (type == 3) {
			ticketStatus = [4,6];
		} else if (type == 4) {
			ticketStatus = [5];
		}
		var options = {
			type: 2,
			ticketStatus: ticketStatus,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getTicketOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var totalCount = parseInt(ret.data.totalCount) || 0;
			var totalAmount = parseInt(ret.data.totalAmount/100) || 0;
			var totalTicketPrizeAmount = (ret.data.totalTicketPrizeAmount/100).toFixed(2) || 0;
			$("#statistics").show();
			$("#totalCount").html(totalCount);
			if (type == 1 || type == 2) {
				$("#totalMoney").html(totalAmount);
			} else if (type == 3 || type == 4) {
				$("#totalMoney").html(totalTicketPrizeAmount);
			}
			var data = {
				list: list,
				type: type ||1
			}
			if (append) {
				$("#supplierTicketOrderList").append(supplierTicketOrderListView.supplierTicketOrderList(data));
			} else {
				$("#supplierTicketOrderList").html(supplierTicketOrderListView.supplierTicketOrderList(data));
			}
			$("#supplierTicketOrderList [orderNo]").on("click", function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#supplierTicketOrderDetail&type="+ type +"&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		});		
	}

	function getSupplierTicketOrderCount() {
		var options = {
			type: 2,
			ticketStatus: [4,6],//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
			nullTicketPrizeAmount: true//没填写中奖金额
		}
		orderCgi.getTicketOrderCount(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			if (!isNaN(totalCount) && totalCount > 0) {
				$("#tipsNum").html(totalCount).show();
			}
		});		
	}

	function moreList() {
		pageNum++;
		getSupplierTicketOrderList(true);
	}
});