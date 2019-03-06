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
})();exports.content=content;exports.hongBao=hongBao;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,className=$data.className,showHeader=$data.showHeader,isScrollHeader=$data.isScrollHeader,isSimpleHeader=$data.isSimpleHeader,title=$data.title,isUserVerifyHeader=$data.isUserVerifyHeader,isWithdrawHeader=$data.isWithdrawHeader,isMatchHeader=$data.isMatchHeader,rightButtonText=$data.rightButtonText,isFocusHeader=$data.isFocusHeader,isUserRankHeader=$data.isUserRankHeader,isHotMatchHeader=$data.isHotMatchHeader,isRechargeHeader=$data.isRechargeHeader,isTurnplateHeader=$data.isTurnplateHeader,isSupplierHeader=$data.isSupplierHeader,isOrderTicketListHeader=$data.isOrderTicketListHeader,isLeftIconHeader=$data.isLeftIconHeader,isFinanceHeader=$data.isFinanceHeader,isSsqHbHeader=$data.isSsqHbHeader,isApp=$data.isApp,IMG_PATH=$data.IMG_PATH,isDigitalHeader=$data.isDigitalHeader,isRecommendHeader=$data.isRecommendHeader,isFootballHeader=$data.isFootballHeader,showFooter=$data.showFooter,isWeixinBrowser=$data.isWeixinBrowser,$out='';$out+='<div class="container ';
$out+=$escape(className);
$out+='" id="pageContainer">\r\n    <div class="header ';
$out+=$escape(showHeader?'':'hide');
$out+='" id="pageHeader" style="';
$out+=$escape(isScrollHeader?'z-index:12;height:0;display:none':'');
$out+='">\r\n    	';
 if (isSimpleHeader) { 
$out+='\r\n    	<div class="header_bar">\r\n			';
$out+=$escape(title);
$out+='\r\n		</div>\r\n		';
 } else if (isUserVerifyHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header"></span>\r\n            <div class="header_tab clearfix" id="userVerifyTab">\r\n                <span class="" type="1">申请专家</span>\r\n                <span class="" type="2">申请店长</span>\r\n            </div>\r\n        </div>\r\n        ';
 } else if (isWithdrawHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="withdrawTab" style="display: none;">\r\n				<span class="" financeType="0">米粒</span>\r\n				<span class="" financeType="1">彩金</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">提款记录</span>\r\n		</div>\r\n		';
 } else if (isMatchHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="matchTab">\r\n				<span class="" type="1">足 球</span>\r\n				<span class="" type="2">篮 球</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isFocusHeader) { 
$out+='\r\n	    <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="focusTab">\r\n				<span class="" type="1">我的关注</span>\r\n				<span class="" type="2">全部专家</span>\r\n			</div>\r\n		</div>\r\n		';
 } else if (isUserRankHeader) { 
$out+='\r\n	    <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="userRankTab">\r\n				<span class="" type="1">红人榜</span>\r\n				<span class="" type="2">胜率榜</span>\r\n				<span class="" type="3">盈利榜</span>\r\n			</div>\r\n		</div>\r\n		';
 } else if (isHotMatchHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<div class="header_tab clearfix" id="matchTab">\r\n				<span class="" type="1">足 球</span>\r\n				<span class="" type="2">篮 球</span>\r\n			</div>\r\n			<span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isRechargeHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar">\r\n			<span class="arrow leftIcon_header"></span>\r\n			<div class="header_tab clearfix" id="rechargeTab" style="display: none;">\r\n				<span class="" financeType="0">米粒</span>\r\n				<span class="" financeType="1">彩金</span>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isTurnplateHeader) { 
$out+='\r\n        <div class="com_fixedbar header_bar" style="background-color: #e8552d;">\r\n			<span class="arrow leftIcon_header" id="goBack"></span>\r\n			';
$out+=$escape(title);
$out+='\r\n		</div>\r\n		';
 } else if (isSupplierHeader) { 
$out+='\r\n		<div class="com_fixedbar header_bar">\r\n			';
$out+=$escape(title);
$out+='\r\n			 <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n		</div>\r\n		';
 } else if (isOrderTicketListHeader) { 
$out+='\r\n			 <div class="com_fixedbar header_bar">\r\n			 	<span class="arrow leftIcon_header" id="goBack"></span>\r\n				';
$out+=$escape(title);
$out+='\r\n			</div>\r\n		';
 } else if (isLeftIconHeader) { 
$out+='\r\n			<div class="com_fixedbar header_bar">\r\n				<span class="arrow leftIcon_header"></span>\r\n				';
$out+=$escape(title);
$out+='\r\n			</div>\r\n		';
 } else if (isFinanceHeader) { 
$out+='	\r\n			<div class="com_fixedbar header_bar">\r\n				<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="financeTab">\r\n					<span class="" financeType="1">彩金</span>\r\n					<span class="" financeType="0">米粒</span>\r\n				</div>\r\n			</div>\r\n		';
 } else if (isSsqHbHeader) { 
$out+='	\r\n			<div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header" style=""></span>\r\n                <span class="rightIcon_top color14"></span>\r\n                ';
$out+=$escape(title);
$out+='\r\n                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n        	</div>\r\n        	';
 if (!isApp) { 
$out+='\r\n	        	<div class="ssqhb_banner" id="ssqhbDownload">\r\n					<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_banner.jpg"/>\r\n					<a class="del_btn" id="closeSsqHbBanner"><span class="del"></span></a>\r\n				</div>\r\n			';
 } 
$out+='\r\n		';
 } else if (isDigitalHeader) { 
$out+='\r\n			<div class="header_bar" style="text-align: left;">\r\n				<span class="arrow leftIcon_header"></span>\r\n				<div class="title_wrap" id="digitalTitleWrap">\r\n					<span class="title_type">玩<br />法</span>\r\n					<span class="title_txt" id="digitalTitleTxt"></span>\r\n					<i class="triangle_down"></i>\r\n				</div>\r\n			</div>\r\n			<span class="rightIcon_top color14 mr5" id="assistantBtn">\r\n				<i class="icon_assistant"></i>\r\n				助手\r\n			</span>\r\n			<div class="assistant_menu" id="assistantMenu" style="display: none;">\r\n				<dl id="assistantMenuContent">\r\n					<dd id="recentlyDraw">历史开奖</dd>\r\n					<dd id="digitalRule">玩法说明</dd>\r\n				</dl>\r\n			</div>\r\n		';
 } else if (isRecommendHeader) { 
$out+='\r\n	        <div class="com_fixedbar header_bar">\r\n	        	<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="recommendTab">\r\n					<span class="" tab="1">推荐</span>\r\n					<span class="" tab="2">复盘</span>\r\n				</div>\r\n				';
 if (rightButtonText) { 
$out+='\r\n	                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n	            ';
 } else { 
$out+='\r\n	                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n	            ';
 } 
$out+='\r\n			</div>\r\n		';
 } else if (isFootballHeader) { 
$out+='\r\n	        <div class="com_fixedbar header_bar">\r\n	        	<span class="arrow leftIcon_header"></span>\r\n				<div class="header_tab clearfix" id="footballTab">\r\n					<span class="" tab="1">混合过关</span>\r\n					<span class="" tab="2">胜平负单关</span>\r\n				</div>\r\n				';
 if (rightButtonText) { 
$out+='\r\n	                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n	            ';
 } else { 
$out+='\r\n	                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n	            ';
 } 
$out+='\r\n			</div>\r\n        ';
 } else { 
$out+='\r\n        	<div class="com_fixedbar header_bar">\r\n            <span class="arrow leftIcon_header" style="';
$out+=$escape(showFooter? 'display: none':'');
$out+='"></span>\r\n            ';
$out+=$escape(title);
$out+='\r\n            ';
 if (rightButtonText) { 
$out+='\r\n                <span class="rightIcon_top color14">';
$out+=$escape(rightButtonText);
$out+='</span>\r\n            ';
 } else { 
$out+='\r\n                <span class="icon_span img18 icon_home rightIcon_top"></span>\r\n            ';
 } 
$out+='\r\n        	</div>\r\n        ';
 } 
$out+='\r\n    </div>\r\n    <div class="content" id="pageContent" style="';
$out+=$escape(showFooter?'bottom: 48px;':'');
$out+=$escape(showHeader?'top: 48px;':'');
$out+='"></div>\r\n    <div class="footer ';
$out+=$escape(showFooter?'':'hide');
$out+='" id="pageFooter">\r\n		<ul class="footer_bar ui-flex">\r\n			<li class="ui-flex_item">\r\n				<a class="active" href="#home">\r\n					<i class="icon_foot icon01"></i>\r\n				</a>\r\n			</li>\r\n			<li class="ui-flex_item">\r\n				<a href="#hotMatch">\r\n					<i class="icon_foot icon02"></i>\r\n				</a>\r\n			</li>\r\n			<!--<li class="ui-flex_item">\r\n				<a href="#ticketFollow">\r\n					<i class="icon_foot icon06"></i>\r\n				</a>\r\n			</li>-->\r\n			';
 if (isWeixinBrowser) { 
$out+='\r\n				<li class="ui-flex_item">\r\n					<a href="#focusList">\r\n						<i class="icon_foot icon05"></i>\r\n					</a>\r\n				</li>\r\n			';
 } else { 
$out+='\r\n				<!-- <li class="ui-flex_item">\r\n					<a href="#lotteryHall">\r\n						<i class="icon_foot icon08"></i>\r\n					</a>\r\n				</li> -->\r\n			';
 } 
$out+='\r\n			<!--<li class="fl">\r\n				<a href="#userList">\r\n					<i class="icon_foot icon03"></i>\r\n				</a>\r\n			</li>-->\r\n			<li class="ui-flex_item">\r\n				<a href="#my">\r\n					<i class="icon_foot icon04"></i>\r\n				</a>\r\n			</li>\r\n			<!-- <li class="ui-flex_item">\r\n				<a href="#download">\r\n					<i class="icon07"></i>\r\n				</a>\r\n			</li> -->\r\n		</ul>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function hongBao($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="red_packet">\r\n    <a class="close_btn"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='close.png"/></a>           \r\n    <a class="open"><img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='open.png" alt="打开" /></a>\r\n    <a class="bonus_a">100万元红包，先到先得></a>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});