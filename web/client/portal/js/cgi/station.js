define(function(require, exports) {

	exports.stationTicketStatistics = stationTicketStatistics;

	var common = require('module/common');
	var ui = require('module/ui');

	function stationTicketStatistics(options, success, fail, sync) {
		var url = "?c=station&m=stationTicketStatistics";
		var data = {};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});