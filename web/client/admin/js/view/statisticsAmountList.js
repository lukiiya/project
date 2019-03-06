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
})();exports.content=content;exports.statisticsAmountList=statisticsAmountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">价格统计</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="btn" type="submit" value="刷新" id="searchSubmit" />\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>价格</th>\r\n					<th>场次(占比)</th>\r\n					<th>购买数(占比)</th>\r\n					<th>购买金额(占比)</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsAmountList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsAmountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,statisticsAmount=$data.statisticsAmount,amount=$data.amount,planCount=$data.planCount,planOrderCount=$data.planOrderCount,planOrderAmount=$data.planOrderAmount,planCountPercent=$data.planCountPercent,totalPlanCount=$data.totalPlanCount,$=$data.$,g=$data.g,planOrderCountPercent=$data.planOrderCountPercent,totalPlanOrderCount=$data.totalPlanOrderCount,planOrderAmountPercent=$data.planOrderAmountPercent,totalPlanOrderAmount=$data.totalPlanOrderAmount,$escape=$helpers.$escape,$out=''; 
	var length = list.length;
	for (var i = 0; i < length; i++) {
	var statisticsAmount = list[i] || {};
	var amount = (statisticsAmount.amount || 0)/100;
	var planCount = statisticsAmount.planCount;
	var planOrderCount = statisticsAmount.planOrderCount || 0;
	var planOrderAmount = (statisticsAmount.planOrderAmount || 0)/100 ;
	var planCountPercent = (planCount*100/totalPlanCount).toFixed(2) + '';//转变成字符串
	planCountPercent = planCountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00
	var planOrderCountPercent = (planOrderCount*100/totalPlanOrderCount).toFixed(2) + '';//转变成字符串
	planOrderCountPercent = planOrderCountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00
	var planOrderAmountPercent = (planOrderAmount*100/totalPlanOrderAmount).toFixed(2) + '';//转变成字符串
	planOrderAmountPercent = planOrderAmountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(planCount);
$out+='(';
$out+=$escape(planCountPercent);
$out+=')</td>\r\n		<td>';
$out+=$escape(planOrderCount);
$out+='(';
$out+=$escape(planOrderCountPercent);
$out+=')</td>\r\n		<td>';
$out+=$escape(planOrderAmount);
$out+='(';
$out+=$escape(planOrderAmountPercent);
$out+=')</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td>';
$out+=$escape(totalPlanCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalPlanOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalPlanOrderAmount);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});