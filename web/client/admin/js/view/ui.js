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
})();exports.mask=mask;exports.loading=loading;exports.notice=notice;exports.alert=alert;exports.window=window;exports.confirm=confirm;function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,id=$data.id,zIndex=$data.zIndex,opacity=$data.opacity,filter=$data.filter,$out='';$out+='<div class="mask" id="';
$out+=$escape(id);
$out+='" style="z-index:';
$out+=$escape(zIndex);
$out+=';opacity:';
$out+=$escape(opacity);
$out+=';filter:alpha(opacity=';
$out+=$escape(filter);
$out+=')"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function loading($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="loadingBox">\r\n	<div class="mask"></div>\r\n	<div class="loading ">\r\n        <div class="loading_overlay"></div>\r\n        <div class="loading_inner">\r\n            <p class="loading_spinner"></p>\r\n            <p class="loading_text">努力加载中...</p>\r\n        </div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,text=$data.text,$out='';$out+='<div class="pop" id="noticeBox" style="z-index:99">';
$out+=$escape(text);
$out+='</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function alert($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="alertBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop1">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n			<div class="btn" id="alertBtn">确定</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function window($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div id="windowBox">\r\n		<div class="mask"></div>\r\n		<div class="pop3">\r\n			';
$out+=$string(html);
$out+='\r\n			<a class="close_btn" id="closeWindow">×</a>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2">\r\n		    <span class="alerts">';
$out+=$string(text);
$out+='</span>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});