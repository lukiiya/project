/* 用户 */
define(function(require, exports){
	
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
	exports.forbidUser = forbidUser;
	exports.allowUser = allowUser;

	var common = require('module/common');

	function getUserInfo(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=userInfo";
		var data = {
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=userList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			userRight: options.userRight,
			subscribe: options.subscribe,
			forbid: options.forbid,
			source: options.source,
			channel: options.channel,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMyappUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=myappUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getQmdbUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=qmdbUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLxscUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=lxscUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMfspUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=mfspUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getYlwcUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=ylwcUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmjUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmjUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj1UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj1UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj2UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj2UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj3UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj3UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj4UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj4UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj5UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj5UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj6UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj6UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj7UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj7UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj8UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj8UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj9UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj9UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGlmj10UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=glmj10UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getTvsouUserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=tvsouUserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getLl6UserList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=ll6UserList";
		var data = {
			userName: options.userName,
			phone: options.phone,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getExpertList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=expertList";
		var data = {
			groupId: options.groupId,
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function modifyUser(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=modifyUser";
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
		var url = "?p=admin&c=user&m=modifyUserRight";
		var data = {
			userId : options.userId,
			userRight: options.userRight
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserVerifyList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=userVerifyList";
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
		var url = "?p=admin&c=user&m=verifyUser";
		var data = {
			verifyId : options.verifyId,
			status: options.status
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function loginUser(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=loginUser";
		var data = {
			userId : options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserArticleList(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=userArticleList";
		var data = {
			userId: options.userId,
			articleTitle: options.articleTitle,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createUserArticle(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=createUserArticle";
		var data = {
			userId: options.userId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyUserArticle(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=modifyUserArticle";
		var data = {
			articleId: options.articleId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteUserArticle(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=deleteUserArticle";
		var data = {
			articleId: options.articleId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function chargeUser(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=chargeUser";
		var data = {
			userId : options.userId,
			financeType : options.financeType,
			amount : options.amount,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function forbidUser(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=forbidUser";
		var data = {
			userId : options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function allowUser(options, success, fail, sync) {
		var url = "?p=admin&c=user&m=allowUser";
		var data = {
			userId : options.userId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
});