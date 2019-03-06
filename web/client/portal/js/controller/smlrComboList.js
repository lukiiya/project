define(function(require, exports){

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