define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var gpcConsumeListView = require('view/invitation/gpcConsumeList');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "高频彩消费",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(gpcConsumeListView.content(data));
	}


	function setContent() {
		getGpcConsumeList()
	}
	
	function getGpcConsumeList() {
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
			$("#gpcConsumeList").html(gpcConsumeListView.gpcConsumeList(data));
			//收缩
			var gpcConsumeDate = $("#gpcConsumeList .gpcConsumeDate");
			var gpcConsumeContent = $("#gpcConsumeList .gpcConsumeContent");
			gpcConsumeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				gpcConsumeDate.find('.arrow').attr('class', 'arrow arrow_down');
				gpcConsumeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var time = $(this).attr('time');
				common.locationUrl('#invitation/seachConsumeList&ticketType=2&time=' + time);
			})
		});
	}
});