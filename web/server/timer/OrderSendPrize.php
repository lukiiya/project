<?php
class OrderSendPrize {
    private $common;
    private $commonService;
    private $orderService;
    private $userService;
    private $activityService;
    private $financeService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->userService = requireService("User");
        $this->activityService = requireService("Activity");
        $this->financeService = requireService("Finance");
    }

    public function sendPrize() {
        $param = array();
        $param['orderType'] = array(3,9);//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(4,6);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            $amount = (int)$order['amount'];
            if ($orderId <= 0 || ($orderType != 3 && $orderType != 9) || ($status != 2 && $status != 4) || ($ticketStatus != 4 && $ticketStatus != 6) || $amount <= 0) {
                continue;
            }
            $doSendPrizeResp = $this->doSendPrize($orderId);
            if ($doSendPrizeResp->errCode != 0) {
                $this->common->logger->info('竞技彩派奖失败('.$orderId.')：'.$doSendPrizeResp->msg);
            } else {
                $this->common->logger->info('竞技彩派奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('竞技彩派奖完成('.count($orderList).')');
    }

    //派奖操作
    public function doSendPrize($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $amount = (int)$orderData['amount'];
        $planMatchType = (int)$orderData['planMatchType'];//比赛类型, 1=足球, 2=篮球
        $ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
        $ticketExpectPrizeAmount = (int)$orderData['ticketExpectPrizeAmount'];
        $ticketSendPrizeAmount = (int)$orderData['ticketSendPrizeAmount'];
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        $ticketPrizeDivideStatus = (int)$orderData['ticketPrizeDivideStatus'];//中奖分成, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        //跟单的跟单人信息
        $planId = (int)$orderData['planId'];
        $planType = (int)$orderData['planType'];//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        $planUserId = (int)$orderData['planUserId'];
        $planNickName = trim($orderData['planNickName']);
        $planRealName = trim($orderData['planRealName']);
        $setTicketStatus = 0;
        $setTicketSendPrizeAmount = 0;
        $setTicketPrizeDivideStatus = 0;
        $setTicketPrizeDivideAmount = 0;
        $setAmount = 0;
        $setRemark = '';
        if ($orderType != 3 && $orderType != 9) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($ticketStatus != 4 && $ticketStatus != 6) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketExpectPrizeAmount <= 0) {
            $resp->msg = "订单预计派奖金额异常";
            return $resp;
        }
        $ticketPrizeDivide = function($planType, $ticketPrizeDivideStatus, $amount, $ticketPrizeAmount, &$setTicketPrizeDivideStatus, &$setTicketPrizeDivideAmount) {
            $resp = requireModule('Resp');
            $ticketPrizeDivideStatus = (int)$ticketPrizeDivideStatus;
            $amount = (int)$amount;
            $ticketPrizeAmount = (int)$ticketPrizeAmount;
            if ($ticketPrizeDivideStatus != 1) {
                $resp->msg = "ticketPrizeDivideStatus参数有误";
                return $resp;
            }
            if ($amount <= 0) {
                $resp->msg = "amount参数有误";
                return $resp;
            }
            if ($ticketPrizeAmount <= 0) {
                $resp->msg = "ticketPrizeAmount参数有误";
                return $resp;
            }
            if ($planType == -1) {
                //订单跟单分成
                $divideRate = 10/100;//分成比例10%
                $profitRate = 30/100;//用户保底盈率30%
            } else {
                //方案跟单分成
                $divideRate = 5/100;//分成比例5%
                $profitRate = 15/100;//用户保底盈率15%
            }
            $profitAmount = $ticketPrizeAmount - $amount;//盈利
            $divideAmount = floor($ticketPrizeAmount * $divideRate);//分成
            $gainAmount = $profitAmount - $divideAmount;//用户最终到手
            if ($gainAmount > 0 && $divideAmount > 0 && $gainAmount > $divideAmount && $gainAmount >= ($amount*$profitRate)) {
                $setTicketPrizeDivideStatus = 2;
                $setTicketPrizeDivideAmount = $divideAmount;

            } else {
                $setTicketPrizeDivideStatus = 3;
                $setTicketPrizeDivideAmount = 0;
            }
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        };
        $jssdk = requireModule('Jssdk');
        $msgParam = array(
            'title' => '平台派奖告警'
        );
        global $curEnv;
        if ($curEnv == 'dist') {
            $msgParam['userId'] = array(2,2142);//2=痞子逛大街, 2142=LuanQ~~
        } else if ($curEnv == 'beta') {
            $msgParam['userId'] = array(1410,1411);//1410=痞子逛大街, 1411=LuanQ~~
        }
        if ($ticketStatus == 4) {
            if ($ticketPrizeAmount <= 0) {//站长还未填入奖金
                if ($ticketSendPrizeAmount <= 0) {//从未派过,派 "预计的70%"
                    //只有足球的出票单,才能提前派奖, 因为篮球的 "预设总分" 和 "让分" 会不断的变化, 容易导致平台的赛果和票样的赛果不同
                    if ($planMatchType == 1 || $ticketSupplierId > 0) {//比赛类型, 1=足球, 2=篮球
                        $setTicketStatus = 6;
                        $setTicketSendPrizeAmount = $ticketExpectPrizeAmount * 0.7;
                        $setAmount = round($setTicketSendPrizeAmount);
                        $setRemark = '平台提前派奖'.($setAmount/100);
                    }
                } else {
                    $msgParam['content'] = '订单票状态异常："已中奖" 且 ticketPrizeAmount <= 0 且 ticketSendPrizeAmount > 0';
                    $jssdk->pushMessage($msgParam);
                    $resp->msg = $msgParam['content'];
                    return $resp;
                }
            } else if ($ticketPrizeAmount > 0) {//站长已填入奖金
                if ($ticketSendPrizeAmount <= 0) {//从未派过,派 "站长已填入奖金"
                    $setTicketStatus = 5;
                    $setTicketSendPrizeAmount = $ticketPrizeAmount;
                    $ticketPrizeDivideResp = $ticketPrizeDivide($planType, $ticketPrizeDivideStatus, $amount, $ticketPrizeAmount, $setTicketPrizeDivideStatus, $setTicketPrizeDivideAmount);
                    if ($ticketPrizeDivideResp->errCode == 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
                        $setAmount = round($ticketPrizeAmount - $setTicketPrizeDivideAmount);
                    } else {
                        $setAmount = round($setTicketSendPrizeAmount);
                    }
                    $setRemark = '平台派奖'.($setAmount/100);
                } else {
                    $msgParam['content'] = '订单票状态异常："已中奖" 且 ticketPrizeAmount > 0 且 ticketSendPrizeAmount > 0';
                    $jssdk->pushMessage($msgParam);
                    $resp->msg = $msgParam['content'];
                    return $resp;
                }
            }
        } else if ($ticketStatus == 6) {
            if ($ticketPrizeAmount > 0) {//站长已填入奖金
                $setTicketStatus = 5;
                $setTicketSendPrizeAmount = $ticketPrizeAmount;
                $ticketPrizeDivideResp = $ticketPrizeDivide($planType, $ticketPrizeDivideStatus, $amount, $ticketPrizeAmount, $setTicketPrizeDivideStatus, $setTicketPrizeDivideAmount);
                if ($ticketPrizeDivideResp->errCode == 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
                    $setAmount = round($ticketPrizeAmount - $ticketSendPrizeAmount - $setTicketPrizeDivideAmount);
                } else {
                    $setAmount = round($ticketPrizeAmount - $ticketSendPrizeAmount);
                }
                if ($setAmount > 0) {
                    $setRemark = '平台少派，补派'.($setAmount/100);
                } else if ($setAmount < 0) {
                    $setRemark = '平台多派，补扣'.abs($setAmount/100);
                    $msgParam['content'] = '订单id：'.$orderId;
                    $msgParam['remark'] = $setRemark;
                    $jssdk->pushMessage($msgParam);
                }
            }
        }
        if ($setTicketStatus <= 0 || $setTicketSendPrizeAmount <= 0 || $setAmount == 0) {
            $resp->msg = "订单不符合派奖条件('.$setTicketStatus.'|'.$setTicketSendPrizeAmount.'|'.$setAmount.')";
            return $resp;
        }
        $financeType = 1;//资金类型, 0=方案, 1=出票
        /*查询用户的资金账户体系*/
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $planUserFinanceIdExtra = 0;
        $planUserDataVersionExtra = 0;
        if ($planUserId > 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
            if ($userId == $planUserId) {
                //"下单人" 和 "方案人" 是同一个人
                $planUserFinanceIdExtra = $financeIdExtra;
                $planUserDataVersionExtra = $dataVersionExtra;
            } else {
                //可能需要进行分成操作
                $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $planUserId);
                if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                    $resp->msg = '查询资金异常';
                    return $resp;
                }
                $planUserFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
                if (empty($planUserFinanceDataExtra)) {
                    $resp->msg = '资金不存在';
                    return $resp;
                }
                $planUserFinanceIdExtra = (int)$planUserFinanceDataExtra['financeId'];
                $planUserDataVersionExtra = (int)$planUserFinanceDataExtra['dataVersion'];
                if ($planUserFinanceIdExtra <= 0) {
                    $resp->msg = '资金不存在';
                    return $resp;
                }
            }
        }

        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            $field = array();
            $field[] = 'ticketStatus="' . $database->escape($setTicketStatus) . '"';
            $field[] = 'ticketSendPrizeAmount="' . $database->escape($setTicketSendPrizeAmount) . '"';
            if ($setTicketPrizeDivideStatus != 0) {
                $field[] = 'ticketPrizeDivideStatus="' . $database->escape($setTicketPrizeDivideStatus) . '"';
                $field[] = 'ticketPrizeDivideAmount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
            }
            //更新订单状态
            $updateOrderSql = 'update t_order set '.implode(',', $field).' where orderId="' . $orderId . '" and orderType="'.$database->escape($orderType).'" and status="'.$database->escape($status).'" and ticketStatus="'.$ticketStatus.'" and ticketPrizeAmount="'.$ticketPrizeAmount.'" and ticketSendPrizeAmount="'.$ticketSendPrizeAmount.'" and ticketPrizeDivideStatus="'.$ticketPrizeDivideStatus.'" and ticketPrizeDivideAmount=0 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新订单异常";
                return $resp;
            }
            //收益流水总表插入
            $insertFinanceIncomeRecordField = array();
            $insertFinanceIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceIncomeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceIncomeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceIncomeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceIncomeRecordField[] = 'amount="' . $database->escape($setAmount) . '"';
            $insertFinanceIncomeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
            $insertFinanceIncomeRecordField[] = 'createTime=now()';
            $insertFinanceIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceIncomeRecordField);
            $insertFinanceIncomeRecordResult = $database->execute($insertFinanceIncomeRecordSql);
            $insertFinanceIncomeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceIncomeRecordResult || $insertFinanceIncomeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入流水异常";
                return $resp;
            }
            //收益插入
            $insertFinanceIncomeField = array();
            $insertFinanceIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceIncomeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceIncomeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceIncomeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceIncomeField[] = 'type=1'; //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益)
            $insertFinanceIncomeField[] = 'amount="' . $database->escape($setAmount) . '"';
            $insertFinanceIncomeField[] = 'remark="' . $database->escape($setRemark) . '"';
            $insertFinanceIncomeField[] = 'createTime=now()';
            $insertFinanceIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceIncomeField);
            $insertFinanceIncomeResult = $database->execute($insertFinanceIncomeSql);
            $insertFinanceIncomeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceIncomeResult || $insertFinanceIncomeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入收益异常";
                return $resp;
            }

            /* 放在这里做是,解决"下单人" 和 "方案人" 是同一个人, 引发"一个事务更新两次相同一行数据异常" */
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['prizeIncomeChangeAmount'] = $setAmount;   //中奖收益

            /*方案人*/
            if ($planUserFinanceIdExtra > 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
                if ($planType == -1) {
                    //订单跟单分成
                    //用户保底盈率30%, 专家分成比例7%, 平台分成比例3%
                    $setTicketPrizeDivideAmount = (int)(7*($setTicketPrizeDivideAmount/10));
                } else {
                    //方案跟单分成
                    //用户保底盈率15%, 专家分成比例4%, 平台分成比例1%
                    $setTicketPrizeDivideAmount = (int)(4*($setTicketPrizeDivideAmount/5));
                }
                $setRemark = '跟单中奖分成';
                //收益流水总表插入
                $insertFinanceIncomeRecordField = array();
                $insertFinanceIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceIncomeRecordField[] = 'userId="' . $database->escape($planUserId) . '"';
                $insertFinanceIncomeRecordField[] = 'nickName="' . $database->escape($planNickName) . '"';
                $insertFinanceIncomeRecordField[] = 'realName="' . $database->escape($planRealName) . '"';
                $insertFinanceIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceIncomeRecordField[] = 'amount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
                $insertFinanceIncomeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceIncomeRecordField[] = 'createTime=now()';
                $insertFinanceIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceIncomeRecordField);
                $insertFinanceIncomeRecordResult = $database->execute($insertFinanceIncomeRecordSql);
                $insertFinanceIncomeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceIncomeRecordResult || $insertFinanceIncomeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //收益插入
                $insertFinanceIncomeField = array();
                $insertFinanceIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceIncomeField[] = 'userId="' . $database->escape($planUserId) . '"';
                $insertFinanceIncomeField[] = 'nickName="' . $database->escape($planNickName) . '"';
                $insertFinanceIncomeField[] = 'realName="' . $database->escape($planRealName) . '"';
                $insertFinanceIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceIncomeField[] = 'planId="' . $database->escape($planId) . '"';
                $insertFinanceIncomeField[] = 'type=2'; //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益,2=分成收益)
                $insertFinanceIncomeField[] = 'amount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
                $insertFinanceIncomeField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceIncomeField[] = 'createTime=now()';
                $insertFinanceIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceIncomeField);
                $insertFinanceIncomeResult = $database->execute($insertFinanceIncomeSql);
                $insertFinanceIncomeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceIncomeResult || $insertFinanceIncomeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入收益异常';
                    return $resp;
                }
                if ($userId == $planUserId) {
                    /* 放在这里做是,解决"下单人" 和 "方案人" 是同一个人, 引发"一个事务更新两次相同一行数据异常" */
                    $updateFinanceSqlExtraParam['divideIncomeChangeAmount'] = $setTicketPrizeDivideAmount;
                } else {
                    //方案人资金明细表额外表
                    $planUserUpdateFinanceSqlExtraParam = array();
                    $planUserUpdateFinanceSqlExtraParam['financeId'] = $planUserFinanceIdExtra;
                    $planUserUpdateFinanceSqlExtraParam['nickName'] = $planNickName;
                    $planUserUpdateFinanceSqlExtraParam['realName'] = $planRealName;
                    $planUserUpdateFinanceSqlExtraParam['dataVersion'] = $planUserDataVersionExtra;
                    $planUserUpdateFinanceSqlExtraParam['divideIncomeChangeAmount'] = $setTicketPrizeDivideAmount;
                    $planUserUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $planUserUpdateFinanceSqlExtraParam);
                    $planUserUpdateFinanceSqlExtra = $planUserUpdateFinanceSqlExtraResp->data;
                    if ($planUserUpdateFinanceSqlExtraResp->errCode != 0 || empty($planUserUpdateFinanceSqlExtra)) {
                        $database->execute('rollback');
                        $database->close();
                        $resp->msg = '更新资金异常';
                        return $resp;
                    }
                    $planUserUpdateFinanceResultExtra = $database->execute($planUserUpdateFinanceSqlExtra);
                    $planUserUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                    if (!$planUserUpdateFinanceResultExtra || $planUserUpdateFinanceAffectedRowsExtra <= 0) {
                        $database->execute('rollback');
                        $database->close();
                        $resp->msg = '更新资金异常';
                        return $resp;
                    }
                }
            }

            /* 放在这里做是,解决"下单人" 和 "方案人" 是同一个人, 引发"一个事务更新两次相同一行数据异常" */
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }

            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $this->commonService->setUserFinance($planUserId);
            //消息推送
            $this->sendTicketPrizeMessage($orderId, $setAmount);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;

        } else {
            $resp->msg = '派奖失败';
            return $resp;
        }
    }

    private function sendTicketPrizeMessage($orderId, $setAmount) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        $setAmount = (int)$setAmount;
        if ($orderId <= 0) {
            $resp->msg = 'orderId参数有误';
            return $resp;
        }
        if ($setAmount == 0) {
            $resp->msg = 'setAmount参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        $orderNumeric = $this->common->getOrderNumeric($orderData);
        if (!is_numeric($orderNumeric)) {
            $resp->msg = 'orderNumeric有误';
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];
        if ($orderType != 3 && $orderType != 9) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        if ($ticketStatus != 5 && $ticketStatus != 6) {
            $resp->msg = 'ticketStatus有误';
            return $resp;
        }
        $setAmount = sprintf('%.2f', $setAmount/100);
        $orderId = (int)$orderData['orderId'];
        $userId = (int)$orderData['userId'];
        $ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
        $ticketPrizeAmount = sprintf('%.2f', $ticketPrizeAmount/100);
        $ticketPrizeDivideAmount = (int)$orderData['ticketPrizeDivideAmount'];
        $ticketPrizeDivideAmount = sprintf('%.2f', $ticketPrizeDivideAmount/100);
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        $templateId = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
        } else if ($curEnv == 'beta') {
            $url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
            $templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
        }
        if (empty($templateId)) {
            $resp->msg = 'templateId不能为空';
            return $resp;
        }
        $data = array();
        if ($ticketStatus == 5) {
            if ($ticketPrizeAmount == ($setAmount + $ticketPrizeDivideAmount)) {
                $data['first'] = array('value' => '恭喜您中奖了', 'color' => '#000000');
                $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
                $data['keyword2'] = array('value' => '已派奖'.$ticketPrizeAmount.'元', 'color' => '#000000');
                $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
            } else if ($setAmount > 0) {
                $data['first'] = array('value' => '店长确认奖金后，补派奖金', 'color' => '#000000');
                $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
                $data['keyword2'] = array('value' => '已补派奖金'.$setAmount.'元，共'.$ticketPrizeAmount.'元', 'color' => '#000000');
                $data['remark'] = array('value' => '提前派奖是晒米场推出的新服务，方便用户“奖金快速到账”实施的分步派奖。', 'color' => '#000000');
            } else  if ($setAmount < 0) {
                $data['first'] = array('value' => '店长确认奖金后，补扣奖金', 'color' => '#000000');
                $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
                $data['keyword2'] = array('value' => '已补扣奖金'.abs($setAmount).'元，共'.$ticketPrizeAmount.'元', 'color' => '#000000');
                $data['remark'] = array('value' => '提前派奖是晒米场推出的新服务，方便用户“奖金快速到账”实施的分步派奖。', 'color' => '#000000');
            }
        } else if ($ticketStatus == 6) {
            $data['first'] = array('value' => '恭喜您中奖了', 'color' => '#000000');
            $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
            $data['keyword2'] = array('value' => '已提前派奖'.$setAmount.'元', 'color' => '#000000');
            $data['remark'] = array('value' => '剩下的部分会在出票店长确认中奖金额后派出，如果提前派奖金额超出实际中奖，将会扣除超出部分彩金。', 'color' => '#000000');
        }
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function attachPrize() {
        $param = array();
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(3,5);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['ticketAttachPrizeStatus'] = 1;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $userId = (int)$order['userId'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketPassType = trim($order['ticketPassType']);
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
            $ticketAttachPrizeStatus = (int)$order['ticketAttachPrizeStatus'];
            $ticketAttachPrizeAmount = (int)$order['ticketAttachPrizeAmount'];
            //黑名单
            //$blackArr = array(98685);//98685(buaalala)
            $blackArr = array();
            if (empty($order) || $orderId <= 0 || $orderType != 3 || $userId <= 0 || in_array($userId, $blackArr) || ($status != 2 && $status != 4) || $amount <= 0 || ($ticketStatus != 3 && $ticketStatus != 5) || ($ticketStatus == 5 && $ticketPrizeAmount <= 0) || empty($ticketPassType) || $ticketAttachPrizeStatus != 1 || $ticketAttachPrizeAmount != 0) {
                continue;
            }
            $doAttachPrizeResp = $this->doAttachPrize($orderId);
            if ($doAttachPrizeResp->errCode != 0) {
                $this->common->logger->info('加奖失败('.$orderId.')：'.$doAttachPrizeResp->msg);
            } else {
                $this->common->logger->info('加奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('加奖完成('.count($orderList).')');
    }

    public function doAttachPrize($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$orderData['amount'];
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketPassType = trim($orderData['ticketPassType']);
        $ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
        $ticketAttachPrizeStatus = (int)$orderData['ticketAttachPrizeStatus'];//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $ticketAttachPrizeAmount = (int)$orderData['ticketAttachPrizeAmount'];
        $planMatchRecommend = json_decode(trim($orderData['planMatchRecommend']));
        if ($orderType != 3) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($userId <= 0) {
            $resp->msg = "订单用户异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 3 && $ticketStatus != 5) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketStatus == 5 && $ticketPrizeAmount <= 0) {
            $resp->msg = "订单中奖金额异常";
            return $resp;
        }
        if (empty($ticketPassType)) {
            $resp->msg = "订单过关方式异常";
            return $resp;
        }
        if ($ticketAttachPrizeStatus != 1) {
            $resp->msg = "订单加奖状态异常";
            return $resp;
        }
        if ($ticketAttachPrizeAmount != 0) {
            $resp->msg = "订单加奖金额异常";
            return $resp;
        }
        if (empty($planMatchRecommend)) {
            $resp->msg = "订单比赛异常";
            return $resp;
        }
        $setTicketAttachPrizeStatus = 0;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $setTicketAttachPrizeAmount = 0;
        if ($ticketStatus == 3) {
            $setTicketAttachPrizeStatus = 3;
        } else if ($ticketStatus == 5) {
            $odds = 1;
            foreach ($planMatchRecommend as $mr) {
                $bettypeOdds = $mr->bettypeOdds;
                $prize = $mr->prize;//比赛取消时,prize是空数组
                if (!empty($bettypeOdds) && is_array($prize) && count($prize) == 1) {
                    $odds *= $bettypeOdds->{trim($prize[0])};
                }
            }
            if ($ticketPassType == '1x1' || $ticketPassType == '2x1') {
                /*
                    200≤X＜2000 加奖16
                    2000≤X＜20000 加奖160
                    20000以上 加奖1680
                 */
                if ($odds < 1.40 || $ticketPrizeAmount < 20000) {
                    $setTicketAttachPrizeStatus = 3;
                } else if ($ticketPrizeAmount >= 20000 && $ticketPrizeAmount < 200000) {
                    $setTicketAttachPrizeStatus = 2;
                    $setTicketAttachPrizeAmount = 1600;
                } else if ($ticketPrizeAmount >= 200000 && $ticketPrizeAmount < 2000000) {
                    $setTicketAttachPrizeStatus = 2;
                    $setTicketAttachPrizeAmount = 16000;
                } else if ($ticketPrizeAmount >= 2000000) {
                    $setTicketAttachPrizeStatus = 2;
                    $setTicketAttachPrizeAmount = 168000;
                }
            }
        }
        if ($setTicketAttachPrizeStatus <= 0) {
            $resp->msg = "订单加奖设置异常";
            return $resp;
        }
        /*查询用户的资金账户体系*/
        $financeType = 1;//资金类型, 0=方案, 1=出票
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            if ($setTicketAttachPrizeStatus == 2 && $setTicketAttachPrizeAmount > 0) {
                //$financeType = 1;//资金类型, 0=方案, 1=出票
                $setRemark = '平台加奖';
                //资金明细表额外表
                $updateFinanceSqlExtraParam = array();
                $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
                $updateFinanceSqlExtraParam['nickName'] = $nickName;
                $updateFinanceSqlExtraParam['realName'] = $realName;
                $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
                //更新订单状态
                $updateOrderSql = 'update t_order set ticketAttachPrizeStatus="'.$setTicketAttachPrizeStatus.'",ticketAttachPrizeAmount="'.$setTicketAttachPrizeAmount.'" where orderId="' . $orderId . '" and orderType=3 and status="'.$database->escape($status).'" and ticketStatus=5 and ticketAttachPrizeStatus=1 and ticketAttachPrizeAmount=0 limit 1';
                $updateOrderResult = $database->execute($updateOrderSql);
                $updateOrderAffectedRows = (int)$database->getAffectedRows();
                if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新订单异常';
                    return $resp;
                }
                //充值流水插入
                $insertFinanceChargeRecordField = array();
                $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($setTicketAttachPrizeAmount) . '"';
                $insertFinanceChargeRecordField[] = 'createTime=now()';
                $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
                $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
                $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //充值插入
                $insertFinanceChargeField = array();
                $insertFinanceChargeField[] =  'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
                $insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceChargeField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceChargeField[] = 'amount="' . $database->escape($setTicketAttachPrizeAmount) . '"';
                $insertFinanceChargeField[] = 'createTime=now()';
                $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
                $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
                $insertFinanceChargeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入充值异常';
                    return $resp;
                }
                $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $setTicketAttachPrizeAmount;//平台充值
                //资金明细表额外表
                $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
                $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
                if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
                $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
                $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
            } else if ($setTicketAttachPrizeStatus == 3) {
                //更新订单状态
                $updateOrderSql = 'update t_order set ticketAttachPrizeStatus="'.$setTicketAttachPrizeStatus.'" where orderId="' . $orderId . '" and orderType=3 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" and ticketAttachPrizeStatus=1 and ticketAttachPrizeAmount=0 limit 1';
                $updateOrderResult = $database->execute($updateOrderSql);
                $updateOrderAffectedRows = (int)$database->getAffectedRows();
                if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新订单异常';
                    return $resp;
                }
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '订单加奖失败';
            return $resp;
        }
    }

    /********************************************************************* 竞彩和数字彩分割线  **************************************************************************/

    public function digitalSendPrize() {
        $param = array();
        $param['nullTicketPrizeAmount'] = false;
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = 4;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            $amount = (int)$order['amount'];
            if ($orderId <= 0 || $orderType != 7 || ($status != 2 && $status != 4) || $ticketStatus != 4 || $amount <= 0) {
                continue;
            }
            $doDigitalSendPrizeResp = $this->doDigitalSendPrize($orderId);
            if ($doDigitalSendPrizeResp->errCode != 0) {
                $this->common->logger->info('数字彩派奖失败('.$orderId.')：'.$doDigitalSendPrizeResp->msg);
            } else {
                $this->common->logger->info('数字彩派奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('数字彩派奖完成('.count($orderList).')');
    }

    //派奖操作
    public function doDigitalSendPrize($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $amount = (int)$orderData['amount'];
        $ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
        $ticketExpectPrizeAmount = (int)$orderData['ticketExpectPrizeAmount'];
        $ticketSendPrizeAmount = (int)$orderData['ticketSendPrizeAmount'];
        $ticketSupplierId = (int)$orderData['ticketSupplierId'];
        $ticketPrizeVerifyStatus = (int)$orderData['ticketPrizeVerifyStatus'];//中奖审核状态, 0=不审核, 1=待审核, 2=已审核
        $ticketPrizeDivideStatus = (int)$orderData['ticketPrizeDivideStatus'];//中奖分成, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        //跟单的跟单人信息
        $planId = (int)$orderData['planId'];
        $planType = (int)$orderData['planType'];//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        $planUserId = (int)$orderData['planUserId'];
        $planNickName = trim($orderData['planNickName']);
        $planRealName = trim($orderData['planRealName']);
        if ($orderType != 7) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($ticketStatus != 4) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketPrizeAmount <= 0) {
            $resp->msg = "派奖金额异常";
            return $resp;
        }
        if ($ticketSendPrizeAmount > 0) {
            $resp->msg = "已派奖金额异常";
            return $resp;
        }
        if ($ticketPrizeVerifyStatus == 0) {
            //如果官方加奖会造成 "预算奖金" 和 "实际派奖" 不符
            /*if ($ticketExpectPrizeAmount != $ticketPrizeAmount) {
                $resp->msg = "派奖金额异常";
                return $resp;
            }*/
        } else if ($ticketPrizeVerifyStatus == 1) {
            $resp->msg = "大奖待审核";
            return $resp;
        }
        $setTicketStatus = 5;
        $setTicketSendPrizeAmount = $ticketPrizeAmount;
        $setAmount = round($setTicketSendPrizeAmount);
        $setRemark = '平台派奖'.($setAmount/100);
        $setTicketPrizeDivideStatus = 0;
        $setTicketPrizeDivideAmount = 0;
        if ($ticketPrizeDivideStatus == 1) {
            if ($planType == -2) {
                //订单跟单分成
                $divideRate = 10/100;//分成比例10%
                $profitRate = 30/100;//用户保底盈率30%
            } else {
                //方案跟单分成
                $divideRate = 5/100;//分成比例5%
                $profitRate = 15/100;//用户保底盈率15%
            }
            $profitAmount = $ticketPrizeAmount - $amount;//盈利
            $divideAmount = floor($ticketPrizeAmount * $divideRate);//分成
            $gainAmount = $profitAmount - $divideAmount;//用户最终到手
            if ($gainAmount > 0 && $divideAmount > 0 && $gainAmount > $divideAmount && $gainAmount >= ($amount*$profitRate)) {
                $setTicketPrizeDivideStatus = 2;
                $setTicketPrizeDivideAmount = $divideAmount;
                $setAmount = round($ticketPrizeAmount - $setTicketPrizeDivideAmount);
            } else {
                $setTicketPrizeDivideStatus = 3;
                $setTicketPrizeDivideAmount = 0;
            }
        }
        $financeType = 1;//资金类型, 0=方案, 1=出票
        /*查询用户的资金账户体系*/
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $planUserFinanceIdExtra = 0;
        $planUserDataVersionExtra = 0;
        if ($planUserId > 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
            //可能需要进行分成操作
            $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $planUserId);
            if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                $resp->msg = '查询资金异常';
                return $resp;
            }
            $planUserFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
            if (empty($planUserFinanceDataExtra)) {
                $resp->msg = '资金不存在';
                return $resp;
            }
            $planUserFinanceIdExtra = (int)$planUserFinanceDataExtra['financeId'];
            $planUserDataVersionExtra = (int)$planUserFinanceDataExtra['dataVersion'];
            if ($planUserFinanceIdExtra <= 0) {
                $resp->msg = '资金不存在';
                return $resp;
            }
        }

        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            $field = array();
            $field[] = 'ticketStatus="' . $database->escape($setTicketStatus) . '"';
            $field[] = 'ticketSendPrizeAmount="' . $database->escape($setTicketSendPrizeAmount) . '"';
            if ($setTicketPrizeDivideStatus != 0) {
                $field[] = 'ticketPrizeDivideStatus="' . $database->escape($setTicketPrizeDivideStatus) . '"';
                $field[] = 'ticketPrizeDivideAmount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
            }
            //更新订单状态
            $updateOrderSql = 'update t_order set '.implode(',', $field).' where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketStatus="'.$ticketStatus.'" and ticketPrizeAmount="'.$ticketPrizeAmount.'" and ticketSendPrizeAmount="'.$ticketSendPrizeAmount.'" and ticketPrizeDivideStatus="'.$ticketPrizeDivideStatus.'" and ticketPrizeDivideAmount=0 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新订单异常";
                return $resp;
            }
            //收益流水总表插入
            $insertFinanceIncomeRecordField = array();
            $insertFinanceIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceIncomeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceIncomeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceIncomeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceIncomeRecordField[] = 'amount="' . $database->escape($setAmount) . '"';
            $insertFinanceIncomeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
            $insertFinanceIncomeRecordField[] = 'createTime=now()';
            $insertFinanceIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceIncomeRecordField);
            $insertFinanceIncomeRecordResult = $database->execute($insertFinanceIncomeRecordSql);
            $insertFinanceIncomeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceIncomeRecordResult || $insertFinanceIncomeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入流水异常";
                return $resp;
            }
            //收益插入
            $insertFinanceIncomeField = array();
            $insertFinanceIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceIncomeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceIncomeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceIncomeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertFinanceIncomeField[] = 'type=1'; //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益)
            $insertFinanceIncomeField[] = 'amount="' . $database->escape($setAmount) . '"';
            $insertFinanceIncomeField[] = 'remark="' . $database->escape($setRemark) . '"';
            $insertFinanceIncomeField[] = 'createTime=now()';
            $insertFinanceIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceIncomeField);
            $insertFinanceIncomeResult = $database->execute($insertFinanceIncomeSql);
            $insertFinanceIncomeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceIncomeResult || $insertFinanceIncomeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "插入收益异常";
                return $resp;
            }
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
            $updateFinanceSqlExtraParam['prizeIncomeChangeAmount'] = $setAmount;   //中奖收益
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = "更新资金异常";
                return $resp;
            }
            /*方案人*/
            if ($planUserFinanceIdExtra > 0 && $setTicketPrizeDivideStatus == 2 && $setTicketPrizeDivideAmount > 0) {
                if ($planType == -2) {
                    //订单跟单分成
                    //用户保底盈率30%, 专家分成比例7%, 平台分成比例3%
                    $setTicketPrizeDivideAmount = (int)(7*($setTicketPrizeDivideAmount/10));
                } else {
                    //方案跟单分成
                    //用户保底盈率15%, 专家分成比例4%, 平台分成比例1%
                    $setTicketPrizeDivideAmount = (int)(4*($setTicketPrizeDivideAmount/5));
                }
                $setRemark = '跟单中奖分成';
                //收益流水总表插入
                $insertFinanceIncomeRecordField = array();
                $insertFinanceIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceIncomeRecordField[] = 'userId="' . $database->escape($planUserId) . '"';
                $insertFinanceIncomeRecordField[] = 'nickName="' . $database->escape($planNickName) . '"';
                $insertFinanceIncomeRecordField[] = 'realName="' . $database->escape($planRealName) . '"';
                $insertFinanceIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceIncomeRecordField[] = 'amount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
                $insertFinanceIncomeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceIncomeRecordField[] = 'createTime=now()';
                $insertFinanceIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceIncomeRecordField);
                $insertFinanceIncomeRecordResult = $database->execute($insertFinanceIncomeRecordSql);
                $insertFinanceIncomeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceIncomeRecordResult || $insertFinanceIncomeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //收益插入
                $insertFinanceIncomeField = array();
                $insertFinanceIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceIncomeField[] = 'userId="' . $database->escape($planUserId) . '"';
                $insertFinanceIncomeField[] = 'nickName="' . $database->escape($planNickName) . '"';
                $insertFinanceIncomeField[] = 'realName="' . $database->escape($planRealName) . '"';
                $insertFinanceIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceIncomeField[] = 'planId="' . $database->escape($planId) . '"';
                $insertFinanceIncomeField[] = 'type=2'; //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益,2=分成收益)
                $insertFinanceIncomeField[] = 'amount="' . $database->escape($setTicketPrizeDivideAmount) . '"';
                $insertFinanceIncomeField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceIncomeField[] = 'createTime=now()';
                $insertFinanceIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceIncomeField);
                $insertFinanceIncomeResult = $database->execute($insertFinanceIncomeSql);
                $insertFinanceIncomeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceIncomeResult || $insertFinanceIncomeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入收益异常';
                    return $resp;
                }
                //方案人资金明细表额外表
                $planUserUpdateFinanceSqlExtraParam = array();
                $planUserUpdateFinanceSqlExtraParam['financeId'] = $planUserFinanceIdExtra;
                $planUserUpdateFinanceSqlExtraParam['nickName'] = $planNickName;
                $planUserUpdateFinanceSqlExtraParam['realName'] = $planRealName;
                $planUserUpdateFinanceSqlExtraParam['dataVersion'] = $planUserDataVersionExtra;
                $planUserUpdateFinanceSqlExtraParam['divideIncomeChangeAmount'] = $setTicketPrizeDivideAmount;
                $planUserUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $planUserUpdateFinanceSqlExtraParam);
                $planUserUpdateFinanceSqlExtra = $planUserUpdateFinanceSqlExtraResp->data;
                if ($planUserUpdateFinanceSqlExtraResp->errCode != 0 || empty($planUserUpdateFinanceSqlExtra)) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
                $planUserUpdateFinanceResultExtra = $database->execute($planUserUpdateFinanceSqlExtra);
                $planUserUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                if (!$planUserUpdateFinanceResultExtra || $planUserUpdateFinanceAffectedRowsExtra <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $this->commonService->setUserFinance($planUserId);
            //消息推送
            $this->sendTicketPrizeMessage($orderId, $setAmount);
            if ($ticketPrizeVerifyStatus == 2) {
                //模版消息
                $jssdk = requireModule('Jssdk');
                $msgParam = array(
                    'title' => '平台大奖派奖通知'
                );
                global $curEnv;
                if ($curEnv == 'dist') {
                    $msgParam['userId'] = array(2,2142);//2=痞子逛大街, 2142=LuanQ~~
                } else if ($curEnv == 'beta') {
                    $msgParam['userId'] = array(1410,1411);//1410=痞子逛大街, 1411=LuanQ~~
                }
                $msgParam['content'] = '订单id：'.$orderId.'，派奖金额：'.($ticketPrizeAmount/100).'元';
                $jssdk->pushMessage($msgParam);
            }
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '派奖失败';
            return $resp;
        }
    }

    public function digitalAttachPrize() {
        $param = array();
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['lotteryId'] = 'GX11X5';
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(3,5);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['ticketAttachPrizeStatus'] = 1;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 10 * 60;//10分钟的执行数量
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $lotteryId = trim($order['lotteryId']);
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $userId = (int)$order['userId'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];  //派奖金额
            $ticketAttachPrizeStatus = (int)$order['ticketAttachPrizeStatus'];  //加奖状态
            //黑名单
            //$blackArr = array(98685);//98685(buaalala)
            $blackArr = array();
            if ($lotteryId != 'GX11X5' || empty($order) || $orderId <= 0 || $orderType != 7 || $userId <= 0 || in_array($userId, $blackArr) || ($status != 2 && $status != 4) || $amount <= 0 ||  ($ticketStatus != 3 && $ticketStatus != 5) || ($ticketStatus == 5 && $ticketPrizeAmount <= 0) || $ticketAttachPrizeStatus != 1) {
                continue;
            }
            $doDigitalAttachPrizeResp = $this->doDigitalAttachPrize($orderId);
            if ($doDigitalAttachPrizeResp->errCode != 0) {
                $this->common->logger->info('广西11选5加奖失败('.$orderId.')：'.$doDigitalAttachPrizeResp->msg);
            } else {
                $this->common->logger->info('广西11选5加奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('广西11选5加奖完成('.count($orderList).')');
    }

    public function doDigitalAttachPrize($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $lotteryId = trim($orderData['lotteryId']);
        $lotteryName = trim($orderData['lotteryName']);
        $orderType = (int)$orderData['orderType'];
        $userId = (int)$orderData['userId'];
        $nickName = trim($orderData['nickName']);
        $realName = trim($orderData['realName']);
        $status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$orderData['amount'];
        $issue = trim($orderData['issue']);
        $ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketPrizeAmount = (int)$orderData['ticketPrizeAmount'];
        $ticketAttachPrizeStatus = (int)$orderData['ticketAttachPrizeStatus'];//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $ticketAttachPrizeAmount = (int)$orderData['ticketAttachPrizeAmount'];
        if ($lotteryId != 'GX11X5') {
            $resp->msg = "加奖彩种类型异常";
            return $resp;
        }
        if ($orderType != 7) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if (empty($issue)) {
            $resp->msg = "订单信息异常";
            return $resp;
        }
        if ($userId <= 0) {
            $resp->msg = "订单用户异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 3 && $ticketStatus != 5) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketStatus == 5 && $ticketPrizeAmount <= 0) {
            $resp->msg = "订单中奖金额异常";
            return $resp;
        }
        if ($ticketAttachPrizeStatus != 1) {
            $resp->msg = "订单加奖状态异常";
            return $resp;
        }
        $setTicketAttachPrizeStatus = 0;
        if ($ticketStatus == 3) {
            $setTicketAttachPrizeStatus = 3;
        } else if ($ticketStatus == 5) {
            if ($ticketAttachPrizeAmount > 0) {
                $setTicketAttachPrizeStatus = 2;
            } else {
                $setTicketAttachPrizeStatus = 3;
            }
        }
        if ($setTicketAttachPrizeStatus <= 0) {
            $resp->msg = "订单加奖设置异常";
            return $resp;
        }
        $activityId = 7;//11选5加奖activityId
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $resp->msg = "访问异常";
            return $resp;
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $resp->msg = "活动不存在";
            return $resp;
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        /*查询用户的资金账户体系*/
        $financeType = 1;//资金类型, 0=方案, 1=出票
        $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = "查询资金异常";
            return $resp;
        }
        $financeExtraData = $selectFinanceExtraByUserIdResp->data;
        if (empty($financeExtraData)) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $financeIdExtra = (int)$financeExtraData['financeId'];
        $dataVersionExtra = (int)$financeExtraData['dataVersion'];
        if ($financeIdExtra <= 0) {
            $resp->msg = "资金不存在";
            return $resp;
        }
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            if ($setTicketAttachPrizeStatus == 2 && $ticketAttachPrizeAmount > 0) {
                //$financeType = 1;//资金类型, 0=方案, 1=出票
                $setRemark = '平台加奖';
                //资金明细表额外表
                $updateFinanceSqlExtraParam = array();
                $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
                $updateFinanceSqlExtraParam['nickName'] = $nickName;
                $updateFinanceSqlExtraParam['realName'] = $realName;
                $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
                //更新加奖活动
                $updateActivitySql = 'update t_activity set amount=amount+'.$ticketAttachPrizeAmount.',count=count+1 where activityId="' . $activityId . '"  and (amount+'.$ticketAttachPrizeAmount.') < sumAmount limit 1';
                $updateActivityResult = $database->execute($updateActivitySql);
                $updateActivityAffectedRows = (int)$database->getAffectedRows();
                if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新活动异常';
                    return $resp;
                }
                //家加奖记录插入attach_prize
                $insertActivityAttachPrizeField = array();
                $insertActivityAttachPrizeField[] = 'activityId="' . $database->escape($activityId) . '"';
                $insertActivityAttachPrizeField[] = 'activityName="' . $database->escape($activityName) . '"';
                $insertActivityAttachPrizeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertActivityAttachPrizeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertActivityAttachPrizeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertActivityAttachPrizeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertActivityAttachPrizeField[] = 'issue="' . $database->escape($issue) . '"';
                $insertActivityAttachPrizeField[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
                $insertActivityAttachPrizeField[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
                $insertActivityAttachPrizeField[] = 'attachPrizeAmount="' . $database->escape($ticketAttachPrizeAmount) . '"';
                $insertActivityAttachPrizeField[] = 'createTime=now()';
                $insertActivityAttachPrizeSql = 'insert into t_activity_attach_prize set ' . implode(',', $insertActivityAttachPrizeField);
                $insertActivityAttachPrizeResult = $database->execute($insertActivityAttachPrizeSql);
                $insertActivityAttachPrizeInsertId = (int)$database->getInsertId();
                if (!$insertActivityAttachPrizeResult || $insertActivityAttachPrizeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入活动加奖异常';
                    return $resp;
                }
                //更新订单状态
                $updateOrderSql = 'update t_order set ticketAttachPrizeStatus="'.$setTicketAttachPrizeStatus.'" where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketStatus=5 and ticketAttachPrizeStatus=1 and ticketAttachPrizeAmount>0 limit 1';
                $updateOrderResult = $database->execute($updateOrderSql);
                $updateOrderAffectedRows = (int)$database->getAffectedRows();
                if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新订单异常';
                    return $resp;
                }
                //充值流水插入
                $insertFinanceChargeRecordField = array();
                $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($ticketAttachPrizeAmount) . '"';
                $insertFinanceChargeRecordField[] = 'createTime=now()';
                $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
                $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
                $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //充值插入
                $insertFinanceChargeField = array();
                $insertFinanceChargeField[] =  'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
                $insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceChargeField[] = 'remark="' . $database->escape($setRemark) . '"';
                $insertFinanceChargeField[] = 'amount="' . $database->escape($ticketAttachPrizeAmount) . '"';
                $insertFinanceChargeField[] = 'createTime=now()';
                $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
                $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
                $insertFinanceChargeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入充值异常';
                    return $resp;
                }
                $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $ticketAttachPrizeAmount;//平台充值
                //资金明细表额外表
                $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
                $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
                if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
                $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
                $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
            } else if ($setTicketAttachPrizeStatus == 3) {
                //更新订单状态
                $updateOrderSql = 'update t_order set ticketAttachPrizeStatus="'.$setTicketAttachPrizeStatus.'" where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" and ticketAttachPrizeStatus=1 and ticketAttachPrizeAmount=0 limit 1';
                $updateOrderResult = $database->execute($updateOrderSql);
                $updateOrderAffectedRows = (int)$database->getAffectedRows();
                if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新订单异常';
                    return $resp;
                }
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '广西11选5订单加奖失败';
            return $resp;
        }
    }
}