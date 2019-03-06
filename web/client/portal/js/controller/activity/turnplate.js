define(function(require, exports) {

	exports.init = init;
	exports._init = _init;
	
	var common = require('module/common');
	if (common.isAndroid()) {
		require('external/jockey');
	}
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var turnplateView = require('view/activity/turnplate');
	var pageNum = null;
	var pageSize = null;
	var prizeRecord = null;
	var drawTime = null;//抽奖次数

	function init(view) {
		pageNum = 1;
		pageSize = 20;
		prizeRecord = common.getUrlParam("prizeRecord") || false;
		drawTime = 0;
		setMain(view);
		setContent();
		setPageShare();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		prizeRecord = null;
		drawTime = null;
		clearTimeout(rotateTurnplate.timer);
	}

	function setMain(view) {
		var options = {
			title: prizeRecord ? "抽奖记录" :"大转盘",
			className: prizeRecord ? 'prizeRecord' : 'activity_turnplate',
			showHeader: prizeRecord ? true : false,
			isTurnplateHeader: prizeRecord ? true : false
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isIosBrowser() && common.isIos()) {
    		window.webkit.messageHandlers.webNavigation.postMessage({
				title: "幸运大转盘",
				colorX: ''
	    	});
	    }
		if (prizeRecord) {
			main.setContent(turnplateView.prizeRecord(data));
			$("#goBack").off().on('click',function(e) {
				e.preventDefault();
				e.stopPropagation();
//				common.historyBack();
				common.locationUrl("#activity/turnplate");
				window.Jockey && window.Jockey.send("showTitleBar");
			});
			if (common.isIosBrowser() && common.isIos()) {
	    		window.webkit.messageHandlers.webNavigation.postMessage({
					title: '',
					colorX: 'e8552d'
		    	});
		    }
			getTurnplateList();
		} else {
			if (!common.isApp()) {
				common.setHistoryBack('#lotteryHall');
			}
			main.setContent(turnplateView.turnplate(data));
			$("#rulesBtn").off().on('click',function() {
				$('#turnplateMask').show();
				$('#rules').slideDown();
			});
			$('#closeRuleBtn').off().on('click',function(e) {
				$('#turnplateMask').hide();
				$('#rules').slideUp();
			});
			$("#prizeRecordBtn").on('click',function() {
				common.locationUrl("#activity/turnplate&prizeRecord=true");
				window.Jockey && window.Jockey.send("hideTitleBar");
			});
			getTurnplateActivityInfo();
		}
	}


	function setContent() {
		
	}

	function setPageShare() {
		var data = {
			imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/turnplate_logo.png',
			desc: '幸运大转盘 赢球衣和iPhone7！'
		}
		ui.setShare(data);
	}
	
	function setDegree(deg) {
	    $('#rotatebg').css({
	    	'-webkit-transform': 'rotate('+deg+'deg)',
	        '-moz-transform':'rotate('+deg+'deg)',
	        '-o-transform':  'rotate('+deg+'deg)'
	    });
	}
	
	function getTurnplateActivityInfo() {
		var options = {}
		activityCgi.getTurnplateActivityInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var activity = ret.data || {};
			var turnplateCount = parseInt(activity.turnplateCount) || 0;
			var remark = trim(activity.remark) || '';
			$("#turnplateCount").html(turnplateCount);
			$("#remark").html(remark);
			$("#start").off().on('click', rotateTurnplate);
		});
	}
	
	function rotateTurnplate() {
		clearTimeout(rotateTurnplate.timer);
		$("#start").off();
		var options = {}
		activityCgi.rotateTurnplate(options, function(ret) {
			var rotate = ret.data || {};
			var data = {
				rotate: rotate,
				IMG_PATH: IMG_PATH
			}
			$("#trunplateNotice").html(turnplateView.trunplateNotice(data));
			$("#closeNotice,#ensure").on('click',function() {
				closeNotice();
			})
			$("#buyPlan").on('click',function() {
				if (common.isAndroid()) {
//					common.locationUrl('shaimi://home');
					window.Jockey && window.Jockey.send("closeWindow");
				} else {
					common.locationUrl('#home');
				}
			})
			if (ret.errCode != 0) {
				var msg = ret.msg || '';
				if (msg.indexOf("没有抽奖机会") != -1) {
					showNotice();
					$("#start").off().on('click', rotateTurnplate);
				}
				return;
			}
			var prizeMap = {
				"twoCj1": "1",
				"thk1": "2",
				"poloShirt": "3",
				"fiveCj": "4",
				"twentyCj": "5",
				"twoCj2": "6",
				"thk2":"7"
			}
			var offset = parseInt(prizeMap[rotate]) || 0;
			if (offset <= 0) {
				return;
			}
			drawTime++;
			var round = 360 * 8;//动画转动度数(8圈)
			var per = (360 / 8);//每个奖品的度数
		 	var angles = (drawTime * round) + (offset * per);
			setDegree(angles);//改变偏转
		    rotateTurnplate.timer = setTimeout(function () {
		    	showNotice();
		    	getTurnplateActivityInfo();
		     }, 6000 + 300);
		}, function(e) {
			$("#start").off().on('click', rotateTurnplate);
		});
	}
	
	function moreList() {
		pageNum++;
		getTurnplateList(true);		
	}
	
	function getTurnplateList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		} 
		activityCgi.getTurnplateList(options, function(ret) {
			if (ret.errCode != 0) {
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
				$("#prizeRecordList").append(turnplateView.prizeRecordList(data))
			} else {
				$("#prizeRecordList").html(turnplateView.prizeRecordList(data))
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function showNotice() {
		$('#turnplateMask').show();
		$("#trunplateNotice").show();
	}
	
	function closeNotice() {
		$('#turnplateMask').hide();
		$('#trunplateNotice').hide().html('');
	}
});