define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var couponCgi = require('cgi/coupon');
	var main = require('module/main');
	var myCouponView = require('view/myCoupon');
	var illustrate = null;
	var state = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		illustrate = trim(common.getUrlParam("illustrate"));
		state = parseInt(common.getUrlParam("state"));
		pageNum = 1;
		pageSize = 15
		setMain(view);
		setContent();
	}

	function _init(view) {
		illustrate = null;
		state = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {};
		if (illustrate) {
			options = {
				title: "优惠券使用说明",
				className: 'coupon',
				showHeader: true,
				isLeftIconHeader: true
			}
		} else {
			options = {
				title: "优惠券",
				className: 'coupon',
				showHeader: true,
				rightButtonText: '说明',
				rightButtonFun: function() {
					common.locationUrl('#myCoupon&illustrate=true');
				}
			}
		}
		main.setMain(view, options);
		if (illustrate) {
			main.setContent(myCouponView.couponIllustrate());
		} else {
			main.setContent(myCouponView.coupon());
		}
	}


	function setContent() {
		setTab()
	}
	
	function setTab() {
		var tabList = $('#tabBox .ui-flex_item');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			state = parseInt($(this).attr('state')) || 1;
			pageNum = 1;
			pageSize = 15;
			getUserCouponList();
		});
		//默认选中
		var tabIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('state')) || 0;
			if (state == t) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		tabList.eq(tabIndex).click();
	}
	
	function getUserCouponList(append) {
		var options = {
			state: state,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		couponCgi.getUserCouponList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var availableCount = (ret.data && ret.data.availableCount) || 0;
			var distributeCount = (ret.data && ret.data.distributeCount) || 0;
			$("#availableCount").html("(" + availableCount + ")");
			$("#distributeCount").html("(" + distributeCount + ")");
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH,
				state: state
			}
			if (append) {
				$("#couponList").append(myCouponView.couponList(data));
			} else {
				$("#couponList").html(myCouponView.couponList(data));
			}
			$(".use_btn").on('click', function() {
				var couponType = $(this).attr('couponType');
				if (couponType == 1) {
					common.locationUrl('#lotteryHall');
				} else if (couponType == 2) {
					common.locationUrl('#charge&financeType=1');
				}
				
			})
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		getUserCouponList(true);
	}
});