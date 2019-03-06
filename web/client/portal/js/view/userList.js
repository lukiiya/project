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
})();exports.content=content;exports.groupList=groupList;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav" id="groupList"></div>\r\n	<div class="mt5 clearfix" id="userList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function groupList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,group=$data.group,groupNo=$data.groupNo,name=$data.name,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var group = list[i] || {};
	var groupNo = group.groupNo;
	var name = group.name;

$out+='\r\n<span class="item" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n	<span>';
$out+=$escape(name);
$out+='</span>\r\n</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,redDot=$data.redDot,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var redDot = !!user.redDot;

$out+='\r\n<div class="msg" userNo="';
$out+=$escape(userNo);
$out+='">\r\n	<img class="icon_span img40 mb10" src="';
$out+=$escape(userImg);
$out+='"></img>\r\n	';
 if (redDot) {
$out+='\r\n		<span class="red_dot"></span>\r\n	';
 } 
$out+='\r\n	<br/>';
$out+=$escape(userName);
$out+='\r\n	';
 if (continueWin > 1) { 
$out+='\r\n		<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n	';
 } else if(winCount > 0) { 
$out+='\r\n		<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n	';
 } else if (profitRate > 0) { 
$out+='\r\n		<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n	';
 } else if (winRate > 0) { 
$out+='\r\n		<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});