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
})();exports.content=content;exports.financeRecordList=financeRecordList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<!--<div class="ui-flex tab_nav mb5" id="typeList">\r\n	<div class="ui-flex_item" financeType="1">彩金</div>\r\n	<div class="ui-flex_item" financeType="0">米粒</div>\r\n</div>-->\r\n<table align="center">\r\n	<thead>\r\n		<tr>\r\n			<th width="24%">时间</th>\r\n			<th width="38%">金额</th>\r\n			<th width="38%">获取渠道</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody class="charge_con" id="financeRecordList" align="center"></tbody>\r\n</table>';
return new String($out);
}).call(templateUtils,$data).toString()}function financeRecordList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,financeRecord=$data.financeRecord,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,type=$data.type,amount=$data.amount,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var financeRecord = list[i] || {};
	var financeType = financeRecord.financeType;
	var financeTypeMap = {'0': '米粒', '1': '彩金'};
	var type = financeRecord.type;//类型, 1=消费, 2=收益, 3=提款, 4=充值
	var amount = financeRecord.amount/100 || 0;
	var remark = financeRecord.remark || '';
	var createTime = financeRecord.createTime || "";
	var matchTime = createTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (matchTime) {
		day = matchTime[1];
		time = matchTime[2];
	}
	if (financeType == 0 && type == 1) {
		if (remark.indexOf('优惠券') != -1) {
			remark = '米粒消费('+remark+')';	
		} else {
			remark = '米粒消费';
		}
	}
	if (financeType == 1 && type == 1) {
		if (remark.indexOf('优惠券') != -1) {
			remark = '投注('+remark+')';	
		} else {
			remark = '投注';
		}
	}
	if (type == 1 || type == 3) {
		amount = '-' + amount;	
	}
	if (type == 1) {
		remark = remark || '消费';
	} else if (type == 2) {
		remark = remark || '收益';
	} else if (type == 3) {
		remark = remark || '提款';
	} else if (type == 4) {
		remark = remark || '充值';
	}

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(day);
$out+='<br>';
$out+=$escape(time);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});