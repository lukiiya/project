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
})();exports.content=content;exports.mask=mask;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,planNo=$data.planNo,plan=$data.plan,content=$data.content,upCount=$data.upCount,downCount=$data.downCount,shareCount=$data.shareCount,isSale=$data.isSale,maxPrizeRate=$data.maxPrizeRate,resourceList=$data.resourceList,betContentList=$data.betContentList,user=$data.user,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,userTag=$data.userTag,userRemark=$data.userRemark,matchType=$data.matchType,lotteryIssue=$data.lotteryIssue,drawTime=$data.drawTime,d=$data.d,drawNumber=$data.drawNumber,issue=$data.issue,$escape=$helpers.$escape,i=$data.i,list=$data.list,betContent=$data.betContent,betContentResult=$data.betContentResult,selectNum=$data.selectNum,name=$data.name,j=$data.j,singleNum=$data.singleNum,singleNumKey=$data.singleNumKey,Object=$data.Object,activeNum=$data.activeNum,length=$data.length,$out='';
	var planNo = plan.planNo || "";
	var content = plan.content || "";
	var upCount = plan.upCount || 0;
	var downCount = plan.downCount || 0;
	var shareCount = plan.shareCount || 0;
	var isSale = !!plan.isSale;
	var maxPrizeRate = plan.maxPrizeRate || 0;
	var resourceList = plan.resourceList || [];
	var betContentList = plan.betContentList || [];
	var user = plan.user || {};
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var userTag = user.tag || "";
	var userRemark = user.remark || "";
	var matchType = plan.matchType;
	var lotteryIssue = plan.lotteryIssue || {};
	var drawTime = lotteryIssue.drawTime && lotteryIssue.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var drawNumber = lotteryIssue.drawNumber || "";
	drawNumber = drawNumber.split('|')[0];
	var issue = lotteryIssue.issue;

$out+='\r\n	<div class="matchInfo_box">\r\n		<div class="expertInfo_top color9" id="userMore" userNo="';
$out+=$escape(userNo);
$out+='">\r\n			<div class="clearfix">\r\n				<img class="icon_span img33 fl" src="';
$out+=$escape(userImg);
$out+='"/>\r\n				<div class="expertInfo">\r\n					<p class="color3 clearfix"><span class="fl">晒米人：';
$out+=$escape(userName);
$out+='</span><span class="fr share" id="focus" style="display: none;">+ 关注</span></p>\r\n					<p class="size10 color9 ellipsis">';
$out+=$escape(userRemark);
$out+='</p>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		';
 
			for (var i = 0; i < betContentList.length; i++) { 
				var list = betContentList[i] || {};
				var betContent = list.betContent || "";
				var betContentResult = list.betContentResult || {};
				var selectNum = betContentResult.value || [];
				var name = betContentResult.name || '';
		
$out+='\r\n			<div class="matchInfo_wrap clearfix">\n				<img class="img40 fl" src="';
$out+=$escape(IMG_PATH);
$out+='icon_fc3d.png">\r\n				<div class="ml50">\n					<div class="clearfix digital_issue">\r\n						<span class="fl size13 color6">\r\n							';
$out+=$escape(issue);
$out+='期\r\n						</span>\r\n						<span class="fr color9 size12">\r\n							开奖：';
$out+=$escape(drawNumber?drawNumber:drawTime);
$out+='\r\n						</span>\r\n					</div>\r\n					<div class="size14">\r\n						';
$out+=$escape(name);
$out+='：\r\n						';
 
							for (var j = 0; j < selectNum.length; j++) { 
								var singleNum = selectNum[j];
								var singleNumKey = Object.keys(singleNum)[0];
								var activeNum = singleNum[singleNumKey];
						
$out+='\r\n						<span class="recommend_num ';
$out+=$escape(activeNum ? 'color_red' : '');
$out+='">';
$out+=$escape(singleNumKey);
$out+='</span>\r\n						';
 } 
$out+='\r\n					</div>\n				</div>\r\n			</div>\r\n		';
 } 
$out+='\r\n		<style type="text/css">\r\n			.plan {\r\n				-moz-user-select:none;/*火狐*/\r\n				-webkit-user-select:none;/*webkit浏览器*/\r\n				-ms-user-select:none;/*IE10*/\r\n				-khtml-user-select:none;/*早期浏览器*/\r\n				user-select:none;\r\n			}\r\n		</style>\r\n		<div class="plan" id="planDetail">\r\n			';
 for (var i = 0, length = resourceList.length; i < length; i++) { 
$out+='\r\n			<img class="planpic img-responsive" src="';
$out+=$escape(resourceList[i]);
$out+='" onerror="this.style.display=\'none\'">\r\n			';
 } 
$out+='\r\n			<p class="planDesc"><pre style="white-space:pre-wrap;line-height:25px;">';
$out+=$escape(content);
$out+='</pre></p>\r\n			<div class="oprate">\r\n				<span class="icon_span icon_zan" id="upCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="upCountNum">';
$out+=$escape(upCount);
$out+='</span>\r\n				<span class="icon_span icon_cai" id="downCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="downCountNum">';
$out+=$escape(downCount);
$out+='</span>\r\n				<span class="icon_span icon_share" id="shareCount" planNo="';
$out+=$escape(planNo);
$out+='"></span><span class="num" id="shareCountNum">';
$out+=$escape(shareCount);
$out+='</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 if(isSale) { 
$out+='\r\n	<div class="expertInfo_bottom">\r\n		<div class="ui-flex bet">\r\n			<div class="ui-flex_item textR" id="addTicket">\r\n				<a class="digital_btn">一键跟单</a>\r\n			</div>\r\n		</div>\r\n	</div>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function mask($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="mask" id="ticketOrderMask">\r\n		<div class="pop5"></div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});