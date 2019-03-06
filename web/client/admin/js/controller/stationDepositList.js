define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var stationCgi = require('cgi/station');
	var groupCgi = require('cgi/group');
	var stationDepositListView = require('view/stationDepositList');
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
			title: "站点存款",
			className: 'group_userList',
		}
		main.setMain(view, options);
		main.setContent(stationDepositListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#searchSubmit").on('click', searchSubmit);
		$("#createStationDeposit").on('click', editStationDeposit);
	}

	function setContent() {
		getStationDepositList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStationDepositList();	
	}

	function getStationDepositList() {
		var userName = trim($('#userName').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var options = {
			userName: userName,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		stationCgi.getStationDepositList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#stationDepositList").html(stationDepositListView.stationDepositList(data));
			$("#stationDepositList .modifyStationDeposit").on('click', editStationDeposit);
			$("#stationDepositList .deleteStationDeposit").on('click', deleteStationDeposit);
			main.activeTr('stationDepositList');
		})
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
		getStationDepositList();
	}
	
	function editStationDeposit() {
		var depositId = parseInt($(this).attr('depositId')) || 0;
		var title = '';
		if (!isNaN(depositId) && depositId > 0) {
			title = '修改站长存款';
		} else {
			title = '新增站长存款';
		}
		var options = {
			html: stationDepositListView.editStationDeposit({
				title: title,
				depositId: depositId
			})
		}
		ui.showWindow(options);
		getStationList();
		$('#editDate').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#cancelEditStationDeposit").on('click', ui.closeWindow);
		$("#sureEditStationDeposit").on('click', editStationDepositSubmit);
		if (!isNaN(depositId) && depositId > 0) {
			var options = {
				depositId : depositId
			}
			stationCgi.getStationDepositInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var userId = parseInt(data.userId) || 0;
				var date = trim(data.date) || '';
				var amount = parseInt(data.amount) || 0;
				$('#editUserId').val(userId);
				$('#editDate').val(date);
				$('#editAmount').val(amount/100);
			});
		}
	}

	function editStationDepositSubmit() {
		var depositId = parseInt($('#editDepositId').val()) || 0;
		var userId = parseInt($('#editUserId').val()) || 0;
		var date = trim($('#editDate').val()) || ''
		var amount = parseInt($('#editAmount').val()) || 0;
		if (isNaN(userId) || userId <= 0) {
			ui.showNotice('请选择站长');
			return;
		}
		if (!date) {
			ui.showNotice('请选择日期');
			return;
		}
		if (isNaN(amount) || amount <= 0) {
			ui.showNotice('请填写金额');
			return;
		}
		var cgi = function() {};
		var data = {
			userId: userId,
			date: date,
			amount: amount*100
		};
		if (!isNaN(depositId) && depositId > 0) {
			data.depositId = depositId;
			cgi = stationCgi.modifyStationDeposit;
		} else {
			cgi = stationCgi.createStationDeposit;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(depositId) && depositId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getStationDepositList();
		});
	}

	function deleteStationDeposit() {
		var depositId = parseInt($(this).attr("depositId")) || 0;
		if (isNaN(depositId) || depositId <= 0) {
			return;
		}
		ui.showConfirm('是否删除', function() {
			var options = {
				depositId: depositId
			}
			stationCgi.deleteStationDeposit(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getStationDepositList();
			});
		});	
	}

	//得到出票站长列表
	function getStationList() {
		var options = {
			groupId: 8,
			pageNum: 1,
			pageSize: 20	
		}
		groupCgi.getGroupUserList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="0">未选择</option>');
			$.each(list, function(i, item) {
				var userId = parseInt(item.userId) || 0;
				var nickName = item.nickName || '';
				var realName = item.realName || '';
				var userName = nickName;
				if (realName != '') {
					userName = realName;	
				}
				if (!isNaN(userId) && userId > 0) {
					html.push('<option value="' + userId + '">' + userName + '</option>');
				}
			});
			$('#editUserId').html(html.join(''));
		}, true);
	}
})