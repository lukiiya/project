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