define(function(require, exports) {
	
	exports.getMatchInfo = getMatchInfo;
	exports.getMatchList = getMatchList;
	exports.getHotMatchList = getHotMatchList;
	exports.getHotMatchLeagueList = getHotMatchLeagueList;
	exports.getMatchRecommend = getMatchRecommend;
	exports.getMatchLeagueList = getMatchLeagueList;
	exports.getGuessList = getGuessList;
	exports.getGuessTeamList = getGuessTeamList;
	exports.getDateList = getDateList;

	var common = require('module/common');

	function getMatchInfo(options, success, fail, sync) {
		var url = "?c=match&m=matchInfo";
		var data = {
			matchId: options.matchId
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function getMatchList(options, success, fail, sync) {
		var url = "?c=match&m=matchList";
		var data = {
			type: options.type,
			league: options.league,
			needYaPan: options.needYaPan,
			needSingle: options.needSingle
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getHotMatchList(options, success, fail, sync) {
		var url = "?c=match&m=hotMatchList";
		var data = {
			type: options.type,//1=足球，2=篮球
			league: options.league,
			saleTime: options.saleTime,//日期
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function getHotMatchLeagueList(options, success, fail, sync) {
		var url = "?c=match&m=hotMatchLeagueList";
		var data = {
			saleTime: options.saleTime, 
			type: options.type,//1=足球，2=篮球
			status: options.status,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getMatchRecommend(options, success, fail, sync) {
		var url = "?c=match&m=matchRecommend";
		var data = {
			matchRecommend: options.matchRecommend,
			needYaPan: options.needYaPan
		}
		common.callCGI(url, "post", data, success, fail, sync);
	}
	
	function getMatchLeagueList(options, success, fail, sync)  {
		var url = "?c=match&m=matchLeagueList";
		var data = {
			type: options.type,//1=足球，2=篮球
			status: options.status,//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			pageNum: options.pageNum,
			pageSize: options.pageSize,
			needYaPan: options.needYaPan
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getGuessList(options, success, fail, sync)  {
		var url = "?c=match&m=guessList";
		var data = {
			lotteryId: options.lotteryId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getGuessTeamList(options, success, fail, sync)  {
		var url = "?c=match&m=guessTeamList";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
	
	function getDateList(options, success, fail, sync)  {
		var url = "?c=match&m=dateList";
		var data = {
			type: options.type //1=足球，2=篮球
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});