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