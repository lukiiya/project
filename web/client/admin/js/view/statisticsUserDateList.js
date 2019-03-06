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
})();exports.content=content;exports.statisticsUserDateList=statisticsUserDateList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">专家统计</h1>\r\n<div class="list_box">\r\n	<div>\r\n		<form onsubmit="return false;">\r\n			<div class="search_box">\r\n				<label for="planPrizeRateRank">\r\n					盈利率排名：\r\n					<input type="checkbox" id="planPrizeRateRank">\r\n				</label>\r\n			</div>\r\n			<div id="searchBox">\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<div class="sel_box ml20" id="dateType">\r\n						<span>日期格式:</span>\r\n						<label for="day" class="ml10">\r\n							<span>日</span>\r\n							<input type="radio" name="dateType" id="day" value="1">\r\n						</label>\r\n						<label for="month" class="ml10">\r\n							<span>月</span>\r\n							<input type="radio" name="dateType" id="month" value="2">\r\n						</label>\r\n					</div>\r\n					<input class="btn ml20" type="reset" value="重置" id="reset"/>\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n				<div class="search_box mt20" id="search_day"  style="display: none">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime"/>\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime"/>\r\n				</div>	\r\n				<div class="search_box mt20" id="search_month" style="display: none">\r\n					<div class="sel_box">\r\n						<span>开始年份:</span>\r\n						<span class="select_box">\r\n							<select id="beginYear">\r\n								<option value="">请选择</option>\r\n								<option value="2016">2016</option>\r\n								<option value="2017">2017</option>\r\n								<option value="2018">2018</option>\r\n								<option value="2019">2019</option>\r\n								<option value="2020">2020</option>\r\n								<option value="2021">2021</option>\r\n								<option value="2022">2022</option>\r\n								<option value="2023">2023</option>\r\n								<option value="2024">2024</option>\r\n								<option value="2025">2025</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n						<span>月份:</span>\r\n						<span class="select_box">\r\n							<select id="beginMonth">\r\n								<option value="">请选择</option>\r\n								<option value="01">1</option>\r\n								<option value="02">2</option>\r\n								<option value="03">3</option>\r\n								<option value="04">4</option>\r\n								<option value="05">5</option>\r\n								<option value="06">6</option>\r\n								<option value="07">7</option>\r\n								<option value="08">8</option>\r\n								<option value="09">9</option>\r\n								<option value="10">10</option>\r\n								<option value="11">11</option>\r\n								<option value="12">12</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n					</div>\r\n					--\r\n					<div class="sel_box">\r\n						<span>结束年份:</span>\r\n						<span class="select_box">\r\n							<select id="endYear">\r\n								<option value="">请选择</option>\r\n								<option value="2016">2016</option>\r\n								<option value="2017">2017</option>\r\n								<option value="2018">2018</option>\r\n								<option value="2019">2019</option>\r\n								<option value="2020">2020</option>\r\n								<option value="2021">2021</option>\r\n								<option value="2022">2022</option>\r\n								<option value="2023">2023</option>\r\n								<option value="2024">2024</option>\r\n								<option value="2025">2025</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n						<span>月份:</span>\r\n						<span class="select_box">\r\n							<select id="endMonth">\r\n								<option value="">请选择</option>\r\n								<option value="01">1</option>\r\n								<option value="02">2</option>\r\n								<option value="03">3</option>\r\n								<option value="04">4</option>\r\n								<option value="05">5</option>\r\n								<option value="06">6</option>\r\n								<option value="07">7</option>\r\n								<option value="08">8</option>\r\n								<option value="09">9</option>\r\n								<option value="10">10</option>\r\n								<option value="11">11</option>\r\n								<option value="12">12</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</form>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>昵称</th>\r\n					<th>姓名</th>\r\n					<th id="thDate">时间</th>\r\n					<th>场次</th>\r\n					<th>胜率</th>\r\n					<th>盈利率</th>\r\n					<th>购买数</th>\r\n					<th>购买金额</th>\r\n					<th>跟单数</th>\r\n					<th>跟单金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsUserDateList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsUserDateList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,totalPlanOrderAmount=$data.totalPlanOrderAmount,totalPlanWinRate=$data.totalPlanWinRate,$=$data.$,g=$data.g,totalPlanPrizeRate=$data.totalPlanPrizeRate,totalPlanTicketOrderAmount=$data.totalPlanTicketOrderAmount,planPrizeRateRank=$data.planPrizeRateRank,length=$data.length,list=$data.list,i=$data.i,statisticsUserDate=$data.statisticsUserDate,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,date=$data.date,planCount=$data.planCount,planOrderCount=$data.planOrderCount,planOrderAmount=$data.planOrderAmount,planWinRate=$data.planWinRate,planPrizeRate=$data.planPrizeRate,planTicketOrderCount=$data.planTicketOrderCount,planTicketOrderAmount=$data.planTicketOrderAmount,$escape=$helpers.$escape,totalPlanCount=$data.totalPlanCount,totalPlanOrderCount=$data.totalPlanOrderCount,totalPlanTicketOrderCount=$data.totalPlanTicketOrderCount,$out=''; 
	totalPlanOrderAmount = totalPlanOrderAmount/100 || 0;
	totalPlanWinRate = (+totalPlanWinRate || 0).toFixed(2) + '';//转变成字符串;
	totalPlanWinRate = totalPlanWinRate.replace(/\.0+$/g, '');//删除末尾是.00；
	totalPlanWinRate = totalPlanWinRate + '%';
	totalPlanPrizeRate = (+totalPlanPrizeRate || 0).toFixed(2) + '';//转变成字符串;
	totalPlanPrizeRate = totalPlanPrizeRate.replace(/\.0+$/g, '');//删除末尾是.00；
	totalPlanPrizeRate = totalPlanPrizeRate + '%';
	totalPlanTicketOrderAmount = totalPlanTicketOrderAmount/100 || 0;
	planPrizeRateRank = !!planPrizeRateRank;
	var length = list.length;
	for (var i = 0; i < length; i++) {
	var statisticsUserDate = list[i] || {};
	var userId = statisticsUserDate.userId || 0;
	var nickName = statisticsUserDate.nickName || '';
	var realName = statisticsUserDate.realName || '';
	var date = statisticsUserDate.date || '';
	var planCount = statisticsUserDate.planCount || 0;
	var planOrderCount = statisticsUserDate.planOrderCount || 0;
	var planOrderAmount = statisticsUserDate.planOrderAmount/100 || 0;
	var planWinRate = (+statisticsUserDate.planWinRate || 0).toFixed(2) + '';//转变成字符串;
	planWinRate = planWinRate.replace(/\.0+$/g, '');//删除末尾是.00；
	planWinRate = planWinRate + '%';
	var planPrizeRate = (+statisticsUserDate.planPrizeRate || 0).toFixed(2) + '';//转变成字符串;
	planPrizeRate = planPrizeRate.replace(/\.0+$/g, '');//删除末尾是.00；
	planPrizeRate = planPrizeRate + '%';
	var planTicketOrderCount = statisticsUserDate.planTicketOrderCount || 0;
	var planTicketOrderAmount = statisticsUserDate.planTicketOrderAmount/100 || 0;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td style="';
$out+=$escape(planPrizeRateRank?'display:none':'');
$out+='">';
$out+=$escape(date);
$out+='</td>\r\n		<td>';
$out+=$escape(planCount);
$out+='</td>\r\n		<td>';
$out+=$escape(planWinRate);
$out+='</td>\r\n		<td>';
$out+=$escape(planPrizeRate);
$out+='</td>\r\n		<td>';
$out+=$escape(planOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(planOrderAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(planTicketOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(planTicketOrderAmount);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='\r\n		<tr>\r\n			<td>总计</td>\r\n			<td></td>\r\n			<td style="';
$out+=$escape(planPrizeRateRank?'display:none':'');
$out+='"></td>\r\n			<td>';
$out+=$escape(totalPlanCount);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanWinRate);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanPrizeRate);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanOrderCount);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanOrderAmount);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanTicketOrderCount);
$out+='</td>\r\n			<td>';
$out+=$escape(totalPlanTicketOrderAmount);
$out+='</td>\r\n		</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});