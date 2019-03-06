define(function(require, exports) {

	exports.createPlan = createPlan;
	exports.getPlanInfo = getPlanInfo;
	exports.getPlanList = getPlanList;
	exports.getPlanTrendList = getPlanTrendList;
	exports.getPlanPrice = getPlanPrice;
	exports.planUpCount = planUpCount;
	exports.planDownCount = planDownCount;
	exports.planShareCount = planShareCount;
	exports.createDigitalPlan = createDigitalPlan;
	exports.getDigitalPlanList = getDigitalPlanList;
	exports.getDigitalPlanInfo = getDigitalPlanInfo;

	var common = require('module/common');
	var ui = require('module/ui');

	function createPlan(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=plan&m=createPlan";
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
		var matchRecommend = options.matchRecommend || "";
		var content = options.content || "";
		var amount = options.amount || 0;
		var matchType = options.matchType || 0;
		var title = options.title || "";
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("matchRecommend", matchRecommend);
		fd.append("content", content);
		fd.append("amount", amount);
		fd.append("matchType", matchType);
		fd.append("title", title);
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
						common.clearCache('c=plan&m=planList');//清除缓存
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

	function getPlanInfo(options, success, fail, sync) {
		var url = "?c=plan&m=planInfo";
		var data = {
			needUser: options.needUser,
			planNo: options.planNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getPlanList(options, success, fail, sync) {
		var url = "?c=plan&m=planList";
		var data = {
			matchType: options.matchType,//1=足球，2=篮球
			groupNo: options.groupNo,
			matchId: options.matchId,
			userNo: options.userNo,
			needHome: options.needHome,
			needGirl: options.needGirl,
			needSale: options.needSale,
			needSaleTicket: options.needSaleTicket,
			needUser: options.needUser,
			needAccess: options.needAccess,
			matchStatus: options.matchStatus,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			recommendType: options.recommendType,//1=单关, 2=串关
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	//方案走势
	function getPlanTrendList(options, success, fail, sync) {
		var url = "?c=plan&m=planTrendList";
		var data = {
			userNo: options.userNo,
			recommendType: options.recommendType//1=单关, 2=串关
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getPlanPrice(options, success, fail, sync) {
		var url = "?c=plan&m=planPrice";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	//方案点赞计数
	function planUpCount(options, success, fail, sync) {
		var url = "?c=plan&m=planUpCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//方案鄙视计数
	function planDownCount(options, success, fail, sync) {
		var url = "?c=plan&m=planDownCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	//方案分享计数
	function planShareCount(options, success, fail, sync) {
		var url = "?c=plan&m=planShareCount";
		var data = {
			planNo: options.planNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}	
	
	//数字彩发推荐
	function createDigitalPlan(options, success, fail, sync) {
		options = options || {};
		success = success || function() {};
		fail = fail || function() {};
		sync = !sync;
		var url = "?c=plan&m=createDigitalPlan";
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
		var content = options.content || "";
		var amount = options.amount || 0;
		var lotteryId = options.lotteryId;
		var issue = options.issue;
		var betContent = options.betContent || '';
		var file = options.file || null;
		var xhr = new XMLHttpRequest();
		if (!xhr.upload) {
			ui.showNotice('当前浏览器不支持上传');
			return;
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		var fd = new FormData();
		fd.append("content", content);
		fd.append("amount", amount);
		fd.append("lotteryId", lotteryId);
		fd.append("issue", issue);
		fd.append("betContent", betContent);
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
						common.clearCache('c=plan&m=digitalPlanList');//清除缓存
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
	
	function getDigitalPlanList(options, success, fail, sync) {
		var url = "?c=plan&m=digitalPlanList";
		var data = {
			lotteryId: options.lotteryId,
			groupNo: options.groupNo,
			userNo: options.userNo,
			needSaleTicket: options.needSaleTicket,//是否可以跟单
			needUser: options.needUser,
			needAccess: options.needAccess,
			planStatus: options.planStatus,//1=未结束, 2=已结束
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getDigitalPlanInfo(options, success, fail, sync) {
		var url = "?c=plan&m=digitalPlanInfo";
		var data = {
			needUser: options.needUser,
			planNo: options.planNo
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});