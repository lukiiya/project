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
})();exports.content=content;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="select_box">\r\n		<input type="number" placeholder="请输入手机号" maxlength="11" id="mobile" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" maxlength="6" id="smsCode"/>\r\n		<span id="smsCodeBtn">获取验证码</span>\r\n	</div>\r\n	<div class="btn ellipsis mt20" id="bindMobileSubmit">\r\n			立即绑定\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});