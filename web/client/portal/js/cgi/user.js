define(function(require, exports) {
	
	exports.login = login;
	exports.getUserInfo = getUserInfo;
	exports.getUserList = getUserList;
	exports.getUserRankList = getUserRankList;
	exports.getGroupList = getGroupList;
	exports.withdraw = withdraw;
	exports.getUserFinanceInfo = getUserFinanceInfo;
	exports.createUserVerify = createUserVerify;
	exports.mobileToggleUser = mobileToggleUser;
	exports.bindMobile = bindMobile;
	exports.getUserArticleList = getUserArticleList;
	exports.getWinRateRankList = getWinRateRankList;
	exports.getProfitRateRankList = getProfitRateRankList;
	var common = require('module/common');
	var ui = require('module/ui');
	var weixinCgi = require('cgi/weixin');

	//登录
	function login(){
		weixinCgi.getJssdk({}, function(ret) {
			if (ret.errCode != 0) {
				UI.showNotice(ret.msg);
				return;
			}
			//防止不同用户登录同一缓存
            common.clearCache();
			var data = ret.data || {};
			var href = location.href || '';
			href = href.replace(/#\blogin\b/, '#home');
			href = encodeURIComponent(href);
			var url = location.protocol + "//" + location.host + PROXY + "?c=user&m=toggleUser&url=" + href;
			var channel = $.trim(common.getUrlParam('channel'));
			var source = $.trim(common.getUrlParam('source'));
			if (channel) {
				url += '&channel=' + channel;
			}
			if (source) {
				url += '&source=' + source;
			}
			var oauth = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect';
			oauth = oauth.replace(/\$\{appid\}/, data.appId);
			oauth = oauth.replace(/\$\{url\}/, encodeURIComponent(url));
			oauth = oauth.replace(/\$\{scope\}/, 'snsapi_userinfo');
			location.replace(oauth);
		});
	}

	function getUserInfo(options, success, fail, sync) {
		var url = "?c=user&m=userInfo";
		var data = {
			userNo: options.userNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserList(options, success, fail, sync) {
		var url = "?c=user&m=userList";
		var data = {
			groupNo: options.groupNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			mock: options.mock
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getUserRankList(options, success, fail, sync) {
		var url = "?c=user&m=userRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getGroupList(options, success, fail, sync) {
		var url = "?c=user&m=groupList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			mock: options.mock
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function withdraw(options, success, fail, sync) {
		var url = "?c=user&m=withdraw";
		var data = {
			financeType: options.financeType,
			amount: options.amount,
			accountNumber: options.accountNumber,
			accountName: options.accountName,
			accountUserName:　options.accountUserName,
			accountInfo: options.accountInfo,
			accountType: options.accountType
		};
		common.callCGI(url, "post", data, success, fail, sync);	
	}

	function getUserFinanceInfo(options, success, fail, sync) {
		var url = "?c=user&m=userFinanceInfo";
		var data = {
			financeType: options.financeType
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function createUserVerify(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=user&m=createUserVerify";
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
		var type = options.type || 0;
		var realName = options.realName || "";
		var phone = options.phone || "";
		var code = options.code || "";
		var identityImg = options.identityImg || null;
		var businessImg = options.businessImg || null;
		var remark = options.remark || "";
		var address = options.address || "";
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 0;
		var fd = new FormData();
		fd.append("type", type);
		fd.append("realName", realName);
		fd.append("phone", phone);
		fd.append("code", code);
		fd.append("remark", remark);
		fd.append("address", address);
		if (identityImg && identityImg.length) {
			//一张图片1分钟
			loadingTime += identityImg.length*60*1000;
			$.each(identityImg, function(i, item) {
				fd.append("identityImg[]", item);	
			});
		}
		if (businessImg && businessImg.length) {
			//一张图片1分钟
			loadingTime += businessImg.length*60*1000;
			$.each(businessImg, function(i, item) {
				fd.append("businessImg[]", item);	
			});
		}
		ui.showLoading(loadingTime);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var json = JSON.parse(trim(xhr.responseText));
					if (json) {
						//清除缓存
						common.clearCache('c=user&m=userInfo');
						common.clearCache('c=user&m=userList');
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

	function mobileToggleUser(options, success, fail, sync) {
		var url = "?c=user&m=mobileToggleUser";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function bindMobile(options, success, fail, sync) {
		var url = "?c=user&m=bindMobile";
		var data = {
			mobile: options.mobile,
			code: options.code
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getUserArticleList(options, success, fail, sync) {
		var url = "?c=user&m=userArticleList";
		var data = {
			userNo: options.userNo,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getWinRateRankList(options, success, fail, sync) {         //胜率榜
		var url= "?c=user&m=winRateRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getProfitRateRankList(options, success, fail, sync) {       //盈利榜
		var url= "?c=user&m=profitRateRankList";
		var data = {
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});