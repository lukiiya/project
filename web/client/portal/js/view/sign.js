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