define(function(require, exports) {
	
	exports.createReplay = createReplay;
	exports.getReplayInfo = getReplayInfo;
	exports.getReplayList = getReplayList;
	exports.replayUpCount = replayUpCount;
	exports.replayDownCount = replayDownCount;
	exports.replayShareCount = replayShareCount;

	var common = require('module/common');
	var ui = require('module/ui');
	
	function createReplay(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=replay&m=createReplay";
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY+url;
		var channel = $.trim(common.getUrlParam('channel'));
		var source = $.trim(common.getUrlParam('source'));
		var uoAuth = $.trim(common.getUrlParam('uoAuth'));
		var uoSign = $.trim(common.getUrlParam('uoSign'));
		if (channel) {
			url += '&channel=' + channel;
		}
		if (source && uoAuth && uoSign) {
			url += '&source=' + source + '&uoAuth=' + uoAuth + '&uoSign=' + uoSign;
		}
		var title = options.title || "";
		var content = options.content || "";
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("title", title);
		fd.append("content", content);
		if (file && file.length) {
			//一张图片1分钟
			loadingTime = file.length*60*1000;
			$.each(file, function(i, item) {
				fd.append("file[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						common.clearCache('c=replay&m=replayList');//清除缓存
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
	
	function getReplayInfo(options, success, fail, sync) {
		var url = "?c=replay&m=replayInfo";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getReplayList(options, success, fail, sync) {
		var url = "?c=replay&m=replayList";
		var data = {
			needUser: options.needUser,
			needAll: options.needAll,
			userNo: options.userNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	//复盘点赞计数
	function replayUpCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayUpCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//复盘鄙视计数
	function replayDownCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayDownCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//复盘分享计数
	function replayShareCount(options, success, fail, sync) {
		var url = "?c=replay&m=replayShareCount";
		var data = {
			replayNo: options.replayNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});