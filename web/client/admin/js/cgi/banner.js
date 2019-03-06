define(function(require, exports) {
	
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
		var url = "?p=admin&c=banner&m=bannerList";
		var data = {
			type: options.type,
			publish: options.publish,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getBannerInfo(options, success, fail, sync) {
		var url = "?p=admin&c=banner&m=bannerInfo";
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
		var url = "?p=admin&c=banner&m=createBanner";
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
		var url = "?p=admin&c=banner&m=modifyBanner";
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
		var url = "?p=admin&c=banner&m=deleteBanner";
		var data = {
			bannerId: options.bannerId
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function publishBanner(options, success, fail, sync) {
		var url = "?p=admin&c=banner&m=publishBanner";
		var data = {
			bannerId: options.bannerId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyBannerSort(options, success, fail, sync) {
		var url = "?p=admin&c=banner&m=modifyBannerSort";
		var data = {
			bannerId: options.bannerId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});