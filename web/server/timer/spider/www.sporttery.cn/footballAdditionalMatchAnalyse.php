#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class Spider {
	private $common;
	private $matchService;

	public function __construct() {
		$this->common = requireModule("Common");
        $this->weekMap = array('周一' => 1, '周二' => 2, '周三' => 3, '周四' => 4, '周五' => 5, '周六' => 6, '周日' => 7);
		$this->matchService = requireService("Match");
        $this->cookie = $this->getCookie();
	}

    private function getMatchMap() {
        $resp = requireModule('Resp');
        //查询比赛
        $param = array();
        $param['type'] = 1;
        $param['nullResult'] = true;    //没有赛果
        $param['beginTime'] = date('Y-m-d H:i:s');
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $resp->msg = '查询比赛异常';
            return $resp;
        }
        $matchList = $selectMatchResp->data['list'];
        $matchMap = array();
        foreach ($matchList as $info) {
            $matchId = (int)$info['matchId'];
            $sportteryMatchId = (int)$info['sportteryMatchId'];
            $commonMatchId = trim($info['commonMatchId']);
            $number = trim($info['number']);
            if ($matchId > 0 && $sportteryMatchId >0 && !empty($number) && preg_match('/^\d{12}$/', $commonMatchId)) {
                $matchMap[$commonMatchId] = $info;
            }
        }
        $resp->data = $matchMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    private function getAdditionalMatchOddsMap($type) {
        $resp = requireModule('Resp');
        if ($type != 1 && $type != 2) {
            $resp->msg = 'type数据有误';
            return $resp;
        }
        $param = array();
        $param['type'] = $type; //1=欧赔，2=亚盘，3=大小分
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $param['needCount'] = false;
        $selectAdditionalMatchOddsResp = $this->matchService->selectAdditionalMatchOdds($param);
        if ($selectAdditionalMatchOddsResp->errCode != 0) {
            $resp->msg = '分析查询异常';
            return $resp;
        }
        $analysisList = $selectAdditionalMatchOddsResp->data['list'];
        $analysisLMap= array();
        foreach ($analysisList as $item) {
            $sportteryMatchId = (int)$item['sportteryMatchId'];
            $sportteryBookmakerId = (int)$item['sportteryBookmakerId'];
            $key = $sportteryMatchId.'-'.$sportteryBookmakerId.'-'.$type;
            if (empty($analysisLMap[$key])) {
                $analysisLMap[$key] = $item;
            }
        }
        $resp->data = $analysisLMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    private function getAdditionalTeamScoreMap() {
        $resp = requireModule('Resp');
        $param = array();
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $param['needCount'] = false;
        $selectAdditionalTeamScoreResp = $this->matchService->selectAdditionalTeamScore($param);
        if ($selectAdditionalTeamScoreResp->errCode != 0) {
            $resp->msg = '积分查询异常';
            return $resp;
        }
        $scoreList = $selectAdditionalTeamScoreResp->data['list'];
        $scoreMap= array();
        foreach ($scoreList as $item) {
            $sportterySeasonId = (int)$item['sportterySeasonId'];
            $sportteryLeagueId = (int)$item['sportteryLeagueId'];
            $sportteryGroupId = (int)$item['sportteryGroupId'];
            $sportteryTeamId = (int)$item['sportteryTeamId'];
            $key = $sportterySeasonId.'-'.$sportteryLeagueId.'-'.$sportteryGroupId.'-'.$sportteryTeamId;
            if (empty($scoreMap[$key])) {
                $scoreMap[$key] = $item;
            }
        }
        $resp->data = $scoreMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

	//欧赔数据
	public function executeEurope() {
	    //查询t_match中未结束的
        $getMatchMapResp = $this->getMatchMap();
        if ($getMatchMapResp->errCode != 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        $matchList = $getMatchMapResp->data;
        if (count($matchList) <= 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        //得到分析数据
        $getAdditionalMatchOddsMapResp = $this->getAdditionalMatchOddsMap(1);
        if ($getAdditionalMatchOddsMapResp->errCode != 0) {
            $this->common->logger->info($getAdditionalMatchOddsMapResp->msg);
            return;
        }
        $europeOddsMap = $getAdditionalMatchOddsMapResp->data;
        $database = requireModule("Database");
        foreach ($matchList as $item) {
            $matchId = (int)$item['matchId'];
            $sportteryMatchId = (int)$item['sportteryMatchId'];
            $commonMatchId = trim($item['commonMatchId']);
            $number = trim($item['number']);
            if ($matchId < 0 || $sportteryMatchId < 0 || empty($number) || empty($commonMatchId)) {
                $this->common->logger->info('数据错误');
                return;
            }
            //$oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            $oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            $oddsJson = json_decode($oddsJson);
            $status = $oddsJson->status->code;
            $europeOddsList = $oddsJson->result->data;
            if ($status == 20002) {
                continue;
            }
            if (empty($oddsJson) || $status != 0 || empty($europeOddsList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            $europeOddsList = array_slice($europeOddsList,0,25);
            foreach ($europeOddsList as $europeOdds) {
                $sportteryBookmakerId = (int)($europeOdds->id);
                $bookmaker = trim($europeOdds->cn);
                $firstWin = trim($europeOdds->win_s);
                $firstDraw = trim($europeOdds->draw_s);
                $firstLose = trim($europeOdds->lose_s);
                $endWin = trim($europeOdds->win);
                $endDraw = trim($europeOdds->draw);
                $endLose = trim($europeOdds->lose);
                $winChange = trim($europeOdds->win_change);
                $drawChange = trim($europeOdds->draw_change);
                $loseChange = trim($europeOdds->lose_change);
                $firstOdds = array('S' => $firstWin, 'P' => $firstDraw, 'F' => $firstLose);
                $endOdds = array('S' => $endWin, 'P' => $endDraw, 'F' => $endLose);
                $oddsChange = array('S' => $winChange, 'P' => $drawChange, 'F' => $loseChange);
                $firstOdds = json_encode($firstOdds);
                $endOdds = json_encode($endOdds);
                $oddsChange = json_encode($oddsChange);
                $type = 1;//1=欧赔，2=亚盘，3=大小分
                $key = $sportteryMatchId . '-' . $sportteryBookmakerId . '-' . $type;
                if ($sportteryBookmakerId < 0 || empty($bookmaker) || empty($firstOdds) || empty($endOdds) || empty($oddsChange)) {
                    continue;
                }
                $field = array();
                $field[] = 'type="' . $database->escape($type) . '"';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'commonMatchId="' . $database->escape($commonMatchId) . '"';
                $field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
                $field[] = 'sportteryBookmakerId="' . $database->escape($sportteryBookmakerId) . '"';
                $field[] = 'bookmaker="' . $database->escape($bookmaker) . '"';
                $field[] = 'firstOdds="' . $database->escape($firstOdds) . '"';
                $field[] = 'endOdds="' . $database->escape($endOdds) . '"';
                $field[] = 'oddsChange="' . $database->escape($oddsChange) . '"';
                if (empty($europeOddsMap[$key])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_additional_match_odds set ' . implode(',', $field);
                } else {
                    $sportteryMatchId = (int)$europeOddsMap[$key]['sportteryMatchId'];
                    $sportteryBookmakerId = (int)$europeOddsMap[$key]['sportteryBookmakerId'];
                    if ($sportteryMatchId > 0 && $sportteryBookmakerId > 0) {
                        $sqlArr[] = 'update t_additional_match_odds set ' . implode(',', $field) . ' where type=1 and sportteryMatchId="' . $sportteryMatchId . '" and sportteryBookmakerId="' . $sportteryBookmakerId . '" limit 1';
                    }
                }
            }
        }
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
            for ($i = 0, $length = count($sqlArr)/1000; $i < $length; $i++) {
                $sqlArrCut = array_slice($sqlArr,1000*$i,1000);
                $sql = implode(';', $sqlArrCut);
                $result = $database->multiExecute($sql);
                $database->multiFree();
            }
			if ($result) {
				$this->common->logger->info('竞彩网欧赔数据更新成功');
			} else {
				$this->common->logger->info('竞彩网欧赔数据更新失败');
			}
		}
		$database->close();
	}

    //亚盘数据
    public function executeAsia() {
        //查询t_match中未结束的
        $getMatchMapResp = $this->getMatchMap();
        if ($getMatchMapResp->errCode != 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        $matchList = $getMatchMapResp->data;
        if (count($matchList) <= 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        //得到分析数据
        $getAdditionalMatchOddsMapResp = $this->getAdditionalMatchOddsMap(2);
        if ($getAdditionalMatchOddsMapResp->errCode != 0) {
            $this->common->logger->info($getAdditionalMatchOddsMapResp->msg);
            return;
        }
        $asiaOddsMap = $getAdditionalMatchOddsMapResp->data;
        $database = requireModule("Database");
        foreach ($matchList as $item) {
            $matchId = (int)$item['matchId'];
            $sportteryMatchId = (int)$item['sportteryMatchId'];
            $commonMatchId = trim($item['commonMatchId']);
            $number = trim($item['number']);
            if ($matchId < 0 || $sportteryMatchId < 0 || empty($number) || empty($commonMatchId)) {
                $this->common->logger->info('数据错误');
                return;
            }
            //$oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            $oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_asia/?mid='.$sportteryMatchId, $this->cookie);
            $oddsJson = json_decode($oddsJson);
            $status = $oddsJson->status->code;
            $asiaOddsList = $oddsJson->result->data;
            if ($status == 20002) {
                continue;
            }
            if (empty($oddsJson) || $status != 0 || empty($asiaOddsList)) {
                $this->common->logger->info('获取赔率json有误'.$sportteryMatchId);
                return;
            }
            $asiaOddsList = array_slice($asiaOddsList,0,10);
            //print_r($asiaOddsList);exit;
            foreach ($asiaOddsList as $asiaOdds) {
                $sportteryBookmakerId = (int)($asiaOdds->id);
                $bookmaker = trim($asiaOdds->cn);
                $firstHome = trim($asiaOdds->o1_s);
                $firstAway = trim($asiaOdds->o2_s);
                $firstHandicap = trim($asiaOdds->o3_s);
                $endHome = trim($asiaOdds->o1);
                $endAway = trim($asiaOdds->o2);
                $endHandicap = trim($asiaOdds->o3);
                $homeChange = trim($asiaOdds->o1_change);
                $awayChange = trim($asiaOdds->o2_change);
                $firstOdds = array('home'=>$firstHome, 'away'=>$firstAway, 'handicap'=>$firstHandicap);
                $endOdds = array('home'=>$endHome, 'away'=>$endAway, 'handicap'=>$endHandicap);
                $oddsChange = array('homeChange'=>$homeChange, 'awayChange'=>$awayChange);
                $firstOdds = json_encode($firstOdds);
                $endOdds = json_encode($endOdds);
                $oddsChange = json_encode($oddsChange);
                $type = 2;//1=欧赔，2=亚盘，3=大小分
                $key = $sportteryMatchId.'-'.$sportteryBookmakerId.'-'.$type;
                if ($sportteryBookmakerId < 0 || empty($bookmaker) || empty($firstOdds) || empty($endOdds) || empty($oddsChange)) {
                    continue;
                }
                $field = array();
                $field[] = 'type="' . $database->escape($type) . '"';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'commonMatchId="' . $database->escape($commonMatchId) . '"';
                $field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
                $field[] = 'sportteryBookmakerId="' . $database->escape($sportteryBookmakerId) . '"';
                $field[] = 'bookmaker="' . $database->escape($bookmaker) . '"';
                $field[] = 'firstOdds="' . $database->escape($firstOdds) . '"';
                $field[] = 'endOdds="' . $database->escape($endOdds) . '"';
                $field[] = 'oddsChange="' . $database->escape($oddsChange) . '"';
                if (empty($asiaOddsMap[$key])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_additional_match_odds set ' . implode(',', $field);
                } else {
                    $sportteryMatchId = (int)$asiaOddsMap[$key]['sportteryMatchId'];
                    $sportteryBookmakerId = (int)$asiaOddsMap[$key]['sportteryBookmakerId'];
                    if ($sportteryMatchId > 0 && $sportteryBookmakerId > 0) {
                        $sqlArr[] = 'update t_additional_match_odds set ' . implode(',', $field) . ' where type=2 and sportteryMatchId="' . $sportteryMatchId . '" and sportteryBookmakerId="' . $sportteryBookmakerId . '" limit 1';
                    }
                }
            }
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            for ($i = 0, $length = count($sqlArr)/1000; $i < $length; $i++) {
                $sqlArrCut = array_slice($sqlArr,1000*$i,1000);
                $sql = implode(';', $sqlArrCut);
                $result = $database->multiExecute($sql);
                $database->multiFree();
            }
            if ($result) {
                $this->common->logger->info('竞彩网亚盘数据更新成功');
            } else {
                $this->common->logger->info('竞彩网亚盘数据更新失败');
            }
        }
        $database->close();
    }

    //积分数据
    public function executeScore() {
        //查询t_match中未结束的
        $getMatchMapResp = $this->getMatchMap();
        if ($getMatchMapResp->errCode != 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        $matchList = $getMatchMapResp->data;
        if (count($matchList) <= 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        //得到分析数据
        $getAdditionalTeamScoreMapResp = $this->getAdditionalTeamScoreMap();
        if ($getAdditionalTeamScoreMapResp->errCode != 0) {
            $this->common->logger->info($getAdditionalTeamScoreMapResp->msg);
            return;
        }
        $scoreMap = $getAdditionalTeamScoreMapResp->data;
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($matchList as $item) {
            $matchId = (int)$item['matchId'];
            $sportteryMatchId = (int)$item['sportteryMatchId'];
            $commonMatchId = trim($item['commonMatchId']);
            $league = trim($item['league']);
            $sportteryLeagueInfo = trim($item['sportteryLeagueInfo']);
            if ($matchId < 0 || $sportteryMatchId < 0 || empty($commonMatchId) || empty($sportteryLeagueInfo)) {
                $this->common->logger->info('数据错误');
                return;
            }
            //http://i.sporttery.cn/api/fb_match_info/get_team_score?mid=107219&order_type=all&_=1524648249359
            $oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_team_score/?mid='.$sportteryMatchId.'&order_type=all&_='.time(), $this->cookie);
            $oddsJson = json_decode($oddsJson);
            $status = $oddsJson->status->code;
            $scoreList = $oddsJson->result->data;
            //有的比赛没有积分榜
            if ($status == 20002) {
                continue;
            }
            if (empty($oddsJson) || $status != 0 || empty($scoreList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            foreach ($scoreList as $scoreInfo) {
                $sportteryTeamId = (int)($scoreInfo->tid);
                $teamName = trim($scoreInfo->cn);
                $totalResult = array();
                $homeResult = array();
                $awayResult = array();
                $totalResult['rank'] = trim($scoreInfo->rank);
                $totalResult['score'] = trim($scoreInfo->score);
                $totalResult['count'] = trim($scoreInfo->count);
                $totalResult['goal'] = trim($scoreInfo->goal);
                $totalResult['lostGoal'] = trim($scoreInfo->losegoal);
                $totalResult['winCount'] = trim($scoreInfo->win);
                $totalResult['drawCount'] = trim($scoreInfo->draw);
                $totalResult['lostCount'] = trim($scoreInfo->lose);

                $homeResult['rank'] = trim($scoreInfo->h_rank);
                $homeResult['score'] = trim($scoreInfo->h_score);
                $homeResult['count'] = trim($scoreInfo->h_count);
                $homeResult['goal'] = trim($scoreInfo->h_goal);
                $homeResult['lostGoal'] = trim($scoreInfo->h_losegoal);
                $homeResult['winCount'] = trim($scoreInfo->h_win);
                $homeResult['drawCount'] = trim($scoreInfo->h_draw);
                $homeResult['lostCount'] = trim($scoreInfo->h_lose);

                $awayResult['rank'] = trim($scoreInfo->a_rank);
                $awayResult['score'] = trim($scoreInfo->a_score);
                $awayResult['count'] = trim($scoreInfo->a_count);
                $awayResult['goal'] = trim($scoreInfo->a_goal);
                $awayResult['lostGoal'] = trim($scoreInfo->a_losegoal);
                $awayResult['winCount'] = trim($scoreInfo->a_win);
                $awayResult['drawCount'] = trim($scoreInfo->a_draw);
                $awayResult['lostCount'] = trim($scoreInfo->a_goal);
                $totalResultStr = json_encode($totalResult);
                $homeResultStr = json_encode($homeResult);
                $awayResultStr = json_encode($awayResult);
                $sportteryLeagueInfoArr = json_decode($sportteryLeagueInfo, true);
                $sportterySeasonId = $sportteryLeagueInfoArr['seasonId'];
                $sportteryLeagueId = $sportteryLeagueInfoArr['leagueId'];
                $sportteryGroupId = $sportteryLeagueInfoArr['groupId'];
                $key = $sportterySeasonId.'-'.$sportteryLeagueId.'-'.$sportteryGroupId.'-'.$sportteryTeamId;
                if ($sportteryTeamId < 0 || empty($teamName) || empty($totalResult) || empty($homeResult) || empty($awayResult)) {
                    continue;
                }
                $group = '';
                $field = array();
                $field[] = 'sportterySeasonId="' . $database->escape($sportterySeasonId) . '"';
                $field[] = 'sportteryLeagueId="' . $database->escape($sportteryLeagueId) . '"';
                $field[] = 'sportteryGroupId="' . $database->escape($sportteryGroupId) . '"';
                $field[] = 'sportteryTeamId="' . $database->escape($sportteryTeamId) . '"';
                $field[] = 'leagueName="' . $database->escape($league) . '"';
                $field[] = 'groupName="' . $database->escape($group) . '"';
                $field[] = 'teamName="' . $database->escape($teamName) . '"';
                $field[] = 'totalResult="' . $database->escape($totalResultStr) . '"';
                $field[] = 'homeResult="' . $database->escape($homeResultStr) . '"';
                $field[] = 'awayResult="' . $database->escape($awayResultStr) . '"';
                if (empty($scoreMap[$key])) {
                    $field[] = 'createTime=now()';
                    if (empty($sqlArr[$key])) {
                        $sqlArr[$key] = 'insert into t_additional_team_score set ' . implode(',', $field);
                    }
                } else {
                    $sportterySeasonId = (int)$scoreMap[$key]['sportterySeasonId'];
                    $sportteryLeagueId = (int)$scoreMap[$key]['sportteryLeagueId'];
                    $sportteryTeamId = (int)$scoreMap[$key]['sportteryTeamId'];
                    if ($sportteryMatchId > 0 && $sportteryLeagueId > 0 && $sportteryTeamId > 0) {
                        if (empty($sqlArr[$key])) {
                            $sqlArr[$key] = 'update t_additional_team_score set ' . implode(',', $field) . ' where sportterySeasonId="' . $sportterySeasonId . '" and sportteryLeagueId="' . $sportteryLeagueId . '" and sportteryGroupId= "'.$sportteryGroupId.'" and sportteryTeamId="'.$sportteryTeamId.'" limit 1';
                        }
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
                $this->common->logger->info('竞彩网积分数据更新成功');
            } else {
                $this->common->logger->info('竞彩网积分数据更新失败');
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
        curl_setopt($curl, CURLOPT_TIMEOUT, 20);
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
$spider->executeEurope();
$spider->executeAsia();
$spider->executeScore();