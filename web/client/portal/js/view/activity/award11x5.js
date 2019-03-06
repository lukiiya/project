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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="11x5jj_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='11x5jj_banner.png" alt="" />\r\n	</div>\r\n	<div class="award_rules">\r\n		<ul class="rules_item_warp">\r\n			<li class="rules_title mb20">\r\n				<p>加奖时间：自2018年5月11日起，11选5加奖500万开启，奖金派完为止</p>\r\n			</li>\r\n			<li class="rules_item">\r\n				<h2 class="title_h2">加奖说明</h2>\r\n				<div class="table_wrap">\r\n					<table>\r\n						<table>\r\n							<tr>\r\n								<th>加奖玩法</th>\r\n								<th>原奖金（元）</th>\r\n								<th>加奖金额（元）</th>\r\n								<th>加奖后奖金（元）</th>\r\n							</tr>\r\n							<tr>\r\n								<td>任选三</td>\r\n								<td>19</td>\r\n								<td>2</td>\r\n								<td>21</td>\r\n							</tr>\r\n							<tr>\r\n								<td>任选五</td>\r\n								<td>540</td>\r\n								<td>60</td>\r\n								<td>600</td>\r\n							</tr>\r\n						</table>\r\n					</table>\r\n				</div>\r\n			</li>\r\n			<li class="rules_item">\r\n				<a class="bet_btn" id="betBtn">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_award11x5_bet_btn.png" />\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="activity_rules">\r\n		<h2 class="title_h2">活动规则</h2>\r\n		<dl>\r\n			<dd>1、本次活动只针对任选三、任选五玩法加奖，中奖奖金可以直接提现；</dd>\r\n			<dd>2、加奖奖金不可提现，可购彩，中奖后可提现；</dd>\r\n			<dd>3、本次加奖活动不限次数，不限人数，加完为止；</dd>\r\n			<dd>4、本次活动的最终解释权归“晒米场”所有。</dd>\r\n		</dl>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});