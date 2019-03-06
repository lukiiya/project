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
})();exports.content=content;exports.userList=userList;exports.modifyUser=modifyUser;exports.modifyUserRight=modifyUserRight;exports.chargeUser=chargeUser;exports.setChannel=setChannel;function content($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$out='';$out+='<h1 class="title">用户列表</h1>\r\n<div class="list_box">\r\n	<form onsubmit="return false;">\r\n		<div class="search_box">\r\n			<span class="select_box">\r\n				<select id="forbid">\r\n					<option value="">访问(全部)</option>\r\n					<option value="0">允许</option>\r\n					<option value="1">封号</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="userRight">\r\n					<option value="">权限(全部)</option>\r\n					<option value="1">竞技彩专家</option>\r\n					<option value="2">推手</option>\r\n					<option value="3">站长</option>\r\n					<option value="4">数字彩专家</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="subscribe">\r\n					<option value="">公众号(全部)</option>\r\n					<option value="0">未关注</option>\r\n					<option value="1">已关注</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="source">\r\n					<option value="">来源(全部)</option>\r\n					<option value="0">h5</option>\r\n					<option value="1">android</option>\r\n					<option value="2">ios</option>\r\n				</select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n			<span class="select_box ml20">\r\n				<select id="channel"></select>\r\n				<span class="icon_sel"><span class="arrow_down"></span></span>\r\n			</span>\r\n		</div>\r\n		<div class="search_box mt20">\r\n			<input class="input_field" placeholder="用户" id="userName"/>\r\n			<input class="input_field ml20" placeholder="电话" id="phone"/>\r\n			<input class="btn ml20" type="reset" value="重置" />\r\n			<input class="btn ml20" type="submit" value="搜索" id="searchSubmit"/>\r\n		</div>\r\n	</form>\r\n	<div class="table_box mt20">\r\n		<table>\r\n			<thead>\r\n				<tr>\r\n					<th width="50">来源</th>\r\n					<th width="50">公众号</th>\r\n					<th width="80">昵称</th>\r\n					<th width="70">姓名</th>\r\n					<th width="40">类型</th>\r\n					<th width="40">简介</th>\r\n					<th width="90">电话</th>\r\n					<th width="60">微信头像</th>\r\n					<th width="60">个人头像</th>\r\n					<th width="60">身份证</th>\r\n					<th width="60">营业执照</th>\r\n					<th width="40">性别</th>\r\n					<th width="100">地区</th>\r\n					<th width="130">注册时间</th>\r\n					<th width="240">操作</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody id="userList"></tbody>							\r\n		</table>\r\n		<div id="pageCodeBox"></div>\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userList($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,user=$data.user,userId=$data.userId,nickName=$data.nickName,realName=$data.realName,userName=$data.userName,country=$data.country,province=$data.province,city=$data.city,area=$data.area,forbid=$data.forbid,createTime=$data.createTime,$escape=$helpers.$escape,sourceMap=$data.sourceMap,source=$data.source,subscribe=$data.subscribe,userRightMap=$data.userRightMap,userRight=$data.userRight,remark=$data.remark,phone=$data.phone,profileImg=$data.profileImg,personalImg=$data.personalImg,identityImg=$data.identityImg,businessImg=$data.businessImg,sexMap=$data.sexMap,sex=$data.sex,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var user = list[i] || {};
	var userId = user.userId;
	var nickName = user.nickName || '';
	var realName = user.realName || '';
	var userName = nickName;
	if (realName) {
		userName += '(' + realName +  ')';	
	}
	userName = userName.replace(/['"\n<>]/g, '');
	var userRight = user.userRight;
	var userRightMap = {'1': '竞技彩专家', '2': '推手', '3': '站长', '4': '数字彩专家'};
	var subscribe = user.subscribe;
	var source = user.source;
	var sourceMap = {'0': 'h5','1': 'android','2': 'ios'};
	var tag = user.tag;
	var remark = user.remark;
	var phone = user.phone;
	var address = user.address;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var identityImg = user.identityImg;
	var businessImg = user.businessImg;
	var sex = user.sex;
	var sexMap = {'0': '未知', '1': '男性', '2': '女性'};
	var country = user.country;
	var province = user.province;
	var city = user.city;
	var area = country + province + city;
	var forbid = user.forbid;
	var createTime = user.createTime;

$out+='\r\n	<tr>\r\n		<td>';
$out+=$escape(sourceMap[source]);
$out+='</td>\r\n		<td>';
$out+=$escape(subscribe==1?'已关注':'未关注');
$out+='</td>\r\n		<td title="';
$out+=$escape(nickName);
$out+='">';
$out+=$escape(nickName);
$out+='</td>\r\n		<td title="';
$out+=$escape(realName);
$out+='">';
$out+=$escape(realName);
$out+='</td>\r\n		<td>';
$out+=$escape(userRightMap[userRight]);
$out+='</td>\r\n		<td>\r\n			';
 if (remark) { 
$out+='\r\n			<a class="examine" remark="';
$out+=$escape(remark);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td title="';
$out+=$escape(phone);
$out+='">';
$out+=$escape(phone);
$out+='</td>\r\n		<td>\r\n			';
 if (profileImg) { 
$out+='\r\n			<a class="examine" profileImg="';
$out+=$escape(profileImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (personalImg) { 
$out+='\r\n			<a class="examine" personalImg="';
$out+=$escape(personalImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (identityImg) { 
$out+='\r\n			<a class="examine" identityImg="';
$out+=$escape(identityImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>\r\n			';
 if (businessImg) { 
$out+='\r\n			<a class="examine" businessImg="';
$out+=$escape(businessImg);
$out+='">查看</a>\r\n			';
 } 
$out+='	\r\n		</td>\r\n		<td>';
$out+=$escape(sexMap[sex]);
$out+='</td>\r\n		<td title="';
$out+=$escape(area);
$out+='">';
$out+=$escape(area);
$out+='</td>\r\n		<td>';
$out+=$escape(createTime);
$out+='</td>\r\n		<td>\r\n			<a class="examine loginUser" userId="';
$out+=$escape(userId);
$out+='">登录</a>\r\n			<a class="examine modifyUser" userId="';
$out+=$escape(userId);
$out+='">修改</a>\r\n			<a class="examine chargeUser" userId="';
$out+=$escape(userId);
$out+='" userName="';
$out+=$escape(userName);
$out+='">充值</a>\r\n			<a class="examine modifyUserRight" userId="';
$out+=$escape(userId);
$out+='">权限</a>\r\n			<a class="examine userArticle" userId="';
$out+=$escape(userId);
$out+='">文章</a>\r\n			<a class="examine setChannel" userId="';
$out+=$escape(userId);
$out+='" userName="';
$out+=$escape(userName);
$out+='">代理商</a>\r\n			<a class="examine forbidUser" userId="';
$out+=$escape(userId);
$out+='" userName="';
$out+=$escape(userName);
$out+='" forbid="';
$out+=$escape(forbid);
$out+='">';
$out+=$escape(forbid==1?'解封':'封号');
$out+='</a>\r\n		</td>\r\n	</tr>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function modifyUser($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,userId=$data.userId,$out='';$out+='<h1>修改用户信息</h1>\r\n	<input type="hidden" id="modifyUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">姓名：<input class="input_field" placeholder="请输入姓名" id="modifyRealName"/></div>\r\n	<div class="mt20">标签：<input class="input_field" placeholder="请输入标签" id="modifyTag"/></div>\r\n	<div class="mt20">电话：<input class="input_field" placeholder="请输入电话" id="modifyPhone"/></div>\r\n	<div class="mt20">地址：<input class="input_field" placeholder="请输入地址" id="modifyAddress"/></div>\r\n	<div class="mt20">头像：<input class="input_field" placeholder="请输入头像url地址" id="modifyPersonalImg"/></div>\r\n	<div class="mt20">简介：<textarea class="input_field" rows="3" placeholder="请输入简介" id="modifyRemark"></textarea></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelModifyUser"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyUser"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function modifyUserRight($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,userId=$data.userId,$out='';$out+='<h1>修改用户权限</h1>\r\n	<input type="hidden" id="modifyUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20" id="modifyUserRightBox">\r\n		<input type="hidden" id="modifyUserRight"/>\r\n		<label><input type="checkbox" index="1"/>竞技彩推荐</label><label class="ml10"><input type="checkbox" index="2"/>推广</label><label class="ml10"><input type="checkbox" index="3"/>数字彩推荐</label>\r\n	</div>\r\n	<div class="mt20" align="center">\r\n		<input class="btn ml20" type="reset" value="取消" id="cancelModifyUserRight"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureModifyUserRight"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function chargeUser($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,userId=$data.userId,$out='';$out+='<h1><span id="chargeUserName">';
$out+=$escape(userName);
$out+='</span> 充值</h1>\r\n	<input type="hidden" id="chargeUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<div class="mt20">\r\n		账户类型：\r\n		<span class="select_box" style="width:165px">\r\n			<select id="chargeFinanceType" style="width:165px">\r\n				<option value="">全部</option>\r\n				<option value="0">方案账户(米粒)</option>\r\n				<option value="1">出票账户(彩金)</option>\r\n			</select>\r\n			<span class="icon_sel"><span class="arrow_down"></span></span>\r\n		</span>\r\n	</div>\r\n	<div class="mt20">金额：<input class="input_field" placeholder="请输入金额" id="chargeAmount"/></div>\r\n	<div class="mt20">描述：<input class="input_field" placeholder="请输入描述" id="chargeRemark"/></div>\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelChargeUser"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureChargeUser"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function setChannel($data){return (function anonymous($data,$id
/*``*/) {
var $helpers=this,$escape=$helpers.$escape,userName=$data.userName,channel=$data.channel,discard=$data.discard,userId=$data.userId,$out='';$out+='<h1>';
$out+=$escape(userName);
$out+=' <b style="color:#ff0000">';
$out+=$escape(channel>0&&discard===0?'取消':'设置');
$out+='代理商</b>？</h1>\r\n	<input type="hidden" id="setChannel" value="';
$out+=$escape(channel);
$out+='"/>\r\n	<input type="hidden" id="setUserId" value="';
$out+=$escape(userId);
$out+='"/>\r\n	<input type="hidden" id="setDiscard" value="';
$out+=$escape(discard);
$out+='"/>\r\n	';
 if (!(channel>0&&discard===0)) { 
$out+='\r\n	<div class="mt20">备注：<textarea class="input_field" rows="3" placeholder="请输入备注" id="setRemark"></textarea></div>\r\n	';
 } 
$out+='\r\n	<div class="mt20" align="center">\r\n 		<input class="btn ml20" type="reset" value="取消" id="cancelSetChannel"/>\r\n		<input class="btn ml20" type="submit" value="确定" id="sureSetChannel"/>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});