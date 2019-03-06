define(function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/clipboard');
	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var myInvitationView = require('view/invitation/index');

	function init(view) {
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "我的邀请",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(myInvitationView.content(data));
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			if (common.isAndroidBrowser()) {
				window.Jockey && window.Jockey.send("closeWindow");
			} else if (common.isIosBrowser()) {
				common.locationUrl("#my");
			}
		});
		copy();
	}


	function setContent() {
		getShareLink();
		setTab();
	}
	
	function copy() {
		var clipboard = new Clipboard('#copyBtn');
        clipboard.on('success', function(e) {
            ui.showNotice('内容已复制')
            e.clearSelection();
        });
		clipboard.on('error', function(e) {
		    ui.showNotice('请选择"拷贝"进行复制')
		});
	}
	
	function setTab() {
		var tabItem = $("#tabList .menu_bar");
		tabItem.on("click", function(e) {
			var tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				common.locationUrl("#invitation/incomeList");
			} else if (tab == 2) {
				common.locationUrl("#invitation/inviteUserList");
			} else if (tab == 3) {			
				common.locationUrl("#invitation/gpcConsumeList");
			} else if (tab == 4) {
				common.locationUrl("#invitation/jjcConsumeList");
			}
		});
	}
	
	function getShareLink() {
		var options = {};
		channelCgi.getShareLink(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var link = ret.data || '';
			$("#shareLink").val(link);
			$("#shareBtn").on('click', function() {
				if (common.isWeixinBrowser()) {
					var data = {
						title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
					}
					ui.showShare(data);
				} else if (common.isAndroidBrowser()) {
					window.Jockey && window.Jockey.send("YQShare",{
						title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
					});
				} else if (common.isIosBrowser() && common.isIos()) {
		    		window.webkit.messageHandlers.myInvitationShare.postMessage({
		    			title: '彩票礼包大派送',
						link: link,
						imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
						desc: '亲爱的，我送你一个128元彩票大礼包'
		    		});
				}
			});
			//微信浏览器先调一次,保证不点击分享按钮,右上角也可以分享
			if (common.isWeixinBrowser()) {
				var data = {
					title: '彩票礼包大派送',
					link: link,
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/invitation_share_logo.jpg',
					desc: '亲爱的，我送你一个128元彩票大礼包'
				}
				ui.setShare(data);
			}
		});
	}
});