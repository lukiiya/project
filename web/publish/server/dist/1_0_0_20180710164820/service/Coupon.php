<?php
namespace service;
class Coupon extends Base {
    private $common;
    private $dao;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->dao = requireDao("Coupon");
    }

    public function insertCoupon($param) {
        $resp = requireModule("Resp");
        $insertCouponResp = $this->dao->insertCoupon($param);
        if ($insertCouponResp->errCode != 0) {
            $resp->msg = $insertCouponResp->msg;
            return $resp;
        }
        $resp->data = $insertCouponResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateCoupon($param) {
        $resp = requireModule("Resp");
        $couponId = trim($param['couponId']);
        if ($couponId == '') {
            $resp->msg = "couponId不能为空";
            return $resp;
        }
        $updateCouponResp = $this->dao->updateCoupon($param);
        if ($updateCouponResp->errCode != 0) {
            $resp->msg = $updateCouponResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectCoupon($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectCouponResp = $this->dao->selectCoupon($param);
        if ($selectCouponResp->errCode != 0) {
            $resp->msg = $selectCouponResp->msg;
            return $resp;
        }
        $resp->data = $selectCouponResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectCouponById($couponId) {
        $resp = requireModule('Resp');
        $couponId = (int)$couponId;
        if ($couponId <= 0) {
            $resp->msg = 'couponId不能为空';
            return $resp;
        }
        $selectCouponByIdResp = $this->dao->selectCouponById($couponId);
        if ($selectCouponByIdResp->errCode != 0) {
            $resp->msg = $selectCouponByIdResp->msg;
            return $resp;
        }
        $resp->data = $selectCouponByIdResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function insertUserCoupon($param) {
        $resp = requireModule("Resp");
        $insertUserCouponResp = $this->dao->insertUserCoupon($param);
        if ($insertUserCouponResp->errCode != 0) {
            $resp->msg = $insertUserCouponResp->msg;
            return $resp;
        }
        $resp->data = $insertUserCouponResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateUserCoupon($param) {
        $resp = requireModule("Resp");
        $userCouponId = trim($param['userCouponId']);
        if ($userCouponId == '') {
            $resp->msg = "userCouponId不能为空";
            return $resp;
        }
        $updateUserCouponResp = $this->dao->updateUserCoupon($param);
        if ($updateUserCouponResp->errCode != 0) {
            $resp->msg = $updateUserCouponResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectUserCoupon($param) {
        $resp = requireModule('Resp');
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $selectUserCouponResp = $this->dao->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $resp->msg = $selectUserCouponResp->msg;
            return $resp;
        }
        $resp->data = $selectUserCouponResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectUserCouponById($userCouponId) {
        $resp = requireModule('Resp');
        $userCouponId = (int)$userCouponId;
        if ($userCouponId <= 0) {
            $resp->msg = 'userCouponId不能为空';
            return $resp;
        }
        $selectUserCouponByIdResp = $this->dao->selectUserCouponById($userCouponId);
        if ($selectUserCouponByIdResp->errCode != 0) {
            $resp->msg = $selectUserCouponByIdResp->msg;
            return $resp;
        }
        $resp->data = $selectUserCouponByIdResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}