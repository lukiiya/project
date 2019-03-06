<?php
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once("./include/core.php");
$common = requireModule('Common');
$ip = $common->getIP();
$headers = $common->getHttpHeaders();
runStart();
runLog("IP地址：".$ip.", 请求url：".$_SERVER['REQUEST_URI'].", 请求方式：".$_SERVER['REQUEST_METHOD']."\r\n客户端：".$_SERVER["HTTP_USER_AGENT"]."\n请求头：".print_r($headers, true));
requireFilter('Access')->execute();
try {
    requireInterceptor('RefuseIp')->execute();
    requireInterceptor('Access')->execute();
} catch (Exception $e) {
	echo $e->getMessage();
}