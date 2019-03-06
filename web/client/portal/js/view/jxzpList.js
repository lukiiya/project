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
})();exports.content=content;exports.jxzpList=jxzpList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content-top mb10">\r\n		<div class="apple-tab" id="tabBox" style="width:180px">\r\n			<span class="win winl" type="1">胜平负</span>\r\n			<span class="win" type="2">输赢盘</span>\r\n			<span class="win winr" type="3">大小球</span>\r\n		</div>\r\n	</div>\r\n	<ul class="wonbox" id="jxzpList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,jxzp=$data.jxzp,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,result=$data.result,concede=$data.concede,matchBeginTime=$data.matchBeginTime,bettypeOdds=$data.bettypeOdds,recommend=$data.recommend,recommendMap=$data.recommendMap,j=$data.j,len=$data.len,bettypeResult=$data.bettypeResult,temp=$data.temp,d=$data.d,month=$data.month,day=$data.day,time=$data.time,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var jxzp = list[i] || {};
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away;
	var result = jxzp.result;
	var concede = jxzp.concede;
	var matchBeginTime = jxzp.matchBeginTime || "";
	var bettypeOdds = jxzp.bettypeOdds || {};
	var recommend = jxzp.recommend || [];
	var recommendMap = {};
	for (var j = 0, len = recommend.length; j < len; j++) {
		recommendMap[recommend[j]] = true;
	}
	var bettypeResult = jxzp.bettypeResult || {};
	var temp = matchBeginTime.match(/\d{4}-(\d{2})-(\d{2}) (\d{2}:\d{2}):\d{2}/);
	var month = "";
	var day = "";
	var time = "";
	if (temp && temp.length == 4) {
		month = temp[1];
		day = temp[2];
		time = temp[3];
	}
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = +jxzp.recentContinue;
	var historyContinue = +jxzp.historyContinue;

$out+='\r\n<li class="jx-box">\r\n	<div class="jx-box-top">\r\n		<div class="top-title">\r\n			<span class="ellipsis">';
$out+=$escape(teamName);
$out+='</span>\r\n		</div>\r\n		';
 if (recentContinue > historyContinue) { 
$out+='\r\n		<div class="hisImg">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+='history.png" alt="">\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="winOver">\r\n			<div class="fang">\r\n				<span class="winTitle">近期';
$out+=$escape(statusMap[type][status]);
$out+='</span>\r\n			</div>\r\n			<div class="winNum">\r\n				';
$out+=$escape(recentContinue);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="historyTop">\r\n			<div class="fang">\r\n				<span>历史最高</span>\r\n			</div>\r\n			<div class="historyNum">\r\n				';
$out+=$escape(historyContinue);
$out+='\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="jx-box-center clearfix:after clearfix">\r\n		追盘推荐：\r\n	</div>\r\n	<div class="jx-box-bottom">\r\n		<div class="left">\r\n			<span>';
$out+=$escape(league);
$out+='</span>\r\n			<span class="color3">';
$out+=$escape(time);
$out+='</span>\r\n			<span>';
$out+=$escape(month);
$out+='/';
$out+=$escape(day);
$out+='</span>\r\n		</div>\r\n		';
 if (type == 1 || type == 2) { 
$out+='\r\n		<div class="right">\r\n			<div class="right-son ';
$out+=$escape(recommendMap['S']?'active':'');
$out+=' ';
$out+=$escape(bettypeResult['S']?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(home);
$out+='</span>\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						主胜';
$out+=$escape(bettypeOdds['S']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="right-son ';
$out+=$escape(recommendMap['P']?'active':'');
$out+='  ';
$out+=$escape(bettypeResult['P']?'active_img':'');
$out+='">\r\n				';
 if (result) { 
$out+='\r\n					<span class="color_red">';
$out+=$escape(result);
$out+='</span>\r\n				';
 } else { 
$out+='\r\n					<span class="colorb1">VS</span>\r\n				';
 } 
$out+='\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						平局';
$out+=$escape(bettypeOdds['P']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="right-son ';
$out+=$escape(recommendMap['F']?'active':'');
$out+='  ';
$out+=$escape(bettypeResult['F']?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(away);
$out+='</span>\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						客胜';
$out+=$escape(bettypeOdds['F']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="parcircle">\r\n			<span>';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n		</div>\r\n		';
 } else { 
$out+='\r\n		<div class="right">\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[0]]?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(home);
$out+='</span>\r\n				<div class="right-son-box">\r\n					';
 if (recommend[0]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[0]+'球 '+bettypeOdds[recommend[0]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[1]]?'active_img':'');
$out+='">\r\n				';
 if (result) { 
$out+='\r\n					<span class="color_red">';
$out+=$escape(result);
$out+='</span>\r\n				';
 } else { 
$out+='\r\n					<span class="colorb1">VS</span>\r\n				';
 } 
$out+='\r\n				<div class="right-son-box">\r\n					';
 if (recommend[1]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[1]+'球 '+bettypeOdds[recommend[1]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[2]]?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(away);
$out+='</span>\r\n				<div class="right-son-box">\r\n					';
 if (recommend[2]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[2]+'球 '+bettypeOdds[recommend[2]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n		</div>	\r\n		';
 } 
$out+='\r\n	</div>\r\n</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});