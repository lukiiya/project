define(function(require, exports) {
	
	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var matchCgi = require('cgi/match');
	var editJxzpView = require('view/editJxzp');
	var jxzpId = null;

	function init(view) {
		jxzpId = parseInt(common.getUrlParam("jxzpId")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		jxzpId = null;
	}

	function setMain(view) {
		var options = {
			title: "新增极限数据",
			className: 'newData'
		}
		main.setMain(view, options);
		main.setContent(editJxzpView.content());
		$("#type").on('change', function(e) {
			var value = parseInt(this.value) || 0;
			var html = [];
			html.push('<option value="0">请选择</option>');
			if (value == 1) {
				html.push('<option value="1">连胜</option>');
				html.push('<option value="2">连平</option>');
				html.push('<option value="3">连负</option>');
			} else if (value == 2) {
				html.push('<option value="1">连赢盘</option>');
				html.push('<option value="2">连输盘</option>');
			} else if (value == 3) {
				html.push('<option value="1">大球</option>');
				html.push('<option value="2">小球</option>');
			}
			$('#status').html(html.join(""));
		});
		$('#matchList').on('click', getMatchList);
		$('#editSubmit').on('click', editSubmit);
	}


	function setContent() {
		getJxzpInfo();
	}

	function getJxzpInfo() {
		if (isNaN(jxzpId) || jxzpId <= 0) {
			$('#title').html('新增极限数据');
			return;
		}
		$('#title').html('修改极限数据');
		var options = {
			jxzpId: jxzpId
		}
		jxzpCgi.getJxzpInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var jxzpId = parseInt(data.jxzpId) || 0;
			var type = parseInt(data.type) || 0;
			var teamName = trim(data.teamName);
			var status = parseInt(data.status) || 0;
			var recentContinue = parseInt(data.recentContinue) || 0;
			var historyContinue = parseInt(data.historyContinue) || 0;
			var recentContinue = parseInt(data.recentContinue) || 0;
			var oddsId = parseInt(data.oddsId);
			var bettypeContent = trim(data.bettypeContent);
			var bettypeOdds = trim(data.bettypeOdds);
			var concede = parseInt(data.concede);
			var recommend = trim(data.recommend) || '';
			$('#jxzpId').val(jxzpId);
			$('#type').val(type).trigger('change');
			$('#teamName').val(teamName);
			$('#status').val(status);
			$('#recentContinue').val(recentContinue);
			$('#historyContinue').val(historyContinue);
			data.bettype = {};
			data.bettype[bettypeContent] = {
				oddsId: oddsId,
				bettypeOdds: bettypeOdds,
				bettypeOddsJson: JSON.parse(bettypeOdds),
				concede: concede,
				recommend: recommend.split(',')
			}
			$("#matchList").html(editJxzpView.selectMatch({
				match: data || null
			}));
		});
	}

	function getMatchList() {
		var type = parseInt($('#type').val()) || 0;
		if (isNaN(type) || type <= 0) {
			ui.showNotice("请选择玩法");
			return;
		}
		var options = {
			needSale: true
		}
		matchCgi.getMatchList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var matchMap = {};
			$.each(list, function(i, item) {
				var saleTime = trim(item.saleTime);
				var matchId = parseInt(item.matchId);
				var oddsId = parseInt(item.oddsId);
				var number = trim(item.number);
				var league = trim(item.league);
				var home = trim(item.home);
				var away = trim(item.away);
				var beginTime = trim(item.beginTime);
				var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
				var bDate = common.formatDate(beginTimeOb, 'MM-DD');
				var bTime = common.formatDate(beginTimeOb, 'HH:II');
				var bettypeContent = trim(item.bettypeContent);
				item.concede = item.concede > 0 ? '+'+item.concede : item.concede;
				item.bettypeOddsJson = JSON.parse(item.bettypeOdds);
				if (saleTime == "" || matchId <= 0) {
					return;
				}
				saleTime = common.formatDate(new Date(saleTime.replace(/-/g, '/')), 'YYYY-MM-DD（周W）');
				if (!matchMap[saleTime]) {
					matchMap[saleTime] = {};
				}
				if (!matchMap[saleTime][matchId]) {
					matchMap[saleTime][matchId] = {
						number: number,
						league: league,
						home: home,
						away: away,
						beginTime: beginTime,
						bDate: bDate,
						bTime: bTime,
						bettype: {}
					}
				}
				matchMap[saleTime][matchId]['bettype'][bettypeContent] = item
			});
			var data = {
				type: type,
				Object: Object,
				matchMap: matchMap
			}
			var options = {
				html: editJxzpView.matchList(data)
			}
			ui.showWindow(options);
			var matchContentTr = $("#windowBox .matchContentTr");
			var matchContentTrTd = matchContentTr.find("td");
			matchContentTrTd.on('click', function(e) {
				var curMatchContentTr = this.parentNode;
				matchContentTr.each(function(i, item) {
					if (curMatchContentTr != item) {
						$(item).find("td").removeClass("active");
					}
				});
				$(this).toggleClass("active");
			});
			//总进球选择
			var matchBettype = $('#windowBox .matchBettype');
			var matchBettypeTd = matchBettype.find("td[recommend]");
			matchBettypeTd.on('click', function(e) {
				var className = trim(this.className);
				var curMatchBettype = $(this).parents('.matchBettype')[0];
				var activeTd = $(curMatchBettype).find("td.active");
				if (className.indexOf('active') == -1  && activeTd.length >= 3) {
					ui.showNotice('同种玩法最多选择三个');	
					return;
				}
				matchBettype.each(function(i, item) {
					if (curMatchBettype != item) {
						$(item).find("td").removeClass("active");
					}
				});
				$(this).toggleClass("active");
			});
			var matchDate = $("#windowBox .matchDate");
			var matchContent = $("#windowBox .matchContent");
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
			$('#matchListCancel').on('click', ui.closeWindow);
			$('#matchListSure').on('click', matchListSure);
		});
	}

	function matchListSure() {
		var matchableJq = $("#windowBox td.active").parents("table");
		var matchList = [];
		matchableJq.each(function(i, item) {
			var matchId = parseInt($(item).attr("matchId"));
			var league = trim($(item).attr("league"));
			var home = trim($(item).attr("home"));
			var away = trim($(item).attr("away"));
			var beginTime = trim($(item).attr("beginTime"));
			var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
			if (matchId <= 0) {
				return;
			}
			var match = {
				matchId: matchId,
				league: league,
				home: home,
				away: away,
				beginTime: beginTime,
				bettype: {}
			}
			var tdJq = $(item).find("td.active");
			tdJq.each(function(i, item) {
				var oddsId = parseInt($(item.parentNode).attr("oddsId"));
				var bettypeContent = trim($(item.parentNode).attr("bettypeContent"));
				var bettypeOdds = trim($(item.parentNode).attr("bettypeOdds"));
				var concede = parseInt($(item.parentNode).attr("concede"));
				var recommend = trim($(item).attr("recommend"));
				if (oddsId <= 0 || !bettypeContent || !bettypeOdds || !recommend) {
					return;
				}
				if (!match['bettype'][bettypeContent]) {
					match['bettype'][bettypeContent] = {
						oddsId: oddsId,
						bettypeOdds: bettypeOdds,
						bettypeOddsJson: JSON.parse(bettypeOdds),
						concede: concede,
						recommend: [],
						bettypeContent: bettypeContent
					};	
				}
				match['bettype'][bettypeContent].recommend.push(recommend);
			});
			matchList.push(match);
		});
		if (matchList.length <= 0) {
			ui.showNotice("请选择一场比赛");
			return;	
		}
		var match = matchList[0] || null;
		var data = {
			match: match
		}
		if (match) {
			var home = trim(match.home);
			var away = trim(match.away);
			$('#teamName').val(home + ' ' + away);
		}
		$("#matchList").html(editJxzpView.selectMatch(data));
		ui.closeWindow();
	}

	function editSubmit() {
		var jxzpId = parseInt($('#jxzpId').val()) || 0;
		var type = parseInt($('#type').val()) || 0;
		var teamName = trim($("#teamName").val()) || '';
		var matchId = parseInt($('#matchId').val()) || 0;
		var oddsId = parseInt($('#oddsId').val()) || 0;
		var recommend = trim($("#recommend").val()) || '';
		var status = parseInt($('#status').val()) || 0;
		var recentContinue = parseInt($('#recentContinue').val()) || 0;
		var historyContinue = parseInt($('#historyContinue').val()) || 0;
		if (type <= 0) {
			ui.showNotice("请选择玩法");
			return;
		}
		if (!teamName) {
			ui.showNotice("请填写队名");
			return;
		}
		if (matchId <= 0 || oddsId <= 0 || !recommend) {
			ui.showNotice("请选择赛事");
			return;
		}
		if (status <= 0) {
			ui.showNotice("请选择近期状态");
			return;
		}
		if (recentContinue <= 0) {
			ui.showNotice("请填写正确的近期场数");
			return;
		}
		if (historyContinue <= 0) {
			ui.showNotice("请填写正确的历史场数");
			return;
		}
		var cgi = function() {};
		var data = {
			type: type,
			teamName: teamName,
			matchId: matchId,
			oddsId: oddsId,
			recommend: recommend,
			status: status,
			recentContinue: recentContinue,
			historyContinue: historyContinue
		};
		if (jxzpId > 0) {
			data.jxzpId = jxzpId;
			cgi = jxzpCgi.modifyJxzp;
		} else {
			cgi = jxzpCgi.createJxzp;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (jxzpId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			setTimeout(function() {
				common.locationUrl('#jxzpList');
			}, 1000);
		});
	}
});