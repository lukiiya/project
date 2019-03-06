#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

//篮联：http://nba.nowscore.com/
//篮球球队：http://nba.nowscore.com/cn/TeamInfo.aspx?SclassID=19
class Spider {
	private $common;
	private $matchService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
	}
	//获取国家
	public function execute() {
		//简体协会数据抓取
		$result = file_get_contents('http://nba.nowscore.com/jsData/infoHeader_cn.js');
		$pattern  =  '/arr\[\d+\]\s*=\s*(\[[\s\S]*?\]\]);/';
		$matches = array();
		preg_match_all($pattern, $result, $matches);
		if (empty($matches) || count($matches) != 2) {
			$this->common->logger->info('协会简体数据抓取失败');
			return;
		}
		$unionArr = array();
		foreach ($matches[1] as $item) {
			$unionArr[] = $item;
		}
		$unionJson = json_decode('['.implode(',', $unionArr).']');
		if (empty($unionJson)) {
			$this->common->logger->info('协会简体数据json解析失败');
			return;
		}
		//繁体协会数据抓取
		$result = file_get_contents('http://nba.nowscore.com/jsData/infoHeader_fn.js');
		$pattern  =  '/arr\[\d+\]\s*=\s*(\[[\s\S]*?\]\]);/';
		$matches = array();
		preg_match_all($pattern, $result, $matches);
		if (empty($matches) || count($matches) != 2) {
			$this->common->logger->info('协会繁体数据抓取失败');
			return;
		}
		$unionArrFn = array();
		foreach ($matches[1] as $item) {
			$unionArrFn[] = $item;
		}
		$unionJsonFn = json_decode('['.implode(',', $unionArrFn).']');
		if (empty($unionJsonFn)) {
			$this->common->logger->info('协会繁体数据json解析失败');
			return;
		}
		//英文协会数据抓取
		$result = file_get_contents('http://nba.nowscore.com/jsData/infoHeader_en.js');
		$pattern  =  '/arr\[\d+\]\s*=\s*(\[[\s\S]*?\]\]);/';
		$matches = array();
		preg_match_all($pattern, $result, $matches);
		if (empty($matches) || count($matches) != 2) {
			$this->common->logger->info('协会英文数据抓取失败');
			return;
		}
		$unionArrEn = array();
		foreach ($matches[1] as $item) {
			$unionArrEn[] = $item;
		}
		$unionJsonEn = json_decode('['.implode(',', $unionArrEn).']');
		if (empty($unionJsonEn)) {
			$this->common->logger->info('协会英文数据json解析失败');
			return;
		}
		$unionMap = array();
		foreach ($unionJson as $item) {
			$caiKeUnionId = trim($item[0]);
			$caiKeUnionId = (int)preg_replace('/\D/', '', $caiKeUnionId);
			$simplifiedName = trim($item[1]);
			$logoImg = trim($item[2]);
			$area = (int)$item[3];
			$league = $item[4];
			if ($caiKeUnionId <= 0 || $area <= 0 || strpos($simplifiedName, '赛事') !== false || empty($league) || !is_array($league) || count($league) <= 0) {
				continue;
			}
			$unionMap[$caiKeUnionId] = array(
				'simplifiedName' => $simplifiedName,
				'logoImg' => $logoImg,
				'area' => $area,
				'league' => $league
			);
		}
		foreach ($unionJsonFn as $item) {
			$caiKeUnionId = trim($item[0]);
			$caiKeUnionId = (int)preg_replace('/\D/', '', $caiKeUnionId);
			$traditionalName = trim($item[1]);
			$area = (int)$item[3];
			if ($caiKeUnionId <= 0 || $area <= 0 || strpos($traditionalName, '赛事') !== false) {
				continue;
			}
			if (!key_exists($caiKeUnionId, $unionMap)) {
				continue;
			}
			$unionMap[$caiKeUnionId]['traditionalName'] = $traditionalName;
		}
		foreach ($unionJsonEn as $item) {
			$caiKeUnionId = trim($item[0]);
			$caiKeUnionId = (int)preg_replace('/\D/', '', $caiKeUnionId);
			$englishName = trim($item[1]);
			$area = (int)$item[3];
			if ($caiKeUnionId <= 0 || $area <= 0 || strpos($englishName, '赛事') !== false) {
				continue;
			}
			if (!key_exists($caiKeUnionId, $unionMap)) {
				continue;
			}
			$unionMap[$caiKeUnionId]['englishName'] = $englishName;
		}
		//插入协会数据
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($unionMap as $caiKeUnionId => $info) {
			$caiKeUnionId = (int)$caiKeUnionId;
			$simplifiedName = trim($info['simplifiedName']);
			$logoImg = trim($info['logoImg']);
			$area = (int)$info['area'];
			$league = $info['league'];
			$traditionalName = trim($info['traditionalName']);
			$englishName = trim($info['englishName']);
			if ($caiKeUnionId <= 0 || empty($simplifiedName) || empty($logoImg) || $area <= 0 || empty($league) || empty($traditionalName) || empty($englishName)) {
				continue;
			}
			$field = array();
			$field[] = 'type=2';
			$field[] = 'area="' . $database->escape($area) . '"';
			$field[] = 'simplifiedName="' . $database->escape($simplifiedName) . '"';
			$field[] = 'traditionalName="' . $database->escape($traditionalName) . '"';
			$field[] = 'englishName="' . $database->escape($englishName) . '"';
			if (!empty($logoImg)) {
				$logoImg = 'http://nba.nowscore.com'.$logoImg;
			}
			$field[] = 'logoImg="' . $database->escape($logoImg) . '"';
			$field[] = 'caiKeUnionId="' . $database->escape($caiKeUnionId) . '"';
			$field[] = 'createTime=now()';
			$sqlArr[] = 'insert into t_library_union set '.implode(',', $field);
		}
		if (count($sqlArr) <= 0) {
			$database->close();
			$this->common->logger->info('协会执行sql为空');
			return;
		}
		array_unshift($sqlArr, 'truncate t_library_union', 'truncate t_library_league', 'truncate t_library_team');
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$this->common->logger->info('协会插入失败');
			return;
		}
		$column = 'unionId,type,area,simplifiedName,traditionalName,englishName,logoImg,caiKeUnionId,createTime,lastTime';
		$sql = 'select '.$column.' from t_library_union where type=2';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$this->common->logger->info('查询协会失败');
			return;
		}
		$unionList = array();
		while($info = $database->get($result)){
			$unionList[] = $info;
		}
		$database->free($result);
		//插入联赛数据
		$sqlArr = array();
		foreach ($unionList as $union) {
			$caiKeUnionId = (int)$union['caiKeUnionId'];
			if ($caiKeUnionId <= 0 || !key_exists($caiKeUnionId, $unionMap)) {
				continue;
			}
			$league = $unionMap[$caiKeUnionId]['league'];
			if (!is_array($league) || count($league) <= 0) {
				continue;
			}
			$unionId = (int)$union['unionId'];
			foreach ($league as $item) {
				$item = explode(',', $item);
				if (!is_array($item) || count($item) < 3) {
					continue;
				}
				$caiKeLeagueId = (int)$item[0];
				$leagueType = (int)$item[2];//1=联赛, 2=杯赛
				if ($caiKeLeagueId <= 0 || $leagueType != 1) {
					continue;
				}
				$field = array();
				$field[] = 'type=2';
				$field[] = 'unionId="' . $database->escape($unionId) . '"';
				$field[] = 'caiKeLeagueId="' . $database->escape($caiKeLeagueId) . '"';
				$field[] = 'createTime=now()';
				$sqlArr[] = 'insert into t_library_league set '.implode(',', $field);
			}
		}
		if (count($sqlArr) <= 0) {
			$database->close();
			$this->common->logger->info('联赛执行sql为空');
			return;
		}
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$this->common->logger->info('联赛插入失败');
			return;
		}
		//抓取联赛数据
		$column = 'leagueId,caiKeLeagueId';
		$sql = 'select '.$column.' from t_library_league where type=2';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$this->common->logger->info('查询联赛失败');
			return;
		}
		$leagueList = array();
		while($info = $database->get($result)){
			$leagueList[] = $info;
		}
		$database->free($result);
		foreach ($leagueList as $league) {
			$leagueId = (int)$league['leagueId'];
			$caiKeLeagueId = (int)$league['caiKeLeagueId'];
			if ($leagueId <= 0 || $caiKeLeagueId <= 0) {
				continue;
			}
			$result = file_get_contents('http://nba.nowscore.com/jsData/teamInfo/ti'.$caiKeLeagueId.'.js');
			$pattern  =  '/arrLeague\s*=\s*(\[[\s\S]*?\]);/';
			$matches = array();
			preg_match($pattern, $result, $matches);
			if (empty($matches) || count($matches) != 2) {
				$this->common->logger->info('联赛数据抓取失败');
				return;
			}
			$leagueJson = preg_replace("/'/", '"', trim($matches[1]));
			//他们数据格式既然是错误的, 注意下一行最后面
			//var arrLeague = [1,'美国男子职业篮球联赛','美國男子職業籃球聯賽','National Basketball Association','2016-2017','#FF0000','/files/Sclass/1.jpg','NBA','NBA','NBA',1,];
			$leagueJson = preg_replace("/,\]/", ']', trim($leagueJson));
			$leagueJson = json_decode($leagueJson);
			if (empty($leagueJson) || count($leagueJson) != 11) {
				$this->common->logger->info('联赛数据json解析失败');
				return;
			}
			//获取球队
			$pattern  =  '/arrTeam\s*=\s*(\[[\s\S]*?\]);/';
			$matches = array();
			preg_match($pattern, $result, $matches);
			if (empty($matches) || count($matches) != 2) {
				$this->common->logger->info('球队数据抓取失败');
				return;
			}
			$teamJson = preg_replace("/'/", '"', trim($matches[1]));
			$teamJson = json_decode($teamJson);
			if (!is_array($teamJson)) {
				$this->common->logger->info('球队数据json解析失败');
				return;
			}
			$simplifiedName = trim($leagueJson[1]);
			$traditionalName = trim($leagueJson[2]);
			$englishName = trim($leagueJson[3]);
			$shortSimplifiedName = trim($leagueJson[7]);
			$shortTraditionalName = trim($leagueJson[8]);
			$shortEnglishName = trim($leagueJson[9]);
			$logoImg = trim($leagueJson[6]);
			$sqlArr = array();
			$field = array();
			$field[] = 'simplifiedName="' . $database->escape($simplifiedName) . '"';
			$field[] = 'traditionalName="' . $database->escape($traditionalName) . '"';
			$field[] = 'englishName="' . $database->escape($englishName) . '"';
			$field[] = 'shortSimplifiedName="' . $database->escape($shortSimplifiedName) . '"';
			$field[] = 'shortTraditionalName="' . $database->escape($shortTraditionalName) . '"';
			$field[] = 'shortEnglishName="' . $database->escape($shortEnglishName) . '"';
			if (!empty($logoImg)) {
				$logoImg = 'http://nba.nowscore.com'.$logoImg;
			}
			$field[] = 'logoImg="' . $database->escape($logoImg) . '"';
			$sqlArr[] = 'update t_library_league set ' . implode(',', $field) . ' where type=2 and  leagueId="' . $leagueId . '" limit 1';
			//球队sql
			foreach ($teamJson as $team) {
				$caiKeTeamId = (int)$team[0];
				$simplifiedName = trim($team[1]);
				$traditionalName = trim($team[2]);
				$englishName = trim($team[3]);
				$shortSimplifiedName = trim($team[4]);
				$shortTraditionalName = trim($team[5]);
				$shortEnglishName = trim($team[6]);
				$logoImg = trim($team[9]);
				if ($caiKeTeamId <= 0) {
					continue;
				}
				$field = array();
				$field[] = 'type=2';
				$field[] = 'leagueId="' . $database->escape($leagueId) . '"';
				$field[] = 'simplifiedName="' . $database->escape($simplifiedName) . '"';
				$field[] = 'traditionalName="' . $database->escape($traditionalName) . '"';
				$field[] = 'englishName="' . $database->escape($englishName) . '"';
				$field[] = 'shortSimplifiedName="' . $database->escape($shortSimplifiedName) . '"';
				$field[] = 'shortTraditionalName="' . $database->escape($shortTraditionalName) . '"';
				$field[] = 'shortEnglishName="' . $database->escape($shortEnglishName) . '"';
				if (!empty($logoImg)) {
					$logoImg = 'http://nba.nowscore.com'.$logoImg;
				}
				$field[] = 'logoImg="' . $database->escape($logoImg) . '"';
				$field[] = 'caiKeTeamId="' . $database->escape($caiKeTeamId) . '"';
				$field[] = 'createTime=now()';
				$sqlArr[] = 'insert into t_library_team set '.implode(',', $field);
			}
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if (!$result) {
				$database->close();
				$this->common->logger->info('球队插入失败');
				return;
			}
			sleep(2);
		}
		$database->close();
		$this->common->logger->info('篮球信息录入成功');
	}
}
$spider = new Spider();
$spider->execute();
