<?php
namespace controller\portal;
use controller\Base;

class Replay extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;
    private $replayService;
    public $loginUserInfo;
    public $loginUserRight;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
        $this->replayService = requireService("Replay");
    }

    //创建复盘
    public function createReplay() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        if (!$this->loginUserRight['1']) {
            $this->resp->msg = "非法访问";
            $this->jsonView->out($this->resp);
        }
        $userId = (int)$this->loginUserInfo['userId'];
        $nickName = trim($this->loginUserInfo['nickName']);
        $realName = trim($this->loginUserInfo['realName']);
        $title = trim($this->common->getParam("title", ''));
        $content = trim($this->common->getParam("content", ''));
        $file = $this->common->getParam("file", null);
        $isWeixinFile = $file['tmp_name'] ? false : true;
        if (count($file) <= 0 && count($file['tmp_name']) <= 0) {
            $this->resp->msg = "请上传文件";
            $this->jsonView->out($this->resp);
        }
        if (empty($title)) {
            $this->resp->msg = "标题不能为空";
            $this->jsonView->out($this->resp);
        }
        if (mb_strlen($title) < 5) {
            $this->resp->msg = "标题至少五个字";
            $this->jsonView->out($this->resp);
        }
        if (empty($content)) {
            $this->resp->msg = "内容不能为空";
            $this->jsonView->out($this->resp);
        }
        //图片资源
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
            //生成复盘关联的图片
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
        $param = array();
        $param['userId'] = $userId;
        $param['nickName'] = $nickName;
        $param['realName'] = $realName;
        $param['title'] = $title;
        $param['content'] = $content;
        $param['resourceId'] = $resourceIdArr;
        $param['publish'] = 1;
        $insertReplayResp = $this->replayService->insertReplay($param);
        if ($insertReplayResp->errCode != 0) {
            $this->resp->msg = "添加复盘失败";
            $this->jsonView->out($this->resp);
        }
        $replayId = (int)$insertReplayResp->data;
        if ($replayId <= 0) {
            $this->resp->msg = "添加复盘失败";
            $this->jsonView->out($this->resp);
        }
        $replayNo = $this->common->encodeNo((int)$this->loginUserInfo['userId'], $replayId);
        $this->resp->data = array('replayNo' => $replayNo);
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function replayList() {
        $userNo = trim($this->common->getParam("userNo", ''));
        $needUser = (bool)$this->common->getParam("needUser", false);
        $needAll = (bool)$this->common->getParam("needAll", false);
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        $userId = (int)$this->loginUserInfo['userId'];
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
        $param = array();
        if (!$needAll && $userId > 0) {
            $param['userId'] = $userId;
        }
        $param['publish'] = 1;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectReplayResp = $this->replayService->selectReplay($param);
        if ($selectReplayResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $replayListData = $selectReplayResp->data;
        $totalCount = (int)$replayListData['totalCount'];
        $replayList = $replayListData['list'];
        $data = array("totalCount" => $totalCount);
        if ($needUser) {
            $replayList = $this->commonService->setUser($replayList);
            //设置连胜和胜率
            $userList = array();
            foreach ($replayList as &$replay) {
                $userId = (int)$replay['userId'];
                $user = &$replay['user'];
                if ($userId > 0 && !empty($user)) {
                    //添加userId, 目的是设置连胜和胜率
                    $user['userId'] = $userId;
                    $userList[] = &$user;
                }
            }
            $this->commonService->setUserWinStatus($userList);
            $this->commonService->setUserPlanRate($userList);
            foreach ($userList as &$user) {
                //删除userId, 避免暴露到外面
                unset($user['userId']);
            }
        }
        $data['list'] = array();
        for ($i = 0, $length = count($replayList); $i < $length; $i++) {
            $userId = (int)$replayList[$i]['userId'];
            $replayId = (int)$replayList[$i]['replayId'];
            if ($userId <= 0 || $replayId <= 0) {
                continue;
            }
            $replayInfo = array();
            $replayInfo['replayNo'] = $this->common->encodeNo($userId, $replayId);
            $replayInfo['title'] = trim($replayList[$i]['title']);
            $replayInfo['content'] = trim($replayList[$i]['content']);
            $replayInfo['readCount'] = (int)$replayList[$i]['mockReadCount'];
            $replayInfo['user'] = $replayList[$i]['user'];
            $data['list'][] = $replayInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    public function replayInfo() {
        $replayNo = trim($this->common->getParam("replayNo", ''));
        if (empty($replayNo)) {
            $this->resp->msg = "replayNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $replayNoArr = $this->common->decodeNo($replayNo);
        $userId = (int)$replayNoArr['userId'];
        $replayId = (int)$replayNoArr['id'];
        if (empty($replayNoArr) || $userId <= 0 || $replayId <= 0) {
            $this->resp->msg = "replayNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectReplayByIdResp = $this->replayService->selectReplayByIdCache($replayId);
        if ($selectReplayByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $replayData = $selectReplayByIdResp->data;
        if (empty($replayData)) {
            $this->resp->msg = "复盘不存在";
            $this->jsonView->out($this->resp);
        }
        //获取复盘资源，设置用户信息
        $replayData = $this->commonService->setResourceUrlCache(array($replayData))[0];
        $replayData = $this->commonService->setUserCache(array($replayData))[0];
        $replayInfo = array();
        $replayInfo['replayNo'] = $this->common->encodeNo($replayData['userId'], $replayData['replayId']);
        $replayInfo['title'] = $replayData['title'];
        $replayInfo['content'] = $replayData['content'];
        $replayInfo['upCount'] = $replayData['upCount'];
        $replayInfo['downCount'] = $replayData['downCount'];
        $replayInfo['shareCount'] = $replayData['shareCount'];
        $replayInfo['readCount'] = $replayData['mockReadCount'];
        $replayInfo['remark'] = !empty($replayData['remark']) ? $replayData['remark'] : '';
        $replayInfo['createTime'] = $replayData['createTime'];
        $replayInfo['resourceList'] = is_array($replayData['resourceList']) ? $replayData['resourceList'] : array();
        $replayInfo['user'] = $replayData['user'];
        //增加复盘阅读量
        $replayId = (int)$replayData['replayId'];
        $this->replayService->updateReplayReadCount($replayId);
        $this->resp->data = $replayInfo;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //复盘点赞
    public function replayUpCount() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $replayNo = trim($this->common->getParam("replayNo", ''));
        if (empty($replayNo)) {
            $this->resp->msg = "replayNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $replayNoArr = $this->common->decodeNo($replayNo);
        $userId = (int)$replayNoArr['userId'];
        $replayId = (int)$replayNoArr['id'];
        if (empty($replayNoArr) || $userId <= 0 || $replayId <= 0) {
            $this->resp->msg = 'replayNo参数有误';
            $this->jsonView->out($this->resp);
        }
        $updateReplayUpCountResp = $this->replayService->updateReplayUpCount($replayId);
        if ($updateReplayUpCountResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //复盘鄙视
    public function replayDownCount() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $replayNo = trim($this->common->getParam("replayNo", ''));
        if (empty($replayNo)) {
            $this->resp->msg = "replayNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $replayNoArr = $this->common->decodeNo($replayNo);
        $userId = (int)$replayNoArr['userId'];
        $replayId = (int)$replayNoArr['id'];
        if (empty($replayNoArr) || $userId <= 0 || $replayId <= 0) {
            $this->resp->msg = 'replayNo参数有误';
            $this->jsonView->out($this->resp);
        }
        $updateReplayDownCountResp = $this->replayService->updateReplayDownCount($replayId);
        if ($updateReplayDownCountResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //复盘分享
    public function replayShareCount() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $replayNo = trim($this->common->getParam("replayNo", ''));
        if (empty($replayNo)) {
            $this->resp->msg = "replayNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $replayNoArr = $this->common->decodeNo($replayNo);
        $userId = (int)$replayNoArr['userId'];
        $replayId = (int)$replayNoArr['id'];
        if (empty($replayNoArr) || $userId <= 0 || $replayId <= 0) {
            $this->resp->msg = 'replayNo参数有误';
            $this->jsonView->out($this->resp);
        }
        $updateReplayShareCountResp = $this->replayService->updateReplayShareCount($replayId);
        if ($updateReplayShareCountResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}