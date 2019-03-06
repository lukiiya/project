define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var ll6UserListView = require('view/ll6UserList');
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
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(ll6UserListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getLl6UserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getLl6UserList();	
	}

	function getLl6UserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var options = {
			userName: userName,
			phone: phone,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getLl6UserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#ll6UserList").html(ll6UserListView.ll6UserList(data));
			$("#ll6UserList").find('[profileImg],[personalImg]').on('click', showImage);
			$("#ll6UserList [remark]").on('click', showRemark);
			main.activeTr('ll6UserList');
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
		getLl6UserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
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
});