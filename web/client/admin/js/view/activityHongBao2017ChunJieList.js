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
})();exports.content=content;exports.activityHongBao2017ChunJieList=activityHongBao2017ChunJieList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">2017春节红包</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="120">手机</th>\r\n					<th width="70">赠送粒米</th>\r\n					<th width="70">赠送彩金</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityHongBao2017ChunJieList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityHongBao2017ChunJieList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,hongBao=$data.hongBao,hongBaoId=$data.hongBaoId,nickName=$data.nickName,realName=$data.realName,mobile=$data.mobile,presentAmount=$data.presentAmount,presentTicketAmount=$data.presentTicketAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalPresentAmount=$data.totalPresentAmount,totalPresentTicketAmount=$data.totalPresentTicketAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var hongBao = list[i] || {};
	var hongBaoId = hongBao.hongBaoId;
	var nickName = hongBao.nickName;
	var realName = hongBao.realName;
	var mobile = hongBao.mobile;
	var presentAmount = hongBao.presentAmount/100;
	var presentTicketAmount = hongBao.presentTicketAmount/100;
	var createTime = hongBao.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(mobile);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(presentTicketAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalPresentAmount/100);
$out+='</td>\r\n	<td>';
$out+=$escape(totalPresentTicketAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});