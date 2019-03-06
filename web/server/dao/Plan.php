<?php
namespace dao;
class Plan {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertPlan($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
        $planType = (int)$param['planType'];
        $matchType = (int)$param['matchType'];
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$title = trim($param['title']);
		$lotteryId = trim($param['lotteryId']);
		$lotteryName = trim($param['lotteryName']);
		$issue = trim($param['issue']);
		$content = trim($param['content']);
		$amount = (int)$param['amount'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		$saleTicket = (int)$param['saleTicket'];
		$resourceId = $param['resourceId'];
		$matchRecommend = trim($param['matchRecommend']);
		$betContent = trim($param['betContent']);
        $matchLength = (int)$param['matchLength'];
		$matchBeginTime = trim($param['matchBeginTime']);
		$saleTime = trim($param['saleTime']);
		$costAmount = (int)$param['costAmount'];
		$field = array();
        if (key_exists('planType', $param)) {
            $field[] = 'planType="'.$database->escape($planType).'"';
        }
        if (key_exists('matchType', $param)) {
            $field[] = 'matchType="'.$database->escape($matchType).'"';
        }
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
        if (key_exists('lotteryId', $param)) {
            $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
        }
        if (key_exists('lotteryName', $param)) {
            $field[] = 'lotteryName="'.$database->escape($lotteryName).'"';
        }
        if (key_exists('issue', $param)) {
            $field[] = 'issue="'.$database->escape($issue).'"';
        }
		if (key_exists('content', $param)) {
			$field[] = 'content="'.$database->escape($content).'"';
		}
		if (key_exists('amount', $param)) {
			$field[] = 'amount="'.$database->escape($amount).'"';
		}
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
        if (key_exists('saleTicket', $param)) {
            $field[] = 'saleTicket="'.$database->escape($saleTicket).'"';
        }
		if (key_exists('resourceId', $param) && is_array($resourceId)) {
			$field[] = 'resourceId="'.$database->escape(implode(',', $this->common->filterIdArray($resourceId))).'"';
		}
		if (key_exists('matchRecommend', $param)) {
			$field[] = 'matchRecommend="'.$database->escape($matchRecommend).'"';
		}
        if (key_exists('betContent', $param)) {
            $field[] = 'betContent="'.$database->escape($betContent).'"';
        }
        if (key_exists('matchLength', $param)) {
            $field[] = 'matchLength="'.$database->escape($matchLength).'"';
        }
		if (key_exists('matchBeginTime', $param)) {
			$field[] = 'matchBeginTime="'.$database->escape($matchBeginTime).'"';
		}
        if (key_exists('saleTime', $param)) {
            $field[] = 'saleTime="'.$database->escape($saleTime).'"';
        }
        if (key_exists('costAmount', $param)) {
            $field[] = 'costAmount="'.$database->escape($costAmount).'"';
        }
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_plan set '.implode(',', $field);
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

	public function updatePlan($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$planId = (int)$param['planId'];
		$title = trim($param['title']);
		$content = trim($param['content']);
		$amount = (int)$param['amount'];
        $rich = (int)$param['rich'];
		$publish = (int)$param['publish'];
		$remark = trim($param['remark']);
		$resourceId = $param['resourceId'];
		$matchRecommend = trim($param['matchRecommend']);
		$matchBeginTime = trim($param['matchBeginTime']);
		if ($planId <= 0) {
			$database->close();
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('title', $param)) {
			$field[] = 'title="'.$database->escape($title).'"';
		}
		if (key_exists('content', $param)) {
			$field[] = 'content="'.$database->escape($content).'"';
		}
        if (key_exists('rich', $param)) {
            $field[] = 'rich="'.$database->escape($rich).'"';
        }
		if (key_exists('amount', $param)) {
			$field[] = 'amount="'.$database->escape($amount).'"';
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
		if (key_exists('matchRecommend', $param)) {
			$field[] = 'matchRecommend="'.$database->escape($matchRecommend).'"';
		}
		if (key_exists('matchBeginTime', $param)) {
			$field[] = 'matchBeginTime="'.$database->escape($matchBeginTime).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_plan set '.implode(',', $field).' where planId="'.$planId.'" limit 1';
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

	public function deletePlan($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_plan set discard=1 where planId="'.$planId.'" limit 1';
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
	
	public function updatePlanUpCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_plan set upCount=upCount+1 where planId="'.$planId.'" limit 1';
		$database->execute($sql);
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function updatePlanDownCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_plan set downCount=downCount+1 where planId="'.$planId.'" limit 1';
		$database->execute($sql);
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function updatePlanShareCount($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_plan set shareCount=shareCount+1 where planId="'.$planId.'" limit 1';
		$database->execute($sql);
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}
	
	//更新阅读量
	public function updatePlanReadCount($planId){
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId不能为空';
			return $resp;
		}
		$database = requireModule('Database');
        $mockReadCount = mt_rand(0,9);
		$sql = 'update t_plan set readCount=readCount+1,mockReadCount=mockReadCount+'.$mockReadCount.' where planId="'.$planId.'" limit 1';
		$database->execute($sql);
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectPlanById($planId) {
		$resp = requireModule('Resp');
		$planId = (int)$planId;
		if ($planId <= 0) {
			$resp->msg = 'planId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'planId="'.$database->escape($planId).'"';
		$column = 'planType,matchType,userId,nickName,realName,planId,title,lotteryId,lotteryName,issue,content,amount,upCount,downCount,shareCount,readCount,mockReadCount,rich,publish,remark,resourceId,saleTicket,betContent,matchRecommend,matchLength,matchBeginTime,saleTime,prizeStatus,costAmount,prizeAmount,createTime,lastTime';
		$sql = 'select '.$column.' from t_plan where discard=0 and '.$field.' limit 1';
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

	public function selectPlan($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$publish = (int)$param['publish'];
        $planType = (int)$param['planType'];
        $matchType = $param['matchType'];
		$userId = $param['userId'];
		$userName = trim($param['userName']);
		$planId = $param['planId'];
		$title = trim($param['title']);
		$lotteryId = trim($param['lotteryId']);
		$issue = trim($param['issue']);
		$planStatus = (int)$param['planStatus'];
		$matchStatus = (int)$param['matchStatus'];
		$prizeStatus = $param['prizeStatus'];
        $rich = $param['rich'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$needSale = (bool)$param['needSale'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$orderBy = (int)$param['orderBy'];
        $saleTicket = (int)$param['saleTicket'];
        $matchLength = (int)$param['matchLength'];
        $recommendType = (int)$param['recommendType'];
		$field = array();
		$field[] = 'discard=0';
		if (key_exists('publish', $param)) {
			$field[] = 'publish="'.$database->escape($publish).'"';
		}
        if ($planType > 0) {
            $field[] = 'planType="'.$database->escape($planType).'"';
        }
        if (is_numeric($matchType)) {
            $matchType = (int)$matchType;
            if ($matchType > 0) {
                $field[] = 'matchType="'.$database->escape($matchType).'"';
            }
        } else if (is_array($matchType)) {
            $matchType = $this->common->filterIdArray($matchType);
            if (count($matchType) > 0) {
                $matchType = implode(',', $matchType);
                $field[] = 'matchType in(' . $database->escape($matchType) . ')';
            }
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
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
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
		if ($title != '') {
			$field[] = 'title like "%'.$database->escape($title).'%"';
		}
		//planStatus	方案状态：1=未结束, 2=已结束
        if ($planStatus == 1) {
            $field[] = 'saleTime>now()';
        } else if ($planStatus == 2) {
            $field[] = 'saleTime<=now()';
        }
		if ($matchStatus == 1) {
			//1=未开赛
			$field[] = 'matchBeginTime>now()';
		} else if ($matchStatus == 2) {
			//比赛中
			$field[] = 'matchBeginTime<=now() and unix_timestamp()<(unix_timestamp(matchBeginTime)+7200)';
		} else if ($matchStatus == 3) {
			//已结束
			$field[] = '(unix_timestamp(matchBeginTime)+7200)<unix_timestamp()';
		} else if ($matchStatus == 4) {
			//未开赛+比赛中
			$field[] = 'unix_timestamp()<(unix_timestamp(matchBeginTime)+7200)';
		}
		if (key_exists('prizeStatus', $param)) {
			if (is_numeric($prizeStatus)) {
				$field[] = 'prizeStatus="'.$database->escape($prizeStatus).'"';
			} else if (is_array($prizeStatus)) {
				$prizeStatus = $this->common->filterNumArray($prizeStatus);
				$prizeStatus = implode(',', $prizeStatus);
				$field[] = 'prizeStatus in('.$database->escape($prizeStatus).')';
			}
		}
		if (key_exists('rich', $param)) {
            $field[] = 'rich="'.$database->escape($rich).'"';
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
		if ($needSale) {
			$field[] = '(matchBeginTime>now() or (matchBeginTime<=now() and unix_timestamp()<(unix_timestamp(matchBeginTime)+7200)))';
		}
        if (key_exists('saleTicket', $param)) {
            $field[] = 'saleTicket="'.$database->escape($saleTicket).'"';
		}
		if (key_exists('matchLength', $param)) {
            $field[] = 'matchLength="'.$database->escape($matchLength).'"';
        }
        if ($recommendType == 1) {
            $field[] = 'matchLength=1';
        } else if ($recommendType == 2){
            $field[] = 'matchLength>1';
        }
        if (key_exists('lotteryId', $param)) {
            $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
        }
        if (key_exists('issue', $param)) {
            $field[] = 'issue="'.$database->escape($issue).'"';
        }
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_plan where '.$field;
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
		$orderByField = 'order by planId desc';
        if ($planStatus == 1) {
            //未结束
            $orderByField = 'order by saleTime asc, planId desc';
        } else if ($planStatus == 2) {
            //已经结束
            $orderByField = 'order by saleTime desc, planId desc';
        }
		if ($needSale || $matchStatus > 0) {
			if ($matchStatus == 3) {
				$orderByField = 'order by matchBeginTime desc, planId desc';
			} else {
				$orderByField = 'order by matchBeginTime asc, planId desc';
			}
		}
		if ($orderBy == 1) {
			$orderByField = 'order by planId desc';
		}
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
		$column = 'planType,matchType,userId,nickName,realName,planId,title,lotteryId,lotteryName,issue,content,amount,upCount,downCount,shareCount,readCount,mockReadCount,rich,publish,remark,resourceId,saleTicket,betContent,matchRecommend,matchLength,matchBeginTime,saleTime,prizeStatus,costAmount,prizeAmount,createTime,lastTime';
		$sql = 'select '.$column.' from t_plan where '.$field.' '.$orderByField.' '.$page;
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