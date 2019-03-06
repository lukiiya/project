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
})();exports.content=content;exports.previewImage=previewImage;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,orderNumeric=$data.orderNumeric,ticketOrder=$data.ticketOrder,status=$data.status,ticketMultiple=$data.ticketMultiple,planRealName=$data.planRealName,planNickName=$data.planNickName,planUserName=$data.planUserName,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,maxTicketPrizeAmount=$data.maxTicketPrizeAmount,ticketStatus=$data.ticketStatus,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,matchList=$data.matchList,length=$data.length,resourceList=$data.resourceList,planMatchType=$data.planMatchType,matchBettypeName=$data.matchBettypeName,$escape=$helpers.$escape,i=$data.i,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,D=$data.D,g=$data.g,text=$data.text,$1=$data.$1,$2=$data.$2,prefixMap=$data.prefixMap,$string=$helpers.$string,name=$data.name,$out='';
	var orderNumeric = ticketOrder.orderNumeric || "";
	var status = ticketOrder.status;
	var ticketMultiple = ticketOrder.ticketMultiple || 1;
	var planRealName = ticketOrder.planRealName || "";
	var planNickName = ticketOrder.planNickName || "";
	var planUserName = planRealName || planNickName;
	var amount = ticketOrder.amount/100 || 0;
	var ticketPrizeAmount = (ticketOrder.ticketPrizeAmount/100 || 0).toFixed(2);
	var maxTicketPrizeAmount = (ticketOrder.maxTicketPrizeAmount/100 || 0).toFixed(2);
	var ticketStatus = ticketOrder.ticketStatus;
	var imgMap = {"1":"cpsb","2":"dkj","3":"wzj","4":"yzj"};
	var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖"};
	var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchList = ticketOrder.matchList || [];
	var length = matchList.length;
	var resourceList = ticketOrder.resourceList || [];
	resourceList = resourceList.join('|');
	var planMatchType = ticketOrder.planMatchType || 1;
	var matchBettypeName = ticketOrder.matchBettypeName || '';

$out+='\r\n	<div class="sta_wrap">\r\n		<div class="win_wrap">\r\n			';
 if (ticketStatus == 0) { 
$out+='\r\n			<span class="btn" id="uploadBtn">\r\n				上传票样\r\n				<input type="file" name="" id="ticketSelect" value="" multiple/>\r\n			</span>\r\n			<div class="size12 mt5">\r\n				理论最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元</span>\r\n			</div>\r\n			';
 } if (ticketStatus == 5) { 
$out+='\r\n				<div class="ypj">\r\n					<span class="ypj_txt">\r\n						<i class="icon_ypj"></i>\r\n						已派奖	\r\n					</span><br />\r\n					<span class="bonus">';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 4 || ticketStatus == 6) { 
$out+='\r\n				';
 if (ticketPrizeAmount != 0) { 
$out+='\r\n					<div class="ypj" id="prizeSend">\r\n						<span class="ypj_txt">\r\n							<i class="icon_yzj_s"></i>\r\n							待派奖	\r\n						</span><br />\r\n						<span class="bonus" id="prize">';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="win_amount clearfix" id="ticketPrize">\r\n						<input class="fl" type="number" name="" id="ticketPrizeAmount" value="" placeholder="请输入中奖金额"/>\r\n						<span class="fr btn" id="prizeSure">确定</span>\r\n					</div>\r\n				';
 } 
$out+='\r\n			';
 } else if (ticketStatus == 2)　{ 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n				<div class="size12 mt5">\r\n					理论最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 3) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n			';
 }　
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			<div class="con_tit clearfix">\r\n				<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n			';
if (ticketStatus == 0) { 
$out+='\r\n				<span class="fr color_g check_ticket" id="refuseTicket">拒绝此单</span>\r\n			';
 } else if ((ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) && resourceList) { 
$out+='\r\n				<span class="fr color_g check_ticket" id="showTicketImg" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='" resourceList="';
$out+=$escape(resourceList);
$out+='">查看票样</span>\r\n			';
 } 
$out+='\r\n			</div>\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					<th>状态</th>\r\n				</tr>\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(ticketMultiple);
$out+='</td>\r\n				';
 if(ticketStatus == 0) { 
$out+='\r\n					<td>未出票</td>\r\n				';
 } else if(ticketStatus == 1 || status == 3) { 
$out+='\r\n					<td>出票失败</td>\r\n				';
 } else if(ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) { 
$out+='\r\n					<td>已出票</td>\r\n				';
 } 
$out+='\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	</div>\r\n	<div class="dty_cont">\r\n		<!--<h3 class="con_tit">跟单内容：</h3>-->\r\n		<div class="con_tit clearfix">\r\n			<span class="fl">玩法：<span class="color_g">';
$out+=$escape(matchBettypeName);
$out+='</span></span>\r\n			<span class="fr">过关方式：\r\n				';
 if(length == 1) { 
$out+='\r\n				<span class="color_g">单关</span>\r\n				';
 } else if (length > 1) { 
$out+='\r\n				<span class="color_g">';
$out+=$escape(length);
$out+='串1</span>\r\n				';
 } 
$out+='			\r\n			</span>\r\n		</div>\r\n		<div class="matchInfo_box">\r\n		';
 
			for (var i = 0; i < length; i++) { 
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
				var number = match.number.replace(/(\D+)(\d+)/g, function(text, $1, $2) {
					var prefixMap = {'周一':'1','周二':'2','周三':'3','周四':'4','周五':'5','周六':'6','周日':'7'}
					return prefixMap[$1]+$2;	
				});
			
$out+='\r\n				<div class="matchInfo_wrap">\r\n					<div class="matchInfo clearfix">\r\n						<span class="size14 fl match_name" style="';
$out+=$escape(planMatchType == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n						<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="ui-flex color3">\r\n						<div class="ui-flex_item ellipsis">';
$out+=$string(planMatchType == 2 ? match.away : match.home);
$out+='</div>\r\n						 ';
 if (match.result) { 
$out+='\r\n							';
 if (bettypeContent == "BQC") { 
$out+='\r\n							<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n							';
 } else { 
$out+='\r\n							<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							vs\r\n						';
 } 
$out+=' \r\n						<div class="ui-flex_item ellipsis textR">';
$out+=$string(planMatchType == 2 ? match.home : match.away);
$out+='</div>\r\n					</div>\r\n				';
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
$out+='</div>\r\n				</div>\r\n				';
 } else if (bettypeContent == 'SF' || bettypeContent == 'RFSF') { 
$out+='\r\n					<div class="ui-flex mt15 positionR">\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						';
 if (bettypeContent == "RFSF") { 
$out+='\r\n							<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n						';
 } 
$out+='\r\n						<div class="textBar ui-flex_item positionR ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					</div>\r\n				';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n					<div class="ui-flex mt15 flex_wrap">\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n						<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="ui-flex flex_wrap">\r\n						';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						';
 } 
$out+='\r\n						';
 
						if (prize.length <= 0) {
							for (var name in bettypeResult) {
								if (!bettypeResult[name]) {
									continue;
								}
						
$out+='\r\n							<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n						';

							}
						}
						
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function previewImage($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,ticketStatus=$data.ticketStatus,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="showImg" style="background-color: #000000;overflow: auto;">\r\n	<div class="header">\r\n		<div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header" id="backBtn"></span>\r\n				票样\r\n			';
 if (ticketStatus == 2) { 
$out+='\r\n			<span class="rightIcon_top color14" id="changeBtn">更换\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:0;opacity:0;" class="change_img" type="file" name="" id="" value="" multiple /></span>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	<div style="position: relative;">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});