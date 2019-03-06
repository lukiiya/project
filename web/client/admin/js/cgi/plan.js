/* 微信 */
define(function(require, exports) {

	exports.getPlanList = getPlanList;
	exports.publishPlan = publishPlan;
	exports.richPlan = richPlan;
	exports.deletePlan = deletePlan;

	var common = require('module/common');
	var ui = require('module/ui');

	function getPlanList(options, success, fail, sync) {
		var url = "?p=admin&c=plan&m=planList";
		var data = {
			userName: options.userName,
			planId: options.planId,
			publish: options.publish,
			prizeStatus: options.prizeStatus,//0=未开奖, 1=已中奖, 2=未中奖
			rich: options.rich,
			matchType: options.matchType,// 0=全部, 1=足球, 2=篮球
			beginTime: options.beginTime,
			endTime: options.endTime,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function publishPlan(options, success, fail, sync) {
		var url = "?p=admin&c=plan&m=publishPlan";
		var data = {
			planId: options.planId,
			publish: options.publish
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function richPlan(options, success, fail, sync) {
		var url = "?p=admin&c=plan&m=richPlan";
		var data = {
			planId: options.planId,
			rich: options.rich
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deletePlan(options, success, fail, sync) {
		var url = "?p=admin&c=plan&m=deletePlan";
		var data = {
			planId: options.planId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});