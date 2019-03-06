define(function(require, exports){
	exports.getArticleList = getArticleList;
	exports.createArticle = createArticle;
	exports.modifyArticle = modifyArticle;
	exports.deleteArticle = deleteArticle;
	exports.modifyArticleSort = modifyArticleSort;

	var common = require('module/common');

	function getArticleList(options, success, fail, sync) {
		var url = "?p=admin&c=article&m=articleList";
		var data = {
			articleTitle: options.articleTitle,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "get", data, success, fail, sync);
	}

	function createArticle(options, success, fail, sync) {
		var url = "?p=admin&c=article&m=createArticle";
		var data = {
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyArticle(options, success, fail, sync) {
		var url = "?p=admin&c=article&m=modifyArticle";
		var data = {
			articleId: options.articleId,
			articleLink: options.articleLink,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function deleteArticle(options, success, fail, sync) {
		var url = "?p=admin&c=article&m=deleteArticle";
		var data = {
			articleId: options.articleId,
			pageNum: options.pageNum,
			pageSize: options.pageSize
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}

	function modifyArticleSort(options, success, fail, sync) {
		var url = "?p=admin&c=article&m=modifyArticleSort";
		var data = {
			articleId: options.articleId
		};
		common.callCGI(url, "post", data, success, fail, sync);
	}
});