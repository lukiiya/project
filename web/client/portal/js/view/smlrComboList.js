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
})();exports.content=content;exports.smlrComboList=smlrComboList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="ti30">\r\n		每周近500场数据深挖和提炼，网站几百名专家支持投注选项的冷热，菠菜公司、中国竞彩受注的冷热，让你快速知道绝大多数彩民的下注行为，我们给予最有依据的推荐。\r\n	</p>\r\n	<div id="smlrComboList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function smlrComboList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,combo=$data.combo,comboNo=$data.comboNo,amount=$data.amount,presentAmount=$data.presentAmount,spanTime=$data.spanTime,imgMap=$data.imgMap,title=$data.title,comboType=$data.comboType,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; for (var i = 0,length = list.length;i < length; i++) {
		var combo = list[i] || {};
		var comboNo = combo.comboNo;
		var amount = combo.amount;
		var presentAmount = combo.presentAmount/100 || 0;
		var spanTime = combo.spanTime;
		var imgMap = {"604800":"hotweek","2678400":"hotmonth","31536000":"hotyear"};
		var title =  combo.title;
		var comboType = combo.comboType;
	
$out+='\r\n	<div class="jx" comboNo="';
$out+=$escape(comboNo);
$out+='" comboType="';
$out+=$escape(comboType);
$out+='" amount="';
$out+=$escape(amount);
$out+='">\r\n		<div class="left">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[spanTime]);
$out+='.png" alt="">\r\n		</div>\r\n		<div class="center"> \r\n			<span class="centerone">';
$out+=$escape(title);
$out+='</span>\r\n			<span class="centertwo">送';
$out+=$escape(presentAmount);
$out+='粒米</span>\r\n		</div>\r\n		<div class="right">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+='shop.png" alt="">\r\n			<span>立即购买</span>\r\n		</div>\r\n	</div>\r\n	';
 }
return new String($out);
}).call(templateUtils,$data).toString()}});