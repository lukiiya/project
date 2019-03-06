#!/usr/local/php-7.0.7/bin/php -q
<?php
//提款转账
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class WithdrawTransfer {
    private $common;
    private $commonService;
    private $financeService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->financeService = requireService("Finance");
    }

    public function execute() {
        global $curEnv;
        global $externalPath;
        require_once($externalPath."alipayTransfer/lib/alipay_submit.class.php");
        if ($curEnv != 'dist') {
            $this->common->logger->info('当前环境不允许提款转账');
            return;
        }
        $param = array();
        $param['financeType'] = 1;//资金类型, 0=方案, 1=出票
        $param['status'] = 2;//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
        $param['accountType'] = 2;//帐号类型, 1=微信, 2=支付宝, 3=银行卡
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectFinanceWithdrawResp = $this->financeService->selectFinanceWithdraw($param);
        if ($selectFinanceWithdrawResp->errCode != 0) {
            $this->common->logger->info('查询提款异常');
            return;
        }
        $withdrawList = $selectFinanceWithdrawResp->data['list'];
        if (!is_array($withdrawList) || count($withdrawList) <= 0) {
            $this->common->logger->info('不存在需要转账的提款');
            return;
        }
        $payAccountNumber = '2826085581@qq.com';
        $payAccountName = '深圳算盘彩娱网络科技有限公司';
        //生成批次号
        $base = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
        $number = '';
        for($i = 0; $i < 5; $i++) {
            $number .= $base[mt_rand(0,35)];
        }
        $batchNo = date('YmdHis').$number;    //批次号
        $withdrawArr = [];
        $insertFinanceTransferSqlArr = array();
        $updateFinanceWithdrawSqlArr = array();
        $database = requireModule("Database");
        foreach ($withdrawList as $withdraw) {
            $withdrawId = (int)$withdraw['withdrawId'];
            $financeType = (int)$withdraw['financeType'];//资金类型, 0=方案, 1=出票
            $status = (int)$withdraw['status'];//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
            $accountType = (int)$withdraw['accountType'];//帐号类型, 1=微信, 2=支付宝, 3=银行卡
            $userId = (int)$withdraw['userId'];
            $nickName = trim($withdraw['nickName']);
            $realName = trim($withdraw['realName']);
            $accountNumber = trim($withdraw['accountNumber']);
            $accountName = trim($withdraw['accountName']);
            $amount = (int)$withdraw['amount'];
            if ($withdrawId <= 0 || $financeType != 1 || $status != 2 || $accountType != 2 || $userId <= 0 || empty($accountNumber) || empty($accountName) || $amount <= 0) {
                continue;
            }
            $withdrawArr[] = array('accountNumber' => $accountNumber, 'accountName' => $accountName, 'amount' => $amount);
            //插入transfer表
            $insertFinanceTransferField = array();
            $insertFinanceTransferField[] = 'financeType="'.$database->escape($financeType).'"';
            $insertFinanceTransferField[] = 'withdrawId="'.$database->escape($withdrawId).'"';
            $insertFinanceTransferField[] = 'batchNo="'.$database->escape($batchNo).'"';
            $insertFinanceTransferField[] = 'userId="'.$database->escape($userId).'"';
            $insertFinanceTransferField[] = 'nickName="'.$database->escape($nickName).'"';
            $insertFinanceTransferField[] = 'realName="'.$database->escape($realName).'"';
            $insertFinanceTransferField[] = 'amount="'.$database->escape($amount).'"';
            $insertFinanceTransferField[] = 'payAccountNumber="'.$database->escape($payAccountNumber).'"';
            $insertFinanceTransferField[] = 'payAccountName="'.$database->escape($payAccountName).'"';
            $insertFinanceTransferField[] = 'accountNumber="'.$database->escape($accountNumber).'"';
            $insertFinanceTransferField[] = 'accountName="'.$database->escape($accountName).'"';
            $insertFinanceTransferField[] = 'createTime=now()';
            $insertFinanceTransferSqlArr[] = 'insert into t_finance_transfer set ' . implode(',', $insertFinanceTransferField);
            //更新withdraw表->打款中
            $updateFinanceWithdrawSqlArr[] = 'update t_finance_withdraw set status=5 where status=2 and withdrawId="' . $withdrawId . '" limit 1';
        }
        $withdrawLength = count($withdrawArr);
        if ($withdrawLength <= 0) {
            $this->common->logger->info('不存在符合转账的提款');
            return;
        }
        if ($withdrawLength != count($insertFinanceTransferSqlArr) || $withdrawLength != count($updateFinanceWithdrawSqlArr)) {
            $this->common->logger->info('提款信息和sql语句不符');
            return;
        }
        if ($database->execute('start transaction')) {
            //插入转账
            $sql = implode(';', $insertFinanceTransferSqlArr);
            $result = $database->multiExecute($sql);
            if (!$result) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('转账插入sql执行异常');
                return;
            }
            $transferIdArr = $database->multiInsertId();
            $transferIdArrLength = count($transferIdArr);
            if ($transferIdArrLength <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('转账id生成异常');
                return;
            }
            //更新提款
            $sql = implode(';', $updateFinanceWithdrawSqlArr);
            $result = $database->multiExecute($sql);
            if (!$result) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('提款更新sql执行异常');
                return;
            }
            $withdrawAffectedRowsArr = $database->multiAffectedRows();
            $withdrawAffectedRowsArrLength = count($withdrawAffectedRowsArr);
            if ($withdrawAffectedRowsArrLength <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('提款更新影响行数异常');
                return;
            }
            if ($withdrawLength != $transferIdArrLength || $withdrawLength != $withdrawAffectedRowsArrLength) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('提款信息和sql产生不符');
                return;
            }
            $batchFee = 0;
            $batchNum = 0;
            $detailArr = array();
            for ($i = 0, $length = count($transferIdArr); $i < $length; $i++) {
                $transferId = (int)$transferIdArr[$i];
                $withdrawAffectedRows = (int)$withdrawAffectedRowsArr[$i];
                $accountNumber = trim($withdrawArr[$i]['accountNumber']);
                $accountName = trim($withdrawArr[$i]['accountName']);
                $amount = (int)$withdrawArr[$i]['amount'];
                if ($transferId > 0 && $withdrawAffectedRows == 1 && !empty($accountNumber) && !empty($accountName) && $amount > 0) {
                    $detailArr[] = $transferId.'^'.$accountNumber.'^'.$accountName.'^'.($amount/100).'^晒米场提现';
                    $batchFee += ($amount/100);
                    $batchNum++;
                }
            }
            $detailArrLength = count($detailArr);
            if ($withdrawLength != $detailArrLength) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('提款信息和转账信息不符');
                return;
            }
            $detailData = implode('|', $detailArr);
            $partner = '2088421272970682';
            //构造要请求的参数数组，无需改动，基础参数
            $alipay_config = array();
            $alipay_config['partner'] = $partner;
            $alipay_config['key'] = '30bi9uk19zpb1rfz62cpan8sbv86pxep';
            $alipay_config['sign_type'] = strtoupper('MD5');
            $alipay_config['input_charset'] = strtolower('utf-8');
            $alipay_config['cacert'] = $externalPath.'alipayTransfer/cacert.pem';//请保证cacert.pem文件在当前文件夹目录中
            $alipay_config['transport'] = 'http';
            //业务参数
            $parameter = array(
                "service" => "batch_trans_notify_no_pwd",
                "partner" => $partner,
                "notify_url" => 'http://115.159.58.69/cgi/index.php?c=alipay&m=transferNotify',
                "email" => $payAccountNumber,
                "account_name" => $payAccountName,
                "pay_date"	=> date('Ymd'),
                "batch_no"	=> $batchNo,
                "batch_fee" => $batchFee,
                "batch_num" => $batchNum,
                "detail_data" => $detailData,
                "_input_charset" => trim(strtolower($alipay_config['input_charset']))
            );
            $alipaySubmit = new AlipaySubmit($alipay_config);
            $htmlText = $alipaySubmit->buildRequestHttp($parameter);
            $this->common->logger->info('转账请求：'.print_r($parameter, true));
            $this->common->logger->info('转账请求响应：'.$htmlText);
            $doc = new DOMDocument();
            $doc->loadXML($htmlText);
            if (trim($doc->getElementsByTagName("alipay")->item(0)->nodeValue) == 'TSUCCESS') {
                //<alipay><is_success>T</is_success><error>SUCCESS</error></alipay>
                $database->execute('commit');
                $database->close();
                $this->common->logger->info('提款转账成功('.$batchNo.')');
                return;
            } else {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('提款转账失败('.$batchNo.')');
                return;
            }
        } else {
            $this->common->logger->info('事物执行异常');
            return;
        }
    }
}
//开始运行
$withdrawTransfer = new WithdrawTransfer();
$withdrawTransfer->execute();