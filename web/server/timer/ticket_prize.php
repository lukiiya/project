#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class TicketPrize {
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
        //竞彩
        $resp = $zongGuan->ticketPrize();
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        //数字彩
        $resp = $zongGuan->digitalTicketPrize();
        if ($resp->errCode != 0) {
            $this->common->logger->info($resp->msg);
        }
        $this->common->logger->info('出票算奖完成');
    }
}
//开始运行
$ticketPrize = new TicketPrize();
$ticketPrize->execute();