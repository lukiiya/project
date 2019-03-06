define(function(require,exports) {

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