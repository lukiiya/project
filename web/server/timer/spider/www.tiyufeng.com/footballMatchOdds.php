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
        //http://tyf.m.letoula.com/
        $oddsJson = file_get_contents('http://api.letoula.com/match/1/?identity=com.tyf.letoula&platform=3');
        $oddsJson = json_decode($oddsJson, true);
        if (empty($oddsJson)) {
            $this->common->logger->info('获取赔率json有误');
            return;
        }
        $code = $oddsJson['code'];
        $tiyufMatchList = $oddsJson['data'];
        if ($code != 0 && empty($tiyufMatchList)) {
            $this->common->logger->info('获取数据有误');
            return;
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
        $weekArry = array('周一', '周二', '周三', '周四', '周五', '周六', '周日');
        foreach ($tiyufMatchList as $match) {
            $tiyufMatchId = (int)$match['id'];
            $commonMatchId = trim($match['gameId']);
            $beginTime = trim(date('Y-m-d H:i:s', $match['matchTime']));
            $saleTime = trim(date('Y-m-d', $match['matchTime']));
            if ($tiyufMatchId <= 0 || empty($commonMatchId) || empty($beginTime) || empty($beginTime)) {
                continue;
            }
            $league = trim($match['matchName']);
            $home = trim($match['host']);
            $away = trim($match['guest']);
            $number = $weekArry[date('N', strtotime(substr($commonMatchId,0,8)))-1].substr($commonMatchId,8);
            $commonMatchId = substr($commonMatchId,0,8).date('N', strtotime(substr($commonMatchId,0,8))).substr($commonMatchId,8);
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
            $field[] = 'number="' . $database->escape(trim($number)) . '"';
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
        //胜平负:SportteryNWDL     单关不允许购买
        //让球胜平负：SportteryWDL
        //比分：SportteryScore         single
        //半全场：SportteryHalfFull     single
        //总进球：SportteryTotalGoals   single
        foreach ($tiyufMatchList as $match) {
            $tiyufMatchId = (int)$match['id'];
            $commonMatchId = trim($match['gameId']);
            $beginTime = trim(date('Y-m-d H:i:s', $match['matchTime']));
            $commonMatchId = substr($commonMatchId,0,8).date('N', strtotime(substr($commonMatchId,0,8))).substr($commonMatchId,8);
            if ($tiyufMatchId <= 0 || empty($commonMatchId) || empty($beginTime)) {
                continue;
            }
            $matchId = (int)$matchMap[$commonMatchId]['matchId'];
            $saleTime = trim($matchMap[$commonMatchId]['saleTime']);
            if ($matchId < 0 || empty($saleTime)) {
                continue;
            }
            $conf = (int)$match['conf'];
            $singleMap = $this->getMatchSingle($conf);
            //胜平负 odds2
            if (in_array('odds2', $match) && !empty($matchBettypeMap['SPF'])) {
                $SPF = $match['odds2'];
                $bettype = $matchBettypeMap['SPF'];
                $bettypeOdds = '{"S":"' . trim($SPF['03']) . '","P":"' . trim($SPF['01']) . '","F":"' . trim($SPF['00']) . '"}';
                $single = (int)$singleMap['SPF'];
                $field = array();
                $field[] = 'type=1';
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
            //让球胜平负  odds3
            if (in_array('odds3',$match) && !empty($matchBettypeMap['RQSPF'])) {
                $RQSPF = $match['odds3'];
                $bettype = $matchBettypeMap['RQSPF'];
                $bettypeOdds = '{"S":"' . trim($RQSPF['03']) . '","P":"' . trim($RQSPF['01']) . '","F":"' . trim($RQSPF['00']) . '"}';
                $concede = (int)$match['rq'];
                $single = (int)$singleMap['SPF'];
                if (empty($concede)) {
                    $concede = 0;
                }
                $field = array();
                $field[] = 'type=1';
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
            //比分  odds4
            if (in_array('odds4', $match) && !empty($matchBettypeMap['BF'])) {
                $BF = $match['odds4'];
                $bettype = $matchBettypeMap['BF'];
                $bettypeOdds = '{"1:0":"' . trim($BF['10']) . '","2:0":"' . trim($BF['20']) . '","2:1":"' . trim($BF['21']) . '","3:0":"' . trim($BF['30']) . '","3:1":"' . trim($BF['31']) . '","3:2":"' . trim($BF['32']) . '","4:0":"' . trim($BF['40']) . '","4:1":"' . trim($BF['41']) . '","4:2":"' . trim($BF['42']) . '","5:0":"' . trim($BF['50']) . '","5:1":"' . trim($BF['51']) . '","5:2":"' . trim($BF['52']) . '","SQT":"' . trim($BF['90']) . '","0:0":"' . trim($BF['00']) . '","1:1":"' . trim($BF['11']) . '","2:2":"' . trim($BF['22']) . '","3:3":"' . trim($BF['33']) . '","PQT":"' . trim($BF['99']) . '","0:1":"' . trim($BF['01']) . '","0:2":"' . trim($BF['02']) . '","1:2":"' . trim($BF['12']) . '","0:3":"' . trim($BF['03']) . '","1:3":"' . trim($BF['13']) . '","2:3":"' . trim($BF['23']) . '","0:4":"' . trim($BF['04']) . '","1:4":"' . trim($BF['14']) . '","2:4":"' . trim($BF['24']) . '","0:5":"' . trim($BF['05']) . '","1:5":"' . trim($BF['15']) . '","2:5":"' . trim($BF['25']) . '","FQT":"' . trim($BF['09']) . '"}';
                $single = (int)$singleMap['BF'];
                $field = array();
                $field[] = 'type=1';
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
            //总进球  odds5
            if (in_array('odds5', $match) && !empty($matchBettypeMap['ZJQ'])) {
                $ZJQ = $match['odds5'];
                $bettype = $matchBettypeMap['ZJQ'];
                $bettypeOdds = '{"0":"' . trim($ZJQ['00']) . '","1":"' . trim($ZJQ['01']) . '","2":"' . trim($ZJQ['02']) . '","3":"' . trim($ZJQ['03']) . '","4":"' . trim($ZJQ['04']) . '","5":"' . trim($ZJQ['05']) . '","6":"' . trim($ZJQ['06']) . '","7+":"' . trim($ZJQ['07']) . '"}';
                $single = (int)$singleMap['ZJQ'];
                $field = array();
                $field[] = 'type=1';
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
            //半全场  odds6
            if (in_array('odds6', $match) && !empty($matchBettypeMap['BQC'])) {
                $BQC = $match['odds6'];
                $bettype = $matchBettypeMap['BQC'];
                $bettypeOdds = '{"SS":"' . trim($BQC['33']) . '","SP":"' . trim($BQC['31']) . '","SF":"' . trim($BQC['30']) . '","PS":"' . trim($BQC['13']) . '","PP":"' . trim($BQC['11']) . '","PF":"' . trim($BQC['10']) . '","FS":"' . trim($BQC['03']) . '","FP":"' . trim($BQC['01']) . '","FF":"' . trim($BQC['00']) . '"}';
                $single = (int)$singleMap['BQC'];
                $field = array();
                $field[] = 'type=1';
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

    private function getMatchSingle($conf) {
        //userRight权限低位开始，第1位=1(推荐权限), 第2位=1(推广权限)
        $singleMap = array(
            'SPF' => 0,
            'RQSPF' => 0,
            'BF' => 0,
            'ZJQ' => 0,
            'BQC' => 0
        );
        $singleMap['SPF'] = ($conf & pow(2, 3)) != 0 ? 1 : 0;
        $singleMap['RQSPF'] = ($conf & pow(2, 5)) != 0 ? 1 : 0;
        $singleMap['BF'] = ($conf & pow(2, 7)) != 0 ? 1 : 0;
        $singleMap['ZJQ'] = ($conf & pow(2, 9)) != 0 ? 1 : 0;
        $singleMap['BQC'] = ($conf & pow(2, 11)) != 0 ? 1 : 0;
        return $singleMap;
    }
}
$spider = new Spider();
$spider->execute();
