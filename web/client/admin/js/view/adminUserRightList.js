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