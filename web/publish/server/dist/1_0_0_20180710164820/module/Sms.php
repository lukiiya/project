<?php
namespace module;
class Sms {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function sendMessage($mobile, $templateId, $param) {
		$resp = requireModule('Resp');
		$mobile = trim($mobile);
		$templateId = trim($templateId);
		$param = trim($param);
		if (!$this->common->verifyMobile($mobile)) {
			$resp->msg = '手机号码有误';
			return $resp;
		}
		if (empty($templateId)) {
			$resp->msg = 'templateId有误';
			return $resp;
		}
		if (empty($param)) {
			$resp->msg = 'param有误';
			return $resp;
		}
		global $externalPath;
		include_once($externalPath."ucpaas/Ucpaas.class.php");
		$options = array();
		$options['accountsid'] = 'e2c62130a72441368893bd4577e4d433';
		$options['token'] = '3b6fa4d1e2e0176dfeb060f0f8fc7fc5';
		$ucpass = new \Ucpaas($options);
		$appId = '62a7824a17af479f8982e1d5d3d8d73d';
		$to = $mobile;
		$jsonResp = $ucpass->templateSMS($appId, $to, $templateId, $param);
		$jsonResp = json_decode($jsonResp);
		if (empty($jsonResp) || empty($jsonResp->resp) || $jsonResp->resp->respCode != '000000') {
			$ip = $this->common->getIP();
			$this->logger->info('IP：'.$ip.', 发送短信响应('.$mobile.'-'.$param.')：'.print_r($jsonResp, true));
			$resp->msg = '短信发送异常,请稍候重试';
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}