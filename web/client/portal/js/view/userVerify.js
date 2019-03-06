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
})();exports.content=content;exports.zhuanjia=zhuanjia;exports.zhanzhang=zhanzhang;exports.confirm=confirm;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function zhuanjia($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="zhuanjia">\r\n	<div class="select_box">\r\n		<input placeholder="姓名" type="text" id="realName" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="手机号码" type="text" id="phone" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" name="test" maxlength="6" id="smsCode" />\r\n		<span class="test_code" id="smsCodeBtn" type="1">获取验证码</span>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="identitySelectBox">\r\n		上传身份证正面照片\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="identitySelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="identityList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="select_box" style="height:176px;">\r\n		<textarea placeholder="输入简介" style="width:100%;height:100%;border:0;" id="remark"></textarea>\r\n	</div>\r\n	<div class="read mt10">\r\n		<label><input type="checkbox" name="tongyi" style="width:20px;" id="protocol">\r\n		已阅读并同意</label>\r\n		<span>\r\n			<a href="#userVerifyProtocol&type=1" style="color:#2d6fad;">《专家协议》</a>\r\n		</span>\r\n		\r\n	</div>\r\n	<div class="btn ellipsis mt10" id="userVerifySubmit" type="1">\r\n		申请\r\n	</div>\r\n	<p class="note mt10">申请专家，写推荐、赚收成！</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function zhanzhang($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="zhanzhang">\r\n	<div class="select_box">\r\n		<input placeholder="姓名" type="text" id="realName" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="手机号码" type="text" id="phone" />\r\n	</div>\r\n	<div class="select_box">\r\n		<input type="number" placeholder="请输入验证码" name="test" maxlength="6" id="smsCode" />\r\n		<span class="test_code" id="smsCodeBtn" type="2">获取验证码</span>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="identitySelectBox">\r\n		上传身份证正面照片\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="identitySelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="identityList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="identitySelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="select_box">\r\n		<input placeholder="彩票店地址" type="text" id="address"></input>\r\n	</div>\r\n	<div class="select_box pr27 clearfix" id="businessSelectBox">\r\n		营业执照上传\r\n		<span class="icon_span icon_round_add"></span>\r\n		<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="businessSelect" type="file" multiple="true">\r\n	</div>\r\n	<div class="select_box clearfix" id="businessSelectedBox" style="display:none">\r\n		<div class="planpicBox">\r\n			<div id="businessList"></div>\r\n			<div class="addFrame fl mt5 ml5">\r\n				<span class="editPic icon_add active"></span>\r\n				<span class="editPic icon_delete"></span>\r\n				<input style="width:100%;height:100%;position:absolute;z-index:1;top:0;left:-0;opacity:0;display:none" id="businessSelected" type="file" multiple="true">\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class="read mt10">\r\n		<label><input type="checkbox" name="tongyi" style="width:20px;" id="protocol">\r\n		已阅读并同意</label>\r\n		<span>\r\n			<a href="#userVerifyProtocol&type=2" style="color:#2d6fad;">《店长协议》</a>\r\n		</span>\r\n		\r\n	</div>\r\n	<div class="btn ellipsis mt10" id="userVerifySubmit" type="2">\r\n		申请\r\n	</div>\r\n	<p class="note mt10">申请店长，写推荐、分享推荐都能赚钱</p>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function confirm($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div id="confirmBox">\r\n		<div class="mask"></div>\r\n		<div class="pop pop2" style="width: 80%;">\r\n		    <div class="confirmation">\r\n		    	<input type="text" name="validate" placeholder="输入图中的验证码" class="validate_input" id="validate">\r\n		    	<img class="validate_img" src="" id="validateImage" />\r\n		    </div>\r\n		    <div class="ui-flex bordertop">\r\n		        <span class="ui-flex_item textBar borderright" id="cancelBtn">取消</span>\r\n		        <span class="ui-flex_item textBar active" id="sureBtn">确定</span>\r\n		    </div>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});