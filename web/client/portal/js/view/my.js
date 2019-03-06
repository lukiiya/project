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
})();exports.content=content;exports.tabList=tabList;exports.tabList=tabList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top" id="topBox">\r\n		<div class="info">\r\n			<div class="headBox clearfix">\r\n				<img class="img43" id="userImg"><br /><span class="color3 size14" id="userName"></span>\r\n				<!--<span class="personal">\r\n					<span class="color3 size14" id="userName"></span>\r\n					<br>\r\n					<span class="phone_num">\r\n						手机号：<span id="noNum" style="display: none;">无 <span class="bind_btn size10" id="bindMobile">绑定</span></span>\r\n					</span>\r\n				</span>-->\r\n				<span class="btn_small fr" id="editPlan" style="display:none">写推荐</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex oprate">\r\n			<div class="ui-flex_item pd" id="handsel" style="display: none;">\r\n				<div class="ui-flex pd20">\r\n					<div class="charge ui-flex_item textL">\r\n						<span class="total_amount mb10" id="handselBalance"></span><br />\r\n						<span class="icon_money icon_style"></span><span class="size13">彩金</span>\r\n					</div>\r\n					<div class="ui-flex_item textR">\r\n						<span class="size13 mr10" href="#charge&financeType=1">充值</span>\r\n						<span class="size13" href="#withdraw&financeType=1">提款</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			<div class="ui-flex_item pd">\r\n				<div class="ui-flex pay pd20">\r\n					<div class="charge ui-flex_item textL">\r\n						<span class="total_amount mb10" id="userBalance"></span><br />\r\n						<span class="icon_pay icon_style"></span><span class="size13">米粒</span>\r\n					</div>\r\n					<div class="ui-flex_item textR">\r\n						<span class="size13 mr10" href="#charge&financeType=0">充值</span>\r\n						<span class="size13" href="#withdraw&financeType=0">提款</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div id="tabList"></div>\r\n	<div class="infoList" id="infoList"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tabList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isABT=$data.isABT,userRight=$data.userRight,$out=''; if (isABT) { 
$out+='\r\n<div class="ui-flex_item" tab="4">我的跟单</div>\r\n';
 } 
$out+='\r\n';
 if (userRight['1'] || userRight['3']) { 
$out+='\r\n	<div class="ui-flex_item" tab="1">我的晒米</div>\r\n';
 } 
$out+='\r\n';
 if (userRight['2']) { 
$out+='\r\n	<div class="ui-flex_item" tab="2">分享收成</div>\r\n';
 } 
$out+='\r\n<div class="ui-flex_item" tab="3">我的购买</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function tabList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isChannel=$data.isChannel,userRight=$data.userRight,isWeixinBrowser=$data.isWeixinBrowser,$out=''; if (isChannel) { 
$out+='\r\n	<ul class="mt15 user_menu">\r\n		<li class="ui-flex user_menu_item" tab="9">\r\n			<span>我的邀请</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>\r\n	';
 } 
$out+='\n	<ul class="mt15 user_menu">\r\n		<li class="ui-flex user_menu_item" tab="1">\r\n			<span>我的投注</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex user_menu_item" tab="2">\r\n			<span>我的优惠券</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<li class="ui-flex user_menu_item" tab="3">\r\n			<span>账户明细</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n	</ul>\r\n	<ul class="mt20 user_menu">\r\n		';
 if (userRight['1'] || userRight['3']) { 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="4">\r\n			<span>我的晒米</span>\r\n			<div class="size12 color6">\r\n				收益<span class="color_red size12"> 50%</span>/单\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n		';
 if (userRight['2']) { 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="5">\r\n			<span>分享收成</span>\r\n			<div class="size12 color6">\r\n				收益<span class="color_red size12"> 30%</span>/单\r\n				<span class="arrow_right"></span>\r\n			</div>\r\n		</li>\r\n		';
 } 
$out+='\r\n		<li class="ui-flex user_menu_item" tab="6">\r\n			<span>已购推荐</span>\r\n			<span class="arrow_right"></span>\r\n		</li>\r\n		<!--<li class="ui-flex user_menu_item" tab="8">\r\n			<span>我的双色球红包</span>\r\n			<span class="arrow_right"></span>\r\n		</li>-->\r\n	</ul>\r\n	';
 if (!isWeixinBrowser) { 
$out+='\r\n		<ul class="mt15 user_menu">\r\n			<li class="ui-flex user_menu_item" tab="7">\r\n				<span>我的关注</span>\r\n				<span class="arrow_right"></span>\r\n			</li>\r\n		</ul>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});