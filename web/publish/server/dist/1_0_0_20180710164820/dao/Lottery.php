<?php
namespace dao;
class Lottery{
    private $common;

    public function __construct(){
        $this->common = requireModule("Common");
    }

    public function insertLotteryIssue($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        $lotteryName =	trim($param['lotteryName']);
        $drawNumber = trim($param['drawNumber']);
        $drawTime = trim($param['drawTime']);
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $field = array();
        if (!preg_match('/^\d+$/', $issue)) {
            $database->close();
            $resp->msg = 'issue有误';
            return $resp;
        }
        if (!preg_match('/^[A-Z]+$/', $lotteryId)) {
            $database->close();
            $resp->msg = 'lotteryId有误';
            return $resp;
        }
        $rowKey = $lotteryId.$issue;
        $field[] = 'rowKey="'.$database->escape($rowKey).'"';
        if (key_exists('issue', $param)) {
            $field[] = 'issue="'.$database->escape($issue).'"';
        }
        if (key_exists('lotteryId', $param)) {
            $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
        }
        if (key_exists('lotteryName', $param)) {
            $field[] = 'lotteryName="'.$database->escape($lotteryName).'"';
        }
        if (key_exists('drawNumber', $param)) {
            $field[] = 'drawNumber="'.$database->escape($drawNumber).'"';
        }
        if (key_exists('drawTime', $param)) {
            $field[] = 'drawTime="'.$database->escape($drawTime).'"';
        }
        if (key_exists('beginTime', $param)) {
            $field[] = 'beginTime="'.$database->escape($beginTime).'"';
        }
        if (key_exists('endTime', $param)) {
            $field[] = 'endTime="'.$database->escape($endTime).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert t_lottery_issue set '.implode(',', $field);
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '插入失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateLotteryIssue($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        $drawNumber = trim($param['drawNumber']);
        $drawTime = trim($param['drawTime']);
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $detail = trim($param['detail']);
        if (!preg_match('/^\d+$/', $issue)) {
            $database->close();
            $resp->msg = 'issue有误';
            return $resp;
        }
        if (!preg_match('/^[A-Z]+$/', $lotteryId)) {
            $database->close();
            $resp->msg = 'lotteryId有误';
            return $resp;
        }
        $rowKey = $lotteryId.$issue;
        if (key_exists('drawNumber', $param)) {
            $field[] = 'drawNumber="' .$database->escape($drawNumber). '"';
        }
        if (key_exists('drawTime', $param)) {
            $field[] = 'drawTime="' .$database->escape($drawTime). '"';
        }
        if (key_exists('beginTime', $param)) {
            $field[] = 'beginTime="' .$database->escape($beginTime). '"';
        }
        if (key_exists('endTime', $param)) {
            $field[] = 'endTime="' .$database->escape($endTime). '"';
        }
        if (key_exists('detail', $param)) {
            $field[] = 'detail="'.$database->escape($detail).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_lottery_issue set '.implode(',', $field).' where rowKey=' .$database->escape($rowKey). ' limit 1';
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

    public function selectLotteryIssue($param){
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $rowKey = $param['rowKey'];
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        $lotteryName = trim($param['lotteryName']);
        $status = (int)$param['status'];//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
        $orderBy = (int)$param['orderBy'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needDraw = (bool)$param['needDraw'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        $rowKeyReg = '/^[A-Z0-9]+\d+$/';
        if (key_exists('rowKey', $param)) {
            if (is_string($rowKey)) {
                $rowKey = trim($rowKey);
                if (preg_match($rowKeyReg, $rowKey)) {
                    $field[] = 'rowKey="'.$database->escape($rowKey).'"';
                }
            } else if (is_array($rowKey) && count($rowKey) > 0) {
                $rowKeyArr = array();
                foreach ($rowKey as $key) {
                    $key = trim($key);
                    if (preg_match($rowKeyReg, $key)) {
                        $rowKeyArr[] = '"'.$database->escape($key).'"';
                    }
                }
                if (count($rowKeyArr) > 0) {
                    $rowKey = implode(',', $rowKeyArr);
                    $field[] = 'rowKey in('.$rowKey.')';
                }
            }
        }
        if (!empty($issue)) {
            $field[] = 'issue="' . $database->escape($issue) . '"';
        }
        if (!empty($lotteryId)) {
            $field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
        }
        if (!empty($lotteryName)) {
            $field[] = 'lotteryName like "%' . $database->escape($lotteryName) . '%"';
        }
        //1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
        if ($status == 1) {
            $field[] = 'now()<beginTime and drawNumber=""';
        } else if ($status == 2) {
            $field[] = 'now()>=beginTime and now()<endTime and drawNumber=""';
        } else if ($status == 3) {
            $field[] = 'now()>=endTime and drawNumber=""';
        } else if ($status == 4) {
            $field[] = 'now()>=endTime and drawNumber!=""';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        //查询所有彩种近一期
        if ($needDraw) {
            $sql = 'select max(rowKey) as rowKey from t_lottery_issue where ' . $field . ' group by lotteryId';
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $rowKeyArr = array();
            while ($info = $database->get($result)) {
                $rowKeyArr[] = trim($info['rowKey']);
            }
            $database->free($result);
            if (count($rowKeyArr) <= 0) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $column = 'rowKey,issue,lotteryId,lotteryName,drawNumber,drawNumber1,drawNumber2,drawNumber3,drawTime,beginTime,endTime,detail,createTime,lastTime';
            $sql = 'select ' . $column . ' from t_lottery_issue where rowKey in("'.implode('","', $rowKeyArr).'")';
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            while ($info = $database->get($result)) {
                $data['list'][] = $info;
            }
            $database->free($result);
            $database->close();
            $data['totalCount'] = (int)count($data['list']);
            $resp->data = $data;
            $resp->errCode = 0;
            $resp->msg = '成功';
            return $resp;
        }
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_lottery_issue where ' . $field;
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
        $orderByField = 'order by issue desc';
        if ($orderBy == 1) {
            $orderByField = 'order by issue asc';
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit ' . (($pageNum - 1) * $pageSize) . ',' . $pageSize;
        }
        $column = 'rowKey,issue,lotteryId,lotteryName,drawNumber,drawNumber1,drawNumber2,drawNumber3,drawTime,beginTime,endTime,detail,createTime,lastTime';
        $sql = 'select ' . $column . ' from t_lottery_issue where ' . $field . ' '.$orderByField.' ' . $page;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        while ($info = $database->get($result)) {
            $data['list'][] = $info;
        }
        $database->free($result);
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectLotteryById($lotteryId){
        $resp = requireModule('Resp');
        $lotteryId = trim($lotteryId);
        if (empty($lotteryId)) {
            $resp->msg = 'lotteryId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'lotteryId="' . $database->escape($lotteryId) . '"';
        $column = 'lotteryId,lotteryName,sort,sale,publish,remark,createTime,lastTime';
        $sql = 'select ' . $column . ' from t_lottery where discard=0 and ' . $field . ' limit 1';
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

    public function selectLottery($param){
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $lotteryId = trim($param['lotteryId']);
        $lotteryName = trim($param['lotteryName']);
        $sort = (int)$param['sort'];
        $sale = (int)$param['sale'];
        $publish = (int)$param['publish'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (!empty($lotteryId)) {
            $field[] = 'lotteryId="' . $lotteryId . '"';
        }
        if (key_exists('sort', $param)) {
            $field[] = 'sort="'.$database->escape($sort).'"';
        }
        if (key_exists('sale', $param)) {
            $field[] = 'sale="'.$database->escape($sale).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (!empty($lotteryName)) {
            $field[] = 'lotteryName like "%' . $database->escape($lotteryName) . '%"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_lottery where ' . $field;
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
            $page = 'limit ' . (($pageNum - 1) * $pageSize) . ',' . $pageSize;
        }
        $column = 'lotteryId,lotteryName,sort,sale,publish,remark,createTime,lastTime';
        $sql = 'select ' . $column . ' from t_lottery where ' . $field . ' order by sort asc, createTime desc ' . $page;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        while ($info = $database->get($result)) {
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