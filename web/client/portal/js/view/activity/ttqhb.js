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