define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var userArticleListView = require('view/userArticleList');
	var userId = null;
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		userId = parseInt(common.getUrlParam("userId")) || 0;
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		userId = null;
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "用户文章",
			className :  'user_article'
		}
		main.setMain(view, options);
		main.setContent(userArticleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createArticle").on('click', editArticle);
	}

	function setContent() {
		getUserInfo();
		getUserArticleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserArticleList();
	}

	function getUserArticleList() {
		var articleTitle = trim($("#articleTitle").val()) || null;
		var options = {
			userId: userId,
			articleTitle: articleTitle,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserArticleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			$("#userArticleList").html(userArticleListView.userArticleList(data));
			$("#userArticleList .deleteArticle").on('click', deleteArticle);
			$("#userArticleList .updateArticle").on('click', editArticle);
			main.activeTr('userArticleList');
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
		getUserArticleList();
	}

	function getUserInfo() {
		var options = {
			userId: userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var realName = data.realName;
			var nickName = data.nickName;
			var name = nickName;
			if (realName != '') {
				name += '('+realName+')';
			}
			$('#title').html(name + '-用户文章');
		});
	}

	function editArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		var options = {
			html: userArticleListView.editArticle({
				articleId: articleId
			})
		}
		ui.showWindow(options);
		$("#cancelEditArticle").on('click', function() {
			ui.closeWindow();
		});
		$("#sureEditArticle").on('click', function() {
			var articleId = parseInt($('#articleId').val()) || 0;
			var articleLink = trim($('#articleLink').val()) || '';
			if (articleLink == '') {
				ui.showNotice('文章地址不能为空');
				return;
			}
			var options = {
				articleLink: articleLink
			} 
			var tip = '';
			var cgi = function() {};
			if(!isNaN(articleId) && articleId > 0) {
				tip = '更新';
				options.articleId = articleId;
				cgi = 'modifyUserArticle';
			} else {
				tip = '添加';
				options.userId = userId;
				cgi = 'createUserArticle';
			}
			userCgi[cgi](options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(tip + "成功");
				ui.closeWindow();
				getUserArticleList();
			});
		});
	}

	function deleteArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		if (isNaN(articleId) || articleId <= 0) {
			return;
		}
		ui.showConfirm('是否删除该文章', function sure() {
			var options = {
				articleId: articleId
			}
			userCgi.deleteUserArticle(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getUserArticleList();
			});
		}, function cancel() {

		});
	}

})