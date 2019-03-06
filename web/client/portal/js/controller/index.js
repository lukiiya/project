define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var indexView = require('view/index');
	var mock = null;

	function init(view) {
		mock = trim(common.getUrlParam("mock")) || "";
		setMain(view);
		setContent();
	}

	function _init(view) {
		mock = null;
	}

	function setMain(view) {
		if (mock == 'user') {
			view.setContent(indexView.mockUser());
			getGroupList();
		} else if (common.isWeixinBrowser() || common.isIosBrowser() || common.isAndroidBrowser()) {
			common.locationUrl("#home");
		} else {
			common.locationUrl("#home");
		}
	}

	function setContent() {

	}

	function getGroupList() {
		var options = {
			pageNum: 1,
			pageSize: 200,
			mock: true
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
			var html = [];
			$.each(list, function(i, item) {
				var groupNo = trim(item.groupNo);
				var name = trim(item.name);
				html.push('<option value="'+groupNo+'">'+name+'</option>');	
			});
			$("#groupId").html(html.join(''));
			$("#groupId").on('change', function(e) {
				var groupNo = trim(this.value);
				getUserList(groupNo);
			});
			getUserList($("#groupId").val());
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
			pageSize: 200,
			mock: true
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			$.each(list, function(i, item) {
				var userNo = trim(item.userNo);
				var tag = trim(item.tag);
				var nickName = trim(item.nickName);
				var realName = trim(item.realName);
				realName = realName ? '('+realName+')' : '';
				html.push('<li><span>用户：'+nickName+realName+'</span>　<span><a userNo="'+userNo+'" href="javascript:;">走起</a></span></li>');	
			});
			$("#userList").html(html.join(''));
			$("#userList a").on('click', function(e){
				var password = trim($("#password").val());
				var userNo = trim($(this).attr('userNo'));
				if (!password) {
					ui.showNotice('请填入密码');
					return;
				}
				var data = {
					password: password,
					userNo: userNo
				}
				mockUser(data, function(ret) {
					if(ret.errCode != 0){
						ui.showNotice(ret.msg);
						return;
					}
					common.clearCache();
					common.locationUrl('./#my', '_blank');
				});
			});
		});
	}

	function mockUser(options, success, fail, sync) {
		var url = "?c=user&m=mockUser";
		var data = {
			password: options.password,
			userNo: options.userNo
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});