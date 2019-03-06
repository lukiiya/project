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
})();exports.content=content;exports.userRankListBox=userRankListBox;exports.winRateRankListBox=winRateRankListBox;exports.profitRateRankListBox=profitRateRankListBox;exports.userRankList=userRankList;exports.winRateRankList=winRateRankList;exports.profitRateRankList=profitRateRankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function userRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="redman_box" id="userRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function winRateRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="profit_box" id="winRateRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function profitRateRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="profit_box" id="profitRateRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function userRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,userRank=$data.userRank,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,salePlanCount=$data.salePlanCount,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var userRank = list[i] || {};
	var userNo = userRank.userNo;
	var realName = userRank.realName;
	var nickName = userRank.nickName;
	var profileImg = userRank.profileImg;
	var personalImg = userRank.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = userRank.tag || "";
	userTag = userTag.substr(0, 10);
	var continueWin = userRank.continueWin || 0;
	var index = i+pageSize*(pageNum-1)+1;
	var salePlanCount = userRank.salePlanCount || 0;

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="redman_ranked fr ">\r\n				<span class="icon_medal"></span>\r\n				<span class="redman_num">';
$out+=$escape(continueWin);
$out+='</span>\r\n				<span>场连红</span>\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function winRateRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,winRate=$data.winRate,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,resultPlanCount=$data.resultPlanCount,salePlanCount=$data.salePlanCount,userTag=$data.userTag,$=$data.$,g=$data.g,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,$escape=$helpers.$escape,groupNo=$data.groupNo,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var winRate = list[i] || {};
	var userNo = winRate.userNo;
	var realName = winRate.realName;
	var nickName = winRate.nickName;
	var profileImg = winRate.profileImg;
	var personalImg = winRate.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var resultPlanCount = winRate.resultPlanCount;
	var salePlanCount = winRate.salePlanCount || 0;
	var userTag = winRate.tag || "";
	userTag = userTag.substr(0, 10);
	var winRate = (+winRate.winRate || 0).toFixed(2);
	winRate = winRate.replace(/\.0+$/g, '');//删除末尾是.00;
	var index = i+pageSize*(pageNum-1)+1;

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="fr redman_right">\r\n				<!--<span class="icon_medal"></span>-->\r\n				<span class="color9 size15">7日胜率 <span class="redman_num">';
$out+=$escape(winRate);
$out+='%</span></span><br />\r\n				<span class="color9 mt5">(';
$out+=$escape(resultPlanCount);
$out+='场)</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function profitRateRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,profitRate=$data.profitRate,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,resultPlanCount=$data.resultPlanCount,salePlanCount=$data.salePlanCount,userTag=$data.userTag,$=$data.$,g=$data.g,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,$escape=$helpers.$escape,groupNo=$data.groupNo,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var  profitRate = list[i] || {};
	var userNo =  profitRate.userNo;
	var realName =  profitRate.realName;
	var nickName =  profitRate.nickName;
	var profileImg =  profitRate.profileImg;
	var personalImg =  profitRate.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var resultPlanCount = profitRate.resultPlanCount;
	var salePlanCount = profitRate.salePlanCount || 0;
	var userTag =  profitRate.tag || "";
	userTag = userTag.substr(0, 10);
	var profitRate = (+ profitRate.profitRate || 0).toFixed(2);
	profitRate = profitRate.replace(/\.0+$/g, '');//删除末尾是.00;
	var index = i+pageSize*(pageNum-1)+1;
	

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='	\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="fr redman_right">\r\n				<!--<span class="icon_medal"></span>-->\r\n				<span class="color9 size15">7日盈利 <span class="redman_num">';
$out+=$escape(profitRate);
$out+='%</span></span><br />\r\n				<span class="color9 mt5">(';
$out+=$escape(resultPlanCount);
$out+='场)</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});