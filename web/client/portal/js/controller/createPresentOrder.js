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
	var userCgi = require('cgi/user');
	var createPresentOrderView = require('view/createPresentOrder');
	var userName = null;

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		userName = null;
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
		main.setContent(createPresentOrderView.content(data));
		$("#payBtn").on('click', createPresentOrder);
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			}
		});
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '领取新年红包',
				link: location.href.replace(/[#\?].*/g, '') + '#createPresentOrder',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '送你一份价值500万的新年红包，祝你2018心想事成，财源滚滚。'
			}
			ui.setShare(data);
		}
		$("#presentNum").on('input', function() {
			var presentNum = parseInt(this.value) || 0;
			$("#prize").html(presentNum*2);
		});
	}

	function setContent() {
		getUserInfo()
	}
	
	function setTab() {
		var tab;
		var tabList = $('#greetingBtn li');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr('tab')) || 1;
			if (tab == 1) {
//				$("#presentRemark").val(userName + '祝你财源广进，2元可中1000万！')
				$("#presentRemark").val(userName + '祝你新年快乐：送你一份价值500万的新年红包，祝你2018心想事成，财源滚滚。')
			} else if (tab == 2) {
//				$("#presentRemark").val(userName + '祝你节日快乐，500万大奖等你拿！')
				$("#presentRemark").val(userName + '祝你财源滚滚：今年过年不送礼，新年红包表惊喜；美满幸福浴春风，百万大奖等着你')
			} else if (tab == 3) {
//				$("#presentRemark").val(userName + '财色双收，广发双色球，霉运都带走，好运祝常有！')
				$("#presentRemark").val(userName + '祝你年年有余：送你一份价值500万的新年红包，祝你新的一年吉星高照，好运连连，事业攀高！')
			} else if (tab == 4) {
//				$("#presentRemark").val(userName + '天天中奖，广发双色球，一起沾沾手气！')
				$("#presentRemark").val(userName + '祝你名利双收：富贵吉祥加如意，财神已经盯上你，红包里头百万金，新的一年—大吉大利！')
			}
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
	
	function createPresentOrder() {
		var presentNum = parseInt($("#presentNum").val());
		var presentRemark = trim($("#presentRemark").val());
		common.setCache('ssqhbRemark',presentRemark);
		if (isNaN(presentNum) || presentNum <= 0) {
			ui.showNotice("请输入赠送人数");
			return;	
		}
		if (!presentRemark) {
			ui.showNotice("请输入祝福语");
			return;		
		}
		var options = {
			presentNum: presentNum,
			presentRemark: presentRemark	
		}
		orderCgi.createPresentOrder(options, function(ret) {
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
						common.locationUrl("#presentOrderSuccess&orderNo=" + orderNo);
					}, 1000);
				}
			} else {
				ui.showNotice("支付失败");	
			}
		})
	}
	
	function ssqhbShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '领取新年红包',
				link: location.href.replace(/[#\?].*/g, '') + '#createPresentOrder',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '送你一份价值500万的新年红包，祝你2018心想事成，财源滚滚。'
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '领取新年红包',
				link: location.href.replace(/[#\?].*/g, '') + '#createPresentOrder',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '送你一份价值500万的新年红包，祝你2018心想事成，财源滚滚。'
			});
		} else if (common.isIosBrowser() && common.isIos()) {
//  		window.webkit.messageHandlers.ssqHbShare_create.postMessage({
//  			title: '发红包就发双色球红包',
//				link: location.href.replace(/[#\?].*/g, '') + '#createPresentOrder',
//				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
//				desc: '送个1000万的希望给TA'
//  		});
			window.webkit.messageHandlers.ssqHbShare_create.postMessage({
    			title: '领取新年红包',
				link: location.href.replace(/[#\?].*/g, '') + '#createPresentOrder',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '送你一份价值500万的新年红包，祝你2018心想事成，财源滚滚。'
    		});
		}
	}
	
	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var realName = trim(user.realName) || "";
			var nickName = trim(user.nickName) || "";
			userName = realName || nickName;
			setTab();
		});
	}
});