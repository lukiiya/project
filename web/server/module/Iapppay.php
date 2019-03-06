<?php
namespace module;
class Iapppay {
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
		$sourceMap = array('0' => 'h5', '1' => 'android', '2' => 'ios');
		$source = trim($sourceMap[$source]);
		$userId = (int)$param['userId'];
		$orderType = (int)$param['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$orderId = (int)$param['orderId'];
		$amount = (int)$param['amount'];
		$redirectUrl = trim($param['redirectUrl']);
		if ($source != 'h5' && $source != 'android' && $source != 'ios') {
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
		global $orderUrl;
		global $h5url;
		global $externalPath;
		global $curEnv;
		global $curEnvConfig;
		require_once ($externalPath."iapppay/config.php");
		require_once ($externalPath."iapppay/base.php");
		if ($source == 'ios') {
			//ios临时用h5版本的支付
			$source = 'h5';
		}
		$iapppayConfig = $curEnvConfig->iapppay->$source;
		if (empty($curEnv) || empty($curEnvConfig) || empty($iapppayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$appid = trim($iapppayConfig->appid);
		$appkey = trim($iapppayConfig->appkey);
		$platpkey = trim($iapppayConfig->platpkey);
		$waresid = (int)$iapppayConfig->waresid;
		if (empty($appid) || empty($appkey) || empty($platpkey) || empty($waresid)) {
			$resp->msg = '支付环境配置有误';
			return $resp;
		}
		$amount = $amount/100;
		if ($curEnv != 'dist') {
			//不是"正式环境"时，一分钱支付
			$amount = 0.01;
		}
		$payNotifyUrl = trim($curEnvConfig->iapppay->payNotifyUrl);
		if (empty($payNotifyUrl)) {
			$resp->msg = 'payNotifyUr有误';
			return $resp;
		}
		//下单接口
		$orderReq = array();
		$orderReq['appid'] = $appid;
		$orderReq['waresid'] = $waresid;
		$orderReq['cporderid'] = (string)$orderId; //确保该参数每次 都不一样。否则下单会出问题。
		$orderReq['price'] = $amount;//单位：元
		$orderReq['currency'] = 'RMB';
		$orderReq['appuserid'] = (string)$userId;
		$orderReq['cpprivateinfo'] = $source;//透传参数
		$orderReq['notifyurl'] = $payNotifyUrl;
		//组装请求报文  对数据签名
		$reqData = composeReq($orderReq, $appkey);
		//发送到爱贝服务后台请求下单
		$respData = request_by_curl($orderUrl, $reqData, '晒米场');
		//验签数据并且解析返回报文
		$respJson = new \stdClass();
		if(!parseResp($respData, $platpkey, $respJson)) {
			$this->logger->info(print_r($respData, true));
			$this->logger->info(print_r($respJson, true));
			$resp->msg = '生成支付单失败';
			return $resp;
		}
		$transid = $respJson->transid;
		if ($source == 'h5') {
			$orderReq = array();
			$orderReq['transid'] = $transid;
			$orderReq['redirecturl'] = $redirectUrl;
			//$orderReq['cpurl'] = ;
			//组装请求报文   对数据签名
			$reqData = composeReq($orderReq, $appkey);
			$payUrl = $h5url.$reqData;
		} else if ($source == 'android' || $source == 'ios') {
			$payUrl = 'transid='.$transid.'&appid='.$appid;
		}
		$resp->data = $payUrl;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function createBatchPay($param) {
		$resp = requireModule('Resp');
		$source = (int)$param['source'];//来源, 0=h5, 1=android, 2=ios
		$sourceMap = array('0' => 'h5', '1' => 'android', '2' => 'ios');
		$source = trim($sourceMap[$source]);
		$userId = (int)$param['userId'];
		$batchId = (int)$param['batchId'];
		$amount = (int)$param['amount'];
		$redirectUrl = trim($param['redirectUrl']);
		if ($source != 'h5' && $source != 'android' && $source != 'ios') {
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
		global $orderUrl;
		global $h5url;
		global $externalPath;
		global $curEnv;
		global $curEnvConfig;
		require_once ($externalPath."iapppay/config.php");
		require_once ($externalPath."iapppay/base.php");
		if ($source == 'ios') {
			//ios临时用h5版本的支付
			$source = 'h5';
		}
		$iapppayConfig = $curEnvConfig->iapppay->$source;
		if (empty($curEnv) || empty($curEnvConfig) || empty($iapppayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$appid = trim($iapppayConfig->appid);
		$appkey = trim($iapppayConfig->appkey);
		$platpkey = trim($iapppayConfig->platpkey);
		$waresid = (int)$iapppayConfig->waresid;
		if (empty($appid) || empty($appkey) || empty($platpkey) || empty($waresid)) {
			$resp->msg = '支付环境配置有误';
			return $resp;
		}
		$amount = $amount/100;
		if ($curEnv != 'dist') {
			//不是"正式环境"时，一分钱支付
			$amount = 0.01;
		}
		$batchPayNotifyUrl = trim($curEnvConfig->iapppay->batchPayNotifyUrl);
		if (empty($batchPayNotifyUrl)) {
			$resp->msg = 'batchPayNotifyUrl有误';
			return $resp;
		}
		//下单接口
		$orderReq = array();
		$orderReq['appid'] = $appid;
		$orderReq['waresid'] = $waresid;
		$orderReq['cporderid'] = 'batchId_'.$batchId; //确保该参数每次 都不一样。否则下单会出问题。
		$orderReq['price'] = $amount;//单位：元
		$orderReq['currency'] = 'RMB';
		$orderReq['appuserid'] = (string)$userId;
		$orderReq['cpprivateinfo'] = $source;//透传参数
		$orderReq['notifyurl'] = $batchPayNotifyUrl;
		//组装请求报文  对数据签名
		$reqData = composeReq($orderReq, $appkey);
		//发送到爱贝服务后台请求下单
		$respData = request_by_curl($orderUrl, $reqData, '晒米场');
		//验签数据并且解析返回报文
		$respJson = new \stdClass();
		if(!parseResp($respData, $platpkey, $respJson)) {
			$this->logger->info(print_r($respData, true));
			$this->logger->info(print_r($respJson, true));
			$resp->msg = '生成支付单失败';
			return $resp;
		}
		$transid = $respJson->transid;
		if ($source == 'h5') {
			$orderReq = array();
			$orderReq['transid'] = $transid;
			$orderReq['redirecturl'] = $redirectUrl;
			//$orderReq['cpurl'] = ;
			//组装请求报文   对数据签名
			$reqData = composeReq($orderReq, $appkey);
			$payUrl = $h5url.$reqData;
		} else if ($source == 'android' || $source == 'ios') {
			$payUrl = 'transid='.$transid.'&appid='.$appid;
		}
		$resp->data = $payUrl;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function payNotify() {
		$resp = requireModule('Resp');
		$string = $_POST;
		//$this->logger->info(print_r($string, true));
		if ($string == null) {
			$resp->msg = '请使用post方式提交数据';
			return $resp;
		}
		$transdata = $string['transdata'];
		if (stripos("%22", $transdata)) { //判断接收到的数据是否做过 Urldecode处理，如果没有处理则对数据进行Urldecode处理
			$string = array_map('urldecode', $string);
		}
		$transdata = json_decode($transdata);
		if (empty($transdata)) {
			$resp->msg = '通知数据异常';
			return $resp;
		}
		$source = trim($transdata->cpprivate);
		if ($source != 'h5' && $source != 'android' && $source != 'ios') {
			$resp->msg = 'source有误';
			return $resp;
		}
		global $externalPath;
		global $curEnvConfig;
		require_once ($externalPath."iapppay/config.php");
		require_once ($externalPath."iapppay/base.php");
		$iapppayConfig = $curEnvConfig->iapppay->$source;
		if (empty($curEnvConfig) || empty($iapppayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$platpkey = trim($iapppayConfig->platpkey);
		if (empty($platpkey)) {
			$resp->msg = '公钥配置有误';
			return $resp;
		}
		$respData = 'transdata='.$string['transdata'].'&sign='.$string['sign'].'&signtype='.$string['signtype'];//把数据组装成验签函数要求的参数格式
		//验签函数parseResp（） 中 只接受明文数据。数据如：transdata={"appid":"3003686553","appuserid":"10123059","cporderid":"1234qwedfq2as123sdf3f1231234r","cpprivate":"11qwe123r23q232111","currency":"RMB","feetype":0,"money":0.12,"paytype":403,"result":0,"transid":"32011601231456558678","transtime":"2016-01-23 14:57:15","transtype":0,"waresid":1}&sign=jeSp7L6GtZaO/KiP5XSA4vvq5yxBpq4PFqXyEoktkPqkE5b8jS7aeHlgV5zDLIeyqfVJKKuypNUdrpMLbSQhC8G4pDwdpTs/GTbDw/stxFXBGgrt9zugWRcpL56k9XEXM5ao95fTu9PO8jMNfIV9mMMyTRLT3lCAJGrKL17xXv4=&signtype=RSA
		$respJson = new \stdClass();
		if (!parseResp($respData, $platpkey, $respJson)) {
			$resp->msg = '验签失败';
			return $resp;
		}
		$userId = (int)$transdata->appuserid;
		$orderId = (int)$transdata->cporderid;
		$tradeNo = trim($transdata->transid);
		$tradeTime = trim($transdata->transtime);
		$amount = (int)($transdata->money*100);//单位元，所以要*100
		$result = (int)$transdata->result;//交易结果：0=交易成功, 1=交易失败
		if ($userId <= 0 || $orderId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || $result != 0) {
			$resp->msg = '通知数据异常';
			return $resp;
		}
		$data = array(
			'userId' => $userId,
			'orderId' => $orderId,
			'tradeType' => 0,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
			'tradeNo' => $tradeNo,
			'tradeTime' => $tradeTime,
			'amount' => $amount
		);
		$this->logger->info("爱贝订单支付异步通知成功(".$userId."|".$orderId."|".$tradeNo."|".$tradeTime."|".$amount.")");
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function batchPayNotify() {
		$resp = requireModule('Resp');
		$string = $_POST;
		//$this->logger->info(print_r($string, true));
		if ($string == null) {
			$resp->msg = '请使用post方式提交数据';
			return $resp;
		}
		$transdata = $string['transdata'];
		if (stripos("%22", $transdata)) { //判断接收到的数据是否做过 Urldecode处理，如果没有处理则对数据进行Urldecode处理
			$string = array_map('urldecode', $string);
		}
		$transdata = json_decode($transdata);
		if (empty($transdata)) {
			$resp->msg = '通知数据异常';
			return $resp;
		}
		$source = trim($transdata->cpprivate);
		if ($source != 'h5' && $source != 'android' && $source != 'ios') {
			$resp->msg = 'source有误';
			return $resp;
		}
		global $externalPath;
		global $curEnvConfig;
		require_once ($externalPath."iapppay/config.php");
		require_once ($externalPath."iapppay/base.php");
		$iapppayConfig = $curEnvConfig->iapppay->$source;
		if (empty($curEnvConfig) || empty($iapppayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$platpkey = trim($iapppayConfig->platpkey);
		if (empty($platpkey)) {
			$resp->msg = '公钥配置有误';
			return $resp;
		}
		$respData = 'transdata='.$string['transdata'].'&sign='.$string['sign'].'&signtype='.$string['signtype'];//把数据组装成验签函数要求的参数格式
		//验签函数parseResp（） 中 只接受明文数据。数据如：transdata={"appid":"3003686553","appuserid":"10123059","cporderid":"1234qwedfq2as123sdf3f1231234r","cpprivate":"11qwe123r23q232111","currency":"RMB","feetype":0,"money":0.12,"paytype":403,"result":0,"transid":"32011601231456558678","transtime":"2016-01-23 14:57:15","transtype":0,"waresid":1}&sign=jeSp7L6GtZaO/KiP5XSA4vvq5yxBpq4PFqXyEoktkPqkE5b8jS7aeHlgV5zDLIeyqfVJKKuypNUdrpMLbSQhC8G4pDwdpTs/GTbDw/stxFXBGgrt9zugWRcpL56k9XEXM5ao95fTu9PO8jMNfIV9mMMyTRLT3lCAJGrKL17xXv4=&signtype=RSA
		$respJson = new \stdClass();
		if (!parseResp($respData, $platpkey, $respJson)) {
			$resp->msg = '验签失败';
			return $resp;
		}
		$userId = (int)$transdata->appuserid;
		$batchId = (int)preg_replace("/\D/", '', trim($transdata->cporderid));//批量id
		$tradeNo = trim($transdata->transid);
		$tradeTime = trim($transdata->transtime);
		$amount = (int)($transdata->money*100);//单位元，所以要*100
		$result = (int)$transdata->result;//交易结果：0=交易成功, 1=交易失败
		if ($userId <= 0 || $batchId <= 0 || empty($tradeNo) || empty($tradeTime) || $amount <= 0 || $result != 0) {
			$resp->msg = '通知数据异常';
			return $resp;
		}
		$data = array(
			'userId' => $userId,
			'batchId' => $batchId,
			'tradeType' => 0,//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
			'tradeNo' => $tradeNo,
			'tradeTime' => $tradeTime,
			'amount' => $amount
		);
		$this->logger->info("爱贝订单批量支付异步通知成功(".$userId."|".$batchId."|".$tradeNo."|".$tradeTime."|".$amount.")");
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function queryPay($param) {
		$resp = requireModule('Resp');
		if (empty($param) || !is_array($param) || count($param) <= 0) {
			$resp->msg = '参数有误';
			return $resp;
		}
		$orderId = (int)$param['orderId'];
		if ($orderId <= 0) {
			$resp->msg = 'orderId有误';
			return $resp;
		}
		$param['source'] = 'h5';
		$doQueryPayResp = $this->doQueryPay($param);
		if ($doQueryPayResp->errCode == 0) {
			$resp->data = $doQueryPayResp->data;
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		}
		$param['source'] = 'ios';
		$doQueryPayResp = $this->doQueryPay($param);
		if ($doQueryPayResp->errCode == 0) {
			$resp->data = $doQueryPayResp->data;
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		}
		$param['source'] = 'android';
		$doQueryPayResp = $this->doQueryPay($param);
		if ($doQueryPayResp->errCode == 0) {
			$resp->data = $doQueryPayResp->data;
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		}
		$resp->msg = "交易查询失败";
		return $resp;
	}

	private function doQueryPay($param) {
		$resp = requireModule('Resp');
		if (empty($param) || !is_array($param) || count($param) <= 0) {
			$resp->msg = '参数有误';
			return $resp;
		}
		$orderId = (int)$param['orderId'];
		$source = trim($param['source']);//h5, android, ios
		if ($orderId <= 0) {
			$resp->msg = 'orderId有误';
			return $resp;
		}
		if ($source != 'h5' && $source != 'android' && $source != 'ios') {
			$resp->msg = 'source有误';
			return $resp;
		}
		global $queryResultUrl;
		global $externalPath;
		global $curEnv;
		global $curEnvConfig;
		require_once ($externalPath."iapppay/config.php");
		require_once ($externalPath."iapppay/base.php");
		$iapppayConfig = $curEnvConfig->iapppay->$source;
		if (empty($curEnv) || empty($curEnvConfig) || empty($iapppayConfig)) {
			$resp->msg = '环境配置有误';
			return $resp;
		}
		$appid = trim($iapppayConfig->appid);
		$appkey = trim($iapppayConfig->appkey);
		$platpkey = trim($iapppayConfig->platpkey);
		if (empty($appid) || empty($appkey) || empty($platpkey)) {
			$resp->msg = '支付环境配置有误';
			return $resp;
		}
		$queryReq = array();
		$queryReq['appid'] = $appid;
		$queryReq['cporderid'] = (string)$orderId;
		$reqData = composeReq($queryReq, $appkey);
		$respData = request_by_curl($queryResultUrl, $reqData, '晒米场');
		$respJson = new \stdClass();
		if(!parseResp($respData, $platpkey, $respJson)) {
			$this->logger->info(print_r($respData, true));
			$this->logger->info(print_r($respJson, true));
			$resp->msg = '查询交易失败';
			return $resp;
		}
		$resp->data = $respJson;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}