define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var replayCgi = require('cgi/replay');
	var replayListView = require('view/replayList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 12;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "专家复盘",
			className: '',
			showHeader: true,
			isLeftIconHeader: true	
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(replayListView.content(data));
	}

	function setContent() {
		getReplayList()
	}

	function getReplayList(append) {
		main.unsetScrollLoad();
		var options = {
			needUser: true,
			needAll: true,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		replayCgi.getReplayList(options, function(ret) {
			if (ret.errCode != 0) {
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
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#replayList").append(replayListView.replayList(data));
			} else {
				$("#replayList").html(replayListView.replayList(data));
			}
			$("#replayList .item").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var replayNo = trim($(this).attr("replayNo"));
				if (!replayNo) {
					return;
				}
				if (replayNo) {
					common.locationUrl("#replayDetail&replayNo=" + replayNo);
				} 
			});
			$("#replayList .userProfile").off().on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				} 
			});
//			$("#replayList .userShare").off().on("click", function(e) {
//				e.preventDefault();
//				e.stopPropagation();
//				var userNo = trim($(this).attr("userNo"));
//				var planNo = trim($(this).attr("planNo"));
//				var userName = trim($(this).attr("userName"));
//				var userImg = trim($(this).attr("userImg"));
//				if (!planNo || !userNo || !userName) {
//					return;
//				}
//				var user = common.getLoginUser();
//				var spreaderUserNo = trim(user && user.userNo || '');
//				var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
//				var data = {
//					title: userName,
//					link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
//					imgUrl: userImg,
//					desc: '晒米场足球推荐专家',
//					success: function() {
//						ui.setShare();
//					},
//					cancel: function() {
//						ui.setShare();	
//					}
//				}
//				ui.showShare(data);
//			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function moreList() {
		pageNum++;
		getReplayList(true);
	}	
});