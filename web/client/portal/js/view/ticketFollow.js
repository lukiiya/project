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
})();exports.content=content;exports.planList=planList;exports.digitalPlanList=digitalPlanList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="banner_son">\r\n		<a href="javascript:;"><img src="';
$out+=$escape(IMG_PATH);
$out+='abanner1.png" /></a>\r\n	</div>\r\n	<div class="content_tab clearfix" id="recommendTab">\r\n		<span matchType="1">竞彩足球</span>\r\n		<span matchType="2">竞彩篮球</span>\r\n		<span matchType="3">福彩3D</span>\r\n	</div>\r\n	<ul class="infoBox" id="planList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var match = (matchList.length>0 && matchList[0]) || {};
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
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
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

$out+='\r\n	<li class="item clearfix planItem" planNo="';
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
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="documentary_bet ui-flex">\r\n			<div class="documentary_num">\r\n				用户跟投：\r\n				<span class="color_red size13">\r\n					';
$out+=$escape(saleTicketAmount);
$out+='元\r\n				</span>\r\n			</div>\r\n			';
 if (isSale) { 
$out+='\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalPlanList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,access=$data.access,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,recommendCount=$data.recommendCount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,issue=$data.issue,$escape=$helpers.$escape,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var access = (plan.access || false)+"";
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
	var recommendCount = plan.recommendCount;
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
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="msg color9 clearfix">\r\n			<img class="icon_span img38 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='"></img>\r\n			<span class="personal">\r\n				<span>\r\n					<span class="color3">';
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
$out+='\r\n				</span><br />\r\n				<span class="size10 tag">';
$out+=$escape(userTag);
$out+='</span>\r\n			</span>\r\n			';
 if (isSale) { 
$out+='\r\n			<span class="ticket size10 fr userTicket" planNo="';
$out+=$escape(planNo);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n			';
 } 
$out+='\r\n		</div>\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\r\n						开奖：';
$out+=$escape(drawTime);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (/^true$/i.test(access)) { 
$out+='\r\n					';
 if (amount == 0) { 
$out+='\r\n						<span>免费</span>\r\n					';
 } else { 
$out+='\r\n						<span>查看</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});