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
        $this->getMatchLive();
    }

    public function getMatchLive() {
        //https://live.leisu.com/
        $result = $this->httpGet('https://live.leisu.com/');
        preg_match('/try\s*{\s*THATDATA\s*=\s*(\{[\s\S]*\})\s*;?\s*\}\s*catch\s*\(/', $result, $matches);
        if (!is_array($matches) || count($matches) != 2 || empty(trim($matches[1]))) {
            $this->common->logger->info('比赛直播获取异常');
            return;
        }
        $data = trim($matches[1]);
        $data = json_decode($data, true);
        if (empty($data)) {
            $this->common->logger->info('比赛直播格式异常');
            return;
        }
        $lottery = $data['lottery'];
        if (empty($lottery)) {
            $this->common->logger->info('数据lottery异常');
            return;
        }
        $jc = $lottery['jc'];
        if (empty($jc)) {
            $this->common->logger->info('数据lottery->jc异常');
            return;
        }
        $matchesTrans = $data['matchesTrans'];
        if (empty($matchesTrans)) {
            $this->common->logger->info('数据matchesTrans异常');
            return;
        }
        $arr = [];
        $live = $matchesTrans['live'];
        if (is_array($live)) {
            $arr = array_merge($arr, $live);
        }
        $notStart = $matchesTrans['notStart'];
        if (is_array($notStart)) {
            $arr = array_merge($arr, $notStart);
        }
        $resultMap = array();
        foreach ($notStart as $item) {
            if (!is_array($item) || count($item) >= 8) {
                $liveId = trim($item[0]);
                $matchId = trim($item[1]);
                if (!empty($liveId) && !empty($matchId) && in_array($matchId, $jc)) {
                    $info = json_decode(trim($item[8]), true);
                    if (is_array($info) && count($info) >= 4) {
                        $numberInfo = $info[3];
                        if (is_array($numberInfo) && count($numberInfo) >= 1 && !empty(trim($numberInfo[0]))) {
                            $number = trim($numberInfo[0]);
                            $resultMap[$number] = 'https://static.leisu.com/mlive/m/detail.php?id='.$liveId.'&ver=20180403';
                        }

                    }
                }
            }
        }
        if (count($resultMap) <= 0) {
            $this->common->logger->info('获取直播有误');
            return;
        }
        $this->updateMatchLive($resultMap);
    }

    public function updateMatchLive($resultMap) {
        if (!is_array($resultMap) || count($resultMap) <= 0) {
            $this->common->logger->info('更新直播参数异常');
            return;
        }
        //类型, 1=足球, 2=篮球
        $type = 1;
        //查询比赛
        $param = array();
        $param['type'] = $type;
        $param['status'] = 4;
        $selectMatchResp = $this->matchService->selectMatch($param);
        if ($selectMatchResp->errCode != 0) {
            $this->common->logger->info('查询比赛异常');
            return;
        }
        $matchList = $selectMatchResp->data['list'];
        if (count($matchList) <= 0) {
            $this->common->logger->info('不存在需要设置直播的比赛');
            return;
        }
        //更新赛果
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($matchList as &$info) {
            $matchId = (int)$info['matchId'];
            $number = trim($info['number']);
            $live = trim($info['live']);
            $liveJson = json_decode($live, true);
            if (empty($live) || empty($liveJson)) {
                $liveJson = array(
                    'animation' => array()
                );
            }
            $animation = $liveJson['animation'];
            foreach ($animation as &$item) {
                $source = trim($item['source']);
                $url = trim($item['url']);
                if (!empty($source) && !empty($url)) {
                    if ($source == '雷速体育') {
                        continue 2;
                    }
                }
            }
            $animationUrl = trim($resultMap[$number]);
            if ($matchId <= 0 || $type != (int)$info['type'] || empty($number) || empty($animationUrl)) {
                continue;
            }
            $liveJson['animation'][] = array(
                'source' => '雷速体育',
                'url' => $animationUrl
            );
            $live = json_encode($liveJson);
            if (empty($live)) {
                continue;
            }
            $field = array();
            $field[] = 'live="' . $database->escape($live) . '"';
            $sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where matchId="'.$matchId.'" limit 1';
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('雷速体育直播更新成功');
            } else {
                $this->common->logger->info('雷速体育直播更新失败');
            }
        }
        $database->close();
        $this->common->logger->info('雷速体育直播更新完成');
    }

    public function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 10);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);//这个是重点。
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }
}

$spider = new Spider();
$spider->execute();
