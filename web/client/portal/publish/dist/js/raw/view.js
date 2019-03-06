define('view/activity/award11x5',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="11x5jj_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='11x5jj_banner.png" alt="" />\r\n	</div>\r\n	<div class="award_rules">\r\n		<ul class="rules_item_warp">\r\n			<li class="rules_title mb20">\r\n				<p>加奖时间：自2018年5月11日起，11选5加奖500万开启，奖金派完为止</p>\r\n			</li>\r\n			<li class="rules_item">\r\n				<h2 class="title_h2">加奖说明</h2>\r\n				<div class="table_wrap">\r\n					<table>\r\n						<table>\r\n							<tr>\r\n								<th>加奖玩法</th>\r\n								<th>原奖金（元）</th>\r\n								<th>加奖金额（元）</th>\r\n								<th>加奖后奖金（元）</th>\r\n							</tr>\r\n							<tr>\r\n								<td>任选三</td>\r\n								<td>19</td>\r\n								<td>2</td>\r\n								<td>21</td>\r\n							</tr>\r\n							<tr>\r\n								<td>任选五</td>\r\n								<td>540</td>\r\n								<td>60</td>\r\n								<td>600</td>\r\n							</tr>\r\n						</table>\r\n					</table>\r\n				</div>\r\n			</li>\r\n			<li class="rules_item">\r\n				<a class="bet_btn" id="betBtn">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_award11x5_bet_btn.png" />\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="activity_rules">\r\n		<h2 class="title_h2">活动规则</h2>\r\n		<dl>\r\n			<dd>1、本次活动只针对任选三、任选五玩法加奖，中奖奖金可以直接提现；</dd>\r\n			<dd>2、加奖奖金不可提现，可购彩，中奖后可提现；</dd>\r\n			<dd>3、本次加奖活动不限次数，不限人数，加完为止；</dd>\r\n			<dd>4、本次活动的最终解释权归“晒米场”所有。</dd>\r\n		</dl>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/award2x1',function(require,exports){var templateUtils = (function (){
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
define('view/activity/awardCrazy',function(require,exports){var templateUtils = (function (){
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
define('view/activity/awardJsk3',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="k3jj_bg">\r\n			<div class="k3jj_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_logo.png" alt="" />\r\n			</div>\r\n		</div>\r\n		<div class="award_rules">\r\n			<ul class="rules_item_warp">\r\n				<li class="rules_title">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_ruleTitle.png"/>\r\n				</li>\r\n				<li class="rules_item">\r\n					<!--<p class="size13">1.购买快3游戏，自2017年6月18起至奖金派完为止，享受以下加奖:</p>-->\r\n					<div class="table_wrap">\r\n						<table>\r\n							<tr>\r\n								<th width="100">投注方法</th>\r\n								<th width="60">奖金</th>\r\n								<th width="60">加奖</th>\r\n								<th width="60">总奖金</th>\r\n							</tr>\r\n							<tr>\r\n								<td>和值4、17</td>\r\n								<td>80</td>\r\n								<td class="award">20</td>\r\n								<td>100</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值5、16</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值6、15</td>\r\n								<td>25</td>\r\n								<td class="award">5</td>\r\n								<td>30</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值7、14</td>\r\n								<td>16</td>\r\n								<td class="award">4</td>\r\n								<td>20</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值8、13</td>\r\n								<td>12</td>\r\n								<td class="award">2</td>\r\n								<td>14</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值9、12</td>\r\n								<td>10</td>\r\n								<td class="award">2</td>\r\n								<td>12</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值10、11</td>\r\n								<td>9</td>\r\n								<td class="award">2</td>\r\n								<td>11</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三同号通选</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三同号单选</td>\r\n								<td>240</td>\r\n								<td class="award">60</td>\r\n								<td>300</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二同号复选</td>\r\n								<td>15</td>\r\n								<td class="award">4</td>\r\n								<td>19</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二同号单选</td>\r\n								<td>80</td>\r\n								<td class="award">20</td>\r\n								<td>100</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三不同号</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二不同号</td>\r\n								<td>8</td>\r\n								<td class="award">2</td>\r\n								<td>10</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三连号通选</td>\r\n								<td>10</td>\r\n								<td class="award">2</td>\r\n								<td>12</td>\r\n							</tr>\r\n						</table>\r\n					</div>\r\n					<div class="mt20" id="betBtn">\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_betBtn.png"/>\n					</div>\r\n				</li>\r\n				<li class="colorf size14 mb10">\r\n					活动规则：\r\n				</li>\r\n				<li class="rules_item">\r\n					1.派奖时间：自2017年10月30日起，若两亿奖金派完，则加奖活动停止；\r\n				</li>\r\n				<li class="rules_item">\r\n					2.每天82期派奖不停歇，加奖奖金与中奖奖金同时派发，加奖奖金可以用于继续购买彩票，也可以立即提现；\r\n				</li>\r\n				<li class="rules_item">\r\n					3.活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/awardSingle',function(require,exports){var templateUtils = (function (){
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
define('view/activity/awardSsq',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="ssqjj_bg">\r\n		<div class="ssqjj_logo">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqjj_logo.png" alt="" />\r\n		</div>\r\n	</div>\r\n	<div class="award_rules">\r\n		<div class="rules_item_warp">\r\n			<div class="rules_title">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqjj_ruleTitle.png"/>\r\n			</div>\r\n			<div class="award_cont mt20 mb30">\r\n				<p class="size13 mb20">自2017130期开始，共20期</p>\r\n				<div class="table_wrap">\r\n					<table>\r\n						<tr>\r\n							<th width="125">投注玩法</th>\r\n							<th width="90">加奖奖项</th>\r\n							<th width="90">单注加奖</th>\r\n						</tr>\r\n						<tr>\r\n							<td>红球、蓝色复式</td>\r\n							<td>一等奖</td>\r\n							<td>500万</td>\r\n						</tr>\r\n						<tr>\r\n							<td>全复式</td>\r\n							<td>六等奖</td>\r\n							<td>5元</td>\r\n						</tr>\r\n					</table>\r\n				</div>\r\n				<div class="mt30" id="betBtn">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_betBtn.png">\r\n				</div>\r\n			</div>\r\n			<h3 class="rules_h3 mb10">派奖规则：</h3>\r\n			<ul>\r\n				<li class="rules_item">\r\n					1.派奖时间：自双色球2017130期(11月02日开奖结束后开始起售，11月05日开奖)开始；\r\n				</li>\r\n				<li class="rules_item">\r\n					2.一等奖加奖总金额为4亿元，每期安排2000万元设立一等奖特别奖，由当期采用复式投注的一等奖按中奖注数均分，单注派奖奖金最高限额500万元；\r\n				</li>\r\n				<li class="rules_item">\r\n					3.六等奖加奖总金额为5亿元，每期对当期采用复式投注的所有六等奖按每注5元派送固定奖；\r\n				</li>\r\n				<li class="rules_item">\r\n					4.活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/betPresent',function(require,exports){var templateUtils = (function (){
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
define('view/activity/christmas',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_christmas_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_logo.png" alt="" />\r\n	</div>\r\n	<div class="christmas_cont">\r\n		<ul class="christmas_item_warp">\r\n			<li class="christmas_item">\r\n				<p class="item_describe mb20">欧洲四大联赛将在即将到来的圣诞节前迎来冬歇期调整，而唯独英超将在接下来的12月23日到18年1月1日这极短的时间内连续迎来4轮圣诞赛程。晒米场也为即将到来的圣诞赛程独家准备了彩民必备手册。</p>\r\n				<h3 class="item_title title1"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img1.png"/>\r\n				<p class="item_describe">本赛季圣诞赛程阿森纳最为轻松 4场比赛间隔多达12天，而曼联赛程最为紧张，球队首尾两场比赛之间间隔只有不到9天。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title2"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img2.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程，热刺胜场最多并且保持不败，切尔西则胜率最低。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title3"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img3.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程里2.4赔率以上的打出率高达50% ，可见冷门不少。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title4"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img4.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程，主队胜率稳步上升，而平局出现场次逐年减少。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title5"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img5.png"/>\r\n				<p class="item_describe mb50">过去三赛季的圣诞赛程每队共9场比赛，曼城打出的大球次数最多，而水晶宫的小球次数最多。</p>\r\n				<p class="item_describe">注：以上数据采集为英超1415赛季、1516赛季、1617赛季三赛季圣诞赛程资料。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="download_img mb25 mt5">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_download.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/confederationsCup',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_FCC_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_logo.png" alt="" />\r\n	</div>\r\n	<p class="activity_describe mt20">晒米场与乐视体育、腾讯企鹅直播相约2017俄罗斯联合会杯，收看直播节目并且参加联合会杯冠军竞猜活动，将有机会免费获得1888元奖金！请选择出你心目中的冠军球队.</p>\r\n	<ul class="team_list clearfix" id="teamList">\r\n		<li class="team_item" teamId="1" id="team1">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Russia.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">俄罗斯</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="2" id="team2">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Nz.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">新西兰</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="3" id="team3">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Portugal.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">葡萄牙</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="4" id="team4">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Mexico.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">墨西哥</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="5" id="team5">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Cameroon.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">喀麦隆</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="6" id="team6">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Chile.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">智利</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="7" id="team7">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Australia.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">澳大利亚</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="8" id="team8">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Germany.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">德国</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n	</ul>\r\n	<div class="btn_wrap" id="submitBtn" style="display: none;">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_btn.png"/>\r\n	</div>\r\n	<div class="btn_wrap" id="activeBtn" style="display: none">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_active_btn.png"/>\r\n	</div>\r\n	<div class="guess_result">我的竞猜结果：<span id="guessResult"">无</span></div>\r\n	<div class="rules_wrap">\r\n		<h2 class="activity_title">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_title.png"/>\r\n		</h2>\r\n		<ul class="thumb_list clearfix mt30">\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="newUser">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_newUser.png" />\r\n				</div>\r\n			</li>\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="recharge">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_recharge.png" />\r\n				</div>\r\n			</li>\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="award2x1">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_award.png" />\r\n				</div>\r\n			</li>\r\n		</ul>\r\n		<h3 class="rules_title">活动规则：</h3>\r\n		<pre>1.活动时间:2017-06-17--2017-07-03,决赛赛前截止.\r\n2.活动期间新注册用户免费送3彩金.\r\n3.若一个用户猜中冠军将获1888元奖金，多个用户猜中结果将平分奖金.\r\n4.竞猜奖金将在联合会杯决赛比赛结束后24小时内派发.\r\n5.本活动最终解释权归晒米场所有!\r\n					</pre>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/hongBao',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.success=success;exports.again=again;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<a class="link_home" href="#home"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='sm_logo.png"/></a>\r\n	<div class="surplus">\r\n		<!-- 剩余：454545个红包 -->\r\n	</div>\r\n	<form class="hb" action="">\r\n		<div class="input_wrap pb10">\r\n			<div class="phone_num mb10"><input type="number" placeholder="请输入手机号" maxlength="11" id="mobile"/></div>\r\n			<div class="venidate_wrap clearfix">\r\n				<input class="venidate_code" type="number" placeholder="请输入验证码" maxlength="4" id="smsCode"/>\r\n				<a class="get_code" id="smsCodeBtn">获取验证码</a>\r\n			</div>\r\n		</div>\r\n		<div class="get_parket">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='get_parket.png" alt="" id="hongBaoSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="activity_rules_wrap">\r\n		<div class="activity_rules">\r\n			<h2>活动规则<img class="rules_hb" src="';
$out+=$escape(IMG_PATH);
$out+='rule_hb.png"></h2>\r\n			<pre class="mt5 mb10" id="remark" style="line-height: 20px;white-space: pre-wrap;font-size: 12px;"></pre>\r\n		</div>\r\n		<div class="textC" style="color: #FFFFFF;">晒米场 • 竞彩推荐平台</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function success($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="congratulation">\r\n	<h2>恭喜您！</h2>\r\n	<p class="p_money">18元红包已进入米仓</p>\r\n	<p class="p_buy">可用来直接购买</p>\r\n	<a class="use_immediate">立即使用</a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function again($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="congratulation">\r\n	<p class="p_money">您已经领过晒米场红包</p>\r\n	<p class="p_buy">可用来直接购买</p>\r\n	<a class="use_immediate">立即使用</a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/hongBao2017ChunJie',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.chunjieMask=chunjieMask;exports.validateMobileBox=validateMobileBox;exports.getSuccessBox=getSuccessBox;exports.getRiceBox=getRiceBox;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div>\r\n		<div class="banner">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2017chunjie_logo.png" />\r\n		</div>\r\n		<div class="get_parket">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2017chunjie_unreceived.png" id="unReceivedImg" style="display: none;"/>\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2017chunjie_received.png" id="receivedImg" style="display: none;"/>\r\n		</div>\r\n		<div class="rules_wrap">\r\n			<div class="rules">\r\n				<h2 class="mb10">活动规则：</h2>\r\n				<pre id="remark" style="line-height: 20px;white-space: pre-wrap;font-size: 12px;"></pre>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chunjieMask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="2017chunjieMask">\r\n		<div class="popup_box" id="popupBox">\r\n			<a class="close_pop" id="closePopBtn">\r\n				<span></span>\r\n			</a>\r\n			';
$out+=$string(html);
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function validateMobileBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="velidate_mobile" id="validateMobile">\r\n		<h2 class="pop_title">验证手机号码</h2>\r\n		<div class="input_wrap">\r\n			<input type="number" placeholder="请输入手机号" maxlength="11" id="mobile" />\r\n		</div>\r\n		<div class="input_wrap clearfix">\r\n			<input class="velidate_code" type="number" placeholder="请输入验证码" maxlength="6" id="smsCode"/>\r\n			<span class="get_code" id="smsCodeBtn">获取验证码</span>\r\n		</div>\r\n		<div class="ensure_btn" id="hongBaoSubmit">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2017chunjie_ensure.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getSuccessBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="get_success" id="getSuccess">\r\n		<h2 class="pop_title">领取成功！</h2>\r\n		<div class="get_success_detail">\r\n			<p class="pop_detail mt25 size20">已成功领取11元红包</p>\r\n			<p class="pop_detail mt10 size15">（含6粒米、5彩金）</p>\r\n			<p class="use_price mt15">米粒可以购买专家推荐；</p>\r\n			<p class="use_gold">彩金用于购买彩票、跟单投注，中奖可提现。</p>\r\n		</div>\r\n		<div class="bet_btn" id="betBtn">跟单投注</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getRiceBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="get_rice" id="getRice">\r\n		<h2 class="pop_title">2月3日开始领取</h2>\r\n		<p class="pop_detail">过年期间，签到领米继续有效</p>\r\n		<div class="ensure_btn" id="getRiceBtn">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2017chunjie_getrice.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/hongBao2018ChunJie',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.chunjieMask=chunjieMask;exports.getSuccessBox=getSuccessBox;exports.notStartBox=notStartBox;exports.rankList=rankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,isReceiveFinish=$data.isReceiveFinish,isReceive=$data.isReceive,isBegin=$data.isBegin,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
		var period = info.period;
		var isReceiveFinish = info.isReceiveFinish;
		var isReceive = info.isReceive;
		var isBegin = !!info.isBegin;
	
$out+='\r\n	<div class="top_img">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/2018chunjie_top.png" />\r\n	</div>\r\n	<div class="red_packet">\r\n		<img class="img-responsive red_packet_bg" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_bg.png"/>\r\n		<div class="packet_cont">\r\n			';
 if (period == 1) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title1.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">新春到来送万福</div>\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月16日） 08:00 开抢</div>\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 2) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title2.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">装金装银装财神</div>\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月20日） 08:00 开抢</div>	\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 3) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title3.png"/>\r\n				';
 if (isBegin) { 
$out+='\r\n					<div class="start_time">顺风顺意开门红</div>		\r\n				';
 } else { 
$out+='\r\n					<div class="start_time">（2月22日） 08:00 开抢</div>		\r\n				';
 } 
$out+='\r\n			';
 } else if (period == 0) { 
$out+='\r\n				<img class="packet_title" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_title3.png"/>\r\n				<div class="start_time">顺风顺意开门红</div>		\r\n			';
 } 
$out+='\r\n			';
 if (isReceive) { 
$out+='\r\n				<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn2.png"/>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="notice">红包已领取，初五记得再来哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="notice">红包已领取，初七记得再来哦！</p>\r\n				';
 } 
$out+='\r\n			';
 } else if (isReceiveFinish || period == 0) { 
$out+='\r\n				<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn3.png"/>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="notice">红包已抢完，初五记得再来哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="notice">红包已抢完，初七记得再来哦！</p>\r\n				';
 } 
$out+='\r\n			';
 } else if (!isReceive) { 
$out+='\r\n				<img class="red_packet_btn" id="startBtn" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/red_packet_btn1.png"/>\r\n			';
 }
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="scroll_msg">\r\n		<img class="msg_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/msg_bg.png" alt="" />\r\n		<ul class="msg_move" id="rankList"></ul>\r\n	</div>\r\n	<div class="rules_wrap">\r\n		<h2 class="rules_title">红包说明</h2>\r\n		<ul class="rules">\r\n			<li>1. 本次活动人人都有参与机会，同一微信账号和手机号码抢红包当天仅能抢一个红包；</li>\r\n			<li>2. 初一（2月16日）88个红包、初五（2月20日）188个红包、初七（2月22日）888个红包，当天08:00--18:00可在活动页面抢红包；</li>\r\n			<li>3. 抢到红包金额将以彩金的方式派发到您账户里面，红包彩金不可提现，可用于购彩，中奖后可提现。</li>\r\n		</ul>\r\n	</div>\r\n	<div class="bottom_img">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/2018chunjie_bottom.png" />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chunjieMask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="2018chunjieMask">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getSuccessBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,presentTicketAmount=$data.presentTicketAmount,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,isAndroid=$data.isAndroid,$out='';
		var period = info.period;
		var presentTicketAmount = info.presentTicketAmount/100 || 0;
	
$out+='\r\n	<div class="popup_box2">\r\n		<div class="get_success">\r\n			<a class="colse_btn" id="closePopBtn"></a>\r\n			<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='2018chunjie/success_bg.png"/>\r\n			<div class="success_cont">\r\n				<h2 class="success_title">恭喜发财</h2>\r\n				<p class="success_detail">您获得 <span class="money">';
$out+=$escape(presentTicketAmount);
$out+='</span> 元红包</p>\r\n				';
 if (period == 1) { 
$out+='\r\n					<p class="success_tips">初五、初七还有红包等着您，<br />记得来抢哦！</p>\r\n				';
 } else if (period == 2) { 
$out+='\r\n					<p class="success_tips">初七还有红包等着您，<br />记得来抢哦！</p>\r\n				';
 } else if (period == 3) { 
$out+='\r\n					<p class="success_tips" style="visibility: hidden;">红包已抢完</p>\r\n				';
 } 
$out+='\r\n				';
 if (isAndroid) { 
$out+='\r\n					<p class="success_status">红包已派发到您的账户中,<br />请前往查收</p>\r\n				';
 } else { 
$out+='\r\n					<p class="success_status">红包已派发到您的账户中</p>\r\n					<div class="pop_btn" id="checkBtn">查看</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notStartBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,period=$data.period,info=$data.info,$out='';
		var period = info.period;
	
$out+='\r\n	<div class="popup_box1">\r\n		<div class="not_started">\r\n			<h2 class="pop_title">亲，未到开抢时间哦！</h2>\r\n			';
 if (period == 1) { 
$out+='\r\n				<p class="pop_detail">2月16日 08:00 可开抢</p>\r\n			';
 } else if (period == 2) { 
$out+='\r\n				<p class="pop_detail">2月20日 08:00 可开抢</p>\r\n			';
 } else if (period == 3) { 
$out+='\r\n				<p class="pop_detail">2月22日 08:00 可开抢</p>\r\n			';
 } 
$out+='\r\n			<div class="pop_btn" id="closePopBtn">我知道啦</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,rank=$data.rank,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,prizeTicketAmount=$data.prizeTicketAmount,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var rank = list[i] || {};
	var realName = rank.realName;
	var nickName = rank.nickName;
	var userName = realName || nickName;
	var prizeTicketAmount = rank.prizeTicketAmount/100 || 0;

$out+='\r\n	<li>恭喜 [';
$out+=$escape(userName);
$out+='] 抢到一个 <span class="money">';
$out+=$escape(prizeTicketAmount);
$out+='</span> 元大红包</li>\r\n';
 } 
} else { 
$out+='\r\n	<li>恭喜发财，财运滚滚来！</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/nbaXsjxl',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="nbaQdxl_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='nbaQdxl_banner.png" alt="" />\r\n	</div>\r\n	<div class="logo_wrap">\r\n		<div class="ui-flex_item">\r\n			<div class="east_alliance_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='east_alliance_logo.png" />\r\n			</div>\r\n			<ul class="logo_box clearfix">\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/NUatz1nD7oTH4GGEt56Gkg" >\r\n						<div class="logo_item mr15 cel"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/ikqfZIJedlV_8gK8MMGoxg" >\r\n						<div class="logo_item cle"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/d3LGHyqtGN0mkVPlL-YGKg" >\r\n						<div class="logo_item mr15 tor"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/jrduN_b3kt2iyVScRK5OWA" >\r\n						<div class="logo_item mia"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/ZuHads2j_BQhwi6StVTVCQ" >\r\n						<div class="logo_item mr15 was"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/FdcLEOHTivvrTAj96DuqXg" >\r\n						<div class="logo_item mil"></div>\r\n					</a>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n		<div class="line"></div>\r\n		<div class="ui-flex_item">\r\n			<div class="west_alliance_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='west_alliance_logo.png" />\r\n			</div>\r\n			<ul class="logo_box">\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/7TxnwwIxuz8gA_VgN-EwUA" >\r\n						<div class="logo_item oct"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/xgPsaVVNtm7-wN0bZdwWfA" >\r\n						<div class="logo_item gsw"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/LM1NIYgB9608yWbVf6fONw" >\r\n						<div class="logo_item lac"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/O22j6QZ7hrr19vFc23A2ow" >\r\n						<div class="logo_item min"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/LWXuUvqU2h8TLrWbwSKGCw" >\r\n						<div class="logo_item sas"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/EcYCLGNl8WFkHNd7Xf1F8A" >\r\n						<div class="logo_item hou"></div>\r\n					</a>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="bottom_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='nbaQdxl_bottom_banner.png" />\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/rechargeSend',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.activityCotent=activityCotent;exports.activityRules=activityRules;exports.receiveList=receiveList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function activityCotent($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_cotent">\n		<div class="a20send128_banner">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_xyhdlb_logo.png" alt="" />\r\n			<span class="rules_icon" id="rulesBtn"></span>\r\n		</div>\r\n		<ul class="receive_msg" id="receiveList">\r\n			\r\n		</ul>\r\n		<div class="gift_detail">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_xyhdlb_detail.png" alt="" />\r\n		</div>\r\n		<a class="get_btn" id="getBtn"></a>\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function activityRules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="rules">\n		<li>1.本次活动每个人都有一次参与机会，同一微信账号和手机号码仅限参与活动一次；</li>\r\n		<li>2.充值完成后，赠送的优惠券将一次性派发到您的账户，优惠券分期生效，您可以在“我的”－“<span class="color_df">我的优惠券</span>”中查看；</li>\r\n		<li>3.充20得128元，其中20元作为充值本金可以立即使用，不可提现，中奖奖金随时可以提现，本活动所有发放的优惠券，<span class="color_df">有效期为7天</span>，请及时使用，逾期无效；</li>\r\n		<li>4.如发现任何形式的作弊，晒米场有权不派发或取消已派发的优惠券；</li>\r\n		<li>5.本次活动最终解释权归晒米场所有。</li>\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function receiveList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var realName = user.realName;
	var nickName = user.nickName;
	var userName = realName || nickName;

$out+='\r\n	<li>用户<span>【';
$out+=$escape(userName);
$out+='】</span>领取了<span class="color_df">大礼包</span></li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/ttqhb',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.hbMask=hbMask;exports.getSuccessBox=getSuccessBox;exports.notStartBox=notStartBox;exports.getCouponSuccessBox=getCouponSuccessBox;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isReceiveFinish=$data.isReceiveFinish,info=$data.info,isReceiveCoupon=$data.isReceiveCoupon,isReceiveHongbao=$data.isReceiveHongbao,receiveCouponType=$data.receiveCouponType,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
		var isReceiveFinish = info.isReceiveFinish;
		var isReceiveCoupon = info.isReceiveCoupon;
		var isReceiveHongbao = info.isReceiveHongbao;
		var receiveCouponType = +info.receiveCouponType;
	
$out+='\r\n	<div class="top_img">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/ttqhb_top.png" />\r\n	</div>\r\n	<div class="red_packet_wrap">\r\n		<div class="red_packet">\r\n			<img class="img-responsive red_packet_bg" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/red_packet_bg.png"/>\r\n			<div class="packet_cont">\r\n				';
 if (isReceiveHongbao) { 
$out+='\r\n					<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/red_packet_btn2.png"/>\r\n				';
 } else if (isReceiveFinish) { 
$out+='\r\n					<img class="red_packet_btn" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/red_packet_btn3.png"/>\r\n				';
 } else { 
$out+='\r\n					<img class="red_packet_btn" id="startBtn" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/red_packet_btn1.png"/>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/divide.png" />\r\n	</div>\r\n	<div class="rules_wrap">\r\n		<ul class="coupon_list ui-flex mb50">\r\n			<li class="coupon_items ui-flex_item">\r\n				<div class="coupon1 mb15">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/coupon1.png"/>\r\n				</div>\r\n				<div class="get_btn mb5">\r\n					';
 if (isReceiveCoupon  && receiveCouponType == 1) { 
$out+='\r\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/getted_btn.png"/>\r\n					';
 } else { 
$out+='\r\n						<img class="img-responsive" id="getCouponBtn1" type="1" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_btn.png"/>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="get_condition size13">\r\n					(满500元可领)\r\n				</div>\r\n			</li>\r\n			<li class="coupon_items ui-flex_item">\r\n				<div class="coupon2 mb15">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/coupon2.png"/>\r\n				</div>\r\n				<div class="get_btn mb5">\r\n					';
 if (isReceiveCoupon  && receiveCouponType == 2) { 
$out+='\r\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/getted_btn.png"/>\r\n					';
 } else { 
$out+='\r\n						<img class="img-responsive" id="getCouponBtn2" type="2" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_btn.png"/>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="get_condition size13">\r\n					(满3000元可领)\r\n				</div>\r\n			</li>\r\n			<li class="coupon_items ui-flex_item">\r\n				<div class="coupon3 mb15">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/coupon3.png"/>\r\n				</div>\r\n				<div class="get_btn mb5">\r\n					';
 if (isReceiveCoupon && receiveCouponType == 3) { 
$out+='\r\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/getted_btn.png"/>\r\n					';
 } else { 
$out+='\r\n						<img class="img-responsive" id="getCouponBtn3" type="3" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_btn.png"/>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="get_condition size13">\r\n					(满8000元可领)\r\n				</div>\r\n			</li>\r\n		</ul>\r\n		<h2 class="rules_title">活动规则</h2>\r\n		<ul class="rules">\r\n			<li>1.用户满足消费金额即可领取优惠券，每天只有一次领取机会；</li>\r\n			<li>2.优惠券每天只能领取一个，不可领取多个（例如:用户当天消费满8000元，满足领取三个优惠券的条件，但只可以选择领取三个优惠券其中一个）；</li>\r\n			<li>3.领取的优惠券可以在“我的”-“我的优惠券”查看；</li>\r\n			<li>4.优惠券有效期为7天，请及时使用，逾期无效。</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function hbMask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="ttqhbMask">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getSuccessBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,info=$data.info,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
		var info = info.info;
	
$out+='\r\n	<div class="popup_box2">\r\n		<div class="get_success">\r\n			<a class="colse_btn" id="closePopBtn"></a>\r\n			<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/success_bg.png"/>\r\n			<div class="success_cont">\r\n				<h2 class="success_title">恭喜发财</h2>\r\n				<p class="success_detail">您获得 <span class="money">';
$out+=$escape(info);
$out+='</span> 元红包</p>\r\n				<p class="success_status">红包已派发到您的账户中</p>\r\n				<div class="pop_btn" id="checkBtn">查 看</div>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notStartBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,title=$data.title,txt=$data.txt,content=$data.content,btnTxt=$data.btnTxt,undercondition=$data.undercondition,$escape=$helpers.$escape,$out='';
		var title = txt.title;
		var content = txt.content;
		var btnTxt = txt.btnTxt;
		var undercondition = !!txt.undercondition;
	
$out+='\r\n	<div class="popup_box1">\r\n		<div class="not_started">\r\n			';
 if (undercondition) { 
$out+='\r\n				<p class="undercondition">';
$out+=$escape(title);
$out+='</p>\r\n			';
 } else { 
$out+='\r\n				<h2 class="pop_title">';
$out+=$escape(title);
$out+='</h2>\r\n				<p class="pop_detail">';
$out+=$escape(content);
$out+='</p>\r\n			';
 } 
$out+='\r\n			<div class="pop_btn" id="closePopBtn">';
$out+=$escape(btnTxt);
$out+='</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function getCouponSuccessBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,info=$data.info,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
		var type = info.type;
	
$out+='\r\n	<div class="popup_box2">			\r\n		<div class="get_coupon">\r\n			<a class="colse_btn" id="closePopBtn"></a>\r\n			';
 if (type == 1) { 
$out+='\r\n				<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_coupon1.png"/>\r\n			';
 } else if (type == 2) { 
$out+='\r\n				<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_coupon2.png"/>\r\n			';
 } else if (type == 3) { 
$out+='\r\n				<img class="success_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ttqhb/get_coupon3.png"/>\r\n			';
 } 
$out+='\r\n			<div class="get_coupon_btn" id="checkBtn"></div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/turnplate',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.turnplate=turnplate;exports.prizeRecord=prizeRecord;exports.prizeRecordList=prizeRecordList;exports.trunplateNotice=trunplateNotice;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function turnplate($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div>\r\n		<img class="turnplate_title" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate_title.png"/>\r\n		<div class="banner">\r\n			<img id="rotatebg" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate.png" style="-webkit-transform: rotate(0deg);position: relative;"/>\r\n			<img class="pointer" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate_btn.png" id="start">\r\n		</div>\r\n		<p class="chance mt20">您还剩余 <span class="chance_num" id="turnplateCount">0</span> 机会<span class="tips record" id="prizeRecordBtn">抽奖记录</span></p>\r\n		<p class="tips mt5">抽奖前请仔细阅读活动规则</p>\r\n		<!--<div class="act_btn mt20">\r\n			邀请好友\r\n		</div>-->\r\n		<div class="act_btn mt10 mb10" id="rulesBtn">\r\n			活动规则\r\n		</div>\r\n		<div class="mask" style="display: none;" id="turnplateMask">\r\n			<div class="rules" id="rules" style="display: none;">\r\n				<div class="rules_title clearfix">\r\n					<span class="fl">活动规则</span>\r\n					<span class="fr" id="closeRuleBtn">关闭</span>\r\n				</div>\r\n				<pre class="rules_list" id="remark" style="line-height: 20px;white-space: pre-wrap;font-size: 15px;"></pre>\r\n			</div>\r\n			<div class="notice" id="trunplateNotice" style="display: none;"></div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function prizeRecord($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="ui-flex prize_nav">\r\n		<li class="ui-flex_item">时间</li>\r\n		<li class="ui-flex_item">奖品</li>\r\n		<li class="ui-flex_item">派送方式</li>\r\n	</ul>\r\n	<ul id="prizeRecordList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function prizeRecordList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,prizeRecord=$data.prizeRecord,prizeName=$data.prizeName,sendType=$data.sendType,createTime=$data.createTime,d=$data.d,$escape=$helpers.$escape,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
	var prizeRecord = list[i] || {};
	var prizeName = prizeRecord.prizeName;
	var sendType = prizeRecord.sendType;
	var createTime = prizeRecord.createTime && prizeRecord.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="ui-flex record_item">\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(createTime);
$out+='\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(prizeName);
$out+='\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(sendType);
$out+='\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function trunplateNotice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,numMap=$data.numMap,rotate=$data.rotate,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';  var numMap =  {'fiveCj':'5','twentyCj':'20','twoCj1':'2','twoCj2':'2'};
		if (rotate == 'thk1' || rotate == 'thk2' || rotate == 'fiveCj' || rotate == 'twentyCj' || rotate == 'twoCj1' || rotate == 'twoCj2' || rotate == 'poloShirt') { 
$out+='\r\n			<div class="notice_title">\r\n				';
 if (rotate == 'thk1' || rotate == 'thk2') { 
$out+='\r\n					<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_sorry.png"/>\r\n				';
 } else { 
$out+='\r\n					<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_congrats.png"/>\r\n				';
 } 
$out+='\r\n				<a class="close_notice icon_close" id="closeNotice"></a>\r\n			</div>\r\n		';
 if (rotate == 'poloShirt') { 
$out+='\r\n			<div class="awards pt20">\r\n				<img class="img_shirt" src="';
$out+=$escape(IMG_PATH);
$out+='img-shirt.png">\r\n				<p class="pb15">获得了<span class="color_red"> 正品球衣</span> ！</p>\r\n				<p class="size11 pb5 contact">请联系晒米场客服微信：shaimichang</p>\r\n				<p class="color_red size11 pb15">需截图作为凭证！</p>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="cont pb15">\r\n				';
 if (rotate == 'thk1' || rotate == 'thk2') { 
$out+='\r\n					<p class="txt-cont size18">\r\n						很可惜，没有抽中\r\n					</p>\r\n				';
 } else if (rotate == 'fiveCj' || rotate == 'twentyCj' || rotate == 'twoCj1' || rotate == 'twoCj2') { 
$out+='\r\n					<p class="txt-cont size18">\r\n						获得了 <span class="color_red size20">';
$out+=$escape(numMap[rotate]);
$out+='</span> 彩金\r\n					</p>\r\n				';
 } 
$out+='\r\n				<a class="btn" id="ensure">\r\n					确定\r\n				</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } else { 
$out+='\r\n		<div class="notice_title">\r\n			<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_sorry.png"/>\r\n			<a class="close_notice icon_close" id="closeNotice"></a>\r\n		</div>\r\n		<div class="cont pb15">\r\n			<p class="txt-cont">\r\n				您目前没有抽奖机会<br />每消费一次获得1次抽奖机会\r\n			</p>\r\n			<a class="btn" id="buyPlan">\r\n				确定\r\n			</a>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/activity/wdlszlzz',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_wdlszlzz_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_logo.png" alt="" />\r\n	</div>\r\n	<div class="wdlszlzz_cont">\r\n		<ul class="wdlszlzz_item_warp">\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title1"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img1.png"/>\r\n				<p class="item_describe">曼城贵为豪门联赛主场有保障；拉齐奥、瓦伦西亚本赛季变身拿分狂魔；拉涅利打造法甲神奇南特；德甲中游球队奥格斯堡表现不俗。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title2"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img2.png"/>\r\n				<p class="item_describe">皇马受替补阵容削弱的影响大，接连输盘；德甲科隆双线作战消耗严重；意甲升班马贝内文托创最差开局。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title3"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img3.png"/>\r\n				<p class="item_describe">巴黎新赛季火力冠绝全欧洲，巴萨无MSN组合导致进球效率下降明显。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title4"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img4.png"/>\r\n				<p class="item_describe">埃弗顿AC米兰豪掷两亿成绩却差强人意，尼斯欧战联赛双双失意。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title5"></h3>\r\n				<p class="item_describe mb10">冷门: 比赛打出赔率为5.5以上即为冷门。</p>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img5.png"/>\r\n				<p class="item_describe">英超法甲开赛至今冷门场次最多。皇马1比2负于赫罗纳打出12倍高赔，曼联1比2不敌哈镇打出9.1倍高赔。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title6"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img6.png"/>\r\n				<p class="item_describe mb35">四队主场胜率高达100%！英超西甲卫冕冠军竟然只有五成。</p>\r\n				<p class="item_describe">以上联赛数据资料截止至2017年11月6日。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="btn_wrap ui-flex">\r\n			<a class="bet_btn" id="betBtn">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_bet.png"/>\r\n			</a>\r\n			<a class="share_btn" id="shareBtn">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_share.png"/>\r\n			</a>\r\n		</div>\r\n		<div class="download_img mb40">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_download.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/bindMobile',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="select_box">\r\n		<input type="number" placeholder="请输入手机号" maxlength="11" id="mobile" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" maxlength="6" id="smsCode"/>\r\n		<span id="smsCodeBtn">获取验证码</span>\r\n	</div>\r\n	<div class="btn ellipsis mt20" id="bindMobileSubmit">\r\n			立即绑定\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/bonusOptimize',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.vueContent=vueContent;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="optimizeTab">\r\n		<div class="ui-flex_item active" tab="1">平均优化</div>\r\n		<div class="ui-flex_item" tab="2">博热优化</div>\r\n		<div class="ui-flex_item" tab="3">博冷优化</div>\r\n	</div>\r\n	<div id="vueContent">\r\n		\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function vueContent($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mt5 optimize_detail" id="optimizeDetail">\r\n		<div class="input_wrap">\r\n			优化金额：<input id="totalAmount" type="number" v-model="totalAmount" v-on:input="total()" /> 元\r\n		</div>\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="135">选项</th>\r\n					<th width="105">理论奖金</th>\r\n					<th>分配金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="matchList">\r\n				<tr v-for="item in matchList">\r\n					<td class="option">\r\n						<div v-for="match in item.options">\r\n							{{match.number}}<span class="size12 color6"> [{{match.bettypeContent == \'RQSPF\' ? \'让\' : \'\'}}{{match.bettype}} {{match.odd}}]</span>\r\n						</div>\r\n					</td>\r\n					<td>\r\n						<span class="color_red size16">{{item.theoryPrize}}</span>\r\n					</td>\r\n					<td>\r\n						<span class="icon_decreaseBonus" @click="changeValue(item,-2)"></span>\r\n						<span class="unitAmount">{{item.unitAmount}}</span>\r\n						<!--<input type="number" v-model="item.unitAmount" v-on:input="count(item)"/>-->\r\n						<span class="icon_addBouns" @click="changeValue(item,2)"><b></b></span>\r\n					</td>\r\n				</tr>\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="pay_num" id="ticketAmount">共 {{totalAmount}} 元</div>\r\n				<div class="bonus" id="maxPrize">理论最大奖金：{{maxPrize}}</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="createTicketSubmit" @click="submit()">\r\n				投注\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/cdsd',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.planList=planList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content_tab clearfix" id="recommendTab">\r\n		<span matchType="1">竞彩足球</span>\r\n		<span matchType="2">竞彩篮球</span>\r\n	</div>\r\n	<ul class="infoBox" id="planList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,$escape=$helpers.$escape,$string=$helpers.$string,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var match = (matchList.length>0 && matchList[0]) || {};
	var matchNum = matchList.length;
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="msg color9 clearfix">\r\n			<img class="icon_span img38 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='"></img>\r\n			<span class="personal">\r\n				<span>\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n					';
 if (continueWin > 1) { 
$out+='\r\n						<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n					';
 } else if(winCount > 0) { 
$out+='\r\n						<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n					';
 } else if (profitRate > 0) { 
$out+='\r\n						<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n					';
 } else if (winRate > 0) { 
$out+='\r\n						<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n					';
 } 
$out+='\r\n				</span><br />\r\n				<span class="size10 tag">';
$out+=$escape(userTag);
$out+='</span>\r\n			</span>\r\n			';
 if (isSale) { 
$out+='\r\n			<span class="ticket size10 fr userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n			';
 } 
$out+='\r\n		</div>\r\n		<div class="detailBox">\r\n			<div class="detail">\r\n				<div class="match_info clearfix">\r\n					<div class="match_left fl">\r\n						<span class="match_name" style="';
$out+=$escape(matchType == 2 ? 'color: #003cff' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n						';
 if (matchNum >1){ 
$out+='\r\n						<span class="match_icon all_up">串关</span>\r\n						';
 } else { 
$out+='\r\n						<span class="match_icon all_up">单关</span>\r\n						';
 } 
$out+='\r\n						';
 if (hasPic) {
$out+='\r\n							';
 if (isGirl) { 
$out+='\r\n							<span class="match_icon bg_c_p">美照</span>\r\n							';
 } else if (rich){ 
$out+='\r\n								<span class="match_icon bg_c_d09">豪单</span>\r\n							';
 } else { 
$out+='\r\n								<span class="match_icon bg_c_b">实单</span>\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n						<span class="match_icon w24 bg_c_y ';
$out+=$escape(isLinChang?'':'hide');
$out+='">临场</span>\r\n						<!-- <span class="match_icon w24 bg_c_g">语音</span> -->\r\n					</div>\r\n					<div class="size10 color9 fr match_time">';
$out+=$escape(beginTime);
$out+='</div>\r\n				</div>\r\n				<div class="ui-flex mt10">\r\n					<span class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? away : home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? home : away);
$out+='</span>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (/^true$/i.test(access)) { 
$out+='\r\n					';
 if (amount == 0) { 
$out+='\r\n						<span>免费</span>\r\n					';
 } else { 
$out+='\r\n						<span>查看</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/charge',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,financeType=$data.financeType,presentAmountMap=$data.presentAmountMap,$out='';$out+='<div class="mt15 mb10 pl10">\r\n		选择要充值的';
$out+=$escape(financeType == 1? '彩金' : '米粒');
$out+='数量：\r\n		';
 if (financeType == 1) { 
$out+='\r\n			<span class="send_handsel">首充20送128</span>\r\n		';
 } 
$out+='	\r\n	</div>\r\n	<div class="recharge_box">\r\n		<ul class="ui-flex" id="chargeList">\r\n			<li class="recharge_item active">\r\n				<div class="color_g size18 chargeNum" id="money100">\r\n					100\r\n				</div>\r\n				<!--<div class="size12 ';
$out+=$escape(financeType == 1? 'hide': '');
$out+='">\r\n					(送<span class="color_red size12">';
$out+=$escape(presentAmountMap['100']?presentAmountMap['100']:8);
$out+='</span>粒米)\r\n				</div>-->\r\n			</li>\r\n			<li class="recharge_item">\r\n				<div class="color_g size18 chargeNum" id="money500">\r\n					500\r\n				</div>\r\n				<!--<div class="size12 ';
$out+=$escape(financeType == 1? 'hide': '');
$out+='">\r\n					(送<span class="color_red size12">';
$out+=$escape(presentAmountMap['500']?presentAmountMap['500']:50);
$out+='</span>粒米)\r\n				</div>-->\r\n			</li>\r\n			<li class="recharge_item">\r\n				<div class="color_g size18 chargeNum" id="money1000">\r\n					1000\r\n				</div>\r\n				<!--<div class="size12 ';
$out+=$escape(financeType == 1? 'hide': '');
$out+='">\r\n					(送<span class="color_red size12">';
$out+=$escape(presentAmountMap['1000']?presentAmountMap['1000']:120);
$out+='</span>粒米)\r\n				</div>-->\r\n			</li>\r\n			<li class="recharge_item">\r\n				<div class="color_g size18 chargeNum" id="money10000">\r\n					10000\r\n				</div>\r\n				<!--<div class="size12 ';
$out+=$escape(financeType == 1? 'hide': '');
$out+='">\r\n					(送<span class="color_red size12">';
$out+=$escape(presentAmountMap['10000']?presentAmountMap['10000']:1500);
$out+='</span>粒米)\r\n				</div>-->\r\n			</li>\r\n			<li class="input_wrap recharge_item">\r\n				<input class="choosemoney" value="" type="number" placeholder="其他数量" id="amount" style="';
$out+=$escape(financeType == 1? 'padding:0': '');
$out+='">\r\n			</li>\r\n			<li class="recharge_item" style="visibility: hidden;"></li><!--占位-->\r\n		</ul>\r\n	</div>\r\n<!-- 第七版取消显示 -->\r\n	<!-- <div class="tishi" style="color:#000;font-size: 12px;">\r\n		支付方式：\r\n	</div>\r\n	<div class="weifu">\r\n		<div class="img"></div>\r\n		<span>微信支付</span>\r\n	</div> -->\r\n	<div class="btn btn_yes" id="chongSubmit">确认</div>\r\n	<div class="attention">\r\n		<dl>\n			<dt>注：</dt>\n			<dd>1、1';
$out+=$escape(financeType == 1 ? '彩金': '米粒');
$out+='=1元</dd>\r\n			';
 if (financeType == 0) { 
$out+='\r\n				<dd>2、米粒可用于<span class="color_red">购买专家推荐</span>，推荐收益、分享收益可提现</dd>\r\n			';
 } else if (financeType == 1) { 
$out+='\r\n				<dd>2、彩金可用于<span class="color_red">购买彩票、跟单投注</span>，中奖金额可提现</dd>\r\n			';
 } 
$out+='\n		</dl>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/chargeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.chargeList=chargeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="charge_top">\r\n		<span>时间</span>\r\n		<span>获得数量</span>\r\n		<span>来源</span>\r\n		<span>状态</span>\r\n	</div>\r\n	<ul class="charge_con" id="chargeList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function chargeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,charge=$data.charge,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,type=$data.type,typeMap=$data.typeMap,amount=$data.amount,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var charge = list[i] || {};
	var financeType = charge.financeType;
	var financeTypeMap = {'0': '米粒', '1': '彩金'}; 
	var type = charge.type || 0;
	var typeMap = {'1': '现金充值', 2: '平台赠送'};
	var amount = charge.amount/100 || 0;
	var remark = charge.remark || '';
	var createTime = charge.createTime || "";
	var matchTime = createTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (matchTime) {
		day = matchTime[1];
		time = matchTime[2];
	}

$out+='\r\n	<li class="charge_list">\r\n		<span>';
$out+=$escape(day);
$out+='<br>';
$out+=$escape(time);
$out+='</span>\r\n		<span>';
$out+=$escape(amount);
$out+=$escape(financeTypeMap[financeType]);
$out+='</span>\r\n		<span>';
$out+=$escape(remark?remark:typeMap[type]);
$out+='</span>\r\n		<span>成功</span>	\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/createPresentOrder',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<section class="hb_index">\r\n		<div class="mt25">\r\n			<input class="presentNum" type="number" id="presentNum" placeholder="请输入赠送人数" />\r\n			<p class="tips">*注：赠送有效期为一周，默认为每人机选一注双色球</p>\r\n		</div>\r\n		<!--<div class="mt25">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_sj.png" />\r\n			<p class="tips">*注：默认为机选</p>\r\n		</div>-->\r\n		<div class="mt25">\r\n			<h3 class="greeting_tit">请选择你的双色球红包祝福语</h3>\r\n			<ul class="greeting_btn clearfix mt10" id="greetingBtn">\r\n				<li class="fl" tab="1">\r\n					<div class="btn_item">\r\n						<!--<span>节日快乐</span>-->\r\n						<span>新年快乐</span>\r\n						<i class="icon_jr"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="2">\r\n					<div class="btn_item">\r\n						<!--<span>财源广进</span>-->\r\n						<span>财源滚滚</span>\r\n						<i class="icon_cy"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="3">\r\n					<div class="btn_item">\r\n						<!--<span>财色双收</span>-->\r\n						<span>年年有余</span>\r\n						<i class="icon_st"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="4">\r\n					<div class="btn_item">\r\n						<!--<span>天天中奖</span>-->\r\n						<span>名利双收</span>\r\n						<i class="icon_sy"></i>\r\n					</div>\r\n				</li>\r\n			</ul>\r\n			<textarea class="greet_txt mt25" id="presentRemark">\r\n			</textarea>\r\n			<!--<div class="greet_txt mt25">\r\n				祝你<span>节日快乐</span>，500万大奖等你拿！\r\n			</div>-->\r\n		</div>\r\n		<a class="ensure_btn mt35 mb30" id="payBtn">马上付款￥<span class="prize" id="prize">0</span> 元</a>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/createTicketOrder',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,isSale=$data.isSale,matchType=$data.matchType,plan=$data.plan,matchList=$data.matchList,amount=$data.amount,self=$data.self,ticketOrder=$data.ticketOrder,length=$data.length,i=$data.i,match=$data.match,prize=$data.prize,recommend=$data.recommend,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,concede=$data.concede,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$escape=$helpers.$escape,$string=$helpers.$string,name=$data.name,$out='';$out+='<h3 class="con_tit">跟单内容：</h3>\r\n<div class="matchInfo_box">\r\n	';
 
		var isSale;
		var matchType;
		if (plan) {
			isSale = !!plan.isSale;
			matchList = plan.matchList || [];
			matchType = plan.matchType || 1;
			var amount = plan.amount;
		} else if (self) {
			isSale = !!self.isSale;
			matchList = self.matchList || [];
		} else if (ticketOrder) {
			isSale = !!ticketOrder.isSale;
			matchList = ticketOrder.matchList || [];
			matchType = ticketOrder.matchType || 1;
			var amount = ticketOrder.amount;
		}
		var length = matchList.length;
		for (var i = 0; i < length; i++) {
			var match = matchList[i] || {};
			var prize = match.prize || [];
			var recommend = match.recommend || [];
			var matchId = match.matchId || 0;
			var oddsId = match.oddsId || 0;
			var bettypeContent = match.bettypeContent || "";
			var concede = match.concede;
			var Hconcede;
			var Aconcede;
			if (concede > 0) {
				Hconcede = '+' + (concede);
				Aconcede = -concede;
			} else {
				Hconcede = concede;
				Aconcede = '+' + (-concede)
			}
			var bettypeOdds = match.bettypeOdds || {};
			var bettype = match.bettypeValue || {};
			var recommendLength = recommend.length;
			if (self) {
				matchType = match.type
			}
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
				continue;
			}
			match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
			var nullOdds = '--';//赔率为空显示值
			var recommendMap = {};
			for (var j = 0; j < recommendLength; j++) {
				recommendMap[recommend[j]] = true;
			}
			var bettypeResult = match.bettypeResult || {};
			var number = match.number;
	
$out+='\r\n		<div class="matchInfo_wrap">\r\n			<div class="matchInfo clearfix">\r\n				<span class="size14 fl match_name" style="';
$out+=$escape(matchType == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n				<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n			</div>\r\n			<div class="ui-flex color3">\r\n				<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n				 ';
 if (match.result) { 
$out+='\r\n					';
 if (bettypeContent == "BQC") { 
$out+='\r\n					<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n					';
 } else { 
$out+='\r\n					<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					vs\r\n				';
 } 
$out+=' \r\n				<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+=$string(matchType == 2 ? '(主)' : '');
$out+='</div>\r\n			</div>\r\n		';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n			<div class="ui-flex flex_wrap pl40">\r\n				<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平局 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "SF" && matchType == 1) { 
$out+='\r\n			<div class="ui-flex mt15 positionR yapan">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n			</div>\r\n		';
 } else if (bettypeContent == 'SF') { 
$out+='\r\n			<div class="ui-flex mt15 positionR">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n			</div>\r\n		';
 } else if (bettypeContent == 'RFSF') { 
$out+='\r\n			<div class="ui-flex mt15 positionR">\r\n				<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n			</div>\r\n		';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n			<div class="ui-flex mt15 flex_wrap">\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["D"]);
$out+='</span></div>\r\n				<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="ui-flex flex_wrap">\r\n				';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n				<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				';
 } 
$out+='\r\n				';
 
				if (plan && prize.length <= 0) {
					for (var name in bettypeResult) {
						if (!bettypeResult[name]) {
							continue;
						}
				
$out+='\r\n					<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n				';

					}
				}
				
$out+='\r\n			</div>\r\n		';
 } 
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n</div>\r\n<!--<div class="read ml10 mt5 mb30">\r\n	<label><input type="checkbox" name="tongyi" id="protocol" checked="checked" />已阅读并同意</label>\r\n	<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n</div>-->\r\n<div class="buy_list ';
$out+=$escape(isSale?'':'hide');
$out+='">\r\n	<div class="read pl10 pt5">\r\n		<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked" />\r\n		<label for="protocol">已阅读并同意</label>\r\n		<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n	</div>\r\n	<div class="pass_way clearfix" id="passTypeBox" style="display: none;"></div>\r\n	<div class="ui-flex">\r\n		<!--<div class="ui-flex_item size18">';
$out+=$escape(length>1?length+'串1':'单关');
$out+='</div>-->\r\n		<div class="ui-flex_item">\r\n			<div class="select_btn" id="passTypeBtn">\r\n			<span class="select_txt" id="passTypeText"></span>\r\n				<span class="select_triangle icon_select_up" id="passTypeIcon"></span>\r\n			</div>\r\n		</div>\r\n		<div class="bet_multiple color6 size16">\r\n			<span class="ml10 icon_jetton10" id="ticketMultiple10"></span>\r\n			<span class="icon_jetton100" id="ticketMultiple100"></span>\r\n			<span class="icon_jetton1000" id="ticketMultiple1000"></span>\r\n			<span class="mr10"><input class="another_multiple" type="number" value="10" min="10" max="10000" id="ticketMultiple"/>倍</span>\r\n		</div>\r\n	</div>\r\n	<div class="pay_info clearfix">\r\n		<div class="pay_left fl">\r\n			<div class="pay_num"><span id="countUnit"></span><span id="ticketAmount"></span></div>\r\n			<div class="bonus" id="maxPrize">理论最大奖金：0</div>\r\n		</div>\r\n		<div class="pay_btn fr" id="createTicketSubmit" planAmount="';
$out+=$escape(amount);
$out+='">\r\n			投注\r\n		</div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/demo',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.myTag1=myTag1;exports.myTag2=myTag2;exports.myTag3=myTag3;exports.myTag4=myTag4;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,static1=$data.static1,static2=$data.static2,$out='';$out+='<div id="myContent">\r\n	<div>';
$out+=$escape( static1);
$out+='</div>\r\n	<div>';
$out+=$escape( static2);
$out+='</div>\r\n  <div>{{ name1 }}</div>\r\n  <div>{{ name2 }}</div>\r\n	<myTag1></myTag1><!-- 自定义标签 -->\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag1($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag1->{{ message1 }}</p>\r\n  <myTag2></myTag2><!-- 闭合标签方式 -->';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag2($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag2->{{ message2 }}</p>\r\n  <myTag3/><!-- 单标签方式 -->';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag3($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag3->{{ message3 }}</p>\r\n  <myTag4></myTag4>';
return new String($out);
}).call(templateUtils,$data).toString()}function myTag4($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p>myTag4->{{ message4 }}</p>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/digitalPlanDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.mask=mask;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,planNo=$data.planNo,plan=$data.plan,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,isSale=$data.isSale,maxPrizeRate=$data.maxPrizeRate,resourceList=$data.resourceList,betContentList=$data.betContentList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,matchType=$data.matchType,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,drawNumber=$data.drawNumber,issue=$data.issue,$escape=$helpers.$escape,i=$data.i,list=$data.list,betContent=$data.betContent,betContentResult=$data.betContentResult,selectNum=$data.selectNum,name=$data.name,j=$data.j,singleNum=$data.singleNum,singleNumKey=$data.singleNumKey,Object=$data.Object,activeNum=$data.activeNum,length=$data.length,$out='';
	var planNo = plan.planNo || "";
	var content = plan.content || "";
	var upCount = plan.upCount || 0;
	var downCount = plan.downCount || 0;
	var shareCount = plan.shareCount || 0;
	var isSale = !!plan.isSale;
	var maxPrizeRate = plan.maxPrizeRate || 0;
	var resourceList = plan.resourceList || [];
	var betContentList = plan.betContentList || [];
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";
	var matchType = plan.matchType;
	var lotteryIssue = plan.lotteryIssue || {};
	var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var drawNumber = lotteryIssue.drawNumber || "";
	drawNumber = drawNumber.split('|')[0];
	var issue = lotteryIssue.issue;

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">晒米人：';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 
			for (var i = 0; i < betContentList.length; i++) { 
				var list = betContentList[i] || {};
				var betContent = list.betContent || "";
				var betContentResult = list.betContentResult || {};
				var selectNum = betContentResult.value || [];
				var name = betContentResult.name || '';
		
$out+='\r\n			<div class="matchInfo_wrap clearfix">\n				<img class="img40 fl" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="ml50">\n					<div class="clearfix digital_issue">\r\n						<span class="fl size13 color6">\r\n							';
$out+=$escape(issue);
$out+='期\r\n						</span>\r\n						<span class="fr color9 size12">\r\n							开奖：';
$out+=$escape(drawNumber?drawNumber:drawTime);
$out+='\r\n						</span>\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='：\r\n						';
 
							for (var j = 0; j < selectNum.length; j++) { 
								var singleNum = selectNum[j];
								var singleNumKey = Object.keys(singleNum)[0];
								var activeNum = singleNum[singleNumKey];
						
$out+='\r\n						<span class="recommend_num ';
$out+=$escape(activeNum ? 'color_red' : '');
$out+='">';
$out+=$escape(singleNumKey);
$out+='</span>\r\n						';
 } 
$out+='\r\n					</div>\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="planDetail">\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 if(isSale) { 
$out+='\r\n	<div class="expertInfo_bottom">\r\n		<div class="ui-flex bet">\r\n			<div class="ui-flex_item textR" id="addTicket">\r\n				<a class="digital_btn">一键跟单</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mask" id="ticketOrderMask">\r\n		<div class="pop5"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/dlt',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ssqNum=ssqNum;exports.ssqBet=ssqBet;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function ssqNum($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="close_time"><span id="issue"></span>期投注截止：<span class="size14 color_red" id="endTime"></span></p>\r\n	<div class="clearfix btn-tips">\r\n		<span class="fl filter_btn" @click="chooseRandomBall()">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="fr color6 tips">\r\n			至少选择5个红球 2个篮球\r\n		</span>\r\n	</div>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="redBallList">\r\n			<li class="fl" v-for="item in redBall">\r\n				<span class="red_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.redNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="blueBallList">\r\n			<li class="fl" v-for="item in blueBall">\r\n				<span class="blue_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.blueNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{singleUnit*2}} 元</span></div>\r\n				<div class="bonus">注数：{{singleUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="ensureSelect()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ssqBet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex btn_wrap">\r\n		<span class="ui-flex_item filter_btn" @click="addRandomList(1)">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="addRandomList(5)">\r\n			<span class="add_sign"></span>\r\n			机选5注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="backToSsq()">\r\n			<span class="add_sign"></span>\r\n			手动选号\r\n		</span>\r\n	</div>\r\n	<div class="num_list mt10"> \r\n		<ul class="jxlist">\r\n			<li v-for="item in ssqItems">\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n						<em class="size20" v-for="redball in item.redballs">{{redball}}</em>\r\n					</span>\r\n<!--					--><span class="blue_ball">\r\n						<em class="size20" v-for="blueball in item.blueballs">{{blueball}}</em>\r\n					</span>\r\n				</div>\r\n				<a class="del_btn">\r\n					<span class="del" @click="cancel(item)"></span>\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pb10">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div>\r\n		<div class="mutiple_warp clearfix">\n			<div class="dlt_mutiple">\n				<span class="mr5">投</span>\r\n				<span class="icon_decrease_multiple mr10" @click="changeValue(-1)"></span>\r\n				<input type="number" v-model="multiple" maxlength="2" value="10" min="10" max="10000" />\r\n				<span class="icon_add_multiple ml10" @click="changeValue(1)"></span>\r\n				<span class="ml5">倍</span>\r\n				<span class="additional_wrap">\r\n					<input class="additional_btn" type="checkbox" name="" id="additional" @click="moneyAppend()"/>\r\n					<label class="additional" for="additional">追加投注</label>\r\n				</span>	\n			</div>	\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{prize}} 元</span></div>\r\n				<div class="bonus">注数：{{totalUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="createSubmit()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/documentaryMarket',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.publishMarket=publishMarket;exports.orderPublishList=orderPublishList;exports.specification=specification;exports.planList=planList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function publishMarket($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex nav_wrap" id="navTab">\r\n		<div class="ui-flex_item" tab="1">\r\n			<span>自购大神</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="2">\r\n			<span>推荐专家</span>\r\n		</div>\r\n	</div>\r\n	<div class="self_list mt5">\r\n		<ul class="self_wrap" id="orderPublishList"></ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderPublishList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,publish=$data.publish,orderNo=$data.orderNo,amount=$data.amount,betAmount=$data.betAmount,matchType=$data.matchType,maxPrizeAmount=$data.maxPrizeAmount,followAmount=$data.followAmount,maxPrizeRate=$data.maxPrizeRate,createTime=$data.createTime,d=$data.d,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,betTag=$data.betTag,betTagMap=$data.betTagMap,matchTypeMap=$data.matchTypeMap,maxBettypeOdds=$data.maxBettypeOdds,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {	
	for (var i = 0; i < length; i++) {
	var publish = list[i] || {};
	var orderNo = publish.orderNo;
	var amount = publish.amount/100 || 0;
	var betAmount = publish.betAmount/100 || 0;
	var matchType = publish.matchType || 1;
	var maxPrizeAmount = publish.maxPrizeAmount;
	var followAmount = publish.followAmount/100 || 0;
	var maxPrizeRate = publish.maxPrizeRate;
	var createTime = publish.createTime && publish.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = publish.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var betTag = user.betTag;
	var betTagMap = {'千元户' : 'thousand','万元户': 'ten-thousand', '十万元户': 'hundred-thousand'};
	var matchTypeMap = {'1': '竞彩足球','2': '竞彩篮球'};
	var maxBettypeOdds = maxPrizeRate/100;

$out+='\n	<li class="self_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="color6 ui-flex">\r\n			<div>\r\n				<img class="icon_span img29" src="';
$out+=$escape(userImg);
$out+='">\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n					<span class="icon ';
$out+=$escape(betTagMap[betTag]);
$out+='"></span>\r\n				</span>\r\n			</div>\r\n			<div class="size10">返奖：<span class="color_red">';
$out+=$escape(maxPrizeRate);
$out+='%</span></div>\r\n		</div>\r\n		<div class="ui-flex item_msg">\r\n			<span>';
$out+=$escape(matchTypeMap[matchType]);
$out+=' ';
$out+=$escape(createTime);
$out+='</span>\r\n			<span>';
$out+=$escape(betAmount);
$out+='元起投</span>\r\n		</div>\r\n		<div class="ui-flex">\r\n			<div class="color6">\r\n				<span class="mr35">自购：<span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</span>\r\n				<span class="">跟单：<span class="color_red">';
$out+=$escape(followAmount);
$out+='</span>元</span>\r\n			</div>\r\n			<span class="ticket size10" planNo="';
$out+=$escape(orderNo);
$out+='" betAmount="';
$out+=$escape(betAmount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='">立即跟单</span>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#lotteryHall">自购</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function specification($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mt10 ml10 mr10">\r\n		<h3>跟单是什么？</h3>\r\n		<p>跟单即跟着中奖高手的方案投注，最低跟投一注。</p>\r\n		\r\n		<h3 class="mt20">如何把方案分享到跟单市场？</h3>\r\n		<p>自购竞彩足球、竞彩篮球的方案，在方案详情中，点击方案底部“分享到跟单市场”即可。</p>\r\n		<h3 class="mt20">如何分享给好友？</h3>\r\n		<p>点击方案详情中右上角“分享”按钮，可以分享到微信群或者朋友圈，让更多人看到你的方案，并跟单。</p>\r\n		<h3 class="mt20">自购大神介绍</h3>\r\n		<dl>\n			<dt>大神分类：</dt>\n			<dd>千元户：对应彩种单笔方案中奖超过1千元；</dd>\r\n			<dd>万元户：对应彩种单笔方案中奖超过1万元；</dd>\r\n			<dd>十万元户：对应彩种单笔方案中奖超过十万元；</dd>\r\n			<dd>百万元户：对应彩种单笔方案中奖超100万元。</dd>\n		</dl>\r\n		<dl class="mt10">\n			<dt>分成比例：</dt>\n			<dd>为保障跟单用户的利益，跟单方案需盈利30%以上，才可以分成。</dd>\r\n			<dd>中奖奖金的10%将作为分成（加奖部分不算在内），其中专家分成7%，剩余3%将作为平台服务费。</dd>\n		</dl>\r\n		<h3 class="mt20">推荐专家介绍</h3>\r\n		<dl>\r\n			<dt>专家状态：</dt>\r\n			<dd>5连红：专家近5单推荐都命中；；</dd>\r\n			<dd>胜60%：近7天专家推荐的命中率未60%；</dd>\r\n			<dd>10中6：近10单专家推荐命中了6单；</dd>\r\n			<dd>赢30%：近7天专家推荐整体盈利30%，扣除了成本。</dd>\r\n		</dl>\r\n		<dl class="mt10">\r\n			<dt>分成比例：</dt>\r\n			<dd>为保障跟单用户的利益，跟单方案需盈利15%以上，才可以分成。</dd>\r\n			<dd>中奖奖金的5%将作为分成（加奖部分不算在内），其中专家分成4%，剩余1%将作为平台服务费。</dd>\r\n		</dl>\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var match = (matchList.length>0 && matchList[0]) || {};
	var matchNum = matchList.length;
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="msg color9 clearfix">\r\n				<img class="icon_span img29 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" />\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n				</span>\r\n				';
 if (continueWin > 1) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\r\n				';
 } else if(winCount > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\r\n				';
 } else if (profitRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\r\n				';
 } else if (winRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\r\n				';
 } else { 
$out+='\r\n					\r\n				';
 }
$out+='\r\n			</div>\r\n			<div class="recommend_item">\r\n				<p class="recommend_title">\r\n					';
 if (hasPic) {
$out+='\r\n						<span class="">【实单】</span>\r\n					';
 } 
$out+='\r\n					';
 if (title) { 
$out+='\r\n						';
$out+=$escape(title);
$out+='\r\n					';
 } else { 
$out+='\r\n						';
 
							for (var j = 0; j < matchNum; j++) { 
								var match = matchList[j] || {};
								var home = match.home;
								var away = match.away;
								var number = match.number;
						
$out+='\r\n							<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n				</p>\r\n				<div class="clearfix mt25">\r\n					<span class="recommend_money fl">\r\n						';
 if (/^true$/i.test(access)) { 
$out+='\r\n							';
 if (amount == 0) { 
$out+='\r\n								<span class="color_red">免费</span>\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">查看</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n						';
 } 
$out+='\r\n					</span>\r\n					<span class="recommend_time fr">\r\n						截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="documentary_bet ui-flex">\r\n			<div class="documentary_num">\r\n				用户跟投：\r\n				<span class="color_red size13">\r\n					';
$out+=$escape(saleTicketAmount);
$out+='元\r\n				</span>\r\n			</div>\r\n			';
 if (isSale) { 
$out+='\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/download',function(require,exports){var templateUtils = (function (){
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
})();exports.pc=pc;exports.mobile=mobile;function pc($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="pc">\r\n	<div class="pc_left fl">\r\n		<img class="img-responsive pc_phone" src="';
$out+=$escape(IMG_PATH);
$out+='pc_phone.png"/>\r\n	</div>\r\n	<div class="pc_right fr">\r\n		<div class="pc_right_top">\r\n			<img class="img-responsive pc_logo" src="';
$out+=$escape(IMG_PATH);
$out+='PC_logo.png"/>\r\n		</div>\r\n		<div class="pc_right_bottom">\r\n			<img class="img-responsive fl pc_code" src="';
$out+=$escape(IMG_PATH);
$out+='pc_code.png"/>\r\n			<div class="download_btn_wrap fr">\r\n				<a id="androidBtn">\r\n					<div class="download_btn icon_android mb35"></div>\r\n				</a>\r\n				<a id="iphoneBtn">\r\n					<div class="download_btn icon_iphone"></div>\r\n				</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_bottom">\r\n		<p>晒米场&nbsp;&nbsp;一晒米 就收米</p>\r\n		<p><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>\r\n</div>\r\n<div id="androidQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>\r\n<div id="iosQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mobile($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="down-clumn">\r\n		<div class="mb-logo">晒米场</div>\r\n		<div class="btn_wrap">\r\n			<a class="down-btn down_ios" id="mobileDownIos">ihone下载</a>\r\n			<a class="down-btn down_android" id="mobileDownAndriod">adroid下载</a>\r\n		</div>\r\n		<p class="down_txt">点击右上角三个点，选择在"浏览器中打开"即可</p>\r\n	</div>\r\n	<div class="mb_download_bottom">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='mb_download_bottom.png"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/drawHistory',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.SSQ=SSQ;exports.SSQdrawList=SSQdrawList;exports.JSK3=JSK3;exports.K3drawList=K3drawList;exports.GX11X5=GX11X5;exports.GX11X5DrawList=GX11X5DrawList;exports.FC3D=FC3D;exports.fc3dDrawList=fc3dDrawList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function SSQ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="dty_cont">\r\n		<div class="ssqInfo_box">\r\n			<ul class="ssqlist" id="SSQdrawList">\r\n				\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SSQdrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,day=$data.day,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['周日','周一','周二','周三','周四','周五','周六'];
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(day);
$out+=' (';
$out+=$escape(weekMap[week]);
$out+=')</span></p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed;
				if (lotteryId == 'SSQ') {
					drawNumberRed = drawNumber.split('|')[0].split(",");
				} else if (lotteryId == 'DLT') {
					drawNumberRed = drawNumber.split('+')[0].split(",");
				}
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span> \r\n			<span class="blue_ball">\r\n			';
 	var drawNumberBlue;
				if (lotteryId == 'SSQ') {
					drawNumberBlue = drawNumber.split('|')[1].split(",");
				} else if (lotteryId == 'DLT') {
					drawNumberBlue = drawNumber.split('+')[1].split(",");
				}
				for (var k = 0; k < drawNumberBlue.length; k++) { 
					var drawNumberBlueUnit = drawNumberBlue[k];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function JSK3($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="k3draw_list" id="K3drawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function K3drawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawFeature=$data.drawFeature,drawTime=$data.drawTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var issue = list[i].issue;
	var drawNumber = list[i].drawNumber || '';
	drawNumber = drawNumber.split(',');
	var drawFeature = list[i].drawFeature || '';
	var drawTime = list[i].drawTime || "";
	drawTime = drawTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (drawTime && drawTime.length == 3) {
		day = drawTime[1];
		time = drawTime[2];
	}

$out+='\r\n	<li class="draw_item">\r\n		<div class="issue_msg">\r\n			<span>';
$out+=$escape(issue);
$out+='期</span> \r\n			<span>';
$out+=$escape(time);
$out+='</span>\r\n		</div>\r\n		<div class="draw_num">\r\n			<span class="num_icon">\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[0]);
$out+='"></i>\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[1]);
$out+='"></i>\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[2]);
$out+='"></i>\r\n			</span>\r\n			<span class="ml15 k3_describe">';
$out+=$escape(drawFeature);
$out+='</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function GX11X5($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ssqInfo_box">\r\n		<ul class="ssqlist" id="GX11X5DrawList">\r\n			\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function GX11X5DrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(drawTime);
$out+=' </p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed = drawNumber.split(",");
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span> \r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function FC3D($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="fc3dInfo_box">\r\n		<ul class="ssqlist" id="fc3dDrawList">\r\n			\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dDrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,day=$data.day,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,testNum=$data.testNum,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['周日','周一','周二','周三','周四','周五','周六'];
		var testNum = drawNumber.split('|')[1].split(',').join(' ');
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(day);
$out+=' (';
$out+=$escape(weekMap[week]);
$out+=')</span></p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed;
				drawNumberRed = drawNumber.split('|')[0].split(",");
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span>\r\n			<span class="test_num color6 size15">\r\n				试机号：<span class="size15">';
$out+=$escape(testNum);
$out+='</span>\r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/editDigitalPlan',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.amountList=amountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,recommendContent=$data.recommendContent,length=$data.length,item=$data.item,issue=$data.issue,title=$data.title,selectContent=$data.selectContent,$escape=$helpers.$escape,matchRecommend=$data.matchRecommend,$out=''; 
	var recommendContent = recommendContent || [];
	var length = recommendContent.length;
	if (length > 0) {
			var item = recommendContent[length-1] || {};
			var issue = item.issue;
			var title = item.title;
			var selectContent = item.selectContent;
			if (title == '直选') {
        		selectContent = selectContent.join("").split("|")[0].trim().split("　")+ '|' + selectContent.join("").split("|")[1].trim().split("　") + '|' + selectContent.join("").split("|")[2].trim().split("　");
        	} else {
        		selectContent = selectContent.join(",")
        	}

$out+='\r\n			<div class="select_box clearfix">\r\n				<span class="color6" id="issue">';
$out+=$escape(issue);
$out+='期</span>：\r\n				[<span class="">';
$out+=$escape(title);
$out+='</span>]\r\n				<span>';
$out+=$escape(selectContent);
$out+='</span>\r\n			</div>\r\n';
 } else { 
$out+='\r\n	<div class="select_box pr27 clearfix" id="selectMatch">\r\n		选择推荐项\r\n		<span class="icon_span icon_round_add"></span>\r\n	</div>\r\n';
 } 
$out+='\r\n<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n	彩票实单截图(限一张)\r\n	<span class="icon_span icon_round_add"></span>\r\n	<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n</div>\r\n<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n	<div class="planpicBox"> \r\n		<div id="fileList"></div>\r\n		<div class="addFrame fl mt5 ml5">\r\n			<span class="editPic icon_add active"></span>\r\n			<span class="editPic icon_delete"></span>\r\n			<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n<input type="hidden" id="matchRecommend" value="';
$out+=$escape(matchRecommend);
$out+='"/>\r\n<input type="hidden" id="amount" value=""/>\r\n<div class="textareaBox mt10">\r\n	<textarea id="content" class="textarea" placeholder="输入你分析的文字"></textarea>\r\n</div>\r\n<p class="color3 mt20">方案定价：</p>\r\n<div class="ui-flex mt10" id="amountList"></div>\r\n<div class="btn mt30" id="editSubmit">\r\n	发布\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function amountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,amount=$data.amount,$escape=$helpers.$escape,$out=''; 
	for (var i = 0, length = list.length; i < length; i++) {
	var amount = list[i];

$out+='\r\n	<div class="textBar ui-flex_item ';
$out+=$escape(i>0?'ml10':'');
$out+='" amount="';
$out+=$escape(amount);
$out+='">';
$out+=$escape(amount==0?'免费':(amount/100)+'元');
$out+='</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/editPlan',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.recommend=recommend;exports.replay=replay;exports.amountList=amountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function recommend($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,bettypeMap=$data.bettypeMap,matchRecommend=$data.matchRecommend,matchList=$data.matchList,length=$data.length,i=$data.i,item=$data.item,match=$data.match,odds=$data.odds,recommend=$data.recommend,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,type=$data.type,$escape=$helpers.$escape,$string=$helpers.$string,JSON=$data.JSON,$out=''; 
		var bettypeMap = {
			"BF": {"1:0":"1:0","2:0":"2:0","2:1":"2:1","3:0":"3:0","3:1":"3:1","3:2":"3:2","4:0":"4:0","4:1":"4:1","4:2":"4:2","5:0":"5:0","5:1":"5:1","5:2":"5:2","SQT":"胜其他","0:0":"0:0","1:1":"1:1","2:2":"2:2","3:3":"3:3","PQT":"平其他","0:1":"0:1","0:2":"0:2","1:2":"1:2","0:3":"0:3","1:3":"1:3","2:3":"2:3","0:4":"0:4","1:4":"1:4","2:4":"2:4","0:5":"0:5","1:5":"1:5","2:5":"2:5","FQT":"负其他"},
			"ZJQ": {"0":"0球","1":"1球","2":"2球","3":"3球","4":"4球","5":"5球","6":"6球","7+":"7+球"},
			"BQC": {"SS":"胜胜","SP":"胜平","SF":"胜负","PS":"平胜","PP":"平平","PF":"平负","FS":"负胜","FP":"负平","FF":"负负"},
			"SFC": {"F1-5":"客胜1-5","F6-10":"客胜6-10","F11-15":"客胜11-15","F16-20":"客胜16-20","F21-25":"客胜21-25","F26+":"客胜26+","S1-5":"主胜1-5","S6-10":"主胜6-10","S11-15":"主胜11-15","S16-20":"主胜16-20","S21-25":"主胜21-25","S26+":"主胜26+"}
		}
		var matchRecommend = "";
		matchList = matchList || [];
		var length = matchList.length;
		if (length > 0) {
			matchRecommend = [];
			for (var i = 0; i < length; i++) {
				var item = matchList[i] || {};
				var match = item.match || {};
				var odds = item.odds || {};
				var recommend = item.recommend || [];
				var matchId = match.matchId || 0;
				var oddsId = odds.oddsId || 0;
				var bettypeContent = odds.bettypeContent || "";
				var recommendLength = recommend.length;
				if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
					continue;
				}
				match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
				var concede = odds.concede;
				var bettypeOdds = odds.bettypeOdds || {};
				var bettype = bettypeMap[bettypeContent] || {};
				var recommendMap = {};
				for (var j = 0; j < recommendLength; j++) {
					recommendMap[recommend[j]] = true;
				}
				matchRecommend.push({matchId: matchId, oddsId: oddsId, recommend: recommend});
				var type = match.type;
	
$out+='\r\n				<div class="select_box clearfix">\r\n					<div class="matchInfo clearfix">\r\n						<span class="size14 fl match_name" style="';
$out+=$escape(type == 2 ? 'color: #003cff' : '');
$out+='">';
$out+=$escape(match.league);
$out+='</span>\r\n						<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="ui-flex color3">\r\n						<div class="ui-flex_item ellipsis">';
$out+=$string(type == 2 ? match.away : match.home);
$out+='</div>\r\n						 vs\r\n						<div class="ui-flex_item ellipsis textR">';
$out+=$string(type == 2 ? match.home : match.away);
$out+='</div>\r\n					</div>\r\n					';
 if (bettypeContent == 'SPF' || bettypeContent == 'RQSPF') { 
$out+='\r\n						<div class="ui-flex mt15 pl40 positionR">\r\n							<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds['P']);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n						</div>\r\n					';
 } else if (bettypeContent == 'SF' || bettypeContent == 'RFSF') { 
$out+='\r\n						<div class="ui-flex mt15 positionR">\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n							';
 if (bettypeContent == "RFSF") { 
$out+='\r\n								<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							';
 } 
$out+='\r\n							<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n						</div>\r\n					';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n						<div class="ui-flex mt15 flex_wrap">\r\n							<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n						</div>\r\n					';
 } else { 
$out+='\r\n						<div class="ui-flex mt15 positionR">\r\n							';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n							<div class="textBar ui-flex_item ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]);
$out+='</div>\r\n							';
 } 
$out+='\r\n						</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n		';

			}
			matchRecommend = JSON.stringify(matchRecommend);
		
$out+='\r\n	';
 } else { 
$out+='\r\n		<div class="select_box pr27 clearfix" id="selectMatch">\r\n			选择赛事、推荐项\r\n			<span class="icon_span icon_round_add"></span>\r\n		</div>\r\n	';
 } 
$out+='\r\n	<p class="size11 color9 mt10">注：发起串关、单固玩法，用户跟单，<span class="color_red size11">享奖金5%的分成</span></p>\r\n	<input class="title_input mt5" type="text" placeholder="输入您的标题，增加吸引力（至少5字）" id="title"  />\r\n	<p class="mt10">如何填写标题？<a class="replay_method" href="http://mp.weixin.qq.com/s/VRFUO0WpcNnm6pjuJ_I97A">点击查看攻略</a></p>\r\n	<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n		晒方案截图(限一张)\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n		<div class="planpicBox"> \r\n			<div id="fileList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<input type="hidden" id="matchRecommend" value="';
$out+=$escape(matchRecommend);
$out+='"/>\r\n	<input type="hidden" id="amount" value=""/>\r\n	<div class="textareaBox mt10">\r\n		<textarea id="content" class="textarea" placeholder="输入你分析的文字"></textarea>\r\n	</div>\r\n	<p class="color3 mt20">方案定价：</p>\r\n	<div class="ui-flex mt15" id="amountList"></div>\r\n	<div class="btn mt30" id="editSubmit">\r\n		发布\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function replay($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input class="title_input mt10" type="text" placeholder="输入您的标题，增加吸引力（至少5字，必填）" id="title"  />\n	<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n		晒复盘截图(限一张，必填)\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n		<div class="planpicBox"> \r\n			<div id="fileList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="textareaBox mt10">\r\n		<textarea id="content" class="textarea" placeholder="输入你的复盘文字（必填）"></textarea>\r\n	</div>\r\n	<div class="btn mt30" id="editSubmit">\r\n		发布\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function amountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,amount=$data.amount,$escape=$helpers.$escape,$out=''; 
	for (var i = 0, length = list.length; i < length; i++) {
	var amount = list[i];

$out+='\r\n	<div class="textBar ui-flex_item ';
$out+=$escape(i>0?'ml10':'');
$out+='" amount="';
$out+=$escape(amount);
$out+='">';
$out+=$escape(amount==0?'免费':(amount/100)+'元');
$out+='</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/error',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$out='';$out+='<div class="gudieBox">\r\n	<div class="guide">\r\n		<p class="color9">你不小心来的了外星球</p>\r\n		<span class="btn" id="backBtn">返回地球</span>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/fc3d',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.fc3dNum=fc3dNum;exports.ZUX=ZUX;exports.fc3dBet=fc3dBet;exports.fc3dList=fc3dList;exports.HZ=HZ;exports.ZHX=ZHX;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function fc3dNum($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,recommend=$data.recommend,$out='';$out+='<div class="nav_wrap">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<span>直选</span>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<span>和值</span>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<span>组三</span>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<span>组六</span>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<p class="deadline">距<span id="issue"></span>期截止：<span class="color_red" id="time"></span></p>\r\n		';
 if (!recommend) { 
$out+='\r\n			<div class="pay_info clearfix">\r\n				<div class="pay_left fl">\r\n					<div class="mb10">金额：<span class="colorf5e" id="price">0 元</span></div>\r\n					<div class="bonus" id="unit">注数：0 注</div>\r\n				</div>\r\n				<div class="pay_btn fr" id="ensureBtn">\r\n					确定\r\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,i=$data.i,length=$data.length,ZxNum=$data.ZxNum,num=$data.num,$escape=$helpers.$escape,$out=''; if (type == 3) { 
$out+='\r\n		<p class="size12 color6">玩法：至少选择2个号码，开奖号码为组三且包含在选号中即中奖<span class="size12 color_red">346</span>元。组三是指开奖号码中任意两位号码相同，如166。</p>\r\n	';
 } else if (type == 4) { 
$out+='\r\n		<p class="size12 color6">玩法：至少选择3个号码，开奖号码为组六且包含在选号中即中奖<span class="size12 color_red">173</span>元。组六是指开奖号码中三个号码各不相同，如135。</p>\r\n	';
 } 
$out+='\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = ZxNum.length; i < length; i++) {
					var num = ZxNum[i].num;
			
$out+='\r\n			<li class="num_item_5" data-value ="';
$out+=$escape(num);
$out+='">\r\n				<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dBet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="fc3d_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="fc3dList">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,selectNum=$data.selectNum,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var selectNum = selectContent[i].selectContent;
		compare = selectNum.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(title + compare);
$out+='">\r\n		<div class="num_wrap ui-flex">\r\n			<span class="play_type">\r\n				[';
$out+=$escape(title);
$out+=']\r\n			</span> \r\n			<span class="sel_num ui-flex_item">\r\n				';
 
					for (var j = 0; j < selectNum.length; j++) {
						var num = selectNum[j];
				
$out+='\r\n					<em>';
$out+=$escape(num);
$out+='</em>\r\n				';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n		<a class="del_btn">\r\n			<span class="del"></span>\r\n		</a>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function HZ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,HzNum=$data.HzNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：和值是指开奖号码中三个号码之和，所选和值与开奖号码和值一致即中奖<span class="size12 color_red">1040</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = HzNum.length; i < length; i++) {;
						var num = HzNum[i].num;
				
$out+='\r\n				<li class="num_item_5" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从百、十、个位至少各选1个号码，单注选号与开奖号码按位一致即中奖<span class="size12 color_red">1040</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_hundreds"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_deckle"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_unit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="thirdNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/focusList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.focusListBox=focusListBox;exports.focusList=focusList;exports.noFocusList=noFocusList;exports.userListBox=userListBox;exports.groupList=groupList;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function focusListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="attention_box_box">\r\n		<ul class="attention_box" id="focusList"></ul>\r\n	</div>\r\n	<div class="attention_mask_box" style="display: none;" id="showNoFocusList">\r\n		<div class="mask_top clearfix">\r\n			<span style="background-color: #ff8502;"></span>\r\n			<span style="background-color: #31c145;"></span>\r\n			<span style="background-color: #359af0;"></span>\r\n			<span style="background-color: #ff4d4d;"></span>\r\n			推荐专家\r\n		</div>\r\n		<div class="mask_con">\r\n			<ul class="attention_box" id="noFocusList"></ul>\r\n		</div>\r\n		<span class="next" id="jumpFocus">跳过</span>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function focusList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,focus=$data.focus,status=$data.status,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,tag=$data.tag,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,planCount=$data.planCount,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var focus = list[i] || {};
	var status = focus.status || 0;
	var userNo = focus.userNo || "";
	var realName = focus.realName;
	var nickName = focus.nickName;
	var userName = realName || nickName;
	var tag = focus.tag || "";
	var userImg = focus.personalImg || focus.profileImg || (IMG_PATH + 'user_profile.png');
	var planCount = focus.planCount || 0;
	var continueWin = focus.continueWin || 0;
	var winCount = focus.winCount || 0;
	var profitRate = focus.profitRate || 0;
	var winRate = focus.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\r\n	<li class="attention_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<div class="attention_list clearfix">\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="attention_title ml10 fl">\r\n				<div class="attention_titleMan">\r\n					<span>';
$out+=$escape(userName);
$out+='</span>\r\n					';
 if (continueWin > 1) { 
$out+='\r\n						<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n					';
 } else if(winCount > 0) { 
$out+='\r\n						<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n					';
 } else if (profitRate > 0) { 
$out+='\r\n						<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n					';
 } else if (winRate > 0) { 
$out+='\r\n						<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="attention_titleTag">';
$out+=$escape(tag);
$out+='</div>\r\n			</div>\r\n			<div class="attention_inform fr">\r\n				';
 if (planCount > 0) { 
$out+='\r\n				<span class="attention_num">';
$out+=$escape(planCount);
$out+='</span>\r\n				';
 } 
$out+='\r\n				<span class="arrow_right attention_right"></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function noFocusList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,focus=$data.focus,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,tag=$data.tag,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var focus = list[i] || {};
	var userNo = focus.userNo || "";
	var realName = focus.realName;
	var nickName = focus.nickName;
	var userName = realName || nickName;
	var tag = focus.tag || "";
	var userImg = focus.personalImg || focus.profileImg || (IMG_PATH + 'user_profile.png');

$out+='\r\n	<li class="attention_list_box" >\r\n		<div class="attention_list clearfix">\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="attention_title ml10 fl">\r\n				<div class="attention_titleMan">\r\n					<span>';
$out+=$escape(userName);
$out+='</span>\r\n				</div>\r\n				<div class="attention_titleTag">';
$out+=$escape(tag);
$out+='</div>\r\n			</div>\r\n			<div class="attention_inform fr">\r\n				<span class="attention_focus" status="1" userNo="';
$out+=$escape(userNo);
$out+='">+关注</span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav" id="groupList"></div>\r\n	<div class="mt5 clearfix" id="userList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function groupList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,group=$data.group,groupNo=$data.groupNo,name=$data.name,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var group = list[i] || {};
	var groupNo = group.groupNo;
	var name = group.name;

$out+='\r\n<span class="item" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n	<span>';
$out+=$escape(name);
$out+='</span>\r\n</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,redDot=$data.redDot,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var redDot = !!user.redDot;

$out+='\r\n<div class="msg" userNo="';
$out+=$escape(userNo);
$out+='">\r\n	<img class="icon_span img40 mb10" src="';
$out+=$escape(userImg);
$out+='"></img>\r\n	';
 if (redDot) {
$out+='\r\n		<span class="red_dot"></span>\r\n	';
 } 
$out+='\r\n	<br/>';
$out+=$escape(userName);
$out+='\r\n	';
 if (continueWin > 1) { 
$out+='\r\n		<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n	';
 } else if(winCount > 0) { 
$out+='\r\n		<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n	';
 } else if (profitRate > 0) { 
$out+='\r\n		<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n	';
 } else if (winRate > 0) { 
$out+='\r\n		<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/girlPlan',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.planList=planList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="girl_top">\r\n		<div class="girl_img36 girl_topl" id="backBtn" >\r\n			<span class="arrow"></span>\r\n		</div>\r\n		<div class="girl_img36 girl_topr" id="homeBtn">\r\n			<span></span>\r\n		</div>\r\n	</div>\r\n	<ul class="girl_bigbox" id="planList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,girlCover=$data.girlCover,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,match=$data.match,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,$escape=$helpers.$escape,$string=$helpers.$string,$=$data.$,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var girlCover = plan.girlCover || '';
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var matchNum = matchList.length;
	var match = (matchNum > 0 && matchList[0]) || {};
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 

$out+='\r\n	<li class="girl_box planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" matchNum=';
$out+=$escape(matchNum);
$out+=' style="background-image:url(';
$out+=$escape(girlCover);
$out+=');';
$out+=$escape(matchNum<=0?'margin-bottom:10px;':'');
$out+='">\r\n		<div class="bottom_background clearfix">\r\n			<div class="bottom_background clearfix">\r\n			<div class="item clearfix">\r\n				<div class="msg color9 clearfix">\r\n					<div class="girl_cli">\r\n						<img class="userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='"></img>\r\n					</div>\r\n					<div class="girl_title">\r\n						<div class="girl_name">\r\n							<span class="ellipsis">';
$out+=$escape(userName);
$out+='</span>\r\n							';
 if (continueWin > 1) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">';
$out+=$escape(continueWin);
$out+='连红</span>\r\n							';
 } else if(winCount > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">10中';
$out+=$escape(winCount);
$out+='</span>\r\n							';
 } else if (profitRate > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">盈';
$out+=$escape(profitRate);
$out+='%</span>\r\n							';
 } else if (winRate > 0) { 
$out+='\r\n								<span class="match_icon var_middle bg_c_r">胜';
$out+=$escape(winRate);
$out+='%</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n						<span class="ellipsis size12">';
$out+=$escape(userTag);
$out+='</span>\r\n					</div>\r\n					';
 if (isSale) { 
$out+='\r\n					<span class="ticket size10 fr userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n					';
 } 
$out+='\r\n				</div>\r\n				<div class="detailBox ';
$out+=$escape(matchNum<=0?'hide':'');
$out+='">\r\n					<div class="belle_top">\r\n							<span class="ellipsis color_yellow" style="';
$out+=$escape(matchType == 2 ? 'color: #003cff' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n							<span class="ellipsis">: ';
$out+=$string(matchType == 2 ? away : home);
$out+='</span>\r\n							<span class="ellipsis">VS</span>\r\n							<span class="ellipsis"> ';
$out+=$string(matchType == 2 ? home : away);
$out+='</span>\r\n							<div class="size12 color9 fr match_time">';
$out+=$escape(beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="belle_bottom">\r\n						<div class="match_left fl">\r\n							';
 if (matchNum > 1 ) { 
$out+='\r\n								<span class="match_icon all_up">串关</span>\r\n							';
 } else { 
$out+='\r\n								<span class="match_icon all_up">单关</span>\r\n							';
 } 
$out+='\r\n							';
 if (hasPic) {
$out+='\r\n								';
 if (isGirl) { 
$out+='\r\n								<span class="match_icon bg_c_p">美照</span>\r\n								';
 } else { 
$out+='\r\n								<span class="match_icon bg_c_b">实单</span>\r\n								';
 } 
$out+='\r\n							';
 } 
$out+='\r\n								<span class="match_icon w24 bg_c_y ';
$out+=$escape(isLinChang?'':'hide');
$out+='">临场</span>\r\n								<!--<span class="match_icon w24 bg_c_g ">语音</span>-->\r\n						</div>\r\n						<div class="price">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span>免费</span>\r\n								';
 } else { 
$out+='\r\n									<span>查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/gx11x5',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.gx11x5Num=gx11x5Num;exports.optional=optional;exports.gx11x5Bet=gx11x5Bet;exports.gx11x5List=gx11x5List;exports.Q1=Q1;exports.Q2ZHX=Q2ZHX;exports.Q2ZUX=Q2ZUX;exports.Q3ZHX=Q3ZHX;exports.Q3ZUX=Q3ZUX;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Num($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav_wrap" id="navWrap" style="display: none;">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<div class="item_content">\r\n					<span class="type">任二</span>\r\n					<div class="prize">奖金 <span>6元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<div class="item_content ">\r\n					<span class="type">任三</span>\r\n					<div class="prize">奖金 <span>19元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<div class="item_content">\r\n					<span class="type">任四</span>\r\n					<div class="prize">奖金 <span>78元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<div class="item_content">\r\n					<span class="type">任五</span>\r\n					<div class="prize">奖金 <span>540元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="5">\r\n				<div class="item_content">\r\n					<span class="type">任六</span>\r\n					<div class="prize">奖金 <span>90元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="6">\r\n				<div class="item_content">\r\n					<span class="type">任七</span>\r\n					<div class="prize">奖金 <span>26元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="7">\r\n				<div class="item_content">\r\n					<span class="type">任八</span>\r\n					<div class="prize">奖金 <span>9元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="8">\r\n				<div class="item_content">\r\n					<span class="type">前一</span>\r\n					<div class="prize">奖金 <span>13元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="9">\r\n				<div class="item_content">\r\n					<span class="type">前二直选</span>\r\n					<div class="prize">奖金 <span>130元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="10">\r\n				<div class="item_content">\r\n					<span class="type">前二组选</span>\r\n					<div class="prize">奖金 <span>65元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="11">\r\n				<div class="item_content">\r\n					<span class="type">前三直选</span>\r\n					<div class="prize">奖金 <span>1170元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="12">\r\n				<div class="item_content">\r\n					<span class="type">前三组选</span>\r\n					<div class="prize">奖金 <span>195元</span></div>\r\n				</div>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="ui-flex k3_top">\r\n		<div class="ui-flex_item draw_msg">\r\n			<div class="txtl">\r\n				<span class="color9 mb10"><b id="lastIssue"></b>期开奖</span>\r\n				<span class="result" id="result">\r\n					\r\n				</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			<div class="txtr">\r\n				<span class="color9 mb10">距<b id="issue"></b>期截止</span>\r\n				<span class="time" id="time"></span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0 元</span></div>\r\n				<div class="bonus" id="unit">注数：0 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="ensureBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function optional($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out=''; if (type == 1) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选2个或多个号码，所选号码与开奖号码任意2个号码相同即中奖，最高可中<span class="size12 color_red">6</span>元</p>\r\n	';
 } else if (type == 2) { 
$out+='\r\n		<p class="size12 color6" >玩法：从01~11中任选3个或多个号码，所选号码与开奖号码任意3个号码相同即中奖，最高可中<span class="size12 color_red">19</span>元</p>\r\n	';
 } else if (type == 3) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选4个或多个号码，所选号码与开奖号码任意4个号码相同即中奖，最高可中<span class="size12 color_red">78</span>元</p>\r\n	';
 } else if (type == 4) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选5个或多个号码，所选号码与开奖号码任意5个号码相同即中奖，最高可中<span class="size12 color_red">540</span>元</p>\r\n	';
 } else if (type == 5) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选6个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">90</span>元</p>\r\n	';
 } else if (type == 6) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选7个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">26</span>元</p>\r\n	';
 } else if (type == 7) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选8个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">9</span>元</p>\r\n	';
 }
$out+='\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = optionalNum.length; i < length; i++) {;
					var num = optionalNum[i].num;
			
$out+='\r\n			<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n				<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Bet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="k3_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="gx11x5List">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5List($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,recommend=$data.recommend,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var recommend = selectContent[i].recommend;
		compare = recommend.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(title + compare);
$out+='">\r\n		<div class="num_wrap ui-flex">\r\n			<span class="play_type">\r\n				[';
$out+=$escape(title);
$out+=']\r\n			</span> \r\n			<span class="sel_num ui-flex_item">\r\n				';
 
					for (var j = 0; j < recommend.length; j++) {
						var num = recommend[j];
				
$out+='\r\n					<em>';
$out+=$escape(num);
$out+='</em>\r\n				';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n		<a class="del_btn">\r\n			<span class="del"></span>\r\n		</a>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function Q1($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选1个或多个号码，所选号码与开奖号码第一位号码相同，即中奖<span class="size12 color_red">13</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q2ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从万、千位各选1个或多个号码，所选号码与开奖号码前两位号码相同（且顺序一致），即中奖<span class="size12 color_red">130</span>元。</p>\r\n	<!--<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item" tab="1">\r\n			直选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			组选\r\n		</li>\r\n	</ul>-->\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_kilobit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n		\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q2ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选2个或多个号码，所选号码与开奖号码前两位号码相同（顺序不限），即中奖<span class="size12 color_red">65</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q3ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从万、千、百位各选1个或多个号码，所选号码与开奖号码前三位号码相同（且顺序一致），即中奖<span class="size12 color_red">1170</span>元。</p>\r\n	<!--<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item" tab="1">\r\n			直选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			组选\r\n		</li>\r\n	</ul>-->\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_kilobit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_hundreds"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="thirdNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q3ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选3个或多个号码，所选号码与开奖号码前三位号码相同（顺序不限），即中奖<span class="size12 color_red">195</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/home',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.planList=planList;exports.userList=userList;exports.bannerList=bannerList;exports.dotList=dotList;exports.matchList=matchList;exports.rankList=rankList;exports.floatIcon=floatIcon;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="top_banner">\r\n		<!--<div class="my_head" id="signBtn">\r\n			<span class="icon_span img34 icon_sign"></span>\r\n		</div>-->\r\n		<div class="banner_img" id="bannerList"></div>\r\n		<div class="dot_box" id="dotList"></div>\r\n	</div>\r\n	<div class="banner">\r\n		<div class="ui-flex banner_gap">\r\n			<!-- <div class="ui-flex_item" groupNo="bet" id="bet" style="display: none;">\r\n				<span class="icon_span img45 icon_bet mb10"></span>\r\n				<br/>跟单市场\r\n			</div> -->\r\n			<div class="ui-flex_item" groupNo="5F5E102-BC6151" id="trader" style="display: none;">\r\n				<span class="icon_span img45 icon_trader mb10"></span>\r\n				<br/>操盘手\r\n			</div>\r\n			<div class="ui-flex_item" groupNo="5F5E109-BC6158">\r\n				<span class="icon_span img45 icon_basket_expert mb10"></span>\r\n				<br/>篮球专家\r\n			</div>\r\n			<div class="ui-flex_item" groupNo="5F5E104-BC6153">\r\n				<span class="icon_span img45 icon_football_expert mb10"></span>\r\n				<br/>足球专家\r\n			</div>\r\n			<!--<div class="ui-flex_item" groupNo="free">\r\n				<span class="icon_span img45 icon_free mb10"></span>\r\n				<br/>免费领米\r\n			</div>-->\r\n			<!--<div class="ui-flex_item" groupNo="cphb">\r\n				<span class="icon_span img45 icon_cphb mb10"></span>\r\n				<br/>彩票红包\r\n			</div>-->\r\n			<div class="ui-flex_item" groupNo="replay">\r\n				<span class="icon_span img45 icon_replay mb10"></span>\r\n				<br/>专家复盘\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<!--<div class="banner mt10" id="matchListBox">\r\n		<div class="title clearfix">\r\n			<span class="tuijian yborder">热门赛事</span>\r\n			<span class="fr mr15 recommend_tab" id="hotMatchTab">\r\n				<span class="color9 football" type="1">足球</span>\r\n				<span class="color9 basketball" type="2">篮球</span>\r\n			</span>\r\n		</div>\r\n		<ul class="bordertop textL" id="matchList"></ul>\r\n	</div>-->\r\n	<div class="top_singers clearfix bordertop" style="display:none" id="rankBox">\r\n		<img class="red_top" src="';
$out+=$escape(IMG_PATH);
$out+='top_singers.png" />\r\n		<ul class="msg_move" id="rankList"></ul>\r\n		<div class="top_more fr">\r\n			<i class="icon_more"></i>\r\n		</div>\r\n	</div>\r\n	<div class="banner mt10">\r\n		<div class="title clearfix">\r\n			<span class="tuijian">竞彩专家</span>\r\n			<span class="fr mr15 expert_tab" id="userTab">\r\n				<span class="color9" userType="1">推荐</span>\r\n				<span class="color9" userType="2">胜率</span>\r\n				<span class="color9" userType="3">盈利</span>\r\n			</span>\r\n			<!--<span class="color_g size12 mr10 fr" groupNo="5F5E103-BC6152">更多></span>-->\r\n		</div>\r\n		<div class="expert_list ui-flex bordertop pt10" id="userList"></div>\r\n	</div>\r\n	<div class="mt10">\r\n		<div class="title color3 clearfix">\r\n			<span class="tuijian redborder">最新推荐<span class="color9 size12 ml5">推荐有风险 投注请谨慎</span></span>\r\n			<span class="fr mr15 recommend_tab" id="recommendTab">\r\n				<span class="color9 football" matchType="1">足球</span>\r\n				<span class="color9 basketball" matchType="2">篮球</span>\r\n			</span>\r\n		</div>\r\n		<ul class="infoBox" id="planList"></ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var matchNum = matchList.length;
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="msg color9 clearfix">\r\n				<img class="icon_span img29 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" />\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n				</span>\r\n				';
 if (continueWin > 1) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\r\n				';
 } else if(winCount > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\r\n				';
 } else if (profitRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\r\n				';
 } else if (winRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\r\n				';
 } else { 
$out+='\r\n					\r\n				';
 }
$out+='\r\n			</div>\r\n			<div class="recommend_item">\r\n				<p class="recommend_title">\r\n					';
 if (hasPic) {
$out+='\r\n						<span class="">【实单】</span>\r\n					';
 } 
$out+='\r\n					';
 if (title) { 
$out+='\r\n						';
$out+=$escape(title);
$out+='\r\n					';
 } else { 
$out+='\r\n						';
 
							for (var j = 0; j < matchNum; j++) { 
								var match = matchList[j] || {};
								var home = match.home;
								var away = match.away;
								var number = match.number;
						
$out+='\r\n							<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n				</p>\r\n				<div class="clearfix mt25">\r\n					<span class="recommend_money fl">\r\n						';
 if (/^true$/i.test(access)) { 
$out+='\r\n							';
 if (amount == 0) { 
$out+='\r\n								<span class="color_red">免费</span>\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">查看</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n						';
 } 
$out+='\r\n					</span>\r\n					<span class="recommend_time fr">\r\n						截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,redDot=$data.redDot,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,type=$data.type,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	userTag = userTag.substr(0, 6);
	var redDot = !!user.redDot;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\r\n	\r\n	<div class="expert_item mb15" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<img class="img38" src="';
$out+=$escape(userImg);
$out+='"></img>\r\n		';
 if (redDot) { 
$out+='\r\n			<span class="red_dot"></span>\r\n		';
 } 
$out+='\r\n		<br/>';
$out+=$escape(userName);
$out+='\r\n		<br /><div class="ellipsis mt2 color9 size10">';
$out+=$escape(userTag);
$out+='</div>\r\n		';
 if (type == 1) { 
$out+='\r\n			';
 if (continueWin > 1) { 
$out+='\r\n				<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n			';
 } else if(winCount > 0) { 
$out+='\r\n				<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n			';
 } else if (profitRate > 0) { 
$out+='\r\n				<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n			';
 } else if (winRate > 0) { 
$out+='\r\n				<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n			';
 } 
$out+='\r\n		';
 } else if (type == 2) { 
$out+='\r\n			<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n		';
 } else if (type == 3) { 
$out+='\r\n			<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n	<div class="mb15 expert_item" id="readMore">\r\n		<img class="img38" src="';
$out+=$escape(IMG_PATH);
$out+='expert_more.png"></img>\r\n		<br />更多\r\n		<br />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function bannerList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,banner=$data.banner,src=$data.src,href=$data.href,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var banner = list[i] || {};
	var src = banner.src;
	var href = banner.href;

$out+='\r\n	<a href_="';
$out+=$escape(href);
$out+='" target="_blank" class="swiper_slide"><img class="img-responsive" src="';
$out+=$escape(src);
$out+='"/></a>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function dotList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,banner=$data.banner,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var banner = list[i] || {};

$out+='\r\n	';
 if (i==0) { 
$out+='\r\n		<span class="dot active"></span>\r\n		';
 } else { 
$out+='\r\n		<span class="dot"></span>\r\n		';
 } 
$out+='\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,match=$data.match,list=$data.list,matchId=$data.matchId,sportteryMatchId=$data.sportteryMatchId,league=$data.league,home=$data.home,away=$data.away,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,planCount=$data.planCount,orderCount=$data.orderCount,passMinute=$data.passMinute,type=$data.type,imgMap=$data.imgMap,number=$data.number,single=$data.single,spfSingle=$data.spfSingle,rfsfSingle=$data.rfsfSingle,halfResult=$data.halfResult,$escape=$helpers.$escape,rqspfSingle=$data.rqspfSingle,dxfSingle=$data.dxfSingle,$string=$helpers.$string,$out=''; 
	var match = list[0] || {};
	var matchId = match.matchId || 0;
	var sportteryMatchId = match.sportteryMatchId || 0;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var homeLogoImg = match.homeLogoImg;
	var awayLogoImg = match.awayLogoImg;
	var beginTime = match.beginTime || "";
	beginTime = beginTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (beginTime && beginTime.length == 3) {
		day = beginTime[1];
		time = beginTime[2];
	}
	var result = match.result.split(':');
	var planCount = match.planCount;
	var orderCount = match.orderCount;
	var passMinute = match.passMinute;
	var type = match.type || 1;
	var imgMap = {"1":"team","2":"basketball_def"};
	var number = match.number;
	var single = match.single || {};
	var spfSingle = +single.SPF;
	var rfsfSingle = +single.RFSF;
	var halfResult = match.halfResult.replace(/:/, '-') || '';

$out+='\r\n	<li class="hotGame_box" matchId="';
$out+=$escape(matchId);
$out+='" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='">\r\n		<div class="ui-flex">\r\n			<div class="clearfix ui-flex_item">\r\n				<span class="fl size10">';
$out+=$escape(number);
$out+='</span>\r\n				<span class="fr size10 hot_orange" style="';
$out+=$escape(type == 2 ? 'color:#003cff;' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n			</div>\r\n			<div class="half_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">';
$out+=$escape(halfResult != '' ? '(' + halfResult + ')': '');
$out+='</div>\r\n			<div class="textR ui-flex_item clearfix">\r\n				';
 if (result != "") { 
$out+='\r\n					<div class="fl color_g">完场</div>\r\n				';
 } else { 
$out+='\r\n					<div class="fl minute" style="display:none" id="minute';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n					<div class="fl beginTime" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">\r\n						';
$out+=$escape(day);
$out+='&nbsp';
$out+=$escape(time);
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="fr">\r\n					';
 if (planCount > 0) { 
$out+='\r\n						<span class="competition_icon tj"></span>\r\n					';
 } 
$out+='\r\n					';
 if (((spfSingle == 1 || rqspfSingle == 1) && type == 1) || ((rfsfSingle == 1 || dxfSingle == 1) && type == 2)) { 
$out+='\r\n						<span class="competition_icon dg"></span>\r\n					';
 }　
$out+='\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex against_msg">\r\n			<div class="teams_name ui-flex_item textR">\r\n				';
$out+=$string(type == 2 ? away : home);
$out+='\r\n			</div>\r\n			<div class="teams_score" style="display:none;';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n			';
 if(result && result.length == 2) { 
$out+='\r\n				<div class="teams_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">\r\n					';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='		\r\n				<div class="teams_vs" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</div>\r\n			';
 } 
$out+='\r\n			<div class="teams_name ui-flex_item">\r\n				';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="colorab size10">(主)</span>' : '');
$out+='\r\n			</div>\r\n		</div>\r\n	</li>';
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,continueWin=$data.continueWin,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var realName = user.realName;
	var nickName = user.nickName;
	var userName = realName || nickName;
	var continueWin = user.continueWin || 0;

$out+='\r\n	<li>';
$out+=$escape(userName);
$out+=' 竞猜<span class="color_red ml5 mr5 size12">';
$out+=$escape(continueWin);
$out+='场连红</span>鸿运当头！</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function floatIcon($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="suspend_icon" id="floatImgWrap">\r\n		<img id="floatImg" class="img-responsive" src="" alt="" />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/hotMatch',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.matchList=matchList;exports.leagueList=leagueList;exports.dateList=dateList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<!--<div class="ui-flex hotmatch_statustitle" id="matchStatusBox">\r\n		<div class="ui-flex_item" matchStatus="4">\r\n			<span>未结束</span>\r\n		</div>\r\n		<div class="ui-flex_item" matchStatus="3">\r\n			<span>已结束</span>\r\n		</div>\r\n	</div>-->\r\n	<div class="timetable" id="timetable">\r\n		<ul class="ui-flex" id="dateList"></ul>\r\n	</div>\r\n	<input type="hidden" id="selectLeague">\r\n	<div class="mask" id="matchFilter" style="display: none;">\r\n		<div class="hot_mask">\r\n			<div class="hot_maskTop" id="matchFilterTab">\r\n				<span class="borderr1" id="checkedAll">全选</span>\r\n				<span class="borderr1" id="inverse">反选</span>\r\n				<span id="ensure">确定</span>\r\n			</div>\r\n			<div class="hot_markContent" id="leagueList"></div>\r\n		</div>\r\n	</div>\r\n	<ul class="hotGame_boxBox" id="matchList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,match=$data.match,matchId=$data.matchId,sportteryMatchId=$data.sportteryMatchId,league=$data.league,home=$data.home,away=$data.away,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,planCount=$data.planCount,orderCount=$data.orderCount,type=$data.type,imgMap=$data.imgMap,number=$data.number,single=$data.single,spfSingle=$data.spfSingle,rqspfSingle=$data.rqspfSingle,rfsfSingle=$data.rfsfSingle,dxfSingle=$data.dxfSingle,halfResult=$data.halfResult,status=$data.status,leagueRank=$data.leagueRank,homeRank=$data.homeRank,awayRank=$data.awayRank,animationUrl=$data.animationUrl,videoUrl=$data.videoUrl,$escape=$helpers.$escape,$string=$helpers.$string,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var match = list[i] || {};
	var matchId = match.matchId || 0;
	var sportteryMatchId = match.sportteryMatchId || 0;
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var homeLogoImg = match.homeLogoImg;
	var awayLogoImg = match.awayLogoImg;
	var beginTime = match.beginTime || "";
	beginTime = beginTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (beginTime && beginTime.length == 3) {
		day = beginTime[1];
		time = beginTime[2];
	}
	var result = match.result.split(':');
	var planCount = match.planCount;
	var orderCount = match.orderCount; 
	var type = match.type;
	var imgMap = {"1":"team","2":"basketball_def"};
	var number = match.number;
	var single = match.single || {};
	var spfSingle = +single.SPF;
	var rqspfSingle = +single.RQSPF;
	var rfsfSingle = +single.RFSF;
	var dxfSingle = +single.DXF;
	var halfResult = match.halfResult.replace(/:/, '-') || '';
	var status = match.status; //0=未结束，1=已经结束，2=已取消
	var leagueRank = match.leagueRank || {};
	var homeRank = leagueRank.home || {};
	var awayRank = leagueRank.away || {};
	var animationUrl = match.animationUrl || "";
	var videoUrl = match.videoUrl || "";

$out+='\r\n	<li class="hotGame_box" matchId="';
$out+=$escape(matchId);
$out+='" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='" animationUrl="';
$out+=$escape(animationUrl);
$out+='" videoUrl="';
$out+=$escape(videoUrl);
$out+='">\r\n		<div class="ui-flex">\r\n			<div class="clearfix ui-flex_item">\r\n				<span class="fl size10">';
$out+=$escape(number);
$out+='</span>\r\n				<span class="fr size10 hot_orange" style="';
$out+=$escape(type == 2 ? 'color:#548cd4;' : '');
$out+='">';
$out+=$escape(league);
$out+='</span>\r\n			</div>\r\n			<div class="half_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">';
$out+=$escape(halfResult != '' ? '(' + halfResult + ')': '');
$out+='</div>\r\n			<div class="textR ui-flex_item clearfix">\r\n				';
 if (status == 1) { 
$out+='\r\n					<div class="fl color_g">完场</div>\r\n				';
} else if (status == 2) { 
$out+='\r\n					<div class="fl color_g">已取消</div>\r\n				';
 } else { 
$out+='\r\n					<div class="fl minute" style="display:none" id="minute';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n					<div class="fl beginTime" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">\r\n						';
$out+=$escape(day);
$out+='&nbsp';
$out+=$escape(time);
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="fr">\r\n					';
 if (planCount > 0) { 
$out+='\r\n						<span class="competition_icon tj"></span>\r\n					';
 } 
$out+='\r\n					';
 if (((spfSingle == 1 || rqspfSingle == 1) && type == 1) || ((rfsfSingle == 1 || dxfSingle == 1) && type == 2)) { 
$out+='\r\n						<span class="competition_icon dg"></span>\r\n					';
 }　
$out+='\r\n					';
 if (videoUrl != '') { 
$out+='\r\n						<span class="fr competition_icon zb"></span>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex against_msg">\r\n			<div class="teams_name ui-flex_item textR ';
$out+=$string(type == 2 ? 'basketballAway' : '');
$out+='">\r\n				';
 if (type == 1 && awayRank.rank != '') { 
$out+='\r\n					<span class="team_rank">[';
$out+=$escape(homeRank.rank);
$out+=']</span>\r\n				';
 } 
$out+='\r\n				';
$out+=$string(type == 2 ? away : home);
$out+='\r\n			</div>\r\n			<div class="teams_score" style="display:none;';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></div>\r\n			';
 if(result && result.length == 2) { 
$out+='\r\n				<div class="teams_score" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='">\r\n					';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='		\r\n				<div class="teams_vs" style="';
$out+=$escape(type == 2 ? 'width: 22%' : '');
$out+='" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</div>\r\n			';
 } 
$out+='\r\n			<div class="teams_name ui-flex_item ';
$out+=$string(type == 2 ? 'basketballHome' : '');
$out+='">\r\n				';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="colorab size10">(主)</span>' : '');
$out+='\r\n				';
 if (type == 1 && awayRank.rank != '') { 
$out+='\r\n					<span class="team_rank">[';
$out+=$escape(awayRank.rank);
$out+=']</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function leagueList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,item=$data.item,league=$data.league,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var item = list[i] || {};
	var league = item.league;

$out+='\r\n<span class="hot_markSon" style="overflow:hidden">';
$out+=$escape(league);
$out+='</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function dateList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,item=$data.item,date=$data.date,d=$data.d,week=$data.week,saleTime=$data.saleTime,difference=$data.difference,Date=$data.Date,today=$data.today,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var item = list[i] || {};
	var date = list[i].date && list[i].date.replace(/\d{4}-\d{2}-(\d{2})/, "$1") || "";
	var week = list[i].week || "";
	var saleTime = list[i].date;
	var difference = Date.parse(saleTime) - Date.parse(today)

$out+='\r\n	<li class="ui-flex_item" saleTime="';
$out+=$escape(saleTime);
$out+='">\r\n		';
 if (today == saleTime) { 
$out+='\r\n			<div class="date">今</div>\r\n		';
 } else { 
$out+='\r\n			<div class="date ';
$out+=$escape(difference > 0 ? 'color3' : '');
$out+='">';
$out+=$escape(date);
$out+='</div>\r\n		';
 } 
$out+='\r\n		<div class="week">';
$out+=$escape(week);
$out+='</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/hotMatchDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.match=match;exports.planList=planList;exports.smlrInfo=smlrInfo;exports.jxzpInfo=jxzpInfo;exports.football=football;exports.basketball=basketball;exports.analyzeWrap=analyzeWrap;exports.oddsWrap=oddsWrap;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,type=$data.type,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="live_show_wrap" id="liveShowWrap" style="display: none;">\r\n		<a class="live_close_btn" id="liveCloseBtn"></a>\r\n		<div id="liveIframeWrap" style="width: 100%;height: 100%;"></div>\r\n	</div>\r\n	<div class="hot_banner" id="hotBanner">\r\n		<span class="arrow" id="backBtn"></span>\r\n		<span class="icon_span img18 icon_home" id="homeBtn"></span>\r\n		<div class="hot_bannerBox" id="match"></div>\r\n	</div>\r\n	<div class="ui-flex hot_detailTitle" id="tabBox">\r\n		<div class="ui-flex_item" tab="1" id="analyzeBtn" style="display: none;">\r\n			<span>分析</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="2" id="oddsBtn" style="display: none;">\r\n			<span>赔率</span>\r\n		</div>\r\n		<!--<div class="ui-flex_item" tab="3" id="tabLr" style="display: none;">\r\n			<span>冷热</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="4" id="tabJx" style="display: none;">\r\n			<span>极限追盘</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="5" id="tabDg" style="display: none;">\r\n			<span>单关投注</span>\r\n		</div>-->\r\n		<div class="ui-flex_item" tab="3">\r\n			<span>推荐</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab="4" id="tabDg" style="display: none;">\r\n			<span>竞猜</span>\r\n		</div>\r\n	</div>\r\n	<div class="analyze_wrap" id="tabContent1" style="display: none;"></div>\r\n	<div class="match_odd" id="tabContent2" style="display: none;">\n		<div class="hot_detailTop" id="oddsBox">\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item" oddsType="1">欧赔</span>\r\n				<span class="ui-flex_item" oddsType="2">亚盘</span>\r\n				<span class="ui-flex_item" oddsType="3">大小</span>\r\n				<span class="ui-flex_item" oddsType="4" id="tabLr" style="display: none;">冷热</span>\r\n				<span class="ui-flex_item" oddsType="5" id="tabJx" style="display: none;">极限</span>\r\n			</div>\r\n		</div>\r\n		<div class="odds_wrap" id="oddsWrap" style="display: none"></div>\r\n		<div class="shaimilengre" id="oddsContent1" style="display: none">\r\n			<!-- 未购买 -->\r\n			<div class="hot_noBuyCold mt25" id="unclockHot" style="display: none">\r\n				<p class="ti30">晒米场专家预测赛果的冷热，中国竞彩受注的冷热，让你快速知道专家和绝大多数彩民的下注行为，为你的下注提供最可靠的依据。</p>\r\n				<a class="buy_hotcold mt10" id="buyHotCold">5粒米解锁</a>\r\n			</div>\r\n			<div class="" id="smlrInfo"></div>\r\n		</div>\r\n		<div class="jxzp" id="oddsContent2" style="display: none">\r\n			<div class="hot_noBuyCold mt25" id="unclockJxzp" style="display: none">\r\n				<p class="ti30">每周近500场比赛数据深挖和提炼，为您提供最有价值的球队极限数据，让你投注更简单、快速、有可靠依据。</p>\r\n				<a class="buy_hotcold mt10" id="buyJxzp">2粒米解锁</a>\r\n			</div>\r\n			<div class="hot_detailTop" id="jxzpTypeBox" style="display: none">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item" jxzpType="1" id="jxzpType1" style="display: none;">胜平负</span>\r\n					<span class="ui-flex_item" jxzpType="2" id="jxzpType2" style="display: none;">输赢盘</span>\r\n					<span class="ui-flex_item" jxzpType="3" id="jxzpType3" style="display: none;">大小球</span>\r\n				</div>\r\n			</div>\r\n			<div class="mt10" id="jxzpInfo"></div>\r\n		</div>\n	</div>\r\n	<div class="remen mt5" id="tabContent3" style="display:none">\r\n		<ul class="infoBox" id="planList"></ul>\r\n		<div id="noPlan" style="display: none;">\r\n			<div class="default_box">\r\n				<div class="default" style="';
$out+=$escape(type==2?'background-image:url('+IMG_PATH+'defult_basket.png)':'');
$out+='"></div>\r\n				<p class="mt10 color9">晒米专家暂没有推荐比赛哟</p>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<!--<div class="zhuanjia" id="tabContent2" style="display: none;">\r\n		<div class="hot_detailTop" id="groupBox">\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item" groupno="5F5E101-BC6150">彩店实单</span>\r\n				<span class="ui-flex_item" groupNo="5F5E100-BC614F">美女推波</span>\r\n				<span class="ui-flex_item" groupNo="5F5E105-BC6154">特邀大咖</span>\r\n				<span class="ui-flex_item" groupNo="5F5E104-BC6153">竞彩高手</span>\r\n			</div>\r\n		</div>\r\n		<div class="hot_detailCon">\r\n			<ul class="infoBox" id="groupPlanList"></ul>\r\n		</div>\r\n	</div>-->\r\n	<div class="moreGame" id="tabContent4" style="display: none;padding-bottom: 50px;">\r\n		<div id="moreGame"></div>\r\n		<div class="btn_warp" style="display: none;" id="btnWarp">\n			<a class="submit_btn" id="sumbitBtn">确定</a>\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function match($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,league=$data.league,match=$data.match,home=$data.home,away=$data.away,sportteryMatchId=$data.sportteryMatchId,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,beginTime=$data.beginTime,d=$data.d,day=$data.day,time=$data.time,result=$data.result,type=$data.type,imgMap=$data.imgMap,leagueRank=$data.leagueRank,leagueRankHome=$data.leagueRankHome,leagueRankAway=$data.leagueRankAway,homeRank=$data.homeRank,awayRank=$data.awayRank,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$string=$helpers.$string,$out=''; 
	var league = match.league;
	var home = match.home;
	var away = match.away;
	var sportteryMatchId = match.sportteryMatchId || 0;
	var homeLogoImg = match.homeLogoImg;
	var awayLogoImg = match.awayLogoImg;
	var beginTime = match.beginTime || "";
	beginTime = beginTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (beginTime && beginTime.length == 3) {
		day = beginTime[1];
		time = beginTime[2];
	}
	var result = match.result.split(':');
	var type = match.type;
	var imgMap = {"1":"team","2":"basketball_def"};
	var leagueRank = match.leagueRank || {};
	var leagueRankHome = leagueRank.home || {};
	var leagueRankAway = leagueRank.away || {};
	var homeRank = leagueRankHome.rank != "" ? "(" + leagueRankHome.rank + ")" : "";
	var awayRank = leagueRankAway.rank != "" ? "(" + leagueRankAway.rank + ")" : "";

$out+='\r\n<div class="bannerBox_top">\r\n	';
$out+=$escape(league);
$out+='<span class="ml10" id="beginTime';
$out+=$escape(sportteryMatchId);
$out+='">';
$out+=$escape(day);
$out+='&nbsp;';
$out+=$escape(time);
$out+='</span><span class="ml10" id="minute';
$out+=$escape(sportteryMatchId);
$out+='" style="display: none;"> <sup>\'</sup></span>\r\n</div>\r\n<div class="ui-flex mt15">\r\n	<div class="ui-flex_item">\r\n		<img class="teams_logo" src="';
$out+=$escape(type == 2 ? awayLogoImg : homeLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'">\r\n	</div>\r\n	<span class="hot_score ui-flex_item" style="display:none" id="score';
$out+=$escape(sportteryMatchId);
$out+='"></span>\r\n	';
 if(result && result.length == 2) { 
$out+='\r\n		<span class="hot_score ui-flex_item">';
$out+=$escape(result[0]);
$out+='&nbsp;-&nbsp;';
$out+=$escape(result[1]);
$out+='</span>\r\n	';
 } else { 
$out+='\r\n		<span class="hot_vs ui-flex_item" id="vs';
$out+=$escape(sportteryMatchId);
$out+='">VS</span>\r\n	';
 } 
$out+='\r\n	<div class="ui-flex_item">\r\n		<img class="teams_logo" src="';
$out+=$escape(type == 2 ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'">\r\n	</div>\r\n</div>\r\n<div class="ui-flex mt10" id="teamBox" sportteryMatchId="';
$out+=$escape(sportteryMatchId);
$out+='">\r\n	<span class="hot_teams ui-flex_item basketballAway">';
$out+=$string(type == 2 ? away : home);
$out+='<br /><span class="team_rank">';
$out+=$escape(leagueRankHome.league+homeRank);
$out+='</span></span>\r\n	<span class="live_btn_wrap clearfix">\r\n		<span class="live_video_btn fl" id="animationBtn">动画直播<i class="live_animation_icon"></i></span>\r\n		<span class="live_video_btn fr" id="videoBtn">视频直播<i class="live_video_icon"></i></span>\r\n	</span>\r\n	<span class="hot_teams ui-flex_item basketballHome">';
$out+=$string(type == 2 ? home : away);
$out+=$string(type == 2 ? '<span class="size10">(主)</span>' : '');
$out+='<br /><span class="team_rank">';
$out+=$escape(leagueRankAway.league+awayRank);
$out+='</span></span>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,createTime=$data.createTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,prizeStatus=$data.prizeStatus,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,$=$data.$,$out=''; 
var length = list.length;
if (length > 0) {	
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var matchNum = matchList.length;
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var createTime = plan.createTime && plan.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount; 
	var prizeStatus = plan.prizeStatus;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="msg color9 clearfix">\r\n				<img class="icon_span img29 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" />\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n				</span>\r\n				';
 if (continueWin > 1) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\r\n				';
 } else if(winCount > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\r\n				';
 } else if (profitRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\r\n				';
 } else if (winRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\r\n				';
 } else { 
$out+='\r\n					\r\n				';
 }
$out+='\r\n			</div>\r\n			<div class="recommend_item">\r\n				<p class="recommend_title">\r\n					';
 if (hasPic) {
$out+='\r\n						<span class="">【实单】</span>\r\n					';
 } 
$out+='\r\n					';
 if (title) { 
$out+='\r\n						';
$out+=$escape(title);
$out+='\r\n					';
 } else { 
$out+='\r\n						';
 
							for (var j = 0; j < matchNum; j++) { 
								var match = matchList[j] || {};
								var home = match.home;
								var away = match.away;
								var number = match.number;
						
$out+='\r\n							<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n				</p>\r\n				<div class="clearfix mt25">\r\n					<span class="recommend_money fl">\r\n						';
 if (/^true$/i.test(access)) { 
$out+='\r\n							';
 if (amount == 0) { 
$out+='\r\n								<span class="color_red">免费</span>\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">查看</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n						';
 } 
$out+='\r\n					</span>\r\n					<span class="recommend_time fr">\r\n						截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 }
}  
return new String($out);
}).call(templateUtils,$data).toString()}function smlrInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,win=$data.win,smlrInfo=$data.smlrInfo,draw=$data.draw,lose=$data.lose,winRecommendRate=$data.winRecommendRate,$=$data.$,g=$data.g,drawRecommendRate=$data.drawRecommendRate,loseRecommendRate=$data.loseRecommendRate,maxRecommendRateKey=$data.maxRecommendRateKey,maxRecommendRate=$data.maxRecommendRate,recommendMap=$data.recommendMap,colorMap=$data.colorMap,winOdds=$data.winOdds,winBetRate=$data.winBetRate,winProfitRate=$data.winProfitRate,winIsHot=$data.winIsHot,drawOdds=$data.drawOdds,drawBetRate=$data.drawBetRate,drawProfitRate=$data.drawProfitRate,drawIsHot=$data.drawIsHot,loseOdds=$data.loseOdds,loseBetRate=$data.loseBetRate,loseProfitRate=$data.loseProfitRate,loseIsHot=$data.loseIsHot,showRecommendRate=$data.showRecommendRate,$escape=$helpers.$escape,d=$data.d,$out=''; 
	var win = smlrInfo.win || {};
	var draw = smlrInfo.draw || {};
	var lose = smlrInfo.lose || {};
	//推荐分布数据
	var winRecommendRate = win.recommendRate || 0;
	winRecommendRate = (winRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawRecommendRate = draw.recommendRate || 0;
	drawRecommendRate = (drawRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseRecommendRate = lose.recommendRate || 0;
	loseRecommendRate = (loseRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var maxRecommendRateKey = smlrInfo.maxRecommendRateKey || '';
	var maxRecommendRate = (smlrInfo[maxRecommendRateKey] || {}).recommendRate || 0;
	maxRecommendRate = (maxRecommendRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var recommendMap = {'win': '主胜','draw': '平局','lose': '客胜'};
	var colorMap = {'win': '','draw': 'color5e','lose': 'color55'};
	//表格数据
	//胜
	var winOdds = win.odds || 0;
	var winBetRate = win.betRate || 0;
	winBetRate = (winBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var winProfitRate = win.profitRate || 0;
	winProfitRate = (winProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var winIsHot = win.isHot || false;
	//平
	var drawOdds = draw.odds || 0;
	var drawBetRate = draw.betRate || 0;
	drawBetRate = (drawBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawProfitRate = draw.profitRate || 0;
	drawProfitRate = (drawProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var drawIsHot = draw.isHot || false;
	//负
	var loseOdds = lose.odds || 0;
	var loseBetRate = lose.betRate || 0;
	loseBetRate = (loseBetRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseProfitRate = lose.profitRate || 0;
	loseProfitRate = (loseProfitRate+'').replace(/\.0+$/g, '');//删除末尾是.00;
	var loseIsHot = lose.isHot || false;

$out+='\r\n<div class="hot_detailCold mt5 mb5">\r\n';
 if (showRecommendRate) { 
$out+='\r\n	<div class="ch_item clearfix">\r\n		<div class="recommend_data fl">\r\n			<div class="recommend_details">\r\n				<div class="textL color3 mb10 size16">专家推荐分布</div>\r\n				<span>胜 ';
$out+=$escape(winRecommendRate);
$out+='%</span>\r\n				<span>平 ';
$out+=$escape(drawRecommendRate);
$out+='%</span>\r\n				<span>负 ';
$out+=$escape(loseRecommendRate);
$out+='%</span>\r\n			</div>\r\n		</div>\r\n		<div class="circle fr ';
$out+=$escape(colorMap[maxRecommendRateKey]);
$out+=' p';
$out+=$escape(maxRecommendRate.replace(/\.\d+$/g, ''));
$out+='">\r\n			<span>';
$out+=$escape(maxRecommendRate);
$out+='%<br><span class="final">';
$out+=$escape(recommendMap[maxRecommendRateKey]);
$out+='</span></span>\r\n			<div class="slice">\r\n				<div class="bar"></div>\r\n				<div class="fill"></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
$out+='\r\n	<div class="ui-flex color3 bb1 bgfff">\r\n		<span class="ui-flex_item">选项</span>\r\n		<span class="ui-flex_item">赔率</span>\r\n		<span class="ui-flex_item">成交比</span>\r\n		<span class="ui-flex_item">盈亏</span>\r\n		<span class="ui-flex_item">冷热</span>\r\n	</div>\r\n	<ul>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">主胜</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(winOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(winBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(win.isHot ? 'color_red' : '');
$out+='">';
$out+=$escape(winProfitRate);
$out+='%</span>\r\n			';
if (winIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">平局</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(drawOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(drawBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(draw.isHot ? 'color_red' : '');
$out+='"">';
$out+=$escape(drawProfitRate);
$out+='%</span>\r\n			';
if (drawIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n		<li class="ui-flex">\r\n			<span class="ui-flex_item">客胜</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(loseOdds);
$out+='</span>\r\n			<span class="ui-flex_item">';
$out+=$escape(loseBetRate);
$out+='%</span>\r\n			<span class="ui-flex_item ';
$out+=$escape(lose.isHot ? 'color_red' : '');
$out+='">';
$out+=$escape(loseProfitRate);
$out+='%</span>\r\n			';
if (loseIsHot) { 
$out+='\r\n				<span class="ui-flex_item color_red"><i class="icon_smr"></i> 热 </span>\r\n			';
 } else { 
$out+='\r\n				<span class="ui-flex_item color_g"><i class="icon_sml"></i> 冷</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n	</ul>\r\n</div>\r\n<p class="pl10 pr10 size12">\r\n	注：【盈亏】 赛果开出某选项，官方赔付的风险比例，负数为官方亏本，正数为官方盈利。\r\n</p>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,jxzp=$data.jxzp,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,result=$data.result,concede=$data.concede,matchBeginTime=$data.matchBeginTime,bettypeOdds=$data.bettypeOdds,recommend=$data.recommend,recommendLength=$data.recommendLength,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,prize=$data.prize,temp=$data.temp,d=$data.d,month=$data.month,day=$data.day,time=$data.time,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,nullOdds=$data.nullOdds,showJxzp=$data.showJxzp,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$string=$helpers.$string,name=$data.name,$out='';
	jxzp = jxzp || {};
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away;
	var result = jxzp.result;
	var concede = jxzp.concede;
	var matchBeginTime = jxzp.matchBeginTime || "";
	var bettypeOdds = jxzp.bettypeOdds || {};
	var recommend = jxzp.recommend || [];
	var recommendLength = recommend.length;
	var recommendMap = {};
	for (var j = 0; j < recommendLength; j++) {
		recommendMap[recommend[j]] = true;
	}
	var bettypeResult = jxzp.bettypeResult || {};
	var prize = jxzp.prize || [];
	var temp = matchBeginTime.match(/\d{4}-(\d{2})-(\d{2}) (\d{2}:\d{2}):\d{2}/);
	var month = "";
	var day = "";
	var time = "";
	if (temp && temp.length == 4) {
		month = temp[1];
		day = temp[2];
		time = temp[3];
	}
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = +jxzp.recentContinue;
	var historyContinue = +jxzp.historyContinue;
	var nullOdds = '--';//赔率为空显示值

$out+='\r\n';
 if (showJxzp) { 
$out+='\r\n<div class="jx-box">\r\n	<div class="jx-box-top">\r\n		<div class="top-title">\r\n			<span class="ellipsis">';
$out+=$escape(teamName);
$out+='</span>\r\n		</div>\r\n		';
 if (recentContinue > historyContinue) { 
$out+='\r\n		<div class="hisImg">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+='history.png" alt="">\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="winOver">\r\n			<div class="fang">\r\n				<span class="winTitle">近期';
$out+=$escape(statusMap[type][status]);
$out+='</span>\r\n			</div>\r\n			<div class="winNum">\r\n				';
$out+=$escape(recentContinue);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="historyTop">\r\n			<div class="fang">\r\n				<span>历史最高</span>\r\n			</div>\r\n			<div class="historyNum">\r\n				';
$out+=$escape(historyContinue);
$out+='\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="jx-box-center">\r\n		追盘推荐：\r\n	</div>\r\n	';
 if( type == 1 || type == 2) { 
$out+='\r\n		<div class="ui-flex flex_wrap pl40">\r\n			<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n			<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n		</div>\r\n	';
 } else if (type == 3) { 
$out+='\r\n		<div class="ui-flex flex_wrap">\r\n			';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n			<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(recommend[j]);
$out+='球 ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n			';
 } 
$out+='\r\n			';
 
			if (prize.length <= 0) {
				for (var name in bettypeResult) {
					if (!bettypeResult[name]) {
						continue;
					}
			
$out+='\r\n				<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(name);
$out+='球 ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n			';

				}
			}
			
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,spf=$data.spf,match=$data.match,rqspf=$data.rqspf,bf=$data.bf,zjq=$data.zjq,bqc=$data.bqc,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,bfBettypeOdds=$data.bfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,bqcBettypeOdds=$data.bqcBettypeOdds,spfSingle=$data.spfSingle,rqspfSingle=$data.rqspfSingle,$escape=$helpers.$escape,$out='';$out+='<style>\r\n		.moreGame .game_table td {\r\n			height: 40px;\r\n		    line-height: 1;\r\n		}\r\n	</style>\r\n';
 
	var spf = match['bettype']['SPF'] || {};
	var rqspf = match['bettype']['RQSPF'] || {};
	var bf = match['bettype']['BF'] || {};
	var zjq = match['bettype']['ZJQ'] || {};
	var bqc = match['bettype']['BQC'] || {};
	var spfBettypeOdds = spf.bettypeOdds || {};
	var rqspfBettypeOdds = rqspf.bettypeOdds || {};
	var bfBettypeOdds = bf.bettypeOdds || {};
	var zjqBettypeOdds = zjq.bettypeOdds || {};
	var bqcBettypeOdds = bqc.bettypeOdds || {};
	var spfSingle = +spf.single || 0;
	var rqspfSingle = +rqspf.single || 0;

$out+='\r\n';
 if (spfSingle == 1) { 
$out+='\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">胜平负<span class="color9 ml10">猜90分钟内(含补时)赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap" style="padding-left: 45px;">\r\n		<span class="concede0">';
$out+=$escape(spf.concede);
$out+='</span>\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(spf.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="S">胜<br/><span>';
$out+=$escape(spfBettypeOdds['S']);
$out+='</span></td>\r\n				<td recommend="P">平<br/><span>';
$out+=$escape(spfBettypeOdds['P']);
$out+='</span></td>\r\n				<td recommend="F">负<br/><span>';
$out+=$escape(spfBettypeOdds['F']);
$out+='</span></td>\r\n			</tr>\r\n		</table>\r\n	</div>\r\n	';
 if (rqspfSingle == 1) { 
$out+='\r\n		<div class="table_wrap" style="padding-left: 45px;">\r\n			<span class="concede1">';
$out+=$escape(rqspf.concede);
$out+='</span>\r\n			<table class="game_table matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n				<tr>\r\n					<td recommend="S">胜<br/><span>';
$out+=$escape(rqspfBettypeOdds['S']);
$out+='</span></td>\r\n					<td recommend="P">平<br/><span>';
$out+=$escape(rqspfBettypeOdds['P']);
$out+='</span></td>\r\n					<td recommend="F">负<br/><span>';
$out+=$escape(rqspfBettypeOdds['F']);
$out+='</span></td>\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	';
 } 
$out+='\r\n';
 } else if (rqspfSingle == 1) { 
$out+='\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">胜平负<span class="color9 ml10">猜90分钟内(含补时)赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap" style="padding-left: 45px;">\r\n		<span class="concede1">';
$out+=$escape(rqspf.concede);
$out+='</span>\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="S">胜<br/><span>';
$out+=$escape(rqspfBettypeOdds['S']);
$out+='</span></td>\r\n				<td recommend="P">平<br/><span>';
$out+=$escape(rqspfBettypeOdds['P']);
$out+='</span></td>\r\n				<td recommend="F">负<br/><span>';
$out+=$escape(rqspfBettypeOdds['F']);
$out+='</span></td>\r\n			</tr>\r\n		</table>\r\n	</div>\r\n';
 } 
$out+='\r\n<div>\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">总进球<span class="color9 ml10">猜90分钟内(含补时)比赛总进球数</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(zjq.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="0">0<br/><span>';
$out+=$escape(zjqBettypeOdds['0']);
$out+='</span></td>\r\n				<td recommend="1">1<br/><span>';
$out+=$escape(zjqBettypeOdds['1']);
$out+='</span></td>\r\n				<td recommend="2">2<br/><span>';
$out+=$escape(zjqBettypeOdds['2']);
$out+='</span></td>\r\n				<td recommend="3">3<br/><span>';
$out+=$escape(zjqBettypeOdds['3']);
$out+='</span></td>	\r\n			</tr>\r\n			<tr>\r\n				<td recommend="4">4<br/><span>';
$out+=$escape(zjqBettypeOdds['4']);
$out+='</span></td>\r\n				<td recommend="5">5<br/><span>';
$out+=$escape(zjqBettypeOdds['5']);
$out+='</span></td>\r\n				<td recommend="6">6<br/><span>';
$out+=$escape(zjqBettypeOdds['6']);
$out+='</span></td>\r\n				<td recommend="7+">7+<br/><span>';
$out+=$escape(zjqBettypeOdds['7+']);
$out+='</span></td>	\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>		\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">半全场<span class="color9 ml10">猜两队上半场和90分钟内(含补时)的赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bqc.oddsId);
$out+='">\r\n			<tr>\r\n				<td recommend="SS">胜胜<br/><span>';
$out+=$escape(bqcBettypeOdds['SS']);
$out+='</span></td>\r\n				<td recommend="SP">胜平<br/><span>';
$out+=$escape(bqcBettypeOdds['SP']);
$out+='</span></td>\r\n				<td recommend="SF">胜负<br/><span>';
$out+=$escape(bqcBettypeOdds['SF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="PS">平胜<br/><span>';
$out+=$escape(bqcBettypeOdds['PS']);
$out+='</span></td>\r\n				<td recommend="PP">平平<br/><span>';
$out+=$escape(bqcBettypeOdds['PP']);
$out+='</span></td>\r\n				<td recommend="PF">平负<br/><span>';
$out+=$escape(bqcBettypeOdds['PF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="FS">负胜<br/><span>';
$out+=$escape(bqcBettypeOdds['FS']);
$out+='</span></td>\r\n				<td recommend="FP">负平<br/><span>';
$out+=$escape(bqcBettypeOdds['FP']);
$out+='</span></td>\r\n				<td recommend="FF">负负<br/><span>';
$out+=$escape(bqcBettypeOdds['FF']);
$out+='</span></td>	\r\n			</tr> \r\n		</table>	\r\n	</div>\r\n</div>			\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">比分<span class="color9 ml10">猜90分钟内(含补时)比分赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bf.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color60" rowspan="3">胜</td>\r\n				<td recommend="1:0">1:0<br/><span>';
$out+=$escape(bfBettypeOdds['1:0']);
$out+='</span></td>\r\n				<td recommend="2:0">2:0<br/><span>';
$out+=$escape(bfBettypeOdds['2:0']);
$out+='</span></td>\r\n				<td recommend="2:1">2:1<br/><span>';
$out+=$escape(bfBettypeOdds['2:1']);
$out+='</span></td>\r\n				<td recommend="3:0">3:0<br/><span>';
$out+=$escape(bfBettypeOdds['3:0']);
$out+='</span></td>\r\n				<td recommend="3:1">3:1<br/><span>';
$out+=$escape(bfBettypeOdds['3:1']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="3:2">3:2<br/><span>';
$out+=$escape(bfBettypeOdds['3:2']);
$out+='</span></td>\r\n				<td recommend="4:0">4:0<br/><span>';
$out+=$escape(bfBettypeOdds['4:0']);
$out+='</span></td>\r\n				<td recommend="4:1">4:1<br/><span>';
$out+=$escape(bfBettypeOdds['4:1']);
$out+='</span></td>\r\n				<td recommend="4:2">4:2<br/><span>';
$out+=$escape(bfBettypeOdds['4:2']);
$out+='</span></td>\r\n				<td recommend="5:0">5:0<br/><span>';
$out+=$escape(bfBettypeOdds['5:0']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="5:1">5:1<br/><span>';
$out+=$escape(bfBettypeOdds['5:1']);
$out+='</span></td>\r\n				<td recommend="5:2">5:2<br/><span>';
$out+=$escape(bfBettypeOdds['5:2']);
$out+='</span></td>\r\n				<td recommend="SQT">胜其他<br/><span>';
$out+=$escape(bfBettypeOdds['SQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n			<tr>\r\n				<td class="game_title color70">平</td>\r\n				<td recommend="0:0">0:0<br/><span>';
$out+=$escape(bfBettypeOdds['0:0']);
$out+='</span></td>\r\n				<td recommend="1:1">1:1<br/><span>';
$out+=$escape(bfBettypeOdds['1:1']);
$out+='</span></td>\r\n				<td recommend="2:2">2:2<br/><span>';
$out+=$escape(bfBettypeOdds['2:2']);
$out+='</span></td>\r\n				<td recommend="3:3">3:3<br/><span>';
$out+=$escape(bfBettypeOdds['3:3']);
$out+='</span></td>\r\n				<td recommend="PQT">平其他<br/><span>';
$out+=$escape(bfBettypeOdds['PQT']);
$out+='</span></td>\r\n			</tr>\r\n            <tr>\r\n				<td class="game_title color60" rowspan="3">负</td>\r\n				<td recommend="0:1">0:1<br/><span>';
$out+=$escape(bfBettypeOdds['0:1']);
$out+='</span></td>\r\n				<td recommend="0:2">0:2<br/><span>';
$out+=$escape(bfBettypeOdds['0:2']);
$out+='</span></td>\r\n				<td recommend="1:2">1:2<br/><span>';
$out+=$escape(bfBettypeOdds['1:2']);
$out+='</span></td>\r\n				<td recommend="0:3">0:3<br/><span>';
$out+=$escape(bfBettypeOdds['0:3']);
$out+='</span></td>\r\n				<td recommend="1:3">1:3<br/><span>';
$out+=$escape(bfBettypeOdds['1:3']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="2:3">2:3<br/><span>';
$out+=$escape(bfBettypeOdds['2:3']);
$out+='</span></td>\r\n				<td recommend="0:4">0:4<br/><span>';
$out+=$escape(bfBettypeOdds['0:4']);
$out+='</span></td>\r\n				<td recommend="1:4">1:4<br/><span>';
$out+=$escape(bfBettypeOdds['1:4']);
$out+='</span></td>\r\n				<td recommend="2:4">2:4<br/><span>';
$out+=$escape(bfBettypeOdds['2:4']);
$out+='</span></td>\r\n				<td recommend="0:5">0:5<br/><span>';
$out+=$escape(bfBettypeOdds['0:5']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="1:5">1:5<br/><span>';
$out+=$escape(bfBettypeOdds['1:5']);
$out+='</span></td>\r\n				<td recommend="2:5">2:5<br/><span>';
$out+=$escape(bfBettypeOdds['2:5']);
$out+='</span></td>\r\n				<td recommend="FQT">负其他<br/><span>';
$out+=$escape(bfBettypeOdds['FQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function basketball($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,sf=$data.sf,match=$data.match,rfsf=$data.rfsf,sfc=$data.sfc,dxf=$data.dxf,sfBettypeOdds=$data.sfBettypeOdds,rfsfBettypeOdds=$data.rfsfBettypeOdds,sfcBettypeOdds=$data.sfcBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,sfSingle=$data.sfSingle,rfsfSingle=$data.rfsfSingle,dxfSingle=$data.dxfSingle,$escape=$helpers.$escape,$string=$helpers.$string,$out='';$out+='<style>\r\n		.moreGame .game_table td {\r\n			height: 40px;\r\n		    line-height: 1;\r\n		}\r\n	</style>\r\n';
 
	var sf = match['bettype']['SF'] || {};
	var rfsf = match['bettype']['RFSF'] || {};
	var sfc = match['bettype']['SFC'] || {};
	var dxf = match['bettype']['DXF'] || {};
	var sfBettypeOdds = sf.bettypeOdds || {};
	var rfsfBettypeOdds = rfsf.bettypeOdds || {};
	var sfcBettypeOdds = sfc.bettypeOdds || {};
	var dxfBettypeOdds = dxf.bettypeOdds || {};
	var sfSingle = +sf.single || 0;
	var rfsfSingle = +rfsf.single || 0;
	var dxfSingle = +dxf.single || 0;

$out+='\r\n	<div>\r\n		';
 if (sfSingle == 1) { 
$out+='\r\n			<div>\r\n				<div class="game_head clearfix mt5">\r\n					<span class="fl">胜负<span class="color9 ml10">猜全场(含加时)主客队胜负情况</span></span>\r\n				</div>\r\n				<div class="table_wrap">\r\n					<table class="game_table matchBettype" oddsId="';
$out+=$escape(sf.oddsId);
$out+='">\r\n						<tr>\r\n							<td recommend="F">客胜<br/><span>';
$out+=$escape(sfBettypeOdds['F']);
$out+='</span></td>\r\n							<td width="90"><p class="">0</p></td>\r\n							<td recommend="S">主胜<br/><span>';
$out+=$escape(sfBettypeOdds['S']);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n				';
 if (rfsfSingle == 1) { 
$out+='\r\n					<div class="table_wrap">\r\n						<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n							<tr>\r\n								<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n								<td width="90"><p class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+='">主';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</p></td>\r\n								<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n							</tr>\r\n						</table>	\r\n					</div>\r\n				</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if (rfsfSingle == 1) { 
$out+='\r\n			<div class="game_head clearfix mt5">\r\n				<span class="fl">胜负<span class="color9 ml10">猜全场(含加时)主客队胜负情况</span></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n					<tr>\r\n						<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n						<td width="90"><p class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+='">';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</p></td>\r\n						<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		';
 }　
$out+='\r\n		';
 if (dxfSingle == 1) { 
$out+='\r\n			<div>\r\n				<div class="game_head clearfix mt5">\r\n					<span class="fl">大小分<span class="color9 ml10">猜全场(含加时)双方总比分</span></span>\r\n				</div>\r\n				<div class="table_wrap">\r\n					<table class="game_table matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n						<tr>\r\n							<td recommend="D">大分<br/><span>';
$out+=$escape(dxfBettypeOdds['D']);
$out+='</span></td>\r\n							<td width="90"><p class="color_red">';
$out+=$escape(dxf.concede);
$out+='</p></td>\r\n							<td recommend="X">小分<br/><span>';
$out+=$escape(dxfBettypeOdds['X']);
$out+='</span></td>\r\n						</tr>\r\n					</table>	\r\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n		<div>\r\n			<div class="game_head clearfix mt5">\r\n				<span class="fl">胜分差<span class="color9 ml10">猜全场比赛主客队的比分差区间</span></span> \r\n				<span class="arrow arrow_up hide"></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(sfc.oddsId);
$out+='" bettypeContent="';
$out+=$escape(sfc.bettypeContent);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12" rowspan="2">客胜</td>\r\n						<td recommend="F1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['F1-5']);
$out+='</span></td>\r\n						<td recommend="F6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['F6-10']);
$out+='</span></td>\r\n						<td recommend="F11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['F11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="F16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['F16-20']);
$out+='</span></td>\r\n						<td recommend="F21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['F21-25']);
$out+='</span></td>\r\n						<td recommend="F26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['F26+']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td class="game_title color60 size12" rowspan="2">主胜</td>\r\n						<td recommend="S1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['S1-5']);
$out+='</span></td>\r\n						<td recommend="S6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['S6-10']);
$out+='</span></td>\r\n						<td recommend="S11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['S11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="S16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['S16-20']);
$out+='</span></td>\r\n						<td recommend="S21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['S21-25']);
$out+='</span></td>\r\n						<td recommend="S26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['S26+']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function analyzeWrap($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,againstMatchList=$data.againstMatchList,analyse=$data.analyse,futureMatchList=$data.futureMatchList,groupScoreList=$data.groupScoreList,historyMatchList=$data.historyMatchList,leagueScore=$data.leagueScore,groupLength=$data.groupLength,leagueLength=$data.leagueLength,Object=$data.Object,againstMatchLength=$data.againstMatchLength,historyMatchLength=$data.historyMatchLength,futureMatchLength=$data.futureMatchLength,imgMap=$data.imgMap,matchInfo=$data.matchInfo,homeLogoImg=$data.homeLogoImg,awayLogoImg=$data.awayLogoImg,i=$data.i,teamRank=$data.teamRank,team=$data.team,rank=$data.rank,winCount=$data.winCount,drawCount=$data.drawCount,lostCount=$data.lostCount,goal=$data.goal,lostGoal=$data.lostGoal,score=$data.score,$escape=$helpers.$escape,league=$data.league,standings=$data.standings,scoreList=$data.scoreList,scoreListLength=$data.scoreListLength,IMG_PATH=$data.IMG_PATH,type=$data.type,attribute=$data.attribute,attributeMap=$data.attributeMap,variable=$data.variable,a=$data.a,list=$data.list,sum=$data.sum,length=$data.length,loseCount=$data.loseCount,gamesNum=$data.gamesNum,winPercent=$data.winPercent,Math=$data.Math,drawPercent=$data.drawPercent,losePercent=$data.losePercent,match=$data.match,homeTeam=$data.homeTeam,awayTeam=$data.awayTeam,isHome=$data.isHome,matchDate=$data.matchDate,d=$data.d,halfResult=$data.halfResult,result=$data.result,realResult=$data.realResult,handicap=$data.handicap,handicapResult=$data.handicapResult,resultMap=$data.resultMap,resultColor=$data.resultColor,handicapResultMap=$data.handicapResultMap,historyMatch=$data.historyMatch,all=$data.all,b=$data.b,history=$data.history,futureMatch=$data.futureMatch,spaceDays=$data.spaceDays,$out='';$out+='<!--分析-->\r\n';

	var againstMatchList = analyse.againstMatchList || {}; //历史交锋
	var futureMatchList = analyse.futureMatchList || {}; //未来赛事
	var groupScoreList = analyse.groupScoreList || []; //小组排名
	var historyMatchList = analyse.historyMatchList || {}; //近期赛事
	var leagueScore = analyse.leagueScore || {}; //联赛战绩
	var groupLength = groupScoreList.length;
	var leagueLength = Object.keys(leagueScore).length;
	var againstMatchLength = Object.keys(againstMatchList).length;
	var historyMatchLength = Object.keys(historyMatchList).length;
	var futureMatchLength = Object.keys(futureMatchList).length;
	var imgMap = {"1":"team","2":"basketball_def"};
	var matchInfo = analyse.matchInfo || {};
	var homeLogoImg = matchInfo.homeLogoImg || '';
	var awayLogoImg = matchInfo.awayLogoImg || '';

$out+='\r\n	';
 if (groupLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">小组排名</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table>\r\n					<tr>\r\n						<th width="23%">球队</th>\r\n						<th>排名</th>\r\n						<th>胜</th>\r\n						<th>平</th>\r\n						<th>负</th>\r\n						<th>得/失</th>\r\n						<th width="15.2%">积分</th>\r\n					</tr>\r\n					';
 
						for (var i = 0; i < groupLength; i++) {
						var teamRank = groupScoreList[i] || {};
						var team = teamRank.team || {};
						var rank = teamRank.rank || "";
						var winCount = teamRank.winCount || 0;
						var drawCount = teamRank.drawCount || 0;
						var lostCount = teamRank.lostCount || 0;
						var goal = teamRank.goal || 0;
						var lostGoal = teamRank.lostGoal || 0;
						var score = teamRank.score || 0;				
					
$out+='\r\n					<tr>\r\n						<td>';
$out+=$escape(team);
$out+='</td>\r\n						<td>';
$out+=$escape(rank);
$out+='</td>\r\n						<td>';
$out+=$escape(winCount);
$out+='</td>\r\n						<td>';
$out+=$escape(drawCount);
$out+='</td>\r\n						<td>';
$out+=$escape(lostCount);
$out+='</td>\r\n						<td>';
$out+=$escape(goal);
$out+='/';
$out+=$escape(lostGoal);
$out+='</td>\r\n						<td>';
$out+=$escape(score);
$out+='</td>\r\n					</tr>\r\n					';
 } 
$out+='\r\n				</table>\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (leagueLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">联赛战绩</span>\r\n			</div>\r\n		';

			for(league in leagueScore) {
				var standings = leagueScore[league] || {};
				var team = standings.team || "";
				var scoreList = standings.scoreList || {};
				var scoreListLength = Object.keys(scoreList).length;
		
$out+='\r\n			<div class="title_record border-top">\r\n				<img class="team_img" src="';
$out+=$escape(league == 'home' ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'" />\r\n				<span class="title_name">';
$out+=$escape(team);
$out+='</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table>\r\n					<tr>\r\n						<th width="23%"></th>\r\n						<th>排名</th>\r\n						<th>胜</th>\r\n						<th>平</th>\r\n						<th>负</th>\r\n						<th>得/失</th>\r\n						<th width="15.2%">积分</th>\r\n					</tr>\r\n					';
 
						for (attribute in scoreList) {
							var winCount = scoreList[attribute].winCount || 0;
							var drawCount = scoreList[attribute].drawCount || 0;
							var lostCount = scoreList[attribute].lostCount || 0;
							var goal = scoreList[attribute].goal || 0;
							var lostGoal = scoreList[attribute].lostGoal || 0;
							var rank = scoreList[attribute].rank || "";
							var score = scoreList[attribute].score || 0;
							var team = scoreList[attribute].team || "";
							var attributeMap = {"total": "总", "home": "主", "away": "客"};
					
$out+='\r\n						<tr>\r\n							<td>';
$out+=$escape(attributeMap[attribute]);
$out+='</td>\r\n							<td>';
$out+=$escape(rank);
$out+='</td>\r\n							<td>';
$out+=$escape(winCount);
$out+='</td>\r\n							<td>';
$out+=$escape(drawCount);
$out+='</td>\r\n							<td>';
$out+=$escape(lostCount);
$out+='</td>\r\n							<td>';
$out+=$escape(goal);
$out+='/';
$out+=$escape(lostGoal);
$out+='</td>\r\n							<td>';
$out+=$escape(score);
$out+='</td>\r\n						</tr>\r\n					';
 } 
$out+='\r\n				</table>\r\n			</div>\r\n		';
 } 
$out+='\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (againstMatchLength > 0) { 
$out+='\r\n	<div class="data_item">\r\n		<div class="title_record">\r\n			<span class="name_line"></span>\r\n			<span class="title_name">历史交锋</span>\r\n		</div>\r\n		';

			for (variable in againstMatchList) {
				var a = againstMatchList[variable] || {};
				var list = a.list || [];
				var sum = a.sum || {};
				var length = list.length;
				var drawCount = sum.drawCount || 0;
				var loseCount = sum.loseCount || 0;
				var winCount = sum.winCount || 0;
				var gamesNum = +drawCount + loseCount + winCount; //总场数
				var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
				var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
				var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
		
$out+='\r\n			<div class="against_msg" id="against';
$out+=$escape(variable);
$out+='" style="display: none;">\n				';
 if (gamesNum > 0) { 
$out+='\r\n					<div class="against_result">\r\n						<div class="map_name">\r\n							';
 if (winCount > 0) { 
$out+='\r\n								<span class="success" style="width: ';
$out+=$escape(winPercent);
$out+=';">';
$out+=$escape(winCount);
$out+='胜</span>\r\n							';
 } 
$out+='\r\n							';
 if (drawCount > 0) { 
$out+='\r\n							<span class="flat" style="width: ';
$out+=$escape(drawPercent);
$out+=';">';
$out+=$escape(drawCount);
$out+='平</span>\r\n							';
 } 
$out+='\r\n							';
 if (loseCount > 0) { 
$out+='\r\n							<span class="lose" style="width: ';
$out+=$escape(losePercent);
$out+=';">';
$out+=$escape(loseCount);
$out+='负</span>\r\n							';
 } 
$out+='\r\n						</div>\r\n						<div class="data_map mt5">\r\n							<span class="map_color" style="width: ';
$out+=$escape(winPercent);
$out+=';background-color: #ec3334;"></span>\r\n							<span class="map_color" style="width: ';
$out+=$escape(drawPercent);
$out+=';background-color: #448be0;"></span>\r\n							<span class="map_color" style="width: ';
$out+=$escape(losePercent);
$out+=';background-color: #57b63b;"></span>\r\n						</div>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="table_wrap">\r\n					<table>\r\n						<tr>\r\n							<th width="18%">联赛</th>\r\n							<th width="15%">日期</th>\r\n							<th></th>\r\n							<th width="12%">赛事</th>\r\n							<th></th>\r\n							<th width="8%">赛果</th>\r\n							<th width="18%">盘路</th>\r\n						</tr>\r\n						';
 
							for (var i = 0; i < list.length; i++) {
							var match = list[i] || {};
							var league = match.league || ""; //联赛名
							var homeTeam = match.homeTeam || "";
							var awayTeam = match.awayTeam || "";
							var isHome = match.isHome;
							var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
							var halfResult = match.halfResult || ""; //半场比分
							var result = match.result || ""; //全场比分
							var realResult = match.realResult || ""; //赛果
							var handicap = match.handicap || ""; //盘口
							var handicapResult = match.handicapResult || ""; //盘路	
							var resultMap = {"win": "胜","draw": "平","lose": "负"};
							var resultColor = {"win": "color-s","draw": "color-f","lose": "color-l"};
							var handicapResultMap = {"win": "赢","draw": "走","lose": "输"};
						
$out+='\r\n						<tr>\r\n							<td>';
$out+=$escape(league);
$out+='</td>\r\n							<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n							<td class="team_name ';
$out+=$escape(isHome == true ? resultColor[realResult] : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n							<td>';
$out+=$escape(result);
$out+='<span class="half_result">(';
$out+=$escape(halfResult);
$out+=')</span></td>\r\n							<td class="';
$out+=$escape(isHome == false ? resultColor[realResult] : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n							<td class="';
$out+=$escape(resultColor[realResult]);
$out+='">';
$out+=$escape(resultMap[realResult]);
$out+='</td>\r\n							<td>';
$out+=$escape(handicap);
$out+='<span class="';
$out+=$escape(resultColor[handicapResult]);
$out+='">';
$out+=$escape(handicapResultMap[handicapResult]);
$out+='</span></td>\r\n						</tr>\r\n						';
 } 
$out+='\r\n					</table>\n				</div>\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="switch_btn_wrap">\r\n			<div class="switch_btn" id="againstSwitchBtn">\r\n				<span value="all">全部</span>\r\n				<span value="asHome">主场</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
$out+='\r\n';
 if (historyMatchLength > 0) { 
$out+='\r\n		<div class="data_item">\r\n			<div class="title_record">\r\n				<span class="name_line"></span>\r\n				<span class="title_name">近期战绩</span>\r\n			</div>\r\n			';

				for (a in historyMatchList) {
					var historyMatch = historyMatchList[a] || {};
					var team = historyMatch.team;
					var all = historyMatch.all || {};
					var list = all.list || [];
					var sum = all.sum || {};
					var length = list.length;
					var drawCount = sum.drawCount || 0;
					var loseCount = sum.loseCount || 0;
					var winCount = sum.winCount || 0;
					var gamesNum = +drawCount + loseCount + winCount; //总场数
					var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
					var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
					var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
			
$out+='\r\n		<div class="title_record border-top">\r\n			<img class="team_img" src="';
$out+=$escape(a == 'home' ? homeLogoImg : awayLogoImg);
$out+='" onerror="this.src=\'';
$out+=$escape(IMG_PATH);
$out+=$escape(imgMap[type]);
$out+='.png\'" />\r\n			<span class="title_name">';
$out+=$escape(team);
$out+='</span>\r\n		</div>\r\n		<div class="">\r\n			';

				for (b in historyMatch) {
					var history = historyMatch[b] || {};
					var list = history.list || [];
					var sum = history.sum || {};
					var length = list.length;
					var drawCount = sum.drawCount || 0;
					var loseCount = sum.loseCount || 0;
					var winCount = sum.winCount || 0;
					var gamesNum = +drawCount + loseCount + winCount; //总场数
					var winPercent = Math.round((winCount/gamesNum)*100) + "%" || 0;
					var drawPercent = Math.round((drawCount/gamesNum)*100) + "%" || 0;
					var losePercent = Math.round((loseCount/gamesNum)*100) + "%" || 0;
			
$out+='\r\n			';
 if (b == 'all' || b == 'asHome' || b == 'asAway') { 
$out+='\r\n				<div class="history_';
$out+=$escape(a);
$out+='_msg" id="';
$out+=$escape(a);
$out+=$escape(b);
$out+='history">\r\n					';
 if (gamesNum > 0) { 
$out+='\r\n						<div class="against_result">\r\n							<div class="map_name">\r\n								';
 if (winCount > 0) { 
$out+='\r\n									<span class="success" style="width: ';
$out+=$escape(winPercent);
$out+=';">';
$out+=$escape(winCount);
$out+='胜</span>\r\n								';
 } 
$out+='\r\n								';
 if (drawCount > 0) { 
$out+='\r\n								<span class="flat" style="width: ';
$out+=$escape(drawPercent);
$out+=';">';
$out+=$escape(drawCount);
$out+='平</span>\r\n								';
 } 
$out+='\r\n								';
 if (loseCount > 0) { 
$out+='\r\n								<span class="lose" style="width: ';
$out+=$escape(losePercent);
$out+=';">';
$out+=$escape(loseCount);
$out+='负</span>\r\n								';
 } 
$out+='\r\n							</div>\r\n							<div class="data_map mt5">\r\n								<span class="map_color" style="width: ';
$out+=$escape(winPercent);
$out+=';background-color: #ec3334;"></span>\r\n								<span class="map_color" style="width: ';
$out+=$escape(drawPercent);
$out+=';background-color: #448be0;"></span>\r\n								<span class="map_color" style="width: ';
$out+=$escape(losePercent);
$out+=';background-color: #57b63b;"></span>\r\n							</div>\r\n						</div>\r\n					';
 } 
$out+='\r\n					<div class="table_wrap">\r\n						<table>\r\n							<tr>\r\n								<th width="18%">联赛</th>\r\n								<th width="15%">日期</th>\r\n								<th></th>\r\n								<th width="12%">赛事</th>\r\n								<th></th>\r\n								<th width="8%">赛果</th>\r\n								<th width="18%">盘路</th>\r\n							</tr>\r\n							';
 
								for (var i = 0; i < list.length; i++) {
								var match = list[i] || {};
								var league = match.league || ""; //联赛名
								var homeTeam = match.homeTeam || "";
								var awayTeam = match.awayTeam || "";
								var isHome = match.isHome || "";
								var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
								var halfResult = match.halfResult || ""; //半场比分
								var result = match.result || ""; //全场比分
								var realResult = match.realResult || ""; //赛果
								var handicap = match.handicap || ""; //盘口
								var handicapResult = match.handicapResult || ""; //盘路	
								var resultMap = {"win": "胜","draw": "平","lose": "负"};
								var resultColor = {"win": "color-s","draw": "color-f","lose": "color-l"};
								var handicapResultMap = {"win": "赢","draw": "走","lose": "输"};
							
$out+='\r\n							<tr>\r\n								<td>';
$out+=$escape(league);
$out+='</td>\r\n								<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n								<td class="team_name ';
$out+=$escape(isHome == true ? resultColor[realResult] : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n								<td>';
$out+=$escape(result);
$out+='<span class="half_result">(';
$out+=$escape(halfResult);
$out+=')</span></td>\r\n								<td class="';
$out+=$escape(isHome == false ? resultColor[realResult] : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n								<td class="';
$out+=$escape(resultColor[realResult]);
$out+='">';
$out+=$escape(resultMap[realResult]);
$out+='</td>\r\n								<td>';
$out+=$escape(handicap);
$out+='<span class="';
$out+=$escape(resultColor[handicapResult]);
$out+='">';
$out+=$escape(handicapResultMap[handicapResult]);
$out+='</span></td>\r\n							</tr>\r\n							';
 } 
$out+='\r\n						</table>\r\n					</div>\r\n				</div>\r\n			';
 }
				} 
$out+='\r\n			<div class="switch_btn_wrap">\r\n				<div class="switch_btn" id="';
$out+=$escape(a);
$out+='HistorySwitchBtn">\r\n					<span value="all">全部</span>\r\n					<span value="';
$out+=$escape(a == 'home' ? 'asHome' : 'asAway');
$out+='">';
$out+=$escape(a == 'home' ? '主场' : '客场');
$out+='</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n';
 if (futureMatchLength > 0) { 
$out+='\r\n	<div class="data_item">\r\n		<div class="title_record">\r\n			<span class="name_line"></span>\r\n			<span class="title_name">未来赛事</span>\r\n		</div>\r\n		';

			for (variable in futureMatchList) {
				var futureMatch = futureMatchList[variable] || [];
				var length = futureMatch.length;
		
$out+='\r\n		<div class="table_wrap" style="';
$out+=$escape(variable == 'away' ? 'border-top: 3px solid #ebeff0' : '');
$out+='">\r\n			<table>\r\n				<tr>\r\n					<th width="21%">联赛</th>\r\n					<th width="15%">日期</th>\r\n					<th></th>\r\n					<th width="7%">赛事</th>\r\n					<th></th>\r\n					<th width="21%">间隔</th>\r\n				</tr>\r\n				';
 
					for (var i = 0; i < futureMatch.length; i++) {
					var match = futureMatch[i] || {};
					var league = match.league || ""; //联赛名
					var homeTeam = match.homeTeam || "";
					var awayTeam = match.awayTeam || "";
					var isHome = match.isHome || "";
					var matchDate = match.matchDate && match.matchDate.replace(/\d{2}(\d{2}-\d{2}-\d{2})/, "$1")|| "";
					var spaceDays = match.spaceDays || 0; 
				
$out+='\r\n				<tr>\r\n					<td>';
$out+=$escape(league);
$out+='</td>\r\n					<td>';
$out+=$escape(matchDate);
$out+='</td>\r\n					<td class="team_name ';
$out+=$escape(isHome == true ? 'color-s' : '');
$out+='" align="right">';
$out+=$escape(homeTeam);
$out+='</td>\r\n					<td><span class="half_result">vs</span></td>\r\n					<td class="';
$out+=$escape(isHome == false ? 'color-s' : '');
$out+='" align="left">';
$out+=$escape(awayTeam);
$out+='</td>\r\n					<td>';
$out+=$escape(spaceDays);
$out+='天后</td>\r\n				</tr>\r\n				';
 } 
$out+='\r\n			</table>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</div>\r\n';
 } 
$out+='\r\n<div class="bottom_txt mt20">\r\n	<p>以上数据仅供浏览、投注参考之用</p>\r\n	<p>并不作为最终投注依据</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function oddsWrap($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,matchOdds=$data.matchOdds,odds=$data.odds,bookmaker=$data.bookmaker,firstOdds=$data.firstOdds,endOdds=$data.endOdds,oddsChange=$data.oddsChange,oddsChangeMap=$data.oddsChangeMap,$escape=$helpers.$escape,oddsType=$data.oddsType,$out='';$out+='<div class="table_wrap">\r\n		<table>\r\n			<tbody>\r\n				';

					for (var i = 0; i < matchOdds.length; i++) {
					var odds = matchOdds[i] || {};
					var bookmaker = odds.bookmaker || "";
					var firstOdds = odds.firstOdds || {};
					var endOdds = odds.endOdds || {};
					var oddsChange = odds.oddsChange || {};
					var oddsChangeMap = {'up': 'go_up','down': 'go_down'}
				
$out+='\r\n				<tr>\r\n					<td width="28%">\r\n						<span class="odds_name">';
$out+=$escape(bookmaker);
$out+='</span>\r\n						<span class="line"></span>\r\n					</td>\r\n					<td>\r\n						<div>初赔</div>\r\n						<div>即时</div>\r\n					</td>\r\n					';
 if (oddsType == 1) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.S);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.S]);
$out+='">\r\n								<span>\r\n									';
$out+=$escape(endOdds.S);
$out+='\r\n								</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.P);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.P]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.P);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.F);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.F]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.F);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } else if (oddsType == 2) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.home);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.homeChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.home);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.handicap);
$out+='</span>\r\n							</div>\r\n							<div>\r\n								<span>';
$out+=$escape(endOdds.handicap);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.away);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.awayChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.away);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } else if (oddsType == 3) { 
$out+='\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.big);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.bigChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.big);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div>\r\n								<span>';
$out+=$escape(firstOdds.handicap);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.handicapChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.handicap);
$out+='</span>\r\n							</div>\r\n						</td>\r\n						<td>\r\n							<div class="">\r\n								<span>';
$out+=$escape(firstOdds.small);
$out+='</span>\r\n							</div>\r\n							<div class="';
$out+=$escape(oddsChangeMap[oddsChange.smallChange]);
$out+='">\r\n								<span>';
$out+=$escape(endOdds.small);
$out+='</span>\r\n							</div>\r\n						</td>\r\n					';
 } 
$out+='\r\n					<td width="5%"></td>\r\n				</tr>\r\n				';
 } 
$out+='\r\n			</tbody>\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/index',function(require,exports){var templateUtils = (function (){
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
})();exports.mockUser=mockUser;function mockUser($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n	.line {\r\n		margin-top: 10px;\r\n		margin-left: 10px;\r\n		height: 30px;\r\n		line-height: 30px;\r\n	}\r\n	.line select {\r\n		width: 100px;\r\n		height: 25px;\r\n		line-height: 25px;\r\n	    -webkit-appearance: listbox;\r\n	    -moz-appearance: listbox;\r\n	    -ms-appearance: listbox\r\n	    -o-appearance: listbox;\r\n	    appearance: listbox;\r\n	}\r\n	.line input {\r\n		height: 20px;\r\n		line-height: 20px;\r\n		border: 1px solid #ccc;\r\n		width: 200px;\r\n	}\r\n	ul {\r\n		margin-left: 30px;\r\n		list-style-type: none;\r\n		padding: 0 30px 0 0;\r\n	}\r\n	li {\r\n		height: 30px;\r\n		line-height: 30px;\r\n		border-bottom: 1px solid #ccc;\r\n	}\r\n	li span {\r\n		display: inline-block;\r\n		height: 30px;\r\n		overflow: hidden;\r\n	}\r\n	li span a {\r\n		color: #ff0000;\r\n	}\r\n</style>\r\n\r\n<div class="line">　　密码：<input type="text" id="password"/></div>\r\n<div class="line">用户分组：<select id="groupId"><option value="">全部</option></select></div>\r\n<div class="line">用户列表：</div>\r\n<ul id="userList"><ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/gpcConsumeList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.gpcConsumeList=gpcConsumeList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="gpcConsumeList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function gpcConsumeList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,year=$data.year,mouthList=$data.mouthList,$escape=$helpers.$escape,j=$data.j,len=$data.len,item=$data.item,gpConsume=$data.gpConsume,month=$data.month,date=$data.date,Date=$data.Date,curMonth=$data.curMonth,curYear=$data.curYear,time=$data.time,$out='';
		for (var i = 0, length = list.length; i < length; i++) {
			var year = (list[i].year + '') || '';
			var mouthList = list[i].mouthList || [];
	
$out+='\r\n	<div class="gpcConsumeDate year clearfix">\r\n		<span class="fl">';
$out+=$escape(year);
$out+='年</span>\r\n		<span class="arrow arrow_up"></span>\r\n	</div>\r\n	<ul class="menu gpcConsumeContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n		';
 
			for (var j = 0, len = mouthList.length; j < len; j++) {
			var item = mouthList[j];
			var gpConsume = (item.gpConsume/100).toFixed(2) || 0;
			var month = item.month;
			var date = new Date();
			var curMonth = date.getMonth() + 1;
			var curYear = date.getFullYear();
			var time = year + month;
		
$out+='\r\n		<li class="ui-flex menu_bar" time= \'';
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
$out+=$escape(gpConsume);
$out+='元</span>\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n	</ul>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/incomeList',function(require,exports){var templateUtils = (function (){
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
define('view/invitation/index',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$out='';$out+='<div class="invite_wrap">\r\n		<dl>\r\n			<dd class="mb15">推广链接</dd>\r\n			<dd class="invite_link mb15"><input id="shareLink" type="text" value="" readonly="true"/></dd>\r\n			<dd>\r\n				<button class="invite_copy" id="copyBtn" data-clipboard-target="#shareLink"></button>\r\n				<span class="invite_share" id="shareBtn"></span>\r\n			</dd>\r\n		</dl>\r\n	</div>\r\n	<!--菜单-->\r\n	<ul class="mt10 menu" id="tabList">\r\n		<li class="ui-flex menu_bar" tab="1">\r\n			<span>我的收益</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="2">\r\n			<span>邀请人数</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="3">\r\n			<span>高频彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="4">\r\n			<span>竞技彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/inviteNum',function(require,exports){var templateUtils = (function (){
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
})();});
define('view/invitation/inviteUserList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="invite_num">\r\n		<table align="center">\r\n			<thead>\r\n				<tr>\r\n					<th width="50%">用户名</th>\r\n					<th width="50%">注册时间</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody align="center" id="userList">\r\n				\r\n			</tbody>\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,item=$data.item,nickName=$data.nickName,createTime=$data.createTime,d=$data.d,$escape=$helpers.$escape,$out=''; 
	var length = list.length;
	if (length > 0) {
		for (var i = 0; i < length; i++) {
			var item = list[i] || {};
			var nickName = item.nickName;
			var createTime = item.createTime && item.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	
$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(nickName);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n	</tr>\r\n	';
 }
		} 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/jjcConsumeList',function(require,exports){var templateUtils = (function (){
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
define('view/invitation/login',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="input_wrap">\r\n		<div class="phone_num mb20">\r\n			<div class="icon_wrap">\r\n				<i class="phone_icon"></i>\r\n				<span class="v-line"></span>\r\n			</div>\r\n			<input type="number" id="mobile" placeholder="请输入手机号" />\r\n		</div>\r\n		<div class="venidate_wrap clearfix">\r\n			<div class="icon_wrap">\r\n				<i class="key_icon"></i>\r\n				<span class="v-line" style="margin-left: 10px;"></span>\r\n			</div>\r\n			<input class="venidate_code" type="text" id="smsCode" placeholder="请输入验证码" />\r\n			<a class="get_code" id="smsCodeBtn">获取验证码</a>\r\n		</div>\r\n	</div>\r\n	<div class="get_parket" id="loginSubmit">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_cpdhb_submit.png" alt="" />\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/myIncome',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$out='';$out+='<div class="invite_wrap">\r\n		<dl>\r\n			<dd class="mb15">推广链接</dd>\r\n			<dd class="invite_link mb15"><input type="text" value="http://www.xxx.com"/></dd>\r\n			<dd>\r\n				<span class="invite_copy"></span>\r\n				<span class="invite_share"></span>\r\n			</dd>\r\n		</dl>\r\n	</div>\r\n	<!--菜单-->\r\n	<ul class="mt10 menu" id="tabList">\r\n		<li class="ui-flex menu_bar" tab="1">\r\n			<span>我的收益</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="2">\r\n			<span>邀请人数</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="3">\r\n			<span>高频彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="4">\r\n			<span>竞技彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/invitation/seachConsumeList',function(require,exports){var templateUtils = (function (){
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
define('view/iosEEAppDownload',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="down-clumn">\r\n		<div class="mb-logo">晒米场企业版</div>\r\n		<div class="btn_wrap">\r\n			<a class="down-btn" id="download" href="https://www.pgyer.com/vJUz"><i class="apple_logo"></i>前往安装最新版本</a>\r\n		</div>\r\n		<!--<p class="down_txt">微信中点击右上角三个点，选择在"浏览器中打开"即可</p>-->\r\n		<p class="msg">注：若安装不成功，请删除晒米场老版本重新安装</p>\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='iosEE_bg_radian.png"/>\r\n	</div>\r\n	<div class="mb_download_bottom">\r\n		<h3 class="course_title">“未受信任的企业级开发者”解决办法</h3>\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='iosEE_course.gif"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/jsk3',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.k3Num=k3Num;exports.HZ=HZ;exports.STH=STH;exports.SBT=SBT;exports.SLH=SLH;exports.ETH=ETH;exports.EBT=EBT;exports.k3Bet=k3Bet;exports.k3List=k3List;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function k3Num($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav_wrap" id="navWrap" style="display: none;">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<div class="item_content">\r\n					<span class="type">和值</span>\r\n					<div class="prize">奖金 <span>9~240元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<div class="item_content ">\r\n					<span class="type">二同号</span>\r\n					<div class="prize">奖金 <span>80元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<div class="item_content">\r\n					<span class="type">二不同</span>\r\n					<div class="prize">奖金 <span>8元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<div class="item_content">\r\n					<span class="type">三同号</span>\r\n					<div class="prize">奖金 <span>240元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="5">\r\n				<div class="item_content">\r\n					<span class="type">三不同</span>\r\n					<div class="prize">奖金 <span>40元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="6">\r\n				<div class="item_content">\r\n					<span class="type">三连号</span>\r\n					<div class="prize">奖金 <span>10元</span></div>\r\n				</div>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="ui-flex k3_top">\r\n		<div class="ui-flex_item draw_msg">\r\n			<div class="txtl">\r\n				<span class="color9 mb10"><b id="lastIssue"></b>期开奖</span>\r\n				<span class="result" id="result">\r\n					<!--<i class=""></i>\r\n					<i class=""></i>\r\n					<i class=""></i>-->\r\n				</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			<div class="txtr">\r\n				<span class="color9 mb10">距<b id="issue"></b>期截止</span>\r\n				<span class="time" id="time"></span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="prize">0 元</span></div>\r\n				<div class="bonus" id="unit">注数：0 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="ensureBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function HZ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,hzNum=$data.hzNum,award=$data.award,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6">玩法：至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖，最高可中<span class="size12 color_red">240</span>元</p>\r\n	<ul class="tabBar clearfix" id="tabBar">\n		<li class="tab_item fl" tab="1" data-value = "big">\r\n			<span class="size13">大</span>\r\n			<span class="size10 color9">11－18</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="2" data-value = "small">\r\n			<span class="size13">小</span>\r\n			<span class="size10 color9">３－10</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="3" data-value = "odd">\r\n			<span class="size13">单</span>\r\n			<span class="size10 color9">所有奇数</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="4" data-value = "even">\r\n			<span class="size13">双</span>\r\n			<span class="size10 color9">所有偶数</span>\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = hzNum.length; i < length; i++) {
					var award = hzNum[i].award;
					var num = hzNum[i].num;
			
$out+='\r\n			<li class="num_item_4" data-value = "';
$out+=$escape(num);
$out+='">\r\n				<div class="num_cont">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n					<div class="award">';
$out+=$escape(award);
$out+='元</div>\r\n				</div>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function STH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖，单注奖金<span class="size12 color_red">240</span>元。</p>\r\n	<p class="size12 color6 tips" style="display: none;">玩法：对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">40</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active" tab="1">\r\n			单选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			通选\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">111</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">222</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">333</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">444</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">555</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">666</span>\r\n			</li>\r\n		</ul>\r\n		<ul class="num_wrap clearfix" style="display: none;">\r\n			<li class="num_item_1">\r\n				<span class="num">三同号通选</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选3个或多个号码，所选号码与开奖号码3个号码相同，即中奖<span class="size12 color_red">40</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SLH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：对所有三个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">10</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_1">\r\n				<span class="num">三连号通选</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ETH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：选择1对相同号码和1个不同号码投注，选号与奖号相同（不限顺序）即中奖,单注奖金<span class="size12 color_red">80</span>元。</p>\r\n	<p class="size12 color6 tips" style="display: none;">玩法：从11~66中任选1个或多个号码，选号与奖号（包含11~66，不限顺序）相同即中奖,单注奖金<span class="size12 color_red">15</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active" tab="1">\r\n			单选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			复选\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_th"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="EDXTH">\r\n				<li class="num_item_3" data-value = "1">\r\n					<span class="twoNum">11</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "2">\r\n					<span class="twoNum">22</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "3">\r\n					<span class="twoNum">33</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "4">\r\n					<span class="twoNum">44</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "5">\r\n					<span class="twoNum">55</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "6">\r\n					<span class="twoNum">66</span>\r\n				</li>\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_bth"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="EDXBTH">\r\n				<li class="num_item_3" data-value = "1">\r\n					<span class="twoNum">1</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "2">\r\n					<span class="twoNum">2</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "3">\r\n					<span class="twoNum">3</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "4">\r\n					<span class="twoNum">4</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "5">\r\n					<span class="twoNum">5</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "6">\r\n					<span class="twoNum">6</span>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n		<div class="tabBox" style="display: none;">\r\n			<ul class="num_wrap clearfix" id="numWrap">\r\n				<li class="num_item_3">\r\n					<span class="num">11*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">22*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">33*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">44*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">55*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">66*</span>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function EBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选两个或多个号码，所选号码与开奖号码任意两个号码相同即中奖,单注奖金<span class="size12 color_red">8</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function k3Bet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="k3_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="k3List">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="prize">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function k3List($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,recommend=$data.recommend,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var recommend = selectContent[i].recommend;
		compare = recommend.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(compare);
$out+='">\r\n		<div class="num_wrap ui-flex">\r\n			<span class="play_type">\r\n				[';
$out+=$escape(title);
$out+=']\r\n			</span> \r\n			<span class="sel_num ui-flex_item">\r\n				';
 
					for (var j = 0; j < recommend.length; j++) {
						var num = recommend[j];
				
$out+='\r\n					<em>';
$out+=$escape(num);
$out+='</em>\r\n				';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n		<a class="del_btn">\r\n			<span class="del"></span>\r\n		</a>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/jxzpComboList',function(require,exports){var templateUtils = (function (){
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
define('view/jxzpList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.jxzpList=jxzpList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content-top mb10">\r\n		<div class="apple-tab" id="tabBox" style="width:180px">\r\n			<span class="win winl" type="1">胜平负</span>\r\n			<span class="win" type="2">输赢盘</span>\r\n			<span class="win winr" type="3">大小球</span>\r\n		</div>\r\n	</div>\r\n	<ul class="wonbox" id="jxzpList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function jxzpList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,jxzp=$data.jxzp,type=$data.type,typeMap=$data.typeMap,teamName=$data.teamName,league=$data.league,home=$data.home,away=$data.away,result=$data.result,concede=$data.concede,matchBeginTime=$data.matchBeginTime,bettypeOdds=$data.bettypeOdds,recommend=$data.recommend,recommendMap=$data.recommendMap,j=$data.j,len=$data.len,bettypeResult=$data.bettypeResult,temp=$data.temp,d=$data.d,month=$data.month,day=$data.day,time=$data.time,status=$data.status,statusMap=$data.statusMap,recentContinue=$data.recentContinue,historyContinue=$data.historyContinue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var jxzp = list[i] || {};
	var type = jxzp.type;
	var typeMap = {'1': '胜平负', '2': '输赢盘', '3': '大小球'};
	var teamName = jxzp.teamName;
	var league = jxzp.league;
	var home = jxzp.home;
	var away = jxzp.away;
	var result = jxzp.result;
	var concede = jxzp.concede;
	var matchBeginTime = jxzp.matchBeginTime || "";
	var bettypeOdds = jxzp.bettypeOdds || {};
	var recommend = jxzp.recommend || [];
	var recommendMap = {};
	for (var j = 0, len = recommend.length; j < len; j++) {
		recommendMap[recommend[j]] = true;
	}
	var bettypeResult = jxzp.bettypeResult || {};
	var temp = matchBeginTime.match(/\d{4}-(\d{2})-(\d{2}) (\d{2}:\d{2}):\d{2}/);
	var month = "";
	var day = "";
	var time = "";
	if (temp && temp.length == 4) {
		month = temp[1];
		day = temp[2];
		time = temp[3];
	}
	var status = jxzp.status;
	var statusMap = {'1': {'1': '连胜', '2': '连平', '3': '连负'}, '2': {'1': '连赢盘', '2': '连输盘'}, '3': {'1': '大球', '2': '小球'}};
	var recentContinue = +jxzp.recentContinue;
	var historyContinue = +jxzp.historyContinue;

$out+='\r\n<li class="jx-box">\r\n	<div class="jx-box-top">\r\n		<div class="top-title">\r\n			<span class="ellipsis">';
$out+=$escape(teamName);
$out+='</span>\r\n		</div>\r\n		';
 if (recentContinue > historyContinue) { 
$out+='\r\n		<div class="hisImg">\r\n			<img src="';
$out+=$escape(IMG_PATH);
$out+='history.png" alt="">\r\n		</div>\r\n		';
 } 
$out+='\r\n		<div class="winOver">\r\n			<div class="fang">\r\n				<span class="winTitle">近期';
$out+=$escape(statusMap[type][status]);
$out+='</span>\r\n			</div>\r\n			<div class="winNum">\r\n				';
$out+=$escape(recentContinue);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="historyTop">\r\n			<div class="fang">\r\n				<span>历史最高</span>\r\n			</div>\r\n			<div class="historyNum">\r\n				';
$out+=$escape(historyContinue);
$out+='\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="jx-box-center clearfix:after clearfix">\r\n		追盘推荐：\r\n	</div>\r\n	<div class="jx-box-bottom">\r\n		<div class="left">\r\n			<span>';
$out+=$escape(league);
$out+='</span>\r\n			<span class="color3">';
$out+=$escape(time);
$out+='</span>\r\n			<span>';
$out+=$escape(month);
$out+='/';
$out+=$escape(day);
$out+='</span>\r\n		</div>\r\n		';
 if (type == 1 || type == 2) { 
$out+='\r\n		<div class="right">\r\n			<div class="right-son ';
$out+=$escape(recommendMap['S']?'active':'');
$out+=' ';
$out+=$escape(bettypeResult['S']?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(home);
$out+='</span>\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						主胜';
$out+=$escape(bettypeOdds['S']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="right-son ';
$out+=$escape(recommendMap['P']?'active':'');
$out+='  ';
$out+=$escape(bettypeResult['P']?'active_img':'');
$out+='">\r\n				';
 if (result) { 
$out+='\r\n					<span class="color_red">';
$out+=$escape(result);
$out+='</span>\r\n				';
 } else { 
$out+='\r\n					<span class="colorb1">VS</span>\r\n				';
 } 
$out+='\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						平局';
$out+=$escape(bettypeOdds['P']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="right-son ';
$out+=$escape(recommendMap['F']?'active':'');
$out+='  ';
$out+=$escape(bettypeResult['F']?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(away);
$out+='</span>\r\n				<div class="right-son-box">\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						客胜';
$out+=$escape(bettypeOdds['F']);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="parcircle">\r\n			<span>';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</span>\r\n		</div>\r\n		';
 } else { 
$out+='\r\n		<div class="right">\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[0]]?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(home);
$out+='</span>\r\n				<div class="right-son-box">\r\n					';
 if (recommend[0]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[0]+'球 '+bettypeOdds[recommend[0]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[1]]?'active_img':'');
$out+='">\r\n				';
 if (result) { 
$out+='\r\n					<span class="color_red">';
$out+=$escape(result);
$out+='</span>\r\n				';
 } else { 
$out+='\r\n					<span class="colorb1">VS</span>\r\n				';
 } 
$out+='\r\n				<div class="right-son-box">\r\n					';
 if (recommend[1]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[1]+'球 '+bettypeOdds[recommend[1]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n			<div class="right-son active ';
$out+=$escape(bettypeResult[recommend[2]]?'active_img':'');
$out+='">\r\n				<span>';
$out+=$escape(away);
$out+='</span>\r\n				<div class="right-son-box">\r\n					';
 if (recommend[2]) { 
$out+='\r\n					<div class="right-son-son">\r\n						<div class="right-son-son-img"></div>\r\n						';
$out+=$escape(recommend[2]+'球 '+bettypeOdds[recommend[2]]);
$out+='\r\n					</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			</div>\r\n		</div>	\r\n		';
 } 
$out+='\r\n	</div>\r\n</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/k3',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.HZ=HZ;exports.STH=STH;exports.SBT=SBT;exports.SLH=SLH;exports.ETH=ETH;exports.EBT=EBT;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav_wrap">\n		<ul class="nav clearfix" id="typeList">\n			<li class="item" type="1">\n				<span>和值</span>\n			</li>\n			\n			<li class="item" type="2">\n				<span>三同号</span>\n			</li>\n			\n			<li class="item" type="3">\n				<span>三不同</span>\n			</li>\n			\n			<li class="item" type="4">\n				<span>三连号</span>\n			</li>\n			\n			<li class="item" type="5">\n				<span>二同号</span>\n			</li>\n			\n			<li class="item" type="6">\n				<span>二不同</span>\n			</li>\n		</ul>\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<div class="count_down">\r\n			<p class="txt">距0405033期截止</p>\r\n			<div class="time">\r\n				00 : 20\r\n			</div>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="prize">0 元</span></div>\r\n				<div class="bonus" id="unit">注数：0 注</div>\r\n			</div>\r\n			<div class="pay_btn fr">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function HZ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,hzNum=$data.hzNum,award=$data.award,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6">玩法：至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖，最高可中<span class="size12 color_red">240</span>元</p>\r\n	<ul class="tabBar clearfix" id="tabBar">\r\n		<li class="tab_item fl" tab="1">\r\n			<span class="size13">大</span>\r\n			<span class="size10 color9">11－18</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="2">\r\n			<span class="size13">小</span>\r\n			<span class="size10 color9">３－10</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="3">\r\n			<span class="size13">单</span>\r\n			<span class="size10 color9">所有奇数</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="4">\r\n			<span class="size13">双</span>\r\n			<span class="size10 color9">所有偶数</span>\r\n		</li>\r\n	</ul>\r\n	<div class="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = hzNum.length; i < length; i++) {
					var award = hzNum[i].award;
					var num = hzNum[i].num;
			
$out+='\r\n			<li class="num_item_4">\r\n				<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				<div class="award">';
$out+=$escape(award);
$out+='元</div>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function STH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖，单注奖金<span class="size12 color_red">240</span>元。</p>\n	<p class="size12 color6 tips" style="display: none;">玩法：对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">40</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active" tab="1">\r\n			单选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			通选\r\n		</li>\r\n	</ul>\r\n	<div class="numbox" id="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">111</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">222</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">333</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">444</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">555</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">666</span>\r\n			</li>\r\n		</ul>\n		<ul class="num_wrap clearfix" id="numWrap" style="display: none;">\n			<li class="num_item_1">\n				<span class="num">三同号通选</span>\n			</li>\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选3个或多个号码，所选号码与开奖号码3个号码相同，即中奖<span class="size12 color_red">40</span>元。</p>\r\n	<div class="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SLH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：对所有三个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">10</span>元。</p>\r\n	<div class="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_1">\r\n				<span class="num">三连号通选</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ETH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：从11~66中任选1个或多个号码，选号与奖号（包含11~66，不限顺序）相同，即中奖<span class="size12 color_red">15</span>元。</p>\n	<p class="size12 color6 tips" style="display: none;">玩法：选择1对相同号码和1个不同号码投注，选号与奖号相同（顺序不限），即中奖<span class="size12 color_red">80</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active">\r\n			复选\r\n		</li>\r\n		<li class="ui-flex_item">\r\n			单选\r\n		</li>\r\n	</ul>\r\n	<div class="numbox" id="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">11*</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">22*</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">33*</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">44*</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">55*</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">66*</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function EBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选两个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<span class="size12 color_red">8</span>元。</p>\r\n	<div class="numbox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/login',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="logo pt40">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='login_logo.png"/>\r\n		</div>\r\n		<form class="pt40" action="">\r\n			<div class="input_wrap pl50 pr50">\r\n				<div class="phone_num clearfix pb5">\r\n					<i class="icon_phone fl img16"></i>\r\n					<input class="fl number" type="number" placeholder="手机号" maxlength="11" id="mobile"/>\r\n					<a class="get_code fr" id="smsCodeBtn"><span class="ver_line"></span>获取验证码</a>\r\n				</div>\r\n				<div class="venidate_wrap mt35 pb5">\r\n					<i class="icon_code img16"></i>\r\n					<input class="venidate_code" type="number" placeholder="输入验证码" maxlength="6" id="smsCode"/>\r\n				</div>\r\n			</div>\r\n		</form>\r\n		<div class="pl50 pr50 pt35">\r\n			<div class="login_btn" id="loginSubmit">\r\n				登录\r\n			</div>\r\n			<div class="wechat_btn mt30" style="display:none" id="wxLoginSubmit">\r\n				<i class="icon_wechat"></i>\r\n				微信登录\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/lotteryHall',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,lotteryIdMap=$data.lotteryIdMap,i=$data.i,list=$data.list,lotteryId=$data.lotteryId,lotteryName=$data.lotteryName,remark=$data.remark,tag=$data.tag,logoMap=$data.logoMap,tagMap=$data.tagMap,sale=$data.sale,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,Object=$data.Object,$out='';$out+='<section>\r\n		<div class="ui-flex lottery_item_wrap" id="lotteryList">\r\n			';

				var lotteryIdMap = {'JCZQ': true,'JCLQ': true,'SSQ': true,'JSK3': true,'DLT': true,'GX11X5': true,'FC3D': true,'JZYP': true,'SJBCGJ': true,'XYDZP': true,'ZXKJ': true};
				for (var i = 0; i < list.length; i++) {
					var lotteryId = list[i].lotteryId;
					var lotteryName = list[i].lotteryName;
					var remark = list[i].remark;
					var tag = list[i].tag;
					var logoMap = {'SSQ':'icon_ssq','JCZQ':'icon_jczq','JCLQ':'icon_jclq','JSK3':'icon_jsk3','DLT':'icon_dlt','GX11X5':'icon_gx11x5','FC3D':'icon_fc3d','JZYP':'icon_jzyp','SJBCGJ':'icon_sjbcgj','XYDZP':'icon_xydzp','ZXKJ':'icon_recentAwards'};
					var tagMap = {'加奖': 'icon_wrap_jj','今日开奖': 'icon_wrap_kj'};
					var sale = list[i].sale;
			
$out+='\r\n				';
 if (lotteryIdMap[lotteryId] && sale) { 
$out+='\r\n					<div class="flex_item" lotteryId=\'';
$out+=$escape(lotteryId);
$out+='\'>\r\n						<div class="ui-flex borderr lottery_item">\r\n							<img class="lotteryHall_icon" src="';
$out+=$escape(IMG_PATH);
$out+=$escape(logoMap[lotteryId]);
$out+='.png" />\r\n							<div class="ml10">\r\n								<span class="size14 color3">';
$out+=$escape(lotteryName);
$out+='</span><br />\r\n								<span class="size11 color6 mt5">';
$out+=$escape(remark);
$out+='</span>\r\n							</div>\r\n							<span class="';
$out+=$escape(tagMap[tag]);
$out+='"></span>\r\n						</div>\r\n					</div>\r\n				';
 } 
$out+='	\r\n			';
 } 
$out+='\r\n			';
 if (list.length % 2 != 0 && Object.keys(lotteryIdMap).length % 2 != 0) { 
$out+='\r\n			<div class="flex_item">\r\n				<div class="ui-flex lottery_item">\r\n					<i class="lotteryHall_icon icon_jqqd"></i>\r\n					<div class="ml10">\r\n						<span class="size14 color3">敬请期待</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/lotteryRules',function(require,exports){var templateUtils = (function (){
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
})();exports.k3Rules=k3Rules;exports.gx11x5Rules=gx11x5Rules;function k3Rules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<dl>\n		<dt>玩法规则</dt>\n		<dd>每期开出3个数字作为开奖号码，每个数字的取值范围为1~6（相当于摇出3个骰子）</dd>\n		<dt>销售时间</dt>\n		<dd>08:30-22:10，10分钟一期，每天82期</dd>\n		<dt>奖项设置</dt>\n		<dd>\n			<table>\n				<tr>\n					<th width="90">玩法</th>\n					<th width="165">中奖条件</th>\n					<th width="90">奖金</th>\n				</tr>\n				<tr>\n					<td>和值</td>\n					<td>猜中开奖号相加的和</td>\n					<td>9~240元</td>\n				</tr>\n				<tr>\n					<td>三同号单选</td>\n					<td>猜中111、222、333、444、555、666中指定一个</td>\n					<td>240元</td>\n				</tr>\n				<tr>\n					<td>三同号通选</td>\n					<td>111、222、333、444、555、666中任意一个</td>\n					<td>40元</td>\n				</tr>\n				<tr>\n					<td>二同号单选</td>\n					<td>猜中3个号（有2个号相同）</td>\n					<td>80元</td>\n				</tr>\n				<tr>\n					<td>二同号复选</td>\n					<td>猜中开奖中相同的2个号</td>\n					<td>15元</td>\n				</tr>\n				<tr>\n					<td>二不同号</td>\n					<td>猜中开奖中不相同的2个号</td>\n					<td>8元</td>\n				</tr>\n				<tr>\n					<td>三不同号</td>\n					<td>猜中3个号（各不相同）</td>\n					<td>40元</td>\n				</tr>\n				<tr>\n					<td>三连号通选</td>\n					<td>123、234、345、456任意一个开出</td>\n					<td>10元</td>\n				</tr>\n			</table>\n		</dd>\n		<dt>如何领奖</dt>\n		<dd>奖金将直接打入您的账户</dd>\n	</dl>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Rules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<dl>\n		<dt>玩法规则</dt>\n		<dd>每期从01-11 开出5个号码作为中奖号码</dd>\n		<dt>销售时间</dt>\n		<dd>09:00-23:50，10分钟一期，每天90期</dd>\n		<dt>奖项设置</dt>\n		<dd>\n			<table>\n				<tr>\n					<th width="90">玩法</th>\n					<th width="165">中奖条件</th>\n					<th width="90">奖金</th>\n				</tr>\n				<tr>\n					<td>任选二</td>\n					<td>选2个号,彩种开奖号码的任意2号</td>\n					<td>6元</td>\n				</tr>\n				<tr>\n					<td>任选三</td>\n					<td>选3个号,彩种开奖号码的任意3号</td>\n					<td>19元</td>\n				</tr>\n				<tr>\n					<td>任选四</td>\n					<td>选4个号,彩种开奖号码的任意4号</td>\n					<td>78元</td>\n				</tr>\n				<tr>\n					<td>任选五</td>\n					<td>选5个号,彩种开奖号码的任意5号</td>\n					<td>540元</td>\n				</tr>\n				<tr>\n					<td>任选六</td>\n					<td>选6个号,彩种开奖号码的任意5号</td>\n					<td>90元</td>\n				</tr>\n				<tr>\n					<td>任选七</td>\n					<td>选7个号,彩种开奖号码的任意5号</td>\n					<td>26元</td>\n				</tr>\n				<tr>\n					<td>前一</td>\n					<td>选1个号,彩种开奖的第1个号</td>\n					<td>13元</td>\n				</tr>\n				<tr>\n					<td>前二直选</td>\n					<td>选2个号与开奖的前2个号相同且顺序一致</td>\n					<td>130元</td>\n				</tr>\n				<tr>\n					<td>前二组选</td>\n					<td>选2个号与开奖的前2个号相同</td>\n					<td>130元</td>\n				</tr>\n				<tr>\n					<td>前三直选</td>\n					<td>选3个号与开奖的前3个号相同且顺序一致</td>\n					<td>1170元</td>\n				</tr>\n				<tr>\n					<td>前三组选</td>\n					<td>选3个号与开奖的前3个号相同</td>\n					<td>195元</td>\n				</tr>\n			</table>\n		</dd>\n		<dt>如何领奖</dt>\n		<dd>奖金将直接打入您的账户</dd>\n	</dl>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/main',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.hongBao=hongBao;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,className=$data.className,showHeader=$data.showHeader,isScrollHeader=$data.isScrollHeader,isSimpleHeader=$data.isSimpleHeader,title=$data.title,isUserVerifyHeader=$data.isUserVerifyHeader,isWithdrawHeader=$data.isWithdrawHeader,isMatchHeader=$data.isMatchHeader,rightButtonText=$data.rightButtonText,isFocusHeader=$data.isFocusHeader,isUserRankHeader=$data.isUserRankHeader,isHotMatchHeader=$data.isHotMatchHeader,isRechargeHeader=$data.isRechargeHeader,isTurnplateHeader=$data.isTurnplateHeader,isSupplierHeader=$data.isSupplierHeader,isOrderTicketListHeader=$data.isOrderTicketListHeader,isLeftIconHeader=$data.isLeftIconHeader,isFinanceHeader=$data.isFinanceHeader,isSsqHbHeader=$data.isSsqHbHeader,isApp=$data.isApp,IMG_PATH=$data.IMG_PATH,isDigitalHeader=$data.isDigitalHeader,isRecommendHeader=$data.isRecommendHeader,isFootballHeader=$data.isFootballHeader,showFooter=$data.showFooter,isWeixinBrowser=$data.isWeixinBrowser,$out='';$out+='<div class="container ';
$out+=$escape(className);
$out+='" id="pageContainer">\r\n    <div class="header ';
$out+=$escape(showHeader?'':'hide');
$out+='" id="pageHeader" style="';
$out+=$escape(isScrollHeader?'z-index:12;height:0;display:none':'');
$out+='">\r\n    	';
 if (isSimpleHeader) { 
$out+='\r\n    	<div class="header_bar">\r\n			';
$out+=$escape(title);
$out+='\r\n		</div>\r\n		';
 } else if (isUserVerifyHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header"></span>\r\n            <div class="header_tab clearfix" id="userVerifyTab">\r\n                <span class="" type="1">申请专家</span>\r\n                <span class="" type="2">申请店长</span>\r\n            </div>\r\n        </div>\r\n        ';
 } else if (isWithdrawHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="withdrawTab" style="display: none;">\r\n				<span class="" financeType="0">米粒</span>\r\n				<span class="" financeType="1">彩金</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">提款记录</span>\r\n		</div>\r\n		';
 } else if (isMatchHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="matchTab">\r\n				<span class="" type="1">足 球</span>\r\n				<span class="" type="2">篮 球</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isFocusHeader) { 
$out+='\r\n	    <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="focusTab">\r\n				<span class="" type="1">我的关注</span>\r\n				<span class="" type="2">全部专家</span>\r\n			</div>\r\n		</div>\r\n		';
 } else if (isUserRankHeader) { 
$out+='\r\n	    <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="userRankTab">\r\n				<span class="" type="1">红人榜</span>\r\n				<span class="" type="2">胜率榜</span>\r\n				<span class="" type="3">盈利榜</span>\r\n			</div>\r\n		</div>\r\n		';
 } else if (isHotMatchHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<div class="header_tab clearfix" id="matchTab">\r\n				<span class="" type="1">足 球</span>\r\n				<span class="" type="2">篮 球</span>\r\n			</div>\r\n			<span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isRechargeHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="rechargeTab" style="display: none;">\r\n				<span class="" financeType="0">米粒</span>\r\n				<span class="" financeType="1">彩金</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isTurnplateHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar" style="background-color: #e8552d;">\r\n			<span class="arrow leftIcon_header" id="goBack"></span>\r\n			';
$out+=$escape(title);
$out+='\r\n		</div>\r\n		';
 } else if (isSupplierHeader) { 
$out+='\r\n		<div class="com_fixedbar header_bar">\r\n			';
$out+=$escape(title);
$out+='\r\n			 <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isOrderTicketListHeader) { 
$out+='\r\n			 <div class="com_fixedbar header_bar">\r\n			 	<span class="arrow leftIcon_header" id="goBack"></span>\r\n				';
$out+=$escape(title);
$out+='\r\n			</div>\r\n		';
 } else if (isLeftIconHeader) { 
$out+='\r\n			<div class="com_fixedbar header_bar">\r\n				<span class="arrow leftIcon_header"></span>\r\n				';
$out+=$escape(title);
$out+='\r\n			</div>\r\n		';
 } else if (isFinanceHeader) { 
$out+='	\r\n			<div class="com_fixedbar header_bar">\r\n				<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="financeTab">\r\n					<span class="" financeType="1">彩金</span>\r\n					<span class="" financeType="0">米粒</span>\r\n				</div>\r\n			</div>\r\n		';
 } else if (isSsqHbHeader) { 
$out+='	\r\n			<div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header" style=""></span>\r\n                <span class="rightIcon_top color14"></span>\r\n                ';
$out+=$escape(title);
$out+='\r\n                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n        	</div>\r\n        	';
 if (!isApp) { 
$out+='\r\n	        	<div class="ssqhb_banner" id="ssqhbDownload">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_banner.jpg"/>\r\n					<a class="del_btn" id="closeSsqHbBanner"><span class="del"></span></a>\r\n				</div>\r\n			';
 } 
$out+='\r\n		';
 } else if (isDigitalHeader) { 
$out+='\r\n			<div class="header_bar" style="text-align: left;">\r\n				<span class="arrow leftIcon_header"></span>\r\n				<div class="title_wrap" id="digitalTitleWrap">\r\n					<span class="title_type">玩<br />法</span>\r\n					<span class="title_txt" id="digitalTitleTxt"></span>\r\n					<i class="triangle_down"></i>\r\n				</div>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5" id="assistantBtn">\r\n				<i class="icon_assistant"></i>\r\n				助手\r\n			</span>\r\n			<div class="assistant_menu" id="assistantMenu" style="display: none;">\r\n				<dl id="assistantMenuContent">\r\n					<dd id="recentlyDraw">历史开奖</dd>\r\n					<dd id="digitalRule">玩法说明</dd>\r\n				</dl>\r\n			</div>\r\n		';
 } else if (isRecommendHeader) { 
$out+='\r\n	        <div class="com_fixedbar header_bar">\r\n	        	<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="recommendTab">\r\n					<span class="" tab="1">推荐</span>\r\n					<span class="" tab="2">复盘</span>\r\n				</div>\r\n				';
 if (rightButtonText) { 
$out+='\r\n	                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n	            ';
 } else { 
$out+='\r\n	                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n	            ';
 } 
$out+='\r\n			</div>\r\n		';
 } else if (isFootballHeader) { 
$out+='\r\n	        <div class="com_fixedbar header_bar">\r\n	        	<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="footballTab">\r\n					<span class="" tab="1">混合过关</span>\r\n					<span class="" tab="2">胜平负单关</span>\r\n				</div>\r\n				';
 if (rightButtonText) { 
$out+='\r\n	                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n	            ';
 } else { 
$out+='\r\n	                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n	            ';
 } 
$out+='\r\n			</div>\r\n        ';
 } else { 
$out+='\r\n        	<div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header" style="';
$out+=$escape(showFooter? 'display: none':'');
$out+='"></span>\r\n            ';
$out+=$escape(title);
$out+='\r\n            ';
 if (rightButtonText) { 
$out+='\r\n                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n            ';
 } else { 
$out+='\r\n                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n            ';
 } 
$out+='\r\n        	</div>\r\n        ';
 } 
$out+='\r\n    </div>\r\n    <div class="content" id="pageContent" style="';
$out+=$escape(showFooter?'bottom: 48px;':'');
$out+=$escape(showHeader?'top: 48px;':'');
$out+='"></div>\r\n    <div class="footer ';
$out+=$escape(showFooter?'':'hide');
$out+='" id="pageFooter">\r\n		<ul class="footer_bar ui-flex">\r\n			<li class="ui-flex_item">\r\n				<a class="active" href="#home">\r\n					<i class="icon_foot icon01"></i>\r\n				</a>\r\n			</li>\r\n			<li class="ui-flex_item">\r\n				<a href="#hotMatch">\r\n					<i class="icon_foot icon02"></i>\r\n				</a>\r\n			</li>\r\n			<!--<li class="ui-flex_item">\r\n				<a href="#ticketFollow">\r\n					<i class="icon_foot icon06"></i>\r\n				</a>\r\n			</li>-->\r\n			';
 if (isWeixinBrowser) { 
$out+='\r\n				<li class="ui-flex_item">\r\n					<a href="#focusList">\r\n						<i class="icon_foot icon05"></i>\r\n					</a>\r\n				</li>\r\n			';
 } else { 
$out+='\r\n				<!-- <li class="ui-flex_item">\r\n					<a href="#lotteryHall">\r\n						<i class="icon_foot icon08"></i>\r\n					</a>\r\n				</li> -->\r\n			';
 } 
$out+='\r\n			<!--<li class="fl">\r\n				<a href="#userList">\r\n					<i class="icon_foot icon03"></i>\r\n				</a>\r\n			</li>-->\r\n			<li class="ui-flex_item">\r\n				<a href="#my">\r\n					<i class="icon_foot icon04"></i>\r\n				</a>\r\n			</li>\r\n			<!-- <li class="ui-flex_item">\r\n				<a href="#download">\r\n					<i class="icon07"></i>\r\n				</a>\r\n			</li> -->\r\n		</ul>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function hongBao($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="red_packet">\r\n    <a class="close_btn"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='close.png"/></a>           \r\n    <a class="open"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='open.png" alt="打开" /></a>\r\n    <a class="bonus_a">100万元红包，先到先得></a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/match',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.football=football;exports.basketball=basketball;exports.JZYP=JZYP;exports.SPFDG=SPFDG;exports.leagueList=leagueList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<input type="hidden" id="selectLeague">\r\n	<div class="mask" id="matchFilter" style="display: none;top: 48px;">\r\n		<div class="hot_mask">\r\n			<div class="hot_maskTop" id="matchFilterTab">\r\n				<span class="borderr1" id="checkedAll">全选</span>\r\n				<span class="borderr1" id="inverse">反选</span>\r\n				<span id="ensure">确定</span>\r\n			</div>\r\n			<div class="hot_markContent" id="leagueList"></div>\r\n		</div>\r\n	</div>\r\n	<div id="matchList"></div>\r\n	<div class="buy_list" style="display: none;" id="buyList">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb5">已选<span class="selectNum" id="selectNum"></span>场</div>\r\n				<div class="colorc5">非单关玩法至少选2场比赛</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="createTicketSubmit">\r\n				确认\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,spf=$data.spf,rqspf=$data.rqspf,spfBettypeOdds=$data.spfBettypeOdds,rqspfBettypeOdds=$data.rqspfBettypeOdds,number=$data.number,single=$data.single,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var spf = match['bettype']['SPF'] || {};
		var rqspf = match['bettype']['RQSPF'] || {};
		var spfBettypeOdds = spf.bettypeOdds || {};
		var rqspfBettypeOdds = rqspf.bettypeOdds || {};
		var number = match.number;
		var single = (!!spf.single) || (!!rqspf.single);
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(spf.oddsId);
$out+='">\r\n						<td recommend="S">胜<span>';
$out+=$escape(spfBettypeOdds.S);
$out+='</span><span class="numcircle">0</span></td>\r\n						<td recommend="P">平<span>';
$out+=$escape(spfBettypeOdds.P);
$out+='</span></td>\r\n						<td recommend="F">负<span>';
$out+=$escape(spfBettypeOdds.F);
$out+='</span></td>\r\n						<td class="more_game" rowspan="2" id="moreBettype';
$out+=$escape(match.matchId);
$out+='">更多玩法<b></b></td>\r\n					</tr>\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(rqspf.oddsId);
$out+='">\r\n						<td recommend="S">胜<span>';
$out+=$escape(rqspfBettypeOdds.S);
$out+='</span><span class="numcircle numcircle1">';
$out+=$escape(rqspf.concede > 0 ? '+'+rqspf.concede : rqspf.concede);
$out+='</span></td>\r\n						<td recommend="P">平<span>';
$out+=$escape(rqspfBettypeOdds.P);
$out+='</span></td>\r\n						<td recommend="F">负<span>';
$out+=$escape(rqspfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function basketball($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,rfsf=$data.rfsf,dxf=$data.dxf,rfsfBettypeOdds=$data.rfsfBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,number=$data.number,single=$data.single,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,$string=$helpers.$string,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var rfsf = match['bettype']['RFSF'] || {};
		var dxf = match['bettype']['DXF'] || {};
		var rfsfBettypeOdds = rfsf.bettypeOdds || {};
		var dxfBettypeOdds = dxf.bettypeOdds || {};
		var number = match.number;
		var single = (!!rfsf.single) || (!!dxf.single);
		var Hconcede;
		var Aconcede;
		if (rfsf.concede > 0) {
			Hconcede = '+' + (rfsf.concede);
			Aconcede = -rfsf.concede;
		} else {
			Hconcede = rfsf.concede;
			Aconcede = '+' + (-rfsf.concede)
		}
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name" style="color: #003cff;">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml10">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='<span>(主)</span></span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n						<td recommend="F">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(rfsfBettypeOdds.F);
$out+='</span></td>\r\n						<!--<td class="';
$out+=$escape(rfsf.concede > 0 ? "active_red" : "active_green");
$out+='">主<span>';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='<span></td>-->\r\n						<td recommend="S">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml10 size10">';
$out+=$escape(rfsfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="more_game" rowspan="2" id="moreBettype';
$out+=$escape(match.matchId);
$out+='">更多玩法<b></b></td>\r\n					</tr>\r\n					<tr class="matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n						<td recommend="D">大于';
$out+=$escape(dxf.concede);
$out+='<span class="ml15 size13">';
$out+=$escape(dxfBettypeOdds.D);
$out+='</span></td>\r\n<!--						<td><span class="current color_red">';
$out+=$escape(dxf.concede);
$out+='</span></td>-->\r\n						<td recommend="X">小于';
$out+=$escape(dxf.concede);
$out+='<span class="ml15 size13">';
$out+=$escape(dxfBettypeOdds.X);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function JZYP($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,sf=$data.sf,sfBettypeOdds=$data.sfBettypeOdds,number=$data.number,single=$data.single,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
		var date = list[i].date || '';
		var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var sf = match['bettype']['SF'] || {};
		var sfBettypeOdds = sf.bettypeOdds || {};
		var number = match.number;
		var single = (!!sf.single);
		var Hconcede;
		var Aconcede;
		if (sf.concede > 0) {
			Hconcede = '+' + (sf.concede);
			Aconcede = -sf.concede;
		} else {
			Hconcede = sf.concede;
			Aconcede = '+' + (-sf.concede)
		}
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n					';
 if (single) { 
$out+='\r\n						<span class="match_icon bg_c_r">单关</span>\r\n					';
 } 
$out+='\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype yapan" oddsId="';
$out+=$escape(sf.oddsId);
$out+='" height="45">\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="S" width="113">胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(sfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="F" width="113">负';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size13">';
$out+=$escape(sfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function SPFDG($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,date=$data.date,matchList=$data.matchList,$escape=$helpers.$escape,j=$data.j,len=$data.len,match=$data.match,spf=$data.spf,spfBettypeOdds=$data.spfBettypeOdds,number=$data.number,$out='';	
	var length = list.length;
	if (length > 0) {
		for (var i = 0; i < length; i++) {
			var date = list[i].date || '';
			var matchList = list[i].matchList || [];

$out+='\r\n	<p class="matchDate newstime clearfix"><span class="fl">';
$out+=$escape(date);
$out+='</span><span class="arrow ';
$out+=$escape(i==0?'arrow_up':'arrow_down');
$out+='"></span></p>\r\n	<div class="matchContent" style="';
$out+=$escape(i==0?'':'display:none');
$out+='">\r\n	';
 
		for (var j = 0, len = matchList.length; j < len; j++) {
		var match = matchList[j]
		var spf = match['bettype']['SPF'] || {};
		var spfBettypeOdds = spf.bettypeOdds || {};
		var number = match.number;	
	
$out+='\r\n		<div class="match_data ui-flex">\r\n			<ul class="base_data">\r\n				<li class="league">\r\n					<span class="league_name">';
$out+=$escape(match.league);
$out+='</span>\r\n				</li>\r\n				<li class="mb5 color6 size12">';
$out+=$escape(number);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bDate);
$out+='</li>\r\n				<li>';
$out+=$escape(match.bTime);
$out+='</li>\r\n			</ul>\r\n			<div class="data_list ui-flex_item ml15">\r\n				<div class="ui-flex">\r\n					<span class="ui-flex_item">';
$out+=$escape(match.home);
$out+='</span>\r\n					VS\r\n					<span class="ui-flex_item">';
$out+=$escape(match.away);
$out+='</span>\r\n				</div>\r\n				<table class="match_table" matchId="';
$out+=$escape(match.matchId);
$out+='">\r\n					<tr class="matchBettype yapan" oddsId="';
$out+=$escape(spf.oddsId);
$out+='" height="45">\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="S" width="113">胜<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.S);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="P" width="113">平<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.P);
$out+='</span></td>\r\n						<td class="';
$out+=$escape(match.matchId);
$out+='v" recommend="F" width="113">负<span class="ml10 size13">';
$out+=$escape(spfBettypeOdds.F);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	</div>\r\n';
 } 
} else { 
$out+='\r\n	<p class="textC mt30">暂无赛事</p>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function leagueList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,item=$data.item,league=$data.league,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var item = list[i] || {};
	var league = item.league;

$out+='\r\n<span class="hot_markSon" style="overflow:hidden">';
$out+=$escape(league);
$out+='</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/matchMoreBettype',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.football=football;exports.basketball=basketball;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function football($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,bf=$data.bf,match=$data.match,zjq=$data.zjq,bqc=$data.bqc,bfBettypeOdds=$data.bfBettypeOdds,zjqBettypeOdds=$data.zjqBettypeOdds,bqcBettypeOdds=$data.bqcBettypeOdds,$escape=$helpers.$escape,$out='';$out+='<style type="text/css">\r\n	.moreGame .table_wrap{\r\n		padding: 0;\r\n	}\r\n</style>\r\n';
 
	var bf = match['bettype']['BF'] || {};
	var zjq = match['bettype']['ZJQ'] || {};
	var bqc = match['bettype']['BQC'] || {};
	var bfBettypeOdds = bf.bettypeOdds || {};
	var zjqBettypeOdds = zjq.bettypeOdds || {};
	var bqcBettypeOdds = bqc.bettypeOdds || {};

$out+='\r\n<div>\r\n	<div class="game_head clearfix mt5">\r\n		<span class="fl">总进球<span class="color9 ml10">猜90分钟内(含补时)比赛总进球数</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(zjq.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color70" rowspan="2">进球数</td>\r\n				<td recommend="0">0<br/><span>';
$out+=$escape(zjqBettypeOdds['0']);
$out+='</span></td>\r\n				<td recommend="1">1<br/><span>';
$out+=$escape(zjqBettypeOdds['1']);
$out+='</span></td>\r\n				<td recommend="2">2<br/><span>';
$out+=$escape(zjqBettypeOdds['2']);
$out+='</span></td>\r\n				<td recommend="3">3<br/><span>';
$out+=$escape(zjqBettypeOdds['3']);
$out+='</span></td>	\r\n			</tr>\r\n			<tr>\r\n				<td recommend="4">4<br/><span>';
$out+=$escape(zjqBettypeOdds['4']);
$out+='</span></td>\r\n				<td recommend="5">5<br/><span>';
$out+=$escape(zjqBettypeOdds['5']);
$out+='</span></td>\r\n				<td recommend="6">6<br/><span>';
$out+=$escape(zjqBettypeOdds['6']);
$out+='</span></td>\r\n				<td recommend="7+">7+<br/><span>';
$out+=$escape(zjqBettypeOdds['7+']);
$out+='</span></td>	\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>		\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">半全场<span class="color9 ml10">猜两队上半场和90分钟内(含补时)的赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bqc.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color60" rowspan="3">半全场</td>\r\n				<td recommend="SS">胜胜<br/><span>';
$out+=$escape(bqcBettypeOdds['SS']);
$out+='</span></td>\r\n				<td recommend="SP">胜平<br/><span>';
$out+=$escape(bqcBettypeOdds['SP']);
$out+='</span></td>\r\n				<td recommend="SF">胜负<br/><span>';
$out+=$escape(bqcBettypeOdds['SF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="PS">平胜<br/><span>';
$out+=$escape(bqcBettypeOdds['PS']);
$out+='</span></td>\r\n				<td recommend="PP">平平<br/><span>';
$out+=$escape(bqcBettypeOdds['PP']);
$out+='</span></td>\r\n				<td recommend="PF">平负<br/><span>';
$out+=$escape(bqcBettypeOdds['PF']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="FS">负胜<br/><span>';
$out+=$escape(bqcBettypeOdds['FS']);
$out+='</span></td>\r\n				<td recommend="FP">负平<br/><span>';
$out+=$escape(bqcBettypeOdds['FP']);
$out+='</span></td>\r\n				<td recommend="FF">负负<br/><span>';
$out+=$escape(bqcBettypeOdds['FF']);
$out+='</span></td>	\r\n			</tr> \r\n		</table>	\r\n	</div>\r\n</div>			\r\n<div>\r\n	<div class="game_head clearfix">\r\n		<span class="fl">比分<span class="color9 ml10">猜90分钟内(含补时)比分赛果</span></span>\r\n	</div>\r\n	<div class="table_wrap">\r\n		<table class="game_table matchBettype" oddsId="';
$out+=$escape(bf.oddsId);
$out+='">\r\n			<tr>\r\n				<td class="game_title color60" rowspan="3">胜</td>\r\n				<td recommend="1:0">1:0<br/><span>';
$out+=$escape(bfBettypeOdds['1:0']);
$out+='</span></td>\r\n				<td recommend="2:0">2:0<br/><span>';
$out+=$escape(bfBettypeOdds['2:0']);
$out+='</span></td>\r\n				<td recommend="2:1">2:1<br/><span>';
$out+=$escape(bfBettypeOdds['2:1']);
$out+='</span></td>\r\n				<td recommend="3:0">3:0<br/><span>';
$out+=$escape(bfBettypeOdds['3:0']);
$out+='</span></td>\r\n				<td recommend="3:1">3:1<br/><span>';
$out+=$escape(bfBettypeOdds['3:1']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="3:2">3:2<br/><span>';
$out+=$escape(bfBettypeOdds['3:2']);
$out+='</span></td>\r\n				<td recommend="4:0">4:0<br/><span>';
$out+=$escape(bfBettypeOdds['4:0']);
$out+='</span></td>\r\n				<td recommend="4:1">4:1<br/><span>';
$out+=$escape(bfBettypeOdds['4:1']);
$out+='</span></td>\r\n				<td recommend="4:2">4:2<br/><span>';
$out+=$escape(bfBettypeOdds['4:2']);
$out+='</span></td>\r\n				<td recommend="5:0">5:0<br/><span>';
$out+=$escape(bfBettypeOdds['5:0']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="5:1">5:1<br/><span>';
$out+=$escape(bfBettypeOdds['5:1']);
$out+='</span></td>\r\n				<td recommend="5:2">5:2<br/><span>';
$out+=$escape(bfBettypeOdds['5:2']);
$out+='</span></td>\r\n				<td recommend="SQT">胜其他<br/><span>';
$out+=$escape(bfBettypeOdds['SQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n			<tr>\r\n				<td class="game_title color70">平</td>\r\n				<td recommend="0:0">0:0<br/><span>';
$out+=$escape(bfBettypeOdds['0:0']);
$out+='</span></td>\r\n				<td recommend="1:1">1:1<br/><span>';
$out+=$escape(bfBettypeOdds['1:1']);
$out+='</span></td>\r\n				<td recommend="2:2">2:2<br/><span>';
$out+=$escape(bfBettypeOdds['2:2']);
$out+='</span></td>\r\n				<td recommend="3:3">3:3<br/><span>';
$out+=$escape(bfBettypeOdds['3:3']);
$out+='</span></td>\r\n				<td recommend="PQT">平其他<br/><span>';
$out+=$escape(bfBettypeOdds['PQT']);
$out+='</span></td>\r\n			</tr>\r\n            <tr>\r\n				<td class="game_title color60" rowspan="3">负</td>\r\n				<td recommend="0:1">0:1<br/><span>';
$out+=$escape(bfBettypeOdds['0:1']);
$out+='</span></td>\r\n				<td recommend="0:2">0:2<br/><span>';
$out+=$escape(bfBettypeOdds['0:2']);
$out+='</span></td>\r\n				<td recommend="1:2">1:2<br/><span>';
$out+=$escape(bfBettypeOdds['1:2']);
$out+='</span></td>\r\n				<td recommend="0:3">0:3<br/><span>';
$out+=$escape(bfBettypeOdds['0:3']);
$out+='</span></td>\r\n				<td recommend="1:3">1:3<br/><span>';
$out+=$escape(bfBettypeOdds['1:3']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="2:3">2:3<br/><span>';
$out+=$escape(bfBettypeOdds['2:3']);
$out+='</span></td>\r\n				<td recommend="0:4">0:4<br/><span>';
$out+=$escape(bfBettypeOdds['0:4']);
$out+='</span></td>\r\n				<td recommend="1:4">1:4<br/><span>';
$out+=$escape(bfBettypeOdds['1:4']);
$out+='</span></td>\r\n				<td recommend="2:4">2:4<br/><span>';
$out+=$escape(bfBettypeOdds['2:4']);
$out+='</span></td>\r\n				<td recommend="0:5">0:5<br/><span>';
$out+=$escape(bfBettypeOdds['0:5']);
$out+='</span></td>\r\n			</tr>\r\n			<tr>\r\n				<td recommend="1:5">1:5<br/><span>';
$out+=$escape(bfBettypeOdds['1:5']);
$out+='</span></td>\r\n				<td recommend="2:5">2:5<br/><span>';
$out+=$escape(bfBettypeOdds['2:5']);
$out+='</span></td>\r\n				<td recommend="FQT">负其他<br/><span>';
$out+=$escape(bfBettypeOdds['FQT']);
$out+='</span></td>\r\n				<td></td>\r\n				<td></td>\r\n			</tr>\r\n		</table>	\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function basketball($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,sf=$data.sf,match=$data.match,rfsf=$data.rfsf,sfc=$data.sfc,dxf=$data.dxf,sfBettypeOdds=$data.sfBettypeOdds,rfsfBettypeOdds=$data.rfsfBettypeOdds,sfcBettypeOdds=$data.sfcBettypeOdds,dxfBettypeOdds=$data.dxfBettypeOdds,$escape=$helpers.$escape,$string=$helpers.$string,$out=''; 
	var sf = match['bettype']['SF'] || {};
	var rfsf = match['bettype']['RFSF'] || {};
	var sfc = match['bettype']['SFC'] || {};
	var dxf = match['bettype']['DXF'] || {};
	var sfBettypeOdds = sf.bettypeOdds || {};
	var rfsfBettypeOdds = rfsf.bettypeOdds || {};
	var sfcBettypeOdds = sfc.bettypeOdds || {};
	var dxfBettypeOdds = dxf.bettypeOdds || {};

$out+='\r\n	<div>\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">主队让分<span class="';
$out+=$escape(rfsf.concede > 0 ? "color_red" : "color_green");
$out+=' ml10">';
$out+=$string(rfsf.concede > 0 ? '+'+rfsf.concede : rfsf.concede);
$out+='</span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(sf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12">非让分</td>\r\n						';
 if (sf) { 
$out+='\r\n							<td recommend="F">客胜<br/><span>';
$out+=$escape(sfBettypeOdds['F']);
$out+='</span></td>\r\n							<td recommend="S">主胜<br/><span>';
$out+=$escape(sfBettypeOdds['S']);
$out+='</span></td>\r\n						';
 } else { 
$out+='\r\n							<td colspan="2"><span>未开售</span></td>\r\n						';
 } 
$out+='\r\n					</tr>\r\n					</table>\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(rfsf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color60 size12">让分</td>\r\n						<td recommend="F">客胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['F']);
$out+='</span></td>\r\n						<td recommend="S">主胜<br/><span>';
$out+=$escape(rfsfBettypeOdds['S']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">预设总分<span class="color_red ml10">';
$out+=$escape(dxf.concede);
$out+='</span></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(dxf.oddsId);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12">大小分</td>\r\n						<td recommend="D">大分<br/><span>';
$out+=$escape(dxfBettypeOdds['D']);
$out+='</span></td>\r\n						<td recommend="X">小分<br/><span>';
$out+=$escape(dxfBettypeOdds['X']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	\r\n		<div>\r\n			<div class="game_head clearfix">\r\n				<span class="fl">胜分差</span> \r\n				<span class="arrow arrow_up hide"></span>\r\n			</div>\r\n			<div class="table_wrap">\r\n				<table class="game_table matchBettype" oddsId="';
$out+=$escape(sfc.oddsId);
$out+='" bettypeContent="';
$out+=$escape(sfc.bettypeContent);
$out+='">\r\n					<tr>\r\n						<td class="game_title color70 size12" rowspan="2">客胜</td>\r\n						<td recommend="F1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['F1-5']);
$out+='</span></td>\r\n						<td recommend="F6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['F6-10']);
$out+='</span></td>\r\n						<td recommend="F11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['F11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="F16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['F16-20']);
$out+='</span></td>\r\n						<td recommend="F21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['F21-25']);
$out+='</span></td>\r\n						<td recommend="F26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['F26+']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td class="game_title color60 size12" rowspan="2">主胜</td>\r\n						<td recommend="S1-5">1-5<br/><span>';
$out+=$escape(sfcBettypeOdds['S1-5']);
$out+='</span></td>\r\n						<td recommend="S6-10">6-10<br/><span>';
$out+=$escape(sfcBettypeOdds['S6-10']);
$out+='</span></td>\r\n						<td recommend="S11-15">11-15<br/><span>';
$out+=$escape(sfcBettypeOdds['S11-15']);
$out+='</span></td>\r\n					</tr>\r\n					<tr>\r\n						<td recommend="S16-20">16-20<br/><span>';
$out+=$escape(sfcBettypeOdds['S16-20']);
$out+='</span></td>\r\n						<td recommend="S21-25">21-25<br/><span>';
$out+=$escape(sfcBettypeOdds['S21-25']);
$out+='</span></td>\r\n						<td recommend="S26+">26+<br/><span>';
$out+=$escape(sfcBettypeOdds['S26+']);
$out+='</span></td>\r\n					</tr>\r\n				</table>	\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/my',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.tabList=tabList;exports.tabList=tabList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top" id="topBox">\r\n		<div class="info">\r\n			<div class="headBox clearfix">\r\n				<img class="img43" id="userImg"><br /><span class="color3 size14" id="userName"></span>\r\n				<!--<span class="personal">\r\n					<span class="color3 size14" id="userName"></span>\r\n					<br>\r\n					<span class="phone_num">\r\n						手机号：<span id="noNum" style="display: none;">无 <span class="bind_btn size10" id="bindMobile">绑定</span></span>\r\n					</span>\r\n				</span>-->\r\n				<span class="btn_small fr" id="editPlan" style="display:none">写推荐</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex oprate">\r\n			<div class="ui-flex_item pd" id="handsel" style="display: none;">\r\n				<div class="ui-flex pd20">\r\n					<div class="charge ui-flex_item textL">\r\n						<span class="total_amount mb10" id="handselBalance"></span><br />\r\n						<span class="icon_money icon_style"></span><span class="size13">彩金</span>\r\n					</div>\r\n					<div class="ui-flex_item textR">\r\n						<span class="size13 mr10" href="#charge&financeType=1">充值</span>\r\n						<span class="size13" href="#withdraw&financeType=1">提款</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="ui-flex_item pd">\r\n				<div class="ui-flex pay pd20">\r\n					<div class="charge ui-flex_item textL">\r\n						<span class="total_amount mb10" id="userBalance"></span><br />\r\n						<span class="icon_pay icon_style"></span><span class="size13">米粒</span>\r\n					</div>\r\n					<div class="ui-flex_item textR">\r\n						<span class="size13 mr10" href="#charge&financeType=0">充值</span>\r\n						<span class="size13" href="#withdraw&financeType=0">提款</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div id="tabList"></div>\r\n	<div class="infoList" id="infoList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tabList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isABT=$data.isABT,userRight=$data.userRight,$out=''; if (isABT) { 
$out+='\r\n<div class="ui-flex_item" tab="4">我的跟单</div>\r\n';
 } 
$out+='\r\n';
 if (userRight['1'] || userRight['3']) { 
$out+='\r\n	<div class="ui-flex_item" tab="1">我的晒米</div>\r\n';
 } 
$out+='\r\n';
 if (userRight['2']) { 
$out+='\r\n	<div class="ui-flex_item" tab="2">分享收成</div>\r\n';
 } 
$out+='\r\n<div class="ui-flex_item" tab="3">我的购买</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tabList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isChannel=$data.isChannel,userRight=$data.userRight,isWeixinBrowser=$data.isWeixinBrowser,$out=''; if (isChannel) { 
$out+='\r\n	<ul class="mt15 user_menu">\r\n		<li class="ui-flex user_menu_item" tab="9">\r\n			<span>我的邀请</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>\r\n	';
 } 
$out+='\n	<ul class="mt15 user_menu">\r\n		<li class="ui-flex user_menu_item" tab="1">\r\n			<span>我的投注</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex user_menu_item" tab="2">\r\n			<span>我的优惠券</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex user_menu_item" tab="3">\r\n			<span>账户明细</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>\r\n	<ul class="mt20 user_menu">\r\n		';
 if (userRight['1'] || userRight['3']) { 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="4">\r\n			<span>我的晒米</span>\r\n			<div class="size12 color6">\r\n				收益<span class="color_red size12"> 50%</span>/单\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n		';
 if (userRight['2']) { 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="5">\r\n			<span>分享收成</span>\r\n			<div class="size12 color6">\r\n				收益<span class="color_red size12"> 30%</span>/单\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="6">\r\n			<span>已购推荐</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<!--<li class="ui-flex user_menu_item" tab="8">\r\n			<span>我的双色球红包</span>\r\n			<span class="arrow_right"></span>\r\n		</li>-->\r\n	</ul>\r\n	';
 if (!isWeixinBrowser) { 
$out+='\r\n		<ul class="mt15 user_menu">\r\n			<li class="ui-flex user_menu_item" tab="7">\r\n				<span>我的关注</span>\r\n				<span class="arrow_right"></span>\r\n			</li>\r\n		</ul>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myBet',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ticketOrderList=ticketOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="tabList">\n		<div class="ui-flex_item" tab ="0">全部</div>\n		<div class="ui-flex_item" tab ="1">跟单</div>\n		<div class="ui-flex_item" tab ="2">自选</div>\n		<div class="ui-flex_item" tab ="3">已中奖</div>\n	</div>\n	<ul class="my_doct mt5" id="ticketOrderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,ticketOrder=$data.ticketOrder,isSelfTicket=$data.isSelfTicket,orderNo=$data.orderNo,status=$data.status,planNickName=$data.planNickName,planRealName=$data.planRealName,planUserName=$data.planUserName,ticketStatus=$data.ticketStatus,ticketPrizeAmount=$data.ticketPrizeAmount,ticketSendPrizeAmount=$data.ticketSendPrizeAmount,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,lotteryId=$data.lotteryId,lotteryLogoMap=$data.lotteryLogoMap,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';  
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var ticketOrder = list[i] || {};
		var isSelfTicket = ticketOrder.isSelfTicket;
		var orderNo = ticketOrder.orderNo;
		var status = ticketOrder.status;
		var planNickName = ticketOrder.planNickName;
		var planRealName = ticketOrder.planRealName;
		var planUserName = planRealName || planNickName;
		var ticketStatus = ticketOrder.ticketStatus;
		var ticketPrizeAmount = (ticketOrder.ticketPrizeAmount || 0)/100;
		var ticketSendPrizeAmount = (ticketOrder.ticketSendPrizeAmount/100 || 0).toFixed(2);
		var imgMap = {"0":"icon_zzcp_s","1":"icon_cpsb_s","2":"icon_dkj_s","3":"icon_wzj_s","4":"icon_yzj_s","5":"icon_ypj","7":"icon_zzcp_s","8":"icon_dkj_s","9":"icon_zzcp_s"};
		var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖","7":"正在出票","8":"部分出票","9":"正在出票"};
		var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var lotteryId = ticketOrder.lotteryId || '';
		var lotteryLogoMap = {'SSQ':'icon_ssq','JCZQ':'icon_jczq','JCLQ':'icon_jclq','JSK3':'icon_jsk3','DLT':'icon_dlt','GX11X5':'icon_gx11x5','FC3D':'icon_fc3d','JZYP':'icon_jzyp','SJBGJ':'icon_sjbcgj','SJBGYJ':'icon_sjbcgj'}

$out+='\n	<li class="doct_item clearfix" orderNo=';
$out+=$escape(orderNo);
$out+='>\n		<img class="lottery_logo fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+=$escape(lotteryLogoMap[lotteryId]);
$out+='.png" />\n		<div class="fl">\n			<div class="nickname">\n				';
$out+=$escape(isSelfTicket?'自选投注':planUserName);
$out+='\n			</div>\n			<div class="color9 size12">\n				';
$out+=$escape(createTime);
$out+='\n			</div>\n		</div>\n			<div class="fr win_status">\n				';
 if (ticketStatus == 5) { 
$out+='\n					<span class="color_red">中';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\n				';
 } else if (ticketStatus == 6) { 
$out+='\n					<span class="color_red">部分派奖';
$out+=$escape(ticketSendPrizeAmount);
$out+='</span>\n				';
 } else if (status == 3) { 
$out+='\n					<i class="icon_ytk_s"></i>\n					<span>已退款</span>\n				';
 } else { 
$out+='\n					<i class="';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\n					<span>';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='</span>\n				';
 } 
$out+='\n				<span class="arrow_right attention_right"></span>\n			</div>\n	</li>\n';
 } 
} else { 
$out+='\n	<li>\n		<div class="none">\n			<p>您还没有跟单投注</p>\n			<span class="btn ellipsis" href="#ticketFollow">去跟单</span>\n		</div>\n	</li>\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myCoupon',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.coupon=coupon;exports.couponList=couponList;exports.couponIllustrate=couponIllustrate;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function coupon($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="tabBox">\r\n		<div class="ui-flex_item" state="1">可用<span id="availableCount"></span></div>\r\n		<div class="ui-flex_item" state="2">待派发<span id="distributeCount"></span></div>\r\n		<div class="ui-flex_item" state="3">已用/过期</div>\r\n	</div>\r\n<ul class="coupon_list mt5" id="couponList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function couponList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,coupon=$data.coupon,count=$data.count,amount=$data.amount,day=$data.day,status=$data.status,couponType=$data.couponType,couponTypeMap=$data.couponTypeMap,rule=$data.rule,$escape=$helpers.$escape,state=$data.state,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var coupon = list[i] || {};
	var count = coupon.count || '';
	var amount = (coupon.amount || 0)/100;
	var day = coupon.day || 0;
	var status = coupon.status;
	var couponType = coupon.couponType;
	var couponTypeMap = {1:'cpzy',2:'cjzy'};
	var rule = coupon.rule || {};

$out+='\r\n	<li class="coupon_item ui-flex">\r\n		<div class="';
$out+=$escape(couponTypeMap[couponType]);
$out+=' ';
$out+=$escape(state == 3? 'invalid' : '');
$out+='">\r\n			<div class="lottery_type size13">\r\n				';
$out+=$escape(rule.line1 ? rule.line1 : '');
$out+='\r\n			</div>\r\n			<div class="line"></div>\r\n			<div class="size15 full">\r\n				';
$out+=$escape(rule.line2 ? rule.line2 : '');
$out+='\r\n			</div>\r\n			<div class="size15">\r\n				';
$out+=$escape(rule.line3 ? rule.line3 : '');
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex_item coupon_detail">\r\n			<div class="ui-flex">\r\n				<dl>\r\n					<dd class="size13">金额：';
$out+=$escape(amount);
$out+='</dd>\r\n					<dd class="color_red size12">有效期：';
$out+=$escape(day);
$out+='天</dd>\r\n					<dd class="color6 size12">优惠券：';
$out+=$escape(count);
$out+='张</dd>\r\n				</dl>\r\n				';
 if (status == 1) { 
$out+='\r\n					';
 if (state == 1) { 
$out+='\r\n						<a class="use_btn" couponType="';
$out+=$escape(couponType);
$out+='">\r\n							马上使用\r\n						</a>\r\n					';
 } else if (state == 2) { 
$out+='\r\n						<a class="no_payout">\r\n							未派发\r\n						</a>\r\n					';
 } else if (state == 3) { 
$out+='\r\n						<div class="invalid_img_wrap">\r\n							<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='coupon_overdue_img.png" />\r\n						</div>\r\n					';
 } 
$out+='\r\n				';
 } else if (status == 2) { 
$out+='\r\n					<div class="invalid_img_wrap">\r\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='coupon_used_img.png" />\r\n					</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
	}
	 } 
return new String($out);
}).call(templateUtils,$data).toString()}function couponIllustrate($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="coupon_illustrate">\r\n		<h3>使用说明：</h3>\r\n		<ul class="">\r\n			<li>1.投注时可使用优惠券抵扣支付金额和充值时可使用优惠券抵扣充值金额，一次投注和充值只能用一张优惠券；</li>\r\n			<li>2.优惠券应当在有效期内使用，过期则无法使用；</li>\r\n			<li>3.使用优惠券支付的投注方案，若投注方案交易失败，退款结算按照实际支付的金额退款，同时优惠券将以彩金方式退还给用户，可购彩中奖后可提现，（例如：\r\n用户支付10元购彩方案时使用满10元减1元优惠券，实际支付为9元，若该方案交易失败，则退还支付本金9元，同时退还优惠券1元彩金）；</li>\r\n			<li>4.使用充值优惠券充值彩金，若充值失败，充值优惠券将退还，可在我的优惠券中查看。</li>\r\n		</ul>\r\n		<h3 class="mt10">优惠券分类：</h3>\r\n		<ul>\r\n			<li>1.优惠券分为四大类：竞技彩优惠券、高频彩优惠券、数字彩优惠券和充值优惠券；</li>\r\n			<li>2.竞技彩优惠券购买竞彩足球、竞彩篮球和竞足亚盘时可使用；</li>\r\n			<li>3.高频彩优惠券购买老快3、乐11选5时可使用；</li>\r\n			<li>4.数字彩优惠券购买双色球、大乐透、3D时可使用；</li>\r\n			<li>5.充值优惠券充值彩金时可使用，不支持充值米粒。</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myDigitalPlan',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.recommendList=recommendList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="infoBox" id="recommendList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function recommendList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,lotteryId=$data.lotteryId,amount=$data.amount,readCount=$data.readCount,matchType=$data.matchType,isSale=$data.isSale,rich=$data.rich,prizeStatus=$data.prizeStatus,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,divideStatistics=$data.divideStatistics,dCount=$data.dCount,dAmount=$data.dAmount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var lotteryId = plan.lotteryId;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchType = plan.matchType || 0;
	var isSale = plan.isSale || false;
	var rich = plan.rich || false;
	var prizeStatus = plan.prizeStatus;
	var statistics = plan.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var divideStatistics = plan.divideStatistics || {};
	var dCount = divideStatistics.count || 0;
	var dAmount = (divideStatistics.amount || 0)/100;
	var betContent = plan.betContentList[0] || {};
	var betContentResult = betContent.betContentResult || {};
	var name = betContentResult.name;
	var lotteryIssue = plan.lotteryIssue || {};
	var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var issue = lotteryIssue.issue;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\n						开奖：';
$out+=$escape(drawTime);
$out+='\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex count_box">\r\n			<div class="plan_total">\r\n				';
 if(amount <= 0) { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(readCount);
$out+='</span>人阅读</span>\r\n				';
 } else { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(sCount);
$out+='</span>人购买</span>\r\n				';
 } 
$out+='\r\n				<span>收米<span class="num">';
$out+=$escape(sAmount);
$out+='</span></span>\r\n			</div>\r\n			';
 if (isSale) { 
$out+='\r\n				<div class="ticket_commission">\r\n					<span><span class="num">';
$out+=$escape(dCount);
$out+='</span>人跟单</span>\r\n					<span>提成<span class="num">';
$out+=$escape(dAmount);
$out+='</span></span>\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#editPlan">写推荐</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myFinance',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.financeRecordList=financeRecordList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<!--<div class="ui-flex tab_nav mb5" id="typeList">\r\n	<div class="ui-flex_item" financeType="1">彩金</div>\r\n	<div class="ui-flex_item" financeType="0">米粒</div>\r\n</div>-->\r\n<table align="center">\r\n	<thead>\r\n		<tr>\r\n			<th width="24%">时间</th>\r\n			<th width="38%">金额</th>\r\n			<th width="38%">获取渠道</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody class="charge_con" id="financeRecordList" align="center"></tbody>\r\n</table>';
return new String($out);
}).call(templateUtils,$data).toString()}function financeRecordList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,financeRecord=$data.financeRecord,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,type=$data.type,amount=$data.amount,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var financeRecord = list[i] || {};
	var financeType = financeRecord.financeType;
	var financeTypeMap = {'0': '米粒', '1': '彩金'};
	var type = financeRecord.type;//类型, 1=消费, 2=收益, 3=提款, 4=充值
	var amount = financeRecord.amount/100 || 0;
	var remark = financeRecord.remark || '';
	var createTime = financeRecord.createTime || "";
	var matchTime = createTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (matchTime) {
		day = matchTime[1];
		time = matchTime[2];
	}
	if (financeType == 0 && type == 1) {
		if (remark.indexOf('优惠券') != -1) {
			remark = '米粒消费('+remark+')';	
		} else {
			remark = '米粒消费';
		}
	}
	if (financeType == 1 && type == 1) {
		if (remark.indexOf('优惠券') != -1) {
			remark = '投注('+remark+')';	
		} else {
			remark = '投注';
		}
	}
	if (type == 1 || type == 3) {
		amount = '-' + amount;	
	}
	if (type == 1) {
		remark = remark || '消费';
	} else if (type == 2) {
		remark = remark || '收益';
	} else if (type == 3) {
		remark = remark || '提款';
	} else if (type == 4) {
		remark = remark || '充值';
	}

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(day);
$out+='<br>';
$out+=$escape(time);
$out+='</td>\r\n		<td>';
$out+=$escape(amount);
$out+=$escape(financeTypeMap[financeType]);
$out+='</td>\r\n		<td>';
$out+=$escape(remark);
$out+='</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myInvitation',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$out='';$out+='<div class="invite_wrap">\r\n		<dl>\r\n			<dd class="mb15">推广链接</dd>\r\n			<dd class="invite_link mb15"><input type="text" value="http://www.xxx.com"/></dd>\r\n			<dd>\r\n				<span class="invite_copy"></span>\r\n				<span class="invite_share"></span>\r\n			</dd>\r\n		</dl>\r\n	</div>\r\n	<!--菜单-->\r\n	<ul class="mt10 menu" id="tabList">\r\n		<li class="ui-flex menu_bar" tab="1">\r\n			<span>我的收益</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="2">\r\n			<span>邀请人数</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="3">\r\n			<span>高频彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex menu_bar" tab="4">\r\n			<span>竞技彩消费</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myPlan',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.recommendList=recommendList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="typeList">\r\n	<div class="ui-flex_item" recommendType="0">全部</div>\r\n	<div class="ui-flex_item" recommendType="1">单关</div>\r\n	<div class="ui-flex_item" recommendType="2">串关</div>\r\n</div>\r\n<p class="clearfix pl10 pr10 mt5" id="countNum">\r\n	<span class="fl"><span id="recommendIncomeCount">0</span>人购买</span>\r\n	<span class="fr">收米<span class="num" id="recommendIncomeAmount">0</span></span>\r\n</p>\r\n<ul class="infoBox mt5" id="recommendList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function recommendList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,isLinChang=$data.isLinChang,isGirl=$data.isGirl,amount=$data.amount,readCount=$data.readCount,matchList=$data.matchList,match=$data.match,league=$data.league,home=$data.home,away=$data.away,matchNum=$data.matchNum,beginTime=$data.beginTime,d=$data.d,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,rich=$data.rich,matchType=$data.matchType,divideStatistics=$data.divideStatistics,dCount=$data.dCount,dAmount=$data.dAmount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,$=$data.$,access=$data.access,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var isLinChang = plan.isLinChang || false;
	var isGirl = plan.isGirl || false;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchList = plan.matchList || [];
	var match = (matchList.length > 0 && matchList[0]) || {};
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var matchNum = matchList.length;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var statistics = plan.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var divideStatistics = plan.divideStatistics || {};
	var dCount = divideStatistics.count || 0;
	var dAmount = (divideStatistics.amount || 0)/100;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="recommend_cont">\r\n			<div class="pt10">\r\n				<div class="recommend_item">\r\n					<p class="recommend_title">\r\n						';
 if (title) { 
$out+='\r\n							';
 if (matchNum >1) { 
$out+='\r\n								<span class="">【串关】</span>\r\n							';
 } else { 
$out+='\r\n								<span class="">【单关】</span>\r\n							';
 } 
$out+='\r\n							';
 if (hasPic) {
$out+='\r\n								';
 if (isGirl) { 
$out+='\r\n									<span class="">【美照】</span>\r\n								';
 } else if (rich){ 
$out+='\r\n									<span class="">【豪单】</span>\r\n								';
 } else { 
$out+='\r\n									<span class="">【实单】</span>\r\n								';
 } 
$out+='\r\n							';
 } 
$out+='\r\n							';
$out+=$escape(title);
$out+='\r\n						';
 } else { 
$out+='\r\n							';
 
								for (var j = 0; j < matchNum; j++) { 
									var match = matchList[j] || {};
									var home = match.home;
									var away = match.away;
									var number = match.number;
							
$out+='\r\n								<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='<span>。\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n					</p>\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span class="color_red">免费</span>\r\n								';
 } else { 
$out+='\r\n									<span class="color_red">查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n							';
 } 
$out+='\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex count_box">\r\n			<div class="plan_total">\r\n				';
 if(amount <= 0) { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(readCount);
$out+='</span>人阅读</span>\r\n				';
 } else { 
$out+='\r\n					<span><span class="num">';
$out+=$escape(sCount);
$out+='</span>人购买</span>\r\n				';
 } 
$out+='\r\n				<span>收米<span class="num">';
$out+=$escape(sAmount);
$out+='</span></span>\r\n			</div>\r\n			<div class="ticket_commission">\r\n				<span><span class="num">';
$out+=$escape(dCount);
$out+='</span>人跟单</span>\r\n				<span>提成<span class="num">';
$out+=$escape(dAmount);
$out+='</span></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>您还没有晒米</p>\r\n			<span class="btn ellipsis" href="#editPlan">写推荐</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myShare',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.spreadList=spreadList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="clearfix pl10 pr10" id="countNum">\r\n	<span class="fl"><span id="spreadIncomeCount">0</span>人次</span>\r\n	<span class="fr">收米<span class="num" id="spreadIncomeAmount">0</span></span>\r\n</p>\r\n<ul class="infoBox" id="spreadList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function spreadList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,amount=$data.amount,planAccess=$data.planAccess,createTime=$data.createTime,d=$data.d,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,statistics=$data.statistics,sCount=$data.sCount,sAmount=$data.sAmount,planType=$data.planType,$escape=$helpers.$escape,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var order = list[i] || {};
	var planNo = order.planNo;
	var amount = (order.amount || 0)/100;
	var planAccess = order.planAccess+'';
	var createTime = order.createTime && order.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = order.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var statistics = order.statistics || {};
	var sCount = statistics.count || 0;
	var sAmount = (statistics.amount || 0)/100;
	var planType = order.planType;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(planAccess);
$out+='" planType="';
$out+=$escape(planType);
$out+='">\r\n		<p class="title color6 clearfix">\r\n			<img class="userHead" src="';
$out+=$escape(userImg);
$out+='">\r\n			<span class="fl">';
$out+=$escape(userName);
$out+='</span>\r\n			<span class="fr">';
$out+=$escape(createTime);
$out+='</span>\r\n		</p>\r\n		<p class="title ui-flex">\r\n			<span class="ui-flex_item">消费金额: <span>';
$out+=$escape(amount);
$out+='</span> 米</span>\r\n			<span class="ui-flex_item">收益：<span class="num">';
$out+=$escape(sAmount);
$out+='</span> 粒米</span>\r\n			<span class="ui-flex_item  textR"><span class="arrow arrow_right"></span></span>\r\n		</p>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li>\r\n		<div class="none">\r\n			<p>分享专家的推荐，其他人购买后，您将获得50%收益。</p>\r\n			<span class="btn ellipsis" href="#home">去分享</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/myTrade',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.orderList=orderList;exports.digitalOrderList=digitalOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="title clearfix">\r\n	<!--<span class="fl"><span id="orderCount">0</span>篇</span>-->\r\n	<!--<span class="fr">支出<span class="num" id="orderAmount">0</span></span>-->\r\n</p>\r\n<div class="ui-flex tab_nav" id="tabList">\r\n	<div class="ui-flex_item" tab="0">竞技彩</div>\r\n	<div class="ui-flex_item" tab="1">数字彩</div>\r\n</div>\r\n<ul class="infoBox mt10" id="orderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,planMatchType=$data.planMatchType,planPrizeStatus=$data.planPrizeStatus,amount=$data.amount,isSale=$data.isSale,matchList=$data.matchList,matchNum=$data.matchNum,plan=$data.plan,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,d=$data.d,$escape=$helpers.$escape,hasPic=$data.hasPic,isGirl=$data.isGirl,rich=$data.rich,j=$data.j,match=$data.match,home=$data.home,away=$data.away,number=$data.number,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var order = list[i] || {};
		var planNo = order.planNo;
		var planMatchType = order.planMatchType || 1;
		var planPrizeStatus = order.planPrizeStatus || 0;
		var amount = (order.amount || 0)/100;
		var isSale = !!order.isSale;
		var matchList = order.matchList || {};
		var matchNum = matchList.length;
		var plan = order.plan || {};
		var title = plan.title;
		var saleTicketAmount = plan.saleTicketAmount/100 || 0;
		var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="recommend_cont">\r\n			<div class="pt10">\r\n				<div class="recommend_item">\r\n					<p class="recommend_title">\r\n						';
 if (title) { 
$out+='\r\n							';
 if (matchNum >1) { 
$out+='\r\n								<span class="">【串关】</span>\r\n							';
 } else { 
$out+='\r\n								<span class="">【单关】</span>\r\n							';
 } 
$out+='\r\n							';
 if (hasPic) {
$out+='\r\n								';
 if (isGirl) { 
$out+='\r\n									<span class="">【美照】</span>\r\n								';
 } else if (rich){ 
$out+='\r\n									<span class="">【豪单】</span>\r\n								';
 } else { 
$out+='\r\n									<span class="">【实单】</span>\r\n								';
 } 
$out+='\r\n							';
 } 
$out+='\r\n							';
$out+=$escape(title);
$out+='\r\n						';
 } else { 
$out+='\r\n							';
 
								for (var j = 0; j < matchNum; j++) { 
									var match = matchList[j] || {};
									var home = match.home;
									var away = match.away;
									var number = match.number;
							
$out+='\r\n								<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='<span>。\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n					</p>\r\n					';
 if (planPrizeStatus == 1) { 
$out+='\r\n						<img class="recommend_win_bg" src="';
$out+=$escape(IMG_PATH);
$out+='recommend_win_bg.png">\r\n					';
 } 
$out+='\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							<span class="color_red">查看</span>\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li id="noMatch" style="display: none;">\r\n		<div class="none">\r\n			<p>空空如也</p>\r\n			<span class="btn ellipsis" href="#home">看看专家的晒米</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,order=$data.order,planNo=$data.planNo,planMatchType=$data.planMatchType,planPrizeStatus=$data.planPrizeStatus,amount=$data.amount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out=''; 
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
		var order = list[i] || {};
		var planNo = order.planNo;
		var planMatchType = order.planMatchType || 0;
		var planPrizeStatus = order.planPrizeStatus || 0;
		var amount = (order.amount || 0)/100;
		var betContent = order.betContentList[0] || {};
		var betContentResult = betContent.betContentResult || {};
		var name = betContentResult.name;
		var lotteryIssue = order.lotteryIssue || {};
		var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
		var issue = lotteryIssue.issue;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="true">\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\r\n						开奖：';
$out+=$escape(drawTime);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (planPrizeStatus == 1) { 
$out+='\r\n					<img class="" src="';
$out+=$escape(IMG_PATH);
$out+='user_win_prize.png" style="width: 45px;position: relative;z-index: 5;"/>\r\n				';
 } else { 
$out+='\r\n					<span>查看</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 
	}
} else { 
$out+='\r\n	<li id="noMatch" style="display: none;">\r\n		<div class="none">\r\n			<p>空空如也</p>\r\n			<span class="btn ellipsis" href="#home">看看专家的晒米</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/officialSite',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.pc=pc;exports.mobile=mobile;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function pc($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="pc_top">\r\n		<div class="top_logo">\r\n			<img class="img-responsive logo_img" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_logo.png"/>\r\n		</div>\r\n		<img class="img-responsive pc_top_bg" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_top_bg.jpg"/>\r\n		<div class="title-btn">\r\n			<p class="title_one">晒米场 球迷的收米神器</p>\r\n			<h3 class="top_title"></h3>\r\n			<div class="top_btn_wrap">\r\n				<span class="top_btn ios_btn" id="topIphoneBtn">\r\n					<i class="top_ios_icon"></i>\r\n					iphone 版下载\r\n				</span>\r\n				<span class="top_btn android_btn" id="topAndroidBtn">\r\n					<i class="top_android_icon"></i>\r\n					Android 版下载\r\n				</span>\r\n				<span class="top_small_code" id="hoverCode"></span>\r\n				<div class="top_code_wrap" style="display: none" id="topCode">\r\n					<img class="top_code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_bottom_code.png" /><br />\r\n					<span>扫描二维码关注公众号</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_middle">\r\n		<p>操盘手心水 实单实战</p>\r\n		<p class="middle_title">专家晒米 我们不一样</p>\r\n		<p>国内外知名操盘手、店长实单推荐，众多足球篮球专家每日解读，助你收米</p>\r\n		<div class="middle_img">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_middle_img.jpg"/>\r\n		</div>\r\n	</div>\r\n	<div class="code_wrap">\r\n		<p class="title01">晒米场  球迷的收米神器</p>\r\n		<p class="title02">请选择相应的机型下载</p>\r\n		<div class="btn_box ui-flex">\r\n			<div class="btn_wrap ui-flex" id="bottomIphoneBtn">\r\n				<i class="bottom_ios_icon"></i>\r\n				<span>iPhone</span>\r\n			</div>\r\n			<div class="btn_wrap ui-flex" id="bottomAndroidBtn">\r\n				<i class="bottom_android_icon"></i>\r\n				<span>Android</span>\r\n			</div>\r\n			<div class="btn_wrap ui-flex">\r\n				<img class="bottom_code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_bottom_code.png" />\r\n				<span>扫描二维码关注公众号</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_bottom">\r\n		<p class="phone_number">客服电话：0755-26651930</p>\r\n		<p class="mt5"><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>\r\n</div>\r\n<div id="androidQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>\r\n<div id="iosQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mobile($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="mobile_top">\r\n		<div class="top_logo">\r\n			<img class="img-responsive logo_img" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_logo.png"/>\r\n		</div>\r\n		<img class="img-responsive mobile_top_bg" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_bg.jpg"/>\r\n		<div class="top_title">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_title.png"/>\r\n		</div>\r\n		<div class="top_preson">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_person.png"/>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_middle">\r\n		<div class="middle_content">\r\n			<div class="bt_watp ui-flex">\r\n				<a class="ios_btn" id="mobileTopDownIos">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_ios_btn.png" />\r\n				</a>\r\n				<a class="android_btn" id="mobileTopDownAndriod">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_andriod_btn.png"/>\r\n				</a>\r\n			</div>\r\n			<p class="middle_title mb5">专家晒米 我们不一样</p>\r\n			<p>操盘手心水 实单实战</p>\r\n			<p>国内外知名操盘手、店长实单推荐，众多足球篮球专家每日解读，助你收米</p>\r\n		</div>\r\n		<div class="middle_img">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_middle_img.jpg"/>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_code_wrap">\r\n		<p class="title01">晒米场  球迷的收米神器</p>\r\n		<p class="title02">请选择相应的机型下载</p>\r\n		<div class="btn_box ui-flex">\r\n			<div class="btn_wrap" id="mobileBottomDownIos">\r\n				<img class="ios_btn" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_ios.png"/>\r\n			</div>\r\n			<div class="btn_wrap" id="mobileBottomDownAndriod">\r\n				<img class="android_btn" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_andriod.png"/>\r\n			</div>\r\n			<div class="btn_wrap">\r\n				<img class="code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_code.png"/>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_bottom">\r\n		<p class="phone_number">客服电话：0755-26651930</p>\r\n		<p class=""><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/pc',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$out='';$out+='<iframe style="height:100%;width:650px;margin-left:50%;position:relative;top:0;left:-325px;" src="#home"></iframe>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/planDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.mask=mask;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,planNo=$data.planNo,plan=$data.plan,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,isSale=$data.isSale,maxPrizeRate=$data.maxPrizeRate,resourceList=$data.resourceList,matchList=$data.matchList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,matchType=$data.matchType,$escape=$helpers.$escape,i=$data.i,length=$data.length,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,d=$data.d,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,$string=$helpers.$string,name=$data.name,$out=''; 
	var planNo = plan.planNo || "";
	var content = plan.content || "";
	var upCount = plan.upCount || 0;
	var downCount = plan.downCount || 0;
	var shareCount = plan.shareCount || 0;
	var isSale = !!plan.isSale;
	var maxPrizeRate = plan.maxPrizeRate || 0;
	var resourceList = plan.resourceList || [];
	var matchList = plan.matchList || [];
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";
	var matchType = plan.matchType;

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">晒米人：';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 
			for (var i = 0, length = matchList.length; i < length; i++) { 
			var match = matchList[i] || {};
			var recommend = match.recommend || [];
			var prize = match.prize || [];
			var matchId = match.matchId || 0;
			var oddsId = match.oddsId || 0;
			var bettypeContent = match.bettypeContent || "";
			var recommendLength = recommend.length;
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
				continue;
			}
			match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
			var nullOdds = '--';//赔率为空显示值
			var concede = match.concede;
			var bettypeOdds = match.bettypeOdds || {};
			var bettype = match.bettypeValue || {};
			var recommendMap = {};
			for (var j = 0; j < recommendLength; j++) {
				recommendMap[recommend[j]] = true;
			}
			var bettypeResult = match.bettypeResult || {};
			var number = match.number;
		
$out+='\r\n			<div class="matchInfo_wrap">\r\n				<div class="matchInfo clearfix">\r\n					<span class="size14 fl match_name" style="';
$out+=$escape(matchType == 2 ? 'color:#003cff;' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n					<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n				</div>\r\n				<div class="ui-flex color3">\r\n					<div class="ui-flex_item ellipsis">';
$out+=$string(matchType == 2 ? match.away : match.home);
$out+='</div>\r\n					 ';
 if (match.result) { 
$out+='\r\n						';
 if (bettypeContent == "BQC") { 
$out+='\r\n						<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n						';
 } else { 
$out+='\r\n						<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n						';
 } 
$out+='\r\n					';
 } else { 
$out+='\r\n						vs\r\n					';
 } 
$out+=' \r\n					<div class="ui-flex_item ellipsis textR">';
$out+=$string(matchType == 2 ? match.home : match.away);
$out+=$string(matchType == 2 ? '(主)' : '');
$out+='</div>\r\n				</div>\r\n			';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n				<div class="ui-flex flex_wrap pl40">\r\n					<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else if (bettypeContent == "RFSF" || bettypeContent == "SF") { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					';
 if (bettypeContent == "RFSF") { 
$out+='\r\n						<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					';
 } 
$out+='\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="ui-flex flex_wrap">\r\n					';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					';
 } 
$out+='\r\n					';
 
					if (prize.length <= 0) {
						for (var name in bettypeResult) {
							if (!bettypeResult[name]) {
								continue;
							}
					
$out+='\r\n						<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n					';

						}
					}
					
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n			</div>\r\n		';
 } 
$out+='\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="planDetail">\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 if(isSale) { 
$out+='\r\n	<div class="expertInfo_bottom">\r\n		<div class="ui-flex bet">\r\n			<div class="ui-flex_item textL">\r\n				理论最大返奖：<span class="color_red">';
$out+=$escape(maxPrizeRate>0?+maxPrizeRate+'%':'未知');
$out+='</span>\r\n			</div>\r\n			<div class="ui-flex_item textR" id="addTicket">\r\n				<a class="btn">跟单投注</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mask" id="ticketOrderMask">\r\n		<div class="pop5"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/presentOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.prentOrderList=prentOrderList;exports.receiveOrderList=receiveOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n		.content {\r\n			padding-bottom: 80px;\r\n		}\r\n	</style>\r\n	<div class="ui-flex tab_btn" id="typeBtn">\r\n		<div class="ui-flex_item" type="1">\r\n			我的赠送\r\n		</div>\r\n		<div class="ui-flex_item" type="2">\r\n			我的领取\r\n		</div>\r\n	</div>\r\n	<ul class="ssqhb_list" id="prentOrderList">\r\n		\r\n	</ul>\r\n	<div class="fixed_btn">\r\n		<a class="ensure_btn" id="presentTicket">马上送注双色球</a>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function prentOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,amount=$data.amount,realName=$data.realName,nickName=$data.nickName,userName=$data.userName,createTime=$data.createTime,presentStatus=$data.presentStatus,orderNo=$data.orderNo,d=$data.d,day=$data.day,presentStatusMap=$data.presentStatusMap,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < list.length; i++) { 
	var amount = list[i].amount/100 || '';
	var realName = list[i].realName;
	var nickName = list[i].nickName;
	var userName = realName || nickName;
	var createTime = list[i].createTime || "";
	var presentStatus = list[i].presentStatus || '';
	var orderNo = list[i].orderNo || '';
	createTime = createTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = createTime[1];
	var presentStatusMap = {1: '未领完',2: '已领完',3: '已过期'};

$out+='\r\n	<li class="hb_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="ui-flex mb5">\r\n			<span class="ui-flex_item size13">';
$out+=$escape(userName);
$out+='的彩票</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(presentStatusMap[presentStatus]);
$out+='</span>\r\n		</div>\r\n		<div class="ui-flex chrono_cash">\r\n			<span class="ui-flex_item">';
$out+=$escape(day);
$out+='</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(amount);
$out+='元</span>\r\n		</div>\r\n	</li>\r\n';
 
	} 
} else { 
$out+='\r\n	<div class="no_item">\r\n		<img class="ssqhb_default" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_default.png"/>\r\n		<p class="mt15 color9">暂时没有您的赠送记录</p>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function receiveOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,amount=$data.amount,orderNo=$data.orderNo,user=$data.user,createTime=$data.createTime,d=$data.d,day=$data.day,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < list.length; i++) { 
	var amount = list[i].amount/100 || '';
	var orderNo = list[i].orderNo;
	var user = list[i].user || {};
	var createTime = list[i].createTime || "";
	createTime = createTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = createTime[1];
	var nickName = user.nickName;
	var realName = user.realName;
	var userName = realName || nickName;

$out+='\r\n	<li class="hb_item" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n		<div class="ui-flex mb5">\r\n			<span class="ui-flex_item size13">';
$out+=$escape(userName);
$out+='的彩票</span>\r\n			<span class="ui-flex_item textR">已领取</span>\r\n		</div>\r\n		<div class="ui-flex chrono_cash">\r\n			<span class="ui-flex_item">';
$out+=$escape(day);
$out+='</span>\r\n			<span class="ui-flex_item textR">';
$out+=$escape(amount);
$out+='元</span>\r\n		</div>\r\n	</li>\r\n';
 
	} 
} else { 
$out+='\r\n	<div class="no_item">\r\n		<img class="ssqhb_default" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_default.png"/>\r\n		<p class="mt15 color9">暂时没有您的领取记录</p>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/presentOrderSuccess',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,isApp=$data.isApp,$out='';$out+='<div class="share_head pt50 pb15">\r\n		<div class="suc_logo_wrap">\r\n			<span class="share_icon"></span>\r\n		</div>\r\n		<p class="mt15 textC">选择分享给好友</p>\r\n		<p class="mt10 textC">您的祝福将快马加鞭送达</p>\r\n	</div>\r\n	';
 if (isApp) { 
$out+='\r\n		<div class="share_btn_wrap mt50" id="shareWechat">\r\n			<a class="share_friends_btn">分享给微信好友</a>\r\n		</div>\r\n		<div class="share_btn_wrap mt25" id="shareWechatMoments">\r\n			<a class="share_group_btn">分享到微信朋友圈</a>\r\n		</div>\r\n	';
 } else { 
$out+='\r\n		<div class="share_btn_wrap mt50" id="shareBtn">\r\n			<a class="share_friends_btn">分享给微信好友、朋友圈</a>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/receivedOrder',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.presentOrderInfo=presentOrderInfo;exports.receiveList=receiveList;exports.ssqhbMaskBox=ssqhbMaskBox;exports.ssqhbBanner=ssqhbBanner;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n		.content {\r\n			background-color: #FFFFFF;\r\n		}\r\n	</style>\r\n	<div class="hb_head pb20" id="presentOrderInfo">\r\n		\r\n	</div>\r\n	<section class="receive_msg mt10">\r\n		<div class="receive_title" id="receiveTitle">\r\n			\r\n		</div>\r\n		<ul class="receive_list" id="receiveList"></ul>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}function presentOrderInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,presentRemark=$data.presentRemark,presentOrderInfo=$data.presentOrderInfo,receivedOrderNo=$data.receivedOrderNo,presentNum=$data.presentNum,presentReceived=$data.presentReceived,user=$data.user,nickName=$data.nickName,realName=$data.realName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,presentStatus=$data.presentStatus,$escape=$helpers.$escape,self=$data.self,$out='';
		var	presentRemark = presentOrderInfo.presentRemark;
		var receivedOrderNo = !!presentOrderInfo.receivedOrderNo;
		var presentNum = presentOrderInfo.presentNum;
		var presentReceived = presentOrderInfo.presentReceived;
		var user = presentOrderInfo.user || {};
		var nickName = user.nickName;
		var realName = user.realName;
		var profileImg = user.profileImg;
		var personalImg = user.personalImg;
		var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
		var userName = realName || nickName;
		var presentStatus = presentOrderInfo.presentStatus;
	
$out+='\r\n	<img class="hb_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_bg.png" />\r\n	<img class="sender_header" src="';
$out+=$escape(userImg);
$out+='" />\r\n	<p class="sender_msg"><span class="sender_name">';
$out+=$escape(userName);
$out+='</span> 送给您的双色球红包</p>\r\n	<p class="greeting">';
$out+=$escape(presentRemark);
$out+='</p>\r\n	';
 if (self) { 
$out+='\r\n		';
 if (presentStatus == 1) { 
$out+='\r\n			<div class="hb_btn mt30">\r\n				<a class="ensure_btn" id="shareBtn">点击右上角分享继续赠送给好友</a>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="hb_btn mt30" id="continuePresent">\r\n				<a class="ensure_btn">继续给好友送彩票</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } else { 
$out+='\r\n		';
 if (receivedOrderNo)  { 
$out+='\r\n			<div class="hb_btn mt30 ui-flex">\r\n				<a class="check_btn ui-flex_item" id="receivedBtn">我的领取</a>\r\n				<a class="ensure_btn ui-flex_item ml10" id="continuePresent">我也要送</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 1) { 
$out+='\r\n			<div class="hb_btn mt30" id="receiveBtn">\r\n				<a class="ensure_btn">立即领取</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 2) { 
$out+='	\r\n			<div class="hb_btn mt30 ui-flex">\r\n				<a class="ensure_btn active ui-flex_item">已领完</a>\r\n				<a class="ensure_btn ui-flex_item ml10" id="continuePresent">我也要送</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 3) { 
$out+='	\r\n			<div class="hb_btn mt30 active">\r\n				<a class="ensure_btn">已过期</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function receiveList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,createTime=$data.createTime,d=$data.d,user=$data.user,nickName=$data.nickName,realName=$data.realName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,$escape=$helpers.$escape,$out='';
	var length = list.length;
	for (var i = 0; i < list.length; i++) { 
	var createTime = list[i].createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = list[i].user || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;

$out+='\r\n	<li class="user_item clearfix">\r\n		<img class="user_logo fl mr10" src="';
$out+=$escape(userImg);
$out+='">\r\n		<div class="fl">\r\n			<div class="nickname">\r\n				';
$out+=$escape(userName);
$out+='\r\n			</div>\r\n			<div class="color9 size12">\r\n				';
$out+=$escape(createTime);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="fr">\r\n			<span>已领取</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function ssqhbMaskBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="mask" id="ssqhbMask">\r\n		<div class="ssqhb_pop">\r\n			<div class="pop_title">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_pop_title.png" alt="" />\r\n				<a class="del_btn" id="closePopBtn"><span class="del"></span></a>\r\n			</div>\r\n			<div class="input_wrap">\r\n				<input type="number" placeholder="请输入手机号" maxlength="11" id="mobile">\r\n			</div>\r\n			<div class="input_wrap clearfix">\r\n				<input class="velidate_code" type="number" placeholder="请输入验证码" maxlength="6" id="smsCode">\r\n				<span class="get_code" id="smsCodeBtn">获取验证码</span>\r\n			</div>\r\n			<a class="pop_ensure_btn" id="loginSubmit">确定</a>\r\n		</div>	\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ssqhbBanner($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="ssqhb_banner" id="ssqhbDownload">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_banner.png"/>\r\n		<a class="del_btn" id="closeSsqHbBanner"><span class="del"></span></a>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/receivedOrderSuccess',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="mt50 suc_logo_wrap">\n		<img class="suc_logo img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_suc.png" />\n	</div>\n	<p class="mt25 textC">成功领取 <span class="sender_name" id="senderName"></span> 的红包</p>\n	<div class="hb_btn mt50" id="sendSsqHb">\n		<a class="ensure_btn">我也要送</a>\n	</div>\n	<div class="hb_btn mt25" id="checkSsqHb">\n		<a class="check_btn">查看我的双色球红包</a>\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/recentAwards',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.drawList=drawList;exports.rankList=rankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top_singers clearfix" id="rankBox" style="display: none;">\r\n		<span class="home_icon_msg"></span>\r\n		<ul class="msg_move" id="rankList"></ul>\r\n	</div>\r\n	<ul class="draw_list" id="drawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function drawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,lottery=$data.lottery,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,d=$data.d,day=$data.day,time=$data.time,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,lotteryId=$data.lotteryId,lotteryName=$data.lotteryName,drawFeature=$data.drawFeature,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,testNum=$data.testNum,$out=''; for (var i = 0, length = list.length; i < length; i++) {
		var lottery = list[i] || {};
		var issue = lottery.issue;
		var drawNumber = lottery.drawNumber || '';
		var drawTime = lottery.drawTime || "";
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var time = drawTime[2];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		var lotteryId = lottery.lotteryId;
		var lotteryName = lottery.lotteryName;
		var drawFeature = lottery.drawFeature;
	
$out+='\r\n		<li class="draw_item" lotteryId=\'';
$out+=$escape(lotteryId);
$out+='\'>\r\n			<div class="issue_msg">\r\n				<span class="lottery_name">';
$out+=$escape(lotteryName);
$out+='</span>\r\n				<span>';
$out+=$escape(issue);
$out+='期</span> \r\n				';
 if (lotteryId == 'DLT' || lotteryId == 'SSQ' || lotteryId == 'FC3D') { 
$out+='\r\n					<span>';
$out+=$escape(day);
$out+='(';
$out+=$escape(weekMap[week]);
$out+=')</span> \r\n				';
 } else if (lotteryId == 'GD11X5' || lotteryId == 'JSK3' || lotteryId == 'JX11X5' || lotteryId == 'CQSSC' || lotteryId == 'GXK3') { 
$out+='\r\n					<span>';
$out+=$escape(day);
$out+=' ';
$out+=$escape(time);
$out+='</span> \r\n				';
 } 
$out+='\r\n			</div>\r\n			';
 if (lotteryId == 'DLT' || lotteryId == 'SSQ') { 
$out+='\r\n				<div class="num_wrap mt10">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed;
						if (lotteryId == 'SSQ') {
							drawNumberRed = drawNumber.split('|')[0].split(",");
						} else if (lotteryId == 'DLT') {
							drawNumberRed = drawNumber.split('+')[0].split(",");
						}
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span> \r\n					<span class="blue_ball">\r\n					';
 	var drawNumberBlue;
						if (lotteryId == 'SSQ') {
							drawNumberBlue = drawNumber.split('|')[1].split(",");
						} else if (lotteryId == 'DLT') {
							drawNumberBlue = drawNumber.split('+')[1].split(",");
						}
						for (var k = 0; k < drawNumberBlue.length; k++) { 
							var drawNumberBlueUnit = drawNumberBlue[k];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span>\r\n				</div>\r\n			';
 } else if (lotteryId == 'FC3D') { 
$out+='\r\n				';

					var testNum = drawNumber.split('|')[1].split(',').join(' ');
				
$out+='\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed;
						drawNumberRed = drawNumber.split('|')[0].split(",");
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span>\r\n					<span class="test_num">\r\n						试机号：<span class="">';
$out+=$escape(testNum);
$out+='</span>\r\n					</span>\r\n				</div>\r\n			';
 } else if (lotteryId == 'GD11X5' || lotteryId == 'GX11X5' || lotteryId == 'CQSSC') { 
$out+='\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed = drawNumber.split(",");
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span> \r\n				</div>\r\n			';
 } else if (lotteryId == 'JSK3' || lotteryId == 'GXK3') { 
$out+='\r\n				';
 drawNumber = drawNumber.split(',');
				
$out+='\r\n				<div class="draw_num">\r\n					<span class="num_icon">\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[0]);
$out+='"></i>\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[1]);
$out+='"></i>\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[2]);
$out+='"></i>\r\n					</span>\r\n					<span class="ml15 k3_describe">';
$out+=$escape(drawFeature);
$out+='</span>\r\n				</div>\r\n			';
 } 
$out+='\r\n		</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,order=$data.order,nickName=$data.nickName,lotteryName=$data.lotteryName,ticketPrizeAmount=$data.ticketPrizeAmount,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var order = list[i] || {};
	var nickName = order.nickName;
	var lotteryName = order.lotteryName;
	var ticketPrizeAmount = order.ticketPrizeAmount/100;

$out+='\r\n	<li class="ml5 mr5 size12">恭喜【';
$out+=$escape(nickName);
$out+='】投注';
$out+=$escape(lotteryName);
$out+='中奖';
$out+=$escape(ticketPrizeAmount);
$out+='元</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/replayDetail',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,replayNo=$data.replayNo,replay=$data.replay,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,resourceList=$data.resourceList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,$escape=$helpers.$escape,i=$data.i,length=$data.length,$out=''; 
	var replayNo = replay.replayNo || "";
	var content = replay.content || "";
	var upCount = replay.upCount || 0;
	var downCount = replay.downCount || 0;
	var shareCount = replay.shareCount || 0;
	var resourceList = replay.resourceList || [];
	var user = replay.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="replayDetail">\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" replayNo="';
$out+=$escape(replayNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/replayList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.replayList=replayList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="infoBox" id="replayList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function replayList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,replay=$data.replay,replayNo=$data.replayNo,title=$data.title,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var replay = list[i] || {};
	var replayNo = replay.replayNo;
	var title = replay.title;
	var user = replay.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\n	<li class="item clearfix" replayNo="';
$out+=$escape(replayNo);
$out+='">\n		<div class="recommend_cont">\n			<div class="msg color9 clearfix borderB">\n				<img class="icon_span img38 userProfile" userNo="';
$out+=$escape(userNo);
$out+='" src="';
$out+=$escape(userImg);
$out+='" />\n				<span class="personal">\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\n				</span>\n				';
 if (continueWin > 1) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\n				';
 } else if(winCount > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\n				';
 } else if (profitRate > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\n				';
 } else if (winRate > 0) { 
$out+='\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\n				';
 } else { 
$out+='\n					\n				';
 }
$out+='\n			</div>\n			<p class="recommend_title pt15 pb5 pl10">';
$out+=$escape(title);
$out+='</p>\n			</div>\n		</div>\n	</li>\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/sign',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="getmoney_wrap clearfix">\r\n	<div class="fl claim_wrap">\r\n		<span class="arrow leftIcon_header" id="backBtn"></span>\r\n		<div class="unclaimed">\r\n			<span class="size18 mb10">\r\n				今日可领\r\n			</span>\r\n			<span class="size16">\r\n				<i class="icon_mi_w"></i>\r\n				<b id="unclaimed">0</b>粒米\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<div class="fr claim_wrap">\r\n		<div class="claim">\r\n			<span class="size18 mb10">\r\n				已领\r\n			</span>\r\n			<span class="size16">\r\n				<i class="icon_mi_w"></i>\r\n				<b id="claim">0</b>粒米\r\n			</span>\r\n		</div>\r\n	</div>\r\n</div>\r\n<div class="signin_item clearfix positionR">\r\n	<div class="fl left_title clearfix">\r\n		<img class="fl img34" src="';
$out+=$escape(IMG_PATH);
$out+='signin.png"/>\r\n		<div class="fl ml15">\r\n			<span class="mb10">10天签到</span><br />\r\n			<span>\r\n				<i class="icon_mi_r"></i>\r\n				21粒米\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<span class="fr skip_btn" id="signBtn" style="display:none">签到</span>\r\n</div>\r\n<div class="signin_item clearfix positionR mt5" style="display: none" id="bindMobileBox">\r\n	<div class="fl left_title clearfix">\r\n		<img class="fl img34" src="';
$out+=$escape(IMG_PATH);
$out+='validate.png"/>\r\n		<div class="fl ml15">\r\n			<span class="mb10">验证手机</span><br />\r\n			<span>\r\n				<i class="icon_mi_r"></i>\r\n				8粒米\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<span class="fr skip_btn" id="bindMobile">验证</span>\r\n</div>\r\n<div class="signin_item clearfix positionR mt5">\r\n	<div class="fl left_title clearfix">\r\n		<img class="fl img34" src="';
$out+=$escape(IMG_PATH);
$out+='recharge_mi.png"/>\r\n		<div class="fl ml15">\r\n			<span class="mb10">充值送米</span><br />\r\n			<span class="color_red">\r\n				冲100送<span id="presentAmount"></span>（不限次数）\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<span class="fr skip_btn" id="recharge">充值</span>\r\n</div>\r\n<div class="signin_item clearfix positionR mt5">\r\n	<div class="fl left_title clearfix">\r\n		<img class="fl img34" src="';
$out+=$escape(IMG_PATH);
$out+='lucky_draw.png"/>\r\n		<div class="fl ml15">\r\n			<span class="mb10">免费抽奖</span><br />\r\n			<span class="color_red">\r\n				抽iphone、正品球衣\r\n			</span>\r\n		</div>\r\n	</div>\r\n	<span class="fr skip_btn" id="luckyDraw">去抽奖</span>\r\n</div>\r\n<div class="mask" id="signMask" style="display: none">\r\n	<div class="signin_pop" id="signPop">\r\n		<img class="signin_img" src="';
$out+=$escape(IMG_PATH);
$out+='signin_img.png"/>\r\n		<ul class="signin_content" id="signDay">\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 1 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 2 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 3 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 4 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR color3">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 5 天</span>\r\n				<span>5粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 6 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 7 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 8 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第 9 天</span>\r\n				<span>1粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n			<li class="positionR color3">\r\n				<span class="gray_dot"></span>\r\n				<span class="ml15">第10天</span>\r\n				<span>8粒米</span>\r\n				<span class="signStatus" style="display: none">已领</span>\r\n			</li>\r\n		</ul>\r\n		<div class="signin_btn mt10 mb10">\r\n			<span class="sigin_confirm" id="confirmSign">点击签到</span>\r\n			<span class="sigin_cancel" id="cancelSign">取消</span>\r\n		</div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/smlrComboList',function(require,exports){var templateUtils = (function (){
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
define('view/smlrList',function(require,exports){var templateUtils = (function (){
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
})();});
define('view/ssq',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ssqNum=ssqNum;exports.ssqBet=ssqBet;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function ssqNum($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="close_time"><span id="issue"></span>期投注截止：<span class="size14 color_red" id="endTime"></span></p>\r\n	<div class="clearfix btn-tips">\r\n		<span class="fl filter_btn" @click="chooseRandomBall()">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="fr color6 tips">\r\n			至少选择6个红球 1个篮球\r\n		</span>\r\n	</div>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="redBallList">\r\n			<li class="fl" v-for="item in redBall">\r\n				<span class="red_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.redNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="blueBallList">\r\n			<li class="fl" v-for="item in blueBall">\r\n				<span class="blue_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.blueNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{singleUnit*2}} 元</span></div>\r\n				<div class="bonus">注数：{{singleUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="ensureSelect()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ssqBet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex btn_wrap">\r\n		<span class="ui-flex_item filter_btn" @click="addRandomList(1)">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="addRandomList(5)">\r\n			<span class="add_sign"></span>\r\n			机选5注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="backToSsq()">\r\n			<span class="add_sign"></span>\r\n			手动选号\r\n		</span>\r\n	</div>\r\n	<div class="num_list mt10"> \r\n		<ul class="jxlist">\r\n			<li v-for="item in ssqItems">\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n						<em class="size20" v-for="redball in item.redballs">{{redball}}</em>\r\n					</span>\r\n<!--					--><span class="blue_ball">\r\n						<em class="size20" v-for="blueball in item.blueballs">{{blueball}}</em>\r\n					</span>\r\n				</div>\r\n				<a class="del_btn">\r\n					<span class="del" @click="cancel(item)"></span>\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pb10">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div>\r\n		<div class="mutiple_warp">\r\n			<span class="mr5">投</span>\r\n			<span class="icon_decrease_multiple mr10" @click="changeValue(-1)"></span>\r\n			<input type="number" v-model="multiple" maxlength="2" value="10" min="10" max="10000" />\r\n			<span class="icon_add_multiple ml10" @click="changeValue(1)"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{prize}} 元</span></div>\r\n				<div class="bonus">注数：{{totalUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="createSubmit()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/supplierTicketOrderDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.previewImage=previewImage;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,orderNumeric=$data.orderNumeric,ticketOrder=$data.ticketOrder,status=$data.status,ticketMultiple=$data.ticketMultiple,planRealName=$data.planRealName,planNickName=$data.planNickName,planUserName=$data.planUserName,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,maxTicketPrizeAmount=$data.maxTicketPrizeAmount,ticketStatus=$data.ticketStatus,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,matchList=$data.matchList,length=$data.length,resourceList=$data.resourceList,planMatchType=$data.planMatchType,matchBettypeName=$data.matchBettypeName,$escape=$helpers.$escape,i=$data.i,match=$data.match,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,oddsId=$data.oddsId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,nullOdds=$data.nullOdds,concede=$data.concede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,j=$data.j,bettypeResult=$data.bettypeResult,number=$data.number,D=$data.D,g=$data.g,text=$data.text,$1=$data.$1,$2=$data.$2,prefixMap=$data.prefixMap,$string=$helpers.$string,name=$data.name,$out='';
	var orderNumeric = ticketOrder.orderNumeric || "";
	var status = ticketOrder.status;
	var ticketMultiple = ticketOrder.ticketMultiple || 1;
	var planRealName = ticketOrder.planRealName || "";
	var planNickName = ticketOrder.planNickName || "";
	var planUserName = planRealName || planNickName;
	var amount = ticketOrder.amount/100 || 0;
	var ticketPrizeAmount = (ticketOrder.ticketPrizeAmount/100 || 0).toFixed(2);
	var maxTicketPrizeAmount = (ticketOrder.maxTicketPrizeAmount/100 || 0).toFixed(2);
	var ticketStatus = ticketOrder.ticketStatus;
	var imgMap = {"1":"cpsb","2":"dkj","3":"wzj","4":"yzj"};
	var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖"};
	var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchList = ticketOrder.matchList || [];
	var length = matchList.length;
	var resourceList = ticketOrder.resourceList || [];
	resourceList = resourceList.join('|');
	var planMatchType = ticketOrder.planMatchType || 1;
	var matchBettypeName = ticketOrder.matchBettypeName || '';

$out+='\r\n	<div class="sta_wrap">\r\n		<div class="win_wrap">\r\n			';
 if (ticketStatus == 0) { 
$out+='\r\n			<span class="btn" id="uploadBtn">\r\n				上传票样\r\n				<input type="file" name="" id="ticketSelect" value="" multiple/>\r\n			</span>\r\n			<div class="size12 mt5">\r\n				理论最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元</span>\r\n			</div>\r\n			';
 } if (ticketStatus == 5) { 
$out+='\r\n				<div class="ypj">\r\n					<span class="ypj_txt">\r\n						<i class="icon_ypj"></i>\r\n						已派奖	\r\n					</span><br />\r\n					<span class="bonus">';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 4 || ticketStatus == 6) { 
$out+='\r\n				';
 if (ticketPrizeAmount != 0) { 
$out+='\r\n					<div class="ypj" id="prizeSend">\r\n						<span class="ypj_txt">\r\n							<i class="icon_yzj_s"></i>\r\n							待派奖	\r\n						</span><br />\r\n						<span class="bonus" id="prize">';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="win_amount clearfix" id="ticketPrize">\r\n						<input class="fl" type="number" name="" id="ticketPrizeAmount" value="" placeholder="请输入中奖金额"/>\r\n						<span class="fr btn" id="prizeSure">确定</span>\r\n					</div>\r\n				';
 } 
$out+='\r\n			';
 } else if (ticketStatus == 2)　{ 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n				<div class="size12 mt5">\r\n					理论最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 3) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n			';
 }　
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			<div class="con_tit clearfix">\r\n				<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n			';
if (ticketStatus == 0) { 
$out+='\r\n				<span class="fr color_g check_ticket" id="refuseTicket">拒绝此单</span>\r\n			';
 } else if ((ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) && resourceList) { 
$out+='\r\n				<span class="fr color_g check_ticket" id="showTicketImg" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='" resourceList="';
$out+=$escape(resourceList);
$out+='">查看票样</span>\r\n			';
 } 
$out+='\r\n			</div>\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					<th>状态</th>\r\n				</tr>\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(ticketMultiple);
$out+='</td>\r\n				';
 if(ticketStatus == 0) { 
$out+='\r\n					<td>未出票</td>\r\n				';
 } else if(ticketStatus == 1 || status == 3) { 
$out+='\r\n					<td>出票失败</td>\r\n				';
 } else if(ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) { 
$out+='\r\n					<td>已出票</td>\r\n				';
 } 
$out+='\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	</div>\r\n	<div class="dty_cont">\r\n		<!--<h3 class="con_tit">跟单内容：</h3>-->\r\n		<div class="con_tit clearfix">\r\n			<span class="fl">玩法：<span class="color_g">';
$out+=$escape(matchBettypeName);
$out+='</span></span>\r\n			<span class="fr">过关方式：\r\n				';
 if(length == 1) { 
$out+='\r\n				<span class="color_g">单关</span>\r\n				';
 } else if (length > 1) { 
$out+='\r\n				<span class="color_g">';
$out+=$escape(length);
$out+='串1</span>\r\n				';
 } 
$out+='			\r\n			</span>\r\n		</div>\r\n		<div class="matchInfo_box">\r\n		';
 
			for (var i = 0; i < length; i++) { 
				var match = matchList[i] || {};
				var recommend = match.recommend || [];
				var prize = match.prize || [];
				var matchId = match.matchId || 0;
				var oddsId = match.oddsId || 0;
				var bettypeContent = match.bettypeContent || "";
				var recommendLength = recommend.length;
				if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
					continue;
				}
				match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
				var nullOdds = '--';//赔率为空显示值
				var concede = match.concede;
				var bettypeOdds = match.bettypeOdds || {};
				var bettype = match.bettypeValue || {};
				var recommendMap = {};
				for (var j = 0; j < recommendLength; j++) {
					recommendMap[recommend[j]] = true;
				}
				var bettypeResult = match.bettypeResult || {};
				var number = match.number.replace(/(\D+)(\d+)/g, function(text, $1, $2) {
					var prefixMap = {'周一':'1','周二':'2','周三':'3','周四':'4','周五':'5','周六':'6','周日':'7'}
					return prefixMap[$1]+$2;	
				});
			
$out+='\r\n				<div class="matchInfo_wrap">\r\n					<div class="matchInfo clearfix">\r\n						<span class="size14 fl match_name" style="';
$out+=$escape(planMatchType == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n						<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n					</div>\r\n					<div class="ui-flex color3">\r\n						<div class="ui-flex_item ellipsis">';
$out+=$string(planMatchType == 2 ? match.away : match.home);
$out+='</div>\r\n						 ';
 if (match.result) { 
$out+='\r\n							';
 if (bettypeContent == "BQC") { 
$out+='\r\n							<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n							';
 } else { 
$out+='\r\n							<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							vs\r\n						';
 } 
$out+=' \r\n						<div class="ui-flex_item ellipsis textR">';
$out+=$string(planMatchType == 2 ? match.home : match.away);
$out+='</div>\r\n					</div>\r\n				';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n				<div class="ui-flex flex_wrap pl40">\r\n					<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n					<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n				</div>\r\n				';
 } else if (bettypeContent == 'SF' || bettypeContent == 'RFSF') { 
$out+='\r\n					<div class="ui-flex mt15 positionR">\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						';
 if (bettypeContent == "RFSF") { 
$out+='\r\n							<div class="textBar ui-flex_item ml10 positionR" style="';
$out+=$escape(concede > 0 ? 'color: #f63946' : 'color: #0c9862');
$out+='">主 ';
$out+=$string(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n						';
 } 
$out+='\r\n						<div class="textBar ui-flex_item positionR ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					</div>\r\n				';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n					<div class="ui-flex mt15 flex_wrap">\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大分 ';
$out+=$escape(bettypeOdds["D"]);
$out+=$string(bettypeResult["D"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						<div class="textBar ui-flex_item ml10 positionR" style="color: #f63946;">总分 ';
$out+=$escape(concede);
$out+='</div>\r\n						<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小分 ';
$out+=$escape(bettypeOdds["X"]);
$out+=$string(bettypeResult["X"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="ui-flex flex_wrap">\r\n						';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n						<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						';
 } 
$out+='\r\n						';
 
						if (prize.length <= 0) {
							for (var name in bettypeResult) {
								if (!bettypeResult[name]) {
									continue;
								}
						
$out+='\r\n							<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n						';

							}
						}
						
$out+='\r\n					</div>\r\n				';
 } 
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function previewImage($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,ticketStatus=$data.ticketStatus,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="showImg" style="background-color: #000000;overflow: auto;">\r\n	<div class="header">\r\n		<div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header" id="backBtn"></span>\r\n				票样\r\n			';
 if (ticketStatus == 2) { 
$out+='\r\n			<span class="rightIcon_top color14" id="changeBtn">更换\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:0;opacity:0;" class="change_img" type="file" name="" id="" value="" multiple /></span>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	<div style="position: relative;">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/supplierTicketOrderList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.supplierTicketOrderList=supplierTicketOrderList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,type=$data.type,$out='';$out+='<div class="tabBar">\r\n		<div class="ui-flex bg_c_f" id="typeList">\r\n			<div class="ui-flex_item ';
$out+=$escape(type==1?'active':'');
$out+='" type="1">\r\n				<span class="positionR">\r\n					未打票\r\n					<!--<b class="red_dot"></b>-->\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==2?'active':'');
$out+='" type="2">\r\n				<span>\r\n					已打票\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==3?'active':'');
$out+='" type="3">\r\n				<span class="positionR">\r\n					待派奖\r\n					<b class="tips_num" id="tipsNum" style="display: none;"></b>\r\n				</span>\r\n			</div>\r\n			<span class="vline"></span>\r\n			<div class="ui-flex_item ';
$out+=$escape(type==4?'active':'');
$out+='" type="4">\r\n				<span>\r\n					已派奖\r\n				</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="textC mt5" id="statistics" style="display: none;">共 <span class="color_red" id="totalCount"></span> 单， <span class="color_red" id="totalMoney"> </span>元</div>\r\n	<ul class="mt5 wdp" id="supplierTicketOrderList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function supplierTicketOrderList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,supplierTicket=$data.supplierTicket,orderNo=$data.orderNo,orderNumeric=$data.orderNumeric,ticketStatus=$data.ticketStatus,ticketPrizeAmount=$data.ticketPrizeAmount,type=$data.type,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,$escape=$helpers.$escape,$out='';  for (var i = 0, length = list.length; i < length; i++) {
		var supplierTicket = list[i] || {};
		var orderNo = supplierTicket.orderNo;
		var orderNumeric = supplierTicket.orderNumeric;
		var ticketStatus = supplierTicket.ticketStatus;
		var ticketPrizeAmount = supplierTicket.ticketPrizeAmount/100 || 0;
		var type = type;
		var imgMap = {"2":"icon_dkj_s","3":"icon_wzj_s","4":"icon_yzj_s","5":"icon_ypj"};
		var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖"};
		var createTime = supplierTicket.createTime && supplierTicket.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	';
 if (type == 1) { 
$out+='\r\n		<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n			<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n			<span class="fr color6">未打票<span class="arrow_right"></span></span>\r\n		</li>\r\n		<!-- <li class="bg_c_f" orderNo="';
$out+=$escape(orderNo);
$out+='">\r\n			<div class="ui-flex mb5">\r\n				<span class="ui-flex_item size13">距离出票截止</span>\r\n				<span class="ui-flex_item textR">竞足</span>\r\n			</div>\r\n			<div class="ui-flex">\r\n				<span class="ui-flex_item count_time">1小时20分</span>\r\n				<span class="ui-flex_item textR"><span class="color_red">40</span>元</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</li> -->\r\n	';
 } else if (type == 2) { 
$out+='\r\n		<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n			<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n			';
 if (ticketStatus == 5) { 
$out+='\r\n				<span class="fr color6"><span class="color_red">中';
$out+=$escape(ticketPrizeAmount);
$out+='</span><span class="arrow_right"></span></span>\r\n			';
 } else { 
$out+='\r\n				<span class="fr win_status">\r\n					';
 if (ticketStatus == 4 || ticketStatus == 6) { 
$out+='\r\n					<i class="icon_yzj_s"></i>\r\n					<span>已中奖</span>\r\n					';
 } else { 
$out+='\r\n					<i class="';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n					<span>';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='</span>\r\n					';
 } 
$out+='\r\n					<span class="arrow_right attention_right"></span>\r\n				</span>\r\n			';
 } 
$out+='\r\n		</li>\r\n	';
 } else if (type == 3 || type == 4) { 
$out+='\r\n	<li class="clearfix bg_c_f" orderNo=';
$out+=$escape(orderNo);
$out+='>\r\n		<span class="fl">';
$out+=$escape(orderNumeric);
$out+=' (';
$out+=$escape(createTime);
$out+=')</span>\r\n		<span class="fr color6"><span class="color_red">';
$out+=$escape(ticketPrizeAmount==0?'请填写奖金':'中'+ticketPrizeAmount);
$out+='</span><span class="arrow_right"></span></span>\r\n	</li>\r\n	';
 } 
$out+='\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/supplierTicketStatistics',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,nickName=$data.nickName,ticketStatistics=$data.ticketStatistics,realName=$data.realName,userName=$data.userName,ticketTotalAmount=$data.ticketTotalAmount,prizeTotalAmount=$data.prizeTotalAmount,depositTotalAmount=$data.depositTotalAmount,spareTotalAmount=$data.spareTotalAmount,ticketAmountList=$data.ticketAmountList,length=$data.length,$escape=$helpers.$escape,i=$data.i,date=$data.date,amount=$data.amount,$out='';
	var nickName = ticketStatistics.nickName;
	var realName = ticketStatistics.realName;
	var userName = realName || nickName;
	var ticketTotalAmount = ticketStatistics.ticketTotalAmount/100 || 0;
	var prizeTotalAmount = (ticketStatistics.prizeTotalAmount/100 || 0).toFixed(2);
	var depositTotalAmount = ticketStatistics.depositTotalAmount/100 || 0;
	var spareTotalAmount = (ticketStatistics.spareTotalAmount/100 || 0).toFixed(2);
	var ticketAmountList = ticketStatistics.ticketAmountList || [];
	var length = ticketAmountList.length;

$out+='\r\n	<ul class="ticket_detail">\r\n		<li class="textC mb15">出票人：';
$out+=$escape(userName);
$out+='</li>\r\n		<li>共出票：<span class="color_red">';
$out+=$escape(ticketTotalAmount);
$out+='</span>元</li>\r\n		<li>共中奖：<span class="color_red">';
$out+=$escape(prizeTotalAmount);
$out+='</span>元</li>\r\n		<li>预付出票款：<span class="color_g">';
$out+=$escape(depositTotalAmount);
$out+='</span>元</li>\r\n		<li>剩余出票款：<span class="color_g">';
$out+=$escape(spareTotalAmount);
$out+='</span>元</li>\r\n	</ul>\r\n	<ul class="month_bill">\r\n		';
 for (var i = 0; i < length; i++) { 
			var date = ticketAmountList[i].date;
			var amount = ticketAmountList[i].amount/100 || 0;	
		
$out+='\r\n			<li class="item ui-flex">\r\n				<span>';
$out+=$escape(date);
$out+='</span>\r\n				<span class="color6">出票：';
$out+=$escape(amount);
$out+='元</span>\r\n			</li>\r\n		';
 } 
$out+='\r\n	</ul>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ticketFollow',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.planList=planList;exports.digitalPlanList=digitalPlanList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="banner_son">\r\n		<a href="javascript:;"><img src="';
$out+=$escape(IMG_PATH);
$out+='abanner1.png" /></a>\r\n	</div>\r\n	<div class="content_tab clearfix" id="recommendTab">\r\n		<span matchType="1">竞彩足球</span>\r\n		<span matchType="2">竞彩篮球</span>\r\n		<span matchType="3">福彩3D</span>\r\n	</div>\r\n	<ul class="infoBox" id="planList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = (plan.access || false)+"";
	var matchList = plan.matchList || [];
	var match = (matchList.length>0 && matchList[0]) || {};
	var matchNum = matchList.length;
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="msg color9 clearfix">\r\n				<img class="icon_span img29 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='" />\r\n				<span class="personal">\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n				</span>\r\n				';
 if (continueWin > 1) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">';
$out+=$escape(continueWin);
$out+='连红</span></div>\r\n				';
 } else if(winCount > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">10中';
$out+=$escape(winCount);
$out+='</span></div>\r\n				';
 } else if (profitRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">盈';
$out+=$escape(profitRate);
$out+='%</span></div>\r\n				';
 } else if (winRate > 0) { 
$out+='\r\n					<div class="fr combat_gains">战绩 <span class="color_red">胜';
$out+=$escape(winRate);
$out+='%</span></div>\r\n				';
 } else { 
$out+='\r\n					\r\n				';
 }
$out+='\r\n			</div>\r\n			<div class="recommend_item">\r\n				<p class="recommend_title">\r\n					';
 if (hasPic) {
$out+='\r\n						<span class="">【实单】</span>\r\n					';
 } 
$out+='\r\n					';
 if (title) { 
$out+='\r\n						';
$out+=$escape(title);
$out+='\r\n					';
 } else { 
$out+='\r\n						';
 
							for (var j = 0; j < matchNum; j++) { 
								var match = matchList[j] || {};
								var home = match.home;
								var away = match.away;
								var number = match.number;
						
$out+='\r\n							<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n				</p>\r\n				<div class="clearfix mt25">\r\n					<span class="recommend_money fl">\r\n						';
 if (/^true$/i.test(access)) { 
$out+='\r\n							';
 if (amount == 0) { 
$out+='\r\n								<span class="color_red">免费</span>\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">查看</span>\r\n							';
 } 
$out+='\r\n						';
 } else { 
$out+='\r\n							<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n						';
 } 
$out+='\r\n					</span>\r\n					<span class="recommend_time fr">\r\n						截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n					</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class="documentary_bet ui-flex">\r\n			<div class="documentary_num">\r\n				用户跟投：\r\n				<span class="color_red size13">\r\n					';
$out+=$escape(saleTicketAmount);
$out+='元\r\n				</span>\r\n			</div>\r\n			';
 if (isSale) { 
$out+='\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalPlanList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,access=$data.access,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,rich=$data.rich,matchType=$data.matchType,isSale=$data.isSale,recommendCount=$data.recommendCount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,issue=$data.issue,$escape=$helpers.$escape,$=$data.$,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var access = (plan.access || false)+"";
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var rich = plan.rich || false;
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale; //false:不能跟单投注 true:可以跟单
	var recommendCount = plan.recommendCount;
	var betContent = plan.betContentList[0] || {};
	var betContentResult = betContent.betContentResult || {};
	var name = betContentResult.name;
	var lotteryIssue = plan.lotteryIssue || {};
	var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var issue = lotteryIssue.issue;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="msg color9 clearfix">\r\n			<img class="icon_span img38 userProfile" src="';
$out+=$escape(userImg);
$out+='" userNo="';
$out+=$escape(userNo);
$out+='"></img>\r\n			<span class="personal">\r\n				<span>\r\n					<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n					';
 if (continueWin > 1) { 
$out+='\r\n						<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n					';
 } else if(winCount > 0) { 
$out+='\r\n						<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n					';
 } else if (profitRate > 0) { 
$out+='\r\n						<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n					';
 } else if (winRate > 0) { 
$out+='\r\n						<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n					';
 } 
$out+='\r\n				</span><br />\r\n				<span class="size10 tag">';
$out+=$escape(userTag);
$out+='</span>\r\n			</span>\r\n			';
 if (isSale) { 
$out+='\r\n			<span class="ticket size10 fr userTicket" planNo="';
$out+=$escape(planNo);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n			';
 } 
$out+='\r\n		</div>\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\r\n						开奖：';
$out+=$escape(drawTime);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (/^true$/i.test(access)) { 
$out+='\r\n					';
 if (amount == 0) { 
$out+='\r\n						<span>免费</span>\r\n					';
 } else { 
$out+='\r\n						<span>查看</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ticketOrderDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.ticketOrder=ticketOrder;exports.previewImage=previewImage;exports.orderTicketList=orderTicketList;exports.userFollowList=userFollowList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isSelfTicket=$data.isSelfTicket,ticketOrder=$data.ticketOrder,orderNumeric=$data.orderNumeric,status=$data.status,ticketMultiple=$data.ticketMultiple,ticketPassType=$data.ticketPassType,g=$data.g,x=$data.x,planRealName=$data.planRealName,planNickName=$data.planNickName,planUserName=$data.planUserName,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,maxTicketPrizeAmount=$data.maxTicketPrizeAmount,ticketSendPrizeAmount=$data.ticketSendPrizeAmount,ticketStatus=$data.ticketStatus,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,matchList=$data.matchList,length=$data.length,resourceList=$data.resourceList,isTSP=$data.isTSP,ticketPrizeDivideStatus=$data.ticketPrizeDivideStatus,ticketPrizeDivideAmount=$data.ticketPrizeDivideAmount,lotteryId=$data.lotteryId,betContentList=$data.betContentList,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,ticketAttachPrizeAmount=$data.ticketAttachPrizeAmount,ticketFollowGainAmount=$data.ticketFollowGainAmount,tickeTotalAmount=$data.tickeTotalAmount,$=$data.$,lotteryName=$data.lotteryName,guessList=$data.guessList,publish=$data.publish,isSale=$data.isSale,isSelf=$data.isSelf,followNo=$data.followNo,followCount=$data.followCount,maxTicketPrizeRate=$data.maxTicketPrizeRate,betAmount=$data.betAmount,maxBettypeOdds=$data.maxBettypeOdds,user=$data.user,betTag=$data.betTag,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,betTagMap=$data.betTagMap,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,i=$data.i,ssq=$data.ssq,betContent=$data.betContent,redBall=$data.redBall,blueBall=$data.blueBall,betContentResult=$data.betContentResult,redActive=$data.redActive,blueActive=$data.blueActive,redBallUnit=$data.redBallUnit,blueBallUnit=$data.blueBallUnit,list=$data.list,selectNum=$data.selectNum,name=$data.name,singleNum=$data.singleNum,singleNumKey=$data.singleNumKey,Object=$data.Object,activeNum=$data.activeNum,match=$data.match,oddsId=$data.oddsId,odds=$data.odds,team=$data.team,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,nullOdds=$data.nullOdds,concede=$data.concede,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,bettypeResult=$data.bettypeResult,number=$data.number,type=$data.type,$string=$helpers.$string,$out='';
	var isSelfTicket = ticketOrder.isSelfTicket; // 是否自购单
	var orderNumeric = ticketOrder.orderNumeric || "";
	var status = ticketOrder.status;
	var ticketMultiple = ticketOrder.ticketMultiple || 1;
	var ticketPassType = ticketOrder.ticketPassType || '';
	ticketPassType = ticketPassType.replace(/1x1/g, '单关');
	ticketPassType = ticketPassType.replace(/x/g, '串');
	var planRealName = ticketOrder.planRealName || "";
	var planNickName = ticketOrder.planNickName || "";
	var planUserName = planRealName || planNickName;
	var amount = ticketOrder.amount/100 || 0;
	var ticketPrizeAmount = +(ticketOrder.ticketPrizeAmount/100 || 0).toFixed(2);
	var maxTicketPrizeAmount = (ticketOrder.maxTicketPrizeAmount/100 || 0).toFixed(2);
	var ticketSendPrizeAmount = (ticketOrder.ticketSendPrizeAmount/100 || 0).toFixed(2);
	var ticketStatus = ticketOrder.ticketStatus;
	var imgMap = {"0":"zzcp","1":"cpsb","2":"dkj","3":"wzj","4":"yzj","7":"zzcp","8":"dkj","9":"zzcp"};
	var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖","7":"正在出票","8":"部分出票","9":"正在出票"};
	var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchList = ticketOrder.matchList || [];
	var length = matchList.length;
	var resourceList = ticketOrder.resourceList || [];
	resourceList = resourceList.join('|');
	var isTSP = ticketOrder.isTSP;
	var ticketPrizeDivideStatus = ticketOrder.ticketPrizeDivideStatus; //0=不分成, 1=待分成, 2=已分成, 3=未分成
	var ticketPrizeDivideAmount = (ticketOrder.ticketPrizeDivideAmount/100 || 0).toFixed(2);
	var lotteryId = ticketOrder.lotteryId || '';
	var betContentList = ticketOrder.betContentList || [];
	var issue = ticketOrder.issue || '';
	var drawNumber = ticketOrder.drawNumber || '';
	if (lotteryId == 'FC3D') {
		drawNumber = drawNumber.split('|')[0];
	}
	var drawTime = ticketOrder.drawTime && ticketOrder.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || ""; //开奖时间
	var ticketAttachPrizeAmount = +(ticketOrder.ticketAttachPrizeAmount/100).toFixed(2) || 0;
	var ticketFollowGainAmount = +(ticketOrder.ticketFollowGainAmount/100).toFixed(2) || 0; //跟单分成
	var tickeTotalAmount = (ticketPrizeAmount + ticketAttachPrizeAmount + ticketFollowGainAmount - ticketPrizeDivideAmount).toFixed(2);
	tickeTotalAmount = (tickeTotalAmount + '').replace(/\.0+$/, '');
	var lotteryName = ticketOrder.lotteryName;
	var guessList = ticketOrder.guessList || [];//猜冠军
	var publish = ticketOrder.publish || 0; // 0=未发布， 1=已发布   （发布至跟单市场）
	var isSale = ticketOrder.isSale;
	var isSelf = ticketOrder.isSelf;
	var followNo = ticketOrder.followNo || '';
	var followCount = ticketOrder.followCount || 0;
	var maxTicketPrizeRate = ticketOrder.maxTicketPrizeRate;
	var betAmount = ticketOrder.betAmount/100;
	var maxBettypeOdds = (maxTicketPrizeAmount/(ticketMultiple*2)).toFixed(2);
	var user = ticketOrder.user || {}; //用户信息
	var betTag = user.betTag;
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var betTagMap = {'千元户' : 'thousand','万元户': 'ten-thousand', '十万元户': 'hundred-thousand'};

$out+='\r\n	<div class="sta_wrap">\r\n		<div class="win_wrap">\r\n			';
 if (ticketStatus == 5) { 
$out+='\r\n				<div class="ypj">\r\n					<span class="ypj_txt">\r\n						<i class="icon_ypj"></i>\r\n						已派奖	\r\n					</span><br />\r\n					<span class="bonus color_red">\r\n						';
$out+=$escape(tickeTotalAmount);
$out+='\r\n						';
 if (ticketAttachPrizeAmount > 0 || ticketFollowGainAmount > 0 || ticketPrizeDivideAmount > 0) { 
$out+='\r\n							<span class="size16">=中奖';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n						';
 if (ticketAttachPrizeAmount > 0 && ticketFollowGainAmount > 0) { 
$out+='\r\n							<span class="size16">+加奖';
$out+=$escape(ticketAttachPrizeAmount);
$out+='+跟单收成';
$out+=$escape(ticketFollowGainAmount);
$out+='</span>\r\n						';
 } else if (ticketAttachPrizeAmount > 0) { 
$out+='\r\n							<span class="size16">+加奖';
$out+=$escape(ticketAttachPrizeAmount);
$out+='</span>\r\n						';
 } else if (ticketFollowGainAmount > 0) { 
$out+='\r\n							<span class="size16">+跟单收成';
$out+=$escape(ticketFollowGainAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n						';
 if (ticketPrizeDivideStatus == 2) { 
$out+='\r\n							<span class="size16">-跟单分成';
$out+=$escape(ticketPrizeDivideAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n					</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 6) { 
$out+='\r\n				<div class="win_status">\r\n					已部分派奖	\r\n				</div>\r\n				<div class="size12">\r\n					<span class="color_red size12">';
$out+=$escape(ticketSendPrizeAmount);
$out+='</span>元<br /><span class="color9 size12">（剩下的部分会在出票店长确认中奖金额后派出，如果提前派奖金额超出实际中奖，将会扣除超出部分彩金）</span>\r\n				</div>\r\n			';
 } else if ((ticketStatus == 0 || ticketStatus == 2 || ticketStatus == 7) && (lotteryId == 'JCZQ' || lotteryId == 'JCLQ' || lotteryId == 'JZYP')) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='	\r\n				</div>\r\n				<div class="size12 mt5">\r\n					最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元<br /><span class="color9 size12">（最终奖金以出票完成的为准）</span>\r\n				</div>\r\n			';
 } else if (status == 3) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_ytk"></i>\r\n						已退款\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			';
 if (isSelf == true) { 
$out+='\r\n				<div class="con_tit clearfix">\r\n					<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n				';
 if ((ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) && resourceList) { 
$out+='\r\n					<span class="fr color_g check_ticket" id="showTicketImg" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='" resourceList="';
$out+=$escape(resourceList);
$out+='">查看票样</span>\r\n				';
 } else if (isTSP) { 
$out+='\r\n					<span class="fr color_g check_ticket" id="showTicketDetail" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='">出票详情</span>\r\n				';
 } 
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="color6 ui-flex user_msg">\r\n					<div>\r\n						<img class="icon_span img29" src="';
$out+=$escape(userImg);
$out+='">\r\n						<span class="personal">\r\n							<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n							<span class="icon ';
$out+=$escape(betTagMap[betTag]);
$out+='"></span>\r\n						</span>\r\n					</div>\r\n					<div class="size10">返奖：<span class="color_red">';
$out+=$escape(maxTicketPrizeRate);
$out+='%</span></div>\r\n				</div>\r\n			';
 } 
$out+='\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					';
 if (!isSelfTicket) { 
$out+='\r\n					<th>专家</th>\r\n					';
 } 
$out+='\r\n					<th>状态</th>\r\n				</tr>\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(ticketMultiple);
$out+='</td>\r\n					';
 if (!isSelfTicket) { 
$out+='\r\n					<td>';
$out+=$escape(planUserName);
$out+='\r\n					</td>\r\n					';
 } 
$out+='\r\n				';
 if (ticketStatus == 8 || status == 4) { 
$out+='\r\n					<td>部分出票</td>\r\n				';
 } else if (ticketStatus == 1 || status == 3) { 
$out+='\r\n					<td>出票失败</td>\r\n				';
 } else if (ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) { 
$out+='\r\n					<td>已出票</td>\r\n				';
 } else if (ticketStatus == 0 || ticketStatus == 7 || ticketStatus == 9) { 
$out+='\r\n					<td>正在出票</td>\r\n				';
 } 
$out+='\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	</div>\r\n	<div class="dty_cont">\r\n		<div class="con_tit clearfix">\r\n			';
 if ((lotteryId　==　'JCLQ' || lotteryId == 'JCZQ' || lotteryId == 'JZYP') && length != 0) { 
$out+='\r\n				<span class="fl">跟单内容：</span>\r\n				<span class="fr">过关方式：\r\n					<span class="color_g">';
$out+=$escape(ticketPassType);
$out+='</span>		\r\n				</span>\r\n			';
 } else { 
$out+='\r\n				<span class="fl">投注内容：</span>\r\n				';
 if (lotteryId　==　'SJBGJ' || lotteryId　==　'SJBGYJ') { 
$out+='\r\n					<span class="fr">过关方式：\r\n						<span class="color_g">单关</span>		\r\n					</span>\r\n				';
 }　
$out+='\r\n			';
 }　
$out+='\r\n		</div>\r\n		';
 if (lotteryId　==　'SSQ' || lotteryId　==　'DLT') { 
$out+='   <!--双色球详情-->\r\n			<div class="ssqInfo_box">\r\n				<p><span class="color_g">';
$out+=$escape(issue);
$out+='</span> 期</p>\r\n				';
 if (drawNumber) { 
$out+='\r\n					<div class="clearfix mt5">\r\n						<p class="fl num_title color9">开奖号码：</p>\r\n						<ul class="ssqlist fl">\r\n							<li>\r\n								<div class="num_wrap">\r\n									<span class="red_ball">\r\n									';
 
										var drawNumberRed;
										if (lotteryId　==　'SSQ') {
											drawNumberRed = drawNumber.split('|')[0].split(",");
										} else if (lotteryId　==　'DLT') {
											drawNumberRed = drawNumber.split('+')[0].split(",");
										}
										for (var j = 0; j < drawNumberRed.length; j++) { 
											var drawNumberRedUnit = drawNumberRed[j];
									
$out+='\r\n										<em class="active">';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n									';
 } 
$out+='\r\n									</span> \r\n									<span class="blue_ball">\r\n									';
 
										var drawNumberBlue;
										if (lotteryId　==　'SSQ') {
											drawNumberBlue = drawNumber.split('|')[1].split(",")
										} else if (lotteryId　==　'DLT') {
											drawNumberBlue = drawNumber.split('+')[1].split(",")
										}
										for (var k = 0; k < drawNumberBlue.length; k++) { 
											var drawNumberBlueUnit = drawNumberBlue[k];
									
$out+='\r\n										<em class="active">';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n									';
 } 
$out+='\r\n									</span>\r\n								</div>\r\n							</li>\r\n						</ul>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="clearfix mt5">\r\n					<p class="fl num_title color9">投注号码：</p>\r\n					<ul class="ssqlist fl">\r\n					';
 
						for (var i = 0; i < betContentList.length; i++) { 
							var ssq = betContentList[i] || {};
							var betContent = ssq.betContent || "";
							var redBall;
							var blueBall;
							if (lotteryId　==　'SSQ') {
								redBall = betContent.split('|')[0].split(",");
							} else if (lotteryId　==　'DLT') {
								redBall = betContent.split('+')[0].split(",")
							}
							if (lotteryId　==　'SSQ') {
								blueBall = betContent.split('|')[1].split(",");
							} else if (lotteryId　==　'DLT') {
								blueBall = betContent.split('+')[1].split(",");
							}
							var betContentResult = ssq.betContentResult || {};
							var redActive = betContentResult["red"] || {};
							var blueActive = betContentResult["blue"] || {}
					
$out+='\r\n						<li>\r\n							<div class="num_wrap">\r\n								<span class="red_ball">\r\n								';
 
									for (var j = 0; j < redBall.length; j++) { 
										var redBallUnit = redBall[j];
								
$out+='\r\n									<em class="';
$out+=$escape(drawNumber ? 'borderC' : '');
$out+=' ';
$out+=$escape(redActive[redBallUnit] ? 'active' : '');
$out+='">';
$out+=$escape(redBallUnit);
$out+='</em>\r\n								';
 } 
$out+='\r\n								</span> \r\n								<span class="blue_ball">\r\n								';
 
									for (var k = 0; k < blueBall.length; k++) { 
										var blueBallUnit = blueBall[k];
								
$out+='\r\n									<em class="';
$out+=$escape(drawNumber ? 'borderC' : '');
$out+=' ';
$out+=$escape(blueActive[blueBallUnit] ? 'active' : '');
$out+='">';
$out+=$escape(blueBallUnit);
$out+='</em>\r\n								';
 } 
$out+='\r\n								</span>\r\n							</div>\r\n						</li>\r\n						';
 } 
$out+='\r\n					</ul>\r\n				</div>\r\n				';
 if (!drawNumber) { 
$out+='\r\n				<p class="mt5"><span class="color9 size13">开奖时间：</span>\r\n					<span class="color6 size13">';
$out+=$escape(drawTime);
$out+='</span>\r\n				</p>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if　(lotteryId　==　'JSK3' || lotteryId　==　'GX11X5' || lotteryId　==　'FC3D') { 
$out+='  <!--江苏快3、11选5-->\r\n			<div class="ssqInfo_box">\r\n				<p><span class="color_g">';
$out+=$escape(issue);
$out+='</span> 期</p>\r\n				';
 if (drawNumber) { 
$out+='\r\n					<div class="mt5">\r\n						<p class="num_title color9">开奖号码：<span class="color_red">';
$out+=$escape(drawNumber);
$out+='</span></p>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="mt5">\r\n					<ul class="">\r\n					';
 
						for (var i = 0; i < betContentList.length; i++) { 
							var list = betContentList[i] || {};
							var betContent = list.betContent || "";
							var betContentResult = list.betContentResult || {};
							var selectNum = betContentResult.value || [];
							var name = betContentResult.name || '';
					
$out+='\r\n						<li class="mb5">\r\n							<div class="num_wrap">\r\n								<span class="num_title color9">';
$out+=$escape(name);
$out+='：</span>\r\n								<span>\r\n									';
 
										for (var j = 0; j < selectNum.length; j++) { 
											var singleNum = selectNum[j];
											var singleNumKey = Object.keys(singleNum)[0];
											var activeNum = singleNum[singleNumKey];
									
$out+='\r\n									<span class="';
$out+=$escape(activeNum ? 'color_red' : '');
$out+='">';
$out+=$escape(singleNumKey);
$out+='</span>\r\n									';
 } 
$out+='\r\n								</span>\r\n							</div>\r\n						</li>\r\n						';
 } 
$out+='\r\n					</ul>\r\n				</div>\r\n				';
 if (!drawNumber) { 
$out+='\r\n				<div><span class="color9">开奖时间：</span>';
$out+=$escape(drawTime);
$out+='</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if　(lotteryId　==　'SJBGJ' || lotteryId　==　'SJBGYJ') { 
$out+=' \r\n			<div class="matchInfo_box">\r\n				<div class="matchInfo_wrap">\r\n					<div class="mb10">';
$out+=$escape(lotteryName);
$out+='</div>\r\n					<div class="ui-flex worldcup_selected color3">\r\n					';
 
						var length = guessList.length;
						for (var i = 0; i < length; i++) { 
							var match = guessList[i] || {};
							var oddsId = match.oddsId || 0;
							var odds = match.odds;
							var team = match.team;
					
$out+='\r\n						';
 if (lotteryId　==　'SJBGJ' && length > 1) { 
$out+='\r\n							<div class="textBar gj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } else if (lotteryId　==　'SJBGYJ') { 
$out+='\r\n							<div class="textBar gyj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } else { 
$out+='\r\n							<div class="textBar ui-flex_item ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n		';
 } else { 
$out+='  <!--篮球足球-->\r\n			';
 if (length == 0) { 
$out+='\r\n				<div class="noMatch_box">\r\n					<div class="no_match ui-flex">\r\n						<img class="no_match_img" src="';
$out+=$escape(IMG_PATH);
$out+='documentary_noMatchImg.png" /> \r\n					</div>\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="matchInfo_box">\r\n				';
 
					for (var i = 0; i < length; i++) { 
						var match = matchList[i] || {};
						var recommend = match.recommend || [];
						var prize = match.prize || [];
						var matchId = match.matchId || 0;
						var oddsId = match.oddsId || 0;
						var bettypeContent = match.bettypeContent || "";
						var recommendLength = recommend.length;
						if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
							continue;
						}
						match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
						var nullOdds = '--';//赔率为空显示值
						var concede = match.concede;
						var Hconcede;
						var Aconcede;
						if (concede > 0) {
							Hconcede = '+' + (concede);
							Aconcede = -concede;
						} else {
							Hconcede = concede;
							Aconcede = '+' + (-concede)
						}
						var bettypeOdds = match.bettypeOdds || {};
						var bettype = match.bettypeValue || {};
						var recommendMap = {};
						for (var j = 0; j < recommendLength; j++) {
							recommendMap[recommend[j]] = true;
						}
						var bettypeResult = match.bettypeResult || {};
						var number = match.number;
						var type = match.type || 1;
					
$out+='\r\n						<div class="matchInfo_wrap">\r\n							<div class="matchInfo clearfix">\r\n								<span class="size14 fl match_name" style="';
$out+=$escape(type == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n								<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n							</div>\r\n							<div class="ui-flex color3">\r\n								<div class="ui-flex_item ellipsis">';
$out+=$string(type == 2 ? match.away : match.home);
$out+='</div>\r\n								 ';
 if (match.result) { 
$out+='\r\n									';
 if (bettypeContent == "BQC") { 
$out+='\r\n									<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n									';
 } else { 
$out+='\r\n									<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n									';
 } 
$out+='\r\n								';
 } else { 
$out+='\r\n									vs\r\n								';
 } 
$out+=' \r\n								<div class="ui-flex_item ellipsis textR">';
$out+=$string(type == 2 ? match.home : match.away);
$out+='</div>\r\n							</div>\r\n						';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n						<div class="ui-flex flex_wrap pl40">\r\n							<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						</div>\r\n						';
 } else if (bettypeContent == 'SF' && lotteryId == 'JZYP') { 
$out+='\r\n							<div class="ui-flex mt15 positionR yapan">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n							</div>\r\n						';
 } else if (bettypeContent == 'SF') { 
$out+='\r\n							<div class="ui-flex mt15 positionR">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n							</div>\r\n						';
 } else if (bettypeContent == 'RFSF') { 
$out+='\r\n							<div class="ui-flex mt15 positionR">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n							</div>\r\n						';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n							<div class="ui-flex mt15 flex_wrap">\r\n								<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["D"]);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n							</div>\r\n						';
 } else { 
$out+='\r\n							<div class="ui-flex flex_wrap">\r\n								';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n								<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n								';
 } 
$out+='\r\n								';
 
								if (prize.length <= 0) {
									for (var name in bettypeResult) {
										if (!bettypeResult[name]) {
											continue;
										}
								
$out+='\r\n									<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n								';

									}
								}
								
$out+='\r\n							</div>\r\n						';
 } 
$out+='\r\n						</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		';
 } 
$out+='\r\n	</div>\r\n	';
 if (publish == 0 && isSelfTicket == true && isSale == true) { 
$out+='\r\n		<div class="bottom">\r\n			<div class="doc_detail ui-flex">\r\n				<div class="continue_btn" id="continueBtn">\r\n					继续投注本方案\r\n				</div>\r\n				<div class="share_btn" id="shareMarketBtn">\r\n					分享方案，赚提成\r\n				</div>\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (publish == 1 && followNo != '') { 
$out+='\r\n		<div class="bottom">\r\n			<div class="doc_detail ui-flex">\r\n				<div class="doc_num" id="followCountBtn">跟单用户(';
$out+=$escape(followCount);
$out+=')</div>\r\n				';
 if (isSale == true) { 
$out+='\r\n					<div class="doc_btn" id="followBtn" betAmount="';
$out+=$escape(betAmount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='">\r\n						立即跟单\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="abort_btn">\r\n						已截止跟单\r\n					</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function previewImage($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,length=$data.length,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="showImg" style="background-color: #000000;overflow: auto;">\r\n	<div class="';
$out+=$escape(length==1?'vtc':'');
$out+='">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderTicketList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,orderNumeric=$data.orderNumeric,i=$data.i,length=$data.length,list=$data.list,ticketItem=$data.ticketItem,amount=$data.amount,prizeAmount=$data.prizeAmount,multiple=$data.multiple,printNo=$data.printNo,status=$data.status,statusMap=$data.statusMap,$out='';$out+='<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			<div class="con_tit clearfix">\r\n				<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n			</div>\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					<th>状态</th>\r\n					<th>票码</th>\r\n				</tr>\r\n		';

			for (var i = 0, length = list.length; i < length; i++) {
			var ticketItem = list[i] || {};
			var amount = ticketItem.amount/100;
			var prizeAmount = ticketItem.prizeAmount/100;
			var multiple = ticketItem.multiple;
			var printNo = ticketItem.printNo || "";
			var status = ticketItem.status;
			var statusMap = {"0":"未出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已退款"};
		
$out+='\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(multiple);
$out+='</td>\r\n					<td>\r\n						';
 if (status == 4) { 
$out+='\r\n							中<span class="color_red">';
$out+=$escape(prizeAmount);
$out+='</span>元\r\n						';
 } else { 
$out+='\r\n							';
$out+=$escape(statusMap[status]);
$out+='\r\n						';
 } 
$out+='\r\n					</td>\r\n					<td>\r\n						';
 if (printNo) { 
$out+='\r\n						<a class="showTicketCode" printNo="';
$out+=$escape(printNo);
$out+='" style="color: #1a739c;">查看</a>\r\n						';
 } 
$out+='\r\n					</td>\r\n				</tr>\r\n		';
 } 
$out+='\r\n			</table>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userFollowList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,totalCount=$data.totalCount,totalAmount=$data.totalAmount,i=$data.i,length=$data.length,list=$data.list,follow=$data.follow,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,nickName=$data.nickName,createTime=$data.createTime,d=$data.d,$out='';$out+='<div class="follow mb10">\r\n		<div class="follow_msg clearfix">\r\n			当前跟单<span	class="color_red"> ';
$out+=$escape(totalCount);
$out+=' </span>人，跟单金额<span class="color_red"> ';
$out+=$escape(totalAmount);
$out+=' </span>元\r\n		</div>\r\n		<table>\r\n			<tr>\r\n				<th>用户名称</th>\r\n				<th>跟单金额</th>\r\n				<th>奖金</th>\r\n				<th>跟单时间</th>\r\n			</tr>\r\n	';

		for (var i = 0, length = list.length; i < length; i++) {
		var follow = list[i] || {};
		var amount = follow.amount/100;
		var ticketPrizeAmount = follow.ticketPrizeAmount/100;
		var nickName = follow.nickName;
		var createTime = follow.createTime && follow.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	
$out+='\r\n			<tr>\r\n				<td>';
$out+=$escape(nickName);
$out+='</td>\r\n				<td>';
$out+=$escape(amount);
$out+='</td>\r\n				<td>\r\n					';
 if (ticketPrizeAmount != 0) { 
$out+='\r\n						<span class="color_red">';
$out+=$escape(ticketPrizeAmount);
$out+='元</span>\r\n					';
 } 
$out+='\r\n				</td>\r\n				<td>\r\n					';
$out+=$escape(createTime);
$out+='\r\n				</td>\r\n			</tr>\r\n	';
 } 
$out+='\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ticketSuccess',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="top_wrap pb15">\r\n		<img class="bet_sucess_pic mt20" src="';
$out+=$escape(IMG_PATH);
$out+='bet_sucess.png"/>\r\n		<p class="mt10 mb5" id="couponTxt" style="display: none;">已使用优惠券，优惠了<span class="color_red" id="couponAmount"></span>元</p>\r\n		<p class="mb5">方案正在送往投注站的路上</p>\r\n		<p class="color6 size11">可通过跟单详情，查看方案状态，出票成功可查看真实出票票样</p>\r\n	</div>\r\n	<a class="cont_bet_btn mt40" id="continueBet">继续投注</a>\r\n	<a class="check_detail mt30" id="checkDetail">查看投注详情</a>\r\n	<a class="back_home mt30" id="backHome">返回首页</a>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/ui',function(require,exports){var templateUtils = (function (){
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
})();exports.mask=mask;exports.loading=loading;exports.notice=notice;exports.alert=alert;exports.attention=attention;exports.confirm=confirm;exports.window=window;exports.share=share;exports.createTicketOrder=createTicketOrder;exports.createDigitalTicketOrder=createDigitalTicketOrder;function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,id=$data.id,zIndex=$data.zIndex,opacity=$data.opacity,filter=$data.filter,$out='';$out+='<div class="mask" id="';
$out+=$escape(id);
$out+='" style="z-index:';
$out+=$escape(zIndex);
$out+=';opacity:';
$out+=$escape(opacity);
$out+=';filter:alpha(opacity=';
$out+=$escape(filter);
$out+=')"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function loading($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="loadingBox">\r\n	<div class="mask"></div>\r\n	<div class="loading ">\r\n        <div class="loading_overlay"></div>\r\n        <div class="loading_inner">\r\n            <p class="loading_spinner"></p>\r\n            <p class="loading_text">努力加载中...</p>\r\n        </div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,text=$data.text,$out='';$out+='<div class="pop" id="noticeBox">';
$out+=$escape(text);
$out+='</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function alert($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="alertBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop1">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n			<div class="btn" id="alertBtn">确定</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function attention($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="attentionBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop3">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2">\r\n		    <span class="alerts" style="padding:20px 10px;line-height:25px;">';
$out+=$string(text);
$out+='</span>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function window($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div id="windowBox">\r\n		<div class="mask"></div>\r\n		<div class="pop4">\r\n			';
$out+=$string(html);
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function share($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="shareBox">\r\n		<div class="mask"></div>\r\n		<div class="direct"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function createTicketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,recommendCount=$data.recommendCount,maxBettypeOdds=$data.maxBettypeOdds,isSelfFollow=$data.isSelfFollow,planAmount=$data.planAmount,planType=$data.planType,matchNum=$data.matchNum,planNo=$data.planNo,$out='';$out+='<div id="createTicketOrderBox">\r\n		<div class="mask"></div>\r\n		<div class="pop6">\r\n		  <div class="pop6_top">跟单投注</div>\r\n		  <a class="close_btn" id="closeCreateTicketOrder">X</a>\r\n		  <div class="pop6_con">\r\n		    <div class="popInput mt10">\r\n		    	<span class="icon_decrease_multiple mr5" id="decreaseTicketMultiple"></span>\r\n		      	<div class="ticket_box">\r\n		        	<input type="number" value="10" min="10" max="10000" id="ticketMultiple" recommendCount="';
$out+=$escape(recommendCount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" isSelfFollow="';
$out+=$escape(isSelfFollow);
$out+='" planAmount="';
$out+=$escape(planAmount);
$out+='" planType="';
$out+=$escape(planType);
$out+='" />\r\n		      	</div>\r\n		      	<span class="icon_add_multiple ml5" id="addTicketMultiple"></span>\r\n		      	<span class="ml10 size22">倍</span>\r\n		    </div>\r\n		    ';
 if (matchNum) { 
$out+='\r\n		    	<div class="popText mt10">过关方式：';
$out+=$escape(matchNum>1?matchNum+'串1':'单关');
$out+='</div>\r\n		    ';
 } 
$out+='\r\n		    <div class="popText ellipsis">投注金额：<span id="ticketAmount">0</span> 元</div>\r\n		    <div class="popText ellipsis">理论最大奖金：<span id="maxPrize">0</span> 元</div>\r\n		      ';
 if (matchNum) { 
$out+='\r\n		    	<div class="popText ellipsis">专家提成：中奖奖金的 <span>5%</span></div>\r\n		    ';
 } 
$out+='\r\n		    <div class="read mt15">\r\n		      <label><input type="checkbox" name="tongyi" checked="checked" id="protocol" style="margin-right: 5px;" />已阅读并同意</label>\r\n		      <span><a id="userVerifyProtocol">《用户代购协议》</a></span>\r\n		    </div>\r\n		    <div class="btn pop6Btn" style="background-color: #f63946;" planNo="';
$out+=$escape(planNo);
$out+='" id="createTicketSubmit">\r\n		      确定\r\n		    </div>\r\n		  </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function createDigitalTicketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,recommendCount=$data.recommendCount,maxBettypeOdds=$data.maxBettypeOdds,planAmount=$data.planAmount,planNo=$data.planNo,$out='';$out+='<div id="createTicketOrderBox">\r\n		<div class="mask"></div>\r\n		<div class="pop6">\r\n		  <div class="pop6_top">跟单投注</div>\r\n		  <a class="close_btn" id="closeCreateTicketOrder">X</a>\r\n		  <div class="pop6_con">\r\n		    <div class="popInput mt10">\r\n		    	<span class="icon_decrease_multiple mr5" id="decreaseTicketMultiple"></span>\r\n		      	<div class="ticket_box">\r\n		        	<input type="number" value="10" min="10" max="10000" id="ticketMultiple" recommendCount="';
$out+=$escape(recommendCount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" planAmount="';
$out+=$escape(planAmount);
$out+='"/>\r\n		      	</div>\r\n		      	<span class="icon_add_multiple ml5" id="addTicketMultiple"></span>\r\n		      	<span class="ml10 size22">倍</span>\r\n		    </div>\r\n		    <div class="popText ellipsis">投注金额：<span id="ticketAmount">0</span> 元</div>\r\n		    <div class="popText ellipsis">专家提成：中奖奖金的 <span>5%</span></div>\r\n		    <div class="read mt15">\r\n		      <label><input type="checkbox" name="tongyi" checked="checked" id="protocol" style="margin-right: 5px;" />已阅读并同意</label>\r\n		      <span><a id="userVerifyProtocol">《用户代购协议》</a></span>\r\n		    </div>\r\n		    <div class="btn pop6Btn" style="background-color: #f63946;" planNo="';
$out+=$escape(planNo);
$out+='" id="createTicketSubmit">\r\n		      确定\r\n		    </div>\r\n		  </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userDetail',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.planTrendChartBox=planTrendChartBox;exports.planList=planList;exports.userArticleList=userArticleList;exports.tabBox=tabBox;exports.digitalPlanList=digitalPlanList;exports.replayList=replayList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top">\r\n		<div class="info">\r\n			<span class="arrow leftIcon_top" id="backBtn"></span>\r\n			<span class="icon_span img18 icon_home rightIcon_top" id="homeBtn"></span>\r\n			<div class="headBox">\r\n				<img class="icon_span img40" id="userImg">\r\n				<span class="mt10 displayB" id="userName"></span>\r\n				<a class="share" style="display: none;"  id="focus"></a>\r\n				<div class="expert_name" style="display:none" id="continueWinBox"><span class="expert_num" id="continueWin"></span>连红</div>\r\n				<div class="expert_name" style="display:none" id="winCountBox">10中<span class="expert_num" id="winCount"></span></div>\r\n				<div class="expert_name" style="display:none" id="profitRateBox">盈<span class="expert_num" id="profitRate"></span>%</div>\r\n				<div class="expert_name" style="display:none" id="winRateBox">胜<span class="expert_num" id="winRate"></span>%</div>\r\n			</div>\r\n			<div class="brief_box active" id="userRemarkBox">\r\n				<p class="brief line_hide" id="userRemark" style="font-size: 12px"></p>\r\n				<span class="arrow_down" id="moreUserRemark" style="display:none"></span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex oprate" id="tabBox"></div>\r\n	</div>\r\n	<div class="infoList" id="noMatch" style="display:none">\r\n		<div class="default_box">\r\n			<div class="default" id="default_img"></div>\r\n			<p class="mt10 color9">晒米专家暂没有推荐哟</p>\r\n		</div>\r\n	</div>\r\n	<div class="infoList">\r\n		<div class="chart_box mb5" id="planTrendChartBox" style="display: none;"></div>\r\n		<ul class="infoBox" id="planList"></ul>\r\n	</div>\r\n	<!--<div id="userArticleList">\r\n	</div>-->\r\n	<ul class="infoBox mt10" id="replayList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function planTrendChartBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex chart_head">\r\n		<span class="ui-flex_item">专家胜率表</span>\r\n		<span class="arrow arrow_up"></span>\r\n	</div>\r\n	<div class="chart_wrap">\r\n		<div id="planTrendChart" style="width: 100%;height:300px;"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function planList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,amount=$data.amount,hasPic=$data.hasPic,isGirl=$data.isGirl,isLinChang=$data.isLinChang,access=$data.access,rich=$data.rich,matchList=$data.matchList,match=$data.match,matchNum=$data.matchNum,league=$data.league,home=$data.home,away=$data.away,beginTime=$data.beginTime,d=$data.d,matchType=$data.matchType,isSale=$data.isSale,maxBettypeOdds=$data.maxBettypeOdds,recommendCount=$data.recommendCount,prizeStatus=$data.prizeStatus,title=$data.title,saleTicketAmount=$data.saleTicketAmount,matchBeginTime=$data.matchBeginTime,$escape=$helpers.$escape,j=$data.j,number=$data.number,IMG_PATH=$data.IMG_PATH,$=$data.$,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var amount = plan.amount/100 || 0;
	var hasPic = plan.hasPic || false;
	var isGirl = plan.isGirl || false;
	var isLinChang = plan.isLinChang || false;
	var access = plan.access+'';
	var rich = plan.rich || false;
	var matchList = plan.matchList || [];
	var match = (matchList.length > 0 && matchList[0]) || {};
	var matchNum = matchList.length;
	var league = match.league;
	var home = match.home;
	var away= match.away;
	var beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchType = plan.matchType || 1;
	var isSale = !!plan.isSale;
	var maxBettypeOdds = plan.maxBettypeOdds;
	var recommendCount = plan.recommendCount;
	var prizeStatus = plan.prizeStatus;
	var title = plan.title;
	var saleTicketAmount = plan.saleTicketAmount/100 || 0;
	var matchBeginTime = plan.matchBeginTime && plan.matchBeginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="recommend_cont">\r\n			<div class="pt10">\n				<div class="recommend_item">\r\n					<p class="recommend_title">\r\n						';
 if (hasPic) {
$out+='\r\n							<span class="">【实单】</span>\r\n						';
 } 
$out+='\r\n						';
 if (title) { 
$out+='\r\n							';
$out+=$escape(title);
$out+='\r\n						';
 } else { 
$out+='\r\n							';
 
								for (var j = 0; j < matchNum; j++) { 
									var match = matchList[j] || {};
									var home = match.home;
									var away = match.away;
									var number = match.number;
							
$out+='\r\n								<span>';
$out+=$escape(number);
$out+=$escape(home);
$out+=' vs ';
$out+=$escape(away);
$out+='　<span>\r\n							';
 } 
$out+='\r\n						';
 } 
$out+='\r\n					</p>\r\n					';
 if (prizeStatus == 1) { 
$out+='\r\n						<img class="recommend_win_bg" src="';
$out+=$escape(IMG_PATH);
$out+='recommend_win_bg.png">\r\n					';
 } 
$out+='\r\n					<div class="clearfix mt25">\r\n						<span class="recommend_money fl">\r\n							';
 if (/^true$/i.test(access)) { 
$out+='\r\n								';
 if (amount == 0) { 
$out+='\r\n									<span class="color_red">免费</span>\r\n								';
 } else { 
$out+='\r\n									<span class="color_red">查看</span>\r\n								';
 } 
$out+='\r\n							';
 } else { 
$out+='\r\n								<span class="color_red">';
$out+=$escape(amount);
$out+='粒米</span> 查看\r\n							';
 } 
$out+='\r\n						</span>\r\n						<span class="recommend_time fr">\r\n							截止：';
$out+=$escape(matchBeginTime);
$out+='\r\n						</span>\r\n					</div>\r\n				</div>\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n			<div class="documentary_bet ui-flex">\r\n				<div class="documentary_num">\r\n					用户跟投：\r\n					<span class="color_red size13">\r\n						';
$out+=$escape(saleTicketAmount);
$out+='元\r\n					</span>\r\n				</div>\r\n				<a class="bet_btn userTicket" planNo="';
$out+=$escape(planNo);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" matchNum="';
$out+=$escape(matchNum);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">立即跟单</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 
	}
} 
return new String($out);
}).call(templateUtils,$data).toString()}function userArticleList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,article=$data.article,articleTitle=$data.articleTitle,articleSource=$data.articleSource,articleImg=$data.articleImg,articleLink=$data.articleLink,img=$data.img,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var article = list[i] || {};
	var articleTitle = article.articleTitle;
	var articleSource = article.articleSource;
	var articleImg = article.articleImg;
	var articleLink = article.articleLink;
	var img = "<img class='sport_img fr'src='"+articleImg+"' onload='this.onload=null;parent.$(window.frameElement).after(this);parent.$(window.frameElement).remove()'/>";

$out+='\r\n<div class="shaimi_sport clearfix mt10" articleLink="';
$out+=$escape(articleLink);
$out+='" >\r\n	<div class="sport_title fl">\r\n		<p class="size14 mb10 mt5 ellipsis">\r\n			';
$out+=$escape(articleTitle);
$out+='\r\n		</p>\r\n		<p class="size10 color9 ellipsis">\r\n			来自';
$out+=$escape(articleSource);
$out+='\r\n		</p>\r\n	</div>\r\n	<iframe style="display:none" src="javascript:document.write(&quot;';
$out+=$escape(img);
$out+='&quot;)"/>\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function tabBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,userRight=$data.userRight,$out=''; if (userRight['1']) { 
$out+='\r\n			<div class="ui-flex_item" tab="1">未结束</div>\r\n			<div class="ui-flex_item" tab="2">单关</div>\r\n			<div class="ui-flex_item" tab="3">串关</div>\r\n	';
 } else if (userRight['3']) { 
$out+='\r\n		<div class="ui-flex_item" tab="1">未结束</div>\r\n		<div class="ui-flex_item" tab="2">已结束</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function digitalPlanList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,plan=$data.plan,planNo=$data.planNo,hasPic=$data.hasPic,lotteryId=$data.lotteryId,amount=$data.amount,readCount=$data.readCount,matchType=$data.matchType,isSale=$data.isSale,rich=$data.rich,prizeStatus=$data.prizeStatus,access=$data.access,recommendCount=$data.recommendCount,betContent=$data.betContent,betContentResult=$data.betContentResult,name=$data.name,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,issue=$data.issue,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$=$data.$,$out='';
var length = list.length;
if (length > 0) {
	for (var i = 0; i < length; i++) {
	var plan = list[i] || {};
	var planNo = plan.planNo;
	var hasPic = plan.hasPic || false;
	var lotteryId = plan.lotteryId;
	var amount = (plan.amount || 0)/100;
	var readCount = plan.readCount || 0;
	var matchType = plan.matchType || 0;
	var isSale = plan.isSale || false;
	var rich = plan.rich || false;
	var prizeStatus = plan.prizeStatus;
	var matchType = plan.matchType || 0;
	var access = plan.access+'';
	var recommendCount = plan.recommendCount;
	var betContent = plan.betContentList[0] || {};
	var betContentResult = betContent.betContentResult || {};
	var name = betContentResult.name;
	var lotteryIssue = plan.lotteryIssue || {};
	var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var issue = lotteryIssue.issue;

$out+='\r\n	<li class="item clearfix planItem" planNo="';
$out+=$escape(planNo);
$out+='" amount="';
$out+=$escape(amount);
$out+='" access="';
$out+=$escape(access);
$out+='">\r\n		<div class="detailBox">\r\n			<div class="detail clearfix">\r\n				<img class="img40 fl mr10" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="fl">\r\n					<div class="size13 color6 mb5">\r\n						';
$out+=$escape(issue);
$out+='期\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='推荐\r\n					</div>\r\n				</div>\r\n				<div class="fr">\r\n					<div class="color9 size12">\r\n						开奖：';
$out+=$escape(drawTime);
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="price">\r\n				';
 if (/^true$/i.test(access)) { 
$out+='\r\n					';
 if (prizeStatus == 1) { 
$out+='\r\n						<img class="" src="';
$out+=$escape(IMG_PATH);
$out+='user_win_prize.png" style="width: 45px;position: relative;z-index: 5;"/>\r\n					';
 } else if (amount == 0) { 
$out+='\r\n						<span>免费</span>\r\n					';
 } else { 
$out+='\r\n						<span>查看</span>\r\n					';
 } 
$out+='\r\n				';
 } else { 
$out+='\r\n					<span><span>';
$out+=$escape(amount);
$out+='</span>粒米</span>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n		';
 if (isSale) { 
$out+='\r\n		<div class="ui-flex pd10" style="border-top: 1px solid #e5e5e5;">\r\n			<span class="ui-flex_item isSale_btn" planNo="';
$out+=$escape(planNo);
$out+='" recommendCount="';
$out+=$escape(recommendCount);
$out+='" planAmount="';
$out+=$escape(amount);
$out+='">跟单</span>\r\n		</div>\r\n		';
 } 
$out+='\r\n	</li>\r\n';
 
	}
} 
return new String($out);
}).call(templateUtils,$data).toString()}function replayList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,replay=$data.replay,replayNo=$data.replayNo,title=$data.title,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var replay = list[i] || {};
	var replayNo = replay.replayNo;
	var title = replay.title;
	var user = replay.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');

$out+='\r\n	<li class="item clearfix replayItem" replayNo="';
$out+=$escape(replayNo);
$out+='">\r\n		<div class="recommend_cont">\r\n			<p class="recommend_title pt15 pb5 pl10">';
$out+=$escape(title);
$out+='</p>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.groupList=groupList;exports.userList=userList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav" id="groupList"></div>\r\n	<div class="mt5 clearfix" id="userList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function groupList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,group=$data.group,groupNo=$data.groupNo,name=$data.name,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var group = list[i] || {};
	var groupNo = group.groupNo;
	var name = group.name;

$out+='\r\n<span class="item" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n	<span>';
$out+=$escape(name);
$out+='</span>\r\n</span>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,winCount=$data.winCount,profitRate=$data.profitRate,winRate=$data.winRate,d=$data.d,g=$data.g,redDot=$data.redDot,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag;
	var continueWin = user.continueWin || 0;
	var winCount = user.winCount || 0;
	var profitRate = user.profitRate || 0;
	var winRate = user.winRate || 0;
	profitRate = (profitRate+'').replace(/\.\d+/g, '');
	winRate = (winRate+'').replace(/\.\d+/g, '');
	var redDot = !!user.redDot;

$out+='\r\n<div class="msg" userNo="';
$out+=$escape(userNo);
$out+='">\r\n	<img class="icon_span img40 mb10" src="';
$out+=$escape(userImg);
$out+='"></img>\r\n	';
 if (redDot) {
$out+='\r\n		<span class="red_dot"></span>\r\n	';
 } 
$out+='\r\n	<br/>';
$out+=$escape(userName);
$out+='\r\n	';
 if (continueWin > 1) { 
$out+='\r\n		<span class="expert_name"><span class="expert_num">';
$out+=$escape(continueWin);
$out+='</span>连红</span>\r\n	';
 } else if(winCount > 0) { 
$out+='\r\n		<span class="expert_name">10中<span class="expert_num">';
$out+=$escape(winCount);
$out+='</span></span>\r\n	';
 } else if (profitRate > 0) { 
$out+='\r\n		<span class="expert_name">盈<span class="expert_num">';
$out+=$escape(profitRate);
$out+='%</span></span>\r\n	';
 } else if (winRate > 0) { 
$out+='\r\n		<span class="expert_name">胜<span class="expert_num">';
$out+=$escape(winRate);
$out+='%</span></span>\r\n	';
 } 
$out+='\r\n</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userRankList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.userRankListBox=userRankListBox;exports.winRateRankListBox=winRateRankListBox;exports.profitRateRankListBox=profitRateRankListBox;exports.userRankList=userRankList;exports.winRateRankList=winRateRankList;exports.profitRateRankList=profitRateRankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function userRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="redman_box" id="userRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function winRateRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="profit_box" id="winRateRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function profitRateRankListBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="profit_box" id="profitRateRankList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function userRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,userRank=$data.userRank,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,continueWin=$data.continueWin,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,salePlanCount=$data.salePlanCount,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var userRank = list[i] || {};
	var userNo = userRank.userNo;
	var realName = userRank.realName;
	var nickName = userRank.nickName;
	var profileImg = userRank.profileImg;
	var personalImg = userRank.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = userRank.tag || "";
	userTag = userTag.substr(0, 10);
	var continueWin = userRank.continueWin || 0;
	var index = i+pageSize*(pageNum-1)+1;
	var salePlanCount = userRank.salePlanCount || 0;

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="redman_ranked fr ">\r\n				<span class="icon_medal"></span>\r\n				<span class="redman_num">';
$out+=$escape(continueWin);
$out+='</span>\r\n				<span>场连红</span>\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function winRateRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,winRate=$data.winRate,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,resultPlanCount=$data.resultPlanCount,salePlanCount=$data.salePlanCount,userTag=$data.userTag,$=$data.$,g=$data.g,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,$escape=$helpers.$escape,groupNo=$data.groupNo,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var winRate = list[i] || {};
	var userNo = winRate.userNo;
	var realName = winRate.realName;
	var nickName = winRate.nickName;
	var profileImg = winRate.profileImg;
	var personalImg = winRate.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var resultPlanCount = winRate.resultPlanCount;
	var salePlanCount = winRate.salePlanCount || 0;
	var userTag = winRate.tag || "";
	userTag = userTag.substr(0, 10);
	var winRate = (+winRate.winRate || 0).toFixed(2);
	winRate = winRate.replace(/\.0+$/g, '');//删除末尾是.00;
	var index = i+pageSize*(pageNum-1)+1;

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="fr redman_right">\r\n				<!--<span class="icon_medal"></span>-->\r\n				<span class="color9 size15">7日胜率 <span class="redman_num">';
$out+=$escape(winRate);
$out+='%</span></span><br />\r\n				<span class="color9 mt5">(';
$out+=$escape(resultPlanCount);
$out+='场)</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function profitRateRankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,profitRate=$data.profitRate,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,resultPlanCount=$data.resultPlanCount,salePlanCount=$data.salePlanCount,userTag=$data.userTag,$=$data.$,g=$data.g,index=$data.index,pageSize=$data.pageSize,pageNum=$data.pageNum,$escape=$helpers.$escape,groupNo=$data.groupNo,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var  profitRate = list[i] || {};
	var userNo =  profitRate.userNo;
	var realName =  profitRate.realName;
	var nickName =  profitRate.nickName;
	var profileImg =  profitRate.profileImg;
	var personalImg =  profitRate.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var resultPlanCount = profitRate.resultPlanCount;
	var salePlanCount = profitRate.salePlanCount || 0;
	var userTag =  profitRate.tag || "";
	userTag = userTag.substr(0, 10);
	var profitRate = (+ profitRate.profitRate || 0).toFixed(2);
	profitRate = profitRate.replace(/\.0+$/g, '');//删除末尾是.00;
	var index = i+pageSize*(pageNum-1)+1;
	

$out+='\r\n	<li class="redman_list_box mt5" userNo="';
$out+=$escape(userNo);
$out+='" groupNo="';
$out+=$escape(groupNo);
$out+='">\r\n		<div class="redman_list clearfix">\r\n			<span class="redman_ranking ';
$out+=$escape(index<=3?'redman_red':'');
$out+=' fl">';
$out+=$escape(index);
$out+='</span>\r\n			<img src="';
$out+=$escape(userImg);
$out+='">\r\n			<div class="redman_title ml10 fl">\r\n				<span>';
$out+=$escape(userName);
$out+='\r\n				';
if (salePlanCount > 0) { 
$out+='\r\n					<b class="tips_num">';
$out+=$escape(salePlanCount);
$out+='</b>\r\n				';
 } 
$out+='	\r\n				</span>\r\n				<span>';
$out+=$escape(userTag);
$out+='</span>\r\n			</div>\r\n			<div class="fr redman_right">\r\n				<!--<span class="icon_medal"></span>-->\r\n				<span class="color9 size15">7日盈利 <span class="redman_num">';
$out+=$escape(profitRate);
$out+='%</span></span><br />\r\n				<span class="color9 mt5">(';
$out+=$escape(resultPlanCount);
$out+='场)</span>\r\n			</div>\r\n			<span class="arrow_right"></span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userVerify',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.zhuanjia=zhuanjia;exports.zhanzhang=zhanzhang;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function zhuanjia($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="zhuanjia">\r\n	<div class="select_box">\r\n		<input placeholder="姓名" type="text" id="realName" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="手机号码" type="text" id="phone" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" name="test" maxlength="6" id="smsCode" />\r\n		<span class="test_code" id="smsCodeBtn" type="1">获取验证码</span>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="identitySelectBox">\r\n		上传身份证正面照片\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="identitySelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="identityList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="select_box" style="height:176px;">\r\n		<textarea placeholder="输入简介" style="width:100%;height:100%;border:0;" id="remark"></textarea>\r\n	</div>\r\n	<div class="read mt10">\r\n		<label><input type="checkbox" name="tongyi" style="width:20px;" id="protocol">\r\n		已阅读并同意</label>\r\n		<span>\r\n			<a href="#userVerifyProtocol&type=1" style="color:#2d6fad;">《专家协议》</a>\r\n		</span>\r\n		\r\n	</div>\r\n	<div class="btn ellipsis mt10" id="userVerifySubmit" type="1">\r\n		申请\r\n	</div>\r\n	<p class="note mt10">申请专家，写推荐、赚收成！</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function zhanzhang($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="zhanzhang">\r\n	<div class="select_box">\r\n		<input placeholder="姓名" type="text" id="realName" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="手机号码" type="text" id="phone" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" name="test" maxlength="6" id="smsCode" />\r\n		<span class="test_code" id="smsCodeBtn" type="2">获取验证码</span>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="identitySelectBox">\r\n		上传身份证正面照片\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="identitySelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="identityList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="彩票店地址" type="text" id="address"></input>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="businessSelectBox">\r\n		营业执照上传\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="businessSelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="businessSelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="businessList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="businessSelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="read mt10">\r\n		<label><input type="checkbox" name="tongyi" style="width:20px;" id="protocol">\r\n		已阅读并同意</label>\r\n		<span>\r\n			<a href="#userVerifyProtocol&type=2" style="color:#2d6fad;">《店长协议》</a>\r\n		</span>\r\n		\r\n	</div>\r\n	<div class="btn ellipsis mt10" id="userVerifySubmit" type="2">\r\n		申请\r\n	</div>\r\n	<p class="note mt10">申请店长，写推荐、分享推荐都能赚钱</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/userVerifyProtocol',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.zhuanjia=zhuanjia;exports.dianzhang=dianzhang;exports.daigou=daigou;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,include=function(id,data){data=data||$data;var $text=$helpers.$include(id,data,$id);$out+=$text;return $text;},$out=''; if (type == 1) { 
$out+='\r\n	';
include("zhuanjia")
$out+='\r\n';
 } else if (type == 2) { 
$out+='\r\n	';
include("dianzhang")
$out+='\r\n';
 } else if (type == 3) { 
$out+='\r\n	';
include("daigou")
$out+='\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function zhuanjia($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content-text">\r\n		<p class="ti20">晒米场隶属于深圳算盘彩娱网络科技有限公司，开展网上彩票分析业务。本协议为晒米场进行彩票分析业务与注册专家相关的事宜而订立。具体条款如下：</p>\r\n	<h3>一、服务协议的确认和接纳：</h3>\r\n		<p class="ti20">申请晒米场专家应同意并严格遵守晒米场专家规定、公告之内容，晒米场有权修改、补充、完善专家规定、公告之内容。 如专家同意规定、公告中的内容则双方合作继续有效，如专家不同意规定、公告中的内容则终止合作。</p>\r\n	<h3>二、专家专栏项目简述：</h3>\r\n		<p class="ti20">专家推荐是晒米场推出的一项为普通彩民提供彩票号码/赛果投注参考的服务。</p>\r\n	<h3 class="ti22">专家推荐的服务宗旨：</h3>\r\n		<p class="ti20">为广大彩民朋友提供一个诚实的、能够与中国国内真正彩票号码分析高手沟通互助的平台。帮助广大彩民投注赢利的同时，让确实有水平的彩票分析高手也能获得较为丰厚的收益。</p>\r\n	<h3 class="ti22"> 专家推荐服务表现形式：</h3>\r\n		<p class="ti20">专家通过自己的方法、经验对当期号码/赛事进行分析、总结，提供出彩民需要的推荐结果及思路，供彩民参考，并从中获得相应收益。彩民朋友可在专家推荐内，通过消费米粒形式选择和点击所需专家的投注参考。</p>\r\n	<h3>三、申请成为专家发方案条件：</h3>\r\n		<p class="ti20">首先报名→审核通过→发布方案</p>\r\n		<p>1、竞彩：</p>\r\n		<p class="ti20">（1）发布单场方案赔率1.3以下的不可选，赔率1.3——2.0之间的只能单选，赔率2.0以上的可以双选，不可全包；</p>\r\n		<p class="ti20">（2）发布方案既可自行定价收费；</p>\r\n		<p>2、发布期间推荐方案出现特殊情况如腰斩、延迟等，不计入；</p>\r\n		<p>3、以上判断用户是否有发布收费方案的资格由系统自动判断，在收费期间若连续7天或7天以上未发布方案，之前发布方案自动清零。</p>\r\n		<p>4、专家可以自行定义发布方案价格。</p>\r\n	<h3>四、合作收益和协作说明：</h3>\r\n		<p>1、晒米场提供整个平台的技术支持、系统维护及售后服务，如遇不可抗力因素造成的损失，晒米场不承担任何责任；<br>\r\n		2、晒米场提供宣传专家栏目的广告推广资源、米粒充值优惠赠送费用及米粒充值相关礼品费用；<br>\r\n		3、专家应严格遵守专家规定公告的内容要求；<br>\r\n		4、晒米场是以米粒做为流通单位（一个米粒等于一元人民币），收费专家推荐的文章需要使用米粒来查看；<br>\r\n		5、专家开通收费权限后，提成收入视不同彩种、收费条件，收入的比例也不同，其中符合《专家标准》的单笔收费方案分成比例为50%，具体规则可参考《定价规定》；<br>\r\n		6、收费方案提成将按约定分成比例自动发放到专家的晒米场账户中，可申请提现，由此产生的相应税费由专家承担。<br>\r\n		7、晒米场根据专家的综合情况（断发、成绩、点击量、被投诉、晒米场规定执行），将不定期取消专家收费权限，因专家个人问题被取消收费权限的专家，可在免费区调整，待专家改正并取得和晒米场批准后，重新获得收费权限！</p>\r\n	<h3>五、专家的责任和义务：</h3>\r\n		<p>1、专家需提供完整的号码分析思路及当期具体号码分析结果；<br>\r\n		2、专家所推荐的推荐文章，应提供并确保推荐内容的原创性、真实性、完整性、逻辑性及连续性；<br>\r\n		3、专家名称围绕着彩票相关来起，晒米场拥有此名字的所有权和使用权；<br>\r\n		4、专家不得利用专家专栏平台从事非晒米场的广告宣传、招收个人会员及其他盈利行为，不得从事有损中国足彩网及客户利益的一切活动。如有违反，晒米场中止与专家的合作；并删除专家注册账号，扣除专家账户中的所有米粒、提成作为处罚金。情节严重的将追究法律责任。</p>\r\n	<h3>六、专家的基本能力要求：</h3>\r\n		<p>1、电脑操作能力：邮件、QQ、彩票分析软件、登录晒米场等都需要通过电脑来实现，专家需要具备一定的电脑操作能力；<br>\r\n		2、号码分析能力：专家需具备一定数学知识、逻辑思维能力，并且有自己的分析方法，能够给彩民带来所需推荐内容；<br>\r\n		3、文字书写能力：晒米场是媒体，错字、病句等将有损晒米场形象，所以专家需要具备一定的文字能力，错字、病句是要坚决杜绝的；<br>\r\n		4、宣传沟通能力：专家应知道彩民需要什么样推荐内容，如何宣传自己！对晒米场规章制度有疑问，或在使用晒米场的过程中出现问题时，应多交流、多沟通，这样有助于专家的进步。宣传与沟通能力是必须具备的条件。</p>\r\n	<h3>七、晒米场的权利和义务：</h3>\r\n		<p>1、管理用户账户的权利。如果用户提供恶意资料和信息或违反中华人民共和国法律，晒米场保留注销其用户账户或者限制其使用全部或部分服务内容的权利。<br>\r\n		2、修改本协议条款的权利。晒米场有权在必要时修改协议条款，协议条款一旦发生变动，将会在晒米场相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务或注销用户身份，晒米场将妥善处理好注销用户的善后事宜。如果用户继续享用服务，则视为接受服务条款的变动。<br>\r\n		3、使用用户的信息的权利。晒米场有权使用专家所注册的用户名和推荐信息进行宣传活动。</p>\r\n	<h3>八、协议成立、变更和终止 ：</h3>\r\n		<p>1、晒米场有权对本协议条款进行变更而无需事先通知用户，用户有权决定是否继续接受修订后的协议。<br>\r\n		2、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知限定日期内仍未能改正错误的，均被视为自动放弃本协议，协议同时终止。<br>\r\n		3、用户违约或发生其他导致晒米场不能再为用户服务的情况晒米场有权通知用户终止本协议，自通知发出之日起限定日期内本协议终止。</p>\r\n	<h3>九、其他事项：</h3>\r\n		<p>1、本服务规则只针对晒米场推荐专家设立，不适用于中华人民共和国法律且不具备法律效力，不能成为法律诉讼之证据。<br>\r\n		2、专家因受不可抗力影响而不能遵守或不能完全遵守本规则的专家可部分或全部免除履行其责任。 “不可抗力”是指受影响一方无法预见、无法避免并无法克服的客观情况。此等事件包括但不限于水灾、火灾、旱灾、台风、地震及其它自然灾害、罢工、骚动、暴乱及战争（不论宣战与否）以及政府部门、金融机构或者银行的作为或不作为。</p>\r\n		<p class="mb10"><b class="size10">以上合作说明的最终解释权、补充或另行约定附则归晒米场所有！</b></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function dianzhang($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content-text">\r\n		<p class="ti20">晒米场隶属于深圳算盘彩娱网络科技有限公司，开展网上彩票分析业务。本协议为晒米场进行彩票分析业务与注册彩店店长相关的事宜而订立。具体条款如下：</p>\r\n	<h3>一、服务协议的确认和接纳：</h3>\r\n		<p class="ti20">申请晒米场彩店店长应同意并严格遵守晒米场彩店店长规定、公告之内容，晒米场有权修改、补充、完善彩店店长规定、公告之内容。如彩店店长同意规定、公告中的内容则双方合作继续有效，如彩店店长不同意规定、公告中的内容则终止合作。</p>\r\n	<h3>二、彩店店长专栏项目简述</h3>\r\n		<p class="ti20">彩店店长推荐是晒米场推出的一项为普通彩民提供彩票号码/赛果投注参考的服务。</p>\r\n	<h3 class="ti22">彩店店长推荐的服务宗旨：</h3>\r\n		<p class="ti20">为广大彩民朋友提供一个诚实的、能够与中国国内真正彩票号码分析高手沟通互助的平台。帮助广大彩民投注赢利的同时，让确实有水平的彩票分析高手也能获得较为丰厚的收益。</p>\r\n	<h3 class="ti22">彩店店长推荐服务表现形式：</h3>\r\n		<p class="ti20">彩店店长通过自己的方法、经验对当期号码/赛事进行分析、总结，提供出彩民需要的推荐结果及思路，供彩民参考，并从中获得相应收益。彩民朋友可在彩店店长推荐内，通过消费米粒形式选择和点击所需彩店店长的投注参考。 </p>\r\n	<h3>三、申请成为彩店店长发方案条件：</h3>\r\n		<p class="ti20">首先报名→审核通过→发布方案</p>\r\n		<p>1、竞彩：</p>\r\n		<p class="ti20">（1）发布单场方案赔率1.3以下的不可选，不可全包；</p>\r\n		<p class="ti20">（2）发布方案既可自行定价收费；</p>\r\n		<p>2、发布期间推荐方案出现特殊情况如腰斩、延迟等，不计入；</p>\r\n		<p>3、以上判断用户是否有发布收费方案的资格由系统自动判断，在收费期间若连续7天或7天以上未发布方案，之前发布方案自动清零。</p>\r\n		<p>4、彩店店长可以自行定义发布方案价格。</p>\r\n	<h3>四、合作收益和协作说明：</h3>\r\n		<p>1、晒米场提供整个平台的技术支持、系统维护及售后服务，如遇不可抗力因素造成的损失，晒米场不承担任何责任；<br>\r\n		2、晒米场提供宣传彩店店长栏目的广告推广资源、米粒充值优惠赠送费用及米粒充值相关礼品费用；<br>\r\n		3、彩店店长应严格遵守彩店店长规定公告的内容要求；<br>\r\n		4、晒米场是以米粒做为流通单位（一个米粒等于一元人民币），收费彩店店长推荐的文章需要使用米粒来查看；<br>\r\n		5、彩店店长开通收费权限后，提成收入视不同彩种、收费条件，收入的比例也不同，其中符合《彩店店长标准》的单笔收费方案分成比例为50%，具体规则可参考《定价规定》；<br>\r\n		6、收费方案提成将按约定分成比例自动发放到彩店店长的晒米场账户中，可申请提现，由此产生的相应税费由彩店店长承担。<br>\r\n		7、晒米场根据彩店店长的综合情况（断发、成绩、点击量、被投诉、晒米场规定执行），将不定期取消彩店店长收费权限，因彩店店长个人问题被取消收费权限的彩店店长，可在免费区调整，待彩店店长改正并取得和晒米场批准后，重新获得收费权限！\r\n	<h3>五、彩店店长的责任和义务：</h3>\r\n		<p>1、彩店店长需提供完整的号码分析思路及当期具体号码分析结果；<br>\r\n		2、彩店店长所推荐的推荐文章，应提供并确保推荐内容的原创性、真实性、完整性、逻辑性及连续性；<br>\r\n		3、彩店店长名称围绕着彩票相关来起，晒米场拥有此名字的所有权和使用权；<br>\r\n		4、彩店店长不得利用彩店店长专栏平台从事非晒米场的广告宣传、招收个人会员及其他盈利行为，不得从事有损中国足彩网及客户利益的一切活动。如有违反，晒米场中止与彩店店长的合作；并删除彩店店长注册账号，扣除彩店店长账户中的所有米粒、提成作为处罚金。情节严重的将追究法律责任。</p>\r\n	<h3>六、彩店店长的基本能力要求：</h3>\r\n		<p>1、电脑操作能力：邮件、QQ、彩票分析软件、登录晒米场等都需要通过电脑来实现，店长需要具备一定的电脑操作能力；<br>\r\n		2、号码分析能力：彩店店长需具备一定数学知识、逻辑思维能力，并且有自己的分析方法，能够给彩民带来所需推荐内容；<br>\r\n		3、文字书写能力：晒米场是媒体，错字、病句等将有损晒米场形象，所以店长需要具备一定的文字能力，错字、病句是要坚决杜绝的；<br>\r\n		4、宣传沟通能力：彩店店长应知道彩民需要什么样推荐内容，如何宣传自己！对晒米场规章制度有疑问，或在使用晒米场的过程中出现问题时，应多交流、多沟通，这样有助于店长的进步。宣传与沟通能力是必须具备的条件。</p>\r\n	<h3>七、晒米场的权利和义务：</h3>\r\n		<p>1管理用户账户的权利。如果用户提供恶意资料和信息或违反中华人民共和国法律，晒米场保留注销其用户账户或者限制其使用全部或部分服务内容的权利。<br>\r\n		2、修改本协议条款的权利。晒米场有权在必要时修改协议条款，协议条款一旦发生变动，将会在晒米场相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务或注销用户身份，晒米场将妥善处理好注销用户的善后事宜。如果用户继续享用服务，则视为接受服务条款的变动。<br>\r\n		3、使用用户的信息的权利。晒米场有权使用彩店店长所注册的用户名和推荐信息进行宣传活动。</p>\r\n	<h3>八、协议成立、变更和终止 ：</h3>\r\n		<p>1、晒米场有权对本协议条款进行变更而无需事先通知用户，用户有权决定是否继续接受修订后的协议。<br>\r\n		2、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知限定日期内仍未能改正错误的，均被视为自动放弃本协议，协议同时终止。<br>\r\n		3、用户违约或发生其他导致晒米场不能再为用户服务的情况晒米场有权通知用户终止本协议，自通知发出之日起限定日期内本协议终止。</p>\r\n	<h3>九、其他事项：</h3>\r\n		<p>1、本服务规则只针对晒米场推荐彩店店长设立，不适用于中华人民共和国法律且不具备法律效力，不能成为法律诉讼之证据。<br>\r\n		2、彩店店长因受不可抗力影响而不能遵守或不能完全遵守本规则的彩店店长可部分或全部免除履行其责任。 “不可抗力”是指受影响一方无法预见、无法避免并无法克服的客观情况。此等事件包括但不限于水灾、火灾、旱灾、台风、地震及其它自然灾害、罢工、骚动、暴乱及战争（不论宣战与否）以及政府部门、金融机构或者银行的作为或不作为。</p>\r\n		<p class="mb10"><b class="size10">以上合作说明的最终解释权、补充或另行约定附则归晒米场所有！</b></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function daigou($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="content-text">\r\n		<h3>一、承诺</h3>\r\n		<p class="ti20">1、网站承诺</p>\r\n		<p class="ti20">晒米场立足于服务彩民，所有用户在本网站发起代购彩票方案，晒米场均不收取任何手续费。<b class="size10">所有代购彩票方案接线下彩票店真实出票。</b></p>\r\n		<p class="ti20">2、用户承诺</p>\r\n		<p class="ti20">晒米场用户须同意本网站代理购买、保管彩票、领取奖金和派发奖金的有关事宜。本网站所派发奖金均指税后奖金。</p>\r\n		<h3>二、方案</h3>\r\n		<p class="ti20">1、方案发起</p>\r\n		<p class="ti20">(一)发起方案：用户有权自由发起代购方案，每期方案个数不限制。</p>\r\n		<p class="ti20">(二)发起限额：为保证方案发起的有效性，方案最低发起金额为2元；</p>\r\n		<p class="ti20">2、方案撤回</p>\r\n		<p class="ti20">(一)撤单：代购方案发起即行出票，发起后不能撤单。</p>\r\n		<p class="ti20">(二)撤单金额返还和奖金分配：如遇方案部分撤单，撤单部分的金额将在官方销售截止前返还至用户账户，原方案金额在方案详情页显示不变。</p>\r\n		<h3>三、中奖 </h3>\r\n		<p class="ti20">1、兑奖</p>\r\n		<p class="ti20">开奖后，网站将代为办理兑奖、派奖事宜，并在1个工作日内把税后奖金添入中奖用户之预付款账户。</p>\r\n		<p class="ti20">2、奖金分配</p>\r\n		<p class="ti20">代购方案的奖金均为此方案发起人所有。</p>\r\n		<p class="ti20">3、奖金分配计算方式</p>\r\n		<p class="ti20">单关、过关投注奖金为固定奖金，方案最终中奖奖金以成功出票时的奖金为准。过关投注方案成功出票后，网站会提供出票票样供查询。</p>\r\n		<h3>四、风险提示</h3>\r\n		<p class="ti20">1、官方因素</p>\r\n		<p class="ti20">为了加强对竞彩的销售管理，在销售过程中，根据投注额、突发事件等因素，彩票管理中心销售系统可能会拒绝某些大额投注，或者暂停或提前截止某场比赛的某些特定过关组合、特定结果选项的投注，暂停或提前截止针对某场比赛的所有投注。此种情况下，网站对暂停或提前截止销售不承担任何责任。</p>\r\n		<p class="ti20">2、竞彩篮球、竞彩足球风险</p>\r\n		<p class="ti20">晒米场尽力保证让分(或总分)盘口和赔率的及时更新，但因盘口和赔率随时都在变化，所以晒米场不能保证能完全及时更新，出票后将以实际出票的官方回执为准。</p>\r\n		<p class="ti20">3、其他意外因素</p>\r\n		<p class="ti20">因官方停售、突然停电、网络异常、系统升级等意外因素导致网站预计无法全部出票的，网站保有往前调整网站销售截止时间的权利，对满员方案中未及时出票部分做撤单返款处理。除此之外，网站不承担其他责任。</p>\r\n		<h3>五、其他</h3>\r\n		<p class="ti20">本网站保留变更本协议条款的权利。</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/withdraw',function(require,exports){var templateUtils = (function (){
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
var $helpers=this,$escape=$helpers.$escape,financeType=$data.financeType,$out='';$out+='<div class="pl10 mt20">\r\n		';
$out+=$escape(financeType==1?'可提彩金':'可收米数');
$out+='：<span class="color_red" id="userFinance"></span>\r\n	</div>\r\n	<div class="select_box">\r\n		<input id="amount" placeholder="输入';
$out+=$escape(financeType==1?'彩金':'收米');
$out+='数量" type="number" autocomplete="off"/>\r\n	</div>\r\n	<div class="select_box color3 clearfix">\r\n		换算金额：<span id="amountPrice">0</span>&nbsp;元\r\n	</div>\r\n	';
 if (financeType == 0) { 
$out+='\r\n		<div class="select_box">\r\n			<select name="" id="accountName">\r\n				<option value="" >请选择银行</option>\r\n				<option value="中国银行" >中国银行</option>\r\n				<option value="中国建设银行">中国建设银行</option>\r\n				<option value="中国工商银行">中国工商银行</option>\r\n				<option value="中国农业银行">中国农业银行</option>\r\n				<option value="招商银行">招商银行</option>\r\n			</select>\r\n		</div>\r\n		<div class="select_box">\r\n			<input id="accountUserName" placeholder="输入银行户名" type="text"/>\r\n		</div>\r\n		<div class="select_box">\r\n			<input id="accountNumber" placeholder="输入银行卡号" type="number"/>\r\n		</div>\r\n		<div class="select_box">\r\n			<input id="accountInfo" placeholder="输入开户行所在省、市、县、支行信息" type="text"/>\r\n		</div>\r\n	';
 } else { 
$out+='\r\n	<div class="select_box">\r\n		<input id="accountName" placeholder="输入支付宝姓名" type="text"/>\r\n	</div>\r\n	<div class="select_box">\r\n		<input id="accountNumber" placeholder="输入支付宝账号" type="text"/>\r\n	</div>\r\n	';
 } 
$out+='\r\n	<div class="btn mt30" id="withdrawSubmit">\r\n		申请\r\n	</div>\r\n	';
 if (financeType == 1) { 
$out+='\r\n		<p class="mt5">1彩金=1元， 注：只有中奖部分可提现</p>\r\n	';
 } else { 
$out+='\r\n		<p class="mt5">注：<br />1、推荐收益和分享收益才可以收米<br />2、换算金额满一百才可以提现，一周结算一次</p>\r\n	';
 } 
$out+='\r\n	<!--<p class="mt5">';
$out+=$escape(financeType==1?'1彩金=1元， 注：只有中奖部分可提现':'注：1、推荐收益和分享收益才可以收米2、换算金额满一百才可以提现，一周结算一次');
$out+='</p>-->';
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/withdrawList',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.withdrawList=withdrawList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="charge_top">\r\n		<span>时间</span>\r\n		<span>提款数量</span>\r\n		<span>对应金额</span>\r\n		<span>状态</span>\r\n	</div>\r\n	<ul class="charge_con" id="withdrawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function withdrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,withdraw=$data.withdraw,financeType=$data.financeType,financeTypeMap=$data.financeTypeMap,amount=$data.amount,status=$data.status,statusMap=$data.statusMap,remark=$data.remark,createTime=$data.createTime,matchTime=$data.matchTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
		var withdraw = list[i] || {};
		var financeType = withdraw.financeType;
		var financeTypeMap = {'0': '米粒', '1': '彩金'}; 
		var amount = withdraw.amount/100 || 0;
		var status = withdraw.status;
		var statusMap = {"1":"未审核","2":"已审核","3":"已打款","4":"已拒绝","5":"打款中"};
		var remark = withdraw.remark || '';
		var createTime = withdraw.createTime || "";
		var matchTime = createTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = '';
		var time = '';
	if (matchTime) {
		day = matchTime[1];
		time = matchTime[2];
	}

$out+='\r\n	<li class="charge_list">\r\n		<span>';
$out+=$escape(day);
$out+='<br>';
$out+=$escape(time);
$out+='</span>\r\n		<span>';
$out+=$escape(amount);
$out+=$escape(financeTypeMap[financeType]);
$out+='</span>\r\n		<span>';
$out+=$escape(amount);
$out+='元</span>\r\n		<span remark="';
$out+=$escape(remark);
$out+='" style="';
$out+=$escape(status==4&&remark!=''?'color:#1a739c;text-decoration:underline;':'');
$out+='">\r\n			';
$out+=$escape(statusMap[status]);
$out+='\r\n		</span>	\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});
define('view/worldCup2018',function(require,exports){var templateUtils = (function (){
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
})();exports.content=content;exports.matchList=matchList;exports.filterList=filterList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex nav_wrap" id="navTab">\r\n		<div class="ui-flex_item" tab = "1">\r\n			<span>冠军</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab = "2">\r\n			<span>冠亚军</span>\r\n		</div>\r\n	</div>\r\n	<ul class="filter_wrap ui-flex mt5" id="filterList" style="display: none;"></ul>\r\n	<div class="team-list mt5">\r\n		<ul class="team_wrap ui-flex" id="matchList"></ul>\r\n	</div>			\r\n	<div class="buy_list">\r\n		<div class="mutiple_warp">\r\n				<span class="mr15">输入投注倍数</span>\r\n				<input type="number" value="10" min="1" max="9999" id="ticketMultiple"/>\r\n			</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10"><span id="countUnit">0</span>注 <span class="colorf5e" id="ticketAmount">0元</span></div>\r\n				<div class="bonus">理论最大奖金：<span class="colorf5e" id="maxPrice">0元</span></div>\r\n			</div>\r\n			<div class="pay_btn fr" id="betBtn">\r\n				投注\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,match=$data.match,odds=$data.odds,team=$data.team,oddsId=$data.oddsId,team1=$data.team1,team2=$data.team2,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var match = list[i] || {};
	var odds = match.odds;
	var team = match.team;
	var oddsId = match.oddsId;
	var team1 = team.split('—')[0];
	var team2 = team.split('—')[1];

$out+='\r\n	<li class="team_item" oddsId = ';
$out+=$escape(oddsId);
$out+=' team1 = ';
$out+=$escape(team1);
$out+=' team2 = ';
$out+=$escape(team2);
$out+='>\r\n		<span class="team_name">';
$out+=$escape(team);
$out+='</span>\r\n		<span class="odds">';
$out+=$escape(odds);
$out+='</span>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function filterList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,filter=$data.filter,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var filter = list[i];

$out+='\r\n	<li class="filter_item mb10" filterName=';
$out+=$escape(filter);
$out+='>\r\n		<span>';
$out+=$escape(filter);
$out+='</span>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});