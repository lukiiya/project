define(function(require, exports) {
	
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