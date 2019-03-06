define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var myView = require('view/my');
	var tab = null;
	var userRight = null;
	var pageNum = null;
	var pageSize = null;
	var isABT = null;
	var isChannel = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 4;
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		tab = null;	
		userRight = null;
		pageNum = null;
		pageSize = null;
		isABT = null;
		isChannel = null;
	}

	function setMain(view) {
		var options = {
			title: "我的",
			className: 'user',
			showFooter: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myView.content(data));
	}


	function setContent() {
		getUserInfo();
	}

	
	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var realName = trim(user.realName) || "";
			var nickName = trim(user.nickName) || "";
			var profileImg = trim(user.profileImg) || "";
			var personalImg = trim(user.personalImg) || "";
			var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
			var userName = realName || nickName;
			var userTag = user.tag;
			isABT = user.isABT;
			userRight = user.userRight || {};
			isChannel = user.isChannel;
			$("#userImg").attr("src", userImg);
			$("#userName").html(userName);
			if (userRight['1']) {
				//$("#userFinance").show();
				$("#editPlan").show();
				$("#editPlan").on("click", function(e) {
					common.locationUrl('#editPlan');
				});
			} else if (userRight['3']) {
				$("#editPlan").show();
				$("#editPlan").on("click", function(e) {
					common.locationUrl('#editDigitalPlan');
				});
			}
			$("#topBox [href]").on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			getUserFinanceInfo(0);
			if (isABT) {
				getUserFinanceInfo(1);
				$("#handsel").show()
			} else {
				$("#handsel").hide();
			}
			setTab();
		});
	}

	function getUserFinanceInfo(financeType) {
		financeType = parseInt(financeType) || 0;//0=方案, 1=出票
		var options = {
			financeType: financeType
		}
		userCgi.getUserFinanceInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var chargeAmount = (parseInt(data.chargeAmount) || 0)/100;
			var incomeAmount = (parseInt(data.incomeAmount) || 0)/100;
			var mobile = data.mobile || '';
			if (mobile) {
				$(".phone_num").append(mobile);
			} else {
				$("#noNum").show();
				$("#bindMobile").on('click',function(){
					common.locationUrl('#bindMobile');
				})
			}
			if (financeType == 0) {
				var userBalance = chargeAmount + incomeAmount;
				if (userBalance < 0) {
					userBalance = 0;
				}
				$("#userBalance").html(userBalance);
			}
			if (financeType == 1) {
				var handselBalance = chargeAmount + incomeAmount;
				handselBalance = handselBalance.toFixed(2);
				if (handselBalance < 0) {
					handselBalance = 0;
				}
				$("#handselBalance").html(handselBalance);
			}
		});
	}

	function getOrderContent() {
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#infoList").html(myView.orderContent(data));
		getOrderList();
	}

	function getOrderList(append) {
		main.unsetScrollLoad();
		var options = {
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
			if (append) {
				$("#orderList").append(myView.orderList(data));
			} else {
				$("#orderList").html(myView.orderList(data));
				//getJxzpOrderInfo();
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

	function setTab() {
		var data = {
			userRight: userRight,
			isABT: isABT,
			isChannel: isChannel,
			isWeixinBrowser: common.isWeixinBrowser()
		};
		$("#tabList").html(myView.tabList(data));
//		if (userRight['1'] || userRight['2'] || userRight['3'] || isABT) {
//			$("#tabList").show();
//		} else {
//			$("#tabList").hide();
//		}
		var tabItem = $("#tabList .user_menu_item");
		tabItem.on("click", function(e) {
			tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				common.locationUrl("#myBet");
			} else if (tab == 2) {
				common.locationUrl("#myCoupon");
			} else if (tab == 3) {			
				common.locationUrl("#myFinance");
			} else if (tab == 4) {
				if (userRight['1']) {
					common.locationUrl("#myPlan");				 
				} else if (userRight['3']) {
					common.locationUrl("#myDigitalPlan");
				}
			} else if (tab == 5) {
				common.locationUrl("#myShare");
			} else if (tab == 6) {
				common.locationUrl("#myTrade");
			} else if (tab == 7) {
				common.locationUrl("#focusList");
			} else if (tab == 8) {
				common.locationUrl("#presentOrderList");
			} else if (tab == 9) {
				common.locationUrl("#invitation/index");
			}
		});
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			if (tab) {
				common.setHistoryBack("#my&tab="+tab);
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			setHistoryBack();
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}

	function moreList() {
		pageNum++;
		if (tab == 1) {
			getRecommendList(true);
		} else if (tab == 2) {
			getSpreadList(true);
		} else if (tab == 3) {
			getOrderList(true);
		} else if (tab == 4) {
			getTicketOrderList(true);
		}
	}
	
	function getJxzpOrderInfo() {
		var options = {}
		orderCgi.getJxzpOrderInfo(options, function(ret) {
			var jxzpInfo = ret.data || {};
			var beginTime = jxzpInfo.beginTime;
			var endTime = jxzpInfo.endTime;
			var period = beginTime + '-' + endTime;
			var isExpire = jxzpInfo.isExpire;
			var orderLength = $("#orderList li.item").length;
			var isEmptyObject = Object.keys(jxzpInfo).length <= 0;
			if (!isEmptyObject) {
				$('#period').html(period);
				$('#jxzpOrderInfo').show();
			} else if (orderLength <= 0) {
				$('#noMatch').show();
			}
			if (isExpire) {
				$("#renew").show().on('click',function() {
					common.locationUrl('#jxzpComboList');			
				});
			}
		}) 
	}
});