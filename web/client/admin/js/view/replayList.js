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