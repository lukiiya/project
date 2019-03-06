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
	private $cookie;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
		$this->weekMap = array('周一' => 1, '周二' => 2, '周三' => 3, '周四' => 4, '周五' => 5, '周六' => 6, '周日' => 7);
		$this->cookie = $this->getCookie();
	}
	//获取比赛赛果
	public function execute() {
		$this->getMatchResultH5();
		$this->getMatchResultPC();
		$this->syncMatchResult();
	}

	public function getMatchResultH5() {
		//http://info.sporttery.cn/wechat/fb_result_list.html
		$dataList = array();
		for ($i = 0; $i < 5; $i++) {
			$date = date("Y-m-d", time() - $i*24*3600);
			$result = $this->httpGet('http://i.sporttery.cn/open_v1_0/fb_match_list/get_fb_match_result/?username=11000000&password=test_passwd&date='.$date, $this->cookie);
			$result = json_decode($result, true);
			$resultList = $result['data']['result'];
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
			$number = trim($data['num']);
			$home = trim($data['h_cn']);
			$away = trim($data['a_cn']);
			$beginTime = (int)strtotime(trim($data['date']));
			$result = trim($data['final']);
			$halfResult = trim($data['half']);
			$matchStatus = trim($data['match_status']);
			$sportteryMatchId = (int)$data['id'];
			$poolStatus = trim($data['pool_status']);
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			if (empty($number) || empty($home) || empty($away) || $beginTime <= 0 || empty($result) || empty($halfResult) || $matchStatus != 'Final' || $sportteryMatchId <= 0 || ($poolStatus != 'Payout' && $poolStatus != 'Refund') || empty($week) || empty($num)) {
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

	public function getMatchResultPC() {
		//获取赛果
		$result = $this->httpGet('http://info.sporttery.cn/iframe/match_result.php?type=fb&limit=500', $this->cookie);
		//过滤多余字符串
		$result = preg_replace('/^\s*var\s*matchs\s*=\s*[\'"]|[\'"]\s*;\s*$/', '', $result);
		$result = iconv("GBK", "UTF-8//IGNORE", $result);
		$resultArr = explode('|', $result);
		$resultMap = array();
		foreach($resultArr as $info) {
			$info = explode(',', $info);
			if (count($info) < 7) {
				continue;
			}
			$number = trim($info[0]);
			$home = trim($info[1]);
			$away = trim($info[2]);
			$beginTime = (int)strtotime(trim($info[4]));
			$result = trim($info[3]);
			$halfResult = trim($info[5]);
			$sportteryMatchId = (int)$info[6];
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			if (empty($number) || empty($home) || empty($away) || $beginTime <= 0 || empty($result) || empty($halfResult) || $sportteryMatchId <= 0 || empty($week) || empty($num)) {
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
		$param['nullSportteryResult'] = true;
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
			$field[] = 'sportteryHalfResult="' . $database->escape($halfResult) . '"';
			$field[] = 'sportteryResult="' . $database->escape($result) . '"';
			$field[] = 'sportteryResultTime=if(sportteryResultTime,sportteryResultTime,now())';
			$sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" limit 1';
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('竞彩网足球赛果更新成功');
			} else {
				$this->common->logger->info('竞彩网足球赛果更新失败');
			}
		}
		$database->close();
		$this->common->logger->info('竞彩网足球赛果更新完成');
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

	public function getCookie() {
		$cookie = '';
		$date = date("Y-m-d");
		$result = $this->httpGet('http://i.sporttery.cn/open_v1_0/fb_match_list/get_fb_match_result/?username=11000000&password=test_passwd&date='.$date, '', true);
		if (preg_match('/^Set-Cookie: ([^\r\n]*)[\r\n]*$/m', $result, $arr) && is_array($arr) && count($arr) == 2) {
			$cookie = $arr[1];
		}
		return $cookie;
	}

	public function httpGet($url, $cookie, $returnHeader = false) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36');
		curl_setopt($curl, CURLOPT_COOKIE , $cookie);
		curl_setopt($curl, CURLOPT_HEADER, $returnHeader);
		$res = curl_exec($curl);
		curl_close($curl);
		return $res;
	}
}

$spider = new Spider();
$spider->execute();
