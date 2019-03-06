#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../../../include/core.php");

class Spider {
	private $common;
	private $matchService;
	private $cookie;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->matchService = requireService("Match");
		$this->cookie = $this->getCookie();
	}

	//获取冠军竞猜赔率
	public function executeSJBGJ() {
		$oddsJson = $this->httpGet('http://i.sporttery.cn/rank_calculator/get_list?tid[]=104895&pcode[]=chp', $this->cookie);
		//$oddsJson = $this->httpGet('http://i.sporttery.cn/rank_calculator/get_list?tid[]=104895&&pcode[]=fnl', $this->cookie);
        $oddsJson = json_decode($oddsJson);
		$rpcData = trim($oddsJson->data[0]->data);
		if (empty($oddsJson) || empty($rpcData)) {
			$this->common->logger->info('获取赔率json有误');
			return;
		}
        $dataArr = explode('|', $rpcData);
		if (count($dataArr) <= 0) {
            $this->common->logger->info('获取赔率数据有误');
            return;
        }
        $lotteryId = 'SJBGJ';//冠军竞猜
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $selectGuessOddsResp = $this->matchService->selectGuessOdds($param);
        if ($selectGuessOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $oddsList = $selectGuessOddsResp->data['list'];
        $oddsMap = array();
        if (count($oddsList) > 0) {
            foreach ($oddsList as $odds) {
                $lotteryId = trim($odds['lotteryId']);
                $number = (int)$odds['number'];
                $key = $lotteryId.'-'.$number;
                if (!key_exists($key, $oddsMap)) {
                    $oddsMap[$key] = $odds;
                }
            }
        }
        //print_r($oddsMap);exit;
        //插入或更新操作
        $database = requireModule("Database");
		$sqlArr = array();
		foreach($dataArr as $item) {
            $item = explode('-', $item);
            $number = (int)$item[0];
            $team = trim($item[1]);
            $status = trim($item[2]);//开售, 出局, 退款, 停售(凌晨到9点前)
            $sale = 0; //是否开售, 0=未开售, 1=已开售
            if ($status == '开售') {
                $sale = 1;
            }
            $odds = trim($item[3]); //赔率
            $chance = trim($item[5]);   //概率
            $key = $lotteryId.'-'.$number;
            if ($number < 0 || empty($odds) || empty($chance)) {
                continue;
            }
            $field = array();
            $field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
            $field[] = 'number="' . $database->escape($number) . '"';
            $field[] = 'team="' . $database->escape($team) . '"';
            $field[] = 'odds="' . $database->escape($odds) . '"';
            $field[] = 'chance="' . $database->escape($chance) . '"';
            //$field[] = 'sale="' . $database->escape($sale) . '"';
            if (empty($oddsMap[$key])) {
                $field[] = 'createTime=now()';
                $sqlArr[] = 'insert into t_guess_odds set ' . implode(',', $field);
            } else {
                $oddsId = (int)$oddsMap[$key]['oddsId'];
                if ($oddsId > 0) {
                    $sqlArr[] = 'update t_guess_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                }
            }
        }
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info('竞彩网冠军竞猜赔率更新成功');
			} else {
				$this->common->logger->info('竞彩网冠军竞猜更新失败');
			}
		}
		$database->close();
	}

    //获取冠亚军竞猜赔率
    public function executeSJBGYJ() {
        //$oddsJson = $this->httpGet('http://i.sporttery.cn/rank_calculator/get_list?tid[]=104895&pcode[]=chp', $this->cookie);
        $oddsJson = $this->httpGet('http://i.sporttery.cn/rank_calculator/get_list?tid[]=104895&&pcode[]=fnl', $this->cookie);
        $oddsJson = json_decode($oddsJson);
        $rpcData = trim($oddsJson->data[0]->data);
        if (empty($oddsJson) || empty($rpcData)) {
            $this->common->logger->info('获取赔率json有误');
            return;
        }
        $dataArr = explode('|', $rpcData);
        if (count($dataArr) <= 0) {
            $this->common->logger->info('获取赔率数据有误');
            return;
        }
        $lotteryId = 'SJBGYJ';//冠军竞猜
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $selectGuessOddsResp = $this->matchService->selectGuessOdds($param);
        if ($selectGuessOddsResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $oddsList = $selectGuessOddsResp->data['list'];
        $oddsMap = array();
        if (count($oddsList) > 0) {
            foreach ($oddsList as $odds) {
                $lotteryId = trim($odds['lotteryId']);
                $number = (int)$odds['number'];
                $key = $lotteryId.'-'.$number;
                if (!key_exists($key, $oddsMap)) {
                    $oddsMap[$key] = $odds;
                }
            }
        }
        //插入或更新操作
        $database = requireModule("Database");
        $sqlArr = array();
        foreach($dataArr as $item) {
            $item = explode('-', $item);
            $number = (int)$item[0];
            $team = trim($item[1]);
            $status = trim($item[2]);//开售, 出局, 退款, 停售(凌晨到9点前)
            $sale = 0; //是否开售, 0=未开售, 1=已开售
            if ($status == '开售') {
                $sale = 1;
            }
            $odds = trim($item[3]); //赔率
            $chance = trim($item[5]);   //概率
            $key = $lotteryId . '-' . $number;
            if ($number < 0 || empty($odds) || empty($chance)) {
                continue;
            }
            $field = array();
            $field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
            $field[] = 'number="' . $database->escape($number) . '"';
            $field[] = 'team="' . $database->escape($team) . '"';
            $field[] = 'odds="' . $database->escape($odds) . '"';
            $field[] = 'chance="' . $database->escape($chance) . '"';
            //$field[] = 'sale="' . $database->escape($sale) . '"';
            if (empty($oddsMap[$key])) {
                $field[] = 'createTime=now()';
                $sqlArr[] = 'insert into t_guess_odds set ' . implode(',', $field);
            } else {
                $oddsId = (int)$oddsMap[$key]['oddsId'];
                if ($oddsId > 0) {
                    $sqlArr[] = 'update t_guess_odds set ' . implode(',', $field) . ' where oddsId="' . $oddsId . '" limit 1';
                }
            }
        }
        $sqlArr = array_unique($sqlArr);
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $this->common->logger->info('竞彩网冠亚军竞猜赔率更新成功');
            } else {
                $this->common->logger->info('竞彩网冠亚军竞猜更新失败');
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
$spider->executeSJBGJ();
$spider->executeSJBGYJ();
