define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var planCgi = require('cgi/plan');
	var myPlanView = require('view/myPlan');
	var recommendType = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		recommendType = parseInt(common.getUrlParam("recommendType")) || 0;
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		recommendType = null;
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
		main.setContent(myPlanView.content(data));
	}


	function setContent() {
		setType();
	}
	
	function getRecommendList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			recommendType: recommendType
		}
		planCgi.getPlanList(options, function(ret) {
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
				list: list
			}
			if (append) {
				$("#recommendList").append(myPlanView.recommendList(data));
			} else {
				$("#recommendList").html(myPlanView.recommendList(data));
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
		var setHistoryBack = function () {
			if (recommendType) {
				common.setHistoryBack("#my");
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			common.locationUrl("#planDetail&planNo=" + planNo);
			setHistoryBack();
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
	
	function setType() {
		var typeItem = $("#typeList .ui-flex_item");
		typeItem.on("click", function(e) {
			typeItem.removeClass("active");
			$(this).addClass("active");
			recommendType = parseInt($(this).attr("recommendType"));
			if (recommendType == 1 || recommendType == 2) {
				$("#countNum").hide();
			} else {
				$("#countNum").show();
			}
			pageNum = 1;
			pageSize = 15;
			getRecommendList();
		});
		//默认选中状态
		var typeIndex = -1;
		typeItem.each(function (i, item) {
			var t = parseInt($(this).attr("recommendType"));
			if (t == recommendType) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = typeItem.eq(typeIndex);
		item.click();
	}
});