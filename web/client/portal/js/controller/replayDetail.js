define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var replayCgi = require('cgi/replay');
	var orderCgi = require('cgi/order');
	var focusCgi = require('cgi/focus');
	var replayDetailView = require('view/replayDetail');
	var replayNo = null;
	var transdata = null;

	function init(view) {
		replayNo = trim(common.getUrlParam("replayNo")) || "";
		transdata = trim(common.getUrlParam("transdata")) || "";
		if (transdata) {
			//防止购买成功，有缓存
			common.clearCache('c=replay&m=planInfo');
			common.clearCache('c=replay&m=planList');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		replayNo = null;
		transdata = null;
	}

	function setMain(view) {
		var options = {
			title: "复盘详情",
			className: 'expertRcmd',
			showHeader: true,
		}
		main.setMain(view, options);
	}


	function setContent() {
		getReplayInfo();
	}
	
	function getReplayInfo() {
		if (!replayNo) {
			return;
		}
		var options = {
			replayNo: replayNo
		}
		replayCgi.getReplayInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.closeAttention();
			var replay = ret.data || {};
			var data = {
				IMG_PATH: IMG_PATH,
				replay: replay
			}
			main.setContent(replayDetailView.content(data));
			//添加预览
			$('#replayDetail .planpic').on('click', previewImage);
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
				var replayNo = trim($(this).attr('replayNo'));
				if (!id || !replayNo) {
					return;
				}
				var replayCount = common.getCache('replayCount');
				if (replayCount) {
					if (!!replayCount[id][replayNo]) {
						ui.showNotice('您已参与过');
						return;
					}
				} else {
					replayCount = {
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
						replayCount[id][replayNo] = true;
						common.setCache('replayCount', replayCount, 1000*3600*24*1000);//1000天失效
					}
				})(this);
				var cgiFun = '';
				if (id == 'upCount') {
					cgiFun = 'replayUpCount';	
				} else if (id == 'downCount') {
					cgiFun = 'replayDownCount';	
				}
				if (cgiFun) {
					replayCgi[cgiFun]({
						replayNo: replayNo
					}, countFun, countFun)
				}
			});
			var planUser = replay.user;
			var replayNo = replay.replayNo;
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
				title: userName + '的复盘',
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#replayDetail&replayNo=' + replayNo,
				imgUrl: userImg,
				desc: '',
				success: function() {
					var count = parseInt($("#shareCountNum").html()) || 0;
					$("#shareCountNum").html(count+1);
					replayCgi.planShareCount({
						replayNo: replayNo
					});	
				}
			}
			ui.setShare(shareData);
			$("#shareCount").on('click', function(e) {
				ui.showShare(shareData);
			});
			getExpertInfo(userNo);
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var urls = [];
		$('#replayDetail .planpic').each(function(i, item) {
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