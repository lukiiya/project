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
})();exports.content=content;exports.replayList=replayList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="infoBox" id="replayList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function replayList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,replay=$data.replay,replayNo=$data.replayNo,title=$data.title,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var replay = list[i] || {};
	var replayNo = replay.replayNo;
	var title = replay.title;
	var user = replay.user || {};
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

$out+='\n	<li class="item clearfix" replayNo="';
$out+=$escape(replayNo);
$out+='">\n		<div class="recommend_cont">\n			<div class="msg color9 clearfix borderB">\n				<img class="icon_span img38 userProfile" userNo="';
$out+=$escape(userNo);
$out+='" src="';
$out+=$escape(userImg);
$out+='" />\n				<span class="personal">\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\n				</span>\n				';
 if (continueWin > 1) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\n				';
 } else if(winCount > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\n				';
 } else if (profitRate > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\n				';
 } else if (winRate > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\n				';
 } else { 
$out+='\n					\n				';
 }
$out+='\n			</div>\n			<p class="recommend_title pt15 pb5 pl10">';
$out+=$escape(title);
$out+='</p>\n			</div>\n		</div>\n	</li>\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});