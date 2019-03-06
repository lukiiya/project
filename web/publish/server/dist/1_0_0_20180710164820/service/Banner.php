<?php
namespace service;
class Banner extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Banner");
	}

	public function selectBanner($param) {
		$resp = requireModule('Resp');
		$selectBannerResp = $this->dao->selectBanner($param);
		if ($selectBannerResp->errCode != 0) {
			$resp->msg = $selectBannerResp->msg;
			return $resp;
		}
		$resp->data = $selectBannerResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectBannerById($bannerId) {
        $resp = requireModule('Resp');
        $bannerId = (int)$bannerId;
        if ($bannerId <= 0) {
            $resp->msg = 'banner有误';
            return $resp;
        }
        $selectBannerByIdResp = $this->dao->selectBannerById($bannerId);
        if ($selectBannerByIdResp->errCode != 0) {
            $resp->msg = $selectBannerByIdResp->msg;
            return $resp;
        }
        $resp->data = $selectBannerByIdResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function updateBanner($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $bannerId = (int)$param['bannerId'];
        if ($bannerId <= 0) {
            $resp->msg = "bannerId不能为空";
            return $resp;
        }
        $updateBannerResp = $this->dao->updateBanner($param);
        if ($updateBannerResp->errCode != 0) {
            $resp->msg = $updateBannerResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function deleteBanner($bannerId) {
        $resp = requireModule("Resp");
        $bannerId = (int)$bannerId;
        if ($bannerId <= 0) {
            $resp->msg = "bannerId不能为空";
            return $resp;
        }
        $deleteBannerResp = $this->dao->deleteBanner($bannerId);
        if ($deleteBannerResp->errCode != 0) {
            $resp->msg = $deleteBannerResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}