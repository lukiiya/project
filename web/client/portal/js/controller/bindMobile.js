define(function(require,exports) {

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