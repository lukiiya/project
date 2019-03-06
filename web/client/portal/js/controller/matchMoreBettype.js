define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchMoreBettypeView = require('view/matchMoreBettype');
	var type = null;
	var match = null;
	var self = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 0;
		self = trim(common.getUrlParam("self")) || false;
		if (isNaN(type) || type <= 0 || (type != 1 && type != 2)) {
			ui.showNotice("赛事类型有误");
			setTimeout(function () {
				common.locationUrl('#editPlan');
			}, 1000);
			return;
		}
		if (!window.matchSelectBettype) {
			if (self) {
				common.locationUrl('#match&self=' + self);
			} else {
				common.locationUrl('#match');
			}
			return;
		}
		match = window.matchSelectBettype.curMatch;
		if (self) {
			common.setHistoryBack('#match&self=' + self + '&type=' + type);
		} else {
			common.setHistoryBack('#match&type=' + type);
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		match = null;
		self = null;
	}

	function setMain(view) {
		var home = (match.home || "").substr(0, 5);
		var away = (match.away || "").substr(0, 5);
		var title = home + " VS " + away;
		if (type == 2) {
			title = away + " VS " + home + "(主)";
		}
		var options = {
			title: title,
			className: 'moreGame',
			showHeader: true,
			rightButtonText: '确定',
			rightButtonFun: selectSubmit
		}
		var data = {
			match: match
		}
		main.setMain(view, options);
		if (type == 1) {
			main.setContent(matchMoreBettypeView.football(data));
		} else if (type == 2) {
			main.setContent(matchMoreBettypeView.basketball(data));
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
			var bettypeContent = $(curMatchBettype).attr("bettypeContent");
			if (self) {
				if (className.indexOf('active') == -1  && activeTd.length >= 6) {
					ui.showNotice('同种玩法最多选择6个');	
					return;
				} 
			} else {
				if (type == 2 && !bettypeContent) {
					if (className.indexOf('active') == -1  && activeTd.length >= 1) {
						ui.showNotice('胜负或大小分玩法最多选择一个');	
						return;
					}
				} else {
					if (className.indexOf('active') == -1  && activeTd.length >= 3) {
						ui.showNotice('同种玩法最多选择三个');	
						return;
					} 
				}
			}
			matchBettype.each(function(i, item) {
				if (curMatchBettype != item) {
					$(item).find("td").removeClass("active");
				}
			});
			$(this).toggleClass("active");
		});
	}

	function setContent() {

	}

	function selectSubmit() {
		var matchId = parseInt(match.matchId);
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var matchBettypeJq = $(".matchBettype:has(td.active)");
		var length = matchBettypeJq.length;
		if (length <= 0) {
			ui.showNotice("请选择一种玩法");
			return;	
		}
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
		window.matchSelectBettype.selectMatch[matchId] = {
			oddsId: oddsId,
			recommend: recommend
		};
		if (self) {
			common.locationUrl('#match&self=' + self + '&type=' + type);
		} else {
			common.locationUrl('#match&type=' + type);
		}
	}

	//高亮选择玩法
	function activeSelectBettype() {
		var matchId = parseInt(match.matchId);
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var selectMatch = window.matchSelectBettype.selectMatch || {};
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
	}
});