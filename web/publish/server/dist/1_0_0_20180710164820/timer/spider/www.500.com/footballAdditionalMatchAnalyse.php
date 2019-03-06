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
            //$m500MatchId = (int)$info['500MatchId'];
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
        if ($type != 3) {
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
            $m500MatchId = (int)$item['m500MatchId'];
            $m500BookmakerId = (int)$item['m500BookmakerId'];
            $key = $m500MatchId.'-'.$m500BookmakerId.'-'.$type;
            if (empty($analysisLMap[$key])) {
                $analysisLMap[$key] = $item;
            }
        }
        $resp->data = $analysisLMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }


    //获取500体育比赛数据   http://ews.500.com/score/zq/info?vtype=jczq&expect=2018-04-25&_t=1524644297794
    private function exectM500() {
        $resp = requireModule('Resp');
        //获取未来5天的数据
        $time = time();
        $matchMap = array();
        for ($i = 0; $i < 5; $i++) {
            $expectTime = $time + $i*24*3600;
            $expect = date('Y-m-d', $expectTime);
            $todayResult = $this->httpGet('http://ews.500.com/score/zq/info?vtype=jczq&expect='.$expect.'&_t='.$time);
            $todayResult = json_decode($todayResult);
            $data = $todayResult->data->matches;
            foreach ($data as $match) {
                $m500MatchId = $match->wid;
                $number = trim($match->order);
                $beginTime = trim($match->matchtime);
                $saleTime = preg_replace('/\D/', '', substr($expect, 0, 10));
                $week = $this->weekMap[trim(mb_substr($number, 0, 2))];
                $num = trim(mb_substr($number, 2));
                $commonMatchId = $saleTime.$week.$num;
                if ($m500MatchId <= 0 || empty($number) || empty($beginTime) || empty($saleTime) || empty($week) || empty($num) || !preg_match('/^\d{12}$/', $commonMatchId)) {
                    continue;
                }
                if (empty($matchMap[$commonMatchId])) {
                    $matchMap[$commonMatchId] = $match;
                }
            }
        }
        $resp->data = $matchMap;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function execute() {
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
        $getAdditionalMatchOddsMapResp = $this->getAdditionalMatchOddsMap(3);
        if ($getAdditionalMatchOddsMapResp->errCode != 0) {
            $this->common->logger->info($getAdditionalMatchOddsMapResp->msg);
            return;
        }
        $daxiaoOddsMap = $getAdditionalMatchOddsMapResp->data;
        //得到500数据
        $exectM500Resp = $this->exectM500();
        if ($exectM500Resp->errCode != 0) {
            $this->common->logger->info($exectM500Resp->msg);
            return;
        }
        $m500MatchList = $exectM500Resp->data;
        foreach ($matchList as $item) {
            $matchId = (int)$item['matchId'];
            $sportteryMatchId = (int)$item['sportteryMatchId'];
            $commonMatchId = trim($item['commonMatchId']);
            $number = trim($item['number']);
            if ($matchId < 0 || $sportteryMatchId < 0 || empty($number) || empty($commonMatchId)) {
                $this->common->logger->info('数据错误');
                return;
            }
            $m500MatchId = $m500MatchList[$commonMatchId]->fid;
            if ($m500MatchId <= 0) {
                continue;
            }
            //$oddsJson = $this->httpGet('http://i.sporttery.cn/api/fb_match_info/get_europe/?mid='.$sportteryMatchId, $this->cookie);
            $oddsJson = $this->httpGet('http://ews.500.com/score/zq/daxiaoqiu?fid='.$m500MatchId);
            $oddsJson = json_decode($oddsJson);
            $status = $oddsJson->status;
            $daxiaoOddsList = $oddsJson->data->odds;
            if (empty($oddsJson) || $status != 100 || empty($daxiaoOddsList)) {
                $this->common->logger->info('获取赔率json有误');
                return;
            }
            $database = requireModule("Database");
            foreach ($daxiaoOddsList as $daxiaoOdds) {
                $m500BookmakerId = (int)($daxiaoOdds->cid);
                $bookmaker = trim($daxiaoOdds->name);
                $firstBig = trim($daxiaoOdds->first->big);
                $firstSmall = trim($daxiaoOdds->first->small);
                $firstHandicap = trim($daxiaoOdds->first->handi);
                $endBig = trim($daxiaoOdds->end->big);
                $endSmall = trim($daxiaoOdds->end->small);
                $endHandicap = trim($daxiaoOdds->end->handi);
                $bigChange = trim($daxiaoOdds->end->b);//1是红色表示升
                $smallChange = trim($daxiaoOdds->end->s);
                $handicapChange = trim($daxiaoOdds->end->pk);
                if ($bigChange == 1) {
                    $bigChange = 'up';
                } else if ($bigChange == -1) {
                    $bigChange = 'down';
                } else if ($bigChange == 0) {
                    $bigChange = 'equal';
                }
                if ($smallChange == 1) {
                    $smallChange = 'up';
                } else if ($smallChange == -1) {
                    $smallChange = 'down';
                } else if ($smallChange == 0) {
                    $smallChange = 'equal';
                }
                if ($handicapChange == 1) {
                    $handicapChange = 'up';
                } else if ($handicapChange == -1) {
                    $handicapChange = 'down';
                } else if ($handicapChange == 0) {
                    $handicapChange = 'equal';
                }
                $firstOdds = array('big'=>$firstBig, 'small'=>$firstSmall, 'handicap'=>$firstHandicap);
                $endOdds = array('big'=>$endBig, 'small'=>$endSmall, 'handicap'=>$endHandicap);
                $oddsChange = array('bigChange'=>$bigChange, 'smallChange'=>$smallChange, 'handicapChange'=>$handicapChange);
                $firstOdds = json_encode($firstOdds);
                $endOdds = json_encode($endOdds);
                $oddsChange = json_encode($oddsChange);
                $type = 3;//1=欧赔，2=亚盘，3=大小分
                $key = $m500MatchId.'-'.$m500BookmakerId.'-'.$type;
                if ($m500MatchId < 0 || empty($bookmaker) || empty($firstOdds) || empty($endOdds) || empty($oddsChange)) {
                    continue;
                }
                $field = array();
                $field[] = 'type="' . $database->escape($type) . '"';
                $field[] = 'matchId="' . $database->escape($matchId) . '"';
                $field[] = 'commonMatchId="' . $database->escape($commonMatchId) . '"';
                $field[] = 'm500MatchId="' . $database->escape($m500MatchId) . '"';
                $field[] = 'm500BookmakerId="' . $database->escape($m500BookmakerId) . '"';
                $field[] = 'bookmaker="' . $database->escape($bookmaker) . '"';
                $field[] = 'firstOdds="' . $database->escape($firstOdds) . '"';
                $field[] = 'endOdds="' . $database->escape($endOdds) . '"';
                $field[] = 'oddsChange="' . $database->escape($oddsChange) . '"';
                if (empty($daxiaoOddsMap[$key])) {
                    $field[] = 'createTime=now()';
                    $sqlArr[] = 'insert into t_additional_match_odds set ' . implode(',', $field);
                } else {
                    $m500MatchId = (int)$daxiaoOddsMap[$key]['m500MatchId'];
                    $m500BookmakerId = (int)$daxiaoOddsMap[$key]['m500BookmakerId'];
                    if ($sportteryMatchId > 0 && $m500BookmakerId > 0) {
                        $sqlArr[] = 'update t_additional_match_odds set ' . implode(',', $field) . ' where type=3 and m500MatchId="' . $m500MatchId . '" and m500BookmakerId="' . $m500BookmakerId . '" limit 1';
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
                $this->common->logger->info('500体育大小球数据更新成功');
            } else {
                $this->common->logger->info('500体育大小球数据更新失败');
            }
        }
        $database->close();
    }

    public function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 10);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }
}
$spider = new Spider();
$spider->execute();