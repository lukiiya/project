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
})();exports.content=content;exports.spreadList=spreadList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="clearfix pl10 pr10" id="countNum">\r\n	<span class="fl"><span id="spreadIncomeCount">0</span>人次</span>\r\n	<span class="fr">收米<span class="num" id="spreadIncomeAmount">0</span></span>\r\n</p>\r\n<ul class="infoBox" id="spreadList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function spreadList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,amount=$data.amount,planAccess=$data.planAccess,createTime=$data.createTime,d=$data.d,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,planType=$data.planType,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var order = list[i] || {};
	var planNo = order.planNo;
	var amount = (order.amount || 0)/100;
	var planAccess = order.planAccess+'';
	var createTime = order.createTime && order.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = order.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var statistics = order.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var planType = order.planType;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(planAccess);
$out+='" planType="';
$out+=$escape(planType);
$out+='">\r\n		<p class="title color6 clearfix">\r\n			<img class="userHead" src="';
$out+=$escape(userImg);
$out+='">\r\n			<span class="fl">';
$out+=$escape(userName);
$out+='</span>\r\n			<span class="fr">';
$out+=$escape(createTime);
$out+='</span>\r\n		</p>\r\n		<p class="title ui-flex">\r\n			<span class="ui-flex_item">消费金额: <span>';
$out+=$escape(amount);
$out+='</span> 米</span>\r\n			<span class="ui-flex_item">收益：<span class="num">';
$out+=$escape(sAmount);
$out+='</span> 粒米</span>\r\n			<span class="ui-flex_item  textR"><span class="arrow arrow_right"></span></span>\r\n		</p>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>分享专家的推荐，其他人购买后，您将获得50%收益。</p>\r\n			<span class="btn ellipsis" href="#home">去分享</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});