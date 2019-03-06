#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class GuessSendPrize {
    private $common;
    private $commonService;
    private $activityService;
    private $userService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->activityService = requireService("Activity");
        $this->userService = requireService("User");
    }

    public function execute($prizeTeamId) {
        if (date('Y-m-d H:i:s') < '2017-07-03 04:00:00') {
            $this->common->logger->info('比赛未结束');
            return;
        }
        $param = array();
        $param['teamId'] = $prizeTeamId;
        $param['needCount'] = true;
        $selectActivityConfederationsCupResp = $this->activityService->selectActivityConfederationsCup($param);
        if ($selectActivityConfederationsCupResp->errCode != 0) {
            $this->common->logger->info('查询异常');
        }
        $guessList = $selectActivityConfederationsCupResp->data['list'];
        $totalGroupCount = (int)$selectActivityConfederationsCupResp->data['totalCount'];
        if ($totalGroupCount <= 0) {
            $this->common->logger->info('竞猜人数为空');
        }
        $financeType = 1;
        $remark = '联合会杯竞猜中奖';
        $amount = (int)(188800/$totalGroupCount);
        $this->common->logger->info('派奖数量：'.$totalGroupCount.' 个，单个奖金：'.round($amount/100, 2).' 元');
        $sendCount = 0;
        foreach ($guessList as $guessData) {
            $guessId = (int)$guessData['guessId'];
            $userId = (int)$guessData['userId'];
            $nickName = trim($guessData['nickName']);
            $realName = trim($guessData['realName']);
            $status = (int)$guessData['status'];//竞猜状态 0=已参与, 1=已猜中
            $teamId = (int)$guessData['teamId'];
            if ($userId <= 0 || $teamId <= 0 || $status != 0 || $teamId != $prizeTeamId) {
                continue;
            }
            //开启事物
            $database = requireModule('Database');
            if ($database->execute('start transaction')) {
                $updateConfederationsCupSql = 'update t_activity_confederations_cup set status=1 where guessId="' . $guessId .'" and userId="' . $userId .'" and teamId="' . $teamId . '" and status=0 limit 1 ';
                $updateConfederationsCupResult = $database->execute($updateConfederationsCupSql);
                $updateConfederationsCupRows = (int)$database->getAffectedRows();
                if (!$updateConfederationsCupResult || $updateConfederationsCupRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->common->logger->info('更新联合会杯竞猜失败');
                    return;
                }
                //充值流水插入
                $insertFinanceChargeRecordField = array();
                $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceChargeRecordField[] = 'createTime=now()';
                $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
                $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
                $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->common->logger->info('插入流水异常');
                    return;
                }
                //充值插入
                $insertFinanceChargeField = array();
                $insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
                $insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceChargeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceChargeField[] = 'createTime=now()';
                $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
                $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
                $insertFinanceChargeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->common->logger->info('插入充值异常');
                    return;
                }
                $database->execute('commit');
                $database->close();
                $sendCount++;
                $this->common->logger->info('成功派奖数量：'.$sendCount.' 个');
                //更新资金明细
                $this->commonService->setUserFinance($userId);
                $this->sendPrizeMessage($userId);
            } else {
                $this->common->logger->info('联合会杯竞猜派奖失败');
            }
        }
        if ($sendCount <= 0) {
            $this->common->logger->info('不存在需要派奖竞猜');
        } else if ($totalGroupCount == $sendCount) {
            $this->common->logger->info('联合会杯竞猜派奖完成');
        }
    }

    private function sendPrizeMessage($userId) {
        $resp = requireModule('Resp');
        $userId = (int)$userId;
        if ($userId <= 0) {
            $resp->msg = 'userId参数有误';
            return $resp;
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
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
        global $curEnv;
        $url = '';
        $templateId = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#myFinance';
            $templateId = 'g6IXKtxQ1QqUGp_xamS3gakAQlvGDKzhb1lhuxtgNLk';
        } else if ($curEnv == 'beta') {
            $url = 'http://beta.shaimii.com/#myFinance';
            $templateId = 'PLENR8uw1WraQHMSOg8BokvOmlqydSJ3ExoacUgL3EI';
        }
        if (empty($templateId)) {
            $resp->msg = 'templateId不能为空';
            return $resp;
        }
        $data = array();
        $data['first'] = array('value' => '恭喜您竞猜德国夺冠成功命中', 'color' => '#000000');
        $data['keyword1'] = array('value' => '2017联合会杯冠军', 'color' => '#000000');
        $data['keyword2'] = array('value' => '2017年7月3日 05:00', 'color' => '#000000');
        $data['remark'] = array('value' => '已派奖，请前往查看彩金明细', 'color' => '#000000');
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
$guessSendPrize= new GuessSendPrize();
//"teamId":"6","teamName":"智利"
//"teamId":"8","teamName":"德国"
$prizeTeamId = 8;   //获胜球队id
$guessSendPrize->execute($prizeTeamId);
