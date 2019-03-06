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
})();exports.content=content;exports.stationDepositList=stationDepositList;exports.editStationDeposit=editStationDeposit;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">站点存款</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName" />\r\n				<input class="input_field ml20" placeholder="开始时间" readonly="1" id="beginTime">\r\n				<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索"  id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增站点存款" id="createStationDeposit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="200">昵称</th>\r\n					<th width="120">姓名</th>\r\n					<th width="120">日期</th>\r\n					<th width="120">金额</th>\r\n					<th width="120">最后修改时间</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="stationDepositList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function stationDepositList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,deposit=$data.deposit,depositId=$data.depositId,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,date=$data.date,amount=$data.amount,lastTime=$data.lastTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; 
var length = list.length;
for (var i = 0; i < length; i++) {
	var deposit = list[i] || {};
	var depositId = deposit.depositId;
	var userId = deposit.userId;
	var nickName = deposit.nickName;
	var realName = deposit.realName;
	var date = deposit.date;
	var amount = deposit.amount/100;
	var lastTime = deposit.lastTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(date);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 modifyStationDeposit" depositId="';
$out+=$escape(depositId);
$out+='">修改</a>\r\n			<a class="examine mr5 deleteStationDeposit" depositId="';
$out+=$escape(depositId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editStationDeposit($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,depositId=$data.depositId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editDepositId" value="';
$out+=$escape(depositId);
$out+='"/>\r\n	<div class="mt20">\r\n		站长：\r\n		<span class="select_box">\r\n			<select id="editUserId"></select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n	</div>\r\n	<div class="mt20">日期：<input class="input_field ml5" placeholder="请选择日期" style="width:80px" readonly="1" id="editDate"/></div>\r\n	<div class="mt20">金额：<input class="input_field ml5" placeholder="请输入金额" style="width:80px" id="editAmount"/></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditStationDeposit"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditStationDeposit"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});