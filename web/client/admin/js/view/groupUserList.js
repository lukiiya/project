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