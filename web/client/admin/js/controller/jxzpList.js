define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var jxzpCgi = require('cgi/jxzp');
	var jxzpListView = require('view/jxzpList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "极限追盘",
			className: 'content_mgmt',
		}
		main.setMain(view, options);
		main.setContent(jxzpListView.content());
		$("#type").on('change', function(e) {
			var value = parseInt(this.value) || 0;
			var html = [];
			html.push('<option value="0">全部</option>');
			if (value == 1) {
				html.push('<option value="1">连胜</option>');
				html.push('<option value="2">连平</option>');
				html.push('<option value="3">连负</option>');
			} else if (value == 2) {
				html.push('<option value="1">连赢盘</option>');
				html.push('<option value="2">连输盘</option>');
			}
			$('#status').html(html.join(""));
		});
		$("#searchSubmit").on('click', searchSubmit);
		$("#addJxzp").on('click', function(e) {
			common.locationUrl('#editJxzp');
		});
	}


	function setContent() {
		getJxzpList();
	}

	function searchSubmit() {
		pageNum = 1;
		getJxzpList();	
	}

	function getJxzpList() {
		var teamName = trim($('#teamName').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var publish = parseInt($('#publish').val());
		if (isNaN(publish)) {
			publish = null;
		}
		var options = {
			teamName: teamName,
			type: type,
			status: status,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize
		}
		jxzpCgi.getJxzpList(options, function(ret) {
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
			$("#jxzpList").html(jxzpListView.jxzpList(data));
			$("#jxzpList .examine.modify").on('click', modifyJxzp);
			$("#jxzpList .examine.publish").on('click', publishJxzp);
			main.activeTr('jxzpList');
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
		getJxzpList();
	}

	function modifyJxzp() {
		var jxzpId = parseInt($(this).attr('jxzpId')) || 0;
		if (!isNaN(jxzpId) && jxzpId > 0) {
			common.locationUrl('#editJxzp&jxzpId=' + jxzpId);
		}
	}

	function publishJxzp() {
		var jxzpId = parseInt($(this).attr('jxzpId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(jxzpId) || jxzpId <= 0 || isNaN(publish)) {
			return;
		}
		var publishText = publish==1?"上架":"下架";
		ui.showConfirm('是否 "' + publishText +'" 该极限数据', function sure() {
			var options = {
				jxzpId: jxzpId,
				publish: publish
			}
			jxzpCgi.publishJxzp(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(publishText + '成功');
				ui.closeConfirm();
				getJxzpList();
			});
		}, function cancel() {

		});
	}
});