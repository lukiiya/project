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