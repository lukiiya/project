define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var bannerCgi = require('cgi/banner');
	var launchListView = require('view/launchList');
	var pageNum = null;
	var pageSize = null;
	var uploadFile = null;

	function init(view) {
		pageNum = 1;
		pageSize = 50;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		uploadFile = null;
	}

	function setMain(view) {
		var options = {
			title: "启动图列表",
			className: 'order-list',
		}
		main.setMain(view, options);
		main.setContent(launchListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createLaunchImg").on('click', editLaunchImg);
	}


	function setContent() {
		getLaunchList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLaunchList();	
	}

	function getLaunchList() {
		var type = parseInt($('#type').val());
		var publish = parseInt($('#publish').val());
		if (isNaN(type)) {
			type = undefined;
		}
		if (isNaN(publish)) {
			publish = undefined;
		}
		var options = {
			type: type,
			publish: publish,
			pageNum: pageNum,
			pageSize: pageSize,
		}
		bannerCgi.getBannerList(options, function(ret) {
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
			$("#launchList").html(launchListView.launchList(data));
			$("#launchList .editLaunch").on('click', editLaunchImg);
			$("#launchList .deleteLaunch").on('click', deleteLaunch);
			$("#launchList .modifySort").on('click', modifySort);
			$("#launchList .publishLaunch").on('click', publishLaunch);
			var top = $("#launchList tr:first-child .modifyUp");
			var bottom = $("#launchList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('launchList');
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
		getLaunchList();
	}

	function editLaunchImg() {
		var launchId = parseInt($(this).attr('launchId')) || 0;
		var title = '';
		if (!isNaN(launchId) && launchId > 0) {
			title = '修改启动图';
		} else {
			title = '新增启动图';
		}
		var options = {
			title: title,
			launchId: launchId
		}
		showEditLaunch(options);
		if (!isNaN(launchId) && launchId > 0) {
			var options = {
				launchId : launchId
			}
			bannerCgi.getBannerInfo(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				var link = trim(data.link);
				var src = trim(data.resourceList[0]);
				var type = parseInt(data.type) || 0;
				$('#editLink').val(link);
				$('#editType').val(type);
				$("#previewImg").html('<img class="pre_img" style="width: 200px" src="'+ src +'" alt="" />');
			});
		}
	}

	function showEditLaunch(options) {
		options = options || {};
		closeEditLaunch();
		$("body").append(launchListView.editLaunch(options));
		$("#closeEditLaunch").on('click', closeEditLaunch);
		$("#cancelEditLaunch").on('click', closeEditLaunch);
		$("#fileSelect").on('change', fileChange);
		$("#sureEditLaunch").on('click', editLaunchSubmit);
	}
	
	function closeEditLaunch(){
		$("#editLaunchBox").remove();
		uploadFile = null;
	}
	
	function fileChange(e) {
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			var fileName = trim(file.name);
			var index = fileName.lastIndexOf(".");
			if(index != -1) {
				var extName = fileName.substr(index + 1).toLowerCase();
				if(exts[extName]) {
					uploadFile = file;
					return false;
				}
			}
		});
		if (!uploadFile) {
			return;
		}	
		var readerOnload = function(e) {
			$('#previewImg').html('<img class="pre_img" style="width: 200px" src="'+ e.target.result +'" alt="" />');
		}
		var reader = new FileReader();
		reader.onload = readerOnload;
		reader.readAsDataURL(uploadFile);
	}
	
	function editLaunchSubmit() {
		var launchId = parseInt($("#editLaunchId").val());
		var link = trim($('#editLink').val());
		var type = parseInt($("#editType").val());
		if ((isNaN(launchId) || launchId <= 0) && !uploadFile) {
			ui.showNotice('请选择图片');
			return;	
		}
		if (!link) {
			ui.showNotice('请输入链接');
			return;
		};
		if (isNaN(type) || type < 0) {
			ui.showNotice('请选择类型');
			return;
		};
		var submitFun = function(options) {
			ui.closeLoading();
			var cgi = function() {};
			if (!isNaN(launchId) && launchId > 0) {
				options.launchId = launchId;
				cgi = bannerCgi.modifyBanner;
			} else {
				cgi = bannerCgi.createBanner;
			}
			cgi(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				if (!isNaN(launchId) && launchId > 0) {
					ui.showNotice("修改成功");	
				} else {
					ui.showNotice("新增成功");	
				}
				closeEditLaunch();
				$('#type').val(type);
				getLaunchList();
			});
		}
		var data = {
			type: type,
			link: link,
			file: uploadFile
		};
		submitFun(data);
	}

	function deleteLaunch() {
		var launchId = parseInt($(this).attr('launchId')) || 0;
		if (isNaN(launchId) || launchId <= 0) {
			return
		}
		ui.showConfirm('是否 "删除" 该启动图', function() {
			var data = {
				launchId: launchId
			};
			bannerCgi.deleteBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice("删除成功");
				ui.closeConfirm();
				getLaunchList();
			});
		});
	}
	
	function publishLaunch() { 
		var launchId = parseInt($(this).attr('launchId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(launchId) || launchId <= 0 || isNaN(publish) || publish < 0) {
			return
		}
		var title = publish == 1 ? '上架' : '下架';
		ui.showConfirm('是否 "' + title + '" 该启动图', function() {
			var data = {
				launchId: launchId,
				publish: publish
			}
			bannerCgi.publishBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(title + "成功");
				ui.closeConfirm();
				getLaunchList();
			});
		});	
	}

	function modifySort() {
		var launchIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisLaunchId = parseInt($(this).attr('launchId')) || 0;
		var prevLaunchId = parseInt($(this).parent().parent().prev().attr('launchId')) || 0;
		var nextLaunchId = parseInt($(this).parent().parent().next().attr('launchId')) || 0;
		if (isNaN(thisLaunchId) || isNaN(prevLaunchId) || isNaN(nextLaunchId) || thisLaunchId <= 0) {
			return;
		}
		if (type == 1) {
			launchIdArr.push(prevLaunchId, thisLaunchId);
		} else if (type == 2) {
			launchIdArr.push(thisLaunchId, nextLaunchId);
		};
		var data = {
			launchId: launchIdArr
		};
		bannerCgi.modifyBannerSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getLaunchList();
		});
	}
});