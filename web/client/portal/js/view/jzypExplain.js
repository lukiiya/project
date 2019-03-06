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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_jzyp_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_explain_logo.png" alt="" />\r\n	</div>\r\n	<div class="jzyp_cont">\r\n		<p class="">亚盘，估计玩足彩的彩民们都会有所耳闻，但是它与足彩之间有什么样的关系，又有什么玩法可以将亚盘和足彩融合在一起？今天就为大家讲解下晒米场新推的“竞足亚盘”玩法。 </p>\r\n		<div class="yp_explain">\r\n			<h2 class="h2-title">亚盘是什么</h2>\r\n			<p class="">亚盘的存在形态是通过让球盘口使得两个相差悬殊的球队之间能够在一个相对公平的平台上进行较量，从而拉平了双方客观上存在的实力差距。亚盘是按照亚洲人的思维进行足球博弈的方式。完整的亚盘由对阵球队、盘口(让球数)、贴水(获胜赔率)三部分组成。</p>\r\n		</div>\r\n		<ul class="jzyp_item_warp mt35">\r\n			<li class="jzyp_item mb40">\r\n				<h3 class="yp_title1 mb10"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_img1.png"/>\r\n				<p class="item_describe mt10">指全场90分钟（含伤停补时）主队实际进球数加减赛前让球数(±0.5)，与客队实际进球数相比得出最终赛果，根据两队的实力差距，让球数会变化。</p>\r\n			</li>\r\n			<li class="jzyp_item">\r\n				<h3 class="yp_title2 mb10"></h3>\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_img2.png"/>\r\n				<p class="item_describe mt10">胜平负指全场90分钟（含伤停补时）主队打出的胜、平、负赛果情况。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="jzyp">\r\n			<h2 class="h2-title">竞足亚盘是什么</h2>\r\n			<p class="">晒米场在竞彩足球的基础上加入竞足亚盘最新玩法，将胜平负/让球胜平负六个选项精简为简单易懂的二选一方式，以亚盘半球(0.5球)的形式为标准设定为非赢即输的选项，红单几率也因此大大提升到50%。</p>\r\n		</div>\r\n		<ul class="jzyp_item_warp mt40">\r\n			<li class="jzyp_item mb35">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_img3.png"/>\r\n				<p class="item_describe mt10">1.主胜-0.5<br />若投注主-0.5胜，即为选择主胜。当主队以净胜一球及一球以上的赛果打出时，则此投注为红单。客胜-0.5同理之。</p>\r\n			</li>\r\n			<li class="jzyp_item mb35">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_img4.png"/>\r\n				<p class="item_describe mt10">2.客胜+0.5<br />\r\n若投注客+0.5胜，即为选择主队不胜(平局或客队胜)。当双方以打平或客队净胜一球及一球以上的赛果打出时，则此投注为红单。主胜+0.5同理之。</p>\r\n			</li>\r\n		</ul>\r\n		<div class="jzyp_item_warp">\r\n			<h3 class="h3-title mb10">竞足亚盘的优势</h3>\r\n			<p class="mb30">\r\n				（1）红单几率大大提升，更易中奖；<br />\r\n				（2）投注选项减少为六变二，玩法更简单；<br />\r\n				（3）竞足亚盘与竞彩一致，同享2串1加奖幅度<br />\r\n			</p>\r\n			<div class="mb50">\r\n				<span class="size14">注明：</span><br />\r\n				1．竞足亚盘玩法是在竞彩足球基础上演变而来，投注的内容还是竞彩胜平负/让球胜平负，同样享受加奖福利（竞彩2串1最高加奖10.2%）。<br />\r\n				2．投注场次：晒米场竞足亚盘所选场次为竞彩足球精选赛事，场次并不完全与竞彩足球一致。<br />\r\n				3．过关投注：竞足亚盘玩法无法进行单场投注选择，必须至少选择两场赛事组合串关进行投注。<br />\r\n			</div>\r\n		</div>\r\n		<div class="download_img mb25 mt5">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='jzypExplain/jzyp_explain_download.png"/>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});