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
		$param['type'] = 2;
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
		$param['type'] = 2;
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
		$param['type'] = 2;
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
		$param['type'] = 2;
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
		$param['type'] = 2;
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
		$oddsJson = $this->httpGet('http://i.sporttery.cn/odds_calculator/get_odds?poolcode[]=mnl&poolcode[]=hdc&poolcode[]=wnm&poolcode[]=hilo', $this->cookie);
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
			$field[] = 'type=2';
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
			if (property_exists($match, 'hdc') && !empty($bettypeMap['RFSF'])) {
				$hdc = $match->hdc;
				$single = (int)$hdc->single;
				if ($single == 1) {
					$attachPrize = $attachPrize | pow(2, 0);
					$attachPrize = $attachPrize | pow(2, 9);
				}
			}
			if (property_exists($match, 'hilo') && !empty($bettypeMap['DXF'])) {
				$hilo = $match->hilo;
				$single = (int)$hilo->single;
				if ($single == 1) {
					$attachPrize = $attachPrize | pow(2, 0);
					$attachPrize = $attachPrize | pow(2, 11);
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
				$this->common->logger->info('竞彩网篮球比赛更新成功');
			} else {
				$this->common->logger->info('竞彩网篮球比赛更新失败');
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
			//胜负mnl
			if (property_exists($match, 'mnl') && !empty($bettypeMap['SF'])) {
				$mnl= $match->mnl;
				$bettype = $bettypeMap['SF'];
				$bettypeOdds = '{"S":"'.trim($mnl->h).'","F":"'.trim($mnl->a).'"}';
				$single = (int)$mnl->single;
				$sale = (int)((int)$mnl->cbt != 2);
				$field = array();
				$field[] = 'type=2';
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
				if (empty($oddsMap[$matchId.'-SF'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-SF']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//让分胜负hdc
			if (property_exists($match, 'hdc') && !empty($bettypeMap['RFSF'])) {
                $hdc = $match->hdc;
                $bettype = $bettypeMap['RFSF'];
                $bettypeOdds = '{"S":"' . trim($hdc->h) . '","F":"' . trim($hdc->a) . '"}';
                $single = (int)$hdc->single;
				$sale = (int)((int)$hdc->cbt != 2);
                $concede = trim($hdc->fixedodds);
                if (empty($concede)) {
                    $concede = 0;
                }
                $field = array();
                $field[] = 'type=2';
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
                if (empty($oddsMap[$matchId . '-RFSF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$oddsMap[$matchId . '-RFSF']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
			//胜分差wnm
			if (property_exists($match, 'wnm') && !empty($bettypeMap['SFC'])) {
				$wnm = $match->wnm;
				$bettype = $bettypeMap['SFC'];
				$bettypeOdds = '{"S1-5":"'.trim($wnm->w1).'","S6-10":"'.trim($wnm->w2).'","S11-15":"'.trim($wnm->w3).'","S16-20":"'.trim($wnm->w4).'","S21-25":"'.trim($wnm->w5).'","S26+":"'.trim($wnm->w6).'","F1-5":"'.trim($wnm->l1).'","F6-10":"'.trim($wnm->l2).'","F11-15":"'.trim($wnm->l3).'","F16-20":"'.trim($wnm->l4).'","F21-25":"'.trim($wnm->l5).'","F26+":"'.trim($wnm->l6).'"}';
				$single = (int)$wnm->single;
				$sale = (int)((int)$wnm->cbt != 2);
				$field = array();
				$field[] = 'type=2';
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
				if (empty($oddsMap[$matchId.'-SFC'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-SFC']['oddsId'];
					if ($oddsId > 0) {
						$sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
					}
				}
			}
			//大小分hilo    h:大，l:小
			if (property_exists($match, 'hilo') && !empty($bettypeMap['DXF'])) {
				$hilo = $match->hilo;
				$bettype = $bettypeMap['DXF'];
				$bettypeOdds = '{"D":"'.trim($hilo->h).'","X":"'.trim($hilo->l).'"}';
                $concede = trim($hilo->fixedodds);
				$single = (int)$hilo->single;
				$sale = (int)((int)$hilo->cbt != 2);
				$field = array();
				$field[] = 'type=2';
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
				if (empty($oddsMap[$matchId.'-DXF'])) {
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
				} else {
					$oddsId = (int)$oddsMap[$matchId.'-DXF']['oddsId'];
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
				$this->common->logger->info('竞彩网篮球赔率更新成功');
			} else {
				$this->common->logger->info('竞彩网篮球赔率更新失败');
			}
		}
		$database->close();
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
