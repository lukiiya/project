#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class Spider {
    private $common;
    private $commonService;
    private $cookie;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->cookie = $this->getCookie();
    }

    public function execute(){
        $rateJson = $this->httpGet('http://i.sporttery.cn/odds_calculator/get_proportion?pool[]=had', $this->cookie);
        $rateJson = json_decode($rateJson);
        if (empty($rateJson) || empty($rateJson->data)) {
            $this->common->logger->info('获取比率json有误');
            return;
        }
        $rateList = $rateJson->data;
        $database = requireModule("Database");
        $sqlArr = array();
        foreach ($rateList as $rate) {
            $value = $rate->had;
            $sportteryMatchId = (int)$value->mid;
            $winBetRate = trim($value->pre_win);
            $drawBetRate = trim($value->pre_draw);
            $loseBetRate = trim($value->pre_lose);
            if (empty($value) || $sportteryMatchId <= 0) {
                continue;
            }
            $field = array();
            $field[] = 'winBetRate="' . $database->escape($winBetRate) . '"';
            $field[] = 'drawBetRate="' . $database->escape($drawBetRate) . '"';
            $field[] = 'loseBetRate="' . $database->escape($loseBetRate) . '"';
            $sqlArr[] = 'update t_match set ' . implode(',', $field) . ' where type=1 and sportteryMatchId="' . $sportteryMatchId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('投注比例插入成功');
            } else {
                $this->common->logger->info('投注比例插入失败');
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
//开始运行
$spider = new Spider();
$spider->execute();