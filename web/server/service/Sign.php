<?php
namespace service;
class Sign extends Base {
    private $common;
    private $dao;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->dao = requireDao("Sign");
    }

    //插入关注信息
    public function insertSign($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $userId = (int)$param['userId'];
        $signDate = trim($param['signDate']);
        if ($userId <= 0 || empty($signDate)) {
            $resp->msg = "用户Id和签到日期不能为空";
            return $resp;
        }
        $insertSignResp = $this->dao->insertSign($param);
        if ($insertSignResp->errCode != 0) {
            $resp->msg = $insertSignResp->msg;
            return $resp;
        }
        $resp->data = $insertSignResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    //查询关注信息
    public function selectSign($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectSignResp = $this->dao->selectSign($param);
        if ($selectSignResp->errCode != 0) {
            $resp->msg = $selectSignResp->msg;
            return $resp;
        }
        $resp->data = $selectSignResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}