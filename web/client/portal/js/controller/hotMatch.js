define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var hotMatchView = require('view/hotMatch');
	var type = null;
	var pageNum = null;
	var pageSize = null;
	var saleTime = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 10;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
		saleTime = null;
		hideMatchFilter();
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
	}

	function setMain(view) {
		var options = {
			title: "赛事",
			className: 'hotGame',
			showHeader: true,
			isHotMatchHeader: true,
			showFooter: true,
			rightButtonText: '筛选',
			rightButtonFun: function() {
				var display = trim($('#matchFilter').css('display'));
				if (display == 'none') {
					showMatchFilter();
				} else {
					hideMatchFilter();
				}
			}
		}
		main.setMain(view, options);
		main.setContent(hotMatchView.content());
	}


	function setContent() {
		setType();
	}


	function moreList() {
		pageNum++;
		getHotMatchList(true);		
	}
	
	function setMatchFilter() {
		$('#selectLeague').val('');
		var options = {
			saleTime: saleTime,
			type: type,
			pageNum: 1,
			pageSize: 200	
		}
		matchCgi.getHotMatchLeagueList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#leagueList").html(hotMatchView.leagueList(data));
			$('#leagueList .hot_markSon').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).toggleClass('active');
			});
			$('#checkedAll').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').addClass('active');
			});
			$('#inverse').off().on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').toggleClass('active');
			});
			$('#ensure').off().on('click', ensureMatchFilter);
			var selectLeague = [];
			$.each(list, function(i, item) {
				var league = trim(item.league);
				if (league) {
					selectLeague.push(league);
				}
			});
			$('#selectLeague').val(selectLeague.join('|'));
		});
	}

	function showMatchFilter() {
		$('#matchFilterTab span').removeClass('active');
//		activeMatchFilter();
		$('#matchFilter').show();
		$('#pageHeader,#matchFilter').off().on('click', hideMatchFilter);
		$('#matchFilterTab,#leagueList').off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	function hideMatchFilter() {
		$('#matchFilter').hide();
		$('#pageHeader,#matchFilter').off('click');
		$('#matchFilterTab,#leagueList').off('click');
	}

	function ensureMatchFilter() {
		var activeLeague = $('#leagueList .hot_markSon.active');
		var selectLeague = [];
		activeLeague.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				selectLeague.push(league);
			}
		});
		if (selectLeague.length <= 0) {
			ui.showNotice('至少选择一个联赛');
			return;
		}
		$('#selectLeague').val(selectLeague.join('|'));
		hideMatchFilter();
		pageNum = 1;
		pageSize = 10;
		getHotMatchList();
	}

	/*function activeMatchFilter() {
		var leagueMap = {};
		var selectLeague = trim($('#selectLeague').val());
		selectLeague = selectLeague.split('|');
		$(selectLeague).each(function (i, league) {
			league = trim(league);
			if (league) {
				leagueMap[league] = true;
			}
		});
		var leagueList = $('#leagueList .hot_markSon');
		leagueList.removeClass('active');
		leagueList.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league && leagueMap[league]) {
				$(item).addClass('active');
			}		
		});
	}*/
	
	function setType() {
		var tabList = $('#matchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			getDateList();
		});
		//默认选中
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}
	
	/*function setMatchTab() {
		var tabList = $('#dateList .ui-flex_item');
		tabList.off().on('click', function(e) {
			tabList.removeClass('color_g');
			$(this).addClass('color_g');
			saleTime = $(this).attr("saleTime");
			setMatchFilter();
			pageNum = 1;
			pageSize = 10;
			getHotMatchList();
		});
		tabList.eq(0).click();
	}*/

	function setLeagueParam(options) {
		var selectLeague = trim($('#selectLeague').val());
		var leagueList = $('#leagueList .hot_markSon');
		var leagueArr = [];
		leagueList.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				leagueArr.push(league);	
			}	
		});
		//全部相等, 相当于全选, 不设置league查询参数, 目的是优化查询性能
		if (leagueArr.join('|') == selectLeague) {
			return;
		}
		if (selectLeague) {
			selectLeague = selectLeague.split('|');
			if (selectLeague && selectLeague.length > 0) {
				var leagueArr = [];
				$(selectLeague).each(function (i, league) {
					league = trim(league);
					if (league) {
						leagueArr.push(league);
					}
				});
				options.league = leagueArr;
			}
		}
	}
	
	function getDateList() {
		var options = {
			type: type	
		}
		matchCgi.getDateList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var date = new Date();
			var today = common.formatDate(date, 'yyyy-MM-dd');
			var list = ret.data || [];
			var data = {
				list: list,
				Date: Date,
				today: today
			}
			$("#dateList").html(hotMatchView.dateList(data));
			var tabList = $('#dateList .ui-flex_item');
			tabList.off().on('click', function(e) {
				tabList.removeClass('active');
				$(this).addClass('active');
				saleTime = $(this).attr("saleTime");
				setMatchFilter();
				pageNum = 1;
				pageSize = 10;
				getHotMatchList();
			});
			$('#dateList .ui-flex_item[saleTime='+ today +']').click();
		});
	}
	
	function getHotMatchList(append) {
		main.unsetScrollLoad();
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		var options = {
			type: type,
			saleTime: saleTime,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		setLeagueParam(options);
		matchCgi.getHotMatchList(options, function(ret) {
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
				$("#matchList").append(hotMatchView.matchList(data));
			} else {
				$("#matchList").html(hotMatchView.matchList(data));
			}
			$("#matchList .hotGame_box").on("click", function (e) {
				var matchId = parseInt($(this).attr("matchId"));
				var animationUrl = trim($(this).attr('animationUrl')) || '';
				var videoUrl = trim($(this).attr('videoUrl')) || '';
				if (isNaN(matchId) || matchId <= 0) {
					return;
				}
				common.locationUrl('#hotMatchDetail&matchId=' + matchId + '&type=' + type);
				common.setCache('liveUrl',{
					animationUrl: animationUrl,
					videoUrl: videoUrl
				},24*3600*1000)
			});
			if (list.length > 0) {
				if (type == 1){
					//"竞彩"才开启定时器，"已结束"不需要
					footballScoreUpdate();
				} else if (type == 2) {
					basketballScoreUpdate();
				}
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function footballScoreUpdate() {
		var url = "//i.sporttery.cn/api/match_live_2/get_match_updated";
		$.ajax({
			url: url,
			type: "get",
			dataType: 'script',
			cache: false,
			success: function() {  
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
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;-&nbsp;'+trueTimeSocreA).show();
					} else {
						$('#score'+sportteryMatchId).hide();
						$('#vs'+sportteryMatchId).show();	
					}
				}
				footballScoreUpdate.timer = setTimeout(footballScoreUpdate, 15*1000);
       		}
		});
	}
	
	function basketballScoreUpdate() {
		var date = new Date();
		var today = common.formatDate(date,'yyyy-MM-dd');
		var url = "//u1.tiyufeng.com/v2/game/date_game_list?date=" + today;
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
					var basketballHome = trim($(this).text().replace('(主)',''));
					var sportteryMatchId = $(this).parents("li.hotGame_box").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$(".hotGame_box .basketballAway").each(function (i, item) {
					var basketballAway = trim($(this).text());
					basketballAwayMap.push(basketballAway);
				});
				for (var i=0, length = basketBallScore.length; i < length; i++) {
					var gameStatus = parseInt(basketBallScore[i].gameStatus) || 1; //1=未开始,2=进行中,3=已结束
					var homeName = trim(basketBallScore[i].homeName) || "";
					var guestName = trim(basketBallScore[i].guestName) || "";
					var homeScore = parseInt(basketBallScore[i].homeScore) || 0;
					var guestScore = parseInt(basketBallScore[i].guestScore) || 0;
					var itemName = trim(basketBallScore[i].itemName) || "";//篮球 ,足球
					var leagueName = trim(basketBallScore[i].leagueName) || "";//联赛名
					var statusDesc = trim(basketBallScore[i].statusDesc) || "";//比赛状态
					for (var j = 0,len = basketballHomeMap.length; j < len; j++) {
						if (basketballHomeMap[j] == homeName) {
							var sportteryMatchId = sportteryMatchIdMap[j];
							if (statusDesc == "第一节" || statusDesc == "第二节" || statusDesc == "中场" || statusDesc == "第三节" || statusDesc == "第四节") {
								$('#beginTime'+ sportteryMatchId).hide();
								$('#minute'+ sportteryMatchId).html(statusDesc).show();
							} else {
								$('#minute'+ sportteryMatchId).hide();
								$('#beginTime'+ sportteryMatchId).show();
							};
							if (gameStatus == 2) {
								$('#vs'+ sportteryMatchId).hide();
								$('#score'+ sportteryMatchId).html(guestScore +'&nbsp;-&nbsp;'+ homeScore).show();
							} else {
								$('#score'+ sportteryMatchId).hide();
								$('#vs'+ sportteryMatchId).show();	
							}
						}
					}
				}
				basketballScoreUpdate.timer = setTimeout(basketballScoreUpdate, 15*1000);	
       		}
		});
	}
});