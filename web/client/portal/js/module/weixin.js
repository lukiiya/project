define(function(require, exports) {

	exports.call = call;

	var common = require('module/common');
	var weixinCgi = require('cgi/weixin');
	var ui = require('module/ui');
	var jsApiList = [
		'checkJsApi',
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'onMenuShareQZone',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'translateVoice',
		'startRecord',
		'stopRecord',
		'onVoiceRecordEnd',
		'playVoice',
		'onVoicePlayEnd',
		'pauseVoice',
		'stopVoice',
		'uploadVoice',
		'downloadVoice',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'getNetworkType',
		'openLocation',
		'getLocation',
		'hideOptionMenu',
		'showOptionMenu',
		'closeWindow',
		'scanQRCode',
		'chooseWXPay',
		'openProductSpecificView',
		'addCard',
		'chooseCard',
		'openCard'
	];
	var jssdkReady = false;

	config(jsApiList);

	function config(api, success, error) {
		if (!common.isWeixinBrowser() || !isObject(window.jWeixin)) {
			return;
		}
		if (!isFunction(success)) {
			success = function() {};
		}
		if (!isFunction(error)) {
			error = function() {};
		}
		if (isString(api)) {
			api = [api];
		}
		if (!isArray(api)) {
			ui.showNotice("微信api传参有误");
			return;
		}
		weixinCgi.getJssdk({}, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			jWeixin.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: api
			});
			//配置成功回调
			jWeixin.ready(function() {
				jssdkReady = true;
				success(jWeixin);
			});
			jWeixin.error(function (res) {
				error(res);
			});
		});
	}

	function call(api, options) {
		api = api.replace(/\s/g, "");
		if (!isObject(window.jWeixin) || !isFunction(jWeixin[api])) {
			return;
		}
		if (jssdkReady) {
			jWeixin[api].call(window, options);	
		} else {
			config(jsApiList, function() {
				jWeixin[api].call(window, options);	
			});	
		}
	}
});