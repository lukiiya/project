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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,nickName=$data.nickName,ticketStatistics=$data.ticketStatistics,realName=$data.realName,userName=$data.userName,ticketTotalAmount=$data.ticketTotalAmount,prizeTotalAmount=$data.prizeTotalAmount,depositTotalAmount=$data.depositTotalAmount,spareTotalAmount=$data.spareTotalAmount,ticketAmountList=$data.ticketAmountList,length=$data.length,$escape=$helpers.$escape,i=$data.i,date=$data.date,amount=$data.amount,$out='';
	var nickName = ticketStatistics.nickName;
	var realName = ticketStatistics.realName;
	var userName = realName || nickName;
	var ticketTotalAmount = ticketStatistics.ticketTotalAmount/100 || 0;
	var prizeTotalAmount = (ticketStatistics.prizeTotalAmount/100 || 0).toFixed(2);
	var depositTotalAmount = ticketStatistics.depositTotalAmount/100 || 0;
	var spareTotalAmount = (ticketStatistics.spareTotalAmount/100 || 0).toFixed(2);
	var ticketAmountList = ticketStatistics.ticketAmountList || [];
	var length = ticketAmountList.length;

$out+='\r\n	<ul class="ticket_detail">\r\n		<li class="textC mb15">出票人：';
$out+=$escape(userName);
$out+='</li>\r\n		<li>共出票：<span class="color_red">';
$out+=$escape(ticketTotalAmount);
$out+='</span>元</li>\r\n		<li>共中奖：<span class="color_red">';
$out+=$escape(prizeTotalAmount);
$out+='</span>元</li>\r\n		<li>预付出票款：<span class="color_g">';
$out+=$escape(depositTotalAmount);
$out+='</span>元</li>\r\n		<li>剩余出票款：<span class="color_g">';
$out+=$escape(spareTotalAmount);
$out+='</span>元</li>\r\n	</ul>\r\n	<ul class="month_bill">\r\n		';
 for (var i = 0; i < length; i++) { 
			var date = ticketAmountList[i].date;
			var amount = ticketAmountList[i].amount/100 || 0;	
		
$out+='\r\n			<li class="item ui-flex">\r\n				<span>';
$out+=$escape(date);
$out+='</span>\r\n				<span class="color6">出票：';
$out+=$escape(amount);
$out+='元</span>\r\n			</li>\r\n		';
 } 
$out+='\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});