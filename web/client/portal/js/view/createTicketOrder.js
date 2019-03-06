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
var $helpers=this,isSale=$data.isSale,matchType=$data.matchType,plan=$data.plan,matchList=$data.matchList,amount=$data.amount,self=$data.self,ticketOrder=$data.ticketOrder,length=$data.length,i=$data.i,match=$data.match,prize=$data.prize,recommend=$data.recommend,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,concede=$data.concede,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$escape=$helpers.$escape,$string=$helpers.$string,name=$data.name,$out='';$out+='<h3 class="con_tit">跟单内容：</h3>\r\n<div class="matchInfo_box">\r\n	';
 
		var isSale;
		var matchType;
		if (plan) {
			isSale = !!plan.isSale;
			matchList = plan.matchList || [];
			matchType = plan.matchType || 1;
			var amount = plan.amount;
		} else if (self) {
			isSale = !!self.isSale;
			matchList = self.matchList || [];
		} else if (ticketOrder) {
			isSale = !!ticketOrder.isSale;
			matchList = ticketOrder.matchList || [];
			matchType = ticketOrder.matchType || 1;
			var amount = ticketOrder.amount;
		}
		var length = matchList.length;
		for (var i = 0; i < length; i++) {
			var match = matchList[i] || {};
			var prize = match.prize || [];
			var recommend = match.recommend || [];
			var matchId = match.matchId || 0;
			var oddsId = match.oddsId || 0;
			var bettypeContent = match.bettypeContent || "";
			var concede = match.concede;
			var Hconcede;
			var Aconcede;
			if (concede > 0) {
				Hconcede = '+' + (concede);
				Aconcede = -concede;
			} else {
				Hconcede = concede;
				Aconcede = '+' + (-concede)
			}
			var bettypeOdds = match.bettypeOdds || {};
			var bettype = match.bettypeValue || {};
			var recommendLength = recommend.length;
			if (self) {
				matchType = match.type
			}
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
				continue;
			}
			match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
			var nullOdds = '--';//赔率为空显示值
			var recommendMap = {};
			for (var j = 0; j < recommendLength; j++) {
				recommendMap[recommend[j]] = true;
			}
			var bettypeResult = match.bettypeResult || {};
			var number = match.number;
	
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<span class="size14 fl match_name" style="';
$out+=$escape(matchType == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n				<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<div class="ui-flex color3">\r\n				<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n				 ';
 if (match.result) { 
$out+='\r\n					';
 if (bettypeContent == "BQC") { 
$out+='\r\n					<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n					';
 } else { 
$out+='\r\n					<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					vs\r\n				';
 } 
$out+=' \r\n				<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+=$string(matchType == 2 ? '(主)' : '');
$out+='</div>\r\n			</div>\r\n		';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n			<div class="ui-flex flex_wrap pl40">\r\n				<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平局 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "SF" && matchType == 1) { 
$out+='\r\n			<div class="ui-flex mt15 positionR yapan">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n			</div>\r\n		';
 } else if (bettypeContent == 'SF') { 
$out+='\r\n			<div class="ui-flex mt15 positionR">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == 'RFSF') { 
$out+='\r\n			<div class="ui-flex mt15 positionR">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n			<div class="ui-flex mt15 flex_wrap">\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["D"]);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="ui-flex flex_wrap">\r\n				';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				';
 } 
$out+='\r\n				';
 
				if (plan && prize.length <= 0) {
					for (var name in bettypeResult) {
						if (!bettypeResult[name]) {
							continue;
						}
				
$out+='\r\n					<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n				';

					}
				}
				
$out+='\r\n			</div>\r\n		';
 } 
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n</div>\r\n<!--<div class="read ml10 mt5 mb30">\r\n	<label><input type="checkbox" name="tongyi" id="protocol" checked="checked" />已阅读并同意</label>\r\n	<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n</div>-->\r\n<div class="buy_list ';
$out+=$escape(isSale?'':'hide');
$out+='">\r\n	<div class="read pl10 pt5">\r\n		<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked" />\r\n		<label for="protocol">已阅读并同意</label>\r\n		<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n	</div>\r\n	<div class="pass_way clearfix" id="passTypeBox" style="display: none;"></div>\r\n	<div class="ui-flex">\r\n		<!--<div class="ui-flex_item size18">';
$out+=$escape(length>1?length+'串1':'单关');
$out+='</div>-->\r\n		<div class="ui-flex_item">\r\n			<div class="select_btn" id="passTypeBtn">\r\n			<span class="select_txt" id="passTypeText"></span>\r\n				<span class="select_triangle icon_select_up" id="passTypeIcon"></span>\r\n			</div>\r\n		</div>\r\n		<div class="bet_multiple color6 size16">\r\n			<span class="ml10 icon_jetton10" id="ticketMultiple10"></span>\r\n			<span class="icon_jetton100" id="ticketMultiple100"></span>\r\n			<span class="icon_jetton1000" id="ticketMultiple1000"></span>\r\n			<span class="mr10"><input class="another_multiple" type="number" value="10" min="10" max="10000" id="ticketMultiple"/>倍</span>\r\n		</div>\r\n	</div>\r\n	<div class="pay_info clearfix">\r\n		<div class="pay_left fl">\r\n			<div class="pay_num"><span id="countUnit"></span><span id="ticketAmount"></span></div>\r\n			<div class="bonus" id="maxPrize">理论最大奖金：0</div>\r\n		</div>\r\n		<div class="pay_btn fr" id="createTicketSubmit" planAmount="';
$out+=$escape(amount);
$out+='">\r\n			投注\r\n		</div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});