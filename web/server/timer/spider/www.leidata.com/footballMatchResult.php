#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class Spider {
	private $common;
	private $matchService;
	private $weekMap;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
		$this->weekMap = array('周一' => 1, '周二' => 2, '周三' => 3, '周四' => 4, '周五' => 5, '周六' => 6, '周日' => 7);
	}
	//获取比赛赛果
	public function execute() {
		$this->getMatchResult();
		$this->syncMatchResult();
	}

	public function getMatchResult() {
		//http://h5.leida310.com/index.php/home/Soccerlive/showpage
        $result = file_get_contents('http://h5.leida310.com/index.php/home/Soccerlive/offerSportteryMatches');
        $resultList = json_decode($result, true);
        if (empty($result) || !is_array($resultList) || count($resultList) <= 0) {
            $this->common->logger->info('获取赛果有误');
        }
		if (count($resultList) <= 0) {
			$this->common->logger->info('获取赛果为空');
			return;
		}
		$resultMap = array();
		foreach($resultList as $data) {
			$statusType = trim($data['status_type']);
            //延期的字段不确定
			if ($statusType != 'finished' && $statusType != 'delay') {
				continue;
			}
			$number = trim($data['sporttery_num']);
			$home = trim($data['home_name_zh']);
			$away = trim($data['away_name_zh']);
			$beginTime = (int)strtotime(trim($data['startdate']));
			if ($statusType == 'delay') {
				$result = '取消';
				$halfResult = '取消';
			} else {
				$homeGoals = (int)$data['home_score'];
				$awayGoals = (int)$data['away_score'];
				$halfHomeGoals = (int)$data['home_half_score'];
				$halfAwayGoals = (int)$data['away_half_score'];
				$result = $homeGoals.':'.$awayGoals;
				$halfResult = $halfHomeGoals.':'.$halfAwayGoals;
			}
			$leidataMatchId = (int)$data['id'];
			$week = trim(mb_substr($number, 0, 1));
			$num = trim(mb_substr($number, 1));
			if (empty($number) || empty($home) || empty($away) || $beginTime <= 0 || empty($result) || empty($halfResult) || $leidataMatchId <= 0 || empty($week) || empty($num)) {
				continue;
			}
			$commonMatchId = '';
			//从周几判断出开售时间, 最多间隔7天
			for ($i = 0; $i < 7; $i++) {
				$time = $beginTime - $i*24*3600;
				$w = date('N', $time);
				if ($w == $week) {
					$commonMatchId = date("Ymd", $time).$week.$num;
					break;
				}
			}
			if (!preg_match('/^\d{12}$/', $commonMatchId)) {
				continue;
			}
			$resultInfo = array();
			$resultInfo['halfResult'] = $halfResult;
			$resultInfo['result'] = $result;
			$resultMap[$commonMatchId] = $resultInfo;
		}
		if (count($resultMap) <= 0) {
			$this->common->logger->info('获取赛果有误');
			return;
		}
		$this->updateMatchResult($resultMap);
	}

	public function updateMatchResult($resultMap) {
		if (!is_array($resultMap) || count($resultMap) <= 0) {
			$this->common->logger->info('更新比赛参数异常');
			return;
		}
		//类型, 1=足球, 2=篮球
		$type = 1;
		//查询比赛
		$param = array();
		$param['type'] = $type;
		$param['nullLeidataResult'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 2000;
		$selectMatchResp = $this->matchService->selectMatch($param);
		if ($selectMatchResp->errCode != 0) {
			$this->common->logger->info('查询比赛异常');
			return;
		}
		$matchList = $selectMatchResp->data['list'];
		if (count($matchList) <= 0) {
			$this->common->logger->info('不存在需要设置赛果的比赛');
			return;
		}
		//更新赛果
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($matchList as &$info) {
			$matchId = (int)$info['matchId'];
			$localNumber = trim($info['number']);
			$localSaleTime = preg_replace('/\D/', '', substr(trim($info['saleTime']), 0, 10));
			$week = $this->weekMap[trim(mb_substr($localNumber, 0, 2))];
			$num = trim(mb_substr($localNumber, 2));
			$commonMatchId = $localSaleTime.$week.$num;
			$halfResult = trim($resultMap[$commonMatchId]['halfResult']);
			$result = trim($resultMap[$commonMatchId]['result']);
			if ($matchId <= 0 || $type != (int)$info['type'] || !preg_match('/^\d{12}$/', $commonMatchId) || empty($resultMap[$commonMatchId]) || empty($halfResult) || empty($result)) {
				continue;
			}
			//半场,全场只要有一个是"取消", 两个必须同时是"取消"
			if (($halfResult == '取消' || $result == '取消') && $halfResult != $result) {
				continue;
			}
			//判断是否是"数字:数字"格式
			if (($halfResult != '取消' && !preg_match('/^\d+:\d+$/', $halfResult)) || ($result != '取消' && !preg_match('/^\d+:\d+$/', $result))) {
				continue;
			}
			$field = array();
			$field[] = 'leidataHalfResult="' . $database->escape($halfResult) . '"';
			$field[] = 'leidataResult="' . $database->escape($result) . '"';
			$field[] = 'leidataResultTime=if(leidataResultTime,leidataResultTime,now())';
			$sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" limit 1';
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('雷达体育足球赛果更新成功');
			} else {
				$this->common->logger->info('雷达体育足球赛果更新失败');
			}
		}
		$database->close();
		$this->common->logger->info('雷达体育足球赛果更新完成');
	}

	public function syncMatchResult() {
		//查询比赛
		$param = array();
		$param['nullResult'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 2000;
		$selectMatchResp = $this->matchService->selectMatch($param);
		if ($selectMatchResp->errCode != 0) {
			$this->common->logger->info('查询比赛异常');
			return;
		}
		$matchList = $selectMatchResp->data['list'];
		if (count($matchList) <= 0) {
			$this->common->logger->info('不存在需要设置赛果的比赛');
			return;
		}
		//更新赛果
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($matchList as &$info) {
			$matchId = (int)$info['matchId'];
			$type = (int)$info['type'];//类型, 1=足球, 2=篮球
			$sportteryHalfResult = trim($info['sportteryHalfResult']);
			$sportteryResult = trim($info['sportteryResult']);
			$okoooHalfResult = trim($info['okoooHalfResult']);
			$okoooResult = trim($info['okoooResult']);
			$leidataHalfResult = trim($info['leidataHalfResult']);
			$leidataResult = trim($info['leidataResult']);
			if ($matchId <= 0 || ($type != 1 && $type != 2)) {
				continue;
			}
			$halfResult = '';
			$result = '';
			if ($sportteryHalfResult == '取消' || preg_match('/^\d+:\d+$/', $sportteryHalfResult)) {
				$halfResult = $sportteryHalfResult;
			}
			if ($sportteryResult == '取消' || preg_match('/^\d+:\d+$/', $sportteryResult)) {
				$result = $sportteryResult;
			}
			if (empty($result) && (!empty($okoooResult) || !empty($leidataResult))) {
				//竞彩网结果为空，澳客网=雷达网才算结果
				if ($okoooHalfResult == $leidataHalfResult && $okoooResult == $leidataResult) {
					$halfResult = $okoooHalfResult;
					$result = $okoooResult;
				}
			}
			if ($type == 1) {
				//半场,全场只要有一个是"取消", 两个必须同时是"取消"
				if (($halfResult == '取消' || $result == '取消') && $halfResult != $result) {
					continue;
				}
				//判断是否是"数字:数字"格式
				if (($halfResult != '取消' && !preg_match('/^\d+:\d+$/', $halfResult)) || ($result != '取消' && !preg_match('/^\d+:\d+$/', $result))) {
					continue;
				}
			} else if ($type == 2) {
				//判断是否是"数字:数字"格式
				if ($result != '取消' && !preg_match('/^\d+:\d+$/', $result)) {
					continue;
				}
			}
			$field = array();
			$field[] = 'halfResult="' . $database->escape($halfResult) . '"';
			$field[] = 'result="' . $database->escape($result) . '"';
			$sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" and type="'.$type.'" and result="" limit 1';
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('同步赛果成功');
			} else {
				$this->common->logger->info('同步赛果失败');
			}
			$orderType = 3;
			$message = requireModule('Message');
			$message->publish('orderResult', $orderType);
		}
		$database->close();
		$this->common->logger->info('同步赛果完成');
	}
}
$spider = new Spider();
$spider->execute();
