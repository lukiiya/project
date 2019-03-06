define(function(require, exports) {
	
	exports.init = init;
	exports._init = _init;

	require('external/localResizeIMG');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var planCgi = require('cgi/plan');
	var replayCgi = require('cgi/replay');
	var editPlanView = require('view/editPlan');
	var matchType = null;
	var uploadFile = null;
	var tab = null;

	function init(view) {
		matchType = parseInt(common.getUrlParam("matchType")) || 0;
		uploadFile = [];
		common.setHistoryBack('#my');
		setMain(view);
		setContent();
	}

	function _init(view) {
		matchType = null;
		uploadFile = null;
		tab = null;
	}

	function setMain(view) {
		var options = {
			title: "发起推荐",
			className: 'recommend',
			showHeader: true,
			isRecommendHeader: true
		}
		if (window.editPlanSelectMatch) {
			options.rightButtonText = '修改比赛';
			options.rightButtonFun = function() {
				window.matchSelectBettype = getMatchSelectBettype();
				common.locationUrl('#match&type=' + matchType);
			}
		}
		main.setMain(view, options);
	}


	function setContent() {
		setTab();
	}
	
	function setTab() {
		var tabItem = $("#recommendTab span");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			if (tab == 1) {
				$("#pageHeader .rightIcon_top").show();
				var data = {
					JSON: JSON,
					matchList: window.editPlanSelectMatch || []
				}
				main.setContent(editPlanView.recommend(data));
				$("#selectMatch").on('click', function(e) {
					common.locationUrl('#match');
				});
			} else if (tab == 2) {
				window.editPlanSelectMatch = null;
				$("#pageHeader .rightIcon_top").hide();
				main.setContent(editPlanView.replay());
			}
			$("#editSubmit").on('click', editSubmit);
			if (common.isWeixinBrowser()) {
				$("#fileSelectBox,#fileSelectedBox").on('click', chooseImage);
			} else {
				$("#fileSelect,#fileSelected").on('change', fileChange).show();
			}
			getPlanPrice();	
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab"));
			if (t == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}
	
	function getPlanPrice() {
		var options = {}
		planCgi.getPlanPrice(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data || [];
			var data = {
				list: list
			}
			$("#amountList").html(editPlanView.amountList(data));
			var amountItem = $("#amountList [amount]");
			amountItem.on("click", function(e) {
				amountItem.removeClass("active");
				$(this).addClass("active");
				var amount = parseInt($(this).attr("amount")) || 0;
				if (!isNaN(amount) && amount >= 0) {
					$("#amount").val(amount);
				} else {
					$("#amount").val("");	
				}
			});
		});
	}

	function getMatchSelectBettype() {
		var selectMatch = null;
		var matchList = window.editPlanSelectMatch || []
		$.each(matchList, function(i, item) {
			var match = item.match || {};
			var odds = item.odds || {};
			var recommend = item.recommend || [];
			var matchId = match.matchId || 0;
			var oddsId = odds.oddsId || 0;
			if (matchId <= 0 || oddsId <= 0 || !recommend || recommend.length <= 0) {
				return;
			}
			if (!selectMatch) {
				selectMatch = {};
			}
			selectMatch[matchId] = {
				oddsId: oddsId,
				recommend: recommend	
			}
		});
		return selectMatch && {selectMatch: selectMatch} || null;
	}

	function chooseImage(e) {
		weixin.call("chooseImage", {
		    count: 1, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		    	uploadFile = [];
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        var imgArr = [];
		        $.each(localIds, function(i, localId) {
		        	imgArr.push('<img class="planpicSmall img-responsive" src="'+ localId +'" />');
		        	uploadFile.push(localId);
		        });
				$('#fileList').html(imgArr.join(""));
				$('#fileList .planpicSmall').on('click', previewImage);
				var uploadFileLength = uploadFile.length;
				if (uploadFileLength <= 0) {
					return;
				}
				var fileSelectBoxJQ = $('#fileSelectBox');
				var fileSelectedBoxJQ = $('#fileSelectedBox');
				if (uploadFileLength > 0) {
					fileSelectBoxJQ.hide();
					fileSelectedBoxJQ.show();	
				} else {
					fileSelectedBoxJQ.hide();
					fileSelectBoxJQ.show();
				}
		    }
		});
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var current = trim($(this).attr('src')) || uploadFile[0] || '';
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: uploadFile// 需要预览的图片http链接列表
		});
	}

	function fileChange(e) {
		uploadFile = [];
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
			imgArr.push('<img class="planpicSmall" src="'+ e.target.result +'" />');
			if (loadNum == uploadFileLength) {
				$('#fileList').html(imgArr.join(""));
			}
		}
		$.each(uploadFile, function(i, file) {
			var reader = new FileReader();
			reader.onload = readerOnload;
			reader.readAsDataURL(file);
		});
		var fileSelectBoxJQ = $('#fileSelectBox');
		var fileSelectedBoxJQ = $('#fileSelectedBox');
		if (uploadFileLength > 0) {
			fileSelectBoxJQ.hide();
			fileSelectedBoxJQ.show();	
		} else {
			fileSelectedBoxJQ.hide();
			fileSelectBoxJQ.show();
		}
	}

	function editSubmit() {
		var matchRecommend = trim($("#matchRecommend").val());
		var title = trim($("#title").val());
		var content = trim($("#content").val());
		var amount = parseInt($("#amount").val());
		var uploadFileLength = uploadFile.length;
		if (tab == 1) {
			if (matchType <= 0) {
				ui.showNotice("赛事类型有误");
				return;	
			}
			if (matchRecommend == "") {
				ui.showNotice("请选择赛事");
				return;
			}
			if (uploadFileLength <= 0) {
				if (content == "" || content.length < 50) {
					ui.showNotice("分析文字不能少于50个字");
					return;
				}
			}
			if (isNaN(amount) || amount < 0) {
				ui.showNotice("请选择方案定价");
				return;
			}
		} else if (tab == 2) {
			if (title == "" || title.length < 5) {
				ui.showNotice("标题不能少于5个字");
				return;
			}
			if (uploadFileLength <= 0) {
				ui.showNotice("请上传图片");
			}
			if (content == "" || content.length == 0) {
				ui.showNotice("复盘文字不能为空");
				return;
			}
		}

		var submitFun = function(options) {
			ui.closeLoading();
			if (tab == 1) {
				planCgi.createPlan(options, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					var data = ret.data || {};
					var planNo = trim(data.planNo);
					if (!planNo) {
						ui.showNotice('方案生成异常');
						return;
					}
					ui.showNotice('推荐发布成功');
					setTimeout(function(){
						common.locationUrl('#planDetail&planNo='+planNo);
					}, 1000);
				});
			} else if (tab == 2) {
				replayCgi.createReplay(options, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					var data = ret.data || {};
					var replayNo = trim(data.replayNo);
					if (!replayNo) {
						ui.showNotice('复盘生成异常');
						return;
					}
					ui.showNotice('复盘发布成功');
					setTimeout(function(){
						common.locationUrl('#replayDetail&replayNo='+replayNo);
					}, 1000);
				});
			}
		}
		var data;
		if (tab == 1) {
			data = {
				matchRecommend: matchRecommend,
				content: content,
				amount: amount,
				matchType: matchType,
				title: title
			}
		} else if (tab == 2) {
			data = {
				title: title,
				content: content
			}
		}
		//等待图标自动关闭超时
		var loadingTime = 10*1000;
		if (uploadFileLength > 0) {
			//一张图片10秒压缩
			loadingTime = uploadFileLength*10*1000;
		}
		ui.showLoading(loadingTime);
		if (uploadFileLength > 0) {
			//存在上传图片，就等图片压缩结束再提交表单
			var submitFile = [];
			var compressNum = 0;
			if (common.isWeixinBrowser()) {
				for (var i = 0; i < uploadFileLength; i++) {
					var localId = trim(uploadFile[i]);
					weixin.call("uploadImage", {
					    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
					    isShowProgressTips: 0, // 默认为1，显示进度提示
					    success: function (res) {
					        var serverId = res.serverId; // 返回图片的服务器端ID
					        compressNum++;
							submitFile.push(serverId);
							if (compressNum == uploadFileLength) {
								data.file = submitFile;
								submitFun(data);
							}
					    }
					});
				}
			} else {
				$.each(uploadFile, function(i, file) {
					lrz(file).then(function (rst) {
						compressNum++;
						submitFile.push(rst.file);
						if (compressNum == uploadFileLength) {
							data.file = submitFile;
							submitFun(data);
						}
					});
				});
			}
		} else {
			submitFun(data);
		}
		window.matchSelectBettype = null;
		window.editPlanSelectMatch = null;
	}
});