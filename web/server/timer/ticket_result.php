#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class TicketResult {
    private $common;
    private $commonService;
    private $ticketService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->ticketService = requireService("Ticket");
    }

    public function execute() {
        $zongGuan = requireModule('ZongGuan');
        //数字彩
        $resp = $zongGuan->digitalTicketResult('SSQ');
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        $resp = $zongGuan->digitalTicketResult('JSK3');
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        $resp = $zongGuan->digitalTicketResult('DLT');
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        $resp = $zongGuan->digitalTicketResult('GX11X5');
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        $this->common->logger->info('出票商开奖号码设置完成');
    }
}
//开始运行
$ticketResult = new TicketResult();
$ticketResult->execute();