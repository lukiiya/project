define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var jxzpListView = require('view/jxzpList');
	var type = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		pageNum = 1;
		pageSize = 8;
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "极限追盘",
			className: 'follow',
			showHeader: true
		}
		main.setMain(view, options);
		var data = {};
		main.setContent(jxzpListView.content(data));
	}


	function setContent() {
		setTab();
	}

	function setTab() {
		var tabItem = $("#tabBox [type]");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			type = parseInt($(this).attr("type"));
			pageNum = 1;
			pageSize = 8;
			getJxzpList();
		});
		//默认选中状态
		var typeIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("type"));
			if (t == type) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		var item = tabItem.eq(typeIndex);
		item.click();
	}


	function moreList() {
		pageNum++;
		getJxzpList(true);		
	}
	
	function getJxzpList(append) {
		main.unsetScrollLoad();
		var options = {
			type: type,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		jxzpCgi.getJxzpList(options, function(ret) {
			if (ret.errCode == 2) {
				common.locationUrl('#jxzpComboList');	
			} else if (ret.errCode != 0) {
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
				$("#jxzpList").append(jxzpListView.jxzpList(data));
			} else {
				$("#jxzpList").html(jxzpListView.jxzpList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}


});