define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var smsCgi = require('cgi/sms');
	var userVerifyView = require('view/userVerify');
	var type = null;
	var uploadIdentityFile = null;
	var uploadBusinessFile = null;

	function init(view) {
		type = parseInt(common.getUrlParam("type")) || 1;
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		common.setHistoryBack('#userList');
		setMain(view);
		setContent();
	}

	function _init(view) {
		type = null;
		uploadIdentityFile = null;
		uploadBusinessFile = null;
		clearTimeout(sendSmsCode.timer);
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'apply',
			showHeader: true,
			isUserVerifyHeader: true
		}
		main.setMain(view, options);
		var tabList = $('#userVerifyTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var type = parseInt($(this).attr('type')) || 0;
			if (type == 1) {
				setZhuanjia();
			} else if (type == 2) {
				setZhanzhang();
			}
		});
		//默认选中
		var typeIndex = -1;
		tabList.each(function (i, item) {
			var t = parseInt($(this).attr('type')) || 0;
			if (type == t) {
				typeIndex = i;
				return;
			}
		});
		if (typeIndex < 0) {
			typeIndex = 0;
		}
		tabList.eq(typeIndex).click();
	}


	function setContent() {

	}

	function setZhuanjia() {
		clearTimeout(sendSmsCode.timer);
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		main.setContent(userVerifyView.zhuanjia());
		if (common.isWeixinBrowser()) {
			$("#identitySelectBox,#identitySelectedBox").on('click', chooseImage);
		} else {
			$("#identitySelect,#identitySelected").on('change', fileChange).show();
		}
		$('#smsCodeBtn').on('click', showConfirm);
		$('#userVerifySubmit').on('click', userVerifySubmit);
	}

	function setZhanzhang() {
		clearTimeout(sendSmsCode.timer);
		uploadIdentityFile = [];
		uploadBusinessFile = [];
		main.setContent(userVerifyView.zhanzhang());
		if (common.isWeixinBrowser()) {
			$("#identitySelectBox,#identitySelectedBox,#businessSelectBox,#businessSelectedBox").on('click', chooseImage);
		} else {
			$("#identitySelect,#identitySelected,#businessSelect,#businessSelected").on('change', fileChange).show();
		}
		$('#smsCodeBtn').on('click', showConfirm);
		$('#userVerifySubmit').on('click', userVerifySubmit);
	}

	function userVerifySubmit(e) {
		var type = parseInt($(this).attr('type')) || 0;
		var realName = trim($("#realName").val());
		var phone = trim($("#phone").val());
		var smsCode = trim($('#smsCode').val());
		var remark = trim($("#remark").val());
		var address = trim($("#address").val());
		var uploadIdentityFileLength = uploadIdentityFile.length || 0;
		var uploadBusinessFileLength = uploadBusinessFile.length || 0;
		var protocol = $('#protocol')[0].checked;
		if (type != 1 && type != 2) {
			ui.showNotice("申请类型有误");
			return;	
		} 
		if (realName == "") {
			ui.showNotice("姓名不能为空");
			return;
		}
		if (phone == "") {
			if (type == 1) {
				ui.showNotice("手机号码不能为空");
			} else if (type == 2) {
				ui.showNotice("联系电话不能为空");
			}
			return;
		}
		if (smsCode.length != 6 || /\D/.test(smsCode)) {
			ui.showNotice('输入的验证码有误');
			return;	
		}
		if (uploadIdentityFileLength <= 0) {
			ui.showNotice("请选择身份证正面照片");
			return;	
		}
		if (type == 2 && address == "") {
			ui.showNotice("彩票站点地址不能为空");
			return;
		}
		if (type == 2 && uploadBusinessFileLength <= 0) {
			ui.showNotice("请选择营业执照");
			return;	
		}
		if (type == 1 && remark == "") {
			ui.showNotice("简介不能为空");
			return;
		}
		if (!protocol) {
			if (type == 1) {
				ui.showNotice("请阅读并同意专家协议");
			} else if (type == 2) {
				ui.showNotice("请阅读并同意站长协议");
			}
			return;	
		}
		var compressNum = 0;
		var uploadLength = uploadIdentityFileLength + uploadBusinessFileLength;
		var submitFun = function(options) {
			if (compressNum != uploadLength) {
				return;
			}
			ui.closeLoading();
			userCgi.createUserVerify(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('申请提交成功，请耐心等待审核');
				setTimeout(function() {
					$('#userVerifyTab span.active').eq(0).click();
				}, 1000);
			});
		}
		var data = {
			type: type,
			realName: realName,
			phone: phone,
			code: smsCode,
			remark: remark,
			address: address	
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
			var submitIdentityFile = [];
			$.each(uploadIdentityFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitIdentityFile.push(serverId);
						if (submitIdentityFile.length == uploadIdentityFileLength) {
							data.identityImg = submitIdentityFile;
							submitFun(data);
						}
				    }
				});
			});
			var submitBusinessFile = [];
			$.each(uploadBusinessFile, function(i, localId) {
				weixin.call("uploadImage", {
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 0, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        compressNum++;
						submitBusinessFile.push(serverId);
						if (submitBusinessFile.length == uploadBusinessFileLength) {
							data.businessImg = submitBusinessFile;
							submitFun(data);
						}
				    }
				});
			});
		} else {
			var submitIdentityFile = [];
			$.each(uploadIdentityFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitIdentityFile.push(rst.file);
					if (submitIdentityFile.length == uploadIdentityFileLength) {
						data.identityImg = submitIdentityFile;
						submitFun(data);
					}
				});
			});
			var submitBusinessFile = [];
			$.each(uploadBusinessFile, function(i, file) {
				lrz(file).then(function (rst) {
					compressNum++;
					submitBusinessFile.push(rst.file);
					if (submitBusinessFile.length == uploadBusinessFileLength) {
						data.businessImg = submitBusinessFile;
						submitFun(data);
					}
				});
			});
		}
	}

	function chooseImage(e) {
		var domId = trim(this.id);
		var prefix = '';
        if (/identity/.test(domId)) {
        	prefix = 'identity';
		} else if (/business/.test(domId)) {
			prefix = 'business';
		} else {
			return;	
		}
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['compressed'], // 可以指定是原图(original)还是压缩图(compressed)，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	var uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	imgArr.push('<img class="planpicSmall licensePreview" src="'+ localId +'" prefix="'+prefix+'"/>');
		        	uploadFile.push(localId);
		        });
		        var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				$('#'+prefix+'List').html(imgArr.join(""));
				$('#'+prefix+'List .planpicSmall').on('click', previewImage);
				var fileSelectBoxJQ = $('#'+prefix+'SelectBox');
				var fileSelectedBoxJQ = $('#'+prefix+'SelectedBox');
				if (uploadFileLength > 0) {
					fileSelectBoxJQ.hide();
					fileSelectedBoxJQ.show();	
				} else {
					fileSelectedBoxJQ.hide();
					fileSelectBoxJQ.show();
				}
				if (prefix == 'identity') {
					uploadIdentityFile = uploadFile;
				} else if (prefix == 'business') {
					uploadBusinessFile = uploadFile;
				}
		    }
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var prefix = trim($(this).attr('prefix')) || '';
		var uploadFile = [];
		if (prefix == 'identity') {
			uploadFile = uploadIdentityFile;
		} else if (prefix == 'business') {
			uploadFile = uploadBusinessFile;
		} else {
			return;
		}
		var current = trim($(this).attr('src')) || uploadFile[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: uploadFile// 需要预览的图片http链接列表
		});
	}

	function fileChange(e) {
		var domId = trim(this.id);
		var prefix = '';
        if (/identity/.test(domId)) {
        	prefix = 'identity';
		} else if (/business/.test(domId)) {
			prefix = 'business';
		} else {
			return;	
		}
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
		var imgArr = [];
		var loadNum = 0;
		var readerOnload = function(e) {
			loadNum++;
			imgArr.push('<img class="planpicSmall licensePreview" src="'+ e.target.result +'"/>');
			if (loadNum == uploadFileLength) {
				$('#'+prefix+'List').html(imgArr.join(""));
			}
		}
		$.each(uploadFile, function(i, file) {
			var reader = new FileReader();
			reader.onload = readerOnload;
			reader.readAsDataURL(file);
		});
		var fileSelectBoxJQ = $('#'+prefix+'SelectBox');
		var fileSelectedBoxJQ = $('#'+prefix+'SelectedBox');
		if (uploadFileLength > 0) {
			fileSelectBoxJQ.hide();
			fileSelectedBoxJQ.show();	
		} else {
			fileSelectedBoxJQ.hide();
			fileSelectBoxJQ.show();
		}
		if (prefix == 'identity') {
			uploadIdentityFile = uploadFile;
		} else if (prefix == 'business') {
			uploadBusinessFile = uploadFile;
		}
	}
	
	function sendSmsCode () {
		var mobile = trim($('#phone').val()) || '';
		var code = trim($('#validate').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		var options = {
			mobile: mobile,
			code: code
		}
		smsCgi.sendSmsCode(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			$('#smsCodeBtn').off();
			var count = 60;
			var timer = function() {
				count--;
				if (count > 0) {
					$('#smsCodeBtn').html('倒计时('+count+')');
					sendSmsCode.timer = setTimeout(timer, 1000);	
				} else {
					$('#smsCodeBtn').html('重新获取').on('click', showConfirm);		
				}
			}
			timer();
			closeConfirm();
		});
	}
	
	function showConfirm() {
		var mobile = trim($('#phone').val()) || '';
		if (!common.verifyMobile(mobile)) {
			ui.showNotice('输入的手机号码有误');
			return;
		}
		closeConfirm();
		var data = {
			IMG_PATH: IMG_PATH
		}
		$("#pageContainer").append(userVerifyView.confirm(data));
		$("#sureBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sendSmsCode();
		});
		$("#cancelBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeConfirm();
		});
		getVerificationImg();
		$('#validateImage').on('click', function() {
			getVerificationImg();
		})
	}

	function closeConfirm(){
		$("#confirmBox").remove();
	}
	
	function getVerificationImg() {
		$("#validateImage").attr('src', PROXY + '?c=verificationCode&m=image&_' + new Date().getTime())
	}
});