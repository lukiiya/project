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
})();exports.content=content;exports.match=match;exports.planList=planList;exports.smlrInfo=smlrInfo;exports.jxzpInfo=jxzpInfo;exports.football=football;exports.basketball=basketball;exports.analyzeWrap=analyzeWrap;exports.oddsWrap=oddsWrap;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,type=$data.type,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="live_show_wrap" id="liveShowWrap" style="display: none;">\r\n		<a class="live_close_btn" id="liveCloseBtn"></a>\r\n		<div id="liveIframeWrap" style="width: 100%;height: 100%;"></div>\r\n	</div>\r\n	<div class="hot_banner" id="hotBanner">\r\n		<span class="arrow" id="backBtn"></span>\r\n		<span class="icon_span img18 icon_home" id="homeBtn"></span>\r\n		<div class="hot_bannerBox" id="match"></div>\r\n	</div>\r\n	<div class="ui-flex hot_detailTitle" id="tabBox">\r\n		<div class="ui-flex_item" tab="1" id="analyzeBtn" style="display: none;">\r\n			<span>分析</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="2" id="oddsBtn" style="display: none;">\r\n			<span>赔率</span>\r\n		</div>\r\n		<!--<div class="ui-flex_item" tab="3" id="tabLr" style="display: none;">\r\n			<span>冷热</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="4" id="tabJx" style="display: none;">\r\n			<span>极限追盘</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="5" id="tabDg" style="display: none;">\r\n			<span>单关投注</span>\r\n		</div>-->\r\n		<div class="ui-flex_item" tab="3">\r\n			<span>推荐</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="4" id="tabDg" style="display: none;">\r\n			<span>竞猜</span>\r\n		</div>\r\n	</div>\r\n	<div class="analyze_wrap" id="tabContent1" style="display: none;"></div>\r\n	<div class="match_odd" id="tabContent2" style="display: none;">\n		<div class="hot_detailTop" id="oddsBox">\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item" oddsType="1">欧赔</span>\r\n				<span class="ui-flex_item" oddsType="2">亚盘</span>\r\n				<span class="ui-flex_item" oddsType="3">大小</span>\r\n				<span class="ui-flex_item" oddsType="4" id="tabLr" style="display: none;">冷热</span>\r\n				<span class="ui-flex_item" oddsType="5" id="tabJx" style="display: none;">极限</span>\r\n			</div>\r\n		</div>\r\n		<div class="odds_wrap" id="oddsWrap" style="display: none"></div>\r\n		<div class="shaimilengre" id="oddsContent1" style="display: none">\r\n			<!-- 未购买 -->\r\n			<div class="hot_noBuyCold mt25" id="unclockHot" style="display: none">\r\n				<p class="ti30">晒米场专家预测赛果的冷热，中国竞彩受注的冷热，让你快速知道专家和绝大多数彩民的下注行为，为你的下注提供最可靠的依据。</p>\r\n				<a class="buy_hotcold mt10" id="buyHotCold">5粒米解锁</a>\r\n			</div>\r\n			<div class="" id="smlrInfo"></div>\r\n		</div>\r\n		<div class="jxzp" id="oddsContent2" style="display: none">\r\n			<div class="hot_noBuyCold mt25" id="unclockJxzp" style="display: none">\r\n				<p class="ti30">每周近500场比赛数据深挖和提炼，为您提供最有价值的球队极限数据，让你投注更简单、快速、有可靠依据。</p>\r\n				<a class="buy_hotcold mt10" id="buyJxzp">2粒米解锁</a>\r\n			</div>\r\n			<div class="hot_detailTop" id="jxzpTypeBox" style="display: none">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item" jxzpType="1" id="jxzpType1" style="display: none;">胜平负</span>\r\n					<span class="ui-flex_item" jxzpType="2" id="jxzpType2" style="display: none;">输赢盘</span>\r\n					<span class="ui-flex_item" jxzpType="3" id="jxzpType3" style="display: none;">大小球</span>\r\n				</div>\r\n			</div>\r\n			<div class="mt10" id="jxzpInfo"></div>\r\n		</div>\n	</div>\r\n	<div class="remen mt5" id="tabContent3" style="display:none">\r\n		<ul class="infoBox" id="planList"></ul>\r\n		<div id="noPlan" style="display: none;">\r\n			<div class="default_box">\r\n				<div class="default" style="';
$out+=$escape(type==2?'background-image:url('+IMG_PATH+'defult_basket.png)':'');
$out+='"></div>\r\n				<p class="mt10 color9">晒米专家暂没有推荐比赛哟</p>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<!--<div class="zhuanjia" id="tabContent2" style="display: none;">\r\n		<div class="hot_detailTop" id="groupBox">\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item" groupno="5F5E101-BC6150">彩店实单</span>\r\n				<span class="ui-flex_item" groupNo="5F5E100-BC614F">美女推波</span>\r\n				<span class="ui-flex_item" groupNo="5F5E105-BC6154">特邀大咖</span>\r\n				<span class="ui-flex_item" groupNo="5F5E104-BC6153">竞彩高手</span>\r\n			</div>\r\n		</div>\r\n		<div class="hot_detailCon">\r\n			<ul class="infoBox" id="groupPlanList"></ul>\r\n		</div>\r\n	</div>-->\r\n	<div class="moreGame" id="tabContent4" style="display: none;padding-bottom: 50px;">\r\n		<div id="moreGame"></div>\r\n		<div class="btn_warp" style="display: none;" id="btnWarp">\n			<a class="submit_btn" id="sumbitBtn">确定</a>\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function match($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,league=$data.league,match=$data.match,home=$data.home,away=$data.away,sportteryMatchId=$data.sportteryMatchId,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,type=$data.type,imgMap=$data.imgMap,leagueRank=$data.leagueRank,leagueRankHome=$data.leagueRankHome,leagueRankAway=$data.leagueRankAway,homeRank=$data.homeRank,awayRank=$data.awayRank,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$string=$helpers.$string,$out=''; 
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var sportteryMatchId = match.sportteryMatchId || 0;
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
	var type = match.type;
	var imgMap = {"1":"team","2":"basketball_def"};
	var leagueRank = match.leagueRank || {};
	var leagueRankHome = leagueRank.home || {};
	var leagueRankAway = leagueRank.away || {};
	var homeRank = leagueRankHome.rank != "" ? "(" + leagueRankHome.rank + ")" : "";
	var awayRank = leagueRankAway.rank != "" ? "(" + leagueRankAway.rank + ")" : "";

$out+='\r\n<div class="bannerBox_top">\r\n	';
$out+=$escape(league);
$out+='<span class="ml10" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">';
$out+=$escape(day);
$out+='&nbsp;';
$out+=$escape(time);
$out+='</span><span class="ml10" id="minute';
$out+=$escape(sportteryMatchId);
$out+='" style="display: none;"> <sup>\'</sup></span>\r\n</div>\r\n<div class="ui-flex mt15">\r\n	<div class="ui-flex_item">\r\n		<img class="teams_logo" src="';
$out+=$escape(type == 2 ? awayLogoImg : homeLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'">\r\n	</div>\r\n	<span class="hot_score ui-flex_item" style="display:none" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></span>\r\n	';
 if(result && result.length == 2) { 
$out+='\r\n		<span class="hot_score ui-flex_item">';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='</span>\r\n	';
 } else { 
$out+='\r\n		<span class="hot_vs ui-flex_item" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</span>\r\n	';
 } 
$out+='\r\n	<div class="ui-flex_item">\r\n		<img class="teams_logo" src="';
$out+=$escape(type == 2 ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'">\r\n	</div>\r\n</div>\r\n<div class="ui-flex mt10" id="teamBox" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='">\r\n	<span class="hot_teams ui-flex_item basketballAway">';
$out+=$string(type == 2 ? away : home);
$out+='<br /><span class="team_rank">';
$out+=$escape(leagueRankHome.league+homeRank);
$out+='</span></span>\r\n	<span class="live_btn_wrap clearfix">\r\n		<span class="live_video_btn fl" id="animationBtn">动画直播<i class="live_animation_icon"></i></span>\r\n		<span class="live_video_btn fr" id="videoBtn">视频直播<i class="live_video_icon"></i></span>\r\n	</span>\r\n	<span class="hot_teams ui-flex_item basketballHome">';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="size10">(主)</span>' : '');
$out+='<br /><span class="team_rank">';
$out+=$escape(leagueRankAway.league+awayRank);
$out+='</span></span>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,createTime=$data.createTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,prizeStatus=$data.prizeStatus,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,$=$data.$,$out=''; 
var length = list.length;
if (length > 0) {	
	for (var i = 0; i < length; i++) {
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
	var createTime = plan.createTime && plan.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 
	var prizeStatus = plan.prizeStatus;
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
}  
return new String($out);
}).call(templateUtils,$data).toString()}function smlrInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,win=$data.win,smlrInfo=$data.smlrInfo,draw=$data.draw,lose=$data.lose,winRecommendRate=$data.winRecommendRate,$=$data.$,g=$data.g,drawRecommendRate=$data.drawRecommendRate,loseRecommendRate=$data.loseRecommendRate,maxRecommendRateKey=$data.maxRecommendRateKey,maxRecommendRate=$data.maxRecommendRate,recommendMap=$data.recommendMap,colorMap=$data.colorMap,winOdds=$data.winOdds,winBetRate=$data.winBetRate,winProfitRate=$data.winProfitRate,winIsHot=$data.winIsHot,drawOdds=$data.drawOdds,drawBetRate=$data.drawBetRate,drawProfitRate=$data.drawProfitRate,drawIsHot=$data.drawIsHot,loseOdds=$data.loseOdds,loseBetRate=$data.loseBetRate,loseProfitRate=$data.loseProfitRate,loseIsHot=$data.loseIsHot,showRecommendRate=$data.showRecommendRate,$escape=$helpers.$escape,d=$data.d,$out=''; 
	var win = smlrInfo.win || {};
	var draw = smlrInfo.draw || {};
	var lose = smlrInfo.lose || {};
	//推荐分布数据
	var winRecommendRate = win.recommendRate || 0;
	winRecommendRate = (winRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawRecommendRate = draw.recommendRate || 0;
	drawRecommendRate = (drawRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseRecommendRate = lose.recommendRate || 0;
	loseRecommendRate = (loseRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var maxRecommendRateKey = smlrInfo.maxRecommendRateKey || '';
	var maxRecommendRate = (smlrInfo[maxRecommendRateKey] || {}).recommendRate || 0;
	maxRecommendRate = (maxRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var recommendMap = {'win': '主胜','draw': '平局','lose': '客胜'};
	var colorMap = {'win': '','draw': 'color5e','lose': 'color55'};
	//表格数据
	//胜
	var winOdds = win.odds || 0;
	var winBetRate = win.betRate || 0;
	winBetRate = (winBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var winProfitRate = win.profitRate || 0;
	winProfitRate = (winProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var winIsHot = win.isHot || false;
	//平
	var drawOdds = draw.odds || 0;
	var drawBetRate = draw.betRate || 0;
	drawBetRate = (drawBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawProfitRate = draw.profitRate || 0;
	drawProfitRate = (drawProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawIsHot = draw.isHot || false;
	//负
	var loseOdds = lose.odds || 0;
	var loseBetRate = lose.betRate || 0;
	loseBetRate = (loseBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseProfitRate = lose.profitRate || 0;
	loseProfitRate = (loseProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseIsHot = lose.isHot || false;

$out+='\r\n<div class="hot_detailCold mt5 mb5">\r\n';
 if (showRecommendRate) { 
$out+='\r\n	<div class="ch_item clearfix">\r\n		<div class="recommend_data fl">\r\n			<div class="recommend_details">\r\n				<div class="textL color3 mb10 size16">专家推荐分布</div>\r\n				<span>胜 ';
$out+=$escape(winRecommendRate);
$out+='%</span>\r\n				<span>平 ';
$out+=$escape(drawRecommendRate);
$out+='%</span>\r\n				<span>负 ';
$out+=$escape(loseRecommendRate);
$out+='%</span>\r\n			</div>\r\n		</div>\r\n		<div class="circle fr ';
$out+=$escape(colorMap[maxRecommendRateKey]);
$out+=' p';
$out+=$escape(maxRecommendRate.replace(/\.\d+$/g, ''));
$out+='">\r\n			<span>';
$out+=$escape(maxRecommendRate);
$out+='%<br><span class="final">';
$out+=$escape(recommendMap[maxRecommendRateKey]);
$out+='</span></span>\r\n			<div class="slice">\r\n				<div class="bar"></div>\r\n				<div class="fill"></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
$out+='\r\n	<div class="ui-flex color3 bb1 bgfff">\r\n		<span class="ui-flex_item">选项</span>\r\n		<span class="ui-flex_item">赔率</span>\r\n		<span class="ui-flex_item">成交比</span>\r\n		<span class="ui-flex_item">盈亏</span>\r\n		<span class="ui-flex_item">冷热</span>\r\n	</div>\r\n	<ul>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">主胜</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(winOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(winBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(win.isHot ? 'color_red' : '');
$out+='">';
$out+=$escape(winProfitRate);
$out+='%</span>\r\n			';
if (winIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">平局</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(drawOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(drawBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(draw.isHot ? 'color_red' : '');
$out+='"">';
$out+=$escape(drawProfitRate);
$out+='%</span>\r\n			';
if (drawIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">客胜</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(loseOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(loseBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(lose.isHot ? 'color_red' : '');
$out+='">';
$out+=$escape(loseProfitRate);
$out+='%</span>\r\n			';
if (loseIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n	</ul>\r\n</div>\r\n<p class="pl10 pr10 size12">\r\n	注：【盈亏】 赛果开出某选项，官方赔付的风险比例，负数为官方亏本，正数为官方盈利。\r\n</p>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,jxzp=$data.jxzp,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,result=$data.result,concede=$data.concede,matchBeginTime=$data.matchBeginTime,bettypeOdds=$data.bettypeOdds,recommend=$data.recommend,recommendLength=$data.recommendLength,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,prize=$data.prize,temp=$data.temp,d=$data.d,month=$data.month,day=$data.day,time=$data.time,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,nullOdds=$data.nullOdds,showJxzp=$data.showJxzp,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$string=$helpers.$string,name=$data.name,$out='';
	jxzp = jxzp || {};
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away;
	var result = jxzp.result;
	var concede = jxzp.concede;
	var matchBeginTime = jxzp.matchBeginTime || "";
	var bettypeOdds = jxzp.bettypeOdds || {};
	var recommend = jxzp.recommend || [];
	var recommendLength = recommend.length;
	var recommendMap = {};
	for (var j = 0; j < recommendLength; j++) {
		recommendMap[recommend[j]] = true;
	}
	var bettypeResult = jxzp.bettypeResult || {};
	var prize = jxzp.prize || [];
	var temp = matchBeginTime.match(/\d{4}-(\d{2})-(\d{2}) (\d{2}:\d{2}):\d{2}/);
	var month = "";
	var day = "";
	var time = "";
	if (temp && temp.length == 4) {
		month = temp[1];
		day = temp[2];
		time = temp[3];
	}
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = +jxzp.recentContinue;
	var historyContinue = +jxzp.historyContinue;
	var nullOdds = '--';//赔率为空显示值

$out+='\r\n';
 if (showJxzp) { 
$out+='\r\n<div class="jx-box">\r\n	<div class="jx-box-top">\r\n		<div class="top-title">\r\n			<span class="ellipsis">';
$out+=$escape(teamName);
$out+='</span>\r\n		</div>\r\n		';
 if (recentContinue > historyContinue) { 
$out+='\r\n		<div class="hisImg">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+='history.png" alt="">\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="winOver">\r\n			<div class="fang">\r\n				<span class="winTitle">近期';
$out+=$escape(statusMap[type][status]);
$out+='</span>\r\n			</div>\r\n			<div class="winNum">\r\n				';
$out+=$escape(recentContinue);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="historyTop">\r\n			<div class="fang">\r\n				<span>历史最高</span>\r\n			</div>\r\n			<div class="historyNum">\r\n				';
$out+=$escape(historyContinue);
$out+='\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="jx-box-center">\r\n		追盘推荐：\r\n	</div>\r\n	';
 if( type == 1 || type == 2) { 
$out+='\r\n		<div class="ui-flex flex_wrap pl40">\r\n			<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n			<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n		</div>\r\n	';
 } else if (type == 3) { 
$out+='\r\n		<div class="ui-flex flex_wrap">\r\n			';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n			<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(recommend[j]);
$out+='球 ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			';
 } 
$out+='\r\n			';
 
			if (prize.length <= 0) {
				for (var name in bettypeResult) {
					if (!bettypeResult[name]) {
						continue;
					}
			
$out+='\r\n				<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(name);
$out+='球 ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n			';

				}
			}
			
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,spf=$data.spf,match=$data.match,rqspf=$data.rqspf,bf=$data.bf,zjq=$data.zjq,bqc=$data.bqc,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,bfBettypeOdds=$data.bfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,bqcBettypeOdds=$data.bqcBettypeOdds,spfSingle=$data.spfSingle,rqspfSingle=$data.rqspfSingle,$escape=$helpers.$escape,$out='';$out+='<style>\r\n		.moreGame .game_table td {\r\n			height: 40px;\r\n		    line-height: 1;\r\n		}\r\n	</style>\r\n';
 
	var spf = match['bettype']['SPF'] || {};
	var rqspf = match['bettype']['RQSPF'] || {};
	var bf = match['bettype']['BF'] || {};
	var zjq = match['bettype']['ZJQ'] || {};
	var bqc = match['bettype']['BQC'] || {};
	var spfBettypeOdds = spf.bettypeOdds || {};
	var rqspfBettypeOdds = rqspf.bettypeOdds || {};
	var bfBettypeOdds = bf.bettypeOdds || {};
	var zjqBettypeOdds = zjq.bettypeOdds || {};
	var bqcBettypeOdds = bqc.bettypeOdds || {};
	var spfSingle = +spf.single || 0;
	var rqspfSingle = +rqspf.single || 0;

$out+='\r\n';
 if (spfSingle == 1) { 
$out+='\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">胜平负<span class="color9 ml10">猜90分钟内(含补时)赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap" style="padding-left: 45px;">\r\n		<span class="concede0">';
$out+=$escape(spf.concede);
$out+='</span>\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(spf.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="S">胜<br/><span>';
$out+=$escape(spfBettypeOdds['S']);
$out+='</span></td>\r\n				<td recommend="P">平<br/><span>';
$out+=$escape(spfBettypeOdds['P']);
$out+='</span></td>\r\n				<td recommend="F">负<br/><span>';
$out+=$escape(spfBettypeOdds['F']);
$out+='</span></td>\r\n			</tr>\r\n		</table>\r\n	</div>\r\n	';
 if (rqspfSingle == 1) { 
$out+='\r\n		<div class="table_wrap" style="padding-left: 45px;">\r\n			<span class="concede1">';
$out+=$escape(rqspf.concede);
$out+='</span>\r\n			<table class="game_table matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n				<tr>\r\n					<td recommend="S">胜<br/><span>';
$out+=$escape(rqspfBettypeOdds['S']);
$out+='</span></td>\r\n					<td recommend="P">平<br/><span>';
$out+=$escape(rqspfBettypeOdds['P']);
$out+='</span></td>\r\n					<td recommend="F">负<br/><span>';
$out+=$escape(rqspfBettypeOdds['F']);
$out+='</span></td>\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	';
 } 
$out+='\r\n';
 } else if (rqspfSingle == 1) { 
$out+='\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">胜平负<span class="color9 ml10">猜90分钟内(含补时)赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap" style="padding-left: 45px;">\r\n		<span class="concede1">';
$out+=$escape(rqspf.concede);
$out+='</span>\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="S">胜<br/><span>';
$out+=$escape(rqspfBettypeOdds['S']);
$out+='</span></td>\r\n				<td recommend="P">平<br/><span>';
$out+=$escape(rqspfBettypeOdds['P']);
$out+='</span></td>\r\n				<td recommend="F">负<br/><span>';
$out+=$escape(rqspfBettypeOdds['F']);
$out+='</span></td>\r\n			</tr>\r\n		</table>\r\n	</div>\r\n';
 } 
$out+='\r\n<div>\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">总进球<span class="color9 ml10">猜90分钟内(含补时)比赛总进球数</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(zjq.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="0">0<br/><span>';
$out+=$escape(zjqBettypeOdds['0']);
$out+='</span></td>\r\n				<td recommend="1">1<br/><span>';
$out+=$escape(zjqBettypeOdds['1']);
$out+='</span></td>\r\n				<td recommend="2">2<br/><span>';
$out+=$escape(zjqBettypeOdds['2']);
$out+='</span></td>\r\n				<td recommend="3">3<br/><span>';
$out+=$escape(zjqBettypeOdds['3']);
$out+='</span></td>	\r\n			</tr>\r\n			<tr>\r\n				<td recommend="4">4<br/><span>';
$out+=$escape(zjqBettypeOdds['4']);
$out+='</span></td>\r\n				<td recommend="5">5<br/><span>';
$out+=$escape(zjqBettypeOdds['5']);
$out+='</span></td>\r\n				<td recommend="6">6<br/><span>';
$out+=$escape(zjqBettypeOdds['6']);
$out+='</span></td>\r\n				<td recommend="7+">7+<br/><span>';
$out+=$escape(zjqBettypeOdds['7+']);
$out+='</span></td>	\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>		\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">半全场<span class="color9 ml10">猜两队上半场和90分钟内(含补时)的赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bqc.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="SS">胜胜<br/><span>';
$out+=$escape(bqcBettypeOdds['SS']);
$out+='</span></td>\r\n				<td recommend="SP">胜平<br/><span>';
$out+=$escape(bqcBettypeOdds['SP']);
$out+='</span></td>\r\n				<td recommend="SF">胜负<br/><span>';
$out+=$escape(bqcBettypeOdds['SF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="PS">平胜<br/><span>';
$out+=$escape(bqcBettypeOdds['PS']);
$out+='</span></td>\r\n				<td recommend="PP">平平<br/><span>';
$out+=$escape(bqcBettypeOdds['PP']);
$out+='</span></td>\r\n				<td recommend="PF">平负<br/><span>';
$out+=$escape(bqcBettypeOdds['PF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="FS">负胜<br/><span>';
$out+=$escape(bqcBettypeOdds['FS']);
$out+='</span></td>\r\n				<td recommend="FP">负平<br/><span>';
$out+=$escape(bqcBettypeOdds['FP']);
$out+='</span></td>\r\n				<td recommend="FF">负负<br/><span>';
$out+=$escape(bqcBettypeOdds['FF']);
$out+='</span></td>	\r\n			</tr> \r\n		</table>	\r\n	</div>\r\n</div>			\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">比分<span class="color9 ml10">猜90分钟内(含补时)比分赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bf.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color60" rowspan="3">胜</td>\r\n				<td recommend="1:0">1:0<br/><span>';
$out+=$escape(bfBettypeOdds['1:0']);
$out+='</span></td>\r\n				<td recommend="2:0">2:0<br/><span>';
$out+=$escape(bfBettypeOdds['2:0']);
$out+='</span></td>\r\n				<td recommend="2:1">2:1<br/><span>';
$out+=$escape(bfBettypeOdds['2:1']);
$out+='</span></td>\r\n				<td recommend="3:0">3:0<br/><span>';
$out+=$escape(bfBettypeOdds['3:0']);
$out+='</span></td>\r\n				<td recommend="3:1">3:1<br/><span>';
$out+=$escape(bfBettypeOdds['3:1']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="3:2">3:2<br/><span>';
$out+=$escape(bfBettypeOdds['3:2']);
$out+='</span></td>\r\n				<td recommend="4:0">4:0<br/><span>';
$out+=$escape(bfBettypeOdds['4:0']);
$out+='</span></td>\r\n				<td recommend="4:1">4:1<br/><span>';
$out+=$escape(bfBettypeOdds['4:1']);
$out+='</span></td>\r\n				<td recommend="4:2">4:2<br/><span>';
$out+=$escape(bfBettypeOdds['4:2']);
$out+='</span></td>\r\n				<td recommend="5:0">5:0<br/><span>';
$out+=$escape(bfBettypeOdds['5:0']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="5:1">5:1<br/><span>';
$out+=$escape(bfBettypeOdds['5:1']);
$out+='</span></td>\r\n				<td recommend="5:2">5:2<br/><span>';
$out+=$escape(bfBettypeOdds['5:2']);
$out+='</span></td>\r\n				<td recommend="SQT">胜其他<br/><span>';
$out+=$escape(bfBettypeOdds['SQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n			<tr>\r\n				<td class="game_title color70">平</td>\r\n				<td recommend="0:0">0:0<br/><span>';
$out+=$escape(bfBettypeOdds['0:0']);
$out+='</span></td>\r\n				<td recommend="1:1">1:1<br/><span>';
$out+=$escape(bfBettypeOdds['1:1']);
$out+='</span></td>\r\n				<td recommend="2:2">2:2<br/><span>';
$out+=$escape(bfBettypeOdds['2:2']);
$out+='</span></td>\r\n				<td recommend="3:3">3:3<br/><span>';
$out+=$escape(bfBettypeOdds['3:3']);
$out+='</span></td>\r\n				<td recommend="PQT">平其他<br/><span>';
$out+=$escape(bfBettypeOdds['PQT']);
$out+='</span></td>\r\n			</tr>\r\n            <tr>\r\n				<td class="game_title color60" rowspan="3">负</td>\r\n				<td recommend="0:1">0:1<br/><span>';
$out+=$escape(bfBettypeOdds['0:1']);
$out+='</span></td>\r\n				<td recommend="0:2">0:2<br/><span>';
$out+=$escape(bfBettypeOdds['0:2']);
$out+='</span></td>\r\n				<td recommend="1:2">1:2<br/><span>';
$out+=$escape(bfBettypeOdds['1:2']);
$out+='</span></td>\r\n				<td recommend="0:3">0:3<br/><span>';
$out+=$escape(bfBettypeOdds['0:3']);
$out+='</span></td>\r\n				<td recommend="1:3">1:3<br/><span>';
$out+=$escape(bfBettypeOdds['1:3']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="2:3">2:3<br/><span>';
$out+=$escape(bfBettypeOdds['2:3']);
$out+='</span></td>\r\n				<td recommend="0:4">0:4<br/><span>';
$out+=$escape(bfBettypeOdds['0:4']);
$out+='</span></td>\r\n				<td recommend="1:4">1:4<br/><span>';
$out+=$escape(bfBettypeOdds['1:4']);
$out+='</span></td>\r\n				<td recommend="2:4">2:4<br/><span>';
$out+=$escape(bfBettypeOdds['2:4']);
$out+='</span></td>\r\n				<td recommend="0:5">0:5<br/><span>';
$out+=$escape(bfBettypeOdds['0:5']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="1:5">1:5<br/><span>';
$out+=$escape(bfBettypeOdds['1:5']);
$out+='</span></td>\r\n				<td recommend="2:5">2:5<br/><span>';
$out+=$escape(bfBettypeOdds['2:5']);
$out+='</span></td>\r\n				<td recommend="FQT">负其他<br/><span>';
$out+=$escape(bfBettypeOdds['FQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function basketball($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,sf=$data.sf,match=$data.match,rfsf=$data.rfsf,sfc=$data.sfc,dxf=$data.dxf,sfBettypeOdds=$data.sfBettypeOdds,rfsfBettypeOdds=$data.rfsfBettypeOdds,sfcBettypeOdds=$data.sfcBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,sfSingle=$data.sfSingle,rfsfSingle=$data.rfsfSingle,dxfSingle=$data.dxfSingle,$escape=$helpers.$escape,$string=$helpers.$string,$out='';$out+='<style>\r\n		.moreGame .game_table td {\r\n			height: 40px;\r\n		    line-height: 1;\r\n		}\r\n	</style>\r\n';
 
	var sf = match['bettype']['SF'] || {};
	var rfsf = match['bettype']['RFSF'] || {};
	var sfc = match['bettype']['SFC'] || {};
	var dxf = match['bettype']['DXF'] || {};
	var sfBettypeOdds = sf.bettypeOdds || {};
	var rfsfBettypeOdds = rfsf.bettypeOdds || {};
	var sfcBettypeOdds = sfc.bettypeOdds || {};
	var dxfBettypeOdds = dxf.bettypeOdds || {};
	var sfSingle = +sf.single || 0;
	var rfsfSingle = +rfsf.single || 0;
	var dxfSingle = +dxf.single || 0;

$out+='\r\n	<div>\r\n		';
 if (sfSingle == 1) { 
$out+='\r\n			<div>\r\n				<div class="game_head clearfix mt5">\r\n					<span class="fl">胜负<span class="color9 ml10">猜全场(含加时)主客队胜负情况</span></span>\r\n				</div>\r\n				<div class="table_wrap">\r\n					<table class="game_table matchBettype" oddsId="';
$out+=$escape(sf.oddsId);
$out+='">\r\n						<tr>\r\n							<td recommend="F">客胜<br/><span>';
$out+=$escape(sfBettypeOdds['F']);
$out+='</span></td>\r\n							<td width="90"><p class="">0</p></td>\r\n							<td recommend="S">主胜<br/><span>';
$out+=$escape(sfBettypeOdds['S']);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n				';
 if (rfsfSingle == 1) { 
$out+='\r\n					<div class="table_wrap">\r\n						<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n							<tr>\r\n								<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n								<td width="90"><p class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+='">主';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</p></td>\r\n								<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n							</tr>\r\n						</table>	\r\n					</div>\r\n				</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if (rfsfSingle == 1) { 
$out+='\r\n			<div class="game_head clearfix mt5">\r\n				<span class="fl">胜负<span class="color9 ml10">猜全场(含加时)主客队胜负情况</span></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n					<tr>\r\n						<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n						<td width="90"><p class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+='">';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</p></td>\r\n						<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		';
 }　
$out+='\r\n		';
 if (dxfSingle == 1) { 
$out+='\r\n			<div>\r\n				<div class="game_head clearfix mt5">\r\n					<span class="fl">大小分<span class="color9 ml10">猜全场(含加时)双方总比分</span></span>\r\n				</div>\r\n				<div class="table_wrap">\r\n					<table class="game_table matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n						<tr>\r\n							<td recommend="D">大分<br/><span>';
$out+=$escape(dxfBettypeOdds['D']);
$out+='</span></td>\r\n							<td width="90"><p class="color_red">';
$out+=$escape(dxf.concede);
$out+='</p></td>\r\n							<td recommend="X">小分<br/><span>';
$out+=$escape(dxfBettypeOdds['X']);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n		<div>\r\n			<div class="game_head clearfix mt5">\r\n				<span class="fl">胜分差<span class="color9 ml10">猜全场比赛主客队的比分差区间</span></span> \r\n				<span class="arrow arrow_up hide"></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(sfc.oddsId);
$out+='" bettypeContent="';
$out+=$escape(sfc.bettypeContent);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12" rowspan="2">客胜</td>\r\n						<td recommend="F1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['F1-5']);
$out+='</span></td>\r\n						<td recommend="F6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['F6-10']);
$out+='</span></td>\r\n						<td recommend="F11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['F11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="F16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['F16-20']);
$out+='</span></td>\r\n						<td recommend="F21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['F21-25']);
$out+='</span></td>\r\n						<td recommend="F26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['F26+']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td class="game_title color60 size12" rowspan="2">主胜</td>\r\n						<td recommend="S1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['S1-5']);
$out+='</span></td>\r\n						<td recommend="S6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['S6-10']);
$out+='</span></td>\r\n						<td recommend="S11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['S11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="S16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['S16-20']);
$out+='</span></td>\r\n						<td recommend="S21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['S21-25']);
$out+='</span></td>\r\n						<td recommend="S26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['S26+']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function analyzeWrap($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,againstMatchList=$data.againstMatchList,analyse=$data.analyse,futureMatchList=$data.futureMatchList,groupScoreList=$data.groupScoreList,historyMatchList=$data.historyMatchList,leagueScore=$data.leagueScore,groupLength=$data.groupLength,leagueLength=$data.leagueLength,Object=$data.Object,againstMatchLength=$data.againstMatchLength,historyMatchLength=$data.historyMatchLength,futureMatchLength=$data.futureMatchLength,imgMap=$data.imgMap,matchInfo=$data.matchInfo,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,i=$data.i,teamRank=$data.teamRank,team=$data.team,rank=$data.rank,winCount=$data.winCount,drawCount=$data.drawCount,lostCount=$data.lostCount,goal=$data.goal,lostGoal=$data.lostGoal,score=$data.score,$escape=$helpers.$escape,league=$data.league,standings=$data.standings,scoreList=$data.scoreList,scoreListLength=$data.scoreListLength,IMG_PATH=$data.IMG_PATH,type=$data.type,attribute=$data.attribute,attributeMap=$data.attributeMap,variable=$data.variable,a=$data.a,list=$data.list,sum=$data.sum,length=$data.length,loseCount=$data.loseCount,gamesNum=$data.gamesNum,winPercent=$data.winPercent,Math=$data.Math,drawPercent=$data.drawPercent,losePercent=$data.losePercent,match=$data.match,homeTeam=$data.homeTeam,awayTeam=$data.awayTeam,isHome=$data.isHome,matchDate=$data.matchDate,d=$data.d,halfResult=$data.halfResult,result=$data.result,realResult=$data.realResult,handicap=$data.handicap,handicapResult=$data.handicapResult,resultMap=$data.resultMap,resultColor=$data.resultColor,handicapResultMap=$data.handicapResultMap,historyMatch=$data.historyMatch,all=$data.all,b=$data.b,history=$data.history,futureMatch=$data.futureMatch,spaceDays=$data.spaceDays,$out='';$out+='<!--分析-->\r\n';

	var againstMatchList = analyse.againstMatchList || {}; //历史交锋
	var futureMatchList = analyse.futureMatchList || {}; //未来赛事
	var groupScoreList = analyse.groupScoreList || []; //小组排名
	var historyMatchList = analyse.historyMatchList || {}; //近期赛事
	var leagueScore = analyse.leagueScore || {}; //联赛战绩
	var groupLength = groupScoreList.length;
	var leagueLength = Object.keys(leagueScore).length;
	var againstMatchLength = Object.keys(againstMatchList).length;
	var historyMatchLength = Object.keys(historyMatchList).length;
	var futureMatchLength = Object.keys(futureMatchList).length;
	var imgMap = {"1":"team","2":"basketball_def"};
	var matchInfo = analyse.matchInfo || {};
	var homeLogoImg = matchInfo.homeLogoImg || '';
	var awayLogoImg = matchInfo.awayLogoImg || '';

$out+='\r\n	';
 if (groupLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">小组排名</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table>\r\n					<tr>\r\n						<th width="23%">球队</th>\r\n						<th>排名</th>\r\n						<th>胜</th>\r\n						<th>平</th>\r\n						<th>负</th>\r\n						<th>得/失</th>\r\n						<th width="15.2%">积分</th>\r\n					</tr>\r\n					';
 
						for (var i = 0; i < groupLength; i++) {
						var teamRank = groupScoreList[i] || {};
						var team = teamRank.team || {};
						var rank = teamRank.rank || "";
						var winCount = teamRank.winCount || 0;
						var drawCount = teamRank.drawCount || 0;
						var lostCount = teamRank.lostCount || 0;
						var goal = teamRank.goal || 0;
						var lostGoal = teamRank.lostGoal || 0;
						var score = teamRank.score || 0;				
					
$out+='\r\n					<tr>\r\n						<td>';
$out+=$escape(team);
$out+='</td>\r\n						<td>';
$out+=$escape(rank);
$out+='</td>\r\n						<td>';
$out+=$escape(winCount);
$out+='</td>\r\n						<td>';
$out+=$escape(drawCount);
$out+='</td>\r\n						<td>';
$out+=$escape(lostCount);
$out+='</td>\r\n						<td>';
$out+=$escape(goal);
$out+='/';
$out+=$escape(lostGoal);
$out+='</td>\r\n						<td>';
$out+=$escape(score);
$out+='</td>\r\n					</tr>\r\n					';
 } 
$out+='\r\n				</table>\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (leagueLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">联赛战绩</span>\r\n			</div>\r\n		';

			for(league in leagueScore) {
				var standings = leagueScore[league] || {};
				var team = standings.team || "";
				var scoreList = standings.scoreList || {};
				var scoreListLength = Object.keys(scoreList).length;
		
$out+='\r\n			<div class="title_record border-top">\r\n				<img class="team_img" src="';
$out+=$escape(league == 'home' ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'" />\r\n				<span class="title_name">';
$out+=$escape(team);
$out+='</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table>\r\n					<tr>\r\n						<th width="23%"></th>\r\n						<th>排名</th>\r\n						<th>胜</th>\r\n						<th>平</th>\r\n						<th>负</th>\r\n						<th>得/失</th>\r\n						<th width="15.2%">积分</th>\r\n					</tr>\r\n					';
 
						for (attribute in scoreList) {
							var winCount = scoreList[attribute].winCount || 0;
							var drawCount = scoreList[attribute].drawCount || 0;
							var lostCount = scoreList[attribute].lostCount || 0;
							var goal = scoreList[attribute].goal || 0;
							var lostGoal = scoreList[attribute].lostGoal || 0;
							var rank = scoreList[attribute].rank || "";
							var score = scoreList[attribute].score || 0;
							var team = scoreList[attribute].team || "";
							var attributeMap = {"total": "总", "home": "主", "away": "客"};
					
$out+='\r\n						<tr>\r\n							<td>';
$out+=$escape(attributeMap[attribute]);
$out+='</td>\r\n							<td>';
$out+=$escape(rank);
$out+='</td>\r\n							<td>';
$out+=$escape(winCount);
$out+='</td>\r\n							<td>';
$out+=$escape(drawCount);
$out+='</td>\r\n							<td>';
$out+=$escape(lostCount);
$out+='</td>\r\n							<td>';
$out+=$escape(goal);
$out+='/';
$out+=$escape(lostGoal);
$out+='</td>\r\n							<td>';
$out+=$escape(score);
$out+='</td>\r\n						</tr>\r\n					';
 } 
$out+='\r\n				</table>\r\n			</div>\r\n		';
 } 
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (againstMatchLength > 0) { 
$out+='\r\n	<div class="data_item">\r\n		<div class="title_record">\r\n			<span class="name_line"></span>\r\n			<span class="title_name">历史交锋</span>\r\n		</div>\r\n		';

			for (variable in againstMatchList) {
				var a = againstMatchList[variable] || {};
				var list = a.list || [];
				var sum = a.sum || {};
				var length = list.length;
				var drawCount = sum.drawCount || 0;
				var loseCount = sum.loseCount || 0;
				var winCount = sum.winCount || 0;
				var gamesNum = +drawCount + loseCount + winCount; //总场数
				var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
				var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
				var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
		
$out+='\r\n			<div class="against_msg" id="against';
$out+=$escape(variable);
$out+='" style="display: none;">\n				';
 if (gamesNum > 0) { 
$out+='\r\n					<div class="against_result">\r\n						<div class="map_name">\r\n							';
 if (winCount > 0) { 
$out+='\r\n								<span class="success" style="width: ';
$out+=$escape(winPercent);
$out+=';">';
$out+=$escape(winCount);
$out+='胜</span>\r\n							';
 } 
$out+='\r\n							';
 if (drawCount > 0) { 
$out+='\r\n							<span class="flat" style="width: ';
$out+=$escape(drawPercent);
$out+=';">';
$out+=$escape(drawCount);
$out+='平</span>\r\n							';
 } 
$out+='\r\n							';
 if (loseCount > 0) { 
$out+='\r\n							<span class="lose" style="width: ';
$out+=$escape(losePercent);
$out+=';">';
$out+=$escape(loseCount);
$out+='负</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n						<div class="data_map mt5">\r\n							<span class="map_color" style="width: ';
$out+=$escape(winPercent);
$out+=';background-color: #ec3334;"></span>\r\n							<span class="map_color" style="width: ';
$out+=$escape(drawPercent);
$out+=';background-color: #448be0;"></span>\r\n							<span class="map_color" style="width: ';
$out+=$escape(losePercent);
$out+=';background-color: #57b63b;"></span>\r\n						</div>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="table_wrap">\r\n					<table>\r\n						<tr>\r\n							<th width="18%">联赛</th>\r\n							<th width="15%">日期</th>\r\n							<th></th>\r\n							<th width="12%">赛事</th>\r\n							<th></th>\r\n							<th width="8%">赛果</th>\r\n							<th width="18%">盘路</th>\r\n						</tr>\r\n						';
 
							for (var i = 0; i < list.length; i++) {
							var match = list[i] || {};
							var league = match.league || ""; //联赛名
							var homeTeam = match.homeTeam || "";
							var awayTeam = match.awayTeam || "";
							var isHome = match.isHome;
							var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
							var halfResult = match.halfResult || ""; //半场比分
							var result = match.result || ""; //全场比分
							var realResult = match.realResult || ""; //赛果
							var handicap = match.handicap || ""; //盘口
							var handicapResult = match.handicapResult || ""; //盘路	
							var resultMap = {"win": "胜","draw": "平","lose": "负"};
							var resultColor = {"win": "color-s","draw": "color-f","lose": "color-l"};
							var handicapResultMap = {"win": "赢","draw": "走","lose": "输"};
						
$out+='\r\n						<tr>\r\n							<td>';
$out+=$escape(league);
$out+='</td>\r\n							<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n							<td class="team_name ';
$out+=$escape(isHome == true ? resultColor[realResult] : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n							<td>';
$out+=$escape(result);
$out+='<span class="half_result">(';
$out+=$escape(halfResult);
$out+=')</span></td>\r\n							<td class="';
$out+=$escape(isHome == false ? resultColor[realResult] : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n							<td class="';
$out+=$escape(resultColor[realResult]);
$out+='">';
$out+=$escape(resultMap[realResult]);
$out+='</td>\r\n							<td>';
$out+=$escape(handicap);
$out+='<span class="';
$out+=$escape(resultColor[handicapResult]);
$out+='">';
$out+=$escape(handicapResultMap[handicapResult]);
$out+='</span></td>\r\n						</tr>\r\n						';
 } 
$out+='\r\n					</table>\n				</div>\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="switch_btn_wrap">\r\n			<div class="switch_btn" id="againstSwitchBtn">\r\n				<span value="all">全部</span>\r\n				<span value="asHome">主场</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
$out+='\r\n';
 if (historyMatchLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">近期战绩</span>\r\n			</div>\r\n			';

				for (a in historyMatchList) {
					var historyMatch = historyMatchList[a] || {};
					var team = historyMatch.team;
					var all = historyMatch.all || {};
					var list = all.list || [];
					var sum = all.sum || {};
					var length = list.length;
					var drawCount = sum.drawCount || 0;
					var loseCount = sum.loseCount || 0;
					var winCount = sum.winCount || 0;
					var gamesNum = +drawCount + loseCount + winCount; //总场数
					var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
					var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
					var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
			
$out+='\r\n		<div class="title_record border-top">\r\n			<img class="team_img" src="';
$out+=$escape(a == 'home' ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'" />\r\n			<span class="title_name">';
$out+=$escape(team);
$out+='</span>\r\n		</div>\r\n		<div class="">\r\n			';

				for (b in historyMatch) {
					var history = historyMatch[b] || {};
					var list = history.list || [];
					var sum = history.sum || {};
					var length = list.length;
					var drawCount = sum.drawCount || 0;
					var loseCount = sum.loseCount || 0;
					var winCount = sum.winCount || 0;
					var gamesNum = +drawCount + loseCount + winCount; //总场数
					var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
					var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
					var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
			
$out+='\r\n			';
 if (b == 'all' || b == 'asHome' || b == 'asAway') { 
$out+='\r\n				<div class="history_';
$out+=$escape(a);
$out+='_msg" id="';
$out+=$escape(a);
$out+=$escape(b);
$out+='history">\r\n					';
 if (gamesNum > 0) { 
$out+='\r\n						<div class="against_result">\r\n							<div class="map_name">\r\n								';
 if (winCount > 0) { 
$out+='\r\n									<span class="success" style="width: ';
$out+=$escape(winPercent);
$out+=';">';
$out+=$escape(winCount);
$out+='胜</span>\r\n								';
 } 
$out+='\r\n								';
 if (drawCount > 0) { 
$out+='\r\n								<span class="flat" style="width: ';
$out+=$escape(drawPercent);
$out+=';">';
$out+=$escape(drawCount);
$out+='平</span>\r\n								';
 } 
$out+='\r\n								';
 if (loseCount > 0) { 
$out+='\r\n								<span class="lose" style="width: ';
$out+=$escape(losePercent);
$out+=';">';
$out+=$escape(loseCount);
$out+='负</span>\r\n								';
 } 
$out+='\r\n							</div>\r\n							<div class="data_map mt5">\r\n								<span class="map_color" style="width: ';
$out+=$escape(winPercent);
$out+=';background-color: #ec3334;"></span>\r\n								<span class="map_color" style="width: ';
$out+=$escape(drawPercent);
$out+=';background-color: #448be0;"></span>\r\n								<span class="map_color" style="width: ';
$out+=$escape(losePercent);
$out+=';background-color: #57b63b;"></span>\r\n							</div>\r\n						</div>\r\n					';
 } 
$out+='\r\n					<div class="table_wrap">\r\n						<table>\r\n							<tr>\r\n								<th width="18%">联赛</th>\r\n								<th width="15%">日期</th>\r\n								<th></th>\r\n								<th width="12%">赛事</th>\r\n								<th></th>\r\n								<th width="8%">赛果</th>\r\n								<th width="18%">盘路</th>\r\n							</tr>\r\n							';
 
								for (var i = 0; i < list.length; i++) {
								var match = list[i] || {};
								var league = match.league || ""; //联赛名
								var homeTeam = match.homeTeam || "";
								var awayTeam = match.awayTeam || "";
								var isHome = match.isHome || "";
								var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
								var halfResult = match.halfResult || ""; //半场比分
								var result = match.result || ""; //全场比分
								var realResult = match.realResult || ""; //赛果
								var handicap = match.handicap || ""; //盘口
								var handicapResult = match.handicapResult || ""; //盘路	
								var resultMap = {"win": "胜","draw": "平","lose": "负"};
								var resultColor = {"win": "color-s","draw": "color-f","lose": "color-l"};
								var handicapResultMap = {"win": "赢","draw": "走","lose": "输"};
							
$out+='\r\n							<tr>\r\n								<td>';
$out+=$escape(league);
$out+='</td>\r\n								<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n								<td class="team_name ';
$out+=$escape(isHome == true ? resultColor[realResult] : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n								<td>';
$out+=$escape(result);
$out+='<span class="half_result">(';
$out+=$escape(halfResult);
$out+=')</span></td>\r\n								<td class="';
$out+=$escape(isHome == false ? resultColor[realResult] : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n								<td class="';
$out+=$escape(resultColor[realResult]);
$out+='">';
$out+=$escape(resultMap[realResult]);
$out+='</td>\r\n								<td>';
$out+=$escape(handicap);
$out+='<span class="';
$out+=$escape(resultColor[handicapResult]);
$out+='">';
$out+=$escape(handicapResultMap[handicapResult]);
$out+='</span></td>\r\n							</tr>\r\n							';
 } 
$out+='\r\n						</table>\r\n					</div>\r\n				</div>\r\n			';
 }
				} 
$out+='\r\n			<div class="switch_btn_wrap">\r\n				<div class="switch_btn" id="';
$out+=$escape(a);
$out+='HistorySwitchBtn">\r\n					<span value="all">全部</span>\r\n					<span value="';
$out+=$escape(a == 'home' ? 'asHome' : 'asAway');
$out+='">';
$out+=$escape(a == 'home' ? '主场' : '客场');
$out+='</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n';
 if (futureMatchLength > 0) { 
$out+='\r\n	<div class="data_item">\r\n		<div class="title_record">\r\n			<span class="name_line"></span>\r\n			<span class="title_name">未来赛事</span>\r\n		</div>\r\n		';

			for (variable in futureMatchList) {
				var futureMatch = futureMatchList[variable] || [];
				var length = futureMatch.length;
		
$out+='\r\n		<div class="table_wrap" style="';
$out+=$escape(variable == 'away' ? 'border-top: 3px solid #ebeff0' : '');
$out+='">\r\n			<table>\r\n				<tr>\r\n					<th width="21%">联赛</th>\r\n					<th width="15%">日期</th>\r\n					<th></th>\r\n					<th width="7%">赛事</th>\r\n					<th></th>\r\n					<th width="21%">间隔</th>\r\n				</tr>\r\n				';
 
					for (var i = 0; i < futureMatch.length; i++) {
					var match = futureMatch[i] || {};
					var league = match.league || ""; //联赛名
					var homeTeam = match.homeTeam || "";
					var awayTeam = match.awayTeam || "";
					var isHome = match.isHome || "";
					var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
					var spaceDays = match.spaceDays || 0; 
				
$out+='\r\n				<tr>\r\n					<td>';
$out+=$escape(league);
$out+='</td>\r\n					<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n					<td class="team_name ';
$out+=$escape(isHome == true ? 'color-s' : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n					<td><span class="half_result">vs</span></td>\r\n					<td class="';
$out+=$escape(isHome == false ? 'color-s' : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n					<td>';
$out+=$escape(spaceDays);
$out+='天后</td>\r\n				</tr>\r\n				';
 } 
$out+='\r\n			</table>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n<div class="bottom_txt mt20">\r\n	<p>以上数据仅供浏览、投注参考之用</p>\r\n	<p>并不作为最终投注依据</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function oddsWrap($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,matchOdds=$data.matchOdds,odds=$data.odds,bookmaker=$data.bookmaker,firstOdds=$data.firstOdds,endOdds=$data.endOdds,oddsChange=$data.oddsChange,oddsChangeMap=$data.oddsChangeMap,$escape=$helpers.$escape,oddsType=$data.oddsType,$out='';$out+='<div class="table_wrap">\r\n		<table>\r\n			<tbody>\r\n				';

					for (var i = 0; i < matchOdds.length; i++) {
					var odds = matchOdds[i] || {};
					var bookmaker = odds.bookmaker || "";
					var firstOdds = odds.firstOdds || {};
					var endOdds = odds.endOdds || {};
					var oddsChange = odds.oddsChange || {};
					var oddsChangeMap = {'up': 'go_up','down': 'go_down'}
				
$out+='\r\n				<tr>\r\n					<td width="28%">\r\n						<span class="odds_name">';
$out+=$escape(bookmaker);
$out+='</span>\r\n						<span class="line"></span>\r\n					</td>\r\n					<td>\r\n						<div>初赔</div>\r\n						<div>即时</div>\r\n					</td>\r\n					';
 if (oddsType == 1) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.S);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.S]);
$out+='">\r\n								<span>\r\n									';
$out+=$escape(endOdds.S);
$out+='\r\n								</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.P);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.P]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.P);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.F);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.F]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.F);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } else if (oddsType == 2) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.home);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.homeChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.home);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.handicap);
$out+='</span>\r\n							</div>\r\n							<div>\r\n								<span>';
$out+=$escape(endOdds.handicap);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.away);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.awayChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.away);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } else if (oddsType == 3) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.big);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.bigChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.big);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.handicap);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.handicapChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.handicap);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.small);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.smallChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.small);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } 
$out+='\r\n					<td width="5%"></td>\r\n				</tr>\r\n				';
 } 
$out+='\r\n			</tbody>\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});