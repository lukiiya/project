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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,replayNo=$data.replayNo,replay=$data.replay,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,resourceList=$data.resourceList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,$escape=$helpers.$escape,i=$data.i,length=$data.length,$out=''; 
	var replayNo = replay.replayNo || "";
	var content = replay.content || "";
	var upCount = replay.upCount || 0;
	var downCount = replay.downCount || 0;
	var shareCount = replay.shareCount || 0;
	var resourceList = replay.resourceList || [];
	var user = replay.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="replayDetail">\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});