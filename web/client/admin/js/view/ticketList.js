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
})();exports.content=content;exports.ticketList=ticketList;exports.matchList=matchList;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$out='';$out+='<h1 class="title">出票列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="期号" id="issue"/>\r\n					<span class="select_box ml20">\r\n						<select id="lotteryId">\r\n							<option value="">全部</option>\r\n							<option value="SSQ">双色球</option>\r\n							<option value="DLT">大乐透</option>\r\n							<option value="JSK3">江苏快3</option>\r\n							<option value="GX11X5">广西11选5</option>\r\n							<option value="FC3D">福彩3D</option>\r\n							<option value="JZSPF">竞足胜平负</option>\r\n							<option value="JZRQSPF">竞足让球胜平负</option>\r\n							<option value="JZBF">竞足比分</option>\r\n							<option value="JZZJQ">竞足总进球</option>\r\n							<option value="JZBQC">竞足半全场</option>\r\n							<option value="JZHHGG">竞足混合过关</option>\r\n							<option value="JLSF">竞篮胜负</option>\r\n							<option value="JLRFSF">竞篮让分胜负</option>\r\n							<option value="JLSFC">竞篮胜分差</option>\r\n							<option value="JLDXF">竞篮大小分</option>\r\n							<option value="JLHHGG">竞篮混合过关</option>\r\n							<option value="SJBGJ">世界杯冠军</option>\r\n							<option value="SJBGYJ">世界杯冠亚军</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="status">\r\n							<option value="">全部</option>\r\n							<option value="0">未出票</option>\r\n							<option value="1">出票失败</option>\r\n							<option value="2">已出票待开奖</option>\r\n							<option value="3">未中奖</option>\r\n							<option value="4">已中奖</option>\r\n							<option value="5">已撤单</option>\r\n							<option value="-1">已出票待开奖+未中奖+已中奖</option>\r\n							<option value="-2">未出票+出票失败+已撤单</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="供应商" id="supplierName"/>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="订单id" id="orderId"/>\r\n					<input class="input_field ml20" placeholder="票id" id="ticketId"/>\r\n					<input class="input_field ml20" placeholder="平台id" id="platformId"/>\r\n					<input class="input_field ml20" placeholder="出票编号" id="printNo"/>\r\n				</div>\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime"/>\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime"/>\r\n					<input class="btn ml20" type="reset" value="重置"/>\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">期号</th>\r\n					<th width="80">彩种</th>\r\n					<th width="80">状态</th>\r\n					<th width="40">注数</th>\r\n					<th width="40">倍数</th>\r\n					<th width="80">金额</th>\r\n					<th width="40">内容</th>\r\n					<th width="80">奖金</th>\r\n					<th width="80">税前奖金</th>\r\n					<th width="140">用户</th>\r\n					<th width="90">供应商</th>\r\n					<th width="60">订单id</th>\r\n					<th width="60">票id</th>\r\n					<th width="60">平台id</th>\r\n					<th width="60">出票编码</th>\r\n					<th width="130">出票时间</th>\r\n					<th width="130">创建时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ticketList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ticketList($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,ticket=$data.ticket,ticketId=$data.ticketId,orderId=$data.orderId,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,supplierName=$data.supplierName,lotteryId=$data.lotteryId,lotteryName=$data.lotteryName,matchTypeMap=$data.matchTypeMap,matchType=$data.matchType,status=$data.status,statusMap=$data.statusMap,unit=$data.unit,multiple=$data.multiple,amount=$data.amount,issue=$data.issue,platformId=$data.platformId,prizeAmount=$data.prizeAmount,pretaxPrizeAmount=$data.pretaxPrizeAmount,printNo=$data.printNo,printTime=$data.printTime,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,totalPrizeAmount=$data.totalPrizeAmount,totalPretaxPrizeAmount=$data.totalPretaxPrizeAmount,$out=''; var length = list.length;
	for(var i = 0; i < length; i++) {
		var ticket = list[i] || {};
		var ticketId = ticket.ticketId;
		var orderId = ticket.orderId;
		var nickName = ticket.nickName;
		var realName = ticket.realName;
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		var supplierName = ticket.supplierName;
		var lotteryId = ticket.lotteryId;
		var lotteryName = ticket.lotteryName;
		var matchTypeMap = {'JZSPF': 1, 'JZRQSPF': 1, 'JZBF': 1, 'JZZJQ': 1, 'JZBQC': 1, 'JZHHGG': 1, 'JLSF': 2, 'JLRFSF': 2, 'JLSFC': 2, 'JLDXF': 2, 'JLHHGG': 2};
		var matchType = matchTypeMap[lotteryId];	
		var status = ticket.status;
		var statusMap = {'0': '未出票', '1': '出票失败', '2': '已出票待开奖', '3': '未中奖', '4': '已中奖', '5': '已撤单'};
		var unit = ticket.unit;
		var multiple = ticket.multiple;
		var amount = ticket.amount/100;
		var issue = ticket.issue;
		var platformId = ticket.platformId;
		var prizeAmount = ticket.prizeAmount/100;
		var pretaxPrizeAmount = ticket.pretaxPrizeAmount/100;
		var printNo = ticket.printNo;
		var printTime = ticket.printTime;
		var createTime = ticket.createTime;

$out+='\r\n<tr>\r\n	<td>';
$out+=$escape(issue);
$out+='</td>\r\n	<td>';
$out+=$escape(lotteryName);
$out+='</td>\r\n	<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n	<td>';
$out+=$escape(unit);
$out+='</td>\r\n	<td>';
$out+=$escape(multiple);
$out+='</td>\r\n	<td>';
$out+=$escape(amount);
$out+='</td>\r\n	<td><a class="examine" ticketId="';
$out+=$escape(ticketId);
$out+='" matchType="';
$out+=$escape(matchType);
$out+='" showFormat>查看</a></td>\r\n	<td>';
$out+=$escape(prizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(pretaxPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(userName);
$out+='</td>\r\n	<td>';
$out+=$escape(supplierName);
$out+='</td>\r\n	<td>';
$out+=$escape(orderId);
$out+='</td>\r\n	<td>';
$out+=$escape(ticketId);
$out+='</td>\r\n	<td>';
$out+=$escape(platformId);
$out+='</td>\r\n	<td>\r\n		';
 if(printNo) { 
$out+='\r\n			<a class="examine" printNo="';
$out+=$escape(printNo);
$out+='">查看</a>\r\n		';
 } 
$out+='\r\n	</td>\r\n	<td>';
$out+=$escape(printTime);
$out+='</td>\r\n	<td>';
$out+=$escape(createTime);
$out+='</td>\r\n</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) {
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAmount);
$out+='</td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(totalPretaxPrizeAmount);
$out+='</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/*``*/) {
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
			var bettypeResult= match.bettypeResult|| {};
			var number = match.number || "";
	
$out+='\r\n	<div class="matchCon_box">\r\n		<div class="matchCon_wrap">\r\n			<div class="matchCon clearfix">\r\n				<span class="match_name" style="';
$out+=$escape(matchType == 2 ? 'color:#003cff;' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n				<div class="match_time">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<div class="ui-flex color3">\r\n				<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n				 ';
 if (match.result) { 
$out+='\r\n					';
 if (bettypeContent == "BQC") { 
$out+='\r\n					<span class="score">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n					';
 } else { 
$out+='\r\n					<span class="score">';
$out+=$escape(match.result);
$out+='</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					vs\r\n				';
 } 
$out+=' \r\n				<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+='</div>\r\n			</div>\r\n		';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n			<div class="ui-flex flex_wrap pl40">\r\n				<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平局 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n			<div class="ui-flex flex_wrap">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "RFSF" || bettypeContent == "SF") { 
$out+='\r\n			<div class="ui-flex flex_wrap">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				';
 if (bettypeContent == "RFSF") { 
$out+='\r\n					<div class="textBar ui-flex_item ml10" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n				';
 } 
$out+='\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="ui-flex flex_wrap">\r\n				';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="icon_result"></span>':"");
$out+='</div>\r\n				';
 } 
$out+='\r\n				';
 
				if (prize.length <= 0) {
					for (var name in bettypeResult) {
						if (!bettypeResult[name]) {
							continue;
						}
				
$out+='\r\n					<div class="textBar ui-flex_item ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="icon_result"></span></div>	\r\n				';

					}
				}
				
$out+='\r\n			</div>\r\n		';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});