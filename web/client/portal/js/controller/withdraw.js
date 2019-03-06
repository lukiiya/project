//收款
define(function(require,exports) {

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