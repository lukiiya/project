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