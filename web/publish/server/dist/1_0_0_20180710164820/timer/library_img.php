#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class LibraryImg {
    private $common;
    private $libraryService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->libraryService = requireService("Library");
    }

    public function execute() {
        //查询协会
        /*$param = array();
        $param['type'] = 2;
        $param['pageNum'] = 1;
        $param['pageSize'] = 10000;
        $param['needCount'] = false;
        $selectUnionResp = $this->libraryService->selectUnion($param);
        if ($selectUnionResp->errCode != 0) {
            $this->common->logger->info('协会查询异常');
            return;
        }
        $unionList = $selectUnionResp->data['list'];
        if (!is_array($unionList) || count($unionList) <= 0) {
            $this->common->logger->info('协会查询异常');
            return;
        }
        $unionDir = __DIR__.'/../static/image/library/union/';
        foreach ($unionList as $union) {
            $logoImg = trim($union['logoImg']);
            if (!empty($logoImg)) {
                $path = $unionDir.md5($logoImg).'.jpg';
                $content = file_get_contents($logoImg);
                file_put_contents($path, $content);
            }
            sleep(1);
        }*/

        //查询联赛
        /*$param = array();
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
        $leagueDir = __DIR__.'/../static/image/library/league/';
        foreach ($leagueList as $league) {
            $logoImg = trim($league['logoImg']);
            if (!empty($logoImg) && $logoImg != 'http://info.310win.com/Image/league_match/images/') {
                $path = $leagueDir.md5($logoImg).'.jpg';
                $content = file_get_contents($logoImg);
                file_put_contents($path, $content);
            }
            sleep(1);
        }*/

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
        $teamDir = __DIR__.'/../static/image/library/team/';
        foreach ($teamList as $team) {
            $logoImg = trim($team['logoImg']);
            if (!empty($logoImg)) {
                $path = $teamDir.md5($logoImg).'.jpg';
                $content = file_get_contents($logoImg);
                file_put_contents($path, $content);
            }
            sleep(1);
        }
    }
}
//开始运行
$libraryImg = new LibraryImg();
$libraryImg->execute();