//入口
if(/dev|debug/.test(ENV)) {
	var IMG_PATH = './img/';
	var CSS_PATH = './css/';
	var JS_PATH = './js/';
	var OTHER_PATH = './other/';
	var PROXY = '/proxy/';
	var UPLOAD_IMG_PATH = 'http://www.sm.com/proxy/static/image/';
	var HASH_ENCODE = false;
	var MOCK_CGI = false;
}else if(ENV == 'beta'){
	var IMG_PATH = 'https://caifu-1251177394.cosgz.myqcloud.com/beta/shaimiAdmin/img/';
	var CSS_PATH = 'https://caifu-1251177394.cosgz.myqcloud.com/beta/shaimiAdmin/css/';
	var JS_PATH = 'https://caifu-1251177394.cosgz.myqcloud.com/beta/shaimiAdmin/js/';
	var OTHER_PATH = 'https://caifu-1251177394.cosgz.myqcloud.com/beta/shaimiAdmin/other/';
	var PROXY = '/cgi/index.php';
	var UPLOAD_IMG_PATH = location.protocol + "//" + location.host + '/wx_test/cgi/static/image/';
	var HASH_ENCODE = false;
	var MOCK_CGI = false;
}else if(ENV == 'dist'){
	var IMG_PATH = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimiAdmin/img/';
	var CSS_PATH = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimiAdmin/css/';
	var JS_PATH = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimiAdmin/js/';
	var OTHER_PATH = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimiAdmin/other/';
	var PROXY = '/cgi/index.php';
	var UPLOAD_IMG_PATH = location.protocol + "//" + location.host.replace(/^op/, 'www') + '/cgi/static/image/';
	var HASH_ENCODE = false;
	var MOCK_CGI = false;
}


(function (global, undefined) {
	//生成几个常用的全局函数
	function isType(type) {
	  return function(obj) {
	    return {}.toString.call(obj) == "[object " + type + "]";
	  }
	}
	function trim(str) {
		return str && str.replace(/^\s*|\s*$/g, '') || str;
	}
	var isBoolean = global.isBoolean = isType("Boolean");
	var isObject = global.isObject = isType("Object");
	var isString = global.isString = isType("String");
	var isArray = global.isArray = Array.isArray || isType("Array");
	var isFunction = global.isFunction = isType("Function");
	var isNumber = global.isNumber = function(obj){return !isNaN(obj);};
	var isDefined = global.isDefined = function(obj){return typeof(obj) != "undefined";};
	global.trim = trim;

	//插入sea.js
	var script = document.createElement("script");
	script.id = 'seajsnode';
	script.type = 'text/javascript';
	if (/beta|dist/.test(ENV)) {
		script.src = JS_PATH+'external.js?'+VERSION;
	} else {
		script.src = JS_PATH+'external/sea.js?'+VERSION;	
	}
	script.onload = script.onreadystatechange = function() {
		if(this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
		seajs.config({
		  	base: JS_PATH,
		  	/*alias: {
		  		"jquery": "external/jquery"
			},*/
			map: [
				[/(^.*\/js\/.*\.js$)/i, '$1?'+VERSION]
			]
		});

		var loadModule = [];
		if (ENV == "dev") {
			loadModule.push("external/jquery");
			loadModule.push("module/common");
		} else if(/beta|dist/.test(ENV)) {
			loadModule.push("external");
			loadModule.push("controller");
			loadModule.push("module");
			loadModule.push("view");
			loadModule.push("cgi");	
		}
		seajs.use(loadModule,function () {
			seajs.require('external/jquery');
			var common = seajs.require('module/common');
			var _defaultModuleName = "index";
			var _defaultModuleFun = "init";
			var _lastHash = common.getLocationHash();
			var _lastModule = null;
			var _lastModuleRoute = null;
			var _view = function(module) {
				this.module = module;
			};
			_view.prototype.setTitle = function(str) {
				document.title = str;
			}
			_view.prototype.setContent = function(str) {
				document.body.innerHTML = str;
			}

			function getModuleRoute(){
				var hash = common.getLocationHash().replace(/#/g,"");
				if(common.validHashEncode(hash)){
					hash = common.hashDecode(hash);	
				}
				var temp = hash.split("&");
				temp = trim(temp[0]).split("=");
				var name = trim(temp[0])?trim(temp[0]):_defaultModuleName;
				var fun = trim(temp[1])?trim(temp[1]):_defaultModuleFun;
				return  {name: "controller/"+name, fun: fun};
			}

			function hashChangeFire(e){
				e && e.preventDefault && e.preventDefault();
				_lastHash = common.getLocationHash();
				var moduleRoute = getModuleRoute();
				if(!_lastModuleRoute || (_lastModuleRoute.name+'='+_lastModuleRoute.fun) != (moduleRoute.name+'='+moduleRoute.fun)){
					_lastModule && _lastModule["_"+_lastModuleRoute.fun] && _lastModule["_"+_lastModuleRoute.fun](global.curView);
					_lastModuleRoute = moduleRoute;
					seajs.use(moduleRoute.name,function(module){
						global.curView = new _view(module);
						_lastModule = module;
						module && module[moduleRoute.fun] && module[moduleRoute.fun](global.curView);
					});
				}else {
					_lastModule && _lastModule[_lastModuleRoute.fun] && _lastModule[_lastModuleRoute.fun](global.curView);
				}
			}

			if(('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode >= 8)){  
		        //浏览器支持onhashchange事件  
		        window.onhashchange = hashChangeFire;//对应新的hash执行的操作函数  
		    }else{  
		        //不支持则用定时器检测的办法  
		        setInterval(function(){ 
		            //检测hash值是否更改  
		            if(_lastHash != common.getLocationHash()){  
		            	hashChangeFire();//对应新的hash执行的操作函数  
		            }
		        }, 150);  
		    }
		    if (document.readyState == "complete") {
		    	hashChangeFire();
		    } else {
		    	document.onreadystatechange = function() {
		    		if (document.readyState == "complete") {
		    			hashChangeFire();
		    		}
		    	}
		    }
		});
	}

	var loadCss = [];
	loadCss.push(CSS_PATH+'style-index.css?'+VERSION);
	var fragment = document.createDocumentFragment();
	for (var i = 0, length = loadCss.length; i < length; i++) {
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = loadCss[i];
		fragment.appendChild(link);
	}
	fragment.appendChild(script);
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(fragment);
})(this);