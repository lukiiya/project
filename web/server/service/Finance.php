<?php
namespace service;
class Finance extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Finance");
	}

	public function insertFinance($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$insertFinanceResp = $this->dao->insertFinance($param);
		if ($insertFinanceResp->errCode != 0) {
			$resp->msg = $insertFinanceResp->msg;
			return $resp;
		}
		$resp->data = $insertFinanceResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateFinance($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$financeId = (int)$param['financeId'];
		if ($financeId <= 0) {
			$resp->msg = "financeId不能为空";
			return $resp;
		}
		$updateFinanceResp = $this->dao->updateFinance($param);
		if ($updateFinanceResp->errCode != 0) {
			$resp->msg = $updateFinanceResp->msg;
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceByUserId($financeType, $userId) {
		$resp = requireModule('Resp');
		$financeType = (int)$financeType;
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		$selectFinanceByUserIdResp = $this->dao->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$resp->msg = $selectFinanceByUserIdResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceByUserIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectFinanceExtraByUserId($financeType, $userId) {
        $resp = requireModule('Resp');
        $financeType = (int)$financeType;
        $userId = (int)$userId;
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        $selectFinanceExtraByUserIdResp = $this->dao->selectFinanceExtraByUserId($financeType, $userId);
        if ($selectFinanceExtraByUserIdResp->errCode != 0) {
            $resp->msg = $selectFinanceExtraByUserIdResp->msg;
            return $resp;
        }
        $resp->data = $selectFinanceExtraByUserIdResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

	public function selectFinance($param) {
		$resp = requireModule('Resp');
		$selectFinanceResp = $this->dao->selectFinance($param);
		if ($selectFinanceResp->errCode != 0) {
			$resp->msg = $selectFinanceResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
	
	public function selectFinanceExtra($param) {
		$resp = requireModule('Resp');
		$selectFinanceExtraResp = $this->dao->selectFinanceExtra($param);
		if ($selectFinanceExtraResp->errCode != 0) {
			$resp->msg = $selectFinanceExtraResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceExtraResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceRecordById($recordId) {
		$resp = requireModule('Resp');
		$recordId = (int)$recordId;
		if ($recordId <= 0) {
			$resp->msg = 'recordId有误';
			return $resp;
		}
		$selectFinanceRecordByIdResp = $this->dao->selectFinanceRecordById($recordId);
		if ($selectFinanceRecordByIdResp->errCode != 0) {
			$resp->msg = $selectFinanceRecordByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceRecordByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceRecord($param) {
		$resp = requireModule('Resp');
		$selectFinanceRecordResp = $this->dao->selectFinanceRecord($param);
		if ($selectFinanceRecordResp->errCode != 0) {
			$resp->msg = $selectFinanceRecordResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceRecordResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceWithdrawById($withdrawId) {
		$resp = requireModule('Resp');
		$withdrawId = (int)$withdrawId;
		if ($withdrawId <= 0) {
			$resp->msg = 'withdrawId有误';
			return $resp;
		}
		$selectFinanceWithdrawByIdResp = $this->dao->selectFinanceWithdrawById($withdrawId);
		if ($selectFinanceWithdrawByIdResp->errCode != 0) {
			$resp->msg = $selectFinanceWithdrawByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceWithdrawByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceWithdraw($param) {
		$resp = requireModule('Resp');
		$selectFinanceWithdrawResp = $this->dao->selectFinanceWithdraw($param);
		if ($selectFinanceWithdrawResp->errCode != 0) {
			$resp->msg = $selectFinanceWithdrawResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceWithdrawResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceConsume($param) {
		$resp = requireModule('Resp');
		$selectFinanceConsumeResp = $this->dao->selectFinanceConsume($param);
		if ($selectFinanceConsumeResp->errCode != 0) {
			$resp->msg = $selectFinanceConsumeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceConsumeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceIncome($param) {
		$resp = requireModule('Resp');
		$selectFinanceIncomeResp = $this->dao->selectFinanceIncome($param);
		if ($selectFinanceIncomeResp->errCode != 0) {
			$resp->msg = $selectFinanceIncomeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceIncomeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceCharge($param) {
		$resp = requireModule('Resp');
		$selectFinanceChargeResp = $this->dao->selectFinanceCharge($param);
		if ($selectFinanceChargeResp->errCode != 0) {
			$resp->msg = $selectFinanceChargeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceChargeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceFreeze($param) {
		$resp = requireModule('Resp');
		$selectFinanceFreezeResp = $this->dao->selectFinanceFreeze($param);
		if ($selectFinanceFreezeResp->errCode != 0) {
			$resp->msg = $selectFinanceFreezeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceFreezeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceTrade($param) {
		$resp = requireModule('Resp');
		$selectFinanceTradeResp = $this->dao->selectFinanceTrade($param);
		if ($selectFinanceTradeResp->errCode != 0) {
			$resp->msg = $selectFinanceTradeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceTradeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceTransfer($param) {
		$resp = requireModule('Resp');
		$selectFinanceTransferResp = $this->dao->selectFinanceTransfer($param);
		if ($selectFinanceTransferResp->errCode != 0) {
			$resp->msg = $selectFinanceTransferResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceTransferResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceIncomeByGroup($param) {
		$resp = requireModule('Resp');
		$selectFinanceIncomeByGroupResp = $this->dao->selectFinanceIncomeByGroup($param);
		if ($selectFinanceIncomeByGroupResp->errCode != 0) {
			$resp->msg = $selectFinanceIncomeByGroupResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceIncomeByGroupResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceConsumeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$selectFinanceConsumeByUserGroupTypeResp = $this->dao->selectFinanceConsumeByUserGroupType($param);
		if ($selectFinanceConsumeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = $selectFinanceConsumeByUserGroupTypeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceConsumeByUserGroupTypeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceIncomeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$selectFinanceIncomeByUserGroupTypeResp = $this->dao->selectFinanceIncomeByUserGroupType($param);
		if ($selectFinanceIncomeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = $selectFinanceIncomeByUserGroupTypeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceIncomeByUserGroupTypeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceWithdrawByUserGroupStatus($param) {
		$resp = requireModule('Resp');
		$selectFinanceWithdrawByUserGroupStatusResp = $this->dao->selectFinanceWithdrawByUserGroupStatus($param);
		if ($selectFinanceWithdrawByUserGroupStatusResp->errCode != 0) {
			$resp->msg = $selectFinanceWithdrawByUserGroupStatusResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceWithdrawByUserGroupStatusResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceChargeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$selectFinanceChargeByUserGroupTypeResp = $this->dao->selectFinanceChargeByUserGroupType($param);
		if ($selectFinanceChargeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = $selectFinanceChargeByUserGroupTypeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceChargeByUserGroupTypeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectFinanceFreezeByUserGroupType($param) {
		$resp = requireModule('Resp');
		$selectFinanceFreezeByUserGroupTypeResp = $this->dao->selectFinanceFreezeByUserGroupType($param);
		if ($selectFinanceFreezeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = $selectFinanceFreezeByUserGroupTypeResp->msg;
			return $resp;
		}
		$resp->data = $selectFinanceFreezeByUserGroupTypeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function updateFinanceSqlExtra($database, $param) {
        $resp = requireModule("Resp");
		if (empty($database)) {
			$resp->msg = 'database有误';
			return $resp;
		}
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $financeId = (int)$param['financeId'];
        if ($financeId <= 0) {
            $resp->msg = "financeId不能为空";
            return $resp;
        }
        $updateFinanceSqlExtraResp = $this->dao->updateFinanceSqlExtra($database, $param);
        if ($updateFinanceSqlExtraResp->errCode != 0) {
            $resp->msg = $updateFinanceSqlExtraResp->msg;
            return $resp;
        }
        $resp->data = $updateFinanceSqlExtraResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}