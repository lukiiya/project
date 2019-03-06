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