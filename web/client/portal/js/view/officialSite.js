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
})();exports.content=content;exports.pc=pc;exports.mobile=mobile;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function pc($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="pc_top">\r\n		<div class="top_logo">\r\n			<img class="img-responsive logo_img" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_logo.png"/>\r\n		</div>\r\n		<img class="img-responsive pc_top_bg" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_top_bg.jpg"/>\r\n		<div class="title-btn">\r\n			<p class="title_one">晒米场 球迷的收米神器</p>\r\n			<h3 class="top_title"></h3>\r\n			<div class="top_btn_wrap">\r\n				<span class="top_btn ios_btn" id="topIphoneBtn">\r\n					<i class="top_ios_icon"></i>\r\n					iphone 版下载\r\n				</span>\r\n				<span class="top_btn android_btn" id="topAndroidBtn">\r\n					<i class="top_android_icon"></i>\r\n					Android 版下载\r\n				</span>\r\n				<span class="top_small_code" id="hoverCode"></span>\r\n				<div class="top_code_wrap" style="display: none" id="topCode">\r\n					<img class="top_code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_bottom_code.png" /><br />\r\n					<span>扫描二维码关注公众号</span>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_middle">\r\n		<p>操盘手心水 实单实战</p>\r\n		<p class="middle_title">专家晒米 我们不一样</p>\r\n		<p>国内外知名操盘手、店长实单推荐，众多足球篮球专家每日解读，助你收米</p>\r\n		<div class="middle_img">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_middle_img.jpg"/>\r\n		</div>\r\n	</div>\r\n	<div class="code_wrap">\r\n		<p class="title01">晒米场  球迷的收米神器</p>\r\n		<p class="title02">请选择相应的机型下载</p>\r\n		<div class="btn_box ui-flex">\r\n			<div class="btn_wrap ui-flex" id="bottomIphoneBtn">\r\n				<i class="bottom_ios_icon"></i>\r\n				<span>iPhone</span>\r\n			</div>\r\n			<div class="btn_wrap ui-flex" id="bottomAndroidBtn">\r\n				<i class="bottom_android_icon"></i>\r\n				<span>Android</span>\r\n			</div>\r\n			<div class="btn_wrap ui-flex">\r\n				<img class="bottom_code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_bottom_code.png" />\r\n				<span>扫描二维码关注公众号</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_bottom">\r\n		<p class="phone_number">客服电话：0755-26651930</p>\r\n		<p class="mt5"><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>\r\n</div>\r\n<div id="androidQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>\r\n<div id="iosQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mobile($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="mobile_top">\r\n		<div class="top_logo">\r\n			<img class="img-responsive logo_img" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_logo.png"/>\r\n		</div>\r\n		<img class="img-responsive mobile_top_bg" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_bg.jpg"/>\r\n		<div class="top_title">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_title.png"/>\r\n		</div>\r\n		<div class="top_preson">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_top_person.png"/>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_middle">\r\n		<div class="middle_content">\r\n			<div class="bt_watp ui-flex">\r\n				<a class="ios_btn" id="mobileTopDownIos">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_ios_btn.png" />\r\n				</a>\r\n				<a class="android_btn" id="mobileTopDownAndriod">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_andriod_btn.png"/>\r\n				</a>\r\n			</div>\r\n			<p class="middle_title mb5">专家晒米 我们不一样</p>\r\n			<p>操盘手心水 实单实战</p>\r\n			<p>国内外知名操盘手、店长实单推荐，众多足球篮球专家每日解读，助你收米</p>\r\n		</div>\r\n		<div class="middle_img">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_middle_img.jpg"/>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_code_wrap">\r\n		<p class="title01">晒米场  球迷的收米神器</p>\r\n		<p class="title02">请选择相应的机型下载</p>\r\n		<div class="btn_box ui-flex">\r\n			<div class="btn_wrap" id="mobileBottomDownIos">\r\n				<img class="ios_btn" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_ios.png"/>\r\n			</div>\r\n			<div class="btn_wrap" id="mobileBottomDownAndriod">\r\n				<img class="android_btn" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_andriod.png"/>\r\n			</div>\r\n			<div class="btn_wrap">\r\n				<img class="code" src="';
$out+=$escape(IMG_PATH);
$out+='/officialSite/officialSite_mobile_bottom_code.png"/>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="mobile_bottom">\r\n		<p class="phone_number">客服电话：0755-26651930</p>\r\n		<p class=""><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});