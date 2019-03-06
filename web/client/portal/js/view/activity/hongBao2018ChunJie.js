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
})();exports.content=content;exports.chunjieMask=chunjieMask;exports.getSuccessBox=getSuccessBox;exports.notStartBox=notStartBox;exports.rankList=rankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,isReceiveFinish=$data.isReceiveFinish,isReceive=$data.isReceive,isBegin=$data.isBegin,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
		var period = info.period;
		var isReceiveFinish = info.isReceiveFinish;
		var isReceive = info.isReceive;
		var isBegin = !!info.isBegin;
	
$out+='\r\n	<div class="top_img">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/2018chunjie_top.png" />\r\n	</div>\r\n	<div class="red_packet">\r\n		<img class="img-responsive red_packet_bg" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_bg.png"/>\r\n		<div class="packet_cont">\r\n			';
 if (period == 1) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title1.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">新春到来送万福</div>\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月16日） 08:00 开抢</div>\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 2) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title2.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">装金装银装财神</div>\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月20日） 08:00 开抢</div>	\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 3) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title3.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">顺风顺意开门红</div>		\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月22日） 08:00 开抢</div>		\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 0) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title3.png"/>\r\n				<div class="start_time">顺风顺意开门红</div>		\r\n			';
 } 
$out+='\r\n			';
 if (isReceive) { 
$out+='\r\n				<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn2.png"/>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="notice">红包已领取，初五记得再来哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="notice">红包已领取，初七记得再来哦！</p>\r\n				';
 } 
$out+='\r\n			';
 } else if (isReceiveFinish || period == 0) { 
$out+='\r\n				<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn3.png"/>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="notice">红包已抢完，初五记得再来哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="notice">红包已抢完，初七记得再来哦！</p>\r\n				';
 } 
$out+='\r\n			';
 } else if (!isReceive) { 
$out+='\r\n				<img class="red_packet_btn" id="startBtn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn1.png"/>\r\n			';
 }
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="scroll_msg">\r\n		<img class="msg_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/msg_bg.png" alt="" />\r\n		<ul class="msg_move" id="rankList"></ul>\r\n	</div>\r\n	<div class="rules_wrap">\r\n		<h2 class="rules_title">红包说明</h2>\r\n		<ul class="rules">\r\n			<li>1. 本次活动人人都有参与机会，同一微信账号和手机号码抢红包当天仅能抢一个红包；</li>\r\n			<li>2. 初一（2月16日）88个红包、初五（2月20日）188个红包、初七（2月22日）888个红包，当天08:00--18:00可在活动页面抢红包；</li>\r\n			<li>3. 抢到红包金额将以彩金的方式派发到您账户里面，红包彩金不可提现，可用于购彩，中奖后可提现。</li>\r\n		</ul>\r\n	</div>\r\n	<div class="bottom_img">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/2018chunjie_bottom.png" />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chunjieMask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="2018chunjieMask">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getSuccessBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,presentTicketAmount=$data.presentTicketAmount,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,isAndroid=$data.isAndroid,$out='';
		var period = info.period;
		var presentTicketAmount = info.presentTicketAmount/100 || 0;
	
$out+='\r\n	<div class="popup_box2">\r\n		<div class="get_success">\r\n			<a class="colse_btn" id="closePopBtn"></a>\r\n			<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/success_bg.png"/>\r\n			<div class="success_cont">\r\n				<h2 class="success_title">恭喜发财</h2>\r\n				<p class="success_detail">您获得 <span class="money">';
$out+=$escape(presentTicketAmount);
$out+='</span> 元红包</p>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="success_tips">初五、初七还有红包等着您，<br />记得来抢哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="success_tips">初七还有红包等着您，<br />记得来抢哦！</p>\r\n				';
 } else if (period == 3) { 
$out+='\r\n					<p class="success_tips" style="visibility: hidden;">红包已抢完</p>\r\n				';
 } 
$out+='\r\n				';
 if (isAndroid) { 
$out+='\r\n					<p class="success_status">红包已派发到您的账户中,<br />请前往查收</p>\r\n				';
 } else { 
$out+='\r\n					<p class="success_status">红包已派发到您的账户中</p>\r\n					<div class="pop_btn" id="checkBtn">查看</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notStartBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,$out='';
		var period = info.period;
	
$out+='\r\n	<div class="popup_box1">\r\n		<div class="not_started">\r\n			<h2 class="pop_title">亲，未到开抢时间哦！</h2>\r\n			';
 if (period == 1) { 
$out+='\r\n				<p class="pop_detail">2月16日 08:00 可开抢</p>\r\n			';
 } else if (period == 2) { 
$out+='\r\n				<p class="pop_detail">2月20日 08:00 可开抢</p>\r\n			';
 } else if (period == 3) { 
$out+='\r\n				<p class="pop_detail">2月22日 08:00 可开抢</p>\r\n			';
 } 
$out+='\r\n			<div class="pop_btn" id="closePopBtn">我知道啦</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,rank=$data.rank,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,prizeTicketAmount=$data.prizeTicketAmount,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var rank = list[i] || {};
	var realName = rank.realName;
	var nickName = rank.nickName;
	var userName = realName || nickName;
	var prizeTicketAmount = rank.prizeTicketAmount/100 || 0;

$out+='\r\n	<li>恭喜 [';
$out+=$escape(userName);
$out+='] 抢到一个 <span class="money">';
$out+=$escape(prizeTicketAmount);
$out+='</span> 元大红包</li>\r\n';
 } 
} else { 
$out+='\r\n	<li>恭喜发财，财运滚滚来！</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});