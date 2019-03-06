define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var activityCgi = require('cgi/activity');
	var confederationsCupView = require('view/activity/confederationsCup');
	var teamId = null;

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		teamId = null;
	}

	function setMain(view) {
		var options = {
			title: "联合会杯竞猜",
			className: 'activity_FCC'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(confederationsCupView.content(data));
		$("#teamList li").on('click', function() {
			$("#teamList li").removeClass('active');
			$(this).addClass('active');
			teamId = parseInt($(this).attr('teamId'));
		})
		$("#submitBtn").off().on('click', submit);
		$("#newUser").on('click', function() {
			common.locationUrl("#my");
		});
		$("#recharge").on('click', function() {
			common.locationUrl("#activity/betPresent");
		});
		$("#award2x1").on('click', function() {
			common.locationUrl("#activity/award2x1");
		});
		pageShare();
	}

	function setContent() {
		guessInfo()
	}
	
	function submit() {
		var options = {
    		teamId: teamId
    	}
		if (!teamId) {
			ui.showNotice('请选择一个球队')
			return;
		}
		activityCgi.guessWinner(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('您已投票成功');
			setTimeout(guessInfo, 1000);
			$("#teamList li").removeClass('active');
		})
	}
	
	function guessInfo() {
		var options = {
    	
    	}
		activityCgi.guessInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var teamGuessList = data.teamGuessList || [];
			var userGuessData = data.userGuessData || {};
			var teamName = userGuessData.teamName || '无';
			$("#guessResult").html(teamName);
			for (var i = 0;i < teamGuessList.length;i++) {
				var teamId = teamGuessList[i].teamId;
				var guessRate = teamGuessList[i].guessRate;
				$("#team" + teamId + " .progress_bar").css('width', guessRate);
				$("#team" + teamId + " .percent").html(guessRate)
			}
			if (!userGuessData['teamId']) {
				$("#submitBtn").show();
				$("#activeBtn").hide();
			} else {
				$("#activeBtn").show();
				$("#submitBtn").hide();
			}
		})
	}

	function pageShare() {
		if (common.isWeixinBrowser()) {
			var data = {
				title: '联合会杯冠军竞猜 1888等你拿',
				link: location.href.replace(/[#\?].*/g, '') + '#activity/confederationsCup',
				imgUrl: 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/ssqhb_share.jpg',
				desc: '大家一起来竞猜冠军'
			}
			ui.setShare(data);
		}
	}
});