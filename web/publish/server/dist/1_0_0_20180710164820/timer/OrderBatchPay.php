<?php
class OrderBatchPay {
    private $common;
    private $commonService;
    private $orderService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
    }

    public function payOrderBatch() {
        $param = array();
        $param['status'] = 2; //批量状态, 1=未付款, 2=已付款, 3=已处理
        $param['pageNum'] = 1;
        $param['pageSize'] = 1 * 60;//1分钟的执行数量
        $selectOrderBatchResp = $this->orderService->selectOrderBatch($param);
        if ($selectOrderBatchResp->errCode != 0) {
            $this->common->logger->info('订单批量查询异常');
            return;
        }
        $orderBatchList = $selectOrderBatchResp->data['list'];
        if (!is_array($orderBatchList) || count($orderBatchList) <= 0) {
            $this->common->logger->info('不存在订单批量');
            return;
        }
        $pay = requireModule("Pay");
        for ($i = 0, $length = count($orderBatchList); $i < $length; $i++) {
            $orderBatch = $orderBatchList[$i];
            $batchId = (int)$orderBatch['batchId'];
            $userId = (int)$orderBatch['userId'];
            $orderId = explode(',', $orderBatch['orderId']);
            $orderId = $this->common->filterIdArray($orderId);
            $amount = (int)$orderBatch['amount'];
            $status = (int)$orderBatch['status'];//批量状态, 1=未付款, 2=已付款, 3=已处理
            if (empty($orderBatch) || $batchId <= 0 || $userId <= 0 || !is_array($orderId) || count($orderId) <= 0 || $amount <= 0 || $status != 2) {
                continue;
            }
            $doPayOrderBatchResp = $pay->doPayOrderBatch($batchId);
            if ($doPayOrderBatchResp->errCode != 0) {
                $this->common->logger->info('订单批量支付失败('.$batchId.')：'.$doPayOrderBatchResp->msg);
            } else {
                $this->common->logger->info('订单批量支付成功('.$batchId.')');
            }
        }
        $this->common->logger->info('订单批量支付完成('.count($orderBatchList).')');
    }
}