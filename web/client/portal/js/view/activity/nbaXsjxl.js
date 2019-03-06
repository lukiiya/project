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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="nbaQdxl_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='nbaQdxl_banner.png" alt="" />\r\n	</div>\r\n	<div class="logo_wrap">\r\n		<div class="ui-flex_item">\r\n			<div class="east_alliance_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='east_alliance_logo.png" />\r\n			</div>\r\n			<ul class="logo_box clearfix">\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/NUatz1nD7oTH4GGEt56Gkg" >\r\n						<div class="logo_item mr15 cel"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/ikqfZIJedlV_8gK8MMGoxg" >\r\n						<div class="logo_item cle"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/d3LGHyqtGN0mkVPlL-YGKg" >\r\n						<div class="logo_item mr15 tor"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/jrduN_b3kt2iyVScRK5OWA" >\r\n						<div class="logo_item mia"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/ZuHads2j_BQhwi6StVTVCQ" >\r\n						<div class="logo_item mr15 was"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/FdcLEOHTivvrTAj96DuqXg" >\r\n						<div class="logo_item mil"></div>\r\n					</a>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n		<div class="line"></div>\r\n		<div class="ui-flex_item">\r\n			<div class="west_alliance_logo">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='west_alliance_logo.png" />\r\n			</div>\r\n			<ul class="logo_box">\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/7TxnwwIxuz8gA_VgN-EwUA" >\r\n						<div class="logo_item oct"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/xgPsaVVNtm7-wN0bZdwWfA" >\r\n						<div class="logo_item gsw"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/LM1NIYgB9608yWbVf6fONw" >\r\n						<div class="logo_item lac"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/O22j6QZ7hrr19vFc23A2ow" >\r\n						<div class="logo_item min"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/LWXuUvqU2h8TLrWbwSKGCw" >\r\n						<div class="logo_item sas"></div>\r\n					</a>\r\n				</li>\r\n				<li>\r\n					<a href="https://mp.weixin.qq.com/s/EcYCLGNl8WFkHNd7Xf1F8A" >\r\n						<div class="logo_item hou"></div>\r\n					</a>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="bottom_banner">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='nbaQdxl_bottom_banner.png" />\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});