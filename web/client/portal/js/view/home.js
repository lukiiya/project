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
})();exports.content=content;exports.planList=planList;exports.userList=userList;exports.bannerList=bannerList;exports.dotList=dotList;exports.matchList=matchList;exports.rankList=rankList;exports.floatIcon=floatIcon;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="top_banner">\r\n		<!--<div class="my_head" id="signBtn">\r\n			<span class="icon_span img34 icon_sign"></span>\r\n		</div>-->\r\n		<div class="banner_img" id="bannerList"></div>\r\n		<div class="dot_box" id="dotList"></div>\r\n	</div>\r\n	<div class="banner">\r\n		<div class="ui-flex banner_gap">\r\n			<!-- <div class="ui-flex_item" groupNo="bet" id="bet" style="display: none;">\r\n				<span class="icon_span img45 icon_bet mb10"></span>\r\n				<br/>跟单市场\r\n			</div> -->\r\n			<div class="ui-flex_item" groupNo="5F5E102-BC6151" id="trader" style="display: none;">\r\n				<span class="icon_span img45 icon_trader mb10"></span>\r\n				<br/>操盘手\r\n			</div>\r\n			<div class="ui-flex_item" groupNo="5F5E109-BC6158">\r\n				<span class="icon_span img45 icon_basket_expert mb10"></span>\r\n				<br/>篮球专家\r\n			</div>\r\n			<div class="ui-flex_item" groupNo="5F5E104-BC6153">\r\n				<span class="icon_span img45 icon_football_expert mb10"></span>\r\n				<br/>足球专家\r\n			</div>\r\n			<!--<div class="ui-flex_item" groupNo="free">\r\n				<span class="icon_span img45 icon_free mb10"></span>\r\n				<br/>免费领米\r\n			</div>-->\r\n			<!--<div class="ui-flex_item" groupNo="cphb">\r\n				<span class="icon_span img45 icon_cphb mb10"></span>\r\n				<br/>彩票红包\r\n			</div>-->\r\n			<div class="ui-flex_item" groupNo="replay">\r\n				<span class="icon_span img45 icon_replay mb10"></span>\r\n				<br/>专家复盘\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<!--<div class="banner mt10" id="matchListBox">\r\n		<div class="title clearfix">\r\n			<span class="tuijian yborder">热门赛事</span>\r\n			<span class="fr mr15 recommend_tab" id="hotMatchTab">\r\n				<span class="color9 football" type="1">足球</span>\r\n				<span class="color9 basketball" type="2">篮球</span>\r\n			</span>\r\n		</div>\r\n		<ul class="bordertop textL" id="matchList"></ul>\r\n	</div>-->\r\n	<div class="top_singers clearfix bordertop" style="display:none" id="rankBox">\r\n		<img class="red_top" src="';
$out+=$escape(IMG_PATH);
$out+='top_singers.png" />\r\n		<ul class="msg_move" id="rankList"></ul>\r\n		<div class="top_more fr">\r\n			<i class="icon_more"></i>\r\n		</div>\r\n	</div>\r\n	<div class="banner mt10">\r\n		<div class="title clearfix">\r\n			<span class="tuijian">竞彩专家</span>\r\n			<span class="fr mr15 expert_tab" id="userTab">\r\n				<span class="color9" userType="1">推荐</span>\r\n				<span class="color9" userType="2">胜率</span>\r\n				<span class="color9" userType="3">盈利</span>\r\n			</span>\r\n			<!--<span class="color_g size12 mr10 fr" groupNo="5F5E103-BC6152">更多></span>-->\r\n		</div>\r\n		<div class="expert_list ui-flex bordertop pt10" id="userList"></div>\r\n	</div>\r\n	<div class="mt10">\r\n		<div class="title color3 clearfix">\r\n			<span class="tuijian redborder">最新推荐<span class="color9 size12 ml5">推荐有风险 投注请谨慎</span></span>\r\n			<span class="fr mr15 recommend_tab" id="recommendTab">\r\n				<span class="color9 football" matchType="1">足球</span>\r\n				<span class="color9 basketball" matchType="2">篮球</span>\r\n			</span>\r\n		</div>\r\n		<ul class="infoBox" id="planList"></ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var matchNum = matchList.length;
	var user = plan.user || {};
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
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="msg color9 clearfix">\r\n				<img class="icon_span img29 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" />\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n				</span>\r\n				';
 if (continueWin > 1) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\r\n				';
 } else if(winCount > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\r\n				';
 } else if (profitRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\r\n				';
 } else if (winRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\r\n				';
 } else { 
$out+='\r\n					\r\n				';
 }
$out+='\r\n			</div>\r\n			<div class="recommend_item">\r\n				<p class="recommend_title">\r\n					';
 if (hasPic) {
$out+='\r\n						<span class="">【实单】</span>\r\n					';
 } 
$out+='\r\n					';
 if (title) { 
$out+='\r\n						';
$out+=$escape(title);
$out+='\r\n					';
 } else { 
$out+='\r\n						';
 
							for (var j = 0; j < matchNum; j++) { 
								var match = matchList[j] || {};
								var home = match.home;
								var away = match.away;
								var number = match.number;
						
$out+='\r\n							<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n				</p>\r\n				<div class="clearfix mt25">\r\n					<span class="recommend_money fl">\r\n						';
 if (/^true$/i.test(access)) { 
$out+='\r\n							';
 if (amount == 0) { 
$out+='\r\n								<span class="color_red">免费</span>\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">查看</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n						';
 } 
$out+='\r\n					</span>\r\n					<span class="recommend_time fr">\r\n						截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,redDot=$data.redDot,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,type=$data.type,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	userTag = userTag.substr(0, 6);
	var redDot = !!user.redDot;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\r\n	\r\n	<div class="expert_item mb15" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<img class="img38" src="';
$out+=$escape(userImg);
$out+='"></img>\r\n		';
 if (redDot) { 
$out+='\r\n			<span class="red_dot"></span>\r\n		';
 } 
$out+='\r\n		<br/>';
$out+=$escape(userName);
$out+='\r\n		<br /><div class="ellipsis mt2 color9 size10">';
$out+=$escape(userTag);
$out+='</div>\r\n		';
 if (type == 1) { 
$out+='\r\n			';
 if (continueWin > 1) { 
$out+='\r\n				<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n			';
 } else if(winCount > 0) { 
$out+='\r\n				<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n			';
 } else if (profitRate > 0) { 
$out+='\r\n				<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n			';
 } else if (winRate > 0) { 
$out+='\r\n				<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n			';
 } 
$out+='\r\n		';
 } else if (type == 2) { 
$out+='\r\n			<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n		';
 } else if (type == 3) { 
$out+='\r\n			<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n	<div class="mb15 expert_item" id="readMore">\r\n		<img class="img38" src="';
$out+=$escape(IMG_PATH);
$out+='expert_more.png"></img>\r\n		<br />更多\r\n		<br />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function bannerList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,banner=$data.banner,src=$data.src,href=$data.href,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var banner = list[i] || {};
	var src = banner.src;
	var href = banner.href;

$out+='\r\n	<a href_="';
$out+=$escape(href);
$out+='" target="_blank" class="swiper_slide"><img class="img-responsive" src="';
$out+=$escape(src);
$out+='"/></a>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function dotList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,banner=$data.banner,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var banner = list[i] || {};

$out+='\r\n	';
 if (i==0) { 
$out+='\r\n		<span class="dot active"></span>\r\n		';
 } else { 
$out+='\r\n		<span class="dot"></span>\r\n		';
 } 
$out+='\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,match=$data.match,list=$data.list,matchId=$data.matchId,sportteryMatchId=$data.sportteryMatchId,league=$data.league,home=$data.home,away=$data.away,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,planCount=$data.planCount,orderCount=$data.orderCount,passMinute=$data.passMinute,type=$data.type,imgMap=$data.imgMap,number=$data.number,single=$data.single,spfSingle=$data.spfSingle,rfsfSingle=$data.rfsfSingle,halfResult=$data.halfResult,$escape=$helpers.$escape,rqspfSingle=$data.rqspfSingle,dxfSingle=$data.dxfSingle,$string=$helpers.$string,$out=''; 
	var match = list[0] || {};
	var matchId = match.matchId || 0;
	var sportteryMatchId = match.sportteryMatchId || 0;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var homeLogoImg = match.homeLogoImg;
	var awayLogoImg = match.awayLogoImg;
	var beginTime = match.beginTime || "";
	beginTime = beginTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (beginTime && beginTime.length == 3) {
		day = beginTime[1];
		time = beginTime[2];
	}
	var result = match.result.split(':');
	var planCount = match.planCount;
	var orderCount = match.orderCount;
	var passMinute = match.passMinute;
	var type = match.type || 1;
	var imgMap = {"1":"team","2":"basketball_def"};
	var number = match.number;
	var single = match.single || {};
	var spfSingle = +single.SPF;
	var rfsfSingle = +single.RFSF;
	var halfResult = match.halfResult.replace(/:/, '-') || '';

$out+='\r\n	<li class="hotGame_box" matchId="';
$out+=$escape(matchId);
$out+='" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='">\r\n		<div class="ui-flex">\r\n			<div class="clearfix ui-flex_item">\r\n				<span class="fl size10">';
$out+=$escape(number);
$out+='</span>\r\n				<span class="fr size10 hot_orange" style="';
$out+=$escape(type == 2 ? 'color:#003cff;' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n			</div>\r\n			<div class="half_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">';
$out+=$escape(halfResult != '' ? '(' + halfResult + ')': '');
$out+='</div>\r\n			<div class="textR ui-flex_item clearfix">\r\n				';
 if (result != "") { 
$out+='\r\n					<div class="fl color_g">完场</div>\r\n				';
 } else { 
$out+='\r\n					<div class="fl minute" style="display:none" id="minute';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n					<div class="fl beginTime" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">\r\n						';
$out+=$escape(day);
$out+='&nbsp';
$out+=$escape(time);
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="fr">\r\n					';
 if (planCount > 0) { 
$out+='\r\n						<span class="competition_icon tj"></span>\r\n					';
 } 
$out+='\r\n					';
 if (((spfSingle == 1 || rqspfSingle == 1) && type == 1) || ((rfsfSingle == 1 || dxfSingle == 1) && type == 2)) { 
$out+='\r\n						<span class="competition_icon dg"></span>\r\n					';
 }　
$out+='\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex against_msg">\r\n			<div class="teams_name ui-flex_item textR">\r\n				';
$out+=$string(type == 2 ? away : home);
$out+='\r\n			</div>\r\n			<div class="teams_score" style="display:none;';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n			';
 if(result && result.length == 2) { 
$out+='\r\n				<div class="teams_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">\r\n					';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='		\r\n				<div class="teams_vs" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</div>\r\n			';
 } 
$out+='\r\n			<div class="teams_name ui-flex_item">\r\n				';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="colorab size10">(主)</span>' : '');
$out+='\r\n			</div>\r\n		</div>\r\n	</li>';
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,continueWin=$data.continueWin,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var realName = user.realName;
	var nickName = user.nickName;
	var userName = realName || nickName;
	var continueWin = user.continueWin || 0;

$out+='\r\n	<li>';
$out+=$escape(userName);
$out+=' 竞猜<span class="color_red ml5 mr5 size12">';
$out+=$escape(continueWin);
$out+='场连红</span>鸿运当头！</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function floatIcon($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="suspend_icon" id="floatImgWrap">\r\n		<img id="floatImg" class="img-responsive" src="" alt="" />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});