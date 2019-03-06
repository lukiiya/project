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
var $helpers=this,$out='';$out+='<ul class="infoBox" id="recommendList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function recommendList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,lotteryId=$data.lotteryId,amount=$data.amount,readCount=$data.readCount,matchType=$data.matchType,isSale=$data.isSale,rich=$data.rich,prizeStatus=$data.prizeStatus,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,divideStatistics=$data.divideStatistics,dCount=$data.dCount,dAmount=$data.dAmount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var lotteryId = plan.lotteryId;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchType = plan.matchType || 0;
	var isSale = plan.isSale || false;
	var rich = plan.rich || false;
	var prizeStatus = plan.prizeStatus;
	var statistics = plan.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var divideStatistics = plan.divideStatistics || {};
	var dCount = divideStatistics.count || 0;
	var dAmount = (divideStatistics.amount || 0)/100;
	var betContent = plan.betContentList[0] || {};
	var betContentResult = betContent.betContentResult || {};
	var name = betContentResult.name;
	var lotteryIssue = plan.lotteryIssue || {};
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
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\n						开奖：';
$out+=$escape(drawTime);
$out+='\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex count_box">\r\n			<div class="plan_total">\r\n				';
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
$out+='</span></span>\r\n			</div>\r\n			';
 if (isSale) { 
$out+='\r\n				<div class="ticket_commission">\r\n					<span><span class="num">';
$out+=$escape(dCount);
$out+='</span>人跟单</span>\r\n					<span>提成<span class="num">';
$out+=$escape(dAmount);
$out+='</span></span>\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#editPlan">写推荐</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});