<?php
namespace module;
class Swiftpass {
    private $common;
    private $commonService;
    private $orderService;
    private $userService;
    private $financeService;
    private $comboService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->userService = requireService("User");
        $this->financeService  = requireService("Finance");
        $this->comboService  = requireService("Combo");
    }

    public function createPay($param) {
        $resp = requireModule('Resp');
        $source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
        $userId = (int)$param['userId'];
        $openId = trim($param['openId']);   //用户openId
        $orderId = (int)$param['orderId'];
        $amount = (int)$param['amount'];
        $redirectUrl = trim($param['redirectUrl']);
        if ($source != 0 && $source != 1 && $source != 2) {
            $resp->msg = 'source有误';
            return $resp;
        }
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
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
        global $curEnv;
        global $externalPath;
        global $curEnvConfig;
        require_once ($externalPath."swiftpass/class/ClientResponseHandler.class.php");
        require_once ($externalPath."swiftpass/class/PayHttpClient.class.php");
        require_once ($externalPath."swiftpass/class/RequestHandler.class.php");
        require_once ($externalPath."swiftpass/Utils.class.php");
        if ($curEnv != 'dist') {
            //不是"正式环境"时，一分钱支付
            $amount = 1;
        }
        $swiftpassConfig = $curEnvConfig->swiftpass;
        $mchId = trim($swiftpassConfig->mchId);
        $swiftpassKey = trim($swiftpassConfig->swiftpassKey);
        $payNotifyUrl = trim($swiftpassConfig->payNotifyUrl);
        if (empty($curEnvConfig) || empty($swiftpassConfig) || empty($mchId) || empty($swiftpassKey) || empty($payNotifyUrl)) {
            $resp->msg = '环境配置有误';
            return $resp;
        }
        $reqHandler = new \RequestHandler();
        $resHandler = new \ClientResponseHandler();
        $pay = new \PayHttpClient();
        $reqHandler->setKey($swiftpassKey);
        $baseParam = array();
        $baseParam['out_trade_no'] = $orderId;
        $baseParam['body'] = '晒米场';
        $baseParam['total_fee'] = $amount;
        $baseParam['mch_create_ip'] = $_SERVER['HTTP_HOST'];
        if ($source == 0) {
            $baseParam['sub_openid'] = $openId;
        }
        $reqHandler->setReqParams($baseParam, array('method'));//提交的基本参数
        $requestAPI = 'pay.weixin.jspay';
        if ($source == 1 || $source == 2) {
            $requestAPI = 'unified.trade.pay';  //app支付
        }
        $reqHandler->setParameter('service', $requestAPI);
        $reqHandler->setParameter('mch_id', $mchId);
        $reqHandler->setParameter('attach', $userId);
        $reqHandler->setParameter('notify_url', $payNotifyUrl);
        $reqHandler->setParameter('callback_url', $redirectUrl);
        $reqHandler->setParameter('nonce_str', mt_rand(time(),time()+rand()));
        $reqHandler->createSign();
        $data = \Utils::toXml($reqHandler->getAllParameters());  //XML格式化
        $pay->setReqContent($reqHandler->getGateURL(), $data);   //组建参数string,设置请求内容,网关+请求数据
        if($pay->call()){   //请求结果，请求结果放在resContent中
            $resHandler->setContent($pay->getResContent());
            $resHandler->setKey($swiftpassKey);
            if($resHandler->isTenpaySign()){
                if($resHandler->getParameter('status') == 0 && $resHandler->getParameter('result_code') == 0){
                    $tokenId = $resHandler->getParameter('token_id');
                    //$services = $resHandler->getParameter('services');
                }
            }
        }
        if (empty($tokenId)) {
            $resp->msg = '失败';
            return $resp;
        }
        if ($source == 0) {
            $payUrl = "https://pay.swiftpass.cn/pay/jspay?token_id=".$tokenId."&showwxtitle=1";
        } else if ($source == 1 || $source == 2) {
            $payUrl = $tokenId;
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
        $openId = trim($param['openId']);   //用户openId
        $batchId = (int)$param['batchId'];
        $amount = (int)$param['amount'];
        $redirectUrl = trim($param['redirectUrl']);
        if ($source != 0 && $source != 1 && $source != 2) {
            $resp->msg = 'source有误';
            return $resp;
        }
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        if ($batchId <= 0) {
            $resp->msg = 'batchId有误';
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = 'amount有误';
            return $resp;
        }
        global $curEnv;
        global $externalPath;
        global $curEnvConfig;
        require_once ($externalPath."swiftpass/class/ClientResponseHandler.class.php");
        require_once ($externalPath."swiftpass/class/PayHttpClient.class.php");
        require_once ($externalPath."swiftpass/class/RequestHandler.class.php");
        require_once ($externalPath."swiftpass/Utils.class.php");
        if ($curEnv != 'dist') {
            //不是"正式环境"时，一分钱支付
            $amount = 1;
        }
        $swiftpassConfig = $curEnvConfig->swiftpass;
        $mchId = trim($swiftpassConfig->mchId);
        $swiftpassKey = trim($swiftpassConfig->swiftpassKey);
        $batchPayNotifyUrl = trim($swiftpassConfig->batchPayNotifyUrl);
        if (empty($curEnvConfig) || empty($swiftpassConfig) || empty($mchId) || empty($swiftpassKey) || empty($batchPayNotifyUrl)) {
            $resp->msg = '环境配置有误';
            return $resp;
        }
        $reqHandler = new \RequestHandler();
        $resHandler = new \ClientResponseHandler();
        $pay = new \PayHttpClient();
        $reqHandler->setKey($swiftpassKey);
        $baseParam = array();
        $baseParam['out_trade_no'] = 'batchId_'.$batchId;
        $baseParam['body'] = '晒米场';
        $baseParam['total_fee'] = $amount;
        $baseParam['mch_create_ip'] = $_SERVER['HTTP_HOST'];
        if ($source == 0) {
            $baseParam['sub_openid'] = $openId;
        }
        $reqHandler->setReqParams($baseParam, array('method'));//提交的基本参数
        $requestAPI = 'pay.weixin.jspay';
        if ($source == 1 || $source == 2) {
            $requestAPI = 'unified.trade.pay';  //app支付
        }
        $reqHandler->setParameter('service', $requestAPI);
        $reqHandler->setParameter('mch_id', $mchId);
        $reqHandler->setParameter('attach', $userId);
        $reqHandler->setParameter('notify_url', $batchPayNotifyUrl);
        $reqHandler->setParameter('callback_url', $redirectUrl);
        $reqHandler->setParameter('nonce_str', mt_rand(time(),time()+rand()));
        $reqHandler->createSign();
        $data = \Utils::toXml($reqHandler->getAllParameters());  //XML格式化
        $pay->setReqContent($reqHandler->getGateURL(), $data);   //组建参数string,设置请求内容,网关+请求数据
        if($pay->call()){   //请求结果，请求结果放在resContent中
            $resHandler->setContent($pay->getResContent());
            $resHandler->setKey($swiftpassKey);
            if($resHandler->isTenpaySign()){
                if($resHandler->getParameter('status') == 0 && $resHandler->getParameter('result_code') == 0){
                    $tokenId = $resHandler->getParameter('token_id');
                    //$services = $resHandler->getParameter('services');
                }
            }
        }
        if (empty($tokenId)) {
            $resp->msg = '失败';
            return $resp;
        }
        if ($source == 0) {
            $payUrl = "https://pay.swiftpass.cn/pay/jspay?token_id=".$tokenId."&showwxtitle=1";
        } else if ($source == 1 || $source == 2) {
            $payUrl = $tokenId;
        }
        $resp->data = $payUrl;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //验签过程
    public function payNotify() {
        $resp = requireModule('Resp');
        $xml = trim(file_get_contents("php://input"));
        if (empty($xml)) {
            $resp->msg = '通知数据为空';
            return $resp;
        }
        //验证签名
        global $externalPath;
        global $curEnvConfig;
        require_once ($externalPath."swiftpass/class/ClientResponseHandler.class.php");
        require_once ($externalPath."swiftpass/class/PayHttpClient.class.php");
        require_once ($externalPath."swiftpass/class/RequestHandler.class.php");
        require_once ($externalPath."swiftpass/Utils.class.php");
        $swiftpassConfig = $curEnvConfig->swiftpass;
        $mchId = trim($swiftpassConfig->mchId);     //商户号，由威富通分配
        $swiftpassKey = trim($swiftpassConfig->swiftpassKey); //威富通给的密钥
        if (empty($curEnvConfig) || empty($swiftpassConfig) || empty($mchId) || empty($swiftpassKey)) {
            $resp->msg = '环境配置有误';
            return $resp;
        }
        $resHandler = new \ClientResponseHandler();
        $resHandler->setContent($xml);
        $resHandler->setKey($swiftpassKey);
        if (!$resHandler->isTenpaySign()) {
            $resp->msg = '通知数据异常';
            return $resp;
        }
        $paramResp = $resHandler->parameters;
        $mchIdResp = trim($paramResp['mch_id']);
        $userId = (int)$paramResp['attach'];
        $orderId = (int)$paramResp['out_trade_no'];
        $tradeNo = trim($paramResp['transaction_id']);//威富通交易号
        $tradeTime = trim(date('Y-m-d H:i:s', strtotime($paramResp['time_end'])));
        $amount = (int)($paramResp['total_fee']);//单位分
        $tradeStatus = (int)$paramResp['pay_result'];// 支付结果
        if ($userId <= 0 || $orderId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || $tradeStatus != 0 || $mchIdResp != $mchId) {
            $resp->msg = '通知数据异常';
            return $resp;
        }
        $data = array(
            'userId' => $userId,
            'orderId' => $orderId,
            'tradeType' => 2,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
            'tradeNo' => $tradeNo,
            'tradeTime' => $tradeTime,
            'amount' => $amount
        );
        $this->logger->info("威富通订单支付异步通知成功(".$userId."|".$orderId."|".$tradeNo."|".$tradeTime."|".$amount.")");
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //验签过程
    public function payBatchNotify() {
        $resp = requireModule('Resp');
        $xml = trim(file_get_contents("php://input"));
        if (empty($xml)) {
            $resp->msg = '通知数据为空';
            return $resp;
        }
        //验证签名
        global $externalPath;
        global $curEnvConfig;
        require_once ($externalPath."swiftpass/class/ClientResponseHandler.class.php");
        require_once ($externalPath."swiftpass/class/PayHttpClient.class.php");
        require_once ($externalPath."swiftpass/class/RequestHandler.class.php");
        require_once ($externalPath."swiftpass/Utils.class.php");
        $swiftpassConfig = $curEnvConfig->swiftpass;
        $mchId = trim($swiftpassConfig->mchId);     //商户号，由威富通分配
        $swiftpassKey = trim($swiftpassConfig->swiftpassKey); //威富通给的密钥
        if (empty($curEnvConfig) || empty($swiftpassConfig) || empty($mchId) || empty($swiftpassKey)) {
            $resp->msg = '环境配置有误';
            return $resp;
        }
        $resHandler = new \ClientResponseHandler();
        $resHandler->setContent($xml);
        $resHandler->setKey($swiftpassKey);
        if (!$resHandler->isTenpaySign()) {
            $resp->msg = '通知数据异常';
            return $resp;
        }
        $paramResp = $resHandler->parameters;
        $mchIdResp = trim($paramResp['mch_id']);
        $userId = (int)$paramResp['attach'];
        $batchId = (int)preg_replace("/\D/", '', trim($paramResp['out_trade_no']));//批量id
        $tradeNo = trim($paramResp['transaction_id']);//威富通交易号
        $tradeTime = trim(date('Y-m-d H:i:s', strtotime($paramResp['time_end'])));
        $amount = (int)($paramResp['total_fee']);//单位分
        $tradeStatus = (int)$paramResp['pay_result'];// 支付结果
        if ($userId <= 0 || $batchId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || $tradeStatus != 0 || $mchIdResp != $mchId) {
            $resp->msg = '通知数据异常';
            return $resp;
        }
        $data = array(
            'userId' => $userId,
            'batchId' => $batchId,
            'tradeType' => 2,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
            'tradeNo' => $tradeNo,
            'tradeTime' => $tradeTime,
            'amount' => $amount
        );
        $this->logger->info("威富通订单批量支付异步通知成功(".$userId."|".$batchId."|".$tradeNo."|".$tradeTime."|".$amount.")");
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}