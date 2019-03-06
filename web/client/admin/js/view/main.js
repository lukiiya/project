define(function(require,exports){var templateUtils = (function (){
	var include = function(id, data){
		return eval(id)(data);
	}
	var toString = function (value, type) {
	    if (typeof value !== 'string') {
	        type = typeof value;
	        if (type === 'number') {
	            value += '';
	        } else if (type === 'function') {
	            value = toString(value.call(value));
	        } else {
	            value = '';
	        }
	    }
	    return value;
	};
	var escapeMap = {
	    "<": "&#60;",
	    ">": "&#62;",
	    '"': "&#34;",
	    "'": "&#39;",
	    "&": "&#38;"
	};
	var escapeFn = function (s) {
	    return escapeMap[s];
	};
	var escapeHTML = function (content) {
	    return toString(content)
	    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};
	var isArray = Array.isArray || function (obj) {
	    return ({}).toString.call(obj) === '[object Array]';
	};
	var each = function (data, callback) {
	    var i, len;        
	    if (isArray(data)) {
	        for (i = 0, len = data.length; i < len; i++) {
	            callback.call(data, data[i], i, data);
	        }
	    } else {
	        for (i in data) {
	            callback.call(data, data[i], i);
	        }
	    }
	};
	var utils = {
		$include: include,

	    $string: toString,

	    $escape: escapeHTML,

	    $each: each  
	};
	return utils;
})();exports.content=content;exports.menuList=menuList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,className=$data.className,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="container ';
$out+=$escape(className);
$out+='" id="pageContainer">\r\n    <div class="header clearfix" id="pageHeader">\r\n        <div class="header_left">\r\n            <img class="icon_log" src="';
$out+=$escape(IMG_PATH);
$out+='icon_log.png" href="#index"><span class="header_title">后台管理</span>\r\n        </div>\r\n        <div class="header_right" style="display:none" id="loginUserInfoBox">\r\n            <span class="icon_default_head"></span><span class="ml10" id="loginUserName"></span>\r\n            <span class="modifyPsd" href="#password">修改密码</span>\r\n            <span class="exit" href="#login&unlogin=true">退出</span>\r\n        </div>\r\n    </div>      \r\n    <div class="content mt10 clearfix">\r\n        <div class="leftBox fl" id="pageMenu" style="display:none">\r\n            <ul id="menuList"></ul>\r\n        </div>\r\n        <div class="rightBox" id="pageContent"></div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function menuList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,keys=$data.keys,Object=$data.Object,menuMap=$data.menuMap,a=$data.a,b=$data.b,ret=$data.ret,j=$data.j,len=$data.len,parentMenuName=$data.parentMenuName,$escape=$helpers.$escape,list=$data.list,i=$data.i,length=$data.length,menu=$data.menu,menuName=$data.menuName,href=$data.href,activeHref=$data.activeHref,$out='';
    var keys = Object.keys(menuMap);
    keys.sort(function (a, b) {
        var ret = 0;
        if (a == '后台管理') {
            ret = 1;
        }
        return ret;
    });
    for(var j = 0, len = keys.length; j < len; j++) {
        var parentMenuName = keys[j] || '';

$out+='\r\n<li>\r\n    <div class="menu_one"><span class="icon_menu icon_content"></span>';
$out+=$escape(parentMenuName);
$out+='</div>\r\n    <div class="menu_two_box clearfix">\r\n    ';

        var list = menuMap[parentMenuName] || [];
        for(var i = 0, length = list.length; i < length; i++) {
            var menu = list[i] || {};
            var menuName = menu.menuName || '';
            var href = menu.path || '';
            var activeHref = href;
            if (href == '#activityList') {
                activeHref = '#(activityList|activityHongBaoList|activityTurnplateList|activityChargeList)';
            } else if (href == '#groupList') {
                activeHref = '#(groupList|groupUserList)';
            }
    
$out+='\r\n        <div class="menu_two" href="';
$out+=$escape(href);
$out+='" activeHref="';
$out+=$escape(activeHref);
$out+='"><span class="act_bar"></span><span class="item">';
$out+=$escape(menuName);
$out+='</span></div>\r\n        ';
}
$out+='\r\n    </div>\r\n</li>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});