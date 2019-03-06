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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="content">\r\n		<div class="activity_2x1_logo">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2x1_logo.png" alt="" />\r\n		</div>\r\n		<div class="item_box">\r\n			<div class="item2_warp">\r\n				<div class="activity_detail">\r\n					<p class="detail_rule">购买竞彩足球或者竞彩篮球，进行2串1过关，中奖200元以上可获得加奖。</p>\r\n					<table>\r\n						<tr>\r\n							<th class="border-r" width="150">方案中奖奖金(元)</th>\r\n							<th class="border-r" width="90">加奖彩金(元)</th>\r\n							<th width="90">加奖幅度</th>\r\n						</tr>\r\n						<tr class="border-b">\r\n							<td class="border-r">200≤ X＜1000</td>\r\n							<td class="border-r">12</td>\r\n							<td>6%</td>\r\n						</tr>\r\n						<tr class="border-b">\r\n							<td class="border-r">1000≤ X＜5000</td>\r\n							<td class="border-r">70</td>\r\n							<td>7%</td>\r\n						</tr>\r\n						<tr class="border-b">\r\n							<td class="border-r">5000≤ X＜10000</td>\r\n							<td class="border-r">400</td>\r\n							<td>8%</td>\r\n						</tr>\r\n						<tr class="border-b">\r\n							<td class="border-r">10000≤ X＜50000</td>\r\n							<td class="border-r">900</td>\r\n							<td>9%</td>\r\n						</tr>\r\n						<tr>\r\n							<td class="border-r">50000以上</td>\r\n							<td class="border-r">5100</td>\r\n							<td>10.2%</td>\r\n						</tr>\r\n					</table>\r\n				</div>\r\n			</div>\r\n			<div class="rules_wrap">\r\n				<div class="rules">\r\n					<h2 class="">活动规则</h2>\r\n					<pre>1、本次竞彩2串1加奖，仅限竞彩足球或者竞彩篮球2串1的代购方案，如果用户代购方案中不仅包含2串1，还包含其他过关方式，也将不予加奖；\r\n\r\n2、本次加奖适合竞彩足球、竞彩篮球所有玩法，每名用户加奖方案个数不限；\r\n \r\n3、用户购买竞彩足球或篮球2串1时，两场比赛赔率相乘等于1.40或以上才享受加奖奖励；\r\n\r\n4、根据中奖奖金的不同，可获得对应的加奖幅度，最高可获得超过10%的加奖比例；\r\n \r\n5、若方案当中所有场次均出现延期/中断等导致sp为1的情况，则该方案不享受加奖；\r\n\r\n6、活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。\r\n							</pre>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});