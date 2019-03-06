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
})();exports.content=content;exports.chargeList=chargeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="charge_top">\r\n		<span>时间</span>\r\n		<span>获得数量</span>\r\n		<span>来源</span>\r\n		<span>状态</span>\r\n	</div>\r\n	<ul class="charge_con" id="chargeList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function chargeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,charge=$data.charge,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,type=$data.type,typeMap=$data.typeMap,amount=$data.amount,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var charge = list[i] || {};
	var financeType = charge.financeType;
	var financeTypeMap = {'0': '米粒', '1': '彩金'}; 
	var type = charge.type || 0;
	var typeMap = {'1': '现金充值', 2: '平台赠送'};
	var amount = charge.amount/100 || 0;
	var remark = charge.remark || '';
	var createTime = charge.createTime || "";
	var matchTime = createTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (matchTime) {
		day = matchTime[1];
		time = matchTime[2];
	}

$out+='\r\n	<li class="charge_list">\r\n		<span>';
$out+=$escape(day);
$out+='<br>';
$out+=$escape(time);
$out+='</span>\r\n		<span>';
$out+=$escape(amount);
$out+=$escape(financeTypeMap[financeType]);
$out+='</span>\r\n		<span>';
$out+=$escape(remark?remark:typeMap[type]);
$out+='</span>\r\n		<span>成功</span>	\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});