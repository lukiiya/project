#!/usr/local/php-7.0.7/bin/php -q
<?php
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class CreateHongBaoDaily {
    private $common;
    private $commonService;
    private $activityService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->activityService = requireService("Activity");
    }
    public function execute() {
        //每天30个彩金红包，30个优惠券红包
        $hongBaoDailyArr = array();
        $hongBaoDailyArr[] = array(1, 88, 21);//红包类型，金额，数量
        $hongBaoDailyArr[] = array(1, 188, 8);
        $hongBaoDailyArr[] = array(1, 888, 1);

        $hongBaoDailyArr[] = array(2, 200, 3, 6);//红包类型，金额，数量，优惠券id
        $hongBaoDailyArr[] = array(2, 200, 5, 7);
        $hongBaoDailyArr[] = array(2, 500, 3, 8);
        $hongBaoDailyArr[] = array(2, 500, 5, 9);
        $hongBaoDailyArr[] = array(2, 500, 3, 10);
        $hongBaoDailyArr[] = array(2, 800, 3, 11);
        $hongBaoDailyArr[] = array(2, 800, 3, 12);
        $hongBaoDailyArr[] = array(2, 800, 3, 13);
        $hongBaoDailyArr[] = array(2, 500, 2, 14);

        $activityId = 9;//天天抢红包
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
        //当天是否存在数据
        $date = date('Y-m-d');
        $param = array();
        $param['beginTime'] = $date;
        $param['endTime'] = $date;
        $param['needCount'] = true;
        $selectActivityHongBaoDailyResp = $this->activityService->selectActivityHongBaoDaily($param);
        $totalCount = $selectActivityHongBaoDailyResp->data['totalCount'];
        if ($totalCount > 0) {
            $this->common->logger->info('已存在红包数据');
            return;
        }
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            $hongBaoDailySqlArr = array();
            foreach ($hongBaoDailyArr as $info) {
                $type = (int)$info[0];
                $amount = (int)$info[1];
                $number = (int)$info[2];
                $couponId = 0;
                if ($type == 2) {
                    $couponId = (int)$info[3];
                }
                for ($i = 0; $i < $number; $i++) {
                    $field = array();
                    $field[] = 'activityId="' . $database->escape($activityId) . '"';
                    $field[] = 'activityName="' . $database->escape($activityName) . '"';
                    $field[] = 'type="' . $database->escape($type) . '"';
                    $field[] = 'amount="' . $database->escape($amount) . '"';
                    $field[] = 'couponId="' . $database->escape($couponId) . '"';
                    $field[] = 'createTime=now()';
                    $hongBaoDailySqlArr[] = 'insert into t_activity_hongbao_daily set ' . implode(',', $field);
                }
            }
            if (count($hongBaoDailySqlArr) != 60) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('派送每日红包数量异常');
                return;
            }
            $hongBaoDailySql = implode(';', $hongBaoDailySqlArr);
            $hongBaoDailyResult = $database->multiExecute($hongBaoDailySql);
            if (!$hongBaoDailyResult) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入红包异常');
                return;
            }
            $hongBaoDailyIdArr = $database->multiInsertId();
            if (count($hongBaoDailySqlArr) != count($hongBaoDailyIdArr)) {
                $database->execute('rollback');
                $database->close();
                $this->common->logger->info('插入每日红包异常');
                return;
            }
            for ($i = 0, $length = count($hongBaoDailyIdArr); $i < $length; $i++) {
                $hongbaoId = (int)$hongBaoDailyIdArr[$i];
                if ($hongbaoId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $this->common->logger->info('插入每日红包异常');
                    return;
                }
            }
            $database->execute('commit');
            $database->close();
            $this->common->logger->info('每日红包生成成功');
        } else {
            $this->common->logger->info('每日红包事务异常');
        }
    }
}
//开始运行
$createHongBaoDaily = new CreateHongBaoDaily();
//新增数据
$createHongBaoDaily->execute();