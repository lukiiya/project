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
})();exports.content=content;exports.SSQ=SSQ;exports.SSQdrawList=SSQdrawList;exports.JSK3=JSK3;exports.K3drawList=K3drawList;exports.GX11X5=GX11X5;exports.GX11X5DrawList=GX11X5DrawList;exports.FC3D=FC3D;exports.fc3dDrawList=fc3dDrawList;function content($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';return new String($out);
}).call(templateUtils,$data).toString()}function SSQ($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="dty_cont">\r\n		<div class="ssqInfo_box">\r\n			<ul class="ssqlist" id="SSQdrawList">\r\n				\r\n			</ul>\r\n		</div>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function SSQdrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,day=$data.day,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,drawNumberBlue=$data.drawNumberBlue,k=$data.k,drawNumberBlueUnit=$data.drawNumberBlueUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['周日','周一','周二','周三','周四','周五','周六'];
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(day);
$out+=' (';
$out+=$escape(weekMap[week]);
$out+=')</span></p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed;
				if (lotteryId == 'SSQ') {
					drawNumberRed = drawNumber.split('|')[0].split(",");
				} else if (lotteryId == 'DLT') {
					drawNumberRed = drawNumber.split('+')[0].split(",");
				}
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span> \r\n			<span class="blue_ball">\r\n			';
 	var drawNumberBlue;
				if (lotteryId == 'SSQ') {
					drawNumberBlue = drawNumber.split('|')[1].split(",");
				} else if (lotteryId == 'DLT') {
					drawNumberBlue = drawNumber.split('+')[1].split(",");
				}
				for (var k = 0; k < drawNumberBlue.length; k++) { 
					var drawNumberBlueUnit = drawNumberBlue[k];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberBlueUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function JSK3($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<ul class="k3draw_list" id="K3drawList"></ul>';
return new String($out);
}).call(templateUtils,$data).toString()}function K3drawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,length=$data.length,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawFeature=$data.drawFeature,drawTime=$data.drawTime,d=$data.d,day=$data.day,time=$data.time,$escape=$helpers.$escape,$out=''; for (var i = 0, length = list.length; i < length; i++) {
	var issue = list[i].issue;
	var drawNumber = list[i].drawNumber || '';
	drawNumber = drawNumber.split(',');
	var drawFeature = list[i].drawFeature || '';
	var drawTime = list[i].drawTime || "";
	drawTime = drawTime.match(/\d{4}-(\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
	var day = '';
	var time = '';
	if (drawTime && drawTime.length == 3) {
		day = drawTime[1];
		time = drawTime[2];
	}

$out+='\r\n	<li class="draw_item">\r\n		<div class="issue_msg">\r\n			<span>';
$out+=$escape(issue);
$out+='期</span> \r\n			<span>';
$out+=$escape(time);
$out+='</span>\r\n		</div>\r\n		<div class="draw_num">\r\n			<span class="num_icon">\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[0]);
$out+='"></i>\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[1]);
$out+='"></i>\r\n				<i class="icon_dice_';
$out+=$escape(drawNumber[2]);
$out+='"></i>\r\n			</span>\r\n			<span class="ml15 k3_describe">';
$out+=$escape(drawFeature);
$out+='</span>\r\n		</div>\r\n	</li>\r\n';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function GX11X5($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="ssqInfo_box">\r\n		<ul class="ssqlist" id="GX11X5DrawList">\r\n			\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function GX11X5DrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.replace(/\d{4}-(\d{2}-\d{2} \d{2}:\d{2}):\d{2}/, "$1") || "";
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(drawTime);
$out+=' </p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed = drawNumber.split(",");
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span> \r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}function FC3D($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,$out='';$out+='<div class="fc3dInfo_box">\r\n		<ul class="ssqlist" id="fc3dDrawList">\r\n			\r\n		</ul>\r\n	</div>';
return new String($out);
}).call(templateUtils,$data).toString()}function fc3dDrawList($data){return (function anonymous($data,$id
/**/) {
var $helpers=this,i=$data.i,list=$data.list,issue=$data.issue,drawNumber=$data.drawNumber,drawTime=$data.drawTime,lotteryId=$data.lotteryId,d=$data.d,day=$data.day,week=$data.week,Date=$data.Date,g=$data.g,weekMap=$data.weekMap,testNum=$data.testNum,$escape=$helpers.$escape,drawNumberRed=$data.drawNumberRed,j=$data.j,drawNumberRedUnit=$data.drawNumberRedUnit,$out=''; 
	for (var i = 0; i < list.length; i++) { 
		var issue = list[i].issue;
		var drawNumber = list[i].drawNumber || '';
		var drawTime = list[i].drawTime || "";
		var lotteryId = list[i].lotteryId;
		drawTime = drawTime.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/);
		var day = drawTime[1];
		var week = new Date(day.replace(/-/g, "/")).getDay();
		var weekMap = ['周日','周一','周二','周三','周四','周五','周六'];
		var testNum = drawNumber.split('|')[1].split(',').join(' ');
	
$out+='\r\n	<li>\r\n		<p class="clearfix"><span class="fl">';
$out+=$escape(issue);
$out+='期</span><span class="fr color9 size13">';
$out+=$escape(day);
$out+=' (';
$out+=$escape(weekMap[week]);
$out+=')</span></p>\r\n		<div class="num_wrap mt10">\r\n			<span class="red_ball">\r\n			';
 	var drawNumberRed;
				drawNumberRed = drawNumber.split('|')[0].split(",");
				for (var j = 0; j < drawNumberRed.length; j++) { 
					var drawNumberRedUnit = drawNumberRed[j];
			
$out+='\r\n				<em>';
$out+=$escape(drawNumberRedUnit);
$out+='</em>\r\n			';
 } 
$out+='\r\n			</span>\r\n			<span class="test_num color6 size15">\r\n				试机号：<span class="size15">';
$out+=$escape(testNum);
$out+='</span>\r\n			</span>\r\n		</div>\r\n	</li>\r\n	';
 } 
return new String($out);
}).call(templateUtils,$data).toString()}});