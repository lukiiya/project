define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myShareView = require('view/myShare');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "分享收成",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myShareView.content(data));
	}


	function setContent() {
		getSpreadList();
	}
	
	function getSpreadList(append) {
		main.unsetScrollLoad();
		var options = {
			needUser: true,
			needSpread: true,
			needPlanAccess: true,
			pageNum: pageNum,
			pageSize: pageSize		
		}
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			$('#spreadIncomeCount').html(totalCount);
			$('#spreadIncomeAmount').html(totalAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#spreadList").append(myShareView.spreadList(data));
			} else {
				$("#spreadList").html(myShareView.spreadList(data));
			}
			$("#spreadList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#spreadList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			common.setHistoryBack("#my");
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		var planType = parseInt($(this).attr("planType"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (planType == 1) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (planType == 2) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getRecommendList(true);
	}
});