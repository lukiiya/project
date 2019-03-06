<?php
namespace dao;
class Activity {
	private $common;
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function selectActivityById($activityId) {
		$resp = requireModule('Resp');
		$activityId = (int)$activityId;
		if ($activityId <= 0) {
			$resp->msg = 'activityId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'activityId="'.$database->escape($activityId).'"';
		$column = 'activityId,activityName,beginTime,endTime,sumAmount,sumCount,amount,count,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_activity where discard=0 and '.$field.' limit 1';
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

	public function selectActivity($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$activityId = (int)$param['activityId'];
		$activityName = trim($param['activityName']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($activityId > 0) {
			$field[] = 'activityId="'.$activityId.'"';
		}
		if ($activityName != '') {
			$field[] = '(activityName like "%'.$database->escape($activityName).'%")';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_activity where '.$field;
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
		$column = 'activityId,activityName,beginTime,endTime,sumAmount,sumCount,amount,count,remark,createTime,lastTime';
		$sql = 'select '.$column.' from t_activity where '.$field.' order by activityId desc '.$page;
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

	public function selectActivityHongBao($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$hongbaoId = (int)$param['hongbaoId'];
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$mobile = trim($param['mobile']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($hongbaoId > 0) {
			$field[] = 'hongbaoId="'.$hongbaoId.'"';
		}
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if (!empty($mobile)) {
			$field[] = 'mobile="'.$mobile.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount,sum(presentAmount) as totalAmount from t_activity_hongbao where '.$field;
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
		$column = 'hongbaoId,activityId,activityName,userId,nickName,realName,mobile,presentAmount,createTime,lastTime';
		$sql = 'select '.$column.' from t_activity_hongbao where '.$field.' order by hongbaoId desc '.$page;
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

    public function selectActivityTurnplate($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $turnplateId = (int)$param['turnplateId'];
        $activityId = (int)$param['activityId'];
        $orderId = (int)$param['orderId'];
        $code = trim($param['code']);
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $prizeName = trim($param['prizeName']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($activityId > 0) {
            $field[] = 'activityId="'.$activityId.'"';
        }
        if ($turnplateId > 0) {
            $field[] = 'turnplateId="'.$turnplateId.'"';
        }
        if ($orderId > 0) {
            $field[] = 'orderId="'.$orderId.'"';
        }
        if ($code != '') {
            $field[] = 'code="'.$code.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($prizeName != '') {
            $field[] = '(prizeName like "%'.$database->escape($prizeName).'%")';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(presentAmount) as totalAmount from t_activity_turnplate where '.$field;
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
        $column = 'turnplateId,activityId,activityName,orderId,code,userId,nickName,realName,prizeName,presentAmount,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_turnplate where '.$field.' order by turnplateId desc '.$page;
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

    public function selectActivityCharge($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $chargeId = (int)$param['chargeId'];
        $financeType = (int)$param['financeType'];
        $activityId = (int)$param['activityId'];
        $orderId = (int)$param['orderId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($chargeId > 0) {
            $field[] = 'chargeId="'.$chargeId.'"';
        }
        if (key_exists('financeType', $param)) {
            $field[] = 'financeType="'.$financeType.'"';
        }
        if ($activityId > 0) {
            $field[] = 'activityId="'.$activityId.'"';
        }
        if ($orderId > 0) {
            $field[] = 'orderId="'.$orderId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalAmount,sum(presentAmount) as totalPresentAmount from t_activity_charge where '.$field;
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
            $data['totalPresentAmount'] = (int)$info["totalPresentAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'chargeId,financeType,activityId,activityName,orderId,userId,nickName,realName,amount,presentAmount,remark,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_charge where '.$field.' order by chargeId desc '.$page;
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

    public function selectActivityHongBao2017ChunJie($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $hongbaoId = (int)$param['hongbaoId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $mobile = trim($param['mobile']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($hongbaoId > 0) {
            $field[] = 'hongbaoId="'.$hongbaoId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if (!empty($mobile)) {
            $field[] = 'mobile="'.$mobile.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(presentAmount) as totalPresentAmount,sum(presentTicketAmount) as totalPresentTicketAmount from t_activity_hongbao_2017_chunjie where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalPresentAmount'] = (int)$info["totalPresentAmount"];
            $data['totalPresentTicketAmount'] = (int)$info["totalPresentTicketAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'hongbaoId,activityId,activityName,userId,nickName,realName,mobile,presentAmount,presentTicketAmount,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_hongbao_2017_chunjie where '.$field.' order by hongbaoId desc '.$page;
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

    public function selectActivityHongBao2018ChunJie($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $hongbaoId = (int)$param['hongbaoId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $period = (int)$param['period'];
        $status = (int)$param['status'];
        $presentTicketAmount = $param['presentTicketAmount'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($hongbaoId > 0) {
            $field[] = 'hongbaoId="'.$hongbaoId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($period > 0) {
            $field[] = 'period="'.$period.'"';
        }
        if ($status == 1) {
            //未领取
            $field[] = 'userId = 0';
        } else if ($status == 2) {
            //已领取
            $field[] = 'userId > 0';
        }
        if (key_exists('presentTicketAmount', $param)) {
            if (is_numeric($presentTicketAmount)) {
                $presentTicketAmount = (int)$presentTicketAmount;
                if ($presentTicketAmount > 0) {
                    $field[] = 'presentTicketAmount="'.$database->escape($presentTicketAmount).'"';
                }
            } else if (is_array($presentTicketAmount)) {
                $presentTicketAmount = $this->common->filterIdArray($presentTicketAmount);
                if (count($presentTicketAmount) > 0) {
                    $presentTicketAmount = implode(',', $presentTicketAmount);
                    $field[] = 'presentTicketAmount in('.$database->escape($presentTicketAmount).')';
                }
            }
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(presentTicketAmount) as totalPresentTicketAmount from t_activity_hongbao_2018_chunjie where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalPresentTicketAmount'] = (int)$info["totalPresentTicketAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'hongbaoId,activityId,activityName,userId,nickName,realName,period,presentTicketAmount,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_hongbao_2018_chunjie where '.$field.' order by hongbaoId desc '.$page;
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

    public function selectActivityConfederationsCupUser($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $rowId = (int)$param['rowId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($rowId > 0) {
            $field[] = 'rowId="'.$rowId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%")';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(presentAmount) as totalPresentAmount from t_activity_confederations_cup_user where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalPresentAmount'] = (int)$info["totalPresentAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'rowId,activityId,activityName,userId,nickName,presentAmount,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_confederations_cup_user where '.$field.' order by rowId desc '.$page;
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


    public function selectActivityConfederationsCup($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $guessId = (int)$param['guessId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $teamId = (int)$param['teamId'];
        $status = (int)$param['status'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($guessId > 0) {
            $field[] = 'guessId="'.$guessId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($teamId > 0) {
            $field[] = 'teamId="'.$teamId.'"';
        }
        if (key_exists('status', $param)) {
            $field[] = 'status="'.$status.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_activity_confederations_cup where '.$field;
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
        $column = 'guessId,activityId,activityName,userId,nickName,realName,teamId,teamName,status,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_confederations_cup where '.$field.' order by guessId desc '.$page;
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

    public function selectActivityConfederationsCupStatistics() {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $data = array();
        //总数查询
        $sql = 'select count(*) as totalCount from t_activity_confederations_cup';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        $info = $database->get($result);
        $database->free($result);
        $data['totalCount'] = (int)$info["totalCount"];
        //列表查询
        $sql = 'select count(*) as totalCount,teamId,teamName from t_activity_confederations_cup group by teamId';
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

    public function selectActivityAttachPrize($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $attachPrizeId = (int)$param['attachPrizeId'];
        $activityId = (int)$param['activityId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $orderId = (int)$param['orderId'];
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($attachPrizeId > 0) {
            $field[] = 'attachPrizeId="'.$attachPrizeId.'"';
        }
        if ($activityId > 0) {
            $field[] = 'activityId="'.$activityId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($orderId > 0) {
            $field[] = 'orderId="'.$orderId.'"';
        }
        if ($issue != '') {
            $field[] = 'issue="'.$issue.'"';
        }
        if ($lotteryId != '') {
            $field[] = 'lotteryId="'.$lotteryId.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(attachPrizeAmount) as totalAttachPrizeAmount from t_activity_attach_prize where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalAttachPrizeAmount'] = (int)$info["totalAttachPrizeAmount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'attachPrizeId,activityId,activityName,userId,nickName,realName,orderId,issue,lotteryId,lotteryName,attachPrizeAmount,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_attach_prize where '.$field.' order by attachPrizeId desc '.$page;
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

    public function selectActivityHongBaoDaily($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $hongbaoId = (int)$param['hongbaoId'];
        $type = (int)$param['type'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $status = (int)$param['status'];
        $amount = $param['amount'];
        $beginTime = trim($param['beginTime']);
        $endTime = trim($param['endTime']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($hongbaoId > 0) {
            $field[] = 'hongbaoId="'.$hongbaoId.'"';
        }
        if ($type > 0) {
            $field[] = 'type="'.$type.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($status == 1) {
            //未领取
            $field[] = 'userId = 0';
        } else if ($status == 2) {
            //已领取
            $field[] = 'userId > 0';
        }
        if (key_exists('amount', $param)) {
            if (is_numeric($amount)) {
                $amount = (int)$amount;
                if ($amount > 0) {
                    $field[] = 'amount="'.$database->escape($amount).'"';
                }
            } else if (is_array($amount)) {
                $amount = $this->common->filterIdArray($amount);
                if (count($amount) > 0) {
                    $amount = implode(',', $amount);
                    $field[] = 'amount in('.$database->escape($amount).')';
                }
            }
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
        if ($needCount) {
            $sql = 'select count(*) as totalCount,sum(amount) as totalamount from t_activity_hongbao_daily where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
            $data['totalAmount'] = (int)$info["totalamount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'hongbaoId,activityId,activityName,type,userId,nickName,realName,amount,couponId,createTime,lastTime';
        $sql = 'select '.$column.' from t_activity_hongbao_daily where '.$field.' order by hongbaoId desc '.$page;
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