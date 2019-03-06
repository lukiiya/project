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
})();exports.content=content;exports.football=football;exports.basketball=basketball;exports.JZYP=JZYP;exports.SPFDG=SPFDG;exports.leagueList=leagueList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input type="hidden" id="selectLeague">\r\n	<div class="mask" id="matchFilter" style="display: none;top: 48px;">\r\n		<div class="hot_mask">\r\n			<div class="hot_maskTop" id="matchFilterTab">\r\n				<span class="borderr1" id="checkedAll">全选</span>\r\n				<span class="borderr1" id="inverse">反选</span>\r\n				<span id="ensure">确定</span>\r\n			</div>\r\n			<div class="hot_markContent" id="leagueList"></div>\r\n		</div>\r\n	</div>\r\n	<div id="matchList"></div>\r\n	<div class="buy_list" style="display: none;" id="buyList">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb5">已选<span class="selectNum" id="selectNum"></span>场</div>\r\n				<div class="colorc5">非单关玩法至少选2场比赛</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="createTicketSubmit">\r\n				确认\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,spf=$data.spf,rqspf=$data.rqspf,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,number=$data.number,single=$data.single,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var spf = match['bettype']['SPF'] || {};
		var rqspf = match['bettype']['RQSPF'] || {};
		var spfBettypeOdds = spf.bettypeOdds || {};
		var rqspfBettypeOdds = rqspf.bettypeOdds || {};
		var number = match.number;
		var single = (!!spf.single) || (!!rqspf.single);
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(spf.oddsId);
$out+='">\r\n						<td recommend="S">胜<span>';
$out+=$escape(spfBettypeOdds.S);
$out+='</span><span class="numcircle">0</span></td>\r\n						<td recommend="P">平<span>';
$out+=$escape(spfBettypeOdds.P);
$out+='</span></td>\r\n						<td recommend="F">负<span>';
$out+=$escape(spfBettypeOdds.F);
$out+='</span></td>\r\n						<td class="more_game" rowspan="2" id="moreBettype';
$out+=$escape(match.matchId);
$out+='">更多玩法<b></b></td>\r\n					</tr>\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n						<td recommend="S">胜<span>';
$out+=$escape(rqspfBettypeOdds.S);
$out+='</span><span class="numcircle numcircle1">';
$out+=$escape(rqspf.concede > 0 ? '+'+rqspf.concede : rqspf.concede);
$out+='</span></td>\r\n						<td recommend="P">平<span>';
$out+=$escape(rqspfBettypeOdds.P);
$out+='</span></td>\r\n						<td recommend="F">负<span>';
$out+=$escape(rqspfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function basketball($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,rfsf=$data.rfsf,dxf=$data.dxf,rfsfBettypeOdds=$data.rfsfBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,number=$data.number,single=$data.single,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,$string=$helpers.$string,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var rfsf = match['bettype']['RFSF'] || {};
		var dxf = match['bettype']['DXF'] || {};
		var rfsfBettypeOdds = rfsf.bettypeOdds || {};
		var dxfBettypeOdds = dxf.bettypeOdds || {};
		var number = match.number;
		var single = (!!rfsf.single) || (!!dxf.single);
		var Hconcede;
		var Aconcede;
		if (rfsf.concede > 0) {
			Hconcede = '+' + (rfsf.concede);
			Aconcede = -rfsf.concede;
		} else {
			Hconcede = rfsf.concede;
			Aconcede = '+' + (-rfsf.concede)
		}
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name" style="color: #003cff;">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml10">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='<span>(主)</span></span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n						<td recommend="F">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(rfsfBettypeOdds.F);
$out+='</span></td>\r\n						<!--<td class="';
$out+=$escape(rfsf.concede > 0 ? "active_red" : "active_green");
$out+='">主<span>';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='<span></td>-->\r\n						<td recommend="S">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml10 size10">';
$out+=$escape(rfsfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="more_game" rowspan="2" id="moreBettype';
$out+=$escape(match.matchId);
$out+='">更多玩法<b></b></td>\r\n					</tr>\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n						<td recommend="D">大于';
$out+=$escape(dxf.concede);
$out+='<span class="ml15 size13">';
$out+=$escape(dxfBettypeOdds.D);
$out+='</span></td>\r\n<!--						<td><span class="current color_red">';
$out+=$escape(dxf.concede);
$out+='</span></td>-->\r\n						<td recommend="X">小于';
$out+=$escape(dxf.concede);
$out+='<span class="ml15 size13">';
$out+=$escape(dxfBettypeOdds.X);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function JZYP($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,sf=$data.sf,sfBettypeOdds=$data.sfBettypeOdds,number=$data.number,single=$data.single,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var sf = match['bettype']['SF'] || {};
		var sfBettypeOdds = sf.bettypeOdds || {};
		var number = match.number;
		var single = (!!sf.single);
		var Hconcede;
		var Aconcede;
		if (sf.concede > 0) {
			Hconcede = '+' + (sf.concede);
			Aconcede = -sf.concede;
		} else {
			Hconcede = sf.concede;
			Aconcede = '+' + (-sf.concede)
		}
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype yapan" oddsId="';
$out+=$escape(sf.oddsId);
$out+='" height="45">\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="S" width="113">胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(sfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="F" width="113">负';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(sfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function SPFDG($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,spf=$data.spf,spfBettypeOdds=$data.spfBettypeOdds,number=$data.number,$out='';	
	var length = list.length;
	if (length > 0) {
		for (var i = 0; i < length; i++) {
			var date = list[i].date || '';
			var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var spf = match['bettype']['SPF'] || {};
		var spfBettypeOdds = spf.bettypeOdds || {};
		var number = match.number;	
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype yapan" oddsId="';
$out+=$escape(spf.oddsId);
$out+='" height="45">\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="S" width="113">胜<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="P" width="113">平<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.P);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="F" width="113">负<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
} else { 
$out+='\r\n	<p class="textC mt30">暂无赛事</p>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function leagueList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,item=$data.item,league=$data.league,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var item = list[i] || {};
	var league = item.league;

$out+='\r\n<span class="hot_markSon" style="overflow:hidden">';
$out+=$escape(league);
$out+='</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});