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