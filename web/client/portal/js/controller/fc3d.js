define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var orderCgi = require('cgi/order');
	var userCgi = require('cgi/user');
	var fc3dView = require('view/fc3d');
	var type = null;
	var bet = null;
	var fc3dCartKey = null;
	var recommend = null;
	var channel = null;
	var planNo = null;

	function init(view) {
		bet = trim(common.getUrlParam("bet")) || false;
		recommend = trim(common.getUrlParam("recommend")) || false;
		channel = parseInt(common.getUrlParam("channel"));
		planNo = trim(common.getUrlParam("planNo"));
		if (recommend) {
			fc3dCartKey = 'fc3dRecommend';
		} else {
			fc3dCartKey = 'fc3d';
		}
		if (recommend && bet) {
//			common.historyBack();	
		} else if (bet){
			common.setHistoryBack('#fc3d');
		} else if (recommend){
			common.setHistoryBack('#editDigitalPlan');
		} else {
			common.setHistoryBack('#lotteryHall');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		if (recommend && bet) {
			localData.remove('fc3dRecommend')
		}
		type = null;
		bet = null;
		fc3dCartKey = null;
		recommend = null;
		channel = null;
		planNo = null;
		localData.remove('fc3d');
	}

	function setMain(view) {
		var options = {
			title: bet ? '3D投注' : '3D',
			className: 'fc3d',
			showHeader: true,
			rightButtonText: recommend ? '确定' : '开奖',
			rightButtonFun: recommend ? ensureSelectRecommend : drawHistory
		}
		if (recommend && bet) {
			options.rightButtonText = '';
		}
		main.setMain(view, options);
		var data = {
			recommend: recommend
		}
		if (bet) {
			main.setContent(fc3dView.fc3dBet())
			$("#submitBtn").on('click', createSubmit);
		} else {
			main.setContent(fc3dView.fc3dNum(data))
			$("#ensureBtn").on('click', ensureSelect);
		}
	}


	function setContent() {
		setType();
		if (bet) {
			setFc3dList()
		}
		getLotteryIssueInfo();
		if (channel == 3) {
			//不登录就唤起登录
			userCgi.getUserInfo({}, function() {}, true);
		}
	}
	
	function drawHistory() {
		common.locationUrl("#drawHistory&lotteryId=FC3D")
	}
	
	function setType() {
		var typeList = $('#typeList .item');
		typeList.on('click', function(e) {
			typeList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			$("#price").html('0 元');
			$("#unit").html('注数：0 注');
			if (type ==1) {
				ZHX()
			} else if (type == 2) {
				HZ()
			} else if (type == 3) {
				ZUX() 
			} else if (type == 4) {
				ZUX() 
			}
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
            localData.set(fc3dCartKey, strItems);
        }
    };
    
    function getCartItems() { //获取本地储存
        var strres = localData.get(fc3dCartKey);
        return strres === null || strres === undefined ? fc3dCartKey != "" ? (localData.set(fc3dCartKey, "[]"), JSON.parse("[]")) : {} : strres == "" ? JSON.parse("[]") : JSON.parse(strres)
    }
	
	function ZHX() {
		var optionalNum = [];
		for (var i = 0; i < 10; i++) {
            var ball = {
                num: i,
                select: !1
            };
            optionalNum.push(ball)
        }
		var data = {
			optionalNum: optionalNum
		}
		$("#numList").html(fc3dView.ZHX(data));
		itemClick();
	}
	
	function HZ() {
		var HzNum = [];
		for (var i = 0; i < 28; i++) {
            var ball = {
                num: i,
                select: !1
            };
            HzNum.push(ball)
        }
		var data = {
			HzNum: HzNum
		}
		$("#numList").html(fc3dView.HZ(data));
		itemClick();
	}
	
	function ZUX() {
		var ZxNum = [];
		for (var i = 0; i < 10; i++) {
            var ball = {
                num: i,
                select: !1
            };
            ZxNum.push(ball)
        }
		var data = {
			ZxNum: ZxNum,
			type: type
		}
		$("#numList").html(fc3dView.ZUX(data));
		itemClick();
	}
	
	function itemClick() {
		var item = $("#numBox .num_item_5,#numBox .num_item_6");
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
		if ( type == 1) {
			unit = f * s * t;
		} else if (type == 2) {	
			var numArr = [];
			var numList = $("#numBox li.active span");
			unit = 0;
			var numMap = {"0": 1, "1": 3, "2": 6, "3": 10,"4": 15, "5": 21 , "6": 28, "7": 36, "8": 45, "9": 55, "10": 63, "11": 69, "12": 73, "13": 75,
						"14": 75, "15": 73, "16": 69, "17": 63, "18": 55, "19": 45, "20": 36, "21": 28, "22": 21, "23": 15, "24": 10, "25": 6, "26": 3, "27": 1}
			numList.each(function(i, item) {
				var num = parseInt($(item).html())
				numArr.push(num);
			});
			for (var i = 0; i < numArr.length; i++) {
				unit += parseInt(numMap[numArr[i]]);
			}
		} else if (type == 3) {	
			unit = common.ZH(numActive,type-1).length * 2;
		} else if (type == 4) {	
			unit = common.ZH(numActive,type-1).length;
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
		var titleName = trim($("#typeList .item.active span").html());
		if (titleName == '和值') {
			titleName = '直选和值'
		}
		var selectContent = setSelectNum();
		addToStorage({
			title: titleName,
			selectContent: selectContent,
			unit: unit
		})
		common.locationUrl("#fc3d&bet=ture");
	}
	
	//记录当前选择的数字
	function setSelectNum() {
		var activeLi;
		var selectContent = [];
		if (type == 1) {
			var activeFn = $("#firstNum li.active"),
			activeSn = $("#secondNum li.active"),
			activeTn = $("#thirdNum li.active"),
			a = [],
			b = [],
			c = [];
			activeFn.each(function(i, item) {
				var num1 = $(item).find('.num').html();
				a.push(num1)
			});
			activeSn.each(function(i, item) {
				var num2 = $(item).find('.num').html();
				b.push(num2)
			});
			activeTn.each(function(i, item) {
				var num3 = $(item).find('.num').html();
				c.push(num3)
			});
			if (a.length > 0 && b.length > 0 && c.length > 0) {
				selectContent.push(a.join(" ") + ' | ' + b.join(" ") + ' | ' + c.join(" "));
			}
		} else {
			activeLi =  $("#numBox li.active");
			activeLi.each(function(i, item) {
				var num = $(item).find('.num').html();
				selectContent.push(num);
			});
		}
		return selectContent;
	}
	
	function setFc3dList() { //设置列表
		var selectContent = getCartItems();
		if (!selectContent || selectContent.length <= 0) {
			common.historyBack();
			return;
		}
		var data = {
			selectContent: selectContent
		}
		$("#fc3dList").html(fc3dView.fc3dList(data));
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
		$('#fc3dList .del_btn').on('click', function(e) {
			var parentObj = $(this).parents('li');
			parentObj.remove();
			var compare = parentObj.attr("compare");
			var items = getCartItems(),
		    nitems = [];
		    items.forEach(
		    function(n, i) {
		        n.title + n.selectContent.join(' ') != compare && nitems.push(n)
		    });
            var strItems = JSON.stringify(nitems);
            localData.set(fc3dCartKey, strItems);
			setTotalAmount();
		})
	}
	
	function getLotteryIssueInfo() {
		var options = {
			lotteryId: "FC3D"
		}
		lotteryCgi.lotteryIssueInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data;
			var issue = data.issue;
			var countDown = data.countDown;
			var endTime = data.endTime;
			endTime = endTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1");
			$("#time").html(endTime);
			$("#issue").html(issue);
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
    	var titleMap = {'直选' : 'ZHX','直选和值' : 'ZHXHZ','组三' : 'ZU3','组六' : 'ZU6'};
    	var items = getCartItems();
    	var betContent = [];
    	items.forEach(
        function(n, i) {
			if (n.title == '直选') {
        		n.selectContent = n.selectContent.join("").split("|")[0].trim().split(" ")+ '|' + n.selectContent.join("").split("|")[1].trim().split(" ") + '|' + n.selectContent.join("").split("|")[2].trim().split(" ");
        	} else {
        		n.selectContent = n.selectContent.join(",")
        	}
            betContent.push(titleMap[n.title] + ":" + n.selectContent);
        });
    	betContent = betContent.join(";");
    	var options;
    	if (planNo) {
    		options = {
	    		ticketMultiple: ticketMultiple,
	    		planNo: planNo
	    	}
    	} else {
    		options = {
	    		ticketMultiple: ticketMultiple,
	    		issue: issue,
	    		lotteryId: "FC3D",
	    		betContent: betContent
	    	}
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
			localData.remove(fc3dCartKey);
		})
   	}
	
	function ensureSelectRecommend() {
		var selectContent = setSelectNum();
		if (selectContent.length <= 0) {
			ui.showNotice("请选择推荐内容");
			return
		}
		var titleName = trim($("#typeList .item.active span").html());
		var issue = parseInt($("#issue").html());
		addToStorage({
			issue: issue,
			title: titleName,
			selectContent: selectContent
		})
		common.locationUrl("#editDigitalPlan");
	}
});	