<?php
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once("./include/core.php");
$alipay = requireController("Alipay", 'controller\portal');
$common = requireModule("Common");
$common->logger->info('支付宝异步通知：payNotify.php');
$alipay->payNotify();
