define(function(require,exports) {

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