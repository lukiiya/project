//收款
define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var adminUserCgi = require('cgi/adminUser');
	var loginView = require('view/login');

	function init(view) {
		var unlogin = trim(common.getUrlParam("unlogin")) == 'true' || false;
		if (unlogin) {
			adminUserCgi.adminUserUnlogin();
		}
		setMain(view);
		setContent();
	}

	function _init(view){

	}

	function setMain(view) {
		var options = {
			title: "登录",
			className: 'account'
		}
		main.setMain(view, options);
		main.setContent(loginView.content());
		$("#loginSubmit").on('click', loginSubmit);
	}


	function setContent() {
		
	}

	function loginSubmit() {
		var loginName = trim($("#loginName").val());
		var password = trim($("#password").val());
		if (!loginName) {
			ui.showNotice("帐号不能为空");
			return;
		}
		if (!password) {
			ui.showNotice("密码不能为空");
			return;
		}
		var data = {
			loginName: loginName,
			password: password
		}
		adminUserCgi.adminUserLogin(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var toHash = decodeURIComponent($.trim(common.getUrlParam("toHash")));
            toHash = (toHash && /^#/.test(toHash) && toHash) || "#index";
            ui.clear();
            common.clearCache();
            common.locationUrl(toHash);
		});
	}
});