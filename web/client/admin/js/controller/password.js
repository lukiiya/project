//收款
define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var passwordView = require('view/password');

	function init(view){
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		var options = {
			title: "修改密码",
			className: 'account'
		}
		main.setMain(view, options);
		main.setContent(passwordView.content());
		$("#passwordSubmit").on('click', passwordSubmit);
	}


	function setContent() {
		
	}

	function passwordSubmit() {
		var oldPassword = trim($("#oldPassword").val()) || '';
		var newPassword = trim($("#newPassword").val()) || '';
		var againNewPassword = trim($("#againNewPassword").val());
		if (!oldPassword) {
			ui.showNotice("旧密码不能为空");
			return;
		}
		if (oldPassword.length < 6) {
			ui.showNotice("旧密码不能小于6位");
			return;
		}
		if (!newPassword) {
			ui.showNotice("新密码不能为空");
			return;
		}
		if (newPassword.length < 6) {
			ui.showNotice("新密码不能小于6位");
			return;
		}
		if (newPassword != againNewPassword) {
			ui.showNotice("新密码两次输入不一致");
			return;
		}
		var data = {
			oldPassword: oldPassword,
			newPassword: newPassword
		}
		adminUserCgi.adminUserModifyPassword(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("密码修改成功");
			setTimeout(function() {
				common.locationUrl('#login');
			}, 1000);
		});
	}
});