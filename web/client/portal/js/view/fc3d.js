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
})();exports.content=content;exports.fc3dNum=fc3dNum;exports.ZUX=ZUX;exports.fc3dBet=fc3dBet;exports.fc3dList=fc3dList;exports.HZ=HZ;exports.ZHX=ZHX;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function fc3dNum($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,recommend=$data.recommend,$out='';$out+='<div class="nav_wrap">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<span>直选</span>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<span>和值</span>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<span>组三</span>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<span>组六</span>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<p class="deadline">距<span id="issue"></span>期截止：<span class="color_red" id="time"></span></p>\r\n		';
 if (!recommend) { 
$out+='\r\n			<div class="pay_info clearfix">\r\n				<div class="pay_left fl">\r\n					<div class="mb10">金额：<span class="colorf5e" id="price">0 元</span></div>\r\n					<div class="bonus" id="unit">注数：0 注</div>\r\n				</div>\r\n				<div class="pay_btn fr" id="ensureBtn">\r\n					确定\r\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ZUX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,type=$data.type,i=$data.i,length=$data.length,ZxNum=$data.ZxNum,num=$data.num,$escape=$helpers.$escape,$out=''; if (type == 3) { 
$out+='\r\n		<p class="size12 color6">玩法：至少选择2个号码，开奖号码为组三且包含在选号中即中奖<span class="size12 color_red">346</span>元。组三是指开奖号码中任意两位号码相同，如166。</p>\r\n	';
 } else if (type == 4) { 
$out+='\r\n		<p class="size12 color6">玩法：至少选择3个号码，开奖号码为组六且包含在选号中即中奖<span class="size12 color_red">173</span>元。组六是指开奖号码中三个号码各不相同，如135。</p>\r\n	';
 } 
$out+='\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = ZxNum.length; i < length; i++) {
					var num = ZxNum[i].num;
			
$out+='\r\n			<li class="num_item_5" data-value ="';
$out+=$escape(num);
$out+='">\r\n				<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dBet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="fc3d_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="fc3dList">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="price">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,selectNum=$data.selectNum,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var selectNum = selectContent[i].selectContent;
		compare = selectNum.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(title + compare);
$out+='">\r\n		<div class="num_wrap ui-flex">\r\n			<span class="play_type">\r\n				[';
$out+=$escape(title);
$out+=']\r\n			</span> \r\n			<span class="sel_num ui-flex_item">\r\n				';
 
					for (var j = 0; j < selectNum.length; j++) {
						var num = selectNum[j];
				
$out+='\r\n					<em>';
$out+=$escape(num);
$out+='</em>\r\n				';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n		<a class="del_btn">\r\n			<span class="del"></span>\r\n		</a>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function HZ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,HzNum=$data.HzNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：和值是指开奖号码中三个号码之和，所选和值与开奖号码和值一致即中奖<span class="size12 color_red">1040</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = HzNum.length; i < length; i++) {;
						var num = HzNum[i].num;
				
$out+='\r\n				<li class="num_item_5" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ZHX($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,optionalNum=$data.optionalNum,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6 tips">玩法：从百、十、个位至少各选1个号码，单注选号与开奖号码按位一致即中奖<span class="size12 color_red">1040</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_hundreds"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="firstNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_deckle"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="secondNum">\r\n				';

					for (var i = 0, length = optionalNum.length; i < length; i++) {;
						var num = optionalNum[i].num;
				
$out+='\r\n				<li class="num_item_6" data-value ="';
$out+=$escape(num);
$out+='">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n				</li>\r\n				';
 } 
$out+='\r\n			</ul>\r\n			\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_unit"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="thirdNum">\r\n				';

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