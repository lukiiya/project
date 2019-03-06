define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var channelCgi = require('cgi/channel');
	var inviteUserListView = require('view/invitation/inviteUserList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 20;
		setMain(view);
		setContent();
	}

	function _init(view) {
		
	}

	function setMain(view) {
		var options = {
			title: "邀请人数",
			className: 'generalize',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);	
		main.setContent(inviteUserListView.content());
	}


	function setContent() {
		getChannelUserList()
	}
	
	function getChannelUserList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		channelCgi.getChannelUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#userList").append(inviteUserListView.userList(data));
			} else {
				$("#userList").html(inviteUserListView.userList(data));
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		getChannelUserList(true);
	}
});