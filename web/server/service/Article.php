<?php
namespace service;
class Article extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Article");
	}

    public function insertArticle($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $articleLink = trim($param['articleLink']);
        if (empty($articleLink)) {
            $resp->msg = 'articleLink有误';
            return $resp;
        }
        $insertArticleResp = $this->dao->insertArticle($param);
        if ($insertArticleResp->errCode != 0) {
            $resp->msg = $insertArticleResp->msg;
            return $resp;
        }
        $resp->data = $insertArticleResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectArticle($param) {
        $resp = requireModule('Resp');
        $selectArticleResp = $this->dao->selectArticle($param);
        if ($selectArticleResp->errCode != 0) {
            $resp->msg = $selectArticleResp->msg;
            return $resp;
        }
        $resp->data = $selectArticleResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateArticle($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $articleId = (int)$param['articleId'];
        if ($articleId <= 0) {
            $resp->msg = "articleId不能为空";
            return $resp;
        }
        $updateArticleResp = $this->dao->updateArticle($param);
        if ($updateArticleResp->errCode != 0) {
            $resp->msg = $updateArticleResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}