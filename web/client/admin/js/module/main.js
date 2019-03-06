define(function(require, exports){

	exports.setMain = setMain;
	exports.setContent = setContent;
	exports.activeTr = activeTr;

	var common = require('module/common');
	var ui = require('module/ui');
	var adminUserCgi = require('cgi/adminUser');
	var mainView = require('view/main');

	function setMain(view, options) {
		var title = options.title || '';
		var className = options.className || '';
		view.setTitle(title);
		if ($("#pageContainer").length > 0) {
			$("#pageContainer").attr("class", "container " + className);
			setAdminUserInfo();
			return;	
		}
		var data = {
			IMG_PATH: IMG_PATH,
			className: className
		}
		view.setContent(mainView.content(data));
		setAdminUserInfo();
	}

	function setContent(html){
		$("#pageContent").html(html);
	}

	function setAdminUserInfo() {
		var hash = common.getLocationHash();
		if (HASH_ENCODE) {
			hash = common.hashDecode(hash);
		}
		hash = hash || "";
		if (/\b(?:login|password)\b/.test(hash)) {
			$('#loginUserInfoBox').hide();
			$('#pageMenu').hide();
			return;
		}
		$('#loginUserInfoBox').show();
		$('#pageMenu').show();
		var options = {
			needSelf: true
		};
		adminUserCgi.getAdminUserInfo(options, function(ret){
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var adminUser = ret.data || {};
			var userName = trim(adminUser.userName) || "";
			$('#loginUserName').html(userName);
		});
		$("#pageHeader [href]").off().on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			var href = trim($(this).attr("href"));
			if (href) {
				common.locationUrl(href);
			}
		});
		setAdminUserMenu();
	}

	function setAdminUserMenu() {
		var options = {
			needSelf: true,
			pageNum: 1,
			pageSize: 500
		}
		adminUserCgi.getAdminUserMenuList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var menuMap = {};
			$.each(list, function(i, item) {
				var parentMenuName = trim(item.parentMenuName) || '';
				if (!parentMenuName) {
					return;
				}
				if (!(parentMenuName in menuMap)) {
					menuMap[parentMenuName] = [];	
				}
				menuMap[parentMenuName].push(item);
			});
			var data = {
				Object: Object,
				menuMap: menuMap
			};
			$("#menuList").html(mainView.menuList(data));
			$("#menuList [href]").on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var href = trim($(this).attr("href"));
				if (href) {
					common.locationUrl(href);
				}
			});
			setMenuActive();
		});
	}

	function setMenuActive() {
		var hash = common.getLocationHash();
		if (HASH_ENCODE) {
			hash = common.hashDecode(hash);
		}
		hash = hash || '#index';
		if (hash == '#index') {
			$("#menuList [href]:first").click();
		}
		$("#menuList [activeHref]").each(function(i, item) {
			var activeHref = $(item).attr("activeHref");
			var activeClass = "active";
			//先移除掉上次的
			$(item).removeClass(activeClass);
			var reg = new RegExp(activeHref, "ig");
			if (reg.test(hash)) {
				$(item).addClass(activeClass);	
			}
		});
	}
	
	//高亮tr
	function activeTr(id) {
		$("#" +id+ " tr").on("click",function(){
			$(this).toggleClass("active");
		})
	}
});