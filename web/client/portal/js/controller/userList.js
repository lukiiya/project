define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userListView = require('view/userList');
	var groupNo = null;

	function init(view) {
		groupNo = trim(common.getUrlParam("groupNo"));
		common.setHistoryBack('#home');
		setMain(view);
		setContent();
	}

	function _init(view) {
		groupNo = null;
	}

	function setMain(view) {
		var options = {
			title: "专家",
			className: 'expert',
			showHeader: true,
			rightButtonText: '我要申请',
			rightButtonFun: function() {
				common.locationUrl('#userVerify');
			}
		}
		main.setMain(view, options);
		main.setContent(userListView.content());
	}


	function setContent() {
		getGroupList();
	}

	
	function getGroupList() {
		var options = {
			pageNum: 1,
			pageSize: 10	
		}
		userCgi.getGroupList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#groupList").html(userListView.groupList(data));
			var groupItem = $("#groupList .item");
			groupItem.on('click', function(e) {
				$("#groupList .item").removeClass('active');
				$(this).addClass('active');
				var groupNo = trim($(this).attr("groupNo"));
				getUserList(groupNo);
			});
			//默认选中组
			var groupNoIndex = -1;
			groupItem.each(function (i, item) {
				var gNo = trim($(this).attr("groupNo"));
				if (gNo == groupNo) {
					groupNoIndex = i;
					return;
				}
			});
			if (groupNoIndex < 0) {
				groupNoIndex = 0;
			}
			var item = groupItem.eq(groupNoIndex);
			item.click();
			//滚动到相应的tab位置
			var position = item.position();
			$("#groupList").scrollLeft(position.left);
		});
	}

	function getUserList(groupNo) {
		groupNo = trim(groupNo);
		if (!groupNo) {
			return;
		}
		var options = {
			groupNo: groupNo,
			pageNum: 1,
			pageSize: 200
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var length = list.length || 0;
			var offset = 4 - (length % 4);
			if (offset == 4) {
				offset = 0;
			}
			for (var i = 0; i < offset; i++) {
				list.push({nickName: '', profileImg: IMG_PATH + 'user_default.png'});
			}
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#userList").html(userListView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		});
	}
});