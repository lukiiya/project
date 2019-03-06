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
})();exports.content=content;exports.planList=planList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="girl_top">\r\n		<div class="girl_img36 girl_topl" id="backBtn" >\r\n			<span class="arrow"></span>\r\n		</div>\r\n		<div class="girl_img36 girl_topr" id="homeBtn">\r\n			<span></span>\r\n		</div>\r\n	</div>\r\n	<ul class="girl_bigbox" id="planList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,girlCover=$data.girlCover,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,match=$data.match,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,$escape=$helpers.$escape,$string=$helpers.$string,$=$data.$,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var girlCover = plan.girlCover || '';
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var matchNum = matchList.length;
	var match = (matchNum > 0 && matchList[0]) || {};
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 

$out+='\r\n	<li class="girl_box planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" matchNum=';
$out+=$escape(matchNum);
$out+=' style="background-image:url(';
$out+=$escape(girlCover);
$out+=');';
$out+=$escape(matchNum<=0?'margin-bottom:10px;':'');
$out+='">\r\n		<div class="bottom_background clearfix">\r\n			<div class="bottom_background clearfix">\r\n			<div class="item clearfix">\r\n				<div class="msg color9 clearfix">\r\n					<div class="girl_cli">\r\n						<img class="userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='"></img>\r\n					</div>\r\n					<div class="girl_title">\r\n						<div class="girl_name">\r\n							<span class="ellipsis">';
$out+=$escape(userName);
$out+='</span>\r\n							';
 if (continueWin > 1) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">';
$out+=$escape(continueWin);
$out+='连红</span>\r\n							';
 } else if(winCount > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">10中';
$out+=$escape(winCount);
$out+='</span>\r\n							';
 } else if (profitRate > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">盈';
$out+=$escape(profitRate);
$out+='%</span>\r\n							';
 } else if (winRate > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">胜';
$out+=$escape(winRate);
$out+='%</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n						<span class="ellipsis size12">';
$out+=$escape(userTag);
$out+='</span>\r\n					</div>\r\n					';
 if (isSale) { 
$out+='\r\n					<span class="ticket size10 fr userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="detailBox ';
$out+=$escape(matchNum<=0?'hide':'');
$out+='">\r\n					<div class="belle_top">\r\n							<span class="ellipsis color_yellow" style="';
$out+=$escape(matchType == 2 ? 'color: #003cff' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n							<span class="ellipsis">: ';
$out+=$string(matchType == 2 ? away : home);
$out+='</span>\r\n							<span class="ellipsis">VS</span>\r\n							<span class="ellipsis"> ';
$out+=$string(matchType == 2 ? home : away);
$out+='</span>\r\n							<div class="size12 color9 fr match_time">';
$out+=$escape(beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="belle_bottom">\r\n						<div class="match_left fl">\r\n							';
 if (matchNum > 1 ) { 
$out+='\r\n								<span class="match_icon all_up">串关</span>\r\n							';
 } else { 
$out+='\r\n								<span class="match_icon all_up">单关</span>\r\n							';
 } 
$out+='\r\n							';
 if (hasPic) {
$out+='\r\n								';
 if (isGirl) { 
$out+='\r\n								<span class="match_icon bg_c_p">美照</span>\r\n								';
 } else { 
$out+='\r\n								<span class="match_icon bg_c_b">实单</span>\r\n								';
 } 
$out+='\r\n							';
 } 
$out+='\r\n								<span class="match_icon w24 bg_c_y ';
$out+=$escape(isLinChang?'':'hide');
$out+='">临场</span>\r\n								<!--<span class="match_icon w24 bg_c_g ">语音</span>-->\r\n						</div>\r\n						<div class="price">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span>免费</span>\r\n								';
 } else { 
$out+='\r\n									<span>查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});