define(function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var seachConsumeListView = require('view/invitation/seachConsumeList');
	var ticketType = null;
	var pageNum = null;
	var pageSize = null;
	var time = null;

	function init(view) {
		ticketType = parseInt(common.getUrlParam("ticketType")) || '';
		time = trim(common.getUrlParam("time")) || '';
		pageNum = 1;
		pageSize = 20;
		setMain(view);
		setContent();
	}

	function _init(view) {
		ticketType = null;
		pageNum = null;
		pageSize = null;
		time = null;
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		var month = parseInt(time.substring(4,6));
		if (ticketType == 1) {
			options.title = month + '月竞技彩消费'
		} else if (ticketType == 2) {
			options.title = month + '月高频彩消费'
		}
		main.setMain(view, options);
		main.setContent(seachConsumeListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		var year = parseInt(time.substring(0,4));
        var dayOfMonthObj = {
            '1': 31, '2': isLeapYear(year), '3': 31, '4': 30,
            '5': 31, '6': 30, '7': 31, '8': 31,
            '9': 30, '10': 31, '11': 30, '12': 31         
        };
		var beginTime = time + '01';
		var endTime = time + dayOfMonthObj[month];
		$("#beginTime").val(beginTime);
		$("#endTime").val(endTime);
		$('#beginTime,#endTime').keydown(function (e) {
            var text = trim($(this).val());
            if (e.keyCode == 8) {
                if (text && text.length == 6) {
                    e.preventDefault();
                    return;
                }
            }
       	});
       $('#beginTime,#endTime').on('input' ,function (e) {
            var text = trim($(this).val());
            if(text.length > 8) {
            	text = text.slice(0,8);
            	$(this).val(text);
            }
       });
       $("#beginTime").on('input', function() {
       		var text = trim($(this).val());
       		text = parseInt(text.substring(6,8));
       		if (text > dayOfMonthObj[month]) {
       			$(this).val(time + (dayOfMonthObj[month] - 1));
       		}
       })
       $("#endTime").on('input', function() {
       		var text = trim($(this).val());
       		text = parseInt(text.substring(6,8));
       		if (text > dayOfMonthObj[month]) {
       			$(this).val(time + dayOfMonthObj[month]);
       		}
       })
	}


	function setContent() {
		getChannelOrderList();
	}
	
	function searchSubmit() {
		pageNum = 1;
		getChannelOrderList();
	}
	
	function isLeapYear(year) {  
        if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
            return 29;
        } else {
            return 28;
        };  
    };
	
	function getChannelOrderList(append) {
		main.unsetScrollLoad();
		var userName = trim($('#userName').val()) || null;
		var orderId = parseInt($('#orderId').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		if (beginTime.length != 8 || endTime.length != 8) {
			ui.showNotice('输入日期有误');
			return;
		}
		if (beginTime > endTime) {
			ui.showNotice('输入开始日期有误');
			return;
		}
		var options = {
			userName: userName,
			orderId: orderId,
			ticketType: ticketType,
			beginTime: beginTime,
			endTime: endTime,
			pageNum: pageNum,
			pageSize: pageSize
		}
		channelCgi.getChannelOrderList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#consumeList").append(seachConsumeListView.consumeList(data));
			} else {
				$("#consumeList").html(seachConsumeListView.consumeList(data));
			}
		});
	}
	
	function moreList() {
		pageNum++;
		getChannelOrderList(true);		
	}
});