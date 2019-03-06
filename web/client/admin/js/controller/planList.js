define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main =require('module/main');
	var planCgi = require('cgi/plan');
	var planListView = require('view/planList');
	var planMap = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		planMap = {};
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		planMap = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "方案列表",
			calssName: "plan_list"
		}
		main.setMain(view, options);
		main.setContent(planListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getPlanList();
	}

	function searchSubmit() {
		pageNum = 1;
		getPlanList();
	}

	function getPlanList() {
		var userName = trim($('#userName').val()) || undefined;
		var planId = parseInt($('#planId').val()) || undefined;
		var publish = parseInt($('#publish').val());
		var rich = parseInt($('#rich').val());
		var matchType = parseInt($('#matchType').val()) || 0;
		var prizeStatus = parseInt($('#prizeStatus').val());
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		if (isNaN(publish)) {
			publish = undefined;
		}
		if (isNaN(rich)) {
			rich = undefined;
		}
		if (isNaN(prizeStatus)) {
			prizeStatus = undefined;
		}
		var options = {
			userName: userName,
			planId: planId,
			publish: publish,
			prizeStatus: prizeStatus,
			rich: rich,
			matchType: matchType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		planCgi.getPlanList(options,function (ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			planMap = {};
			$.each(list, function(i, plan) {
				var planId = parseInt(plan.planId) || 0;
				if (planId > 0) {
					planMap[planId] = plan;
				}
			});
			var data = {
				list: list
			}
			$("#planList").html(planListView.planList(data));
			$("#planList [content]").on('click', showContent);
			$("#planList [resourceList]").on('click', showImage);
			$("#planList [matchList]").on('click', matchList);
			$("#planList .examine.richPlan").on('click', richPlan);
			$("#planList .examine.publishPlan").on('click', publishPlan);
			$("#planList .examine.deletePlan").on('click', deletePlan);
			main.activeTr('planList');
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
		getPlanList();
	}

	function showContent(e) {
		var content = trim($(this).attr('content')) ;
		var options = {
			html:  '<pre style="white-space:pre-wrap;line-height:25px;">' + content + '</pre>'
		}
		ui.showWindow(options);
	}

	function showImage() {
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		var imgHtml = [];
		$.each(resourceList, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('</br>')
		}
		ui.showWindow(options);
	}

	function matchList() {
		var planId = parseInt($(this).attr('planId')) || 0;
		var matchType = parseInt($(this).attr('matchType')) || 0;
		var plan = planMap[planId] || {};
		var matchList = plan.matchList || [];
		if (isNaN(planId) || planId <= 0) {
			return;
		}
		var data = {
			matchType: matchType,
			matchList: matchList
		};
		var options = {
			html: planListView.matchList(data)
		};
		ui.showWindow(options);
	}

	function publishPlan() {
		var planId = parseInt($(this).attr('planId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(planId) || planId <= 0 || isNaN(publish)) {
			return;
		}
		var publishText = publish==1?"上架":"下架";
		ui.showConfirm('是否 "' + publishText +'" 该推荐', function sure() {
			var options = {
				planId: planId,
				publish: publish
			}
			planCgi.publishPlan(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(publishText + '成功');
				ui.closeConfirm();
				getPlanList();
			});
		}, function cancel() {

		});
	}

	function richPlan() {
		var planId = parseInt($(this).attr('planId')) || 0;
		var rich = parseInt($(this).attr('rich')) || 0;
		if (isNaN(planId) || planId <= 0 || isNaN(rich)) {
			return;
		}
		var richText = rich==1?"设置豪单":"取消豪单";
		ui.showConfirm('确定' + richText , function sure() {
			var options = {
				planId: planId,
				rich: rich
			}
			planCgi.richPlan(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(richText + '成功');
				ui.closeConfirm();
				getPlanList();
			});
		}, function cancel() {

		});
	}

	function deletePlan() {
		var planId = parseInt($(this).attr('planId')) || 0;
		if (isNaN(planId) || planId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该推荐', function sure() {
			var options = {
				planId: planId
			}
			planCgi.deletePlan(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getPlanList();
			});
		}, function cancel() {

		});
	}

});