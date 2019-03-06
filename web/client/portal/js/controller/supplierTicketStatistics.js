define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var stationCgi = require('cgi/station');
	var supplierTicketStatisticsView = require('view/supplierTicketStatistics');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "出票统计",
			className: 'ticketStatistics',
			showHeader: true,
			rightButtonText: ' '
		}
		main.setMain(view, options);
	}

	function setContent() {
		stationTicketStatistics()
	}
	
	function stationTicketStatistics() {
		var options = {};
		stationCgi.stationTicketStatistics(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var ticketStatistics = ret.data || {};
			var data = {
				ticketStatistics: ticketStatistics
			}
			main.setContent(supplierTicketStatisticsView.content(data));
		})
	}
})