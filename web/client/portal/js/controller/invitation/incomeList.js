define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var incomeListView = require('view/invitation/incomeList');
	var detail = null;

	function init(view) {
		detail = trim(common.getUrlParam("detail")) || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		detail = null;
		common.clearCache('incomeDetail')
	}

	function setMain(view) {
		var options = {
			title: "我的收益",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		if (detail) {
			var incomeData = common.getCache('incomeDetail');
			options.title = incomeData.month + '月收益详情'
		}
		main.setMain(view, options);
		if (detail) {
			main.setContent(incomeListView.incomeDetail());
		} else {
			main.setContent(incomeListView.content());
		}
	}


	function setContent() {
		getIncomeList();
		if (detail) {
			getIncomeDetail()
		}
	}
	
	function getIncomeList() {
		var options = {
			
		}
		channelCgi.getStatisticsList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list,
				Date: Date
			}
			$("#incomeList").html(incomeListView.incomeList(data));
			//收缩
			var incomeDate = $("#incomeList .incomeDate");
			var incomeContent = $("#incomeList .incomeContent");
			incomeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				incomeDate.find('.arrow').attr('class', 'arrow arrow_down');
				incomeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var jcFund = parseInt($(this).attr('jcFund'));
				var gpFund = parseInt($(this).attr('gpFund'));
				var month = $(this).attr('month');
				common.setCache('incomeDetail',{'jcFund': jcFund,'gpFund': gpFund,'month': month});
				common.locationUrl('#invitation/incomeList&detail=true');
			})
		});
	}
	
	function getIncomeDetail() {
		var incomeData = common.getCache('incomeDetail');
		var data = {
			incomeData: incomeData
		}
		$("#detailData").html(incomeListView.detailData(data));
	}
});