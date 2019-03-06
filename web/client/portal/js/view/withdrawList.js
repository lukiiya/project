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
})();exports.content=content;exports.withdrawList=withdrawList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="charge_top">\r\n		<span>时间</span>\r\n		<span>提款数量</span>\r\n		<span>对应金额</span>\r\n		<span>状态</span>\r\n	</div>\r\n	<ul class="charge_con" id="withdrawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function withdrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,withdraw=$data.withdraw,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,amount=$data.amount,status=$data.status,statusMap=$data.statusMap,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
		var withdraw = list[i] || {};
		var financeType = withdraw.financeType;
		var financeTypeMap = {'0': '米粒', '1': '彩金'}; 
		var amount = withdraw.amount/100 || 0;
		var status = withdraw.status;
		var statusMap = {"1":"未审核","2":"已审核","3":"已打款","4":"已拒绝","5":"打款中"};
		var remark = withdraw.remark || '';
		var createTime = withdraw.createTime || "";
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
$out+=$escape(amount);
$out+='元</span>\r\n		<span remark="';
$out+=$escape(remark);
$out+='" style="';
$out+=$escape(status==4&&remark!=''?'color:#1a739c;text-decoration:underline;':'');
$out+='">\r\n			';
$out+=$escape(statusMap[status]);
$out+='\r\n		</span>	\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});