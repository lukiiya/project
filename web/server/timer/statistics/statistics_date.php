#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../include/core.php");

class StatisticsDate {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function execute() {
       /* $date = '2016-07-01';
        $today = date('Y-m-d');
        while($date <= $today) {
            $this->setStatisticsDate($date);
            $date = date('Y-m-d', strtotime($date)+3600*24);
            sleep(1);
        }
        $this->common->logger->info('日期统计完成');*/
        $date = date('Y-m-d');
        $dateTime = date('Y-m-d H:i:s');
        $beginTime = $date.' 03:00:00';
        $endTime = $date.' 04:00:00';
        if ($dateTime >= $beginTime && $dateTime <= $endTime) {
            //在凌晨3点-4点时候，再次更新昨天数据，确保数据完善
            $yesterdayDate = date('Y-m-d', strtotime($date)-3600*24);
            $resp = $this->setStatisticsDate($yesterdayDate);
            if ($resp->errCode == 0) {
                $this->common->logger->info('昨天统计成功');
            } else {
                $this->common->logger->info('昨天统计失败');
            }
        }
        $resp = $this->setStatisticsDate($date);
        if ($resp->errCode == 0) {
            $this->common->logger->info('日期统计成功');
        } else {
            $this->common->logger->info('日期统计失败');
        }
    }

    private function setStatisticsDate($date) {
        $resp = requireModule('Resp');
        $date = trim($date);
        if (empty($date)) {
            $resp->msg = '日期参数错误';
            return $resp;
        }
        //大一天
        $upDate = date('Y-m-d', strtotime($date)+3600*24);
        $database = requireModule("Database");
        //查询套餐
        $sql = 'select * from t_combo where discard=0';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询套餐失败';
            return $resp;
        }
        $comboMap = array();
        while ($info = $database->get($result)) {
            $comboId = (int)$info['comboId'];
            if ($comboId <= 0) {
                continue;
            }
            $comboMap[$comboId] = $info;
        }
        $database->free($result);
        //查询截止到当天绑定手机用户
        $sql = 'select count(*) as count from t_user where discard=0 and createTime<"'.$upDate.'" and phone !=""';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天绑定手机用户失败';
            return $resp;
        }
        $curMobileUserData = $database->get($result);
        $curMobileUserCount = (int)$curMobileUserData['count'];
        $database->free($result);
        //查询截止到当天用户消费金额
        $sql = 'select userId,sum(amount) as amount from t_finance_consume where discard=0 and financeType=0 and createTime<"'.$upDate.'" group by userId';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天用户消费金额失败';
            return $resp;
        }
        $consumeMap = array();
        while ($info = $database->get($result)) {
            $userId = (int)$info['userId'];
            $amount = (int)$info['amount'];
            if ($userId <= 0) {
                continue;
            }
            $consumeMap[$userId] = $amount;
        }
        $database->free($result);
        //查询截止到当天用户平台赠送金额
        $sql = 'select userId,sum(amount) as amount from t_finance_charge where discard=0 and financeType=0 and createTime<"'.$upDate.'" and type=2 group by userId';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天用户平台赠送金额失败';
            return $resp;
        }
        $performChargeMap = array();
        while ($info = $database->get($result)) {
            $userId = (int)$info['userId'];
            $amount = (int)$info['amount'];
            if ($userId <= 0) {
                continue;
            }
            $performChargeMap[$userId] = $amount;
        }
        $database->free($result);
        /****************************************************** 统计当天 **************************************************************/
        //查询当天用户
        $sql = 'select count(*) as count from t_user where discard=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天用户失败';
            return $resp;
        }
        $userData = $database->get($result);
        $userCount = (int)$userData['count'];
        $database->free($result);
        //查询昨天绑定手机用户
        $yesterdayDate = date('Y-m-d', strtotime($date)-3600*24);
        $sql = 'select mobileUserCountEnd from t_statistics_date where discard=0 and date="'.$database->escape($yesterdayDate).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询昨天绑定手机用户失败';
            return $resp;
        }
        $yesterdayMobileUserData = $database->get($result);
        $yesterdayMobileUserCount = (int)$yesterdayMobileUserData['mobileUserCountEnd'];
        $database->free($result);
        $mobileUserCount = $curMobileUserCount - $yesterdayMobileUserCount;
        /*//查询当天红包活动
        $sql = 'select count(*) as count from t_activity_hongbao where discard=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天红包活动失败';
            return $resp;
        }
        $hongbaoData = $database->get($result);
        $hongbaoCount = (int)$hongbaoData['count'];
        $database->free($result);
        $mobileUserCount = $hongbaoCount;*/
        //查询当天消费人数
        $sql = 'select userId from t_finance_consume where discard=0 and financeType=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'" group by userId';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天方案失败';
            return $resp;
        }
        $userIdArr = array();
        while ($info = $database->get($result)) {
            $userId = (int)$info['userId'];
            if ($userId <= 0) {
                continue;
            }
            $userIdArr[] = $userId;
        }
        $consumeUserCount = 0;
        $cashConsumeUserCount = 0;
        $database->free($result);
        foreach ($userIdArr as $userId) {
            $userId = (int)$userId;
            $consume = (int)$consumeMap[$userId];
            $performCharge = (int)$performChargeMap[$userId];
            if ($userId <= 0) {
                continue;
            }
            $consumeUserCount++;
            if ($consume > $performCharge) {
                $cashConsumeUserCount++;
            }
        }
        //查询当天方案
        $sql = 'select count(*) as count from t_plan where discard=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天方案失败';
            return $resp;
        }
        $planData = $database->get($result);
        $planCount = (int)$planData['count'];
        $database->free($result);
        //查询当天订单
        $sql = 'select * from t_order where discard=0 and status=2 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天订单失败';
            return $resp;
        }
        $orderCount = 0;
        $orderAmount = 0;
        $planOrderCount = 0;
        $planOrderAmount = 0;
        $chargeOrderCount = 0;
        $chargeOrderAmount = 0;
        $jxzpOrderCount = 0;
        $jxzpOrderAmount = 0;
        while ($info = $database->get($result)) {
            $orderId = (int)$info['orderId'];
            $comboId = (int)$info['comboId'];
            $orderType = (int)$info['orderType'];
            $amount = (int)$info['amount'];
            if ($orderId <= 0) {
                continue;
            }
            $orderCount++;
            $orderAmount += $amount;
            //订单类型, 0=方案订单, 1=充值订单, 2=套餐订单
            if ($orderType == 0) {
                $planOrderCount++;
                $planOrderAmount += $amount;
            } else if ($orderType == 1) {
                $chargeOrderCount++;
                $chargeOrderAmount += $amount;
            } else if ($orderType == 2 && key_exists($comboId, $comboMap) && !empty($comboMap[$comboId])) {
                $comboType = (int)$comboMap[$comboId]['comboType'];
                if ($comboType == 1) {
                    $jxzpOrderCount++;
                    $jxzpOrderAmount += $amount;
                }
            }
        }
        $database->free($result);
        //查询当天流水记录
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_record where discard=0 and financeType=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天流水记录失败';
            return $resp;
        }
        $consumeCount = 0;
        $consumeAmount = 0;
        $incomeCount = 0;
        $incomeAmount = 0;
        $chargeCount = 0;
        $chargeAmount = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=消费, 2=收益, 3=提款, 4=充值
            if ($type == 1) {
                $consumeCount += $count;
                $consumeAmount += $amount;
            } else if ($type == 2) {
                $incomeCount += $count;
                $incomeAmount += $amount;
            } else if ($type == 4) {
                $chargeCount += $count;
                $chargeAmount += $amount;
            }
        }
        $database->free($result);
        //查询当天消费
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_consume where discard=0 and financeType=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天消费失败';
            return $resp;
        }
        $cashConsumeCount = 0;
        $cashConsumeAmount = 0;
        $chargeConsumeCount = 0;
        $chargeConsumeAmount = 0;
        $incomeConsumeCount = 0;
        $incomeConsumeAmount = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=现金消费, 2=充值消费, 3=收益消费
            if ($type == 1) {
                $cashConsumeCount += $count;
                $cashConsumeAmount += $amount;
            } else if ($type == 2) {
                $chargeConsumeCount += $count;
                $chargeConsumeAmount += $amount;
            } else if ($type == 3) {
                $incomeConsumeCount += $count;
                $incomeConsumeAmount += $amount;
            }
        }
        $database->free($result);
        //查询当天收益
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天收益失败';
            return $resp;
        }
        $recommendIncomeCount = 0;
        $recommendIncomeAmount = 0;
        $spreadIncomeCount = 0;
        $spreadIncomeAmount = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=推荐收益, 2=推广收益
            if ($type == 1) {
                $recommendIncomeCount += $count;
                $recommendIncomeAmount += $amount;
            } else if ($type == 2) {
                $spreadIncomeCount += $count;
                $spreadIncomeAmount += $amount;
            }
        }
        $database->free($result);
        //查询当天提款
        //status：1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
        $sql = 'select * from t_finance_withdraw where discard=0 and financeType=0 and status in(1,2,3,5) and date_format(lastTime,"%Y-%m-%d")="'.$database->escape($date).'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天提款失败';
            return $resp;
        }
        $withdrawingCount = 0;
        $withdrawingAmount = 0;
        $withdrewCount = 0;
        $withdrewAmount = 0;
        while ($info = $database->get($result)) {
            $status = (int)$info['status'];
            $amount = (int)$info['amount'];
            if ($status <= 0) {
                continue;
            }
            //1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
            if ($status == 1 || $status == 2 || $status == 5) {
                $withdrawingCount++;
                $withdrawingAmount += $amount;
            } else if ($status == 3) {
                $withdrewCount++;
                $withdrewAmount += $amount;
            }
        }
        $database->free($result);
        //查询当天充值
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_charge where discard=0 and financeType=0 and date_format(createTime,"%Y-%m-%d")="'.$database->escape($date).'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询当天充值失败';
            return $resp;
        }
        $userChargeCount = 0;
        $userChargeAmount = 0;
        $platformChargeCount = 0;
        $platformChargeAmount = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=用户充值, 2=平台充值
            if ($type == 1) {
                $userChargeCount += $count;
                $userChargeAmount += $amount;
            } else if ($type == 2) {
                $platformChargeCount += $count;
                $platformChargeAmount += $amount;
            }
        }
        $database->free($result);
        /****************************************************** 统计截止到当天 **************************************************************/
        //查询截止到当天用户
        $sql = 'select count(*) as count from t_user where discard=0 and createTime<"'.$upDate.'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天用户失败';
            return $resp;
        }
        $userData = $database->get($result);
        $userCountEnd = (int)$userData['count'];
        $database->free($result);
        //查询截止到当天绑定手机用户
        $mobileUserCountEnd = $curMobileUserCount;
        //截止到当天消费人数
        $consumeUserCountEnd = 0;
        //截止到当天现金消费人数
        $cashConsumeUserCountEnd = 0;
        foreach ($consumeMap as $userId => $consume) {
            $userId = (int)$userId;
            $consume = (int)$consume;
            $performCharge = (int)$performChargeMap[$userId];
            if ($userId <= 0) {
                continue;
            }
            $consumeUserCountEnd++;
            if ($consume > $performCharge) {
                $cashConsumeUserCountEnd++;
            }
        }
        //查询截止到当天方案
        $sql = 'select count(*) as count from t_plan where discard=0 and createTime<"'.$upDate.'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天方案失败';
            return $resp;
        }
        $planData = $database->get($result);
        $planCountEnd = (int)$planData['count'];
        $database->free($result);
        //查询截止到当天订单
        $sql = 'select * from t_order where discard=0 and status=2 and createTime<"'.$upDate.'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天订单失败';
            return $resp;
        }
        $orderCountEnd = 0;
        $orderAmountEnd = 0;
        $planOrderCountEnd = 0;
        $planOrderAmountEnd = 0;
        $chargeOrderCountEnd = 0;
        $chargeOrderAmountEnd = 0;
        $jxzpOrderCountEnd = 0;
        $jxzpOrderAmountEnd = 0;
        while ($info = $database->get($result)) {
            $orderId = (int)$info['orderId'];
            $comboId = (int)$info['comboId'];
            $orderType = (int)$info['orderType'];
            $amount = (int)$info['amount'];
            if ($orderId <= 0) {
                continue;
            }
            $orderCountEnd++;
            $orderAmountEnd += $amount;
            //订单类型, 0=方案订单, 1=充值订单, 2=套餐订单
            if ($orderType == 0) {
                $planOrderCountEnd++;
                $planOrderAmountEnd += $amount;
            } else if ($orderType == 1) {
                $chargeOrderCountEnd++;
                $chargeOrderAmountEnd += $amount;
            } else if ($orderType == 2 && key_exists($comboId, $comboMap) && !empty($comboMap[$comboId])) {
                $comboType = (int)$comboMap[$comboId]['comboType'];
                if ($comboType == 1) {
                    $jxzpOrderCountEnd++;
                    $jxzpOrderAmountEnd += $amount;
                }
            }
        }
        $database->free($result);
        //查询截止到当天流水记录
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_record where discard=0 and financeType=0 and createTime<"'.$upDate.'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天流水记录失败';
            return $resp;
        }
        $consumeCountEnd = 0;
        $consumeAmountEnd = 0;
        $incomeCountEnd = 0;
        $incomeAmountEnd = 0;
        $chargeCountEnd = 0;
        $chargeAmountEnd = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=消费, 2=收益, 3=提款, 4=充值
            if ($type == 1) {
                $consumeCountEnd += $count;
                $consumeAmountEnd += $amount;
            } else if ($type == 2) {
                $incomeCountEnd += $count;
                $incomeAmountEnd += $amount;
            } else if ($type == 4) {
                $chargeCountEnd += $count;
                $chargeAmountEnd += $amount;
            }
        }
        $database->free($result);
        //查询截止到当天消费
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_consume where discard=0 and financeType=0 and createTime<"'.$upDate.'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天消费失败';
            return $resp;
        }
        $cashConsumeCountEnd = 0;
        $cashConsumeAmountEnd = 0;
        $chargeConsumeCountEnd = 0;
        $chargeConsumeAmountEnd = 0;
        $incomeConsumeCountEnd = 0;
        $incomeConsumeAmountEnd = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=现金消费, 2=充值消费, 3=收益消费
            if ($type == 1) {
                $cashConsumeCountEnd += $count;
                $cashConsumeAmountEnd += $amount;
            } else if ($type == 2) {
                $chargeConsumeCountEnd += $count;
                $chargeConsumeAmountEnd += $amount;
            } else if ($type == 3) {
                $incomeConsumeCountEnd += $count;
                $incomeConsumeAmountEnd += $amount;
            }
        }
        $database->free($result);
        //查询截止到当天收益
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_income where discard=0 and financeType=0 and createTime<"'.$upDate.'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天收益失败';
            return $resp;
        }
        $recommendIncomeCountEnd = 0;
        $recommendIncomeAmountEnd = 0;
        $spreadIncomeCountEnd = 0;
        $spreadIncomeAmountEnd = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=推荐收益, 2=推广收益
            if ($type == 1) {
                $recommendIncomeCountEnd += $count;
                $recommendIncomeAmountEnd += $amount;
            } else if ($type == 2) {
                $spreadIncomeCountEnd += $count;
                $spreadIncomeAmountEnd += $amount;
            }
        }
        $database->free($result);
        //查询截止到当天提款
        //status：1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
        $sql = 'select * from t_finance_withdraw where discard=0 and financeType=0 and lastTime<"'.$upDate.'" and status in(1,2,3,5)';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天提款失败';
            return $resp;
        }
        $withdrawingCountEnd = 0;
        $withdrawingAmountEnd = 0;
        $withdrewCountEnd = 0;
        $withdrewAmountEnd = 0;
        while ($info = $database->get($result)) {
            $status = (int)$info['status'];
            $amount = (int)$info['amount'];
            if ($status <= 0) {
                continue;
            }
            //1=未审核, 2=已审核, 3=已打款, 4=已拒绝
            if ($status == 1 || $status == 2 || $status == 5) {
                $withdrawingCountEnd++;
                $withdrawingAmountEnd += $amount;
            } else if ($status == 3) {
                $withdrewCountEnd++;
                $withdrewAmountEnd += $amount;
            }
        }
        $database->free($result);
        //查询截止到当天充值
        $sql = 'select type,count(*) as count,sum(amount) as amount from t_finance_charge where discard=0 and financeType=0 and createTime<"'.$upDate.'" group by type';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询截止到当天充值失败';
            return $resp;
        }
        $userChargeCountEnd = 0;
        $userChargeAmountEnd = 0;
        $platformChargeCountEnd = 0;
        $platformChargeAmountEnd = 0;
        while ($info = $database->get($result)) {
            $type = (int)$info['type'];
            $count = (int)$info['count'];
            $amount = (int)$info['amount'];
            if ($type <= 0) {
                continue;
            }
            //类型, 1=用户充值, 2=平台充值
            if ($type == 1) {
                $userChargeCountEnd += $count;
                $userChargeAmountEnd += $amount;
            } else if ($type == 2) {
                $platformChargeCountEnd += $count;
                $platformChargeAmountEnd += $amount;
            }
        }
        $database->free($result);
        //插入数据
        $field = array();
        $field[] = 'date="'.$database->escape($date).'"';
        $field[] = 'userCount="'.$database->escape($userCount).'"';
        $field[] = 'mobileUserCount="'.$database->escape($mobileUserCount).'"';
        $field[] = 'consumeUserCount="'.$database->escape($consumeUserCount).'"';
        $field[] = 'cashConsumeUserCount="'.$database->escape($cashConsumeUserCount).'"';
        $field[] = 'planCount="'.$database->escape($planCount).'"';
        $field[] = 'orderCount="'.$database->escape($orderCount).'"';
        $field[] = 'orderAmount="'.$database->escape($orderAmount).'"';
        $field[] = 'planOrderCount="'.$database->escape($planOrderCount).'"';
        $field[] = 'planOrderAmount="'.$database->escape($planOrderAmount).'"';
        $field[] = 'chargeOrderCount="'.$database->escape($chargeOrderCount).'"';
        $field[] = 'chargeOrderAmount="'.$database->escape($chargeOrderAmount).'"';
        $field[] = 'jxzpOrderCount="'.$database->escape($jxzpOrderCount).'"';
        $field[] = 'jxzpOrderAmount="'.$database->escape($jxzpOrderAmount).'"';
        $field[] = 'consumeCount="'.$database->escape($consumeCount).'"';
        $field[] = 'consumeAmount="'.$database->escape($consumeAmount).'"';
        $field[] = 'cashConsumeCount="'.$database->escape($cashConsumeCount).'"';
        $field[] = 'cashConsumeAmount="'.$database->escape($cashConsumeAmount).'"';
        $field[] = 'chargeConsumeCount="'.$database->escape($chargeConsumeCount).'"';
        $field[] = 'chargeConsumeAmount="'.$database->escape($chargeConsumeAmount).'"';
        $field[] = 'incomeConsumeCount="'.$database->escape($incomeConsumeCount).'"';
        $field[] = 'incomeConsumeAmount="'.$database->escape($incomeConsumeAmount).'"';
        $field[] = 'incomeCount="'.$database->escape($incomeCount).'"';
        $field[] = 'incomeAmount="'.$database->escape($incomeAmount).'"';
        $field[] = 'recommendIncomeCount="'.$database->escape($recommendIncomeCount).'"';
        $field[] = 'recommendIncomeAmount="'.$database->escape($recommendIncomeAmount).'"';
        $field[] = 'spreadIncomeCount="'.$database->escape($spreadIncomeCount).'"';
        $field[] = 'spreadIncomeAmount="'.$database->escape($spreadIncomeAmount).'"';
        $field[] = 'withdrawingCount="'.$database->escape($withdrawingCount).'"';
        $field[] = 'withdrawingAmount="'.$database->escape($withdrawingAmount).'"';
        $field[] = 'withdrewCount="'.$database->escape($withdrewCount).'"';
        $field[] = 'withdrewAmount="'.$database->escape($withdrewAmount).'"';
        $field[] = 'chargeCount="'.$database->escape($chargeCount).'"';
        $field[] = 'chargeAmount="'.$database->escape($chargeAmount).'"';
        $field[] = 'userChargeCount="'.$database->escape($userChargeCount).'"';
        $field[] = 'userChargeAmount="'.$database->escape($userChargeAmount).'"';
        $field[] = 'platformChargeCount="'.$database->escape($platformChargeCount).'"';
        $field[] = 'platformChargeAmount="'.$database->escape($platformChargeAmount).'"';
        $field[] = 'userCountEnd="'.$database->escape($userCountEnd).'"';
        $field[] = 'mobileUserCountEnd="'.$database->escape($mobileUserCountEnd).'"';
        $field[] = 'consumeUserCountEnd="'.$database->escape($consumeUserCountEnd).'"';
        $field[] = 'cashConsumeUserCountEnd="'.$database->escape($cashConsumeUserCountEnd).'"';
        $field[] = 'planCountEnd="'.$database->escape($planCountEnd).'"';
        $field[] = 'orderCountEnd="'.$database->escape($orderCountEnd).'"';
        $field[] = 'orderAmountEnd="'.$database->escape($orderAmountEnd).'"';
        $field[] = 'planOrderCountEnd="'.$database->escape($planOrderCountEnd).'"';
        $field[] = 'planOrderAmountEnd="'.$database->escape($planOrderAmountEnd).'"';
        $field[] = 'chargeOrderCountEnd="'.$database->escape($chargeOrderCountEnd).'"';
        $field[] = 'chargeOrderAmountEnd="'.$database->escape($chargeOrderAmountEnd).'"';
        $field[] = 'jxzpOrderCountEnd="'.$database->escape($jxzpOrderCountEnd).'"';
        $field[] = 'jxzpOrderAmountEnd="'.$database->escape($jxzpOrderAmountEnd).'"';
        $field[] = 'consumeCountEnd="'.$database->escape($consumeCountEnd).'"';
        $field[] = 'consumeAmountEnd="'.$database->escape($consumeAmountEnd).'"';
        $field[] = 'cashConsumeCountEnd="'.$database->escape($cashConsumeCountEnd).'"';
        $field[] = 'cashConsumeAmountEnd="'.$database->escape($cashConsumeAmountEnd).'"';
        $field[] = 'chargeConsumeCountEnd="'.$database->escape($chargeConsumeCountEnd).'"';
        $field[] = 'chargeConsumeAmountEnd="'.$database->escape($chargeConsumeAmountEnd).'"';
        $field[] = 'incomeConsumeCountEnd="'.$database->escape($incomeConsumeCountEnd).'"';
        $field[] = 'incomeConsumeAmountEnd="'.$database->escape($incomeConsumeAmountEnd).'"';
        $field[] = 'incomeCountEnd="'.$database->escape($incomeCountEnd).'"';
        $field[] = 'incomeAmountEnd="'.$database->escape($incomeAmountEnd).'"';
        $field[] = 'recommendIncomeCountEnd="'.$database->escape($recommendIncomeCountEnd).'"';
        $field[] = 'recommendIncomeAmountEnd="'.$database->escape($recommendIncomeAmountEnd).'"';
        $field[] = 'spreadIncomeCountEnd="'.$database->escape($spreadIncomeCountEnd).'"';
        $field[] = 'spreadIncomeAmountEnd="'.$database->escape($spreadIncomeAmountEnd).'"';
        $field[] = 'withdrawingCountEnd="'.$database->escape($withdrawingCountEnd).'"';
        $field[] = 'withdrawingAmountEnd="'.$database->escape($withdrawingAmountEnd).'"';
        $field[] = 'withdrewCountEnd="'.$database->escape($withdrewCountEnd).'"';
        $field[] = 'withdrewAmountEnd="'.$database->escape($withdrewAmountEnd).'"';
        $field[] = 'chargeCountEnd="'.$database->escape($chargeCountEnd).'"';
        $field[] = 'chargeAmountEnd="'.$database->escape($chargeAmountEnd).'"';
        $field[] = 'userChargeCountEnd="'.$database->escape($userChargeCountEnd).'"';
        $field[] = 'userChargeAmountEnd="'.$database->escape($userChargeAmountEnd).'"';
        $field[] = 'platformChargeCountEnd="'.$database->escape($platformChargeCountEnd).'"';
        $field[] = 'platformChargeAmountEnd="'.$database->escape($platformChargeAmountEnd).'"';
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'replace into t_statistics_date set '.implode(',', $field);
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '替换失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}
//开始运行
$statisticsDate = new StatisticsDate();
$statisticsDate->execute();