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

    private function getMatchTeamMap() {
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
        $teamMap = array();
        $matchMap = array();
        foreach ($matchList as $info) {
            $matchId = (int)$info['matchId'];
            $sportteryMatchId = (int)$info['sportteryMatchId'];
            $sportteryHomeTeamId = (int)$info['sportteryHomeTeamId'];
            $sportteryAwayTeamId = (int)$info['sportteryAwayTeamId'];
            if ($matchId > 0 && $sportteryMatchId >0 && $sportteryHomeTeamId > 0 && $sportteryAwayTeamId > 0) {
                $teamMap[] = $sportteryHomeTeamId;
                $teamMap[] = $sportteryAwayTeamId;
                $matchMap[] = $sportteryMatchId;
            }
        }
        array_unique($teamMap);
        array_unique($matchMap);
        $data = array('teamMap'=>$teamMap, 'matchMap'=>$matchMap);
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    private function getAdditionalMatchMap() {
        $resp = requireModule('Resp');
        $param = array();
        $param['pageNum'] = 1;
        $param['pageSize'] = 5000;
        $param['needCount'] = false;
        $selectAdditionalMatchResp = $this->matchService->selectAdditionalMatch($param);
        if ($selectAdditionalMatchResp->errCode != 0) {
            $resp->msg = '分析查询异常';
            return $resp;
        }
        $additionalMatchList = $selectAdditionalMatchResp->data['list'];
        $additionalMatchMap= array();
        foreach ($additionalMatchList as $item) {
            $sportteryPublicMatchId = (int)$item['sportteryPublicMatchId'];
            if ($sportteryPublicMatchId > 0 && empty($additionalMatchMap[$sportteryPublicMatchId])) {
                    $additionalMatchMap[$sportteryPublicMatchId] = $item;
            }
        }
        $resp->data = $additionalMatchMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

	public function execute() {
	    //查询t_match中未结束的比赛
        $getMatchTeamMapResp = $this->getMatchTeamMap();
        if ($getMatchTeamMapResp->errCode != 0) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        $teamList = $getMatchTeamMapResp->data['teamMap'];
        $matchList = $getMatchTeamMapResp->data['matchMap'];
        $getAdditionalMatchMapResp = $this->getAdditionalMatchMap();
        if ($getAdditionalMatchMapResp->errCode != 0) {
            $this->common->logger->info($getAdditionalMatchMapResp->msg);
            return;
        }
        if (count($teamList) <= 0 || count($matchList) <=0 ) {
            $this->common->logger->info('没有需要获取的数据');
            return;
        }
        $additionalMatchMap = $getAdditionalMatchMapResp->data;
        $database = requireModule("Database");
        $sqlArr = array();
        $sportteryMatchList = array();
        foreach ($teamList as $teamId) {
            if ($teamId < 0) {
                $this->common->logger->info('teamId错误');
                return;
            }
            //$oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            $historyMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_team_rec_data?tid='.$teamId.'&is_ha=all&limit=10&c_id=0&ptype[]=three_-1&ptype[]=asia_229&_='.time(), $this->cookie);
            $historyMatchJson = json_decode($historyMatchJson);
            $status = $historyMatchJson->status->code;
            $historyMatchList = $historyMatchJson->result->data;
            if ($status == '20002') {
                continue;
            }
            if (empty($historyMatchJson) || $status != 0 || empty($historyMatchList)) {
                $this->common->logger->info('获取赔率json有误1');
                return;
            }

            if (count($historyMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $historyMatchList);
            }
            //主客队主场数据
            $hHistoryMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_team_rec_data?tid='.$teamId.'&is_ha=h&limit=10&c_id=0&ptype[]=three_-1&ptype[]=asia_229&_='.time(), $this->cookie);
            $hHistoryMatchJson = json_decode($hHistoryMatchJson);
            $status = $hHistoryMatchJson->status->code;
            $hHistoryMatchList = $hHistoryMatchJson->result->data;
            if ($status == '20002') {
                continue;
            }
            if (empty($hHistoryMatchJson) || $status != 0 || empty($hHistoryMatchList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            if (count($hHistoryMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $hHistoryMatchList);
            }
            //主客队客场数据
            $aHistoryMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_team_rec_data?tid='.$teamId.'&is_ha=a&limit=10&c_id=0&ptype[]=three_-1&ptype[]=asia_229&_='.time(), $this->cookie);
            $aHistoryMatchJson = json_decode($aHistoryMatchJson);
            $status = $aHistoryMatchJson->status->code;
            $aHistoryMatchList = $aHistoryMatchJson->result->data;
            if ($status == '20002') {
                continue;
            }
            if (empty($aHistoryMatchJson) || $status != 0 || empty($aHistoryMatchList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            if (count($aHistoryMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $aHistoryMatchList);
            }
            //未来数据
            $futureMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_future_matches?tid='.$teamId.'&ilimit=4&_='.time(), $this->cookie);
            $futureMatchJson = json_decode($futureMatchJson);
            $status = $futureMatchJson->status->code;
            $futureMatchList = $futureMatchJson->result;
            if ($status == '20002') {
                continue;
            }
            if (empty($futureMatchJson) || $status != 0 || empty($futureMatchList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            if (count($futureMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $futureMatchList);
            }
        }

        foreach ($matchList as $sportteryMatchId) {
            if ($sportteryMatchId <= 0) {
                $this->common->logger->info('数据错误');
                return;
            }
            //$oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            //http://i.sporttery.cn/api/fb_match_info/get_result_his?limit=10&is_ha=all&limit=10&c_id=0&mid=107246&ptype[]=three_-1&ptype[]=asia_229&&f_callback=getResultHistoryInfo&_=1524723922303
            $historyAgainstMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_result_his?limit=10&is_ha=all&limit=10&c_id=0&mid='.$sportteryMatchId.'&ptype[]=three_-1&ptype[]=asia_229&_='.time(), $this->cookie);
            $historyAgainstMatchJson = json_decode($historyAgainstMatchJson);
            $status = $historyAgainstMatchJson->status->code;
            $historyAgainstMatchList = $historyAgainstMatchJson->result->data;
            if ($status == '20002') {
                continue;
            }
            if (empty($historyAgainstMatchJson) || $status != 0 || empty($historyAgainstMatchList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            if (count($historyAgainstMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $historyAgainstMatchList);
            }
            //历史交锋主场
            $hHistoryAgainstMatchJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_result_his?limit=10&is_ha=h&limit=10&c_id=0&mid='.$sportteryMatchId.'&ptype[]=three_-1&ptype[]=asia_229&_='.time(), $this->cookie);
            $hHistoryAgainstMatchJson = json_decode($hHistoryAgainstMatchJson);
            $status = $hHistoryAgainstMatchJson->status->code;
            $hHistoryAgainstMatchList = $hHistoryAgainstMatchJson->result->data;
            if ($status == '20002') {
                continue;
            }
            if (empty($hHistoryAgainstMatchJson) || $status != 0 || empty($hHistoryAgainstMatchList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            if (count($hHistoryAgainstMatchList) > 0) {
                $sportteryMatchList = array_merge($sportteryMatchList, $hHistoryAgainstMatchList);
            }
        }

        foreach ($sportteryMatchList as $match) {
            $odds = array();
            $handicap = array();
            $sportteryPublicMatchId = (int)($match->match_id);
            $sportteryMatchId = (int)($match->sporttery_matchid);
            $matchTime = trim($match->date_cn)  . ' ' . trim($match->time_cn); //比赛日期
            $homeTeamId = (int)$match->h_id_dc; //主队id
            $awayTeamId = (int)$match->a_id_dc;    //客队id
            $homeTeam = trim($match->h_cn_abbr);
            $awayTeam = trim($match->a_cn_abbr);
            $league = trim($match->l_cn_abbr);
            $halfResult = trim($match->half);
            $result = trim($match->final);
            $odds['home'] = trim($match->h);
            $odds['draw'] = trim($match->d);
            $odds['away'] = trim($match->a);
            $handicap['home'] = trim($match->mac_h);
            $handicap['away'] = trim($match->mac_a);
            $handicap['str'] = trim($match->mac_str);
            $odds = json_encode($odds);
            $handicap = json_encode($handicap);
            if ($sportteryPublicMatchId < 0 || $homeTeamId < 0 || $awayTeamId < 0) {
                continue;
            }
            $field = array();
            $field[] = 'sportteryPublicMatchId="' . $database->escape($sportteryPublicMatchId) . '"';
            $field[] = 'sportteryMatchId="' . $database->escape($sportteryMatchId) . '"';
            $field[] = 'sportteryHomeTeamId="' . $database->escape($homeTeamId) . '"';
            $field[] = 'sportteryAwayTeamId="' . $database->escape($awayTeamId) . '"';
            $field[] = 'home="' . $database->escape($homeTeam) . '"';
            $field[] = 'away="' . $database->escape($awayTeam) . '"';
            $field[] = 'league="' . $database->escape($league) . '"';
            $field[] = 'halfResult="' . $database->escape($halfResult) . '"';
            $field[] = 'result="' . $database->escape($result) . '"';
            $field[] = 'odds="' . $database->escape($odds) . '"';
            $field[] = 'handicap="' . $database->escape($handicap) . '"';
            $field[] = 'matchTime="' . $database->escape($matchTime) . '"';
            if (empty($additionalMatchMap[$sportteryPublicMatchId])) {
                $field[] = 'createTime=now()';
                if (empty($sqlArr[$sportteryPublicMatchId])) {
                    $sqlArr[$sportteryPublicMatchId] = 'insert into t_additional_match set ' . implode(',', $field);
                }
            } else {
                if (empty($sqlArr[$sportteryPublicMatchId])) {
                    $sqlArr[$sportteryPublicMatchId] = 'update t_additional_match set ' . implode(',', $field) . ' where sportteryPublicMatchId="' . $sportteryPublicMatchId . '" limit 1';
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
			/*$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();*/
			if ($result) {
				$this->common->logger->info('竞彩网历史赛事更新成功');
			} else {
				$this->common->logger->info('竞彩网历史赛事更新失败');
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