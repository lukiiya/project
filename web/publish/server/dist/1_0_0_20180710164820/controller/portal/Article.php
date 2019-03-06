<?php
namespace controller\portal;
use controller\Base;

class Article extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $articleService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->articleService = requireService("Article");
	}

    public function articleList() {
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 20) {
            $pageSize = 20;
        }
        $param = array();
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $selectArticleResp = $this->articleService->selectArticleCache($param);
        if ($selectArticleResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $articleList = $selectArticleResp->data;
        foreach ($articleList['list'] as &$article) {
            $article['articleTitle'] = preg_replace('/&[a-zA-Z]*;/', '', $article['articleTitle']);
        }
        $this->resp->data = $articleList;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}