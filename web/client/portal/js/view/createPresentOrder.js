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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<section class="hb_index">\r\n		<div class="mt25">\r\n			<input class="presentNum" type="number" id="presentNum" placeholder="请输入赠送人数" />\r\n			<p class="tips">*注：赠送有效期为一周，默认为每人机选一注双色球</p>\r\n		</div>\r\n		<!--<div class="mt25">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_sj.png" />\r\n			<p class="tips">*注：默认为机选</p>\r\n		</div>-->\r\n		<div class="mt25">\r\n			<h3 class="greeting_tit">请选择你的双色球红包祝福语</h3>\r\n			<ul class="greeting_btn clearfix mt10" id="greetingBtn">\r\n				<li class="fl" tab="1">\r\n					<div class="btn_item">\r\n						<!--<span>节日快乐</span>-->\r\n						<span>新年快乐</span>\r\n						<i class="icon_jr"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="2">\r\n					<div class="btn_item">\r\n						<!--<span>财源广进</span>-->\r\n						<span>财源滚滚</span>\r\n						<i class="icon_cy"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="3">\r\n					<div class="btn_item">\r\n						<!--<span>财色双收</span>-->\r\n						<span>年年有余</span>\r\n						<i class="icon_st"></i>\r\n					</div>\r\n				</li>\r\n				<li class="fl" tab="4">\r\n					<div class="btn_item">\r\n						<!--<span>天天中奖</span>-->\r\n						<span>名利双收</span>\r\n						<i class="icon_sy"></i>\r\n					</div>\r\n				</li>\r\n			</ul>\r\n			<textarea class="greet_txt mt25" id="presentRemark">\r\n			</textarea>\r\n			<!--<div class="greet_txt mt25">\r\n				祝你<span>节日快乐</span>，500万大奖等你拿！\r\n			</div>-->\r\n		</div>\r\n		<a class="ensure_btn mt35 mb30" id="payBtn">马上付款￥<span class="prize" id="prize">0</span> 元</a>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}});