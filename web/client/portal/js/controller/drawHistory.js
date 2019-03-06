define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var lotteryCgi = require('cgi/lottery');
	var drawHistoryView = require('view/drawHistory');
	var pageNum = null;
	var pageSize = null;
	var lotteryId = null;

	function init(view) {
		lotteryId = trim(common.getUrlParam("lotteryId")) || "";
		pageNum = 1;
		if (lotteryId == 'JSK3' || lotteryId == 'GX11X5') {
			pageSize = 20;
		} else {
			pageSize = 8;
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		lotteryId = null;
	}

	function setMain(view) {
		var titleMap = {'SSQ': '双色球历史开奖','JSK3': '快3历史开奖','DLT': '大乐透历史开奖','GX11X5': '乐11选5开奖','FC3D': '3D开奖'};
		var options = {
			title: titleMap[lotteryId],
			className: 'drawHistory',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		if (lotteryId == 'SSQ' || lotteryId == 'DLT') {
			main.setContent(drawHistoryView.SSQ())
		} else if (lotteryId == 'JSK3') {
			main.setContent(drawHistoryView.JSK3())
		} else if (lotteryId == 'GX11X5') {
			main.setContent(drawHistoryView.GX11X5())
		} else if (lotteryId == 'FC3D') {
			main.setContent(drawHistoryView.FC3D())
		}   
	}


	function setContent() {
		getLotteryIssueList();
	}
	
	function getLotteryIssueList(append) {
		main.unsetScrollLoad();
		var options = {
			lotteryId: lotteryId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		lotteryCgi.lotteryIssueList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				Date: Date
			}
			if (lotteryId == 'SSQ' || lotteryId == 'DLT') {
				if (append) {
					$("#SSQdrawList").append(drawHistoryView.SSQdrawList(data));
				} else {
					$("#SSQdrawList").html(drawHistoryView.SSQdrawList(data));
				}
			} else if (lotteryId == 'JSK3') {
				if (append) {
					$("#K3drawList").append(drawHistoryView.K3drawList(data));
				} else {
					$("#K3drawList").html(drawHistoryView.K3drawList(data));
				}
			} else if (lotteryId == 'GX11X5') {
				if (append) {
					$("#GX11X5DrawList").append(drawHistoryView.GX11X5DrawList(data));
				} else {
					$("#GX11X5DrawList").html(drawHistoryView.GX11X5DrawList(data));
				}
			} else if (lotteryId == 'FC3D') {
				if (append) {
					$("#fc3dDrawList").append(drawHistoryView.fc3dDrawList(data));
				} else {
					$("#fc3dDrawList").html(drawHistoryView.fc3dDrawList(data));
				}
			}
		}, function() {
			main.setScrollLoad(moreList);
		})
	}
	
	function moreList() {
		pageNum++;
		getLotteryIssueList(true);		
	}
		
});	