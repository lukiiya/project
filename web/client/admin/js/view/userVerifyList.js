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