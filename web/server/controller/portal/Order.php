<?php
namespace controller\portal;
use controller\Base;

class Order extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $planService;
    private $financeService;
	private $matchService;
	private $orderService;
	private $comboService;
	private $focusService;
	private $ticketService;
	private $lotteryService;
	private $activityService;
	private $couponService;
	private $channelService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->planService = requireService("Plan");
        $this->financeService = requireService("finance");
		$this->matchService = requireService("Match");
		$this->orderService = requireService("Order");
		$this->comboService = requireService("Combo");
		$this->focusService = requireService("Focus");
		$this->ticketService = requireService("Ticket");
		$this->lotteryService = requireService("Lottery");
		$this->activityService = requireService("Activity");
		$this->couponService = requireService("Coupon");
		$this->channelService = requireService("Channel");
	}

	//创建方案订单
	public function createOrder() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
		$spreaderUserNo = trim($this->common->getParam("spreaderUserNo", ''));
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
		if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
		/********************* 检验方案编号是否正确(代码开始) *********************/
		$planNo = trim($this->common->getParam("planNo", ''));
		if (empty($planNo)) {
			$this->resp->msg = "planNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectPlanByNoResp = $this->planService->selectPlanByNo($planNo);
		if ($selectPlanByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planData = $selectPlanByNoResp->data;
		if (empty($planData)) {
			$this->resp->msg = "方案不存在";
			$this->jsonView->out($this->resp);
		}
		/********************* 检验方案编号是否正确(代码结束) *********************/
		$planId = (int)$planData['planId'];
		$planType = (int)$planData['planType'];//1=竞技彩, 2=数字彩
		$planPublish = (int)$planData['publish'];
		$planUserId = (int)$planData['userId'];
		$planNickName = trim($planData['nickName']);
		$planRealName = trim($planData['realName']);
		$planAmount = (int)$planData['amount'];
        $planMatchType = (int)$planData['matchType'];
		$planMatchRecommend = trim($planData['matchRecommend']);
		$planMatchBeginTime = trim($planData['matchBeginTime']);
        $lotteryId = trim($planData['lotteryId']);
        $lotteryName = trim($planData['lotteryName']);
        $issue = trim($planData['issue']);
        $betContent = trim($planData['betContent']);
        $saleTime = trim($planData['saleTime']);    //平台截止销售时间
		if ($planId <= 0 || $planUserId <= 0 || $planAmount <= 0) {
			$this->resp->msg = "方案信息有误";
			$this->jsonView->out($this->resp);
		}
		if ($planType != 1 && $planType != 2) {
			$this->resp->msg = "参数有误";
			$this->jsonView->out($this->resp);
		}
        if ($planType == 1 && (empty($planMatchRecommend) || $planMatchType <= 0)) {
            $this->resp->msg = "方案信息有误";
            $this->jsonView->out($this->resp);
        }
		if ($planType == 2 && (empty($lotteryId) || empty($issue) || empty($betContent) || $planMatchType != 0)) {
            $this->resp->msg = "方案信息有误";
            $this->jsonView->out($this->resp);
        }
		if ($planPublish == 0) {
			$this->resp->msg = "方案已经下架";
			$this->jsonView->out($this->resp);
		}
        if (!empty($saleTime)) {
            //截止销售时间,平台截止销售前截止
            if ((strtotime($saleTime)) <= time()) {
                $this->resp->msg = "已经截止销售";
                $this->jsonView->out($this->resp);
            }
        }
		$userId = (int)$this->loginUserInfo['userId'];
		if ($userId == $planUserId) {
			$this->resp->msg = "不能购买自己的方案";
			$this->jsonView->out($this->resp);
		}
		/********************* 检查用户是否购买过方案(代码开始) *********************/
		$param = array();
		$param['playType'] = $planType;//1=竞技彩方案, 2=数字彩方案
		$param['orderType'] = 0;
		$param['userId'] = $userId;
		$param['planId'] = $planId;
		$param['status'] = 2;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planOrderList = $selectOrderResp->data['list'];
		if (count($planOrderList) > 0) {
			$this->resp->msg = "你已经购买，无需重复购买";
			$this->jsonView->out($this->resp);
		}
		/********************* 检查用户是否购买过方案(代码结束) *********************/
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		//永久按推广人
		/*$spreaderUserId = (int)$this->loginUserInfo['spreaderUserId'];
		$spreaderNickName = trim($this->loginUserInfo['spreaderNickName']);
		$spreaderRealName = trim($this->loginUserInfo['spreaderRealName']);*/
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['planId'] = $planId;
		$param['planType'] = $planType;
		$param['planUserId'] = $planUserId;
        $param['planMatchType'] = $planMatchType;
		$param['planNickName'] = $planNickName;
		$param['planRealName'] = $planRealName;
        if ($planType == 1) {
            $param['planMatchRecommend'] = $planMatchRecommend;
            $param['planMatchBeginTime'] = $planMatchBeginTime;
        } else if ($planType == 2) {
            $param['lotteryId'] = $lotteryId; //推荐彩种
            $param['lotteryName'] = $lotteryName;
            $param['issue'] = $issue; //推荐期号
            $param['betContent'] = $betContent; //推荐内容
        }
		/**************************** 一推广一订单(代码开始) ****************************/
		if (!empty($spreaderUserNo)) {
			$selectUserByNoResp = $this->userService->selectUserByNo($spreaderUserNo);
			if ($selectUserByNoResp->errCode == 0) {
				$userData = $selectUserByNoResp->data;
				if (!empty($userData)) {
					$spreaderUserId = (int)$userData['userId'];
					$spreaderNickName = trim($userData['nickName']);
					$spreaderRealName = trim($userData['realName']);
					$spreaderUserRight = $this->common->getUserRight((int)$userData['userRight']);
					//在有推广权限下，推广人不能是自己，不能是方案人
					if ($spreaderUserRight['2'] && $userId != $spreaderUserId && $planUserId != $spreaderUserId) {
						$param['spreaderUserId'] = $spreaderUserId;
						$param['spreaderNickName'] = $spreaderNickName;
						$param['spreaderRealName'] = $spreaderRealName;
					}
				}
			}
		}
		/**************************** 一推广一订单(代码结束) ****************************/
		/**************************** 永久按推广人订单(代码开始) ****************************/
		/*
                        $param['spreaderUserId'] = $spreaderUserId;
                        $param['spreaderNickName'] = $spreaderNickName;
                        $param['spreaderRealName'] = $spreaderRealName;
		//没有推广人就绑定推广人
		if ($spreaderUserId <= 0 && !empty($spreaderUserNo)) {
			$selectUserByNoResp = $this->userService->selectUserByNo($spreaderUserNo);
			if ($selectUserByNoResp->errCode == 0) {
				$userData = $selectUserByNoResp->data;
				//推广人不能是自己，不能是方案人
				if (!empty($userData) && $userId != (int)$userData['userId'] && $planUserId != (int)$userData['userId']) {
					$updateUserParam = array();
					$updateUserParam['userId'] = $userId;
					$updateUserParam['spreaderUserId'] = (int)$userData['userId'];
					$updateUserParam['spreaderNickName'] = trim($userData['nickName']);
					$updateUserParam['spreaderRealName'] = trim($userData['realName']);
					$updateUserResp = $this->userService->updateUser($updateUserParam);
					if ($updateUserResp->errCode == 0) {
						$param['spreaderUserId'] = (int)$userData['userId'];
						$param['spreaderNickName'] = trim($userData['nickName']);
						$param['spreaderRealName'] = trim($userData['realName']);
                    }
                }
            }
        }
		*/
		/**************************** 永久按推广人订单(代码结束) ****************************/
        $param['amount'] = $planAmount;
        $param['status'] = 1;
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//创建充值订单
	public function createChargeOrder() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
		$amount = (int)$this->common->getParam("amount", 0);
		if ($amount < 100 || $amount%100 != 0) {
			$this->resp->msg = "amount参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
		$param['orderType'] = 1;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['amount'] = $amount;
		$param['status'] = 1;
		$param['source'] = $source;
		$param['channel'] = $channelValid ? $channel : 0;
		$insertOrderResp = $this->orderService->insertOrder($param);
		if ($insertOrderResp->errCode != 0) {
			$this->resp->msg = "添加订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderId = (int)$insertOrderResp->data;
		if ($orderId <= 0) {
			$this->resp->msg = "添加充值订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderNo = $this->common->encodeNo($userId, $orderId);
		$pay = requireModule("Pay");
		$param = array();
		$param['orderNo'] = $orderNo;
		$param['redirectUrl'] = $redirectUrl;
		$param['tradeType'] = $tradeType;
		$payOrderResp = $pay->payOrder($param);
		if ($payOrderResp->errCode != 0) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payOrderData = $payOrderResp->data;
		if (empty($payOrderData)) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payUrl = trim($payOrderData['payUrl']);
		$this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    //创建彩金充值订单  4
    public function createTicketChargeOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
        $redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        $amount = (int)$this->common->getParam("amount", 0);
        if ($amount < 100 || $amount%100 != 0) {
            $this->resp->msg = "amount参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        //优惠券信息
		$userCouponId = 0;
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = 1; //资金类型, 0=方案, 1=出票
        $param['couponType'] = 2; //优惠券类型, 1=消费, 2=充值
        $param['amount'] = $amount;
        $param['source'] = $source;
        $param['channel'] = $channel;
		$getUserCouponResp = $this->getUserCoupon($param);
		if ($getUserCouponResp->errCode == 0 && !empty($getUserCouponResp->data)) {
			$userCouponId = (int)$getUserCouponResp->data['userCouponId'];
		}
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
        $param = array();
        $param['orderType'] = 4;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['amount'] = $amount;
        $param['status'] = 1;
        $param['userCouponId'] = $userCouponId;
		$param['source'] = $source;
		$param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加充值订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //创建套餐订单
	public function createComboOrder() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		/********************* 检验套餐编号是否正确(代码开始) *********************/
		$comboNo = trim($this->common->getParam("comboNo", ''));
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
		if (empty($comboNo)) {
			$this->resp->msg = "comboNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectComboByNoResp = $this->comboService->selectComboByNo($comboNo);
		if ($selectComboByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$comboData = $selectComboByNoResp->data;
		if (empty($comboData)) {
			$this->resp->msg = "套餐不存在";
			$this->jsonView->out($this->resp);
		}
		$comboType = (int)$comboData['comboType'];
		$comboId = (int)$comboData['comboId'];
		$comboAmount = (int)$comboData['amount'];
		$comboPublish = (int)$comboData['publish'];
		if ($comboId <= 0 || (int)$comboData['comboType'] <= 0 || $comboAmount <= 0) {
			$this->resp->msg = "套餐信息有误";
			$this->jsonView->out($this->resp);
		}
		if ($comboPublish == 0) {
			$this->resp->msg = "套餐已经下架";
			$this->jsonView->out($this->resp);
		}
		if ($comboType <= 0) {
			$this->resp->msg = "套餐类型传参有误";
			$this->jsonView->out($this->resp);
		}
		/********************* 检验套餐编号是否正确(代码结束) *********************/
		$checkNeedBuyComboResp = $this->commonService->checkNeedBuyCombo($userId, $comboType);
		if ($checkNeedBuyComboResp->errCode != 0) {
			$this->resp->errCode = $checkNeedBuyComboResp->errCode;
			$this->resp->msg = $checkNeedBuyComboResp->msg;
			$this->jsonView->out($this->resp);
		}
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
		$param['orderType'] = 2;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['comboId'] = $comboId;
		$param['amount'] = $comboAmount;
		$param['status'] = 1;
		$param['source'] = $source;
		$param['channel'] = $channelValid ? $channel : 0;
		$insertOrderResp = $this->orderService->insertOrder($param);
		if ($insertOrderResp->errCode != 0) {
			$this->resp->msg = "添加订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderId = (int)$insertOrderResp->data;
		if ($orderId <= 0) {
			$this->resp->msg = "添加订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderNo = $this->common->encodeNo($userId, $orderId);
		$pay = requireModule("Pay");
		$param = array();
		$param['orderNo'] = $orderNo;
		$param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
		$payOrderResp = $pay->payOrder($param);
		if ($payOrderResp->errCode != 0) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payOrderData = $payOrderResp->data;
		if (empty($payOrderData)) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payUrl = trim($payOrderData['payUrl']);
		$this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function needBuyCombo() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$comboType = (int)$this->common->getParam("comboType", 0);
		if ($comboType <= 0) {
			$this->resp->msg = "comboType参数有误";
			$this->jsonView->out($this->resp);
		}
		$checkNeedBuyComboResp = $this->commonService->checkNeedBuyCombo($this->loginUserInfo['userId'], $comboType);
		if ($checkNeedBuyComboResp->errCode != 0) {
			$this->resp->errCode = $checkNeedBuyComboResp->errCode;
			$this->resp->msg = $checkNeedBuyComboResp->msg;
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		if ($this->common->isMock()) {
			$this->resp->errCode = 3;
		}
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到推荐订单列表
	public function orderList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$needUser = (bool)$this->common->getParam("needUser", false);
		$needSpread = (bool)$this->common->getParam("needSpread", false);
		$needPlanAccess = (bool)$this->common->getParam("needPlanAccess", false);
		$planType = (int)$this->common->getParam("planType", 1);    //1:竞彩  2:数字彩
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($planType != 1 && $planType != 2) {
            $this->resp->msg = "planType参数有误";
            $this->jsonView->out($this->resp);
        }
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		//有推广权限才能查看推广
		$needSpread = $needSpread && $this->loginUserRight['2'];
		$param = array();
        $param['planType'] = $planType;
		if ($needSpread) {
			$param['spreaderUserId'] = $userId;
            $param['planType'] = array(1, 2);   //分享收成列表竞彩和数字彩一起展示
		} else {
			$param['userId'] = $userId;
		}
		$param['orderType'] = 0;
		$param['status'] = 2;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$totalCount = (int)$orderListData['totalCount'];
		$totalAmount = (int)$orderListData['totalAmount'];
		$orderList = $orderListData['list'];
        if ($planType == 1) {
            $orderList = $this->commonService->setMatchListCache($orderList, 'planMatchRecommend');
        } else if ($planType == 2) {
            $orderList = $this->commonService->setLotteryIssueCache($orderList);
            $orderList = $this->commonService->setBetContentListCache($orderList);
        }
        if ($needUser) {
			$orderList = $this->commonService->setUserCache($orderList);
		}
		if ($needSpread) {
			//资金类型, 0=方案, 1=出票
			//类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益, 2=分成收益)
			$orderList = $this->commonService->setStatistics($orderList, 'orderId', 0, 2, 'statistics');
			//目前都是50%推广收成，以后变动再改
			$totalAmount = $totalAmount/2;
		}
		if ($needPlanAccess) {
			$orderList = $this->commonService->setOrderPlanAccess($orderList, $this->loginUserInfo['userId']);
		}
        $orderList = $this->commonService->setPlanCache($orderList);
		$data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, 'list' => array());
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$userId = (int)$orderList[$i]['userId'];
			$planUserId = (int)$orderList[$i]['planUserId'];
			$planId = (int)$orderList[$i]['planId'];
			$orderId = (int)$orderList[$i]['orderId'];
			$amount = (int)$orderList[$i]['amount'];
			if ($userId <= 0 || $planId <=0 || $orderId <= 0 || $amount <= 0) {
				continue;
			}
			$orderInfo = array();
			$orderInfo['orderNo'] = $this->common->encodeNo($userId, $orderId);
			$orderInfo['planNo'] = $this->common->encodeNo($planUserId, $planId);
			$orderInfo['planType'] = (int)$orderList[$i]['planType'];
			$orderInfo['amount'] = $amount;
            $orderInfo['planMatchType'] = (int)$orderList[$i]['planMatchType'];
			$orderInfo['createTime'] = trim($orderList[$i]['createTime']);
			$orderInfo['lastTime'] = trim($orderList[$i]['lastTime']);
            if ($planType == 1) {
                //竞彩
                $matchList = $orderList[$i]['matchList'];
                $orderInfo['matchList'] = $matchList;
                //显示是否可以跟单
                $isABT = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
                $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
                $isSale = $matchListIsSaleResp->errCode == 0 && $isABT;
                $orderInfo['isSale'] = (bool)$isSale;
                $orderInfo['plan'] = $orderList[$i]['plan'];
            } else if ($planType == 2) {
                $orderInfo['lotteryId'] = (int)$orderList[$i]['lotteryId'];
                $orderInfo['lotteryName'] = trim($orderList[$i]['lotteryName']);
                $orderInfo['issue'] = trim($orderList[$i]['issue']);
                $orderInfo['lotteryIssue'] = $orderList[$i]['lotteryIssue'];
				$orderInfo['betContentList'] = $orderList[$i]['betContentList'];
            }
			if ($needUser) {
				$orderInfo['user'] = $orderList[$i]['user'];
			}
			if ($needSpread) {
				$statisticsInfo = array("count" => 0, "amount" => 0);
				if (!empty($orderList[$i]['statistics'])) {
					$statisticsInfo['count'] = (int)$orderList[$i]['statistics']['count'];
					$statisticsInfo['amount'] = (int)$orderList[$i]['statistics']['amount'];
				}
				$orderInfo['statistics'] = $statisticsInfo;
			}
			if ($needPlanAccess) {
				$orderInfo['planAccess'] = (bool)$orderList[$i]['planAccess'];
			}
			$orderInfo['planPrizeStatus'] = (int)$orderList[$i]['planPrizeStatus'];
			$data['list'][] = $orderInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到充值订单列表
	public function chargeOrderList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
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
		$param['userId'] = $userId;
		$param['orderType'] = 1;
		$param['status'] = 2;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$totalCount = (int)$orderListData['totalCount'];
		$orderList = $orderListData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$userId = (int)$orderList[$i]['userId'];
			$orderId = (int)$orderList[$i]['orderId'];
			$amount = (int)$orderList[$i]['amount'];
			if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
				continue;
			}
			$orderInfo = array();
			$orderInfo['orderNo'] = $this->common->encodeNo($userId, $orderId);
			$orderInfo['amount'] = $amount;
			$orderInfo['createTime'] = trim($orderList[$i]['createTime']);
			$orderInfo['lastTime'] = trim($orderList[$i]['lastTime']);
			$data['list'][] = $orderInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到套餐订单列表
	public function comboOrderList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
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
		$param['userId'] = $userId;
		$param['orderType'] = 2;
		$param['status'] = 2;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$totalCount = (int)$orderListData['totalCount'];
		$orderList = $orderListData['list'];
		$data = array("totalCount" => $totalCount, 'list' => array());
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$userId = (int)$orderList[$i]['userId'];
			$orderId = (int)$orderList[$i]['orderId'];
			$amount = (int)$orderList[$i]['amount'];
			if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
				continue;
			}
			$orderInfo = array();
			$orderInfo['orderNo'] = $this->common->encodeNo($userId, $orderId);
			$orderInfo['amount'] = $amount;
			$orderInfo['createTime'] = trim($orderList[$i]['createTime']);
			$orderInfo['lastTime'] = trim($orderList[$i]['lastTime']);
			$data['list'][] = $orderInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//创建出票订单
	public function createTicketOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $isABT = (bool)$this->commonService->isAllowBuyTicket($userId);
        if (!$isABT) {
            $this->resp->msg = "暂不能购买";
            $this->jsonView->out($this->resp);
        }
        $branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $version = trim($this->common->getParam("version", ''));
        $channel = (int)$this->loginUserInfo['channel'];
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
        $ticketMultiple = (int)$this->common->getParam("ticketMultiple", 1);//投注倍数
        $ticketPassType = $this->common->getParam("ticketPassType", '');//过关方式
        $planType = (int)$this->common->getParam("planType", 0);//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        $planNo = trim($this->common->getParam("planNo", ''));
        $redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        if ($ticketMultiple <= 0 || $ticketMultiple > 100000) {
            $this->resp->msg = "ticketMultiple参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($planNo)) {
            $this->resp->msg = "planNo参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($planType == -1) {
            //-1代表"竞技彩订单"跟单
            $selectOrderByNoResp = $this->orderService->selectOrderByNo($planNo);
            if ($selectOrderByNoResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $orderData = $selectOrderByNoResp->data;
            if (empty($orderData)) {
                $this->resp->msg = "订单不存在";
                $this->jsonView->out($this->resp);
            }
            $orderData = $this->commonService->setMatchList(array($orderData), 'planMatchRecommend')[0];
            $planId = (int)$orderData['orderId'];
            $planPublish = 1;
            $planUserId = (int)$orderData['userId'];
            $planNickName = trim($orderData['nickName']);
            $planRealName = trim($orderData['realName']);
            $matchType = (int)$orderData['planMatchType'];
            $planMatchRecommend = trim($orderData['planMatchRecommend']);
            $planMatchBeginTime = trim($orderData['planMatchBeginTime']);
            $planMatchList = $orderData['matchList'];
            $ticketPassType = trim($orderData['ticketPassType']);
            if (!empty($ticketPassType)) {
                $ticketPassType = explode(',', $ticketPassType);
            }
        } else {
            $selectPlanByNoResp = $this->planService->selectPlanByNo($planNo);
            if ($selectPlanByNoResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $planData = $selectPlanByNoResp->data;
            if (empty($planData)) {
                $this->resp->msg = "方案不存在";
                $this->jsonView->out($this->resp);
            }
            $planData = $this->commonService->setMatchList(array($planData))[0];
            $planId = (int)$planData['planId'];
            $planType = (int)$planData['planType'];//1=竞技彩, 2=数字彩
            $planPublish = (int)$planData['publish'];
            $planUserId = (int)$planData['userId'];
            $planNickName = trim($planData['nickName']);
            $planRealName = trim($planData['realName']);
            $matchType = (int)$planData['matchType'];
            $planMatchRecommend = trim($planData['matchRecommend']);
            $planMatchBeginTime = trim($planData['matchBeginTime']);
            $planMatchList = $planData['matchList'];
        }
        if ($planId <= 0 || $planUserId <= 0 || $matchType <= 0) {
            $this->resp->msg = "方案信息有误";
            $this->jsonView->out($this->resp);
        }
        if ($planPublish == 0) {
            $this->resp->msg = "方案已经下架";
            $this->jsonView->out($this->resp);
        }
        $concedeMap = array();//固化大小分, 让分，让球
        $oddsMap = array();
        $matchMap = array();
        foreach ($planMatchList as $match) {
            $matchId = (int)$match['matchId'];
            $oddsId = (int)$match['oddsId'];
            $concede = trim($match['concede']);
            $bettypeOdds = $match['bettypeOdds'];
            if ($matchId <= 0) {
                $this->resp->msg = "比赛有误";
                $this->jsonView->out($this->resp);
            }
            if ($oddsId <= 0) {
                $this->resp->msg = "比赛赔率有误";
                $this->jsonView->out($this->resp);
            }
            //固化大小分, 让分，让球
            $concedeMap[$oddsId] = $concede;
            $oddsMap[$oddsId] = $bettypeOdds;
            $matchMap[$matchId.'-'.$oddsId] = $match;
        }
        //固化下单的投注
        $planMatchRecommend = json_decode($planMatchRecommend);
        foreach ($planMatchRecommend as &$r) {
            $matchId = (int)$r->matchId;
            $oddsId = (int)$r->oddsId;
            if ($matchId <= 0) {
                $this->resp->msg = "比赛有误";
                $this->jsonView->out($this->resp);
            }
            if ($oddsId <= 0) {
                $this->resp->msg = "比赛赔率有误";
                $this->jsonView->out($this->resp);
            }
            $r->concede = $concedeMap[$oddsId];
            $r->bettypeOdds = $oddsMap[$oddsId];
        }
        $matchLength = count($planMatchRecommend);
        $planMatchRecommend = trim(json_encode($planMatchRecommend));
        //过关方式
        $ticketPassTypeArr = array();
        if (is_array($ticketPassType) && count($ticketPassType) > 0) {
            foreach ($ticketPassType as $p) {
                $p = trim($p);
                if (preg_match('/^\d+x1$/', $p)) {
                    $ticketPassTypeArr[] = $p;
                }
            }
        }
        if (count($ticketPassTypeArr) <= 0) {
            $ticketPassTypeArr[] = $matchLength.'x1';
        }
        $ticketPassType = implode(',', $ticketPassTypeArr);
        $calculateTicketResp = $this->commonService->calculateTicket($planMatchRecommend, $ticketPassType);
        if ($calculateTicketResp->errCode != 0) {
            $this->resp->msg = $calculateTicketResp->msg;
            $this->jsonView->out($this->resp);
        }
        $ticketPassTypeMap = $calculateTicketResp->data;
        $ticketUnit = 0;
        foreach ($ticketPassTypeMap as $item) {
            $unit = (int)$item['ticketUnit'];
            $mr = $item['matchRecommend'];
            if ($unit <= 0 || !is_array($mr) || count($mr) <= 0) {
                $this->resp->msg = '过关赛事异常';
                $this->jsonView->out($this->resp);
            }
            $ticketUnit += $unit;
            foreach ($mr as $m) {
                $m = json_decode($m);
                if (empty($m)) {
                    $this->resp->msg = '过关赛事异常';
                    $this->jsonView->out($this->resp);
                }
                $matchList = array();
                foreach ($m as $r) {
                    $matchId = (int)$r->matchId;
                    $oddsId = (int)$r->oddsId;
                    $match = $matchMap[$matchId.'-'.$oddsId];
                    if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
                        $this->resp->msg = '过关赛事异常';
                        $this->jsonView->out($this->resp);
                    }
                    $matchList[] = $match;
                }
                $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
                if ($matchListIsSaleResp->errCode != 0) {
                    $this->resp->msg = $matchListIsSaleResp->msg;
                    $this->jsonView->out($this->resp);
                }
            }
        }
        if ($ticketUnit <= 0) {
            $this->resp->msg = '订单注数异常';
            $this->jsonView->out($this->resp);
        }
        $amount = (int)($ticketMultiple*$ticketUnit*2*100);
        $param = array(
            'userId' => $userId,
            'planType' => $planType,//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
            'matchType' => $matchType,//比赛类型, 1=足球, 2=篮球
            'matchLength' => $matchLength,
            'ticketMultiple' => $ticketMultiple,//倍数
            'ticketPassType' => $ticketPassType,//过关方式
            'amount' => $amount//金额
        );
        $ticketSupplierResp = $this->orderService->getTicketSupplier($param);
        if ($ticketSupplierResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $ticketSupplier = $ticketSupplierResp->data;
        if (empty($ticketSupplier)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $ticketPrizeDivideStatus = 0;//中奖分成, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        $needTicketPrizeDivide = false;
        if ($source == 0) {
            $needTicketPrizeDivide = true;
        } else if ($source == 1) {
            //branch = 产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
            if (($branch == 0 && $version >= '2.5.0') || ($branch == 1 && $version >= '1.4.0')) {//晒米场2.5.0 和 晒米彩票1.4.0
                $needTicketPrizeDivide = true;
            }
        } else if ($source == 2) {
            if (($branch == 0 && $version >= '2.0.0') || ($branch == 2 && $version >= '2.4.0')) {//晒米场2.0.0 和 晒米竞彩2.4.0
                $needTicketPrizeDivide = true;
            }
        }
        if ($planType == -1) {
            //-1代表"竞技彩订单"跟单
            $ticketPrizeDivideStatus = 1;
        } else if ($needTicketPrizeDivide && $userId != $planUserId) {
            //判断用户是否购买了方案
            $param = array();
            $param['planType'] = 1; //1=竞彩, 2=数字彩
            $param['orderType'] = 0;
            $param['userId'] = $userId;
            $param['planId'] = $planId;
            $param['status'] = 2;
            $selectOrderResp = $this->orderService->selectOrder($param);
            if ($selectOrderResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $planOrderList = $selectOrderResp->data['list'];
            if (count($planOrderList) <= 0) {
                $ticketPrizeDivideStatus = 1;
            }
        }
        $ticketAttachPrizeStatus = 0;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        if ($matchLength == 1 && !empty($planMatchList[0]) && !empty($planMatchList[0]['bettypeContent']) && in_array($planMatchList[0]['bettypeContent'], array('SPF','RQSPF','RFSF','DXF'))) {
            $ticketAttachPrizeStatus = 1;
        } else if ($matchLength == 2 && $ticketPassType == '2x1') {
            $ticketAttachPrizeStatus = 1;
        }
        $lotteryId = '';
        $lotteryName = '';
        if ($matchType == 1) {
            $lotteryId = 'JCZQ';
            $lotteryName = '竞彩足球';
        } else if ($matchType == 2) {
            $lotteryId = 'JCLQ';
            $lotteryName = '竞彩篮球';
        }
        //优惠券信息
        $userCouponId = 0;
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = 1; //资金类型, 0=方案, 1=出票
        $param['couponType'] = 1; //优惠券类型, 1=消费, 2=充值
        $param['amount'] = $amount;
        $param['source'] = $source;
        $param['channel'] = $channel;
        $param['lotteryId'] = $lotteryId;
        $getUserCouponResp = $this->getUserCoupon($param);
        if ($getUserCouponResp->errCode == 0 && !empty($getUserCouponResp->data)) {
            $userCouponId = (int)$getUserCouponResp->data['userCouponId'];
        }
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['orderType'] = 3;
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
        $param['planId'] = $planId;
        $param['planType'] = $planType;
        $param['planUserId'] = $planUserId;
        $param['planNickName'] = $planNickName;
        $param['planRealName'] = $planRealName;
        $param['planMatchType'] = $matchType;
        $param['planMatchRecommend'] = $planMatchRecommend;
        $param['planMatchBeginTime'] = $planMatchBeginTime;
        $param['amount'] = $amount;
        $param['status'] = 1;
        $param['userCouponId'] = $userCouponId;
        $param['ticketUnit'] = $ticketUnit;
        $param['ticketMultiple'] = $ticketMultiple;
        $param['ticketPassType'] = $ticketPassType;
        $param['ticketUserId'] = (int)$ticketSupplier['userId'];
        $param['ticketNickName'] = trim($ticketSupplier['nickName']);
        $param['ticketRealName'] = trim($ticketSupplier['realName']);
        $param['ticketSupplierId'] = (int)$ticketSupplier['ticketSupplierId'];
        $param['ticketSupplierName'] = trim($ticketSupplier['ticketSupplierName']);
        $param['ticketPrizeDivideStatus'] = $ticketPrizeDivideStatus;
        $param['ticketAttachPrizeStatus'] = $ticketAttachPrizeStatus;
        $param['lotteryId'] = $lotteryId;
        $param['lotteryName'] = $lotteryName;
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        if ($source == 0) {
            $redirectUrl .= '&orderNo='.$orderNo;
        }
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
	}

    public function publish() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $orderNo = trim($this->common->getParam("orderNo", ''));
        if (empty($orderNo)) {
            $this->resp->msg = 'orderNo参数有误';
            $this->jsonView->out($this->resp);
        }
        $selectOrderByNoResp = $this->orderService->selectOrderByNo($orderNo);
        if ($selectOrderByNoResp->errCode != 0 || empty($selectOrderByNoResp->data)) {
            $this->resp->msg = "订单查询异常";
            $this->jsonView->out($this->resp);
        }
        $orderData = $selectOrderByNoResp->data;
        if (empty($orderData)) {
            $this->resp->msg = '订单信息异常';
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $orderId = (int)$orderData['orderId'];
        $orderType = (int)$orderData['orderType'];
        $saleTicket = (int)$orderData['saleTicket'];
        $planType = (int)$orderData['planType'];
        $planId = (int)$orderData['planId'];
        $planUserId = (int)$orderData['planUserId'];
        $planMatchBeginTime = strtotime(trim($orderData['planMatchBeginTime']));
        if ($orderId <= 0 || $orderType != 3 || $saleTicket != 1 || $planType != 0 || $planId != 0 || $planUserId != 0 || $planMatchBeginTime <= 0 || $planMatchBeginTime <= time()) {
            $this->resp->msg = "订单信息异常";
            $this->jsonView->out($this->resp);
        }
        $database = requireModule('Database');
        //更新订单票状态
        $updateOrderSql = 'update t_order set publish=1 where orderId="' . $orderId . '" and orderType=3 and saleTicket=1 and planType=0 and planId=0 and planUserId=0 and planMatchBeginTime>now() and publish=0 limit 1';
        $updateOrderResult = $database->execute($updateOrderSql);
        if (!$updateOrderResult) {
            $this->resp->msg = "更新订单异常";
            $this->jsonView->out($this->resp);
        }
        $database->close();
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function orderPublishList() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
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
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
        $param['planType'] = 0;
        $param['planId'] = 0;
        $param['planUserId'] = 0;
        $param['status'] = array(2,4);//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(2,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['publish'] = 1;//上下架, 0=下架, 1=上架, 上架订单可以被跟单
        $param['orderBy'] = 2;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
            $this->resp->msg = "订单查询异常";
            $this->jsonView->out($this->resp);
        }
        $selectOrderData = $selectOrderResp->data;
        $totalCount = (int)$selectOrderData['totalCount'];
        $totalAmount = (int)$selectOrderData['totalAmount'];
        $orderList = $selectOrderData['list'];
        $orderList = $this->commonService->setMatchListCache($orderList, 'planMatchRecommend');
        $orderList = $this->commonService->setUserCache($orderList);
        $orderList = $this->setBetTag($orderList);
        $orderList = $this->setFollowAmount($orderList);
        $data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, 'list' => array());
        foreach ($orderList as $order) {
            $userId = (int)$order['userId'];
            $orderId = (int)$order['orderId'];
            $amount = (int)$order['amount'];
            $createTime = trim($order['createTime']);
            $matchType = (int)$order['planMatchType'];//比赛类型, 1=足球, 2=篮球
            $ticketMultiple = (int)$order['ticketMultiple'];
            $matchList = $order['matchList'];
            $ticketPassType = trim($order['ticketPassType']);
            $betTag = trim($order['betTag']);
            $followAmount = (int)$order['followAmount'];
            $user = $order['user'];
            if ($userId <= 0 || $orderId <= 0 || $matchType <= 0 || empty($matchList) || empty($user)) {
                continue;
            }
            $user['betTag'] = $betTag;
            $calculateMaxPrizeAmountResp = $this->commonService->calculateMaxPrizeAmount($matchList, $ticketPassType, $ticketMultiple);
            if ($calculateMaxPrizeAmountResp->errCode != 0) {
                continue;
            }
            $maxPrizeAmount = $calculateMaxPrizeAmountResp->data;
            $maxPrizeRate = sprintf('%.2f', $maxPrizeAmount*100/$amount);
            $orderInfo = array();
            $orderInfo['orderNo'] = $this->common->encodeNo($userId, $orderId);
            $orderInfo['amount'] = $amount;
            $orderInfo['betAmount'] = (int)($amount/$ticketMultiple);
            $orderInfo['followAmount'] = $followAmount;
            $orderInfo['matchType'] = $matchType;
            $orderInfo['maxPrizeAmount'] = $maxPrizeAmount;
            $orderInfo['maxPrizeRate'] = $maxPrizeRate;
            $orderInfo['user'] = $user;
            $orderInfo['createTime'] = $createTime;
            $data['list'][] = $orderInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //订单跟单列表
    public function orderFollowList() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $orderNo = trim($this->common->getParam("orderNo", ''));
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
        if (empty($orderNo)) {
            $this->resp->msg = 'orderNo参数有误';
            $this->jsonView->out($this->resp);
        }
        $selectOrderByNoResp = $this->orderService->selectOrderByNo($orderNo);
        if ($selectOrderByNoResp->errCode != 0 || empty($selectOrderByNoResp->data)) {
            $this->resp->msg = "订单查询异常";
            $this->jsonView->out($this->resp);
        }
        $orderData = $selectOrderByNoResp->data;
        if (empty($orderData)) {
            $this->resp->msg = '订单信息异常';
            $this->jsonView->out($this->resp);
        }
        $param = array(
            'orderId' => $orderData['orderId'],
            'pageNum' => $pageNum,
            'pageSize' => $pageSize,
            'needCount' => true
        );
        $getOrderFollowResp = $this->getOrderFollow($param);
        if ($getOrderFollowResp->errCode != 0 || empty($getOrderFollowResp->data)) {
            $this->resp->msg = '订单跟单查询异常';
            $this->jsonView->out($this->resp);
        }
        $orderFollowData = $getOrderFollowResp->data;
        $totalCount = (int)$orderFollowData['totalCount'];
        $totalAmount = (int)$orderFollowData['totalAmount'];
        $totalTicketPrizeAmount = (int)$orderFollowData['totalTicketPrizeAmount'];
        $orderList = $orderFollowData['list'];
        $data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, "totalTicketPrizeAmount" => $totalTicketPrizeAmount, 'list' => array());
        foreach ($orderList as $order) {
            $userId = (int)$order['userId'];
            $orderId = (int)$order['orderId'];
            $nickName = trim($order['nickName']);
            $amount = (int)$order['amount'];
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
            $createTime = trim($order['createTime']);
            if ($userId <= 0 || $orderId <= 0) {
                continue;
            }
            $nickName = mb_substr($nickName, 0, 1).'***';
            $orderInfo = array();
            $orderInfo['nickName'] = $nickName;
            $orderInfo['amount'] = $amount;
            $orderInfo['ticketPrizeAmount'] = $ticketPrizeAmount;
            $orderInfo['createTime'] = $createTime;
            $data['list'][] = $orderInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //给每个用户设置投注标签
    public function setBetTag($objectList, $key = 'userId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $userIdArr = array();
        foreach ($objectList as $object) {
            $userId = (int)$object[$key];
            if ($userId > 0) {
                $userIdArr[] = $userId;
            }
        }
        $ticketPrizeAmountList = array();
        if (count($userIdArr) > 0) {
            $param = array();
            $param['userId'] = $userIdArr;
            $selectMaxTicketPrizeAmountResp = $this->orderService->selectMaxTicketPrizeAmount($param);
            if ($selectMaxTicketPrizeAmountResp->errCode == 0 && !empty($selectMaxTicketPrizeAmountResp->data['list'])) {
                $ticketPrizeAmountList = $selectMaxTicketPrizeAmountResp->data['list'];
            }
        }
        $ticketPrizeAmountMap = array();
        foreach ($ticketPrizeAmountList as $item) {
            $userId = (int)$item['userId'];
            if ($userId > 0) {
                $ticketPrizeAmountMap[$userId] = $item;
            }
        }
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $userId = (int)$objectList[$i][$key];
            if (!empty($ticketPrizeAmountMap[$userId])) {
                $ticketPrizeAmount = (int)$ticketPrizeAmountMap[$userId]['ticketPrizeAmount'];
                $betTag = '';
                if ($ticketPrizeAmount > 0) {
                    if ($ticketPrizeAmount >= 100000000) {
                        $betTag = '百万元户';
                    } else if ($ticketPrizeAmount >= 10000000) {
                        $betTag = '十万元户';
                    } else if ($ticketPrizeAmount >= 1000000) {
                        $betTag = '万元户';
                    } else if ($ticketPrizeAmount >= 100000) {
                        $betTag = '千元户';
                    }
                }
                $objectList[$i]['betTag'] = $betTag;
            }
        }
        return $objectList;
    }

    public function setFollowAmount($objectList, $key = 'orderId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $orderIdArr = array();
        foreach ($objectList as $object) {
            $orderId = (int)$object[$key];
            if ($orderId > 0) {
                $orderIdArr[] = $orderId;
            }
        }
        $amountList = array();
        if (count($orderIdArr) > 0) {
            $param = array();
            $param['orderId'] = $orderIdArr;
            $selectFollowAmountResp = $this->orderService->selectFollowAmount($param);
            if ($selectFollowAmountResp->errCode == 0 && !empty($selectFollowAmountResp->data['list'])) {
                $amountList = $selectFollowAmountResp->data['list'];
            }
        }
        $amountMap = array();
        foreach ($amountList as $item) {
            $orderId = (int)$item['planId'];//这里的planId就是orderId
            if ($orderId > 0) {
                $amountMap[$orderId] = $item;
            }
        }
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $orderId = (int)$objectList[$i][$key];
            if (!empty($amountMap[$orderId])) {
                $amount = (int)$amountMap[$orderId]['amount'];
                $objectList[$i]['followAmount'] = $amount;
            }
        }
        return $objectList;
    }

    public function setFollowGainAmount($objectList, $key = 'orderId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        //跟单市场订单
        $orderIdArr = array();
        foreach ($objectList as $object) {
            $orderId = (int)$object[$key];
            if ($orderId > 0) {
                $orderIdArr[] = $orderId;
            }
        }
        if (count($orderIdArr) <= 0) {
            return $objectList;
        }
        $orderList = array();
        //订单的跟单
        $param = array();
        $param['orderId'] = $orderIdArr;
        $getOrderFollowResp = $this->getOrderFollow($param);
        if ($getOrderFollowResp->errCode == 0 && !empty($getOrderFollowResp->data)) {
            $orderList = $getOrderFollowResp->data['list'];
        }
        $planIdMap = array();
        $orderIdArr = array();
        foreach ($orderList as $item) {
            $planId = (int)$item['planId'];
            $orderId = (int)$item['orderId'];
            if ($planId > 0 || $orderId > 0) {
                $planIdMap[$orderId] = $planId;
                $orderIdArr[] = $orderId;
            }
        }
        if (count($planIdMap) <= 0 || count($orderIdArr) <= 0) {
            return $objectList;
        }
        $followGainMap = array();
        //查看收益
        $param = array();
        $param['financeType'] = 1;
        $param['orderId'] = $orderIdArr;
        $param['type'] = 2;//类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益,2=分成收益)
        $selectFinanceIncomeResp = $this->financeService->selectFinanceIncome($param);
        if ($selectFinanceIncomeResp->errCode == 0 && !empty($selectFinanceIncomeResp->data)) {
            $financeIncomeList = $selectFinanceIncomeResp->data['list'];
            foreach ($financeIncomeList as $item) {
                $orderId = (int)$item['orderId'];
                $amount = (int)$item['amount'];
                $planId = (int)$planIdMap[$orderId];
                if ($orderId > 0 || $amount > 0 || $planId > 0) {
                    if (empty($followGainMap[$planId])) {
                        $followGainMap[$planId] = 0;
                    }
                    $followGainMap[$planId] += $amount;
                }
            }
        }
        if (count($followGainMap) <= 0) {
            return $objectList;
        }
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $orderId = (int)$objectList[$i][$key];
            $amount = (int)$followGainMap[$orderId];
            if ($orderId > 0) {
                $objectList[$i]['followGainAmount'] = $amount;
            }
        }
        return $objectList;
    }

    private function getOrderFollow($param) {
        $resp = requireModule("Resp");
        $orderId = $param['orderId'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $justCount = (bool)$param['justCount'];
        if (empty($orderId)) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $param = array();
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['planType'] = -1;//类型(负数=跟订单，正数=跟方案), -1=竞技彩订单, -2=数字彩订单, 1=竞技彩方案, 2=数字彩方案
        $param['planId'] = $orderId;
        $param['status'] = array(2,4);//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(2,3,4,5,6,7,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        if ($pageNum > 0) {
            $param['pageNum'] = $pageNum;
        }
        if ($pageSize > 0) {
            $param['pageSize'] = $pageSize;
        }
        $param['needCount'] = $needCount;
        $param['justCount'] = $justCount;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
            $resp->msg = "订单查询异常";
            return $resp;
        }
        $data = $selectOrderResp->data;
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	//我的出票单列表(竞技彩和数字彩)
	public function ticketOrderList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$type = (int)$this->common->getParam("type", 1);//1:客户端，2:店长端
        $planMatchType = (int)$this->common->getParam("planMatchType", 0);//1:足球，2:篮球
		$userId = (int)$this->loginUserInfo['userId'];
		$ticketStatus = (array)$this->common->getParam("ticketStatus");
		$ticketType = (int)$this->common->getParam("ticketType", 0);//0=全部, 1=跟单, 2=自购
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
		$param['orderType'] = array(3,7,9);
		if ($type == 1) {
			$param['userId'] = $userId;
			$param['status'] = array(2,3,4);//已付款,退款,部分退款
		} else if ($type == 2) {
			$param['ticketUserId'] = $userId;
			$param['status'] = 2;
		}
		$param['ticketStatus'] = $ticketStatus;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
        $param['planMatchType'] = $planMatchType;
		$param['ticketType'] = $ticketType;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$totalCount = (int)$orderListData['totalCount'];
		$totalAmount = (int)$orderListData['totalAmount'];
		$totalTicketPrizeAmount = (int)$orderListData['totalTicketPrizeAmount'];
		$orderList = $orderListData['list'];
		$data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, "totalTicketPrizeAmount" => $totalTicketPrizeAmount, 'list' => array());
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$userId = (int)$orderList[$i]['userId'];
			$orderId = (int)$orderList[$i]['orderId'];
			$issue = trim($orderList[$i]['issue']);
			$lotteryId = trim($orderList[$i]['lotteryId']);
			$lotteryName = trim($orderList[$i]['lotteryName']);
			$status = (int)$orderList[$i]['status'];
			$ticketStatus = (int)$orderList[$i]['ticketStatus'];
			$ticketSupplierId = (int)$orderList[$i]['ticketSupplierId'];
			$planUserId = (int)$orderList[$i]['planUserId'];
			$planId = (int)$orderList[$i]['planId'];
			if ($userId <= 0 || $orderId <= 0) {
				continue;
			}
			$orderInfo = array();
			$orderInfo['issue'] = $issue;
			$orderInfo['lotteryId'] = $lotteryId;
			$orderInfo['lotteryName'] = $lotteryName;
			$orderInfo['orderNumeric'] = $this->common->getOrderNumeric($orderList[$i]);
			$orderInfo['orderNo'] = $this->common->encodeNo($userId, $orderId);
			$orderInfo['status'] = $status;
			$orderInfo['isSelfTicket'] = empty($planId) || empty($planUserId);
			$orderInfo['ticketStatus'] = $ticketStatus;
			$orderInfo['ticketPrizeAmount'] = (int)$orderList[$i]['ticketPrizeAmount'];
			$orderInfo['ticketExpectPrizeAmount'] = (int)$orderList[$i]['ticketExpectPrizeAmount'];
			$orderInfo['ticketSendPrizeAmount'] = (int)$orderList[$i]['ticketSendPrizeAmount'];
			$orderInfo['isTSP'] = $ticketSupplierId > 0;
            $orderInfo['planMatchType'] = (int)$orderList[$i]['planMatchType'];
			$orderInfo['planNickName'] = trim($orderList[$i]['planNickName']);
			$orderInfo['planRealName'] = trim($orderList[$i]['planRealName']);
			$orderInfo['createTime'] = trim($orderList[$i]['createTime']);
			$data['list'][] = $orderInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function prizeTicketOrderList() {
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);//1:足球，2:篮球
		$param = array();
		$param['orderType'] = 3;
		$param['status'] = 2;
		$param['ticketStatus'] = 5;//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖
		$param['pageNum'] = 1;
		$param['pageSize'] = 10;
		$param['planMatchType'] = $planMatchType;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$orderListData = $selectOrderResp->data;
		$orderList = $orderListData['list'];
		$data = array('list' => array());
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$userId = (int)$orderList[$i]['userId'];
			$orderId = (int)$orderList[$i]['orderId'];
			$planMatchType = (int)$orderList[$i]['planMatchType'];
			$ticketPrizeAmount = (int)$orderList[$i]['ticketPrizeAmount'];
			$nickName = trim($orderList[$i]['nickName']);
			if ($userId <= 0 || $orderId <= 0 || $planMatchType <= 0 || $ticketPrizeAmount <= 0 || empty($nickName)) {
				continue;
			}
			$nickName = mb_substr($nickName, 0, 1);
			if (mb_strlen($nickName) !== 1) {
				continue;
			}
			$orderInfo = array();
			$orderInfo['planMatchType'] = $planMatchType;
			$orderInfo['ticketPrizeAmount'] = $ticketPrizeAmount;
			$orderInfo['nickName'] = $nickName.'***';
			$orderInfo['createTime'] = trim($orderList[$i]['createTime']);
			$data['list'][] = $orderInfo;
		}
        $data['list'] = array();
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function ticketOrderCount() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$type = (int)$this->common->getParam("type", 1);//1:客户端，2:店长端
		$planMatchType = (int)$this->common->getParam("planMatchType", 0);//1:足球，2:篮球
		$userId = (int)$this->loginUserInfo['userId'];
		$ticketStatus = (array)$this->common->getParam("ticketStatus");
		$nullTicketPrizeAmount = (bool)$this->common->getParam("nullTicketPrizeAmount", false);
		$param['orderType'] = 3;
		if ($type == 1) {
			$param['userId'] = $userId;
			$param['status'] = array(2,3);//已付款的和退款的
		} else if ($type == 2) {
			$param['ticketUserId'] = $userId;
			$param['status'] = 2;
			$param['ticketStatus'] = $ticketStatus;
		}
		$param['nullTicketPrizeAmount'] = $nullTicketPrizeAmount;
		$param['planMatchType'] = $planMatchType;
		$param['justCount'] = true;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectOrderResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//我的跟单详情(竞技彩和数字彩)
	public function ticketOrderInfo() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$type = (int)$this->common->getParam("type", 1);//1:客户端，2:店长端
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$this->resp->msg = 'orderNo参数有误';
			$this->jsonView->out($this->resp);
		}
		$param = array();
		if ($type == 2) {
			$param['ticketUserId'] = $userId;
		}
		$param['orderId'] = $orderNoOrderId;
		$param['status'] = array(2,3,4);//已付款,退款,部分退款
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$this->resp->msg = '查询订单异常';
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderResp->data['list'][0];
		if (empty($orderData)) {
			$this->resp->msg = '订单信息异常';
			$this->jsonView->out($this->resp);
		}
		$orderType = (int)$orderData['orderType'];
		$planType = (int)$orderData['planType'];
        $amount = (int)$orderData['amount'];
        $publish = (int)$orderData['publish'];
		//验证访问权限
		if ($type == 1 && $publish != 1) {
		    if ($userId != $orderData['userId']) {
                $this->resp->msg = '没有权限访问';
                $this->jsonView->out($this->resp);
            }
        }
        //增加订单优惠券信息
        $userCouponId = (int)$orderData['userCouponId'];
        if ($userCouponId > 0) {
            $param = array() ;
            $param['userCouponId'] = $userCouponId;
            $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
            if ($selectUserCouponResp->errCode != 0) {
                $this->resp->msg = '优惠券信息异常';
                $this->jsonView->out($this->resp);
            }
            $userCouponData = $selectUserCouponResp->data['list'][0];
        }
		if ($orderType == 3) {
			$orderData = $this->commonService->setMatchList(array($orderData), 'planMatchRecommend')[0];
			$orderData = $this->commonService->setResourceUrl(array($orderData), 'ticketImg')[0];
			$planUserId = (int)$orderData['planUserId'];
            $planId = (int)$orderData['planId'];
            $planMatchBeginTime = trim($orderData['planMatchBeginTime']);
            $planMatchBeginTime = strtotime($planMatchBeginTime);
			$issue = trim($orderData['issue']);
			$lotteryId = trim($orderData['lotteryId']);
			$lotteryName = trim($orderData['lotteryName']);
			$status = $orderData['status'];
			$ticketStatus = $orderData['ticketStatus'];
			$ticketMultiple = (int)$orderData['ticketMultiple'];
			$ticketPassType = trim($orderData['ticketPassType']);
			$ticketSupplierId = (int)$orderData['ticketSupplierId'];
			$matchList = $orderData['matchList'];
			if ($lotteryId == 'JZYP') {
				$matchList = $this->commonService->setYaPanMatchListCache($matchList);
				foreach ($matchList as &$match) {
					$matchId = (int)$match['matchId'];
					$oddsId = (int)$match['oddsId'];
					$recommend = $match['recommend'];
					$recommendItem = trim($recommend[0]);
					$fixBettypeOdds = $match['fixBettypeOdds'];
					if ($matchId <= 0 || $oddsId <= 0 || !is_array($recommend) || count($recommend) != 1 || empty($recommendItem) || empty($fixBettypeOdds)) {
						continue;
					}
					$match['bettypeOdds']->$recommendItem = $fixBettypeOdds->$recommendItem;
				}
			}
			$calculateMaxPrizeAmountResp = $this->commonService->calculateMaxPrizeAmount($matchList, $ticketPassType, $ticketMultiple);
			if ($calculateMaxPrizeAmountResp->errCode != 0) {
				$this->resp->msg = '计算最大中奖金额异常';
				$this->jsonView->out($this->resp);
			}
			$maxTicketPrizeAmount = $calculateMaxPrizeAmountResp->data;
            $matchListIsSale = false;
            $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
            if ($matchListIsSaleResp->errCode == 0) {
                $matchListIsSale = true;
            }
            $isAllowBuyTicket = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
            $orderInfo = array();
            $orderInfo['publish'] = $publish;
			$orderInfo['issue'] = $issue;
			$orderInfo['lotteryId'] = $lotteryId;
			$orderInfo['lotteryName'] = $lotteryName;
            $orderInfo['isSelf'] = $userId == $orderData['userId'];
			$orderInfo['isSelfTicket'] = empty($planId) || empty($planUserId);
			$orderInfo['orderNumeric'] = $this->common->getOrderNumeric($orderData);
			$orderInfo['orderNo'] = $this->common->encodeNo($orderData['userId'], $orderData['orderId']);
			$orderInfo['planNickName'] = $orderData['planNickName'];
			$orderInfo['planRealName'] = $orderData['planRealName'];
			$orderInfo['planMatchType'] = (int)$orderData['planMatchType'];
			$orderInfo['ticketMultiple'] = $ticketMultiple;
			$orderInfo['ticketPassType'] = $ticketPassType;
			$orderInfo['amount'] = (int)$orderData['amount'];
			$orderInfo['status'] = (int)$status;
			$orderInfo['ticketStatus'] = (int)$ticketStatus;
			$orderInfo['ticketPrizeAmount'] = (int)$orderData['ticketPrizeAmount'];
			$orderInfo['ticketExpectPrizeAmount'] = (int)$orderData['ticketExpectPrizeAmount'];
			$orderInfo['ticketSendPrizeAmount'] = (int)$orderData['ticketSendPrizeAmount'];
			$orderInfo['ticketPrizeDivideStatus'] = (int)$orderData['ticketPrizeDivideStatus'];
			$orderInfo['ticketPrizeDivideAmount'] = (int)$orderData['ticketPrizeDivideAmount'];
            $orderInfo['ticketAttachPrizeAmount'] = (int)$orderData['ticketAttachPrizeAmount'];
			$orderInfo['maxTicketPrizeAmount'] = $maxTicketPrizeAmount;
            $orderInfo['maxTicketPrizeRate'] = sprintf('%.2f', $maxTicketPrizeAmount*100/$amount);
			$orderInfo['isTSP'] = $ticketSupplierId > 0;
			$orderInfo['isSale'] = $matchListIsSale && $isAllowBuyTicket;
			$orderInfo['createTime'] = $orderData['createTime'];
			$orderInfo['matchList'] = $matchList;
			$orderInfo['matchBettypeName'] = $orderData['matchBettypeName'];
			$orderInfo['resourceList'] = $orderData['resourceList'];
            $orderInfo['userCouponAmount'] = !empty($userCouponData) ? (int)$userCouponData['amount'] : 0;
            $orderInfo['betAmount'] = (int)($amount/$ticketMultiple);
            $show = false;
            //1:客户端，2:店长端
            if ($type == 2 || ($publish != 1 && ($planType == 0 || $planId <= 0 || $planUserId <= 0)) || ($publish == 1 && $userId == $orderData['userId']) || $userId == $planUserId || $planMatchBeginTime <= 0 || $planMatchBeginTime <= time()) {
                $show = true;
            } else if ($planType == 1) {
                //判断用户是否购买了方案
                $param = array();
                $param['planType'] = 1; //1=竞彩, 2=数字彩
                $param['orderType'] = 0;
                $param['userId'] = $userId;
                $param['planId'] = $planId;
                $param['status'] = 2;
                $selectOrderResp = $this->orderService->selectOrder($param);
                if ($selectOrderResp->errCode != 0) {
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
                $planOrderList = $selectOrderResp->data['list'];
                if (count($planOrderList) > 0) {
                    $show = true;
                }
            }
            if (!$show) {
                $orderInfo['resourceList'] = array();
                $orderInfo['matchList'] = array();
            }
            $user = new \stdClass();
            $ticketFollowGainAmount = 0;
            $followNo = '';
            $followCount = 0;//跟单数量
            if ($publish == 1) {
                $orderData = $this->commonService->setUserCache(array($orderData))[0];
                $orderData = $this->setBetTag(array($orderData))[0];
                $orderData = $this->setFollowGainAmount(array($orderData))[0];
                $user = $orderData['user'];
                $user['betTag'] = $orderData['betTag'];
                $ticketFollowGainAmount = (int)$orderData['followGainAmount'];
                $param = array(
                    'orderId' => $orderData['orderId'],
                    'justCount' => true
                );
                $getOrderFollowResp = $this->getOrderFollow($param);
                if ($getOrderFollowResp->errCode != 0 || empty($getOrderFollowResp->data)) {
                    $this->resp->msg = '订单跟单查询异常';
                    $this->jsonView->out($this->resp);
                }
                $orderFollowData = $getOrderFollowResp->data;
                $followNo = $this->common->encodeNo($orderData['userId'], $orderData['orderId']);
                $followCount = (int)$orderFollowData['totalCount'];
            } else if ($planType == -1) {
                $param = array(
                    'orderId' => $planId,
                    'justCount' => true
                );
                $getOrderFollowResp = $this->getOrderFollow($param);
                if ($getOrderFollowResp->errCode != 0 || empty($getOrderFollowResp->data)) {
                    $this->resp->msg = '订单跟单查询异常';
                    $this->jsonView->out($this->resp);
                }
                $orderFollowData = $getOrderFollowResp->data;
                $followNo = $this->common->encodeNo($planUserId, $planId);
                $followCount = (int)$orderFollowData['totalCount'];
            }
            $orderInfo['user'] = $user;
            $orderInfo['ticketFollowGainAmount'] = $ticketFollowGainAmount;
            $orderInfo['followNo'] = $followNo;
            $orderInfo['followCount'] = $followCount;
		} else if ($orderType == 7) {
			$orderData = $this->commonService->setLotteryIssueCache(array($orderData))[0];
			$orderData = $this->commonService->setResourceUrlCache(array($orderData), 'ticketImg')[0];
			$issue = trim($orderData['issue']);
			$lotteryId = trim($orderData['lotteryId']);
			$lotteryName = trim($orderData['lotteryName']);
			$betContent = trim($orderData['betContent']);
			$ticketAppend = (int)$orderData['ticketAppend'];
			$lotteryIssue = $orderData['lotteryIssue'];
			$drawNumber = trim($lotteryIssue['drawNumber']);
			$drawTime = trim($lotteryIssue['drawTime']);
			$betContentList = null;
			$calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize($lotteryId, $betContent, $lotteryIssue, $ticketAppend);
			if ($calculateDigitalPrizeResp->errCode == 0) {
				$betContentList = $calculateDigitalPrizeResp->data;
			}
			$planUserId = (int)$orderData['planUserId'];
			$planId = (int)$orderData['planId'];
			$status = $orderData['status'];
			$ticketStatus = $orderData['ticketStatus'];
			$ticketMultiple = (int)$orderData['ticketMultiple'];
			$ticketSupplierId = (int)$orderData['ticketSupplierId'];
			$orderInfo = array();
			$orderInfo['issue'] = $issue;
			$orderInfo['lotteryId'] = $lotteryId;
			$orderInfo['lotteryName'] = $lotteryName;
			$orderInfo['betContent'] = $betContent;
			$orderInfo['betContentList'] = $betContentList;
			$orderInfo['drawNumber'] = $drawNumber;
			$orderInfo['drawTime'] = $drawTime;
            $orderInfo['isSelf'] = $userId == $orderData['userId'];
			$orderInfo['isSelfTicket'] = empty($planId) || empty($planUserId);
			$orderInfo['orderNumeric'] = $this->common->getOrderNumeric($orderData);
			$orderInfo['orderNo'] = $this->common->encodeNo($orderData['userId'], $orderData['orderId']);
			$orderInfo['planNickName'] = $orderData['planNickName'];
			$orderInfo['planRealName'] = $orderData['planRealName'];
			$orderInfo['ticketMultiple'] = $ticketMultiple;
			$orderInfo['amount'] = (int)$orderData['amount'];
			$orderInfo['status'] = (int)$status;
			$orderInfo['ticketAppend'] = $ticketAppend;
			$orderInfo['ticketStatus'] = (int)$ticketStatus;
			$orderInfo['ticketPrizeAmount'] = (int)$orderData['ticketPrizeAmount'];
			$orderInfo['ticketExpectPrizeAmount'] = (int)$orderData['ticketExpectPrizeAmount'];
			$orderInfo['ticketSendPrizeAmount'] = (int)$orderData['ticketSendPrizeAmount'];
			$orderInfo['ticketAttachPrizeAmount'] = (int)$orderData['ticketAttachPrizeAmount'];
			$orderInfo['isTSP'] = $ticketSupplierId > 0;
			$orderInfo['createTime'] = $orderData['createTime'];
			$orderInfo['resourceList'] = $orderData['resourceList'];
            $orderInfo['userCouponAmount'] = !empty($userCouponData) ? (int)$userCouponData['amount'] : 0;
		} else if ($orderType == 9) {
            //如果有赔率就用planMatchRecommend的赔率，如果没有就查询表的及时赔率
            $orderData = $this->commonService->setGuessListCache(array($orderData))[0];
            $orderData = $this->commonService->setResourceUrlCache(array($orderData), 'ticketImg')[0];
            $lotteryId = trim($orderData['lotteryId']);
            $lotteryName = trim($orderData['lotteryName']);
            $status = $orderData['status'];
            $ticketStatus = $orderData['ticketStatus'];
            $ticketMultiple = (int)$orderData['ticketMultiple'];
            $ticketSupplierId = (int)$orderData['ticketSupplierId'];
            $guessList = $orderData['guessList'];
            $oddsArr = array();
            foreach ($guessList as $guess) {
                $oddsArr[] = trim($guess['odds']);
            }
            $sp = $this->common->roundSp(max($oddsArr) * 2, 2);//把sp,四舍六入五成双
            $maxTicketPrizeAmount = $sp * $ticketMultiple * 100;
            $orderInfo['lotteryId'] = $lotteryId;
            $orderInfo['lotteryName'] = $lotteryName;
            $orderInfo['isSelf'] = $userId == $orderData['userId'];
            $orderInfo['isSelfTicket'] = empty($planId) || empty($planUserId);
            $orderInfo['orderNumeric'] = $this->common->getOrderNumeric($orderData);
            $orderInfo['orderNo'] = $this->common->encodeNo($orderData['userId'], $orderData['orderId']);
            $orderInfo['planNickName'] = $orderData['planNickName'];
            $orderInfo['planRealName'] = $orderData['planRealName'];
            $orderInfo['ticketMultiple'] = $ticketMultiple;
            $orderInfo['amount'] = (int)$orderData['amount'];
            $orderInfo['status'] = (int)$status;
            $orderInfo['ticketStatus'] = (int)$ticketStatus;
            $orderInfo['ticketPrizeAmount'] = (int)$orderData['ticketPrizeAmount'];
            $orderInfo['ticketExpectPrizeAmount'] = (int)$orderData['ticketExpectPrizeAmount'];
            $orderInfo['ticketSendPrizeAmount'] = (int)$orderData['ticketSendPrizeAmount'];
            $orderInfo['ticketPrizeDivideStatus'] = (int)$orderData['ticketPrizeDivideStatus'];
            $orderInfo['ticketPrizeDivideAmount'] = (int)$orderData['ticketPrizeDivideAmount'];
            $orderInfo['ticketAttachPrizeAmount'] = (int)$orderData['ticketAttachPrizeAmount'];
            $orderInfo['maxTicketPrizeAmount'] = $maxTicketPrizeAmount;
            $orderInfo['isTSP'] = $ticketSupplierId > 0;
            $orderInfo['createTime'] = $orderData['createTime'];
            $orderInfo['guessList'] = $guessList;
            $orderInfo['resourceList'] = $orderData['resourceList'];
            $orderInfo['userCouponAmount'] = !empty($userCouponData) ? (int)$userCouponData['amount'] : 0;
        }
		$this->resp->data = $orderInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//我的跟单详情
	public function orderTicketList() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$this->resp->msg = 'orderNo参数有误';
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['orderId'] = $orderNoOrderId;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
			$this->resp->msg = "订单查询异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderResp->data['list'][0];
		if (empty($orderData)) {
			$this->resp->msg = '订单信息异常';
			$this->jsonView->out($this->resp);
		}
		$orderStatus = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param = array();
		$param['orderId'] = $orderNoOrderId;
		$param['orderBy'] = 1;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$this->resp->msg = '查询订单票异常';
			$this->jsonView->out($this->resp);
		}
		$ticketList = $selectTicketResp->data['list'];
		$data = array(
			'orderNumeric' => $this->common->getOrderNumeric($orderData),
			'list' => array()
		);
		foreach ($ticketList as $ticket) {
			$ticketId = (int)$ticket['ticketId'];
			$orderId = (int)$ticket['orderId'];
			$status = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($ticketId <= 0 || $orderId <= 0) {
				continue;
			}
			if ($status == 5 && $orderStatus != 4) {
				$status = 1;//确保'已撤单'时，status==5才是前端显示的'已退款'
			}
			$orderInfo = array();
			$orderInfo['lotteryId'] = trim($ticket['lotteryId']);
			$orderInfo['lotteryName'] = trim($ticket['lotteryName']);
			$orderInfo['status'] = $status;//前端显示出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已退款
			$orderInfo['unit'] = (int)$ticket['unit'];
			$orderInfo['multiple'] = (int)$ticket['multiple'];
			$orderInfo['amount'] = (int)$ticket['amount'];
			$orderInfo['issue'] = trim($ticket['issue']);
			$orderInfo['prizeAmount'] = (int)$ticket['prizeAmount'];
			$orderInfo['printNo'] = trim($ticket['printNo']);
			$orderInfo['printTime'] = trim($ticket['printTime']);
			$orderInfo['createTime'] = trim($ticket['createTime']);
			$data['list'][] = $orderInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//拒绝出票
	public function refuseTicket() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if ($orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$this->resp->msg = "订单编号异常";
			$this->jsonView->out($this->resp);
		}
		$selectOrderResp = $this->orderService->selectOrderById($orderNoOrderId);
		if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
			$this->resp->msg = "订单查询异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderResp->data;
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		$ticketUserId = (int)$orderData['ticketUserId'];
		$orderType = (int)$orderData['orderType'];
		$status = (int)$orderData['status'];
		$planMatchType = (int)$orderData['planMatchType'];
		$planMatchRecommend = trim($orderData['planMatchRecommend']);
		$planMatchRecommend = json_decode($planMatchRecommend);
		$planMatchLength = count($planMatchRecommend);
		$ticketStatus = (int)$orderData['ticketStatus'];
		$ticketMultiple = (int)$orderData['ticketMultiple'];
		$ticketPassType = trim($orderData['ticketPassType']);
		$amount = (int)$orderData['amount'];
		if ($userId != $ticketUserId || $orderType != 3 || $status != 2) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketStatus != 0) {
			$this->resp->msg = "订单状态异常";
			$this->jsonView->out($this->resp);
		}
		$param = array(
            'userId' => (int)$orderData['userId'],
			'refuseUserId' => $userId,
			'refuseOrderId' => $orderNoOrderId,
			'matchType' => $planMatchType,//比赛类型, 1=足球, 2=篮球
			'matchLength' => $planMatchLength,
			'ticketMultiple' => $ticketMultiple,//倍数
			'ticketPassType' => $ticketPassType,//过关方式
			'amount' => $amount//金额
		);
		$ticketSupplierResp = $this->orderService->getTicketSupplier($param);
		if ($ticketSupplierResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$ticketSupplier = $ticketSupplierResp->data;
		$ticketUserId = (int)$ticketSupplier['userId'];
		$ticketNickName = trim($ticketSupplier['nickName']);
		$ticketRealName = trim($ticketSupplier['realName']);
		$ticketSupplierId = (int)$ticketSupplier['ticketSupplierId'];
		$ticketSupplierName = trim($ticketSupplier['ticketSupplierName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单票状态
			$updateOrderField = array();
			$updateOrderField[] = 'ticketUserId="' . $database->escape($ticketUserId) . '"';
			$updateOrderField[] = 'ticketNickName="' . $database->escape($ticketNickName) . '"';
			$updateOrderField[] = 'ticketRealName="' . $database->escape($ticketRealName) . '"';
			$updateOrderField[] = 'ticketSupplierId="' . $database->escape($ticketSupplierId) . '"';
			$updateOrderField[] = 'ticketSupplierName="' . $database->escape($ticketSupplierName) . '"';
			$updateOrderSql = 'update t_order set '.implode(',', $updateOrderField).' where ticketStatus=0 and orderId="' . $orderNoOrderId . '" limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新订单异常";
				$this->jsonView->out($this->resp);
			}
			//插入出票拒绝表
			$insertTicketRefuseField = array();
			$insertTicketRefuseField[] = 'userId="' . $database->escape($userId) . '"';
			$insertTicketRefuseField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertTicketRefuseField[] = 'realName="' . $database->escape($realName) . '"';
			$insertTicketRefuseField[] = 'orderId="' . $database->escape($orderNoOrderId) . '"';
			$insertTicketRefuseField[] = 'createTime=now()';
			$insertTicketRefuseSql = 'insert into t_ticket_refuse set ' . implode(',', $insertTicketRefuseField);
			$insertTicketRefuseResult = $database->execute($insertTicketRefuseSql);
			$insertTicketRefuseInsertId = (int)$database->getInsertId();
			if (!$insertTicketRefuseResult || $insertTicketRefuseInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入拒绝异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			$message = requireModule('Message');
			if ($ticketUserId > 0) {
				$message->publish('payOrderForStation', $orderNoOrderId);
			} else if ($ticketSupplierId > 0) {
				$message->publish('payOrderForTicketDeal', $orderNoOrderId);
			}
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
	}

	//上传票样成功->出票成功调用接口
	public function uploadTicket() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$ticketImg = $this->common->getParam("ticketImg", null);
		$isWeixinTicketImg = $ticketImg['tmp_name'] ? false : true; //看是否是微信端上传的
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if ($orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$this->resp->msg = "订单编号异常";
			$this->jsonView->out($this->resp);
		}
		$selectOrderResp = $this->orderService->selectOrderById($orderNoOrderId);
		if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
			$this->resp->msg = "订单查询异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderResp->data;
		$userId = $this->loginUserInfo['userId'];
		$ticketUserId = (int)$orderData['ticketUserId'];
		$orderType = (int)$orderData['orderType'];
		$status = (int)$orderData['status'];
		$ticketStatus = (int)$orderData['ticketStatus'];
		if ($userId != $ticketUserId || $orderType != 3 || $status != 2) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		if ($ticketStatus != 0 && $ticketStatus != 2) {
			$this->resp->msg = "订单状态异常";
			$this->jsonView->out($this->resp);
		}
		if (($isWeixinTicketImg)) {
			if (count($ticketImg) <= 0) {
				$this->resp->msg = "ticketImg不能为空";
				$this->jsonView->out($this->resp);
			}
		} else {
			if (count($ticketImg['tmp_name']) <= 0) {
				$this->resp->msg = "ticketImg不能为空";
				$this->jsonView->out($this->resp);
			}
		}
		$ticketImgResourceIdArr = [];
		if ($isWeixinTicketImg) {
			for ($i = 0, $length = count($ticketImg); $i < $length; $i++) {
				$serverId = trim($ticketImg[$i]);
				if (empty($serverId)) {
					continue;
				}
				$respWeixin = $this->commonService->saveWeixinFile($serverId);
				if ($respWeixin->errCode == 0) {
					$resourceId = (int)$respWeixin->data;
					if ($resourceId > 0) {
						$ticketImgResourceIdArr[] = $resourceId;
					}
				}
			}
		}  else {
			//生成方案关联的图片
			$fileCount = count($ticketImg['tmp_name']);
			if (is_array($ticketImg) && $fileCount > 0) {
				for ($i = 0; $i < $fileCount; $i++) {
					$fileType = trim($ticketImg["type"][$i]);
					$name = trim($ticketImg['name'][$i]);
					$tmpName = trim($ticketImg['tmp_name'][$i]);
					if (empty($name) || empty($tmpName)) {
						continue;
					}
					$error = (int)$ticketImg['error'][$i];
					$size = (int)$ticketImg['size'][$i];
					$maxSize = 2*1024*1024;//2MB
					if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png"' || $fileType == 'image/x-png"' ||  $fileType == 'image/gif')) {
						$pathInfo = pathinfo($name);
						$fileName = trim($pathInfo['filename']);
						$extension = trim($pathInfo['extension']);
						$respUpload = $this->commonService->saveUploadFile($tmpName, $fileName, $extension);
						if ($respUpload->errCode == 0) {
							$resourceId = (int)$respUpload->data;
							if ($resourceId > 0) {
								$ticketImgResourceIdArr[] = $resourceId;
							}
						}
					}
				}
			}
		}
		if (count($ticketImgResourceIdArr) <= 0) {
			$this->resp->msg = "请上传票样";
			$this->jsonView->out($this->resp);
		}
		//更新固化赔率
		$planMatchRecommend = trim($orderData['planMatchRecommend']);
		$planMatchRecommend = json_decode($planMatchRecommend);
		if (empty($planMatchRecommend)) {
			$this->resp->msg = "选择的比赛信息有误";
			$this->jsonView->out($this->resp);
		}
		//先删除固化赔率，目的是为了拿到最新赔率
		foreach ($planMatchRecommend as &$matchRecommend) {
			unset($matchRecommend->concede);
			unset($matchRecommend->bettypeOdds);
		}
		$orderData['planMatchRecommend'] = trim(json_encode($planMatchRecommend));
		$orderData = $this->commonService->setMatchList(array($orderData), 'planMatchRecommend')[0];
		$matchList = $orderData['matchList'];
		$concedeMap = array();//固化大小分, 让分，让球
		$oddsMap = array();
		foreach ($matchList as $match) {
			$oddsId = (int)$match['oddsId'];
			$concede = trim($match['concede']);
			$bettypeOdds = $match['bettypeOdds'];
			//固化大小分, 让分，让球
			$concedeMap[$oddsId] = $concede;
			$oddsMap[$oddsId] = $bettypeOdds;
		}
		foreach ($planMatchRecommend as &$matchRecommend) {
			$oddsId = $matchRecommend->oddsId;
			$matchRecommend->concede = $concedeMap[$oddsId];
			$matchRecommend->bettypeOdds = $oddsMap[$oddsId];
		}
		$planMatchRecommend = trim(json_encode($planMatchRecommend));
		if (empty($planMatchRecommend)) {
			$this->resp->msg = "比赛信息匹配有误";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		$field = array();
		$field[] = 'ticketImg="' . $database->escape(trim(implode(',', $ticketImgResourceIdArr))) . '"';
		$field[] = 'ticketStatus="2"';
		$field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
		$sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderNoOrderId . '" and orderType=3 and status=2 and ticketStatus in(0,2) limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$database->close();
		$this->sendUploadTicketMessage($orderNoOrderId);
		$this->resp->errCode = 0;
		$this->resp->msg = "上传票样成功";
		$this->jsonView->out($this->resp);
	}

	private function sendUploadTicketMessage($orderId) {
		$resp = requireModule('Resp');
		if ($orderId <= 0) {
			$resp->msg = '参数有误';
			return $resp;
		}
		$selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
		if ($selectOrderByIdResp->errCode != 0) {
			$resp->msg = '查询订单异常';
			return $resp;
		}
		$orderData = $selectOrderByIdResp->data;
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		$orderNumeric = $this->common->getOrderNumeric($orderData);
		if (!is_numeric($orderNumeric)) {
			$resp->msg = 'orderNumeric有误';
			return $resp;
		}
		$orderType = (int)$orderData['orderType'];
		if ($orderType != 3) {
			$resp->msg = 'orderType有误';
			return $resp;
		}
		$ticketStatus = (int)$orderData['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖
		if ($ticketStatus != 2) {
			$resp->msg = 'ticketStatus有误';
			return $resp;
		}
		$orderId = (int)$orderData['orderId'];
		$userId = (int)$orderData['userId'];
		$orderNo = $this->common->encodeNo($userId, $orderId);
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$user = $selectUserByIdResp->data;
		if (empty($user)) {
			$resp->msg = '查询用户不存在';
			return $resp;
		}
		$openId = trim($user['openId']);
		$subscribe = (int)$user['subscribe'];
		if (empty($openId)) {
			$resp->msg = '无效的openId';
			return $resp;
		}
		if ($subscribe != 1) {
			$resp->msg = '未关注公众号';
			return $resp;
		}
		global $curEnv;
		$url = '';
		if ($curEnv == 'dist') {
			$url = 'http://www.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'cXhjQyqWxKuWS1-uwNN3D9QTH8SOfuiar89xfMUGcqs';
		} else if ($curEnv == 'beta') {
			$url = 'http://beta.shaimii.com/#ticketOrderDetail&orderNo='.$orderNo;
			$templateId = 'oG9cBfktMr1W_P4FGZIFrOr3ZpRxBBX0eh-RkI4cb5Y';
		}
		$data = array();
		$data['first'] = array('value' => '请核实票样，如有问题，请联系客服微信号：shaimichang', 'color' => '#000000');
		$data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
		$data['keyword2'] = array('value' => '已出票', 'color' => '#000000');
		$data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
		$jssdk = requireModule('Jssdk');
		$postJson = array(
			'touser' => $openId,
			'template_id' => $templateId,
			'url' => $url,
			'data' => $data
		);
		$accessToken = $jssdk->getAccessToken();
		$url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
		$param = json_encode($postJson);
		$httpPostResp = $jssdk->httpPost($url, $param);
		$respJson = json_decode($httpPostResp);
		if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
			$this->common->logger->info('发送模版消息异常：'.$httpPostResp);
			$resp->msg = '发送模版消息异常：'.$httpPostResp;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//店长派奖操作
	public function sendTicketPrize() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$orderNo = trim($this->common->getParam("orderNo", ''));
		$ticketPrizeAmount = (int)$this->common->getParam("ticketPrizeAmount", 0);
		if ($ticketPrizeAmount <= 0) {
			$this->resp->msg = "派奖金额有误";
			$this->jsonView->out($this->resp);
		}
		$orderNoArr = $this->common->decodeNo($orderNo);
		$orderNoUserId = (int)$orderNoArr['userId'];
		$orderNoOrderId = (int)$orderNoArr['id'];
		if ($orderNoUserId <= 0 || $orderNoOrderId <= 0) {
			$this->resp->msg = "订单编号异常";
			$this->jsonView->out($this->resp);
		}
		$selectOrderResp = $this->orderService->selectOrderById($orderNoOrderId);
		if ($selectOrderResp->errCode != 0 || empty($selectOrderResp->data)) {
			$this->resp->msg = "订单查询异常";
			$this->jsonView->out($this->resp);
		}
		$orderData = $selectOrderResp->data;
		$userId = $this->loginUserInfo['userId'];
		$ticketUserId = (int)$orderData['ticketUserId'];
		$orderType = (int)$orderData['orderType'];
		$status = (int)$orderData['status'];
		$ticketStatus = (int)$orderData['ticketStatus'];
		if ($userId != $ticketUserId || $orderType != 3 || $status != 2 || ($ticketStatus != 4 && $ticketStatus != 6)) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		if ((int)$orderData['ticketPrizeAmount'] > 0) {
			$this->resp->msg = "已填写过金额";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		//更新订单状态
		$sql = 'update t_order set ticketPrizeAmount="' . $database->escape($ticketPrizeAmount) . '" where orderId="' . $orderNoOrderId . '" and ticketPrizeAmount=0 and orderType=3 and status=2 and ticketStatus in(4,6) limit 1';
		$result = $database->execute($sql);
		if (!$result) {
			$database->close();
			$this->resp->msg = "中奖金额修改失败";
			$this->jsonView->out($this->resp);
		}
		$database->close();
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//创建自选出票订单
	public function createSelfTicketOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		$isABT = (bool)$this->commonService->isAllowBuyTicket($userId);
		if (!$isABT) {
			$this->resp->msg = "暂不能购买";
			$this->jsonView->out($this->resp);
		}
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通
		$ticketMultiple = (int)$this->common->getParam("ticketMultiple", 1);//投注倍数
		$ticketPassType = $this->common->getParam("ticketPassType", '');//过关方式
		$matchType = (int)$this->common->getParam("matchType", 0);
		$matchRecommend = trim($this->common->getParam("matchRecommend", ''));//比赛信息
		$lotteryId = trim($this->common->getParam("lotteryId", ''));//比赛信息
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
		if ($ticketMultiple <= 0 || $ticketMultiple > 100000) {
			$this->resp->msg = "ticketMultiple参数有误";
			$this->jsonView->out($this->resp);
		}
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
		if ($matchType <= 0) {
			$this->resp->msg = "比赛类型有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($matchRecommend)) {
			$this->resp->msg = "比赛不能为空";
			$this->jsonView->out($this->resp);
		}
		if (!empty($lotteryId) && $lotteryId != 'JZYP') {
			$this->resp->msg = "彩种id异常";
			$this->jsonView->out($this->resp);
		}
		$mockPlan = array('matchRecommend' => $matchRecommend);
		$mockPlanData = $this->commonService->setMatchList(array($mockPlan))[0];
		$planMatchList = $mockPlanData['matchList'];
		if (empty($mockPlanData) || empty($planMatchList) || !is_array($planMatchList) || count($planMatchList) <= 0) {
			$this->resp->msg = "比赛信息有误";
			$this->jsonView->out($this->resp);
		}
		$lotteryName = '';
		if (empty($lotteryId)) {
			if ($matchType == 1) {
				$lotteryId = 'JCZQ';
				$lotteryName = '竞彩足球';
			} else if ($matchType == 2) {
				$lotteryId = 'JCLQ';
				$lotteryName = '竞彩篮球';
			}
		} else if ($lotteryId == 'JZYP') {
			$lotteryName = '竞足亚盘';
			//设置亚盘“matchRecommend”
			//matchRecommend:[{"matchId":31967,"oddsId":66819,"recommend":["F"]},{"matchId":31968,"oddsId":66824,"recommend":["F"]}]
			$planMatchList = $this->commonService->setYaPanMatchListCache($planMatchList);
			$yaPanMatchRecommend = array();
			foreach ($planMatchList as &$match) {
				$matchId = (int)$match['matchId'];
				$oddsId = (int)$match['oddsId'];
				$recommend = $match['recommend'];
				$recommendItem = trim($recommend[0]);
				$recommendBettype = $match['recommendBettype'];
				$recommendBettypeItem = $recommendBettype->$recommendItem;
				$recommendBettypeItemOddsId = (int)$recommendBettypeItem['oddsId'];
				$recommendBettypeItemConcede = trim($recommendBettypeItem['concede']);
				$recommendBettypeItemBettypeOdds = $recommendBettypeItem['bettypeOdds'];
				if ($matchId <= 0 || $oddsId <= 0 || !is_array($recommend) || count($recommend) != 1 || empty($recommendItem) || empty($recommendBettype) || empty($recommendBettypeItem) || $recommendBettypeItemOddsId <= 0 || empty($recommendBettypeItemBettypeOdds)) {
					continue;
				}
				//recommend对应的赔率内容
				$match['oddsId'] = $recommendBettypeItemOddsId;
				$match['concede'] = $recommendBettypeItemConcede;
				$match['bettypeOdds'] = $recommendBettypeItemBettypeOdds;
				$yaPanMatchRecommend[] = array(
					'matchId' => $matchId,
					'oddsId' => $recommendBettypeItemOddsId,
					'recommend' => $recommend
				);
			}
			$matchRecommend = json_encode($yaPanMatchRecommend);
			unset($match);//释放指针变量，防止下面同名变量，影响$match原来值
		}
		//得到最早的比赛时间
		$matchBeginTime = null;
		$concedeMap = array();//固化大小分, 让分，让球
		$oddsMap = array();
		$matchMap = array();
		foreach ($planMatchList as $match) {
			$matchId = (int)$match['matchId'];
			$oddsId = (int)$match['oddsId'];
			$concede = trim($match['concede']);
			$bettypeOdds = $match['bettypeOdds'];
			if ($matchId <= 0) {
				$this->resp->msg = "比赛有误";
				$this->jsonView->out($this->resp);
			}
			if ($oddsId <= 0) {
				$this->resp->msg = "比赛赔率有误";
				$this->jsonView->out($this->resp);
			}
			$beginTime = trim($match['beginTime']);
			if (!empty($beginTime) && (empty($matchBeginTime) || $beginTime < $matchBeginTime)) {
				$matchBeginTime = $beginTime;
			}
			//固化大小分, 让分，让球
			$concedeMap[$oddsId] = $concede;
			$oddsMap[$oddsId] = $bettypeOdds;
			$matchMap[$matchId.'-'.$oddsId] = $match;
		}
		if (empty($matchBeginTime)) {
			$this->resp->msg = "比赛时间有误";
			$this->jsonView->out($this->resp);
		}
		//固化大小分, 让分，让球, 固化玩法赔率
		$matchRecommend = json_decode($matchRecommend);
		foreach ($matchRecommend as &$r) {
			$matchId = (int)$r->matchId;
			$oddsId = (int)$r->oddsId;
			if ($matchId <= 0) {
				$this->resp->msg = "比赛有误";
				$this->jsonView->out($this->resp);
			}
			if ($oddsId <= 0) {
				$this->resp->msg = "比赛赔率有误";
				$this->jsonView->out($this->resp);
			}
			$r->concede = $concedeMap[$oddsId];
			$r->bettypeOdds = $oddsMap[$oddsId];
		}
		$matchLength = count($matchRecommend);
		$matchRecommend = trim(json_encode($matchRecommend));
		//过关方式
		$ticketPassTypeArr = array();
		if (is_array($ticketPassType) && count($ticketPassType) > 0) {
			foreach ($ticketPassType as $p) {
				$p = trim($p);
				if (preg_match('/^\d+x1$/', $p)) {
					$ticketPassTypeArr[] = $p;
				}
			}
		}
		if (count($ticketPassTypeArr) <= 0) {
			$ticketPassTypeArr[] = $matchLength.'x1';
		}
		$ticketPassType = implode(',', $ticketPassTypeArr);
		$calculateTicketResp = $this->commonService->calculateTicket($matchRecommend, $ticketPassType);
		if ($calculateTicketResp->errCode != 0) {
			$this->resp->msg = $calculateTicketResp->msg;
			$this->jsonView->out($this->resp);
		}
		$ticketPassTypeMap = $calculateTicketResp->data;
		$ticketUnit = 0;
		foreach ($ticketPassTypeMap as $item) {
			$unit = (int)$item['ticketUnit'];
			$mr = $item['matchRecommend'];
			if ($unit <= 0 || !is_array($mr) || count($mr) <= 0) {
				$this->resp->msg = '过关赛事异常';
				$this->jsonView->out($this->resp);
			}
			$ticketUnit += $unit;
			foreach ($mr as $m) {
				$m = json_decode($m);
				if (empty($m)) {
					$this->resp->msg = '过关赛事异常';
					$this->jsonView->out($this->resp);
				}
				$matchList = array();
				foreach ($m as $r) {
					$matchId = (int)$r->matchId;
					$oddsId = (int)$r->oddsId;
					$match = $matchMap[$matchId.'-'.$oddsId];
					if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
						$this->resp->msg = '过关赛事异常';
						$this->jsonView->out($this->resp);
					}
					$matchList[] = $match;
				}
				$matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
				if ($matchListIsSaleResp->errCode != 0) {
					$this->resp->msg = $matchListIsSaleResp->msg;
					$this->jsonView->out($this->resp);
				}
			}
		}
		if ($ticketUnit <= 0) {
			$this->resp->msg = '订单注数异常';
			$this->jsonView->out($this->resp);
		}
		$amount = (int)($ticketMultiple*$ticketUnit*2*100);
		$param = array(
            'userId' => $userId,
			'matchType' => $matchType,//比赛类型, 1=足球, 2=篮球
			'matchLength' => $matchLength,
			'ticketMultiple' => $ticketMultiple,//倍数
			'ticketPassType' => $ticketPassType,//过关方式
			'amount' => $amount,//金额
            'lotteryId' => $lotteryId
		);
		$ticketSupplierResp = $this->orderService->getTicketSupplier($param);
		if ($ticketSupplierResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$ticketSupplier = $ticketSupplierResp->data;
		if (empty($ticketSupplier)) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$ticketAttachPrizeStatus = 0;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        if ($matchLength == 1 && !empty($planMatchList[0]) && !empty($planMatchList[0]['bettypeContent']) && in_array($planMatchList[0]['bettypeContent'], array('SPF','RQSPF','RFSF','DXF'))) {
            $ticketAttachPrizeStatus = 1;
        } else if ($matchLength == 2 && $ticketPassType == '2x1') {
            $ticketAttachPrizeStatus = 1;
        }
        //优惠券信息
		$userCouponId = 0;
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = 1; //资金类型, 0=方案, 1=出票
        $param['couponType'] = 1; //优惠券类型, 1=消费, 2=充值
        $param['amount'] = $amount;
        $param['source'] = $source;
        $param['channel'] = $channel;
        $param['lotteryId'] = $lotteryId;
		$getUserCouponResp = $this->getUserCoupon($param);
		if ($getUserCouponResp->errCode == 0 && !empty($getUserCouponResp->data)) {
			$userCouponId = (int)$getUserCouponResp->data['userCouponId'];
		}
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['orderType'] = 3;
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
		$param['planId'] = 0;
		$param['planUserId'] = 0;
		$param['planNickName'] = '';
		$param['planRealName'] = '';
		$param['planMatchType'] = $matchType;
		$param['planMatchRecommend'] = $matchRecommend;
		$param['planMatchBeginTime'] = $matchBeginTime;
		$param['amount'] = $amount;
		$param['status'] = 1;
		$param['userCouponId'] = $userCouponId;
		$param['ticketUnit'] = $ticketUnit;
		$param['ticketMultiple'] = $ticketMultiple;
		$param['ticketPassType'] = $ticketPassType;
		$param['ticketUserId'] = (int)$ticketSupplier['userId'];
		$param['ticketNickName'] = trim($ticketSupplier['nickName']);
		$param['ticketRealName'] = trim($ticketSupplier['realName']);
		$param['ticketSupplierId'] = (int)$ticketSupplier['ticketSupplierId'];
		$param['ticketSupplierName'] = trim($ticketSupplier['ticketSupplierName']);
		$param['ticketAttachPrizeStatus'] = $ticketAttachPrizeStatus;
		$param['lotteryId'] = $lotteryId;
		$param['lotteryName'] = $lotteryName;
		$param['source'] = $source;
		$param['channel'] = $channelValid ? $channel : 0;
		$insertOrderResp = $this->orderService->insertOrder($param);
		if ($insertOrderResp->errCode != 0) {
			$this->resp->msg = "添加订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderId = (int)$insertOrderResp->data;
		if ($orderId <= 0) {
			$this->resp->msg = "添加订单失败";
			$this->jsonView->out($this->resp);
		}
		$orderNo = $this->common->encodeNo($userId, $orderId);
		if ($source == 0) {
			$redirectUrl .= '&orderNo='.$orderNo;
		}
		$pay = requireModule("Pay");
		$param = array();
		$param['orderNo'] = $orderNo;
		$param['redirectUrl'] = $redirectUrl;
		$param['tradeType'] = $tradeType;
		$payOrderResp = $pay->payOrder($param);
		if ($payOrderResp->errCode != 0) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payOrderData = $payOrderResp->data;
		if (empty($payOrderData)) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payUrl = trim($payOrderData['payUrl']);
		$this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//批量出票单
	public function createBatchTicketOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
		$userId = (int)$this->loginUserInfo['userId'];
		$nickName = trim($this->loginUserInfo['nickName']);
		$realName = trim($this->loginUserInfo['realName']);
		$isABT = (bool)$this->commonService->isAllowBuyTicket($userId);
		if (!$isABT) {
			$this->resp->msg = "暂不能购买";
			$this->jsonView->out($this->resp);
		}
		$source = (int)$this->common->getParam("source", 0);//来源, 0=h5, 1=android, 2=ios
		$channel = (int)$this->loginUserInfo['channel'];
		$tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通
		$betContent = trim($this->common->getParam("betContent", ''));//投注内容
		$betContent = json_decode($betContent, true);
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
		if ($tradeType == 3 && $source != 2) {
			$this->resp->msg = "参数有误";
			$this->jsonView->out($this->resp);
		}
		if (!is_array($betContent) || count($betContent) <= 0) {
			$this->resp->msg = "投注内容有误";
			$this->jsonView->out($this->resp);
		}
		$matchTypeArr = array();
		$ticketMultipleArr = array();
		$matchRecommendArr = array();
		$ticketPassTypeArr = array();
		foreach ($betContent as $b) {
			$matchType = (int)$b['matchType'];
			$ticketMultiple = (int)$b['ticketMultiple'];
			$matchRecommend = $b['matchRecommend'];
			$ticketPassType = $b['ticketPassType'];
			if ($matchType <= 0) {
				$this->resp->msg = "比赛类型异常";
				$this->jsonView->out($this->resp);
			}
			if ($ticketMultiple <= 0) {
				$this->resp->msg = "倍数异常";
				$this->jsonView->out($this->resp);
			}
			if (!is_array($matchRecommend) || count($matchRecommend) <= 0) {
				$this->resp->msg = "比赛选项异常";
				$this->jsonView->out($this->resp);
			}
			foreach ($matchRecommend as $r) {
				$oddsId = (int)$r['oddsId'];
				$matchId = (int)$r['matchId'];
				$recommend = $r['recommend'];
				if ($oddsId <= 0 || $matchId <= 0 || !is_array($recommend) || count($recommend) <= 0) {
					$this->resp->msg = "比赛异常";
					$this->jsonView->out($this->resp);
				}
			}
			//过关方式
			if (!is_array($ticketPassType) || count($ticketPassType) <= 0) {
				$this->resp->msg = "过关方式异常";
				$this->jsonView->out($this->resp);
			}
			foreach ($ticketPassType as $p) {
				$p = trim($p);
				if (!preg_match('/^\d+x1$/', $p)) {
					$this->resp->msg = "过关方式格式异常";
					$this->jsonView->out($this->resp);
				}
			}
			$matchTypeArr[] = $matchType;
			$ticketMultipleArr[] = $ticketMultiple;
			$matchRecommendArr[] = json_encode($matchRecommend);
			$ticketPassTypeArr[] = implode(',', $ticketPassType);
		}
		if (count($matchTypeArr) <= 0 || count($matchTypeArr) != count($ticketMultipleArr) || count($ticketMultipleArr) != count($matchRecommendArr) || count($matchRecommendArr) != count($ticketPassTypeArr)) {
			$this->resp->msg = "投注格式有误";
			$this->jsonView->out($this->resp);
		}
		$mockPlanList = array();
		foreach ($matchRecommendArr as $matchRecommend) {
			$mockPlanList[] = array('matchRecommend' => $matchRecommend);
		}
		$mockPlanList = $this->commonService->setMatchList($mockPlanList);
		if (count($mockPlanList) <= 0 || count($mockPlanList) != count($matchTypeArr)) {
			$this->resp->msg = "比赛场次有误";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule("Database");
		$sqlArr = array();
		$totalAmount = 0;
		for ($i = 0, $length = count($mockPlanList); $i < $length; $i++) {
			$mockPlan = $mockPlanList[$i];
			$matchType = (int)$matchTypeArr[$i];
			$ticketMultiple = (int)$ticketMultipleArr[$i];
			$matchRecommend = $mockPlan['matchRecommend'];
			$planMatchList = $mockPlan['matchList'];
			$ticketPassType = trim($ticketPassTypeArr[$i]);
			if (empty($mockPlan) || $matchType <= 0 || $ticketMultiple <= 0 || empty($matchRecommend) || !is_array($planMatchList) || count($planMatchList) <= 0 || empty($ticketPassType)) {
				$this->resp->msg = "比赛信息有误";
				$this->jsonView->out($this->resp);
			}
			//得到最早的比赛时间
			$matchBeginTime = null;
			$concedeMap = array();//固化大小分, 让分，让球
			$oddsMap = array();
			$matchMap = array();
			foreach ($planMatchList as $match) {
				$matchId = (int)$match['matchId'];
				$oddsId = (int)$match['oddsId'];
				$concede = trim($match['concede']);
				$bettypeOdds = $match['bettypeOdds'];
				if ($matchId <= 0) {
					$this->resp->msg = "比赛有误";
					$this->jsonView->out($this->resp);
				}
				if ($oddsId <= 0) {
					$this->resp->msg = "比赛赔率有误";
					$this->jsonView->out($this->resp);
				}
				$beginTime = trim($match['beginTime']);
				if (!empty($beginTime) && (empty($matchBeginTime) || $beginTime < $matchBeginTime)) {
					$matchBeginTime = $beginTime;
				}
				//固化大小分, 让分，让球
				$concedeMap[$oddsId] = $concede;
				$oddsMap[$oddsId] = $bettypeOdds;
				$matchMap[$matchId.'-'.$oddsId] = $match;
			}
			if (empty($matchBeginTime)) {
				$this->resp->msg = "比赛时间有误";
				$this->jsonView->out($this->resp);
			}
			//固化大小分, 让分，让球, 固化玩法赔率
			$matchRecommend = json_decode($matchRecommend);
			foreach ($matchRecommend as &$r) {
				$matchId = (int)$r->matchId;
				$oddsId = (int)$r->oddsId;
				if ($matchId <= 0) {
					$this->resp->msg = "比赛有误";
					$this->jsonView->out($this->resp);
				}
				if ($oddsId <= 0) {
					$this->resp->msg = "比赛赔率有误";
					$this->jsonView->out($this->resp);
				}
				$r->concede = $concedeMap[$oddsId];
				$r->bettypeOdds = $oddsMap[$oddsId];
			}
			$matchLength = count($matchRecommend);
			$matchRecommend = trim(json_encode($matchRecommend));
			$calculateTicketResp = $this->commonService->calculateTicket($matchRecommend, $ticketPassType);
			if ($calculateTicketResp->errCode != 0) {
				$this->resp->msg = $calculateTicketResp->msg;
				$this->jsonView->out($this->resp);
			}
			$ticketPassTypeMap = $calculateTicketResp->data;
			$ticketUnit = 0;
			foreach ($ticketPassTypeMap as $item) {
				$unit = (int)$item['ticketUnit'];
				$mr = $item['matchRecommend'];
				if ($unit <= 0 || !is_array($mr) || count($mr) <= 0) {
					$this->resp->msg = '过关赛事异常';
					$this->jsonView->out($this->resp);
				}
				$ticketUnit += $unit;
				foreach ($mr as $m) {
					$m = json_decode($m);
					if (empty($m)) {
						$this->resp->msg = '过关赛事异常';
						$this->jsonView->out($this->resp);
					}
					$matchList = array();
					foreach ($m as $r) {
						$matchId = (int)$r->matchId;
						$oddsId = (int)$r->oddsId;
						$match = $matchMap[$matchId.'-'.$oddsId];
						if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
							$this->resp->msg = '过关赛事异常';
							$this->jsonView->out($this->resp);
						}
						$matchList[] = $match;
					}
					$matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
					if ($matchListIsSaleResp->errCode != 0) {
						$this->resp->msg = $matchListIsSaleResp->msg;
						$this->jsonView->out($this->resp);
					}
				}
			}
			if ($ticketUnit <= 0) {
				$this->resp->msg = '订单注数异常';
				$this->jsonView->out($this->resp);
			}
			$amount = (int)($ticketMultiple*$ticketUnit*2*100);
			$param = array(
                'userId' => $userId,
				'matchType' => $matchType,//比赛类型, 1=足球, 2=篮球
				'matchLength' => $matchLength,
				'ticketMultiple' => $ticketMultiple,//倍数
				'ticketPassType' => $ticketPassType,//过关方式
				'amount' => $amount
			);
			$ticketSupplierResp = $this->orderService->getTicketSupplier($param);
			if ($ticketSupplierResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$ticketSupplier = $ticketSupplierResp->data;
			if (empty($ticketSupplier)) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$ticketAttachPrizeStatus = 0;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
            if ($matchLength == 1 && !empty($planMatchList[0]) && !empty($planMatchList[0]['bettypeContent']) && in_array($planMatchList[0]['bettypeContent'], array('SPF','RQSPF','RFSF','DXF'))) {
                $ticketAttachPrizeStatus = 1;
			} else if ($matchLength == 2 && $ticketPassType == '2x1') {
				$ticketAttachPrizeStatus = 1;
			}
			$lotteryId = '';
			$lotteryName = '';
			if ($matchType == 1) {
				$lotteryId = 'JCZQ';
				$lotteryName = '竞彩足球';
			} else if ($matchType == 2) {
				$lotteryId = 'JCLQ';
				$lotteryName = '竞彩篮球';
			}
			$field = array();
			$field[] = 'userId="' . $database->escape($userId) . '"';
			$field[] = 'nickName="' . $database->escape($nickName) . '"';
			$field[] = 'realName="' . $database->escape($realName) . '"';
			$field[] = 'orderType="3"';
            $field[] = 'saleTicket="1"';//可否售票, 0=不可售票， 1=可售票
			$field[] = 'planId="0"';
			$field[] = 'planUserId="0"';
			$field[] = 'planNickName=""';
			$field[] = 'planRealName=""';
			$field[] = 'planMatchType="' . $database->escape($matchType) . '"';
			$field[] = 'planMatchRecommend="' . $database->escape($matchRecommend) . '"';
			$field[] = 'planMatchBeginTime="' . $database->escape($matchBeginTime) . '"';
			$field[] = 'amount="' . $database->escape($amount) . '"';
			$field[] = 'status="1"';
			$field[] = 'ticketUnit="' . $database->escape($ticketUnit) . '"';
			$field[] = 'ticketMultiple="' . $database->escape($ticketMultiple) . '"';
			$field[] = 'ticketPassType="' . $database->escape($ticketPassType) . '"';
			$field[] = 'ticketUserId="' . $database->escape((int)$ticketSupplier['userId']) . '"';
			$field[] = 'ticketNickName="' . $database->escape(trim($ticketSupplier['nickName'])) . '"';
			$field[] = 'ticketRealName="' . $database->escape(trim($ticketSupplier['realName'])) . '"';
			$field[] = 'ticketSupplierId="' . $database->escape((int)$ticketSupplier['ticketSupplierId']) . '"';
			$field[] = 'ticketSupplierName="' . $database->escape(trim($ticketSupplier['ticketSupplierName'])) . '"';
			$field[] = 'ticketAttachPrizeStatus="' . $database->escape($ticketAttachPrizeStatus) . '"';
			$field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
			$field[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
			$field[] = 'source="' . $database->escape($source) . '"';
			$field[] = 'channel="' . $database->escape($channel) . '"';
			$field[] = 'createTime=now()';
			$sqlArr[] = 'insert into t_order set ' . implode(',', $field);
			$totalAmount += $amount;
		}
		if (count($sqlArr) != count($matchRecommendArr)) {
			$this->resp->msg = "订单投注和赛事场次不符";
			$this->jsonView->out($this->resp);
		}
		$orderIdArr = array();
		if ($database->execute('start transaction')) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			if (!$result) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "订单创建异常";
				$this->jsonView->out($this->resp);
			}
			$orderIdArr = $database->multiInsertId();
			if (count($sqlArr) != count($orderIdArr)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "订单创建不符";
				$this->jsonView->out($this->resp);
			}
			for ($i = 0, $length = count($orderIdArr); $i < $length; $i++) {
				$orderId = (int)$orderIdArr[$i];
				if ($orderId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "订单生成异常";
					$this->jsonView->out($this->resp);
				}
			}
			$database->execute('commit');
			$database->close();
		} else {
			$database->close();
			$this->resp->msg = "订单生成异常";
			$this->jsonView->out($this->resp);
		}
		$pay = requireModule("Pay");
		$param = array();
		$param['orderId'] = $orderIdArr;
		$param['redirectUrl'] = $redirectUrl;
		$param['remark'] = '奖金优化';
		$param['tradeType'] = $tradeType;
		$payOrderBatchResp = $pay->payOrderBatch($param);
		if ($payOrderBatchResp->errCode != 0) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$payOrderBatchData = $payOrderBatchResp->data;
		if (empty($payOrderBatchData)) {
			$this->resp->msg = "支付失败";
			$this->jsonView->out($this->resp);
		}
		$orderBatchNo = trim($payOrderBatchData['orderBatchNo']);
		$payUrl = trim($payOrderBatchData['payUrl']);
		$this->resp->data = array('orderBatchNo' => $orderBatchNo, 'payUrl' => $payUrl);
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//极限追盘信息
    public function jxzpOrderInfo(){
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $param = array();
        $param['userId'] = $userId;
        $param['status'] = 2;
        $param['orderType'] = 2;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单
		$param['comboId'] = array(1,2,3);//1=88元/周, 2=350元/月, 3=4000元/年
		$param['pageNum'] = 1;
		$param['pageSize'] = 1;
		$selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "订单查询异常";
            $this->jsonView->out($this->resp);
        }
        $jxzpOrderList = $selectOrderResp->data['list'];
        $jxzpOrderInfo = new \stdClass();
        if (count($jxzpOrderList) <= 0) {
            $this->resp->data = $jxzpOrderInfo;
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        }
        $jxzpOrder = $jxzpOrderList[0];//最近购买的极限追盘
        $comboId = (int)$jxzpOrder['comboId'];
		$selectComboByIdResp = $this->comboService->selectComboByIdCache($comboId);
        if ($selectComboByIdResp->errCode != 0) {
            $this->resp->msg = "套餐查询异常";
            $this->jsonView->out($this->resp);
        }
        $comboData = $selectComboByIdResp->data;
		$beginTime = strtotime(trim($jxzpOrder['createTime']));
        $spanTime = (int)$comboData['spanTime'];
        $endTime = $beginTime + $spanTime;
        $jxzpOrderInfo->beginTime = trim(date('m月d日', $beginTime));
        $jxzpOrderInfo->endTime = trim(date('m月d日', $endTime));
        $jxzpOrderInfo->isExpire = (bool)($endTime < time());
        $this->resp->data = $jxzpOrderInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //晒米冷热
    public function createSmlrOrder() {
        if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $channel = (int)$this->loginUserInfo['channel'];
        $source = (int)$this->common->getParam("source", 0);//来源, 0=h5, 1=android, 2=ios
        $matchId = (int)$this->common->getParam("matchId", 0);
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        //比赛是否存在
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($matchId < 0) {
            $this->resp->msg = "matchId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectMatchByIdResp = $this->matchService->selectMatchById($matchId);
        if ($selectMatchByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $matchData = $selectMatchByIdResp->data;
        if (empty($matchData)) {
            $this->resp->msg = "比赛不存在";
            $this->jsonView->out($this->resp);
        }
        //是否已购买
        $param = array();
        $param['userId'] = $userId;
		$param['orderType'] = 5;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
		$param['status'] = 2;//订单状态, 1=未付款, 2=已付款, 3=已退款
        $param['matchId'] = $matchId;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->error != 0) {
            $this->resp->msg = "暂不能购买";
            $this->jsonView->out($this->resp);
        }
        $orderList = $selectOrderResp->data['list'];
        if (count($orderList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "已购买过";
            $this->jsonView->out($this->resp);
        }
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
		$param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
		$param['orderType'] = 5;
		$param['planMatchType'] = (int)$matchData['type'];
		$param['matchId'] = $matchId;
		$param['amount'] = 500;
        $param['status'] = 1;
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
		$param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //极限追盘
    public function createJxzpOrder() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $channel = (int)$this->loginUserInfo['channel'];
        $source = (int)$this->common->getParam('source', 0);//来源, 0=h5, 1=android, 2=ios
        $matchId = (int)$this->common->getParam("matchId", 0);
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付
		$redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        //比赛是否存在
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($matchId < 0) {
            $this->resp->msg = "matchId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectMatchByIdResp = $this->matchService->selectMatchById($matchId);
        if ($selectMatchByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $matchData = $selectMatchByIdResp->data;
        if (empty($matchData)) {
            $this->resp->msg = "比赛不存在";
            $this->jsonView->out($this->resp);
        }
		//是否已购买
		$param = array();
		$param['userId'] = $userId;
		$param['orderType'] = 6;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
		$param['status'] = 2;//订单状态, 1=未付款, 2=已付款, 3=已退款
		$param['matchId'] = $matchId;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->error != 0) {
            $this->resp->msg = "暂不能购买";
            $this->jsonView->out($this->resp);
        }
		$orderList = $selectOrderResp->data['list'];
        if (count($orderList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "已购买过";
            $this->jsonView->out($this->resp);
        }
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
        $param = array();
		$param['userId'] = $userId;
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['orderType'] = 6;
		$param['planMatchType'] = (int)$matchData['type'];
		$param['matchId'] = $matchId;
		$param['amount'] = 200;
		$param['status'] = 1;
		$param['source'] = $source;
		$param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
		$param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //创建数字彩出票订单
    public function createDigitalTicketOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $isABT = (bool)$this->commonService->isAllowBuyTicket($userId);
        if (!$isABT) {
            $this->resp->msg = "暂不能购买";
            $this->jsonView->out($this->resp);
        }
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
		$version = trim($this->common->getParam("version", ''));
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $channel = (int)$this->loginUserInfo['channel'];
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通
        $ticketMultiple = (int)$this->common->getParam("ticketMultiple", 1);//投注倍数
		$ticketAppend = (int)$this->common->getParam("ticketAppend", 0);//是否追加, 0=不追加, 1=追加(大乐透)
        $issue = trim($this->common->getParam("issue", ''));//期号
        $lotteryId = trim($this->common->getParam("lotteryId", ''));//数字彩彩种类型
        $betContent = trim($this->common->getParam("betContent", ''));//投注内容
        $planNo = trim($this->common->getParam("planNo", ''));
        $redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        if ($ticketMultiple <= 0) {
            $this->resp->msg = "ticketMultiple参数有误";
            $this->jsonView->out($this->resp);
        }
		$planType = 0;
		$planId = 0;
		$planUserId = 0;
		$planNickName = '';
		$planRealName = '';
		$ticketPrizeDivideStatus = 0;//中奖分成, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        //跟单
        if (!empty($planNo)) {
            $selectPlanByNoResp = $this->planService->selectPlanByNo($planNo);
            if ($selectPlanByNoResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $planData = $selectPlanByNoResp->data;
            if (empty($planData)) {
                $this->resp->msg = "方案不存在";
                $this->jsonView->out($this->resp);
            }
            $planId = (int)$planData['planId'];
            $planPublish = (int)$planData['publish'];
            $planUserId = (int)$planData['userId'];
            $planNickName = trim($planData['nickName']);
            $planRealName = trim($planData['realName']);
            $planType = (int)$planData['planType']; //1=竞技彩, 2=数字彩
            $betContent = trim($planData['betContent']);
            $lotteryId = trim($planData['lotteryId']);
            $issue = trim($planData['issue']);
            if ($planId <= 0 || $planUserId <= 0 || $planType != 2 || empty($betContent) || empty($lotteryId) || empty($issue)) {
                $this->resp->msg = "方案信息有误";
                $this->jsonView->out($this->resp);
            }
            if ($planPublish == 0) {
                $this->resp->msg = "方案已经下架";
                $this->jsonView->out($this->resp);
            }
            //判断用户是否购买了方案
            $needTicketPrizeDivide = false;
            if ($source == 0) {
                $needTicketPrizeDivide = true;
            } else if ($source == 1) {
                /*//branch = 产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
                if (($branch == 0 && $version >= '2.5.0') || ($branch == 1 && $version >= '1.4.0')) {//晒米场2.5.0 和 晒米彩票1.4.0
                    $needTicketPrizeDivide = true;
                }*/
            } else if ($source == 2) {
                /*if (($branch == 0 && $version >= '2.0.0') || ($branch == 2 && $version >= '2.4.0')) {//晒米场2.0.0 和 晒米竞彩2.4.0
                    $needTicketPrizeDivide = true;
                }*/
            }
            if ($needTicketPrizeDivide && $userId != $planUserId) {
                //已经买过推荐的不分成
                $param = array();
                $param['planType'] = 2; //1=竞彩, 2=数字彩
                $param['orderType'] = 0;
                $param['userId'] = $userId;
                $param['planId'] = $planId;
                $param['status'] = 2;
                $selectOrderResp = $this->orderService->selectOrder($param);
                if ($selectOrderResp->errCode != 0) {
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
                $planOrderList = $selectOrderResp->data['list'];
                if (count($planOrderList) <= 0) {
                    $ticketPrizeDivideStatus = 1;
                }
            }
        }
		//双色球:99倍，江苏快3:9999倍，大乐透:99倍
        $maxTicketMultiple = 0;
        if ($lotteryId == 'SSQ' || $lotteryId == 'DLT') {
            $maxTicketMultiple = 99;
        } else if ($lotteryId == 'JSK3' || $lotteryId == 'GX11X5' || $lotteryId == 'FC3D') {
            $maxTicketMultiple = 9999;
        }
		if ($ticketMultiple > $maxTicketMultiple) {
			$this->resp->msg = "倍数最大".$maxTicketMultiple."倍";
			$this->jsonView->out($this->resp);
		}
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if (!in_array($lotteryId, array('SSQ','JSK3','DLT','GX11X5','FC3D'))) {
            $this->resp->msg = "彩种类型有误";
            $this->jsonView->out($this->resp);
        }
        if (!preg_match('/^\d+$/', $issue)) {
            $this->resp->msg = "期号有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($betContent)) {
            $this->resp->msg = "投注内容不能为空";
            $this->jsonView->out($this->resp);
        }
        //彩种
        $selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
        if ($selectLotteryByIdResp->errCode != 0) {
            $this->resp->msg = "彩种有误";
            $this->jsonView->out($this->resp);
        }
        $lotteryData = $selectLotteryByIdResp->data;
        $lotteryName = $lotteryData['lotteryName'];
        if (empty($lotteryData) || empty($lotteryName)) {
            $this->resp->msg = "彩种类型有误";
            $this->jsonView->out($this->resp);
        }
        //期号
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $param['issue'] = $issue;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $this->resp->msg = "期号有误";
            $this->jsonView->out($this->resp);
        }
        $lotteryIssueData = $selectLotteryIssueResp->data['list'][0];
        if (empty($lotteryIssueData) || !empty(trim($lotteryIssueData['drawNumber']))){
            $this->resp->msg = "该期已经截止销售";
            $this->jsonView->out($this->resp);
        }
		//算出注数和金额
		$calculateDigitalTicketResp = $this->commonService->calculateDigitalTicket($lotteryId, $betContent);
		if ($calculateDigitalTicketResp->errCode != 0) {
			$this->resp->msg = $calculateDigitalTicketResp->msg;
			$this->jsonView->out($this->resp);
		}
		$ticketArr = $calculateDigitalTicketResp->data;
		if (!is_array($ticketArr) || count($ticketArr) <= 0) {
			$this->resp->msg = '投注格式异常';
			$this->jsonView->out($this->resp);
		}
		$baseAmount = $ticketAppend == 1 ? 3 : 2;//追加是3元1注
		$ticketUnit = 0;
        $ticketAttachPrizeStatus = 0;//加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        //11选5加奖
		$attachPrize = false;
        if ($lotteryId == 'GX11X5') {
            //加奖时间
            $activityId = 7;//广西11选5,100万加奖
            $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
            if ($selectActivityByIdResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $activityData = $selectActivityByIdResp->data;
            if (!empty($activityData)) {
                $activityBeginTime = trim($activityData['beginTime']);
                $activityEndTime = trim($activityData['endTime']);
                $activitySumAmount = (int)$activityData['sumAmount'];
                $activityAmount = (int)$activityData['amount'];
                $curTime = trim(date("Y-m-d H:i:s"));
                if ($curTime > $activityBeginTime && $curTime < $activityEndTime && $activityAmount < $activitySumAmount) {
                    $attachPrize = true;
                }
            }
        }
		foreach ($ticketArr as $ticket) {
			$unit = (int)$ticket['ticketUnit'];
			if ($lotteryId == 'SSQ') {
				if ($unit > 1) {
					$m = $ticketMultiple*$unit*$baseAmount*100;
					if ($m > 2000000) {
						$this->resp->msg = '双色球复式投注不能超过2万元';
						$this->jsonView->out($this->resp);
					}
				}
			} else if ($lotteryId == 'DLT') {
				if ($unit > 1) {
					$m = $ticketMultiple*$unit*$baseAmount*100;
					if ($m > 2000000) {
						$this->resp->msg = '大乐透复式投注不能超过2万元';
						$this->jsonView->out($this->resp);
					}
				}
			} else if ($lotteryId == 'GX11X5') {
                //11选择5加奖
                $betType = trim($ticket['betType']);
                if ($attachPrize && ($betType == 'RX3' || $betType == 'RX5')) {
                    $ticketAttachPrizeStatus = 1;
                }
            }
			$ticketUnit += $unit;
		}
        $amount = (int)($ticketMultiple*$ticketUnit*$baseAmount*100);
        //分配出票商
        $param = array(
            'userId' => $userId,
            'lotteryId' => $lotteryId
        );
        $ticketSupplierResp = $this->orderService->getTicketSupplier($param);
        if ($ticketSupplierResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $ticketSupplier = $ticketSupplierResp->data;
        if (empty($ticketSupplier)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
		$ticketSupplierId = (int)$ticketSupplier['ticketSupplierId'];
		$beginTime = (int)strtotime(trim($lotteryIssueData['beginTime']));
		$endTime = (int)strtotime(trim($lotteryIssueData['endTime']));
		if ($beginTime <= 0) {
			$this->resp->msg = "该期开售时间异常";
			$this->jsonView->out($this->resp);
		}
		if ($endTime <= 0) {
			$this->resp->msg = "该期截止时间异常";
			$this->jsonView->out($this->resp);
		}
		if ($lotteryId == 'SSQ') {
            $beginTime += 11*60;//在20:11前的票,都是预售票
            $endTime -= 35*60;//在19:25截止->修改成19：05分截至->修改成19：25分截至
        } else if ($lotteryId == 'JSK3' || $lotteryId == 'GX11X5') {
            $beginTime += 1*60;//在1分钟前的票,都是预售票
            $endTime -= 1.5*60;//在1.5分钟前截止
        } else if ($lotteryId == 'DLT') {
			$beginTime += 31*60;//在20:31前的票,都是预售票
			$endTime -= 35*60;//在19:25截止
		} else if ($lotteryId == 'FC3D') {
            $beginTime += 31*60;//在20:31前的票,都是预售票
            $endTime -= 35*60;//在19:25截止->修改成19：05分截至->->修改成19：25分截至
        }
        $ticketStatus = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票, 9=待开售
		$curTime = time();
		if ($curTime >= $endTime) {
			$this->resp->msg = "该期已经截止销售";
			$this->jsonView->out($this->resp);
		} else if ($curTime <= $beginTime) {
			$ticketStatus = 9;
		}
        //优惠券信息
		$userCouponId = 0;
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = 1; //资金类型, 0=方案, 1=出票
        $param['couponType'] = 1; //优惠券类型, 1=消费, 2=充值
        $param['amount'] = $amount;
        $param['source'] = $source;
        $param['channel'] = $channel;
        $param['lotteryId'] = $lotteryId;
        $getUserCouponResp = $this->getUserCoupon($param);
        if ($getUserCouponResp->errCode == 0 && !empty($getUserCouponResp->data)) {
			$userCouponId = (int)$getUserCouponResp->data['userCouponId'];
        }
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
		$param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['orderType'] = 7;
        $param['saleTicket'] = 1;//可否售票, 0=不可售票， 1=可售票
		$param['planType'] = $planType; //1=竞技彩, 2=数字彩
        $param['planId'] = $planId;
        $param['planUserId'] = $planUserId;
        $param['planNickName'] = $planNickName;
        $param['planRealName'] = $planRealName;
        $param['amount'] = $amount;
        $param['status'] = 1;   //未付款
        $param['userCouponId'] = $userCouponId;
        $param['ticketUnit'] = $ticketUnit;   //注数
        $param['ticketMultiple'] = $ticketMultiple;
        $param['ticketPassType'] = '';
		$param['ticketAppend'] = $ticketAppend;
		$param['ticketStatus'] = $ticketStatus;
        $param['ticketUserId'] = (int)$ticketSupplier['userId'];
        $param['ticketNickName'] = trim($ticketSupplier['nickName']);
        $param['ticketRealName'] = trim($ticketSupplier['realName']);
        $param['ticketSupplierId'] = (int)$ticketSupplier['ticketSupplierId'];
        $param['ticketSupplierName'] = trim($ticketSupplier['ticketSupplierName']);
        $param['ticketPrizeDivideStatus'] = $ticketPrizeDivideStatus;
        $param['ticketAttachPrizeStatus'] = $ticketAttachPrizeStatus;
        $param['issue'] = $issue;
        $param['lotteryId'] = $lotteryId;
        $param['lotteryName'] = $lotteryName;
        $param['betContent'] = $betContent;
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        if ($source == 0) {
            $redirectUrl .= '&orderNo='.$orderNo;
        }
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //创建赠送订单
    public function createPresentOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $channel = (int)$this->loginUserInfo['channel'];
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 2=苹果支付
        $presentNum = (int)$this->common->getParam("presentNum", 0);//赠送人数
        $presentRemark = trim($this->common->getParam("presentRemark", ''));//赠送备注
        $redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($presentNum <= 0) {
            $this->resp->msg = "赠送人数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($presentRemark)) {
            $this->resp->msg = "红包祝福语不能为空";
            $this->jsonView->out($this->resp);
        }
        $amount = (int)($presentNum*2*100);
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['orderType'] = 8;    // 8=赠送订单
        $param['presentNum'] = $presentNum;   //赠送数量
        $param['presentRemark'] = $presentRemark;   //赠送备注
        $param['amount'] = $amount;
        $param['status'] = 1;   //未付款
        $param['lotteryId'] = 'SSQ';
        $param['lotteryName'] = '双色球';
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        if ($source == 0) {
            $redirectUrl .= '&orderNo='.$orderNo;
        }
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //创建冠亚军竞猜订单
    public function createGuessOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $isABT = (bool)$this->commonService->isAllowBuyTicket($userId);
        if (!$isABT) {
            $this->resp->msg = "暂不能购买";
            $this->jsonView->out($this->resp);
        }
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $channel = (int)$this->loginUserInfo['channel'];
        $tradeType = (int)$this->common->getTradeType($this->loginUserInfo);//交易方式, 0=爱贝, 1=支付宝, 2=威富通
        $ticketMultiple = (int)$this->common->getParam("ticketMultiple", 1);//投注倍数
        $lotteryId = trim($this->common->getParam("lotteryId", ''));//彩种Id 世界杯冠军=SJBGJ,世界杯冠亚军=SJBGYJ
        $matchRecommend = trim($this->common->getParam("matchRecommend", ''));//投注信息  [{"oddsId":1},{"oddsId":1}]
        $redirectUrl = urldecode(trim($this->common->getParam("redirectUrl", '')));
        if ($ticketMultiple <= 0 || $ticketMultiple > 100000) {
            $this->resp->msg = "ticketMultiple参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($tradeType == 3 && $source != 2) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($matchRecommend)) {
            $this->resp->msg = "投注信息不能为空";
            $this->jsonView->out($this->resp);
        }
        if (empty($lotteryId) || ($lotteryId != 'SJBGJ' && $lotteryId != 'SJBGYJ')) {
            $this->resp->msg = "彩种id异常";
            $this->jsonView->out($this->resp);
        }
        //彩种
        $selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
        if ($selectLotteryByIdResp->errCode != 0) {
            $this->resp->msg = "彩种有误";
            $this->jsonView->out($this->resp);
        }
        $lotteryData = $selectLotteryByIdResp->data;
        $lotteryName = trim($lotteryData['lotteryName']);
        if (empty($lotteryData) || empty($lotteryName)) {
            $this->resp->msg = "彩种类型有误";
            $this->jsonView->out($this->resp);
        }
        $mockList = array(array('planMatchRecommend' => $matchRecommend));
        $mockList = $this->commonService->setGuessList($mockList);
        $guessList = $mockList[0]['guessList'];
        $matchRecommend = json_decode($matchRecommend);
        if (empty($guessList) || empty($matchRecommend) || count($guessList) != count($matchRecommend)) {
            $this->resp->msg = "投注内容有误";
            $this->jsonView->out($this->resp);
        }
        $guessMap = array();
        foreach ($guessList as $guess) {
            $oddsId = (int)$guess['oddsId'];
            $lId = (int)$guess['lotteryId'];
            if ($oddsId <= 0 || $lotteryId != $lId) {
                $this->resp->msg = "投注内容有误";
                $this->jsonView->out($this->resp);
            }
            $guessMap[$oddsId] = $guess;
        }
        //重复的oddsId
        if (count($guessList) != count($guessMap)) {
            $this->resp->msg = "投注内容有误";
            $this->jsonView->out($this->resp);
        }
        //固化赔率,排序
        $numberArr = array();
        foreach ($matchRecommend as &$r) {
            $oddsId = (int)$r->oddsId;
            $guess = $guessMap[$oddsId];
            $odds = trim($guess['odds']);
            $number = (int)$guess['number'];
            if ($oddsId <= 0 || empty($guess) || empty($odds) || $number <= 0) {
                $this->resp->msg = "竞彩赔率有误";
                $this->jsonView->out($this->resp);
            }
            $r->odds = $odds;
            $numberArr[] = $number;
        }
        array_multisort($numberArr, SORT_ASC, SORT_NUMERIC, $matchRecommend);
        $ticketUnit = count($matchRecommend);
        $matchRecommend = trim(json_encode($matchRecommend));
        $amount = (int)($ticketMultiple*$ticketUnit*2*100);
        //优惠券信息
        $userCouponId = 0;
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = 1; //资金类型, 0=方案, 1=出票
        $param['couponType'] = 1; //优惠券类型, 1=消费, 2=充值
        $param['amount'] = $amount;
        $param['source'] = $source;
        $param['channel'] = $channel;
        $param['lotteryId'] = $lotteryId;
        $getUserCouponResp = $this->getUserCoupon($param);
        if ($getUserCouponResp->errCode == 0 && !empty($getUserCouponResp->data)) {
            $userCouponId = (int)$getUserCouponResp->data['userCouponId'];
        }
        //分配出票商
        $param = array(
            'userId' => $userId,
            'lotteryId' => $lotteryId
        );
        $ticketSupplierResp = $this->orderService->getTicketSupplier($param);
        if ($ticketSupplierResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $ticketSupplier = $ticketSupplierResp->data;
        if (empty($ticketSupplier)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        //代理商信息
        $channelValid = true;
        if (!empty($channel)) {
            $channelValidResp = $this->channelValid($channel);
            if ($channelValidResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $channelValid = $channelValidResp->data;
        }
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['orderType'] = 9;
        $param['amount'] = $amount;
        $param['status'] = 1;
        $param['planMatchType'] = 1;//竞猜类型, 1=足球, 2=篮球
        $param['planMatchRecommend'] = $matchRecommend;
        $param['userCouponId'] = $userCouponId;
        $param['ticketUnit'] = $ticketUnit;   //注数
        $param['ticketMultiple'] = $ticketMultiple;
        $param['ticketUserId'] = (int)$ticketSupplier['userId'];
        $param['ticketNickName'] = trim($ticketSupplier['nickName']);
        $param['ticketRealName'] = trim($ticketSupplier['realName']);
        $param['ticketSupplierId'] = (int)$ticketSupplier['ticketSupplierId'];
        $param['ticketSupplierName'] = trim($ticketSupplier['ticketSupplierName']);
        $param['lotteryId'] = $lotteryId;
        $param['lotteryName'] = $lotteryName;
        $param['source'] = $source;
        $param['channel'] = $channelValid ? $channel : 0;
        $insertOrderResp = $this->orderService->insertOrder($param);
        if ($insertOrderResp->errCode != 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderId = (int)$insertOrderResp->data;
        if ($orderId <= 0) {
            $this->resp->msg = "添加订单失败";
            $this->jsonView->out($this->resp);
        }
        $orderNo = $this->common->encodeNo($userId, $orderId);
        if ($source == 0) {
            $redirectUrl .= '&orderNo='.$orderNo;
        }
        $pay = requireModule("Pay");
        $param = array();
        $param['orderNo'] = $orderNo;
        $param['redirectUrl'] = $redirectUrl;
        $param['tradeType'] = $tradeType;
        $payOrderResp = $pay->payOrder($param);
        if ($payOrderResp->errCode != 0) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payOrderData = $payOrderResp->data;
        if (empty($payOrderData)) {
            $this->resp->msg = "支付失败";
            $this->jsonView->out($this->resp);
        }
        $payUrl = trim($payOrderData['payUrl']);
        $this->resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //领取彩票
    public function receiveOrder() {

        $this->resp->msg = "业务暂停";
        $this->jsonView->out($this->resp);

        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $forbid = (int)$this->loginUserInfo['forbid'];
        if ($forbid == 1) {
            $this->resp->msg = "该用户已被封号";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $orderNo = trim($this->common->getParam("orderNo", ''));
        $orderNoArr = $this->common->decodeNo($orderNo);
        $orderNoUserId = (int)$orderNoArr['userId'];
        $orderNoOrderId = (int)$orderNoArr['id'];
        if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
            $this->resp->msg = 'orderNo参数有误';
            $this->jsonView->out($this->resp);
        }
        //查看是否领取过
        $getUserReceivedOrderResp = $this->getUserReceivedOrder($userId, $orderNoOrderId);
        if ($getUserReceivedOrderResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $receivedOrder = $getUserReceivedOrderResp->data;
        if (!empty($receivedOrder)) {
            $this->resp->errCode = 3;
            $this->resp->msg = "已经领取过";
            $this->jsonView->out($this->resp);
        }
        $param = array();
		$param['orderType'] = 8;
        $param['orderId'] = $orderNoOrderId;
        $param['status'] = 2;
        $param['presentStatus'] = 1;//赠送状态, 1=待领取, 2=待退款
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $orderList = $selectOrderResp->data['list'];
        if (!is_array($orderList) || count($orderList) <= 0) {
            $this->resp->msg = "红包已被领取完";
            $this->jsonView->out($this->resp);
        }
        $orderData = $orderList[0];
        $lotteryId = $orderData['lotteryId'];
        $lotteryName = $orderData['lotteryName'];
        //分配出票商
        $param = array(
            'userId' => $userId,
            'lotteryId' => $lotteryId
        );
        $ticketSupplierResp = $this->orderService->getTicketSupplier($param);
        if ($ticketSupplierResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $ticketSupplier = $ticketSupplierResp->data;
        if (empty($ticketSupplier)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        //查询期号信息
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $param['status'] = 2;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 1;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $lotteryIssueList = $selectLotteryIssueResp->data['list'];
        $lotteryIssue = $lotteryIssueList[0];
        $ticketStatus = 0;//出票状态, 0=未出票
        $curTime = time();
        $endTime = strtotime(trim($lotteryIssue['endTime']))-35*60;
		if (empty($lotteryIssue) || $curTime >= $endTime) {
            //当前期已经截止销售,自动走到下一期
            $param = array();
            $param['lotteryId'] = $lotteryId;
            $param['status'] = 1;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
            $param['orderBy'] = 1;
            $param['pageNum'] = 1;
            $param['pageSize'] = 1;
            $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
            if ($selectLotteryIssueResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $lotteryIssueList = $selectLotteryIssueResp->data['list'];
            $lotteryIssue = $lotteryIssueList[0];
            $ticketStatus = 9;  //出票状态, 9=待开售
        }
        $issue = trim($lotteryIssue['issue']);
        //随机内容投注
        $redNumbers = range(1,33);
        shuffle($redNumbers);
        $redNumberArr = array_slice($redNumbers,0,6);
        sort($redNumberArr);
        $blueNumbers = range(1,16);
        shuffle($blueNumbers);
        $blueNumberArr = array_slice($blueNumbers,0,1);
        sort($blueNumberArr);
        foreach ($redNumberArr as &$redNumber) {
            $redNumber = sprintf("%02d", $redNumber);
        }
        foreach ($blueNumberArr as &$blueNumber) {
            $blueNumber = sprintf("%02d", $blueNumber);
        }
        $betContent = implode(',', $redNumberArr) . '|' . implode(',', $blueNumberArr);
        //其它信息
        $orderType = 7;   //数字彩订单
        $amount = 2*100;
        $status = 2;    //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $ticketUnit = 1;
        $ticketMultiple = 1;
		$remark = '彩票红包';
        //开启事物
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //更新订单领取数量
            $updateOrderSql = 'update t_order set presentReceived=presentReceived+1 where orderId="' . $orderNoOrderId . '" and orderType=8 and presentNum > presentReceived limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新订单异常";
				$this->jsonView->out($this->resp);
            }
            //领取订单信息插入
            $insertOrderField = array();
            $insertOrderField[] = 'userId="' . $database->escape($userId) . '"';
            $insertOrderField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertOrderField[] = 'realName="' . $database->escape($realName) . '"';
            $insertOrderField[] = 'orderType="' . $database->escape($orderType) . '"';
            $insertOrderField[] = 'amount="' . $database->escape($amount) . '"';
            $insertOrderField[] = 'status="' . $database->escape($status) . '"';
            $insertOrderField[] = 'ticketUnit="' . $database->escape($ticketUnit) . '"';
            $insertOrderField[] = 'ticketMultiple="' . $database->escape($ticketMultiple) . '"';
            $insertOrderField[] = 'ticketStatus="' . $database->escape($ticketStatus) . '"';
            $insertOrderField[] = 'ticketUserId="' . $database->escape((int)$ticketSupplier['userId']) . '"';
            $insertOrderField[] = 'ticketNickName="' . $database->escape(trim($ticketSupplier['nickName'])) . '"';
            $insertOrderField[] = 'ticketRealName="' . $database->escape(trim($ticketSupplier['realName'])) . '"';
            $insertOrderField[] = 'ticketSupplierId="' . $database->escape((int)$ticketSupplier['ticketSupplierId']) . '"';
            $insertOrderField[] = 'ticketSupplierName="' . $database->escape(trim($ticketSupplier['ticketSupplierName'])) . '"';
            $insertOrderField[] = 'presentOrderId="' . $database->escape($orderNoOrderId) . '"';
            $insertOrderField[] = 'issue="' . $database->escape($issue) . '"';
            $insertOrderField[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
            $insertOrderField[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
            $insertOrderField[] = 'betContent="' . $database->escape($betContent) . '"';
            $insertOrderField[] = 'source="' . $database->escape($orderData['source']) . '"';
            $insertOrderField[] = 'channel="' . $database->escape($orderData['channel']) . '"';
			$insertOrderField[] = 'remark="' . $database->escape($remark) . '"';
			$insertOrderField[] = 'createTime=now()';
            $insertOrderSql = 'insert into t_order set ' . implode(',', $insertOrderField);
            $insertOrderResult = $database->execute($insertOrderSql);
            $insertOrderInsertId = (int)$database->getInsertId();
            if (!$insertOrderResult || $insertOrderInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入订单异常";
				$this->jsonView->out($this->resp);
            }
			$database->execute('commit');
			$database->close();
			$message = requireModule('Message');
			$message->publish('payOrderForTicketDeal', $insertOrderInsertId);
			$message->publish('payOrderForStation', $insertOrderInsertId);
			$orderNo = $this->common->encodeNo($userId, $insertOrderInsertId);
			$this->resp->data = $orderNo;
			$this->resp->errCode = 0;
			$this->resp->msg = "领取成功";
			$this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "领取失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->data = $orderNo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //赠送列表
    public function presentOrderList() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
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
        $param['userId'] = $userId;
        $param['orderType'] = 8;//赠送订单
        $param['status'] = array(2, 3, 4);  //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $orderListData = $selectOrderResp->data;
        $totalCount = (int)$orderListData['totalCount'];
        $orderList = $orderListData['list'];
        $data = array("totalCount" => $totalCount, 'list' => array());
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $orderType = (int)$orderList[$i]['orderType'];
            $userId = (int)$orderList[$i]['userId'];
            $orderId = (int)$orderList[$i]['orderId'];
            $amount = (int)$orderList[$i]['amount'];
            if ($orderType != 8 || $userId <= 0 || $orderId <= 0 || $amount <= 0) {
                continue;
            }
            $presentNum = (int)$orderList[$i]['presentNum'];
            $presentReceived = (int)$orderList[$i]['presentReceived'];
			$nickName = trim($orderList[$i]['nickName']);
			$realName = trim($orderList[$i]['realName']);
            $createTime = trim($orderList[$i]['createTime']);
            $presentStatus = 0; //领取状态：1=未领完, 2=已领完, 3=已过期
            if (strtotime($createTime)+24*3600*30 < time()) {
				$presentStatus = 3;
            } else if ($presentNum > $presentReceived) {
				$presentStatus = 1;
			} else if ($presentNum == $presentReceived) {
				$presentStatus = 2;
			}
            $orderInfo = array();
            $orderInfo['orderNo'] = trim($this->common->encodeNo($userId, $orderId));
			$orderInfo['nickName'] = $nickName;
            $orderInfo['realName'] = $realName;
            $orderInfo['amount'] = $amount;
            $orderInfo['presentNum'] = $presentNum;
            $orderInfo['presentReceived'] = $presentReceived;
            $orderInfo['presentStatus'] = $presentStatus;
            $orderInfo['createTime'] = $createTime;
            $data['list'][] = $orderInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //赠送详情
    public function presentOrderInfo() {
        $orderNo = trim($this->common->getParam("orderNo", ''));
        $orderNoArr = $this->common->decodeNo($orderNo);
        $orderNoUserId = (int)$orderNoArr['userId'];
        $orderNoOrderId = (int)$orderNoArr['id'];
        if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
            $this->resp->msg = 'orderNo参数有误';
            $this->jsonView->out($this->resp);
        }
		$receivedOrderNo = '';
		if (!empty($this->loginUserInfo)) {
			$userId = (int)$this->loginUserInfo['userId'];
			//登入用户是否领取过
			$getUserReceivedOrderResp = $this->getUserReceivedOrder($userId, $orderNoOrderId);
			if ($getUserReceivedOrderResp->errCode != 0) {
				$this->resp->msg = '参数异常';
				$this->jsonView->out($this->resp);
			}
			$receivedOrder = $getUserReceivedOrderResp->data;
			if (!empty($receivedOrder)) {
				$receivedOrderUserId = (int)$receivedOrder['userId'];
				$receivedOrderOrderId = (int)$receivedOrder['orderId'];
				if ($receivedOrderUserId > 0 && $receivedOrderOrderId > 0) {
					$receivedOrderNo = $this->common->encodeNo($receivedOrderUserId, $receivedOrderOrderId);
				}
			}
		}
        $param['orderId'] = $orderNoOrderId;
        $param['orderType'] = 8; //赠送订单
        $param['status'] = array(2, 3, 4);//2=已付款, 3=已退款, 4=部分退款
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = '查询订单异常';
            $this->jsonView->out($this->resp);
        }
        $orderList = $selectOrderResp->data['list'];
        if (empty($orderList)) {
            $this->resp->msg = '订单信息异常';
            $this->jsonView->out($this->resp);
        }
        $orderList = $this->commonService->setUserCache($orderList);
        $orderData = $orderList[0];
		$presentNum = (int)$orderData['presentNum'];
		$presentReceived = (int)$orderData['presentReceived'];
		$presentRemark = trim($orderData['presentRemark']);
		$createTime = trim($orderData['createTime']);
		$presentStatus = 0; //领取状态：1=未领完, 2=已领完, 3=已过期
		if (strtotime($createTime)+24*3600*30 < time()) {
			$presentStatus = 3;
		} else if ($presentNum > $presentReceived) {
			$presentStatus = 1;
		} else if ($presentNum == $presentReceived) {
			$presentStatus = 2;
		}
        $orderInfo = array();
        $orderInfo['user'] = $orderData['user'];
        $orderInfo['receivedOrderNo'] = $receivedOrderNo;
        $orderInfo['presentNum'] = $presentNum;
        $orderInfo['presentReceived'] = $presentReceived;
        $orderInfo['presentRemark'] = $presentRemark;
		$orderInfo['presentStatus'] = $presentStatus;
        $this->resp->data = $orderInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //领取列表
    public function receivedOrderList() {
        $orderNo = trim($this->common->getParam("orderNo", ''));
        $type = trim($this->common->getParam("type", 1));   //1:赠送订单领取列表    2:用户领取列表
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
        //赠送订单领取列表
        $param = array();
		$param['orderType'] = 7;
		$param['status'] = array(2, 3, 4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        if ($type == 1) {
            $orderNoArr = $this->common->decodeNo($orderNo);
            $orderNoUserId = (int)$orderNoArr['userId'];
            $orderNoOrderId = (int)$orderNoArr['id'];
            if (empty($orderNoArr) || $orderNoUserId <= 0 || $orderNoOrderId <= 0) {
                $this->resp->msg = 'orderNo参数有误';
                $this->jsonView->out($this->resp);
            }
            $param['presentOrderId'] = $orderNoOrderId;
        } else if ($type == 2) {
			if (empty($this->loginUserInfo)) {
				$this->resp->errCode = 1;
				$this->resp->msg = "用户未登录";
				$this->jsonView->out($this->resp);
			}
			$userId = (int)$this->loginUserInfo['userId'];
            $param['userId'] = $userId;
            $param['needReceivedOrder'] = true;
        }
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = '查询订单异常';
            $this->jsonView->out($this->resp);
        }
        $orderListData = $selectOrderResp->data;
        $totalCount = (int)$orderListData['totalCount'];
        $orderList = $orderListData['list'];
        $data = array("totalCount" => $totalCount, 'list' => array());
        if ($type == 1) {
            $orderList = $this->commonService->setUserCache($orderList);
        } else if ($type == 2) {
            $orderList = $this->commonService->setPresentOrder($orderList);
			$presentOrderArr = array();
			foreach ($orderList as &$order) {
				if (!empty($order['presentOrder'])) {
					$presentOrderArr[] = &$order['presentOrder'];
				}
			}
			$this->commonService->setUserCache($presentOrderArr);
        }
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $userId = (int)$orderList[$i]['userId'];
            $orderId = (int)$orderList[$i]['orderId'];
            $presentOrderId = (int)$orderList[$i]['presentOrderId'];
            $amount = (int)$orderList[$i]['amount'];
            if ($userId <= 0 || $orderId <= 0 || $presentOrderId <= 0 || $amount <= 0) {
                continue;
            }
            $orderInfo = array();
            if ($type == 1) {
                $orderInfo['user'] = $orderList[$i]['user'];
            } else if ($type == 2) {
                $orderInfo['user'] = $orderList[$i]['presentOrder']['user'];
                $orderInfo['orderNo'] = trim($this->common->encodeNo($userId, $orderId));
            }
            $orderInfo['amount'] = $amount;
            $orderInfo['createTime'] = trim($orderList[$i]['createTime']);
            $data['list'][] = $orderInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //得到用户接收的订单
    private function getUserReceivedOrder($userId, $presentOrderId) {
        $resp = requireModule("Resp");
		$userId = (int)$userId;
		$presentOrderId = (int)$presentOrderId;
        if ($userId <= 0 || $presentOrderId <= 0) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $param = array();
        $param['userId'] = $userId;
        $param['presentOrderId'] = $presentOrderId;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = "访问异常";
            return $resp;
        }
        $receivedOrderList = $selectOrderResp->data['list'];
		$receivedOrder = null;
		if (is_array($receivedOrderList) && count($receivedOrderList) > 0) {
			$receivedOrder = $receivedOrderList[0];
		}
        $resp->data = $receivedOrder;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //得到用户的优惠券
    private function getUserCoupon($limitParam) {
        $resp = requireModule("Resp");
        $userId = (int)$limitParam['userId'];
        $amount = (int)$limitParam['amount'];
        $lotteryId = trim($limitParam['lotteryId']);
        $source = (int)$limitParam['source'];
        $channel = (int)$limitParam['channel'];
        $couponType = (int)$limitParam['couponType'];  //优惠券类型, 1=消费, 2=充值
        $financeType = (int)$limitParam['financeType'];
        if ($userId <= 0 || $amount <= 0 || $couponType <= 0 ) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $param = array();
        $param['userId'] = $userId;
        $param['financeType'] = $financeType; //资金类型, 0=方案, 1=出票
        $param['couponType'] = $couponType; //优惠券类型, 1=消费, 2=充值
        $param['state'] = 1; //优惠券状态 1:可用, 2:待派发, 3:已用/过期
        $selectUserCouponResp =  $this->couponService->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $resp->msg = "访问异常";
            return $resp;
        }
        $userCouponList = $selectUserCouponResp->data['list'];
        $userCouponArr = array();
        foreach ($userCouponList as $userCoupon) {
            $userCouponId = (int)$userCoupon['userCouponId'];
            $rule = json_decode(trim($userCoupon['rule']), true);
			if ($userCouponId <= 0 || empty($rule)) {
				continue;
			}
			$limitAmount = (int)$rule['amount'];
            $limitLotteryId = $rule['lotteryId'];
            $limitSource = $rule['source'];
            $limitChannel = $rule['channel'];
            //限制金额
            if ($limitAmount > $amount) {
                continue;
            }
            //source
            if (is_array($limitSource) && count($limitSource) > 0 && !in_array($source, $limitSource)) {
                continue;
            }
            //channel
            if (is_array($limitChannel) && count($limitChannel) > 0 && !in_array($channel, $limitChannel)) {
                continue;
            }
			//充值优惠券是针对所有彩种
            if ($couponType == 1 && is_array($limitLotteryId) && count($limitLotteryId) > 0) {
				$newLimitLotteryId = array();
				foreach ($limitLotteryId as $item) {
					$item = trim($item);
					if ($item == 'JJC') {
						$newLimitLotteryId = array_merge($newLimitLotteryId, array('JCZQ','JCLQ','JZYP'));
					} else {
						$newLimitLotteryId[] = $item;
					}
				}
				$limitLotteryId = array_unique($newLimitLotteryId);
				if (!in_array($lotteryId, $limitLotteryId)) {
					continue;
				}
            }
			$userCouponArr[] = $userCoupon;
        }
		$data = null;
        if (count($userCouponArr) > 0) {
            $amountArr = array();
            $endTimeArr = array();
            foreach ($userCouponArr as $item) {
                $amountArr[] = (int)$item['amount'];
				$endTimeArr[] = trim($item['endTime']);
            }
			//按amount倒序 且 endTime升序
			array_multisort($amountArr, SORT_DESC, SORT_NUMERIC, $endTimeArr, SORT_ASC, SORT_STRING, $userCouponArr);
			$data = $userCouponArr[0];
        }
		$resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //渠道商是否有效
    private function channelValid($channel) {
        $resp = requireModule("Resp");
        $channel = (int)$channel;
        if (empty($channel)) {
            $resp->msg = "参数有误";
            return $resp;
        }
		$param = array();
		$param['discard'] = 0;
		$param['channel'] = $channel;
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
        $isValid = !empty($channelData);
        $resp->data = $isValid;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}