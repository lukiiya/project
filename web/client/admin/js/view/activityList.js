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
})();exports.content=content;exports.activityList=activityList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">活动列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="活动名称" id="activityName">\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="160">活动名称</th>\r\n					<th width="140">开始时间</th>\r\n					<th width="140">结束时间</th>\r\n					<th width="90">总金额</th>\r\n					<th width="90">总数量</th>\r\n					<th width="90">消耗金额</th>\r\n					<th width="90">消耗数量</th>\r\n					<th width="60">备注</th>\r\n					<th width="90">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,activity=$data.activity,activityId=$data.activityId,activityName=$data.activityName,beginTime=$data.beginTime,endTime=$data.endTime,sumAmount=$data.sumAmount,sumCount=$data.sumCount,amount=$data.amount,count=$data.count,remark=$data.remark,$escape=$helpers.$escape,$out=''; 	for ( var i = 0, length = list.length; i < length; i++) {
	var activity = list[i] || {};
	var activityId = activity.activityId;
	var activityName = activity.activityName;
	var beginTime = activity.beginTime;
	var endTime = activity.endTime;
	var sumAmount = activity.sumAmount/100;
	var sumCount = activity.sumCount;
	var amount = activity.amount/100;
	var count = activity.count;
	var remark = activity.remark;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(activityName);
$out+='</td>\r\n		<td>';
$out+=$escape(beginTime);
$out+='</td>\r\n		<td>';
$out+=$escape(endTime);
$out+='</td>\r\n		<td>';
$out+=$escape(sumAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(sumCount);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(count);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td>\r\n			<a class="examine activityDetail" activityId="';
$out+=$escape(activityId);
$out+='">查看详情</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});