<?php
namespace controller\portal;
use controller\Base;

class Lottery extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
    private $lotteryService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->lotteryService = requireService("Lottery");
	}

	//彩种列表
    public function lotteryList() {
        /*$param = array();
        $param['publish'] = 1;
        $selectLotteryResp = $this->lotteryService->selectLottery($param);
        if ($selectLotteryResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $lotteryList = $selectLotteryResp->data['list'];
        if (empty($lotteryList)) {
            $this->resp->msg = "彩种查询错误";
            $this->jsonView->out($this->resp);
        }
		$data = array('list' => array());
        foreach ($lotteryList as $lottery) {
			$remark = trim($lottery['remark']);
            $lotteryInfo = array();
            $lotteryInfo['lotteryId'] = $lottery['lotteryId'];
            $lotteryInfo['lotteryName'] = $lottery['lotteryName'];
            $lotteryInfo['sale'] = $lottery['sale'];
            $lotteryInfo['remark'] = !empty($remark) ? $remark : '';
			$data['list'][] = $lotteryInfo;
        }*/
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=米多多彩票
		$version = trim($this->common->getParam("version", ''));
		$hourMinute = date('H:i');
		$data = array('list' => array(
			array(
				'lotteryId' => 'JCZQ',
				'lotteryName' => '竞彩足球',
				'tag' => '加奖',
				'remark' => '天天加奖不停歇',
				'sale' => false
			),
			array(
				'lotteryId' => 'JCLQ',
				'lotteryName' => '竞彩篮球',
				'tag' => '加奖',
				'remark' => 'NBA东西部决赛',
				'sale' => false
			),
			array(
				'lotteryId' => 'SSQ',
				'lotteryName' => '双色球',
				'tag' => in_array(date('w'), array(0,2,4)) ? '今日开奖' : '',
				'remark' => '2元中1000万',
				'sale' => false
			)
		));
		if ($source == 0 || $branch == 3 || ($branch == 0 && $source == 1 && $version > '2.7.0') || ($branch == 1 && $source == 1 && $version > '1.6.0') || ($branch == 0 && $source == 2 && $version >= '2.0.0') || ($branch == 2 && $source == 2 && $version > '2.4.0') || ($branch == 1 && $source == 2)) {
			$data['list'][] = array(//08:30:00 - 22:00:00销售
				'lotteryId' => 'JSK3',
				'lotteryName' => '老快3',
				'tag' => '',
				'remark' => '每天82期 22:10止',
				//'sale' => $hourMinute >= '08:30' && $hourMinute <= '22:00'//是否开售, 0=未开售, 1=已开售
				'sale' => false
			);
			$data['list'][] = array(
				'lotteryId' => 'JZYP',
				'lotteryName' => '竞足亚盘',
				'tag' => '加奖',
				'remark' => '3变2 易中奖',
				'sale' => false
			);
			$data['list'][] = array(//8:50-23:40销售
				'lotteryId' => 'GX11X5',
				'lotteryName' => '乐11选5',
				'tag' => '加奖',
				'remark' => '500万大派送',
				//'sale' => $hourMinute >= '08:30' && $hourMinute <= '22:00'//是否开售, 0=未开售, 1=已开售
				'sale' => false
			);
			$data['list'][] = array(//每天20:00:00销售，第二天20:00:00截止
				'lotteryId' => 'FC3D',
				'lotteryName' => '3D',
				'tag' => '今日开奖',
				'remark' => '牛人中奖超10万',
				//'sale' => $hourMinute >= '08:30' && $hourMinute <= '22:00'//是否开售, 0=未开售, 1=已开售
				'sale' => false
			);
			$data['list'][] = array(
				'lotteryId' => 'DLT',
				'lotteryName' => '大乐透',
				//'tag' => in_array(date('w'), array(1,3,6)) ? '今日开奖' : '',
				'tag' => '加奖',
				'remark' => '6亿加奖开启',
				'sale' => false
			);
            $data['list'][] = array(
                'lotteryId' => 'SJBCGJ',
                'lotteryName' => '猜冠军',
                'tag' => '',
                'remark' => '2018世界杯',
                'sale' => false
            );
            /*$data['list'][] = array(
                'lotteryId' => 'XYDZP',
                'lotteryName' => '幸运大转盘',
                'tag' => '',
                'remark' => '抽IphoneX',
                'sale' => true
            );*/
            $data['list'][] = array(
                'lotteryId' => 'ZXKJ',
                'lotteryName' => '最新开奖',
                'tag' => '',
                'remark' => '每日开奖查询',
                'sale' => false
            );
		}
        //对data进行排序
        $sortList = array('SJBCGJ','JCZQ','JCLQ','JZYP','JSK3','GX11X5','SSQ','DLT','FC3D','XYDZP','ZXKJ');
        $lotteryListMap = array();
        foreach ($data['list'] as $lotteryInfo) {
            $lotteryId = trim($lotteryInfo['lotteryId']);
            if (!key_exists($lotteryId, $lotteryListMap)) {
                $lotteryListMap[$lotteryId] = $lotteryInfo;
            }
        }
        $lotteryListSortMap = array();
        foreach ($sortList as $item) {
            $item = trim($item);
            if (key_exists($item, $lotteryListMap)) {
                $lotteryListSortMap[] = $lotteryListMap[$item];
            }
        }
        $lotteryListSortMap = array();
        $lotteryListSortData = array('list' => $lotteryListSortMap);
        $this->resp->data = $lotteryListSortData;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//得到期号详情
	public function lotteryIssueInfo() {
        $lotteryId = trim($this->common->getParam("lotteryId", ''));//彩种
		$issue = trim($this->common->getParam("issue", ''));//彩种
        if (empty($lotteryId)) {
            $this->resp->msg = "lotteryId参数错误";
            $this->jsonView->out($this->resp);
        }
		$lotteryIssue = null;
		$curTime = time();
		if (!empty($issue)) {
			$param = array();
			$param['lotteryId'] = $lotteryId;
			$param['issue'] = $issue;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1;
			$selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
			if ($selectLotteryIssueResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$lotteryIssueList = $selectLotteryIssueResp->data['list'];
			$lotteryIssue = $lotteryIssueList[0];
		} else {
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
			$endTime = 0;
			if ($lotteryId == 'SSQ') {
				$endTime = strtotime(trim($lotteryIssue['endTime']))-55*60;
			} else if ($lotteryId == 'JSK3') {
				$endTime = strtotime(trim($lotteryIssue['endTime']))-2*60;
			} else if ($lotteryId == 'DLT') {
				$endTime = strtotime(trim($lotteryIssue['endTime']))-35*60;
			} else if ($lotteryId == 'GX11X5') {
				$endTime = strtotime(trim($lotteryIssue['endTime']))-2*60;
			} else if ($lotteryId == 'FC3D') {
				$endTime = strtotime(trim($lotteryIssue['endTime']))-55*60;
			}
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
			}
		}
		if (empty($lotteryIssue)) {
			$this->resp->msg = "彩种期号不存在";
			$this->jsonView->out($this->resp);
		}
		$beginTime = 0;
		$endTime = 0;
		if ($lotteryId == 'SSQ') {
			$beginTime = strtotime(trim($lotteryIssue['beginTime']))-20*60;
			$endTime = strtotime(trim($lotteryIssue['endTime']))-35*60;
		} else if ($lotteryId == 'JSK3') {
			$beginTime = strtotime(trim($lotteryIssue['beginTime']));
			$endTime = strtotime(trim($lotteryIssue['endTime']))-2*60;
		} else if ($lotteryId == 'DLT') {
			$beginTime = strtotime(trim($lotteryIssue['beginTime']))-20*60;
			$endTime = strtotime(trim($lotteryIssue['endTime']))-35*60;
		} else if ($lotteryId == 'GX11X5') {
			$beginTime = strtotime(trim($lotteryIssue['beginTime']));
			$endTime = strtotime(trim($lotteryIssue['endTime']))-2*60;
		} else if ($lotteryId == 'FC3D') {
			$beginTime = strtotime(trim($lotteryIssue['beginTime']))-20*60;
			$endTime = strtotime(trim($lotteryIssue['endTime']))-35*60;
		}
		$countDown = $endTime - $curTime;
		$beginTime = date('Y-m-d H:i:s', $beginTime);
		$endTime = date('Y-m-d H:i:s', $endTime);
		$detail = json_decode(trim($lotteryIssue['detail']));
        $lotteryIssueInfo = array();
        $lotteryIssueInfo['issue'] = trim($lotteryIssue['issue']);
        $lotteryIssueInfo['lotteryId'] = trim($lotteryIssue['lotteryId']);
        $lotteryIssueInfo['lotteryName'] = trim($lotteryIssue['lotteryName']);
		$lotteryIssueInfo['drawNumber'] = trim($lotteryIssue['drawNumber']);
		$lotteryIssueInfo['drawTime'] = trim($lotteryIssue['drawTime']);
		$lotteryIssueInfo['beginTime'] = $beginTime;
		$lotteryIssueInfo['endTime'] = $endTime;
		$lotteryIssueInfo['countDown'] = $countDown;
		$lotteryIssueInfo['detail'] = $detail;
		$this->resp->data = $lotteryIssueInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到期号列表
	public function lotteryIssueList() {
		$lotteryId = trim($this->common->getParam("lotteryId", ''));//彩种
		$pageNum = (int)$this->common->getParam("pageNum", 0);//页码数
		$pageSize = (int)$this->common->getParam("pageSize", 0);//每页显示数
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		//获取关注的id数组
		$param = array();
		if (empty($lotteryId)) {
            $param['needDraw'] = true;
        } else {
            $param['lotteryId'] = $lotteryId;
        }
		$param['status'] = 4;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
		$lotteryIssueData = $selectLotteryIssueResp->data;
		$lotteryIssueList = $lotteryIssueData['list'];
		$data = array("totalCount" => 0, 'list' => array());		//组装返回数据
		$data['totalCount'] = $lotteryIssueData['totalCount'];
		foreach ($lotteryIssueList as $lotteryIssue){
			$lotteryId = trim($lotteryIssue['lotteryId']);
			$drawNumber = trim($lotteryIssue['drawNumber']);
			$drawFeature = '';
			if ($lotteryId == 'JSK3') {
				$drawNumberArr = explode(',', $drawNumber);
				$drawSum = $drawNumberArr[0]+$drawNumberArr[1]+$drawNumberArr[2];
				$drawNumberArr = array_unique($drawNumberArr);
				$drawNumberArrLength = count($drawNumberArr);
				$drawFeatureArr = array();
				$drawFeatureArr[] = '和值'.$drawSum;
				$drawDXDS = '';//大小单双
				if ($drawSum >= 3 && $drawSum <= 10) {
					$drawDXDS .= '小';
				} else if ($drawSum >= 11 && $drawSum <= 18) {
					$drawDXDS .= '大';
				}
				$drawDXDS .= ($drawSum%2 != 0) ? '单': '双';
				$drawFeatureArr[] = $drawDXDS;
				if ($drawNumber == '1,2,3' || $drawNumber == '2,3,4' || $drawNumber == '3,4,5' || $drawNumber == '4,5,6') {
					$drawFeatureArr[] = '三连号';
				}
				if ($drawNumberArrLength == 1) {
					$drawFeatureArr[] = '三同号';
				} else if ($drawNumberArrLength == 2) {
					$drawFeatureArr[] = '二同号';
					$drawFeatureArr[] = '二不同';
				} else if ($drawNumberArrLength == 3) {
					$drawFeatureArr[] = '三不同';
					$drawFeatureArr[] = '二不同';
				}
				$drawFeature = trim(implode(', ', $drawFeatureArr));
			}
			$lotteryIssueInfo = array();
			$lotteryIssueInfo['issue'] = trim($lotteryIssue['issue']);
			$lotteryIssueInfo['lotteryId'] = trim($lotteryIssue['lotteryId']);
			$lotteryIssueInfo['lotteryName'] = trim($lotteryIssue['lotteryName']);
			$lotteryIssueInfo['drawNumber'] = trim($lotteryIssue['drawNumber']);
			$lotteryIssueInfo['drawFeature'] = $drawFeature;
			$lotteryIssueInfo['drawTime'] = trim($lotteryIssue['drawTime']);
			$lotteryIssueInfo['beginTime'] = trim($lotteryIssue['beginTime']);
			$lotteryIssueInfo['endTime'] = trim($lotteryIssue['endTime']);
			$data['list'][] = $lotteryIssueInfo;
		}
		//因为上面$lotteryId变量被覆盖，重新获取
        $lotteryId = trim($this->common->getParam("lotteryId", ''));//彩种
		if (empty($lotteryId)) {
            $sortList = array('SSQ' => '双色球','DLT' => '大乐透','FC3D' => '3D','JSK3' => '老快3','GX11X5' => '乐11选5');
            $lotteryListMap = array();
            foreach ($data['list'] as $lotteryInfo) {
                $lotteryId = trim($lotteryInfo['lotteryId']);
                if (!key_exists($lotteryId, $lotteryListMap)) {
                    $lotteryListMap[$lotteryId] = $lotteryInfo;
                }
            }
            $lotteryListSortMap = array();
            foreach ($sortList as $key => $value) {
                $key = trim($key);
                $value = trim($value);
                if (!empty($key) && !empty($value) && key_exists($key, $lotteryListMap)) {
                    $lotteryListMap[$key]['lotteryName'] = $value;
                    $lotteryListSortMap[] = $lotteryListMap[$key];
                }
            }
            $data['list'] = $lotteryListSortMap;
        }
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}
