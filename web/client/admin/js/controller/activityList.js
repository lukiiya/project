define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityListView = require('view/activityList');
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
			title: "活动列表",
			className: 'activity_record'
		} 
		main.setMain(view, options);
		main.setContent(activityListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}
	
	function setContent() {
		getActivityList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityList();
	}

	function getActivityList() {
		var activityName = trim($('#activityName').val()) || null;
		var options = {
			activityName: activityName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityList(options, function(ret) {
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
			$("#activityList").html(activityListView.activityList(data));
			$("#activityList").find('[remark]').on('click', showRemark);
			$("#activityList .activityDetail").on('click', activityDetail);
			main.activeTr('activityList');
		});
	}

	function activityDetail() {
		var activityId = parseInt($(this).attr('activityId')) || 0;
		if (isNaN(activityId) || activityId <= 0) {
			return;
		}
		if (activityId == 1) {
			common.locationUrl('#activityHongBaoList');	
		} else if (activityId == 2) {
			common.locationUrl('#activityTurnplateList');
		} else if (activityId == 3) {
			common.locationUrl('#activityChargeList');
		} else if (activityId == 4) {
			common.locationUrl('#activityHongBao2017ChunJieList');
		} else if (activityId == 5) {
			common.locationUrl('#activityConfederationsCupUserList');
		} else if (activityId == 6) {
			common.locationUrl('#activityConfederationsCupList');
		} else if (activityId == 7) {
			common.locationUrl('#activityAttachPrizeList');
		}
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
		getActivityList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<pre style="white-space:pre-wrap;line-height:25px;">'+remark+'</pre>'
		}
		ui.showWindow(options);
	}
})