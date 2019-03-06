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