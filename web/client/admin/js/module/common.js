define(function(require, exports) {
	
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
	exports.setCache = setCache;
	exports.getCache = getCache;
	exports.clearCache = clearCache;
	exports.getResourceUrl = getResourceUrl;

	require('external/jquery.md5');
	var ui = require('module/ui');

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
		if(param != "")cacheKey = cacheKey+"?"+param;
		return cacheKey;	
	}

	//统一CGI访问函数
	function callCGI(url, type, data, success, fail, sync) {
		var cacheKey = getCGICacheKey(url,data);
		type = (type || "").toLowerCase();
		ui.showLoading();
		if (ENV == "dev2" ) {
			if (type == "get") {
				var cache = getCache(cacheKey);
				if (cache) {
					if(isFunction(success))success(cache);
					ui.closeLoading();
					return;	
				}
			}
		}
		//如果success和fail传的是布尔值，就把他们当作sync(同步)参数
		if(isBoolean(success))sync = success;
		else if(isBoolean(fail))sync = fail;
		if(MOCK_CGI)url = "/js/mockcgi/"+url;
		else url = PROXY+url;
		$.ajax({
			url: url,
			type: type||"post",
			data: data||{},
			dataType: 'json',
			contentType: isString(data)?'application/json;charset=UTF-8':'application/x-www-form-urlencoded',
			async: !sync,
			cache: false,
			error: function(ret) {
				ui.closeLoading();
				ui.showNotice("服务繁忙，请稍候重试！");
				if(isFunction(fail))fail.call(this,ret);
			},
			success: function(ret) {
				ui.closeLoading();
				if(ret.errCode == "1"){
					ui.clear();
					var toHash = $.trim(getUrlParam("toHash"));
					toHash = toHash || encodeURIComponent(getLocationHash());
					var hash = "login";
					if(HASH_ENCODE){
						if(toHash && !(/login/.test(hashDecode(toHash))))hash += "&toHash="+toHash;
					}else {
						if(toHash && !(/login/.test(toHash)))hash += "&toHash="+toHash;
					}
					locationUrl("#"+hash);
					return;
				}else if(ret.errCode == 0){
					if (ENV == "dev2" ) {
						if(type == "get"){
							setCache(cacheKey,ret);
						}else if(type == "post"){
							var index = cacheKey.indexOf("/");
							var cgiClass = cacheKey.substring(0,index);
							clearCache(cgiClass);	
						}
					}
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

	function getLocationHash(){
		//由于firefox对location.hash的读取存在偏差，所以用此函数替换
		var href = window.location.href;
		var hash = "";
		var index =  href.indexOf("#");
		if(index != -1){
			hash = $.trim(href.substr(index));	
		}
		return hash;
	}

	function locationUrl(url, target){
		if(HASH_ENCODE && /^#/.test(url) && !validHashEncode(url)){
			url = "#"+hashEncode(url);
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

	function getResourceUrl(resource) {
		if (!isObject(resource)) {
			return resource;	
		}
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
});