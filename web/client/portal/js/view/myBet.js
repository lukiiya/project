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
})();exports.content=content;exports.ticketOrderList=ticketOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="tabList">\n		<div class="ui-flex_item" tab ="0">全部</div>\n		<div class="ui-flex_item" tab ="1">跟单</div>\n		<div class="ui-flex_item" tab ="2">自选</div>\n		<div class="ui-flex_item" tab ="3">已中奖</div>\n	</div>\n	<ul class="my_doct mt5" id="ticketOrderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,ticketOrder=$data.ticketOrder,isSelfTicket=$data.isSelfTicket,orderNo=$data.orderNo,status=$data.status,planNickName=$data.planNickName,planRealName=$data.planRealName,planUserName=$data.planUserName,ticketStatus=$data.ticketStatus,ticketPrizeAmount=$data.ticketPrizeAmount,ticketSendPrizeAmount=$data.ticketSendPrizeAmount,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,lotteryId=$data.lotteryId,lotteryLogoMap=$data.lotteryLogoMap,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';  
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var ticketOrder = list[i] || {};
		var isSelfTicket = ticketOrder.isSelfTicket;
		var orderNo = ticketOrder.orderNo;
		var status = ticketOrder.status;
		var planNickName = ticketOrder.planNickName;
		var planRealName = ticketOrder.planRealName;
		var planUserName = planRealName || planNickName;
		var ticketStatus = ticketOrder.ticketStatus;
		var ticketPrizeAmount = (ticketOrder.ticketPrizeAmount || 0)/100;
		var ticketSendPrizeAmount = (ticketOrder.ticketSendPrizeAmount/100 || 0).toFixed(2);
		var imgMap = {"0":"icon_zzcp_s","1":"icon_cpsb_s","2":"icon_dkj_s","3":"icon_wzj_s","4":"icon_yzj_s","5":"icon_ypj","7":"icon_zzcp_s","8":"icon_dkj_s","9":"icon_zzcp_s"};
		var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖","7":"正在出票","8":"部分出票","9":"正在出票"};
		var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var lotteryId = ticketOrder.lotteryId || '';
		var lotteryLogoMap = {'SSQ':'icon_ssq','JCZQ':'icon_jczq','JCLQ':'icon_jclq','JSK3':'icon_jsk3','DLT':'icon_dlt','GX11X5':'icon_gx11x5','FC3D':'icon_fc3d','JZYP':'icon_jzyp','SJBGJ':'icon_sjbcgj','SJBGYJ':'icon_sjbcgj'}

$out+='\n	<li class="doct_item clearfix" orderNo=';
$out+=$escape(orderNo);
$out+='>\n		<img class="lottery_logo fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+=$escape(lotteryLogoMap[lotteryId]);
$out+='.png" />\n		<div class="fl">\n			<div class="nickname">\n				';
$out+=$escape(isSelfTicket?'自选投注':planUserName);
$out+='\n			</div>\n			<div class="color9 size12">\n				';
$out+=$escape(createTime);
$out+='\n			</div>\n		</div>\n			<div class="fr win_status">\n				';
 if (ticketStatus == 5) { 
$out+='\n					<span class="color_red">中';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\n				';
 } else if (ticketStatus == 6) { 
$out+='\n					<span class="color_red">部分派奖';
$out+=$escape(ticketSendPrizeAmount);
$out+='</span>\n				';
 } else if (status == 3) { 
$out+='\n					<i class="icon_ytk_s"></i>\n					<span>已退款</span>\n				';
 } else { 
$out+='\n					<i class="';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\n					<span>';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='</span>\n				';
 } 
$out+='\n				<span class="arrow_right attention_right"></span>\n			</div>\n	</li>\n';
 } 
} else { 
$out+='\n	<li>\n		<div class="none">\n			<p>您还没有跟单投注</p>\n			<span class="btn ellipsis" href="#ticketFollow">去跟单</span>\n		</div>\n	</li>\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});