define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var orderCgi = require('cgi/order');
	var gx11x5View = require('view/gx11x5');
	var type = null;
	var bet = null;
	var tab = null;
	var gx11x5CartKey = null;

	function init(view) {
		bet = trim(common.getUrlParam("bet")) || false;
		gx11x5CartKey = 'gx11x5';
		if (bet) {
			common.setHistoryBack('#gx11x5');
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
		gx11x5CartKey = null;
		clearTimeout(getLotteryIssueInfo.timer);
		localData.remove('gx11x5');
	}

	function setMain(view) {
		var options = {
			title: bet ? '乐11选5投注' : '乐11选5',
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
			main.setContent(gx11x5View.gx11x5Bet())
			$("#submitBtn").on('click', createSubmit);
		} else {
			main.setContent(gx11x5View.gx11x5Num())
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
		setType();
		if (bet) {
			setGx11x5List()
		} else {
			getLotteryIssueInfo();
			getLotteryIssueList();
		}
	}
	
	function drawHistory() {
		common.locationUrl("#drawHistory&lotteryId=GX11X5")
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
			common.locationUrl("#lotteryRules&lotteryId=GX11X5");
		})
	}
	
	function hideAssistantMenu() {
		$('#assistantMenu').hide();
		$('#pageContainer').off('click');
		$('#assistantMenuContent').off('click');
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
	
	function setType() {
		var typeList = $('#typeList .item');
		typeList.on('click', function(e) {
			typeList.removeClass('active');
			$(this).addClass('active');
			var typeTxt = $(this).find(".type").html();
			type = parseInt($(this).attr('type')) || 1;
			$("#price").html('0 元');
			$("#unit").html('注数：0 注');
			$("#digitalTitleTxt").html(typeTxt);
			if (type >=1 && type <= 7) {
				optional();
			} else if (type == 8) {
				Q1()
			} else if (type == 9) {
				Q23() 
			} else if (type == 10) {
				Q23()  
			} else if (type == 11) {
				Q23()  
			} else if (type == 12) {
				Q23()  
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
            localData.set(gx11x5CartKey, strItems)
        }
    };
    
    function getCartItems() { //获取本地储存
        var strres = localData.get(gx11x5CartKey);
        return strres === null || strres === undefined ? gx11x5CartKey != "" ? (localData.set(gx11x5CartKey, "[]"), JSON.parse("[]")) : {} : strres == "" ? JSON.parse("[]") : JSON.parse(strres)
    };
	
	function optional() {
		var optionalNum = [];
		for (var i = 1; i < 12; i++) {
            var ball = {
                num: i,
                select: !1
            };
            optionalNum.push(ball)
        }
		var data = {
			optionalNum: optionalNum,
			type: type
		}
		$("#numList").html(gx11x5View.optional(data));
		itemClick();
	}
	
	function Q1() {
		var optionalNum = [];
		for (var i = 1; i < 12; i++) {
            var ball = {
                num: i,
                select: !1
            };
            optionalNum.push(ball)
        }
		var data = {
			optionalNum: optionalNum
		}
		$("#numList").html(gx11x5View.Q1(data));
		itemClick();
	}
	
	function Q23() {
		var optionalNum = [];
		for (var i = 1; i < 12; i++) {
            var ball = {
                num: i,
                select: !1
            };
            optionalNum.push(ball)
        }
		var data = {
			optionalNum: optionalNum
		}
		if (type == 9) {
			$("#numList").html(gx11x5View.Q2ZHX(data));
		} else if (type == 10) {
			$("#numList").html(gx11x5View.Q2ZUX(data));
		} else if (type == 11) {
			$("#numList").html(gx11x5View.Q3ZHX(data));
		} else if (type == 12) {
			$("#numList").html(gx11x5View.Q3ZUX(data));
		}
//		var tabBar = $("#tabBar .ui-flex_item")
//		tabBar.off().on('click', function() {
//			$("#price").html('0 元');
//			$("#unit").html('注数：0 注');
//			tabBar.removeClass('active');
//			$(this).addClass('active');
//			var index = $(this).index();
//			$("p.tips").hide().eq(index).show();
//			$("#numBox div.tabBox").hide().eq(index).show();
//			$("#numBox li").removeClass('active');
//			tab = parseInt($(this).attr('tab')) || 1;
//		});
//		tabBar.eq(0).click();
		if (type == 9 || type == 11) {
			var numItem = $("#numBox .num_item_6")
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
		} else if (type == 10 || type == 12) {
			itemClick()
		}
	}
	
	function itemClick() {
		var item = $("#numBox .num_item_6");
		item.on('click', function() {
			$(this).toggleClass('active');
			calcUnit();
//			setSelectNum();
		})
	}
	
	function calcUnit() { //计算注数
		var numActive =  $("#numBox li.active");
		var unit;
		var f = $("#firstNum li.active").length || 0;
		var s = $("#secondNum li.active").length || 0;
		var t = $("#thirdNum li.active").length || 0;
		if ( type >= 1 && type <= 7) {
			unit = common.ZH(numActive,type+1).length;
		} else if (type == 9) {	
			unit = f * s;
		} else if (type == 11) {	
			unit = f * s * t;	
		} else {
			unit = parseInt(numActive.length)
		}
		$("#price").html(2*unit + ' 元');
		$("#unit").html('注数：' + unit + ' 注');
	}
	
	function ensureSelect() { //确定选择数字
		var unit = parseInt($("#unit").html().replace(/\D/g,''));
		if (unit <= 0) {
			ui.showNotice('不满一注');
			return;
		}
		var titleName = trim($("#typeList .item.active .type").html());
//		var subName = trim($("#tabBar .ui-flex_item.active").html()) || '';
		var recommend = setSelectNum();
		addToStorage({
			title: titleName,
			recommend: recommend,
			unit: unit
		})
		common.locationUrl("#gx11x5&bet=ture");
	}
	
	//记录当前选择的数字
	function setSelectNum() {
		var activeLi;
		var recommend = [];
		if (type == 9 || type == 11) {
			var activeFn = $("#firstNum li.active"),
			activeSn = $("#secondNum li.active"),
			activeTn = $("#thirdNum li.active"),
			a = [],
			b = [],
			c = [];
			activeFn.each(function(i, item) {
				var num1 = $(item).find('.num').html();
				num1 = num1 < 10 ? "0" + num1 : num1;
				a.push(num1)
			});
			activeSn.each(function(i, item) {
				var num2 = $(item).find('.num').html();
				num2 = num2 < 10 ? "0" + num2 : num2;
				b.push(num2)
			});
			activeTn.each(function(i, item) {
				var num3 = $(item).find('.num').html();
				num3 = num3 < 10 ? "0" + num3 : num3;
				c.push(num3)
			});
			if (type == 9) {
				recommend.push(a.join("　") + ' , ' + b.join("　"));
			} else if (type == 11) {
				recommend.push(a.join("　") + ' , ' + b.join("　") + ' , ' + c.join("　"));
			}
		} else {
			activeLi =  $("#numBox li.active");
			activeLi.each(function(i, item) {
				var num = $(item).find('.num').html();
				num = num < 10 ? "0" + num : num;
				recommend.push(num);
			});
		}
		return recommend;
	}
	
	function setGx11x5List() { //设置列表
		var selectContent = getCartItems();
		if (!selectContent || selectContent.length <= 0) {
			common.historyBack();
			return;
		}
		var data = {
			selectContent: selectContent
		}
		$("#gx11x5List").html(gx11x5View.gx11x5List(data));
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
		$("#price").html(totalAmount);
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
		$('#gx11x5List .del_btn').on('click', function(e) {
			var parentObj = $(this).parents('li');
			parentObj.remove();
			var compare = parentObj.attr("compare");
			var items = getCartItems(),
		    nitems = [];
		    items.forEach(
		    function(n, i) {
		        n.title + n.recommend.join(' ') != compare && nitems.push(n)
		    });
            var strItems = JSON.stringify(nitems);
            localData.set(gx11x5CartKey, strItems);
			setTotalAmount();
		})
	}
	
	function getLotteryIssueInfo() {
		clearTimeout(getLotteryIssueInfo.timer);
		var options = {
			lotteryId: "GX11X5"
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
    	var price = parseInt($("#price").html());
    	if (totalUnit <= 0 || price <= 0) {
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
    	var titleMap = {'任二' : 'RX2','任三' : 'RX3','任四' : 'RX4','任五' : 'RX5','任六' : 'RX6','任七' : 'RX7','任八' : 'RX8','前一' : 'Q1','前二直选': 'Q2ZHX','前二组选':'Q2ZUX','前三直选': 'Q3ZHX','前三组选': 'Q3ZUX'};
    	var items = getCartItems();
    	var betContent = [];
    	items.forEach(
        function(n, i) {
			if (n.title == '前二直选') {
        		n.recommend = n.recommend.join("").split(",")[0].trim().split("　")+ '|' + n.recommend.join("").split(",")[1].trim().split("　");
        	} else if (n.title == '前三直选') {
        		n.recommend = n.recommend.join("").split(",")[0].trim().split("　")+ '|' + n.recommend.join("").split(",")[1].trim().split("　") + '|' + n.recommend.join("").split(",")[2].trim().split("　");;
        	} else {
        		n.recommend = n.recommend.join(",")
        	}
            betContent.push(titleMap[n.title] + ":" + n.recommend);
        });
    	betContent = betContent.join(";");
    	var options = {
    		ticketMultiple: ticketMultiple,
    		issue: issue,
    		lotteryId: "GX11X5",
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
			localData.remove('gx11x5');
		})
   	}
	
	function getLotteryIssueList() {
		main.unsetScrollLoad();
		var options = {
			lotteryId: 'GX11X5'
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
			$("#lastIssue").html(issue);
			$("#result").html('<span class="last_draw_num">'+ drawNumber[0] + '</span>' +
			'<span class="last_draw_num">'+ drawNumber[1] + '</span>'  +
			'<span class="last_draw_num">'+ drawNumber[2] + '</span>'  +
			'<span class="last_draw_num">'+ drawNumber[3] + '</span>'  +
			'<span class="last_draw_num">'+ drawNumber[4] + '</span>' )
		})
	}
});	