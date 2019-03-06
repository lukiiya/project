#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class SendCoupon {
    private $common;
    private $commonService;
    private $couponService;
    private $userService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->couponService = requireService("Coupon");
        $this->userService = requireService("User");
    }
    public function execute() {
        //送优惠券；一共派18张优惠券(15个种类)
        $sendCoupon = false;//是否派送优惠券
        $sendCouponIdArr = array();//派7次
        $sendCouponIdArr[] = array(1,3,4);
        $sendCouponIdArr[] = array(1,2,5);
        $sendCouponIdArr[] = array(2,6);
        $sendCouponIdArr[] = array(1,9,14);
        $sendCouponIdArr[] = array(7,11);
        $sendCouponIdArr[] = array(8,13);
        $sendCouponIdArr[] = array(10,12,15);
        $sendCouponMap = array();
        $couponIdArr = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
        $param = array();
        $param['couponId'] = $couponIdArr;
        $selectCouponResp = $this->couponService->selectCoupon($param);
        if ($selectCouponResp->errCode != 0 || empty($selectCouponResp->data)) {
            $this->common->logger->info('订单数据异常');
        }
        $couponList = $selectCouponResp->data['list'];
        foreach ($couponList as $coupon) {
            $couponId = (int)$coupon['couponId'];
            if ($couponId > 0) {
                $sendCouponMap[$couponId] = $coupon;
            }
        }
        $sendCoupon = count($sendCouponMap) == 15;
        //优惠券派发用户
        $userArr = array(2,460,2142,16,122,176,101280,98992,177,1,853,3);
        $param = array();
        $param['userId'] = $userArr;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userList = $selectUserResp->data['list'];
        $database = requireModule('Database');
        if ($sendCoupon) {
            $userCouponSqlArr = array();
            $offsetTime = 6*24*3600;//每次派送间隔(7天)
            foreach ($userList as $user) {
                $couponEndTime = time();
                $userId = (int)$user['userId'];
                $nickName = trim($user['nickName']);
                $realName = trim($user['realName']);
                foreach ($sendCouponIdArr as $couponIdArr) {
                    $couponBeginTime = $couponEndTime;
                    $couponEndTime = $couponBeginTime + $offsetTime;
                    foreach ($couponIdArr as $couponId) {
                        $coupon = $sendCouponMap[$couponId];
                        $couponType = (int)$coupon['couponType'];
                        $couponAmount = (int)$coupon['amount'];
                        $couponRule = trim($coupon['rule']);
                        if (empty($coupon)) {
                            $database->execute('rollback');
                            $database->close();
                            $this->common->logger->info('优惠券信息异常');
                        }
                        $field = array();
                        $field[] = 'userId="' . $database->escape($userId) . '"';
                        $field[] = 'nickName="' . $database->escape($nickName) . '"';
                        $field[] = 'realName="' . $database->escape($realName) . '"';
                        $field[] = 'couponId="' . $database->escape($couponId) . '"';
                        $field[] = 'financeType=1';
                        $field[] = 'couponType="' . $database->escape($couponType) . '"';
                        $field[] = 'amount="' . $database->escape($couponAmount) . '"';
                        $field[] = 'rule="' . $database->escape($couponRule) . '"';
                        $field[] = 'beginTime="' . $database->escape(date('Y-m-d 00:00:00', $couponBeginTime)) . '"';
                        $field[] = 'endTime="' . $database->escape(date('Y-m-d 23:59:59', $couponEndTime)) . '"';
                        $field[] = 'status=1';
                        $field[] = 'createTime=now()';
                        $userCouponSqlArr[] = 'insert into t_user_coupon set ' . implode(',', $field);
                    }
                    $couponEndTime = $couponEndTime + 1*24*3600;//再多加1天
                }
            }
            if (count($userCouponSqlArr) != count($userList) * 18) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('派送优惠券数量异常');
            }
            $userCouponSql = implode(';', $userCouponSqlArr);
            $userCouponResult = $database->multiExecute($userCouponSql);
            if (!$userCouponResult) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入优惠券异常');
            }
            $userCouponIdArr = $database->multiInsertId();
            if (count($userCouponSqlArr) != count($userCouponIdArr)) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入优惠券异常');
            }
            for ($i = 0, $length = count($userCouponIdArr); $i < $length; $i++) {
                $userCouponId = (int)$userCouponIdArr[$i];
                if ($userCouponId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->common->logger->info('用户优惠券id生成异常');
                }
            }
        }
    }
}
//开始运行
$sendCoupon = new SendCoupon();
//赠送优惠券
$sendCoupon->execute();

