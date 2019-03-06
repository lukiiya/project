define(function(require, exports){

	exports.setMain = setMain;
	exports.setContent = setContent;
	exports.setScrollLoad = setScrollLoad;
	exports.unsetScrollLoad = unsetScrollLoad;

	var common = require('module/common');
	var ui = require('module/ui');
	var mainView = require('view/main');
	var activityCgi = require('cgi/activity');
	var userCgi = require('cgi/user');
	var guideCgi = require('cgi/guide');

	function setMain(view, options) {
		if (common.isWeixinBrowser()) {
			ui.setShare();
		}
		if (common.isLogin()) {
			//setGuideAccess();
			//showHongBao();
		}
		var hash = common.getLocationHash() || '';
		if (!/editPlan|matchMoreBettype|match/.test(hash)) {
			//清除编辑方案的比赛选择
			window.editPlanSelectMatch = null;
			window.matchSelectBettype = null;
		}
		var title = options.title || '';
		var className = options.className || '';
		var showHeader = !!options.showHeader;
		var showFooter = !!options.showFooter;
		var isSimpleHeader = !!options.isSimpleHeader;
		var isScrollHeader = !!options.isScrollHeader;
		var isUserVerifyHeader = !!options.isUserVerifyHeader;
		var isWithdrawHeader = !!options.isWithdrawHeader;
		var isMatchHeader = !!options.isMatchHeader;
		var isFocusHeader = !!options.isFocusHeader;
		var isUserRankHeader = !!options.isUserRankHeader;
		var isHotMatchHeader = !!options.isHotMatchHeader;
		var isRechargeHeader = !!options.isRechargeHeader;
		var isTurnplateHeader = !!options.isTurnplateHeader;
		var isSupplierHeader = !!options.isSupplierHeader;
		var isOrderTicketListHeader = !!options.isOrderTicketListHeader;
		var isLeftIconHeader = !!options.isLeftIconHeader;
		var isFinanceHeader = !!options.isFinanceHeader;
		var isSsqHbHeader = !!options.isSsqHbHeader;
		var isDigitalHeader = !!options.isDigitalHeader;
		var isRecommendHeader = !!options.isRecommendHeader;
		var isFootballHeader = !!options.isFootballHeader;
		var rightButtonText = options.rightButtonText || '';
		var rightButtonFun = options.rightButtonFun || function() {};
		href = trim(common.getUrlParam("#"));
		if (ENV == 'dev') {
			title += '(开发环境)';
		} else if (ENV == 'beta') {
			title += '(测试环境)';
		}
		view.setTitle(title);
		var data = {
			title: title,
			className: className,
			showHeader: showHeader,
			showFooter: showFooter,
			isSimpleHeader: isSimpleHeader,
			isScrollHeader: isScrollHeader,
			isUserVerifyHeader: isUserVerifyHeader,
			isWithdrawHeader: isWithdrawHeader,
			isMatchHeader: isMatchHeader,
			isFocusHeader: isFocusHeader,
			isUserRankHeader: isUserRankHeader,
			isHotMatchHeader:　isHotMatchHeader,
			isRechargeHeader: isRechargeHeader,
			isTurnplateHeader: isTurnplateHeader,
			isSupplierHeader: isSupplierHeader,
			isLeftIconHeader: isLeftIconHeader,
			isOrderTicketListHeader: isOrderTicketListHeader,
			isSsqHbHeader: isSsqHbHeader,
			isFinanceHeader: isFinanceHeader,
			isDigitalHeader: isDigitalHeader,
			isRecommendHeader: isRecommendHeader,
			isFootballHeader: isFootballHeader,
			rightButtonText: rightButtonText,
			isIos: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
			isWeixinBrowser: common.isWeixinBrowser(),
			IMG_PATH: IMG_PATH,
			isApp: common.isApp()
		}
		view.setContent(mainView.content(data));
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
		});
		$("#pageHeader .rightIcon_top").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (rightButtonText) {
				rightButtonFun();	
			} else {
				common.locationUrl('#home');
			}
		});
		$("#pageHeader [href]").on("click", function(e) {
			var href = trim($(this).attr('href'));
			if (href) {
				common.locationUrl(href);
			}
		});
		$("#pageFooter a").each(function(){
			var href = trim($(this).attr('href'));
			var hash = window.location.hash;
			$(this).on("click",function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl(href);
			});
			if(hash.indexOf(href) != -1) {
				$(this).addClass('active');
			}else {
				$(this).removeClass('active');
			}
		})
	}

	function setContent(html){
		$("#pageContent").html(html);
	}

	function setScrollLoad(callback) {
		callback = callback || function() {};
		unsetScrollLoad();
		$("#pageContent").on('scroll', function() {
			var scrollHeight = this.scrollHeight;
			var offsetHeight = this.offsetHeight;
            var scrollTop = this.scrollTop;
            var maxScrollTop = scrollHeight - offsetHeight;
            if (maxScrollTop - scrollTop <= 30) {
            	callback();
            }
        });
	}

	function unsetScrollLoad() {
		$("#pageContent").off('scroll');
	}

	function showHongBao() {
		var hash = common.getLocationHash() || '';
		var refuseHongBao = common.getCache('refuseHongBao') || {count: 0};
		var refuseCount = refuseHongBao.count || 0;
		if (/activity\/hongBao|download/.test(hash) || refuseCount >= 2) {
			return;
		}
		var options = {};
		activityCgi.isReceiveHongBao(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || false;
			if (!data) {
				var options = {
					html: mainView.hongBao({
						IMG_PATH: IMG_PATH
					})
				}
				ui.showWindow(options);
				$('#windowBox .close_btn').on('click', function(e) {
					refuseHongBao = {
						count: refuseCount + 1
					}
					common.setCache('refuseHongBao', refuseHongBao, 1000*3600*24*2);//2天失效
					ui.closeWindow();
				});
				$('#windowBox .open').on('click', function(e) {
					common.locationUrl('#activity/hongBao');
				});
			}
		});
	}

	function setGuideAccess() {
		var guideUserNo = trim(common.getUrlParam('guideUserNo'));
		var href = location.href || '';
		var temp = href.match(/#([^?=#&\s]*)/);
		if (!guideUserNo || !temp || temp.length != 2) {
			return;
		}
		var accessPage = trim(temp[1]);
		var options = {
			guideUserNo: guideUserNo,
			accessPage: accessPage
		};
		guideCgi.createGuide(options);
	}
});