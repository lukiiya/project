<?php
namespace module;
class Apple {
	private $common;
	private $commonService;
	private $orderService;
	private $userService;
	private $financeService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->orderService = requireService("Order");
		$this->userService = requireService("User");
		$this->financeService  = requireService("Finance");
	}

	public function createPay($param) {
		$resp = requireModule('Resp');
		$source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
		$userId = (int)$param['userId'];
		$orderType = (int)$param['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$orderId = (int)$param['orderId'];
		$amount = (int)$param['amount'];
		if ($source != 0 && $source != 1 && $source != 2) {
			$resp->msg = 'source有误';
			return $resp;
		}
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
        if ($orderType < 0) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
		if ($orderId <= 0) {
			$resp->msg = 'orderId有误';
			return $resp;
		}
		if ($amount <= 0) {
			$resp->msg = 'amount有误';
			return $resp;
		}
        $payUrl = md5($source.'|'.$userId.'|'.$orderType.'|'.$orderId.'|'.$amount);
        if(empty($payUrl)) {
			$resp->msg = '生成支付单失败';
			return $resp;
		}
		$resp->data = $payUrl;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function createBatchPay($param) {
        $resp = requireModule('Resp');
        $source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
        $userId = (int)$param['userId'];
        $batchId = (int)$param['batchId'];
        $amount = (int)$param['amount'];
        if ($source != 0 && $source != 1 && $source != 2) {
            $resp->msg = 'source有误';
            return $resp;
        }
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        if ($batchId <= 0) {
            $resp->msg = 'orderId有误';
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = 'amount有误';
            return $resp;
        }
        $payUrl = md5($source.'|'.$userId.'|'.$batchId.'|'.$amount);
        if(empty($payUrl)) {
            $resp->msg = '生成支付单失败';
            return $resp;
        }
        $resp->data = $payUrl;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	//验签过程
	public function payNotify() {
		$resp = requireModule('Resp');
		$string = $_POST;
		if ($string == null) {
			$resp->msg = '请使用post方式提交数据';
			return $resp;
		}
		$orderNo = trim($string['orderNo']);
        $receiptData = trim($string['receiptData']);//凭证
        $transactionId = trim($string['transactionId']);//交易流水id
        $sign = trim($string['sign']); //签名
        if (empty($orderNo) || empty($receiptData) || empty($transactionId) || empty($sign)) {
            $resp->msg = 'post数据异常';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'https://buy.itunes.apple.com/verifyReceipt';
        } else {
            $url = 'https://sandbox.itunes.apple.com/verifyReceipt';
        }
        $httpPostResp = trim($this->httpPost($url, '{"receipt-data":"'.$receiptData.'"}'));
        $httpPostResp = json_decode($httpPostResp, true);
        $inApp = $httpPostResp['receipt']['in_app'];
        if (empty($httpPostResp) || !is_array($inApp) || count($inApp) <= 0) {
            $this->logger->info('苹果支付产品异常：'.print_r($httpPostResp, true));
            $resp->msg = '苹果验证异常';
            return $resp;
        }
        $status = $httpPostResp['status'];
        $productId = null;
        $tradeNo = null;
        $tradeTime = null;
        foreach ($inApp as $app) {
            $pId = trim($app['product_id']);
            $tNo = trim($app['transaction_id']);
            $tTime = trim($app['purchase_date_ms']);
            if (!empty($pId) && !empty($tNo) && !empty($tTime) && $tNo == $transactionId) {
                $productId = $pId;
                $tradeNo = $tNo;
                $tradeTime = $tTime;
                break;
            }
        }
        $tradeTime = date('Y-m-d H:i:s', $tradeTime/1000);
        $productMap = array(
            'com.abacusgo.shaimi.recharge12' => 1200,
            'com.abacusgo.shaimi.recharge50' => 5000,
            'com.abacusgo.shaimi.recharge108' => 10800,
            'com.abacusgo.shaimi.recharge518' => 51800,
            'com.abacusgo.shaimi.recharge1098' => 109800,
            'com.abacusgo.pshaimijingcai.recharge12' => 1200,
            'com.abacusgo.pshaimijingcai.recharge50' => 5000,
            'com.abacusgo.pshaimijingcai.recharge108' => 10800,
            'com.abacusgo.pshaimijingcai.recharge518' => 51800,
            'com.abacusgo.pshaimijingcai.recharge1098' => 109800,
            'com.abacusgo.midoutiyu.recharge12' => 1200,
            'com.abacusgo.midoutiyu.recharge50' => 5000,
            'com.abacusgo.midoutiyu.recharge108' => 10800,
            'com.abacusgo.midoutiyu.recharge518' => 51800,
            'com.abacusgo.midoutiyu.recharge1098' => 109800,
            'com.abacusgo.shaimitiyu.recharge12' => 1200,
            'com.abacusgo.shaimitiyu.recharge50' => 5000,
            'com.abacusgo.shaimitiyu.recharge108' => 10800,
            'com.abacusgo.shaimitiyu.recharge518' => 51800,
            'com.abacusgo.shaimitiyu.recharge1098' => 109800,
            'com.agp.shaimitiyu.recharge12' => 1200,
            'com.agp.shaimitiyu.recharge50' => 5000,
            'com.agp.shaimitiyu.recharge108' => 10800,
            'com.agp.shaimitiyu.recharge518' => 51800,
            'com.agp.shaimitiyu.recharge1098' => 109800
        );
        $tradeAmount = (int)$productMap[$productId];
        if (empty($httpPostResp) || $status != 0 || empty($productId) || empty($tradeNo) || empty($tradeTime) || $tradeAmount <= 0) {
            $this->logger->info('凭证错误：'.print_r($httpPostResp, true));
            $resp->msg = '凭证错误';
            return $resp;
        }
        //查询订单信息，验证签sign
        $orderNoArr = $this->common->decodeNo($orderNo);
        $orderNoUserId = (int)$orderNoArr['userId'];
        $orderNoOrderId = (int)$orderNoArr['id'];
        if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
            $resp->msg = 'orderNo参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderNoOrderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '访问异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单不存在';
            return $resp;
        }
        $source = (int)$orderData['source'];
        $userId = (int)$orderData['userId'];
        $orderType = (int)$orderData['orderType'];
        $orderId = (int)$orderData['orderId'];
        $amount = (int)$orderData['amount'];
        $payUrl = md5($source.'|'.$userId.'|'.$orderType.'|'.$orderId.'|'.$amount);
        $mySign = md5($orderNo.'|'.$receiptData.'|'.$transactionId.'|'.$payUrl);
        if ($mySign != $sign) {
            $resp->msg = '签名失败';
            return $resp;
        }
        $data = array(
            'orderId' => $orderNoOrderId,
            'tradeType' => 3,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
            'tradeNo' => $tradeNo,
            'tradeTime' => $tradeTime,
            'amount' => $tradeAmount,
        );
        $this->logger->info("苹果订单支付异步通知成功(".$orderNoUserId."|".$orderNoOrderId."|".$tradeNo."|".$tradeTime."|".$tradeAmount."|".$productId.")");
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    //验签过程
    public function batchPayNotify() {
        $resp = requireModule('Resp');
        $string = $_POST;
        if ($string == null) {
            $resp->msg = '请使用post方式提交数据';
            return $resp;
        }
        $orderBatchNo = trim($string['orderBatchNo']);
        $receiptData = trim($string['receiptData']);//凭证
        $transactionId = trim($string['transactionId']);//交易流水id
        $sign = trim($string['sign']); //签名
        if (empty($orderBatchNo) || empty($receiptData) || empty($transactionId) || empty($sign)) {
            $resp->msg = 'post数据异常';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'https://buy.itunes.apple.com/verifyReceipt';
        } else {
            $url = 'https://sandbox.itunes.apple.com/verifyReceipt';
        }
        $httpPostResp = trim($this->httpPost($url, '{"receipt-data":"'.$receiptData.'"}'));
        $httpPostResp = json_decode($httpPostResp, true);
        $inApp = $httpPostResp['receipt']['in_app'];
        if (!is_array($inApp) || count($inApp) <= 0) {
            $this->logger->info('苹果支付产品异常：'.print_r($inApp, true));
            $resp->msg = '苹果验证异常';
            return $resp;
        }
        $status = $httpPostResp['status'];
        $productId = null;
        $tradeNo = null;
        $tradeTime = null;
        foreach ($inApp as $app) {
            $pId = trim($app['product_id']);
            $tNo = trim($app['transaction_id']);
            $tTime = trim($app['purchase_date_ms']);
            if (!empty($pId) && !empty($tNo) && !empty($tTime) && $tNo == $transactionId) {
                $productId = $pId;
                $tradeNo = $tNo;
                $tradeTime = $tTime;
                break;
            }
        }
        $tradeTime = date('Y-m-d H:i:s', $tradeTime/1000);
        $productMap = array(
            'com.abacusgo.shaimi.recharge12' => 1200,
            'com.abacusgo.shaimi.recharge50' => 5000,
            'com.abacusgo.shaimi.recharge108' => 10800,
            'com.abacusgo.shaimi.recharge518' => 51800,
            'com.abacusgo.shaimi.recharge1098' => 109800,
            'com.abacusgo.pshaimijingcai.recharge12' => 1200,
            'com.abacusgo.pshaimijingcai.recharge50' => 5000,
            'com.abacusgo.pshaimijingcai.recharge108' => 10800,
            'com.abacusgo.pshaimijingcai.recharge518' => 51800,
            'com.abacusgo.pshaimijingcai.recharge1098' => 109800,
            'com.abacusgo.midoutiyu.recharge12' => 1200,
            'com.abacusgo.midoutiyu.recharge50' => 5000,
            'com.abacusgo.midoutiyu.recharge108' => 10800,
            'com.abacusgo.midoutiyu.recharge518' => 51800,
            'com.abacusgo.midoutiyu.recharge1098' => 109800,
            'com.abacusgo.shaimitiyu.recharge12' => 1200,
            'com.abacusgo.shaimitiyu.recharge50' => 5000,
            'com.abacusgo.shaimitiyu.recharge108' => 10800,
            'com.abacusgo.shaimitiyu.recharge518' => 51800,
            'com.abacusgo.shaimitiyu.recharge1098' => 109800,
            'com.agp.shaimitiyu.recharge12' => 1200,
            'com.agp.shaimitiyu.recharge50' => 5000,
            'com.agp.shaimitiyu.recharge108' => 10800,
            'com.agp.shaimitiyu.recharge518' => 51800,
            'com.agp.shaimitiyu.recharge1098' => 109800
        );
        $tradeAmount = (int)$productMap[$productId];
        if (empty($httpPostResp) || $status != 0 || empty($productId) || empty($tradeNo) || empty($tradeTime) || $tradeAmount <= 0) {
            $this->logger->info('凭证错误：'.print_r($httpPostResp, true));
            $resp->msg = '凭证错误';
            return $resp;
        }
        //查询订单批量信息，验证签sign
        $orderBatchNoArr = $this->common->decodeNo($orderBatchNo);
        $orderBatchNoUserId = (int)$orderBatchNoArr['userId'];
        $orderBatchNoBatchId = (int)$orderBatchNoArr['id'];
        if (empty($orderBatchNoArr) || $orderBatchNoUserId <= 0 || $orderBatchNoBatchId <= 0) {
            $resp->msg = 'orderNo参数有误';
            return $resp;
        }
        $selectOrderBatchByIdResp = $this->orderService->selectOrderBatchById($orderBatchNoBatchId);
        if ($selectOrderBatchByIdResp->errCode != 0) {
            $resp->msg = '访问异常';
            return $resp;
        }
        $orderBatchData = $selectOrderBatchByIdResp->data;
        if (empty($orderBatchData)) {
            $resp->msg = '订单批量不存在';
            return $resp;
        }
        $source = (int)$orderBatchData['source'];
        $userId = (int)$orderBatchData['userId'];
        $batchId = (int)$orderBatchData['batchId'];
        $amount = (int)$orderBatchData['amount'];
        $payUrl = md5($source.'|'.$userId.'|'.$batchId.'|'.$amount);
        $mySign = md5($orderBatchNo.'|'.$receiptData.'|'.$transactionId.'|'.$payUrl);
        if ($mySign != $sign) {
            $resp->msg = '签名失败';
            return $resp;
        }
        $data = array(
            'batchId' => $orderBatchNoBatchId,
            'tradeType' => 3,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
            'tradeNo' => $tradeNo,
            'tradeTime' => $tradeTime,
            'amount' => $tradeAmount,
        );
        $this->logger->info("苹果订单批量支付异步通知成功(".$orderBatchNoUserId."|".$orderBatchNoBatchId."|".$tradeNo."|".$tradeTime."|".$tradeAmount."|".$productId.")");
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    private function httpPost($url, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//返回原生的（Raw）输出
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);//10秒超时
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    }
}