define(function(require,exports) {

	exports.clear = clear;
	exports.showMask = showMask;
	exports.closeMask = closeMask;
	exports.showLoading = showLoading;
	exports.closeLoading = closeLoading;
	exports.showNotice = showNotice;
	exports.showAlert = showAlert;
	exports.closeAlert = closeAlert;
	exports.showAttention = showAttention;
	exports.closeAttention= closeAttention;
	exports.showConfirm = showConfirm;
	exports.closeConfirm = closeConfirm;
	exports.showWindow = showWindow;
	exports.closeWindow= closeWindow;
	exports.showShare = showShare;
	exports.closeShare = closeShare;
	exports.setShare = setShare;
	exports.showCreateOrder = showCreateOrder;
	exports.closeCreateOrder = closeCreateOrder;
	exports.showCreateTicketOrder = showCreateTicketOrder;
	exports.closeCreateTicketOrder = closeCreateTicketOrder;
	exports.showCreateDigitalTicketOrder = showCreateDigitalTicketOrder;
	exports.createDigitalTicketSubmit = createDigitalTicketSubmit;
	exports.closeCreateDigitalTicketOrder = closeCreateDigitalTicketOrder;
	exports.callIosShare = callIosShare;

	var common = require('module/common');
	var uiView = require('view/ui');
	var orderCgi = require('cgi/order');

	function clear(){
		$(".mask").remove();
		//清除body留下的弹框
		for(var name in exports){
			if(/^close/ig.test(name)){
				if(isFunction(exports[name]))exports[name]();
			}
		}
	}

	function showMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		var zIndex = options.zIndex || 2;
		var opacity = options.opacity || 0.6;
		var onClick = (isFunction(options.onClick) && options.onClick) || function(){};
		$("body").children(".mask").each(function(){
			if(id == this.id)$(this).remove();
		});
		$("body").append(uiView.mask({
			id: id,
			zIndex: zIndex,
			opacity: opacity,
			filter: opacity*100,
			canClose: isFunction(options.onClick)
		}));
		$("#"+id).off().on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			onClick();
		});
	}

	function closeMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		$("#"+id).remove();
	}

	function showLoading(time){
		time = time || 10*1000;
		closeLoading();
		$("body").append(uiView.loading());
		showLoading.timer = setTimeout(closeLoading, time);	
	}

	function closeLoading() {
		clearTimeout(showLoading.timer);
		$("#loadingBox").remove();		
	}

	function showNotice(text, time) {
		time = time || 1000;
		$("#noticeBox").remove();
		var data = {
			text: text
		}
		$("body").append(uiView.notice(data));
		$("#noticeBox").fadeIn(500, function() {
			clearTimeout(showNotice.timer);
			showNotice.timer = setTimeout(function() {
				$("#noticeBox").fadeOut(1000);
			},time);
 		});
	}

	function showAlert(text, sureFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		closeAlert();
		var data = {
			text: text
		}
		$("body").append(uiView.alert(data));
		$("#alertBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
			closeAlert();
		});
	}

	function closeAlert(){
		$("#alertBox").remove();
	}

	function showAttention(text) {
		text = $.trim(text) || "";
		closeAttention();
		var data = {
			text: text
		}
		$("body").append(uiView.attention(data));
	}

	function closeAttention(){
		$("#attentionBox").remove();
	}

	function showConfirm(text, sureFun, cancelFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		cancelFun = cancelFun || function() {};
		closeConfirm();
		var data = {
			text: text
		}
		$("body").append(uiView.confirm(data));
		$("#sureBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
		});
		$("#cancelBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			cancelFun();
			closeConfirm();
		});
	}

	function closeConfirm(){
		$("#confirmBox").remove();
	}

	function showWindow(options) {
		options = options || {};
		var html = $.trim(options.html) || "";
		closeWindow();
		var data = {
			html: html
		}
		$("body").append(uiView.window(data));
	}

	function closeWindow(){
		$("#windowBox").remove();
	}

	function getDefaultShare() {
		var user = common.getLoginUser();
		var spreaderUserNo = trim(user && user.userNo || '');
		var protocol = trim(location.protocol);
		var host = trim(location.host);
		var pathname = trim(location.pathname);
		var search = trim(location.search);
		var hash = trim(location.hash);
		//更换推荐人
		search = search.replace(/spreaderUserNo=[^&=#]*/g, '');
		if (search.indexOf('?') == -1) {
			search += '?spreaderUserNo=' + spreaderUserNo;
		} else {
			search += '&spreaderUserNo=' + spreaderUserNo;
		}
		var href = protocol + '//' + host + pathname + search + hash;
		href = href.replace(/&&/g, '&');
		href = href.replace(/\?&/g, '?');
		var data = {
			title: '晒米场',
			link: href,
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/share_logo.jpg',
			desc: '预测推荐，专业可依靠',
			success: function() {
				closeShare();
			},
			cancel: function() {
				closeShare();
			}
		}
		return data;	
	}

	function setShare(data) {
		var weixin = require('module/weixin');
		data = data || {};
		var shareData = getDefaultShare();
		if (data.title) {
			shareData.title = data.title;	
		}
		if (data.link) {
			shareData.link = data.link;	
		}
		if (data.imgUrl) {
			shareData.imgUrl = data.imgUrl;	
		}
		if (data.desc) {
			shareData.desc = data.desc;	
		}
		if (data.success) {
			var shareDataSuccess = shareData.success;
			shareData.success = function() {
				shareDataSuccess();
				data.success();
			}
		}
		if (data.cancel) {
			var shareDataCancel = shareData.cancel;
			shareData.cancel = function() {
				shareDataCancel();
				data.cancel();
			}
		}
		weixin.call("onMenuShareAppMessage", shareData);
		var shareTimelineData = JSON.parse(JSON.stringify(shareData));
		shareTimelineData.title = shareTimelineData.title + '：' + shareTimelineData.desc;
		weixin.call("onMenuShareTimeline", shareTimelineData);
	}

	function showShare(data) {
		closeShare();
		if (data) {
			setShare(data);	
		}
		if (common.isWeixinBrowser()) {
			$("body").append(uiView.share());
		}
		$("#shareBox").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeShare();
		});
	}

	function closeShare(data) {
		if (data) {
			setShare(data);	
		}
		$("#shareBox").remove();
	}

	function showCreateOrder(data) {
		closeConfirm();
		var planNo = trim(data.planNo) || "";
		var amount = parseInt(data.amount) || 0;
		var planType = parseInt(data.planType) || 1;
		var callback = data.callback || function () {};
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		showConfirm("需支付" + amount + "粒米查看专家推荐<br>(1粒米=1元)", function sure() {
			var spreaderUserNo = trim(common.getUrlParam("spreaderUserNo")) || '';
			var options = {
				planNo: planNo,
				spreaderUserNo: spreaderUserNo,
				planType: planType
			}
			orderCgi.createOrder(options, function(ret) {
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
							callback();
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						showNotice('支付成功');
						setTimeout(function() {
							callback();
							if (planType == 1) {
								common.locationUrl("#planDetail&planNo=" + planNo);
							} else if (planType == 2) {
								common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
							}
						}, 1000);
					}
				} else {
					showNotice("支付失败");	
				}
			});
		}, function cancel() {

		});
	}

	function closeCreateOrder() {
		closeConfirm();
	}

	function showCreateTicketOrder(data) {
		closeCreateTicketOrder();
		$("body").append(uiView.createTicketOrder(data));
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var isSelfFollow = data.isSelfFollow || false;
		var baseTicketMultiple;
		if (isSelfFollow) {
			baseTicketMultiple = 1;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else {
			baseTicketMultiple = 10;
		}
		if (planAmount == 18) {
			baseTicketMultiple = 20;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 28) {
			baseTicketMultiple = 30;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 38) {
			baseTicketMultiple = 40;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 58) {
			baseTicketMultiple = 50;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 88) {
			baseTicketMultiple = 100;
			$("#ticketMultiple").val(baseTicketMultiple);
		}
		$("#closeCreateTicketOrder").on('click', closeCreateTicketOrder)
		$('#ticketMultiple').keypress(function(e) { //禁止输入符号
			if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
			    return false;
			}
		});
		$("#ticketMultiple").on('input', ticketMultipleChange).trigger('input');//触发一次input事件
		$("#addTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple += baseTicketMultiple;
			ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$("#decreaseTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple -= baseTicketMultiple;
			ticketMultiple = ticketMultiple < baseTicketMultiple ? baseTicketMultiple : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$('#userVerifyProtocol').on('click', function () {
			common.locationUrl("#userVerifyProtocol&type=3");
		});
		$('#createTicketSubmit').on('click', createTicketSubmit);
	}

	function ticketMultipleChange(e) {
		var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds")) || 0;
		var recommendCount = parseInt($(this).attr("recommendCount")) || 0;
		var ticketMultiple = parseInt(this.value) || 0;
		var ticketAmount = ticketMultiple*recommendCount*2;
		var maxPrize = (maxBettypeOdds*2*ticketMultiple).toFixed(2);
		$("#ticketAmount").html(ticketAmount);
		$("#maxPrize").html(maxPrize);	
	}

	function createTicketSubmit() {
		var planNo = trim($(this).attr("planNo"));
		var protocol = $('#protocol')[0].checked;
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var planType = $("#ticketMultiple").attr("planType") || 1;
		var isSelfFollow = $("#ticketMultiple").attr("isSelfFollow") || false;
		if (!protocol) {
			showNotice("请阅读并同意代购协议");
			return;	
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			showNotice('总金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple < 10 && !isSelfFollow) {
			showNotice('投注倍数最小为10，请重新输入');
			return;
		} else if (planAmount == 18 && ticketMultiple < 20) {
			showNotice('跟单此方案最低20倍');
			return;
		} else if (planAmount == 58 && ticketMultiple < 50) {
			showNotice('跟单此方案最低50倍');
			return;
		} else if (planAmount == 88 && ticketMultiple < 100) {
			showNotice('跟单此方案最低100倍');
			return;
		}
		if (ticketMultiple > 100000) {
			showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		// showConfirm("需支付" + ticketAmount + "元", function sure() {
			var options = {
				ticketMultiple: ticketMultiple,
				planNo: planNo,
				planType: planType
			}
			orderCgi.createTicketOrder(options, function(ret) {
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
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					showNotice("支付失败");
				}
			});
		/*}, function cancel() {

		});	*/
	}

	function closeCreateTicketOrder() {
		$("#createTicketOrderBox").remove();
	}
	
	function showCreateDigitalTicketOrder(data) {
		closeCreateDigitalTicketOrder();
		$("body").append(uiView.createDigitalTicketOrder(data));
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var baseTicketMultiple = 1;
		$("#ticketMultiple").val(baseTicketMultiple);
		$("#closeCreateTicketOrder").on('click', closeCreateTicketOrder)
		$('#ticketMultiple').keypress(function(e) { //禁止输入符号
			if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
			    return false;
			}
		});
		$("#ticketMultiple").on('input', ticketMultipleChange).trigger('input');//触发一次input事件
		$("#addTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple += baseTicketMultiple;
			ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$("#decreaseTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple -= baseTicketMultiple;
			ticketMultiple = ticketMultiple < baseTicketMultiple ? baseTicketMultiple : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$('#userVerifyProtocol').on('click', function () {
			common.locationUrl("#userVerifyProtocol&type=3");
		});
		$('#createTicketSubmit').on('click', createDigitalTicketSubmit);
	}


	function createDigitalTicketSubmit() {
		var planNo = trim($(this).attr("planNo"));
		var protocol = $('#protocol')[0].checked;
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		if (!protocol) {
			showNotice("请阅读并同意代购协议");
			return;	
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			showNotice('总金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple < 1) {
			showNotice('投注倍数最小为1，请重新输入');
			return;
		}
		if (ticketMultiple > 100000) {
			showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		// showConfirm("需支付" + ticketAmount + "元", function sure() {
			var options = {
				ticketMultiple: ticketMultiple,
				planNo: planNo
			}
			orderCgi.createDigitalTicketOrder(options, function(ret) {
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
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					showNotice("支付失败");
				}
			});
		/*}, function cancel() {

		});	*/
	}

	function closeCreateDigitalTicketOrder() {
		$("#createTicketOrderBox").remove();
	}
	
	function callIosShare(data) {
		if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_create.postMessage({
    			title: data.title,
				link: data.link,
				imgUrl: data.imgUrl,
				desc: data.desc
    		});
		}
	}
});