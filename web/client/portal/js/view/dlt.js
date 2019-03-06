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
})();exports.content=content;exports.ssqNum=ssqNum;exports.ssqBet=ssqBet;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function ssqNum($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<p class="close_time"><span id="issue"></span>期投注截止：<span class="size14 color_red" id="endTime"></span></p>\r\n	<div class="clearfix btn-tips">\r\n		<span class="fl filter_btn" @click="chooseRandomBall()">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="fr color6 tips">\r\n			至少选择5个红球 2个篮球\r\n		</span>\r\n	</div>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="redBallList">\r\n			<li class="fl" v-for="item in redBall">\r\n				<span class="red_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.redNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<section class="numbox">\r\n		<ul class="ctrl_ballbox clearfix" id="blueBallList">\r\n			<li class="fl" v-for="item in blueBall">\r\n				<span class="blue_ball size18" v-bind:class="item.select ? \'active\' : \'\'" @click="selectBall(item)">{{item.blueNum}}</span>\r\n			</li>\r\n		</ul>\r\n	</section>\r\n	<div class="buy_list">\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{singleUnit*2}} 元</span></div>\r\n				<div class="bonus">注数：{{singleUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="ensureSelect()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ssqBet($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex btn_wrap">\r\n		<span class="ui-flex_item filter_btn" @click="addRandomList(1)">\r\n			<span class="add_sign"></span>\r\n			机选1注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="addRandomList(5)">\r\n			<span class="add_sign"></span>\r\n			机选5注\r\n		</span>\r\n		<span class="ui-flex_item filter_btn ml10" @click="backToSsq()">\r\n			<span class="add_sign"></span>\r\n			手动选号\r\n		</span>\r\n	</div>\r\n	<div class="num_list mt10"> \r\n		<ul class="jxlist">\r\n			<li v-for="item in ssqItems">\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n						<em class="size20" v-for="redball in item.redballs">{{redball}}</em>\r\n					</span>\r\n<!--					--><span class="blue_ball">\r\n						<em class="size20" v-for="blueball in item.blueballs">{{blueball}}</em>\r\n					</span>\r\n				</div>\r\n				<a class="del_btn">\r\n					<span class="del" @click="cancel(item)"></span>\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pb10">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span><a href="#userVerifyProtocol&amp;type=2">《用户代购协议》</a></span>\r\n		</div>\r\n		<div class="mutiple_warp clearfix">\n			<div class="dlt_mutiple">\n				<span class="mr5">投</span>\r\n				<span class="icon_decrease_multiple mr10" @click="changeValue(-1)"></span>\r\n				<input type="number" v-model="multiple" maxlength="2" value="10" min="10" max="10000" />\r\n				<span class="icon_add_multiple ml10" @click="changeValue(1)"></span>\r\n				<span class="ml5">倍</span>\r\n				<span class="additional_wrap">\r\n					<input class="additional_btn" type="checkbox" name="" id="additional" @click="moneyAppend()"/>\r\n					<label class="additional" for="additional">追加投注</label>\r\n				</span>	\n			</div>	\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10">金额：<span class="colorf5e">{{prize}} 元</span></div>\r\n				<div class="bonus">注数：{{totalUnit}} 注</div>\r\n			</div>\r\n			<div class="pay_btn fr" @click="createSubmit()">\r\n				确定\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});