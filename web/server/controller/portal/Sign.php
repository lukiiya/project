<?php
namespace controller\portal;
use controller\Base;

class Sign extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;
    private $signService;
    private $userService;
    private $financeService;
    public $loginUserInfo;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
        $this->signService = requireService("Sign");
        $this->userService = requireService("User");
        $this->financeService = requireService("Finance");
    }

    public function signInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userInfo = $this->loginUserInfo;
        $param = array();
        $param['userId'] = (int)$userInfo['userId'];
        $param['needCount'] = true;
        $selectSignResp = $this->signService->selectSign($param);
        if ($selectSignResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $signList = (array)$selectSignResp->data['list'];
        $continueDay = 0;
        $signStatus = 0;
        $totalAmount = (int)$selectSignResp->data['totalAmount'];
        $todayAccessAmount = 0;
        $isBindMobile = $this->common->verifyMobile(trim($userInfo['phone']));
        if (!$isBindMobile) {
            $todayAccessAmount += 800;
        } else {
            $param = array();
            $param['userId'] = (int)$userInfo['userId'];
            $param['mobile'] = trim($userInfo['phone']);
            $selectUserBindMobileResp = $this->userService->selectUserBindMobile($param);
            if ($selectUserBindMobileResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $userBindMobileList = $selectUserBindMobileResp->data['list'];
            if (is_array($userBindMobileList) && count($userBindMobileList) > 0) {
                $totalAmount += 800;
            }
        }
        $dateMap = array();
        for ($i = 0, $length = count($signList); $i <= $length; $i++) {
            $date = date('Y-m-d', time() - $i*3600*24);
            $dateMap[$date] = false;
        }
        foreach ($signList as $sign) {
            $signDate = trim($sign['signDate']);
            if (key_exists($signDate, $dateMap)) {
                $dateMap[$signDate] = true;
            }
        }
        //今天的值
        $todayValue = array_shift($dateMap);
        if ($todayValue) {
            $signStatus = 1;
            $continueDay++;
        }
        //今天之前的值
        foreach ($dateMap as $value) {
            if (!$value){
                break;
            }
            $continueDay++;
        }
        $continueDay = $continueDay%10;
        $continueDay++;
        if ($signStatus == 0) {
            if ($continueDay == 5) {
                $todayAccessAmount += 500;
            } else if ($continueDay == 10) {
                $todayAccessAmount += 800;
            } else {
                $todayAccessAmount += 100;
            }
        }
        $data = array();
        $data['continueDay'] = (int)$continueDay;
        $data['signStatus'] = (int)$signStatus;
        $data['totalAmount'] = (int)$totalAmount;
        $data['todayAccessAmount'] = (int)$todayAccessAmount;
        $data['isBindMobile'] = (bool)$isBindMobile;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function createSign() {
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
        $userInfo = $this->loginUserInfo;
        $param = array();
        $param['userId'] = (int)$userInfo['userId'];
        $selectSignResp = $this->signService->selectSign($param);
        if ($selectSignResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $signList = (array)$selectSignResp->data['list'];
        $continueDay = 0;
        $dateMap = array();
        for ($i = 0, $length = count($signList); $i <= $length; $i++) {
            $date = date('Y-m-d', time() - $i*3600*24);
            $dateMap[$date] = false;
        }
        foreach ($signList as $sign) {
            $signDate = trim($sign['signDate']);
            if (key_exists($signDate, $dateMap)) {
                $dateMap[$signDate] = true;
            }
        }
        //今天的值
        $todayValue = array_shift($dateMap);
        if ($todayValue) {
            $this->resp->errCode = 3;
            $this->resp->msg = "今天已签到";
            $this->jsonView->out($this->resp);
        }
        //今天之前的值
        foreach ($dateMap as $value) {
            if (!$value){
                break;
            }
            $continueDay++;
        }
        $continueDay = $continueDay%10;
        $continueDay++;
        if ($continueDay == 5) {
            $todayAccessAmount = 500;
        } else if ($continueDay == 10) {
            $todayAccessAmount = 800;
        } else {
            $todayAccessAmount = 100;
        }
        $userId = (int)$userInfo['userId'];
        $nickName = trim($userInfo['nickName']);
        $realName = trim($userInfo['realName']);
        $amount = (int)$todayAccessAmount;
        $signDate = trim(date('Y-m-d'));
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
            //插入签到表
            $insertSignField = array();
            $insertSignField[] = 'userId="' . $database->escape($userId) . '"';
            $insertSignField[] = 'nickName="' . $database->escape($nickName) . '"';
            $insertSignField[] = 'realName="' . $database->escape($realName) . '"';
            $insertSignField[] = 'amount="' . $database->escape($amount) . '"';
            $insertSignField[] = 'signDate="' . $database->escape($signDate) . '"';
            $insertSignField[] = 'createTime=now()';
            $insertSignSql = 'insert into t_user_sign set ' . implode(',', $insertSignField);
            $insertSignResult = $database->execute($insertSignSql);
            $insertSignInsertId = (int)$database->getInsertId();
            if (!$insertSignResult || $insertSignInsertId <= 0) {
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
            $insertFinanceChargeRecordField[] = 'remark="签到赠送"';
            $insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
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
            $insertFinanceChargeField[] = 'remark="签到赠送"';
            $insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
            $insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
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
            $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $amount;   //平台充值
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
            $this->resp->errCode = 0;
            $this->resp->msg = "签到成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
    }
}