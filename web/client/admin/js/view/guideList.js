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
})();exports.content=content;exports.guideList=guideList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">引导列表</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<input class="input_field" placeholder="引导人" id="guideUserName">\r\n				<input class="input_field ml20" placeholder="访问人" id="accessUserName">\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="140">引导人昵称</th>\r\n					<th width="80">引导人姓名</th>\r\n					<th width="140">访问人昵称</th>\r\n					<th width="80">访问人姓名</th>\r\n					<th width="180">访问页面</th>\r\n					<th width="100">访问次数</th>\r\n					<th width="140">初次访问时间</th>\r\n					<th width="140">最近访问时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="guideList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function guideList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,guide=$data.guide,guideId=$data.guideId,guideNickName=$data.guideNickName,guideRealName=$data.guideRealName,accessNickName=$data.accessNickName,accessRealName=$data.accessRealName,accessPage=$data.accessPage,accessPageMap=$data.accessPageMap,accessCount=$data.accessCount,createTime=$data.createTime,lastTime=$data.lastTime,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var guide = list[i] || {};
	var guideId = guide.guideId;
	var guideNickName = guide.guideNickName;
  var guideRealName = guide.guideRealName;
  var accessNickName = guide.accessNickName;
  var accessRealName = guide.accessRealName;
  var accessPage = guide.accessPage;
	var accessPageMap = { 'charge': '充值', 'chargeList': '充值记录', 'editPlan': '发起推荐', 'home': '主页', 'hotMatch': '热门赛事', 'hotMatchDetail': '热门赛事详情页', 'jxzpComboList': '极限追盘多玩法', 'jxzpList': '极限追盘', 'match': '发起推荐-选择类型', 'matchMoreBettype': '发起推荐-选择类型-更多玩法', 'my': '个人页面', 'planDetail': '推荐详情', 'smlrComboList': '晒米冷热购买/详情', 'smlrList': '晒米冷热', 'userDetail': '专家头像列表', 'userList': '专家赛事列表', 'userVerify': '申请专家/站长', 'userVerifyProtocol': '专家/站长协议', 'withdraw': '收米', 'withdrawList': '提款记录', 'girlPlan': '美女推波', 'activity/hongBao': '红包页面'};
	var accessCount = guide.accessCount;
	var createTime = guide.createTime;
	var lastTime = guide.lastTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(guideNickName);
$out+='</td>\r\n    <td>';
$out+=$escape(guideRealName);
$out+='</td>\r\n    <td>';
$out+=$escape(accessNickName);
$out+='</td>\r\n    <td>';
$out+=$escape(accessRealName);
$out+='</td>\r\n		<td>';
$out+=$escape(accessPageMap[accessPage]);
$out+='</td>\r\n		<td>';
$out+=$escape(accessCount);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(lastTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});