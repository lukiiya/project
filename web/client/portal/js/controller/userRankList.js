define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userRankListView = require('view/userRankList');
	var pageNum = null;
	var pageSize = null;
	var type = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 0;
		pageNum = 1;
		pageSize = 15;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		type = null;
	}

	function setMain(view) {
		var options = {
			title: "红人榜",
			className: 'redman',
			showHeader: true,
			isUserRankHeader: true
		}
		main.setMain(view, options);
		main.setContent(userRankListView.content());
	}

	function setContent() {
		setType(); 
	}

	function setType() {
		var tabList = $('#userRankTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			pageNum = 1;
			pageSize = 15;
			type = parseInt($(this).attr('type')) || 1;
			if (type == 1) {
				main.setContent(userRankListView.userRankListBox());
				getUserRankList();
			} else if (type == 2) {
				main.setContent(userRankListView.winRateRankListBox());
				getWinRateRankList();
			} else if (type == 3) {
				main.setContent(userRankListView.profitRateRankListBox());
				getProfitRateRankList();
			}
		});
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}

	function moreList() {
		
	}
	
	function getUserRankList(append) {
		moreList = function () {
			pageNum++;
			getUserRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserRankList(options, function(ret) {
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
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#userRankList").append(userRankListView.userRankList(data));
			} else {
				$("#userRankList").html(userRankListView.userRankList(data));
			}
			$("#userRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function getWinRateRankList(append) {
		moreList = function () {
			pageNum++;
			getWinRateRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getWinRateRankList(options, function(ret) {
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
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#winRateRankList").append(userRankListView.winRateRankList(data));
			} else {
				$("#winRateRankList").html(userRankListView.winRateRankList(data));
			}
			$("#winRateRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function getProfitRateRankList(append) {
		moreList = function () {
			pageNum++;
			getProfitRateRankList(true);	
		}
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getProfitRateRankList(options, function(ret) {
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
				list: list,
				pageNum: pageNum,
				pageSize: pageSize
			}
			if (append) {
				$("#profitRateRankList").append(userRankListView.profitRateRankList(data));
			} else {
				$("#profitRateRankList").html(userRankListView.profitRateRankList(data));
			}
			$("#profitRateRankList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});