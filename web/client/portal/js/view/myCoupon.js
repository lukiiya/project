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