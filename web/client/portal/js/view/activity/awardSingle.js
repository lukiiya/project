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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='single_award_logo.png" alt="" />\r\n	</div>\r\n	<div class="item_box">\r\n		<div class="item2_warp">\r\n			<div class="activity_detail">\r\n				<div class="activity_detail_title">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='single_award_title.png" alt="" />\r\n				</div>\r\n				<table>\r\n					<tr>\r\n						<th class="border-r" width="130">方案中奖奖金(元)</th>\r\n						<th class="border-r" width="90">加奖彩金(元)</th>\r\n						<th width="90">加奖幅度</th>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">200≤ X＜1000</td>\r\n						<td class="border-r">12</td>\r\n						<td>6%</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r">1000≤ X＜10000</td>\r\n						<td class="border-r">70</td>\r\n						<td>7%</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r size13">10000≤ X＜50000</td>\r\n						<td class="border-r">900</td>\r\n						<td>9%</td>\r\n					</tr>\r\n					<tr class="border-b">\r\n						<td class="border-r size13">50000以上</td>\r\n						<td class="border-r">5100</td>\r\n						<td>10.2%</td>\r\n					</tr>\r\n				</table>\r\n			</div>\r\n		</div>\r\n		<div class="bet_btn" id="betBtn">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='single_award_btn.png"/>\r\n		</div>\r\n		<div class="rules_wrap">\r\n			<div class="rules">\r\n				<h2 class="mb10">活动规则：</h2>\r\n				<ul>\r\n					<li>1、本次竞彩单关加奖，仅限竞彩足球胜平负/让球胜平负，其他单关玩法不予加奖；</li>\r\n					<li>2、用户购买单关赔率必须等于1.40或以上才享受加奖奖励；	</li>\r\n					<li>3、每名用户加奖方案个数不限，加奖奖金不可提现，可购彩，中奖后可提现；</li>\r\n					<li>4、若比赛中断、延期超过36小时或被取消，则本活动无效，奖励取消；</li>\r\n					<li>5、活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。</li>\r\n				</ul>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});