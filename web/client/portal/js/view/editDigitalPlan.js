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
})();exports.content=content;exports.amountList=amountList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,recommendContent=$data.recommendContent,length=$data.length,item=$data.item,issue=$data.issue,title=$data.title,selectContent=$data.selectContent,$escape=$helpers.$escape,matchRecommend=$data.matchRecommend,$out=''; 
	var recommendContent = recommendContent || [];
	var length = recommendContent.length;
	if (length > 0) {
			var item = recommendContent[length-1] || {};
			var issue = item.issue;
			var title = item.title;
			var selectContent = item.selectContent;
			if (title == '直选') {
        		selectContent = selectContent.join("").split("|")[0].trim().split("　")+ '|' + selectContent.join("").split("|")[1].trim().split("　") + '|' + selectContent.join("").split("|")[2].trim().split("　");
        	} else {
        		selectContent = selectContent.join(",")
        	}

$out+='\r\n			<div class="select_box clearfix">\r\n				<span class="color6" id="issue">';
$out+=$escape(issue);
$out+='期</span>：\r\n				[<span class="">';
$out+=$escape(title);
$out+='</span>]\r\n				<span>';
$out+=$escape(selectContent);
$out+='</span>\r\n			</div>\r\n';
 } else { 
$out+='\r\n	<div class="select_box pr27 clearfix" id="selectMatch">\r\n		选择推荐项\r\n		<span class="icon_span icon_round_add"></span>\r\n	</div>\r\n';
 } 
$out+='\r\n<div class="select_box pr27 clearfix" id="fileSelectBox">\r\n	彩票实单截图(限一张)\r\n	<span class="icon_span icon_round_add"></span>\r\n	<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelect" name="file[]" type="file" multiple="true">\r\n</div>\r\n<div class="select_box clearfix" id="fileSelectedBox" style="display:none">\r\n	<div class="planpicBox"> \r\n		<div id="fileList"></div>\r\n		<div class="addFrame fl mt5 ml5">\r\n			<span class="editPic icon_add active"></span>\r\n			<span class="editPic icon_delete"></span>\r\n			<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="fileSelected" name="file[]" type="file" multiple="true">\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n<input type="hidden" id="matchRecommend" value="';
$out+=$escape(matchRecommend);
$out+='"/>\r\n<input type="hidden" id="amount" value=""/>\r\n<div class="textareaBox mt10">\r\n	<textarea id="content" class="textarea" placeholder="输入你分析的文字"></textarea>\r\n</div>\r\n<p class="color3 mt20">方案定价：</p>\r\n<div class="ui-flex mt10" id="amountList"></div>\r\n<div class="btn mt30" id="editSubmit">\r\n	发布\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function amountList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,amount=$data.amount,$escape=$helpers.$escape,$out=''; 
	for (var i = 0, length = list.length; i < length; i++) {
	var amount = list[i];

$out+='\r\n	<div class="textBar ui-flex_item ';
$out+=$escape(i>0?'ml10':'');
$out+='" amount="';
$out+=$escape(amount);
$out+='">';
$out+=$escape(amount==0?'免费':(amount/100)+'元');
$out+='</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});