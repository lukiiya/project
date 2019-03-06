define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var activityCgi = require('cgi/activity');
	var smsCgi = require('cgi/sms');
	var hongBao2018ChunJieView = require('view/activity/hongBao2018ChunJie');

	function init(view) {
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		clearTimeout(getHongBao2018ChunJieList.timer);
	}

	function setMain(view) {
		var options = {
			title: "2018春节红包",
			className: 'activity_2018chunjie'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
	}


	function setContent() {
		getHongBao2018ChunJieInfo();
	}

	function getHongBao2018ChunJieInfo() {
		var options = {
			
		}
		activityCgi.getHongBao2018ChunJieInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var info = ret.data || {};
			var data = {
				info: info,
				IMG_PATH: IMG_PATH
			}
			main.setContent(hongBao2018ChunJieView.content(data));
			$("#startBtn").on('click', receiveHongBao2018ChunJie);
			getHongBao2018ChunJieList();
			if (common.isWeixinBrowser()) {
				var data = {
					title: '晒米场红包闹新春',
					link: location.href.replace(/[#\?].*/g, '') + '#activity/hongBao2018ChunJie',
					imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/2018chunjie/2018chunjie_share.jpg',
					desc: '初一、初五、初七抢168现金红包，人人可抢'
				}
				ui.setShare(data);
			}
		});
	}

	function getHongBao2018ChunJieList() {
		clearTimeout(getHongBao2018ChunJieList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		activityCgi.getHongBao2018ChunJieList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#rankList").html(hongBao2018ChunJieView.rankList(data));
			if (list.length > 0) {
				var textScroll = function() {
					var ul = $("#rankList");
					var li = ul.find("li");
					var length = li.length;
					if (length <= 1) {
						return;
					}
					var firstLi = li.eq(0);
					var height = firstLi.outerHeight(true);
					firstLi.animate({marginTop: -height}, 500, function() {
						firstLi.appendTo(ul).css({marginTop:0});
	            		getHongBao2018ChunJieList.timer = setTimeout(textScroll, 5000);
					});
				};
				getHongBao2018ChunJieList.timer = setTimeout(textScroll, 5000);
			}
		})
	}
	
	function receiveHongBao2018ChunJie() {
		var options = {
			
		}
		activityCgi.receiveHongBao2018ChunJie(options, function(ret) {
			var info = ret.data || {};
			var data = {
				info: info
			}
			if (ret.errCode == -1) {
				showNotStartBox(info);
			} else if (ret.errCode == 0) {
				showSuccessBox(info)
				getHongBao2018ChunJieInfo();
			} else if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
		});
	}
	
	function showNotStartBox(info) {
		closeNotStartBox();
		var data = {
			html: hongBao2018ChunJieView.notStartBox({
				info: info
			})
		}
		$("#pageContainer").append(hongBao2018ChunJieView.chunjieMask(data));
		$("#closePopBtn").off().on("click", closeNotStartBox);
	} 

	function closeNotStartBox(){
		$("#2018chunjieMask").remove();
	}

	function showSuccessBox(info) {
		closeSuccessBox();
		var isAndroid = common.isAndroid();
		var data = {
			html: hongBao2018ChunJieView.getSuccessBox({
				IMG_PATH: IMG_PATH,
				info: info,
				isAndroid: isAndroid
			})
		}
		$("#pageContainer").append(hongBao2018ChunJieView.chunjieMask(data));
		$('#checkBtn').on('click', function(e) {
			if (common.isIosBrowser() && common.isIos()) {
				window.webkit.messageHandlers.appDelegate.postMessage({
	    			name: "shaimi://my"
		    	});
			} else {
				common.locationUrl("#myFinance");
			}
		});
		$("#closePopBtn").off().on("click", closeSuccessBox);
	} 

	function closeSuccessBox(){
		$("#2018chunjieMask").remove();
	}
});