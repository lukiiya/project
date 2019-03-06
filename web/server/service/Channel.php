<?php
namespace service;
class Channel extends Base {
    private $common;
    private $dao;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->dao = requireDao("Channel");
    }

    public function insertChannel($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $userId = (int)$param['userId'];
        if ($userId <= 0) {
            $resp->msg = "userId错误";
            return $resp;
        }
        $insertChannelResp = $this->dao->insertChannel($param);
        if ($insertChannelResp->errCode != 0) {
            $resp->msg = $insertChannelResp->msg;
            return $resp;
        }
        $resp->data = $insertChannelResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateChannel($param) {
        $resp = requireModule("Resp");
        $channel = (int)$param['channel'];
        if (empty($channel)) {
            $resp->msg = "channel不能为空";
            return $resp;
        }
        $updateChannelResp = $this->dao->updateChannel($param);
        if ($updateChannelResp->errCode != 0) {
            $resp->msg = $updateChannelResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectChannel($param) {
        $resp = requireModule('Resp');
        $selectChannelResp = $this->dao->selectChannel($param);
        if ($selectChannelResp->errCode != 0) {
            $resp->msg = $selectChannelResp->msg;
            return $resp;
        }
        $resp->data = $selectChannelResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}