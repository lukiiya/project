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
})();exports.content=content;exports.gx11x5Num=gx11x5Num;exports.optional=optional;exports.gx11x5Bet=gx11x5Bet;exports.gx11x5List=gx11x5List;exports.Q1=Q1;exports.Q2ZHX=Q2ZHX;exports.Q2ZUX=Q2ZUX;exports.Q3ZHX=Q3ZHX;exports.Q3ZUX=Q3ZUX;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Num($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav_wrap" id="navWrap" style="display: none;">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<div class="item_content">\r\n					<span class="type">任二</span>\r\n					<div class="prize">奖金 <span>6元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<div class="item_content ">\r\n					<span class="type">任三</span>\r\n					<div class="prize">奖金 <span>19元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<div class="item_content">\r\n					<span class="type">任四</span>\r\n					<div class="prize">奖金 <span>78元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<div class="item_content">\r\n					<span class="type">任五</span>\r\n					<div class="prize">奖金 <span>540元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="5">\r\n				<div class="item_content">\r\n					<span class="type">任六</span>\r\n					<div class="prize">奖金 <span>90元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="6">\r\n				<div class="item_content">\r\n					<span class="type">任七</span>\r\n					<div class="prize">奖金 <span>26元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="7">\r\n				<div class="item_content">\r\n					<span class="type">任八</span>\r\n					<div class="prize">奖金 <span>9元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="8">\r\n				<div class="item_content">\r\n					<span class="type">前一</span>\r\n					<div class="prize">奖金 <span>13元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="9">\r\n				<div class="item_content">\r\n					<span class="type">前二直选</span>\r\n					<div class="prize">奖金 <span>130元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="10">\r\n				<div class="item_content">\r\n					<span class="type">前二组选</span>\r\n					<div class="prize">奖金 <span>65元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="11">\r\n				<div class="item_content">\r\n					<span class="type">前三直选</span>\r\n					<div class="prize">奖金 <span>1170元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="12">\r\n				<div class="item_content">\r\n					<span class="type">前三组选</span>\r\n					<div class="prize">奖金 <span>195元</span></div>\r\n				</div>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="ui-flex k3_top">\r\n		<div class="ui-flex_item draw_msg">\r\n			<div class="txtl">\r\n				<span class="color9 mb10"><b id="lastIssue"></b>期开奖</span>\r\n				<span class="result" id="result">\r\n					\r\n				</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			<div class="txtr">\r\n				<span class="color9 mb10">距<b id="issue"></b>期截止</span>\r\n				<span class="time" id="time"></span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0 元</span></div>\r\n				<div class="bonus" id="unit">注数：0 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="ensureBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function optional($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out=''; if (type == 1) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选2个或多个号码，所选号码与开奖号码任意2个号码相同即中奖，最高可中<span class="size12 color_red">6</span>元</p>\r\n	';
 } else if (type == 2) { 
$out+='\r\n		<p class="size12 color6" >玩法：从01~11中任选3个或多个号码，所选号码与开奖号码任意3个号码相同即中奖，最高可中<span class="size12 color_red">19</span>元</p>\r\n	';
 } else if (type == 3) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选4个或多个号码，所选号码与开奖号码任意4个号码相同即中奖，最高可中<span class="size12 color_red">78</span>元</p>\r\n	';
 } else if (type == 4) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选5个或多个号码，所选号码与开奖号码任意5个号码相同即中奖，最高可中<span class="size12 color_red">540</span>元</p>\r\n	';
 } else if (type == 5) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选6个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">90</span>元</p>\r\n	';
 } else if (type == 6) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选7个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">26</span>元</p>\r\n	';
 } else if (type == 7) { 
$out+='\r\n		<p class="size12 color6">玩法：从01~11中任选8个或多个号码，所选号码包含全部开奖号码即中奖，最高可中<span class="size12 color_red">9</span>元</p>\r\n	';
 }
$out+='\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = optionalNum.length; i < length; i++) {;
					var num = optionalNum[i].num;
			
$out+='\r\n			<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n				<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Bet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="k3_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="gx11x5List">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5List($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,recommend=$data.recommend,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var recommend = selectContent[i].recommend;
		compare = recommend.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(title + compare);
$out+='">\r\n		<div class="num_wrap ui-flex">\r\n			<span class="play_type">\r\n				[';
$out+=$escape(title);
$out+=']\r\n			</span> \r\n			<span class="sel_num ui-flex_item">\r\n				';
 
					for (var j = 0; j < recommend.length; j++) {
						var num = recommend[j];
				
$out+='\r\n					<em>';
$out+=$escape(num);
$out+='</em>\r\n				';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n		<a class="del_btn">\r\n			<span class="del"></span>\r\n		</a>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function Q1($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选1个或多个号码，所选号码与开奖号码第一位号码相同，即中奖<span class="size12 color_red">13</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q2ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从万、千位各选1个或多个号码，所选号码与开奖号码前两位号码相同（且顺序一致），即中奖<span class="size12 color_red">130</span>元。</p>\r\n	<!--<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item" tab="1">\r\n			直选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			组选\r\n		</li>\r\n	</ul>-->\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_kilobit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n		\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q2ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选2个或多个号码，所选号码与开奖号码前两位号码相同（顺序不限），即中奖<span class="size12 color_red">65</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q3ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从万、千、百位各选1个或多个号码，所选号码与开奖号码前三位号码相同（且顺序一致），即中奖<span class="size12 color_red">1170</span>元。</p>\r\n	<!--<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item" tab="1">\r\n			直选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			组选\r\n		</li>\r\n	</ul>-->\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_myriabit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_kilobit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_hundreds"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="thirdNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function Q3ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从01~11中任选3个或多个号码，所选号码与开奖号码前三位号码相同（顺序不限），即中奖<span class="size12 color_red">195</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});