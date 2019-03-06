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
		//http://live.m.500.com/home/zq/jczq/cur?render=local
		$time = time();
		$today = date("Y-m-d");
		$yesterday = date("Y-m-d", $time - 1*24*3600);
		$todayResult = $this->httpGet('http://ews.500.com/score/zq/info?vtype=jczq&expect='.$today.'&_t='.$time);
		$todayResult = json_decode($todayResult, true);
		$yesterdayResult = $this->httpGet('http://ews.500.com/score/zq/info?vtype=jczq&expect='.$yesterday.'&_t='.$time);
		$yesterdayResult = json_decode($yesterdayResult, true);
		$matchList = array();
		if (!empty($todayResult['data']) && is_array($todayResult['data']['matches'])) {
			$matchList = array_merge($matchList, $todayResult['data']['matches']);
		}
		if (!empty($yesterdayResult['data']) && is_array($yesterdayResult['data']['matches'])) {
			$matchList = array_merge($matchList, $yesterdayResult['data']['matches']);
		}
		if (count($matchList) <= 0) {
			$this->common->logger->info('获取赛果有误');
			return;
		}
		$resultMap = array();
		foreach($matchList as $match) {
			$status = (int)$match['status'];//4=完场(足球),11=完场(篮球)
			$order = trim($match['order']);
			$matchtime = trim($match['matchtime']);
			$homehalfscore = (int)$match['homehalfscore'];
			$awayhalfscore = (int)$match['awayhalfscore'];
			$homescore = (int)$match['homescore'];
			$awayscore = (int)$match['awayscore'];
			//不要抓改期
			if ($status != 4 || empty($order) || empty($matchtime) || !key_exists('homehalfscore', $match) || !key_exists('awayhalfscore', $match) || !key_exists('homescore', $match) || !key_exists('awayscore', $match)) {
				continue;
			}
			$week = $this->weekMap[trim(mb_substr($order, 0, 2))];
			$num = trim(mb_substr($order, 2));
			$beginTime = (int)strtotime($matchtime);
			$halfResult = $homehalfscore.':'.$awayhalfscore;
			$result = $homescore.':'.$awayscore;
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
				$this->common->logger->info('500彩票网足球赛果更新成功');
			} else {
				$this->common->logger->info('500彩票网足球赛果更新失败');
			}
		}
		$database->close();
		$this->common->logger->info('500彩票网足球赛果更新完成');
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

	public function httpGet($url) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
		$res = curl_exec($curl);
		curl_close($curl);
		return $res;
	}
}
$spider = new Spider();
$spider->execute();