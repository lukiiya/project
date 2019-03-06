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
})();exports.content=content;exports.ticketOrderList=ticketOrderList;exports.modifyTicketPrizeAmount=modifyTicketPrizeAmount;exports.matchList=matchList;exports.guessList=guessList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">出票订单</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="购买人" id="userName">\r\n					<input class="input_field ml20" placeholder="出票人" id="ticketUserName">\r\n					<input class="input_field ml20" placeholder="方案编号" id="orderNumeric">\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n				</div>\r\n				<div class="mt20">\r\n					<span class="select_box">\r\n						<select id="lotteryId">\r\n							<option value="">彩种类型(全部)</option>\r\n							<option value="SSQ">双色球</option>\r\n							<option value="DLT">大乐透</option>\r\n							<option value="JSK3">江苏快3</option>\r\n							<option value="GX11X5">广西11选5</option>\r\n							<option value="FC3D">福彩3D</option>\r\n							<option value="JCZQ">竞彩足球</option>\r\n							<option value="JCLQ">竞彩篮球</option>\r\n							<option value="JZYP">竞足亚盘</option>\r\n							<option value="SJBGJ">世界杯冠军</option>\r\n							<option value="SJBGYJ">世界杯冠亚军</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="status">\r\n							<option value="0">订单状态(全部)</option>\r\n							<option value="1">未付款</option>\r\n							<option selected="selected" value="2">已付款</option>\r\n							<option value="3">已退款</option>\r\n							<option value="4">部分退款</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketStatus">\r\n							<option value="">出票状态(全部)</option>\r\n							<option value="0">未出票</option>\r\n							<option value="1">出票失败</option>\r\n							<option value="2">已出票待开奖</option>\r\n							<option value="3">未中奖</option>\r\n							<option value="4">已中奖</option>\r\n							<option value="5">已派奖</option>\r\n							<option value="6">部分派奖</option>\r\n							<option value="7">出票中</option>\r\n							<option value="8">部分出票</option>\r\n							<option value="9">待开售</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketPrizeDivideStatus">\r\n							<option value="">中奖分成状态(全部)</option>\r\n							<option value="0">不分成</option>\r\n							<option value="1">待分成</option>\r\n							<option value="2">已分成</option>\r\n							<option value="3">未分成</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketAttachPrizeStatus">\r\n							<option value="">加奖状态(全部)</option>\r\n							<option value="0">不加奖</option>\r\n							<option value="1">待加奖</option>\r\n							<option value="2">已加奖</option>\r\n							<option value="3">未加奖</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketPrizeVerifyStatus">\r\n							<option value="">中奖审核(全部)</option>\r\n							<option value="0">不审核</option>\r\n							<option value="1">待审核</option>\r\n							<option value="2">已审核</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="source">\r\n							<option value="">来源(全部)</option>\r\n							<option value="0">h5</option>\r\n							<option value="1">android</option>\r\n							<option value="2">ios</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="channel"></select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<input class="input_field ml20" placeholder="期号" id="issue">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置">\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="50">彩种</th>\r\n					<th width="50">期号</th>\r\n					<th width="100">下单人</th>\r\n					<th width="90">出票人</th>\r\n					<th width="50">订单状态</th>\r\n					<th width="50">订单ID</th>\r\n					<th width="40">倍数</th>\r\n					<th width="50">购买金额</th>\r\n					<th width="50">已派金额</th>\r\n					<th width="50">预派金额</th>\r\n					<th width="50">中奖金额</th>\r\n					<th width="50">加奖金额</th>\r\n					<th width="50">过关方式</th>\r\n					<th width="70">出票状态</th>\r\n					<th width="30">票样</th>\r\n					<th width="30">内容</th>\r\n					<th width="50">来源</th>\r\n					<th width="100">时间</th>\r\n					<!-- <th width="120">操作</th> -->\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ticketOrderList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,orderId=$data.orderId,nickName=$data.nickName,realName=$data.realName,issue=$data.issue,lotteryName=$data.lotteryName,planMatchType=$data.planMatchType,ticketNickName=$data.ticketNickName,ticketRealName=$data.ticketRealName,userName=$data.userName,tickeUserName=$data.tickeUserName,orderNumeric=$data.orderNumeric,status=$data.status,statusMap=$data.statusMap,ticketMultiple=$data.ticketMultiple,amount=$data.amount,prizeWarn=$data.prizeWarn,ticketPrizeAmount=$data.ticketPrizeAmount,ticketExpectPrizeAmount=$data.ticketExpectPrizeAmount,absAmount=$data.absAmount,Math=$data.Math,ticketSendPrizeAmount=$data.ticketSendPrizeAmount,ticketAttachPrizeAmount=$data.ticketAttachPrizeAmount,ticketStatus=$data.ticketStatus,ticketStatusMap=$data.ticketStatusMap,ticketSupplierId=$data.ticketSupplierId,ticketSupplierName=$data.ticketSupplierName,resourceList=$data.resourceList,matchList=$data.matchList,ticketPassType=$data.ticketPassType,source=$data.source,sourceMap=$data.sourceMap,createTime=$data.createTime,$escape=$helpers.$escape,$string=$helpers.$string,totalAmount=$data.totalAmount,totalTicketSendPrizeAmount=$data.totalTicketSendPrizeAmount,totalTicketExpectPrizeAmount=$data.totalTicketExpectPrizeAmount,totalTicketPrizeAmount=$data.totalTicketPrizeAmount,totalTicketAttachPrizeAmount=$data.totalTicketAttachPrizeAmount,$out=''; var length = list.length;
	for(var i = 0; i < length; i++) {
		var order = list[i] || {};
		var orderId = order.orderId;
		var nickName = order.nickName;
		var realName = order.realName;
		var issue = order.issue;
		var lotteryName = order.lotteryName;
		var planMatchType = order.planMatchType;
		if (!lotteryName) {
			if (planMatchType == 1) {
				lotteryName = '竞彩足球';
			} else if (planMatchType == 2) {
				lotteryName = '竞彩篮球';
			}
		}
		var ticketNickName = order.ticketNickName;
		var ticketRealName = order.ticketRealName;
		var userName = nickName;
		if (realName != '') {
			userName += '('+realName+')';
		}
		var tickeUserName = ticketNickName;
		if (ticketRealName != '') {
			tickeUserName += '('+ticketRealName+')';
		}
		var orderNumeric = order.orderNumeric;
		var status = order.status;
		var statusMap = {'1': '未付款', '2': '已付款', '3': '已退款', '4': '部分退款'};
		var ticketMultiple = order.ticketMultiple;
		var amount = order.amount/100;
		var prizeWarn = false;
		var ticketPrizeAmount = order.ticketPrizeAmount;
		var ticketExpectPrizeAmount = order.ticketExpectPrizeAmount;
		if (ticketExpectPrizeAmount > 0) {
			//绝对值金额，用在奖金相差20%就告警
			var absAmount = Math.abs(ticketExpectPrizeAmount - ticketPrizeAmount);
			prizeWarn = absAmount >= ticketPrizeAmount * 0.2;
		}
		ticketPrizeAmount = order.ticketPrizeAmount/100;
		ticketExpectPrizeAmount = order.ticketExpectPrizeAmount/100;
		var ticketSendPrizeAmount = order.ticketSendPrizeAmount;
		ticketSendPrizeAmount = order.ticketSendPrizeAmount/100;
		ticketAttachPrizeAmount = order.ticketAttachPrizeAmount/100;
		var ticketStatus =  order.ticketStatus;
		var ticketStatusMap = {'0': '未出票', '1': '出票失败', '2': '已出票待开奖', '3': '未中奖', '4': '已中奖', '5': '已派奖', '6': '部分派奖', '7': '出票中', '8': '部分出票', '9': '待开售'};
		var ticketSupplierId = order.ticketSupplierId || 0;
		var ticketSupplierName = order.ticketSupplierName || '';
		if (ticketSupplierId > 0) {
			tickeUserName = ticketSupplierName+'(电子票)';
		}
		var resourceList = order.resourceList;
		resourceList = resourceList.join('|');
		var matchList = order.matchList || [];
		var ticketPassType = order.ticketPassType;
		var source = order.source;
		var sourceMap = {'0': 'h5','1': 'android','2': 'ios'};
		var createTime = order.createTime || "";

$out+='\r\n<tr>\r\n	<td>';
$out+=$escape(lotteryName);
$out+='</td>\r\n	<td>';
$out+=$escape(issue);
$out+='</td>\r\n	<td>';
$out+=$escape(userName);
$out+='</td>\r\n	<td>';
$out+=$escape(tickeUserName);
$out+='</td>\r\n	<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n	<td>';
$out+=$escape(orderId);
$out+='</td>\r\n	<td>';
$out+=$escape(ticketMultiple);
$out+='</td>\r\n	<td>';
$out+=$escape(amount);
$out+='</td>\r\n	<td>';
$out+=$escape(ticketSendPrizeAmount);
$out+='</td>\r\n	<td ';
$out+=$string(prizeWarn?'style="font-weight:bold;color:#ff0000;" title="预计中奖金额和中奖金额相差较大"':'');
$out+='>';
$out+=$escape(ticketExpectPrizeAmount);
$out+='</td>\r\n	<td ';
$out+=$string(prizeWarn?'style="font-weight:bold;color:#ff0000;" title="预计中奖金额和中奖金额相差较大"':'');
$out+='>';
$out+=$escape(ticketPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(ticketAttachPrizeAmount);
$out+='</td>\r\n	<td title="';
$out+=$escape(ticketPassType);
$out+='">';
$out+=$escape(ticketPassType);
$out+='</td>\r\n	<td>';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='</td>\r\n	<td>\r\n		';
 if(resourceList) { 
$out+='\r\n			<a class="examine" resourceList="';
$out+=$escape(resourceList);
$out+='">查看</a>\r\n		';
 } else if(ticketSupplierId > 0) { 
$out+='\r\n			<a class="examine" href="#ticketList&orderId=';
$out+=$escape(orderId);
$out+='">查看</a>\r\n		';
 } 
$out+='\r\n	</td>\r\n	<td><a class="examine" orderId="';
$out+=$escape(orderId);
$out+='" showFormat>查看</a></td>\r\n	<td>';
$out+=$escape(sourceMap[source]);
$out+='</td>\r\n	<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	<!-- <td>\r\n		';
 if (status == 2 && ticketStatus==1 && amount > 0) { 
$out+='\r\n		<a class="examine mr10 refundTicket" orderId="';
$out+=$escape(orderId);
$out+='" userName="';
$out+=$escape(userName);
$out+='" amount="';
$out+=$escape(amount);
$out+='">退款</a>\r\n		';
 } 
$out+='\r\n		';
 if (status == 2 && ticketStatus==4 && ticketPrizeAmount > 0) { 
$out+='\r\n		<a class="examine mr10 modifyTicketPrizeAmount" orderId="';
$out+=$escape(orderId);
$out+='" userName="';
$out+=$escape(userName);
$out+='">修改中奖金额</a>\r\n		<a class="examine mr10 sendTicketPrize" orderId="';
$out+=$escape(orderId);
$out+='" userName="';
$out+=$escape(userName);
$out+='" ticketPrizeAmount="';
$out+=$escape(ticketPrizeAmount);
$out+='">派奖</a>		\r\n		';
 } 
$out+='\r\n	</td> -->\r\n</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) {
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(totalTicketSendPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(totalTicketExpectPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(totalTicketPrizeAmount);
$out+='</td>\r\n	<td>';
$out+=$escape(totalTicketAttachPrizeAmount);
$out+='</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<!-- <td></td> -->\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function modifyTicketPrizeAmount($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,orderId=$data.orderId,$out='';$out+='<h1>修改 “';
$out+=$escape(userName);
$out+='” 的中奖金额</h1>\r\n	<input type="hidden" id="modifyTicketPrizeAmountOrderId" value="';
$out+=$escape(orderId);
$out+='"/>\r\n	<div class="mt20">中奖金额：<input class="input_field ml5" placeholder="请输入中奖金额" id="ticketPrizeAmount"/></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelModifyTicketPrizeAmount"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyTicketPrizeAmount"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,matchLength=$data.matchLength,matchList=$data.matchList,i=$data.i,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$escape=$helpers.$escape,planMatchType=$data.planMatchType,$string=$helpers.$string,name=$data.name,$out=''; 
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
$out+=$escape(planMatchType == 2 ? 'color:#003cff;' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n				<div class="match_time">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<div class="ui-flex color3">\r\n				<div class="ui-flex_item ellipsis">';
$out+=$string(planMatchType == 2 ? match.away : match.home);
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
$out+=$string(planMatchType == 2 ? match.home : match.away);
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
}).call(templateUtils,$data).toString()}function guessList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,guessList=$data.guessList,i=$data.i,match=$data.match,oddsId=$data.oddsId,odds=$data.odds,team=$data.team,lotteryId=$data.lotteryId,$escape=$helpers.$escape,$out='';$out+='<div class="matchCon_box">\r\n		<div class="ui-flex worldcup_selected color3">\r\n		';
 
			var length = guessList.length;
			for (var i = 0; i < length; i++) { 
				var match = guessList[i] || {};
				var oddsId = match.oddsId || 0;
				var odds = match.odds;
				var team = match.team;
				var lotteryId = match.lotteryId;
		
$out+='\r\n			';
 if (lotteryId　==　'SJBGJ' && length > 1) { 
$out+='\r\n				<div class="textBar gj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n			';
 } else if (lotteryId　==　'SJBGYJ') { 
$out+='\r\n				<div class="textBar gyj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n			';
 } else { 
$out+='\r\n				<div class="textBar ui-flex_item ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n			';
 } 
$out+='\r\n		';
 } 
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});