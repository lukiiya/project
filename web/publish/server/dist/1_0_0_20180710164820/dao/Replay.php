<?php
namespace dao;
class Replay {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function insertReplay($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $title = trim($param['title']);
        $content = trim($param['content']);
        $resourceId = $param['resourceId'];
        $publish = (int)$param['publish'];
        $remark = trim($param['remark']);
        $field = array();
        if (key_exists('userId', $param)) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('title', $param)) {
            $field[] = 'title="'.$database->escape($title).'"';
        }
        if (key_exists('content', $param)) {
            $field[] = 'content="'.$database->escape($content).'"';
        }
        if (key_exists('resourceId', $param) && is_array($resourceId)) {
            $field[] = 'resourceId="'.$database->escape(implode(',', $this->common->filterIdArray($resourceId))).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert into t_replay set '.implode(',', $field);
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

    public function selectReplay($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $replayId = (int)$param['replayId'];
        $userId = $param['userId'];
        $userName = trim($param['userName']);
        $title = trim($param['title']);
        $publish = (int)$param['publish'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($replayId > 0) {
            $field[] = 'replayId="'.$database->escape($replayId).'"';
        }
        if (is_numeric($userId)) {
            $userId = (int)$userId;
            if ($userId > 0) {
                $field[] = 'userId="'.$database->escape($userId).'"';
            }
        } else if (is_array($userId)) {
            $userId = $this->common->filterIdArray($userId);
            if (count($userId) > 0) {
                $userId = implode(',', $userId);
                $field[] = 'userId in(' . $database->escape($userId) . ')';
            }
        }
        if ($userName != '') {
            $field[] = '(nickName like "%' . $database->escape($userName) . '%" or realName like "%' . $database->escape($userName) . '%")';
        }
        if ($title != '') {
            $field[] = 'title like "%'.$database->escape($title).'%"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_replay where '.$field;
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
        $orderBy = 'order by replayId desc';
        $column = 'replayId,userId,nickName,realName,title,content,resourceId,upCount,downCount,shareCount,readCount,mockReadCount,publish,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_replay where '.$field.' '.$orderBy.' '.$page;
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

    public function selectReplayById($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'replayId="'.$database->escape($replayId).'"';
        $column = 'replayId,userId,nickName,realName,title,content,resourceId,upCount,downCount,shareCount,readCount,mockReadCount,publish,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_replay where discard=0 and '.$field.' limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        $data = $database->get($result);
        $database->free($result);
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateReplayUpCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_replay set upCount=upCount+1 where replayId="'.$replayId.'" limit 1';
        $database->execute($sql);
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateReplayDownCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_replay set downCount=downCount+1 where replayId="'.$replayId.'" limit 1';
        $database->execute($sql);
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateReplayShareCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_replay set shareCount=shareCount+1 where replayId="'.$replayId.'" limit 1';
        $database->execute($sql);
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateReplayReadCount($replayId){
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $mockReadCount = mt_rand(0,9);
        $sql = 'update t_replay set readCount=readCount+1,mockReadCount=mockReadCount+'.$mockReadCount.' where replayId="'.$replayId.'" limit 1';
        $database->execute($sql);
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateReplay($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $replayId = (int)$param['replayId'];
        $title = trim($param['title']);
        $content = trim($param['content']);
        $publish = (int)$param['publish'];
        $remark = trim($param['remark']);
        $resourceId = $param['resourceId'];
        if ($replayId <= 0) {
            $database->close();
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('title', $param)) {
            $field[] = 'title="'.$database->escape($title).'"';
        }
        if (key_exists('content', $param)) {
            $field[] = 'content="'.$database->escape($content).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        if (key_exists('resourceId', $param) && is_array($resourceId)) {
            $field[] = 'resourceId="' .$database->escape(implode(',', $this->common->filterIdArray($resourceId))). '"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_replay set '.implode(',', $field).' where replayId="'.$replayId.'" limit 1';
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

    public function deleteReplay($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_replay set discard=1 where replayId="'.$replayId.'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '删除失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}