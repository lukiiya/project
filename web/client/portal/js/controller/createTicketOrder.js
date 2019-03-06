define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var matchCgi = require('cgi/match');
	var createTicketOrderView = require('view/createTicketOrder');
	var planNo = null;
	var matchList = null;
	var selfTicket = null;
	var type = null;
	var tab = null;
	var orderNo = null;

	function init(view) {
		planNo = trim(common.getUrlParam("planNo")) || "";
		selfTicket = trim(common.getUrlParam("selfTicket"));
		type = parseInt(common.getUrlParam("type"));
		tab = parseInt(common.getUrlParam("tab"));
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		setMain(view);
		setContent();
	}

	function _init(view) {
		planNo = null;
		matchList = null;
		selfTicket = null;
		type = null;
		tab = null;
		orderNo = null;
	}

	function setMain(view) {
		var titleBtn = !!planNo;
		var options = {
			title: titleBtn == true ? "跟单投注" : '投注',
			className: 'bet',
			showHeader: true,
//			isLeftIconHeader: titleBtn == true ? false: true,
			rightButtonText: '奖金优化',
			rightButtonFun: optimizeBonus
		}
		main.setMain(view, options);
	}

	function setContent() {
		if (planNo) {
			getPlanInfo();
		} else if (orderNo) {
			getTicketOrderInfo()
		} else {
			getMatchRecommend()
		}
	}
	
	function getPlanInfo() {
		if (!planNo) {
			return;
		}
		var options = {
			needUser: true,
			planNo: planNo
		}
		planCgi.getPlanInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var plan = ret.data || {};
			matchList = plan.matchList || [];
			var data = {
				IMG_PATH: IMG_PATH,
				plan: plan
			}
			main.setContent(createTicketOrderView.content(data));
			setTicketMultiple(plan.amount);
			setPassType();
			hideOptimizeBtn();
			$('#userVerifyProtocol').on('click', function () {
				common.locationUrl("#userVerifyProtocol&type=3");
			})
			$('#createTicketSubmit').on('click', createTicketSubmit);
		});
	}
	
	function getTicketOrderInfo() { //继续投注
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			matchList = ticketOrder.matchList || [];
			var data = {
				ticketOrder: ticketOrder,
				IMG_PATH: IMG_PATH
			}
			main.setContent(createTicketOrderView.content(data));
			setTicketMultiple(ticketOrder.amount);
			setPassType();
			hideOptimizeBtn();
			$('#createTicketSubmit').on('click', createTicketSubmit);
		}); 
	}
	
	function getMatchRecommend() {
		if (!window.editSelfSelectMatch) {
			common.historyBack();
			return;
		}
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (selfTicket) {
				window.matchSelectBettype = getMatchSelectBettype();
			} else {
				window.signleSelectBettype = getMatchSelectBettype();
			}
		});
		var matchRecommend = [];
		var length = window.editSelfSelectMatch.length;
		for (var i = 0; i < length; i++) {
			var matchSelect = window.editSelfSelectMatch[i] || {}
			var match = matchSelect.match || {}
			var matchId;
			if (selfTicket) {
				matchId = match.matchId
			} else {
				matchId = matchSelect.matchId
			}
			var odds = matchSelect.odds || {};
			var oddsId = odds.oddsId || 0;
			var recommend = matchSelect.recommend || [];
			matchRecommend.push({matchId: matchId, oddsId: oddsId, recommend: recommend});
		}
		matchRecommend = JSON.stringify(matchRecommend);
		var options = {
			matchRecommend: matchRecommend
		}
		if (type == 3) {
			options.needYaPan = true
		}
		matchCgi.getMatchRecommend(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var self = ret.data || {};
			matchList = self.matchList || [];
			var data = {
				self: self
			}
			if (selfTicket) {
				common.setHistoryBack("#match&self=true" + "&type=" + type + "&tab=" + tab);
			} else {
				common.setHistoryBack("#hotMatchDetail&matchId="+ matchId + "&type=" + matchList[0].type + "&tab=5");
			}
			main.setContent(createTicketOrderView.content(data));
			setTicketMultiple();
			setPassType();
			hideOptimizeBtn();
			$('#userVerifyProtocol').on('click', function () {
				common.locationUrl("#userVerifyProtocol&type=3");
			})
			$('#createTicketSubmit').on('click', createTicketSubmit);
		})
	}
	
	function setTicketMultiple(amount) {
		var ticketMultiple = 10;
		if (amount) {
			var planAmount = parseInt(amount/100);
			if (planAmount == 18) {
				ticketMultiple = 20;
			} else if (planAmount == 28) {
				ticketMultiple = 30;
			} else if (planAmount == 38) {
				ticketMultiple = 40;
			} else if (planAmount == 58) {
				ticketMultiple = 50;
			} else if (planAmount == 88) {
				ticketMultiple = 100;
			}
		}
		$("#ticketMultiple").val(ticketMultiple);
		$('#ticketMultiple'+ticketMultiple).addClass("active");
		var ticketMultipleIcon = $('#ticketMultiple10,#ticketMultiple100,#ticketMultiple1000');
		$("#ticketMultiple").on('input', function() {
			var ticketMultiple = parseInt(this.value) || 0;
			ticketMultipleIcon.removeClass("active");
			$('#ticketMultiple'+ticketMultiple).addClass("active");
			setTicketAmount();
		});
		ticketMultipleIcon.on("click", function() {
			var ticketMultiple = parseInt(this.id.replace(/\D/g, '')) || 0;
			if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
				return;
			}
			$("#ticketMultiple").val(ticketMultiple).trigger('input');//触发一次input事件
		});
	}

	function setPassType() {
		if (!matchList) {
			return;
		}
		var matchLength = matchList.length;
		if (matchLength <= 0) {
			return;
		}
		//设置过关方式
		var singleSale = [];
		var html = [];
		for (var i = 0; i < matchLength; i++) {
			var match = matchList[i];
			match.single == 1 && singleSale.push(match.single);
			var passType = i + 1;
			var text = passType == 1 ? '单关' : passType + '串1';
			html.push('<span class="'+ (passType == matchLength ? 'active' : '') +'" passType="' + passType + 'x1">'+ text + '</span>');
		};
		//不是全部可以"单关"销售，删除单关
		if (singleSale.length != matchLength) {
			html.shift();
		} 
		$('#passTypeBox').html(html.join(''));
		$('#passTypeBox span').on('click', function() {
			$(this).toggleClass('active');
			activePassType();
		});	
		//设置选择过关方式
		$('#passTypeBtn').on('click', function() {
			var passTypeBox = $("#passTypeBox");
			var passTypeIcon = $("#passTypeIcon");
			passTypeBox.slideToggle();
			var isClose = /icon_select_down/.test(passTypeIcon.attr('class'));
			passTypeIcon.attr('class', 'select_triangle icon_select_down');
			if (isClose) {
				passTypeIcon.attr('class', 'select_triangle icon_select_up')
			}
		});
		activePassType();
	}
	
	function activePassType() {
		var activePassType = $('#passTypeBox span.active');
		var selectPassType = [];
		activePassType.each(function (i, item) {
			selectPassType.push(trim(item.innerHTML));
		});
		if (selectPassType.length > 1) {
			$("#passTypeIcon").hide();
		} else {
			$("#passTypeIcon").show();
		};
		$('#passTypeText').html(selectPassType.join(','));
		setTicketAmount();
	}

	function getActivePassType() {
		var passType = [];
		$('#passTypeBox span.active').each(function (i, item) {
			var p = trim($(item).attr('passType'));
			if (/^\d+x1$/.test(p)) {
				passType.push(p);
			}
		});
		return passType;
	}
	
	function setTicketAmount() {
		if (!matchList) {
			return;
		}
		var matchLength = matchList.length;
		if (matchLength <= 0) {
			return;
		}
		var passType = getActivePassType();
		var countUnit = 0;
		var oddsMap = {};
		for (var i = 0, length = passType.length; i < length; i++) {
			var p = trim(passType[i]) || '';
			var num = parseInt(p.replace(/x1$/, ""));
			if (isNaN(num) || num <= 0 || num > 8 || num > matchLength) {
				ui.showNotice('过关方式异常');
				return;
			}
			var zhArr = common.ZH(matchList, num) || [];
			if (zhArr.length <= 0) {
				ui.showNotice('过关方式异常');
				return;
			}
			if (!oddsMap[p]) {
				oddsMap[p] = [];
			}
			for (var j = 0, len = zhArr.length; j < len; j++) {
				var matchArr = zhArr[j];
				var odds = 1;
				var unit = 1;
				for (var k = 0, l = matchArr.length; k < l; k++) {
					var m = matchArr[k] || {};
					var matchId = m.matchId || 0;
					var oddsId = m.oddsId || 0;
					var bettypeOdds = m.bettypeOdds || {};
					var recommend = m.recommend || [];
					var recommendLength= recommend.length;
					if (matchId <= 0 || oddsId <= 0 || recommendLength <= 0) {
						ui.showNotice('比赛信息异常');
						return;
					}
					unit *= recommendLength;
					var recommendOdds = [];
					for (var x = 0; x < recommendLength; x++) {
						var ro = parseFloat(bettypeOdds[recommend[x]]);
						if (isNaN(ro) || ro <= 0) {
							ui.showNotice('比赛赔率异常');
							return;
						}
						recommendOdds.push(ro);	
					}
					var maxOdds = Math.max.apply(null, recommendOdds);
					odds *= maxOdds;
				}
				countUnit += unit;
				oddsMap[p].push(odds);
			}
		};
		var ticketMultiple = parseInt($('#ticketMultiple').val()) || 0;
		var ticketAmount = ticketMultiple*countUnit*2;
		$("#countUnit").html("共" + countUnit + '注 ' + ticketMultiple + '倍 ');
		$("#ticketAmount").html(ticketAmount + "元");
		var maxPrize = 0;
		for (var key in oddsMap) {
			var arr = oddsMap[key] || [];
			for (var i = 0, length = arr.length; i < length; i++) {
				var odds = parseFloat(arr[i]) || 0;
				if (isNaN(odds) || odds <= 0) {
					ui.showNotice('比赛赔率异常');
					return;
				}
				var sp = common.round(odds * 2, 2);
				var prize = sp * ticketMultiple;
				maxPrize += prize;
			}
		}
		$("#maxPrize").html("理论最大奖金：" + maxPrize.toFixed(2));
	}

	function createTicketSubmit() {
		var protocol = $('#protocol')[0].checked;
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var planAmount = parseInt($(this).attr("planAmount")/100);
		var ticketPassType = getActivePassType();
		if (!protocol) {
			ui.showNotice("请阅读并同意代购协议");
			return;	
		}
		if (ticketPassType.length <= 0) {
			ui.showNotice("请选择过关方式");
			return;	
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			ui.showNotice('总金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			ui.showNotice('请输入正整倍数');
			return;
		}
		if (planNo) {
			if (ticketMultiple < 10) {
				ui.showNotice('投注倍数最小为10，请重新输入');
				return;
			} else if (planAmount == 18 && ticketMultiple < 20) {
				ui.showNotice('跟单此方案最低20倍');
				return;
			} else if (planAmount == 58 && ticketMultiple < 50) {
				ui.showNotice('跟单此方案最低50倍');
				return;
			} else if (planAmount == 88 && ticketMultiple < 100) {
				ui.showNotice('跟单此方案最低100倍');
				return;
			}
		}
		if (ticketMultiple > 100000) {
			ui.showNotice('您输入的倍数过大，请重新输入');
			return;
		}
//		ui.showConfirm("需支付" + ticketAmount + "元", function sure() {
			var options = {};
			var cgi = function () {};
			if (planNo) {
				options = {
					ticketMultiple: ticketMultiple,
					planNo: planNo,
					ticketPassType: ticketPassType
				}
				cgi = orderCgi.createTicketOrder;
			} else {
				var matchRecommend = [];
				var lotteryId = '';
				if (type == 3) {
					lotteryId = 'JZYP'
				}
				for (var i = 0; i < matchList.length; i++) {
					var matchId = matchList[i].matchId;
					var oddsId = matchList[i].oddsId || 0;
					var recommend = matchList[i].recommend || [];
					var matchType = matchList[i].type;
					matchRecommend.push({matchId: matchId, oddsId: oddsId, recommend: recommend});
				}
				matchRecommend = JSON.stringify(matchRecommend);
				options = {
					ticketMultiple: ticketMultiple,
					matchRecommend: matchRecommend,
					ticketPassType: ticketPassType,
					matchType: matchType,
					lotteryId: lotteryId
				}
				cgi = orderCgi.createSelfTicketOrder;
			}
			cgi(options, function(ret) {
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
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
//		}, function cancel() {
//
//		});
		window.editSelfSelectMatch = null;
	}
	
	//高亮选择
	function getMatchSelectBettype() {
		var selectMatch = null;
		var selectMatchItem = window.editSelfSelectMatch || []
		$.each(selectMatchItem, function(i, item) {
			var match = item.match || {};
			var odds = item.odds || {};
			var recommend = item.recommend || [];
			var matchId;
			if (selfTicket) {
				matchId = match.matchId || 0;
			} else {
				matchId = item.matchId || 0;
			}
			var oddsId = odds.oddsId || 0;
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommend.length <= 0) {
				return;
			}
			if (!selectMatch) {
				selectMatch = {};
			}
			selectMatch[matchId] = {
				oddsId: oddsId,
				recommend: recommend	
			}
		});
		return selectMatch && {selectMatch: selectMatch} || null;
	}
	
	function optimizeBonus() {//奖金优化
		var optimizeMatch = [];
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketPassType = getActivePassType();
		if (ticketPassType.length > 1) {
			ui.showNotice('奖金优化暂不支持混合过关方式');
			return
		}
		if (matchList.length > 1 && ticketPassType[0] == '1x1') {
			ui.showNotice('奖金优化不支持多串单关');
			return
		}
		if (ticketPassType.length <= 0) {
			ui.showNotice('请选择过关方式');
			return
		}
		optimizeMatch.push({
			matchList: matchList,
			ticketAmount: ticketAmount,
			ticketPassType: ticketPassType
		})
		window.editOptimizeMatch = optimizeMatch;
		common.locationUrl("#bonusOptimize");
	}
	
	function hideOptimizeBtn() { //隐藏奖金优化按钮  篮球、2串1以上、胜平负都选，
		var recommendLength = 0;
		var length = matchList.length;
		$.each(matchList, function(i, item) {
			var recommend = item.recommend || [];
			var matchId = item.matchId || 0;
			var oddsId = item.oddsId || 0;
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommend.length <= 0) {
				return;
			}
			recommendLength += recommend.length;
		});
		if (type == 2 || type == 3 || length > 2 || (length == 1 && recommendLength > 2) || (length == 2 && recommendLength > 5)) {
			$("#pageHeader .rightIcon_top").hide();
		}
	}
})