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
var $helpers=this,$out='';$out+='<div class="oprate_box">\r\n		<form onsubmit="return false;">\r\n			<h1 class="title" style="border:0">修改密码</h1>\r\n			<input class="input_field mt30" type="password" placeholder="旧密码" id="oldPassword"/><br/>\r\n			<input class="input_field mt30" type="password" placeholder="新密码" id="newPassword"/><br/>\r\n			<input class="input_field mt30" type="password" placeholder="再次输入密码" id="againNewPassword"/><br/>\r\n			<input class="btn mt30" type="submit" value="确认" id="passwordSubmit"/><br/>\r\n			<input class="btn back" type="button" value="返回" onclick="history.back()" />\r\n		</form>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});