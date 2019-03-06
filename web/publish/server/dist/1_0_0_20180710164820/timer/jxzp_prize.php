#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class JxzpPrize {
    private $common;
    private $commonService;
    private $jxzpService;
    private $matchService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->jxzpService = requireService("Jxzp");
        $this->matchService = requireService("Match");
    }

    public function setPrizeStatus() {
        $param = array();
        $param['prizeStatus'] = 0;
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectJxzpResp = $this->jxzpService->selectJxzp($param);
        if ($selectJxzpResp->errCode != 0) {
            $this->common->logger->info('极限追盘查询异常');
            return;
        }
        $jxzpList = $selectJxzpResp->data['list'];
        $matchIdArr = array();
        $oddsIdArr = array();
        foreach ($jxzpList as $jxzp) {
            $matchId = (int)$jxzp['matchId'];
            $oddsId = (int)$jxzp['oddsId'];
            if ($matchId > 0) {
                $matchIdArr[] = $matchId;
            }
            if ($oddsId > 0) {
                $oddsIdArr[] = $oddsId;
            }
        }
        if (count($matchIdArr) <= 0 || count($oddsIdArr) <= 0) {
            $this->common->logger->info('比赛信息异常');
            return;
        }
        $param = array();
        $param['matchId'] = $matchIdArr;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('比赛查询异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        $matchMap = array();
        foreach ($matchList as $match) {
            $matchId = (int)$match['matchId'];
            if ($matchId <= 0) {
                continue;
            }
            $matchMap[$matchId] = $match;
        }
        $param = array();
        $param['oddsId'] = $oddsIdArr;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
        if ($selectMatchOddsResp->errCode != 0) {
            $this->common->logger->info('比赛赔率查询异常');
            return;
        }
        $matchOddsList = $selectMatchOddsResp->data['list'];
        $matchOddsMap = array();
        foreach ($matchOddsList as $odds) {
            $oddsId = (int)$odds['oddsId'];
            if ($oddsId <= 0) {
                continue;
            }
            $matchOddsMap[$oddsId] = $odds;
        }
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($jxzpList); $i < $length; $i++) {
            $jxzp = $jxzpList[$i];
            $jxzpId = (int)$jxzp['jxzpId'];
            $matchId = (int)$jxzp['matchId'];
            $oddsId = (int)$jxzp['oddsId'];
            $recommend = explode(',', trim($jxzp['recommend']));
            if (empty($jxzp) || $jxzpId <= 0 || $matchId <= 0 || $oddsId <= 0 || !is_array($recommend) || count($recommend) <= 0 || empty($matchMap[$matchId]) || empty($matchOddsMap[$oddsId])) {
                continue;
            }
            //拼凑算奖对象
            $matchRecommend = json_encode(array(array("matchId" => $matchId, "oddsId" => $oddsId, "recommend" => $recommend)));
            $match = $matchMap[$matchId];
            $odds = $matchOddsMap[$oddsId];
            $match['oddsId'] = (int)$oddsId;
            $match['recommend'] = $recommend;
            $match['bettypeContent'] = trim($odds['bettypeContent']);
            $match['bettypeOdds'] = json_decode(trim($odds['bettypeOdds']));
            $match['concede'] = (float)$odds['concede'];
            $matchList = array($match);
            $calculatePrizeResp = $this->commonService->calculatePrize($matchRecommend, $matchList);
            if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                continue;
            }
            $prizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];
            $matchRecommend = json_decode($calculatePrizeResp->data['matchRecommend']);
            $prize = $matchRecommend[0]->prize;
            $bettypeResult = json_encode($matchRecommend[0]->bettypeResult);
            $bettypePrize = $matchRecommend[0]->bettypePrize;
            $field = array();
            $field[] = 'prizeStatus="' . $database->escape($prizeStatus) . '"';
            $field[] = 'prize="' . $database->escape(implode(',', $prize)) . '"';
            $field[] = 'bettypeResult="' . $database->escape($bettypeResult) . '"';
            $field[] = 'bettypePrize="' . $database->escape(implode(',', $bettypePrize)) . '"';
            $sqlArr[] = 'update t_jxzp set ' . implode(',', $field) . ' where jxzpId="' . $jxzpId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('极限追盘算奖成功');
            } else {
                $this->common->logger->info('极限追盘算奖失败');
            }
        }
        $database->close();
    }
}
//开始运行
$jxzpPrize = new JxzpPrize();
$jxzpPrize->setPrizeStatus();