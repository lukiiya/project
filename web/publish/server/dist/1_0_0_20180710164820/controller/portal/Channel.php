<?php
namespace controller\portal;
use controller\Base;

class Channel extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
    private $userService;
	private $channelService;
	private $orderService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
        $this->channelService = requireService("Channel");
        $this->orderService = requireService("Order");
	}

	//我的收益列表,竞技彩消费列表,高频彩消费列表
    public function statisticsList() {
        //用户是否登入
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];			//用户id
        //验证渠道用户信息
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userData = $selectUserByIdResp->data;
        if (empty($userData)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $channelList = $selectChannelResp->data['list'];
        $channelData = null;
        if (is_array($channelList) && count($channelList) > 0) {
            $channelData = $channelList[0];
        }
        if (empty($channelData)) {
            $this->resp->msg = "没有访问权限";
            $this->jsonView->out($this->resp);
        }
        $channel = (int)$channelData['channel'];
        $database = requireModule('Database');
        //竞技彩消费金额 JCZQ JCLQ JZYP
        //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $jcSql = "select sum(amount) as jcConsumeAmount,DATE_FORMAT(createTime,'%Y-%m') as groupDate from t_order where channel=".$channel." and orderType=3 and lotteryId in ('JCZQ','JCLQ','JZYP') and ticketStatus in(2,3,4,5,6,8) and status in (2,4) group by groupDate";
        $result = $database->execute($jcSql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $jcConsumeList = array();
        while ($info = $database->get($result)) {
            $jcConsumeAmount = (int)$info['jcConsumeAmount'];
            $jcGroupDate = trim($info['groupDate']);
            if (!key_exists($jcGroupDate, $jcConsumeList)) {
                $jcConsumeList[$jcGroupDate] = $jcConsumeAmount;
            }
        }
        //高频彩 JSK3 GX11X5
        $gpSql = "select sum(amount) as gpConsumeAmount,DATE_FORMAT(createTime,'%Y-%m') as groupDate from t_order where channel=".$channel." and orderType=7 and lotteryId in ('JSK3','GX11X5') and ticketStatus in(2,3,4,5,6,8) and status in (2,4) group by groupDate";
        $result = $database->execute($gpSql);
        if (!$result) {
            $database->close();
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $gpConsumeList = array();
        while ($info = $database->get($result)) {
            $gpConsumeAmount = (int)$info['gpConsumeAmount'];
            $gpGroupDate = trim($info['groupDate']);
            if (!key_exists($gpGroupDate, $gpConsumeList)) {
                $gpConsumeList[$gpGroupDate] = $gpConsumeAmount;
            }
        }
        //显示近六个月的数据
        $yearList = array();
        for ($i = 0; $i < 6; $i++) {
            $groupYear = date('Y',strtotime('-'.$i.' month'));
            $groupMouth = date('m',strtotime('-'.$i.' month'));
            $groupDate = $groupYear . '-' . $groupMouth;
            if (!key_exists($groupYear, $yearList)) {
                $yearList[$groupYear] = array('year' => $groupYear, 'mouthList' => array());
            }
            $info = array();
            $jcConsume = !empty($jcConsumeList[$groupDate]) ? (int)$jcConsumeList[$groupDate] : 0;
            $gpConsume = !empty($gpConsumeList[$groupDate]) ? (int)$gpConsumeList[$groupDate] : 0;
            $jcFund = 0;
            $gpFund = 0;
            if ($jcConsume > 0 && $jcConsume < 50000000) {
                $jcFund = $jcConsume * 0.01;
            } else if ($jcConsume < 80000000) {
                $jcFund = $jcConsume * 0.012;
            } else {
                $jcFund = $jcConsume * 0.015;
            }
            if ($gpConsume > 0 && $gpConsume < 30000000) {
                $gpFund = $gpConsume * 0.045;
            } else if ($gpConsume < 50000000) {
                $gpFund = $gpConsume * 0.05;
            } else {
                $gpFund = $gpConsume * 0.055;
            }
            $info['month'] = $groupMouth;
            $info['jcConsume'] = (int)$jcConsume;
            $info['gpConsume'] = (int)$gpConsume;
            $info['jcFund'] = (int)$jcFund;
            $info['gpFund'] = (int)$gpFund;
            $info['totalFund'] = (int)($jcFund+$gpFund);
            $yearList[$groupYear]['mouthList'][]  = $info;
        }
        $year = array();
        foreach ($yearList as $yearData) {
            $year[] = trim($yearData['year']);
        }
        array_multisort($year, SORT_DESC, SORT_STRING, $yearList);
        $data = array('list' => $yearList);
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//我的邀请列表
	public function channelUserList() {
		//用户是否登入
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
        $userId = (int)$this->loginUserInfo['userId'];			//用户id
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
		//验证渠道用户信息
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userData = $selectUserByIdResp->data;
        if (empty($userData)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $channelList = $selectChannelResp->data['list'];
        $channelData = null;
        if (is_array($channelList) && count($channelList) > 0) {
            $channelData = $channelList[0];
        }
        if (empty($channelData)) {
            $this->resp->msg = "没有访问权限";
            $this->jsonView->out($this->resp);
        }
        $channel = (int)$channelData['channel'];
		//获取关注的id数组
		$param = array();
		$param['channel'] = $channel;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		$userData = $selectUserResp->data;
		$userList = $userData['list'];
        $data = array("totalCount" => 0, 'list' => array());		//组装返回数据
		$data['totalCount'] = $userData['totalCount'];
		foreach ($userList as $user){
			$userInfo = array();
            $userInfo['nickName'] = trim($user['nickName']);
            $userInfo['createTime'] = trim($user['createTime']);
			$data['list'][] = $userInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    //高频彩消费查询,竞技彩消费查询
    public function channelOrderList() {
        //用户是否登入
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];			//用户id
        $beginTime = trim($this->common->getParam("beginTime", ''));
        $endTime = trim($this->common->getParam("endTime", ''));
        $ticketType = (int)$this->common->getParam("ticketType", 1);
        $userName= trim($this->common->getParam("userName", 0));
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
        //验证渠道用户信息
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userData = $selectUserByIdResp->data;
        if (empty($userData)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $channelList = $selectChannelResp->data['list'];
        $channelData = null;
        if (is_array($channelList) && count($channelList) > 0) {
            $channelData = $channelList[0];
        }
        if (empty($channelData)) {
            $this->resp->msg = "没有访问权限";
            $this->jsonView->out($this->resp);
        }
        $channel = (int)$channelData['channel'];
        if ($ticketType == 1) {
            //订单类型, 3=竞彩出票订单, 7=数字彩出票订单
            $orderType = 3;
        } else if ($ticketType == 2) {
            $orderType = 7;
            $lotteryId = array('JSK3', 'GX11X5');
        }
        //获取关注的id数组
        $param = array();
        $param['channel'] = $channel;
        $param['ticketStatus'] = array(2, 3, 4, 5, 6, 8);    //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['status'] = array(2, 4);    //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['orderType'] = $orderType;
        $param['beginTime'] = $beginTime;
        $param['endTime'] = $endTime;
        if (!empty($lotteryId)) {
            $param['lotteryId'] = $lotteryId;
        }
        if (!empty($userName)) {
            $param['userName'] = $userName;
        }
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $orderListData = $selectOrderResp->data;
        $totalCount = (int)$orderListData['totalCount'];
        $totalAmount = (int)$orderListData['totalAmount'];
        $orderList = $orderListData['list'];
        $data = array("totalCount" => $totalCount, "totalAmount" => $totalAmount, 'list' => array());
        foreach ($orderList as $order) {
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            if (($ticketStatus != 2 && $ticketStatus != 3 && $ticketStatus != 4 && $ticketStatus != 5 && $ticketStatus != 6 && $ticketStatus != 8) || ($status != 2 && $status != 4)) {
                continue;
            }
            $orderInfo = array();
            $orderInfo['createTime'] = $order['createTime'];
            $orderInfo['nickName'] = $order['nickName'];
            $orderInfo['realName'] = $order['realName'];
            $orderInfo['lotteryId'] = $order['lotteryId'];
            $orderInfo['amount'] = (int)$order['amount'];
            $data['list'][] = $orderInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //获取分享链接
    public function getShareLink() {
        //用户是否登入
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];			//用户id
        //验证渠道用户信息
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userData = $selectUserByIdResp->data;
        if (empty($userData)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $channelList = $selectChannelResp->data['list'];
        $channelData = null;
        if (is_array($channelList) && count($channelList) > 0) {
            $channelData = $channelList[0];
        }
        if (empty($channelData)) {
            $this->resp->msg = "没有访问权限";
            $this->jsonView->out($this->resp);
        }
        $channel = (int)$channelData['channel'];
        global $curEnv;
        if ($curEnv == 'dist') {
            //正式
            $data = "http://www.shaimii.com/?channel=".$channel."#invitation/login";
        } else if ($curEnv == 'beta') {
            //测试
            $data = "http://beta.shaimii.com/?channel=".$channel."#invitation/login";
        } else if ($curEnv == 'dev') {
            //本地
            $data = "http://www.sm.com/?channel=".$channel."#invitation/login";
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}