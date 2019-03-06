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
})();exports.content=content;exports.presentOrderInfo=presentOrderInfo;exports.receiveList=receiveList;exports.ssqhbMaskBox=ssqhbMaskBox;exports.ssqhbBanner=ssqhbBanner;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<style type="text/css">\r\n		.content {\r\n			background-color: #FFFFFF;\r\n		}\r\n	</style>\r\n	<div class="hb_head pb20" id="presentOrderInfo">\r\n		\r\n	</div>\r\n	<section class="receive_msg mt10">\r\n		<div class="receive_title" id="receiveTitle">\r\n			\r\n		</div>\r\n		<ul class="receive_list" id="receiveList"></ul>\r\n	</section>';
return new String($out);
}).call(templateUtils,$data).toString()}function presentOrderInfo($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,presentRemark=$data.presentRemark,presentOrderInfo=$data.presentOrderInfo,receivedOrderNo=$data.receivedOrderNo,presentNum=$data.presentNum,presentReceived=$data.presentReceived,user=$data.user,nickName=$data.nickName,realName=$data.realName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,presentStatus=$data.presentStatus,$escape=$helpers.$escape,self=$data.self,$out='';
		var	presentRemark = presentOrderInfo.presentRemark;
		var receivedOrderNo = !!presentOrderInfo.receivedOrderNo;
		var presentNum = presentOrderInfo.presentNum;
		var presentReceived = presentOrderInfo.presentReceived;
		var user = presentOrderInfo.user || {};
		var nickName = user.nickName;
		var realName = user.realName;
		var profileImg = user.profileImg;
		var personalImg = user.personalImg;
		var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
		var userName = realName || nickName;
		var presentStatus = presentOrderInfo.presentStatus;
	
$out+='\r\n	<img class="hb_bg img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_bg.png" />\r\n	<img class="sender_header" src="';
$out+=$escape(userImg);
$out+='" />\r\n	<p class="sender_msg"><span class="sender_name">';
$out+=$escape(userName);
$out+='</span> 送给您的双色球红包</p>\r\n	<p class="greeting">';
$out+=$escape(presentRemark);
$out+='</p>\r\n	';
 if (self) { 
$out+='\r\n		';
 if (presentStatus == 1) { 
$out+='\r\n			<div class="hb_btn mt30">\r\n				<a class="ensure_btn" id="shareBtn">点击右上角分享继续赠送给好友</a>\r\n			</div>\r\n		';
 } else { 
$out+='\r\n			<div class="hb_btn mt30" id="continuePresent">\r\n				<a class="ensure_btn">继续给好友送彩票</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } else { 
$out+='\r\n		';
 if (receivedOrderNo)  { 
$out+='\r\n			<div class="hb_btn mt30 ui-flex">\r\n				<a class="check_btn ui-flex_item" id="receivedBtn">我的领取</a>\r\n				<a class="ensure_btn ui-flex_item ml10" id="continuePresent">我也要送</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 1) { 
$out+='\r\n			<div class="hb_btn mt30" id="receiveBtn">\r\n				<a class="ensure_btn">立即领取</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 2) { 
$out+='	\r\n			<div class="hb_btn mt30 ui-flex">\r\n				<a class="ensure_btn active ui-flex_item">已领完</a>\r\n				<a class="ensure_btn ui-flex_item ml10" id="continuePresent">我也要送</a>\r\n			</div>\r\n		';
 } else if (presentStatus == 3) { 
$out+='	\r\n			<div class="hb_btn mt30 active">\r\n				<a class="ensure_btn">已过期</a>\r\n			</div>\r\n		';
 } 
$out+='\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function receiveList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,length=$data.length,list=$data.list,i=$data.i,createTime=$data.createTime,d=$data.d,user=$data.user,nickName=$data.nickName,realName=$data.realName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,$escape=$helpers.$escape,$out='';
	var length = list.length;
	for (var i = 0; i < list.length; i++) { 
	var createTime = list[i].createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var user = list[i].user || {};
	var nickName = user.nickName;
	var realName = user.realName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;

$out+='\r\n	<li class="user_item clearfix">\r\n		<img class="user_logo fl mr10" src="';
$out+=$escape(userImg);
$out+='">\r\n		<div class="fl">\r\n			<div class="nickname">\r\n				';
$out+=$escape(userName);
$out+='\r\n			</div>\r\n			<div class="color9 size12">\r\n				';
$out+=$escape(createTime);
$out+='\r\n			</div>\r\n		</div>\r\n		<div class="fr">\r\n			<span>已领取</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function ssqhbMaskBox($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="mask" id="ssqhbMask">\r\n		<div class="ssqhb_pop">\r\n			<div class="pop_title">\r\n				<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_pop_title.png" alt="" />\r\n				<a class="del_btn" id="closePopBtn"><span class="del"></span></a>\r\n			</div>\r\n			<div class="input_wrap">\r\n				<input type="number" placeholder="请输入手机号" maxlength="11" id="mobile">\r\n			</div>\r\n			<div class="input_wrap clearfix">\r\n				<input class="velidate_code" type="number" placeholder="请输入验证码" maxlength="6" id="smsCode">\r\n				<span class="get_code" id="smsCodeBtn">获取验证码</span>\r\n			</div>\r\n			<a class="pop_ensure_btn" id="loginSubmit">确定</a>\r\n		</div>	\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function ssqhbBanner($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,IMG_PATH=$data.IMG_PATH,$out='';$out+='<div class="ssqhb_banner" id="ssqhbDownload">\r\n		<img class="img-responsive" src="';
$out+=$escape(IMG_PATH);
$out+='ssqhb_banner.png"/>\r\n		<a class="del_btn" id="closeSsqHbBanner"><span class="del"></span></a>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});