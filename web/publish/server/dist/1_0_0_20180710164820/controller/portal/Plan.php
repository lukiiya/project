<?php
namespace controller\portal;
use controller\Base;

class Plan extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $planService;
	private $matchService;
	private $resourceService;
	private $orderService;
	private $financeService;
	private $groupService;
	private $lotteryService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->planService = requireService("Plan");
		$this->matchService = requireService("Match");
		$this->resourceService = requireService("Resource");
		$this->orderService = requireService("Order");
		$this->financeService = requireService("Finance");
		$this->groupService = requireService("Group");
		$this->lotteryService = requireService("Lottery");
	}

    public function createPlan() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        if (!$this->loginUserRight['1']) {
            $this->resp->msg = "非法访问";
            $this->jsonView->out($this->resp);
        }
        $matchType = (int)$this->common->getParam("matchType", 0);
        $title = trim($this->common->getParam("title", ''));
        $file = $this->common->getParam("file", null);
        $content = trim($this->common->getParam("content", ''));
        $amount = (int)$this->common->getParam("amount", 0);
        $matchRecommend = trim($this->common->getParam("matchRecommend", ''));
        $isWeixinFile = $file['tmp_name'] ? false : true;
        if ($isWeixinFile) {
            if (count($file) <= 0 && empty($content)) {
                $this->resp->msg = "content不能为空";
                $this->jsonView->out($this->resp);
            }
        } else {
            if (count($file['tmp_name']) <= 0 && empty($content)) {
                $this->resp->msg = "content不能为空";
                $this->jsonView->out($this->resp);
            }
        }
        if (!empty($title) && mb_strlen($title) < 5) {
            $this->resp->msg = "标题不能少于5个字";
            $this->jsonView->out($this->resp);
        }
        if ($amount < 0) {
            $this->resp->msg = "amount有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($matchRecommend)) {
            $this->resp->msg = "比赛不能为空";
            $this->jsonView->out($this->resp);
        }
		if ($this->common->isApp() && $matchType <= 0) {
			$matchType = 1;
		}
        if ($matchType <= 0) {
            $this->resp->msg = "比赛类型有误";
            $this->jsonView->out($this->resp);
        }
        $mockPlan = array('matchRecommend' => $matchRecommend);
        $mockPlanData = $this->commonService->setMatchList(array($mockPlan))[0];
        $matchList = $mockPlanData['matchList'];
        if (empty($mockPlanData) || empty($matchList) || !is_array($matchList)) {
            $this->resp->msg = "比赛信息有误";
            $this->jsonView->out($this->resp);
        }
        //得到最早的比赛时间
        $matchBeginTime = null;
		//固化大小分, 让分，让球, 固化玩法赔率
		$concedeMap = array();//固化大小分, 让分，让球
		$oddsMap = array();
        foreach ($matchList as $match) {
			$matchId = (int)$match['matchId'];
			$oddsId = (int)$match['oddsId'];
			$concede = trim($match['concede']);
			$bettypeOdds = $match['bettypeOdds'];
			if ($matchId <= 0) {
				$this->resp->msg = "比赛有误";
				$this->jsonView->out($this->resp);
			}
			if ($oddsId <= 0) {
				$this->resp->msg = "比赛赔率有误";
				$this->jsonView->out($this->resp);
			}
			$beginTime = trim($match['beginTime']);
			if (!empty($beginTime) && (empty($matchBeginTime) || $beginTime < $matchBeginTime)) {
				$matchBeginTime = $beginTime;
			}
			//固化大小分, 让分，让球
			$concedeMap[$oddsId] = $concede;
			$oddsMap[$oddsId] = $bettypeOdds;
        }
		if (empty($matchBeginTime)) {
			$this->resp->msg = "比赛时间有误";
			$this->jsonView->out($this->resp);
		}
        $matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
        $saleTicket = 0;
        if ($matchListIsSaleResp->errCode == 0) {
            $saleTicket = 1;
        }
        $resourceIdArr = [];
        if ($isWeixinFile) {
            for ($i = 0, $length = count($file); $i < $length; $i++) {
                $serverId = trim($file[$i]);
                if (empty($serverId)) {
                    continue;
                }
                $respWeixin = $this->commonService->saveWeixinFile($serverId);
                if ($respWeixin->errCode == 0) {
                    $resourceId = (int)$respWeixin->data;
                    if ($resourceId > 0) {
                        $resourceIdArr[] = $resourceId;
                    }
                }
            }
        } else {
            //生成方案关联的图片
            $fileCount = count($file['tmp_name']);
            if (is_array($file) && $fileCount > 0) {
                for ($i = 0; $i < $fileCount; $i++) {
                    $fileType = trim($file["type"][$i]);
                    $name = trim($file['name'][$i]);
                    $tmpName = trim($file['tmp_name'][$i]);
                    if (empty($name) || empty($tmpName)) {
                        continue;
                    }
                    $error = (int)$file['error'][$i];
                    $size = (int)$file['size'][$i];
                    $maxSize = 2*1024*1024;//2MB
                    if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png' || $fileType == 'image/x-png' ||  $fileType == 'image/gif')) {
                        $pathInfo = pathinfo($name);
                        $fileName = trim($pathInfo['filename']);
                        $extension = trim($pathInfo['extension']);
                        $respUpload = $this->commonService->saveUploadFile($tmpName, $fileName, $extension);
                        if ($respUpload->errCode == 0) {
                            $resourceId = (int)$respUpload->data;
                            if ($resourceId > 0) {
                                $resourceIdArr[] = $resourceId;
                            }
                        }
                    }
                }
            }
        }
		//固化大小分
		$matchRecommend = json_decode($matchRecommend);
		foreach ($matchRecommend as &$r) {
			$matchId = (int)$r->matchId;
			$oddsId = (int)$r->oddsId;
            $recommend = $r->recommend;
			if ($matchId <= 0) {
				$this->resp->msg = "比赛有误";
				$this->jsonView->out($this->resp);
			}
			if ($oddsId <= 0) {
				$this->resp->msg = "比赛赔率有误";
				$this->jsonView->out($this->resp);
			}
            if (!is_array($recommend) || count($recommend) <= 0) {
                $this->resp->msg = "比赛推荐有误";
                $this->jsonView->out($this->resp);
            }
			$r->concede = $concedeMap[$oddsId];
			$r->bettypeOdds = $oddsMap[$oddsId];
		}
        $matchLength = count($matchRecommend);
        $matchRecommend = json_encode($matchRecommend);
        $param = array();
		$param['planType'] = 1;//类型, 1=竞技彩方案, 2=数字彩方案
        $param['matchType'] = $matchType;
        $param['userId'] = (int)$this->loginUserInfo['userId'];
        $param['nickName'] = trim($this->loginUserInfo['nickName']);
        $param['realName'] = trim($this->loginUserInfo['realName']);
        $param['title'] = $title;
        $param['content'] = $content;
        $param['amount'] = $amount;
        $param['publish'] = 1;
        $param['matchRecommend'] = $matchRecommend;
        $param['matchLength'] = $matchLength;
        $param['matchBeginTime'] = $matchBeginTime;
		$param['saleTime'] = date("Y-m-d H:i:s", strtotime($matchBeginTime)+7200);
        $param['saleTicket'] = (int)$saleTicket;
        $param['resourceId'] = $resourceIdArr;
        $insertPlanResp = $this->planService->insertPlan($param);
        if ($insertPlanResp->errCode != 0) {
            $this->resp->msg = "添加方案失败";
            $this->jsonView->out($this->resp);
        }
        $planId = (int)$insertPlanResp->data;
        if ($planId <= 0) {
            $this->resp->msg = "添加方案失败";
            $this->jsonView->out($this->resp);
        }
        $planNo = $this->common->encodeNo((int)$this->loginUserInfo['userId'], $planId);
        $this->resp->data = array('planNo' => $planNo);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //创建数字彩方案
    public function createDigitalPlan() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        //数字彩方案权限
        if (!$this->loginUserRight['3']) {
            $this->resp->msg = "非法访问";
            $this->jsonView->out($this->resp);
        }
        $title = trim($this->common->getParam("title", ''));
        $file = $this->common->getParam("file", null);
        $content = trim($this->common->getParam("content", ''));
        $amount = (int)$this->common->getParam("amount", 0);
        $lotteryId = trim($this->common->getParam("lotteryId", ''));
        $issue = trim($this->common->getParam("issue", ''));
        $betContent = trim($this->common->getParam("betContent", ''));
        $isWeixinFile = $file['tmp_name'] ? false : true;
        if ($isWeixinFile) {
            if (count($file) <= 0 && empty($content)) {
                $this->resp->msg = "content不能为空";
                $this->jsonView->out($this->resp);
            }
        } else {
            if (count($file['tmp_name']) <= 0 && empty($content)) {
                $this->resp->msg = "content不能为空";
                $this->jsonView->out($this->resp);
            }
        }
        if ($amount < 0) {
            $this->resp->msg = "amount有误";
            $this->jsonView->out($this->resp);
        }
        if (!in_array($lotteryId, array('FC3D'))) {
            $this->resp->msg = "彩种类型有误";
            $this->jsonView->out($this->resp);
        }
        if (!preg_match('/^\d+$/', $issue)) {
            $this->resp->msg = "期号有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($betContent)) {
            $this->resp->msg = "betContent不能为空";
            $this->jsonView->out($this->resp);
        }
        //推荐图片
        $resourceIdArr = [];
        if ($isWeixinFile) {
            for ($i = 0, $length = count($file); $i < $length; $i++) {
                $serverId = trim($file[$i]);
                if (empty($serverId)) {
                    continue;
                }
                $respWeixin = $this->commonService->saveWeixinFile($serverId);
                if ($respWeixin->errCode == 0) {
                    $resourceId = (int)$respWeixin->data;
                    if ($resourceId > 0) {
                        $resourceIdArr[] = $resourceId;
                    }
                }
            }
        } else {
            //生成方案关联的图片
            $fileCount = count($file['tmp_name']);
            if (is_array($file) && $fileCount > 0) {
                for ($i = 0; $i < $fileCount; $i++) {
                    $fileType = trim($file["type"][$i]);
                    $name = trim($file['name'][$i]);
                    $tmpName = trim($file['tmp_name'][$i]);
                    if (empty($name) || empty($tmpName)) {
                        continue;
                    }
                    $error = (int)$file['error'][$i];
                    $size = (int)$file['size'][$i];
                    $maxSize = 2*1024*1024;//2MB
                    if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png' || $fileType == 'image/x-png' ||  $fileType == 'image/gif')) {
                        $pathInfo = pathinfo($name);
                        $fileName = trim($pathInfo['filename']);
                        $extension = trim($pathInfo['extension']);
                        $respUpload = $this->commonService->saveUploadFile($tmpName, $fileName, $extension);
                        if ($respUpload->errCode == 0) {
                            $resourceId = (int)$respUpload->data;
                            if ($resourceId > 0) {
                                $resourceIdArr[] = $resourceId;
                            }
                        }
                    }
                }
            }
        }
        //彩种
        $selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
        if ($selectLotteryByIdResp->errCode != 0) {
            $this->resp->msg = "彩种有误";
            $this->jsonView->out($this->resp);
        }
        $lotteryData = $selectLotteryByIdResp->data;
        $lotteryName = $lotteryData['lotteryName'];
        if (empty($lotteryData) || empty($lotteryName)) {
            $this->resp->msg = "彩种类型有误";
            $this->jsonView->out($this->resp);
        }
        //期号是否已结束
        $param = array();
        $param['lotteryId'] = $lotteryId;
        $param['issue'] = $issue;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $this->resp->msg = "期号有误";
            $this->jsonView->out($this->resp);
        }
        $lotteryIssueData = $selectLotteryIssueResp->data['list'][0];
        if (empty($lotteryIssueData) || !empty(trim($lotteryIssueData['drawNumber']))) {
            $this->resp->msg = "该期已开奖";
            $this->jsonView->out($this->resp);
        }
        $beginTime = (int)strtotime(trim($lotteryIssueData['beginTime']));
        $endTime = (int)strtotime(trim($lotteryIssueData['endTime']));  //官方截止销售时间
        $curTime = time();
        if ($beginTime <= 0 || $endTime <= 0) {
            $this->resp->msg = "该期销售时间异常";
            $this->jsonView->out($this->resp);
        }
        if ($curTime >= $endTime) {
            $this->resp->msg = "该期已经截止销售";
            $this->jsonView->out($this->resp);
        }
        if ($lotteryId == 'FC3D') {
            $saleTime = trim(date("Y-m-d H:i:s", $endTime - 35*60)); //在19:25截止
        }
        //验证投注格式 算出注数和金额
        $calculateDigitalTicketResp = $this->commonService->calculateDigitalTicket($lotteryId, $betContent);
        if ($calculateDigitalTicketResp->errCode != 0) {
            $this->resp->msg = $calculateDigitalTicketResp->msg;
            $this->jsonView->out($this->resp);
        }
        $ticketArr = $calculateDigitalTicketResp->data;
        if (!is_array($ticketArr) || count($ticketArr) <= 0) {
            $this->resp->msg = '投注格式异常';
            $this->jsonView->out($this->resp);
        }
        $ticketUnit = 0;
        foreach ($ticketArr as $ticket) {
            $unit = (int)$ticket['ticketUnit'];
            $ticketUnit += $unit;
        }
        $costAmount = (int)($ticketUnit*200);   //没有追加
        $param = array();
        $param['planType'] = 2; //类型, 1=竞技彩方案, 2=数字彩方案
        $param['userId'] = (int)$this->loginUserInfo['userId'];
        $param['nickName'] = trim($this->loginUserInfo['nickName']);
        $param['realName'] = trim($this->loginUserInfo['realName']);
        $param['title'] = $title;
        $param['lotteryId'] = $lotteryId;
        $param['lotteryName'] = $lotteryName;
        $param['issue'] = $issue;
        $param['content'] = $content;
        $param['amount'] = $amount;
        $param['publish'] = 1;
        $param['betContent'] = $betContent;
        $param['saleTime'] = $saleTime; //数字彩平台截止销售时间
        $param['saleTicket'] = 1;    //可否售票, 0=不可售票， 1=可售票
        $param['resourceId'] = $resourceIdArr;
        $param['costAmount'] = $costAmount;  //成本金额
        $insertPlanResp = $this->planService->insertPlan($param);
        if ($insertPlanResp->errCode != 0) {
            $this->resp->msg = "添加数字彩方案失败";
            $this->jsonView->out($this->resp);
        }
        $planId = (int)$insertPlanResp->data;
        if ($planId <= 0) {
            $this->resp->msg = "添加数字彩方案失败";
            $this->jsonView->out($this->resp);
        }
        $planNo = $this->common->encodeNo((int)$this->loginUserInfo['userId'], $planId);
        $this->resp->data = array('planNo' => $planNo);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//得到方案信息
	public function planInfo() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$needUser = (bool)$this->common->getParam("needUser", false);
		/********************* 检验方案编号是否正确(代码开始) *********************/
		$planNo = trim($this->common->getParam("planNo", ''));
		if (empty($planNo)) {
			$this->resp->msg = "planNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectPlanByNoResp = $this->planService->selectPlanByNoCache($planNo);
		if ($selectPlanByNoResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planData = $selectPlanByNoResp->data;
		if (empty($planData)) {
			$this->resp->msg = "方案不存在";
			$this->jsonView->out($this->resp);
		}
		$planData = $this->commonService->setMatchListCache(array($planData))[0];
		$planData = $this->commonService->setPlanAccess(array($planData), $this->loginUserInfo['userId'])[0];
		$access = (bool)$planData['access'];
		if (!$access) {
			$this->resp->errCode = 2;
			$this->resp->data = (int)$planData['amount'];
			$this->resp->msg = "还未购买订单";
			$this->jsonView->out($this->resp);
		}
		if ($needUser) {
			$planData = $this->commonService->setUserCache(array($planData))[0];
		}
		//获取方案资源
		$planData = $this->commonService->setResourceUrlCache(array($planData))[0];
		$matchType = (int)$planData['matchType'];
        $matchList = $planData['matchList'];
        if (empty($matchList)) {
            $this->resp->msg = "方案比赛信息异常";
            $this->jsonView->out($this->resp);
        }
        $recommendCount = 1;
		$maxBettypeOdds = 1;//计算理论最大赔率
        foreach ($matchList as $match) {
            $recommend = (array)$match['recommend'];
            $bettypeOdds = $match['bettypeOdds'];
            $recommendCount *= count($recommend);
			$odds = array();
			//得到选中的最大赔率
			foreach ($recommend as $r) {
				$odds[] = $bettypeOdds->$r;
			}
            $maxBettypeOdds *= max($odds);
        }
		$isAllowBuyTicket = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
		$matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
		$isSale = $matchListIsSaleResp->errCode == 0 && $isAllowBuyTicket;
		$planInfo = array();
		$planInfo['planNo'] = $this->common->encodeNo($planData['userId'], $planData['planId']);
		$planInfo['matchType'] = (int)$planData['matchType'];
		$planInfo['title'] = $planData['title'];
		$planInfo['content'] = $planData['content'];
		$planInfo['amount'] = $planData['amount'];
		$planInfo['upCount'] = $planData['upCount'];
		$planInfo['downCount'] = $planData['downCount'];
		$planInfo['shareCount'] = $planData['shareCount'];
        $planInfo['readCount'] = $planData['mockReadCount'];
		$planInfo['remark'] = !empty($planData['remark']) ? $planData['remark'] : '';
		$planInfo['createTime'] = $planData['createTime'];
		$planInfo['lastTime'] = $planData['lastTime'];
		$planInfo['maxBettypeOdds'] = sprintf('%.2f', $maxBettypeOdds);
        $planInfo['maxPrizeRate'] = sprintf('%.2f', $maxBettypeOdds*100/$recommendCount);
        $planInfo['recommendCount'] = $recommendCount;
        $planInfo['isSale'] = $isSale;
		$planInfo['matchList'] = $planData['matchList'];
		$planInfo['resourceList'] = is_array($planData['resourceList']) ? $planData['resourceList'] : array();
        $planInfo['prizeStatus'] = (int)$planData['prizeStatus'];
		if ($needUser) {
			$planInfo['user'] = $planData['user'];
		}
		//增加方案阅读量
        $planId = (int)$planData['planId'];
		$this->planService->updatePlanReadCount($planId);
		$this->resp->data = $planInfo;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    //数字彩方案信息
    public function digitalPlanInfo() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $needUser = (bool)$this->common->getParam("needUser", false);
        $planNo = trim($this->common->getParam("planNo", ''));
        if (empty($planNo)) {
            $this->resp->msg = "planNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectPlanByNoResp = $this->planService->selectPlanByNoCache($planNo);
        if ($selectPlanByNoResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $planData = $selectPlanByNoResp->data;
        if (empty($planData)) {
            $this->resp->msg = "方案不存在";
            $this->jsonView->out($this->resp);
        }
        $planData = $this->commonService->setPlanAccess(array($planData), $this->loginUserInfo['userId'])[0];
        $access = (bool)$planData['access'];
        if (!$access) {
            $this->resp->errCode = 2;
            $this->resp->data = (int)$planData['amount'];
            $this->resp->msg = "还未购买订单";
            $this->jsonView->out($this->resp);
        }
        if ($needUser) {
            $planData = $this->commonService->setUserCache(array($planData))[0];
        }
        //获取方案资源
        $planData = $this->commonService->setResourceUrlCache(array($planData))[0];
        $planData = $this->commonService->setLotteryIssueCache(array($planData))[0];
        $planData = $this->commonService->setBetContentListCache(array($planData))[0];
        $isAllowBuyTicket = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
        $isSale = (date("Y-m-d H:i:s") < $planData['saleTime']) && $isAllowBuyTicket;
        $planInfo = array();
        $planInfo['planType'] = $planData['planType'];
        $planInfo['planNo'] = $this->common->encodeNo($planData['userId'], $planData['planId']);
        $planInfo['title'] = $planData['title'];
        $planInfo['content'] = $planData['content'];
        $planInfo['amount'] = $planData['amount'];
        $planInfo['upCount'] = $planData['upCount'];
        $planInfo['downCount'] = $planData['downCount'];
        $planInfo['shareCount'] = $planData['shareCount'];
        $planInfo['readCount'] = $planData['mockReadCount'];
        $planInfo['remark'] = !empty($planData['remark']) ? $planData['remark'] : '';
        $planInfo['createTime'] = $planData['createTime'];
        $planInfo['lastTime'] = $planData['lastTime'];
        $planInfo['saleTime'] = $planData['saleTime'];
        $planInfo['isSale'] = $isSale;
        $planInfo['lotteryId'] = $planData['lotteryId'];
        $planInfo['lotteryName'] = $planData['lotteryName'];
        $planInfo['issue'] = $planData['issue'];
        $planInfo['lotteryIssue'] = $planData['lotteryIssue'];
        $planInfo['betContentList'] = $planData['betContentList'];
        $planInfo['resourceList'] = is_array($planData['resourceList']) ? $planData['resourceList'] : array();
        $planInfo['prizeStatus'] = (int)$planData['prizeStatus'];
		$planInfo['recommendCount'] = (int)$planData['costAmount']/200;
        if ($needUser) {
            $planInfo['user'] = $planData['user'];
        }
        //增加方案阅读量
        $planId = (int)$planData['planId'];
        $this->planService->updatePlanReadCount($planId);
        $this->resp->data = $planInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//得到方案列表
	public function planList() {
		$matchType = (int)$this->common->getParam("matchType", 0);
		$groupNo = trim($this->common->getParam("groupNo", ''));
		$userNo = trim($this->common->getParam("userNo", ''));
		$needGirl = (bool)$this->common->getParam("needGirl", false);
		$needHome = (bool)$this->common->getParam("needHome", false);//数据用在主页
		$needSale = (bool)$this->common->getParam("needSale", false);
		$needUser = (bool)$this->common->getParam("needUser", false);
		$needAccess = (bool)$this->common->getParam("needAccess", false);
        $needSaleTicket = (bool)$this->common->getParam("needSaleTicket", false);//只显示可以跟单
		$matchStatus = (int)$this->common->getParam("matchStatus", 0);
		$matchId = (int)$this->common->getParam("matchId", 0);
        $recommendType = (int)$this->common->getParam("recommendType", 0);  //推荐种类, 1=单关, 2=串关
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		$userId = (int)$this->loginUserInfo['userId'];
		$showWinCount = $this->common->isShowWinCount();
		if (!empty($userNo)) {
			$userNoArr = $this->common->decodeNo($userNo);
			$userId = (int)$userNoArr['userId'];
		}
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$isABT = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
		//美女用户map
		$girlMap = array();
		$groupId = 1;//美女推波
		$selectGroupByIdResp = $this->groupService->selectGroupByIdCache($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		if (!empty($groupData)) {
			$relateId = explode(',', trim($groupData['relateId']));
			if (is_array($relateId) && count($relateId) > 0) {
				foreach ($relateId as $uId) {
					$uId = (int)$uId;
					if ($uId > 0) {
						$girlMap[$uId] = true;
					}
				}
			}
		}
		$param = array();
		$param['planType'] = 1;//类型, 1=竞技彩方案, 2=数字彩方案
		$param['matchType'] = $matchType;
		//查询分组方案
		if (!empty($groupNo)) {
			$selectGroupByNoResp = $this->groupService->selectGroupByNoCache($groupNo);
			if ($selectGroupByNoResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$groupData = $selectGroupByNoResp->data;
			if (!empty($groupData)) {
				$relateId = explode(',', trim($groupData['relateId']));
				if (is_array($relateId) && count($relateId) > 0) {
					$param['userId'] = $relateId;
				}
			}
		}
		if ($matchId > 0) {
			$selectMatchByIdResp = $this->matchService->selectMatchByIdCache($matchId);
			if ($selectMatchByIdResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$matchData = $selectMatchByIdResp->data;
			if (empty($matchData)) {
				$this->resp->msg = "比赛查询异常";
				$this->jsonView->out($this->resp);
			}
			$matchPlanId = trim($matchData['planId']);
			if (empty($matchPlanId)) {
                $this->resp->msg = "该比赛不存在方案";
                $this->jsonView->out($this->resp);
            }
			$matchPlanId = explode(',', $matchPlanId);
			if (!is_array($matchPlanId) || count($matchPlanId) <= 0) {
				$this->resp->msg = "该比赛不存在方案";
				$this->jsonView->out($this->resp);
			}
			$param['planId'] = $matchPlanId;
			$param['publish'] = 1;
		} else if ($needGirl) {
			$userIdArr = array();
			foreach ($girlMap as $uId => $v) {
				$uId = (int)$uId;
				//853是英伦风格
				if ($uId <= 0 || $uId == 853) {
					continue;
				}
				$userIdArr[] = $uId;
			}
			$param['userId'] = $userIdArr;
			$param['needSale'] = true;
			$param['publish'] = 1;
		} else if ($needHome) {
			$param['matchStatus'] = 1;//1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
			$param['publish'] = 1;
		} else if ($needSale) {
			$param['needSale'] = true;
			$param['publish'] = 1;
		} else if ($needSaleTicket) {
            $param['matchStatus'] = 1;
            $param['publish'] = 1;
            if ($isABT) {
                $param['saleTicket'] = 1;
            }
        } else if (empty($groupNo) && $userId > 0) {
			$param['userId'] = $userId;
			if ($userId != (int)$this->loginUserInfo['userId']) {
				$param['publish'] = 1;
			}
		}
		if ($matchStatus > 0) {
			$param['matchStatus'] = $matchStatus;
		}
		if ($recommendType > 0) {
            $param['recommendType'] = $recommendType;
        }
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planListData = $selectPlanResp->data;
        $totalCount = (int)$planListData['totalCount'];
		$planList = $planListData['list'];
        $planList = $this->commonService->setMatchListCache($planList);
        //设置方案的跟单金额
        $planList = $this->commonService->setPlanSaleTicketAmountCache($planList);
		$data = array("totalCount" => $totalCount);
 		if ($needUser) {
			$planList = $this->commonService->setUserCache($planList);
			//设置连胜和胜率
			$userList = array();
			foreach ($planList as &$plan) {
				$userId = (int)$plan['userId'];
				$user = &$plan['user'];
                if ($userId > 0 && !empty($user)) {
					//添加userId, 目的是设置连胜和胜率
					$user['userId'] = $userId;
					$userList[] = &$user;
				}
			}
			$this->commonService->setUserWinStatusCache($userList);
			$this->commonService->setUserPlanRateCache($userList);
			foreach ($userList as &$user) {
				if (!$showWinCount) {//兼容老版本, winRate 和 winCount 名字冲突
					$user['winRate'] = (int)$user['winCount'];
				}
				//删除userId, 避免暴露到外面
				unset($user['userId']);
			}
		}
		$needStatistics = $matchId <= 0 && empty($groupNo) && !$needGirl && !$needSale && !$needHome && !$needSaleTicket && $userId == (int)$this->loginUserInfo['userId'] && $this->loginUserRight['1'];
		if ($needStatistics) {
			//资金类型, 0=方案, 1=出票
			//类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益, 2=分成收益)
			$planList = $this->commonService->setStatisticsCache($planList, 'planId', 0, 1, 'statistics');//方案-推荐收益
			$planList = $this->commonService->setStatisticsCache($planList, 'planId', 1, 2, 'divideStatistics');//出票-分成收益
			//推荐收益
			$param = array();
			$param['financeType'] = 0;
			$param['userId'] = array($userId);
			$param['type'] = 1;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1;
			$selectFinanceIncomeByGroupResp = $this->financeService->selectFinanceIncomeByGroup($param);
			if ($selectFinanceIncomeByGroupResp->errCode == 0) {
				$incomeList = $selectFinanceIncomeByGroupResp->data['list'];
				if (count($incomeList) > 0) {
					$data['totalIncomeCount'] = (int)$incomeList[0]['count'];
					$data['totalIncomeAmount'] = (int)$incomeList[0]['amount'];
				}
			}
		}
		if ($needAccess) {
			//设置方案是否可以访问
			$planList = $this->commonService->setPlanAccess($planList, $this->loginUserInfo['userId']);
		}
		$data['list'] = array();
		global $curEnv;
		$env = $curEnv;
		if ($env == 'dev') {
			//开发环境用测试环境图
			$env = 'beta';
		}
		$girlCoverMap = array(
			'12' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/yamin.jpg',//雅敏 宝宝
			'15' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/yaoyao.jpg',//้̤͡ ˌ̫̮ ้̤͡"瑶瑶
			'13' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/xiaohei.jpg',//小黑溜
			'1334' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/liangxiaoyan.jpg',//梁小燕
			'1333' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/luhuan.jpg',//卢欢
			'1332' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/dandan.jpg',//丹丹
			'5669' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/linmeimei.jpg',//林美眉
			'3231' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/tanyajun.jpg',//谈雅君
			'5805' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/yanhuameimei.jpg'//烟花妹妹
			//'5816' => 'http://caifu-1251177394.cosgz.myqcloud.com/'.$env.'/shaimi/img/girlPlan/yuye.jpg'//喻叶
		);
		$girlCoverMatchMap = array();
		for ($i = 0, $length = count($planList); $i < $length; $i++) {
			$userId = (int)$planList[$i]['userId'];
			$planId = (int)$planList[$i]['planId'];
			$createTime = trim($planList[$i]['createTime']);
			$matchBeginTime = trim($planList[$i]['matchBeginTime']);
            $matchList = $planList[$i]['matchList'];
			if ($userId <= 0 || $planId <= 0 || empty($matchList)) {
				continue;
			}
			$recommendCount = 1;
			$maxBettypeOdds = 1;//计算理论最大赔率
			foreach ($matchList as $match) {
				$recommend = (array)$match['recommend'];
				$bettypeOdds = $match['bettypeOdds'];
				$recommendCount *= count($recommend);
				$odds = array();
				//得到选中的最大赔率
				foreach ($recommend as $r) {
					$odds[] = $bettypeOdds->$r;
				}
				$maxBettypeOdds *= max($odds);
			}
			$matchListIsSaleResp = $this->commonService->matchListIsSale($matchList);
			$isSale = $matchListIsSaleResp->errCode == 0 && $isABT;
			$planInfo = array();
			$planInfo['planNo'] = $this->common->encodeNo($userId, $planId);
			$planInfo['matchType'] = (int)$planList[$i]['matchType'];
			$planInfo['title'] = trim($planList[$i]['title']);
			$planInfo['amount'] = (int)$planList[$i]['amount'];
			$planInfo['matchLength'] = (int)$planList[$i]['matchLength'];
			$planInfo['matchBeginTime'] = $matchBeginTime;
			$planInfo['createTime'] = $createTime;
			$planInfo['lastTime'] = trim($planList[$i]['lastTime']);
			$planInfo['readCount'] = (int)$planList[$i]['mockReadCount'];
			$planInfo['rich'] = (bool)($planList[$i]['rich']);
			$planInfo['hasPic'] = trim($planList[$i]['resourceId']) != '';
			$planInfo['isLinChang'] = (bool)(strtotime($matchBeginTime) - strtotime($createTime) <= 3600);
			$planInfo['isGirl'] = (bool)$girlMap[$userId];
			$planInfo['girlCover'] = trim($girlCoverMap[$userId]);
			$planInfo['isSale'] = (bool)$isSale;
			$planInfo['maxBettypeOdds'] = sprintf('%.2f', $maxBettypeOdds);
			$planInfo['maxPrizeRate'] = sprintf('%.2f', $maxBettypeOdds*100/$recommendCount);
			$planInfo['recommendCount'] = $recommendCount;
			$girlCoverMatchMap[$userId] = true;
			$planInfo['matchList'] = $planList[$i]['matchList'];
			$planInfo['prizeStatus'] = (int)$planList[$i]['prizeStatus'];
			$planInfo['saleTicketAmount'] = (int)$planList[$i]['saleTicketAmount'];
			if ($needAccess) {
				$planInfo['access'] = (bool)$planList[$i]['access'];
			}
			if ($needUser) {
				$planInfo['user'] = $planList[$i]['user'];
			}
			if ($needStatistics) {
				$statisticsInfo = array("count" => 0, "amount" => 0);
				$divideStatisticsInfo = array("count" => 0, "amount" => 0);
				if (!empty($planList[$i]['statistics'])) {
					$statisticsInfo['count'] = (int)$planList[$i]['statistics']['count'];
					$statisticsInfo['amount'] = (int)$planList[$i]['statistics']['amount'];
				}
				if (!empty($planList[$i]['divideStatistics'])) {
					$divideStatisticsInfo['count'] = (int)$planList[$i]['divideStatistics']['count'];
					$divideStatisticsInfo['amount'] = (int)$planList[$i]['divideStatistics']['amount'];
				}
				$planInfo['statistics'] = $statisticsInfo;
				$planInfo['divideStatistics'] = $divideStatisticsInfo;
			}
			$data['list'][] = $planInfo;
		}
		//只有一页就补充，虚拟方案
		if ($needGirl && $totalCount <= $pageSize && $pageNum == 1) {
			$mockPlanList = array();
			$date = date("Y-m-d H:i:s");
			foreach ($girlCoverMap as $userId => $girlCover) {
				if (key_exists($userId, $girlCoverMatchMap)) {
					continue;
				}
				$mockPlan = array(
					'userId' => $userId,
					"access" => false,
					"amount" => 0,
					"createTime" => $date,
					"girlCover" => $girlCover,
					"hasPic" => false,
					"isGirl" => true,
					"isLinChang" => false,
					"lastTime" => $date,
					"matchBeginTime" => $date,
					"matchList" => array(),
					"planNo" => "",
					"readCount" => 0,
					"rich" => false,
					"statistics" => array("count" => 0, "amount" => 0),
					"title" => ""
				);
				$mockPlanList[] = $mockPlan;
			}
			$mockPlanList = $this->commonService->setUserCache($mockPlanList);
			$userList = array();
			foreach ($mockPlanList as &$plan) {
				$userId = (int)$plan['userId'];
				$user = &$plan['user'];
                if ($userId > 0 && !empty($user)) {
					//添加userId, 目的是设置连胜和胜率
					$user['userId'] = $userId;
					$userList[] = &$user;
				}
			}
			$this->commonService->setUserWinStatusCache($userList);
			$this->commonService->setUserPlanRateCache($userList);
			foreach ($userList as &$user) {
				if (!$showWinCount) {//兼容老版本, winRate 和 winCount 名字冲突
					$user['winRate'] = (int)$user['winCount'];
				}
                //删除userId, 避免暴露到外面
                unset($user['userId']);
			}
			$data['list'] = array_merge($data['list'], $mockPlanList);
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//数字彩方案列表
    public function digitalPlanList() {
        $groupNo = trim($this->common->getParam("groupNo", ''));    //查询整组的方案
        $userNo = trim($this->common->getParam("userNo", ''));  //可能查询其它人的方案
        $needUser = (bool)$this->common->getParam("needUser", false);   //需要用户信息
        $needAccess = (bool)$this->common->getParam("needAccess", false);   //是否有权访问
        $needSaleTicket = (bool)$this->common->getParam("needSaleTicket", false);//只显示数字彩可以跟单的
        $planStatus = (int)$this->common->getParam("planStatus", 0);  //已结束，未结束
        $lotteryId = trim($this->common->getParam("lotteryId", ''));
        $issue = trim($this->common->getParam("issue", ''));
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        $userId = (int)$this->loginUserInfo['userId'];
        if (!empty($userNo)) {
            $userNoArr = $this->common->decodeNo($userNo);
            $userId = (int)$userNoArr['userId'];
        }
        //用户权限校验
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 20) {
            $pageSize = 20;
        }
        //该用户是否可以购买
        $isABT = (bool)$this->commonService->isAllowBuyTicket((int)$this->loginUserInfo['userId']);
		$param = array();
        if (!empty($groupNo)) {
            $selectGroupByNoResp = $this->groupService->selectGroupByNoCache($groupNo);
            if ($selectGroupByNoResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
            $groupData = $selectGroupByNoResp->data;
            if (!empty($groupData)) {
                $relateId = explode(',', trim($groupData['relateId']));
                if (is_array($relateId) && count($relateId) > 0) {
                    $param['userId'] = $relateId;
                }
            }
        }
        //可以跟单的
        if ($needSaleTicket) {
            $param['planStatus'] = 1;
            $param['publish'] = 1;
            if ($isABT) {
                $param['saleTicket'] = 1;
            }
        } else if (empty($groupNo) && $userId > 0) {
            $param['userId'] = $userId;
            if ($userId != (int)$this->loginUserInfo['userId']) {
                $param['publish'] = 1;
            }
        }
        if ($planStatus > 0) {
            $param['planStatus'] = $planStatus;
        }
        if (!empty($lotteryId)) {
            $param['lotteryId'] = $lotteryId;
        }
        if (!empty($issue)) {
            $param['issue'] = $issue;
        }
        $param['planType'] = 2;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $planListData = $selectPlanResp->data;
        $totalCount = (int)$planListData['totalCount'];
        $planList = $planListData['list'];
        $planList = $this->commonService->setLotteryIssueCache($planList);
        $planList = $this->commonService->setBetContentListCache($planList);
        $data = array("totalCount" => $totalCount);
        if ($needUser) {
			$planList = $this->commonService->setUserCache($planList);
			//设置连胜和胜率
			$userList = array();
			foreach ($planList as &$plan) {
				$userId = (int)$plan['userId'];
				$user = &$plan['user'];
				if ($userId > 0 && !empty($user)) {
					//添加userId, 目的是设置连胜和胜率
					$user['userId'] = $userId;
					$userList[] = &$user;
				}
			}
			$this->commonService->setUserWinStatusCache($userList);
			$this->commonService->setUserPlanRateCache($userList);
			foreach ($userList as &$user) {
				//删除userId, 避免暴露到外面
				unset($user['userId']);
			}
        }
        if ($needAccess) {
            //设置方案是否可以访问
            $planList = $this->commonService->setPlanAccess($planList, $this->loginUserInfo['userId']);
        }
        $needStatistics = empty($groupNo) && !$needSaleTicket && $planStatus <= 0 && $userId == (int)$this->loginUserInfo['userId'] && $this->loginUserRight['3'];
        if ($needStatistics) {
            //资金类型, 0=方案, 1=出票
            //类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益, 2=分成收益)
            //setStatistics($objectList, $idKey, $financeType, $type, $property)
            $planList = $this->commonService->setStatisticsCache($planList, 'planId', 0, 1, 'statistics');//方案-推荐收益
            $planList = $this->commonService->setStatisticsCache($planList, 'planId', 1, 2, 'divideStatistics');//出票-分成收益
            //推荐收益
            $param = array();
            $param['financeType'] = 0;
            $param['userId'] = array($userId);
            $param['type'] = 1;
            $param['pageNum'] = 1;
            $param['pageSize'] = 1;
            $selectFinanceIncomeByGroupResp = $this->financeService->selectFinanceIncomeByGroup($param);
            if ($selectFinanceIncomeByGroupResp->errCode == 0) {
                $incomeList = $selectFinanceIncomeByGroupResp->data['list'];
                if (count($incomeList) > 0) {
                    $data['totalIncomeCount'] = (int)$incomeList[0]['count'];
                    $data['totalIncomeAmount'] = (int)$incomeList[0]['amount'];
                }
            }
        }
        $data['list'] = array();
        global $curEnv;
        $env = $curEnv;
        if ($env == 'dev') {
            //开发环境用测试环境图
            $env = 'beta';
        }
        for ($i = 0, $length = count($planList); $i < $length; $i++) {
            $matchType = (int)$planList[$i]['matchType'];
            $userId = (int)$planList[$i]['userId'];
            $planId = (int)$planList[$i]['planId'];
            $lotteryId = trim($planList[$i]['lotteryId']);
            $createTime = trim($planList[$i]['createTime']);
            $saleTime = trim($planList[$i]['saleTime']);    //平台截止销售时间
            if ($matchType != 0 || $userId <= 0 || $planId <= 0 || empty($lotteryId)) {
                continue;
            }
            //数字彩
            $isSale = $isABT && date("Y-m-d H:i:s") < $saleTime;
            $planInfo = array();
            $planInfo['planNo'] = $this->common->encodeNo($userId, $planId);
            $planInfo['title'] = trim($planList[$i]['title']);
            $planInfo['amount'] = (int)$planList[$i]['amount'];
            $planInfo['saleTime'] = $saleTime;
            $planInfo['createTime'] = $createTime;
            $planInfo['lastTime'] = trim($planList[$i]['lastTime']);
            $planInfo['readCount'] = (int)$planList[$i]['mockReadCount'];
            $planInfo['rich'] = (bool)($planList[$i]['rich']);
            $planInfo['hasPic'] = trim($planList[$i]['resourceId']) != '';
            $planInfo['isSale'] = (bool)$isSale;
            $planInfo['prizeStatus'] = (int)$planList[$i]['prizeStatus'];
            $planInfo['lotteryId'] = $lotteryId;
            $planInfo['lotteryName'] = trim($planList[$i]['lotteryName']);
            $planInfo['issue'] = trim($planList[$i]['issue']);
            $planInfo['lotteryIssue'] = $planList[$i]['lotteryIssue'];
            $planInfo['betContentList'] = $planList[$i]['betContentList'];
            $planInfo['recommendCount'] = (int)$planList[$i]['costAmount']/200;
            if ($needAccess) {
                $planInfo['access'] = (bool)$planList[$i]['access'];
            }
            if ($needUser) {
                $planInfo['user'] = $planList[$i]['user'];
            }
            if ($needStatistics) {
                $statisticsInfo = array("count" => 0, "amount" => 0);
                $divideStatisticsInfo = array("count" => 0, "amount" => 0);
                if (!empty($planList[$i]['statistics'])) {
                    $statisticsInfo['count'] = (int)$planList[$i]['statistics']['count'];
                    $statisticsInfo['amount'] = (int)$planList[$i]['statistics']['amount'];
                }
                if (!empty($planList[$i]['divideStatistics'])) {
                    $divideStatisticsInfo['count'] = (int)$planList[$i]['divideStatistics']['count'];
                    $divideStatisticsInfo['amount'] = (int)$planList[$i]['divideStatistics']['amount'];
                }
                $planInfo['statistics'] = $statisticsInfo;
                $planInfo['divideStatistics'] = $divideStatisticsInfo;
            }
            $data['list'][] = $planInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//得到方案走势列表
	public function planTrendList() {
		$userNo = trim($this->common->getParam("userNo", ''));
		$recommendType = (int)$this->common->getParam("recommendType", 0);  //推荐种类, 1=单关, 2=串关
		if (empty($userNo)) {
			$this->resp->msg = "userNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$userNoArr = $this->common->decodeNo($userNo);
		$userId = (int)$userNoArr['userId'];
		if ($userId <= 0) {
			$this->resp->msg = "userNo参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($recommendType <= 0) {
			$this->resp->msg = "recommendType参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['planType'] = 1;
		$param['recommendType'] = $recommendType;
		$param['matchStatus'] = 3;
		$param['prizeStatus'] = array(1,2);
		$param['pageNum'] = 1;
		$param['pageSize'] = 20;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planList = $selectPlanResp->data['list'];
		$planList = array_reverse($planList);
		$number = 0;
		$prePrizeStatus = 0;
		$data = array('list' => array());
		foreach ($planList as $plan) {
			$prizeStatus = (int)$plan['prizeStatus'];
			if ($prizeStatus != $prePrizeStatus) {
				$number = 0;
				$prePrizeStatus = $prizeStatus;
			}
			if ($prizeStatus == 1) {
				$number++;
			} else if ($prizeStatus == 2) {
				$number--;
			}
			$data['list'][] = $number;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function planPrice() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$this->loginUserInfo['userId'];
		$price = array(800,1800);
		/*//彩店实单
		$groupId = 2;
		$selectGroupByIdResp = $this->groupService->selectGroupByIdCache($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		$userIdArr = explode(',', trim($groupData['relateId']));
		if (in_array($userId, $userIdArr)) {
			$price = array(0,800,1800);
		}*/
		//定价组
		$groupId = 7;
		$selectGroupByIdResp = $this->groupService->selectGroupByIdCache($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		$userIdArr = explode(',', trim($groupData['relateId']));
		if (in_array($userId, $userIdArr)) {
			$price = array(5800,8800);
		} else {
			$groupId = 9;
			$selectGroupByIdResp = $this->groupService->selectGroupByIdCache($groupId);
			if ($selectGroupByIdResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$groupData = $selectGroupByIdResp->data;
			$userIdArr = explode(',', trim($groupData['relateId']));
			if (in_array($userId, $userIdArr)) {
				$price = array(2800,3800);
			}
		}
		$this->resp->data = $price;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//方案点赞
	public function planUpCount() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$planNo = trim($this->common->getParam("planNo", ''));
		if (empty($planNo)) {
			$this->resp->msg = "planNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$planNoArr = $this->common->decodeNo($planNo);
		$planNoUserId = (int)$planNoArr['userId'];
		$planNoPlanId = (int)$planNoArr['id'];
		if (empty($planNoArr) || $planNoUserId <= 0 || $planNoPlanId <= 0) {
			$this->resp->msg = 'planNo参数有误';
			$this->jsonView->out($this->resp);
		}
		$updatePlanUpCountResp = $this->planService->updatePlanUpCount($planNoPlanId);
		if ($updatePlanUpCountResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//方案鄙视
	public function planDownCount() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$planNo = trim($this->common->getParam("planNo", ''));
		if (empty($planNo)) {
			$this->resp->msg = "planNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$planNoArr = $this->common->decodeNo($planNo);
		$planNoUserId = (int)$planNoArr['userId'];
		$planNoPlanId = (int)$planNoArr['id'];
		if (empty($planNoArr) || $planNoUserId <= 0 || $planNoPlanId <= 0) {
			$this->resp->msg = 'planNo参数有误';
			$this->jsonView->out($this->resp);
		}
		$updatePlanDownCountResp = $this->planService->updatePlanDownCount($planNoPlanId);
		if ($updatePlanDownCountResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//方案分享
	public function planShareCount() {
		if (empty($this->loginUserInfo)) {
			$this->resp->errCode = 1;
			$this->resp->msg = "用户未登录";
			$this->jsonView->out($this->resp);
		}
		$planNo = trim($this->common->getParam("planNo", ''));
		if (empty($planNo)) {
			$this->resp->msg = "planNo参数有误";
			$this->jsonView->out($this->resp);
		}
		$planNoArr = $this->common->decodeNo($planNo);
		$planNoUserId = (int)$planNoArr['userId'];
		$planNoPlanId = (int)$planNoArr['id'];
		if (empty($planNoArr) || $planNoUserId <= 0 || $planNoPlanId <= 0) {
			$this->resp->msg = 'planNo参数有误';
			$this->jsonView->out($this->resp);
		}
		$updatePlanShareCountResp = $this->planService->updatePlanShareCount($planNoPlanId);
		if ($updatePlanShareCountResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}