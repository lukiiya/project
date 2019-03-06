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
})();exports.content=content;exports.k3Num=k3Num;exports.HZ=HZ;exports.STH=STH;exports.SBT=SBT;exports.SLH=SLH;exports.ETH=ETH;exports.EBT=EBT;exports.k3Bet=k3Bet;exports.k3List=k3List;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function k3Num($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="nav_wrap" id="navWrap" style="display: none;">\r\n		<ul class="nav clearfix" id="typeList">\r\n			<li class="item" type="1">\r\n				<div class="item_content">\r\n					<span class="type">和值</span>\r\n					<div class="prize">奖金 <span>9~240元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="2">\r\n				<div class="item_content ">\r\n					<span class="type">二同号</span>\r\n					<div class="prize">奖金 <span>80元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="3">\r\n				<div class="item_content">\r\n					<span class="type">二不同</span>\r\n					<div class="prize">奖金 <span>8元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="4">\r\n				<div class="item_content">\r\n					<span class="type">三同号</span>\r\n					<div class="prize">奖金 <span>240元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="5">\r\n				<div class="item_content">\r\n					<span class="type">三不同</span>\r\n					<div class="prize">奖金 <span>40元</span></div>\r\n				</div>\r\n			</li>\r\n			\r\n			<li class="item" type="6">\r\n				<div class="item_content">\r\n					<span class="type">三连号</span>\r\n					<div class="prize">奖金 <span>10元</span></div>\r\n				</div>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="ui-flex k3_top">\r\n		<div class="ui-flex_item draw_msg">\r\n			<div class="txtl">\r\n				<span class="color9 mb10"><b id="lastIssue"></b>期开奖</span>\r\n				<span class="result" id="result">\r\n					<!--<i class=""></i>\r\n					<i class=""></i>\r\n					<i class=""></i>-->\r\n				</span>\r\n			</div>\r\n		</div>\r\n		<div class="ui-flex_item">\r\n			<div class="txtr">\r\n				<span class="color9 mb10">距<b id="issue"></b>期截止</span>\r\n				<span class="time" id="time"></span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="num-list" id="numList"></div>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="prize">0 元</span></div>\r\n				<div class="bonus" id="unit">注数：0 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="ensureBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function HZ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,hzNum=$data.hzNum,award=$data.award,num=$data.num,$escape=$helpers.$escape,$out='';$out+='<p class="size12 color6">玩法：至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖，最高可中<span class="size12 color_red">240</span>元</p>\r\n	<ul class="tabBar clearfix" id="tabBar">\n		<li class="tab_item fl" tab="1" data-value = "big">\r\n			<span class="size13">大</span>\r\n			<span class="size10 color9">11－18</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="2" data-value = "small">\r\n			<span class="size13">小</span>\r\n			<span class="size10 color9">３－10</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="3" data-value = "odd">\r\n			<span class="size13">单</span>\r\n			<span class="size10 color9">所有奇数</span>\r\n		</li>\r\n		<li class="tab_item fl" tab="4" data-value = "even">\r\n			<span class="size13">双</span>\r\n			<span class="size10 color9">所有偶数</span>\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			';

				for (var i = 0, length = hzNum.length; i < length; i++) {
					var award = hzNum[i].award;
					var num = hzNum[i].num;
			
$out+='\r\n			<li class="num_item_4" data-value = "';
$out+=$escape(num);
$out+='">\r\n				<div class="num_cont">\r\n					<span class="num">';
$out+=$escape(num);
$out+='</span>\r\n					<div class="award">';
$out+=$escape(award);
$out+='元</div>\r\n				</div>\r\n			</li>\r\n			';
 } 
$out+='\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function STH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖，单注奖金<span class="size12 color_red">240</span>元。</p>\r\n	<p class="size12 color6 tips" style="display: none;">玩法：对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">40</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active" tab="1">\r\n			单选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			通选\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">111</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">222</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">333</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">444</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">555</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">666</span>\r\n			</li>\r\n		</ul>\r\n		<ul class="num_wrap clearfix" style="display: none;">\r\n			<li class="num_item_1">\r\n				<span class="num">三同号通选</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选3个或多个号码，所选号码与开奖号码3个号码相同，即中奖<span class="size12 color_red">40</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SLH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：对所有三个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖，单注奖金<span class="size12 color_red">10</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_1">\r\n				<span class="num">三连号通选</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ETH($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6 tips">玩法：选择1对相同号码和1个不同号码投注，选号与奖号相同（不限顺序）即中奖,单注奖金<span class="size12 color_red">80</span>元。</p>\r\n	<p class="size12 color6 tips" style="display: none;">玩法：从11~66中任选1个或多个号码，选号与奖号（包含11~66，不限顺序）相同即中奖,单注奖金<span class="size12 color_red">15</span>元。</p>\r\n	<ul class="ui-flex tabBar" id="tabBar">\r\n		<li class="ui-flex_item active" tab="1">\r\n			单选\r\n		</li>\r\n		<li class="ui-flex_item" tab="2">\r\n			复选\r\n		</li>\r\n	</ul>\r\n	<div class="numBox" id="numBox">\r\n		<div class="tabBox">\r\n			<div class="icon_wrap mb20">\r\n				<span class="icon_th"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="EDXTH">\r\n				<li class="num_item_3" data-value = "1">\r\n					<span class="twoNum">11</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "2">\r\n					<span class="twoNum">22</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "3">\r\n					<span class="twoNum">33</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "4">\r\n					<span class="twoNum">44</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "5">\r\n					<span class="twoNum">55</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "6">\r\n					<span class="twoNum">66</span>\r\n				</li>\r\n			</ul>\r\n			<div class="icon_wrap mb30">\r\n				<span class="icon_bth"></span>\r\n			</div>\r\n			<ul class="num_wrap clearfix" id="EDXBTH">\r\n				<li class="num_item_3" data-value = "1">\r\n					<span class="twoNum">1</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "2">\r\n					<span class="twoNum">2</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "3">\r\n					<span class="twoNum">3</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "4">\r\n					<span class="twoNum">4</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "5">\r\n					<span class="twoNum">5</span>\r\n				</li>\r\n				<li class="num_item_3" data-value = "6">\r\n					<span class="twoNum">6</span>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n		<div class="tabBox" style="display: none;">\r\n			<ul class="num_wrap clearfix" id="numWrap">\r\n				<li class="num_item_3">\r\n					<span class="num">11*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">22*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">33*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">44*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">55*</span>\r\n				</li>\r\n				<li class="num_item_3">\r\n					<span class="num">66*</span>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function EBT($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="size12 color6">玩法：从1-6中任选两个或多个号码，所选号码与开奖号码任意两个号码相同即中奖,单注奖金<span class="size12 color_red">8</span>元。</p>\r\n	<div class="numBox" id="numBox">\r\n		<ul class="num_wrap clearfix" id="numWrap">\r\n			<li class="num_item_3">\r\n				<span class="num">1</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">2</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">3</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">4</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">5</span>\r\n			</li>\r\n			<li class="num_item_3">\r\n				<span class="num">6</span>\r\n			</li>\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function k3Bet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="k3_betCont">\r\n		<p class="title">距<span id="issue"></span>期投注截止 <span class="color_red size13" id="time"></span>：</p>\r\n		<div class="bet_list">\r\n			<ul class="" id="k3List">\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div> \r\n		<div class="mutiple_warp">\r\n			<span class="mr5">买</span>\r\n			<span class="icon_decrease_multiple mr10" id="minusMultiple"></span>\r\n			<input type="number" value="1" min="1" max="9999" id="multiple"/>\r\n			<span class="icon_add_multiple ml10" id="addMultiple"></span>\r\n			<span class="ml5">倍</span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e" id="prize">0</span> 元</div>\r\n				<div class="bonus">注数：<span id="totalUnit">0</span> 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="submitBtn">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function k3List($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,selectContent=$data.selectContent,title=$data.title,recommend=$data.recommend,compare=$data.compare,$escape=$helpers.$escape,j=$data.j,num=$data.num,$out='';
		for (var i = 0, length = selectContent.length; i < length; i++) {
		var title = selectContent[i].title;
		var recommend = selectContent[i].recommend;
		compare = recommend.join(' ');
	
$out+='\r\n	<li compare="';
$out+=$escape(compare);
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
}).call(templateUtils,$data).toString()}});