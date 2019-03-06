#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class BatchPayNotify {
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
        $param['status'] = 1;//批量状态, 1=未付款, 2=已付款, 3=已处理
        $param['pageNum'] = 1;
        $param['pageSize'] = 40;
        $selectOrderBatchResp = $this->orderService->selectOrderBatch($param);
        if ($selectOrderBatchResp->errCode != 0) {
            $this->common->logger->info('批量订单查询异常');
            return;
        }
        $batchList = $selectOrderBatchResp->data['list'];
        for ($i = 0, $length = count($batchList); $i < $length; $i++) {
            $batch = $batchList[$i];
            $batchId = (int)$batch['batchId'];
            $status = (int)$batch['status'];
            if ($batchId <= 0 || $status != 1) {
                continue;
            }
            $result = file_get_contents('http://op.shaimii.com/cgi/index.php?c=alipay&m=batchPayNotify&batchId='.$batchId);
            echo ' '.($i+1).'('.$batchId.')：'.$result."\n";
            sleep(1);
        }
    }
}
//开始运行
$batchPayNotify = new BatchPayNotify();
$batchPayNotify->execute();