define(function(require, exports){
	exports.getReplayList = getReplayList;
	exports.publishReplay = publishReplay;
	exports.deleteReplay = deleteReplay;

	var common = require('module/common');

	function getReplayList(options, success, fail, sync) {
		var url = "?p=admin&c=replay&m=replayList";
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
		var url = "?p=admin&c=replay&m=publishReplay";
		var data = {
			replayId: options.replayId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteReplay(options, success, fail, sync) {
		var url = "?p=admin&c=replay&m=deleteReplay";
		var data = {
			replayId: options.replayId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});