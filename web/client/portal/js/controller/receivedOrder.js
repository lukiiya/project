define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var smsCgi = require('cgi/sms');
	var userCgi = require('cgi/user');
	var receivedOrderView = require('view/receivedOrder');
	var orderNo = null;
	var self = null;
	var pageNum = null;
	var pageSize = null;
	var presentRemark = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || '';
		self = trim(common.getUrlParam("self")) || '';
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
		pageNum = null;
		pageSize = null;
		self = null;
		presentRemark = null;
	}

	function setMain(view) {
		var options = {
			title: "双色球红包",
			className: 'ssqhb',
			showHeader: true,
			rightButtonText: '分享',
			rightButtonFun: ssqhbShare
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(receivedOrderView.content(data));
//		if (!self) {
//			$("#pageContainer").append(receivedOrderView.ssqhbBanner(data));
//		}
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark || '快来领双色球红包'
			}
			ui.setShare(data);
		}
		$("#ssqhbDownload").on('click', function() {
			common.locationUrl('#lotteryHall');
		})
		$("#closeSsqHbBanner").on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('#ssqhbDownload').remove()
		})
	}

	function setContent() {
		presentOrderInfo();
		receivedOrderList();
	}
	
	function presentOrderInfo() {
		var options = {
			orderNo: orderNo
		}
		orderCgi.presentOrderInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var presentOrderInfo = ret.data || {};
			var receivedOrderNo = presentOrderInfo.receivedOrderNo;
			var presentNum = presentOrderInfo.presentNum;
			var presentReceived = presentOrderInfo.presentReceived;
			presentRemark = presentOrderInfo.presentRemark || '快来抢红包';
			var presentStatus = presentOrderInfo.presentStatus;
			var user = presentOrderInfo.user || {};
			var nickName = user.nickName;
			var realName = user.realName;
			var userName = realName || nickName;
			var data = {
				presentOrderInfo: presentOrderInfo,
				IMG_PATH: IMG_PATH,
				self: self
			}
			$("#presentOrderInfo").html(receivedOrderView.presentOrderInfo(data));
			if (presentStatus == 3) {
				$("#receiveTitle").html('共' + presentNum + '红包，' + (presentNum - presentReceived) + '个已过期退款');
			} else {
				$("#receiveTitle").html('已领取' + presentReceived + '/' + presentNum + '个');
			}
			if (!receivedOrderNo) {
				$("#receiveBtn").on('click', function() {
					receiveOrder();
					common.setCache('ssqhbUserName',userName);
				})
			} else {
				$("#receivedBtn").on('click', function() {
					common.locationUrl("#ticketOrderDetail&orderNo=" + receivedOrderNo);
				});
			}
			$("#shareBtn").on('click', function() {
				ssqhbShare();
			});
			$("#continuePresent").on('click', function() {
				common.locationUrl("#createPresentOrder");
			});
		})
	}
	
	function receivedOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			type: 1,
			pageNum: pageNum,
			pageSize: pageSize,
			orderNo: orderNo
		}
		orderCgi.receivedOrderList(options, function(ret) {
			if (ret.errCode != 0) {
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
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#receiveList").append(receivedOrderView.receiveList(data));
			} else {
				$("#receiveList").html(receivedOrderView.receiveList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		receivedOrderList(true)
	}
	
	function receiveOrder() {
		var options = {
			orderNo: orderNo,
			noJumpLogin: true
		}
		orderCgi.receiveOrder(options, function(ret) {
			if (ret.errCode == 1) {
				showSsqHbMask()
			} else {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				common.locationUrl("#receivedOrderSuccess");
			}
		})
	}
	
	function ssqhbShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark
			});
		} else if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_received.postMessage({
    			title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark
    		});
		}
	}
	
	function sendSmsCode() {
		var mobile = trim($('#mobile').val()) || '';
		var code = trim($('#validate').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		var options = {
			mobile: mobile,
			code: code
		}
		smsCgi.sendSmsCode(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			$('#smsCodeBtn').off();
			var count = 60;
			var timer = function() {
				count--;
				if (count > 0) {
					$('#smsCodeBtn').html('倒计时('+count+')');
					sendSmsCode.timer = setTimeout(timer, 1000);	
				} else {
					$('#smsCodeBtn').html('重新获取').on('click', showConfirm);		
				}
			}
			timer();
			closeConfirm();
		});
	}
	
	function showSsqHbMask() {
		closeSsqHbMask();
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#pageContainer").append(receivedOrderView.ssqhbMaskBox(data));
		$('#smsCodeBtn').on('click', showConfirm);
		$("#loginSubmit").on("click", loginSubmit);
		$("#closePopBtn").off().on("click", closeSsqHbMask);
	} 

	function closeSsqHbMask() { 
		$("#ssqhbMask").remove();
		clearTimeout(sendSmsCode.timer);
	}
	
	function loginSubmit() {
		var mobile = trim($('#mobile').val()) || '';
		var smsCode = trim($('#smsCode').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		if (smsCode.length != 6 || /\D/.test(smsCode)) {
			ui.showNotice('输入的验证码有误');
			return;	
		}
		var options = {
			mobile: mobile,
			code: smsCode
		}
		userCgi.mobileToggleUser(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			} else {
				ui.showNotice('登录成功');
				closeSsqHbMask();
			}
		});
	}
	
	function showConfirm() {
		var mobile = trim($('#mobile').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		closeConfirm();
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#pageContainer").append(receivedOrderView.confirm(data));
		$("#sureBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sendSmsCode();
		});
		$("#cancelBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeConfirm();
		});
		getVerificationImg();
		$('#validateImage').on('click', function() {
			getVerificationImg();
		})
	}

	function closeConfirm(){
		$("#confirmBox").remove();
	}
	
	function getVerificationImg() {
		$("#validateImage").attr('src', PROXY + '?c=verificationCode&m=image&_' + new Date().getTime())
	}
});