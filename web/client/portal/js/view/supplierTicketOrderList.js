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
})();exports.content=content;exports.supplierTicketOrderList=supplierTicketOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,type=$data.type,$out='';$out+='<div class="tabBar">\r\n		<div class="ui-flex bg_c_f" id="typeList">\r\n			<div class="ui-flex_item ';
$out+=$escape(type==1?'active':'');
$out+='" type="1">\r\n				<span class="positionR">\r\n					未打票\r\n					<!--<b class="red_dot"></b>-->\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==2?'active':'');
$out+='" type="2">\r\n				<span>\r\n					已打票\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==3?'active':'');
$out+='" type="3">\r\n				<span class="positionR">\r\n					待派奖\r\n					<b class="tips_num" id="tipsNum" style="display: none;"></b>\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==4?'active':'');
$out+='" type="4">\r\n				<span>\r\n					已派奖\r\n				</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="textC mt5" id="statistics" style="display: none;">共 <span class="color_red" id="totalCount"></span> 单， <span class="color_red" id="totalMoney"> </span>元</div>\r\n	<ul class="mt5 wdp" id="supplierTicketOrderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function supplierTicketOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,supplierTicket=$data.supplierTicket,orderNo=$data.orderNo,orderNumeric=$data.orderNumeric,ticketStatus=$data.ticketStatus,ticketPrizeAmount=$data.ticketPrizeAmount,type=$data.type,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,$escape=$helpers.$escape,$out='';  for (var i = 0, length = list.length; i < length; i++) {
		var supplierTicket = list[i] || {};
		var orderNo = supplierTicket.orderNo;
		var orderNumeric = supplierTicket.orderNumeric;
		var ticketStatus = supplierTicket.ticketStatus;
		var ticketPrizeAmount = supplierTicket.ticketPrizeAmount/100 || 0;
		var type = type;
		var imgMap = {"2":"icon_dkj_s","3":"icon_wzj_s","4":"icon_yzj_s","5":"icon_ypj"};
		var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖"};
		var createTime = supplierTicket.createTime && supplierTicket.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	';
 if (type == 1) { 
$out+='\r\n		<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n			<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n			<span class="fr color6">未打票<span class="arrow_right"></span></span>\r\n		</li>\r\n		<!-- <li class="bg_c_f" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n			<div class="ui-flex mb5">\r\n				<span class="ui-flex_item size13">距离出票截止</span>\r\n				<span class="ui-flex_item textR">竞足</span>\r\n			</div>\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item count_time">1小时20分</span>\r\n				<span class="ui-flex_item textR"><span class="color_red">40</span>元</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</li> -->\r\n	';
 } else if (type == 2) { 
$out+='\r\n		<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n			<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n			';
 if (ticketStatus == 5) { 
$out+='\r\n				<span class="fr color6"><span class="color_red">中';
$out+=$escape(ticketPrizeAmount);
$out+='</span><span class="arrow_right"></span></span>\r\n			';
 } else { 
$out+='\r\n				<span class="fr win_status">\r\n					';
 if (ticketStatus == 4 || ticketStatus == 6) { 
$out+='\r\n					<i class="icon_yzj_s"></i>\r\n					<span>已中奖</span>\r\n					';
 } else { 
$out+='\r\n					<i class="';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n					<span>';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='</span>\r\n					';
 } 
$out+='\r\n					<span class="arrow_right attention_right"></span>\r\n				</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n	';
 } else if (type == 3 || type == 4) { 
$out+='\r\n	<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n		<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n		<span class="fr color6"><span class="color_red">';
$out+=$escape(ticketPrizeAmount==0?'请填写奖金':'中'+ticketPrizeAmount);
$out+='</span><span class="arrow_right"></span></span>\r\n	</li>\r\n	';
 } 
$out+='\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});