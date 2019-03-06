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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_christmas_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_logo.png" alt="" />\r\n	</div>\r\n	<div class="christmas_cont">\r\n		<ul class="christmas_item_warp">\r\n			<li class="christmas_item">\r\n				<p class="item_describe mb20">欧洲四大联赛将在即将到来的圣诞节前迎来冬歇期调整，而唯独英超将在接下来的12月23日到18年1月1日这极短的时间内连续迎来4轮圣诞赛程。晒米场也为即将到来的圣诞赛程独家准备了彩民必备手册。</p>\r\n				<h3 class="item_title title1"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img1.png"/>\r\n				<p class="item_describe">本赛季圣诞赛程阿森纳最为轻松 4场比赛间隔多达12天，而曼联赛程最为紧张，球队首尾两场比赛之间间隔只有不到9天。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title2"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img2.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程，热刺胜场最多并且保持不败，切尔西则胜率最低。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title3"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img3.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程里2.4赔率以上的打出率高达50% ，可见冷门不少。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title4"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img4.png"/>\r\n				<p class="item_describe">过去三个赛季的圣诞赛程，主队胜率稳步上升，而平局出现场次逐年减少。</p>\r\n			</li>\r\n			<li class="christmas_item">\r\n				<h3 class="item_title title5"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_img5.png"/>\r\n				<p class="item_describe mb50">过去三赛季的圣诞赛程每队共9场比赛，曼城打出的大球次数最多，而水晶宫的小球次数最多。</p>\r\n				<p class="item_describe">注：以上数据采集为英超1415赛季、1516赛季、1617赛季三赛季圣诞赛程资料。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="download_img mb25 mt5">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='christmas/activity_christmas_download.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});