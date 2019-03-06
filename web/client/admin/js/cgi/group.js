define(function(require, exports) {

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
		var url = "?p=admin&c=group&m=groupInfo";
		var data = {
			groupId: options.groupId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGroupList(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=groupList";
		var data = {
			type: options.type,
			publish: options.publish,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createGroup(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=createGroup";
		var data = {
			type: options.type,
			name: options.name,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyGroup(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=modifyGroup";
		var data = {
			groupId: options.groupId,
			type: options.type,
			name: options.name,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyGroupSort(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=modifyGroupSort";
		var data = {
			groupId: options.groupId,
			type: options.type////1=上移, 2=下移, 3=置顶, 4=置底
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function createGroupUser(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=createGroupUser";
		var data = {
			groupId: options.groupId,
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteGroupUser(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=deleteGroupUser";
		var data = {
			groupId: options.groupId,
			userId: options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function modifyGroupUserSort(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=modifyGroupUserSort";
		var data = {
			groupId: options.groupId,
			userId: options.userId,
			type: options.type//1=上移, 2=下移, 3=置顶, 4=置底
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getGroupUserList(options, success, fail, sync) {
		var url = "?p=admin&c=group&m=groupUserList";
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