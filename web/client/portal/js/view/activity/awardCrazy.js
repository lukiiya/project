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
})();exports.content=content;exports.activityCotent=activityCotent;exports.activityRules=activityRules;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function activityCotent($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_cotent">\n		<div class="awardCrazy_banner">\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_awardCrazy_logo.png" alt="" />\n			<span class="rules_icon" id="rulesBtn"></span>\n		</div>\n		<div class="activity_detail">\n			<p class="detail_rule">本次活动竞彩2串1，单关齐加奖，中奖200元以上可获得加奖，加奖方案个数无上限，奖励不封顶。</p>\n			<h2 class="detail_title">加奖说明</h2>\n			<table>\n				<tbody>\n					<tr>\n						<th class="border-r" width="150">方案中奖奖金(元)</th>\n						<th class="border-r" width="90">加奖彩金(元)</th>\n					</tr>\n					<tr class="border-b">\n						<td class="border-r">200≤ X＜2000</td>\n						<td class="border-r">16</td>\n					</tr>\n					<tr class="border-b">\n						<td class="border-r">2000≤ X＜20000</td>\n						<td class="border-r">160</td>\n					</tr>\n					<tr class="border-b">\n						<td class="border-r">20000以上</td>\n						<td class="border-r">1680</td>\n					</tr>\n				</tbody>\n			</table>\n		</div>\n		<a class="bet_btn" id="betBtn">\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_awardCrazy_bet_btn.png"/>\n		</a>\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityRules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="rules">\n		<li class="mb25">\n			<p>1、本次竞彩加奖活动方案个数无上限，奖励不封顶，加奖奖金不可提现，可购彩中奖后可提现；</p>\n			<dl class="mt25">\n				<dt>2串1加奖规则：</dt>\n				<dd>1）本次竞彩2串1加奖，仅限竞彩足球或者竞彩篮球2串1的代购方案，如果用户代购方案中不仅包含2串1，还包含其他过关方式，将不予加奖；</dd>\n				<dd>2）本次加奖竞彩足球、竞彩篮球所有玩法均可享受加奖；</dd>\n				<dd>3）用户购买竞彩足球或篮球2串1时，两场比赛赔率相乘等于1.40或以上享受加奖；</dd>\n				<dd>4）若方案当中所有场次均出现延期/中断等导致sp为1的情况，则该方案不享受加奖；</dd>\n			</dl>\n			<dl>\n				<dt>单关加奖规则：</dt>\n				<dd>1）本次竞彩单关加奖，仅限竞彩足球胜平负、让球胜平负和竞彩篮球让分胜负、大小分，其他单关玩法不予加奖；</dd>\n				<dd>2）用户购买单关赔率必须等于1.40或以上享受加奖；</dd>\n				<dd>3）若比赛中断、延期超过36小时或被取消，则本活动无效，奖励取消；</dd>\n			</dl>\n		</li>\n		<li>2、活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。</li>\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});