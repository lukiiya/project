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
})();exports.content=content;exports.turnplate=turnplate;exports.prizeRecord=prizeRecord;exports.prizeRecordList=prizeRecordList;exports.trunplateNotice=trunplateNotice;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function turnplate($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div>\r\n		<img class="turnplate_title" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate_title.png"/>\r\n		<div class="banner">\r\n			<img id="rotatebg" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate.png" style="-webkit-transform: rotate(0deg);position: relative;"/>\r\n			<img class="pointer" src="';
$out+=$escape(IMG_PATH);
$out+='turnplate_btn.png" id="start">\r\n		</div>\r\n		<p class="chance mt20">您还剩余 <span class="chance_num" id="turnplateCount">0</span> 机会<span class="tips record" id="prizeRecordBtn">抽奖记录</span></p>\r\n		<p class="tips mt5">抽奖前请仔细阅读活动规则</p>\r\n		<!--<div class="act_btn mt20">\r\n			邀请好友\r\n		</div>-->\r\n		<div class="act_btn mt10 mb10" id="rulesBtn">\r\n			活动规则\r\n		</div>\r\n		<div class="mask" style="display: none;" id="turnplateMask">\r\n			<div class="rules" id="rules" style="display: none;">\r\n				<div class="rules_title clearfix">\r\n					<span class="fl">活动规则</span>\r\n					<span class="fr" id="closeRuleBtn">关闭</span>\r\n				</div>\r\n				<pre class="rules_list" id="remark" style="line-height: 20px;white-space: pre-wrap;font-size: 15px;"></pre>\r\n			</div>\r\n			<div class="notice" id="trunplateNotice" style="display: none;"></div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function prizeRecord($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="ui-flex prize_nav">\r\n		<li class="ui-flex_item">时间</li>\r\n		<li class="ui-flex_item">奖品</li>\r\n		<li class="ui-flex_item">派送方式</li>\r\n	</ul>\r\n	<ul id="prizeRecordList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function prizeRecordList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,prizeRecord=$data.prizeRecord,prizeName=$data.prizeName,sendType=$data.sendType,createTime=$data.createTime,d=$data.d,$escape=$helpers.$escape,$out='';
	for (var i = 0, length = list.length; i < length; i++) {
	var prizeRecord = list[i] || {};
	var prizeName = prizeRecord.prizeName;
	var sendType = prizeRecord.sendType;
	var createTime = prizeRecord.createTime && prizeRecord.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";

$out+='\r\n	<li class="ui-flex record_item">\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(createTime);
$out+='\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(prizeName);
$out+='\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			';
$out+=$escape(sendType);
$out+='\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function trunplateNotice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,numMap=$data.numMap,rotate=$data.rotate,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';  var numMap =  {'fiveCj':'5','twentyCj':'20','twoCj1':'2','twoCj2':'2'};
		if (rotate == 'thk1' || rotate == 'thk2' || rotate == 'fiveCj' || rotate == 'twentyCj' || rotate == 'twoCj1' || rotate == 'twoCj2' || rotate == 'poloShirt') { 
$out+='\r\n			<div class="notice_title">\r\n				';
 if (rotate == 'thk1' || rotate == 'thk2') { 
$out+='\r\n					<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_sorry.png"/>\r\n				';
 } else { 
$out+='\r\n					<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_congrats.png"/>\r\n				';
 } 
$out+='\r\n				<a class="close_notice icon_close" id="closeNotice"></a>\r\n			</div>\r\n		';
 if (rotate == 'poloShirt') { 
$out+='\r\n			<div class="awards pt20">\r\n				<img class="img_shirt" src="';
$out+=$escape(IMG_PATH);
$out+='img-shirt.png">\r\n				<p class="pb15">获得了<span class="color_red"> 正品球衣</span> ！</p>\r\n				<p class="size11 pb5 contact">请联系晒米场客服微信：shaimichang</p>\r\n				<p class="color_red size11 pb15">需截图作为凭证！</p>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="cont pb15">\r\n				';
 if (rotate == 'thk1' || rotate == 'thk2') { 
$out+='\r\n					<p class="txt-cont size18">\r\n						很可惜，没有抽中\r\n					</p>\r\n				';
 } else if (rotate == 'fiveCj' || rotate == 'twentyCj' || rotate == 'twoCj1' || rotate == 'twoCj2') { 
$out+='\r\n					<p class="txt-cont size18">\r\n						获得了 <span class="color_red size20">';
$out+=$escape(numMap[rotate]);
$out+='</span> 彩金\r\n					</p>\r\n				';
 } 
$out+='\r\n				<a class="btn" id="ensure">\r\n					确定\r\n				</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } else { 
$out+='\r\n		<div class="notice_title">\r\n			<img class="img_title" src="';
$out+=$escape(IMG_PATH);
$out+='icon_sorry.png"/>\r\n			<a class="close_notice icon_close" id="closeNotice"></a>\r\n		</div>\r\n		<div class="cont pb15">\r\n			<p class="txt-cont">\r\n				您目前没有抽奖机会<br />每消费一次获得1次抽奖机会\r\n			</p>\r\n			<a class="btn" id="buyPlan">\r\n				确定\r\n			</a>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});