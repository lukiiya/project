define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var planCgi = require('cgi/plan');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var comboCgi = require('cgi/combo');
	var smlrCgi = require('cgi/smlr');
	var jxzpCgi = require('cgi/jxzp');
	var matchAnalyseCgi = require('cgi/matchAnalyse');
	var hotMatchDetailView = require('view/hotMatchDetail');
	var type = null;
	var user = null;
	var matchId = null;
	var tab = null;
	var groupNo = null;
	var home = null;
	var away = null;
	var league = null;
	var pageNum = null;
	var pageSize = null;
	var loadedSmlrAndJxzp = null;
	var match = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		matchId = parseInt(common.getUrlParam("matchId")) || 0;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		loadedSmlrAndJxzp = {};
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#hotMatch&type=' + type);
		if (!window.signleSelectBettype) {
			window.signleSelectBettype = {
				selectMatch: {}	
			};
		};
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		user = null;
		matchId = null;
		tab = null;
		groupNo = null;
		home = null;
		away = null;
		league = null;
		pageNum = null;
		pageSize = null;
		loadedSmlrAndJxzp = null;
		match = null;
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
//		common.clearCache('liveUrl');
	}

	function setMain(view) {
		var options = {
			title: "热门赛事",
			className: 'hotGame'
		}
		main.setMain(view, options);
		var data = {
			type: type,
			IMG_PATH: IMG_PATH
		};
		main.setContent(hotMatchDetailView.content(data));
		$('#backBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
			window.signleSelectBettype = null;
		});
		$('#homeBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#home');
		});
		if (type == 1) {
			$("#analyzeBtn,#oddsBtn").show();
		}
	}


	function setContent() {
//		getUserInfo();
		getMatchInfo();
		setTab();
	}

	function setPageShare() {
		var data = {
			desc: '【'+league+'】'+home+' vs '+away+'-晒米场专家推荐汇总'
		}
		ui.setShare(data);
	}

	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			user = ret.data || {};
		});
	}

	function getMatchInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		}
		matchCgi.getMatchInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			match = ret.data || {};
			league = trim(match.league) || '';
			home = trim(match.home) || '';
			away = trim(match.away) || '';
			var result = trim(match.result) || '';
			var isSale = match.isSale || false;
			if (isSale) {
				$("#tabDg").show();
			}
			var data = {
				IMG_PATH: IMG_PATH,
				match: match
			};
			$('#match').html(hotMatchDetailView.match(data));
			showHideLive();
			if (type == 1 && !result) {
				footballScoreUpdate();
			} else if (type == 2 && !result) {
				basketballScoreUpdate();
			}
			if (tab == 4) {
				if (type == 1) {
					$("#moreGame").html(hotMatchDetailView.football(data));
				} else if (type == 2) {
					$("#moreGame").html(hotMatchDetailView.basketball(data));
				}
				//高亮选择的玩法
				activeSelectBettype();
				//结果选择
				var matchBettype = $('.matchBettype');
				var matchBettypeTd = matchBettype.find("td[recommend]");
				matchBettypeTd.on('click', function(e) {
					var className = trim(this.className);
					var curMatchBettype = $(this).parents('.matchBettype')[0];
					var activeTd = $(curMatchBettype).find("td.active");			
					if (className.indexOf('active') == -1  && activeTd.length >= 6) {
						ui.showNotice('同种玩法最多选择6个');	
						return;
					} 
					matchBettype.each(function(i, item) {
						if (curMatchBettype != item) {
							$(item).find("td").removeClass("active");
						}
					});
					$(this).toggleClass("active");
					var matchBettypeJq = $(".matchBettype:has(td.active)");
					var length = matchBettypeJq.length;
					if (length > 0) {
						$("#btnWarp").show();
					} else {
						$("#btnWarp").hide();
					}
				});
				$("#sumbitBtn").off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					selectSubmit();
				})
			}
//			setPageShare();
		});
	} 
	
	function showHideLive() {
		var liveUrl = common.getCache('liveUrl');
		var animationUrl = liveUrl.animationUrl;
		var videoUrl = liveUrl.videoUrl;
		if (animationUrl != '') {	
			$("#animationBtn").addClass('active').off().on('click', function() {
				var scr = "<scr"+"ipt type='text/javascript'>location.href='"+ animationUrl + "';var iframe = window.parent.document.getElementById('liveIframe');var bHeight = iframe.contentWindow.window.frames[0].contentWindow.document.body.scrollHeight;iframe.height = bHeight;</scr"+"ipt>";
				var oIframe = '<iframe src="javascript:document.write(&quot;'+ scr +'&quot;)" frameborder="0" height="100%" width="100%" id="liveIframe" name="a"></iframe>';
				$("#liveIframeWrap").html(oIframe);
				$("#liveShowWrap").show();
				$("#hotBanner").hide();
			})
		}
		$("#liveCloseBtn").on('click', function() {
			$("#liveShowWrap").hide();
			$("#liveIframeWrap iframe").remove();
			$("#hotBanner").show();
		})
	}
	
	function setSelectMatch() {
		var matchBettypeJq = $(".matchBettype:has(td.active)");
		matchBettypeJq = matchBettypeJq.eq(0);
		var oddsId = parseInt(matchBettypeJq.attr("oddsId"));
		if (isNaN(oddsId) || oddsId <= 0) {
			return;
		}
		var recommend = [];
		var activeTd = matchBettypeJq.find('td.active');
		activeTd.each(function(i, item) {
			var rd = trim($(item).attr("recommend"));
			if (rd) {
				recommend.push(rd);	
			}
		});
		window.signleSelectBettype.selectMatch[matchId] = {
			oddsId: oddsId,
			recommend: recommend
		};
	}
	
	function selectSubmit() {
		setSelectMatch();
		var matchList = [];
		var selectMatch = window.signleSelectBettype.selectMatch || {};
		var oddsMap = {};
		$.each(match.bettype, function(i, item){
			var oddsId = parseInt(item.oddsId) || 0;
			if (isNaN(oddsId) || oddsId <= 0) {
				return;	
			}
			oddsMap[oddsId] = item;
		});
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0 || !match || !oddsMap[oddsId]) {
				return;
			}
			matchList.push({
				match: match,
				matchId: matchId,
				odds: oddsMap[oddsId],
				recommend: recommend
			});
		});
		window.signleSelectBettype = null;
		window.editSelfSelectMatch = matchList;
		common.locationUrl('#createTicketOrder');
	}
	
	function activeSelectBettype() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var selectMatch = window.signleSelectBettype.selectMatch || {};
		var selectBettype = selectMatch[matchId] || {};
		var oddsId = parseInt(selectBettype.oddsId);
		var recommend = selectBettype.recommend || [];
		if (isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0) {
			return;
		}
		var matchBettype = $('.table_wrap .matchBettype');
		var recommendMap = {};
		$.each(matchBettype, function(i, item) {
			var oddsId = parseInt($(item).attr("oddsId"));
			if (isNaN(oddsId) || oddsId <= 0) {
				return;
			}
			$(item).find("td[recommend]").each(function(i, item) {
				var rd = trim($(item).attr("recommend"));
				if (rd) {
					recommendMap[oddsId+'|'+rd] = item;
				}
			});
		});
		$.each(recommend, function(i, rd) {
			if (rd && recommendMap[oddsId+'|'+rd]) {
				$(recommendMap[oddsId+'|'+rd]).addClass('active');
			}
		});
		var matchBettypeJq = $(".matchBettype:has(td.active)");
		var length = matchBettypeJq.length;
		if (length > 0) {
			$("#btnWarp").show();
		} else {
			$("#btnWarp").hide();
		}
	}
	
	function getSmlrAndJxzp() {
		hasSmlrInfo();
		hasJxzpInfo();
	}

	function hasSmlrInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		};
		smlrCgi.hasSmlrInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var has = ret.data || false;
			finishSmlrAndJxzp('smlr', has);
		});	
	}

	function hasJxzpInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		};
		jxzpCgi.hasJxzpInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || [];
			var length = data.length;
			finishSmlrAndJxzp('jxzp', length > 0);
			for (var i = 0; i < length; i++) {
				$("#jxzpType" + data[i]).addClass("checked").show();
			}
		});
	}

	function finishSmlrAndJxzp(type, has) {
		loadedSmlrAndJxzp[type] = has;
		if ('smlr' in loadedSmlrAndJxzp && 'jxzp' in loadedSmlrAndJxzp) {
			if (loadedSmlrAndJxzp['smlr']) {
				$("#tabLr").show();
			}
			if (loadedSmlrAndJxzp['jxzp']) {
				$("#tabJx").show();
			}
		}
	}


	function setTab() {
		var tabItem = $("#tabBox [tab]");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			$('#tabContent1,#tabContent2,#tabContent3,#tabContent4').hide();
			$('#tabContent'+tab).show();
			groupNo = null
			pageNum = 1;
			pageSize = 8;
			if (tab == 1) {
				getMatchAnalyseList();
			} else if (tab == 2) {
				getSmlrAndJxzp();
				setOddsType();
			} else if (tab == 3) {
				getPlanList.call($('#planList'));
			} else if (tab == 4) {
				getMatchInfo();
			}
		});
		//默认选中状态
//		var tabIndex = -1;
//		tabItem.each(function (i, item) {
//			var t = parseInt($(this).attr("tab"));
//			if (t == tab) {
//				tabIndex = i;
//				return;
//			}
//		});
//		if (tabIndex < 0) {
//			tabIndex = 0;
//		}
//		var item = tabItem.eq(tabIndex);
		if (type == 1) {
			tabItem.eq(0).click();
		} else if (type == 2) {
			tabItem.eq(2).click();
		}
	}

	function setGroup() {
		var groupItem = $("#groupBox [groupNo]");
		groupItem.off().on("click", function(e) {
			groupItem.removeClass('active');
			$(this).addClass('active');
			groupNo = trim($(this).attr("groupNo"));
			pageNum = 1;
			pageSize = 8;
			getPlanList.call($('#groupPlanList'));
		});
		groupItem.eq(0).click();
	}

	function getPlanList(append) {
		var jqBox = this;
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		main.unsetScrollLoad();
		var options = {
			groupNo: groupNo,
			matchId: matchId,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
			if (ret.errCode == -1) {
				$("#noPlan").show()
			} else if (ret.errCode != 0) {
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
				list: list,
				type: type
			}
			if (append) {
				jqBox.append(hotMatchDetailView.planList(data));
			} else {
				jqBox.html(hotMatchDetailView.planList(data));
			}
			jqBox.find(".userShare").off().on("click", function(e) {
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
						setPageShare();
					},
					cancel: function() {
						setPageShare();
					}
				}
				ui.showShare(data);
			});
			jqBox.find(".userTicket").off().on('click', function(e) {
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
			jqBox.find(".userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			jqBox.find(".planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		if (tab == 3) {
			getPlanList.call($('#planList'), true);
		}
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			var param = [];
			if (matchId) {
				param.push('matchId='+ matchId);
			}
			if (type) {
				param.push('type='+ type);
			}
			if (tab) {
				param.push('tab='+ tab);
			}
			if (param.length > 0) {
				common.setHistoryBack("#hotMatchDetail&" + param.join('&'));
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
	
	function createSmlrOrder() {
		var options = {
			matchId: matchId,
			type: type
		}
		orderCgi.createSmlrOrder(options, function(ret) {
			if (ret.errCode != 0) {
				showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var orderNo = trim(data.orderNo);
			var payUrl = trim(data.payUrl);
			if (orderNo) {
				if (payUrl) {
					setTimeout(function() {
						common.locationUrl(payUrl);
					}, 1000);
				} else {
					ui.showNotice('解锁成功');
					setTimeout(function() {
						getSmlrInfo();
					}, 1000);
				}
			} else {
				showNotice("支付失败");	
			}
		});
	}
	
	function getSmlrInfo() {
		var options = {
			matchId: matchId
		}
		smlrCgi.getSmlrInfo(options, function(ret) {
			if (ret.errCode == 2) {
				$("#unclockHot").show();
				$("#buyHotCold").off().on('click',function() {
					createSmlrOrder();
				});
			} else if (ret.errCode == 0) {
				$("#unclockHot").hide();
				var smlrInfo = ret.data || {};
				var maxRecommendRateKey = smlrInfo.maxRecommendRateKey || '';
				var recommendRate = parseInt((smlrInfo[maxRecommendRateKey] || {}).recommendRate) || 0;
				var showRecommendRate = recommendRate != 0;
				var data = {
					smlrInfo: smlrInfo,
					showRecommendRate: showRecommendRate
				};
				$("#smlrInfo").html(hotMatchDetailView.smlrInfo(data));
				var per = 3.6;
				var percents = recommendRate;
				var degrees = per*percents;
				$('.circle.p'+percents+ ' .bar').css({
				  '-webkit-transform' : 'rotate(' + degrees + 'deg)',
				  'transform' : 'rotate(' + degrees + 'deg)'
				});
			} else {
				ui.showNotice(ret.msg);
			}
		});
	}
	
	function setJxzpType() {
		var tabItem = $("#jxzpTypeBox [jxzpType].checked");
		tabItem.off().on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			getJxzpInfo();
		});
		tabItem.eq(0).click();
	}
	
	function createJxzpOrder() {
		var options = {
			matchId: matchId,
			type: type
		}
		orderCgi.createJxzpOrder(options, function(ret) {
			if (ret.errCode != 0) {
				showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var orderNo = trim(data.orderNo);
			var payUrl = trim(data.payUrl);
			if (orderNo) {
				if (payUrl) {
					setTimeout(function() {
						common.locationUrl(payUrl);
					}, 1000);
				} else {
					ui.showNotice('解锁成功');
					setTimeout(function() {
						getJxzpInfo();
					}, 1000);
				}
			} else {
				showNotice("支付失败");	
			}
		});
	}
	
	function getJxzpInfo() {
		var tabItem = $("#jxzpTypeBox [jxzpType].active").eq(0);
		var type = parseInt(tabItem.attr("jxzpType"));
		var options = {
			matchId: matchId,
			type: type
		}
		jxzpCgi.getJxzpInfo(options, function(ret) {
			if (ret.errCode == 2) {
				$('#jxzpTypeBox').hide();
				$("#unclockJxzp").show();
				$("#buyJxzp").off().on('click',function() {
					createJxzpOrder();
				});
			} else if (ret.errCode == 0) {
				$("#unclockJxzp").hide();
				$('#jxzpTypeBox').show();
				var jxzp = ret.data || {};
				var showJxzp = Object.keys(jxzp).length > 0;
				var data = {
					jxzp: jxzp,
					IMG_PATH: IMG_PATH,
					showJxzp: showJxzp
				};
				$("#jxzpInfo").html(hotMatchDetailView.jxzpInfo(data));
			} else {
				ui.showNotice(ret.msg);
			}
		})
	}
	
	function payCombo(comboNo, amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看晒米冷热<br>(1粒米=1元)", function sure() {
			var options = {
				comboNo: comboNo
			}
			orderCgi.createComboOrder(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var orderNo = trim(data.orderNo);
				var payUrl = trim(data.payUrl);
				if (orderNo) {
					if (payUrl) {
						setTimeout(function() {
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl("#smlrList");
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			
		});
	}
	
	function getMatchAnalyseList() {
		var options = {
			matchId: matchId
		}
		matchAnalyseCgi.getMatchAnalyseList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var analyse = ret.data || {};
			var data = {
					analyse: analyse,
					Object: Object,
					Math: Math,
					type: type,
					IMG_PATH: IMG_PATH
				};
			$("#tabContent1").html(hotMatchDetailView.analyzeWrap(data));
			var againstBtn = $("#againstSwitchBtn span");
			againstBtn.off().on("click", function() {
				againstBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".against_msg").hide();
				$("#against" + value).show();
			})
			againstBtn.eq(0).click();
			var HistoryHomeBtn = $("#homeHistorySwitchBtn span");
			HistoryHomeBtn.off().on("click", function() {
				HistoryHomeBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".history_home_msg").hide();
				$("#home" + value + "history").show();
			})
			HistoryHomeBtn.eq(0).click();
			var HistoryAwayBtn = $("#awayHistorySwitchBtn span");
			HistoryAwayBtn.off().on("click", function() {
				HistoryAwayBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".history_away_msg").hide();
				$("#away" + value + "history").show();
			})
			HistoryAwayBtn.eq(0).click();
		})
	}
	
	function setOddsType() {
		var oddsTypeItem = $("#oddsBox [oddsType]");
		oddsTypeItem.off().on("click", function(e) {
			oddsTypeItem.removeClass('active');
			$(this).addClass('active');
			var oddsType = trim($(this).attr("oddsType"));
			$('#oddsWrap,#oddsContent1,#oddsContent2').hide();
			pageNum = 1;
			pageSize = 8;
			if (oddsType == 1 || oddsType == 2 || oddsType == 3) {
				$("#oddsWrap").show();
//				getMatchOddsAnalyseList('',oddsType);
				getMatchOddsAnalyseList.call($('#oddsWrap'),'',oddsType);
			} else if (oddsType == 4) {
				$("#oddsContent1").show();
				getSmlrInfo();
			} else if (oddsType == 5) {
				$("#oddsContent2").show();
				setJxzpType();
			}
		});
		oddsTypeItem.eq(0).click();
	}
	
	function getMatchOddsAnalyseList(append,oddsType) {
		main.unsetScrollLoad();
		oddsType = oddsType || 1;
		append = append;
		var options = {
			matchId: matchId,
			type: oddsType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		matchAnalyseCgi.getMatchOddsAnalyseList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var matchOdds = ret.data && ret.data.list || [];;
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(
					function() {
						pageNum++
						getMatchOddsAnalyseList(true,oddsType)
					}
				);
			}
			var data = {
				matchOdds: matchOdds,
				oddsType: oddsType
			};
			if (append != '') {
				$("#oddsWrap").append(hotMatchDetailView.oddsWrap(data));
			} else {
				$("#oddsWrap").html(hotMatchDetailView.oddsWrap(data));
			}
		}, function() {
			main.setScrollLoad(
				function() {
					pageNum++
					getMatchOddsAnalyseList(true,oddsType)
				}
			);
		})
	}
	
	function footballScoreUpdate() {
		var url = "//i.sporttery.cn/api/match_live_2/get_match_updated";
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
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;-&nbsp;'+trueTimeSocreA).show();
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
				$("#teamBox .basketballHome").each(function (i, item) {
					var basketballHome = trim($(this).text().replace('(主)',''));
					var sportteryMatchId = $("#teamBox").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$("#teamBox .basketballAway").each(function (i, item) {
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
					for (var j = 0, len = basketballHomeMap.length; j < len; j++) {
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
});