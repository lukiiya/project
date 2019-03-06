#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");
include_once(__DIR__."/OrderSendPrize.php");

//开始运行
$orderSendPrize = new OrderSendPrize();
//竞技彩
$orderSendPrize->sendPrize();
$orderSendPrize->attachPrize();
//数字彩
$orderSendPrize->digitalSendPrize();
$orderSendPrize->digitalAttachPrize();