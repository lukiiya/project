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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="invite_wrap">\r\n		<dl>\r\n			<dd class="mb15">推广链接</dd>\r\n			<dd class="invite_link mb15"><input id="shareLink" type="text" value="" readonly="true"/></dd>\r\n			<dd>\r\n				<button class="invite_copy" id="copyBtn" data-clipboard-target="#shareLink"></button>\r\n				<span class="invite_share" id="shareBtn"></span>\r\n			</dd>\r\n		</dl>\r\n	</div>\r\n	<!--菜单-->\r\n	<ul class="mt10 menu" id="tabList">\r\n		<li class="ui-flex menu_bar" tab="1">\r\n			<span>我的收益</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="2">\r\n			<span>邀请人数</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="3">\r\n			<span>高频彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="4">\r\n			<span>竞技彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});