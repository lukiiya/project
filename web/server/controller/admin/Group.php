<?php
namespace controller\admin;
use controller\Base;

class Group extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $groupService;
	private $userService;
	private $statisticsService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->groupService = requireService("Group");
		$this->userService = requireService("User");
		$this->statisticsService = requireService("Statistics");
	}

	public function createGroup() {
		$type = (int)$this->common->getParam("type", 0);
		$name = trim($this->common->getParam("name", ''));
		$publish = (int)$this->common->getParam("publish", 0);
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($name)) {
			$this->resp->msg = "name参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['type'] = $type;
		$param['name'] = $name;
		$param['publish'] = $publish;
		$insertGroupResp = $this->groupService->insertGroup($param);
		if ($insertGroupResp->errCode != 0) {
			$this->resp->msg = "新增分组失败";
			$this->jsonView->out($this->resp);
		}
		$groupId = (int)$insertGroupResp->data;
		if ($groupId <= 0) {
			$this->resp->msg = "新增分组失败";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['groupId'] = $groupId;
		$param['sort'] = $groupId;
		$updateGrouppResp = $this->groupService->updateGroup($param);
		if ($updateGrouppResp->errCode != 0) {
			$this->resp->msg = "修改分组失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyGroup() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$type = (int)$this->common->getParam("type", 0);
		$name = trim($this->common->getParam("name", ''));
		$publish = (int)$this->common->getParam("publish", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		if (empty($name)) {
			$this->resp->msg = "name参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['groupId'] = $groupId;
		$param['type'] = $type;
		$param['name'] = $name;
		$param['publish'] = $publish;
		$updateGrouppResp = $this->groupService->updateGroup($param);
		if ($updateGrouppResp->errCode != 0) {
			$this->resp->msg = "修改分组失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyGroupSort() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$type = (int)$this->common->getParam("type", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		$param = array();
		$param['pageNum'] = 1;
		$param['pageSize'] = 2000;
		$selectGroupResp = $this->groupService->selectGroup($param);
		if ($selectGroupResp->errCode != 0) {
			$this->resp->msg = "查询分组失败";
			$this->jsonView->out($this->resp);
		}
		$groupList = $selectGroupResp->data['list'];
		$groupListLength = count($groupList);
		if (!empty($groupList) && $groupListLength > 0) {
			$sort = 0;
			$changeGroupId = 0;
			$changeSort = 0;
			for ($i = 0; $i < $groupListLength; $i++) {
				$gId = (int)$groupList[$i]['groupId'];
				$gSort = (int)$groupList[$i]['sort'];
				if ($gId == $groupId) {
					$sort = $gSort;
					if ($type == 1 && ($i-1) >= 0) {
						$changeGroupId = (int)$groupList[$i-1]['groupId'];
						$changeSort = (int)$groupList[$i-1]['sort'];
						break;
					} else if ($type == 2 && ($i+1) < $groupListLength) {
						$changeGroupId = (int)$groupList[$i+1]['groupId'];
						$changeSort = (int)$groupList[$i+1]['sort'];
						break;
					}
				}
			}
			if ($type == 3) {
				$changeGroupId = (int)$groupList[0]['groupId'];
				$changeSort = (int)$groupList[0]['sort'];
			} else if ($type == 4) {
				$changeGroupId = (int)$groupList[$groupListLength-1]['groupId'];
				$changeSort = (int)$groupList[$groupListLength-1]['sort'];
			}
			if ($changeGroupId > 0) {
				$database = requireModule("Database");
				$sqlArr = array();
				$sqlArr[] = 'update t_group set sort="'.$changeSort.'" where groupId="' . $groupId . '" limit 1';
				$sqlArr[] = 'update t_group set sort="'.$sort.'" where groupId="' . $changeGroupId . '" limit 1';
				$sql = implode(';', $sqlArr);
				$result = $database->multiExecute($sql);
				$database->multiFree();
				if (!$result) {
					$this->resp->msg = "修改分组失败";
					$this->jsonView->out($this->resp);
				}
			}
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到分组详情
	public function groupInfo() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		$this->resp->data = $groupData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到分组列表
	public function groupList() {
		$type = (int)$this->common->getParam("type", 0);
		$publish = $this->common->getParam("publish", null);
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
		$param = array();
		$param['type'] = $type;
		if ($publish !== null) {
			$param['publish'] = $publish;
		}
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['needCount'] = true;
		$selectGroupResp = $this->groupService->selectGroup($param);
		if ($selectGroupResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupResp->data;
		$this->resp->data = $groupData;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function createGroupUser() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$userId = (int)$this->common->getParam("userId", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		if (empty($groupData)) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$relateId = trim($groupData['relateId']);
		$userIdArr = $this->common->filterIdArray(explode(',', $relateId));
		if (!empty($userIdArr) && count($userIdArr) > 0) {
			foreach ($userIdArr as $uId) {
				if ($uId == $userId) {
					$this->resp->msg = "用户已经在分组中,无需重复添加";
					$this->jsonView->out($this->resp);
				}
			}
		}
		$userIdArr[] = $userId;
		$param = array();
		$param['groupId'] = $groupId;
		$param['relateId'] = $userIdArr;
		$updateGroupResp = $this->groupService->updateGroup($param);
		if ($updateGroupResp->errCode != 0) {
			$this->resp->msg = "新增分组用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function deleteGroupUser() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$userId = (int)$this->common->getParam("userId", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		if (empty($groupData)) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$relateId = trim($groupData['relateId']);
		$userIdArr = $this->common->filterIdArray(explode(',', $relateId));
		$userLength = count($userIdArr);
		if (!empty($userIdArr) && $userLength > 0) {
			for ($i = 0; $i < $userLength; $i++) {
				if ($userIdArr[$i] == $userId) {
					$userIdArr[$i] = '*';
				}
			}
		}
		$userIdArr = $this->common->filterIdArray($userIdArr);
		$param = array();
		$param['groupId'] = $groupId;
		$param['relateId'] = $userIdArr;
		$updateGroupResp = $this->groupService->updateGroup($param);
		if ($updateGroupResp->errCode != 0) {
			$this->resp->msg = "删除分组用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	public function modifyGroupUserSort() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$userId = (int)$this->common->getParam("userId", 0);
		$type = (int)$this->common->getParam("type", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($userId <= 0) {
			$this->resp->msg = "userId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($type <= 0) {
			$this->resp->msg = "type参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
		if ($selectGroupByIdResp->errCode != 0) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$groupData = $selectGroupByIdResp->data;
		if (empty($groupData)) {
			$this->resp->msg = "查找分组失败";
			$this->jsonView->out($this->resp);
		}
		$relateId = trim($groupData['relateId']);
		$userIdArr = $this->common->filterIdArray(explode(',', $relateId));
		$userLength = count($userIdArr);
		if (empty($userIdArr) || !is_array($userIdArr) || $userLength <= 0) {
			$this->resp->msg = "分组用户不存在";
			$this->jsonView->out($this->resp);
		}
		$index = -1;
		for ($i = 0; $i < $userLength; $i++) {
			$uId = (int)$userIdArr[$i];
			if ($uId == $userId) {
				$index = $i;
				if ($type == 1 && ($i-1) >= 0) {
					$userIdArr[$i] = $userIdArr[$i-1];
					$userIdArr[$i-1] = $uId;
					break;
				} else if ($type == 2 && ($i+1) < $userLength) {
					$userIdArr[$i] = $userIdArr[$i+1];
					$userIdArr[$i+1] = $uId;
					break;
				}
			}
		}
		if ($index == -1) {
			$this->resp->msg = "用户不在该分组里";
			$this->jsonView->out($this->resp);
		}
		if ($type == 3) {
			$userIdArr[$index] = '*';
			array_unshift($userIdArr, $userId);
			$userIdArr = $this->common->filterIdArray($userIdArr);
		} else if ($type == 4) {
			$userIdArr[$index] = '*';
			array_push($userIdArr, $userId);
			$userIdArr = $this->common->filterIdArray($userIdArr);
		}
		$param = array();
		$param['groupId'] = $groupId;
		$param['relateId'] = $userIdArr;
		$updateGroupResp = $this->groupService->updateGroup($param);
		if ($updateGroupResp->errCode != 0) {
			$this->resp->msg = "排序分组用户失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到分组里用户列表
	public function groupUserList() {
		$groupId = (int)$this->common->getParam("groupId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$userRight = $this->common->getParam("userRight", null);
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($groupId <= 0) {
			$this->resp->msg = "groupId参数有误";
			$this->jsonView->out($this->resp);
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
		$data = array("totalCount" => 0, 'list' => array());
		if (!empty($userIdArr) && count($userIdArr) > 0) {
			$param = array();
			$param['userName'] = $userName;
			if ($userRight != null) {
				$param['userRight'] = $userRight;
			}
			$param['userId'] = $userIdArr;
			$param['pageNum'] = 1;
			$param['pageSize'] = count($userIdArr);
			$selectUserResp = $this->userService->selectUser($param);
			$userMap = array();
			if ($selectUserResp->errCode == 0) {
				$userList = $selectUserResp->data['list'];
				if (!empty($userList)) {
					$userLength = count($userList);
					$data['totalCount'] = $userLength;
					$begin = ($pageNum - 1) * $pageSize;
					$end = ($begin + $pageSize) > $userLength ? $userLength : ($begin + $pageSize);
					for ($i = $begin; $i < $end; $i++) {
						$user = $userList[$i];
						$userId = (int)$user['userId'];
						if ($userId <= 0) {
							continue;
						}
						$userMap[$userId] = $user;
					}
				}
			}
			foreach ($userIdArr as $userId) {
				if (!empty($userMap[$userId])) {
					$data['list'][] = $userMap[$userId];
				}
			}
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	//得到分组里用户列表
	public function toggleTicketUser() {
		$groupId = 9;
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
		$groupUserIdArr = $this->common->filterIdArray(explode(',', trim($groupData['relateId'])));
		$param = array();
		$selectStatisticsCashConsumeUserResp = $this->statisticsService->selectStatisticsCashConsumeUser($param);
		if ($selectStatisticsCashConsumeUserResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$cashConsumeUserData = $selectStatisticsCashConsumeUserResp->data;
		$list = $cashConsumeUserData['list'];
		$cashConsumeUserIdArr = array();
		foreach ($list as $info) {
			$userId = (int)$info['userId'];
			if ($userId > 0) {
				$cashConsumeUserIdArr[] = $userId;
			}
		}
		$cashConsumeUserIdArr = $this->common->filterIdArray($cashConsumeUserIdArr);
		$userIdArr = array_merge($groupUserIdArr, $cashConsumeUserIdArr);
		$userIdArr = $this->common->filterIdArray($userIdArr);
		$param = array();
		$param['groupId'] = $groupId;
		$param['relateId'] = $userIdArr;
		$updateGrouppResp = $this->groupService->updateGroup($param);
		if ($updateGrouppResp->errCode != 0) {
			$this->resp->msg = "修改分组失败";
			$this->jsonView->out($this->resp);
		}
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}
}