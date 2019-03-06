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
})();exports.content=content;exports.drawList=drawList;exports.rankList=rankList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="top_singers clearfix" id="rankBox" style="display: none;">\r\n		<span class="home_icon_msg"></span>\r\n		<ul class="msg_move" id="rankList"></ul>\r\n	</div>\r\n	<ul class="draw_list" id="drawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function drawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,lottery=$data.lottery,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,d=$data.d,day=$data.day,time=$data.time,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,lotteryId=$data.lotteryId,lotteryName=$data.lotteryName,drawFeature=$data.drawFeature,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,testNum=$data.testNum,$out=''; for (var i = 0, length = list.length; i < length; i++) {
		var lottery = list[i] || {};
		var issue = lottery.issue;
		var drawNumber = lottery.drawNumber || '';
		var drawTime = lottery.drawTime || "";
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var time = drawTime[2];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		var lotteryId = lottery.lotteryId;
		var lotteryName = lottery.lotteryName;
		var drawFeature = lottery.drawFeature;
	
$out+='\r\n		<li class="draw_item" lotteryId=\'';
$out+=$escape(lotteryId);
$out+='\'>\r\n			<div class="issue_msg">\r\n				<span class="lottery_name">';
$out+=$escape(lotteryName);
$out+='</span>\r\n				<span>';
$out+=$escape(issue);
$out+='期</span> \r\n				';
 if (lotteryId == 'DLT' || lotteryId == 'SSQ' || lotteryId == 'FC3D') { 
$out+='\r\n					<span>';
$out+=$escape(day);
$out+='(';
$out+=$escape(weekMap[week]);
$out+=')</span> \r\n				';
 } else if (lotteryId == 'GD11X5' || lotteryId == 'JSK3' || lotteryId == 'JX11X5' || lotteryId == 'CQSSC' || lotteryId == 'GXK3') { 
$out+='\r\n					<span>';
$out+=$escape(day);
$out+=' ';
$out+=$escape(time);
$out+='</span> \r\n				';
 } 
$out+='\r\n			</div>\r\n			';
 if (lotteryId == 'DLT' || lotteryId == 'SSQ') { 
$out+='\r\n				<div class="num_wrap mt10">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed;
						if (lotteryId == 'SSQ') {
							drawNumberRed = drawNumber.split('|')[0].split(",");
						} else if (lotteryId == 'DLT') {
							drawNumberRed = drawNumber.split('+')[0].split(",");
						}
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span> \r\n					<span class="blue_ball">\r\n					';
 	var drawNumberBlue;
						if (lotteryId == 'SSQ') {
							drawNumberBlue = drawNumber.split('|')[1].split(",");
						} else if (lotteryId == 'DLT') {
							drawNumberBlue = drawNumber.split('+')[1].split(",");
						}
						for (var k = 0; k < drawNumberBlue.length; k++) { 
							var drawNumberBlueUnit = drawNumberBlue[k];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span>\r\n				</div>\r\n			';
 } else if (lotteryId == 'FC3D') { 
$out+='\r\n				';

					var testNum = drawNumber.split('|')[1].split(',').join(' ');
				
$out+='\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed;
						drawNumberRed = drawNumber.split('|')[0].split(",");
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span>\r\n					<span class="test_num">\r\n						试机号：<span class="">';
$out+=$escape(testNum);
$out+='</span>\r\n					</span>\r\n				</div>\r\n			';
 } else if (lotteryId == 'GD11X5' || lotteryId == 'GX11X5' || lotteryId == 'CQSSC') { 
$out+='\r\n				<div class="num_wrap">\r\n					<span class="red_ball">\r\n					';
 	var drawNumberRed = drawNumber.split(",");
						for (var j = 0; j < drawNumberRed.length; j++) { 
							var drawNumberRedUnit = drawNumberRed[j];
					
$out+='\r\n						<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n					';
 } 
$out+='\r\n					</span> \r\n				</div>\r\n			';
 } else if (lotteryId == 'JSK3' || lotteryId == 'GXK3') { 
$out+='\r\n				';
 drawNumber = drawNumber.split(',');
				
$out+='\r\n				<div class="draw_num">\r\n					<span class="num_icon">\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[0]);
$out+='"></i>\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[1]);
$out+='"></i>\r\n						<i class="icon_dice_';
$out+=$escape(drawNumber[2]);
$out+='"></i>\r\n					</span>\r\n					<span class="ml15 k3_describe">';
$out+=$escape(drawFeature);
$out+='</span>\r\n				</div>\r\n			';
 } 
$out+='\r\n		</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function rankList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,order=$data.order,nickName=$data.nickName,lotteryName=$data.lotteryName,ticketPrizeAmount=$data.ticketPrizeAmount,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var order = list[i] || {};
	var nickName = order.nickName;
	var lotteryName = order.lotteryName;
	var ticketPrizeAmount = order.ticketPrizeAmount/100;

$out+='\r\n	<li class="ml5 mr5 size12">恭喜【';
$out+=$escape(nickName);
$out+='】投注';
$out+=$escape(lotteryName);
$out+='中奖';
$out+=$escape(ticketPrizeAmount);
$out+='元</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});