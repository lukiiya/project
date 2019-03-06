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
})();exports.content=content;exports.jxzpList=jxzpList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">极限追盘</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="球队名称" id="teamName"/>\r\n				<span class="select_box ml20">\r\n					<select id="type">\r\n						<option value="0">全部</option>\r\n						<option value="1">胜平负</option>\r\n						<option value="2">输赢盘</option>\r\n						<option value="3">大小球</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="status">\r\n						<option value="0">全部</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<span class="select_box ml20">\r\n					<select id="publish">\r\n						<option>全部</option>\r\n						<option value="1">上架</option>\r\n						<option value="0">下架</option>\r\n					</select>\r\n					<span class="icon_sel"><span class="arrow_down"></span></span>\r\n				</span>\r\n				<input class="btn ml20" type="reset" value="重置" />\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n				<input class="btn ml30 mr30" type="button" value="新增极限数据" id="addJxzp"/>\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="60">类型</th>\r\n					<th width="100">球队名称</th>\r\n					<th>比赛</th>\r\n					<th width="60">状态</th>\r\n					<th width="60">近期数</th>\r\n					<th width="60">历史数</th>\r\n					<th width="60">上下架</th>\r\n					<th width="140">失效时间</th>\r\n					<th width="140">创建时间</th>\r\n					<th width="90">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="jxzpList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,jxzp=$data.jxzp,jxzpId=$data.jxzpId,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,publish=$data.publish,publishMap=$data.publishMap,closeTime=$data.closeTime,createTime=$data.createTime,match=$data.match,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var jxzp = list[i] || {};
	var jxzpId = jxzp.jxzpId;
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away; 
	var beginTime = jxzp.beginTime && jxzp.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = jxzp.recentContinue;
	var historyContinue = jxzp.historyContinue;
	var publish = jxzp.publish;
	var publishMap = {'0': '下架', '1': '上架'};
	var closeTime = jxzp.closeTime;
	var createTime = jxzp.createTime;
	var match = "["+league+"] "+home+" vs "+away+"("+beginTime+")";

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(typeMap[type]);
$out+='</td>\r\n		<td>';
$out+=$escape(teamName);
$out+='</td>\r\n		<td title="';
$out+=$escape(match);
$out+='">';
$out+=$escape(match);
$out+='</td>\r\n		<td>';
$out+=$escape(statusMap[type][status]);
$out+='</td>\r\n		<td>';
$out+=$escape(recentContinue);
$out+='</td>\r\n		<td>';
$out+=$escape(historyContinue);
$out+='</td>\r\n		<td>';
$out+=$escape(publishMap[publish]);
$out+='</td>\r\n		<td>';
$out+=$escape(closeTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine modify" jxzpId="';
$out+=$escape(jxzpId);
$out+='">修改</a>\r\n			<a class="examine publish" jxzpId="';
$out+=$escape(jxzpId);
$out+='" publish="';
$out+=$escape(publish==1?0:1);
$out+='">';
$out+=$escape(publish==1?'下架':'上架');
$out+='</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});