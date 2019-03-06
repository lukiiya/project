<?php
namespace dao;
class Sign {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function insertSign($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName =	trim($param['nickName']);
        $realName = trim($param['realName']);
        $amount = (int)$param['amount'];
        $signDate= trim($param['signDate']);
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
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (key_exists('signDate', $param)) {
            $field[] = 'signDate="'.$database->escape($signDate).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert into t_user_sign set '.implode(',', $field);
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

    public function selectSign($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        //查询条件
        $signId = (int)$param['signId'];
        $userId = $param['userId'];
        $signDate = trim($param['signDate']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($signId > 0) {
            $field[] = 'signId="'.$database->escape($signId).'"';
        }
        //用户id
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
        //签到时间
        if ($signDate != '') {
            $field[] = 'signDate="'.$database->escape($signDate).'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_user_sign where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalAmount'] = (int)$info["totalAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $orderBy = 'order by signId desc';
        $sql = 'select signId,userId,nickName,realName,amount,signDate,createTime,lastTime from t_user_sign where '.$field.' '.$orderBy.' '.$page;
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
}