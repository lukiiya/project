/*活动*/ 
define('cgi/activity',function(require, exports) {

	exports.getActivityList = getActivityList;
	exports.getActivityHongBaoList = getActivityHongBaoList;
	exports.getActivityTurnplateList = getActivityTurnplateList;
	exports.getActivityChargeList = getActivityChargeList;
	exports.getActivityHongBao2017ChunJieList = getActivityHongBao2017ChunJieList;
	exports.getActivityConfederationsCupUserList = getActivityConfederationsCupUserList;
	exports.getActivityConfederationsCupList = getActivityConfederationsCupList;
	exports.getActivityAttachPrizeList = getActivityAttachPrizeList;

	var common = require('module/common');

	function getActivityList(options, success, fail, sync) {
		var url = "?c=activity&m=activityList";
		var data = {
			activityName: options.activityName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityHongBaoList(options, success, fail, sync) {
		var url = "?c=activity&m=activityHongBaoList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getActivityTurnplateList(options, success, fail, sync) {
		var url = "?c=activity&m=activityTurnplateList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			prizeName: options.prizeName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityChargeList(options, success, fail, sync) {
		var url = "?c=activity&m=activityChargeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityHongBao2017ChunJieList(options, success, fail, sync) {
		var url = "?c=activity&m=activityHongBao2017ChunJieList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityConfederationsCupUserList(options, success, fail, sync) {
		var url = "?c=activity&m=activityConfederationsCupUserList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityConfederationsCupList(options, success, fail, sync) {
		var url = "?c=activity&m=activityConfederationsCupList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getActivityAttachPrizeList(options, success, fail, sync) {
		var url = "?c=activity&m=activityAttachPrizeList";
		var data = {
			userName: options.userName,
			issue: options.issue,
			orderId: options.orderId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});



/* 用户 */
define('cgi/adminUser',function(require, exports){
	
	exports.adminUserLogin = adminUserLogin;
	exports.adminUserUnlogin = adminUserUnlogin;
	exports.adminUserModifyPassword = adminUserModifyPassword;
	exports.createAdminUser = createAdminUser;
	exports.modifyAdminUser = modifyAdminUser;
	exports.modifyAdminUserRoleId = modifyAdminUserRoleId;
	exports.deleteAdminUser = deleteAdminUser;
	exports.getAdminUserInfo = getAdminUserInfo;
	exports.getAdminUserList = getAdminUserList;
	exports.createAdminUserRole = createAdminUserRole;
	exports.modifyAdminUserRole = modifyAdminUserRole;
	exports.modifyAdminUserRoleRightIdAndMenuId = modifyAdminUserRoleRightIdAndMenuId;
	exports.deleteAdminUserRole = deleteAdminUserRole;
	exports.getAdminUserRoleInfo = getAdminUserRoleInfo;
	exports.getAdminUserRoleList = getAdminUserRoleList;
	exports.createAdminUserRight = createAdminUserRight;
	exports.modifyAdminUserRight = modifyAdminUserRight;
	exports.deleteAdminUserRight = deleteAdminUserRight;
	exports.getAdminUserRightInfo = getAdminUserRightInfo;
	exports.getAdminUserRightList = getAdminUserRightList;
	exports.createAdminUserMenu = createAdminUserMenu;
	exports.modifyAdminUserMenu = modifyAdminUserMenu;
	exports.deleteAdminUserMenu = deleteAdminUserMenu;
	exports.getAdminUserMenuInfo = getAdminUserMenuInfo;
	exports.getAdminUserMenuList = getAdminUserMenuList;

	var common = require('module/common');

	function adminUserLogin(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserLogin";
		var data = {
			loginName: options.loginName,
			password: options.password
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function adminUserUnlogin(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserUnlogin";
		var data = {};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function adminUserModifyPassword(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserModifyPassword";
		var data = {
			oldPassword: options.oldPassword,
			newPassword: options.newPassword
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createAdminUser(options, success, fail, sync) {
		var url = "?c=adminUser&m=createAdminUser";
		var data = {
			userName: options.userName,
			loginName: options.loginName,
			password: options.password,
			admin: options.admin,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUser(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUser";
		var data = {
			userId: options.userId,
			userName: options.userName,
			loginName: options.loginName,
			password: options.password,
			admin: options.admin,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRoleId(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUserRoleId";
		var data = {
			userId: options.userId,
			roleId: options.roleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUser(options, success, fail, sync) {
		var url = "?c=adminUser&m=deleteAdminUser";
		var data = {
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserInfo(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserInfo";
		var data = {
			needSelf: options.needSelf,
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserList(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserList";
		var data = {
			userName: options.userName,
			loginName: options.loginName,
			admin: options.admin,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserRole(options, success, fail, sync) {
		var url = "?c=adminUser&m=createAdminUserRole";
		var data = {
			roleName: options.roleName,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRole(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUserRole";
		var data = {
			roleId: options.roleId,
			roleName: options.roleName,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRoleRightIdAndMenuId(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUserRoleRightIdAndMenuId";
		var data = {
			roleId: options.roleId,
			rightId: options.rightId,
			menuId: options.menuId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserRole(options, success, fail, sync) {
		var url = "?c=adminUser&m=deleteAdminUserRole";
		var data = {
			roleId: options.roleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserRoleInfo(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserRoleInfo";
		var data = {
			roleId: options.roleId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserRoleList(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserRoleList";
		var data = {
			roleName: options.roleName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserRight(options, success, fail, sync) {
		var url = "?c=adminUser&m=createAdminUserRight";
		var data = {
			rightName: options.rightName,
			rule: options.rule,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserRight(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUserRight";
		var data = {
			rightId: options.rightId,
			rightName: options.rightName,
			rule: options.rule,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserRight(options, success, fail, sync) {
		var url = "?c=adminUser&m=deleteAdminUserRight";
		var data = {
			rightId: options.rightId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserRightInfo(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserRightInfo";
		var data = {
			rightId: options.rightId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserRightList(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserRightList";
		var data = {
			rightName: options.rightName,
			rule: options.rule,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createAdminUserMenu(options, success, fail, sync) {
		var url = "?c=adminUser&m=createAdminUserMenu";
		var data = {
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyAdminUserMenu(options, success, fail, sync) {
		var url = "?c=adminUser&m=modifyAdminUserMenu";
		var data = {
			menuId: options.menuId,
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteAdminUserMenu(options, success, fail, sync) {
		var url = "?c=adminUser&m=deleteAdminUserMenu";
		var data = {
			menuId: options.menuId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getAdminUserMenuInfo(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserMenuInfo";
		var data = {
			menuId: options.menuId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getAdminUserMenuList(options, success, fail, sync) {
		var url = "?c=adminUser&m=adminUserMenuList";
		var data = {
			needSelf: options.needSelf,
			menuName: options.menuName,
			parentMenuName: options.parentMenuName,
			path: options.path,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/article',function(require, exports){
	exports.getArticleList = getArticleList;
	exports.createArticle = createArticle;
	exports.modifyArticle = modifyArticle;
	exports.deleteArticle = deleteArticle;
	exports.modifyArticleSort = modifyArticleSort;

	var common = require('module/common');

	function getArticleList(options, success, fail, sync) {
		var url = "?c=article&m=articleList";
		var data = {
			articleTitle: options.articleTitle,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createArticle(options, success, fail, sync) {
		var url = "?c=article&m=createArticle";
		var data = {
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyArticle(options, success, fail, sync) {
		var url = "?c=article&m=modifyArticle";
		var data = {
			articleId: options.articleId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteArticle(options, success, fail, sync) {
		var url = "?c=article&m=deleteArticle";
		var data = {
			articleId: options.articleId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyArticleSort(options, success, fail, sync) {
		var url = "?c=article&m=modifyArticleSort";
		var data = {
			articleId: options.articleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/banner',function(require, exports) {
	
	exports.getBannerList = getBannerList;
	exports.getBannerInfo = getBannerInfo;
	exports.createBanner = createBanner;
	exports.modifyBanner = modifyBanner;
	exports.deleteBanner = deleteBanner;
	exports.publishBanner = publishBanner;
	exports.modifyBannerSort = modifyBannerSort;

	var common = require('module/common');
	var ui = require('module/ui');
	
	function getBannerList(options, success, fail, sync) {
		var url = "?c=banner&m=bannerList";
		var data = {
			type: options.type,
			publish: options.publish,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getBannerInfo(options, success, fail, sync) {
		var url = "?c=banner&m=bannerInfo";
		var data = {
			bannerId: options.bannerId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createBanner(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=banner&m=createBanner";
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY+url;
		var file = options.file || null;
		var type = options.type || "";
		var link = options.link || "";
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		var fd = new FormData();
		fd.append("file", file);
		fd.append("type", type);
		fd.append("link", link);
		ui.showLoading();
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						success.call(this, json);
					} else {
						fail.call(this, e);	
					}
				} else {
					fail.call(this, e);		
				}
				ui.closeLoading();
			}
		};
		// 开始上传
		xhr.open("POST", url, sync);
		xhr.send(fd);
	}

	function modifyBanner(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=banner&m=modifyBanner";
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY+url;
		var bannerId = options.bannerId || 0;
		var file = options.file || null;
		var type = options.type || "";
		var link = options.link || "";
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		var fd = new FormData();
		fd.append("bannerId", bannerId);
		fd.append("file", file);
		fd.append("type", type);
		fd.append("link", link);
		ui.showLoading();
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						success.call(this, json);
					} else {
						fail.call(this, e);	
					}
				} else {
					fail.call(this, e);		
				}
				ui.closeLoading();
			}
		};
		// 开始上传
		xhr.open("POST", url, sync);
		xhr.send(fd);
	}
	
	function deleteBanner(options, success, fail, sync) {
		var url = "?c=banner&m=deleteBanner";
		var data = {
			bannerId: options.bannerId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function publishBanner(options, success, fail, sync) {
		var url = "?c=banner&m=publishBanner";
		var data = {
			bannerId: options.bannerId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyBannerSort(options, success, fail, sync) {
		var url = "?c=banner&m=modifyBannerSort";
		var data = {
			bannerId: options.bannerId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/channel',function(require, exports) {
	
	exports.getChannelInfo = getChannelInfo;
	exports.getChannelList = getChannelList;
	exports.createChannel = createChannel;
	exports.deleteChannel = deleteChannel;

	var common = require('module/common');
	var ui = require('module/ui');
	
	function createChannel(options, success, fail, sync) {
		var url = "?c=channel&m=createChannel";
		var data = {
			userId: options.userId,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
	
	function deleteChannel(options, success, fail, sync) {
		var url = "?c=channel&m=deleteChannel";
		var data = {
			channel: options.channel
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getChannelInfo(options, success, fail, sync) {
		var url = "?c=channel&m=channelInfo";
		var data = {
			channel: options.channel,
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getChannelList(options, success, fail, sync) {
		var url = "?c=channel&m=channelList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
/*反馈*/ 
define('cgi/feedback',function(require, exports) {

	exports.getFeedbackList = getFeedbackList;

	var common = require('module/common');

	function getFeedbackList(options, success, fail, sync) {
		var url = "?c=feedback&m=feedbackList";
		var data = {
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

});
/* 用户 */
define('cgi/finance',function(require, exports){
	
	exports.getRecordList = getRecordList;
	exports.getConsumeList = getConsumeList;
	exports.getIncomeList = getIncomeList;
	exports.getWithdrawList = getWithdrawList;
	exports.getChargeList = getChargeList;
	exports.getTradeList = getTradeList;
	exports.getTransferList = getTransferList;
	exports.verifyWithdraw = verifyWithdraw;

	var common = require('module/common');

	function getRecordList(options, success, fail, sync) {
		var url = "?c=finance&m=recordList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			channel: options.channel,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getConsumeList(options, success, fail, sync) {
		var url = "?c=finance&m=consumeList";
		var data = {
			userId: options.userId,
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getIncomeList(options, success, fail, sync) {
		var url = "?c=finance&m=incomeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			planId: options.planId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getWithdrawList(options, success, fail, sync) {
		var url = "?c=finance&m=withdrawList";
		var data = {
			userName: options.userName,
			status: options.status,
			accountType: options.accountType,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getChargeList(options, success, fail, sync) {
		var url = "?c=finance&m=chargeList";
		var data = {
			userName: options.userName,
			orderId: options.orderId,
			type: options.type,
			financeType: options.financeType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTradeList(options, success, fail, sync) {
		var url = "?c=finance&m=tradeList";
		var data = {
			tradeNo: options.tradeNo,
			orderId: options.orderId,
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			tradeType: options.tradeType,
			financeType: options.financeType,
			type: options.type,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTransferList(options, success, fail, sync) {
		var url = "?c=finance&m=transferList";
		var data = {
			withdrawId: options.withdrawId,
			userName: options.userName,
			batchNo: options.batchNo,
			transferNo: options.transferNo,
			beginTime: options.beginTime,
			endTime: options.endTime,
			status: options.status,
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function verifyWithdraw(options, success, fail, sync) {
		var url = "?c=finance&m=verifyWithdraw";
		var data = {
			withdrawId : options.withdrawId,
			status: options.status
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});
define('cgi/group',function(require, exports) {

	exports.getGroupInfo = getGroupInfo;
	exports.getGroupList = getGroupList;
	exports.createGroup = createGroup;
	exports.modifyGroup = modifyGroup;
	exports.modifyGroupSort = modifyGroupSort;
	exports.createGroupUser = createGroupUser;
	exports.deleteGroupUser = deleteGroupUser;
	exports.modifyGroupUserSort = modifyGroupUserSort;
	exports.getGroupUserList = getGroupUserList;

	var common = require('module/common');

	function getGroupInfo(options, success, fail, sync) {
		var url = "?c=group&m=groupInfo";
		var data = {
			groupId: options.groupId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGroupList(options, success, fail, sync) {
		var url = "?c=group&m=groupList";
		var data = {
			type: options.type,
			publish: options.publish,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createGroup(options, success, fail, sync) {
		var url = "?c=group&m=createGroup";
		var data = {
			type: options.type,
			name: options.name,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyGroup(options, success, fail, sync) {
		var url = "?c=group&m=modifyGroup";
		var data = {
			groupId: options.groupId,
			type: options.type,
			name: options.name,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyGroupSort(options, success, fail, sync) {
		var url = "?c=group&m=modifyGroupSort";
		var data = {
			groupId: options.groupId,
			type: options.type////1=上移, 2=下移, 3=置顶, 4=置底
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createGroupUser(options, success, fail, sync) {
		var url = "?c=group&m=createGroupUser";
		var data = {
			groupId: options.groupId,
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteGroupUser(options, success, fail, sync) {
		var url = "?c=group&m=deleteGroupUser";
		var data = {
			groupId: options.groupId,
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function modifyGroupUserSort(options, success, fail, sync) {
		var url = "?c=group&m=modifyGroupUserSort";
		var data = {
			groupId: options.groupId,
			userId: options.userId,
			type: options.type//1=上移, 2=下移, 3=置顶, 4=置底
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getGroupUserList(options, success, fail, sync) {
		var url = "?c=group&m=groupUserList";
		var data = {
			groupId: options.groupId,
			userName: options.userName,
			userRight: options.userRight,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
/*引导*/ 
define('cgi/guide',function(require, exports) {

	exports.getGuideList = getGuideList;

	var common = require('module/common');

	function getGuideList(options, success, fail, sync) {
		var url = "?c=guide&m=guideList";
		var data = {
			guideUserName: options.guideUserName,
			accessUserName: options.accessUserName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

});
/* 微信 */
define('cgi/jxzp',function(require, exports) {

	exports.getJxzpInfo = getJxzpInfo;
	exports.getJxzpList = getJxzpList;
	exports.createJxzp = createJxzp;
	exports.modifyJxzp = modifyJxzp;
	exports.publishJxzp = publishJxzp;

	var common = require('module/common');
	var ui = require('module/ui');

	function getJxzpInfo(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpInfo";
		var data = {
			jxzpId: options.jxzpId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getJxzpList(options, success, fail, sync) {
		var url = "?c=jxzp&m=jxzpList";
		var data = {
			teamName: options.teamName,
			type: options.type,
			status: options.status,
			publish: options.publish,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createJxzp(options, success, fail, sync) {
		var url = "?c=jxzp&m=createJxzp";
		var data = {
			type: options.type,
			teamName: options.teamName,
			matchId: options.matchId,
			oddsId: options.oddsId,
			recommend: options.recommend,
			status: options.status,
			recentContinue: options.recentContinue,
			historyContinue: options.historyContinue
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyJxzp(options, success, fail, sync) {
		var url = "?c=jxzp&m=modifyJxzp";
		var data = {
			jxzpId: options.jxzpId,
			type: options.type,
			teamName: options.teamName,
			matchId: options.matchId,
			oddsId: options.oddsId,
			recommend: options.recommend,
			status: options.status,
			recentContinue: options.recentContinue,
			historyContinue: options.historyContinue
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function publishJxzp(options, success, fail, sync) {
		var url = "?c=jxzp&m=publishJxzp";
		var data = {
			jxzpId: options.jxzpId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/match',function(require, exports) {
	
	exports.getMatchList = getMatchList;
	exports.modifyMatch = modifyMatch;

	var common = require('module/common');

	function getMatchList(options, success, fail, sync) {
		var url = "?c=match&m=matchList";
		var data = {
			needSale: options.needSale,
			number: options.number,
			league: options.league,
			home: options.home,
			away: options.away,
			type: options.type,
			beginTime: options.beginTime,
			endTime: options.endTime,
			result: options.result,
			orderBy: options.orderBy,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function modifyMatch(options, success, fail, sync) {
		var url = "?c=match&m=modifyMatch";
		var data = {
			matchId: options.matchId,
			halfResult: options.halfResult,
			result: options.result
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/order',function(require, exports){

	exports.getOrderList = getOrderList;
	exports.getMyappOrderList = getMyappOrderList;
	exports.getQmdbOrderList = getQmdbOrderList;
	exports.getLxscOrderList = getLxscOrderList;
	exports.getMfspOrderList = getMfspOrderList;
	exports.getYlwcOrderList = getYlwcOrderList;
	exports.getGlmjOrderList = getGlmjOrderList;
	exports.getGlmj1OrderList = getGlmj1OrderList;
	exports.getGlmj2OrderList = getGlmj2OrderList;
	exports.getGlmj3OrderList = getGlmj3OrderList;
	exports.getGlmj4OrderList = getGlmj4OrderList;
	exports.getGlmj5OrderList = getGlmj5OrderList;
	exports.getGlmj6OrderList = getGlmj6OrderList;
	exports.getGlmj7OrderList = getGlmj7OrderList;
	exports.getGlmj8OrderList = getGlmj8OrderList;
	exports.getGlmj9OrderList = getGlmj9OrderList;
	exports.getGlmj10OrderList = getGlmj10OrderList;
	exports.getTvsouOrderList = getTvsouOrderList;
	exports.getLl6OrderList = getLl6OrderList;
	exports.refundTicket = refundTicket;
	exports.sendTicketPrize = sendTicketPrize;
	exports.modifyTicketPrizeAmount = modifyTicketPrizeAmount;

	var common = require('module/common');

	function getOrderList(options, success, fail, sync) {
		var url = "?c=order&m=orderList";
		var data = {
			userId: options.userId,
			userName: options.userName,
			planUserName: options.planUserName,
			spreaderUserName: options.spreaderUserName,
			ticketUserName: options.ticketUserName,
			orderId: options.orderId,
			orderNo: options.orderNo,
			orderNumeric: options.orderNumeric,
			planId: options.planId,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			comboType: options.comboType,
			planMatchType: options.planMatchType,
			ticketPrizeDivideStatus: options.ticketPrizeDivideStatus,
			ticketAttachPrizeStatus: options.ticketAttachPrizeStatus,
			ticketPrizeVerifyStatus: options.ticketPrizeVerifyStatus,
			issue: options.issue,
			lotteryId: options.lotteryId,
			source: options.source,
			channel: options.channel,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMyappOrderList(options, success, fail, sync) {
		var url = "?c=order&m=myappOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getQmdbOrderList(options, success, fail, sync) {
		var url = "?c=order&m=qmdbOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLxscOrderList(options, success, fail, sync) {
		var url = "?c=order&m=lxscOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMfspOrderList(options, success, fail, sync) {
		var url = "?c=order&m=mfspOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getYlwcOrderList(options, success, fail, sync) {
		var url = "?c=order&m=ylwcOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmjOrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmjOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj1OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj1OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj2OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj2OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj3OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj3OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj4OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj4OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj5OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj5OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj6OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj6OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}


	function getGlmj7OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj7OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}


	function getGlmj8OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj8OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj9OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj9OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj10OrderList(options, success, fail, sync) {
		var url = "?c=order&m=glmj10OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTvsouOrderList(options, success, fail, sync) {
		var url = "?c=order&m=tvsouOrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLl6OrderList(options, success, fail, sync) {
		var url = "?c=order&m=ll6OrderList";
		var data = {
			userName: options.userName,
			planUserName: options.planUserName,
			orderType: options.orderType,//0=方案订单, 1=充值订单, 2=套餐订单
			status: options.status,
			planPrizeStatus: options.planPrizeStatus,
			ticketStatus: options.ticketStatus,
			planMatchType: options.planMatchType,
			comboType: options.comboType,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function refundTicket(options, success, fail, sync) {
		var url = "?c=order&m=refundTicket";
		var data = {
			orderId: options.orderId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function sendTicketPrize(options, success, fail, sync) {
		var url = "?c=order&m=sendTicketPrize";
		var data = {
			orderId: options.orderId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyTicketPrizeAmount(options, success, fail, sync) {
		var url = "?c=order&m=modifyTicketPrizeAmount";
		var data = {
			orderId: options.orderId,
			ticketPrizeAmount: options.ticketPrizeAmount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

});
/* 微信 */
define('cgi/plan',function(require, exports) {

	exports.getPlanList = getPlanList;
	exports.publishPlan = publishPlan;
	exports.richPlan = richPlan;
	exports.deletePlan = deletePlan;

	var common = require('module/common');
	var ui = require('module/ui');

	function getPlanList(options, success, fail, sync) {
		var url = "?c=plan&m=planList";
		var data = {
			userName: options.userName,
			planId: options.planId,
			publish: options.publish,
			prizeStatus: options.prizeStatus,//0=未开奖, 1=已中奖, 2=未中奖
			rich: options.rich,
			matchType: options.matchType,// 0=全部, 1=足球, 2=篮球
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function publishPlan(options, success, fail, sync) {
		var url = "?c=plan&m=publishPlan";
		var data = {
			planId: options.planId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function richPlan(options, success, fail, sync) {
		var url = "?c=plan&m=richPlan";
		var data = {
			planId: options.planId,
			rich: options.rich
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deletePlan(options, success, fail, sync) {
		var url = "?c=plan&m=deletePlan";
		var data = {
			planId: options.planId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/replay',function(require, exports){
	exports.getReplayList = getReplayList;
	exports.publishReplay = publishReplay;
	exports.deleteReplay = deleteReplay;

	var common = require('module/common');

	function getReplayList(options, success, fail, sync) {
		var url = "?c=replay&m=replayList";
		var data = {
			title: options.title,
			userName: options.userName,
			replayId: options.replayId,
			publish: options.publish,
			pageSize: options.pageSize,
			pageNum: options.pageNum
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function publishReplay(options, success, fail, sync) {
		var url = "?c=replay&m=publishReplay";
		var data = {
			replayId: options.replayId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteReplay(options, success, fail, sync) {
		var url = "?c=replay&m=deleteReplay";
		var data = {
			replayId: options.replayId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});
define('cgi/station',function(require, exports) {

	exports.getStationDepositInfo = getStationDepositInfo;
	exports.getStationDepositList = getStationDepositList;
	exports.createStationDeposit = createStationDeposit;
	exports.modifyStationDeposit = modifyStationDeposit;
	exports.deleteStationDeposit = deleteStationDeposit;

	var common = require('module/common');
	var ui = require('module/ui');

	function getStationDepositInfo(options, success, fail, sync) {
		var url = "?c=station&m=stationDepositInfo";
		var data = {
			depositId: options.depositId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStationDepositList(options, success, fail, sync) {
		var url = "?c=station&m=stationDepositList";
		var data = {
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createStationDeposit(options, success, fail, sync) {
		var url = "?c=station&m=createStationDeposit";
		var data = {
			userId: options.userId,
			date: options.date,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyStationDeposit(options, success, fail, sync) {
		var url = "?c=station&m=modifyStationDeposit";
		var data = {
			depositId: options.depositId,
			userId: options.userId,
			date: options.date,
			amount: options.amount
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteStationDeposit(options, success, fail, sync) {
		var url = "?c=station&m=deleteStationDeposit";
		var data = {
			depositId: options.depositId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});
// 日期统计
define('cgi/statistics',function(require, exports){

	exports.getStatisticsDateList = getStatisticsDateList;
	exports.getStatisticsMonthList = getStatisticsMonthList;
	exports.getStatisticsUserDateList = getStatisticsUserDateList;
	exports.getStatisticsAmountList = getStatisticsAmountList;
	exports.getStatisticsCashConsumeUserList = getStatisticsCashConsumeUserList;
	exports.getExpertStatistics198 = getExpertStatistics198;

	var common = require('module/common');

	function getStatisticsDateList(options, success, fail, sync) {
		var url = "?c=statistics&m=statisticsDateList";
		var data = {
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsMonthList(options, success, fail, sync) {
		var url = "?c=statistics&m=statisticsMonthList";
		var data = {
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsUserDateList(options, success, fail, sync) {
		var url = "?c=statistics&m=statisticsUserDateList";
		var data = {
			planPrizeRateRank: options.planPrizeRateRank,
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			dateType: options.dateType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsAmountList(options, success, fail, sync) {
		var url = "?c=statistics&m=statisticsAmountList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getStatisticsCashConsumeUserList(options, success, fail, sync) {
		var url = "?c=statistics&m=statisticsCashConsumeUserList";
		var data = {
			userName: options.userName,
			beginTime: options.beginTime,
			endTime: options.endTime,
			financeType: options.financeType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getExpertStatistics198(options, success, fail, sync) {
		var url = "?c=statistics&m=expertStatistics198";
		var data = {
			planPrizeRateRank: options.planPrizeRateRank,
			userId: options.userId,
			beginTime: options.beginTime,
			endTime: options.endTime,
			dateType: options.dateType,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
define('cgi/ticket',function(require, exports){

	exports.getTicketList = getTicketList;

	var common = require('module/common');

	function getTicketList(options, success, fail, sync) {
		var url = "?c=ticket&m=ticketList";
		var data = {
			issue: options.issue,
			lotteryId: options.lotteryId,
			status: options.status,
			userName: options.userName,
			supplierName: options.supplierName,
			orderId: options.orderId,
			ticketId: options.ticketId,
			platformId: options.platformId,
			printNo: options.printNo,
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});
/* 用户 */
define('cgi/user',function(require, exports){
	
	exports.getUserInfo = getUserInfo;
	exports.getUserList = getUserList;
	exports.getMyappUserList = getMyappUserList;
	exports.getQmdbUserList = getQmdbUserList;
	exports.getLxscUserList = getLxscUserList;
	exports.getMfspUserList = getMfspUserList;
	exports.getYlwcUserList = getYlwcUserList;
	exports.getGlmjUserList = getGlmjUserList;
	exports.getGlmj1UserList = getGlmj1UserList;
	exports.getGlmj2UserList = getGlmj2UserList;
	exports.getGlmj3UserList = getGlmj3UserList;
	exports.getGlmj4UserList = getGlmj4UserList;
	exports.getGlmj5UserList = getGlmj5UserList;
	exports.getGlmj6UserList = getGlmj6UserList;
	exports.getGlmj7UserList = getGlmj7UserList;
	exports.getGlmj8UserList = getGlmj8UserList;
	exports.getGlmj9UserList = getGlmj9UserList;
	exports.getGlmj10UserList = getGlmj10UserList;
	exports.getTvsouUserList = getTvsouUserList;
	exports.getLl6UserList = getLl6UserList;
	exports.getExpertList = getExpertList;
	exports.modifyUser = modifyUser;
	exports.modifyUserRight = modifyUserRight;
	exports.getUserVerifyList = getUserVerifyList;
	exports.verifyUser = verifyUser;
	exports.loginUser = loginUser;
	exports.getUserArticleList = getUserArticleList;
	exports.createUserArticle = createUserArticle;
	exports.modifyUserArticle = modifyUserArticle;
	exports.deleteUserArticle = deleteUserArticle;
	exports.chargeUser = chargeUser;

	var common = require('module/common');

	function getUserInfo(options, success, fail, sync) {
		var url = "?c=user&m=userInfo";
		var data = {
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserList(options, success, fail, sync) {
		var url = "?c=user&m=userList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			userRight: options.userRight,
			subscribe: options.subscribe,
			source: options.source,
			channel: options.channel,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMyappUserList(options, success, fail, sync) {
		var url = "?c=user&m=myappUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getQmdbUserList(options, success, fail, sync) {
		var url = "?c=user&m=qmdbUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLxscUserList(options, success, fail, sync) {
		var url = "?c=user&m=lxscUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMfspUserList(options, success, fail, sync) {
		var url = "?c=user&m=mfspUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getYlwcUserList(options, success, fail, sync) {
		var url = "?c=user&m=ylwcUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmjUserList(options, success, fail, sync) {
		var url = "?c=user&m=glmjUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj1UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj1UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj2UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj2UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj3UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj3UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj4UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj4UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj5UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj5UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj6UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj6UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj7UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj7UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj8UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj8UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj9UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj9UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj10UserList(options, success, fail, sync) {
		var url = "?c=user&m=glmj10UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTvsouUserList(options, success, fail, sync) {
		var url = "?c=user&m=tvsouUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLl6UserList(options, success, fail, sync) {
		var url = "?c=user&m=ll6UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getExpertList(options, success, fail, sync) {
		var url = "?c=user&m=expertList";
		var data = {
			groupId: options.groupId,
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function modifyUser(options, success, fail, sync) {
		var url = "?c=user&m=modifyUser";
		var data = {
			userId : options.userId,
			realName: options.realName,
			tag: options.tag,
			phone: options.phone,
			address: options.address,
			personalImg: options.personalImg,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function modifyUserRight(options, success, fail, sync) {
		var url = "?c=user&m=modifyUserRight";
		var data = {
			userId : options.userId,
			userRight: options.userRight
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserVerifyList(options, success, fail, sync) {
		var url = "?c=user&m=userVerifyList";
		var data = {
			userName: options.userName,
			type: options.type,
			status: options.status,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function verifyUser(options, success, fail, sync) {
		var url = "?c=user&m=verifyUser";
		var data = {
			verifyId : options.verifyId,
			status: options.status
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function loginUser(options, success, fail, sync) {
		var url = "?c=user&m=loginUser";
		var data = {
			userId : options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserArticleList(options, success, fail, sync) {
		var url = "?c=user&m=userArticleList";
		var data = {
			userId: options.userId,
			articleTitle: options.articleTitle,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createUserArticle(options, success, fail, sync) {
		var url = "?c=user&m=createUserArticle";
		var data = {
			userId: options.userId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyUserArticle(options, success, fail, sync) {
		var url = "?c=user&m=modifyUserArticle";
		var data = {
			articleId: options.articleId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteUserArticle(options, success, fail, sync) {
		var url = "?c=user&m=deleteUserArticle";
		var data = {
			articleId: options.articleId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function chargeUser(options, success, fail, sync) {
		var url = "?c=user&m=chargeUser";
		var data = {
			userId : options.userId,
			financeType : options.financeType,
			amount : options.amount,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});