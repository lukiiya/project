<?php
namespace controller\admin;
use controller\Base;

class Finance extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $financeService;
	private $userService;
	public $loginUserInfo;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->financeService = requireService("Finance");
		$this->userService = requireService("User");
	}

	//得到流水列表
	public function recordList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$financeType = $this->common->getParam("financeType", null);
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$channel = (int)$this->common->getParam("channel", 0);
		$orderId = (int)$this->common->getParam("orderId", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['channel'] = $channel;
		$param['orderId'] = $orderId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceRecordResp = $this->financeService->selectFinanceRecord($param);
		if ($selectFinanceRecordResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceRecordResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->recordTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function recordTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金账户</th><th width="160">昵称</th><th width="110">姓名</th><th width="100">类型</th><th width="110">金额</th><th width="110">订单ID</th><th width="180">时间</th></tr>';
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('1' => '消费', '2' => '收益', '3' => '提款', '4' => '充值');
		foreach ($list as $record) {
			$type = (int)$record['type'];
			$financeType = (int)$record['financeType'];
			$nickName = trim($record['nickName']);
			$realName = trim($record['realName']);
			$orderId = (int)$record['orderId'];
			$amount = (int)$record['amount'];
			$createTime = trim($record['createTime']);
			$table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.$typeMap[$type].'</td><td>'.($amount/100).'</td><td>'.$orderId.'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td></tr></table>';
		return $table;
	}

	//得到消费列表
	public function consumeList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$financeType = $this->common->getParam("financeType", null);
		$userId = (int)$this->common->getParam("userId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$orderId = (int)$this->common->getParam("orderId", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
		$pageNum = (int)$this->common->getParam("pageNum", 0);
		$pageSize = (int)$this->common->getParam("pageSize", 0);
		if ($pageNum <= 0) {
			$pageNum = 1;
		}
		if ($pageSize <= 0) {
			$pageSize = 10;
		}
		if ($pageSize > 2000) {
			$pageSize = 2000;
		}
		$param = array();
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userId'] = $userId;
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['orderId'] = $orderId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceConsumeResp = $this->financeService->selectFinanceConsume($param);
		if ($selectFinanceConsumeResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceConsumeResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->consumeTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function consumeTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金账户</th><th width="160">昵称</th><th width="110">姓名</th><th width="100">类型</th><th width="110">金额</th><th width="110">订单ID</th><th width="180">时间</th></tr>';
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('1' => '现金消费', '2' => '充值消费', '3' => '收益消费');
		foreach ($list as $consume) {
			$type = (int)$consume['type'];
			$financeType = (int)$consume['financeType'];
			$nickName = trim($consume['nickName']);
			$realName = trim($consume['realName']);
			$orderId = (int)$consume['orderId'];
			$amount = (int)$consume['amount'];
			$createTime = trim($consume['createTime']);
			$table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.$typeMap[$type].'</td><td>'.($amount/100).'</td><td>'.$orderId.'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td></tr></table>';
		return $table;
	}

	//得到收益列表
	public function incomeList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$financeType = $this->common->getParam("financeType", null);
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$orderId = (int)$this->common->getParam("orderId", 0);
		$planId = (int)$this->common->getParam("planId", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['orderId'] = $orderId;
		$param['planId'] = $planId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceIncomeResp = $this->financeService->selectFinanceIncome($param);
		if ($selectFinanceIncomeResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceIncomeResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->incomeTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function incomeTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金账户</th><th width="160">昵称</th><th width="110">姓名</th><th width="100">类型</th><th width="110">金额</th><th width="110">订单ID</th><th width="110">方案ID</th><th width="180">时间</th></tr>';
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('0' => array('1' => '推荐收益', '2' => '推广收益'), '1' => array('1' => '中奖收益'));
		foreach ($list as $income) {
			$type = (int)$income['type'];
			$financeType = (int)$income['financeType'];
			$nickName = trim($income['nickName']);
			$realName = trim($income['realName']);
			$orderId = (int)$income['orderId'];
			$planId = (int)$income['planId'];
			$amount = (int)$income['amount'];
			$createTime = trim($income['createTime']);
			$table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.$typeMap[$financeType][$type].'</td><td>'.($amount/100).'</td><td>'.$orderId.'</td><td>'.$planId.'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td><td></td></tr></table>';
		return $table;
	}

	//得到提款列表
	public function withdrawList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$financeType = $this->common->getParam("financeType", null);
		$userName = trim($this->common->getParam("userName", ''));
		$status = (int)$this->common->getParam("status", 0);
		$accountType = (int)$this->common->getParam("accountType", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userName'] = $userName;
		$param['status'] = $status;
		$param['accountType'] = $accountType;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceWithdrawResp = $this->financeService->selectFinanceWithdraw($param);
		if ($selectFinanceWithdrawResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceWithdrawResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->withdrawTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function withdrawTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金账户</th><th width="160">昵称</th><th width="110">姓名</th><th width="110">金额</th><th width="110">状态</th><th width="110">帐号类型</th><th width="200">帐号</th><th width="110">帐号名称</th><th width="180">时间</th></tr>';
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$statusMap = array('1' => '未审核', '2' => '已审核', '3' => '已打款', '4' => '已拒绝');
		$accountTypeMap = array('1' => '微信', '2' => '支付宝', '3' => '银行卡');
		foreach ($list as $withdraw) {
			$type = (int)$withdraw['type'];
			$financeType = (int)$withdraw['financeType'];
			$nickName = trim($withdraw['nickName']);
			$realName = trim($withdraw['realName']);
			$status = (int)$withdraw['status'];
			$accountType = (int)$withdraw['accountType'];
			$accountNumber = trim($withdraw['accountNumber']);
			$accountName = trim($withdraw['accountName']);
			$amount = (int)$withdraw['amount'];
			$createTime = trim($withdraw['createTime']);
			$table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.($amount/100).'</td><td>'.$statusMap[$status].'</td><td>'.$accountTypeMap[$accountType].'</td><td>'.$accountNumber.'</td><td>'.$accountName.'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td><td></td><td></td><td></td></tr></table>';
		return $table;
	}

	//得到充值列表
	public function chargeList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$financeType = $this->common->getParam("financeType", null);
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$orderId = (int)$this->common->getParam("orderId", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['orderId'] = $orderId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceChargeResp = $this->financeService->selectFinanceCharge($param);
		if ($selectFinanceChargeResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceChargeResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->chargeTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function chargeTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金账户</th><th width="160">昵称</th><th width="110">姓名</th><th width="100">类型</th><th width="110">金额</th><th width="110">订单ID</th><th width="200">备注</th><th width="180">时间</th></tr>';
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('1' => '用户充值', '2' => '平台充值');
		foreach ($list as $charge) {
			$type = (int)$charge['type'];
			$financeType = (int)$charge['financeType'];
			$nickName = trim($charge['nickName']);
			$realName = trim($charge['realName']);
			$orderId = (int)$charge['orderId'];
			$amount = (int)$charge['amount'];
			$remark = trim($charge['remark']);
			$createTime = trim($charge['createTime']);
			$table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.$typeMap[$type].'</td><td>'.($amount/100).'</td><td>'.$orderId.'</td><td>'.$remark.'</td><td>'.$createTime.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td><td></td></tr></table>';
		return $table;
	}

	//得到交易列表
	public function tradeList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$tradeType = $this->common->getParam("tradeType", null);
		$tradeNo = trim($this->common->getParam("tradeNo", ''));
		$financeType = $this->common->getParam("financeType", null);
		$userName = trim($this->common->getParam("userName", ''));
		$type = (int)$this->common->getParam("type", 0);
		$orderId = (int)$this->common->getParam("orderId", 0);
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
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
		if ($tradeType !== null) {
			$param['tradeType'] = $tradeType;
		}
		$param['tradeNo'] = $tradeNo;
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		$param['userName'] = $userName;
		$param['type'] = $type;
		$param['orderId'] = $orderId;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceTradeResp = $this->financeService->selectFinanceTrade($param);
		if ($selectFinanceTradeResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceTradeResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->tradeTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function tradeTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">平台</th><th width="160">平台流水号</th><th width="140">交易时间</th><th width="80">资金账户</th><th width="100">类型</th><th width="100">订单ID</th><th width="100">金额</th><th width="160">昵称</th><th width="110">姓名</th></tr>';
		$tradeTypeMap = array('0' => '爱贝', '1' => '支付宝', '2' => '威富通');
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('1' => '消费', '2' => '充值');
		foreach ($list as $trade) {
			$tradeType = (int)$trade['tradeType'];
			$tradeNo = trim($trade['tradeNo']);
			$tradeTime = trim($trade['tradeTime']);
			$nickName = trim($trade['nickName']);
			$realName = trim($trade['realName']);
			$orderId = (int)$trade['orderId'];
			$amount = (int)$trade['amount'];
			$type = (int)$trade['type'];
			$financeType = (int)$trade['financeType'];
			$createTime = trim($trade['createTime']);
			$table .= '<tr><td>'.$tradeTypeMap[$tradeType].'</td><td>'.$tradeNo.'</td><td>'.($tradeTime!='0000-00-00 00:00:00'?$tradeTime:$createTime).'</td><td>'.$financeTypeMap[$financeType].'</td><td>'.$typeMap[$type].'</td><td>'.$orderId.'</td><td>'.($amount/100).'</td><td>'.$nickName.'</td><td>'.$realName.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td></tr></table>';
		return $table;
	}

	public function transferList() {
		$exportReport = (bool)$this->common->getParam("exportReport", false);
		$withdrawId = (int)$this->common->getParam("withdrawId", 0);
		$userName = trim($this->common->getParam("userName", ''));
		$batchNo = trim($this->common->getParam("batchNo", ''));
		$transferNo = trim($this->common->getParam("transferNo", ''));
		$beginTime = trim($this->common->getParam("beginTime", ''));
		$endTime = trim($this->common->getParam("endTime", ''));
		$status = $this->common->getParam("status", null);
		$financeType = $this->common->getParam("financeType", null);
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
		$param['withdrawId'] = $withdrawId;
		$param['userName'] = $userName;
		$param['batchNo'] = $batchNo;
		$param['transferNo'] = $transferNo;
		$param['beginTime'] = $beginTime;
		$param['endTime'] = $endTime;
		if ($status !== null) {
			$param['status'] = $status;
		}
		if ($financeType !== null) {
			$param['financeType'] = $financeType;
		}
		if (!$exportReport) {
			$param['pageNum'] = $pageNum;
			$param['pageSize'] = $pageSize;
		}
		$param['needCount'] = true;
		$selectFinanceTransferResp = $this->financeService->selectFinanceTransfer($param);
		if ($selectFinanceTransferResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$data = $selectFinanceTransferResp->data;
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		if ($exportReport) {
			$excelView = requireView("Excel");
			$excelView->out($this->transferTable($data));
		} else {
			$this->jsonView->out($this->resp);
		}
	}

	private function transferTable($data) {
		$list = (array)$data['list'];
		$totalAmount = (int)$data['totalAmount'];
		$table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">平台</th><th width="160">平台流水号</th><th width="140">交易时间</th><th width="80">资金账户</th><th width="100">类型</th><th width="100">订单ID</th><th width="100">金额</th><th width="160">昵称</th><th width="110">姓名</th></tr>';
		$tradeTypeMap = array('0' => '爱贝', '1' => '支付宝', '2' => '威富通');
		$financeTypeMap = array('0' => '方案', '1' => '出票');
		$typeMap = array('1' => '消费', '2' => '充值');
		foreach ($list as $trade) {
			$tradeType = (int)$trade['tradeType'];
			$tradeNo = trim($trade['tradeNo']);
			$tradeTime = trim($trade['tradeTime']);
			$nickName = trim($trade['nickName']);
			$realName = trim($trade['realName']);
			$orderId = (int)$trade['orderId'];
			$amount = (int)$trade['amount'];
			$type = (int)$trade['type'];
			$financeType = (int)$trade['financeType'];
			$createTime = trim($trade['createTime']);
			$table .= '<tr><td>'.$tradeTypeMap[$tradeType].'</td><td>'.$tradeNo.'</td><td>'.($tradeTime!='0000-00-00 00:00:00'?$tradeTime:$createTime).'</td><td>'.$financeTypeMap[$financeType].'</td><td>'.$typeMap[$type].'</td><td>'.$orderId.'</td><td>'.($amount/100).'</td><td>'.$nickName.'</td><td>'.$realName.'</td></tr>';
		}
		$table .= '<tr><td>总计</td><td></td><td></td><td></td><td></td><td></td><td>'.($totalAmount/100).'</td><td></td><td></td></tr></table>';
		return $table;
	}

	public function verifyWithdraw() {
		$withdrawId = (int)$this->common->getParam("withdrawId", 0);
		$status = (int)$this->common->getParam("status", 0);
		if ($withdrawId <= 0) {
			$this->resp->msg = "withdrawId参数有误";
			$this->jsonView->out($this->resp);
		}
		if ($status <= 0 || $status == 1) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
		$selectFinanceWithdrawByIdResp = $this->financeService->selectFinanceWithdrawById($withdrawId);
		if ($selectFinanceWithdrawByIdResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$financeWithdraw = $selectFinanceWithdrawByIdResp->data;
		if (empty($financeWithdraw)) {
			$this->resp->msg = "提款记录不存在";
			$this->jsonView->out($this->resp);
		}
		$financeType = (int)$financeWithdraw['financeType'];//资金类型, 0=方案, 1=出票
		$accountType = (int)$financeWithdraw['accountType'];//帐号类型, 1=微信, 2=支付宝, 3=银行卡
		$accountName = trim($financeWithdraw['accountName']);
		$userId = (int)$financeWithdraw['userId'];
		$amount = (int)$financeWithdraw['amount'];
		if ($userId <= 0) {
			$this->resp->msg = "提款用户信息异常";
			$this->jsonView->out($this->resp);
		}
		if ($amount <= 0) {
			$this->resp->msg = "提款金额异常";
			$this->jsonView->out($this->resp);
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$this->resp->msg = "查询异常";
			$this->jsonView->out($this->resp);
		}
		$user = $selectUserByIdResp->data;
		if (empty($user)) {
			$this->resp->msg = "用户不存在";
			$this->jsonView->out($this->resp);
		}
		$nickName = trim($user['nickName']);
		$realName = trim($user['realName']);
		$phone = trim($user['phone']);
		//提款状态：1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
		if ((int)$financeWithdraw['status'] == 3 || (int)$financeWithdraw['status'] == 4) {
			$this->resp->msg = "该条提款已经被处理过";
			$this->jsonView->out($this->resp);
		}
		if ((int)$financeWithdraw['status'] == 5) {
			$this->resp->msg = "该条提款正在自动处理";
			$this->jsonView->out($this->resp);
		}
		if ($financeType == 1 && $accountType == 2 && !empty($accountName) && (int)$financeWithdraw['status'] == 2 && $status == 3) {
			$this->resp->msg = "彩金支付宝方式提款不需要手动操作";
			$this->jsonView->out($this->resp);
		}
		if ((int)$financeWithdraw['status'] == 1 && $status != 2 && $status != 4) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
		if ((int)$financeWithdraw['status'] == 2 && $status != 3 && $status != 4) {
			$this->resp->msg = "status参数有误";
			$this->jsonView->out($this->resp);
		}
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
			//1=未审核, 2=已审核, 3=已打款, 4=已拒绝
			if ($status == 2) {
				//更新提款
				$updateWithdrawSql = 'update t_finance_withdraw set status="'.$status.'" where withdrawId="' . $withdrawId . '" and status=1 limit 1 ';
				$updateWithdrawResult = $database->execute($updateWithdrawSql);
				$updateWithdrawAffectedRows = (int)$database->getAffectedRows();
				if (!$updateWithdrawResult || $updateWithdrawAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "更新提款异常";
					$this->jsonView->out($this->resp);
				}
                //未审核和已审核都属于withdrawingSumAmount待提款总额(未审核+已审核),所以审核的时候不需要改变
			} else if ($status == 3) {
				//更新提款
				$updateWithdrawSql = 'update t_finance_withdraw set status="'.$status.'" where withdrawId="' . $withdrawId . '" and status=2 limit 1 ';
				$updateWithdrawResult = $database->execute($updateWithdrawSql);
				$updateWithdrawAffectedRows = (int)$database->getAffectedRows();
				if (!$updateWithdrawResult || $updateWithdrawAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "更新提款异常";
					$this->jsonView->out($this->resp);
				}
				//提款流水插入
				$insertFinanceWithdrawRecordField = array();
				$insertFinanceWithdrawRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceWithdrawRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceWithdrawRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceWithdrawRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceWithdrawRecordField[] = 'type=3';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceWithdrawRecordField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceWithdrawRecordField[] = 'createTime=now()';
				$insertFinanceWithdrawRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceWithdrawRecordField);
				$insertFinanceWithdrawRecordResult = $database->execute($insertFinanceWithdrawRecordSql);
				$insertFinanceWithdrawRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceWithdrawRecordResult || $insertFinanceWithdrawRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "插入流水异常";
					$this->jsonView->out($this->resp);
				}
				//已打款时候，增加已打款，减去已经审核
				$updateFinanceSqlExtraParam['withdrawingChangeAmount'] = -$amount;//减去已审核（待提款总额）
				$updateFinanceSqlExtraParam['withdrewChangeAmount'] = $amount;//已打款
			} else  if ($status == 4) {
				//更新提款
				$updateWithdrawSql = 'update t_finance_withdraw set status="'.$status.'" where withdrawId="' . $withdrawId . '" and status in(1,2) limit 1 ';
				$updateWithdrawResult = $database->execute($updateWithdrawSql);
				$updateWithdrawAffectedRows = (int)$database->getAffectedRows();
				if (!$updateWithdrawResult || $updateWithdrawAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$this->resp->msg = "更新提款异常";
					$this->jsonView->out($this->resp);
				}
				$updateFinanceSqlExtraParam['withdrawingChangeAmount'] = -$amount;//减去未审核/已审核（待提款总额）
			}
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
			$this->commonService->setUserFinance($userId);
			if ($status == 3 && $this->common->verifyMobile($phone)) {
				$sms = requireModule("Sms");
				$templateId = "27150";
				$param = $amount/100;
				$sms->sendMessage($phone, $templateId, $param);
			}
			$this->resp->errCode = 0;
			$this->resp->msg = "成功";
			$this->jsonView->out($this->resp);
		} else {
			$this->resp->msg = '审核失败';
			$this->jsonView->out($this->resp);
		}
	}

    //资金流水列表
    public function financeList() {
        $exportReport = (bool)$this->common->getParam("exportReport", false);
        $financeType = $this->common->getParam("financeType", null);
        $userName = trim($this->common->getParam("userName", ''));
        $type = (int)$this->common->getParam("type", 0);
        $channel = (int)$this->common->getParam("channel", 0);
        $orderId = (int)$this->common->getParam("orderId", 0);
        $beginTime = trim($this->common->getParam("beginTime", ''));
        $endTime = trim($this->common->getParam("endTime", ''));
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
        if ($financeType !== null) {
            $param['financeType'] = $financeType;
        }
        $param['userName'] = $userName;
        $param['type'] = $type;
        $param['channel'] = $channel;
        $param['orderId'] = $orderId;
        $param['beginTime'] = $beginTime;
        $param['endTime'] = $endTime;
        if (!$exportReport) {
            $param['pageNum'] = $pageNum;
            $param['pageSize'] = $pageSize;
        } else {
            $param['exportReport'] = true;
        }
        $param['needCount'] = true;
        $selectFinanceRecordResp = $this->financeService->selectFinance($param);
        if ($selectFinanceRecordResp->errCode != 0) {
            $this->resp->msg = "查询异常";
            $this->jsonView->out($this->resp);
        }
        $data = $selectFinanceRecordResp->data;
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        if ($exportReport) {
            $excelView = requireView("Excel");
            $excelView->out($this->financeTable($data));
        } else {
            $this->jsonView->out($this->resp);
        }
    }

    private function financeTable($data) {
        $list = (array)$data['list'];
        $table = '<style type="text/css">td{border:0.5px solid #000;text-align:center;}</style><table style="border-collapse:collapse;table-layout:fixed"><tr bgcolor="#e3e3e3"><th width="80">资金明细</th><th width="160">用户id</th><th width="160">昵称</th><th width="110">姓名</th><th width="160">现金消费总额</th><th width="160">充值消费总额</th><th width="160">收益消费总额</th><th width="160">优惠券消费总额</th><th width="160">消费总额</th><th width="160">推荐收益总额</th><th width="160">推广收益总额</th><th width="160">中奖收益总额</th><th width="160">分成收益总额</th><th width="160">提成收益总额</th><th width="160">收益总额</th><th width="160">待提款总额</th><th width="160">已提款总额</th><th width="160">提款总额</th><th width="160">用户充值总额</th><th width="160">平台充值总额</th><th width="160">充值总额</th><th width="160">充值冻结总额</th><th width="160">收益冻结总额</th><th width="160">当前剩余充值</th><th width="160">当前剩余收益</th><th width="180">时间</th></tr>';
        $financeTypeMap = array('0' => '方案', '1' => '出票');
        foreach ($list as $finance) {
            $userId = (int)$finance['userId'];
            $financeType = (int)$finance['financeType'];
            $nickName = trim($finance['nickName']);
            $realName = trim($finance['realName']);
            $cashConsumeSumAmount = (int)$finance['cashConsumeSumAmount'];
            $chargeConsumeSumAmount = (int)$finance['chargeConsumeSumAmount'];
            $incomeConsumeSumAmount = (int)$finance['incomeConsumeSumAmount'];
            $couponConsumeSumAmount = (int)$finance['couponConsumeSumAmount'];
            $consumeSumAmount = (int)$finance['consumeSumAmount'];
            $recommendIncomeSumAmount = (int)$finance['recommendIncomeSumAmount'];
            $spreadIncomeSumAmount = (int)$finance['spreadIncomeSumAmount'];
            $prizeIncomeSumAmount = (int)$finance['prizeIncomeSumAmount'];
            $divideIncomeSumAmount = (int)$finance['divideIncomeSumAmount'];
            $commissionIncomeSumAmount = (int)$finance['commissionIncomeSumAmount'];
            $incomeSumAmount = (int)$finance['incomeSumAmount'];
            $withdrawingSumAmount = (int)$finance['withdrawingSumAmount'];
            $withdrewSumAmount = (int)$finance['withdrewSumAmount'];
            $withdrawSumAmount = (int)$finance['withdrawSumAmount'];
            $userChargeSumAmount = (int)$finance['userChargeSumAmount'];
            $platformChargeSumAmount = (int)$finance['platformChargeSumAmount'];
            $chargeSumAmount = (int)$finance['chargeSumAmount'];
            $chargeFreezeSumAmount = (int)$finance['chargeFreezeSumAmount'];
            $incomeFreezeSumAmount = (int)$finance['incomeFreezeSumAmount'];
            $incomeAmount = (int)$finance['incomeAmount'];
            $chargeAmount = (int)$finance['chargeAmount'];
            $createTime = trim($finance['createTime']);
            $table .= '<tr><td>'.$financeTypeMap[$financeType].'</td><td>'.$userId.'</td><td>'.$nickName.'</td><td>'.$realName.'</td><td>'.($cashConsumeSumAmount/100).'</td><td>'.($chargeConsumeSumAmount/100).'</td><td>'.($incomeConsumeSumAmount/100).'</td><td>'.($couponConsumeSumAmount/100).'</td><td>'.($consumeSumAmount/100).'</td><td>'.($recommendIncomeSumAmount/100).'</td><td>'.($spreadIncomeSumAmount/100).'</td><td>'.($prizeIncomeSumAmount/100).'</td><td>'.($divideIncomeSumAmount/100).'</td><td>'.($commissionIncomeSumAmount/100).'</td><td>'.($incomeSumAmount/100).'</td><td>'.($withdrawingSumAmount/100).'</td><td>'.($withdrewSumAmount/100).'</td><td>'.($withdrawSumAmount/100).'</td><td>'.($userChargeSumAmount/100).'</td><td>'.($platformChargeSumAmount/100).'</td><td>'.($chargeSumAmount/100).'</td><td>'.($chargeFreezeSumAmount/100).'</td><td>'.($incomeFreezeSumAmount/100).'</td><td>'.($chargeAmount/100).'</td><td>'.($incomeAmount/100).'</td><td>'.$createTime.'</td></tr>';
        }
        return $table;
    }
}