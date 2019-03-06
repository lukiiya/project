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
})();exports.content=content;exports.matchList=matchList;exports.leagueList=leagueList;exports.dateList=dateList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<!--<div class="ui-flex hotmatch_statustitle" id="matchStatusBox">\r\n		<div class="ui-flex_item" matchStatus="4">\r\n			<span>未结束</span>\r\n		</div>\r\n		<div class="ui-flex_item" matchStatus="3">\r\n			<span>已结束</span>\r\n		</div>\r\n	</div>-->\r\n	<div class="timetable" id="timetable">\r\n		<ul class="ui-flex" id="dateList"></ul>\r\n	</div>\r\n	<input type="hidden" id="selectLeague">\r\n	<div class="mask" id="matchFilter" style="display: none;">\r\n		<div class="hot_mask">\r\n			<div class="hot_maskTop" id="matchFilterTab">\r\n				<span class="borderr1" id="checkedAll">全选</span>\r\n				<span class="borderr1" id="inverse">反选</span>\r\n				<span id="ensure">确定</span>\r\n			</div>\r\n			<div class="hot_markContent" id="leagueList"></div>\r\n		</div>\r\n	</div>\r\n	<ul class="hotGame_boxBox" id="matchList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,match=$data.match,matchId=$data.matchId,sportteryMatchId=$data.sportteryMatchId,league=$data.league,home=$data.home,away=$data.away,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,planCount=$data.planCount,orderCount=$data.orderCount,type=$data.type,imgMap=$data.imgMap,number=$data.number,single=$data.single,spfSingle=$data.spfSingle,rqspfSingle=$data.rqspfSingle,rfsfSingle=$data.rfsfSingle,dxfSingle=$data.dxfSingle,halfResult=$data.halfResult,status=$data.status,leagueRank=$data.leagueRank,homeRank=$data.homeRank,awayRank=$data.awayRank,animationUrl=$data.animationUrl,videoUrl=$data.videoUrl,$escape=$helpers.$escape,$string=$helpers.$string,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var match = list[i] || {};
	var matchId = match.matchId || 0;
	var sportteryMatchId = match.sportteryMatchId || 0;
	var league = match.league;
	var home = match.home;
	var away = match.away;
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
	var planCount = match.planCount;
	var orderCount = match.orderCount; 
	var type = match.type;
	var imgMap = {"1":"team","2":"basketball_def"};
	var number = match.number;
	var single = match.single || {};
	var spfSingle = +single.SPF;
	var rqspfSingle = +single.RQSPF;
	var rfsfSingle = +single.RFSF;
	var dxfSingle = +single.DXF;
	var halfResult = match.halfResult.replace(/:/, '-') || '';
	var status = match.status; //0=未结束，1=已经结束，2=已取消
	var leagueRank = match.leagueRank || {};
	var homeRank = leagueRank.home || {};
	var awayRank = leagueRank.away || {};
	var animationUrl = match.animationUrl || "";
	var videoUrl = match.videoUrl || "";

$out+='\r\n	<li class="hotGame_box" matchId="';
$out+=$escape(matchId);
$out+='" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='" animationUrl="';
$out+=$escape(animationUrl);
$out+='" videoUrl="';
$out+=$escape(videoUrl);
$out+='">\r\n		<div class="ui-flex">\r\n			<div class="clearfix ui-flex_item">\r\n				<span class="fl size10">';
$out+=$escape(number);
$out+='</span>\r\n				<span class="fr size10 hot_orange" style="';
$out+=$escape(type == 2 ? 'color:#548cd4;' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n			</div>\r\n			<div class="half_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">';
$out+=$escape(halfResult != '' ? '(' + halfResult + ')': '');
$out+='</div>\r\n			<div class="textR ui-flex_item clearfix">\r\n				';
 if (status == 1) { 
$out+='\r\n					<div class="fl color_g">完场</div>\r\n				';
} else if (status == 2) { 
$out+='\r\n					<div class="fl color_g">已取消</div>\r\n				';
 } else { 
$out+='\r\n					<div class="fl minute" style="display:none" id="minute';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n					<div class="fl beginTime" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">\r\n						';
$out+=$escape(day);
$out+='&nbsp';
$out+=$escape(time);
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="fr">\r\n					';
 if (planCount > 0) { 
$out+='\r\n						<span class="competition_icon tj"></span>\r\n					';
 } 
$out+='\r\n					';
 if (((spfSingle == 1 || rqspfSingle == 1) && type == 1) || ((rfsfSingle == 1 || dxfSingle == 1) && type == 2)) { 
$out+='\r\n						<span class="competition_icon dg"></span>\r\n					';
 }　
$out+='\r\n					';
 if (videoUrl != '') { 
$out+='\r\n						<span class="fr competition_icon zb"></span>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex against_msg">\r\n			<div class="teams_name ui-flex_item textR ';
$out+=$string(type == 2 ? 'basketballAway' : '');
$out+='">\r\n				';
 if (type == 1 && awayRank.rank != '') { 
$out+='\r\n					<span class="team_rank">[';
$out+=$escape(homeRank.rank);
$out+=']</span>\r\n				';
 } 
$out+='\r\n				';
$out+=$string(type == 2 ? away : home);
$out+='\r\n			</div>\r\n			<div class="teams_score" style="display:none;';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n			';
 if(result && result.length == 2) { 
$out+='\r\n				<div class="teams_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">\r\n					';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='		\r\n				<div class="teams_vs" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</div>\r\n			';
 } 
$out+='\r\n			<div class="teams_name ui-flex_item ';
$out+=$string(type == 2 ? 'basketballHome' : '');
$out+='">\r\n				';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="colorab size10">(主)</span>' : '');
$out+='\r\n				';
 if (type == 1 && awayRank.rank != '') { 
$out+='\r\n					<span class="team_rank">[';
$out+=$escape(awayRank.rank);
$out+=']</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
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
}).call(templateUtils,$data).toString()}function dateList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,item=$data.item,date=$data.date,d=$data.d,week=$data.week,saleTime=$data.saleTime,difference=$data.difference,Date=$data.Date,today=$data.today,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var item = list[i] || {};
	var date = list[i].date && list[i].date.replace(/\d{4}-\d{2}-(\d{2})/, "$1") || "";
	var week = list[i].week || "";
	var saleTime = list[i].date;
	var difference = Date.parse(saleTime) - Date.parse(today)

$out+='\r\n	<li class="ui-flex_item" saleTime="';
$out+=$escape(saleTime);
$out+='">\r\n		';
 if (today == saleTime) { 
$out+='\r\n			<div class="date">今</div>\r\n		';
 } else { 
$out+='\r\n			<div class="date ';
$out+=$escape(difference > 0 ? 'color3' : '');
$out+='">';
$out+=$escape(date);
$out+='</div>\r\n		';
 } 
$out+='\r\n		<div class="week">';
$out+=$escape(week);
$out+='</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});