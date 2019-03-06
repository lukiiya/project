define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var jjcConsumeListView = require('view/invitation/jjcConsumeList');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "竞技彩消费",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setContent(jjcConsumeListView.content(data));
	}


	function setContent() {
		getJjcConsumeList()
	}
	
	function getJjcConsumeList() {
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
			$("#jjcConsumeList").html(jjcConsumeListView.jjcConsumeList(data));
			//收缩
			var jjcConsumeDate = $("#jjcConsumeList .jjcConsumeDate");
			var jjcConsumeContent = $("#jjcConsumeList .jjcConsumeContent");
			jjcConsumeDate.on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				jjcConsumeDate.find('.arrow').attr('class', 'arrow arrow_down');
				jjcConsumeContent.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					$(this).next().eq(0).show();
				}
			});
			$(".menu_bar").on('click',function() {
				var time = $(this).attr('time');
				common.locationUrl('#invitation/seachConsumeList&ticketType=1&time=' + time);
			})
		});
	}
});