<?php
namespace controller\admin;
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

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->channelService = requireService("Channel");
		$this->orderService = requireService("Order");
	}

	//设置代理商
	public function createChannel() {
		$userId = (int)$this->common->getParam("userId", 0);
        $remark = trim($this->common->getParam("remark", ''));
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = "用户信息错误";
			$this->jsonView->out($this->resp);
		}
        $userData = $selectUserByIdResp->data;
        $nickName = trim($userData['nickName']);
        $realName = trim($userData['realName']);
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
            //插入
            $param = array();
            $param['userId'] = $userId;
            $param['nickName'] = $nickName;
            $param['realName'] = $realName;
            $param['remark'] = $remark;
            $insertChannelResp = $this->channelService->insertChannel($param);
            if ($insertChannelResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
        } else if ($channelData['discard'] == 1) {
            //更新
            $channel = (int)$channelData['channel'];
            $param = array();
            $param['discard'] = 0;
            $param['channel'] = $channel;
            $param['nickName'] = $nickName;
            $param['realName'] = $realName;
            $param['remark'] = $remark;
            $updateChannelResp = $this->channelService->updateChannel($param);
            if ($updateChannelResp->errCode != 0) {
                $this->resp->msg = "访问异常";
                $this->jsonView->out($this->resp);
            }
        }
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    //伪删除代理商
    public function deleteChannel() {
        $channel = (int)$this->common->getParam("channel", 0);
        if (empty($channel)) {
            $this->resp->msg = "channel参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['channel'] = $channel;
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
        if (empty($channelData) || $channelData['discard'] == 1) {
            $this->resp->msg = "代理商不存在";
            $this->jsonView->out($this->resp);
        }
        $channel = (int)$channelData['channel'];
        $param = array();
        $param['discard'] = 1;
        $param['channel'] = $channel;
        $updateChannelResp = $this->channelService->updateChannel($param);
        if ($updateChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "删除成功";
        $this->jsonView->out($this->resp);
    }

    public function channelInfo() {
        $channel = (int)$this->common->getParam("channel", 0);
        $userId = (int)$this->common->getParam("userId", 0);
        if ($userId <= 0 && $channel <= 0) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        if ($channel > 0) {
            $param['channel'] = $channel;
        }
        if ($userId > 0) {
            $param['userId'] = $userId;
        }
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
        $this->resp->data = $channelData;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //代理商列表
    public function channelList() {
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 100) {
            $pageSize = 100;
        }
        $param = array();
        $param['discard'] = 0;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $channelListData = $selectChannelResp->data;
        $this->resp->data = $channelListData;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}