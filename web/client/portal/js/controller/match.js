define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var matchView = require('view/match');
	var type = null;
	var matchMap = null;
	var oddsMap = null;
	var self = null;
	var tab = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 0;
		self = trim(common.getUrlParam("self")) || false;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		if (!window.matchSelectBettype) {
			window.matchSelectBettype = {
				curMatch: {},
				selectMatch: {}	
			};
		};
		if (self) {
			common.setHistoryBack('#lotteryHall');
		} else {
			common.setHistoryBack('#editPlan');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		matchMap = null;
		oddsMap = null;
		self = null;
		tab = null;
	}

	function setMain(view) {
		var optios = {};
		if (self) {
			var titleMap = {1:'竞彩足球',2:'竞彩篮球',3:'竞足亚盘'}
			options = {
				title: titleMap[type],
				className: 'selectMatch',
				showHeader: true,
				rightButtonText:'筛选',
				isFootballHeader: type == 1 ? true : false,
				rightButtonFun: function() {
					var display = trim($('#matchFilter').css('display'));
					if (display == 'none') {
						showMatchFilter();
					} else {
						hideMatchFilter();
					}
				}
			}
		} else {
			options = {
				title: "足球",
				className: 'selectMatch',
				showHeader: true,
				isMatchHeader: true,
				rightButtonText: '确定',
				rightButtonFun: selectSubmit
			}
		}
		main.setMain(view, options);
		main.setContent(matchView.content());
	}

	function setContent() {
		if (self) {
			setMatchFilter();
			showHideSubmitBtn();
			if (type == 1 && self) {
				setTab();
			} else {
				getMatchList();
			}
		} else {
			setType();
		}
	}
	
	function setType() {
		var tabList = $('#matchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			getMatchList();
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
	
	function setTab() {
		var tabItem = $("#footballTab span");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab")) || 1;
			getMatchList();
			if (tab == 2) {
				$(".rightIcon_top").hide();
			} else {
				$(".rightIcon_top").show();
			}
//			var selectMatch = window.matchSelectBettype.selectMatch || {};
//			for(var key in selectMatch){
//				delete selectMatch[key];
//			}
//			var length = Object.keys(selectMatch).length;
//			if (length > 0) {
//				$("#buyList").show();
//			} else {
//				$("#buyList").hide();
//			}
//			$("#buyList").hide();
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab")) || 0;
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
	
	function selectSubmit() {
		if (isNaN(type) || type <= 0 || (type != 1 && type != 2 && type != 3)) {
			ui.showNotice("赛事类型有误");
			setTimeout(function () {
				common.locationUrl('#editPlan');
			}, 1000);
			return;
		}
		setSelectMatch();
		var matchList = [];
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0 || !matchMap[matchId] || !oddsMap[oddsId]) {
				return;
			}
			matchList.push({
				match: matchMap[matchId],
				odds: oddsMap[oddsId],
				recommend: recommend
			});
		});
		if (matchList.length <= 0) {
			ui.showNotice("请选择一场比赛");
			return;	
		} else if (matchList.length > 8) {
			ui.showNotice("最多只能选择8场比赛");
			return;
		}
		if (!self) {
			if (matchList.length == 1) {
				var recommend = matchList[0].recommend || [];
				var odds = matchList[0].odds || {};
				var bettypeContent = trim(odds.bettypeContent) || '';
				var bettypeOdds = odds.bettypeOdds || {};
				if(ENV != 'beta') {
					if (bettypeContent == 'SPF' || bettypeContent == 'RQSPF') {
						if (recommend.length == 1) {
							var rd = recommend[0] || '';
							var od = bettypeOdds[rd] || 0;
							if (od < 1.5) {
								ui.showNotice("胜平负单关推荐只能选1.5以上的赔率");
								return;	
							}
						} else {
							ui.showNotice("胜平负单关推荐只能单选");
							return;
						}
					}
				}
			}
		}
		var txtMap = {'BF':'"比分"','BQC':'"半全场"','SFC':'"胜分差"'};
		for (var i = 0, length = matchList.length; i < length; i++) {
			var odds = matchList[i].odds || {};
			var bettypeContent = trim(odds.bettypeContent) || '';
			if (bettypeContent == 'ZJQ' && length > 6) {
				ui.showNotice("包含'总进球'玩法的比赛,最多选6场");
				return;
			}　else if ((bettypeContent == 'BF' || bettypeContent == 'BQC' || bettypeContent == 'SFC') && length > 4) {
				ui.showNotice("包含"+txtMap[bettypeContent]+"玩法的比赛,最多选4场");
				return;
			}
			if (self) {
				if (odds.single != 1 && matchList.length < 2) {
					ui.showNotice("非单关至少选择两场比赛");
					return;
				}
			}
		}
		window.matchSelectBettype = null;
		if (self) {
			window.editSelfSelectMatch = matchList;
			common.locationUrl('#createTicketOrder&selfTicket=true&type='+ type + '&tab=' + tab);
		} else {
			window.editPlanSelectMatch = matchList;
			common.locationUrl('#editPlan&matchType='+ type);
		}
	}

	function getMatchList() {
		var options = {
			type: type
		}
		if (type == 1 && tab == 2) {
			options.needSingle = true
		}
		if (type == 3) {
			options.type = 1;
			options.needYaPan = true
		}
		setLeagueParam(options);
		matchCgi.getMatchList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			matchMap = {};
			oddsMap = {};
			$.each(list, function (i, item) {
				var matchList = item.matchList || [];
				$.each(matchList, function (i, item) {
					var matchId = parseInt(item.matchId) || 0;	
					var beginTime = trim(item.beginTime);
					var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
					item.bDate = common.formatDate(beginTimeOb, 'MM-DD');
					item.bTime = common.formatDate(beginTimeOb, 'HH:II');
					if (isNaN(matchId) || matchId <= 0) {
						return;
					}
					//设置比赛,赔率映射map
					matchMap[matchId] = item;
					$.each(item.bettype, function(i, item){
						var oddsId = parseInt(item.oddsId) || 0;
						if (isNaN(oddsId) || oddsId <= 0) {
							return;	
						}
						oddsMap[oddsId] = item;
					});
				});
			});
			var data = {
				list: list
			}
			if (type == 1) {
				if (self) {
					if (tab == 1) {
						$("#matchList").html(matchView.football(data));
					} else if (tab == 2) {
						$("#matchList").html(matchView.SPFDG(data));
					}
				} else {
					$("#matchList").html(matchView.football(data));
				}
				
			} else if (type == 2) {
				$("#matchList").html(matchView.basketball(data));
			} else if (type == 3) {
				$("#matchList").html(matchView.JZYP(data));
			}
			
			//高亮选择的玩法
			activeSelectBettype();
			//结果选择
			var matchBettypeTd = $("#matchList .matchBettype td[recommend]");
			matchBettypeTd.on('click', function(e) {
				var className = trim(this.className);
				var curMatchTable = $(this).parents('.match_table').eq(0);
				var matchId = parseInt(curMatchTable.attr("matchId"));
				if (isNaN(matchId) || matchId <= 0) {
					return;
				}
				var curMatchBettype = this.parentNode;
				var activeTd = $(curMatchBettype).find("td.active");
				if (!self) {
					if (type == 1) {
						if (className.indexOf('active') == -1  && activeTd.length >= 2) {
							ui.showNotice('胜平负玩法最多选择两个');	
							return;
						} 
					} else if (type == 2) {
						if (className.indexOf('active') == -1  && activeTd.length >= 1) {
							ui.showNotice('胜负或大小分玩法最多选择一个');	
							return;
						}
					}
				}
				var matchBettype = curMatchTable.find('.matchBettype');
				matchBettype.each(function(i, item) {
					if (curMatchBettype != item) {
						$(item).find("td").removeClass("active");
					}
				});
				if (type == 3) {
					$(this).siblings('td.' + matchId + 'v').removeClass("active")
				}
				$(this).toggleClass("active");
				//删除之前的更多玩法选择
				$('#moreBettype' + matchId).removeClass('current');
				delete window.matchSelectBettype.selectMatch[matchId];
				if (self) {
					showHideSubmitBtn();
				}
			});
			//更多玩法
			$("#matchList td.more_game").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var curMatchTable = $(this).parents('.match_table').eq(0);
				var matchId = parseInt(curMatchTable.attr("matchId"));
				if (isNaN(matchId) || matchId <= 0 || !matchMap[matchId]) {
					return;
				}
				window.matchSelectBettype.curMatch =  matchMap[matchId];
				setSelectMatch();
				if (self) {
					common.locationUrl('#matchMoreBettype&self=' + self + '&type=' + type);
				} else {
					common.locationUrl('#matchMoreBettype&type=' + type);
				}
			});
			//比赛展开,收缩
			var matchDate = $("#matchList .matchDate");
			var matchContent = $("#matchList .matchContent");
			matchDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				matchDate.find('.arrow').attr('class', 'arrow arrow_down');
				matchContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
		});
	}

	//高亮选择玩法
	function activeSelectBettype() {
		var matchBettype = $('#matchList .matchBettype');
		var recommendDomMap = {};
		$.each(matchBettype, function(i, item) {
			var oddsId = parseInt($(item).attr("oddsId"));
			if (isNaN(oddsId) || oddsId <= 0) {
				return;
			}
			$(item).find("td[recommend]").each(function(i, item) {
				var rd = trim($(item).attr("recommend"));
				if (rd) {
					recommendDomMap[oddsId+'|'+rd] = item;
				}
			});
		});
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0) {
				return;
			}
			var selected = false;
			$.each(recommend, function(i, rd) {
				if (rd && recommendDomMap[oddsId+'|'+rd]) {
					$(recommendDomMap[oddsId+'|'+rd]).addClass('active');
					selected = true;
				}
			});
			if (!selected) {
				$('#moreBettype' + matchId).addClass('current');
			}
		});
	}

	//记录当前选择的比赛
	function setSelectMatch() {
		var matchBettypeJq =  $("#matchList .matchBettype:has(td.active)");
		matchBettypeJq.each(function(i, item) {
			var oddsId = parseInt($(item).attr("oddsId"));
			if (isNaN(oddsId) || oddsId <= 0) {
				return;
			}
			var matchTable = $(item).parents('.match_table').eq(0);
			var matchId = parseInt(matchTable.attr("matchId"));
			if (isNaN(matchId) || matchId <= 0) {
				return;
			}
			var recommend = [];
			var activeTd = $(item).find('td.active');
			activeTd.each(function(i, item) {
				var rd = trim($(item).attr("recommend"));
				if (rd) {
					recommend.push(rd);	
				}
			});
			window.matchSelectBettype.selectMatch[matchId] = {
				oddsId: oddsId,
				recommend: recommend
			};
		});
	}
	
	function showHideSubmitBtn() {
		setSelectMatch();
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		var length = Object.keys(selectMatch).length;
		$("#selectNum").html(length);
		if (length > 0) {
			$("#buyList").show();
		} else {
			$("#buyList").hide();
		}
		$("#createTicketSubmit").off().on('click', selectSubmit);
	}
	
	//筛选
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
	function setMatchFilter() {
		$('#selectLeague').val('');
		var options = {
			type: type,
			status: 1,
			pageNum: 1,
			pageSize: 200	
		}
		if (type == 3) {
			options.type = 1;
			options.needYaPan = true
		}
		matchCgi.getMatchLeagueList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#leagueList").html(matchView.leagueList(data));
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
		getMatchList();
	}
});