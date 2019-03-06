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
})();exports.content=content;exports.orderList=orderList;exports.digitalOrderList=digitalOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="title clearfix">\r\n	<!--<span class="fl"><span id="orderCount">0</span>篇</span>-->\r\n	<!--<span class="fr">支出<span class="num" id="orderAmount">0</span></span>-->\r\n</p>\r\n<div class="ui-flex tab_nav" id="tabList">\r\n	<div class="ui-flex_item" tab="0">竞技彩</div>\r\n	<div class="ui-flex_item" tab="1">数字彩</div>\r\n</div>\r\n<ul class="infoBox mt10" id="orderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,planMatchType=$data.planMatchType,planPrizeStatus=$data.planPrizeStatus,amount=$data.amount,isSale=$data.isSale,matchList=$data.matchList,matchNum=$data.matchNum,plan=$data.plan,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,d=$data.d,$escape=$helpers.$escape,hasPic=$data.hasPic,isGirl=$data.isGirl,rich=$data.rich,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var order = list[i] || {};
		var planNo = order.planNo;
		var planMatchType = order.planMatchType || 1;
		var planPrizeStatus = order.planPrizeStatus || 0;
		var amount = (order.amount || 0)/100;
		var isSale = !!order.isSale;
		var matchList = order.matchList || {};
		var matchNum = matchList.length;
		var plan = order.plan || {};
		var title = plan.title;
		var saleTicketAmount = plan.saleTicketAmount/100 || 0;
		var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="recommend_cont">\r\n			<div class="pt10">\r\n				<div class="recommend_item">\r\n					<p class="recommend_title">\r\n						';
 if (title) { 
$out+='\r\n							';
 if (matchNum >1) { 
$out+='\r\n								<span class="">【串关】</span>\r\n							';
 } else { 
$out+='\r\n								<span class="">【单关】</span>\r\n							';
 } 
$out+='\r\n							';
 if (hasPic) {
$out+='\r\n								';
 if (isGirl) { 
$out+='\r\n									<span class="">【美照】</span>\r\n								';
 } else if (rich){ 
$out+='\r\n									<span class="">【豪单】</span>\r\n								';
 } else { 
$out+='\r\n									<span class="">【实单】</span>\r\n								';
 } 
$out+='\r\n							';
 } 
$out+='\r\n							';
$out+=$escape(title);
$out+='\r\n						';
 } else { 
$out+='\r\n							';
 
								for (var j = 0; j < matchNum; j++) { 
									var match = matchList[j] || {};
									var home = match.home;
									var away = match.away;
									var number = match.number;
							
$out+='\r\n								<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='<span>。\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n					</p>\r\n					';
 if (planPrizeStatus == 1) { 
$out+='\r\n						<img class="recommend_win_bg" src="';
$out+=$escape(IMG_PATH);
$out+='recommend_win_bg.png">\r\n					';
 } 
$out+='\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							<span class="color_red">查看</span>\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li id="noMatch" style="display: none;">\r\n		<div class="none">\r\n			<p>空空如也</p>\r\n			<span class="btn ellipsis" href="#home">看看专家的晒米</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,planMatchType=$data.planMatchType,planPrizeStatus=$data.planPrizeStatus,amount=$data.amount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var order = list[i] || {};
		var planNo = order.planNo;
		var planMatchType = order.planMatchType || 0;
		var planPrizeStatus = order.planPrizeStatus || 0;
		var amount = (order.amount || 0)/100;
		var betContent = order.betContentList[0] || {};
		var betContentResult = betContent.betContentResult || {};
		var name = betContentResult.name;
		var lotteryIssue = order.lotteryIssue || {};
		var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var issue = lotteryIssue.issue;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\r\n						开奖：';
$out+=$escape(drawTime);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (planPrizeStatus == 1) { 
$out+='\r\n					<img class="" src="';
$out+=$escape(IMG_PATH);
$out+='user_win_prize.png" style="width: 45px;position: relative;z-index: 5;"/>\r\n				';
 } else { 
$out+='\r\n					<span>查看</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li id="noMatch" style="display: none;">\r\n		<div class="none">\r\n			<p>空空如也</p>\r\n			<span class="btn ellipsis" href="#home">看看专家的晒米</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});