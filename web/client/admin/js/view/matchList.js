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
})();exports.content=content;exports.matchList=matchList;exports.modifyResult=modifyResult;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">比赛列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<input class="input_field" placeholder="编号" id="number"/>\r\n		<input class="input_field ml20" placeholder="联赛" id="league"/>\r\n		<input class="input_field ml20" placeholder="主队" id="home"/>\r\n		<input class="input_field ml20" placeholder="客队" id="away"/>\r\n		<div class="mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<span class="select_box ml20">\r\n				<select id="type">\r\n					<option value="0">全部</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<label class="ml20" for="matchCancel">\r\n				已取消：\r\n				<input type="checkbox" id="matchCancel">\r\n			</label>\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">类型</th>\r\n					<th width="80">编号</th>\r\n					<th width="120">联赛</th>\r\n					<th width="120">主队</th>\r\n					<th width="120">客队</th>\r\n					<th width="120">比赛时间</th>\r\n					<th width="100">半场赛果</th>\r\n					<th width="100">全场赛果</th>\r\n					<th width="150">投注比例</th>\r\n					<th width="120">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="matchList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,match=$data.match,matchId=$data.matchId,type=$data.type,typeMap=$data.typeMap,number=$data.number,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,halfResult=$data.halfResult,result=$data.result,setResult=$data.setResult,setCancel=$data.setCancel,winBetRate=$data.winBetRate,drawBetRate=$data.drawBetRate,loseBetRate=$data.loseBetRate,betRate=$data.betRate,matchInfo=$data.matchInfo,$escape=$helpers.$escape,$out=''; 
var length = list.length;
for (var i = 0; i < length; i++) {
	var match = list[i] || {};
	var matchId = match.matchId;
	var type = match.type;
	var typeMap = {'1': '足球','2': '篮球'};
	var number = match.number;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var beginTime = match.beginTime;
	var halfResult = match.halfResult;
	var result = match.result;
	var setResult = match.setResult;
	var setCancel = match.setCancel;
	var winBetRate = match.winBetRate || '--';
	var drawBetRate = match.drawBetRate || '--';
	var loseBetRate = match.loseBetRate || '--';
	var betRate = winBetRate + '(胜),' + drawBetRate + '(平),' + loseBetRate + '(负)';
	var matchInfo = home + '(主) vs ' + away + '(客)';

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(number);
$out+='</td>\r\n		<td>';
$out+=$escape(league);
$out+='</td>\r\n		<td>';
$out+=$escape(home);
$out+='</td>\r\n		<td>';
$out+=$escape(away);
$out+='</td>\r\n		<td>';
$out+=$escape(beginTime);
$out+='</td>\r\n		<td>';
$out+=$escape(halfResult);
$out+='</td>\r\n		<td>';
$out+=$escape(result);
$out+='</td>\r\n		<td>';
$out+=$escape(betRate);
$out+='</td>\r\n		<td>\r\n			';
 if (setResult) { 
$out+='\r\n			<a class="examine setMatchResult" matchInfo="';
$out+=$escape(matchInfo);
$out+='" matchId="';
$out+=$escape(matchId);
$out+='">设置赛果</a>\r\n			';
 } 
$out+='\r\n			';
 if (setCancel) { 
$out+='\r\n			<a class="examine cancelMatch" matchInfo="';
$out+=$escape(matchInfo);
$out+='" matchId="';
$out+=$escape(matchId);
$out+='">取消比赛</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function modifyResult($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,matchInfo=$data.matchInfo,matchId=$data.matchId,$out='';$out+='<h1>';
$out+=$escape(matchInfo);
$out+='</h1>\r\n<input type="hidden" id="modifyMatchId" value="';
$out+=$escape(matchId);
$out+='"/>\r\n<div class="mt20">半场赛果：<input class="input_field ml5" placeholder="请输入半场赛果" id="modifyHalfResult"/></div>\r\n<div class="mt20">全场赛果：<input class="input_field ml5" placeholder="请输入全场赛果" id="modifyResult"/></div>\r\n<div class="mt20" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="cancelModifyResult"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="sureModifyResult"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});