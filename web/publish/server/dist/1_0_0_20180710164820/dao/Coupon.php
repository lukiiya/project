<?php
namespace dao;
class Coupon {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function insertCoupon($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $financeType = (int)$param['financeType'];
        $couponType = (int)$param['couponType'];
        $amount = (int)$param['amount'];
        $expiredTime = (int)$param['expiredTime'];
        $rule = trim($param['rule']);
        $remark = trim($param['remark']);
        $field = array();
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$database->escape($financeType).'"';
        }
        if (key_exists('couponType', $param)) {
            $field[] = 'couponType="'.$database->escape($couponType).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (key_exists('expiredTime', $param)) {
            $field[] = 'expiredTime="'.$database->escape($expiredTime).'"';
        }
        if (key_exists('rule', $param)) {
            $field[] = 'rule="'.$database->escape($rule).'"';
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
        $sql = 'insert into t_coupon set '.implode(',', $field);
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

    public function updateCoupon($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $couponId = (int)$param['couponId'];
        $financeType = (int)$param['financeType'];
        $couponType = (int)$param['couponType'];
        $amount = (int)$param['amount'];
        $expiredTime = (int)$param['expiredTime'];
        $rule = trim($param['rule']);
        $remark = trim($param['remark']);
        if ($couponId <= 0) {
            $database->close();
            $resp->msg = 'couponId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$database->escape($financeType).'"';
        }
        if (key_exists('couponType', $param)) {
            $field[] = 'couponType="'.$database->escape($couponType).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (key_exists('expiredTime', $param)) {
            $field[] = 'expiredTime="'.$database->escape($expiredTime).'"';
        }
        if (key_exists('rule', $param)) {
            $field[] = 'rule="'.$database->escape($rule).'"';
        }
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_coupon set '.implode(',', $field).' where couponId="'.$couponId.'" limit 1';
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

    public function selectCouponById($couponId) {
        $resp = requireModule('Resp');
        $couponId = (int)$couponId;
        if ($couponId <= 0) {
            $resp->msg = 'couponId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'couponId="'.$database->escape($couponId).'"';
        $column = 'couponId,financeType,couponType,amount,expiredTime,rule,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_coupon where discard=0 and '.$field.' limit 1';
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

    public function selectCoupon($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $couponId = $param['couponId'];
        $financeType = (int)$param['financeType'];
        $couponType = (int)$param['couponType'];
        $amount = (int)$param['amount'];
        $expiredTime = (int)$param['expiredTime'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (is_array($couponId)) {
            $couponId = $this->common->filterIdArray($couponId);
            if (count($couponId) > 0) {
                $field[] = 'couponId in('.implode(',', $couponId).')';
            }
        } else if (is_numeric($couponId)) {
            $couponId = (int)$couponId;
            if ($couponId > 0) {
                $field[] = 'couponId="'.$couponId.'"';
            }
        }
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$financeType.'"';
        }
        if ($couponType > 0) {
            $field[] = 'couponType="'.$couponType.'"';
        }
        if ($amount > 0) {
            $field[] = 'amount="'.$amount.'"';
        }
        if ($expiredTime > 0) {
            $field[] = 'expiredTime="'.$expiredTime.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_coupon where '.$field;
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
        $orderBy = 'order by couponId desc';
        $column = 'couponId,financeType,couponType,amount,expiredTime,rule,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_coupon where '.$field.' '.$orderBy.' '.$page;
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

    public function insertUserCoupon($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $couponId = (int)$param['couponId'];
        $financeType = (int)$param['financeType'];
        $couponType = (int)$param['couponType'];
        $couponSource = (int)$param['couponSource'];
        $amount = (int)$param['amount'];
        $rule = trim($param['rule']);
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $status = (int)$param['status'];
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
        if (key_exists('couponId', $param)) {
            $field[] = 'couponId="'.$database->escape($couponId).'"';
        }
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$database->escape($financeType).'"';
        }
        if (key_exists('couponType', $param)) {
            $field[] = 'couponType="'.$database->escape($couponType).'"';
        }
        if (key_exists('couponSource', $param)) {
            $field[] = 'couponSource="'.$database->escape($couponSource).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (key_exists('rule', $param)) {
            $field[] = 'rule="'.$database->escape($rule).'"';
        }
        if (key_exists('beginTime', $param)) {
            $field[] = 'beginTime="'.$database->escape($beginTime).'"';
        }
        if (key_exists('endTime', $param)) {
            $field[] = 'endTime="'.$database->escape($endTime).'"';
        }
        if (key_exists('status', $param)) {
            $field[] = 'status="'.$database->escape($status).'"';
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
        $sql = 'insert into t_user_coupon set '.implode(',', $field);
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

    public function selectUserCoupon($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userCouponId = $param['userCouponId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $couponId = $param['couponId'];
        $financeType = (int)$param['financeType'];
        $couponType = (int)$param['couponType'];
        $couponSource = (int)$param['couponSource'];
        $amount = (int)$param['amount'];
        $status = $param['status'];
        $state = (int)$param['state']; //优惠券状态 1:可用, 2:待派发, 3:已用/过期
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $justCount = (bool)$param['justCount'];
        $field = array();
        $field[] = 'discard=0';
        if (is_array($userCouponId)) {
            $userCouponId = $this->common->filterIdArray($userCouponId);
            if (count($userCouponId) > 0) {
                $field[] = 'userCouponId in('.implode(',', $userCouponId).')';
            }
        } else if (is_numeric($userCouponId)) {
            $userCouponId = (int)$userCouponId;
            if ($userCouponId > 0) {
                $field[] = 'userCouponId="'.$userCouponId.'"';
            }
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if (is_array($couponId)) {
            $couponId = $this->common->filterIdArray($couponId);
            if (count($couponId) > 0) {
                $field[] = 'couponId in('.implode(',', $couponId).')';
            }
        } else if (is_numeric($couponId)) {
            $couponId = (int)$couponId;
            if ($couponId > 0) {
                $field[] = 'couponId="'.$couponId.'"';
            }
        }
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$financeType.'"';
        }
        if (key_exists('couponType', $param)) {
            $field[] = 'couponType="'.$couponType.'"';
        }
        if (is_array($couponSource)) {
            $couponSource = $this->common->filterNumArray($couponSource);
            if (count($couponSource) > 0) {
                $field[] = 'couponSource in('.implode(',', $couponSource).')';
            }
        } else if (is_numeric($couponSource)) {
            $couponSource = (int)$couponSource;
            if (key_exists('couponSource', $param)) {
                $field[] = 'couponSource="'.$couponSource.'"';
            }
        }
        if ($amount > 0) {
            $field[] = 'amount="'.$amount.'"';
        }
        if (is_array($status)) {
            $status = $this->common->filterIdArray($status);
            if (count($status) > 0) {
                $field[] = 'status in('.implode(',', $status).')';
            }
        } else if (is_numeric($status)) {
            $status = (int)$status;
            if ($status > 0) {
                $field[] = 'status="'.$status.'"';
            }
        }
        if ($state == 1) {
            $field[] = '(status=1 and now()>=beginTime and now()<=endTime)';
        } else if ($state == 2) {
            $field[] = '(status=1 and now()<beginTime)';
        } else if ($state == 3) {
            $field[] = '(status=2 or now()>endTime)';
        }
        if ($endTime != '') {
            $endTime = strtotime($endTime);
            $endTime = date('Y-m-d', $endTime + 3600 * 24);
        }
        if ($beginTime != '' && $endTime != '') {
            $field[] = 'createTime>="'.$database->escape($beginTime).'" and createTime<"'.$database->escape($endTime).'"';
        } else if ($beginTime != '') {
            $field[] = 'createTime>="'.$database->escape($beginTime).'"';
        } else if ($endTime != '') {
            $field[] = 'createTime<"'.$database->escape($endTime).'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount || $justCount) {
            $sql = 'select count(*) as totalCount from t_user_coupon where '.$field;
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
        if (!$justCount) {
            $page = '';
            if ($pageNum > 0 && $pageSize > 0) {
                $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
            }
            $orderBy = 'order by beginTime asc, amount desc, userCouponId desc';
            $column = 'userCouponId,userId,nickName,realName,couponId,financeType,couponType,couponSource,amount,rule,beginTime,endTime,status,remark,createTime,lastTime';
            $sql = 'select '.$column.' from t_user_coupon where '.$field.' '.$orderBy.' '.$page;
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
        }
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectUserCouponById($userCouponId) {
        $resp = requireModule('Resp');
        $userCouponId = (int)$userCouponId;
        if ($userCouponId <= 0) {
            $resp->msg = 'userCouponId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'userCouponId="'.$database->escape($userCouponId).'"';
        $column = 'userCouponId,userId,nickName,realName,couponId,financeType,couponType,couponSource,amount,rule,beginTime,endTime,status,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_user_coupon where discard=0 and '.$field.' limit 1';
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
}