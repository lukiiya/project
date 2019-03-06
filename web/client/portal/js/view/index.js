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
})();exports.mockUser=mockUser;function mockUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n	.line {\r\n		margin-top: 10px;\r\n		margin-left: 10px;\r\n		height: 30px;\r\n		line-height: 30px;\r\n	}\r\n	.line select {\r\n		width: 100px;\r\n		height: 25px;\r\n		line-height: 25px;\r\n	    -webkit-appearance: listbox;\r\n	    -moz-appearance: listbox;\r\n	    -ms-appearance: listbox\r\n	    -o-appearance: listbox;\r\n	    appearance: listbox;\r\n	}\r\n	.line input {\r\n		height: 20px;\r\n		line-height: 20px;\r\n		border: 1px solid #ccc;\r\n		width: 200px;\r\n	}\r\n	ul {\r\n		margin-left: 30px;\r\n		list-style-type: none;\r\n		padding: 0 30px 0 0;\r\n	}\r\n	li {\r\n		height: 30px;\r\n		line-height: 30px;\r\n		border-bottom: 1px solid #ccc;\r\n	}\r\n	li span {\r\n		display: inline-block;\r\n		height: 30px;\r\n		overflow: hidden;\r\n	}\r\n	li span a {\r\n		color: #ff0000;\r\n	}\r\n</style>\r\n\r\n<div class="line">　　密码：<input type="text" id="password"/></div>\r\n<div class="line">用户分组：<select id="groupId"><option value="">全部</option></select></div>\r\n<div class="line">用户列表：</div>\r\n<ul id="userList"><ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});