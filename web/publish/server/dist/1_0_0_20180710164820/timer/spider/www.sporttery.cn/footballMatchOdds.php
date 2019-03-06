#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class Spider {
	private $common;
	private $matchService;
	private $libraryService;
	private $weekMap;
	private $cookie;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
		$this->libraryService = requireService("Library");
		$this->weekMap = array('周一' => 1, '周二' => 2, '周三' => 3, '周四' => 4, '周五' => 5, '周六' => 6, '周日' => 7);
		$this->cookie = $this->getCookie();
	}

	private function getBettypeMap() {
		$resp = requireModule('Resp');
		//查询比赛玩法
		$param = array();
		$param['type'] = 1;
		$param['needCount'] = false;
		$selectMatchBettypeResp = $this->matchService->selectMatchBettype($param);
		if ($selectMatchBettypeResp->errCode != 0) {
			$resp->msg = '查询比赛玩法异常';
			return $resp;
		}
		$matchBettypeList = $selectMatchBettypeResp->data['list'];
		$bettypeMap = array();
		foreach ($matchBettypeList as &$info) {
			$content = trim($info['content']);
			if (!empty($content)) {
				$bettypeMap[$content] = $info;
			}
		}
		$resp->data = $bettypeMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function getLeagueMap() {
		$resp = requireModule('Resp');
		//查询联赛
		$param = array();
		$param['type'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 10000;
		$param['needCount'] = false;
		$selectLeagueResp = $this->libraryService->selectLeague($param);
		if ($selectLeagueResp->errCode != 0) {
			$resp->msg = '联赛查询异常';
			return $resp;
		}
		$leagueList = $selectLeagueResp->data['list'];
		$leagueMap = array();
		foreach ($leagueList as &$league) {
			$simplifiedName = trim($league['simplifiedName']);
			$shortSimplifiedName = trim($league['shortSimplifiedName']);//短简体名称
			if (!empty($simplifiedName)) {
				$leagueMap[$simplifiedName] = $league;
			}
			if (!empty($shortSimplifiedName)) {
				$leagueMap[$shortSimplifiedName] = $league;
			}
		}
		$resp->data = $leagueMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function getTeamMap() {
		$resp = requireModule('Resp');
		//查询球队
		$param = array();
		$param['type'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 10000;
		$param['needCount'] = false;
		$selectTeamResp = $this->libraryService->selectTeam($param);
		if ($selectTeamResp->errCode != 0) {
			$resp->msg = '球队查询异常';
			return $resp;
		}
		$teamList = $selectTeamResp->data['list'];
		$teamMap = array();
		foreach ($teamList as &$team) {
			$simplifiedName = trim($team['simplifiedName']);
			$shortSimplifiedName = trim($team['shortSimplifiedName']);
			if (!empty($simplifiedName)) {
				$teamMap[$simplifiedName] = $team;
			}
			if (!empty($shortSimplifiedName)) {
				$teamMap[$shortSimplifiedName] = $team;
			}
		}
		$resp->data = $teamMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function getMatchMap() {
		$resp = requireModule('Resp');
		//查询比赛
		$param = array();
		$param['type'] = 1;
		$param['beginTime'] = date("Y-m-d H:i:s", time()-3*3600*24);//三天前的时间;
		$param['needCount'] = false;
		$selectMatchResp = $this->matchService->selectMatch($param);
		if ($selectMatchResp->errCode != 0) {
			$resp->msg = '查询比赛异常';
			return $resp;
		}
		$matchList = $selectMatchResp->data['list'];
		$matchMap = array();
		foreach ($matchList as &$info) {
			$matchId = (int)$info['matchId'];
			$number = trim($info['number']);
			$saleTime = preg_replace('/\D/', '', substr(trim($info['saleTime']), 0, 10));
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			$commonMatchId = $saleTime.$week.$num;
			if ($matchId > 0 && !empty($number) && !empty($saleTime) && !empty($week) && !empty($num) && preg_match('/^\d{12}$/', $commonMatchId)) {
				$matchMap[$commonMatchId] = $info;
			}
		}
		$resp->data = $matchMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function getOddsMap($matchMap) {
		$resp = requireModule('Resp');
		if (!is_array($matchMap) || count($matchMap) <= 0) {
			$resp->msg = '查询赔率参数异常';
			return $resp;
		}
		$matchIdArr = array();
		foreach ($matchMap as &$info) {
			$matchId = (int)$info['matchId'];
			if ($matchId > 0) {
				$matchIdArr[] = $matchId;
			}
		}
		if (count($matchIdArr) <= 0) {
			$resp->msg = '查询赔率参数异常';
			return $resp;
		}
		//查询比赛赔率表
		$param = array();
		$param['type'] = 1;
		$param['matchId'] = $matchIdArr;
		$param['needCount'] = false;
		$selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
		if ($selectMatchOddsResp->errCode != 0) {
			$resp->msg = '查询比赛赔率异常';
			return $resp;
		}
		$matchOddsList = $selectMatchOddsResp->data['list'];
		$oddsMap = array();
		foreach ($matchOddsList as &$info) {
			$matchId = (int)$info['matchId'];
			$bettypeContent = trim($info['bettypeContent']);
			if ($matchId > 0 && !empty($bettypeContent)) {
				$oddsMap[$matchId.'-'.$bettypeContent] = $info;
			}
		}
		$resp->data = $oddsMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//获取比赛赔率
	public function execute() {
		$oddsJson = $this->httpGet('http://i.sporttery.cn/odds_calculator/get_odds?poolcode[]=hhad&poolcode[]=had&poolcode[]=crs&poolcode[]=ttg&poolcode[]=hafu', $this->cookie);
		$oddsJson = json_decode($oddsJson);
		$rpcData = $oddsJson->data;
		if (empty($oddsJson) || empty($rpcData) || count($rpcData) <= 0) {
			$this->common->logger->info('获取赔率json有误');
			return;
		}
		//得到玩法
		$getBettypeMapResp = $this->getBettypeMap();
		if ($getBettypeMapResp->errCode != 0) {
			$this->common->logger->info($getBettypeMapResp->msg);
			return;
		}
		$bettypeMap = $getBettypeMapResp->data;
		//得到联赛
		$getLeagueMapResp = $this->getLeagueMap();
		if ($getLeagueMapResp->errCode != 0) {
			$this->common->logger->info($getLeagueMapResp->msg);
			return;
		}
		$leagueMap = $getLeagueMapResp->data;
		//得到球队
		$getTeamMapResp = $this->getTeamMap();
		if ($getTeamMapResp->errCode != 0) {
			$this->common->logger->info($getTeamMapResp->msg);
			return;
		}
		$teamMap = $getTeamMapResp->data;
		//得到比赛
		$getMatchMapResp = $this->getMatchMap();
		if ($getMatchMapResp->errCode != 0) {
			$this->common->logger->info($getMatchMapResp->msg);
			return;
		}
		$matchMap = $getMatchMapResp->data;

		$database = requireModule("Database");
		//更新比赛
		$sqlArr = array();
		foreach($rpcData as $match) {
			$sportteryMatchId = (int)$match->id;
			$number = trim($match->num);
			$beginTime = trim($match->date).' '.trim($match->time);
			$saleTime = preg_replace('/\D/', '', substr(trim($match->b_date), 0, 10));
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			$commonMatchId = $saleTime.$week.$num;
			if ($sportteryMatchId <= 0 || empty($number) || empty($beginTime) || empty($saleTime) || empty($week) || empty($num) || !preg_match('/^\d{12}$/', $commonMatchId)) {
				continue;
			}
            $league = trim($match->l_cn_abbr ? $match->l_cn_abbr : $match->l_cn);   //联赛
            $home = trim($match->h_cn_abbr ? $match->h_cn_abbr : $match->h_cn);   //主队名称
            $away = trim($match->a_cn_abbr ? $match->a_cn_abbr : $match->a_cn);   //客队名称
			$homeLogoImg = '';
			$awayLogoImg = '';
			if (!empty($league) && !empty($leagueMap[$league])) {
				$shortSimplifiedName = trim($leagueMap[$league]['shortSimplifiedName']);
				if (!empty($shortSimplifiedName)) {
					$league = $shortSimplifiedName;
				}
			}
			if (!empty($home) && !empty($teamMap[$home])) {
				$logoImg = trim($teamMap[$home]['logoImg']);
				if (!empty($logoImg)) {
					$homeLogoImg = $logoImg;
				}
			}
			if (!empty($away) && !empty($teamMap[$away])) {
				$logoImg = trim($teamMap[$away]['logoImg']);
				if (!empty($logoImg)) {
					$awayLogoImg = $logoImg;
				}
			}
			$field = array();
			$field[] = 'type=1';
            $field[] = 'commonMatchId="'.$database->escape($commonMatchId).'"';
			$field[] = 'sportteryMatchId="'.$database->escape($sportteryMatchId).'"';
			if (property_exists($match, 'num')) {
				$field[] = 'number="'.$database->escape($number).'"';
			}
			if (property_exists($match, 'l_cn')) {
				$field[] = 'league="'.$database->escape($league).'"';
			}
			if (property_exists($match, 'h_cn')) {
				$field[] = 'home="'.$database->escape($home).'"';
			}
			if (property_exists($match, 'a_cn')) {
				$field[] = 'away="'.$database->escape($away).'"';
			}
			if (!empty($homeLogoImg)) {
				$field[] = 'homeLogoImg="'.$database->escape($homeLogoImg).'"';
			}
			if (!empty($awayLogoImg)) {
				$field[] = 'awayLogoImg="'.$database->escape($awayLogoImg).'"';
			}
			if (property_exists($match, 'date')) {
				$field[] = 'beginTime="'.$database->escape($beginTime).'"';
			}
			if (property_exists($match, 'b_date')) {
				$field[] = 'saleTime="'.$database->escape(trim($match->b_date)).'"';
			}
			//加奖(16位二进制), 预留3,预留2,预留1,总进球,[半全场|大小分],[比分|胜分差],[让球胜平负|让分胜负],[胜平负|胜负],预留5,预留4,预留3,预留2,预留1,连串,包含,单关
			$attachPrize = 0;
			if (property_exists($match, 'had') && !empty($bettypeMap['SPF'])) {
				$had = $match->had;
				$single = (int)$had->single;
				if ($single == 1) {
					$attachPrize = $attachPrize | pow(2, 0);
					$attachPrize = $attachPrize | pow(2, 8);
				}
			}
			if (property_exists($match, 'hhad') && !empty($bettypeMap['RQSPF'])) {
				$hhad = $match->hhad;
				$single = (int)$hhad->single;
				if ($single == 1) {
					$attachPrize = $attachPrize | pow(2, 0);
					$attachPrize = $attachPrize | pow(2, 9);
				}
			}
			$field[] = 'attachPrize=if(attachPrize,attachPrize,' . $database->escape($attachPrize) . ')';
			if (count($field) == 0) {
				continue;
			}
			if (empty($matchMap[$commonMatchId])) {
				$field[] = 'createTime=now()';
				$sqlArr[] = 'insert into t_match set '.implode(',', $field);
			} else {
				$matchId = (int)$matchMap[$commonMatchId]['matchId'];
				if ($matchId > 0) {
					$sqlArr[] = 'update t_match set '.implode(',', $field).' where matchId="'.$matchId.'" limit 1';
				}
			}
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('竞彩网足球比赛更新成功');
			} else {
				$this->common->logger->info('竞彩网足球比赛更新失败');
			}
		}

		//重新查询比赛表(得到最新)
		$getMatchMapResp = $this->getMatchMap();
		if ($getMatchMapResp->errCode != 0) {
			$this->common->logger->info($getMatchMapResp->msg);
			return;
		}
		$matchMap = $getMatchMapResp->data;
		//得到赔率
		$getOddsMapResp = $this->getOddsMap($matchMap);
		if ($getOddsMapResp->errCode != 0) {
			$this->common->logger->info($getOddsMapResp->msg);
			return;
		}
		$oddsMap = $getOddsMapResp->data;

		//更新比赛赔率
		$sqlArr = array();
		foreach($rpcData as $match) {
			$sportteryMatchId = (int)$match->id;
			$number = trim($match->num);
			$beginTime = trim($match->date).' '.trim($match->time);
			$saleTime = preg_replace('/\D/', '', substr(trim($match->b_date), 0, 10));
			$week = $this->weekMap[trim(mb_substr($number, 0, 2))];
			$num = trim(mb_substr($number, 2));
			$commonMatchId = $saleTime.$week.$num;
			$localMatch = $matchMap[$commonMatchId];
			if ($sportteryMatchId <= 0 || empty($number) || empty($beginTime) || empty($saleTime) || empty($week) || empty($num) || !preg_match('/^\d{12}$/', $commonMatchId) || empty($localMatch)) {
				continue;
			}
			$matchId = (int)$localMatch['matchId'];
			$beginTime = trim($localMatch['beginTime']);
			$saleTime = trim($localMatch['saleTime']);
			if ($matchId <= 0 || empty($beginTime) || empty($saleTime)) {
				continue;
			}
			//让球胜平负
			if (property_exists($match, 'hhad') && !empty($bettypeMap['RQSPF'])) {
				$hhad = $match->hhad;
				$bettype = $bettypeMap['RQSPF'];
				$bettypeOdds = '{"S":"'.trim($hhad->h).'","P":"'.trim($hhad->d).'","F":"'.trim($hhad->a).'"}';
				$concede = trim($hhad->fixedodds);
				$single = (int)$hhad->single;
				$sale = (int)((int)$hhad->cbt != 2);
				if (empty($concede)) {
					$concede = 0;
				}
				$field = array();
				$field[] = 'type=1';
				$field[] = 'matchId="' . $database->escape($matchId) . '"';
				$field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'saleTime="' . $database->escape($saleTime) . '"';
				$field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
				$field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
				$field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
				$field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
				$field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
				$field[] = 'concede="' . $database->escape($concede) . '"';
				$field[] = 'single=if(single,single,' . $database->escape($single) . ')';
				if (date('H:i') > '09:00' && date('Y-m-d H:i:s') < $beginTime) {
					$field[] = 'sale="' . $database->escape($sale) . '"';
				}
				if (empty($oddsMap[$matchId.'-RQSPF'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-RQSPF']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//胜平负
			if (property_exists($match, 'had') && !empty($bettypeMap['SPF'])) {
				$had = $match->had;
				$bettype = $bettypeMap['SPF'];
				$bettypeOdds = '{"S":"'.trim($had->h).'","P":"'.trim($had->d).'","F":"'.trim($had->a).'"}';
				$single = (int)$had->single;
				$sale = (int)((int)$had->cbt != 2);
				$field = array();
				$field[] = 'type=1';
				$field[] = 'matchId="' . $database->escape($matchId) . '"';
				$field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'saleTime="' . $database->escape($saleTime) . '"';
				$field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
				$field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
				$field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
				$field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
				$field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
				$field[] = 'single=if(single,single,' . $database->escape($single) . ')';
				if (date('H:i') > '09:00' && date('Y-m-d H:i:s') < $beginTime) {
					$field[] = 'sale="' . $database->escape($sale) . '"';
				}
				if (empty($oddsMap[$matchId.'-SPF'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-SPF']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//比分
			if (property_exists($match, 'crs') && !empty($bettypeMap['BF'])) {
				$crs = $match->crs;
				$bettype = $bettypeMap['BF'];
				$bettypeOdds = '{"1:0":"'.trim($crs->{'0100'}).'","2:0":"'.trim($crs->{'0200'}).'","2:1":"'.trim($crs->{'0201'}).'","3:0":"'.trim($crs->{'0300'}).'","3:1":"'.trim($crs->{'0301'}).'","3:2":"'.trim($crs->{'0302'}).'","4:0":"'.trim($crs->{'0400'}).'","4:1":"'.trim($crs->{'0401'}).'","4:2":"'.trim($crs->{'0402'}).'","5:0":"'.trim($crs->{'0500'}).'","5:1":"'.trim($crs->{'0501'}).'","5:2":"'.trim($crs->{'0502'}).'","SQT":"'.trim($crs->{'-1-h'}).'","0:0":"'.trim($crs->{'0000'}).'","1:1":"'.trim($crs->{'0101'}).'","2:2":"'.trim($crs->{'0202'}).'","3:3":"'.trim($crs->{'0303'}).'","PQT":"'.trim($crs->{'-1-d'}).'","0:1":"'.trim($crs->{'0001'}).'","0:2":"'.trim($crs->{'0002'}).'","1:2":"'.trim($crs->{'0102'}).'","0:3":"'.trim($crs->{'0003'}).'","1:3":"'.trim($crs->{'0103'}).'","2:3":"'.trim($crs->{'0203'}).'","0:4":"'.trim($crs->{'0004'}).'","1:4":"'.trim($crs->{'0104'}).'","2:4":"'.trim($crs->{'0204'}).'","0:5":"'.trim($crs->{'0005'}).'","1:5":"'.trim($crs->{'0105'}).'","2:5":"'.trim($crs->{'0205'}).'","FQT":"'.trim($crs->{'-1-a'}).'"}';
				$single = (int)$crs->single;
				$sale = (int)((int)$crs->cbt != 2);
				$field = array();
				$field[] = 'type=1';
				$field[] = 'matchId="' . $database->escape($matchId) . '"';
				$field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'saleTime="' . $database->escape($saleTime) . '"';
				$field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
				$field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
				$field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
				$field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
				$field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
				$field[] = 'single=if(single,single,' . $database->escape($single) . ')';
				if (date('H:i') > '09:00' && date('Y-m-d H:i:s') < $beginTime) {
					$field[] = 'sale="' . $database->escape($sale) . '"';
				}
				if (empty($oddsMap[$matchId.'-BF'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-BF']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//总进球
			if (property_exists($match, 'ttg') && !empty($bettypeMap['ZJQ'])) {
				$ttg = $match->ttg;
				$bettype = $bettypeMap['ZJQ'];
				$bettypeOdds = '{"0":"'.trim($ttg->s0).'","1":"'.trim($ttg->s1).'","2":"'.trim($ttg->s2).'","3":"'.trim($ttg->s3).'","4":"'.trim($ttg->s4).'","5":"'.trim($ttg->s5).'","6":"'.trim($ttg->s6).'","7+":"'.trim($ttg->s7).'"}';
				$single = (int)$ttg->single;
				$sale = (int)((int)$ttg->cbt != 2);
				$field = array();
				$field[] = 'type=1';
				$field[] = 'matchId="' . $database->escape($matchId) . '"';
				$field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'saleTime="' . $database->escape($saleTime) . '"';
				$field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
				$field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
				$field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
				$field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
				$field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
				$field[] = 'single=if(single,single,' . $database->escape($single) . ')';
				if (date('H:i') > '09:00' && date('Y-m-d H:i:s') < $beginTime) {
					$field[] = 'sale="' . $database->escape($sale) . '"';
				}
				if (empty($oddsMap[$matchId.'-ZJQ'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-ZJQ']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//半全场
			if (property_exists($match, 'hafu') && !empty($bettypeMap['BQC'])) {
				$hafu = $match->hafu;
				$bettype = $bettypeMap['BQC'];
				$bettypeOdds = '{"SS":"'.trim($hafu->hh).'","SP":"'.trim($hafu->hd).'","SF":"'.trim($hafu->ha).'","PS":"'.trim($hafu->dh).'","PP":"'.trim($hafu->dd).'","PF":"'.trim($hafu->da).'","FS":"'.trim($hafu->ah).'","FP":"'.trim($hafu->ad).'","FF":"'.trim($hafu->aa).'"}';
				$single = (int)$hafu->single;
				$sale = (int)((int)$hafu->cbt != 2);
				$field = array();
				$field[] = 'type=1';
				$field[] = 'matchId="' . $database->escape($matchId) . '"';
				$field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
				$field[] = 'beginTime="' . $database->escape($beginTime) . '"';
				$field[] = 'saleTime="' . $database->escape($saleTime) . '"';
				$field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
				$field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
				$field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
				$field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
				$field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
				$field[] = 'single=if(single,single,' . $database->escape($single) . ')';
				if (date('H:i') > '09:00' && date('Y-m-d H:i:s') < $beginTime) {
					$field[] = 'sale="' . $database->escape($sale) . '"';
				}
				if (empty($oddsMap[$matchId.'-BQC'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-BQC']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
		}
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('竞彩网足球赔率更新成功');
			} else {
				$this->common->logger->info('竞彩网足球赔率更新失败');
			}
		}
		$database->close();
	}

	//更新比赛的球队id,联赛id
    public function executeUpdate() {
        //查询比赛
        $param = array();
        $param['type'] = 1;
        $param['nullResult'] = true;    //没有赛果
        $param['beginTime'] = date('Y-m-d H:i:s');
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('查询比赛异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        if (count($matchList) <= 0) {
            $this->common->logger->info('没有需要更新的数据');
            return;
        }
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($matchList as $info) {
            $matchId = (int)$info['matchId'];
            $sportteryMatchId = (int)$info['sportteryMatchId'];
            $localHomeTeamId = (int)$info['sportteryHomeTeamId'];
            $localAwayTeamId = (int)$info['sportteryAwayTeamId'];
            $sportteryLeagueInfo = trim($info['sportteryLeagueInfo']);
            if ($matchId <= 0 || $sportteryMatchId <= 0) {
                $this->common->logger->info('数据错误');
                return;
            }
            if ($localHomeTeamId > 0 && $localAwayTeamId > 0 && !empty($sportteryLeagueInfo)) {
                continue;
            }
            //http://i.sporttery.cn/api/fb_match_info/get_match_info?mid=107219&_=1524648249218
            $oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_match_info?mid='.$sportteryMatchId.'&_='.time(), $this->cookie);
            $oddsJson = json_decode($oddsJson);
            $status = $oddsJson->status->code;
            $matchInfo = $oddsJson->result;
            if (empty($oddsJson) || $status != 0 || empty($matchInfo)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            $homeTeamId = (int)$matchInfo->h_id_dc;
            $awayTeamId = (int)$matchInfo->a_id_dc;
            $seasonId = (int)$matchInfo->s_id_dc;   //赛季id
            $leagueId = (int)$matchInfo->l_id_dc;   //联赛id
            $groupId = (int)$matchInfo->g_id_dc;    //小组id  可能为0
            if ($homeTeamId < 0 || $awayTeamId < 0) {
                continue;
            }
            $sportteryLeagueInfoArr = array();
            $sportteryLeagueInfoArr['seasonId'] = $seasonId;
            $sportteryLeagueInfoArr['leagueId'] = $leagueId;
            $sportteryLeagueInfoArr['groupId'] = $groupId;
            $sportteryLeagueInfo = json_encode($sportteryLeagueInfoArr);
            $field = array();
            $field[] = 'sportteryHomeTeamId="' . $database->escape($homeTeamId) . '"';
            $field[] = 'sportteryAwayTeamId="' . $database->escape($awayTeamId) . '"';
            $field[] = 'sportteryLeagueInfo="' . $database->escape($sportteryLeagueInfo) . '"';
            $sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" and sportteryMatchId = "'.$sportteryMatchId.'" limit 1';
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('竞彩网球队id联赛信息更新成功');
            } else {
                $this->common->logger->info('竞彩网球队id联赛信息更新失败');
            }
        }
        $database->close();
        $this->common->logger->info('竞彩网球队id联赛信息更新完成');
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
$spider->executeUpdate();
