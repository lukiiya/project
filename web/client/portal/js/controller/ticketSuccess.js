define(function(require,exports) {

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