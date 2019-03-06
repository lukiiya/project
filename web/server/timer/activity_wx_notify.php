#!/usr/local/php-7.0.7/bin/php -q
<?php
//推送消息
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class ActivitySms {
    private $common;
    private $commonService;
    private $statisticsService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->statisticsService = requireService("Statistics");
        $this->userService = requireService("User");
    }

    public function execute() {
        if ('cli' != php_sapi_name()) {
            echo '该文件只能命令行运行';
            return;
        }
        /*$param = array();
        $selectStatisticsConsumeUserResp = $this->statisticsService->selectStatisticsConsumeUser($param);
        if ($selectStatisticsConsumeUserResp->errCode != 0) {
            $this->common->logger->info('查询统计异常');
            return;
        }
        $list = (array)$selectStatisticsConsumeUserResp->data['list'];
        if (!is_array($list) || count($list) <= 0) {
            $this->common->logger->info('统计列表异常');
            return;
        }
        $userIdArr = array();
        foreach ($list as $info) {
            $userId = (int)$info['userId'];
            if ($userId > 0) {
                $userIdArr[] = $userId;
            }
        }
        if (count($userIdArr) <= 0) {
            $this->common->logger->info('用户列表为空');
            return;
        }*/
        //“痞子逛大街“ ->  userId = 1410(测试环境), 2(正式环境)
        $param = array();
        //$param['userId'] = $userIdArr;
        $param['subscribe'] = 1;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $this->common->logger->info('查询统计异常');
            return;
        }
        $userList = $selectUserResp->data['list'];
        $userLength = count($userList);
        $userCount = 0;
        $this->common->logger->info('推送总用户数：'.$userLength);
        foreach ($userList as $user) {
            $this->sendMessage($user);
            $userCount++;
            $this->common->logger->info('已推送第 '.$userCount.' 个用户');
            //sleep(1);
        }
        $this->common->logger->info('微信推送完成');
    }

    public function sendMessage($user) {
        $resp = requireModule('Resp');
        if (empty($user)) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            //$url = 'http://www.shaimii.com/#home';
            $url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shaimichang.myapplication';
            $templateId = 'DNXBibKYYfeiwAXDYynqPsspQZGXO0djHXu10h14P7Q';
        } else {
            //$url = 'http://beta.shaimii.com/#home';
            $url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shaimichang.myapplication';
            $templateId = 'OG46T_KSArlhN6lNQhilJ-ZsSzPiLHLPlJC4Ia-Kuf4';
        }
        $data = array();
        $data['first'] = array('value' => '会不会突然的出线？', 'color' => '#000000');
        $data['keyword1'] = array('value' => '卡塔尔 vs 中国', 'color' => '#000000');
        $data['keyword2'] = array('value' => '哈里发体育场', 'color' => '#000000');
        $data['keyword3'] = array('value' => '09月05日 23:00', 'color' => '#000000');
        $data['remark'] = array('value' => '竞彩足球胜平负单关、2串1加奖10.2%，立即投注>>', 'color' => '#000000');
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}
//开始运行
$activitySms = new ActivitySms();
$activitySms->execute();