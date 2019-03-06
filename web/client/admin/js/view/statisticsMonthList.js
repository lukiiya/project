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
})();exports.content=content;exports.statisticsMonthList=statisticsMonthList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<h1 class="title">月份统计</h1>\r\n<div class="list_box">\r\n	<div class="search_box">\r\n		<div>\r\n			<form onsubmit="return false;">\r\n				<div class="sel_box">\r\n					<span>开始年份:</span>\r\n					<span class="select_box" id="beginYear">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="2016">2016</option>\r\n							<option value="2017">2017</option>\r\n							<option value="2018">2018</option>\r\n							<option value="2019">2019</option>\r\n							<option value="2020">2020</option>\r\n							<option value="2021">2021</option>\r\n							<option value="2022">2022</option>\r\n							<option value="2023">2023</option>\r\n							<option value="2024">2024</option>\r\n							<option value="2025">2025</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span>月份:</span>\r\n					<span class="select_box" id="beginMonth">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="1">1</option>\r\n							<option value="2">2</option>\r\n							<option value="3">3</option>\r\n							<option value="4">4</option>\r\n							<option value="5">5</option>\r\n							<option value="6">6</option>\r\n							<option value="7">7</option>\r\n							<option value="8">8</option>\r\n							<option value="9">9</option>\r\n							<option value="10">10</option>\r\n							<option value="11">11</option>\r\n							<option value="12">12</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				——\r\n				<div class="sel_box">\r\n					<span>结束年份:</span>\r\n					<span class="select_box" id="endYear">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="2016">2016</option>\r\n							<option value="2017">2017</option>\r\n							<option value="2018">2018</option>\r\n							<option value="2019">2019</option>\r\n							<option value="2020">2020</option>\r\n							<option value="2021">2021</option>\r\n							<option value="2022">2022</option>\r\n							<option value="2023">2023</option>\r\n							<option value="2024">2024</option>\r\n							<option value="2025">2025</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n					<span>月份:</span>\r\n					<span class="select_box" id="endMonth">\r\n						<select>\r\n							<option value="0">请选择</option>\r\n							<option value="1">1</option>\r\n							<option value="2">2</option>\r\n							<option value="3">3</option>\r\n							<option value="4">4</option>\r\n							<option value="5">5</option>\r\n							<option value="6">6</option>\r\n							<option value="7">7</option>\r\n							<option value="8">8</option>\r\n							<option value="9">9</option>\r\n							<option value="10">10</option>\r\n							<option value="11">11</option>\r\n							<option value="12">12</option>\r\n						</select>\r\n						<span class="icon_sel"><span class="arrow_down"></span></span>\r\n					</span>\r\n				</div>\r\n				<input class="btn ml20" type="reset" value="重置">\r\n				<input class="btn ml20" type="submit" value="搜索" id="searchSubmit">\r\n			</form>\r\n		</div>\r\n	</div>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="120">时间</th>\r\n					<th width="100">专家</th>\r\n					<th width="100">认证用户</th>\r\n					<th width="100">微信服务号关注</th>\r\n					<th width="100">活跃用户(付费或收益)</th>\r\n					<th width="100">现金消费</th>\r\n					<th width="100">充值收费</th>\r\n					<th width="100">收益收费</th>\r\n					<th width="100">总收益</th>\r\n					<th width="100">用户充值</th>\r\n					<th width="100">提款</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="statisticsMonthList"></tbody>\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function statisticsMonthList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,statisticsMonth=$data.statisticsMonth,statisticsMonthId=$data.statisticsMonthId,createTime=$data.createTime,year=$data.year,d=$data.d,$0=$data.$0,month=$data.month,$escape=$helpers.$escape,$out=''; 	for ( var i = 0, length = list.length; i < length; i++) {
	var statisticsMonth = list[i] || {};
	var statisticsMonthId = statisticsMonth.statisticsMonthId;
	var createTime = statisticsMonth.createTime;
	var year = createTime.replace(/(\d{4})-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,$0) || "";
	var month = createTime.replace(/\d{4}-(\d{2})-\d{2} \d{2}:\d{2}:\d{2}/,$0) || "";
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;
//	var = statisticsMonth.;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(createTime);
$out+='月份</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>付费:';
$out+=$escape(createTime);
$out+=',收益:';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='元</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});