<?php
namespace dao;
class Order {
    private $common;

    public function __construct() {
        $this->common = requireModule("Common");
    }

    public function insertOrder($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $orderType = (int)$param['orderType'];
        $planType = (int)$param['planType'];
        $planId = (int)$param['planId'];
        $planUserId = (int)$param['planUserId'];
        $planNickName = trim($param['planNickName']);
        $planRealName = trim($param['planRealName']);
        $planMatchType = (int)$param['planMatchType'];
        $planMatchRecommend = trim($param['planMatchRecommend']);
        $planMatchBeginTime = trim($param['planMatchBeginTime']);
        $spreaderUserId = (int)$param['spreaderUserId'];
        $spreaderNickName = trim($param['spreaderNickName']);
        $spreaderRealName = trim($param['spreaderRealName']);
        $ticketUserId = (int)$param['ticketUserId'];
        $ticketNickName = trim($param['ticketNickName']);
        $ticketRealName = trim($param['ticketRealName']);
        $ticketUnit = (int)$param['ticketUnit'];
        $ticketMultiple = (int)$param['ticketMultiple'];
        $ticketPassType = trim($param['ticketPassType']);
        $ticketAppend = (int)$param['ticketAppend'];
        $ticketStatus = (int)$param['ticketStatus'];
        $ticketSupplierId = (int)$param['ticketSupplierId'];
        $ticketSupplierName = trim($param['ticketSupplierName']);
        $ticketPrizeDivideStatus = (int)$param['ticketPrizeDivideStatus'];
        $ticketAttachPrizeStatus = (int)$param['ticketAttachPrizeStatus'];
        $presentOrderId = (int)$param['presentOrderId'];
        $presentNum = (int)$param['presentNum'];
        $presentReceived = (int)$param['presentReceived'];
        $presentRemark = trim($param['presentRemark']);
        $publish = (int)$param['publish'];
        $saleTicket = (int)$param['saleTicket'];
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        $lotteryName = trim($param['lotteryName']);
        $betContent = trim($param['betContent']);
        $comboId = (int)$param['comboId'];
        $matchId = (int)$param['matchId'];
        $userCouponId = (int)$param['userCouponId'];
        $amount = (int)$param['amount'];
        $status = (int)$param['status'];
        $source = (int)$param['source'];
        $channel = (int)$param['channel'];
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
        if (key_exists('orderType', $param)) {
            $field[] = 'orderType="'.$database->escape($orderType).'"';
        }
        if (key_exists('planType', $param)) {
            $field[] = 'planType="'.$database->escape($planType).'"';
        }
        if (key_exists('planId', $param)) {
            $field[] = 'planId="'.$database->escape($planId).'"';
        }
        if (key_exists('planUserId', $param)) {
            $field[] = 'planUserId="'.$database->escape($planUserId).'"';
        }
        if (key_exists('planNickName', $param)) {
            $field[] = 'planNickName="'.$database->escape($planNickName).'"';
        }
        if (key_exists('planRealName', $param)) {
            $field[] = 'planRealName="'.$database->escape($planRealName).'"';
        }
        if (key_exists('planMatchType', $param)) {
            $field[] = 'planMatchType="'.$database->escape($planMatchType).'"';
        }
        if (key_exists('planMatchRecommend', $param)) {
            $field[] = 'planMatchRecommend="'.$database->escape($planMatchRecommend).'"';
        }
        if (key_exists('planMatchBeginTime', $param)) {
            $field[] = 'planMatchBeginTime="'.$database->escape($planMatchBeginTime).'"';
        }
        if (key_exists('spreaderUserId', $param)) {
            $field[] = 'spreaderUserId="'.$database->escape($spreaderUserId).'"';
        }
        if (key_exists('spreaderNickName', $param)) {
            $field[] = 'spreaderNickName="'.$database->escape($spreaderNickName).'"';
        }
        if (key_exists('spreaderRealName', $param)) {
            $field[] = 'spreaderRealName="'.$database->escape($spreaderRealName).'"';
        }
        if (key_exists('ticketUserId', $param)) {
            $field[] = 'ticketUserId="'.$database->escape($ticketUserId).'"';
        }
        if (key_exists('ticketNickName', $param)) {
            $field[] = 'ticketNickName="'.$database->escape($ticketNickName).'"';
        }
        if (key_exists('ticketRealName', $param)) {
            $field[] = 'ticketRealName="'.$database->escape($ticketRealName).'"';
        }
        if (key_exists('ticketUnit', $param)) {
            $field[] = 'ticketUnit="'.$database->escape($ticketUnit).'"';
        }
        if (key_exists('ticketMultiple', $param)) {
            $field[] = 'ticketMultiple="'.$database->escape($ticketMultiple).'"';
        }
        if (key_exists('ticketPassType', $param)) {
            $field[] = 'ticketPassType="'.$database->escape($ticketPassType).'"';
        }
        if (key_exists('ticketAppend', $param)) {
            $field[] = 'ticketAppend="'.$database->escape($ticketAppend).'"';
        }
        if (key_exists('ticketStatus', $param)) {
            $field[] = 'ticketStatus="'.$database->escape($ticketStatus).'"';
        }
        if (key_exists('ticketSupplierId', $param)) {
            $field[] = 'ticketSupplierId="'.$database->escape($ticketSupplierId).'"';
        }
        if (key_exists('ticketSupplierName', $param)) {
            $field[] = 'ticketSupplierName="'.$database->escape($ticketSupplierName).'"';
        }
        if (key_exists('ticketPrizeDivideStatus', $param)) {
            $field[] = 'ticketPrizeDivideStatus="'.$database->escape($ticketPrizeDivideStatus).'"';
        }
        if (key_exists('ticketAttachPrizeStatus', $param)) {
            $field[] = 'ticketAttachPrizeStatus="'.$database->escape($ticketAttachPrizeStatus).'"';
        }
        if (key_exists('presentOrderId', $param)) {
            $field[] = 'presentOrderId="'.$database->escape($presentOrderId).'"';
        }
        if (key_exists('presentNum', $param)) {
            $field[] = 'presentNum="'.$database->escape($presentNum).'"';
        }
        if (key_exists('presentReceived', $param)) {
            $field[] = 'presentReceived="'.$database->escape($presentReceived).'"';
        }
        if (key_exists('presentRemark', $param)) {
            $field[] = 'presentRemark="'.$database->escape($presentRemark).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (key_exists('saleTicket', $param)) {
            $field[] = 'saleTicket="'.$database->escape($saleTicket).'"';
        }
        if (key_exists('issue', $param)) {
            $field[] = 'issue="'.$database->escape($issue).'"';
        }
        if (key_exists('lotteryId', $param)) {
            $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
        }
        if (key_exists('lotteryName', $param)) {
            $field[] = 'lotteryName="'.$database->escape($lotteryName).'"';
        }
        if (key_exists('betContent', $param)) {
            $field[] = 'betContent="'.$database->escape($betContent).'"';
        }
        if (key_exists('comboId', $param)) {
            $field[] = 'comboId="'.$database->escape($comboId).'"';
        }
        if (key_exists('matchId', $param)) {
            $field[] = 'matchId="'.$database->escape($matchId).'"';
        }
        if (key_exists('userCouponId', $param)) {
            $field[] = 'userCouponId="'.$database->escape($userCouponId).'"';
        }
        if (key_exists('amount', $param)) {
            $field[] = 'amount="'.$database->escape($amount).'"';
        }
        if (key_exists('status', $param)) {
            $field[] = 'status="'.$database->escape($status).'"';
        }
        if (key_exists('source', $param)) {
            $field[] = 'source="'.$database->escape($source).'"';
        }
        if (key_exists('channel', $param)) {
            $field[] = 'channel="'.$database->escape($channel).'"';
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
        $sql = 'insert into t_order set '.implode(',', $field);
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

    public function updateOrder($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $orderId = (int)$param['orderId'];
        $remark = trim($param['remark']);
        if ($orderId <= 0) {
            $database->close();
            $resp->msg = 'orderId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('remark', $param)) {
            $field[] = 'remark="'.$database->escape($remark).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_order set '.implode(',', $field).' where orderId="'.$orderId.'" limit 1';
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

    public function selectOrderById($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = 'orderId不能为空';
            return $resp;
        }
        $field = 'orderId="'.$orderId.'"';
        if (empty($field)) {
            $resp->msg = '传参有误';
            return $resp;
        }
        $database = requireModule('Database');
        $column = 'userId,nickName,realName,orderId,orderType,planType,planId,planUserId,planNickName,planRealName,planMatchType,planMatchRecommend,planMatchBeginTime,planPrizeStatus,spreaderUserId,spreaderNickName,spreaderRealName,comboId,matchId,userCouponId,amount,status,ticketUserId,ticketNickName,ticketRealName,ticketImg,ticketUnit,ticketMultiple,ticketPassType,ticketAppend,ticketStatus,ticketPrizeAmount,ticketExpectPrizeAmount,ticketSendPrizeAmount,ticketSupplierId,ticketSupplierName,ticketPrizeDivideStatus,ticketPrizeDivideAmount,ticketAttachPrizeStatus,ticketAttachPrizeAmount,ticketPrizeVerifyStatus,presentOrderId,presentNum,presentReceived,presentRemark,publish,saleTicket,issue,lotteryId,lotteryName,betContent,source,channel,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_order where discard=0 and '.$field.' limit 1';
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

    public function selectOrder($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $orderType = $param['orderType'];
        $orderId = $param['orderId'];
        $planType = $param['planType'];
        $planId = $param['planId'];
        $comboId = $param['comboId'];
        $matchId = $param['matchId'];
        $planUserId = (int)$param['planUserId'];
        $planUserName = trim($param['planUserName']);
        $planMatchType = (int)$param['planMatchType'];
        $planPrizeStatus = $param['planPrizeStatus'];
        $spreaderUserId = (int)$param['spreaderUserId'];
        $spreaderUserName = trim($param['spreaderUserName']);
        $status = $param['status'];
        $ticketAppend = (int)$param['ticketAppend'];
        $ticketStatus = $param['ticketStatus'];
        $ticketUserId = (int)$param['ticketUserId'];
        $ticketUserName = trim($param['ticketUserName']);
        $ticketSupplierId = (int)$param['ticketSupplierId'];
        $ticketPrizeDivideStatus = $param['ticketPrizeDivideStatus'];
        $ticketAttachPrizeStatus = $param['ticketAttachPrizeStatus'];
        $ticketPrizeVerifyStatus = $param['ticketPrizeVerifyStatus'];
        $presentOrderId = (int)$param['presentOrderId'];
        $publish = (int)$param['publish'];
        $saleTicket = (int)$param['saleTicket'];
        $issue = trim($param['issue']);
        $lotteryId = $param['lotteryId'];
        $source = (int)$param['source'];
        $channel = (int)$param['channel'];
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $ticketType = (int)$param['ticketType'];
        $nullTicketPrizeAmount = (bool)$param['nullTicketPrizeAmount'];//没填写中奖金额
        $needTicketSupplier = (bool)$param['needTicketSupplier'];//出票商票
        $needReceivedOrder = (bool)$param['needReceivedOrder'];//领取订单
        $needNotReceivedOrder = (bool)$param['needNotReceivedOrder'];//非领取订单
        $presentStatus = (int)$param['presentStatus'];//赠送状态, 1=待领取, 2=待退款
        $orderBy = (int)$param['orderBy'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $justCount = (bool)$param['justCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($userId > 0) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if (key_exists('orderType', $param)) {
            if (is_numeric($orderType)) {
                $orderType = (int)$orderType;
                $field[] = 'orderType="'.$database->escape($orderType).'"';
            } else if (is_array($orderType)) {
                if (count($orderType) > 0) {
                    $orderType = implode(',', $orderType);
                    $field[] = 'orderType in('.$database->escape($orderType).')';
                }
            }
        }
        if (is_numeric($orderId)) {
            $orderId = (int)$orderId;
            if ($orderId > 0) {
                $field[] = 'orderId="'.$database->escape($orderId).'"';
            }
        } else if (is_array($orderId)) {
            $orderId = $this->common->filterIdArray($orderId);
            if (count($orderId) > 0) {
                $orderId = implode(',', $orderId);
                $field[] = 'orderId in('.$database->escape($orderId).')';
            }
        }
        if (is_numeric($planType)) {
            $planType = (int)$planType;
            if ($planType != 0) {
            	$field[] = 'planType="'.$database->escape($planType).'"';
            }
        } else if (is_array($planType)) {
            $planType = $this->common->filterNumArray($planType);
            if (count($planType) > 0) {
                $planType = implode(',', $planType);
                $field[] = 'planType in('.$database->escape($planType).')';
            }
        }
        if (is_numeric($planId)) {
            $planId = (int)$planId;
            if ($planId > 0) {
                $field[] = 'planId="'.$database->escape($planId).'"';
            }
        } else if (is_array($planId)) {
            $planId = $this->common->filterIdArray($planId);
            if (count($planId) > 0) {
                $planId = implode(',', $planId);
                $field[] = 'planId in('.$database->escape($planId).')';
            }
        }
        if (is_numeric($comboId)) {
            $comboId = (int)$comboId;
            if ($comboId > 0) {
                $field[] = 'comboId="'.$database->escape($comboId).'"';
            }
        } else if (is_array($comboId)) {
            $comboId = $this->common->filterIdArray($comboId);
            if (count($comboId) > 0) {
                $comboId = implode(',', $comboId);
                $field[] = 'comboId in('.$database->escape($comboId).')';
            }
        }
        if (is_numeric($matchId)) {
            $matchId = (int)$matchId;
            if ($matchId > 0) {
                $field[] = 'matchId="'.$database->escape($matchId).'"';
            } else if (is_array($matchId)) {
                $matchId = $this->common->filterIdArray($matchId);
                if (count($comboId) > 0) {
                    $matchId = implode(',', $matchId);
                    $field[] = 'matchId in('.$database->escape($matchId).')';
                }
            }
        }
        if ($planMatchType > 0) {
            $field[] = 'planMatchType="'.$database->escape($planMatchType).'"';
        }
        if (is_numeric($planPrizeStatus)) {
            $planPrizeStatus = (int)$planPrizeStatus;
            if ($planPrizeStatus >= 0) {
                $field[] = 'planPrizeStatus="'.$database->escape($planPrizeStatus).'"';
            }
        } else if (is_array($planPrizeStatus)) {
            $planPrizeStatus = $this->common->filterNumArray($planPrizeStatus);
            if (count($planPrizeStatus) > 0) {
                $planPrizeStatus = implode(',', $planPrizeStatus);
                $field[] = 'planPrizeStatus in('.$database->escape($planPrizeStatus).')';
            }
        }
        if ($planUserId > 0) {
            $field[] = 'planUserId="'.$database->escape($planUserId).'"';
        }
        if ($planUserName != '') {
            $field[] = '(planNickName like "%'.$database->escape($planUserName).'%" or planRealName like "%'.$database->escape($planUserName).'%")';
        }
        if ($spreaderUserId > 0) {
            $field[] = 'spreaderUserId="'.$database->escape($spreaderUserId).'"';
        }
        if ($spreaderUserName != '') {
            $field[] = '(spreaderNickName like "%'.$database->escape($spreaderUserName).'%" or spreaderRealName like "%'.$database->escape($spreaderUserName).'%")';
        }
        if (is_numeric($status)) {
            $status = (int)$status;
            if ($status > 0) {
                $field[] = 'status="'.$database->escape($status).'"';
            }
        } else if (is_array($status)) {
            $status = $this->common->filterNumArray($status);
            if (count($status) > 0) {
                $status = implode(',', $status);
                $field[] = 'status in('.$database->escape($status).')';
            }
        }
        if (is_numeric($ticketStatus)) {
            $ticketStatus = (int)$ticketStatus;
            if ($ticketStatus >= 0) {
                $field[] = 'ticketStatus="'.$database->escape($ticketStatus).'"';
            }
        } else if (is_array($ticketStatus)) {
            $ticketStatus = $this->common->filterNumArray($ticketStatus);
            if (count($ticketStatus) > 0) {
                $ticketStatus = implode(',', $ticketStatus);
                $field[] = 'ticketStatus in('.$database->escape($ticketStatus).')';
            }
        }
        if (key_exists('ticketAppend', $param)) {
            $field[] = 'ticketAppend="'.$database->escape($ticketAppend).'"';
        }
        if ($ticketUserId > 0) {
            $field[] = 'ticketUserId="'.$database->escape($ticketUserId).'"';
        }
        if ($ticketUserName != '') {
            $field[] = '(ticketSupplierName like "%'.$database->escape($ticketUserName).'%" or ticketNickName like "%'.$database->escape($ticketUserName).'%" or ticketRealName like "%'.$database->escape($ticketUserName).'%")';
        }
        if ($ticketSupplierId > 0) {
            $field[] = 'ticketSupplierId="'.$database->escape($ticketSupplierId).'"';
        }
        if (key_exists('ticketPrizeDivideStatus', $param)) {
            if (is_numeric($ticketPrizeDivideStatus)) {
                $ticketPrizeDivideStatus = (int)$ticketPrizeDivideStatus;
                $field[] = 'ticketPrizeDivideStatus="'.$database->escape($ticketPrizeDivideStatus).'"';
            } else if (is_array($ticketPrizeDivideStatus)) {
                if (count($ticketPrizeDivideStatus) > 0) {
                    $ticketPrizeDivideStatus = implode(',', $ticketPrizeDivideStatus);
                    $field[] = 'ticketPrizeDivideStatus in('.$database->escape($ticketPrizeDivideStatus).')';
                }
            }
        }
        if (key_exists('ticketAttachPrizeStatus', $param)) {
            if (is_numeric($ticketAttachPrizeStatus)) {
                $ticketAttachPrizeStatus = (int)$ticketAttachPrizeStatus;
                $field[] = 'ticketAttachPrizeStatus="'.$database->escape($ticketAttachPrizeStatus).'"';
            } else if (is_array($ticketAttachPrizeStatus)) {
                if (count($ticketAttachPrizeStatus) > 0) {
                    $ticketAttachPrizeStatus = implode(',', $ticketAttachPrizeStatus);
                    $field[] = 'ticketAttachPrizeStatus in('.$database->escape($ticketAttachPrizeStatus).')';
                }
            }
        }
        if (key_exists('ticketPrizeVerifyStatus', $param)) {
            if (is_numeric($ticketPrizeVerifyStatus)) {
                $ticketPrizeVerifyStatus = (int)$ticketPrizeVerifyStatus;
                $field[] = 'ticketPrizeVerifyStatus="'.$database->escape($ticketPrizeVerifyStatus).'"';
            } else if (is_array($ticketPrizeVerifyStatus)) {
                if (count($ticketPrizeVerifyStatus) > 0) {
                    $ticketPrizeVerifyStatus = implode(',', $ticketPrizeVerifyStatus);
                    $field[] = 'ticketPrizeVerifyStatus in('.$database->escape($ticketPrizeVerifyStatus).')';
                }
            }
        }
        if ($presentOrderId > 0) {
            $field[] = 'presentOrderId="'.$database->escape($presentOrderId).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (key_exists('saleTicket', $param)) {
            $field[] = 'saleTicket="'.$database->escape($saleTicket).'"';
        }
        if (!empty($issue)) {
            $field[] = 'issue="'.$database->escape($issue).'"';
        }
        if (key_exists('lotteryId', $param)) {
            if (is_string($lotteryId)) {
                $lotteryId = trim($lotteryId);
                $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
            } else if (is_array($lotteryId)) {
                $lotteryIdArr = array();
                foreach ($lotteryId as $item) {
                    $lotteryIdArr[] = $database->escape($item);
                }
                $lotteryIdStr = '"' . implode('","', $lotteryIdArr) . '"';
                $field[] = 'lotteryId in('.$lotteryIdStr.')';
            }
        }
        if (key_exists('source', $param)) {
            $field[] = 'source="'.$database->escape($source).'"';
        }
        if (key_exists('channel', $param)) {
            $field[] = 'channel="'.$database->escape($channel).'"';
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
        if (key_exists('nullTicketPrizeAmount', $param)) {
            if ($nullTicketPrizeAmount) {
                $field[] = 'ticketPrizeAmount="0"';
            } else {
                $field[] = 'ticketPrizeAmount!="0"';
            }
        }
        if ($needTicketSupplier) {
            $field[] = 'ticketSupplierId > 0';
        }
        if ($needReceivedOrder) {
            $field[] = 'presentOrderId > 0';
        } else if ($needNotReceivedOrder) {
            $field[] = 'presentOrderId is null';
        }
		if ($ticketType == 1) {
			$field[] = 'planId > 0 and planUserId > 0';
		} else if ($ticketType == 2) {
			$field[] = 'planId <= 0 and planUserId <= 0';
		}
        if ($presentStatus > 0 ) {
            $cTime = date('Y-m-d H:i:s', time() - 3600 * 24 * 30);
            if ($presentStatus == 1) {
                $field[] = 'createTime>="'.$database->escape($cTime).'" and presentNum > presentReceived';
            } else if ($presentStatus == 2) {
                $field[] = 'createTime<"'.$database->escape($cTime).'" and presentNum > presentReceived';
            }
        }
        $field = implode(' and ', $field);
        $data = array();
        if ($needCount || $justCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalAmount,sum(ticketSendPrizeAmount) as totalTicketSendPrizeAmount,sum(ticketExpectPrizeAmount) as totalTicketExpectPrizeAmount,sum(ticketPrizeAmount) as totalTicketPrizeAmount,sum(ticketAttachPrizeAmount) as totalTicketAttachPrizeAmount from t_order where '.$field;
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
            $data['totalTicketSendPrizeAmount'] = (int)$info["totalTicketSendPrizeAmount"];
            $data['totalTicketExpectPrizeAmount'] = (int)$info["totalTicketExpectPrizeAmount"];
            $data['totalTicketPrizeAmount'] = (int)$info["totalTicketPrizeAmount"];
            $data['totalTicketAttachPrizeAmount'] = (int)$info["totalTicketAttachPrizeAmount"];
        }
        if (!$justCount) {
            $orderByField = 'order by orderId desc';
            if ($orderBy == 1) {
                $orderByField = 'order by orderId asc';
            } else if ($orderBy == 2) {
                $orderByField = 'order by amount desc';
            }
            $page = '';
            if ($pageNum > 0 && $pageSize > 0) {
                $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
            }
            $column = 'userId,nickName,realName,orderId,orderType,planType,planId,planUserId,planNickName,planRealName,planMatchType,planMatchRecommend,planMatchBeginTime,planPrizeStatus,spreaderUserId,spreaderNickName,spreaderRealName,comboId,matchId,userCouponId,amount,status,ticketUserId,ticketNickName,ticketRealName,ticketImg,ticketUnit,ticketMultiple,ticketPassType,ticketAppend,ticketStatus,ticketPrizeAmount,ticketExpectPrizeAmount,ticketSendPrizeAmount,ticketSupplierId,ticketSupplierName,ticketPrizeDivideStatus,ticketPrizeDivideAmount,ticketAttachPrizeStatus,ticketAttachPrizeAmount,ticketPrizeVerifyStatus,presentOrderId,presentNum,presentReceived,presentRemark,publish,saleTicket,issue,lotteryId,lotteryName,betContent,source,channel,remark,createTime,lastTime';
            $sql = 'select '.$column.' from t_order where '.$field.' '.$orderByField.' '.$page;
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
        }
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectOrderBatchById($batchId) {
        $resp = requireModule('Resp');
        $batchId = (int)$batchId;
        if ($batchId <= 0) {
            $resp->msg = 'batchId不能为空';
            return $resp;
        }
        $field = 'batchId="'.$batchId.'"';
        if (empty($field)) {
            $resp->msg = '传参有误';
            return $resp;
        }
        $database = requireModule('Database');
        $column = 'batchId,userId,nickName,realName,orderId,amount,status,tradeType,tradeNo,tradeTime,source,channel,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_order_batch where discard=0 and '.$field.' limit 1';
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

    public function selectOrderBatch($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $batchId = (int)$param['batchId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $status = $param['status'];
        $source = (int)$param['source'];
        $channel = (int)$param['channel'];
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $justCount = (bool)$param['justCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($batchId > 0) {
            $field[] = 'batchId="'.$database->escape($batchId).'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if (is_numeric($status)) {
            $status = (int)$status;
            if ($status > 0) {
                $field[] = 'status="'.$database->escape($status).'"';
            }
        } else if (is_array($status)) {
            $status = $this->common->filterNumArray($status);
            if (count($status) > 0) {
                $status = implode(',', $status);
                $field[] = 'status in('.$database->escape($status).')';
            }
        }
        if (key_exists('source', $param)) {
            $field[] = 'source="'.$database->escape($source).'"';
        }
        if (key_exists('channel', $param)) {
            $field[] = 'channel="'.$database->escape($channel).'"';
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
        $data = array();
        if ($needCount || $justCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalAmount from t_order_batch where '.$field;
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
        if (!$justCount) {
            $page = '';
            if ($pageNum > 0 && $pageSize > 0) {
                $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
            }
            $column = 'batchId,userId,nickName,realName,orderId,amount,status,tradeType,tradeNo,tradeTime,source,channel,remark,createTime,lastTime';
            $sql = 'select '.$column.' from t_order_batch where '.$field.' order by batchId desc '.$page;
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
        }
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectMaxTicketPrizeAmount($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = $param['userId'];
        $field = array();
        $field[] = 'discard=0';
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
        if (count($field) <= 1) {
            $database->close();
            $resp->msg = '参数异常';
            return $resp;
        }
        $field = implode(' and ', $field);
        $column = 'userId,max(ticketPrizeAmount) as ticketPrizeAmount';
        $sql = 'select '.$column.' from t_order where '.$field.' group by userId';
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

    public function selectFollowAmount($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $orderId = $param['orderId'];
        $field = array();
        //订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        //类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $field[] = 'discard=0 and orderType=3 and planType=-1 and status in(2,4) and ticketStatus in(2,3,4,5,6,7,8)';
        if (is_numeric($orderId)) {
            $orderId = (int)$orderId;
            if ($orderId > 0) {
                $field[] = 'planId="'.$database->escape($orderId).'"';
            }
        } else if (is_array($orderId)) {
            $orderId = $this->common->filterIdArray($orderId);
            if (count($orderId) > 0) {
                $orderId = implode(',', $orderId);
                $field[] = 'planId in('.$database->escape($orderId).')';
            }
        }
        if (count($field) <= 1) {
            $database->close();
            $resp->msg = '参数异常';
            return $resp;
        }
        $field = implode(' and ', $field);
        $column = 'planId,sum(amount) as amount';
        $sql = 'select '.$column.' from t_order where '.$field.' group by planId';
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

    public function getTicketSupplier($param) {
        $resp = requireModule('Resp');
        $userId = (int)$param['userId'];
        $refuseUserId = (int)$param['refuseUserId'];
        $refuseOrderId = (int)$param['refuseOrderId'];
        $planType = (int)$param['planType'];//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        $matchType = (int)$param['matchType'];//比赛类型, 1=足球, 2=篮球
        $matchLength = (int)$param['matchLength'];
        $ticketMultiple = (int)$param['ticketMultiple'];
        $ticketPassType = explode(',', trim($param['ticketPassType']));
        $amount = (int)$param['amount'];
        $lotteryId = trim($param['lotteryId']);
        global $curEnv;
        //电子票条件：篮球票，大于等于4串1的票，小于10倍的票，大于等于200元的票
        if ($curEnv != 'dist' || in_array($userId, array(106227)) || $planType != 0 || $matchType == 2 || $matchLength >= 4 || $ticketMultiple < 10 || $amount >= 20000 || (is_array($ticketPassType) && (count($ticketPassType) > 1 || (count($ticketPassType) == 1 && $ticketPassType[0] != $matchLength.'x1') || in_array($lotteryId, array('SSQ','JSK3','DLT','GX11X5','FC3D','JZYP','SJBGJ','SJBGYJ'))))) {
            $data = array();
            $data['userId'] = 0;
            $data['nickName'] = '';
            $data['realName'] = '';
            $data['ticketSupplierId'] = 1;
            $data['ticketSupplierName'] = '纵贯出票';
            $resp->data = $data;
            $resp->errCode = 0;
            $resp->msg = '成功';
            return $resp;
        }
        $database = requireModule('Database');
        $refuseUserIdArr = array();//拒绝此订单id的用户
        if ($refuseUserId > 0 && $refuseOrderId > 0) {
            $refuseUserIdArr[] = $refuseUserId;
            $sql = 'select userId from t_ticket_refuse where orderId='.$refuseOrderId;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询拒绝出票失败';
                return $resp;
            }
            while($info = $database->get($result)){
                $refuseUserIdArr[] = (int)$info['userId'];
            }
        }
        $groupId = 8;
        $sql = 'select * from t_group where groupId='.$groupId.' limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询分组失败';
            return $resp;
        }
        $groupData = $database->get($result);
        $database->free($result);
        $relateId = trim($groupData['relateId']);
        if (empty($relateId)) {
            $database->close();
            $data = array();
            $data['userId'] = 0;
            $data['nickName'] = '';
            $data['realName'] = '';
            $data['ticketSupplierId'] = 1;
            $data['ticketSupplierName'] = '纵贯出票';
            $resp->data = $data;
            $resp->errCode = 0;
            $resp->msg = '成功';
            return $resp;
        }
        $relateIdArr = explode(',', $relateId);
        $relateIdArr = array_diff($relateIdArr, $refuseUserIdArr);
        $relateIdArr = $this->common->filterIdArray($relateIdArr);
        if (count($relateIdArr) <= 0) {
            $database->close();
            $data = array();
            $data['userId'] = 0;
            $data['nickName'] = '';
            $data['realName'] = '';
            $data['ticketSupplierId'] = 1;
            $data['ticketSupplierName'] = '纵贯出票';
            $resp->data = $data;
            $resp->errCode = 0;
            $resp->msg = '成功';
            return $resp;
        }
        $today = date('Y-m-d').' 00:00:00';
        $tomorrow = date('Y-m-d', time() + 24 * 3600).' 00:00:00';
        $sql = 'select count(*) as count,ticketUserId from t_order where orderType=3 and status=2 and (createTime >= "'.$today.'" and createTime < "'.$tomorrow.'") and ticketUserId in('.$database->escape(implode(',', $relateIdArr)).') group by ticketUserId order by count asc';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        //分组里的用户map
        $ticketUserMap = array();
        foreach ($relateIdArr as $userId) {
            $userId = (int)$userId;
            if ($userId > 0) {
                $ticketUserMap[$userId] = 0;
            }
        }
        while($info = $database->get($result)){
            $ticketUserId = (int)$info['ticketUserId'];
            $count = (int)$info['count'];
            $ticketUserMap[$ticketUserId] = $count;
        }
        $database->free($result);
        $userId = 0;
        /*if (count($ticketUserMap) == 2 && key_exists('5', $ticketUserMap) && key_exists('2034', $ticketUserMap)) {
            $count5 = (int)$ticketUserMap['5'];
            $count2034 = (int)$ticketUserMap['2034'];
            $count = $count5 + $count2034;
            if ($count % 3 == 0) {
                $userId = 2034;
            } else {
                $userId = 5;
            }
        } else {*/
        asort($ticketUserMap);//按值(count)从小到大排序
        $userIdArr = array_keys($ticketUserMap);//取得键名数组
        //拿到count最小的userId
        if (is_array($userIdArr) && count($userIdArr) > 0) {
            $userId = $userIdArr[0];
        }
        //}
        if ($userId <= 0) {
            $database->close();
            $resp->msg = '获取用户失败';
            return $resp;
        }
        $sql = 'select userId,nickName,realName from t_user where userId='.$userId.' limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询用户失败';
            return $resp;
        }
        $userData = $database->get($result);
        $database->free($result);
        if (empty($userData)) {
            $database->close();
            $resp->msg = '查询用户数据异常';
            return $resp;
        }
        $data = array();
        $data['userId'] = $userData['userId'];
        $data['nickName'] = $userData['nickName'];
        $data['realName'] = $userData['realName'];
        $data['ticketSupplierId'] = 0;
        $data['ticketSupplierName'] = '';
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}