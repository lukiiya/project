<?php
namespace module;
class Pay {
	private $common;
	private $commonService;
	private $orderService;
	private $userService;
	private $financeService;
	private $comboService;
	private $activityService;
	private $couponService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->orderService = requireService("Order");
		$this->userService = requireService("User");
		$this->financeService  = requireService("Finance");
		$this->comboService  = requireService("Combo");
		$this->activityService  = requireService("Activity");
		$this->couponService  = requireService("Coupon");
	}

	//支付订单批量(添加订单批量)
	public function payOrderBatch($param) {
		$resp = requireModule('Resp');
		$orderId = $param['orderId'];
		$redirectUrl = trim($param['redirectUrl']);
		$remark = trim($param['remark']);
		$tradeType = (int)$param['tradeType'];//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
		if (!is_array($orderId) || count($orderId) <= 0) {
			$resp->msg = 'orderId参数有误';
			return $resp;
		}
		foreach ($orderId as $id){
			$id = (int)$id;
			if ($id <= 0) {
				$resp->msg = 'orderId参数有误';
				return $resp;
			}
		}
		$param = array();
		$param['orderId'] = $orderId;
		$param['status'] = 1;//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		$orderLength = count($orderList);
		if (!is_array($orderList) || $orderLength <= 0 || $orderLength != count($orderId)) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$userIdArr = array();
		$totalAmount = 0;
		$financeTypeArr = array();
		$sourceArr = array();
		$channelArr = array();
		foreach ($orderList as $order) {
			$userId = (int)$order['userId'];
			$orderId = (int)$order['orderId'];
			$amount = (int)$order['amount'];
			$status = (int)$order['status'];
			$orderType = (int)$order['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
			$source = (int)$order['source'];//来源, 0=h5, 1=android, 2=ios
			$channel = (int)$order['channel'];//渠道
			if ($userId <= 0 || $orderId <= 0 || $amount <= 0 || $status != 1) {
				$resp->msg = '订单信息异常';
				return $resp;
			}
			//充值订单只能现金消费
			if ($orderType == 0 || $orderType == 1 || $orderType == 2 || $orderType == 5 || $orderType == 6) {
				$financeTypeArr[] = 0;
			} else if ($orderType == 3 || $orderType == 4 || $orderType == 7 || $orderType == 8 || $orderType == 9) {
				$financeTypeArr[] = 1;
			}
			$userIdArr[] = $userId;
			$totalAmount += $amount;
			$sourceArr[] = $source;
			$channelArr[] = $channel;
		}
		$userIdArr = array_unique($userIdArr);
		$userId = $userIdArr[0];
		$financeTypeArr = array_unique($financeTypeArr);
		$sourceArr = array_unique($sourceArr);
		$source = $sourceArr[0];
		$channelArr = array_unique($channelArr);
		$channel = $channelArr[0];
		if (!is_array($userIdArr) || count($userIdArr) != 1 || $userId <= 0) {
			$resp->msg = '订单用户异常';
			return $resp;
		}
		if (count($financeTypeArr) <= 0) {
			$resp->msg = '订单资金类型异常';
			return $resp;
		}
		if (count($sourceArr) != 1) {
			$resp->msg = '订单来源异常';
			return $resp;
		}
		if (count($channelArr) != 1) {
			$resp->msg = '订单渠道异常';
			return $resp;
		}
		if ($totalAmount <= 0) {
			$resp->msg = '支付金额异常';
			return $resp;
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$userData = $selectUserByIdResp->data;
		if (empty($userData)) {
			$resp->msg = '用户不存在';
			return $resp;
		}
		//强制更新资金明显
		$setUserFinanceResp = $this->commonService->setUserFinance($userId);
		if ($setUserFinanceResp->errCode != 0) {
			$resp->msg = '查询资金异常';
			return $resp;
		}
		$mlRemainChargeAmount = 0;//米粒充值剩余总额
		$mlRemainIncomeAmount = 0;//米粒收益剩余总额
		$cjRemainChargeAmount = 0;//彩金充值剩余总额
		$cjRemainIncomeAmount = 0;//彩金收益剩余总额
		$mlFinanceId = 0;//米粒资金id
		$cjFinanceId = 0;//彩金资金id
		$mlFinanceDataVersion = 0;//米粒资金数据版本
		$cjFinanceDataVersion = 0;//彩金资金数据版本
		//资金明细表额外表
		$mlRemainChargeAmountExtra = 0;//米粒充值剩余总额
		$mlRemainIncomeAmountExtra = 0;//米粒收益剩余总额
		$cjRemainChargeAmountExtra = 0;//彩金充值剩余总额
		$cjRemainIncomeAmountExtra = 0;//彩金收益剩余总额
		$mlFinanceIdExtra = 0;//米粒资金id
		$cjFinanceIdExtra = 0;//彩金资金id
		$mlFinanceDataVersionExtra = 0;//米粒资金数据版本
		$cjFinanceDataVersionExtra = 0;//彩金资金数据版本
		foreach ($financeTypeArr as $financeType) {
			//查询用户资金
			$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
			if ($selectFinanceByUserIdResp->errCode != 0) {
				$resp->msg = '查询资金异常';
				return $resp;
			}
			$financeData = $selectFinanceByUserIdResp->data;
			if (empty($financeData)) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			$financeId = (int)$financeData['financeId'];
			$remainChargeAmount = (int)$financeData['chargeAmount'];  //充值剩余总额
			$remainIncomeAmount = (int)$financeData['incomeAmount'];  //收益剩余总额
			$dataVersion = (int)$financeData['dataVersion'];
			if ($financeId <= 0) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			//资金明细表额外表
			$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
			if ($selectFinanceExtraByUserIdResp->errCode != 0) {
				$resp->msg = '查询资金异常';
				return $resp;
			}
			$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
			if (empty($financeDataExtra)) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			$financeIdExtra = (int)$financeDataExtra['financeId'];
			$remainChargeAmountExtra = (int)$financeDataExtra['chargeAmount'];  //充值剩余总额
			$remainIncomeAmountExtra = (int)$financeDataExtra['incomeAmount'];  //收益剩余总额
			$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
			if ($financeIdExtra <= 0) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			if ($financeType == 0) {
				$mlRemainChargeAmount = $remainChargeAmount;
				$mlRemainIncomeAmount = $remainIncomeAmount;
				$mlFinanceId = $financeId;
				$mlFinanceDataVersion = $dataVersion;
				//资金明细表额外表
				$mlRemainChargeAmountExtra = $remainChargeAmountExtra;
				$mlRemainIncomeAmountExtra = $remainIncomeAmountExtra;
				$mlFinanceIdExtra = $financeIdExtra;
				$mlFinanceDataVersionExtra = $dataVersionExtra;
			} else if ($financeType == 1) {
				$cjRemainChargeAmount = $remainChargeAmount;
				$cjRemainIncomeAmount = $remainIncomeAmount;
				$cjFinanceId = $financeId;
				$cjFinanceDataVersion = $dataVersion;
				//资金明细表额外表
				$cjRemainChargeAmountExtra = $remainChargeAmountExtra;
				$cjRemainIncomeAmountExtra = $remainIncomeAmountExtra;
				$cjFinanceIdExtra = $financeIdExtra;
				$cjFinanceDataVersionExtra = $dataVersionExtra;
			}
		}
		$useCashAmount = 0;
		$mlUseChargeAmount = 0;
		$mlUseIncomeAmount = 0;
		$cjUseChargeAmount = 0;
		$cjUseIncomeAmount = 0;
		//资金明细表额外表
		$useCashAmountExtra = 0;
		$mlUseChargeAmountExtra = 0;
		$mlUseIncomeAmountExtra = 0;
		$mlChargeFreezeChangeAmountExtra = 0;
		$mlIncomeFreezeChangeAmountExtra = 0;
		$cjUseChargeAmountExtra = 0;
		$cjUseIncomeAmountExtra = 0;
		$cjChargeFreezeChangeAmountExtra = 0;
		$cjIncomeFreezeChangeAmountExtra = 0;
		$database = requireModule('Database');
		$mlSqlArr = array();
		$cjSqlArr = array();
		$orderIdArr = array();
		foreach ($orderList as $order) {
			$userId = (int)$order['userId'];
			$nickName = trim($order['nickName']);
			$realName = trim($order['realName']);
			$orderId = (int)$order['orderId'];
			$amount = (int)$order['amount'];
			$orderType = (int)$order['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
			$orderIdArr[] = $orderId;
			$financeType = null;
			if ($orderType == 1 || $orderType == 4) {//充值订单 和 彩金充值订单 必须现金支付
				$useCashAmount += $amount;
				$useCashAmountExtra += $amount;
				continue;
			} else if ($orderType == 0 || $orderType == 2 || $orderType == 5 || $orderType == 6) {
				$financeType = 0;
			} else if ($orderType == 3 || $orderType == 7 || $orderType == 8 || $orderType == 9) {
				$financeType = 1;
			}
			if ($financeType !== 0 && $financeType !== 1) {
				$resp->msg = '订单资金类型异常';
				return $resp;
			}
			$chargeAmount = 0;
			$incomeAmount = 0;
			if ($financeType == 0) {
				if (($mlRemainChargeAmount + $mlRemainIncomeAmount) < $amount) {
					$useCashAmount += $amount;
				} else if ($mlRemainChargeAmount >= $amount) {
					$chargeAmount = $amount;
					$mlUseChargeAmount += $chargeAmount;
					$mlRemainChargeAmount -= $chargeAmount;
				} else if ($mlRemainChargeAmount > 0 && $mlRemainIncomeAmount > 0 && ($mlRemainChargeAmount + $mlRemainIncomeAmount) >= $amount) {
					$chargeAmount = $mlRemainChargeAmount;
					$incomeAmount = (int)($amount - $mlRemainChargeAmount);
					$mlUseChargeAmount += $chargeAmount;
					$mlUseIncomeAmount += $incomeAmount;
					$mlRemainChargeAmount -= $chargeAmount;
					$mlRemainIncomeAmount -= $incomeAmount;
				} else if ($mlRemainIncomeAmount >= $amount) {
					$incomeAmount = $amount;
					$mlUseIncomeAmount += $incomeAmount;
					$mlRemainIncomeAmount -= $incomeAmount;
				} else {
					$useCashAmount += $amount;
				}
			} else if ($financeType == 1) {
				if (($cjRemainChargeAmount + $cjRemainIncomeAmount) < $amount) {
					$useCashAmount += $amount;
				} else if ($cjRemainChargeAmount >= $amount) {
					$chargeAmount = $amount;
					$cjUseChargeAmount += $chargeAmount;
					$cjRemainChargeAmount -= $chargeAmount;
				} else if ($cjRemainChargeAmount > 0 && $cjRemainIncomeAmount > 0 && ($cjRemainChargeAmount + $cjRemainIncomeAmount) >= $amount) {
					$chargeAmount = $cjRemainChargeAmount;
					$incomeAmount = (int)($amount - $cjRemainChargeAmount);
					$cjUseChargeAmount += $chargeAmount;
					$cjUseIncomeAmount += $incomeAmount;
					$cjRemainChargeAmount -= $chargeAmount;
					$cjRemainIncomeAmount -= $incomeAmount;
				} else if ($cjRemainIncomeAmount >= $amount) {
					$incomeAmount = $amount;
					$cjUseIncomeAmount += $incomeAmount;
					$cjRemainIncomeAmount -= $incomeAmount;
				} else {
					$useCashAmount += $amount;
				}
			}
			//资金明细表额外表
			$chargeAmountExtra = 0;
			$incomeAmountExtra = 0;
			if ($financeType == 0) {
				if (($mlRemainChargeAmountExtra + $mlRemainIncomeAmountExtra) < $amount) {
					$useCashAmountExtra += $amount;
				} else if ($mlRemainChargeAmountExtra >= $amount) {
					$chargeAmountExtra = $amount;
					$mlUseChargeAmountExtra += $chargeAmountExtra;
					$mlRemainChargeAmountExtra -= $chargeAmountExtra;
				} else if ($mlRemainChargeAmountExtra > 0 && $mlRemainIncomeAmountExtra > 0 && ($mlRemainChargeAmountExtra + $mlRemainIncomeAmountExtra) >= $amount) {
					$chargeAmountExtra = $mlRemainChargeAmountExtra;
					$incomeAmountExtra = (int)($amount - $mlRemainChargeAmountExtra);
					$mlUseChargeAmountExtra += $chargeAmountExtra;
					$mlUseIncomeAmountExtra += $incomeAmountExtra;
					$mlRemainChargeAmountExtra -= $chargeAmountExtra;
					$mlRemainIncomeAmountExtra -= $incomeAmountExtra;
				} else if ($mlRemainIncomeAmountExtra >= $amount) {
					$incomeAmountExtra = $amount;
					$mlUseIncomeAmountExtra += $incomeAmountExtra;
					$mlRemainIncomeAmountExtra -= $incomeAmountExtra;
				} else {
					$useCashAmountExtra += $amount;
				}
			} else if ($financeType == 1) {
				if (($cjRemainChargeAmountExtra + $cjRemainIncomeAmountExtra) < $amount) {
					$useCashAmountExtra += $amount;
				} else if ($cjRemainChargeAmountExtra >= $amount) {
					$chargeAmountExtra = $amount;
					$cjUseChargeAmountExtra += $chargeAmountExtra;
					$cjRemainChargeAmountExtra -= $chargeAmountExtra;
				} else if ($cjRemainChargeAmountExtra > 0 && $cjRemainIncomeAmountExtra > 0 && ($cjRemainChargeAmountExtra + $cjRemainIncomeAmountExtra) >= $amount) {
					$chargeAmountExtra = $cjRemainChargeAmountExtra;
					$incomeAmountExtra = (int)($amount - $cjRemainChargeAmountExtra);
					$cjUseChargeAmountExtra += $chargeAmountExtra;
					$cjUseIncomeAmountExtra += $incomeAmountExtra;
					$cjRemainChargeAmountExtra -= $chargeAmountExtra;
					$cjRemainIncomeAmountExtra -= $incomeAmountExtra;
				} else if ($cjRemainIncomeAmountExtra >= $amount) {
					$incomeAmountExtra = $amount;
					$cjUseIncomeAmountExtra += $incomeAmountExtra;
					$cjRemainIncomeAmountExtra -= $incomeAmountExtra;
				} else {
					$useCashAmountExtra += $amount;
				}
			}
			$checkArr = array();
			$checkArr[] = $chargeAmount == $chargeAmountExtra;
			$checkArr[] = $incomeAmount == $incomeAmountExtra;
			$checkArr[] = $useCashAmount == $useCashAmountExtra;
			$checkArr[] = $mlUseChargeAmount == $mlUseChargeAmountExtra;
			$checkArr[] = $mlUseIncomeAmount == $mlUseIncomeAmountExtra;
			$checkArr[] = $cjUseChargeAmount == $cjUseChargeAmountExtra;
			$checkArr[] = $cjUseIncomeAmount == $cjUseIncomeAmountExtra;
			foreach ($checkArr as $check) {
				if (!$check) {
					$resp->msg = '资金校验异常';
					return $resp;
				}
			}
			if ($chargeAmount > 0) {
				$field = array();
				$field[] = 'financeType="' . $database->escape($financeType) . '"';
				$field[] = 'userId="' . $database->escape($userId) . '"';
				$field[] = 'nickName="' . $database->escape($nickName) . '"';
				$field[] = 'realName="' . $database->escape($realName) . '"';
				$field[] = 'orderId="' . $database->escape($orderId) . '"';
				$field[] = 'type=1';//类型, 1=充值, 2=收益
				$field[] = 'status=1';//状态, 1=冻结, 2=解冻
				$field[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$field[] = 'remark="' . $database->escape($remark) . '"';
				$field[] = 'createTime=now()';
				$sql = 'insert into t_finance_freeze set ' . implode(',', $field);
				if ($financeType == 0) {
					$mlSqlArr[] = $sql;
					$mlChargeFreezeChangeAmountExtra += $chargeAmount;
				} else if ($financeType == 1) {
					$cjSqlArr[] = $sql;
					$cjChargeFreezeChangeAmountExtra += $chargeAmount;
				}
			}
			if ($incomeAmount > 0) {
				$field = array();
				$field[] = 'financeType="' . $database->escape($financeType) . '"';
				$field[] = 'userId="' . $database->escape($userId) . '"';
				$field[] = 'nickName="' . $database->escape($nickName) . '"';
				$field[] = 'realName="' . $database->escape($realName) . '"';
				$field[] = 'orderId="' . $database->escape($orderId) . '"';
				$field[] = 'type=2';//类型, 1=充值, 2=收益
				$field[] = 'status=1';//状态, 1=冻结, 2=解冻
				$field[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$field[] = 'remark="' . $database->escape($remark) . '"';
				$field[] = 'createTime=now()';
				$sql = 'insert into t_finance_freeze set ' . implode(',', $field);
				if ($financeType == 0) {
					$mlSqlArr[] = $sql;
					$mlIncomeFreezeChangeAmountExtra += $incomeAmount;
				} else if ($financeType == 1) {
					$cjSqlArr[] = $sql;
					$cjIncomeFreezeChangeAmountExtra += $incomeAmount;
				}
			}
		}
		if ($totalAmount != ($useCashAmount + $mlUseChargeAmount + $mlUseIncomeAmount + $cjUseChargeAmount + $cjUseIncomeAmount)) {
			$resp->msg = '订单批量金额异常';
			return $resp;
		}
		if ($useCashAmount > 0) {
			//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
			if ($tradeType != 0 && $tradeType != 1 && $tradeType != 2 && $tradeType != 3 && $tradeType != 4) {
				$resp->msg = '交易方式异常';
				return $resp;
			}
			$insertOrderBatchField = array();
			$insertOrderBatchField[] = 'userId="' . $database->escape($userId) . '"';
			$insertOrderBatchField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertOrderBatchField[] = 'realName="' . $database->escape($realName) . '"';
			$insertOrderBatchField[] = 'orderId="' . $database->escape(implode(',', $orderIdArr)) . '"';
			$insertOrderBatchField[] = 'amount="' . $database->escape($totalAmount) . '"';
			$insertOrderBatchField[] = 'status=1';//批量状态, 1=未付款, 2=已付款, 3=已处理
			$insertOrderBatchField[] = 'source="' . $database->escape($source) . '"';
			$insertOrderBatchField[] = 'channel="' . $database->escape($channel) . '"';
			$insertOrderBatchField[] = 'remark="' . $database->escape($remark) . '"';
			$insertOrderBatchField[] = 'createTime=now()';
			$insertOrderBatchSql = 'insert into t_order_batch set ' . implode(',', $insertOrderBatchField);
			$insertOrderBatchResult = $database->execute($insertOrderBatchSql);
			$insertOrderBatchInsertId = (int)$database->getInsertId();
			if (!$insertOrderBatchResult || $insertOrderBatchInsertId <= 0) {
				$resp->msg = '生成订单批量失败';
				return $resp;
			}
			$orderBatchNo = $this->common->encodeNo($userId, $insertOrderBatchInsertId);
			if ($source == 0) {
				$redirectUrl .= '&orderBatchNo='.$orderBatchNo;
			}
			//生成支付单
			$cpParam = array();
			$cpParam['source'] = $source;
			$cpParam['userId'] = $userId;
			$cpParam['batchId'] = $insertOrderBatchInsertId;
			$cpParam['amount'] = $totalAmount;
			$cpParam['redirectUrl'] = $redirectUrl;
			$createBatchPayResp = null;
			if ($tradeType == 0) {
				$iapppay = requireModule('Iapppay');
				$createBatchPayResp = $iapppay->createBatchPay($cpParam);
			} else if ($tradeType == 1) {
				$alipay = requireModule('Alipay');
				$createBatchPayResp = $alipay->createBatchPay($cpParam);
			} else if ($tradeType == 2) {
				$cpParam['openId'] = $userData['openId'];
				$swiftpass = requireModule('Swiftpass');
				$createBatchPayResp = $swiftpass->createBatchPay($cpParam);
			} else if ($tradeType == 3) {
				$apple = requireModule('Apple');
				$createBatchPayResp = $apple->createBatchPay($cpParam);
			} else if ($tradeType == 4) {
				$iapppayPartner = requireModule('IapppayPartner');
				$createBatchPayResp = $iapppayPartner->createBatchPay($cpParam);
			}
			if (empty($createBatchPayResp) || $createBatchPayResp->errCode != 0) {
				$resp->msg = '生成支付单失败';
				return $resp;
			}
			$payUrl = trim($createBatchPayResp->data);
			if (empty($payUrl)) {
				$resp->msg = '生成支付单失败';
				return $resp;
			}
			$resp->data = array('orderBatchNo' => $orderBatchNo, 'payUrl' => $payUrl);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		} else if ($useCashAmount == 0 && ($mlUseChargeAmount + $mlUseIncomeAmount + $cjUseChargeAmount + $cjUseIncomeAmount) == $totalAmount && (count($mlSqlArr) > 0 || count($cjSqlArr) > 0)) {
			//开启事物
			if ($database->execute('start transaction')) {
				if (count($mlSqlArr) > 0) {
					//更新用户资金明细版本，防止请求串入造成的数据错乱
					$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $mlFinanceId . '" and dataVersion="' . $mlFinanceDataVersion . '" limit 1 ';
					$updateFinanceResult = $database->execute($updateFinanceSql);
					$updateFinanceAffectedRows = (int)$database->getAffectedRows();
					if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$sql = implode(';', $mlSqlArr);
					$result = $database->multiExecute($sql);
					if (!$result) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$freezeIdArr = $database->multiInsertId();
					if (count($freezeIdArr) != count($mlSqlArr)) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					for ($i = 0, $length = count($freezeIdArr); $i < $length; $i++) {
						$freezeId = (int)$freezeIdArr[$i];
						if ($freezeId <= 0) {
							$database->execute('rollback');
							$database->close();
							$resp->msg = '更新资金异常';
							return $resp;
						}
					}
					//资金明细表额外表
					$mlUpdateFinanceSqlExtraParam = array();
					$mlUpdateFinanceSqlExtraParam['nickName'] = $nickName;
					$mlUpdateFinanceSqlExtraParam['realName'] = $realName;
					$mlUpdateFinanceSqlExtraParam['financeId'] = $mlFinanceIdExtra;
					$mlUpdateFinanceSqlExtraParam['dataVersion'] = $mlFinanceDataVersionExtra;
					$mlUpdateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = $mlChargeFreezeChangeAmountExtra; //充值冻结金额
					$mlUpdateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = $mlIncomeFreezeChangeAmountExtra; //收益冻结金额
					$mlUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $mlUpdateFinanceSqlExtraParam);
					$mlUpdateFinanceSqlExtra = $mlUpdateFinanceSqlExtraResp->data;
					if ($mlUpdateFinanceSqlExtraResp->errCode != 0 || empty($mlUpdateFinanceSqlExtra)) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$mlUpdateFinanceResultExtra = $database->execute($mlUpdateFinanceSqlExtra);
					$mlUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
					if (!$mlUpdateFinanceResultExtra || $mlUpdateFinanceAffectedRowsExtra <= 0) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
				}
				if (count($cjSqlArr) > 0) {
					//更新用户资金明细版本，防止请求串入造成的数据错乱
					$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $cjFinanceId . '" and dataVersion="' . $cjFinanceDataVersion . '" limit 1 ';
					$updateFinanceResult = $database->execute($updateFinanceSql);
					$updateFinanceAffectedRows = (int)$database->getAffectedRows();
					if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$sql = implode(';', $cjSqlArr);
					$result = $database->multiExecute($sql);
					if (!$result) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$freezeIdArr = $database->multiInsertId();
					if (count($freezeIdArr) != count($cjSqlArr)) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					for ($i = 0, $length = count($freezeIdArr); $i < $length; $i++) {
						$freezeId = (int)$freezeIdArr[$i];
						if ($freezeId <= 0) {
							$database->execute('rollback');
							$database->close();
							$resp->msg = '更新资金异常';
							return $resp;
						}
					}
					//资金明细表额外表
					$cjUpdateFinanceSqlExtraParam = array();
					$cjUpdateFinanceSqlExtraParam['nickName'] = $nickName;
					$cjUpdateFinanceSqlExtraParam['realName'] = $realName;
					$cjUpdateFinanceSqlExtraParam['financeId'] = $cjFinanceIdExtra;
					$cjUpdateFinanceSqlExtraParam['dataVersion'] = $cjFinanceDataVersionExtra;
					$cjUpdateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = $cjChargeFreezeChangeAmountExtra; //充值冻结金额
					$cjUpdateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = $cjIncomeFreezeChangeAmountExtra; //收益冻结金额
					$cjUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $cjUpdateFinanceSqlExtraParam);
					$cjUpdateFinanceSqlExtra = $cjUpdateFinanceSqlExtraResp->data;
					if ($cjUpdateFinanceSqlExtraResp->errCode != 0 || empty($cjUpdateFinanceSqlExtra)) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
					$cjUpdateFinanceResultExtra = $database->execute($cjUpdateFinanceSqlExtra);
					$cjUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
					if (!$cjUpdateFinanceResultExtra || $cjUpdateFinanceAffectedRowsExtra <= 0) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '更新资金异常';
						return $resp;
					}
				}
				$insertOrderBatchField = array();
				$insertOrderBatchField[] = 'userId="' . $database->escape($userId) . '"';
				$insertOrderBatchField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertOrderBatchField[] = 'realName="' . $database->escape($realName) . '"';
				$insertOrderBatchField[] = 'orderId="' . $database->escape(implode(',', $orderIdArr)) . '"';
				$insertOrderBatchField[] = 'amount="' . $database->escape($totalAmount) . '"';
				$insertOrderBatchField[] = 'status=2';//批量状态, 1=未付款, 2=已付款, 3=已处理
				$insertOrderBatchField[] = 'source="' . $database->escape($source) . '"';
				$insertOrderBatchField[] = 'channel="' . $database->escape($channel) . '"';
				$insertOrderBatchField[] = 'remark="' . $database->escape($remark) . '"';
				$insertOrderBatchField[] = 'createTime=now()';
				$insertOrderBatchSql = 'insert into t_order_batch set ' . implode(',', $insertOrderBatchField);
				$insertOrderBatchResult = $database->execute($insertOrderBatchSql);
				$insertOrderBatchInsertId = (int)$database->getInsertId();
				if (!$insertOrderBatchResult || $insertOrderBatchInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入批量订单异常';
					return $resp;
				}
				$database->execute('commit');
				$database->close();
				//更新资金明细
				$this->commonService->setUserFinance($userId);
				$this->doPayOrderBatch($insertOrderBatchInsertId);
				$orderBatchNo = $this->common->encodeNo($userId, $insertOrderBatchInsertId);
				$resp->data = array('orderBatchNo' => $orderBatchNo);
				$resp->errCode = 0;
				$resp->msg = "成功";
				return $resp;
			} else {
				$resp->msg = '支付失败';
				return $resp;
			}
		}
		$resp->msg = '支付失败';
		return $resp;
	}

	//支付订单批量(订单批量里各个订单支付)
	public function doPayOrderBatch($batchId) {
		$resp = requireModule('Resp');
		$batchId = (int)$batchId;
		if ($batchId <= 0) {
			$resp->msg = "batchId参数有误";
			return $resp;
		}
		$selectOrderBatchByIdResp = $this->orderService->selectOrderBatchById($batchId);
		if ($selectOrderBatchByIdResp->errCode != 0) {
			$resp->msg = "查询订单异常";
			return $resp;
		}
		$orderBatchData = $selectOrderBatchByIdResp->data;
		if (empty($orderBatchData)) {
			$resp->msg = "订单批量数据异常";
			return $resp;
		}
		$batchId = (int)$orderBatchData['batchId'];
		$orderBatchUserId = (int)$orderBatchData['userId'];
		$orderBatchOrderId = explode(',', $orderBatchData['orderId']);
		$orderBatchOrderId = $this->common->filterIdArray($orderBatchOrderId);
		$orderBatchAmount = (int)$orderBatchData['amount'];
		$orderBatchStatus = (int)$orderBatchData['status'];//批量状态, 1=未付款, 2=已付款, 3=已处理
		$orderBatchTradeType = (int)$orderBatchData['tradeType'];//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
		$orderBatchTradeNo = trim($orderBatchData['tradeNo']);
		$orderBatchTradeTime = trim($orderBatchData['tradeTime']);
		if ($batchId <= 0) {
			$resp->msg = "订单批量batchId异常";
			return $resp;
		}
		if ($orderBatchUserId <= 0) {
			$resp->msg = "订单批量userId异常";
			return $resp;
		}
		if (!is_array($orderBatchOrderId) || count($orderBatchOrderId) <= 0) {
			$resp->msg = "订单批量orderId异常";
			return $resp;
		}
		if ($orderBatchAmount <= 0) {
			$resp->msg = "订单批量金额异常";
			return $resp;
		}
		if ($orderBatchStatus != 2) {
			$resp->msg = "订单批量状态异常";
			return $resp;
		}
		$param = array();
		$param['orderId'] = $orderBatchOrderId;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = "订单查询异常";
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = "不存在订单";
			return $resp;
		}
		$userIdArr = array();
		$totalAmount = 0;
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			$userId = (int)$order['userId'];
			$amount = (int)$order['amount'];
			$status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
			if (empty($order) || $orderId <= 0 || $userId <= 0 || $amount <= 0 || $status <= 0) {
				continue;
			}
			$userIdArr[] = $userId;
			$totalAmount += $amount;
		}
		$userIdArr = array_unique($userIdArr);
		$userId = $userIdArr[0];
		if (!is_array($userIdArr) || count($userIdArr) != 1 || $userId <= 0) {
			$resp->msg = '订单用户异常';
			return $resp;
		}
		if ($orderBatchAmount != $totalAmount) {
			$resp->msg = "订单批量金额不符";
			return $resp;
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$userData = $selectUserByIdResp->data;
		if (empty($userData)) {
			$resp->msg = '用户不存在';
			return $resp;
		}
		foreach ($orderList as $orderData) {
			$orderId = (int)$orderData['orderId'];
			$userId = (int)$orderData['userId'];
			$orderType = (int)$orderData['orderType'];//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单
			$amount = (int)$orderData['amount'];
			$status = (int)$orderData['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
			if (empty($orderData) || $orderId <= 0 || $userId <= 0 || $amount <= 0 || $status != 1) {
				continue;
			}
			$financeType = null;
			if ($orderType == 0 || $orderType == 1 || $orderType == 2 || $orderType == 5 || $orderType == 6) {
				$financeType = 0;
			} else if ($orderType == 3 || $orderType == 4 || $orderType == 7 || $orderType == 8 || $orderType == 9) {
				$financeType = 1;
			}
			if ($financeType !== 0 && $financeType !== 1) {
				$resp->msg = '订单资金类型异常';
				return $resp;
			}
			//强制更新资金明显
			$setUserFinanceResp = $this->commonService->setUserFinance($userId);
			if ($setUserFinanceResp->errCode != 0) {
				$resp->msg = '查询资金异常';
				return $resp;
			}
			//查询用户资金
			$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
			if ($selectFinanceByUserIdResp->errCode != 0) {
				$resp->msg = '查询资金异常';
				return $resp;
			}
			$financeData = $selectFinanceByUserIdResp->data;
			if (empty($financeData)) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			//资金明细表额外表
			$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
			if ($selectFinanceExtraByUserIdResp->errCode != 0) {
				$resp->msg = '查询资金异常';
				return $resp;
			}
			$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
			if (empty($financeDataExtra)) {
				$resp->msg = '资金不存在';
				return $resp;
			}
			$planUserFinanceDataExtra = null;
			$spreaderFinanceDataExtra = null;
			if ($orderType == 0) {
				$planUserId = (int)$orderData['planUserId'];
				$spreaderUserId = (int)$orderData['spreaderUserId'];
				if ($planUserId > 0) {
					//查询用户资金
					$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $planUserId);
					if ($selectFinanceExtraByUserIdResp->errCode != 0) {
						$resp->msg = '查询资金异常';
						return $resp;
					}
					$planUserFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
					if (empty($planUserFinanceDataExtra)) {
						$resp->msg = '资金不存在';
						return $resp;
					}
				}
				if ($spreaderUserId > 0) {
					//查询用户资金
					$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $spreaderUserId);
					if ($selectFinanceExtraByUserIdResp->errCode != 0) {
						$resp->msg = '查询资金异常';
						return $resp;
					}
					$spreaderFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
					if (empty($spreaderFinanceDataExtra)) {
						$resp->msg = '资金不存在';
						return $resp;
					}
				}
			}
			$payParam = array();
			$payParam['order'] = $orderData;
			$payParam['user'] = $userData;
			$payParam['finance'] = $financeData;
			$payParam['financeExtra'] = $financeDataExtra;
			$payParam['planUserFinanceExtra'] = $planUserFinanceDataExtra;
			$payParam['spreaderFinanceExtra'] = $spreaderFinanceDataExtra;
			if (!empty($orderBatchTradeNo) && !empty($orderBatchTradeTime)) {
				$tradeData = array(
					'userId' => $userId,
					'orderId' => $orderId,
					'tradeType' => $orderBatchTradeType,
					'tradeNo' => $orderBatchTradeNo,
					'tradeTime' => $orderBatchTradeTime,
					'amount' => $amount
				);
				$payParam['trade'] = $tradeData;
				$payParam['consumeType'] = 1;//消费类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=充值消费+收益消费
			} else {
				$payParam['unfreeze'] = true;
			}
			$payOrderResp = null;
			if ($orderType == 0) {
				$payOrderResp = $this->payPlanOrder($payParam);
			} else if ($orderType == 1) {
				$payOrderResp = $this->payChargeOrder($payParam);
			} else if ($orderType == 2) {
				$payOrderResp = $this->payComboOrder($payParam);
			} else if ($orderType == 3) {
				$payOrderResp = $this->payTicketOrder($payParam);
			} else if ($orderType == 4) {
				$payOrderResp = $this->payTicketChargeOrder($payParam);
			} else if ($orderType == 5) {
				$payOrderResp = $this->paySmlrOrder($payParam);  //晒米冷热
			} else if ($orderType == 6) {
				$payOrderResp = $this->payJxzpOrder($payParam);  //极限追盘
			} else if ($orderType == 7) {
				$payOrderResp = $this->payDigitalTicketOrder($payParam);  //数字彩
            } else if ($orderType == 8) {
                $payOrderResp = $this->payPresentOrder($payParam);  //赠送订单
            } else if ($orderType == 9) {
                $payOrderResp = $this->payGuessOrder($payParam);  //冠亚军竞猜订单
            }
			if (empty($payOrderResp) || $payOrderResp->errCode != 0) {
				$this->logger->info('支付参数：'.print_r($payParam, true));
				$this->logger->info('支付返回：'.print_r($payOrderResp, true));
			}
		}
		//重新查询订单，获取最新的订单状态
		$param = array();
		$param['orderId'] = $orderBatchOrderId;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = "订单查询异常";
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = "不存在订单";
			return $resp;
		}
		$payArr = array();//已支付的订单
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			$userId = (int)$order['userId'];
			$amount = (int)$order['amount'];
			$status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
			if (empty($order) || $orderId <= 0 || $userId <= 0 || $amount <= 0 || $status <= 0) {
				continue;
			}
			if ($status == 2 || $status == 3 || $status == 4) {
				$payArr[] = $order;
			}
		}
		$setOrderBatchStatus = 0;
		if (count($orderList) == count($payArr)) {
			$setOrderBatchStatus = 3;
		}
		if ($setOrderBatchStatus <= 0) {
			$resp->msg = "订单批量不符合更新条件('.$setOrderBatchStatus.')";
			return $resp;
		}
		$database = requireModule('Database');
		$sql = 'update t_order_batch set status="'.$setOrderBatchStatus.'" where batchId="'.$batchId.'" and status=2 limit 1';
		$result = $database->execute($sql);
		$affectedRows = (int)$database->getAffectedRows();
		if (!$result || $affectedRows <= 0) {
			$database->close();
			$resp->msg = '订单批量更新失败';
			return $resp;
		}
		$database->close();
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	//支付订单
	public function payOrder($param) {
		$resp = requireModule('Resp');
		$orderNo = trim($param['orderNo']);
		$redirectUrl = trim($param['redirectUrl']);
		$tradeType = (int)$param['tradeType'];//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
		if (empty($orderNo)) {
			$resp->msg = 'orderNo参数有误';
			return $resp;
		}
		$selectOrderByNoResp = $this->orderService->selectOrderByNo($orderNo);
		if ($selectOrderByNoResp->errCode != 0) {
			$resp->msg = '查询订单异常';
			return $resp;
		}
		$orderData = $selectOrderByNoResp->data;
		if (empty($orderData)) {
			$resp->msg = '订单不存在';
			return $resp;
		}
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		$source = (int)$orderData['source'];
		//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 4=彩金充值订单
		$orderType = (int)$orderData['orderType'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = '查询用户异常';
			return $resp;
		}
		$userData = $selectUserByIdResp->data;
		if (empty($userData)) {
			$resp->msg = '用户不存在';
			return $resp;
		}
		//强制更新资金明显
		$setUserFinanceResp = $this->commonService->setUserFinance($userId);
		if ($setUserFinanceResp->errCode != 0) {
			$resp->msg = '查询资金异常';
			return $resp;
		}
		$financeType = 0;//资金类型, 0=方案, 1=出票
		if ($orderType == 3 || $orderType == 4 || $orderType == 7 || $orderType == 8 || $orderType == 9) {
			$financeType = 1;
		}
		//查询用户资金
		$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$resp->msg = '查询资金异常';
			return $resp;
		}
		$financeData = $selectFinanceByUserIdResp->data;
		if (empty($financeData)) {
			$resp->msg = '资金不存在';
			return $resp;
		}
		//资金明细表额外表
		$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $userId);
		if ($selectFinanceExtraByUserIdResp->errCode != 0) {
			$resp->msg = '查询资金异常';
			return $resp;
		}
		$financeDataExtra = $selectFinanceExtraByUserIdResp->data;
		if (empty($financeDataExtra)) {
			$resp->msg = '资金不存在';
			return $resp;
		}
		$planUserFinanceDataExtra = null;
		$spreaderFinanceDataExtra = null;
		if ($orderType == 0) {
			$planUserId = (int)$orderData['planUserId'];
			$spreaderUserId = (int)$orderData['spreaderUserId'];
			if ($planUserId > 0) {
				//查询用户资金
                $selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $planUserId);
				if ($selectFinanceExtraByUserIdResp->errCode != 0) {
					$resp->msg = '查询资金异常';
					return $resp;
				}
				$planUserFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
				if (empty($planUserFinanceDataExtra)) {
					$resp->msg = '资金不存在';
					return $resp;
				}
			}
			if ($spreaderUserId > 0) {
				//查询用户资金
				$selectFinanceExtraByUserIdResp = $this->financeService->selectFinanceExtraByUserId($financeType, $spreaderUserId);
				if ($selectFinanceExtraByUserIdResp->errCode != 0) {
					$resp->msg = '查询资金异常';
					return $resp;
				}
				$spreaderFinanceDataExtra = $selectFinanceExtraByUserIdResp->data;
				if (empty($spreaderFinanceDataExtra)) {
					$resp->msg = '资金不存在';
					return $resp;
				}
			}
		}

		//得到订单优惠券
		$userCouponData = null;
		$userCouponId = (int)$orderData['userCouponId'];
		if ($userCouponId > 0) {
			$selectUserCouponByIdResp = $this->couponService->selectUserCouponById($userCouponId);
			if ($selectUserCouponByIdResp->errCode == 0 && $selectUserCouponByIdResp->data) {
				$userCouponData = $selectUserCouponByIdResp->data;
				$userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
				$userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
				$userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
				$userCouponAmount = (int)$userCouponData['amount'];
				if ($userCouponFinanceType == $financeType && $userCouponType == 1 && $userCouponStatus == 1 && $userCouponAmount > 0 && $userCouponAmount < $amount) {
					$amount = $amount - $userCouponAmount;
				}
			}
		}

		$financeId = (int)$financeData['financeId'];
		$remainChargeAmount = (int)$financeData['chargeAmount'];  //充值剩余总额
		$remainIncomeAmount = (int)$financeData['incomeAmount'];  //收益剩余总额
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$remainChargeAmountExtra = (int)$financeDataExtra['chargeAmount'];  //充值剩余总额
		$remainIncomeAmountExtra = (int)$financeDataExtra['incomeAmount'];  //收益剩余总额
		if ($financeId <= 0 || $financeIdExtra <= 0) {
			$resp->msg = '资金不存在';
			return $resp;
		}
		$chargeAmount = 0;//充值支付额度
		$incomeAmount = 0;//收益支付额度
		//消费类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=充值消费+收益消费
		$consumeType = 1;
		if (($remainChargeAmount + $remainIncomeAmount) < $amount) {
			$consumeType = 1;
		} else if ($remainChargeAmount >= $amount) {
			$consumeType = 2;
		} else if ($remainChargeAmount > 0 && $remainIncomeAmount > 0 && ($remainChargeAmount + $remainIncomeAmount) >= $amount) {
            $consumeType = 4;
			$chargeAmount = $remainChargeAmount;
			$incomeAmount = (int)($amount - $remainChargeAmount);
        } else if ($remainIncomeAmount >= $amount) {
			$consumeType = 3;
		}
		//充值订单只能现金消费
		if ($orderType == 1 || $orderType == 4) {
			$consumeType = 1;
		}
		//资金明细表额外表
		$chargeAmountExtra = 0;//充值支付额度
		$incomeAmountExtra = 0;//收益支付额度
		//消费类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=充值消费+收益消费
		$consumeTypeExtra = 1;
		if (($remainChargeAmountExtra + $remainIncomeAmountExtra) < $amount) {
			$consumeTypeExtra = 1;
		} else if ($remainChargeAmountExtra >= $amount) {
			$consumeTypeExtra = 2;
		} else if ($remainChargeAmountExtra > 0 && $remainIncomeAmountExtra > 0 && ($remainChargeAmountExtra + $remainIncomeAmountExtra) >= $amount) {
			$consumeTypeExtra = 4;
			$chargeAmountExtra = $remainChargeAmountExtra;
			$incomeAmountExtra = (int)($amount - $remainChargeAmountExtra);
		} else if ($remainIncomeAmountExtra >= $amount) {
			$consumeTypeExtra = 3;
		}
		//充值订单只能现金消费
		if ($orderType == 1 || $orderType == 4) {
			$consumeTypeExtra = 1;
		}
		$checkArr = array();
		$checkArr[] = $remainChargeAmount == $remainChargeAmountExtra;
		$checkArr[] = $remainIncomeAmount == $remainIncomeAmountExtra;
		$checkArr[] = $chargeAmount == $chargeAmountExtra;
		$checkArr[] = $incomeAmount == $incomeAmountExtra;
		$checkArr[] = $consumeType == $consumeTypeExtra;
		foreach ($checkArr as $check) {
			if (!$check) {
				$resp->msg = '资金校验异常';
				return $resp;
			}
		}
		if ($consumeType == 1) {
			//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
			if ($tradeType != 0 && $tradeType != 1 && $tradeType != 2 && $tradeType != 3 && $tradeType != 4) {
				$resp->msg = '交易方式异常';
				return $resp;
			}
			//生成支付单
			$cpParam = array();
			$cpParam['source'] = $source;
			$cpParam['orderType'] = $orderType;
			$cpParam['userId'] = $userId;
			$cpParam['orderId'] = $orderId;
			$cpParam['amount'] = $amount;
			$cpParam['redirectUrl'] = $redirectUrl;
			$createPayResp = null;
			if ($tradeType == 0) {
				$iapppay = requireModule('Iapppay');
				$createPayResp = $iapppay->createPay($cpParam);
			} else if ($tradeType == 1) {
				$alipay = requireModule('Alipay');
				$createPayResp = $alipay->createPay($cpParam);
			} else if ($tradeType == 2) {
                $cpParam['openId'] = $userData['openId'];
                $swiftpass = requireModule('Swiftpass');
                $createPayResp = $swiftpass->createPay($cpParam);
            } else if ($tradeType == 3) {
                $apple = requireModule('Apple');
                $createPayResp = $apple->createPay($cpParam);
            } else if ($tradeType == 4) {
				$iapppayPartner = requireModule('IapppayPartner');
				$createPayResp = $iapppayPartner->createPay($cpParam);
			}
			if (empty($createPayResp) || $createPayResp->errCode != 0) {
				$resp->msg = '生成支付单失败';
				return $resp;
			}
			$payUrl = trim($createPayResp->data);
			if (empty($payUrl)) {
				$resp->msg = '生成支付单失败';
				return $resp;
			}
			$resp->data = array('orderNo' => $orderNo, 'payUrl' => $payUrl);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		}
		$payParam = array();
		$payParam['order'] = $orderData;
		$payParam['user'] = $userData;
		$payParam['userCoupon'] = $userCouponData;
		$payParam['finance'] = $financeData;
		$payParam['financeExtra'] = $financeDataExtra;
		$payParam['planUserFinanceExtra'] = $planUserFinanceDataExtra;
		$payParam['spreaderFinanceExtra'] = $spreaderFinanceDataExtra;
		$payParam['consumeType'] = $consumeType;
		$payParam['chargeAmount'] = $chargeAmount;
		$payParam['incomeAmount'] = $incomeAmount;
		if ($orderType == 0) {
			return $this->payPlanOrder($payParam);
		} else if ($orderType == 1) {
			return $this->payChargeOrder($payParam);
		} else if ($orderType == 2) {
            return $this->payComboOrder($payParam);
        } else if ($orderType == 3) {
            return $this->payTicketOrder($payParam);
        } else if ($orderType == 4) {
            return $this->payTicketChargeOrder($payParam);
        } else if ($orderType == 5) {
            return $this->paySmlrOrder($payParam);  //晒米冷热
        } else if ($orderType == 6) {
            return $this->payJxzpOrder($payParam);  //极限追盘
        } else if ($orderType == 7) {
            return $this->payDigitalTicketOrder($payParam);  //数字彩
        } else if ($orderType == 8) {
            return $this->payPresentOrder($payParam);  //赠送订单
        } else if ($orderType == 9) {
            return $this->payGuessOrder($payParam);  //冠亚军竞猜订单
        }
		$resp->msg = '支付失败';
		return $resp;
	}

	//支付方案订单
	public function payPlanOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
		$planUserFinanceDataExtra = $param['planUserFinanceExtra'];
		$spreaderFinanceDataExtra = $param['spreaderFinanceExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		$planUserFinanceIdExtra = (int)$planUserFinanceDataExtra['financeId'];
		$planUserFinanceTypeExtra = (int)$planUserFinanceDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$planUserDataVersionExtra = (int)$planUserFinanceDataExtra['dataVersion'];
		$spreaderFinanceIdExtra = (int)$spreaderFinanceDataExtra['financeId'];
		$spreaderFinanceTypeExtra = (int)$spreaderFinanceDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$spreaderDataVersionExtra = (int)$spreaderFinanceDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
		$incomeAmount = (int)$param['incomeAmount'];
		$unfreeze = (bool)$param['unfreeze'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (empty($planUserFinanceDataExtra) || $planUserFinanceIdExtra <= 0 || $planUserFinanceTypeExtra !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (!empty($spreaderFinanceDataExtra) && ($spreaderFinanceIdExtra <= 0 || $spreaderFinanceTypeExtra !== 0)) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$planId = (int)$orderData['planId'];
		$planUserId = (int)$orderData['planUserId'];
		$planNickName = trim($orderData['planNickName']);
		$planRealName = trim($orderData['planRealName']);
		$spreaderUserId = (int)$orderData['spreaderUserId'];
		$spreaderNickName = trim($orderData['spreaderNickName']);
		$spreaderRealName = trim($orderData['spreaderRealName']);
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		if ($userId <= 0 || $orderId <= 0 || $planId <= 0 || $planUserId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$planId.'|'.$planUserId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($unfreeze) {
			$getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
			$orderFreezeData = $getOrderFreezeResp->data;
			if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
				$resp->msg = $getOrderFreezeResp->msg;
				return $resp;
			}
			$consumeType = (int)$orderFreezeData['consumeType'];
			$chargeAmount = (int)$orderFreezeData['chargeAmount'];
			$incomeAmount = (int)$orderFreezeData['incomeAmount'];
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '混合支付金额有误';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}

			//资金明细表额外表
            $updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;
			$planUserUpdateFinanceSqlExtraParam = array();
			$planUserUpdateFinanceSqlExtraParam['financeId'] = $planUserFinanceIdExtra;
			$planUserUpdateFinanceSqlExtraParam['nickName'] = $planNickName;
			$planUserUpdateFinanceSqlExtraParam['realName'] = $planRealName;
			$planUserUpdateFinanceSqlExtraParam['dataVersion'] = $planUserDataVersionExtra;
			$spreaderUpdateFinanceSqlExtraParam = array();
			$spreaderUpdateFinanceSqlExtraParam['financeId'] = $spreaderFinanceIdExtra;
			$spreaderUpdateFinanceSqlExtraParam['nickName'] = $spreaderNickName;
			$spreaderUpdateFinanceSqlExtraParam['realName'] = $spreaderRealName;
			$spreaderUpdateFinanceSqlExtraParam['dataVersion'] = $spreaderDataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
				}
			}

            //消费插入
            if ($consumeType != 4) {
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                //消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1) {
					$updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
					$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
					$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
				$remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
                //充值支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount; //充值消费增加
				//收益支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount; //收益消费增加
            }
			$recommendIncomeAmount = $amount*0.5;
			//收益流水插入
			$insertFinanceRecommendIncomeRecordField = array();
			$insertFinanceRecommendIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'userId="' . $database->escape($planUserId) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'nickName="' . $database->escape($planNickName) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'realName="' . $database->escape($planRealName) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceRecommendIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'amount="' . $database->escape($recommendIncomeAmount) . '"';
			$insertFinanceRecommendIncomeRecordField[] = 'remark="推荐收益"';
			$insertFinanceRecommendIncomeRecordField[] = 'createTime=now()';
			$insertFinanceRecommendIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceRecommendIncomeRecordField);
			$insertFinanceRecommendIncomeRecordResult = $database->execute($insertFinanceRecommendIncomeRecordSql);
			$insertFinanceRecommendIncomeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceRecommendIncomeRecordResult || $insertFinanceRecommendIncomeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入流水异常';
				return $resp;
			}
			//推荐收益插入
			$insertFinanceRecommendIncomeField = array();
			$insertFinanceRecommendIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceRecommendIncomeField[] = 'userId="' . $database->escape($planUserId) . '"';
			$insertFinanceRecommendIncomeField[] = 'nickName="' . $database->escape($planNickName) . '"';
			$insertFinanceRecommendIncomeField[] = 'realName="' . $database->escape($planRealName) . '"';
			$insertFinanceRecommendIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceRecommendIncomeField[] = 'planId="' . $database->escape($planId) . '"';
			$insertFinanceRecommendIncomeField[] = 'type=1';//类型, 1=推荐收益, 2=推广收益
			$insertFinanceRecommendIncomeField[] = 'amount="' . $database->escape($recommendIncomeAmount) . '"';
			$insertFinanceRecommendIncomeField[] = 'createTime=now()';
			$insertFinanceRecommendIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceRecommendIncomeField);
			$insertFinanceRecommendIncomeResult = $database->execute($insertFinanceRecommendIncomeSql);
			$insertFinanceRecommendIncomeInsertId = (int)$database->getInsertId();
			if (!$insertFinanceRecommendIncomeResult || $insertFinanceRecommendIncomeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入收益异常';
				return $resp;
			}
			//资金明细表额外表
			$planUserUpdateFinanceSqlExtraParam['recommendIncomeChangeAmount'] = $recommendIncomeAmount;  //推荐收益
			if ($spreaderUserId > 0) {
				$spreadIncomeAmount = $amount*0.5;
				//收益流水插入
				$insertFinanceSpreadIncomeRecordField = array();
				$insertFinanceSpreadIncomeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'userId="' . $database->escape($spreaderUserId) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'nickName="' . $database->escape($spreaderNickName) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'realName="' . $database->escape($spreaderRealName) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'type=2';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceSpreadIncomeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'amount="' . $database->escape($spreadIncomeAmount) . '"';
				$insertFinanceSpreadIncomeRecordField[] = 'remark="分享收益"';
				$insertFinanceSpreadIncomeRecordField[] = 'createTime=now()';
				$insertFinanceSpreadIncomeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceSpreadIncomeRecordField);
				$insertFinanceSpreadIncomeRecordResult = $database->execute($insertFinanceSpreadIncomeRecordSql);
				$insertFinanceSpreadIncomeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceSpreadIncomeRecordResult || $insertFinanceSpreadIncomeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				//推广收益插入
				$insertFinanceSpreadIncomeField = array();
				$insertFinanceSpreadIncomeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceSpreadIncomeField[] = 'userId="' . $database->escape($spreaderUserId) . '"';
				$insertFinanceSpreadIncomeField[] = 'nickName="' . $database->escape($spreaderNickName) . '"';
				$insertFinanceSpreadIncomeField[] = 'realName="' . $database->escape($spreaderRealName) . '"';
				$insertFinanceSpreadIncomeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceSpreadIncomeField[] = 'planId="' . $database->escape($planId) . '"';
				$insertFinanceSpreadIncomeField[] = 'type=2';//类型, 1=推荐收益, 2=推广收益
				$insertFinanceSpreadIncomeField[] = 'amount="' . $database->escape($spreadIncomeAmount) . '"';
				$insertFinanceSpreadIncomeField[] = 'createTime=now()';
				$insertFinanceSpreadIncomeSql = 'insert into t_finance_income set ' . implode(',', $insertFinanceSpreadIncomeField);
				$insertFinanceSpreadIncomeResult = $database->execute($insertFinanceSpreadIncomeSql);
				$insertFinanceSpreadIncomeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceSpreadIncomeResult || $insertFinanceSpreadIncomeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入收益异常';
					return $resp;
				}
				//资金明细表额外表
				$spreaderUpdateFinanceSqlExtraParam['spreadIncomeChangeAmount'] = $spreadIncomeAmount;//推广收益
			}

			if ($unfreeze) {
				//解冻订单冻结资金
				$updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
				$updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
				$updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
				if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新解冻异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount; //解冻充值
				$updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount; //解冻收益
			}
			//资金明细表额外表
			//用户
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
            }
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			//方案人
			$planUserUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $planUserUpdateFinanceSqlExtraParam);
			$planUserUpdateFinanceSqlExtra = $planUserUpdateFinanceSqlExtraResp->data;
			if ($planUserUpdateFinanceSqlExtraResp->errCode != 0 || empty($planUserUpdateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$planUserUpdateFinanceResultExtra = $database->execute($planUserUpdateFinanceSqlExtra);
			$planUserUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$planUserUpdateFinanceResultExtra || $planUserUpdateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			//推广人
            if ($spreaderUserId > 0 && !empty($spreaderFinanceDataExtra) && $spreaderFinanceIdExtra > 0) {
                $spreaderUpdateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $spreaderUpdateFinanceSqlExtraParam);
                $spreaderUpdateFinanceSqlExtra = $spreaderUpdateFinanceSqlExtraResp->data;
                if ($spreaderUpdateFinanceSqlExtraResp->errCode != 0 || empty($spreaderUpdateFinanceSqlExtra)) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
                $spreaderUpdateFinanceResultExtra = $database->execute($spreaderUpdateFinanceSqlExtra);
                $spreaderUpdateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
                if (!$spreaderUpdateFinanceResultExtra || $spreaderUpdateFinanceAffectedRowsExtra <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新资金异常';
                    return $resp;
                }
            }
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$this->commonService->setUserFinance($planUserId);
			$this->commonService->setUserFinance($spreaderUserId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

	//支付充值订单
	public function payChargeOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}

			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=2';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
				}
			}

			//充值流水插入
			$insertFinanceChargeRecordField = array();
			$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeRecordField[] = 'createTime=now()';
			$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
			$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
			$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入流水异常';
				return $resp;
			}
			//充值插入
			$insertFinanceChargeField = array();
			$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
			$insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeField[] = 'createTime=now()';
			$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
			$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
			$insertFinanceChargeInsertId = (int)$database->getInsertId();
            if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入充值异常';
				return $resp;
            }
			//资金明细表额外表
			$updateFinanceSqlExtraParam['userChargeChangeAmount'] = $amount; //用户充值增加
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

	//支付套餐订单
	public function payComboOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
        $financeData = $param['finance'];
        $financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
        $financeIdExtra = (int)$financeDataExtra['financeId'];
        $financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
        $incomeAmount = (int)$param['incomeAmount'];
		$unfreeze = (bool)$param['unfreeze'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
        if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 0) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		$comboId = (int)$orderData['comboId'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0 || $comboId <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.'|'.$comboId.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($unfreeze) {
			$getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
			$orderFreezeData = $getOrderFreezeResp->data;
			if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
				$resp->msg = $getOrderFreezeResp->msg;
				return $resp;
			}
			$consumeType = (int)$orderFreezeData['consumeType'];
			$chargeAmount = (int)$orderFreezeData['chargeAmount'];
			$incomeAmount = (int)$orderFreezeData['incomeAmount'];
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '混合支付金额有误';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		//查询套餐
		$selectComboByIdResp = $this->comboService->selectComboById($comboId);
		if ($selectComboByIdResp->errCode != 0) {
			$resp->msg = '查询套餐异常';
			return $resp;
		}
		$comboData = $selectComboByIdResp->data;
		if (empty($comboData)) {
			$resp->msg = '套餐不存在';
			return $resp;
		}
		$presentAmount = (int)$comboData['presentAmount'];
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新订单异常';
                return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
			}

            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入交易异常';
                    return $resp;
				}
			}

            //消费插入
            if ($consumeType != 4) {
				//消费流水插入
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				//消费插入
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1) {
                    $updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
                    $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
                    $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
				$remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
				//充值支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount;
				//收益支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount;
            }
			//平台赠送充值
			if ($presentAmount > 0) {
				//充值流水插入
				$insertFinanceChargeRecordField = array();
				$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($presentAmount) . '"';
				$insertFinanceChargeRecordField[] = 'createTime=now()';
				$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
				$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
				$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				//充值插入
				$insertFinanceChargeField = array();
				$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
				$insertFinanceChargeField[] = 'amount="' . $database->escape($presentAmount) . '"';
				$insertFinanceChargeField[] = 'createTime=now()';
				$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
				$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
				$insertFinanceChargeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入充值异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $presentAmount;   //平台充值增加
			}

			if ($unfreeze) {
				//解冻订单冻结资金
				$updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
				$updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
				$updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
				if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新解冻异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount; //解冻充值
                $updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount; //解冻收益
			}
            //资金明细表额外表
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $orderNo = $this->common->encodeNo($userId, $orderId);
            $resp->data = array('orderNo' => $orderNo);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

    //支付出票订单
    public function payTicketOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$userCouponData = $param['userCoupon'];
        $financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
        $incomeAmount = (int)$param['incomeAmount'];
		$unfreeze = (bool)$param['unfreeze'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}

		//优惠券逻辑
		$userCouponId = 0;
		$userCouponAmount = 0;
		$useConsumeCoupon = false;//是否使用消费优惠券
		if (!empty($userCouponData)) {
			$userCouponId = (int)$userCouponData['userCouponId'];
			$userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
			$userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
			$userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
			$userCouponAmount = (int)$userCouponData['amount'];
			if ($userCouponId <= 0 || $userCouponFinanceType != $financeType || $userCouponType != 1 || $userCouponStatus != 1 || $userCouponAmount <= 0 || $userCouponAmount >= $amount) {
				$resp->msg = '优惠券信息异常';
				return $resp;
			}
			$amount = $amount - $userCouponAmount;
			$useConsumeCoupon = true;
		}

		if ($unfreeze) {
			$getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
			$orderFreezeData = $getOrderFreezeResp->data;
			if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
				$resp->msg = $getOrderFreezeResp->msg;
				return $resp;
			}
			$consumeType = (int)$orderFreezeData['consumeType'];
			$chargeAmount = (int)$orderFreezeData['chargeAmount'];
			$incomeAmount = (int)$orderFreezeData['incomeAmount'];
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '混合支付金额有误';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}

			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
				}
			}

			//消费插入
            if ($consumeType != 4) {
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
				//消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1){
					$updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
					$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
					$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
				$remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
				//充值支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount; //充值消费增加
				//收益支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount; //收益消费增加
            }

			if ($useConsumeCoupon) {
				//更新用户优惠券表
				$updateUserCouponSql = 'update t_user_coupon set status=2 where userCouponId="' . $userCouponId . '" and couponType=1 and status=1 limit 1 ';
				$updateUserCouponResult = $database->execute($updateUserCouponSql);
				$updateUserCouponAffectedRows = (int)$database->getAffectedRows();
				if (!$updateUserCouponResult || $updateUserCouponAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新用户优惠券异常';
					return $resp;
				}
				//消费流水插入
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="优惠券抵扣"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				//消费插入
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=4';//类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=优惠券消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['couponConsumeChangeAmount'] = $userCouponAmount;
			}

			if ($unfreeze) {
				//解冻订单冻结资金
				$updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
				$updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
				$updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
				if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新解冻异常';
					return $resp;
				}
                //资金明细表额外表
				$updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;
				$updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;
			}
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$message = requireModule('Message');
			$message->publish('payOrderForTicketDeal', $orderId);
			$message->publish('payOrderForStation', $orderId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

    //彩金充值订单
	public function payTicketChargeOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$userCouponData = $param['userCoupon'];
        $financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $userChargeSumAmount = (int)$financeData['userChargeSumAmount'];    //充值总额
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		$source = (int)$orderData['source'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);

		//优惠券逻辑
		$userCouponId = 0;
		$userCouponAmount = 0;
		$consumeCouponUsed = false;//消费优惠券是否被使用
		$useChargeCoupon = false;//是否使用充值优惠券
		if (!empty($userCouponData)) {
			$userCouponId = (int)$userCouponData['userCouponId'];
			$userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
			$userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
			$userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
			$userCouponAmount = (int)$userCouponData['amount'];
			if ($userCouponId <= 0 || $userCouponFinanceType != $financeType || $userCouponType <= 0 || $userCouponAmount <= 0 || $userCouponAmount >= $amount) {
				$resp->msg = '优惠券信息异常';
				return $resp;
			}
			if ($userCouponType == 1 && $userCouponStatus == 2) {
				//异常流程(支付成功 且 消费优惠券被使用)
				$amount = $amount - $userCouponAmount;
				$consumeCouponUsed = true;
			} else if ($userCouponType == 2 && $userCouponStatus == 1) {
				$useChargeCoupon = true;
			}
		}

		//彩金首单充值满20,送优惠券；一共派18张优惠券(15个种类)
		$sendCoupon = false;//是否派送优惠券
		$sendCouponIdArr = array();//派7次
		$sendCouponIdArr[] = array(1,3,4);
		$sendCouponIdArr[] = array(1,2,5);
		$sendCouponIdArr[] = array(2,6);
		$sendCouponIdArr[] = array(1,9,14);
		$sendCouponIdArr[] = array(7,11);
		$sendCouponIdArr[] = array(8,13);
		$sendCouponIdArr[] = array(10,12,15);
		$sendCouponMap = array();
        //用户是否领取过优惠券
        $param = array();
        $param['userId'] = $userId;
        $param['couponSource'] = 0;
        $selectUserCouponResp = $this->couponService->selectUserCoupon($param);
        if ($selectUserCouponResp->errCode != 0) {
            $resp->msg = '优惠券查询异常';
            return $resp;
        }
        $userCouponList = $selectUserCouponResp->data['list'];
        $isReceiveCoupon = is_array($userCouponList) && count($userCouponList) > 0;
        if ($amount >= 2000 && !$isReceiveCoupon) {
			$couponIdArr = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
			$param = array();
			$param['couponId'] = $couponIdArr;
			$selectCouponResp = $this->couponService->selectCoupon($param);
			if ($selectCouponResp->errCode != 0 || empty($selectCouponResp->data)) {
				$resp->msg = '优惠券查询异常';
				return $resp;
			}
			$couponList = $selectCouponResp->data['list'];
			foreach ($couponList as $coupon) {
				$couponId = (int)$coupon['couponId'];
				if ($couponId > 0) {
					$sendCouponMap[$couponId] = $coupon;
				}
			}
			$sendCoupon = count($sendCouponMap) == 15;
		}
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}

			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=2';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
				}
			}

			//充值流水插入
			$insertFinanceChargeRecordField = array();
			$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
			$insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeRecordField[] = 'createTime=now()';
			$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
			$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
			$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入流水异常';
				return $resp;
			}
			//充值插入
			$insertFinanceChargeField = array();
			$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
			$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
			$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
			$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
			$insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
			$insertFinanceChargeField[] = 'type=1';//类型, 1=用户充值, 2=平台充值
			$insertFinanceChargeField[] = 'amount="' . $database->escape($amount) . '"';
			$insertFinanceChargeField[] = 'createTime=now()';
			$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
			$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
			$insertFinanceChargeInsertId = (int)$database->getInsertId();
			if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入充值异常';
				return $resp;
			}
			//资金明细表额外表
			$updateFinanceSqlExtraParam['userChargeChangeAmount'] = $amount;

			if ($consumeCouponUsed) {
				$remark = '消费优惠券被使用,更改为充值单';
				$updateOrderSql = 'update t_order set amount="'.$amount.'" , orderType=4, remark="'.$remark.'" where orderId="' . $orderId . '" and orderType in (3,7) limit 1 ';
				$updateOrderResult = $database->execute($updateOrderSql);
				$updateOrderAffectedRows = (int)$database->getAffectedRows();
				if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新订单异常';
					return $resp;
				}
			}

			if ($useChargeCoupon) {
				//充值优惠券
				$updateUserCouponSql = 'update t_user_coupon set status=2 where userCouponId="' . $userCouponId . '" and couponType=2 and status=1 limit 1 ';
				$updateUserCouponResult = $database->execute($updateUserCouponSql);
				$updateUserCouponAffectedRows = (int)$database->getAffectedRows();
				if (!$updateUserCouponResult || $updateUserCouponAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新用户优惠券异常';
					return $resp;
				}
				$remark = '优惠券赠送';
				$insertFinanceChargeRecordField = array();
				$insertFinanceChargeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceChargeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceChargeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceChargeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceChargeRecordField[] = 'type=4';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceChargeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceChargeRecordField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceChargeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceChargeRecordField[] = 'createTime=now()';
				$insertFinanceChargeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceChargeRecordField);
				$insertFinanceChargeRecordResult = $database->execute($insertFinanceChargeRecordSql);
				$insertFinanceChargeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceChargeRecordResult || $insertFinanceChargeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				//充值插入
				$insertFinanceChargeField = array();
				$insertFinanceChargeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceChargeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceChargeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceChargeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceChargeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceChargeField[] = 'type=2';//类型, 1=用户充值, 2=平台充值
				$insertFinanceChargeField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceChargeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceChargeField[] = 'createTime=now()';
				$insertFinanceChargeSql = 'insert into t_finance_charge set ' . implode(',', $insertFinanceChargeField);
				$insertFinanceChargeResult = $database->execute($insertFinanceChargeSql);
				$insertFinanceChargeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceChargeResult || $insertFinanceChargeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入充值异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['platformChargeChangeAmount'] = $userCouponAmount;
			}

			if ($sendCoupon) {
				$userCouponSqlArr = array();
				$couponEndTime = time();
				$offsetTime = 6*24*3600;//每次派送间隔(7天)
				foreach ($sendCouponIdArr as $couponIdArr) {
					$couponBeginTime = $couponEndTime;
					$couponEndTime = $couponBeginTime + $offsetTime;
					foreach ($couponIdArr as $couponId) {
						$coupon = $sendCouponMap[$couponId];
						$couponType = (int)$coupon['couponType'];
						$couponAmount = (int)$coupon['amount'];
						$couponRule = trim($coupon['rule']);
						if (empty($coupon)) {
							$database->execute('rollback');
							$database->close();
							$resp->msg = '优惠券信息异常';
							return $resp;
						}
						$field = array();
						$field[] = 'userId="' . $database->escape($userId) . '"';
						$field[] = 'nickName="' . $database->escape($nickName) . '"';
						$field[] = 'realName="' . $database->escape($realName) . '"';
						$field[] = 'couponId="' . $database->escape($couponId) . '"';
						$field[] = 'financeType="' . $database->escape($financeType) . '"';
						$field[] = 'couponType="' . $database->escape($couponType) . '"';
						$field[] = 'amount="' . $database->escape($couponAmount) . '"';
						$field[] = 'rule="' . $database->escape($couponRule) . '"';
						$field[] = 'beginTime="' . $database->escape(date('Y-m-d 00:00:00', $couponBeginTime)) . '"';
						$field[] = 'endTime="' . $database->escape(date('Y-m-d 23:59:59', $couponEndTime)) . '"';
						$field[] = 'status=1';
						$field[] = 'createTime=now()';
						$userCouponSqlArr[] = 'insert into t_user_coupon set ' . implode(',', $field);
					}
					$couponEndTime = $couponEndTime + 1*24*3600;//再多加1天
				}
				if (count($userCouponSqlArr) != 18) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '派送优惠券数量异常';
					return $resp;
				}
				$userCouponSql = implode(';', $userCouponSqlArr);
				$userCouponResult = $database->multiExecute($userCouponSql);
				if (!$userCouponResult) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入优惠券异常';
					return $resp;
				}
				$userCouponIdArr = $database->multiInsertId();
				if (count($userCouponSqlArr) != count($userCouponIdArr)) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入优惠券执行异常';
					return $resp;
				}
				for ($i = 0, $length = count($userCouponIdArr); $i < $length; $i++) {
					$userCouponId = (int)$userCouponIdArr[$i];
					if ($userCouponId <= 0) {
						$database->execute('rollback');
						$database->close();
						$resp->msg = '用户优惠券id生成异常';
						return $resp;
					}
				}
			}
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

	//晒米冷热订单
	public function paySmlrOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$financeData = $param['finance'];
        $financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
        $financeIdExtra = (int)$financeDataExtra['financeId'];
        $financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		$chargeAmount = (int)$param['chargeAmount'];
		$incomeAmount = (int)$param['incomeAmount'];
		$unfreeze = (bool)$param['unfreeze'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
        if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 0) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($unfreeze) {
			$getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
			$orderFreezeData = $getOrderFreezeResp->data;
			if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
				$resp->msg = $getOrderFreezeResp->msg;
				return $resp;
			}
			$consumeType = (int)$orderFreezeData['consumeType'];
			$chargeAmount = (int)$orderFreezeData['chargeAmount'];
			$incomeAmount = (int)$orderFreezeData['incomeAmount'];
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '混合支付金额有误';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新订单异常';
                return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
			}

            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入交易异常';
                    return $resp;
				}
			}

			//消费插入
			if ($consumeType != 4) {
				//消费流水插入
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				//消费插入
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1) {
                    $updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
                    $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
                    $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
			} else if ($consumeType == 4) {
				$remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
				//充值支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount;
				//收益支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount;
			}

			if ($unfreeze) {
				//解冻订单冻结资金
				$updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
				$updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
				$updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
				if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新解冻异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;
                $updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;
			}
            //资金明细表额外表
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $orderNo = $this->common->encodeNo($userId, $orderId);
            $resp->data = array('orderNo' => $orderNo);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

    //极限追盘订单
	public function payJxzpOrder($param) {
		$resp = requireModule('Resp');
		$tradeData = $param['trade'];
		$orderData = $param['order'];
		$userData = $param['user'];
		$financeData = $param['finance'];
        $financeDataExtra = $param['financeExtra'];
		$consumeType = (int)$param['consumeType'];
		$financeId = (int)$financeData['financeId'];
		$financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersion = (int)$financeData['dataVersion'];
        $financeIdExtra = (int)$financeDataExtra['financeId'];
        $financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersionExtra = (int)$financeDataExtra['dataVersion'];
		$chargeAmount = (int)$param['chargeAmount'];
		$incomeAmount = (int)$param['incomeAmount'];
		$unfreeze = (bool)$param['unfreeze'];
		if (empty($orderData)) {
			$resp->msg = '订单信息有误';
			return $resp;
		}
		if (empty($userData)) {
			$resp->msg = '用户信息有误';
			return $resp;
		}
		if (empty($financeData) || $financeId <= 0 || $financeType !== 0) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
        if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 0) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
		$tradeType = (int)$tradeData['tradeType'];
		$tradeNo = trim($tradeData['tradeNo']);
		$tradeTime = trim($tradeData['tradeTime']);
		$userId = (int)$orderData['userId'];
		$orderId = (int)$orderData['orderId'];
		$amount = (int)$orderData['amount'];
		$status = (int)$orderData['status'];
		if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
			$resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
			return $resp;
		}
		//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		if ($status == 2 || $status == 3 || $status == 4) {
			$resp->errCode = 3;
			$resp->msg = '订单重复支付';
			return $resp;
		}
		if ($status != 1) {
			$resp->msg = '订单状态('.$status.')异常';
			return $resp;
		}
		if ($unfreeze) {
			$getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
			$orderFreezeData = $getOrderFreezeResp->data;
			if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
				$resp->msg = $getOrderFreezeResp->msg;
				return $resp;
			}
			$consumeType = (int)$orderFreezeData['consumeType'];
			$chargeAmount = (int)$orderFreezeData['chargeAmount'];
			$incomeAmount = (int)$orderFreezeData['incomeAmount'];
		}
		if ($consumeType <= 0) {
			$resp->msg = '付款方式有误';
			return $resp;
		}
		if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
			$resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
			return $resp;
		}
		if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '混合支付金额有误';
			return $resp;
		}
		$nickName = trim($userData['nickName']);
		$realName = trim($userData['realName']);
		$database = requireModule('Database');
		//开启事物
		if ($database->execute('start transaction')) {
			//更新订单状态
			$updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新订单异常';
                return $resp;
			}
			//更新用户资金明细版本，防止请求串入造成的数据错乱
			$updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
			$updateFinanceResult = $database->execute($updateFinanceSql);
			$updateFinanceAffectedRows = (int)$database->getAffectedRows();
			if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
			}

            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

			//交易信息插入
			if ($consumeType == 1) {
				$insertFinanceTradeField = array();
				$insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
				$insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
				$insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
				$insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
				$insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceTradeField[] = 'createTime=now()';
				$insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
				$insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
				$insertFinanceTradeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入交易异常';
                    return $resp;
				}
			}

			//消费插入
			if ($consumeType != 4) {
				//消费流水插入
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				//消费插入
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1){
                    $updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
                    $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
                    $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
			} else if ($consumeType == 4) {
				$remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
				//充值支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount;
				//收益支付
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
				}
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
				$insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount;
			}

			if ($unfreeze) {
				//解冻订单冻结资金
				$updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
				$updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
				$updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
				if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新解冻异常';
                    return $resp;
				}
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;//解冻充值
                $updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;//解冻收益
			}
            //资金明细表额外表
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $orderNo = $this->common->encodeNo($userId, $orderId);
            $resp->data = array('orderNo' => $orderNo);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
		} else {
			$resp->msg = '支付失败';
			return $resp;
		}
	}

    public function payDigitalTicketOrder($param) {
        $resp = requireModule('Resp');
        $tradeData = $param['trade'];
        $orderData = $param['order'];
        $userData = $param['user'];
		$userCouponData = $param['userCoupon'];
        $financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
        $consumeType = (int)$param['consumeType'];
        $financeId = (int)$financeData['financeId'];
        $financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
        $incomeAmount = (int)$param['incomeAmount'];
        $unfreeze = (bool)$param['unfreeze'];
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        if (empty($userData)) {
            $resp->msg = '用户信息有误';
            return $resp;
        }
        if (empty($financeData) || $financeId <= 0 || $financeType !== 1) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
        $tradeType = (int)$tradeData['tradeType'];
        $tradeNo = trim($tradeData['tradeNo']);
        $tradeTime = trim($tradeData['tradeTime']);
        $userId = (int)$orderData['userId'];
        $orderId = (int)$orderData['orderId'];
        $amount = (int)$orderData['amount'];
        $status = (int)$orderData['status'];
        if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
            $resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
            return $resp;
        }
        //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        if ($status == 2 || $status == 3 || $status == 4) {
            $resp->errCode = 3;
            $resp->msg = '订单重复支付';
            return $resp;
        }
        if ($status != 1) {
            $resp->msg = '订单状态('.$status.')异常';
            return $resp;
        }

		//优惠券逻辑
		$userCouponId = 0;
		$userCouponAmount = 0;
		$useConsumeCoupon = false;//是否使用消费优惠券
		if (!empty($userCouponData)) {
			$userCouponId = (int)$userCouponData['userCouponId'];
			$userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
			$userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
			$userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
			$userCouponAmount = (int)$userCouponData['amount'];
			if ($userCouponId <= 0 || $userCouponFinanceType != $financeType || $userCouponType != 1 || $userCouponStatus != 1 || $userCouponAmount <= 0 || $userCouponAmount >= $amount) {
				$resp->msg = '优惠券信息异常';
				return $resp;
			}
			$amount = $amount - $userCouponAmount;
			$useConsumeCoupon = true;
		}

        if ($unfreeze) {
            $getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
            $orderFreezeData = $getOrderFreezeResp->data;
            if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
                $resp->msg = $getOrderFreezeResp->msg;
                return $resp;
            }
            $consumeType = (int)$orderFreezeData['consumeType'];
            $chargeAmount = (int)$orderFreezeData['chargeAmount'];
            $incomeAmount = (int)$orderFreezeData['incomeAmount'];
        }
        if ($consumeType <= 0) {
            $resp->msg = '付款方式有误';
            return $resp;
        }
        if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
            $resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
            return $resp;
        }
        if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
            $resp->msg = '混合支付金额有误';
            return $resp;
        }
        $nickName = trim($userData['nickName']);
        $realName = trim($userData['realName']);
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
            }
            //更新用户资金明细版本，防止请求串入造成的数据错乱
            $updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
            $updateFinanceResult = $database->execute($updateFinanceSql);
            $updateFinanceAffectedRows = (int)$database->getAffectedRows();
            if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
            }

			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

            //交易信息插入
            if ($consumeType == 1) {
                $insertFinanceTradeField = array();
                $insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
                $insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
                $insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
                $insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
                $insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceTradeField[] = 'createTime=now()';
                $insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
                $insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
                $insertFinanceTradeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
                }
            }

            //消费插入
            if ($consumeType != 4) {
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                //消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1){
					$updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
					$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
					$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
                $remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
                //充值支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount;
                //收益支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount;
            }

			if ($useConsumeCoupon) {
				//更新用户优惠券表
				$updateUserCouponSql = 'update t_user_coupon set status=2 where userCouponId="' . $userCouponId . '" and couponType=1 and status=1 limit 1 ';
				$updateUserCouponResult = $database->execute($updateUserCouponSql);
				$updateUserCouponAffectedRows = (int)$database->getAffectedRows();
				if (!$updateUserCouponResult || $updateUserCouponAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新用户优惠券异常';
					return $resp;
				}
				//消费流水插入
				$insertFinanceConsumeRecordField = array();
				$insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
				$insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceConsumeRecordField[] = 'remark="优惠券抵扣"';
				$insertFinanceConsumeRecordField[] = 'createTime=now()';
				$insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
				$insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
				$insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
				}
				//消费插入
				$insertFinanceConsumeField = array();
				$insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
				$insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
				$insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
				$insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
				$insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
				$insertFinanceConsumeField[] = 'type=4';//类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=优惠券消费
				$insertFinanceConsumeField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
				$insertFinanceConsumeField[] = 'createTime=now()';
				$insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
				$insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
				$insertFinanceConsumeInsertId = (int)$database->getInsertId();
				if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入消费异常';
					return $resp;
				}
				//资金明细表额外表
				$updateFinanceSqlExtraParam['couponConsumeChangeAmount'] = $userCouponAmount;
			}

            if ($unfreeze) {
                //解冻订单冻结资金
                $updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
                $updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
                $updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
                if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新解冻异常';
					return $resp;
                }
                //资金明细表额外表
				$updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;
				$updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;
            }
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$message = requireModule('Message');
			$message->publish('payOrderForTicketDeal', $orderId);
			$message->publish('payOrderForStation', $orderId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
        } else {
            $resp->msg = '支付失败';
            return $resp;
        }
    }

    public function payPresentOrder($param) {
        $resp = requireModule('Resp');
        $tradeData = $param['trade'];
        $orderData = $param['order'];
        $userData = $param['user'];
        $financeData = $param['finance'];
		$financeDataExtra = $param['financeExtra'];
        $consumeType = (int)$param['consumeType'];
        $financeId = (int)$financeData['financeId'];
        $financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersion = (int)$financeData['dataVersion'];
		$financeIdExtra = (int)$financeDataExtra['financeId'];
		$financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
		$dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
        $incomeAmount = (int)$param['incomeAmount'];
        $unfreeze = (bool)$param['unfreeze'];
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        if (empty($userData)) {
            $resp->msg = '用户信息有误';
            return $resp;
        }
        if (empty($financeData) || $financeId <= 0 || $financeType !== 1) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
		if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 1) {
			$resp->msg = '资金信息有误';
			return $resp;
		}
        $tradeType = (int)$tradeData['tradeType'];
        $tradeNo = trim($tradeData['tradeNo']);
        $tradeTime = trim($tradeData['tradeTime']);
        $userId = (int)$orderData['userId'];
        $orderId = (int)$orderData['orderId'];
        $amount = (int)$orderData['amount'];
        $status = (int)$orderData['status'];
        if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
            $resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
            return $resp;
        }
        //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        if ($status == 2 || $status == 3 || $status == 4) {
            $resp->errCode = 3;
            $resp->msg = '订单重复支付';
            return $resp;
        }
        if ($status != 1) {
            $resp->msg = '订单状态('.$status.')异常';
            return $resp;
        }
        if ($unfreeze) {
            $getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
            $orderFreezeData = $getOrderFreezeResp->data;
            if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
                $resp->msg = $getOrderFreezeResp->msg;
                return $resp;
            }
            $consumeType = (int)$orderFreezeData['consumeType'];
            $chargeAmount = (int)$orderFreezeData['chargeAmount'];
            $incomeAmount = (int)$orderFreezeData['incomeAmount'];
        }
        if ($consumeType <= 0) {
            $resp->msg = '付款方式有误';
            return $resp;
        }
        if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
            $resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
            return $resp;
        }
        if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
            $resp->msg = '混合支付金额有误';
            return $resp;
        }
        $nickName = trim($userData['nickName']);
        $realName = trim($userData['realName']);
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单异常';
				return $resp;
            }
            //更新用户资金明细版本，防止请求串入造成的数据错乱
            $updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
            $updateFinanceResult = $database->execute($updateFinanceSql);
            $updateFinanceAffectedRows = (int)$database->getAffectedRows();
            if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
            }

			//资金明细表额外表
			$updateFinanceSqlExtraParam = array();
			$updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
			$updateFinanceSqlExtraParam['nickName'] = $nickName;
			$updateFinanceSqlExtraParam['realName'] = $realName;
			$updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

            //交易信息插入
            if ($consumeType == 1) {
                $insertFinanceTradeField = array();
                $insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
                $insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
                $insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
                $insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
                $insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceTradeField[] = 'createTime=now()';
                $insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
                $insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
                $insertFinanceTradeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
                }
            }

            //消费插入
            if ($consumeType != 4) {
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                //消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
                }
				//资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1){
                    $updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
					$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
					$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
                $remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
                //充值支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount;
                //收益支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入流水异常';
					return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '插入交易异常';
					return $resp;
                }
				//资金明细表额外表
				$updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount;
            }

            if ($unfreeze) {
                //解冻订单冻结资金
                $updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
                $updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
                $updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
                if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '更新解冻异常';
					return $resp;
                }
				$updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;
				$updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;
            }
			//资金明细表额外表
			$updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
			$updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
			if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
			$updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
			if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新资金异常';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			//更新资金明细
			$this->commonService->setUserFinance($userId);
			$orderNo = $this->common->encodeNo($userId, $orderId);
			$resp->data = array('orderNo' => $orderNo);
			$resp->errCode = 0;
			$resp->msg = "成功";
			return $resp;
        } else {
            $resp->msg = '支付失败';
            return $resp;
        }
    }

    //支付冠亚军竞猜订单
    public function payGuessOrder($param) {
        $resp = requireModule('Resp');
        $tradeData = $param['trade'];
        $orderData = $param['order'];
        $userData = $param['user'];
        $userCouponData = $param['userCoupon'];
        $financeData = $param['finance'];
        $financeDataExtra = $param['financeExtra'];
        $consumeType = (int)$param['consumeType'];
        $financeId = (int)$financeData['financeId'];
        $financeType = (int)$financeData['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersion = (int)$financeData['dataVersion'];
        $financeIdExtra = (int)$financeDataExtra['financeId'];
        $financeTypeExtra = (int)$financeDataExtra['financeType'];//资金类型, 0=方案, 1=出票
        $dataVersionExtra = (int)$financeDataExtra['dataVersion'];
        $chargeAmount = (int)$param['chargeAmount'];
        $incomeAmount = (int)$param['incomeAmount'];
        $unfreeze = (bool)$param['unfreeze'];
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        if (empty($userData)) {
            $resp->msg = '用户信息有误';
            return $resp;
        }
        if (empty($financeData) || $financeId <= 0 || $financeType !== 1) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
        if (empty($financeDataExtra) || $financeIdExtra <= 0 || $financeTypeExtra !== 1) {
            $resp->msg = '资金信息有误';
            return $resp;
        }
        $tradeType = (int)$tradeData['tradeType'];
        $tradeNo = trim($tradeData['tradeNo']);
        $tradeTime = trim($tradeData['tradeTime']);
        $userId = (int)$orderData['userId'];
        $orderId = (int)$orderData['orderId'];
        $amount = (int)$orderData['amount'];
        $status = (int)$orderData['status'];
        if ($userId <= 0 || $orderId <= 0 || $amount <= 0) {
            $resp->msg = '订单信息('.$userId.'|'.$orderId.'|'.$amount.')异常';
            return $resp;
        }
        //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        if ($status == 2 || $status == 3 || $status == 4) {
            $resp->errCode = 3;
            $resp->msg = '订单重复支付';
            return $resp;
        }
        if ($status != 1) {
            $resp->msg = '订单状态('.$status.')异常';
            return $resp;
        }

        //优惠券逻辑
        $userCouponId = 0;
        $userCouponAmount = 0;
        $useConsumeCoupon = false;//是否使用消费优惠券
        if (!empty($userCouponData)) {
            $userCouponId = (int)$userCouponData['userCouponId'];
            $userCouponFinanceType = (int)$userCouponData['financeType'];//资金类型, 0=方案, 1=出票
            $userCouponType = (int)$userCouponData['couponType'];//优惠券类型, 1=消费, 2=充值
            $userCouponStatus = (int)$userCouponData['status'];//1=未使用, 2=已使用
            $userCouponAmount = (int)$userCouponData['amount'];
            if ($userCouponId <= 0 || $userCouponFinanceType != $financeType || $userCouponType != 1 || $userCouponStatus != 1 || $userCouponAmount <= 0 || $userCouponAmount >= $amount) {
                $resp->msg = '优惠券信息异常';
                return $resp;
            }
            $amount = $amount - $userCouponAmount;
            $useConsumeCoupon = true;
        }

        if ($unfreeze) {
            $getOrderFreezeResp = $this->getOrderFreeze($financeType, $userId, $orderId, $amount);
            $orderFreezeData = $getOrderFreezeResp->data;
            if ($getOrderFreezeResp->errCode != 0 || empty($orderFreezeData)) {
                $resp->msg = $getOrderFreezeResp->msg;
                return $resp;
            }
            $consumeType = (int)$orderFreezeData['consumeType'];
            $chargeAmount = (int)$orderFreezeData['chargeAmount'];
            $incomeAmount = (int)$orderFreezeData['incomeAmount'];
        }
        if ($consumeType <= 0) {
            $resp->msg = '付款方式有误';
            return $resp;
        }
        if ($consumeType == 1 && (empty($tradeNo) || empty($tradeTime))) {
            $resp->msg = '交易信息('.$tradeNo.'|'.$tradeTime.')异常';
            return $resp;
        }
        if ($consumeType == 4 && ($chargeAmount + $incomeAmount) != $amount) {
            $resp->msg = '混合支付金额有误';
            return $resp;
        }
        $nickName = trim($userData['nickName']);
        $realName = trim($userData['realName']);
        $database = requireModule('Database');
        //开启事物
        if ($database->execute('start transaction')) {
            //更新订单状态
            $updateOrderSql = 'update t_order set status=2 where orderId="' . $orderId . '" and status=1 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新订单异常';
                return $resp;
            }
            //更新用户资金明细版本，防止请求串入造成的数据错乱
            $updateFinanceSql = 'update t_finance set dataVersion=dataVersion+1 where financeId="' . $financeId . '" and dataVersion="' . $dataVersion . '" limit 1 ';
            $updateFinanceResult = $database->execute($updateFinanceSql);
            $updateFinanceAffectedRows = (int)$database->getAffectedRows();
            if (!$updateFinanceResult || $updateFinanceAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }

            //资金明细表额外表
            $updateFinanceSqlExtraParam = array();
            $updateFinanceSqlExtraParam['financeId'] = $financeIdExtra;
            $updateFinanceSqlExtraParam['nickName'] = $nickName;
            $updateFinanceSqlExtraParam['realName'] = $realName;
            $updateFinanceSqlExtraParam['dataVersion'] = $dataVersionExtra;

            //交易信息插入
            if ($consumeType == 1) {
                $insertFinanceTradeField = array();
                $insertFinanceTradeField[] = 'tradeType="' . $database->escape($tradeType) . '"';//交易方式, 0=爱贝, 1=支付宝, 2=威富通, 3=苹果支付, 4=爱贝合作
                $insertFinanceTradeField[] = 'tradeNo="' . $database->escape($tradeNo) . '"';
                $insertFinanceTradeField[] = 'tradeTime="' . $database->escape($tradeTime) . '"';
                $insertFinanceTradeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceTradeField[] = 'type=1';//类型, 1=消费, 2=充值'
                $insertFinanceTradeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceTradeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceTradeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceTradeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceTradeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceTradeField[] = 'createTime=now()';
                $insertFinanceTradeSql = 'insert into t_finance_trade set ' . implode(',', $insertFinanceTradeField);
                $insertFinanceTradeResult = $database->execute($insertFinanceTradeSql);
                $insertFinanceTradeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceTradeResult || $insertFinanceTradeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入交易异常';
                    return $resp;
                }
            }

            //消费插入
            if ($consumeType != 4) {
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type="' . $database->escape($consumeType) . '"';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($amount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
                }
                //资金明细表额外表
                //类型, 1=现金消费, 2=充值消费, 3=收益消费
                if ($consumeType == 1){
                    $updateFinanceSqlExtraParam['cashConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 2) {
                    $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $amount;
                } else if ($consumeType == 3) {
                    $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $amount;
                }
            } else if ($consumeType == 4) {
                $remark = '混合支付, '.($amount/100).'(总额) = '.($chargeAmount/100).'(充值) + '.($incomeAmount/100).'(收益)';
                //充值支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=2';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($chargeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
                }
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeConsumeChangeAmount'] = $chargeAmount; //充值消费增加
                //收益支付
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=3';//类型, 1=现金消费, 2=充值消费, 3=收益消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($incomeAmount) . '"';
                $insertFinanceConsumeField[] = 'remark="' . $database->escape($remark) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
                }
                //资金明细表额外表
                $updateFinanceSqlExtraParam['incomeConsumeChangeAmount'] = $incomeAmount; //收益消费增加
            }

            if ($useConsumeCoupon) {
                //更新用户优惠券表
                $updateUserCouponSql = 'update t_user_coupon set status=2 where userCouponId="' . $userCouponId . '" and couponType=1 and status=1 limit 1 ';
                $updateUserCouponResult = $database->execute($updateUserCouponSql);
                $updateUserCouponAffectedRows = (int)$database->getAffectedRows();
                if (!$updateUserCouponResult || $updateUserCouponAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新用户优惠券异常';
                    return $resp;
                }
                //消费流水插入
                $insertFinanceConsumeRecordField = array();
                $insertFinanceConsumeRecordField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeRecordField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeRecordField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeRecordField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeRecordField[] = 'type=1';//类型, 1=消费, 2=收益, 3=提款, 4=充值
                $insertFinanceConsumeRecordField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeRecordField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
                $insertFinanceConsumeRecordField[] = 'remark="优惠券抵扣"';
                $insertFinanceConsumeRecordField[] = 'createTime=now()';
                $insertFinanceConsumeRecordSql = 'insert into t_finance_record set ' . implode(',', $insertFinanceConsumeRecordField);
                $insertFinanceConsumeRecordResult = $database->execute($insertFinanceConsumeRecordSql);
                $insertFinanceConsumeRecordInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeRecordResult || $insertFinanceConsumeRecordInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入流水异常';
                    return $resp;
                }
                //消费插入
                $insertFinanceConsumeField = array();
                $insertFinanceConsumeField[] = 'financeType="' . $database->escape($financeType) . '"';
                $insertFinanceConsumeField[] = 'userId="' . $database->escape($userId) . '"';
                $insertFinanceConsumeField[] = 'nickName="' . $database->escape($nickName) . '"';
                $insertFinanceConsumeField[] = 'realName="' . $database->escape($realName) . '"';
                $insertFinanceConsumeField[] = 'orderId="' . $database->escape($orderId) . '"';
                $insertFinanceConsumeField[] = 'type=4';//类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=优惠券消费
                $insertFinanceConsumeField[] = 'amount="' . $database->escape($userCouponAmount) . '"';
                $insertFinanceConsumeField[] = 'createTime=now()';
                $insertFinanceConsumeSql = 'insert into t_finance_consume set ' . implode(',', $insertFinanceConsumeField);
                $insertFinanceConsumeResult = $database->execute($insertFinanceConsumeSql);
                $insertFinanceConsumeInsertId = (int)$database->getInsertId();
                if (!$insertFinanceConsumeResult || $insertFinanceConsumeInsertId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '插入消费异常';
                    return $resp;
                }
                //资金明细表额外表
                $updateFinanceSqlExtraParam['couponConsumeChangeAmount'] = $userCouponAmount;
            }

            if ($unfreeze) {
                //解冻订单冻结资金
                $updateFinanceFreezeSql = 'update t_finance_freeze set status=2 where financeType="' . $financeType . '" and userId="' . $userId . '" and orderId="' . $orderId . '" and status=1';
                $updateFinanceFreezeResult = $database->execute($updateFinanceFreezeSql);
                $updateFinanceFreezeAffectedRows = (int)$database->getAffectedRows();
                if (!$updateFinanceFreezeResult || $updateFinanceFreezeAffectedRows <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '更新解冻异常';
                    return $resp;
                }
                //资金明细表额外表
                $updateFinanceSqlExtraParam['chargeFreezeChangeAmount'] = -$chargeAmount;
                $updateFinanceSqlExtraParam['incomeFreezeChangeAmount'] = -$incomeAmount;
            }
            //资金明细表额外表
            $updateFinanceSqlExtraResp = $this->financeService->updateFinanceSqlExtra($database, $updateFinanceSqlExtraParam);
            $updateFinanceSqlExtra = $updateFinanceSqlExtraResp->data;
            if ($updateFinanceSqlExtraResp->errCode != 0 || empty($updateFinanceSqlExtra)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $updateFinanceResultExtra = $database->execute($updateFinanceSqlExtra);
            $updateFinanceAffectedRowsExtra = (int)$database->getAffectedRows();
            if (!$updateFinanceResultExtra || $updateFinanceAffectedRowsExtra <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新资金异常';
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            //更新资金明细
            $this->commonService->setUserFinance($userId);
            $message = requireModule('Message');
            $message->publish('payOrderForTicketDeal', $orderId);
            $message->publish('payOrderForStation', $orderId);
            $orderNo = $this->common->encodeNo($userId, $orderId);
            $resp->data = array('orderNo' => $orderNo);
            $resp->errCode = 0;
            $resp->msg = "成功";
            return $resp;
        } else {
            $resp->msg = '支付失败';
            return $resp;
        }
    }

	private function getOrderFreeze($financeType, $userId, $orderId, $amount) {
		$resp = requireModule('Resp');
		$financeType = (int)$financeType;
		$userId = (int)$userId;
		$orderId = (int)$orderId;
		if ($financeType != 0 && $financeType != 1) {
			$resp->msg = 'financeType参数异常';
			return $resp;
		}
		if ($userId <= 0) {
			$resp->msg = 'userId参数异常';
			return $resp;
		}
		if ($orderId <= 0) {
			$resp->msg = 'orderId参数异常';
			return $resp;
		}
		$param = array();
		$param['financeType'] = $financeType;
		$param['userId'] = $userId;
		$param['orderId'] = $orderId;
		$param['status'] = 1;//状态, 1=冻结, 2=解冻
		$selectFinanceFreezeResp = $this->financeService->selectFinanceFreeze($param);
		if ($selectFinanceFreezeResp->errCode != 0) {
			$resp->msg = '资金冻结查询异常';
			return $resp;
		}
		$financeFreezeList = $selectFinanceFreezeResp->data['list'];
		$chargeAmount = 0;
		$incomeAmount = 0;
		foreach ($financeFreezeList as $financeFreeze) {
			$t = (int)$financeFreeze['type'];//类型, 1=充值, 2=收益
			$a = (int)$financeFreeze['amount'];
			if (empty($financeFreeze) || $t <= 0 || $a <= 0) {
				continue;
			}
			if ($t == 1) {
				$chargeAmount += $a;
			} else if ($t == 2) {
				$incomeAmount += $a;
			}
		}
		$consumeType = 0;//消费类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=充值消费+收益消费
		if ($chargeAmount > 0 && $incomeAmount > 0) {
			$consumeType = 4;
		} else if ($chargeAmount > 0) {
			$consumeType = 2;
		} else if ($incomeAmount > 0) {
			$consumeType = 3;
		}
		if ($consumeType <= 0) {
			$resp->msg = '冻结消费类型';
			return $resp;
		}
		if ($chargeAmount <= 0 && $incomeAmount <= 0) {
			$resp->msg = '冻结金额类型';
			return $resp;
		}
		if (($chargeAmount + $incomeAmount) != $amount) {
			$resp->msg = '冻结金额和订单金额不符';
			return $resp;
		}
		$data = array(
			'consumeType'=> $consumeType,
			'chargeAmount' => $chargeAmount,
			'incomeAmount' => $incomeAmount
		);
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}
}