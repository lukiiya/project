<?php
namespace controller\admin;
use controller\Base;

class Article extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $articleService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->articleService = requireService("Article");
    }

    public function createArticle() {
        $articleLink = trim($this->common->getParam("articleLink", ''));
        if ($articleLink == '') {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['articleLink'] = $articleLink;
        $selectArticleResp = $this->articleService->selectArticle($param);
        if ($selectArticleResp->errCode != 0){
            $this->resp->msg = "查询文章异常";
            $this->jsonView->out($this->resp);
        }
        if (count($selectArticleResp->data['list']) > 0) {
            $this->resp->msg = "已经添加过此文章";
            $this->jsonView->out($this->resp);
        }
        $html = @file_get_contents($articleLink);
        if ($html == "") {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        preg_match('/<h2[^<>]*?id="activity-name"[^<>]*?>([\s\S]*?)<\/h2>/', $html, $match);
        $articleTitle = trim(strip_tags($match[0]));
        preg_match('/document.write\(["\']([^<>\n\{\}]*)["\']\)/', $articleTitle, $match);
        if (is_array($match) && count($match) == 2) {
            $articleTitle = trim($match[1]);
        }
        preg_match('/<a[^<>]*?id="post-user"[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
        $articleSource = trim(strip_tags($match[0]));
        if (empty($articleSource)) {
            preg_match('/<span[^<>]*?id="profileBt"[^<>]*?>[\s\S]*?<a[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
            if (is_array($match) && count($match) == 2) {
                $articleSource = trim($match[1]);
            }
        }
        preg_match_all('/<img[^<>]*?data-src="([^<>]*?(?:jpeg|png))"[^<>]*?\/?>/', $html, $match);
        $articleImg = '';
        $filterImg = array(
            'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnu4uWc83Q7MQiaalAchlibBu6SkJreQLgzGuEFN27k1lG0v9vkLQbevBxw/0?wx_fmt=jpeg',
            'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnusQ9RNL5Q5Xx6jqYqzHrC359iaxUm5sOnXhGqYS4XBk49A4OmcZib5icqQ/0?wx_fmt=jpeg'
        );
        for ($j = 0, $len = count($match[0]); $j < $len; $j++) {
            $img = trim($match[1][$j]);
            if (!in_array($img, $filterImg)) {
                $articleImg = $img;
                break;
            }
        }
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //t_article表插入
            $insertArticleField = array();
            $insertArticleField[] = 'articleTitle="' . $database->escape($articleTitle) . '"';
            $insertArticleField[] = 'articleSource="' . $database->escape($articleSource) . '"';
            $insertArticleField[] = 'articleImg="' . $database->escape($articleImg) . '"';
            $insertArticleField[] = 'articleLink="' . $database->escape($articleLink) . '"';
            $insertArticleField[] = 'createTime=now()';
            $insertArticleSql = 'insert into t_article set ' . implode(',', $insertArticleField);
            $insertArticleResult = $database->execute($insertArticleSql);
            $insertArticleInsertId = (int)$database->getInsertId();
            if (!$insertArticleResult || $insertArticleInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "插入文章异常";
                $this->jsonView->out($this->resp);
            }
            //t_article表更新
            if ($insertArticleInsertId > 0) {
                $updateArticleSql = 'update t_article set sort="' . $insertArticleInsertId . '" where articleId="' . $insertArticleInsertId . '" and sort=0 limit 1 ';
                $updateArticleResult = $database->execute($updateArticleSql);
                $updateArticleAffectedRows = (int)$database->getAffectedRows();
                if (!$updateArticleResult || $updateArticleAffectedRows != 1) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "更新文章异常";
                    $this->jsonView->out($this->resp);
                }
            }
            $database->execute('commit');
            $database->close();
            $this->resp->errCode = 0;
            $this->resp->msg = "article添加成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
    }

    public function modifyArticle() {
        $articleId = (int)$this->common->getParam("articleId", 0);
        $articleLink = trim($this->common->getParam("articleLink", ''));
        if ($articleLink == '') {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['articleId'] = $articleId;
        $selectArticleResp = $this->articleService->selectArticle($param);
        if ($articleId <= 0 || $selectArticleResp->errCode != 0){
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['articleLink'] = $articleLink;
        $selectArticleResp = $this->articleService->selectArticle($param);
        if ($selectArticleResp->errCode != 0){
            $this->resp->msg = "查询文章异常";
            $this->jsonView->out($this->resp);
        }
        $articleList = (array)$selectArticleResp->data['list'];
        foreach ($articleList as $article) {
            if ($articleLink == $article['articleLink'] && $articleId != $article['articleId']) {
                $this->resp->msg = "已经添加过此文章";
                $this->jsonView->out($this->resp);
                break;
            }
        }
        //爬取数据
        $html = @file_get_contents($articleLink);
        if ($html == "") {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        preg_match('/<h2[^<>]*?id="activity-name"[^<>]*?>([\s\S]*?)<\/h2>/', $html, $match);
        $articleTitle = trim(strip_tags($match[0]));
        preg_match('/document.write\(["\']([^<>\n\{\}]*)["\']\)/', $articleTitle, $match);
        if (is_array($match) && count($match) == 2) {
            $articleTitle = trim($match[1]);
        }
        preg_match('/<a[^<>]*?id="post-user"[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
        $articleSource = trim(strip_tags($match[0]));
        if (empty($articleSource)) {
            preg_match('/<span[^<>]*?id="profileBt"[^<>]*?>[\s\S]*?<a[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
            if (is_array($match) && count($match) == 2) {
                $articleSource = trim($match[1]);
            }
        }
        preg_match_all('/<img[^<>]*?data-src="([^<>]*?(?:jpeg|png))"[^<>]*?\/?>/', $html, $match);
        $articleImg = '';
        $filterImg = array(
            'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnu4uWc83Q7MQiaalAchlibBu6SkJreQLgzGuEFN27k1lG0v9vkLQbevBxw/0?wx_fmt=jpeg',
            'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnusQ9RNL5Q5Xx6jqYqzHrC359iaxUm5sOnXhGqYS4XBk49A4OmcZib5icqQ/0?wx_fmt=jpeg'
        );
        for ($j = 0, $len = count($match[0]); $j < $len; $j++) {
            $img = trim($match[1][$j]);
            if (!in_array($img, $filterImg)) {
                $articleImg = $img;
                break;
            }
        }
        $param = array();
        $param['articleId'] = $articleId;
        $param['articleTitle'] = $articleTitle;
        $param['articleSource'] = $articleSource;
        $param['articleImg'] = $articleImg;
        $param['articleLink'] = $articleLink;
        $updateArticleResp = $this->articleService->updateArticle($param);
        if ($updateArticleResp->errCode != 0) {
            $this->resp->msg = "更新文章失败";
            $this->jsonView->out($this->resp);
        }
        $data = array();
        $data['articleTitle'] = $articleTitle;
        $data['articleSource'] = $articleSource;
        $data['articleImg'] = $articleImg;
        $data['articleLink'] = $articleLink;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function articleList() {
        $articleTitle = trim($this->common->getParam("articleTitle", ''));
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        $param = array();
        if ($articleTitle != null) {
            $param['articleTitle'] = $articleTitle;
        }
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 50) {
            $pageSize = 50;
        }
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectArticleResp = $this->articleService->selectArticle($param);
        if ($selectArticleResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $articleList = $selectArticleResp->data;
        $this->resp->data = $articleList;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
    
    public function deleteArticle() {
        $articleId = (int)$this->common->getParam("articleId", 0);
        $param = array();
        $param['articleId'] = $articleId;
        $selectArticleResp = $this->articleService->selectArticle($param);
        if ($articleId <= 0 || $selectArticleResp->errCode != 0){
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['discard'] = 1;
        $param['articleId'] = $articleId;
        $updateArticleResp= $this->articleService->updateArticle($param);
        if ($updateArticleResp->errCode != 0) {
            $this->resp->msg = "文章删除失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //article移动
    public function modifyArticleSort() {
        $articleId = $this->common->getParam("articleId", null);
        if (empty($articleId)) {
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $articleId = $this->common->filterIdArray($articleId);
        if (!is_array($articleId) || count($articleId) != 2) {
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['articleId'] = $articleId;
        $selectArticle = $this->articleService->selectArticle($param);
        if ($selectArticle->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $articleList = $selectArticle->data['list'];
        if (empty($articleList)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        if (count($articleList) != 2) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        //开启事物
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            $updateArticleField = 'sort="' . $database->escape($articleList[0]['sort']) . '"';
            $updateArticleSql = 'update t_article set ' . $updateArticleField .' where articleId="' . $articleList[1]['articleId'] . '" limit 1';
            $updateArticleResult = $database->execute($updateArticleSql);
            $updateArticleAffectedRows = (int)$database->getAffectedRows();
            if (!$updateArticleResult || $updateArticleAffectedRows != 1) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "更新文章异常";
                $this->jsonView->out($this->resp);
            }
            $updateArticleField = 'sort="' . $database->escape($articleList[1]['sort']) . '"';
            $updateArticleSql = 'update t_article set ' . $updateArticleField . ' where articleId="' .$articleList[0]['articleId'] . '" limit 1';
            $updateArticleResult = $database->execute($updateArticleSql);
            $updateArticleAffectedRows = (int)$database->getAffectedRows();
            if (!$updateArticleResult || $updateArticleAffectedRows != 1) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "更新文章异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            $this->resp->errCode = 0;
            $this->resp->msg = "移动成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
    }
}