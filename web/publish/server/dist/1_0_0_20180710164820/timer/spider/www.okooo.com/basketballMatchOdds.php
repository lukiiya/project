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
        $oddsJson = file_get_contents('http://a.okooo.com/I/?method=mc.data.schedule.getSportterySchedule&LotteryType=SportteryBasketMix&version=2.5.4&LotteryNo=' . $date);
        $oddsJson = json_decode($oddsJson);
        $code = $oddsJson->code;
        $codeStr = trim($oddsJson->code);
        if (empty($oddsJson)) {
            $this->common->logger->info('获取赔率json有误');
            return;
        }
        if ($code != 0 && $codeStr != 'Succeed' && empty($info)) {
            $this->common->logger->info('获取数据有误');
            return;
        }
        $info = $oddsJson->info;
        $okoooMatchList = $info->schedule->Matches;  //比赛列表
        $okoooOddsList = $info->odds;    //赔率列表
        //重组okooo比赛和赔率数组
        $okoooMatchMap = array();
        foreach ($okoooMatchList as $okoooMatch) {
            $number = $okoooMatch->MatchOrder;
            $okoooMatchMap[$number] = $okoooMatch;
            //胜负:SportteryWL     单关不允许购买
            //让分胜负：SportteryHWL
            //胜分差：SportteryWS     single
            //大小分：SportteryBS         single
            $okoooMatchMap[$number]->SF = $okoooOddsList->SportteryWL->$number;
            $okoooMatchMap[$number]->RFSF = $okoooOddsList->SportteryHWL->$number;
            $okoooMatchMap[$number]->SFC = $okoooOddsList->SportteryWS->$number;
            $okoooMatchMap[$number]->DXF = $okoooOddsList->SportteryBS->$number;
        }
        $selectBeginTime = date("Y-m-d H:i:s", time() - 3 * 3600 * 24);//三天前的时间开始查询
        //查询比赛
        $param = array();
        $param['type'] = 2;
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
        $param['type'] = 2;
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
        $param['type'] = 2;
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
        $param['type'] = 2;
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
        $param['type'] = 2;
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
            if ($okoooMatchId <= 0 || empty($number) || empty($beginTime)) {
                continue;
            }
            $league = trim($match->LeagueName);
            $home = trim($match->HomeName);
            $away = trim($match->AwayName);
            $saleTime = trim($match->BetDate);
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
            $field[] = 'type=2';
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
        $param['type'] = 2;
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
        //胜负:SportteryWL     单关不允许购买
        //让分胜平负：SportteryHWL
        //胜分差：SportteryWS     single
        //大小分：SportteryBS         single
        foreach ($okoooMatchMap as $k => $match) {
            $okoooMatchId = trim($match->MatchID);
            $number = trim($match->MatchOrder);
            $beginTime = trim($match->MatchTime);
            $saleTime = trim($match->BetDate);
            $commonMatchId = trim(date('Ymd',strtotime($saleTime))).$number;
            if ($okoooMatchId <= 0 || empty($number) || empty($beginTime)) {
                continue;
            }
            $localMatch = $matchMap[$commonMatchId];
            if (empty($localMatch)) {
                continue;
            }
            $matchId = (int)$localMatch['matchId'];
            $saleTime = trim($localMatch['saleTime']);
            if ($matchId < 0) {
                continue;
            }
            //胜负 SportteryNWDL
            if (property_exists($match, 'SF') && !empty($matchBettypeMap['SF'])) {
                $SF = $match->SF;
                $bettype = $matchBettypeMap['SF'];
                $bettypeOdds = '{"S":"'.trim($SF[0]).'","F":"'.trim($SF[1]).'"}';
                $single = (int)$match->PassTypeList->SportteryWL->single;
                $field = array();
                $field[] = 'type=2';
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
                if (empty($matchOddsMap[$matchId . '-SF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-SF']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //让分胜负：SportteryHWL
            if (property_exists($match, 'RFSF') && !empty($matchBettypeMap['RFSF'])) {
                $RFSF = $match->RFSF;
                $bettype = $matchBettypeMap['RFSF'];
                $bettypeOdds = '{"S":"' . trim($RFSF[0]) . '","F":"' . trim($RFSF[1]) . '"}';
                $concede = trim($match->Mix->SportteryHWL->HandicapNumber);
                $single = (int)$match->PassTypeList->SportteryWDL->single;
                if (empty($concede)) {
                    $concede = 0;
                }
                $field = array();
                $field[] = 'type=2';
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
            //胜分差：SportteryWS     single
            if (property_exists($match, 'SFC') && !empty($matchBettypeMap['SFC'])) {
                $SFC = $match->SFC;
                $bettype = $matchBettypeMap['SFC'];
                $bettypeOdds = '{"S1-5":"'.trim($SFC[0]).'","S6-10":"'.trim($SFC[1]).'","S11-15":"'.trim($SFC[2]).'","S16-20":"'.trim($SFC[3]).'","S21-25":"'.trim($SFC[4]).'","S26+":"'.trim($SFC[5]).'","F1-5":"'.trim($SFC[6]).'","F6-10":"'.trim($SFC[7]).'","F11-15":"'.trim($SFC[8]).'","F16-20":"'.trim($SFC[9]).'","F21-25":"'.trim($SFC[10]).'","F26+":"'.trim($SFC[11]).'"}';
                $single = (int)$match->PassTypeList->SportteryScore->single;
                $field = array();
                $field[] = 'type=2';
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
                if (empty($matchOddsMap[$matchId . '-SFC'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-SFC']['oddsId'];
                    if ($oddsId > 0) {
                        $sqlArr[] = 'update t_match_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                    }
                }
            }
            //大小分：SportteryBS         single
            if (property_exists($match, 'DXF') && !empty($matchBettypeMap['DXF'])) {
                $DXF = $match->DXF;
                $bettype = $matchBettypeMap['DXF'];
                $bettypeOdds = '{"D":"'.trim($DXF[0]).'","X":"'.trim($DXF[1]).'"}';
                $concede = trim($DXF[2]);
                $single = (int)$match->PassTypeList->SportteryBS->single;
                $field = array();
                $field[] = 'type=2';
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
                if (empty($matchOddsMap[$matchId . '-DXF'])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_match_odds set ' . implode(',', $field);
                } else {
                    $oddsId = (int)$matchOddsMap[$matchId . '-DXF']['oddsId'];
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
