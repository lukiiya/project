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
})();exports.content=content;exports.success=success;exports.again=again;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<a class="link_home" href="#home"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='sm_logo.png"/></a>\r\n	<div class="surplus">\r\n		<!-- 剩余：454545个红包 -->\r\n	</div>\r\n	<form class="hb" action="">\r\n		<div class="input_wrap pb10">\r\n			<div class="phone_num mb10"><input type="number" placeholder="请输入手机号" maxlength="11" id="mobile"/></div>\r\n			<div class="venidate_wrap clearfix">\r\n				<input class="venidate_code" type="number" placeholder="请输入验证码" maxlength="4" id="smsCode"/>\r\n				<a class="get_code" id="smsCodeBtn">获取验证码</a>\r\n			</div>\r\n		</div>\r\n		<div class="get_parket">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='get_parket.png" alt="" id="hongBaoSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="activity_rules_wrap">\r\n		<div class="activity_rules">\r\n			<h2>活动规则<img class="rules_hb" src="';
$out+=$escape(IMG_PATH);
$out+='rule_hb.png"></h2>\r\n			<pre class="mt5 mb10" id="remark" style="line-height: 20px;white-space: pre-wrap;font-size: 12px;"></pre>\r\n		</div>\r\n		<div class="textC" style="color: #FFFFFF;">晒米场 • 竞彩推荐平台</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function success($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="congratulation">\r\n	<h2>恭喜您！</h2>\r\n	<p class="p_money">18元红包已进入米仓</p>\r\n	<p class="p_buy">可用来直接购买</p>\r\n	<a class="use_immediate">立即使用</a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function again($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="congratulation">\r\n	<p class="p_money">您已经领过晒米场红包</p>\r\n	<p class="p_buy">可用来直接购买</p>\r\n	<a class="use_immediate">立即使用</a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});