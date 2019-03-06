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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_wdlszlzz_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_logo.png" alt="" />\r\n	</div>\r\n	<div class="wdlszlzz_cont">\r\n		<ul class="wdlszlzz_item_warp">\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title1"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img1.png"/>\r\n				<p class="item_describe">曼城贵为豪门联赛主场有保障；拉齐奥、瓦伦西亚本赛季变身拿分狂魔；拉涅利打造法甲神奇南特；德甲中游球队奥格斯堡表现不俗。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title2"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img2.png"/>\r\n				<p class="item_describe">皇马受替补阵容削弱的影响大，接连输盘；德甲科隆双线作战消耗严重；意甲升班马贝内文托创最差开局。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title3"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img3.png"/>\r\n				<p class="item_describe">巴黎新赛季火力冠绝全欧洲，巴萨无MSN组合导致进球效率下降明显。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title4"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img4.png"/>\r\n				<p class="item_describe">埃弗顿AC米兰豪掷两亿成绩却差强人意，尼斯欧战联赛双双失意。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title5"></h3>\r\n				<p class="item_describe mb10">冷门: 比赛打出赔率为5.5以上即为冷门。</p>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img5.png"/>\r\n				<p class="item_describe">英超法甲开赛至今冷门场次最多。皇马1比2负于赫罗纳打出12倍高赔，曼联1比2不敌哈镇打出9.1倍高赔。</p>\r\n			</li>\r\n			<li class="wdlszlzz_item">\r\n				<h3 class="item_title title6"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_img6.png"/>\r\n				<p class="item_describe mb35">四队主场胜率高达100%！英超西甲卫冕冠军竟然只有五成。</p>\r\n				<p class="item_describe">以上联赛数据资料截止至2017年11月6日。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="btn_wrap ui-flex">\r\n			<a class="bet_btn" id="betBtn">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_bet.png"/>\r\n			</a>\r\n			<a class="share_btn" id="shareBtn">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_share.png"/>\r\n			</a>\r\n		</div>\r\n		<div class="download_img mb40">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_wdlszlzz_download.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});