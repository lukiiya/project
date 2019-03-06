define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.slides');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var orderCgi = require('cgi/order');
	var lotteryCgi = require('cgi/lottery');
	var recentAwardsView = require('view/recentAwards');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "最新开奖",
			className: 'recentAwards',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		};
		main.setContent(recentAwardsView.content(data));
	}


	function setContent() {
//		getPrizeOrderList();
		getLotteryIssueList();
	}
	
	function getLotteryIssueList() {
		var options = {}
		lotteryCgi.lotteryIssueList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}			
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				Date: Date
			}
			$("#drawList").html(recentAwardsView.drawList(data));
			$("#drawList .draw_item").on('click', function() {
				var lotteryId = trim($(this).attr('lotteryId'));
				common.locationUrl("#drawHistory&lotteryId=" + lotteryId);
			})
		})
	}
	
	function getPrizeOrderList() {
		clearTimeout(getPrizeOrderList.timer);
		var options = {
			pageNum: 1,
			pageSize: 8	
		}
		orderCgi.getPrizeOrderList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
				return;
			}
			var data = {
				list: list	
			}
			$("#rankList").html(recentAwardsView.rankList(data));
			$("#rankBox").show();
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
            		getPrizeOrderList.timer = setTimeout(textScroll, 5000);
				});
			};
			getPrizeOrderList.timer = setTimeout(textScroll, 5000);
		})
	}
});