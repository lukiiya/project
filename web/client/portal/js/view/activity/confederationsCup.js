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
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="activity_FCC_logo">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_logo.png" alt="" />\r\n	</div>\r\n	<p class="activity_describe mt20">晒米场与乐视体育、腾讯企鹅直播相约2017俄罗斯联合会杯，收看直播节目并且参加联合会杯冠军竞猜活动，将有机会免费获得1888元奖金！请选择出你心目中的冠军球队.</p>\r\n	<ul class="team_list clearfix" id="teamList">\r\n		<li class="team_item" teamId="1" id="team1">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Russia.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">俄罗斯</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="2" id="team2">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Nz.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">新西兰</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="3" id="team3">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Portugal.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">葡萄牙</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="4" id="team4">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Mexico.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">墨西哥</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="5" id="team5">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Cameroon.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">喀麦隆</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="6" id="team6">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Chile.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">智利</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="7" id="team7">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Australia.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">澳大利亚</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n		<li class="team_item" teamId="8" id="team8">\r\n			<div class="item_wrap">\r\n				<img class="team_logo" src="';
$out+=$escape(IMG_PATH);
$out+='FCC_Germany.png"/>\r\n				<div class="name_wrap">\r\n					<span class="team_name">德国</span>\r\n					<span class="dark_shadow"></span>\r\n				</div>\r\n				<div class="progress">\r\n					<div class="progress_bar"></div>\r\n				</div>\r\n				<div class="percent">\r\n					0%\r\n				</div>\r\n			</div>\r\n		</li>\r\n	</ul>\r\n	<div class="btn_wrap" id="submitBtn" style="display: none;">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_btn.png"/>\r\n	</div>\r\n	<div class="btn_wrap" id="activeBtn" style="display: none">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_active_btn.png"/>\r\n	</div>\r\n	<div class="guess_result">我的竞猜结果：<span id="guessResult"">无</span></div>\r\n	<div class="rules_wrap">\r\n		<h2 class="activity_title">\r\n			<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_title.png"/>\r\n		</h2>\r\n		<ul class="thumb_list clearfix mt30">\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="newUser">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_newUser.png" />\r\n				</div>\r\n			</li>\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="recharge">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_recharge.png" />\r\n				</div>\r\n			</li>\r\n			<li class="thumb_item fl">\r\n				<div class="thumb_wrap" id="award2x1">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='activity_FCC_award.png" />\r\n				</div>\r\n			</li>\r\n		</ul>\r\n		<h3 class="rules_title">活动规则：</h3>\r\n		<pre>1.活动时间:2017-06-17--2017-07-03,决赛赛前截止.\r\n2.活动期间新注册用户免费送3彩金.\r\n3.若一个用户猜中冠军将获1888元奖金，多个用户猜中结果将平分奖金.\r\n4.竞猜奖金将在联合会杯决赛比赛结束后24小时内派发.\r\n5.本活动最终解释权归晒米场所有!\r\n					</pre>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});