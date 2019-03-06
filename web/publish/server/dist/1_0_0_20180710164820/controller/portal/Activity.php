<?php
namespace controller\portal;
use controller\Base;

class Activity extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;
    private $userService;
    private $activityService;
    private $orderService;
    private $financeService;
    private $smsService;
    private $couponService;
    public $loginUserInfo;
    public $loginUserRight;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
        $this->userService = requireService("User");
        $this->activityService = requireService("Activity");
        $this->orderService = requireService("Order");
        $this->financeService = requireService("Finance");
        $this->couponService = requireService("Coupon");
        $this->smsService = requireService("Sms");
    }

    //得到活动详情
    public function activityInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        //100万红包：activityNo = 5F5E100-BC614F, activityId=1
        //幸运大转盘：activityNo = 5F5E101-BC6150, activityId=2
        //给自己一次"鸡"会(2017春节红包)：activityNo = 5F5E103-BC6152, activityId=4
        $activityNo = trim($this->common->getParam("activityNo", ''));
        if (empty($activityNo)) {
            $this->resp->msg = "activityNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectActivityByNoResp = $this->activityService->selectActivityByNoCache($activityNo);;
        if ($selectActivityByNoResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByNoResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityInfo = array();
        $activityInfo['activityName'] = trim($activityData['activityName']);
        $activityInfo['beginTime'] = trim($activityData['beginTime']);
        $activityInfo['endTime'] = trim($activityData['endTime']);
        $activityInfo['remark'] = trim($activityData['remark']);
        $activityInfo['createTime'] = trim($activityData['createTime']);
        $activityInfo['lastTime'] = trim($activityData['lastTime']);
        $this->resp->data = $activityInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //得到活动详情
    public function isReceiveHongBao() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $param = array();
        $param['userId'] = $userId;
        $selectActivityHongBaoResp = $this->activityService->selectActivityHongBao($param);
        if ($selectActivityHongBaoResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBaoList = $selectActivityHongBaoResp->data['list'];
        $this->resp->data = is_array($hongBaoList) && count($hongBaoList) > 0;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function receiveHongBao() {
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
        $mobile = trim($this->common->getParam("mobile", ''));
        $code = trim($this->common->getParam("code", ''));
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
            $this->resp->msg = "您已经绑定过手机号";
            $this->jsonView->out($this->resp);
        }
        $activityId = 1;//100万红包
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        $activitySumAmount = (int)$activityData['sumAmount'];
        $activitySumCount = (int)$activityData['sumCount'];
        $activityAmount = (int)$activityData['amount'];
        $activityCount = (int)$activityData['count'];
        if ($activityCount >= $activitySumCount || $activityAmount >= $activitySumAmount) {
            $this->resp->msg = "红包已经全部送完";
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
        $selectActivityHongBaoResp = $this->activityService->selectActivityHongBao($param);
        if ($selectActivityHongBaoResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBaoList = $selectActivityHongBaoResp->data['list'];
        if (is_array($hongBaoList) && count($hongBaoList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "您已经领取过红包";
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
        $presentAmount = 1800;
        $financeType = 0;
        //查询用户资金
        $selectFinanceByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceByUserIdResp->errCode != 0) {
            $this->resp->msg = '查询资金异常';
            $this->jsonView->out($this->resp);
        }
        $financeData = $selectFinanceByUserIdResp->data;
        if (empty($financeData)) {
            $this->resp->msg = '资金不存在';
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
            //更新红包活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.$presentAmount.',count=count+1 where activityId="' . $activityId . '" and amount="' . $activityAmount . '" and count="' . $activityCount . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //更新用户电话
            $updateUserSql = 'update t_user set phone="'.$mobile.'" where phone="" and userId="' . $userId . '" limit 1 ';
            $updateUserResult = $database->execute($updateUserSql);
            $updateUserAffectedRows = (int)$database->getAffectedRows();
            if (!$updateUserResult || $updateUserAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //红包记录插入
            $insertActivityHongbaoField = array();
            $insertActivityHongbaoField[] = 'activityId="' . $database->escape($activityId) . '"';
            $insertActivityHongbaoField[] = 'activityName="' . $database->escape($activityName) . '"';
            $insertActivityHongbaoField[] = 'userId="' . $database->escape($userId) . '"';
            $insertActivityHongbaoField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertActivityHongbaoField[] = 'realName="' . $database->escape($realName) . '"';
            $insertActivityHongbaoField[] = 'mobile="' . $database->escape($mobile) . '"';
            $insertActivityHongbaoField[] = 'presentAmount="' . $database->escape($presentAmount) . '"';
            $insertActivityHongbaoField[] = 'createTime=now()';
            $insertActivityHongbaoSql = 'insert into t_activity_hongbao set ' . implode(',', $insertActivityHongbaoField);
            $insertActivityHongbaoResult = $database->execute($insertActivityHongbaoSql);
            $insertActivityHongbaoInsertId = (int)$database->getInsertId();
            if (!$insertActivityHongbaoResult || $insertActivityHongbaoInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeId;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersion;
            $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentAmount;   //平台充值
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
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

    //充值活动
    //充值的10月29日--11月12日，冲100送50，冲500送300，次数不限，其他的不变。
    public function chargeActivityInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $activityInfo = new \stdClass();
        $date = date('Y-m-d');
        if ($date >= '2016-10-29' && $date <= '2016-11-12') {
            $activityInfo->{'100'} = 50;
            $activityInfo->{'500'} = 300;
        }
        $this->resp->data = $activityInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    private function getUserTurnplate($userId) {
        $resp = requireModule('Resp');
        $userId = (int)$userId;
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        $activityId = 2;//幸运大转盘
        $selectActivityByIdResp = $this->activityService->selectActivityByIdCache($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $resp->msg = "查询活动异常";
            return $resp;
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $resp->msg = "活动不存在";
            return $resp;
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        $beginTime = trim($activityData['beginTime']);
        $remark = trim($activityData['remark']);
        $param = array();
        //订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单
        $param['orderType'] = array(0,2,3,5,6,7,8,9);
        $param['userId'] = $userId;
        $param['status'] = 2;
        //$param['beginTime'] = trim($beginTime);
        //3天内的订单有抽奖机会
        $selectBeginTime = trim(date('Y-m-d H:i:s', strtotime('-3 day')));
        $param['beginTime'] = $selectBeginTime > $beginTime ? $selectBeginTime : $beginTime;
        $param['needNotReceivedOrder'] = true;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $orderList = $selectOrderResp->data['list'];
        $data = array('activityId' => $activityId, 'activityName' => $activityName, 'orderIdArr' => array(), 'remark' => $remark);
        if (!is_array($orderList) || count($orderList) <= 0) {
            $resp->data = $data;
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        }
        $orderIdArr = array();
        foreach ($orderList as $order) {
            $orderId = (int)$order['orderId'];
            if ($orderId > 0) {
                $orderIdArr[] = $orderId;
            }
        }
        //已经抽过的orderId
        $param = array();
        $param['userId'] = $userId;
        $selectActivityTurnplateResp = $this->activityService->selectActivityTurnplate($param);
        if ($selectActivityTurnplateResp->errCode != 0) {
            $resp->msg = "查询抽奖异常";
            return $resp;
        }
        $turnplateList = $selectActivityTurnplateResp->data['list'];
        $turnplateOrderIdArr = array();
        foreach ($turnplateList as $turnplate) {
            $orderId = (int)$turnplate['orderId'];
            if ($orderId > 0) {
                $turnplateOrderIdArr[] = $orderId;
            }
        }
        //array_diff(array1, array2)：对比返回在 array1 中但是不在 array2 及任何其它参数数组中的值
        $data['orderIdArr'] = array_diff($orderIdArr, $turnplateOrderIdArr);
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //转盘活动详情页
    public function turnplateActivityInfo() {
        //1:当前用户是否有抽奖机会
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $getUserTurnplateResp = $this->getUserTurnplate($userId);
        $orderIdArr = array();
        $remark = '';
        if ($getUserTurnplateResp->errCode == 0) {
            $orderIdArr = $getUserTurnplateResp->data['orderIdArr'];
            $remark = $getUserTurnplateResp->data['remark'];
        }
        $data['turnplateCount'] = count($orderIdArr);
        $data['remark'] = $remark;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //转盘抽奖
    public function rotateTurnplate() {
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
        $getUserTurnplateResp = $this->getUserTurnplate($userId);
        if ($getUserTurnplateResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userTurnplateData = $getUserTurnplateResp->data;
        $activityId = (int)$userTurnplateData['activityId'];
        $activityName = trim($userTurnplateData['activityName']);
        $orderIdArr = $userTurnplateData['orderIdArr'];
        if (!is_array($orderIdArr) || count($orderIdArr) <= 0) {
            $this->resp->msg = "没有抽奖机会";
            $this->jsonView->out($this->resp);
        }
        reset($orderIdArr);//数组复位
        $orderId = current($orderIdArr);//取出第一个值
        $prizeName = '';
        $title = '';
        $presentAmount = 0;
        //1,50,100,249,600->1,50,100,129,120,300,300->1,51,151,280,400,700,1000
        //球衣0.1%，20米粒5%，5米粒10%，谢谢惠顾24.9%，2米粒60%
        //球衣0，20米粒0，5米粒10%，谢谢惠顾30%，2米粒60% 100,250,400,700,1000
        //球衣0，20米粒0，5米粒10%，2米粒30%，谢谢惠顾60% 100,250,400,700,1000
        //米粒 twoRice1  彩金 twoCj1
        //把2米粒和5米粒改成2彩金和5彩金，满额还是和之前一样，适用彩种随机
        $turnplateArray = array(
            //'poloShirt' => array('title' => '正品球衣', 'chance' => 1, 'presentAmount'=> 0),
            //'twentyRice' => array('title' => '20米粒', 'chance' => 51, 'presentAmount'=> 2000),
            'fiveCj' => array('title' => '5彩金', 'chance' => 100, 'presentAmount'=> 500),
            'twoCj1' => array('title' => '2彩金', 'chance' => 250, 'presentAmount'=> 200),
            'twoCj2' => array('title' => '2彩金', 'chance' => 400, 'presentAmount'=> 200),
            'thk1' => array('title' => '谢谢参与', 'chance' => 700, 'presentAmount'=> 0),
            'thk2' => array('title' => '谢谢参与', 'chance' => 1000, 'presentAmount'=> 0)
        );
        $rand = mt_rand(1,1000);
        foreach($turnplateArray as $k => $turnplate) {
            if($rand <= $turnplate['chance']){
                $prizeName = $k;
                $title = $turnplate['title'];
                $presentAmount = $turnplate['presentAmount'];
                break;
            }
        }
        if ($orderId <= 0 || empty($prizeName) || empty($title)) {
            $this->resp->msg = "抽奖异常";
            $this->jsonView->out($this->resp);
        }
        //优惠券适用彩种随机
        $cj200Arr = array(6,7); //对应的t_coupon表中的couponId
        $cj500Arr = array(8,9,10);
        if ($presentAmount > 0) {
            if ($presentAmount == 200) {
                $k = array_rand($cj200Arr, 1);
                $couponId = (int)$cj200Arr[$k];
            } else if ($presentAmount == 500) {
                $k = array_rand($cj500Arr, 1);
                $couponId = (int)$cj500Arr[$k];
            }
            if ($couponId > 0) {
                $selectCouponByIdResp = $this->couponService->selectCouponById($couponId);
                if ($selectCouponByIdResp->errCode != 0) {
                    $this->resp->msg = '抽奖异常';
                    $this->jsonView->out($this->resp);
                }
                $couponData = $selectCouponByIdResp->data;
                if (empty($couponData)) {
                    $this->resp->msg = '抽奖异常';
                    $this->jsonView->out($this->resp);
                }
                $couponType = (int)$couponData['couponType'];
                $couponSource = 1;//转盘抽奖
                $couponRule = trim($couponData['rule']);
                $couponExpiredTime = (int)$couponData['expiredTime'];
                $couponBeginTime = date('Y-m-d H:i:s');
                $couponEndTime = date('Y-m-d H:i:s', time() + $couponExpiredTime);
                $couponRemake = '转盘抽奖';
            }
        }
        $code = md5($orderId);
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.$presentAmount.',count=count+1 where activityId="' . $activityId . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //抽奖记录插入
            $insertActivityTurnplateField = array();
            $insertActivityTurnplateField[] = 'activityId="' . $database->escape($activityId) . '"';
            $insertActivityTurnplateField[] = 'activityName="' . $database->escape($activityName) . '"';
            $insertActivityTurnplateField[] = 'orderId="' . $database->escape($orderId) . '"';
            $insertActivityTurnplateField[] = 'code="' . $database->escape($code) . '"';
            $insertActivityTurnplateField[] = 'userId="' . $database->escape($userId) . '"';
            $insertActivityTurnplateField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertActivityTurnplateField[] = 'realName="' . $database->escape($realName) . '"';
            $insertActivityTurnplateField[] = 'prizeName="' . $database->escape($title) . '"';
            $insertActivityTurnplateField[] = 'presentAmount="' . $database->escape($presentAmount) . '"';
            $insertActivityTurnplateField[] = 'createTime=now()';
            $insertActivityTurnplateSql = 'insert into t_activity_turnplate set ' . implode(',', $insertActivityTurnplateField);
            $insertActivityTurnplateResult = $database->execute($insertActivityTurnplateSql);
            $insertActivityTurnplateInsertId = (int)$database->getInsertId();
            if (!$insertActivityTurnplateResult || $insertActivityTurnplateInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            if ($presentAmount > 0 && $couponId > 0) {
                //用户优惠券插入
                $insertUserCouponField = array();
                $insertUserCouponField[] = 'userId="' . $database->escape($userId) . '"';
                $insertUserCouponField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertUserCouponField[] = 'realName="' . $database->escape($realName) . '"';
                $insertUserCouponField[] = 'couponId="' . $database->escape($couponId) . '"';
                $insertUserCouponField[] = 'financeType=1';
                $insertUserCouponField[] = 'couponType="' . $database->escape($couponType) . '"';
                $insertUserCouponField[] = 'couponSource="' . $database->escape($couponSource) . '"';
                $insertUserCouponField[] = 'amount="' . $database->escape($presentAmount) . '"';
                $insertUserCouponField[] = 'rule="' . $database->escape($couponRule) . '"';
                $insertUserCouponField[] = 'beginTime="' . $database->escape($couponBeginTime) . '"';
                $insertUserCouponField[] = 'endTime="' . $database->escape($couponEndTime) . '"';
                $insertUserCouponField[] = 'status=1';
                $insertUserCouponField[] = 'remark="' . $database->escape($couponRemake) . '"';
                $insertUserCouponField[] = 'createTime=now()';
                $insertUserCouponSql = 'insert into t_user_coupon set ' . implode(',', $insertUserCouponField);
                $insertUserCouponResult = $database->execute($insertUserCouponSql);
                $insertUserCouponInsertId = (int)$database->getInsertId();
                if (!$insertUserCouponResult || $insertUserCouponInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
            }
            $database->execute('commit');
            $database->close();
            $this->resp->data = $prizeName;
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    //抽奖记录
    public function turnplateList() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
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
        $userId = (int)$this->loginUserInfo['userId'];
        $param = array();
        $param['userId'] = $userId;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectActivityTurnplateResp = $this->activityService->selectActivityTurnplateCache($param);
        if ($selectActivityTurnplateResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $turnplatData = $selectActivityTurnplateResp->data;
        $totalCount = (int)$turnplatData['totalCount'];
        $turnplatList = $turnplatData['list'];
        //时间  奖品  派送方式
        $data = array("totalCount" => $totalCount, 'list' => array());
        foreach ($turnplatList as $turnplate) {
            $createTime = trim($turnplate['createTime']);
            $prizeName = trim($turnplate['prizeName']);
            if ($prizeName == "正品球衣") {
                $sendType = "联系客服";
            } else if ($prizeName == "谢谢参与") {
                $sendType = "谢谢参与";
            } else if (strpos($prizeName, '彩金') !== false) {
                $sendType = "优惠券";
            } else if (strpos($prizeName, '米粒') !== false) {
                $sendType = "系统充值";
            }
            $turnplateInfo = array();
            $turnplateInfo['createTime'] = $createTime;
            $turnplateInfo['prizeName'] = $prizeName;
            $turnplateInfo['sendType'] = $sendType;
            $data['list'][] = $turnplateInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //是否领过春节红包
    public function isReceiveHongBao2017ChunJie() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $param = array();
        $param['userId'] = $userId;
        $selectActivityHongBao2017ChunJieResp = $this->activityService->selectActivityHongBao2017ChunJie($param);
        if ($selectActivityHongBao2017ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2017ChunJieList = $selectActivityHongBao2017ChunJieResp->data['list'];
        $this->resp->data = is_array($hongBao2017ChunJieList) && count($hongBao2017ChunJieList) > 0;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //领取春节红包
    public function receiveHongBao2017ChunJie() {
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
        $mobile = trim($this->common->getParam("mobile", ''));
        $code = trim($this->common->getParam("code", ''));
        if (!empty($mobile) || !empty($code)) {
            if (!$this->common->verifyMobile($mobile)) {
                $this->resp->msg = "手机号码有误";
                $this->jsonView->out($this->resp);
            }
            if (!preg_match("/^\d{6}$/", $code)) {
                $this->resp->msg = "验证码参数有误";
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
            $param = array();
            $param['phone'] = trim($mobile);
            $param['userId'] = $userId;
            $updateUserResp = $this->userService->updateUser($param);
            if ($updateUserResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //把时间设置成1小时前，目的是为了"成功使用后，下次立马能使用"
            $param = array();
            $param['mobile'] = $mobile;
            $param['code'] = '';
            $param['time'] = date("Y-m-d H:i:s", time() - 3600);
            $this->smsService->replaceSmsCode($param);
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "用户查询失败";
            $this->jsonView->out($this->resp);
        }
        $mobile = trim($selectUserByIdResp->data['phone']);
        if (!$this->common->verifyMobile($mobile)) {
            $this->resp->errCode = 4;
            $this->resp->msg = "未验证手机号";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectActivityHongBao2017ChunJieResp = $this->activityService->selectActivityHongBao2017ChunJie($param);
        if ($selectActivityHongBao2017ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2017ChunJieList = $selectActivityHongBao2017ChunJieResp->data['list'];
        if (is_array($hongBao2017ChunJieList) && count($hongBao2017ChunJieList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "您已经领取过红包";
            $this->jsonView->out($this->resp);
        }
        $activityId = 4;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        $activityBeginTime = trim($activityData['beginTime']);
        $activityEndTime = trim($activityData['endTime']);
        $activityAmount = (int)$activityData['amount'];
        $activityCount = (int)$activityData['count'];
        $nowTime = trim(date('Y-m-d H:i:s'));
        if ($activityBeginTime > $nowTime || $activityEndTime < $nowTime) {
            $this->resp->errCode = 2;
            $this->resp->msg = "活动还未开始";
            $this->jsonView->out($this->resp);
        }
        $presentAmount = 600;
        $presentTicketAmount = 500;
        //资金明细表额外表
        //方案资金
        $selectUserFinanceByUserIdResp = $this->financeService->selectFinanceExtraByUserId(0, $userId);
        if ($selectUserFinanceByUserIdResp->errCode != 0) {
            $this->resp->msg = "查询资金异常";
            $this->jsonView->out($this->resp);
        }
        $planFinanceData = $selectUserFinanceByUserIdResp->data;
        if (empty($planFinanceData)) {
            $this->resp->msg = "方案资金不存在";
            $this->jsonView->out($this->resp);
        }
        $planFinanceId = $planFinanceData['financeId'];
        $planDataVersion = $planFinanceData['dataVersion'];
        //出票资金
        $selectUserFinanceByUserIdResp = $this->financeService->selectFinanceExtraByUserId(1, $userId);
        if ($selectUserFinanceByUserIdResp->errCode != 0) {
            $this->resp->msg = "查询资金异常";
            $this->jsonView->out($this->resp);
        }
        $ticketFinanceData = $selectUserFinanceByUserIdResp->data;
        if (empty($ticketFinanceData)) {
            $this->resp->msg = "出票资金不存在";
            $this->jsonView->out($this->resp);
        }
        $ticketFinanceId = $ticketFinanceData['financeId'];
        $ticketDataVersion = $ticketFinanceData['dataVersion'];
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //资金明细表额外表
            $planUpdateFinanceSqlExtraParam = array();
            $planUpdateFinanceSqlExtraParam['financeId'] = $planFinanceId;
            $planUpdateFinanceSqlExtraParam['nickName'] = $nickName;
            $planUpdateFinanceSqlExtraParam['realName'] = $realName;
            $planUpdateFinanceSqlExtraParam['dataVersion'] = $planDataVersion;
            $ticketUpdateFinanceSqlExtraParam = array();
            $ticketUpdateFinanceSqlExtraParam['financeId'] = $ticketFinanceId;
            $ticketUpdateFinanceSqlExtraParam['nickName'] = $nickName;
            $ticketUpdateFinanceSqlExtraParam['realName'] = $realName;
            $ticketUpdateFinanceSqlExtraParam['dataVersion'] = $ticketDataVersion;
            //更新红包活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.($presentAmount+$presentTicketAmount).',count=count+1 where activityId="' . $activityId . '" and amount="' . $activityAmount . '" and count="' . $activityCount . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //2017春节红包记录插入
            $insertActivityHongbao2017ChunJieField = array();
            $insertActivityHongbao2017ChunJieField[] = 'activityId="' . $database->escape($activityId) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'activityName="' . $database->escape($activityName) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'userId="' . $database->escape($userId) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'realName="' . $database->escape($realName) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'mobile="' . $database->escape($mobile) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'presentAmount="' . $database->escape($presentAmount) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'presentTicketAmount="' . $database->escape($presentTicketAmount) . '"';
            $insertActivityHongbao2017ChunJieField[] = 'createTime=now()';
            $insertActivityHongbao2017ChunJieSql = 'insert into t_activity_hongbao_2017_chunjie set ' . implode(',', $insertActivityHongbao2017ChunJieField);
            $insertActivityHongbao2017ChunJieResult = $database->execute($insertActivityHongbao2017ChunJieSql);
            $insertActivityHongbao2017ChunJieInsertId = (int)$database->getInsertId();
            if (!$insertActivityHongbao2017ChunJieResult || $insertActivityHongbao2017ChunJieInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //米粒充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType=0';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //米粒充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType=0';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($presentAmount) . '"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //资金明细表额外表
            $planUpdateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentAmount;   //平台赠送米粒
            //彩金充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType=1';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentTicketAmount) . '"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //彩金充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType=1';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($presentTicketAmount) . '"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //资金明细表额外表
            $ticketUpdateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentTicketAmount;//平台赠送彩金
            //方案
            $planUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $planUpdateFinanceSqlExtraParam);
            $planUpdateFinanceSqlExtra = $planUpdateFinanceSqlExtraResp->data;
            if ($planUpdateFinanceSqlExtraResp->errCode != 0 || empty($planUpdateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $planUpdateFinanceResultExtra = $database->execute($planUpdateFinanceSqlExtra);
            $planUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$planUpdateFinanceResultExtra || $planUpdateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //出票
            $ticketUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $ticketUpdateFinanceSqlExtraParam);
            $ticketUpdateFinanceSqlExtra = $ticketUpdateFinanceSqlExtraResp->data;
            if ($ticketUpdateFinanceSqlExtraResp->errCode != 0 || empty($ticketUpdateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $ticketUpdateFinanceResultExtra = $database->execute($ticketUpdateFinanceSqlExtra);
            $ticketUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$ticketUpdateFinanceResultExtra || $ticketUpdateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    //阶段，红包是否被抢完，用户是否领取过
    public function hongBao2018ChunJieInfo() {
        $period = 0;
        $isBegin = false;   //不可抢
        $curDate = date('Y-m-d H:i:s');
        if ($curDate <= '2018-02-16 18:00:00') {
            $period = 1;
            if ($curDate >= '2018-02-16 08:00:00') {
                $isBegin = true;
            }
        } else if($curDate <= '2018-02-20 18:00:00') {
            $period = 2;
            if ($curDate >= '2018-02-20 08:00:00') {
                $isBegin = true;
            }
        } else if($curDate <= '2018-02-22 18:00:00') {
            $period = 3;
            if ($curDate >= '2018-02-22 08:00:00') {
                $isBegin = true;
            }
        }
        $data = array('period' => $period, 'isBegin' => $isBegin, 'isReceiveFinish'=>false ,'isReceive'=>false);
        if ($period == 0) {
            $this->resp->data = $data;
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        }
        //红包是否被抢完
        $param = array();
        $param['period'] = $period;
        $param['status'] = 1;   //未被领取的红包
        $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
        if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2018ChunJieList = $selectActivityHongBao2018ChunJieResp->data['list'];
        $data['isReceiveFinish'] = !(is_array($hongBao2018ChunJieList) && count($hongBao2018ChunJieList) > 0);
        //用户是否领取过
        if (!empty($this->loginUserInfo)) {
            $userId = (int)$this->loginUserInfo['userId'];
            $param = array();
            $param['period'] = $period;
            $param['userId'] = $userId;
            $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
            if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $hongBao2018ChunJieList = $selectActivityHongBao2018ChunJieResp->data['list'];
            $data['isReceive'] = is_array($hongBao2018ChunJieList) && count($hongBao2018ChunJieList) > 0;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //领取红包
    public function receiveHongBao2018ChunJie() {
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
        $curDate = date('Y-m-d H:i:s');
        $period = 0;
        if ($curDate <= '2018-02-16 18:00:00') {
            $period = 1;
        } else if($curDate <= '2018-02-20 18:00:00') {
            $period = 2;
        } else if($curDate <= '2018-02-22 18:00:00') {
            $period = 3;
        }
        if ($period == 1) {
            $beginTime = '2018-02-16 08:00:00';
        }else if ($period == 2) {
            $beginTime = '2018-02-20 08:00:00';
        }else if ($period == 3) {
            $beginTime = '2018-02-22 08:00:00';
        }
        if ($period == 0) {
            $this->resp->data = array('period' => $period);
            $this->resp->code = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        }
        if ($curDate < $beginTime) {
            $this->resp->data = array('period' => $period);
            $this->resp->msg = "未到开抢时间";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        //是否已经领取过红包
        $param = array();
        $param['userId'] = $userId;
        $param['period'] = $period;
        $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
        if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2018ChunJieList = $selectActivityHongBao2018ChunJieResp->data['list'];
        if (is_array($hongBao2018ChunJieList) && count($hongBao2018ChunJieList) > 0) {
            $this->resp->data = array('period' => $period);
            $this->resp->code = 3;
            $this->resp->msg = "已抢过红包";
            $this->jsonView->out($this->resp);
        }
        //红包是否被抢完
        $param = array();
        $param['period'] = $period;
        $param['status'] = 1;
        $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
        if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2018ChunJieList = $selectActivityHongBao2018ChunJieResp->data['list'];
        if (!is_array($hongBao2018ChunJieList) || count($hongBao2018ChunJieList) <= 0) {
            $this->resp->data = array('period' => $period);
            $this->resp->msg = "红包已抢完";
            $this->jsonView->out($this->resp);
        }
        //活动查询
        $activityId = 8;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        //领取红包，随机抽取
        $random = rand(0, count($hongBao2018ChunJieList));
        $hongBaoInfo = $hongBao2018ChunJieList[$random];
        $hongBaoId = (int)$hongBaoInfo['hongbaoId'];
        $hongBaoActivityId = (int)$hongBaoInfo['activityId'];
        $hongBaoPeriod = (int)$hongBaoInfo['period'];
        $hongBaoUserId = (int)$hongBaoInfo['userId'];
        $presentTicketAmount = (int)$hongBaoInfo['presentTicketAmount'];
        if ($hongBaoId <= 0 || $hongBaoActivityId != 8 || $period != $hongBaoPeriod || $hongBaoUserId != 0 || $presentTicketAmount <= 0) {
            $this->resp->msg = "红包领取异常";
            $this->jsonView->out($this->resp);
        }
        //资金明细表额外表
        $financeType = 1;
        $selectUserFinanceByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectUserFinanceByUserIdResp->errCode != 0) {
            $this->resp->msg = "查询资金异常";
            $this->jsonView->out($this->resp);
        }
        $financeData = $selectUserFinanceByUserIdResp->data;
        if (empty($financeData)) {
            $this->resp->msg = "出票资金不存在";
            $this->jsonView->out($this->resp);
        }
        $financeId = $financeData['financeId'];
        $dataVersion = $financeData['dataVersion'];
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //资金明细表额外表
            $ticketUpdateFinanceSqlExtraParam = array();
            $ticketUpdateFinanceSqlExtraParam['financeId'] = $financeId;
            $ticketUpdateFinanceSqlExtraParam['nickName'] = $nickName;
            $ticketUpdateFinanceSqlExtraParam['realName'] = $realName;
            $ticketUpdateFinanceSqlExtraParam['dataVersion'] = $dataVersion;
            //更新红包活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.$presentTicketAmount.',count=count+1 where activityId="' . $activityId . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //2018春节红包记录更新
            $updateActivityHongBao2018ChunJieField = array();
            $updateActivityHongBao2018ChunJieField[] = 'userId="' . $database->escape($userId) . '"';
            $updateActivityHongBao2018ChunJieField[] = 'nickName="' . $database->escape($nickName) . '"';
            $updateActivityHongBao2018ChunJieField[] = 'realName="' . $database->escape($realName) . '"';
            $updateActivityHongBao2018ChunJieSql = 'update t_activity_hongbao_2018_chunjie set ' . implode(',', $updateActivityHongBao2018ChunJieField) . ' where userId=0 and hongbaoId="' .$hongBaoId . '" and period="' . $hongBaoPeriod. '" limit 1 ';
            $updateActivityHongBao2018ChunJieResult = $database->execute($updateActivityHongBao2018ChunJieSql);
            $updateActivityHongBao2018ChunJieAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityHongBao2018ChunJieResult || $updateActivityHongBao2018ChunJieAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //彩金充值流水插入
            $insertFinanceChargeRecordField = array();
            $insertFinanceChargeRecordField[] = 'financeType=1';
            $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
            $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentTicketAmount) . '"';
            $insertFinanceChargeRecordField[] = 'createTime=now()';
            $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
            $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
            $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //彩金充值插入
            $insertFinanceChargeField = array();
            $insertFinanceChargeField[] = 'financeType=1';
            $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
            $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
            $insertFinanceChargeField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($presentTicketAmount) . '"';
            $insertFinanceChargeField[] = 'createTime=now()';
            $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
            $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
            $insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //资金明细表额外表
            $ticketUpdateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentTicketAmount;//平台赠送彩金
            //出票
            $ticketUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $ticketUpdateFinanceSqlExtraParam);
            $ticketUpdateFinanceSqlExtra = $ticketUpdateFinanceSqlExtraResp->data;
            if ($ticketUpdateFinanceSqlExtraResp->errCode != 0 || empty($ticketUpdateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $ticketUpdateFinanceResultExtra = $database->execute($ticketUpdateFinanceSqlExtra);
            $ticketUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$ticketUpdateFinanceResultExtra || $ticketUpdateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $data = array('period' => $period, 'presentTicketAmount' => $presentTicketAmount);
            $this->resp->errCode = 0;
            $this->resp->data = $data;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    //红包领取列表
    public function hongBao2018ChunJieList() {
        $param = array();
        $param['status'] = 2;    //已经被领取过
        $param['presentTicketAmount'] = array(888, 6888, 11888, 16888);
        $param['needCount'] = true;
        $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
        if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBao2018ChunJieList = $selectActivityHongBao2018ChunJieResp->data['list'];
        $totalCount = (int)$selectActivityHongBao2018ChunJieResp->data['totalCount'];
        $data = array("totalCount" => $totalCount, 'list' => array());
        foreach ($hongBao2018ChunJieList as $item) {
            $nickName = trim($item['nickName']);
            $prizeTicketAmount = (int)$item['presentTicketAmount'];
            $nickName = mb_substr($nickName, 0, 1);
            if (mb_strlen($nickName) !== 1) {
                continue;
            }
            $hongBao2018ChunJieInfo = array();
            $hongBao2018ChunJieInfo['nickName'] = $nickName.'***';
            $hongBao2018ChunJieInfo['prizeTicketAmount'] = $prizeTicketAmount;
            $data['list'][] = $hongBao2018ChunJieInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function hongBaoDailyInfo() {
        $data = array('isReceiveFinish'=>false ,'isReceiveHongbao'=>false, 'isReceiveCoupon' => false, 'receiveCouponType' => 0);
        //红包是否被抢完
        $curDate = date('Y-m-d');
        $param = array();
        $param['beginTime'] = $curDate;
        $param['endTime'] = $curDate;
        $selectActivityHongBaoDailyResp = $this->activityService->selectActivityHongBaoDaily($param);
        if ($selectActivityHongBaoDailyResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBaoDailyList = $selectActivityHongBaoDailyResp->data['list'];
        $userIdArr = [];
        foreach ($hongBaoDailyList as $hongBaoDaily) {
            $uId = (int)$hongBaoDaily['userId'];
            if ($uId > 0) {
                $userIdArr[] = $uId;
            }
        }
        $data['isReceiveFinish'] = count($userIdArr) == count($hongBaoDailyList);
        //用户是否领取过
        if (!empty($this->loginUserInfo)) {
            $userId = (int)$this->loginUserInfo['userId'];
            if ($userId > 0) {
                $data['isReceiveHongbao'] = in_array($userId, $userIdArr);
                //满额领优惠券是否领取过
                $param = array();
                $param['userId'] = $userId;
                $param['couponSource'] = 3;
                $param['beginTime'] = $curDate;
                $param['endTime'] = $curDate;
                $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
                if ($selectUserCouponResp->errCode != 0) {
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
                $couponList = $selectUserCouponResp->data['list'];
                $data['isReceiveCoupon'] = is_array($couponList) && count($couponList) > 0;
                $couponId = (int)$couponList[0]['couponId'];
                $type = 0;
                if ($couponId == 6) {
                    $type = 1;
                } elseif ($couponId == 8) {
                    $type = 2;
                } elseif ($couponId == 11) {
                    $type = 3;
                }
                $data['receiveCouponType'] = $type;
            }
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //天天抢红包领取
    public function receiveHongBaoDaily() {

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
        //领取时间范围
        $time = time();
        $curDate = date('Y-m-d', $time);
        $curTime = date('H:i:s', $time);
        if ($curTime < '09:00:00' || $curTime > '23:59:59') {
            $this->resp->errCode = 2;
            $this->resp->msg = "未到领取时间";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['beginTime'] = $curDate;
        $param['endTime'] = $curDate;
        $selectActivityHongBaoDailyResp = $this->activityService->selectActivityHongBaoDaily($param);
        if ($selectActivityHongBaoDailyResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $hongBaoDailyList = $selectActivityHongBaoDailyResp->data['list'];
        if (!is_array($hongBaoDailyList) || count($hongBaoDailyList) <= 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        //未被领取
        $unreceivedArr = [];
        $userIdArr = [];
        foreach ($hongBaoDailyList as $hongBaoDaily) {
            $uId = (int)$hongBaoDaily['userId'];
            if ($uId > 0) {
                $userIdArr[] = $uId;
            } else {
                $unreceivedArr[] = $hongBaoDaily;
            }
        }
        if (count($userIdArr) == count($hongBaoDailyList)) {
            $this->resp->msg = "今日红包已抢完";
            $this->jsonView->out($this->resp);
        } else if (in_array($userId, $userIdArr)) {
            $this->resp->code = 3;
            $this->resp->msg = "已领取过红包";
            $this->jsonView->out($this->resp);
        }
        //活动查询
        $activityId = 9;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        //领取红包，随机抽取
        $random = rand(0, count($unreceivedArr));
        $hongBaoInfo = $unreceivedArr[$random];
        $hongBaoId = (int)$hongBaoInfo['hongbaoId'];
        $hongBaoActivityId = (int)$hongBaoInfo['activityId'];
        $hongBaoType = (int)$hongBaoInfo['type'];
        $hongBaoUserId = (int)$hongBaoInfo['userId'];
        $hongBaoAmount = (int)$hongBaoInfo['amount'];
        $hongBaoCouponId = (int)$hongBaoInfo['couponId'];
        if (empty($hongBaoInfo) || $hongBaoId <= 0 || $hongBaoActivityId != 9 || ($hongBaoType != 1 && $hongBaoType != 2) || $hongBaoUserId != 0 || $hongBaoAmount <= 0 || ($hongBaoType == 2 && $hongBaoCouponId <= 0)) {
            $this->resp->msg = "红包领取异常";
            $this->jsonView->out($this->resp);
        }
        $financeId = 0;
        $dataVersion = 0;
        if ($hongBaoType == 1) {
            //彩金
            $financeType = 1;
            $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
            if ($selectFinanceExtraByUserIdResp->errCode != 0) {
                $this->resp->msg = "查询资金异常";
                $this->jsonView->out($this->resp);
            }
            $financeData = $selectFinanceExtraByUserIdResp->data;
            if (empty($financeData)) {
                $this->resp->msg = "出票资金不存在";
                $this->jsonView->out($this->resp);
            }
            $financeId = (int)$financeData['financeId'];
            $dataVersion = (int)$financeData['dataVersion'];
        } else if ($hongBaoType == 2 && $hongBaoCouponId > 0) {
            //优惠券
            $selectCouponByIdResp = $this->couponService->selectCouponById($hongBaoCouponId);
            if ($selectCouponByIdResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $couponData = $selectCouponByIdResp->data;
            if (empty($couponData)) {
                $this->resp->msg = "优惠券不存在";
                $this->jsonView->out($this->resp);
            }
            $couponType = (int)$couponData['couponType'];
            $couponRule = trim($couponData['rule']);
            $couponAmount= (int)$couponData['amount'];
            $rule = json_decode($couponRule, true);
            $limitAmount = (int)$rule['amount'];
        }
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //更新红包活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.$hongBaoAmount.',count=count+1 where activityId="' . $activityId . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //红包记录更新
            $updateActivityHongBaoDailyField = array();
            $updateActivityHongBaoDailyField[] = 'userId="' . $database->escape($userId) . '"';
            $updateActivityHongBaoDailyField[] = 'nickName="' . $database->escape($nickName) . '"';
            $updateActivityHongBaoDailyField[] = 'realName="' . $database->escape($realName) . '"';
            $updateActivityHongBaoDailySql = 'update t_activity_hongbao_daily set ' . implode(',', $updateActivityHongBaoDailyField) . ' where userId=0 and hongbaoId="' .$hongBaoId . '" limit 1 ';
            $updateActivityHongBaoDailyResult = $database->execute($updateActivityHongBaoDailySql);
            $updateActivityHongBaoDailyAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityHongBaoDailyResult || $updateActivityHongBaoDailyAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            if ($hongBaoType == 1 && $financeId > 0) {
                //资金明细表额外表
                $updateFinanceSqlExtraParam = array();
                $updateFinanceSqlExtraParam['financeId'] = $financeId;
                $updateFinanceSqlExtraParam['nickName'] = $nickName;
                $updateFinanceSqlExtraParam['realName'] = $realName;
                $updateFinanceSqlExtraParam['dataVersion'] = $dataVersion;
                //彩金充值流水插入
                $insertFinanceChargeRecordField = array();
                $insertFinanceChargeRecordField[] = 'financeType=1';
                $insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceChargeRecordField[] = 'remark="' . $database->escape($activityName) . '"';
                $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($hongBaoAmount) . '"';
                $insertFinanceChargeRecordField[] = 'createTime=now()';
                $insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
                $insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
                $insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
                //彩金充值插入
                $insertFinanceChargeField = array();
                $insertFinanceChargeField[] = 'financeType=1';
                $insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceChargeField[] = 'remark="' . $database->escape($activityName) . '"';
                $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
                $insertFinanceChargeField[] = 'amount="' . $database->escape($hongBaoAmount) . '"';
                $insertFinanceChargeField[] = 'createTime=now()';
                $insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
                $insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
                $insertFinanceChargeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
                //资金明细表额外表
                $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $hongBaoAmount;//平台赠送彩金
                //资金明细表额外表
                $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
                $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
                if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "更新资金异常";
                    $this->jsonView->out($this->resp);
                }
                $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
                $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "更新资金异常";
                    $this->jsonView->out($this->resp);
                }
            } else if ($hongBaoType == 2 && $hongBaoCouponId > 0) {
                $couponBeginTime = date('Y-m-d H:i:s', $time);
                $couponEndTime = date('Y-m-d H:i:s', $time + 7*24*3600);
                $couponSource = 2;  //优惠券类来源, 0=首充20, 1=转盘抽奖, 2=天天抢红包, 3=满额抢红包
                $insertUserCouponField = array();
                $insertUserCouponField[] = 'userId="' . $database->escape($userId) . '"';
                $insertUserCouponField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertUserCouponField[] = 'realName="' . $database->escape($realName) . '"';
                $insertUserCouponField[] = 'couponId="' . $database->escape($hongBaoCouponId) . '"';
                $insertUserCouponField[] = 'financeType=1';
                $insertUserCouponField[] = 'couponType="' . $database->escape($couponType) . '"';
                $insertUserCouponField[] = 'couponSource="' . $database->escape($couponSource) . '"';
                $insertUserCouponField[] = 'amount="' . $database->escape($couponAmount) . '"';
                $insertUserCouponField[] = 'rule="' . $database->escape($couponRule) . '"';
                $insertUserCouponField[] = 'beginTime="' . $database->escape($couponBeginTime) . '"';
                $insertUserCouponField[] = 'endTime="' . $database->escape($couponEndTime) . '"';
                $insertUserCouponField[] = 'status=1';
                $insertUserCouponField[] = 'remark="' . $database->escape($activityName) . '"';
                $insertUserCouponField[] = 'createTime=now()';
                $insertUserCouponSql = 'insert into t_user_coupon set ' . implode(',', $insertUserCouponField);
                $insertUserCouponResult = $database->execute($insertUserCouponSql);
                $insertUserCouponInsertId = (int)$database->getInsertId();
                if (!$insertUserCouponResult || $insertUserCouponInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "访问异常";
                    $this->jsonView->out($this->resp);
                }
            }
            $database->execute('commit');
            $database->close();
            $info = '';
            if ($hongBaoType == 1) {
                $info = $hongBaoAmount/100;
            } else if ($hongBaoType == 2) {
                if ($couponType == 1) {
                    $info = '满'. $limitAmount/100 .'减' . $hongBaoAmount/100;
                } else if ($couponType == 2)
                    $info = '充'. $limitAmount/100 .'送' . $hongBaoAmount/100;
            }
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $data = array('type' => $hongBaoType, 'info' => $info);
            $this->resp->errCode = 0;
            $this->resp->data = $data;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    //满额消费领取优惠券
    public function receiveCoupon() {
        //竞彩满100元减2元->couponId=6->当天消费总额满500
        //竞彩满250元减5元->couponId=8->满3000
        //竞彩满400元减8元->couponId=11->满8000
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
        $type = (int)$this->common->getParam("type", '');
        if (!in_array($type, array(1,2,3))) {
            $this->resp->msg = "优惠券类型有误";
            $this->jsonView->out($this->resp);
        }
        //活动查询 满额抽优惠券
        $activityId = 10;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        //查询当天用户彩票消费总额
        $time = time();
        $curDate = date('Y-m-d', $time);
        $param = array();
        $param['userId'] = $userId;
        $param['orderType'] = array(3,7,9);
        $param['status'] = 2;
        $param['beginTime'] = $curDate;
        $param['endTime'] = $curDate;
        $param['justCount'] = true;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "查询订单异常";
            $this->jsonView->out($this->resp);
        }
        $totalAmount = (int)$selectOrderResp->data['totalAmount'];
        $couponId = 0;
        if ($type == 1 && $totalAmount >= 50000) {
            $couponId = 6;
        } else if ($type == 2 && $totalAmount >= 300000) {
            $couponId = 8;
        } else if ($type == 3 && $totalAmount >= 800000) {
            $couponId = 11;
        }
        if ($couponId <= 0) {
            $this->resp->errCode = 2;
            $this->resp->msg = "不满足领取条件";
            $this->jsonView->out($this->resp);
        }
        //当天是否已经领取过
        $param = array();
        $param['userId'] = $userId;
        $param['couponSource'] = 3;
        $param['beginTime'] = $curDate;
        $param['endTime'] = $curDate;
        $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $couponList = $selectUserCouponResp->data['list'];
        if (is_array($couponList) && count($couponList) > 0) {
            $this->resp->errCode = 3;
            $this->resp->msg = "已领取";
            $this->jsonView->out($this->resp);
        }
        $selectCouponByIdResp = $this->couponService->selectCouponById($couponId);
        if ($selectCouponByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $couponData = $selectCouponByIdResp->data;
        if (empty($couponData)) {
            $this->resp->msg = "优惠券不存在";
            $this->jsonView->out($this->resp);
        }
        $couponType = (int)$couponData['couponType'];
        $couponRule = trim($couponData['rule']);
        $couponAmount= (int)$couponData['amount'];
        $rule = json_decode($couponRule, true);
        $limitAmount = (int)$rule['amount'];
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //更新红包活动领取数量
            $updateActivitySql = 'update t_activity set amount=amount+'.$couponAmount.',count=count+1 where activityId="' . $activityId . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $couponBeginTime = date('Y-m-d H:i:s', $time);
            $couponEndTime = date('Y-m-d H:i:s', $time + 7*24*3600);
            $couponSource = 3; //优惠券类来源, 0=首充20, 1=转盘抽奖, 2=天天抢红包, 3=满额抢红包
            $insertUserCouponField = array();
            $insertUserCouponField[] = 'userId="' . $database->escape($userId) . '"';
            $insertUserCouponField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertUserCouponField[] = 'realName="' . $database->escape($realName) . '"';
            $insertUserCouponField[] = 'couponId="' . $database->escape($couponId) . '"';
            $insertUserCouponField[] = 'financeType=1';
            $insertUserCouponField[] = 'couponType="' . $database->escape($couponType) . '"';
            $insertUserCouponField[] = 'couponSource="' . $database->escape($couponSource) . '"';
            $insertUserCouponField[] = 'amount="' . $database->escape($couponAmount) . '"';
            $insertUserCouponField[] = 'rule="' . $database->escape($couponRule) . '"';
            $insertUserCouponField[] = 'beginTime="' . $database->escape($couponBeginTime) . '"';
            $insertUserCouponField[] = 'endTime="' . $database->escape($couponEndTime) . '"';
            $insertUserCouponField[] = 'status=1';
            $insertUserCouponField[] = 'remark="' . $database->escape($activityName) . '"';
            $insertUserCouponField[] = 'createTime=now()';
            $insertUserCouponSql = 'insert into t_user_coupon set ' . implode(',', $insertUserCouponField);
            $insertUserCouponResult = $database->execute($insertUserCouponSql);
            $insertUserCouponInsertId = (int)$database->getInsertId();
            if (!$insertUserCouponResult || $insertUserCouponInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            $info = '满'.($limitAmount/100).'元减'.($couponAmount/100).'元';
            $this->resp->errCode = 0;
            $this->resp->data = array('type' => $type, 'info' =>$info);
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    //冠军竞猜
    public function guessWinner() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $teamId = (int)$this->common->getParam("teamId", 0);
        $teams = array(1=>'俄罗斯', 2=>'新西兰', 3=>'葡萄牙', 4=>'墨西哥', 5=>'喀麦隆', 6=>'智利', 7=>'澳大利亚', 8=>'德国');
        $teamName = trim($teams[$teamId]);
        if ($teamId <= 0 || empty($teamName)) {
            $this->resp->msg = "teamId参数错误";
            $this->jsonView->out($this->resp);
        }
        //用户是否参与过活动
        $getUserGuessResp = $this->getUserGuess($userId);
        if ($getUserGuessResp->errCode != 0) {
            $this->resp->msg = '参数异常';
            $this->jsonView->out($this->resp);
        }
        $userGuessData = $getUserGuessResp->data;
        if (is_array($userGuessData) || !empty($userGuessData)) {
            $this->resp->errCode = 3;
            $this->resp->msg = "您已经参与过竞猜";
            $this->jsonView->out($this->resp);
        }
        $activityId = 6;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->resp->msg = "活动不存在";
            $this->jsonView->out($this->resp);
        }
        $activityId = (int)$activityData['activityId'];
        $activityName = trim($activityData['activityName']);
        $activityEndTime = trim($activityData['endTime']);
        $nowTime = trim(date('Y-m-d H:i:s'));
        if ($activityEndTime < $nowTime) {
            $this->resp->errCode = 2;
            $this->resp->msg = "活动已结束";
            $this->jsonView->out($this->resp);
        }
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //更新活动领取数量
            $updateActivitySql = 'update t_activity set count=count+1 where activityId="' . $activityId . '" limit 1 ';
            $updateActivityResult = $database->execute($updateActivitySql);
            $updateActivityAffectedRows = (int)$database->getAffectedRows();
            if (!$updateActivityResult || $updateActivityAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            //活动表中插入记录
            $insertActivityGuessField = array();
            $insertActivityGuessField[] = 'activityId="' . $database->escape($activityId) . '"';
            $insertActivityGuessField[] = 'activityName="' . $database->escape($activityName) . '"';
            $insertActivityGuessField[] = 'userId="' . $database->escape($userId) . '"';
            $insertActivityGuessField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertActivityGuessField[] = 'realName="' . $database->escape($realName) . '"';
            $insertActivityGuessField[] = 'teamId="' . $database->escape($teamId) . '"';
            $insertActivityGuessField[] = 'teamName="' . $database->escape($teamName) . '"';
            $insertActivityGuessField[] = 'createTime=now()';
            $insertActivityGuessSql = 'insert into t_activity_confederations_cup set ' . implode(',', $insertActivityGuessField);
            $insertActivityGuessResult = $database->execute($insertActivityGuessSql);
            $insertActivityGuessInsertId = (int)$database->getInsertId();
            if (!$insertActivityGuessResult || $insertActivityGuessInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            $this->resp->errCode = 0;
            $this->resp->msg = "成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }

    public function guessInfo() {
        $userGuessData = new \stdClass();
        if (!empty($this->loginUserInfo)) {
            $userId = (int)$this->loginUserInfo['userId'];
            $getUserGuessResp = $this->getUserGuess($userId);
            if ($getUserGuessResp->errCode != 0) {
                $this->resp->msg = '参数异常';
                $this->jsonView->out($this->resp);
            }
            $data = $getUserGuessResp->data;
            if (!empty($data)) {
                $userGuessInfo = array();
                $userGuessInfo['nickName'] = trim($data['nickName']);
                $userGuessInfo['realName'] = trim($data['realName']);
                $userGuessInfo['teamId'] =  (int)$data['teamId'];
                $userGuessInfo['teamName'] = trim($data['teamName']);
                $userGuessData = $userGuessInfo;
            }
        }
        //球队投注结果
        $teams = array(1=>'俄罗斯', 2=>'新西兰', 3=>'葡萄牙', 4=>'墨西哥', 5=>'喀麦隆', 6=>'智利', 7=>'澳大利亚', 8=>'德国');
        $selectActivityConfederationsCupStatisticsResp = $this->activityService->selectActivityConfederationsCupStatisticsCache();
        if ($selectActivityConfederationsCupStatisticsResp->errCode != 0) {
            $this->resp->msg = '参数异常';
            $this->jsonView->out($this->resp);
        }
        $guessData = $selectActivityConfederationsCupStatisticsResp->data;
        $totalCount = (int)$guessData['totalCount'];
        $guessList = $guessData['list'];
        $guessMap = array();
        if ($totalCount > 0 && is_array($guessList) && count($guessList) > 0) {
            for ($i = 0, $length = count($guessList); $i < $length; $i++) {
                $guessInfo = array();
                $teamId = (int)$guessList[$i]['teamId'];
                $teamName = trim($guessList[$i]['teamName']);
                $guessTotalCount = (int)$guessList[$i]['totalCount'];
                if ($teamId <= 0 || $teams[$teamId] != $teamName || $guessTotalCount <= 0) {
                    continue;
                }
                $guessInfo['teamId'] = $teamId;
                $guessInfo['teamName'] = $teamName;
                $guessInfo['guessTotalCount'] = $guessTotalCount;
                $guessRate = $guessTotalCount/$totalCount;
                $guessInfo['guessRate'] = trim(sprintf("%01.1f", $guessRate*100).'%');
                $guessMap[] = $guessInfo;
            }
        }
        $data = array('userGuessData' => $userGuessData, 'teamGuessList' => $guessMap);
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //是否参与过竞猜
    private function getUserGuess($userId) {
        $resp = requireModule("Resp");
        $userId = (int)$userId;
        if ($userId <= 0) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $param = array();
        $param['userId'] = $userId;
        $selectActivityConfederationsCupResp = $this->activityService->selectActivityConfederationsCup($param);
        if ($selectActivityConfederationsCupResp->errCode != 0) {
            $resp->msg = "访问异常";
            return $resp;
        }
        $guessList = $selectActivityConfederationsCupResp->data['list'];
        if (is_array($guessList) && count($guessList) > 0) {
            $guessInfo = $guessList[0];
        }
        $resp->data = $guessInfo;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}