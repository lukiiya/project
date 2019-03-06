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
})();exports.content=content;exports.mask=mask;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,planNo=$data.planNo,plan=$data.plan,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,isSale=$data.isSale,maxPrizeRate=$data.maxPrizeRate,resourceList=$data.resourceList,matchList=$data.matchList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,matchType=$data.matchType,$escape=$helpers.$escape,i=$data.i,length=$data.length,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$string=$helpers.$string,name=$data.name,$out=''; 
	var planNo = plan.planNo || "";
	var content = plan.content || "";
	var upCount = plan.upCount || 0;
	var downCount = plan.downCount || 0;
	var shareCount = plan.shareCount || 0;
	var isSale = !!plan.isSale;
	var maxPrizeRate = plan.maxPrizeRate || 0;
	var resourceList = plan.resourceList || [];
	var matchList = plan.matchList || [];
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";
	var matchType = plan.matchType;

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">晒米人：';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 
			for (var i = 0, length = matchList.length; i < length; i++) { 
			var match = matchList[i] || {};
			var recommend = match.recommend || [];
			var prize = match.prize || [];
			var matchId = match.matchId || 0;
			var oddsId = match.oddsId || 0;
			var bettypeContent = match.bettypeContent || "";
			var recommendLength = recommend.length;
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
				continue;
			}
			match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
			var nullOdds = '--';//赔率为空显示值
			var concede = match.concede;
			var bettypeOdds = match.bettypeOdds || {};
			var bettype = match.bettypeValue || {};
			var recommendMap = {};
			for (var j = 0; j < recommendLength; j++) {
				recommendMap[recommend[j]] = true;
			}
			var bettypeResult = match.bettypeResult || {};
			var number = match.number;
		
$out+='\r\n			<div class="matchInfo_wrap">\r\n				<div class="matchInfo clearfix">\r\n					<span class="size14 fl match_name" style="';
$out+=$escape(matchType == 2 ? 'color:#003cff;' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n					<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n				</div>\r\n				<div class="ui-flex color3">\r\n					<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n					 ';
 if (match.result) { 
$out+='\r\n						';
 if (bettypeContent == "BQC") { 
$out+='\r\n						<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n						';
 } else { 
$out+='\r\n						<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n						';
 } 
$out+='\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+=' \r\n					<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+=$string(matchType == 2 ? '(主)' : '');
$out+='</div>\r\n				</div>\r\n			';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n				<div class="ui-flex flex_wrap pl40">\r\n					<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "RFSF" || bettypeContent == "SF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					';
 if (bettypeContent == "RFSF") { 
$out+='\r\n						<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					';
 } 
$out+='\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					';
 } 
$out+='\r\n					';
 
					if (prize.length <= 0) {
						for (var name in bettypeResult) {
							if (!bettypeResult[name]) {
								continue;
							}
					
$out+='\r\n						<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n					';

						}
					}
					
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n			</div>\r\n		';
 } 
$out+='\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="planDetail">\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 if(isSale) { 
$out+='\r\n	<div class="expertInfo_bottom">\r\n		<div class="ui-flex bet">\r\n			<div class="ui-flex_item textL">\r\n				理论最大返奖：<span class="color_red">';
$out+=$escape(maxPrizeRate>0?+maxPrizeRate+'%':'未知');
$out+='</span>\r\n			</div>\r\n			<div class="ui-flex_item textR" id="addTicket">\r\n				<a class="btn">跟单投注</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mask" id="ticketOrderMask">\r\n		<div class="pop5"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});