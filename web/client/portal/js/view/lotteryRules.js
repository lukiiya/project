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
})();exports.k3Rules=k3Rules;exports.gx11x5Rules=gx11x5Rules;function k3Rules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<dl>\n		<dt>玩法规则</dt>\n		<dd>每期开出3个数字作为开奖号码，每个数字的取值范围为1~6（相当于摇出3个骰子）</dd>\n		<dt>销售时间</dt>\n		<dd>08:30-22:10，10分钟一期，每天82期</dd>\n		<dt>奖项设置</dt>\n		<dd>\n			<table>\n				<tr>\n					<th width="90">玩法</th>\n					<th width="165">中奖条件</th>\n					<th width="90">奖金</th>\n				</tr>\n				<tr>\n					<td>和值</td>\n					<td>猜中开奖号相加的和</td>\n					<td>9~240元</td>\n				</tr>\n				<tr>\n					<td>三同号单选</td>\n					<td>猜中111、222、333、444、555、666中指定一个</td>\n					<td>240元</td>\n				</tr>\n				<tr>\n					<td>三同号通选</td>\n					<td>111、222、333、444、555、666中任意一个</td>\n					<td>40元</td>\n				</tr>\n				<tr>\n					<td>二同号单选</td>\n					<td>猜中3个号（有2个号相同）</td>\n					<td>80元</td>\n				</tr>\n				<tr>\n					<td>二同号复选</td>\n					<td>猜中开奖中相同的2个号</td>\n					<td>15元</td>\n				</tr>\n				<tr>\n					<td>二不同号</td>\n					<td>猜中开奖中不相同的2个号</td>\n					<td>8元</td>\n				</tr>\n				<tr>\n					<td>三不同号</td>\n					<td>猜中3个号（各不相同）</td>\n					<td>40元</td>\n				</tr>\n				<tr>\n					<td>三连号通选</td>\n					<td>123、234、345、456任意一个开出</td>\n					<td>10元</td>\n				</tr>\n			</table>\n		</dd>\n		<dt>如何领奖</dt>\n		<dd>奖金将直接打入您的账户</dd>\n	</dl>';
return new String($out);
}).call(templateUtils,$data).toString()}function gx11x5Rules($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<dl>\n		<dt>玩法规则</dt>\n		<dd>每期从01-11 开出5个号码作为中奖号码</dd>\n		<dt>销售时间</dt>\n		<dd>09:00-23:50，10分钟一期，每天90期</dd>\n		<dt>奖项设置</dt>\n		<dd>\n			<table>\n				<tr>\n					<th width="90">玩法</th>\n					<th width="165">中奖条件</th>\n					<th width="90">奖金</th>\n				</tr>\n				<tr>\n					<td>任选二</td>\n					<td>选2个号,彩种开奖号码的任意2号</td>\n					<td>6元</td>\n				</tr>\n				<tr>\n					<td>任选三</td>\n					<td>选3个号,彩种开奖号码的任意3号</td>\n					<td>19元</td>\n				</tr>\n				<tr>\n					<td>任选四</td>\n					<td>选4个号,彩种开奖号码的任意4号</td>\n					<td>78元</td>\n				</tr>\n				<tr>\n					<td>任选五</td>\n					<td>选5个号,彩种开奖号码的任意5号</td>\n					<td>540元</td>\n				</tr>\n				<tr>\n					<td>任选六</td>\n					<td>选6个号,彩种开奖号码的任意5号</td>\n					<td>90元</td>\n				</tr>\n				<tr>\n					<td>任选七</td>\n					<td>选7个号,彩种开奖号码的任意5号</td>\n					<td>26元</td>\n				</tr>\n				<tr>\n					<td>前一</td>\n					<td>选1个号,彩种开奖的第1个号</td>\n					<td>13元</td>\n				</tr>\n				<tr>\n					<td>前二直选</td>\n					<td>选2个号与开奖的前2个号相同且顺序一致</td>\n					<td>130元</td>\n				</tr>\n				<tr>\n					<td>前二组选</td>\n					<td>选2个号与开奖的前2个号相同</td>\n					<td>130元</td>\n				</tr>\n				<tr>\n					<td>前三直选</td>\n					<td>选3个号与开奖的前3个号相同且顺序一致</td>\n					<td>1170元</td>\n				</tr>\n				<tr>\n					<td>前三组选</td>\n					<td>选3个号与开奖的前3个号相同</td>\n					<td>195元</td>\n				</tr>\n			</table>\n		</dd>\n		<dt>如何领奖</dt>\n		<dd>奖金将直接打入您的账户</dd>\n	</dl>';
return new String($out);
}).call(templateUtils,$data).toString()}});