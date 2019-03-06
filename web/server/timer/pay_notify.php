#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class PayNotify {
    private $common;
    private $commonService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
    }

    public function execute() {
        $param = array();
        $param['status'] = 1;//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['pageNum'] = 1;
        $param['pageSize'] = 40;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $status = (int)$order['status'];
            if ($orderId <= 0 || $status != 1) {
                continue;
            }
            $result = file_get_contents('http://op.shaimii.com/cgi/index.php?c=alipay&m=payNotify&orderId='.$orderId);
            echo ' '.($i+1).'('.$orderId.')：'.$result."\n";
            sleep(1);
        }
    }
}
//开始运行
$payNotify = new PayNotify();
$payNotify->execute();