<?php
namespace service;
class Activity extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Activity");
	}

	public function selectActivityById($activityId) {
		$resp = requireModule('Resp');
		$activityId = (int)$activityId;
		if ($activityId <= 0) {
			$resp->msg = 'activityId有误';
			return $resp;
		}
		$selectActivityByIdResp = $this->dao->selectActivityById($activityId);
		if ($selectActivityByIdResp->errCode != 0) {
			$resp->msg = $selectActivityByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectActivityByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectActivityByNo($activityNo) {
		$resp = requireModule('Resp');
		$activityNo = trim($activityNo);
		if (empty($activityNo)) {
			$resp->msg = 'activityNo有误';
			return $resp;
		}
		$activityNoArr = $this->common->decodeNo($activityNo);
		$activityNoUserId = (int)$activityNoArr['userId'];
		$activityNoId = (int)$activityNoArr['id'];
		if (empty($activityNoArr) || $activityNoUserId <= 0 || $activityNoId <= 0 || $activityNoUserId-12345678 != $activityNoId) {
			$resp->msg = 'activityNo参数有误';
			return $resp;
		}
		$selectActivityByIdResp = $this->dao->selectActivityById($activityNoId);
		if ($selectActivityByIdResp->errCode != 0) {
			$resp->msg = $selectActivityByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectActivity($param) {
		$resp = requireModule('Resp');
		$selectActivityResp = $this->dao->selectActivity($param);
		if ($selectActivityResp->errCode != 0) {
			$resp->msg = $selectActivityResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectActivityHongBao($param) {
		$resp = requireModule('Resp');
		$selectActivityHongBaoResp = $this->dao->selectActivityHongBao($param);
		if ($selectActivityHongBaoResp->errCode != 0) {
			$resp->msg = $selectActivityHongBaoResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityHongBaoResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectActivityHongBao2017ChunJie($param) {
        $resp = requireModule('Resp');
        $selectActivityHongBao2017ChunJieResp = $this->dao->selectActivityHongBao2017ChunJie($param);
        if ($selectActivityHongBao2017ChunJieResp->errCode != 0) {
            $resp->msg = $selectActivityHongBao2017ChunJieResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityHongBao2017ChunJieResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectActivityHongBao2018ChunJie($param) {
        $resp = requireModule('Resp');
        $selectActivityHongBao2018ChunJieResp = $this->dao->selectActivityHongBao2018ChunJie($param);
        if ($selectActivityHongBao2018ChunJieResp->errCode != 0) {
            $resp->msg = $selectActivityHongBao2018ChunJieResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityHongBao2018ChunJieResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectActivityTurnplate($param) {
        $resp = requireModule('Resp');
        $selectActivityTurnplateResp = $this->dao->selectActivityTurnplate($param);
        if ($selectActivityTurnplateResp->errCode != 0) {
            $resp->msg = $selectActivityTurnplateResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityTurnplateResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
		return $resp;

    }

    public function selectActivityCharge($param) {
        $resp = requireModule('Resp');
        $selectActivityChargeResp = $this->dao->selectActivityCharge($param);
        if ($selectActivityChargeResp->errCode != 0) {
            $resp->msg = $selectActivityChargeResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityChargeResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;

    }

	public function selectActivityConfederationsCupUser($param) {
		$resp = requireModule('Resp');
		$selectActivityConfederationsCupUserResp = $this->dao->selectActivityConfederationsCupUser($param);
		if ($selectActivityConfederationsCupUserResp->errCode != 0) {
			$resp->msg = $selectActivityConfederationsCupUserResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityConfederationsCupUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectActivityConfederationsCup($param) {
		$resp = requireModule('Resp');
		$selectActivityConfederationsCupResp = $this->dao->selectActivityConfederationsCup($param);
		if ($selectActivityConfederationsCupResp->errCode != 0) {
			$resp->msg = $selectActivityConfederationsCupResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityConfederationsCupResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectActivityConfederationsCupStatistics() {
        $resp = requireModule('Resp');
        $selectActivityConfederationsCupStatisticsResp = $this->dao->selectActivityConfederationsCupStatistics();
        if ($selectActivityConfederationsCupStatisticsResp->errCode != 0) {
            $resp->msg = $selectActivityConfederationsCupStatisticsResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityConfederationsCupStatisticsResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	public function selectActivityAttachPrize($param) {
		$resp = requireModule('Resp');
		$selectActivityAttachPrizeResp = $this->dao->selectActivityAttachPrize($param);
		if ($selectActivityAttachPrizeResp->errCode != 0) {
			$resp->msg = $selectActivityAttachPrizeResp->msg;
			return $resp;
		}
		$resp->data = $selectActivityAttachPrizeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectActivityHongBaoDaily($param) {
        $resp = requireModule('Resp');
        $selectActivityHongBaoDailyResp = $this->dao->selectActivityHongBaoDaily($param);
        if ($selectActivityHongBaoDailyResp->errCode != 0) {
            $resp->msg = $selectActivityHongBaoDailyResp->msg;
            return $resp;
        }
        $resp->data = $selectActivityHongBaoDailyResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}