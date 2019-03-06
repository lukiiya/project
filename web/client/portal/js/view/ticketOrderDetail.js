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
})();exports.content=content;exports.ticketOrder=ticketOrder;exports.previewImage=previewImage;exports.orderTicketList=orderTicketList;exports.userFollowList=userFollowList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function ticketOrder($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,isSelfTicket=$data.isSelfTicket,ticketOrder=$data.ticketOrder,orderNumeric=$data.orderNumeric,status=$data.status,ticketMultiple=$data.ticketMultiple,ticketPassType=$data.ticketPassType,g=$data.g,x=$data.x,planRealName=$data.planRealName,planNickName=$data.planNickName,planUserName=$data.planUserName,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,maxTicketPrizeAmount=$data.maxTicketPrizeAmount,ticketSendPrizeAmount=$data.ticketSendPrizeAmount,ticketStatus=$data.ticketStatus,imgMap=$data.imgMap,ticketStatusMap=$data.ticketStatusMap,createTime=$data.createTime,d=$data.d,matchList=$data.matchList,length=$data.length,resourceList=$data.resourceList,isTSP=$data.isTSP,ticketPrizeDivideStatus=$data.ticketPrizeDivideStatus,ticketPrizeDivideAmount=$data.ticketPrizeDivideAmount,lotteryId=$data.lotteryId,betContentList=$data.betContentList,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,ticketAttachPrizeAmount=$data.ticketAttachPrizeAmount,ticketFollowGainAmount=$data.ticketFollowGainAmount,tickeTotalAmount=$data.tickeTotalAmount,$=$data.$,lotteryName=$data.lotteryName,guessList=$data.guessList,publish=$data.publish,isSale=$data.isSale,isSelf=$data.isSelf,followNo=$data.followNo,followCount=$data.followCount,maxTicketPrizeRate=$data.maxTicketPrizeRate,betAmount=$data.betAmount,maxBettypeOdds=$data.maxBettypeOdds,user=$data.user,betTag=$data.betTag,userNo=$data.userNo,realName=$data.realName,nickName=$data.nickName,profileImg=$data.profileImg,personalImg=$data.personalImg,userImg=$data.userImg,IMG_PATH=$data.IMG_PATH,userName=$data.userName,betTagMap=$data.betTagMap,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,i=$data.i,ssq=$data.ssq,betContent=$data.betContent,redBall=$data.redBall,blueBall=$data.blueBall,betContentResult=$data.betContentResult,redActive=$data.redActive,blueActive=$data.blueActive,redBallUnit=$data.redBallUnit,blueBallUnit=$data.blueBallUnit,list=$data.list,selectNum=$data.selectNum,name=$data.name,singleNum=$data.singleNum,singleNumKey=$data.singleNumKey,Object=$data.Object,activeNum=$data.activeNum,match=$data.match,oddsId=$data.oddsId,odds=$data.odds,team=$data.team,recommend=$data.recommend,prize=$data.prize,matchId=$data.matchId,bettypeContent=$data.bettypeContent,recommendLength=$data.recommendLength,nullOdds=$data.nullOdds,concede=$data.concede,Hconcede=$data.Hconcede,Aconcede=$data.Aconcede,bettypeOdds=$data.bettypeOdds,bettype=$data.bettype,recommendMap=$data.recommendMap,bettypeResult=$data.bettypeResult,number=$data.number,type=$data.type,$string=$helpers.$string,$out='';
	var isSelfTicket = ticketOrder.isSelfTicket; // 是否自购单
	var orderNumeric = ticketOrder.orderNumeric || "";
	var status = ticketOrder.status;
	var ticketMultiple = ticketOrder.ticketMultiple || 1;
	var ticketPassType = ticketOrder.ticketPassType || '';
	ticketPassType = ticketPassType.replace(/1x1/g, '单关');
	ticketPassType = ticketPassType.replace(/x/g, '串');
	var planRealName = ticketOrder.planRealName || "";
	var planNickName = ticketOrder.planNickName || "";
	var planUserName = planRealName || planNickName;
	var amount = ticketOrder.amount/100 || 0;
	var ticketPrizeAmount = +(ticketOrder.ticketPrizeAmount/100 || 0).toFixed(2);
	var maxTicketPrizeAmount = (ticketOrder.maxTicketPrizeAmount/100 || 0).toFixed(2);
	var ticketSendPrizeAmount = (ticketOrder.ticketSendPrizeAmount/100 || 0).toFixed(2);
	var ticketStatus = ticketOrder.ticketStatus;
	var imgMap = {"0":"zzcp","1":"cpsb","2":"dkj","3":"wzj","4":"yzj","7":"zzcp","8":"dkj","9":"zzcp"};
	var ticketStatusMap = {"0":"正在出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已派奖","6":"已部分派奖","7":"正在出票","8":"部分出票","9":"正在出票"};
	var createTime = ticketOrder.createTime && ticketOrder.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	var matchList = ticketOrder.matchList || [];
	var length = matchList.length;
	var resourceList = ticketOrder.resourceList || [];
	resourceList = resourceList.join('|');
	var isTSP = ticketOrder.isTSP;
	var ticketPrizeDivideStatus = ticketOrder.ticketPrizeDivideStatus; //0=不分成, 1=待分成, 2=已分成, 3=未分成
	var ticketPrizeDivideAmount = (ticketOrder.ticketPrizeDivideAmount/100 || 0).toFixed(2);
	var lotteryId = ticketOrder.lotteryId || '';
	var betContentList = ticketOrder.betContentList || [];
	var issue = ticketOrder.issue || '';
	var drawNumber = ticketOrder.drawNumber || '';
	if (lotteryId == 'FC3D') {
		drawNumber = drawNumber.split('|')[0];
	}
	var drawTime = ticketOrder.drawTime && ticketOrder.drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || ""; //开奖时间
	var ticketAttachPrizeAmount = +(ticketOrder.ticketAttachPrizeAmount/100).toFixed(2) || 0;
	var ticketFollowGainAmount = +(ticketOrder.ticketFollowGainAmount/100).toFixed(2) || 0; //跟单分成
	var tickeTotalAmount = (ticketPrizeAmount + ticketAttachPrizeAmount + ticketFollowGainAmount - ticketPrizeDivideAmount).toFixed(2);
	tickeTotalAmount = (tickeTotalAmount + '').replace(/\.0+$/, '');
	var lotteryName = ticketOrder.lotteryName;
	var guessList = ticketOrder.guessList || [];//猜冠军
	var publish = ticketOrder.publish || 0; // 0=未发布， 1=已发布   （发布至跟单市场）
	var isSale = ticketOrder.isSale;
	var isSelf = ticketOrder.isSelf;
	var followNo = ticketOrder.followNo || '';
	var followCount = ticketOrder.followCount || 0;
	var maxTicketPrizeRate = ticketOrder.maxTicketPrizeRate;
	var betAmount = ticketOrder.betAmount/100;
	var maxBettypeOdds = (maxTicketPrizeAmount/(ticketMultiple*2)).toFixed(2);
	var user = ticketOrder.user || {}; //用户信息
	var betTag = user.betTag;
	var userNo = user.userNo;
	var realName = user.realName;
	var nickName = user.nickName;
	var profileImg = user.profileImg;
	var personalImg = user.personalImg;
	var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
	var userName = realName || nickName;
	var betTagMap = {'千元户' : 'thousand','万元户': 'ten-thousand', '十万元户': 'hundred-thousand'};

$out+='\r\n	<div class="sta_wrap">\r\n		<div class="win_wrap">\r\n			';
 if (ticketStatus == 5) { 
$out+='\r\n				<div class="ypj">\r\n					<span class="ypj_txt">\r\n						<i class="icon_ypj"></i>\r\n						已派奖	\r\n					</span><br />\r\n					<span class="bonus color_red">\r\n						';
$out+=$escape(tickeTotalAmount);
$out+='\r\n						';
 if (ticketAttachPrizeAmount > 0 || ticketFollowGainAmount > 0 || ticketPrizeDivideAmount > 0) { 
$out+='\r\n							<span class="size16">=中奖';
$out+=$escape(ticketPrizeAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n						';
 if (ticketAttachPrizeAmount > 0 && ticketFollowGainAmount > 0) { 
$out+='\r\n							<span class="size16">+加奖';
$out+=$escape(ticketAttachPrizeAmount);
$out+='+跟单收成';
$out+=$escape(ticketFollowGainAmount);
$out+='</span>\r\n						';
 } else if (ticketAttachPrizeAmount > 0) { 
$out+='\r\n							<span class="size16">+加奖';
$out+=$escape(ticketAttachPrizeAmount);
$out+='</span>\r\n						';
 } else if (ticketFollowGainAmount > 0) { 
$out+='\r\n							<span class="size16">+跟单收成';
$out+=$escape(ticketFollowGainAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n						';
 if (ticketPrizeDivideStatus == 2) { 
$out+='\r\n							<span class="size16">-跟单分成';
$out+=$escape(ticketPrizeDivideAmount);
$out+='</span>\r\n						';
 } 
$out+='\r\n					</span>\r\n				</div>\r\n			';
 } else if (ticketStatus == 6) { 
$out+='\r\n				<div class="win_status">\r\n					已部分派奖	\r\n				</div>\r\n				<div class="size12">\r\n					<span class="color_red size12">';
$out+=$escape(ticketSendPrizeAmount);
$out+='</span>元<br /><span class="color9 size12">（剩下的部分会在出票店长确认中奖金额后派出，如果提前派奖金额超出实际中奖，将会扣除超出部分彩金）</span>\r\n				</div>\r\n			';
 } else if ((ticketStatus == 0 || ticketStatus == 2 || ticketStatus == 7) && (lotteryId == 'JCZQ' || lotteryId == 'JCLQ' || lotteryId == 'JZYP')) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='	\r\n				</div>\r\n				<div class="size12 mt5">\r\n					最大奖金：<span class="color_red size12">';
$out+=$escape(maxTicketPrizeAmount);
$out+='</span>元<br /><span class="color9 size12">（最终奖金以出票完成的为准）</span>\r\n				</div>\r\n			';
 } else if (status == 3) { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_ytk"></i>\r\n						已退款\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="win_status">\r\n					<i class="icon_';
$out+=$escape(imgMap[ticketStatus]);
$out+='"></i>\r\n						';
$out+=$escape(ticketStatusMap[ticketStatus]);
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		</div>\r\n	</div>\r\n	<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			';
 if (isSelf == true) { 
$out+='\r\n				<div class="con_tit clearfix">\r\n					<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n				';
 if ((ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) && resourceList) { 
$out+='\r\n					<span class="fr color_g check_ticket" id="showTicketImg" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='" resourceList="';
$out+=$escape(resourceList);
$out+='">查看票样</span>\r\n				';
 } else if (isTSP) { 
$out+='\r\n					<span class="fr color_g check_ticket" id="showTicketDetail" ticketStatus="';
$out+=$escape(ticketStatus);
$out+='">出票详情</span>\r\n				';
 } 
$out+='\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="color6 ui-flex user_msg">\r\n					<div>\r\n						<img class="icon_span img29" src="';
$out+=$escape(userImg);
$out+='">\r\n						<span class="personal">\r\n							<span class="color3">';
$out+=$escape(userName);
$out+='</span>\r\n							<span class="icon ';
$out+=$escape(betTagMap[betTag]);
$out+='"></span>\r\n						</span>\r\n					</div>\r\n					<div class="size10">返奖：<span class="color_red">';
$out+=$escape(maxTicketPrizeRate);
$out+='%</span></div>\r\n				</div>\r\n			';
 } 
$out+='\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					';
 if (!isSelfTicket) { 
$out+='\r\n					<th>专家</th>\r\n					';
 } 
$out+='\r\n					<th>状态</th>\r\n				</tr>\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(ticketMultiple);
$out+='</td>\r\n					';
 if (!isSelfTicket) { 
$out+='\r\n					<td>';
$out+=$escape(planUserName);
$out+='\r\n					</td>\r\n					';
 } 
$out+='\r\n				';
 if (ticketStatus == 8 || status == 4) { 
$out+='\r\n					<td>部分出票</td>\r\n				';
 } else if (ticketStatus == 1 || status == 3) { 
$out+='\r\n					<td>出票失败</td>\r\n				';
 } else if (ticketStatus == 2 || ticketStatus == 3 || ticketStatus == 4 || ticketStatus == 5 || ticketStatus == 6) { 
$out+='\r\n					<td>已出票</td>\r\n				';
 } else if (ticketStatus == 0 || ticketStatus == 7 || ticketStatus == 9) { 
$out+='\r\n					<td>正在出票</td>\r\n				';
 } 
$out+='\r\n				</tr>\r\n			</table>\r\n		</div>\r\n	</div>\r\n	<div class="dty_cont">\r\n		<div class="con_tit clearfix">\r\n			';
 if ((lotteryId　==　'JCLQ' || lotteryId == 'JCZQ' || lotteryId == 'JZYP') && length != 0) { 
$out+='\r\n				<span class="fl">跟单内容：</span>\r\n				<span class="fr">过关方式：\r\n					<span class="color_g">';
$out+=$escape(ticketPassType);
$out+='</span>		\r\n				</span>\r\n			';
 } else { 
$out+='\r\n				<span class="fl">投注内容：</span>\r\n				';
 if (lotteryId　==　'SJBGJ' || lotteryId　==　'SJBGYJ') { 
$out+='\r\n					<span class="fr">过关方式：\r\n						<span class="color_g">单关</span>		\r\n					</span>\r\n				';
 }　
$out+='\r\n			';
 }　
$out+='\r\n		</div>\r\n		';
 if (lotteryId　==　'SSQ' || lotteryId　==　'DLT') { 
$out+='   <!--双色球详情-->\r\n			<div class="ssqInfo_box">\r\n				<p><span class="color_g">';
$out+=$escape(issue);
$out+='</span> 期</p>\r\n				';
 if (drawNumber) { 
$out+='\r\n					<div class="clearfix mt5">\r\n						<p class="fl num_title color9">开奖号码：</p>\r\n						<ul class="ssqlist fl">\r\n							<li>\r\n								<div class="num_wrap">\r\n									<span class="red_ball">\r\n									';
 
										var drawNumberRed;
										if (lotteryId　==　'SSQ') {
											drawNumberRed = drawNumber.split('|')[0].split(",");
										} else if (lotteryId　==　'DLT') {
											drawNumberRed = drawNumber.split('+')[0].split(",");
										}
										for (var j = 0; j < drawNumberRed.length; j++) { 
											var drawNumberRedUnit = drawNumberRed[j];
									
$out+='\r\n										<em class="active">';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n									';
 } 
$out+='\r\n									</span> \r\n									<span class="blue_ball">\r\n									';
 
										var drawNumberBlue;
										if (lotteryId　==　'SSQ') {
											drawNumberBlue = drawNumber.split('|')[1].split(",")
										} else if (lotteryId　==　'DLT') {
											drawNumberBlue = drawNumber.split('+')[1].split(",")
										}
										for (var k = 0; k < drawNumberBlue.length; k++) { 
											var drawNumberBlueUnit = drawNumberBlue[k];
									
$out+='\r\n										<em class="active">';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n									';
 } 
$out+='\r\n									</span>\r\n								</div>\r\n							</li>\r\n						</ul>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="clearfix mt5">\r\n					<p class="fl num_title color9">投注号码：</p>\r\n					<ul class="ssqlist fl">\r\n					';
 
						for (var i = 0; i < betContentList.length; i++) { 
							var ssq = betContentList[i] || {};
							var betContent = ssq.betContent || "";
							var redBall;
							var blueBall;
							if (lotteryId　==　'SSQ') {
								redBall = betContent.split('|')[0].split(",");
							} else if (lotteryId　==　'DLT') {
								redBall = betContent.split('+')[0].split(",")
							}
							if (lotteryId　==　'SSQ') {
								blueBall = betContent.split('|')[1].split(",");
							} else if (lotteryId　==　'DLT') {
								blueBall = betContent.split('+')[1].split(",");
							}
							var betContentResult = ssq.betContentResult || {};
							var redActive = betContentResult["red"] || {};
							var blueActive = betContentResult["blue"] || {}
					
$out+='\r\n						<li>\r\n							<div class="num_wrap">\r\n								<span class="red_ball">\r\n								';
 
									for (var j = 0; j < redBall.length; j++) { 
										var redBallUnit = redBall[j];
								
$out+='\r\n									<em class="';
$out+=$escape(drawNumber ? 'borderC' : '');
$out+=' ';
$out+=$escape(redActive[redBallUnit] ? 'active' : '');
$out+='">';
$out+=$escape(redBallUnit);
$out+='</em>\r\n								';
 } 
$out+='\r\n								</span> \r\n								<span class="blue_ball">\r\n								';
 
									for (var k = 0; k < blueBall.length; k++) { 
										var blueBallUnit = blueBall[k];
								
$out+='\r\n									<em class="';
$out+=$escape(drawNumber ? 'borderC' : '');
$out+=' ';
$out+=$escape(blueActive[blueBallUnit] ? 'active' : '');
$out+='">';
$out+=$escape(blueBallUnit);
$out+='</em>\r\n								';
 } 
$out+='\r\n								</span>\r\n							</div>\r\n						</li>\r\n						';
 } 
$out+='\r\n					</ul>\r\n				</div>\r\n				';
 if (!drawNumber) { 
$out+='\r\n				<p class="mt5"><span class="color9 size13">开奖时间：</span>\r\n					<span class="color6 size13">';
$out+=$escape(drawTime);
$out+='</span>\r\n				</p>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if　(lotteryId　==　'JSK3' || lotteryId　==　'GX11X5' || lotteryId　==　'FC3D') { 
$out+='  <!--江苏快3、11选5-->\r\n			<div class="ssqInfo_box">\r\n				<p><span class="color_g">';
$out+=$escape(issue);
$out+='</span> 期</p>\r\n				';
 if (drawNumber) { 
$out+='\r\n					<div class="mt5">\r\n						<p class="num_title color9">开奖号码：<span class="color_red">';
$out+=$escape(drawNumber);
$out+='</span></p>\r\n					</div>\r\n				';
 } 
$out+='\r\n				<div class="mt5">\r\n					<ul class="">\r\n					';
 
						for (var i = 0; i < betContentList.length; i++) { 
							var list = betContentList[i] || {};
							var betContent = list.betContent || "";
							var betContentResult = list.betContentResult || {};
							var selectNum = betContentResult.value || [];
							var name = betContentResult.name || '';
					
$out+='\r\n						<li class="mb5">\r\n							<div class="num_wrap">\r\n								<span class="num_title color9">';
$out+=$escape(name);
$out+='：</span>\r\n								<span>\r\n									';
 
										for (var j = 0; j < selectNum.length; j++) { 
											var singleNum = selectNum[j];
											var singleNumKey = Object.keys(singleNum)[0];
											var activeNum = singleNum[singleNumKey];
									
$out+='\r\n									<span class="';
$out+=$escape(activeNum ? 'color_red' : '');
$out+='">';
$out+=$escape(singleNumKey);
$out+='</span>\r\n									';
 } 
$out+='\r\n								</span>\r\n							</div>\r\n						</li>\r\n						';
 } 
$out+='\r\n					</ul>\r\n				</div>\r\n				';
 if (!drawNumber) { 
$out+='\r\n				<div><span class="color9">开奖时间：</span>';
$out+=$escape(drawTime);
$out+='</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		';
 } else if　(lotteryId　==　'SJBGJ' || lotteryId　==　'SJBGYJ') { 
$out+=' \r\n			<div class="matchInfo_box">\r\n				<div class="matchInfo_wrap">\r\n					<div class="mb10">';
$out+=$escape(lotteryName);
$out+='</div>\r\n					<div class="ui-flex worldcup_selected color3">\r\n					';
 
						var length = guessList.length;
						for (var i = 0; i < length; i++) { 
							var match = guessList[i] || {};
							var oddsId = match.oddsId || 0;
							var odds = match.odds;
							var team = match.team;
					
$out+='\r\n						';
 if (lotteryId　==　'SJBGJ' && length > 1) { 
$out+='\r\n							<div class="textBar gj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } else if (lotteryId　==　'SJBGYJ') { 
$out+='\r\n							<div class="textBar gyj ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } else { 
$out+='\r\n							<div class="textBar ui-flex_item ellipsis">';
$out+=$escape(team);
$out+=' ';
$out+=$escape(odds);
$out+='</div>\r\n						';
 } 
$out+='\r\n					';
 } 
$out+='\r\n					</div>\r\n				</div>\r\n			</div>\r\n		';
 } else { 
$out+='  <!--篮球足球-->\r\n			';
 if (length == 0) { 
$out+='\r\n				<div class="noMatch_box">\r\n					<div class="no_match ui-flex">\r\n						<img class="no_match_img" src="';
$out+=$escape(IMG_PATH);
$out+='documentary_noMatchImg.png" /> \r\n					</div>\r\n				</div>\r\n			';
 } else { 
$out+='\r\n				<div class="matchInfo_box">\r\n				';
 
					for (var i = 0; i < length; i++) { 
						var match = matchList[i] || {};
						var recommend = match.recommend || [];
						var prize = match.prize || [];
						var matchId = match.matchId || 0;
						var oddsId = match.oddsId || 0;
						var bettypeContent = match.bettypeContent || "";
						var recommendLength = recommend.length;
						if (matchId <= 0 || oddsId <= 0 || !recommend || recommendLength <= 0 || !bettypeContent) {
							continue;
						}
						match.beginTime = match.beginTime && match.beginTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
						var nullOdds = '--';//赔率为空显示值
						var concede = match.concede;
						var Hconcede;
						var Aconcede;
						if (concede > 0) {
							Hconcede = '+' + (concede);
							Aconcede = -concede;
						} else {
							Hconcede = concede;
							Aconcede = '+' + (-concede)
						}
						var bettypeOdds = match.bettypeOdds || {};
						var bettype = match.bettypeValue || {};
						var recommendMap = {};
						for (var j = 0; j < recommendLength; j++) {
							recommendMap[recommend[j]] = true;
						}
						var bettypeResult = match.bettypeResult || {};
						var number = match.number;
						var type = match.type || 1;
					
$out+='\r\n						<div class="matchInfo_wrap">\r\n							<div class="matchInfo clearfix">\r\n								<span class="size14 fl match_name" style="';
$out+=$escape(type == 2 ? 'color: #003cff' : '');
$out+='"><span class="color3 mr5">';
$out+=$escape(number);
$out+='</span>';
$out+=$escape(match.league);
$out+='</span>\r\n								<div class="size12 color9 ml5">';
$out+=$escape(match.beginTime);
$out+='</div>\r\n							</div>\r\n							<div class="ui-flex color3">\r\n								<div class="ui-flex_item ellipsis">';
$out+=$string(type == 2 ? match.away : match.home);
$out+='</div>\r\n								 ';
 if (match.result) { 
$out+='\r\n									';
 if (bettypeContent == "BQC") { 
$out+='\r\n									<span class="score color_red">';
$out+=$escape(match.result);
$out+='(';
$out+=$escape(match.halfResult);
$out+=')</span>\r\n									';
 } else { 
$out+='\r\n									<span class="score color_red">';
$out+=$escape(match.result);
$out+='</span>\r\n									';
 } 
$out+='\r\n								';
 } else { 
$out+='\r\n									vs\r\n								';
 } 
$out+=' \r\n								<div class="ui-flex_item ellipsis textR">';
$out+=$string(type == 2 ? match.home : match.away);
$out+='</div>\r\n							</div>\r\n						';
 if (bettypeContent == "SPF" || bettypeContent == "RQSPF") { 
$out+='\r\n						<div class="ui-flex flex_wrap pl40">\r\n							<div class="concede">';
$out+=$escape(concede > 0 ? '+'+concede : concede);
$out+='</div>\r\n							<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">胜 ';
$out+=$escape(bettypeOdds["S"]);
$out+=$string(bettypeResult["S"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["P"]?'active':'');
$out+='">平 ';
$out+=$escape(bettypeOdds["P"]);
$out+=$string(bettypeResult["P"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n							<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">负 ';
$out+=$escape(bettypeOdds["F"]);
$out+=$string(bettypeResult["F"]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n						</div>\r\n						';
 } else if (bettypeContent == 'SF' && lotteryId == 'JZYP') { 
$out+='\r\n							<div class="ui-flex mt15 positionR yapan">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n							</div>\r\n						';
 } else if (bettypeContent == 'SF') { 
$out+='\r\n							<div class="ui-flex mt15 positionR">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜 ';
$out+=$escape(bettypeOdds['F']);
$out+='</div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜 ';
$out+=$escape(bettypeOdds['S']);
$out+='</div>\r\n							</div>\r\n						';
 } else if (bettypeContent == 'RFSF') { 
$out+='\r\n							<div class="ui-flex mt15 positionR">\r\n								<div class="textBar ui-flex_item ';
$out+=$escape(recommendMap["F"]?'active':'');
$out+='">客胜';
$out+=$escape(Aconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['F']);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 ';
$out+=$escape(recommendMap["S"]?'active':'');
$out+='">主胜';
$out+=$escape(Hconcede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds['S']);
$out+='</span></div>\r\n							</div>\r\n						';
 } else if (bettypeContent == "DXF") { 
$out+='\r\n							<div class="ui-flex mt15 flex_wrap">\r\n								<div class="textBar ui-flex_item positionR ';
$out+=$escape(recommendMap["D"]?'active':'');
$out+='">大于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["D"]);
$out+='</span></div>\r\n								<div class="textBar ui-flex_item ml10 positionR ';
$out+=$escape(recommendMap["X"]?'active':'');
$out+='">小于';
$out+=$escape(concede);
$out+='<span class="ml15 size12">';
$out+=$escape(bettypeOdds["X"]);
$out+='</div>\r\n							</div>\r\n						';
 } else { 
$out+='\r\n							<div class="ui-flex flex_wrap">\r\n								';
 for (var j = 0; j < recommendLength; j++) { 
$out+='\r\n								<div class="textBar ui-flex_item positionR ';
$out+=$escape(j>0?'ml10':'');
$out+=' active">';
$out+=$escape(bettype[recommend[j]]||'');
$out+=' ';
$out+=$escape(bettypeOdds[recommend[j]]||nullOdds);
$out+=$string(bettypeResult[recommend[j]]?'<span class="result icon_result"></span>':"");
$out+='</div>\r\n								';
 } 
$out+='\r\n								';
 
								if (prize.length <= 0) {
									for (var name in bettypeResult) {
										if (!bettypeResult[name]) {
											continue;
										}
								
$out+='\r\n									<div class="textBar ui-flex_item positionR ml10">';
$out+=$escape(bettype[name]||'');
$out+=' ';
$out+=$escape(bettypeOdds[name]||nullOdds);
$out+='<span class="result icon_result"></span></div>	\r\n								';

									}
								}
								
$out+='\r\n							</div>\r\n						';
 } 
$out+='\r\n						</div>\r\n					';
 } 
$out+='\r\n				</div>\r\n			';
 } 
$out+='\r\n		';
 } 
$out+='\r\n	</div>\r\n	';
 if (publish == 0 && isSelfTicket == true && isSale == true) { 
$out+='\r\n		<div class="bottom">\r\n			<div class="doc_detail ui-flex">\r\n				<div class="continue_btn" id="continueBtn">\r\n					继续投注本方案\r\n				</div>\r\n				<div class="share_btn" id="shareMarketBtn">\r\n					分享方案，赚提成\r\n				</div>\r\n			</div>\r\n		</div>\r\n	';
 } 
$out+='\r\n	';
 if (publish == 1 && followNo != '') { 
$out+='\r\n		<div class="bottom">\r\n			<div class="doc_detail ui-flex">\r\n				<div class="doc_num" id="followCountBtn">跟单用户(';
$out+=$escape(followCount);
$out+=')</div>\r\n				';
 if (isSale == true) { 
$out+='\r\n					<div class="doc_btn" id="followBtn" betAmount="';
$out+=$escape(betAmount);
$out+='" maxBettypeOdds="';
$out+=$escape(maxBettypeOdds);
$out+='">\r\n						立即跟单\r\n					</div>\r\n				';
 } else { 
$out+='\r\n					<div class="abort_btn">\r\n						已截止跟单\r\n					</div>\r\n				';
 } 
$out+='\r\n			</div>\r\n		</div>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function previewImage($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,length=$data.length,$string=$helpers.$string,html=$data.html,$out='';$out+='<div class="mask" id="showImg" style="background-color: #000000;overflow: auto;">\r\n	<div class="';
$out+=$escape(length==1?'vtc':'');
$out+='">\r\n		';
$out+=$string(html);
$out+='\r\n	</div>\r\n</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function orderTicketList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,orderNumeric=$data.orderNumeric,i=$data.i,length=$data.length,list=$data.list,ticketItem=$data.ticketItem,amount=$data.amount,prizeAmount=$data.prizeAmount,multiple=$data.multiple,printNo=$data.printNo,status=$data.status,statusMap=$data.statusMap,$out='';$out+='<div class="msg_wrap mb10">\r\n		<div class="documentary_msg pb10">\r\n			<div class="con_tit clearfix">\r\n				<span class="fl color6">方案编号：<span class="color3">';
$out+=$escape(orderNumeric);
$out+='</span></span>\r\n			</div>\r\n			<table border="1">\r\n				<tr>\r\n					<th>金额</th>\r\n					<th>倍数</th>\r\n					<th>状态</th>\r\n					<th>票码</th>\r\n				</tr>\r\n		';

			for (var i = 0, length = list.length; i < length; i++) {
			var ticketItem = list[i] || {};
			var amount = ticketItem.amount/100;
			var prizeAmount = ticketItem.prizeAmount/100;
			var multiple = ticketItem.multiple;
			var printNo = ticketItem.printNo || "";
			var status = ticketItem.status;
			var statusMap = {"0":"未出票","1":"出票失败","2":"待开奖","3":"未中奖","4":"已中奖","5":"已退款"};
		
$out+='\r\n				<tr>\r\n					<td><span class="color_red">';
$out+=$escape(amount);
$out+='</span>元</td>\r\n					<td>';
$out+=$escape(multiple);
$out+='</td>\r\n					<td>\r\n						';
 if (status == 4) { 
$out+='\r\n							中<span class="color_red">';
$out+=$escape(prizeAmount);
$out+='</span>元\r\n						';
 } else { 
$out+='\r\n							';
$out+=$escape(statusMap[status]);
$out+='\r\n						';
 } 
$out+='\r\n					</td>\r\n					<td>\r\n						';
 if (printNo) { 
$out+='\r\n						<a class="showTicketCode" printNo="';
$out+=$escape(printNo);
$out+='" style="color: #1a739c;">查看</a>\r\n						';
 } 
$out+='\r\n					</td>\r\n				</tr>\r\n		';
 } 
$out+='\r\n			</table>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function userFollowList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$escape=$helpers.$escape,totalCount=$data.totalCount,totalAmount=$data.totalAmount,i=$data.i,length=$data.length,list=$data.list,follow=$data.follow,amount=$data.amount,ticketPrizeAmount=$data.ticketPrizeAmount,nickName=$data.nickName,createTime=$data.createTime,d=$data.d,$out='';$out+='<div class="follow mb10">\r\n		<div class="follow_msg clearfix">\r\n			当前跟单<span	class="color_red"> ';
$out+=$escape(totalCount);
$out+=' </span>人，跟单金额<span class="color_red"> ';
$out+=$escape(totalAmount);
$out+=' </span>元\r\n		</div>\r\n		<table>\r\n			<tr>\r\n				<th>用户名称</th>\r\n				<th>跟单金额</th>\r\n				<th>奖金</th>\r\n				<th>跟单时间</th>\r\n			</tr>\r\n	';

		for (var i = 0, length = list.length; i < length; i++) {
		var follow = list[i] || {};
		var amount = follow.amount/100;
		var ticketPrizeAmount = follow.ticketPrizeAmount/100;
		var nickName = follow.nickName;
		var createTime = follow.createTime && follow.createTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	
$out+='\r\n			<tr>\r\n				<td>';
$out+=$escape(nickName);
$out+='</td>\r\n				<td>';
$out+=$escape(amount);
$out+='</td>\r\n				<td>\r\n					';
 if (ticketPrizeAmount != 0) { 
$out+='\r\n						<span class="color_red">';
$out+=$escape(ticketPrizeAmount);
$out+='元</span>\r\n					';
 } 
$out+='\r\n				</td>\r\n				<td>\r\n					';
$out+=$escape(createTime);
$out+='\r\n				</td>\r\n			</tr>\r\n	';
 } 
$out+='\r\n		</table>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}});