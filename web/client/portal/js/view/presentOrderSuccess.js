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
var $helpers=this,isApp=$data.isApp,$out='';$out+='<div class="share_head pt50 pb15">\r\n		<div class="suc_logo_wrap">\r\n			<span class="share_icon"></span>\r\n		</div>\r\n		<p class="mt15 textC">选择分享给好友</p>\r\n		<p class="mt10 textC">您的祝福将快马加鞭送达</p>\r\n	</div>\r\n	';
 if (isApp) { 
$out+='\r\n		<div class="share_btn_wrap mt50" id="shareWechat">\r\n			<a class="share_friends_btn">分享给微信好友</a>\r\n		</div>\r\n		<div class="share_btn_wrap mt25" id="shareWechatMoments">\r\n			<a class="share_group_btn">分享到微信朋友圈</a>\r\n		</div>\r\n	';
 } else { 
$out+='\r\n		<div class="share_btn_wrap mt50" id="shareBtn">\r\n			<a class="share_friends_btn">分享给微信好友、朋友圈</a>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});