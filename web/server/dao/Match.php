<?php
namespace dao;
class Match {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function insertMatch($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$type = (int)$param['type'];
		$number = trim($param['number']);
		$league = trim($param['league']);
		$home = trim($param['home']);
		$away = trim($param['away']);
		$homeLogoImg = trim($param['homeLogoImg']);
		$awayLogoImg = trim($param['awayLogoImg']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$saleTime = trim($param['saleTime']);
		$result = trim($param['result']);
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('number', $param)) {
			$field[] = 'number="'.$database->escape($number).'"';
		}
		if (key_exists('league', $param)) {
			$field[] = 'league="'.$database->escape($league).'"';
		}
		if (key_exists('home', $param)) {
			$field[] = 'home="'.$database->escape($home).'"';
		}
		if (key_exists('away', $param)) {
			$field[] = 'away="'.$database->escape($away).'"';
		}
		if (key_exists('homeLogoImg', $param)) {
			$field[] = 'homeLogoImg="'.$database->escape($homeLogoImg).'"';
		}
		if (key_exists('awayLogoImg', $param)) {
			$field[] = 'awayLogoImg="'.$database->escape($awayLogoImg).'"';
		}
		if (key_exists('beginTime', $param)) {
			$field[] = 'beginTime="'.$database->escape($beginTime).'"';
		}
		if (key_exists('endTime', $param)) {
			$field[] = 'endTime="'.$database->escape($endTime).'"';
		}
		if (key_exists('saleTime', $param)) {
			$field[] = 'saleTime="'.$database->escape($saleTime).'"';
		}
		if (key_exists('result', $param)) {
			$field[] = 'result="'.$database->escape($result).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_match set '.implode(',', $field);
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

	public function updateMatch($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$matchId = (int)$param['matchId'];
		$type = (int)$param['type'];
		$number = trim($param['number']);
		$league = trim($param['league']);
		$home = trim($param['home']);
		$away = trim($param['away']);
		$homeLogoImg = trim($param['homeLogoImg']);
		$awayLogoImg = trim($param['awayLogoImg']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$saleTime = trim($param['saleTime']);
		$halfResult = trim($param['halfResult']);
		$result = trim($param['result']);
		if ($matchId <= 0) {
			$database->close();
			$resp->msg = 'matchId不能为空';
			return $resp;
		}
		$field = array();
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('number', $param)) {
			$field[] = 'number="'.$database->escape($number).'"';
		}
		if (key_exists('league', $param)) {
			$field[] = 'league="'.$database->escape($league).'"';
		}
		if (key_exists('home', $param)) {
			$field[] = 'home="'.$database->escape($home).'"';
		}
		if (key_exists('away', $param)) {
			$field[] = 'away="'.$database->escape($away).'"';
		}
		if (key_exists('homeLogoImg', $param)) {
			$field[] = 'homeLogoImg="'.$database->escape($homeLogoImg).'"';
		}
		if (key_exists('awayLogoImg', $param)) {
			$field[] = 'awayLogoImg="'.$database->escape($awayLogoImg).'"';
		}
		if (key_exists('beginTime', $param)) {
			$field[] = 'beginTime="'.$database->escape($beginTime).'"';
		}
		if (key_exists('endTime', $param)) {
			$field[] = 'endTime="'.$database->escape($endTime).'"';
		}
		if (key_exists('saleTime', $param)) {
			$field[] = 'saleTime="'.$database->escape($saleTime).'"';
		}
		if (key_exists('halfResult', $param)) {
			$field[] = 'halfResult="'.$database->escape($halfResult).'"';
		}
		if (key_exists('result', $param)) {
			$field[] = 'result="'.$database->escape($result).'"';
		}
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'update t_match set '.implode(',', $field).' where matchId="'.$matchId.'" limit 1';
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

	public function selectMatchById($matchId) {
		$resp = requireModule('Resp');
		$matchId = (int)$matchId;
		if ($matchId <= 0) {
			$resp->msg = 'matchId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'matchId="'.$database->escape($matchId).'"';
		$column = 'matchId,type,number,league,home,away,homeLogoImg,awayLogoImg,beginTime,endTime,saleTime,result,halfResult,commonMatchId,sportteryMatchId,sportteryHomeTeamId,sportteryAwayTeamId,sportteryLeagueInfo,sportteryHalfResult,sportteryResult,sportteryResultTime,okoooMatchId,okoooHalfResult,okoooResult,okoooResultTime,leidataMatchId,leidataHalfResult,leidataResult,leidataResultTime,winBetRate,drawBetRate,loseBetRate,planId,orderId,planCount,orderCount,attachPrize,live,createTime,lastTime';
		$sql = 'select '.$column.' from t_match where discard=0 and '.$field.' limit 1';
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

	public function selectMatch($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$matchId = $param['matchId'];
		$type = (int)$param['type'];
		$number = trim($param['number']);
		$league = $param['league'];
		$home = trim($param['home']);
		$away = trim($param['away']);
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
        $saleTime = trim($param['saleTime']);
		$result = trim($param['result']);
		$status = (int)$param['status'];
		$nullResult = (bool)$param['nullResult'];//空赛果
		$nullSportteryResult = (bool)$param['nullSportteryResult'];
		$nullOkoooResult = (bool)$param['nullOkoooResult'];
		$nullLeidataResult = (bool)$param['nullLeidataResult'];
		$needHot = (bool)$param['needHot'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$orderBy = (int)$param['orderBy'];
		$field = array();
		$field[] = 'discard=0';
		if (is_array($matchId)) {
			$matchId = $this->common->filterIdArray($matchId);
			if (count($matchId) > 0) {
				$field[] = 'matchId in('.implode(',', $matchId).')';
			}
		} else if (is_numeric($matchId)) {
			$matchId = (int)$matchId;
			if ($matchId > 0) {
				$field[] = 'matchId="'.$matchId.'"';
			}
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if ($number != "") {
			$field[] = 'number like "%'.$database->escape($number).'%"';
		}
		if (is_array($league)) {
			$leagueArr = [];
			foreach ($league as $item) {
				$item = trim($item);
				if (!empty($item)) {
					$leagueArr[] = "'".$item."'";
				}
			}
			if (count($leagueArr) > 0) {
				$field[] = 'league in('.implode(',', $leagueArr).')';
			}
		} else if (!empty($league)) {
			$field[] = 'league like "%'.$database->escape($league).'%"';
		}
		if ($home != "") {
			$field[] = 'home like "%'.$database->escape($home).'%"';
		}
		if ($away != "") {
			$field[] = 'away like "%'.$database->escape($away).'%"';
		}
		if ($endTime != '') {
			$endTime = strtotime($endTime);
			$endTime = date('Y-m-d', $endTime + 3600 * 24);
		}
		if ($beginTime != '' && $endTime != '') {
			$field[] = 'beginTime>="'.$database->escape($beginTime).'" and beginTime<"'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$field[] = 'beginTime>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$field[] = 'beginTime<"'.$database->escape($endTime).'"';
		}
		if ($saleTime != '') {
            $field[] = 'saleTime="'.$database->escape($saleTime).'"';
        }
		if ($result != "") {
			$field[] = 'result="'.$database->escape($result).'"';
		}
		if ($nullResult) {
			$field[] = 'result=""';
		}
		if ($nullSportteryResult) {
			$field[] = 'sportteryResult=""';
		}
		if ($nullOkoooResult) {
			$field[] = 'okoooResult=""';
		}
		if ($nullLeidataResult) {
			$field[] = 'leidataResult=""';
		}
		if ($needHot) {
			$field[] = 'planCount > 0';
		}
		if ($status == 1) {
			//1=未开赛
			$field[] = 'beginTime>now()';
		} else if ($status == 2) {
			//比赛中
			$field[] = 'beginTime<=now() and unix_timestamp()<(unix_timestamp(beginTime)+6900)';
		} else if ($status == 3) {
			//已结束
			$field[] = 'unix_timestamp(beginTime) >= (unix_timestamp()-24*3600) and (unix_timestamp(beginTime)+6900)<unix_timestamp()';
		} else if ($status == 4) {
			//未开赛+比赛中
			$field[] = 'unix_timestamp()<(unix_timestamp(beginTime)+6900)';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_match where '.$field;
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
		$orderByField = '';
		if ($needHot) {
			if ($status == 1 || $status == 2 || $status == 4) {
				$orderByField = 'order by planCount+orderCount desc, beginTime asc';
			} else if ($status == 3) {
				$orderByField = 'order by beginTime desc';
			}
		}
		if ($orderBy == 1) {
			$orderByField = 'order by beginTime desc';
		} else if ($orderBy == 2) {
            $orderByField = 'order by beginTime asc';
        }
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$column = 'matchId,type,number,league,home,away,homeLogoImg,awayLogoImg,beginTime,endTime,saleTime,result,halfResult,commonMatchId,sportteryMatchId,sportteryMatchId,sportteryHomeTeamId,sportteryAwayTeamId,sportteryLeagueInfo,sportteryHalfResult,sportteryResult,sportteryResultTime,okoooMatchId,okoooHalfResult,okoooResult,okoooResultTime,leidataMatchId,leidataHalfResult,leidataResult,leidataResultTime,winBetRate,drawBetRate,loseBetRate,planId,orderId,planCount,orderCount,attachPrize,live,createTime,lastTime';
		$sql = 'select '.$column.' from t_match where '.$field.' '.$orderByField.' '.$page;
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

	public function selectMatchLeague($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$needHot = (bool)$param['needHot'];
		$matchId = $param['matchId'];
		$type = $param['type'];
		$status = (int)$param['status'];
        $saleTime = trim($param['saleTime']);
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($needHot) {
			$field[] = 'planCount > 0';
		}
		if (is_array($matchId)) {
			$matchId = $this->common->filterIdArray($matchId);
			if (count($matchId) > 0) {
				$field[] = 'matchId in('.implode(',', $matchId).')';
			}
		} else if (is_numeric($matchId)) {
			$matchId = (int)$matchId;
			if ($matchId > 0) {
				$field[] = 'matchId="'.$matchId.'"';
			}
		}
        if (is_numeric($type)) {
            $type = (int)$type;
            if ($type > 0) {
                $field[] = 'type="'.$database->escape($type).'"';
            }
        } else if (is_array($type)) {
            $type = $this->common->filterIdArray($type);
            if (count($type) > 0) {
                $type = implode(',', $type);
                $field[] = 'type in('.$database->escape($type).')';
            }
        }
        if (!empty($saleTime)) {
            $field[] = 'saleTime ="'.$database->escape($saleTime).'"';
		}
		if ($status == 1) {
			//1=未开赛
			$field[] = 'beginTime>now()';
		} else if ($status == 2) {
			//比赛中
			$field[] = 'beginTime<=now() and unix_timestamp()<(unix_timestamp(beginTime)+6900)';
		} else if ($status == 3) {
			//已结束
			$field[] = 'unix_timestamp(beginTime) >= (unix_timestamp()-24*3600) and (unix_timestamp(beginTime)+6900)<unix_timestamp()';
		} else if ($status == 4) {
			//未开赛+比赛中
			$field[] = 'unix_timestamp()<(unix_timestamp(beginTime)+6900)';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select league from t_match where '.$field.' group by league';
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$data['totalCount'] = (int)$database->getAffectedRows();
			$database->free($result);
		}
		$page = '';
		if ($pageNum > 0 && $pageSize > 0) {
			$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
		}
		$sql = 'select league from t_match where '.$field.' group by league '.$page;
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

	public function selectMatchOddsById($oddsId) {
		$resp = requireModule('Resp');
		$oddsId = (int)$oddsId;
		if ($oddsId <= 0) {
			$resp->msg = 'oddsId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'oddsId="'.$database->escape($oddsId).'"';
		$column = 'oddsId,type,matchId,bettypeId,bettypeName,bettypeContent,bettypeValue,bettypeOdds,concede,beginTime,saleTime,single,sale,createTime,lastTime';
		$sql = 'select '.$column.' from t_match_odds where discard=0 and '.$field.' limit 1';
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

	public function selectMatchOdds($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$oddsId = $param['oddsId'];
		$type = (int)$param['type'];
		$matchId = $param['matchId'];
		$bettypeId = (int)$param['bettypeId'];
		$bettypeContent = trim($param['bettypeContent']);
        $needSingle = (bool)$param['needSingle'];
		$beginTime = trim($param['beginTime']);
		$endTime = trim($param['endTime']);
		$needSale = (bool)$param['needSale'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($oddsId)) {
			$oddsId = (int)$oddsId;
			if ($oddsId > 0) {
				$field[] = 'oddsId="'.$database->escape($oddsId).'"';
			}
		} else if (is_array($oddsId)) {
			$oddsId = $this->common->filterIdArray($oddsId);
			if (count($oddsId) > 0) {
				$oddsId = implode(',', $oddsId);
				$field[] = 'oddsId in('.$database->escape($oddsId).')';
			}
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if (is_numeric($matchId)) {
			$matchId = (int)$matchId;
			if ($matchId > 0) {
				$field[] = 'matchId="'.$database->escape($matchId).'"';
			}
		} else if (is_array($matchId)) {
			$matchId = $this->common->filterIdArray($matchId);
			if (count($matchId) > 0) {
				$matchId = implode(',', $matchId);
				$field[] = 'matchId in('.$database->escape($matchId).')';
			}
		}
		if ($bettypeId > 0) {
			$field[] = 'bettypeId="'.$bettypeId.'"';
		}
        if ($bettypeContent != '') {
            $field[] = 'bettypeContent="'.$bettypeContent.'"';
        }
		if ($endTime != '') {
			$endTime = strtotime($endTime);
			$endTime = date('Y-m-d', $endTime + 3600 * 24);
		}
		if ($beginTime != '' && $endTime != '') {
			$field[] = 'beginTime>="'.$database->escape($beginTime).'" and beginTime<"'.$database->escape($endTime).'"';
		} else if ($beginTime != '') {
			$field[] = 'beginTime>="'.$database->escape($beginTime).'"';
		} else if ($endTime != '') {
			$field[] = 'beginTime<"'.$database->escape($endTime).'"';
		}
		if ($needSale) {
			$date = date('Y-m-d H:i:s');
			//saleTime>="'.$date.'" and 
			$field[] = 'beginTime>="'.$date.'" and sale=1';
		}
		if ($needSingle) {
            $field[] = 'single=1';
        }
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_match_odds where '.$field;
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
		$column = 'oddsId,type,matchId,bettypeId,bettypeName,bettypeContent,bettypeValue,bettypeOdds,concede,beginTime,saleTime,single,sale,createTime,lastTime';
		$sql = 'select '.$column.' from t_match_odds where '.$field.' '.$page;
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

	public function selectMatchBettype($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$bettypeId = (int)$param['bettypeId'];
		$type = (int)$param['type'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($bettypeId > 0) {
			$field[] = 'bettypeId="'.$bettypeId.'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_match_bettype where '.$field;
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
		$column = 'bettypeId,type,name,content,value,createTime,lastTime';
		$sql = 'select '.$column.' from t_match_bettype where '.$field.' '.$page;
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

    public function selectGuessOdds($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $oddsId = $param['oddsId'];
        $lotteryId = $param['lotteryId'];
        $number = $param['number'];
        $sale = (int)$param['sale'];
        $team = $param['team'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (is_numeric($oddsId)) {
            $oddsId = (int)$oddsId;
            if ($oddsId > 0) {
                $field[] = 'oddsId="'.$database->escape($oddsId).'"';
            }
        } else if (is_array($oddsId)) {
            $oddsId = $this->common->filterIdArray($oddsId);
            if (count($oddsId) > 0) {
                $oddsId = implode(',', $oddsId);
                $field[] = 'oddsId in('.$database->escape($oddsId).')';
            }
        }
        if (is_string($lotteryId) && $lotteryId != '') {
            $lotteryId = trim($lotteryId);
            $field[] = 'lotteryId="'.$database->escape($lotteryId).'"';
        } else if (is_array($lotteryId)) {
            $lotteryId = implode(',', $lotteryId);
            $field[] = 'lotteryId in('.$database->escape($lotteryId).')';
        }
        if (is_numeric($number)) {
            $number = (int)$number;
            if ($number > 0) {
                $field[] = 'number="'.$database->escape($number).'"';
            }
        } else if (is_array($number)) {
            $number = $this->common->filterIdArray($number);
            if (count($number) > 0) {
                $number = implode(',', $number);
                $field[] = 'number in('.$database->escape($number).')';
            }
        }
        if (key_exists('sale', $param)) {
            $field[] = 'sale="'.$database->escape($sale).'"';
        }
        if (is_string($team) && $team != '') {
            $field[] = 'team like "%'.$database->escape($team).'%"';
        } else if (is_array($team) && count($team) > 0) {
            $str = array();
            foreach ($team as $item) {
                $str[] = 'team like "%'.$database->escape($item).'%"';
            }
            $field[] = '(' . implode(' or ', $str) . ')';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_guess_odds where '.$field;
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
        $column = 'oddsId,lotteryId,number,team,odds,chance,sale,createTime,lastTime';
        $sql = 'select '.$column.' from t_guess_odds where '.$field.' '.$page;
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

    public function selectAdditionalMatch($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $additionalMatchId = (int)$param['additionalMatchId'];
        $sportteryPublicMatchId = (int)$param['sportteryPublicMatchId'];
        $sportteryMatchId = (int)$param['sportteryMatchId'];
        $teamId = $param['teamId'];
        $homeTeamId = (int)$param['homeTeamId'];
        $awayTeamId = (int)$param['awayTeamId'];
        $isHistory = (bool)$param['isHistory'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (key_exists('additionalMatchId', $param)) {
            if ($additionalMatchId > 0) {
                $field[] = 'additionalMatchId="'.$database->escape($additionalMatchId).'"';
            }
        }
        if (key_exists('sportteryPublicMatchId', $param)) {
            if ($sportteryMatchId > 0) {
                $field[] = 'sportteryPublicMatchId="'.$database->escape($sportteryPublicMatchId).'"';
            }
        }
        if (key_exists('sportteryMatchId', $param)) {
            if ($sportteryMatchId > 0) {
                $field[] = 'sportteryMatchId="'.$database->escape($sportteryMatchId).'"';
            }
        }
        if (is_array($teamId)) {
            $teamId = $this->common->filterIdArray($teamId);
            if (count($teamId) > 0) {
                $field[] = '(sportteryHomeTeamId in('.implode(',', $teamId).') or sportteryAwayTeamId in ('.implode(',', $teamId).'))';
            }
        } else if (is_numeric($teamId)) {
            $teamId = (int)$teamId;
            if ($teamId > 0) {
                $field[] = '(sportteryHomeTeamId="'.$database->escape($teamId).'" or sportteryAwayTeamId="'.$database->escape($teamId).'")';
            }
        }
        if (key_exists('homeTeamId', $param)) {
            if ($sportteryMatchId > 0) {
                $field[] = 'sportteryHomeTeamId="'.$database->escape($homeTeamId).'"';
            }
        }
        if (key_exists('awayTeamId', $param)) {
            if ($sportteryMatchId > 0) {
                $field[] = 'sportteryAwayTeamId="'.$database->escape($awayTeamId).'"';
            }
        }
        if (key_exists('isHistory', $param)) {
            if ($isHistory) {
                //是历史数据
                $field[] = 'result != ""';
            } else {
                //将来数据
                $field[] = '(halfResult = "" and result = "")';
            }
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_additional_match where '.$field;
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
        $column = 'additionalMatchId,sportteryPublicMatchId,sportteryMatchId,sportteryHomeTeamId,sportteryAwayTeamId,home,away,league,halfResult,result,odds,handicap,matchTime,createTime,lastTime';
        $sql = 'select '.$column.' from t_additional_match where '.$field.' order by matchTime desc '.$page;
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

    public function selectAdditionalMatchOdds($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $type = (int)$param['type'];
        $matchId = (int)$param['matchId'];
        $sportteryMatchId = (int)$param['sportteryMatchId'];
        $m500MatchId = (int)$param['m500MatchId'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (key_exists('type', $param)) {
            if ($type > 0) {
                $field[] = 'type="'.$database->escape($type).'"';
            }
        }
        if (key_exists('matchId', $param)) {
            if ($matchId > 0) {
                $field[] = 'matchId="'.$database->escape($matchId).'"';
            }
        }
        if (key_exists('sportteryMatchId', $param)) {
            if ($sportteryMatchId > 0) {
                $field[] = 'sportteryMatchId="'.$database->escape($sportteryMatchId).'"';
            }
        }
        if (key_exists('m500MatchId', $param)) {
            if ($m500MatchId > 0) {
                $field[] = '$m500MatchId="'.$database->escape($m500MatchId).'"';
            }
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_additional_match_odds where '.$field;
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
        $column = 'additionalOddsId,type,matchId,sportteryMatchId,sportteryBookmakerId,m500MatchId,m500BookmakerId,bookmaker,firstOdds,endOdds,oddsChange,createTime,lastTime';
        $sql = 'select '.$column.' from t_additional_match_odds where '.$field.' '.$page;
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

    public function selectAdditionalTeamScore($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $additionalScoreId = (int)$param['additionalScoreId'];
        $seasonId = (int)$param['seasonId'];
        $leagueId = (int)$param['leagueId'];
        $groupId = (int)$param['groupId'];
        $teamId = $param['teamId'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (key_exists('additionalScoreId', $param)) {
            if ($additionalScoreId > 0) {
                $field[] = 'additionalScoreId="'.$database->escape($additionalScoreId).'"';
            }
        }
        if (key_exists('seasonId', $param)) {
            if ($seasonId > 0) {
                $field[] = 'sportterySeasonId="'.$database->escape($seasonId).'"';
            }
        }
        if (key_exists('leagueId', $param)) {
            if ($leagueId > 0) {
                $field[] = 'sportteryLeagueId="'.$database->escape($leagueId).'"';
            }
        }
        if (key_exists('groupId', $param)) {
            if ($groupId > 0) {
                $field[] = 'sportteryGroupId="'.$database->escape($groupId).'"';
            }
        }
        if (is_array($teamId)) {
            $teamId = $this->common->filterIdArray($teamId);
            if (count($teamId) > 0) {
                $field[] = 'sportteryTeamId in('.implode(',', $teamId).')';
            }
        } else if (is_numeric($teamId)) {
            $teamId = (int)$teamId;
            if ($teamId > 0) {
                $field[] = 'sportteryTeamId="'.$database->escape($teamId).'"';
            }
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_additional_team_score where '.$field;
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
        $column = 'additionalScoreId,sportterySeasonId,sportteryLeagueId,sportteryGroupId,sportteryTeamId,leagueName,groupName,teamName,totalResult,homeResult,awayResult,createTime,lastTime';
        $sql = 'select '.$column.' from t_additional_team_score where '.$field.' '.$page;
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