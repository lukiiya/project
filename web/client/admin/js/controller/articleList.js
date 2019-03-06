define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var articleCgi = require('cgi/article');
	var articleListView = require('view/articleList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title : "资讯列表",
			className :  'article'
		}
		main.setMain(view, options);
		main.setContent(articleListView.content());
		$("#searchSubmit").on('click', searchSubmit);
		$("#createArticle").on('click', editArticle);
	}

	function setContent() {
		getArticleList();
	}

	function searchSubmit() {
		pageNum = 1;
		getArticleList();
	}

	function getArticleList() {
		var articleTitle = trim($("#articleTitle").val()) || null;
		var options = {
			articleTitle: articleTitle,
			pageNum: pageNum,
			pageSize: pageSize
		}
		articleCgi.getArticleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			function imgTag(src, style, className) {
				var img = "<img src='"+src+"' style='"+style+"' class='"+className+"' onload='this.onload=null;parent.$(window.frameElement).after(this);parent.$(window.frameElement).remove()'/>";
				return '<iframe style="display:none" src="javascript:document.write(&quot;'+img+'&quot;)"></iframe>';
			}
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				list[i].articleImg = imgTag(list[i].articleImg, 'width:120px;vertical-align:middle', '');
			}
			var data = {
				list: list
			}
			$("#articleList").html(articleListView.articleList(data));
			$("#articleList .deleteArticle").on('click', deleteArticle);
			$("#articleList .updateArticle").on('click', editArticle);
			$("#articleList .modifySort").on('click', modifySort);
			var top = $("#articleList tr:first-child .modifyUp");
			var bottom = $("#articleList tr:last-child .modifyDown");
			top.remove();
			bottom.remove();
			main.activeTr('articleList');
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
		getArticleList();
	}

	function editArticle() {
		var articleId = parseInt($(this).attr('articleId')) || 0;
		var options = {
			html: articleListView.editArticle({
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
				cgi = 'modifyArticle';
			} else {
				tip = '添加';
				cgi = 'createArticle';
			}
			articleCgi[cgi](options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice(tip + "成功");
				ui.closeWindow();
				getArticleList();
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
			articleCgi.deleteArticle(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('删除成功');
				ui.closeConfirm();
				getArticleList();
			});
		}, function cancel() {

		});
	}

	function modifySort() {
		var articleIdArr = [];
		var type = parseInt($(this).attr('type')) || 0;
		var thisArticleId = parseInt($(this).attr('articleId')) || 0;
		var prevArticleId = parseInt($(this).parent().parent().prev().attr('articleId')) || 0;
		var nextArticleId = parseInt($(this).parent().parent().next().attr('articleId')) || 0;
		if (isNaN(thisArticleId) || isNaN(prevArticleId) || isNaN(nextArticleId) || thisArticleId <= 0) {
			return;
		}
		if (type == 1) {
			articleIdArr.push(prevArticleId, thisArticleId);
		} else if (type == 2) {
			articleIdArr.push(thisArticleId, nextArticleId);
		};
		var data = {
			articleId: articleIdArr
		};
		articleCgi.modifyArticleSort(data, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice("移动成功");
			getArticleList();
		});
	}
})