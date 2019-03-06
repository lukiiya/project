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
})();exports.content=content;exports.statisticsDateList=statisticsDateList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">日期统计</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n				<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt10">\r\n		<style type="text/css">\r\n			.rightBox table th {\r\n				line-height: 20px;\r\n				vertical-align: middle;	\r\n			}\r\n		</style>\r\n		<table>\r\n			<thead>\r\n				<tr style="white-space: normal;">\r\n					<th width="80">日期</th>\r\n					<th width="100">方案数量<br>当天(截止)</th>\r\n					<th width="280">当天(截止)用户数量<br>总 | 手机 | 消费 | 现金消费</th>\r\n					<th width="280">当天(截止)订单数量<br>总 = 方案 + 充值 + 极限追盘</th>\r\n					<th width="330">当天(截止)订单金额<br>总 = 方案 + 充值 + 极限追盘</th>\r\n					<th width="280">当天(截止)消费数量<br>总 = 现金 + 充值 + 收益</th>\r\n					<th width="330">当天(截止)消费金额<br>总 = 现金 + 充值 + 收益</th>\r\n					<th width="280">当天(截止)充值数量<br>总 = 用户 + 平台</th>\r\n					<th width="300">当天(截止)充值金额<br>总 = 用户 + 平台</th>\r\n					<th width="280">当天(截止)收益数量<br>总 = 推荐 + 推广</th>\r\n					<th width="300">当天(截止)收益金额<br>总 = 推荐 + 推广</th>\r\n					<!-- <th width="85">平台收益数量<br>当天(截止)</th>\r\n					<th width="85">平台收益金额<br>当天(截止)</th> -->\r\n					<th width="120">当天(截止)提款数量<br>待提款 | 已提款</th>\r\n					<th width="120">当天(截止)提款金额<br>待提款 | 已提款</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsDateList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsDateList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,statisticsDate=$data.statisticsDate,date=$data.date,userCount=$data.userCount,mobileUserCount=$data.mobileUserCount,consumeUserCount=$data.consumeUserCount,cashConsumeUserCount=$data.cashConsumeUserCount,planCount=$data.planCount,orderCount=$data.orderCount,orderAmount=$data.orderAmount,planOrderCount=$data.planOrderCount,planOrderAmount=$data.planOrderAmount,chargeOrderCount=$data.chargeOrderCount,chargeOrderAmount=$data.chargeOrderAmount,jxzpOrderCount=$data.jxzpOrderCount,jxzpOrderAmount=$data.jxzpOrderAmount,consumeCount=$data.consumeCount,consumeAmount=$data.consumeAmount,cashConsumeCount=$data.cashConsumeCount,cashConsumeAmount=$data.cashConsumeAmount,chargeConsumeCount=$data.chargeConsumeCount,chargeConsumeAmount=$data.chargeConsumeAmount,incomeConsumeCount=$data.incomeConsumeCount,incomeConsumeAmount=$data.incomeConsumeAmount,incomeCount=$data.incomeCount,incomeAmount=$data.incomeAmount,recommendIncomeCount=$data.recommendIncomeCount,recommendIncomeAmount=$data.recommendIncomeAmount,spreadIncomeCount=$data.spreadIncomeCount,spreadIncomeAmount=$data.spreadIncomeAmount,chargeCount=$data.chargeCount,chargeAmount=$data.chargeAmount,userChargeCount=$data.userChargeCount,userChargeAmount=$data.userChargeAmount,platformChargeCount=$data.platformChargeCount,platformChargeAmount=$data.platformChargeAmount,withdrawingCount=$data.withdrawingCount,withdrawingAmount=$data.withdrawingAmount,withdrewCount=$data.withdrewCount,withdrewAmount=$data.withdrewAmount,userCountEnd=$data.userCountEnd,mobileUserCountEnd=$data.mobileUserCountEnd,consumeUserCountEnd=$data.consumeUserCountEnd,cashConsumeUserCountEnd=$data.cashConsumeUserCountEnd,planCountEnd=$data.planCountEnd,orderCountEnd=$data.orderCountEnd,orderAmountEnd=$data.orderAmountEnd,planOrderCountEnd=$data.planOrderCountEnd,planOrderAmountEnd=$data.planOrderAmountEnd,chargeOrderCountEnd=$data.chargeOrderCountEnd,chargeOrderAmountEnd=$data.chargeOrderAmountEnd,jxzpOrderCountEnd=$data.jxzpOrderCountEnd,jxzpOrderAmountEnd=$data.jxzpOrderAmountEnd,consumeCountEnd=$data.consumeCountEnd,consumeAmountEnd=$data.consumeAmountEnd,cashConsumeCountEnd=$data.cashConsumeCountEnd,cashConsumeAmountEnd=$data.cashConsumeAmountEnd,chargeConsumeCountEnd=$data.chargeConsumeCountEnd,chargeConsumeAmountEnd=$data.chargeConsumeAmountEnd,incomeConsumeCountEnd=$data.incomeConsumeCountEnd,incomeConsumeAmountEnd=$data.incomeConsumeAmountEnd,incomeCountEnd=$data.incomeCountEnd,incomeAmountEnd=$data.incomeAmountEnd,recommendIncomeCountEnd=$data.recommendIncomeCountEnd,recommendIncomeAmountEnd=$data.recommendIncomeAmountEnd,spreadIncomeCountEnd=$data.spreadIncomeCountEnd,spreadIncomeAmountEnd=$data.spreadIncomeAmountEnd,chargeCountEnd=$data.chargeCountEnd,chargeAmountEnd=$data.chargeAmountEnd,userChargeCountEnd=$data.userChargeCountEnd,userChargeAmountEnd=$data.userChargeAmountEnd,platformChargeCountEnd=$data.platformChargeCountEnd,platformChargeAmountEnd=$data.platformChargeAmountEnd,withdrawingCountEnd=$data.withdrawingCountEnd,withdrawingAmountEnd=$data.withdrawingAmountEnd,withdrewCountEnd=$data.withdrewCountEnd,withdrewAmountEnd=$data.withdrewAmountEnd,$escape=$helpers.$escape,platformIncomeCount=$data.platformIncomeCount,platformIncomeAmount=$data.platformIncomeAmount,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var statisticsDate = list[i] || {};
	var date = statisticsDate.date;
	var userCount = statisticsDate.userCount;
	var mobileUserCount = statisticsDate.mobileUserCount;
	var consumeUserCount = statisticsDate.consumeUserCount;
	var cashConsumeUserCount = statisticsDate.cashConsumeUserCount;
	var planCount = statisticsDate.planCount;
	var orderCount = statisticsDate.orderCount;
	var orderAmount = statisticsDate.orderAmount/100;
	var planOrderCount = statisticsDate.planOrderCount;
	var planOrderAmount = statisticsDate.planOrderAmount/100;
	var chargeOrderCount = statisticsDate.chargeOrderCount;
	var chargeOrderAmount = statisticsDate.chargeOrderAmount/100;
	var jxzpOrderCount = statisticsDate.jxzpOrderCount;
	var jxzpOrderAmount = statisticsDate.jxzpOrderAmount/100;
	var consumeCount = statisticsDate.consumeCount;
	var consumeAmount = statisticsDate.consumeAmount/100;
	var cashConsumeCount = statisticsDate.cashConsumeCount;
	var cashConsumeAmount = statisticsDate.cashConsumeAmount/100;
	var chargeConsumeCount = statisticsDate.chargeConsumeCount;
	var chargeConsumeAmount = statisticsDate.chargeConsumeAmount/100;
	var incomeConsumeCount = statisticsDate.incomeConsumeCount;
	var incomeConsumeAmount = statisticsDate.incomeConsumeAmount/100;
	var incomeCount = statisticsDate.incomeCount;
	var incomeAmount = statisticsDate.incomeAmount/100;
	var recommendIncomeCount = statisticsDate.recommendIncomeCount;
	var recommendIncomeAmount = statisticsDate.recommendIncomeAmount/100;
	var spreadIncomeCount = statisticsDate.spreadIncomeCount;
	var spreadIncomeAmount = statisticsDate.spreadIncomeAmount/100;
	//var platformIncomeCount = statisticsDate.platformIncomeCount;
	//var platformIncomeAmount = statisticsDate.platformIncomeAmount/100; 
	var chargeCount = statisticsDate.chargeCount;
	var chargeAmount = statisticsDate.chargeAmount/100;
	var userChargeCount = statisticsDate.userChargeCount;
	var userChargeAmount = statisticsDate.userChargeAmount/100;
	var platformChargeCount = statisticsDate.platformChargeCount;
	var platformChargeAmount = statisticsDate.platformChargeAmount/100;
	var withdrawingCount = statisticsDate.withdrawingCount;
	var withdrawingAmount = statisticsDate.withdrawingAmount/100;
	var withdrewCount = statisticsDate.withdrewCount;
	var withdrewAmount = statisticsDate.withdrewAmount/100;
	var userCountEnd = statisticsDate.userCountEnd;
	var mobileUserCountEnd = statisticsDate.mobileUserCountEnd;
	var consumeUserCountEnd = statisticsDate.consumeUserCountEnd;
	var cashConsumeUserCountEnd = statisticsDate.cashConsumeUserCountEnd;
	var planCountEnd = statisticsDate.planCountEnd;
	var orderCountEnd = statisticsDate.orderCountEnd;
	var orderAmountEnd = statisticsDate.orderAmountEnd/100;
	var planOrderCountEnd = statisticsDate.planOrderCountEnd;
	var planOrderAmountEnd = statisticsDate.planOrderAmountEnd/100;
	var chargeOrderCountEnd = statisticsDate.chargeOrderCountEnd;
	var chargeOrderAmountEnd = statisticsDate.chargeOrderAmountEnd/100;
	var jxzpOrderCountEnd = statisticsDate.jxzpOrderCountEnd;
	var jxzpOrderAmountEnd = statisticsDate.jxzpOrderAmountEnd/100;
	var consumeCountEnd = statisticsDate.consumeCountEnd;
	var consumeAmountEnd = statisticsDate.consumeAmountEnd/100;
	var cashConsumeCountEnd = statisticsDate.cashConsumeCountEnd;
	var cashConsumeAmountEnd = statisticsDate.cashConsumeAmountEnd/100;
	var chargeConsumeCountEnd = statisticsDate.chargeConsumeCountEnd;
	var chargeConsumeAmountEnd = statisticsDate.chargeConsumeAmountEnd/100;
	var incomeConsumeCountEnd = statisticsDate.incomeConsumeCountEnd;
	var incomeConsumeAmountEnd = statisticsDate.incomeConsumeAmountEnd/100;
	var incomeCountEnd = statisticsDate.incomeCountEnd;
	var incomeAmountEnd = statisticsDate.incomeAmountEnd/100;
	var recommendIncomeCountEnd = statisticsDate.recommendIncomeCountEnd;
	var recommendIncomeAmountEnd = statisticsDate.recommendIncomeAmountEnd/100;
	var spreadIncomeCountEnd = statisticsDate.spreadIncomeCountEnd;
	var spreadIncomeAmountEnd = statisticsDate.spreadIncomeAmountEnd/100;
	//var platformIncomeCountEnd = statisticsDate.platformIncomeCountEnd;
	//var platformIncomeAmountEnd = statisticsDate.platformIncomeAmountEnd/100;
	var chargeCountEnd = statisticsDate.chargeCountEnd;
	var chargeAmountEnd = statisticsDate.chargeAmountEnd/100;
	var userChargeCountEnd = statisticsDate.userChargeCountEnd;
	var userChargeAmountEnd = statisticsDate.userChargeAmountEnd/100;
	var platformChargeCountEnd = statisticsDate.platformChargeCountEnd;
	var platformChargeAmountEnd = statisticsDate.platformChargeAmountEnd/100;
	var withdrawingCountEnd = statisticsDate.withdrawingCountEnd;
	var withdrawingAmountEnd = statisticsDate.withdrawingAmountEnd/100;
	var withdrewCountEnd = statisticsDate.withdrewCountEnd;
	var withdrewAmountEnd = statisticsDate.withdrewAmountEnd/100;
	userCount = userCount+"("+userCountEnd+")";
	mobileUserCount = mobileUserCount+"("+mobileUserCountEnd+")";
	consumeUserCount = consumeUserCount+"("+consumeUserCountEnd+")";
	cashConsumeUserCount = cashConsumeUserCount+"("+cashConsumeUserCountEnd+")";
	planCount += "("+planCountEnd+")";
	orderCount += "("+orderCountEnd+")";
	orderAmount += "("+orderAmountEnd+")";
	planOrderCount += "("+planOrderCountEnd+")";
	planOrderAmount += "("+planOrderAmountEnd+")";
	chargeOrderCount += "("+chargeOrderCountEnd+")";
	chargeOrderAmount += "("+chargeOrderAmountEnd+")";
	jxzpOrderCount += "("+jxzpOrderCountEnd+")";
	jxzpOrderAmount += "("+jxzpOrderAmountEnd+")";
	consumeCount += "("+consumeCountEnd+")";
	consumeAmount += "("+consumeAmountEnd+")";
	cashConsumeCount += "("+cashConsumeCountEnd+")";
	cashConsumeAmount += "("+cashConsumeAmountEnd+")";
	chargeConsumeCount += "("+chargeConsumeCountEnd+")";
	chargeConsumeAmount += "("+chargeConsumeAmountEnd+")";
	incomeConsumeCount += "("+incomeConsumeCountEnd+")";
	incomeConsumeAmount += "("+incomeConsumeAmountEnd+")";
	incomeCount += "("+incomeCountEnd+")";
	incomeAmount += "("+incomeAmountEnd+")";
	recommendIncomeCount += "("+recommendIncomeCountEnd+")";
	recommendIncomeAmount += "("+recommendIncomeAmountEnd+")";
	spreadIncomeCount += "("+spreadIncomeCountEnd+")";
	spreadIncomeAmount += "("+spreadIncomeAmountEnd+")";
	//platformIncomeCount += "("+platformIncomeCountEnd+")";
	//platformIncomeAmount += "("+platformIncomeAmountEnd+")";
	chargeCount += "("+chargeCountEnd+")";
	chargeAmount += "("+chargeAmountEnd+")";
	userChargeCount += "("+userChargeCountEnd+")";
	userChargeAmount += "("+userChargeAmountEnd+")";
	platformChargeCount += "("+platformChargeCountEnd+")";
	platformChargeAmount += "("+platformChargeAmountEnd+")";
	withdrawingCount += "("+withdrawingCountEnd+")";
	withdrawingAmount += "("+withdrawingAmountEnd+")";
	withdrewCount += "("+withdrewCountEnd+")";
	withdrewAmount += "("+withdrewAmountEnd+")";

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(date);
$out+='</td>\r\n		<td>';
$out+=$escape(planCount);
$out+='</td>\r\n		<td>';
$out+=$escape(userCount);
$out+=' | ';
$out+=$escape(mobileUserCount);
$out+=' | ';
$out+=$escape(consumeUserCount);
$out+=' | ';
$out+=$escape(cashConsumeUserCount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderCount);
$out+=' = ';
$out+=$escape(planOrderCount);
$out+=' + ';
$out+=$escape(chargeOrderCount);
$out+=' + ';
$out+=$escape(jxzpOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderAmount);
$out+=' = ';
$out+=$escape(planOrderAmount);
$out+=' + ';
$out+=$escape(chargeOrderAmount);
$out+=' + ';
$out+=$escape(jxzpOrderAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(consumeCount);
$out+=' = ';
$out+=$escape(cashConsumeCount);
$out+=' + ';
$out+=$escape(chargeConsumeCount);
$out+=' + ';
$out+=$escape(incomeConsumeCount);
$out+='</td>\r\n		<td>';
$out+=$escape(consumeAmount);
$out+=' = ';
$out+=$escape(cashConsumeAmount);
$out+=' + ';
$out+=$escape(chargeConsumeAmount);
$out+=' + ';
$out+=$escape(incomeConsumeAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(chargeCount);
$out+=' = ';
$out+=$escape(userChargeCount);
$out+=' + ';
$out+=$escape(platformChargeCount);
$out+='</td>\r\n		<td>';
$out+=$escape(chargeAmount);
$out+=' = ';
$out+=$escape(userChargeAmount);
$out+=' + ';
$out+=$escape(platformChargeAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(incomeCount);
$out+=' = ';
$out+=$escape(recommendIncomeCount);
$out+=' + ';
$out+=$escape(spreadIncomeCount);
$out+='</td>\r\n		<td>';
$out+=$escape(incomeAmount);
$out+=' = ';
$out+=$escape(recommendIncomeAmount);
$out+=' + ';
$out+=$escape(spreadIncomeAmount);
$out+='</td>\r\n		<!-- <td>';
$out+=$escape(platformIncomeCount);
$out+='</td> -->\r\n		<!-- <td>';
$out+=$escape(platformIncomeAmount);
$out+='</td> -->\r\n		<td>';
$out+=$escape(withdrawingCount);
$out+=' | ';
$out+=$escape(withdrewCount);
$out+='</td>\r\n		<td>';
$out+=$escape(withdrawingAmount);
$out+=' | ';
$out+=$escape(withdrewAmount);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});