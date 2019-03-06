<?php
namespace controller\portal;
use controller\Base;

class User extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $groupService;
	private $financeService;
	private $smsService;
	private $planService;
	private $focusService;
	private $activityService;
	private $channelService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->groupService = requireService("Group");
		$this->financeService = requireService("Finance");
		$this->smsService = requireService("Sms");
		$this->planService = requireService("Plan");
		$this->focusService = requireService("Focus");
		$this->activityService = requireService("Activity");
		$this->channelService = requireService("Channel");
	}

	//不存就插入, 存在就更新
	public function toggleUser() {
		global $curEnvConfig;
		$weixinConfig = $curEnvConfig->weixin;
		if (empty($weixinConfig)) {
			return;
		}
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
		$source = (int)$this->common->getParam("source", 0);
		$channel = (int)$this->common->getParam("channel", 0);
		$code = trim($this->common->getParam("code", ''));
		//透传参数
		$state = trim($this->common->getParam("state", ''));
		$url = trim($this->common->getParam("url", ''));
		if ($code == '') {
			$this->resp->msg = "code不能为空";
			$this->jsonView->out($this->resp);
		}
		$jssdk = requireModule("Jssdk");
		$appid = null;
		$secret = null;
		if ($this->common->isApp()) {
			$openAppIdKey = 'openAppId'.(($branch == 1 || $branch == 2 || $branch == 3) ? 'Jc' : '');
			$openAppSecretKey = 'openAppSecret'.(($branch == 1 || $branch == 2 || $branch == 3) ? 'Jc' : '');
			$appid = $weixinConfig->$openAppIdKey;
			$secret = $weixinConfig->$openAppSecretKey;
		} else {
			$appid = $weixinConfig->appId;
			$secret = $weixinConfig->appSecret;
		}
		if (empty($appid) || empty($secret)) {
			$this->resp->msg = "微信参数配置有误";
			$this->jsonView->out($this->resp);
		}
		//$this->logger->info('appid：'.$appid.' ，secret：'.$secret);
		$accessTokenJson = $jssdk->httpGet('https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code');
		$accessTokenJson = json_decode($accessTokenJson);
		if (empty($accessTokenJson) || empty($accessTokenJson->access_token)) {
			$this->logger->info("\naccess_token获取失败\nappid：".$appid.', secret：'.$secret."\n".print_r($accessTokenJson, true));
			$this->resp->msg = "access_token获取失败";
			$this->jsonView->out($this->resp);
		}
		$accessToken = $accessTokenJson->access_token;
		$openId = $accessTokenJson->openid;
		$wxUserInfoJson = $jssdk->httpGet('https://api.weixin.qq.com/sns/userinfo?access_token='.$accessToken.'&openid='.$openId.'&lang=zh_CN');
		//$this->logger->info($wxUserInfoJson);
		$wxUserInfoJson = json_decode($wxUserInfoJson);
		if (empty($wxUserInfoJson) || empty($wxUserInfoJson->openid)) {
			$this->logger->info("\nuserinfo获取失败\nappid：".$appid.', secret：'.$secret."\n".print_r($wxUserInfoJson, true));
			$this->resp->msg = "userinfo获取失败";
			$this->jsonView->out($this->resp);
		}
		if (empty($wxUserInfoJson->unionid)) {
			$this->resp->msg = "unionid获取失败";
			$this->jsonView->out($this->resp);
		}
		$openId = trim($wxUserInfoJson->openid);
		$unionId = trim($wxUserInfoJson->unionid);
		$nickName = trim($wxUserInfoJson->nickname);
		$nickName = $this->removeEmoji($nickName);
		$sex = (int)$wxUserInfoJson->sex;
		$country = trim($wxUserInfoJson->country);
		$province = trim($wxUserInfoJson->province);
		$city = trim($wxUserInfoJson->city);
		$profileImg = trim($wxUserInfoJson->headimgurl);
		$userId = 0;
		$database = requireModule('Database');
		if ($database->execute('start transaction')) {
			$column = 'userId,userRight,tag,nickName,realName,sex,country,province,city,phone,openId,openOpenId,openOpenIdJc,unionId,subscribe,address,profileImg,personalImg,identityImg,businessImg,remark,spreaderUserId,spreaderNickName,spreaderRealName,forbid,source,channel,createTime,lastTime';
			$sql = 'select '.$column.' from t_user where unionId="'.$database->escape($unionId).'" limit 1';
			$result = $database->execute($sql);
			if (!$result) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);;
			}
			$userInfo = $database->get($result);
			$database->free($result);
			//拼凑用户参数
			$userField = array();
			if ($this->common->isApp()) {
				if ($branch == 0) {
					$userField[] = 'openOpenId="' . $database->escape($openId) . '"';
				} else if ($branch == 1 || $branch == 2 || $branch == 3) {
					$userField[] = 'openOpenIdJc="' . $database->escape($openId) . '"';
				}
			} else {
				$userField[] = 'openId="' . $database->escape($openId) . '"';
			}
			$userField[] = 'unionId="' . $database->escape($unionId) . '"';
			$userField[] = 'nickName="' . $database->escape($nickName) . '"';
			$userField[] = 'sex="' . $database->escape($sex) . '"';
			$userField[] = 'country="' . $database->escape($country) . '"';
			$userField[] = 'province="' . $database->escape($province) . '"';
			$userField[] = 'city="' . $database->escape($city) . '"';
			$userField[] = 'profileImg="' . $database->escape($profileImg) . '"';
			if (empty($userInfo)) {

			    //临时封掉注册
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);

				$userField[] = 'source="' . $database->escape($source) . '"';
				$userField[] = 'channel="' . $database->escape($channel) . '"';
				$userField[] = 'createTime=now()';
				$insertUserSql = 'insert into t_user set ' . implode(',', $userField);
				$insertUserResult = $database->execute($insertUserSql);
				$userId = (int)$database->getInsertId();
				if (!$insertUserResult || $userId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
			} else {
				$userId = (int)$userInfo['userId'];
                $forbid = (int)$userInfo['forbid'];
				if ($userId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
				if ($forbid == 1) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "该用户已被封号";
                    $this->jsonView->out($this->resp);
                }
				$userField[] = 'userId="' . $database->escape($userId) . '"';
				$updateUserSql = 'update t_user set '.implode(',', $userField).' where userId="'.$userId.'" limit 1';
				$updateUserResult = $database->execute($updateUserSql);
				if (!$updateUserResult) {//不要判断更新影响行数，也许用户信息没变化
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
			}
			//添加资金账户
			$param = array();
			$param['userId'] = $userId;
			$param['nickName'] = $nickName;
			$toggleFinanceResp = $this->toggleFinance($database, $param);
			if ($toggleFinanceResp->errCode != 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
		} else {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
        $auth = $this->common->setUserAuth('portal', array(
            'userId' => $userId,
            'unionId' => $unionId
        ));
		if (!empty($url)) {
			header("Location: ".$url);
		} else {
			$data = array();
			$data['uoAuth'] = urlencode($auth['uoAuth']);
			$data['uoSign'] = urlencode($auth['uoSign']);
			$this->resp->data = $data;
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		}
	}

	//不存就插入, 存在就更新
	public function mobileToggleUser() {
		$mobile = trim($this->common->getParam("mobile", ''));
		$code = trim($this->common->getParam("code", ''));
		$url = trim($this->common->getParam("url", ''));
		$source = (int)$this->common->getParam("source", 0);
		$channel = (int)$this->common->getParam("channel", 0);
		if (!$this->common->verifyMobile($mobile)) {
			$this->resp->msg = "手机号码有误";
			$this->jsonView->out($this->resp);
		}
		if ($mobile == '13800000000') {
			$code = '123456';
			$param = array();
			$param['mobile'] = $mobile;
			$param['code'] = $code;
			$replaceSmsCodeResp = $this->smsService->replaceSmsCode($param);
			if ($replaceSmsCodeResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
		} else {
			if (!preg_match("/^\d{6}$/", $code)) {
				$this->resp->msg = "验证码参数有误";
				$this->jsonView->out($this->resp);
			}
		}
		$param = array();
		$param['mobile'] = $mobile;
		$selectSmsCodeResp = $this->smsService->selectSmsCode($param);
		if ($selectSmsCodeResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$list = $selectSmsCodeResp->data['list'];
		if (!is_array($list) || count($list) <= 0) {
			$this->resp->msg = "验证码错误";
			$this->jsonView->out($this->resp);
		}
		$smsCodeData = $list[0];
		$sCode = trim($smsCodeData['code']);
		$sTime = strtotime(trim($smsCodeData['time']));
		$sOverTime = time() - $sTime;
		if ($sCode != $code) {
			$this->resp->msg = "验证码错误";
			$this->jsonView->out($this->resp);
		}
		if ($sOverTime > 10*60) {
			$this->resp->msg = "验证码已过期,请重新获取";
			$this->jsonView->out($this->resp);
		}
		$userId = 0;
		$database = requireModule('Database');
		if ($database->execute('start transaction')) {
			$column = 'userId,userRight,tag,nickName,realName,sex,country,province,city,phone,openId,openOpenId,openOpenIdJc,unionId,subscribe,address,profileImg,personalImg,identityImg,businessImg,remark,spreaderUserId,spreaderNickName,spreaderRealName,forbid,source,channel,createTime,lastTime';
			$sql = 'select '.$column.' from t_user where phone="'.$database->escape($mobile).'" limit 1';
			$result = $database->execute($sql);
			if (!$result) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);;
			}
			$userInfo = $database->get($result);
			$database->free($result);
			if (empty($userInfo)) {

                //临时封掉注册
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);

				$unionId = 'mobile_'.md5($mobile);
				$nickName = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', $mobile);
				$userField[] = 'phone="' . $database->escape($mobile) . '"';
				$userField[] = 'unionId="' . $database->escape($unionId) . '"';
				$userField[] = 'nickName="' . $database->escape($nickName) . '"';
				$userField[] = 'source="' . $database->escape($source) . '"';
				$userField[] = 'channel="' . $database->escape($channel) . '"';
				$userField[] = 'createTime=now()';
				$insertUserSql = 'insert into t_user set ' . implode(',', $userField);
				$insertUserResult = $database->execute($insertUserSql);
				$userId = (int)$database->getInsertId();
				if (!$insertUserResult || $userId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
			} else {
				$userId = (int)$userInfo['userId'];
                $nickName = trim($userInfo['nickName']);
                $forbid = (int)$userInfo['forbid'];
				if ($userId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "访问异常";
					$this->jsonView->out($this->resp);
				}
                if ($forbid == 1) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "该用户已被封号";
                    $this->jsonView->out($this->resp);
                }
			}
			//添加资金账户
			$param = array();
			$param['userId'] = $userId;
			$param['nickName'] = $nickName;
			$toggleFinanceResp = $this->toggleFinance($database, $param);
			if ($toggleFinanceResp->errCode != 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
		} else {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		//把时间设置成1小时前，目的是为了"成功使用后，下次立马能使用"
		$param = array();
		$param['mobile'] = $mobile;
		$param['code'] = '';
		$param['time'] = date("Y-m-d H:i:s", time() - 3600);
		$this->smsService->replaceSmsCode($param);
        $auth = $this->common->setUserAuth('portal', array(
            'userId' => $userId,
            'unionId' => $mobile
        ));
		if (!empty($url)) {
			header("Location: ".$url);
		} else {
			$data = array();
			$data['uoAuth'] = urlencode($auth['uoAuth']);
			$data['uoSign'] = urlencode($auth['uoSign']);
			$this->resp->data = $data;
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		}
	}

	private function removeEmoji($text) {
		// Match Emoticons
		$regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
		$text = preg_replace($regexEmoticons, '', $text);
		// Match Miscellaneous Symbols and Pictographs
		$regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
		$text = preg_replace($regexSymbols, '', $text);
		// Match Transport And Map Symbols
		$regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
		$text = preg_replace($regexTransport, '', $text);
		// Match Miscellaneous Symbols
		$regexMisc = '/[\x{2600}-\x{26FF}]/u';
		$text = preg_replace($regexMisc, '', $text);
		// Match Dingbats
		$regexDingbats = '/[\x{2700}-\x{27BF}]/u';
		$text = preg_replace($regexDingbats, '', $text);
		return $text;
	}

	private function toggleFinance($database, $param) {
		$resp = requireModule('Resp');
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		if (empty($database)) {
			$resp->msg = 'database参数异常';
			return $resp;
		}
		if ($userId <= 0) {
			$resp->msg = 'userId参数异常';
			return $resp;
		}
		if (empty($nickName)) {
			$resp->msg = 'nickName参数异常';
			return $resp;
		}
		$column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
		//方案
		$field = 'userId="'.$database->escape($userId).'" and financeType=0';
		$sql = 'select '.$column.' from t_finance where discard=0 and '.$field.' limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$resp->msg = '查询失败';
			return $resp;
		}
		$planFinance = $database->get($result);
		$database->free($result);
		if (empty($planFinance)) {
			$financeField = array();
			$financeField[] = 'financeType=0';
			$financeField[] = 'userId="' . $database->escape($userId) . '"';
			$financeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$financeField[] = 'createTime=now()';
			$insertFinanceSql = 'insert into t_finance set ' . implode(',', $financeField);
			$insertFinanceResult = $database->execute($insertFinanceSql);
			$financeId = (int)$database->getInsertId();
			if (!$insertFinanceResult || $financeId <= 0) {
				$resp->msg = '查询失败';
				return $resp;
			}
		}
		//彩金
		$field = 'userId="'.$database->escape($userId).'" and financeType=1';
		$sql = 'select '.$column.' from t_finance where discard=0 and '.$field.' limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$resp->msg = '查询失败';
			return $resp;
		}
		$ticketFinance = $database->get($result);
		$database->free($result);
		if (empty($ticketFinance)) {
			$financeField = array();
			$financeField[] = 'financeType=1';
			$financeField[] = 'userId="' . $database->escape($userId) . '"';
			$financeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$financeField[] = 'createTime=now()';
			$insertFinanceSql = 'insert into t_finance set ' . implode(',', $financeField);
			$insertFinanceResult = $database->execute($insertFinanceSql);
			$financeId = (int)$database->getInsertId();
			if (!$insertFinanceResult || $financeId <= 0) {
				$resp->msg = '查询失败';
				return $resp;
			}
		}
		//资金明细表额外表
		//方案
		$field = 'userId="'.$database->escape($userId).'" and financeType=0';
		$sql = 'select '.$column.' from t_finance_extra where discard=0 and '.$field.' limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$resp->msg = '查询失败';
			return $resp;
		}
		$planFinance = $database->get($result);
		$database->free($result);
		if (empty($planFinance)) {
			$financeField = array();
			$financeField[] = 'financeType=0';
			$financeField[] = 'userId="' . $database->escape($userId) . '"';
			$financeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$financeField[] = 'createTime=now()';
			$insertFinanceSql = 'insert into t_finance_extra set ' . implode(',', $financeField);
			$insertFinanceResult = $database->execute($insertFinanceSql);
			$financeId = (int)$database->getInsertId();
			if (!$insertFinanceResult || $financeId <= 0) {
				$resp->msg = '查询失败';
				return $resp;
			}
		}
		//彩金
		$field = 'userId="'.$database->escape($userId).'" and financeType=1';
		$sql = 'select '.$column.' from t_finance_extra where discard=0 and '.$field.' limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$resp->msg = '查询失败';
			return $resp;
		}
		$ticketFinance = $database->get($result);
		$database->free($result);
		if (empty($ticketFinance)) {
			$financeField = array();
			$financeField[] = 'financeType=1';
			$financeField[] = 'userId="' . $database->escape($userId) . '"';
			$financeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$financeField[] = 'createTime=now()';
			$insertFinanceSql = 'insert into t_finance_extra set ' . implode(',', $financeField);
			$insertFinanceResult = $database->execute($insertFinanceSql);
			$financeId = (int)$database->getInsertId();
			if (!$insertFinanceResult || $financeId <= 0) {
				$resp->msg = '查询失败';
				return $resp;
			}
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//得到用户信息
	public function userInfo() {
		$userNo = trim($this->common->getParam("userNo", ''));
		$userId = 0;
		if (!empty($userNo)) {
			$userNoArr = $this->common->decodeNo($userNo);
			$userId = (int)$userNoArr['userId'];
		}
		$user = null;
		if ($userId <= 0 || $userId == (int)$this->loginUserInfo['userId']) {
			$user = $this->loginUserInfo;
		}
		if (empty($user)) {
			$selectUserByIdResp = $this->userService->selectUserByIdCache($userId);
			if ($selectUserByIdResp->errCode == 0) {
				$user = $selectUserByIdResp->data;
			}
		}
		if (empty($user)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$user['userId'];
		$userRight = (int)$user['userRight'];
		$focusStatus = 0;
		$user = $this->commonService->setUserWinStatusCache(array($user))[0];
		$user = $this->commonService->setUserPlanRateCache(array($user))[0];
		$loginUserId = (int)$this->loginUserInfo['userId'];
		if ($loginUserId > 0 && $loginUserId != $userId) {
			//--查看关注状态
			$param = array();
			$param['userId'] = $loginUserId;
			$param['focusUserId'] = $userId;
			$selectFocusResp = $this->focusService->selectFocusCache($param);
			$focusData = $selectFocusResp->data['list'][0];
			if ($focusData) {
				$focusStatus = (int)$focusData['status'];
			}else{
				$focusStatus =  1;
			}
		}
		$showWinCount = $this->common->isShowWinCount();
        //用户是否是渠道商
		$param = array();
		$param['discard'] = 0;
		$param['userId'] = $userId;
		$selectChannelResp = $this->channelService->selectChannel($param);
		if ($selectChannelResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$channelList = $selectChannelResp->data['list'];
		$channelData = null;
		if (is_array($channelList) && count($channelList) > 0) {
			$channelData = $channelList[0];
		}
        $isChannel = !empty($channelData);
		$userInfo = array();
		$userInfo['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
		$userInfo['tag'] = $user['tag'];
		$userInfo['nickName'] = $user['nickName'];
		$userInfo['realName'] = $user['realName'];
		$userInfo['profileImg'] = $user['profileImg'];
		$userInfo['personalImg'] = $user['personalImg'];
		$userInfo['remark'] = !empty($user['remark']) ? $user['remark'] : '';
		$userInfo['createTime'] = $user['createTime'];
        $userInfo['userRight'] = $this->common->getUserRight($userRight);
		/*if ((int)$this->loginUserInfo['userId'] == $userId) {
			$userInfo['userRight'] = $this->loginUserRight;
		}*/
		$userInfo['continueWin'] = (int)$user['continueWin'];
		if ($showWinCount) {
			$userInfo['winCount'] = (int)$user['winCount'];
			$userInfo['winRate'] = (float)$user['winRate'];//胜率
			$userInfo['profitRate'] = (float)$user['profitRate'];//盈利率
		} else {
			$userInfo['winRate'] = (int)$user['winCount'];
		}
		$userInfo['focusStatus'] = $focusStatus;
		$userInfo['isABT'] = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
		$userInfo['isChannel'] = $isChannel;
        $this->resp->data = $userInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function userFinanceInfo() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$financeType = (int)$this->common->getParam("financeType", 0);
		//更新资金明细
		$this->commonService->setUserFinance($userId);
		//查询用户资金
		$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金有误";
			$this->jsonView->out($this->resp);
		}
		$financeData = $selectFinanceByUserIdResp->data;
		$chargeAmount = (int)$financeData['chargeAmount'];
		$incomeAmount = (int)$financeData['incomeAmount'];
		$financeInfo = array();
		$financeInfo['chargeAmount'] = $chargeAmount;
		$financeInfo['incomeAmount'] = $incomeAmount;

		//临时处理充值也可以提款
		if ($financeType == 1) {
            $financeInfo['chargeAmount'] = 0;
            $financeInfo['incomeAmount'] = $incomeAmount + $chargeAmount;
        }

		$this->resp->data = $financeInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function userList() {
		$mock = (bool)$this->common->getParam("mock", false);
		$groupNo = trim($this->common->getParam("groupNo"), "");
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 200) {
			$pageSize = 200;
		}
		global $curEnv;
		if ($mock && $curEnv == 'beta') {
			$groupNo = '5F5E10A-BC6159';
		}
		if (empty($groupNo)) {
			$this->resp->msg = "groupNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectGroupByNoResp = $this->groupService->selectGroupByNoCache($groupNo);
		if ($selectGroupByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByNoResp->data;
		if (empty($groupData)) {
			$this->resp->msg = "用户组不存在";
			$this->jsonView->out($this->resp);
		}
		$userIdArr = $this->common->filterIdArray(explode(',', trim($groupData['relateId'])));
		$data = array("totalCount" => 0, 'list' => array());
		$userLength = count($userIdArr);
		if (!empty($userIdArr) && $userLength > 0) {
			$data['totalCount'] = $userLength;
			$begin = ($pageNum - 1) * $pageSize;
			$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
			$newUserIdArr = array();
			for ($i = $begin; $i < $end; $i++) {
				$newUserIdArr[] = (int)$userIdArr[$i];
			}
			$param = array();
			$param['userId'] = $newUserIdArr;
			$param['pageNum'] = 1;
			$param['pageSize'] = count($newUserIdArr);
			$selectUserResp = $this->userService->selectUserCache($param);
			$userMap = array();
			if ($selectUserResp->errCode == 0) {
				$userList = $selectUserResp->data['list'];
				if (!empty($userList)) {
					$userList = $this->commonService->setUserRedDotCache($this->loginUserInfo['userId'], $userList);
					$userList = $this->commonService->setUserWinStatusCache($userList);
					$userList = $this->commonService->setUserPlanRateCache($userList);
					foreach ($userList as $user) {
						$userId = (int)$user['userId'];
						if ($userId <= 0) {
							continue;
						}
						$userMap[$userId] = $user;
					}
				}
			}
			$showWinCount = $this->common->isShowWinCount();
            foreach ($newUserIdArr as $userId) {
				$user = $userMap[$userId];
				if (!empty($user)) {
					$userInfo = array();
					$userInfo['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
					$userInfo['tag'] = trim($user['tag']);
					$userInfo['nickName'] = trim($user['nickName']);
					$userInfo['realName'] = trim($user['realName']);
					$userInfo['profileImg'] = trim($user['profileImg']);
					$userInfo['personalImg'] = trim($user['personalImg']);
					$userInfo['continueWin'] = (int)$user['continueWin'];
					if ($showWinCount) {
						$userInfo['winCount'] = (int)$user['winCount'];
						$userInfo['winRate'] = (float)$user['winRate'];//胜率
						$userInfo['profitRate'] = (float)$user['profitRate'];//盈利率
					} else {
						$userInfo['winRate'] = (int)$user['winCount'];
					}
					$userInfo['redDot'] = (bool)$user['redDot'];
                    $userRight = (int)$user['userRight'];
                    $userInfo['userRight'] = $this->common->getUserRight($userRight);
					$data['list'][] = $userInfo;
				}
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function userRankList() {
		$planType = (int)$this->common->getParam("planType", 1);//类型, 1=竞技彩方案, 2=数字彩方案
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$userMaxCreateTimeMap = array();//记录连红用户，最大的方案创建时间
		$continueWinEndMap = array();
		$continueWinMap = array();
		$param = array();
		$param['planType'] = $planType;
		$param['planStatus'] = 2;//方案状态：1=未结束, 2=已结束
		$param['prizeStatus'] = array(1,2);
		$param['publish'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 10000;
		$selectPlanResp = $this->planService->selectPlanCache($param);
		//3877=许洪程
		$blackArr = array(3877);//恶意刷红人榜的黑名单
		if ($selectPlanResp->errCode == 0) {
			$planList = $selectPlanResp->data['list'];
			if (is_array($planList) && count($planList) > 0) {
				foreach ($planList as $plan) {
					$userId = (int)$plan['userId'];
					if (in_array($userId, $blackArr)) {
						continue;
					}
					$prizeStatus = (int)$plan['prizeStatus'];
					$createTime = trim($plan['createTime']);
					if ($continueWinEndMap[$userId]) {
						continue;
					}
					if (!key_exists($userId, $continueWinMap)) {
						$continueWinMap[$userId] = 0;
					}
					//中奖状态, 0=未开奖, 1=已中奖, 1=未中奖
					if ($prizeStatus == 1) {
						$continueWinMap[$userId] += 1;
						if ($userMaxCreateTimeMap[$userId] < $createTime) {
							$userMaxCreateTimeMap[$userId] = $createTime;
						}
					} else {
						$continueWinEndMap[$userId] = true;
					}
				}
			}
		}
		//值按大到小排序
		arsort($continueWinMap);
		$userIdArr = array();
		foreach ($continueWinMap as $userId => $num) {
			$userId = (int)$userId;
			$createTime = (int)strtotime(trim($userMaxCreateTimeMap[$userId]));
			if ($userId > 0 && $num >= 2 && ($createTime >= time()-7*24*3600)) {
				$userIdArr[] = $userId;
			}
		}
		$data = array("totalCount" => 0, 'list' => array());
		$userList = array();
		$userLength = count($userIdArr);
		if (count($userIdArr) > 0) {
			$data['totalCount'] = $userLength;
			$begin = ($pageNum - 1) * $pageSize;
			$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
			$newUserIdArr = array();
			for ($i = $begin; $i < $end; $i++) {
				$newUserIdArr[] = (int)$userIdArr[$i];
			}
			if (count($newUserIdArr) > 0) {
				$param = array();
				$param['userId'] = $newUserIdArr;
				$param['pageNum'] = 1;
				$param['pageSize'] = count($newUserIdArr);
				$param['needCount'] = true;
				$selectUserResp = $this->userService->selectUserCache($param);
				if ($selectUserResp->errCode == 0) {
					$userList = $selectUserResp->data['list'];
					$userList = $this->commonService->setUserPlanCountCache($userList);
					$userList = $this->commonService->setUserRedDotCache($this->loginUserInfo['userId'], $userList);
				}
			}
		}
		$userMap = array();
		for ($i = 0, $length = count($userList); $i < $length; $i++) {
			$userId = (int)$userList[$i]['userId'];
			if ($userId > 0) {
				$userMap[$userId] = $userList[$i];
			}
		}
		foreach ($userIdArr as $userId) {
			$user = $userMap[$userId];
			$userId = (int)$user['userId'];
			if (!empty($user) && $userId > 0) {
				$userInfo = array();
				$userInfo['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
				$userInfo['tag'] = trim($user['tag']);
				$userInfo['nickName'] = trim($user['nickName']);
				$userInfo['realName'] = trim($user['realName']);
				$userInfo['profileImg'] = trim($user['profileImg']);
				$userInfo['personalImg'] = trim($user['personalImg']);
				$userInfo['salePlanCount'] = (int)$user['planCount'];
				$userInfo['continueWin'] = (int)$continueWinMap[$userId];
				$userInfo['redDot'] = (bool)$user['redDot'];
                $userRight = (int)$user['userRight'];
                $userInfo['userRight'] = $this->common->getUserRight($userRight);
				$data['list'][] = $userInfo;
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//胜率榜单
	public function winRateRankList(){
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
        $userPlanRate = $this->commonService->getUserPlanRateCache();
        $userIdArr = array();
		$winRateArr = array();
		foreach ($userPlanRate as $userId => $info) {
			$userId = (int)$userId;
			$winRate = (float)$info['winRate'];
			if ($userId <= 0 || $winRate < 55) {
				continue;
			}
			$userIdArr[] = $userId;
			$winRateArr[] = $winRate;
		}
		$data = array("totalCount" => 0, 'list' => array());
		$userList = array();
		$userLength = count($userIdArr);
		if (count($userIdArr) > 0) {
			array_multisort($winRateArr, SORT_DESC, $userIdArr);
			$data['totalCount'] = $userLength;
			$begin = ($pageNum - 1) * $pageSize;
			$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
			$newUserIdArr = array();
			for ($i = $begin; $i < $end; $i++) {
				$newUserIdArr[] = (int)$userIdArr[$i];
			}
			if (count($newUserIdArr) > 0) {
				$param = array();
				$param['userId'] = $newUserIdArr;
				$param['pageNum'] = 1;
				$param['pageSize'] = count($newUserIdArr);
				$param['needCount'] = true;
				$selectUserResp = $this->userService->selectUserCache($param);
				if ($selectUserResp->errCode == 0) {
					$userList = $selectUserResp->data['list'];
					$userList = $this->commonService->setUserRedDotCache($this->loginUserInfo['userId'], $userList);
				}
			}
		}
		$userMap = array();
		for ($i = 0, $length = count($userList); $i < $length; $i++) {
			$userId = (int)$userList[$i]['userId'];
			if ($userId > 0) {
				$userMap[$userId] = $userList[$i];
			}
		}
		foreach ($userIdArr as $userId) {
			$user = $userMap[$userId];
			$userId = (int)$user['userId'];
			if (!empty($user) && $userId > 0) {
				$userInfo = array();
				$userInfo['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
				$userInfo['tag'] = trim($user['tag']);
				$userInfo['nickName'] = trim($user['nickName']);
				$userInfo['realName'] = trim($user['realName']);
				$userInfo['profileImg'] = trim($user['profileImg']);
				$userInfo['personalImg'] = trim($user['personalImg']);
				$userInfo['winRate'] = (float)$userPlanRate[$userId]['winRate'];
				$userInfo['salePlanCount'] = (int)$userPlanRate[$userId]['salePlanCount'];
				$userInfo['resultPlanCount'] = (int)$userPlanRate[$userId]['resultPlanCount'];
				$userInfo['redDot'] = (bool)$user['redDot'];
                $userRight = (int)$user['userRight'];
                $userInfo['userRight'] = $this->common->getUserRight($userRight);
				$data['list'][] = $userInfo;
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//7日盈利榜单
	public function profitRateRankList() {
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$userPlanRate = $this->commonService->getUserPlanRateCache();
		$userIdArr = array();
		$profitRateArr = array();
		foreach ($userPlanRate as $userId => $info) {
			$userId = (int)$userId;
			$profitRate = (float)$info['profitRate'];
			if ($userId <= 0 || $profitRate < 8) {
				continue;
			}
			$userIdArr[] = $userId;
			$profitRateArr[] = $profitRate;
		}
        $data = array("totalCount" => 0, 'list' => array());
		$userList = array();
		$userLength = count($userIdArr);
		if (count($userIdArr) > 0) {
			array_multisort($profitRateArr, SORT_DESC, $userIdArr);
			$data['totalCount'] = $userLength;
			$begin = ($pageNum - 1) * $pageSize;
			$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
			$newUserIdArr = array();
			for ($i = $begin; $i < $end; $i++) {
				$newUserIdArr[] = (int)$userIdArr[$i];
			}
			if (count($newUserIdArr) > 0) {
				$param = array();
				$param['userId'] = $newUserIdArr;
				$param['pageNum'] = 1;
				$param['pageSize'] = count($newUserIdArr);
				$param['needCount'] = true;
				$selectUserResp = $this->userService->selectUserCache($param);
				if ($selectUserResp->errCode == 0) {
					$userList = $selectUserResp->data['list'];
					$userList = $this->commonService->setUserRedDotCache($this->loginUserInfo['userId'], $userList);
				}
			}
		}
		$userMap = array();
		for ($i = 0, $length = count($userList); $i < $length; $i++) {
			$userId = (int)$userList[$i]['userId'];
			if ($userId > 0) {
				$userMap[$userId] = $userList[$i];
			}
		}
		foreach ($userIdArr as $userId) {
			$user = $userMap[$userId];
			$userId = (int)$user['userId'];
			if (!empty($user) && $userId > 0) {
				$userInfo = array();
				$userInfo['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
				$userInfo['tag'] = trim($user['tag']);
				$userInfo['nickName'] = trim($user['nickName']);
				$userInfo['realName'] = trim($user['realName']);
				$userInfo['profileImg'] = trim($user['profileImg']);
				$userInfo['personalImg'] = trim($user['personalImg']);
				$userInfo['profitRate'] = (float)$userPlanRate[$userId]['profitRate'];
				$userInfo['salePlanCount'] = (int)$userPlanRate[$userId]['salePlanCount'];
				$userInfo['resultPlanCount'] = (int)$userPlanRate[$userId]['resultPlanCount'];
				$userInfo['redDot'] = (bool)$user['redDot'];
                $userRight = (int)$user['userRight'];
                $userInfo['userRight'] = $this->common->getUserRight($userRight);
				$data['list'][] = $userInfo;
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到分组列表
	public function groupList() {
		$mock = (bool)$this->common->getParam("mock", false);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$param = array();
		$param['type'] = 1;
		$param['publish'] = 1;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectGroupResp = $this->groupService->selectGroupCache($param);
		if ($selectGroupResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupListData = $selectGroupResp->data;
		$totalCount = (int)$groupListData['totalCount'];
		$groupList = $groupListData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($groupList); $i < $length; $i++) {
			$groupId = (int)$groupList[$i]['groupId'];
			$name = trim($groupList[$i]['name']);
			if ($groupId <= 0) {
				continue;
			}
			$groupInfo = array();
			$groupInfo['groupNo'] = $this->common->encodeNo($groupId+12345678, $groupId);
			$groupInfo['name'] = trim($name);
			$data['list'][] = $groupInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function withdraw() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$financeType = (int)$this->common->getParam("financeType", 0);
		$amount = (int)$this->common->getParam("amount", 0);
		$accountType = (int)$this->common->getParam("accountType", 0);
		$accountNumber = trim($this->common->getParam("accountNumber", ''));
		$accountName = trim($this->common->getParam("accountName", ''));
		$accountUserName = trim($this->common->getParam("accountUserName", ''));
		$accountInfo = trim($this->common->getParam("accountInfo", ''));
		$userId = $this->loginUserInfo['userId'];
		$nickName = $this->loginUserInfo['nickName'];
		$realName = $this->loginUserInfo['realName'];
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		if ($financeType == 0 && !$this->loginUserRight['1'] && !$this->loginUserRight['2']) {
			$this->resp->msg = "当前用户不能提款";
			$this->jsonView->out($this->resp);
		}
		if ($amount <= 0) {
			$this->resp->msg = "amount有误";
			$this->jsonView->out($this->resp);
		}
		if ($financeType == 0 && $amount < 10000) {
			$this->resp->msg = "amount不能小于10000";
			$this->jsonView->out($this->resp);
		}
		if ($financeType == 0 && $amount > 1000000) {
			$this->resp->msg = "amount不能大于1000000";
			$this->jsonView->out($this->resp);
		}
		/*if ($financeType == 1 && $amount < 2000) {
			$this->resp->msg = "彩金提款，最低20元";
			$this->jsonView->out($this->resp);
		}*/
		if ($accountType <= 0) {
			$accountType = 2;
		}
		if (empty($accountNumber)) {
			$this->resp->msg = "accountNumber有误";
			$this->jsonView->out($this->resp);
		}
		//强制更新资金明显
        //--变更后需要删除
		$setUserFinanceResp = $this->commonService->setUserFinance($userId);
		if ($setUserFinanceResp->errCode != 0) {
			$this->resp->msg = "查询资金有误";
			$this->jsonView->out($this->resp);
		}
		//查询用户资金
		$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金有误";
			$this->jsonView->out($this->resp);
		}
		$finance = $selectFinanceByUserIdResp->data;
		$financeId = (int)$finance['financeId'];
		$chargeAmount = (int)$finance['chargeAmount'];
		$incomeAmount = (int)$finance['incomeAmount'];
		$dataVersion = (int)$finance['dataVersion'];
		//资金明细表额外表
		$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
		if ($selectFinanceExtraByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金有误";
			$this->jsonView->out($this->resp);
		}
		$financeExtra = $selectFinanceExtraByUserIdResp->data;
		$financeIdExtra = (int)$financeExtra['financeId'];
		$chargeAmountExtra = (int)$financeExtra['chargeAmount'];
		$incomeAmountExtra = (int)$financeExtra['incomeAmount'];
		$dataVersionExtra = (int)$financeExtra['dataVersion'];
		if ($chargeAmount != $chargeAmountExtra || $incomeAmount != $incomeAmountExtra) {
			$this->resp->msg = "用户资金异常";
			$this->jsonView->out($this->resp);
		}
		if ($financeType == 0) {
            if ($incomeAmount <= 0) {
                $this->resp->msg = "您还没有收益";
                $this->jsonView->out($this->resp);
            }
            if ($incomeAmount < $amount) {
                $this->resp->msg = "提款金额不能大于当前收益";
                $this->jsonView->out($this->resp);
            }
        } else if ($financeType == 1) {
            if (($chargeAmount+$incomeAmount) < $amount) {
                $this->resp->msg = "提款金额不能大于当前余额";
                $this->jsonView->out($this->resp);
            }
        }
		if (($chargeAmount+$incomeAmount) < $amount) {
			$this->resp->msg = "用户资金异常";
			$this->jsonView->out($this->resp);
		}
		/*if ($financeType == 1) {
            //提款：每天一个账号一笔最高只有提5万，一天最多只能提3次。（一天一个账号最高提款额度为15万）;
            if ($amount > 5000000) {
                $this->resp->msg = '单笔提款不能大于5万';
                $this->jsonView->out($this->resp);
            }
            $date = date('Y-m-d');
            $param = array();
            $param['userId'] = $userId;
            $param['financeType'] = $financeType;
            $param['status'] = array(1,2,3,5);//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
            $param['beginTime'] = $date;
            $param['endTime'] = $date;
            $selectFinanceWithdrawResp = $this->financeService->selectFinanceWithdraw($param);
            if ($selectFinanceWithdrawResp->errCode != 0) {
                $this->resp->msg = "查询异常";
                $this->jsonView->out($this->resp);
            }
            $withdrawData = $selectFinanceWithdrawResp->data;
            $withdrawList = $withdrawData['list'];
            $totalCount = 0;
            $totalAmount = 0;
            for ($i = 0, $length = count($withdrawList); $i < $length; $i++) {
                $withdrawAmount = (int)$withdrawList[$i]['amount'];
                if ($withdrawAmount <= 0) {
                    continue;
                }
                $totalCount++;
                $totalAmount += $withdrawAmount;
            }
            if ($totalCount >= 3) {
                $this->resp->msg = '当天最多提款3次)';
                $this->jsonView->out($this->resp);
            }
            $offsetAmount = 15000000 - $totalAmount;
            if ($offsetAmount <= 0 || $amount > $offsetAmount) {
                if ($offsetAmount < 0) {
                    $offsetAmount = 0;
                }
                $offsetAmount = (int)($offsetAmount/100);
                $this->resp->msg = '当天提款总额最高15万,当天剩余可提'.$offsetAmount.'元';
                $this->jsonView->out($this->resp);
            }
        }*/
		$status = 1;//1=未审核, 2=已审核, 3=已打款, 4=已拒绝
		//资金类型, 0=方案, 1=出票
		//帐号类型, 1=微信, 2=支付宝, 3=银行卡
		//只有"出票类型" 且 "支付宝方式" 且 "填写了支付宝帐号和姓名"，才会自动已审核
        if ($financeType == 1 && $accountType == 2 && !empty($accountNumber) && !empty($accountName)) {
			$status = 2;
		}
        //额外账户的版本号不一样
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
            //--变更后需要删除
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
			}
			//插入提款
			$insertFinanceWithdrawField = array();
			$insertFinanceWithdrawField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceWithdrawField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceWithdrawField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceWithdrawField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceWithdrawField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceWithdrawField[] = 'status="' . $database->escape($status) . '"';
			$insertFinanceWithdrawField[] = 'accountType="' . $database->escape($accountType) . '"';
			$insertFinanceWithdrawField[] = 'accountNumber="' . $database->escape($accountNumber) . '"';
			$insertFinanceWithdrawField[] = 'accountName="' . $database->escape($accountName) . '"';
			$insertFinanceWithdrawField[] = 'accountUserName="' . $database->escape($accountUserName) . '"';
			$insertFinanceWithdrawField[] = 'accountInfo="' . $database->escape($accountInfo) . '"';
			$insertFinanceWithdrawField[] = 'createTime=now()';
			$insertFinanceWithdrawSql = 'insert into t_finance_withdraw set ' . implode(',', $insertFinanceWithdrawField);
			$insertFinanceWithdrawResult = $database->execute($insertFinanceWithdrawSql);
			$insertFinanceWithdrawInsertId = (int)$database->getInsertId();
			if (!$insertFinanceWithdrawResult || $insertFinanceWithdrawInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
			}
			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
			$updateFinanceSqlExtraParam['withdrawingChangeAmount'] = $amount;   //增加提款未审核   未审核+已审核+打款中
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//再次更新资金明细
			$this->commonService->setUserFinance($userId);
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = '提款失败';
			$this->jsonView->out($this->resp);
		}
	}

	public function createUserVerify() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $type = (int)$this->common->getParam("type", 0);
        $realName = trim($this->common->getParam("realName", ''));
        $phone = trim($this->common->getParam("phone", ''));
        $code = trim($this->common->getParam("code", ''));
        $remark = trim($this->common->getParam("remark", ''));
        $address = trim($this->common->getParam("address", ''));
        $identityImg = $this->common->getParam("identityImg", null);
        $businessImg = $this->common->getParam("businessImg", null);
        $isWeixinIdentityImg = $identityImg['tmp_name'] ? false : true;
        $isWeixinBusinessImg = $businessImg['tmp_name'] ? false : true;
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		if ($type != 1 && $type != 2) {
			$this->resp->msg = "type有误";
			$this->jsonView->out($this->resp);
		}
		if ($type == 1 && $this->loginUserRight['1']) {
			$this->resp->msg = "您已经是专家无需再申请";
			$this->jsonView->out($this->resp);
		}
		if ($type == 2 && $this->loginUserRight['1'] && $this->loginUserRight['2']) {
			$this->resp->msg = "您已经是站长无需再申请";
			$this->jsonView->out($this->resp);
		}
		if (empty($realName)) {
			$this->resp->msg = "realName有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($phone) || !$this->common->verifyMobile($phone)) {
			$this->resp->msg = "phone有误";
			$this->jsonView->out($this->resp);
		}
		if (!$this->common->isApp()) {
			/*增加手机验证码*/
			if (!preg_match("/^\d{6}$/", $code)) {
				$this->resp->msg = "验证码参数有误";
				$this->jsonView->out($this->resp);
			}
			$param = array();
			$param['mobile'] = $phone;
			$selectSmsCodeResp = $this->smsService->selectSmsCode($param);
			if ($selectSmsCodeResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$list = $selectSmsCodeResp->data['list'];
			if (!is_array($list) || count($list) <= 0) {
				$this->resp->msg = "验证码错误";
				$this->jsonView->out($this->resp);
			}
			$smsCodeData = $list[0];
			$sCode = trim($smsCodeData['code']);
			$sTime = strtotime(trim($smsCodeData['time']));
			$sOverTime = time() - $sTime;
			if ($sCode != $code) {
				$this->resp->msg = "验证码错误";
				$this->jsonView->out($this->resp);
			}
			if ($sOverTime > 10*60) {
				$this->resp->msg = "验证码已过期,请重新获取";
				$this->jsonView->out($this->resp);
			}
			/*增加手机验证码结束*/
		}
		if ($type == 1) {
			if (empty($remark)) {
				$this->resp->msg = "remark有误";
				$this->jsonView->out($this->resp);
			}
		}
		if ($type == 2) {
			if (empty($address)) {
				$this->resp->msg = "address有误";
				$this->jsonView->out($this->resp);
			}
		}
		if ($isWeixinIdentityImg) {
			if (count($identityImg) <= 0) {
				$this->resp->msg = "identityImg不能为空";
				$this->jsonView->out($this->resp);
			}
		} else {
			if (count($identityImg['tmp_name']) <= 0) {
				$this->resp->msg = "identityImg不能为空";
				$this->jsonView->out($this->resp);
			}
		}
		if ($type == 2) {
			if ($isWeixinBusinessImg) {
				if (count($businessImg) <= 0) {
					$this->resp->msg = "businessImg不能为空";
					$this->jsonView->out($this->resp);
				}
			} else {
				if (count($businessImg['tmp_name']) <= 0) {
					$this->resp->msg = "businessImg不能为空";
					$this->jsonView->out($this->resp);
				}
			}
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$param = array();
		$param['userId'] = $userId;
		$param['type'] = $type;
		$param['status'] = 1;
		$selectUserVerifyResp = $this->userService->selectUserVerify($param);
		if ($selectUserVerifyResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$userVerifyList = $selectUserVerifyResp->data['list'];
		if (!empty($userVerifyList) && count($userVerifyList) > 0) {
			$this->resp->msg = "您已经提交申请,无需重复申请";
			$this->jsonView->out($this->resp);
		}
		//保存身份证正面图片
		$identityImgResourceIdArr = [];
		if ($isWeixinIdentityImg) {
			for ($i = 0, $length = count($identityImg); $i < $length; $i++) {
				$serverId = trim($identityImg[$i]);
				if (empty($serverId)) {
					continue;
				}
				$respWeixin = $this->commonService->saveWeixinFile($serverId);
				if ($respWeixin->errCode == 0) {
					$resourceId = (int)$respWeixin->data;
					if ($resourceId > 0) {
						$identityImgResourceIdArr[] = $resourceId;
					}
				}
			}
		} else {
			//生成方案关联的图片
			$fileCount = count($identityImg['tmp_name']);
			if (is_array($identityImg) && $fileCount > 0) {
				for ($i = 0; $i < $fileCount; $i++) {
					$fileType = trim($identityImg["type"][$i]);
					$name = trim($identityImg['name'][$i]);
					$tmpName = trim($identityImg['tmp_name'][$i]);
					if (empty($name) || empty($tmpName)) {
						continue;
					}
					$error = (int)$identityImg['error'][$i];
					$size = (int)$identityImg['size'][$i];
					$maxSize = 2*1024*1024;//2MB
					if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png"' || $fileType == 'image/x-png"' ||  $fileType == 'image/gif')) {
						$pathInfo = pathinfo($name);
						$fileName = trim($pathInfo['filename']);
						$extension = trim($pathInfo['extension']);
						$respUpload = $this->commonService->saveUploadFile($tmpName, $fileName, $extension);
						if ($respUpload->errCode == 0) {
							$resourceId = (int)$respUpload->data;
							if ($resourceId > 0) {
								$identityImgResourceIdArr[] = $resourceId;
							}
						}
					}
				}
			}
		}
		//保存营业执照图片
		$businessImgResourceIdArr = [];
		if ($isWeixinBusinessImg) {
			for ($i = 0, $length = count($businessImg); $i < $length; $i++) {
				$serverId = trim($businessImg[$i]);
				if (empty($serverId)) {
					continue;
				}
				$respWeixin = $this->commonService->saveWeixinFile($serverId);
				if ($respWeixin->errCode == 0) {
					$resourceId = (int)$respWeixin->data;
					if ($resourceId > 0) {
						$businessImgResourceIdArr[] = $resourceId;
					}
				}
			}
		} else {
			//生成方案关联的图片
			$fileCount = count($businessImg['tmp_name']);
			if (is_array($businessImg) && $fileCount > 0) {
				for ($i = 0; $i < $fileCount; $i++) {
					$fileType = trim($businessImg["type"][$i]);
					$name = trim($businessImg['name'][$i]);
					$tmpName = trim($businessImg['tmp_name'][$i]);
					if (empty($name) || empty($tmpName)) {
						continue;
					}
					$error = (int)$businessImg['error'][$i];
					$size = (int)$businessImg['size'][$i];
					$maxSize = 2*1024*1024;//2MB
					if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png"' || $fileType == 'image/x-png"' ||  $fileType == 'image/gif')) {
						$pathInfo = pathinfo($name);
						$fileName = trim($pathInfo['filename']);
						$extension = trim($pathInfo['extension']);
						$respUpload = $this->commonService->saveUploadFile($tmpName, $fileName, $extension);
						if ($respUpload->errCode == 0) {
							$resourceId = (int)$respUpload->data;
							if ($resourceId > 0) {
								$businessImgResourceIdArr[] = $resourceId;
							}
						}
					}
				}
			}
		}
		$param = array();
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['type'] = $type;
		$param['phone'] = $phone;
		$param['personalImg'] = "";
		$param['identityImg'] = $identityImgResourceIdArr;
		$param['businessImg'] = $businessImgResourceIdArr;
		$param['address'] = $address;
		$param['remark'] = $remark;
		$param['status'] = 1;
		$insertUserVerifyResp = $this->userService->insertUserVerify($param);
		if ($insertUserVerifyResp->errCode != 0) {
			$this->resp->msg = "添加用户审核失败";
			$this->jsonView->out($this->resp);
		}
		$verifyId = (int)$insertUserVerifyResp->data;
		if ($verifyId <= 0) {
			$this->resp->msg = "添加用户审核失败";
			$this->jsonView->out($this->resp);
		}
		if (!$this->common->isApp()) {
			/*重置验证码*/
			$param = array();
			$param['mobile'] = $phone;
			$param['code'] = '';
			$param['time'] = date("Y-m-d H:i:s", time() - 3600);
			$this->smsService->replaceSmsCode($param);
			/**/
		}
		$verifyNo = $this->common->encodeNo($userId, $verifyId);
		$this->resp->data = array('verifyNo' => $verifyNo);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户信息
	public function mockUser() {
		$password = trim($this->common->getParam("password", ''));
		$userNo = trim($this->common->getParam("userNo", ''));
		if (empty($password)) {
			$this->resp->msg = "密码有误";
			$this->jsonView->out($this->resp);
		}
		global $curEnv;
		if ($curEnv == 'dist') {
			if ($password != 'spcy_shaimi') {
				$this->resp->msg = "密码有误";
				$this->jsonView->out($this->resp);
			}
		} else {
			if ($password != 'shaimi8588#') {
				$this->resp->msg = "密码有误";
				$this->jsonView->out($this->resp);
			}
		}
		if (empty($userNo)) {
			$this->resp->msg = "userNo有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByNoResp = $this->userService->selectUserByNo($userNo);
		if ($selectUserByNoResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$user = $selectUserByNoResp->data;
		if (empty($user)) {
			$this->resp->msg = "用户不存在";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$user['userId'];
		$unionId = trim($user['unionId']);
		if (empty($userId) || empty($unionId)) {
			$this->resp->msg = "获取数据异常";
			$this->jsonView->out($this->resp);
		}
        $this->common->setUserAuth('portal', array(
            'userId' => $userId,
            'unionId' => $unionId
        ));
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//用户绑定手机
    public function bindMobile(){
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $forbid = (int)$this->loginUserInfo['forbid'];
        $mobile = trim($this->common->getParam("mobile", ''));
        $code = trim($this->common->getParam("code", ''));
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        if (!$this->common->verifyMobile($mobile)) {
            $this->resp->msg = "手机号码有误";
            $this->jsonView->out($this->resp);
        }
        if (!preg_match("/^\d{6}$/", $code)) {
            $this->resp->msg = "验证码参数有误";
            $this->jsonView->out($this->resp);
        }
        //用户手机验证
        if (!empty(trim($this->loginUserInfo['phone']))) {
            $this->resp->errCode = 3;
            $this->resp->msg = "您已经绑定过手机号";
            $this->jsonView->out($this->resp);
        }
		$param = array();
		$param['phone'] = $mobile;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$userList = $selectUserResp->data['list'];
		if (is_array($userList) && count($userList) > 0) {
			$this->resp->msg = "该手机号已经被使用过";
			$this->jsonView->out($this->resp);
		}
        $param = array();
        $param['userId'] = $userId;
        $selectUserBindMobileResp = $this->userService->selectUserBindMobile($param);
        if ($selectUserBindMobileResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userBindMobileList = $selectUserBindMobileResp->data['list'];
        if (is_array($userBindMobileList) && count($userBindMobileList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "您已经绑定过手机号";
            $this->jsonView->out($this->resp);
        }
        //验证码验证
        $param = array();
        $param['mobile'] = $mobile;
        $selectSmsCodeResp = $this->smsService->selectSmsCode($param);
        if ($selectSmsCodeResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $list = $selectSmsCodeResp->data['list'];
        if (!is_array($list) || count($list) <= 0) {
            $this->resp->msg = "验证码错误";
            $this->jsonView->out($this->resp);
        }
        $smsCodeData = $list[0];
        $sCode = trim($smsCodeData['code']);
        $sTime = strtotime(trim($smsCodeData['time']));
        $sOverTime = time() - $sTime;
        if ($sCode != $code) {
            $this->resp->msg = "验证码错误";
            $this->jsonView->out($this->resp);
        }
        if ($sOverTime > 10*60) {
            $this->resp->msg = "验证码已过期,请重新获取";
            $this->jsonView->out($this->resp);
        }
        $presentAmount = 800;
		$financeType = 0;
        /*查询用户的资金账户体系*/
        $selectFinanceByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceByUserIdResp->errCode != 0) {
            $this->resp->msg = "查询资金异常";
            $this->jsonView->out($this->resp);
        }
        $financeData = $selectFinanceByUserIdResp->data;
        if (empty($financeData)) {
            $this->resp->msg = "资金不存在";
            $this->jsonView->out($this->resp);
        }
        $financeId = (int)$financeData['financeId'];
        $dataVersion = (int)$financeData['dataVersion'];
        if ($financeId <= 0) {
            $this->resp->msg = '资金不存在';
            $this->jsonView->out($this->resp);
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //插入手机绑定表
            $insertUserBindMobileField = array();
            $insertUserBindMobileField[] = 'userId="' . $database->escape($userId) . '"';
            $insertUserBindMobileField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertUserBindMobileField[] = 'realName="' . $database->escape($realName) . '"';
            $insertUserBindMobileField[] = 'mobile="' . $database->escape($mobile) . '"';
            $insertUserBindMobileField[] = 'presentAmount="' . $database->escape($presentAmount) . '"';
            $insertUserBindMobileField[] = 'createTime=now()';
            $insertUserBindMobileSql = 'insert into t_user_bind_mobile set ' . implode(',', $insertUserBindMobileField);
            $insertUserBindMobileResult = $database->execute($insertUserBindMobileSql);
            $insertUserBindMobileInsertId = (int)$database->getInsertId();
            if (!$insertUserBindMobileResult || $insertUserBindMobileInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
            }
            //更新用户电话
            $updateUserSql = 'update t_user set phone="'.$mobile.'" where phone="" and userId="' . $userId . '" limit 1 ';
            $updateUserResult = $database->execute($updateUserSql);
            $updateUserAffectedRows = (int)$database->getAffectedRows();
            if (!$updateUserResult || $updateUserAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
            }
            //充值流水插入
            $insertFinanceChargeRecordField = array();
			$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'remark="绑定手机赠送"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
            }
            //充值插入
            $insertFinanceChargeField = array();
			$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'remark="绑定手机赠送"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
            }
			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeId;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersion;
			$updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentAmount;//平台充值
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = '访问异常';
				$this->jsonView->out($this->resp);
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			//把时间设置成1小时前，目的是为了"成功使用后，下次立马能使用"
			$param = array();
			$param['mobile'] = $mobile;
			$param['code'] = '';
			$param['time'] = date("Y-m-d H:i:s", time() - 3600);
			$this->smsService->replaceSmsCode($param);
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    public function userArticleList() {
        $userNo = trim($this->common->getParam("userNo", ''));
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 50) {
            $pageSize = 50;
        }
        if (!empty($userNo)) {
            $userNoArr = $this->common->decodeNo($userNo);
            $userId = (int)$userNoArr['userId'];
        }
       	if ($userId <= 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
        $param = array();
        $param['userId'] = $userId;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
		$selectUserArticleResp = $this->userService->selectUserArticleCache($param);
        if ($selectUserArticleResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userArticleList = $selectUserArticleResp->data;
        foreach ($userArticleList['list'] as &$userArticle) {
			$userArticle['articleTitle'] = preg_replace('/&[a-zA-Z]*;/', '', $userArticle['articleTitle']);
        }
        $this->resp->data = $userArticleList;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}