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
})();exports.content=content;exports.publishMarket=publishMarket;exports.orderPublishList=orderPublishList;exports.specification=specification;exports.planList=planList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function publishMarket($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex nav_wrap" id="navTab">\r\n		<div class="ui-flex_item" tab="1">\r\n			<span>自购大神</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="2">\r\n			<span>推荐专家</span>\r\n		</div>\r\n	</div>\r\n	<div class="self_list mt5">\r\n		<ul class="self_wrap" id="orderPublishList"></ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderPublishList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,publish=$data.publish,orderNo=$data.orderNo,amount=$data.amount,betAmount=$data.betAmount,matchType=$data.matchType,maxPrizeAmount=$data.maxPrizeAmount,followAmount=$data.followAmount,maxPrizeRate=$data.maxPrizeRate,createTime=$data.createTime,d=$data.d,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,betTag=$data.betTag,betTagMap=$data.betTagMap,matchTypeMap=$data.matchTypeMap,maxBettypeOdds=$data.maxBettypeOdds,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {	
	for (var i = 0; i < length; i++) {
	var publish = list[i] || {};
	var orderNo = publish.orderNo;
	var amount = publish.amount/100 || 0;
	var betAmount = publish.betAmount/100 || 0;
	var matchType = publish.matchType || 1;
	var maxPrizeAmount = publish.maxPrizeAmount;
	var followAmount = publish.followAmount/100 || 0;
	var maxPrizeRate = publish.maxPrizeRate;
	var createTime = publish.createTime && publish.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = publish.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var betTag = user.betTag;
	var betTagMap = {'千元户' : 'thousand','万元户': 'ten-thousand', '十万元户': 'hundred-thousand'};
	var matchTypeMap = {'1': '竞彩足球','2': '竞彩篮球'};
	var maxBettypeOdds = maxPrizeRate/100;

$out+='\n	<li class="self_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="color6 ui-flex">\r\n			<div>\r\n				<img class="icon_span img29" src="';
$out+=$escape(userImg);
$out+='">\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n					<span class="icon ';
$out+=$escape(betTagMap[betTag]);
$out+='"></span>\r\n				</span>\r\n			</div>\r\n			<div class="size10">返奖：<span class="color_red">';
$out+=$escape(maxPrizeRate);
$out+='%</span></div>\r\n		</div>\r\n		<div class="ui-flex item_msg">\r\n			<span>';
$out+=$escape(matchTypeMap[matchType]);
$out+=' ';
$out+=$escape(createTime);
$out+='</span>\r\n			<span>';
$out+=$escape(betAmount);
$out+='元起投</span>\r\n		</div>\r\n		<div class="ui-flex">\r\n			<div class="color6">\r\n				<span class="mr35">自购：<span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</span>\r\n				<span class="">跟单：<span class="color_red">';
$out+=$escape(followAmount);
$out+='</span>元</span>\r\n			</div>\r\n			<span class="ticket size10" planNo="';
$out+=$escape(orderNo);
$out+='" betAmount="';
$out+=$escape(betAmount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='">立即跟单</span>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#lotteryHall">自购</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function specification($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mt10 ml10 mr10">\r\n		<h3>跟单是什么？</h3>\r\n		<p>跟单即跟着中奖高手的方案投注，最低跟投一注。</p>\r\n		\r\n		<h3 class="mt20">如何把方案分享到跟单市场？</h3>\r\n		<p>自购竞彩足球、竞彩篮球的方案，在方案详情中，点击方案底部“分享到跟单市场”即可。</p>\r\n		<h3 class="mt20">如何分享给好友？</h3>\r\n		<p>点击方案详情中右上角“分享”按钮，可以分享到微信群或者朋友圈，让更多人看到你的方案，并跟单。</p>\r\n		<h3 class="mt20">自购大神介绍</h3>\r\n		<dl>\n			<dt>大神分类：</dt>\n			<dd>千元户：对应彩种单笔方案中奖超过1千元；</dd>\r\n			<dd>万元户：对应彩种单笔方案中奖超过1万元；</dd>\r\n			<dd>十万元户：对应彩种单笔方案中奖超过十万元；</dd>\r\n			<dd>百万元户：对应彩种单笔方案中奖超100万元。</dd>\n		</dl>\r\n		<dl class="mt10">\n			<dt>分成比例：</dt>\n			<dd>为保障跟单用户的利益，跟单方案需盈利30%以上，才可以分成。</dd>\r\n			<dd>中奖奖金的10%将作为分成（加奖部分不算在内），其中专家分成7%，剩余3%将作为平台服务费。</dd>\n		</dl>\r\n		<h3 class="mt20">推荐专家介绍</h3>\r\n		<dl>\r\n			<dt>专家状态：</dt>\r\n			<dd>5连红：专家近5单推荐都命中；；</dd>\r\n			<dd>胜60%：近7天专家推荐的命中率未60%；</dd>\r\n			<dd>10中6：近10单专家推荐命中了6单；</dd>\r\n			<dd>赢30%：近7天专家推荐整体盈利30%，扣除了成本。</dd>\r\n		</dl>\r\n		<dl class="mt10">\r\n			<dt>分成比例：</dt>\r\n			<dd>为保障跟单用户的利益，跟单方案需盈利15%以上，才可以分成。</dd>\r\n			<dd>中奖奖金的5%将作为分成（加奖部分不算在内），其中专家分成4%，剩余1%将作为平台服务费。</dd>\r\n		</dl>\n	</div>';
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
}).call(templateUtils,$data).toString()}});