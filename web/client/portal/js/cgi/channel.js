define(function(require, exports) {

	exports.getStatisticsList = getStatisticsList;
	exports.getChannelUserList = getChannelUserList;
	exports.getChannelOrderList = getChannelOrderList;
	exports.getShareLink = getShareLink;

	var common = require('module/common');
	var ui = require('module/ui');

	function getStatisticsList(options, success, fail, sync) {
		var url = "?c=channel&m=statisticsList";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getChannelUserList(options, success, fail, sync) {
		var url = "?c=channel&m=channelUserList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getChannelOrderList(options, success, fail, sync) {
		var url = "?c=channel&m=channelOrderList";
		var data = {
			userId: options.userId,
			beginTime: options.beginTime,
			endTime: options.endTime,
			ticketType: options.ticketType, //1=竞技彩 2=高频彩
			userName: options.userName,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getShareLink(options, success, fail, sync) {
		var url = "?c=channel&m=getShareLink";
		var data = {
			
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});