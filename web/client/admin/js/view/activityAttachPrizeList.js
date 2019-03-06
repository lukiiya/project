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
})();exports.content=content;exports.activityAttachPrizeList=activityAttachPrizeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">11选5加奖百万</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="input_field ml20" placeholder="期号" id="issue">\r\n				<input class="input_field ml20" placeholder="订单号" id="orderId">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="60">期号</th>\r\n					<th width="60">订单号</th>\r\n					<th width="60">加奖金额</th>\r\n					<th width="80">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityAttachPrizeList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityAttachPrizeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,attachPrize=$data.attachPrize,nickName=$data.nickName,realName=$data.realName,issue=$data.issue,orderId=$data.orderId,attachPrizeAmount=$data.attachPrizeAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalAttachPrizeAmount=$data.totalAttachPrizeAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var attachPrize = list[i] || {};
	var nickName = attachPrize.nickName;
	var realName = attachPrize.realName;
	var issue = attachPrize.issue;
	var orderId = attachPrize.orderId;
	var attachPrizeAmount = attachPrize.attachPrizeAmount/100;
	var createTime = attachPrize.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(issue);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(attachPrizeAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAttachPrizeAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});