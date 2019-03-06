define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var orderCgi = require('cgi/order');
	var dltView = require('view/dlt');
	var vm = null;
	var bet = null;
	var issue = null;

	function init(view) {
		bet = trim(common.getUrlParam("bet")) || false;
		if (bet) {
			common.setHistoryBack('#dlt');
		} else {
			common.setHistoryBack('#lotteryHall');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		vm = null;
		bet = null;
		issue = null;
		localData.remove('dlt');
		vm && vm.$destroy();
	}

	function setMain(view) {
		var options = {
			title: bet ? "大乐透投注" : "大乐透",
			className: 'ssq',
			showHeader: true,
			rightButtonText: '历史开奖',
			rightButtonFun: drawHistory
		}
		main.setMain(view, options);
		if (bet) {
			main.setContent(dltView.ssqBet())
		} else {
			main.setContent(dltView.ssqNum())
		}
	}


	function setContent() {
		getLotteryIssueInfo();
		useVue();
	}
	
	function drawHistory() {
		common.locationUrl("#drawHistory&lotteryId=DLT")
	}
	
	function getLotteryIssueInfo() {
		var options = {
			lotteryId: "DLT"
		}
		lotteryCgi.lotteryIssueInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data;
			var endTime = data.endTime;
			endTime = endTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1");
			issue = data.issue;
			$("#endTime").html(endTime);
			$("#issue").html(issue);
		})
	}
	
	var localData = (function () {
	    return {
	        set: function (name, value) {
	            localStorage.setItem(name, value);
	        },
	        get: function (name) {
	            return localStorage.getItem(name);
	        },
	        remove: function (name) {
	            localStorage.removeItem(name);
	        }
	    };
	})()
	
	function useVue() {
		vm = new Vue({
			el: '#pageContent',
			data: {
				redBall: '',
	    		blueBall: '',
	    		singleUnit: 0,
	    		ssqItems: '',
	    		prize: 0,
	    		totalUnit: 0,
	    		multiple: 1,
	    		ssqCartKey: 'dlt',
	    		checked: 0,
	    		append: 1
			}
		});
		vm.setDlt = function() { //设置红篮球
			vm.redBall = [],
	        vm.blueBall = [];
	        for (var i = 1; i < 36; i++) {
	            var ball = {
	                color: "red",
	                redNum: i < 10 ? "0" + i : i,
	                select: !1
	            };
	            vm.redBall.push(ball)
	        }
	        for (var i = 1; i < 13; i++) {
	            var ball = {
	                color: "blue",
	                blueNum: i < 10 ? "0" + i : i,
	                select: !1
	            };
	            vm.blueBall.push(ball)
        	}
		}
		vm.setDlt();
		vm.chooseBallNum = function(red, blue) { 
            var redNum = red,
            blueNum = blue,
            num = vm.calcUnit(redNum, redNum - 4) / vm.calcUnit(5, 2) * (vm.calcUnit(blueNum, blueNum - 1) / vm.calcUnit(2, 1));//计算注数
            num >= 1 ? this.singleUnit = num : this.singleUnit = 0
      	},
		vm.selectBall = function(obj) { //手选号码
			var selRedMax = 0,
            selBlueMax = 0;
	        for (var i = 0; i < vm.redBall.length; i++) {
	        	1 == vm.redBall[i].select && selRedMax++;
	        }
	        for (var i = 0; i < vm.blueBall.length; i++) {
	        	1 == vm.blueBall[i].select && selBlueMax++;
	        }
	        1 == !!obj.select ? (obj.select = !1, obj.color == "red" && selRedMax--, obj.color == "blue" && selBlueMax--) : (obj.select = !0, obj.color == "red" && selRedMax++, obj.color == "blue" && selBlueMax++);
			if (selRedMax > 18) {
				1 == !!obj.select ? (obj.select = !1) : (obj.select = !0);
				ui.showNotice("最多选择18个红球");
				return
			}
	        vm.chooseBallNum(selRedMax, selBlueMax)
	    },
	    vm.calcUnit = function(m, n) { //排列计算
            return m == n ? m : m * this.calcUnit(m - 1, n)
      	},
       	vm.chooseRandomBall = function() { //随机红篮球
			var getZoneRandomNum = function(length, ballType) { //获取红球区、蓝球区球
				var randomNumber = [];
				switch (ballType) {
					case 1: //红球
					maxNumber = 35;
					break;
					case 2: //篮球
					maxNumber = 12
				}
				for (var i = 0; i < length; i++) {
					var num = Math.ceil(Math.random() * maxNumber),
					num2 = num < 10 ? "0" + num.toString() : num.toString();
					randomNumber.join(" ").indexOf(num2) >= 0 ? i-- : randomNumber.push(num2)
				}
				if (ballType == 1) {
					for (var i = 0; i < randomNumber.length; i++) {
						vm.redBall[parseInt(randomNumber[i]) - 1].select = !0;
					}
				}
				if (ballType == 2) {
					for (var i = 0; i < randomNumber.length; i++) {
						vm.blueBall[parseInt(randomNumber[i]) - 1].select = !0
					}
				}
			}
			vm.setDlt();
			getZoneRandomNum(5, 1),
	        getZoneRandomNum(2, 2);
	        vm.chooseBallNum(5, 2);
		},
       	vm.ensureSelect = function() { //确定选择的红篮球
			var selRedBalls = [],
				selBlueBalls = [];
            for (var i = 0; i < vm.redBall.length; i++) {
            	vm.redBall[i].select == 1 && selRedBalls.push(vm.redBall[i]);
            }
            for (var i = 0; i < vm.blueBall.length; i++) {
            	vm.blueBall[i].select == 1 && selBlueBalls.push(vm.blueBall[i]);
            }
            if (selRedBalls.length == 0 && selBlueBalls.length == 0) { //一个球没选，随机一注
            	return vm.chooseRandomBall();
            }
            if (selRedBalls.length < 5 || selBlueBalls.length < 2) {
            	ui.showNotice('至少选择5个红球，2个蓝球');
            	return
            }
            if (vm.singleUnit*2 > 2e4) {
        		ui.showNotice("单次投注最多2万元");
				return;
        	}
            var selInfos = vm.getSelNumsInfo();
            vm.addToStorage(selInfos);
			common.locationUrl("#dlt&bet=true");
       },
       vm.getSelNumsInfo = function() { //得到选择号码信息
       		var unit = this.singleUnit,
            money = 2 * this.singleUnit,
            selNums = "";
            for (var i = 0; i < vm.redBall.length; i++) {
            	1 == vm.redBall[i].select && (selNums += trim(vm.redBall[i].redNum) + " ");
            }
            selNums += "+ ";
            for (var i = 0; i < vm.blueBall.length; i++) {
            	1 == vm.blueBall[i].select && (selNums += trim(vm.blueBall[i].blueNum) + " ");
            }
            return {
            	lotteryId: 'DLT',
                selUnit: unit,
                selMoney: money,
                selnums: selNums.trim()
            }
       	},
        vm.addToStorage = function(numInfo) { //选择号码添加到本地储存
            if (numInfo != null) {
                var items = vm.getCartItems();
                items.unshift(numInfo);
                var strItems = JSON.stringify(items);
                localData.set(vm.ssqCartKey, strItems)
            }
        },
        vm.getCartItems = function() { //获取本地储存
            var strres = localData.get(vm.ssqCartKey);
            return strres === null || strres === undefined ? vm.ssqCartKey != "" ? (localData.set(vm.ssqCartKey, "[]"), JSON.parse("[]")) : {} : strres == "" ? JSON.parse("[]") : JSON.parse(strres)
        },
        vm.initList = function() { //生成列表
            vm.totalUnit = 0,
            vm.prize = 0;
            var items = [];
            localData.get(vm.ssqCartKey) && (items = JSON.parse(localData.get(vm.ssqCartKey))),
            items != null && items.length > 0 && items.forEach(
            function(n, i) {
                n.redballs = n.selnums.split("+")[0].trim().split(" "),
                n.blueballs = n.selnums.split("+")[1].trim().split(" "),
                vm.totalUnit += n.selUnit,
                vm.prize += n.selMoney * vm.multiple * vm.append
            }),
            vm.ssqItems = items
        },
        vm.initList(),
        vm.cancel = function(obj) { //删除已选列表项
            var items = vm.getCartItems(),
            nitems = [];
            items.forEach(
            function(n, i) {
                n.selnums != obj.selnums && nitems.push(n)
            });
            var strItems = JSON.stringify(nitems);
            localData.set(vm.ssqCartKey, strItems);
            vm.initList();
        },
        vm.addRandomList = function(numCount) { //随机N注列表
            function chooseNumberByRandom() {
                function getRandomNumber(redLength, blueLength, randomNumber_r, randomNumber_b) {
                    for (var i = 0; i < redLength; i++) {
                        var num_red = Math.ceil(35 * Math.random());
                        num_red = num_red < 10 ? "0" + num_red.toString() : num_red.toString(),
                        randomNumber_r.join(" ").indexOf(num_red) >= 0 ? i-- : randomNumber_r = randomNumber_r.join(" ").replace( - 1, num_red).split(" ")
                    }
                    for (var j = 0; j < redLength; j++) {
                        var num_blue = Math.ceil(12 * Math.random());
                        num_blue = num_blue < 10 ? "0" + num_blue.toString() : num_blue.toString(),
                        randomNumber_b.join(" ").indexOf(num_blue) >= 0 ? i-- : randomNumber_b = randomNumber_b.join(" ").replace( - 1, num_blue).split(" ")
                    }
  
					return randomNumber_r.sort().join(" ") + " + " + randomNumber_b.sort().join(" ")
                }
                var unit = 1,
	                redLength = 5,
	                blueLength = 2,
	                randomNumber_r = [],
	                randomNumber_b = [];
               	for (var idx = 0; idx < redLength; idx++) {
                	randomNumber_r.push( - 1);
                }
               	for (var idy = 0; idy < blueLength; idy++) {
                	randomNumber_b.push( - 1);
                }
                var selNums = getRandomNumber(redLength, blueLength, randomNumber_r, randomNumber_b);
                return {
                	lotteryId: 'DLT',
                    selUnit: unit,
                    selMoney: 2 * unit,
                    selnums: selNums.trim()
                }
            }
            for (var j = 0; j < numCount; j++) {
            	var selInfos = chooseNumberByRandom();
	            vm.addToStorage(selInfos),
	            vm.initList()
            }
        },
        vm.$watch("multiple",
        function(newv) {
            if(isDefined(newv)) {
            	newv < 1 ? newv = 1 : newv > 99 ? newv = 99 : newv = newv,
				vm.multiple = newv,
				vm.prize = vm.multiple * vm.totalUnit * 2 * vm.append;
            }
        }),
        vm.moneyAppend = function() { //追加改变金额
			vm.checked = !vm.checked;
			1 == vm.checked ? vm.append = 1.5 : vm.append = 1;
			vm.prize = vm.multiple * vm.totalUnit * 2 * vm.append;
        },
        vm.changeValue = function(num) {
        	vm.multiple = parseInt(vm.multiple) + num;
        },
        vm.backToSsq = function() {
        	common.locationUrl("#dlt");
        },
        vm.createSubmit = function() {
        	var protocol = $('#protocol')[0].checked;
        	var ticketAppend = vm.checked ? 1 : 0;
        	if (!protocol) {
				ui.showNotice("请阅读并同意代购协议");
				return;	
			}
        	if (!isDefined(vm.multiple) || !(/^[0-9]+$/.test(vm.multiple))) {
        		ui.showNotice("请输入正整数倍数");
				return;	
        	}
        	if (vm.totalUnit <= 0 || vm.prize <= 0) {
        		ui.showNotice("请至少选择一注");
				return;	
        	}
        	var items = vm.getCartItems();
        	var betContent = [];
        	items.forEach(
            function(n, i) {
                betContent.push(n.selnums.split("+")[0].trim().split(" ").join(",") + "+" + n.selnums.split("+")[1].trim().split(" ")) 
            });
        	betContent = betContent.join(";");
        	var options = {
        		ticketMultiple: vm.multiple,
        		issue: issue,
        		lotteryId: "DLT",
        		ticketAppend: ticketAppend,
        		betContent: betContent
        	}
        	orderCgi.createDigitalTicketOrder(options, function(ret) {
				if(ret.errCode != 0){
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
				localData.remove('dlt');
			})
       	},
        vm.destroyed = function() {}
	}
});	