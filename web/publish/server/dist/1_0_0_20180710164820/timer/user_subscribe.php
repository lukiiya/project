#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class UserSubscribe {
    private $common;
    private $userService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->userService = requireService("User");
    }

    public function execute() {
        $param = array();
        $param['hasOpenId'] = true;
        $param['justCount'] = true;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $this->common->logger->info('用户查询数量异常');
            return;
        }
        $totalCount = (int)$selectUserResp->data['totalCount'];
        if ($totalCount <= 0) {
            $this->common->logger->info('用户查询数量小于等于0');
            return;
        }
        $pageNum = 0;
        for ($j = 1; $j <= $totalCount; $j++) {
            if (($j % 100) == 0 || $j == $totalCount) {
                $pageNum++;
                $param = array();
                $param['hasOpenId'] = true;
                $param['pageNum'] = $pageNum;
                $param['pageSize'] = 100;
                $selectUserResp = $this->userService->selectUser($param);
                if ($selectUserResp->errCode != 0) {
                    $this->common->logger->info('用户查询异常');
                    continue;
                }
                $userList = $selectUserResp->data['list'];
                if (is_array($userList) && count($userList) <= 0) {
                    $this->common->logger->info('不存用户');
                    continue;
                }
                $newUserList = array();
                for ($i = 0, $length = count($userList); $i < $length; $i++) {
                    $user = $userList[$i];
                    $userId = (int)$user['userId'];
                    $openid = trim($user['openId']);
                    if ($userId > 0 && !empty($openid) && !preg_match("/^virtual_/", $openid)) {
                        $newUserList[] = array('userId' => $userId, 'openid' => $openid);
                    }
                }
                if (count($newUserList) <= 0) {
                    continue;
                }
                $this->setSubscribe($newUserList);
                sleep(1);
            }
        }
        $this->common->logger->info('用户subscribe更新完成');
    }

    function setSubscribe($userList) {
        $resp = requireModule('Resp');
        if (empty($userList) || count($userList) <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        global $index;
        $index++;
        echo "第 ".$index. " 次，长度 ".count($userList)."\n";
        $postJson = array('user_list' => $userList);
        $jssdk = requireModule('Jssdk');
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token='.$accessToken;
        $param = json_encode($postJson);
        //$this->common->logger->info('unionid-url：'.$url);
        //$this->common->logger->info('unionid-param：'.$param);
        $wxResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($wxResp);
        if (empty($param) || !is_array($respJson->user_info_list) || count($respJson->user_info_list) <= 0) {
            $this->common->logger->info('获取用户微信信息异常：'.$wxResp);
            $resp->msg = '获取用户微信信息异常';
            return $resp;
        }
        $subscribeMap = array();
        foreach ($respJson->user_info_list as $wxUser) {
            $openId = trim($wxUser->openid);
            $subscribe = (int)$wxUser->subscribe;
            if (!empty($openId)) {
                $subscribeMap[$openId] = $subscribe;
            }
        }
        $database = requireModule("Database");
        $sqlArr = array();
        for ($i = 0, $length = count($userList); $i < $length; $i++) {
            $user = $userList[$i];
            $userId = (int)$user['userId'];
            $openId = trim($user['openid']);//注意这里的openid是小写i
            $subscribe = (int)$subscribeMap[$openId];
            if (empty($user) || $userId <= 0 || empty($openId)) {
                continue;
            }
            $field = array();
            $field[] = 'subscribe="' . $database->escape($subscribe) . '"';
            $sqlArr[] = 'update t_user set ' . implode(',', $field) . ' where userId="' . $userId . '" limit 1';
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if ($result) {
                $resp->msg = '用户subscribe更新成功';
                return $resp;
            } else {
                $resp->msg = '用户subscribe更新成功';
                return $resp;
            }
        }
        $database->close();
    }
}
//开始运行
$userSubscribe = new UserSubscribe();
$userSubscribe->execute();