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
})();exports.content=content;exports.jjcConsumeList=jjcConsumeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="jjcConsumeList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function jjcConsumeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,year=$data.year,mouthList=$data.mouthList,$escape=$helpers.$escape,j=$data.j,len=$data.len,item=$data.item,jcConsume=$data.jcConsume,month=$data.month,date=$data.date,Date=$data.Date,curMonth=$data.curMonth,curYear=$data.curYear,time=$data.time,$out='';
		for (var i = 0, length = list.length; i < length; i++) {
			var year = (list[i].year + '') || '';
			var mouthList = list[i].mouthList || [];
	
$out+='\r\n	<div class="jjcConsumeDate year clearfix">\r\n		<span class="fl">';
$out+=$escape(year);
$out+='年</span>\r\n		<span class="arrow arrow_up"></span>\r\n	</div>\r\n	<ul class="menu jjcConsumeContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n		';
 
			for (var j = 0, len = mouthList.length; j < len; j++) {
			var item = mouthList[j];
			var jcConsume = (item.jcConsume/100).toFixed(2) || 0;
			var month = item.month;
			var date = new Date();
			var curMonth = date.getMonth() + 1;
			var curYear = date.getFullYear();
			var time = year + month;
		
$out+='\r\n		<li class="ui-flex menu_bar" time=\'';
$out+=$escape(time);
$out+='\'>\r\n			';
 if (year == curYear && month == curMonth) { 
$out+='\r\n				<span>当月</span>\r\n			';
 } else { 
$out+='\r\n				<span>';
$out+=$escape(month);
$out+='月</span>\r\n			';
 } 
$out+='\r\n			<div>\r\n				<span class="color_red mr5">';
$out+=$escape(jcConsume);
$out+='元</span>\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n	</ul>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});