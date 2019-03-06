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
})();exports.content=content;exports.feedbackList=feedbackList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">反馈列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" type="text" placeholder="用户" id="userName">\r\n				<input class="btn ml20" type="reset" placeholder="重置">\r\n				<input class="btn ml20" type="submit" placeholder="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt10">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="580">反馈内容</th>\r\n					<th width="140">时间</th>\r\n					<th width="70">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="feedbackList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function feedbackList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,feedback=$data.feedback,feedbackId=$data.feedbackId,nickName=$data.nickName,realName=$data.realName,content=$data.content,con=$data.con,createTime=$data.createTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var feedback = list[i] || {};
	var feedbackId = feedback.feedbackId;
	var nickName = feedback.nickName;
	var realName = feedback.realName;
	var content = feedback.content;
	var con = content.substr(0,50);
	var createTime = feedback.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(realName);
$out+='</td>\r\n		<td title="';
$out+=$escape(con);
$out+='">';
$out+=$escape(con);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td><a class="examine feedbackDetail" feedbackId="';
$out+=$escape(feedbackId);
$out+='" content="';
$out+=$escape(con);
$out+='">查看</a></td>\r\n	</tr>\r\n';
}
return new String($out);
}).call(templateUtils,$data).toString()}});