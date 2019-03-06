/* 微信 */
define(function(require, exports) {

	exports.getJxzpInfo = getJxzpInfo;
	exports.getJxzpList = getJxzpList;
	exports.createJxzp = createJxzp;
	exports.modifyJxzp = modifyJxzp;
	exports.publishJxzp = publishJxzp;

	var common = require('module/common');
	var ui = require('module/ui');

	function getJxzpInfo(options, success, fail, sync) {
		var url = "?p=admin&c=jxzp&m=jxzpInfo";
		var data = {
			jxzpId: options.jxzpId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getJxzpList(options, success, fail, sync) {
		var url = "?p=admin&c=jxzp&m=jxzpList";
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
		var url = "?p=admin&c=jxzp&m=createJxzp";
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
		var url = "?p=admin&c=jxzp&m=modifyJxzp";
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
		var url = "?p=admin&c=jxzp&m=publishJxzp";
		var data = {
			jxzpId: options.jxzpId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});