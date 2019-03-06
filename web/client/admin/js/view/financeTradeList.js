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
})();exports.content=content;exports.tradeList=tradeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">交易对账</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="交易流水号" id="tradeNo"/>\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n					<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<span class="select_box ml20">\r\n						<select id="tradeType">\r\n							<option value="">全部</option>\r\n							<option value="0">爱贝</option>\r\n							<option value="1">支付宝</option>\r\n							<option value="2">威富通</option>\r\n							<option value="3">苹果支付</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="type">\r\n							<option value="0">全部</option>\r\n							<option value="1">消费</option>\r\n							<option value="2">充值</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="40">平台</th>\r\n					<th width="150">平台流水号</th>\r\n					<th width="100">交易时间</th>\r\n					<th width="40">资金账户</th>\r\n					<th width="60">类型</th>\r\n					<th width="90">订单ID</th>\r\n					<th width="70">金额</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="60">备注</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="tradeList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tradeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,trade=$data.trade,tradeId=$data.tradeId,tradeType=$data.tradeType,tradeTypeMap=$data.tradeTypeMap,tradeNo=$data.tradeNo,tradeTime=$data.tradeTime,nickName=$data.nickName,realName=$data.realName,orderId=$data.orderId,amount=$data.amount,type=$data.type,typeMap=$data.typeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var trade = list[i] || {};
	var tradeId = trade.tradeId;
	var tradeType = trade.tradeType;
	var tradeTypeMap = {'0': '爱贝', '1': '支付宝', '2': '威富通', '3': '苹果支付'};
	var tradeNo = trade.tradeNo;
	var tradeTime = trade.tradeTime;
	var nickName = trade.nickName;
	var realName = trade.realName;
	var orderId = trade.orderId;
	var amount = trade.amount/100;
	var type = trade.type;
	var typeMap = {'1': '消费', '2': '充值'};
	var financeType = trade.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var remark = trade.remark;
	var createTime = trade.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(tradeTypeMap[tradeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(tradeNo);
$out+='</td>\r\n		<td class="time">';
$out+=$escape(tradeTime!='0000-00-00 00:00:00'?tradeTime:createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n	</tr>\r\n';
 } 
$out+='	\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});