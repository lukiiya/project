define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var focusCgi = require('cgi/focus');
	var userCgi = require('cgi/user');
	var focusListView = require('view/focusList');
	var pageNum = null;
	var pageSize = null;
	var isWeixinBrowser = common.isWeixinBrowser()

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		if (isWeixinBrowser) {
			common.setHistoryBack('#home');
		}
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "",
			className: 'attention',
			showHeader: true,
			isFocusHeader: true,
			showFooter: isWeixinBrowser ? true : false
		}
		main.setMain(view, options);
		var tabList = $('#focusTab span');
		tabList.on('click', function(e) {
			tabList.removeClass('active');
			$(this).addClass('active');
			var type = parseInt($(this).attr('type')) || 0;
			if (type == 1) {
				main.setContent(focusListView.focusListBox());
				$('#jumpFocus').on('click', function(e) {
					$('#showNoFocusList').hide();
					$("#noFocusList [userNo]").each(function(i, item) {
						var status = parseInt($(item).attr('status')) || 0;
						if (status == 2) {
							getFocusList();
							return false;
						}
					});
				});
				getFocusList();
			} else if (type == 2) {
				main.setContent(focusListView.userListBox());
				getGroupList();
			}
		});
		tabList.eq(0).click();
	}

	function setContent() {

	}

	function moreList() {
		pageNum++;
		getFocusList(true);
	}

	function getFocusList(append) {
		main.unsetScrollLoad();
		var options = {
			pageNum: pageNum,
			pageSize: pageSize
		}
		focusCgi.getFocusList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			if (list.length == 0) {
				//如果关注列表不存在就显示弹框
				$('#showNoFocusList').show();
				getUserList();
				return;
			}
			$('#showNoFocusList').hide();
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			if (append) {
				$("#focusList").append(focusListView.focusList(data));
			} else {
				$("#focusList").html(focusListView.focusList(data));
			}
			var focusItem = $("#focusList .attention_list_box");
			focusItem.off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	//未关注用户列表
	function getUserList() {
		var options = {
			groupNo: '5F5E103-BC6152',
			pageNum: 1,
			pageSize: 200
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				IMG_PATH: IMG_PATH,
				list: list
			}
			$("#noFocusList").html(focusListView.noFocusList(data));
			$("#noFocusList [userNo]").each(function(i, item) {
				setFoucsStatus.call(item);
			});
		});
	}

	function createFocus(e) {
		var dom = this;
		var userNo = $(dom).attr('userNo') || "";
		if (!userNo) {
			return;
		}
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				$(dom).attr('status', '2');
				setFoucsStatus.call(dom);
			});
		}, function cancel() {

		});	
	}

	function cancelFocus(e) {
		var dom = this;
		var userNo = $(dom).attr('userNo') || "";
		if (!userNo) {
			return;
		}
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				$(dom).attr('status', '1');
				setFoucsStatus.call(dom);
			});	
		}, function cancel() {

		});
	}

	function setFoucsStatus() {
		var status = parseInt($(this).attr('status')) || 0;
		if (status <= 0) {
			return;
		}
		var text = '';
		var className = '';
		var click = null;
		if (status == 1) {
			text = '+关注';
			className = 'attention_focus';
			click = createFocus;
		} else if (status == 2) {
			text = '已关注';
			className = 'attention_focus active';
			click = cancelFocus;
		}
		$(this).attr('class', className).html(text).off().on('click', click);
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
			$("#groupList").html(focusListView.groupList(data));
			var groupItem = $("#groupList .item");
			groupItem.on('click', function(e) {
				$("#groupList .item").removeClass('active');
				$(this).addClass('active');
				var groupNo = trim($(this).attr("groupNo"));
				userList(groupNo);
			});
			var item = groupItem.eq(0);
			item.click();
			//滚动到相应的tab位置
			var position = item.position();
			$("#groupList").scrollLeft(position.left);
		});
	}

	function userList(groupNo) {
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
			$("#userList").html(focusListView.userList(data));
			$("#userList [userNo]").on("click", function(e) {
				var userNo = trim($(this).attr("userNo"));
				if (userNo) {
					common.locationUrl("#userDetail&userNo=" + userNo);
				}
			});
		});
	}
});