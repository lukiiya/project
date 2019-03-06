define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.slides');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var bannerCgi = require('cgi/banner');
	var hotMatchCgi = require('cgi/match');
	var floatIconCgi = require('cgi/floatIcon');
	var homeView = require('view/home');
	var pageNum = null;
	var pageSize = null;
	var scrollLoad = null;//是否能滚动加载

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		scrollLoad = true;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		scrollLoad = null;
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		clearTimeout(getUserRankList.timer);
	}

	function setMain(view) {
		var options = {
			title: "晒米场",
			className: 'index',
			showFooter: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		};
		main.setContent(homeView.content(data));
		setGroupEvent();
		$('#signBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#sign');
		});
		setScrollEvent();
	}


	function setContent() {
		getBannerList();
		setUserType();
		getUserInfo();
		setType();
		setTab();
		getUserRankList();
		setPageShare();
//		getFloatIconInfo();
	}

	function setPageShare() {
		if (!common.isWeixinBrowser()) {
			return;
		}
		var data = {
			desc: '竞彩实单推荐平台, 足球篮球赛事预测'
		}
		ui.setShare(data);
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
	
	function setType() {
		var tabList = $('#hotMatchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			getHotMatchList();
		});
		tabList.eq(0).click();
	}
	
	function setUserType() {
		var tabList = $('#userTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var userType = trim($(this).attr('userType'));
			if (userType == 1) {
				getUserList();
			} else if (userType == 2) {
				getWinRateRankList();
			} else if (userType == 3) {
				getProfitRateRankList();
			}
		});
		tabList.eq(0).click();
	}
	
	function setGroupEvent() {
		$(".banner [groupNo]").on('click', function(e) {
			var groupNo = trim($(this).attr("groupNo"));
			if (!groupNo) {
				return;
			} 
			if (groupNo == "jxzp") {
				common.locationUrl("#jxzpList");
			} else if (groupNo == "girlPlan") {
				common.locationUrl("#girlPlan");
			} else if (groupNo == "5F5E101-BC6150") {
				common.locationUrl("#cdsd");
			} else if (groupNo == "bet") {
				common.locationUrl("#documentaryMarket");
			} else if (groupNo == "free") {
				common.locationUrl("#sign");
			} else if (groupNo == "cphb") {
				common.locationUrl("#createPresentOrder");
			} else if (groupNo == "replay") {
				common.locationUrl("#replayList");
			} else {
				common.locationUrl("#userList&groupNo=" + groupNo);
			}
		});
	}

	function setScrollEvent() {
		$('#pageContent').on('scroll', function() {
			var pcDom = this;
			var scrollHeight = pcDom.scrollHeight;
			var offsetHeight = pcDom.offsetHeight;
            var scrollTop = pcDom.scrollTop;
            var scrollTopOver = 50;
            /*if (scrollTop > scrollTopOver) {
        		$('#pageHeader').show().attr('class', 'header fade_in');
            } else {
            	$('#pageHeader').attr('class', 'header fade_out');
            }*/
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
	
	function getBannerList() {
		var options = {}
		bannerCgi.getBannerList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#bannerList").html(homeView.bannerList(data));
			$("#dotList").html(homeView.dotList(data));
			setBanner();
		});
	}
	
	function getPlanList(append) {
		scrollLoad = false;
		var matchType = parseInt($('#recommendTab [matchType].active').eq(0).attr('matchType')) || 0;
		var options = {
			matchType: matchType,
			needHome: true,
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
			if (list.length <= 0 && !getPlanList.first) {
				getPlanList.first = true;
				$('#recommendTab span').eq(1).click();
				return;
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(homeView.planList(data));
			} else {
				$("#planList").html(homeView.planList(data));
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
				if (common.isWeixinBrowser()) {
					var user = common.getLoginUser();
					var spreaderUserNo = trim(user && user.userNo || '');
					var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
					var data = {
						title: userName,
						link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
						imgUrl: userImg,
						desc: '晒米场足球推荐专家',
						success: function() {
							setPageShare();
						},
						cancel: function() {
							setPageShare();	
						}
					}
					ui.showShare(data);
				}
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
		}, function() {
			scrollLoad = true;
		});
	}

	function getUserList() {
		var options = {
			groupNo: '5F5E103-BC6152',
			pageNum: 1,
			pageSize: 23	
		}
		userCgi.getUserList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 1
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userList&groupNo=5F5E103-BC6152");
			});
		});
	}
	
	function getWinRateRankList() {
		var options = {
			pageNum: 1,
			pageSize: 7
		}
		userCgi.getWinRateRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 2
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userRankList&type=2");
			});
		});
	}
	
	function getProfitRateRankList() {
		var options = {
			pageNum: 1,
			pageSize: 7
		}
		userCgi.getProfitRateRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 3
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userRankList&type=3");
			});
		});
	}
	
	function setBanner() {
		$('#bannerList').slidesjs({
			width: 375,
			height: 125,
			navigation: false,
			pagination: false,
			play: {
		      active: false,
		      effect: "slide",
		      interval: 3000,
		      auto: true,
		      swap: true,
		      pauseOnHover: false,
		      restartDelay: 2500
		    } ,
			callback: {
				loaded: function(number) {
				},
				start: function(number) {
				},
				complete: function(number) {
					var index = number - 1;
					var dot = $("#dotList .dot");
					dot.removeClass("active");
					dot.eq(index).addClass("active");
				}
		    }
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
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function getHotMatchList() {
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		var type = parseInt($('#hotMatchTab [type].active').eq(0).attr('type')) || 0;
		var options = {
			type: type,
			pageNum: 1,
			pageSize: 1,
			status: 4
		}
		hotMatchCgi.getHotMatchList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				if (type == 1) {
					if (!getHotMatchList.first) {
						getHotMatchList.first = true;
						$('#hotMatchTab span').eq(1).click();
					}
				} else if (type == 2) {
					$("#matchList").html('');
				}
				return;
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#matchList").html(homeView.matchList(data));
			$("#matchList .hotGame_box").on("click", function (e) {
				common.locationUrl('#hotMatch&type=' + type);
			});
			if (type == 1) {
				footballScoreUpdate();
			} else if (type == 2) {
				basketballScoreUpdate();
			}
		});
	}
	
	function getUserInfo() {
		if (common.isLogin()) {
			var options = {}
			userCgi.getUserInfo(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var user = ret.data || {};
				var isABT = user.isABT;
				if (isABT) {
					$("#bet").show();
				} else {
					$("#trader").show();
				}
			});
		} else {
			//首页可以不需要登录查看
			$("#trader").show();
		}
	}
	
	function footballScoreUpdate() {
		var url = "http://i.sporttery.cn/api/match_live_2/get_match_updated";
		$.ajax({
			url: url,
			type: "get",
			dataType: 'script',
			cache: false,
			success:function() {  
				var matchList = window.match_updated || [];
				for (var i=0, length = matchList.length; i < length; i++) {
					var sportteryMatchId = matchList[i].m_id || 0;
					var minute = matchList[i].minute || 0;
					var trueTimeSocreH = matchList[i].fs_h || 0;
					var trueTimeSocreA = matchList[i].fs_a || 0;
					var status = trim(matchList[i].status);
					if (sportteryMatchId <= 0) {
						continue;
					}
					if (minute > 0) {
						$('#beginTime'+sportteryMatchId).hide();
						$('#minute'+sportteryMatchId).html(minute+'<sup>\'</sup>').show();
					} else {
						$('#minute'+sportteryMatchId).hide();
						$('#beginTime'+sportteryMatchId).show();
					}
					if (status == 'Playing') {
						$('#vs'+sportteryMatchId).hide();
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;:&nbsp;'+trueTimeSocreA).show();
					} else {
						$('#score'+sportteryMatchId).hide();
						$('#vs'+sportteryMatchId).show();	
					}
				}
				footballScoreUpdate.timer = setTimeout(footballScoreUpdate, 15*1000);
       		},  
		});
	}

	function basketballScoreUpdate() {
		var date = new Date();
		var today = common.formatDate(date, 'yyyy-MM-dd');
		var url = "http://u1.tiyufeng.com/v2/game/date_game_list?date=" + today;
		$.ajax({
			url: url,
			type: "get",
			dataType: 'jsonp',
			cache: false,
			jsonp: "callBack",
			jsonpCallback: "basketBallScore",
			success: function(basketBallScore) { 
				var basketballHomeMap = [],
					basketballAwayMap = [],
					sportteryMatchIdMap = [];
				$(".hotGame_box .basketballHome").each(function (i, item) {
					var basketballHome = trim($(this).text());
					var sportteryMatchId = $(this).parents("li.hotGame_box").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$(".hotGame_box .basketballAway").each(function (i, item) {
					var basketballAway = trim($(this).text());
					basketballAwayMap.push(basketballAway);
				});
				for (var i = 0, length = basketBallScore.length; i < length; i++) {
					var gameStatus = parseInt(basketBallScore[i].gameStatus) || 1; //1=未开始,2=进行中,3=已结束
					var homeName = trim(basketBallScore[i].homeName) || "";
					var guestName = trim(basketBallScore[i].guestName) || "";
					var homeScore = parseInt(basketBallScore[i].homeScore) || 0;
					var guestScore = parseInt(basketBallScore[i].guestScore) || 0;
					var itemName = trim(basketBallScore[i].itemName) || "";//篮球 ,足球
					var leagueName = trim(basketBallScore[i].leagueName) || "";//联赛名
					var statusDesc = trim(basketBallScore[i].statusDesc) || "";//比赛状态
					for (var j = 0,len = basketballHomeMap.length; j < len; j++) {
						if (basketballHomeMap[j] == homeName && basketballAwayMap[j] == guestName) {
							var sportteryMatchId = sportteryMatchIdMap[j];
							if (statusDesc == "第一节" || statusDesc == "第二节" || statusDesc == "中场" || statusDesc== "第三节" || statusDesc== "第四节") {
								$('#beginTime'+sportteryMatchId).hide();
								$('#minute'+sportteryMatchId).html(statusDesc).show();
							} else {
								$('#minute'+sportteryMatchId).hide();
								$('#beginTime'+sportteryMatchId).show();
							};
							if (gameStatus == 2) {
								$('#vs'+sportteryMatchId).hide();
								$('#score'+sportteryMatchId).html(guestScore+'&nbsp;-&nbsp;'+homeScore).show();
							} else {
								$('#score'+sportteryMatchId).hide();
								$('#vs'+sportteryMatchId).show();	
							}
						}
					}
				}
				basketballScoreUpdate.timer = setTimeout(basketballScoreUpdate, 15*1000);	
       		}
		});
	}

	function getUserRankList() {
		clearTimeout(getUserRankList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		userCgi.getUserRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#rankList").html(homeView.rankList(data));
			$('#rankBox').off().on('click', function(e) {
				common.locationUrl('#userRankList');
			}).show();
			var textScroll = function() {
				var ul = $("#rankList");
				var li = ul.find("li");
				var length = li.length;
				if (length <= 1) {
					return;
				}
				var firstLi = li.eq(0);
				var height = firstLi.outerHeight(true);
				firstLi.animate({marginTop: -height}, 500, function() {
					firstLi.appendTo(ul).css({marginTop:0});
            		getUserRankList.timer = setTimeout(textScroll, 5000);
				});
			};
			getUserRankList.timer = setTimeout(textScroll, 5000);
		})
	}
	
	function getFloatIconInfo() {
		var options = {}
		floatIconCgi.getFloatIconInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			$("#pageContainer").append(homeView.floatIcon());
			var data = ret.data || {};
			var width = data.width/3 + 'px' || 0;
			var height = data.height/3 + 'px' || 0;
			var href = data.href;
			var src = data.src;
			$("#floatImgWrap").css({'width': width,'height': height});
			$("#floatImg").attr('src',src);
			$("#floatImgWrap").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl(href);
			})
		});
	}
});