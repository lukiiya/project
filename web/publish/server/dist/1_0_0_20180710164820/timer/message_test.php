#!/usr/local/php-7.0.7/bin/php -q
<?php
//出票订单算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

global $curEnvConfig;
$redisConfig = $curEnvConfig->redis;
$redis = new \Redis();
$redis->pconnect($redisConfig->host, $redisConfig->port, 0);
$redis->auth($redisConfig->password);
$redis->publish('payOrderForTicketDeal', 1000000329);
$redis->publish('payOrderForStation', 1000000329);