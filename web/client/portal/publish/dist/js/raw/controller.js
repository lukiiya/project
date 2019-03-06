define('controller/activity/award11x5',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var award11x5View = require('view/activity/award11x5');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "11选5加奖",
			className: 'activity_11x5jj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(award11x5View.content(data));
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("GX11X5");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/GX11X5"
		    	});
			} else {
				common.locationUrl("#gx11x5");
			}
		})
	}

	function setContent() {
		
	}
});
define('controller/activity/award2x1',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var award2x1View = require('view/activity/award2x1');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞彩好礼",
			className: 'activity_2x1'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(award2x1View.content(data));
	}

	function setContent() {
		
	}
});
define('controller/activity/awardCrazy',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardCrazyView = require('view/activity/awardCrazy');
	var rules = null;

	function init(view) {
		rules = common.getUrlParam("rules") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		rules = null;
	}

	function setMain(view) {
		var options = {
			title: rules ? "活动规则" : "疯狂加奖",
			className: 'activity_awardCrazy',
			showHeader: !!rules,
			isLeftIconHeader: !!rules
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (rules) {
			main.setContent(awardCrazyView.activityRules(data));
		} else {
			main.setContent(awardCrazyView.activityCotent(data));
		}
		$("#rulesBtn").on('click', function() {
			common.locationUrl("#activity/awardCrazy&rules=true");
		})
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JCZQ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JCZQ"
		    	});
			} else {
				common.locationUrl('#match&self=true&type=1');
			}
		})
	}

	function setContent() {
		
	}
});
define('controller/activity/awardJsk3',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardJsk3View = require('view/activity/awardJsk3');
	var webCalliOS = null;

	function init(view) {
		webCalliOS = parseInt(common.getUrlParam("webCalliOS")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		webCalliOS = null;
	}

	function setMain(view) {
		var options = {
			title: "快3加奖",
			className: 'activity_k3jj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(awardJsk3View.content(data));
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		}
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JSK3");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JSK3"
		    	});
			} else {
				common.locationUrl("#JSK3");
			}
		})
	}

	function setContent() {
		
	}
});
define('controller/activity/awardSingle',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardSingleView = require('view/activity/awardSingle');
	var webCalliOS = null;

	function init(view) {
		webCalliOS = parseInt(common.getUrlParam("webCalliOS")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		webCalliOS = null;
	}

	function setMain(view) {
		var options = {
			title: "单关加奖",
			className: 'activity_single_award'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(awardSingleView.content(data));
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		};
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JCZQ");
			} else if (common.isIosBrowser() && common.isIos()) {
			window.webkit.messageHandlers.appDelegate.postMessage({
    			name: "shaimi://bet/JCZQ"
	    	});
			} else {
				common.locationUrl('#match&self=true&type=1');
			}
		})
	}

	function setContent() {
		
	}
});
define('controller/activity/awardSsq',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var awardSsqView = require('view/activity/awardSsq');
	var webCalliOS = null;

	function init(view) {
		webCalliOS = parseInt(common.getUrlParam("webCalliOS")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		webCalliOS = null;
	}

	function setMain(view) {
		var options = {
			title: "晒米场－双色球加奖",
			className: 'activity_ssqjj'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(awardSsqView.content(data));
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		};
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("SSQ");
			} else if (common.isIosBrowser() && common.isIos()) {
		    	window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/SSQ"
		    	});
			} else {
				common.locationUrl("#ssq");
			}
		})
	}

	function setContent() {
		
	}
});
define('controller/activity/betPresent',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var betPresentView = require('view/activity/betPresent');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞彩好礼",
			className: 'activity_jingcaihaoli'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(betPresentView.content(data));
		$('#rechargeCashBtn').on('click', function() {
			common.locationUrl('#charge&financeType=1');
			window.Jockey && window.Jockey.send("chargeCJ");
		});
		$('#buyjczq').on('click', function() {
			common.locationUrl('#hotMatch');
			window.Jockey && window.Jockey.send("buyFBMatch");
		});
		$('#trunplateBtn').on('click', function() {
			common.locationUrl('#activity/turnplate');
			window.Jockey && window.Jockey.send("luckDraw");
		});
		$('#rechargeRiceBtn').on('click', function() {
			common.locationUrl('#charge&financeType=0');
			window.Jockey && window.Jockey.send("chargeML");
		});
	}

	function setContent() {
		
	}
});
define('controller/activity/christmas',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var christmasView = require('view/activity/christmas');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "晒米场－英超圣诞赛程投注手册",
			className: 'activity_christmas'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(christmasView.content(data));
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}
	
	function share() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			});
		} else if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_received.postMessage({
    			title: '英超圣诞赛程投注手册',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/christmas',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_christmas_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
    		});
		}
	}
});
define('controller/activity/confederationsCup',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var confederationsCupView = require('view/activity/confederationsCup');
	var teamId = null;

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		teamId = null;
	}

	function setMain(view) {
		var options = {
			title: "联合会杯竞猜",
			className: 'activity_FCC'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(confederationsCupView.content(data));
		$("#teamList li").on('click', function() {
			$("#teamList li").removeClass('active');
			$(this).addClass('active');
			teamId = parseInt($(this).attr('teamId'));
		})
		$("#submitBtn").off().on('click', submit);
		$("#newUser").on('click', function() {
			common.locationUrl("#my");
		});
		$("#recharge").on('click', function() {
			common.locationUrl("#activity/betPresent");
		});
		$("#award2x1").on('click', function() {
			common.locationUrl("#activity/award2x1");
		});
		pageShare();
	}

	function setContent() {
		guessInfo()
	}
	
	function submit() {
		var options = {
    		teamId: teamId
    	}
		if (!teamId) {
			ui.showNotice('请选择一个球队')
			return;
		}
		activityCgi.guessWinner(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('您已投票成功');
			setTimeout(guessInfo, 1000);
			$("#teamList li").removeClass('active');
		})
	}
	
	function guessInfo() {
		var options = {
    	
    	}
		activityCgi.guessInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var teamGuessList = data.teamGuessList || [];
			var userGuessData = data.userGuessData || {};
			var teamName = userGuessData.teamName || '无';
			$("#guessResult").html(teamName);
			for (var i = 0;i < teamGuessList.length;i++) {
				var teamId = teamGuessList[i].teamId;
				var guessRate = teamGuessList[i].guessRate;
				$("#team" + teamId + " .progress_bar").css('width', guessRate);
				$("#team" + teamId + " .percent").html(guessRate)
			}
			if (!userGuessData['teamId']) {
				$("#submitBtn").show();
				$("#activeBtn").hide();
			} else {
				$("#activeBtn").show();
				$("#submitBtn").hide();
			}
		})
	}

	function pageShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '联合会杯冠军竞猜 1888等你拿',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/confederationsCup',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '大家一起来竞猜冠军'
			}
			ui.setShare(data);
		}
	}
});
define('controller/activity/hongBao',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var smsCgi = require('cgi/sms');
	var hongBaoView = require('view/activity/hongBao');
	var activityNo = '5F5E100-BC614F';

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
		setPageShare();
	}

	function _init(view) {
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "100万红包",
			className: 'Bonus'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(hongBaoView.content(data));
		$('#hongBaoSubmit').on('click', hongBaoSubmit);
		$('#smsCodeBtn').on('click', sendSmsCode);
	}


	function setContent() {
		getActivityInfo();
		isReceiveHongBao();
	}

	function setPageShare() {
		var data = {
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/hongbao.png',
			desc: '有人@你领红包 立即到账'
		}
		ui.setShare(data);
	}

	function getActivityInfo() {
		var options = {
			activityNo: activityNo
		}
		activityCgi.getActivityInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data || {};
			var remark = trim(activity.remark) || "";
			$('#remark').html(remark);
		});
	}

	function isReceiveHongBao() {
		var options = {};
		activityCgi.isReceiveHongBao(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || false;
			if (data) {
				var options = {
					html: hongBaoView.again()
				}
				ui.showWindow(options);
				$('#windowBox .use_immediate').on('click', function(e) {
					common.locationUrl('#home');
				});
			}
		});
	}

	function sendSmsCode () {
		var mobile = trim($('#mobile').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		var options = {
			mobile: mobile
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
					$('#smsCodeBtn').html('重新获取').on('click', sendSmsCode);		
				}
			}
			timer();
		});
	}

	function hongBaoSubmit() {
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
		activityCgi.receiveHongBao(options, function(ret) {
			if (ret.errCode == 3) {
				var options = {
					html: hongBaoView.again()
				}
				ui.showWindow(options);
				$('#windowBox .use_immediate').on('click', function(e) {
					common.locationUrl('#home');
				});
				return;
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var options = {
				html: hongBaoView.success()
			}
			ui.showWindow(options);
			$('#windowBox .use_immediate').on('click', function(e) {
				common.locationUrl('#home');
			});
		});
	}
});
define('controller/activity/hongBao2017ChunJie',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var smsCgi = require('cgi/sms');
	var hongBao2017ChunJieView = require('view/activity/hongBao2017ChunJie');
	var activityNo = '5F5E103-BC6152';

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "2017春节红包",
			className: 'activity_2017chunjie'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(hongBao2017ChunJieView.content(data));
	}


	function setContent() {
		getActivityInfo();
		isReceiveHongBao2017ChunJie();
	}

	function getActivityInfo() {
		var options = {
			activityNo: activityNo
		}
		activityCgi.getActivityInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data || {};
			var remark = trim(activity.remark) || "";
			$('#remark').html(remark);
		});
	}

	function isReceiveHongBao2017ChunJie() {
		var options = {
			IMG_PATH: IMG_PATH
		};
		activityCgi.isReceiveHongBao2017ChunJie(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || false;
			if (data) {
				$("#unReceivedImg").hide();
				$("#receivedImg").show();
			} else {
				$("#receivedImg").hide();
				$("#unReceivedImg").off().on("click", receiveHongBao2017ChunJie).show();
			}
		});
	}

	function receiveHongBao2017ChunJie() {
		var mobile = '';
		var code = '';
		if ($('#validateMobile').length > 0) {
			mobile = trim($('#mobile').val()) || '';
			code = trim($('#smsCode').val()) || '';
			if (!common.verifyMobile(mobile)) {
				ui.showNotice('输入的手机号码有误');
				return;
			}
			if (code.length != 6 || /\D/.test(code)) {
				ui.showNotice('输入的验证码有误');
				return;	
			}
		}
		var options = {
			mobile: mobile,
			code: code
		}
		activityCgi.receiveHongBao2017ChunJie(options, function(ret) {
			if (ret.errCode == 0) {
				showSuccessBox();
				isReceiveHongBao2017ChunJie();
			} else if (ret.errCode == 2) {
				showRiceBox();
			} else if (ret.errCode == 4) {
				showBindMobieBox();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function sendSmsCode () {
		var mobile = trim($('#mobile').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		var options = {
			mobile: mobile
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
					$('#smsCodeBtn').html('重新获取').on('click', sendSmsCode);		
				}
			}
			timer();
		});
	}


	function showBindMobieBox() {
		closeBindMobieBox();
		var data = {
			html: hongBao2017ChunJieView.validateMobileBox({
				IMG_PATH: IMG_PATH
			})
		}
		$("#pageContainer").append(hongBao2017ChunJieView.chunjieMask(data));
		$('#smsCodeBtn').on('click', sendSmsCode);
		$("#hongBaoSubmit").on("click", receiveHongBao2017ChunJie);
		$("#closePopBtn").off().on("click", closeBindMobieBox);
	} 

	function closeBindMobieBox(){
		$("#2017chunjieMask").remove();
	}

	
	function showRiceBox() {
		closeRiceBox();
		var data = {
			html: hongBao2017ChunJieView.getRiceBox({
				IMG_PATH: IMG_PATH
			})
		}
		$("#pageContainer").append(hongBao2017ChunJieView.chunjieMask(data));
		$("#getRiceBtn").off().on("click", function() {
			common.locationUrl('#sign');
		});
		$("#closePopBtn").off().on("click", closeRiceBox);
	} 

	function closeRiceBox(){
		$("#2017chunjieMask").remove();
	}

	function showSuccessBox() {
		closeSuccessBox();
		var data = {
			html: hongBao2017ChunJieView.getSuccessBox({
				IMG_PATH: IMG_PATH
			})
		}
		$("#pageContainer").append(hongBao2017ChunJieView.chunjieMask(data));
		$('#betBtn').on('click', function(e) {
			common.locationUrl('#ticketFollow');
		});
		$("#closePopBtn").off().on("click", closeSuccessBox);
	} 

	function closeSuccessBox(){
		$("#2017chunjieMask").remove();
	}
});
define('controller/activity/hongBao2018ChunJie',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var smsCgi = require('cgi/sms');
	var hongBao2018ChunJieView = require('view/activity/hongBao2018ChunJie');

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		clearTimeout(getHongBao2018ChunJieList.timer);
	}

	function setMain(view) {
		var options = {
			title: "2018春节红包",
			className: 'activity_2018chunjie'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
	}


	function setContent() {
		getHongBao2018ChunJieInfo();
	}

	function getHongBao2018ChunJieInfo() {
		var options = {
			
		}
		activityCgi.getHongBao2018ChunJieInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var info = ret.data || {};
			var data = {
				info: info,
				IMG_PATH: IMG_PATH
			}
			main.setContent(hongBao2018ChunJieView.content(data));
			$("#startBtn").on('click', receiveHongBao2018ChunJie);
			getHongBao2018ChunJieList();
			if (common.isWeixinBrowser()) {
				var data = {
					title: '晒米场红包闹新春',
					link: location.href.replace(/[#\?].*/g, '') + '#activity/hongBao2018ChunJie',
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/2018chunjie/2018chunjie_share.jpg',
					desc: '初一、初五、初七抢168现金红包，人人可抢'
				}
				ui.setShare(data);
			}
		});
	}

	function getHongBao2018ChunJieList() {
		clearTimeout(getHongBao2018ChunJieList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		activityCgi.getHongBao2018ChunJieList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#rankList").html(hongBao2018ChunJieView.rankList(data));
			if (list.length > 0) {
				var textScroll = function() {
					var ul = $("#rankList");
					var li = ul.find("li");
					var length = li.length;
					if (length <= 1) {
						return;
					}
					var firstLi = li.eq(0);
					var height = firstLi.outerHeight(true);
					firstLi.animate({marginTop: -height}, 500, function() {
						firstLi.appendTo(ul).css({marginTop:0});
	            		getHongBao2018ChunJieList.timer = setTimeout(textScroll, 5000);
					});
				};
				getHongBao2018ChunJieList.timer = setTimeout(textScroll, 5000);
			}
		})
	}
	
	function receiveHongBao2018ChunJie() {
		var options = {
			
		}
		activityCgi.receiveHongBao2018ChunJie(options, function(ret) {
			var info = ret.data || {};
			var data = {
				info: info
			}
			if (ret.errCode == -1) {
				showNotStartBox(info);
			} else if (ret.errCode == 0) {
				showSuccessBox(info)
				getHongBao2018ChunJieInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function showNotStartBox(info) {
		closeNotStartBox();
		var data = {
			html: hongBao2018ChunJieView.notStartBox({
				info: info
			})
		}
		$("#pageContainer").append(hongBao2018ChunJieView.chunjieMask(data));
		$("#closePopBtn").off().on("click", closeNotStartBox);
	} 

	function closeNotStartBox(){
		$("#2018chunjieMask").remove();
	}

	function showSuccessBox(info) {
		closeSuccessBox();
		var isAndroid = common.isAndroid();
		var data = {
			html: hongBao2018ChunJieView.getSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info,
				isAndroid: isAndroid
			})
		}
		$("#pageContainer").append(hongBao2018ChunJieView.chunjieMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#myFinance");
			}
		});
		$("#closePopBtn").off().on("click", closeSuccessBox);
	} 

	function closeSuccessBox(){
		$("#2018chunjieMask").remove();
	}
});
define('controller/activity/nbaXsjxl',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var nbaXsjxlView = require('view/activity/nbaXsjxl');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "NBA新赛季巡礼",
			className: 'activity_nbaQdxl'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(nbaXsjxlView.content(data));
		if (common.isWeixinBrowser()) {
			var data = {
				title: '2017-18 NBA新赛季球队巡礼',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/nbaXsjxl',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/NBA_share.jpg',
				desc: '投注NBA加奖10％'
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}
});
define('controller/activity/rechargeSend',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var couponCgi = require('cgi/coupon');
	var rechargeSendView = require('view/activity/rechargeSend');
	var rules = null;

	function init(view) {
		rules = common.getUrlParam("rules") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		rules = null;
		clearTimeout(receiveUserCouponList.timer);
	}

	function setMain(view) {
		var options = {
			title: rules ? "活动规则" : "充20得128元",
			className: 'activity_20send128',
			showHeader: rules ? true : false,
			isLeftIconHeader: rules ? true : false
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (rules) {
			main.setContent(rechargeSendView.activityRules(data));
		} else {
			main.setContent(rechargeSendView.activityCotent(data));
		}
		$("#rulesBtn").on('click', function() {
			common.locationUrl("#activity/rechargeSend&rules=true");
		})
		$("#getBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("chargeCJ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.activityRecharge.postMessage({
	    			financeType: 1
	    		});
			} else {
				common.locationUrl("#charge&financeType=1");
			}
		})
	}

	function setContent() {
		receiveUserCouponList();
		isReceiveUserCoupon();
	}
	
	function receiveUserCouponList() {
		clearTimeout(receiveUserCouponList.timer);
		var options = {};
		couponCgi.receiveUserCouponList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#receiveList").html(rechargeSendView.receiveList(data));
			var textScroll = function() {
				var ul = $("#receiveList");
				var li = ul.find("li");
				var length = li.length;
				if (length <= 1) {
					return;
				}
				var firstLi = li.eq(0);
				var height = firstLi.outerHeight(true);
				firstLi.animate({marginTop: -height}, 500, function() {
					firstLi.appendTo(ul).css({marginTop:0});
            		receiveUserCouponList.timer = setTimeout(textScroll, 1000);
				});
			};
			receiveUserCouponList.timer = setTimeout(textScroll, 1000);
			
		});
	}
	
	function isReceiveUserCoupon() {
		var options = {
			noJumpLogin: true
		};
		couponCgi.isReceiveUserCoupon(options, function(ret) {
			if (ret.errCode == 1) {
				return;
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data;
			if (activity) {
				$('#getBtn').removeClass('get_btn').addClass('getted_btn');
				$('#getBtn').off();
			}
		});
	}
});
define('controller/activity/ttqhb',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var ttqhbView = require('view/activity/ttqhb');

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "天天抢红包",
			className: 'activity_ttqhb'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isWeixinBrowser()) {
			var data = {
				title: '晒米彩票每天一波红包雨',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/ttqhb',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ttqhb/ttqhb_share.jpg',
				desc: '现金、优惠券免费领'
			}
			ui.setShare(data);
		}
	}


	function setContent() {
		getHongBaoDailyInfo();
	}

	function getHongBaoDailyInfo() {
		var options = {
			
		}
		activityCgi.getHongBaoDailyInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var info = ret.data || {};
			var data = {
				info: info,
				IMG_PATH: IMG_PATH
			}
			main.setContent(ttqhbView.content(data));
			$("#startBtn").on('click', receiveHongBaoDaily);
			$("#getCouponBtn1,#getCouponBtn2,#getCouponBtn3").on('click', function() {
				var type = $(this).attr('type');
				receiveCoupon(type)
			});
		});
	}

	function receiveHongBaoDaily() {
		var options = {
			
		}
		activityCgi.receiveHongBaoDaily(options, function(ret) {
			var info = ret.data || {};
			var txt = {'title': '亲，未到开抢时间哦！','content': '每天09:00至23:59可抢','btnTxt': '我知道啦','undercondition': 0};
			var data = {
				info: info,
				txt: txt
			}
			if (ret.errCode == 2) {
				showNotStartBox(txt);
			} else if (ret.errCode == 0) {
				showSuccessBox(info)
				getHongBaoDailyInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function receiveCoupon(type) {
		var options = {
			type: type
		}
		activityCgi.receiveCoupon(options, function(ret) {
			var info = ret.data || {};
			var titleMap = {'1': '每天消费满500元才可领', '2': '每天消费满3000元才可领', '3': '每天消费满8000元才可领'}
			var txt = {};
			if (ret.errCode == 2) {
				txt = {'title': titleMap[type],'content': '','btnTxt': '知道了','undercondition': 1};
			} else if (ret.errCode == 3) {
				txt = {'title': '亲，今天您领取过','content': '每天仅能领取一个优惠券，请明天再来哦','btnTxt': '我知道了','undercondition': 0};
			}
			var data = {
				info: info,
				txt: txt
			}
			if (ret.errCode == 2 || ret.errCode == 3) {
				showNotStartBox(txt);
			} else if (ret.errCode == 0) {
				getCouponSuccessBox(info)
				getHongBaoDailyInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function showNotStartBox(txt) {
		closeNotStartBox();
		var data = {
			html: ttqhbView.notStartBox({
				txt: txt
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$("#closePopBtn").off().on("click", closeNotStartBox);
	} 

	function closeNotStartBox(){
		$("#ttqhbMask").remove();
	}

	function showSuccessBox(info) {
		closeSuccessBox();
		var isAndroid = common.isAndroid();
		var data = {
			html: ttqhbView.getSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info,
				isAndroid: isAndroid
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#my");
			}
		});
		$("#closePopBtn").off().on("click", closeSuccessBox);
	} 

	function closeSuccessBox(){
		$("#ttqhbMask").remove();
	}
	
	function getCouponSuccessBox(info) {
		closeCouponSuccessBox();
		var data = {
			html: ttqhbView.getCouponSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info
			})
		}
		$("#pageContainer").append(ttqhbView.hbMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#my");
			}
		});
		$("#closePopBtn").off().on("click", closeCouponSuccessBox);
	} 

	function closeCouponSuccessBox(){
		$("#ttqhbMask").remove();
	}
});
define('controller/activity/turnplate',function(require, exports) {

	exports.init = init;
	exports._init = _init;
	
	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var turnplateView = require('view/activity/turnplate');
	var pageNum = null;
	var pageSize = null;
	var prizeRecord = null;
	var drawTime = null;//抽奖次数

	function init(view) {
		pageNum = 1;
		pageSize = 20;
		prizeRecord = common.getUrlParam("prizeRecord") || false;
		drawTime = 0;
		setMain(view);
		setContent();
		setPageShare();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		prizeRecord = null;
		drawTime = null;
		clearTimeout(rotateTurnplate.timer);
	}

	function setMain(view) {
		var options = {
			title: prizeRecord ? "抽奖记录" :"大转盘",
			className: prizeRecord ? 'prizeRecord' : 'activity_turnplate',
			showHeader: prizeRecord ? true : false,
			isTurnplateHeader: prizeRecord ? true : false
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.webNavigation.postMessage({
				title: "幸运大转盘",
				colorX: ''
	    	});
	    }
		if (prizeRecord) {
			main.setContent(turnplateView.prizeRecord(data));
			$("#goBack").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
//				common.historyBack();
				common.locationUrl("#activity/turnplate");
				window.Jockey && window.Jockey.send("showTitleBar");
			});
			if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.webNavigation.postMessage({
					title: '',
					colorX: 'e8552d'
		    	});
		    }
			getTurnplateList();
		} else {
			if (!common.isApp()) {
				common.setHistoryBack('#lotteryHall');
			}
			main.setContent(turnplateView.turnplate(data));
			$("#rulesBtn").off().on('click',function() {
				$('#turnplateMask').show();
				$('#rules').slideDown();
			});
			$('#closeRuleBtn').off().on('click',function(e) {
				$('#turnplateMask').hide();
				$('#rules').slideUp();
			});
			$("#prizeRecordBtn").on('click',function() {
				common.locationUrl("#activity/turnplate&prizeRecord=true");
				window.Jockey && window.Jockey.send("hideTitleBar");
			});
			getTurnplateActivityInfo();
		}
	}


	function setContent() {
		
	}

	function setPageShare() {
		var data = {
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/turnplate_logo.png',
			desc: '幸运大转盘 赢球衣和iPhone7！'
		}
		ui.setShare(data);
	}
	
	function setDegree(deg) {
	    $('#rotatebg').css({
	    	'-webkit-transform': 'rotate('+deg+'deg)',
	        '-moz-transform':'rotate('+deg+'deg)',
	        '-o-transform':  'rotate('+deg+'deg)'
	    });
	}
	
	function getTurnplateActivityInfo() {
		var options = {}
		activityCgi.getTurnplateActivityInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data || {};
			var turnplateCount = parseInt(activity.turnplateCount) || 0;
			var remark = trim(activity.remark) || '';
			$("#turnplateCount").html(turnplateCount);
			$("#remark").html(remark);
			$("#start").off().on('click', rotateTurnplate);
		});
	}
	
	function rotateTurnplate() {
		clearTimeout(rotateTurnplate.timer);
		$("#start").off();
		var options = {}
		activityCgi.rotateTurnplate(options, function(ret) {
			var rotate = ret.data || {};
			var data = {
				rotate: rotate,
				IMG_PATH: IMG_PATH
			}
			$("#trunplateNotice").html(turnplateView.trunplateNotice(data));
			$("#closeNotice,#ensure").on('click',function() {
				closeNotice();
			})
			$("#buyPlan").on('click',function() {
				if (common.isAndroid()) {
//					common.locationUrl('shaimi://home');
					window.Jockey && window.Jockey.send("closeWindow");
				} else {
					common.locationUrl('#home');
				}
			})
			if (ret.errCode != 0) {
				var msg = ret.msg || '';
				if (msg.indexOf("没有抽奖机会") != -1) {
					showNotice();
					$("#start").off().on('click', rotateTurnplate);
				}
				return;
			}
			var prizeMap = {
				"twoCj1": "1",
				"thk1": "2",
				"poloShirt": "3",
				"fiveCj": "4",
				"twentyCj": "5",
				"twoCj2": "6",
				"thk2":"7"
			}
			var offset = parseInt(prizeMap[rotate]) || 0;
			if (offset <= 0) {
				return;
			}
			drawTime++;
			var round = 360 * 8;//动画转动度数(8圈)
			var per = (360 / 8);//每个奖品的度数
		 	var angles = (drawTime * round) + (offset * per);
			setDegree(angles);//改变偏转
		    rotateTurnplate.timer = setTimeout(function () {
		    	showNotice();
		    	getTurnplateActivityInfo();
		     }, 6000 + 300);
		}, function(e) {
			$("#start").off().on('click', rotateTurnplate);
		});
	}
	
	function moreList() {
		pageNum++;
		getTurnplateList(true);		
	}
	
	function getTurnplateList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		} 
		activityCgi.getTurnplateList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#prizeRecordList").append(turnplateView.prizeRecordList(data))
			} else {
				$("#prizeRecordList").html(turnplateView.prizeRecordList(data))
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function showNotice() {
		$('#turnplateMask').show();
		$("#trunplateNotice").show();
	}
	
	function closeNotice() {
		$('#turnplateMask').hide();
		$('#trunplateNotice').hide().html('');
	}
});
define('controller/activity/wdlszlzz',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var wdlszlzzView = require('view/activity/wdlszlzz');
	var webCalliOS = null;

	function init(view) {
		webCalliOS = parseInt(common.getUrlParam("webCalliOS")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		webCalliOS = null;
	}

	function setMain(view) {
		var options = {
			title: "晒米场－五大联赛之六宗最",
			className: 'activity_wdlszlzz'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(wdlszlzzView.content(data));
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.setShare(data);
		}
		if (!webCalliOS && common.isIosBrowser() && common.isIos()) {
			$("#betBtn").hide();
		}
		$("#betBtn").on('click', function() {
			if (common.isAndroidBrowser() && common.isAndroid()) {
				window.Jockey && window.Jockey.send("JCZQ");
			} else if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://bet/JCZQ"
		    	});
			} else {
				common.locationUrl("#match&self=true&type=1");
			}
		})
		
		$("#shareBtn").on('click', function() {
			ssqhbShare()
		})
	}

	function setContent() {
		
	}
	
	function ssqhbShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			}
			ui.showShare(data);
		} else if (common.isAndroidBrowser()) {
			window.Jockey && window.Jockey.send("SSQHBShare",{
				title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
			});
		} else if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_received.postMessage({
    			title: '独家揭密:五大联赛六宗最',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/wdlszlzz',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/activity_wdlszlzz_share.jpg',
				desc: '投注竞彩足球加奖10.2%'
    		});
		}
	}
});
define('controller/bindMobile',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var smsCgi = require('cgi/sms');
	var bindMobileView = require('view/bindMobile');
	var toHash = null;

	function init(view) {
		toHash = decodeURIComponent(trim(common.getUrlParam("toHash"))) || "";
//		if (!(/^#[^#\?]*$/.test(toHash))) {
//			ui.showNotice('toHash参数有误');
//			return;
//		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		toHash = null;
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "绑定手机",
			className: 'bindPhone',
			showHeader: true
		}
		main.setMain(view, options);
		main.setContent(bindMobileView.content());
		$('#smsCodeBtn').on('click', showConfirm);
		$('#bindMobileSubmit').on('click', bindMobileSubmit);
	}


	function setContent() {

	}
	
	function sendSmsCode () {
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
	
	function bindMobileSubmit() {
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
		userCgi.bindMobile(options, function(ret) {
			if (ret.errCode == 3) {
				ui.showNotice(ret.msg);
				return;
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('您已成功绑定');
			setTimeout(function() {
				common.locationUrl(toHash);
			}, 1000)
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
		$("#pageContainer").append(bindMobileView.confirm(data));
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
})
define('controller/bonusOptimize',function(require,exports) {

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
define('controller/cdsd',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var cdsdView = require('view/cdsd');
	var groupNo = '5F5E101-BC6150';
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "实单推荐",
			className: 'index',
			showHeader: true,
			rightButtonText: '明星店长',
			rightButtonFun: function() {
				common.locationUrl('#userList&groupNo='+groupNo);
			}
		}
		main.setMain(view, options);
		main.setContent(cdsdView.content());
	}

	function setContent() {
		setTab();
	}

	function setTab() {
		var tabList = $('#recommendTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			pageNum = 1;
			pageSize = 8;
			getPlanList();
		});
		tabList.eq(0).click();
	}
		
	function getPlanList(append) {
		main.unsetScrollLoad();
		var matchType = parseInt($('#recommendTab [matchType].active').eq(0).attr('matchType')) || 0;
		var options = {
			matchType: matchType,
			groupNo: groupNo,
			needSale: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(cdsdView.planList(data));
			} else {
				$("#planList").html(cdsdView.planList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场足球推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		getPlanList(true);		
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
});
// 充值记录
define('controller/charge',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common =require('module/common');
	var main = require('module/main');
	var ui = require('module/ui');
	var userCgi = require('cgi/user');
	var orderCgi =require('cgi/order');
	var activityCgi =require('cgi/activity');
	var chargeView =require('view/charge');
	var financeType = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
	}

	function setMain(view) {
		var options = {
			title: financeType== 0?"米粒充值":"彩金充值",
			className: 'recharge',
			showHeader: true,
			rightButtonText: '充值记录',
			rightButtonFun: function() {
				common.locationUrl('#chargeList&financeType=' + financeType);
			}
		}
		main.setMain(view, options);
	}

	function setContent() {
		getUserInfo();
		getChargeActivityInfo();
	}
	
	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var isABT = user.isABT;
			if (isABT) {
				$("#rechargeTab").show();
			}
		});
	}

	function getChargeActivityInfo() {
		var data = {}
		activityCgi.getChargeActivityInfo(data, function(ret) {
		 	if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activityData = ret.data || {};
			var data = {
				presentAmountMap: activityData,
				financeType: financeType
			};
			main.setContent(chargeView.content(data));
			$("#chargeList li").on('click', function(e) {
				$("#chargeList li").removeClass("active");
				$(this).addClass("active");
				selectAmount();
			});
			$("#amount").on('input', function(e) {
				var amount = parseInt($(this).val()) || 0;
				if (amount > 0) {
					$("#chargeList li").removeClass("active");
					$("#money"+amount).parents("li").addClass("active");
				}
			});//数据绑定
			$("#chongSubmit").on('click', chongSubmit);//添加按钮的点击事件
			selectAmount();
		});	
	}

	function chongSubmit() {
		var amount = (parseInt($("#amount").val()) || 0)*100;//获取读入的数字并且把他转换为分
		if (isNaN(amount) || amount <=0) {
			ui.showNotice("请填写正确的充值金额");
			return;
		}
		var data = {
		 	amount: amount
		}
		if ( financeType == 0 ) {
			orderCgi.createChargeOrder(data, function(ret) {
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
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl('#chargeList');	
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		} else if (financeType == 1) {
			orderCgi.createTicketChargeOrder(data, function(ret) {
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
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl('#chargeList');	
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}
	}

	function selectAmount(e) { 
		var li = $("#chargeList li.active");
		li.each(function(i, item) {
			var amount = parseInt($(this).find(".chargeNum").text()) || "";
			$('#amount').val(amount);
		});
	}
	
})
define('controller/chargeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var chargeListView = require('view/chargeList');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		pageNum = 1;
		pageSize = 20;
		common.setHistoryBack('#charge&financeType=' + financeType);
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "充值记录",
			className: 'moneyNode',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(chargeListView.content(data));
	}


	function setContent() {
		getChargeList();
	}


	function moreList() {
		pageNum++;
		getChargeList(true);		
	}
	
	function getChargeList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getChargeList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#chargeList").append(chargeListView.chargeList(data));
			} else {
				$("#chargeList").html(chargeListView.chargeList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});
define('controller/createPresentOrder',function(require, exports) {

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
define('controller/createTicketOrder',function(require,exports) {

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
define('controller/demo',function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var demoView = require('view/demo');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {

	}

	function setMain(view) {
		//之前的风格
		var data = {
			static1: '静态1',
			static2: '静态2',
			name1: '名字1',
			name2: '名字2',
			message1: '消息1',
			message2: '消息2',
			message3: '消息3',
			message4: '消息4'
		};
		view.setContent(demoView.content(data));
		//使用vue
		var app = new Vue({
			el: '#myContent',
			data: data
		});
		//模拟数据改变
		setTimeout(function() {
			app.name1 = '变化的名字1';
			app.name2 = '变化的名字2';
			app.message1 = '变化的消息1';
			app.message2 = '变化的消息2';
			app.message3 = '变化的消息3';
			app.message4 = '变化的消息4';
		}, 3000);
	}

	function setContent() {

	}
});
define('controller/digitalPlanDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var focusCgi = require('cgi/focus');
	var digitalPlanDetailView = require('view/digitalPlanDetail');
	var planNo = null;
	var transdata = null;

	function init(view) {
		planNo = trim(common.getUrlParam("planNo")) || "";
		transdata = trim(common.getUrlParam("transdata")) || "";
		if (transdata) {
			//防止购买成功，有缓存
			common.clearCache('c=plan&m=digitalPlanInfo');
			common.clearCache('c=plan&m=digitalPlanList');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		planNo = null;
		transdata = null;
	}

	function setMain(view) {
		var options = {
			title: "推荐详情",
			className: 'expertRcmd',
			showHeader: true,
		}
		main.setMain(view, options);
	}


	function setContent() {
		getDigitalPlanInfo();
	}
	
	function getDigitalPlanInfo() {
		if (!planNo) {
			return;
		}
		var options = {
			needUser: true,
			planNo: planNo
		}
		planCgi.getDigitalPlanInfo(options, function(ret) {
			if (ret.errCode == 2) {
				if (transdata) {
					ui.showAttention('支付单正在处理中，请稍等...');
					setTimeout(getDigitalPlanInfo, 5000)
				} else {
					payPlan(ret.data);
				}
				return;	
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.closeAttention();
			var plan = ret.data || {};
			var data = {
				IMG_PATH: IMG_PATH,
				plan: plan,
				Object: Object
			}
//			var showMask = (function() {
//				closeMask();
//				var ticketOrderHint = common.getCache('ticketOrderHint');
//				var isSale = plan.isSale;
//				if (isSale && !ticketOrderHint) {
//					$("body").append(digitalPlanDetailView.mask());
//					ticketOrderHint = true;
//					common.setCache('ticketOrderHint', ticketOrderHint, 1000*3600*24*2);//1000天失效
//				}
//				$("#ticketOrderMask").on('click',function(){
//					closeMask();
//				})
//			})();
			main.setContent(digitalPlanDetailView.content(data));
			//添加预览
			$('#planDetail .planpic').on('click', previewImage);
			$("#userMore").on('click', function() {
				var userNo = trim($(this).attr('userNo')) || '';
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			})
			$("#bottomBox [href]").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#upCount, #downCount").on('click', function(e) {
				var id = trim($(this).attr('id'));
				var planNo = trim($(this).attr('planNo'));
				if (!id || !planNo) {
					return;
				}
				var planCount = common.getCache('planCount');
				if (planCount) {
					if (!!planCount[id][planNo]) {
						ui.showNotice('您已参与过');
						return;
					}
				} else {
					planCount = {
						upCount: {},
						downCount: {},
						shareCount: {}
					}	
				}
				var countFun = (function(dom) {
					return function() {
						var id = trim($(dom).attr('id'));
						var count = parseInt($("#"+id+'Num').html()) || 0;
						$("#"+id+'Num').html(count+1);
						planCount[id][planNo] = true;
						common.setCache('planCount', planCount, 1000*3600*24*1000);//1000天失效
					}
				})(this);
				var cgiFun = '';
				if (id == 'upCount') {
					cgiFun = 'planUpCount';	
				} else if (id == 'downCount') {
					cgiFun = 'planDownCount';	
				}
				if (cgiFun) {
					planCgi[cgiFun]({
						planNo: planNo
					}, countFun, countFun)
				}
			});
			var planUser = plan.user;
			var planNo = plan.planNo;
			var betContent = plan.betContentList[0];
			var recommendCount = plan.recommendCount;
			var betContentResult = betContent.betContentResult || {};
			var title = betContentResult.name;
			var selectContent;
			if (title == '直选') {
				selectContent = [];
				var zx = betContent.betContent.split(':')[1];
				s = zx.split('|')[0].split(',').join(" ") + '|' + zx.split('|')[1].split(',').join(" ") + '|' + zx.split('|')[2].split(',').join(" ")
				selectContent.push(s);
			} else {
				selectContent = betContent.betContent.split(':')[1].split(',')
			}
			var issue = plan.issue;
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var userNo = planUser.userNo;
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName + '推荐',
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#digitalPlanDetail&planNo=' + planNo,
				imgUrl: userImg,
				desc: issue + '期 ' + '3D' + title + '推荐',
				success: function() {
					var count = parseInt($("#shareCountNum").html()) || 0;
					$("#shareCountNum").html(count+1);
					planCgi.planShareCount({
						planNo: planNo
					});	
				}
			}
			ui.setShare(shareData);
			$("#shareCount").on('click', function(e) {
				ui.showShare(shareData);
			});
			getExpertInfo(userNo);
			$("#addTicket").on('click', function() {
				common.locationUrl("#fc3d&recommend=true&bet=ture&planNo=" + planNo);
				addToStorage('fc3dRecommend',{
					title: title,
					selectContent: selectContent,
					unit: recommendCount
				})
			});
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var urls = [];
		$('#planDetail .planpic').each(function(i, item) {
			var src = trim($(this).attr('src'));
			if (src) {
				urls.push(src);
			}
		});
		var current = trim($(this).attr('src')) || urls[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function payPlan(amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看专家推荐<br>(1粒米=1元)", function sure() {
			var spreaderUserNo = trim(common.getUrlParam("spreaderUserNo")) || '';
			var options = {
				planNo: planNo,
				spreaderUserNo: spreaderUserNo
			}
			orderCgi.createOrder(options, function(ret) {
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
						ui.showNotice('支付成功');
						ui.closeConfirm();
						setTimeout(function() {
							getDigitalPlanInfo();
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			common.locationUrl('#');
		});
	}
	
//	function closeMask() {
//		$("#ticketOrderMask").remove();
//	}
	
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
	
	function addToStorage(fc3dCartKey,numInfo) { //选择号码添加到本地储存
        if (numInfo != null) {
        	var items = [];
            items.push(numInfo);
            var strItems = JSON.stringify(items);
            localData.set(fc3dCartKey, strItems);
        }
    };
	
	function getExpertInfo(userNo) {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var focusStatus = parseInt(user.focusStatus) || 0;
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					createFocus(userNo);
				}).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					cancelFocus(userNo)
				}).show();
			}
		});
	}

	function createFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});
		}, function cancel() {

		});
	}

	function cancelFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});	
		}, function cancel() {

		});
	}
});
define('controller/dlt',function(require,exports) {

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
define('controller/documentaryMarket',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var planCgi = require('cgi/plan');
	var documentaryMarketView = require('view/documentaryMarket');
	var pageNum = null;
	var	pageSize = null;
	var specification = null;
	var tab = null;

	function init(view) {
		common.setHistoryBack('#home');
		specification = common.getUrlParam("specification") || false;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
	 	pageSize = null;
	 	specification = null;
	 	tab = null;
	}

	function setMain(view) {
		var options = {
			title: specification ? "跟单说明" : "跟单市场",
			className: 'documentaryMarket',
			showHeader: true,
			isLeftIconHeader: !!specification,
			rightButtonText: "说明",
			rightButtonFun: function() {
				common.locationUrl("#documentaryMarket&specification=true");
			}
			
		}
		main.setMain(view, options);
		if (specification) {
			$(".leftIcon_header").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#documentaryMarket");
			});
			main.setContent(documentaryMarketView.specification());
		} else {
			main.setContent(documentaryMarketView.publishMarket());
		}	
	} 


	function setContent() {
		setTab();
		
	}
	
	function setTab() {
		var tabList = $('#navTab .ui-flex_item');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr('tab')) || 1;
			pageNum = 1;
			pageSize = 8;
			if (tab == 1) {
				getOrderPublishList();
			} else if (tab == 2) {
				getPlanList();
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
	
	function getOrderPublishList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getOrderPublishList(options, function(ret) {
			if(ret.errCode != 0){
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
				$("#orderPublishList").append(documentaryMarketView.orderPublishList(data));
			} else {
				$("#orderPublishList").html(documentaryMarketView.orderPublishList(data));
			}
			$("#orderPublishList .self_item").on("click", function() {
				var orderNo = $(this).attr("orderNo");
				common.locationUrl("#ticketOrderDetail&selfGod=true&orderNo=" + orderNo);
			})
			$("#orderPublishList .ticket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var recommendCount = parseInt($(this).attr("betAmount"))/2;
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var planNo = trim($(this).attr("planNo"));
				var data = {
					planNo: planNo,
					recommendCount: recommendCount,
					maxBettypeOdds: maxBettypeOdds,
					planType: -1,
					isSelfFollow: 1
				}
				ui.showCreateTicketOrder(data);
			});
			$("#orderPublishList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function getPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			needSaleTicket: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#orderPublishList").append(documentaryMarketView.planList(data));
			} else {
				$("#orderPublishList").html(documentaryMarketView.planList(data));
			}
			$("#orderPublishList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场足球推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#orderPublishList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			$("#orderPublishList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#orderPublishList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		if (tab == 1) {
			getOrderPublishList(true);	
		} else if (tab == 2) {
			getPlanList(true);
		}		
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
});
define('controller/download',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var downloadView = require('view/download');
	var auto = null;

	function init(view) {
		auto = !!common.getUrlParam("auto") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		auto = null;	
	}

	function setMain(view) {
		if (common.isAndroidBrowser() || common.isIosBrowser()) {
			showMobile(view);
		} else {
			showPc(view);
		}
		if (auto) {
			download();
		}
	}

	function showPc(view) {
		var options = {
			className: 'pcDownload'
		}
		main.setMain(view, options);
		main.setContent(downloadView.pc({
			IMG_PATH: IMG_PATH
		}));
		$("#androidQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeOut(function(){
				$("#androidQrCode").removeClass("show");
			});
		});
		$("#iosQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeOut(function(){
				$("#iosQrCode").removeClass("show");
			});
		});
		$('#androidBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeIn(function(){
				$("#androidQrCode").addClass("show");
			});
		});	
		$('#iphoneBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeIn(function(){
				$("#iosQrCode").addClass("show");
			});
		});	
	}

	function showMobile(view) {
	    var options = {
			className: 'mobileDownload'
		}
	    main.setMain(view, options);
		main.setContent(downloadView.mobile({
			IMG_PATH: IMG_PATH
		}));
		$("#mobileDownAndriod").click(function(){
			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii.apk');
		});
		$("#mobileDownIos").on('click', function() {
			common.locationUrl('https://itunes.apple.com/us/app/id1154395135?l=zh&ls=1&mt=8');
		})
	}

	function download() {
//		if (common.isWeixinBrowser() && common.isAndroidBrowser()) {
//			common.locationUrl('http://app.qq.com/#id=detail&appid=1105618504');
//			return;
//		}
//		if (common.isIosBrowser()) {
//			common.locationUrl('https://itunes.apple.com/us/app/shai-mi-chang-sai-shi-yu-ce/id1144475279?l=zh&ls=1&mt=8');
//		} else if (common.isAndroidBrowser()) {
//			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_1.5.0.apk');
//		} else {
//			common.locationUrl('http://app.qq.com/#id=detail&appid=1105618504')	
//		}
		common.locationUrl('http://a.app.qq.com/o/simple.jsp?pkgname=com.shaimichang.myapplication');
	}

	function setContent() {

	}

});
define('controller/drawHistory',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var drawHistoryView = require('view/drawHistory');
	var pageNum = null;
	var pageSize = null;
	var lotteryId = null;

	function init(view) {
		lotteryId = trim(common.getUrlParam("lotteryId")) || "";
		pageNum = 1;
		if (lotteryId == 'JSK3' || lotteryId == 'GX11X5') {
			pageSize = 20;
		} else {
			pageSize = 8;
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		lotteryId = null;
	}

	function setMain(view) {
		var titleMap = {'SSQ': '双色球历史开奖','JSK3': '快3历史开奖','DLT': '大乐透历史开奖','GX11X5': '乐11选5开奖','FC3D': '3D开奖'};
		var options = {
			title: titleMap[lotteryId],
			className: 'drawHistory',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		if (lotteryId == 'SSQ' || lotteryId == 'DLT') {
			main.setContent(drawHistoryView.SSQ())
		} else if (lotteryId == 'JSK3') {
			main.setContent(drawHistoryView.JSK3())
		} else if (lotteryId == 'GX11X5') {
			main.setContent(drawHistoryView.GX11X5())
		} else if (lotteryId == 'FC3D') {
			main.setContent(drawHistoryView.FC3D())
		}   
	}


	function setContent() {
		getLotteryIssueList();
	}
	
	function getLotteryIssueList(append) {
		main.unsetScrollLoad();
		var options = {
			lotteryId: lotteryId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		lotteryCgi.lotteryIssueList(options, function(ret) {
			if(ret.errCode != 0){
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
				Date: Date
			}
			if (lotteryId == 'SSQ' || lotteryId == 'DLT') {
				if (append) {
					$("#SSQdrawList").append(drawHistoryView.SSQdrawList(data));
				} else {
					$("#SSQdrawList").html(drawHistoryView.SSQdrawList(data));
				}
			} else if (lotteryId == 'JSK3') {
				if (append) {
					$("#K3drawList").append(drawHistoryView.K3drawList(data));
				} else {
					$("#K3drawList").html(drawHistoryView.K3drawList(data));
				}
			} else if (lotteryId == 'GX11X5') {
				if (append) {
					$("#GX11X5DrawList").append(drawHistoryView.GX11X5DrawList(data));
				} else {
					$("#GX11X5DrawList").html(drawHistoryView.GX11X5DrawList(data));
				}
			} else if (lotteryId == 'FC3D') {
				if (append) {
					$("#fc3dDrawList").append(drawHistoryView.fc3dDrawList(data));
				} else {
					$("#fc3dDrawList").html(drawHistoryView.fc3dDrawList(data));
				}
			}
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		getLotteryIssueList(true);		
	}
		
});	
define('controller/editDigitalPlan',function(require, exports) {
	
	exports.init = init;
	exports._init = _init;

	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var planCgi = require('cgi/plan');
	var editDigitalPlanView = require('view/editDigitalPlan');
	var uploadFile = null;

	function init(view) {
		uploadFile = [];
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		uploadFile = null;
		common.clearCache('fc3dRecommend');
	}

	function setMain(view) {
		var options = {
			title: "发起推荐",
			className: 'recommend',
			showHeader: true
		}
		var recommendContent = getCartItems();
		if (recommendContent.length > 0) {
			options.rightButtonText = '修改推荐';
			options.rightButtonFun = function() {
				common.locationUrl('#fc3d&recommend=true');
				common.clearCache('fc3dRecommend');
			}
		}
		main.setMain(view, options);
		var data = {
			recommendContent: recommendContent
		}
		main.setContent(editDigitalPlanView.content(data));
		$("#editSubmit").on('click', editSubmit);
		$("#selectMatch").on('click', function(e) {
			common.locationUrl('#fc3d&recommend=true');
		});
		if (common.isWeixinBrowser()) {
			$("#fileSelectBox,#fileSelectedBox").on('click', chooseImage);
		} else {
			$("#fileSelect,#fileSelected").on('change', fileChange).show();
		}
	}


	function setContent() {
		getPlanPrice();	
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
	
	function getCartItems() { //获取本地储存
        var strres = localData.get('fc3dRecommend');
        return strres === null || strres === undefined ? 'fc3dRecommend' != "" ? (localData.set('fc3dRecommend', "[]"), JSON.parse("[]")) : {} : strres == "" ? JSON.parse("[]") : JSON.parse(strres)
    }
	
	function getPlanPrice() {
		var options = {}
		planCgi.getPlanPrice(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data || [];
			var data = {
				list: list
			}
			$("#amountList").html(editDigitalPlanView.amountList(data));
			var amountItem = $("#amountList [amount]");
			amountItem.on("click", function(e) {
				amountItem.removeClass("active");
				$(this).addClass("active");
				var amount = parseInt($(this).attr("amount")) || 0;
				if (!isNaN(amount) && amount >= 0) {
					$("#amount").val(amount);
				} else {
					$("#amount").val("");	
				}
			});
		});
	}

	function chooseImage(e) {
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	imgArr.push('<img class="planpicSmall img-responsive" src="'+ localId +'" />');
		        	uploadFile.push(localId);
		        });
				$('#fileList').html(imgArr.join(""));
				$('#fileList .planpicSmall').on('click', previewImage);
				var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				var fileSelectBoxJQ = $('#fileSelectBox');
				var fileSelectedBoxJQ = $('#fileSelectedBox');
				if (uploadFileLength > 0) {
					fileSelectBoxJQ.hide();
					fileSelectedBoxJQ.show();	
				} else {
					fileSelectedBoxJQ.hide();
					fileSelectBoxJQ.show();
				}
		    }
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var current = trim($(this).attr('src')) || uploadFile[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: uploadFile// 需要预览的图片http链接列表
		});
	}

	function fileChange(e) {
		uploadFile = [];
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			if (file.type) {
				if (/\bimage\b/i.test(file.type)) {
					uploadFile.push(file);
				}
			} else {
				var fileName = trim(file.name);
				var index = fileName.lastIndexOf(".");
				if(index != -1) {
					var extName = fileName.substr(index + 1).toLowerCase();
					if(exts[extName]) {
						uploadFile.push(file);
					}
				}
				
			}
		});
		var uploadFileLength = uploadFile.length;
		if (uploadFileLength <= 0) {
			return;
		}
		var imgArr = [];
		var loadNum = 0;
		var readerOnload = function(e) {
			loadNum++;
			imgArr.push('<img class="planpicSmall" src="'+ e.target.result +'" />');
			if (loadNum == uploadFileLength) {
				$('#fileList').html(imgArr.join(""));
			}
		}
		$.each(uploadFile, function(i, file) {
			var reader = new FileReader();
			reader.onload = readerOnload;
			reader.readAsDataURL(file);
		});
		var fileSelectBoxJQ = $('#fileSelectBox');
		var fileSelectedBoxJQ = $('#fileSelectedBox');
		if (uploadFileLength > 0) {
			fileSelectBoxJQ.hide();
			fileSelectedBoxJQ.show();	
		} else {
			fileSelectedBoxJQ.hide();
			fileSelectBoxJQ.show();
		}
	}

	function editSubmit() {
		var content = trim($("#content").val());
		var amount = parseInt($("#amount").val());
		var lotteryId = "FC3D";
		var issue = parseInt($("#issue").html());
		var uploadFileLength = uploadFile.length;
//		if (matchType > 0) {
//			ui.showNotice("赛事类型有误");
//			return;	
//		}
//		if (matchRecommend == "") {
//			ui.showNotice("请选择赛事");
//			return;
//		}
		if (uploadFileLength <= 0) {
			if (content == "" || content.length < 50) {
				ui.showNotice("分析文字不能少于50个字");
				return;
			}
		}
		if (isNaN(amount) || amount < 0) {
			ui.showNotice("请选择方案定价");
			return;
		}
		var titleMap = {'直选' : 'ZHX','和值' : 'ZHXHZ','组三' : 'ZU3','组六' : 'ZU6'};
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
		var submitFun = function(options) {
			ui.closeLoading();
			planCgi.createDigitalPlan(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var planNo = trim(data.planNo);
				if (!planNo) {
					ui.showNotice('方案生成异常');
					return;
				}
				ui.showNotice('推荐发布成功');
				setTimeout(function(){
					common.locationUrl('#digitalPlanDetail&planNo='+planNo);
				}, 1000);
			});
		}
		var data = {
			betContent: betContent,
			content: content,
			amount: amount,
			matchType: 0,
			issue:　issue,
			lotteryId:　lotteryId
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadFileLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadFileLength*10*1000;
		}
		ui.showLoading(loadingTime);
		if (uploadFileLength > 0) {
			//存在上传图片，就等图片压缩结束再提交表单
			var submitFile = [];
			var compressNum = 0;
			if (common.isWeixinBrowser()) {
				for (var i = 0; i < uploadFileLength; i++) {
					var localId = trim(uploadFile[i]);
					weixin.call("uploadImage", {
					    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
					    isShowProgressTips: 0, // 默认为1，显示进度提示
					    success: function (res) {
					        var serverId = res.serverId; // 返回图片的服务器端ID
					        compressNum++;
							submitFile.push(serverId);
							if (compressNum == uploadFileLength) {
								data.file = submitFile;
								submitFun(data);
							}
					    }
					});
				}
			} else {
				$.each(uploadFile, function(i, file) {
					lrz(file).then(function (rst) {
						compressNum++;
						submitFile.push(rst.file);
						if (compressNum == uploadFileLength) {
							data.file = submitFile;
							submitFun(data);
						}
					});
				});
			}
		} else {
			submitFun(data);
		}
	}
});
define('controller/editPlan',function(require, exports) {
	
	exports.init = init;
	exports._init = _init;

	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var planCgi = require('cgi/plan');
	var replayCgi = require('cgi/replay');
	var editPlanView = require('view/editPlan');
	var matchType = null;
	var uploadFile = null;
	var tab = null;

	function init(view) {
		matchType = parseInt(common.getUrlParam("matchType")) || 0;
		uploadFile = [];
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		matchType = null;
		uploadFile = null;
		tab = null;
	}

	function setMain(view) {
		var options = {
			title: "发起推荐",
			className: 'recommend',
			showHeader: true,
			isRecommendHeader: true
		}
		if (window.editPlanSelectMatch) {
			options.rightButtonText = '修改比赛';
			options.rightButtonFun = function() {
				window.matchSelectBettype = getMatchSelectBettype();
				common.locationUrl('#match&type=' + matchType);
			}
		}
		main.setMain(view, options);
	}


	function setContent() {
		setTab();
	}
	
	function setTab() {
		var tabItem = $("#recommendTab span");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				$("#pageHeader .rightIcon_top").show();
				var data = {
					JSON: JSON,
					matchList: window.editPlanSelectMatch || []
				}
				main.setContent(editPlanView.recommend(data));
				$("#selectMatch").on('click', function(e) {
					common.locationUrl('#match');
				});
			} else if (tab == 2) {
				window.editPlanSelectMatch = null;
				$("#pageHeader .rightIcon_top").hide();
				main.setContent(editPlanView.replay());
			}
			$("#editSubmit").on('click', editSubmit);
			if (common.isWeixinBrowser()) {
				$("#fileSelectBox,#fileSelectedBox").on('click', chooseImage);
			} else {
				$("#fileSelect,#fileSelected").on('change', fileChange).show();
			}
			getPlanPrice();	
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab"));
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	function getPlanPrice() {
		var options = {}
		planCgi.getPlanPrice(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data || [];
			var data = {
				list: list
			}
			$("#amountList").html(editPlanView.amountList(data));
			var amountItem = $("#amountList [amount]");
			amountItem.on("click", function(e) {
				amountItem.removeClass("active");
				$(this).addClass("active");
				var amount = parseInt($(this).attr("amount")) || 0;
				if (!isNaN(amount) && amount >= 0) {
					$("#amount").val(amount);
				} else {
					$("#amount").val("");	
				}
			});
		});
	}

	function getMatchSelectBettype() {
		var selectMatch = null;
		var matchList = window.editPlanSelectMatch || []
		$.each(matchList, function(i, item) {
			var match = item.match || {};
			var odds = item.odds || {};
			var recommend = item.recommend || [];
			var matchId = match.matchId || 0;
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

	function chooseImage(e) {
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	imgArr.push('<img class="planpicSmall img-responsive" src="'+ localId +'" />');
		        	uploadFile.push(localId);
		        });
				$('#fileList').html(imgArr.join(""));
				$('#fileList .planpicSmall').on('click', previewImage);
				var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				var fileSelectBoxJQ = $('#fileSelectBox');
				var fileSelectedBoxJQ = $('#fileSelectedBox');
				if (uploadFileLength > 0) {
					fileSelectBoxJQ.hide();
					fileSelectedBoxJQ.show();	
				} else {
					fileSelectedBoxJQ.hide();
					fileSelectBoxJQ.show();
				}
		    }
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var current = trim($(this).attr('src')) || uploadFile[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: uploadFile// 需要预览的图片http链接列表
		});
	}

	function fileChange(e) {
		uploadFile = [];
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			if (file.type) {
				if (/\bimage\b/i.test(file.type)) {
					uploadFile.push(file);
				}
			} else {
				var fileName = trim(file.name);
				var index = fileName.lastIndexOf(".");
				if(index != -1) {
					var extName = fileName.substr(index + 1).toLowerCase();
					if(exts[extName]) {
						uploadFile.push(file);
					}
				}
				
			}
		});
		var uploadFileLength = uploadFile.length;
		if (uploadFileLength <= 0) {
			return;
		}
		var imgArr = [];
		var loadNum = 0;
		var readerOnload = function(e) {
			loadNum++;
			imgArr.push('<img class="planpicSmall" src="'+ e.target.result +'" />');
			if (loadNum == uploadFileLength) {
				$('#fileList').html(imgArr.join(""));
			}
		}
		$.each(uploadFile, function(i, file) {
			var reader = new FileReader();
			reader.onload = readerOnload;
			reader.readAsDataURL(file);
		});
		var fileSelectBoxJQ = $('#fileSelectBox');
		var fileSelectedBoxJQ = $('#fileSelectedBox');
		if (uploadFileLength > 0) {
			fileSelectBoxJQ.hide();
			fileSelectedBoxJQ.show();	
		} else {
			fileSelectedBoxJQ.hide();
			fileSelectBoxJQ.show();
		}
	}

	function editSubmit() {
		var matchRecommend = trim($("#matchRecommend").val());
		var title = trim($("#title").val());
		var content = trim($("#content").val());
		var amount = parseInt($("#amount").val());
		var uploadFileLength = uploadFile.length;
		if (tab == 1) {
			if (matchType <= 0) {
				ui.showNotice("赛事类型有误");
				return;	
			}
			if (matchRecommend == "") {
				ui.showNotice("请选择赛事");
				return;
			}
			if (uploadFileLength <= 0) {
				if (content == "" || content.length < 50) {
					ui.showNotice("分析文字不能少于50个字");
					return;
				}
			}
			if (isNaN(amount) || amount < 0) {
				ui.showNotice("请选择方案定价");
				return;
			}
		} else if (tab == 2) {
			if (title == "" || title.length < 5) {
				ui.showNotice("标题不能少于5个字");
				return;
			}
			if (uploadFileLength <= 0) {
				ui.showNotice("请上传图片");
			}
			if (content == "" || content.length == 0) {
				ui.showNotice("复盘文字不能为空");
				return;
			}
		}

		var submitFun = function(options) {
			ui.closeLoading();
			if (tab == 1) {
				planCgi.createPlan(options, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					var data = ret.data || {};
					var planNo = trim(data.planNo);
					if (!planNo) {
						ui.showNotice('方案生成异常');
						return;
					}
					ui.showNotice('推荐发布成功');
					setTimeout(function(){
						common.locationUrl('#planDetail&planNo='+planNo);
					}, 1000);
				});
			} else if (tab == 2) {
				replayCgi.createReplay(options, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					var data = ret.data || {};
					var replayNo = trim(data.replayNo);
					if (!replayNo) {
						ui.showNotice('复盘生成异常');
						return;
					}
					ui.showNotice('复盘发布成功');
					setTimeout(function(){
						common.locationUrl('#replayDetail&replayNo='+replayNo);
					}, 1000);
				});
			}
		}
		var data;
		if (tab == 1) {
			data = {
				matchRecommend: matchRecommend,
				content: content,
				amount: amount,
				matchType: matchType,
				title: title
			}
		} else if (tab == 2) {
			data = {
				title: title,
				content: content
			}
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadFileLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadFileLength*10*1000;
		}
		ui.showLoading(loadingTime);
		if (uploadFileLength > 0) {
			//存在上传图片，就等图片压缩结束再提交表单
			var submitFile = [];
			var compressNum = 0;
			if (common.isWeixinBrowser()) {
				for (var i = 0; i < uploadFileLength; i++) {
					var localId = trim(uploadFile[i]);
					weixin.call("uploadImage", {
					    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
					    isShowProgressTips: 0, // 默认为1，显示进度提示
					    success: function (res) {
					        var serverId = res.serverId; // 返回图片的服务器端ID
					        compressNum++;
							submitFile.push(serverId);
							if (compressNum == uploadFileLength) {
								data.file = submitFile;
								submitFun(data);
							}
					    }
					});
				}
			} else {
				$.each(uploadFile, function(i, file) {
					lrz(file).then(function (rst) {
						compressNum++;
						submitFile.push(rst.file);
						if (compressNum == uploadFileLength) {
							data.file = submitFile;
							submitFun(data);
						}
					});
				});
			}
		} else {
			submitFun(data);
		}
		window.matchSelectBettype = null;
		window.editPlanSelectMatch = null;
	}
});
define('controller/error',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var errorView = require('view/error');
	var url = null;

	function init(view) {
		url = decodeURIComponent(trim(common.getUrlParam("url"))) || "/";
		setMain(view);
		setContent();
	}

	function _init(view) {
		url = null;
	}

	function setMain(view) {
		var options = {
			className: 'error'
		}
		main.setMain(view, options);
		main.setContent(errorView.content());
		$("#backBtn").on('click', function(e) {
			common.locationUrl(url);
		});
	}

	function setContent() {
		
	}
});
define('controller/fc3d',function(require,exports) {

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
define('controller/focusList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var focusCgi = require('cgi/focus');
	var userCgi = require('cgi/user');
	var focusListView = require('view/focusList');
	var pageNum = null;
	var pageSize = null;
	var isWeixinBrowser = common.isWeixinBrowser()

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		if (isWeixinBrowser) {
			common.setHistoryBack('#home');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'attention',
			showHeader: true,
			isFocusHeader: true,
			showFooter: isWeixinBrowser ? true : false
		}
		main.setMain(view, options);
		var tabList = $('#focusTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var type = parseInt($(this).attr('type')) || 0;
			if (type == 1) {
				main.setContent(focusListView.focusListBox());
				$('#jumpFocus').on('click', function(e) {
					$('#showNoFocusList').hide();
					$("#noFocusList [userNo]").each(function(i, item) {
						var status = parseInt($(item).attr('status')) || 0;
						if (status == 2) {
							getFocusList();
							return false;
						}
					});
				});
				getFocusList();
			} else if (type == 2) {
				main.setContent(focusListView.userListBox());
				getGroupList();
			}
		});
		tabList.eq(0).click();
	}

	function setContent() {

	}

	function moreList() {
		pageNum++;
		getFocusList(true);
	}

	function getFocusList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		focusCgi.getFocusList(options, function(ret) {
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
			if (list.length == 0) {
				//如果关注列表不存在就显示弹框
				$('#showNoFocusList').show();
				getUserList();
				return;
			}
			$('#showNoFocusList').hide();
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#focusList").append(focusListView.focusList(data));
			} else {
				$("#focusList").html(focusListView.focusList(data));
			}
			var focusItem = $("#focusList .attention_list_box");
			focusItem.off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	//未关注用户列表
	function getUserList() {
		var options = {
			groupNo: '5F5E103-BC6152',
			pageNum: 1,
			pageSize: 200
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#noFocusList").html(focusListView.noFocusList(data));
			$("#noFocusList [userNo]").each(function(i, item) {
				setFoucsStatus.call(item);
			});
		});
	}

	function createFocus(e) {
		var dom = this;
		var userNo = $(dom).attr('userNo') || "";
		if (!userNo) {
			return;
		}
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				$(dom).attr('status', '2');
				setFoucsStatus.call(dom);
			});
		}, function cancel() {

		});	
	}

	function cancelFocus(e) {
		var dom = this;
		var userNo = $(dom).attr('userNo') || "";
		if (!userNo) {
			return;
		}
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				$(dom).attr('status', '1');
				setFoucsStatus.call(dom);
			});	
		}, function cancel() {

		});
	}

	function setFoucsStatus() {
		var status = parseInt($(this).attr('status')) || 0;
		if (status <= 0) {
			return;
		}
		var text = '';
		var className = '';
		var click = null;
		if (status == 1) {
			text = '+关注';
			className = 'attention_focus';
			click = createFocus;
		} else if (status == 2) {
			text = '已关注';
			className = 'attention_focus active';
			click = cancelFocus;
		}
		$(this).attr('class', className).html(text).off().on('click', click);
	}

	function getGroupList() {
		var options = {
			pageNum: 1,
			pageSize: 10
		}
		userCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#groupList").html(focusListView.groupList(data));
			var groupItem = $("#groupList .item");
			groupItem.on('click', function(e) {
				$("#groupList .item").removeClass('active');
				$(this).addClass('active');
				var groupNo = trim($(this).attr("groupNo"));
				userList(groupNo);
			});
			var item = groupItem.eq(0);
			item.click();
			//滚动到相应的tab位置
			var position = item.position();
			$("#groupList").scrollLeft(position.left);
		});
	}

	function userList(groupNo) {
		if (!groupNo) {
			return;
		}
		var options = {
			groupNo: groupNo,
			pageNum: 1,
			pageSize: 200
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var length = list.length || 0;
			var offset = 4 - (length % 4);
			if (offset == 4) {
				offset = 0;
			}
			for (var i = 0; i < offset; i++) {
				list.push({nickName: '', profileImg: IMG_PATH + 'user_default.png'});
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#userList").html(focusListView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		});
	}
});
define('controller/girlPlan',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var girlPlanView = require('view/girlPlan');
	var pageNum = null;
	var pageSize = null;
	var scrollLoad = null;//是否能滚动加载

	function init(view) {
		pageNum = 1;
		pageSize = 5;
		scrollLoad = true;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		scrollLoad = null;
	}

	function setMain(view) {
		var options = {
			title: "美女推波",
			className: 'belle',
			isScrollHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(girlPlanView.content(data));
		$('#backBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
		});
		$('#homeBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#home');
		});
		setScrollEvent();
	}


	function setContent() {
		getPlanList();
		setPageShare();
	}

	function setPageShare() {
		var data = {
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/mntb.png',
			desc: '美女推波'
		}
		ui.setShare(data);
	}

	function setScrollEvent() {
		$("#pageContent").on('scroll', function() {
			var pcDom = this;
			var scrollHeight = pcDom.scrollHeight;
			var offsetHeight = pcDom.offsetHeight;
            var scrollTop = pcDom.scrollTop;
            var scrollTopOver = 50;
            if (scrollTop > scrollTopOver) {
        		$('#pageHeader').show().attr('class', 'header fade_in');
            } else {
            	$('#pageHeader').attr('class', 'header fade_out');
            }
            if (scrollLoad) {
            	var maxScrollTop = scrollHeight - offsetHeight;
	            if (maxScrollTop - scrollTop <= 30) {
	            	moreList();
	            }
            }
        });
	}

	function moreList() {
		pageNum++;
		getPlanList(true);		
	}
	
	function getPlanList(append) {
		scrollLoad = false;
		var options = {
			needGirl: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			scrollLoad = pageNum < maxPageNum;
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(girlPlanView.planList(data));
			} else {
				$("#planList").html(girlPlanView.planList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场美女推波',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			scrollLoad = true;
		});
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var userNo = trim($(this).attr("userNo"));
		var matchNum = parseInt($(this).attr("matchNum")) || 0;
		if (userNo && matchNum <= 0) {
			common.locationUrl("#userDetail&userNo=" + userNo);
			return;
		}
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
});
define('controller/gx11x5',function(require,exports) {

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
define('controller/home',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.slides');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var bannerCgi = require('cgi/banner');
	var hotMatchCgi = require('cgi/match');
	var floatIconCgi = require('cgi/floatIcon');
	var homeView = require('view/home');
	var pageNum = null;
	var pageSize = null;
	var scrollLoad = null;//是否能滚动加载

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		scrollLoad = true;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		scrollLoad = null;
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		clearTimeout(getUserRankList.timer);
	}

	function setMain(view) {
		var options = {
			title: "晒米场",
			className: 'index',
			showFooter: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		};
		main.setContent(homeView.content(data));
		setGroupEvent();
		$('#signBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#sign');
		});
		setScrollEvent();
	}


	function setContent() {
		getBannerList();
		setUserType();
		getUserInfo();
		setType();
		setTab();
		getUserRankList();
		setPageShare();
//		getFloatIconInfo();
	}

	function setPageShare() {
		if (!common.isWeixinBrowser()) {
			return;
		}
		var data = {
			desc: '竞彩实单推荐平台, 足球篮球赛事预测'
		}
		ui.setShare(data);
	}
	
	function setTab() {
		var tabList = $('#recommendTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			pageNum = 1;
			pageSize = 8;
			getPlanList();
		});
		tabList.eq(0).click();
	}
	
	function setType() {
		var tabList = $('#hotMatchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			getHotMatchList();
		});
		tabList.eq(0).click();
	}
	
	function setUserType() {
		var tabList = $('#userTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var userType = trim($(this).attr('userType'));
			if (userType == 1) {
				getUserList();
			} else if (userType == 2) {
				getWinRateRankList();
			} else if (userType == 3) {
				getProfitRateRankList();
			}
		});
		tabList.eq(0).click();
	}
	
	function setGroupEvent() {
		$(".banner [groupNo]").on('click', function(e) {
			var groupNo = trim($(this).attr("groupNo"));
			if (!groupNo) {
				return;
			} 
			if (groupNo == "jxzp") {
				common.locationUrl("#jxzpList");
			} else if (groupNo == "girlPlan") {
				common.locationUrl("#girlPlan");
			} else if (groupNo == "5F5E101-BC6150") {
				common.locationUrl("#cdsd");
			} else if (groupNo == "bet") {
				common.locationUrl("#documentaryMarket");
			} else if (groupNo == "free") {
				common.locationUrl("#sign");
			} else if (groupNo == "cphb") {
				common.locationUrl("#createPresentOrder");
			} else if (groupNo == "replay") {
				common.locationUrl("#replayList");
			} else {
				common.locationUrl("#userList&groupNo=" + groupNo);
			}
		});
	}

	function setScrollEvent() {
		$('#pageContent').on('scroll', function() {
			var pcDom = this;
			var scrollHeight = pcDom.scrollHeight;
			var offsetHeight = pcDom.offsetHeight;
            var scrollTop = pcDom.scrollTop;
            var scrollTopOver = 50;
            /*if (scrollTop > scrollTopOver) {
        		$('#pageHeader').show().attr('class', 'header fade_in');
            } else {
            	$('#pageHeader').attr('class', 'header fade_out');
            }*/
            if (scrollLoad) {
            	var maxScrollTop = scrollHeight - offsetHeight;
	            if (maxScrollTop - scrollTop <= 30) {
	            	moreList();
	            }
            }
        });
	}

	function moreList() {
		pageNum++;
		getPlanList(true);		
	}
	
	function getBannerList() {
		var options = {}
		bannerCgi.getBannerList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#bannerList").html(homeView.bannerList(data));
			$("#dotList").html(homeView.dotList(data));
			setBanner();
		});
	}
	
	function getPlanList(append) {
		scrollLoad = false;
		var matchType = parseInt($('#recommendTab [matchType].active').eq(0).attr('matchType')) || 0;
		var options = {
			matchType: matchType,
			needHome: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			scrollLoad = pageNum < maxPageNum;
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0 && !getPlanList.first) {
				getPlanList.first = true;
				$('#recommendTab span').eq(1).click();
				return;
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(homeView.planList(data));
			} else {
				$("#planList").html(homeView.planList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				if (common.isWeixinBrowser()) {
					var user = common.getLoginUser();
					var spreaderUserNo = trim(user && user.userNo || '');
					var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
					var data = {
						title: userName,
						link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
						imgUrl: userImg,
						desc: '晒米场足球推荐专家',
						success: function() {
							setPageShare();
						},
						cancel: function() {
							setPageShare();	
						}
					}
					ui.showShare(data);
				}
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
		}, function() {
			scrollLoad = true;
		});
	}

	function getUserList() {
		var options = {
			groupNo: '5F5E103-BC6152',
			pageNum: 1,
			pageSize: 23	
		}
		userCgi.getUserList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 1
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userList&groupNo=5F5E103-BC6152");
			});
		});
	}
	
	function getWinRateRankList() {
		var options = {
			pageNum: 1,
			pageSize: 7
		}
		userCgi.getWinRateRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 2
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userRankList&type=2");
			});
		});
	}
	
	function getProfitRateRankList() {
		var options = {
			pageNum: 1,
			pageSize: 7
		}
		userCgi.getProfitRateRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				type: 3
			}
			$("#userList").html(homeView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
			$("#readMore").off().on("click", function(e) {
				common.locationUrl("#userRankList&type=3");
			});
		});
	}
	
	function setBanner() {
		$('#bannerList').slidesjs({
			width: 375,
			height: 125,
			navigation: false,
			pagination: false,
			play: {
		      active: false,
		      effect: "slide",
		      interval: 3000,
		      auto: true,
		      swap: true,
		      pauseOnHover: false,
		      restartDelay: 2500
		    } ,
			callback: {
				loaded: function(number) {
				},
				start: function(number) {
				},
				complete: function(number) {
					var index = number - 1;
					var dot = $("#dotList .dot");
					dot.removeClass("active");
					dot.eq(index).addClass("active");
				}
		    }
		});
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function getHotMatchList() {
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		var type = parseInt($('#hotMatchTab [type].active').eq(0).attr('type')) || 0;
		var options = {
			type: type,
			pageNum: 1,
			pageSize: 1,
			status: 4
		}
		hotMatchCgi.getHotMatchList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				if (type == 1) {
					if (!getHotMatchList.first) {
						getHotMatchList.first = true;
						$('#hotMatchTab span').eq(1).click();
					}
				} else if (type == 2) {
					$("#matchList").html('');
				}
				return;
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#matchList").html(homeView.matchList(data));
			$("#matchList .hotGame_box").on("click", function (e) {
				common.locationUrl('#hotMatch&type=' + type);
			});
			if (type == 1) {
				footballScoreUpdate();
			} else if (type == 2) {
				basketballScoreUpdate();
			}
		});
	}
	
	function getUserInfo() {
		if (common.isLogin()) {
			var options = {}
			userCgi.getUserInfo(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var user = ret.data || {};
				var isABT = user.isABT;
				if (isABT) {
					$("#bet").show();
				} else {
					$("#trader").show();
				}
			});
		} else {
			//首页可以不需要登录查看
			$("#trader").show();
		}
	}
	
	function footballScoreUpdate() {
		var url = "http://i.sporttery.cn/api/match_live_2/get_match_updated";
		$.ajax({
			url: url,
			type: "get",
			dataType: 'script',
			cache: false,
			success:function() {  
				var matchList = window.match_updated || [];
				for (var i=0, length = matchList.length; i < length; i++) {
					var sportteryMatchId = matchList[i].m_id || 0;
					var minute = matchList[i].minute || 0;
					var trueTimeSocreH = matchList[i].fs_h || 0;
					var trueTimeSocreA = matchList[i].fs_a || 0;
					var status = trim(matchList[i].status);
					if (sportteryMatchId <= 0) {
						continue;
					}
					if (minute > 0) {
						$('#beginTime'+sportteryMatchId).hide();
						$('#minute'+sportteryMatchId).html(minute+'<sup>\'</sup>').show();
					} else {
						$('#minute'+sportteryMatchId).hide();
						$('#beginTime'+sportteryMatchId).show();
					}
					if (status == 'Playing') {
						$('#vs'+sportteryMatchId).hide();
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;:&nbsp;'+trueTimeSocreA).show();
					} else {
						$('#score'+sportteryMatchId).hide();
						$('#vs'+sportteryMatchId).show();	
					}
				}
				footballScoreUpdate.timer = setTimeout(footballScoreUpdate, 15*1000);
       		},  
		});
	}

	function basketballScoreUpdate() {
		var date = new Date();
		var today = common.formatDate(date, 'yyyy-MM-dd');
		var url = "http://u1.tiyufeng.com/v2/game/date_game_list?date=" + today;
		$.ajax({
			url: url,
			type: "get",
			dataType: 'jsonp',
			cache: false,
			jsonp: "callBack",
			jsonpCallback: "basketBallScore",
			success: function(basketBallScore) { 
				var basketballHomeMap = [],
					basketballAwayMap = [],
					sportteryMatchIdMap = [];
				$(".hotGame_box .basketballHome").each(function (i, item) {
					var basketballHome = trim($(this).text());
					var sportteryMatchId = $(this).parents("li.hotGame_box").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$(".hotGame_box .basketballAway").each(function (i, item) {
					var basketballAway = trim($(this).text());
					basketballAwayMap.push(basketballAway);
				});
				for (var i = 0, length = basketBallScore.length; i < length; i++) {
					var gameStatus = parseInt(basketBallScore[i].gameStatus) || 1; //1=未开始,2=进行中,3=已结束
					var homeName = trim(basketBallScore[i].homeName) || "";
					var guestName = trim(basketBallScore[i].guestName) || "";
					var homeScore = parseInt(basketBallScore[i].homeScore) || 0;
					var guestScore = parseInt(basketBallScore[i].guestScore) || 0;
					var itemName = trim(basketBallScore[i].itemName) || "";//篮球 ,足球
					var leagueName = trim(basketBallScore[i].leagueName) || "";//联赛名
					var statusDesc = trim(basketBallScore[i].statusDesc) || "";//比赛状态
					for (var j = 0,len = basketballHomeMap.length; j < len; j++) {
						if (basketballHomeMap[j] == homeName && basketballAwayMap[j] == guestName) {
							var sportteryMatchId = sportteryMatchIdMap[j];
							if (statusDesc == "第一节" || statusDesc == "第二节" || statusDesc == "中场" || statusDesc== "第三节" || statusDesc== "第四节") {
								$('#beginTime'+sportteryMatchId).hide();
								$('#minute'+sportteryMatchId).html(statusDesc).show();
							} else {
								$('#minute'+sportteryMatchId).hide();
								$('#beginTime'+sportteryMatchId).show();
							};
							if (gameStatus == 2) {
								$('#vs'+sportteryMatchId).hide();
								$('#score'+sportteryMatchId).html(guestScore+'&nbsp;-&nbsp;'+homeScore).show();
							} else {
								$('#score'+sportteryMatchId).hide();
								$('#vs'+sportteryMatchId).show();	
							}
						}
					}
				}
				basketballScoreUpdate.timer = setTimeout(basketballScoreUpdate, 15*1000);	
       		}
		});
	}

	function getUserRankList() {
		clearTimeout(getUserRankList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		userCgi.getUserRankList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#rankList").html(homeView.rankList(data));
			$('#rankBox').off().on('click', function(e) {
				common.locationUrl('#userRankList');
			}).show();
			var textScroll = function() {
				var ul = $("#rankList");
				var li = ul.find("li");
				var length = li.length;
				if (length <= 1) {
					return;
				}
				var firstLi = li.eq(0);
				var height = firstLi.outerHeight(true);
				firstLi.animate({marginTop: -height}, 500, function() {
					firstLi.appendTo(ul).css({marginTop:0});
            		getUserRankList.timer = setTimeout(textScroll, 5000);
				});
			};
			getUserRankList.timer = setTimeout(textScroll, 5000);
		})
	}
	
	function getFloatIconInfo() {
		var options = {}
		floatIconCgi.getFloatIconInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			$("#pageContainer").append(homeView.floatIcon());
			var data = ret.data || {};
			var width = data.width/3 + 'px' || 0;
			var height = data.height/3 + 'px' || 0;
			var href = data.href;
			var src = data.src;
			$("#floatImgWrap").css({'width': width,'height': height});
			$("#floatImg").attr('src',src);
			$("#floatImgWrap").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl(href);
			})
		});
	}
});
define('controller/hotMatch',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var hotMatchView = require('view/hotMatch');
	var type = null;
	var pageNum = null;
	var pageSize = null;
	var saleTime = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 10;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
		saleTime = null;
		hideMatchFilter();
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
	}

	function setMain(view) {
		var options = {
			title: "赛事",
			className: 'hotGame',
			showHeader: true,
			isHotMatchHeader: true,
			showFooter: true,
			rightButtonText: '筛选',
			rightButtonFun: function() {
				var display = trim($('#matchFilter').css('display'));
				if (display == 'none') {
					showMatchFilter();
				} else {
					hideMatchFilter();
				}
			}
		}
		main.setMain(view, options);
		main.setContent(hotMatchView.content());
	}


	function setContent() {
		setType();
	}


	function moreList() {
		pageNum++;
		getHotMatchList(true);		
	}
	
	function setMatchFilter() {
		$('#selectLeague').val('');
		var options = {
			saleTime: saleTime,
			type: type,
			pageNum: 1,
			pageSize: 200	
		}
		matchCgi.getHotMatchLeagueList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#leagueList").html(hotMatchView.leagueList(data));
			$('#leagueList .hot_markSon').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).toggleClass('active');
			});
			$('#checkedAll').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').addClass('active');
			});
			$('#inverse').off().on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').toggleClass('active');
			});
			$('#ensure').off().on('click', ensureMatchFilter);
			var selectLeague = [];
			$.each(list, function(i, item) {
				var league = trim(item.league);
				if (league) {
					selectLeague.push(league);
				}
			});
			$('#selectLeague').val(selectLeague.join('|'));
		});
	}

	function showMatchFilter() {
		$('#matchFilterTab span').removeClass('active');
//		activeMatchFilter();
		$('#matchFilter').show();
		$('#pageHeader,#matchFilter').off().on('click', hideMatchFilter);
		$('#matchFilterTab,#leagueList').off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	function hideMatchFilter() {
		$('#matchFilter').hide();
		$('#pageHeader,#matchFilter').off('click');
		$('#matchFilterTab,#leagueList').off('click');
	}

	function ensureMatchFilter() {
		var activeLeague = $('#leagueList .hot_markSon.active');
		var selectLeague = [];
		activeLeague.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				selectLeague.push(league);
			}
		});
		if (selectLeague.length <= 0) {
			ui.showNotice('至少选择一个联赛');
			return;
		}
		$('#selectLeague').val(selectLeague.join('|'));
		hideMatchFilter();
		pageNum = 1;
		pageSize = 10;
		getHotMatchList();
	}

	/*function activeMatchFilter() {
		var leagueMap = {};
		var selectLeague = trim($('#selectLeague').val());
		selectLeague = selectLeague.split('|');
		$(selectLeague).each(function (i, league) {
			league = trim(league);
			if (league) {
				leagueMap[league] = true;
			}
		});
		var leagueList = $('#leagueList .hot_markSon');
		leagueList.removeClass('active');
		leagueList.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league && leagueMap[league]) {
				$(item).addClass('active');
			}		
		});
	}*/
	
	function setType() {
		var tabList = $('#matchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			getDateList();
		});
		//默认选中
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}
	
	/*function setMatchTab() {
		var tabList = $('#dateList .ui-flex_item');
		tabList.off().on('click', function(e) {
			tabList.removeClass('color_g');
			$(this).addClass('color_g');
			saleTime = $(this).attr("saleTime");
			setMatchFilter();
			pageNum = 1;
			pageSize = 10;
			getHotMatchList();
		});
		tabList.eq(0).click();
	}*/

	function setLeagueParam(options) {
		var selectLeague = trim($('#selectLeague').val());
		var leagueList = $('#leagueList .hot_markSon');
		var leagueArr = [];
		leagueList.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				leagueArr.push(league);	
			}	
		});
		//全部相等, 相当于全选, 不设置league查询参数, 目的是优化查询性能
		if (leagueArr.join('|') == selectLeague) {
			return;
		}
		if (selectLeague) {
			selectLeague = selectLeague.split('|');
			if (selectLeague && selectLeague.length > 0) {
				var leagueArr = [];
				$(selectLeague).each(function (i, league) {
					league = trim(league);
					if (league) {
						leagueArr.push(league);
					}
				});
				options.league = leagueArr;
			}
		}
	}
	
	function getDateList() {
		var options = {
			type: type	
		}
		matchCgi.getDateList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var date = new Date();
			var today = common.formatDate(date, 'yyyy-MM-dd');
			var list = ret.data || [];
			var data = {
				list: list,
				Date: Date,
				today: today
			}
			$("#dateList").html(hotMatchView.dateList(data));
			var tabList = $('#dateList .ui-flex_item');
			tabList.off().on('click', function(e) {
				tabList.removeClass('active');
				$(this).addClass('active');
				saleTime = $(this).attr("saleTime");
				setMatchFilter();
				pageNum = 1;
				pageSize = 10;
				getHotMatchList();
			});
			$('#dateList .ui-flex_item[saleTime='+ today +']').click();
		});
	}
	
	function getHotMatchList(append) {
		main.unsetScrollLoad();
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
		var options = {
			type: type,
			saleTime: saleTime,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		setLeagueParam(options);
		matchCgi.getHotMatchList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#matchList").append(hotMatchView.matchList(data));
			} else {
				$("#matchList").html(hotMatchView.matchList(data));
			}
			$("#matchList .hotGame_box").on("click", function (e) {
				var matchId = parseInt($(this).attr("matchId"));
				var animationUrl = trim($(this).attr('animationUrl')) || '';
				var videoUrl = trim($(this).attr('videoUrl')) || '';
				if (isNaN(matchId) || matchId <= 0) {
					return;
				}
				common.locationUrl('#hotMatchDetail&matchId=' + matchId + '&type=' + type);
				common.setCache('liveUrl',{
					animationUrl: animationUrl,
					videoUrl: videoUrl
				},24*3600*1000)
			});
			if (list.length > 0) {
				if (type == 1){
					//"竞彩"才开启定时器，"已结束"不需要
					footballScoreUpdate();
				} else if (type == 2) {
					basketballScoreUpdate();
				}
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function footballScoreUpdate() {
		var url = "//i.sporttery.cn/api/match_live_2/get_match_updated";
		$.ajax({
			url: url,
			type: "get",
			dataType: 'script',
			cache: false,
			success: function() {  
				var matchList = window.match_updated || [];
				for (var i=0, length = matchList.length; i < length; i++) {
					var sportteryMatchId = matchList[i].m_id || 0;
					var minute = matchList[i].minute || 0;
					var trueTimeSocreH = matchList[i].fs_h || 0;
					var trueTimeSocreA = matchList[i].fs_a || 0;
					var status = trim(matchList[i].status);
					if (sportteryMatchId <= 0) {
						continue;
					}
					if (minute > 0) {
						$('#beginTime'+sportteryMatchId).hide();
						$('#minute'+sportteryMatchId).html(minute+'<sup>\'</sup>').show();
					} else {
						$('#minute'+sportteryMatchId).hide();
						$('#beginTime'+sportteryMatchId).show();
					}
					if (status == 'Playing') {
						$('#vs'+sportteryMatchId).hide();
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;-&nbsp;'+trueTimeSocreA).show();
					} else {
						$('#score'+sportteryMatchId).hide();
						$('#vs'+sportteryMatchId).show();	
					}
				}
				footballScoreUpdate.timer = setTimeout(footballScoreUpdate, 15*1000);
       		}
		});
	}
	
	function basketballScoreUpdate() {
		var date = new Date();
		var today = common.formatDate(date,'yyyy-MM-dd');
		var url = "//u1.tiyufeng.com/v2/game/date_game_list?date=" + today;
		$.ajax({
			url: url,
			type: "get",
			dataType: 'jsonp',
			cache: false,
			jsonp: "callBack",
			jsonpCallback: "basketBallScore",
			success: function(basketBallScore) { 
				var basketballHomeMap = [],
				basketballAwayMap = [],
				sportteryMatchIdMap = [];
				$(".hotGame_box .basketballHome").each(function (i, item) {
					var basketballHome = trim($(this).text().replace('(主)',''));
					var sportteryMatchId = $(this).parents("li.hotGame_box").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$(".hotGame_box .basketballAway").each(function (i, item) {
					var basketballAway = trim($(this).text());
					basketballAwayMap.push(basketballAway);
				});
				for (var i=0, length = basketBallScore.length; i < length; i++) {
					var gameStatus = parseInt(basketBallScore[i].gameStatus) || 1; //1=未开始,2=进行中,3=已结束
					var homeName = trim(basketBallScore[i].homeName) || "";
					var guestName = trim(basketBallScore[i].guestName) || "";
					var homeScore = parseInt(basketBallScore[i].homeScore) || 0;
					var guestScore = parseInt(basketBallScore[i].guestScore) || 0;
					var itemName = trim(basketBallScore[i].itemName) || "";//篮球 ,足球
					var leagueName = trim(basketBallScore[i].leagueName) || "";//联赛名
					var statusDesc = trim(basketBallScore[i].statusDesc) || "";//比赛状态
					for (var j = 0,len = basketballHomeMap.length; j < len; j++) {
						if (basketballHomeMap[j] == homeName) {
							var sportteryMatchId = sportteryMatchIdMap[j];
							if (statusDesc == "第一节" || statusDesc == "第二节" || statusDesc == "中场" || statusDesc == "第三节" || statusDesc == "第四节") {
								$('#beginTime'+ sportteryMatchId).hide();
								$('#minute'+ sportteryMatchId).html(statusDesc).show();
							} else {
								$('#minute'+ sportteryMatchId).hide();
								$('#beginTime'+ sportteryMatchId).show();
							};
							if (gameStatus == 2) {
								$('#vs'+ sportteryMatchId).hide();
								$('#score'+ sportteryMatchId).html(guestScore +'&nbsp;-&nbsp;'+ homeScore).show();
							} else {
								$('#score'+ sportteryMatchId).hide();
								$('#vs'+ sportteryMatchId).show();	
							}
						}
					}
				}
				basketballScoreUpdate.timer = setTimeout(basketballScoreUpdate, 15*1000);	
       		}
		});
	}
});
define('controller/hotMatchDetail',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var planCgi = require('cgi/plan');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var comboCgi = require('cgi/combo');
	var smlrCgi = require('cgi/smlr');
	var jxzpCgi = require('cgi/jxzp');
	var matchAnalyseCgi = require('cgi/matchAnalyse');
	var hotMatchDetailView = require('view/hotMatchDetail');
	var type = null;
	var user = null;
	var matchId = null;
	var tab = null;
	var groupNo = null;
	var home = null;
	var away = null;
	var league = null;
	var pageNum = null;
	var pageSize = null;
	var loadedSmlrAndJxzp = null;
	var match = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		matchId = parseInt(common.getUrlParam("matchId")) || 0;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		loadedSmlrAndJxzp = {};
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#hotMatch&type=' + type);
		if (!window.signleSelectBettype) {
			window.signleSelectBettype = {
				selectMatch: {}	
			};
		};
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		user = null;
		matchId = null;
		tab = null;
		groupNo = null;
		home = null;
		away = null;
		league = null;
		pageNum = null;
		pageSize = null;
		loadedSmlrAndJxzp = null;
		match = null;
		clearTimeout(footballScoreUpdate.timer);
		clearTimeout(basketballScoreUpdate.timer);
//		common.clearCache('liveUrl');
	}

	function setMain(view) {
		var options = {
			title: "热门赛事",
			className: 'hotGame'
		}
		main.setMain(view, options);
		var data = {
			type: type,
			IMG_PATH: IMG_PATH
		};
		main.setContent(hotMatchDetailView.content(data));
		$('#backBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
			window.signleSelectBettype = null;
		});
		$('#homeBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.locationUrl('#home');
		});
		if (type == 1) {
			$("#analyzeBtn,#oddsBtn").show();
		}
	}


	function setContent() {
//		getUserInfo();
		getMatchInfo();
		setTab();
	}

	function setPageShare() {
		var data = {
			desc: '【'+league+'】'+home+' vs '+away+'-晒米场专家推荐汇总'
		}
		ui.setShare(data);
	}

	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			user = ret.data || {};
		});
	}

	function getMatchInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		}
		matchCgi.getMatchInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			match = ret.data || {};
			league = trim(match.league) || '';
			home = trim(match.home) || '';
			away = trim(match.away) || '';
			var result = trim(match.result) || '';
			var isSale = match.isSale || false;
			if (isSale) {
				$("#tabDg").show();
			}
			var data = {
				IMG_PATH: IMG_PATH,
				match: match
			};
			$('#match').html(hotMatchDetailView.match(data));
			showHideLive();
			if (type == 1 && !result) {
				footballScoreUpdate();
			} else if (type == 2 && !result) {
				basketballScoreUpdate();
			}
			if (tab == 4) {
				if (type == 1) {
					$("#moreGame").html(hotMatchDetailView.football(data));
				} else if (type == 2) {
					$("#moreGame").html(hotMatchDetailView.basketball(data));
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
					if (className.indexOf('active') == -1  && activeTd.length >= 6) {
						ui.showNotice('同种玩法最多选择6个');	
						return;
					} 
					matchBettype.each(function(i, item) {
						if (curMatchBettype != item) {
							$(item).find("td").removeClass("active");
						}
					});
					$(this).toggleClass("active");
					var matchBettypeJq = $(".matchBettype:has(td.active)");
					var length = matchBettypeJq.length;
					if (length > 0) {
						$("#btnWarp").show();
					} else {
						$("#btnWarp").hide();
					}
				});
				$("#sumbitBtn").off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					selectSubmit();
				})
			}
//			setPageShare();
		});
	} 
	
	function showHideLive() {
		var liveUrl = common.getCache('liveUrl');
		var animationUrl = liveUrl.animationUrl;
		var videoUrl = liveUrl.videoUrl;
		if (animationUrl != '') {	
			$("#animationBtn").addClass('active').off().on('click', function() {
				var scr = "<scr"+"ipt type='text/javascript'>location.href='"+ animationUrl + "';var iframe = window.parent.document.getElementById('liveIframe');var bHeight = iframe.contentWindow.window.frames[0].contentWindow.document.body.scrollHeight;iframe.height = bHeight;</scr"+"ipt>";
				var oIframe = '<iframe src="javascript:document.write(&quot;'+ scr +'&quot;)" frameborder="0" height="100%" width="100%" id="liveIframe" name="a"></iframe>';
				$("#liveIframeWrap").html(oIframe);
				$("#liveShowWrap").show();
				$("#hotBanner").hide();
			})
		}
		$("#liveCloseBtn").on('click', function() {
			$("#liveShowWrap").hide();
			$("#liveIframeWrap iframe").remove();
			$("#hotBanner").show();
		})
	}
	
	function setSelectMatch() {
		var matchBettypeJq = $(".matchBettype:has(td.active)");
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
		window.signleSelectBettype.selectMatch[matchId] = {
			oddsId: oddsId,
			recommend: recommend
		};
	}
	
	function selectSubmit() {
		setSelectMatch();
		var matchList = [];
		var selectMatch = window.signleSelectBettype.selectMatch || {};
		var oddsMap = {};
		$.each(match.bettype, function(i, item){
			var oddsId = parseInt(item.oddsId) || 0;
			if (isNaN(oddsId) || oddsId <= 0) {
				return;	
			}
			oddsMap[oddsId] = item;
		});
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0 || !match || !oddsMap[oddsId]) {
				return;
			}
			matchList.push({
				match: match,
				matchId: matchId,
				odds: oddsMap[oddsId],
				recommend: recommend
			});
		});
		window.signleSelectBettype = null;
		window.editSelfSelectMatch = matchList;
		common.locationUrl('#createTicketOrder');
	}
	
	function activeSelectBettype() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var selectMatch = window.signleSelectBettype.selectMatch || {};
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
		var matchBettypeJq = $(".matchBettype:has(td.active)");
		var length = matchBettypeJq.length;
		if (length > 0) {
			$("#btnWarp").show();
		} else {
			$("#btnWarp").hide();
		}
	}
	
	function getSmlrAndJxzp() {
		hasSmlrInfo();
		hasJxzpInfo();
	}

	function hasSmlrInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		};
		smlrCgi.hasSmlrInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var has = ret.data || false;
			finishSmlrAndJxzp('smlr', has);
		});	
	}

	function hasJxzpInfo() {
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var options = {
			matchId: matchId
		};
		jxzpCgi.hasJxzpInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || [];
			var length = data.length;
			finishSmlrAndJxzp('jxzp', length > 0);
			for (var i = 0; i < length; i++) {
				$("#jxzpType" + data[i]).addClass("checked").show();
			}
		});
	}

	function finishSmlrAndJxzp(type, has) {
		loadedSmlrAndJxzp[type] = has;
		if ('smlr' in loadedSmlrAndJxzp && 'jxzp' in loadedSmlrAndJxzp) {
			if (loadedSmlrAndJxzp['smlr']) {
				$("#tabLr").show();
			}
			if (loadedSmlrAndJxzp['jxzp']) {
				$("#tabJx").show();
			}
		}
	}


	function setTab() {
		var tabItem = $("#tabBox [tab]");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			$('#tabContent1,#tabContent2,#tabContent3,#tabContent4').hide();
			$('#tabContent'+tab).show();
			groupNo = null
			pageNum = 1;
			pageSize = 8;
			if (tab == 1) {
				getMatchAnalyseList();
			} else if (tab == 2) {
				getSmlrAndJxzp();
				setOddsType();
			} else if (tab == 3) {
				getPlanList.call($('#planList'));
			} else if (tab == 4) {
				getMatchInfo();
			}
		});
		//默认选中状态
//		var tabIndex = -1;
//		tabItem.each(function (i, item) {
//			var t = parseInt($(this).attr("tab"));
//			if (t == tab) {
//				tabIndex = i;
//				return;
//			}
//		});
//		if (tabIndex < 0) {
//			tabIndex = 0;
//		}
//		var item = tabItem.eq(tabIndex);
		if (type == 1) {
			tabItem.eq(0).click();
		} else if (type == 2) {
			tabItem.eq(2).click();
		}
	}

	function setGroup() {
		var groupItem = $("#groupBox [groupNo]");
		groupItem.off().on("click", function(e) {
			groupItem.removeClass('active');
			$(this).addClass('active');
			groupNo = trim($(this).attr("groupNo"));
			pageNum = 1;
			pageSize = 8;
			getPlanList.call($('#groupPlanList'));
		});
		groupItem.eq(0).click();
	}

	function getPlanList(append) {
		var jqBox = this;
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		main.unsetScrollLoad();
		var options = {
			groupNo: groupNo,
			matchId: matchId,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
			if (ret.errCode == -1) {
				$("#noPlan").show()
			} else if (ret.errCode != 0) {
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
				IMG_PATH: IMG_PATH,
				list: list,
				type: type
			}
			if (append) {
				jqBox.append(hotMatchDetailView.planList(data));
			} else {
				jqBox.html(hotMatchDetailView.planList(data));
			}
			jqBox.find(".userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场足球推荐专家',
					success: function() {
						setPageShare();
					},
					cancel: function() {
						setPageShare();
					}
				}
				ui.showShare(data);
			});
			jqBox.find(".userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			jqBox.find(".userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			jqBox.find(".planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		if (tab == 3) {
			getPlanList.call($('#planList'), true);
		}
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			var param = [];
			if (matchId) {
				param.push('matchId='+ matchId);
			}
			if (type) {
				param.push('type='+ type);
			}
			if (tab) {
				param.push('tab='+ tab);
			}
			if (param.length > 0) {
				common.setHistoryBack("#hotMatchDetail&" + param.join('&'));
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			setHistoryBack();
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}
	
	function createSmlrOrder() {
		var options = {
			matchId: matchId,
			type: type
		}
		orderCgi.createSmlrOrder(options, function(ret) {
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
					ui.showNotice('解锁成功');
					setTimeout(function() {
						getSmlrInfo();
					}, 1000);
				}
			} else {
				showNotice("支付失败");	
			}
		});
	}
	
	function getSmlrInfo() {
		var options = {
			matchId: matchId
		}
		smlrCgi.getSmlrInfo(options, function(ret) {
			if (ret.errCode == 2) {
				$("#unclockHot").show();
				$("#buyHotCold").off().on('click',function() {
					createSmlrOrder();
				});
			} else if (ret.errCode == 0) {
				$("#unclockHot").hide();
				var smlrInfo = ret.data || {};
				var maxRecommendRateKey = smlrInfo.maxRecommendRateKey || '';
				var recommendRate = parseInt((smlrInfo[maxRecommendRateKey] || {}).recommendRate) || 0;
				var showRecommendRate = recommendRate != 0;
				var data = {
					smlrInfo: smlrInfo,
					showRecommendRate: showRecommendRate
				};
				$("#smlrInfo").html(hotMatchDetailView.smlrInfo(data));
				var per = 3.6;
				var percents = recommendRate;
				var degrees = per*percents;
				$('.circle.p'+percents+ ' .bar').css({
				  '-webkit-transform' : 'rotate(' + degrees + 'deg)',
				  'transform' : 'rotate(' + degrees + 'deg)'
				});
			} else {
				ui.showNotice(ret.msg);
			}
		});
	}
	
	function setJxzpType() {
		var tabItem = $("#jxzpTypeBox [jxzpType].checked");
		tabItem.off().on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			getJxzpInfo();
		});
		tabItem.eq(0).click();
	}
	
	function createJxzpOrder() {
		var options = {
			matchId: matchId,
			type: type
		}
		orderCgi.createJxzpOrder(options, function(ret) {
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
					ui.showNotice('解锁成功');
					setTimeout(function() {
						getJxzpInfo();
					}, 1000);
				}
			} else {
				showNotice("支付失败");	
			}
		});
	}
	
	function getJxzpInfo() {
		var tabItem = $("#jxzpTypeBox [jxzpType].active").eq(0);
		var type = parseInt(tabItem.attr("jxzpType"));
		var options = {
			matchId: matchId,
			type: type
		}
		jxzpCgi.getJxzpInfo(options, function(ret) {
			if (ret.errCode == 2) {
				$('#jxzpTypeBox').hide();
				$("#unclockJxzp").show();
				$("#buyJxzp").off().on('click',function() {
					createJxzpOrder();
				});
			} else if (ret.errCode == 0) {
				$("#unclockJxzp").hide();
				$('#jxzpTypeBox').show();
				var jxzp = ret.data || {};
				var showJxzp = Object.keys(jxzp).length > 0;
				var data = {
					jxzp: jxzp,
					IMG_PATH: IMG_PATH,
					showJxzp: showJxzp
				};
				$("#jxzpInfo").html(hotMatchDetailView.jxzpInfo(data));
			} else {
				ui.showNotice(ret.msg);
			}
		})
	}
	
	function payCombo(comboNo, amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看晒米冷热<br>(1粒米=1元)", function sure() {
			var options = {
				comboNo: comboNo
			}
			orderCgi.createComboOrder(options, function(ret) {
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
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl("#smlrList");
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			
		});
	}
	
	function getMatchAnalyseList() {
		var options = {
			matchId: matchId
		}
		matchAnalyseCgi.getMatchAnalyseList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var analyse = ret.data || {};
			var data = {
					analyse: analyse,
					Object: Object,
					Math: Math,
					type: type,
					IMG_PATH: IMG_PATH
				};
			$("#tabContent1").html(hotMatchDetailView.analyzeWrap(data));
			var againstBtn = $("#againstSwitchBtn span");
			againstBtn.off().on("click", function() {
				againstBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".against_msg").hide();
				$("#against" + value).show();
			})
			againstBtn.eq(0).click();
			var HistoryHomeBtn = $("#homeHistorySwitchBtn span");
			HistoryHomeBtn.off().on("click", function() {
				HistoryHomeBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".history_home_msg").hide();
				$("#home" + value + "history").show();
			})
			HistoryHomeBtn.eq(0).click();
			var HistoryAwayBtn = $("#awayHistorySwitchBtn span");
			HistoryAwayBtn.off().on("click", function() {
				HistoryAwayBtn.removeClass('active');
				$(this).addClass('active');
				var value = trim($(this).attr('value'));
				$(".history_away_msg").hide();
				$("#away" + value + "history").show();
			})
			HistoryAwayBtn.eq(0).click();
		})
	}
	
	function setOddsType() {
		var oddsTypeItem = $("#oddsBox [oddsType]");
		oddsTypeItem.off().on("click", function(e) {
			oddsTypeItem.removeClass('active');
			$(this).addClass('active');
			var oddsType = trim($(this).attr("oddsType"));
			$('#oddsWrap,#oddsContent1,#oddsContent2').hide();
			pageNum = 1;
			pageSize = 8;
			if (oddsType == 1 || oddsType == 2 || oddsType == 3) {
				$("#oddsWrap").show();
//				getMatchOddsAnalyseList('',oddsType);
				getMatchOddsAnalyseList.call($('#oddsWrap'),'',oddsType);
			} else if (oddsType == 4) {
				$("#oddsContent1").show();
				getSmlrInfo();
			} else if (oddsType == 5) {
				$("#oddsContent2").show();
				setJxzpType();
			}
		});
		oddsTypeItem.eq(0).click();
	}
	
	function getMatchOddsAnalyseList(append,oddsType) {
		main.unsetScrollLoad();
		oddsType = oddsType || 1;
		append = append;
		var options = {
			matchId: matchId,
			type: oddsType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		matchAnalyseCgi.getMatchOddsAnalyseList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var matchOdds = ret.data && ret.data.list || [];;
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(
					function() {
						pageNum++
						getMatchOddsAnalyseList(true,oddsType)
					}
				);
			}
			var data = {
				matchOdds: matchOdds,
				oddsType: oddsType
			};
			if (append != '') {
				$("#oddsWrap").append(hotMatchDetailView.oddsWrap(data));
			} else {
				$("#oddsWrap").html(hotMatchDetailView.oddsWrap(data));
			}
		}, function() {
			main.setScrollLoad(
				function() {
					pageNum++
					getMatchOddsAnalyseList(true,oddsType)
				}
			);
		})
	}
	
	function footballScoreUpdate() {
		var url = "//i.sporttery.cn/api/match_live_2/get_match_updated";
		$.ajax({
			url: url,
			type: "get",
			dataType: 'script',
			cache: false,
			success:function() {  
				var matchList = window.match_updated || [];
				for (var i=0, length = matchList.length; i < length; i++) {
					var sportteryMatchId = matchList[i].m_id || 0;
					var minute = matchList[i].minute || 0;
					var trueTimeSocreH = matchList[i].fs_h || 0;
					var trueTimeSocreA = matchList[i].fs_a || 0;
					var status = trim(matchList[i].status);
					if (sportteryMatchId <= 0) {
						continue;
					}
					if (minute > 0) {
						$('#beginTime'+sportteryMatchId).hide();
						$('#minute'+sportteryMatchId).html(minute+'<sup>\'</sup>').show();
					} else {
						$('#minute'+sportteryMatchId).hide();
						$('#beginTime'+sportteryMatchId).show();
					}
					if (status == 'Playing') {
						$('#vs'+sportteryMatchId).hide();
						$('#score'+sportteryMatchId).html(trueTimeSocreH+'&nbsp;-&nbsp;'+trueTimeSocreA).show();
					} else {
						$('#score'+sportteryMatchId).hide();
						$('#vs'+sportteryMatchId).show();	
					}
				}
				footballScoreUpdate.timer = setTimeout(footballScoreUpdate, 15*1000);
       		},  
		});
	}
	
	function basketballScoreUpdate() {
		var date = new Date();
		var today = common.formatDate(date, 'yyyy-MM-dd');
		var url = "http://u1.tiyufeng.com/v2/game/date_game_list?date=" + today;
		$.ajax({
			url: url,
			type: "get",
			dataType: 'jsonp',
			cache: false,
			jsonp: "callBack",
			jsonpCallback: "basketBallScore",
			success: function(basketBallScore) { 
				var basketballHomeMap = [],
					basketballAwayMap = [],
					sportteryMatchIdMap = [];
				$("#teamBox .basketballHome").each(function (i, item) {
					var basketballHome = trim($(this).text().replace('(主)',''));
					var sportteryMatchId = $("#teamBox").attr("sportterymatchid");
					basketballHomeMap.push(basketballHome);
					sportteryMatchIdMap.push(sportteryMatchId)
				});
				$("#teamBox .basketballAway").each(function (i, item) {
					var basketballAway = trim($(this).text());
					basketballAwayMap.push(basketballAway);
				});
				for (var i = 0, length = basketBallScore.length; i < length; i++) {
					var gameStatus = parseInt(basketBallScore[i].gameStatus) || 1; //1=未开始,2=进行中,3=已结束
					var homeName = trim(basketBallScore[i].homeName) || "";
					var guestName = trim(basketBallScore[i].guestName) || "";
					var homeScore = parseInt(basketBallScore[i].homeScore) || 0;
					var guestScore = parseInt(basketBallScore[i].guestScore) || 0;
					var itemName = trim(basketBallScore[i].itemName) || "";//篮球 ,足球
					var leagueName = trim(basketBallScore[i].leagueName) || "";//联赛名
					var statusDesc = trim(basketBallScore[i].statusDesc) || "";//比赛状态
					for (var j = 0, len = basketballHomeMap.length; j < len; j++) {
						if (basketballHomeMap[j] == homeName && basketballAwayMap[j] == guestName) {
							var sportteryMatchId = sportteryMatchIdMap[j];
							if (statusDesc == "第一节" || statusDesc == "第二节" || statusDesc == "中场" || statusDesc== "第三节" || statusDesc== "第四节") {
								$('#beginTime'+sportteryMatchId).hide();
								$('#minute'+sportteryMatchId).html(statusDesc).show();
							} else {
								$('#minute'+sportteryMatchId).hide();
								$('#beginTime'+sportteryMatchId).show();
							};
							if (gameStatus == 2) {
								$('#vs'+sportteryMatchId).hide();
								$('#score'+sportteryMatchId).html(guestScore+'&nbsp;-&nbsp;'+homeScore).show();
							} else {
								$('#score'+sportteryMatchId).hide();
								$('#vs'+sportteryMatchId).show();	
							}
						} 
					}
				}
				basketballScoreUpdate.timer = setTimeout(basketballScoreUpdate, 15*1000);	
       		}
		});
	}
});
define('controller/index',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var indexView = require('view/index');
	var mock = null;

	function init(view) {
		mock = trim(common.getUrlParam("mock")) || "";
		setMain(view);
		setContent();
	}

	function _init(view) {
		mock = null;
	}

	function setMain(view) {
		if (mock == 'user') {
			view.setContent(indexView.mockUser());
			getGroupList();
		} else if (common.isWeixinBrowser() || common.isIosBrowser() || common.isAndroidBrowser()) {
			common.locationUrl("#home");
		} else {
			common.locationUrl("#home");
		}
	}

	function setContent() {

	}

	function getGroupList() {
		var options = {
			pageNum: 1,
			pageSize: 200,
			mock: true
		}
		userCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			var html = [];
			$.each(list, function(i, item) {
				var groupNo = trim(item.groupNo);
				var name = trim(item.name);
				html.push('<option value="'+groupNo+'">'+name+'</option>');	
			});
			$("#groupId").html(html.join(''));
			$("#groupId").on('change', function(e) {
				var groupNo = trim(this.value);
				getUserList(groupNo);
			});
			getUserList($("#groupId").val());
		});
	}

	function getUserList(groupNo) {
		groupNo = trim(groupNo);
		if (!groupNo) {
			return;
		}
		var options = {
			groupNo: groupNo,
			pageNum: 1,
			pageSize: 200,
			mock: true
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var userNo = trim(item.userNo);
				var tag = trim(item.tag);
				var nickName = trim(item.nickName);
				var realName = trim(item.realName);
				realName = realName ? '('+realName+')' : '';
				html.push('<li><span>用户：'+nickName+realName+'</span>　<span><a userNo="'+userNo+'" href="javascript:;">走起</a></span></li>');	
			});
			$("#userList").html(html.join(''));
			$("#userList a").on('click', function(e){
				var password = trim($("#password").val());
				var userNo = trim($(this).attr('userNo'));
				if (!password) {
					ui.showNotice('请填入密码');
					return;
				}
				var data = {
					password: password,
					userNo: userNo
				}
				mockUser(data, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					common.clearCache();
					common.locationUrl('./#my', '_blank');
				});
			});
		});
	}

	function mockUser(options, success, fail, sync) {
		var url = "?c=user&m=mockUser";
		var data = {
			password: options.password,
			userNo: options.userNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('controller/invitation/gpcConsumeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var gpcConsumeListView = require('view/invitation/gpcConsumeList');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "高频彩消费",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(gpcConsumeListView.content(data));
	}


	function setContent() {
		getGpcConsumeList()
	}
	
	function getGpcConsumeList() {
		var options = {
			
		}
		channelCgi.getStatisticsList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				Date: Date
			}
			$("#gpcConsumeList").html(gpcConsumeListView.gpcConsumeList(data));
			//收缩
			var gpcConsumeDate = $("#gpcConsumeList .gpcConsumeDate");
			var gpcConsumeContent = $("#gpcConsumeList .gpcConsumeContent");
			gpcConsumeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				gpcConsumeDate.find('.arrow').attr('class', 'arrow arrow_down');
				gpcConsumeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var time = $(this).attr('time');
				common.locationUrl('#invitation/seachConsumeList&ticketType=2&time=' + time);
			})
		});
	}
});
define('controller/invitation/incomeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var incomeListView = require('view/invitation/incomeList');
	var detail = null;

	function init(view) {
		detail = trim(common.getUrlParam("detail")) || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		detail = null;
		common.clearCache('incomeDetail')
	}

	function setMain(view) {
		var options = {
			title: "我的收益",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		if (detail) {
			var incomeData = common.getCache('incomeDetail');
			options.title = incomeData.month + '月收益详情'
		}
		main.setMain(view, options);
		if (detail) {
			main.setContent(incomeListView.incomeDetail());
		} else {
			main.setContent(incomeListView.content());
		}
	}


	function setContent() {
		getIncomeList();
		if (detail) {
			getIncomeDetail()
		}
	}
	
	function getIncomeList() {
		var options = {
			
		}
		channelCgi.getStatisticsList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				Date: Date
			}
			$("#incomeList").html(incomeListView.incomeList(data));
			//收缩
			var incomeDate = $("#incomeList .incomeDate");
			var incomeContent = $("#incomeList .incomeContent");
			incomeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				incomeDate.find('.arrow').attr('class', 'arrow arrow_down');
				incomeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var jcFund = parseInt($(this).attr('jcFund'));
				var gpFund = parseInt($(this).attr('gpFund'));
				var month = $(this).attr('month');
				common.setCache('incomeDetail',{'jcFund': jcFund,'gpFund': gpFund,'month': month});
				common.locationUrl('#invitation/incomeList&detail=true');
			})
		});
	}
	
	function getIncomeDetail() {
		var incomeData = common.getCache('incomeDetail');
		var data = {
			incomeData: incomeData
		}
		$("#detailData").html(incomeListView.detailData(data));
	}
});
define('controller/invitation/index',function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/clipboard');
	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var myInvitationView = require('view/invitation/index');

	function init(view) {
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "我的邀请",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myInvitationView.content(data));
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser()) {
				common.locationUrl("#my");
			}
		});
		copy();
	}


	function setContent() {
		getShareLink();
		setTab();
	}
	
	function copy() {
		var clipboard = new Clipboard('#copyBtn');
        clipboard.on('success', function(e) {
            ui.showNotice('内容已复制')
            e.clearSelection();
        });
		clipboard.on('error', function(e) {
		    ui.showNotice('请选择"拷贝"进行复制')
		});
	}
	
	function setTab() {
		var tabItem = $("#tabList .menu_bar");
		tabItem.on("click", function(e) {
			var tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				common.locationUrl("#invitation/incomeList");
			} else if (tab == 2) {
				common.locationUrl("#invitation/inviteUserList");
			} else if (tab == 3) {			
				common.locationUrl("#invitation/gpcConsumeList");
			} else if (tab == 4) {
				common.locationUrl("#invitation/jjcConsumeList");
			}
		});
	}
	
	function getShareLink() {
		var options = {};
		channelCgi.getShareLink(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var link = ret.data || '';
			$("#shareLink").val(link);
			$("#shareBtn").on('click', function() {
				if (common.isWeixinBrowser()) {
					var data = {
						title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
					}
					ui.showShare(data);
				} else if (common.isAndroidBrowser()) {
					window.Jockey && window.Jockey.send("YQShare",{
						title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
					});
				} else if (common.isIosBrowser() && common.isIos()) {
		    		window.webkit.messageHandlers.myInvitationShare.postMessage({
		    			title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
		    		});
				}
			});
			//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
			if (common.isWeixinBrowser()) {
				var data = {
					title: '彩票礼包大派送',
					link: link,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
					desc: '亲爱的，我送你一个128元彩票大礼包'
				}
				ui.setShare(data);
			}
		});
	}
});
define('controller/invitation/inviteUserList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var inviteUserListView = require('view/invitation/inviteUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 20;
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "邀请人数",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);	
		main.setContent(inviteUserListView.content());
	}


	function setContent() {
		getChannelUserList()
	}
	
	function getChannelUserList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		channelCgi.getChannelUserList(options, function(ret) {
			if(ret.errCode != 0){
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
				list: list
			}
			if (append) {
				$("#userList").append(inviteUserListView.userList(data));
			} else {
				$("#userList").html(inviteUserListView.userList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		getChannelUserList(true);
	}
});
define('controller/invitation/jjcConsumeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var jjcConsumeListView = require('view/invitation/jjcConsumeList');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞技彩消费",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(jjcConsumeListView.content(data));
	}


	function setContent() {
		getJjcConsumeList()
	}
	
	function getJjcConsumeList() {
		var options = {
			
		}
		channelCgi.getStatisticsList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				Date: Date
			}
			$("#jjcConsumeList").html(jjcConsumeListView.jjcConsumeList(data));
			//收缩
			var jjcConsumeDate = $("#jjcConsumeList .jjcConsumeDate");
			var jjcConsumeContent = $("#jjcConsumeList .jjcConsumeContent");
			jjcConsumeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				jjcConsumeDate.find('.arrow').attr('class', 'arrow arrow_down');
				jjcConsumeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var time = $(this).attr('time');
				common.locationUrl('#invitation/seachConsumeList&ticketType=1&time=' + time);
			})
		});
	}
});
define('controller/invitation/login',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var smsCgi = require('cgi/sms');
	var loginView = require('view/invitation/login');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "登录",
			className: 'activity_cpdhb'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(loginView.content(data));
		$('#smsCodeBtn').on('click', showConfirm);
		$('#loginSubmit').on('click', loginSubmit);
	}


	function setContent() {

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
					$('#smsCodeBtn').html('</span>倒计时('+count+')');
					sendSmsCode.timer = setTimeout(timer, 1000);	
				} else {
					$('#smsCodeBtn').html('</span>重新获取').on('click', showConfirm);		
				}
			}
			timer();
			closeConfirm();
		});
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
			}
			var toHash = decodeURIComponent($.trim(common.getUrlParam("toHash")));
            toHash = (toHash && /^#/.test(toHash) && toHash) || "#charge&financeType=1";
            ui.clear();
            common.clearCache();
            common.locationUrl(toHash);
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
		$("#pageContainer").append(loginView.confirm(data));
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
define('controller/invitation/seachConsumeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var seachConsumeListView = require('view/invitation/seachConsumeList');
	var ticketType = null;
	var pageNum = null;
	var pageSize = null;
	var time = null;

	function init(view) {
		ticketType = parseInt(common.getUrlParam("ticketType")) || '';
		time = trim(common.getUrlParam("time")) || '';
		pageNum = 1;
		pageSize = 20;
		setMain(view);
		setContent();
	}

	function _init(view) {
		ticketType = null;
		pageNum = null;
		pageSize = null;
		time = null;
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		var month = parseInt(time.substring(4,6));
		if (ticketType == 1) {
			options.title = month + '月竞技彩消费'
		} else if (ticketType == 2) {
			options.title = month + '月高频彩消费'
		}
		main.setMain(view, options);
		main.setContent(seachConsumeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		var year = parseInt(time.substring(0,4));
        var dayOfMonthObj = {
            '1': 31, '2': isLeapYear(year), '3': 31, '4': 30,
            '5': 31, '6': 30, '7': 31, '8': 31,
            '9': 30, '10': 31, '11': 30, '12': 31         
        };
		var beginTime = time + '01';
		var endTime = time + dayOfMonthObj[month];
		$("#beginTime").val(beginTime);
		$("#endTime").val(endTime);
		$('#beginTime,#endTime').keydown(function (e) {
            var text = trim($(this).val());
            if (e.keyCode == 8) {
                if (text && text.length == 6) {
                    e.preventDefault();
                    return;
                }
            }
       	});
       $('#beginTime,#endTime').on('input' ,function (e) {
            var text = trim($(this).val());
            if(text.length > 8) {
            	text = text.slice(0,8);
            	$(this).val(text);
            }
       });
       $("#beginTime").on('input', function() {
       		var text = trim($(this).val());
       		text = parseInt(text.substring(6,8));
       		if (text > dayOfMonthObj[month]) {
       			$(this).val(time + (dayOfMonthObj[month] - 1));
       		}
       })
       $("#endTime").on('input', function() {
       		var text = trim($(this).val());
       		text = parseInt(text.substring(6,8));
       		if (text > dayOfMonthObj[month]) {
       			$(this).val(time + dayOfMonthObj[month]);
       		}
       })
	}


	function setContent() {
		getChannelOrderList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getChannelOrderList();
	}
	
	function isLeapYear(year) {  
        if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
            return 29;
        } else {
            return 28;
        };  
    };
	
	function getChannelOrderList(append) {
		main.unsetScrollLoad();
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (beginTime.length != 8 || endTime.length != 8) {
			ui.showNotice('输入日期有误');
			return;
		}
		if (beginTime > endTime) {
			ui.showNotice('输入开始日期有误');
			return;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			ticketType: ticketType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		channelCgi.getChannelOrderList(options, function(ret) {
			if(ret.errCode != 0){
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
				list: list
			}
			if (append) {
				$("#consumeList").append(seachConsumeListView.consumeList(data));
			} else {
				$("#consumeList").html(seachConsumeListView.consumeList(data));
			}
		});
	}
	
	function moreList() {
		pageNum++;
		getChannelOrderList(true);		
	}
});
define('controller/iosEEAppDownload',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var iosEEAppDownloadView = require('view/iosEEAppDownload');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
			
	}

	function setMain(view) {
		var options = {
			title: "苹果企业版下载",
			className: 'iosAppDownload'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(iosEEAppDownloadView.content(data));
//		$("#download").on('click', function() {
//			common.locationUrl('');
//		})
	}

	function setContent() {

	}
});
define('controller/jsk3',function(require,exports) {

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
define('controller/jxzpComboList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var comboCgi = require('cgi/combo');
	var jxzpCgi = require('cgi/jxzp');
	var orderCgi = require('cgi/order');
	var jxzpComboListView = require('view/jxzpComboList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "极限追盘",
			className: 'follow',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(jxzpComboListView.content(data));
	}

	function setContent() {
		getJxzpStatistics();
		getComboList();
	}

	function getJxzpStatistics() {
		var options = {}
		jxzpCgi.getJxzpStatistics(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var winPercent = data.winPercent || '0.00';   //需补全
			$('#SPFnum').html(winPercent+'%');
			$('#SYPnum').html(winPercent+'%');
			$('#DXQnum').html(winPercent+'%');
			winPercent = winPercent.split('.'); //如果有胜平负等数据 删除
			$('#winPercentFront').html(winPercent[0]); //如果有胜平负等数据 删除
			$('#winPercentEnd').html(winPercent[1]+'%'); //如果有胜平负等数据 删除
		});
	}

	function getComboList() {
		var options = {
			comboType: 1,
			pageNum: pageNum,
			pageSize: pageSize
		}
		comboCgi.getComboList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#comboList").html(jxzpComboListView.comboList(data));
			$("#comboList .jx").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var comboNo = trim($(this).attr("comboNo"));
				var amount = parseInt($(this).attr("amount")) || 0;
				if (comboNo && amount > 0) {
					payCombo(comboNo, amount);
				}
			});
		});
	}

	function payCombo(comboNo, amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看极限追盘<br>(1粒米=1元)", function sure() {
			var options = {
				comboNo: comboNo
			}
			orderCgi.createComboOrder(options, function(ret) {
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
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl("#jxzpList");
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");
				}
			});
		}, function cancel() {
			
		});
	}
});
define('controller/jxzpList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var jxzpListView = require('view/jxzpList');
	var type = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "极限追盘",
			className: 'follow',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(jxzpListView.content(data));
	}


	function setContent() {
		setTab();
	}

	function setTab() {
		var tabItem = $("#tabBox [type]");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr("type"));
			pageNum = 1;
			pageSize = 8;
			getJxzpList();
		});
		//默认选中状态
		var typeIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("type"));
			if (t == type) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = tabItem.eq(typeIndex);
		item.click();
	}


	function moreList() {
		pageNum++;
		getJxzpList(true);		
	}
	
	function getJxzpList(append) {
		main.unsetScrollLoad();
		var options = {
			type: type,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		jxzpCgi.getJxzpList(options, function(ret) {
			if (ret.errCode == 2) {
				common.locationUrl('#jxzpComboList');	
			} else if (ret.errCode != 0) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#jxzpList").append(jxzpListView.jxzpList(data));
			} else {
				$("#jxzpList").html(jxzpListView.jxzpList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});
define('controller/login',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var smsCgi = require('cgi/sms');
	var verificationCodeCgi = require('cgi/verificationCode');
	var loginView = require('view/login');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "登录",
			className: 'login'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(loginView.content(data));
		$('#smsCodeBtn').on('click', showConfirm);
		$('#loginSubmit').on('click', loginSubmit);
		if (common.isWeixinBrowser()) {
			$('#wxLoginSubmit').on('click', userCgi.login).show();
		}
		if (common.isIos()) {
			$('#wxLoginSubmit').on('click', function() {
				window.webkit.messageHandlers.wxLogin.postMessage({});
			}).show();
		}
	}


	function setContent() {

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
					$('#smsCodeBtn').html('<span class="ver_line"></span>倒计时('+count+')');
					sendSmsCode.timer = setTimeout(timer, 1000);	
				} else {
					$('#smsCodeBtn').html('<span class="ver_line"></span>重新获取').on('click', showConfirm);		
				}
			}
			timer();
			closeConfirm();
		});
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
			}
			var toHash = decodeURIComponent($.trim(common.getUrlParam("toHash")));
			var data = ret.data;
			var uoAuth = data.uoAuth;
			var uoSign = data.uoSign;
            toHash = (toHash && /^#/.test(toHash) && toHash) || "#home";
            ui.clear();
            common.clearCache();
            common.locationUrl(toHash);
            if (common.isIos()) {
            	window.webkit.messageHandlers.mbLogin.postMessage({
            		auth: uoAuth,
            		sign: uoSign
            	});
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
		$("#pageContainer").append(loginView.confirm(data));
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
define('controller/lotteryHall',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var lotteryCgi = require('cgi/lottery');
	var userCgi = require('cgi/user');
	var main = require('module/main');
	var lotteryHallView = require('view/lotteryHall');
	var channel = null;

	function init(view) {
		channel = parseInt(common.getUrlParam("channel"));
		setMain(view);
		setContent();
	}

	function _init(view) {
		channel = null;
	}

	function setMain(view) {
		var options = {
			title: "购彩大厅",
			className: 'lotteryHall',
			showHeader: true,
			isSimpleHeader: true,
			showFooter: true
		}
		main.setMain(view, options);
	}


	function setContent() {
		lotteryList();
		if (channel == 3) {
			//不登录就唤起登录
			userCgi.getUserInfo({}, function() {}, true);
		}
	}
	
	function lotteryList() {
		var options = {};
		lotteryCgi.lotteryList(options,function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				Object: Object,
				IMG_PATH: IMG_PATH
			}
			main.setContent(lotteryHallView.content(data));
			$("#lotteryList .flex_item[lotteryId]").on('click', function() {
				var lotteryId = trim($(this).attr('lotteryId')) || '';
				var lo = lotteryId.toLowerCase();
				if (lotteryId == 'JCZQ') {
					common.locationUrl("#match&self=true&type=1")
				} else if (lotteryId == 'JCLQ'){
					common.locationUrl("#match&self=true&type=2")
				} else if (lotteryId == 'JZYP') {
					common.locationUrl("#match&self=true&type=3")
				} else if (lotteryId == 'SJBCGJ') {
					common.locationUrl("#worldCup2018")
				} else if (lotteryId == 'XYDZP') {
					common.locationUrl("#activity/turnplate")
				} else if (lotteryId == 'ZXKJ') {
					common.locationUrl("#recentAwards")
				} else {
					common.locationUrl("#" + lo);
				}
			})
		})
	}
});
define('controller/lotteryRules',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');

	var lotteryRulesView = require('view/lotteryRules');
	var lotteryId = null;

	function init(view) {
		lotteryId = trim(common.getUrlParam("lotteryId"));
		setMain(view);
		setContent();
	}

	function _init(view) {
		lotteryId = null;
	}

	function setMain(view) {
		var titleMap = {'JSK3': '快3玩法说明','GX11X5': '乐11选5玩法说明'};
		var options = {
			title: titleMap[lotteryId],
			className: 'play_explain',
			showHeader: true,
			isLeftIconHeader: true	
		}
		main.setMain(view, options);
		if (lotteryId == 'JSK3') {
			main.setContent(lotteryRulesView.k3Rules())
		} else if (lotteryId == 'GX11X5') {
			main.setContent(lotteryRulesView.gx11x5Rules())
		}   
	}


	function setContent() {

	}
});	
define('controller/match',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var matchView = require('view/match');
	var type = null;
	var matchMap = null;
	var oddsMap = null;
	var self = null;
	var tab = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 0;
		self = trim(common.getUrlParam("self")) || false;
		tab = parseInt(common.getUrlParam("tab")) || 1;
		if (!window.matchSelectBettype) {
			window.matchSelectBettype = {
				curMatch: {},
				selectMatch: {}	
			};
		};
		if (self) {
			common.setHistoryBack('#lotteryHall');
		} else {
			common.setHistoryBack('#editPlan');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		matchMap = null;
		oddsMap = null;
		self = null;
		tab = null;
	}

	function setMain(view) {
		var optios = {};
		if (self) {
			var titleMap = {1:'竞彩足球',2:'竞彩篮球',3:'竞足亚盘'}
			options = {
				title: titleMap[type],
				className: 'selectMatch',
				showHeader: true,
				rightButtonText:'筛选',
				isFootballHeader: type == 1 ? true : false,
				rightButtonFun: function() {
					var display = trim($('#matchFilter').css('display'));
					if (display == 'none') {
						showMatchFilter();
					} else {
						hideMatchFilter();
					}
				}
			}
		} else {
			options = {
				title: "足球",
				className: 'selectMatch',
				showHeader: true,
				isMatchHeader: true,
				rightButtonText: '确定',
				rightButtonFun: selectSubmit
			}
		}
		main.setMain(view, options);
		main.setContent(matchView.content());
	}

	function setContent() {
		if (self) {
			setMatchFilter();
			showHideSubmitBtn();
			if (type == 1 && self) {
				setTab();
			} else {
				getMatchList();
			}
		} else {
			setType();
		}
	}
	
	function setType() {
		var tabList = $('#matchTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			getMatchList();
		});
		//默认选中
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}
	
	function setTab() {
		var tabItem = $("#footballTab span");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab")) || 1;
			getMatchList();
			if (tab == 2) {
				$(".rightIcon_top").hide();
			} else {
				$(".rightIcon_top").show();
			}
//			var selectMatch = window.matchSelectBettype.selectMatch || {};
//			for(var key in selectMatch){
//				delete selectMatch[key];
//			}
//			var length = Object.keys(selectMatch).length;
//			if (length > 0) {
//				$("#buyList").show();
//			} else {
//				$("#buyList").hide();
//			}
//			$("#buyList").hide();
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab")) || 0;
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	function selectSubmit() {
		if (isNaN(type) || type <= 0 || (type != 1 && type != 2 && type != 3)) {
			ui.showNotice("赛事类型有误");
			setTimeout(function () {
				common.locationUrl('#editPlan');
			}, 1000);
			return;
		}
		setSelectMatch();
		var matchList = [];
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0 || !matchMap[matchId] || !oddsMap[oddsId]) {
				return;
			}
			matchList.push({
				match: matchMap[matchId],
				odds: oddsMap[oddsId],
				recommend: recommend
			});
		});
		if (matchList.length <= 0) {
			ui.showNotice("请选择一场比赛");
			return;	
		} else if (matchList.length > 8) {
			ui.showNotice("最多只能选择8场比赛");
			return;
		}
		if (!self) {
			if (matchList.length == 1) {
				var recommend = matchList[0].recommend || [];
				var odds = matchList[0].odds || {};
				var bettypeContent = trim(odds.bettypeContent) || '';
				var bettypeOdds = odds.bettypeOdds || {};
				if(ENV != 'beta') {
					if (bettypeContent == 'SPF' || bettypeContent == 'RQSPF') {
						if (recommend.length == 1) {
							var rd = recommend[0] || '';
							var od = bettypeOdds[rd] || 0;
							if (od < 1.5) {
								ui.showNotice("胜平负单关推荐只能选1.5以上的赔率");
								return;	
							}
						} else {
							ui.showNotice("胜平负单关推荐只能单选");
							return;
						}
					}
				}
			}
		}
		var txtMap = {'BF':'"比分"','BQC':'"半全场"','SFC':'"胜分差"'};
		for (var i = 0, length = matchList.length; i < length; i++) {
			var odds = matchList[i].odds || {};
			var bettypeContent = trim(odds.bettypeContent) || '';
			if (bettypeContent == 'ZJQ' && length > 6) {
				ui.showNotice("包含'总进球'玩法的比赛,最多选6场");
				return;
			}　else if ((bettypeContent == 'BF' || bettypeContent == 'BQC' || bettypeContent == 'SFC') && length > 4) {
				ui.showNotice("包含"+txtMap[bettypeContent]+"玩法的比赛,最多选4场");
				return;
			}
			if (self) {
				if (odds.single != 1 && matchList.length < 2) {
					ui.showNotice("非单关至少选择两场比赛");
					return;
				}
			}
		}
		window.matchSelectBettype = null;
		if (self) {
			window.editSelfSelectMatch = matchList;
			common.locationUrl('#createTicketOrder&selfTicket=true&type='+ type + '&tab=' + tab);
		} else {
			window.editPlanSelectMatch = matchList;
			common.locationUrl('#editPlan&matchType='+ type);
		}
	}

	function getMatchList() {
		var options = {
			type: type
		}
		if (type == 1 && tab == 2) {
			options.needSingle = true
		}
		if (type == 3) {
			options.type = 1;
			options.needYaPan = true
		}
		setLeagueParam(options);
		matchCgi.getMatchList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			matchMap = {};
			oddsMap = {};
			$.each(list, function (i, item) {
				var matchList = item.matchList || [];
				$.each(matchList, function (i, item) {
					var matchId = parseInt(item.matchId) || 0;	
					var beginTime = trim(item.beginTime);
					var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
					item.bDate = common.formatDate(beginTimeOb, 'MM-DD');
					item.bTime = common.formatDate(beginTimeOb, 'HH:II');
					if (isNaN(matchId) || matchId <= 0) {
						return;
					}
					//设置比赛,赔率映射map
					matchMap[matchId] = item;
					$.each(item.bettype, function(i, item){
						var oddsId = parseInt(item.oddsId) || 0;
						if (isNaN(oddsId) || oddsId <= 0) {
							return;	
						}
						oddsMap[oddsId] = item;
					});
				});
			});
			var data = {
				list: list
			}
			if (type == 1) {
				if (self) {
					if (tab == 1) {
						$("#matchList").html(matchView.football(data));
					} else if (tab == 2) {
						$("#matchList").html(matchView.SPFDG(data));
					}
				} else {
					$("#matchList").html(matchView.football(data));
				}
				
			} else if (type == 2) {
				$("#matchList").html(matchView.basketball(data));
			} else if (type == 3) {
				$("#matchList").html(matchView.JZYP(data));
			}
			
			//高亮选择的玩法
			activeSelectBettype();
			//结果选择
			var matchBettypeTd = $("#matchList .matchBettype td[recommend]");
			matchBettypeTd.on('click', function(e) {
				var className = trim(this.className);
				var curMatchTable = $(this).parents('.match_table').eq(0);
				var matchId = parseInt(curMatchTable.attr("matchId"));
				if (isNaN(matchId) || matchId <= 0) {
					return;
				}
				var curMatchBettype = this.parentNode;
				var activeTd = $(curMatchBettype).find("td.active");
				if (!self) {
					if (type == 1) {
						if (className.indexOf('active') == -1  && activeTd.length >= 2) {
							ui.showNotice('胜平负玩法最多选择两个');	
							return;
						} 
					} else if (type == 2) {
						if (className.indexOf('active') == -1  && activeTd.length >= 1) {
							ui.showNotice('胜负或大小分玩法最多选择一个');	
							return;
						}
					}
				}
				var matchBettype = curMatchTable.find('.matchBettype');
				matchBettype.each(function(i, item) {
					if (curMatchBettype != item) {
						$(item).find("td").removeClass("active");
					}
				});
				if (type == 3) {
					$(this).siblings('td.' + matchId + 'v').removeClass("active")
				}
				$(this).toggleClass("active");
				//删除之前的更多玩法选择
				$('#moreBettype' + matchId).removeClass('current');
				delete window.matchSelectBettype.selectMatch[matchId];
				if (self) {
					showHideSubmitBtn();
				}
			});
			//更多玩法
			$("#matchList td.more_game").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var curMatchTable = $(this).parents('.match_table').eq(0);
				var matchId = parseInt(curMatchTable.attr("matchId"));
				if (isNaN(matchId) || matchId <= 0 || !matchMap[matchId]) {
					return;
				}
				window.matchSelectBettype.curMatch =  matchMap[matchId];
				setSelectMatch();
				if (self) {
					common.locationUrl('#matchMoreBettype&self=' + self + '&type=' + type);
				} else {
					common.locationUrl('#matchMoreBettype&type=' + type);
				}
			});
			//比赛展开,收缩
			var matchDate = $("#matchList .matchDate");
			var matchContent = $("#matchList .matchContent");
			matchDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				matchDate.find('.arrow').attr('class', 'arrow arrow_down');
				matchContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
		});
	}

	//高亮选择玩法
	function activeSelectBettype() {
		var matchBettype = $('#matchList .matchBettype');
		var recommendDomMap = {};
		$.each(matchBettype, function(i, item) {
			var oddsId = parseInt($(item).attr("oddsId"));
			if (isNaN(oddsId) || oddsId <= 0) {
				return;
			}
			$(item).find("td[recommend]").each(function(i, item) {
				var rd = trim($(item).attr("recommend"));
				if (rd) {
					recommendDomMap[oddsId+'|'+rd] = item;
				}
			});
		});
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		$.each(selectMatch, function(matchId, item) {
			matchId = parseInt(matchId);
			var oddsId = parseInt(item.oddsId);
			var recommend = item.recommend || [];
			if (isNaN(matchId) || matchId <= 0 || isNaN(oddsId) || oddsId <= 0 || !recommend || recommend.length <= 0) {
				return;
			}
			var selected = false;
			$.each(recommend, function(i, rd) {
				if (rd && recommendDomMap[oddsId+'|'+rd]) {
					$(recommendDomMap[oddsId+'|'+rd]).addClass('active');
					selected = true;
				}
			});
			if (!selected) {
				$('#moreBettype' + matchId).addClass('current');
			}
		});
	}

	//记录当前选择的比赛
	function setSelectMatch() {
		var matchBettypeJq =  $("#matchList .matchBettype:has(td.active)");
		matchBettypeJq.each(function(i, item) {
			var oddsId = parseInt($(item).attr("oddsId"));
			if (isNaN(oddsId) || oddsId <= 0) {
				return;
			}
			var matchTable = $(item).parents('.match_table').eq(0);
			var matchId = parseInt(matchTable.attr("matchId"));
			if (isNaN(matchId) || matchId <= 0) {
				return;
			}
			var recommend = [];
			var activeTd = $(item).find('td.active');
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
		});
	}
	
	function showHideSubmitBtn() {
		setSelectMatch();
		var selectMatch = window.matchSelectBettype.selectMatch || {};
		var length = Object.keys(selectMatch).length;
		$("#selectNum").html(length);
		if (length > 0) {
			$("#buyList").show();
		} else {
			$("#buyList").hide();
		}
		$("#createTicketSubmit").off().on('click', selectSubmit);
	}
	
	//筛选
	function setLeagueParam(options) {
		var selectLeague = trim($('#selectLeague').val());
		var leagueList = $('#leagueList .hot_markSon');
		var leagueArr = [];
		leagueList.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				leagueArr.push(league);	
			}	
		});
		//全部相等, 相当于全选, 不设置league查询参数, 目的是优化查询性能
		if (leagueArr.join('|') == selectLeague) {
			return;
		}
		if (selectLeague) {
			selectLeague = selectLeague.split('|');
			if (selectLeague && selectLeague.length > 0) {
				var leagueArr = [];
				$(selectLeague).each(function (i, league) {
					league = trim(league);
					if (league) {
						leagueArr.push(league);
					}
				});
				options.league = leagueArr;
			}
		}
	}
	function setMatchFilter() {
		$('#selectLeague').val('');
		var options = {
			type: type,
			status: 1,
			pageNum: 1,
			pageSize: 200	
		}
		if (type == 3) {
			options.type = 1;
			options.needYaPan = true
		}
		matchCgi.getMatchLeagueList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#leagueList").html(matchView.leagueList(data));
			$('#leagueList .hot_markSon').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).toggleClass('active');
			});
			$('#checkedAll').on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').addClass('active');
			});
			$('#inverse').off().on('click', function(e) {
				$('#matchFilterTab span').removeClass('active');
				$(this).addClass('active');
				$('#leagueList .hot_markSon').toggleClass('active');
			});
			$('#ensure').off().on('click', ensureMatchFilter);
			var selectLeague = [];
			$.each(list, function(i, item) {
				var league = trim(item.league);
				if (league) {
					selectLeague.push(league);
				}
			});
			$('#selectLeague').val(selectLeague.join('|'));
		});
	}

	function showMatchFilter() {
		$('#matchFilterTab span').removeClass('active');
		$('#matchFilter').show();
		$('#pageHeader,#matchFilter').off().on('click', hideMatchFilter);
		$('#matchFilterTab,#leagueList').off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	function hideMatchFilter() {
		$('#matchFilter').hide();
		$('#pageHeader,#matchFilter').off('click');
		$('#matchFilterTab,#leagueList').off('click');
	}

	function ensureMatchFilter() {
		var activeLeague = $('#leagueList .hot_markSon.active');
		var selectLeague = [];
		activeLeague.each(function (i, item) {
			var league = trim(item.innerHTML);
			if (league) {
				selectLeague.push(league);
			}
		});
		if (selectLeague.length <= 0) {
			ui.showNotice('至少选择一个联赛');
			return;
		}
		$('#selectLeague').val(selectLeague.join('|'));
		hideMatchFilter();
		getMatchList();
	}
});
define('controller/matchMoreBettype',function(require,exports) {

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
define('controller/my',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var myView = require('view/my');
	var tab = null;
	var userRight = null;
	var pageNum = null;
	var pageSize = null;
	var isABT = null;
	var isChannel = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 4;
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		tab = null;	
		userRight = null;
		pageNum = null;
		pageSize = null;
		isABT = null;
		isChannel = null;
	}

	function setMain(view) {
		var options = {
			title: "我的",
			className: 'user',
			showFooter: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myView.content(data));
	}


	function setContent() {
		getUserInfo();
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
			var profileImg = trim(user.profileImg) || "";
			var personalImg = trim(user.personalImg) || "";
			var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
			var userName = realName || nickName;
			var userTag = user.tag;
			isABT = user.isABT;
			userRight = user.userRight || {};
			isChannel = user.isChannel;
			$("#userImg").attr("src", userImg);
			$("#userName").html(userName);
			if (userRight['1']) {
				//$("#userFinance").show();
				$("#editPlan").show();
				$("#editPlan").on("click", function(e) {
					common.locationUrl('#editPlan');
				});
			} else if (userRight['3']) {
				$("#editPlan").show();
				$("#editPlan").on("click", function(e) {
					common.locationUrl('#editDigitalPlan');
				});
			}
			$("#topBox [href]").on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			getUserFinanceInfo(0);
			if (isABT) {
				getUserFinanceInfo(1);
				$("#handsel").show()
			} else {
				$("#handsel").hide();
			}
			setTab();
		});
	}

	function getUserFinanceInfo(financeType) {
		financeType = parseInt(financeType) || 0;//0=方案, 1=出票
		var options = {
			financeType: financeType
		}
		userCgi.getUserFinanceInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var chargeAmount = (parseInt(data.chargeAmount) || 0)/100;
			var incomeAmount = (parseInt(data.incomeAmount) || 0)/100;
			var mobile = data.mobile || '';
			if (mobile) {
				$(".phone_num").append(mobile);
			} else {
				$("#noNum").show();
				$("#bindMobile").on('click',function(){
					common.locationUrl('#bindMobile');
				})
			}
			if (financeType == 0) {
				var userBalance = chargeAmount + incomeAmount;
				if (userBalance < 0) {
					userBalance = 0;
				}
				$("#userBalance").html(userBalance);
			}
			if (financeType == 1) {
				var handselBalance = chargeAmount + incomeAmount;
				handselBalance = handselBalance.toFixed(2);
				if (handselBalance < 0) {
					handselBalance = 0;
				}
				$("#handselBalance").html(handselBalance);
			}
		});
	}

	function getOrderContent() {
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#infoList").html(myView.orderContent(data));
		getOrderList();
	}

	function getOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize		
		}
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			$('#orderCount').html(totalCount);
			$('#orderAmount').html(totalAmount/100);
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
				$("#orderList").append(myView.orderList(data));
			} else {
				$("#orderList").html(myView.orderList(data));
				//getJxzpOrderInfo();
			}
			$("#orderList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#orderList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function setTab() {
		var data = {
			userRight: userRight,
			isABT: isABT,
			isChannel: isChannel,
			isWeixinBrowser: common.isWeixinBrowser()
		};
		$("#tabList").html(myView.tabList(data));
//		if (userRight['1'] || userRight['2'] || userRight['3'] || isABT) {
//			$("#tabList").show();
//		} else {
//			$("#tabList").hide();
//		}
		var tabItem = $("#tabList .user_menu_item");
		tabItem.on("click", function(e) {
			tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				common.locationUrl("#myBet");
			} else if (tab == 2) {
				common.locationUrl("#myCoupon");
			} else if (tab == 3) {			
				common.locationUrl("#myFinance");
			} else if (tab == 4) {
				if (userRight['1']) {
					common.locationUrl("#myPlan");				 
				} else if (userRight['3']) {
					common.locationUrl("#myDigitalPlan");
				}
			} else if (tab == 5) {
				common.locationUrl("#myShare");
			} else if (tab == 6) {
				common.locationUrl("#myTrade");
			} else if (tab == 7) {
				common.locationUrl("#focusList");
			} else if (tab == 8) {
				common.locationUrl("#presentOrderList");
			} else if (tab == 9) {
				common.locationUrl("#invitation/index");
			}
		});
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			if (tab) {
				common.setHistoryBack("#my&tab="+tab);
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			setHistoryBack();
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}

	function moreList() {
		pageNum++;
		if (tab == 1) {
			getRecommendList(true);
		} else if (tab == 2) {
			getSpreadList(true);
		} else if (tab == 3) {
			getOrderList(true);
		} else if (tab == 4) {
			getTicketOrderList(true);
		}
	}
	
	function getJxzpOrderInfo() {
		var options = {}
		orderCgi.getJxzpOrderInfo(options, function(ret) {
			var jxzpInfo = ret.data || {};
			var beginTime = jxzpInfo.beginTime;
			var endTime = jxzpInfo.endTime;
			var period = beginTime + '-' + endTime;
			var isExpire = jxzpInfo.isExpire;
			var orderLength = $("#orderList li.item").length;
			var isEmptyObject = Object.keys(jxzpInfo).length <= 0;
			if (!isEmptyObject) {
				$('#period').html(period);
				$('#jxzpOrderInfo').show();
			} else if (orderLength <= 0) {
				$('#noMatch').show();
			}
			if (isExpire) {
				$("#renew").show().on('click',function() {
					common.locationUrl('#jxzpComboList');			
				});
			}
		}) 
	}
});
define('controller/myBet',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myBetView = require('view/myBet');
	var tab = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 0;
		pageNum = 1;
		pageSize = 15;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		tab = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "我的投注",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myBetView.content(data));
	}


	function setContent() {
		setTab();
	}
	
	function getTicketOrderList(append) {
		main.unsetScrollLoad();
		var ticketType;
		var ticketStatus = [];
		if (tab == 0) {
			ticketType = 0;	
		} else if (tab == 1) {
			ticketType = 1;
		} else if (tab == 2) {
			ticketType = 2;
		} else if (tab == 3) {
			ticketType = 0;
			ticketStatus = [4,5,6];
		};
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			ticketType: ticketType,
			ticketStatus: ticketStatus
		}
		orderCgi.getTicketOrderList(options, function(ret) {
			if(ret.errCode != 0){
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
				$("#ticketOrderList").append(myBetView.ticketOrderList(data));
			} else {
				$("#ticketOrderList").html(myBetView.ticketOrderList(data));
			}
			$("#ticketOrderList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#ticketOrderList .doct_item").off().on("click", function(e) {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#ticketOrderDetail&orderNo=" + orderNo);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		getTicketOrderList(true);
	}
	
	function setTab() {
		var tabItem = $("#tabList .ui-flex_item");
		tabItem.on("click", function(e) {
			tabItem.removeClass("active");
			$(this).addClass("active");
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 15;
			getTicketOrderList();
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab"));
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
});
define('controller/myCoupon',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var couponCgi = require('cgi/coupon');
	var main = require('module/main');
	var myCouponView = require('view/myCoupon');
	var illustrate = null;
	var state = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		illustrate = trim(common.getUrlParam("illustrate"));
		state = parseInt(common.getUrlParam("state"));
		pageNum = 1;
		pageSize = 15
		setMain(view);
		setContent();
	}

	function _init(view) {
		illustrate = null;
		state = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {};
		if (illustrate) {
			options = {
				title: "优惠券使用说明",
				className: 'coupon',
				showHeader: true,
				isLeftIconHeader: true
			}
		} else {
			options = {
				title: "优惠券",
				className: 'coupon',
				showHeader: true,
				rightButtonText: '说明',
				rightButtonFun: function() {
					common.locationUrl('#myCoupon&illustrate=true');
				}
			}
		}
		main.setMain(view, options);
		if (illustrate) {
			main.setContent(myCouponView.couponIllustrate());
		} else {
			main.setContent(myCouponView.coupon());
		}
	}


	function setContent() {
		setTab()
	}
	
	function setTab() {
		var tabList = $('#tabBox .ui-flex_item');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			state = parseInt($(this).attr('state')) || 1;
			pageNum = 1;
			pageSize = 15;
			getUserCouponList();
		});
		//默认选中
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('state')) || 0;
			if (state == t) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		tabList.eq(tabIndex).click();
	}
	
	function getUserCouponList(append) {
		var options = {
			state: state,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		couponCgi.getUserCouponList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var availableCount = (ret.data && ret.data.availableCount) || 0;
			var distributeCount = (ret.data && ret.data.distributeCount) || 0;
			$("#availableCount").html("(" + availableCount + ")");
			$("#distributeCount").html("(" + distributeCount + ")");
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH,
				state: state
			}
			if (append) {
				$("#couponList").append(myCouponView.couponList(data));
			} else {
				$("#couponList").html(myCouponView.couponList(data));
			}
			$(".use_btn").on('click', function() {
				var couponType = $(this).attr('couponType');
				if (couponType == 1) {
					common.locationUrl('#lotteryHall');
				} else if (couponType == 2) {
					common.locationUrl('#charge&financeType=1');
				}
				
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		getUserCouponList(true);
	}
});
define('controller/myDigitalPlan',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var myDigitalPlanView = require('view/myDigitalPlan');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "我的晒米",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myDigitalPlanView.content(data));
	}


	function setContent() {
		getRecommendList();
	}
	
	function getRecommendList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		planCgi.getDigitalPlanList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalIncomeCount = (ret.data && ret.data.totalIncomeCount) || 0;
			var totalIncomeAmount = (ret.data && ret.data.totalIncomeAmount) || 0;
			$("#recommendIncomeCount").html(totalIncomeCount);
			$("#recommendIncomeAmount").html(totalIncomeAmount/100);
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
				$("#recommendList").append(myDigitalPlanView.recommendList(data));
			} else {
				$("#recommendList").html(myDigitalPlanView.recommendList(data));
			}
			$("#recommendList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#recommendList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getRecommendList(true);
	}
});
define('controller/myFinance',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var myFinanceView = require('view/myFinance');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 1;
		pageNum = 1;
		pageSize = 20;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "账户明细",
			className: 'moneyNode',
			showHeader: true,
			isFinanceHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(myFinanceView.content(data));
	}


	function setContent() {
		setType();
	}


	function moreList() {
		pageNum++;
		getFinanceRecordList(true);		
	}
	
	function getFinanceRecordList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getFinanceRecordList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#financeRecordList").append(myFinanceView.financeRecordList(data));
			} else {
				$("#financeRecordList").html(myFinanceView.financeRecordList(data));
			}
			$('#financeRecordList [remark]').off().on('click', function(e) {
				var remark = trim($(this).attr('remark')) || '';
				if (!remark) {
					return;
				}
				ui.showAlert(remark);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function setType() {
		var typeItem = $("#financeTab [financeType]");
		typeItem.on("click", function(e) {
			typeItem.removeClass("active");
			$(this).addClass("active");
			financeType = parseInt($(this).attr("financeType"));
			pageNum = 1;
			pageSize = 20;
			getFinanceRecordList();
		});
		//默认选中状态
		var typeIndex = -1;
		typeItem.each(function (i, item) {
			var t = parseInt($(this).attr("financeType"));
			if (t == financeType) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = typeItem.eq(typeIndex);
		item.click();
	}
});
define('controller/myPlan',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var myPlanView = require('view/myPlan');
	var recommendType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		recommendType = parseInt(common.getUrlParam("recommendType")) || 0;
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		recommendType = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "我的晒米",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myPlanView.content(data));
	}


	function setContent() {
		setType();
	}
	
	function getRecommendList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			recommendType: recommendType
		}
		planCgi.getPlanList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalIncomeCount = (ret.data && ret.data.totalIncomeCount) || 0;
			var totalIncomeAmount = (ret.data && ret.data.totalIncomeAmount) || 0;
			$("#recommendIncomeCount").html(totalIncomeCount);
			$("#recommendIncomeAmount").html(totalIncomeAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#recommendList").append(myPlanView.recommendList(data));
			} else {
				$("#recommendList").html(myPlanView.recommendList(data));
			}
			$("#recommendList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#recommendList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			if (recommendType) {
				common.setHistoryBack("#my");
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			setHistoryBack();
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getRecommendList(true);
	}
	
	function setType() {
		var typeItem = $("#typeList .ui-flex_item");
		typeItem.on("click", function(e) {
			typeItem.removeClass("active");
			$(this).addClass("active");
			recommendType = parseInt($(this).attr("recommendType"));
			if (recommendType == 1 || recommendType == 2) {
				$("#countNum").hide();
			} else {
				$("#countNum").show();
			}
			pageNum = 1;
			pageSize = 15;
			getRecommendList();
		});
		//默认选中状态
		var typeIndex = -1;
		typeItem.each(function (i, item) {
			var t = parseInt($(this).attr("recommendType"));
			if (t == recommendType) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = typeItem.eq(typeIndex);
		item.click();
	}
});
define('controller/myShare',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myShareView = require('view/myShare');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "分享收成",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myShareView.content(data));
	}


	function setContent() {
		getSpreadList();
	}
	
	function getSpreadList(append) {
		main.unsetScrollLoad();
		var options = {
			needUser: true,
			needSpread: true,
			needPlanAccess: true,
			pageNum: pageNum,
			pageSize: pageSize		
		}
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			$('#spreadIncomeCount').html(totalCount);
			$('#spreadIncomeAmount').html(totalAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#spreadList").append(myShareView.spreadList(data));
			} else {
				$("#spreadList").html(myShareView.spreadList(data));
			}
			$("#spreadList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#spreadList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			common.setHistoryBack("#my");
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		var planType = parseInt($(this).attr("planType"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (planType == 1) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (planType == 2) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getRecommendList(true);
	}
});
define('controller/myTrade',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myTradeView = require('view/myTrade');
	var pageNum = null;
	var pageSize = null;
	var tab = null;

	function init(view) {
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		tab = null;
	}

	function setMain(view) {
		var options = {
			title: "已购推荐",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myTradeView.content(data));
	}


	function setContent() {
		setTab()
	}
	
	function setTab() {
		var tabItem = $("#tabList .ui-flex_item");
		tabItem.on("click", function(e) {
			tabItem.removeClass("active");
			$(this).addClass("active");
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 15;
			getOrderList();
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab"));
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	function getOrderList(append) {
		main.unsetScrollLoad();
		var plantype;
		if (tab == 0) {
			planType = 1
		} else if (tab == 1) {
			planType = 2
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			planType: planType
		}
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			$('#orderCount').html(totalCount);
			$('#orderAmount').html(totalAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (tab == 0) {
				if (append) {
					$("#orderList").append(myTradeView.orderList(data));
				} else {
					$("#orderList").html(myTradeView.orderList(data));
				}
			} else if (tab == 1) {
				if (append) {
					$("#orderList").append(myTradeView.digitalOrderList(data));
				} else {
					$("#orderList").html(myTradeView.digitalOrderList(data));
				}
			}
			$("#orderList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#orderList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (tab == 0) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (tab == 1) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getOrderList(true);
	}
});
define('controller/officialSite',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var officialSiteView = require('view/officialSite');
	var auto = null;

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
			
	}

	function setMain(view) {
		var options = {
			title: '晒米场官网',
			className: 'officialSite'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isAndroidBrowser() || common.isIosBrowser()) {
			showMobile(data);
		} else {
			showPc(data);
		}
	}

	function setContent() {

	}
	
	function showPc(data) {
		main.setContent(officialSiteView.pc(data));
		$("#hoverCode,#topCode").hover(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#topCode").show();
		},function (e) { 
			e.preventDefault();
			e.stopPropagation();
            $("#topCode").hide();  
        });
        $("#androidQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeOut(function(){
				$("#androidQrCode").removeClass("show");
			});
		});
		$("#iosQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeOut(function(){
				$("#iosQrCode").removeClass("show");
			});
		});
		$('#topAndroidBtn,#bottomAndroidBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeIn(function(){
				$("#androidQrCode").addClass("show");
			});
		});	
		$('#topIphoneBtn,#bottomIphoneBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeIn(function(){
				$("#iosQrCode").addClass("show");
			});
		});	
	}
	
	function showMobile(data) {
		main.setContent(officialSiteView.mobile(data));
		$("#mobileTopDownAndriod,#mobileBottomDownAndriod").click(function(){
			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii.apk');
		});
		$("#mobileTopDownIos,#mobileBottomDownIos").on('click', function() {
			common.locationUrl('https://itunes.apple.com/us/app/id1154395135?l=zh&ls=1&mt=8');
		})
	}
});
define('controller/pc',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var pcView = require('view/pc');

	function init(view) {
		$('body').css('overflow', 'hidden');
		setMain(view);
		setContent();
	}

	function _init(view) {
		$('body').css('overflow', 'auto');
	}

	function setMain(view) {
		view.setContent(pcView.content());
	}

	function setContent() {

	}
});
define('controller/planDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var focusCgi = require('cgi/focus');
	var planDetailView = require('view/planDetail');
	var planNo = null;
	var transdata = null;

	function init(view) {
		planNo = trim(common.getUrlParam("planNo")) || "";
		transdata = trim(common.getUrlParam("transdata")) || "";
		if (transdata) {
			//防止购买成功，有缓存
			common.clearCache('c=plan&m=planInfo');
			common.clearCache('c=plan&m=planList');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		planNo = null;
		transdata = null;
		closeMask();
	}

	function setMain(view) {
		var options = {
			title: "推荐详情",
			className: 'expertRcmd',
			showHeader: true,
		}
		main.setMain(view, options);
	}


	function setContent() {
		getPlanInfo();
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
			if (ret.errCode == 2) {
				if (transdata) {
					ui.showAttention('支付单正在处理中，请稍等...');
					setTimeout(getPlanInfo, 5000)
				} else {
					payPlan(ret.data);
				}
				return;	
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.closeAttention();
			var plan = ret.data || {};
			var data = {
				IMG_PATH: IMG_PATH,
				plan: plan
			}
			var showMask = (function() {
				closeMask();
				var ticketOrderHint = common.getCache('ticketOrderHint');
				var isSale = plan.isSale;
				if (isSale && !ticketOrderHint) {
					$("body").append(planDetailView.mask());
					ticketOrderHint = true;
					common.setCache('ticketOrderHint', ticketOrderHint, 1000*3600*24*2);//1000天失效
				}
				$("#ticketOrderMask").on('click',function(){
					closeMask();
				})
			})();
			main.setContent(planDetailView.content(data));
			//添加预览
			$('#planDetail .planpic').on('click', previewImage);
			$("#userMore").on('click', function() {
				var userNo = trim($(this).attr('userNo')) || '';
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			})
			$("#bottomBox [href]").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#upCount, #downCount").on('click', function(e) {
				var id = trim($(this).attr('id'));
				var planNo = trim($(this).attr('planNo'));
				if (!id || !planNo) {
					return;
				}
				var planCount = common.getCache('planCount');
				if (planCount) {
					if (!!planCount[id][planNo]) {
						ui.showNotice('您已参与过');
						return;
					}
				} else {
					planCount = {
						upCount: {},
						downCount: {},
						shareCount: {}
					}	
				}
				var countFun = (function(dom) {
					return function() {
						var id = trim($(dom).attr('id'));
						var count = parseInt($("#"+id+'Num').html()) || 0;
						$("#"+id+'Num').html(count+1);
						planCount[id][planNo] = true;
						common.setCache('planCount', planCount, 1000*3600*24*1000);//1000天失效
					}
				})(this);
				var cgiFun = '';
				if (id == 'upCount') {
					cgiFun = 'planUpCount';	
				} else if (id == 'downCount') {
					cgiFun = 'planDownCount';	
				}
				if (cgiFun) {
					planCgi[cgiFun]({
						planNo: planNo
					}, countFun, countFun)
				}
			});
			$("#addTicket").on('click', function() {
				common.locationUrl('#createTicketOrder&planNo='+planNo);
			});
			var planUser = plan.user;
			var planNo = plan.planNo;
			var match = plan.matchList[0];
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var userNo = planUser.userNo;
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName + '推荐',
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#planDetail&planNo=' + planNo,
				imgUrl: userImg,
				desc: '【' + match.league + '】' + match.home + ' vs ' + match.away + '|晒米场',
				success: function() {
					var count = parseInt($("#shareCountNum").html()) || 0;
					$("#shareCountNum").html(count+1);
					planCgi.planShareCount({
						planNo: planNo
					});	
				}
			}
			ui.setShare(shareData);
			$("#shareCount").on('click', function(e) {
				ui.showShare(shareData);
				if (common.isIosBrowser() && common.isIos()) {
					ui.callIosShare(shareData);
				}
			});
			getExpertInfo(userNo);
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var urls = [];
		$('#planDetail .planpic').each(function(i, item) {
			var src = trim($(this).attr('src'));
			if (src) {
				urls.push(src);
			}
		});
		var current = trim($(this).attr('src')) || urls[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function payPlan(amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看专家推荐<br>(1粒米=1元)", function sure() {
			var spreaderUserNo = trim(common.getUrlParam("spreaderUserNo")) || '';
			var options = {
				planNo: planNo,
				spreaderUserNo: spreaderUserNo
			}
			orderCgi.createOrder(options, function(ret) {
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
						ui.showNotice('支付成功');
						ui.closeConfirm();
						setTimeout(function() {
							getPlanInfo();
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			common.locationUrl('#');
		});
	}
	
	function closeMask() {
		$("#ticketOrderMask").remove();
	}

	function getExpertInfo(userNo) {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var focusStatus = parseInt(user.focusStatus) || 0;
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					createFocus(userNo);
				}).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					cancelFocus(userNo)
				}).show();
			}
		});
	}

	function createFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});
		}, function cancel() {

		});
	}

	function cancelFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});	
		}, function cancel() {

		});
	}
});
define('controller/presentOrderList',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var presentOrderListView = require('view/presentOrderList');
	var pageNum = null;
	var pageSize = null;
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 10;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "双色球红包",
			className: 'ssqhb',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		main.setContent(presentOrderListView.content());
		$("#presentTicket").on('click', function() {
			common.locationUrl("#createPresentOrder");
		});
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser()) {
				common.locationUrl("#my");
			}
		});
	}

	function setContent() {
		setType()
	}
	
	function setType() {
		var typeList = $('#typeBtn [type]');
		typeList.on('click', function(e) {
			typeList.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr('type')) || 1;
			pageNum = 1;
			pageSize = 10;
			if (type == 1) {
				presentOrderList()
			} else if (type == 2) {
				receivedOrderList()
			}
 		});
		//默认选中
		var typeIndex = -1;
		typeList.each(function (i, item) {
			var t = parseInt($(this).attr('type'));
			if (t == type) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		typeList.eq(typeIndex).click();
	}
	
	function presentOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.presentOrderList(options, function(ret) {
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
				type: type,
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#prentOrderList").append(presentOrderListView.prentOrderList(data));
			} else {
				$("#prentOrderList").html(presentOrderListView.prentOrderList(data));
			}
			$("#prentOrderList li").on('click', function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#receivedOrder&self=true&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		if (type ==1 ) {
			presentOrderList(true);		
		} else if (type == 2) {
			receivedOrderList(true);	
		}
	}
	
	function receivedOrderList(append) {
		main.unsetScrollLoad();
		var options = {
			type: type,
			pageNum: pageNum,
			pageSize: pageSize
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
				$("#prentOrderList").append(presentOrderListView.receiveOrderList(data));
			} else {
				$("#prentOrderList").html(presentOrderListView.receiveOrderList(data));
			}
			$("#prentOrderList li").on('click', function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#ticketOrderDetail&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
});
define('controller/presentOrderSuccess',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var presentOrderSuccessView = require('view/presentOrderSuccess');
	var orderNo = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || '';
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
	}

	function setMain(view) {
		var options = {
			title: "付款成功",
			className: 'ssqhb',
			showHeader: true,
			isSupplierHeader: true,
			rightButtonText: '我的',
			rightButtonFun: function(){
				common.locationUrl("#presentOrderList")
			}
		}
		var data = {
			IMG_PATH: IMG_PATH,
			isApp: common.isApp()
		}
		main.setMain(view, options);
		main.setContent(presentOrderSuccessView.content(data));
		var presentRemark = common.getCache('ssqhbRemark') || '快来抢红包';
		$("#shareWechat").on('click', function() {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("shareWechat",{
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				});
			} else if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.ssqHbShareToFriend.postMessage({
	    			title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
	    		});
			}
		})
		$("#shareWechatMoments").on('click', function() {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("shareWechatMoments",{
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				});
			} else if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.ssqHbShareToCircle.postMessage({
	    			title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
	    		});
			}
		})
		$("#shareBtn").on('click', function() {
			if (common.isWeixinBrowser()) {
				var data = {
					title: '免费领取双色球红包',
					link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
					desc: presentRemark
				}
				ui.showShare(data);
			}
		})
		//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
		if (common.isWeixinBrowser()) {
			var data = {
				title: '免费领取双色球红包',
				link: location.href.replace(/[#\?].*/g, '') + '#receivedOrder&orderNo=' + orderNo,
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: presentRemark
			}
			ui.setShare(data);
		}
	}

	function setContent() {
		
	}

});
define('controller/receivedOrder',function(require, exports) {

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
define('controller/receivedOrderSuccess',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var receivedOrderSuccessView = require('view/receivedOrderSuccess');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		common.clearCache('ssqhbUserName');
	}

	function setMain(view) {
		var options = {
			title: "领取成功",
			className: 'ssqhb',
			showHeader: true,
			isSimpleHeader: true
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(receivedOrderSuccessView.content(data));
		$("#sendSsqHb").on('click', function() {
			common.locationUrl("#createPresentOrder");
		});
		$("#checkSsqHb").on('click', function() {
			common.locationUrl("#presentOrderList&type=2");
		});
		var ssqhbUserName = common.getCache('ssqhbUserName');
		$("#senderName").html(ssqhbUserName);
	}

	function setContent() {
		
	}
	
});
define('controller/recentAwards',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.slides');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var lotteryCgi = require('cgi/lottery');
	var recentAwardsView = require('view/recentAwards');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "最新开奖",
			className: 'recentAwards',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		};
		main.setContent(recentAwardsView.content(data));
	}


	function setContent() {
//		getPrizeOrderList();
		getLotteryIssueList();
	}
	
	function getLotteryIssueList() {
		var options = {}
		lotteryCgi.lotteryIssueList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}			
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				Date: Date
			}
			$("#drawList").html(recentAwardsView.drawList(data));
			$("#drawList .draw_item").on('click', function() {
				var lotteryId = trim($(this).attr('lotteryId'));
				common.locationUrl("#drawHistory&lotteryId=" + lotteryId);
			})
		})
	}
	
	function getPrizeOrderList() {
		clearTimeout(getPrizeOrderList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		orderCgi.getPrizeOrderList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#rankList").html(recentAwardsView.rankList(data));
			$("#rankBox").show();
			var textScroll = function() {
				var ul = $("#rankList");
				var li = ul.find("li");
				var length = li.length;
				if (length <= 1) {
					return;
				}
				var firstLi = li.eq(0);
				var height = firstLi.outerHeight(true);
				firstLi.animate({marginTop: -height}, 500, function() {
					firstLi.appendTo(ul).css({marginTop:0});
            		getPrizeOrderList.timer = setTimeout(textScroll, 5000);
				});
			};
			getPrizeOrderList.timer = setTimeout(textScroll, 5000);
		})
	}
});
define('controller/replayDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var replayCgi = require('cgi/replay');
	var orderCgi = require('cgi/order');
	var focusCgi = require('cgi/focus');
	var replayDetailView = require('view/replayDetail');
	var replayNo = null;
	var transdata = null;

	function init(view) {
		replayNo = trim(common.getUrlParam("replayNo")) || "";
		transdata = trim(common.getUrlParam("transdata")) || "";
		if (transdata) {
			//防止购买成功，有缓存
			common.clearCache('c=replay&m=planInfo');
			common.clearCache('c=replay&m=planList');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		replayNo = null;
		transdata = null;
	}

	function setMain(view) {
		var options = {
			title: "复盘详情",
			className: 'expertRcmd',
			showHeader: true,
		}
		main.setMain(view, options);
	}


	function setContent() {
		getReplayInfo();
	}
	
	function getReplayInfo() {
		if (!replayNo) {
			return;
		}
		var options = {
			replayNo: replayNo
		}
		replayCgi.getReplayInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.closeAttention();
			var replay = ret.data || {};
			var data = {
				IMG_PATH: IMG_PATH,
				replay: replay
			}
			main.setContent(replayDetailView.content(data));
			//添加预览
			$('#replayDetail .planpic').on('click', previewImage);
			$("#userMore").on('click', function() {
				var userNo = trim($(this).attr('userNo')) || '';
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			})
			$("#bottomBox [href]").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#upCount, #downCount").on('click', function(e) {
				var id = trim($(this).attr('id'));
				var replayNo = trim($(this).attr('replayNo'));
				if (!id || !replayNo) {
					return;
				}
				var replayCount = common.getCache('replayCount');
				if (replayCount) {
					if (!!replayCount[id][replayNo]) {
						ui.showNotice('您已参与过');
						return;
					}
				} else {
					replayCount = {
						upCount: {},
						downCount: {},
						shareCount: {}
					}	
				}
				var countFun = (function(dom) {
					return function() {
						var id = trim($(dom).attr('id'));
						var count = parseInt($("#"+id+'Num').html()) || 0;
						$("#"+id+'Num').html(count+1);
						replayCount[id][replayNo] = true;
						common.setCache('replayCount', replayCount, 1000*3600*24*1000);//1000天失效
					}
				})(this);
				var cgiFun = '';
				if (id == 'upCount') {
					cgiFun = 'replayUpCount';	
				} else if (id == 'downCount') {
					cgiFun = 'replayDownCount';	
				}
				if (cgiFun) {
					replayCgi[cgiFun]({
						replayNo: replayNo
					}, countFun, countFun)
				}
			});
			var planUser = replay.user;
			var replayNo = replay.replayNo;
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var userNo = planUser.userNo;
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName + '的复盘',
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#replayDetail&replayNo=' + replayNo,
				imgUrl: userImg,
				desc: '',
				success: function() {
					var count = parseInt($("#shareCountNum").html()) || 0;
					$("#shareCountNum").html(count+1);
					replayCgi.planShareCount({
						replayNo: replayNo
					});	
				}
			}
			ui.setShare(shareData);
			$("#shareCount").on('click', function(e) {
				ui.showShare(shareData);
			});
			getExpertInfo(userNo);
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var urls = [];
		$('#replayDetail .planpic').each(function(i, item) {
			var src = trim($(this).attr('src'));
			if (src) {
				urls.push(src);
			}
		});
		var current = trim($(this).attr('src')) || urls[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function getExpertInfo(userNo) {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var focusStatus = parseInt(user.focusStatus) || 0;
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					createFocus(userNo);
				}).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					cancelFocus(userNo)
				}).show();
			}
		});
	}

	function createFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});
		}, function cancel() {

		});
	}

	function cancelFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});	
		}, function cancel() {

		});
	}
});
define('controller/replayList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var replayCgi = require('cgi/replay');
	var replayListView = require('view/replayList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 12;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "专家复盘",
			className: '',
			showHeader: true,
			isLeftIconHeader: true	
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(replayListView.content(data));
	}

	function setContent() {
		getReplayList()
	}

	function getReplayList(append) {
		main.unsetScrollLoad();
		var options = {
			needUser: true,
			needAll: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		replayCgi.getReplayList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#replayList").append(replayListView.replayList(data));
			} else {
				$("#replayList").html(replayListView.replayList(data));
			}
			$("#replayList .item").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var replayNo = trim($(this).attr("replayNo"));
				if (!replayNo) {
					return;
				}
				if (replayNo) {
					common.locationUrl("#replayDetail&replayNo=" + replayNo);
				} 
			});
			$("#replayList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
//			$("#replayList .userShare").off().on("click", function(e) {
//				e.preventDefault();
//				e.stopPropagation();
//				var userNo = trim($(this).attr("userNo"));
//				var planNo = trim($(this).attr("planNo"));
//				var userName = trim($(this).attr("userName"));
//				var userImg = trim($(this).attr("userImg"));
//				if (!planNo || !userNo || !userName) {
//					return;
//				}
//				var user = common.getLoginUser();
//				var spreaderUserNo = trim(user && user.userNo || '');
//				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
//				var data = {
//					title: userName,
//					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
//					imgUrl: userImg,
//					desc: '晒米场足球推荐专家',
//					success: function() {
//						ui.setShare();
//					},
//					cancel: function() {
//						ui.setShare();	
//					}
//				}
//				ui.showShare(data);
//			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		getReplayList(true);
	}	
});
define('controller/sign',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var signCgi = require('cgi/sign');
	var activityCgi =require('cgi/activity');
	var signView = require('view/sign');

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "免费领米",
			className: 'signIn'
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		};
		main.setContent(signView.content(data));
		$('#backBtn').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
		});
		$("#recharge").off().on('click', function() {
			common.locationUrl('#charge')
		});
//		$("#signBtn").on('click', download);
		$("#luckyDraw").off().on('click', function() {
			common.locationUrl('#activity/turnplate')
		});
		getChargeActivityInfo();
	}


	function setContent() {
		signInfo();
	}

	function getChargeActivityInfo() {
		var data = {}
		activityCgi.getChargeActivityInfo(data, function(ret) {
		 	if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var presentAmountMap = ret.data || {};
			var presentAmount = 8;
			if (presentAmountMap['100']) {
				presentAmount = presentAmountMap['100'];	
			}
			$('#presentAmount').html(presentAmount);
		});	
	}
	
	function showSign() {
		closeSign();
		$("#signMask").show();
		$("#signMask").off().on("click", closeSign);
		$('#signPop').off().on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
		$("#confirmSign").off().on('click', createSign);
		$("#cancelSign").off().on('click', closeSign);
	}
	
	function closeSign() {
		$("#signMask").hide();
	}
	
	function signInfo() {
		var options = {}
		signCgi.signInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var sign = ret.data || {};
			var todayAccessAmount = parseInt(sign.todayAccessAmount/100) || 0;
			var totalAmount = parseInt(sign.totalAmount/100) || 0;
			var continueDay = parseInt(sign.continueDay) || 1;
			var isBindMobile = !!sign.isBindMobile;
			var signStatus = parseInt(sign.signStatus);
			$("#unclaimed").html(todayAccessAmount);
			$("#claim").html(totalAmount);
			if (signStatus == 1) {
				$("#signBtn").addClass('active').html('今日已签').off().show();
			} else {
				$("#signBtn").removeClass('active').html('签到').off().on('click', showSign).show();
			}
			if (!isBindMobile) {
				$("#bindMobileBox").show();
				$("#bindMobile").off().on('click', function() {
					common.locationUrl('#bindMobile')	
				});
			} else {
				$("#bindMobileBox").hide();
				$("#bindMobile").off();
			}
			var li = $("#signDay li");
			li.removeClass("active");
			li.find('.signStatus').hide();
			li.each(function(i, item) {
				var num = i+1;
				if (num < continueDay) {
					//之前的那些天变已领
					$(item).find('.signStatus').show();	
				} else if (num == continueDay) {
					$(item).addClass("active");
					if (signStatus) {
						//当天变已领
						$(item).find('.signStatus').show();	
					}
				}
			});
		});
	}

	function createSign() {
		var options = {}
		signCgi.createSign(options, function(ret) {
			if (ret.errCode == 3) {
				ui.showNotice('你当天已经签到过');
				return;
			}
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('签到成功');
			closeSign();
			signInfo();
		});
	}	
	
	function download() {
		common.locationUrl('http://a.app.qq.com/o/simple.jsp?pkgname=com.shaimichang.myapplication')	
	}
	
});
define('controller/smlrComboList',function(require, exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var comboCgi = require('cgi/combo');
	var orderCgi = require('cgi/order');
	var smlrComboListView = require('view/smlrComboList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view); 
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title:"晒米冷热",
			className: 'hotCold',
			showHeader: true
		}
		main.setMain(view, options);//头部
		var data = {};
		main.setContent(smlrComboListView.content(data));//静态
	}

	function setContent() {
		getComboList()
	}

	function getComboList() {
		var options = {
			comboType: 2,
			pageNum: pageNum,
			pageSize: pageSize
		}
		comboCgi.getComboList(options,function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#smlrComboList").html(smlrComboListView.smlrComboList(data));
			$("#smlrComboList .jx").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var comboNo = trim($(this).attr("comboNo"));
				var comboType = parseInt($(this).attr("comboType")) || 0;
				var amount = parseInt($(this).attr("amount")) || 0;
				if (comboNo && comboType == 2 && amount > 0) {
					payCombo(comboNo, comboType, amount);
				}
			});
		});
	}
	
	function payCombo(comboNo, comboType, amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看晒米冷热<br>(1粒米=1元)", function sure() {
			var options = {
				comboNo: comboNo,
				comboType: comboType
			}
			orderCgi.createComboOrder(options, function(ret) {
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
						ui.showNotice('支付成功');
						setTimeout(function() {
							common.locationUrl("#jxzpList");
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			
		});
	}

})

define('controller/ssq',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var orderCgi = require('cgi/order');
	var ssqView = require('view/ssq');
	var vm = null;
	var bet = null;
	var issue = null;

	function init(view) {
		bet = trim(common.getUrlParam("bet")) || false;
		if (bet) {
			common.setHistoryBack('#ssq');
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
		localData.remove('ssq');
		vm && vm.$destroy();
	}

	function setMain(view) {
		var options = {
			title: bet ? "双色球投注" : "双色球",
			className: 'ssq',
			showHeader: true,
			rightButtonText: '历史开奖',
			rightButtonFun: drawHistory
		}
		main.setMain(view, options);
		if (bet) {
			main.setContent(ssqView.ssqBet())
		} else {
			main.setContent(ssqView.ssqNum())
		}
	}


	function setContent() {
		getLotteryIssueInfo();
		useVue();
	}
	
	function drawHistory() {
		common.locationUrl("#drawHistory&lotteryId=SSQ")
	}
	
	function getLotteryIssueInfo() {
		var options = {
			lotteryId: "SSQ"
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
	    		ssqCartKey: 'ssq'
			}
		});
		vm.setSsq = function() { //设置红篮球
			vm.redBall = [],
	        vm.blueBall = [];
	        for (var i = 1; i < 34; i++) {
	            var ball = {
	                color: "red",
	                redNum: i < 10 ? "0" + i : i,
	                select: !1
	            };
	            vm.redBall.push(ball)
	        }
	        for (var i = 1; i < 17; i++) {
	            var ball = {
	                color: "blue",
	                blueNum: i < 10 ? "0" + i : i,
	                select: !1
	            };
	            vm.blueBall.push(ball)
        	}
		}
		vm.setSsq();
		vm.chooseBallNum = function(red, blue) { 
            var redNum = red,
            blueNum = blue,
            num = vm.calcUnit(redNum, redNum - 5) / vm.calcUnit(6, 1) * blueNum;//计算注数
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
			if (selRedMax > 16) {
				1 == !!obj.select ? (obj.select = !1) : (obj.select = !0);
				ui.showNotice("最多选择16个红球");
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
					maxNumber = 33;
					break;
					case 2: //篮球
					maxNumber = 16
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
			vm.setSsq();
			getZoneRandomNum(6, 1),
	        getZoneRandomNum(1, 2);
	        vm.chooseBallNum(6, 1);
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
            if (selRedBalls.length < 6 || selBlueBalls.length < 1) {
            	ui.showNotice('至少选择6个红球，1个蓝球');
            	return
            }
            if (vm.singleUnit*2 > 2e4) {
        		ui.showNotice("单次投注最多2万元");
				return;
        	}
            var selInfos = vm.getSelNumsInfo();
            vm.addToStorage(selInfos);
			common.locationUrl("#ssq&bet=true");
       },
       vm.getSelNumsInfo = function() { //得到选择号码信息
       		var unit = this.singleUnit,
            money = 2 * this.singleUnit,
            selNums = "";
            for (var i = 0; i < vm.redBall.length; i++) {
            	1 == vm.redBall[i].select && (selNums += trim(vm.redBall[i].redNum) + " ");
            }
            selNums += "| ";
            for (var i = 0; i < vm.blueBall.length; i++) {
            	1 == vm.blueBall[i].select && (selNums += trim(vm.blueBall[i].blueNum) + " ");
            }
            return {
            	lotteryId: 'SSQ',
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
                n.redballs = n.selnums.split("|")[0].trim().split(" "),
                n.blueballs = n.selnums.split("|")[1].trim().split(" "),
                vm.totalUnit += n.selUnit,
                vm.prize += n.selMoney * vm.multiple
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
                function getRandomNumber(length, randomNumber_r, randomNumber_b) {
                    for (var i = 0; i < length; i++) {
                        var num_red = Math.ceil(33 * Math.random());
                        num_red = num_red < 10 ? "0" + num_red.toString() : num_red.toString(),
                        randomNumber_r.join(" ").indexOf(num_red) >= 0 ? i-- : randomNumber_r = randomNumber_r.join(" ").replace( - 1, num_red).split(" ")
                    }
                    var num_blue = "";
                    return randomNumber_b == "" && (num_blue = Math.ceil(16 * Math.random()), num_blue = num_blue < 10 ? "0" + num_blue.toString() : num_blue.toString(), randomNumber_b = num_blue),
                    randomNumber_r.sort().join(" ") + " | " + randomNumber_b
                }
                var unit = 1,
	                numLength = 6,
	                randomNumber_r = [],
	                randomNumber_b = "";
               	for (var idx = 0; idx < numLength; idx++) {
                	randomNumber_r.push( - 1);
                }
                var selNums = getRandomNumber(numLength, randomNumber_r, randomNumber_b);
                return {
                	lotteryId: 'SSQ',
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
				vm.prize = vm.multiple * vm.totalUnit * 2;
            }
        }),
        vm.changeValue = function(num) {
        	vm.multiple = parseInt(vm.multiple) + num;
        },
        vm.backToSsq = function() {
        	common.locationUrl("#ssq");
        },
        vm.createSubmit = function() {
        	var protocol = $('#protocol')[0].checked;
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
                betContent.push(n.selnums.split("|")[0].trim().split(" ").join(",") + "|" + n.selnums.split("|")[1].trim().split(" ")) 
            });
        	betContent = betContent.join(";");
        	var options = {
        		ticketMultiple: vm.multiple,
        		issue: issue,
        		lotteryId: "SSQ",
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
				localData.remove('ssq');
			})
       	},
        vm.destroyed = function() {}
	}
});	
define('controller/supplierTicketOrderDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var orderCgi = require('cgi/order');
	var supplierTicketOrderDetailView = require('view/supplierTicketOrderDetail');
	var type = null;
	var orderNo = null;
	var uploadTicketFile = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		common.setHistoryBack('#supplierTicketOrderList&type=' + type);
		uploadTicketFile = [];
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		orderNo = null;
		uploadTicketFile = null;
		closeImage();
	}

	function setMain(view) {
		var options = {
			title: "方案详情",
			className: 'myDocumentary',
			showHeader: true,
			rightButtonText: '　'
		}
		main.setMain(view, options);
	}


	function setContent() {
		supplierTicketOrderDetail();
	}
	
	function supplierTicketOrderDetail(isShowImage) {
		if (!orderNo) {
			return;
		}
		var options = {
			type: 2,
			orderNo: orderNo
		}
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			var data = {
				ticketOrder: ticketOrder
			}
			main.setContent(supplierTicketOrderDetailView.content(data));
			$("#refuseTicket").off().on("click", refuseTicket);
			$("#showTicketImg").off().on("click", showImage);
			if (isShowImage) {
				$("#showTicketImg").click();
			}
			if (common.isWeixinBrowser()) {
				$("#ticketSelect").off().on('click', chooseImage);
			} else {
				$("#ticketSelect").off().on('change', fileChange);
			}
			$("#prizeSure").off().on('click', sendTicketPrize)
		});
	}

	function refuseTicket() {
		ui.showConfirm("您将放弃此单出票赚钱的机会？", function sure() {
			var options = {
				orderNo: orderNo
			}
			orderCgi.refuseTicket(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('拒绝成功');
				$('#uploadBtn').remove();
				$('#refuseTicket').remove();
			});
		});			
	}

	function showImage() {
		var ticketStatus = parseInt($(this).attr('ticketStatus')) || 0;
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		closeImage();
		var urls = [];
		var imgHtml = [];
		$.each(resourceList, function(i, url) {
			url = trim(url);
			if (url) {
				urls.push(url);
				imgHtml.push('<img class="img-responsive" src="'+url+'" style="margin-top:20px"/>');	
			}
		});
		var data = {
			ticketStatus: ticketStatus,
			html: imgHtml.join('')
		}
		$("body").append(supplierTicketOrderDetailView.previewImage(data));
		$("#showImg img").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (common.isWeixinBrowser() && urls.length > 0) {
				var current = trim(this.src) || '';
				weixin.call("previewImage", {
					current: current,// 当前显示图片的http链接
					urls: urls// 需要预览的图片http链接列表
				});
			}
		});
		$("#backBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeImage();
		});
		if (common.isWeixinBrowser()) {
			$("#changeBtn").on('click', chooseImage);
		} else {
			$("#changeBtn").on('change', fileChange);
		}
	}
	
	function closeImage() {
		$("#showImg").remove();
	}

	function chooseImage(e) {
		e.preventDefault();
		e.stopPropagation();
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['compressed'], // 可以指定是原图(original)还是压缩图(compressed)，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	var uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	uploadFile.push(localId);
		        });
		        var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				uploadTicketFile = uploadFile;
				uploadImage();
		    }
		});
	}

	function fileChange(e) {
		var uploadFile = [];
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			if (file.type) {
				if (/\bimage\b/i.test(file.type)) {
					uploadFile.push(file);
				}
			} else {
				var fileName = trim(file.name);
				var index = fileName.lastIndexOf(".");
				if(index != -1) {
					var extName = fileName.substr(index + 1).toLowerCase();
					if(exts[extName]) {
						uploadFile.push(file);
					}
				}
				
			}
		});
		var uploadFileLength = uploadFile.length;
		if (uploadFileLength <= 0) {
			return;
		}
		uploadTicketFile = uploadFile;
		uploadImage();
	}
	
	function uploadImage() {
		var uploadLength = uploadTicketFile.length || 0;
		var compressNum = 0;
		var uploadTicket = function(options) {
			if (compressNum != uploadLength) {
				return;
			}
			uploadTicketFile = [];
			ui.closeLoading();
			orderCgi.uploadTicket(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('票样上传成功');
				setTimeout(function() {
					supplierTicketOrderDetail($('#showImg').length != 0)
				}, 1000);
			});
		}
		var data = {
			orderNo: orderNo
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadLength*10*1000;
		}
		ui.showLoading(loadingTime);
		//等图片压缩结束再提交表单
		if (common.isWeixinBrowser()) {
			var submitFile = [];
			$.each(uploadTicketFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitFile.push(serverId);
						if (submitFile.length == uploadLength) {
							data.ticketImg = submitFile;
							uploadTicket(data)
						}
				    }
				});
			});
		} else {
			var submitFile = [];
			$.each(uploadTicketFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitFile.push(rst.file);
					if (submitFile.length == uploadLength) {
						data.ticketImg = submitFile;
						uploadTicket(data);
					}
				});
			});
		}
	}
	
	function sendTicketPrize(e) {
		var ticketPrizeAmount = parseFloat($("#ticketPrizeAmount").val()) || 0;
		if (isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
			ui.showNotice('输入的中奖金额有误');
			return;
		}
		ui.showConfirm("方案中奖金额：" + "<span class='color_red'>" + ticketPrizeAmount + "</span>", function sure() {
			ticketPrizeAmount = ticketPrizeAmount.toFixed(2) * 100;
			var options = {
				orderNo: orderNo,
				ticketPrizeAmount: ticketPrizeAmount
			}
			orderCgi.sendTicketPrize(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('中奖金额录入成功');
				setTimeout(function() {
					supplierTicketOrderDetail()
				}, 1000);
			});
		})
	}
	
});
define('controller/supplierTicketOrderList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var supplierTicketOrderListView = require('view/supplierTicketOrderList');
	var type = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 16;
		setMain(view);
		setContent();
	}

	function _init(view) {
		var type = null;
		var pageNum = null;
		var pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "方案列表",
			className: 'planList',
			showHeader: true,
			isSupplierHeader: true,
			rightButtonText: '统计',
			rightButtonFun: function() {
				common.locationUrl('#supplierTicketStatistics');
			}
		}
		main.setMain(view, options);
		var data = {
			type: type
		}
		main.setContent(supplierTicketOrderListView.content(data));
		$("#typeList .ui-flex_item").on("click", function(e) {
			var type = parseInt($(this).attr("type"));
			common.locationUrl('#supplierTicketOrderList&type='+type);
		});
	}


	function setContent() {
		getSupplierTicketOrderList();
		getSupplierTicketOrderCount();
	}
	
	function getSupplierTicketOrderList(append) {
		main.unsetScrollLoad();
		//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
		var ticketStatus = undefined;
		if (type == 1) {
			ticketStatus = [0];
		} else if (type == 2) {
			ticketStatus = [2,3,4,5,6];
		} else if (type == 3) {
			ticketStatus = [4,6];
		} else if (type == 4) {
			ticketStatus = [5];
		}
		var options = {
			type: 2,
			ticketStatus: ticketStatus,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getTicketOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var totalCount = parseInt(ret.data.totalCount) || 0;
			var totalAmount = parseInt(ret.data.totalAmount/100) || 0;
			var totalTicketPrizeAmount = (ret.data.totalTicketPrizeAmount/100).toFixed(2) || 0;
			$("#statistics").show();
			$("#totalCount").html(totalCount);
			if (type == 1 || type == 2) {
				$("#totalMoney").html(totalAmount);
			} else if (type == 3 || type == 4) {
				$("#totalMoney").html(totalTicketPrizeAmount);
			}
			var data = {
				list: list,
				type: type ||1
			}
			if (append) {
				$("#supplierTicketOrderList").append(supplierTicketOrderListView.supplierTicketOrderList(data));
			} else {
				$("#supplierTicketOrderList").html(supplierTicketOrderListView.supplierTicketOrderList(data));
			}
			$("#supplierTicketOrderList [orderNo]").on("click", function() {
				var orderNo = trim($(this).attr("orderNo"));
				common.locationUrl("#supplierTicketOrderDetail&type="+ type +"&orderNo=" + orderNo);
			})
		}, function() {
			main.setScrollLoad(moreList);
		});		
	}

	function getSupplierTicketOrderCount() {
		var options = {
			type: 2,
			ticketStatus: [4,6],//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
			nullTicketPrizeAmount: true//没填写中奖金额
		}
		orderCgi.getTicketOrderCount(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			if (!isNaN(totalCount) && totalCount > 0) {
				$("#tipsNum").html(totalCount).show();
			}
		});		
	}

	function moreList() {
		pageNum++;
		getSupplierTicketOrderList(true);
	}
});
define('controller/supplierTicketStatistics',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var stationCgi = require('cgi/station');
	var supplierTicketStatisticsView = require('view/supplierTicketStatistics');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "出票统计",
			className: 'ticketStatistics',
			showHeader: true,
			rightButtonText: ' '
		}
		main.setMain(view, options);
	}

	function setContent() {
		stationTicketStatistics()
	}
	
	function stationTicketStatistics() {
		var options = {};
		stationCgi.stationTicketStatistics(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var ticketStatistics = ret.data || {};
			var data = {
				ticketStatistics: ticketStatistics
			}
			main.setContent(supplierTicketStatisticsView.content(data));
		})
	}
})
define('controller/ticketFollow',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var ticketFollowView = require('view/ticketFollow');
	var pageNum = null;
	var pageSize = null;
	var matchType = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		matchType = null;
	}

	function setMain(view) {
		var options = {
			title: "跟专家",
			className: 'index',
			showHeader: true,
			rightButtonText: '自己投',
			rightButtonFun: function() {
				common.locationUrl('#lotteryHall');
			}
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(ticketFollowView.content(data));
	}

	function setContent() {
		setTab();
	}

	function setTab() {
		var tabList = $('#recommendTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			matchType = parseInt($(this).attr("matchType"));
			pageNum = 1;
			pageSize = 8;
			if (matchType == 1 || matchType == 2) {
				getPlanList();
			} else if (matchType == 3) {
				getDigitalPlanList()
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var mTab = parseInt($(this).attr("tab"));
			if (mTab == matchType) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabList.eq(tabIndex);
		item.click();
	}
	
	function getPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			matchType: matchType,
			needSaleTicket: true,
			needUser: true,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getPlanList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(ticketFollowView.planList(data));
			} else {
				$("#planList").html(ticketFollowView.planList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场足球推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		if (matchType == 1 || matchType == 2) {
			getPlanList(true);
		} else if (matchType == 3) {
			getDigitalPlanList(true);
		}
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		var planType;
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (matchType == 1 || matchType == 2) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (matchType == 3) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		if (matchType == 1 || matchType == 2) {
			planType = 1;
		} else if (matchType == 3) {
			planType = 2
		}
		var data = {
			planNo: planNo,
			amount: amount,
			planType: planType
		}
		ui.showCreateOrder(data);
	}
	
	function getDigitalPlanList(append) {
		main.unsetScrollLoad();
		var options = {
			needSaleTicket: true,
			needUser: true,
			needAccess: true,
			lotteryId: 'FC3D',
			pageNum: pageNum,
			pageSize: pageSize	
		}
		planCgi.getDigitalPlanList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#planList").append(ticketFollowView.digitalPlanList(data));
			} else {
				$("#planList").html(ticketFollowView.digitalPlanList(data));
			}
			$("#planList .userShare").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				var planNo = trim($(this).attr("planNo"));
				var userName = trim($(this).attr("userName"));
				var userImg = trim($(this).attr("userImg"));
				if (!planNo || !userNo || !userName) {
					return;
				}
				var user = common.getLoginUser();
				var spreaderUserNo = trim(user && user.userNo || '');
				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
				var data = {
					title: userName,
					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
					imgUrl: userImg,
					desc: '晒米场3D推荐专家',
					success: function() {
						ui.setShare();
					},
					cancel: function() {
						ui.setShare();	
					}
				}
				ui.showShare(data);
			});
			$("#planList .userTicket").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				if (!planNo) {
					return;
				}
				var data = {
					planNo: planNo,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateDigitalTicketOrder(data);
			});
			$("#planList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
			$("#planList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});
define('controller/ticketOrderDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var orderCgi = require('cgi/order');
	var ticketOrderDetailView = require('view/ticketOrderDetail');
	var orderNo = null;
	var orderTicketList = null;
	var type = null;
	var orderFollowList = null;
	var selfGod = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		orderTicketList = common.getUrlParam("orderTicketList") || false;
		orderFollowList = common.getUrlParam("orderFollowList") || false;
		selfGod = common.getUrlParam("selfGod") || false;
		type = common.getUrlParam("type") || 1;
		common.setHistoryBack('#myBet');
		if (selfGod) {
			common.setHistoryBack('#documentaryMarket');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
		orderTicketList = null;
		type = null;
		orderFollowList = null;
		selfGod = null;
		closeImage();
	}

	function setMain(view) {
		var options = {
			title: orderTicketList ? "出票详情":"订单详情",
			className: 'myDocumentary',
			showHeader: true,
			isOrderTicketListHeader: !!orderTicketList,
			isLeftIconHeader: !!orderFollowList,
			rightButtonText: '分享给好友'
		}
		main.setMain(view, options);
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser() && common.isIos()) {
				common.locationUrl("#myBet");
			}
		});
	} 


	function setContent() {
		if (orderTicketList) {
			$("#goBack").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#ticketOrderDetail&orderNo="+orderNo);
			});
			getOrderTicketList();
		} else if (orderFollowList) {
			$(".leftIcon_header").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#ticketOrderDetail&orderNo="+orderNo);
			});
			getOrderFollowList();
		} else {
			getTicketOrderInfo();
		}
	}
	
	function getTicketOrderInfo() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo,
			type: type
		}
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			var publish = ticketOrder.publish;
			var data = {
				ticketOrder: ticketOrder,
				Object: Object,
				IMG_PATH: IMG_PATH
			}
			main.setContent(ticketOrderDetailView.ticketOrder(data));
			$("#showTicketImg").on("click", showImage);
			$("#showTicketDetail").on("click", function() {
				common.locationUrl("#ticketOrderDetail&orderTicketList=true&orderNo="+orderNo);
			});
			$("#followCountBtn").on("click", function() {
				common.locationUrl("#ticketOrderDetail&orderFollowList=true&orderNo="+orderNo);
			});
			$("#shareMarketBtn").on('click', createPublish);
			$("#continueBtn").on('click', function() {
				common.locationUrl("#createTicketOrder&orderNo="+orderNo);
			})
			$("#followBtn").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var recommendCount = parseInt($(this).attr("betAmount"))/2;
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				if (!orderNo) {
					return;
				}
				var data = {
					planNo: orderNo,
					recommendCount: recommendCount,
					maxBettypeOdds: maxBettypeOdds,
					planType: -1,
					isSelfFollow: 1
				}
				ui.showCreateTicketOrder(data);
			});
			var planMatchType = ticketOrder.planMatchType;
			var planUser = ticketOrder.user || {};
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var planMatchTypeMap = {1: '竞彩足球', 2: '竞彩篮球'};
			var shareData = {
				title: '晒米场',
				link: location.href.replace(/[#\?].*/g, '')+ '#ticketOrderDetail&orderNo=' + orderNo,
				imgUrl: userImg,
				desc: userName + '的' + planMatchTypeMap[planMatchType] + '神单，跟单中奖'
			}
			ui.setShare(shareData);
			if (publish == 1) {
				$("#pageHeader .rightIcon_top").on('click',function() {
					ui.showShare(shareData);
				}).show();
			} else {
				$("#pageHeader .rightIcon_top").hide()
			}			
		}); 
	}
	
	function showImage() {
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		//在微信里面，就使用微信预览api
		if (common.isWeixinBrowser()) {
			var urls = [];
			$.each(resourceList, function(i, url) {
				url && urls.push(url);
			});
			if (urls.length > 0) {
				var current = urls[0] || '';
				weixin.call("previewImage", {
					current: current,// 当前显示图片的http链接
					urls: urls// 需要预览的图片http链接列表
				});
			}
		} else {
			closeImage();
			var imgHtml = [];
			$.each(resourceList, function(i, url) {
				url && imgHtml.push('<img class="img-responsive" src="'+url+'"/>');
			});
			var data = {
				length: imgHtml.length,
				html: imgHtml.join('</br>')
			}
			$("body").append(ticketOrderDetailView.previewImage(data));
			$("#showImg").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				closeImage();
			});
		}
	}
	
	function closeImage() {
		$("#showImg").remove();
	}
	
	function getOrderTicketList() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		orderCgi.getOrderTicketList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var orderNumeric = ret.data.orderNumeric || "";
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				orderNumeric: orderNumeric
			}
			main.setContent(ticketOrderDetailView.orderTicketList(data));
			$(".showTicketCode").on("click", function() {
				var printNo = trim($(this).attr("printNo"));
				if (printNo) {
					ui.showAlert("出票码：<br />" +printNo);
				}
			})
		});
	}
	
	function createPublish() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		ui.showConfirm("分享至跟单市场，只要方案最终能盈利30%以上，用户每复制一单，您将获得投注方案奖金的7%作为收益。<br/>收益部分可以购彩，也可以提现", function sure() {
			orderCgi.createPublish(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('分享成功');
				getTicketOrderInfo();
			});
		}, function cancel() {

		});	
	}
	
	function getOrderFollowList() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		orderCgi.getOrderFollowList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalAmount = ret.data.totalAmount/100 || 0;
			var totalCount = ret.data.totalCount || 0;
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				totalAmount: totalAmount,
				totalCount: totalCount
			}
			main.setContent(ticketOrderDetailView.userFollowList(data));
		});
	}
});
define('controller/ticketSuccess',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var ticketSuccessView = require('view/ticketSuccess');
	var orderNo = null;
	var continueHash = null;
	var orderBatchNo = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		orderBatchNo = trim(common.getUrlParam("orderBatchNo")) || "";
		continueHash = decodeURIComponent(trim(common.getUrlParam("continueHash"))) || "";
		if (!(/^#[^#\?]*$/.test(continueHash))) {
			ui.showNotice('continueHash参数有误');
			return;
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
		continueHash = null;
		orderBatchNo = null;
	}

	function setMain(view) {
		var options = {
			title: "支付成功",
			className: 'betSucess',
			showHeader: true,
			isSimpleHeader: true
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(ticketSuccessView.content(data));
		$("#continueBet").on("click", function() {
			if (orderBatchNo || continueHash == "#createTicketOrder" || continueHash.indexOf('type') != -1) {
				history.go(-2);
			} else if (continueHash.split('&')[0] == '#fc3d') {
				common.locationUrl('#fc3d');
			} else {
				common.locationUrl(continueHash);
			}
		});
		$("#checkDetail").on("click", function() {
			if (orderBatchNo) {
				common.locationUrl("#myBet");
			} else {
				common.locationUrl("#ticketOrderDetail&orderNo=" + orderNo);
			}
		});
		$("#backHome").on("click", function() {
			common.locationUrl("#home");
		})
	}


	function setContent() {
		getUserCouponAmount()
	}
	
	function getUserCouponAmount() {
		var options = {
			orderNo: orderNo
		};
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			var userCouponAmount = ticketOrder.userCouponAmount/100 || '';
			if (userCouponAmount) {
				$("#couponTxt").show();
			} else {
				$("#couponTxt").hide();
			}
			$("#couponAmount").html(userCouponAmount);
		})
	}
})
define('controller/userDetail',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/echarts');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var focusCgi = require('cgi/focus');
	var replayCgi = require('cgi/replay');
	var userDetailView = require('view/userDetail');
	var userNo = null;
	var tab = null;
	var pageNum = null;
	var pageSize = null;
	var userRight = null;

	function init(view) {
		userNo = trim(common.getUrlParam("userNo")) || "";
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		userNo = null;
		tab = null;
		pageNum = null;
		pageSize = null;
		userRight = null;
	}

	function setMain(view) {
		var options = {
			className: 'readExpert'
		}
		main.setMain(view, options);
		main.setContent(userDetailView.content());
		$('#backBtn').click(function(e) {
			common.historyBack();
		});	
		$('#homeBtn').click(function(e) {
			common.locationUrl('#home');
		});
	}

	function setContent() {
		getExpertInfo();
		activeFocus();
	}

	function getExpertInfo() {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var realName = trim(user.realName) || "";
			var nickName = trim(user.nickName) || "";
			var profileImg = trim(user.profileImg) || "";
			var personalImg = trim(user.personalImg) || "";
			var remark = trim(user.remark) || "";
			var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
			var userName = realName || nickName;
			var userTag = user.tag;
			var continueWin = parseInt(user.continueWin) || 0;
			var winCount = parseInt(user.winCount) || 0;
			var profitRate = parseInt(user.profitRate) || 0;
			var winRate = parseInt(user.winRate) || 0;
			var focusStatus = parseInt(user.focusStatus) || 0;
			userRight = user.userRight || {};
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', createFocus).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', cancelFocus).show();
			}
			if (!isNaN(continueWin) && continueWin > 1) {
				$('#continueWin').html(continueWin);
				$('#continueWinBox').show();
			} else if(!isNaN(winCount) && winCount > 0) {
				$('#winCount').html(winCount);
				$('#winCountBox').show();
			} else if (!isNaN(profitRate) && profitRate > 0) {
				$('#profitRate').html(profitRate);
				$('#profitRateBox').show();
			} else if (!isNaN(winRate) && winRate > 0) {
				$('#winRate').html(winRate);
				$('#winRateBox').show();
			}
			$("#userImg").attr("src", userImg);
			$("#userImg").on("click", previewImage);
			$("#userName").html(userName);
			if (!remark) {
				$("#moreUserRemark").hide();	
			} else {
				$("#moreUserRemark").show();
				if (remark.length > 50) {
					$("#userRemarkBox").removeClass("active");
				}
			}
			$("#moreUserRemark").on("click", function(e) {
				$("#userRemarkBox").toggleClass("active");
			});
			$("#userRemark").html(remark);
			//设置分享
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName,
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
				imgUrl: userImg,
				desc: remark + '|晒米场'
			}
			ui.setShare(shareData);
			setTab();
		});
	}

	function moreList() {
		//这里空的原因，是留着动态改变函数内容的
	}

	function getPlanList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getPlanList(true);
		}
		var matchStatus = 0;
		var recommendType = 0;
		if (tab == 1) {
			matchStatus = 4
		} else if (tab == 2) {
			matchStatus = 3;
			recommendType = 1
		} else if (tab == 3) {
			matchStatus = 3;
			recommendType = 2
		};
		var options = {
			userNo: trim(userNo),
			matchStatus: matchStatus || 4,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize,
			recommendType: recommendType
		}
		planCgi.getPlanList(options, function(ret) {
			if(ret.errCode != 0){
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
				$("#planList").append(userDetailView.planList(data));
			} else {
				$("#planList").html(userDetailView.planList(data));
			}
			$("#planList .planItem").off().on("click", accessOrPayPlan);
			if (pageNum >= maxPageNum) {
				pageNum = 1;
				pageSize = 8;
				getReplayList();
			}
			$(".bet_btn").on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function getPlanTrendList() {
		var recommendType = 0;
		if (tab == 2) {
			recommendType = 1
		} else if (tab == 3) {
			recommendType = 2
		};
		if (recommendType <= 0) {
			$("#planTrendChartBox").hide().html('');
			return;
		}
		var options = {
			userNo: trim(userNo),
			recommendType: recommendType
		}
		planCgi.getPlanTrendList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
	        	$("#planTrendChartBox").hide().html('');
	        	return;
	        }
			var createY = function (seriesData) {//Y轴数据
	            var yDatas = [], obj = {};
	            for(var i = 0, length = seriesData.length; i < length; i++) {
	                if(seriesData[i] < 0) {
	                    yobj = {
	                        value: seriesData[i],
	                        itemStyle: { 
	                        	normal: { 
	                        		color: '#424e67' 
	                        	} 
	                        }
	                    };
	                } else {
	                    yobj = {
	                        value: seriesData[i],
	                        itemStyle: { 
	                        	normal: { 
	                        		color: '#f8645c' 
	                        	} 
	                        }
	                    }
	                }
	                yDatas.push(yobj);
	            }
	            return yDatas;
	        }
	        $("#planTrendChartBox").show().html(userDetailView.planTrendChartBox());
			var chartHead = $(".chart_box .chart_head");
			var chartWrap = $('.chart_wrap');
			chartHead.off().on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				chartHead.find('.arrow_up').attr('class', 'arrow arrow_down');
				chartWrap.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					chartWrap.show();
				}
			});
			//初始化echarts实例
	        var myChart = echarts.init(document.getElementById('planTrendChart'));
	        // 指定图表的配置项和数据
	        var option = {
	        	grid: {
	        		top: 40,
	        		right: 30,
	        		bottom: 40,
	        		left: 30
	        	},
	            xAxis: {
	                name: "近20场",
	                nameLocation: "middle",
	                nameGap: 20,
	                type: "category",
	                boundaryGap : false,
	                axisLabel: {
	                    show: false,
	                    interval: 0
	                },
	                axisTick: {
	                	show: false
	                },
	                axisLine: {
	                    lineStyle:{
	                        color:'#666666'
	                    }
	                }
	            },
	            yAxis: {
	                type: "value",
	                name: "红",
	                nameTextStyle: {
	                	color: '#f63946'
	                },
	                interval: 5,
	                axisLabel: {
	                    formatter: '{value}'
	                },
	                axisTick: {
	                	show: false
	                },
	                nameLocation: "end",
	                axisLine: {
	                    lineStyle:{
	                        color:'#666666'
	                    }
	                }
	            },
	            series: [{
	                name: '连红',
	                type: 'line',
	                smooth: true,
	                symbol: "circle",
	                symbolSize: 7,
	                label: {
	                    normal: {
	                        show: true,
	                        position: "bottom"
	                    },
	                },
	                lineStyle: {
                        normal: {
                        	color: "#54b6ea",
                        	width: 1
                        }
	                },
	                data: createY(list),
	                markPoint: {
	                    data: [{
	                        name: '连红',
	                        type: 'max',
	                        symbolSize: 30,
	                        itemStyle: {
	                            normal: {
	                                color: '#f8645c'
	                            }
	                        }
	                    },{
	                        name: '连黑',
	                        type: 'min',
	                        symbolSize: 30,
	                        itemStyle: {
	                            normal: {
	                                color: '#424e67'
	                            }
	                        }
	                    }]
	                }
	            }]
	        };
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
		});	
	}

	function setTab() {
		var data = {
			userRight: userRight
		};
		$("#tabBox").html(userDetailView.tabBox(data));
		var tabItem = $("#tabBox .ui-flex_item");
		tabItem.on("click", function(e) {
			$("#noMatch").hide();
			$("#replayList").hide();
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 8;
			if (userRight['1']) {
				getPlanTrendList();
				getPlanList();
			} else if (userRight['3']) {
				getDigitalPlanList();
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var mTab = parseInt($(this).attr("tab"));
			if (mTab == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			if (userNo && tab) {
				common.setHistoryBack("#userDetail&userNo=" + userNo + "&tab=" + tab);
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (userRight['1']) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (userRight['3']) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			setHistoryBack();
			return;
		}
		if (userRight['1']) {
			planType = 1
		} else if (userRight['3']) {
			planType = 2
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack,
			planType: planType
		}
		ui.showCreateOrder(data);
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var current = trim($(this).attr('src')) || '';
		var urls = [current];
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function createFocus() {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo();
			});
		}, function cancel() {

		});
	}

	function cancelFocus() {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo();
			});	
		}, function cancel() {

		});
	}

	function activeFocus() {
		var options = {
			userNo: userNo
		}
		focusCgi.activeFocus(options);
	}

/*	function getUserArticleList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getUserArticleList(true);
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			userNo: trim(userNo)
		}
		userCgi.getUserArticleList(options, function(ret) {
			if(ret.errCode != 0){
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
				list: list
			}
			if (append) {
				$("#userArticleList").append(userDetailView.userArticleList(data));
			} else {
				$("#userArticleList").html(userDetailView.userArticleList(data));
			}
			$("#userArticleList .shaimi_sport").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var articlelink = trim($(this).attr("articlelink"));
				if (articlelink) {
					common.locationUrl(articlelink);
				}
			});
			var planLength = $('#planList').children().length;
			var userArticleLength = $('#userArticleList').children().length;
			if (userArticleLength > 0) {
				$("#userArticleList").show();
			} else if (planLength <= 0) {
				if (userRight['3']) {
					$("#default_img").removeClass('default').addClass('digital_default');
				}
				$("#noMatch").show();
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}*/
	
	function getReplayList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getReplayList(true);
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			userNo: trim(userNo)
		}
		replayCgi.getReplayList(options, function(ret) {
			if(ret.errCode != 0){
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
				list: list
			}
			if (append) {
				$("#replayList").append(userDetailView.replayList(data));
			} else {
				$("#replayList").html(userDetailView.replayList(data));
			}
			$("#replayList .replayItem").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var replayNo = trim($(this).attr("replayNo"));
				if (!replayNo) {
					return 
				}
				if (replayNo) {
					common.locationUrl("#replayDetail&replayNo=" + replayNo);
				} 
			});
			var planLength = $('#planList').children().length;
			var replayListLength = $('#replayList').children().length;
			if (replayListLength > 0) {
				$("#replayList").show();
			} else if (planLength <= 0) {
				if (userRight['3']) {
					$("#default_img").removeClass('default').addClass('digital_default');
				}
				$("#noMatch").show();
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
		
	}
	
	function getDigitalPlanList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getDigitalPlanList(true);
		}
		var planStatus = 0;
		if (tab == 1) {
			planStatus = 1
		} else if (tab == 2) {
			planStatus = 2;
		} 
		var options = {
			userNo: trim(userNo),
			planStatus: planStatus || 1,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize
		}
		planCgi.getDigitalPlanList(options, function(ret) {
			if(ret.errCode != 0){
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
				$("#planList").append(userDetailView.digitalPlanList(data));
			} else {
				$("#planList").html(userDetailView.digitalPlanList(data));
			}
			$("#planList .planItem").off().on("click", accessOrPayPlan);
			if (pageNum >= maxPageNum) {
				pageNum = 1;
				pageSize = 8;
				getReplayList();
			}
			$(".bet_btn").on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateDigitalTicketOrder(data);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});
define('controller/userList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userListView = require('view/userList');
	var groupNo = null;

	function init(view) {
		groupNo = trim(common.getUrlParam("groupNo"));
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		groupNo = null;
	}

	function setMain(view) {
		var options = {
			title: "专家",
			className: 'expert',
			showHeader: true,
			rightButtonText: '我要申请',
			rightButtonFun: function() {
				common.locationUrl('#userVerify');
			}
		}
		main.setMain(view, options);
		main.setContent(userListView.content());
	}


	function setContent() {
		getGroupList();
	}

	
	function getGroupList() {
		var options = {
			pageNum: 1,
			pageSize: 10	
		}
		userCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#groupList").html(userListView.groupList(data));
			var groupItem = $("#groupList .item");
			groupItem.on('click', function(e) {
				$("#groupList .item").removeClass('active');
				$(this).addClass('active');
				var groupNo = trim($(this).attr("groupNo"));
				getUserList(groupNo);
			});
			//默认选中组
			var groupNoIndex = -1;
			groupItem.each(function (i, item) {
				var gNo = trim($(this).attr("groupNo"));
				if (gNo == groupNo) {
					groupNoIndex = i;
					return;
				}
			});
			if (groupNoIndex < 0) {
				groupNoIndex = 0;
			}
			var item = groupItem.eq(groupNoIndex);
			item.click();
			//滚动到相应的tab位置
			var position = item.position();
			$("#groupList").scrollLeft(position.left);
		});
	}

	function getUserList(groupNo) {
		groupNo = trim(groupNo);
		if (!groupNo) {
			return;
		}
		var options = {
			groupNo: groupNo,
			pageNum: 1,
			pageSize: 200
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var length = list.length || 0;
			var offset = 4 - (length % 4);
			if (offset == 4) {
				offset = 0;
			}
			for (var i = 0; i < offset; i++) {
				list.push({nickName: '', profileImg: IMG_PATH + 'user_default.png'});
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#userList").html(userListView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		});
	}
});
define('controller/userRankList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userRankListView = require('view/userRankList');
	var pageNum = null;
	var pageSize = null;
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 0;
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		type = null;
	}

	function setMain(view) {
		var options = {
			title: "红人榜",
			className: 'redman',
			showHeader: true,
			isUserRankHeader: true
		}
		main.setMain(view, options);
		main.setContent(userRankListView.content());
	}

	function setContent() {
		setType(); 
	}

	function setType() {
		var tabList = $('#userRankTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			pageNum = 1;
			pageSize = 15;
			type = parseInt($(this).attr('type')) || 1;
			if (type == 1) {
				main.setContent(userRankListView.userRankListBox());
				getUserRankList();
			} else if (type == 2) {
				main.setContent(userRankListView.winRateRankListBox());
				getWinRateRankList();
			} else if (type == 3) {
				main.setContent(userRankListView.profitRateRankListBox());
				getProfitRateRankList();
			}
		});
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}

	function moreList() {
		
	}
	
	function getUserRankList(append) {
		moreList = function () {
			pageNum++;
			getUserRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserRankList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#userRankList").append(userRankListView.userRankList(data));
			} else {
				$("#userRankList").html(userRankListView.userRankList(data));
			}
			$("#userRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function getWinRateRankList(append) {
		moreList = function () {
			pageNum++;
			getWinRateRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getWinRateRankList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#winRateRankList").append(userRankListView.winRateRankList(data));
			} else {
				$("#winRateRankList").html(userRankListView.winRateRankList(data));
			}
			$("#winRateRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function getProfitRateRankList(append) {
		moreList = function () {
			pageNum++;
			getProfitRateRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getProfitRateRankList(options, function(ret) {
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
				IMG_PATH: IMG_PATH,
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#profitRateRankList").append(userRankListView.profitRateRankList(data));
			} else {
				$("#profitRateRankList").html(userRankListView.profitRateRankList(data));
			}
			$("#profitRateRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});
define('controller/userVerify',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var smsCgi = require('cgi/sms');
	var userVerifyView = require('view/userVerify');
	var type = null;
	var uploadIdentityFile = null;
	var uploadBusinessFile = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		common.setHistoryBack('#userList');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		uploadIdentityFile = null;
		uploadBusinessFile = null;
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'apply',
			showHeader: true,
			isUserVerifyHeader: true
		}
		main.setMain(view, options);
		var tabList = $('#userVerifyTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var type = parseInt($(this).attr('type')) || 0;
			if (type == 1) {
				setZhuanjia();
			} else if (type == 2) {
				setZhanzhang();
			}
		});
		//默认选中
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}


	function setContent() {

	}

	function setZhuanjia() {
		clearTimeout(sendSmsCode.timer);
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		main.setContent(userVerifyView.zhuanjia());
		if (common.isWeixinBrowser()) {
			$("#identitySelectBox,#identitySelectedBox").on('click', chooseImage);
		} else {
			$("#identitySelect,#identitySelected").on('change', fileChange).show();
		}
		$('#smsCodeBtn').on('click', showConfirm);
		$('#userVerifySubmit').on('click', userVerifySubmit);
	}

	function setZhanzhang() {
		clearTimeout(sendSmsCode.timer);
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		main.setContent(userVerifyView.zhanzhang());
		if (common.isWeixinBrowser()) {
			$("#identitySelectBox,#identitySelectedBox,#businessSelectBox,#businessSelectedBox").on('click', chooseImage);
		} else {
			$("#identitySelect,#identitySelected,#businessSelect,#businessSelected").on('change', fileChange).show();
		}
		$('#smsCodeBtn').on('click', showConfirm);
		$('#userVerifySubmit').on('click', userVerifySubmit);
	}

	function userVerifySubmit(e) {
		var type = parseInt($(this).attr('type')) || 0;
		var realName = trim($("#realName").val());
		var phone = trim($("#phone").val());
		var smsCode = trim($('#smsCode').val());
		var remark = trim($("#remark").val());
		var address = trim($("#address").val());
		var uploadIdentityFileLength = uploadIdentityFile.length || 0;
		var uploadBusinessFileLength = uploadBusinessFile.length || 0;
		var protocol = $('#protocol')[0].checked;
		if (type != 1 && type != 2) {
			ui.showNotice("申请类型有误");
			return;	
		} 
		if (realName == "") {
			ui.showNotice("姓名不能为空");
			return;
		}
		if (phone == "") {
			if (type == 1) {
				ui.showNotice("手机号码不能为空");
			} else if (type == 2) {
				ui.showNotice("联系电话不能为空");
			}
			return;
		}
		if (smsCode.length != 6 || /\D/.test(smsCode)) {
			ui.showNotice('输入的验证码有误');
			return;	
		}
		if (uploadIdentityFileLength <= 0) {
			ui.showNotice("请选择身份证正面照片");
			return;	
		}
		if (type == 2 && address == "") {
			ui.showNotice("彩票站点地址不能为空");
			return;
		}
		if (type == 2 && uploadBusinessFileLength <= 0) {
			ui.showNotice("请选择营业执照");
			return;	
		}
		if (type == 1 && remark == "") {
			ui.showNotice("简介不能为空");
			return;
		}
		if (!protocol) {
			if (type == 1) {
				ui.showNotice("请阅读并同意专家协议");
			} else if (type == 2) {
				ui.showNotice("请阅读并同意站长协议");
			}
			return;	
		}
		var compressNum = 0;
		var uploadLength = uploadIdentityFileLength + uploadBusinessFileLength;
		var submitFun = function(options) {
			if (compressNum != uploadLength) {
				return;
			}
			ui.closeLoading();
			userCgi.createUserVerify(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('申请提交成功，请耐心等待审核');
				setTimeout(function() {
					$('#userVerifyTab span.active').eq(0).click();
				}, 1000);
			});
		}
		var data = {
			type: type,
			realName: realName,
			phone: phone,
			code: smsCode,
			remark: remark,
			address: address	
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadLength*10*1000;
		}
		ui.showLoading(loadingTime);
		//等图片压缩结束再提交表单
		if (common.isWeixinBrowser()) {
			var submitIdentityFile = [];
			$.each(uploadIdentityFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitIdentityFile.push(serverId);
						if (submitIdentityFile.length == uploadIdentityFileLength) {
							data.identityImg = submitIdentityFile;
							submitFun(data);
						}
				    }
				});
			});
			var submitBusinessFile = [];
			$.each(uploadBusinessFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitBusinessFile.push(serverId);
						if (submitBusinessFile.length == uploadBusinessFileLength) {
							data.businessImg = submitBusinessFile;
							submitFun(data);
						}
				    }
				});
			});
		} else {
			var submitIdentityFile = [];
			$.each(uploadIdentityFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitIdentityFile.push(rst.file);
					if (submitIdentityFile.length == uploadIdentityFileLength) {
						data.identityImg = submitIdentityFile;
						submitFun(data);
					}
				});
			});
			var submitBusinessFile = [];
			$.each(uploadBusinessFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitBusinessFile.push(rst.file);
					if (submitBusinessFile.length == uploadBusinessFileLength) {
						data.businessImg = submitBusinessFile;
						submitFun(data);
					}
				});
			});
		}
	}

	function chooseImage(e) {
		var domId = trim(this.id);
		var prefix = '';
        if (/identity/.test(domId)) {
        	prefix = 'identity';
		} else if (/business/.test(domId)) {
			prefix = 'business';
		} else {
			return;	
		}
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['compressed'], // 可以指定是原图(original)还是压缩图(compressed)，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	var uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	imgArr.push('<img class="planpicSmall licensePreview" src="'+ localId +'" prefix="'+prefix+'"/>');
		        	uploadFile.push(localId);
		        });
		        var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				$('#'+prefix+'List').html(imgArr.join(""));
				$('#'+prefix+'List .planpicSmall').on('click', previewImage);
				var fileSelectBoxJQ = $('#'+prefix+'SelectBox');
				var fileSelectedBoxJQ = $('#'+prefix+'SelectedBox');
				if (uploadFileLength > 0) {
					fileSelectBoxJQ.hide();
					fileSelectedBoxJQ.show();	
				} else {
					fileSelectedBoxJQ.hide();
					fileSelectBoxJQ.show();
				}
				if (prefix == 'identity') {
					uploadIdentityFile = uploadFile;
				} else if (prefix == 'business') {
					uploadBusinessFile = uploadFile;
				}
		    }
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var prefix = trim($(this).attr('prefix')) || '';
		var uploadFile = [];
		if (prefix == 'identity') {
			uploadFile = uploadIdentityFile;
		} else if (prefix == 'business') {
			uploadFile = uploadBusinessFile;
		} else {
			return;
		}
		var current = trim($(this).attr('src')) || uploadFile[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: uploadFile// 需要预览的图片http链接列表
		});
	}

	function fileChange(e) {
		var domId = trim(this.id);
		var prefix = '';
        if (/identity/.test(domId)) {
        	prefix = 'identity';
		} else if (/business/.test(domId)) {
			prefix = 'business';
		} else {
			return;	
		}
		var uploadFile = [];
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			if (file.type) {
				if (/\bimage\b/i.test(file.type)) {
					uploadFile.push(file);
				}
			} else {
				var fileName = trim(file.name);
				var index = fileName.lastIndexOf(".");
				if(index != -1) {
					var extName = fileName.substr(index + 1).toLowerCase();
					if(exts[extName]) {
						uploadFile.push(file);
					}
				}
				
			}
		});
		var uploadFileLength = uploadFile.length;
		if (uploadFileLength <= 0) {
			return;
		}
		var imgArr = [];
		var loadNum = 0;
		var readerOnload = function(e) {
			loadNum++;
			imgArr.push('<img class="planpicSmall licensePreview" src="'+ e.target.result +'"/>');
			if (loadNum == uploadFileLength) {
				$('#'+prefix+'List').html(imgArr.join(""));
			}
		}
		$.each(uploadFile, function(i, file) {
			var reader = new FileReader();
			reader.onload = readerOnload;
			reader.readAsDataURL(file);
		});
		var fileSelectBoxJQ = $('#'+prefix+'SelectBox');
		var fileSelectedBoxJQ = $('#'+prefix+'SelectedBox');
		if (uploadFileLength > 0) {
			fileSelectBoxJQ.hide();
			fileSelectedBoxJQ.show();	
		} else {
			fileSelectedBoxJQ.hide();
			fileSelectBoxJQ.show();
		}
		if (prefix == 'identity') {
			uploadIdentityFile = uploadFile;
		} else if (prefix == 'business') {
			uploadBusinessFile = uploadFile;
		}
	}
	
	function sendSmsCode () {
		var mobile = trim($('#phone').val()) || '';
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
	
	function showConfirm() {
		var mobile = trim($('#phone').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		closeConfirm();
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#pageContainer").append(userVerifyView.confirm(data));
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
define('controller/userVerifyProtocol',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userVerifyProtocolView = require('view/userVerifyProtocol');
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
	}

	function setMain(view) {
		var options = {
			title: "协议",
			className: 'ageement',
			showHeader: true
		}
		main.setMain(view, options);
		main.setContent(userVerifyProtocolView.content({
			type: type
		}));
		
	}

	function setContent() {

	}
});
//收款
define('controller/withdraw',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var withdrawView = require('view/withdraw');
	var financeType = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
	}

	function setMain(view) {
		var options = {
			title: financeType==0?"收米":'',
			className: 'takein',
			showHeader: true,
			isWithdrawHeader: true,
			rightButtonText: '提款记录',
			rightButtonFun: function() {
				common.locationUrl('#withdrawList&financeType=' + financeType);
			}
		}
		main.setMain(view, options);
	}


	function setContent() {
		getUserInfo();
		setTab();
	}

	function setTab() {
		var tabItem = $("#withdrawTab [financeType]");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			financeType = parseInt($(this).attr("financeType"));
			var data = {
				financeType: financeType
			}
			main.setContent(withdrawView.content(data));
			$("#withdrawSubmit").on('click', withdrawSubmit);
			$("#amount").on("input", function(e) {
				var amount = parseFloat(this.value) || 0;
				$("#amountPrice").html(amount);
			});
			getUserFinanceInfo();
		});
		//默认选中状态
		var typeIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("financeType"));
			if (t == financeType) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = tabItem.eq(typeIndex);
		item.click();
	}

	function withdrawSubmit() {
		financeType = parseInt(financeType);
		if (isNaN(financeType)) {
			return;
		}
		var userFinance = parseFloat($("#userFinance").html()) || 0;
		var amount = (parseFloat($("#amount").val()) || 0)*100;
		var accountNumber = trim($("#accountNumber").val());
		var accountName = trim($("#accountName").val());
		var accountUserName = trim($("#accountUserName").val());
		var accountInfo = trim($("#accountInfo").val());
		if (isNaN(userFinance) || userFinance <= 0) {
			if(financeType == 0) {
				ui.showNotice("您当前没有可收米数");
			} else if (financeType == 1) {
				ui.showNotice("您当前没有可提彩金");
			}
			return;		
		}
		if (isNaN(amount) || amount <= 0) {
			if(financeType == 0) {
				ui.showNotice("请填写正确的收米数量");
			} else if (financeType == 1) {
				ui.showNotice("请填写正确的彩金数量");
			}
			return;
		}
		if (financeType == 0 && amount < 10000) {
			ui.showNotice("收米数量不能小于100");	
			return;	
		}
		if (financeType == 0 && amount > 1000000) {
			ui.showNotice("收米数量不能大于10000");
			return;	
		}
		/*if (financeType == 1 && amount < 2000) {
			ui.showNotice("彩金提款，最低20元");
			return;	
		}*/
		if (accountName == "") {
			if(financeType == 0) {
				ui.showNotice("请选择银行");
			} else if (financeType == 1) {
				ui.showNotice("支付宝姓名不能为空");
			}
			return;
		}
		if (accountUserName == "") {
			ui.showNotice("银行户名不能为空");
			return;
		}
		if (accountNumber == "") {
			if(financeType == 0) {
				ui.showNotice("银行卡号不能为空");
			} else if (financeType == 1) {
				ui.showNotice("支付宝账号不能为空");
			}
			return;
		}
		if (accountInfo == "") {
			ui.showNotice("支行分行信息不能为空");
			return;
		}
		var data = {
			financeType: financeType,
			amount: amount,
			accountNumber: accountNumber,
			accountName: accountName,
			accountUserName:　accountUserName,
			accountInfo: accountInfo,
			accountType: financeType==0?"3":''
		}
		userCgi.withdraw(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showAlert('您的提款提交成功。', function() {
				$("#amount").val("");
				$("#accountNumber").val("");
				$("#accountName").val("");
				$("#amountPrice").html(0);
				$("#accountUserName").val("");
				$("#accountInfo").val("");
				getUserFinanceInfo();
			});
		});
	}
	
	function getUserInfo() {
		var options = {}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var isABT = user.isABT;
			if (isABT) {
				$("#withdrawTab").show();
			}
		});
	}

	function getUserFinanceInfo() {
		var options = {
			financeType: financeType
		}
		userCgi.getUserFinanceInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var incomeAmount = (parseInt(data.incomeAmount) || 0)/100;
			$("#userFinance").html(incomeAmount);
		});
	}
});
define('controller/withdrawList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var withdrawListView = require('view/withdrawList');
	var financeType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		financeType = parseInt(common.getUrlParam("financeType")) || 0;
		pageNum = 1;
		pageSize = 15;
		common.setHistoryBack('#withdraw&financeType=' + financeType);
		setMain(view);
		setContent();
	}

	function _init(view) {
		financeType = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "提款记录",
			className: 'moneyNode',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(withdrawListView.content(data));
	}


	function setContent() {
		getwithdrawList();
	}


	function moreList() {
		pageNum++;
		getwithdrawList(true);		
	}
	
	function getwithdrawList(append) {
		main.unsetScrollLoad();
		var options = {
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		financeCgi.getWithdrawList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#withdrawList").append(withdrawListView.withdrawList(data));
			} else {
				$("#withdrawList").html(withdrawListView.withdrawList(data));
			}
			$('#withdrawList [remark]').off().on('click', function(e) {
				var remark = trim($(this).attr('remark')) || '';
				if (!remark) {
					return;
				}
				ui.showAlert(remark);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});
define('controller/worldCup2018',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var orderCgi = require('cgi/order');
	var worldCup2018View = require('view/worldCup2018');
	var pageNum = null;
	var pageSize = null;
	var tab = null;
	var oddsArr = null;
	var selected = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 100;
		common.setHistoryBack('#lotteryHall');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		tab = null;
		oddsArr = null;
		selected = null;
	}

	function setMain(view) {
		var options = {
			title: "2018世界杯冠军",
			className: 'worldCup2018',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		main.setContent(worldCup2018View.content());
		$("#betBtn").off().on('click', createTicketSubmit)
	}

	function setContent() {
		setTab();
	}
	
	function setTab() {
		var tabItem = $("#navTab div");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab")) || 1;
			pageNum = 1;
			pageSize = 100;
			oddsArr = [];
			selected = [];
			$("#countUnit").html('0');
			$("#ticketAmount,#maxPrice").html('0元');
			getGuessList();
			if (tab == 2) {
				$('#filterList').show();
				getGuessTeamList()
			} else {
				$('#filterList').hide()
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab")) || 0;
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	
	function getGuessList(append) {
		main.unsetScrollLoad();
		var lotteryId;
		if (tab == 1) {
			lotteryId = 'SJBGJ'
		} else if (tab == 2) {
			lotteryId = 'SJBGYJ'
		}
 		var options = {
			lotteryId: lotteryId,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		matchCgi.getGuessList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#matchList").append(worldCup2018View.matchList(data));
			} else {
				$("#matchList").html(worldCup2018View.matchList(data));
			}
			$("#matchList .team_item").off().on("click", function (e) {
				var selectedOdds = $(this).children("span").eq(1).text();
				var selectedOddsId = $(this).attr("oddsId");
				if ($(this).hasClass("active") == true) {//取消选中
		            $(this).removeClass("active");
	                oddsArr.splice($.inArray(selectedOdds, oddsArr), 1);
	                selected.splice($.inArray(selectedOddsId, selected), 1);
		        } else {//选择比赛
	                $(this).addClass("active");
	                oddsArr.push(selectedOdds);
	                selected.push(selectedOddsId);
		        }
				setTicketAmount();
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		getGuessList(true);		
	}
	
	function getGuessTeamList() {
		var options = {
				
		}
		matchCgi.getGuessTeamList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data || [];
			var data = {
				list: list
			}
			$("#filterList").html(worldCup2018View.filterList(data));
			filter()
		});
	}
	
	function filter() {
		var sel = [];
		//冠亚军头部筛选
	    $("#filterList li").off().on('click', function() {
	        var filterName = $(this).attr('filterName');
	        var teamItem = $("#matchList li.team_item");
	        if($(this).hasClass("active") != true) { //选中添加选定状态
	        	$(this).addClass("active");
				sel.push(filterName);
	        	for(var i = 0; i < teamItem.length; i++){
	                var teamName = $(teamItem[i]).children('.team_name').text();
	                var teamName2 = $(teamItem[i]).attr('team2');
	                var odds = $(teamItem[i]).children('.odds').text();
	                if(teamName.indexOf(filterName) > -1) {
	                	if ($.inArray($(teamItem[i]).attr("oddsId"),selected) == -1) {
	                		oddsArr.push(odds);
	                		selected.push($(teamItem[i]).attr("oddsId"));
	                   	 	$(teamItem[i]).addClass("active");
	                	}
	                }
	            }
	        } else { //删除选定状态计算奖金
	        	$(this).removeClass("active");
	        	sel.splice($.inArray(filterName, sel), 1)
	            var rows = $("#matchList li.active");
	            for(var j = 0; j < rows.length; j++) {
	            	var teamName1 = $(rows[j]).attr('team1');
	            	var teamName2 = $(rows[j]).attr('team2');
	            	var teamName = $(rows[j]).children('.team_name').text();
	            	var odds = $(rows[j]).attr('odds');
                    if(teamName.indexOf(filterName) > -1) {
                    	if ($.inArray(teamName1,sel) == -1 && $.inArray(teamName2,sel) == -1) { 
                    		if($.inArray($(rows[j]).attr("oddsId"),selected) != -1){
	                            oddsArr.splice($.inArray(odds, oddsArr), 1);
	                            selected.splice($.inArray($(rows[j]).attr("oddsId"), selected), 1);
                       	 	}
                        	$(rows[j]).removeClass("active");
                    	}
                    }
	            }
	        }
	        setTicketAmount();//计算奖金
	    });
	}
	
	function setTicketAmount() {
		$("#ticketMultiple").off().on('input', ticketMultipleChange).trigger('input');
	}
	
	function ticketMultipleChange(e) {
		var teamActive =  $("#matchList li.active");
		var countUnit = parseInt(teamActive.length);
		var ticketMultiple = parseInt($('#ticketMultiple').val()) || 0;
		ticketMultiple = ticketMultiple < 1 ? 1 : ticketMultiple;
		ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
		var ticketAmount = ticketMultiple*countUnit*2;
		var maxPrice ;
		if (oddsArr.length > 0) {
			maxPrice = (Math.max.apply(null, oddsArr)*ticketMultiple*2).toFixed(2);
		} else {
			maxPrice = '0.00'
		}
		$('#ticketMultiple').val(ticketMultiple);
		$("#countUnit").html(countUnit);
		$("#ticketAmount").html(ticketAmount + "元");
		$("#maxPrice").html(maxPrice);
	}
	
	function createTicketSubmit() {
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var length = selected.length;
		if (length <= 0) {
			ui.showNotice('请选择比赛');
			return;
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			ui.showNotice('金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			ui.showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple > 100000) {
			ui.showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		var matchRecommend = [];
		var lotteryId = '';
		if (tab == 1) {
			lotteryId = 'SJBGJ'
		} else if (tab == 2) {
			lotteryId = 'SJBGYJ'
		}
		for (var i = 0; i < length; i++) {
			var oddsId = selected[i];
			matchRecommend.push({oddsId: oddsId});
		}
		matchRecommend = JSON.stringify(matchRecommend);
		options = {
			ticketMultiple: ticketMultiple,
			matchRecommend: matchRecommend,
			lotteryId: lotteryId
		}
		orderCgi.createGuessOrder(options, function(ret) {
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
	}
});