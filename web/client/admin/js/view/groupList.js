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