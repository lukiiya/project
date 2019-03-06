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
})();exports.content=content;exports.glmj3OrderList=glmj3OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj3OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj3OrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,planNickName=$data.planNickName,planRealName=$data.planRealName,planUserName=$data.planUserName,amount=$data.amount,orderType=$data.orderType,orderTypeMap=$data.orderTypeMap,status=$data.status,statusMap=$data.statusMap,planPrizeStatus=$data.planPrizeStatus,planPrizeStatusMap=$data.planPrizeStatusMap,ticketStatus=$data.ticketStatus,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; 
var length = list.length;
for (var i = 0; i < length; i++) {
	var order = list[i] || {};
	var nickName = order.nickName;
	var realName = order.realName;
	var userName = nickName;
	if (realName != '') {
		userName += '('+realName+')';
	}
	var planNickName = order.planNickName;
	var planRealName = order.planRealName;
	var planUserName = planNickName;
	if (planRealName != '') {
		planUserName += '('+planRealName+')';
	}
	var amount = order.amount/100;
	var orderType = order.orderType;
	var orderTypeMap = {'0': '方案订单','1': '充值订单','2': '套餐订单','3': '竞技彩出票订单','4': '彩金充值订单','5': '晒米冷热','6': '极限追盘','7': '数字彩出票订单','8': '彩票红包订单','9': '数字彩方案订单'};
	var status = order.status;
	var statusMap = {'1': '未付款', '2': '已付款', '3': '已退款', '4': '部分退款'};
	var planPrizeStatus = order.planPrizeStatus;
	var planPrizeStatusMap = {'0': '未开奖','1': '已中奖','2': '未中奖'};
	var ticketStatus =  order.ticketStatus;
	var ticketStatusMap = {'0': '未出票', '1': '出票失败', '2': '已出票待开奖', '3': '未中奖', '4': '已中奖', '5': '已派奖', '6': '部分派奖', '7': '出票中', '8': '部分出票'};
	var createTime = order.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(orderTypeMap[orderType]);
$out+='</td>\r\n		<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n		<td>';
$out+=$escape((orderType==0 || orderType==9)?planPrizeStatusMap[planPrizeStatus]:'');
$out+='</td>\r\n		<td>';
$out+=$escape((orderType==3 || orderType==7)?ticketStatusMap[ticketStatus]:'');
$out+='</td>\r\n		<td>';
$out+=$escape(userName);
$out+='</td>\r\n		<td>';
$out+=$escape(planUserName);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});