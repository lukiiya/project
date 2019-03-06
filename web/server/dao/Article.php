<?php
namespace dao;
class Article {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

    public function insertArticle ($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        if (key_exists('articleTitle', $param)) {
            $field[] = 'articleTitle="'.$database->escape($articleTitle).'"';
        }
        if (key_exists('articleSource', $param)) {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if (key_exists('articleImg', $param)) {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if (key_exists('articleLink', $param)) {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert into t_article set '.implode(',', $field);
        $result = $database->execute($sql);
        $insertId = 0;
        if (!$result || ($insertId = (int)$database->getInsertId()) <= 0) {
            $database->close();
            $resp->msg = '插入失败';
            return $resp;
        }
        $database->close();
        $resp->data = $insertId;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectArticle($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $articleId = $param['articleId'];
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (is_numeric($articleId)) {
            $articleId = (int)$articleId;
            if ($articleId > 0) {
                $field[] = 'articleId="'.$database->escape($articleId).'"';
            }
        } else if (is_array($articleId)) {
            $articleId = $this->common->filterIdArray($articleId);
            if (count($articleId) > 0) {
                $articleId = implode(',', $articleId);
                $field[] = 'articleId in('.$database->escape($articleId).')';
            }
        }
        if ($articleTitle != '') {
            $field[] = 'articleTitle like "%'.$database->escape($articleTitle).'%"';
        }
        if ($articleSource != '') {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if ($articleImg != '') {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if ($articleLink != '') {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_article where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $orderBy = 'order by sort desc,articleId desc';
        $sql = 'select articleId,articleTitle,articleSource,articleImg,articleLink,sort,createTime,lastTime from t_article where '.$field.' '.$orderBy.' '.$page;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        while($info = $database->get($result)){
            $data['list'][] = $info;
        }
        $database->free($result);
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateArticle ($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $articleId = (int)$param['articleId'];
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        $sort = (int)$param['sort'];
        $discard = (int)$param['discard'];
        if ($articleId <= 0) {
            $database->close();
            $resp->msg = 'articleId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('articleTitle', $param)) {
            $field[] = 'articleTitle="'.$database->escape($articleTitle).'"';
        }
        if (key_exists('articleSource', $param)) {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if (key_exists('articleImg', $param)) {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if (key_exists('articleLink', $param)) {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        if (key_exists('sort', $param)) {
            $field[] = 'sort="'.$database->escape($sort).'"';
        }
        if (key_exists('discard', $param)) {
            $field[] = 'discard="'.$database->escape($discard).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_article set '.implode(',', $field).' where articleId="'.$articleId.'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '更新失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}