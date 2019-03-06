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
		$this->matchService = requireService("Match");
	}
	//获取比赛赛果
	public function execute() {
		//获取赛果
		$result = file_get_contents('http://api.letoula.com/info/award/2?identity=com.tyf.letoula&platform=3');
        $result = json_decode($result, true);
        $code = $result['code'];
        $resultArr = $result['data'];
        if ($code != 200 || empty($resultArr)) {
            return;
        }
        $resultMap = array();
        foreach($resultArr as $info) {
            $commonMatchId = trim($info['gameId']);
            $commonMatchId = substr($commonMatchId,0,8).date('N', strtotime(substr($commonMatchId,0,8))).substr($commonMatchId,8);
            $home = trim($info['host']);
            $away = trim($info['guest']);
            $homeGoals = (int)$info['hostScore'];
            $awayGoals = (int)$info['guestScore'];
            if (empty($commonMatchId) || empty($home) || empty($away) || $homeGoals < 0 || $awayGoals < 0) {
                continue;
            }
            $result = $awayGoals .':'. $homeGoals;
            $resultInfo = array();
            $resultInfo['result'] = $result;
            $resultMap[$commonMatchId] = $resultInfo;
        }
        if (count($resultMap) <= 0) {
            $this->common->logger->info('获取赛果有误');
            return;
        }

        //查询比赛
        $param = array();
        $param['type'] = 2;
        $param['nullResult'] = true;
        $param['pageNum'] = 1;
        $param['pageSize'] = 2000;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('查询比赛异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        //更新赛果
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($matchList as $info) {
            $commonMatchId = trim($info['commonMatchId']);
            $matchId = (int)$info['matchId'];
            $number = trim($info['number']);
            $beginTime = trim($info['beginTime']);
            if (empty($commonMatchId) || $matchId <= 0 || empty($number) || empty($beginTime)) {
                continue;
            }
            $result = trim($resultMap[$commonMatchId]['result']);
            $field = array();
            $field[] = 'tiyufResult="' . $database->escape($result) . '"';
            $sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where commonMatchId != "" and matchId="' . $matchId . '" limit 1';
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('赛果更新成功');
            } else {
                $this->common->logger->info('赛果更新失败');
            }
        }
        $database->close();
    }
}
$spider = new Spider();
$spider->execute();