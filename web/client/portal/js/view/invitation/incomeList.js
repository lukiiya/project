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
})();exports.content=content;exports.incomeList=incomeList;exports.incomeDetail=incomeDetail;exports.detailData=detailData;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="incomeList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function incomeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,year=$data.year,mouthList=$data.mouthList,$escape=$helpers.$escape,j=$data.j,len=$data.len,item=$data.item,totalFund=$data.totalFund,month=$data.month,date=$data.date,Date=$data.Date,curMonth=$data.curMonth,curYear=$data.curYear,jcFund=$data.jcFund,gpFund=$data.gpFund,$out='';
		for (var i = 0, length = list.length; i < length; i++) {
			var year = list[i].year || '';
			var mouthList = list[i].mouthList || [];
	
$out+='\r\n	<div class="incomeDate year clearfix">\r\n		<span class="fl">';
$out+=$escape(year);
$out+='年</span>\r\n		<span class="arrow arrow_up"></span>\r\n	</div>\r\n	<ul class="menu incomeContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n		';
 
			for (var j = 0, len = mouthList.length; j < len; j++) {
			var item = mouthList[j];
			var totalFund = (item.totalFund/100).toFixed(2) || 0;
			var month = item.month;
			var date = new Date();
			var curMonth = date.getMonth() + 1;
			var curYear = date.getFullYear();
			var jcFund = item.jcFund;
			var gpFund = item.gpFund;
		
$out+='\r\n		<li class="ui-flex menu_bar" jcFund=\'';
$out+=$escape(jcFund);
$out+='\' gpFund=\'';
$out+=$escape(gpFund);
$out+='\' month=\'';
$out+=$escape(month);
$out+='\'>\r\n			';
 if (year == curYear && month == curMonth) { 
$out+='\r\n				<span>当月</span>\r\n			';
 } else { 
$out+='\r\n				<span>';
$out+=$escape(month);
$out+='月</span>\r\n			';
 } 
$out+='\r\n			<div>\r\n				<span class="color_red mr5">';
$out+=$escape(totalFund);
$out+='元</span>\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n	</ul>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function incomeDetail($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="earning_detail">\r\n		<table align="center">\r\n			<thead>\r\n				<tr>\r\n					<th width="33.3%">竞技彩</th>\r\n					<th width="33.3%">高频彩</th>\r\n					<th width="33.3%">总收益</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody align="center" id="detailData">\r\n				\r\n			</tbody>\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function detailData($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,jcFund=$data.jcFund,incomeData=$data.incomeData,gpFund=$data.gpFund,totalfund=$data.totalfund,$escape=$helpers.$escape,$out='';
		var jcFund = +((incomeData.jcFund/100).toFixed(2));
		var gpFund = +((incomeData.gpFund/100).toFixed(2));
		var totalfund = ((incomeData.jcFund + incomeData.gpFund)/100).toFixed(2);
	
$out+='\r\n	<tr>\r\n		<td id="jcFund">';
$out+=$escape(jcFund);
$out+='</td>\r\n		<td id="gpFund">';
$out+=$escape(gpFund);
$out+='</td>\r\n		<td class="color_red">';
$out+=$escape(totalfund);
$out+='</td>\r\n	</tr>';
return new String($out);
}).call(templateUtils,$data).toString()}});