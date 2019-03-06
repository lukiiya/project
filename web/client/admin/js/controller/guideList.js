define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var guideCgi = require('cgi/guide');
	var guideListView = require('view/guideList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "引导列表",
			className :  'guide_list'
		}
		main.setMain(view, options);
		main.setContent(guideListView.content());
		$("#searchSubmit").on('click',searchSubmit);
	}

	function setContent() {
		getGuideList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGuideList();
	}

	function getGuideList() {
		var guideUserName = trim($("#guideUserName").val()) || null;
		var accessUserName = trim($("#accessUserName").val()) || null;
		var options = {
			guideUserName: guideUserName,
			accessUserName: accessUserName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		guideCgi.getGuideList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#guideList").html(guideListView.guideList(data));
			main.activeTr('guideList');
		});
	}

	function showPagination(totalCount) {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			totalCount: totalCount,
			pageCodeId: "pageCodeBox",
			pageCodeFun: pageCodeFun
		};
		ui.showPagination(options);
	}

	function pageCodeFun(e){
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getGuideList();
	}

})