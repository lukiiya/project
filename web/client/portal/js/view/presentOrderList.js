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
})();exports.content=content;exports.prentOrderList=prentOrderList;exports.receiveOrderList=receiveOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n		.content {\r\n			padding-bottom: 80px;\r\n		}\r\n	</style>\r\n	<div class="ui-flex tab_btn" id="typeBtn">\r\n		<div class="ui-flex_item" type="1">\r\n			我的赠送\r\n		</div>\r\n		<div class="ui-flex_item" type="2">\r\n			我的领取\r\n		</div>\r\n	</div>\r\n	<ul class="ssqhb_list" id="prentOrderList">\r\n		\r\n	</ul>\r\n	<div class="fixed_btn">\r\n		<a class="ensure_btn" id="presentTicket">马上送注双色球</a>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function prentOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,amount=$data.amount,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,createTime=$data.createTime,presentStatus=$data.presentStatus,orderNo=$data.orderNo,d=$data.d,day=$data.day,presentStatusMap=$data.presentStatusMap,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < list.length; i++) { 
	var amount = list[i].amount/100 || '';
	var realName = list[i].realName;
	var nickName = list[i].nickName;
	var userName = realName || nickName;
	var createTime = list[i].createTime || "";
	var presentStatus = list[i].presentStatus || '';
	var orderNo = list[i].orderNo || '';
	createTime = createTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = createTime[1];
	var presentStatusMap = {1: '未领完',2: '已领完',3: '已过期'};

$out+='\r\n	<li class="hb_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="ui-flex mb5">\r\n			<span class="ui-flex_item size13">';
$out+=$escape(userName);
$out+='的彩票</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(presentStatusMap[presentStatus]);
$out+='</span>\r\n		</div>\r\n		<div class="ui-flex chrono_cash">\r\n			<span class="ui-flex_item">';
$out+=$escape(day);
$out+='</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(amount);
$out+='元</span>\r\n		</div>\r\n	</li>\r\n';
 
	} 
} else { 
$out+='\r\n	<div class="no_item">\r\n		<img class="ssqhb_default" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_default.png"/>\r\n		<p class="mt15 color9">暂时没有您的赠送记录</p>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function receiveOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,amount=$data.amount,orderNo=$data.orderNo,user=$data.user,createTime=$data.createTime,d=$data.d,day=$data.day,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < list.length; i++) { 
	var amount = list[i].amount/100 || '';
	var orderNo = list[i].orderNo;
	var user = list[i].user || {};
	var createTime = list[i].createTime || "";
	createTime = createTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = createTime[1];
	var nickName = user.nickName;
	var realName = user.realName;
	var userName = realName || nickName;

$out+='\r\n	<li class="hb_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="ui-flex mb5">\r\n			<span class="ui-flex_item size13">';
$out+=$escape(userName);
$out+='的彩票</span>\r\n			<span class="ui-flex_item textR">已领取</span>\r\n		</div>\r\n		<div class="ui-flex chrono_cash">\r\n			<span class="ui-flex_item">';
$out+=$escape(day);
$out+='</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(amount);
$out+='元</span>\r\n		</div>\r\n	</li>\r\n';
 
	} 
} else { 
$out+='\r\n	<div class="no_item">\r\n		<img class="ssqhb_default" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_default.png"/>\r\n		<p class="mt15 color9">暂时没有您的领取记录</p>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});