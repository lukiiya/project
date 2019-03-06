define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var replayCgi = require('cgi/replay');
	var replayListView = require('view/replayList');
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
			title : "复盘列表",
			className :  'replay'
		}
		main.setMain(view, options);
		main.setContent(replayListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}

	function setContent() {
		getReplayList();
	}

	function searchSubmit() {
		pageNum = 1;
		getReplayList();
	}

	function getReplayList() {
		var title = trim($("#title").val()) || null;
		var userName = trim($('#userName').val()) || undefined;
		var replayId = parseInt($('#replayId').val()) || undefined;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			title: title,
			userName: userName,
			replayId: replayId,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize
		}
		replayCgi.getReplayList(options, function(ret) {
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
			$("#replayList").html(replayListView.replayList(data));
			$("#replayList .deleteReplay").on('click', deleteReplay);
			$("#replayList [title]").on('click', showTitle);
			$("#replayList [content]").on('click', showContent);
			$("#replayList [resourceList]").on('click', showImage);
			$("#replayList .examine.publish").on('click', publishReplay);
			main.activeTr('replayList');
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
		getReplayList();
	}

	function deleteReplay() {
		var replayId = parseInt($(this).attr('replayId')) || 0;
		if (isNaN(replayId) || replayId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该复盘', function sure() {
			var options = {
				replayId: replayId
			}
			replayCgi.deleteReplay(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getReplayList();
			});
		}, function cancel() {

		});
	}

	function publishReplay() {
		var replayId = parseInt($(this).attr('replayId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(replayId) || replayId <= 0 || isNaN(publish)) {
			return;
		}
		var publishText = publish==1?"上架":"下架";
		ui.showConfirm('是否 "' + publishText +'" 该复盘', function sure() {
			var options = {
				replayId: replayId,
				publish: publish
			}
			replayCgi.publishReplay(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(publishText + '成功');
				ui.closeConfirm();
				getReplayList();
			});
		}, function cancel() {

		});
	}
	
	function showTitle(e) {
		var title = trim($(this).attr('title')) ;
		var options = {
			html:  '<pre style="white-space:pre-wrap;line-height:25px;">' + title + '</pre>'
		}
		ui.showWindow(options);
	}
	
	function showContent(e) {
		var content = trim($(this).attr('content')) ;
		var options = {
			html:  '<pre style="white-space:pre-wrap;line-height:25px;">' + content + '</pre>'
		}
		ui.showWindow(options);
	}
	
	function showImage() {
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		var imgHtml = [];
		$.each(resourceList, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('</br>')
		}
		ui.showWindow(options);
	}
})