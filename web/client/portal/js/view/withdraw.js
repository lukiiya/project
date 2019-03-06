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