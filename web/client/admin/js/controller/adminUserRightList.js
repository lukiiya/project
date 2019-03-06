define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserRightListView = require('view/adminUserRightList');
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
			title: "后台权限",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserRightListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUserRight").on('click', editAdminUserRight);
	}


	function setContent() {
		getAdminUserRightList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserRightList();	
	}

	function getAdminUserRightList() {
		var rightName = trim($("#rightName").val()) || null;
		var rule = trim($("#rule").val()) || null;
		var options = {
			rightName: rightName,
			rule: rule,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserRightList(options, function(ret) {
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
			$("#adminUserRightList").html(adminUserRightListView.adminUserRightList(data));
			$("#adminUserRightList .editAdminUserRight").on('click', editAdminUserRight);
			$("#adminUserRightList .deleteAdminUserRight").on('click', deleteAdminUserRight);
			main.activeTr('adminUserRightList');
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
		getAdminUserRightList();
	}

	function editAdminUserRight() {
		var rightId = parseInt($(this).attr('rightId')) || 0;
		var title = '';
		if (!isNaN(rightId) && rightId > 0) {
			title = '修改权限';
		} else {
			title = '新增权限';
		}
		var options = {
			html: adminUserRightListView.editAdminUserRight({
				title: title,
				rightId: rightId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUserRight").on('click', ui.closeWindow);
		$("#sureEditAdminUserRight").on('click', editAdminUserRightSubmit);
		if (!isNaN(rightId) && rightId > 0) {
			var options = {
				rightId : rightId
			}
			adminUserCgi.getAdminUserRightInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var rightName = data.rightName || '';
				var rule = data.rule || '';
				var remark = data.remark || '';
				$('#editRightName').val(rightName);
				$('#editRule').val(rule);
				$('#editRemark').val(remark);
			});
		}
	}

	function editAdminUserRightSubmit() {
		var rightId = parseInt($('#editRightId').val());
		var rightName = trim($('#editRightName').val());
		var rule = trim($('#editRule').val());
		var remark = trim($('#editRemark').val());
		if (!rightName) {
			ui.showNotice('权限名不能为空');
			return;
		}
		if (!rule) {
			ui.showNotice('规则不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			rightName: rightName,
			rule: rule,
			remark: remark
		};
		if (!isNaN(rightId) && rightId > 0) {
			data.rightId = rightId;
			cgi = adminUserCgi.modifyAdminUserRight;
		} else {
			cgi = adminUserCgi.createAdminUserRight;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(rightId) && rightId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserRightList();
		});
	}

	function deleteAdminUserRight() {
		var rightId = parseInt($(this).attr('rightId')) || 0;
		if (isNaN(rightId) || rightId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该权限', function sure() {
			var options = {
				rightId: rightId
			}
			adminUserCgi.deleteAdminUserRight(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserRightList();
			});
		}, function cancel() {

		});
	}
});