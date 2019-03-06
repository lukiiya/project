<?php
namespace controller\portal;
use controller\Base;

class Test extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
    }

    public function index() {
       /* $userNo = '53995DE-178D8C9';
        $partnerKey = '00333fa289648f9243acd9a5f19bcf7b';
        $param = 'c=planExport&m=salePlanList&partnerId=1&userNo='.$userNo;
        $param = $param.'&sign='.md5($param.$partnerKey);
        $url = 'http://www.shaimii.com/cgi/index.php';
        $json = $this->httpPost($url, $param);
        $json = json_decode($json, true);
        print_r($json);*/
       /* $data = $json['data'];
        $expert = $data['expert'];
        $planList = $data['planList'];
        $profile = $expert['profile'];
        $plan = $planList[1];
        header('Content-Type:image/jpg');*/
        //echo base64_decode($profile);
        //echo base64_decode($plan['imageList'][0]);
        //echo md5('1|唯彩会');
        //echo md5('c=planExport&m=salePlanList&partnerId=1&userNo=53984E6-178C7D100333fa289648f9243acd9a5f19bcf7b');
        //echo md5('c=planExport&m=salePlanList&partnerId=2&userNo=53984E6-178C7D1de0a3df8d53a3951fa2ac271a2c3ccee');
        /*$pay = requireModule("Pay");
        $param = array();
        $param['orderId'] = array(1000000216,1000000217,1000000218,1000000219);
        $param['remark'] = '订单批量支付';
        $param['tradeType'] = 0;
        $param['redirectUrl'] = '';
        $payOrderBatchResp = $pay->payOrderBatch($param);
        print_r($payOrderBatchResp);*/
       /* $lotteryId = 'JSK3';
        $betContent = '2TDX:22,33,44#1,5,6;2TFX:11*,33*,44*;2BT:1,2,3,4,5,6;3TDX:111,222,333,444;3TTX:777;3LTX:789;3BT:1,2,3,4,5,6;HZ:3,4,5,6,18';
        $issueInfo = array(
            'drawNumber' => '1,2,3'
        );*/
        //$calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize($lotteryId, $betContent, $issueInfo);
        //echo json_encode($calculateDigitalPrizeResp->data, JSON_UNESCAPED_UNICODE);
        //$calculateDigitalTicketResp = $this->commonService->calculateDigitalTicket($lotteryId, $betContent);
        //print_r(($calculateDigitalTicketResp));
        //$zongGuan = requireModule('ZongGuan');
        //print_r($zongGuan->formatJsk3BetContent('HZ:17'));
        //echo date("H:i" );

/*二同号单选：2TDX:11,22,33,44#5,6
二同号复选：2TFX:11*,22*,44*
二不同号：2BT:1,2,3,4,5,6
三同号单选：3TDX:111,222,333,444
三同号通选：3TTX:777
三连号通选：3LTX:789
三不同号：3BT:1,2,3,4,5,6
和值：HZ:3,4,5,6,18*/

        /*
            RX2:01,02,03      //任选二
            RX3:01,02,03,04   //任选三
            RX4:01,02,03,04,05   //任选四
            RX5:01,02,03,04,05,06  //任选五
            RX6:01,02,03,04,05,06,07   //任选六
            RX7:01,02,03,04,05,06,07,08   //任选七
            RX8:01,02,03,04,05,06,07,08,09   //任选八
            Q1:01,02,03  //前一
            Q2ZHX:01,02,03|04,05,06   //前二直选
            Q2ZUX:01,02,03,04   //前二组选
            Q3ZHX:01,02,03|04,05,06|07,08,09   //前三直选
            Q3ZUX:01,02,03,04,05,06   //前三组选
        */


        /*$betContent = '2TDX:22,33,44#1,5,6;2TFX:11*,33*,44*;2BT:1,2,3,4,5,6;3TDX:111,222,333,444;3TTX:777;3LTX:789;3BT:1,2,3,4,5,6;HZ:3,4,5,6,18';
        $issueInfo = array(
            'drawNumber' => '1,2,3'
        );
        $calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize('JSK3', $betContent, $issueInfo);
        print_r($calculateDigitalPrizeResp);*/

        /*$issueInfo = array(
            'drawNumber' => '01,04,05,07,08'
        );
        $betContent = 'RX2:01,02,03;RX3:01,02,03,04;RX4:01,02,03,04,05;RX5:01,02,03,04,05,06;RX6:01,02,03,04,05,06,07;RX7:01,02,03,04,05,06,07,08;RX8:01,02,03,04,05,06,07,08,09;Q1:01,02,03;Q2ZHX:01,02,03|04,05,06;Q2ZUX:01,02,03,04;Q3ZHX:01,02,03|04,05,06|07,08,09;Q3ZUX:01,02,03,04,05,06';
        $calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize('GX11X5', $betContent, $issueInfo);
        print_r($calculateDigitalPrizeResp);*/

       /* $issueInfo = array(
            'drawNumber' => '1,2,4|3,4,5'
        );
        $betContent = 'ZHX:0,1|1,2,3|4,5,6;ZHXHZ:0,1,9,11,27;ZU3:0,1,2,3,4;ZU6:0,1,2,3,4,5,6';
        $calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize('FC3D', $betContent, $issueInfo);
        print_r($calculateDigitalPrizeResp);*/
        //header("HTTP/1.1 404 Not Found");
        //header("Status: 404 Not Found");
        /*$pay = requireModule("Pay");
        $param = array();
        $param['orderId'] = array(1000000281,1000000280);
        $param['redirectUrl'] = '';
        $param['remark'] = '奖金优化';
        $param['tradeType'] = 1;
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
        $this->jsonView->out($this->resp);*/
        /*$fun = function () {
            $time = time();
            $userService = requireService("User");
            $orderService = requireService("Order");
            $planService = requireService("Plan");
            $financeService = requireService("Finance");
            $matchService = requireService("Match");
            $ticketService = requireService("Ticket");
            for ($i = 0; $i < 2; $i++) {
                $param = array();
                $param['pageNum'] = 1;
                $param['pageSize'] = 10;
                $param['needCount'] = true;
                $userService->selectUser($param);
                $orderService->selectOrder($param);
                $planService->selectPlan($param);
                $financeService->selectFinance($param);
                $financeService->selectFinanceRecord($param);
                $financeService->selectFinanceConsume($param);
                $financeService->selectFinanceCharge($param);
                $financeService->selectFinanceIncome($param);
                $matchService->selectMatch($param);
                $ticketService->selectTicket($param);
            }
            echo (time() - $time).'秒<br>';
        };
        $fun();*/

        $issueInfo = array(
            'drawNumber' => '03,06,11,26,30,32|12'
        );
        $betContent = '02,07,11,17,26,31|04,06,08,10,12';
        $calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize('SSQ', $betContent, $issueInfo);
        print_r($calculateDigitalPrizeResp);
    }

    private function httpPost($url, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//返回原生的（Raw）输出
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);//10秒超时
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    }

    function httpGet($durl){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $durl);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);
        curl_setopt($ch, CURLOPT_USERAGENT, _USERAGENT_);
        curl_setopt($ch, CURLOPT_REFERER,_REFERER_);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $r = curl_exec($ch);
        curl_close($ch);
        return $r;
    }

    //导出消费过的电话号码
    public function exportMobile() {
        $database = requireModule('Database');
        $sql = "select userId from t_order where status in (2,3,4) group by userId";
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userIdList = array();
        while ($info = $database->get($result)) {
            $userId = (int)$info['userId'];
            if (!key_exists($userId, $userIdList)) {
                $userIdList[] = $userId;
            }
        }
        $userIdList = array_unique($userIdList);
        $userIdStr = implode(',', $userIdList);
        $sql = "select phone from t_user where phone != '' and  userId in (" . $userIdStr . ")";
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $phoneList = array();
        while ($info = $database->get($result)) {
            $phone = trim($info['phone']);
            if (!key_exists($phone, $phoneList)) {
                $phoneList[] = $phone;
            }
        }
        $phoneList = array_unique($phoneList);
        $phoneStr = implode(",\r\n", $phoneList);
        file_put_contents('./mobile.csv', $phoneStr);
        exit;
    }
}