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
})();exports.content=content;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="jingcaihaoli_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jchl_logo.png" alt="" />\r\n	</div>\r\n	<div class="item_box">\r\n		<div class="item1_warp haoli_activity_item mt25">\r\n			<h3 class="activity_title">活动一</h3>\r\n			<div class="activity_detail">\r\n				<h4 class="detail_title detail_title1">新用户首充20送10</h4>\r\n				<p class="detail_rule">首次充值20元彩金或以上，送10元彩金。彩金用于购买彩票。</p>\r\n				<a class="haoli_button" id="rechargeCashBtn">立即充值</a>\r\n			</div>\r\n		</div>\r\n		<!--<div class="item2_warp haoli_activity_item mt35">\r\n			<h3 class="activity_title">活动二</h3>\r\n			<div class="activity_detail">\r\n				<h4 class="detail_title detail_title2">胜平负单关加奖，最高10%</h4>\r\n				<p class="detail_rule">app购买竞彩足球胜平负单关玩法，竞彩篮球单关玩法（让分胜负、大小分），中奖100元以上可获得加奖。</p>\r\n				<table>\r\n					<tr>\r\n						<th class="border-r" width="50%">方案中奖奖金(元)</th>\r\n						<th>加奖彩金(元)</th>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">100≤ X＜500</td>\r\n						<td>8</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">500≤ X＜1000</td>\r\n						<td>48</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">1000≤ X＜5000</td>\r\n						<td>100</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">5000≤ X＜10000</td>\r\n						<td>508</td>\r\n					</tr>\r\n					<tr>\r\n						<td class="border-r">10000以上</td>\r\n						<td>1008</td>\r\n					</tr>\r\n				</table>\r\n				<p class="mt10 colorf size13">其他玩法不加奖</p>\r\n				<a class="haoli_button" id="buyjczq">购买竞彩足球</a>\r\n			</div>\r\n		</div>-->\r\n		<div class="item3_warp haoli_activity_item mt35">\r\n			<h3 class="activity_title">活动二</h3>\r\n			<div class="activity_detail">\r\n				<h4 class="detail_title detail_title3">消费抽Iphone7</h4>\r\n				<p class="detail_rule">在平台每消费1次，有一次抽奖机会。</p>\r\n				<p class="detail_rule">无论是购买专家推荐，还是购买彩票。</p>\r\n				<a class="haoli_button" id="trunplateBtn">立即抽奖</a>\r\n			</div>\r\n		</div>\r\n		<div class="item4_warp haoli_activity_item mt35">\r\n			<h3 class="activity_title">活动三</h3>\r\n			<div class="activity_detail">\r\n				<h4 class="detail_title detail_title4">米粒冲500送50，不限次数</h4>\r\n				<p class="detail_rule">冲100送8，冲500送50，用于购买专家推荐。</p>\r\n				<a class="haoli_button" id="rechargeRiceBtn">立即充值</a>\r\n			</div>\r\n		</div>\r\n		<p class="size12 colorf mt10">最终解释权归官方所有。</p>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});