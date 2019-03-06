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
})();exports.content=content;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">现金消费用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="开始时间" readonly="1" id="beginTime">\r\n				<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n				<span class="select_box ml20">\r\n					<select id="financeType">\r\n						<option value="">全部</option>\r\n						<option value="0">方案账户</option>\r\n						<option value="1">出票账户</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n		\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>昵称</th>\r\n					<th>姓名</th>\r\n					<th>数量</th>\r\n					<th>金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,count=$data.count,amount=$data.amount,$escape=$helpers.$escape,totalOrderCount=$data.totalOrderCount,totalOrderAmount=$data.totalOrderAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId;
	var nickName = user.nickName;
	var realName = user.realName;
	var count = user.count;
	var amount = user.amount/100;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td userId="';
$out+=$escape(userId);
$out+='"><a class="examine">';
$out+=$escape(count);
$out+='</a></td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='	\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalOrderAmount/100);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});