define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var planCgi = require('cgi/plan');
	var documentaryMarketView = require('view/documentaryMarket');
	var pageNum = null;
	var	pageSize = null;
	var specification = null;
	var tab = null;

	function init(view) {
		common.setHistoryBack('#home');
		specification = common.getUrlParam("specification") || false;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
	 	pageSize = null;
	 	specification = null;
	 	tab = null;
	}

	function setMain(view) {
		var options = {
			title: specification ? "跟单说明" : "跟单市场",
			className: 'documentaryMarket',
			showHeader: true,
			isLeftIconHeader: !!specification,
			rightButtonText: "说明",
			rightButtonFun: function() {
				common.locationUrl("#documentaryMarket&specification=true");
			}
			
		}
		main.setMain(view, options);
		if (specification) {
			$(".leftIcon_header").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#documentaryMarket");
			});
			main.setContent(documentaryMarketView.specification());
		} else {
			main.setContent(documentaryMarketView.publishMarket());
		}	
	} 


	function setContent() {
		setTab();
		
	}
	
	function setTab() {
		var tabList = $('#navTab .ui-flex_item');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr('tab')) || 1;
			pageNum = 1;
			pageSize = 8;
			if (tab == 1) {
				getOrderPublishList();
			} else if (tab == 2) {
				getPlanList();
			}
		});
		//默认选中
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('tab')) || 0;
			if (tab == t) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		tabList.eq(tabIndex).click();
	}
	
	function getOrderPublishList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getOrderPublishList(options, function(ret) {
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
				$("#orderPublishList").append(documentaryMarketView.orderPublishList(data));
			} else {
				$("#orderPublishList").html(documentaryMarketView.orderPublishList(data));
			}
			$("#orderPublishList .self_item").on("click", function() {
				var orderNo = $(this).attr("orderNo");
				common.locationUrl("#ticketOrderDetail&selfGod=true&orderNo=" + orderNo);
			})
			$("#orderPublishList .ticket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var recommendCount = parseInt($(this).attr("betAmount"))/2;
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var planNo = trim($(this).attr("planNo"));
				var data = {
					planNo: planNo,
					recommendCount: recommendCount,
					maxBettypeOdds: maxBettypeOdds,
					planType: -1,
					isSelfFollow: 1
				}
				ui.showCreateTicketOrder(data);
			});
			$("#orderPublishList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function getPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			needSaleTicket: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#orderPublishList").append(documentaryMarketView.planList(data));
			} else {
				$("#orderPublishList").html(documentaryMarketView.planList(data));
			}
			$("#orderPublishList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场足球推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#orderPublishList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			$("#orderPublishList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#orderPublishList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		if (tab == 1) {
			getOrderPublishList(true);	
		} else if (tab == 2) {
			getPlanList(true);
		}		
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
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
});