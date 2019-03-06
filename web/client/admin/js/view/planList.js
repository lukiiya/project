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
})();exports.content=content;exports.planList=planList;exports.matchList=matchList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">方案列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box">\r\n			<div>\r\n				<input class="input_field" placeholder="方案人" id="userName">\r\n				<input class="input_field ml20" placeholder="方案ID" id="planId">\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option value="">全部</option>\r\n						<option value="0">下架</option>\r\n						<option value="1">上架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="prizeStatus">\r\n						<option value="">全部</option>\r\n						<option value="0">未开奖</option>\r\n						<option value="1">已中奖</option>\r\n						<option value="2">未中奖</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="rich">\r\n						<option value="">全部</option>\r\n						<option value="0">普单</option>\r\n						<option value="1">豪单</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="matchType">\r\n						<option value="0">全部</option>\r\n						<option value="1">足球</option>\r\n						<option value="2">篮球</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n			</div>\r\n		</div>\r\n		<div class="search_box mt10">\r\n			<div>\r\n				<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n				<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">	\r\n			</div>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="70">方案ID</th>\r\n					<th width="50">豪单</th>\r\n					<th width="300">比赛</th>\r\n					<th width="60">金额</th>\r\n					<th width="60">中奖状态</th>\r\n					<th width="60">盈利率</th>\r\n					<th width="60">推荐比赛</th>\r\n					<th width="60">推荐图片</th>\r\n					<th width="60">推荐详情</th>\r\n					<th width="60">上下架</th>\r\n					<th width="50">阅读数</th>\r\n					<th width="50">点赞数</th>\r\n					<th width="50">鄙视数</th>\r\n					<th width="50">分享数</th>\r\n					<th width="140">时间</th>\r\n					<th width="160">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="planList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planId=$data.planId,nickName=$data.nickName,realName=$data.realName,amount=$data.amount,prizeStatus=$data.prizeStatus,prizeMap=$data.prizeMap,costAmount=$data.costAmount,prizeAmount=$data.prizeAmount,prizeRate=$data.prizeRate,$=$data.$,g=$data.g,publish=$data.publish,publishMap=$data.publishMap,readCount=$data.readCount,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,createTime=$data.createTime,content=$data.content,resourceList=$data.resourceList,rich=$data.rich,matchType=$data.matchType,matchList=$data.matchList,planMatch=$data.planMatch,match=$data.match,away=$data.away,home=$data.home,league=$data.league,beginTime=$data.beginTime,d=$data.d,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planId = plan.planId;
	var nickName = plan.nickName;
	var realName = plan.realName;
	var amount = plan.amount/100;
	var prizeStatus = plan.prizeStatus || 0;
	var prizeMap = {'0': '未开奖', '1': '已中奖', '2': '未中奖'};
	var costAmount = plan.costAmount || 0;
	var prizeAmount = plan.prizeAmount || 0;
	var prizeRate = '';
	if (prizeStatus == 1 || prizeStatus == 2) {
		if(costAmount != 0) {
			prizeRate = (((prizeAmount-costAmount)*100)/costAmount).toFixed(2) + '';//转变成字符串
			prizeRate = prizeRate.replace(/\.0+$/g, '');//删除末尾是.00；
			prizeRate = prizeRate + '%';
		}
			
	}
	var publish = plan.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var readCount = plan.readCount;
	var upCount = plan.upCount;
	var downCount = plan.downCount;
	var shareCount = plan.shareCount;
	var createTime = plan.createTime;
	var content = plan.content;
	var resourceList = plan.resourceList || [];
	resourceList = resourceList.join('|');
	var rich = plan.rich; //1：豪单，0：普单
	var matchType = plan.matchType;
	var matchList = plan.matchList;
	var planMatch = '';
	if (matchList) {
		var match = matchList[0] || {};
		var away = match.away;
		var home = match.home;
		if (matchType == 2) {
			away = match.home;
			home = match.away;
		}
		var league = match.league;
		var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/ ,"$1") || "";
		planMatch = "["+league+"] "+home+" vs "+away+"("+beginTime+")";
	}

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(planId);
$out+='</td>\r\n		<td>';
$out+=$escape(rich==1?'是':'否');
$out+='</td>\r\n		<td title="';
$out+=$escape(planMatch);
$out+='">';
$out+=$escape(planMatch);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(prizeMap[prizeStatus]);
$out+='</td>\r\n		<td>';
$out+=$escape(prizeRate);
$out+='</td>\r\n		<td>\r\n			';
 if (matchList) { 
$out+='\r\n			<a class="examine" planId="';
$out+=$escape(planId);
$out+='" matchList matchType="';
$out+=$escape(matchType);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td>\r\n			';
 if (resourceList) { 
$out+='\r\n			<a class="examine" resourceList="';
$out+=$escape(resourceList);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td> \r\n			';
 if (content) { 
$out+='\r\n			<a class="examine" content="';
$out+=$escape(content);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>';
$out+=$escape(readCount);
$out+='</td>\r\n		<td>';
$out+=$escape(upCount);
$out+='</td>\r\n		<td>';
$out+=$escape(downCount);
$out+='</td>\r\n		<td>';
$out+=$escape(shareCount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine richPlan" planId="';
$out+=$escape(planId);
$out+='" rich="';
$out+=$escape(rich==0?1:0);
$out+='">';
$out+=$escape(rich==0?'设置豪单':'取消豪单');
$out+='</a>\r\n			<a class="examine publishPlan ml10" planId="';
$out+=$escape(planId);
$out+='" publish="';
$out+=$escape(publish==1?0:1);
$out+='">';
$out+=$escape(publish==1?'下架':'上架');
$out+='</a>\r\n			<a class="examine deletePlan ml10" planId="';
$out+=$escape(planId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n	\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,matchLength=$data.matchLength,matchList=$data.matchList,i=$data.i,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$escape=$helpers.$escape,matchType=$data.matchType,$string=$helpers.$string,name=$data.name,$out=''; 
		var matchLength = matchList.length;
		for (var i = 0; i < matchLength; i++) {
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
			var number = match.number || "";
		
$out+='\r\n		<div class="matchCon_box">\r\n			<div class="matchCon_wrap">\r\n				<div class="matchCon clearfix">\r\n					<span class="match_name" style="';
$out+=$escape(matchType == 2 ? 'color:#003cff;' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n					<div class="match_time">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n				</div>\r\n				<div class="ui-flex color3">\r\n					<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n					 ';
 if (match.result) { 
$out+='\r\n						';
 if (bettypeContent == "BQC") { 
$out+='\r\n						<span class="score">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n						';
 } else { 
$out+='\r\n						<span class="score">';
$out+=$escape(match.result);
$out+='</span>\r\n						';
 } 
$out+='\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+=' \r\n					<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+='</div>\r\n				</div>\r\n			';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n				<div class="ui-flex flex_wrap pl40">\r\n					<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "RFSF" || bettypeContent == "SF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n					';
 if (bettypeContent == "RFSF") { 
$out+='\r\n						<div class="textBar ui-flex_item ml10" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					';
 } 
$out+='\r\n					<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n					<div class="textBar ui-flex_item ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n					';
 } 
$out+='\r\n					';
 
					if (prize.length <= 0) {
						for (var name in bettypeResult) {
							if (!bettypeResult[name]) {
								continue;
							}
					
$out+='\r\n						<div class="textBar ui-flex_item ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="icon_result"></span></div>	\r\n					';

						}
					}
					
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});