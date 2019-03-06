<?php
namespace controller\portal;
use controller\Base;

class Coupon extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $couponService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->couponService = requireService("Coupon");
	}

	//优惠券列表
    public function userCouponList() {
        //用户是否登入
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];			//用户id
        $state = (int)$this->common->getParam("state", 0);	//优惠券状态 1:可用,2:待派发,3:已用/过期,
        $pageNum = (int)$this->common->getParam("pageNum", 0);	//页码数
        $pageSize = (int)$this->common->getParam("pageSize", 0);	//每页显示数
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 20) {
            $pageSize = 20;
        }
        if (!in_array($state, array(1,2,3))) {
            $this->resp->msg = "state参数异常";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userCouponData = $selectUserCouponResp->data;
        $userCouponList = $userCouponData['list'];
        $data = array("availableCount" => 0, 'distributeCount' => 0, 'totalCount' => 0, 'list' => array());
        $curTime = date('Y-m-d H:i:s');
        $userCouponMap = array();
        foreach ($userCouponList as $userCoupon) {
            $userCouponId = (int)$userCoupon['userCouponId'];
            $userId = (int)$userCoupon['userId'];
            $couponId = (int)$userCoupon['couponId'];
            $couponType = (int)$userCoupon['couponType'];
            $amount = (int)$userCoupon['amount'];
            $beginTime = trim($userCoupon['beginTime']);
            $endTime = trim($userCoupon['endTime']);
            $rule = trim($userCoupon['rule']);
            $ruleArr = json_decode($rule, true);
            $limitAmount = (int)$ruleArr['amount'];
            $status = (int)$userCoupon['status'];
            if ($userCouponId <= 0 || $userId <= 0 || $couponType <= 0 || $amount <= 0 || $status <= 0 || $limitAmount <= 0) {
                continue;
            }
            if ($status == 1 && $beginTime <= $curTime && $curTime <= $endTime) {
                //可以使用的数量
                $data['availableCount'] += 1;
                if ($state == 1) {
                    if (!key_exists($couponId, $userCouponMap)) {
                        $userCouponMap[$couponId] = $userCoupon;
                    }
                    $userCouponMap[$couponId]['count'] += 1;
                }
            } else if ($status == 1 && $beginTime > $curTime) {
                //待派发的数量
                $data['distributeCount'] += 1;
                if ($state == 2) {
                    if (!key_exists($couponId, $userCouponMap)) {
                        $userCouponMap[$couponId] = $userCoupon;
                    }
                    $userCouponMap[$couponId]['count'] += 1;
                }
            } else if ($status == 2 || $curTime > $endTime) {
                if ($state == 3) {
                    if (!key_exists($couponId, $userCouponMap)) {
                        $userCouponMap[$couponId] = $userCoupon;
                    }
                    $userCouponMap[$couponId]['count'] += 1;
                }
            }
        }
        $data['totalCount'] = count($userCouponMap);
        $userCouponArr = array();
        foreach ($userCouponMap as $userCoupon) {
            $financeType = (int)$userCoupon['financeType'];
            $couponType = (int)$userCoupon['couponType'];
            $amount = (int)$userCoupon['amount'];
            $status = (int)$userCoupon['status'];
            $beginTime = (int)strtotime(trim($userCoupon['beginTime']));
            $endTime = (int)strtotime(trim($userCoupon['endTime']));
            $rule = json_decode(trim($userCoupon['rule']), true);
            $count = (int)$userCoupon['count'];
            if ($amount <= 0 || $beginTime <= 0 || $endTime <= 0 || empty($rule) || $count <= 0) {
                continue;
            }
            //$day = (int)(($endTime - $beginTime)/(3600*24)) + 1;
            $expireDay = (int)(($endTime - time())/(3600*24)) + 1;
            $day = $expireDay > 7 ? 7 : $expireDay;
            if ($state == 3) {
                $day = 0;
            }
            $limitAmount = (int)$rule['amount'];
            $limitLotteryId = $rule['lotteryId'];
            if ($limitAmount <= 0) {
                continue;
            }
            $ruleOb = array();
            if ($couponType == 1 && is_array($limitLotteryId) && count($limitLotteryId) > 0) {
                if (in_array('JJC', $limitLotteryId)) {
                    $ruleOb['line1'] = '竞技彩';
                } else if (in_array('SSQ', $limitLotteryId) && in_array('DLT', $limitLotteryId) && in_array('FC3D', $limitLotteryId)) {
                    $ruleOb['line1'] = '数字彩';
                } else if (in_array('GX11X5', $limitLotteryId) && in_array('JSK3', $limitLotteryId)) {
                    $ruleOb['line1'] = '高频彩';
                }
                $ruleOb['line2'] = '满'.($limitAmount/100).'元';
                $ruleOb['line3'] = '减'.($amount/100).'元';
            } else if ($couponType == 2) {
                $ruleOb['line1'] = '彩金专用';
                $ruleOb['line2'] = '充'.($limitAmount/100).'元';
                $ruleOb['line3'] = '送'.($amount/100).'元';
            }
            $userCouponInfo = array();
            $userCouponInfo['financeType'] = $financeType;
            $userCouponInfo['couponType'] = $couponType;
            $userCouponInfo['amount'] = $amount;
            $userCouponInfo['status'] = $status;
            $userCouponInfo['day'] = $day;
            $userCouponInfo['rule'] = $ruleOb;
            $userCouponInfo['count'] = $count;
            $userCouponArr[] = $userCouponInfo;
        }
        $userCouponArrLength = count($userCouponArr);
        if (!empty($userCouponArr) && $userCouponArrLength > 0) {
            $begin = ($pageNum - 1) * $pageSize;
            $end = ($begin + $pageSize) > $userCouponArrLength ? $userCouponArrLength : ($begin + $pageSize);
            for ($i = $begin; $i < $end; $i++) {
                $data['list'][] = $userCouponArr[$i];
            }
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //优惠券领取轮播
    public function receiveUserCouponList() {
        $database = requireModule('Database');
        $sql = 'select userId from t_user_coupon group by userId';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $totalUserCouponList = array();
        while ($info = $database->get($result)) {
            $totalUserCouponList[] = $info;
        }
        $database->free($result);
        $totalCount = (int)count($totalUserCouponList);
        $sql = "select nickName, realName from t_user_coupon group by userId order by couponId desc limit 0,10";
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userCouponList = array();
        while ($info = $database->get($result)) {
            $nickName = mb_substr($info['nickName'], 0, 1);
            if (mb_strlen($nickName) !== 1) {
                continue;
            }
            $userInfo = array();
            $userInfo['nickName'] = $nickName.'***';
            $userCouponList[] = $userInfo;
        }
        $database->free($result);
        $database->close();
        $data = array('list' => $userCouponList, 'totalCount' => $totalCount);
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //用户是否领取过优惠券
    public function isReceiveUserCoupon() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $param = array();
        $param['userId'] = $userId;
        $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userCouponList = $selectUserCouponResp->data['list'];
        $this->resp->data = is_array($userCouponList) && count($userCouponList) > 0;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}