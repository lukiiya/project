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
})();exports.content=content;exports.matchList=matchList;exports.selectMatch=selectMatch;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input type="hidden" id="jxzpId">\r\n<h1 class="title" id="title"></h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div class="sel_box">\r\n			<span>玩法:</span>\r\n				<span class="select_box ml10">\r\n				<select id="type" class="mr10">\r\n					<option value="0">请选择</option>\r\n					<option value="1">胜平负</option>\r\n					<option value="2">输赢盘</option>\r\n					<option value="3">大小球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<div class="match_wrap mt20 mb10" id="matchList">\r\n		<div class="match_btn">赛事选择</div>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>球队名称:</span>\r\n		</div>\r\n		<input class="ml5 input_field" placeholder="球队名称" id="teamName"/>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>近期状态:</span>\r\n			<span class="select_box ml10">\r\n				<select id="status">\r\n					<option value="0">请选择</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<input class="ml10 count" placeholder="场数" type="number" min="1" id="recentContinue"/>\r\n		</div>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>历史最高:</span>\r\n		</div>\r\n		<input class="ml5 count" placeholder="场数" type="number" min="1" id="historyContinue"/>\r\n	</div>\r\n	<div class="btn_wrap mt20 ml10">\r\n		<input class="ml10 bcg" type="button" value="　确定　" id="editSubmit"/>\r\n		<input class="ml10" type="button" value="　返回　" onclick="history.back()"/>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,keys=$data.keys,Object=$data.Object,matchMap=$data.matchMap,i=$data.i,length=$data.length,key=$data.key,matchIdKeys=$data.matchIdKeys,a=$data.a,b=$data.b,aBeginTime=$data.aBeginTime,bBeginTime=$data.bBeginTime,aNum=$data.aNum,bNum=$data.bNum,ret=$data.ret,$escape=$helpers.$escape,j=$data.j,len=$data.len,matchId=$data.matchId,match=$data.match,spfContent=$data.spfContent,rqspfContent=$data.rqspfContent,spf=$data.spf,rqspf=$data.rqspf,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,spfBettypeOddsJson=$data.spfBettypeOddsJson,rqspfBettypeOddsJson=$data.rqspfBettypeOddsJson,zjqContent=$data.zjqContent,zjq=$data.zjq,zjqBettypeOdds=$data.zjqBettypeOdds,zjqBettypeOddsJson=$data.zjqBettypeOddsJson,$out=''; if(type != 3) { 
$out+='\r\n<div class="matchExcel_wrap" style="width:450px;" id="spfBox">\r\n	';

		var keys = Object.keys(matchMap).sort();
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var matchIdKeys = Object.keys(matchMap[key]);
			matchIdKeys = matchIdKeys.sort(function(a, b) {
				var aBeginTime = matchMap[key][a].beginTime;
				var bBeginTime = matchMap[key][b].beginTime;
				var aNum = matchMap[key][a].number;
				var bNum = matchMap[key][b].number;
				var ret = 0;
				if (aBeginTime > bBeginTime) {
					ret = 1;
				} else if (aBeginTime < bBeginTime) {
					ret = -1;
				} else if (aNum > bNum) {
					ret = 1;
				} else if (aNum < bNum) {
					ret = -1;
				}
				return ret; 
			});
	
$out+='\r\n	<div class="match_excel">\r\n		<div class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(key);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></div>\r\n		<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n		';
 
			for (var j = 0, len = matchIdKeys.length; j < len; j++) {
			var matchId = matchIdKeys[j]
			var match = matchMap[key][matchId];
			var spfContent = 'SPF';
			var rqspfContent = 'RQSPF';
			var spf = match['bettype'][spfContent] || {};
			var rqspf = match['bettype'][rqspfContent] || {};
			var spfBettypeOdds = spf.bettypeOdds;
			var rqspfBettypeOdds = rqspf.bettypeOdds;
			var spfBettypeOddsJson = spf.bettypeOddsJson || {"S":"--","P":"--","F":"--"};
			var rqspfBettypeOddsJson = rqspf.bettypeOddsJson || {"S":"--","P":"--","F":"--"};
		
$out+='\r\n			<div class="match_data clearfix">\r\n				<div class="base_data">\r\n					<span>';
$out+=$escape(match.league);
$out+='</span><br/>\r\n					<span class="mb10">';
$out+=$escape(match.bDate);
$out+='</span><br/>\r\n					<span>';
$out+=$escape(match.bTime);
$out+='</span>\r\n				</div>\r\n				<div class="data_list">\r\n					<table class="match_table" matchId="';
$out+=$escape(matchId);
$out+='" league="';
$out+=$escape(match.league);
$out+='" home="';
$out+=$escape(match.home);
$out+='" away="';
$out+=$escape(match.away);
$out+='" beginTime="';
$out+=$escape(match.beginTime);
$out+='">\r\n						<tr>\r\n							<th colspan="3">\r\n								<span>';
$out+=$escape(match.home);
$out+='</span>\r\n								<span>VS</span>\r\n								<span>';
$out+=$escape(match.away);
$out+='</span>\r\n							</th>\r\n						</tr>\r\n						<tr class="matchContentTr" oddsId="';
$out+=$escape(spf.oddsId);
$out+='" bettypeContent="';
$out+=$escape(spfContent);
$out+='" bettypeOdds="';
$out+=$escape(spfBettypeOdds);
$out+='" concede="';
$out+=$escape(spf.concede);
$out+='">\r\n							<td recommend="S">胜<span>';
$out+=$escape(spfBettypeOddsJson.S);
$out+='</span><span class="numcircle">';
$out+=$escape(spf.concede);
$out+='</span></td>\r\n							<td recommend="P">平<span>';
$out+=$escape(spfBettypeOddsJson.P);
$out+='</span></td>\r\n							<td recommend="F">负<span>';
$out+=$escape(spfBettypeOddsJson.F);
$out+='</span></td>\r\n						</tr>\r\n						<tr class="matchContentTr" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='" bettypeContent="';
$out+=$escape(rqspfContent);
$out+='" bettypeOdds="';
$out+=$escape(rqspfBettypeOdds);
$out+='" concede="';
$out+=$escape(rqspf.concede);
$out+='">\r\n							<td recommend="S">胜<span>';
$out+=$escape(rqspfBettypeOddsJson.S);
$out+='</span><span class="numcircle numcircle1">';
$out+=$escape(rqspf.concede);
$out+='</span></td>\r\n							<td recommend="P">平<span>';
$out+=$escape(rqspfBettypeOddsJson.P);
$out+='</span></td>\r\n							<td recommend="F">负<span>';
$out+=$escape(rqspfBettypeOddsJson.F);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } else { 
$out+='\r\n<div id="zjqBox" style="width: 450px;">\r\n	';

		var keys = Object.keys(matchMap).sort();
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var matchIdKeys = Object.keys(matchMap[key]);
			matchIdKeys = matchIdKeys.sort(function(a, b) {
				var aBeginTime = matchMap[key][a].beginTime;
				var bBeginTime = matchMap[key][b].beginTime;
				var aNum = matchMap[key][a].number;
				var bNum = matchMap[key][b].number;
				var ret = 0;
				if (aBeginTime > bBeginTime) {
					ret = 1;
				} else if (aBeginTime < bBeginTime) {
					ret = -1;
				} else if (aNum > bNum) {
					ret = 1;
				} else if (aNum < bNum) {
					ret = -1;
				}
				return ret; 
			});
	
$out+='\r\n	<div class="match_excel clearfix">\r\n		<div class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(key);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></div>\r\n		<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n			';
 
				for (var j = 0, len = matchIdKeys.length; j < len; j++) {
				var matchId = matchIdKeys[j]
				var match = matchMap[key][matchId];
				var zjqContent = 'ZJQ';
				var zjq = match['bettype'][zjqContent] || {};
				var zjqBettypeOdds = zjq.bettypeOdds || "";
				var zjqBettypeOddsJson = zjq.bettypeOddsJson || {};
			
$out+='\r\n			<div class="table_wrap match_data clearfix">\r\n				<div class="base_data">\r\n					<span>';
$out+=$escape(match.league);
$out+='</span><br>\r\n					<span class="mb15">';
$out+=$escape(match.bDate);
$out+='</span><br>\r\n					<span>';
$out+=$escape(match.bTime);
$out+='</span>\r\n				</div>\r\n				<div class="data_list">\r\n					<table class="game_table matchBettype" matchId="';
$out+=$escape(matchId);
$out+='" league="';
$out+=$escape(match.league);
$out+='" home="';
$out+=$escape(match.home);
$out+='" away="';
$out+=$escape(match.away);
$out+='" beginTime="';
$out+=$escape(match.beginTime);
$out+='">\r\n						<tr>\r\n							<th colspan="4">\r\n								<span>';
$out+=$escape(match.home);
$out+='</span>\r\n								<span>VS</span>\r\n								<span>';
$out+=$escape(match.away);
$out+='</span>\r\n							</th>\r\n						</tr>\r\n						<tr oddsId="';
$out+=$escape(zjq.oddsId);
$out+='" bettypeContent="';
$out+=$escape(zjqContent);
$out+='" bettypeOdds="';
$out+=$escape(zjqBettypeOdds);
$out+='" concede="';
$out+=$escape(zjq.concede);
$out+='">\r\n							<td width="86" recommend="0">0<br/><span>';
$out+=$escape(zjqBettypeOddsJson['0']);
$out+='</span></td>\r\n							<td width="86" recommend="1">1<br/><span>';
$out+=$escape(zjqBettypeOddsJson['1']);
$out+='</span></td>\r\n							<td width="86" recommend="2">2<br/><span>';
$out+=$escape(zjqBettypeOddsJson['2']);
$out+='</span></td>\r\n							<td width="86" recommend="3">3<br/><span>';
$out+=$escape(zjqBettypeOddsJson['3']);
$out+='</span></td>	\r\n						</tr>\r\n						<tr oddsId="';
$out+=$escape(zjq.oddsId);
$out+='" bettypeContent="';
$out+=$escape(zjqContent);
$out+='" bettypeOdds="';
$out+=$escape(zjqBettypeOdds);
$out+='" concede="';
$out+=$escape(zjq.concede);
$out+='">\r\n							<td recommend="4">4<br/><span>';
$out+=$escape(zjqBettypeOddsJson['4']);
$out+='</span></td>\r\n							<td recommend="5">5<br/><span>';
$out+=$escape(zjqBettypeOddsJson['5']);
$out+='</span></td>\r\n							<td recommend="6">6<br/><span>';
$out+=$escape(zjqBettypeOddsJson['6']);
$out+='</span></td>\r\n							<td recommend="7+">7+<br/><span>';
$out+=$escape(zjqBettypeOddsJson['7+']);
$out+='</span></td>	\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
$out+='\r\n<div class="mt10" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="matchListCancel"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="matchListSure"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function selectMatch($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,matchId=$data.matchId,oddsId=$data.oddsId,recommend=$data.recommend,match=$data.match,d=$data.d,spfContent=$data.spfContent,rqspfContent=$data.rqspfContent,zjqContent=$data.zjqContent,spf=$data.spf,rqspf=$data.rqspf,zjq=$data.zjq,spfOddsId=$data.spfOddsId,rqspfOddsId=$data.rqspfOddsId,zjqOddsId=$data.zjqOddsId,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,spfBettypeOddsJson=$data.spfBettypeOddsJson,rqspfBettypeOddsJson=$data.rqspfBettypeOddsJson,zjqBettypeOddsJson=$data.zjqBettypeOddsJson,spfConcede=$data.spfConcede,rqspfConcede=$data.rqspfConcede,spfRecommend=$data.spfRecommend,rqspfRecommend=$data.rqspfRecommend,zjqRecommend=$data.zjqRecommend,recommendSelect=$data.recommendSelect,S=$data.S,P=$data.P,F=$data.F,recommendOdds=$data.recommendOdds,zjqCommendSelect=$data.zjqCommendSelect,zjqRecommentOdds=$data.zjqRecommentOdds,concede=$data.concede,recommendLength=$data.recommendLength,i=$data.i,length=$data.length,zjqRecommendOdds=$data.zjqRecommendOdds,zjqConcede=$data.zjqConcede,$escape=$helpers.$escape,j=$data.j,$out=''; 
	var matchId = 0;
	var oddsId = 0;
	var recommend = '';
	if (match) {
		matchId = match.matchId;
		match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var spfContent = 'SPF';
		var rqspfContent = 'RQSPF';
		var zjqContent = 'ZJQ';	
		var spf = match['bettype'][spfContent] || {};
		var rqspf = match['bettype'][rqspfContent] || {};
		var zjq = match['bettype'][zjqContent] || {};
		var spfOddsId = spf.oddsId || 0;
		var rqspfOddsId = rqspf.oddsId || 0;
		var zjqOddsId = zjq.oddsId || 0;
		var spfBettypeOdds = spf.bettypeOdds || "";
		var rqspfBettypeOdds = rqspf.bettypeOdds || "";
		var zjqBettypeOdds = zjq.bettypeOdds || "";
		var spfBettypeOddsJson = spf.bettypeOddsJson || {};
		var rqspfBettypeOddsJson = rqspf.bettypeOddsJson || {};
		var zjqBettypeOddsJson = zjq.bettypeOddsJson || {};
		var spfConcede = spf.concede;
		var rqspfConcede = rqspf.concede;
		var spfRecommend = spf.recommend || [];
		var rqspfRecommend = rqspf.recommend || [];
		var zjqRecommend = zjq.recommend || [];
		var recommendSelect = {S:false,P:false,F:false};
		var recommendOdds = {S:'',P:'',F:''};
		var zjqCommendSelect = {'0':false,'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7+':false};
		var zjqRecommentOdds = {'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7+':''};
		var concede = 0;
		var recommendLength = recommend.length;
		if (spfOddsId > 0 && spfBettypeOddsJson && spfRecommend.length > 0) {
			oddsId = spfOddsId;
			recommend = spfRecommend.join(',');
			for (var i = 0, length = spfRecommend.length; i < length; i++) {
				recommendSelect[spfRecommend[i]] = true;
			}
			recommendOdds = spfBettypeOddsJson;
			concede = spfConcede;
		} else if (rqspfOddsId > 0 && rqspfBettypeOddsJson && rqspfRecommend.length > 0) {
			oddsId = rqspfOddsId;
			recommend = rqspfRecommend.join(',');
			for (var i = 0, length = rqspfRecommend.length; i < length; i++) {
				recommendSelect[rqspfRecommend[i]] = true;
			}
			recommendOdds = rqspfBettypeOddsJson;
			concede = rqspfConcede;
		} else if (zjqOddsId > 0 && zjqBettypeOddsJson && zjqRecommend.length > 0) {
			oddsId = zjqOddsId;
			recommend = zjqRecommend.join(',');
			for (var i = 0, length = zjqRecommend.length; i < length; i++) {
				zjqCommendSelect[zjqRecommend[i]] = true;
			}
			zjqRecommendOdds = zjqBettypeOddsJson;
			concede = zjqConcede;
		}

$out+='\r\n		<input type="hidden" id="matchId" value="';
$out+=$escape(matchId);
$out+='">\r\n		<input type="hidden" id="oddsId" value="';
$out+=$escape(oddsId);
$out+='">\r\n		<input type="hidden" id="recommend" value="';
$out+=$escape(recommend);
$out+='">\r\n		';
 if (spf.bettypeContent == 'SPF' || rqspf.bettypeContent == 'RQSPF') { 
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<div class="left_match fl">\r\n					[<span class="match_name">';
$out+=$escape(match.league);
$out+='</span>]\r\n					<span class="ml10 color3">';
$out+=$escape(match.home);
$out+=' \r\n					';
 if (concede != 0) {
$out+='\r\n						<span class="colorred">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+='\r\n					';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<div class="size12 color9 fr">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<ul class="odds_list mt15">\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(recommendOdds["S"]);
$out+='</li>\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["P"]?'active':'');
$out+='">平局 ';
$out+=$escape(recommendOdds["P"]);
$out+='</li>\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(recommendOdds["F"]);
$out+='</li>\r\n			</ul>\r\n		</div>\r\n		';
 } else if (zjq.bettypeContent == 'ZJQ'){ 
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<div class="left_match fl">\r\n					[<span class="match_name">';
$out+=$escape(match.league);
$out+='</span>]\r\n					<span class="ml10 color3">';
$out+=$escape(match.home);
$out+=' \r\n					';
 if (concede != 0) {
$out+='\r\n						<span class="colorred">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+='\r\n					';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<div class="size12 color9 fr">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<ul class="odds_list mt15">\r\n				';
 for (var j = 0; j < zjqRecommend.length; j++) { 
$out+='\r\n				<li class="odds_item active">';
$out+=$escape(zjqRecommend[j]||'');
$out+='球 ';
$out+=$escape(zjqRecommendOdds[zjqRecommend[j]]);
$out+='</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n		';
 } 
$out+='\r\n';
 } else { 
$out+='\r\n	<div class="match_btn">赛事选择</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});