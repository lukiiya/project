define(function(require, exports) {
	
	exports.getComboList = getComboList;

	var common = require('module/common');

	function getComboList(options, success, fail, sync) {
		var url = "?c=combo&m=comboList";
		var data = {
			comboType: options.comboType,//套餐类型, 1=极限追盘,2=晒米冷热
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}
});