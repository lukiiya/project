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
})();exports.content=content;exports.articleList=articleList;exports.editArticle=editArticle;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$out='';$out+='<h1 class="title">资讯管理</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="标题" id="articleTitle"/>\r\n				<input class="btn ml20" type="reset" value="重置"/>\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30" type="button" value="新增资讯" id="createArticle"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th>标题</th>\r\n					<th width="160">封面</th>\r\n					<th width="100">来源</th>\r\n					<th>链接</th>\r\n					<th width="130">时间</th>\r\n					<th width="155">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="articleList"></tbody>				\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function articleList($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,article=$data.article,articleId=$data.articleId,articleTitle=$data.articleTitle,articleImg=$data.articleImg,articleSource=$data.articleSource,articleLink=$data.articleLink,createTime=$data.createTime,$escape=$helpers.$escape,$string=$helpers.$string,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var article = list[i] || {};
	var articleId = article.articleId;
	var articleTitle = article.articleTitle;
	var articleImg = article.articleImg;
	var articleSource = article.articleSource;
	var articleLink = article.articleLink;
	var createTime = article.createTime;

$out+='\r\n	<tr articleId="';
$out+=$escape(articleId);
$out+='">\r\n		<td title="';
$out+=$escape(articleTitle);
$out+='">';
$out+=$escape(articleTitle);
$out+='</td>\r\n		<td>';
$out+=$string(articleImg);
$out+='</td>\r\n		<td>';
$out+=$escape(articleSource);
$out+='</td>\r\n		<td title="';
$out+=$escape(articleLink);
$out+='"><a class="examine" href="';
$out+=$escape(articleLink);
$out+='" target="_blank">';
$out+=$escape(articleLink);
$out+='</a></td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine deleteArticle" articleId="';
$out+=$escape(articleId);
$out+='">删除</a>\r\n			<a class="examine ml5 updateArticle" articleId="';
$out+=$escape(articleId);
$out+='">更新</a>\r\n			<a class="examine ml5 modifySort modifyUp" articleId="';
$out+=$escape(articleId);
$out+='" type="1">上移</a>\r\n			<a class="examine ml5 modifySort modifyDown" articleId="';
$out+=$escape(articleId);
$out+='" type="2">下移</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function editArticle($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,articleId=$data.articleId,$out='';$out+='<h1>';
$out+=$escape(articleId>0?'更新':'新增');
$out+='资讯</h1>\r\n<input type="hidden" id="articleId" value="';
$out+=$escape(articleId);
$out+='"/>\r\n<div class="mt20">URL：<input class="input_field ml5" placeholder="请输入资讯URL：" id="articleLink"/></div>\r\n<div class="mt20" align="center">\r\n	<input class="btn ml20" type="reset" value="取消" id="cancelEditArticle"/>\r\n	<input class="btn ml20" type="submit" value="确定" id="sureEditArticle"/>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});