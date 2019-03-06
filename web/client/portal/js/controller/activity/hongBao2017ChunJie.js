define(function(require, exports) {

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