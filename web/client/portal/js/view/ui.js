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
})();exports.mask=mask;exports.loading=loading;exports.notice=notice;exports.alert=alert;exports.attention=attention;exports.confirm=confirm;exports.window=window;exports.share=share;exports.createTicketOrder=createTicketOrder;exports.createDigitalTicketOrder=createDigitalTicketOrder;function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,id=$data.id,zIndex=$data.zIndex,opacity=$data.opacity,filter=$data.filter,$out='';$out+='<div class="mask" id="';
$out+=$escape(id);
$out+='" style="z-index:';
$out+=$escape(zIndex);
$out+=';opacity:';
$out+=$escape(opacity);
$out+=';filter:alpha(opacity=';
$out+=$escape(filter);
$out+=')"></div>';
return new String($out);
}).call(templateUtils,$data).toString()}function loading($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="loadingBox">\r\n	<div class="mask"></div>\r\n	<div class="loading ">\r\n        <div class="loading_overlay"></div>\r\n        <div class="loading_inner">\r\n            <p class="loading_spinner"></p>\r\n            <p class="loading_text">努力加载中...</p>\r\n        </div>\r\n    </div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function notice($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,text=$data.text,$out='';$out+='<div class="pop" id="noticeBox">';
$out+=$escape(text);
$out+='</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function alert($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="alertBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop1">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n			<div class="btn" id="alertBtn">确定</div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function attention($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="attentionBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop3">\r\n			<span>';
$out+=$string(text);
$out+='</span>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,text=$data.text,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2">\r\n		    <span class="alerts" style="padding:20px 10px;line-height:25px;">';
$out+=$string(text);
$out+='</span>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function window($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$string=$helpers.$string,html=$data.html,$out='';$out+='<div id="windowBox">\r\n		<div class="mask"></div>\r\n		<div class="pop4">\r\n			';
$out+=$string(html);
$out+='\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function share($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="shareBox">\r\n		<div class="mask"></div>\r\n		<div class="direct"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function createTicketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,recommendCount=$data.recommendCount,maxBettypeOdds=$data.maxBettypeOdds,isSelfFollow=$data.isSelfFollow,planAmount=$data.planAmount,planType=$data.planType,matchNum=$data.matchNum,planNo=$data.planNo,$out='';$out+='<div id="createTicketOrderBox">\r\n		<div class="mask"></div>\r\n		<div class="pop6">\r\n		  <div class="pop6_top">跟单投注</div>\r\n		  <a class="close_btn" id="closeCreateTicketOrder">X</a>\r\n		  <div class="pop6_con">\r\n		    <div class="popInput mt10">\r\n		    	<span class="icon_decrease_multiple mr5" id="decreaseTicketMultiple"></span>\r\n		      	<div class="ticket_box">\r\n		        	<input type="number" value="10" min="10" max="10000" id="ticketMultiple" recommendCount="';
$out+=$escape(recommendCount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" isSelfFollow="';
$out+=$escape(isSelfFollow);
$out+='" planAmount="';
$out+=$escape(planAmount);
$out+='" planType="';
$out+=$escape(planType);
$out+='" />\r\n		      	</div>\r\n		      	<span class="icon_add_multiple ml5" id="addTicketMultiple"></span>\r\n		      	<span class="ml10 size22">倍</span>\r\n		    </div>\r\n		    ';
 if (matchNum) { 
$out+='\r\n		    	<div class="popText mt10">过关方式：';
$out+=$escape(matchNum>1?matchNum+'串1':'单关');
$out+='</div>\r\n		    ';
 } 
$out+='\r\n		    <div class="popText ellipsis">投注金额：<span id="ticketAmount">0</span> 元</div>\r\n		    <div class="popText ellipsis">理论最大奖金：<span id="maxPrize">0</span> 元</div>\r\n		      ';
 if (matchNum) { 
$out+='\r\n		    	<div class="popText ellipsis">专家提成：中奖奖金的 <span>5%</span></div>\r\n		    ';
 } 
$out+='\r\n		    <div class="read mt15">\r\n		      <label><input type="checkbox" name="tongyi" checked="checked" id="protocol" style="margin-right: 5px;" />已阅读并同意</label>\r\n		      <span><a id="userVerifyProtocol">《用户代购协议》</a></span>\r\n		    </div>\r\n		    <div class="btn pop6Btn" style="background-color: #f63946;" planNo="';
$out+=$escape(planNo);
$out+='" id="createTicketSubmit">\r\n		      确定\r\n		    </div>\r\n		  </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function createDigitalTicketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,recommendCount=$data.recommendCount,maxBettypeOdds=$data.maxBettypeOdds,planAmount=$data.planAmount,planNo=$data.planNo,$out='';$out+='<div id="createTicketOrderBox">\r\n		<div class="mask"></div>\r\n		<div class="pop6">\r\n		  <div class="pop6_top">跟单投注</div>\r\n		  <a class="close_btn" id="closeCreateTicketOrder">X</a>\r\n		  <div class="pop6_con">\r\n		    <div class="popInput mt10">\r\n		    	<span class="icon_decrease_multiple mr5" id="decreaseTicketMultiple"></span>\r\n		      	<div class="ticket_box">\r\n		        	<input type="number" value="10" min="10" max="10000" id="ticketMultiple" recommendCount="';
$out+=$escape(recommendCount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='" planAmount="';
$out+=$escape(planAmount);
$out+='"/>\r\n		      	</div>\r\n		      	<span class="icon_add_multiple ml5" id="addTicketMultiple"></span>\r\n		      	<span class="ml10 size22">倍</span>\r\n		    </div>\r\n		    <div class="popText ellipsis">投注金额：<span id="ticketAmount">0</span> 元</div>\r\n		    <div class="popText ellipsis">专家提成：中奖奖金的 <span>5%</span></div>\r\n		    <div class="read mt15">\r\n		      <label><input type="checkbox" name="tongyi" checked="checked" id="protocol" style="margin-right: 5px;" />已阅读并同意</label>\r\n		      <span><a id="userVerifyProtocol">《用户代购协议》</a></span>\r\n		    </div>\r\n		    <div class="btn pop6Btn" style="background-color: #f63946;" planNo="';
$out+=$escape(planNo);
$out+='" id="createTicketSubmit">\r\n		      确定\r\n		    </div>\r\n		  </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});