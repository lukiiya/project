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
})();exports.content=content;exports.recommendList=recommendList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="typeList">\r\n	<div class="ui-flex_item" recommendType="0">全部</div>\r\n	<div class="ui-flex_item" recommendType="1">单关</div>\r\n	<div class="ui-flex_item" recommendType="2">串关</div>\r\n</div>\r\n<p class="clearfix pl10 pr10 mt5" id="countNum">\r\n	<span class="fl"><span id="recommendIncomeCount">0</span>人购买</span>\r\n	<span class="fr">收米<span class="num" id="recommendIncomeAmount">0</span></span>\r\n</p>\r\n<ul class="infoBox mt5" id="recommendList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function recommendList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,isLinChang=$data.isLinChang,isGirl=$data.isGirl,amount=$data.amount,readCount=$data.readCount,matchList=$data.matchList,match=$data.match,league=$data.league,home=$data.home,away=$data.away,matchNum=$data.matchNum,beginTime=$data.beginTime,d=$data.d,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,rich=$data.rich,matchType=$data.matchType,divideStatistics=$data.divideStatistics,dCount=$data.dCount,dAmount=$data.dAmount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,$=$data.$,access=$data.access,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var isLinChang = plan.isLinChang || false;
	var isGirl = plan.isGirl || false;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchList = plan.matchList || [];
	var match = (matchList.length > 0 && matchList[0]) || {};
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var matchNum = matchList.length;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var statistics = plan.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var divideStatistics = plan.divideStatistics || {};
	var dCount = divideStatistics.count || 0;
	var dAmount = (divideStatistics.amount || 0)/100;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
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
$out+='\r\n					</p>\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span class="color_red">免费</span>\r\n								';
 } else { 
$out+='\r\n									<span class="color_red">查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n							';
 } 
$out+='\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex count_box">\r\n			<div class="plan_total">\r\n				';
 if(amount <= 0) { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(readCount);
$out+='</span>人阅读</span>\r\n				';
 } else { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(sCount);
$out+='</span>人购买</span>\r\n				';
 } 
$out+='\r\n				<span>收米<span class="num">';
$out+=$escape(sAmount);
$out+='</span></span>\r\n			</div>\r\n			<div class="ticket_commission">\r\n				<span><span class="num">';
$out+=$escape(dCount);
$out+='</span>人跟单</span>\r\n				<span>提成<span class="num">';
$out+=$escape(dAmount);
$out+='</span></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#editPlan">写推荐</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});