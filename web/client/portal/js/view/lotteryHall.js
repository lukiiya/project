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
var $helpers=this,lotteryIdMap=$data.lotteryIdMap,i=$data.i,list=$data.list,lotteryId=$data.lotteryId,lotteryName=$data.lotteryName,remark=$data.remark,tag=$data.tag,logoMap=$data.logoMap,tagMap=$data.tagMap,sale=$data.sale,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,Object=$data.Object,$out='';$out+='<section>\r\n		<div class="ui-flex lottery_item_wrap" id="lotteryList">\r\n			';

				var lotteryIdMap = {'JCZQ': true,'JCLQ': true,'SSQ': true,'JSK3': true,'DLT': true,'GX11X5': true,'FC3D': true,'JZYP': true,'SJBCGJ': true,'XYDZP': true,'ZXKJ': true};
				for (var i = 0; i < list.length; i++) {
					var lotteryId = list[i].lotteryId;
					var lotteryName = list[i].lotteryName;
					var remark = list[i].remark;
					var tag = list[i].tag;
					var logoMap = {'SSQ':'icon_ssq','JCZQ':'icon_jczq','JCLQ':'icon_jclq','JSK3':'icon_jsk3','DLT':'icon_dlt','GX11X5':'icon_gx11x5','FC3D':'icon_fc3d','JZYP':'icon_jzyp','SJBCGJ':'icon_sjbcgj','XYDZP':'icon_xydzp','ZXKJ':'icon_recentAwards'};
					var tagMap = {'加奖': 'icon_wrap_jj','今日开奖': 'icon_wrap_kj'};
					var sale = list[i].sale;
			
$out+='\r\n				';
 if (lotteryIdMap[lotteryId] && sale) { 
$out+='\r\n					<div class="flex_item" lotteryId=\'';
$out+=$escape(lotteryId);
$out+='\'>\r\n						<div class="ui-flex borderr lottery_item">\r\n							<img class="lotteryHall_icon" src="';
$out+=$escape(IMG_PATH);
$out+=$escape(logoMap[lotteryId]);
$out+='.png" />\r\n							<div class="ml10">\r\n								<span class="size14 color3">';
$out+=$escape(lotteryName);
$out+='</span><br />\r\n								<span class="size11 color6 mt5">';
$out+=$escape(remark);
$out+='</span>\r\n							</div>\r\n							<span class="';
$out+=$escape(tagMap[tag]);
$out+='"></span>\r\n						</div>\r\n					</div>\r\n				';
 } 
$out+='	\r\n			';
 } 
$out+='\r\n			';
 if (list.length % 2 != 0 && Object.keys(lotteryIdMap).length % 2 != 0) { 
$out+='\r\n			<div class="flex_item">\r\n				<div class="ui-flex lottery_item">\r\n					<i class="lotteryHall_icon icon_jqqd"></i>\r\n					<div class="ml10">\r\n						<span class="size14 color3">敬请期待</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}});