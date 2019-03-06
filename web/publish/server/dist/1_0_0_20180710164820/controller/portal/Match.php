<?php
namespace controller\portal;
use controller\Base;

class Match extends Base {
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
	}

	public function matchInfo() {
		$matchId = (int)$this->common->getParam("matchId", 0);
		if ($matchId <= 0) {
			$this->resp->msg = "matchId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectMatchByIdResp = $this->matchService->selectMatchByIdCache($matchId);
		if ($selectMatchByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchData = $selectMatchByIdResp->data;
        $matchData = $this->commonService->setMatchLeagueInfoCache(array($matchData))[0];  //设置球队联赛排名
		global $curEnvConfig;
		global $staticPath;
		$baseResourceUrl = trim($curEnvConfig->resourceUrl);
		$resourceUrl = $baseResourceUrl.'image/library/team/';
		$resourceCountryUrl = $baseResourceUrl.'image/library/country/';
		$type = (int)$matchData['type'];
		$home = trim($matchData['home']);
		$away = trim($matchData['away']);
		$beginTime = trim($matchData['beginTime']);
		$homeLogoImg = trim($matchData['homeLogoImg']);
		$awayLogoImg = trim($matchData['awayLogoImg']);
		if (file_exists($staticPath.'image/library/country/'.md5($home).'.jpg')) {
			$homeLogoImg = $resourceCountryUrl.md5($home).'.jpg';
		} else if (file_exists($staticPath.'image/library/team/'.md5($home).'.jpg')) {
			$homeLogoImg = $resourceUrl.md5($home).'.jpg';
		} else if (!empty($homeLogoImg)) {
			$homeLogoImg = $resourceUrl.md5($homeLogoImg).'.jpg';
		}
		if (file_exists($staticPath.'image/library/country/'.md5($away).'.jpg')) {
			$awayLogoImg = $resourceCountryUrl.md5($away).'.jpg';
		} else if (file_exists($staticPath.'image/library/team/'.md5($away).'.jpg')) {
			$awayLogoImg = $resourceUrl.md5($away).'.jpg';
		} else if (!empty($awayLogoImg)) {
			$awayLogoImg = $resourceUrl.md5($awayLogoImg).'.jpg';
		}
		$matchInfo = array();
		$matchInfo['sportteryMatchId'] = (int)$matchData['sportteryMatchId'];
        $matchInfo['type'] = (int)$matchData['type'];
		$matchInfo['number'] = trim($matchData['number']);
		$matchInfo['league'] = trim($matchData['league']);
        /*if ($matchInfo['league'] == "美职篮") {
            $matchInfo['league'] = "NBA";
        }*/
		$matchInfo['home'] = trim($matchData['home']);
		$matchInfo['away'] = trim($matchData['away']);
		$matchInfo['homeLogoImg'] = $homeLogoImg;
		$matchInfo['awayLogoImg'] = $awayLogoImg;
		$matchInfo['beginTime'] = $beginTime;
		$matchInfo['result'] = trim($matchData['result']);
		if ($matchInfo['result'] == '取消') {
			$matchInfo['result'] = '　:　';
		}
        $matchInfo['leagueRank'] = $matchData['leagueRank'];
		//获得赔率
		$param = array();
		$param['matchId'] = $matchId;
		$selectMatchOddsResp = $this->matchService->selectMatchOddsCache($param);
		if ($selectMatchOddsResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchOddsList = $selectMatchOddsResp->data['list'];
		if ($type == 1) {
			$bettypeMap = '{"SPF":{"S":"--","P":"--","F":"--"},"RQSPF":{"S":"--","P":"--","F":"--"},"BF":{"1:0":"--","2:0":"--","2:1":"--","3:0":"--","3:1":"--","3:2":"--","4:0":"--","4:1":"--","4:2":"--","5:0":"--","5:1":"--","5:2":"--","SQT":"--","0:0":"--","1:1":"--","2:2":"--","3:3":"--","PQT":"--","0:1":"--","0:2":"--","1:2":"--","0:3":"--","1:3":"--","2:3":"--","0:4":"--","1:4":"--","2:4":"--","0:5":"--","1:5":"--","2:5":"--","FQT":"--"},"ZJQ":{"0":"--","1":"--","2":"--","3":"--","4":"--","5":"--","6":"--","7+":"--"},"BQC":{"SS":"--","SP":"--","SF":"--","PS":"--","PP":"--","PF":"--","FS":"--","FP":"--","FF":"--"}}';
		} elseif ($type == 2) {
			$bettypeMap = '{"SF":{"S":"--","F":"--"},"RFSF":{"S":"--","F":"--"},"SFC":{"S1-5":"--","S6-10":"--","S11-15":"--","S16-20":"--","S21-25":"--","S26+":"--","F1-5":"--","F6-10":"--","F11-15":"--","F16-20":"--","F21-25":"--","F26+":"--"},"DXF":{"D":"--","X":"--"}}';
		}
		$bettypeMap = json_decode($bettypeMap, true);
		$bettype = array();
		for ($i = 0, $length = count($matchOddsList); $i < $length; $i++) {
			$oddsId = (int)$matchOddsList[$i]['oddsId'];
			$bettypeContent = trim($matchOddsList[$i]['bettypeContent']);
			$bettypeOdds = trim($matchOddsList[$i]['bettypeOdds']);
			$single = (int)$matchOddsList[$i]['single'];
			$concede = trim($matchOddsList[$i]['concede']);
			if ($oddsId <= 0|| empty($bettypeContent) || empty($bettypeOdds)) {
				continue;
			}
			if (empty($bettype[$bettypeContent])) {
				$bettype[$bettypeContent] = array();
			}
			if (!empty($bettypeOdds)) {
				$bettypeOdds = json_decode($bettypeOdds);
			}
			$bettype[$bettypeContent]['oddsId'] = $oddsId;
			$bettype[$bettypeContent]['bettypeContent'] = $bettypeContent;
			$bettype[$bettypeContent]['concede'] = $concede;
			$bettype[$bettypeContent]['bettypeOdds'] = $bettypeOdds;
            $bettype[$bettypeContent]['single'] = $single;
		}
		foreach ($bettypeMap as $key => $value) {
			if (!key_exists($key, $bettype)) {
				$odds = array('bettypeContent' => $key, 'bettypeOdds' => $value, 'concede' => 0, 'oddsId' => 0, 'single' => 0);
				$bettype[$key] = $odds;
			}
		}
		$matchInfo['bettype'] = $bettype;
		$matchInfo['isSale'] = !(time() >= (strtotime($beginTime)-(6*60)));

		//临时禁止出票
        $matchInfo['isSale'] = false;

		$this->resp->data = $matchInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到订单列表
	public function matchList() {
        $type = (int)$this->common->getParam("type", 0); //1:足球,2:篮球
		$league = $this->common->getParam("league", '');
		$needYaPan = (bool)$this->common->getParam("needYaPan", false);//筛选亚盘(虚拟出来的彩种)
        $needSingle = (bool)$this->common->getParam("needSingle", false);//只需要单关赛事
        if ($this->common->isApp() && $type <= 0) {
            $type = 1;
        }
        if ($type <= 0) {
            $this->resp->msg = "比赛类型有误";
            $this->jsonView->out($this->resp);
        }
		$param = array();
		$param['needSale'] = true;
		$param['pageNum'] = 1;
		$param['pageSize'] = 1000;
		$param['needCount'] = false;
		$param['type'] = $type;
		if ($needSingle) {
            $param['bettypeContent'] = 'SPF';
            $param['needSingle'] = true;
        }
		$selectMatchOddsResp = $this->matchService->selectMatchOddsCache($param);
		if ($selectMatchOddsResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchOddsList = $selectMatchOddsResp->data['list'];
		$yaPanMatchIdArr = array();
		$yaPanMatchMap = array();
		$matchIdArr = array();
		$stopSaleMatchIdArr = array();
		$bettypeContentMap = array();
        if ($type == 1) {
            $bettypeMap = '{"SPF":{"S":"--","P":"--","F":"--"},"RQSPF":{"S":"--","P":"--","F":"--"},"BF":{"1:0":"--","2:0":"--","2:1":"--","3:0":"--","3:1":"--","3:2":"--","4:0":"--","4:1":"--","4:2":"--","5:0":"--","5:1":"--","5:2":"--","SQT":"--","0:0":"--","1:1":"--","2:2":"--","3:3":"--","PQT":"--","0:1":"--","0:2":"--","1:2":"--","0:3":"--","1:3":"--","2:3":"--","0:4":"--","1:4":"--","2:4":"--","0:5":"--","1:5":"--","2:5":"--","FQT":"--"},"ZJQ":{"0":"--","1":"--","2":"--","3":"--","4":"--","5":"--","6":"--","7+":"--"},"BQC":{"SS":"--","SP":"--","SF":"--","PS":"--","PP":"--","PF":"--","FS":"--","FP":"--","FF":"--"}}';
        } elseif ($type == 2) {
            $bettypeMap = '{"SF":{"S":"--","F":"--"},"RFSF":{"S":"--","F":"--"},"SFC":{"S1-5":"--","S6-10":"--","S11-15":"--","S16-20":"--","S21-25":"--","S26+":"--","F1-5":"--","F6-10":"--","F11-15":"--","F16-20":"--","F21-25":"--","F26+":"--"},"DXF":{"D":"--","X":"--"}}';
        }
        $bettypeMap = json_decode($bettypeMap, true);
		for ($i = 0, $length = count($matchOddsList); $i < $length; $i++) {
			$matchId = (int)$matchOddsList[$i]['matchId'];
			$oddsId = (int)$matchOddsList[$i]['oddsId'];
			$bettypeContent = trim($matchOddsList[$i]['bettypeContent']);
			$bettypeOdds = trim($matchOddsList[$i]['bettypeOdds']);
			$single = (int)$matchOddsList[$i]['single'];
			$concede = trim($matchOddsList[$i]['concede']);
			if ($matchId <= 0 || $oddsId <= 0|| empty($bettypeContent) || empty($bettypeOdds) || in_array($matchId, $stopSaleMatchIdArr)) {
				continue;
			}
			if ($needYaPan && $type == 1 && ($bettypeContent == 'SPF' || ($bettypeContent == 'RQSPF' && abs($concede) == 1))) {
				if (!key_exists($matchId, $yaPanMatchMap)) {
					$yaPanMatchMap[$matchId] = array();
				}
				$yaPanMatchMap[$matchId][$bettypeContent] = true;
			}
			$matchIdArr[] = $matchId;
			if (empty($bettypeContentMap[$matchId])) {
				$bettypeContentMap[$matchId] = array();
			}
			if (empty($bettypeContentMap[$matchId][$bettypeContent])) {
				$bettypeContentMap[$matchId][$bettypeContent] = array();
			}
			if (!empty($bettypeOdds)) {
				$bettypeOdds = json_decode($bettypeOdds);
			}
			$bettypeContentMap[$matchId][$bettypeContent]['oddsId'] = $oddsId;
			$bettypeContentMap[$matchId][$bettypeContent]['bettypeContent'] = $bettypeContent;
			$bettypeContentMap[$matchId][$bettypeContent]['concede'] = $concede;
			$bettypeContentMap[$matchId][$bettypeContent]['bettypeOdds'] = $bettypeOdds;
			$bettypeContentMap[$matchId][$bettypeContent]['single'] = $single;
		}
		foreach ($bettypeContentMap as $matchId => $bettype) {
			foreach ($bettypeMap as $key => $value) {
				if (!key_exists($key, $bettype)) {
					$odds = array('bettypeContent' => $key, 'bettypeOdds' => $value, 'concede' => 0, 'oddsId' => 0, 'single' => 0);
					$bettypeContentMap[$matchId][$key] = $odds;
				}
			}
		}
		if ($needYaPan && $type == 1) {
			foreach ($yaPanMatchMap as $mId => $btMap) {
				if (count($btMap) == 2) {
					$SPF = $bettypeContentMap[$mId]['SPF'];
					$RQSPF = $bettypeContentMap[$mId]['RQSPF'];
					$oddsId = (int)$RQSPF['oddsId'];
					$concede = trim($RQSPF['concede']);
					$spfBettypeOdds = $SPF['bettypeOdds'];
					$rqspfBettypeOdds = $RQSPF['bettypeOdds'];
					if ($oddsId <= 0 || abs($concede) != 1 || empty($spfBettypeOdds) || empty($rqspfBettypeOdds)) {
						continue;
					}
					$bettypeOdds = new \stdClass();
					if ($concede == 1) {
						$concede = "0.5";
						$bettypeOdds->S = $rqspfBettypeOdds->S;
						$bettypeOdds->F = $spfBettypeOdds->F;
					} else if ($concede == -1) {
						$concede = "-0.5";
						$bettypeOdds->S = $spfBettypeOdds->S;
						$bettypeOdds->F = $rqspfBettypeOdds->F;
					}
					//删除之前对象，重新构建亚盘对象
					unset( $bettypeContentMap[$mId]);
					$bettypeContentMap[$mId]['SF'] = array(
						'oddsId' => $oddsId,
						'bettypeContent' => 'SF',
						'concede' => $concede,
						'bettypeOdds' => $bettypeOdds,
						'single' => 0,
					);
					$yaPanMatchIdArr[] = $mId;
				}
			}
			$matchIdArr = $yaPanMatchIdArr;
		}
		$matchIdArr = array_unique($matchIdArr);
		if (count($matchIdArr) <= 0) {
			$this->resp->data = array('list' => array());
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		}
		//查询比赛
		$param = array();
		$param['type'] = $type;
		$param['matchId'] = $matchIdArr;
		$param['league'] = $league;
		$param['pageNum'] = 1;
		$param['pageSize'] = 1000;
		$param['needCount'] = false;
		$selectMatchResp = $this->matchService->selectMatchCache($param);
		if ($selectMatchResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$matchList = $selectMatchResp->data['list'];
		$list = array();
		for ($i = 0, $length = count($matchList); $i < $length; $i++) {
			$matchId = (int)$matchList[$i]['matchId'];
			if ($matchId <= 0 || empty($bettypeContentMap[$matchId])) {
				continue;
			}
			$matchInfo = array();
			$matchInfo['matchId'] = $matchId;
			$matchInfo['type'] = (int)$matchList[$i]['type'];
			$matchInfo['number'] = trim($matchList[$i]['number']);
			$matchInfo['league'] = trim($matchList[$i]['league']);
            /*if ($matchInfo['league'] == "美职篮") {
                $matchInfo['league'] = "NBA";
            }*/
			$matchInfo['home'] = trim($matchList[$i]['home']);
			$matchInfo['away'] = trim($matchList[$i]['away']);
			$matchInfo['beginTime'] = trim($matchList[$i]['beginTime']);
			$matchInfo['saleTime'] = trim($matchList[$i]['saleTime']);
			$matchInfo['bettype'] = $bettypeContentMap[$matchId];
			$list[] = $matchInfo;
		}
		$matchListMap = array();
		$week = array("日", "一", "二", "三", "四", "五", "六");
		for ($i = 0, $length = count($list); $i < $length; $i++) {
			$saleTime = trim($list[$i]['saleTime']);
			$saleTime = strtotime($saleTime);
			$w = date('w', $saleTime);
			$saleTime = date('Y-m-d（周'.$week[$w].'）', $saleTime);
			if (!key_exists($saleTime, $matchListMap)) {
				$matchListMap[$saleTime] = array();
			}
			$matchListMap[$saleTime][] = $list[$i];
		}
		ksort($matchListMap);
		$list = array();
		foreach ($matchListMap as $date => $matchList) {
			$beginTime = array();
			$number = array();
			foreach ($matchList as $match) {
				$beginTime[] = trim($match['beginTime']);
				$number[] = trim($match['number']);
			}
			array_multisort($beginTime, SORT_ASC, SORT_STRING, $number, SORT_ASC, SORT_STRING, $matchList);
			$list[] = array('date' => $date, 'matchList' => $matchList);
		}
		$data = array('list' => $list);
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//日期列表
    public function dateList() {
        $type = (int)$this->common->getParam("type", 0);
        $param = array();
        $param['type'] = $type;
        $param['orderBy'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 1;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $matchList = $selectMatchResp->data['list'];
        $dateList = array();
        foreach ($matchList as $match) {
            $saleTime = date('Y-m-d', strtotime($match['saleTime']));
            if (!key_exists($saleTime, $dateList)) {
                $dateList[$saleTime] = $saleTime;
            }
        }
        $today = date('Y-m-d', time());
        if (!key_exists($today, $dateList)) {
            $dateList[$today] = $today;
        }
        $dateArr = array();
        foreach ($dateList as $k=>$item) {
            if ($today <= $k) {
                $dateArr[] = $k;
            }
        }
        if (count($dateArr) >= 7) {
            $dateArr = array_slice($dateArr, -7);
        } else {
            $restDateCount = 7-count($dateArr);
            $restDateArr = array();
            foreach ($dateList as $k=>$item) {
                if ($today > $k) {
                    $restDateArr[] = $k;
                }
            }
            $restDateArr = array_slice($restDateArr, 0, $restDateCount);
            $dateArr = array_merge($dateArr, $restDateArr);
        }
        $dateList = array();
        $date = array();
        $weekMap = array('周日', '周一','周二','周三','周四','周五','周六');
        foreach ($dateArr as $item) {
            $week = date('w', strtotime($item));
            $dateInfo = array();
            $dateInfo['date'] = $item;
            $dateInfo['week'] = $weekMap[$week];;
            $dateList[] = $dateInfo;
            $date[] = $item;
        }
        array_multisort($date, SORT_ASC, SORT_STRING, $dateList);
        $this->resp->data = $dateList;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	public function hotMatchList() {
    $league = $this->common->getParam("league", '');
    $status = (int)$this->common->getParam("status", 0);
    $type = (int)$this->common->getParam("type", 0);
    $saleTime = trim($this->common->getParam("saleTime", ''));
    $pageNum = (int)$this->common->getParam("pageNum", 0);
    $pageSize = (int)$this->common->getParam("pageSize", 0);
    if ($pageNum <= 0) {
        $pageNum = 1;
    }
    if ($pageSize <= 0) {
        $pageSize = 10;
    }
    if ($pageSize > 50) {
        $pageSize = 50;
    }
    $param = array();
    $param['needHot'] = true;
    $param['league'] = $league;
    $param['status'] = $status;
    $param['type'] = $type;
    $param['pageNum'] = $pageNum;
    $param['pageSize'] = $pageSize;
    $param['needCount'] = true;
    if (!empty($saleTime)) {
        $param['needHot'] = false;
        $param['saleTime'] = $saleTime;
    }
    $selectMatchResp = $this->matchService->selectMatchCache($param);
    if ($selectMatchResp->errCode != 0) {
        $this->resp->msg = "访问异常";
        $this->jsonView->out($this->resp);
    }
    $matchData = $selectMatchResp->data;
    $totalCount = (int)$matchData['totalCount'];
    $matchList = $matchData['list'];
    $matchIdArr = array();
    foreach ($matchList as $match) {
        $matchId = (int)$match['matchId'];
        if ($matchId > 0) {
            $matchIdArr[] = $matchId;
        }
    }
    if (count($matchIdArr) <= 0) {
        $data = array('totalCount' => 0, 'list' => array());
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
    //获取赔率
    $param = array();
    $param['matchId'] = $matchIdArr;
    $selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
    if ($selectMatchOddsResp->errCode != 0) {
        $this->resp->msg = "访问异常";
        $this->jsonView->out($this->resp);
    }
    $oddsList = $selectMatchOddsResp->data['list'];
    $singleMap = array();
    foreach ($oddsList as $odds) {
        $oddsId = (int)$odds['oddsId'];
        $matchId = (int)$odds['matchId'];
        $bettypeContent = trim($odds['bettypeContent']);
        $single = (int)$odds['single'];
        if ($oddsId <= 0 || $matchId <= 0 || empty($bettypeContent)) {
            continue;
        }
        if (!key_exists($matchId, $singleMap)) {
            $singleMap[$matchId] = array();
        }
        $singleMap[$matchId][$bettypeContent] = $single;
    }
    $list = array();
    global $curEnvConfig;
    global $staticPath;
    $baseResourceUrl = trim($curEnvConfig->resourceUrl);
    $resourceUrl = $baseResourceUrl.'image/library/team/';
    $resourceCountryUrl = $baseResourceUrl.'image/library/country/';
    $statusArr = array();
    $beginTimeArr = array();
    $matchList = $this->commonService->setMatchLiveCache($matchList);    //设置直播源
    $matchList = $this->commonService->setMatchLeagueInfoCache($matchList);  //设置球队联赛排名
    for ($i = 0, $length = count($matchList); $i < $length; $i++) {
        $matchId = (int)$matchList[$i]['matchId'];
        $sportteryMatchId = (int)$matchList[$i]['sportteryMatchId'];
        $beginTime = trim($matchList[$i]['beginTime']);
        $result = trim($matchList[$i]['result']);
        $halfResult = trim($matchList[$i]['halfResult']);
        if ($matchId <= 0) {
            continue;
        }
        $home = trim($matchList[$i]['home']);
        $away = trim($matchList[$i]['away']);
        $homeLogoImg = trim($matchList[$i]['homeLogoImg']);
        $awayLogoImg = trim($matchList[$i]['awayLogoImg']);
        if (file_exists($staticPath.'image/library/country/'.md5($home).'.jpg')) {
            $homeLogoImg = $resourceCountryUrl.md5($home).'.jpg';
        } else if (file_exists($staticPath.'image/library/team/'.md5($home).'.jpg')) {
            $homeLogoImg = $resourceUrl.md5($home).'.jpg';
        } else if (!empty($homeLogoImg)) {
            $homeLogoImg = $resourceUrl.md5($homeLogoImg).'.jpg';
        }
        if (file_exists($staticPath.'image/library/country/'.md5($away).'.jpg')) {
            $awayLogoImg = $resourceCountryUrl.md5($away).'.jpg';
        } else if (file_exists($staticPath.'image/library/team/'.md5($away).'.jpg')) {
            $awayLogoImg = $resourceUrl.md5($away).'.jpg';
        } else if (!empty($awayLogoImg)) {
            $awayLogoImg = $resourceUrl.md5($awayLogoImg).'.jpg';
        }
        $matchInfo = array();
        $matchInfo['matchId'] = $matchId;
        $matchInfo['single'] = $singleMap[$matchId];
        $matchInfo['type'] = (int)$matchList[$i]['type'];
        $matchInfo['sportteryMatchId'] = $sportteryMatchId;
        $matchInfo['number'] = trim($matchList[$i]['number']);
        $matchInfo['league'] = trim($matchList[$i]['league']);
        /*if ($matchInfo['league'] == "美职篮") {
            $matchInfo['league'] = "NBA";
        }*/
        $matchInfo['home'] = trim($matchList[$i]['home']);
        $matchInfo['away'] = trim($matchList[$i]['away']);
        $matchInfo['homeLogoImg'] = $homeLogoImg;
        $matchInfo['awayLogoImg'] = $awayLogoImg;
        $matchInfo['beginTime'] = $beginTime;
        $matchInfo['saleTime'] = trim($matchList[$i]['saleTime']);
        $matchInfo['result'] = $result;
        $matchInfo['halfResult'] = $halfResult;
        if ($matchInfo['result'] == '取消') {
            $matchInfo['result'] = '　:　';
        }
        if ($matchInfo['halfResult'] == '取消') {
            $matchInfo['halfResult'] = '　:　';
        }
        $matchInfo['animationUrl'] = !empty($matchList[$i]['animationUrl']) ? $matchList[$i]['animationUrl'] : '';
        $matchInfo['videoUrl'] = !empty($matchList[$i]['videoUrl']) ? $matchList[$i]['videoUrl'] : '';
        $matchInfo['leagueRank'] = $matchList[$i]['leagueRank'];
        $status = 0;  //0=未结束，1=已结束，2=取消
        if (!empty($result)) {
            $status = 1;
        }
        if ($result == '取消') {
            $status = 2;
        }
        $statusArr[] = $status;
        $beginTimeArr[] = $beginTime;
        $matchInfo['status'] = $status;
        $matchInfo['planCount'] = (int)$matchList[$i]['planCount'];
        $matchInfo['orderCount'] = (int)$matchList[$i]['orderCount'];
        $list[] = $matchInfo;
    }
    if (count($statusArr) == count($list) && count($beginTimeArr) == count($list)) {
        array_multisort($statusArr, SORT_ASC, SORT_NUMERIC, $beginTimeArr, SORT_ASC, SORT_STRING, $list);
    }
    $data = array('totalCount' => $totalCount, 'list' => $list);
    $this->resp->data = $data;
    $this->resp->errCode = 0;
    $this->resp->msg = "成功";
    $this->jsonView->out($this->resp);
}

	public function hotMatchLeagueList() {
		$type = (int)$this->common->getParam("type", 0);
		$status = (int)$this->common->getParam("status", 0);
        $saleTime = trim($this->common->getParam("saleTime", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['needHot'] = true;
		$param['type'] = $type;
		$param['status'] = $status;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = false;
        if (!empty($saleTime)) {
            $param['needHot'] = false;
            $param['saleTime'] = $saleTime;
        }
		$selectHotMatchLeagueResp = $this->matchService->selectMatchLeagueCache($param);
		if ($selectHotMatchLeagueResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		/*$list = &$selectHotMatchLeagueResp->data['list'];
		foreach ($list as &$info) {
			if ($info['league'] == "美职篮") {
				$info['league'] = "NBA";
			}
		}*/
		$data = $selectHotMatchLeagueResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function matchLeagueList() {
		$type = (int)$this->common->getParam("type", 0);
		$status = (int)$this->common->getParam("status", 0);
		$needYaPan = (bool)$this->common->getParam("needYaPan", false);//筛选亚盘(虚拟出来的彩种)
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 50;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$matchIdArr = array();
		if ($needYaPan && $type == 1) {
			$param = array();
			$param['needSale'] = true;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1000;
			$param['needCount'] = false;
			$param['type'] = $type;
			$selectMatchOddsResp = $this->matchService->selectMatchOddsCache($param);
			if ($selectMatchOddsResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$matchOddsList = $selectMatchOddsResp->data['list'];
			$yaPanMatchMap = array();
			for ($i = 0, $length = count($matchOddsList); $i < $length; $i++) {
				$matchId = (int)$matchOddsList[$i]['matchId'];
				$oddsId = (int)$matchOddsList[$i]['oddsId'];
				$bettypeContent = trim($matchOddsList[$i]['bettypeContent']);
				$bettypeOdds = trim($matchOddsList[$i]['bettypeOdds']);
				$concede = trim($matchOddsList[$i]['concede']);
				if ($matchId <= 0 || $oddsId <= 0|| empty($bettypeContent) || empty($bettypeOdds)) {
					continue;
				}
				if ($bettypeContent == 'SPF' || ($bettypeContent == 'RQSPF' && abs($concede) == 1)) {
					if (!key_exists($matchId, $yaPanMatchMap)) {
						$yaPanMatchMap[$matchId] = array();
					}
					$yaPanMatchMap[$matchId][$bettypeContent] = true;
				}
			}
			foreach ($yaPanMatchMap as $mId => $btMap) {
				if (count($btMap) == 2) {
					$matchIdArr[] = $mId;
				}
			}
		}
		$param = array();
		$param['matchId'] = $matchIdArr;
		$param['type'] = $type;
		$param['status'] = $status;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = false;
		$selectHotMatchLeagueResp = $this->matchService->selectMatchLeagueCache($param);
		if ($selectHotMatchLeagueResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		/*$list = &$selectHotMatchLeagueResp->data['list'];
		foreach ($list as &$info) {
			if ($info['league'] == "美职篮") {
				$info['league'] = "NBA";
			}
		}*/
		$data = $selectHotMatchLeagueResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到比赛信息
	public function matchRecommend() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$needYaPan = (bool)$this->common->getParam("needYaPan", false);//筛选亚盘(虚拟出来的彩种)
		$matchRecommend = trim($this->common->getParam("matchRecommend", ''));//比赛信息
		if (empty($matchRecommend)) {
			$this->resp->msg = "比赛不能为空";
			$this->jsonView->out($this->resp);
		}
		$mockPlan = array('matchRecommend' => $matchRecommend);
		$mockPlanData = $this->commonService->setMatchListCache(array($mockPlan))[0];
		$matchList = $mockPlanData['matchList'];
		if (empty($mockPlanData) || empty($matchList) || !is_array($matchList)) {
			$this->resp->msg = "比赛信息有误";
			$this->jsonView->out($this->resp);
		}
        $matchListIsSale = false;
        $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
        if ($matchListIsSaleResp->errCode == 0) {
            $matchListIsSale = true;
        }
        $isAllowBuyTicket = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
		if ($needYaPan) {
			$matchList = $this->commonService->setYaPanMatchListCache($matchList);
		}
		$recommendCount = 1;
		$maxBettypeOdds = 1;//计算理论最大赔率
		foreach ($matchList as $match) {
			$recommend = (array)$match['recommend'];
			$bettypeOdds = $match['bettypeOdds'];
			$recommendCount *= count($recommend);
			$odds = array();
			//得到选中的最大赔率
			foreach ($recommend as $r) {
				$odds[] = $bettypeOdds->$r;
			}
			$maxBettypeOdds *= max($odds);
		}
		$isSale = $matchListIsSale && $isAllowBuyTicket;
		$data = array(
			'isSale' => $isSale,
			'maxBettypeOdds' => sprintf('%.2f', $maxBettypeOdds),
			'maxPrizeRate' => sprintf('%.2f', $maxBettypeOdds*100/$recommendCount),
			'recommendCount' => $recommendCount,
			'matchList' => $matchList
		);
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//冠亚军列表
    public function guessList() {
        $lotteryId = trim($this->common->getParam("lotteryId", ''));//类型, 世界杯冠军=SJBGJ,世界杯冠亚军=SJBGYJ
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 100;
        }
        if ($pageSize > 200) {
            $pageSize = 200;
        }
        if (empty($lotteryId)) {
            $this->resp->msg = "lotteryId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['sale'] = 1;
        $param['lotteryId'] = $lotteryId;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectGuessOddsResp = $this->matchService->selectGuessOdds($param);
        if ($selectGuessOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $guessOddsData = $selectGuessOddsResp->data;
        $totalCount = (int)$guessOddsData['totalCount'];
        $guessOddsList = $guessOddsData['list'];
        $list = array();
        for ($i = 0, $length = count($guessOddsList); $i < $length; $i++) {
            $info = array();
            $info['oddsId'] = (int)$guessOddsList[$i]['oddsId'];
            $info['lotteryId'] = trim($guessOddsList[$i]['lotteryId']);
            $info['number'] = (int)$guessOddsList[$i]['number'];
            $info['team'] = trim($guessOddsList[$i]['team']);
            $info['odds'] = trim($guessOddsList[$i]['odds']);
            $info['chance'] = trim($guessOddsList[$i]['chance']);
            $info['sale'] = (int)$guessOddsList[$i]['sale'];
            $list[] = $info;
        }
        $data = array('totalCount' => $totalCount, 'list' => $list);
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //冠亚军竞猜筛选球队map
    public function guessTeamList() {
        $data = array('德国','巴西','阿根廷','法国','西班牙','英格兰','葡萄牙','比利时','俄罗斯','乌拉圭','哥伦比亚','克罗地亚');
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}