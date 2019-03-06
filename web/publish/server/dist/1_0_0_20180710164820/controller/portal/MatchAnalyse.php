<?php
namespace controller\portal;
use controller\Base;

class MatchAnalyse extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;
    private $userService;
    private $matchService;
    public $loginUserInfo;
    public $loginUserRight;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
        $this->userService = requireService("User");
        $this->matchService = requireService("Match");
        $this->handicapMap = array(
            '平手' => array('-', '0'),
            '平手/半球'    => array('-', '0.25'),
            '半球'    => array('-', '0.5'),
            '半球/一球'    => array('-', '0.75'),
            '一球'    => array('-', '1'),
            '一球/一球半'    => array('-', '1.25'),
            '一球半'    => array('-', '1.5'),
            '一球半/两球'    => array('-', '1.75'),
            '两球'    => array('-', '2'),
            '两球/两球半'    => array('-', '2.25'),
            '两球半'    => array('-', '2.5'),
            '两球半/三球'    => array('-', '2.75'),
            '三球'    => array('-', '3'),
            '三球/三球半'    => array('-', '3.25'),
            '三球半'    => array('-', '3.5'),
            '三球半/四球'    => array('-', '3.75'),
            '四球'    => array('-', '4'),


            '受让平手/半球'    => array('+', '0.25'),
            '受让半球'    => array('+', '0.5'),
            '受让半球/一球'    => array('+', '0.75'),
            '受让一球'    => array('+', '1'),
            '受让一球/一球半'    => array('+', '1.25'),
            '受让一球半'    => array('+', '1.5'),
            '受让一球半/两球'    => array('+', '1.75'),
            '受让两球'    => array('+', '2'),
            '受让两球/两球半'    => array('+', '2.25'),
            '受让两球半'    => array('+', '2.5'),
            '受让两球半/三球'    => array('+', '2.75'),
            '受让三球'    => array('+', '3'),
            '受让三球/三球半'    => array('+', '3.25'),
            '受让三球半'    => array('+', '3.5'),
            '受让三球半/四球'    => array('+', '3.75'),
            '受让四球'    => array('+', '4'),
        );
    }

    //欧赔,亚盘，大小数据
    public function matchOddsAnalyseList() {
        $matchId = (int)$this->common->getParam("matchId", 0);
        $type = (int)$this->common->getParam("type", 0);    //1=欧赔，2=亚盘，3=大小分
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($matchId <= 0) {
            $this->resp->msg = "matchId参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($type <= 0) {
            $this->resp->msg = "type参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 50) {
            $pageSize = 25;
        }
        $param = array();
        $param['type'] = $type;
        $param['matchId'] = $matchId;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectAdditionalMatchOddsResp = $this->matchService->selectAdditionalMatchOdds($param);
        if ($selectAdditionalMatchOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $totalCount = $selectAdditionalMatchOddsResp->data['totalCount'];
        $matchOddsAnalysisList = $selectAdditionalMatchOddsResp->data['list'];
        $oddsList = array();
        foreach ($matchOddsAnalysisList as $item) {
            $bookmaker = trim($item['bookmaker']);
            $firstOdds = trim($item['firstOdds']);
            $endOdds = trim($item['endOdds']);
            $oddsChange = trim($item['oddsChange']);
            $firstOdds = json_decode($firstOdds, true);
            $endOdds = json_decode($endOdds, true);
            $oddsChange = json_decode($oddsChange, true);
            $info = array();
            $info['bookmaker'] = $bookmaker;
            $info['firstOdds'] = $firstOdds;
            $info['endOdds'] = $endOdds;
            $info['oddsChange'] = $oddsChange;
            $oddsList[] = $info;
        }
        if ($type == 2) {
            foreach ($oddsList as &$item) {
                $firstOddsHandicap = $item['firstOdds']['handicap'];
                $endOddsHandicap = $item['firstOdds']['handicap'];
                $firstOddsHandicapArr = $this->handicapMap[$firstOddsHandicap];
                $endOddsHandicapArr = $this->handicapMap[$endOddsHandicap];
                $firstOddsHandicapStr = implode('', $firstOddsHandicapArr);
                $endOddsHandicapStr = implode('', $endOddsHandicapArr);
                if ($firstOddsHandicapStr == '-0') {
                    $firstOddsHandicapStr = 0;
                }
                if ($endOddsHandicapStr == '-0') {
                    $endOddsHandicapStr = 0;
                }
                $item['firstOdds']['handicap'] = $firstOddsHandicapStr;
                $item['endOdds']['handicap'] = $endOddsHandicapStr;
            }
        }
        $data = array('totalCount' => $totalCount, 'list' => $oddsList);
        $this->resp->errCode = 0;
        $this->resp->data = $data;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //小组排名，联赛积分，历史战绩，历史交锋，未来赛事
    public function matchAnalyseList() {
        $matchId = (int)$this->common->getParam("matchId", 0);
        if ($matchId <= 0) {
            $this->resp->msg = "matchId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectMatchByIdResp = $this->matchService->selectMatchById($matchId);
        if ($selectMatchByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $matchInfo = $selectMatchByIdResp->data;
        if (empty($matchInfo)) {
            $this->resp->msg = "比赛信息有误";
            $this->jsonView->out($this->resp);
        }
        $matchInfo = $this->commonService->setMatchLeagueInfoCache(array($matchInfo))[0];
        $sportteryMatchId = (int)$matchInfo['sportteryMatchId'];
        $homeTeamId = (int)$matchInfo['sportteryHomeTeamId'];
        $awayTeamId = (int)$matchInfo['sportteryAwayTeamId'];
        $leagueInfo = trim($matchInfo['sportteryLeagueInfo']);
        $home = trim($matchInfo['home']);
        $away = trim($matchInfo['away']);
        $matchBeginTime = trim($matchInfo['beginTime']);
        $leagueInfoArr = json_decode($leagueInfo, true);
        $leagueId = (int)$leagueInfoArr['leagueId'];
        $groupId = (int)$leagueInfoArr['groupId'];
        $groupScoreList = array();
        $leagueScore = array();
        //展示小组排名列表
        if ($groupId > 0) {
            $param = array();
            $param['groupId'] = $groupId;
            $selectAdditionalTeamScoreResp = $this->matchService->selectAdditionalTeamScore($param);
            if ($selectAdditionalTeamScoreResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $teamScoreList = $selectAdditionalTeamScoreResp->data['list'];
            $rankArr = array();
            foreach ($teamScoreList as $teamScore) {
                $team = trim($teamScore['teamName']);
                $totalResult = trim($teamScore['totalResult']);
                $totalResult = json_decode($totalResult, true);
                $scoreInfo = array();
                $scoreInfo['team'] = $team;
                $scoreInfo['rank'] = (int)$totalResult['rank'];
                $scoreInfo['winCount'] = (int)$totalResult['winCount'];
                $scoreInfo['drawCount'] = (int)$totalResult['drawCount'];
                $scoreInfo['lostCount'] = (int)$totalResult['lostCount'];
                $scoreInfo['goal'] = (int)$totalResult['goal'];
                $scoreInfo['lostGoal'] = (int)$totalResult['lostGoal'];
                $scoreInfo['score'] = (int)$totalResult['score'];
                $rankArr[] = (int)$totalResult['rank'];
                $groupScoreList[] = $scoreInfo;
            }
            if (count($groupScoreList) > 0 && count($rankArr) == count($groupScoreList)) {
                array_multisort($rankArr, SORT_ASC, SORT_NUMERIC, $groupScoreList);
            }
        }
        //展示主客队积分数据
        if ($groupId == 0 && $leagueId > 0) {
            $param = array();
            $param['leagueId'] = $leagueId;
            $param['teamId'] = array($homeTeamId, $awayTeamId);
            $selectMatchGroupScoreResp = $this->matchService->selectAdditionalTeamScore($param);
            if ($selectMatchGroupScoreResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $matchGroupScoreList = $selectMatchGroupScoreResp->data['list'];
            foreach ($matchGroupScoreList as $matchScore) {
                $team = trim($matchScore['teamName']);
                $teamId = trim($matchScore['sportteryTeamId']);
                $totalResult = trim($matchScore['totalResult']);
                $homeResult = trim($matchScore['homeResult']);
                $awayResult = trim($matchScore['awayResult']);
                $totalResult = json_decode($totalResult, true);
                $homeResult = json_decode($homeResult, true);
                $awayResult = json_decode($awayResult, true);
                $isHome = false;
                if ($homeTeamId == $teamId) {
                    $isHome = true;
                }
                //总
                $scoreTotalInfo = array();
                $scoreTotalInfo['team'] = $team;
                $scoreTotalInfo['rank'] = (int)$totalResult['rank'];
                $scoreTotalInfo['winCount'] = (int)$totalResult['winCount'];
                $scoreTotalInfo['drawCount'] = (int)$totalResult['drawCount'];
                $scoreTotalInfo['lostCount'] = (int)$totalResult['lostCount'];
                $scoreTotalInfo['goal'] = (int)$totalResult['goal'];
                $scoreTotalInfo['lostGoal'] = (int)$totalResult['lostGoal'];
                $scoreTotalInfo['score'] = (int)$totalResult['score'];
                $scoreList['total'] = $scoreTotalInfo;
                //主
                $scoreHomeInfo = array();
                $scoreHomeInfo['team'] = $team;
                $scoreHomeInfo['rank'] = (int)$homeResult['rank'];
                $scoreHomeInfo['winCount'] = (int)$homeResult['winCount'];
                $scoreHomeInfo['drawCount'] = (int)$homeResult['drawCount'];
                $scoreHomeInfo['lostCount'] = (int)$homeResult['lostCount'];
                $scoreHomeInfo['goal'] = (int)$homeResult['goal'];
                $scoreHomeInfo['lostGoal'] = (int)$homeResult['lostGoal'];
                $scoreHomeInfo['score'] = (int)$homeResult['score'];
                $scoreList['home'] = $scoreHomeInfo;
                //客
                $scoreAwayInfo = array();
                $scoreAwayInfo['team'] = $team;
                $scoreAwayInfo['rank'] = (int)$awayResult['rank'];
                $scoreAwayInfo['winCount'] = (int)$awayResult['winCount'];
                $scoreAwayInfo['drawCount'] = (int)$awayResult['drawCount'];
                $scoreAwayInfo['lostCount'] = (int)$awayResult['lostCount'];
                $scoreAwayInfo['goal'] = (int)$awayResult['goal'];
                $scoreAwayInfo['lostGoal'] = (int)$awayResult['lostGoal'];
                $scoreAwayInfo['score'] = (int)$awayResult['score'];
                $scoreList['away'] = $scoreAwayInfo;
                $info = array();
                $info['team'] = $team;
                $info['scoreList'] = $scoreList;
                if ($isHome) {
                    $leagueScore['home'] = $info;
                } else {
                    $leagueScore['away'] = $info;
                }
            }
        }

        //历史交锋,主场历史交锋，主队近十场战绩，主队主场近十场战绩，客队近十场战绩，客队主场近十场战绩，
        $param = array();
        $param['teamId'] = array($homeTeamId,$awayTeamId);
        $param['pageNum'] = 1;
        $param['pageSize'] = 500;
        $selectAdditionalMatchResp = $this->matchService->selectAdditionalMatch($param);
        if ($selectAdditionalMatchResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }

        $historyMatchList = $selectAdditionalMatchResp->data['list'];
        $historyAgainstMatchList = array(); //历史交锋
        $homeHistoryAgainstMatchList = array(); //主场历史交锋
        $homeHistoryMatchList = array(); //主队近十场战绩
        $homeHHistoryMatchList = array(); //主队主场近十场战绩
        $awayHistoryMatchList = array(); //客队近十场战绩
        $awayAHistoryMatchList = array(); //客队客场近十场战绩
        $homeFutureMatchList = array();
        $awayFutureMatchList = array();
        foreach ($historyMatchList as $item) {
            $localSportteryMatchId = (int)$item['sportteryMatchId'];
            $sportteryHomeTeamId = (int)$item['sportteryHomeTeamId'];
            $sportteryAwayTeamId = (int)$item['sportteryAwayTeamId'];
            $result = trim($item['result']);
            if ($localSportteryMatchId == $sportteryMatchId || $sportteryHomeTeamId <= 0 || $sportteryAwayTeamId <= 0) {
                continue;
            }
            //历史交锋,主场历史交锋，主队近十场战绩，主队主场近十场战绩，客队近十场战绩，客队主场近十场战绩，未来主场
            if (!empty($result)) {
                //历史数据
                if ($homeTeamId == $sportteryHomeTeamId) {
                    $homeHistoryMatchList[] = $item;
                    $homeHHistoryMatchList[] = $item;
                    if ($awayTeamId == $sportteryAwayTeamId) {
                        $historyAgainstMatchList[] = $item;
                        $homeHistoryAgainstMatchList[] = $item;
                        $awayHistoryMatchList[] = $item;
                        $awayAHistoryMatchList[] = $item;
                    }
                } else if ($homeTeamId == $sportteryAwayTeamId) {
                    $homeHistoryMatchList[] = $item;
                    if ($awayTeamId == $sportteryHomeTeamId) {
                        $historyAgainstMatchList[] = $item;
                        $awayHistoryMatchList[] = $item;
                    }
                } else if ($awayTeamId == $sportteryHomeTeamId) {
                    $awayHistoryMatchList[] = $item;
                } else if ($awayTeamId == $sportteryAwayTeamId) {
                    $awayHistoryMatchList[] = $item;
                    $awayAHistoryMatchList[] = $item;
                }
            } else {
                //未来数据
                if (in_array($homeTeamId, array($sportteryHomeTeamId, $sportteryAwayTeamId))) {
                    $homeFutureMatchList[] = $item;
                }
                if (in_array($awayTeamId, array($sportteryHomeTeamId, $sportteryAwayTeamId))) {
                    $awayFutureMatchList[] = $item;
                }
            }
        }
        //历史交锋
        $historyAgainstMatchData = array();
        if (is_array($historyAgainstMatchList) && count($historyAgainstMatchList) > 0) {
            $historyAgainstMatchList = array_slice($historyAgainstMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($historyAgainstMatchList, $homeTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $historyAgainstMatchData = $setMatchOddsResultResp->data;
            }
        }
        //主场历史交锋
        $homeHistoryAgainstMatchData = array();
        if (is_array($homeHistoryAgainstMatchList) && count($homeHistoryAgainstMatchList) > 0) {
            $homeHistoryAgainstMatchList = array_slice($homeHistoryAgainstMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($homeHistoryAgainstMatchList, $homeTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $homeHistoryAgainstMatchData = $setMatchOddsResultResp->data;
            }
        }
        //主队近期赛事
        $homeHistoryMatchData = array();
        if (is_array($homeHistoryMatchList) && count($homeHistoryMatchList) > 0) {
            $homeHistoryMatchList = array_slice($homeHistoryMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($homeHistoryMatchList, $homeTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $homeHistoryMatchData = $setMatchOddsResultResp->data;
            }
        }
        //主队主场近期赛事
        $homeHHistoryMatchData = array();
        if (is_array($homeHHistoryMatchList) && count($homeHHistoryMatchList) > 0) {
            $homeHHistoryMatchList = array_slice($homeHHistoryMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($homeHHistoryMatchList, $homeTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $homeHHistoryMatchData = $setMatchOddsResultResp->data;
            }
        }
        //客队近期赛事
        $awayHistoryMatchData = array();
        if (is_array($awayHistoryMatchList) && count($awayHistoryMatchList) > 0) {
            $awayHistoryMatchList = array_slice($awayHistoryMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($awayHistoryMatchList, $awayTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $awayHistoryMatchData = $setMatchOddsResultResp->data;
            }
        }
        //客队客场近期赛事
        $awayAHistoryMatchData = array();
        if (is_array($awayAHistoryMatchList) && count($awayAHistoryMatchList) > 0) {
            $awayAHistoryMatchList = array_slice($awayAHistoryMatchList,0,10);
            $setMatchOddsResultResp = $this->setMatchOddsResult($awayAHistoryMatchList, $awayTeamId);
            if ($setMatchOddsResultResp->errCode == 0) {
                $awayAHistoryMatchData = $setMatchOddsResultResp->data;
            }
        }
        //未来赛事数据处理
        $homeFutureMatchData = array();
        if (count($homeFutureMatchList) > 0) {
            $matchDateArr = array();
            foreach ($homeFutureMatchList as $match) {
                $league = trim($match['league']);
                $matchDate = date('Y-m-d', strtotime($match['matchTime']));
                $homeTeam = trim($match['home']);
                $awayTeam = trim($match['away']);
                $sportteryHomeTeamId = (int)$match['sportteryHomeTeamId'];
                $spaceDate = (int)((strtotime($match['matchTime'])-strtotime($matchBeginTime))/(24*3600));
                $info = array();
                $isHome = false;
                if ($homeTeamId == $sportteryHomeTeamId) {
                    $isHome = true;
                }
                $info['league'] = $league;
                $info['isHome'] = $isHome;
                $info['homeTeam'] = $homeTeam;
                $info['awayTeam'] = $awayTeam;
                $info['matchDate'] = $matchDate;
                $info['spaceDays'] = $spaceDate;
                $matchDateArr[] = $matchDate;
                $homeFutureMatchData[] = $info;
            }
            array_multisort($matchDateArr, SORT_ASC, SORT_STRING, $homeFutureMatchData);
        }
        $awayFutureMatchData = array();
        if (count($awayFutureMatchList) > 0) {
            $matchDateArr = array();
            foreach ($awayFutureMatchList as $match) {
                $league = trim($match['league']);
                $matchDate = date('Y-m-d', strtotime($match['matchTime']));
                $homeTeam = trim($match['home']);
                $awayTeam = trim($match['away']);
                $sportteryHomeTeamId = (int)$match['sportteryHomeTeamId'];
                $spaceDate = (int)((strtotime($match['matchTime'])-time())/(24*3600));
                $info = array();
                $isHome = false;
                if ($awayTeamId == $sportteryHomeTeamId) {
                    $isHome = true;
                }
                $info['league'] = $league;
                $info['isHome'] = $isHome;
                $info['homeTeam'] = $homeTeam;
                $info['awayTeam'] = $awayTeam;
                $info['matchDate'] = $matchDate;
                $info['spaceDays'] = $spaceDate;
                $matchDateArr[] = $matchDate;
                $awayFutureMatchData[] = $info;
            }
            array_multisort($matchDateArr, SORT_ASC, SORT_STRING, $awayFutureMatchData);
        }
        $data = array();
        $data['groupScoreList'] = $groupScoreList;

        //数据组装
        if (empty($leagueScore)) {
            $data['leagueScore'] = new \stdClass();
        } else {
            $data['leagueScore'] = $leagueScore;
        }
        //近期战绩
        if (count($homeHistoryMatchData['list']) <= 0 && count($awayHistoryMatchData['list']) <= 0) {
            $data['historyMatchList'] = new \stdClass();
        } else {
            if (count($homeHistoryMatchData['list']) > 0) {
                $data['historyMatchList']['home']['team'] = $home;
                $data['historyMatchList']['home']['all'] = $homeHistoryMatchData;
                if (count($homeHHistoryMatchData['list']) > 0) {
                    $data['historyMatchList']['home']['asHome'] = $homeHHistoryMatchData;
                }
            }
            if (count($awayHistoryMatchData['list']) > 0) {
                $data['historyMatchList']['away']['team'] = $away;
                $data['historyMatchList']['away']['all'] = $awayHistoryMatchData;
                if (count($awayAHistoryMatchData['list']) > 0) {
                    $data['historyMatchList']['away']['asAway'] = $awayAHistoryMatchData;
                }
            }
        }
        //历史交锋
        if (count($historyAgainstMatchData['list']) <= 0 && count($homeHistoryAgainstMatchData['list']) <= 0) {
            $data['againstMatchList'] = new \stdClass();
        } else {
            if (count($historyAgainstMatchData['list']) > 0) {
                $data['againstMatchList']['all'] = $historyAgainstMatchData;
            }
            if (count($homeHistoryAgainstMatchData['list']) > 0) {
                $data['againstMatchList']['asHome'] = $homeHistoryAgainstMatchData;
            }
        }
        //未来赛事
        if (count($homeFutureMatchData) <= 0 && count($awayFutureMatchData) <= 0) {
            $data['futureMatchList'] = new \stdClass();
        } else {
            if (count($homeFutureMatchData) > 0) {
                $data['futureMatchList']['home'] = $homeFutureMatchData;
            }
            if (count($awayFutureMatchData) > 0) {
                $data['futureMatchList']['away'] = $awayFutureMatchData;
            }
        }
        $this->resp->errCode = 0;
        $this->resp->data = $data;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    private function setMatchOddsResult($matchList, $teamId) {
        $resp = requireModule("Resp");
        if (count($matchList) <= 0) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $winCount = 0;
        $drawCount = 0;
        $loseCount = 0;
        $list = array();
        for ($i = 0, $length = count($matchList); $i < $length; $i++) {
            $match = $matchList[$i];
            $league = trim($match['league']);
            $matchDate = date('Y-m-d', strtotime($match['matchTime']));
            $homeTeam = trim($match['home']);
            $awayTeam = trim($match['away']);
            $sportteryHomeTeamId = (int)$match['sportteryHomeTeamId'];
            $sportteryAwayTeamId = (int)$match['sportteryAwayTeamId'];
            $result = trim($match['result']);
            $halfResult = trim($match['halfResult']);
            $handicap = trim($match['handicap']);
            $handicap = json_decode($handicap, true);
            $handicapStr = $handicap['str'];
            $handicapArr = $this->handicapMap[$handicapStr];
            $handicapSign = $handicapArr[0];
            $handicapNumber = $handicapArr[1];
            $resultArr = explode(':', $result);
            $hScore = (int)$resultArr[0];
            $aScore = (int)$resultArr[1];
            $handicapHScore = 0;
            if ($handicapSign == '+') {
                $handicapHScore = $hScore + $handicapNumber;
            } else if ($handicapSign == '-') {
                $handicapHScore = $hScore - $handicapNumber;
            }
            $isHome = false;
            $realResult = '';
            $handicapResult = '';
            if ($teamId == $sportteryHomeTeamId) {
                $isHome = true;
                if ($hScore > $aScore) {
                    $realResult = 'win';
                    $winCount++;
                } else if ($hScore == $aScore) {
                    $realResult = 'draw';
                    $drawCount++;
                } else if ($hScore < $aScore) {
                    $realResult = 'lose';
                    $loseCount++;
                }
                if (!empty($handicapStr)) {
                    if ($handicapHScore > $aScore) {
                        $handicapResult = 'win';
                    } elseif ($handicapHScore == $aScore) {
                        $handicapResult = 'draw';
                    } elseif ($handicapHScore < $aScore) {
                        $handicapResult = 'lose';
                    }
                }
            } else if ($teamId == $sportteryAwayTeamId) {
                $isHome = false;
                if ($hScore < $aScore) {
                    $realResult = 'win';
                    $winCount++;
                } else if ($hScore == $aScore) {
                    $realResult = 'draw';
                    $drawCount++;
                } else if ($hScore > $aScore) {
                    $realResult = 'lose';
                    $loseCount++;
                }
                if (!empty($handicapStr)) {
                    if ($handicapHScore < $aScore) {
                        $handicapResult = 'win';
                    } else if ($handicapHScore == $aScore) {
                        $handicapResult = 'draw';
                    } else if ($handicapHScore > $aScore) {
                        $handicapResult = 'lose';
                    }
                }
            }
            $info = array();
            $info['league'] = $league;
            $info['isHome'] = $isHome;
            $info['homeTeam'] = $homeTeam;
            $info['awayTeam'] = $awayTeam;
            $info['matchDate'] = $matchDate;
            $info['halfResult'] = $halfResult;
            $info['result'] = $result;
            $info['realResult'] = $realResult;
            $handicap = $handicapArr[0] . $handicapArr[1];
            if ($handicap == '-0') {
                $handicap = '0';
            }
            $info['handicap'] = $handicap;
            $info['handicapResult'] = $handicapResult;
            $list[] = $info;
        }
        $sum = array();
        $sum['winCount'] = $winCount;
        $sum['drawCount'] = $drawCount;
        $sum['loseCount'] = $loseCount;
        $data = array('sum'=>$sum, 'list'=>$list);
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}