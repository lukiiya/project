define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	require('external/jquery.datetimepicker');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var matchListView = require('view/matchList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "比赛列表",
			className: 'order_list'
		} 
		main.setMain(view, options);
		main.setContent(matchListView.content());
		$('#beginTime, #endTime').datetimepicker({
			lang: 'ch',
			timepicker: false,
			format: 'Y-m-d',
			closeOnDateSelect: true,
			scrollInput: false
		});
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getMatchList();
	}

	function searchSubmit() {
		pageNum = 1;
		getMatchList();
	}

	function getMatchList() {
		var number = trim($('#number').val()) || null;
		var league = trim($('#league').val()) || null;
		var home = trim($('#home').val()) || null;
		var away = trim($('#away').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var beginTime = trim($('#beginTime').val()) || null;
		var endTime = trim($('#endTime').val()) || null;
		var matchCancel = !!$('#matchCancel')[0].checked;
		var options = {
			number: number,
			league: league,
			home: home,
			away: away,
			type: type,
			beginTime: beginTime,
			endTime: endTime,
			orderBy: 1,
			pageNum: pageNum,
			pageSize: pageSize
		}
		if (matchCancel) {
			options.result = '取消';
		}
		matchCgi.getMatchList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#matchList").html(matchListView.matchList(data));
			$("#matchList").find('.cancelMatch').on('click', cancelMatch);
			$("#matchList").find('.setMatchResult').on('click', showSetMatchResult);
			main.activeTr('matchList');
		});
	}

	function showPagination(totalCount) {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			totalCount: totalCount,
			pageCodeId: "pageCodeBox",
			pageCodeFun: pageCodeFun
		};
		ui.showPagination(options);
	}

	function pageCodeFun(e){
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getMatchList();
	}

	function cancelMatch(e) {
		var matchId = parseInt($(this).attr("matchId")) || 0;
		var matchInfo = trim($(this).attr("matchInfo")) || '';
		if (isNaN(matchId) || matchId <= 0 || !matchInfo) {
			return;
		}
		ui.showConfirm('是否取消 <br>"' + matchInfo +'" ？<br>被取消的比赛，算奖时赔率将按1计算！', function sure() {
			var options = {
				matchId: matchId,
				halfResult: '取消',
				result: '取消'
			}
			matchCgi.modifyMatch(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('比赛取消成功');
				ui.closeConfirm();
				getMatchList();
			});
		}, function cancel() {

		});
	}

	function showSetMatchResult(e) {
		var matchId = parseInt($(this).attr("matchId")) || 0;
		var matchInfo = trim($(this).attr("matchInfo")) || '';
		if (isNaN(matchId) || matchId <= 0 || !matchInfo) {
			return;
		}
		var data = {
			matchId: matchId,
			matchInfo: matchInfo
		}
		var options = {
			html: matchListView.modifyResult(data)
		}
		ui.showWindow(options);
		$('#cancelModifyResult').on('click', ui.closeWindow);
		$('#sureModifyResult').on('click', setMatchResultSubmit);
	}

	function setMatchResultSubmit() {
		var matchId = parseInt($('#modifyMatchId').val()) || 0;
		if (isNaN(matchId) || matchId <= 0) {
			return;
		}
		var halfResult = trim($('#modifyHalfResult').val()) || '';
		var result = trim($('#modifyResult').val()) || '';
		if (halfResult && !(/^\d+:\d+$/.test(halfResult))) {
			ui.showNotice('请输入正确的半场结果');
			return;
		}
		if (result && !(/^\d+:\d+$/.test(result))) {
			ui.showNotice('请输入正确的全场结果');
			return;
		}
		var options = {
			matchId: matchId,
			halfResult: halfResult,
			result: result
		}
		matchCgi.modifyMatch(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('赛果设置成功');
			ui.closeWindow();
			getMatchList();
		});
	}
})