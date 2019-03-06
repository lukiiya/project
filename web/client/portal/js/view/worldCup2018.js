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
})();exports.content=content;exports.matchList=matchList;exports.filterList=filterList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ui-flex nav_wrap" id="navTab">\r\n		<div class="ui-flex_item" tab = "1">\r\n			<span>冠军</span>\r\n		</div>\r\n		<div class="ui-flex_item" tab = "2">\r\n			<span>冠亚军</span>\r\n		</div>\r\n	</div>\r\n	<ul class="filter_wrap ui-flex mt5" id="filterList" style="display: none;"></ul>\r\n	<div class="team-list mt5">\r\n		<ul class="team_wrap ui-flex" id="matchList"></ul>\r\n	</div>			\r\n	<div class="buy_list">\r\n		<div class="mutiple_warp">\r\n				<span class="mr15">输入投注倍数</span>\r\n				<input type="number" value="10" min="1" max="9999" id="ticketMultiple"/>\r\n			</div>\r\n		<div class="pay_info clearfix">\r\n			<div class="pay_left fl">\r\n				<div class="mb10"><span id="countUnit">0</span>注 <span class="colorf5e" id="ticketAmount">0元</span></div>\r\n				<div class="bonus">理论最大奖金：<span class="colorf5e" id="maxPrice">0元</span></div>\r\n			</div>\r\n			<div class="pay_btn fr" id="betBtn">\r\n				投注\r\n			</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function matchList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,match=$data.match,odds=$data.odds,team=$data.team,oddsId=$data.oddsId,team1=$data.team1,team2=$data.team2,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var match = list[i] || {};
	var odds = match.odds;
	var team = match.team;
	var oddsId = match.oddsId;
	var team1 = team.split('—')[0];
	var team2 = team.split('—')[1];

$out+='\r\n	<li class="team_item" oddsId = ';
$out+=$escape(oddsId);
$out+=' team1 = ';
$out+=$escape(team1);
$out+=' team2 = ';
$out+=$escape(team2);
$out+='>\r\n		<span class="team_name">';
$out+=$escape(team);
$out+='</span>\r\n		<span class="odds">';
$out+=$escape(odds);
$out+='</span>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function filterList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,filter=$data.filter,$escape=$helpers.$escape,$out=''; for (var i=0, length = list.length; i < length; i++) {
	var filter = list[i];

$out+='\r\n	<li class="filter_item mb10" filterName=';
$out+=$escape(filter);
$out+='>\r\n		<span>';
$out+=$escape(filter);
$out+='</span>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});