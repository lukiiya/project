define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var ticketFollowView = require('view/ticketFollow');
	var pageNum = null;
	var pageSize = null;
	var matchType = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		matchType = null;
	}

	function setMain(view) {
		var options = {
			title: "跟专家",
			className: 'index',
			showHeader: true,
			rightButtonText: '自己投',
			rightButtonFun: function() {
				common.locationUrl('#lotteryHall');
			}
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(ticketFollowView.content(data));
	}

	function setContent() {
		setTab();
	}

	function setTab() {
		var tabList = $('#recommendTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			matchType = parseInt($(this).attr("matchType"));
			pageNum = 1;
			pageSize = 8;
			if (matchType == 1 || matchType == 2) {
				getPlanList();
			} else if (matchType == 3) {
				getDigitalPlanList()
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var mTab = parseInt($(this).attr("tab"));
			if (mTab == matchType) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabList.eq(tabIndex);
		item.click();
	}
	
	function getPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			matchType: matchType,
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
				$("#planList").append(ticketFollowView.planList(data));
			} else {
				$("#planList").html(ticketFollowView.planList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
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
			$("#planList .userTicket").off().on('click', function(e) {
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
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		if (matchType == 1 || matchType == 2) {
			getPlanList(true);
		} else if (matchType == 3) {
			getDigitalPlanList(true);
		}
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		var planType;
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (matchType == 1 || matchType == 2) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (matchType == 3) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		if (matchType == 1 || matchType == 2) {
			planType = 1;
		} else if (matchType == 3) {
			planType = 2
		}
		var data = {
			planNo: planNo,
			amount: amount,
			planType: planType
		}
		ui.showCreateOrder(data);
	}
	
	function getDigitalPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			needSaleTicket: true,
			needUser: true,
			needAccess: true,
			lotteryId: 'FC3D',
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getDigitalPlanList(options, function(ret) {
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
				$("#planList").append(ticketFollowView.digitalPlanList(data));
			} else {
				$("#planList").html(ticketFollowView.digitalPlanList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
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
					desc: '晒米场3D推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateDigitalTicketOrder(data);
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});