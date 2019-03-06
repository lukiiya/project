#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class GetUserPhone {
    private $common;
    private $commonService;
    private $userService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->userService = requireService("User");
    }

    public function execute() {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userIdSql = 'select userId from t_finance_trade group by userId';
        $userIdResult = $database->execute($userIdSql);
        if (!$userIdResult) {
            $database->close();
            $resp->msg = '访问异常';
            return $resp;
        }
        $userIdArr = array();
        while ($info = $database->get($userIdResult)) {
            $userId = (int)$info['userId'];
            $userIdArr[] = $userId;
        }
        $userIdArr = array_unique($userIdArr);
        $userIdStr = implode(',', $userIdArr);
        $phoneSql = 'select phone from t_user where phone != "" and userId in('.$database->escape($userIdStr).')';
        $phoneResult = $database->execute($phoneSql);
        if (!$phoneResult) {
            $database->close();
            $resp->msg = '访问异常';
            return $resp;
        }
        $phoneArr = array();
        while ($info = $database->get($phoneResult)) {
            $phone = trim($info['phone']);
            if ($this->common->verifyMobile($phone)) {
                $phoneArr[] = $phone;
            }
        }
        $phoneArr = array_unique($phoneArr);
        $phoneStr = implode("\n", $phoneArr);
        file_put_contents('./phone.csv', $phoneStr);
    }
}

//开始运行
$getUserPhone = new GetUserPhone();
$getUserPhone->execute();
