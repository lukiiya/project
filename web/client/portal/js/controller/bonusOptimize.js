define(function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var bonusOptimizeView = require('view/bonusOptimize');
	var tab = null;
	var vm = null;
	var totalAmount = null;
	var qarr = null;

	function init(view) {
		if (!window.editOptimizeMatch) {
			common.locationUrl('#myBet');
			return;
		}
		totalAmount = window.editOptimizeMatch[0].ticketAmount;
		setMain(view);
		setContent();
	}

	function _init(view) {
		vm && vm.$destroy();
		tab = null;
		vm = null;
		totalAmount = null;
		qarr = null;	
	}

	function setMain(view) {
		var options = {
			title: "奖金优化",
			className: 'bonusOptimize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		main.setContent(bonusOptimizeView.content());
	}

	function setContent() {
		setTab();
	}
	
	function setTab() {
		var tabList = $('#optimizeTab div');
		tabList.on('click', function(e){
			tabList.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr('tab')) || 1;
			getMatchList();
		});
		//默认选中
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('tab')) || 0;
			if (tab == t) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		tabList.eq(tabIndex).click();
	}
	
	function getMatchList() {
		var matchList = window.editOptimizeMatch[0].matchList;
		var splitMatch = []; //所有比赛选项
		for (var i = 0, len = matchList.length; i < len; i++) {
			var m = matchList[i] || {};
			var matchId = m.matchId || 0;
			var oddsId = m.oddsId || 0;
			var number = m.number;
			var bettypeContent = m.bettypeContent;
			var bettypeOdds = m.bettypeOdds || {};
			var bettypeValue = m.bettypeValue || {};
			var recommend = m.recommend || [];
			var recommendLength= recommend.length;
			var singleMatch = []; //单个比赛选项
			if (matchId <= 0 || oddsId <= 0 || recommendLength <= 0) {
				ui.showNotice('比赛信息异常');
				return;
			}
			for (var j = 0; j < recommendLength; j++) {
				var ro = parseFloat(bettypeOdds[recommend[j]]).toFixed(2);
				var bettype = bettypeValue[recommend[j]];
				var singleMatchMap = {
					matchId: matchId,
					oddsId: oddsId,
					number: number,
					bettypeContent: bettypeContent,
					odd: ro,
					recommend: recommend[j],
					bettype: bettype
				};
				if (isNaN(ro) || ro <= 0) {
					ui.showNotice('比赛赔率异常');
					return;
				}
				singleMatch.push(singleMatchMap);
			}
			splitMatch.push(singleMatch);
		}
		//比赛选项组合
		var sarr = [[]];
		for (var i = 0; i < splitMatch.length; i++) {
           var tarr = [];
           for (var j = 0; j < sarr.length; j++) {
               for (var k = 0; k < splitMatch[i].length; k++){
                   tarr.push(sarr[j].concat(splitMatch[i][k]));
               }
           }
           sarr = tarr;
      	}
		//每注比赛数据
       	var singleOddArr = [];
       	var totalOdd = 1; //所有赔率乘积
       	var maxPrize = 0; //最大理论奖金
       	qarr = [];
		for (var i = 0; i < sarr.length; i++) {
           var singleOdd = 1; //每注赔率
           var itemObj = {};
           for (var j = 0; j < sarr[i].length; j++) {
               singleOdd *= sarr[i][j].odd
               singleOdd = parseFloat(singleOdd);
           }
		   totalOdd *= singleOdd;
		   itemObj.options = sarr[i]; //每注选项
		   itemObj.singleOdd = singleOdd;
		   singleOddArr.push(singleOdd);
		   qarr.push(itemObj);
     	}
		qarr.sort(function(a,b) { //从小到大排序
			return a.singleOdd-b.singleOdd
		});
		var countBetPrize = function() { //计算投注金额
			var denominator; //分母
			var totalUnit = totalAmount/2; //总注数
			var maxPrizeArr = [];
	       	var unit = 0; //每项注数
	       	var exceptSum = 0;
	       	var unitAmountSum = 0; //用来计算误差
			if (sarr.length > 2) {
	       	 	denominator = 1;
	       	} else {
	       		denominator = 0;
	       	}
	       	for (var i = 0; i < singleOddArr.length; i++) { //计算分母
	       		if (sarr.length > 2) {
	           		denominator += (totalOdd/singleOddArr[i]);
	          	} else {
	           		denominator += singleOddArr[i];
	          	}	          	
	       	}
	       	for (var i = 0; i < qarr.length; i++) {
	       		var item = qarr[i];
	       		var singleOdd = item.singleOdd;
	       		if (tab == 1) { //平均优化
	       			if (qarr.length == 1) {
		       			item.unitAmount = totalAmount;
		       		} else {
		       			item.unitAmount = Math.round(((totalUnit*totalOdd)/singleOdd)/denominator)*2;
		       		}
		       		unitAmountSum += item.unitAmount
	       		} else if (tab == 2) { //搏热优化
	       			if (qarr.length == 1) {
		       			item.unitAmount = totalAmount;
		       		} else {
		       			qarr[0].unitAmount = 2
		       			if (i != 0) {
		       				unit = Math.ceil(totalUnit/singleOdd);
							exceptSum += unit;
							item.unitAmount = unit*2;
		       			} 
	       			}
	       		} else if (tab == 3) { //博冷优化
	       			if (qarr.length == 1) {
		       			item.unitAmount = totalAmount;
		       		} else {
		       			if (i != qarr.length - 1) {
		       				unit = Math.ceil(totalUnit/singleOdd);
							exceptSum += unit;
							item.unitAmount = unit*2;
		       			}
		       			qarr[qarr.length - 1].unitAmount = 2
	       			}
	       		}
	       		item.theoryPrize = (item.unitAmount*singleOdd).toFixed(2); //每注理论奖金
	       		if (isNaN(item.theoryPrize)) {
	       			item.theoryPrize = 0
	       		}
	       		maxPrizeArr.push(item.theoryPrize);
	       	};
	       	if (tab == 1) { //解决误差
	       		if (unitAmountSum != totalAmount) {
	       			var erroNum = unitAmountSum - totalAmount;
	       			if (qarr[0].unitAmount > Math.abs(erroNum) && !isNaN(qarr[0].unitAmount)) {
	       				qarr[0].unitAmount -= erroNum;
	       				qarr[0].theoryPrize = (qarr[0].unitAmount*qarr[0].singleOdd).toFixed(2);
	       			}
	       		}
	       	} else if (tab == 2) { //计算最小赔率注数
	       		var first = qarr[0];
	       		first.unitAmount = (totalUnit - parseInt(exceptSum))*2;
				if (first.unitAmount <= 0) {
					totalAmount -= first.unitAmount - 2;
					first.unitAmount = 2; 
				}
				first.theoryPrize = (first.unitAmount*first.singleOdd).toFixed(2);
				maxPrizeArr.push(first.theoryPrize);
	       	} else if (tab == 3) { //计算最大赔率注数
	       		var last = qarr[qarr.length - 1]; 
				last.unitAmount = (totalUnit - parseInt(exceptSum))*2;
				if (last.unitAmount <= 0) {
					totalAmount -=  last.unitAmount - 2;
					last.unitAmount = 2; 
				}
				last.theoryPrize = (last.unitAmount*last.singleOdd).toFixed(2);
				maxPrizeArr.push(last.theoryPrize);
	       }
	       	maxPrize = Math.max.apply(null, maxPrizeArr); //最大理论奖金
		};
		countBetPrize();
		var data = {
			matchList: qarr,
			totalAmount: totalAmount,
			maxPrize: maxPrize
		}
		$("#vueContent").html(bonusOptimizeView.vueContent());
		vm = new Vue({
			el: '#vueContent',
			data: data,
			methods: {
				total: function() {
					if (this.totalAmount > 1e5) {
						this.totalAmount = 1e5
						ui.showNotice('最大优化金额' + 1e5)
					} else if (this.totalAmount < 0) {
						this.totalAmount = 0
					} else if (this.totalAmount < this.matchList.length*2) {
						ui.showNotice('最小优化金额不能小于' + this.matchList.length*2);
					}
					if (this.totalAmount%1 != 0) {
						this.totalAmount = Math.ceil(this.totalAmount);
					}
					totalAmount = this.totalAmount;
					countBetPrize();
					this.maxPrize = maxPrize;
				},
                count: function(item) {
                    var tAmount = 0;
                    var maxPrizeArr = [];
           		 	this.matchList.forEach(function(m){
                	m.unitAmount= Math.round(m.unitAmount/2)*2;
	        		if (m.unitAmount){
	        			tAmount += parseInt(m.unitAmount);
	        		}
	        		item.theoryPrize = (item.unitAmount*item.singleOdd).toFixed(2);
	        		maxPrizeArr.push(m.theoryPrize);
		        	});
		        	this.maxPrize = Math.max.apply(null, maxPrizeArr);
		    	    this.totalAmount = tAmount;//实时更新
		    	    totalAmount = tAmount;//全局
                },
                changeValue: function(item,num) {
                	var num = parseInt(num);
                	if (this.totalAmount >= 1e5 && num > 0) {
                		return;
                	}
                	item.unitAmount = parseInt(item.unitAmount) + num;
                	item.unitAmount = item.unitAmount < 2 ? item.unitAmount = 2 : item.unitAmount;
                	this.count(item);
                },
                submit: function() {
                	ticketSubmit();
                }
           },
           destroyed: function() {}
		});
	}
	
	function ticketSubmit() {
		var betContent = [];
		var ticketPassType = window.editOptimizeMatch[0].ticketPassType;
		if (qarr) {
			var protocol = $('#protocol')[0].checked;
			var minTotalAmount  = qarr.length*2;
			if (!protocol) {
				ui.showNotice("请阅读并同意代购协议");
				return;	
			}
			if (isNaN(totalAmount) || totalAmount < minTotalAmount) {
				ui.showNotice('最小优化金额不能小于' + minTotalAmount + '，请重新输入');
				return;
			}
			if (totalAmount%2 != 0) {
				ui.showNotice('优化金额不能是奇数，请重新输入');
				return;
			}
			for (var i = 0; i < qarr.length; i++) {
				var ticketMultiple = Math.ceil(qarr[i].unitAmount/2);
				if (ticketMultiple <= 0) {
					ui.showNotice('优化金额过小，请重新输入');
					return;
				}
				var options = qarr[i].options;
				var matchRecommend = [];
				for (var j = 0; j < options.length; j++) {
					var matchId = options[j].matchId;
					var oddsId = options[j].oddsId;
					var recommend = [];
					recommend.push(options[j].recommend);
					var matchInfo = {
						matchId: matchId,
						oddsId: oddsId,
						recommend: recommend,
					}
					matchRecommend.push(matchInfo);
				}
				var betContentMap = {
					matchType: 1,
					ticketMultiple: ticketMultiple,
					matchRecommend: matchRecommend,
					ticketPassType: ticketPassType
				}
				betContent.push(betContentMap);
			}
			betContent = JSON.stringify(betContent);
			var options = {
				betContent: betContent
			};
			orderCgi.createBatchTicketOrder(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var orderBatchNo = trim(data.orderBatchNo);
				var payUrl = trim(data.payUrl);
				if (orderBatchNo) {
					if (payUrl) {
						setTimeout(function() {
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderBatchNo=" + orderBatchNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}
		window.editOptimizeMatch = null;
		window.editSelfSelectMatch = null;
	}
});