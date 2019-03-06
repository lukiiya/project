<?php
namespace controller\admin;
use controller\Base;

class User extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $groupService;
	private $channelService;
	private $financeService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->groupService  = requireService("Group");
		$this->channelService  = requireService("Channel");
		$this->financeService  = requireService("Finance");
	}

	public function modifyUser() {
		$userId = (int)$this->common->getParam("userId", 0);
		$realName = trim($this->common->getParam("realName", ''));
		$tag = trim($this->common->getParam("tag", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$address = trim($this->common->getParam("address", ''));
		$personalImg = trim($this->common->getParam("personalImg", ''));
		$remark = trim($this->common->getParam("remark", ''));
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['realName'] = $realName;
		$param['tag'] = $tag;
		$param['phone'] = $phone;
		$param['address'] = $address;
		$param['personalImg'] = $personalImg;
		$param['remark'] = $remark;
		$updateUserResp = $this->userService->updateUser($param);
		if ($updateUserResp->errCode != 0) {
			$this->resp->msg = "修改用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyUserRight() {
		$userId = (int)$this->common->getParam("userId", 0);
		$userRight = (int)$this->common->getParam("userRight", 0);
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['userId'] = $userId;
		$param['userRight'] = $userRight;
		$updateUserResp = $this->userService->updateUser($param);
		if ($updateUserResp->errCode != 0) {
			$this->resp->msg = "修改用户权限失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

    public function forbidUser() {
        $userId = (int)$this->common->getParam("userId", 0);
        if ($userId <= 0) {
            $this->resp->msg = "userId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $param['forbid'] = 1;
        $updateUserResp = $this->userService->updateUser($param);
        if ($updateUserResp->errCode != 0) {
            $this->resp->msg = "用户封号失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function allowUser() {
        $userId = (int)$this->common->getParam("userId", 0);
        if ($userId <= 0) {
            $this->resp->msg = "userId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $param['forbid'] = 0;
        $updateUserResp = $this->userService->updateUser($param);
        if ($updateUserResp->errCode != 0) {
            $this->resp->msg = "用户解封失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//得到用户详情
	public function userInfo() {
		$userId = (int)$this->common->getParam("userId", 0);
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$userData = $selectUserByIdResp->data;
		$userData = $this->commonService->setUserImg(array($userData))[0];
		$this->resp->data = $userData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到用户列表
	public function userList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$userRight = $this->common->getParam("userRight", null);
		$subscribe = $this->common->getParam("subscribe", null);
        $forbid = $this->common->getParam("forbid", null);
		$source = $this->common->getParam("source", null);
		$channel = $this->common->getParam("channel", null);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		if ($userRight !== null) {
			$param['userRight'] = $userRight;
		}
		if ($subscribe !== null) {
			$param['subscribe'] = $subscribe;
		}
        if ($forbid !== null) {
            $param['forbid'] = $forbid;
        }
		if ($source !== null) {
			$param['source'] = $source;
		}
		if ($channel !== null) {
			$param['channel'] = $channel;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
        $userList =  $data['list'];
        $userList = $this->commonService->setUserImg($userList);
        $userIdArr = array();
        foreach ($userList as $user) {
            $userId = (int)$user['userId'];
            if ($userId > 0) {
                $userIdArr[] = $userId;
            }
        }
        array_unique($userIdArr);
        $param = array();
		$param['discard'] = 0;
        $param['userId'] = $userIdArr;
        $selectChannelResp = $this->channelService->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $this->resp->msg = "查询异常";
            $this->jsonView->out($this->resp);
        }
        $channelList = $selectChannelResp->data['list'];
        $channelListMap = array();
        foreach ($channelList as $channel) {
            $userId = (int)$channel['userId'];
            if ($userId > 0  && !key_exists($userId, $channelListMap)) {
                $channelListMap[$userId] = $channel;
            }
        }
        foreach ($userList as &$user) {
            $userId = $user['userId'];
            $user['isChannel'] = key_exists($userId, $channelListMap);
        }
		$data['list'] = $userList;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function exportUser() {
		$param = array();
		$param['channel'] = array(0,1);
		$param['needPhone'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$userList = $selectUserResp->data['list'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="200">用户</th><th width="100">手机</th><th width="150">注册时间</th></tr>';
		foreach ($userList as $user) {
			$nickName = trim($user['nickName']);
			$realName = trim($user['realName']);
			$userName = $nickName;
			if ($realName != '') {
				$userName .= '('.$realName.')';
			}
			$phone = trim($user['phone']);
			$createTime = trim($user['createTime']);
			if ($this->common->verifyMobile($phone)) {
				$table .= '<tr><td>'.$userName.'</td><td>'.$phone.'</td><td>'.$createTime.'</td></tr>';
			}
		}
		$excelView = requireView("Excel");
		$excelView->out($table);
	}

	//得到应用宝用户列表
	public function myappUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 1;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到全民夺宝用户列表
	public function qmdbUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 2;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到老徐说彩用户列表
	public function lxscUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 3;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到蜜蜂视频用户列表
	public function mfspUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 6;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到玉琳玩彩用户列表
	public function ylwcUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 5;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到桂林mj用户列表
	public function glmjUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 7;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj1UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 8;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj2UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 9;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj3UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 10;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj4UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 11;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj5UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 12;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj6UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 13;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj7UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 14;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj8UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 15;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj9UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 16;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function glmj10UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 17;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到tvsou用户列表
	public function tvsouUserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 18;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到刘老六用户列表
	public function ll6UserList() {
		$userName = trim($this->common->getParam("userName", ''));
		$phone = trim($this->common->getParam("phone", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['channel'] = 19;
		$param['userName'] = $userName;
		$param['phone'] = $phone;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$userList = $data['list'];
		$userList = $this->commonService->setUserImg($userList);
		$list = array();
		foreach ($userList as $user) {
			$info = array();
			$info['nickName'] = trim($user['nickName']);
			$info['realName'] = trim($user['realName']);
			$info['tag'] = trim($user['tag']);
			$info['remark'] = trim($user['remark']);
			$info['phone'] = preg_replace("/(\d{3})\d{4}(\d{3})/", '$1****$2', trim($user['phone']));
			$info['profileImg'] = trim($user['profileImg']);
			$info['personalImg'] = trim($user['personalImg']);
			$info['sex'] = (int)$user['sex'];
			$info['country'] = trim($user['country']);
			$info['province'] = trim($user['province']);
			$info['city'] = trim($user['city']);
			$info['createTime'] = trim($user['createTime']);
			$list[] = $info;
		}
		$data['list'] = $list;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function expertList() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 20) {
			$pageSize = 20;
		}
		$userIdArr = array();
		if ($groupId > 0) {
			$selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
			if ($selectGroupByIdResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$groupData = $selectGroupByIdResp->data;
			if (empty($groupData)) {
				$this->resp->msg = "用户组不存在";
				$this->jsonView->out($this->resp);
			}
			$userIdArr = $this->common->filterIdArray(explode(',', trim($groupData['relateId'])));
		} else {
			$param = array();
			$param['type'] = 1;
			$param['publish'] = 1;
			$param['needCount'] = false;
			$selectGroupResp = $this->groupService->selectGroup($param);
			if ($selectGroupResp->errCode != 0) {
				$this->resp->msg = "访问异常";
				$this->jsonView->out($this->resp);
			}
			$groupList = $selectGroupResp->data['list'];
			foreach ($groupList as $group) {
				$userIdArr = array_merge($userIdArr, $this->common->filterIdArray(explode(',', trim($group['relateId']))));
			}
			$userIdArr = array_unique($userIdArr);
		}
		$param = array();
		$param['userId'] = $userIdArr;
		$param['userName'] = $userName;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserResp = $this->userService->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
	
	//得到用户审核列表
	public function userVerifyList() {
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$status = (int)$this->common->getParam("status", 0);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 50) {
			$pageSize = 50;
		}
		$param = array();
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['status'] = $status;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectUserVerifyResp = $this->userService->selectUserVerify($param);
		if ($selectUserVerifyResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectUserVerifyResp->data;
		if (empty($data)) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data['list'] = $this->commonService->setUserImg($data['list']);
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function verifyUser() {
		$verifyId = (int)$this->common->getParam("verifyId", 0);
		$status = (int)$this->common->getParam("status", 0);
		if ($verifyId <= 0) {
			$this->resp->msg = "verifyId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($status <= 0 || $status == 1) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserVerifyByIdResp = $this->userService->selectUserVerifyById($verifyId);
		if ($selectUserVerifyByIdResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$verifyUser = $selectUserVerifyByIdResp->data;
		if (empty($verifyUser)) {
			$this->resp->msg = "审核记录不存在";
			$this->jsonView->out($this->resp);
		}
		$userId = (int)$verifyUser['userId'];
		if ($userId <= 0) {
			$this->resp->msg = "审核用户信息异常";
			$this->jsonView->out($this->resp);
		}
		if ((int)$verifyUser['status'] != 1) {
			$this->resp->msg = "该条审核已经被处理过";
			$this->jsonView->out($this->resp);
		}
		$realName = trim($verifyUser['realName']);
		$type = (int)$verifyUser['type'];
		$phone = trim($verifyUser['phone']);
		$identityImg = trim($verifyUser['identityImg']);
		$businessImg = trim($verifyUser['businessImg']);
		$address = trim($verifyUser['address']);
		$remark = trim($verifyUser['remark']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新审核用户
			$updateUserVerifySql = 'update t_user_verify set status="'.$status.'" where verifyId="' . $verifyId . '" and status=1 limit 1 ';
			$updateUserVerifyResult = $database->execute($updateUserVerifySql);
			$updateUserVerifyResultAffectedRows = (int)$database->getAffectedRows();
			if (!$updateUserVerifyResult || $updateUserVerifyResultAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新用户审核异常";
				$this->jsonView->out($this->resp);
			}
			//1=未审核, 2=已审核, 3=已拒绝
			if ($status == 2) {
				//更新用户
				$field = array();
				$field[] = 'realName="'.$database->escape($realName).'"';
				$field[] = 'phone="'.$database->escape($phone).'"';
				$field[] = 'identityImg="'.$database->escape($identityImg).'"';
				if ($type == 1) {
					$field[] = 'remark="'.$database->escape($remark).'"';
					$field[] = 'userRight=1';
				} else if ($type == 2) {
					$field[] = 'address="'.$database->escape($address).'"';
					$field[] = 'businessImg="'.$database->escape($businessImg).'"';
					$field[] = 'userRight=3';
				}
				$updateUserSql = 'update t_user set '. implode(',', $field) .' where userId="' . $userId . '" limit 1 ';
				$updateUserResult = $database->execute($updateUserSql);
				$updateUserAffectedRows = (int)$database->getAffectedRows();
				if (!$updateUserResult || $updateUserAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "更新用户异常";
					$this->jsonView->out($this->resp);
				}
			}
			$database->execute('commit');
			$database->close();
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = '审核失败';
			$this->jsonView->out($this->resp);
		}
	}

	public function loginUser() {
		$userId = (int)$this->common->getParam("userId", 0);
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$userData = $selectUserByIdResp->data;
		$unionId = trim($userData['unionId']);
		if (empty($unionId)) {
			$this->resp->msg = "unionId参数有误";
			$this->jsonView->out($this->resp);
		}
		$this->common->setUserAuth('portal', array(
            'userId' => $userId,
            'unionId' => $unionId
        ));
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function createUserArticle() {
        $userId = (int)$this->common->getParam("userId", 0);
        $articleLink = trim($this->common->getParam("articleLink", ''));
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($userId <= 0 || $selectUserByIdResp->errCode != 0){
            $this->resp->msg = "userId参数有误";
            $this->jsonView->out($this->resp);
        }
        $userInfo = $selectUserByIdResp->data;
        if ($articleLink == '') {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['userId'] = $userId;
        $param['articleLink'] = $articleLink;
        $selectUserArticleResp = $this->userService->selectUserArticle($param);
		if ($selectUserArticleResp->errCode != 0){
			$this->resp->msg = "查询文章异常";
			$this->jsonView->out($this->resp);
		}
        if (count($selectUserArticleResp->data['list']) > 0){
            $this->resp->msg = "该用户已经添加过此文章";
            $this->jsonView->out($this->resp);
        }
        $html = @file_get_contents($articleLink);
        if ($html == "") {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
		preg_match('/<h2[^<>]*?id="activity-name"[^<>]*?>([\s\S]*?)<\/h2>/', $html, $match);
        $articleTitle = trim(strip_tags($match[0]));
        preg_match('/<a[^<>]*?id="post-user"[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
        $articleSource = trim(strip_tags($match[0]));
		preg_match_all('/<img[^<>]*?data-src="([^<>]*?(?:jpeg|png))"[^<>]*?\/?>/', $html, $match);
		$articleImg = '';
		$filterImg = array(
			'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnu4uWc83Q7MQiaalAchlibBu6SkJreQLgzGuEFN27k1lG0v9vkLQbevBxw/0?wx_fmt=jpeg',
			'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnusQ9RNL5Q5Xx6jqYqzHrC359iaxUm5sOnXhGqYS4XBk49A4OmcZib5icqQ/0?wx_fmt=jpeg'
		);
		for ($j = 0, $len = count($match[0]); $j < $len; $j++) {
			$img = trim($match[1][$j]);
			if (!in_array($img, $filterImg)) {
				$articleImg = $img;
				break;
			}
		}
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $userInfo['nickName'];
        $param['realName'] = $userInfo['realName'];
        $param['articleTitle'] = $articleTitle;
        $param['articleSource'] = $articleSource;
        $param['articleImg'] = $articleImg;
        $param['articleLink'] = $articleLink;
        $insertUserArticleResp= $this->userService->insertUserArticle($param);
        $articleId = (int)$insertUserArticleResp->data;
        if ($insertUserArticleResp->errCode != 0 || $articleId <= 0) {
            $this->resp->msg = "新增用户文章失败";
            $this->jsonView->out($this->resp);
        }
        $data = array();
        $data['articleTitle'] = $articleTitle;
        $data['articleSource'] = $articleSource;
        $data['articleImg'] = $articleImg;
        $data['articleLink'] = $articleLink;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function modifyUserArticle() {
        $articleId = (int)$this->common->getParam("articleId", 0);
        $articleLink = trim($this->common->getParam("articleLink", ''));
        if ($articleLink == '') {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['articleId'] = $articleId;
        $selectUserArticleResp = $this->userService->selectUserArticle($param);
        if ($articleId <= 0 || $selectUserArticleResp->errCode != 0){
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $articleData = $selectUserArticleResp->data['list'][0];
        $param = array();
        $param['userId'] = $articleData['userId'];
        $param['articleLink'] = $articleLink;
        $selectUserArticleResp = $this->userService->selectUserArticle($param);
        if ($selectUserArticleResp->errCode != 0){
            $this->resp->msg = "查询文章异常";
            $this->jsonView->out($this->resp);
        }
		$articleList = (array)$selectUserArticleResp->data['list'];
		foreach ($articleList as $article) {
			if ($articleLink == $article['articleLink'] && $articleId != $article['articleId']) {
				$this->resp->msg = "该用户已经添加过此文章";
				$this->jsonView->out($this->resp);
				break;
			}
		}
        //爬取数据
        $html = @file_get_contents($articleLink);
        if ($html == "") {
            $this->resp->msg = "articleLink参数有误";
            $this->jsonView->out($this->resp);
        }
        preg_match('/<h2[^<>]*?id="activity-name"[^<>]*?>([\s\S]*?)<\/h2>/', $html, $match);
        $articleTitle = trim(strip_tags($match[0]));
        preg_match('/<a[^<>]*?id="post-user"[^<>]*?>([\s\S]*?)<\/a>/', $html, $match);
        $articleSource = trim(strip_tags($match[0]));
        preg_match_all('/<img[^<>]*?data-src="([^<>]*?(?:jpeg|png))"[^<>]*?\/?>/', $html, $match);
        $articleImg = '';
		$filterImg = array(
			'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnu4uWc83Q7MQiaalAchlibBu6SkJreQLgzGuEFN27k1lG0v9vkLQbevBxw/0?wx_fmt=jpeg',
			'http://mmbiz.qpic.cn/mmbiz/J7d0te6eYzhuTa95GQI8gbicgLouMYtnusQ9RNL5Q5Xx6jqYqzHrC359iaxUm5sOnXhGqYS4XBk49A4OmcZib5icqQ/0?wx_fmt=jpeg'
		);
		for ($j = 0, $len = count($match[0]); $j < $len; $j++) {
			$img = trim($match[1][$j]);
			if (!in_array($img, $filterImg)) {
				$articleImg = $img;
				break;
			}
		}
        $param = array();
        $param['articleId'] = $articleId;
        $param['articleTitle'] = $articleTitle;
        $param['articleSource'] = $articleSource;
        $param['articleImg'] = $articleImg;
        $param['articleLink'] = $articleLink;
        $updateUserArticleResp= $this->userService->updateUserArticle($param);
        if ($updateUserArticleResp->errCode != 0) {
            $this->resp->msg = "更新用户文章失败";
            $this->jsonView->out($this->resp);
        }
        $data = array();
        $data['articleTitle'] = $articleTitle;
        $data['articleSource'] = $articleSource;
        $data['articleImg'] = $articleImg;
        $data['articleLink'] = $articleLink;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function userArticleList() {
        $userId = (int)$this->common->getParam("userId", 0);
        $articleTitle = trim($this->common->getParam("articleTitle", ''));
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        $param = array();
        if ($userId > 0) {
            $param['userId'] = $userId;
        }
        if ($articleTitle != null) {
            $param['articleTitle'] = $articleTitle;
        }
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 10;
        }
        if ($pageSize > 50) {
            $pageSize = 50;
        }
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectUserArticleRes = $this->userService->selectUserArticle($param);
        if ($selectUserArticleRes->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $userArticleList = $selectUserArticleRes->data;
        $this->resp->data = $userArticleList;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function deleteUserArticle() {
        $articleId = (int)$this->common->getParam("articleId", 0);
        $param = array();
        $param['articleId'] = $articleId;
        $selectUserArticleResp = $this->userService->selectUserArticle($param);
        if ($articleId <= 0 || $selectUserArticleResp->errCode != 0){
            $this->resp->msg = "articleId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['discard'] = 1;
        $param['articleId'] = $articleId;
        $updateUserArticleResp= $this->userService->updateUserArticle($param);
        if ($updateUserArticleResp->errCode != 0) {
            $this->resp->msg = "用户文章删除失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	public function chargeUser() {
		$userId = (int)$this->common->getParam("userId", 0);
		$financeType = $this->common->getParam("financeType", null);//资金类型, 0=方案, 1=出票
		$amount = (int)$this->common->getParam("amount", 0);
		$remark = trim($this->common->getParam("remark", ''));
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		if (!is_numeric($financeType) || ($financeType != 0 && $financeType != 1)) {
			$this->resp->msg = "financeType参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($amount == 0) {
			$this->resp->msg = "amount参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($remark)) {
			$this->resp->msg = "remark参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = "查询用户异常";
			$this->jsonView->out($this->resp);
		}
		$userData = $selectUserByIdResp->data;
		if (empty($userData)) {
			$this->resp->msg = "用户不存在";
			$this->jsonView->out($this->resp);
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		//资金明细表额外表
		$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
		if ($selectFinanceExtraByUserIdResp->errCode != 0) {
			$this->resp->msg = "查询资金异常";
			$this->jsonView->out($this->resp);
		}
		$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
		if (empty($financeDataExtra)) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		if ($financeIdExtra <= 0) {
			$this->resp->msg = "资金不存在";
			$this->jsonView->out($this->resp);
		}
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
			//充值流水插入
			$insertFinanceChargeRecordField = array();
			$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceChargeRecordField[] = 'remark="' . $database->escape($remark) . '"';
			$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeRecordField[] = 'createTime=now()';
			$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
			$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
			$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入流水异常";
				$this->jsonView->out($this->resp);
			}
			//充值插入
			$insertFinanceChargeField = array();
			$insertFinanceChargeField[] =  'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeField[] = 'remark="' . $database->escape($remark) . '"';
			$insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
			$insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeField[] = 'createTime=now()';
			$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
			$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
			$insertFinanceChargeInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "插入充值异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $amount;//平台充值
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$this->resp->msg = "更新资金异常";
				$this->jsonView->out($this->resp);
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
	}
}