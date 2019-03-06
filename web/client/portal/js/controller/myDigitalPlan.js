define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var myDigitalPlanView = require('view/myDigitalPlan');
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
			title: "我的晒米",
			className: 'user',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myDigitalPlanView.content(data));
	}


	function setContent() {
		getRecommendList();
	}
	
	function getRecommendList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		planCgi.getDigitalPlanList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalIncomeCount = (ret.data && ret.data.totalIncomeCount) || 0;
			var totalIncomeAmount = (ret.data && ret.data.totalIncomeAmount) || 0;
			$("#recommendIncomeCount").html(totalIncomeCount);
			$("#recommendIncomeAmount").html(totalIncomeAmount/100);
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#recommendList").append(myDigitalPlanView.recommendList(data));
			} else {
				$("#recommendList").html(myDigitalPlanView.recommendList(data));
			}
			$("#recommendList [href]").off().on("click", function(e) {
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#recommendList .planItem").off().on("click", accessOrPayPlan);
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			return;
		}
		var data = {
			planNo: planNo,
			amount: amount
		}
		ui.showCreateOrder(data);
	}
	
	function moreList() {
		pageNum++;
		getRecommendList(true);
	}
});