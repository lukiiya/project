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
})();exports.pc=pc;exports.mobile=mobile;function pc($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="pc">\r\n	<div class="pc_left fl">\r\n		<img class="img-responsive pc_phone" src="';
$out+=$escape(IMG_PATH);
$out+='pc_phone.png"/>\r\n	</div>\r\n	<div class="pc_right fr">\r\n		<div class="pc_right_top">\r\n			<img class="img-responsive pc_logo" src="';
$out+=$escape(IMG_PATH);
$out+='PC_logo.png"/>\r\n		</div>\r\n		<div class="pc_right_bottom">\r\n			<img class="img-responsive fl pc_code" src="';
$out+=$escape(IMG_PATH);
$out+='pc_code.png"/>\r\n			<div class="download_btn_wrap fr">\r\n				<a id="androidBtn">\r\n					<div class="download_btn icon_android mb35"></div>\r\n				</a>\r\n				<a id="iphoneBtn">\r\n					<div class="download_btn icon_iphone"></div>\r\n				</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="pc_bottom">\r\n		<p>晒米场&nbsp;&nbsp;一晒米 就收米</p>\r\n		<p><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">深圳算盘彩娱网络科技有限公司 粤ICP备16039808号-2</a></p>\r\n	</div>\r\n</div>\r\n<div id="androidQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>\r\n<div id="iosQrCode" class="modal" style="display: none;">\r\n	<img src="http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/download.png">\r\n	<p>扫描二维码<br>下载手机版 app<br></p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function mobile($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="down-clumn">\r\n		<div class="mb-logo">晒米场</div>\r\n		<div class="btn_wrap">\r\n			<a class="down-btn down_ios" id="mobileDownIos">ihone下载</a>\r\n			<a class="down-btn down_android" id="mobileDownAndriod">adroid下载</a>\r\n		</div>\r\n		<p class="down_txt">点击右上角三个点，选择在"浏览器中打开"即可</p>\r\n	</div>\r\n	<div class="mb_download_bottom">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='mb_download_bottom.png"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});