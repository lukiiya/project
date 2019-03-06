define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myTradeView = require('view/myTrade');
	var pageNum = null;
	var pageSize = null;
	var tab = null;

	function init(view) {
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		tab = null;
	}

	function setMain(view) {
		var options = {
			title: "已购推荐",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myTradeView.content(data));
	}


	function setContent() {
		setTab()
	}
	
	function setTab() {
		var tabItem = $("#tabList .ui-flex_item");
		tabItem.on("click", function(e) {
			tabItem.removeClass("active");
			$(this).addClass("active");
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 15;
			getOrderList();
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab"));
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	function getOrderList(append) {
		main.unsetScrollLoad();
		var plantype;
		if (tab == 0) {
			planType = 1
		} else if (tab == 1) {
			planType = 2
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			planType: planType
		}
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			$('#orderCount').html(totalCount);
			$('#orderAmount').html(totalAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (tab == 0) {
				if (append) {
					$("#orderList").append(myTradeView.orderList(data));
				} else {
					$("#orderList").html(myTradeView.orderList(data));
				}
			} else if (tab == 1) {
				if (append) {
					$("#orderList").append(myTradeView.digitalOrderList(data));
				} else {
					$("#orderList").html(myTradeView.digitalOrderList(data));
				}
			}
			$("#orderList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#orderList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (tab == 0) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (tab == 1) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getOrderList(true);
	}
});