#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../include/core.php");

class StatisticsUserDate {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function execute() {
        $resp = $this->setStatisticsUserDate();
        if ($resp->errCode == 0) {
            $this->common->logger->info('用户日期统计成功');
        } else {
            $this->common->logger->info('用户日期统计失败');
        }
    }

    public function setStatisticsUserDate($all = false) {
        $resp = requireModule('Resp');
        $database = requireModule("Database");
        $dateField = 'discard=0';
        if (!$all) {
            $beginTime = date('Y-m-d', time()-9*24*3600);
            $endTime = date('Y-m-d', time()+1*24*3600);
            $dateField .= ' and createTime>="'.$database->escape($beginTime).'" and createTime<"'.$database->escape($endTime).'"';
        }
        //中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $sql = 'select planId,userId,nickName,realName,prizeStatus,costAmount,prizeAmount,createTime from t_plan where '.$dateField;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询方案失败';
            return $resp;
        }
        $planIdArr = array();
        $planMap = array();
        while ($info = $database->get($result)) {
            $planId = (int)$info['planId'];
            $userId = (int)$info['userId'];
            $createTime = trim($info['createTime']);
            $date = date('Y-m-d', strtotime($createTime));
            if ($planId <= 0 || $userId <= 0 || empty($date)) {
                continue;
            }
            $planIdArr[] = $planId;
            $key = $userId.'|'.$date;
            if (!key_exists($key, $planMap)) {
                $planMap[$key] = array();
            }
            $planMap[$key][] = $info;
        }
        $database->free($result);
        $orderCountMap = array('0' => array(), '3' => array());
        //订单状态, 1=未付款, 2=已付款, 3=已退款
        if (count($planIdArr) > 0) {
            $planIdArr = implode(',', $planIdArr);
            //方案
            $dateField = 'discard=0 and orderType=0 and status=2 and planId in('.$database->escape($planIdArr).')';
            $sql = 'select planId,count(*) as count,sum(amount) as amount from t_order where '.$dateField.' group by planId asc';
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询订单失败';
                return $resp;
            }
            while ($info = $database->get($result)) {
                $planId = (int)$info['planId'];
                $count = (int)$info['count'];
                $amount = (int)$info['amount'];
                if ($planId <=0) {
                    continue;
                }
                $orderCountMap['0'][$planId] = array('count' => $count, 'amount' => $amount);
            }
            $database->free($result);
            //跟单
            $dateField = 'discard=0 and orderType=3 and status=2 and planId in('.$database->escape($planIdArr).')';
            $sql = 'select planId,count(*) as count,sum(amount) as amount from t_order where '.$dateField.' group by planId asc';
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询订单失败';
                return $resp;
            }
            while ($info = $database->get($result)) {
                $planId = (int)$info['planId'];
                $count = (int)$info['count'];
                $amount = (int)$info['amount'];
                if ($planId <=0) {
                    continue;
                }
                $orderCountMap['3'][$planId] = array('count' => $count, 'amount' => $amount);
            }
            $database->free($result);
        }
        $sqlArr = array();
        foreach ($planMap as $key => $planList) {
            $arr = explode('|', trim($key));
            if (!is_array($arr) || count($arr) != 2 || !is_array($planList) || count($planList) <= 0) {
                continue;
            }
            $userId = (int)$arr[0];
            $nickName = '';
            $realName = '';
            $date = trim($arr[1]);
            $planCountSum = 0;
            $winPlanCountSum = 0;
            $lostPlanCountSum = 0;
            $waitPlanCountSum = 0;
            $planOrderCountSum = 0;
            $planOrderAmountSum = 0;
            $costAmountSum = 0;
            $prizeAmountSum = 0;
            $planTicketOrderCountSum = 0;
            $planTicketOrderAmountSum = 0;
            foreach ($planList as $plan) {
                $planId = (int)$plan['planId'];
                $nickName = trim($plan['nickName']);
                $realName = trim($plan['realName']);
                $prizeStatus = (int)$plan['prizeStatus'];
                $costAmount = (int)$plan['costAmount'];
                $prizeAmount = (float)$plan['prizeAmount'];
                if ($planId <=0) {
                    continue;
                }
                $planCountSum++;
                if ($prizeStatus == 0) {
                    $waitPlanCountSum++;
                } else if ($prizeStatus == 1) {
                    $winPlanCountSum++;
                } else if ($prizeStatus == 2) {
                    $lostPlanCountSum++;
                }
                //方案订单
                $planOrderArr = (array)$orderCountMap['0'][$planId];
                $planOrderCountSum += (int)$planOrderArr['count'];
                $planOrderAmountSum += (int)$planOrderArr['amount'];
                if ($prizeStatus == 1 || $prizeStatus == 2) {
                    $costAmountSum += $costAmount;
                    $prizeAmountSum += $prizeAmount;
                }
                //出票订单
                $ticketOrderArr = (array)$orderCountMap['3'][$planId];
                $planTicketOrderCountSum += (int)$ticketOrderArr['count'];
                $planTicketOrderAmountSum += (int)$ticketOrderArr['amount'];
            }
            $field = array();
            $field[] = 'userId="'.$database->escape($userId).'"';
            $field[] = 'nickName="'.$database->escape($nickName).'"';
            $field[] = 'realName="'.$database->escape($realName).'"';
            $field[] = 'date="'.$database->escape($date).'"';
            $field[] = 'planCount="'.$database->escape($planCountSum).'"';
            $field[] = 'winPlanCount="'.$database->escape($winPlanCountSum).'"';
            $field[] = 'lostPlanCount="'.$database->escape($lostPlanCountSum).'"';
            $field[] = 'waitPlanCount="'.$database->escape($waitPlanCountSum).'"';
            $field[] = 'planOrderCount="'.$database->escape($planOrderCountSum).'"';
            $field[] = 'planOrderAmount="'.$database->escape($planOrderAmountSum).'"';
            $field[] = 'planCostAmount="'.$database->escape($costAmountSum).'"';
            $field[] = 'planPrizeAmount="'.$database->escape($prizeAmountSum).'"';
            $field[] = 'planTicketOrderCount="'.$database->escape($planTicketOrderCountSum).'"';
            $field[] = 'planTicketOrderAmount="'.$database->escape($planTicketOrderAmountSum).'"';
            $field[] = 'createTime=now()';
            if (count($field) == 0) {
                $database->close();
                $resp->msg = '字段不能为空';
                return $resp;
            }
            $sqlArr[] = 'replace into t_statistics_user_date set '.implode(',', $field);
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $arr = array();
            for ($i = 0, $length = count($sqlArr); $i < $length; $i++) {
                $arr[] = $sqlArr[$i];
                if ($i == $length - 1 || ($i > 0 && ($i % 200) == 0)) {
                    $sql = implode(';', $arr);
                    $result = $database->multiExecute($sql);
                    $database->multiFree();
                    if ($result) {
                        $this->common->logger->info($i.'执行sql成功');
                    } else {
                        $this->common->logger->info($i.'执行sql失败');
                    }
                    $arr = array();
                }
            }
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}
//开始运行
$statisticsUserDate = new StatisticsUserDate();
$statisticsUserDate->execute();