<?php
namespace dao;
class Channel {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function insertChannel($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
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
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert into t_channel set '.implode(',', $field);
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

    public function updateChannel($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $discard = (int)$param['discard'];
        $channel = (int)$param['channel'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $remark = trim($param['remark']);
        if (empty($channel)) {
            $resp->msg = 'channel不能为空';
            return $resp;
        }
        if (key_exists('discard', $param) && ($discard == 0 || $discard == 1)) {
            $field[] = 'discard="' .$database->escape($discard) . '"';
        }
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_channel set '.implode(',', $field).' where channel=' .$channel. ' limit 1';
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

    public function selectChannel($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $channel = (int)$param['channel'];
        $userId = $param['userId'];
        $userName = trim($param['userName']);
        $discard = (int)$param['discard'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        if (key_exists('channel', $param)) {
            $field[] = 'channel="'.$database->escape($channel).'"';
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
                $field[] = 'userId in('.$database->escape($userId).')';
            }
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if (key_exists('discard', $param)) {
            $field[] = 'discard="'.$database->escape($discard).'"';
        }
        $field = implode(' and ', $field);
        if (empty($field)) {
            $field = 1;
        }
        $data = array();
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_channel where '.$field;
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
        $column = 'channel,userId,nickName,realName,remark,createTime,lastTime,discard';
        $sql = 'select '.$column.' from t_channel where '.$field.' order by userId desc '.$page;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        $data['list'] = array();
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
}