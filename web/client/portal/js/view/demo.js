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
})();exports.content=content;exports.myTag1=myTag1;exports.myTag2=myTag2;exports.myTag3=myTag3;exports.myTag4=myTag4;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,static1=$data.static1,static2=$data.static2,$out='';$out+='<div id="myContent">\r\n	<div>';
$out+=$escape( static1);
$out+='</div>\r\n	<div>';
$out+=$escape( static2);
$out+='</div>\r\n  <div>{{ name1 }}</div>\r\n  <div>{{ name2 }}</div>\r\n	<myTag1></myTag1><!-- 自定义标签 -->\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag1($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag1->{{ message1 }}</p>\r\n  <myTag2></myTag2><!-- 闭合标签方式 -->';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag2($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag2->{{ message2 }}</p>\r\n  <myTag3/><!-- 单标签方式 -->';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag3($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag3->{{ message3 }}</p>\r\n  <myTag4></myTag4>';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag4($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag4->{{ message4 }}</p>';
return new String($out);
}).call(templateUtils,$data).toString()}});