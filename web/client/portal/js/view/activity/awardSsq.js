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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="ssqjj_bg">\r\n		<div class="ssqjj_logo">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqjj_logo.png" alt="" />\r\n		</div>\r\n	</div>\r\n	<div class="award_rules">\r\n		<div class="rules_item_warp">\r\n			<div class="rules_title">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqjj_ruleTitle.png"/>\r\n			</div>\r\n			<div class="award_cont mt20 mb30">\r\n				<p class="size13 mb20">自2017130期开始，共20期</p>\r\n				<div class="table_wrap">\r\n					<table>\r\n						<tr>\r\n							<th width="125">投注玩法</th>\r\n							<th width="90">加奖奖项</th>\r\n							<th width="90">单注加奖</th>\r\n						</tr>\r\n						<tr>\r\n							<td>红球、蓝色复式</td>\r\n							<td>一等奖</td>\r\n							<td>500万</td>\r\n						</tr>\r\n						<tr>\r\n							<td>全复式</td>\r\n							<td>六等奖</td>\r\n							<td>5元</td>\r\n						</tr>\r\n					</table>\r\n				</div>\r\n				<div class="mt30" id="betBtn">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='k3jj_betBtn.png">\r\n				</div>\r\n			</div>\r\n			<h3 class="rules_h3 mb10">派奖规则：</h3>\r\n			<ul>\r\n				<li class="rules_item">\r\n					1.派奖时间：自双色球2017130期(11月02日开奖结束后开始起售，11月05日开奖)开始；\r\n				</li>\r\n				<li class="rules_item">\r\n					2.一等奖加奖总金额为4亿元，每期安排2000万元设立一等奖特别奖，由当期采用复式投注的一等奖按中奖注数均分，单注派奖奖金最高限额500万元；\r\n				</li>\r\n				<li class="rules_item">\r\n					3.六等奖加奖总金额为5亿元，每期对当期采用复式投注的所有六等奖按每注5元派送固定奖；\r\n				</li>\r\n				<li class="rules_item">\r\n					4.活动的最终解释权归官方所有，如有疑问请联系客服微信号：shaimichang。\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});