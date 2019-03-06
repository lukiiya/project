define('view/activityAttachPrizeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityAttachPrizeList=activityAttachPrizeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">11选5加奖百万</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="input_field ml20" placeholder="期号" id="issue">\r\n				<input class="input_field ml20" placeholder="订单号" id="orderId">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="60">期号</th>\r\n					<th width="60">订单号</th>\r\n					<th width="60">加奖金额</th>\r\n					<th width="80">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityAttachPrizeList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityAttachPrizeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,attachPrize=$data.attachPrize,nickName=$data.nickName,realName=$data.realName,issue=$data.issue,orderId=$data.orderId,attachPrizeAmount=$data.attachPrizeAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalAttachPrizeAmount=$data.totalAttachPrizeAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var attachPrize = list[i] || {};
	var nickName = attachPrize.nickName;
	var realName = attachPrize.realName;
	var issue = attachPrize.issue;
	var orderId = attachPrize.orderId;
	var attachPrizeAmount = attachPrize.attachPrizeAmount/100;
	var createTime = attachPrize.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(issue);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(attachPrizeAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAttachPrizeAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityChargeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityChargeList=activityChargeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">彩金充值送5%</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="input_field ml20" placeholder="订单号" id="orderId">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="60">订单号</th>\r\n					<th width="60">充值金额</th>\r\n					<th width="60">赠送金额</th>\r\n					<th width="80">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityChargeList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityChargeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,charge=$data.charge,nickName=$data.nickName,realName=$data.realName,orderId=$data.orderId,amount=$data.amount,presentAmount=$data.presentAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,totalPresentAmount=$data.totalPresentAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var charge = list[i] || {};
	var nickName = charge.nickName;
	var realName = charge.realName;
	var orderId = charge.orderId;
	var amount = charge.amount/100;
	var presentAmount = charge.presentAmount/100;
	var createTime = charge.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n	<td>';
$out+=$escape(totalPresentAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityConfederationsCupList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityConfederationsCupList=activityConfederationsCupList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">2017联合会杯冠军竞彩</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="120">球队</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityConfederationsCupList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityConfederationsCupList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,row=$data.row,guessId=$data.guessId,nickName=$data.nickName,realName=$data.realName,teamName=$data.teamName,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var row = list[i] || {};
	var guessId = row.guessId;
	var nickName = row.nickName;
	var realName = row.realName;
	var teamName = row.teamName;
	var createTime = row.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(teamName);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityConfederationsCupUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityConfederationsCupUserList=activityConfederationsCupUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">2017联合会杯新用户送3彩金</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">赠送彩金</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityConfederationsCupUserList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityConfederationsCupUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,row=$data.row,rowId=$data.rowId,nickName=$data.nickName,presentAmount=$data.presentAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalPresentAmount=$data.totalPresentAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var row = list[i] || {};
	var rowId = row.rowId;
	var nickName = row.nickName;
	var presentAmount = row.presentAmount/100;
	var createTime = row.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td>';
$out+=$escape(totalPresentAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityHongBao2017ChunJieList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityHongBao2017ChunJieList=activityHongBao2017ChunJieList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">2017春节红包</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="120">手机</th>\r\n					<th width="70">赠送粒米</th>\r\n					<th width="70">赠送彩金</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityHongBao2017ChunJieList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityHongBao2017ChunJieList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,hongBao=$data.hongBao,hongBaoId=$data.hongBaoId,nickName=$data.nickName,realName=$data.realName,mobile=$data.mobile,presentAmount=$data.presentAmount,presentTicketAmount=$data.presentTicketAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalPresentAmount=$data.totalPresentAmount,totalPresentTicketAmount=$data.totalPresentTicketAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var hongBao = list[i] || {};
	var hongBaoId = hongBao.hongBaoId;
	var nickName = hongBao.nickName;
	var realName = hongBao.realName;
	var mobile = hongBao.mobile;
	var presentAmount = hongBao.presentAmount/100;
	var presentTicketAmount = hongBao.presentTicketAmount/100;
	var createTime = hongBao.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(mobile);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(presentTicketAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalPresentAmount/100);
$out+='</td>\r\n	<td>';
$out+=$escape(totalPresentTicketAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityHongBaoList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityHongBaoList=activityHongBaoList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">100万红包</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="120">手机</th>\r\n					<th width="70">赠送金额</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityHongBaoList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityHongBaoList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,hongBao=$data.hongBao,hongBaoId=$data.hongBaoId,nickName=$data.nickName,realName=$data.realName,mobile=$data.mobile,presentAmount=$data.presentAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var hongBao = list[i] || {};
	var hongBaoId = hongBao.hongBaoId;
	var nickName = hongBao.nickName;
	var realName = hongBao.realName;
	var mobile = hongBao.mobile;
	var presentAmount = hongBao.presentAmount/100;
	var createTime = hongBao.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(mobile);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityList=activityList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">活动列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="活动名称" id="activityName">\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="160">活动名称</th>\r\n					<th width="140">开始时间</th>\r\n					<th width="140">结束时间</th>\r\n					<th width="90">总金额</th>\r\n					<th width="90">总数量</th>\r\n					<th width="90">消耗金额</th>\r\n					<th width="90">消耗数量</th>\r\n					<th width="60">备注</th>\r\n					<th width="90">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,activity=$data.activity,activityId=$data.activityId,activityName=$data.activityName,beginTime=$data.beginTime,endTime=$data.endTime,sumAmount=$data.sumAmount,sumCount=$data.sumCount,amount=$data.amount,count=$data.count,remark=$data.remark,$escape=$helpers.$escape,$out=''; 	for ( var i = 0, length = list.length; i < length; i++) {
	var activity = list[i] || {};
	var activityId = activity.activityId;
	var activityName = activity.activityName;
	var beginTime = activity.beginTime;
	var endTime = activity.endTime;
	var sumAmount = activity.sumAmount/100;
	var sumCount = activity.sumCount;
	var amount = activity.amount/100;
	var count = activity.count;
	var remark = activity.remark;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(activityName);
$out+='</td>\r\n		<td>';
$out+=$escape(beginTime);
$out+='</td>\r\n		<td>';
$out+=$escape(endTime);
$out+='</td>\r\n		<td>';
$out+=$escape(sumAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(sumCount);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(count);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td>\r\n			<a class="examine activityDetail" activityId="';
$out+=$escape(activityId);
$out+='">查看详情</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activityTurnplateList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityTurnplateList=activityTurnplateList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">幸运大转盘</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户名" id="userName">\r\n				<input class="input_field ml20" placeholder="奖品名称" id="prizeName">\r\n				<input class="input_field ml20" placeholder="订单号" id="orderId">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="60">订单号</th>\r\n					<th width="120">抽奖码</th>\r\n					<th width="70">中奖结果</th>\r\n					<th width="60">中奖金额</th>\r\n					<th width="80">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="activityTurnplateList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityTurnplateList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,turnplate=$data.turnplate,turnplateId=$data.turnplateId,nickName=$data.nickName,realName=$data.realName,orderId=$data.orderId,code=$data.code,prizeName=$data.prizeName,presentAmount=$data.presentAmount,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; 
var length = list.length;
for ( var i = 0; i < length; i++) {
	var turnplate = list[i] || {};
	var turnplateId = turnplate.turnplateId;
	var nickName = turnplate.nickName;
	var realName = turnplate.realName;
	var orderId = turnplate.orderId;
	var code = turnplate.code;
	var prizeName = turnplate.prizeName;
	var presentAmount = turnplate.presentAmount/100;
	var createTime = turnplate.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(code);
$out+='</td>\r\n		<td>';
$out+=$escape(prizeName);
$out+='</td>\r\n		<td>';
$out+=$escape(presentAmount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n<tr>\r\n	<td>总计</td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td></td>\r\n	<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n	<td></td>\r\n</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/adminUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.adminUserList=adminUserList;exports.editAdminUser=editAdminUser;exports.setAdminUserRole=setAdminUserRole;exports.adminUserRoleList=adminUserRoleList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">后台用户</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field ml20" type="text" placeholder="用户名" id="userName">\r\n				<input class="input_field ml20" type="text" placeholder="登录名" id="loginName">\r\n				<span class="select_box ml20">\r\n					<select id="admin">\r\n						<option>全部</option>\r\n						<option value="0">普通管理员</option>\r\n						<option value="1">系统管理员</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增用户" id="createAdminUser"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>用户名</th>\r\n					<th>登录名</th>\r\n					<th>类型</th>\r\n					<th>描述</th>\r\n					<th>最后修改时间</th>\r\n					<th width="260">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="adminUserList"></tbody>			\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,adminUser=$data.adminUser,userId=$data.userId,userName=$data.userName,loginName=$data.loginName,admin=$data.admin,adminMap=$data.adminMap,remark=$data.remark,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var adminUser = list[i] || {};
	var userId = adminUser.userId;
	var userName = adminUser.userName;
	var loginName = adminUser.loginName;
	var admin = adminUser.admin || 0;
	var adminMap = {'0': '普通管理员', '1': '系统管理员'};
	var remark = adminUser.remark || '';
	var lastTime = adminUser.lastTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(userName);
$out+='">';
$out+=$escape(userName);
$out+='</td>\r\n		<td title="';
$out+=$escape(loginName);
$out+='">';
$out+=$escape(loginName);
$out+='</td>\r\n		<td style="';
$out+=$escape(admin==1?'color:#ff0000;':'');
$out+='">';
$out+=$escape(adminMap[admin]);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n		<td>\r\n			';
 if (admin == 0) { 
$out+='\r\n			<a class="examine mr5 setAdminUserRole" userId="';
$out+=$escape(userId);
$out+='">分配角色</a>\r\n			';
 } 
$out+='\r\n			<a class="examine mr5 editAdminUser" userId="';
$out+=$escape(userId);
$out+='">修改</a>\r\n			<a class="examine deleteAdminUser" userId="';
$out+=$escape(userId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editAdminUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,userId=$data.userId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">用户名：<input class="input_field ml5" placeholder="请输入用户名" id="editUserName"/></div>\r\n	<div class="mt20">登录名：<input class="input_field ml5" placeholder="请输入登录名" id="editLoginName"/></div>\r\n	<div class="mt20">　密码：<input class="input_field ml5" type="password" placeholder="请输入密码" id="editPassword"/></div>\r\n	<div class="mt20">\r\n		管理员类型：\r\n		<span class="select_box">\r\n			<select id="editAdmin">\r\n				<option value="0">普通管理员</option>\r\n				<option value="1">系统管理员</option>\r\n			</select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n	</div>\r\n	<div class="mt20">\r\n		<div class="mb10">描述：</div>\r\n		<textarea style="width:100%;height:55px" id="editRemark"></textarea>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditAdminUser"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditAdminUser"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function setAdminUserRole($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userId=$data.userId,$out='';$out+='<h1 id="setTilte"></h1>\r\n	<input type="hidden" id="setUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">\r\n		参考用户：\r\n		<span class="select_box">\r\n			<select id="referUser"></select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n		<label class="ml10">\r\n			<input id="checkAllRole" type="checkbox"/>全选\r\n		</label>\r\n		<label class="ml10">\r\n			<input id="showRoleDetail" type="checkbox"/>详细\r\n		</label>\r\n	</div>\r\n	<div class="mt10" style="width:450px;overflow:hidden;border-top:1px solid #f2f2f2;border-bottom:1px solid #f2f2f2;" id="adminUserRoleList"></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelSetAdminUserRole"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureSetAdminUserRole"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserRoleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,role=$data.role,$escape=$helpers.$escape,$out=''; 
	for(var i = 0, length = list.length; i < length; i++) {
	var role = list[i] || {};

$out+='\r\n	<span class="mr10" style="line-height:30px;white-space:nowrap;">\r\n		<label>\r\n			<input id="roleId';
$out+=$escape(role.roleId);
$out+='" class="roleId" type="checkbox" value="';
$out+=$escape(role.roleId);
$out+='"/><span class="label">';
$out+=$escape(role.roleName);
$out+='</span>\r\n			<span class="remark" style="color:#999;width:100%;display:none;">(';
$out+=$escape(role.remark);
$out+=')</span>\r\n		</label>\r\n	</span>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/adminUserMenuList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.adminUserMenuList=adminUserMenuList;exports.editAdminUserMenu=editAdminUserMenu;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">后台菜单</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field ml20" type="text" placeholder="菜单名" id="menuName">\r\n				<input class="input_field ml20" type="text" placeholder="父菜单名" id="parentMenuName">\r\n				<input class="input_field ml20" type="text" placeholder="路径" id="path">\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增菜单" id="createAdminUserMenu"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>菜单名</th>\r\n					<th>父菜单名</th>\r\n					<th>路径</th>\r\n					<th>描述</th>\r\n					<th>最后修改时间</th>\r\n					<th width="260">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="adminUserMenuList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserMenuList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,adminUserMenu=$data.adminUserMenu,menuId=$data.menuId,menuName=$data.menuName,parentMenuName=$data.parentMenuName,path=$data.path,remark=$data.remark,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var adminUserMenu = list[i] || {};
	var menuId = adminUserMenu.menuId;
	var menuName = adminUserMenu.menuName;
	var parentMenuName = adminUserMenu.parentMenuName;
	var path = adminUserMenu.path;
	var remark = adminUserMenu.remark || '';
	var lastTime = adminUserMenu.lastTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(menuName);
$out+='">';
$out+=$escape(menuName);
$out+='</td>\r\n		<td title="';
$out+=$escape(parentMenuName);
$out+='">';
$out+=$escape(parentMenuName);
$out+='</td>\r\n		<td>';
$out+=$escape(path);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 editAdminUserMenu" menuId="';
$out+=$escape(menuId);
$out+='">修改</a>\r\n			<a class="examine deleteAdminUserMenu" menuId="';
$out+=$escape(menuId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editAdminUserMenu($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,menuId=$data.menuId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editMenuId" value="';
$out+=$escape(menuId);
$out+='"/>\r\n	<div class="mt20">　菜单名：<input class="input_field ml5" placeholder="请输入菜单名" id="editMenuName"/></div>\r\n	<div class="mt20">父菜单名：<input class="input_field ml5" placeholder="请输入父菜单名" id="editParentMenuName"/></div>\r\n	<div class="mt20">　　路径：<input class="input_field ml5" placeholder="请输入路径" id="editPath"/></div>\r\n	<div class="mt20">\r\n		<div class="mb10">描述：</div>\r\n		<textarea style="width:100%;height:55px" id="editRemark"></textarea>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditAdminUserMenu"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditAdminUserMenu"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/adminUserRightList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.adminUserRightList=adminUserRightList;exports.editAdminUserRight=editAdminUserRight;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">后台权限</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field ml20" type="text" placeholder="权限名" id="rightName">\r\n				<input class="input_field ml20" type="text" placeholder="规则" id="rule">\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增权限" id="createAdminUserRight"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>权限名</th>\r\n					<th>规则</th>\r\n					<th>描述</th>\r\n					<th>最后修改时间</th>\r\n					<th width="260">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="adminUserRightList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserRightList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,adminUserRight=$data.adminUserRight,rightId=$data.rightId,rightName=$data.rightName,rule=$data.rule,remark=$data.remark,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var adminUserRight = list[i] || {};
	var rightId = adminUserRight.rightId;
	var rightName = adminUserRight.rightName;
	var rule = adminUserRight.rule;
	var remark = adminUserRight.remark || '';
	var lastTime = adminUserRight.lastTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(rightName);
$out+='">';
$out+=$escape(rightName);
$out+='</td>\r\n		<td title="';
$out+=$escape(rule);
$out+='">';
$out+=$escape(rule);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 editAdminUserRight" rightId="';
$out+=$escape(rightId);
$out+='">修改</a>\r\n			<a class="examine deleteAdminUserRight" rightId="';
$out+=$escape(rightId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editAdminUserRight($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,rightId=$data.rightId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editRightId" value="';
$out+=$escape(rightId);
$out+='"/>\r\n	<div class="mt20">权限名：<input class="input_field ml5" placeholder="请输入权限名" id="editRightName"/></div>\r\n	<div class="mt20">　规则：<input class="input_field ml5" placeholder="请输入规则" id="editRule"/></div>\r\n	<div class="mt20">\r\n		<div class="mb10">描述：</div>\r\n		<textarea style="width:100%;height:55px" id="editRemark"></textarea>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditAdminUserRight"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditAdminUserRight"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/adminUserRoleList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.adminUserRoleList=adminUserRoleList;exports.editAdminUserRole=editAdminUserRole;exports.setAdminUserRoleFun=setAdminUserRoleFun;exports.adminUserRightList=adminUserRightList;exports.adminUserMenuList=adminUserMenuList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">后台角色</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field ml20" type="text" placeholder="角色名" id="roleName">\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增角色" id="createAdminUserRole"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>角色名</th>\r\n					<th>描述</th>\r\n					<th>最后修改时间</th>\r\n					<th width="260">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="adminUserRoleList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserRoleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,adminUserRole=$data.adminUserRole,roleId=$data.roleId,roleName=$data.roleName,remark=$data.remark,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var adminUserRole = list[i] || {};
	var roleId = adminUserRole.roleId;
	var roleName = adminUserRole.roleName;
	var remark = adminUserRole.remark || '';
	var lastTime = adminUserRole.lastTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(roleName);
$out+='">';
$out+=$escape(roleName);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 setAdminUserRoleFun" roleId="';
$out+=$escape(roleId);
$out+='">分配功能</a>\r\n			<a class="examine mr5 editAdminUserRole" roleId="';
$out+=$escape(roleId);
$out+='">修改</a>\r\n			<a class="examine deleteAdminUserRole" roleId="';
$out+=$escape(roleId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editAdminUserRole($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,roleId=$data.roleId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editRoleId" value="';
$out+=$escape(roleId);
$out+='"/>\r\n	<div class="mt20">角色名：<input class="input_field ml5" placeholder="请输入角色名" id="editRoleName"/></div>\r\n	<div class="mt20">\r\n		<div class="mb10">描述：</div>\r\n		<textarea style="width:100%;height:55px" id="editRemark"></textarea>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditAdminUserRole"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditAdminUserRole"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function setAdminUserRoleFun($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,roleId=$data.roleId,$out='';$out+='<h1 id="setTilte"></h1>\r\n	<input type="hidden" id="setRoleId" value="';
$out+=$escape(roleId);
$out+='"/>\r\n	<div class="mt20">\r\n		参考角色：\r\n		<span class="select_box">\r\n			<select id="referRole"></select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n		<div class="mt10" style="width:800px;overflow:hidden;padding:10px;border:1px solid #f2f2f2;">\r\n			<b>分配菜单：</b>\r\n			<label>\r\n				<input id="checkAllMenu" type="checkbox"/>全选\r\n			</label>\r\n			<label class="ml10">\r\n				<input id="showMenuDetail" type="checkbox"/>详细\r\n			</label>\r\n			<div class="mt10 clearfix" id="adminUserMenuList"></div>\r\n		</div>\r\n		<div class="mt10" style="width:800px;overflow:hidden;padding:10px;border:1px solid #f2f2f2;">\r\n			<b>分配权限：</b>\r\n			<label>\r\n				<input id="checkAllRight" type="checkbox"/>全选\r\n			</label>\r\n			<label class="ml10">\r\n				<input id="showRightDetail" type="checkbox"/>详细\r\n			</label>\r\n			<div class="mt10" style="border-top:1px solid #f2f2f2;" id="adminUserRightList"></div>\r\n		</div>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelSetAdminUserRoleFun"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureSetAdminUserRoleFun"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserRightList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,right=$data.right,$escape=$helpers.$escape,$out=''; 
	for(var i = 0, length = list.length; i < length; i++) {
	var right = list[i] || {};

$out+='\r\n	<span class="mr10" style="line-height: 30px;white-space:nowrap;">\r\n		<label>\r\n			<input id="rightId';
$out+=$escape(right.rightId);
$out+='" class="rightId" type="checkbox" value="';
$out+=$escape(right.rightId);
$out+='"/><span class="label">';
$out+=$escape(right.rightName);
$out+='</span>\r\n			<span class="remark" style="color:#999;width:100%;display:none;">(';
$out+=$escape(right.remark);
$out+=')</span>\r\n		</label>\r\n	</span>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}function adminUserMenuList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,parentMenuName=$data.parentMenuName,menuMap=$data.menuMap,$escape=$helpers.$escape,list=$data.list,i=$data.i,length=$data.length,menu=$data.menu,$out='';
	for(var parentMenuName in menuMap) {

$out+='\r\n<span class="menuBox mr5 mb5" style="float:left;width:245px;overflow:hidden;padding:5px;border:1px solid #f2f2f2;">\r\n	<span class="mr10" style="line-height:25px;white-space:nowrap;">\r\n		<label>\r\n			<input class="menuId" type="checkbox" value="0"/><b>';
$out+=$escape(parentMenuName);
$out+='</b>\r\n		</label>\r\n	</span>\r\n';

		var list = menuMap[parentMenuName] || [];
		for(var i = 0, length = list.length; i < length; i++) {
		var menu = list[i] || {};

$out+='\r\n		<div class="ml15" style="line-height:25px;white-space:nowrap;">\r\n			<label>\r\n				<input id="menuId';
$out+=$escape(menu.menuId);
$out+='" class="menuId" type="checkbox" value="';
$out+=$escape(menu.menuId);
$out+='"/><span class="label">';
$out+=$escape(menu.menuName);
$out+='</span>\r\n				<span class="remark" style="color:#999;width:100%;display:none;">(';
$out+=$escape(menu.remark);
$out+=')</span>\r\n			</label>\r\n		</div>\r\n		';
}
$out+='\r\n</span>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/articleList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.articleList=articleList;exports.editArticle=editArticle;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">资讯管理</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="标题" id="articleTitle"/>\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30" type="button" value="新增资讯" id="createArticle"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>标题</th>\r\n					<th width="160">封面</th>\r\n					<th width="100">来源</th>\r\n					<th>链接</th>\r\n					<th width="130">时间</th>\r\n					<th width="155">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="articleList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function articleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,article=$data.article,articleId=$data.articleId,articleTitle=$data.articleTitle,articleImg=$data.articleImg,articleSource=$data.articleSource,articleLink=$data.articleLink,createTime=$data.createTime,img=$data.img,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var article = list[i] || {};
	var articleId = article.articleId;
	var articleTitle = article.articleTitle;
	var articleImg = article.articleImg;
	var articleSource = article.articleSource;
	var articleLink = article.articleLink;
	var createTime = article.createTime;
	var img = "<img style='width: 120px;vertical-align: middle;' src="+articleImg+" onload='this.onload=null;parent.$(window.frameElement).after(this);parent.$(window.frameElement).remove()'/>";

$out+='\r\n	<tr articleId="';
$out+=$escape(articleId);
$out+='">\r\n		<td title="';
$out+=$escape(articleTitle);
$out+='">';
$out+=$escape(articleTitle);
$out+='</td>\r\n		<td><iframe style="display:none" src="javascript:document.write(&quot;';
$out+=$escape(img);
$out+='&quot;)"/></td>\r\n		<td>';
$out+=$escape(articleSource);
$out+='</td>\r\n		<td title="';
$out+=$escape(articleLink);
$out+='"><a class="examine" href="';
$out+=$escape(articleLink);
$out+='" target="_blank">';
$out+=$escape(articleLink);
$out+='</a></td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine deleteArticle" articleId="';
$out+=$escape(articleId);
$out+='">删除</a>\r\n			<a class="examine ml5 updateArticle" articleId="';
$out+=$escape(articleId);
$out+='">更新</a>\r\n			<a class="examine ml5 modifySort modifyUp" articleId="';
$out+=$escape(articleId);
$out+='" type="1">上移</a>\r\n			<a class="examine ml5 modifySort modifyDown" articleId="';
$out+=$escape(articleId);
$out+='" type="2">下移</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editArticle($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,articleId=$data.articleId,$out='';$out+='<h1>';
$out+=$escape(articleId>0?'更新':'新增');
$out+='资讯</h1>\r\n<input type="hidden" id="articleId" value="';
$out+=$escape(articleId);
$out+='"/>\r\n<div class="mt20">URL：<input class="input_field ml5" placeholder="请输入资讯URL：" id="articleLink"/></div>\r\n<div class="mt20" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="cancelEditArticle"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="sureEditArticle"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/bannerList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.bannerList=bannerList;exports.editBanner=editBanner;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">banner列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<span class="select_box">\r\n					<select id="type">\r\n						<!--<option>类型</option>-->\r\n						<option value="0">h5</option>\r\n						<option value="1">android</option>\r\n						<option value="2">ios</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>全部</option>\r\n						<option value="1">上架</option>\r\n						<option value="0">下架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="添加banner" id="createBanner">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<thead>\r\n					<tr>\r\n						<th width="80">类型</th>\r\n						<th width="80">上下架</th>\r\n						<th width="220">图片</th>\r\n						<th width="640">链接地址</th>\r\n						<th width="200">操作</th>\r\n					</tr>\r\n				</thead>\r\n			</thead>\r\n			<tbody id="bannerList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function bannerList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,banner=$data.banner,bannerId=$data.bannerId,link=$data.link,resourceList=$data.resourceList,publish=$data.publish,publishMap=$data.publishMap,type=$data.type,typeMap=$data.typeMap,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var banner = list[i] || {};
	var bannerId = banner.bannerId;
	var link = banner.link;
	var resourceList = banner.resourceList[0] || '';
	var publish = banner.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var type = banner.type;
	var typeMap = {'0': 'h5', '1': 'android', '2': 'ios'};
	var createTime = banner.createTime;

$out+='\r\n	<tr bannerId="';
$out+=$escape(bannerId);
$out+='">\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>\r\n			<img class="" src="';
$out+=$escape(resourceList);
$out+='" alt="" style="width: 100%;vertical-align: middle;"/>\r\n		</td>\r\n		<td class="banner_url_wrap"><a class="examine" href="';
$out+=$escape(link);
$out+='" target="_blank">';
$out+=$escape(link);
$out+='</a></td>\r\n		<td>\r\n			<a class="examine mr5 editBanner" bannerId="';
$out+=$escape(bannerId);
$out+='">修改</a>\r\n			<a class="examine mr5 modifySort modifyUp" bannerId="';
$out+=$escape(bannerId);
$out+='" type="1">上移</a>\r\n			<a class="examine mr5 modifySort modifyDown" bannerId="';
$out+=$escape(bannerId);
$out+='" type="2">下移</a>\r\n			';
if (publish == 0) { 
$out+='\r\n			<a class="examine mr5 publishBanner" bannerId="';
$out+=$escape(bannerId);
$out+='" publish="1">上架</a>\r\n			';
 } else if (publish == 1){ 
$out+='\r\n			<a class="examine mr5 publishBanner" bannerId="';
$out+=$escape(bannerId);
$out+='" publish="0">下架</a>\r\n			';
 } 
$out+='\r\n			<a class="examine mr5 deleteBanner" bannerId="';
$out+=$escape(bannerId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editBanner($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,bannerId=$data.bannerId,$out='';$out+='<div id="editBannerBox">\r\n		<div class="mask"></div>\r\n		<div class="compile_img_box">\r\n			<div class="compile_head">\r\n				<span class="compile_head_title">';
$out+=$escape(title);
$out+='</span>\r\n				<a class="close_compile_btn" id="closeEditBanner">\r\n					<span></span>\r\n				</a>\r\n			</div>\r\n			<div class="compile_cont">\r\n				<div class="pt15 pb15">\r\n					<div class="file_select_box" id="fileSelectBox">\r\n						点击选择图片\r\n						<input id="fileSelect" name="file" type="file" />\r\n					</div>\r\n				</div>\r\n				<input type="hidden" id="editBannerId" value="';
$out+=$escape(bannerId);
$out+='" />\r\n				<div id="previewImg"></div>\r\n				<ul>\r\n					<li>\r\n						<span class="input_tit">链接地址</span><input id="editLink" type="text" />\r\n					</li>\r\n					<li>\r\n						<span class="input_tit">类&emsp;&emsp;型</span>\r\n						<span class="select_box">\r\n							<select id="editType">\r\n								<option>类型</option>\r\n								<option value="0">h5</option>\r\n								<option value="1">android</option>\r\n								<option value="2">ios</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span>\r\n						</span>\r\n					</li>\r\n				</ul>\r\n				<div class="compile_btn_wrap">\r\n					<span class="ensure_btn" id="sureEditBanner">确定</span>\r\n					<span class="cancle_btn" id="cancelEditBanner">取消</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/cashConsumeUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">现金消费用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="开始时间" readonly="1" id="beginTime">\r\n				<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n				<span class="select_box ml20">\r\n					<select id="financeType">\r\n						<option value="">全部</option>\r\n						<option value="0">方案账户</option>\r\n						<option value="1">出票账户</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n		\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>昵称</th>\r\n					<th>姓名</th>\r\n					<th>数量</th>\r\n					<th>金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,count=$data.count,amount=$data.amount,$escape=$helpers.$escape,totalOrderCount=$data.totalOrderCount,totalOrderAmount=$data.totalOrderAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId;
	var nickName = user.nickName;
	var realName = user.realName;
	var count = user.count;
	var amount = user.amount/100;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td userId="';
$out+=$escape(userId);
$out+='"><a class="examine">';
$out+=$escape(count);
$out+='</a></td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='	\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalOrderAmount/100);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/editJxzp',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.matchList=matchList;exports.selectMatch=selectMatch;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input type="hidden" id="jxzpId">\r\n<h1 class="title" id="title"></h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div class="sel_box">\r\n			<span>玩法:</span>\r\n				<span class="select_box ml10">\r\n				<select id="type" class="mr10">\r\n					<option value="0">请选择</option>\r\n					<option value="1">胜平负</option>\r\n					<option value="2">输赢盘</option>\r\n					<option value="3">大小球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<div class="match_wrap mt20 mb10" id="matchList">\r\n		<div class="match_btn">赛事选择</div>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>球队名称:</span>\r\n		</div>\r\n		<input class="ml5 input_field" placeholder="球队名称" id="teamName"/>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>近期状态:</span>\r\n			<span class="select_box ml10">\r\n				<select id="status">\r\n					<option value="0">请选择</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<input class="ml10 count" placeholder="场数" type="number" min="1" id="recentContinue"/>\r\n		</div>\r\n	</div>\r\n	<div class="search_box mt20">\r\n		<div class="sel_box">\r\n			<span>历史最高:</span>\r\n		</div>\r\n		<input class="ml5 count" placeholder="场数" type="number" min="1" id="historyContinue"/>\r\n	</div>\r\n	<div class="btn_wrap mt20 ml10">\r\n		<input class="ml10 bcg" type="button" value="　确定　" id="editSubmit"/>\r\n		<input class="ml10" type="button" value="　返回　" onclick="history.back()"/>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,keys=$data.keys,Object=$data.Object,matchMap=$data.matchMap,i=$data.i,length=$data.length,key=$data.key,matchIdKeys=$data.matchIdKeys,a=$data.a,b=$data.b,aBeginTime=$data.aBeginTime,bBeginTime=$data.bBeginTime,aNum=$data.aNum,bNum=$data.bNum,ret=$data.ret,$escape=$helpers.$escape,j=$data.j,len=$data.len,matchId=$data.matchId,match=$data.match,spfContent=$data.spfContent,rqspfContent=$data.rqspfContent,spf=$data.spf,rqspf=$data.rqspf,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,spfBettypeOddsJson=$data.spfBettypeOddsJson,rqspfBettypeOddsJson=$data.rqspfBettypeOddsJson,zjqContent=$data.zjqContent,zjq=$data.zjq,zjqBettypeOdds=$data.zjqBettypeOdds,zjqBettypeOddsJson=$data.zjqBettypeOddsJson,$out=''; if(type != 3) { 
$out+='\r\n<div class="matchExcel_wrap" style="width:450px;" id="spfBox">\r\n	';

		var keys = Object.keys(matchMap).sort();
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var matchIdKeys = Object.keys(matchMap[key]);
			matchIdKeys = matchIdKeys.sort(function(a, b) {
				var aBeginTime = matchMap[key][a].beginTime;
				var bBeginTime = matchMap[key][b].beginTime;
				var aNum = matchMap[key][a].number;
				var bNum = matchMap[key][b].number;
				var ret = 0;
				if (aBeginTime > bBeginTime) {
					ret = 1;
				} else if (aBeginTime < bBeginTime) {
					ret = -1;
				} else if (aNum > bNum) {
					ret = 1;
				} else if (aNum < bNum) {
					ret = -1;
				}
				return ret; 
			});
	
$out+='\r\n	<div class="match_excel">\r\n		<div class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(key);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></div>\r\n		<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n		';
 
			for (var j = 0, len = matchIdKeys.length; j < len; j++) {
			var matchId = matchIdKeys[j]
			var match = matchMap[key][matchId];
			var spfContent = 'SPF';
			var rqspfContent = 'RQSPF';
			var spf = match['bettype'][spfContent] || {};
			var rqspf = match['bettype'][rqspfContent] || {};
			var spfBettypeOdds = spf.bettypeOdds;
			var rqspfBettypeOdds = rqspf.bettypeOdds;
			var spfBettypeOddsJson = spf.bettypeOddsJson || {"S":"--","P":"--","F":"--"};
			var rqspfBettypeOddsJson = rqspf.bettypeOddsJson || {"S":"--","P":"--","F":"--"};
		
$out+='\r\n			<div class="match_data clearfix">\r\n				<div class="base_data">\r\n					<span>';
$out+=$escape(match.league);
$out+='</span><br/>\r\n					<span class="mb10">';
$out+=$escape(match.bDate);
$out+='</span><br/>\r\n					<span>';
$out+=$escape(match.bTime);
$out+='</span>\r\n				</div>\r\n				<div class="data_list">\r\n					<table class="match_table" matchId="';
$out+=$escape(matchId);
$out+='" league="';
$out+=$escape(match.league);
$out+='" home="';
$out+=$escape(match.home);
$out+='" away="';
$out+=$escape(match.away);
$out+='" beginTime="';
$out+=$escape(match.beginTime);
$out+='">\r\n						<tr>\r\n							<th colspan="3">\r\n								<span>';
$out+=$escape(match.home);
$out+='</span>\r\n								<span>VS</span>\r\n								<span>';
$out+=$escape(match.away);
$out+='</span>\r\n							</th>\r\n						</tr>\r\n						<tr class="matchContentTr" oddsId="';
$out+=$escape(spf.oddsId);
$out+='" bettypeContent="';
$out+=$escape(spfContent);
$out+='" bettypeOdds="';
$out+=$escape(spfBettypeOdds);
$out+='" concede="';
$out+=$escape(spf.concede);
$out+='">\r\n							<td recommend="S">胜<span>';
$out+=$escape(spfBettypeOddsJson.S);
$out+='</span><span class="numcircle">';
$out+=$escape(spf.concede);
$out+='</span></td>\r\n							<td recommend="P">平<span>';
$out+=$escape(spfBettypeOddsJson.P);
$out+='</span></td>\r\n							<td recommend="F">负<span>';
$out+=$escape(spfBettypeOddsJson.F);
$out+='</span></td>\r\n						</tr>\r\n						<tr class="matchContentTr" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='" bettypeContent="';
$out+=$escape(rqspfContent);
$out+='" bettypeOdds="';
$out+=$escape(rqspfBettypeOdds);
$out+='" concede="';
$out+=$escape(rqspf.concede);
$out+='">\r\n							<td recommend="S">胜<span>';
$out+=$escape(rqspfBettypeOddsJson.S);
$out+='</span><span class="numcircle numcircle1">';
$out+=$escape(rqspf.concede);
$out+='</span></td>\r\n							<td recommend="P">平<span>';
$out+=$escape(rqspfBettypeOddsJson.P);
$out+='</span></td>\r\n							<td recommend="F">负<span>';
$out+=$escape(rqspfBettypeOddsJson.F);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } else { 
$out+='\r\n<div id="zjqBox" style="width: 450px;">\r\n	';

		var keys = Object.keys(matchMap).sort();
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var matchIdKeys = Object.keys(matchMap[key]);
			matchIdKeys = matchIdKeys.sort(function(a, b) {
				var aBeginTime = matchMap[key][a].beginTime;
				var bBeginTime = matchMap[key][b].beginTime;
				var aNum = matchMap[key][a].number;
				var bNum = matchMap[key][b].number;
				var ret = 0;
				if (aBeginTime > bBeginTime) {
					ret = 1;
				} else if (aBeginTime < bBeginTime) {
					ret = -1;
				} else if (aNum > bNum) {
					ret = 1;
				} else if (aNum < bNum) {
					ret = -1;
				}
				return ret; 
			});
	
$out+='\r\n	<div class="match_excel clearfix">\r\n		<div class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(key);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></div>\r\n		<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n			';
 
				for (var j = 0, len = matchIdKeys.length; j < len; j++) {
				var matchId = matchIdKeys[j]
				var match = matchMap[key][matchId];
				var zjqContent = 'ZJQ';
				var zjq = match['bettype'][zjqContent] || {};
				var zjqBettypeOdds = zjq.bettypeOdds || "";
				var zjqBettypeOddsJson = zjq.bettypeOddsJson || {};
			
$out+='\r\n			<div class="table_wrap match_data clearfix">\r\n				<div class="base_data">\r\n					<span>';
$out+=$escape(match.league);
$out+='</span><br>\r\n					<span class="mb15">';
$out+=$escape(match.bDate);
$out+='</span><br>\r\n					<span>';
$out+=$escape(match.bTime);
$out+='</span>\r\n				</div>\r\n				<div class="data_list">\r\n					<table class="game_table matchBettype" matchId="';
$out+=$escape(matchId);
$out+='" league="';
$out+=$escape(match.league);
$out+='" home="';
$out+=$escape(match.home);
$out+='" away="';
$out+=$escape(match.away);
$out+='" beginTime="';
$out+=$escape(match.beginTime);
$out+='">\r\n						<tr>\r\n							<th colspan="4">\r\n								<span>';
$out+=$escape(match.home);
$out+='</span>\r\n								<span>VS</span>\r\n								<span>';
$out+=$escape(match.away);
$out+='</span>\r\n							</th>\r\n						</tr>\r\n						<tr oddsId="';
$out+=$escape(zjq.oddsId);
$out+='" bettypeContent="';
$out+=$escape(zjqContent);
$out+='" bettypeOdds="';
$out+=$escape(zjqBettypeOdds);
$out+='" concede="';
$out+=$escape(zjq.concede);
$out+='">\r\n							<td width="86" recommend="0">0<br/><span>';
$out+=$escape(zjqBettypeOddsJson['0']);
$out+='</span></td>\r\n							<td width="86" recommend="1">1<br/><span>';
$out+=$escape(zjqBettypeOddsJson['1']);
$out+='</span></td>\r\n							<td width="86" recommend="2">2<br/><span>';
$out+=$escape(zjqBettypeOddsJson['2']);
$out+='</span></td>\r\n							<td width="86" recommend="3">3<br/><span>';
$out+=$escape(zjqBettypeOddsJson['3']);
$out+='</span></td>	\r\n						</tr>\r\n						<tr oddsId="';
$out+=$escape(zjq.oddsId);
$out+='" bettypeContent="';
$out+=$escape(zjqContent);
$out+='" bettypeOdds="';
$out+=$escape(zjqBettypeOdds);
$out+='" concede="';
$out+=$escape(zjq.concede);
$out+='">\r\n							<td recommend="4">4<br/><span>';
$out+=$escape(zjqBettypeOddsJson['4']);
$out+='</span></td>\r\n							<td recommend="5">5<br/><span>';
$out+=$escape(zjqBettypeOddsJson['5']);
$out+='</span></td>\r\n							<td recommend="6">6<br/><span>';
$out+=$escape(zjqBettypeOddsJson['6']);
$out+='</span></td>\r\n							<td recommend="7+">7+<br/><span>';
$out+=$escape(zjqBettypeOddsJson['7+']);
$out+='</span></td>	\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
$out+='\r\n<div class="mt10" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="matchListCancel"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="matchListSure"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function selectMatch($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,matchId=$data.matchId,oddsId=$data.oddsId,recommend=$data.recommend,match=$data.match,d=$data.d,spfContent=$data.spfContent,rqspfContent=$data.rqspfContent,zjqContent=$data.zjqContent,spf=$data.spf,rqspf=$data.rqspf,zjq=$data.zjq,spfOddsId=$data.spfOddsId,rqspfOddsId=$data.rqspfOddsId,zjqOddsId=$data.zjqOddsId,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,spfBettypeOddsJson=$data.spfBettypeOddsJson,rqspfBettypeOddsJson=$data.rqspfBettypeOddsJson,zjqBettypeOddsJson=$data.zjqBettypeOddsJson,spfConcede=$data.spfConcede,rqspfConcede=$data.rqspfConcede,spfRecommend=$data.spfRecommend,rqspfRecommend=$data.rqspfRecommend,zjqRecommend=$data.zjqRecommend,recommendSelect=$data.recommendSelect,S=$data.S,P=$data.P,F=$data.F,recommendOdds=$data.recommendOdds,zjqCommendSelect=$data.zjqCommendSelect,zjqRecommentOdds=$data.zjqRecommentOdds,concede=$data.concede,recommendLength=$data.recommendLength,i=$data.i,length=$data.length,zjqRecommendOdds=$data.zjqRecommendOdds,zjqConcede=$data.zjqConcede,$escape=$helpers.$escape,j=$data.j,$out=''; 
	var matchId = 0;
	var oddsId = 0;
	var recommend = '';
	if (match) {
		matchId = match.matchId;
		match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var spfContent = 'SPF';
		var rqspfContent = 'RQSPF';
		var zjqContent = 'ZJQ';	
		var spf = match['bettype'][spfContent] || {};
		var rqspf = match['bettype'][rqspfContent] || {};
		var zjq = match['bettype'][zjqContent] || {};
		var spfOddsId = spf.oddsId || 0;
		var rqspfOddsId = rqspf.oddsId || 0;
		var zjqOddsId = zjq.oddsId || 0;
		var spfBettypeOdds = spf.bettypeOdds || "";
		var rqspfBettypeOdds = rqspf.bettypeOdds || "";
		var zjqBettypeOdds = zjq.bettypeOdds || "";
		var spfBettypeOddsJson = spf.bettypeOddsJson || {};
		var rqspfBettypeOddsJson = rqspf.bettypeOddsJson || {};
		var zjqBettypeOddsJson = zjq.bettypeOddsJson || {};
		var spfConcede = spf.concede;
		var rqspfConcede = rqspf.concede;
		var spfRecommend = spf.recommend || [];
		var rqspfRecommend = rqspf.recommend || [];
		var zjqRecommend = zjq.recommend || [];
		var recommendSelect = {S:false,P:false,F:false};
		var recommendOdds = {S:'',P:'',F:''};
		var zjqCommendSelect = {'0':false,'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7+':false};
		var zjqRecommentOdds = {'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7+':''};
		var concede = 0;
		var recommendLength = recommend.length;
		if (spfOddsId > 0 && spfBettypeOddsJson && spfRecommend.length > 0) {
			oddsId = spfOddsId;
			recommend = spfRecommend.join(',');
			for (var i = 0, length = spfRecommend.length; i < length; i++) {
				recommendSelect[spfRecommend[i]] = true;
			}
			recommendOdds = spfBettypeOddsJson;
			concede = spfConcede;
		} else if (rqspfOddsId > 0 && rqspfBettypeOddsJson && rqspfRecommend.length > 0) {
			oddsId = rqspfOddsId;
			recommend = rqspfRecommend.join(',');
			for (var i = 0, length = rqspfRecommend.length; i < length; i++) {
				recommendSelect[rqspfRecommend[i]] = true;
			}
			recommendOdds = rqspfBettypeOddsJson;
			concede = rqspfConcede;
		} else if (zjqOddsId > 0 && zjqBettypeOddsJson && zjqRecommend.length > 0) {
			oddsId = zjqOddsId;
			recommend = zjqRecommend.join(',');
			for (var i = 0, length = zjqRecommend.length; i < length; i++) {
				zjqCommendSelect[zjqRecommend[i]] = true;
			}
			zjqRecommendOdds = zjqBettypeOddsJson;
			concede = zjqConcede;
		}

$out+='\r\n		<input type="hidden" id="matchId" value="';
$out+=$escape(matchId);
$out+='">\r\n		<input type="hidden" id="oddsId" value="';
$out+=$escape(oddsId);
$out+='">\r\n		<input type="hidden" id="recommend" value="';
$out+=$escape(recommend);
$out+='">\r\n		';
 if (spf.bettypeContent == 'SPF' || rqspf.bettypeContent == 'RQSPF') { 
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<div class="left_match fl">\r\n					[<span class="match_name">';
$out+=$escape(match.league);
$out+='</span>]\r\n					<span class="ml10 color3">';
$out+=$escape(match.home);
$out+=' \r\n					';
 if (concede != 0) {
$out+='\r\n						<span class="colorred">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+='\r\n					';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<div class="size12 color9 fr">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<ul class="odds_list mt15">\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(recommendOdds["S"]);
$out+='</li>\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["P"]?'active':'');
$out+='">平局 ';
$out+=$escape(recommendOdds["P"]);
$out+='</li>\r\n				<li class="odds_item ';
$out+=$escape(recommendSelect["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(recommendOdds["F"]);
$out+='</li>\r\n			</ul>\r\n		</div>\r\n		';
 } else if (zjq.bettypeContent == 'ZJQ'){ 
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<div class="left_match fl">\r\n					[<span class="match_name">';
$out+=$escape(match.league);
$out+='</span>]\r\n					<span class="ml10 color3">';
$out+=$escape(match.home);
$out+=' \r\n					';
 if (concede != 0) {
$out+='\r\n						<span class="colorred">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+='\r\n					';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<div class="size12 color9 fr">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<ul class="odds_list mt15">\r\n				';
 for (var j = 0; j < zjqRecommend.length; j++) { 
$out+='\r\n				<li class="odds_item active">';
$out+=$escape(zjqRecommend[j]||'');
$out+='球 ';
$out+=$escape(zjqRecommendOdds[zjqRecommend[j]]);
$out+='</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n		';
 } 
$out+='\r\n';
 } else { 
$out+='\r\n	<div class="match_btn">赛事选择</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/expertList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.expertList=expertList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">专家列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<span class="select_box">\r\n					<select id="groupId"></select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="200">昵称</th>\r\n					<th width="200">姓名</th>\r\n					<th width="200">标签</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="expertList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function expertList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId || 0;
	var nickName = user.nickName || '';
	var realName = user.realName || '';
	var tag = user.tag;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			<a class="examine loginUser" userId="';
$out+=$escape(userId);
$out+='">登录</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/expertStatistics198',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.expertStatistics198=expertStatistics198;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">专家统计</h1>\r\n<div class="list_box">\r\n	<div>\r\n		<form onsubmit="return false;">\r\n			<div class="search_box">\r\n				<label for="planPrizeRateRank">\r\n					盈利率排名：\r\n					<input type="checkbox" id="planPrizeRateRank">\r\n				</label>\r\n				<span class="select_box ml20">\r\n					<select id="userId">\r\n						<option value="0">全部专家</option>\r\n						<option value="105">198足球</option>\r\n						<option value="1335">Sam</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n			</div>\r\n			<div id="searchBox">\r\n				<div class="search_box mt20">\r\n					<div class="sel_box" style="margin-left:0" id="dateType">\r\n						<span>日期格式:</span>\r\n						<label for="day" class="ml10">\r\n							<span>日</span>\r\n							<input type="radio" name="dateType" id="day" value="1">\r\n						</label>\r\n						<label for="month" class="ml10">\r\n							<span>月</span>\r\n							<input type="radio" name="dateType" id="month" value="2">\r\n						</label>\r\n					</div>\r\n					<input class="btn ml20" type="reset" value="重置" id="reset"/>\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n				<div class="search_box mt20" id="search_day"  style="display: none">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime"/>\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime"/>\r\n				</div>	\r\n				<div class="search_box mt20" id="search_month" style="display: none">\r\n					<div class="sel_box">\r\n						<span>开始年份:</span>\r\n						<span class="select_box">\r\n							<select id="beginYear">\r\n								<option value="">请选择</option>\r\n								<option value="2016">2016</option>\r\n								<option value="2017">2017</option>\r\n								<option value="2018">2018</option>\r\n								<option value="2019">2019</option>\r\n								<option value="2020">2020</option>\r\n								<option value="2021">2021</option>\r\n								<option value="2022">2022</option>\r\n								<option value="2023">2023</option>\r\n								<option value="2024">2024</option>\r\n								<option value="2025">2025</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n						<span>月份:</span>\r\n						<span class="select_box">\r\n							<select id="beginMonth">\r\n								<option value="">请选择</option>\r\n								<option value="01">1</option>\r\n								<option value="02">2</option>\r\n								<option value="03">3</option>\r\n								<option value="04">4</option>\r\n								<option value="05">5</option>\r\n								<option value="06">6</option>\r\n								<option value="07">7</option>\r\n								<option value="08">8</option>\r\n								<option value="09">9</option>\r\n								<option value="10">10</option>\r\n								<option value="11">11</option>\r\n								<option value="12">12</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n					</div>\r\n					--\r\n					<div class="sel_box">\r\n						<span>结束年份:</span>\r\n						<span class="select_box">\r\n							<select id="endYear">\r\n								<option value="">请选择</option>\r\n								<option value="2016">2016</option>\r\n								<option value="2017">2017</option>\r\n								<option value="2018">2018</option>\r\n								<option value="2019">2019</option>\r\n								<option value="2020">2020</option>\r\n								<option value="2021">2021</option>\r\n								<option value="2022">2022</option>\r\n								<option value="2023">2023</option>\r\n								<option value="2024">2024</option>\r\n								<option value="2025">2025</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n						<span>月份:</span>\r\n						<span class="select_box">\r\n							<select id="endMonth">\r\n								<option value="">请选择</option>\r\n								<option value="01">1</option>\r\n								<option value="02">2</option>\r\n								<option value="03">3</option>\r\n								<option value="04">4</option>\r\n								<option value="05">5</option>\r\n								<option value="06">6</option>\r\n								<option value="07">7</option>\r\n								<option value="08">8</option>\r\n								<option value="09">9</option>\r\n								<option value="10">10</option>\r\n								<option value="11">11</option>\r\n								<option value="12">12</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span></span>\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</form>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>昵称</th>\r\n					<th>姓名</th>\r\n					<th id="thDate">时间</th>\r\n					<th>场次</th>\r\n					<th>胜率</th>\r\n					<th>盈利率</th>\r\n					<th>购买数</th>\r\n					<th>购买金额</th>\r\n					<th>跟单数</th>\r\n					<th>跟单金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="expertStatistics198"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function expertStatistics198($data){return (function anonymous($data,$id
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
define('view/feedbackList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.feedbackList=feedbackList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">反馈列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" type="text" placeholder="用户" id="userName">\r\n				<input class="btn ml20" type="reset" placeholder="重置">\r\n				<input class="btn ml20" type="submit" placeholder="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="580">反馈内容</th>\r\n					<th width="140">时间</th>\r\n					<th width="70">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="feedbackList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function feedbackList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,feedback=$data.feedback,feedbackId=$data.feedbackId,nickName=$data.nickName,realName=$data.realName,content=$data.content,con=$data.con,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var feedback = list[i] || {};
	var feedbackId = feedback.feedbackId;
	var nickName = feedback.nickName;
	var realName = feedback.realName;
	var content = feedback.content;
	var con = content.substr(0,50);
	var createTime = feedback.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(con);
$out+='">';
$out+=$escape(con);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td><a class="examine feedbackDetail" feedbackId="';
$out+=$escape(feedbackId);
$out+='" content="';
$out+=$escape(con);
$out+='">查看</a></td>\r\n	</tr>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeChargeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.chargeList=chargeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">充值列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n					<span class="select_box ml20">\r\n						<select id="type">\r\n							<option value="0">全部</option>\r\n							<option value="1">用户充值</option>\r\n							<option value="2">平台充值</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="40">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="40">类型</th>\r\n					<th width="70">金额</th>\r\n					<th width="120">订单ID</th>\r\n					<th width="60">备注</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="chargeList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chargeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,charge=$data.charge,chargeId=$data.chargeId,nickName=$data.nickName,realName=$data.realName,orderId=$data.orderId,amount=$data.amount,type=$data.type,typeMap=$data.typeMap,remark=$data.remark,createTime=$data.createTime,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var charge = list[i] || {};
	var chargeId = charge.chargeId;
	var nickName = charge.nickName;
	var realName = charge.realName;
	var orderId = charge.orderId;
	var amount = charge.amount/100;
	var type = charge.type;
	var typeMap = {'1': '用户充值', '2': '平台充值'};
	var remark = charge.remark;
	var createTime = charge.createTime;
	var financeType = charge.financeType;
	var financeTypeMap = {'0': '方案','1': '出票'}

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeConsumeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.consumeList=consumeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">消费列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n					<span class="select_box ml20">\r\n						<select id="type">\r\n							<option value="0">全部</option>\r\n							<option value="1">现金消费</option>\r\n							<option value="2">充值消费</option>\r\n							<option value="3">收益消费</option>\r\n							<option value="4">优惠券消费</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n		\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="40">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="60">类型</th>\r\n					<th width="70">金额</th>\r\n					<th width="120">订单ID</th>\r\n					<th width="60">备注</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="consumeList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function consumeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,consume=$data.consume,consumeId=$data.consumeId,nickName=$data.nickName,realName=$data.realName,orderId=$data.orderId,amount=$data.amount,type=$data.type,typeMap=$data.typeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var consume = list[i] || {};
	var consumeId = consume.consumeId;
	var nickName = consume.nickName;
	var realName = consume.realName;
	var orderId = consume.orderId;
	var amount = consume.amount/100;
	var type = consume.type;
	var typeMap = {'1': '现金消费', '2': '充值消费', '3': '收益消费', '4': '优惠券消费'};
	var financeType = consume.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var remark = consume.remark;
	var createTime = consume.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='	\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeIncomeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.incomeList=incomeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">收益列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n					<input class="input_field ml20" placeholder="方案ID" id="planId"/>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="type">\r\n							<option value="0">全部</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="40">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="60">类型</th>\r\n					<th width="70">金额</th>\r\n					<th width="120">订单ID</th>\r\n					<th width="120">方案ID</th>\r\n					<th width="60">备注</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="incomeList"></tbody>			\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function incomeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,income=$data.income,incomeId=$data.incomeId,nickName=$data.nickName,realName=$data.realName,type=$data.type,typeMap=$data.typeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,amount=$data.amount,orderId=$data.orderId,planId=$data.planId,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var income = list[i] || {};
	var incomeId = income.incomeId;
	var nickName = income.nickName;
	var realName = income.realName;
	var type = income.type;
	var typeMap = {'0': {'1': '推荐收益', '2': '推广收益'}, '1': {'1': '中奖收益', '2': '分成收益'}};
	var financeType = income.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var amount = income.amount/100;
	var orderId = income.orderId;
	var planId = income.planId;
	var remark = income.remark;
	var createTime = income.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(typeMap[financeType][type]);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(planId);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='	\r\n';
 if(length > 0) { 
$out+='	\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeRecordList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.recordList=recordList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">流水列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n					<span class="select_box ml20" >\r\n						<select id="type">\r\n							<option value="0">全部</option>\r\n							<option value="1">消费</option>\r\n							<option value="2">收益</option>\r\n							<option value="3">提款</option>\r\n							<option value="4">充值</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<!-- 渠道先隐藏 -->\r\n					<span class="select_box ml20 hide">\r\n						<select id="channel">\r\n							<option value="0">全部</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="40">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="60">类型</th>\r\n					<th width="70">金额</th>\r\n					<th width="120">订单ID</th>\r\n					<th width="60">渠道</th>\r\n					<th width="60">备注</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="recordList"></tbody>						\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function recordList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,record=$data.record,recordId=$data.recordId,nickName=$data.nickName,realName=$data.realName,type=$data.type,typeMap=$data.typeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,amount=$data.amount,orderId=$data.orderId,channel=$data.channel,channelMap=$data.channelMap,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
		for (var i = 0; i < length; i++) {
		var record = list[i] || {};
		var recordId = record.recordId;
		var nickName = record.nickName;
		var realName = record.realName;
		var type = record.type;
		var typeMap = {'1': '消费', '2': '收益', '3': '提款', '4': '充值'};
		var financeType = record.financeType;
		var financeTypeMap = {'0': '方案', '1': '出票'};
		var amount = record.amount/100;
		var orderId = record.orderId;
		var channel = record.channel;
		var channelMap = {};
		var remark = record.remark;
		var createTime = record.createTime;
	
$out+='\r\n		<tr>\r\n			<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n			<td>';
$out+=$escape(nickName);
$out+='</td>\r\n			<td>';
$out+=$escape(realName);
$out+='</td>\r\n			<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n			<td>';
$out+=$escape(amount);
$out+='</td>\r\n			<td>';
$out+=$escape(orderId);
$out+='</td>\r\n			<td>';
$out+=$escape(channelMap[channel]);
$out+='</td>\r\n			<td>\r\n				';
 if (remark) { 
$out+='\r\n				<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n				';
 } 
$out+='\r\n			</td>\r\n			<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n		</tr>\r\n	';
 } 
$out+='\r\n	';
 if(length > 0) { 
$out+='	\r\n		<tr>\r\n			<td>总计</td>\r\n			<td></td>\r\n			<td></td>\r\n			<td></td>\r\n			<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n			<td></td>\r\n			<td></td>\r\n			<td></td>\r\n			<td></td>\r\n		</tr>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeTradeList',function(require,exports){var templateUtils = (function (){
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
define('view/financeTransferList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.transferList=transferList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">转账对账</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="提款id" id="withdrawId"/>\r\n					<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n					<input class="input_field ml20" placeholder="批次号" id="batchNo"/>\r\n					<input class="input_field ml20" placeholder="转账流水号" id="transferNo"/>\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<span class="select_box ml20">\r\n						<select id="status">\r\n							<option value="">全部</option>\r\n							<option value="0">转账中</option>\r\n							<option value="1">转账成功</option>\r\n							<option value="2">转账失败</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n		\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">资金账户</th>\r\n					<th width="60">状态</th>\r\n					<th width="50">金额</th>\r\n					<th width="60">提款id</th>\r\n					<th width="150">帐号</th>\r\n					<th width="100">账号名称</th>\r\n					<th width="150">用户</th>\r\n					<th width="130">批次号</th>\r\n					<th width="120">转账流水号</th>\r\n					<th width="120">转账时间</th>\r\n					<th width="60">备注</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="transferList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function transferList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,transfer=$data.transfer,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,withdrawId=$data.withdrawId,status=$data.status,statusMap=$data.statusMap,amount=$data.amount,accountNumber=$data.accountNumber,accountName=$data.accountName,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,batchNo=$data.batchNo,transferNo=$data.transferNo,transferTime=$data.transferTime,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var transfer = list[i] || {};
	var financeType = transfer.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var withdrawId = transfer.withdrawId;
	var status = transfer.status;
	var statusMap = {'0': '转账中', '1': '转账成功', '2': '转账失败'};
	var amount = transfer.amount/100;
	var accountNumber = transfer.accountNumber;
	var accountName = transfer.accountName;
	var nickName = transfer.nickName;
	var realName = transfer.realName;
	var userName = nickName;
	if (realName != '') {
		userName += '('+realName+')';
	}
	var batchNo = transfer.batchNo;
	var transferNo = transfer.transferNo;
	var transferTime = transfer.transferTime;
	var remark = transfer.remark;
	var createTime = transfer.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(withdrawId);
$out+='</td>\r\n		<td>';
$out+=$escape(accountNumber);
$out+='</td>\r\n		<td>';
$out+=$escape(accountName);
$out+='</td>\r\n		<td>';
$out+=$escape(userName);
$out+='</td>\r\n		<td>';
$out+=$escape(batchNo);
$out+='</td>\r\n		<td>';
$out+=$escape(transferNo);
$out+='</td>\r\n		<td class="time">';
$out+=$escape(transferTime!='0000-00-00 00:00:00'?transferTime:createTime);
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
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeWithdrawList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.withdrawList=withdrawList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">提款列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box ">\r\n					<input class="input_field" placeholder="用户" id="userName"/>\r\n					<span class="select_box ml20">\r\n						<select id="status">\r\n							<option value="0">全部</option>\r\n							<option value="1">未审核</option>\r\n							<option value="2">已审核</option>\r\n							<option value="3">已打款</option>\r\n							<option value="4">已拒绝</option>\r\n							<option value="5">打款中</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="accountType">\r\n						<!-- <option>账号类型</option> -->\r\n							<option value="0">全部</option>\r\n							<option value="1">微信</option>\r\n							<option value="2">支付宝</option>\r\n							<option value="3">银行卡</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="financeType">\r\n							<option value="">全部</option>\r\n							<option value="0">方案账户</option>\r\n							<option value="1">出票账户</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					\r\n				</div>\r\n				<div class="mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置" />\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">提款id</th>\r\n					<th width="50">资金账户</th>\r\n					<th width="120">昵称</th>\r\n					<th width="60">姓名</th>\r\n					<th width="50">金额</th>\r\n					<th width="60">状态</th>\r\n					<th width="60">账号类型</th>\r\n					<th width="160">账号</th>\r\n					<th width="80">账号名称</th>\r\n					<th width="60">开户姓名</th>\r\n					<th width="80">分行信息</th>\r\n					<th width="60">备注</th>\r\n					<th width="120">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="withdrawList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function withdrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,withdraw=$data.withdraw,withdrawId=$data.withdrawId,nickName=$data.nickName,realName=$data.realName,amount=$data.amount,status=$data.status,statusMap=$data.statusMap,accountType=$data.accountType,accountTypeMap=$data.accountTypeMap,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,accountNumber=$data.accountNumber,accountName=$data.accountName,accountUserName=$data.accountUserName,accountInfo=$data.accountInfo,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; var length = list.length;
	for (var i = 0; i < length; i++) {
	var withdraw = list[i] || {};
	var withdrawId = withdraw.withdrawId;
	var nickName = withdraw.nickName;
	var realName = withdraw.realName;
	var amount = withdraw.amount/100;
	var status = withdraw.status;
	var statusMap = {'1': '未审核', '2': '已审核', '3': '已打款', '4': '已拒绝', '5': '打款中'};
	var accountType = withdraw.accountType;
	var accountTypeMap = {'1': '微信', '2': '支付宝', '3': '银行卡'};
	var financeType = withdraw.financeType;
	var financeTypeMap = {'0': '方案', '1': '出票'};
	var accountNumber = withdraw.accountNumber;
	var accountName = withdraw.accountName;
	var accountUserName = withdraw.accountUserName;
	var accountInfo = withdraw.accountInfo;
	var remark = withdraw.remark;
	var createTime = withdraw.createTime;

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
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/financeWithdrawVerifyList',function(require,exports){var templateUtils = (function (){
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
define('view/glmj10OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj10OrderList=glmj10OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj10OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj10OrderList($data){return (function anonymous($data,$id
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
define('view/glmj10UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj10UserList=glmj10UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj10UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj10UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj1OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj1OrderList=glmj1OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj1OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj1OrderList($data){return (function anonymous($data,$id
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
define('view/glmj1UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj1UserList=glmj1UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj1UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj1UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj2OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj2OrderList=glmj2OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj2OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj2OrderList($data){return (function anonymous($data,$id
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
define('view/glmj2UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj2UserList=glmj2UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj2UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj2UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj3OrderList',function(require,exports){var templateUtils = (function (){
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
define('view/glmj3UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj3UserList=glmj3UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj3UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj3UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj4OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj4OrderList=glmj4OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj4OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj4OrderList($data){return (function anonymous($data,$id
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
define('view/glmj4UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj4UserList=glmj4UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj4UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj4UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj5OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj5OrderList=glmj5OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj5OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj5OrderList($data){return (function anonymous($data,$id
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
define('view/glmj5UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj5UserList=glmj5UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj5UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj5UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj6OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj6OrderList=glmj6OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj6OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj6OrderList($data){return (function anonymous($data,$id
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
define('view/glmj6UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj6UserList=glmj6UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj6UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj6UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj7OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj7OrderList=glmj7OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj7OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj7OrderList($data){return (function anonymous($data,$id
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
define('view/glmj7UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj7UserList=glmj7UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj7UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj7UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj8OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj8OrderList=glmj8OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj8OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj8OrderList($data){return (function anonymous($data,$id
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
define('view/glmj8UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj8UserList=glmj8UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj8UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj8UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmj9OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj9OrderList=glmj9OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj9OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj9OrderList($data){return (function anonymous($data,$id
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
define('view/glmj9UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmj9UserList=glmj9UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmj9UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmj9UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/glmjOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmjOrderList=glmjOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmjOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmjOrderList($data){return (function anonymous($data,$id
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
define('view/glmjUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.glmjUserList=glmjUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="glmjUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function glmjUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/groupList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.groupList=groupList;exports.editGroup=editGroup;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户分组</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>全部</option>\r\n						<option value="1">上架</option>\r\n						<option value="0">下架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增分组" id="createGroup"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>分组名</th>\r\n					<th>上下架</th>\r\n					<th>创建时间</th>\r\n					<th width="260">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="groupList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function groupList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,group=$data.group,groupId=$data.groupId,name=$data.name,publish=$data.publish,publishMap=$data.publishMap,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var group = list[i] || {};
	var groupId = group.groupId;
	var name = group.name;
	var publish = group.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var createTime = group.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(name);
$out+='">';
$out+=$escape(name);
$out+='</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 groupUser" groupId="';
$out+=$escape(groupId);
$out+='">查看用户</a>\r\n			<a class="examine mr5 editGroup" groupId="';
$out+=$escape(groupId);
$out+='">修改</a>\r\n			<a class="examine mr5 modifySort" groupId="';
$out+=$escape(groupId);
$out+='" type="1">上移</a>\r\n			<a class="examine mr5 modifySort" groupId="';
$out+=$escape(groupId);
$out+='" type="2">下移</a>\r\n			<a class="examine mr5 modifySort" groupId="';
$out+=$escape(groupId);
$out+='" type="3">置顶</a>\r\n			<a class="examine modifySort" groupId="';
$out+=$escape(groupId);
$out+='" type="4">置底</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editGroup($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,groupId=$data.groupId,$out='';$out+='<h1>';
$out+=$escape(title);
$out+='</h1>\r\n	<input type="hidden" id="editGroupId" value="';
$out+=$escape(groupId);
$out+='"/>\r\n	<div class="mt20">分组名：<input class="input_field ml5" placeholder="请输入分组名" id="editName"/></div>\r\n	<div class="mt20">\r\n		上下架：\r\n		<span class="select_box">\r\n			<select id="editPublish">\r\n				<option value="1">上架</option>\r\n				<option value="0">下架</option>\r\n			</select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelEditGroup"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureEditGroup"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/groupUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.groupUserList=groupUserList;exports.createGroupUser=createGroupUser;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title" id="title"></h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName" />\r\n				<span class="select_box ml20">\r\n					<select id="userRight">\r\n						<option value="0">全部</option>\r\n						<option value="1">专家</option>\r\n						<option value="2">推手</option>\r\n						<option value="3">站长</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索"  id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增分组用户" id="createGroupUserBtn">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="200">昵称</th>\r\n					<th width="100">姓名</th>\r\n					<th width="80">类型</th>\r\n					<th>标签</th>\r\n					<th width="200">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="groupUserList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function groupUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,userRight=$data.userRight,userRightMap=$data.userRightMap,tag=$data.tag,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId;
	var nickName = user.nickName;
	var realName = user.realName;
	var userRight = user.userRight;
	var userRightMap = {'1': '专家', '2': '推手', '3': '站长'};
	var tag = user.tag;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(userRightMap[userRight]);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			<a class="examine mr5 deleteGroupUser" userId="';
$out+=$escape(userId);
$out+='" nickName="';
$out+=$escape(nickName);
$out+='" realName="';
$out+=$escape(realName);
$out+='">移除</a>\r\n			<a class="examine mr5 modifyGroupUserSort" userId="';
$out+=$escape(userId);
$out+='" type="1">上移</a>\r\n			<a class="examine mr5 modifyGroupUserSort" userId="';
$out+=$escape(userId);
$out+='" type="2">下移</a>\r\n			<a class="examine mr5 modifyGroupUserSort" userId="';
$out+=$escape(userId);
$out+='" type="3">置顶</a>\r\n			<a class="examine modifyGroupUserSort" userId="';
$out+=$escape(userId);
$out+='" type="4">置底</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function createGroupUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1>新增分组用户</h1>\r\n	<div class="search_box mt10">\r\n		<form onsubmit="return false;">\r\n			<input class="input_field" placeholder="输入查找用户" id="cUserName"/>\r\n			<input class="btn ml20" type="submit" value="搜索"  id="cSearchSubmit"/>\r\n		</form>\r\n	</div>\r\n	<div class="rightBox mt10" style="min-height: auto">\r\n		<div class="table_box" style="min-height: auto">\r\n			<table>\r\n				<thead>\r\n					<tr>\r\n						<th>昵称</th>\r\n						<th width="80">姓名</th>\r\n						<th width="50">类型</th>\r\n						<th width="50">操作</th>\r\n					</tr>\r\n				</thead>\r\n				<tbody id="userList"></tbody>					\r\n			</table>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,userRight=$data.userRight,userRightMap=$data.userRightMap,$escape=$helpers.$escape,$out=''; 
	var length = list.length;
	if (length > 0) { 

$out+='\r\n	';
 for (var i = 0; i < length; i++) {
		var user = list[i] || {};
		var userId = user.userId;
		var nickName = user.nickName;
		var realName = user.realName;
		var userRight = user.userRight;
		var userRightMap = {'1': '专家', '2': '推手', '3': '站长'};
	
$out+='\r\n		<tr>\r\n			<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n			<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n			<td>';
$out+=$escape(userRightMap[userRight]);
$out+='</td>\r\n			<td>\r\n				<a class="examine mr5 createGroupUser" userId="';
$out+=$escape(userId);
$out+='" nickName="';
$out+=$escape(nickName);
$out+='" realName="';
$out+=$escape(realName);
$out+='">新增</a>\r\n			</td>\r\n		</tr>\r\n	';
 } 
$out+='\r\n';
 } else { 
$out+='\r\n	<tr>\r\n		<td colspan="4">空空如也</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/guideList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.guideList=guideList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">引导列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="引导人" id="guideUserName">\r\n				<input class="input_field ml20" placeholder="访问人" id="accessUserName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="140">引导人昵称</th>\r\n					<th width="80">引导人姓名</th>\r\n					<th width="140">访问人昵称</th>\r\n					<th width="80">访问人姓名</th>\r\n					<th width="180">访问页面</th>\r\n					<th width="100">访问次数</th>\r\n					<th width="140">初次访问时间</th>\r\n					<th width="140">最近访问时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="guideList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function guideList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,guide=$data.guide,guideId=$data.guideId,guideNickName=$data.guideNickName,guideRealName=$data.guideRealName,accessNickName=$data.accessNickName,accessRealName=$data.accessRealName,accessPage=$data.accessPage,accessPageMap=$data.accessPageMap,accessCount=$data.accessCount,createTime=$data.createTime,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var guide = list[i] || {};
	var guideId = guide.guideId;
	var guideNickName = guide.guideNickName;
  var guideRealName = guide.guideRealName;
  var accessNickName = guide.accessNickName;
  var accessRealName = guide.accessRealName;
  var accessPage = guide.accessPage;
	var accessPageMap = { 'charge': '充值', 'chargeList': '充值记录', 'editPlan': '发起推荐', 'home': '主页', 'hotMatch': '热门赛事', 'hotMatchDetail': '热门赛事详情页', 'jxzpComboList': '极限追盘多玩法', 'jxzpList': '极限追盘', 'match': '发起推荐-选择类型', 'matchMoreBettype': '发起推荐-选择类型-更多玩法', 'my': '个人页面', 'planDetail': '推荐详情', 'smlrComboList': '晒米冷热购买/详情', 'smlrList': '晒米冷热', 'userDetail': '专家头像列表', 'userList': '专家赛事列表', 'userVerify': '申请专家/站长', 'userVerifyProtocol': '专家/站长协议', 'withdraw': '收米', 'withdrawList': '提款记录', 'girlPlan': '美女推波', 'activity/hongBao': '红包页面'};
	var accessCount = guide.accessCount;
	var createTime = guide.createTime;
	var lastTime = guide.lastTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(guideNickName);
$out+='</td>\r\n    <td>';
$out+=$escape(guideRealName);
$out+='</td>\r\n    <td>';
$out+=$escape(accessNickName);
$out+='</td>\r\n    <td>';
$out+=$escape(accessRealName);
$out+='</td>\r\n		<td>';
$out+=$escape(accessPageMap[accessPage]);
$out+='</td>\r\n		<td>';
$out+=$escape(accessCount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/index',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/jxzpList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.jxzpList=jxzpList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">极限追盘</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="球队名称" id="teamName"/>\r\n				<span class="select_box ml20">\r\n					<select id="type">\r\n						<option value="0">全部</option>\r\n						<option value="1">胜平负</option>\r\n						<option value="2">输赢盘</option>\r\n						<option value="3">大小球</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="status">\r\n						<option value="0">全部</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>全部</option>\r\n						<option value="1">上架</option>\r\n						<option value="0">下架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增极限数据" id="addJxzp"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">类型</th>\r\n					<th width="100">球队名称</th>\r\n					<th>比赛</th>\r\n					<th width="60">状态</th>\r\n					<th width="60">近期数</th>\r\n					<th width="60">历史数</th>\r\n					<th width="60">上下架</th>\r\n					<th width="140">失效时间</th>\r\n					<th width="140">创建时间</th>\r\n					<th width="90">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="jxzpList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,jxzp=$data.jxzp,jxzpId=$data.jxzpId,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,publish=$data.publish,publishMap=$data.publishMap,closeTime=$data.closeTime,createTime=$data.createTime,match=$data.match,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var jxzp = list[i] || {};
	var jxzpId = jxzp.jxzpId;
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away; 
	var beginTime = jxzp.beginTime && jxzp.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = jxzp.recentContinue;
	var historyContinue = jxzp.historyContinue;
	var publish = jxzp.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var closeTime = jxzp.closeTime;
	var createTime = jxzp.createTime;
	var match = "["+league+"] "+home+" vs "+away+"("+beginTime+")";

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(teamName);
$out+='</td>\r\n		<td title="';
$out+=$escape(match);
$out+='">';
$out+=$escape(match);
$out+='</td>\r\n		<td>';
$out+=$escape(statusMap[type][status]);
$out+='</td>\r\n		<td>';
$out+=$escape(recentContinue);
$out+='</td>\r\n		<td>';
$out+=$escape(historyContinue);
$out+='</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>';
$out+=$escape(closeTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine modify" jxzpId="';
$out+=$escape(jxzpId);
$out+='">修改</a>\r\n			<a class="examine publish" jxzpId="';
$out+=$escape(jxzpId);
$out+='" publish="';
$out+=$escape(publish==1?0:1);
$out+='">';
$out+=$escape(publish==1?'下架':'上架');
$out+='</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/launchList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.launchList=launchList;exports.editLaunch=editLaunch;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">启动图列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<span class="select_box">\r\n					<select id="type">\r\n						<!--<option>类型</option>-->\r\n						<option value="1">android</option>\r\n						<option value="2">ios</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>全部</option>\r\n						<option value="1">上架</option>\r\n						<option value="0">下架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>尺寸</option>\r\n						<option value="1">2X</option>\r\n						<option value="0">3X</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="添加启动图" id="createLaunchImg">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<thead>\r\n					<tr>\r\n						<th width="80">类型</th>\r\n						<th width="80">上下架</th>\r\n						<th width="80">尺寸</th>\r\n						<th width="100">图片</th>\r\n						<th width="640">链接地址</th>\r\n						<th width="200">操作</th>\r\n					</tr>\r\n				</thead>\r\n			</thead>\r\n			<tbody id="launchList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function launchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,launch=$data.launch,launchId=$data.launchId,link=$data.link,resourceList=$data.resourceList,publish=$data.publish,publishMap=$data.publishMap,type=$data.type,typeMap=$data.typeMap,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var launch = list[i] || {};
	var launchId = launch.launchId;
	var link = launch.link;
	var resourceList = launch.resourceList[0] || '';
	var publish = launch.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var type = launch.type;
	var typeMap = {'0': 'h5', '1': 'android', '2': 'ios'};
	var createTime = launch.createTime;

$out+='\r\n	<tr launchId="';
$out+=$escape(launchId);
$out+='">\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>2X</td>\r\n		<td>\r\n			<img class="" src="';
$out+=$escape(resourceList);
$out+='" alt="" style="width: 100%;vertical-align: middle;"/>\r\n		</td>\r\n		<td class="banner_url_wrap"><a class="examine" href="';
$out+=$escape(link);
$out+='" target="_blank">';
$out+=$escape(link);
$out+='</a></td>\r\n		<td>\r\n			<a class="examine mr5 editLaunch" launchId="';
$out+=$escape(launchId);
$out+='">修改</a>\r\n			<a class="examine mr5 modifySort modifyUp" launchId="';
$out+=$escape(launchId);
$out+='" type="1">上移</a>\r\n			<a class="examine mr5 modifySort modifyDown" launchId="';
$out+=$escape(launchId);
$out+='" type="2">下移</a>\r\n			';
if (publish == 0) { 
$out+='\r\n			<a class="examine mr5 publishLaunch" launchId="';
$out+=$escape(launchId);
$out+='" publish="1">上架</a>\r\n			';
 } else if (publish == 1){ 
$out+='\r\n			<a class="examine mr5 publishLaunch" launchId="';
$out+=$escape(launchId);
$out+='" publish="0">下架</a>\r\n			';
 } 
$out+='\r\n			<a class="examine mr5 deleteLaunch" launchId="';
$out+=$escape(launchId);
$out+='">删除</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editLaunch($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,title=$data.title,launchId=$data.launchId,$out='';$out+='<div id="editLaunchBox">\r\n		<div class="mask"></div>\r\n		<div class="compile_img_box">\r\n			<div class="compile_head">\r\n				<span class="compile_head_title">';
$out+=$escape(title);
$out+='</span>\r\n				<a class="close_compile_btn" id="closeEditLaunch">\r\n					<span></span>\r\n				</a>\r\n			</div>\r\n			<div class="compile_cont">\r\n				<div class="pt15 pb15">\r\n					<div class="file_select_box" id="fileSelectBox">\r\n						点击选择图片\r\n						<input id="fileSelect" name="file" type="file" />\r\n					</div>\r\n				</div>\r\n				<input type="hidden" id="editLaunchId" value="';
$out+=$escape(launchId);
$out+='" />\r\n				<div id="previewImg"></div>\r\n				<ul>\r\n					<li>\r\n						<span class="input_tit">链接地址</span><input id="editLink" type="text" />\r\n					</li>\r\n					<li>\r\n						<span class="input_tit">类&emsp;&emsp;型</span>\r\n						<span class="select_box">\r\n							<select id="editType">\r\n								<option>类型</option>\r\n								<option value="1">android</option>\r\n								<option value="2">ios</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span>\r\n						</span>\r\n					</li>\r\n					<li>\r\n						<span class="input_tit">尺&emsp;&emsp;寸</span>\r\n						<span class="select_box">\r\n							<select id="editType">\r\n								<option>尺寸</option>\r\n								<option value="1">2X</option>\r\n								<option value="2">3X</option>\r\n							</select>\r\n							<span class="icon_sel"><span class="arrow_down"></span>\r\n						</span>\r\n					</li>\r\n				</ul>\r\n				<div class="compile_btn_wrap">\r\n					<span class="ensure_btn" id="sureEditLaunch">确定</span>\r\n					<span class="cancle_btn" id="cancelEditLaunch">取消</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ll6OrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ll6OrderList=ll6OrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ll6OrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ll6OrderList($data){return (function anonymous($data,$id
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
define('view/ll6UserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ll6UserList=ll6UserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ll6UserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ll6UserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/login',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="oprate_box">\r\n        <form onsubmit="return false;">\r\n            <h1 class="title" style="border:0">管理员登录</h1>\r\n            <input class="input_field mt30" type="text" placeholder="账号" id="loginName"/><br/>\r\n            <input class="input_field mt30" type="password" placeholder="密码" id="password"/><br/>\r\n            <input class="btn mt30" type="submit" value="登录" id="loginSubmit"/>\r\n        </form>\r\n    </div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/lxscOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.lxscOrderList=lxscOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="lxscOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function lxscOrderList($data){return (function anonymous($data,$id
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
define('view/lxscUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.lxscUserList=lxscUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="lxscUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function lxscUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/main',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.menuList=menuList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,className=$data.className,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="container ';
$out+=$escape(className);
$out+='" id="pageContainer">\r\n    <div class="header clearfix" id="pageHeader">\r\n        <div class="header_left">\r\n            <img class="icon_log" src="';
$out+=$escape(IMG_PATH);
$out+='icon_log.png" href="#index"><span class="header_title">后台管理</span>\r\n        </div>\r\n        <div class="header_right" style="display:none" id="loginUserInfoBox">\r\n            <span class="icon_default_head"></span><span class="ml10" id="loginUserName"></span>\r\n            <span class="modifyPsd" href="#password">修改密码</span>\r\n            <span class="exit" href="#login&unlogin=true">退出</span>\r\n        </div>\r\n    </div>      \r\n    <div class="content mt10 clearfix">\r\n        <div class="leftBox fl" id="pageMenu" style="display:none">\r\n            <ul id="menuList"></ul>\r\n        </div>\r\n        <div class="rightBox" id="pageContent"></div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function menuList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,keys=$data.keys,Object=$data.Object,menuMap=$data.menuMap,a=$data.a,b=$data.b,ret=$data.ret,j=$data.j,len=$data.len,parentMenuName=$data.parentMenuName,$escape=$helpers.$escape,list=$data.list,i=$data.i,length=$data.length,menu=$data.menu,menuName=$data.menuName,href=$data.href,activeHref=$data.activeHref,$out='';
    var keys = Object.keys(menuMap);
    keys.sort(function (a, b) {
        var ret = 0;
        if (a == '后台管理') {
            ret = 1;
        }
        return ret;
    });
    for(var j = 0, len = keys.length; j < len; j++) {
        var parentMenuName = keys[j] || '';

$out+='\r\n<li>\r\n    <div class="menu_one"><span class="icon_menu icon_content"></span>';
$out+=$escape(parentMenuName);
$out+='</div>\r\n    <div class="menu_two_box clearfix">\r\n    ';

        var list = menuMap[parentMenuName] || [];
        for(var i = 0, length = list.length; i < length; i++) {
            var menu = list[i] || {};
            var menuName = menu.menuName || '';
            var href = menu.path || '';
            var activeHref = href;
            if (href == '#activityList') {
                activeHref = '#(activityList|activityHongBaoList|activityTurnplateList|activityChargeList)';
            } else if (href == '#groupList') {
                activeHref = '#(groupList|groupUserList)';
            }
    
$out+='\r\n        <div class="menu_two" href="';
$out+=$escape(href);
$out+='" activeHref="';
$out+=$escape(activeHref);
$out+='"><span class="act_bar"></span><span class="item">';
$out+=$escape(menuName);
$out+='</span></div>\r\n        ';
}
$out+='\r\n    </div>\r\n</li>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/matchList',function(require,exports){var templateUtils = (function (){
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
define('view/mfspOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.mfspOrderList=mfspOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="mfspOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mfspOrderList($data){return (function anonymous($data,$id
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
define('view/mfspUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.mfspUserList=mfspUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="mfspUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mfspUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myappOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.myappOrderList=myappOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="myappOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function myappOrderList($data){return (function anonymous($data,$id
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
	var orderTypeMap = {'0': '方案订单','1': '充值订单','2': '套餐订单','3': '出票订单','4': '彩金充值订单','5': '晒米冷热','6': '极限追盘'};
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
$out+=$escape(orderType==0?planPrizeStatusMap[planPrizeStatus]:'');
$out+='</td>\r\n		<td>';
$out+=$escape(orderType==3?ticketStatusMap[ticketStatus]:'');
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
define('view/myappUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.myappUserList=myappUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="myappUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function myappUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/orderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.orderList=orderList;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n			<input class="input_field ml20" placeholder="推广人" id="spreaderUserName"/>\r\n			<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n			<input class="input_field ml20" placeholder="方案ID" id="planId"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">全部</option>\r\n					<option value="0">方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">冠亚军竞猜订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">全部(方案)</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">全部(出票)</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n					<option value="9">待开售</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">全部</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">全部</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">全部</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="source">\r\n					<option value="">来源(全部)</option>\r\n					<option value="0">h5</option>\r\n					<option value="1">android</option>\r\n					<option value="2">ios</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="channel"></select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="150">推广人</th>\r\n					<th width="70">金额</th>\r\n					<th width="70">订单ID</th>\r\n					<th width="70">方案ID</th>\r\n					<th width="80">来源</th>\r\n					<th width="80">渠道</th>\r\n					<th width="60">备注</th>\r\n					<th width="140">时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="orderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderList($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,orderListId=$data.orderListId,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,planNickName=$data.planNickName,planRealName=$data.planRealName,planUserName=$data.planUserName,spreaderNickName=$data.spreaderNickName,spreaderRealName=$data.spreaderRealName,spreaderUserName=$data.spreaderUserName,amount=$data.amount,orderId=$data.orderId,planId=$data.planId,orderType=$data.orderType,orderTypeMap=$data.orderTypeMap,status=$data.status,statusMap=$data.statusMap,planPrizeStatus=$data.planPrizeStatus,planPrizeStatusMap=$data.planPrizeStatusMap,ticketStatus=$data.ticketStatus,ticketStatusMap=$data.ticketStatusMap,source=$data.source,sourceMap=$data.sourceMap,channel=$data.channel,channelMap=$data.channelMap,remark=$data.remark,createTime=$data.createTime,$escape=$helpers.$escape,totalAmount=$data.totalAmount,$out=''; 
var length = list.length;
for (var i = 0; i < length; i++) {
	var order = list[i] || {};
	var orderListId = order.orderListId;
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
	var spreaderNickName = order.spreaderNickName;
	var spreaderRealName = order.spreaderRealName;
	var spreaderUserName = spreaderNickName;
	if (spreaderRealName != '') {
		spreaderUserName += '('+spreaderRealName+')';
	}
	var amount = order.amount/100;
	var orderId = order.orderId;
	var planId = order.planId;
	var orderType = order.orderType;
	var orderTypeMap = {'0': '方案订单','1': '充值订单','2': '套餐订单','3': '出票订单','4': '彩金充值订单','5': '晒米冷热','6': '极限追盘'};
	var status = order.status;
	var statusMap = {'1': '未付款', '2': '已付款', '3': '已退款', '4': '部分退款'};
	var planPrizeStatus = order.planPrizeStatus;
	var planPrizeStatusMap = {'0': '未开奖','1': '已中奖','2': '未中奖'};
	var ticketStatus =  order.ticketStatus;
	var ticketStatusMap = {'0': '未出票', '1': '出票失败', '2': '已出票待开奖', '3': '未中奖', '4': '已中奖', '5': '已派奖', '6': '部分派奖', '7': '出票中', '8': '部分出票', '9': '待开售'};
	var source = order.source;
	var sourceMap = {'0': 'h5','1': 'android','2': 'ios'};
	var channel = order.channel;
	var channelMap = {'0': '平台','1': '应用宝','2': '全民夺宝','3': '老徐说彩','4': '蜜蜂视频','5': '玉琳玩彩','-1': '红包充值','-2': '体彩'};
	var remark = order.remark;
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
$out+=$escape(spreaderUserName);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(orderId);
$out+='</td>\r\n		<td>';
$out+=$escape(planId);
$out+='</td>\r\n		<td>';
$out+=$escape(sourceMap[source]);
$out+='</td>\r\n		<td>';
$out+=$escape(channelMap[channel]);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if (length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td>';
$out+=$escape(totalAmount/100);
$out+='</td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n		<td></td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/password',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="oprate_box">\r\n		<form onsubmit="return false;">\r\n			<h1 class="title" style="border:0">修改密码</h1>\r\n			<input class="input_field mt30" type="password" placeholder="旧密码" id="oldPassword"/><br/>\r\n			<input class="input_field mt30" type="password" placeholder="新密码" id="newPassword"/><br/>\r\n			<input class="input_field mt30" type="password" placeholder="再次输入密码" id="againNewPassword"/><br/>\r\n			<input class="btn mt30" type="submit" value="确认" id="passwordSubmit"/><br/>\r\n			<input class="btn back" type="button" value="返回" onclick="history.back()" />\r\n		</form>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/planList',function(require,exports){var templateUtils = (function (){
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
define('view/qmdbOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.qmdbOrderList=qmdbOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="qmdbOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function qmdbOrderList($data){return (function anonymous($data,$id
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
	var orderTypeMap = {'0': '方案订单','1': '充值订单','2': '套餐订单','3': '出票订单','4': '彩金充值订单','5': '晒米冷热','6': '极限追盘'};
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
$out+=$escape(orderType==0?planPrizeStatusMap[planPrizeStatus]:'');
$out+='</td>\r\n		<td>';
$out+=$escape(orderType==3?ticketStatusMap[ticketStatus]:'');
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
define('view/qmdbUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.qmdbUserList=qmdbUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="qmdbUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function qmdbUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/replayList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.replayList=replayList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">复盘列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="标题" id="title"/>\r\n				<input class="input_field ml20" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="复盘ID" id="replayId">\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option value="">全部</option>\r\n						<option value="0">下架</option>\r\n						<option value="1">上架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="70">复盘ID</th>\r\n					<th width="120">标题</th>\r\n					<th width="120">复盘图片</th>\r\n					<th width="120">内容</th>\r\n					<th width="50">上下架</th>\r\n					<th width="50">阅读数</th>\r\n					<th width="50">点赞数</th>\r\n					<th width="50">鄙视数</th>\r\n					<th width="50">分享数</th>\r\n					<th width="140">时间</th>\r\n					<th width="155">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="replayList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function replayList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,replay=$data.replay,nickName=$data.nickName,realName=$data.realName,replayId=$data.replayId,title=$data.title,readCount=$data.readCount,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,publish=$data.publish,publishMap=$data.publishMap,resourceList=$data.resourceList,content=$data.content,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var replay = list[i] || {};
	var nickName = replay.nickName;
	var realName = replay.realName;
	var replayId = replay.replayId;
	var title = replay.title;
	var readCount = replay.readCount;
	var upCount = replay.upCount;
	var downCount = replay.downCount;
	var shareCount = replay.shareCount;
	var publish = replay.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var resourceList = replay.resourceList || [];
	resourceList = resourceList.join('|');
	var content = replay.content;
	var createTime = replay.createTime;

$out+='\r\n	<tr replayId="';
$out+=$escape(replayId);
$out+='">\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(replayId);
$out+='</td>\r\n		<td title="';
$out+=$escape(title);
$out+='">\r\n			';
 if (title) { 
$out+='\r\n			<a class="examine" title="';
$out+=$escape(title);
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
$out+='</td>\r\n		<td>\r\n			<a class="examine deleteReplay" replayId="';
$out+=$escape(replayId);
$out+='">删除</a>\r\n			<a class="examine ml5 publish" replayId="';
$out+=$escape(replayId);
$out+='" publish="';
$out+=$escape(publish==1?0:1);
$out+='">';
$out+=$escape(publish==1?'下架':'上架');
$out+='</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/stationDepositList',function(require,exports){var templateUtils = (function (){
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
define('view/statisticsAmountList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.statisticsAmountList=statisticsAmountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">价格统计</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="btn" type="submit" value="刷新" id="searchSubmit" />\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>价格</th>\r\n					<th>场次(占比)</th>\r\n					<th>购买数(占比)</th>\r\n					<th>购买金额(占比)</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsAmountList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsAmountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,statisticsAmount=$data.statisticsAmount,amount=$data.amount,planCount=$data.planCount,planOrderCount=$data.planOrderCount,planOrderAmount=$data.planOrderAmount,planCountPercent=$data.planCountPercent,totalPlanCount=$data.totalPlanCount,$=$data.$,g=$data.g,planOrderCountPercent=$data.planOrderCountPercent,totalPlanOrderCount=$data.totalPlanOrderCount,planOrderAmountPercent=$data.planOrderAmountPercent,totalPlanOrderAmount=$data.totalPlanOrderAmount,$escape=$helpers.$escape,$out=''; 
	var length = list.length;
	for (var i = 0; i < length; i++) {
	var statisticsAmount = list[i] || {};
	var amount = (statisticsAmount.amount || 0)/100;
	var planCount = statisticsAmount.planCount;
	var planOrderCount = statisticsAmount.planOrderCount || 0;
	var planOrderAmount = (statisticsAmount.planOrderAmount || 0)/100 ;
	var planCountPercent = (planCount*100/totalPlanCount).toFixed(2) + '';//转变成字符串
	planCountPercent = planCountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00
	var planOrderCountPercent = (planOrderCount*100/totalPlanOrderCount).toFixed(2) + '';//转变成字符串
	planOrderCountPercent = planOrderCountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00
	var planOrderAmountPercent = (planOrderAmount*100/totalPlanOrderAmount).toFixed(2) + '';//转变成字符串
	planOrderAmountPercent = planOrderAmountPercent.replace(/\.0+$/g, '') + '%';//删除末尾是.00

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(amount);
$out+='</td>\r\n		<td>';
$out+=$escape(planCount);
$out+='(';
$out+=$escape(planCountPercent);
$out+=')</td>\r\n		<td>';
$out+=$escape(planOrderCount);
$out+='(';
$out+=$escape(planOrderCountPercent);
$out+=')</td>\r\n		<td>';
$out+=$escape(planOrderAmount);
$out+='(';
$out+=$escape(planOrderAmountPercent);
$out+=')</td>\r\n	</tr>\r\n';
 } 
$out+='\r\n';
 if(length > 0) { 
$out+='\r\n	<tr>\r\n		<td>总计</td>\r\n		<td>';
$out+=$escape(totalPlanCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalPlanOrderCount);
$out+='</td>\r\n		<td>';
$out+=$escape(totalPlanOrderAmount);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/statisticsDateList',function(require,exports){var templateUtils = (function (){
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
define('view/statisticsMonthList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.statisticsMonthList=statisticsMonthList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">月份统计</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="sel_box">\r\n					<span>开始年份:</span>\r\n					<span class="select_box" id="beginYear">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="2016">2016</option>\r\n							<option value="2017">2017</option>\r\n							<option value="2018">2018</option>\r\n							<option value="2019">2019</option>\r\n							<option value="2020">2020</option>\r\n							<option value="2021">2021</option>\r\n							<option value="2022">2022</option>\r\n							<option value="2023">2023</option>\r\n							<option value="2024">2024</option>\r\n							<option value="2025">2025</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span>月份:</span>\r\n					<span class="select_box" id="beginMonth">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="1">1</option>\r\n							<option value="2">2</option>\r\n							<option value="3">3</option>\r\n							<option value="4">4</option>\r\n							<option value="5">5</option>\r\n							<option value="6">6</option>\r\n							<option value="7">7</option>\r\n							<option value="8">8</option>\r\n							<option value="9">9</option>\r\n							<option value="10">10</option>\r\n							<option value="11">11</option>\r\n							<option value="12">12</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				——\r\n				<div class="sel_box">\r\n					<span>结束年份:</span>\r\n					<span class="select_box" id="endYear">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="2016">2016</option>\r\n							<option value="2017">2017</option>\r\n							<option value="2018">2018</option>\r\n							<option value="2019">2019</option>\r\n							<option value="2020">2020</option>\r\n							<option value="2021">2021</option>\r\n							<option value="2022">2022</option>\r\n							<option value="2023">2023</option>\r\n							<option value="2024">2024</option>\r\n							<option value="2025">2025</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span>月份:</span>\r\n					<span class="select_box" id="endMonth">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="1">1</option>\r\n							<option value="2">2</option>\r\n							<option value="3">3</option>\r\n							<option value="4">4</option>\r\n							<option value="5">5</option>\r\n							<option value="6">6</option>\r\n							<option value="7">7</option>\r\n							<option value="8">8</option>\r\n							<option value="9">9</option>\r\n							<option value="10">10</option>\r\n							<option value="11">11</option>\r\n							<option value="12">12</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">时间</th>\r\n					<th width="100">专家</th>\r\n					<th width="100">认证用户</th>\r\n					<th width="100">微信服务号关注</th>\r\n					<th width="100">活跃用户(付费或收益)</th>\r\n					<th width="100">现金消费</th>\r\n					<th width="100">充值收费</th>\r\n					<th width="100">收益收费</th>\r\n					<th width="100">总收益</th>\r\n					<th width="100">用户充值</th>\r\n					<th width="100">提款</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsMonthList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsMonthList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,statisticsMonth=$data.statisticsMonth,statisticsMonthId=$data.statisticsMonthId,createTime=$data.createTime,year=$data.year,d=$data.d,$0=$data.$0,month=$data.month,$escape=$helpers.$escape,$out=''; 	for ( var i = 0, length = list.length; i < length; i++) {
	var statisticsMonth = list[i] || {};
	var statisticsMonthId = statisticsMonth.statisticsMonthId;
	var createTime = statisticsMonth.createTime;
	var year = createTime.replace(/(\d{4})-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,$0) || "";
	var month = createTime.replace(/\d{4}-(\d{2})-\d{2} \d{2}:\d{2}:\d{2}/,$0) || "";
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(createTime);
$out+='月份</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>付费:';
$out+=$escape(createTime);
$out+=',收益:';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/statisticsUserDateList',function(require,exports){var templateUtils = (function (){
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
define('view/ticketList',function(require,exports){var templateUtils = (function (){
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
define('view/ticketOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ticketOrderList=ticketOrderList;exports.modifyTicketPrizeAmount=modifyTicketPrizeAmount;exports.matchList=matchList;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$out='';$out+='<h1 class="title">出票订单</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="购买人" id="userName">\r\n					<input class="input_field ml20" placeholder="出票人" id="ticketUserName">\r\n					<input class="input_field ml20" placeholder="方案编号" id="orderNumeric">\r\n					<input class="input_field ml20" placeholder="订单ID" id="orderId"/>\r\n				</div>\r\n				<div class="mt20">\r\n					<span class="select_box">\r\n						<select id="lotteryId">\r\n							<option value="">彩种类型(全部)</option>\r\n							<option value="SSQ">双色球</option>\r\n							<option value="DLT">大乐透</option>\r\n							<option value="JSK3">江苏快3</option>\r\n							<option value="GX11X5">广西11选5</option>\r\n							<option value="FC3D">福彩3D</option>\r\n							<option value="JCZQ">竞彩足球</option>\r\n							<option value="JCLQ">竞彩篮球</option>\r\n							<option value="JZYP">竞足亚盘</option>\r\n							<option value="SJBGJ">世界杯冠军</option>\r\n							<option value="SJBGYJ">世界杯冠亚军</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="status">\r\n							<option value="0">订单状态(全部)</option>\r\n							<option value="1">未付款</option>\r\n							<option selected="selected" value="2">已付款</option>\r\n							<option value="3">已退款</option>\r\n							<option value="4">部分退款</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketStatus">\r\n							<option value="">出票状态(全部)</option>\r\n							<option value="0">未出票</option>\r\n							<option value="1">出票失败</option>\r\n							<option value="2">已出票待开奖</option>\r\n							<option value="3">未中奖</option>\r\n							<option value="4">已中奖</option>\r\n							<option value="5">已派奖</option>\r\n							<option value="6">部分派奖</option>\r\n							<option value="7">出票中</option>\r\n							<option value="8">部分出票</option>\r\n							<option value="9">待开售</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketPrizeDivideStatus">\r\n							<option value="">中奖分成状态(全部)</option>\r\n							<option value="0">不分成</option>\r\n							<option value="1">待分成</option>\r\n							<option value="2">已分成</option>\r\n							<option value="3">未分成</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketAttachPrizeStatus">\r\n							<option value="">加奖状态(全部)</option>\r\n							<option value="0">不加奖</option>\r\n							<option value="1">待加奖</option>\r\n							<option value="2">已加奖</option>\r\n							<option value="3">未加奖</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="ticketPrizeVerifyStatus">\r\n							<option value="">中奖审核(全部)</option>\r\n							<option value="0">不审核</option>\r\n							<option value="1">待审核</option>\r\n							<option value="2">已审核</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="source">\r\n							<option value="">来源(全部)</option>\r\n							<option value="0">h5</option>\r\n							<option value="1">android</option>\r\n							<option value="2">ios</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span class="select_box ml20">\r\n						<select id="channel"></select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<div class="search_box mt20">\r\n					<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n					<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n					<input class="input_field ml20" placeholder="期号" id="issue">\r\n					<iframe name="exportReportIframe" style="display:none"></iframe>\r\n					<input class="btn ml20" type="button" value="导出报表" id="exportReport"/>\r\n					<input class="btn ml20" type="reset" value="重置">\r\n					<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="50">彩种</th>\r\n					<th width="50">期号</th>\r\n					<th width="100">下单人</th>\r\n					<th width="90">出票人</th>\r\n					<th width="50">订单状态</th>\r\n					<th width="50">订单ID</th>\r\n					<th width="40">倍数</th>\r\n					<th width="50">购买金额</th>\r\n					<th width="50">已派金额</th>\r\n					<th width="50">预派金额</th>\r\n					<th width="50">中奖金额</th>\r\n					<th width="50">加奖金额</th>\r\n					<th width="50">过关方式</th>\r\n					<th width="70">出票状态</th>\r\n					<th width="30">票样</th>\r\n					<th width="30">内容</th>\r\n					<th width="50">来源</th>\r\n					<th width="100">时间</th>\r\n					<!-- <th width="120">操作</th> -->\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ticketOrderList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrderList($data){return (function anonymous($data,$id
/*``*/) {
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
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,orderId=$data.orderId,$out='';$out+='<h1>修改 “';
$out+=$escape(userName);
$out+='” 的中奖金额</h1>\r\n	<input type="hidden" id="modifyTicketPrizeAmountOrderId" value="';
$out+=$escape(orderId);
$out+='"/>\r\n	<div class="mt20">中奖金额：<input class="input_field ml5" placeholder="请输入中奖金额" id="ticketPrizeAmount"/></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelModifyTicketPrizeAmount"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyTicketPrizeAmount"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/*``*/) {
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
}).call(templateUtils,$data).toString()}});
define('view/tvsouOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.tvsouOrderList=tvsouOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="tvsouOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tvsouOrderList($data){return (function anonymous($data,$id
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
define('view/tvsouUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.tvsouUserList=tvsouUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="tvsouUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tvsouUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ui',function(require,exports){var templateUtils = (function (){
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
})();exports.mask=mask;exports.loading=loading;exports.notice=notice;exports.alert=alert;exports.window=window;exports.confirm=confirm;function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,id=$data.id,zIndex=$data.zIndex,opacity=$data.opacity,filter=$data.filter,$out='';$out+='<div class="mask" id="';
$out+=$escape(id);
$out+='" style="z-index:';
$out+=$escape(zIndex);
$out+=';opacity:';
$out+=$escape(opacity);
$out+=';filter:alpha(opacity=';
$out+=$escape(filter);
$out+=')"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function loading($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="loadingBox">\r\n	<div class="mask"></div>\r\n	<div class="loading ">\r\n        <div class="loading_overlay"></div>\r\n        <div class="loading_inner">\r\n            <p class="loading_spinner"></p>\r\n            <p class="loading_text">努力加载中...</p>\r\n        </div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,text=$data.text,$out='';$out+='<div class="pop" id="noticeBox" style="z-index:99">';
$out+=$escape(text);
$out+='</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function alert($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="alertBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop1">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n			<div class="btn" id="alertBtn">确定</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function window($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div id="windowBox">\r\n		<div class="mask"></div>\r\n		<div class="pop3">\r\n			';
$out+=$string(html);
$out+='\r\n			<a class="close_btn" id="closeWindow">×</a>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2">\r\n		    <span class="alerts">';
$out+=$string(text);
$out+='</span>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userArticleList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userArticleList=userArticleList;exports.editArticle=editArticle;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title" id="title"></h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="标题" id="articleTitle"/>\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30" type="button" value="新增文章" id="createArticle"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>标题</th>\r\n					<th width="160">封面</th>\r\n					<th>来源</th>\r\n					<th>链接</th>\r\n					<th width="120">时间</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userArticleList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userArticleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,article=$data.article,articleId=$data.articleId,articleTitle=$data.articleTitle,articleImg=$data.articleImg,articleSource=$data.articleSource,articleLink=$data.articleLink,createTime=$data.createTime,img=$data.img,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var article = list[i] || {};
	var articleId = article.articleId;
	var articleTitle = article.articleTitle;
	var articleImg = article.articleImg;
	var articleSource = article.articleSource;
	var articleLink = article.articleLink;
	var createTime = article.createTime;
	var img = "<img style='width: 120px;vertical-align: middle;' src="+articleImg+" onload='this.onload=null;parent.$(window.frameElement).after(this);parent.$(window.frameElement).remove()'/>";

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(articleTitle);
$out+='">';
$out+=$escape(articleTitle);
$out+='</td>\r\n		<td><iframe style="display:none" src="javascript:document.write(&quot;';
$out+=$escape(img);
$out+='&quot;)"/></td>\r\n		<td>';
$out+=$escape(articleSource);
$out+='</td>\r\n		<td title="';
$out+=$escape(articleLink);
$out+='"><a class="examine" href="';
$out+=$escape(articleLink);
$out+='" target="_blank">';
$out+=$escape(articleLink);
$out+='</a></td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine deleteArticle" articleId="';
$out+=$escape(articleId);
$out+='">删除</a>\r\n			<a class="examine updateArticle ml10" articleId="';
$out+=$escape(articleId);
$out+='">更新</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editArticle($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,articleId=$data.articleId,$out='';$out+='<h1>';
$out+=$escape(articleId>0?'更新':'新增');
$out+='文章</h1>\r\n<input type="hidden" id="articleId" value="';
$out+=$escape(articleId);
$out+='"/>\r\n<div class="mt20">URL：<input class="input_field ml5" placeholder="请输入文章URL：" id="articleLink"/></div>\r\n<div class="mt20" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="cancelEditArticle"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="sureEditArticle"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userList=userList;exports.modifyUser=modifyUser;exports.modifyUserRight=modifyUserRight;exports.chargeUser=chargeUser;exports.setChannel=setChannel;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<span class="select_box ml20">\r\n					<select id="userRight">\r\n						<option value="">权限(全部)</option>\r\n						<option value="1">竞技彩专家</option>\r\n						<option value="2">推手</option>\r\n						<option value="3">站长</option>\r\n						<option value="4">数字彩专家</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="subscribe">\r\n						<option value="">公众号(全部)</option>\r\n						<option value="0">未关注</option>\r\n						<option value="1">已关注</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="source">\r\n						<option value="">来源(全部)</option>\r\n						<option value="0">h5</option>\r\n						<option value="1">android</option>\r\n						<option value="2">ios</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="channel"></select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="50">来源</th>\r\n					<th width="50">公众号</th>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="40">类型</th>\r\n					<th width="40">简介</th>\r\n					<th width="90">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="60">身份证</th>\r\n					<th width="60">营业执照</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n					<th width="210">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,sourceMap=$data.sourceMap,source=$data.source,subscribe=$data.subscribe,userRightMap=$data.userRightMap,userRight=$data.userRight,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,identityImg=$data.identityImg,businessImg=$data.businessImg,sexMap=$data.sexMap,sex=$data.sex,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId;
	var nickName = user.nickName || '';
	var realName = user.realName || '';
	var userName = nickName;
	if (realName) {
		userName += '(' + realName +  ')';	
	}
	userName = userName.replace(/['"\n<>]/g, '');
	var userRight = user.userRight;
	var userRightMap = {'1': '竞技彩专家', '2': '推手', '3': '站长', '4': '数字彩专家'};
	var subscribe = user.subscribe;
	var source = user.source;
	var sourceMap = {'0': 'h5','1': 'android','2': 'ios'};
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var address = user.address;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var identityImg = user.identityImg;
	var businessImg = user.businessImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(sourceMap[source]);
$out+='</td>\r\n		<td>';
$out+=$escape(subscribe==1?'已关注':'未关注');
$out+='</td>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(userRightMap[userRight]);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (identityImg) { 
$out+='\r\n			<a class="examine" identityImg="';
$out+=$escape(identityImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (businessImg) { 
$out+='\r\n			<a class="examine" businessImg="';
$out+=$escape(businessImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine loginUser" userId="';
$out+=$escape(userId);
$out+='">登录</a>\r\n			<a class="examine modifyUser" userId="';
$out+=$escape(userId);
$out+='">修改</a>\r\n			<a class="examine chargeUser" userId="';
$out+=$escape(userId);
$out+='" userName="';
$out+=$escape(userName);
$out+='">充值</a>\r\n			<a class="examine modifyUserRight" userId="';
$out+=$escape(userId);
$out+='">权限</a>\r\n			<a class="examine userArticle" userId="';
$out+=$escape(userId);
$out+='">文章</a>\r\n			<a class="examine setChannel" userId="';
$out+=$escape(userId);
$out+='" userName="';
$out+=$escape(userName);
$out+='">代理商</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function modifyUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userId=$data.userId,$out='';$out+='<h1>修改用户信息</h1>\r\n	<input type="hidden" id="modifyUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">姓名：<input class="input_field" placeholder="请输入姓名" id="modifyRealName"/></div>\r\n	<div class="mt20">标签：<input class="input_field" placeholder="请输入标签" id="modifyTag"/></div>\r\n	<div class="mt20">电话：<input class="input_field" placeholder="请输入电话" id="modifyPhone"/></div>\r\n	<div class="mt20">地址：<input class="input_field" placeholder="请输入地址" id="modifyAddress"/></div>\r\n	<div class="mt20">头像：<input class="input_field" placeholder="请输入头像url地址" id="modifyPersonalImg"/></div>\r\n	<div class="mt20">简介：<textarea class="input_field" rows="3" placeholder="请输入简介" id="modifyRemark"></textarea></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelModifyUser"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyUser"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function modifyUserRight($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userId=$data.userId,$out='';$out+='<h1>修改用户权限</h1>\r\n	<input type="hidden" id="modifyUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20" id="modifyUserRightBox">\r\n		<input type="hidden" id="modifyUserRight"/>\r\n		<label><input type="checkbox" index="1"/>竞技彩推荐</label><label class="ml10"><input type="checkbox" index="2"/>推广</label><label class="ml10"><input type="checkbox" index="3"/>数字彩推荐</label>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n		<input class="btn ml20" type="reset" value="取消" id="cancelModifyUserRight"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyUserRight"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chargeUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,userId=$data.userId,$out='';$out+='<h1><span id="chargeUserName">';
$out+=$escape(userName);
$out+='</span> 充值</h1>\r\n	<input type="hidden" id="chargeUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">\r\n		账户类型：\r\n		<span class="select_box" style="width:165px">\r\n			<select id="chargeFinanceType" style="width:165px">\r\n				<option value="">全部</option>\r\n				<option value="0">方案账户(米粒)</option>\r\n				<option value="1">出票账户(彩金)</option>\r\n			</select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n	</div>\r\n	<div class="mt20">金额：<input class="input_field" placeholder="请输入金额" id="chargeAmount"/></div>\r\n	<div class="mt20">描述：<input class="input_field" placeholder="请输入描述" id="chargeRemark"/></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelChargeUser"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureChargeUser"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function setChannel($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,channel=$data.channel,discard=$data.discard,userId=$data.userId,$out='';$out+='<h1>';
$out+=$escape(userName);
$out+=' <b style="color:#ff0000">';
$out+=$escape(channel>0&&discard===0?'取消':'设置');
$out+='代理商</b>？</h1>\r\n	<input type="hidden" id="setChannel" value="';
$out+=$escape(channel);
$out+='"/>\r\n	<input type="hidden" id="setUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<input type="hidden" id="setDiscard" value="';
$out+=$escape(discard);
$out+='"/>\r\n	';
 if (!(channel>0&&discard===0)) { 
$out+='\r\n	<div class="mt20">备注：<textarea class="input_field" rows="3" placeholder="请输入备注" id="setRemark"></textarea></div>\r\n	';
 } 
$out+='\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelSetChannel"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureSetChannel"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userVerifyList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userVerifyList=userVerifyList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户审核</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<span class="select_box ml20">\r\n					<select id="type">\r\n						<option value="0">全部</option>\r\n						<option value="1">专家</option>\r\n						<option value="2">站长</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="status">\r\n						<option value="0">全部</option>\r\n						<option value="1">未审核</option>\r\n						<option value="2">已审核</option>\r\n						<option value="3">已拒绝</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">类型</th>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="120">电话</th>\r\n					<th width="70">身份证照</th>\r\n					<th width="70">营业执照</th>\r\n					<th class="address">地址</th>\r\n					<th width="60">简介</th>\r\n					<th width="70">状态</th>\r\n					<th class="140">时间</th>\r\n					<th width="100">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userVerifyList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userVerifyList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,userVerify=$data.userVerify,verifyId=$data.verifyId,type=$data.type,typeMap=$data.typeMap,nickName=$data.nickName,realName=$data.realName,phone=$data.phone,identityImg=$data.identityImg,businessImg=$data.businessImg,address=$data.address,remark=$data.remark,status=$data.status,statusMap=$data.statusMap,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var userVerify = list[i] || {};
	var verifyId = userVerify.verifyId;
	var type = userVerify.type;
	var typeMap = {'1': '专家', '2': '站长'};
	var nickName = userVerify.nickName;
	var realName = userVerify.realName;
	var phone = userVerify.phone;
	var identityImg = userVerify.identityImg;
	var businessImg = userVerify.businessImg;
	var address = userVerify.address;
	var remark = userVerify.remark;
	var status = userVerify.status;
	var statusMap = {'1': '未审核', '2': '已审核', 3: '已拒绝'};
	var createTime = userVerify.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (identityImg) { 
$out+='\r\n			<a class="examine" identityImg="';
$out+=$escape(identityImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (businessImg) { 
$out+='\r\n			<a class="examine" businessImg="';
$out+=$escape(businessImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(address);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n		<td>';
$out+=$escape(statusMap[status]);
$out+='</td>\r\n		<td class="time">';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			';
 if (status == 1) { 
$out+='\r\n			<a class="examine verifyUser" verifyId="';
$out+=$escape(verifyId);
$out+='" status="2">审核</a>\r\n			<a class="examine verifyUser" verifyId="';
$out+=$escape(verifyId);
$out+='" status="3">拒绝</a>\r\n			';
 } 
$out+='\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ylwcOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ylwcOrderList=ylwcOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">订单列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box ">\r\n			<input class="input_field" placeholder="下单人" id="userName"/>\r\n			<input class="input_field ml20" placeholder="方案人" id="planUserName"/>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<span class="select_box">\r\n				<select id="orderType">\r\n					<option value="">订单类型</option>\r\n					<option value="0">竞技彩方案订单</option>\r\n					<option value="1">充值订单</option>\r\n					<option value="2">套餐订单</option>\r\n					<option value="3">竞技彩出票订单</option>\r\n					<option value="4">彩金充值订单</option>\r\n					<option value="5">晒米冷热</option>\r\n					<option value="6">极限追盘</option>\r\n					<option value="7">数字彩出票订单</option>\r\n					<option value="8">彩票红包订单</option>\r\n					<option value="9">数字彩方案订单</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="status">\r\n					<option value="0">订单状态</option>\r\n					<option value="1">未付款</option>\r\n					<option selected="selected" value="2">已付款</option>\r\n					<option value="3">已退款</option>\r\n					<option value="4">部分退款</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planPrizeStatus">\r\n					<option value="">方案状态</option>\r\n					<option value="0">未开奖</option>\r\n					<option value="1">已中奖</option>\r\n					<option value="2">未中奖</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="ticketStatus">\r\n					<option value="">出票状态</option>\r\n					<option value="0">未出票</option>\r\n					<option value="1">出票失败</option>\r\n					<option value="2">已出票待开奖</option>\r\n					<option value="3">未中奖</option>\r\n					<option value="4">已中奖</option>\r\n					<option value="5">已派奖</option>\r\n					<option value="6">部分派奖</option>\r\n					<option value="7">出票中</option>\r\n					<option value="8">部分出票</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="planMatchType">\r\n					<option value="0">比赛类型</option>\r\n					<option value="1">足球</option>\r\n					<option value="2">篮球</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="comboType">\r\n					<option value="0">套餐类型</option>\r\n					<option value="1">极限追盘</option>\r\n					<option value="2">晒米冷热</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="开始时间" readonly="1" id="beginTime">\r\n			<input class="input_field ml20" placeholder="结束时间" readonly="1" id="endTime">\r\n			<input class="btn ml20" type="reset" value="重置"/>\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="80">订单类型</th>\r\n					<th width="80">订单状态</th>\r\n					<th width="80">方案中奖状态</th>\r\n					<th width="80">出票中奖状态</th>\r\n					<th width="150">下单人</th>\r\n					<th width="150">方案人</th>\r\n					<th width="70">金额</th>\r\n					<th width="130">下单时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ylwcOrderList"></tbody>					\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ylwcOrderList($data){return (function anonymous($data,$id
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
define('view/ylwcUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ylwcUserList=ylwcUserList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="用户" id="userName"/>\r\n				<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="100">昵称</th>\r\n					<th width="80">姓名</th>\r\n					<th width="120">标签</th>\r\n					<th width="40">简介</th>\r\n					<th width="100">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="ylwcUserList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ylwcUserList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,nickName=$data.nickName,realName=$data.realName,tag=$data.tag,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,sex=$data.sex,sexMap=$data.sexMap,country=$data.country,province=$data.province,city=$data.city,area=$data.area,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(tag);
$out+='">';
$out+=$escape(tag);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});