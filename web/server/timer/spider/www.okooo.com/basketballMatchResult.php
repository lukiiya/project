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
		//http://a.okooo.com/
		$date = date("Y-m-d", time() - 3*24*3600);
		$result = file_get_contents('http://a.okooo.com/I/?method=mc.data.schedule.getOkoooSchedule&from=prize&LotteryType=SportteryWS&version=1.0.0.1&LotteryNo='.$date);
		$result = json_decode($result, true);
		$code = (int)$result['code'];
		$codeStr = trim($result['code_str']);
		$info = $result['info'];
		if ($code != 0 || $codeStr != 'Succeed' || empty($info)) {
			$this->common->logger->info('获取赛果有误');
			return;
		}
		$dataList = $info['Matches'];
		if (empty($result) || !is_array($dataList) || count($dataList) <= 0) {
			$this->common->logger->info('获取赛果有误');
			return;
		}
		$resultMap = array();
		foreach($dataList as $data) {
			$wSResult = trim($data['WSResult']);
			$number = trim($data['MatchOrderCn']);
			$home = trim($data['HomeName']);
			$away = trim($data['AwayName']);
			$beginTime = (int)strtotime(trim($data['MatchTime']));
			if ($wSResult == 'Delay') {
				$result = '取消';
			} else {
				$homeGoals = (int)$data['HomeGoals'];
				$awayGoals = (int)$data['AwayGoals'];
				$result = $awayGoals.':'.$homeGoals;
			}
			$okoooMatchId = (int)$data['MatchID'];
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			if (empty($number) || empty($home) || empty($away) || $beginTime <= 0 || empty($result) || $okoooMatchId <= 0 || empty($week) || empty($num)) {
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
			$resultInfo['result'] = $result;
			$resultMap[$commonMatchId] = $resultInfo;
		}
		if (count($resultMap) <= 0) {
			$this->common->logger->info('获取赛果有误');
			return;
		}
		$this->updateMatchResult($resultMap);
	}

	public function getMatchResultMix() {
		//http://a.okooo.com/
		$dataList = array();
		for ($i = 0; $i < 5; $i++) {
			$date = date("Y-m-d", time() - $i*24*3600);
			$result = file_get_contents('http://a.okooo.com/I/?method=mc.data.schedule.getOkoooSchedule&from=prize&LotteryType=SportteryBasketMix&version=1.0.0.1&LotteryNo='.$date);
			$result = json_decode($result, true);
			$code = (int)$result['code'];
			$codeStr = trim($result['code_str']);
			$info = $result['info'];
			if ($code != 0 || $codeStr != 'Succeed' || empty($info)) {
				$this->common->logger->info('获取赛果有误');
				continue;
			}
			$resultList = $info['Matches'];
			if (empty($result) || !is_array($resultList) || count($resultList) <= 0) {
				$this->common->logger->info('获取赛果有误');
				continue;
			}
			$dataList = array_merge($dataList, $resultList);
		}
		if (count($dataList) <= 0) {
			$this->common->logger->info('获取赛果为空');
			return;
		}
		$resultMap = array();
		foreach($dataList as $data) {
			$number = trim($data['MatchOrderCn']);
			$home = trim($data['AwayName']);//注意：这里主,客是相反的
			$away = trim($data['HomeName']);//注意：这里主,客是相反的
			$beginTime = (int)strtotime(trim($data['MatchTime']));
			$homeGoals = (int)$data['AwayGoals'];//注意：这里主,客是相反的
			$awayGoals = (int)$data['HomeGoals'];//注意：这里主,客是相反的
			$result = $awayGoals.':'.$homeGoals;
			$okoooMatchId = (int)$data['MatchID'];
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			if (empty($number) || empty($home) || empty($away) || $beginTime <= 0 || empty($result) || $okoooMatchId <= 0 || empty($week) || empty($num)) {
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
		$type = 2;
		//查询比赛
		$param = array();
		$param['type'] = $type;
		$param['nullOkoooResult'] = true;
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
			$result = trim($resultMap[$commonMatchId]['result']);
			if ($matchId <= 0 || $type != (int)$info['type'] || !preg_match('/^\d{12}$/', $commonMatchId) || empty($resultMap[$commonMatchId]) || empty($result)) {
				continue;
			}
			//判断是否是"数字:数字"格式
			if ($result != '取消' && !preg_match('/^\d+:\d+$/', $result)) {
				continue;
			}
			$field = array();
			$field[] = 'okoooResult="' . $database->escape($result) . '"';
			$field[] = 'okoooResultTime=if(okoooResultTime,okoooResultTime,now())';
			$sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" limit 1';
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('澳客网篮球赛果更新成功');
			} else {
				$this->common->logger->info('澳客网篮球赛果更新失败');
			}
		}
		$database->close();
		$this->common->logger->info('澳客网篮球赛果更新完成');
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
