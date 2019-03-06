define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var financeCgi = require('cgi/finance');
	var cashConsumeUserListView = require('view/cashConsumeUserList');
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
			title: "现金消费用户列表",
			className: 'expense_record'
		} 
		main.setMain(view, options);
		main.setContent(cashConsumeUserListView.content());
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
		getUserList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getUserList();
	}

	function getUserList() {
		var userName = trim($('#userName').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if (isNaN(financeType)) {
			financeType = undefined;
		}
		var options = {
			userName: userName,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		statisticsCgi.getStatisticsCashConsumeUserList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalOrderCount = (ret.data && ret.data.totalOrderCount) || 0;
			var totalOrderAmount = (ret.data && ret.data.totalOrderAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalOrderCount: totalOrderCount,
				totalOrderAmount: totalOrderAmount,
				list: list
			}
			$("#userList").html(cashConsumeUserListView.userList(data));
			$("#userList").find("[userId]").on('click', showConsumeTime);
			main.activeTr('userList');
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
		getUserList();
	}

	function showConsumeTime(e) {
		e.preventDefault();
		e.stopPropagation();
		var userId = parseInt($(this).attr('userId')) || 0;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if (isNaN(financeType)) {
			financeType = undefined;
		}
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId: userId,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: 1,
			pageSize: 2000
		}
		financeCgi.getConsumeList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var dateMap = {};
			var html = [];
			html.push('<p style="line-height:25px;height:25px;font-weight:bold">按日明细：</p>');
			$.each(list, function(i, item) {
				var amount = (item.amount || 0)/100;
				var createTime = item.createTime || '';
				var date = trim(createTime.substr(0, 7));
				if (!(date in dateMap)) {
					dateMap[date] = 0;
				}
				dateMap[date]++;
				html.push('<p style="line-height:25px;height:25px">'+ (i+1) +'. &nbsp;'+ createTime +'&nbsp;&nbsp;'+ amount +'元</p>');
			});
			var beforeHtml = [];
			beforeHtml.push('<p style="line-height:25px;height:25px;font-weight:bold">按月统计：</p>');
			$.each(dateMap, function(date, count) {
				beforeHtml.push('<p style="line-height:25px;height:25px">'+ date +'&nbsp;=&nbsp;'+ count +'次</p>');		
			});
			html.unshift(beforeHtml.join(''));
			var options = {
				html: html.join('')
			}
			ui.showWindow(options);
		});
	}
})