define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var orderCgi = require('cgi/order');
	var focusCgi = require('cgi/focus');
	var digitalPlanDetailView = require('view/digitalPlanDetail');
	var planNo = null;
	var transdata = null;

	function init(view) {
		planNo = trim(common.getUrlParam("planNo")) || "";
		transdata = trim(common.getUrlParam("transdata")) || "";
		if (transdata) {
			//防止购买成功，有缓存
			common.clearCache('c=plan&m=digitalPlanInfo');
			common.clearCache('c=plan&m=digitalPlanList');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		planNo = null;
		transdata = null;
	}

	function setMain(view) {
		var options = {
			title: "推荐详情",
			className: 'expertRcmd',
			showHeader: true,
		}
		main.setMain(view, options);
	}


	function setContent() {
		getDigitalPlanInfo();
	}
	
	function getDigitalPlanInfo() {
		if (!planNo) {
			return;
		}
		var options = {
			needUser: true,
			planNo: planNo
		}
		planCgi.getDigitalPlanInfo(options, function(ret) {
			if (ret.errCode == 2) {
				if (transdata) {
					ui.showAttention('支付单正在处理中，请稍等...');
					setTimeout(getDigitalPlanInfo, 5000)
				} else {
					payPlan(ret.data);
				}
				return;	
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.closeAttention();
			var plan = ret.data || {};
			var data = {
				IMG_PATH: IMG_PATH,
				plan: plan,
				Object: Object
			}
//			var showMask = (function() {
//				closeMask();
//				var ticketOrderHint = common.getCache('ticketOrderHint');
//				var isSale = plan.isSale;
//				if (isSale && !ticketOrderHint) {
//					$("body").append(digitalPlanDetailView.mask());
//					ticketOrderHint = true;
//					common.setCache('ticketOrderHint', ticketOrderHint, 1000*3600*24*2);//1000天失效
//				}
//				$("#ticketOrderMask").on('click',function(){
//					closeMask();
//				})
//			})();
			main.setContent(digitalPlanDetailView.content(data));
			//添加预览
			$('#planDetail .planpic').on('click', previewImage);
			$("#userMore").on('click', function() {
				var userNo = trim($(this).attr('userNo')) || '';
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			})
			$("#bottomBox [href]").on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var href = trim($(this).attr('href'));
				if (href) {
					common.locationUrl(href);
				}
			});
			$("#upCount, #downCount").on('click', function(e) {
				var id = trim($(this).attr('id'));
				var planNo = trim($(this).attr('planNo'));
				if (!id || !planNo) {
					return;
				}
				var planCount = common.getCache('planCount');
				if (planCount) {
					if (!!planCount[id][planNo]) {
						ui.showNotice('您已参与过');
						return;
					}
				} else {
					planCount = {
						upCount: {},
						downCount: {},
						shareCount: {}
					}	
				}
				var countFun = (function(dom) {
					return function() {
						var id = trim($(dom).attr('id'));
						var count = parseInt($("#"+id+'Num').html()) || 0;
						$("#"+id+'Num').html(count+1);
						planCount[id][planNo] = true;
						common.setCache('planCount', planCount, 1000*3600*24*1000);//1000天失效
					}
				})(this);
				var cgiFun = '';
				if (id == 'upCount') {
					cgiFun = 'planUpCount';	
				} else if (id == 'downCount') {
					cgiFun = 'planDownCount';	
				}
				if (cgiFun) {
					planCgi[cgiFun]({
						planNo: planNo
					}, countFun, countFun)
				}
			});
			var planUser = plan.user;
			var planNo = plan.planNo;
			var betContent = plan.betContentList[0];
			var recommendCount = plan.recommendCount;
			var betContentResult = betContent.betContentResult || {};
			var title = betContentResult.name;
			var selectContent;
			if (title == '直选') {
				selectContent = [];
				var zx = betContent.betContent.split(':')[1];
				s = zx.split('|')[0].split(',').join(" ") + '|' + zx.split('|')[1].split(',').join(" ") + '|' + zx.split('|')[2].split(',').join(" ")
				selectContent.push(s);
			} else {
				selectContent = betContent.betContent.split(':')[1].split(',')
			}
			var issue = plan.issue;
			var realName = planUser.realName;
			var nickName = planUser.nickName;
			var profileImg = planUser.profileImg;
			var personalImg = planUser.personalImg;
			var userImg = personalImg || profileImg;
			var userName = realName || nickName;
			var userNo = planUser.userNo;
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName + '推荐',
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#digitalPlanDetail&planNo=' + planNo,
				imgUrl: userImg,
				desc: issue + '期 ' + '3D' + title + '推荐',
				success: function() {
					var count = parseInt($("#shareCountNum").html()) || 0;
					$("#shareCountNum").html(count+1);
					planCgi.planShareCount({
						planNo: planNo
					});	
				}
			}
			ui.setShare(shareData);
			$("#shareCount").on('click', function(e) {
				ui.showShare(shareData);
			});
			getExpertInfo(userNo);
			$("#addTicket").on('click', function() {
				common.locationUrl("#fc3d&recommend=true&bet=ture&planNo=" + planNo);
				addToStorage('fc3dRecommend',{
					title: title,
					selectContent: selectContent,
					unit: recommendCount
				})
			});
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var urls = [];
		$('#planDetail .planpic').each(function(i, item) {
			var src = trim($(this).attr('src'));
			if (src) {
				urls.push(src);
			}
		});
		var current = trim($(this).attr('src')) || urls[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function payPlan(amount) {
		amount = (parseInt(amount) || 0)/100;
		ui.showConfirm("需支付" + amount + "粒米查看专家推荐<br>(1粒米=1元)", function sure() {
			var spreaderUserNo = trim(common.getUrlParam("spreaderUserNo")) || '';
			var options = {
				planNo: planNo,
				spreaderUserNo: spreaderUserNo
			}
			orderCgi.createOrder(options, function(ret) {
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
						ui.closeConfirm();
						setTimeout(function() {
							getDigitalPlanInfo();
						}, 1000);
					}
				} else {
					ui.showNotice("支付失败");	
				}
			});
		}, function cancel() {
			common.locationUrl('#');
		});
	}
	
//	function closeMask() {
//		$("#ticketOrderMask").remove();
//	}
	
	var localData = (function () { //本地储存
	    return {
	        set: function (name, value) {
	            localStorage.setItem(name, value);
	        },
	        get: function (name) {
	            return localStorage.getItem(name);
	        },
	        remove: function (name) {
	            localStorage.removeItem(name);
	        }
	    };
	})()
	
	function addToStorage(fc3dCartKey,numInfo) { //选择号码添加到本地储存
        if (numInfo != null) {
        	var items = [];
            items.push(numInfo);
            var strItems = JSON.stringify(items);
            localData.set(fc3dCartKey, strItems);
        }
    };
	
	function getExpertInfo(userNo) {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var focusStatus = parseInt(user.focusStatus) || 0;
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					createFocus(userNo);
				}).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					cancelFocus(userNo)
				}).show();
			}
		});
	}

	function createFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});
		}, function cancel() {

		});
	}

	function cancelFocus(userNo) {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo(userNo);
			});	
		}, function cancel() {

		});
	}
});