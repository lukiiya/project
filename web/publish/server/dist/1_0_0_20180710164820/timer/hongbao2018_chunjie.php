#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class CreateHongBao2018ChunJie {
    private $common;
    private $commonService;
    private $activityService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->activityService = requireService("Activity");
    }
    public function execute() {
        $hongBao2018ChunJieArr = array();
        $hongBao2018ChunJieArr[] = array(1, 6888, 1);//红包阶段，金额，数量
        $hongBao2018ChunJieArr[] = array(1, 888, 6);
        $hongBao2018ChunJieArr[] = array(1, 388, 6);
        $hongBao2018ChunJieArr[] = array(1, 288, 6);
        $hongBao2018ChunJieArr[] = array(1, 188, 69);

        $hongBao2018ChunJieArr[] = array(2, 11888, 1);
        $hongBao2018ChunJieArr[] = array(2, 888, 6);
        $hongBao2018ChunJieArr[] = array(2, 388, 6);
        $hongBao2018ChunJieArr[] = array(2, 288, 6);
        $hongBao2018ChunJieArr[] = array(2, 188, 169);

        $hongBao2018ChunJieArr[] = array(3, 16888, 1);
        $hongBao2018ChunJieArr[] = array(3, 888, 6);
        $hongBao2018ChunJieArr[] = array(3, 388, 6);
        $hongBao2018ChunJieArr[] = array(3, 288, 6);
        $hongBao2018ChunJieArr[] = array(3, 188, 869);
        $activityId = 8;
        $selectActivityByIdResp = $this->activityService->selectActivityById($activityId);
        if ($selectActivityByIdResp->errCode != 0) {
            $this->common->logger->info('访问异常');
            return;
        }
        $activityData = $selectActivityByIdResp->data;
        if (empty($activityData)) {
            $this->common->logger->info('活动不存在');
            return;
        }
        $activityName = trim($activityData['activityName']);
        $param = array();
        $param['needCount'] = true;
        $selectActivityHongBao2018ChunJieResp = $this->activityService->selectActivityHongBao2018ChunJie($param);
        $totalCount = $selectActivityHongBao2018ChunJieResp->data['totalCount'];
        if ($totalCount > 0) {
            $this->common->logger->info('已存在红包数据');
            return;
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            $hongBao2018ChunJieSqlArr = array();
            foreach ($hongBao2018ChunJieArr as $info) {
                $period = (int)$info[0];
                $amount = (int)$info[1];
                $number = (int)$info[2];
                for ($i = 0; $i < $number; $i++) {
                    $field = array();
                    $field[] = 'activityId="' . $database->escape($activityId) . '"';
                    $field[] = 'activityName="' . $database->escape($activityName) . '"';
                    $field[] = 'period="' . $database->escape($period) . '"';
                    $field[] = 'presentTicketAmount="' . $database->escape($amount) . '"';
                    $field[] = 'createTime=now()';
                    $hongBao2018ChunJieSqlArr[] = 'insert into t_activity_hongbao_2018_chunjie set ' . implode(',', $field);
                }
            }
            if (count($hongBao2018ChunJieSqlArr) != 1164) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('派送春节红包数量异常');
            }
            $hongBao2018ChunJieSql = implode(';', $hongBao2018ChunJieSqlArr);
            $hongBao2018ChunJieResult = $database->multiExecute($hongBao2018ChunJieSql);
            if (!$hongBao2018ChunJieResult) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入优惠券异常');
            }
            $hongBao2018ChunJieIdArr = $database->multiInsertId();
            if (count($hongBao2018ChunJieSqlArr) != count($hongBao2018ChunJieIdArr)) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入2018春节红包异常');
            }
            $database->execute('commit');
            $database->close();
            $this->common->logger->info('2018春节红包生成成功');
        }
    }
}
//开始运行
$createHongBao2018ChunJie = new CreateHongBao2018ChunJie();
//新增数据
$createHongBao2018ChunJie->execute();