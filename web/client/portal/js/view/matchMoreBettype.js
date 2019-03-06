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
})();exports.content=content;exports.football=football;exports.basketball=basketball;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,bf=$data.bf,match=$data.match,zjq=$data.zjq,bqc=$data.bqc,bfBettypeOdds=$data.bfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,bqcBettypeOdds=$data.bqcBettypeOdds,$escape=$helpers.$escape,$out='';$out+='<style type="text/css">\r\n	.moreGame .table_wrap{\r\n		padding: 0;\r\n	}\r\n</style>\r\n';
 
	var bf = match['bettype']['BF'] || {};
	var zjq = match['bettype']['ZJQ'] || {};
	var bqc = match['bettype']['BQC'] || {};
	var bfBettypeOdds = bf.bettypeOdds || {};
	var zjqBettypeOdds = zjq.bettypeOdds || {};
	var bqcBettypeOdds = bqc.bettypeOdds || {};

$out+='\r\n<div>\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">总进球<span class="color9 ml10">猜90分钟内(含补时)比赛总进球数</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(zjq.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color70" rowspan="2">进球数</td>\r\n				<td recommend="0">0<br/><span>';
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
$out+='">\r\n			<tr>\r\n				<td class="game_title color60" rowspan="3">半全场</td>\r\n				<td recommend="SS">胜胜<br/><span>';
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
var $helpers=this,sf=$data.sf,match=$data.match,rfsf=$data.rfsf,sfc=$data.sfc,dxf=$data.dxf,sfBettypeOdds=$data.sfBettypeOdds,rfsfBettypeOdds=$data.rfsfBettypeOdds,sfcBettypeOdds=$data.sfcBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,$escape=$helpers.$escape,$string=$helpers.$string,$out=''; 
	var sf = match['bettype']['SF'] || {};
	var rfsf = match['bettype']['RFSF'] || {};
	var sfc = match['bettype']['SFC'] || {};
	var dxf = match['bettype']['DXF'] || {};
	var sfBettypeOdds = sf.bettypeOdds || {};
	var rfsfBettypeOdds = rfsf.bettypeOdds || {};
	var sfcBettypeOdds = sfc.bettypeOdds || {};
	var dxfBettypeOdds = dxf.bettypeOdds || {};

$out+='\r\n	<div>\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">主队让分<span class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+=' ml10">';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(sf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12">非让分</td>\r\n						';
 if (sf) { 
$out+='\r\n							<td recommend="F">客胜<br/><span>';
$out+=$escape(sfBettypeOdds['F']);
$out+='</span></td>\r\n							<td recommend="S">主胜<br/><span>';
$out+=$escape(sfBettypeOdds['S']);
$out+='</span></td>\r\n						';
 } else { 
$out+='\r\n							<td colspan="2"><span>未开售</span></td>\r\n						';
 } 
$out+='\r\n					</tr>\r\n					</table>\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color60 size12">让分</td>\r\n						<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n						<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">预设总分<span class="color_red ml10">';
$out+=$escape(dxf.concede);
$out+='</span></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12">大小分</td>\r\n						<td recommend="D">大分<br/><span>';
$out+=$escape(dxfBettypeOdds['D']);
$out+='</span></td>\r\n						<td recommend="X">小分<br/><span>';
$out+=$escape(dxfBettypeOdds['X']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">胜分差</span> \r\n				<span class="arrow arrow_up hide"></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
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
}).call(templateUtils,$data).toString()}});