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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="k3jj_bg">\r\n			<div class="k3jj_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_logo.png" alt="" />\r\n			</div>\r\n		</div>\r\n		<div class="award_rules">\r\n			<ul class="rules_item_warp">\r\n				<li class="rules_title">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_ruleTitle.png"/>\r\n				</li>\r\n				<li class="rules_item">\r\n					<!--<p class="size13">1.购买快3游戏，自2017年6月18起至奖金派完为止，享受以下加奖:</p>-->\r\n					<div class="table_wrap">\r\n						<table>\r\n							<tr>\r\n								<th width="100">投注方法</th>\r\n								<th width="60">奖金</th>\r\n								<th width="60">加奖</th>\r\n								<th width="60">总奖金</th>\r\n							</tr>\r\n							<tr>\r\n								<td>和值4、17</td>\r\n								<td>80</td>\r\n								<td class="award">20</td>\r\n								<td>100</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值5、16</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值6、15</td>\r\n								<td>25</td>\r\n								<td class="award">5</td>\r\n								<td>30</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值7、14</td>\r\n								<td>16</td>\r\n								<td class="award">4</td>\r\n								<td>20</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值8、13</td>\r\n								<td>12</td>\r\n								<td class="award">2</td>\r\n								<td>14</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值9、12</td>\r\n								<td>10</td>\r\n								<td class="award">2</td>\r\n								<td>12</td>\r\n							</tr>\r\n							<tr>\r\n								<td>和值10、11</td>\r\n								<td>9</td>\r\n								<td class="award">2</td>\r\n								<td>11</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三同号通选</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三同号单选</td>\r\n								<td>240</td>\r\n								<td class="award">60</td>\r\n								<td>300</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二同号复选</td>\r\n								<td>15</td>\r\n								<td class="award">4</td>\r\n								<td>19</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二同号单选</td>\r\n								<td>80</td>\r\n								<td class="award">20</td>\r\n								<td>100</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三不同号</td>\r\n								<td>40</td>\r\n								<td class="award">10</td>\r\n								<td>50</td>\r\n							</tr>\r\n							<tr>\r\n								<td>二不同号</td>\r\n								<td>8</td>\r\n								<td class="award">2</td>\r\n								<td>10</td>\r\n							</tr>\r\n							<tr>\r\n								<td>三连号通选</td>\r\n								<td>10</td>\r\n								<td class="award">2</td>\r\n								<td>12</td>\r\n							</tr>\r\n						</table>\r\n					</div>\r\n					<div class="mt20" id="betBtn">\n						<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_betBtn.png"/>\n					</div>\r\n				</li>\r\n				<li class="colorf size14 mb10">\r\n					活动规则：\r\n				</li>\r\n				<li class="rules_item">\r\n					1.派奖时间：自2017年10月30日起，若两亿奖金派完，则加奖活动停止；\r\n				</li>\r\n				<li class="rules_item">\r\n					2.每天82期派奖不停歇，加奖奖金与中奖奖金同时派发，加奖奖金可以用于继续购买彩票，也可以立即提现；\r\n				</li>\r\n				<li class="rules_item">\r\n					3.活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});