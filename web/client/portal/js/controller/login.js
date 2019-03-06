define(function(require, exports) {

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