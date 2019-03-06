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
})();exports.content=content;exports.focusListBox=focusListBox;exports.focusList=focusList;exports.noFocusList=noFocusList;exports.userListBox=userListBox;exports.groupList=groupList;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function focusListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="attention_box_box">\r\n		<ul class="attention_box" id="focusList"></ul>\r\n	</div>\r\n	<div class="attention_mask_box" style="display: none;" id="showNoFocusList">\r\n		<div class="mask_top clearfix">\r\n			<span style="background-color: #ff8502;"></span>\r\n			<span style="background-color: #31c145;"></span>\r\n			<span style="background-color: #359af0;"></span>\r\n			<span style="background-color: #ff4d4d;"></span>\r\n			推荐专家\r\n		</div>\r\n		<div class="mask_con">\r\n			<ul class="attention_box" id="noFocusList"></ul>\r\n		</div>\r\n		<span class="next" id="jumpFocus">跳过</span>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function focusList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,focus=$data.focus,status=$data.status,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,tag=$data.tag,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,planCount=$data.planCount,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var focus = list[i] || {};
	var status = focus.status || 0;
	var userNo = focus.userNo || "";
	var realName = focus.realName;
	var nickName = focus.nickName;
	var userName = realName || nickName;
	var tag = focus.tag || "";
	var userImg = focus.personalImg || focus.profileImg || (IMG_PATH + 'user_profile.png');
	var planCount = focus.planCount || 0;
	var continueWin = focus.continueWin || 0;
	var winCount = focus.winCount || 0;
	var profitRate = focus.profitRate || 0;
	var winRate = focus.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\r\n	<li class="attention_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<div class="attention_list clearfix">\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="attention_title ml10 fl">\r\n				<div class="attention_titleMan">\r\n					<span>';
$out+=$escape(userName);
$out+='</span>\r\n					';
 if (continueWin > 1) { 
$out+='\r\n						<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n					';
 } else if(winCount > 0) { 
$out+='\r\n						<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n					';
 } else if (profitRate > 0) { 
$out+='\r\n						<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n					';
 } else if (winRate > 0) { 
$out+='\r\n						<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="attention_titleTag">';
$out+=$escape(tag);
$out+='</div>\r\n			</div>\r\n			<div class="attention_inform fr">\r\n				';
 if (planCount > 0) { 
$out+='\r\n				<span class="attention_num">';
$out+=$escape(planCount);
$out+='</span>\r\n				';
 } 
$out+='\r\n				<span class="arrow_right attention_right"></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function noFocusList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,focus=$data.focus,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,tag=$data.tag,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var focus = list[i] || {};
	var userNo = focus.userNo || "";
	var realName = focus.realName;
	var nickName = focus.nickName;
	var userName = realName || nickName;
	var tag = focus.tag || "";
	var userImg = focus.personalImg || focus.profileImg || (IMG_PATH + 'user_profile.png');

$out+='\r\n	<li class="attention_list_box" >\r\n		<div class="attention_list clearfix">\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="attention_title ml10 fl">\r\n				<div class="attention_titleMan">\r\n					<span>';
$out+=$escape(userName);
$out+='</span>\r\n				</div>\r\n				<div class="attention_titleTag">';
$out+=$escape(tag);
$out+='</div>\r\n			</div>\r\n			<div class="attention_inform fr">\r\n				<span class="attention_focus" status="1" userNo="';
$out+=$escape(userNo);
$out+='">+关注</span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userListBox($data){return (function anonymous($data,$id
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