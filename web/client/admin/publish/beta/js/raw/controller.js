define('controller/activityAttachPrizeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityAttachPrizeListView = require('view/activityAttachPrizeList');
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
			title: "11选5加奖百万",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityAttachPrizeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityAttachPrizeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityAttachPrizeList();
	}

	function getActivityAttachPrizeList() {
		var userName = trim($('#userName').val()) || null;
		var issue = trim($('#issue').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			issue: issue,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityAttachPrizeList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAttachPrizeAmount = (ret.data && ret.data.totalAttachPrizeAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAttachPrizeAmount: totalAttachPrizeAmount,
				list: list
			}
			$("#activityAttachPrizeList").html(activityAttachPrizeListView.activityAttachPrizeList(data));
			main.activeTr('activityAttachPrizeList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityAttachPrizeList();
	}
});
define('controller/activityChargeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityChargeListView = require('view/activityChargeList');
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
			title: "彩金充值送5%",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityChargeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityChargeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityChargeList();
	}

	function getActivityChargeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityChargeList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				totalPresentAmount: totalPresentAmount,
				list: list
			}
			$("#activityChargeList").html(activityChargeListView.activityChargeList(data));
			main.activeTr('activityChargeList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityChargeList();
	}
});
define('controller/activityConfederationsCupList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityConfederationsCupListView = require('view/activityConfederationsCupList');
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
			title: "2017联合会杯新用户送3彩金",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityConfederationsCupListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityConfederationsCupList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityConfederationsCupList();
	}

	function getActivityConfederationsCupList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityConfederationsCupList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#activityConfederationsCupList").html(activityConfederationsCupListView.activityConfederationsCupList(data));
			main.activeTr('activityConfederationsCupList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityConfederationsCupList();
	}
});
define('controller/activityConfederationsCupUserList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityConfederationsCupUserListView = require('view/activityConfederationsCupUserList');
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
			title: "2017联合会杯新用户送3彩金",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityConfederationsCupUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityConfederationsCupUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityConfederationsCupUserList();
	}

	function getActivityConfederationsCupUserList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityConfederationsCupUserList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPresentAmount: totalPresentAmount,
				list: list
			}
			$("#activityConfederationsCupUserList").html(activityConfederationsCupUserListView.activityConfederationsCupUserList(data));
			main.activeTr('activityConfederationsCupUserList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityConfederationsCupUserList();
	}
});
define('controller/activityHongBao2017ChunJieList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityHongBao2017ChunJieListView = require('view/activityHongBao2017ChunJieList');
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
			title: "2017春节红包",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityHongBao2017ChunJieListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityHongBao2017ChunJieList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityHongBao2017ChunJieList();
	}

	function getActivityHongBao2017ChunJieList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityHongBao2017ChunJieList(options,function(ret) {
			if( ret.errCode !=0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPresentAmount = (ret.data && ret.data.totalPresentAmount) || 0;
			var totalPresentTicketAmount = (ret.data && ret.data.totalPresentTicketAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPresentAmount: totalPresentAmount,
				totalPresentTicketAmount: totalPresentTicketAmount,
				list: list
			}
			$("#activityHongBao2017ChunJieList").html(activityHongBao2017ChunJieListView.activityHongBao2017ChunJieList(data));
			main.activeTr('activityHongBao2017ChunJieList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityHongBao2017ChunJieList();
	}
});
define('controller/activityHongBaoList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityHongBaoListView = require('view/activityHongBaoList');
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
			title: "100万红包",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityHongBaoListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityHongBaoList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityHongBaoList();
	}

	function getActivityHongBaoList() {
		var userName = trim($('#userName').val()) || null;
		var options = {
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityHongBaoList(options,function(ret) {
			if( ret.errCode !=0) {
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
			$("#activityHongBaoList").html(activityHongBaoListView.activityHongBaoList(data));
			main.activeTr('activityHongBaoList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityHongBaoList();
	}
});
define('controller/activityList',function(require,exports){

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
define('controller/activityTurnplateList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var activityTurnplateListView = require('view/activityTurnplateList');
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
			title: "幸运大转盘",
			className: 'activity_more'
		}
		main.setMain(view, options);
		main.setContent(activityTurnplateListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getActivityTurnplateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getActivityTurnplateList();
	}

	function getActivityTurnplateList() {
		var userName = trim($('#userName').val()) || null;
		var prizeName = trim($('#prizeName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var options = {
			userName: userName,
			prizeName: prizeName,
			orderId: orderId,
			pageNum: pageNum,
			pageSize: pageSize
		}
		activityCgi.getActivityTurnplateList(options,function(ret) {
			if( ret.errCode !=0) {
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
			$("#activityTurnplateList").html(activityTurnplateListView.activityTurnplateList(data));
			main.activeTr('activityTurnplateList');
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

	function pageCodeFun(e) {
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getActivityTurnplateList();
	}
});
define('controller/adminUserList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserListView = require('view/adminUserList');
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
			title: "后台用户",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUser").on('click', editAdminUser);
	}


	function setContent() {
		getAdminUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserList();	
	}

	function getAdminUserList() {
		var userName = trim($("#userName").val()) || null;
		var loginName = trim($("#loginName").val()) || null;
		var admin = parseInt($('#admin').val());
		if (isNaN(admin)) {
			admin = undefined;
		}
		var options = {
			userName: userName,
			loginName: loginName,
			admin: admin,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserList(options, function(ret) {
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
			$("#adminUserList").html(adminUserListView.adminUserList(data));
			$("#adminUserList .setAdminUserRole").on('click', setAdminUserRole);
			$("#adminUserList .editAdminUser").on('click', editAdminUser);
			$("#adminUserList .deleteAdminUser").on('click', deleteAdminUser);
			main.activeTr('adminUserList');
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
		getAdminUserList();
	}

	function getAdminUserInfo(userId, callback) {
		var userId = parseInt(userId) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		callback = callback || function() {};
		var options = {
			userId : userId
		}
		adminUserCgi.getAdminUserInfo(options, callback);
	}

	function editAdminUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var title = '';
		if (!isNaN(userId) && userId > 0) {
			title = '修改用户';
		} else {
			title = '新增用户';
		}
		var options = {
			html: adminUserListView.editAdminUser({
				title: title,
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUser").on('click', ui.closeWindow);
		$("#sureEditAdminUser").on('click', editAdminUserSubmit);
		getAdminUserInfo(userId, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userName = data.userName || '';
			var loginName = data.loginName || '';
			var admin = data.admin || 0;
			var remark = data.remark || '';
			$('#editUserName').val(userName);
			$('#editLoginName').val(loginName);
			$('#editPassword').val('**********');
			$('#editAdmin').val(admin);
			$('#editRemark').val(remark);
		});
	}

	function editAdminUserSubmit() {
		var userId = parseInt($('#editUserId').val());
		var userName = trim($('#editUserName').val());
		var loginName = trim($('#editLoginName').val());
		var password = trim($('#editPassword').val());
		var admin = parseInt($('#editAdmin').val());
		var remark = trim($('#editRemark').val());
		if (!userName) {
			ui.showNotice('用户名不能为空');
			return;
		}
		if (!loginName) {
			ui.showNotice('登录名不能为空');
			return;
		}
		if (!password) {
			ui.showNotice('密码不能为空');
			return;
		}
		if (isNaN(admin)) {
			return;
		}
		var cgi = function() {};
		var data = {
			userName: userName,
			loginName: loginName,
			password: password,
			admin: admin,
			remark: remark
		};
		if (!isNaN(userId) && userId > 0) {
			data.userId = userId;
			cgi = adminUserCgi.modifyAdminUser;
		} else {
			cgi = adminUserCgi.createAdminUser;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(userId) && userId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserList();
		});
	}

	function deleteAdminUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该用户', function sure() {
			var options = {
				userId: userId
			}
			adminUserCgi.deleteAdminUser(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserList();
			});
		}, function cancel() {

		});
	}


	//分配角色
	function setAdminUserRole() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: adminUserListView.setAdminUserRole({
				userId: userId
			})
		}
		ui.showWindow(options);
		getReferAdminUserList();
		$('#referUser').val(userId);
		$('#checkAllRole').off().on('click', checkAllRole);
		$('#showRoleDetail').off().on('click', showRoleDetail);
		$("#cancelSetAdminUserRole").on('click', ui.closeWindow);
		$("#sureSetAdminUserRole").on('click', setAdminUserRoleSubmit);
		getAdminUserRoleList();
		$('#referUser').trigger('change');
	}

	function setAdminUserRoleSubmit() {
		var userId = parseInt($('#setUserId').val()) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var roleId = [];
		var roleArr = $('#adminUserRoleList .roleId');
		$.each(roleArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				roleId.push(id);	
			}
		});
		var options = {
			userId: userId,
			roleId: roleId
		}
		adminUserCgi.modifyAdminUserRoleId(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("分配成功");
			ui.closeWindow();
			getAdminUserList();
		});
	}

	function checkAllRole(e) {
		var checked = !!this.checked;
		$('#adminUserRoleList .roleId').attr('checked', checked);
	}

	function checkRole(e) {
		var checked = true;
		var roleArr = $('#adminUserRoleList .roleId');
		$.each(roleArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllRole').attr('checked', checked);
	}

	function showRoleDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserRoleList .remark').css('display', display);
	}

	function referUserChange(e) {
		var userId = parseInt($(this).val()) || 0;
		setAdminUserInfo(userId);
	}

	function getReferAdminUserList() {
		var options = {
			admin: 0,
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var userId = parseInt(item.userId) || 0;
				var userName = item.userName || '';
				if (!isNaN(userId) && userId > 0) {
					html.push('<option value="' + userId + '">' + userName + '</option>');
				}
			});
			$('#referUser').html(html.join(''));
			$('#referUser').off().on('change', referUserChange);
		}, true);
	}

	function getAdminUserRoleList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#adminUserRoleList").html(adminUserListView.adminUserRoleList(data));
			$('#adminUserRoleList .roleId').off().on('click', checkRole);
		}, true);
	}

	function setAdminUserInfo(userId) {
		var setUserId = parseInt($('#setUserId').val()) || 0;
		var userId = parseInt(userId) || 0;
		if (isNaN(setUserId) || setUserId <= 0 || isNaN(userId) || userId <= 0) {
			return;
		}
		getAdminUserInfo(userId, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userName = data.userName || '';
			var roleId = data.roleId || '';
			if (setUserId == userId) {
				$('#setTilte').html('设置“' + userName + '”角色');
			}
			$('#adminUserRoleList .roleId').attr('checked', false);
			roleId = roleId.split(',') || [];
			$.each(roleId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#roleId'+id).attr('checked', true);
				}
			});
			checkRole();
		});
	}
});
define('controller/adminUserMenuList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserMenuListView = require('view/adminUserMenuList');
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
			title: "后台菜单",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserMenuListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUserMenu").on('click', editAdminUserMenu);
	}


	function setContent() {
		getAdminUserMenuList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserMenuList();	
	}

	function getAdminUserMenuList() {
		var menuName = trim($("#menuName").val()) || null;
		var parentMenuName = trim($("#parentMenuName").val()) || null;
		var path = trim($("#path").val()) || null;
		var options = {
			menuName: menuName,
			parentMenuName: parentMenuName,
			path: path,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserMenuList(options, function(ret) {
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
			$("#adminUserMenuList").html(adminUserMenuListView.adminUserMenuList(data));
			$("#adminUserMenuList .editAdminUserMenu").on('click', editAdminUserMenu);
			$("#adminUserMenuList .deleteAdminUserMenu").on('click', deleteAdminUserMenu);
			main.activeTr('adminUserMenuList');
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
		getAdminUserMenuList();
	}

	function editAdminUserMenu() {
		var menuId = parseInt($(this).attr('menuId')) || 0;
		var title = '';
		if (!isNaN(menuId) && menuId > 0) {
			title = '修改菜单';
		} else {
			title = '新增菜单';
		}
		var options = {
			html: adminUserMenuListView.editAdminUserMenu({
				title: title,
				menuId: menuId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUserMenu").on('click', ui.closeWindow);
		$("#sureEditAdminUserMenu").on('click', editAdminUserMenuSubmit);
		if (!isNaN(menuId) && menuId > 0) {
			var options = {
				menuId : menuId
			}
			adminUserCgi.getAdminUserMenuInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var menuName = data.menuName || '';
				var parentMenuName = data.parentMenuName || '';
				var path = data.path || '';
				var remark = data.remark || '';
				$('#editMenuName').val(menuName);
				$('#editParentMenuName').val(parentMenuName);
				$('#editPath').val(path);
				$('#editRemark').val(remark);
			});
		}
	}

	function editAdminUserMenuSubmit() {
		var menuId = parseInt($('#editMenuId').val());
		var menuName = trim($('#editMenuName').val());
		var parentMenuName = trim($('#editParentMenuName').val());
		var path = trim($('#editPath').val());
		var remark = trim($('#editRemark').val());
		if (!menuName) {
			ui.showNotice('菜单名不能为空');
			return;
		}
		if (!parentMenuName) {
			ui.showNotice('父菜单名不能为空');
			return;
		}
		if (!path) {
			ui.showNotice('路径不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			menuName: menuName,
			parentMenuName: parentMenuName,
			path: path,
			remark: remark
		};
		if (!isNaN(menuId) && menuId > 0) {
			data.menuId = menuId;
			cgi = adminUserCgi.modifyAdminUserMenu;
		} else {
			cgi = adminUserCgi.createAdminUserMenu;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(menuId) && menuId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserMenuList();
		});
	}

	function deleteAdminUserMenu() {
		var menuId = parseInt($(this).attr('menuId')) || 0;
		if (isNaN(menuId) || menuId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该菜单', function sure() {
			var options = {
				menuId: menuId
			}
			adminUserCgi.deleteAdminUserMenu(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserMenuList();
			});
		}, function cancel() {

		});
	}
});
define('controller/adminUserRightList',function(require,exports) {

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
define('controller/adminUserRoleList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var adminUserRoleListView = require('view/adminUserRoleList');
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
			title: "后台角色",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(adminUserRoleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createAdminUserRole").on('click', editAdminUserRole);
	}


	function setContent() {
		getAdminUserRoleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getAdminUserRoleList();	
	}

	function getAdminUserRoleList() {
		var roleName = trim($("#roleName").val()) || null;
		var options = {
			roleName: roleName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
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
			$("#adminUserRoleList").html(adminUserRoleListView.adminUserRoleList(data));
			$("#adminUserRoleList .setAdminUserRoleFun").on('click', setAdminUserRoleFun);
			$("#adminUserRoleList .editAdminUserRole").on('click', editAdminUserRole);
			$("#adminUserRoleList .deleteAdminUserRole").on('click', deleteAdminUserRole);
			main.activeTr('adminUserRoleList');
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
		getAdminUserRoleList();
	}

	function editAdminUserRole() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		var title = '';
		if (!isNaN(roleId) && roleId > 0) {
			title = '修改角色';
		} else {
			title = '新增角色';
		}
		var options = {
			html: adminUserRoleListView.editAdminUserRole({
				title: title,
				roleId: roleId
			})
		}
		ui.showWindow(options);
		$("#cancelEditAdminUserRole").on('click', ui.closeWindow);
		$("#sureEditAdminUserRole").on('click', editAdminUserRoleSubmit);
		if (!isNaN(roleId) && roleId > 0) {
			var options = {
				roleId : roleId
			}
			adminUserCgi.getAdminUserRoleInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var roleName = data.roleName || '';
				var remark = data.remark || '';
				$('#editRoleName').val(roleName);
				$('#editRemark').val(remark);
			});
		}
	}

	function editAdminUserRoleSubmit() {
		var roleId = parseInt($('#editRoleId').val());
		var roleName = trim($('#editRoleName').val());
		var remark = trim($('#editRemark').val());
		if (!roleName) {
			ui.showNotice('角色名不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			roleName: roleName,
			remark: remark
		};
		if (!isNaN(roleId) && roleId > 0) {
			data.roleId = roleId;
			cgi = adminUserCgi.modifyAdminUserRole;
		} else {
			cgi = adminUserCgi.createAdminUserRole;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(roleId) && roleId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getAdminUserRoleList();
		});
	}

	function deleteAdminUserRole() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该角色', function sure() {
			var options = {
				roleId: roleId
			}
			adminUserCgi.deleteAdminUserRole(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getAdminUserRoleList();
			});
		}, function cancel() {

		});
	}

	//分配功能
	function setAdminUserRoleFun() {
		var roleId = parseInt($(this).attr('roleId')) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		var options = {
			html: adminUserRoleListView.setAdminUserRoleFun({
				roleId: roleId
			})
		}
		ui.showWindow(options);
		getReferAdminUserRoleList();
		$('#referRole').val(roleId);
		$('#checkAllMenu').off().on('click', checkAllMenu);
		$('#checkAllRight').off().on('click', checkAllRight);
		$('#showMenuDetail').off().on('click', showMenuDetail);
		$('#showRightDetail').off().on('click', showRightDetail);
		$("#cancelSetAdminUserRoleFun").on('click', ui.closeWindow);
		$("#sureSetAdminUserRoleFun").on('click', setAdminUserRoleFunSubmit);
		getAdminUserMenuList();
		getAdminUserRightList();
		$('#referRole').trigger('change');
	}

	function setAdminUserRoleFunSubmit() {
		var roleId = parseInt($('#setRoleId').val()) || 0;
		if (isNaN(roleId) || roleId <= 0) {
			return;
		}
		var menuId = [];
		var menuArr = $('#adminUserMenuList .menuId');
		$.each(menuArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				menuId.push(id);	
			}
		});
		var rightId = [];
		var rightArr = $('#adminUserRightList .rightId');
		$.each(rightArr, function(i, item) {
			var id = parseInt(item.value) || 0;
			if (item.checked && !isNaN(id) && id > 0) {
				rightId.push(id);	
			}
		});
		var options = {
			roleId: roleId,
			menuId: menuId,
			rightId: rightId
		}
		adminUserCgi.modifyAdminUserRoleRightIdAndMenuId(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("分配成功");
			ui.closeWindow();
			getAdminUserRoleList();
		});
	}

	function checkAllRight(e) {
		var checked = !!this.checked;
		$('#adminUserRightList .rightId').attr('checked', checked);
	}

	function checkRight(e) {
		var checked = true;
		var rightArr = $('#adminUserRightList .rightId');
		$.each(rightArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllRight').attr('checked', checked);
	}

	function showRightDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserRightList .remark').css('display', display);
	}

	function checkAllMenu(e) {
		var checked = !!this.checked;
		$('#adminUserMenuList .menuId').attr('checked', checked);
	}

	function checkMenu(e) {
		var toggleParentMenu = function() {
			//子菜单，联动父菜单input
			var checked = true;
			var menuArr = this.find('.menuId');
			$.each(menuArr, function(i, item) {
				var menuId = parseInt(item.value) || 0;
				if (!isNaN(menuId) && menuId > 0 && !item.checked) {
					checked = false;
					return false;
				}	
			});
			this.find('.menuId[value=0]').attr('checked', checked);
		}
		if (this.nodeType == 1) {//dom单击执行
			var menuId = parseInt(this.value) || 0;
			var menuBox = $(this).parents('.menuBox');
			if (menuId <= 0) {
				//父菜单单击
				menuBox.find('.menuId').attr('checked', !!this.checked);
			} else {
				//子菜单单击，联动父菜单input
				toggleParentMenu.call(menuBox);
			}
		} else {//直接执行函数
			var menuBox = $('#adminUserMenuList .menuBox');
			$.each(menuBox, function(i, item) {
				toggleParentMenu.call($(this));
			});
		}
		//联动全选input
		var checked = true;
		var menuArr = $('#adminUserMenuList .menuId');
		$.each(menuArr, function(i, item) {
			if (!item.checked) {
				checked = false;
				return false;
			}	
		});
		$('#checkAllMenu').attr('checked', checked);
	}

	function showMenuDetail(e) {
		var display = this.checked ? 'inline-block' : 'none';
		$('#adminUserMenuList .remark').css('display', display);
	}


	function referRoleChange(e) {
		var roleId = parseInt($(this).val()) || 0;
		setAdminUserRoleInfo(roleId);
	}

	function getReferAdminUserRoleList() {
		var options = {
			admin: 0,
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRoleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var roleId = parseInt(item.roleId) || 0;
				var roleName = item.roleName || '';
				if (!isNaN(roleId) && roleId > 0) {
					html.push('<option value="' + roleId + '">' + roleName + '</option>');
				}
			});
			$('#referRole').html(html.join(''));
			$('#referRole').off().on('change', referRoleChange);
		}, true);
	}

	function getAdminUserMenuList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserMenuList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var menuMap = {};
			$.each(list, function(i, item) {
				var parentMenuName = trim(item.parentMenuName) || '';
				if (!parentMenuName) {
					return;
				}
				if (!(parentMenuName in menuMap)) {
					menuMap[parentMenuName] = [];	
				}
				menuMap[parentMenuName].push(item);
			});
			var data = {
				menuMap: menuMap
			};
			$("#adminUserMenuList").html(adminUserRoleListView.adminUserMenuList(data));
			$('#adminUserMenuList .menuId').off().on('click', checkMenu);
		}, true);
	}

	function getAdminUserRightList() {
		var options = {
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserRightList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#adminUserRightList").html(adminUserRoleListView.adminUserRightList(data));
			$('#adminUserRightList .rightId').off().on('click', checkRight);
		}, true);
	}

	function setAdminUserRoleInfo(roleId) {
		var setRoleId = parseInt($('#setRoleId').val()) || 0;
		var roleId = parseInt(roleId) || 0;
		if (isNaN(setRoleId) || setRoleId <= 0 || isNaN(roleId) || roleId <= 0) {
			return;
		}
		var options = {
			roleId : roleId
		}
		adminUserCgi.getAdminUserRoleInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var roleName = data.roleName || '';
			var menuId = data.menuId || '';
			var rightId = data.rightId || '';
			menuId = menuId.split(',') || [];
			rightId = rightId.split(',') || [];
			if (setRoleId == roleId) {
				$('#setTilte').html('设置“' + roleName + '”功能');
			}
			//选中菜单
			$('#adminUserMenuList .menuId').attr('checked', false);
			$.each(menuId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#menuId'+id).attr('checked', true);
				}
			});
			checkMenu();
			//选中权限
			$('#adminUserRightList .rightId').attr('checked', false);
			$.each(rightId, function(i, id) {
				id = parseInt(id) || 0;
				if (!isNaN(id) && id > 0) {
					$('#rightId'+id).attr('checked', true);
				}
			});
			checkRight();
		});
	}
});
define('controller/articleList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var articleCgi = require('cgi/article');
	var articleListView = require('view/articleList');
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
			title : "资讯列表",
			className :  'article'
		}
		main.setMain(view, options);
		main.setContent(articleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createArticle").on('click', editArticle);
	}

	function setContent() {
		getArticleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getArticleList();
	}

	function getArticleList() {
		var articleTitle = trim($("#articleTitle").val()) || null;
		var options = {
			articleTitle: articleTitle,
			pageNum: pageNum,
			pageSize: pageSize
		}
		articleCgi.getArticleList(options, function(ret) {
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
			$("#articleList").html(articleListView.articleList(data));
			$("#articleList .deleteArticle").on('click', deleteArticle);
			$("#articleList .updateArticle").on('click', editArticle);
			$("#articleList .modifySort").on('click', modifySort);
			var top = $("#articleList tr:first-child .modifyUp");
			var bottom = $("#articleList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('articleList');
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
		getArticleList();
	}

	function editArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		var options = {
			html: articleListView.editArticle({
				articleId: articleId
			})
		}
		ui.showWindow(options);
		$("#cancelEditArticle").on('click', function() {
			ui.closeWindow();
		});
		$("#sureEditArticle").on('click', function() {
			var articleId = parseInt($('#articleId').val()) || 0;
			var articleLink = trim($('#articleLink').val()) || '';
			if (articleLink == '') {
				ui.showNotice('文章地址不能为空');
				return;
			}
			var options = {
				articleLink: articleLink
			} 
			var tip = '';
			var cgi = function() {};
			if(!isNaN(articleId) && articleId > 0) {
				tip = '更新';
				options.articleId = articleId;
				cgi = 'modifyArticle';
			} else {
				tip = '添加';
				cgi = 'createArticle';
			}
			articleCgi[cgi](options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(tip + "成功");
				ui.closeWindow();
				getArticleList();
			});
		});
	}

	function deleteArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		if (isNaN(articleId) || articleId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该文章', function sure() {
			var options = {
				articleId: articleId
			}
			articleCgi.deleteArticle(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getArticleList();
			});
		}, function cancel() {

		});
	}

	function modifySort() {
		var articleIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisArticleId = parseInt($(this).attr('articleId')) || 0;
		var prevArticleId = parseInt($(this).parent().parent().prev().attr('articleId')) || 0;
		var nextArticleId = parseInt($(this).parent().parent().next().attr('articleId')) || 0;
		if (isNaN(thisArticleId) || isNaN(prevArticleId) || isNaN(nextArticleId) || thisArticleId <= 0) {
			return;
		}
		if (type == 1) {
			articleIdArr.push(prevArticleId, thisArticleId);
		} else if (type == 2) {
			articleIdArr.push(thisArticleId, nextArticleId);
		};
		var data = {
			articleId: articleIdArr
		};
		articleCgi.modifyArticleSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getArticleList();
		});
	}
})
define('controller/bannerList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var bannerCgi = require('cgi/banner');
	var bannerListView = require('view/bannerList');
	var pageNum = null;
	var pageSize = null;
	var uploadFile = null;

	function init(view) {
		pageNum = 1;
		pageSize = 50;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		uploadFile = null;
	}

	function setMain(view) {
		var options = {
			title: "banner列表",
			className: 'order-list',
		}
		main.setMain(view, options);
		main.setContent(bannerListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createBanner").on('click', editBanner);
	}


	function setContent() {
		getBannerList();
	}

	function searchSubmit() {
		pageNum = 1;
		getBannerList();	
	}

	function getBannerList() {
		var type = parseInt($('#type').val());
		var publish = parseInt($('#publish').val());
		if (isNaN(type)) {
			type = undefined;
		}
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			type: type,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		bannerCgi.getBannerList(options, function(ret) {
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
			$("#bannerList").html(bannerListView.bannerList(data));
			$("#bannerList .editBanner").on('click', editBanner);
			$("#bannerList .deleteBanner").on('click', deleteBanner);
			$("#bannerList .modifySort").on('click', modifySort);
			$("#bannerList .publishBanner").on('click', publishBanner);
			var top = $("#bannerList tr:first-child .modifyUp");
			var bottom = $("#bannerList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('bannerList');
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
		getBannerList();
	}

	function editBanner() {
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		var title = '';
		if (!isNaN(bannerId) && bannerId > 0) {
			title = '修改banner';
		} else {
			title = '新增banner';
		}
		var options = {
			title: title,
			bannerId: bannerId
		}
		showEditBanner(options);
		if (!isNaN(bannerId) && bannerId > 0) {
			var options = {
				bannerId : bannerId
			}
			bannerCgi.getBannerInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var link = trim(data.link);
				var src = trim(data.resourceList[0]);
				var type = parseInt(data.type) || 0;
				$('#editLink').val(link);
				$('#editType').val(type);
				$("#previewImg").html('<img class="pre_img" src="'+ src +'" alt="" />');
			});
		}
	}

	function showEditBanner(options) {
		options = options || {};
		closeEditBanner();
		$("body").append(bannerListView.editBanner(options));
		$("#closeEditBanner").on('click', closeEditBanner);
		$("#cancelEditBanner").on('click', closeEditBanner);
		$("#fileSelect").on('change', fileChange);
		$("#sureEditBanner").on('click', editBannerSubmit);
	}
	
	function closeEditBanner(){
		$("#editBannerBox").remove();
		uploadFile = null;
	}
	
	function fileChange(e) {
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			var fileName = trim(file.name);
			var index = fileName.lastIndexOf(".");
			if(index != -1) {
				var extName = fileName.substr(index + 1).toLowerCase();
				if(exts[extName]) {
					uploadFile = file;
					return false;
				}
			}
		});
		if (!uploadFile) {
			return;
		}	
		var readerOnload = function(e) {
			$('#previewImg').html('<img class="pre_img" src="'+ e.target.result +'" alt="" />');
		}
		var reader = new FileReader();
		reader.onload = readerOnload;
		reader.readAsDataURL(uploadFile);
	}
	
	function editBannerSubmit() {
		var bannerId = parseInt($("#editBannerId").val());
		var link = trim($('#editLink').val());
		var type = parseInt($("#editType").val());
		if ((isNaN(bannerId) || bannerId <= 0) && !uploadFile) {
			ui.showNotice('请选择图片');
			return;	
		}
		if (!link) {
			ui.showNotice('请输入链接');
			return;
		};
		if (isNaN(type) || type < 0) {
			ui.showNotice('请选择类型');
			return;
		};
		var submitFun = function(options) {
			ui.closeLoading();
			var cgi = function() {};
			if (!isNaN(bannerId) && bannerId > 0) {
				options.bannerId = bannerId;
				cgi = bannerCgi.modifyBanner;
			} else {
				cgi = bannerCgi.createBanner;
			}
			cgi(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				if (!isNaN(bannerId) && bannerId > 0) {
					ui.showNotice("修改成功");	
				} else {
					ui.showNotice("新增成功");	
				}
				closeEditBanner();
				$('#type').val(type);
				getBannerList();
			});
		}
		var data = {
			type: type,
			link: link,
			file: uploadFile
		};
		submitFun(data);
	}

	function deleteBanner() {
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		if (isNaN(bannerId) || bannerId <= 0) {
			return
		}
		ui.showConfirm('是否 "删除" 该banner', function() {
			var data = {
				bannerId: bannerId
			};
			bannerCgi.deleteBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice("删除成功");
				ui.closeConfirm();
				getBannerList();
			});
		});
	}
	
	function publishBanner() { 
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(bannerId) || bannerId <= 0 || isNaN(publish) || publish < 0) {
			return
		}
		var title = publish == 1 ? '上架' : '下架';
		ui.showConfirm('是否 "' + title + '" 该banner', function() {
			var data = {
				bannerId: bannerId,
				publish: publish
			}
			bannerCgi.publishBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(title + "成功");
				ui.closeConfirm();
				getBannerList();
			});
		});	
	}

	function modifySort() {
		var bannerIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisBannerId = parseInt($(this).attr('bannerId')) || 0;
		var prevBannerId = parseInt($(this).parent().parent().prev().attr('bannerId')) || 0;
		var nextBannerId = parseInt($(this).parent().parent().next().attr('bannerId')) || 0;
		if (isNaN(thisBannerId) || isNaN(prevBannerId) || isNaN(nextBannerId) || thisBannerId <= 0) {
			return;
		}
		if (type == 1) {
			bannerIdArr.push(prevBannerId, thisBannerId);
		} else if (type == 2) {
			bannerIdArr.push(thisBannerId, nextBannerId);
		};
		var data = {
			bannerId: bannerIdArr
		};
		bannerCgi.modifyBannerSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getBannerList();
		});
	}
});
define('controller/cashConsumeUserList',function(require,exports){

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
define('controller/editJxzp',function(require, exports) {
	
	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var matchCgi = require('cgi/match');
	var editJxzpView = require('view/editJxzp');
	var jxzpId = null;

	function init(view) {
		jxzpId = parseInt(common.getUrlParam("jxzpId")) || 0;
		setMain(view);
		setContent();
	}

	function _init(view) {
		jxzpId = null;
	}

	function setMain(view) {
		var options = {
			title: "新增极限数据",
			className: 'newData'
		}
		main.setMain(view, options);
		main.setContent(editJxzpView.content());
		$("#type").on('change', function(e) {
			var value = parseInt(this.value) || 0;
			var html = [];
			html.push('<option value="0">请选择</option>');
			if (value == 1) {
				html.push('<option value="1">连胜</option>');
				html.push('<option value="2">连平</option>');
				html.push('<option value="3">连负</option>');
			} else if (value == 2) {
				html.push('<option value="1">连赢盘</option>');
				html.push('<option value="2">连输盘</option>');
			} else if (value == 3) {
				html.push('<option value="1">大球</option>');
				html.push('<option value="2">小球</option>');
			}
			$('#status').html(html.join(""));
		});
		$('#matchList').on('click', getMatchList);
		$('#editSubmit').on('click', editSubmit);
	}


	function setContent() {
		getJxzpInfo();
	}

	function getJxzpInfo() {
		if (isNaN(jxzpId) || jxzpId <= 0) {
			$('#title').html('新增极限数据');
			return;
		}
		$('#title').html('修改极限数据');
		var options = {
			jxzpId: jxzpId
		}
		jxzpCgi.getJxzpInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var jxzpId = parseInt(data.jxzpId) || 0;
			var type = parseInt(data.type) || 0;
			var teamName = trim(data.teamName);
			var status = parseInt(data.status) || 0;
			var recentContinue = parseInt(data.recentContinue) || 0;
			var historyContinue = parseInt(data.historyContinue) || 0;
			var recentContinue = parseInt(data.recentContinue) || 0;
			var oddsId = parseInt(data.oddsId);
			var bettypeContent = trim(data.bettypeContent);
			var bettypeOdds = trim(data.bettypeOdds);
			var concede = parseInt(data.concede);
			var recommend = trim(data.recommend) || '';
			$('#jxzpId').val(jxzpId);
			$('#type').val(type).trigger('change');
			$('#teamName').val(teamName);
			$('#status').val(status);
			$('#recentContinue').val(recentContinue);
			$('#historyContinue').val(historyContinue);
			data.bettype = {};
			data.bettype[bettypeContent] = {
				oddsId: oddsId,
				bettypeOdds: bettypeOdds,
				bettypeOddsJson: JSON.parse(bettypeOdds),
				concede: concede,
				recommend: recommend.split(',')
			}
			$("#matchList").html(editJxzpView.selectMatch({
				match: data || null
			}));
		});
	}

	function getMatchList() {
		var type = parseInt($('#type').val()) || 0;
		if (isNaN(type) || type <= 0) {
			ui.showNotice("请选择玩法");
			return;
		}
		var options = {
			needSale: true
		}
		matchCgi.getMatchList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var matchMap = {};
			$.each(list, function(i, item) {
				var saleTime = trim(item.saleTime);
				var matchId = parseInt(item.matchId);
				var oddsId = parseInt(item.oddsId);
				var number = trim(item.number);
				var league = trim(item.league);
				var home = trim(item.home);
				var away = trim(item.away);
				var beginTime = trim(item.beginTime);
				var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
				var bDate = common.formatDate(beginTimeOb, 'MM-DD');
				var bTime = common.formatDate(beginTimeOb, 'HH:II');
				var bettypeContent = trim(item.bettypeContent);
				item.concede = item.concede > 0 ? '+'+item.concede : item.concede;
				item.bettypeOddsJson = JSON.parse(item.bettypeOdds);
				if (saleTime == "" || matchId <= 0) {
					return;
				}
				saleTime = common.formatDate(new Date(saleTime.replace(/-/g, '/')), 'YYYY-MM-DD（周W）');
				if (!matchMap[saleTime]) {
					matchMap[saleTime] = {};
				}
				if (!matchMap[saleTime][matchId]) {
					matchMap[saleTime][matchId] = {
						number: number,
						league: league,
						home: home,
						away: away,
						beginTime: beginTime,
						bDate: bDate,
						bTime: bTime,
						bettype: {}
					}
				}
				matchMap[saleTime][matchId]['bettype'][bettypeContent] = item
			});
			var data = {
				type: type,
				Object: Object,
				matchMap: matchMap
			}
			var options = {
				html: editJxzpView.matchList(data)
			}
			ui.showWindow(options);
			var matchContentTr = $("#windowBox .matchContentTr");
			var matchContentTrTd = matchContentTr.find("td");
			matchContentTrTd.on('click', function(e) {
				var curMatchContentTr = this.parentNode;
				matchContentTr.each(function(i, item) {
					if (curMatchContentTr != item) {
						$(item).find("td").removeClass("active");
					}
				});
				$(this).toggleClass("active");
			});
			//总进球选择
			var matchBettype = $('#windowBox .matchBettype');
			var matchBettypeTd = matchBettype.find("td[recommend]");
			matchBettypeTd.on('click', function(e) {
				var className = trim(this.className);
				var curMatchBettype = $(this).parents('.matchBettype')[0];
				var activeTd = $(curMatchBettype).find("td.active");
				if (className.indexOf('active') == -1  && activeTd.length >= 3) {
					ui.showNotice('同种玩法最多选择三个');	
					return;
				}
				matchBettype.each(function(i, item) {
					if (curMatchBettype != item) {
						$(item).find("td").removeClass("active");
					}
				});
				$(this).toggleClass("active");
			});
			var matchDate = $("#windowBox .matchDate");
			var matchContent = $("#windowBox .matchContent");
			matchDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				matchDate.find('.arrow').attr('class', 'arrow arrow_down');
				matchContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$('#matchListCancel').on('click', ui.closeWindow);
			$('#matchListSure').on('click', matchListSure);
		});
	}

	function matchListSure() {
		var matchableJq = $("#windowBox td.active").parents("table");
		var matchList = [];
		matchableJq.each(function(i, item) {
			var matchId = parseInt($(item).attr("matchId"));
			var league = trim($(item).attr("league"));
			var home = trim($(item).attr("home"));
			var away = trim($(item).attr("away"));
			var beginTime = trim($(item).attr("beginTime"));
			var beginTimeOb = new Date(beginTime.replace(/-/g, '/'));
			if (matchId <= 0) {
				return;
			}
			var match = {
				matchId: matchId,
				league: league,
				home: home,
				away: away,
				beginTime: beginTime,
				bettype: {}
			}
			var tdJq = $(item).find("td.active");
			tdJq.each(function(i, item) {
				var oddsId = parseInt($(item.parentNode).attr("oddsId"));
				var bettypeContent = trim($(item.parentNode).attr("bettypeContent"));
				var bettypeOdds = trim($(item.parentNode).attr("bettypeOdds"));
				var concede = parseInt($(item.parentNode).attr("concede"));
				var recommend = trim($(item).attr("recommend"));
				if (oddsId <= 0 || !bettypeContent || !bettypeOdds || !recommend) {
					return;
				}
				if (!match['bettype'][bettypeContent]) {
					match['bettype'][bettypeContent] = {
						oddsId: oddsId,
						bettypeOdds: bettypeOdds,
						bettypeOddsJson: JSON.parse(bettypeOdds),
						concede: concede,
						recommend: [],
						bettypeContent: bettypeContent
					};	
				}
				match['bettype'][bettypeContent].recommend.push(recommend);
			});
			matchList.push(match);
		});
		if (matchList.length <= 0) {
			ui.showNotice("请选择一场比赛");
			return;	
		}
		var match = matchList[0] || null;
		var data = {
			match: match
		}
		if (match) {
			var home = trim(match.home);
			var away = trim(match.away);
			$('#teamName').val(home + ' ' + away);
		}
		$("#matchList").html(editJxzpView.selectMatch(data));
		ui.closeWindow();
	}

	function editSubmit() {
		var jxzpId = parseInt($('#jxzpId').val()) || 0;
		var type = parseInt($('#type').val()) || 0;
		var teamName = trim($("#teamName").val()) || '';
		var matchId = parseInt($('#matchId').val()) || 0;
		var oddsId = parseInt($('#oddsId').val()) || 0;
		var recommend = trim($("#recommend").val()) || '';
		var status = parseInt($('#status').val()) || 0;
		var recentContinue = parseInt($('#recentContinue').val()) || 0;
		var historyContinue = parseInt($('#historyContinue').val()) || 0;
		if (type <= 0) {
			ui.showNotice("请选择玩法");
			return;
		}
		if (!teamName) {
			ui.showNotice("请填写队名");
			return;
		}
		if (matchId <= 0 || oddsId <= 0 || !recommend) {
			ui.showNotice("请选择赛事");
			return;
		}
		if (status <= 0) {
			ui.showNotice("请选择近期状态");
			return;
		}
		if (recentContinue <= 0) {
			ui.showNotice("请填写正确的近期场数");
			return;
		}
		if (historyContinue <= 0) {
			ui.showNotice("请填写正确的历史场数");
			return;
		}
		var cgi = function() {};
		var data = {
			type: type,
			teamName: teamName,
			matchId: matchId,
			oddsId: oddsId,
			recommend: recommend,
			status: status,
			recentContinue: recentContinue,
			historyContinue: historyContinue
		};
		if (jxzpId > 0) {
			data.jxzpId = jxzpId;
			cgi = jxzpCgi.modifyJxzp;
		} else {
			cgi = jxzpCgi.createJxzp;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (jxzpId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			setTimeout(function() {
				common.locationUrl('#jxzpList');
			}, 1000);
		});
	}
});
define('controller/expertList',function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var groupCgi = require('cgi/group');
	var expertListView = require('view/expertList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(expertListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGroupList();
		getExpertList();
	}

	function searchSubmit() {
		pageNum = 1;
		getExpertList();	
	}

	function getGroupList() {
		var options = {
			type: 1,
			publish: 1,
			pageNum: 1,
			pageSize: 20,
		}
		groupCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="0">全部</option>');
			$.each(list, function(i, item) {
				var groupId = parseInt(item.groupId);
				var name = trim(item.name);
				if (isNaN(groupId) || groupId <= 0 || !name) {
					return;
				}
				html.push('<option value="' + groupId + '">' + name +  '</option>');	
			});
			$('#groupId').html(html.join(''));
		});
	}


	function getExpertList() {
		var groupId = parseInt($('#groupId').val()) || 0;
		var userName = trim($('#userName').val()) || null;
		var options = {
			groupId: groupId,
			userName: userName,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getExpertList(options, function(ret) {
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
			$("#expertList").html(expertListView.expertList(data));
			$("#expertList .loginUser").on('click', loginUser);
			main.activeTr('expertList');
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
		getExpertList();
	}

	function loginUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId: userId
		}
		userCgi.loginUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var url = location.protocol + "//" + location.host.replace(/^op/, 'www');
			url = url.replace(/[\?#].*/g, '') + '?cache=false#my';
			common.locationUrl(url, '_blank');
		});
	}
});
define('controller/expertStatistics198',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var expertStatistics198View = require('view/expertStatistics198');
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
			title : "专家统计",
			className :  'user_dateStatistics'
		}
		main.setMain(view, options);
		main.setContent(expertStatistics198View.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#reset").on('click', reset);
		$("#searchSubmit").on('click', searchSubmit);
		$("#dateType input[type='radio']").on('click', dateType);
		$('#reset').click();
	}

	function setContent() {
		getExpertStatistics198();
	}

	function searchSubmit() {
		pageNum = 1;
		getExpertStatistics198();
	}

	function reset(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#planPrizeRateRank')[0].checked = false
		$("#userId").val('0');
		$("#beginTime").val('');
		$("#endTime").val('');
		$("#beginYear").val('0');
		$("#beginMonth").val('0');
		$("#endYear").val('0');
		$("#endMonth").val('0');
		$('#day').click();
	}

	function dateType() {
		var dateType = parseInt($(this).val()) || 0;
		if (dateType == 1) {
			$("#search_day").css("display", "block");
			$("#search_month").css("display", "none");
		} else if(dateType == 2) {
			$("#search_day").css("display", "none");
			$("#search_month").css("display", "block");
		}
	}

	function getExpertStatistics198() {
		var planPrizeRateRank = !!$('#planPrizeRateRank')[0].checked;
		var userId = parseInt($("#userId").val()) || 0;
		var dateType = parseInt($("#dateType input:checked").val()) || 0;
		var beginTime = null;
		var endTime = null;
		if (dateType == 1) {
			beginTime = trim($('#beginTime').val()) || null;
			endTime = trim($('#endTime').val()) || null;	
		} else if (dateType == 2) {
			var beginYear = trim($('#beginYear').val()) || '';
			var beginMonth = trim($('#beginMonth').val()) || '';
			var endYear = trim($('#endYear').val()) || '';
			var endMonth = trim($('#endMonth').val()) || '';
			if (beginYear || beginMonth) {
				if (!beginYear) {
					ui.showNotice('请选择开始年份');
					return;
				}
				if (!beginMonth) {
					ui.showNotice('请选择开始月份');
					return;
				}
			}
			if (endYear || endMonth) {
				if (!endYear) {
					ui.showNotice('请选择结束年份');
					return;
				}
				if (!endMonth) {
					ui.showNotice('请选择结束月份');
					return;
				}
			}
			if (beginYear && beginMonth) {
				beginTime = beginYear+'-'+beginMonth;
			}
			if (endYear && endMonth) {
				endTime = endYear+'-'+endMonth;
			}
		}
		var options = {
			planPrizeRateRank: planPrizeRateRank,
			userId: userId,
			dateType: dateType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getExpertStatistics198(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPlanCount = (ret.data && ret.data.totalPlanCount) || 0;
			var totalPlanOrderCount = (ret.data && ret.data.totalPlanOrderCount) || 0;
			var totalPlanOrderAmount = (ret.data && ret.data.totalPlanOrderAmount) || 0;
			var totalPlanWinRate = (ret.data && ret.data.totalPlanWinRate) || 0;
			var totalPlanPrizeRate = (ret.data && ret.data.totalPlanPrizeRate) || 0;
			var totalPlanTicketOrderCount = (ret.data && ret.data.totalPlanTicketOrderCount) || 0;
			var totalPlanTicketOrderAmount = (ret.data && ret.data.totalPlanTicketOrderAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				planPrizeRateRank: planPrizeRateRank,
				totalPlanCount: totalPlanCount,
				totalPlanOrderCount: totalPlanOrderCount,
				totalPlanOrderAmount: totalPlanOrderAmount,
				totalPlanWinRate: totalPlanWinRate,
				totalPlanPrizeRate: totalPlanPrizeRate,
				totalPlanTicketOrderCount: totalPlanTicketOrderCount,
				totalPlanTicketOrderAmount: totalPlanTicketOrderAmount,
				list: list
			}
			if (planPrizeRateRank) {
				$('#thDate').hide();
			} else {
				$('#thDate').show();
			}
			$("#expertStatistics198").html(expertStatistics198View.expertStatistics198(data));
			main.activeTr('expertStatistics198');
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
		getExpertStatistics198();
	}

})
define('controller/feedbackList',function(require,exports) {

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
define('controller/financeChargeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeChargeListView = require('view/financeChargeList');
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
			title: "充值列表",
			className: 'frecharge_record'
		} 
		main.setMain(view, options);
		main.setContent(financeChargeListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getChargeList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getChargeList();
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=chargeList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getChargeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getChargeList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)|| 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#chargeList").html(financeChargeListView.chargeList(data));
			$("#chargeList").find('[remark]').on('click', showRemark);
			main.activeTr('chargeList');
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
		getChargeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}


})
define('controller/financeConsumeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeConsumeListView = require('view/financeConsumeList');
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
			title: "消费列表",
			className: 'expense_record'
		} 
		main.setMain(view, options);
		main.setContent(financeConsumeListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getConsumeList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getConsumeList();
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=consumeList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getConsumeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		financeCgi.getConsumeList(options, function(ret) {
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
			$("#consumeList").html(financeConsumeListView.consumeList(data));
			$("#consumeList").find('[remark]').on('click', showRemark);
			main.activeTr('consumeList');
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
		getConsumeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}


})
define('controller/financeIncomeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeIncomeListView = require('view/financeIncomeList');
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
			title: "收益列表",
			className: 'earnings_record'
		} 
		main.setMain(view, options);
		main.setContent(financeIncomeListView.content());
		$("#financeType").bind('change', financeTypeChange);
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getIncomeList();
	}

	function searchSubmit() {
		pageNum = 1;
		getIncomeList();
	}

	function financeTypeChange(e) {
		var financeType = parseInt(this.value);
		var html = [];
		html.push('<option value="0">全部</option>');
		if (!isNaN(financeType)) {
			if (financeType == 0) {
				html.push('<option value="1">推荐收益</option>');
				html.push('<option value="2">推广收益</option>');
			} else if (financeType == 1) {
				html.push('<option value="1">中奖收益</option>');
				html.push('<option value="2">分成收益</option>');
			}
		}
		$('#type').html(html.join(''));
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			planId: planId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=incomeList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getIncomeList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			planId: planId,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getIncomeList(options, function(ret) {
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
			$("#incomeList").html(financeIncomeListView.incomeList(data));
			$("#incomeList").find('[remark]').on('click', showRemark);
			main.activeTr('incomeList');
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
		getIncomeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})
define('controller/financeRecordList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeRecordListView = require('view/financeRecordList');
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
			title: "流水列表",
			className: 'flow_record'
		} 
		main.setMain(view, options);
		main.setContent(financeRecordListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getRecordList();
	}

	function searchSubmit() {
		pageNum = 1;
		getRecordList();
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var channel = parseInt($('#channel').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			type: type,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=recordList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getRecordList() {
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var channel = parseInt($('#channel').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			type: type,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getRecordList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)|| 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#recordList").html(financeRecordListView.recordList(data));
			$("#recordList").find('[remark]').on('click', showRemark);
			main.activeTr('recordList');
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
		getRecordList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}


})
define('controller/financeTradeList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeTradeListView = require('view/financeTradeList');
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
			title: "交易对账",
			className: 'expense_record'
		} 
		main.setMain(view, options);
		main.setContent(financeTradeListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getTradeList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getTradeList();
	}

	function exportReport() {
		var tradeType = parseInt($('#tradeType').val());
		if(isNaN(tradeType)){
			tradeType = undefined;
		}
		var tradeNo = trim($('#tradeNo').val()) || null;
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var type = parseInt($('#type').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			tradeType: tradeType,
			tradeNo: tradeNo,
			userName: userName,
			orderId: orderId,
			beginTime: beginTime,
			endTime: endTime,
			type: type,
			financeType: financeType
		};
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=tradeList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getTradeList() {
		var tradeType = parseInt($('#tradeType').val());
		if(isNaN(tradeType)){
			tradeType = undefined;
		}
		var tradeNo = trim($('#tradeNo').val()) || null;
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var type = parseInt($('#type').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			tradeType: tradeType,
			tradeNo: tradeNo,
			userName: userName,
			orderId: orderId,
			beginTime: beginTime,
			endTime: endTime,
			type: type,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		};
		financeCgi.getTradeList(options, function(ret) {
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
			$("#tradeList").html(financeTradeListView.tradeList(data));
			$("#tradeList").find('[remark]').on('click', showRemark);
			main.activeTr('tradeList');
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
		getTradeList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})
define('controller/financeTransferList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeTransferListView = require('view/financeTransferList');
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
			title: "转账对账",
			className: 'expense_record'
		} 
		main.setMain(view, options);
		main.setContent(financeTransferListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getTransferList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getTransferList();
	}

	function exportReport() {
		return;
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			orderId: orderId,
			type: type,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=transferList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getTransferList() {
		var withdrawId = parseInt($('#withdrawId').val()) || null;
		var userName = trim($('#userName').val()) || null;
		var batchNo = trim($('#batchNo').val()) || null;
		var transferNo = trim($('#transferNo').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var status = parseInt($('#status').val());
		var financeType = parseInt($('#financeType').val());
		if(isNaN(status)){
			status = undefined;
		}
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			withdrawId: withdrawId,
			userName: userName,
			batchNo: batchNo,
			transferNo: transferNo,
			beginTime: beginTime,
			endTime: endTime,
			status: status,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		};
		financeCgi.getTransferList(options, function(ret) {
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
			$("#transferList").html(financeTransferListView.transferList(data));
			$("#transferList").find('[remark]').on('click', showRemark);
			main.activeTr('transferList');
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
		getTransferList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})
define('controller/financeWithdrawList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeWithdrawListView = require('view/financeWithdrawList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "提款列表",
			className: 'draw_record',
		}
		main.setMain(view, options);
		main.setContent(financeWithdrawListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getWithdrawList();
	}

	function searchSubmit() {
		pageNum = 1;
		getWithdrawList();	
	}

	function exportReport() {
		var userName = trim($('#userName').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var accountType = parseInt($('#accountType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			exportReport: true,
			userName: userName,
			status: status,
			accountType: accountType,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType
		}
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=finance&m=withdrawList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getWithdrawList(totalCount) {
		var userName = trim($('#userName').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var accountType = parseInt($('#accountType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || undefined;
		var endTime = trim($('#endTime').val()) || undefined;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			status: status,
			accountType: accountType,
			beginTime: beginTime,
			endTime: endTime,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getWithdrawList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)|| 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalAmount: totalAmount,
				list: list
			}
			$("#withdrawList").html(financeWithdrawListView.withdrawList(data));
			$("#withdrawList").find('[remark]').on('click', showRemark);
			main.activeTr('withdrawList');
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
		getWithdrawList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}


});
define('controller/financeWithdrawVerifyList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var financeCgi = require('cgi/finance');
	var financeWithdrawVerifyListView = require('view/financeWithdrawVerifyList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "提款审核",
			className: 'content_mgmt',
		}
		main.setMain(view, options);
		main.setContent(financeWithdrawVerifyListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getWithdrawList();
	}

	function searchSubmit() {
		pageNum = 1;
		getWithdrawList();	
	}

	function getWithdrawList() {
		var userName = trim($('#userName').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var accountType = parseInt($('#accountType').val()) || null;
		var financeType = parseInt($('#financeType').val());
		if(isNaN(financeType)){
			financeType = undefined;
		}
		var options = {
			userName: userName,
			status: status,
			accountType: accountType,
			financeType: financeType,
			pageNum: pageNum,
			pageSize: pageSize
		}
		financeCgi.getWithdrawList(options, function(ret) {
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
			$("#withdrawVerifyList").html(financeWithdrawVerifyListView.withdrawVerifyList(data));
			$("#withdrawVerifyList").find('[remark]').on('click', showRemark);
			$("#withdrawVerifyList .verifyWithdraw").on('click', verifyWithdraw);
			main.activeTr('withdrawVerifyList');
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
		getWithdrawList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}

	function verifyWithdraw() {
		var withdrawId = parseInt($(this).attr('withdrawId')) || 0;
		var status = parseInt($(this).attr('status')) || 0;
		if (isNaN(withdrawId) || withdrawId <= 0 || isNaN(status) || status <= 0) {
			return;
		}
		var text = '';
		if (status == 2) {
			text = '是否 "审核" 该提款？'
		} else if (status == 3) {
			text = '是否 "打款" 该提款？'
		} else if (status == 4) {
			text = '是否 "拒绝" 该提款？'
		}
		ui.showConfirm(text, function() {
			var options = {
				withdrawId: withdrawId,
				status: status
			}
			financeCgi.verifyWithdraw(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('操作处理成功');
				ui.closeConfirm();
				getWithdrawList();
			});
		});
	}
});
define('controller/glmj10OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj10OrderListView = require('view/glmj10OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj10OrderListView.content());
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
		getGlmj10OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj10OrderList();
	}

	function getGlmj10OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj10OrderList(options, function(ret) {
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
			$("#glmj10OrderList").html(glmj10OrderListView.glmj10OrderList(data));
			main.activeTr('glmj10OrderList');
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
		getGlmj10OrderList();
	}
})
define('controller/glmj10UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj10UserListView = require('view/glmj10UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj10UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj10UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj10UserList();	
	}

	function getGlmj10UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj10UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj10UserList").html(glmj10UserListView.glmj10UserList(data));
			$("#glmj10UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj10UserList [remark]").on('click', showRemark);
			main.activeTr('glmj10UserList');
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
		getGlmj10UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj1OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj1OrderListView = require('view/glmj1OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj1OrderListView.content());
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
		getGlmj1OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj1OrderList();
	}

	function getGlmj1OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj1OrderList(options, function(ret) {
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
			$("#glmj1OrderList").html(glmj1OrderListView.glmj1OrderList(data));
			main.activeTr('glmj1OrderList');
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
		getGlmj1OrderList();
	}
})
define('controller/glmj1UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj1UserListView = require('view/glmj1UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj1UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj1UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj1UserList();	
	}

	function getGlmj1UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj1UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj1UserList").html(glmj1UserListView.glmj1UserList(data));
			$("#glmj1UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj1UserList [remark]").on('click', showRemark);
			main.activeTr('glmj1UserList');
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
		getGlmj1UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj2OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj2OrderListView = require('view/glmj2OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj2OrderListView.content());
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
		getGlmj2OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj2OrderList();
	}

	function getGlmj2OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj2OrderList(options, function(ret) {
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
			$("#glmj2OrderList").html(glmj2OrderListView.glmj2OrderList(data));
			main.activeTr('glmj2OrderList');
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
		getGlmj2OrderList();
	}
})
define('controller/glmj2UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj2UserListView = require('view/glmj2UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj2UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj2UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj2UserList();	
	}

	function getGlmj2UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj2UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj2UserList").html(glmj2UserListView.glmj2UserList(data));
			$("#glmj2UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj2UserList [remark]").on('click', showRemark);
			main.activeTr('glmj2UserList');
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
		getGlmj2UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj3OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj3OrderListView = require('view/glmj3OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj3OrderListView.content());
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
		getGlmj3OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj3OrderList();
	}

	function getGlmj3OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj3OrderList(options, function(ret) {
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
			$("#glmj3OrderList").html(glmj3OrderListView.glmj3OrderList(data));
			main.activeTr('glmj3OrderList');
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
		getGlmj3OrderList();
	}
})
define('controller/glmj3UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj3UserListView = require('view/glmj3UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj3UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj3UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj3UserList();	
	}

	function getGlmj3UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj3UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj3UserList").html(glmj3UserListView.glmj3UserList(data));
			$("#glmj3UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj3UserList [remark]").on('click', showRemark);
			main.activeTr('glmj3UserList');
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
		getGlmj3UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj4OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj4OrderListView = require('view/glmj4OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj4OrderListView.content());
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
		getGlmj4OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj4OrderList();
	}

	function getGlmj4OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj4OrderList(options, function(ret) {
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
			$("#glmj4OrderList").html(glmj4OrderListView.glmj4OrderList(data));
			main.activeTr('glmj4OrderList');
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
		getGlmj4OrderList();
	}
})
define('controller/glmj4UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj4UserListView = require('view/glmj4UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj4UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj4UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj4UserList();	
	}

	function getGlmj4UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj4UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj4UserList").html(glmj4UserListView.glmj4UserList(data));
			$("#glmj4UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj4UserList [remark]").on('click', showRemark);
			main.activeTr('glmj4UserList');
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
		getGlmj4UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj5OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj5OrderListView = require('view/glmj5OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj5OrderListView.content());
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
		getGlmj5OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj5OrderList();
	}

	function getGlmj5OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj5OrderList(options, function(ret) {
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
			$("#glmj5OrderList").html(glmj5OrderListView.glmj5OrderList(data));
			main.activeTr('glmj5OrderList');
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
		getGlmj5OrderList();
	}
})
define('controller/glmj5UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj5UserListView = require('view/glmj5UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj5UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj5UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj5UserList();	
	}

	function getGlmj5UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj5UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj5UserList").html(glmj5UserListView.glmj5UserList(data));
			$("#glmj5UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj5UserList [remark]").on('click', showRemark);
			main.activeTr('glmj5UserList');
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
		getGlmj5UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj6OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj6OrderListView = require('view/glmj6OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj6OrderListView.content());
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
		getGlmj6OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj6OrderList();
	}

	function getGlmj6OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj6OrderList(options, function(ret) {
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
			$("#glmj6OrderList").html(glmj6OrderListView.glmj6OrderList(data));
			main.activeTr('glmj6OrderList');
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
		getGlmj6OrderList();
	}
})
define('controller/glmj6UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj6UserListView = require('view/glmj6UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj6UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj6UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj6UserList();	
	}

	function getGlmj6UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj6UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj6UserList").html(glmj6UserListView.glmj6UserList(data));
			$("#glmj6UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj6UserList [remark]").on('click', showRemark);
			main.activeTr('glmj6UserList');
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
		getGlmj6UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj7OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj7OrderListView = require('view/glmj7OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj7OrderListView.content());
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
		getGlmj7OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj7OrderList();
	}

	function getGlmj7OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj7OrderList(options, function(ret) {
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
			$("#glmj7OrderList").html(glmj7OrderListView.glmj7OrderList(data));
			main.activeTr('glmj7OrderList');
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
		getGlmj7OrderList();
	}
})
define('controller/glmj7UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj7UserListView = require('view/glmj7UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj7UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj7UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj7UserList();	
	}

	function getGlmj7UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj7UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj7UserList").html(glmj7UserListView.glmj7UserList(data));
			$("#glmj7UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj7UserList [remark]").on('click', showRemark);
			main.activeTr('glmj7UserList');
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
		getGlmj7UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj8OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj8OrderListView = require('view/glmj8OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj8OrderListView.content());
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
		getGlmj8OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj8OrderList();
	}

	function getGlmj8OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj8OrderList(options, function(ret) {
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
			$("#glmj8OrderList").html(glmj8OrderListView.glmj8OrderList(data));
			main.activeTr('glmj8OrderList');
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
		getGlmj8OrderList();
	}
})
define('controller/glmj8UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj8UserListView = require('view/glmj8UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj8UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj8UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj8UserList();	
	}

	function getGlmj8UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj8UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj8UserList").html(glmj8UserListView.glmj8UserList(data));
			$("#glmj8UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj8UserList [remark]").on('click', showRemark);
			main.activeTr('glmj8UserList');
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
		getGlmj8UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmj9OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmj9OrderListView = require('view/glmj9OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmj9OrderListView.content());
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
		getGlmj9OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj9OrderList();
	}

	function getGlmj9OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmj9OrderList(options, function(ret) {
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
			$("#glmj9OrderList").html(glmj9OrderListView.glmj9OrderList(data));
			main.activeTr('glmj9OrderList');
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
		getGlmj9OrderList();
	}
})
define('controller/glmj9UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmj9UserListView = require('view/glmj9UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmj9UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmj9UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmj9UserList();	
	}

	function getGlmj9UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmj9UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmj9UserList").html(glmj9UserListView.glmj9UserList(data));
			$("#glmj9UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmj9UserList [remark]").on('click', showRemark);
			main.activeTr('glmj9UserList');
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
		getGlmj9UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/glmjOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var glmjOrderListView = require('view/glmjOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(glmjOrderListView.content());
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
		getGlmjOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmjOrderList();
	}

	function getGlmjOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getGlmjOrderList(options, function(ret) {
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
			$("#glmjOrderList").html(glmjOrderListView.glmjOrderList(data));
			main.activeTr('glmjOrderList');
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
		getGlmjOrderList();
	}
})
define('controller/glmjUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var glmjUserListView = require('view/glmjUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(glmjUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getGlmjUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGlmjUserList();	
	}

	function getGlmjUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getGlmjUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#glmjUserList").html(glmjUserListView.glmjUserList(data));
			$("#glmjUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#glmjUserList [remark]").on('click', showRemark);
			main.activeTr('glmjUserList');
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
		getGlmjUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/groupList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var groupCgi = require('cgi/group');
	var groupListView = require('view/groupList');
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
			title: "用户分组",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(groupListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createGroup").on('click', editGroup);
	}


	function setContent() {
		getGroupList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGroupList();	
	}

	function getGroupList() {
		var type = parseInt($('#type').val()) || null;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			type: type,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		groupCgi.getGroupList(options, function(ret) {
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
			$("#groupList").html(groupListView.groupList(data));
			$("#groupList .groupUser").on('click', groupUser);
			$("#groupList .editGroup").on('click', editGroup);
			$("#groupList .modifySort").on('click', modifySort);
			main.activeTr('groupList');
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
		getGroupList();
	}

	function groupUser() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		if (isNaN(groupId) || groupId <= 0) {
			return;
		}
		common.locationUrl('#groupUserList&groupId=' + groupId);
	}

	function editGroup() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		var title = '';
		if (!isNaN(groupId) && groupId > 0) {
			title = '修改分组';
		} else {
			title = '新增分组';
		}
		var options = {
			html: groupListView.editGroup({
				title: title,
				groupId: groupId
			})
		}
		ui.showWindow(options);
		$("#cancelEditGroup").on('click', function() {
			ui.closeWindow();
		});
		$("#sureEditGroup").on('click', editGroupSubmit);
		if (!isNaN(groupId) && groupId > 0) {
			var options = {
				groupId : groupId
			}
			groupCgi.getGroupInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var name = trim(data.name) || '';
				var publish = parseInt(data.publish) || 0;
				$('#editName').val(name);
				$('#editPublish').val(publish);
			});
		}
	}

	function editGroupSubmit() {
		var groupId = parseInt($('#editGroupId').val());
		var name = trim($('#editName').val());
		var publish = parseInt($('#editPublish').val());
		if (!name) {
			ui.showNotice('分组名不能为空');
			return;
		}
		var cgi = function() {};
		var data = {
			type: 1,
			name: name,
			publish: publish
		};
		if (!isNaN(groupId) && groupId > 0) {
			data.groupId = groupId;
			cgi = groupCgi.modifyGroup;
		} else {
			cgi = groupCgi.createGroup;
		}
		cgi(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			if (!isNaN(groupId) && groupId > 0) {
				ui.showNotice("修改成功");	
			} else {
				ui.showNotice("新增成功");	
			}
			ui.closeWindow();
			getGroupList();
		});
	}

	function modifySort() {
		var groupId = parseInt($(this).attr('groupId')) || 0;
		var type = parseInt($(this).attr('type')) || 0;
		if (isNaN(groupId) || groupId <= 0 || isNaN(type) || type <= 0) {
			return;
		}
		var data = {
			groupId: groupId,
			type: type
		};
		groupCgi.modifyGroupSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("排序成功");
			getGroupList();
		});
	}
});
define('controller/groupUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var groupCgi = require('cgi/group');
	var userCgi = require('cgi/user');
	var groupUserListView = require('view/groupUserList');
	var groupId = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		groupId = parseInt(common.getUrlParam("groupId")) || 0;
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		groupId = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "分组用户列表",
			className: 'group_userList',
		}
		main.setMain(view, options);
		main.setContent(groupUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createGroupUserBtn").on('click', showCreateGroupUser);
	}

	function setContent() {
		getGroupInfo();
		getGroupUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getGroupUserList();	
	}

	function getGroupUserList() {
		var userName = trim($('#userName').val()) || null;
		var userRight = parseInt($('#userRight').val()) || null;
		var options = {
			userName: userName,
			userRight: userRight,
			groupId: groupId,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		groupCgi.getGroupUserList(options, function(ret) {
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
			$("#groupUserList").html(groupUserListView.groupUserList(data));
			$("#groupUserList .deleteGroupUser").on('click', deleteGroupUser);
			$("#groupUserList .modifyGroupUserSort").on('click', modifyGroupUserSort);
			main.activeTr('groupUserList');
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
		getGroupUserList();
	}
	
	function getGroupInfo() {
		var options = {
			groupId: groupId
		}
		groupCgi.getGroupInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var name = trim(data.name) || '';
			$('#title').html(name + '-用户列表');
		});
	}

	function deleteGroupUser() {
		var userId = parseInt($(this).attr("userId")) || 0;
		var nickName = trim($(this).attr("nickName")) || '';
		var realName = trim($(this).attr("realName")) || '';
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否把 "'+userName+'" 从该分组移除', function() {
			var options = {
				groupId: groupId,
				userId: userId
			}
			groupCgi.deleteGroupUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('移除成功');
				ui.closeConfirm();
				getGroupUserList();
			});
		});	
	}

	function modifyGroupUserSort() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var type = parseInt($(this).attr('type')) || 0;
		if (isNaN(userId) || userId <= 0 || isNaN(type) || type <= 0) {
			return;
		}
		var data = {
			groupId: groupId,
			userId: userId,
			type: type
		};
		groupCgi.modifyGroupUserSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("排序成功");
			getGroupUserList();
		});
	}

	function showCreateGroupUser() {
		var options = {
			html: groupUserListView.createGroupUser()
		}
		ui.showWindow(options);
		$("#cSearchSubmit").on('click', getUserList).click();
	}

	function getUserList() {
		var userName = trim($('#cUserName').val()) || null;
		var options = {
			userName: userName,
			pageNum: 1,
			pageSize: 10	
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#userList").html(groupUserListView.userList(data));
			$("#userList .createGroupUser").on('click', createGroupUser);
		});
	}

	function createGroupUser() {
		var userId = parseInt($(this).attr("userId")) || 0;
		var nickName = trim($(this).attr("nickName")) || '';
		var realName = trim($(this).attr("realName")) || '';
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		ui.showConfirm('是否把 "'+userName+'" 新增到该分组', function() {
			var options = {
				groupId: groupId,
				userId: userId
			}
			groupCgi.createGroupUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('新增成功');
				ui.closeConfirm();
				ui.closeWindow();
				getGroupUserList();
			});
		});
		$('#confirmBox .mask').attr('style', 'z-index:9');
		$('#confirmBox .pop').attr('style', 'z-index:10');
	}
})
define('controller/guideList',function(require,exports) {

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
define('controller/index',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var indexView = require('view/index');

	function init(view){
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		main.setMain(view, {});
	}

	function setContent() {
		main.setContent('');
	}
});
define('controller/jxzpList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var jxzpListView = require('view/jxzpList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "极限追盘",
			className: 'content_mgmt',
		}
		main.setMain(view, options);
		main.setContent(jxzpListView.content());
		$("#type").on('change', function(e) {
			var value = parseInt(this.value) || 0;
			var html = [];
			html.push('<option value="0">全部</option>');
			if (value == 1) {
				html.push('<option value="1">连胜</option>');
				html.push('<option value="2">连平</option>');
				html.push('<option value="3">连负</option>');
			} else if (value == 2) {
				html.push('<option value="1">连赢盘</option>');
				html.push('<option value="2">连输盘</option>');
			}
			$('#status').html(html.join(""));
		});
		$("#searchSubmit").on('click', searchSubmit);
		$("#addJxzp").on('click', function(e) {
			common.locationUrl('#editJxzp');
		});
	}


	function setContent() {
		getJxzpList();
	}

	function searchSubmit() {
		pageNum = 1;
		getJxzpList();	
	}

	function getJxzpList() {
		var teamName = trim($('#teamName').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = null;
		}
		var options = {
			teamName: teamName,
			type: type,
			status: status,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize
		}
		jxzpCgi.getJxzpList(options, function(ret) {
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
			$("#jxzpList").html(jxzpListView.jxzpList(data));
			$("#jxzpList .examine.modify").on('click', modifyJxzp);
			$("#jxzpList .examine.publish").on('click', publishJxzp);
			main.activeTr('jxzpList');
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
		getJxzpList();
	}

	function modifyJxzp() {
		var jxzpId = parseInt($(this).attr('jxzpId')) || 0;
		if (!isNaN(jxzpId) && jxzpId > 0) {
			common.locationUrl('#editJxzp&jxzpId=' + jxzpId);
		}
	}

	function publishJxzp() {
		var jxzpId = parseInt($(this).attr('jxzpId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(jxzpId) || jxzpId <= 0 || isNaN(publish)) {
			return;
		}
		var publishText = publish==1?"上架":"下架";
		ui.showConfirm('是否 "' + publishText +'" 该极限数据', function sure() {
			var options = {
				jxzpId: jxzpId,
				publish: publish
			}
			jxzpCgi.publishJxzp(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(publishText + '成功');
				ui.closeConfirm();
				getJxzpList();
			});
		}, function cancel() {

		});
	}
});
define('controller/launchList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var bannerCgi = require('cgi/banner');
	var launchListView = require('view/launchList');
	var pageNum = null;
	var pageSize = null;
	var uploadFile = null;

	function init(view) {
		pageNum = 1;
		pageSize = 50;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		uploadFile = null;
	}

	function setMain(view) {
		var options = {
			title: "启动图列表",
			className: 'order-list',
		}
		main.setMain(view, options);
		main.setContent(launchListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createLaunchImg").on('click', editLaunchImg);
	}


	function setContent() {
		getLaunchList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLaunchList();	
	}

	function getLaunchList() {
		var type = parseInt($('#type').val());
		var publish = parseInt($('#publish').val());
		if (isNaN(type)) {
			type = undefined;
		}
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			type: type,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		bannerCgi.getBannerList(options, function(ret) {
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
			$("#launchList").html(launchListView.launchList(data));
			$("#launchList .editLaunch").on('click', editLaunchImg);
			$("#launchList .deleteLaunch").on('click', deleteLaunch);
			$("#launchList .modifySort").on('click', modifySort);
			$("#launchList .publishLaunch").on('click', publishLaunch);
			var top = $("#launchList tr:first-child .modifyUp");
			var bottom = $("#launchList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('launchList');
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
		getLaunchList();
	}

	function editLaunchImg() {
		var launchId = parseInt($(this).attr('launchId')) || 0;
		var title = '';
		if (!isNaN(launchId) && launchId > 0) {
			title = '修改启动图';
		} else {
			title = '新增启动图';
		}
		var options = {
			title: title,
			launchId: launchId
		}
		showEditLaunch(options);
		if (!isNaN(launchId) && launchId > 0) {
			var options = {
				launchId : launchId
			}
			bannerCgi.getBannerInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var link = trim(data.link);
				var src = trim(data.resourceList[0]);
				var type = parseInt(data.type) || 0;
				$('#editLink').val(link);
				$('#editType').val(type);
				$("#previewImg").html('<img class="pre_img" style="width: 200px" src="'+ src +'" alt="" />');
			});
		}
	}

	function showEditLaunch(options) {
		options = options || {};
		closeEditLaunch();
		$("body").append(launchListView.editLaunch(options));
		$("#closeEditLaunch").on('click', closeEditLaunch);
		$("#cancelEditLaunch").on('click', closeEditLaunch);
		$("#fileSelect").on('change', fileChange);
		$("#sureEditLaunch").on('click', editLaunchSubmit);
	}
	
	function closeEditLaunch(){
		$("#editLaunchBox").remove();
		uploadFile = null;
	}
	
	function fileChange(e) {
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			var fileName = trim(file.name);
			var index = fileName.lastIndexOf(".");
			if(index != -1) {
				var extName = fileName.substr(index + 1).toLowerCase();
				if(exts[extName]) {
					uploadFile = file;
					return false;
				}
			}
		});
		if (!uploadFile) {
			return;
		}	
		var readerOnload = function(e) {
			$('#previewImg').html('<img class="pre_img" style="width: 200px" src="'+ e.target.result +'" alt="" />');
		}
		var reader = new FileReader();
		reader.onload = readerOnload;
		reader.readAsDataURL(uploadFile);
	}
	
	function editLaunchSubmit() {
		var launchId = parseInt($("#editLaunchId").val());
		var link = trim($('#editLink').val());
		var type = parseInt($("#editType").val());
		if ((isNaN(launchId) || launchId <= 0) && !uploadFile) {
			ui.showNotice('请选择图片');
			return;	
		}
		if (!link) {
			ui.showNotice('请输入链接');
			return;
		};
		if (isNaN(type) || type < 0) {
			ui.showNotice('请选择类型');
			return;
		};
		var submitFun = function(options) {
			ui.closeLoading();
			var cgi = function() {};
			if (!isNaN(launchId) && launchId > 0) {
				options.launchId = launchId;
				cgi = bannerCgi.modifyBanner;
			} else {
				cgi = bannerCgi.createBanner;
			}
			cgi(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				if (!isNaN(launchId) && launchId > 0) {
					ui.showNotice("修改成功");	
				} else {
					ui.showNotice("新增成功");	
				}
				closeEditLaunch();
				$('#type').val(type);
				getLaunchList();
			});
		}
		var data = {
			type: type,
			link: link,
			file: uploadFile
		};
		submitFun(data);
	}

	function deleteLaunch() {
		var launchId = parseInt($(this).attr('launchId')) || 0;
		if (isNaN(launchId) || launchId <= 0) {
			return
		}
		ui.showConfirm('是否 "删除" 该启动图', function() {
			var data = {
				launchId: launchId
			};
			bannerCgi.deleteBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice("删除成功");
				ui.closeConfirm();
				getLaunchList();
			});
		});
	}
	
	function publishLaunch() { 
		var launchId = parseInt($(this).attr('launchId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(launchId) || launchId <= 0 || isNaN(publish) || publish < 0) {
			return
		}
		var title = publish == 1 ? '上架' : '下架';
		ui.showConfirm('是否 "' + title + '" 该启动图', function() {
			var data = {
				launchId: launchId,
				publish: publish
			}
			bannerCgi.publishBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(title + "成功");
				ui.closeConfirm();
				getLaunchList();
			});
		});	
	}

	function modifySort() {
		var launchIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisLaunchId = parseInt($(this).attr('launchId')) || 0;
		var prevLaunchId = parseInt($(this).parent().parent().prev().attr('launchId')) || 0;
		var nextLaunchId = parseInt($(this).parent().parent().next().attr('launchId')) || 0;
		if (isNaN(thisLaunchId) || isNaN(prevLaunchId) || isNaN(nextLaunchId) || thisLaunchId <= 0) {
			return;
		}
		if (type == 1) {
			launchIdArr.push(prevLaunchId, thisLaunchId);
		} else if (type == 2) {
			launchIdArr.push(thisLaunchId, nextLaunchId);
		};
		var data = {
			launchId: launchIdArr
		};
		bannerCgi.modifyBannerSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getLaunchList();
		});
	}
});
define('controller/ll6OrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var ll6OrderListView = require('view/ll6OrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(ll6OrderListView.content());
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
		getLl6OrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLl6OrderList();
	}

	function getLl6OrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getLl6OrderList(options, function(ret) {
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
			$("#ll6OrderList").html(ll6OrderListView.ll6OrderList(data));
			main.activeTr('ll6OrderList');
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
		getLl6OrderList();
	}
})
define('controller/ll6UserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var ll6UserListView = require('view/ll6UserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(ll6UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getLl6UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLl6UserList();	
	}

	function getLl6UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getLl6UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#ll6UserList").html(ll6UserListView.ll6UserList(data));
			$("#ll6UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#ll6UserList [remark]").on('click', showRemark);
			main.activeTr('ll6UserList');
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
		getLl6UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
//收款
define('controller/login',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var loginView = require('view/login');

	function init(view) {
		var unlogin = trim(common.getUrlParam("unlogin")) == 'true' || false;
		if (unlogin) {
			adminUserCgi.adminUserUnlogin();
		}
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		var options = {
			title: "登录",
			className: 'account'
		}
		main.setMain(view, options);
		main.setContent(loginView.content());
		$("#loginSubmit").on('click', loginSubmit);
	}


	function setContent() {
		
	}

	function loginSubmit() {
		var loginName = trim($("#loginName").val());
		var password = trim($("#password").val());
		if (!loginName) {
			ui.showNotice("帐号不能为空");
			return;
		}
		if (!password) {
			ui.showNotice("密码不能为空");
			return;
		}
		var data = {
			loginName: loginName,
			password: password
		}
		adminUserCgi.adminUserLogin(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var toHash = decodeURIComponent($.trim(common.getUrlParam("toHash")));
            toHash = (toHash && /^#/.test(toHash) && toHash) || "#index";
            ui.clear();
            common.clearCache();
            common.locationUrl(toHash);
		});
	}
});
define('controller/lxscOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var lxscOrderListView = require('view/lxscOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(lxscOrderListView.content());
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
		getLxscOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLxscOrderList();
	}

	function getLxscOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getLxscOrderList(options, function(ret) {
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
			$("#lxscOrderList").html(lxscOrderListView.lxscOrderList(data));
			main.activeTr('lxscOrderList');
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
		getLxscOrderList();
	}
})
define('controller/lxscUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var lxscUserListView = require('view/lxscUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(lxscUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getLxscUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLxscUserList();	
	}

	function getLxscUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getLxscUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#lxscUserList").html(lxscUserListView.lxscUserList(data));
			$("#lxscUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#lxscUserList [remark]").on('click', showRemark);
			main.activeTr('lxscUserList');
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
		getLxscUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/matchList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var matchListView = require('view/matchList');
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
			title: "比赛列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(matchListView.content());
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
		getMatchList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMatchList();
	}

	function getMatchList() {
		var number = trim($('#number').val()) || null;
		var league = trim($('#league').val()) || null;
		var home = trim($('#home').val()) || null;
		var away = trim($('#away').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var matchCancel = !!$('#matchCancel')[0].checked;
		var options = {
			number: number,
			league: league,
			home: home,
			away: away,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			orderBy: 1,
			pageNum: pageNum,
			pageSize: pageSize
		}
		if (matchCancel) {
			options.result = '取消';
		}
		matchCgi.getMatchList(options, function(ret) {
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
			$("#matchList").html(matchListView.matchList(data));
			$("#matchList").find('.cancelMatch').on('click', cancelMatch);
			$("#matchList").find('.setMatchResult').on('click', showSetMatchResult);
			main.activeTr('matchList');
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
		getMatchList();
	}

	function cancelMatch(e) {
		var matchId = parseInt($(this).attr("matchId")) || 0;
		var matchInfo = trim($(this).attr("matchInfo")) || '';
		if (isNaN(matchId) || matchId <= 0 || !matchInfo) {
			return;
		}
		ui.showConfirm('是否取消 <br>"' + matchInfo +'" ？<br>被取消的比赛，算奖时赔率将按1计算！', function sure() {
			var options = {
				matchId: matchId,
				halfResult: '取消',
				result: '取消'
			}
			matchCgi.modifyMatch(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('比赛取消成功');
				ui.closeConfirm();
				getMatchList();
			});
		}, function cancel() {

		});
	}

	function showSetMatchResult(e) {
		var matchId = parseInt($(this).attr("matchId")) || 0;
		var matchInfo = trim($(this).attr("matchInfo")) || '';
		if (isNaN(matchId) || matchId <= 0 || !matchInfo) {
			return;
		}
		var data = {
			matchId: matchId,
			matchInfo: matchInfo
		}
		var options = {
			html: matchListView.modifyResult(data)
		}
		ui.showWindow(options);
		$('#cancelModifyResult').on('click', ui.closeWindow);
		$('#sureModifyResult').on('click', setMatchResultSubmit);
	}

	function setMatchResultSubmit() {
		var matchId = parseInt($('#modifyMatchId').val()) || 0;
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var halfResult = trim($('#modifyHalfResult').val()) || '';
		var result = trim($('#modifyResult').val()) || '';
		if (halfResult && !(/^\d+:\d+$/.test(halfResult))) {
			ui.showNotice('请输入正确的半场结果');
			return;
		}
		if (result && !(/^\d+:\d+$/.test(result))) {
			ui.showNotice('请输入正确的全场结果');
			return;
		}
		var options = {
			matchId: matchId,
			halfResult: halfResult,
			result: result
		}
		matchCgi.modifyMatch(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('赛果设置成功');
			ui.closeWindow();
			getMatchList();
		});
	}
})
define('controller/mfspOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var mfspOrderListView = require('view/mfspOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(mfspOrderListView.content());
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
		getMfspOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMfspOrderList();
	}

	function getMfspOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getMfspOrderList(options, function(ret) {
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
			$("#mfspOrderList").html(mfspOrderListView.mfspOrderList(data));
			main.activeTr('mfspOrderList');
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
		getMfspOrderList();
	}
})
define('controller/mfspUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var mfspUserListView = require('view/mfspUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(mfspUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getMfspUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMfspUserList();	
	}

	function getMfspUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getMfspUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#mfspUserList").html(mfspUserListView.mfspUserList(data));
			$("#mfspUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#mfspUserList [remark]").on('click', showRemark);
			main.activeTr('mfspUserList');
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
		getMfspUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/myappOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var myappOrderListView = require('view/myappOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(myappOrderListView.content());
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
		getMyappOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMyappOrderList();
	}

	function getMyappOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getMyappOrderList(options, function(ret) {
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
			$("#myappOrderList").html(myappOrderListView.myappOrderList(data));
			main.activeTr('myappOrderList');
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
		getMyappOrderList();
	}
})
define('controller/myappUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var myappUserListView = require('view/myappUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(myappUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getMyappUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMyappUserList();	
	}

	function getMyappUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getMyappUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#myappUserList").html(myappUserListView.myappUserList(data));
			$("#myappUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#myappUserList [remark]").on('click', showRemark);
			main.activeTr('myappUserList');
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
		getMyappUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/orderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var channelCgi = require('cgi/channel');
	var orderListView = require('view/orderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(orderListView.content());
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
		getChannelList();
		getOrderList();
	}

	function getChannelList() {
		var options = {
			pageNum: 1,
			pageSize: 100
		}
		channelCgi.getChannelList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="">渠道(全部)</option>');
			html.push('<option value="0">平台</option>');
			for (var i = 0, length = list.length; i < length; i++) {
				var ob = list[i] || {};
				var channel = parseInt(ob.channel) || 0;
				if (channel <= 0) {
					continue;
				}
				var nickName = ob.nickName || '';
				var realName = ob.realName || '';
				var remark = ob.remark || '';
				var userName = nickName;
				if (realName) {
					userName += '(' + realName +  ')';	
				}
				if (!userName) {
					userName = remark;
				}
				userName = userName.replace(/['"\n<>]/g, '');
				html.push('<option value="' + channel + '">' + userName + '</option>');
			}
			html.push('<option value="-1">红包充值</option>');
			html.push('<option value="-2">体彩</option>');
			html.push('<option value="-3">福彩</option>');
			$('#channel').html(html.join(''));
		});
	}

	function searchSubmit() {
		pageNum = 1;
		getOrderList();
	}

	function getOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var spreaderUserName = trim($('#spreaderUserName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var planId = parseInt($('#planId').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var planMatchType = parseInt($('#planMatchType').val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val());
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			spreaderUserName: spreaderUserName,
			orderId: orderId,
			planId: planId,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			comboType: comboType,
			channel: channel,
			planMatchType: planMatchType,
			source: source,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getOrderList(options, function(ret) {
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
			$("#orderList").html(orderListView.orderList(data));
			$("#orderList").find('[remark]').on('click', showRemark);
			main.activeTr('orderList');
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
		getOrderList();
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
})
//收款
define('controller/password',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var passwordView = require('view/password');

	function init(view){
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		var options = {
			title: "修改密码",
			className: 'account'
		}
		main.setMain(view, options);
		main.setContent(passwordView.content());
		$("#passwordSubmit").on('click', passwordSubmit);
	}


	function setContent() {
		
	}

	function passwordSubmit() {
		var oldPassword = trim($("#oldPassword").val()) || '';
		var newPassword = trim($("#newPassword").val()) || '';
		var againNewPassword = trim($("#againNewPassword").val());
		if (!oldPassword) {
			ui.showNotice("旧密码不能为空");
			return;
		}
		if (oldPassword.length < 6) {
			ui.showNotice("旧密码不能小于6位");
			return;
		}
		if (!newPassword) {
			ui.showNotice("新密码不能为空");
			return;
		}
		if (newPassword.length < 6) {
			ui.showNotice("新密码不能小于6位");
			return;
		}
		if (newPassword != againNewPassword) {
			ui.showNotice("新密码两次输入不一致");
			return;
		}
		var data = {
			oldPassword: oldPassword,
			newPassword: newPassword
		}
		adminUserCgi.adminUserModifyPassword(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("密码修改成功");
			setTimeout(function() {
				common.locationUrl('#login');
			}, 1000);
		});
	}
});
define('controller/planList',function(require, exports) {

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
define('controller/qmdbOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var qmdbOrderListView = require('view/qmdbOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(qmdbOrderListView.content());
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
		getQmdbOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getQmdbOrderList();
	}

	function getQmdbOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getQmdbOrderList(options, function(ret) {
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
			$("#qmdbOrderList").html(qmdbOrderListView.qmdbOrderList(data));
			main.activeTr('qmdbOrderList');
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
		getQmdbOrderList();
	}
})
define('controller/qmdbUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var qmdbUserListView = require('view/qmdbUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(qmdbUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getQmdbUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getQmdbUserList();	
	}

	function getQmdbUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getQmdbUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#qmdbUserList").html(qmdbUserListView.qmdbUserList(data));
			$("#qmdbUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#qmdbUserList [remark]").on('click', showRemark);
			main.activeTr('qmdbUserList');
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
		getQmdbUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/replayList',function(require,exports) {

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
			title : "复盘列表",
			className :  'replay'
		}
		main.setMain(view, options);
		main.setContent(replayListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getReplayList();
	}

	function searchSubmit() {
		pageNum = 1;
		getReplayList();
	}

	function getReplayList() {
		var title = trim($("#title").val()) || null;
		var userName = trim($('#userName').val()) || undefined;
		var replayId = parseInt($('#replayId').val()) || undefined;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			title: title,
			userName: userName,
			replayId: replayId,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize
		}
		replayCgi.getReplayList(options, function(ret) {
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
			$("#replayList").html(replayListView.replayList(data));
			$("#replayList .deleteReplay").on('click', deleteReplay);
			$("#replayList [title]").on('click', showTitle);
			$("#replayList [content]").on('click', showContent);
			$("#replayList [resourceList]").on('click', showImage);
			$("#replayList .examine.publish").on('click', publishReplay);
			main.activeTr('replayList');
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
		getReplayList();
	}

	function deleteReplay() {
		var replayId = parseInt($(this).attr('replayId')) || 0;
		if (isNaN(replayId) || replayId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该复盘', function sure() {
			var options = {
				replayId: replayId
			}
			replayCgi.deleteReplay(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getReplayList();
			});
		}, function cancel() {

		});
	}

	function publishReplay() {
		var replayId = parseInt($(this).attr('replayId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(replayId) || replayId <= 0 || isNaN(publish)) {
			return;
		}
		var publishText = publish==1?"上架":"下架";
		ui.showConfirm('是否 "' + publishText +'" 该复盘', function sure() {
			var options = {
				replayId: replayId,
				publish: publish
			}
			replayCgi.publishReplay(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(publishText + '成功');
				ui.closeConfirm();
				getReplayList();
			});
		}, function cancel() {

		});
	}
	
	function showTitle(e) {
		var title = trim($(this).attr('title')) ;
		var options = {
			html:  '<pre style="white-space:pre-wrap;line-height:25px;">' + title + '</pre>'
		}
		ui.showWindow(options);
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
})
define('controller/stationDepositList',function(require,exports) {

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
define('controller/statisticsAmountList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsAmountListView = require('view/statisticsAmountList');
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
			title : "价格统计",
			className :  'amount_statistics'
		}
		main.setMain(view, options);
		main.setContent(statisticsAmountListView.content());
		$("#searchSubmit").on('click',searchSubmit);
	}

	function setContent() {
		getStatisticsAmountList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsAmountList();
	}

	function getStatisticsAmountList() {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsAmountList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPlanCount = (ret.data && ret.data.totalPlanCount) || 0;
			var totalPlanOrderCount = (ret.data && ret.data.totalPlanOrderCount) || 0;
			var totalPlanOrderAmount = (ret.data && ret.data.totalPlanOrderAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				totalPlanCount: totalPlanCount,
				totalPlanOrderCount: totalPlanOrderCount,
				totalPlanOrderAmount: totalPlanOrderAmount,
				list: list
			}
			$("#statisticsAmountList").html(statisticsAmountListView.statisticsAmountList(data));
			main.activeTr('statisticsAmountList');
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
		getStatisticsAmountList();
	}

})
define('controller/statisticsDateList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsDateListView = require('view/statisticsDateList');
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
			title: "日期统计列表",
			className: 'date_statistics'
		} 
		main.setMain(view, options);
		main.setContent(statisticsDateListView.content());
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
		getStatisticsDateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsDateList();
	}

	function getStatisticsDateList() {
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var options = {
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsDateList(options, function(ret) {
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
			$("#statisticsDateList").html(statisticsDateListView.statisticsDateList(data));
			main.activeTr('statisticsDateList');
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
		getStatisticsDateList();
	}

})
define('controller/statisticsMonthList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsMonthListView = require('view/statisticsMonthList');
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
			title: "月份统计列表",
			className: 'statistics_month'
		} 
		main.setMain(view, options);
		main.setContent(statisticsMonthListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getStatisticsMonthList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsMonthList();
	}

	function getStatisticsMonthList() {
		var beginTime,endTime;
		var beginYear = parseInt($('#beginYear').val()) || 0;
		var beginMonth = parseInt($('#beginMonth').val()) || 0;
		var endYear = parseInt($('#endYear').val()) || 0;
		var endMonth = parseInt($('#endMonth').val()) || 0;
		if(beginYear = endYear&&beginMonth < endMonth || beginYear < endYear || beginYear==endYear==beginMonth==endMonth) {
			beginTime = toString(beginYear)+toString(beginMonth);
			endTime = toString(endYear)+toString(endMonth);
		} else {
			alert("请输入正确的日期")		
		};
		var options = {
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsMonthList(options, function(ret) {
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
			$("#statisticsMonthList").html(statisticsMonthListView.statisticsMonthList(data));
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
		getStatisticsMonthList();
	}

})
define('controller/statisticsUserDateList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var statisticsCgi = require('cgi/statistics');
	var statisticsUserDateListView = require('view/statisticsUserDateList');
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
			title : "用户日期列表",
			className :  'user_dateStatistics'
		}
		main.setMain(view, options);
		main.setContent(statisticsUserDateListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#reset").on('click', reset);
		$("#searchSubmit").on('click', searchSubmit);
		$("#dateType input[type='radio']").on('click', dateType);
		$('#reset').click();
	}

	function setContent() {
		getStatisticsUserDateList();
	}

	function searchSubmit() {
		pageNum = 1;
		getStatisticsUserDateList();
	}

	function reset(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#planPrizeRateRank')[0].checked = false
		$("#userName").val('');
		$("#beginTime").val('');
		$("#endTime").val('');
		$("#beginYear").val('0');
		$("#beginMonth").val('0');
		$("#endYear").val('0');
		$("#endMonth").val('0');
		$('#day').click();
	}

	function dateType() {
		var dateType = parseInt($(this).val()) || 0;
		if (dateType == 1) {
			$("#search_day").css("display", "block");
			$("#search_month").css("display", "none");
		} else if(dateType == 2) {
			$("#search_day").css("display", "none");
			$("#search_month").css("display", "block");
		}
	}

	function getStatisticsUserDateList() {
		var planPrizeRateRank = !!$('#planPrizeRateRank')[0].checked;
		var userName = trim($("#userName").val()) || null;
		var dateType = parseInt($("#dateType input:checked").val()) || 0;
		var beginTime = null;
		var endTime = null;
		if (dateType == 1) {
			beginTime = trim($('#beginTime').val()) || null;
			endTime = trim($('#endTime').val()) || null;	
		} else if (dateType == 2) {
			var beginYear = trim($('#beginYear').val()) || '';
			var beginMonth = trim($('#beginMonth').val()) || '';
			var endYear = trim($('#endYear').val()) || '';
			var endMonth = trim($('#endMonth').val()) || '';
			if (beginYear || beginMonth) {
				if (!beginYear) {
					ui.showNotice('请选择开始年份');
					return;
				}
				if (!beginMonth) {
					ui.showNotice('请选择开始月份');
					return;
				}
			}
			if (endYear || endMonth) {
				if (!endYear) {
					ui.showNotice('请选择结束年份');
					return;
				}
				if (!endMonth) {
					ui.showNotice('请选择结束月份');
					return;
				}
			}
			if (beginYear && beginMonth) {
				beginTime = beginYear+'-'+beginMonth;
			}
			if (endYear && endMonth) {
				endTime = endYear+'-'+endMonth;
			}
		}
		var options = {
			planPrizeRateRank: planPrizeRateRank,
			userName: userName,
			dateType: dateType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		statisticsCgi.getStatisticsUserDateList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalPlanCount = (ret.data && ret.data.totalPlanCount) || 0;
			var totalPlanOrderCount = (ret.data && ret.data.totalPlanOrderCount) || 0;
			var totalPlanOrderAmount = (ret.data && ret.data.totalPlanOrderAmount) || 0;
			var totalPlanWinRate = (ret.data && ret.data.totalPlanWinRate) || 0;
			var totalPlanPrizeRate = (ret.data && ret.data.totalPlanPrizeRate) || 0;
			var totalPlanTicketOrderCount = (ret.data && ret.data.totalPlanTicketOrderCount) || 0;
			var totalPlanTicketOrderAmount = (ret.data && ret.data.totalPlanTicketOrderAmount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				planPrizeRateRank: planPrizeRateRank,
				totalPlanCount: totalPlanCount,
				totalPlanOrderCount: totalPlanOrderCount,
				totalPlanOrderAmount: totalPlanOrderAmount,
				totalPlanWinRate: totalPlanWinRate,
				totalPlanPrizeRate: totalPlanPrizeRate,
				totalPlanTicketOrderCount: totalPlanTicketOrderCount,
				totalPlanTicketOrderAmount: totalPlanTicketOrderAmount,
				list: list
			}
			if (planPrizeRateRank) {
				$('#thDate').hide();
			} else {
				$('#thDate').show();
			}
			$("#statisticsUserDateList").html(statisticsUserDateListView.statisticsUserDateList(data));
			main.activeTr('statisticsUserDateList');
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
		getStatisticsUserDateList();
	}

})
define('controller/ticketList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var ticketCgi = require('cgi/ticket');
	var ticketListView = require('view/ticketList');
	var ticketMap = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		ticketMap = {};
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		ticketMap = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "出票列表",
			className : 'followTicket_list'
		}
		main.setMain(view, options);
		main.setContent(ticketListView.content());
		var orderId = parseInt(common.getUrlParam("orderId")) || '';
		$('#orderId').val(orderId);
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
		getTicketList();
	}

	function searchSubmit() {
		pageNum = 1;
		getTicketList();
	}

	function getTicketList() {
		var issue = trim($("#issue").val()) || null;
		var lotteryId = trim($("#lotteryId").val()) || null;
		var status = parseInt($("#status").val());
		var userName = trim($("#userName").val()) || null;
		var supplierName = trim($("#supplierName").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var ticketId = parseInt($('#ticketId').val()) || null;
		var platformId = trim($("#platformId").val()) || null;
		var printNo = trim($("#printNo").val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(status)) {
			status = undefined;
		}
		var options = {
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			supplierName: supplierName,
			orderId: orderId,
			ticketId: ticketId,
			platformId: platformId,
			printNo: printNo,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		};
		ticketCgi.getTicketList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)/100 || 0;
			var totalPrizeAmount = (ret.data && ret.data.totalPrizeAmount)/100 || 0;
			var totalPretaxPrizeAmount = (ret.data && ret.data.totalPretaxPrizeAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			ticketMap = {};
			$.each(list, function(i, ticket) {
				var ticketId = parseInt(ticket.ticketId) || 0;
				if (ticketId > 0) {
					ticketMap[ticketId] = ticket;
				}
			});
			var data = {
				list: list,
				totalAmount: totalAmount,
				totalPrizeAmount: totalPrizeAmount,
				totalPretaxPrizeAmount: totalPretaxPrizeAmount
			};
			$("#ticketList").html(ticketListView.ticketList(data));
			$("#ticketList [showFormat]").on('click', showFormat);
			$("#ticketList [printNo]").on('click', showPrintNo);
			main.activeTr('ticketList');
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
		getTicketList();
	}

	function showPrintNo(e) {
		var printNo = trim($(this).attr('printNo')) || "";
		var options = {
			html: '<p>'+ printNo +'</p>'
		}
		ui.showWindow(options);
	}

	function showFormat() {
		var ticketId = parseInt($(this).attr('ticketId')) || 0;
		var matchType = parseInt($(this).attr('matchType')) || 0;
		var ticket = ticketMap[ticketId] || {};
		if (isNaN(ticketId) || ticketId <= 0 || !ticket) {
			return;
		}
		if (matchType == 1 || matchType == 2) {
			matchList.call(this);
		} else {
			var betContent = trim(ticket.betContent) || '';
			var betContentArr = betContent.split(';');
			var options = {
				html: betContentArr.join('<br><br>')
			};
			ui.showWindow(options);
		}
	}

	function matchList() {
		var ticketId = parseInt($(this).attr('ticketId')) || 0;
		var matchType = parseInt($(this).attr('matchType')) || 0;
		var ticket = ticketMap[ticketId] || {};
		var matchList = ticket.matchList || [];
		if (isNaN(ticketId) || ticketId <= 0 || !ticket) {
			return;
		}
		var data = {
			matchType: matchType,
			matchList: matchList
		};
		var options = {
			html: ticketListView.matchList(data)
		};
		ui.showWindow(options);
	}
})
define('controller/ticketOrderList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var channelCgi = require('cgi/channel');
	var ticketOrderListView = require('view/ticketOrderList');
	var orderMap = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		orderMap = {};
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		orderMap = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "跟单列表",
			className : 'followTicket_list'
		}
		main.setMain(view, options);
		main.setContent(ticketOrderListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#exportReport").on('click', exportReport);
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getChannelList();
		getTicketOrderList();
	}

	function getChannelList() {
		var options = {
			pageNum: 1,
			pageSize: 100
		}
		channelCgi.getChannelList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="">渠道(全部)</option>');
			html.push('<option value="0">平台</option>');
			for (var i = 0, length = list.length; i < length; i++) {
				var ob = list[i] || {};
				var channel = parseInt(ob.channel) || 0;
				if (channel <= 0) {
					continue;
				}
				var nickName = ob.nickName || '';
				var realName = ob.realName || '';
				var remark = ob.remark || '';
				var userName = nickName;
				if (realName) {
					userName += '(' + realName +  ')';	
				}
				if (!userName) {
					userName = remark;
				}
				userName = userName.replace(/['"\n<>]/g, '');
				html.push('<option value="' + channel + '">' + userName + '</option>');
			}
			html.push('<option value="-1">红包充值</option>');
			html.push('<option value="-2">体彩</option>');
			html.push('<option value="-3">福彩</option>');
			$('#channel').html(html.join(''));
		});
	}

	function searchSubmit() {
		pageNum = 1;
		getTicketOrderList();
	}

	function exportReport() {
		var issue = trim($('#issue').val()) || null;
		var lotteryId = trim($('#lotteryId').val()) || null;
		var userName = trim($("#userName").val()) || null;
		var ticketUserName = trim($("#ticketUserName").val()) || null;
		var orderNumeric = trim($("#orderNumeric").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var status = parseInt($("#status").val()) || null;
		var ticketStatus = parseInt($("#ticketStatus").val());
		var ticketPrizeDivideStatus = parseInt($("#ticketPrizeDivideStatus").val());
		var ticketAttachPrizeStatus = parseInt($("#ticketAttachPrizeStatus").val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val())
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(ticketPrizeDivideStatus)) {
			ticketPrizeDivideStatus = undefined;
		}
		if (isNaN(ticketAttachPrizeStatus)) {
			ticketAttachPrizeStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			exportReport: true,
			orderType: [3,7,9],
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			ticketUserName: ticketUserName,
			orderNumeric: orderNumeric,
			orderId: orderId,
			ticketStatus: ticketStatus,
			ticketPrizeDivideStatus: ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: ticketAttachPrizeStatus,
			source: source,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime
		};
		$('#exportReportForm').remove();
		var form = $('<form id="exportReportForm" target="exportReportIframe" method="post" action="'+PROXY+'?c=order&m=orderList"></form>');
		for(var key in options) {
			var value = options[key];
			if (value !== null && value !== undefined) {
				form.append('<input type="hidden" name="'+key+'" value="'+options[key]+'"/>');
			}		
		}
		$('body').append(form);
		form.submit();
		$('#exportReportForm').remove();
	}

	function getTicketOrderList() {
		var issue = trim($('#issue').val()) || null;
		var lotteryId = trim($('#lotteryId').val()) || null;
		var userName = trim($("#userName").val()) || null;
		var ticketUserName = trim($("#ticketUserName").val()) || null;
		var orderNumeric = trim($("#orderNumeric").val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var status = parseInt($("#status").val()) || null;
		var ticketStatus = parseInt($("#ticketStatus").val());
		var ticketPrizeDivideStatus = parseInt($("#ticketPrizeDivideStatus").val());
		var ticketAttachPrizeStatus = parseInt($("#ticketAttachPrizeStatus").val());
		var ticketPrizeVerifyStatus = parseInt($("#ticketPrizeVerifyStatus").val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val())
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		if (isNaN(ticketPrizeDivideStatus)) {
			ticketPrizeDivideStatus = undefined;
		}
		if (isNaN(ticketAttachPrizeStatus)) {
			ticketAttachPrizeStatus = undefined;
		}
		if (isNaN(ticketPrizeVerifyStatus)) {
			ticketPrizeVerifyStatus = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			orderType: [3,7,9],
			issue: issue,
			lotteryId: lotteryId,
			status: status,
			userName: userName,
			ticketUserName: ticketUserName,
			orderNumeric: orderNumeric,
			orderId: orderId,
			ticketStatus: ticketStatus,
			ticketPrizeDivideStatus: ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: ticketAttachPrizeStatus,
			ticketPrizeVerifyStatus: ticketPrizeVerifyStatus,
			source: source,
			channel: channel,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		};
		orderCgi.getOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var totalAmount = (ret.data && ret.data.totalAmount)/100 || 0;
			var totalTicketSendPrizeAmount = (ret.data && ret.data.totalTicketSendPrizeAmount)/100 || 0;
			var totalTicketExpectPrizeAmount = (ret.data && ret.data.totalTicketExpectPrizeAmount)/100 || 0;
			var totalTicketPrizeAmount = (ret.data && ret.data.totalTicketPrizeAmount)/100 || 0;
			var totalTicketAttachPrizeAmount = (ret.data && ret.data.totalTicketAttachPrizeAmount)/100 || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			orderMap = {};
			$.each(list, function(i, order) {
				var orderId = parseInt(order.orderId) || 0;
				if (orderId > 0) {
					orderMap[orderId] = order;
				}
			});
			var data = {
				Math: Math,
				list: list,
				totalAmount: totalAmount,
				totalTicketSendPrizeAmount: totalTicketSendPrizeAmount,
				totalTicketExpectPrizeAmount: totalTicketExpectPrizeAmount,
				totalTicketPrizeAmount: totalTicketPrizeAmount,
				totalTicketAttachPrizeAmount: totalTicketAttachPrizeAmount
			};
			$("#ticketOrderList").html(ticketOrderListView.ticketOrderList(data));
			$("#ticketOrderList [resourceList]").on('click', showImage);
			$("#ticketOrderList [showFormat]").on('click', showFormat);
			$("#ticketOrderList .modifyTicketPrizeAmount").on('click', modifyTicketPrizeAmount);
			$("#ticketOrderList .refundTicket").on('click', refundTicket);
			$("#ticketOrderList .sendTicketPrize").on('click', sendTicketPrize);
			main.activeTr('ticketOrderList');
		});
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
			html: imgHtml.join('')
		};
		ui.showWindow(options);
	}

	function showFormat() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var order = orderMap[orderId] || {};
		var orderType = parseInt(order.orderType) || 0;
		if (isNaN(orderId) || orderId <= 0 || !order || isNaN(orderType) || orderType <= 0) {
			return;
		}
		if (orderType == 3) {
			matchList(orderId);
		} else if (orderType == 7) {
			var betContent = trim(order.betContent) || '';
			var betContentArr = betContent.split(';');
			var options = {
				html: betContentArr.join('<br><br>')
			};
			ui.showWindow(options);
		}
	}

	function matchList(orderId) {
		var orderId = parseInt(orderId) || 0;
		var order = orderMap[orderId] || {};
		var matchList = order.matchList || [];
		var planMatchType = order.planMatchType;
		if (isNaN(orderId) || orderId <= 0) {
			return;
		}
		var data = {
			matchList: matchList,
			planMatchType: planMatchType
		};
		var options = {
			html: ticketOrderListView.matchList(data)
		};
		ui.showWindow(options);
	}

	function refundTicket() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		var amount = parseInt($(this).attr('amount')) || 0;
		if (isNaN(orderId) || orderId <= 0 || isNaN(amount) || amount <= 0) {
			return;
		}
		ui.showConfirm('确定给 “'+userName+'” 退款 '+amount+' 元？', function sure() {
			var options = {
				orderId: orderId
			};
			orderCgi.refundTicket(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('退款成功');
				ui.closeConfirm();
				getTicketOrderList();
			});
		}, function cancel() {

		});
	}

	function sendTicketPrize() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		var ticketPrizeAmount = parseFloat($(this).attr('ticketPrizeAmount')) || 0;
		if (isNaN(orderId) || orderId <= 0 || isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
			return;
		}
		ui.showConfirm('确定给 “'+userName+'” 派奖 '+ticketPrizeAmount+' 元？', function sure() {
			var options = {
				orderId: orderId
			};
			orderCgi.sendTicketPrize(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('派奖成功');
				ui.closeConfirm();
				getTicketOrderList();
			});
		}, function cancel() {

		});
	}

	function modifyTicketPrizeAmount() {
		var orderId = parseInt($(this).attr('orderId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(orderId) || orderId <= 0) {
			return;
		}
		var options = {
			html: ticketOrderListView.modifyTicketPrizeAmount({
				orderId: orderId,
				userName: userName
			})
		};
		ui.showWindow(options);
		$("#cancelModifyTicketPrizeAmount").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyTicketPrizeAmount").on('click', function() {
			var orderId = parseInt($('#modifyTicketPrizeAmountOrderId').val()) || 0;
			var ticketPrizeAmount = parseFloat($('#ticketPrizeAmount').val()) || 0;
			if (isNaN(orderId) || orderId <= 0) {
				return;
			}
			if(isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
				ui.showNotice('请输入正确的中奖金额');
				return;
			}
			var options = {
				orderId: orderId,
				ticketPrizeAmount: ticketPrizeAmount*100
			}
			orderCgi.modifyTicketPrizeAmount(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('修改中奖金额成功');
				ui.closeWindow();
				getTicketOrderList();
			})
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
		getTicketOrderList();
	}

})
define('controller/tvsouOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var tvsouOrderListView = require('view/tvsouOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(tvsouOrderListView.content());
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
		getTvsouOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getTvsouOrderList();
	}

	function getTvsouOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getTvsouOrderList(options, function(ret) {
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
			$("#tvsouOrderList").html(tvsouOrderListView.tvsouOrderList(data));
			main.activeTr('tvsouOrderList');
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
		getTvsouOrderList();
	}
})
define('controller/tvsouUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var tvsouUserListView = require('view/tvsouUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(tvsouUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getTvsouUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getTvsouUserList();	
	}

	function getTvsouUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getTvsouUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#tvsouUserList").html(tvsouUserListView.tvsouUserList(data));
			$("#tvsouUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#tvsouUserList [remark]").on('click', showRemark);
			main.activeTr('tvsouUserList');
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
		getTvsouUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});
define('controller/userArticleList',function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userArticleListView = require('view/userArticleList');
	var userId = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		userId = parseInt(common.getUrlParam("userId")) || 0;
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		userId = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "用户文章",
			className :  'user_article'
		}
		main.setMain(view, options);
		main.setContent(userArticleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createArticle").on('click', editArticle);
	}

	function setContent() {
		getUserInfo();
		getUserArticleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserArticleList();
	}

	function getUserArticleList() {
		var articleTitle = trim($("#articleTitle").val()) || null;
		var options = {
			userId: userId,
			articleTitle: articleTitle,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserArticleList(options, function(ret) {
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
			$("#userArticleList").html(userArticleListView.userArticleList(data));
			$("#userArticleList .deleteArticle").on('click', deleteArticle);
			$("#userArticleList .updateArticle").on('click', editArticle);
			main.activeTr('userArticleList');
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
		getUserArticleList();
	}

	function getUserInfo() {
		var options = {
			userId: userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var realName = data.realName;
			var nickName = data.nickName;
			var name = nickName;
			if (realName != '') {
				name += '('+realName+')';
			}
			$('#title').html(name + '-用户文章');
		});
	}

	function editArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		var options = {
			html: userArticleListView.editArticle({
				articleId: articleId
			})
		}
		ui.showWindow(options);
		$("#cancelEditArticle").on('click', function() {
			ui.closeWindow();
		});
		$("#sureEditArticle").on('click', function() {
			var articleId = parseInt($('#articleId').val()) || 0;
			var articleLink = trim($('#articleLink').val()) || '';
			if (articleLink == '') {
				ui.showNotice('文章地址不能为空');
				return;
			}
			var options = {
				articleLink: articleLink
			} 
			var tip = '';
			var cgi = function() {};
			if(!isNaN(articleId) && articleId > 0) {
				tip = '更新';
				options.articleId = articleId;
				cgi = 'modifyUserArticle';
			} else {
				tip = '添加';
				options.userId = userId;
				cgi = 'createUserArticle';
			}
			userCgi[cgi](options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(tip + "成功");
				ui.closeWindow();
				getUserArticleList();
			});
		});
	}

	function deleteArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		if (isNaN(articleId) || articleId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该文章', function sure() {
			var options = {
				articleId: articleId
			}
			userCgi.deleteUserArticle(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getUserArticleList();
			});
		}, function cancel() {

		});
	}

})
define('controller/userList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var channelCgi = require('cgi/channel');
	var userListView = require('view/userList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(userListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getChannelList();
		getUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserList();	
	}

	function getChannelList() {
		var options = {
			pageNum: 1,
			pageSize: 100
		}
		channelCgi.getChannelList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="">渠道(全部)</option>');
			html.push('<option value="0">平台</option>');
			for (var i = 0, length = list.length; i < length; i++) {
				var ob = list[i] || {};
				var channel = parseInt(ob.channel) || 0;
				if (channel <= 0) {
					continue;
				}
				var nickName = ob.nickName || '';
				var realName = ob.realName || '';
				var remark = ob.remark || '';
				var userName = nickName;
				if (realName) {
					userName += '(' + realName +  ')';	
				}
				if (!userName) {
					userName = remark;
				}
				userName = userName.replace(/['"\n<>]/g, '');
				html.push('<option value="' + channel + '">' + userName + '</option>');
			}
			html.push('<option value="-1">红包充值</option>');
			html.push('<option value="-2">体彩</option>');
			html.push('<option value="-3">福彩</option>');
			$('#channel').html(html.join(''));
		});
	}

	function getUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var userRight = parseInt($('#userRight').val());
		var subscribe = parseInt($('#subscribe').val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val());
		if (isNaN(userRight)) {
			userRight = undefined;
		}
		if (isNaN(subscribe)) {
			subscribe = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			userName: userName,
			phone: phone,
			userRight: userRight,
			subscribe: subscribe,
			source: source,
			channel: channel,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var identityImg = (isString(list[i].identityImg) && [list[i].identityImg]) || list[i].identityImg || [];
				var businessImg = (isString(list[i].businessImg) && [list[i].businessImg]) || list[i].businessImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				var identityImgUrl = [];
				var businessImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				$.each(identityImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && identityImgUrl.push(url);
				});
				$.each(businessImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && businessImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
				list[i].identityImg = identityImgUrl.join('|');
				list[i].businessImg = businessImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#userList").html(userListView.userList(data));
			$("#userList").find('[profileImg],[personalImg],[identityImg],[businessImg]').on('click', showImage);
			$("#userList [remark]").on('click', showRemark);
			$("#userList .loginUser").on('click', loginUser);
			$("#userList .modifyUser").on('click', modifyUser);
			$("#userList .chargeUser").on('click', chargeUser);
			$("#userList .modifyUserRight").on('click', modifyUserRight);
			$("#userList .userArticle").on('click', userArticle);
			$("#userList .setChannel").on('click', setChannel);
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

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		var identityImg = trim($(this).attr('identityImg')) || "";
		var businessImg = trim($(this).attr('businessImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		if (identityImg) {
			identityImg = identityImg.split('|');	
		}
		if (businessImg) {
			businessImg = businessImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(identityImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(businessImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}

	function loginUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId: userId
		}
		userCgi.loginUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var url = location.protocol + "//" + location.host.replace(/^op/, 'www');
			url = url.replace(/[\?#].*/g, '') + '?cache=false#my';
			common.locationUrl(url, '_blank');
		});
	}

	function modifyUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: userListView.modifyUser({
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelModifyUser").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyUser").on('click', modifyUserSubmit);
		var options = {
			userId : userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var realName = trim(data.realName) || '';
			var tag = trim(data.tag) || '';
			var phone = trim(data.phone) || '';
			var address = trim(data.address) || '';
			var personalImg = trim(data.personalImg) || '';
			var remark = trim(data.remark) || '';
			$('#modifyRealName').val(realName);
			$('#modifyTag').val(tag);
			$('#modifyPhone').val(phone);
			$('#modifyAddress').val(address);
			$('#modifyPersonalImg').val(personalImg);
			$('#modifyRemark').val(remark);
		});
	}

	function modifyUserRight() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: userListView.modifyUserRight({
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelModifyUserRight").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyUserRight").on('click', modifyUserRightSubmit);
		var options = {
			userId : userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userRight = parseInt(data.userRight) || 0;
			$('#modifyUserRight').val(userRight);
			$('#modifyUserRightBox [type=checkbox]').each(function(i, item) {
				var index = parseInt($(item).attr('index'));
				if (isNaN(index) || index <= 0) {
					return;	
				}
				item.checked = (userRight & Math.pow(2, index-1)) != 0;
			});
		});
	}

	function modifyUserSubmit() {
		var userId = parseInt($('#modifyUserId').val());
		var realName = trim($('#modifyRealName').val());
		var tag = trim($('#modifyTag').val());
		var phone = trim($('#modifyPhone').val());
		var address = trim($('#modifyAddress').val());
		var personalImg = trim($('#modifyPersonalImg').val());
		var remark = trim($('#modifyRemark').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId,
			realName: realName,
			tag: tag,
			phone: phone,
			address: address,
			personalImg: personalImg,
			remark: remark
		}
		userCgi.modifyUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('用户信息修改成功');
			ui.closeWindow();
			getUserList();
		});
	}

	function modifyUserRightSubmit() {
		var userId = parseInt($('#modifyUserId').val());
		var userRight = parseInt($('#modifyUserRight').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		$('#modifyUserRightBox [type=checkbox]').each(function(i, item) {
			var index = parseInt($(item).attr('index'));
			if (isNaN(index) || index <= 0) {
				return;	
			}
			if (item.checked) {
				userRight = userRight | Math.pow(2, index-1);
			} else {
				userRight = userRight & ~Math.pow(2, index-1);
			}
		});
		var options = {
			userId : userId,
			userRight: userRight
		}
		userCgi.modifyUserRight(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('用户权限修改成功');
			ui.closeWindow();
			getUserList();
		});
	}

	function userArticle() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		} 
		common.locationUrl('#userArticleList&userId=' + userId);
	}

	function chargeUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(userId) || userId <= 0 || userName == '') {
			return;
		}
		var options = {
			html: userListView.chargeUser({
				userId: userId,
				userName: userName
			})
		}
		ui.showWindow(options);
		$("#cancelChargeUser").on('click', function() {
			ui.closeWindow();
		});
		$("#sureChargeUser").on('click', chargeUserSubmit);
	}

	function chargeUserSubmit() {
		var userId = parseInt($('#chargeUserId').val()) || 0;
		var userName = trim($('#chargeUserName').html()) || '';
		var financeType = parseInt($('#chargeFinanceType').val());
		var amount = parseFloat($('#chargeAmount').val()) || 0;
		amount = amount.toFixed(2);
		var remark = trim($('#chargeRemark').val()) || '';
		if (isNaN(userId) || userId <= 0 || userName == '') {
			return;
		}
		if (isNaN(financeType)) {
			ui.showNotice('请选择账户类型');
			return;
		}
		if (isNaN(amount) || amount == 0) {
			ui.showNotice('请填写正确金额');
			return;
		}
		if (remark == '') {
			ui.showNotice('请填写描述');
			return;	
		}
		if (remark.length > 8) {
			ui.showNotice('描述不能大于8个字');
			return;	
		}
		var amountMap = {'0': '米粒', '1': '彩金'};
		var options = {
			userId : userId,
			financeType: financeType,
			amount: amount * 100,
			remark: remark
		}
		ui.showConfirm('是否给 "'+userName+'" 充 <b style="color:#ff0000">'+amount+'</b> '+amountMap[financeType], function() {
			userCgi.chargeUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('用户充值成功');
				ui.closeConfirm();
				ui.closeWindow();
			});
		});
		$('#confirmBox .mask').css('z-index', '9');
		$('#confirmBox .pop').css('z-index', '10');
	}


	function setChannel() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId
		}
		channelCgi.getChannelInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var channel = parseInt(data.channel) || 0;
			var discard = parseInt(data.discard) || 0;
			var options = {
				html: userListView.setChannel({
					userId: userId,
					userName: userName,
					channel: channel,
					discard: discard
				})
			}
			ui.showWindow(options);
			$("#cancelSetChannel").on('click', function() {
				ui.closeWindow();
			});
			$("#sureSetChannel").on('click', setChannelSubmit);
		});
	}

	function setChannelSubmit() {
		var channel = parseInt($('#setChannel').val());
		var userId = parseInt($('#setUserId').val());
		var discard = parseInt($('#setDiscard').val());
		var remark = trim($('#setRemark').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId,
			channel: channel,
			remark: remark
		}
		var cgi = 'createChannel';
		var title = '设置';
		if (channel > 0 && discard == 0) {
			cgi = 'deleteChannel';
			title = '取消';
		}
		channelCgi[cgi](options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice(title + '代理商成功');
			ui.closeWindow();
			getUserList();
		});
	}
});
define('controller/userVerifyList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userVerifyListView = require('view/userVerifyList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户审核",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(userVerifyListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getUserVerifyList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserVerifyList();	
	}

	function getUserVerifyList() {
		var userName = trim($('#userName').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var options = {
			userName: userName,
			type: type,
			status: status,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserVerifyList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var identityImg = list[i].identityImg || [];
				var businessImg = list[i].businessImg || [];
				var identityImgUrl = [];
				var businessImgUrl = [];
				$.each(identityImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && identityImgUrl.push(url);
				});
				$.each(businessImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && businessImgUrl.push(url);
				});
				list[i].identityImg = identityImgUrl.join('|');
				list[i].businessImg = businessImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#userVerifyList").html(userVerifyListView.userVerifyList(data));
			$("#userVerifyList").find('[identityImg],[businessImg]').on('click', showImage);
			$("#userVerifyList").find('[remark]').on('click', showRemark);
			$("#userVerifyList .verifyUser").on('click', verifyUser);
			main.activeTr('userVerifyList');
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
		getUserVerifyList();
	}

	function showImage() {
		var identityImg = trim($(this).attr('identityImg')) || "";
		var businessImg = trim($(this).attr('businessImg')) || "";
		if (identityImg) {
			identityImg = identityImg.split('|');	
		}
		if (businessImg) {
			businessImg = businessImg.split('|');	
		}
		var imgHtml = [];
		$.each(identityImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(businessImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('</br>')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);	
	}

	function verifyUser() {
		var verifyId = parseInt($(this).attr('verifyId')) || 0;
		var status = parseInt($(this).attr('status')) || 0;
		if (isNaN(verifyId) || verifyId <= 0 || isNaN(status) || status <= 0) {
			return;
		}
		var text = '';
		if (status == 2) {
			text = '是否 "审核" 该用户？'
		} else if (status == 3) {
			text = '是否 "拒绝" 该用户？'
		}
		ui.showConfirm(text, function() {
			var options = {
				verifyId: verifyId,
				status: status
			}
			userCgi.verifyUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('操作处理成功');
				ui.closeConfirm();
				getUserVerifyList();
			});
		});
	}
});
define('controller/ylwcOrderList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var orderCgi = require('cgi/order');
	var ylwcOrderListView = require('view/ylwcOrderList');
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
			title: "订单列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(ylwcOrderListView.content());
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
		getYlwcOrderList();
	}

	function searchSubmit() {
		pageNum = 1;
		getYlwcOrderList();
	}

	function getYlwcOrderList() {
		var userName = trim($('#userName').val()) || null;
		var planUserName = trim($('#planUserName').val()) || null;
		var orderType = parseInt($('#orderType').val());
		var status = parseInt($('#status').val()) || null;
		var planPrizeStatus = parseInt($("#planPrizeStatus").val());
		var ticketStatus = parseInt($("#ticketStatus").val());
		var planMatchType = parseInt($('#planMatchType').val());
		var comboType = parseInt($('#comboType').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (isNaN(orderType)) {
			orderType = undefined;
		}
		if (isNaN(planPrizeStatus)) {
			planPrizeStatus = undefined;
		}
		if (isNaN(ticketStatus)) {
			ticketStatus = undefined;
		}
		var options = {
			userName: userName,
			planUserName: planUserName,
			orderType: orderType,
			status: status,
			planPrizeStatus: planPrizeStatus,
			ticketStatus: ticketStatus,
			planMatchType: planMatchType,
			comboType: comboType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		orderCgi.getYlwcOrderList(options, function(ret) {
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
			$("#ylwcOrderList").html(ylwcOrderListView.ylwcOrderList(data));
			main.activeTr('ylwcOrderList');
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
		getYlwcOrderList();
	}
})
define('controller/ylwcUserList',function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var ylwcUserListView = require('view/ylwcUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(ylwcUserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getYlwcUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getYlwcUserList();	
	}

	function getYlwcUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getYlwcUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#ylwcUserList").html(ylwcUserListView.ylwcUserList(data));
			$("#ylwcUserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#ylwcUserList [remark]").on('click', showRemark);
			main.activeTr('ylwcUserList');
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
		getYlwcUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}
});