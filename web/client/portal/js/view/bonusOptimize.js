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
})();exports.content=content;exports.vueContent=vueContent;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex tab_nav" id="optimizeTab">\r\n		<div class="ui-flex_item active" tab="1">平均优化</div>\r\n		<div class="ui-flex_item" tab="2">博热优化</div>\r\n		<div class="ui-flex_item" tab="3">博冷优化</div>\r\n	</div>\r\n	<div id="vueContent">\r\n		\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function vueContent($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mt5 optimize_detail" id="optimizeDetail">\r\n		<div class="input_wrap">\r\n			优化金额：<input id="totalAmount" type="number" v-model="totalAmount" v-on:input="total()" /> 元\r\n		</div>\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="135">选项</th>\r\n					<th width="105">理论奖金</th>\r\n					<th>分配金额</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="matchList">\r\n				<tr v-for="item in matchList">\r\n					<td class="option">\r\n						<div v-for="match in item.options">\r\n							{{match.number}}<span class="size12 color6"> [{{match.bettypeContent == \'RQSPF\' ? \'让\' : \'\'}}{{match.bettype}} {{match.odd}}]</span>\r\n						</div>\r\n					</td>\r\n					<td>\r\n						<span class="color_red size16">{{item.theoryPrize}}</span>\r\n					</td>\r\n					<td>\r\n						<span class="icon_decreaseBonus" @click="changeValue(item,-2)"></span>\r\n						<span class="unitAmount">{{item.unitAmount}}</span>\r\n						<!--<input type="number" v-model="item.unitAmount" v-on:input="count(item)"/>-->\r\n						<span class="icon_addBouns" @click="changeValue(item,2)"><b></b></span>\r\n					</td>\r\n				</tr>\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class="buy_list">\r\n		<div class="read pl10 pt5">\r\n			<input class="mr5" type="checkbox" name="tongyi" id="protocol" checked="checked">\r\n			<label for="protocol">已阅读并同意</label>\r\n			<span id="userVerifyProtocol"><a>《用户代购协议》</a></span>\r\n		</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="pay_num" id="ticketAmount">共 {{totalAmount}} 元</div>\r\n				<div class="bonus" id="maxPrize">理论最大奖金：{{maxPrize}}</div>\r\n			</div>\r\n			<div class="pay_btn fr" id="createTicketSubmit" @click="submit()">\r\n				投注\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});