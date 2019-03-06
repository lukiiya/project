define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var orderCgi = require('cgi/order');
	var ticketOrderDetailView = require('view/ticketOrderDetail');
	var orderNo = null;
	var orderTicketList = null;
	var type = null;
	var orderFollowList = null;
	var selfGod = null;

	function init(view) {
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		orderTicketList = common.getUrlParam("orderTicketList") || false;
		orderFollowList = common.getUrlParam("orderFollowList") || false;
		selfGod = common.getUrlParam("selfGod") || false;
		type = common.getUrlParam("type") || 1;
		common.setHistoryBack('#myBet');
		if (selfGod) {
			common.setHistoryBack('#documentaryMarket');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderNo = null;
		orderTicketList = null;
		type = null;
		orderFollowList = null;
		selfGod = null;
		closeImage();
	}

	function setMain(view) {
		var options = {
			title: orderTicketList ? "出票详情":"订单详情",
			className: 'myDocumentary',
			showHeader: true,
			isOrderTicketListHeader: !!orderTicketList,
			isLeftIconHeader: !!orderFollowList,
			rightButtonText: '分享给好友'
		}
		main.setMain(view, options);
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser() && common.isIos()) {
				common.locationUrl("#myBet");
			}
		});
	} 


	function setContent() {
		if (orderTicketList) {
			$("#goBack").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#ticketOrderDetail&orderNo="+orderNo);
			});
			getOrderTicketList();
		} else if (orderFollowList) {
			$(".leftIcon_header").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl("#ticketOrderDetail&orderNo="+orderNo);
			});
			getOrderFollowList();
		} else {
			getTicketOrderInfo();
		}
	}
	
	function getTicketOrderInfo() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo,
			type: type
		}
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			var publish = ticketOrder.publish;
			var data = {
				ticketOrder: ticketOrder,
				Object: Object,
				IMG_PATH: IMG_PATH
			}
			main.setContent(ticketOrderDetailView.ticketOrder(data));
			$("#showTicketImg").on("click", showImage);
			$("#showTicketDetail").on("click", function() {
				common.locationUrl("#ticketOrderDetail&orderTicketList=true&orderNo="+orderNo);
			});
			$("#followCountBtn").on("click", function() {
				common.locationUrl("#ticketOrderDetail&orderFollowList=true&orderNo="+orderNo);
			});
			$("#shareMarketBtn").on('click', createPublish);
			$("#continueBtn").on('click', function() {
				common.locationUrl("#createTicketOrder&orderNo="+orderNo);
			})
			$("#followBtn").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var recommendCount = parseInt($(this).attr("betAmount"))/2;
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				if (!orderNo) {
					return;
				}
				var data = {
					planNo: orderNo,
					recommendCount: recommendCount,
					maxBettypeOdds: maxBettypeOdds,
					planType: -1,
					isSelfFollow: 1
				}
				ui.showCreateTicketOrder(data);
			});
			var planMatchType = ticketOrder.planMatchType;
			var planUser = ticketOrder.user || {};
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var planMatchTypeMap = {1: '竞彩足球', 2: '竞彩篮球'};
			var shareData = {
				title: '晒米场',
				link: location.href.replace(/[#\?].*/g, '')+ '#ticketOrderDetail&orderNo=' + orderNo,
				imgUrl: userImg,
				desc: userName + '的' + planMatchTypeMap[planMatchType] + '神单，跟单中奖'
			}
			ui.setShare(shareData);
			if (publish == 1) {
				$("#pageHeader .rightIcon_top").on('click',function() {
					ui.showShare(shareData);
				}).show();
			} else {
				$("#pageHeader .rightIcon_top").hide()
			}			
		}); 
	}
	
	function showImage() {
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		//在微信里面，就使用微信预览api
		if (common.isWeixinBrowser()) {
			var urls = [];
			$.each(resourceList, function(i, url) {
				url && urls.push(url);
			});
			if (urls.length > 0) {
				var current = urls[0] || '';
				weixin.call("previewImage", {
					current: current,// 当前显示图片的http链接
					urls: urls// 需要预览的图片http链接列表
				});
			}
		} else {
			closeImage();
			var imgHtml = [];
			$.each(resourceList, function(i, url) {
				url && imgHtml.push('<img class="img-responsive" src="'+url+'"/>');
			});
			var data = {
				length: imgHtml.length,
				html: imgHtml.join('</br>')
			}
			$("body").append(ticketOrderDetailView.previewImage(data));
			$("#showImg").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				closeImage();
			});
		}
	}
	
	function closeImage() {
		$("#showImg").remove();
	}
	
	function getOrderTicketList() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		orderCgi.getOrderTicketList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var orderNumeric = ret.data.orderNumeric || "";
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				orderNumeric: orderNumeric
			}
			main.setContent(ticketOrderDetailView.orderTicketList(data));
			$(".showTicketCode").on("click", function() {
				var printNo = trim($(this).attr("printNo"));
				if (printNo) {
					ui.showAlert("出票码：<br />" +printNo);
				}
			})
		});
	}
	
	function createPublish() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		ui.showConfirm("分享至跟单市场，只要方案最终能盈利30%以上，用户每复制一单，您将获得投注方案奖金的7%作为收益。<br/>收益部分可以购彩，也可以提现", function sure() {
			orderCgi.createPublish(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('分享成功');
				getTicketOrderInfo();
			});
		}, function cancel() {

		});	
	}
	
	function getOrderFollowList() {
		if (!orderNo) {
			return;
		}
		var options = {
			orderNo : orderNo
		}
		orderCgi.getOrderFollowList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalAmount = ret.data.totalAmount/100 || 0;
			var totalCount = ret.data.totalCount || 0;
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				totalAmount: totalAmount,
				totalCount: totalCount
			}
			main.setContent(ticketOrderDetailView.userFollowList(data));
		});
	}
});