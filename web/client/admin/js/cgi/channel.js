define(function(require, exports) {
	
	exports.getChannelInfo = getChannelInfo;
	exports.getChannelList = getChannelList;
	exports.createChannel = createChannel;
	exports.deleteChannel = deleteChannel;

	var common = require('module/common');
	var ui = require('module/ui');
	
	function createChannel(options, success, fail, sync) {
		var url = "?p=admin&c=channel&m=createChannel";
		var data = {
			userId: options.userId,
			remark: options.remark
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}
	
	function deleteChannel(options, success, fail, sync) {
		var url = "?p=admin&c=channel&m=deleteChannel";
		var data = {
			channel: options.channel
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getChannelInfo(options, success, fail, sync) {
		var url = "?p=admin&c=channel&m=channelInfo";
		var data = {
			channel: options.channel,
			userId: options.userId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getChannelList(options, success, fail, sync) {
		var url = "?p=admin&c=channel&m=channelList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});