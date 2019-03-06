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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="top_wrap pb15">\r\n		<img class="bet_sucess_pic mt20" src="';
$out+=$escape(IMG_PATH);
$out+='bet_sucess.png"/>\r\n		<p class="mt10 mb5" id="couponTxt" style="display: none;">已使用优惠券，优惠了<span class="color_red" id="couponAmount"></span>元</p>\r\n		<p class="mb5">方案正在送往投注站的路上</p>\r\n		<p class="color6 size11">可通过跟单详情，查看方案状态，出票成功可查看真实出票票样</p>\r\n	</div>\r\n	<a class="cont_bet_btn mt40" id="continueBet">继续投注</a>\r\n	<a class="check_detail mt30" id="checkDetail">查看投注详情</a>\r\n	<a class="back_home mt30" id="backHome">返回首页</a>';
return new String($out);
}).call(templateUtils,$data).toString()}});