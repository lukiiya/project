#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class WithdrawDelay {
    private $common;
    private $financeService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->financeService = requireService("Finance");
    }

    public function execute() {
        global $curEnv;
        if ($curEnv != 'dist') {
            $this->common->logger->info('运行环境异常');
            return;
        }
        $time = time();
        $curTime = date('H:i:s', $time);
        if ($curTime > '01:00:00' && $curTime < '08:00:00') {
            $this->common->logger->info('不在推送时间内');
            return;
        }
        $minute = 20;
        $endTime = date('Y-m-d H:i:s', $time-$minute*60);
        $database = requireModule('Database');
        $sql = 'select sum(amount) as amount from t_finance_withdraw where discard=0 and financeType="1" and status in(1,2,5) and createTime<"'.$endTime.'"';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $this->common->logger->info('查询提款失败');
            return;
        }
        $info = $database->get($result);
        $database->free($result);
        $amount = (int)$info["amount"];
        $database->close();
        if ($amount <= 0) {
            $this->common->logger->info('不存在需要告警的提款');
            return;
        }
        $jssdk = requireModule('Jssdk');
        $msgParam = array(
            'title' => '提款超过'.$minute.'分钟未完成'
        );
        $msgParam['userId'] = array(2,853);//2=痞子逛大街, 853=Andy
        $msgParam['content'] = '提款总额：'.sprintf('%.2f', $amount/100).'元';
        $resp = $jssdk->pushMessage($msgParam);
        if ($resp->errCode != 0) {
            $this->common->logger->info('提款告警推送异常：'.$resp->msg);
            return;
        }
        $this->common->logger->info('提款告警推送成功');
    }
}
//开始运行
$withdrawDelay = new WithdrawDelay();
$withdrawDelay->execute();