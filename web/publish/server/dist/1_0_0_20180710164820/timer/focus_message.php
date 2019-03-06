#!/usr/local/php-7.0.7/bin/php -q
<?php
//推送消息
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class FocusMessage {
    private $common;
    private $commonService;
    private $planService;
    private $focusService;
    private $userService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->planService = requireService("Plan");
        $this->focusService = requireService("Focus");
        $this->userService = requireService("User");
    }

    public function execute() {
        if ('cli' != php_sapi_name()) {
            echo '该文件只能命令行运行';
            return;
        }
        $this->resetSend();
        while (true) {
            $resp  = $this->getSendData();
            if ($resp->errCode == 0 && is_array($resp->data) && count($resp->data) > 0) {
                $data = $resp->data[0];
                $focusId = (int)$data['focusId'];
                $userId = (int)$data['userId'];
                $planId = (int)$data['planId'];
                $focusUserPlanId = (array)$data['focusUserPlanId'];
                if ($focusId > 0 && $userId > 0 && $planId > 0 && is_array($focusUserPlanId) && count($focusUserPlanId) > 0) {
                    $sendMessageResp = $this->sendMessage($userId, $planId);
                    if ($sendMessageResp->errCode == 0) {
                        $param = array();
                        $param['focusId'] = $focusId;
                        $param['focusUserRecentPlanId'] = $focusUserPlanId;
                        $updateFocusResp = $this->focusService->updateFocus($param);
                        if ($updateFocusResp->errCode != 0) {
                            $this->common->logger->info('更新关注异常：'.$updateFocusResp->msg);
                        } else {
                            echo "专家推送更新成功\n";
                        }
                    } else {
                        $this->common->logger->info($sendMessageResp->msg);
                    }
                }
            }
            sleep(1);
        }
    }

    //重置关注，目的是第一次运行时候，不会大量发送推送
    private function resetSend() {
        $resp = $this->getSendData();
        if ($resp->errCode == 0 && is_array($resp->data) && count($resp->data) > 0) {
            $database = requireModule("Database");
            $sqlArr = array();
            foreach ($resp->data as $info) {
                $focusId = (int)$info['focusId'];
                $userId = (int)$info['userId'];
                $planId = (int)$info['planId'];
                $focusUserPlanId = (array)$info['focusUserPlanId'];
                if ($focusId > 0 && $userId > 0 && $planId > 0 && is_array($focusUserPlanId) && count($focusUserPlanId) > 0) {
                    $field = array();
                    $field[] = 'focusUserRecentPlanId="' . $database->escape(implode(',', $this->common->filterIdArray($focusUserPlanId))) . '"';
                    $sqlArr[] = 'update t_user_focus set ' . implode(',', $field) . ' where focusId="' . $focusId . '" limit 1';
                }
            }
            if (count($sqlArr) > 0) {
                $sql = implode(';', $sqlArr);
                $result = $database->multiExecute($sql);
                $database->multiFree();
                if ($result) {
                    $this->common->logger->info('关注消息重置成功');
                } else {
                    $this->common->logger->info('关注消息重置失败');
                }
            }
            $database->close();
        }
    }

    private function getSendData() {
        $resp = requireModule('Resp');
        $param = array();
        $param['status'] = 2;
        $selectFocusResp = $this->focusService->selectFocus($param);
        if ($selectFocusResp->errCode != 0) {
            $resp->msg = '查询关注异常';
            return $resp;
        }
        $focusList = $selectFocusResp->data['list'];
        $userIdArr = array();
        $focusUserIdArr = array();
        foreach ($focusList as $focus) {
            $userId = (int)$focus['userId'];
            $focusUserId = (int)$focus['focusUserId'];
            if ($userId <= 0 || $focusUserId <= 0) {
                continue;
            }
            $userIdArr[] = $userId;
            $focusUserIdArr[] = $focusUserId;
        }
        if (count($focusUserIdArr) <= 0) {
            $resp->msg = '不存在关注用户';
            return $resp;
        }
        //查询方案
        $param = array();
        $param['userId'] = $focusUserIdArr;
        $param['publish'] = 1;
        $param['matchStatus'] = 1;
        $param['orderBy'] = 1;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $resp->msg = '查询方案异常';
            return $resp;
        }
        $planList = $selectPlanResp->data['list'];
        if (count($planList) <= 0) {
            $resp->msg = '不存在方案';
            return $resp;
        }
        $planMap = array();
        foreach ($planList as $plan) {
            $planId = (int)$plan['planId'];
            $userId = (int)$plan['userId'];
            if(empty($planMap[$userId])){
                $planMap[$userId] = array();
            }
            $planMap[$userId][] = $planId;
        }
        //查询用户
        $param = array();
        $param['userId'] = $userIdArr;
        $param['subscribe'] = 1;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $userList = $selectUserResp->data['list'];
        if (count($userList) <= 0) {;
            $resp->msg = '不存在用户';
            return $resp;
        }
        $whiteArr = array(1,3,2151,853,177,1075,1401,1402,18,122,2,2142,460,2041,76,176,16);
        $userMap = array();
        foreach ($userList as $user) {
            $userId = (int)$user['userId'];
            //$userId <= 0 || !in_array($userId, $whiteArr)
            if ($userId <= 0) {
                continue;
            }
            $userMap[$userId] = $user;
        }
        $data = array();
        foreach ($focusList as $focus) {
            $focusId = (int)$focus['focusId'];
            $userId = (int)$focus['userId'];
            $focusUserId = (int)$focus['focusUserId'];
            $focusUserPlanId = (array)$planMap[$focusUserId];
            $focusUserRecentPlanId = (array)explode(',', trim($focus['focusUserRecentPlanId']));
            if ($focusId <= 0 || $userId <= 0 || !key_exists($userId, $userMap) || $focusUserId <= 0 || !is_array($focusUserPlanId) || count($focusUserPlanId) <= 0 || count(array_diff($focusUserPlanId, $focusUserRecentPlanId)) <= 0) {
                continue;
            }
            $planId = (int)$focusUserPlanId[0];
            $info = array();
            $info['focusId'] = $focusId;
            $info['userId'] = $userId;
            $info['planId'] = $planId;
            $info['focusUserPlanId'] = $focusUserPlanId;
            $data[] = $info;
        }
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
    
    public function sendMessage($userId, $planId) {
        $resp = requireModule('Resp');
        $userId = (int)$userId;
        $planId = (int)$planId;
        if ($userId <= 0 || $planId <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
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
        $selectPlanByIdResp = $this->planService->selectPlanById($planId);
        if ($selectPlanByIdResp->errCode != 0) {
            $resp->msg = '查询方案异常';
            return $resp;
        }
        $plan = $selectPlanByIdResp->data;
        if (empty($plan)) {
            $resp->msg = '查询方案不存在';
            return $resp;
        }
        $plan = $this->commonService->setMatchList(array($plan))[0];
        $matchList = $plan['matchList'];
        if (!is_array($matchList) || count($matchList) <= 0 || empty($matchList[0])) {
            $resp->msg = '方案比赛信息有误';
            return $resp;
        }
        $match = $matchList[0];
        $league = trim($match['league']);
        $home = trim($match['home']);
        $away = trim($match['away']);
        if (empty($home) || empty($away)) {
            $resp->msg = '无效的队名';
            return $resp;
        }
        $plan = $this->commonService->setUser(array($plan))[0];
        $planUser = $plan['user'];
        $pUserNo = trim($planUser['userNo']);
        if (empty($planUser) || empty($pUserNo)) {
            $resp->msg = '方案用户信息有误';
            return $resp;
        }
        $pNickName = trim($planUser['nickName']);
        $pRealName = trim($planUser['realName']);
        $pUserName = !empty($pRealName) ? $pRealName : $pNickName;
        if (empty($pUserName)) {
            $resp->msg = '无效的方案用户名';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#userDetail&userNo='.$pUserNo;
            $templateId = 'nrChO-STSALrhm8JZ06z78olH7GAb6jVJOeVrwj8ITI';
        } else {
            $url = 'http://beta.shaimii.com/#userDetail&userNo='.$pUserNo;
            $templateId = 'w2CDsz4dux_7BWmunyHP0vKw2oWduaCEtsTR-bYPUCw';
        }
        $data = array();
        $data['first'] = array('value' => '您关注的专家已经更新', 'color' => '#000000');
        $data['keyword1'] = array('value' => $home.' vs '.$away, 'color' => '#000000');
        $data['keyword2'] = array('value' => $league, 'color' => '#000000');
        $data['keyword3'] = array('value' => $pUserName, 'color' => '#000000');
        $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
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
$focusMessage = new FocusMessage();
$focusMessage->execute();