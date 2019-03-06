<?php
namespace service;
class Lottery extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Lottery");
	}

    public function insertLotteryIssue($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        if (empty($issue) || empty($lotteryId)) {
            $resp->msg = "issue和lottery不能为空";
            return $resp;
        }
        $insertLotteryIssueResp = $this->dao->insertLotteryIssue($param);
        if ($insertLotteryIssueResp->errCode != 0) {
            $resp->msg = $insertLotteryIssueResp->msg;
            return $resp;
        }
        $resp->data = $insertLotteryIssueResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateLotteryIssue($param) {
        $resp = requireModule("Resp");
        $issue = trim($param['issue']);
        $lotteryId = trim($param['lotteryId']);
        if (empty($issue) || empty($lotteryId)) {
            $resp->msg = "issue和lottery不能为空";
            return $resp;
        }
        $updateLotteryIssueResp = $this->dao->updateLotteryIssue($param);
        if ($updateLotteryIssueResp->errCode != 0) {
            $resp->msg = $updateLotteryIssueResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectLotteryIssue($param) {
        $resp = requireModule('Resp');
        $selectLotteryIssueResp = $this->dao->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $resp->msg = $selectLotteryIssueResp->msg;
            return $resp;
        }
        $resp->data = $selectLotteryIssueResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	public function selectLotteryById($lotteryId) {
		$resp = requireModule('Resp');
        if (empty($lotteryId)) {
            $resp->msg = "lotteryId不能为空";
            return $resp;
        }
        $lotteryMap = array(
            'SSQ' => array(
                'lotteryId' => 'SSQ',
                'lotteryName' => '双色球'
            ),
            'JSK3' => array(
                'lotteryId' => 'JSK3',
                'lotteryName' => '江苏快3',
                'betType' => array(
                    '2TDX' => '二同号单选',//2TDX:11,22,33,44#5,6
                    '2TFX' => '二同号复选',//2TFX:11*,22*,44*
                    '2BT' => '二不同号',//2BT:1,2,3,4,5,6
                    '3TDX' => '三同号单选',//3TDX:111,222,333,444
                    '3TTX' => '三同号通选',//3TTX:777
                    '3LTX' => '三连号通选',//3LTX:789
                    '3BT' => '三不同号',//3BT:1,2,3,4,5,6
                    'HZ' => '和值',//HZ:3,4,5,6,18
                    'DRAW' => '开奖'
                )
            ),
            'DLT' => array(
                'lotteryId' => 'DLT',
                'lotteryName' => '大乐透'
            ),
            'GX11X5' => array(
                'lotteryId' => 'GX11X5',
                'lotteryName' => '广西11选5',
                'betType' => array(
                    'RX2' => '任选二',
                    'RX3' => '任选三',
                    'RX4' => '任选四',
                    'RX5' => '任选五',
                    'RX6' => '任选六',
                    'RX7' => '任选七',
                    'RX8' => '任选八',
                    'Q1' => '前一',
                    'Q2ZHX' => '前二直选',
                    'Q2ZUX' => '前二组选',
                    'Q3ZHX' => '前三直选',
                    'Q3ZUX' => '前三组选',
                    'DRAW' => '开奖'
                )
            ),
            'FC3D' => array(
                'lotteryId' => 'FC3D',
                'lotteryName' => '福彩3D',
                'betType' => array(
                    'ZHX' => '直选',
                    'ZHXHZ' => '直选和值',
                    'ZU3' => '组三',
                    'ZU6' => '组六',
                    'DRAW' => '开奖'
                )
            ),
            'SJBGJ' => array(
                'lotteryId' => 'SJBGJ',
                'lotteryName' => '世界杯冠军',
            ),
            'SJBGYJ' => array(
                'lotteryId' => 'SJBGYJ',
                'lotteryName' => '世界杯冠亚军',
            )
        );
		$resp->data = $lotteryMap[$lotteryId];
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectLottery($param) {
        $resp = requireModule('Resp');
        $selectLotteryResp = $this->dao->selectLottery($param);
        if ($selectLotteryResp->errCode != 0) {
            $resp->msg = $selectLotteryResp->msg;
            return $resp;
        }
        $resp->data = $selectLotteryResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
    
    public function getSSQPrizeMap() {
        /*
            一等奖 浮动 6+1
            二等奖 浮动 6+0
            三等奖 3000元 5+1
            四等奖 200元 5+0/4+1
            五等奖 10元 4+0/3+1
            六等奖 5元 2+1/1+1/0+1
        */
        //注意这里强调的是映射关系，给回的单位是元!
        $prizeMap = array(
            '6+1' => array(
                'name' => '一等奖',
                'level' => '1',
                'amount' => 0
            ),
            '6+0' => array(
                'name' => '二等奖',
                'level' => '2',
                'amount' => 0
            ),
            '5+1' => array(
                'name' => '三等奖',
                'level' => '3',
                'amount' => 3000
            ),
            '5+0' => array(
                'name' => '四等奖',
                'level' => '4',
                'amount' => 200
            ),
            '4+1' => array(
                'name' => '四等奖',
                'level' => '4',
                'amount' => 200
            ),
            '4+0' => array(
                'name' => '五等奖',
                'level' => '5',
                'amount' => 10
            ),
            '3+1' => array(
                'name' => '五等奖',
                'level' => '5',
                'amount' => 10
            ),
            '2+1' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '1+1' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '0+1' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            )
        );
        return $prizeMap;
    }

    public function getJSK3PrizeMap() {
        /*
          二同号投注
            二同号单选：单注奖金固定为80元
            二同号复选：单注奖金固定为15元
          二不同号投注
            二不同号：单注奖金固定为8元
          三同号投注
	        三同号单选：单注奖金固定为240元
	        三同号通选：单注奖金固定为40元
          三连号通选投注
	        三连号通选：单注奖金固定为10元
          三不同号投注
	        三不同号：单注奖金固定为40元
          和值投注：
            和值3：单注奖金固定为240元
            和值4：单注奖金固定为80元
            和值5：单注奖金固定为40元
            和值6：单注奖金固定为25元
            和值7：单注奖金固定为16元
            和值8：单注奖金固定为12元
            和值9：单注奖金固定为10元
            和值10：单注奖金固定为9元
            和值11：单注奖金固定为9元
            和值12：单注奖金固定为10元
            和值13：单注奖金固定为12元
            和值14：单注奖金固定为16元
            和值15：单注奖金固定为25元
            和值16：单注奖金固定为40元
            和值17：单注奖金固定为80元
            和值18：单注奖金固定为240元
        */
        //注意这里强调的是映射关系，给回的单位是元!
        $prizeMap = array(
            '2TDX' => array(
                '112' => 80,
                '113' => 80,
                '114' => 80,
                '115' => 80,
                '116' => 80,
                '122' => 80,
                '223' => 80,
                '224' => 80,
                '225' => 80,
                '226' => 80,
                '133' => 80,
                '233' => 80,
                '334' => 80,
                '335' => 80,
                '336' => 80,
                '144' => 80,
                '244' => 80,
                '344' => 80,
                '445' => 80,
                '446' => 80,
                '155' => 80,
                '255' => 80,
                '355' => 80,
                '455' => 80,
                '556' => 80,
                '166' => 80,
                '266' => 80,
                '366' => 80,
                '466' => 80,
                '566' => 80
            ),
            '2TFX' => array(
                '11*' => 15,
                '22*' => 15,
                '33*' => 15,
                '44*' => 15,
                '55*' => 15,
                '66*' => 15
            ),
            '2BT' => array(
                '12' => 8,
                '13' => 8,
                '14' => 8,
                '15' => 8,
                '16' => 8,
                '23' => 8,
                '24' => 8,
                '25' => 8,
                '26' => 8,
                '34' => 8,
                '35' => 8,
                '36' => 8,
                '45' => 8,
                '46' => 8,
                '56' => 8
            ),
            '3TDX' => array(
                '111' => 240,
                '222' => 240,
                '333' => 240,
                '444' => 240,
                '555' => 240,
                '666' => 240
            ),
            '3TTX' => array(
                '777' => 40
            ),
            '3LTX' => array(
                '789' => 10
            ),
            '3BT' => array(
                '123' => 40,
                '124' => 40,
                '125' => 40,
                '126' => 40,
                '134' => 40,
                '135' => 40,
                '136' => 40,
                '145' => 40,
                '146' => 40,
                '156' => 40,
                '234' => 40,
                '235' => 40,
                '236' => 40,
                '245' => 40,
                '246' => 40,
                '256' => 40,
                '345' => 40,
                '346' => 40,
                '356' => 40,
                '456' => 40
            ),
            'HZ' => array(
                '3' => 240,
                '4' => 80,
                '5' => 40,
                '6' => 25,
                '7' => 16,
                '8' => 12,
                '9' => 10,
                '10' => 9,
                '11' => 9,
                '12' => 10,
                '13' => 12,
                '14' => 16,
                '15' => 25,
                '16' => 40,
                '17' => 80,
                '18' => 240
            )
        );
        return $prizeMap;
    }

    public function getDLTPrizeMap() {
        /*
            一等奖 浮动 5+2
            二等奖 浮动 5+1
            三等奖 浮动 5+0/4+2
            四等奖 200元 4+1/3+2
            五等奖 10元 4+0/3+1/2+2
            六等奖 5元 3+0/2+1/1+2/0+2
            eg：0->5+2表示没有追加
            eg：1->5+2表示追加
        */
        //注意这里强调的是映射关系，给回的单位是元!
        $prizeMap = array(
            '0->5+2' => array(
                'name' => '一等奖',
                'level' => '1',
                'amount' => 0
            ),
            '1->5+2' => array(
                'name' => '一等奖追加',
                'level' => '1',
                'amount' => 0
            ),
            '0->5+1' => array(
                'name' => '二等奖',
                'level' => '2',
                'amount' => 0
            ),
            '1->5+1' => array(
                'name' => '二等奖追加',
                'level' => '2',
                'amount' => 0
            ),
            '0->5+0' => array(
                'name' => '三等奖',
                'level' => '3',
                'amount' => 0
            ),
            '1->5+0' => array(
                'name' => '三等奖追加',
                'level' => '3',
                'amount' => 0
            ),
            '0->4+2' => array(
                'name' => '三等奖',
                'level' => '3',
                'amount' => 0
            ),
            '1->4+2' => array(
                'name' => '三等奖追加',
                'level' => '3',
                'amount' => 0
            ),
            '0->4+1' => array(
                'name' => '四等奖',
                'level' => '4',
                'amount' => 200
            ),
            '1->4+1' => array(
                'name' => '四等奖追加',
                'level' => '4',
                'amount' => 200+100
            ),
            '0->3+2' => array(
                'name' => '四等奖',
                'level' => '4',
                'amount' => 200
            ),
            '1->3+2' => array(
                'name' => '四等奖追加',
                'level' => '4',
                'amount' => 200+100
            ),
            '0->4+0' => array(
                'name' => '五等奖',
                'level' => '5',
                'amount' => 10
            ),
            '1->4+0' => array(
                'name' => '五等奖追加',
                'level' => '5',
                'amount' => 10+5
            ),
            '0->3+1' => array(
                'name' => '五等奖',
                'level' => '5',
                'amount' => 10
            ),
            '1->3+1' => array(
                'name' => '五等奖追加',
                'level' => '5',
                'amount' => 10+5
            ),
            '0->2+2' => array(
                'name' => '五等奖',
                'level' => '5',
                'amount' => 10
            ),
            '1->2+2' => array(
                'name' => '五等奖追加',
                'level' => '5',
                'amount' => 10+5
            ),
            '0->3+0' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '1->3+0' => array(
                'name' => '六等奖追加',
                'level' => '6',
                'amount' => 5
            ),
            '0->2+1' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '1->2+1' => array(
                'name' => '六等奖追加',
                'level' => '6',
                'amount' => 5
            ),
            '0->1+2' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '1->1+2' => array(
                'name' => '六等奖追加',
                'level' => '6',
                'amount' => 5
            ),
            '0->0+2' => array(
                'name' => '六等奖',
                'level' => '6',
                'amount' => 5
            ),
            '1->0+2' => array(
                'name' => '六等奖追加',
                'level' => '6',
                'amount' => 5
            )
        );
        return $prizeMap;
    }

    public function getGX11X5PrizeMap() {
        /*
        任选二：6
        任选三：19
        任选四：78
        任选五：540
        任选六：90
        任选七：26
        任选八：9
        前一：13
        前二直选：130
        前二组选：65
        前三直选：1170
        前三组选：195
        */
        $prizeMap = array(
            'RX2' => 6,
            'RX3' => 19,
            'RX4' => 78,
            'RX5' => 540,
            'RX6' => 90,
            'RX7' => 26,
            'RX8' => 9,
            'Q1' => 13,
            'Q2ZHX' => 130,
            'Q2ZUX' => 65,
            'Q3ZHX' => 1170,
            'Q3ZUX' => 195
        );
        return $prizeMap;
    }

    public function getFC3DPrizeMap() {
        /*
        直选：1040
        直选和值：1040
        组三：346
        组六：173
        */
        $prizeMap = array(
            'ZHX' => 1040,
            'ZHXHZ' => 1040,
            'ZU3' => 346,
            'ZU6' => 173
        );
        return $prizeMap;
    }
}