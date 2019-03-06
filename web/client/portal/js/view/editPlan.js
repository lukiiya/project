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
})();exports.content=content;exports.recommend=recommend;exports.replay=replay;exports.amountList=amountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function recommend($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,bettypeMap=$data.bettypeMap,matchRecommend=$data.matchRecommend,matchList=$data.matchList,length=$data.length,i=$data.i,item=$data.item,match=$data.match,odds=$data.odds,recommend=$data.recommend,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,type=$data.type,$escape=$helpers.$escape,$string=$helpers.$string,JSON=$data.JSON,$out=''; 
		var bettypeMap = {
			"BF": {"1:0":"1:0","2:0":"2:0","2:1":"2:1","3:0":"3:0","3:1":"3:1","3:2":"3:2","4:0":"4:0","4:1":"4:1","4:2":"4:2","5:0":"5:0","5:1":"5:1","5:2":"5:2","SQT":"胜其他","0:0":"0:0","1:1":"1:1","2:2":"2:2","3:3":"3:3","PQT":"平其他","0:1":"0:1","0:2":"0:2","1:2":"1:2","0:3":"0:3","1:3":"1:3","2:3":"2:3","0:4":"0:4","1:4":"1:4","2:4":"2:4","0:5":"0:5","1:5":"1:5","2:5":"2:5","FQT":"负其他"},
			"ZJQ": {"0":"0球","1":"1球","2":"2球","3":"3球","4":"4球","5":"5球","6":"6球","7+":"7+球"},
			"BQC": {"SS":"胜胜","SP":"胜平","SF":"胜负","PS":"平胜","PP":"平平","PF":"平负","FS":"负胜","FP":"负平","FF":"负负"},
			"SFC": {"F1-5":"客胜1-5","F6-10":"客胜6-10","F11-15":"客胜11-15","F16-20":"客胜16-20","F21-25":"客胜21-25","F26+":"客胜26+","S1-5":"主胜1-5","S6-10":"主胜6-10","S11-15":"主胜11-15","S16-20":"主胜16-20","S21-25":"主胜21-25","S26+":"主胜26+"}
		}
		var matchRecommend = "";
		matchList = matchList || [];
		var length = matchList.length;
		if (length > 0) {
			matchRecommend = [];
			for (var i = 0; i < length; i++) {
				var item = matchList[i] || {};
				var match = item.match || {};
				var odds = item.odds || {};
				var recommend = item.recommend || [];
				var matchId = match.matchId || 0;
				var oddsId = odds.oddsId || 0;
				var bettypeContent = odds.bettypeContent || "";
				var recommendLength = recommend.length;
				if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
					continue;
				}
				match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
				var concede = odds.concede;
				var bettypeOdds = odds.bettypeOdds || {};
				var bettype = bettypeMap[bettypeContent] || {};
				var recommendMap = {};
				for (var j = 0; j < recommendLength; j++) {
					recommendMap[recommend[j]] = true;
				}
				matchRecommend.push({matchId: matchId, oddsId: oddsId, recommend: recommend});
				var type = match.type;
	
$out+='\r\n				<div class="select_box clearfix">\r\n					<div class="matchInfo clearfix">\r\n						<span class="size14 fl match_name" style="';
$out+=$escape(type == 2 ? 'color: #003cff' : '');
$out+='">';
$out+=$escape(match.league);
$out+='</span>\r\n						<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="ui-flex color3">\r\n						<div class="ui-flex_item ellipsis">';
$out+=$string(type == 2 ? match.away : match.home);
$out+='</div>\r\n						 vs\r\n						<div class="ui-flex_item ellipsis textR">';
$out+=$string(type == 2 ? match.home : match.away);
$out+='</div>\r\n					</div>\r\n					';
 if (bettypeContent == 'SPF' || bettypeContent == 'RQSPF') { 
$out+='\r\n						<div class="ui-flex mt15 pl40 positionR">\r\n							<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds['P']);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n						</div>\r\n					';
 } else if (bettypeContent == 'SF' || bettypeContent == 'RFSF') { 
$out+='\r\n						<div class="ui-flex mt15 positionR">\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n							';
 if (bettypeContent == "RFSF") { 
$out+='\r\n								<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							';
 } 
$out+='\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n						</div>\r\n					';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n						<div class="ui-flex mt15 flex_wrap">\r\n							<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n						</div>\r\n					';
 } else { 
$out+='\r\n						<div class="ui-flex mt15 positionR">\r\n							';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]);
$out+='</div>\r\n							';
 } 
$out+='\r\n						</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n		';

			}
			matchRecommend = JSON.stringify(matchRecommend);
		
$out+='\r\n	';
 } else { 
$out+='\r\n		<div class="select_box pr27 clearfix" id="selectMatch">\r\n			选择赛事、推荐项\r\n			<span class="icon_span icon_round_add"></span>\r\n		</div>\r\n	';
 } 
$out+='\r\n	<p class="size11 color9 mt10">注：发起串关、单固玩法，用户跟单，<span class="color_red size11">享奖金5%的分成</span></p>\r\n	<input class="title_input mt5" type="text" placeholder="输入您的标题，增加吸引力（至少5字）" id="title"  />\r\n	<p class="mt10">如何填写标题？<a class="replay_method" href="http://mp.weixin.qq.com/s/VRFUO0WpcNnm6pjuJ_I97A">点击查看攻略</a></p>\r\n	<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n		晒方案截图(限一张)\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n		<div class="planpicBox"> \r\n			<div id="fileList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<input type="hidden" id="matchRecommend" value="';
$out+=$escape(matchRecommend);
$out+='"/>\r\n	<input type="hidden" id="amount" value=""/>\r\n	<div class="textareaBox mt10">\r\n		<textarea id="content" class="textarea" placeholder="输入你分析的文字"></textarea>\r\n	</div>\r\n	<p class="color3 mt20">方案定价：</p>\r\n	<div class="ui-flex mt15" id="amountList"></div>\r\n	<div class="btn mt30" id="editSubmit">\r\n		发布\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function replay($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input class="title_input mt10" type="text" placeholder="输入您的标题，增加吸引力（至少5字，必填）" id="title"  />\n	<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n		晒复盘截图(限一张，必填)\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n		<div class="planpicBox"> \r\n			<div id="fileList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="textareaBox mt10">\r\n		<textarea id="content" class="textarea" placeholder="输入你的复盘文字（必填）"></textarea>\r\n	</div>\r\n	<div class="btn mt30" id="editSubmit">\r\n		发布\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function amountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,amount=$data.amount,$escape=$helpers.$escape,$out=''; 
	for (var i = 0, length = list.length; i < length; i++) {
	var amount = list[i];

$out+='\r\n	<div class="textBar ui-flex_item ';
$out+=$escape(i>0?'ml10':'');
$out+='" amount="';
$out+=$escape(amount);
$out+='">';
$out+=$escape(amount==0?'免费':(amount/100)+'元');
$out+='</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});