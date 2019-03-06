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
        $oddsJson = file_get_contents('http://api.letoula.com/match/2/?identity=com.tyf.letoula&platform=3');
        $oddsJson = json_decode($oddsJson, true);
        $code = $oddsJson['code'];
        $tiyufMatchList = $oddsJson['data'];
        if (empty($oddsJson)) {
            $this->common->logger->info('获取赔率json有误');
            return;
        }
        if ($code != 0 && empty($tiyufMatchList)) {
            $this->common->logger->info('获取数据有误');
            return;
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
        $weekArry = array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
        foreach ($tiyufMatchList as $match) {
            $tiyufMatchId = (int)$match['id'];
            $commonMatchId = trim($match['gameId']);
            $beginTime = trim(date('Y-m-d H:i:s', $match['stop']+5*60));
            if ($tiyufMatchId <= 0 || empty($commonMatchId) || empty($beginTime)) {
                continue;
            }
            $league = trim($match['matchName']);
            $home = trim($match['host']);
            $away = trim($match['guest']);
            $saleTime = trim(date('Y-m-d', $match['stop']));
            $number = $weekArry[trim(date('w', strtotime(substr($commonMatchId,0,8))))].substr($commonMatchId,8);
            $commonMatchId = substr($commonMatchId,0,8).date('w', strtotime(substr($commonMatchId,0,8))).substr($commonMatchId,8);
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
            $field[] = 'number="' . $database->escape($number) . '"';
            if (in_array('id', $match)) {
                $field[] = 'tiyufMatchId="' . $database->escape($tiyufMatchId) . '"';
            }
            if (in_array('matchTime', $match)) {
                $field[] = 'beginTime="' . $database->escape($beginTime) . '"';
            }
            if (in_array('stop', $match)) {
                $field[] = 'saleTime="'.$database->escape($saleTime).'"';
            }
            if (in_array('matchName', $match)) {
                $field[] = 'league="' . $database->escape($league) . '"';
            }
            if (in_array('host', $match)) {
                $field[] = 'home="' . $database->escape($home) . '"';
            }
            if (in_array('guest', $match)) {
                $field[] = 'away="' . $database->escape($away) . '"';
            }
            if (!empty($homeLogoImg)) {
                $field[] = 'homeLogoImg="' . $database->escape($homeLogoImg) . '"';
            }
            if (!empty($awayLogoImg)) {
                $field[] = 'awayLogoImg="' . $database->escape($awayLogoImg) . '"';
            }
            if (!empty($commonMatchId) && empty($matchMap[$commonMatchId])) {
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
        foreach ($tiyufMatchList as $k => $match) {
            $tiyufMatchId = trim($match['id']);
            $commonMatchId = trim($match['gameId']);
            $commonMatchId = substr($commonMatchId,0,8).date('w', strtotime(substr($commonMatchId,0,8))).substr($commonMatchId,8);
            $beginTime = trim(date('Y-m-d H:i:s', $match['stop']+5*60));
            if ($tiyufMatchId <= 0 || empty($beginTime)) {
                continue;
            }
            $conf = (int)$match['conf'];
            $singleMap = $this->getMatchSingle($conf);
            $localMatch = $matchMap[$commonMatchId];
            if (empty($localMatch)) {
                continue;
            }
            $matchId = (int)$localMatch['matchId'];
            $saleTime = trim($localMatch['saleTime']);
            if ($matchId < 0) {
                continue;
            }
            //胜负 odds2
            if (in_array('odds2', $match) && !empty($matchBettypeMap['SF'])) {
                $SF = $match['odds2'];
                $bettype = $matchBettypeMap['SF'];
                $bettypeOdds = '{"S":"'.trim($SF[3]).'","F":"'.trim($SF[0]).'"}';
                $single = $singleMap['SF'];
                $field = array();
                $field[] = 'type=2';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'tiyufMatchId="' . $database->escape($tiyufMatchId) . '"';
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
            //让分胜负：odds3
            if (in_array('odds3', $match) && !empty($matchBettypeMap['RFSF'])) {
                $RFSF = $match['odds3'];
                $bettype = $matchBettypeMap['RFSF'];
                $bettypeOdds = '{"S":"' . trim($RFSF[3]) . '","F":"' . trim($RFSF[0]) . '"}';
                $concede = trim($match['rf']);
                $single = $singleMap['RFSF'];
                if (empty($concede)) {
                    $concede = 0;
                }
                $field = array();
                $field[] = 'type=2';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'tiyufMatchId="' . $database->escape($tiyufMatchId) . '"';
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
            if (in_array('odds4', $match) && !empty($matchBettypeMap['SFC'])) {
                $SFC = $match['odds4'];
                $bettype = $matchBettypeMap['SFC'];
                $bettypeOdds = '{"S1-5":"'.trim($SFC['11']).'","S6-10":"'.trim($SFC['12']).'","S11-15":"'.trim($SFC['13']).'","S16-20":"'.trim($SFC['14']).'","S21-25":"'.trim($SFC['15']).'","S26+":"'.trim($SFC['16']).'","F1-5":"'.trim($SFC['01']).'","F6-10":"'.trim($SFC['02']).'","F11-15":"'.trim($SFC['03']).'","F16-20":"'.trim($SFC['04']).'","F21-25":"'.trim($SFC['05']).'","F26+":"'.trim($SFC['06']).'"}';
                $single = (int)$singleMap['SFC'];
                $field = array();
                $field[] = 'type=2';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'tiyufMatchId="' . $database->escape($tiyufMatchId) . '"';
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
            //大小分：odds5         single
            if (in_array('odds5', $match) && !empty($matchBettypeMap['DXF'])) {
                $DXF = $match['odds5'];
                $bettype = $matchBettypeMap['DXF'];
                $bettypeOdds = '{"D":"'.trim($DXF[3]).'","X":"'.trim($DXF[0]).'"}';
                $concede = trim($match['dxf']);
                $single = $singleMap['DXF'];
                $field = array();
                $field[] = 'type=2';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'tiyufMatchId="' . $database->escape($tiyufMatchId) . '"';
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

    private function getMatchSingle($conf) {
        //userRight权限低位开始，第1位=1(推荐权限), 第2位=1(推广权限)
        $singleMap = array(
            'SF' => 0,
            'RQSF' => 0,
            'SFC' => 0,
            'DXF' => 0
        );
        $singleMap['SF'] = ($conf & pow(2, 3)) != 0 ? 1 : 0;
        $singleMap['RFSF'] = ($conf & pow(2, 5)) != 0 ? 1 : 0;
        $singleMap['SFC'] = ($conf & pow(2, 7)) != 0 ? 1 : 0;
        $singleMap['DXF'] = ($conf & pow(2, 9)) != 0 ? 1 : 0;
        return $singleMap;
    }
}
$spider = new Spider();
$spider->execute();
