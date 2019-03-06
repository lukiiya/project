<?php
namespace controller\portal;
use controller\Base;

class Sms extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $smsService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->smsService = requireService("Sms");
	}

	public function sendSmsCode() {
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
        $version = trim($this->common->getParam("version", ''));
        $code = trim($this->common->getParam("code", ''));
        $mobile = trim($this->common->getParam("mobile", ''));
        if ($source == 0 || ($source == 1 && $branch == 1 && $version > '2.1.1') || ($source == 1 && $branch == 0 && $version > '3.2.2') || ($source == 2 && $branch == 0 && $version > '2.4.0')) {
            $code = strtolower($code);
            $vCode = $this->common->getVerificationCode();
            if (empty($code) || empty($vCode) || $code !== $vCode) {
                $this->resp->msg = "图片验证码有误";
                $this->jsonView->out($this->resp);
            }
        }
		if (!$this->common->verifyMobile($mobile)) {
			$this->resp->msg = "手机号码有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['mobile'] = $mobile;
		$selectSmsCodeResp = $this->smsService->selectSmsCode($param);
		if ($selectSmsCodeResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$list = $selectSmsCodeResp->data['list'];
		$minute = 10;
		if (is_array($list) && count($list) > 0) {
			$data = $list[0];
			$time = strtotime(trim($data['time']));
			$timeout = 60 * $minute;
			if (time() - $time < $timeout) {
				$this->resp->errCode = 0;
				$this->resp->msg = "成功";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		if (!empty($this->loginUserInfo)) {
			$param['userId'] = (int)$this->loginUserInfo['userId'];
            $forbid = (int)$this->loginUserInfo['forbid'];
            if ($forbid == 1) {
                $this->resp->msg = "该用户已被封号";
                $this->jsonView->out($this->resp);
            }
		} else {
			$param['ip'] = $this->common->getIP();
		}
		//查询用户当天短信验证码次数
		$selectSmsCodeCountResp = $this->smsService->selectSmsCodeCount($param);
		if ($selectSmsCodeCountResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$list = $selectSmsCodeCountResp->data['list'];
		if (is_array($list) && count($list) > 0) {
			$data = $list[0];
			$count = (int)$data['count'];
			$time = date("Y-m-d", strtotime(trim($data['time'])));
			$date = date("Y-m-d");
			if ($time == $date) {
				if (!empty($this->loginUserInfo)) {
					if ($count >= 10) {
						$this->resp->msg = "一个用户一天只能获取10次验证码";
						$this->jsonView->out($this->resp);
					}
				} else {
					if ($count >= 3) {
						$this->resp->msg = "一个ip一天只能获取3次验证码";
						$this->jsonView->out($this->resp);
					}
				}
			}
		}
		$code = '';
		for ($i = 0; $i < 6; $i++) {
			$code .= mt_rand(0, 9);
		}
		$sms = requireModule("Sms");
		$templateId = "27003";
		$param = $code.",".$minute;
		$smsResp = $sms->sendMessage($mobile, $templateId, $param);
		if ($smsResp->errCode != 0) {
			$this->resp->msg = $smsResp->msg;
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['mobile'] = $mobile;
		$param['code'] = $code;
		$replaceSmsCodeResp = $this->smsService->replaceSmsCode($param);
		if ($replaceSmsCodeResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$date = date("Y-m-d");
		if (is_array($list) && count($list) > 0) {
			$data = $list[0];
			$count = (int)$data['count'];
			if (!empty($this->loginUserInfo)) {
				if ($count >= 10) {
					$count = 0;
				}
			} else {
				if ($count >= 3) {
					$count = 0;
				}
			}
			$param = array();
			$param['countId'] = (int)$data['countId'];
			if (!empty($this->loginUserInfo)) {
				$param['nickName'] = trim($this->loginUserInfo['nickName']);
				$param['realName'] = trim($this->loginUserInfo['realName']);
			}
			$param['count'] = $count + 1;
			$param['time'] = $date;
			$updateSmsCodeCountResp = $this->smsService->updateSmsCodeCount($param);
			if ($updateSmsCodeCountResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		} else {
			if (!empty($this->loginUserInfo)) {
				$param['userId'] = (int)$this->loginUserInfo['userId'];
				$param['nickName'] = trim($this->loginUserInfo['nickName']);
				$param['realName'] = trim($this->loginUserInfo['realName']);
			} else {
				$param['ip'] = $this->common->getIP();
			}
			$param['count'] = 1;
			$param['time'] = $date;
			$insertSmsCodeCountResp = $this->smsService->insertSmsCodeCount($param);
			if ($insertSmsCodeCountResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}