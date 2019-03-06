define(function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var orderCgi = require('cgi/order');
	var supplierTicketOrderDetailView = require('view/supplierTicketOrderDetail');
	var type = null;
	var orderNo = null;
	var uploadTicketFile = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		orderNo = trim(common.getUrlParam("orderNo")) || "";
		common.setHistoryBack('#supplierTicketOrderList&type=' + type);
		uploadTicketFile = [];
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		orderNo = null;
		uploadTicketFile = null;
		closeImage();
	}

	function setMain(view) {
		var options = {
			title: "方案详情",
			className: 'myDocumentary',
			showHeader: true,
			rightButtonText: '　'
		}
		main.setMain(view, options);
	}


	function setContent() {
		supplierTicketOrderDetail();
	}
	
	function supplierTicketOrderDetail(isShowImage) {
		if (!orderNo) {
			return;
		}
		var options = {
			type: 2,
			orderNo: orderNo
		}
		orderCgi.getTicketOrderInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var ticketOrder = ret.data || {};
			var data = {
				ticketOrder: ticketOrder
			}
			main.setContent(supplierTicketOrderDetailView.content(data));
			$("#refuseTicket").off().on("click", refuseTicket);
			$("#showTicketImg").off().on("click", showImage);
			if (isShowImage) {
				$("#showTicketImg").click();
			}
			if (common.isWeixinBrowser()) {
				$("#ticketSelect").off().on('click', chooseImage);
			} else {
				$("#ticketSelect").off().on('change', fileChange);
			}
			$("#prizeSure").off().on('click', sendTicketPrize)
		});
	}

	function refuseTicket() {
		ui.showConfirm("您将放弃此单出票赚钱的机会？", function sure() {
			var options = {
				orderNo: orderNo
			}
			orderCgi.refuseTicket(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('拒绝成功');
				$('#uploadBtn').remove();
				$('#refuseTicket').remove();
			});
		});			
	}

	function showImage() {
		var ticketStatus = parseInt($(this).attr('ticketStatus')) || 0;
		var resourceList = trim($(this).attr('resourceList')) || "";
		if (resourceList) {
			resourceList = resourceList.split('|');	
		}
		closeImage();
		var urls = [];
		var imgHtml = [];
		$.each(resourceList, function(i, url) {
			url = trim(url);
			if (url) {
				urls.push(url);
				imgHtml.push('<img class="img-responsive" src="'+url+'" style="margin-top:20px"/>');	
			}
		});
		var data = {
			ticketStatus: ticketStatus,
			html: imgHtml.join('')
		}
		$("body").append(supplierTicketOrderDetailView.previewImage(data));
		$("#showImg img").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (common.isWeixinBrowser() && urls.length > 0) {
				var current = trim(this.src) || '';
				weixin.call("previewImage", {
					current: current,// 当前显示图片的http链接
					urls: urls// 需要预览的图片http链接列表
				});
			}
		});
		$("#backBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeImage();
		});
		if (common.isWeixinBrowser()) {
			$("#changeBtn").on('click', chooseImage);
		} else {
			$("#changeBtn").on('change', fileChange);
		}
	}
	
	function closeImage() {
		$("#showImg").remove();
	}

	function chooseImage(e) {
		e.preventDefault();
		e.stopPropagation();
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['compressed'], // 可以指定是原图(original)还是压缩图(compressed)，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	var uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	uploadFile.push(localId);
		        });
		        var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				uploadTicketFile = uploadFile;
				uploadImage();
		    }
		});
	}

	function fileChange(e) {
		var uploadFile = [];
		var exts = {"gif": true, "jpg": true, "jpeg": true, "png": true};
		var files = e.target.files || [];
		$.each(files, function(i, file) {
			if (file.type) {
				if (/\bimage\b/i.test(file.type)) {
					uploadFile.push(file);
				}
			} else {
				var fileName = trim(file.name);
				var index = fileName.lastIndexOf(".");
				if(index != -1) {
					var extName = fileName.substr(index + 1).toLowerCase();
					if(exts[extName]) {
						uploadFile.push(file);
					}
				}
				
			}
		});
		var uploadFileLength = uploadFile.length;
		if (uploadFileLength <= 0) {
			return;
		}
		uploadTicketFile = uploadFile;
		uploadImage();
	}
	
	function uploadImage() {
		var uploadLength = uploadTicketFile.length || 0;
		var compressNum = 0;
		var uploadTicket = function(options) {
			if (compressNum != uploadLength) {
				return;
			}
			uploadTicketFile = [];
			ui.closeLoading();
			orderCgi.uploadTicket(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('票样上传成功');
				setTimeout(function() {
					supplierTicketOrderDetail($('#showImg').length != 0)
				}, 1000);
			});
		}
		var data = {
			orderNo: orderNo
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadLength*10*1000;
		}
		ui.showLoading(loadingTime);
		//等图片压缩结束再提交表单
		if (common.isWeixinBrowser()) {
			var submitFile = [];
			$.each(uploadTicketFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitFile.push(serverId);
						if (submitFile.length == uploadLength) {
							data.ticketImg = submitFile;
							uploadTicket(data)
						}
				    }
				});
			});
		} else {
			var submitFile = [];
			$.each(uploadTicketFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitFile.push(rst.file);
					if (submitFile.length == uploadLength) {
						data.ticketImg = submitFile;
						uploadTicket(data);
					}
				});
			});
		}
	}
	
	function sendTicketPrize(e) {
		var ticketPrizeAmount = parseFloat($("#ticketPrizeAmount").val()) || 0;
		if (isNaN(ticketPrizeAmount) || ticketPrizeAmount <= 0) {
			ui.showNotice('输入的中奖金额有误');
			return;
		}
		ui.showConfirm("方案中奖金额：" + "<span class='color_red'>" + ticketPrizeAmount + "</span>", function sure() {
			ticketPrizeAmount = ticketPrizeAmount.toFixed(2) * 100;
			var options = {
				orderNo: orderNo,
				ticketPrizeAmount: ticketPrizeAmount
			}
			orderCgi.sendTicketPrize(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.closeConfirm();
				ui.showNotice('中奖金额录入成功');
				setTimeout(function() {
					supplierTicketOrderDetail()
				}, 1000);
			});
		})
	}
	
});