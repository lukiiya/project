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
})();exports.content=content;exports.comboList=comboList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="jx_title" style="display: none;">\r\n		<img src="../img/jxtitle.png"/>\r\n		<div>胜平负：<span id="SPFnum">0.00%</span></div>\r\n		<div>输赢盘：<span id="SYPnum">0.00%</span></div>\r\n		<div>大小球：<span id="DXQnum">0.00%</span></div>\r\n	</div>\r\n	<p class="ti30">\r\n		每周近500场比赛数据深挖和提炼，为您提供最有价值的球队极限数据，让你投注更简单、快速、有可靠依据。\r\n	</p>\r\n	<!--如果有胜平负等数据 删除该div 显示上面内容-->\r\n	<div class="jxzp_rate mb20"> \r\n		<span>\r\n			<div class="f18_r">追盘胜率</div>\r\n			<div class="f12_6">每日更新</div>\r\n		</span>\r\n		<span>\r\n			<div class="f34_r hothot">\r\n				<div class="jx_big" id="winPercentFront">0</div>\r\n				<div class="jx_big">.</div>\r\n				<div class="jx_small" id="winPercentEnd">00%</div>\r\n			</div>\r\n		</span>\r\n	</div>\r\n	<div class="mt10" id="comboList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function comboList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,combo=$data.combo,comboNo=$data.comboNo,amount=$data.amount,presentAmount=$data.presentAmount,spanTime=$data.spanTime,imgMap=$data.imgMap,title=$data.title,comboType=$data.comboType,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var combo = list[i] || {};
	var comboNo = combo.comboNo;
	var amount = combo.amount;
	var presentAmount = combo.presentAmount/100 ||0;
	var spanTime = combo.spanTime;
	var imgMap = {"86400":"day","604800":"week","2678400":"month","31536000":"year"};
	var title = combo.title;
	var comboType = combo.comboType;

$out+='\r\n<div class="jx" comboNo="';
$out+=$escape(comboNo);
$out+='" comboType="';
$out+=$escape(comboType);
$out+='" amount="';
$out+=$escape(amount);
$out+='">\r\n	<div class="left">\r\n		<img src="';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[spanTime]);
$out+='.png" alt="">\r\n	</div>\r\n	<div class="center"> \r\n		<span class="centerone">';
$out+=$escape(title);
$out+='</span>\r\n		<span class="centertwo">送';
$out+=$escape(presentAmount);
$out+='粒米</span>\r\n	</div>\r\n	<div class="right">\r\n		<img src="';
$out+=$escape(IMG_PATH);
$out+='shop.png" alt="">\r\n		<span>立即购买</span>\r\n	</div>\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});