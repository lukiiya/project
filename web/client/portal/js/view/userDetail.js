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
})();exports.content=content;exports.planTrendChartBox=planTrendChartBox;exports.planList=planList;exports.userArticleList=userArticleList;exports.tabBox=tabBox;exports.digitalPlanList=digitalPlanList;exports.replayList=replayList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top">\r\n		<div class="info">\r\n			<span class="arrow leftIcon_top" id="backBtn"></span>\r\n			<span class="icon_span img18 icon_home rightIcon_top" id="homeBtn"></span>\r\n			<div class="headBox">\r\n				<img class="icon_span img40" id="userImg">\r\n				<span class="mt10 displayB" id="userName"></span>\r\n				<a class="share" style="display: none;"  id="focus"></a>\r\n				<div class="expert_name" style="display:none" id="continueWinBox"><span class="expert_num" id="continueWin"></span>连红</div>\r\n				<div class="expert_name" style="display:none" id="winCountBox">10中<span class="expert_num" id="winCount"></span></div>\r\n				<div class="expert_name" style="display:none" id="profitRateBox">盈<span class="expert_num" id="profitRate"></span>%</div>\r\n				<div class="expert_name" style="display:none" id="winRateBox">胜<span class="expert_num" id="winRate"></span>%</div>\r\n			</div>\r\n			<div class="brief_box active" id="userRemarkBox">\r\n				<p class="brief line_hide" id="userRemark" style="font-size: 12px"></p>\r\n				<span class="arrow_down" id="moreUserRemark" style="display:none"></span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex oprate" id="tabBox"></div>\r\n	</div>\r\n	<div class="infoList" id="noMatch" style="display:none">\r\n		<div class="default_box">\r\n			<div class="default" id="default_img"></div>\r\n			<p class="mt10 color9">晒米专家暂没有推荐哟</p>\r\n		</div>\r\n	</div>\r\n	<div class="infoList">\r\n		<div class="chart_box mb5" id="planTrendChartBox" style="display: none;"></div>\r\n		<ul class="infoBox" id="planList"></ul>\r\n	</div>\r\n	<!--<div id="userArticleList">\r\n	</div>-->\r\n	<ul class="infoBox mt10" id="replayList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planTrendChartBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex chart_head">\r\n		<span class="ui-flex_item">专家胜率表</span>\r\n		<span class="arrow arrow_up"></span>\r\n	</div>\r\n	<div class="chart_wrap">\r\n		<div id="planTrendChart" style="width: 100%;height:300px;"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,rich=$data.rich,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,prizeStatus=$data.prizeStatus,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,IMG_PATH=$data.IMG_PATH,$=$data.$,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = plan.access+'';
	var rich = plan.rich || false;
	var matchList = plan.matchList || [];
	var match = (matchList.length > 0 && matchList[0]) || {};
	var matchNum = matchList.length;
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale;
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
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="pt10">\n				<div class="recommend_item">\r\n					<p class="recommend_title">\r\n						';
 if (hasPic) {
$out+='\r\n							<span class="">【实单】</span>\r\n						';
 } 
$out+='\r\n						';
 if (title) { 
$out+='\r\n							';
$out+=$escape(title);
$out+='\r\n						';
 } else { 
$out+='\r\n							';
 
								for (var j = 0; j < matchNum; j++) { 
									var match = matchList[j] || {};
									var home = match.home;
									var away = match.away;
									var number = match.number;
							
$out+='\r\n								<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n					</p>\r\n					';
 if (prizeStatus == 1) { 
$out+='\r\n						<img class="recommend_win_bg" src="';
$out+=$escape(IMG_PATH);
$out+='recommend_win_bg.png">\r\n					';
 } 
$out+='\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span class="color_red">免费</span>\r\n								';
 } else { 
$out+='\r\n									<span class="color_red">查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n							';
 } 
$out+='\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\n			</div>\r\n		</div>\r\n		';
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
}).call(templateUtils,$data).toString()}function userArticleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,article=$data.article,articleTitle=$data.articleTitle,articleSource=$data.articleSource,articleImg=$data.articleImg,articleLink=$data.articleLink,img=$data.img,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var article = list[i] || {};
	var articleTitle = article.articleTitle;
	var articleSource = article.articleSource;
	var articleImg = article.articleImg;
	var articleLink = article.articleLink;
	var img = "<img class='sport_img fr'src='"+articleImg+"' onload='this.onload=null;parent.$(window.frameElement).after(this);parent.$(window.frameElement).remove()'/>";

$out+='\r\n<div class="shaimi_sport clearfix mt10" articleLink="';
$out+=$escape(articleLink);
$out+='" >\r\n	<div class="sport_title fl">\r\n		<p class="size14 mb10 mt5 ellipsis">\r\n			';
$out+=$escape(articleTitle);
$out+='\r\n		</p>\r\n		<p class="size10 color9 ellipsis">\r\n			来自';
$out+=$escape(articleSource);
$out+='\r\n		</p>\r\n	</div>\r\n	<iframe style="display:none" src="javascript:document.write(&quot;';
$out+=$escape(img);
$out+='&quot;)"/>\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function tabBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,userRight=$data.userRight,$out=''; if (userRight['1']) { 
$out+='\r\n			<div class="ui-flex_item" tab="1">未结束</div>\r\n			<div class="ui-flex_item" tab="2">单关</div>\r\n			<div class="ui-flex_item" tab="3">串关</div>\r\n	';
 } else if (userRight['3']) { 
$out+='\r\n		<div class="ui-flex_item" tab="1">未结束</div>\r\n		<div class="ui-flex_item" tab="2">已结束</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalPlanList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,lotteryId=$data.lotteryId,amount=$data.amount,readCount=$data.readCount,matchType=$data.matchType,isSale=$data.isSale,rich=$data.rich,prizeStatus=$data.prizeStatus,access=$data.access,recommendCount=$data.recommendCount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$=$data.$,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var lotteryId = plan.lotteryId;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchType = plan.matchType || 0;
	var isSale = plan.isSale || false;
	var rich = plan.rich || false;
	var prizeStatus = plan.prizeStatus;
	var matchType = plan.matchType || 0;
	var access = plan.access+'';
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
$out+='">\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
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
 if (prizeStatus == 1) { 
$out+='\r\n						<img class="" src="';
$out+=$escape(IMG_PATH);
$out+='user_win_prize.png" style="width: 45px;position: relative;z-index: 5;"/>\r\n					';
 } else if (amount == 0) { 
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
$out+='\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n		<div class="ui-flex pd10" style="border-top: 1px solid #e5e5e5;">\r\n			<span class="ui-flex_item isSale_btn" planNo="';
$out+=$escape(planNo);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 
	}
} 
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

$out+='\r\n	<li class="item clearfix replayItem" replayNo="';
$out+=$escape(replayNo);
$out+='">\r\n		<div class="recommend_cont">\r\n			<p class="recommend_title pt15 pb5 pl10">';
$out+=$escape(title);
$out+='</p>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});