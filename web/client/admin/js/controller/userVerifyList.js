define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userVerifyListView = require('view/userVerifyList');
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
			title: "用户审核",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(userVerifyListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getUserVerifyList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserVerifyList();	
	}

	function getUserVerifyList() {
		var userName = trim($('#userName').val()) || null;
		var type = parseInt($('#type').val()) || null;
		var status = parseInt($('#status').val()) || null;
		var options = {
			userName: userName,
			type: type,
			status: status,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserVerifyList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var identityImg = list[i].identityImg || [];
				var businessImg = list[i].businessImg || [];
				var identityImgUrl = [];
				var businessImgUrl = [];
				$.each(identityImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && identityImgUrl.push(url);
				});
				$.each(businessImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && businessImgUrl.push(url);
				});
				list[i].identityImg = identityImgUrl.join('|');
				list[i].businessImg = businessImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#userVerifyList").html(userVerifyListView.userVerifyList(data));
			$("#userVerifyList").find('[identityImg],[businessImg]').on('click', showImage);
			$("#userVerifyList").find('[remark]').on('click', showRemark);
			$("#userVerifyList .verifyUser").on('click', verifyUser);
			main.activeTr('userVerifyList');
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
		getUserVerifyList();
	}

	function showImage() {
		var identityImg = trim($(this).attr('identityImg')) || "";
		var businessImg = trim($(this).attr('businessImg')) || "";
		if (identityImg) {
			identityImg = identityImg.split('|');	
		}
		if (businessImg) {
			businessImg = businessImg.split('|');	
		}
		var imgHtml = [];
		$.each(identityImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(businessImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('</br>')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);	
	}

	function verifyUser() {
		var verifyId = parseInt($(this).attr('verifyId')) || 0;
		var status = parseInt($(this).attr('status')) || 0;
		if (isNaN(verifyId) || verifyId <= 0 || isNaN(status) || status <= 0) {
			return;
		}
		var text = '';
		if (status == 2) {
			text = '是否 "审核" 该用户？'
		} else if (status == 3) {
			text = '是否 "拒绝" 该用户？'
		}
		ui.showConfirm(text, function() {
			var options = {
				verifyId: verifyId,
				status: status
			}
			userCgi.verifyUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('操作处理成功');
				ui.closeConfirm();
				getUserVerifyList();
			});
		});
	}
});