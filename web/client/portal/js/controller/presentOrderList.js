define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var presentOrderListView = require('view/presentOrderList');
	var pageNum = null;
	var pageSize = null;
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 10;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "双色球红包",
			className: 'ssqhb',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		main.setContent(presentOrderListView.content());
		$("#presentTicket").on('click', function() {
			common.locationUrl("#createPresentOrder");
		});
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser()) {
				common.locationUrl("#my");
			}
		});
	}

	function setContent() {
		setType()
	}
	
	function setType() {
		var typeList = $('#typeBtn [type]');
		typeList.on('click', function(e) {
			typeList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			pageNum = 1;
			pageSize = 10;
			if (type == 1) {
				presentOrderList()
			} else if (type == 2) {
				receivedOrderList()
			}
 		});
		//默认选中
		var typeIndex = -1;
		typeList.each(function (i, item) {
			var t = parseInt($(this).attr('type'));
			if (t == type) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		typeList.eq(typeIndex).click();
	}
	
	function presentOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.presentOrderList(options, function(ret) {
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
				type: type,
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#prentOrderList").append(presentOrderListView.prentOrderList(data));
			} else {
				$("#prentOrderList").html(presentOrderListView.prentOrderList(data));
			}
			$("#prentOrderList li").on('click', function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#receivedOrder&self=true&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		if (type ==1 ) {
			presentOrderList(true);		
		} else if (type == 2) {
			receivedOrderList(true);	
		}
	}
	
	function receivedOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			type: type,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.receivedOrderList(options, function(ret) {
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
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#prentOrderList").append(presentOrderListView.receiveOrderList(data));
			} else {
				$("#prentOrderList").html(presentOrderListView.receiveOrderList(data));
			}
			$("#prentOrderList li").on('click', function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#ticketOrderDetail&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
});