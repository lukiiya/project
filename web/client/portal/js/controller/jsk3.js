define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var orderCgi = require('cgi/order');
	var k3View = require('view/jsk3');
	var type = null;
	var bet = null;
	var tab = null;
	var ssqCartKey = null;
	var rules = null;

	function init(view) {
		bet = trim(common.getUrlParam("bet")) || false;
		rules = trim(common.getUrlParam("rules")) || false;
		tab = 1;
		ssqCartKey = 'JSK3';
		if (bet) {
			common.setHistoryBack('#jsk3');
		} else {
			common.setHistoryBack('#lotteryHall');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		bet = null;
		tab = null;
		ssqCartKey = null;
		clearTimeout(getLotteryIssueInfo.timer);
		localData.remove('JSK3');
	}

	function setMain(view) {
		var options = {
			title: bet ? '快3投注' : '江苏快3',
			className: 'k3',
			showHeader: true,
			isDigitalHeader: bet ? false : true,
			isLeftIconHeader: bet ? true : false,
			rightButtonText: '助手',
			rightButtonFun: function () {
				var display = trim($('#assistantMenu').css('display'));
				if (display == 'none') {
					showAssistantMenu();
				} else {
					hideAssistantMenu();
				}
			}
		}
		main.setMain(view, options);
		if (bet) {
			main.setContent(k3View.k3Bet())
			$("#submitBtn").on('click', createSubmit);
		} else {
			main.setContent(k3View.k3Num())
			$("#ensureBtn").on('click', ensureSelect);
		}
		$("#digitalTitleWrap").on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var display = trim($('#navWrap').css('display'));
			if (display == 'none') {
				showNav();
			} else {
				hideNav();
			}
		})
	}


	function setContent() {
		setTab();
		if (bet) {
			setK3List()
		} else {
			getLotteryIssueInfo();
			getLotteryIssueList();
		}
	}
	
	function showAssistantMenu() {
		$('#assistantMenu').show();
		$('#pageContainer').off().on('click', hideAssistantMenu);
		$("#assistantMenuContent").off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
		$("#recentlyDraw").on('click', drawHistory);
		$("#digitalRule").on('click', function() {
			common.locationUrl("#lotteryRules&lotteryId=JSK3");
		})
	}
	
	function hideAssistantMenu() {
		$('#assistantMenu').hide();
		$('#pageContainer').off('click');
		$('#assistantMenuContent').off('click');
	}
	
	function drawHistory() {
		common.locationUrl("#drawHistory&lotteryId=JSK3")
	}
	
	function showNav() {
		$('#navWrap').show();
		$('#pageContainer').off().on('click', hideNav);
		$("#typeList").off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}
	
	function hideNav() {
		$('#navWrap').hide();
		$('#pageContainer').off('click');
		$('#typeList').off('click');
	}
	
	function setTab() {
		var typeList = $('#typeList .item');
		typeList.on('click', function(e) {
			typeList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			var typeTxt = $(this).find(".type").html();
			$("#prize").html('0 元');
			$("#unit").html('注数：0 注');
			$("#digitalTitleTxt").html(typeTxt);
			if (type == 1) {
				HZ()
			} else if (type == 2) {
				ETH()
			} else if (type == 3) {
				EBT()
			} else if (type == 4) {
				STH()
			} else if (type == 5) {
				SBT()
			} else if (type == 6) {
				SLH()
			}
			hideNav();
		});
		//默认选中
		var typeIndex = -1;
		typeList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		typeList.eq(typeIndex).click();
	}
	
	var localData = (function () { //本地储存
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
	
	function addToStorage(numInfo) { //选择号码添加到本地储存
        if (numInfo != null) {
            var items = getCartItems();
            items.unshift(numInfo);
            var strItems = JSON.stringify(items);
            localData.set(ssqCartKey, strItems)
        }
    };
    
    function getCartItems() { //获取本地储存
        var strres = localData.get(ssqCartKey);
        return strres === null || strres === undefined ? ssqCartKey != "" ? (localData.set(ssqCartKey, "[]"), JSON.parse("[]")) : {} : strres == "" ? JSON.parse("[]") : JSON.parse(strres)
    };
	
	function HZ() {
		var hzNum = [];
		for (var i = 3; i < 19; i++) {
            var ball = {
            	award: 3 == i || 18 == i ? award = 240 : 4 == i || 17 == i ? award = 80 : 5 == i || 16 == i ? award = 40 : 6 == i || 15 == i ? award = 25 : 7 == i || 14 == i ? award = 16 : 8 == i || 13 == i ? award = 12 : 9 == i || 12 == i ? award = 10 : 10 != i && 11 != i || (award = 9),
                num: i
            };
            hzNum.push(ball)
        }
		var data = {
			hzNum: hzNum
		}
		$("#numList").html(k3View.HZ(data));
		 var featureFunc = function(feature) {
                var features = {
                    'small': [3, 4, 5, 6, 7, 8, 9, 10],
                    'big': [11, 12, 13, 14, 15, 16, 17, 18],
                    'even': [4, 6, 8, 10, 12, 14, 16, 18],
                    'odd': [3, 5, 7, 9, 11, 13, 15, 17],
                    'small,even': [4, 6, 8, 10],
                    'even,small': [4, 6, 8, 10],
                    'small,odd': [3, 5, 7, 9],
                    'odd,small': [3, 5, 7, 9],
                    'big,even': [12, 14, 16, 18],
                    'even,big': [12, 14, 16, 18],
                    'big,odd': [11, 13, 15, 17],
                    'odd,big': [11, 13, 15, 17]
                };
                return features[feature]; 
            };
            var selectBtn = [], selectBall = [],
            oppos = {
                'small': 'big',
                'big': 'small',
                'even': 'odd',
                'odd': 'even'
            };
            var assistBtns = $('#tabBar .tab_item');
            assistBtns.on('click', function(e) {
                var btn = $(this);
                if(btn.hasClass('active')) {
                    btn.removeClass('active');
                    var idx = selectBtn.indexOf(btn.data('value'));
                    if (idx > -1) {
                        selectBtn.splice(idx, 1);
                    }
                } else {
                    btn.addClass('active');
                    selectBtn.push(btn.data('value'));
                }
                triggerBall(btn.data('value'));
            });

            var jsBalls = $('#numWrap .num_item_4');
            jsBalls.on('click', function(e) {
                var ball = $(this);
                if(ball.hasClass('active')) {
                    ball.removeClass('active');
                    var idx = selectBall.indexOf(ball.data('value'));
                    if (idx > -1) {
                        selectBall.splice(idx, 1);
                    }
                } else {
                    ball.addClass('active');
                    selectBall.push(ball.data('value'));
                }
                triggerBtn();
            });

            function triggerBall(value) { //引起球的变化
                var assistBtns = $('#tabBar .tab_item'),
                    jsBalls = $('#numWrap .num_item_4');
                var oppo = oppos[value];
                var idx = selectBtn.indexOf(oppo);
                if (idx > -1) {
                    selectBtn.splice(idx, 1);
                }
                selectBall = featureFunc([selectBtn.join(',')]) || [];
				assistBtns.each(function(i,item) {
					var assistBtn = $(this);
					btnValue = assistBtn.data('value'),
                    idx = selectBtn.indexOf(btnValue);
                    if(idx > -1) {
                        assistBtn.addClass('active');
                    } else {
                        assistBtn.removeClass('active');
                    }
				})
                
                jsBalls.each(function(i,item) {
            	  	var jsBall = $(this), 
                    ballValue = jsBall.data('value'),
                    idx = selectBall.indexOf(ballValue);    
                    if(idx > -1) {
                        jsBall.addClass('active');
                    } else {
                        jsBall.removeClass('active');
                    }  
                })
                calcUnit();
            };

            function triggerBtn() {
                var assistBtns = $('#tabBar .tab_item'),
                    compare = selectBall.sort(function(a, b) {
                        return a - b;
                    }), selects = [];
                   
                if(compare.toString() === [3, 4, 5, 6, 7, 8, 9, 10].toString()) {
                    selects = ['small'];
                } else if(compare.toString() === [11, 12, 13, 14, 15, 16, 17, 18].toString()) {
                    selects = ['big'];
                } else if(compare.toString() === [4, 6, 8, 10, 12, 14, 16, 18].toString()) {
                    selects = ['even'];
                } else if(compare.toString() === [3, 5, 7, 9, 11, 13, 15, 17].toString()) {
                    selects = ['odd'];
                } else if(compare.toString() === [4, 6, 8, 10].toString()) {
                    selects = ['small', 'even'];
                } else if(compare.toString() === [3, 5, 7, 9].toString()) {
                    selects = ['small', 'odd'];
                } else if(compare.toString() === [12, 14, 16, 18].toString()) {
                    selects = ['big', 'even'];
                } else if(compare.toString() === [11, 13, 15, 17].toString()) {
                    selects = ['big', 'odd'];
                } else {
                    selects = [];
                }

                selectBtn = selects;
                for(var i=0, len=assistBtns.length; i<len; i++) {
                    var assistBtn = assistBtns[i],
                        btnValue = $(assistBtn).data('value'),
                        idx = selects.indexOf(btnValue);
                    if(idx > -1) {
                        $(assistBtn).addClass('active');
                    } else {
                        $(assistBtn).removeClass('active');
                    }
                };
                calcUnit();
            };
	}
	
	function STH() {
		$("#numList").html(k3View.STH());
		var tabBar = $("#tabBar .ui-flex_item")
		tabBar.on('click', function() {
			$("#prize").html('0 元');
			$("#unit").html('注数：0 注');
			tabBar.removeClass('active');
			$(this).addClass('active');
			var index = $(this).index()
			$("p.tips").hide().eq(index).show();
			$("#numBox ul").hide().eq(index).show();
			$("#numBox li").removeClass('active');
		});
		itemClick();
	}
	
	function SBT() {
		$("#numList").html(k3View.SBT());
		itemClick()
	}
	
	function SLH() {
		$("#numList").html(k3View.SLH());
		itemClick()
	}
	
	function ETH() {
		$("#numList").html(k3View.ETH());
		$("#tabBar .ui-flex_item").on('click', function() {
			$("#prize").html('0 元');
			$("#unit").html('注数：0 注');
			$("#tabBar .ui-flex_item").removeClass('active');
			$(this).addClass('active');
			var index = $(this).index();
			$("p.tips").hide().eq(index).show();
			$("#numBox div.tabBox").hide().eq(index).show();
			$("#numBox li").removeClass('active');
			tab = $(this).attr('tab');
		});
		if (tab == 1) {
			var numItem = $("#numBox .num_item_3")
			numItem.on('click', function(e) {
				var className = trim(this.className);
				var curBox = $(this).parents('#numBox').eq(0);
				var btnValue = $(this).data('value');
				var curWrap = this.parentNode;
				var numWrap = curBox.find('.num_wrap');
				numWrap.each(function(i, item) {
					if (curWrap != item) {
						$(item).find('[data-value="' + btnValue + '"]').removeClass("active");
					}
				});
				$(this).toggleClass("active");
				calcUnit();
			});
		} else if (tab == 2) {
			itemClick()
		}
	}
	
	function EBT() {
		$("#numList").html(k3View.EBT());
		itemClick()
	}
	
	function itemClick() {
		var item = $("#numBox .num_item_4, #numBox .num_item_3, #numBox .num_item_1");
		item.on('click', function() {
			$(this).toggleClass('active');
			calcUnit();
//			setSelectNum();
		})
	}
	
	function calcUnit() { //计算注数
		var numActive =  $("#numBox li.active");
		var unit;
		if (type == 5) {
			unit = common.ZH(numActive,3).length;
		} else if (type == 3) {
			unit = common.ZH(numActive,2).length;
		} else if (type == 2 && tab == 1) {	
			var t = $("#EDXTH li.active").length || 0;
			var b = $("#EDXBTH li.active").length || 0;
			unit = t * b;
		} else {
			unit = parseInt(numActive.length)
		}
		$("#prize").html(2*unit + ' 元');
		$("#unit").html('注数：' + unit + ' 注');
	}
	
	function ensureSelect() { //确定选择数字
		var unit = parseInt($("#unit").html().replace(/\D/g,''));
		if (unit <= 0) {
			ui.showNotice('不满一注');
			return;
		}
		var titleName = trim($("#typeList .item.active .type").html());
		var subName = trim($("#tabBar .ui-flex_item.active").html()) || '';
		var recommend = setSelectNum();
		addToStorage({
			title: titleName + subName,
			recommend: recommend,
			unit: unit
		})
		common.locationUrl("#jsk3&bet=ture");
	}
	
	//记录当前选择的数字
	function setSelectNum() {
		var activeLi;
		var recommend = [];
		if (type == 2 && tab == 1) {
			var activeTH = $("#EDXTH li.active"),
			activeBTH = $("#EDXBTH li.active"),
			a = [],
			b = [];
			activeTH.each(function(i, item) {
				var num1 = $(item).find('.twoNum').html();
				a.push(num1)
			});
			activeBTH.each(function(i, item) {
				var num2 = $(item).find('.twoNum').html();
				b.push(num2)
			});
			recommend.push(a.join(" ") + ' # ' + b.join(" "));
		} else {
			activeLi =  $("#numBox li.active");
			activeLi.each(function(i, item) {
				var num = $(item).find('.num').html();
				recommend.push(num);
			});
		}
		return recommend;
	}
	
	function setK3List() { //设置列表
		var selectContent = getCartItems();
		if (!selectContent || selectContent.length <= 0) {
			common.historyBack();
			return;
		}
		var data = {
			selectContent: selectContent
		}
		$("#k3List").html(k3View.k3List(data));
		setTotalAmount();
		setMultiple();
		deleteListItem();
	}
	
	function setTotalAmount() {
		var selectContent = getCartItems();
		var selectLength = selectContent.length;
		if (selectLength < 0) {
			return;
		}
		var totalUnit = 0;
		for (var i = 0, l = selectContent.length; i < l; i++) {
			unit = selectContent[i].unit;
			totalUnit += unit;
		}
		var multiple = parseInt($('#multiple').val()) || 0;
		var totalAmount = multiple*totalUnit*2;
		$("#totalUnit").html(totalUnit);
		$("#prize").html(totalAmount);
	}
	
	function setMultiple() {
		var basemultiple = 1;
		$("#addMultiple").on("click", function() {
			var multiple = parseInt($("#multiple").val()) || 0;
			multiple += parseInt(basemultiple);
			multiple = multiple > 9999 ? 9999 : multiple;
			$("#multiple").val(multiple).trigger('input');
		});
		$("#minusMultiple").on("click", function() {
			var multiple = parseInt($("#multiple").val()) || 0;
			multiple -= basemultiple;
			multiple = multiple < basemultiple ? basemultiple : multiple;
			$("#multiple").val(multiple).trigger('input');
		});
		$("#multiple").on('input', function() {
			var multiple = parseInt($("#multiple").val()) || 0;
			multiple = multiple < 1 ? multiple = 1 : multiple > 9999 ? multiple = 9999 : multiple = multiple
			$("#multiple").val(multiple);
			setTotalAmount();
		});
	}
	
	function deleteListItem() {
		$('#k3List .del_btn').on('click', function(e) {
			var parentObj = $(this).parents('li');
			parentObj.remove();
			var compare = parentObj.attr("compare");
			var items = getCartItems(),
		    nitems = [];
		    items.forEach(
		    function(n, i) {
		        n.recommend.join(' ') != compare && nitems.push(n)
		    });
            var strItems = JSON.stringify(nitems);
            localData.set(ssqCartKey, strItems);
			setTotalAmount();
		})
	}
	
	function getLotteryIssueInfo() {
		clearTimeout(getLotteryIssueInfo.timer);
		var options = {
			lotteryId: "JSK3"
		}
		lotteryCgi.lotteryIssueInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data;
			var issue = data.issue;
			var countDown = data.countDown;
			var timer = function() {
				countDown--;
				if (countDown > 0) {
//					var hour = Math.floor(countDown/60/60%24);
					var hour = Math.floor(countDown/60/60);
					var minute = Math.floor(countDown/60%60);
					var second = Math.floor(countDown%60);
					hour = hour < 10 ? "0" + hour : hour;
					minute = minute < 10 ? "0" + minute : minute; 
					second = second < 10 ? "0" + second : second;
					if (hour > 0) {
						$("#time").html(hour + ':' + minute + ':' + second);
					} else {
						$("#time").html(minute + ':' + second);
					}
					$("#issue").html(issue);
					getLotteryIssueInfo.timer = setTimeout(timer, 1000);
				} else {
					ui.showAlert('现在'+ issue + '期已截止，新一期正在销售');	
					getLotteryIssueInfo();
				}
			}
			timer();
		})
	}
	
	function createSubmit() {
    	var protocol = $('#protocol')[0].checked;
    	var ticketMultiple = parseInt($("#multiple").val());
    	var issue = parseInt($("#issue").html());
    	var totalUnit = parseInt($("#totalUnit").html());
    	var prize = parseInt($("#prize").html());
    	if (totalUnit <= 0 || prize <= 0) {
    		ui.showNotice("请至少选择一注");
			return;	
    	}
    	if (!protocol) {
			ui.showNotice("请阅读并同意代购协议");
			return;	
		}
    	if (!isDefined(ticketMultiple) || !(/^[0-9]+$/.test(ticketMultiple))) {
    		ui.showNotice("请输入正整数倍数");
			return;	
    	}
    	var titleMap = {'二同号单选' : '2TDX','二同号复选' : '2TFX','二不同' : '2BT','三同号单选' : '3TDX','三同号通选' : '3TTX','三连号' : '3LTX','三不同' : '3BT','和值' : 'HZ'};
    	var items = getCartItems();
    	var betContent = [];
    	items.forEach(
        function(n, i) {
        	if (n.title == '三同号通选') {
        		n.recommend = '777'
        	} else if (n.title == '三连号') {
        		n.recommend = '789'
        	} else if (n.title == '二同号单选') {
        		n.recommend = n.recommend.join("").split("#")[0].trim().split(" ") + '#' + n.recommend.join("").split("#")[1].trim().split(" ")
        	} else {
        		n.recommend = n.recommend.join(",")
        	}
            betContent.push(titleMap[n.title] + ":" + n.recommend);
        });
    	betContent = betContent.join(";");
    	var options = {
    		ticketMultiple: ticketMultiple,
    		issue: issue,
    		lotteryId: "JSK3",
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
			localData.remove('JSK3');
		})
   	}
	
	function getLotteryIssueList() {
		main.unsetScrollLoad();
		var options = {
			lotteryId: 'JSK3'
		}
		lotteryCgi.lotteryIssueList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var issue = list[0].issue;
			var drawNumber = list[0].drawNumber || '';
			drawNumber = drawNumber.split(',');
			var class1 = "icon_dice_" + drawNumber[0];
			var class2 = "icon_dice_" + drawNumber[1];
			var class3 = "icon_dice_" + drawNumber[2];
			$("#lastIssue").html(issue);
			$("#result").html('<i class="'+class1+'"></i>' +'<i class="'+class2+'"></i>' +'<i class="'+class3+'"></i>')
		})
	}
});	