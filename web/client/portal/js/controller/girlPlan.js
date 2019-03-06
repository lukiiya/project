define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var girlPlanView = require('view/girlPlan');
	var pageNum = null;
	var pageSize = null;
	var scrollLoad = null;//是否能滚动加载

	function init(view) {
		pageNum = 1;
		pageSize = 5;
		scrollLoad = true;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		scrollLoad = null;
	}

	function setMain(view) {
		var options = {
			title: "美女推波",
			className: 'belle',
			isScrollHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(girlPlanView.content(data));
		$('#backBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
		});
		$('#homeBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#home');
		});
		setScrollEvent();
	}


	function setContent() {
		getPlanList();
		setPageShare();
	}

	function setPageShare() {
		var data = {
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/mntb.png',
			desc: '美女推波'
		}
		ui.setShare(data);
	}

	function setScrollEvent() {
		$("#pageContent").on('scroll', function() {
			var pcDom = this;
			var scrollHeight = pcDom.scrollHeight;
			var offsetHeight = pcDom.offsetHeight;
            var scrollTop = pcDom.scrollTop;
            var scrollTopOver = 50;
            if (scrollTop > scrollTopOver) {
        		$('#pageHeader').show().attr('class', 'header fade_in');
            } else {
            	$('#pageHeader').attr('class', 'header fade_out');
            }
            if (scrollLoad) {
            	var maxScrollTop = scrollHeight - offsetHeight;
	            if (maxScrollTop - scrollTop <= 30) {
	            	moreList();
	            }
            }
        });
	}

	function moreList() {
		pageNum++;
		getPlanList(true);		
	}
	
	function getPlanList(append) {
		scrollLoad = false;
		var options = {
			needGirl: true,
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
			scrollLoad = pageNum < maxPageNum;
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(girlPlanView.planList(data));
			} else {
				$("#planList").html(girlPlanView.planList(data));
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
					desc: '晒米场美女推波',
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
			scrollLoad = true;
		});
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var userNo = trim($(this).attr("userNo"));
		var matchNum = parseInt($(this).attr("matchNum")) || 0;
		if (userNo && matchNum <= 0) {
			common.locationUrl("#userDetail&userNo=" + userNo);
			return;
		}
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