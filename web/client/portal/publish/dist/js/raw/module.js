define('module/common',function(require, exports) {
	
	exports.ZH = ZH;
	exports.PL = PL;
	exports.round = round;
	exports.formatDate = formatDate;
	exports.callCGI = callCGI;
	exports.getUrlParam = getUrlParam;
	exports.encode = encode;
	exports.decode = decode;
	exports.validHashEncode = validHashEncode;
	exports.hashEncode = hashEncode;
	exports.hashDecode = hashDecode;
	exports.htmlEncode = htmlEncode;
	exports.htmlDecode = htmlDecode;
	exports.log = log;
	exports.getLocationHash = getLocationHash;
	exports.locationUrl = locationUrl;
	exports.historyBack = historyBack;
	exports.isLogin = isLogin;
	exports.isApp = isApp;
	exports.isAndroid = isAndroid;
	exports.isIos = isIos;
	exports.isWeixinBrowser = isWeixinBrowser;
	exports.isAndroidBrowser = isAndroidBrowser;
	exports.isIosBrowser = isIosBrowser;
	exports.setHistoryBack = setHistoryBack;
	exports.setCache = setCache;
	exports.getCache = getCache;
	exports.clearCache = clearCache;
	exports.getResourceUrl = getResourceUrl;
	exports.verifyMobile = verifyMobile;
	exports.getLoginUser = getLoginUser;

	require('external/jquery.md5');
	var userCgi = require('cgi/user');
	var ui = require('module/ui');
	var weixin = require('module/weixin');

	//从arr挑num个组合
    function ZH(arr, num) {
        var r = [];
        (function f(t, a, n) {
            if (n == 0)return r.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat(a[i]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return r;
    }

    //从arr挑num个排列
    function PL(arr, num) {
        var r = [];
        (function f(t, a, n) {
            if (n == 0)return r.push(t);
            for (var i = 0, l = a.length; i < l; i++) {
                f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
            }
        })([], arr, num);
        return r;
    }

	//四舍六入五成双
	//"四"是指≤4 时舍去，"六"是指≥6时进上
	//"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。(0是最小的偶数)
    function round(num, precision) {
    	precision = parseInt(precision) || 1;
    	var pow = Math.pow(10, precision);
	    if((Math.floor(num * pow * 10) % 5 == 0) && (Math.floor(num * pow * 10) == num * pow * 10) && (Math.floor(num * pow) % 2 == 0)) {
	        return Math.floor(num * pow) / pow;
	    }else{
	        return Math.round(num * pow)/pow;
	    }
	}
	
	function roundSp(num, digit) {
		var ratio = Math.pow(10, digit),
			_num = num * ratio,
			decimals = _num % 1,
			integer = Math.floor(_num);
		if (decimals > 0.5) {
			return (integer + 1) / ratio;
	    } else if (decimals < 0.5) {
	    	return integer / ratio;
	    } else {
	    	return (integer % 2 === 0 ? integer : integer + 1) / ratio;
	    }
	}
	//格式化时间
	function formatDate(date, formatStr) {
		date = (/^\d+$/.test(date) && new Date(date)) || date;
		var addZero = function (v,size) {
		    for(var i=0,len=size-(v+"").length;i<len;i++){
		        v="0"+v;
		    };
		    return v+"";
		}
	    //格式化时间
	    var arrWeek=['日','一','二','三','四','五','六'],
	        str=formatStr
	            .replace(/yyyy|YYYY/,date.getFullYear())
	            .replace(/yy|YY/,addZero(date.getFullYear() % 100,2)   )
	            .replace(/mm|MM/,addZero(date.getMonth()+1,2))
	            .replace(/m|M/g,date.getMonth()+1)
	            .replace(/dd|DD/,addZero(date.getDate(),2) )
	            .replace(/d|D/g,date.getDate())
	            .replace(/hh|HH/,addZero(date.getHours(),2))
	            .replace(/h|H/g,date.getHours())
	            .replace(/ii|II/,addZero(date.getMinutes(),2))
	            .replace(/i|I/g,date.getMinutes())
	            .replace(/ss|SS/,addZero(date.getSeconds(),2))
	            .replace(/s|S/g,date.getSeconds())
	            .replace(/w/g,date.getDay())
	            .replace(/W/g,arrWeek[date.getDay()]); 
	    return str; 
	}

	function setCache(cacheKey, data, timeout) {
		window.localStorage || (window.localStorage = {});
		var cache = {
			data: data,
			time: (new Date()).getTime(),
			timeout: timeout || 2000*60
		}
		localStorage[cacheKey] = JSON.stringify(cache);
		if (ENV == 'dev') {
			log("\n设置缓存 ["+cacheKey+"] = "+localStorage[cacheKey]+"\n");
		}
	}

	function getCache(cacheKey) {
		window.localStorage || (window.localStorage = {});
		var data = null;
		try {
			var cache = JSON.parse($.trim(localStorage[cacheKey]));
			if (cache) {
				var time = cache.time;
				var timeout = cache.timeout;
				var curTime = (new Date()).getTime();
				if (curTime-time <= timeout && cache.data) {
					data = cache.data;
				}
			}
		} catch(e) {

		}
		if (ENV == 'dev' && data) {
			log("\n读取缓存 ["+cacheKey+"] = "+JSON.stringify(data)+"\n\n");
		}
		return data;
	}

	function clearCache(cacheKey) {
		cacheKey = $.trim(cacheKey || "");
		window.localStorage || (window.localStorage = {});
		var keys = [];
		if ("length" in localStorage) {
			//html5的localStorage
			for (var i = 0, length = localStorage.length; i < length; i++) {
				keys.push(localStorage.key(i));
			}	
		} else {
			//模拟的localStorage	
			$.each(localStorage,function (key,value) {
				keys.push(key);
			});
		}
		$.each (keys,function (i,key) {
			if (cacheKey == "" || key.indexOf(cacheKey) != -1) {
				localStorage[key] = "";
				localStorage.removeItem && localStorage.removeItem(key);
			}
		});	
	}

	function getCGICacheKey(url, data) {
		var cacheKey = "CGI: "+url;
		//参数名按ASCII字母排序；例如：classId=&keyword=&pageNum=1&pageSize=10
		var param = $.trim($.param(data).split("&").sort().join("&"));
		if (param != "") {
			if (cacheKey.indexOf('?') == -1) {
				cacheKey = cacheKey + "?" + param;
			} else {
				cacheKey = cacheKey + "&" + param;
			}
		}
		return cacheKey;
	}

	function getCGICache(url, data) {
		var cache = null;
		var cacheKey = getCGICacheKey(url, data);
		if (CACHE_CGI && cacheKey) {
			cache = getCache(cacheKey);	
		}
		return cache;
	}

	function setCGICache(url, data, ret) {
		if (!url || !ret) {
			return;
		}
		//ajax成功，要清除相关缓存，防止数据不是最新的
		if (/c=activity&m=(?:receiveHongBao|receiveHongBao2017ChunJie)/.test(url)) {
			clearCache('c=finance&m=chargeList');
			clearCache('c=user&m=userFinanceInfo');
			clearCache('c=sign&m=signInfo');
			return;
		}
		if (/c=focus&m=(?:createFocus|cancelFocus|activeFocus)/.test(url)) {
			clearCache('c=focus&m=focusList');
			clearCache('c=user&m=userInfo');//用户详情页的关注字段
			clearCache('c=user&m=userList');
			return;
		}
		if (/c=order&m=(?:createOrder|createChargeOrder|createComboOrder)/.test(url)) {
			clearCache('c=finance&m=chargeList');
			clearCache('c=jxzp&m=jxzpList');
			clearCache('c=order&m=orderList');
			clearCache('c=plan&m=planInfo');
			clearCache('c=plan&m=planList');
			clearCache('c=plan&m=digitalPlanInfo');
			clearCache('c=plan&m=digitalPlanList');
			clearCache('c=match&m=hotMatchList');
			clearCache('c=match&m=hotMatchLeagueList');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=plan&m=(?:planUpCount|planDownCount|planShareCount)/.test(url)) {
			clearCache('c=match&m=hotMatchList');
			clearCache('c=match&m=hotMatchLeagueList');
			clearCache('c=plan&m=planInfo');
			clearCache('c=plan&m=planList');
			clearCache('c=plan&m=digitalPlanInfo');
			clearCache('c=plan&m=digitalPlanList');
			return;
		}
		if (/c=sign&m=createSign/.test(url)) {
			clearCache('c=finance&m=chargeList');
			clearCache('c=sign&m=signInfo');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=user&m=(?:withdraw|mobileToggleUser|bindMobile)/.test(url)) {
			clearCache('c=finance&m=chargeList');
			clearCache('c=finance&m=withdrawList');
			clearCache('c=sign&m=signInfo');
			clearCache('c=user&m=userInfo');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=order&m=(?:createTicketOrder|createTicketChargeOrder|sendTicketPrize|createSelfTicketOrder|createBatchTicketOrder|createDigitalTicketOrder|createPresentOrder|receiveOrder)/.test(url)) {
			clearCache('c=order&m=ticketOrderList');
			clearCache('c=order&m=ticketOrderInfo');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=order&m=(?:createSmlrOrder)/.test(url)) {
			clearCache('c=smlr&m=smlrInfo');
			clearCache('c=smlr&m=hasSmlrInfo');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=order&m=(?:createJxzpOrder)/.test(url)) {
			clearCache('c=jxzp&m=jxzpInfo');
			clearCache('c=jxzp&m=hasJxzpInfo');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		if (/c=activity&m=(?:rotateTurnplate)/.test(url)) {
			clearCache('c=finance&m=chargeList');
			clearCache('c=user&m=userFinanceInfo');
			return;
		}
		//特别处理判断领红包接口
		if (url.indexOf('c=activity&m=isReceiveHongBao') != -1 && !ret.data) {
			return;
		}
		var cacheMap = {
			'c=activity&m=activityInfo&?[\\s\\S]*': 10*1000*60,
			'c=activity&m=isReceiveHongBao&?[\\s\\S]*': 10*1000*60,
			'c=banner&m=bannerList&?[\\s\\S]*': 10*1000*60,
			'c=combo&m=comboList&?[\\s\\S]*': 10*1000*60,
			'c=finance&m=chargeList&?[\\s\\S]*': 10*1000*60,
			'c=finance&m=withdrawList&?[\\s\\S]*': 10*1000*60,
			'c=focus&m=focusList&?[\\s\\S]*': 10*1000*60,
			'c=jxzp&m=jxzpList&?[\\s\\S]*': 10*1000*60,
			'c=jxzp&m=jxzpStatistics&?[\\s\\S]*': 10*1000*60,
			'c=jxzp&m=jxzpInfo&?[\\s\\S]*': 10*1000*60,
			'c=jxzp&m=hasJxzpInfo&?[\\s\\S]*': 10*1000*60,
			'c=smlr&m=smlrInfo&?[\\s\\S]*': 10*1000*60,
			'c=smlr&m=hasSmlrInfo&?[\\s\\S]*': 10*1000*60,
			'c=match&m=matchInfo&?[\\s\\S]*': 10*1000*60,
			'c=match&m=matchList&?[\\s\\S]*': 10*1000*60,
			'c=match&m=hotMatchList&?[\\s\\S]*': 10*1000*60,
			'c=match&m=hotMatchLeagueList&?[\\s\\S]*': 10*1000*60,
			'c=order&m=orderList&?[\\s\\S]*': 10*1000*60,
			//'c=order&m=ticketOrderList&?[\\s\\S]*': 10*1000*60,
			//'c=order&m=ticketOrderInfo&?[\\s\\S]*': 10*1000*60,
			'c=plan&m=planInfo&?[\\s\\S]*': 10*1000*60,
			'c=plan&m=planList&?[\\s\\S]*': 10*1000*60,
			'c=plan&m=digitalPlanInfo&?[\\s\\S]*': 10*1000*60,
			'c=plan&m=digitalPlanList&?[\\s\\S]*': 10*1000*60,
			'c=plan&m=planPrice&?[\\s\\S]*': 10*1000*60,
			'c=sign&m=signInfo&?[\\s\\S]*': 10*1000*60,
			'c=user&m=userInfo&?[\\s\\S]*': 10*1000*60,
			'c=user&m=userList&?[\\s\\S]*': 10*1000*60,
			'c=user&m=userRankList&?[\\s\\S]*': 10*1000*60,
			'c=user&m=winRateRankList&?[\\s\\S]*': 10*1000*60,
			'c=user&m=profitRateRankList&?[\\s\\S]*': 10*1000*60,
			'c=user&m=groupList&?[\\s\\S]*': 10*1000*60,
			'c=user&m=userFinanceInfo&?[\\s\\S]*': 10*1000*60,
			'c=user&m=userArticleList&?[\\s\\S]*': 10*1000*60
		}
		var cacheKey = getCGICacheKey(url, data);
		if (CACHE_CGI && cacheKey) {
			for (var key in cacheMap) {
				var key = trim(key) || '';
				var value = parseInt(cacheMap[key]) || 0;
				if (!key || value <= 0) {
					continue;
				}
				var reg = new RegExp(key);
				if (reg.exec(cacheKey)) {
					setCache(cacheKey, ret, value);
					break;
				}
			}
		}
	}

	//统一CGI访问函数
	function callCGI(url, type, data, success, fail, sync) {
		var cgiUrl = url;
		var cgiData = data;
		var cache = getCGICache(cgiUrl, cgiData);
		if (cache) {
			if(isFunction(success))success(cache);
			return;	
		}
		ui.showLoading();
		type = (type || "").toLowerCase();
		//如果success和fail传的是布尔值，就把他们当作sync(同步)参数
		if(isBoolean(success))sync = success;
		else if(isBoolean(fail))sync = fail;
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY + url;
		var channel = $.trim(getUrlParam('channel'));
		var source = $.trim(getUrlParam('source'));
		var uoAuth = $.trim(getUrlParam('uoAuth'));
		var uoSign = $.trim(getUrlParam('uoSign'));
		if (channel) {
			url += '&channel=' + channel;
		}
		if (source && uoAuth && uoSign) {
			//涉及到订单支付必须source=0,否则app内嵌异常
			if (/create\w*Order/.test(url)) {
				source = 0;
			}
			url += '&source=' + source + '&uoAuth=' + uoAuth + '&uoSign=' + uoSign;
		}
		$.ajax({
			url: url,
			type: type || "get",
			data: data || {},
			dataType: 'json',
			contentType: isString(data) ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded',
			async: !sync,
			cache: false,
			error: function(ret) {
				ui.closeLoading();
				//ui.showNotice("服务繁忙，请稍候重试！");
				if(isFunction(fail))fail.call(this,ret);
			},
			success: function(ret) {
				ui.closeLoading();
				if (data['noJumpLogin'] !== true) {
					if (ret.errCode == "1") {
						ui.clear();
						if (isWeixinBrowser()) {
							userCgi.login();
						} else {
							var toHash = $.trim(getUrlParam("toHash"));
							toHash = toHash || encodeURIComponent(getLocationHash());
							var hash = "login";
							if (HASH_ENCODE) {
								if(toHash && !(/login/.test(hashDecode(toHash))))hash += "&toHash="+toHash;
							} else {
								if(toHash && !(/login/.test(toHash)))hash += "&toHash="+toHash;
							}
							locationUrl("#"+hash);
						}
						return;
					} else if (ret.errCode == 0) {
						setCGICache(cgiUrl, cgiData, ret);
					}
				} else {
					setCGICache(cgiUrl, cgiData, ret);	
				}
				if(isFunction(success))success.call(this,ret);
			}
		});	
	}

	//获取url参数
	function getUrlParam(name, url){
		var value = '';
		name = $.trim(name);
		url = url || window.location.search;
		var re = new RegExp("\\b"+name+"\\b=([^&=\?]+)");
		var st = url.match(re);
		//只有一个参数，才自动去匹配url的hash
		if((!st || st.length != 2) && arguments.length == 1){
			var hash = getLocationHash();
			if(validHashEncode(hash)){
				hash = hashDecode(hash);
			}
			st = hash.match(re);
		}
		if(st && st.length == 2)value = $.trim(st[1]);
		return value;
	}

	function encode(str, key){
		key = key || "";
		var codes = [];
		for (var i = 0, length = str.length; i < length; i++) {
			var code = str.charCodeAt(i);
			for (var j = 0, len = key.length; j < len; j++) {
				code ^= key.charCodeAt(j);
			}
			codes.push(code);
		}
		return escape(String.fromCharCode.apply(null,codes));
	}

	function decode(str, key){
		key = key || "";
		str = unescape(str);
		var codes = [];
		for (var i = 0, length = str.length; i < length; i++) {
			var code = str.charCodeAt(i);
			for (var j = key.length - 1; j >= 0; j--) {
				code ^= key.charCodeAt(j);
			}
			codes.push(code);
		}
		return String.fromCharCode.apply(null,codes);
	}

	function validHashEncode(str){
		str = $.trim(str.replace(/#/g,""));
		var ret = false;
		var key = "kindergarten";
		var st = str.split("&");
		if(st.length == 2){
			ret = $.md5($.trim(st[0])+key) === $.trim(st[1]);
		}
		return ret;
	}

	function hashEncode(str){
		str = $.trim(str.replace(/#/g,""));
		var hashEncodeCacheKey = 'HASH_ENCODE: ' + str;
		var cacheRet = $.trim(getCache(hashEncodeCacheKey));
		if(cacheRet != ""){
			return cacheRet;
		}
		var ret = "";
		var key = "kindergarten";
		ret = encodeURIComponent(encode(str,key));
		ret = ret + "&" + $.md5(ret+key);
		setCache(hashEncodeCacheKey,ret,24*3600*1000);
		return ret;
	}

	function hashDecode(str){
		str = $.trim(str.replace(/#/g,""));
		var hashDecodeCacheKey = 'HASH_DECODE: ' + str;
		var cacheRet = $.trim(getCache(hashDecodeCacheKey));
		if(cacheRet != ""){
			return cacheRet;
		}
		var ret = "";
		var key = "kindergarten";
		if(validHashEncode(str)){
			var st = str.split("&");
			if(st.length == 2){
				var hash = decodeURIComponent($.trim(st[0]));
				ret = decode(hash,key);
				setCache(hashDecodeCacheKey,ret,24*3600*1000);
			}
		}
		return ret;			
	}

	function htmlEncode(html){
		var temp = document.createElement("div");
		(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	}

	function htmlDecode(text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	}

	//打印日志
	function log(str){
		str = (isString(str) && str) || (isObject(str) && JSON.stringify(str)) || str;
		window.console && window.console.log(str);
	}

	function getLocationHash() {
		//由于firefox对location.hash的读取存在偏差，所以用此函数替换
		var href = window.location.href;
		var hash = "";
		var index =  href.indexOf("#");
		if(index != -1){
			hash = $.trim(href.substr(index));	
		}
		return hash;
	}

	function locationUrl(url, target) {
		if(HASH_ENCODE && /^#/.test(url) && !validHashEncode(url)){
			url = "#"+hashEncode(url);
		}
		var source = $.trim(getUrlParam('source'));
		var uoAuth = $.trim(getUrlParam('uoAuth'));
		var uoSign = $.trim(getUrlParam('uoSign'));
		if (!(/\/alipay\.html/.test(url)) && source && uoAuth && uoSign) {
			url += '&source=' + source + '&uoAuth=' + uoAuth + '&uoSign=' + uoSign;	
		}
		//可以支持多种跳转方式，而且document.referrer做记录
		target = target || "_self";
		var dom = document.createElement("a");
		if(dom.click){
			//a标签
			dom.style.display = 'none';
			dom.target = target;
			dom.href = url;
			dom.innerHTML = '&nbsp;';
			document.body.appendChild(dom);
			dom.click();
		}else {
			//safari不支持 a 标签 click
			dom = document.createElement("form");
			dom.style.display = 'none';
			dom.target = target;
			dom.action = url;
			document.body.appendChild(dom);
			dom.submit();
		}
		try{
			document.body.removeChild(dom);
		}catch(e){}
	}

	function historyBack() {
		var length = parseInt(history.length) || 0;
		if (length <= 1) {
			locationUrl('#');
		} else {
			history.back();	
		}	
	}

	function isLogin() {
		var cookie = document.cookie || '';
		return /is_login=true/.test(cookie);
	}

	function isApp() {
		return isAndroid() || isIos();
	}
	
	function isAndroid() {
		var source = parseInt(getUrlParam("source")) || 0;
		return source == 1;		
	}

	function isIos() {
		var source = parseInt(getUrlParam("source")) || 0;
		return source == 2;	
	}

	//判断是否在微信浏览器里
	function isWeixinBrowser() {
		return /micromessenger/i.test(navigator.userAgent);
	}

	//判断是否在安卓浏览器里
	function isAndroidBrowser() {
		return /(Android)/i.test(navigator.userAgent);
	}

	//判断是否在苹果浏览器里
	function isIosBrowser() {
		return  /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
	}

	function setHistoryBack(href) {
		var url = window.location.href;
		var source = $.trim(getUrlParam('source'));
		var uoAuth = $.trim(getUrlParam('uoAuth'));
		var uoSign = $.trim(getUrlParam('uoSign'));
		if (source && uoAuth && uoSign) {
			href += '&source=' + source + '&uoAuth=' + uoAuth + '&uoSign=' + uoSign;	
		}
		var history = window.history;
		if(history.pushState && history.replaceState){
			window.history.replaceState({}, "", href);
			window.history.pushState({}, "", url);
		}
	}

	function getResourceUrl(resource) {
		resource = resource || {};
		var type = parseInt(resource.type);
		var resourceId = parseInt(resource.resourceId);
		var fileName = trim(resource.fileName);
		var extension = trim(resource.extension);
		var url = trim(resource.url);
		var retUrl = '';
		if (url) {
			retUrl = url;	
		} else if (type == 1) {
			retUrl = UPLOAD_IMG_PATH + resourceId + (extension ? '.' + extension : '');
		}
		return retUrl;
	}

	function verifyMobile(mobile) {
		//移动号段
		var yd = [134,135,136,137,138,139,147,150,151,152,157,158,159,178,182,183,184,187,188];
		//联通号段
		var lt = [130,131,132,145,155,156,171,175,176,185,186];
		//电信号段
		var dx = [133,149,153,173,177,180,181,189];
		//虚拟运营商
		var xn = [170];
		var prefix = yd.concat(lt, dx, xn);
		var mobilePrefix = {};
		$.each(prefix, function(i, item) {
			mobilePrefix[item] = true;	
		});
		var mobile = trim(mobile) || '';
		return /^\d{11}$/.test(mobile) && mobilePrefix[mobile.substr(0, 3)];
	}

	function getLoginUser() {
		var user = null;
		if (isLogin()) {
			var options = {}
			userCgi.getUserInfo(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				user = ret.data || {};
			}, true);
		}
		return user;
	}
});
define('module/main',function(require, exports){

	exports.setMain = setMain;
	exports.setContent = setContent;
	exports.setScrollLoad = setScrollLoad;
	exports.unsetScrollLoad = unsetScrollLoad;

	var common = require('module/common');
	var ui = require('module/ui');
	var mainView = require('view/main');
	var activityCgi = require('cgi/activity');
	var userCgi = require('cgi/user');
	var guideCgi = require('cgi/guide');

	function setMain(view, options) {
		if (common.isWeixinBrowser()) {
			ui.setShare();
		}
		if (common.isLogin()) {
			//setGuideAccess();
			//showHongBao();
		}
		var hash = common.getLocationHash() || '';
		if (!/editPlan|matchMoreBettype|match/.test(hash)) {
			//清除编辑方案的比赛选择
			window.editPlanSelectMatch = null;
			window.matchSelectBettype = null;
		}
		var title = options.title || '';
		var className = options.className || '';
		var showHeader = !!options.showHeader;
		var showFooter = !!options.showFooter;
		var isSimpleHeader = !!options.isSimpleHeader;
		var isScrollHeader = !!options.isScrollHeader;
		var isUserVerifyHeader = !!options.isUserVerifyHeader;
		var isWithdrawHeader = !!options.isWithdrawHeader;
		var isMatchHeader = !!options.isMatchHeader;
		var isFocusHeader = !!options.isFocusHeader;
		var isUserRankHeader = !!options.isUserRankHeader;
		var isHotMatchHeader = !!options.isHotMatchHeader;
		var isRechargeHeader = !!options.isRechargeHeader;
		var isTurnplateHeader = !!options.isTurnplateHeader;
		var isSupplierHeader = !!options.isSupplierHeader;
		var isOrderTicketListHeader = !!options.isOrderTicketListHeader;
		var isLeftIconHeader = !!options.isLeftIconHeader;
		var isFinanceHeader = !!options.isFinanceHeader;
		var isSsqHbHeader = !!options.isSsqHbHeader;
		var isDigitalHeader = !!options.isDigitalHeader;
		var isRecommendHeader = !!options.isRecommendHeader;
		var isFootballHeader = !!options.isFootballHeader;
		var rightButtonText = options.rightButtonText || '';
		var rightButtonFun = options.rightButtonFun || function() {};
		href = trim(common.getUrlParam("#"));
		if (ENV == 'dev') {
			title += '(开发环境)';
		} else if (ENV == 'beta') {
			title += '(测试环境)';
		}
		view.setTitle(title);
		var data = {
			title: title,
			className: className,
			showHeader: showHeader,
			showFooter: showFooter,
			isSimpleHeader: isSimpleHeader,
			isScrollHeader: isScrollHeader,
			isUserVerifyHeader: isUserVerifyHeader,
			isWithdrawHeader: isWithdrawHeader,
			isMatchHeader: isMatchHeader,
			isFocusHeader: isFocusHeader,
			isUserRankHeader: isUserRankHeader,
			isHotMatchHeader:　isHotMatchHeader,
			isRechargeHeader: isRechargeHeader,
			isTurnplateHeader: isTurnplateHeader,
			isSupplierHeader: isSupplierHeader,
			isLeftIconHeader: isLeftIconHeader,
			isOrderTicketListHeader: isOrderTicketListHeader,
			isSsqHbHeader: isSsqHbHeader,
			isFinanceHeader: isFinanceHeader,
			isDigitalHeader: isDigitalHeader,
			isRecommendHeader: isRecommendHeader,
			isFootballHeader: isFootballHeader,
			rightButtonText: rightButtonText,
			isIos: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
			isWeixinBrowser: common.isWeixinBrowser(),
			IMG_PATH: IMG_PATH,
			isApp: common.isApp()
		}
		view.setContent(mainView.content(data));
		$("#pageHeader .leftIcon_header").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			common.historyBack();
		});
		$("#pageHeader .rightIcon_top").on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (rightButtonText) {
				rightButtonFun();	
			} else {
				common.locationUrl('#home');
			}
		});
		$("#pageHeader [href]").on("click", function(e) {
			var href = trim($(this).attr('href'));
			if (href) {
				common.locationUrl(href);
			}
		});
		$("#pageFooter a").each(function(){
			var href = trim($(this).attr('href'));
			var hash = window.location.hash;
			$(this).on("click",function(e) {
				e.preventDefault();
				e.stopPropagation();
				common.locationUrl(href);
			});
			if(hash.indexOf(href) != -1) {
				$(this).addClass('active');
			}else {
				$(this).removeClass('active');
			}
		})
	}

	function setContent(html){
		$("#pageContent").html(html);
	}

	function setScrollLoad(callback) {
		callback = callback || function() {};
		unsetScrollLoad();
		$("#pageContent").on('scroll', function() {
			var scrollHeight = this.scrollHeight;
			var offsetHeight = this.offsetHeight;
            var scrollTop = this.scrollTop;
            var maxScrollTop = scrollHeight - offsetHeight;
            if (maxScrollTop - scrollTop <= 30) {
            	callback();
            }
        });
	}

	function unsetScrollLoad() {
		$("#pageContent").off('scroll');
	}

	function showHongBao() {
		var hash = common.getLocationHash() || '';
		var refuseHongBao = common.getCache('refuseHongBao') || {count: 0};
		var refuseCount = refuseHongBao.count || 0;
		if (/activity\/hongBao|download/.test(hash) || refuseCount >= 2) {
			return;
		}
		var options = {};
		activityCgi.isReceiveHongBao(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || false;
			if (!data) {
				var options = {
					html: mainView.hongBao({
						IMG_PATH: IMG_PATH
					})
				}
				ui.showWindow(options);
				$('#windowBox .close_btn').on('click', function(e) {
					refuseHongBao = {
						count: refuseCount + 1
					}
					common.setCache('refuseHongBao', refuseHongBao, 1000*3600*24*2);//2天失效
					ui.closeWindow();
				});
				$('#windowBox .open').on('click', function(e) {
					common.locationUrl('#activity/hongBao');
				});
			}
		});
	}

	function setGuideAccess() {
		var guideUserNo = trim(common.getUrlParam('guideUserNo'));
		var href = location.href || '';
		var temp = href.match(/#([^?=#&\s]*)/);
		if (!guideUserNo || !temp || temp.length != 2) {
			return;
		}
		var accessPage = trim(temp[1]);
		var options = {
			guideUserNo: guideUserNo,
			accessPage: accessPage
		};
		guideCgi.createGuide(options);
	}
});
define('module/ui',function(require,exports) {

	exports.clear = clear;
	exports.showMask = showMask;
	exports.closeMask = closeMask;
	exports.showLoading = showLoading;
	exports.closeLoading = closeLoading;
	exports.showNotice = showNotice;
	exports.showAlert = showAlert;
	exports.closeAlert = closeAlert;
	exports.showAttention = showAttention;
	exports.closeAttention= closeAttention;
	exports.showConfirm = showConfirm;
	exports.closeConfirm = closeConfirm;
	exports.showWindow = showWindow;
	exports.closeWindow= closeWindow;
	exports.showShare = showShare;
	exports.closeShare = closeShare;
	exports.setShare = setShare;
	exports.showCreateOrder = showCreateOrder;
	exports.closeCreateOrder = closeCreateOrder;
	exports.showCreateTicketOrder = showCreateTicketOrder;
	exports.closeCreateTicketOrder = closeCreateTicketOrder;
	exports.showCreateDigitalTicketOrder = showCreateDigitalTicketOrder;
	exports.createDigitalTicketSubmit = createDigitalTicketSubmit;
	exports.closeCreateDigitalTicketOrder = closeCreateDigitalTicketOrder;
	exports.callIosShare = callIosShare;

	var common = require('module/common');
	var uiView = require('view/ui');
	var orderCgi = require('cgi/order');

	function clear(){
		$(".mask").remove();
		//清除body留下的弹框
		for(var name in exports){
			if(/^close/ig.test(name)){
				if(isFunction(exports[name]))exports[name]();
			}
		}
	}

	function showMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		var zIndex = options.zIndex || 2;
		var opacity = options.opacity || 0.6;
		var onClick = (isFunction(options.onClick) && options.onClick) || function(){};
		$("body").children(".mask").each(function(){
			if(id == this.id)$(this).remove();
		});
		$("body").append(uiView.mask({
			id: id,
			zIndex: zIndex,
			opacity: opacity,
			filter: opacity*100,
			canClose: isFunction(options.onClick)
		}));
		$("#"+id).off().on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			onClick();
		});
	}

	function closeMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		$("#"+id).remove();
	}

	function showLoading(time){
		time = time || 10*1000;
		closeLoading();
		$("body").append(uiView.loading());
		showLoading.timer = setTimeout(closeLoading, time);	
	}

	function closeLoading() {
		clearTimeout(showLoading.timer);
		$("#loadingBox").remove();		
	}

	function showNotice(text, time) {
		time = time || 1000;
		$("#noticeBox").remove();
		var data = {
			text: text
		}
		$("body").append(uiView.notice(data));
		$("#noticeBox").fadeIn(500, function() {
			clearTimeout(showNotice.timer);
			showNotice.timer = setTimeout(function() {
				$("#noticeBox").fadeOut(1000);
			},time);
 		});
	}

	function showAlert(text, sureFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		closeAlert();
		var data = {
			text: text
		}
		$("body").append(uiView.alert(data));
		$("#alertBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
			closeAlert();
		});
	}

	function closeAlert(){
		$("#alertBox").remove();
	}

	function showAttention(text) {
		text = $.trim(text) || "";
		closeAttention();
		var data = {
			text: text
		}
		$("body").append(uiView.attention(data));
	}

	function closeAttention(){
		$("#attentionBox").remove();
	}

	function showConfirm(text, sureFun, cancelFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		cancelFun = cancelFun || function() {};
		closeConfirm();
		var data = {
			text: text
		}
		$("body").append(uiView.confirm(data));
		$("#sureBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
		});
		$("#cancelBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			cancelFun();
			closeConfirm();
		});
	}

	function closeConfirm(){
		$("#confirmBox").remove();
	}

	function showWindow(options) {
		options = options || {};
		var html = $.trim(options.html) || "";
		closeWindow();
		var data = {
			html: html
		}
		$("body").append(uiView.window(data));
	}

	function closeWindow(){
		$("#windowBox").remove();
	}

	function getDefaultShare() {
		var user = common.getLoginUser();
		var spreaderUserNo = trim(user && user.userNo || '');
		var protocol = trim(location.protocol);
		var host = trim(location.host);
		var pathname = trim(location.pathname);
		var search = trim(location.search);
		var hash = trim(location.hash);
		//更换推荐人
		search = search.replace(/spreaderUserNo=[^&=#]*/g, '');
		if (search.indexOf('?') == -1) {
			search += '?spreaderUserNo=' + spreaderUserNo;
		} else {
			search += '&spreaderUserNo=' + spreaderUserNo;
		}
		var href = protocol + '//' + host + pathname + search + hash;
		href = href.replace(/&&/g, '&');
		href = href.replace(/\?&/g, '?');
		var data = {
			title: '晒米场',
			link: href,
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/share_logo.jpg',
			desc: '预测推荐，专业可依靠',
			success: function() {
				closeShare();
			},
			cancel: function() {
				closeShare();
			}
		}
		return data;	
	}

	function setShare(data) {
		var weixin = require('module/weixin');
		data = data || {};
		var shareData = getDefaultShare();
		if (data.title) {
			shareData.title = data.title;	
		}
		if (data.link) {
			shareData.link = data.link;	
		}
		if (data.imgUrl) {
			shareData.imgUrl = data.imgUrl;	
		}
		if (data.desc) {
			shareData.desc = data.desc;	
		}
		if (data.success) {
			var shareDataSuccess = shareData.success;
			shareData.success = function() {
				shareDataSuccess();
				data.success();
			}
		}
		if (data.cancel) {
			var shareDataCancel = shareData.cancel;
			shareData.cancel = function() {
				shareDataCancel();
				data.cancel();
			}
		}
		weixin.call("onMenuShareAppMessage", shareData);
		var shareTimelineData = JSON.parse(JSON.stringify(shareData));
		shareTimelineData.title = shareTimelineData.title + '：' + shareTimelineData.desc;
		weixin.call("onMenuShareTimeline", shareTimelineData);
	}

	function showShare(data) {
		closeShare();
		if (data) {
			setShare(data);	
		}
		if (common.isWeixinBrowser()) {
			$("body").append(uiView.share());
		}
		$("#shareBox").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeShare();
		});
	}

	function closeShare(data) {
		if (data) {
			setShare(data);	
		}
		$("#shareBox").remove();
	}

	function showCreateOrder(data) {
		closeConfirm();
		var planNo = trim(data.planNo) || "";
		var amount = parseInt(data.amount) || 0;
		var planType = parseInt(data.planType) || 1;
		var callback = data.callback || function () {};
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		showConfirm("需支付" + amount + "粒米查看专家推荐<br>(1粒米=1元)", function sure() {
			var spreaderUserNo = trim(common.getUrlParam("spreaderUserNo")) || '';
			var options = {
				planNo: planNo,
				spreaderUserNo: spreaderUserNo,
				planType: planType
			}
			orderCgi.createOrder(options, function(ret) {
				if (ret.errCode != 0) {
					showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var orderNo = trim(data.orderNo);
				var payUrl = trim(data.payUrl);
				if (orderNo) {
					if (payUrl) {
						setTimeout(function() {
							callback();
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						showNotice('支付成功');
						setTimeout(function() {
							callback();
							if (planType == 1) {
								common.locationUrl("#planDetail&planNo=" + planNo);
							} else if (planType == 2) {
								common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
							}
						}, 1000);
					}
				} else {
					showNotice("支付失败");	
				}
			});
		}, function cancel() {

		});
	}

	function closeCreateOrder() {
		closeConfirm();
	}

	function showCreateTicketOrder(data) {
		closeCreateTicketOrder();
		$("body").append(uiView.createTicketOrder(data));
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var isSelfFollow = data.isSelfFollow || false;
		var baseTicketMultiple;
		if (isSelfFollow) {
			baseTicketMultiple = 1;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else {
			baseTicketMultiple = 10;
		}
		if (planAmount == 18) {
			baseTicketMultiple = 20;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 28) {
			baseTicketMultiple = 30;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 38) {
			baseTicketMultiple = 40;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 58) {
			baseTicketMultiple = 50;
			$("#ticketMultiple").val(baseTicketMultiple);
		} else if (planAmount == 88) {
			baseTicketMultiple = 100;
			$("#ticketMultiple").val(baseTicketMultiple);
		}
		$("#closeCreateTicketOrder").on('click', closeCreateTicketOrder)
		$('#ticketMultiple').keypress(function(e) { //禁止输入符号
			if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
			    return false;
			}
		});
		$("#ticketMultiple").on('input', ticketMultipleChange).trigger('input');//触发一次input事件
		$("#addTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple += baseTicketMultiple;
			ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$("#decreaseTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple -= baseTicketMultiple;
			ticketMultiple = ticketMultiple < baseTicketMultiple ? baseTicketMultiple : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$('#userVerifyProtocol').on('click', function () {
			common.locationUrl("#userVerifyProtocol&type=3");
		});
		$('#createTicketSubmit').on('click', createTicketSubmit);
	}

	function ticketMultipleChange(e) {
		var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds")) || 0;
		var recommendCount = parseInt($(this).attr("recommendCount")) || 0;
		var ticketMultiple = parseInt(this.value) || 0;
		var ticketAmount = ticketMultiple*recommendCount*2;
		var maxPrize = (maxBettypeOdds*2*ticketMultiple).toFixed(2);
		$("#ticketAmount").html(ticketAmount);
		$("#maxPrize").html(maxPrize);	
	}

	function createTicketSubmit() {
		var planNo = trim($(this).attr("planNo"));
		var protocol = $('#protocol')[0].checked;
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var planType = $("#ticketMultiple").attr("planType") || 1;
		var isSelfFollow = $("#ticketMultiple").attr("isSelfFollow") || false;
		if (!protocol) {
			showNotice("请阅读并同意代购协议");
			return;	
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			showNotice('总金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple < 10 && !isSelfFollow) {
			showNotice('投注倍数最小为10，请重新输入');
			return;
		} else if (planAmount == 18 && ticketMultiple < 20) {
			showNotice('跟单此方案最低20倍');
			return;
		} else if (planAmount == 58 && ticketMultiple < 50) {
			showNotice('跟单此方案最低50倍');
			return;
		} else if (planAmount == 88 && ticketMultiple < 100) {
			showNotice('跟单此方案最低100倍');
			return;
		}
		if (ticketMultiple > 100000) {
			showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		// showConfirm("需支付" + ticketAmount + "元", function sure() {
			var options = {
				ticketMultiple: ticketMultiple,
				planNo: planNo,
				planType: planType
			}
			orderCgi.createTicketOrder(options, function(ret) {
				if (ret.errCode != 0) {
					showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var orderNo = trim(data.orderNo);
				var payUrl = trim(data.payUrl);
				if (orderNo) {
					if (payUrl) {
						setTimeout(function() {
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					showNotice("支付失败");
				}
			});
		/*}, function cancel() {

		});	*/
	}

	function closeCreateTicketOrder() {
		$("#createTicketOrderBox").remove();
	}
	
	function showCreateDigitalTicketOrder(data) {
		closeCreateDigitalTicketOrder();
		$("body").append(uiView.createDigitalTicketOrder(data));
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		var baseTicketMultiple = 1;
		$("#ticketMultiple").val(baseTicketMultiple);
		$("#closeCreateTicketOrder").on('click', closeCreateTicketOrder)
		$('#ticketMultiple').keypress(function(e) { //禁止输入符号
			if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
			    return false;
			}
		});
		$("#ticketMultiple").on('input', ticketMultipleChange).trigger('input');//触发一次input事件
		$("#addTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple += baseTicketMultiple;
			ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$("#decreaseTicketMultiple").on("click", function() {
			var ticketMultiple = parseInt($("#ticketMultiple").val()) || 0;
			ticketMultiple -= baseTicketMultiple;
			ticketMultiple = ticketMultiple < baseTicketMultiple ? baseTicketMultiple : ticketMultiple;
			$("#ticketMultiple").val(ticketMultiple).trigger('input');
		});
		$('#userVerifyProtocol').on('click', function () {
			common.locationUrl("#userVerifyProtocol&type=3");
		});
		$('#createTicketSubmit').on('click', createDigitalTicketSubmit);
	}


	function createDigitalTicketSubmit() {
		var planNo = trim($(this).attr("planNo"));
		var protocol = $('#protocol')[0].checked;
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var planAmount = parseInt($("#ticketMultiple").attr("planAmount"));
		if (!protocol) {
			showNotice("请阅读并同意代购协议");
			return;	
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			showNotice('总金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple < 1) {
			showNotice('投注倍数最小为1，请重新输入');
			return;
		}
		if (ticketMultiple > 100000) {
			showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		// showConfirm("需支付" + ticketAmount + "元", function sure() {
			var options = {
				ticketMultiple: ticketMultiple,
				planNo: planNo
			}
			orderCgi.createDigitalTicketOrder(options, function(ret) {
				if (ret.errCode != 0) {
					showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var orderNo = trim(data.orderNo);
				var payUrl = trim(data.payUrl);
				if (orderNo) {
					if (payUrl) {
						setTimeout(function() {
							common.locationUrl(payUrl);
						}, 1000);
					} else {
						setTimeout(function() {
							var continueHash = encodeURIComponent(common.getLocationHash());
							common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
						}, 1000);
					}
				} else {
					showNotice("支付失败");
				}
			});
		/*}, function cancel() {

		});	*/
	}

	function closeCreateDigitalTicketOrder() {
		$("#createTicketOrderBox").remove();
	}
	
	function callIosShare(data) {
		if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.ssqHbShare_create.postMessage({
    			title: data.title,
				link: data.link,
				imgUrl: data.imgUrl,
				desc: data.desc
    		});
		}
	}
});
define('module/weixin',function(require, exports) {

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