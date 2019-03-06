// 充值记录
define(function(require,exports) {

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