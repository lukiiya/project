define(function(require, exports) {

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