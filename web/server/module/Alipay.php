<?php
namespace module;
class Alipay {
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
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=米多多彩票
		$version = trim($this->common->getParam("version", ''));
		$source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
		$userId = (int)$param['userId'];
		$orderType = (int)$param['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
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
		$orderUrl = null;
		$h5url = null;
		global $externalPath;
		global $curEnv;
		global $curEnvConfig;
		require_once ($externalPath."alipay/AopClient.php");
		require_once ($externalPath."alipay/request/AlipayTradeAppPayRequest.php");
		require_once ($externalPath."alipay/request/AlipayTradeWapPayRequest.php");
		$alipayConfig = $curEnvConfig->alipay;
		if (empty($curEnv) || empty($curEnvConfig) || empty($alipayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$appId = trim($alipayConfig->appId);
		$appPrivateKey = trim($alipayConfig->appPrivateKey);
		$alipayPublicKey = trim($alipayConfig->alipayPublicKey);
		if (empty($appId) || empty($appPrivateKey) || empty($alipayPublicKey)) {
			$resp->msg = '支付环境配置有误';
			return $resp;
		}
		$amount = $amount/100;
		if ($curEnv != 'dist') {
			//不是"正式环境"时，一分钱支付
			$amount = 0.01;

		}
		if ($source == 2) {
			//苹果走h5
			$source = 0;
		}
		$payNotifyUrl = trim($alipayConfig->payNotifyUrl);
		if (empty($payNotifyUrl)) {
			$resp->msg = 'payNotifyUrl有误';
			return $resp;
		}
		$alipay = new \AopClient();
		//公共参数
		$alipay->appId = $appId;
		$alipay->rsaPrivateKey = $appPrivateKey;
		$payUrl = null;
		$request = null;
		//业务参数
		$bizContent = array();
		$bizContent['out_trade_no'] = (string)$orderId; //确保该参数每次 都不一样。否则下单会出问题。
		$bizContent['passback_params'] = (string)$userId;
		$bizContent['total_amount'] = (string)$amount;//金额
		$bizContent['subject'] = "晒米场";//标题
		if (($source == 1 || $source == 2)) {
			$bizContent['product_code'] = "QUICK_MSECURITY_PAY";
			$bizContent = trim(json_encode($bizContent, JSON_UNESCAPED_UNICODE));
			$request = new \AlipayTradeAppPayRequest();
			$request->setBizContent($bizContent);
            $payNotifyUrl = 'http://115.159.58.69/cgi/payNotify.php';
            $request->setNotifyUrl($payNotifyUrl);
            $payUrl = $alipay->sdkExecute($request);
            $this->logger->info("支付宝支付请求：".$payUrl);
		} else {
			$bizContent['product_code'] = "QUICK_WAP_PAY";
			$bizContent = trim(json_encode($bizContent, JSON_UNESCAPED_UNICODE));
			$request = new \AlipayTradeWapPayRequest();
			$request->setBizContent($bizContent);
			$request->setNotifyUrl($payNotifyUrl);
			$request->setReturnUrl($redirectUrl);
			$payUrl = $alipay->pageExecuteForShaimi($request);
			$payUrl = urlencode($payUrl);
			//编码后，空格变成了"+", 前端js的decodeURIComponent还原不了
			$payUrl = str_replace('+', '%20', $payUrl);//%20表示空格
			$homePage = trim($curEnvConfig->homePage);
			$payUrl = $homePage .'alipay.html?'.$payUrl;
		}
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
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=米多多彩票
		$version = trim($this->common->getParam("version", ''));
		$source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
		$userId = (int)$param['userId'];
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
		$orderUrl = null;
		$h5url = null;
		global $externalPath;
		global $curEnv;
		global $curEnvConfig;
		require_once ($externalPath."alipay/AopClient.php");
		require_once ($externalPath."alipay/request/AlipayTradeAppPayRequest.php");
		require_once ($externalPath."alipay/request/AlipayTradeWapPayRequest.php");
		$alipayConfig = $curEnvConfig->alipay;
		if (empty($curEnv) || empty($curEnvConfig) || empty($alipayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$appId = trim($alipayConfig->appId);
		$appPrivateKey = trim($alipayConfig->appPrivateKey);
		$alipayPublicKey = trim($alipayConfig->alipayPublicKey);
		if (empty($appId) || empty($appPrivateKey) || empty($alipayPublicKey)) {
			$resp->msg = '支付环境配置有误';
			return $resp;
		}
		$amount = $amount/100;
		if ($curEnv != 'dist') {
			//不是"正式环境"时，一分钱支付
			$amount = 0.01;
		}
		if ($source == 2) {
			//苹果走h5
			$source = 0;
		}
		$batchPayNotifyUrl = trim($alipayConfig->batchPayNotifyUrl);
		if (empty($batchPayNotifyUrl)) {
			$resp->msg = 'batchPayNotifyUrl有误';
			return $resp;
		}
		$alipay = new \AopClient();
		//公共参数
		$alipay->appId = $appId;
		$alipay->rsaPrivateKey = $appPrivateKey;
		$payUrl = null;
		$request = null;
		//业务参数
		$bizContent = array();
		$bizContent['out_trade_no'] = 'batchId_'.$batchId; //确保该参数每次 都不一样。否则下单会出问题。
		$bizContent['passback_params'] = (string)$userId;
		$bizContent['total_amount'] = (string)$amount;//金额
		$bizContent['subject'] = "晒米场";//标题
		if (($source == 1 || $source == 2)) {
			$bizContent['product_code'] = "QUICK_MSECURITY_PAY";
			$bizContent = trim(json_encode($bizContent, JSON_UNESCAPED_UNICODE));
			$request = new \AlipayTradeAppPayRequest();
			$request->setBizContent($bizContent);
            $batchPayNotifyUrl = 'http://115.159.58.69/cgi/batchPayNotify.php';
			$request->setNotifyUrl($batchPayNotifyUrl);
			$payUrl = $alipay->sdkExecute($request);
            $this->logger->info("支付宝支付请求：".$payUrl);
		} else {
			$bizContent['product_code'] = "QUICK_WAP_PAY";
			$bizContent = trim(json_encode($bizContent, JSON_UNESCAPED_UNICODE));
			$request = new \AlipayTradeWapPayRequest();
			$request->setBizContent($bizContent);
			$request->setNotifyUrl($batchPayNotifyUrl);
			$request->setReturnUrl($redirectUrl);
			$payUrl = $alipay->pageExecuteForShaimi($request);
			$payUrl = urlencode($payUrl);
			//编码后，空格变成了"+", 前端js的decodeURIComponent还原不了
			$payUrl = str_replace('+', '%20', $payUrl);//%20表示空格
			$homePage = trim($curEnvConfig->homePage);
			$payUrl = $homePage .'alipay.html?'.$payUrl;
		}
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
		unset($_POST['c']);
		unset($_POST['m']);
		$string = $_POST;
		if ($string == null) {
			$resp->msg = '请使用post方式提交数据';
			return $resp;
		}
        $this->logger->info('支付宝异步通知：'.file_get_contents("php://input"));
		global $externalPath;
		global $curEnvConfig;
		require_once ($externalPath."alipay/AopClient.php");
		require_once ($externalPath."alipay/request/AlipayTradeAppPayRequest.php");
		$alipayConfig = $curEnvConfig->alipay;
		if (empty($curEnvConfig) || empty($alipayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$alipayPublicKey = trim($alipayConfig->alipayPublicKey);
		if (empty($alipayPublicKey)) {
			$resp->msg = '公钥配置有误';
			return $resp;
		}
		$alipay = new \AopClient();
		$alipay->alipayrsaPublicKey = $alipayPublicKey;
		if (!$alipay->rsaCheckV1($string, null)) {
			$resp->msg = '验签失败';
			return $resp;
		}
		$this->logger->info("订单支付宝验签成功");
		$userId = (int)$string['passback_params'];
		$orderId = (int)$string['out_trade_no'];//订单id
        $tradeNo = trim($string['trade_no']); //支付宝交易号
		$tradeTime = trim($string['gmt_payment']) ? trim($string['gmt_payment']) : trim($string['gmt_create']);//支付宝交易创建时间
        $amount = (int)($string['total_amount']*100);//单位元，所以要*100
        $tradeStatus = trim($string['trade_status']);// 交易状态trade_status
        if ($userId <= 0 || $orderId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || ($tradeStatus != "TRADE_SUCCESS" && $tradeStatus != "TRADE_FINISHED")) {
            $resp->msg = '通知数据异常';
            return $resp;
        }
        $data = array(
			'userId' => $userId,
            'orderId' => $orderId,
			'tradeType' => 1,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
            'tradeNo' => $tradeNo,
			'tradeTime' => $tradeTime,
            'amount' => $amount
        );
        $this->logger->info("支付宝订单支付异步通知成功(".$userId."|".$orderId."|".$tradeNo."|".$tradeTime."|".$amount.")");
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	//验签过程
	public function batchPayNotify() {
		$resp = requireModule('Resp');
		unset($_POST['c']);
		unset($_POST['m']);
		$string = $_POST;
		if ($string == null) {
			$resp->msg = '请使用post方式提交数据';
			return $resp;
		}
		global $externalPath;
		global $curEnvConfig;
		require_once ($externalPath."alipay/AopClient.php");
		require_once ($externalPath."alipay/request/AlipayTradeAppPayRequest.php");
		$alipayConfig = $curEnvConfig->alipay;
		if (empty($curEnvConfig) || empty($alipayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$alipayPublicKey = trim($alipayConfig->alipayPublicKey);
		if (empty($alipayPublicKey)) {
			$resp->msg = '公钥配置有误';
			return $resp;
		}
		$alipay = new \AopClient();
		$alipay->alipayrsaPublicKey = $alipayPublicKey;
		if (!$alipay->rsaCheckV1($string, null)) {
			$resp->msg = '验签失败';
			return $resp;
		}
		$this->logger->info("订单批量支付宝验签成功");
		$userId = (int)$string['passback_params'];
		$batchId = (int)preg_replace("/\D/", '', trim($string['out_trade_no']));//批量id
		$tradeNo = trim($string['trade_no']); //支付宝交易号
		$tradeTime = trim($string['gmt_payment']) ? trim($string['gmt_payment']) : trim($string['gmt_create']);//支付宝交易创建时间
		$amount = (int)($string['total_amount']*100);//单位元，所以要*100
		$tradeStatus = trim($string['trade_status']);// 交易状态trade_status
		if ($userId <= 0 || $batchId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || ($tradeStatus != "TRADE_SUCCESS" && $tradeStatus != "TRADE_FINISHED")) {
			$resp->msg = '通知数据异常';
			return $resp;
		}
		$data = array(
			'userId' => $userId,
			'batchId' => $batchId,
			'tradeType' => 1,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
			'tradeNo' => $tradeNo,
			'tradeTime' => $tradeTime,
			'amount' => $amount
		);
		$this->logger->info("支付宝订单批量支付异步通知成功(".$userId."|".$batchId."|".$tradeNo."|".$tradeTime."|".$amount.")");
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}