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
})();exports.content=content;exports.consumeList=consumeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="search_box">\r\n		<div class="time_wrap mb15">\r\n			<span>时&emsp;间：</span>\r\n			<input type="number" class="size16" id="beginTime" maxlength="8" />\r\n			<span class="ml5 mr5">至</span>\r\n			<input type="number" class="size16" id="endTime" maxlength="8" />\r\n		</div>\r\n		<div class="search_wrap">\r\n			<span>用户名：</span>\r\n			<input class="" type="text" id="userName" />\r\n			<span class="search_btn" id="searchSubmit"></span>\r\n		</div>\r\n	</div>\r\n	<div class="invite_num mt10">\r\n		<table align="center">\r\n			<thead>\r\n				<tr>\r\n					<th width="25%">时间</th>\r\n					<th width="25%">用户名</th>\r\n					<th width="25%">彩种</th>\r\n					<th width="25%">投注金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody align="center" id="consumeList"></tbody>\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function consumeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,amount=$data.amount,createTime=$data.createTime,lotteryId=$data.lotteryId,d=$data.d,day=$data.day,time=$data.time,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,lotteryIdMap=$data.lotteryIdMap,$escape=$helpers.$escape,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var amount = list[i].amount/100;
		var createTime = list[i].createTime || "";
		var lotteryId = list[i].lotteryId;
		createTime = createTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = createTime[1];
		var time = createTime[2];
		var nickName = list[i].nickName;
		var realName = list[i].realName;
		var userName = realName || nickName;
		var lotteryIdMap = {'JCZQ': '竞彩足球','JCLQ': '竞彩篮球','SSQ': '双色球','JSK3': '老快3','DLT': '大乐透','GX11X5': '乐11选5','FC3D': '福彩3D','JZYP': '竞足亚盘'};
	
$out+='\r\n	<tr>\r\n		<td class="size12">';
$out+=$escape(day);
$out+='<br />';
$out+=$escape(time);
$out+='</td>\r\n		<td>';
$out+=$escape(userName);
$out+='</td>\r\n		<td>';
$out+=$escape(lotteryIdMap[lotteryId]);
$out+='</td>\r\n		<td class="color_red">';
$out+=$escape(amount);
$out+='</td>\r\n	</tr>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});