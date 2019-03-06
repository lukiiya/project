<?php
namespace service;
class Replay extends Base {
    private $common;
    private $dao;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->dao = requireDao("Replay");
    }

    public function insertReplay($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $userId = (int)$param['userId'];
        if ($userId <= 0) {
            $resp->msg = "userId不能为空";
            return $resp;
        }
        $insertReplayResp = $this->dao->insertReplay($param);
        if ($insertReplayResp->errCode != 0) {
            $resp->msg = $insertReplayResp->msg;
            return $resp;
        }
        $resp->data = $insertReplayResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectReplay($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectReplayResp = $this->dao->selectReplay($param);
        if ($selectReplayResp->errCode != 0) {
            $resp->msg = $selectReplayResp->msg;
            return $resp;
        }
        $resp->data = $selectReplayResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectReplayById($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId有误';
            return $resp;
        }
        $selectReplayByIdResp = $this->dao->selectReplayById($replayId);
        if ($selectReplayByIdResp->errCode != 0) {
            $resp->msg = $selectReplayByIdResp->msg;
            return $resp;
        }
        $resp->data = $selectReplayByIdResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateReplayUpCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $updateReplayUpCountResp = $this->dao->updateReplayUpCount($replayId);
        if ($updateReplayUpCountResp->errCode != 0) {
            $resp->msg = $updateReplayUpCountResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateReplayDownCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $updateReplayDownCountResp = $this->dao->updateReplayDownCount($replayId);
        if ($updateReplayDownCountResp->errCode != 0) {
            $resp->msg = $updateReplayDownCountResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateReplayShareCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replay不能为空';
            return $resp;
        }
        $updateReplayShareCountResp = $this->dao->updateReplayShareCount($replayId);
        if ($updateReplayShareCountResp->errCode != 0) {
            $resp->msg = $updateReplayShareCountResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //--增加阅读量
    public function updateReplayReadCount($replayId) {
        $resp = requireModule('Resp');
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = 'replayId不能为空';
            return $resp;
        }
        $updateReplayReadCountResp = $this->dao->updateReplayReadCount($replayId);
        if ($updateReplayReadCountResp->errCode != 0) {
            $resp->msg = $updateReplayReadCountResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateReplay($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $replayId = (int)$param['replayId'];
        if ($replayId <= 0) {
            $resp->msg = "replayId不能为空";
            return $resp;
        }
        $updateReplayResp = $this->dao->updateReplay($param);
        if ($updateReplayResp->errCode != 0) {
            $resp->msg = $updateReplayResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function deleteReplay($replayId) {
        $resp = requireModule("Resp");
        $replayId = (int)$replayId;
        if ($replayId <= 0) {
            $resp->msg = "replayId不能为空";
            return $resp;
        }
        $deleteReplayResp = $this->dao->deleteReplay($replayId);
        if ($deleteReplayResp->errCode != 0) {
            $resp->msg = $deleteReplayResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}