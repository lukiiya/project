define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myBetView = require('view/myBet');
	var tab = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 0;
		pageNum = 1;
		pageSize = 15;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		tab = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "我的投注",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myBetView.content(data));
	}


	function setContent() {
		setTab();
	}
	
	function getTicketOrderList(append) {
		main.unsetScrollLoad();
		var ticketType;
		var ticketStatus = [];
		if (tab == 0) {
			ticketType = 0;	
		} else if (tab == 1) {
			ticketType = 1;
		} else if (tab == 2) {
			ticketType = 2;
		} else if (tab == 3) {
			ticketType = 0;
			ticketStatus = [4,5,6];
		};
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			ticketType: ticketType,
			ticketStatus: ticketStatus
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
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#ticketOrderList").append(myBetView.ticketOrderList(data));
			} else {
				$("#ticketOrderList").html(myBetView.ticketOrderList(data));
			}
			$("#ticketOrderList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#ticketOrderList .doct_item").off().on("click", function(e) {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#ticketOrderDetail&orderNo=" + orderNo);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		getTicketOrderList(true);
	}
	
	function setTab() {
		var tabItem = $("#tabList .ui-flex_item");
		tabItem.on("click", function(e) {
			tabItem.removeClass("active");
			$(this).addClass("active");
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 15;
			getTicketOrderList();
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
});