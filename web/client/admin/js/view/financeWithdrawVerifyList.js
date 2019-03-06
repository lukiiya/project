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
})();exports.content=content;exports.withdrawVerifyList=withdrawVerifyList;exports.refuseVerify=refuseVerify;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">提款审核</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<span class="select_box ml20">\r\n					<select id="status">\r\n						<option value="0">全部</option>\r\n						<option value="1">未审核</option>\r\n						<option value="2">已审核</option>\r\n						<option value="3">已打款</option>\r\n						<option value="4">已拒绝</option>\r\n						<option value="5">打款中</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="accountType">\r\n						<option value="0">全部</option>\r\n						<option value="1">微信</option>\r\n						<option value="2">支付宝</option>\r\n						<option value="3">银行卡</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="financeType">\r\n						<option value="">全部</option>\r\n						<option value="0">方案账户</option>\r\n						<option value="1">出票账户</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">提款id</th>\r\n					<th width="50">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="60">姓名</th>\r\n					<th width="50">金额</th>\r\n					<th width="60">状态</th>\r\n					<th width="80">账号类型</th>\r\n					<th width="160">账号</th>\r\n					<th width="60">账号名称</th>\r\n					<th width="60">开户姓名</th>\r\n					<th width="80">分行信息</th>\r\n					<th width="60">备注</th>\r\n					<th width="120">时间</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="withdrawVerifyList"></tbody>						\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function withdrawVerifyList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,withdrawVerify=$data.withdrawVerify,withdrawId=$data.withdrawId,nickName=$data.nickName,realName=$data.realName,amount=$data.amount,status=$data.status,statusMap=$data.statusMap,accountType=$data.accountType,accountTypeMap=$data.accountTypeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,accountNumber=$data.accountNumber,accountName=$data.accountName,accountUserName=$data.accountUserName,accountInfo=$data.accountInfo,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var withdrawVerify = list[i] || {};
	var withdrawId = withdrawVerify.withdrawId;
	var nickName = withdrawVerify.nickName;
	var realName = withdrawVerify.realName;
	var amount = withdrawVerify.amount/100;
	var status = withdrawVerify.status;
	var statusMap = {'1': '未审核', '2': '已审核', '3': '已打款', '4': '已拒绝', '5': '打款中'};
	var status = withdrawVerify.status;
	var accountType = withdrawVerify.accountType;
	var accountTypeMap = {'1': '微信', '2': '支付宝', '3': '银行卡'};
	var financeType = withdrawVerify.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var accountNumber = withdrawVerify.accountNumber;
	var accountName = withdrawVerify.accountName || '';
	var accountUserName = withdrawVerify.accountUserName;
	var accountInfo = withdrawVerify.accountInfo;
	var remark = withdrawVerify.remark;
	var createTime = withdrawVerify.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(withdrawId);
$out+='</td>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n		<td>';
$out+=$escape(accountTypeMap[accountType]);
$out+='</td>\r\n		<td>';
$out+=$escape(accountNumber);
$out+='</td>\r\n		<td>';
$out+=$escape(accountName);
$out+='</td>\r\n		<td>';
$out+=$escape(accountUserName);
$out+='</td>\r\n		<td>';
$out+=$escape(accountInfo);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			';
 if (status == 1) { 
$out+='\r\n			<a class="examine verifyWithdraw" withdrawId="';
$out+=$escape(withdrawId);
$out+='" status="2">审核</a>\r\n			<a class="examine verifyWithdraw" withdrawId="';
$out+=$escape(withdrawId);
$out+='" status="4">拒绝</a>\r\n			';
 } else if (status == 2) { 
$out+='\r\n				';
 if (financeType != 1 || accountType != 2 || accountName == '') { 
$out+='\r\n				<a class="examine verifyWithdraw" withdrawId="';
$out+=$escape(withdrawId);
$out+='" status="3">打款</a>\r\n				';
 } 
$out+='\r\n				<a class="examine verifyWithdraw" withdrawId="';
$out+=$escape(withdrawId);
$out+='" status="4">拒绝</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='	\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function refuseVerify($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,withdrawId=$data.withdrawId,$out='';$out+='<h1>拒绝审核</h1>\r\n	<input type="hidden" id="refuseWithdrawId" value="';
$out+=$escape(withdrawId);
$out+='"/>\r\n	<div class="mt20">拒绝理由：<textarea class="input_field" rows="3" placeholder="请输入拒绝理由：" id="refuseRemark"></textarea></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelRefuseVerify"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureRefuseVerify"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});