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
})();exports.content=content;exports.expertList=expertList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">专家列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<span class="select_box">\r\n					<select id="groupId"></select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="200">昵称</th>\r\n					<th width="200">姓名</th>\r\n					<th width="200">标签</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="expertList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function expertList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId || 0;
	var nickName = user.nickName || '';
	var realName = user.realName || '';
	var tag = user.tag;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			<a class="examine loginUser" userId="';
$out+=$escape(userId);
$out+='">登录</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});