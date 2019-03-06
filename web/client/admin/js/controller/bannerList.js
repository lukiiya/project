define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var bannerCgi = require('cgi/banner');
	var bannerListView = require('view/bannerList');
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
			title: "banner列表",
			className: 'order-list',
		}
		main.setMain(view, options);
		main.setContent(bannerListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createBanner").on('click', editBanner);
	}


	function setContent() {
		getBannerList();
	}

	function searchSubmit() {
		pageNum = 1;
		getBannerList();	
	}

	function getBannerList() {
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
			$("#bannerList").html(bannerListView.bannerList(data));
			$("#bannerList .editBanner").on('click', editBanner);
			$("#bannerList .deleteBanner").on('click', deleteBanner);
			$("#bannerList .modifySort").on('click', modifySort);
			$("#bannerList .publishBanner").on('click', publishBanner);
			var top = $("#bannerList tr:first-child .modifyUp");
			var bottom = $("#bannerList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('bannerList');
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
		getBannerList();
	}

	function editBanner() {
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		var title = '';
		if (!isNaN(bannerId) && bannerId > 0) {
			title = '修改banner';
		} else {
			title = '新增banner';
		}
		var options = {
			title: title,
			bannerId: bannerId
		}
		showEditBanner(options);
		if (!isNaN(bannerId) && bannerId > 0) {
			var options = {
				bannerId : bannerId
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
				$("#previewImg").html('<img class="pre_img" src="'+ src +'" alt="" />');
			});
		}
	}

	function showEditBanner(options) {
		options = options || {};
		closeEditBanner();
		$("body").append(bannerListView.editBanner(options));
		$("#closeEditBanner").on('click', closeEditBanner);
		$("#cancelEditBanner").on('click', closeEditBanner);
		$("#fileSelect").on('change', fileChange);
		$("#sureEditBanner").on('click', editBannerSubmit);
	}
	
	function closeEditBanner(){
		$("#editBannerBox").remove();
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
			$('#previewImg').html('<img class="pre_img" src="'+ e.target.result +'" alt="" />');
		}
		var reader = new FileReader();
		reader.onload = readerOnload;
		reader.readAsDataURL(uploadFile);
	}
	
	function editBannerSubmit() {
		var bannerId = parseInt($("#editBannerId").val());
		var link = trim($('#editLink').val());
		var type = parseInt($("#editType").val());
		if ((isNaN(bannerId) || bannerId <= 0) && !uploadFile) {
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
			if (!isNaN(bannerId) && bannerId > 0) {
				options.bannerId = bannerId;
				cgi = bannerCgi.modifyBanner;
			} else {
				cgi = bannerCgi.createBanner;
			}
			cgi(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				if (!isNaN(bannerId) && bannerId > 0) {
					ui.showNotice("修改成功");	
				} else {
					ui.showNotice("新增成功");	
				}
				closeEditBanner();
				$('#type').val(type);
				getBannerList();
			});
		}
		var data = {
			type: type,
			link: link,
			file: uploadFile
		};
		submitFun(data);
	}

	function deleteBanner() {
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		if (isNaN(bannerId) || bannerId <= 0) {
			return
		}
		ui.showConfirm('是否 "删除" 该banner', function() {
			var data = {
				bannerId: bannerId
			};
			bannerCgi.deleteBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice("删除成功");
				ui.closeConfirm();
				getBannerList();
			});
		});
	}
	
	function publishBanner() { 
		var bannerId = parseInt($(this).attr('bannerId')) || 0;
		var publish = parseInt($(this).attr('publish'));
		if (isNaN(bannerId) || bannerId <= 0 || isNaN(publish) || publish < 0) {
			return
		}
		var title = publish == 1 ? '上架' : '下架';
		ui.showConfirm('是否 "' + title + '" 该banner', function() {
			var data = {
				bannerId: bannerId,
				publish: publish
			}
			bannerCgi.publishBanner(data, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(title + "成功");
				ui.closeConfirm();
				getBannerList();
			});
		});	
	}

	function modifySort() {
		var bannerIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisBannerId = parseInt($(this).attr('bannerId')) || 0;
		var prevBannerId = parseInt($(this).parent().parent().prev().attr('bannerId')) || 0;
		var nextBannerId = parseInt($(this).parent().parent().next().attr('bannerId')) || 0;
		if (isNaN(thisBannerId) || isNaN(prevBannerId) || isNaN(nextBannerId) || thisBannerId <= 0) {
			return;
		}
		if (type == 1) {
			bannerIdArr.push(prevBannerId, thisBannerId);
		} else if (type == 2) {
			bannerIdArr.push(thisBannerId, nextBannerId);
		};
		var data = {
			bannerId: bannerIdArr
		};
		bannerCgi.modifyBannerSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getBannerList();
		});
	}
});