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

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
		$this->libraryService = requireService("Library");
	}
	//获取比赛赔率
	public function execute() {
        $date = date('Y-m-d');
        $oddsJson = file_get_contents('http://a.okooo.com/I/?method=mc.data.schedule.getSportterySchedule&LotteryType=SportterySoccerMix&version=2.5.4&LotteryNo=' . $date);
        $oddsJson = json_decode($oddsJson);
        if (empty($oddsJson)) {
            $this->common->logger->info('获取赔率json有误');
            return;
        }
        $code = $oddsJson->code;
        $codeStr = trim($oddsJson->code_str);
        $info = $oddsJson->info;
        if ($code != 0 && $codeStr != 'Succeed' && empty($info)) {
            $this->common->logger->info('获取数据有误');
            return;
        }
        $okoooMatchList = $info->schedule->Matches;  //比赛列表
        $okoooOddsList = $info->odds;    //赔率列表
        //重组okooo比赛和赔率数组
        $okoooMatchMap = array();
        foreach ($okoooMatchList as $okoooMatch) {
            $number = trim($okoooMatch->MatchOrder);
            $okoooMatchMap[$number] = $okoooMatch;
            //胜平负:SportteryNWDL
            //让球胜平负：SportteryWDL
            //比分：SportteryScore         single
            //半全场：SportteryHalfFull     single
            //总进球：SportteryTotalGoals   single
            $okoooMatchMap[$number]->SPF = $okoooOddsList->SportteryNWDL->$number;
            $okoooMatchMap[$number]->RQSPF = $okoooOddsList->SportteryWDL->$number;
            $okoooMatchMap[$number]->BF = $okoooOddsList->SportteryScore->$number;
            $okoooMatchMap[$number]->BQC = $okoooOddsList->SportteryHalfFull->$number;
            $okoooMatchMap[$number]->ZJQ = $okoooOddsList->SportteryTotalGoals->$number;
        }
        $selectBeginTime = date("Y-m-d H:i:s", time() - 3 * 3600 * 24);//三天前的时间开始查询
        //查询比赛
        $param = array();
        $param['type'] = 1;
        $param['beginTime'] = $selectBeginTime;
        $param['pageNum'] = 1;
        $param['pageSize'] = 2000;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('查询比赛异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        $matchMap = array();
        foreach ($matchList as $info) {
            $commonMatchId = trim($info['commonMatchId']);
            $matchId = (int)$info['matchId'];
            $number = trim($info['number']);
            $beginTime = trim($info['beginTime']);
            if ($matchId > 0 && !empty($commonMatchId) && !empty($number) && !empty($beginTime)) {
                $matchMap[$commonMatchId] = $info;
            }
        }
        //查询比赛玩法
        $param = array();
        $param['type'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 2000;
        $selectMatchBettypeResp = $this->matchService->selectMatchBettype($param);
        if ($selectMatchBettypeResp->errCode != 0) {
            $this->common->logger->info('查询比赛玩法异常');
            return;
        }
        $matchBettypeList = $selectMatchBettypeResp->data['list'];
        $matchBettypeMap = array();
        foreach ($matchBettypeList as $info) {
            $content = trim($info['content']);
            if (!empty($content)) {
                $matchBettypeMap[$content] = $info;
            }
        }

        //查询比赛赔率表
        $param = array();
        $param['type'] = 1;
        $param['beginTime'] = $selectBeginTime;
        $param['pageNum'] = 1;
        $param['pageSize'] = 2000;
        $selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
        if ($selectMatchOddsResp->errCode != 0) {
            $this->common->logger->info('查询比赛赔率异常');
            return;
        }
        $matchOddsList = $selectMatchOddsResp->data['list'];
        $matchOddsMap = array();
        foreach ($matchOddsList as $info) {
            $matchId = (int)$info['matchId'];
            $bettypeContent = trim($info['bettypeContent']);
            if ($matchId > 0 && !empty($bettypeContent)) {
                $matchOddsMap[$matchId . '-' . $bettypeContent] = $info;
            }
        }

        //查询联赛信息
        $param = array();
        $param['type'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $param['needCount'] = false;
        $selectLeagueResp = $this->libraryService->selectLeague($param);
        if ($selectLeagueResp->errCode != 0) {
            $this->common->logger->info('联赛查询异常');
            return;
        }
        $leagueList = $selectLeagueResp->data['list'];
        if (!is_array($leagueList) || count($leagueList) <= 0) {
            $this->common->logger->info('联赛查询异常');
            return;
        }
        $leagueMap = array();
        foreach ($leagueList as $league) {
            $simplifiedName = trim($league['simplifiedName']);
            $shortSimplifiedName = trim($league['shortSimplifiedName']);//短简体名称
            if (!empty($simplifiedName)) {
                $leagueMap[$simplifiedName] = $league;
            }
            if (!empty($shortSimplifiedName)) {
                $leagueMap[$shortSimplifiedName] = $league;
            }
        }
        //查询球队
        $param = array();
        $param['type'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $param['needCount'] = false;
        $selectTeamResp = $this->libraryService->selectTeam($param);
        if ($selectTeamResp->errCode != 0) {
            $this->common->logger->info('球队查询异常');
            return;
        }
        $teamList = $selectTeamResp->data['list'];
        if (!is_array($teamList) || count($teamList) <= 0) {
            $this->common->logger->info('球队查询异常');
            return;
        }
        $teamMap = array();
        foreach ($teamList as $team) {
            $simplifiedName = trim($team['simplifiedName']);
            $shortSimplifiedName = trim($team['shortSimplifiedName']);
            if (!empty($simplifiedName)) {
                $teamMap[$simplifiedName] = $team;
            }
            if (!empty($shortSimplifiedName)) {
                $teamMap[$shortSimplifiedName] = $team;
            }
        }

        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($okoooMatchMap as $match) {
            $okoooMatchId = (int)$match->MatchID;
            $number = trim($match->MatchOrder);
            $beginTime = trim($match->MatchTime);
            $saleTime = trim($match->BetDate);
            if ($okoooMatchId <= 0 || empty($number) || empty($beginTime) || empty($saleTime)) {
                continue;
            }
            $league = trim($match->LeagueName);
            $home = trim($match->HomeName);
            $away = trim($match->AwayName);
            $commonMatchId = trim(date('Ymd', strtotime($saleTime))).$number;
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
            $field[] = 'commonMatchId="'.$database->escape(trim($commonMatchId)).'"';
            if (property_exists($match, 'MatchID')) {
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
            }
            if (property_exists($match, 'MatchOrderCn')) {
                $field[] = 'number="' . $database->escape($match->MatchOrderCn) . '"';
            }
            if (property_exists($match, 'MatchTime')) {
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
            }
            if (property_exists($match, 'BetDate')) {
                $field[] = 'saleTime="'.$database->escape(trim($saleTime)).'"';
            }
            if (property_exists($match, 'LeagueName')) {
                $field[] = 'league="' . $database->escape($league) . '"';
            }
            if (property_exists($match, 'HomeName')) {
                $field[] = 'home="' . $database->escape($home) . '"';
            }
            if (property_exists($match, 'AwayName')) {
                $field[] = 'away="' . $database->escape($away) . '"';
            }
            if (!empty($homeLogoImg)) {
                $field[] = 'homeLogoImg="' . $database->escape($homeLogoImg) . '"';
            }
            if (!empty($awayLogoImg)) {
                $field[] = 'awayLogoImg="' . $database->escape($awayLogoImg) . '"';
            }
            if ($commonMatchId != '' && empty($matchMap[$commonMatchId])) {
                //插入
                $field[] = 'createTime=now()';
                $sqlArr[] = 'insert into t_match set ' . implode(',', $field);
            }
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('比赛更新成功');
            } else {
                $this->common->logger->info('比赛更新失败');
            }
        }
        //重新查询比赛表(得到最新)
        $param = array();
        $param['type'] = 1;
        $param['beginTime'] = $selectBeginTime;
        $param['pageNum'] = 1;
        $param['pageSize'] = 2000;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('重新查询比赛异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        $matchMap = array();
        foreach ($matchList as $info) {
            $commonMatchId = trim($info['commonMatchId']);
            $matchId = (int)$info['matchId'];
            $number = trim($info['number']);
            $beginTime = trim($info['beginTime']);
            if ($matchId > 0 && !empty($commonMatchId) && !empty($number) && !empty($beginTime)) {
                $matchMap[$commonMatchId] = $info;
            }
        }
        //更新赔率
        $sqlArr = array();
        //胜平负:SportteryNWDL
        //让球胜平负：SportteryWDL
        //比分：SportteryScore         single
        //半全场：SportteryHalfFull     single
        //总进球：SportteryTotalGoals   single
        foreach ($okoooMatchMap as $k => $match) {
            $okoooMatchId = trim($match->MatchID);
            $number = trim($match->MatchOrder);
            $beginTime = trim($match->MatchTime);
            $saleTime = trim($match->BetDate);
            if ($okoooMatchId <= 0 || empty($number) || empty($beginTime) || empty($saleTime)) {
                continue;
            }
            $commonMatchId = trim(date('Ymd',strtotime($saleTime))).$number;
            $matchId = (int)$matchMap[$commonMatchId]['matchId'];
            $saleTime = trim($matchMap[$commonMatchId]['saleTime']);
            if ($matchId < 0) {
                continue;
            }
            //胜平负 SportteryNWDL
            if (property_exists($match, 'SPF') && !empty($matchBettypeMap['SPF'])) {
                $SPF = $match->SPF;
                $bettype = $matchBettypeMap['SPF'];
                $bettypeOdds = '{"S":"' . trim($SPF[0]) . '","P":"' . trim($SPF[1]) . '","F":"' . trim($SPF[2]) . '"}';
                $single = (int)$match->PassTypeList->SportteryNWDL->single;
                $field = array();
                $field[] = 'type=1';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
                $field[] = 'saleTime="' . $database->escape($saleTime) . '"';
                $field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
                $field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
                $field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
                $field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
                $field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
                $field[] = 'single="' . $database->escape($single) . '"';
                if (empty($matchOddsMap[$matchId . '-SPF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-SPF']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //让球胜平负  SportteryWDL
            if (property_exists($match, 'RQSPF') && !empty($matchBettypeMap['RQSPF'])) {
                $RQSPF = $match->RQSPF;
                $bettype = $matchBettypeMap['RQSPF'];
                $bettypeOdds = '{"S":"' . trim($RQSPF[0]) . '","P":"' . trim($RQSPF[1]) . '","F":"' . trim($RQSPF[2]) . '"}';
                $concede = (int)$match->HandicapNumber;
                $single = (int)$match->PassTypeList->SportteryWDL->single;
                if (empty($concede)) {
                    $concede = 0;
                }
                $field = array();
                $field[] = 'type=1';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
                $field[] = 'saleTime="' . $database->escape($saleTime) . '"';
                $field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
                $field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
                $field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
                $field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
                $field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
                $field[] = 'concede="' . $database->escape($concede) . '"';
                $field[] = 'single="' . $database->escape($single) . '"';
                if (empty($matchOddsMap[$matchId . '-RQSPF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-RQSPF']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //比分  SportteryScore
            if (property_exists($match, 'BF') && !empty($matchBettypeMap['BF'])) {
                $BF = $match->BF;
                $bettype = $matchBettypeMap['BF'];
                $bettypeOdds = '{"1:0":"' . trim($BF[0]) . '","2:0":"' . trim($BF[1]) . '","2:1":"' . trim($BF[2]) . '","3:0":"' . trim($BF[3]) . '","3:1":"' . trim($BF[4]) . '","3:2":"' . trim($BF[5]) . '","4:0":"' . trim($BF[6]) . '","4:1":"' . trim($BF[7]) . '","4:2":"' . trim($BF[8]) . '","5:0":"' . trim($BF[9]) . '","5:1":"' . trim($BF[10]) . '","5:2":"' . trim($BF[11]) . '","SQT":"' . trim($BF[12]) . '","0:0":"' . trim($BF[13]) . '","1:1":"' . trim($BF[14]) . '","2:2":"' . trim($BF[15]) . '","3:3":"' . trim($BF[16]) . '","PQT":"' . trim($BF[17]) . '","0:1":"' . trim($BF[18]) . '","0:2":"' . trim($BF[19]) . '","1:2":"' . trim($BF[20]) . '","0:3":"' . trim($BF[21]) . '","1:3":"' . trim($BF[22]) . '","2:3":"' . trim($BF[23]) . '","0:4":"' . trim($BF[24]) . '","1:4":"' . trim($BF[25]) . '","2:4":"' . trim($BF[26]) . '","0:5":"' . trim($BF[27]) . '","1:5":"' . trim($BF[28]) . '","2:5":"' . trim($BF[29]) . '","FQT":"' . trim($BF[30]) . '"}';
                $single = (int)$match->PassTypeList->SportteryScore->single;
                $field = array();
                $field[] = 'type=1';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
                $field[] = 'saleTime="' . $database->escape($saleTime) . '"';
                $field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
                $field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
                $field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
                $field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
                $field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
                $field[] = 'single="' . $database->escape($single) . '"';
                if (empty($matchOddsMap[$matchId . '-BF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-BF']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //总进球  SportteryTotalGoals
            if (property_exists($match, 'ZJQ') && !empty($matchBettypeMap['ZJQ'])) {
                $ZJQ = $match->ZJQ;
                $bettype = $matchBettypeMap['ZJQ'];
                $bettypeOdds = '{"0":"' . trim($ZJQ[0]) . '","1":"' . trim($ZJQ[1]) . '","2":"' . trim($ZJQ[2]) . '","3":"' . trim($ZJQ[3]) . '","4":"' . trim($ZJQ[4]) . '","5":"' . trim($ZJQ[5]) . '","6":"' . trim($ZJQ[6]) . '","7+":"' . trim($ZJQ[7]) . '"}';
                $single = (int)$match->PassTypeList->SportteryTotalGoals->single;
                $field = array();
                $field[] = 'type=1';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
                $field[] = 'saleTime="' . $database->escape($saleTime) . '"';
                $field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
                $field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
                $field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
                $field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
                $field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
                $field[] = 'single="' . $database->escape($single) . '"';
                if (empty($matchOddsMap[$matchId . '-ZJQ'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-ZJQ']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //半全场  SportteryHalfFull
            if (property_exists($match, 'BQC') && !empty($matchBettypeMap['BQC'])) {
                $BQC = $match->BQC;
                $bettype = $matchBettypeMap['BQC'];
                $bettypeOdds = '{"SS":"' . trim($BQC[0]) . '","SP":"' . trim($BQC[1]) . '","SF":"' . trim($BQC[2]) . '","PS":"' . trim($BQC[3]) . '","PP":"' . trim($BQC[4]) . '","PF":"' . trim($BQC[5]) . '","FS":"' . trim($BQC[6]) . '","FP":"' . trim($BQC[7]) . '","FF":"' . trim($BQC[8]) . '"}';
                $single = (int)$match->PassTypeList->SportteryHalfFull->single;
                $field = array();
                $field[] = 'type=1';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'okoooMatchId="' . $database->escape($okoooMatchId) . '"';
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
                $field[] = 'saleTime="' . $database->escape($saleTime) . '"';
                $field[] = 'bettypeId="' . $database->escape($bettype['bettypeId']) . '"';
                $field[] = 'bettypeName="' . $database->escape($bettype['name']) . '"';
                $field[] = 'bettypeContent="' . $database->escape($bettype['content']) . '"';
                $field[] = 'bettypeValue="' . $database->escape($bettype['value']) . '"';
                $field[] = 'bettypeOdds="' . $database->escape($bettypeOdds) . '"';
                $field[] = 'single="' . $database->escape($single) . '"';
                if (empty($matchOddsMap[$matchId . '-BQC'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-BQC']['oddsId'];
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
                $this->common->logger->info('赔率更新成功');
            } else {
                $this->common->logger->info('赔率更新失败');
            }
        }
        $database->close();

    }

}
$spider = new Spider();
$spider->execute();
