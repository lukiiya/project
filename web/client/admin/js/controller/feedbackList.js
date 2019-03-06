define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var feedbackCgi = require('cgi/feedback');
	var feedbackListView = require('view/feedbackList');
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
			title : "反馈列表",
			className :  'feedback_list'
		}
		main.setMain(view, options);
		main.setContent(feedbackListView.content());
		$("#searchSubmit").on('click',searchSubmit);
	}

	function setContent() {
		getFeedbackList();
	}

	function searchSubmit() {
		pageNum = 1;
		getFeedbackList();
	}

	function getFeedbackList() {
		var userName = trim($("#userName").val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		feedbackCgi.getFeedbackList(options, function(ret) {
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
			$("#feedbackList").html(feedbackListView.feedbackList(data));
			$("#feedbackList .feedbackDetail").on('click', feedbackDetail);
			main.activeTr('feedbackList');
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
		getFeedbackList();
	}

	function feedbackDetail() {
		var feedbackId = parseInt($(this).attr('feedbackId')) || 0;
		var content = trim($(this).attr('content')) || "";
		if (isNaN(feedbackId) || feedbackId <= 0) {
			return;
		}
		var options = {
			html: '<pre style="white-space:pre-wrap;line-height:25px;">'+content+'</pre>'
		}
		ui.showWindow(options);
	}

})