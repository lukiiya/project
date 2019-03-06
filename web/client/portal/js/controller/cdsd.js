define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var cdsdView = require('view/cdsd');
	var groupNo = '5F5E101-BC6150';
	var pageNum = null;
	var pageSize = null;

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
	}

	function setMain(view) {
		var options = {
			title: "实单推荐",
			className: 'index',
			showHeader: true,
			rightButtonText: '明星店长',
			rightButtonFun: function() {
				common.locationUrl('#userList&groupNo='+groupNo);
			}
		}
		main.setMain(view, options);
		main.setContent(cdsdView.content());
	}

	function setContent() {
		setTab();
	}

	function setTab() {
		var tabList = $('#recommendTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			pageNum = 1;
			pageSize = 8;
			getPlanList();
		});
		tabList.eq(0).click();
	}
		
	function getPlanList(append) {
		main.unsetScrollLoad();
		var matchType = parseInt($('#recommendTab [matchType].active').eq(0).attr('matchType')) || 0;
		var options = {
			matchType: matchType,
			groupNo: groupNo,
			needSale: true,
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
				$("#planList").append(cdsdView.planList(data));
			} else {
				$("#planList").html(cdsdView.planList(data));
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
		getPlanList(true);		
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