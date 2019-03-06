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