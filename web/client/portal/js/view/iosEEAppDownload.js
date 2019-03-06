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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="down-clumn">\r\n		<div class="mb-logo">晒米场企业版</div>\r\n		<div class="btn_wrap">\r\n			<a class="down-btn" id="download" href="https://www.pgyer.com/vJUz"><i class="apple_logo"></i>前往安装最新版本</a>\r\n		</div>\r\n		<!--<p class="down_txt">微信中点击右上角三个点，选择在"浏览器中打开"即可</p>-->\r\n		<p class="msg">注：若安装不成功，请删除晒米场老版本重新安装</p>\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='iosEE_bg_radian.png"/>\r\n	</div>\r\n	<div class="mb_download_bottom">\r\n		<h3 class="course_title">“未受信任的企业级开发者”解决办法</h3>\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='iosEE_course.gif"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});